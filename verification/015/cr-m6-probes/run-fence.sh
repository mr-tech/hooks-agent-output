#!/usr/bin/env bash
# Usage: run-fence.sh <website> <scratch> <sha> <out>
# Exports website@<sha>, places rules.fence-members-probe.test.ts beside the markdown module, runs it alone
# under unshare -rn. Two rows are controls with fixed expectations (a two-line fence is a code block; plain
# text is not); the rest write the observed outcome per parser to <out> through PROBE_OUT.
set -u
W=$1; S=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/cr-m6-fence-export-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
ln -s "$W/node_modules" "$E/node_modules"
cp "$HERE/rules.fence-members-probe.test.ts" "$E/src/utils/markdown/__tests__/"
cd "$E" || exit 2
echo "sha $(git -C "$W" rev-parse "$SHA"); rules.tsx blob $(git -C "$W" rev-parse "$SHA:src/utils/markdown/rules.tsx") export $(git hash-object src/utils/markdown/rules.tsx)" > "$OUT"
PROBE_OUT="$OUT" unshare -rn bash -c 'ip link set lo up; timeout 300 npx vitest run src/utils/markdown/__tests__/rules.fence-members-probe.test.ts' > "${OUT%.txt}.vitest-output.txt" 2>&1
echo "exit $?" >> "$OUT"
