#!/bin/bash
# Build a website commit in an isolated export; nothing in the shared tree is touched.
# Usage: build-tip.sh <sha> <export-dir (new, empty)> <out-dir>
# No .env* is copied; SKIP_ENV_VALIDATION=1 as the code review's builds had it.
set -u
SHA=$1; E=$2; OUT=$3
W=/usr/local/bin/hooks/website
mkdir -p "$E" "$OUT"
git -C $W archive "$SHA" | tar -x -C "$E"; echo "archive exit $?" > "$OUT/steps.txt"
git -C $W rev-parse "$SHA^{tree}" >> "$OUT/steps.txt"
cp -al $W/node_modules "$E/node_modules"; echo "node_modules link exit $?" >> "$OUT/steps.txt"
cd "$E" || exit 9
date -u +%FT%TZ > "$OUT/build-start.txt"
SKIP_ENV_VALIDATION=1 systemd-run --user --scope -p RuntimeMaxSec=900 -p MemoryMax=8G -p TasksMax=2000 npx next build > "$OUT/build.txt" 2>&1
echo "$?" > "$OUT/build.exit"
date -u +%FT%TZ >> "$OUT/build-start.txt"
cp .next/server/functions-config-manifest.json "$OUT/functions-config-manifest.json" 2>/dev/null
cp .next/server/middleware-manifest.json "$OUT/middleware-manifest.json" 2>/dev/null
python3 -I /usr/local/bin/hooks/agent-output/verification/fix-middleware-dead-matcher/code-review/check-proxy-registered.py "$E" > "$OUT/check-proxy-registered.txt" 2>&1
echo "$?" > "$OUT/check-proxy-registered.exit"
grep -c 'middleware" file convention is deprecated' "$OUT/build.txt" > "$OUT/deprecation-count.txt"
