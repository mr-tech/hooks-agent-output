#!/usr/bin/env bash
# Usage: run-edge.sh <website> <scratch> <sha> <out>
# Exports website@<sha>, places makeEditable.edge-probe.test.ts beside src/utils/index.ts, runs it alone
# under unshare -rn. Two rows are controls with fixed expectations; the rest print the observed outcome.
set -u
W=$1; S=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/cr-m5-edge-export-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
ln -s "$W/node_modules" "$E/node_modules"
cp "$W/next-env.d.ts" "$E/" 2>/dev/null
cp "$HERE/makeEditable.edge-probe.test.ts" "$E/src/utils/__tests__/"
cd "$E" || exit 2
{ echo "sha $(git -C "$W" rev-parse "$SHA")"; echo "utils/index.ts blob tree $(git -C "$W" rev-parse "$SHA:src/utils/index.ts") export $(git hash-object src/utils/index.ts)"; } > "$OUT"
EDGE_OUT="$OUT" unshare -rn bash -c 'ip link set lo up; timeout 300 npx vitest run src/utils/__tests__/makeEditable.edge-probe.test.ts' >> "$OUT" 2>&1
echo "exit $?" >> "$OUT"
