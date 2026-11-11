#!/usr/bin/env python3
"""Re-send corpus.json to Discord in the agents' test server only, and record each status.

Plan 016 AC1-1: the reconstructed bodies are confirmed against Discord before anything relies on
them. Sender: the existing user-created webhook "Spidey Bot" in #general of the agents' test
server (the research's sender for runs 2 to 4; F-11 found both webhook kinds identical). Its id and
token are read through the test bot and held in memory only; nothing secret is printed or written.

Guards, in order, each fatal: the channel's guild_id is the test server's; exactly one webhook
named "Spidey Bot" with application_id null exists in that channel. Every 200 is deleted through
the same webhook at once. Sends are 1.5 s apart; a 429 waits retry_after and is counted.

Usage: python3 -I resend.py corpus.json research-table.json out.json [set]
  set, if given, sends only the corpus members of that set (e.g. qa-extra-2).
"""
import json
import sys
import time
import urllib.error
import urllib.request

GUILD = "1566742402180456559"
CHANNEL = "1566742403195469906"
API = "https://discord.com/api/v10"
UA = "DiscordBot (https://hooks.gg, 1.0) plan-016-corpus-resend"
TOKEN_FILE = "/home/dev/.claude-credentials/test_bot_token"

corpus_path, rt_path, out_path = sys.argv[1:4]
corpus = json.load(open(corpus_path, encoding="utf-8"))
if len(sys.argv) > 4:
    corpus = [c for c in corpus if c["set"] == sys.argv[4]]
rt = json.load(open(rt_path, encoding="utf-8"))
rows, ebodies = rt["rows"], rt["error_bodies"]
bot = open(TOKEN_FILE, encoding="utf-8").read().strip()


def call(method, url, body=None, auth=True):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("User-Agent", UA)
    if data is not None:
        req.add_header("Content-Type", "application/json")
    if auth:
        req.add_header("Authorization", f"Bot {bot}")
    retries = 0
    while True:
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                raw = r.read()
                return r.status, (json.loads(raw) if raw else None), retries
        except urllib.error.HTTPError as e:
            raw = e.read()
            js = json.loads(raw) if raw else None
            if e.code == 429:
                retries += 1
                time.sleep(float((js or {}).get("retry_after", 2)) + 0.25)
                continue
            return e.code, js, retries


st, ch, _ = call("GET", f"{API}/channels/{CHANNEL}")
assert st == 200 and ch.get("guild_id") == GUILD, "channel guard failed"
st, hooks, _ = call("GET", f"{API}/channels/{CHANNEL}/webhooks")
assert st == 200
spidey = [h for h in hooks if h.get("name") == "Spidey Bot" and h.get("application_id") is None]
assert len(spidey) == 1, f"expected one user-created Spidey Bot, found {len(spidey)}"
wid, wtok = spidey[0]["id"], spidey[0]["token"]
hook_names_before = sorted(h.get("name") for h in hooks)

results = []
total_retries = 0
deleted = 0
started = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
for c in corpus:
    st, js, rtr = call("POST", f"{API}/webhooks/{wid}/{wtok}?wait=true&with_components=true",
                       c["body"], auth=False)
    total_retries += rtr
    rec = {"id": c["id"], "set": c["set"], "status": st,
           "discord": "accepted" if st == 200 else "refused"}
    if st == 200:
        dst, _, rtr = call("DELETE", f"{API}/webhooks/{wid}/{wtok}/messages/{js['id']}", auth=False)
        total_retries += rtr
        rec["deleted"] = dst
        deleted += dst == 204
    else:
        rec["error_body"] = json.dumps(js)
    if c["set"] == "research":
        r = rows[c["id"]]
        rec["research_discord"] = r["discord"]
        rec["verdict_match"] = rec["discord"] == r["discord"]
        if r["error_ref"]:
            rec["research_error_ref"] = r["error_ref"]
            rec["error_body_identical"] = rec.get("error_body") == ebodies[r["error_ref"]]
    results.append(rec)
    time.sleep(1.5)
ended = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

st, hooks, _ = call("GET", f"{API}/channels/{CHANNEL}/webhooks")
hook_names_after = sorted(h.get("name") for h in hooks) if st == 200 else None

research = [r for r in results if r["set"] == "research"]
summary = {
    "started": started, "ended": ended, "sender": "user-created webhook 'Spidey Bot', #general",
    "requests": len(results), "accepted": sum(r["status"] == 200 for r in results),
    "deleted_204": deleted, "retries_429": total_retries,
    "research_cases": len(research),
    "research_verdict_match": sum(r["verdict_match"] for r in research),
    "research_refused_with_identical_error_body": sum(r.get("error_body_identical") is True for r in research),
    "research_refused": sum(r["research_discord"] == "refused" for r in research),
    "webhooks_before": hook_names_before, "webhooks_after": hook_names_after,
}
json.dump({"summary": summary, "results": results}, open(out_path, "w", encoding="utf-8"), indent=1)
print(json.dumps(summary))
bad = [r["id"] for r in research if not r["verdict_match"] or r.get("error_body_identical") is False]
print("research cases differing (verdict or error body):", bad)
