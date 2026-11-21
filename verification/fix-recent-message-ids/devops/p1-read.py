#!/usr/bin/env python3
"""P-1 reader (deployment record fix-recent-message-ids, runbook row 8). Read-only.

usage: python3 p1-read.py <push-iso-utc> <scratch-dir> [window=2h]

One `vercel logs` read of the production runtime logs (CLI 66.2.0, project hooks-gg-website, scope hooks-gg, environment
production), as in verification/017/post-deploy/kit/b7-read.sh. The raw output goes to <scratch-dir> and is deleted after
counting. Prints only counts, deployment ids and timestamps: no request bodies, message text, user ids or tokens.

Prints: read exit; records in window; per deploymentId the count of session-route records (requestPath contains
/api/auth/session) with first and last timestamp; the count of records whose message contains the failure line
'ids.filter is not a function'; the count of records whose message contains 'is not a function'; and, for the records at or
after the push time, how many are on the session route (the control).
Exit 0 only if the read exited 0.
"""
import json, os, subprocess, sys

push, scratch = sys.argv[1], sys.argv[2]
window = sys.argv[3] if len(sys.argv) > 3 else "2h"
raw = os.path.join(scratch, "p1-raw.jsonl")
with open(raw, "w") as out:
    r = subprocess.run(
        ["timeout", "300", "npx", "-y", "vercel@66.2.0", "logs", "-p", "hooks-gg-website", "--scope", "hooks-gg",
         "-e", "production", "-s", window, "--json", "-n", "10000"],
        stdout=out, stderr=subprocess.DEVNULL)
print("read_exit", r.returncode)
n = 0; fail = 0; anyfn = 0; ctrl_after = 0; recs_after = 0
per = {}
for line in open(raw):
    line = line.strip()
    if not line.startswith("{"):
        continue
    d = json.loads(line)
    if d.get("type") != "log":
        continue
    x = d["data"]; n += 1
    msg = x.get("message") or ""
    ts = x.get("timestamp")
    if "ids.filter is not a function" in msg:
        fail += 1
    if "is not a function" in msg:
        anyfn += 1
    on_session = "/api/auth/session" in (x.get("requestPath") or "")
    if on_session:
        k = x.get("deploymentId")
        e = per.setdefault(k, [0, ts, ts]); e[0] += 1
        e[1] = min(e[1], ts); e[2] = max(e[2], ts)
    # timestamps are ISO-8601 UTC strings
    if ts and ts >= push:
        recs_after += 1
        if on_session:
            ctrl_after += 1
os.remove(raw)
print("records_in_window", n)
for k, (c, a, b) in sorted(per.items(), key=lambda kv: kv[1][1]):
    print("session_route deploymentId", k, "count", c, "first", a, "last", b)
print("failure_line_count", fail)
print("any_is_not_a_function_count", anyfn)
print("records_at_or_after_push", recs_after, "of_which_session_route", ctrl_after)
sys.exit(r.returncode)
