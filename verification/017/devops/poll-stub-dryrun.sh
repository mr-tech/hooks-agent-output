#!/bin/bash
# stub dry run of both pollers (no host call): fixtures on stdout via POLL_READ_CMD. Run from this directory.
set -u
cd "$(dirname "$0")"
F=$(mktemp -d); trap 'rm -rf "$F"' EXIT
echo '{"deployments":[{"state":"READY","target":"production","meta":{"githubCommitSha":"AAA"}}]}' > $F/ready.json
echo '{"deployments":[{"state":"ERROR","target":"production","meta":{"githubCommitSha":"AAA"}}]}' > $F/err.json
echo '{"deployments":[]}' > $F/absent.json
echo 'garbage' > $F/bad.json
for c in "ready:0" "err:4" "absent:5" "bad:3"; do n=${c%%:*}; want=${c##*:}
  POLL_READ_CMD="cat $F/$n.json" bash poll-website-deploy.sh AAA 3 0 >/dev/null; echo "website $n exit=$? want=$want"; done
echo "  latest ISO-stamped 'Server running at' line in the out log (the deploy boundary): 2026-11-19T20:00:00.000Z" > $F/g-new.txt
echo "  latest ISO-stamped 'Server running at' line in the out log (the deploy boundary): 2026-11-08T22:04:51.196Z" > $F/g-old.txt
echo 'nothing' > $F/g-bad.txt
for c in "new:0" "old:5" "bad:3"; do n=${c%%:*}; want=${c##*:}
  POLL_READ_CMD="cat $F/g-$n.txt" bash poll-generator-start.sh 2026-11-19T19:30:00.000Z 3 0 >/dev/null; echo "generator $n exit=$? want=$want"; done
