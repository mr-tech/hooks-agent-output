#!/usr/bin/env bash
# Runs the real-Postgres lane (pg-lane/run-qa.sh, the implementer's lane files unchanged) once unmutated (control) and
# once per mutant in m5-mutants-lane.json, each in a fresh `git archive 4b8db9c` export with one exact-once edit.
# Output: lane-sweep/<id>/{lane.json,lane.out,lane.exit,server.txt} and lane-sweep/summary.txt.
# Containers run one at a time (qa017-pglane); run-qa.sh removes each on every exit path.
set -uo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
SHA=4b8db9c
WEB=/usr/local/bin/hooks/website
SCR=/tmp/claude-1000/-usr-local-bin-hooks/be653729-405e-4194-a476-a39d049f5dba/scratchpad
OUT=$HERE/lane-sweep
mkdir -p "$OUT"; : > "$OUT/summary.txt"
ids=(control $(python3 -I -c "import json,sys;print(' '.join(m['id'] for m in json.load(open(sys.argv[1]))))" "$HERE/m5-mutants-lane.json"))
for id in "${ids[@]}"; do
  E=$SCR/lane-exp-$id; rm -rf "$E"; mkdir -p "$E"
  git -C $WEB archive $SHA | tar -x -C "$E"
  if [ "$id" != control ]; then
    python3 -I -c "
import json,sys
m=[x for x in json.load(open(sys.argv[1])) if x['id']==sys.argv[2]][0]
p=sys.argv[3]+'/'+m['file']; s=open(p).read(); c=s.count(m['old'])
assert c==1,(m['id'],c); open(p,'w').write(s.replace(m['old'],m['new']))
" "$HERE/m5-mutants-lane.json" "$id" "$E" || { echo "$id NOT-APPLIED" >> "$OUT/summary.txt"; rm -rf "$E"; continue; }
  fi
  bash "$HERE/pg-lane/run-qa.sh" "$OUT/$id" "$E/src" > /dev/null 2>&1
  python3 -I -c "
import json,sys
try:
  d=json.load(open(sys.argv[1]+'/lane.json'))
  fails=[a['title'] for f in d['testResults'] for a in f['assertionResults'] if a['status']!='passed']
  print(sys.argv[2], open(sys.argv[1]+'/lane.exit').read().strip(), 'total', d['numTotalTests'], 'failed', d['numFailedTests'], '|', ' || '.join(fails))
except Exception as e:
  print(sys.argv[2], 'NO-REPORT', repr(e))
" "$OUT/$id" "$id" >> "$OUT/summary.txt"
  rm -rf "$E"
done
docker ps -a --format '{{.Names}}' | grep -c qa017-pglane >> "$OUT/summary.txt"
