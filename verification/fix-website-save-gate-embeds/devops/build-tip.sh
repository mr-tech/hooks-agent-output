#!/bin/bash
# Build the release tip in an isolated export. Output to files; nothing in the shared tree is touched.
set -u
S=/tmp/claude-1000/-usr-local-bin-hooks-website/b6a3b3e3-6076-418a-b9b4-e87bad5983c1/scratchpad
E=$S/export-0e3d903
W=/usr/local/bin/hooks/website
git -C $W archive 0e3d903ce98e108c7ca848b992ad89ac538f4b44 | tar -x -C $E
echo "archive exit $?" > $S/build-steps.txt
git -C $W rev-parse 0e3d903^{tree} >> $S/build-steps.txt
cp -a $W/node_modules $E/node_modules; echo "node_modules copy exit $?" >> $S/build-steps.txt
cp $W/.env.local $E/.env.local; echo "env copy exit $?" >> $S/build-steps.txt
cd $E
date -u +%FT%TZ > $S/build-start.txt
systemd-run --user --scope -p RuntimeMaxSec=900 -p MemoryMax=6G -p TasksMax=2000 npx next build > $S/build-out.txt 2>&1
echo "build exit $?" > $S/build-exit.txt
date -u +%FT%TZ >> $S/build-exit.txt
