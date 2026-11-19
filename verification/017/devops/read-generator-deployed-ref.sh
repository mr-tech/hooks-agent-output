#!/bin/bash
# read-generator-deployed-ref.sh <expected-sha> [max-reads=3] — runbook row G9 limb 2 (B-11, generator containment; QAF-28). READ-ONLY.
# One verb per read: an ssh read over the standing read-only alias (claude-ro) of the deployed checkout's prod ref file.
# deploy.sh does `cp -r ./ deployed/prod` of the Actions checkout, .git included, so refs/heads/prod there is the commit the
# last deploy copied. A crash-restart or a deploy that stopped before the copy leaves the old SHA.
# Exit 0 the ref equals <expected-sha>; 1 it reads a different SHA (the old code, or a copy that did not happen);
# 3 `max-reads` consecutive unreadable reads. POLL_READ_CMD overrides the read (stub dry run): it must print the ref file's content.
set -u
EXP="$1"; MAX="${2:-3}"; BAD=0
REF=/usr/local/bin/hooks-image-preview-generator/deployed/prod/.git/refs/heads/prod
for i in $(seq 1 "$MAX"); do
  if [ -n "${POLL_READ_CMD:-}" ]; then OUT="$(timeout 60 $POLL_READ_CMD 2>/dev/null)"; RC=$?
  else OUT="$(timeout 60 ssh -o BatchMode=yes -o ConnectTimeout=8 hooks-pig "cat $REF" 2>/dev/null)"; RC=$?; fi
  SHA="$(printf '%s\n' "$OUT" | grep -E -o '^[0-9a-f]{40}$' | head -1)"
  echo "read $i $(date -u +%FT%TZ) rc=$RC deployed-prod-ref=${SHA:-UNREADABLE} expected=$EXP"
  if [ -z "$SHA" ]; then BAD=$((BAD+1)); [ "$BAD" -ge "$MAX" ] && { echo "$MAX consecutive unreadable reads"; exit 3; }; sleep 5; continue; fi
  [ "$SHA" = "$EXP" ] && exit 0
  exit 1
done
exit 3
