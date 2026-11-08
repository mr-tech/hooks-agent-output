#!/usr/bin/env bash
# Usage: run-rk8-field.sh <export dir> <out>
# The export is m8-local-probe/run.sh's E-1 export, or a copy of it with build/getPool.js mutated.
set -u
E=$1; OUT=$2
HERE=$(cd "$(dirname "$0")" && pwd)
cp "$HERE/rk8-field.cjs" "$E/cr-rk8-field.cjs"
{
  echo "export $E; getPool.js field read: $(grep -o '_waitingClientsQueue[A-Za-z]*;' "$E/build/getPool.js")"
  unshare -rn bash -c 'ip link set lo up; cd "$1" && node -v && timeout 60 node cr-rk8-field.cjs' _ "$E"
  echo "probe exit $?"
} > "$OUT" 2>&1
