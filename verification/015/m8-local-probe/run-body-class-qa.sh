#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> run-body-class-qa.sh <pig repo> <sha> <out file> [<mutator.py> <mutant>]
# One export of <sha> (no .env), npm ci outside the namespace, optional mutant, tsc -b, then probe-body-class.cjs and
# obs-preload.cjs from this directory's committed blobs at HEAD of agent-output, run under unshare -rn with lo up and
# the isolation checked. The run's process group is killed at TIMEOUT (default 300 s).
set -u
R=$1; SHA=$2; OUT=$3; MUTATOR=${4:-}; MUT=${5:-}
HERE=$(cd "$(dirname "$0")" && pwd); AO=$(cd "$HERE/../../.." && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"; TIMEOUT=${TIMEOUT:-300}
E=$EXPORT_ROOT/qa-bodyclass-$SHA-${MUT:-none}; rm -rf "$E"; mkdir -p "$E"
git -C "$R" archive "$SHA" | tar -x -C "$E"
{
  echo "sha $(git -C "$R" rev-parse "$SHA") mutant ${MUT:-none}; .env in export: $(ls -a "$E" | grep -c '^\.env$')"
  for f in probe-body-class.cjs obs-preload.cjs; do git -C "$AO" show "HEAD:verification/015/m8-local-probe/$f" > "$E/$f"; echo "$f blob $(git -C "$AO" rev-parse "HEAD:verification/015/m8-local-probe/$f")"; done
  (cd "$E" && PUPPETEER_SKIP_DOWNLOAD=1 npm ci --omit=optional > npm-ci.txt 2>&1; echo "npm ci exit $?")
  if [ -n "$MUT" ]; then (cd "$E" && MUT_ID=$MUT python3 -I "$MUTATOR") || echo "MUTATOR FAILED"; fi
  (cd "$E" && rm -rf build && npx tsc -b > tsc.txt 2>&1; echo "tsc exit $?")
} > "$OUT" 2>&1
setsid unshare -rn bash -c 'ip link set lo up
  [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
  cd "$1" && node probe-body-class.cjs' _ "$E" >> "$OUT" 2>&1 &
PID=$!
for _ in $(seq "$TIMEOUT"); do kill -0 "$PID" 2>/dev/null || break; sleep 1; done
if kill -0 "$PID" 2>/dev/null; then kill -TERM -- "-$PID"; sleep 2; kill -KILL -- "-$PID" 2>/dev/null; echo TIMEOUT-KILL >> "$OUT"; fi
wait "$PID"; echo "probe exit $?" >> "$OUT"
rm -rf "$E"
