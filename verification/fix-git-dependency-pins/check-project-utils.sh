#!/usr/bin/env bash
# Spec check for project-utils at one committed revision, run in an isolated export (never the shared tree).
# Usage: check-project-utils.sh <project-utils repo> <rev> <out-dir>
# Writes every step's output to files under <out-dir>; prints one PASS/FAIL line per assertion and exits
# non-zero when any assertion fails.
#   A1 manifest: prisma-kysely is in devDependencies and not in dependencies; the lockfile root agrees and
#      marks node_modules/prisma-kysely dev.
#   A2 rebuild: `npm ci` then `npm run build && npm run build:types` reproduces the committed dist/ byte for
#      byte (diff -r, both directions) and leaves src/ untouched; `eslint . --max-warnings=0` (no --fix) exits 0.
#   A3 runtime set: `npm ci --omit=dev` installs no node_modules/prisma-kysely.
#   A4 the package entry point loads under that runtime install: require('./dist/index.js') exposes getPostgres.
set -u
repo=$1; rev=$2; out=$3
mkdir -p "$out"
work=$(mktemp -d "${TMPDIR:-/tmp}/pu-check.XXXXXX")
fail=0
pass() { echo "PASS $1" | tee -a "$out/result.txt"; }
failm() { echo "FAIL $1" | tee -a "$out/result.txt"; fail=1; }
: > "$out/result.txt"
sha=$(git -C "$repo" rev-parse --verify "$rev^{commit}") || { echo "bad rev"; exit 2; }
echo "rev $sha node $(node -v) npm $(npm -v)" | tee "$out/meta.txt"

mkdir -p "$work/full" "$work/rt" "$work/committed"
git -C "$repo" archive "$sha" | tar -x -C "$work/full"
git -C "$repo" archive "$sha" | tar -x -C "$work/rt"
git -C "$repo" archive "$sha" dist src | tar -x -C "$work/committed"

node -e '
const fs=require("fs");const d=process.argv[1];
const p=JSON.parse(fs.readFileSync(d+"/package.json"));const l=JSON.parse(fs.readFileSync(d+"/package-lock.json"));
const r=l.packages[""];const e=l.packages["node_modules/prisma-kysely"]||{};
const ok=!(p.dependencies||{})["prisma-kysely"]&&!!(p.devDependencies||{})["prisma-kysely"]
 &&!(r.dependencies||{})["prisma-kysely"]&&!!(r.devDependencies||{})["prisma-kysely"]&&e.dev===true;
console.log(JSON.stringify({pkgDeps:(p.dependencies||{})["prisma-kysely"]||null,pkgDev:(p.devDependencies||{})["prisma-kysely"]||null,lockRootDeps:(r.dependencies||{})["prisma-kysely"]||null,lockRootDev:(r.devDependencies||{})["prisma-kysely"]||null,lockEntryDev:e.dev===true}));
process.exit(ok?0:1);' "$work/full" > "$out/a1-manifest.json" 2>&1 \
  && pass "A1 prisma-kysely is a devDependency in package.json and package-lock.json" \
  || failm "A1 prisma-kysely is a devDependency in package.json and package-lock.json ($(cat "$out/a1-manifest.json"))"

( cd "$work/full" && timeout 600 npm ci --no-audit --no-fund ) > "$out/a2-npm-ci.txt" 2>&1; echo "exit $?" >> "$out/a2-npm-ci.txt"
( cd "$work/full" && timeout 300 npx eslint . --max-warnings=0 ) > "$out/a2-eslint.txt" 2>&1; lint=$?; echo "exit $lint" >> "$out/a2-eslint.txt"
( cd "$work/full" && timeout 600 npm run build && timeout 600 npm run build:types ) > "$out/a2-build.txt" 2>&1; build=$?; echo "exit $build" >> "$out/a2-build.txt"
diff -r "$work/committed/dist" "$work/full/dist" > "$out/a2-dist.diff" 2>&1; dd=$?
diff -r "$work/committed/src" "$work/full/src" > "$out/a2-src.diff" 2>&1; sd=$?
echo "lint=$lint build=$build distdiff=$dd srcdiff=$sd" > "$out/a2-summary.txt"
[ "$lint" = 0 ] && [ "$build" = 0 ] && [ "$dd" = 0 ] && [ "$sd" = 0 ] \
  && pass "A2 a clean rebuild reproduces the committed dist/ (lint=$lint build=$build)" \
  || failm "A2 a clean rebuild reproduces the committed dist/ ($(cat "$out/a2-summary.txt"); see a2-dist.diff)"

( cd "$work/rt" && timeout 600 npm ci --omit=dev --no-audit --no-fund ) > "$out/a3-npm-ci-omit-dev.txt" 2>&1; rtci=$?; echo "exit $rtci" >> "$out/a3-npm-ci-omit-dev.txt"
( cd "$work/rt" && ls -d node_modules/prisma-kysely node_modules/@prisma/internals node_modules/@mrleebo/prisma-ast ) > "$out/a3-presence.txt" 2>&1
( cd "$work/rt" && ls -1A node_modules ) > "$out/a3-top-level-dirs.txt" 2>&1
if [ "$rtci" = 0 ] && [ ! -e "$work/rt/node_modules/prisma-kysely" ]; then pass "A3 a runtime-only install omits prisma-kysely"; else failm "A3 a runtime-only install omits prisma-kysely (npm ci exit $rtci; see a3-presence.txt)"; fi

( cd "$work/rt" && timeout 60 node -e 'const m=require("./dist/index.js");if(typeof m.getPostgres!=="function")process.exit(1);console.log(Object.keys(m).join(","))' ) > "$out/a4-require.txt" 2>&1; rq=$?; echo "exit $rq" >> "$out/a4-require.txt"
[ "$rq" = 0 ] && pass "A4 dist/index.js loads under the runtime-only install" || failm "A4 dist/index.js loads under the runtime-only install (exit $rq)"

rm -rf "$work"
exit $fail
