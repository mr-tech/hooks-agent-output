#!/usr/bin/env bash
# QA rev 28 re-key checks, run from agent-output/verification/015. Read-only over captured files.
# 1. M5-h (3): the planner's guard-removed enumerator run at c5303ca vs code review's run 2 at 476c633,
#    outcome and node count per cell (rendered text and clock stripped). Positive control: the guard-present
#    run at 476c633 must differ.
# 2. B-8 D36 limb: the fixed-string count command over captured generator stderr. Positive: the drift
#    mutant runs (member absent) must count >=1. Negative: the drift controls (3.9.0 as resolved) count 0.
cd "$(dirname "$0")/.." || exit 2
norm(){ grep '^REAL ' "$1" | sed -E 's/, text="[^"]*"?//; s/text="BOTToday at [0-9:]+ [AP]M/text=/'; }
A=$(norm m5h-class-probe/noguard-run1-c5303ca.txt); B=$(norm cr-m5-probes/class-noguard-run2-476c633.txt); C=$(norm cr-m5-probes/class-probe-run-476c633.txt)
echo "enumerator cells: c5303ca=$(grep -c . <<<"$A") 476c633-run2=$(grep -c . <<<"$B") THREW@c5303ca=$(grep -c THREW <<<"$A")"
[ "$A" = "$B" ] && echo "c5303ca vs run2: IDENTICAL" || echo "c5303ca vs run2: DIFFER"
[ "$A" = "$C" ] && echo "control (guard present) vs c5303ca: IDENTICAL (control FAILED)" || echo "control (guard present) vs c5303ca: DIFFER ($(diff <(echo "$A") <(echo "$C") | grep -c '^<') lines), control fires"
LINE='generic-pool no longer exposes _waitingClientsQueue.dequeue'
for f in cr-m8-probes/drift-mutant-8de2b53-{1,2,3}.txt cr-m8-probes/drift-control-8de2b53-{1,2,3}.txt; do echo "D36 count $f: $(grep -cF "$LINE" "$f")"; done
