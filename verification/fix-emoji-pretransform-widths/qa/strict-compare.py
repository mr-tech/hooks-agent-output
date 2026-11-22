#!/usr/bin/env python3
"""Compare strict-probe rows at base and tip. Usage: strict-compare.py <base.jsonl> <tip.jsonl>.
A row field (load/paste/typed/inserted) is a failure when it is a non-null reason or its *Err field is set."""
import json
import sys

base = [json.loads(l) for l in open(sys.argv[1], encoding='utf-8')]
tip = [json.loads(l) for l in open(sys.argv[2], encoding='utf-8')]
assert len(base) == len(tip), (len(base), len(tip))
assert all(b['x'] == t['x'] for b, t in zip(base, tip))


def fail(r, k):
    if f'{k}Err' in r:
        return 'ERR ' + r[f'{k}Err']
    if k not in r:
        return None
    return r[k]


for k in ['load', 'paste', 'typed', 'inserted']:
    rows = [(b, t) for b, t in zip(base, tip) if k in b or k in t or f'{k}Err' in b or f'{k}Err' in t]
    fb = sum(1 for b, _ in rows if fail(b, k))
    ft = sum(1 for _, t in rows if fail(t, k))
    worse = [(b, t) for b, t in rows if not fail(b, k) and fail(t, k)]
    print(f'{k}: rows {len(rows)}; fail base {fb}; fail tip {ft}; pass at base and fail at tip {len(worse)}')
    for b, t in worse[:10]:
        print('   WORSE', json.dumps(t['x'], ensure_ascii=False), '->', fail(t, k))
    for _, t in [(b, t) for b, t in rows if fail(t, k)][:15]:
        print('   tip-fail', json.dumps(t['x'], ensure_ascii=False), '->', fail(t, k))
for k in ['loadLone', 'pasteLone', 'typedLone']:
    print(k, 'base', sum(1 for r in base if r.get(k)), 'tip', sum(1 for r in tip if r.get(k)))
for name, rs in [('base', base), ('tip', tip)]:
    d = [r['deco'] for r in rs if 'deco' in r]
    print('deco', name, 'rows', len(d), 'oob', sum(1 for x in d if x['oob']), 'split-surrogate', sum(1 for x in d if x['split']),
          'err', sum(1 for r in rs if 'decoErr' in r))
print('deco oob/split newly >0 at tip:', [t['x'] for b, t in zip(base, tip) if 'deco' in t and 'deco' in b
      and ((t['deco']['oob'] and not b['deco']['oob']) or (t['deco']['split'] and not b['deco']['split']))])
for t in tip:
    if 'mid' in t:
        print('mid', t['mid'], json.dumps(t['ins'], ensure_ascii=False), t.get('inserted') or t.get('insertedErr') or 'ok', json.dumps(t.get('children'), ensure_ascii=False))
