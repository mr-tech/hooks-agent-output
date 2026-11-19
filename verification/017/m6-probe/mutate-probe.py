#!/usr/bin/env python3
"""Run mutant-gen's mutants against the generator probe, each in its own copy of an export; a mutant is KILLED when the probe reports a failed case.

Usage: python3 -I mutate-probe.py <mutants.json> <export dir> <work dir> <out dir> [--full]
  The export is copied (node_modules is shared by symlink) to <work dir>/m<N> for each mutant, the edit is applied (old text must occur exactly once in the file),
  the probe runs with --quick unless --full, and the copy is removed. A control run of the unmutated copy comes first and must report 0 failed cases.
  Output per mutant: <out dir>/<id>.out. The probe's own runner writes the JSON beside it.
"""
import json, os, re, shutil, subprocess, sys

mutants = json.load(open(sys.argv[1]))
export, work, out = (os.path.realpath(p) for p in sys.argv[2:5])
full = '--full' in sys.argv
here = os.path.dirname(os.path.realpath(__file__))
os.makedirs(work, exist_ok=True); os.makedirs(out, exist_ok=True)

def copy(dst):
    shutil.rmtree(dst, ignore_errors=True)
    shutil.copytree(export, dst, symlinks=True)

def probe(d, label):
    o = os.path.join(out, label)
    os.makedirs(o, exist_ok=True)
    args = [os.path.join(here, 'run.sh'), d, o] + ([] if full else ['--quick'])
    p = subprocess.run(args, capture_output=True, text=True, timeout=900, start_new_session=True)
    open(os.path.join(out, label + '.out'), 'w').write(p.stdout + p.stderr)
    m = re.search(r'cases (\d+), failed (\d+)', p.stdout)
    return (int(m.group(1)), int(m.group(2))) if m else (None, None)

c = os.path.join(work, 'control'); copy(c)
cases, failed = probe(c, 'control')
print('control', cases, failed)
shutil.rmtree(c, ignore_errors=True)
if failed != 0:
    sys.exit('control failed; no mutant is read')
killed = 0
for n, m in enumerate(mutants, 1):
    d = os.path.join(work, f'm{n}'); copy(d)
    path = os.path.join(d, m['file'])
    text = open(path).read()
    if text.count(m['old']) != 1:
        print(m['id'], 'NOT-APPLIED', text.count(m['old'])); shutil.rmtree(d, ignore_errors=True); continue
    open(path, 'w').write(text.replace(m['old'], m['new']))
    cases, failed = probe(d, re.sub(r'[^A-Za-z0-9_.-]', '_', m['id']))
    verdict = 'KILLED' if (failed is None or failed > 0) else 'SURVIVED'
    killed += verdict == 'KILLED'
    print(m['id'], verdict, cases, failed)
    shutil.rmtree(d, ignore_errors=True)
print(f'{killed} of {len(mutants)} mutants killed (denominator: mutants applied under a passing control)')
