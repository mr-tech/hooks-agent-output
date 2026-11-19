#!/bin/bash
# Throwaway: build the probe commit's export with ONLY the variable NAMES the Vercel Preview
# environment has (dummy values), none of the Production-only ones (DATABASE_URL, REDIS*, PG*).
# Usage: preview-env-build.sh <export-dir> <log-dir> [extra KEY=VAL ...]
set -u
EXP="$1"; LOGS="$2"; shift 2
mkdir -p "$LOGS"
cd "$EXP" || exit 90
{
  echo "== install $(date -u +%FT%TZ)"
  timeout 900 pnpm install --frozen-lockfile 2>&1 | tail -25
  echo "install exit=${PIPESTATUS[0]}"
} > "$LOGS/install.log" 2>&1
env -i PATH="$PATH" HOME="$HOME" \
  VERCEL=1 VERCEL_ENV=preview VERCEL_URL=probe-dummy.vercel.app NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_CDN_HOST=dummy PREVIEW_IMAGE_URL=https://dummy.invalid PREVIEW_IMAGE_API_KEY=dummy \
  NEXTAUTH_URL=https://dummy.invalid CDN_KEY=dummy CDN_SECRET=dummy CDN_BUCKET=dummy CDN_ENDPOINT=https://dummy.invalid \
  NEXT_PUBLIC_PUSHER_CLUSTER=dummy NEXT_PUBLIC_PUSHER_KEY=dummy PUSHER_APP_ID=dummy PUSHER_SECRET=dummy \
  STATBOT_API_KEY=dummy ENCRYPTION_KEY=dummy ENCRYPTION_IV=dummy HOOKS_API_TOKEN=dummy \
  DISCORD_PUBLIC_KEY=dummy DISCORD_BOT_TOKEN=dummy NEXTAUTH_SECRET=dummy DISCORD_URL=https://dummy.invalid \
  NEXT_PUBLIC_DISCORD_CLIENT_ID=dummy DISCORD_CLIENT_SECRET=dummy \
  "$@" \
  timeout 900 pnpm exec next build > "$LOGS/build.log" 2>&1
echo "build exit=$?" >> "$LOGS/build.log"
