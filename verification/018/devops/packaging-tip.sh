#!/usr/bin/env bash
# 018 Phase 2A step 5: packaging at the release tip. Usage: packaging-tip.sh <tip-sha> <export-dir (new, empty)> <out-dir>
# Isolated `git archive` export, no .env, its own install under the host's pnpm major (packageManager pnpm@10.28.2),
# then the build with SKIP_ENV_VALIDATION=1 (Vercel's preview and the earlier chains' packaging runs use it), then typecheck.
# Every step's exit code is recorded beside its capture. Run under systemd-run --user --scope with RuntimeMaxSec and MemoryMax.
set -u
TIP=$1; X=$2; O=$3; mkdir -p "$X" "$O"
[ -z "$(ls -A "$X")" ] || { echo "export dir not empty" >&2; exit 2; }
git -C /usr/local/bin/hooks/website archive "$TIP" | tar -x -C "$X"
echo "tree $(git -C /usr/local/bin/hooks/website rev-parse "$TIP^{tree}") pnpm $(cd "$X" && pnpm --version) node $(node --version)" > "$O/packaging-env.txt"
cd "$X"
pnpm install --frozen-lockfile --offline --ignore-scripts > "$O/packaging-install.txt" 2>&1; echo "install exit=$?" | tee -a "$O/packaging-exits.txt"
SKIP_ENV_VALIDATION=1 pnpm run build > "$O/packaging-build.txt" 2>&1; echo "build exit=$?" | tee -a "$O/packaging-exits.txt"
pnpm run typecheck > "$O/packaging-typecheck.txt" 2>&1; echo "typecheck exit=$?" | tee -a "$O/packaging-exits.txt"
git -C /usr/local/bin/hooks/website show "$TIP:tsconfig.json" | cmp - tsconfig.json && echo "tsconfig.json unchanged by the build (cmp 0)" | tee -a "$O/packaging-exits.txt"
