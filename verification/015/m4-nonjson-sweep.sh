#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> m4-d29-sweep.sh <sha>
# Implementer's mutants for M4's D29 reopen and the QAF-25 cells. Each run is mutate-run.sh (isolated
# git-archive export, process-group kill at TIMEOUT) inside unshare -rn with lo up and the isolation
# counts checked. Per-run output: mutation-<label>-<sha>.txt; summary: m4-nonjson-sweep-summary-<sha>.txt.
set -u
SHA=${1:?sha}
HERE=$(cd "$(dirname "$0")" && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
SUMMARY=$HERE/m4-nonjson-sweep-summary-$SHA.txt
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
NJ=$HERE/mutators/m4-nonjson-table.py
NJ=$HERE/mutators/m4-nonjson-table.py
run control-dialog "$DIALOG_T"
run control-menu "$MENU_T"
run dialog-nj-hook-body-failure-is-refusal "$DIALOG_T" "$NJ" nj-hook-body-failure-is-refusal
run menu-nj-provider-body-failure-selects-webhook "$MENU_T" "$NJ" nj-provider-body-failure-selects-webhook
echo done >> "$SUMMARY"
