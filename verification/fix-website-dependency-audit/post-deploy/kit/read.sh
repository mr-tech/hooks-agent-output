#!/bin/bash
# read.sh: chain fix-website-dependency-audit, row B-1 instrument. Read-only: reads the tool's cron.log and counts.
#   usage: bash verification/fix-website-dependency-audit/post-deploy/kit/read.sh <out-file>
# Writes <out-file> with the counts and the run lines (the tool's own log lines: SHAs, counts, GHSA keys), prints it.
set -u
OUT="${1:?out file}"
LOG=/home/dev/.local/state/website-dependency-audit/cron.log
{
  if [ -f "$LOG" ]; then
    echo "cron_log_present=yes mtime=$(date -u -r "$LOG" +%Y-%m-%dT%H:%MZ)"
    echo "cron_log_lines=$(grep -c '' "$LOG")"
    echo "run_lines=$(grep -c -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}Z website ' "$LOG")"
    echo "failed_lines=$(grep -c 'website-dependency-audit failed:' "$LOG")"
    echo "--- first 5 lines of cron.log (each cut at 300 characters)"
    head -n 5 "$LOG" | cut -c1-300
  else
    echo "cron_log_present=no"
  fi
  echo "state_file_present=$([ -f /home/dev/.local/state/website-dependency-audit/reported.json ] && echo yes || echo no)"
} >"$OUT"
cat "$OUT"
