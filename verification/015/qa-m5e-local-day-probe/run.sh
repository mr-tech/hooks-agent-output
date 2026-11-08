#!/usr/bin/env bash
# QA chain 015 M5-e probe: runs website@<sha>'s src/utils/formatMessageDate.ts (no imports; Node type
# stripping) under several TZ values, with "now" and the message instant straddling UTC midnight.
# Usage: run.sh <sha> <out>
set -u
SHA=$1; OUT=$2; HERE=$(cd "$(dirname "$0")" && pwd)
D=$(mktemp -d); trap 'rm -rf "$D"' EXIT
git -C /usr/local/bin/hooks/website show "$SHA:src/utils/formatMessageDate.ts" > "$D/formatMessageDate.ts"
cp "$HERE/probe.mjs" "$D/probe.mjs"
{
  echo "# website $SHA formatMessageDate.ts blob $(git -C /usr/local/bin/hooks/website rev-parse --short "$SHA:src/utils/formatMessageDate.ts"), node $(node --version)"
  for tz in UTC Pacific/Auckland America/Los_Angeles; do TZ=$tz node "$D/probe.mjs"; done
} > "$OUT" 2>&1
