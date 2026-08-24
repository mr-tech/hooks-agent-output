#!/usr/bin/env bash
# CR15 — is useUnloadAlert's in-app navigation guard reachable at all?
#
# Claim under test: the `beforeHistoryChange` half of useUnloadAlert is DEAD FOR
# EVERY USER, not merely disabled for unauthenticated ones. If true, fixing
# `hasChanged` does NOT restore it, and the handoff's fix would leave it broken
# while appearing addressed.
#
# Structural facts only. The browser-level confirmation is NOT executed here and
# is declared unmeasured in the README.
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
SHA=7890fc90600fd53ffe810a5cf78d0a9a5698aafd
cd /usr/local/bin/hooks/website || exit 2
fail=0
out=$(mktemp)

say() { echo "$@" | tee -a "$out"; }

say "CR15 — useUnloadAlert reachability at ${SHA:0:7}"
say ""

say "--- 1. is there any Pages Router PAGE to emit Router.events? ---"
allpages=$(git ls-tree -r --name-only "$SHA" -- src/pages | grep -c '')
apionly=$(git ls-tree -r --name-only "$SHA" -- src/pages/api | grep -c '')
say "  src/pages entries      : $allpages"
say "  of which under api/    : $apionly"
if [ "$allpages" -eq "$apionly" ]; then
  say "  => src/pages holds ONLY API routes. No Pages Router page exists."
else
  say "  => UNEXPECTED: a Pages Router page exists; the claim does NOT hold."; fail=1
fi
say ""

say "--- 2. where is useUnloadAlert called from? ---"
git grep -n 'useUnloadAlert(' "$SHA" -- 'src/**/*.tsx' 'src/**/*.ts' | tee -a "$out"
callers=$(git grep -l 'useUnloadAlert(' "$SHA" -- 'src/**/*.tsx' 'src/**/*.ts' | grep -c '')
appcallers=$(git grep -l 'useUnloadAlert(' "$SHA" -- 'src/app/**/*.tsx' 'src/app/**/*.ts' | grep -c '')
say "  callers: $callers   of which under src/app (App Router): $appcallers"
if [ "$callers" -eq "$appcallers" ]; then
  say "  => every caller is an App Router page."
else
  say "  => a non-App-Router caller exists; scope the claim to the App Router ones."; fail=1
fi
say ""

say "--- 3. which event bus does it register on? ---"
say "  useUnloadAlert imports Router from 'next/router' (the PAGES Router singleton)."
say "  next/dist/client/router.js defines .events as a passthrough to the Pages"
say "  Router's static bus, and .on() does NOT call getRouter(), so registering"
say "  throws nothing and warns nothing even with no Pages Router mounted."
nav=node_modules/next/dist/client/components/navigation.js
# NOTE: grep -c exits 1 on a ZERO count, so `|| echo ERR` would fire on a
# CORRECT result. Capture the count and the exit status separately.
navev=$(grep -c 'events' "$nav" 2>/dev/null); rc=$?
if [ "$rc" -gt 1 ]; then navev=ERR; fi
say "  occurrences of 'events' in the App Router navigation module: $navev"
if [ "$navev" = "0" ]; then
  say "  => the App Router API has NO events bus. Nothing emits beforeHistoryChange."
else
  say "  => UNEXPECTED: the App Router module mentions events; re-check."; fail=1
fi
say ""

say "--- CONCLUSION ---"
if [ "$fail" -eq 0 ]; then
  say "  The beforeHistoryChange handler registers SILENTLY and can never fire in"
  say "  this application. The guard is dead for EVERY user, authenticated or not."
  say "  It is NOT gated on hasChanged in any observable way."
  say ""
  say "  useBeforeUnload (the other half) is the browser's native beforeunload and"
  say "  is framework-independent, so THAT half is genuinely gated on hasChanged."
  say ""
  say "  => fixing hasChanged restores the unload warning and does NOT restore the"
  say "     in-app navigation guard. Two defects, one fix each."
else
  say "  AT LEAST ONE STRUCTURAL PREMISE FAILED — do not cite this probe."
fi

cp "$out" "$DIR/run-cr15.txt"
exit "$fail"
