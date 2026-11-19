#!/usr/bin/env bash
# Usage: break.sh <out file>
# Code review Round 7 sub-entry (chain 017): breaks the fixed section [7]'s boundary predicate with what the implementer's
# seven cases do not hold. restart-after-deploy: a deploy, a render, then a later process start (a crash restart) with no
# render since; the count is since the latest process start, so it reads 0, not 1 (a conservative zero, never a vacuous one).
# pm2-prefixed: every line carries a leading pm2-style stamp, so no line is ISO-headed and the boundary is NOT READ.
set -u
OUT=$(realpath -m "${1:?out file}")
R=/usr/local/bin/hooks/agent-output
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
P=hooks-image-preview-generator-prod
read7() {
  mkdir -p "$T/fx/logs"; : > "$T/fx/pm2.log"; : > "$T/fx/logs/$P-error.log"; cp "$1" "$T/fx/logs/$P-out.log"
  sed -e "s#^H=/etc/.pm2#H=$T/fx#" -e '/^\[ "\$ME" = "claude-ro" \]/d' "$R/verification/015/pig-host-read.sh" > "$T/script.sh"
  bash "$T/script.sh" 2>&1 | sed -n '/^\[7\]/,/^=== end/p' | grep -E "Generated image for message' lines|NOT READ" | sed 's/^ *//'
}
printf '%s\n' '2026-11-20T09:00:00.000Z Server running at http://0.0.0.0:3000/' \
  '2026-11-20T09:05:00.000Z Generated image for message 114 with nonce d in 880ms' \
  '2026-11-21T03:00:00.000Z Server running at http://0.0.0.0:3000/' > "$T/restart.log"
printf '%s\n' '11/20/2026 09:00:00 +00:00: 2026-11-20T09:00:00.000Z Server running at http://0.0.0.0:3000/' \
  '11/20/2026 09:05:00 +00:00: 2026-11-20T09:05:00.000Z Generated image for message 114 with nonce d in 880ms' > "$T/pm2prefix.log"
{ echo "== restart-after-deploy (want 0: since the latest process start):"; read7 "$T/restart.log"
  echo "== pm2-prefixed lines (want NOT READ):"; read7 "$T/pm2prefix.log"; } > "$OUT"
cat "$OUT"
