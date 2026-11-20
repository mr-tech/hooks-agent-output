#!/usr/bin/env bash
# Security-stage driver, copied from ../code-review/run-attack.sh (not edited in place) and parameterised on the test file:
# runs one *.pg.test.ts against a throwaway postgres:16 in an export of one website commit.
# Usage: run-security.sh <website-sha> <port> <work-dir> <out-dir> <test-file (absolute path)> [<replacements.json> <id>]
# The optional pair applies one exact-once replacement from the file to the export before the run (QA's
# run-second-user.sh form), and the label carries the id.
# NEXTAUTH_URL is https so next-auth names its cookie as production does (__Secure-next-auth.session-token);
# NEXTAUTH_SECRET is a dummy. No .env file exists in the export (git archive), and none is read.
set -u
SHA="$1"; PORT="$2"; WORK="$3"; OUT="$4"; TEST="$5"; MFILE="${6:-}"; MID="${7:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
WEBSITE=/usr/local/bin/hooks/website
BASE="$(basename "$TEST" .pg.test.ts)"
LABEL="$BASE-${SHA:0:7}${MID:+-$MID}"
NAME="fpma-sec-${SHA:0:7}-$$"
EXPORT="$WORK/export-$LABEL"

cleanup() {
  docker rm -f "$NAME" > "$OUT/container-rm-$LABEL.txt" 2>&1
  rm -rf "$EXPORT"
}
trap cleanup EXIT

mkdir -p "$OUT" "$EXPORT"
git -C "$WEBSITE" archive "$SHA" | tar -x -C "$EXPORT"
ln -s "$WEBSITE/node_modules" "$EXPORT/node_modules"
cp "$TEST" "$EXPORT/src/server/__tests__/$BASE.pg.test.ts"

if [ -n "$MID" ]; then
  python3 -I "$HERE/apply-replacement.py" "$MFILE" "$MID" "$EXPORT" > "$OUT/replacement-$LABEL.txt" 2>&1 || exit 7
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
  NEXTAUTH_URL="https://hooks.test" NEXTAUTH_SECRET="security-stage-dummy" SEC_OUT="$OUT" SEC_LABEL="$LABEL" \
  timeout -k 10 300 setsid npx vitest run --project node --reporter=json \
  --outputFile="$OUT/$LABEL.json" "src/server/__tests__/$BASE.pg.test.ts" \
  > "$OUT/$LABEL.log" 2>&1 < /dev/null
echo "vitest exit $?" > "$OUT/$LABEL.exit"
