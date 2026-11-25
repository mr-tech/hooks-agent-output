#!/bin/bash
# Plan 019 B5R gate: exit 0 only when the carrier's E-WEBSITE-PUSH "When" cell is filled, at least 15 minutes ago, and
# no completion row exists. Run from the record root. Nothing is read from the network.
#   usage: bash verification/019/post-deploy/kit/gate.sh
set -u
NAME=slate-formatting-link-targets-post-deploy-2026-11-25.md
LOG_DIR=/home/dev/.local/state/019-b5
mkdir -p "$LOG_DIR"
log() { echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) $*" >>"$LOG_DIR/gate.log"; }

CARRIER=handoff/$NAME
[ -f "$CARRIER" ] || CARRIER=handoff/closed/$NAME
[ -f "$CARRIER" ] || { log "skipped: carrier absent"; exit 1; }
grep -q '| *run-B5R-complete *| *$' "$CARRIER" && { log "skipped: read already complete"; exit 1; }

WHEN=$(awk -F'|' '$2 ~ /^ *E-WEBSITE-PUSH *$/ { gsub(/^ +| +$/, "", $3); print $3; exit }' "$CARRIER")
[ -n "$WHEN" ] || { log "skipped: E-WEBSITE-PUSH not filled"; exit 1; }
PUSHED=$(date -u -d "$WHEN" +%s 2>/dev/null) || { log "skipped: E-WEBSITE-PUSH When does not parse: $WHEN"; exit 1; }
AGE=$(( $(date -u +%s) - PUSHED ))
[ "$AGE" -ge 900 ] || { log "skipped: ${AGE}s since the push, under 900"; exit 1; }
log "open: ${AGE}s since the push"
