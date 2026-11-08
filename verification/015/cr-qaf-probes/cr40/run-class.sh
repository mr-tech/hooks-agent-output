#!/usr/bin/env bash
# Usage: run-class.sh <sha> — runs the implementer's ten select-column mutants
# (../../mutators/qaf41-select-column-mutants.json) against shared.in-predicates.test.ts, each in an
# isolated export via ../../mutate-run.sh, reads each mutant back from disk, and writes
# class-<sha>.txt with one line per mutant.
set -u
SHA=$1; HERE=$(cd "$(dirname "$0")" && pwd); V=$HERE/../..
: "${EXPORT_ROOT:?set EXPORT_ROOT to a scratch directory}"
J=$V/mutators/qaf41-select-column-mutants.json
T=src/server/api/utils/__tests__/shared.in-predicates.test.ts
: > "$HERE/class-$SHA.txt"
for id in $(python3 -I -c "import json,sys;print(' '.join(m['id'] for m in json.load(open(sys.argv[1]))))" "$J"); do
  L=cr40c-$id
  MUTANTS=$J MUT_ID=$id "$V/mutate-run.sh" "$SHA" "$L" "$T" "$V/mutators/qaf38-40-apply-qa-mutant.py"
  O=$V/mutation-$L-$SHA.txt
  RB=$(git -C /usr/local/bin/hooks/website show "$SHA:src/server/api/utils/shared.ts" | diff - "$EXPORT_ROOT/website-$SHA-$L/src/server/api/utils/shared.ts" | grep -c '^[<>]')
  echo "$id: readback-changed-lines=$RB $(grep -E 'Tests +[0-9]|vitest exit' "$O" | tr '\n' ' ')" >> "$HERE/class-$SHA.txt"
  rm -f "$O"
done
