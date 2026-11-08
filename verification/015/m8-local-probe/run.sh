#!/usr/bin/env bash
# Usage: run.sh <preview-image-generator repo> <scratch> <sha> <out file>
# Entry conditions E-1 (plan M8): export of <sha> without the tree's .env; dependencies installed INSIDE the export
# (npm ci --omit=optional, PUPPETEER_SKIP_DOWNLOAD=1) before the namespace is entered; the server and every probe run in
# unshare -rn with lo brought up first; a self-check (loopback answers, an external name fails) before any cell is read;
# probe values for every CDN_* variable, PREVIEW_ENDPOINT and API_KEY. No CDN object is read, written or deleted.
set -u
R=$1; S=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E=$S/pig-probe-$SHA
rm -rf "$E"; mkdir -p "$E"
git -C "$R" archive "$SHA" | tar -x -C "$E"
{
  echo "sha $(git -C "$R" rev-parse "$SHA")"
  echo "env files in export: $(ls -a "$E" | grep -c '^\.env$')"
  cd "$E" || exit 2
  PUPPETEER_SKIP_DOWNLOAD=1 npm ci --omit=optional > "$S/pig-npm-ci-$SHA.txt" 2>&1; echo "npm ci exit $?"
  echo "puppeteer browser cache present: $([ -d "$HOME/.cache/puppeteer" ] && echo yes || echo no)"
  npx tsc -b > "$S/pig-tsc-$SHA.txt" 2>&1; echo "tsc exit $?"
  cp "$HERE/probe.cjs" "$HERE/probe-pages.cjs" "$E/"
  unshare -rn bash -c 'ip link set lo up
    echo "nonloopback links: $(ip -o link show | grep -vc ": lo:")  default routes: $(ip route show default | grep -c .)"
    cd "$1" && timeout 600 node probe.cjs' _ "$E"
  echo "probe exit $?"
} > "$OUT" 2>&1
