#!/usr/bin/env bash
# Usage: lint-planted.sh <website> <sha> <out> <scratch>
# Lints each planted file over stdin, as src/components/BottomPortal.tsx (an existing tsconfig member),
# with the repo's own eslint config, inside a git-archive export of <sha>. Output: <out>.
set -u
W=$1; SHA=$2; OUT=$3; SCRATCH=$4
HERE=$(cd "$(dirname "$0")" && pwd)
EXPORT=$SCRATCH/website-$SHA-cr26-lint
rm -rf "$EXPORT"; mkdir -p "$EXPORT"
git -C "$W" archive "$SHA" | tar -x -C "$EXPORT"
ln -s "$W/node_modules" "$EXPORT/node_modules"
{
  echo "export: $EXPORT sha: $SHA"
  for f in "$HERE/../cr-m6-probes/usemount-lint-planted.tsx" "$HERE/planted-deep.tsx" "$HERE/planted-control.tsx"; do
    echo "== $(basename "$f")"
    (cd "$EXPORT" && npx eslint --no-eslintrc -c .eslintrc.json --stdin --stdin-filename src/components/BottomPortal.tsx \
      --rule 'react/function-component-definition: off' --rule 'arrow-body-style: off' --rule 'prefer-arrow-callback: off' \
      -f unix < "$f" 2>&1)
    echo "exit $?"
  done
} > "$OUT" 2>&1
