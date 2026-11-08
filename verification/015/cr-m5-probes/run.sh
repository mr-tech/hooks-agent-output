#!/usr/bin/env bash
# Usage: run.sh <website> <scratch> <sha> <out>
# Exports website@<sha> (git archive), symlinks node_modules read-only, drops the probe beside
# src/app/preview/page.tsx, runs it alone under unshare -rn. Output to <out> (a file, never a pipe).
set -u
W=$1; S=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/cr-m5-export-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
ln -s "$W/node_modules" "$E/node_modules"
cp "$W/next-env.d.ts" "$E/" 2>/dev/null
cp "$HERE/page.wrong-shape-probe.test.tsx" "$E/src/app/preview/__tests__/"
cd "$E" || exit 2
{ echo "sha $(git -C "$W" rev-parse "$SHA")"; echo "page.tsx blob tree $(git -C "$W" rev-parse "$SHA:src/app/preview/page.tsx") export $(git hash-object src/app/preview/page.tsx)"; } > "$OUT"
unshare -rn bash -c 'ip link set lo up; timeout 300 npx vitest run src/app/preview/__tests__/page.wrong-shape-probe.test.tsx' >> "$OUT" 2>&1 &
pid=$!; wait $pid; echo "exit $?" >> "$OUT"
