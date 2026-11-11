#!/bin/bash
# Build a website commit in an isolated export. Usage: build-tip.sh <sha> <scratch-dir> <out-dir>
# Output goes to files under <out-dir>; nothing in the shared tree is touched. .env.local is copied
# (values never printed); the build writes nothing remote.
set -u
SHA=$1; S=$2; OUT=$3
W=/usr/local/bin/hooks/website
E=$S/export-$SHA
mkdir -p "$E" "$OUT"
git -C $W archive "$SHA" | tar -x -C "$E"
{ echo "archive exit $?"; echo "tree $(git -C $W rev-parse "$SHA^{tree}")"; } > "$OUT/build-steps.txt"
cp -a $W/node_modules "$E/node_modules"; echo "node_modules copy exit $?" >> "$OUT/build-steps.txt"
cp $W/.env.local "$E/.env.local"; echo "env copy exit $?" >> "$OUT/build-steps.txt"
cd "$E" || exit 2
date -u +%FT%TZ > "$OUT/build-start.txt"
systemd-run --user --scope -p RuntimeMaxSec=900 -p MemoryMax=6G -p TasksMax=2000 npx next build > "$OUT/next-build.txt" 2>&1
echo "build exit $?" > "$OUT/build-exit.txt"
date -u +%FT%TZ >> "$OUT/build-exit.txt"
