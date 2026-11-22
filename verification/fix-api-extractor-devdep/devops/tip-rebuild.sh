#!/bin/bash
# usage: tip-rebuild.sh <repo> <workdir> <outdir> <sha>
# Devops packaging re-run at the release tip. git archive export of <sha> (the shared tree is only read),
# npm ci, then npm run rebuild with PATH reduced to node/npm/npx plus /usr/bin:/bin (no global
# api-extractor), each step in a capped scope. Then diff -r of rebuilt dist/ against <sha>'s committed
# dist/, and the toolchain versions. Captures are *-log.txt so the record's *.log ignore rule keeps none out.
set -u
repo=$1; work=$2; out=$3; sha=$4
shim=$work/shim
d=$work/export-tip
mkdir -p "$shim" "$out"
for t in node npm npx; do ln -sf "$(readlink -f "$(command -v $t)")" "$shim/$t"; done
P="$shim:/usr/bin:/bin"
rm -rf "$d" "$d.committed"; mkdir -p "$d" "$d.committed"
git -C "$repo" archive "$sha" | tar -x -C "$d"
git -C "$repo" archive "$sha" dist | tar -x -C "$d.committed"
(env PATH="$P" sh -c 'node -v; npm -v; command -v api-extractor; echo which-exit=$?') > "$out/tip-toolchain-log.txt" 2>&1
(cd "$d" && env PATH="$P" timeout -s KILL 600 systemd-run --user --scope -q -p MemoryMax=8G -p TasksMax=512 npm ci --no-audit --no-fund) > "$out/tip-ci-log.txt" 2>&1
echo "exit=$?" >> "$out/tip-ci-log.txt"
(cd "$d" && env PATH="$P" timeout -s KILL 600 systemd-run --user --scope -q -p MemoryMax=8G -p TasksMax=512 npm run rebuild) > "$out/tip-rebuild-log.txt" 2>&1
echo "exit=$?" >> "$out/tip-rebuild-log.txt"
diff -r "$d.committed/dist" "$d/dist" > "$out/tip-dist-diff.txt" 2>&1
echo "exit=$?" >> "$out/tip-dist-diff.txt"
(cd "$d" && git -C "$repo" ls-files -z >/dev/null; cmp package-lock.json <(git -C "$repo" show "$sha:package-lock.json"); echo "lock-cmp-exit=$?") > "$out/tip-lock-unchanged-log.txt" 2>&1
(cd "$d/dist" && find . -type f | sort | xargs sha256sum) > "$out/tip-dist-rebuilt.sha256" 2>&1
(cd "$d.committed/dist" && find . -type f | sort | xargs sha256sum) > "$out/tip-dist-committed.sha256" 2>&1
