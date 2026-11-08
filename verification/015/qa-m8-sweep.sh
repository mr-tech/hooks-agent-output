#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> qa-m8-sweep.sh <pig repo> <sha> <rig commit> <mutator.py> <label[:mutant]> ...
# QA mutation sweep over the M8 rig (chain 015). Entry conditions E-1: one export of <sha> without .env, dependencies
# installed inside it (npm ci --omit=optional, PUPPETEER_SKIP_DOWNLOAD=1) before any namespace. Per label: a copy of
# that export (node_modules symlinked), the mutant applied, tsc -b, then the rig's probe.cjs and probe-pages.cjs at
# <rig commit> (git show from agent-output, never the working copy) run inside unshare -rn with lo up and the
# isolation counts checked. Each run's process group is killed at TIMEOUT (a kill counts as a kill).
# Writes qa-m8-<label>-<sha>.txt per run and qa-m8-sweep-summary-<sha>.txt (label, SUMMARY line, FAIL cell names).
set -u
R=$1; SHA=$2; RIG=$3; MUTATOR=$4; shift 4
HERE=$(cd "$(dirname "$0")" && pwd)
AO=$(cd "$HERE/../.." && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
TIMEOUT=${TIMEOUT:-600}
BASE=$EXPORT_ROOT/qa-m8-base-$SHA
SUMMARY=$HERE/qa-m8-sweep-summary-$SHA.txt
rm -rf "$BASE"; mkdir -p "$BASE"
git -C "$R" archive "$SHA" | tar -x -C "$BASE"
{
  echo "sha $(git -C "$R" rev-parse "$SHA"); env files in export: $(ls -a "$BASE" | grep -c '^\.env$')"
  echo "rig $RIG: probe.cjs $(git -C "$AO" rev-parse "$RIG:verification/015/m8-local-probe/probe.cjs") probe-pages.cjs $(git -C "$AO" rev-parse "$RIG:verification/015/m8-local-probe/probe-pages.cjs")"
  (cd "$BASE" && PUPPETEER_SKIP_DOWNLOAD=1 npm ci --omit=optional > "$EXPORT_ROOT/qa-m8-npm-ci-$SHA.txt" 2>&1; echo "npm ci exit $?")
} > "$SUMMARY"
for spec in "$@"; do
  IFS=: read -r label mut <<< "$spec"
  M=$EXPORT_ROOT/qa-m8-$label-$SHA
  OUT=$HERE/qa-m8-$label-$SHA.txt
  rm -rf "$M"; mkdir -p "$M"
  (cd "$BASE" && tar --exclude=./node_modules -cf - .) | tar -x -C "$M"
  ln -s "$BASE/node_modules" "$M/node_modules"
  git -C "$AO" show "$RIG:verification/015/m8-local-probe/probe.cjs" > "$M/probe.cjs"
  git -C "$AO" show "$RIG:verification/015/m8-local-probe/probe-pages.cjs" > "$M/probe-pages.cjs"
  {
    echo "label $label mutant ${mut:-none}"
    if [ -n "${mut:-}" ]; then (cd "$M" && MUT_ID=$mut python3 -I "$MUTATOR") || { echo "MUTATOR FAILED"; }; fi
    (cd "$M" && rm -rf build && npx tsc -b > tsc.txt 2>&1; echo "tsc exit $?")
  } > "$OUT" 2>&1
  if grep -q 'MUTATOR FAILED' "$OUT"; then printf '%s\tMUTATOR FAILED\n' "$label" >> "$SUMMARY"; continue; fi
  setsid unshare -rn bash -c 'ip link set lo up
    [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
    cd "$1" && node probe.cjs' _ "$M" >> "$OUT" 2>&1 &
  PID=$!
  for _ in $(seq "$TIMEOUT"); do kill -0 "$PID" 2>/dev/null || break; sleep 1; done
  if kill -0 "$PID" 2>/dev/null; then kill -TERM -- "-$PID" 2>/dev/null; sleep 2; kill -KILL -- "-$PID" 2>/dev/null; echo "TIMEOUT-KILL" >> "$OUT"; fi
  wait "$PID"; echo "probe exit $?" >> "$OUT"
  printf '%s\t%s\t%s\n' "$label" "$(grep '^SUMMARY' "$OUT" | tail -1)" "$(grep '^CELL FAIL' "$OUT" | sed 's/^CELL FAIL //; s/ -- .*//' | paste -sd';' -)" >> "$SUMMARY"
  rm -rf "$M"
done
echo "done" >> "$SUMMARY"
rm -rf "$BASE"
