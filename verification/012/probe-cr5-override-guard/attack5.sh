#!/bin/bash
# Round-5 adversarial sweep. Oracle unchanged from round 4 and fixed before running:
# a refusal must show a refusal message, NO connection attempt of any kind, NO file written.
RD=/tmp/cr5_reports
run() {
  local label="$1"; shift
  rm -rf "$RD"; mkdir -p "$RD"
  local out; out=$(env NODE_ENV=development "$@" BACKFILL_REPORT_DIR="$RD" \
    node -r ts-node/register/transpile-only -r tsconfig-paths/register \
    src/scripts/backfillValid.ts 2>&1); local code=$?
  local refused=NO conn=NO files why=""
  grep -q "Refusing to run" <<<"$out" && refused=YES
  grep -qE "ECONNREFUSED|ENOTFOUND|ETIMEDOUT|EAI_AGAIN|getaddrinfo" <<<"$out" && conn=YES
  files=$(find "$RD" -type f 2>/dev/null | wc -l)
  grep -q "query parameter" <<<"$out" && why="[override-guard]"
  grep -q "guard sentinel" <<<"$out" && why="[sentinel-guard]"
  grep -q "but BACKFILL_CONFIRM was" <<<"$out" && why="[confirm-guard]"
  printf '%-46s refused=%-3s conn=%-3s files=%s %s\n' "$label" "$refused" "$conn" "$files" "$why"
  grep -oE "(ECONNREFUSED|ENOTFOUND) [^ ]*" <<<"$out" | head -1 | sed 's/^/       dialled: /'
}
B='postgresql://u:p@decoy.invalid:1/x'
echo "--- M6 (parser-differential finding): the override must refuse UNCONDITIONALLY ---"
run "1 ?host= , NO confirmation"          DATABASE_URL="$B?host=127.0.0.1"
run "2 ?host= , confirm MATCHES decoy"    DATABASE_URL="$B?host=127.0.0.1" BACKFILL_CONFIRM='decoy.invalid:1'
run "3 ?host= , confirm matches REAL"     DATABASE_URL="$B?host=127.0.0.1" BACKFILL_CONFIRM='127.0.0.1:5432'
run "4 ?port= only"                       DATABASE_URL="$B?port=9999" BACKFILL_CONFIRM='decoy.invalid:1'
run "5 ?%68ost= percent-encoded"          DATABASE_URL="$B?%68ost=127.0.0.1" BACKFILL_CONFIRM='decoy.invalid:1'
run "6 ?host repeated"                    DATABASE_URL="$B?host=a.invalid&host=127.0.0.1" BACKFILL_CONFIRM='decoy.invalid:1'
echo "--- L10: sentinels must not confirm ---"
run "7 unset URL + confirm '(unset)'"     BACKFILL_CONFIRM='(unset)'
run "8 junk URL + confirm '(unparseable)'" DATABASE_URL='not a url' BACKFILL_CONFIRM='(unparseable)'
echo "--- M4 regression: round-4 refusals must still hold ---"
run "9 dead URL, no confirmation"         DATABASE_URL='postgresql://u:p@127.0.0.1:1/x'
run "10 near-miss wrong port"             DATABASE_URL='postgresql://u:p@127.0.0.1:1/x' BACKFILL_CONFIRM='127.0.0.1:2'
echo "--- NO-REGRESSION: a plain URL with correct confirmation must still PROCEED ---"
run "11 plain URL, correct confirm"       DATABASE_URL='postgresql://u:p@127.0.0.1:1/x' BACKFILL_CONFIRM='127.0.0.1:1'
echo "--- extra: non-standard socket: scheme (guard host string vs dialled path) ---"
run "12 socket: scheme"                   DATABASE_URL='socket:/var/run/postgresql' BACKFILL_CONFIRM=':5432'
rm -rf "$RD"
