#!/bin/bash
# Bounded look-only poll of the newest production deployment of the website project.
# Usage: poll-prod-deployment.sh <website-dir> <old-deployment-host-substring> <out-file>
#   Reads `vercel ls --prod` (stdin closed, 60 s timeout per read), at most 20 reads 30 s apart.
#   Exit 0: the newest production deployment is not the old one and is Ready.
#   Exit 4: the newest production deployment is not the old one and is Error (or Canceled).
#   Exit 3: three consecutive unreadable reads (stop).
#   Exit 5: the bound was reached with no new deployment in a final state.
set -u
dir=$1; old=$2; out=$3
unread=0
cd "$dir" || exit 90
: > "$out"
for i in $(seq 1 20); do
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  raw=$(timeout 60 vercel ls --prod </dev/null 2>&1); rc=$?
  line=$(printf '%s\n' "$raw" | grep -E '^ +[0-9]+[smhd] +https://' | head -1)
  if [ $rc -ne 0 ] || [ -z "$line" ]; then
    unread=$((unread+1)); echo "$ts read $i unreadable (rc=$rc, consecutive $unread)" >> "$out"
    [ $unread -ge 3 ] && { echo "$ts stop: 3 consecutive unreadable reads" >> "$out"; exit 3; }
  else
    unread=0; echo "$ts read $i: $(printf '%s' "$line" | tr -s ' ')" >> "$out"
    if ! printf '%s' "$line" | grep -q "$old"; then
      if printf '%s' "$line" | grep -q 'Ready'; then exit 0; fi
      if printf '%s' "$line" | grep -qE 'Error|Canceled'; then exit 4; fi
    fi
  fi
  sleep 30
done
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) bound reached" >> "$out"
exit 5
