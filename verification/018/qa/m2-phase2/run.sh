#!/usr/bin/env bash
# QA Phase 2 on M2. Usage: run.sh <scratch> <out>. Exports of f9e66c2 (parent, M1 tip) and b0b0158 (M2 tip), each with its own
# pnpm install --frozen-lockfile; no .env; SKIP_ENV_VALIDATION=1. Suites under unshare -rn. Build has network (next/font).
set -u; S=$1; O=$2; W=/usr/local/bin/hooks/website; export SKIP_ENV_VALIDATION=1
step() { local name=$1; shift; "$@" > "$O/$name.txt" 2>&1; local rc=$?; echo "$name exit $rc" >> "$O/$name.txt"; echo "$name exit $rc" >> "$O/exits.txt"; return 0; }
: > "$O/exits.txt"
for T in f9e66c2 b0b0158; do
  D=$S/$T; rm -rf "$D"; mkdir -p "$D"; git -C $W archive $T | tar -x -C "$D"
  cd "$D"
  step $T-install timeout -k 10 600 pnpm install --frozen-lockfile
  step $T-suite timeout -k 10 900 unshare -rn npx vitest run --reporter=json --outputFile="$O/$T-suite.json"
done
cd "$S/b0b0158"
echo "tsconfig blob $(git -C $W rev-parse b0b0158:tsconfig.json) export $(git hash-object tsconfig.json)" > "$O/blob-identity.txt"
cp tsconfig.json "$S/tsconfig.before.json"
step b0b0158-build timeout -k 10 900 npx next build
cmp "$S/tsconfig.before.json" tsconfig.json > "$O/tsconfig-cmp.txt" 2>&1; echo "cmp exit $?" >> "$O/tsconfig-cmp.txt"
git -C $W show b0b0158:tsconfig.json | cmp - tsconfig.json >> "$O/tsconfig-cmp.txt" 2>&1; echo "cmp-vs-commit exit $?" >> "$O/tsconfig-cmp.txt"
step b0b0158-typecheck timeout -k 10 600 pnpm run typecheck
step b0b0158-tsnode-T timeout -k 10 300 npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"
step b0b0158-tsnode-typed timeout -k 10 300 npx ts-node -r tsconfig-paths/register -e "require('~/utils/limits')"
for M in 'Falling back to no-highlight mode' highlightAuto registerLanguage; do
  for P in static server; do grep -rlF --include='*.js' "$M" .next/$P > "$O/marker-$P-${M%% *}.files" 2>/dev/null; echo "$P | $M | $(grep -c . "$O/marker-$P-${M%% *}.files")" >> "$O/bundle-counts.txt"; done
done
grep -rlE --include='*.js' '\(void 0\)\.(getLanguage|highlight|highlightAuto)\(' .next > "$O/void-receiver.files" 2>/dev/null; echo "void-receiver files | $(grep -c . "$O/void-receiver.files")" >> "$O/bundle-counts.txt"
# positive control for the void predicate on this run: a planted file
mkdir -p .next/qa-plant; echo 'x=(void 0).getLanguage(a.lang)' > .next/qa-plant/p.js
grep -rlE --include='*.js' '\(void 0\)\.(getLanguage|highlight|highlightAuto)\(' .next > "$O/void-receiver-planted.files"; echo "void-receiver files with plant | $(grep -c . "$O/void-receiver-planted.files")" >> "$O/bundle-counts.txt"; rm -rf .next/qa-plant
# mutant: drop ts-node.compilerOptions.moduleResolution; the -T check must go red (TS5095)
node -e 'const fs=require("fs");const t=JSON.parse(fs.readFileSync("tsconfig.json","utf8"));delete t["ts-node"].compilerOptions.moduleResolution;fs.writeFileSync("tsconfig.json",JSON.stringify(t,null,2)+"\n")'
step mutant-no-tsnode-key-tsnode-T timeout -k 10 300 npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"
cp "$S/tsconfig.before.json" tsconfig.json
echo done >> "$O/exits.txt"
