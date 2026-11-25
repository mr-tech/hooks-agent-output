#!/bin/sh
# usage: run-phase3.sh <scratch dir> ; QA Phase 3 for plan 019 on the release tip website 48eb60a (deployment record runbook R-1).
# A git-archive export x48p, blob identity against the commit, frozen offline install, then: typecheck (both programs); the whole
# offline suite (unshare -rn, lo up); test:discord live (network on, read-only fetches) and offline (loud by design); AC-3.3's full
# count (MOUNTED_GENERATOR_COUNT=1000, offline). Output to files only.
S=$1; OUT=$(cd "$(dirname "$0")" && pwd); W=/usr/local/bin/hooks/website; T=48eb60a02f4af4f27f1a5426bbe7e58301b1d148
M=src/components/SlateEditor/__tests__; X=$S/x48p
mark() { echo "$1 load $(cat /proc/loadavg) $(date -u +%H:%M:%SZ)" >> $OUT/loads.txt; }
rm -rf $X; mkdir -p $X; git -C $W archive $T | tar -x -C $X
# blob identity: every tracked blob of the commit hashed from the export
git -C $W ls-tree -r $T | awk '$2=="blob"{print $3"\t"$4}' > $OUT/tree-48eb60a.tsv
n=0; bad=0; while IFS="$(printf '\t')" read -r h p; do n=$((n+1)); [ "$(git hash-object "$X/$p")" = "$h" ] || { bad=$((bad+1)); echo "differs: $p" >> $OUT/blob-identity.txt; }; done < $OUT/tree-48eb60a.tsv
echo "$T $X: $((n-bad)) of $n tracked blobs equal; $bad differ" >> $OUT/blob-identity.txt
cd $X || exit 2
mark "install before"; timeout -k 10 1200 pnpm install --frozen-lockfile --offline > $OUT/install.log.txt 2>&1; echo $? > $OUT/install.exit; mark "install after"
mark "typecheck before"; timeout -k 10 1200 pnpm run typecheck > $OUT/typecheck.log.txt 2>&1; echo $? > $OUT/typecheck.exit; mark "typecheck after"
mark "suite before"; /usr/bin/time -f '%e s wall' -o $OUT/suite.time timeout -k 10 2400 unshare -rn sh -c "ip link set lo up && npx vitest run --project node --project dom --reporter=json --outputFile=$OUT/suite.json" > $OUT/suite.log.txt 2>&1; echo $? > $OUT/suite.exit; mark "suite after"
mark "discord-live before"; timeout -k 10 1800 npx vitest run --project discord-node --project discord-dom --reporter=default --reporter=json --outputFile=$OUT/discord-live.json > $OUT/discord-live.log.txt 2>&1; echo $? > $OUT/discord-live.exit; mark "discord-live after"
mark "discord-offline before"; timeout -k 10 1800 unshare -rn sh -c "ip link set lo up && npx vitest run --project discord-node --project discord-dom" > $OUT/discord-offline.log.txt 2>&1; echo $? > $OUT/discord-offline.exit; mark "discord-offline after"
mark "full-count before"; MOUNTED_GENERATOR_COUNT=1000 /usr/bin/time -f '%e s wall' -o $OUT/full-count.time timeout -k 10 2400 unshare -rn sh -c "ip link set lo up && npx vitest run --project node --project dom $M/SlateEditor.pasted-text-reaches-the-message.test.tsx $M/SlateEditor.typed-generated-text-reaches-the-message.test.tsx --reporter=json --outputFile=$OUT/full-count.json" > $OUT/full-count.log.txt 2>&1; echo $? > $OUT/full-count.exit; mark "full-count after"
echo "done $(date -u +%H:%M:%SZ)" >> $OUT/loads.txt
