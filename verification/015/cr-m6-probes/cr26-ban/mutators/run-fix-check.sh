#!/usr/bin/env bash
# Usage: run-fix-check.sh <scratch> <sha>
# CR-37 fix check: the two new cells' files under a control and each mutant (verification/015/mutate-run.sh, isolated
# export, scoped to those files). Mutants: this directory's three, and the implementer's
# verification/015/mutators/cr37-button-autofocus-effect-and-aria-dropped.py. Each mutated line is read back.
set -u
S=$1; SHA=$2; HERE=$(cd "$(dirname "$0")" && pwd); V=$(cd "$HERE/../../.." && pwd)
T="src/components/__tests__/Button.auto-focus.test.tsx src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.component-limit.test.tsx"
EXPORT_ROOT=$S TIMEOUT=300 "$V/mutate-run.sh" "$SHA" cr37-control "$T"
for m in "$HERE/button-autofocus-effect-empty.py" "$V/mutators/cr37-button-autofocus-effect-and-aria-dropped.py" "$HERE/editor-onmount-effect-empty.py" "$HERE/editor-onmount-deps-dropped.py"; do
  L=cr37-$(basename "$m" .py)
  EXPORT_ROOT=$S TIMEOUT=300 "$V/mutate-run.sh" "$SHA" "$L" "$T" "$m"
  E=$S/website-$SHA-$L
  echo "readback Button: $(grep -c 'useEffect(() => {}, \[\]);\|autoFocus: false' "$E/src/components/Button.tsx"); editor: $(grep -c 'useEffect(() => {}, \[\]);\|onMount?.(); });' "$E/src/components/DiscordMessageEditor/index.tsx")" >> "$V/mutation-$L-$SHA.txt"
done
