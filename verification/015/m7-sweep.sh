#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> m7-sweep.sh <sha>
# Implementer's mutants for M7 (mutators/m7-table.py). Each run is mutate-run.sh (isolated
# git-archive export, process-group kill at TIMEOUT) inside unshare -rn with lo up and the isolation
# counts checked. Per-run output: mutation-<label>-<sha>.txt; summary: m7-sweep-summary-<sha>.txt.
set -u
SHA=${1:?sha}
HERE=$(cd "$(dirname "$0")" && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
SUMMARY=$HERE/m7-sweep-summary-$SHA.txt
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
T=$HERE/mutators/m7-table.py
run control-m7a common.admin-permissions
run control-m7b DiscordEmbed.set-timestamp
run control-m7c common.localized-strings
for m in m7a-and-of-two-bits m7a-administrator-only m7a-or-of-two-bits; do run "$m" common.admin-permissions "$T" "$m"; done
for m in m7b-timestamp-compares m7b-timestamp-ignores-argument; do run "$m" DiscordEmbed.set-timestamp "$T" "$m"; done
for m in m7c-user-test-for-slash m7c-user-test-for-message; do run "$m" common.localized-strings "$T" "$m"; done
echo done >> "$SUMMARY"
