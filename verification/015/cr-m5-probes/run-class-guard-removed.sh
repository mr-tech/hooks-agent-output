#!/usr/bin/env bash
# Usage: run-class-guard-removed.sh <website> <scratch> <tip-sha> <guard-commit> <out>
# Exports website@<tip-sha>, reverse-applies <guard-commit>'s diff to src/app/preview/page.tsx (the tip with only the
# guard removed; later preview changes are kept; the run stops if the reverse patch does not apply), and runs the planner's class probe
# (../m5h-class-probe/page.class-probe.test.tsx) alone under unshare -rn.
set -u
W=$1; S=$2; SHA=$3; PRE=$4; OUT=$5
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/m5h-class-noguard-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
git -C "$W" diff "$PRE" "$PRE^" -- src/app/preview/page.tsx > "$S/guard-reverse.patch"
( cd "$E" && git apply --check "$S/guard-reverse.patch" && git apply "$S/guard-reverse.patch" ) || { echo "guard reverse patch does not apply at $SHA" > "$OUT"; exit 3; }
ln -s "$W/node_modules" "$E/node_modules"
cp "$W/next-env.d.ts" "$E/" 2>/dev/null
cp "$HERE/../m5h-class-probe/page.class-probe.test.tsx" "$E/src/app/preview/__tests__/"
cd "$E" || exit 2
{ echo "tip $(git -C "$W" rev-parse "$SHA")"; echo "page.tsx with $(git -C "$W" rev-parse "$PRE") reversed; tip blob $(git -C "$W" rev-parse "$SHA:src/app/preview/page.tsx") export $(git hash-object src/app/preview/page.tsx) guard-parent blob $(git -C "$W" rev-parse "$PRE^:src/app/preview/page.tsx")"; } > "$OUT"
EDGE_OUT="$OUT" unshare -rn bash -c 'ip link set lo up; timeout 300 npx vitest run src/app/preview/__tests__/page.class-probe.test.tsx' >> "$OUT" 2>&1
echo "exit $?" >> "$OUT"
