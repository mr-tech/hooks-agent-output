"""Assert a built website tree registers src/proxy.ts as a Node proxy with the expected matchers.

Usage: python3 -I check-proxy-registered.py <website tree after `next build`> [matcher ...]
Default matchers: /message /message/(.*) /preview.

Exits 0 only when all hold, else 1 with the failed checks printed:
  - no middleware.{ts,tsx,js,jsx,mjs} convention file at the root or under src/;
  - .next/server/functions-config-manifest.json lists /_middleware with runtime "nodejs";
  - its matchers' originalSource list equals the expected list, in order;
  - .next/server/middleware-manifest.json registers no edge middleware.
Read-only: it opens files and changes nothing.
"""
import json
import os
import sys

root = sys.argv[1]
expected = sys.argv[2:] or ['/message', '/message/(.*)', '/preview']
failed = []

for base in (root, os.path.join(root, 'src')):
    for ext in ('ts', 'tsx', 'js', 'jsx', 'mjs'):
        path = os.path.join(base, f'middleware.{ext}')
        if os.path.exists(path):
            failed.append(f'convention file present: {path}')

try:
    with open(os.path.join(root, '.next/server/functions-config-manifest.json'), encoding='utf-8') as f:
        fn = json.load(f).get('functions', {}).get('/_middleware')
except FileNotFoundError:
    fn = None
    failed.append('functions-config-manifest.json missing (tree not built)')
if fn is None:
    failed.append('/_middleware not registered as a function')
else:
    if fn.get('runtime') != 'nodejs':
        failed.append(f'/_middleware runtime {fn.get("runtime")!r}, expected nodejs')
    got = [m.get('originalSource') for m in fn.get('matchers', [])]
    if got != expected:
        failed.append(f'matchers {got}, expected {expected}')

try:
    with open(os.path.join(root, '.next/server/middleware-manifest.json'), encoding='utf-8') as f:
        edge = json.load(f).get('middleware', {})
    if edge:
        failed.append(f'edge middleware registered: {sorted(edge)}')
except FileNotFoundError:
    failed.append('middleware-manifest.json missing (tree not built)')

for line in failed:
    print('FAIL', line)
print('PASS' if not failed else f'{len(failed)} check(s) failed')
sys.exit(1 if failed else 0)
