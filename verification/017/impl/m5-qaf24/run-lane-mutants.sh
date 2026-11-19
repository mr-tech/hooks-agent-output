#!/usr/bin/env bash
# Usage: run-lane-mutants.sh <website-sha> <lane-dir> <out-dir> <export-parent-dir>
# Runs the real-Postgres lane (<lane-dir>/run.sh) once on an unmutated `git archive <sha>` export (control) and once per mutant
# in lane-clock-mutants.json, each in its own fresh export with one exact-once edit. Output per run goes to files under
# <out-dir>/<id>/, never a pipe; each run is its own process group, killed at 400 s (a kill counts as a kill).
# The shared tree is never mutated. Prints one summary line per run to <out-dir>/summary.txt, and the count of leftover containers last.
set -uo pipefail
SHA=${1:?website sha}; LANE=$(realpath "${2:?lane dir}"); OUT=$(realpath -m "${3:?out dir}"); TMP=$(realpath -m "${4:?export parent dir}")
HERE=$(cd "$(dirname "$0")" && pwd)
WEB=/usr/local/bin/hooks/website
mkdir -p "$OUT" "$TMP"; : > "$OUT/summary.txt"
ids=(control $(python3 -I -c "import json,sys;print(' '.join(m['id'] for m in json.load(open(sys.argv[1]))))" "$HERE/lane-clock-mutants.json"))
for id in "${ids[@]}"; do
  E=$TMP/lane-exp-$id; rm -rf "$E"; mkdir -p "$E"
  git -C $WEB archive "$SHA" | tar -x -C "$E"
  if [ "$id" != control ]; then
    python3 -I -c "
import json,sys
m=[x for x in json.load(open(sys.argv[1])) if x['id']==sys.argv[2]][0]
p=sys.argv[3]+'/'+m['file']; s=open(p).read(); c=s.count(m['old'])
assert c==1,(m['id'],c); open(p,'w').write(s.replace(m['old'],m['new']))
" "$HERE/lane-clock-mutants.json" "$id" "$E" || { echo "$id NOT-APPLIED" >> "$OUT/summary.txt"; rm -rf "$E"; continue; }
  fi
  mkdir -p "$OUT/$id"
  setsid timeout -k 10 400 bash "$LANE/run.sh" "$OUT/$id" "$E/src" > "$OUT/$id/driver.out" 2>&1
  echo "driver-exit $?" > "$OUT/$id/driver.exit"
  python3 -I -c "
import json,sys
try:
  d=json.load(open(sys.argv[1]+'/lane.json'))
  fails=[a['title'][:60] for f in d['testResults'] for a in f['assertionResults'] if a['status']!='passed']
  print(sys.argv[2], open(sys.argv[1]+'/lane.exit').read().strip(), 'total', d['numTotalTests'], 'failed', d['numFailedTests'], '|', ' || '.join(fails))
except Exception as e:
  print(sys.argv[2], 'NO-REPORT', repr(e))
" "$OUT/$id" "$id" >> "$OUT/summary.txt"
  rm -rf "$E"
done
echo "leftover-containers $(docker ps -a --format '{{.Names}}' | grep -c impl017-pglane)" >> "$OUT/summary.txt"
