#!/usr/bin/env bash
# Code-review probes for plan 015 M4 (getFromUrl cross-guild attack). Copies the probe files beside this script into a git-archive
# export of website at <sha> (src/__crprobe__/), links website's node_modules read-only, and runs
# only those files with the export's own vitest config. Output goes to <out-file>; the export is removed.
# Usage: run.sh <website-repo> <scratch-dir> <sha> <out-file>
set -u
REPO=$1; SCR=$2; SHA=$3; OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
E="$SCR/crprobe-$SHA"
rm -rf "$E"; mkdir -p "$E"
git -C "$REPO" archive "$SHA" | tar -x -C "$E"
ln -s "$REPO/node_modules" "$E/node_modules"
mkdir -p "$E/src/__crprobe__"
cp "$HERE"/*.test.ts "$E/src/__crprobe__/"
{
  echo "# website $SHA, $(date -u +%Y-%m-%dT%H:%MZ), node $(node --version)"
  cd "$E" && setsid timeout --kill-after=10 300 ./node_modules/.bin/vitest run --project node --reporter=verbose --silent=false src/__crprobe__ 2>&1
  echo "# vitest exit $?"
} > "$OUT"
rm -rf "$E"
