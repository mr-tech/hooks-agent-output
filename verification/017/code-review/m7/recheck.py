"""Code review Round 8 (chain 017, M7-b): a second instrument beside compare.mjs, and planted controls for both.
Usage: python3 -I recheck.py <name-status> <base nofix.json> <tip nofix.json> <repo root> <compare.mjs> <out dir>
Second instrument: per (path, rule) Counter over the reports, the name-status parsed by status letter with rename/copy
mapped to the old path, every extension the tip report linted (not an extension list). Controls: three doctored tip
reports, each read back, run through BOTH instruments: a modified file +1 on a rule; an added file with one finding;
a renamed file +1 on a rule it carried at the old path."""
import collections, json, os, subprocess, sys
ns, basef, tipf, root, cmp_, out = sys.argv[1:7]
def load(f):
    r = {}
    for e in json.load(open(f)):
        r[os.path.relpath(e['filePath'], root)] = collections.Counter(m.get('ruleId') or 'parse' for m in e['messages'])
    return r
rows = [l.rstrip('\n').split('\t') for l in open(ns) if l.strip()]
def second(tip, base):
    worse, notlinted, n = [], [], 0
    for c in rows:
        s = c[0][0]
        if s == 'D': continue
        new = c[-1]; old = c[1] if s in 'RC' else new
        if new not in tip:
            if new.endswith(('.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs')): notlinted.append(new)
            continue
        n += 1
        was = collections.Counter() if s == 'A' else base.get(old, collections.Counter())
        worse += [(new, k, was[k], v) for k, v in tip[new].items() if v > was[k]]
    return n, worse, notlinted
base = load(basef); tipraw = json.load(open(tipf)); tip = load(tipf)
lines = []
n, w, nl = second(tip, base)
lines.append(f'second instrument at tip: files {n}, worse {len(w)} {w}, not-linted lintable {nl}')
pick = lambda s, pred: next(c for c in rows if c[0][0] == s and pred(c))
mod = pick('M', lambda c: c[-1].endswith('.ts') and base.get(c[-1]))
add = pick('A', lambda c: c[-1].endswith('.tsx'))
ren = pick('R', lambda c: base.get(c[1]))
for name, path, rule in [('modified+1', mod[-1], next(iter(base[mod[-1]]))), ('added-with-finding', add[-1], 'no-console'), ('renamed+1', ren[-1], next(iter(base[ren[1]])))]:
    doc = json.loads(json.dumps(tipraw))
    e = next(x for x in doc if os.path.relpath(x['filePath'], root) == path)
    k = collections.Counter(m.get('ruleId') for m in e['messages'])[rule]
    base_n = (collections.Counter() if name.startswith('added') else base[ren[1] if name.startswith('renamed') else path])[rule]
    need = base_n - k + 1
    e['messages'] += [{'ruleId': rule, 'severity': 1, 'message': 'planted', 'line': 1, 'column': 1}] * need
    p = os.path.join(out, f'control-{name}.json'); json.dump(doc, open(p, 'w'))
    back = load(p)[path][rule]
    a = subprocess.run(['node', cmp_, ns, basef, p, root], capture_output=True, text=True).stdout.splitlines()[0]
    n2, w2, _ = second(load(p), base)
    lines.append(f'control {name}: {path} {rule} base {base_n} -> planted {back} | compare.mjs: {a} | second: worse {len(w2)}')
    os.remove(p)
open(os.path.join(out, 'recheck.out'), 'w').write('\n'.join(lines) + '\n'); print('\n'.join(lines))
