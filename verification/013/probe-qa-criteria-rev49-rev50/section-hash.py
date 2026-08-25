#!/usr/bin/env python3
"""
QA instrument — did any CRITERION move between plan 013 rev 49 and rev 50?

Independent of `git diff`. Extracts both committed blobs of the plan, splits each at its `## `
headers, hashes every section, and reports the section->hash maps' symmetric difference. A
criterion that moved must appear as a section whose hash changed; a section whose hash is equal
cannot contain a moved criterion, whatever the diff algorithm chose to display.

Two instruments must agree or the disagreement is the finding.
"""
import hashlib
import subprocess
import sys

PLAN = 'planning/013-components-v2-editing-surfaces.md'
A, B = sys.argv[1], sys.argv[2]

def blob(rev):
    return subprocess.run(['git', 'show', f'{rev}:{PLAN}'],
                          capture_output=True, check=True).stdout.decode('utf-8')

def sections(text):
    """Split at top-level '## ' headers; everything before the first is 'FRONTMATTER+PREAMBLE'."""
    out, name, buf = {}, 'FRONTMATTER+PREAMBLE', []
    for line in text.split('\n'):
        if line.startswith('## '):
            out[name] = out.get(name, '') + '\n'.join(buf)
            name, buf = line[3:].strip(), []
        else:
            buf.append(line)
    out[name] = out.get(name, '') + '\n'.join(buf)
    return {k: hashlib.sha256(v.encode('utf-8')).hexdigest() for k, v in out.items()}

sa, sb = sections(blob(A)), sections(blob(B))

only_a = sorted(set(sa) - set(sb))
only_b = sorted(set(sb) - set(sa))
moved = sorted(k for k in set(sa) & set(sb) if sa[k] != sb[k])
same = sorted(k for k in set(sa) & set(sb) if sa[k] == sb[k])

print(f'plan blob {A[:7]} -> {B[:7]}')
print(f'sections in {A[:7]}: {len(sa)}   sections in {B[:7]}: {len(sb)}')
print(f'SECTIONS REMOVED : {len(only_a)}  {only_a}')
print(f'SECTIONS ADDED   : {len(only_b)}  {only_b}')
print(f'SECTIONS CHANGED : {len(moved)}')
for k in moved:
    print(f'    CHANGED  {k}')
print(f'SECTIONS IDENTICAL: {len(same)}')
for k in same:
    print(f'    same     {k}')

# The criteria-bearing surface, named by predicate rather than by a list of the sections
# that happen to have moved: any section whose title names milestones, validation, acceptance,
# release conditions, scope, or the user story.
PRED = ('milestone', 'validation', 'acceptance', 'release', 'scope', 'story',
        'criteri', 'surfaces without', 'reading order')
def criteria_sections(keys):
    return sorted(k for k in keys if any(p in k.lower() for p in PRED))

ca, cb = criteria_sections(sa), criteria_sections(sb)
print()
print(f'CRITERIA-BEARING SECTIONS matching predicate {PRED}')
print(f'  in {A[:7]}: {len(ca)}')
print(f'  in {B[:7]}: {len(cb)}')
bad = [k for k in ca if k not in sb or sa[k] != sb[k]]
print(f'  OF THOSE, MOVED: {len(bad)}  {bad}')
print()
print('VERDICT:', 'NO CRITERION MOVED' if not bad and set(ca) == set(cb) else 'A CRITERION MOVED')
