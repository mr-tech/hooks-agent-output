#!/usr/bin/env bash
# 018 post-deploy gate: is the READY production deployment built from a commit that contains the release tip?
# Usage: read-serving-deployment.sh <out-file> [tip=d1bb9b0724cded3c3c303203c2cbafe5df7bbf96]
# One read-only Vercel API call (GET /v6/deployments, target production, state READY, newest first) through
# npx vercel@66.2.0 api, scope hooks-gg; the project id is read from website/.vercel/project.json.
# Exit 0: the newest READY production deployment's commit contains the tip (git merge-base --is-ancestor).
# Exit 1: it does not. Exit 3: unreadable (API, parse or git failure); three consecutive exit 3 is a stop for a poller.
OUT=$1; TIP=${2:-d1bb9b0724cded3c3c303203c2cbafe5df7bbf96}
WEB=${WEB:-/usr/local/bin/hooks/website}
PID=$(python3 -c "import json,sys;print(json.load(open(sys.argv[1]))['projectId'])" "$WEB/.vercel/project.json") || exit 3
RAW=$(mktemp); trap 'rm -f "$RAW"' EXIT
(cd "$WEB" && timeout 90 npx -y vercel@66.2.0 api "/v6/deployments?projectId=$PID&target=production&state=READY&limit=3" --scope hooks-gg -X GET) >"$RAW" 2>/dev/null || { echo "unreadable: api exit" | tee "$OUT"; exit 3; }
python3 - "$RAW" >"$OUT.rows" <<'PY' || { echo "unreadable: parse" | tee "$OUT"; exit 3; }
import json,sys
t=open(sys.argv[1]).read()
d,_=json.JSONDecoder().raw_decode(t[t.index('{'):])
for x in d['deployments']:
    m=x.get('meta',{})
    print(x['uid'],x.get('readyState'),x.get('target'),m.get('githubCommitSha',''),x.get('created'))
PY
{ echo "# read $(date -u +%FT%TZ); tip $TIP; rows: uid state target githubCommitSha created(ms)"; cat "$OUT.rows"; } >"$OUT"; rm -f "$OUT.rows"
SHA=$(sed -n 2p "$OUT" | awk '{print $4}')
[ -n "$SHA" ] || { echo "unreadable: no deployment row" | tee -a "$OUT"; exit 3; }
if git -C "$WEB" merge-base --is-ancestor "$TIP" "$SHA" 2>/dev/null; then echo "contains-tip: yes (newest READY production deployment commit $SHA)" | tee -a "$OUT"; exit 0
else rc=$?; if [ $rc -eq 1 ]; then echo "contains-tip: NO (newest READY production deployment commit $SHA)" | tee -a "$OUT"; exit 1; fi; echo "unreadable: git rc=$rc (is $SHA present locally?)" | tee -a "$OUT"; exit 3; fi
