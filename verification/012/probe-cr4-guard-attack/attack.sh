#!/bin/bash
# Adversarial sweep of the M4 guard, driven through the SHIPPED entry point.
# Oracle (fixed before running): for every case that MUST refuse ->
#   (a) refusal message present, (b) NO connection error anywhere in the trace,
#   (c) NO file created on the report surface.
RD=/tmp/cr4_reports
run() {
  local label="$1"; shift
  rm -rf "$RD"; mkdir -p "$RD"
  local out
  out=$(env NODE_ENV=development "$@" BACKFILL_REPORT_DIR="$RD" \
    node -r ts-node/register/transpile-only -r tsconfig-paths/register \
    src/scripts/backfillValid.ts 2>&1)
  local code=$?
  local refused=NO conn=NO files
  grep -q "Refusing to run" <<<"$out" && refused=YES
  grep -qE "ECONNREFUSED|ENOTFOUND|ETIMEDOUT|EAI_AGAIN|getaddrinfo" <<<"$out" && conn=YES
  files=$(find "$RD" -type f 2>/dev/null | wc -l)
  printf '%-42s exit=%s refused=%-3s connectionAttempt=%-3s reportFiles=%s\n' \
    "$label" "$code" "$refused" "$conn" "$files"
  grep -oE "resolves to \"[^\"]*\"" <<<"$out" | head -1 | sed 's/^/      guard reported: /'
  grep -oE "(ECONNREFUSED|ENOTFOUND) [^ ]*" <<<"$out" | head -1 | sed 's/^/      CONNECTED TO : /'
}
echo "--- MUST REFUSE (no confirmation, or wrong confirmation) ---"
run "1 dead URL, no confirm"            DATABASE_URL=postgresql://u:p@127.0.0.1:1/x
run "2 confirm empty string"            DATABASE_URL=postgresql://u:p@127.0.0.1:1/x BACKFILL_CONFIRM=
run "3 near-miss: wrong port"           DATABASE_URL=postgresql://u:p@127.0.0.1:1/x BACKFILL_CONFIRM=127.0.0.1:2
run "4 near-miss: wrong host"           DATABASE_URL=postgresql://u:p@127.0.0.1:1/x BACKFILL_CONFIRM=127.0.0.2:1
run "5 whitespace-padded confirm"       DATABASE_URL=postgresql://u:p@127.0.0.1:1/x BACKFILL_CONFIRM=" 127.0.0.1:1 "
run "6 case variation of host"          DATABASE_URL=postgresql://u:p@LocalHost:1/x BACKFILL_CONFIRM=LocalHost:1
run "7 trailing dot host"               DATABASE_URL=postgresql://u:p@127.0.0.1.:1/x BACKFILL_CONFIRM=127.0.0.1:1
echo "--- MUST PROCEED (correct confirmation) — guard must not over-block ---"
run "8 correct confirm, dead URL"       DATABASE_URL=postgresql://u:p@127.0.0.1:1/x BACKFILL_CONFIRM=127.0.0.1:1
echo "--- SENTINELS: is 'I could not determine the target' confirmable? ---"
run "9 unset URL + confirm '(unset)'"   BACKFILL_CONFIRM='(unset)'
run "10 junk URL + confirm '(unparseable)'" DATABASE_URL="not a url" BACKFILL_CONFIRM='(unparseable)'
echo "--- PARSER DIFFERENTIAL: ?host= overrides for pg, invisible to the guard ---"
run "11 ?host= override"                DATABASE_URL="postgresql://u:p@decoy.invalid:1/x?host=127.0.0.1" BACKFILL_CONFIRM="decoy.invalid:1"
rm -rf "$RD"
