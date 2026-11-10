#!/usr/bin/env bash
# uat-local-stack.sh up [--seed] | down | status
#
# The hooks UAT walk's local database: a postgres:16 container `hooks-postgres-local` on the host and port of
# website/.env.local's DATABASE_URL, with that URL's user, password and database. Local only: a URL whose host is not
# loopback is refused before any container, network or schema act. The URL and its password are never printed.
#
#   up           create (labelled), or reuse or start the tool's own container, wait until it accepts connections,
#                push project-utils/prisma/schema.prisma (db push --skip-generate), print the table count
#   up --seed    the same, then apply seed.sql; only to an empty container this call created
#   status       five lines: container, listener, ready, tables, redis. Changes nothing
#   down         stop and remove the tool's container; the image stays. Refuses a same-named container it did not label
#
# Exit 0 done; 1 a step failed (what this call started is undone); 2 refused or misused.

set -uo pipefail

NAME=hooks-postgres-local
LABEL_KEY=hooks.uat-local-stack
LABEL_VAL=1
IMAGE=postgres:16
ENV_FILE=${ULS_ENV_FILE:-/usr/local/bin/hooks/website/.env.local}
SCHEMA=${ULS_SCHEMA:-/usr/local/bin/hooks/project-utils/prisma/schema.prisma}
DOCKER=${ULS_DOCKER:-docker}
PRISMA=${ULS_PRISMA:-/usr/local/bin/hooks/website/node_modules/.bin/prisma}
SEED_FILE=${ULS_SEED:-/usr/local/bin/hooks/agent-output/verification/015/upload-dialog/seed.sql}
READY_TRIES=${ULS_READY_TRIES:-60}
READY_PAUSE=${ULS_READY_PAUSE:-1}

USAGE='uat-local-stack.sh up [--seed] | down | status'
die() { printf 'uat-local-stack: %s\n' "$1" >&2; exit "${2:-2}"; }
usage_error() { printf 'uat-local-stack: %s\nusage: %s\n' "$1" "$USAGE" >&2; exit 2; }

VERB=""
SEED=0
if [ $# -eq 1 ] && { [ "$1" = -h ] || [ "$1" = --help ]; }; then printf 'usage: %s\n' "$USAGE"; exit 0; fi
for a in "$@"; do
  case "$a" in
    up|down|status) [ -z "$VERB" ] || usage_error "unknown argument: $a"; VERB=$a ;;
    --seed) [ "$VERB" = up ] || usage_error "--seed belongs to up"; [ "$SEED" = 0 ] || usage_error "unknown argument: $a"; SEED=1 ;;
    *) usage_error "unknown argument: $a" ;;
  esac
done
[ -n "$VERB" ] || usage_error "give a verb"

CONFIG=$(python3 -I - "$ENV_FILE" <<'PY'
import ipaddress, shlex, sys
from urllib.parse import unquote, urlsplit

def last_value(path, key):
    value = None
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if line.startswith("export "):
                line = line[7:].lstrip()
            name, sep, rest = line.partition("=")
            if sep and name.strip() == key:
                rest = rest.strip()
                if len(rest) >= 2 and rest[0] == rest[-1] and rest[0] in "'\"":
                    rest = rest[1:-1]
                value = rest
    return value

try:
    path = sys.argv[1]
    raw = last_value(path, "DATABASE_URL")
    if raw is None:
        sys.exit(3)
    parts = urlsplit(raw)
    if parts.scheme not in ("postgres", "postgresql") or not parts.hostname:
        sys.exit(4)
    host = parts.hostname
    port = parts.port or 5432
    user = unquote(parts.username or "")
    password = unquote(parts.password or "")
    db = unquote(parts.path.lstrip("/"))
    if not (user and password and db):
        sys.exit(4)
    try:
        local = ipaddress.ip_address(host).is_loopback
    except ValueError:
        local = host.lower() == "localhost"
    out = {
        "DB_LOCAL": "1" if local else "0", "DB_HOST": host, "DB_PORT": str(port), "DB_USER": user,
        "DB_PASS": password, "DB_NAME": db, "DB_URL": raw,
        "REDIS_HOST": last_value(path, "REDISHOST") or "", "REDIS_PORT": last_value(path, "REDISPORT") or "",
        "REDIS_PASS": last_value(path, "REDISPASSWORD") or "",
    }
    for key, value in out.items():
        print(f"{key}={shlex.quote(value)}")
except OSError:
    sys.exit(3)
except ValueError:
    sys.exit(4)
PY
) || die "DATABASE_URL in $ENV_FILE is missing or cannot be parsed"
eval "$CONFIG"
unset CONFIG
[ "$DB_LOCAL" = 1 ] || die "refused: this tool is local only, and DATABASE_URL names a host that is not loopback"

case "$DB_HOST" in
  localhost) BIND=127.0.0.1 ;;
  *:*) BIND="[$DB_HOST]" ;;
  *) BIND=$DB_HOST ;;
esac
HOSTPORT="$BIND:$DB_PORT"

CREATED=0
CID=""
STARTED=0
OK=0
STATE=""
LABELLED=0

inspect() {
  local line
  STATE=""; LABELLED=0
  line=$("$DOCKER" inspect --type container --format "{{.State.Status}} {{index .Config.Labels \"$LABEL_KEY\"}}" "${1:-$NAME}" 2>/dev/null) || return 1
  STATE=${line%% *}
  [ "${line#* }" = "$LABEL_VAL" ] && LABELLED=1
  return 0
}

publishes() { "$DOCKER" port "$NAME" 5432/tcp 2>/dev/null | grep -Fxq -- "$HOSTPORT"; }

listening() {
  local h=${BIND#\[}
  h=${h%\]}
  timeout 2 bash -c 'exec 3<>"/dev/tcp/$1/$2"' _ "$h" "$DB_PORT" 2>/dev/null
}

pg_ready() { "$DOCKER" exec "$NAME" pg_isready -h 127.0.0.1 -p 5432 -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; }

table_count() {
  PGPASSWORD=$DB_PASS "$DOCKER" exec -e PGPASSWORD "$NAME" psql -U "$DB_USER" -d "$DB_NAME" -tAc \
    "select count(*) from information_schema.tables where table_schema = 'public'" 2>/dev/null | tr -d '[:space:]'
}

undo() {
  if [ "$CREATED" = 1 ]; then
    if inspect "$CID"; then
      if [ "$LABELLED" = 1 ]; then
        "$DOCKER" rm -f "$CID" >/dev/null 2>&1 && echo "removed the container this call created"
      else
        echo "container $NAME not removed: it no longer carries the tool's label"
      fi
    fi
  elif [ "$STARTED" = 1 ]; then
    if inspect && [ "$LABELLED" = 1 ]; then
      "$DOCKER" stop "$NAME" >/dev/null 2>&1 && echo "stopped the container this call started"
    else
      echo "container $NAME not stopped: it no longer carries the tool's label"
    fi
  fi
  CREATED=0; CID=""; STARTED=0
}

finish() {
  local rc=$?
  trap '' TERM INT HUP
  [ "$OK" = 1 ] || undo
  exit "$rc"
}
trap finish EXIT
trap 'exit 143' TERM
trap 'exit 130' INT
trap 'exit 129' HUP

fail() { printf 'uat-local-stack: %s\n' "$1"; exit 1; }

cmd_up() {
  if inspect; then
    [ "$LABELLED" = 1 ] || die "a container named $NAME exists and is not this tool's (no label); nothing was changed"
    [ "$SEED" = 0 ] || die "--seed applies only to a container this call created; $NAME already exists"
    case "$STATE" in
      running)
        publishes || die "the tool's container is not publishing $HOSTPORT; nothing was changed" ;;
      exited|created)
        if listening; then die "$HOSTPORT is held by another listener, not this tool's container; nothing was changed"; fi
        "$DOCKER" start "$NAME" >/dev/null 2>&1 || fail "docker start failed"
        STARTED=1
        publishes || fail "the started container is not publishing $HOSTPORT" ;;
      *) die "the tool's container is in state $STATE; nothing was changed" ;;
    esac
  else
    if listening; then die "$HOSTPORT is held by another listener, not this tool's container; nothing was changed"; fi
    local made rc
    made=$(POSTGRES_PASSWORD=$DB_PASS POSTGRES_USER=$DB_USER POSTGRES_DB=$DB_NAME "$DOCKER" run -d --name "$NAME" \
      --label "$LABEL_KEY=$LABEL_VAL" -e POSTGRES_PASSWORD -e POSTGRES_USER -e POSTGRES_DB \
      -p "$HOSTPORT:5432" "$IMAGE" 2>/dev/null)
    rc=$?
    made=$(printf '%s' "$made" | tr -d '[:space:]')
    if [ -z "$made" ] && [ "$rc" = 0 ]; then made=$NAME; fi
    case "$made" in ''|*[!A-Za-z0-9-]*) ;; *) CID=$made; CREATED=1 ;; esac
    if [ "$rc" != 0 ]; then
      if [ -z "$CID" ] && inspect; then fail "docker run failed; the container named $NAME was not created by this call and is left as found"; fi
      fail "docker run failed"
    fi
  fi

  local i=0
  until pg_ready; do
    i=$((i + 1))
    [ "$i" -lt "$READY_TRIES" ] || fail "container $NAME is not ready after $READY_TRIES tries"
    sleep "$READY_PAUSE"
  done

  local rc
  DATABASE_URL=$DB_URL "$PRISMA" db push --schema "$SCHEMA" --skip-generate >/dev/null 2>&1
  rc=$?
  [ "$rc" = 0 ] || fail "schema push failed (exit $rc); its output is withheld because it can carry the connection URL"
  echo "schema push: ok"

  if [ "$SEED" = 1 ]; then
    PGPASSWORD=$DB_PASS "$DOCKER" exec -i -e PGPASSWORD "$NAME" psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" <"$SEED_FILE" >/dev/null 2>&1 \
      || fail "seed failed"
    echo "seed: applied"
  fi

  local n
  n=$(table_count)
  [ -n "$n" ] || fail "table count failed"
  echo "container: $NAME ready at $HOSTPORT"
  echo "tables: $n"
  OK=1
}

redis_line() {
  local h=$REDIS_HOST p=$REDIS_PORT resp="" ok=1
  if [ -z "$h" ] || [ -z "$p" ]; then echo "redis: not configured (REDISHOST or REDISPORT missing)"; return; fi
  case "$h" in
    localhost|127.*|::1) ;;
    *) echo "redis: $h:$p not checked (REDISHOST is not loopback)"; return ;;
  esac
  { exec 4<>"/dev/tcp/$h/$p"; } 2>/dev/null || ok=0
  if [ "$ok" = 1 ]; then
    if [ -n "$REDIS_PASS" ]; then printf 'AUTH %s\r\n' "$REDIS_PASS" >&4; read -r -t 2 _ <&4; fi
    printf 'PING\r\n' >&4
    read -r -t 2 resp <&4
    exec 4>&-
  fi
  case "$resp" in
    +PONG*) echo "redis: $h:$p answered PING" ;;
    -*) echo "redis: $h:$p replied with an error to PING" ;;
    *) echo "redis: $h:$p no answer to PING" ;;
  esac
}

cmd_status() {
  local ready=0 held=0
  if inspect; then
    if [ "$LABELLED" = 1 ]; then echo "container: $STATE (the tool's)"; else echo "container: $STATE, not the tool's (no label)"; fi
  else
    echo "container: no container named $NAME"
  fi
  if listening; then held=1; fi
  if [ "$held" = 0 ]; then echo "listener: $HOSTPORT free"
  elif [ "$LABELLED" = 1 ] && [ "$STATE" = running ] && publishes; then echo "listener: $HOSTPORT the tool's container"
  else echo "listener: $HOSTPORT held by another listener"; fi
  if [ "$LABELLED" = 1 ] && [ "$STATE" = running ]; then
    if pg_ready; then ready=1; echo "ready: yes (pg_isready in the container, $HOSTPORT)"
    else echo "ready: no (pg_isready in the container did not accept connections)"; fi
  else
    echo "ready: no (no running container of the tool's)"
  fi
  if [ "$ready" = 1 ]; then
    local n; n=$(table_count)
    if [ -n "$n" ]; then echo "tables: $n"; else echo "tables: unknown (the count failed)"; fi
  else
    echo "tables: unknown (not ready)"
  fi
  redis_line
}

cmd_down() {
  if ! inspect; then echo "down: no container named $NAME"; return; fi
  [ "$LABELLED" = 1 ] || die "a container named $NAME exists and is not this tool's (no label); not removed"
  "$DOCKER" rm -f "$NAME" >/dev/null 2>&1 || fail "docker rm failed"
  echo "down: removed $NAME (the image stays)"
}

case "$VERB" in
  up) cmd_up ;;
  status) cmd_status ;;
  down) cmd_down ;;
esac
OK=1
