#!/usr/bin/env bash
# Usage: isolated-export.sh <website-repo> <sha> <dest-dir> <out-dir>
#
# Exports <sha> of <website-repo> with `git archive` into <dest-dir> (which must not exist) and
# installs it offline with lifecycle scripts off. Writes, under <out-dir>:
#   isolated-env-file-count-<short>.txt   how many of .env and .env.local the export holds (expected 0)
#   isolated-install-<short>.log / .exit  the install's output and exit status
# Run it inside a capped scope, e.g.
#   systemd-run --user --scope -p RuntimeMaxSec=900 -p MemoryMax=6G -p TasksMax=1024 bash isolated-export.sh ...
set -u
repo=$1; sha=$2; dest=$3; out=$4
short=$(git -C "$repo" rev-parse --short=7 "$sha") || exit 2
mkdir -p "$out"
mkdir "$dest" || exit 2
git -C "$repo" archive "$sha" | tar -x -C "$dest" || exit 3
n=0
for f in "$dest/.env" "$dest/.env.local"; do [ -e "$f" ] && n=$((n + 1)); done
echo "$n" > "$out/isolated-env-file-count-$short.txt"
cd "$dest" || exit 4
pnpm install --frozen-lockfile --offline --ignore-scripts > "$out/isolated-install-$short.log" 2>&1
code=$?
echo "$code" > "$out/isolated-install-$short.exit"
exit "$code"
