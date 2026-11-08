#!/usr/bin/env bash
# Usage: m8-guard-mutants.sh <scratch> <sha> <out dir>
# Mutants of the M8 fix round's guards, run in isolated copies of the E-1 export that m8-local-probe/run.sh built at
# <scratch>/pig-probe-<sha> (never the shared tree). Each mutant edits the compiled build/ in its own copy (node_modules is
# a symlink to the export's), runs the probe inside unshare -rn with lo up, output to a file, and the run is killed at 300 s
# as a process group. Result per mutant: the cells that fail.
set -u
S=$1; SHA=$2; OUT=$3
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/pig-probe-$SHA
mkdir -p "$OUT"
run() { # name sed-file sed-expr
  local name=$1 file=$2 expr=$3 M=$S/pig-mut-$SHA-$1
  rm -rf "$M"; mkdir -p "$M"
  cp -a "$E/build" "$E/package.json" "$E/ecosystem.config.js" "$M/"; ln -s "$E/node_modules" "$M/node_modules"
  cp "$HERE/probe.cjs" "$HERE/probe-pages.cjs" "$M/"
  sed -i "$expr" "$M/$file"
  if cmp -s "$M/$file" "$E/$file"; then echo "$name: MUTATION DID NOT APPLY" > "$OUT/mut-$name-$SHA.txt"; return; fi
  setsid timeout -k 5 300 unshare -rn bash -c 'ip link set lo up; cd "$1" && node probe.cjs' _ "$M" > "$OUT/mut-$name-$SHA.txt" 2>&1
  echo "exit $?" >> "$OUT/mut-$name-$SHA.txt"
}
# CR-27: the drain-complete line moved back after the catch (what 6c613a5 did)
run complete-after-catch build/server.js '/^        console.debug(`Drain complete in/d; s#^    process.exit(0);$#    console.debug(`Drain complete in ${Date.now() - start}ms.`); process.exit(0);#'
# D36 / CR-28 / CR-33: each conjunct of `queue?.dequeue?.bind(queue)` alone decides one cell; the check and the conditional registration each decide theirs
run queue-optional-chain-removed build/getPool.js 's#queue?.dequeue?.bind#queue.dequeue?.bind#'
run dequeue-optional-chain-removed build/getPool.js 's#queue?.dequeue?.bind#queue?.dequeue.bind#'
run startup-check-removed build/getPool.js 's#if (!waitingQueueDequeue(probe))#if (false)#'
run handler-registered-unconditionally build/getPool.js 's#^    if (dequeueWaiting)$#    if (true)#'
run startup-check-inverted build/getPool.js 's#if (!waitingQueueDequeue(probe))#if (waitingQueueDequeue(probe))#'
