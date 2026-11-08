#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> m4-d29-sweep.sh <sha>
# Implementer's mutants for M4's D29 reopen and the QAF-25 cells. Each run is mutate-run.sh (isolated
# git-archive export, process-group kill at TIMEOUT) inside unshare -rn with lo up and the isolation
# counts checked. Per-run output: mutation-<label>-<sha>.txt; summary: m4-d29-sweep-summary-<sha>.txt.
set -u
SHA=${1:?sha}
HERE=$(cd "$(dirname "$0")" && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
SUMMARY=$HERE/m4-d29-sweep-summary-$SHA.txt
: > "$SUMMARY"
run() { # label test mutator mutant-id
  local label=$1 test=$2 mutator=${3:-} mut=${4:-}
  MUT_ID=$mut unshare -rn bash -c 'ip link set lo up
    [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
    "$0" "$1" "$2" "$3" "$4"' "$HERE/mutate-run.sh" "$SHA" "$label" "$test" "$mutator"
  local f=$HERE/mutation-$label-$SHA.txt
  printf '%s\t%s\t%s\t%s\n' "$label" "$(grep -E '^ +Tests ' "$f" | tail -1 | tr -s ' ')" \
    "$(grep -c 'Unhandled Rejection' "$f")" "$(tail -1 "$f")" >> "$SUMMARY"
}
HOOK_T=useValidateWebhook.validation-effects
DIALOG_T=NewMessageModal.failed-webhook-load
MENU_T=WebhookMenu.failed-webhook-load
PROV_T=WebhookProvider.validation-effects
ROUTER_T=message.get-from-url
D29=$HERE/mutators/m4-d29-table.py
QA=$HERE/mutators/qa-m4-supplement.py
run control-hook "$HOOK_T"
run control-dialog "$DIALOG_T"
run control-menu "$MENU_T"
run control-provider "$PROV_T"
run control-router "$ROUTER_T"
for m in d29-hook-webhook-text-message-load d29-hook-webhook-catch-dropped d29-hook-refusal-mapped-to-invalid; do
  run "hook-$m" "$HOOK_T" "$D29" "$m"
  run "dialog-$m" "$DIALOG_T" "$D29" "$m"
done
run dialog-d29-dialog-error-line-drops-webhook-error "$DIALOG_T" "$D29" d29-dialog-error-line-drops-webhook-error
run hook-d29-dialog-error-line-drops-webhook-error "$HOOK_T" "$D29" d29-dialog-error-line-drops-webhook-error
for m in d29-menu-error-never d29-menu-text-changed; do run "menu-$m" "$MENU_T" "$D29" "$m"; done
run menu-m4b-url-error-inverted "$MENU_T" "$HERE/mutators/m4-table.py" m4b-url-error-inverted
run menu-m4b-loading-conjunct-dropped "$MENU_T" "$HERE/mutators/m4-table.py" m4b-loading-conjunct-dropped
for m in provider-404-text provider-403-text provider-401-text provider-400-text provider-other-status-text provider-refused-shows-error; do
  run "$m" "$PROV_T" "$QA" "$m"
done
run rider-null-passes "$ROUTER_T" "$QA" rider-null-passes
echo done >> "$SUMMARY"
