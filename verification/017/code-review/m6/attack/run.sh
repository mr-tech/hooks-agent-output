#!/usr/bin/env bash
# Usage: run.sh <generator export dir> <out dir>
# Code review Round 7 (chain 017, M6): runs attack.mjs network-isolated (unshare -rn, loopback up) against the generator in the
# export (its own node_modules; Chrome from /usr/bin/google-chrome), then reports leftover generator and Chrome processes by pid list.
set -uo pipefail
EXPORT=$(realpath "${1:?export}"); OUT=$(realpath -m "${2:?out}"); HERE=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$OUT"
timeout 300 unshare -rn sh -c "ip link set lo up 2>/dev/null; node '$HERE/attack.mjs' '$EXPORT'" > "$OUT/attack.out" 2>&1
echo "exit $?" > "$OUT/attack.exit"
cat "$OUT/attack.out"
{ pgrep -f "$EXPORT/src/server.ts" || true; pgrep -f puppeteer_dev_chrome_profile || true; } | grep -vx "$$" > "$OUT/leftover.pids"
echo "leftover pids: $(grep -c . "$OUT/leftover.pids")"
