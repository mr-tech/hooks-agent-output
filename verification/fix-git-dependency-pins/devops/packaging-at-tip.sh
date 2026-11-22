#!/bin/bash
# Packaging check at a tip: frozen install + production build in an export of one commit.
# Parameterised from verification/fix-delete-dead-cron/devops/packaging-at-tip.sh (which hard-codes its scratch path and SHA).
# Usage: packaging-at-tip.sh <repo> <sha> <export-dir (must not exist)> <out-file>
# Never reads .env values; a git archive export carries none. Writes everything to <out-file>.
set -u
repo=$1; sha=$2; E=$3; out=$4
[ -e "$E" ] && { echo "export dir exists: $E" >&2; exit 91; }
mkdir -p "$E" || exit 92
{
  git -C "$repo" archive "$sha" | tar -x -C "$E"
  echo "sha $(git -C "$repo" rev-parse "$sha^{commit}")  tree $(git -C "$repo" rev-parse "$sha^{tree}")"
  echo "env-files in export: $(find "$E" -maxdepth 2 -name '.env*' -not -path '*/node_modules/*' | grep -c '')"
  cd "$E" || exit 90
  echo "pnpm $(pnpm --version)  node $(node --version)  $(grep '"packageManager"' package.json)"
  echo "=== install --frozen-lockfile"
  timeout 420 systemd-run --user --scope -p MemoryMax=8G -p RuntimeMaxSec=430 pnpm install --frozen-lockfile --store-dir "$E/../pnpm-store-$$" 2>&1 | tail -25
  echo "install-exit ${PIPESTATUS[0]}"
  cmp pnpm-lock.yaml <(git -C "$repo" show "$sha:pnpm-lock.yaml") && echo "lockfile byte-identical to tip blob after install"
  echo "=== build"
  SKIP_ENV_VALIDATION=1 timeout 400 systemd-run --user --scope -p MemoryMax=8G -p RuntimeMaxSec=410 pnpm run build 2>&1 | tail -60
  echo "build-exit ${PIPESTATUS[0]}"
} > "$out" 2>&1
