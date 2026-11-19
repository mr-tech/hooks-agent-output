#!/bin/bash
# b10-read.sh — plan 017 B-10 instrument (RK-7; QA register B-10). Read-only: streams
# verification/015/pig-host-read.sh over the standing read-only alias `hooks-pig` (claude-ro); nothing is
# copied to or written on the host. Section [7] prints the per-class `preview-image-failure` counts, the deploy
# boundary stamp and the "Generated image for message" liveness count since it.
#   usage: bash verification/017/post-deploy/kit/b10-read.sh <out-file>
set -u
O="${1:?out file}"
timeout 120 ssh hooks-pig 'bash -s' < verification/015/pig-host-read.sh >"$O" 2>"$O.stderr.txt"; R=$?
echo "ssh_exit=$R"
grep -A9 '^\[7\]' "$O"
exit $R
