#!/bin/bash
# poll-website-deploy.sh <sha> [max-reads=20] [interval-s=30] — release runbook row W5 (B-11, website). READ-ONLY.
# Reads the production project's recent deployments (`vercel api /v6/deployments`, scope hooks-gg) and looks for the
# one whose meta.githubCommitSha equals <sha>. One verb: a GET. Bound: max-reads reads; stop mechanism: exit code.
# Exit 0 deployment of <sha> is READY (target production); 4 it is ERROR or CANCELED; 3 three consecutive unreadable
# reads; 5 bound reached with no READY deployment. POLL_READ_CMD overrides the read (the stub dry run).
set -u
SHA="$1"; MAX="${2:-20}"; INT="${3:-30}"; BAD=0
READ="${POLL_READ_CMD:-npx vercel@66.2.0 api /v6/deployments?projectId=prj_nhlL7VUS0C9BzgD1Kvh3E1AUv72r&limit=8 --scope hooks-gg}"
for i in $(seq 1 "$MAX"); do
  OUT="$(timeout 60 $READ 2>/dev/null)"; RC=$?
  ST="$(printf '%s' "$OUT" | python3 -I -c '
import sys,json
try: d=json.load(sys.stdin)
except Exception: print("UNREADABLE"); sys.exit()
sha=sys.argv[1]
for x in d.get("deployments",[]):
    if (x.get("meta") or {}).get("githubCommitSha")==sha:
        print((x.get("state") or x.get("readyState") or "?")+" "+str(x.get("target"))); break
else: print("ABSENT")' "$SHA")"
  echo "read $i $(date -u +%FT%TZ) rc=$RC state=$ST"
  case "$ST" in
    UNREADABLE) BAD=$((BAD+1)); [ "$BAD" -ge 3 ] && { echo "3 consecutive unreadable reads"; exit 3; } ;;
    "READY production") exit 0 ;;
    ERROR*|CANCELED*) exit 4 ;;
    *) BAD=0 ;;
  esac
  sleep "$INT"
done
exit 5
