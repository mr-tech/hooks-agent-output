"""AN-3 / AN-7 posting (analysis 019), as the test bot to #slate-oracle-walk in the test guild. Token read from its
file, never printed. allowed_mentions parse [] so nothing pings.
usage: an3-post.py embeds <bits.json> <out.json>
       an3-post.py v2 <bits.json> <out.json>
       an3-post.py content <cases.json> <out.json>        (cases: [{id, text}])
"""
import json
import os
import sys
import time
import urllib.error
import urllib.request

CHANNEL = '1574358729577599086'
API = 'https://discord.com/api/v10'
TOKEN = open(os.path.expanduser('~/.claude-credentials/test_bot_token'), encoding='utf-8').read().strip()
NO_PING = {'parse': []}


def call(method, path, body=None):
    while True:
        req = urllib.request.Request(API + path, method=method)
        req.add_header('User-Agent', 'DiscordBot (https://example.invalid, 0.1)')
        req.add_header('Authorization', 'Bot ' + TOKEN)
        data = json.dumps(body).encode('utf-8') if body is not None else None
        if data is not None:
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


def post(body):
    body = {**body, 'allowed_mentions': NO_PING}
    status, j = call('POST', f'/channels/{CHANNEL}/messages', body)
    time.sleep(1.2)
    return status, j


def main():
    mode, src, out = sys.argv[1], sys.argv[2], sys.argv[3]
    cases = json.load(open(src, encoding='utf-8'))
    rows = []
    if mode in ('embeds', 'embeds-nourl', 'embeds-url'):
        variants = {'embeds': (False, True), 'embeds-nourl': (False,), 'embeds-url': (True,)}[mode]
        embeds = []
        for c in cases:
            for with_url in variants:
                e = {'title': c['text'], 'description': c['text'], 'fields': [{'name': c['text'], 'value': c['text']}],
                     'footer': {'text': c['text']}, 'author': {'name': c['text']}}
                if with_url:
                    e['url'] = 'https://example.com/embed-url/' + c['bit'].lower()
                embeds.append((c['bit'], with_url, e))
        for i in range(0, len(embeds), 10):
            chunk = embeds[i:i + 10]
            status, j = post({'content': f'an3 embeds {i // 10}', 'embeds': [e for _, _, e in chunk]})
            rows.append({'status': status, 'message_id': j.get('id'), 'error': None if status in (200, 201) else j,
                         'embeds': [{'bit': b, 'with_url': u, 'stored': (j.get('embeds') or [None] * 10)[k]} for k, (b, u, _) in enumerate(chunk)]})
    elif mode == 'v2':
        comps = [{'type': 10, 'content': c['text']} for c in cases]
        status, j = post({'flags': 1 << 15, 'components': comps})
        rows.append({'status': status, 'message_id': j.get('id'), 'error': None if status in (200, 201) else j,
                     'bits': [c['bit'] for c in cases], 'stored': j.get('components')})
    elif mode == 'content':
        for c in cases:
            status, j = post({'content': c['text']})
            rows.append({'id': c['id'], 'text': c['text'], 'status': status, 'message_id': j.get('id'), 'stored': j.get('content'),
                         'error': None if status in (200, 201) else j})
    json.dump(rows, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(json.dumps([{k: r[k] for k in ('status', 'message_id', 'error') if k in r} for r in rows], ensure_ascii=False)[:2000])


main()
