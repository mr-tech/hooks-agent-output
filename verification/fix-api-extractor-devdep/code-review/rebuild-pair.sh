#!/bin/bash
# usage: rebuild-pair.sh <repo> <workdir> <outdir> <sha>...
# Per SHA: git archive export, npm ci, then npm run rebuild with PATH reduced to a shim holding only
# node/npm/npx plus /usr/bin:/bin (no global api-extractor), each step in a capped scope, then diff -r of
# the rebuilt dist/ against the SHA's committed dist/.
set -u
repo=$1; work=$2; out=$3; shift 3
shim=$work/shim
mkdir -p "$shim" "$out"
for t in node npm npx; do ln -sf "$(readlink -f "$(command -v $t)")" "$shim/$t"; done
# npm and npx are JS entry points that need node on PATH; the shim supplies it.
P="$shim:/usr/bin:/bin"
for sha in "$@"; do
  d=$work/export-$sha
  rm -rf "$d"; mkdir -p "$d" "$d.committed"
  git -C "$repo" archive "$sha" | tar -x -C "$d"
  git -C "$repo" archive "$sha" dist | tar -x -C "$d.committed"
  (cd "$d" && env PATH="$P" sh -c 'command -v api-extractor; echo which-exit=$?') > "$out/$sha-which.log" 2>&1
  (cd "$d" && env PATH="$P" timeout -s KILL 600 systemd-run --user --scope -q -p MemoryMax=8G -p TasksMax=512 npm ci --no-audit --no-fund) > "$out/$sha-ci.log" 2>&1
  echo "exit=$?" >> "$out/$sha-ci.log"
  (cd "$d" && env PATH="$P" timeout -s KILL 600 systemd-run --user --scope -q -p MemoryMax=8G -p TasksMax=512 npm run rebuild) > "$out/$sha-rebuild.log" 2>&1
  echo "exit=$?" >> "$out/$sha-rebuild.log"
  ls -la "$d/node_modules/.bin/api-extractor" > "$out/$sha-bin.log" 2>&1; echo "exit=$?" >> "$out/$sha-bin.log"
  diff -r "$d.committed/dist" "$d/dist" > "$out/$sha-dist-diff.txt" 2>&1
  echo "exit=$?" >> "$out/$sha-dist-diff.txt"
  (cd "$d.committed/dist" && find . -type f | sort | xargs sha256sum) > "$out/$sha-dist-committed.sha256"
  (cd "$d/dist" && find . -type f | sort | xargs sha256sum) > "$out/$sha-dist-rebuilt.sha256" 2>&1
done
