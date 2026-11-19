#!/bin/bash
# release-tip-build.sh <export-dir> <log-dir> — Phase 2A step 5 for plan 017's website: a throwaway export of the
# release tip (git archive), a frozen-lockfile install under pnpm@10.28.2 (the package.json packageManager), and
# `next build` with the variable NAMES of the Production target (dummy values; the real ones are never read here).
# The caller sets the tip and runs it inside a capped scope. Writes install.log, build.log, summary.txt in <log-dir>.
set -u
EXP="$1"; LOGS="$2"; mkdir -p "$LOGS"; cd "$EXP" || exit 90
{ echo "== install $(date -u +%FT%TZ) pnpm $(pnpm --version) node $(node --version)"
  timeout 900 pnpm install --frozen-lockfile 2>&1 | tail -30
  echo "install exit=${PIPESTATUS[0]}"; } > "$LOGS/install.log" 2>&1
env -i PATH="$PATH" HOME="$HOME" VERCEL=1 VERCEL_ENV=production VERCEL_URL=tip-dummy.vercel.app NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgres://u:p@localhost:5432/db REDISHOST=localhost REDISPORT=6379 REDISUSER=u REDISPASSWORD=p \
  NEXT_PUBLIC_CDN_HOST=dummy PREVIEW_IMAGE_URL=https://dummy.invalid PREVIEW_IMAGE_API_KEY=dummy \
  NEXTAUTH_URL=https://dummy.invalid CDN_KEY=dummy CDN_SECRET=dummy CDN_BUCKET=dummy CDN_ENDPOINT=https://dummy.invalid \
  NEXT_PUBLIC_PUSHER_CLUSTER=dummy NEXT_PUBLIC_PUSHER_KEY=dummy PUSHER_APP_ID=dummy PUSHER_SECRET=dummy \
  STATBOT_API_KEY=dummy ENCRYPTION_KEY=dummy ENCRYPTION_IV=dummy HOOKS_API_TOKEN=dummy \
  DISCORD_PUBLIC_KEY=dummy DISCORD_BOT_TOKEN=dummy NEXTAUTH_SECRET=dummy DISCORD_URL=https://dummy.invalid \
  NEXT_PUBLIC_DISCORD_CLIENT_ID=dummy DISCORD_CLIENT_SECRET=dummy "${@:3}" \
  timeout 1200 pnpm exec next build > "$LOGS/build.log" 2>&1
echo "build exit=$?" >> "$LOGS/build.log"
{ grep 'install exit=' "$LOGS/install.log"; tail -1 "$LOGS/build.log"; echo "api route in table: $(grep -c 'waituntil' "$LOGS/build.log") (the probe route must not be here)"; } > "$LOGS/summary.txt"
