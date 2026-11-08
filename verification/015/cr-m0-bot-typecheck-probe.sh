#!/usr/bin/env bash
# Code-review probe for plan 015 M0 (TDD row 2's disclosed gap): does the test tsc program
# see a type error planted under bot/**/__tests__ at the base and at the M0 commit?
# Control: the same error planted under src/**/__tests__ must be seen at both SHAs.
# Runs in git-archive exports under the scratch dir; website's node_modules is symlinked, read only.
# Usage: cr-m0-bot-typecheck-probe.sh <website-repo> <scratch-dir> <base-sha> <head-sha>
set -u
REPO=$1; SCR=$2; BASE=$3; HEAD=$4
PLANT='export const planted: number = '"'"'a'"'"';'
for sha in "$BASE" "$HEAD"; do
  for where in bot/utils/__tests__ src/utils/__tests__; do
    d="$SCR/export-$sha-$(echo "$where" | cut -d/ -f1)"
    rm -rf "$d"; mkdir -p "$d"
    git -C "$REPO" archive "$sha" | tar -x -C "$d"
    ln -s "$REPO/node_modules" "$d/node_modules"
    mkdir -p "$d/$where"
    echo "$PLANT" > "$d/$where/probe.planted.test.ts"
    ( cd "$d" && timeout 300 ./node_modules/.bin/tsc --noEmit --incremental false -p tsconfig.test.json > "$d.tsc.out" 2>&1 ); rc=$?
    hits=$(grep -c "probe.planted.test.ts.*TS2322" "$d.tsc.out")
    other=$(grep -c "error TS" "$d.tsc.out")
    echo "sha=$sha plant=$where test-program-exit=$rc planted-TS2322=$hits all-error-TS=$other"
    rm -rf "$d"
  done
done
