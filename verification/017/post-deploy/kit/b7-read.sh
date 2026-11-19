#!/bin/bash
# b7-read.sh — plan 017 B-7 instrument (QA register row B-7; D-8's failure line readable in production).
# Read-only: two `vercel logs` reads of the production deployment's runtime logs, nothing written to Vercel.
#   usage: bash verification/017/post-deploy/kit/b7-read.sh <out-prefix>
#   writes <out-prefix>.failure.jsonl (the D-8 fixed prefix), <out-prefix>.control.jsonl (liveness control:
#   the same window read without a filter, which carries the existing /api/auth/session cold-start lines;
#   a `-q` on the path matches nothing, the path is not in the message; deleted after counting),
#   <out-prefix>.counts.txt.
# Window: 23 h, because function-log retention is under one day (QA B-7 reconcile 2026-11-18T23:45Z).
set -u
P="${1:?out prefix}"
V="npx vercel@66.2.0"
SCOPE="hooks-gg"; PROJ="hooks-gg-website"
timeout 300 $V logs -p "$PROJ" --scope "$SCOPE" -e production -s 23h --json -q 'preview-image-failure' -n 1000 >"$P.failure.jsonl" 2>"$P.failure.stderr.txt"; F=$?
timeout 300 $V logs -p "$PROJ" --scope "$SCOPE" -e production -s 23h --json -n 1000 >"$P.control.jsonl" 2>"$P.control.stderr.txt"; C=$?
{
  echo "failure_read_exit=$F control_read_exit=$C"
  echo "failure_lines_with_prefix=$(grep -c 'preview-image-failure' "$P.failure.jsonl")"
  echo "control_records_in_window=$(grep -c '"level"' "$P.control.jsonl")"
  echo "control_auth_session_records=$(grep -c '/api/auth/session' "$P.control.jsonl")"
} >"$P.counts.txt"
rm -f "$P.control.jsonl"   # the unfiltered window carries log text: only its counts are kept
cat "$P.counts.txt"
[ "$F" -eq 0 ] && [ "$C" -eq 0 ]
