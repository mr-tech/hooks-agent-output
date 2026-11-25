#!/bin/sh
# usage: run-phase3-bench.sh <scratch dir> ; the gated time-based set's one release-tip run (testing-patterns, "Time-Based Tests"):
# the two withNormalizeNode bench files, one round each, one worker, offline (unshare -rn, lo up), in the export x48p. Files only.
S=$1; OUT=$(cd "$(dirname "$0")" && pwd); U=src/components/SlateEditor/utils/__tests__
mark() { echo "$1 load $(cat /proc/loadavg) $(date -u +%H:%M:%SZ)" >> $OUT/loads.txt; }
cd $S/x48p || exit 2
for b in keystroke-time fence-and-quote-time; do
  mark "bench $b before"; timeout -k 10 1500 unshare -rn sh -c "ip link set lo up && npx vitest bench --run --project node --maxWorkers=1 $U/withNormalizeNode.$b.bench.ts" > $OUT/bench-$b.txt 2>&1; echo $? > $OUT/bench-$b.exit; mark "bench $b after"
done
