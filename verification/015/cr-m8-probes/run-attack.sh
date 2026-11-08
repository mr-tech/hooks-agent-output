#!/usr/bin/env bash
# Usage: run-attack.sh <scratch> <sha> <out>
# Runs attack.cjs in the E-1 export the implementer's rig (verification/015/m8-local-probe/run.sh) built at
# <scratch>/pig-probe-<sha> (dependencies installed inside it, tsc -b done). Run that rig first. Inside unshare -rn,
# loopback up, same self-check shape: loopback answers, external lookup fails.
set -u
S=$1; SHA=$2; OUT=$3
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/pig-probe-$SHA
[ -f "$E/build/server.js" ] || { echo "no built export at $E: run m8-local-probe/run.sh first" > "$OUT"; exit 2; }
cp "$HERE/attack.cjs" "$E/cr-attack.cjs"; cp "$HERE/no-close-idle.cjs" "$E/cr-no-close-idle.cjs"
{
  echo "sha $SHA export $E; server.ts blob in export $(git hash-object "$E/src/server.ts")"
  unshare -rn bash -c 'ip link set lo up
    cd "$1" && node -e "require(\"dns\").lookup(\"example.com\",(e)=>{console.log(\"self-check external lookup: \"+(e?e.code:\"RESOLVED\"))})"
    timeout 300 node cr-attack.cjs' _ "$E"
  echo "attack exit $?"
} > "$OUT" 2>&1
