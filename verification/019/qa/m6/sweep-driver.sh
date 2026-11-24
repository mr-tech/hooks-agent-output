#!/bin/sh
# QA effort-final sweep driver (plan 019, website 119471f). Usage: sweep-driver.sh <pass: scoped|whole> <shard-json> <out-dir>
# Run from the 119471f export (its node_modules is the --dep). Network-isolated; mutation-run.py makes each run's own export.
set -u
PASS=$1; MUT=$2; OUT=$3
REPO=/usr/local/bin/hooks/website
WORK=/tmp/claude-1000/-usr-local-bin-hooks/7e5518eb-32a7-485b-b981-e822cac6bbeb/scratchpad/sweep-work/$(basename $OUT)
mkdir -p "$OUT" "$WORK"
if [ "$PASS" = scoped ]; then
  EXTRA="--exclude **/SlateEditor.typed-generated-text-reaches-the-message.test.tsx --exclude **/SlateEditor.pasted-text-reaches-the-message.test.tsx"
else
  EXTRA=""
fi
exec unshare -rn sh -c "ip link set lo up && python3 /home/dev/.claude/tools/mutation-run.py --repo $REPO --sha 119471f94abbaf21abd1f712006671402c65d525 --mutants $MUT --work $WORK --out $OUT --timeout 900 --dep node_modules -- npx vitest run --project node --project dom --maxWorkers 4 --testTimeout 30000 --hookTimeout 30000 $EXTRA" > "$OUT.log.txt" 2>&1
