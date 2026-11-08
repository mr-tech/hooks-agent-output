#!/usr/bin/env python3
"""Effort-final website kill table: joins the first pass (33 colon-free ids) and the re-run (232) mutation-run.py tables,
extracting the failing case titles from each killed run's stderr (' FAIL  |env| <file> > <case>' lines).
Usage: killtable.py <first-pass dir with out0..2> <re-run dir with out0..2>; writes website-killtable.tsv and prints counts."""
import json, glob, re, sys, collections
rows = []
for base, phase in ((sys.argv[1], 'first'), (sys.argv[2], 'rerun')):
    for k in range(3):
        t = json.load(open(glob.glob(f'{base}/out{k}/mutation-table-*.json')[0]))
        ctl = [c for c in t['controls'].values()]
        for m in t['mutants']:
            if phase == 'first' and m['outcome'] == 'ABORTED' and ':' in m['id']:
                continue  # superseded by the re-run (PATH split by ':' in the export dir)
            fails = []
            if m['outcome'] == 'KILLED' and m.get('stderr'):
                p = m['stderr'] if phase == 'rerun' else m['stderr'].replace('/wsweep/out', '/wsweep/firstpass/out')
                fails = sorted(set(re.findall(r' FAIL  \|[^|]+\| (.+)', open(p).read())))
            rows.append((m['id'], m['outcome'], m.get('count'), m.get('tests_run'), m.get('timedOut'), len(fails), ' || '.join(f[:160] for f in fails[:3]), phase, t['instruments'].get('mutants') if isinstance(t.get('instruments'), dict) else ''))
c = collections.Counter(r[1] for r in rows)
with open('website-killtable.tsv', 'w') as f:
    f.write('id\toutcome\tcount\ttests_run\ttimedOut\tfailing_cases\tfirst_three\tphase\n')
    for r in sorted(rows):
        f.write('\t'.join(str(x) for x in r[:8]) + '\n')
print(len(rows), dict(c))
