#!/bin/sh
# usage: run-fr6b.sh <scratch dir> ; QA M6 Phase 2 on Fix Round 6, second batch, in the clean export x48s (48eb60a) and xaf
# (af3d95a): test:discord live (network on, read-only fetches) and offline (unshare -rn, lo up); the full 1,000 mounted
# generator inputs (R-92); next build of both trees for the walks (.env.local copied in, never read).
S=$1; OUT=$(cd "$(dirname "$0")" && pwd); M=src/components/SlateEditor/__tests__
mark() { echo "$1 load $(cat /proc/loadavg) $(date -u +%H:%M:%SZ)" >> $OUT/loads.txt; }
cd $S/x48s || exit 2
mark "discord-live before"; timeout -k 10 1800 npx vitest run --project discord-node --project discord-dom --reporter=default --reporter=json --outputFile=$OUT/discord-live-48eb60a.json > $OUT/discord-live-48eb60a.log.txt 2>&1; echo $? > $OUT/discord-live-48eb60a.exit; mark "discord-live after"
mark "discord-offline before"; timeout -k 10 1800 unshare -rn sh -c "ip link set lo up && npx vitest run --project discord-node --project discord-dom" > $OUT/discord-offline-48eb60a.log.txt 2>&1; echo $? > $OUT/discord-offline-48eb60a.exit; mark "discord-offline after"
mark "full-count before"; MOUNTED_GENERATOR_COUNT=1000 /usr/bin/time -f '%e s wall' -o $OUT/full-count-48eb60a.time timeout -k 10 2400 unshare -rn sh -c "ip link set lo up && npx vitest run --project node --project dom $M/SlateEditor.pasted-text-reaches-the-message.test.tsx $M/SlateEditor.typed-generated-text-reaches-the-message.test.tsx --reporter=json --outputFile=$OUT/full-count-48eb60a.json" > $OUT/full-count-48eb60a.log.txt 2>&1; echo $? > $OUT/full-count-48eb60a.exit; mark "full-count after"
for t in x48s xaf; do
  cp /usr/local/bin/hooks/website/.env.local $S/$t/.env.local
  mark "build $t before"; ( cd $S/$t && timeout -k 10 1800 pnpm run build > $OUT/build-$t.log.txt 2>&1; echo $? > $OUT/build-$t.exit ); mark "build $t after"
done
echo "done $(date -u +%H:%M:%SZ)" >> $OUT/loads.txt
