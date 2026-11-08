#!/usr/bin/env bash
# Usage: qa-m4-suite-run.sh <sha> <export-root> <out-prefix>
# Implementer gate run (copy of qa-m4-suite-run.sh) of website@<sha> in an isolated export (git archive), network-isolated
# (unshare -rn, lo up, isolation counts checked before the run). node_modules is symlinked to the
# shared tree's (read only); next-env.d.ts (git-ignored) is copied. Writes:
#   <out-prefix>-testresults-<sha>.json   vitest JSON reporter
#   <out-prefix>-run-<sha>.txt            isolation counts, vitest exit, typecheck output and exit
set -u
SHA=$1; ROOT=$2; PREFIX=$3
WEBSITE=${WEBSITE:-/usr/local/bin/hooks/website}
EXPORT=$ROOT/website-$SHA-suite
OUT=$PREFIX-run-$SHA.txt
JSON=$PREFIX-testresults-$SHA.json
rm -rf "$EXPORT"; mkdir -p "$EXPORT"
git -C "$WEBSITE" archive "$SHA" | tar -x -C "$EXPORT"
ln -s "$WEBSITE/node_modules" "$EXPORT/node_modules"
cp "$WEBSITE/next-env.d.ts" "$EXPORT/next-env.d.ts"
{
  echo "export: $EXPORT  sha: $(git -C "$WEBSITE" rev-parse "$SHA")"
  echo "blob check src/server/api/routers/message.ts: tree $(git -C "$WEBSITE" rev-parse "$SHA:src/server/api/routers/message.ts") export $(git hash-object "$EXPORT/src/server/api/routers/message.ts")"
} > "$OUT"
cd "$EXPORT" || exit 2
unshare -rn bash -c '
  ip link set lo up
  nonlo=$(ip -o link show | grep -vc ": lo:"); routes=$(ip route show default | grep -c .)
  echo "isolation: non-lo links=$nonlo default routes=$routes"
  [ "$nonlo" = 0 ] && [ "$routes" = 0 ] || { echo "ISOLATION FAILED"; exit 9; }
  timeout 900 npx vitest run --reporter=json --outputFile="'"$JSON"'" > /dev/null 2>"'"$OUT"'.stderr"
  echo "vitest exit $?"
  timeout 900 pnpm run typecheck > "'"$OUT"'.typecheck" 2>&1
  echo "typecheck exit $?"
' >> "$OUT" 2>&1
cat "$OUT.typecheck" >> "$OUT"; rm -f "$OUT.typecheck"
echo "stderr lines: $(grep -c . "$OUT.stderr")" >> "$OUT"
