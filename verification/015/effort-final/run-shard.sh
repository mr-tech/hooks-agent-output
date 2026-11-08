#!/usr/bin/env bash
# run-shard.sh <k>: one shard (3 run in parallel, 5 vitest workers each on an 18-core box; the default worker count under three parallel suites timed out a DOM case in every control) of the effort-final website sweep at c5303ca, suite network-isolated.
S=$(cd "$(dirname "$0")" && pwd); K=$1
mkdir -p "$S/work$K" "$S/out$K"
exec python3 ~/.claude/tools/mutation-run.py --repo /usr/local/bin/hooks/website --sha c5303ca --mutants "$S/shard$K.json" \
  --work "$S/work$K" --out "$S/out$K" --dep node_modules --timeout 300 -- \
  unshare -rn sh -c 'ip link set lo up && [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && npx vitest run --maxWorkers=5' > "$S/driver$K.txt" 2>&1
