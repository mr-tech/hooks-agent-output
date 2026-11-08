#!/usr/bin/env bash
# Usage: run-class-guard-removed.sh <website> <scratch> <tip-sha> <pre-guard-sha> <out>
# Exports website@<tip-sha>, replaces src/app/preview/page.tsx with its blob at <pre-guard-sha> (the tree the
# guard lands on, with the guard removed), and runs the planner's class probe
# (../m5h-class-probe/page.class-probe.test.tsx) alone under unshare -rn.
set -u
W=$1; S=$2; SHA=$3; PRE=$4; OUT=$5
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/m5h-class-noguard-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
git -C "$W" show "$PRE:src/app/preview/page.tsx" > "$E/src/app/preview/page.tsx"
ln -s "$W/node_modules" "$E/node_modules"
cp "$W/next-env.d.ts" "$E/" 2>/dev/null
cp "$HERE/../m5h-class-probe/page.class-probe.test.tsx" "$E/src/app/preview/__tests__/"
cd "$E" || exit 2
{ echo "tip $(git -C "$W" rev-parse "$SHA")"; echo "page.tsx from $(git -C "$W" rev-parse "$PRE") blob $(git -C "$W" rev-parse "$PRE:src/app/preview/page.tsx") export $(git hash-object src/app/preview/page.tsx)"; } > "$OUT"
EDGE_OUT="$OUT" unshare -rn bash -c 'ip link set lo up; timeout 300 npx vitest run src/app/preview/__tests__/page.class-probe.test.tsx' >> "$OUT" 2>&1
echo "exit $?" >> "$OUT"
