#!/bin/bash
# build-tip.sh <tip-sha> <export-dir> <log-dir> — devops Phase 2A step 5 for website: a throwaway `git archive` export of the
# release tip, node_modules copied from the working tree (the lockfile is unchanged against production's, so no install is
# re-run), and `next build` with the variable NAMES of the Production target set to dummy values (the real ones are never
# read, no .env.local is copied). Run inside a capped scope. Writes build.log, meta.txt, exit in <log-dir>.
set -u
TIP="$1"; EXP="$2"; LOGS="$3"; W=/usr/local/bin/hooks/website
mkdir -p "$EXP" "$LOGS"
git -C "$W" archive "$TIP" | tar -x -C "$EXP"; echo "archive exit=$?" > "$LOGS/meta.txt"
echo "tree=$(git -C "$W" rev-parse "$TIP^{tree}")" >> "$LOGS/meta.txt"
cp -a "$W/node_modules" "$EXP/node_modules"; echo "node_modules copy exit=$?" >> "$LOGS/meta.txt"
cp "$W/next-env.d.ts" "$EXP/next-env.d.ts" 2>/dev/null; cd "$EXP" || exit 90
echo "start=$(date -u +%FT%TZ) node=$(node --version) pnpm=$(pnpm --version)" >> "$LOGS/meta.txt"
env -i PATH="$PATH" HOME="$HOME" VERCEL=1 VERCEL_ENV=production VERCEL_URL=tip-dummy.vercel.app NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgres://u:p@localhost:5432/db REDISHOST=localhost REDISPORT=6379 REDISUSER=u REDISPASSWORD=p \
  NEXT_PUBLIC_CDN_HOST=dummy PREVIEW_IMAGE_URL=https://dummy.invalid PREVIEW_IMAGE_API_KEY=dummy \
  NEXTAUTH_URL=https://dummy.invalid CDN_KEY=dummy CDN_SECRET=dummy CDN_BUCKET=dummy CDN_ENDPOINT=https://dummy.invalid \
  NEXT_PUBLIC_PUSHER_CLUSTER=dummy NEXT_PUBLIC_PUSHER_KEY=dummy PUSHER_APP_ID=dummy PUSHER_SECRET=dummy \
  STATBOT_API_KEY=dummy ENCRYPTION_KEY=dummy ENCRYPTION_IV=dummy HOOKS_API_TOKEN=dummy \
  DISCORD_PUBLIC_KEY=dummy DISCORD_BOT_TOKEN=dummy NEXTAUTH_SECRET=dummy DISCORD_URL=https://dummy.invalid \
  NEXT_PUBLIC_DISCORD_CLIENT_ID=dummy DISCORD_CLIENT_SECRET=dummy \
  timeout 900 pnpm exec next build > "$LOGS/build.log" 2>&1
echo "build exit=$?" | tee "$LOGS/exit" >> "$LOGS/build.log"
echo "end=$(date -u +%FT%TZ)" >> "$LOGS/meta.txt"
