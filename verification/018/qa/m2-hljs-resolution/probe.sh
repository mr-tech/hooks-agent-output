#!/usr/bin/env bash
# Does the production bundle carry highlight.js's runtime under plan rev 6 M2 (form B: bundler + paths entry)?
# Marker: the string "Falling back to no-highlight mode" — present in highlight.js 11.7.0 lib/core.js (grep -c = 1),
# reached by es/index.js -> ../lib/index.js. Control: base 7923a1d build must carry it; a never-present string must not.
# Usage: probe.sh <scratch dir> <out dir>.   Builds run with network (layout.tsx uses next/font, fetched at build).
set -u
S=$1; OUT=$2; SHA=7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe; W=/usr/local/bin/hooks/website
MARK='Falling back to no-highlight mode'; NEG='zq-never-present-marker-7731'
count() { # $1 export dir, $2 form
  grep -rl --include='*.js' -F "$MARK" "$1/.next" > "$OUT/$2-marker-files.txt" 2>/dev/null
  grep -rl --include='*.js' -F "$NEG" "$1/.next" > "$OUT/$2-neg-files.txt" 2>/dev/null
  echo "$2 marker_files=$(grep -c . "$OUT/$2-marker-files.txt") neg_files=$(grep -c . "$OUT/$2-neg-files.txt")" >> "$OUT/summary.txt"
}
: > "$OUT/summary.txt"
for F in base B; do
  D=$S/$F; rm -rf "$D"; mkdir -p "$D"
  git -C $W archive $SHA | tar -x -C "$D"
  ( cd "$D" && timeout 600 pnpm install --frozen-lockfile > "$OUT/$F-install.txt" 2>&1; echo "install exit $?" >> "$OUT/$F-install.txt" )
  if [ $F = B ]; then
    ( cd "$D" && timeout 600 pnpm add next@16.4.6 @next/bundle-analyzer@16.4.6 > "$OUT/B-add.txt" 2>&1; echo "add exit $?" >> "$OUT/B-add.txt"
      node -e '
const fs=require("fs");const t=JSON.parse(fs.readFileSync("tsconfig.json","utf8"));
t.compilerOptions.moduleResolution="bundler";
t.compilerOptions.paths["highlight.js"]=["./node_modules/highlight.js/types/index.d.ts"];
t["ts-node"].compilerOptions.moduleResolution="node";
fs.writeFileSync("tsconfig.json",JSON.stringify(t,null,2)+"\n");'
      git -C $W show $SHA:tsconfig.json | diff - tsconfig.json > "$OUT/B-tsconfig.diff"
      grep '"version"' node_modules/highlight.js/package.json > "$OUT/B-hljs-version.txt"; grep '"version"' node_modules/next/package.json >> "$OUT/B-hljs-version.txt" )
  fi
  ( cd "$D" && SKIP_ENV_VALIDATION=1 timeout 900 npx next build > "$OUT/$F-build.txt" 2>&1; echo "build exit $?" >> "$OUT/$F-build.txt" )
  count "$D" $F
done
echo done >> "$OUT/summary.txt"
