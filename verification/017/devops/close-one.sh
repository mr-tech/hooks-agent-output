#!/bin/bash
# close-one.sh <doc> [extra close-doc.py args] — one document: edits via record-edit.js, plain mv, commit by pathspec, verify.
set -u
D="$1"; shift
S=/tmp/claude-1000/-usr-local-bin-hooks/79f050e5-25a3-4dbe-bb13-34efe9088105/scratchpad
B=$(basename "$D"); DIR=$(dirname "$D")
python3 -I verification/017/devops/close-doc.py "$D" "$S/edits-$B.json" "$@" || exit 11
node ~/.claude/tools/record-edit.js "$D" "$S/edits-$B.json" || exit 12
mkdir -p "$DIR/closed"
mv "$D" "$DIR/closed/$B" || exit 13
git add --intent-to-add "$DIR/closed/$B" || exit 14
git commit --only "$D" "$DIR/closed/$B" -m "devops(017): close $B — Committed at Stage 1 (website 7293a35, generator 8512a1d)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_019f79t8h4SPuuoKL1R9nixY" >/dev/null || exit 15
git diff --quiet HEAD -- "$DIR/closed/$B"; echo "closed $B verify_exit=$?"
