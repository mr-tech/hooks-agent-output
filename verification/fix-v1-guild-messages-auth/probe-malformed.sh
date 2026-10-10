#!/bin/bash
# usage: probe-malformed.sh <label>  — keyed requests with malformed queries; curl exit 28 = timed out (no response)
G=123456789012345678; K='Authorization: Bearer probe-key'
for p in "guilds/abc/messages" "guilds/$G/messages?extra=1" "guilds/abc/messages/1" "guilds/$G/messages/x" "guilds/$G/messages/1?extra=1"; do
  out=$(curl -s -o /dev/null --max-time 15 -w '%{http_code} %{time_total}s' -H "$K" "http://127.0.0.1:3917/api/v1/$p"); rc=$?
  echo "$1 /api/v1/$p -> $out curl_exit=$rc"
done
