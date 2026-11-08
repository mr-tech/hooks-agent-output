#!/bin/sh
# Run inside `unshare -rnm`: loopback only, private mounts. Serves an export with `next start` on 127.0.0.1:3000,
# drives a throwaway headless Chrome over CDP with upload-dialog-cdp.mjs, then stops both.
# Usage: run-local-probe.sh <exportDir> <label> <scratchDir>
set -u
EXP=$1; LABEL=$2; S=$3
ip link set lo up
mount --bind /usr/local/bin/hooks/website/node_modules "$EXP/node_modules" && mount -o remount,bind,ro "$EXP/node_modules" || exit 3
cd "$EXP"
socat TCP-LISTEN:5432,bind=127.0.0.1,fork,reuseaddr UNIX-CONNECT:"$S/pg.sock" &
SOC=$!
redis-server --port 6379 --bind 127.0.0.1 --save "" --appendonly no > "$S/redis-$LABEL.txt" 2>&1 &
RED=$!
export DATABASE_URL=postgresql://analyst:analyst@127.0.0.1:5432/hooks
NEXT_TELEMETRY_DISABLED=1 ./node_modules/.bin/next start -H 127.0.0.1 -p 3000 > "$S/server-$LABEL.txt" 2>&1 &
SRV=$!
i=0; until grep -q 'Ready' "$S/server-$LABEL.txt" || [ $i -ge 60 ]; do sleep 1; i=$((i+1)); done
rm -rf "$S/profile-$LABEL"
google-chrome --headless=new --no-sandbox --no-first-run --no-default-browser-check \
  --user-data-dir="$S/profile-$LABEL" --remote-debugging-port=9222 about:blank > "$S/chrome-$LABEL.txt" 2>&1 &
CHR=$!
i=0; until curl -s http://127.0.0.1:9222/json/version > /dev/null || [ $i -ge 30 ]; do sleep 1; i=$((i+1)); done
node "$S/upload-dialog-cdp.mjs" 9222 http://127.0.0.1:3000 /message/f/0 analyst-probe-session-token "${VIA:-}" > "$S/result-$LABEL.json" 2> "$S/driver-$LABEL.err"
echo "driver exit=$?"
kill $CHR $SRV $SOC $RED; sleep 2; kill -9 $CHR $SRV $SOC $RED 2>/dev/null
wait 2>/dev/null
echo stopped
