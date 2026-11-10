#!/usr/bin/env python3
"""Mutation sweep of the record entrypoints against tools/recordEntrypoints.test.js.

Usage: python3 -I sweep.py <source-clone> <mutants.json> <work-dir> <out-dir>

<source-clone> is a scratch clone of the record checked out at the swept SHA. For the control and for each
mutant the clone is copied whole (with .git, since the suite clones its own record), the mutant's "old" text
(required exactly once) is replaced by "new" in the copy's working tree, and the suite runs network-isolated
(unshare -rn) in a new session under a 240 s kill timeout, its output written to files in <out-dir>.
The suite copies the working-tree entrypoints and baseline into its own clone, so a working-tree mutation is
what it tests. Writes <out-dir>/kill-table.json: per run, exit code, executed and failed counts, failing titles.
"""
import json, os, re, shutil, signal, subprocess, sys

src, mutants_path, work, out = sys.argv[1:5]
mutants = json.load(open(mutants_path))
os.makedirs(work, exist_ok=True)
os.makedirs(out, exist_ok=True)


def run(name, mutant):
    d = os.path.join(work, name)
    shutil.rmtree(d, ignore_errors=True)
    shutil.copytree(src, d, symlinks=True)
    if mutant:
        p = os.path.join(d, mutant['file'])
        text = open(p, encoding='utf8').read()
        n = text.count(mutant['old'])
        if n != 1:
            shutil.rmtree(d, ignore_errors=True)
            return {'run': name, 'outcome': 'NOT-APPLIED', 'occurrences': n}
        open(p, 'w', encoding='utf8').write(text.replace(mutant['old'], mutant['new']))
    so = open(os.path.join(out, name + '.stdout'), 'w')
    se = open(os.path.join(out, name + '.stderr'), 'w')
    proc = subprocess.Popen(['unshare', '-rn', 'node', '--test', 'tools/recordEntrypoints.test.js'],
                            cwd=d, stdout=so, stderr=se, stdin=subprocess.DEVNULL, start_new_session=True)
    timed_out = False
    try:
        rc = proc.wait(timeout=240)
    except subprocess.TimeoutExpired:
        timed_out = True
        rc = None
    try:
        os.killpg(proc.pid, signal.SIGKILL)
    except ProcessLookupError:
        pass
    so.close(); se.close()
    body = open(os.path.join(out, name + '.stdout'), encoding='utf8').read()
    tests = re.search(r'^ℹ tests (\d+)$', body, re.M)
    fail = re.search(r'^ℹ fail (\d+)$', body, re.M)
    failing = sorted(set(re.findall(r'^  ✖ (.+?) \(\d', body, re.M)))
    shutil.rmtree(d, ignore_errors=True)
    return {'run': name, 'exit': rc, 'timed_out': timed_out,
            'tests': int(tests.group(1)) if tests else None,
            'fail': int(fail.group(1)) if fail else None, 'failing': failing}


rows = [dict(run('control', None), id='control')]
for i, m in enumerate(mutants, 1):
    r = run(f'mutant-{i}', m)
    r.update(id=m['id'], file=m['file'])
    ctl = rows[0]
    if r.get('outcome') != 'NOT-APPLIED':
        if r['timed_out']:
            r['outcome'] = 'KILLED (timeout)'
        elif r['exit'] == 0:
            r['outcome'] = 'SURVIVED'
        elif r['tests'] == ctl['tests']:
            r['outcome'] = 'KILLED'
        else:
            r['outcome'] = 'ABORTED (count mismatch)'
    rows.append(r)
    print(r['id'], r['outcome'], r.get('failing'), flush=True)
json.dump(rows, open(os.path.join(out, 'kill-table.json'), 'w'), indent=1, ensure_ascii=False)
print('control', rows[0]['exit'], rows[0]['tests'], rows[0]['fail'])
