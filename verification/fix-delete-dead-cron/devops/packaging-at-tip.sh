#!/bin/bash
# Packaging check at the tip: frozen install + production build in an export of 132a7ab.
# Never reads .env values; the export carries none.
set -u
S=/tmp/claude-1000/-usr-local-bin-hooks-website/0f1145cc-6157-43ab-923c-f272e712caf3/scratchpad
E=$S/export-132a7ab
cd "$E" || exit 90
echo "pnpm $(pnpm --version)  node $(node --version)  packageManager=$(grep '"packageManager"' package.json)"
echo "=== install --frozen-lockfile"
timeout 420 systemd-run --user --scope -p MemoryMax=8G -p RuntimeMaxSec=430 pnpm install --frozen-lockfile --prefer-offline
echo "install-exit $?"
cmp pnpm-lock.yaml <(git -C /usr/local/bin/hooks/website show 132a7ab:pnpm-lock.yaml) && echo "lockfile byte-identical to tip blob after install"
echo "=== build"
SKIP_ENV_VALIDATION=1 timeout 400 systemd-run --user --scope -p MemoryMax=8G -p RuntimeMaxSec=410 pnpm run build
echo "build-exit $?"
