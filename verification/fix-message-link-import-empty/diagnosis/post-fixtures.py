#!/usr/bin/env python3
"""Post the diagnosis fixtures to the Claude test server (guild 1566742402180456559), #general, as the test bot and a test webhook.

Usage: python3 -I post-fixtures.py <output.json>
Fixtures (each discriminates one limb of the candidate cause):
  plain     test bot, plain content (author is not the Hooks.gg app)
  mention   test bot, content that mentions the Hooks.gg bot user (1034527356381044828), plus one rich embed
  rich      test bot, content plus one rich embed, no mention
  v2        test bot, Components V2 (flags 32768, container with a text display)
  linkembed test bot, content that is a URL Discord unfurls (a non-rich embed)
  webhook   a webhook the test bot creates in the channel, content plus one rich embed
The token is read from ~/.claude-credentials/test_bot_token and is never printed; the webhook token is never printed or written.
"""
import json, os, sys, time, urllib.request, urllib.error

GUILD = "1566742402180456559"
CHANNEL = "1566742403195469906"
HOOKS_BOT = "1034527356381044828"
API = "https://discord.com/api/v10"
TAG = "fix-message-link-import-empty diagnosis fixture"


def token():
    with open(os.path.expanduser("~/.claude-credentials/test_bot_token")) as f:
        return f.read().strip()


def call(method, path, body=None, auth=True):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(API + path, data=data, method=method)
    if auth:
        req.add_header("Authorization", "Bot " + token())
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "DiscordBot (https://hooks.gg, 1.0)")
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, json.loads(r.read() or b"null")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"null")


RICH = {"title": "Rich embed title", "description": "Rich embed description", "color": 5814783}

FIXTURES = [
    ("plain", {"content": f"{TAG}: plain content by another author"}),
    ("mention", {"content": f"{TAG}: mentions <@{HOOKS_BOT}>", "embeds": [RICH], "allowed_mentions": {"parse": []}}),
    ("rich", {"content": f"{TAG}: content with a rich embed", "embeds": [RICH]}),
    ("v2", {"flags": 32768, "components": [{"type": 17, "components": [{"type": 10, "content": f"{TAG}: Components V2 text"}]}]}),
    ("linkembed", {"content": "https://github.com/discord/discord-api-docs"}),
]


def main():
    out = {"at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "guild": GUILD, "channel": CHANNEL, "fixtures": {}}
    st, me = call("GET", "/users/@me")
    out["poster_bot"] = {"status": st, "id": me.get("id"), "username": me.get("username")}
    for name, body in FIXTURES:
        st, msg = call("POST", f"/channels/{CHANNEL}/messages", body)
        out["fixtures"][name] = {"status": st, "id": msg.get("id") if st in (200, 201) else None,
                                 "author_id": (msg.get("author") or {}).get("id") if st in (200, 201) else None,
                                 "error": None if st in (200, 201) else json.dumps(msg)[:300]}
    st, wh = call("POST", f"/channels/{CHANNEL}/webhooks", {"name": "diag-fixture-webhook"})
    if st in (200, 201):
        out["webhook"] = {"id": wh["id"], "application_id": wh.get("application_id"), "creator_id": (wh.get("user") or {}).get("id")}
        st2, msg = call("POST", f"/webhooks/{wh['id']}/{wh['token']}?wait=true",
                        {"content": f"{TAG}: webhook content with a rich embed", "embeds": [RICH]}, auth=False)
        out["fixtures"]["webhook"] = {"status": st2, "id": msg.get("id") if st2 in (200, 201) else None,
                                      "author_id": (msg.get("author") or {}).get("id") if st2 in (200, 201) else None,
                                      "webhook_id": msg.get("webhook_id") if st2 in (200, 201) else None,
                                      "error": None if st2 in (200, 201) else json.dumps(msg)[:300]}
    else:
        out["webhook"] = {"status": st, "error": json.dumps(wh)[:300]}
    with open(sys.argv[1], "w") as f:
        json.dump(out, f, indent=2)
    print(json.dumps(out, indent=2))


main()
