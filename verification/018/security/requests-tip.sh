#!/usr/bin/env bash
# Sends requests to a locally served production build of the website and prints one line per request.
# Loopback only; nothing here is meant for hooks.gg.
#
# Usage: requests-tip.sh <base-url> <work-dir>
#   <base-url>  e.g. http://127.0.0.1:39419
#   <work-dir>  an existing scratch directory for the generated request bodies and curl config files
# Sections:
#   1  the header requests of verification/website-deps-review/security/request-x-query-params.sh
#   2  one image through /_next/image
#   3  a save with no session: a list filled to about 1 MB of failing elements, and a body over 1 MB
#   4  tRPC batches of n saves in one request with no session, to find where the URL stops being accepted
#   5  the response headers of a static page and a dynamic page
set -u
base=$1; work=$2
here=$(cd "$(dirname "$0")" && pwd)

echo "== 1 header requests"
bash "$here/../../website-deps-review/security/request-x-query-params.sh" "$base" /message/m/0/edit 0 200 400 800 1600 0

echo "== 2 image"
curl -s -o /dev/null --max-time 60 -w 'image\tstatus=%{http_code}\ttype=%{content_type}\tbytes=%{size_download}\n' \
  "$base/_next/image?url=%2Fassets%2Fcolor_circle.png&w=64&q=75"

echo "== 3 a save with no session"
node -e '
const fs = require("fs");
const [work] = process.argv.slice(1);
const fill = (bytes) => {
  const wrap = (inner) => `{"json":{"message":{"name":"a","data":{"allowed_mentions":{"users":[${inner}]}}}}}`;
  const n = Math.floor((bytes - wrap("").length) / 2);
  return wrap(`${"0,".repeat(n - 1)}0`);
};
fs.writeFileSync(`${work}/save-1048000.json`, fill(1048000));
fs.writeFileSync(`${work}/save-1200000.json`, fill(1200000));
for (const n of [100, 1000, 1050, 1100, 2000, 10000]) {
  const paths = Array.from({ length: n }, () => "message.upsert").join(",");
  const body = {};
  for (let i = 0; i < n; i += 1) body[i] = { json: { message: { name: "a", data: { components: Array(21).fill(0) } } } };
  fs.writeFileSync(`${work}/batch-${n}.json`, JSON.stringify(body));
  fs.writeFileSync(`${work}/batch-${n}.curl`, `url = "${process.argv[2]}/api/trpc/${paths}?batch=1"\n`);
}
' "$work" "$base"
for bytes in 1048000 1200000; do
  printf 'save, no session, body %s bytes\t' "$(wc -c < "$work/save-$bytes.json")"
  curl -s -o "$work/save-$bytes.response" --max-time 120 -X POST -H 'content-type: application/json' \
    --data-binary "@$work/save-$bytes.json" -w 'status=%{http_code}\ttime_total=%{time_total}s\tresponse_bytes=%{size_download}\n' \
    "$base/api/trpc/message.upsert"
  printf '  response starts: %s\n' "$(head -c 200 "$work/save-$bytes.response")"
done

echo "== 4 batches with no session"
for n in 100 1000 1050 1100 2000 10000; do
  url_bytes=$(($(wc -c < "$work/batch-$n.curl") - 9))
  printf 'batch of %s saves, URL %s bytes, body %s bytes\t' "$n" "$url_bytes" "$(wc -c < "$work/batch-$n.json")"
  curl -s -o "$work/batch-$n.response" --max-time 120 -X POST -H 'content-type: application/json' \
    --data-binary "@$work/batch-$n.json" -K "$work/batch-$n.curl" \
    -w 'status=%{http_code}\ttime_total=%{time_total}s\tresponse_bytes=%{size_download}\n'
  printf '  response starts: %s\n' "$(head -c 160 "$work/batch-$n.response")"
done

echo "== 5 response headers"
for path in / /message/m/0/edit; do
  echo "-- GET $path"
  curl -s -o /dev/null --max-time 60 -D - "$base$path" | tr -d '\r' | grep -v '^$'
done
