#!/usr/bin/env bash
# QA last Phase 2 (M4, refresh of M1-M3, M2-b rev 8 edge limb) at d1bb9b0. Usage: run.sh <scratch> <out>.
set -u; S=$1; O=$2; W=/usr/local/bin/hooks/website; R=/usr/local/bin/hooks/agent-output/verification/018; export SKIP_ENV_VALIDATION=1
step() { local name=$1; shift; "$@" > "$O/$name.txt" 2>&1; local rc=$?; echo "$name exit $rc" >> "$O/$name.txt"; echo "$name exit $rc" >> "$O/exits.txt"; return 0; }
: > "$O/exits.txt"
B=$S/7923a1d; rm -rf "$B"; mkdir -p "$B"; git -C $W archive 7923a1d | tar -x -C "$B"; cd "$B"
step 7923a1d-install timeout -k 10 600 pnpm install --frozen-lockfile
pnpm list --prod --depth Infinity --json > "$O/7923a1d-prod.json" 2>"$O/7923a1d-prod.err"; echo "7923a1d prod-list exit $?" >> "$O/exits.txt"
X=$S/d1bb9b0; rm -rf "$X"; mkdir -p "$X"; git -C $W archive d1bb9b0 | tar -x -C "$X"; cd "$X"
step d1bb9b0-install timeout -k 10 600 pnpm install --frozen-lockfile --offline
pnpm list --prod --depth Infinity --json > "$O/d1bb9b0-prod.json" 2>"$O/d1bb9b0-prod.err"; echo "d1bb9b0 prod-list exit $?" >> "$O/exits.txt"
node -e 'console.log("zod resolved", require(require.resolve("zod/package.json",{paths:["src/server/api/utils"]})).version)' > "$O/zod-resolved.txt" 2>&1
step d1bb9b0-suite timeout -k 10 900 unshare -rn npx vitest run --reporter=json --outputFile="$O/d1bb9b0-suite.json"
step d1bb9b0-lint timeout -k 10 900 unshare -rn pnpm exec eslint . --max-warnings=0 --format json -o "$O/d1bb9b0-lint.json"
cp "$R/qa/phase-1/differential/user.save-list-differential.test.ts" src/server/api/routers/__tests__/
sha256sum src/server/api/routers/__tests__/user.save-list-differential.test.ts "$R/qa/phase-1/differential/compare.py" "$R/code-review/m3/prod-edges.py" > "$O/instrument.sha256"
PROBE_OUT="$O/tip-d1bb9b0.json" step d1bb9b0-differential timeout -k 10 600 unshare -rn npx vitest run src/server/api/routers/__tests__/user.save-list-differential.test.ts
rm src/server/api/routers/__tests__/user.save-list-differential.test.ts
step d1bb9b0-build timeout -k 10 900 npx next build
git -C $W show d1bb9b0:tsconfig.json | cmp - tsconfig.json > "$O/tsconfig-cmp.txt" 2>&1; echo "cmp-vs-commit exit $?" >> "$O/tsconfig-cmp.txt"
id=$(cat .next/BUILD_ID); (cd .next && find server static -type f | sort | while read -r f; do printf '%s  %s\n' "$(sed "s/$id/BUILDID/g" "$f" | sha256sum | cut -c1-64)" "$(echo "$f" | sed "s/$id/BUILDID/g")"; done) > "$O/d1bb9b0-build.manifest"
find .next -name '*.nft.json' -print0 | xargs -0 cat | tr ',' '\n' | grep -o 'node_modules/[^"]*' | sed 's|.*node_modules/\.pnpm/||' | sort -u > "$O/d1bb9b0-build.manifest.nft-paths"
for M in highlightAuto registerLanguage; do for P in static server; do grep -rlF --include='*.js' "$M" .next/$P > "$O/marker-$P-$M.files" 2>/dev/null; echo "$P | $M | $(grep -c . "$O/marker-$P-$M.files")" >> "$O/bundle-counts.txt"; done; done
grep -rlE --include='*.js' '\(void 0\)\.(getLanguage|highlight|highlightAuto)\(' .next > "$O/void-receiver.files" 2>/dev/null; echo "void-receiver files | $(grep -c . "$O/void-receiver.files")" >> "$O/bundle-counts.txt"
step d1bb9b0-typecheck timeout -k 10 600 pnpm run typecheck
step d1bb9b0-tsnode-T timeout -k 10 300 npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"
step d1bb9b0-tsnode-typed timeout -k 10 300 npx ts-node -r tsconfig-paths/register -e "require('~/utils/limits')"
# R6 re-read in the installed next 16.4.6
N=$(node -e 'console.log(require("path").dirname(require.resolve("next/package.json")))'); { echo "next $(node -p "require('$N/package.json').version") at $N";
  grep -rn "MAX_BF_CACHE_ENTRIES =" "$N/dist/client/components/" | head -3
  ls "$N"/dist/client/components/segment-cache/ 2>/dev/null | grep -i segment-key
  grep -rln "create-segment-key.browser" "$N/dist/build/" | head -3
  cat "$N"/dist/shared/lib/segment-cache/create-segment-key.browser.js "$N"/dist/client/components/segment-cache/create-segment-key.browser.js 2>/dev/null | head -30
  grep -n "cacheComponents" next.config.js; } > "$O/r6-reread.txt" 2>&1
grep -rlF '|value|' .next/static > /dev/null 2>&1
echo done >> "$O/exits.txt"
