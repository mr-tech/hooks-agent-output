#!/usr/bin/env bash
# Runs getone.pg.test.ts (message.getOne over project-utils' real getPostgres) against a throwaway postgres:16
# in a git-archive export of one website commit. Adapted from verification/fix-recent-message-ids/code-review/run-probe.sh.
# Usage: run-probe.sh <website-sha> <port> <work-dir> <out-dir>
set -u
SHA="$1"; PORT="$2"; WORK="$3"; OUT="$4"
HERE="$(cd "$(dirname "$0")" && pwd)"
WEBSITE=/usr/local/bin/hooks/website
SCHEMA=/usr/local/bin/hooks/agent-output/verification/fix-personal-message-access/pg/schema-749606d.sql
NAME="fgoa-cr-${SHA:0:7}-$$"
EXPORT="$WORK/export-${SHA:0:7}"

cleanup() {
  docker rm -f "$NAME" > "$OUT/container-rm-${SHA:0:7}.txt" 2>&1
  rm -rf "$EXPORT"
}
trap cleanup EXIT

mkdir -p "$OUT" "$EXPORT"
git -C "$WEBSITE" archive "$SHA" | tar -x -C "$EXPORT"
ln -s "$WEBSITE/node_modules" "$EXPORT/node_modules"
mkdir -p "$EXPORT/src/server/__tests__"
cp "$HERE/getone.pg.test.ts" "$EXPORT/src/server/__tests__/getone.pg.test.ts"

docker run -d --name "$NAME" -e POSTGRES_PASSWORD=x -p "127.0.0.1:$PORT:5432" postgres:16 > "$OUT/container-${SHA:0:7}.txt" 2>&1 || exit 3
ready=0
for _ in $(seq 1 60); do
  if docker exec "$NAME" pg_isready -U postgres -h 127.0.0.1 > /dev/null 2>&1; then ready=1; break; fi
  sleep 1
done
[ "$ready" = 1 ] || { echo "postgres not ready" > "$OUT/run-${SHA:0:7}.err"; exit 4; }

docker exec -i "$NAME" psql -v ON_ERROR_STOP=1 -U postgres -h 127.0.0.1 < "$SCHEMA" > "$OUT/schema-apply-${SHA:0:7}.txt" 2>&1 || exit 5

cd "$EXPORT" || exit 6
DATABASE_URL="postgresql://postgres:x@127.0.0.1:$PORT/postgres" NODE_ENV=test \
  PROBE_OUT="$OUT/getone-${SHA:0:7}.json" \
  timeout -k 10 240 setsid npx vitest run --project node --reporter=json \
  --outputFile="$OUT/vitest-${SHA:0:7}.json" src/server/__tests__/getone.pg.test.ts \
  > "$OUT/vitest-${SHA:0:7}-log.txt" 2>&1 < /dev/null
echo "vitest exit $?" > "$OUT/vitest-${SHA:0:7}.exit"
