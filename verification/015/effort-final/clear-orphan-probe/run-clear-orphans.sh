#!/usr/bin/env bash
# run.sh <export> <out>: control (shutdown), positive control (sigkill), mutant qa-ef-clear-dropped (shutdown),
# each from its own copy of the export's build/, under unshare -rn with lo up. Mutant applied by exact replacement.
set -u; E=$1; OUT=$2; HERE=$(cd "$(dirname "$0")" && pwd); W=$(mktemp -d)
for v in control mutant; do
  mkdir -p "$W/$v"; cp -r "$E/build" "$E/package.json" "$W/$v/"; ln -s "$E/node_modules" "$W/$v/node_modules"; cp "$HERE/probe-clear-orphans.cjs" "$W/$v/"
done
python3 -I - "$W/mutant/build/server.js" <<'PY'
import sys; p=sys.argv[1]; s=open(p).read()
o='pool ? pool.drain().then(() => pool.clear()) : Promise.resolve()'; assert s.count(o)==1
open(p,'w').write(s.replace(o,'pool ? pool.drain() : Promise.resolve()'))
PY
{ echo "export $E server.js control $(git hash-object "$W/control/build/server.js") mutant $(git hash-object "$W/mutant/build/server.js") probe $(git hash-object "$HERE/probe-clear-orphans.cjs")"
for run in "control shutdown" "control sigkill" "mutant shutdown"; do set -- $run
  echo "== $1 $2"; unshare -rn bash -c 'ip link set lo up; cd "$1" && timeout 120 node probe-clear-orphans.cjs "$2"; echo "probe exit $?"' _ "$W/$1" "$2"
done; } > "$OUT" 2>&1
rm -rf "$W"
