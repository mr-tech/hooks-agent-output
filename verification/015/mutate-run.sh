#!/usr/bin/env bash
# Usage: mutate-run.sh <sha> <label> <test-file> [mutator.py]
# Runs one test file in an isolated export of website@<sha> (git archive), optionally after a
# mutator edits production source inside the export. Output goes to files named by the SHA and
# label; the run's whole process group is killed at TIMEOUT seconds, which counts as a kill.
set -u
SHA=$1; LABEL=$2; TEST=$3; MUTATOR=${4:-}
HERE=$(cd "$(dirname "$0")" && pwd)
WEBSITE=${WEBSITE:-/usr/local/bin/hooks/website}
EXPORT_ROOT=${EXPORT_ROOT:?set EXPORT_ROOT to a scratch directory}
TIMEOUT=${TIMEOUT:-180}
EXPORT=$EXPORT_ROOT/website-$SHA-$LABEL
OUT=$HERE/mutation-$LABEL-$SHA.txt
rm -rf "$EXPORT"; mkdir -p "$EXPORT"
git -C "$WEBSITE" archive "$SHA" | tar -x -C "$EXPORT"
ln -s "$WEBSITE/node_modules" "$EXPORT/node_modules"
{
  echo "export: $EXPORT  sha: $SHA  label: $LABEL  test: $TEST  mutator: ${MUTATOR:-none}"
  if [ -n "$MUTATOR" ]; then (cd "$EXPORT" && python3 -I "$MUTATOR") || { echo "MUTATOR FAILED"; exit 3; }; fi
  (cd "$EXPORT" && git -C "$WEBSITE" diff --no-index --stat "$WEBSITE/src" "$EXPORT/src" 2>/dev/null | tail -2)
} > "$OUT" 2>&1
cd "$EXPORT" || exit 2
setsid npx vitest run $TEST >> "$OUT" 2>&1 &
PID=$!
for _ in $(seq "$TIMEOUT"); do kill -0 "$PID" 2>/dev/null || break; sleep 1; done
if kill -0 "$PID" 2>/dev/null; then kill -TERM -- "-$PID" 2>/dev/null; sleep 2; kill -KILL -- "-$PID" 2>/dev/null; echo "TIMEOUT-KILL" >> "$OUT"; fi
wait "$PID"; echo "vitest exit $?" >> "$OUT"
