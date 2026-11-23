#!/usr/bin/env python3
"""QA Phase 3 step 1b instrument (fix-normalize-fence-loop): dump every handoff/*.md (top level, not closed/) with its
Status and its whole Review-Trigger value, folded YAML continuation lines included. Reads the frontmatter text itself
(between the first two '---' lines), no YAML library, so a folded or block scalar is joined line by line.
Usage: handoff-trigger-dump.py <agent-output root>  -> prints one block per file and a final count line."""
import pathlib
import sys

root = pathlib.Path(sys.argv[1]) / 'handoff'
files = sorted(p for p in root.glob('*.md') if p.is_file())
n_open = 0
for p in files:
    lines = p.read_text(encoding='utf-8').split('\n')
    if not lines or lines[0].strip() != '---':
        print(f'== {p.name}\n  NO-FRONTMATTER\n')
        continue
    end = next((i for i in range(1, len(lines)) if lines[i].strip() == '---'), len(lines))
    fm = lines[1:end]
    fields, key = {}, None
    for ln in fm:
        if ln[:1] not in (' ', '\t') and ':' in ln:
            key, _, val = ln.partition(':')
            key = key.strip()
            fields[key] = val.strip()
        elif key is not None:
            fields[key] = (fields[key] + ' ' + ln.strip()).strip()
    status = fields.get('Status', '?')
    if status == 'Open':
        n_open += 1
    print(f"== {p.name}\n  Status: {status}\n  Review-Trigger: {fields.get('Review-Trigger', 'MISSING')}\n")
print(f'files={len(files)} open={n_open}')
