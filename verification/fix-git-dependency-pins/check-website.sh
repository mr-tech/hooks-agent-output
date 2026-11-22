#!/usr/bin/env bash
# Spec check for website's GitHub dependency pins at one committed revision, run in a git-archive export (never the shared tree).
# Usage: check-website.sh <website repo> <rev> <out-dir>
# Writes every step's output to files under <out-dir>; prints one PASS/FAIL line per assertion; exits non-zero when any fails.
#   W1 package.json names project-utils and paracord each by a full 40-hex commit.
#   W2 `pnpm install --frozen-lockfile` exits 0.
#   W3 the installed project-utils carries no prisma-kysely: its package.json lists it in no runtime set, and the pnpm store
#      under node_modules/.pnpm holds no prisma-kysely package.
#   W4 `vitest run` (JSON reporter) exits 0 with no failed case.
#   W5 `pnpm run typecheck` (both tsc programs) exits 0, after `next typegen` writes the gitignored next-env.d.ts and
#      .next/types that a development checkout or a build carries and a bare export does not.
set -u
repo=$1; rev=$2; out=$3
mkdir -p "$out"
work=$(mktemp -d "${TMPDIR:-/tmp}/web-check.XXXXXX")
fail=0
: > "$out/result.txt"
pass() { echo "PASS $1" | tee -a "$out/result.txt"; }
failm() { echo "FAIL $1" | tee -a "$out/result.txt"; fail=1; }
sha=$(git -C "$repo" rev-parse --verify "$rev^{commit}") || { echo "bad rev"; exit 2; }
echo "rev $sha node $(node -v) pnpm $(pnpm -v)" | tee "$out/meta.txt"
git -C "$repo" archive "$sha" | tar -x -C "$work"
cd "$work" || exit 2

node -e '
const p=require("./package.json");const all={...p.dependencies,...p.devDependencies};
const r={projectUtils:all["project-utils"],paracord:all.paracord};console.log(JSON.stringify(r));
process.exit(/#[0-9a-f]{40}$/.test(r.projectUtils||"")&&/#[0-9a-f]{40}$/.test(r.paracord||"")?0:1);' > "$out/w1-specifiers.json" 2>&1 \
  && pass "W1 project-utils and paracord are pinned by full commit" \
  || failm "W1 project-utils and paracord are pinned by full commit ($(cat "$out/w1-specifiers.json"))"

timeout 900 pnpm install --frozen-lockfile > "$out/w2-install.txt" 2>&1; inst=$?; echo "exit $inst" >> "$out/w2-install.txt"
[ "$inst" = 0 ] && pass "W2 pnpm install --frozen-lockfile exits 0" || failm "W2 pnpm install --frozen-lockfile exits 0 (exit $inst)"

{ readlink -f node_modules/project-utils; ls -1 node_modules/.pnpm | grep -e '^prisma-kysely@' -e '^project-utils@' -e '^@prisma+internals@'; } > "$out/w3-store.txt" 2>&1
node -e '
const p=require("./node_modules/project-utils/package.json");
const r={dependencies:Object.keys(p.dependencies||{}),devDependencies:Object.keys(p.devDependencies||{})};console.log(JSON.stringify(r));
process.exit((p.dependencies||{})["prisma-kysely"]?1:0);' > "$out/w3-project-utils-manifest.json" 2>&1; pm=$?
if [ "$inst" = 0 ] && [ "$pm" = 0 ] && ! grep -q '^prisma-kysely@' "$out/w3-store.txt"; then
  pass "W3 the installed project-utils brings no prisma-kysely"
else
  failm "W3 the installed project-utils brings no prisma-kysely (manifest exit $pm; see w3-store.txt)"
fi

timeout 1200 npx vitest run --reporter=json --outputFile="$out/w4-vitest.json" > "$out/w4-vitest.txt" 2>&1; vt=$?; echo "exit $vt" >> "$out/w4-vitest.txt"
node -e '
const r=require(process.argv[1]);console.log(JSON.stringify({numTotalTests:r.numTotalTests,numPassedTests:r.numPassedTests,numFailedTests:r.numFailedTests,numPendingTests:r.numPendingTests,files:r.testResults.length}));
' "$out/w4-vitest.json" > "$out/w4-summary.json" 2>&1
node -e 'const r=require(process.argv[1]);console.log(r.testResults.map(t=>t.name.replace(process.argv[2]+"/","")).sort().join("\n"))' "$out/w4-vitest.json" "$work" > "$out/w4-files.txt" 2>&1
if [ "$vt" = 0 ] && grep -q '"numFailedTests":0' "$out/w4-summary.json"; then pass "W4 vitest exits 0, no failed case ($(cat "$out/w4-summary.json"))"; else failm "W4 vitest exits 0, no failed case (exit $vt; $(cat "$out/w4-summary.json"))"; fi

timeout 600 npx next typegen > "$out/w5-next-typegen.txt" 2>&1; echo "exit $?" >> "$out/w5-next-typegen.txt"
timeout 900 pnpm run typecheck > "$out/w5-typecheck.txt" 2>&1; tc=$?; echo "exit $tc" >> "$out/w5-typecheck.txt"
[ "$tc" = 0 ] && pass "W5 pnpm run typecheck exits 0" || failm "W5 pnpm run typecheck exits 0 (exit $tc)"

cd / && rm -rf "$work"
exit $fail
