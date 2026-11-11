#!/usr/bin/env bash
# Usage: positional-probe.sh <export dir> <out dir>
# Each mutant makes one list walk in validateV2Components read a single position
# (first or last) instead of every element; a mutant the test file does not kill
# means no case places the fault at the other position.
set -u
WT=$1; OUT=$2; F=$WT/src/utils/limits.tsx
mkdir -p "$OUT"; cp "$F" "$OUT/limits.orig.tsx"
declare -A M=(
  [container-first]='217s|children.map(componentReason).find(Boolean)|componentReason(children[0])|'
  [container-last]='217s|children.map(componentReason).find(Boolean)|componentReason(children[children.length - 1])|'
  [gallery-first]='213s|items.map((item) => imageReason(item, .A Media Gallery item.)).find(Boolean)|imageReason(items[0], "A Media Gallery item")|'
  [gallery-last]='213s|items.map((item) => imageReason(item, .A Media Gallery item.)).find(Boolean)|imageReason(items[items.length - 1], "A Media Gallery item")|'
  [row-first]='220s|children.map(linkButtonReason).find(Boolean)|linkButtonReason(children[0])|'
  [row-last]='220s|children.map(linkButtonReason).find(Boolean)|linkButtonReason(children[children.length - 1])|'
  [section-first]='207s|children.map(componentReason).find(Boolean)|(componentReason(children[0]) \|\| undefined)|'
  [section-last]='207s|children.map(componentReason).find(Boolean)|(componentReason(children[children.length - 1]) \|\| undefined)|'
  [top-first]='230s|asList(components).map(componentReason).find(Boolean)|componentReason(asList(components)[0])|'
  [top-last]='230s|asList(components).map(componentReason).find(Boolean)|componentReason(asList(components).at(-1) ?? {})|'
)
for name in "${!M[@]}"; do
  cp "$OUT/limits.orig.tsx" "$F"
  sed -i "${M[$name]}" "$F"
  if cmp -s "$F" "$OUT/limits.orig.tsx"; then echo "$name NOT-APPLIED" >> "$OUT/summary.txt"; continue; fi
  diff "$OUT/limits.orig.tsx" "$F" > "$OUT/$name.diff"
  (cd "$WT" && timeout -k 5 240 setsid npx vitest run src/utils/__tests__/limits.v2-send-validity.test.ts \
     --reporter=json --outputFile="$OUT/$name.json" > "$OUT/$name.log" 2>&1); rc=$?
  failed=$(node -e "try{const r=require('$OUT/$name.json');console.log(r.numFailedTests+'/'+r.numTotalTests)}catch(e){console.log('nojson')}")
  echo "$name exit=$rc failed=$failed" >> "$OUT/summary.txt"
done
cp "$OUT/limits.orig.tsx" "$F"
