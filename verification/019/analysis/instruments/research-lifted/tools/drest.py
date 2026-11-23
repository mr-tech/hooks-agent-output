"""Discord REST helper for the test server walk. The bot token is read from its file and never printed.

usage:
  drest.py channel <name> <topic>                    -> prints the new channel's id
  drest.py post <channel_id> <cases.json> <out.json> -> posts one message per case, writes [{id, text, message_id, stored}]
  drest.py webhook <channel_id> <name> <out.json>    -> creates a webhook, writes {id, name} and the token to <out.json>.secret
  drest.py whpost <webhook.json> <cases.json> <out.json>
  drest.py get <path>                                -> GET, prints JSON
cases.json: [{id, text}, ...]
"""
import json
import os
import sys
import time
import urllib.error
import urllib.request

GUILD = '1566742402180456559'
API = 'https://discord.com/api/v10'
TOKEN = open(os.path.expanduser('~/.claude-credentials/test_bot_token'), encoding='utf-8').read().strip()
NO_PING = {'parse': []}


def call(method, path, body=None, auth=True):
    while True:
        req = urllib.request.Request(API + path, method=method)
        req.add_header('User-Agent', 'DiscordBot (https://example.invalid, 0.1)')
        if auth:
            req.add_header('Authorization', 'Bot ' + TOKEN)
        data = None
        if body is not None:
            data = json.dumps(body).encode('utf-8')
            req.add_header('Content-Type', 'application/json')
        try:
            with urllib.request.urlopen(req, data=data, timeout=30) as r:
                raw = r.read()
                return r.status, (json.loads(raw) if raw else {})
        except urllib.error.HTTPError as e:
            raw = e.read()
            try:
                j = json.loads(raw)
            except ValueError:
                j = {'raw': raw[:200].decode('utf-8', 'replace')}
            if e.code == 429:
                time.sleep(float(j.get('retry_after', 1)) + 0.25)
                continue
            return e.code, j


def post_cases(send, cases, out):
    rows = []
    for c in cases:
        status, j = send({'content': c['text'], 'allowed_mentions': NO_PING})
        row = {'id': c['id'], 'text': c['text'], 'status': status}
        if status in (200, 201):
            row['message_id'] = j['id']
            row['stored'] = j['content']
        else:
            row['error'] = {k: j.get(k) for k in ('code', 'message', 'errors')}
        rows.append(row)
        json.dump(rows, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
        time.sleep(1.1)
    ok = sum(1 for r in rows if 'message_id' in r)
    print(f'posted {ok} of {len(rows)}; trimmed-or-changed {sum(1 for r in rows if r.get("stored", r["text"]) != r["text"])}')


def main():
    cmd = sys.argv[1]
    if cmd == 'channel':
        status, j = call('POST', f'/guilds/{GUILD}/channels', {'name': sys.argv[2], 'type': 0, 'topic': sys.argv[3]})
        print(status, j.get('id'), j.get('name'), j.get('message', ''))
    elif cmd == 'post':
        cases = json.load(open(sys.argv[3], encoding='utf-8'))
        post_cases(lambda b: call('POST', f'/channels/{sys.argv[2]}/messages', b), cases, sys.argv[4])
    elif cmd == 'webhook':
        status, j = call('POST', f'/channels/{sys.argv[2]}/webhooks', {'name': sys.argv[3]})
        if status == 200:
            json.dump({'id': j['id'], 'name': j['name'], 'channel_id': j['channel_id']}, open(sys.argv[4], 'w'))
            fd = os.open(sys.argv[4] + '.secret', os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
            os.write(fd, j['token'].encode())
            os.close(fd)
        print(status, j.get('id'), j.get('name'), j.get('message', ''))
    elif cmd == 'whpost':
        wh = json.load(open(sys.argv[2]))
        tok = open(sys.argv[2] + '.secret').read().strip()
        cases = json.load(open(sys.argv[3], encoding='utf-8'))
        post_cases(lambda b: call('POST', f'/webhooks/{wh["id"]}/{tok}?wait=true', b, auth=False), cases, sys.argv[4])
    elif cmd == 'get':
        status, j = call('GET', sys.argv[2])
        print(status)
        print(json.dumps(j, ensure_ascii=False, indent=1)[:6000])


main()
