#!/usr/bin/env bash
# Usage: run.sh <website> <scratch> <sha> <out-dir>
# Same rig as ../cr-m5-probes/run.sh, with the REAL DiscordMessageEditor and MarkdownProvider (only env.mjs and
# next/navigation substituted). Exports website@<sha>, symlinks node_modules, drops the probe beside
# src/app/preview/page.tsx, runs it alone under unshare -rn. Outcomes go to <out-dir>/outcomes.txt via PROBE_OUT.
set -u
W=$1; S=$2; SHA=$3; OUTD=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/critic-m5h-export-$SHA; OUT=$OUTD/run-$SHA.txt
rm -rf "$E"; mkdir -p "$E" "$OUTD"
git -C "$W" archive "$SHA" | tar -x -C "$E"
ln -s "$W/node_modules" "$E/node_modules"
cp "$W/next-env.d.ts" "$E/" 2>/dev/null
mkdir -p "$E/src/app/preview/__tests__"
cp "$HERE/page.real-editor-render-probe.test.tsx" "$E/src/app/preview/__tests__/"
cd "$E" || exit 2
{ echo "sha $(git -C "$W" rev-parse "$SHA")"; echo "page.tsx blob tree $(git -C "$W" rev-parse "$SHA:src/app/preview/page.tsx") export $(git hash-object src/app/preview/page.tsx)"; } > "$OUT"
rm -f "$OUTD/outcomes.txt"
PROBE_OUT=$OUTD/outcomes.txt unshare -rn bash -c 'ip link set lo up; timeout 300 npx vitest run src/app/preview/__tests__/page.real-editor-render-probe.test.tsx' >> "$OUT" 2>&1
echo "exit $?" >> "$OUT"
