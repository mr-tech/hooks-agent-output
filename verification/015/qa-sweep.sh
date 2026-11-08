#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> qa-sweep.sh <sha> <tag> <mutator.py|-> <label:test-filter[:mutant-id]> ...
# Generic QA mutation-sweep driver (chain 015). Each run goes through mutate-run.sh (a fresh git-archive
# export of website@<sha>, process-group kill at TIMEOUT) inside a network namespace (unshare -rn, lo up,
# isolation counts checked first). A spec with no mutant id is a control run.
# Writes mutation-<tag>-<label>-<sha>.txt per run and <tag>-sweep-summary-<sha>.txt
# (label, vitest Tests line, Unhandled-Rejection count, last line).
set -u
SHA=$1; TAG=$2; MUTATOR=$3; shift 3
HERE=$(cd "$(dirname "$0")" && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
SUMMARY=$HERE/$TAG-sweep-summary-$SHA.txt
: > "$SUMMARY"
for spec in "$@"; do
  IFS=: read -r label test mut <<< "$spec"
  if [ -n "${mut:-}" ]; then
    MUT_ID=$mut unshare -rn bash -c 'ip link set lo up
      [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
      "$0" "$1" "$2" "$3" "$4"' "$HERE/mutate-run.sh" "$SHA" "$TAG-$label" "$test" "$MUTATOR"
  else
    unshare -rn bash -c 'ip link set lo up
      [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
      "$0" "$1" "$2" "$3"' "$HERE/mutate-run.sh" "$SHA" "$TAG-$label" "$test"
  fi
  f=$HERE/mutation-$TAG-$label-$SHA.txt
  printf '%s\t%s\t%s\t%s\n' "$label" "$(grep -E '^ +Tests ' "$f" | tail -1 | tr -s ' ')" \
    "$(grep -c 'Unhandled Rejection' "$f")" "$(tail -1 "$f")" >> "$SUMMARY"
done
echo "done" >> "$SUMMARY"
