#!/bin/bash
# Usage: run2.sh <website> <scratch> <sha> <out dir>
set -u
W=$1; S=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/folder-export-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
ls -d "$E"/.env* 2>/dev/null | wc -l | sed 's/^/env files in export: /' > "$OUT/run2-output.txt"
ln -s "$W/node_modules" "$E/node_modules"
cp "$W/next-env.d.ts" "$E/" 2>/dev/null
echo "sha $(git -C "$W" rev-parse "$SHA")" >> "$OUT/run2-output.txt"
PORT=3917
RUNSCRIPT=$HERE/run2.cjs OUT=$OUT timeout 600 unshare -rn bash "$HERE/server.sh" "$E" "$S/folder-home" $PORT >> "$OUT/run2-output.txt" 2>&1
echo "exit $?" >> "$OUT/run2-output.txt"
