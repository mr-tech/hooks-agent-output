#!/usr/bin/env bash
# QA Phase 2 probe for plan 015 M0 (qa/015-bug-evaluation-fixes-m0-qa.md): does vitest COLLECT and
# EXECUTE a case planted under bot/**/__tests__ at the base and at the M0 commit?
# Closes code-review Round 1's Assumption Not Checked (captures §4–5 only).
# Member: a failing case planted at bot/utils/__tests__/probe.planted.test.ts.
# Control: the same case planted at src/utils/__tests__/probe.planted.test.ts must be collected at both SHAs.
# Each run is a fresh git-archive export under <scratch-dir>; website's node_modules is symlinked, read only.
# Nothing is written into the website tree.
# Usage: qa-m0-bot-collection-probe.sh <website-repo> <scratch-dir> <base-sha> <head-sha>
set -u
REPO=$1; SCR=$2; BASE=$3; HEAD=$4
PLANT="import { it, expect } from 'vitest';
it('planted probe case', () => { expect(1).toBe(2); });"
for sha in "$BASE" "$HEAD"; do
  for where in bot/utils/__tests__ src/utils/__tests__; do
    d="$SCR/collect-$sha-$(echo "$where" | cut -d/ -f1)"
    rm -rf "$d"; mkdir -p "$d"
    git -C "$REPO" archive "$sha" | tar -x -C "$d"
    ln -s "$REPO/node_modules" "$d/node_modules"
    mkdir -p "$d/$where"
    printf '%s\n' "$PLANT" > "$d/$where/probe.planted.test.ts"
    ( cd "$d" && timeout 600 ./node_modules/.bin/vitest run --reporter=json --outputFile="$d.json" > "$d.log" 2>&1 ); rc=$?
    node -e '
      const r = require(process.argv[1]);
      const planted = r.testResults.filter(t => t.name.endsWith("probe.planted.test.ts"));
      console.log(`sha=${process.argv[2]} plant=${process.argv[3]} vitest-exit=${process.argv[4]} files=${r.testResults.length} tests=${r.numTotalTests} failed=${r.numFailedTests} planted-file-collected=${planted.length} planted-status=${planted.map(t=>t.status).join(",")||"-"}`);
    ' "$d.json" "$sha" "$where" "$rc"
    rm -rf "$d" "$d.json" "$d.log"
  done
done
