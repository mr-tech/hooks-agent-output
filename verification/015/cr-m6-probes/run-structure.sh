#!/usr/bin/env bash
# Usage: run-structure.sh <website> <scratch> <sha> <out>
# Exports website@<sha>, places rules.fence-structure-probe.test.ts beside the markdown module, runs it alone under
# unshare -rn. Writes, per member and parser, the code blocks rendered and the text outside them, then parse
# timings of adversarial inputs, to <out> through PROBE_OUT. Observational: no row asserts.
set -u
W=$1; S=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/cr-m6-structure-export-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
ln -s "$W/node_modules" "$E/node_modules"
cp "$HERE/rules.fence-structure-probe.test.ts" "$E/src/utils/markdown/__tests__/"
cd "$E" || exit 2
echo "sha $(git -C "$W" rev-parse "$SHA"); rules.tsx blob $(git -C "$W" rev-parse "$SHA:src/utils/markdown/rules.tsx") export $(git hash-object src/utils/markdown/rules.tsx)" > "$OUT"
PROBE_OUT="$OUT" unshare -rn bash -c 'ip link set lo up; timeout 300 npx vitest run src/utils/markdown/__tests__/rules.fence-structure-probe.test.ts' > "${OUT%.txt}.vitest-output.txt" 2>&1
echo "exit $?" >> "$OUT"
