#!/bin/bash
# p1-read.sh — fix-message-page-header-decode post-deploy row P-1 instrument. One ordinary GET to the
# production image optimiser (the same request steering made before the push, block 2026-11-20T02:18Z of
# steering/website-deps-review-rulings.md; headers kept at
# verification/fix-message-page-header-decode/steering/next-image-headers-pre-push.txt). Read-only; sends
# no cookie and no body. Run once per fire.
#   usage: bash verification/fix-message-page-header-decode/post-deploy/kit/p1-read.sh <out-file>
set -u
O="${1:?out file}"
URL='https://hooks.gg/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Fembed%2Favatars%2F0.png&w=64&q=75'
date -u +%Y-%m-%dT%H:%M:%SZ >"$O"
timeout 40 curl -s -o /dev/null --max-time 30 -D - "$URL" >>"$O" 2>"$O.stderr.txt"; R=$?
echo "curl_exit=$R"
head -20 "$O"
exit $R
