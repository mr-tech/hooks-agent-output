#!/usr/bin/env bash
# Usage: run-drift.sh <export dir> <out>
# The export is m8-local-probe/run.sh's E-1 export (control), or a cp -a copy of it whose
# node_modules/generic-pool/lib/Pool.js has every _waitingClientsQueue renamed (mutant). The read-back line records which.
set -u
E=$1; OUT=$2
HERE=$(cd "$(dirname "$0")" && pwd)
cp "$HERE/drift.cjs" "$E/cr-drift.cjs"; cp "$HERE/drift-launch-count.cjs" "$E/cr-drift-launch-count.cjs"
{
  echo "export $E; Pool.js _waitingClientsQueue occurrences: $(grep -c '_waitingClientsQueue\b' "$E/node_modules/generic-pool/lib/Pool.js"); renamed: $(grep -c '_waitingClientsQueueDrift' "$E/node_modules/generic-pool/lib/Pool.js"); getPool.js blob $(git hash-object "$E/build/getPool.js")"
  unshare -rn bash -c 'ip link set lo up; cd "$1" && node -v && timeout 60 node cr-drift.cjs' _ "$E"
  echo "probe exit $?"
} > "$OUT" 2>&1
