#!/usr/bin/env bash
# Usage: run.sh <out-dir> [website-src-dir]   (the socket directory is under /dev/shm: a unix socket path holds 108 bytes)
# A throwaway postgres:16 container of its own (name impl017-pglane, no network, a unix socket on a host directory),
# removed on every exit path. The lane runs under `unshare -rn`: the test process has no network at all.
set -uo pipefail
OUT=$(realpath -m "${1:?out dir}")
SRC=${2:-/usr/local/bin/hooks/website/src}
HERE=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$OUT"
ln -sfn /usr/local/bin/hooks/website/node_modules "$HERE/node_modules"
NAME=impl017-pglane
SOCK=$(mktemp -d /dev/shm/pgl.XXXXXX)
chmod 777 "$SOCK"
cleanup() { rm -f "$HERE/node_modules"; docker exec -u root "$NAME" chown "$(id -u):$(id -g)" /var/run/postgresql >/dev/null 2>&1; docker stop -t 5 "$NAME" >/dev/null 2>&1; docker rm -f "$NAME" >/dev/null 2>&1; rm -rf "$SOCK"; }
trap cleanup EXIT
docker rm -f "$NAME" >/dev/null 2>&1
docker run -d --rm --name "$NAME" --network none -v "$SOCK:/var/run/postgresql" -e POSTGRES_PASSWORD=lane -e POSTGRES_DB=lane postgres:16 >/dev/null || exit 1
for _ in $(seq 1 60); do docker exec "$NAME" pg_isready -U postgres -d lane >/dev/null 2>&1 && break; sleep 1; done
sleep 2
docker exec "$NAME" psql -U postgres -d lane -Atc 'select version()' | cut -c1-40 > "$OUT/server.txt"
cd /usr/local/bin/hooks/website || exit 1
VITE_CACHE="$SOCK/vite-cache" PG_SOCKET_DIR="$SOCK" WEBSITE_SRC="$SRC" timeout 300 unshare -rn npx vitest run --config "$HERE/vitest.config.mjs" --reporter=json --outputFile="$OUT/lane.json" > "$OUT/lane.out" 2>&1
echo "exit $?" > "$OUT/lane.exit"
cat "$OUT/lane.exit"
