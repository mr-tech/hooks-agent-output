#!/usr/bin/env bash
# Usage: run.sh <scratch> <sha>
# Code review's check of the QAF-37 rig cell. Builds the E-1 export with m8-local-probe/run.sh (control), then runs
# probe.cjs in cp -a copies whose build/server.js fallback timer is removed, set to 5 s, or set to 13 s (each edit read
# back). Reports the three "P1 drain never settles" cells per variant.
set -u
S=$1; SHA=$2; HERE=$(cd "$(dirname "$0")" && pwd); V=$(cd "$HERE/../.." && pwd); R=/usr/local/bin/hooks/preview-image-generator
OLD='    setTimeout(() => { process.exit(0); }, 10e3);'
bash "$V/m8-local-probe/run.sh" "$R" "$S" "$SHA" "$HERE/control-$SHA.txt"
for v in removed 5e3 13e3; do
  E=$S/pig-qaf37-$v; rm -rf "$E"; cp -a "$S/pig-probe-$SHA" "$E"
  if [ $v = removed ]; then NEW=''; else NEW="    setTimeout(() => { process.exit(0); }, $v);"; fi
  python3 -I -c "import sys;p=sys.argv[1];s=open(p).read();o=sys.argv[2]+'\n';assert s.count(o)==1;open(p,'w').write(s.replace(o,(sys.argv[3]+'\n') if sys.argv[3] else ''))" "$E/build/server.js" "$OLD" "$NEW"
  { echo "variant $v; fallback lines now: $(grep -c 'process.exit(0); }, 10e3' "$E/build/server.js") at 10e3, $(grep -c "process.exit(0); }, $v" "$E/build/server.js") at $v"
    unshare -rn bash -c 'ip link set lo up; cd "$1" && timeout 600 node probe.cjs' _ "$E"; echo "probe exit $?"; } > "$HERE/variant-$v-$SHA.txt" 2>&1
done
for f in "$HERE"/control-$SHA.txt "$HERE"/variant-*-$SHA.txt; do echo "== $(basename "$f"): $(head -1 "$f" | cut -c1-90)"; grep -E "CELL (PASS|FAIL) P1 drain never settles|SUMMARY" "$f" | cut -c1-150; done
