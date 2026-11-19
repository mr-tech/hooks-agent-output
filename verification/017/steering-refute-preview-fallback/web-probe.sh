#!/usr/bin/env bash
# runs inside unshare -rn; starts next dev from export, curls /preview with invalid and valid data, stops.
EX=$1; OUT=$2; PORT=34567
ip link set lo up 2>/dev/null
cd "$EX"
env -i PATH="$PATH" HOME="$HOME" NEXT_TELEMETRY_DISABLED=1 SKIP_ENV_VALIDATION=1 DATABASE_URL=postgresql://x:x@127.0.0.1:1/x NEXT_PUBLIC_PUSHER_KEY=dummy NEXT_PUBLIC_PUSHER_CLUSTER=dummy NEXT_PUBLIC_DISCORD_CLIENT_ID=1 PUSHER_APP_ID=1 PUSHER_SECRET=dummy NEXTAUTH_SECRET=dummy NEXTAUTH_URL=http://127.0.0.1:$PORT \
  node_modules/.bin/next dev -p $PORT -H 127.0.0.1 > "$OUT/web-server.log" 2>&1 &
SP=$!
for i in $(seq 1 60); do curl -s -o /dev/null http://127.0.0.1:$PORT/ && break; sleep 1; done
for case in 'notjson|not json' 'array|[1,2]' 'valid|{"content":"hello"}' 'badembeds|{"embeds":"x"}' 'badcontent|{"content":5,"embeds":[{"fields":5}]}'; do
  name=${case%%|*}; data=${case#*|}
  curl -s -g -o "$OUT/web-$name.html" -w "$name status=%{http_code}\n" -G --data-urlencode "data=$data" http://127.0.0.1:$PORT/preview
  echo "  contains 'Invalid message data': $(grep -c 'Invalid message data' "$OUT/web-$name.html")"
done
kill $SP; pkill -P $SP; wait
