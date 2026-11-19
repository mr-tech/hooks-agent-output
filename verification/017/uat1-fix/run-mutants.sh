#!/usr/bin/env bash
# usage: run-mutants.sh <website repo> <sha> <out dir> <scratch dir>
set -u
REPO=$1; SHA=$2; OUT=$3; SCR=$4
mkdir -p "$OUT" "$SCR"
TESTS="src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx src/providers/MessageProvider/__tests__/usePusher.hash-parity.test.ts"
run_one() {
  name=$1; old=$2; new=$3
  exp="$SCR/exp-$name"; rm -rf "$exp"; mkdir -p "$exp"
  git -C "$REPO" archive "$SHA" | tar -x -C "$exp"
  ln -s "$REPO/node_modules" "$exp/node_modules"
  if [ -n "$old" ]; then python3 - "$exp/src/providers/MessageProvider/usePusher.ts" "$old" "$new" <<'PY' || { echo "$name: edit did not apply exactly once" >> "$OUT/summary.txt"; return; }
import sys
p,old,new=sys.argv[1:4]
s=open(p).read()
assert s.count(old)==1,(s.count(old))
open(p,'w').write(s.replace(old,new))
PY
  fi
  ( cd "$exp" && setsid timeout -k 5 300 npx vitest run $TESTS --reporter=json --outputFile="$OUT/$name.json" > "$OUT/$name.out" 2>&1; echo "exit $?" > "$OUT/$name.exit" )
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
run_one control "" ""
run_one record-raw "asDelivered(record) === hash" "record === hash"
run_one shown-raw "hash !== asDelivered(shownHash)" "hash !== shownHash"
run_one any-number-is-own "asDelivered(record) === hash" "(asDelivered(record) === hash || typeof hash === 'number')"
run_one parse-failure-lost "    return hash;
  }
}" "    return undefined;
  }
}"
run_one record-kept-after-match "if (ownSaveIndex >= 0) ownSaveRecordsRef.current.splice(ownSaveIndex, 1);" ""
echo "leftover exports: $(ls -d "$SCR"/exp-* 2>/dev/null | wc -l)" >> "$OUT/summary.txt"
