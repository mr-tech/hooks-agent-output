#!/usr/bin/env bash
EX=$1; OUT=$2; PORT=34569
ip link set lo up 2>/dev/null
cd "$EX"
env -i PATH="$PATH" HOME="$HOME" NEXT_TELEMETRY_DISABLED=1 SKIP_ENV_VALIDATION=1 DATABASE_URL=postgresql://x:x@127.0.0.1:1/x NEXT_PUBLIC_PUSHER_KEY=dummy NEXT_PUBLIC_PUSHER_CLUSTER=dummy NEXT_PUBLIC_DISCORD_CLIENT_ID=1 PUSHER_APP_ID=1 PUSHER_SECRET=dummy NEXTAUTH_SECRET=dummy NEXTAUTH_URL=http://127.0.0.1:$PORT \
  node_modules/.bin/next dev -p $PORT -H 127.0.0.1 > "$OUT/fz-server.log" 2>&1 &
SP=$!
for i in $(seq 1 60); do curl -s -o /dev/null http://127.0.0.1:$PORT/ && break; sleep 1; done
while IFS='|' read -r name data; do
  enc=$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$data")
  timeout 90 /usr/bin/google-chrome --headless=new --no-sandbox --disable-gpu --user-data-dir=$OUT/chrome-prof --virtual-time-budget=6000 --dump-dom "http://127.0.0.1:$PORT/preview?data=$enc" > "$OUT/fz-$name.html" 2>/dev/null
  echo "$name: invalid=$(grep -c 'Invalid message data' "$OUT/fz-$name.html") editor=$(grep -c 'discord-visualizer' "$OUT/fz-$name.html")"
done < "$OUT/fuzz-cases.txt"
kill $SP; pkill -P $SP; wait
