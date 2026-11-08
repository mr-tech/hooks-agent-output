#!/usr/bin/env bash
# Usage: run-mutants.sh <scratch>
# CR-26 behaviour-preservation probe: does any assertion in the suite fail when each of the three mount effects that
# 86f5a6c moved from react-use useMount to useEffect is emptied? Uses verification/015/mutate-run.sh (isolated git archive
# export of b195eeb, whole suite, process group killed at TIMEOUT), one mutant at a time, and reads back each mutated line.
set -u
S=$1; HERE=$(cd "$(dirname "$0")" && pwd); V=$(cd "$HERE/../../.." && pwd)
for m in button-autofocus-effect-empty editor-onmount-effect-empty usemounted-effect-empty; do
  EXPORT_ROOT=$S TIMEOUT=600 "$V/mutate-run.sh" b195eeb "cr26-$m" "" "$HERE/$m.py"
  E=$S/website-b195eeb-cr26-$m
  echo "readback: $(grep -c 'useEffect(() => {}, \[\]);' "$E/src/components/Button.tsx" "$E/src/components/DiscordMessageEditor/index.tsx" "$E/src/utils/hooks/index.ts" | tr '\n' ' ')" >> "$V/mutation-cr26-$m-b195eeb.txt"
done
