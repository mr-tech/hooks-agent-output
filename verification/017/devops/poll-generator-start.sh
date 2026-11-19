#!/bin/bash
# poll-generator-start.sh <push-iso-utc> [max-reads=12] [interval-s=60] — release runbook row G9 (B-11, generator). READ-ONLY.
# Runs verification/015/pig-host-read.sh over the standing read-only alias (claude-ro) and takes section [7]'s
# "deploy boundary" stamp (the latest ISO-stamped 'Server running at' line in the out log). One verb: an ssh read.
# Exit 0 the boundary stamp is later than <push-iso-utc>; 3 three consecutive unreadable reads; 5 bound reached
# (the runner-down case: the job is queued and nothing started - the owner step). POLL_READ_CMD overrides the read (stub).
set -u
PUSH="$1"; MAX="${2:-12}"; INT="${3:-60}"; BAD=0
READ="${POLL_READ_CMD:-ssh hooks-pig bash -s}"
for i in $(seq 1 "$MAX"); do
  if [ -n "${POLL_READ_CMD:-}" ]; then OUT="$(timeout 120 $READ 2>/dev/null)"; else OUT="$(timeout 120 ssh hooks-pig 'bash -s' < /usr/local/bin/hooks/agent-output/verification/015/pig-host-read.sh 2>/dev/null)"; fi; RC=$?
  TS="$(printf '%s\n' "$OUT" | grep -o "the deploy boundary): [0-9T:.Z-]*" | head -1 | sed 's/.*: //')"
  echo "read $i $(date -u +%FT%TZ) rc=$RC boundary=${TS:-UNREADABLE}"
  if [ -z "$TS" ]; then BAD=$((BAD+1)); [ "$BAD" -ge 3 ] && { echo "3 consecutive unreadable reads"; exit 3; }
  else BAD=0; [[ "$TS" > "$PUSH" ]] && exit 0; fi
  sleep "$INT"
done
exit 5
