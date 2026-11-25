#!/usr/bin/env python3
"""Tally for the qa-019 m6 fr6 mutation sweep (website 48eb60a).

Reads only the mutation-table JSON files, the mutants files and the progress files.
Subcommands:
  select <N>        write sweep/pass2-shard-<N>.mutants.json: every pass-1 row of shard N that is not KILLED
  pass1             markdown of pass 1: per file, outcome counts; score lines verbatim
  pass2             markdown of pass 2: per shard, outcome counts; score lines verbatim
  final             per file: final outcome counts (pass 2 where run, else pass 1); final SURVIVED rows
  flags             unknown-count mutants, STILLBORN/ABORTED/other rows, failed controls
  hand              every qa- hand mutant (final outcome, failing_titles)
  times             first and last progress line of each pass
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


def load_json(path):
    with open(path, encoding='utf-8') as handle:
        return json.load(handle)


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
            rows.append({'shard': int(shard), 'file': file, 'count': int(count), 'path': path, 'name': name})
    return rows


def only_table(folder):
    found = sorted(glob.glob(os.path.join(folder, 'mutation-table-*.json')))
    if len(found) != 1:
        raise SystemExit('expected one mutation table in %s, found %d' % (folder, len(found)))
    return found[0], load_json(found[0])


def records_of(row):
    return load_json(os.path.join(VER, row['path']))


def all_controls(table):
    return list(table['controls'].values())


def pass1_group(shard, row):
    return only_table(os.path.join(SWEEP, 'pass1-shard-%d' % shard, row['name']))


def pass2_tables():
    for shard in (1, 2):
        folder = os.path.join(SWEEP, 'pass2-shard-%d' % shard)
        if glob.glob(os.path.join(folder, 'mutation-table-*.json')):
            path, table = only_table(folder)
            yield shard, path, table


def cmd_select(shard):
    chosen = []
    for row in [r for r in plan_rows() if r['shard'] == shard]:
        _, table = pass1_group(shard, row)
        records = records_of(row)
        by_id = {r['id']: r for r in records}
        if len(table['mutants']) != row['count'] or len(records) != row['count']:
            raise SystemExit('count mismatch in %s: table %d, file %d, plan %d'
                             % (row['file'], len(table['mutants']), len(records), row['count']))
        for m in table['mutants']:
            if m['id'] not in by_id:
                raise SystemExit('table id not in mutants file: %s %s' % (row['file'], m['id']))
        not_killed = {m['id'] for m in table['mutants'] if m['outcome'] != 'KILLED'}
        chosen += [r for r in records if r['id'] in not_killed]
    ids = [r['id'] for r in chosen]
    dup = sorted({i for i in ids if ids.count(i) > 1})
    if dup:
        raise SystemExit('duplicate ids in shard %d: %s' % (shard, dup))
    out = os.path.join(SWEEP, 'pass2-shard-%d.mutants.json' % shard)
    with open(out, 'w', encoding='utf-8') as handle:
        json.dump(chosen, handle, indent=2, ensure_ascii=False)
        handle.write('\n')
    print('wrote %s with %d mutants' % (out, len(chosen)))


def pass1_markdown():
    lines = ['| Shard | File | Mutants | Control exits | Control s | KILLED | SURVIVED | Other |',
             '|---|---|---|---|---|---|---|---|']
    scores = []
    for row in plan_rows():
        _, table = pass1_group(row['shard'], row)
        counts = Counter(m['outcome'] for m in table['mutants'])
        ctls = all_controls(table)
        other = ', '.join('%s %d' % (k, counts.get(k, 0)) for k in KNOWN_OTHER)
        lines.append('| %d | `%s` | %d | %s | %s | %d | %d | %s |'
                     % (row['shard'], row['file'], len(table['mutants']),
                        ', '.join(str(c['exit']) for c in ctls),
                        ', '.join('%.2f' % c['seconds'] for c in ctls),
                        counts.get('KILLED', 0), counts.get('SURVIVED', 0), other))
        scores.append('%s: %s' % (row['file'], table['score']))
    print('\n'.join(lines))
    print()
    print('Score lines, verbatim from each table:')
    print('```')
    print('\n'.join(scores))
    print('```')


def pass2_markdown():
    out = []
    for shard, path, table in pass2_tables():
        mutants = table['mutants']
        counts = Counter(m['outcome'] for m in mutants)
        ctls = all_controls(table)
        other = ', '.join('%s %d' % (k, counts.get(k, 0)) for k in KNOWN_OTHER)
        out.append('### Pass 2, shard %d' % shard)
        out.append('Table: `%s`' % path)
        out.append('Mutants %d; control exits %s, control seconds %s; KILLED %d; SURVIVED %d; other: %s'
                   % (len(mutants), ', '.join(str(c['exit']) for c in ctls),
                      ', '.join('%.2f' % c['seconds'] for c in ctls), counts.get('KILLED', 0),
                      counts.get('SURVIVED', 0), other))
        out.append('Score line, verbatim: `%s`' % table['score'])
        out.append('')
    print('\n'.join(out) if out else 'No pass 2 tables present.')


def final_rows():
    """Yield (row_label, record, final_row) for every mutant of every pass-1 row, final outcome from pass 2 where run."""
    pass2 = {}
    for shard, path, table in pass2_tables():
        recs = {r['id']: r for r in load_json(os.path.join(SWEEP, 'pass2-shard-%d.mutants.json' % shard))}
        for m in table['mutants']:
            pass2[m['id']] = (shard, recs[m['id']]['file'], m)
    for row in plan_rows():
        _, table = pass1_group(row['shard'], row)
        records = {r['id']: r for r in records_of(row)}
        for m in table['mutants']:
            final = pass2.get(m['id'], (None, None, m))[2]
            yield row['file'], records[m['id']], m, final


def cell(value):
    return '-' if value is None else esc(value)


def final_markdown():
    per_file = {}
    survivors = []
    for file, rec, p1, final in final_rows():
        bucket = per_file.setdefault(file, Counter())
        bucket[final['outcome']] += 1
        if final['outcome'] == 'SURVIVED':
            survivors.append((file, rec, final))
    print('| File | Mutants | Final KILLED | Final SURVIVED | Final other |')
    print('|---|---|---|---|---|')
    total = Counter()
    for file in sorted(per_file):
        c = per_file[file]
        n = sum(c.values())
        total.update(c)
        other = n - c['KILLED'] - c['SURVIVED']
        print('| `%s` | %d | %d | %d | %d |' % (file, n, c['KILLED'], c['SURVIVED'], other))
    print('| **Total** | %d | %d | %d | %d |' % (sum(total.values()), total['KILLED'], total['SURVIVED'],
                                             sum(total.values()) - total['KILLED'] - total['SURVIVED']))
    print()
    print('Final SURVIVED (id | file | line | op | old | new):')
    print('```')
    for file, rec, final in survivors:
        print(' | '.join([esc(rec['id']), file, cell(rec.get('line')), cell(rec.get('op') or rec.get('limb')),
                          repr(rec['old']), repr(rec['new'])]))
    print('```')


def flags():
    unknown, odd, failed = [], [], []
    for row in plan_rows():
        _, table = pass1_group(row['shard'], row)
        for c in all_controls(table):
            if c['exit'] != 0:
                failed.append('pass1 %s control exit %s' % (row['file'], c['exit']))
        for m in table['mutants']:
            if m.get('count') == 'unknown':
                unknown.append('pass1 %s' % m['id'])
            if m['outcome'] not in ('KILLED', 'SURVIVED'):
                odd.append('pass1 %s %s' % (m['outcome'], m['id']))
    for shard, path, table in pass2_tables():
        for c in all_controls(table):
            if c['exit'] != 0:
                failed.append('pass2 shard %d control exit %s' % (shard, c['exit']))
        for m in table['mutants']:
            if m.get('count') == 'unknown':
                unknown.append('pass2 %s' % m['id'])
            if m['outcome'] not in ('KILLED', 'SURVIVED'):
                odd.append('pass2 %s %s' % (m['outcome'], m['id']))
    print('Mutants with count unknown:', unknown or '(none)')
    print('STILLBORN / ABORTED / other-outcome rows:', odd or '(none)')
    print('Failed controls:', failed or '(none)')


def hand_markdown():
    print('| id | file | final outcome | pass | failing_titles |')
    print('|---|---|---|---|---|')
    for file, rec, p1, final in final_rows():
        if not rec['id'].startswith('qa-'):
            continue
        stage = 'pass 2' if final is not p1 else 'pass 1'
        titles = final.get('failing_titles')
        print('| %s | `%s` | %s | %s | %s |' % (esc(rec['id']), file, final['outcome'], stage,
                                            '<br>'.join(esc(t) for t in titles) if titles else
                                            ('(none)' if titles is not None else '(null)')))


def times():
    for label, name in (('pass1 shard 1', 'pass1-shard-1.progress.txt'), ('pass1 shard 2', 'pass1-shard-2.progress.txt'),
                        ('pass2 shard 1', 'pass2-shard-1.progress.txt'), ('pass2 shard 2', 'pass2-shard-2.progress.txt')):
        path = os.path.join(SWEEP, name)
        if not os.path.exists(path):
            continue
        with open(path, encoding='utf-8') as handle:
            lines = [l.rstrip('\n') for l in handle if l.strip()]
        if lines:
            print('%s: first: %s; last: %s; lines: %d' % (label, lines[0], lines[-1], len(lines)))


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    cmd = argv[1]
    table = {'pass1': pass1_markdown, 'pass2': pass2_markdown, 'final': final_markdown, 'flags': flags,
             'hand': hand_markdown, 'times': times}
    if cmd == 'select':
        cmd_select(int(argv[2]))
    elif cmd in table:
        table[cmd]()
    else:
        print(__doc__)
        return 2
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
