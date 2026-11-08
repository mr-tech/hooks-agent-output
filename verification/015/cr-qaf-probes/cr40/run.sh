#!/usr/bin/env bash
# Usage: run.sh <sha> — runs each CR-40 select-column mutator through ../../mutate-run.sh against
# shared.in-predicates.test.ts in an isolated export, reads each mutant back from disk, and moves
# the capture here as <label>-<sha>.txt.
set -u
SHA=$1; HERE=$(cd "$(dirname "$0")" && pwd); V=$HERE/../..
: "${EXPORT_ROOT:?set EXPORT_ROOT to a scratch directory}"
T=src/server/api/utils/__tests__/shared.in-predicates.test.ts
for m in none control-partial-guildid-unselected partial-name-unselected partial-nonce-unselected recent-name-unselected partial-column-added; do
  L=cr40-$m
  if [ "$m" = none ]; then "$V/mutate-run.sh" "$SHA" "$L" "$T"; else "$V/mutate-run.sh" "$SHA" "$L" "$T" "$HERE/$m.py"; fi
  { echo "--- mutant read back (export vs tree at $SHA)"; git -C /usr/local/bin/hooks/website show "$SHA:src/server/api/utils/shared.ts" | diff - "$EXPORT_ROOT/website-$SHA-$L/src/server/api/utils/shared.ts"; } >> "$V/mutation-$L-$SHA.txt"
  mv "$V/mutation-$L-$SHA.txt" "$HERE/$m-$SHA.txt"
done
for f in "$HERE"/*-"$SHA".txt; do case $f in */summary-*) continue;; esac; printf '%s: ' "$(basename "$f")"; grep -E "Tests +[0-9]|vitest exit" "$f" | tr '\n' ' '; echo; done > "$HERE/summary-$SHA.txt"
