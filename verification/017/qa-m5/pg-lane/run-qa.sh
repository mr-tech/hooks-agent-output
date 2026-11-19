#!/usr/bin/env bash
# QA's runner for the implementer's real-Postgres lane (verification/017/m5-pg/, run.sh blob 1324a0c), copied rather
# than edited in place, with two changes only:
#   - the container is named qa017-pglane, so this run can never `docker rm -f` the implementer's impl017-pglane;
#   - the node_modules link in m5-pg/ is created only if absent, and removed on exit only if this run created it.
# The lane's own files (vitest.config.mjs 0173ab8, pg-lane.test.ts cf19850, env-stub.ts e2b2a82) run from their
# committed path, unchanged.
# Usage: run-qa.sh <out-dir> <website-src-dir>
set -uo pipefail
OUT=$(realpath -m "${1:?out dir}")
SRC=${2:?website src dir}
LANE=/usr/local/bin/hooks/agent-output/verification/017/m5-pg
mkdir -p "$OUT"
MADE_LINK=0
if [ ! -e "$LANE/node_modules" ]; then ln -s /usr/local/bin/hooks/website/node_modules "$LANE/node_modules"; MADE_LINK=1; fi
NAME=qa017-pglane
SOCK=$(mktemp -d /dev/shm/qpl.XXXXXX)
chmod 777 "$SOCK"
cleanup() {
  [ "$MADE_LINK" = 1 ] && rm -f "$LANE/node_modules"
  docker exec -u root "$NAME" chown "$(id -u):$(id -g)" /var/run/postgresql >/dev/null 2>&1
  docker stop -t 5 "$NAME" >/dev/null 2>&1; docker rm -f "$NAME" >/dev/null 2>&1; rm -rf "$SOCK"
}
trap cleanup EXIT
docker rm -f "$NAME" >/dev/null 2>&1
docker run -d --rm --name "$NAME" --network none -v "$SOCK:/var/run/postgresql" -e POSTGRES_PASSWORD=lane -e POSTGRES_DB=lane postgres:16 >/dev/null || exit 1
for _ in $(seq 1 60); do docker exec "$NAME" pg_isready -U postgres -d lane >/dev/null 2>&1 && break; sleep 1; done
sleep 2
docker exec "$NAME" psql -U postgres -d lane -Atc 'select version()' | cut -c1-40 > "$OUT/server.txt"
cd /usr/local/bin/hooks/website || exit 1
VITE_CACHE="$SOCK/vite-cache" PG_SOCKET_DIR="$SOCK" WEBSITE_SRC="$SRC" timeout 300 unshare -rn npx vitest run --config "$LANE/vitest.config.mjs" --reporter=json --outputFile="$OUT/lane.json" > "$OUT/lane.out" 2>&1
echo "exit $?" > "$OUT/lane.exit"
cat "$OUT/lane.exit"
