#!/bin/sh
# Run inside `unshare -rn`: bring up loopback, start `next start` for the given export, run a probe, stop the server.
# usage: in-netns.sh <export-dir> <port> <server-log> <probe command...>
set -u
EXPORT=$1; PORT=$2; SLOG=$3; shift 3
ip link set lo up
. /tmp/claude-1000/-usr-local-bin-hooks/8ca68c2a-e1d9-4652-bda9-7e42e967044d/scratchpad/spike.env
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
