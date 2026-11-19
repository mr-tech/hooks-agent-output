#!/usr/bin/env bash
EX=$1; OUT=$2; PORT=34568
ip link set lo up 2>/dev/null
cd "$EX"
env -i PATH="$PATH" HOME="$HOME" NEXT_TELEMETRY_DISABLED=1 SKIP_ENV_VALIDATION=1 DATABASE_URL=postgresql://x:x@127.0.0.1:1/x NEXT_PUBLIC_PUSHER_KEY=dummy NEXT_PUBLIC_PUSHER_CLUSTER=dummy NEXT_PUBLIC_DISCORD_CLIENT_ID=1 PUSHER_APP_ID=1 PUSHER_SECRET=dummy NEXTAUTH_SECRET=dummy NEXTAUTH_URL=http://127.0.0.1:$PORT \
  node_modules/.bin/next dev -p $PORT -H 127.0.0.1 > "$OUT/dom-server.log" 2>&1 &
SP=$!
for i in $(seq 1 60); do curl -s -o /dev/null http://127.0.0.1:$PORT/ && break; sleep 1; done
for case in 'invalid|{"embeds":"x"}' 'valid|{"content":"hello"}'; do
  name=${case%%|*}; data=${case#*|}
  enc=$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$data")
  timeout 90 /usr/bin/google-chrome --headless=new --no-sandbox --disable-gpu --user-data-dir=$OUT/chrome-prof-$name --virtual-time-budget=8000 --dump-dom "http://127.0.0.1:$PORT/preview?data=$enc" > "$OUT/dom-$name.html" 2>/dev/null
  echo "$name: 'Invalid message data' count=$(grep -c 'Invalid message data' "$OUT/dom-$name.html")"
  grep -o '<div class="dark[^>]*>.\{0,200\}' "$OUT/dom-$name.html" | head -c 400; echo
done
kill $SP; pkill -P $SP; wait
