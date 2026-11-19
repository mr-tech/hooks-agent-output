#!/usr/bin/env bash
# Usage: liveness-scope-fixture.sh <out file> [pig-host-read.sh to read; default verification/015/pig-host-read.sh]
# RK-7's liveness precondition (2) wants the generated-image count SINCE THE DEPLOY. This reads section [7] of the script over
# out logs whose 'Generated image' lines sit before, after, or both sides of the latest ISO-stamped 'Server running at' line.
# The script is copied with H pointed at the fixture and the claude-ro refusal removed, as pig-host-read-fixture.sh does.
# Each case prints the section's own printed count, beside what is wanted.
set -u
OUT=$(realpath -m "${1:?out file}")
SCRIPT=${2:-/usr/local/bin/hooks/agent-output/verification/015/pig-host-read.sh}
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
P=hooks-image-preview-generator-prod
read7() {
  mkdir -p "$T/fx/logs"; : > "$T/fx/pm2.log"; : > "$T/fx/logs/$P-error.log"
  cp "$1" "$T/fx/logs/$P-out.log"
  sed -e "s#^H=/etc/.pm2#H=$T/fx#" -e '/^\[ "\$ME" = "claude-ro" \]/d' "$SCRIPT" > "$T/script.sh"
  bash "$T/script.sh" 2>&1 | sed -n '/^\[7\]/,/^=== end/p' | grep -E "Generated image for message' lines|deploy boundary|NOT READ" | sed 's/^ *//'
}
R1='2026-10-01T10:00:00.000Z Server running at http://0.0.0.0:3000/'
G1='2026-10-01T10:05:00.000Z Generated image for message 111 with nonce a in 900ms'
G2='2026-10-02T11:00:00.000Z Generated image for message 112 with nonce b in 850ms'
G3='2026-10-03T12:00:00.000Z Generated image for message 113 with nonce c in 910ms'
R2='2026-11-20T09:00:00.000Z Server running at http://0.0.0.0:3000/'
G4='2026-11-20T09:05:00.000Z Generated image for message 114 with nonce d in 880ms'
G5='2026-11-20T09:06:00.000Z Generated image for message 115 with nonce e in 870ms'
printf '%s\n' "$R1" "$G1" "$G2" "$G3" "$R2" > "$T/no-render.log"
printf '%s\n' "$R1" "$G1" "$G2" "$G3" "$R2" "$G4" > "$T/one-render.log"
printf '%s\n' "$R1" "$G1" "$G2" "$G3" "$R2" "$G4" "$G5" > "$T/two-renders.log"
printf '%s\n' "$G1" "Server running at http://0.0.0.0:3000/" "$G4" > "$T/no-stamped-ready.log"
printf '%s\n' "$R2" "$G4" "$R1" "$G1" > "$T/ready-out-of-order.log"
printf '%s\n' "$R2" "2026-11-20T09:07:00.000Z Generated image for message 116 failed in 5ms" "2026-11-20T09:08:00.000Z Created instance with nonce x in 5ms" > "$T/other-shapes-after.log"
printf '%s\n' "$R2" "Generated image for message 117 with nonce f in 5ms" "xxxxxxxxxxxxxxxxxxxxxxxxxGenerated image for message 118 with nonce g in 5ms" > "$T/unstamped-generated-after.log"
{
  echo "== case no-render-since-deploy (3 lines before the latest ready line, none after; want 0):"; read7 "$T/no-render.log"
  echo "== case one-render-since-deploy (3 before, 1 after; want 1):"; read7 "$T/one-render.log"
  echo "== case two-renders-since-deploy (3 before, 2 after; want 2):"; read7 "$T/two-renders.log"
  echo "== case ready-lines-out-of-line-order (the later stamp is the earlier line; 1 line after it, 1 before; want 1):"; read7 "$T/ready-out-of-order.log"
  echo "== case other-line-shapes-after-deploy (a generated-image line without the nonce shape, a line with the nonce tail but another head; want 0):"; read7 "$T/other-shapes-after.log"
  echo "== case unstamped-generated-line-after-deploy (two lines with no ISO stamp, one with 25 characters ahead of the phrase, so they cannot be placed; want 0):"; read7 "$T/unstamped-generated-after.log"
  echo "== case no-stamped-ready-line (the boundary is not placeable; want NOT READ, no count):"; read7 "$T/no-stamped-ready.log"
} > "$OUT"
cat "$OUT"
