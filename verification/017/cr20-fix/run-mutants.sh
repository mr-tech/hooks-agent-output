#!/usr/bin/env bash
# usage: run-mutants.sh <website repo> <sha> <out dir> <scratch dir>
set -u
REPO=$1; SHA=$2; OUT=$3; SCR=$4
mkdir -p "$OUT" "$SCR"
TESTS="src/providers/MessageProvider/__tests__ src/server/api/utils/__tests__/shared.upsert-broadcast.test.ts"
PUSHER=src/providers/MessageProvider/usePusher.ts
SHARED=src/server/api/utils/shared.ts
run_one() {
  name=$1; file=$2; old=$3; new=$4
  exp="$SCR/exp-$name"; rm -rf "$exp"; mkdir -p "$exp"
  git -C "$REPO" archive "$SHA" | tar -x -C "$exp"
  ln -s "$REPO/node_modules" "$exp/node_modules"
  if [ -n "$old" ]; then python3 - "$exp/$file" "$old" "$new" <<'PY' || { echo "$name: edit did not apply exactly once" >> "$OUT/summary.txt"; return; }
import sys
p,old,new=sys.argv[1:4]
s=open(p).read()
assert s.count(old)==1,(s.count(old))
open(p,'w').write(s.replace(old,new))
PY
  fi
  ( cd "$exp" && setsid timeout -k 5 300 unshare -rn npx vitest run $TESTS --reporter=json --outputFile="$OUT/$name.json" > "$OUT/$name.out" 2>&1; echo "exit $?" > "$OUT/$name.exit" )
  python3 - "$OUT/$name.json" "$name" >> "$OUT/summary.txt" <<'PY'
import json,sys
try:
    d=json.load(open(sys.argv[1]))
    f=[t['fullName'][-110:] for r in d['testResults'] for t in r['assertionResults'] if t['status']=='failed']
    print(sys.argv[2],'failed',d['numFailedTests'],'of',d['numTotalTests']); [print('   ',x) for x in f]
except Exception as e: print(sys.argv[2],'no json',e)
PY
  rm -rf "$exp"
}
: > "$OUT/summary.txt"
DEC='(x: unknown) => { try { return JSON.parse(x as string) as unknown; } catch { return x; } }'
run_one control "" "" ""
run_one trigger-raw $SHARED "JSON.stringify(hashMessage(message))" "hashMessage(message)"
run_one record-decoded $PUSHER ".findIndex((record) => record === hash);" ".findIndex((record) => { const d = $DEC; return d(record) === d(hash); });"
run_one shown-decoded $PUSHER "hash !== shownHash" "(() => { const d = $DEC; return d(hash) !== d(shownHash); })()"
run_one record-kept-after-match $PUSHER "if (ownSaveIndex >= 0) ownSaveRecordsRef.current.splice(ownSaveIndex, 1);" ""
echo "leftover exports: $(ls -d "$SCR"/exp-* 2>/dev/null | wc -l)" >> "$OUT/summary.txt"
