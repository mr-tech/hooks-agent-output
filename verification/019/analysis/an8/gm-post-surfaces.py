"""AN-8 limb 2b (analysis 019): post one embed and one Components V2 text display carrying <@$id> through a webhook.
usage: gm-post-surfaces.py <webhook.json> <out.json>   (token read from <webhook.json>.secret, never printed)"""
import json, sys, urllib.request, urllib.error
wh = json.load(open(sys.argv[1])); tok = open(sys.argv[1] + '.secret').read().strip()
G = '<@$700136079562375258>'
bodies = {
  'embed': {'content': 'an8 2b embed', 'allowed_mentions': {'parse': []}, 'embeds': [{'title': f'title {G} t', 'description': f'desc {G} d',
            'fields': [{'name': f'fname {G} n', 'value': f'fvalue {G} v'}]}]},
  'v2': {'flags': 32768, 'allowed_mentions': {'parse': []}, 'components': [{'type': 10, 'content': f'an8 2b v2 {G} end'}]},
}
out = {}
for k, b in bodies.items():
    q = '?wait=true' + ('&with_components=true' if k == 'v2' else '')
    r = urllib.request.Request(f'https://discord.com/api/v10/webhooks/{wh["id"]}/{tok}{q}', method='POST', data=json.dumps(b).encode())
    r.add_header('Content-Type', 'application/json'); r.add_header('User-Agent', 'DiscordBot (https://example.invalid, 0.1)')
    try:
        with urllib.request.urlopen(r, timeout=30) as x: j = json.loads(x.read()); out[k] = {'status': x.status, 'message_id': j['id'], 'sent': b, 'stored_embeds': j.get('embeds'), 'stored_components': j.get('components')}
    except urllib.error.HTTPError as e: out[k] = {'status': e.code, 'error': json.loads(e.read() or b'{}')}
json.dump(out, open(sys.argv[2], 'w'), indent=1, ensure_ascii=False)
print({k: (v['status'], v.get('message_id'), v.get('error')) for k, v in out.items()})
