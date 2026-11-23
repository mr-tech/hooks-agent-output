"""Compare implementations over the corpus.
usage: compare.py <corpus.json> <reference-name> name=kind:path [name=kind:path ...] [--diff name] [--max N]
kind: native (wasm jsonl: one {"in","out"} per line, corpus order) | sm (json with rows[{id,out}] or jsonl of {id,out})
Prints, per implementation, agreement with the reference by category in strict and loose (newline-trimmed) forms.
"""
import collections
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import norm  # noqa: E402


def load(kind, path, corpus):
    raw = open(path, encoding='utf-8').read()
    rows = {}
    if kind == 'native':
        for c, line in zip(corpus, raw.splitlines()):
            rows[c['id']] = json.loads(line)['out']
        return rows
    try:
        data = json.loads(raw)
        data = data['rows'] if isinstance(data, dict) else data
    except json.JSONDecodeError:
        data = [json.loads(l) for l in raw.splitlines() if l.strip()]
    for r in data:
        rows[r['id']] = {'__error': r['error']} if 'error' in r else r['out']
    return rows


def main():
    sys.stdout.reconfigure(errors='backslashreplace')
    args = sys.argv[1:]
    corpus = json.load(open(args[0], encoding='utf-8'))
    ref = args[1]
    impls, diff, limit = {}, None, 400
    i = 2
    while i < len(args):
        if args[i] == '--diff':
            diff = args[i + 1]; i += 2
        elif args[i] == '--max':
            limit = int(args[i + 1]); i += 2
        else:
            name, rest = args[i].split('=', 1)
            kind, path = rest.split(':', 1)
            impls[name] = (kind, load(kind, path, corpus)); i += 1
    canon = {}
    for name, (kind, rows) in impls.items():
        canon[name] = {}
        for c in corpus:
            out = rows.get(c['id'])
            if out is None or (isinstance(out, dict) and '__error' in out):
                canon[name][c['id']] = ('ERR', 'ERR')
                continue
            k = 'native' if kind == 'native' else 'sm'
            try:
                canon[name][c['id']] = (norm.canon(k, out), norm.canon(k, out, True))
            except Exception as e:  # a shape the normaliser does not know
                canon[name][c['id']] = (f'NORM-ERR {e!r}', f'NORM-ERR {e!r}')
    cats = list(dict.fromkeys(c['cat'] for c in corpus))
    for name in impls:
        if name == ref:
            continue
        strict = collections.Counter(); loose = collections.Counter(); total = collections.Counter()
        for c in corpus:
            total[c['cat']] += 1
            a, b = canon[ref][c['id']], canon[name][c['id']]
            strict[c['cat']] += a[0] == b[0]
            loose[c['cat']] += a[1] == b[1]
        n = len(corpus)
        print(f'== {name} vs {ref}: strict {sum(strict.values())}/{n}  loose {sum(loose.values())}/{n}')
        print('   ' + '  '.join(f'{k} {loose[k]}/{total[k]}' for k in cats))
    if diff:
        shown = 0
        for c in corpus:
            a, b = canon[ref][c['id']], canon[diff][c['id']]
            if a[1] != b[1] and shown < limit:
                shown += 1
                print(f'#{c["id"]} [{c["cat"]}] {json.dumps(c["text"], ensure_ascii=False)}')
                print(f'   {ref}: {a[1]}')
                print(f'   {diff}: {b[1]}')


main()
