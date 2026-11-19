#!/usr/bin/env bash
# Usage: run.sh <website sha> <out dir>. A throwaway postgres:16 (cr017-attack, --network none, unix socket under /dev/shm),
# a git archive export of the sha (no .env.local in it), node_modules linked, the run under unshare -rn with loopback up.
# Optional third argument: a mutant id from controls.json, applied to the export and read back (positive control).
# Every process and file it starts or makes is removed on every exit path.
set -uo pipefail
SHA=$1; OUT=$(realpath -m "$2"); HERE=$(cd "$(dirname "$0")" && pwd)
WEB=/usr/local/bin/hooks/website
SCR=/tmp/claude-1000/-usr-local-bin-hooks/e0020673-6e57-4ff1-90d8-a95a22085569/scratchpad
EXP=$SCR/attack-exp-$SHA; NAME=cr017-attack; SOCK=$(mktemp -d /dev/shm/cra.XXXXXX); chmod 777 "$SOCK"
mkdir -p "$OUT"
cleanup() { docker exec -u root "$NAME" chown "$(id -u):$(id -g)" /var/run/postgresql >/dev/null 2>&1; docker stop -t 5 "$NAME" >/dev/null 2>&1; docker rm -f "$NAME" >/dev/null 2>&1; rm -rf "$SOCK" "$EXP"; }
trap cleanup EXIT
rm -rf "$EXP"; mkdir -p "$EXP"; git -C $WEB archive "$SHA" | tar -x -C "$EXP"; ln -s $WEB/node_modules "$EXP/node_modules"
test -e "$EXP/.env.local" && { echo "export holds .env.local; refusing"; exit 2; }
if [ -n "${3:-}" ]; then python3 -I -c "import json,sys;m=[x for x in json.load(open(sys.argv[1])) if x['id']==sys.argv[2]][0];p=sys.argv[3]+'/'+m['file'];s=open(p).read();assert s.count(m['old'])==1,(m['id'],s.count(m['old']));open(p,'w').write(s.replace(m['old'],m['new']));assert open(p).read().count(m['new'])>=1;print('applied',m['id'])" "$HERE/controls.json" "$3" "$EXP" > "$OUT/mutant.txt" || exit 3; fi
mkdir -p "$EXP/attack"; cp "$HERE/attack.test.ts" "$EXP/attack/"; cp /usr/local/bin/hooks/agent-output/verification/017/m6-probe/s3-stub.mjs "$EXP/m6-probe-s3-stub.mjs"
docker rm -f "$NAME" >/dev/null 2>&1
docker run -d --rm --name "$NAME" --network none -v "$SOCK:/var/run/postgresql" -e POSTGRES_PASSWORD=attack -e POSTGRES_DB=attack postgres:16 >/dev/null || exit 1
for _ in $(seq 1 60); do docker exec "$NAME" pg_isready -U postgres -d attack >/dev/null 2>&1 && break; sleep 1; done; sleep 2
docker exec "$NAME" psql -U postgres -d attack -Atc 'select version()' | cut -c1-40 > "$OUT/server.txt"
cd "$EXP" || exit 1
env -i PATH="$PATH" HOME="$HOME" NODE_ENV=production DATABASE_URL="postgresql://postgres@localhost/attack?host=$SOCK" PG_SOCKET_DIR="$SOCK" \
  ATTACK_EXPORT="$EXP" ATTACK_HERE="$HERE" VITE_CACHE="$SOCK/vite" \
  timeout 300 unshare -rn sh -c 'ip link set lo up && exec node_modules/.bin/vitest run --no-cache --configLoader runner --config "$ATTACK_HERE/vitest.attack.config.mjs" --reporter=verbose' > "$OUT/attack.out" 2>&1
echo "exit $?" > "$OUT/attack.exit"; cat "$OUT/attack.exit"
