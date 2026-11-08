#!/usr/bin/env bash
# Usage: run.sh <agent-output sha> — runs pig-host-read.sh at that commit against a synthetic PM2_HOME
# (fixture/), with H pointed there and the claude-ro refusal removed, and writes span-read-<sha>.txt.
# Fixture: three prod stops A 10:00:00, B 11:00:00, C 12:00:00. The process started after A never
# reaches a ready line (it logs one 'Created instance' at 10:30 and a 'Server received' at 11:00:00.5);
# the process after B is ready at 11:00:02 and stopped by C; the one after C is ready at 12:00:02.
# Expected of a span read bounded per plan § M8-0: span (A,B) is NO SPAN (the stopped process has no
# ready line), never a span of zero figures; span (B,C) reads 1 Created instance.
set -u
SHA=$1; HERE=$(cd "$(dirname "$0")" && pwd); R=/usr/local/bin/hooks/agent-output
FX=$HERE/fixture; rm -rf "$FX"; mkdir -p "$FX/logs"
P=hooks-image-preview-generator-prod
cat > "$FX/pm2.log" <<P2
2026-01-01T09:00:00: PM2 log: App [$P:0] online
2026-01-01T10:00:00: PM2 log: Stopping app:$P id:0
2026-01-01T10:00:01: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]
2026-01-01T11:00:00: PM2 log: Stopping app:$P id:0
2026-01-01T11:00:01: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]
2026-01-01T12:00:00: PM2 log: Stopping app:$P id:0
2026-01-01T12:00:01: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]
P2
cat > "$FX/logs/$P-out.log" <<O
2026-01-01T09:00:00.500Z Server running at http://0.0.0.0:3000/
2026-01-01T10:30:00.000Z Created instance 1
2026-01-01T11:00:00.500Z Server received SIGINT
2026-01-01T11:00:02.000Z Server running at http://0.0.0.0:3000/
2026-01-01T11:30:00.000Z Created instance 1
2026-01-01T12:00:02.000Z Server running at http://0.0.0.0:3000/
O
: > "$FX/logs/$P-error.log"
S=$HERE/pig-host-read-$SHA.sh
git -C "$R" show "$SHA:verification/015/pig-host-read.sh" | sed "s|^H=/etc/.pm2\$|H=$FX|; s|^\[ \"\$ME\" = \"claude-ro\" \].*\$|:|" > "$S"
grep -c "^H=$FX\$" "$S" > "$HERE/span-read-$SHA.txt"
bash "$S" 2>&1 | sed -n '/^\[6\]/,$p' >> "$HERE/span-read-$SHA.txt"
rm -f "$S"
