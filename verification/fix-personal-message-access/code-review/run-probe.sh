#!/usr/bin/env bash
# Runs id-bound.probe.test.ts in an export of one website commit. Usage: run-probe.sh <sha> <work-dir> <out-dir (absolute)>
set -u
SHA="$1"; WORK="$2"; OUT="$3"; HERE="$(cd "$(dirname "$0")" && pwd)"
EXPORT="$WORK/probe-${SHA:0:7}"; trap 'rm -rf "$EXPORT"' EXIT
mkdir -p "$OUT" "$EXPORT"
git -C /usr/local/bin/hooks/website archive "$SHA" | tar -x -C "$EXPORT"
ln -s /usr/local/bin/hooks/website/node_modules "$EXPORT/node_modules"
cp "$HERE/id-bound.probe.test.ts" "$EXPORT/src/server/__tests__/id-bound.probe.test.ts"
cd "$EXPORT" && timeout -k 10 120 setsid npx vitest run --project node --reporter=json --outputFile="$OUT/probe-${SHA:0:7}.json" src/server/__tests__/id-bound.probe.test.ts > "$OUT/probe-${SHA:0:7}.out" 2>&1 < /dev/null
echo "vitest exit $?" > "$OUT/probe-${SHA:0:7}.exit"
