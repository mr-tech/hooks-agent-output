#!/bin/bash
# serve.sh <sha> <export-dir> <port> <log-dir> — the QA walk's local build of website: a throwaway `git archive` export
# of <sha>, node_modules copied from the working tree, `next dev` on 127.0.0.1:<port> with every variable set to a dummy
# value (no .env.local is copied or read: no real database, Pusher app or Discord credential reaches this server, so no
# save from it can reach production or write anything). Writes meta.txt and dev.log in <log-dir>; the server runs in
# the foreground (start it in the background).
set -u
SHA="$1"; EXP="$2"; PORT="$3"; LOGS="$4"; W=/usr/local/bin/hooks/website
mkdir -p "$EXP" "$LOGS"
git -C "$W" archive "$SHA" | tar -x -C "$EXP"; echo "archive sha=$SHA exit=$?" > "$LOGS/meta.txt"
echo "commit=$(git -C "$W" rev-parse "$SHA") tree=$(git -C "$W" rev-parse "$SHA^{tree}")" >> "$LOGS/meta.txt"
cp -a "$W/node_modules" "$EXP/node_modules"; echo "node_modules copy exit=$?" >> "$LOGS/meta.txt"
cp "$W/next-env.d.ts" "$EXP/next-env.d.ts" 2>/dev/null
cd "$EXP" || exit 90
echo "start=$(date -u +%FT%TZ) node=$(node --version) port=$PORT" >> "$LOGS/meta.txt"
exec env -i PATH="$PATH" HOME="$HOME" NODE_ENV=development \
  NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgres://u:p@127.0.0.1:1/db REDISHOST=127.0.0.1 REDISPORT=1 REDISUSER=u REDISPASSWORD=p \
  NEXT_PUBLIC_CDN_HOST=dummy PREVIEW_IMAGE_URL=https://dummy.invalid PREVIEW_IMAGE_API_KEY=dummy \
  NEXTAUTH_URL=http://127.0.0.1:$PORT CDN_KEY=dummy CDN_SECRET=dummy CDN_BUCKET=dummy CDN_ENDPOINT=https://dummy.invalid \
  NEXT_PUBLIC_PUSHER_CLUSTER=dummy NEXT_PUBLIC_PUSHER_KEY=dummy PUSHER_APP_ID=dummy PUSHER_SECRET=dummy \
  STATBOT_API_KEY=dummy ENCRYPTION_KEY=dummy ENCRYPTION_IV=dummy HOOKS_API_TOKEN=dummy \
  DISCORD_PUBLIC_KEY=dummy DISCORD_BOT_TOKEN=dummy NEXTAUTH_SECRET=dummy DISCORD_URL=https://dummy.invalid \
  NEXT_PUBLIC_DISCORD_CLIENT_ID=dummy DISCORD_CLIENT_SECRET=dummy \
  pnpm exec next dev -H 127.0.0.1 -p "$PORT" > "$LOGS/dev.log" 2>&1
