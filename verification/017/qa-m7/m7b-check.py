"""QA's second instrument for plan 017 M7-b, written independently of impl/m7/compare.mjs.

Usage: python3 -I m7b-check.py <name-status (git diff --name-status -M)> <base nofix.json> <tip nofix.json> [--plant]

Predicate: every path in the name-status list with status M, R<n> or A whose extension is .js .jsx .ts .tsx .mjs .cjs
(the lintable class; `eslint .` reports only files it lints, so a path absent from a report counts 0 everywhere).
For M the base path is the path; for R<n> the base path is the old one; for A there is no base and any finding is a
violation. D rows have no tip file and are excluded. A violation is a (file, rule) whose tip count exceeds the base count.
A message with no ruleId (a parse or fatal error) is counted under the rule "<fatal>".
--plant: three planted members, each must be reported: +1 of a rule on the first modified file, one finding on the
first added file, +1 on the first renamed file's new path. The run then prints "plants found N of 3".
"""
import json
import sys
from collections import Counter

ns_file, base_file, tip_file = sys.argv[1:4]
plant = '--plant' in sys.argv
LINT = ('.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs')


def load(path):
    out = {}
    for f in json.load(open(path)):
        p = f['filePath']
        rel = p.split('/website/', 1)[1] if '/website/' in p else p
        out[rel] = Counter(m.get('ruleId') or '<fatal>' for m in f['messages'])
    return out


base, tip = load(base_file), load(tip_file)
rows = []
for line in open(ns_file):
    parts = line.rstrip('\n').split('\t')
    st = parts[0]
    if st.startswith('R'):
        old, new = parts[1], parts[2]
    elif st in ('M', 'A'):
        old, new = (parts[1] if st == 'M' else None), parts[1]
    else:
        continue
    if new.endswith(LINT):
        rows.append((st[0], old, new))

plants = set()
if plant:
    for kind in ('M', 'A', 'R'):
        r = next((x for x in rows if x[0] == kind), None)
        if r:
            tip.setdefault(r[2], Counter())['planted-rule'] += 1
            base.setdefault(r[1], Counter()) if r[1] else None
            plants.add(r[2])

violations = []
for kind, old, new in rows:
    b = base.get(old, Counter()) if old else Counter()
    t = tip.get(new, Counter())
    for rule, n in t.items():
        if n > b.get(rule, 0):
            violations.append((kind, old, new, rule, b.get(rule, 0), n))

kinds = Counter(r[0] for r in rows)
print(f'lintable changed files: {len(rows)} (M {kinds["M"]}, A {kinds["A"]}, R {kinds["R"]}); violations: {len(violations)}')
for v in violations:
    print('VIOLATION', *v)
if plant:
    found = {v[2] for v in violations if v[3] == 'planted-rule'}
    print(f'plants found {len(found & plants)} of {len(plants)}')
