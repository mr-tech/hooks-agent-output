"""AN-7 estate setup (analysis 019): one custom emoji and one guild command in the test guild, as the test bot."""
import base64, json, os, struct, sys, zlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util
spec = importlib.util.spec_from_file_location('p', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'an3-post.py'))
G = '1566742402180456559'; APP = '1558266761101447248'
def png(w=32, h=32):
    raw = b''.join(b'\x00' + bytes([200, 60, 60, 255]) * w for _ in range(h))
    chunk = lambda t, d: struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(raw)) + chunk(b'IEND', b'')
import urllib.request, urllib.error, time
TOKEN = open(os.path.expanduser('~/.claude-credentials/test_bot_token')).read().strip()
def call(m, p, b):
    r = urllib.request.Request('https://discord.com/api/v10' + p, method=m, data=json.dumps(b).encode())
    r.add_header('Authorization', 'Bot ' + TOKEN); r.add_header('Content-Type', 'application/json'); r.add_header('User-Agent', 'DiscordBot (https://example.invalid, 0.1)')
    try:
        with urllib.request.urlopen(r, timeout=30) as x: return x.status, json.loads(x.read())
    except urllib.error.HTTPError as e: return e.code, json.loads(e.read() or b'{}')
s1, e = call('POST', f'/guilds/{G}/emojis', {'name': 'slate_oracle', 'image': 'data:image/png;base64,' + base64.b64encode(png()).decode()})
s2, c = call('POST', f'/applications/{APP}/guilds/{G}/commands', {'name': 'slateping', 'description': 'analysis 019 mention target (no handler)', 'type': 1})
out = {'emoji': {'status': s1, 'id': e.get('id'), 'name': e.get('name'), 'error': None if s1 < 300 else e}, 'command': {'status': s2, 'id': c.get('id'), 'name': c.get('name'), 'error': None if s2 < 300 else c}}
json.dump(out, open(sys.argv[1], 'w'), indent=1); print(json.dumps(out))
