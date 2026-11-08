#!/usr/bin/env bash
# Usage: run-body-class.sh <scratch> <sha> <out>
# Runs body-class.cjs in the E-1 export built by verification/015/m8-local-probe/run.sh at <scratch>/pig-probe-<sha>.
set -u
S=$1; SHA=$2; OUT=$3
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/pig-probe-$SHA
[ -f "$E/build/server.js" ] || { echo "no built export at $E: run m8-local-probe/run.sh first" > "$OUT"; exit 2; }
cp "$HERE/body-class.cjs" "$E/cr-body-class.cjs"
{
  echo "sha $SHA export $E; server.ts blob in export $(git hash-object "$E/src/server.ts")"
  unshare -rn bash -c 'ip link set lo up
    cd "$1" && node -e "require(\"dns\").lookup(\"example.com\",(e)=>{console.log(\"self-check external lookup: \"+(e?e.code:\"RESOLVED\"))})"
    timeout 300 node cr-body-class.cjs' _ "$E"
  echo "probe exit $?"
} > "$OUT" 2>&1
