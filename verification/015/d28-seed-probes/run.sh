#!/usr/bin/env bash
# Usage: run.sh <website> <scratch> <sha> <out>
# Exports website@<sha>, places the two seed probes beside their components, runs them under unshare -rn.
set -u
W=$1; S=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/d28-seed-export-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
ln -s "$W/node_modules" "$E/node_modules"
cp "$W/next-env.d.ts" "$E/" 2>/dev/null
cp "$HERE/NewMessageModal.seed-probe.test.tsx" "$E/src/app/message/_components/__tests__/"
cp "$HERE/WebhookMenu.seed-probe.test.tsx" "$E/src/app/message/m/[id]/send/_components/WebhookMenu/__tests__/"
cd "$E" || exit 2
echo "sha $(git -C "$W" rev-parse "$SHA")" > "$OUT"
PROBE_OUT="$OUT" unshare -rn bash -c 'ip link set lo up; timeout 300 npx vitest run seed-probe' >> "$OUT" 2>&1
echo "exit $?" >> "$OUT"
