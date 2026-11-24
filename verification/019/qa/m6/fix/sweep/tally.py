#!/usr/bin/env python3
"""Tally for the qa-019 m6 effort-final mutation sweep.

Reads only the mutation-table JSON files, the mutants files and the progress files.
Subcommands:
  select <N>   write sweep/pass2-shard-<N>.mutants.json from the pass 1 tables of shard N
  pass1        print the pass 1 markdown (both shards)
  pass2        print the pass 2 markdown (every shard that has a pass 2 table)
  flags        print every unknown-count mutant, STILLBORN/ABORTED/other-outcome row and failed control
  times        print the start and end of each pass from the progress files
"""
import glob
import json
import os
import sys
from collections import Counter

SWEEP = os.path.dirname(os.path.abspath(__file__))
VER = '/usr/local/bin/hooks/agent-output/verification/019'
PLAN = os.path.join(SWEEP, 'plan.tsv')
KNOWN_OTHER = ('STILLBORN', 'NOT-APPLIED', 'ABORTED', 'CONTROL-FAILED')


def esc(value):
    return str(value).replace('|', '\\|').replace('\n', ' ')


def plan_rows():
    rows = []
    with open(PLAN, encoding='utf-8') as handle:
        next(handle)
        for line in handle:
            line = line.rstrip('\n')
            if not line:
                continue
            shard, file, count, path = line.split('\t')
            name = os.path.basename(path)[:-len('.mutants.json')]
            rows.append({'shard': int(shard), 'file': file, 'count': int(count),
                         'path': path, 'name': name})
    return rows


def only_table(folder):
    found = sorted(glob.glob(os.path.join(folder, 'mutation-table-*.json')))
    if len(found) != 1:
        raise SystemExit('expected one mutation table in %s, found %d' % (folder, len(found)))
    with open(found[0], encoding='utf-8') as handle:
        return found[0], json.load(handle)


def records_of(row):
    with open(os.path.join(VER, row['path']), encoding='utf-8') as handle:
        return json.load(handle)


def all_controls(table):
    return list(table['controls'].values())


def group_failed(table):
    return any(c['exit'] != 0 for c in all_controls(table))


def group_summary(row, table):
    mutants = table['mutants']
    counts = Counter(m['outcome'] for m in mutants)
    ctls = all_controls(table)
    return {
        'row': row,
        'mutants': len(mutants),
        'control_exits': [c['exit'] for c in ctls],
        'control_seconds': [c['seconds'] for c in ctls],
        'killed': counts.get('KILLED', 0),
        'survived': counts.get('SURVIVED', 0),
        'other': {name: counts.get(name, 0) for name in KNOWN_OTHER},
        'unexpected': {k: v for k, v in counts.items()
                       if k not in ('KILLED', 'SURVIVED') and k not in KNOWN_OTHER},
        'score': table['score'],
    }


def pass1_group(shard, row):
    folder = os.path.join(SWEEP, 'pass1-shard-%d' % shard, row['name'])
    path, table = only_table(folder)
    return path, table


def cmd_select(shard):
    chosen = []
    for row in [r for r in plan_rows() if r['shard'] == shard]:
        path, table = pass1_group(shard, row)
        records = records_of(row)
        by_id = {r['id']: r for r in records}
        if len(table['mutants']) != row['count'] or len(records) != row['count']:
            raise SystemExit('count mismatch in %s: table %d, file %d, plan %d'
                             % (row['file'], len(table['mutants']), len(records), row['count']))
        for m in table['mutants']:
            if m['id'] not in by_id:
                raise SystemExit('table id not in mutants file: %s %s' % (row['file'], m['id']))
        if group_failed(table):
            picked = [r['id'] for r in records]
        else:
            picked = [m['id'] for m in table['mutants'] if m['outcome'] != 'KILLED']
        for rec in records:
            if rec['id'] in picked:
                chosen.append(rec)
    ids = [r['id'] for r in chosen]
    dup = sorted({i for i in ids if ids.count(i) > 1})
    if dup:
        raise SystemExit('duplicate ids across files in shard %d (runner would refuse): %s' % (shard, dup))
    out = os.path.join(SWEEP, 'pass2-shard-%d.mutants.json' % shard)
    with open(out, 'w', encoding='utf-8') as handle:
        json.dump(chosen, handle, indent=2, ensure_ascii=False)
        handle.write('\n')
    print('wrote %s with %d mutants' % (out, len(chosen)))


def pass1_markdown():
    lines = ['| Shard | File | Mutants | Control exits | Control s | KILLED | SURVIVED | Other (count) |',
             '|---|---|---|---|---|---|---|---|']
    scores = []
    for shard in (1, 2):
        for row in [r for r in plan_rows() if r['shard'] == shard]:
            _, table = pass1_group(shard, row)
            g = group_summary(row, table)
            other = ', '.join('%s %d' % (k, v) for k, v in g['other'].items())
            if g['unexpected']:
                other += ', ' + ', '.join('%s %d' % (k, v) for k, v in g['unexpected'].items())
            lines.append('| %d | `%s` | %d | %s | %s | %d | %d | %s |'
                         % (shard, row['file'], g['mutants'],
                            ', '.join(str(x) for x in g['control_exits']),
                            ', '.join('%.2f' % x for x in g['control_seconds']),
                            g['killed'], g['survived'], other))
            scores.append('%s: %s' % (row['file'], g['score']))
    print('\n'.join(lines))
    print()
    print('Score lines, verbatim from each table:')
    print('```')
    print('\n'.join(scores))
    print('```')


def pass2_tables():
    for shard in (1, 2):
        folder = os.path.join(SWEEP, 'pass2-shard-%d' % shard)
        if not glob.glob(os.path.join(folder, 'mutation-table-*.json')):
            continue
        path, table = only_table(folder)
        yield shard, path, table


def pass2_markdown():
    out = []
    for shard, path, table in pass2_tables():
        mutants = table['mutants']
        counts = Counter(m['outcome'] for m in mutants)
        ctls = all_controls(table)
        other = ', '.join('%s %d' % (k, counts.get(k, 0)) for k in KNOWN_OTHER)
        out.append('### Pass 2, shard %d' % shard)
        out.append('')
        out.append('Table: `%s`' % path)
        out.append('')
        out.append('Mutants %d; control exits %s, control seconds %s; KILLED %d; SURVIVED %d; other: %s'
                   % (len(mutants), ', '.join(str(c['exit']) for c in ctls),
                      ', '.join('%.2f' % c['seconds'] for c in ctls), counts.get('KILLED', 0),
                      counts.get('SURVIVED', 0), other))
        out.append('')
        out.append('| id | file | outcome | tests_run | control_tests_run |')
        out.append('|---|---|---|---|---|')
        for m in mutants:
            out.append('| %s | `%s` | %s | %s | %s |' % (esc(m['id']), m['file'], m['outcome'],
                                                       m.get('tests_run'), m.get('control_tests_run')))
        out.append('')
        out.append('Score line, verbatim:')
        out.append('```')
        out.append(table['score'])
        out.append('```')
        out.append('')
    if not out:
        out.append('No pass 2 tables present.')
    print('\n'.join(out))


def pass2_not_killed_markdown():
    rows = []
    for shard, path, table in pass2_tables():
        recs = {r['id']: r for r in json.load(open(os.path.join(SWEEP, 'pass2-shard-%d.mutants.json' % shard), encoding='utf-8'))}
        for m in table['mutants']:
            if m['outcome'] != 'KILLED':
                rec = recs[m['id']]
                rows.append('%s | %s | %s | %s | %s' % (m['id'], rec['file'], rec['op'], rec['line'], rec['text']))
    print('Not KILLED after pass 2 (id | file | op | line | text):')
    print('```')
    print('\n'.join(rows) if rows else '(none)')
    print('```')


def flags():
    unknown, odd, failed = [], [], []
    for shard in (1, 2):
        for row in [r for r in plan_rows() if r['shard'] == shard]:
            _, table = pass1_group(shard, row)
            for key, c in table['controls'].items():
                if c['exit'] != 0:
                    failed.append('pass1 shard %d %s %s control exit %s' % (shard, row['file'], c.get('id'), c['exit']))
            for m in table['mutants']:
                if m.get('count') == 'unknown':
                    unknown.append('pass1 %s' % m['id'])
                if m['outcome'] in ('STILLBORN', 'ABORTED') or m['outcome'] not in ('KILLED', 'SURVIVED'):
                    odd.append('pass1 %s %s' % (m['outcome'], m['id']))
    for shard, path, table in pass2_tables():
        for c in all_controls(table):
            if c['exit'] != 0:
                failed.append('pass2 shard %d control exit %s' % (shard, c['exit']))
        for m in table['mutants']:
            if m.get('count') == 'unknown':
                unknown.append('pass2 %s' % m['id'])
            if m['outcome'] in ('STILLBORN', 'ABORTED') or m['outcome'] not in ('KILLED', 'SURVIVED'):
                odd.append('pass2 %s %s' % (m['outcome'], m['id']))
    print('Mutants with count unknown:', unknown or '(none)')
    print('STILLBORN / ABORTED / other-outcome rows:', odd or '(none)')
    print('Failed controls:', failed or '(none)')


def progress(name):
    path = os.path.join(SWEEP, name)
    if not os.path.exists(path):
        return []
    with open(path, encoding='utf-8') as handle:
        return [line.rstrip('\n') for line in handle if line.strip()]


def times():
    for label, name in (('pass1 shard 1', 'pass1-shard-1.progress.txt'),
                        ('pass1 shard 2', 'pass1-shard-2.progress.txt'),
                        ('pass2 shard 1', 'pass2-shard-1.progress.txt'),
                        ('pass2 shard 2', 'pass2-shard-2.progress.txt')):
        lines = progress(name)
        if not lines:
            continue
        print('%s: first line: %s' % (label, lines[0]))
        print('%s: last line: %s' % (label, lines[-1]))
        print('%s: lines: %d' % (label, len(lines)))


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    cmd = argv[1]
    if cmd == 'select':
        cmd_select(int(argv[2]))
    elif cmd == 'pass1':
        pass1_markdown()
    elif cmd == 'pass2':
        pass2_markdown()
    elif cmd == 'pass2-not-killed':
        pass2_not_killed_markdown()
    elif cmd == 'flags':
        flags()
    elif cmd == 'times':
        times()
    else:
        print(__doc__)
        return 2
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
