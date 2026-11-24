#!/bin/sh
# QA effort-final sweep driver (plan 019, website 42128cd, range 5ec0621..42128cd production paths).
# Usage:
#   sweep-driver.sh pass1 <shard>   for each plan.tsv row of <shard>: mutation-run.py over that file's mutants, the suite
#                                   command `vitest related --run <file>` (the test files that import it), its own control
#   sweep-driver.sh pass2 <shard>   the shard's pass-1 non-KILLED mutants, the whole offline suite, its own control
# Run from the 42128cd export, whose node_modules is the --dep. Network-isolated (unshare -rn, lo up). Every run's output
# goes to files under this folder; mutation-run.py kills each run's process group at its timeout.
set -u
PASS=$1; SHARD=$2
HERE=/usr/local/bin/hooks/agent-output/verification/019/qa/m6/fix/sweep
REPO=/usr/local/bin/hooks/website
SHA=$(git -C $REPO rev-parse 42128cd)
WORK=/tmp/claude-1000/-usr-local-bin-hooks/3158170a-883f-476c-97da-d73d3658850c/scratchpad/sweep-work/$PASS-$SHARD
RUNNER=/home/dev/.claude/tools/mutation-run.py
VITEST_OPTS="--project node --project dom --maxWorkers 4 --testTimeout 60000 --hookTimeout 60000"
mkdir -p "$WORK"
if [ "$PASS" = pass1 ]; then
  tail -n +2 "$HERE/plan.tsv" | awk -F'\t' -v s="$SHARD" '$1 == s' | while IFS="$(printf '\t')" read -r sh file count mutants; do
    name=$(basename "$mutants" .mutants.json)
    out="$HERE/pass1-shard-$SHARD/$name"
    mkdir -p "$out"
    echo "$(date -u +%FT%TZ) start $file ($count mutants)" >> "$HERE/pass1-shard-$SHARD.progress.txt"
    unshare -rn sh -c "ip link set lo up && python3 $RUNNER --repo $REPO --sha $SHA --mutants /usr/local/bin/hooks/agent-output/verification/019/$mutants --work $WORK/$name --out $out --timeout 900 --dep node_modules -- npx vitest related --run $VITEST_OPTS $file" > "$out.log.txt" 2>&1
    echo "$(date -u +%FT%TZ) end $file exit=$?" >> "$HERE/pass1-shard-$SHARD.progress.txt"
  done
elif [ "$PASS" = pass2 ]; then
  out="$HERE/pass2-shard-$SHARD"
  mkdir -p "$out"
  echo "$(date -u +%FT%TZ) start pass2" >> "$HERE/pass2-shard-$SHARD.progress.txt"
  unshare -rn sh -c "ip link set lo up && python3 $RUNNER --repo $REPO --sha $SHA --mutants $HERE/pass2-shard-$SHARD.mutants.json --work $WORK/whole --out $out --timeout 900 --dep node_modules -- npx vitest run $VITEST_OPTS" > "$out.log.txt" 2>&1
  echo "$(date -u +%FT%TZ) end pass2 exit=$?" >> "$HERE/pass2-shard-$SHARD.progress.txt"
else
  echo "usage: sweep-driver.sh pass1|pass2 <shard>" >&2; exit 2
fi
