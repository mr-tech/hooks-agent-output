#!/usr/bin/env python3
"""Post the post-deploy row's fixture messages to the Claude test server (guild 1566742402180456559) as the test bot.

Usage: python3 -I post-test-messages.py <list|post> [channel_id]
  list  : GET the guild's text channels (id, name) -- read only.
  post  : POST exactly two messages to <channel_id>: one classic message with content, one Components V2 message
          (flags 32768, a container holding one text display). Prints ids and the Discord link of each; never the token.
The token is read from ~/.claude-credentials/test_bot_token and is never printed.
"""
import json, os, sys, urllib.request, urllib.error

GUILD = "1566742402180456559"
API = "https://discord.com/api/v10"


def token():
    with open(os.path.expanduser("~/.claude-credentials/test_bot_token")) as f:
        return f.read().strip()


def call(method, path, body=None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(API + path, data=data, method=method)
    req.add_header("Authorization", "Bot " + token())
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "DiscordBot (https://hooks.gg, 1.0)")
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, json.loads(r.read() or b"null")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"null")


def main():
    mode = sys.argv[1]
    if mode == "list":
        st, chans = call("GET", f"/guilds/{GUILD}/channels")
        print("status", st)
        if st == 200:
            for c in chans:
                if c["type"] == 0:
                    print(c["id"], c["name"])
        return
    channel = sys.argv[2]
    classic = {"content": "fix-import-save-conflict post-deploy fixture: classic message with content"}
    v2 = {
        "flags": 32768,
        "components": [
            {"type": 17, "components": [
                {"type": 10, "content": "fix-import-save-conflict post-deploy fixture: Components V2 message"}
            ]}
        ],
    }
    for name, body in (("classic", classic), ("v2", v2)):
        st, msg = call("POST", f"/channels/{channel}/messages", body)
        if st in (200, 201):
            print(name, "status", st, "message_id", msg["id"], "link", f"https://discord.com/channels/{GUILD}/{channel}/{msg['id']}")
        else:
            print(name, "status", st, json.dumps(msg)[:300])


main()
