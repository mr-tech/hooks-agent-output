#!/usr/bin/env bash
# QA Phase 2 on M1 at a558f2d (and the M2 refresh at the same tree). Usage: run.sh <scratch> <out>.
set -u; S=$1; O=$2; W=/usr/local/bin/hooks/website; DIFF=/usr/local/bin/hooks/agent-output/verification/018/qa/phase-1/differential; export SKIP_ENV_VALIDATION=1
step() { local name=$1; shift; "$@" > "$O/$name.txt" 2>&1; local rc=$?; echo "$name exit $rc" >> "$O/$name.txt"; echo "$name exit $rc" >> "$O/exits.txt"; return 0; }
: > "$O/exits.txt"
T=a558f2d; X=$S/$T; rm -rf "$X"; mkdir -p "$X"; git -C $W archive $T | tar -x -C "$X"; cd "$X"
echo "shapes.ts blob $(git -C $W rev-parse $T:src/server/api/utils/shapes.ts) export $(git hash-object src/server/api/utils/shapes.ts)" > "$O/blob-identity.txt"
step $T-install timeout -k 10 600 pnpm install --frozen-lockfile
step $T-suite timeout -k 10 900 unshare -rn npx vitest run --reporter=json --outputFile="$O/$T-suite.json"
step $T-typecheck timeout -k 10 600 pnpm run typecheck
cp "$DIFF/user.save-list-differential.test.ts" src/server/api/routers/__tests__/
sha256sum src/server/api/routers/__tests__/user.save-list-differential.test.ts "$DIFF/compare.py" > "$O/instrument.sha256"
PROBE_OUT="$O/tip-a558f2d.json" step $T-differential timeout -k 10 600 unshare -rn npx vitest run src/server/api/routers/__tests__/user.save-list-differential.test.ts
rm src/server/api/routers/__tests__/user.save-list-differential.test.ts
step $T-build timeout -k 10 900 npx next build
git -C $W show $T:tsconfig.json | cmp - tsconfig.json > "$O/tsconfig-cmp.txt" 2>&1; echo "cmp-vs-commit exit $?" >> "$O/tsconfig-cmp.txt"
for M in highlightAuto registerLanguage; do for P in static server; do grep -rlF --include='*.js' "$M" .next/$P > "$O/marker-$P-$M.files" 2>/dev/null; echo "$P | $M | $(grep -c . "$O/marker-$P-$M.files")" >> "$O/bundle-counts.txt"; done; done
grep -rlE --include='*.js' '\(void 0\)\.(getLanguage|highlight|highlightAuto)\(' .next > "$O/void-receiver.files" 2>/dev/null; echo "void-receiver files | $(grep -c . "$O/void-receiver.files")" >> "$O/bundle-counts.txt"
step $T-tsnode-T timeout -k 10 300 npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"
# the two fix specs, red at c357095 (production as at b0b0158)
R=$S/c357095; rm -rf "$R"; mkdir -p "$R"; git -C $W archive c357095 | tar -x -C "$R"; cd "$R"; ln -s "$X/node_modules" node_modules
step c357095-fix-specs timeout -k 10 600 unshare -rn npx vitest run src/server/api/utils/__tests__/shapes.error-cap.test.ts src/server/api/routers/__tests__/message.save-limits.test.ts --reporter=json --outputFile="$O/c357095-fix-specs.json"
echo done >> "$O/exits.txt"
