#!/usr/bin/env bash
# Re-derive the suite failure SET at a given website commit and diff it against the
# pinned baseline. Usage: ./check-expected-six.sh <sha>
#
# WHY A CLEAN EXTRACTION: the website tree is shared and carries other sessions'
# untracked test files. vitest collects them. A suite run in the working tree is
# NOT the commit's result -- measured twice on plan 013, both times +7/+7/+0.
set -euo pipefail
SHA="${1:?usage: check-expected-six.sh <sha>}"
REPO=/usr/local/bin/hooks/website
HERE="$(cd "$(dirname "$0")" && pwd)"
WORK="$(mktemp -d /tmp/expected-six-XXXXXX)"
trap 'rm -rf "$WORK"' EXIT

git -C "$REPO" archive "$SHA" | tar -x -C "$WORK"
ln -s "$REPO/node_modules" "$WORK/node_modules"
( cd "$WORK" && npx vitest run --reporter=json --outputFile="$WORK/out.json" >/dev/null 2>&1 || true )

node -e '
const fs=require("fs");
const work=process.argv[1], here=process.argv[2], sha=process.argv[3];
const r=JSON.parse(fs.readFileSync(work+"/out.json","utf8"));
const base=JSON.parse(fs.readFileSync(here+"/expected-six.json","utf8"));
const key=x=>x.file+" :: "+x.fullName+" :: "+x.reason;
const now=[];
for(const s of r.testResults) for(const a of s.assertionResults) if(a.status==="failed")
  now.push({file:(s.name||"").replace(work+"/",""),fullName:a.fullName,
    reason:((a.failureMessages&&a.failureMessages[0])||"").split("\n")[0].replace(/__vi_import_\d+__\./,"")});
const B=new Set(base.failures.map(key)), N=new Set(now.map(key));
const added=[...N].filter(k=>!B.has(k)), gone=[...B].filter(k=>!N.has(k));
console.log("sha              "+sha);
console.log("totals           "+r.numTotalTests+"/"+r.numPassedTests+"/"+r.numFailedTests+"  (totals grow each milestone; only the SET is pinned)");
console.log("baseline set     "+B.size+"   observed set  "+N.size);
added.forEach(k=>console.log("NEW FAILURE      "+k));
gone.forEach(k=>console.log("BASELINE GONE    "+k+"   <-- expected only when QA re-anchors; otherwise investigate"));
if(!added.length && !gone.length) console.log("RESULT           MATCH - the expected six, by identity and reason");
else { console.log("RESULT           DIVERGED"); process.exit(2); }
' "$WORK" "$HERE" "$SHA"
