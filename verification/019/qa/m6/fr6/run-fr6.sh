#!/bin/sh
# usage: run-fr6.sh <scratch dir> ; QA M6 Phase 2 on Fix Round 6 (website 48eb60a). Exports under <scratch dir>:
# x48 (48eb60a), x48n (48eb60a, getDirtyPaths pass-through, mutant-no-suppression-48eb60a.diff.txt), x40 (40947a6),
# x7a (a7ad3f2), xaf (af3d95a). Each run: one worker, no network (unshare -rn), its own capped scope; output to files only.
S=$1; OUT=$(cd "$(dirname "$0")" && pwd); R=/usr/local/bin/hooks/agent-output/verification/019
U=src/components/SlateEditor/utils/__tests__; M=src/components/SlateEditor/__tests__
mark() { echo "$1 load $(cat /proc/loadavg) $(date -u +%H:%M:%SZ)" >> $OUT/loads.txt; }
probe() { # tree probe-path outname
  mark "$1 $2 before"; rm -f $OUT/$3
  ( cd $S/$1 && CRPROBE_OUT=$OUT/$3 PROBE_OUT=$OUT/$3 QAPROBE_OUT=$OUT/$3 timeout -k 10 2400 systemd-run --user --scope -q -p MemoryMax=6G -p MemorySwapMax=0 -p TasksMax=512 unshare -rn npx vitest run --maxWorkers=1 --project node --project dom $2 > $OUT/log-$3.txt 2>&1 ); echo "exit $?" >> $OUT/log-$3.txt
  mark "$1 $2 after"; }
place() { # source tree dir
  cp "$1" "$S/$2/$3/$(basename "$1" .txt)"; }
# 1. typecheck (both programs) and the whole offline suite, run before any probe is placed (--exclude does not work under the
# config's projects, so the export holds no probe while these run)
mark "typecheck before"; ( cd $S/x48 && timeout -k 10 1200 pnpm run typecheck > $OUT/typecheck-48eb60a.log.txt 2>&1; echo $? > $OUT/typecheck-48eb60a.exit ); mark "typecheck after"
mark "suite before"; ( cd $S/x48 && /usr/bin/time -f '%e s' -o $OUT/suite-48eb60a.time timeout -k 10 2400 unshare -rn npx vitest run --project node --project dom --reporter=json --outputFile=$OUT/suite-48eb60a.json > $OUT/suite-48eb60a.log.txt 2>&1; echo $? > $OUT/suite-48eb60a.exit ); mark "suite after"
# probes into the exports (never the shared tree)
for t in x48 x40; do place $R/code-review/m6fix5-40947a6/crprobe.offselection-inline.test.tsx.txt $t $U; place $OUT/qaMountedOffSelection.probe.test.tsx.txt $t $M; done
for t in x48 x7a; do place $R/impl/m6-fix5-sl30-positions/crprobe.sl30-positions.test.tsx.txt $t $M; done
for t in x48 x48n; do place $R/code-review/m6fix2-85ece66/crprobe.keystroke-fixedpoint.test.tsx.txt $t $U; done
place $R/code-review/m6fix3-2b82972/crprobe.sl29-tip.test.tsx.txt x48 $U; place $R/code-review/m6fix3-2b82972/crprobe.sl29-base.test.tsx.txt xaf $U
sha256sum $S/x48/$U/crprobe.*.test.tsx $S/x48/$M/crprobe.*.test.tsx $S/x48/$M/qaMountedOffSelection.probe.test.tsx > $OUT/placed-probes.sha256
# 2. R-129: code review's off-selection rows, tip and the 40947a6 control; the mounted timer reading, tip and control
probe x48 $U/crprobe.offselection-inline.test.tsx offsel-48eb60a.jsonl
probe x40 $U/crprobe.offselection-inline.test.tsx offsel-40947a6.jsonl
probe x48 $M/qaMountedOffSelection.probe.test.tsx mounted-offsel-48eb60a.jsonl
probe x40 $M/qaMountedOffSelection.probe.test.tsx mounted-offsel-40947a6.jsonl
# 3. SL-30, tip and the a7ad3f2 control
probe x48 $M/crprobe.sl30-positions.test.tsx sl30-48eb60a.jsonl
probe x7a $M/crprobe.sl30-positions.test.tsx sl30-a7ad3f2.jsonl
# 4. CF-35: the fixed-point corpus on the tip and on its pass-through tree
probe x48 $U/crprobe.keystroke-fixedpoint.test.tsx keystroke-fixedpoint-48eb60a.json
probe x48n $U/crprobe.keystroke-fixedpoint.test.tsx keystroke-fixedpoint-48eb60a-nosupp.json
python3 -I $R/impl/m6-fix5-differentials-ded68fc/cf35-equality.py.txt $OUT/keystroke-fixedpoint-48eb60a.json $OUT/keystroke-fixedpoint-48eb60a-nosupp.json > $OUT/cf35-equality-48eb60a.out.txt 2>&1
# 5. SL-29: two interleaved rounds, base af3d95a and tip
for r in 1 2; do probe xaf $U/crprobe.sl29-base.test.tsx sl29-af3d95a-r$r.jsonl; probe x48 $U/crprobe.sl29-tip.test.tsx sl29-48eb60a-r$r.jsonl; done
echo "done $(date -u +%H:%M:%SZ)" >> $OUT/loads.txt
