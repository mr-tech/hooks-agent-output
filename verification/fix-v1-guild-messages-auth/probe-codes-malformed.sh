#!/bin/bash
# usage: probe-codes-malformed.sh <label>  — malformed queries to /api/messages/codes/<code>; curl exit 28 = timed out (no response)
for p in "abc123?extra=1" "abc123?extra=1&more=2"; do
  out=$(curl -s -o /dev/null --max-time 15 -w '%{http_code} %{time_total}s' "http://127.0.0.1:3917/api/messages/codes/$p"); rc=$?
  echo "$1 /api/messages/codes/$p -> $out curl_exit=$rc"
done
