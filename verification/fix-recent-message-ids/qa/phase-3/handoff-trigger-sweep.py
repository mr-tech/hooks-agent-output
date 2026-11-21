#!/usr/bin/env python3
"""List open handoff/ records (outside closed/) with their whole Review-Trigger value, folded lines included.

Usage: python3 handoff-trigger-sweep.py <record-root> <regex>
Prints one block per open handoff: path, Status, Review-Trigger (joined), and MATCH/no-match against <regex>
(case-insensitive). A handoff with no frontmatter or no Review-Trigger is printed as such, never skipped.
Bounded to frontmatter between the first two '---' lines; a Review-Trigger written in the body is not read.
"""
import glob
import os
import re
import sys

root, pattern = sys.argv[1], sys.argv[2]
rx = re.compile(pattern, re.I)
paths = sorted(p for p in glob.glob(os.path.join(root, 'handoff', '*.md')) if os.path.basename(p) != 'README.md')
total = open_count = match_count = 0
for path in paths:
    total += 1
    lines = open(path, encoding='utf-8').read().split('\n')
    if not lines or lines[0].strip() != '---':
        print(f'{path}\n  NO-FRONTMATTER\n')
        continue
    end = next((i for i in range(1, len(lines)) if lines[i].strip() == '---'), None)
    fm = lines[1:end] if end else []
    fields, key = {}, None
    for line in fm:
        m = re.match(r'^([A-Za-z][A-Za-z0-9-]*):\s?(.*)$', line)
        if m:
            key = m.group(1)
            fields[key] = m.group(2).strip()
        elif key is not None and (line.startswith(' ') or line.startswith('\t')):
            fields[key] = (fields[key] + ' ' + line.strip()).strip()
    status = fields.get('Status', '').strip().strip('"')
    if status.split(' ')[0] != 'Open':
        continue
    open_count += 1
    trig = fields.get('Review-Trigger')
    hit = bool(trig and rx.search(trig))
    match_count += hit
    print(f'{os.path.relpath(path, root)}\n  Status: {status}\n  Review-Trigger: {trig if trig is not None else "ABSENT"}\n  {"MATCH" if hit else "no-match"}\n')
print(f'handoff files read: {total}; open: {open_count}; matching /{pattern}/i: {match_count}')
