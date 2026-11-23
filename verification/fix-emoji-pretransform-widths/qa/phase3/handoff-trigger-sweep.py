#!/usr/bin/env python3
"""Phase 3 step 1b enumeration for the website release of fix-emoji-pretransform-widths.

Population: every file directly under agent-output/handoff/ (closed/ excluded) whose frontmatter Status
is not terminal. Status values are printed so a non-"Open" open-like value is visible, not silently dropped.
Field: the whole Review-Trigger frontmatter value, folded/continuation lines included (any indented or
non-key line after `Review-Trigger:` up to the next top-level `Key:` line or the closing `---`).
Predicate (case-insensitive), deliberately broad; every match is then dispositioned by reading:
  P1 website            the repository in the release
  P2 push|deploy|release|production|prod\b|master|vercel   a production push / release
  P3 fix-emoji-pretransform-widths|emoji                   this chain / this verdict
  P4 phase 3|release-tip|release tip                       this verdict's kind
A file is a CANDIDATE when (P1 and P2) or P3 or P4. Files matching P1 or P2 alone are listed as NEAR
so a reader can check the predicate's edge.
Usage: python3 -I handoff-trigger-sweep.py <agent-output root>
"""
import os
import re
import sys

root = sys.argv[1]
hdir = os.path.join(root, 'handoff')
P = {
    'P1': re.compile(r'website', re.I),
    'P2': re.compile(r'push|deploy|release|production|\bprod\b|master|vercel', re.I),
    'P3': re.compile(r'fix-emoji-pretransform-widths|emoji', re.I),
    'P4': re.compile(r'phase 3|release-tip|release tip', re.I),
}
TERMINAL = {'closed', 'resolved', 'superseded', 'discharged', 'released', 'committed', 'withdrawn'}

rows = []
for name in sorted(os.listdir(hdir)):
    path = os.path.join(hdir, name)
    if not name.endswith('.md') or not os.path.isfile(path):
        continue
    lines = open(path, encoding='utf-8').read().split('\n')
    if not lines or lines[0].strip() != '---':
        rows.append((name, 'NO-FRONTMATTER', '', 'CHECK'))
        continue
    fm = []
    for ln in lines[1:]:
        if ln.strip() == '---':
            break
        fm.append(ln)
    status, trig, in_trig = '', [], False
    for ln in fm:
        m = re.match(r'^([A-Za-z][A-Za-z-]*):\s*(.*)$', ln)
        if m and not ln.startswith(' '):
            in_trig = m.group(1) == 'Review-Trigger'
            if m.group(1) == 'Status':
                status = m.group(2).strip().strip('"\'')
            if in_trig:
                trig.append(m.group(2))
        elif in_trig:
            trig.append(ln.strip())
    t = ' '.join(trig)
    hit = {k: bool(r.search(t)) for k, r in P.items()}
    if status.lower().split(' ')[0] in TERMINAL:
        cls = 'TERMINAL'
    elif (hit['P1'] and hit['P2']) or hit['P3'] or hit['P4']:
        cls = 'CANDIDATE'
    elif hit['P1'] or hit['P2']:
        cls = 'NEAR'
    else:
        cls = 'OUT'
    rows.append((name, status, t, cls + ' ' + ','.join(k for k, v in hit.items() if v)))

for name, status, t, cls in rows:
    print(f'{cls}\t{name}\tStatus={status}\tTrigger={t}')
counts = {}
for r in rows:
    k = r[3].split(' ')[0]
    counts[k] = counts.get(k, 0) + 1
print('TOTAL', len(rows), counts)
