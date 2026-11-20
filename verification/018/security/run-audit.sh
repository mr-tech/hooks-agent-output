#!/usr/bin/env bash
# Usage: run-audit.sh <export-dir> <short-sha> <out-dir>
#
# Runs `pnpm audit --prod --json` in an isolated export of the website and joins the result with the
# dependency review's dispositions (verification/website-deps-review/security/dispositions.json).
# Writes under <out-dir>: pnpm-audit-prod-<short>.json, .stderr, .exit, .stamp, the tabulations of
# tabulate-audit.js, and the join of apply-dispositions.js --allow-unused with its own exit status in
# pnpm-audit-prod-<short>-join.exit and its messages in pnpm-audit-prod-<short>-join.txt.
# The join exits non-zero when an advisory entry has no disposition; its message names the entry.
set -u
dir=$1; short=$2; out=$3
T=/usr/local/bin/hooks/agent-output/verification/website-deps-review/security
p="$out/pnpm-audit-prod-$short"
cd "$dir" || exit 2
date -u +%Y-%m-%dT%H:%M:%SZ > "$p.stamp"
pnpm audit --prod --json > "$p.json" 2> "$p.stderr"
echo $? > "$p.exit"
node "$T/tabulate-audit.js" "$p.json" "$p" > "$p-tabulate.txt" 2>&1
node "$T/apply-dispositions.js" "$p.json" "$T/dispositions.json" "$p" --allow-unused > "$p-join.txt" 2>&1
echo $? > "$p-join.exit"
