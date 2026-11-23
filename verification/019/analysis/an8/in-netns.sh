#!/bin/sh
# Run inside `unshare -rn`: bring up loopback, start `next start` for the given export, run a probe, stop the server.
# AN-8 copy of an1/in-netns.sh with the committed spike.env path. usage: in-netns.sh <export-dir> <port> <server-log> <probe command...>
set -u
EXPORT=$1; PORT=$2; SLOG=$3; shift 3
ip link set lo up
. /usr/local/bin/hooks/agent-output/verification/019/analysis/an1/spike.env
cd "$EXPORT" || exit 2
./node_modules/.bin/next start -p "$PORT" -H 127.0.0.1 > "$SLOG" 2>&1 &
SPID=$!
trap 'kill $SPID 2>/dev/null; wait $SPID 2>/dev/null' EXIT
i=0
until curl -s -o /dev/null "http://127.0.0.1:$PORT/"; do
  i=$((i+1)); [ $i -gt 120 ] && { echo "server did not come up"; exit 3; }
  sleep 0.5
done
echo "server up after $i polls"
"$@"
echo "probe exit=$?"
