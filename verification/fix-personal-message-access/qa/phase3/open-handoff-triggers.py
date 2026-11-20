"""Phase 3 step 1b enumeration (the record has no tools/open-handoff-trigger-sweep.py).
Lists every handoff/*.md outside closed/ whose frontmatter Status is Open, with its whole Review-Trigger value
(folded continuation lines joined), and marks those whose trigger matches PATTERN (case-insensitive).
Usage: python3 -I open-handoff-triggers.py <record-root> <pattern> > out.tsv
Output: one line per open handoff: match(0/1) \t path \t Review-Trigger; last line: counts.
"""
import glob
import os
import re
import sys

root, pattern = sys.argv[1], sys.argv[2]
rx = re.compile(pattern, re.I)
rows = []
for path in sorted(glob.glob(os.path.join(root, 'handoff', '*.md'))):
    text = open(path, encoding='utf-8').read()
    if not text.startswith('---\n'):
        continue
    fm = text[4:text.index('\n---', 4)]
    fields, key = {}, None
    for line in fm.split('\n'):
        m = re.match(r'^([A-Za-z][A-Za-z-]*):\s?(.*)$', line)
        if m:
            key = m.group(1)
            fields[key] = m.group(2).strip()
        elif key and line.startswith((' ', '\t')):
            fields[key] += ' ' + line.strip()
    status = fields.get('Status', '').strip('"\'').split()[0] if fields.get('Status') else ''
    if status != 'Open':
        continue
    trig = fields.get('Review-Trigger', '').strip('"\'')
    rows.append((1 if rx.search(trig) else 0, os.path.relpath(path, root), trig))
for r in rows:
    print(f'{r[0]}\t{r[1]}\t{r[2]}')
print(f'# open handoffs: {len(rows)}; matching /{pattern}/i: {sum(r[0] for r in rows)}')
