#!/usr/bin/env bash
# QA driver, copied from ../pg/run-pg.sh (not edited in place) and changed: runs second-user.pg.test.ts against a throwaway
# postgres:16 in an export of one website commit, optionally with one mutant from a mutants file applied (exact-once).
# Usage: run-second-user.sh <website-sha> <port> <work-dir> <out-dir> [<mutants.json> <mutant-id>[+<mutant-id>...]]
set -u
SHA="$1"; PORT="$2"; WORK="$3"; OUT="$4"; MFILE="${5:-}"; MID="${6:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
WEBSITE=/usr/local/bin/hooks/website
LABEL="${SHA:0:7}${MID:+-$MID}"
NAME="fpma-qa-${SHA:0:7}-$$"
EXPORT="$WORK/export-$LABEL"

cleanup() {
  docker rm -f "$NAME" > "$OUT/container-rm-$LABEL.txt" 2>&1
  rm -rf "$EXPORT"
}
trap cleanup EXIT

mkdir -p "$OUT" "$EXPORT"
git -C "$WEBSITE" archive "$SHA" | tar -x -C "$EXPORT"
ln -s "$WEBSITE/node_modules" "$EXPORT/node_modules"
cp "$HERE/second-user.pg.test.ts" "$EXPORT/src/server/__tests__/second-user.pg.test.ts"

if [ -n "$MID" ]; then
  python3 - "$MFILE" "$MID" "$EXPORT" > "$OUT/mutant-$LABEL.txt" 2>&1 <<'PY' || exit 7
import json, sys
mfile, mids, export = sys.argv[1:4]
rows = json.load(open(mfile))
for mid in mids.split('+'):
    m = next(r for r in rows if r['id'] == mid)
    path = f"{export}/{m['file']}"
    text = open(path).read()
    assert text.count(m['old']) == 1, f"{mid}: old occurs {text.count(m['old'])} times"
    open(path, 'w').write(text.replace(m['old'], m['new']))
    print('applied', mid, m['file'])
PY
fi

docker run -d --name "$NAME" -e POSTGRES_PASSWORD=x -p "127.0.0.1:$PORT:5432" postgres:16 > "$OUT/container-$LABEL.txt" 2>&1 || exit 3
ready=0
for _ in $(seq 1 60); do
  if docker exec "$NAME" pg_isready -U postgres -h 127.0.0.1 > /dev/null 2>&1; then ready=1; break; fi
  sleep 1
done
[ "$ready" = 1 ] || { echo "postgres not ready" > "$OUT/run-$LABEL.err"; exit 4; }

docker exec -i "$NAME" psql -v ON_ERROR_STOP=1 -U postgres -h 127.0.0.1 < "$HERE/../pg/schema-749606d.sql" > "$OUT/schema-apply-$LABEL.txt" 2>&1 || exit 5

cd "$EXPORT" || exit 6
DATABASE_URL="postgresql://postgres:x@127.0.0.1:$PORT/postgres" NODE_ENV=test \
  timeout -k 10 240 setsid npx vitest run --project node --reporter=json \
  --outputFile="$OUT/pg-$LABEL.json" src/server/__tests__/second-user.pg.test.ts \
  > "$OUT/pg-$LABEL.out" 2>&1 < /dev/null
echo "vitest exit $?" > "$OUT/pg-$LABEL.exit"
