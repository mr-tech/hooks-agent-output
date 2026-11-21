#!/bin/bash
RUNNER=$HOME/.claude/tools/mutation-run.py
REPO=/usr/local/bin/hooks/website
SHA=8f24e6516ca8c87b0b3c9be1ad660f816ff5fcfd
QA=/usr/local/bin/hooks/agent-output/verification/fix-recent-message-ids/qa
SCR=/tmp/claude-1000/-usr-local-bin-hooks-website/2a120950-d39c-41cf-ab8c-0fe1200096a5/scratchpad
python3 "$RUNNER" --repo "$REPO" --sha "$SHA" --mutants "$QA/sweep-mutants.json" --work "$SCR/mut-work-sweep" --out "$QA/sweep" --timeout 240 --dep node_modules -- npx vitest run > "$QA/sweep/runner-stdout.txt" 2>&1
echo $? > "$QA/sweep/runner-exit.txt"
python3 "$RUNNER" --repo "$REPO" --sha "$SHA" --mutants "$QA/premise-mutants.json" --work "$SCR/mut-work-premise" --out "$QA/premise" --timeout 480 --dep node_modules -- npx vitest run > "$QA/premise/runner-stdout.txt" 2>&1
echo $? > "$QA/premise/runner-exit.txt"
