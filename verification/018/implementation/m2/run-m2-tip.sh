#!/usr/bin/env bash
# M2 acceptance run over an isolated export of a website commit, with its own install (never a symlinked node_modules).
# Usage: run-m2-tip.sh <website sha> <out dir> <export dir>
# Records each step's exit code beside its output. The build needs network (next/font); the suite runs network-isolated.
set -u
SHA=$1; OUT=$2; E=$3; W=/usr/local/bin/hooks/website
mkdir -p "$OUT"; rm -rf "$E"; mkdir -p "$E"
git -C "$W" archive "$SHA" | tar -x -C "$E"
cd "$E" || exit 1
cp tsconfig.json "$OUT/tsconfig.before-build.json"
run() { # name, command...
  local n=$1; shift
  "$@" > "$OUT/$n.out.txt" 2>&1; echo "exit $?" >> "$OUT/$n.out.txt"; echo "$n: $(tail -1 "$OUT/$n.out.txt")" >> "$OUT/summary.txt"
}
: > "$OUT/summary.txt"
run install-frozen timeout 900 pnpm install --frozen-lockfile
SKIP_ENV_VALIDATION=1 run build timeout 900 npx next build
cmp tsconfig.json "$OUT/tsconfig.before-build.json" && echo "tsconfig after build: identical to committed" >> "$OUT/summary.txt"
git -C "$W" show "$SHA":tsconfig.json | cmp - tsconfig.json && echo "tsconfig after build: cmp to git show $SHA:tsconfig.json equal" >> "$OUT/summary.txt"
echo "build log lines matching 'mandatory': $(grep -c -i mandatory "$OUT/build.out.txt")" >> "$OUT/summary.txt"
run typecheck timeout 900 pnpm run typecheck
run ts-node-T timeout 300 npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"
run ts-node-typed timeout 300 npx ts-node -r tsconfig-paths/register -e "require('~/utils/limits')"
for m in highlightAuto registerLanguage; do
  grep -rl --include='*.js' -F "$m" .next/static > "$OUT/hl-$m-static.txt" 2>/dev/null
  grep -rl --include='*.js' -F "$m" .next/server > "$OUT/hl-$m-server.txt" 2>/dev/null
  echo "$m: static=$(grep -c . "$OUT/hl-$m-static.txt") server=$(grep -c . "$OUT/hl-$m-server.txt")" >> "$OUT/summary.txt"
done
grep -rhoE --include='*.js' '\(void 0\)\.(getLanguage|highlight)\(' .next > "$OUT/hl-void0.txt" 2>/dev/null
echo "void0 receivers: $(grep -c . "$OUT/hl-void0.txt")" >> "$OUT/summary.txt"
grep -rl --include='*.js' -F 'zq-never-present-marker-7731' .next > "$OUT/hl-neg.txt" 2>/dev/null
echo "negative control files: $(grep -c . "$OUT/hl-neg.txt")" >> "$OUT/summary.txt"
unshare -rn npx vitest run --reporter=json --outputFile="$OUT/suite.json" > "$OUT/suite.out.txt" 2>&1; echo "exit $?" >> "$OUT/suite.out.txt"
echo "suite: $(tail -1 "$OUT/suite.out.txt")" >> "$OUT/summary.txt"
echo done >> "$OUT/summary.txt"
