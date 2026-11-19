#!/usr/bin/env bash
# Usage: run.sh <generator export dir> <out dir> [--quick]
# Runs probe.mjs network-isolated (unshare -rn, loopback raised). The generator is started and stopped by probe.mjs; this wrapper
# checks that no generator or Chrome process of the export is left.
set -uo pipefail
EXPORT=$(realpath "${1:?generator export dir}")
OUT=$(realpath -m "${2:?out dir}")
HERE=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$OUT"
shift 2
timeout 600 unshare -rn sh -c "ip link set lo up 2>/dev/null; node '$HERE/probe.mjs' '$EXPORT' '$OUT' $*" > "$OUT/probe.out" 2>&1
echo "exit $?" > "$OUT/probe.exit"
cat "$OUT/probe.out"
left=$(pgrep -fc "$EXPORT/src/server.ts" || true)
chrome=$(pgrep -fc "puppeteer_dev_chrome_profile" || true)
echo "left over processes: generator $left, chrome $chrome"
