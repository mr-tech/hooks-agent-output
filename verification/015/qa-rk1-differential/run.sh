#!/usr/bin/env bash
# Usage: run.sh <website> <scratch> <sha> <out>
# QA RK-1 differential (chain 015). Exports website@<sha>, places rules.rk1-differential.test.ts beside the markdown
# module, runs it alone under unshare -rn (lo up, isolation checked). Writes every member where the shipped
# parseContent / parseEmbedField code blocks differ from Discord's rule, and a summary, to <out>.
# Positive control by construction: the base 7ce866b (content group [^\n]+?) must differ on multi-line members.
set -u
W=$1; S=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/qa-rk1-export-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
ln -s "$W/node_modules" "$E/node_modules"
mkdir -p "$E/src/utils/markdown/__tests__"; cp "$HERE/rules.rk1-differential.test.ts" "$E/src/utils/markdown/__tests__/"
cd "$E" || exit 2
{
  echo "sha $(git -C "$W" rev-parse "$SHA"); rules.tsx blob $(git -C "$W" rev-parse "$SHA:src/utils/markdown/rules.tsx") export $(git hash-object src/utils/markdown/rules.tsx)"
  echo "instrument blob $(git hash-object "$HERE/rules.rk1-differential.test.ts")"
} > "$OUT"
PROBE_OUT="$OUT" unshare -rn bash -c 'ip link set lo up
  [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] || { echo ISOLATION FAILED; exit 9; }
  timeout 600 npx vitest run src/utils/markdown/__tests__/rules.rk1-differential.test.ts' > "${OUT%.txt}.vitest-output.txt" 2>&1
echo "exit $?" >> "$OUT"
rm -rf "$E"
