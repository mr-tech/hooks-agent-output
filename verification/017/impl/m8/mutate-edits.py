#!/usr/bin/env python3
"""Run named one-change mutants against an isolated export of the website and record which test cases fail.

Usage: python3 -I mutate.py <mutants.json> <export-dir> <out-dir>
  mutants.json: [{"name": ..., "edits": [{"file": <path under export>, "old": <text occurring exactly once in the file>, "new": <text>}, ...], "tests": [<test file>, ...]}]
  A copy of ../mutate.py for a mutant of more than one edit (an import plus its use); every edit is one unique replacement.
Each run: apply the change to the named line (the old text must occur exactly once on it), run vitest on the named test files with the
network isolated, in its own process group killed at a 180 s timeout (a timeout counts as a kill), restore the file, and write
<out-dir>/<name>.json (vitest JSON) and <out-dir>/<name>.out. Prints one line per mutant: name, exit, failed case count, survived/killed.
The export is never the shared tree; the original text is restored after every run and compared by hash.
"""
import hashlib
import json
import os
import signal
import subprocess
import sys

mutants = json.load(open(sys.argv[1]))
export, out = os.path.realpath(sys.argv[2]), os.path.realpath(sys.argv[3])
if export.startswith('/usr/local/bin/hooks/website'):
    sys.exit('refusing to mutate the shared tree')
os.makedirs(out, exist_ok=True)

for m in mutants:
    originals = {}
    for e in m['edits']:
        path = os.path.join(export, e['file'])
        originals.setdefault(path, open(path).read())
    text = dict(originals)
    bad = None
    for e in m['edits']:
        path = os.path.join(export, e['file'])
        if text[path].count(e['old']) != 1:
            bad = e
            break
        text[path] = text[path].replace(e['old'], e['new'])
    if bad:
        print(m['name'], 'SKIP: old text occurs', text[os.path.join(export, bad['file'])].count(bad['old']), 'times')
        continue
    for path, t in text.items():
        open(path, 'w').write(t)
    report = os.path.join(out, m['name'] + '.json')
    if os.path.exists(report):
        os.remove(report)
    cmd = ['unshare', '-rn', 'npx', 'vitest', 'run', '--reporter=json', '--outputFile=' + report] + m['tests']
    with open(os.path.join(out, m['name'] + '.out'), 'w') as fh:
        p = subprocess.Popen(cmd, cwd=export, stdout=fh, stderr=subprocess.STDOUT, start_new_session=True)
        try:
            code = p.wait(timeout=180)
        except subprocess.TimeoutExpired:
            os.killpg(p.pid, signal.SIGKILL)
            code = 'timeout'
    for path, t in originals.items():
        open(path, 'w').write(t)
        assert open(path).read() == t, 'restore failed'
    failed = []
    if os.path.exists(report):
        for tr in json.load(open(report))['testResults']:
            failed += [a['fullName'] for a in tr['assertionResults'] if a['status'] == 'failed']
    verdict = 'killed' if (code != 0 or failed) else 'SURVIVED'
    print(m['name'], 'exit', code, 'failed cases', len(failed), verdict)
    json.dump({'mutant': m, 'exit': code, 'failed': failed, 'verdict': verdict}, open(os.path.join(out, m['name'] + '.result.json'), 'w'), indent=1)
