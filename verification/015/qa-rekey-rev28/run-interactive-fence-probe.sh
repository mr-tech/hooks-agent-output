#!/usr/bin/env bash
# Usage: run-interactive-fence-probe.sh <sha> <export-root> <out>
# Runs rules.interactive-fence-probe.test.ts (beside this script) against website@<sha> in a git-archive
# export, network-isolated (unshare -rn). node_modules symlinked read-only from the shared tree.
set -u
SHA=$1; ROOT=$2; OUT=$3
WEBSITE=${WEBSITE:-/usr/local/bin/hooks/website}
HERE=$(cd "$(dirname "$0")" && pwd)
EXPORT=$ROOT/website-$SHA-ifence
rm -rf "$EXPORT"; mkdir -p "$EXPORT"
git -C "$WEBSITE" archive "$SHA" | tar -x -C "$EXPORT"
ln -s "$WEBSITE/node_modules" "$EXPORT/node_modules"
cp "$WEBSITE/next-env.d.ts" "$EXPORT/next-env.d.ts"
mkdir -p "$EXPORT/src/utils/markdown/__tests__"
cp "$HERE/rules.interactive-fence-probe.test.ts" "$EXPORT/src/utils/markdown/__tests__/"
{
  echo "sha $(git -C "$WEBSITE" rev-parse "$SHA") rules.tsx tree $(git -C "$WEBSITE" rev-parse "$SHA:src/utils/markdown/rules.tsx") export $(git hash-object "$EXPORT/src/utils/markdown/rules.tsx") probe $(sha256sum < "$HERE/rules.interactive-fence-probe.test.ts" | cut -c1-16)"
} > "$OUT"
cd "$EXPORT" || exit 2
unshare -rn bash -c '
  ip link set lo up
  nonlo=$(ip -o link show | grep -vc ": lo:"); routes=$(ip route show default | grep -c .)
  echo "isolation: non-lo links=$nonlo default routes=$routes"
  [ "$nonlo" = 0 ] && [ "$routes" = 0 ] || { echo "ISOLATION FAILED"; exit 9; }
  timeout 300 npx vitest run src/utils/markdown/__tests__/rules.interactive-fence-probe.test.ts > probe.log 2>&1
  echo "vitest exit $?"
  cat probe.out
' >> "$OUT" 2>&1
