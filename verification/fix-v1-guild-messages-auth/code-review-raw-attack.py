#!/usr/bin/env python3
"""Raw-socket attack on the v1 guild-messages key guard (code review, fix-v1-guild-messages-auth).

Usage: python3 -I code-review-raw-attack.py <port> <server-log-path> <mode>
  mode = keyed    server started with STATBOT_API_KEY=probe-key
  mode = nokey    server started with STATBOT_API_KEY unset
  mode = emptykey server started with STATBOT_API_KEY='' (empty)

Runs only against 127.0.0.1. The database must be a dead port, so a handler that gets past the
guard announces itself by reaching for the database: status 500 plus a connection error in the
server log. Requests are written byte-for-byte to a socket: nothing normalises the request target,
the header names, their order, or duplicates.

Oracle, fixed before the run:
  BREACH  = a request WITHOUT the exact credential that gets 200, 405, 500, or the handler's own
            400 (a Zod rejection is past the guard), or whose window adds a DB connection error
            to the server log.
  ACCEPT  = the positive control (exact `Bearer probe-key`, keyed mode) must reach the DB: 500
            and a connection error logged. If it does not, the oracle is blind and the run is void.

Blind spots: a handler that hangs (status 'none' after the 20 s socket timeout) is past the guard
but is classed 'held'; side effects other than the database are not observed. Calibrated on
website f2c85f5 (62/100 breach) and c8c3d70 (0/100) only.
"""
import os
import re
import socket
import sys
import time

PORT = int(sys.argv[1])
LOG = sys.argv[2]
MODE = sys.argv[3]
G = '123456789012345678'
KEY = 'probe-key'
LIST = f'/api/v1/guilds/{G}/messages'
ONE = f'/api/v1/guilds/{G}/messages/1'
DB_ERR = re.compile(r'ECONNREFUSED|AggregateError|connect ECONN|Connection terminated|getaddrinfo')


def send(raw: bytes, timeout=20.0):
    s = socket.create_connection(('127.0.0.1', PORT), timeout=timeout)
    s.sendall(raw)
    chunks = []
    try:
        while True:
            b = s.recv(65536)
            if not b:
                break
            chunks.append(b)
    except socket.timeout:
        chunks.append(b'<<timeout>>')
    s.close()
    data = b''.join(chunks)
    m = re.match(rb'HTTP/1\.[01] (\d{3})', data)
    status = m.group(1).decode() if m else 'none'
    body = data.split(b'\r\n\r\n', 1)[1] if b'\r\n\r\n' in data else b''
    return status, len(body), data[:200]


def log_size():
    return os.path.getsize(LOG)


def log_delta(start):
    with open(LOG, 'rb') as f:
        f.seek(start)
        return f.read().decode('utf-8', 'replace')


def req(method, target, headers):
    lines = [f'{method} {target} HTTP/1.1', f'Host: 127.0.0.1:{PORT}', 'Connection: close']
    lines += headers
    return ('\r\n'.join(lines) + '\r\n\r\n').encode('latin-1')


def case(label, raw, expect_accept=False):
    start = log_size()
    status, blen, head = send(raw)
    time.sleep(0.4)
    delta = log_delta(start)
    db = bool(DB_ERR.search(delta))
    handler_past_guard = status in ('200', '405', '500') or db
    if expect_accept:
        verdict = 'CONTROL-OK' if (status == '500' and db) else 'CONTROL-BLIND'
    else:
        verdict = 'BREACH' if handler_past_guard else 'held'
    print(f'{verdict:13} {status:4} body={blen:<4} db_err={int(db)} {label}')
    return verdict


auth_variants = [
    ('no Authorization', []),
    ('Bearer <wrong>', ['Authorization: Bearer not-the-key']),
    ('Bearer <empty>', ['Authorization: Bearer ']),
    ('Bearer (no space)', ['Authorization: Bearer']),
    ('lowercase scheme', [f'Authorization: bearer {KEY}']),
    ('uppercase scheme', [f'Authorization: BEARER {KEY}']),
    ('double space', [f'Authorization: Bearer  {KEY}']),
    ('tab separator', [f'Authorization: Bearer\t{KEY}']),
    ('key prefix', [f'Authorization: Bearer {KEY[:-1]}']),
    ('key + suffix', [f'Authorization: Bearer {KEY}x']),
    ('key uppercased', [f'Authorization: Bearer {KEY.upper()}']),
    ('bare key', [f'Authorization: {KEY}']),
    ('Basic key', [f'Authorization: Basic {KEY}']),
    ('Bearer undefined', ['Authorization: Bearer undefined']),
    ('Bearer null', ['Authorization: Bearer null']),
    ('key in Proxy-Authorization', [f'Proxy-Authorization: Bearer {KEY}']),
    ('key in X-Authorization', [f'X-Authorization: Bearer {KEY}']),
    ('dup: wrong then right', ['Authorization: Bearer nope', f'Authorization: Bearer {KEY}']),
    ('comma list', [f'Authorization: Bearer nope, Bearer {KEY}']),
    ('NUL inside', [f'Authorization: Bearer {KEY}\x00']),
    ('obs-fold continuation', ['Authorization: Bearer', f' {KEY}']),
]

methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

targets = [
    LIST, ONE,
    LIST + '/', ONE + '/',
    '/' + LIST, LIST.replace('/guilds/', '//guilds/'),
    f'/api/v1/guilds/{G}/./messages', f'/api/v1/guilds/{G}/x/../messages',
    f'/api/v1/guilds/{G}/%6dessages', f'/api/v1/guilds/{G}%2fmessages',
    f'/api/v1/guilds/{G}/messages/%31', LIST + '?guildId=1', LIST + '#frag',
    LIST.replace('/api/', '/API/'), LIST + '.json',
    f'http://127.0.0.1:{PORT}{LIST}', f'http://evil.example{LIST}',
    LIST + '?extra=1', '/api/v1/guilds/abc/messages', ONE.replace('/1', '/x'),
]

print(f'mode={MODE}')
results = []
if MODE == 'keyed':
    for t in (LIST, ONE):
        results.append(case(f'CONTROL GET {t} exact Bearer key',
                            req('GET', t, [f'Authorization: Bearer {KEY}']), expect_accept=True))
        results.append(case(f'CONTROL GET {t} name AUTHORIZATION, trailing OWS',
                            req('GET', t, [f'AUTHORIZATION: Bearer {KEY}  ']), expect_accept=True))
    for t in (LIST, ONE):
        for label, h in auth_variants:
            results.append(case(f'GET {t} {label}', req('GET', t, h)))
    for t in (LIST, ONE):
        for m in methods:
            results.append(case(f'{m} {t} unauthenticated', req(m, t, [])))
    for t in targets:
        results.append(case(f'GET target {t!r} unauthenticated', req('GET', t, [])))
        results.append(case(f'GET target {t!r} wrong bearer', req('GET', t, ['Authorization: Bearer nope'])))
else:
    for t in (LIST, ONE):
        for label, h in [('no Authorization', []),
                         ('Bearer undefined', ['Authorization: Bearer undefined']),
                         ('Bearer <empty>', ['Authorization: Bearer ']),
                         ('Bearer (no space)', ['Authorization: Bearer']),
                         ('Bearer probe-key', [f'Authorization: Bearer {KEY}']),
                         ('Bearer null', ['Authorization: Bearer null'])]:
            results.append(case(f'GET {t} {label}', req('GET', t, h)))

n_breach = results.count('BREACH')
n_blind = results.count('CONTROL-BLIND')
print(f'SUMMARY mode={MODE} cases={len(results)} breach={n_breach} control_blind={n_blind}')
sys.exit(1 if (n_breach or n_blind) else 0)
