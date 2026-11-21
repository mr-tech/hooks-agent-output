#!/bin/bash
# Packaging re-run at the release tip: typecheck (both programs) and next build, in an export of website 0c14d5b.
# Dummy values only; no .env file in the export; contained in a systemd scope.
EXP=/tmp/claude-1000/-usr-local-bin-hooks-website/7cb2f6f0-0d54-4df0-b447-373b4a5b58dc/scratchpad/tip-export
OUT=/usr/local/bin/hooks/agent-output/verification/fix-api-secret-compare/devops
cd "$EXP" || exit 9
export PATH=/home/dev/.local/share/pnpm:/usr/local/bin:/usr/bin:/bin
export SKIP_ENV_VALIDATION=1 NEXT_TELEMETRY_DISABLED=1 CI=1
export DATABASE_URL=postgres://u:p@127.0.0.1:1/nodb REDIS_URL=redis://127.0.0.1:1
export HOOKS_API_TOKEN=dummy-token STATBOT_API_KEY=dummy-key NEXTAUTH_SECRET=dummy NEXTAUTH_URL=http://127.0.0.1:3000
pnpm --version > "$OUT/tip-pnpm-version.txt" 2>&1
pnpm run typecheck > "$OUT/tip-typecheck-0c14d5b.txt" 2>&1
echo $? > "$OUT/tip-typecheck-0c14d5b.exit"
pnpm run build > "$OUT/tip-build-0c14d5b.txt" 2>&1
echo $? > "$OUT/tip-build-0c14d5b.exit"
