#!/usr/bin/env bash
# Sends GET requests to a locally served website build and prints status and total time for each.
# It shows whether a client-supplied `x-query-params` header reaches
# src/app/_components/Providers.tsx `getMessage` and what it costs there.
#
# Usage: request-x-query-params.sh <base-url> <path> <tokens> [<tokens> ...]
#   <base-url>  e.g. http://127.0.0.1:39417
#   <path>      a page under /message, without a query string, e.g. /message/m/0/edit
#   <tokens>    number of `%C3` tokens in the malformed run; 0 sends no header (the baseline)
# The payload key is `x`, never `code`, so `getMessage` parses the header and fetches nothing.
set -u
base=$1; path=$2; shift 2

req() { # label, then curl arguments
  local label=$1; shift
  printf '%s\t' "$label"
  curl -s -o /dev/null --max-time 180 -w 'status=%{http_code}\ttime_total=%{time_total}s\n' "$@"
}

req "warm-up, no header" "$base$path"
for n in "$@"; do
  if [ "$n" -eq 0 ]; then
    req "tokens=0, no header" "$base$path"
    continue
  fi
  run=$(printf '%%25C3%.0s' $(seq 1 "$n"))
  header="x%3D$run"
  req "tokens=$n, header ${#header} bytes, no query string" -H "x-query-params: $header" "$base$path"
done
# Control: with a query string the middleware overwrites the header with its own normalised value.
run=$(printf '%%25C3%.0s' $(seq 1 400))
req "control: tokens=400 header AND a query string (?a=1)" -H "x-query-params: x%3D$run" "$base$path?a=1"
