#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> qa-m4-sweep.sh [sha]
# QA Phase 2 (chain 015, M4) mutation sweep: one control per touched test file, then every mutant in
# mutators/qa-m4-supplement.py, each run through mutate-run.sh (isolated export, process-group kill at
# TIMEOUT) inside a network namespace (unshare -rn, lo up, isolation counts checked first).
# Writes mutation-qa-m4-<label>-<sha>.txt per run and qa-m4-sweep-summary-<sha>.txt.
set -u
SHA=${1:-1e12837}
HERE=$(cd "$(dirname "$0")" && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
PAGE_T=page.send-in-flight
ROUTER_T=message.get-from-url
PROV_T=WebhookProvider.validation-effects
SUMMARY=$HERE/qa-m4-sweep-summary-$SHA.txt
: > "$SUMMARY"
run() { # label test [mutant-id]
  local label=$1 test=$2 mut=${3:-}
  if [ -n "$mut" ]; then
    MUT_ID=$mut unshare -rn bash -c 'ip link set lo up
      [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
      "$0" "$1" "$2" "$3" "$4"' "$HERE/mutate-run.sh" "$SHA" "qa-m4-$label" "$test" "$HERE/mutators/qa-m4-supplement.py"
  else
    unshare -rn bash -c 'ip link set lo up
      [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
      "$0" "$1" "$2" "$3"' "$HERE/mutate-run.sh" "$SHA" "qa-m4-$label" "$test"
  fi
  local f=$HERE/mutation-qa-m4-$label-$SHA.txt
  printf '%s\t%s\t%s\t%s\n' "$label" "$(grep -E '^ +Tests ' "$f" | tail -1 | tr -s ' ')" \
    "$(grep -c 'Unhandled Rejection' "$f")" "$(tail -1 "$f")" >> "$SUMMARY"
}
run control-page "$PAGE_T"
run control-router "$ROUTER_T"
run control-provider "$PROV_T"
for m in i3-sending-conjunct-dropped i3-stuck-disabled i3-catch-dropped; do run "$m" "$PAGE_T" "$m"; done
for m in rider-null-passes rider-loose-inequality; do run "$m" "$ROUTER_T" "$m"; done
for m in provider-404-text provider-403-text provider-401-text provider-400-text provider-other-status-text provider-refused-shows-error; do
  run "$m" "$PROV_T" "$m"
done
echo "done" >> "$SUMMARY"
