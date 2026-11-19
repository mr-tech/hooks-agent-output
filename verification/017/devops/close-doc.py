#!/usr/bin/env python3
"""close-doc.py — builds the record-edit.js edits for ONE stage document of chain 017 (devops Stage 1 step 8,
record-closure steps 1-3). It writes NO record document: the edits go to a JSON file and are applied by
`node ~/.claude/tools/record-edit.js <doc> <edits.json>`, the one scripted form the lifecycle permits.

usage: python3 -I close-doc.py <doc> <edits.json> [--phase header|resume|all] [--rnum R-62]
  header : Status -> Committed, Status-Detail (double-quoted, no inner double quote), one changelog row
  resume : the '## Resumption State' section (heading to next '## ' or EOF) -> one closing line
  all    : both (default). Every stamp is `{now}`, taken by record-edit at the write.
"""
import re, sys, json

path, out = sys.argv[1], sys.argv[2]
phase = sys.argv[sys.argv.index('--phase') + 1] if '--phase' in sys.argv else 'all'
rnum = sys.argv[sys.argv.index('--rnum') + 1] if '--rnum' in sys.argv else None
who = 'devops-hooks-017'
detail = ("Committed at release identifier chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) "
          "by devops Stage 1 at {now}Z; closed. Anchor fields above keep the values the document was written at. "
          "Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md.")
assert '"' not in detail
text = open(path, encoding='utf-8').read()
lines = text.split('\n')
edits = []

if phase in ('header', 'all'):
    assert lines[0] == '---'
    end = lines.index('---', 1)
    fm = lines[:end]
    si = [i for i, l in enumerate(fm) if l.startswith('Status:')]
    assert len(si) == 1, path
    di = [i for i, l in enumerate(fm) if l.startswith('Status-Detail:')]
    if di:
        i = di[0]
        v = fm[i][len('Status-Detail:'):].strip()
        assert v.startswith('"') and v.endswith('"') and len(v) > 1, 'multi-line Status-Detail: ' + path
        if i + 1 < len(fm):
            assert re.match(r'^[A-Za-z-]+:', fm[i + 1]), 'continued Status-Detail: ' + path
        edits.append({'old': '\n' + fm[si[0]] + '\n', 'new': '\nStatus: Committed\n'})
        edits.append({'old': '\n' + fm[i] + '\n', 'new': '\nStatus-Detail: "%s"\n' % detail})
    else:
        edits.append({'old': '\n' + fm[si[0]] + '\n', 'new': '\nStatus: Committed\nStatus-Detail: "%s"\n' % detail})
    ci = [i for i, l in enumerate(lines) if l.strip() == '## Changelog']
    assert len(ci) == 1, 'changelog heading: ' + path
    j = ci[0] + 1
    while not lines[j].startswith('|'):
        j += 1
    hdr = lines[j]
    ncols = hdr.strip().strip('|').count('|') + 1
    k = j
    while k + 1 < len(lines) and lines[k + 1].startswith('|'):
        k += 1
    summ = ('Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog '
            '(website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2.')
    if ncols == 3:
        cells = ['{now}', who, summ]
    elif ncols == 4 and hdr.split('|')[2].strip().lower() == 'rev':
        assert rnum, 'plan row needs --rnum'
        cells = ['{now}', rnum, who, summ]
    elif ncols == 4:
        cells = ['{now}', who + ' (Stage 1)', 'Document closed', summ]
    else:
        raise SystemExit('unexpected changelog columns %d: %s' % (ncols, path))
    edits.append({'old': lines[k], 'new': lines[k] + '\n| ' + ' | '.join(cells) + ' |'})

if phase in ('resume', 'all'):
    ri = [i for i, l in enumerate(lines) if l.startswith('## Resumption State')]
    assert len(ri) <= 1, path
    if ri:
        i = ri[0]
        e = i + 1
        while e < len(lines) and not lines[e].startswith('## '):
            e += 1
        old = '\n'.join(lines[i:e]).rstrip('\n')
        edits.append({'old': old, 'new': '## Resumption State\n\nClosed at devops Stage 1 ({now}Z); nothing resumes from this document.'})

json.dump(edits, open(out, 'w'))
print('edits', len(edits), 'for', path, phase)
