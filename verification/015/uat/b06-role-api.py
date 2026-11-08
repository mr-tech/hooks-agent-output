# B-6 fixture work through the test bot (owner's instruction). Reads the token from the credentials file; never prints it.
# Usage: python3 -I b06-role-api.py <guildId> <roleName> <memberId> [--delete]
import json, sys, urllib.request, urllib.error, pathlib, datetime
gid, rname, mid = sys.argv[1:4]; delete = '--delete' in sys.argv
raw = pathlib.Path('/home/dev/.claude-credentials/test_bot_token').read_text().strip()
try:
    t = json.loads(raw); tok = t.get('token') if isinstance(t, dict) else t
except Exception: tok = raw
def call(method, u, reason=None):
    h = {'Authorization': 'Bot ' + tok, 'User-Agent': 'DiscordBot (uat-check, 1.0)'}
    if reason: h['X-Audit-Log-Reason'] = reason
    r = urllib.request.Request('https://discord.com/api/v10' + u, method=method, headers=h)
    try:
        with urllib.request.urlopen(r) as x:
            b = x.read(); return x.status, (json.loads(b) if b else None)
    except urllib.error.HTTPError as e: return e.code, e.read()[:200].decode()
now = lambda: datetime.datetime.utcnow().strftime('%H:%M:%SZ')
s, me = call('GET', '/users/@me'); bot = me['id']; print(now(), 'bot', bot, me['username'])
s, roles = call('GET', f'/guilds/{gid}/roles'); print(now(), 'roles', s)
byid = {r['id']: r for r in roles}
s, bm = call('GET', f'/guilds/{gid}/members/{bot}'); print(now(), 'bot member', s)
if s == 200:
    perms = 0
    for rid in bm['roles'] + [gid]: perms |= int(byid[rid]['permissions'])
    print('bot roles', [byid[r]['name'] for r in bm['roles']], 'administrator', bool(perms & 8))
match = [r for r in roles if r['name'] == rname]
print('matching roles', [(r['id'], r['permissions'], 'admin' if int(r['permissions']) & 8 else 'no-admin', 'manage_guild' if int(r['permissions']) & 32 else '') for r in match])
s, m = call('GET', f'/guilds/{gid}/members/{mid}'); print(now(), 'member', s, [byid[r]['name'] for r in m['roles']] if s == 200 else m)
if delete:
    if len(match) != 1: sys.exit('refusing: expected exactly one role named ' + rname)
    s, b = call('DELETE', f"/guilds/{gid}/roles/{match[0]['id']}", 'chain 015 B-6 fixture removal'); print(now(), 'DELETE role', match[0]['id'], s, b or '')
    s, roles2 = call('GET', f'/guilds/{gid}/roles'); print(now(), 'role still present', any(r['id'] == match[0]['id'] for r in roles2))
    s, m = call('GET', f'/guilds/{gid}/members/{mid}'); print(now(), 'member roles after', [r for r in m['roles']])
