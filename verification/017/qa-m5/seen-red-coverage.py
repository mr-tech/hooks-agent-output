#!/usr/bin/env python3
"""Seen-red coverage over the named test files: for each case in the c37d41a suite run, the QA mutants whose KILLED row
names it in failing_titles. Usage: python3 -I seen-red-coverage.py <vitest json> <kill table> [<kill table> ...]"""
import json, sys
run = json.load(open(sys.argv[1]))
files = tuple(sys.argv[2].split(","))
cases = []
for f in run['testResults']:
    if f['name'].endswith(files):
        short = f['name'].split('/src/')[1]
        for a in f['assertionResults']:
            cases.append((short, ' > '.join(a['ancestorTitles'] + [a['title']])))
hits = {c: [] for c in cases}
for t in sys.argv[3:]:
    for m in json.load(open(t))['mutants']:
        if m['outcome'] != 'KILLED':
            continue
        for title in m.get('failing_titles') or []:
            for c in cases:
                if title.endswith(c[0] + ' > ' + c[1]):
                    hits[c].append(m['id'])
red = [c for c in cases if hits[c]]
print(f'cases {len(cases)} reddened {len(red)} never reddened {len(cases) - len(red)}')
for c in cases:
    print(('RED   ' if hits[c] else 'NEVER ') + c[0].split('/')[-1].split('.')[0] + ' | ' + c[1] + (' | ' + ','.join(hits[c]) if hits[c] else ''))
