#!/bin/bash
# Usage: RUNSCRIPT=<node script> server.sh <export dir> <home dir> <port>
# Runs inside unshare -rn: only loopback exists, so no host port is bound. Probe env, no .env* in the export.
S=$1; HOMED=$2; PORT=$3
ip link set lo up
echo "nonloopback links: $(ip -o link show | grep -vc ': lo:')"
echo "default routes: $(ip route show default | grep -c .)"
[ "$(ip -o link show | grep -vc ': lo:')" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ABORT; exit 1; }
cd "$S" || exit 2
mkdir -p "$HOMED"
env -i PATH="$PATH" HOME="$HOMED" NEXT_TELEMETRY_DISABLED=1 NODE_ENV=development \
 SKIP_ENV_VALIDATION=1 DATABASE_URL=postgresql://probe:probe@127.0.0.1:1/probe NEXTAUTH_URL=http://127.0.0.1:$PORT NEXTAUTH_SECRET=probe \
 DISCORD_CLIENT_SECRET=probe DISCORD_URL=http://127.0.0.1:1 DISCORD_BOT_TOKEN=probe REDISHOST=127.0.0.1 REDISPORT=1 REDISUSER=probe REDISPASSWORD=probe \
 CDN_KEY=probe CDN_SECRET=probe CDN_BUCKET=probe CDN_ENDPOINT=http://127.0.0.1:1 DISCORD_PUBLIC_KEY=probe ENCRYPTION_KEY=probe ENCRYPTION_IV=probe HOOKS_API_TOKEN=probe \
 PUSHER_APP_ID=probe PUSHER_SECRET=probe PREVIEW_IMAGE_URL=http://127.0.0.1:1 PREVIEW_IMAGE_API_KEY=probe NEXT_PUBLIC_PUSHER_KEY=probe NEXT_PUBLIC_PUSHER_CLUSTER=probe NEXT_PUBLIC_DISCORD_CLIENT_ID=probe \
 node_modules/.bin/next dev --webpack -H 127.0.0.1 -p "$PORT" > "$HOMED/next.log" 2>&1 &
NP=$!
for i in $(seq 1 90); do curl -s -o /dev/null http://127.0.0.1:$PORT/ && break; sleep 1; done
echo "positive control GET /: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$PORT/)"
echo "GET /message/f/111: $(curl -s -o /dev/null -m 180 -w '%{http_code}' http://127.0.0.1:$PORT/message/f/111)"
if [ -n "$RUNSCRIPT" ]; then PORT=$PORT node "$RUNSCRIPT"; fi
kill $NP; pkill -P $NP; wait
