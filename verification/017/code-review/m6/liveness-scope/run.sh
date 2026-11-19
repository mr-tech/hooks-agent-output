#!/usr/bin/env bash
# Usage: run.sh <out file>
# Code review Round 7 (chain 017), CR-16's falsifier: pig-host-read.sh section [7]'s liveness count against an out log
# whose only 'Generated image' lines predate the last deploy's ready line. RK-7 precondition (2) wants the count since the
# deploy, which here is 0. The script is copied with H pointed at the fixture and the claude-ro refusal removed, as
# verification/017/m6-probe/pig-host-read-fixture.sh does. Control: the same log with one post-deploy line appended.
set -u
OUT=$(realpath -m "${1:?out file}")
R=/usr/local/bin/hooks/agent-output
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
P=hooks-image-preview-generator-prod
read7() {
  mkdir -p "$T/fx/logs"; : > "$T/fx/pm2.log"; : > "$T/fx/logs/$P-error.log"
  cp "$1" "$T/fx/logs/$P-out.log"
  sed -e "s#^H=/etc/.pm2#H=$T/fx#" -e '/^\[ "\$ME" = "claude-ro" \]/d' "$R/verification/015/pig-host-read.sh" > "$T/script.sh"
  bash "$T/script.sh" 2>&1 | grep "Generated image for message' lines"
}
cat > "$T/before.log" <<'LOG'
2026-10-01T10:00:00.000Z Server running at http://0.0.0.0:3000/
2026-10-01T10:05:00.000Z Generated image for message 111 with nonce a in 900ms
2026-10-02T11:00:00.000Z Generated image for message 112 with nonce b in 850ms
2026-10-03T12:00:00.000Z Generated image for message 113 with nonce c in 910ms
2026-11-20T09:00:00.000Z Server running at http://0.0.0.0:3000/
LOG
cp "$T/before.log" "$T/after.log"
echo "2026-11-20T09:05:00.000Z Generated image for message 114 with nonce d in 880ms" >> "$T/after.log"
{
  echo "case no-render-since-deploy (want 0 since the 2026-11-20T09:00 ready line): $(read7 "$T/before.log")"
  echo "control one-render-since-deploy (want 1): $(read7 "$T/after.log")"
} > "$OUT"
cat "$OUT"
