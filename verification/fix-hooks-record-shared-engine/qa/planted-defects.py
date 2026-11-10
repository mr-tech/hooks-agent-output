#!/usr/bin/env python3
"""Does the new check still fail on a planted defect of each class it claims to check?

Usage: python3 -I planted-defects.py <record> <sha> <scratch-dir> <out-dir>

A clone of <record> at <sha> is the control. For each plant a fresh copy of the clone gets the plant, committed
in the copy (the engine reads tracked files), and `node tools/check-repo.js` runs network-isolated. A plant is
CAUGHT when the run exits non-zero and its output carries a failure line naming the planted path that the
control's output does not; ALLOWED when nothing new appears (the expected outcome only where marked).
"""
import json, os, shutil, subprocess, sys

rec, sha, scratch, out = sys.argv[1:5]
os.makedirs(out, exist_ok=True)
base = os.path.join(scratch, 'plant-base')
shutil.rmtree(base, ignore_errors=True)
subprocess.run(['git', 'clone', '--quiet', '--no-hardlinks', rec, base], check=True)
subprocess.run(['git', '-C', base, 'checkout', '--quiet', sha], check=True)
ENV = {**os.environ, 'GIT_AUTHOR_NAME': 'p', 'GIT_AUTHOR_EMAIL': 'p@example.invalid',
       'GIT_COMMITTER_NAME': 'p', 'GIT_COMMITTER_EMAIL': 'p@example.invalid'}


def check(d):
    r = subprocess.run(['unshare', '-rn', 'node', 'tools/check-repo.js'], cwd=d, capture_output=True, text=True, timeout=240)
    return r.returncode, r.stdout + r.stderr


def rd(d, p):
    return open(os.path.join(d, p), encoding='utf8').read()


def wr(d, p, t):
    os.makedirs(os.path.dirname(os.path.join(d, p)) or d, exist_ok=True)
    open(os.path.join(d, p), 'w', encoding='utf8').write(t)


def append_link(p, target):
    return lambda d: wr(d, p, rd(d, p) + f'\nSee [planted]({target}).\n')


def copy(src, dst):
    return lambda d: wr(d, dst, rd(d, src))


def sub(p, old, new):
    def f(d):
        t = rd(d, p)
        assert t.count(old) == 1, (p, old)
        wr(d, p, t.replace(old, new))
    return f


PLANTS = [
    ('P1 broken link, open chain document', 'implementation/fix-hooks-record-shared-engine-implementation.md',
     append_link('implementation/fix-hooks-record-shared-engine-implementation.md', '../planning/no-such-plan.md'), 'CAUGHT'),
    ('P2 broken link, closed chain-014 document', 'planning/closed/014-test-suite-cleanup.md',
     append_link('planning/closed/014-test-suite-cleanup.md', '../no-such-dir/no-such.md'), 'CAUGHT'),
    ('P3 new broken link in a baselined pre-012 document', 'planning/closed/008-sub-component-crud-actions.md',
     append_link('planning/closed/008-sub-component-crud-actions.md', 'no-such-planted.md'), 'CAUGHT'),
    ('P4 duplicate document name in two stage directories', 'steering/014-test-suite-cleanup.md',
     copy('planning/closed/014-test-suite-cleanup.md', 'steering/014-test-suite-cleanup.md'), 'CAUGHT'),
    ('P5 third .gitignore outside the two exempted paths', 'user-files/.gitignore',
     copy('.gitignore', 'user-files/.gitignore'), 'CAUGHT'),
    ('P6 name shared by a verification/ file and a file outside verification/', 'planted-shared.md',
     lambda d: (wr(d, 'verification/015/planted-shared.md', 'x\n'), wr(d, 'steering/planted-shared.md', 'x\n')), 'CAUGHT'),
    ('P7 bad ID: not three digits', 'qa/closed/014-test-suite-cleanup-qa.md',
     sub('qa/closed/014-test-suite-cleanup-qa.md', '\nID: 014\n', '\nID: 14\n'), 'CAUGHT'),
    ('P8 bad ID: disagrees with the filename', 'analysis/closed/014-test-suite-cleanup-analysis.md',
     sub('analysis/closed/014-test-suite-cleanup-analysis.md', '\nID: 014\n', '\nID: 015\n'), 'CAUGHT'),
    ('P9 a fifth document with no stage suffix', 'deployment/closed/015-planted-readiness.md',
     copy('deployment/closed/014-test-suite-cleanup-readiness.md', 'deployment/closed/015-planted-readiness.md'), 'CAUGHT'),
    ('P10 name shared only across two verification/ folders (engine rule: allowed)', 'planted-probe.txt',
     lambda d: (wr(d, 'verification/015/a/planted-probe.txt', 'x\n'), wr(d, 'verification/014/planted-probe.txt', 'x\n')), 'ALLOWED'),
]

NEUTRALISE = [('code-review/fix-hooks-record-shared-engine-code-review.md', '`code-review/classify-baseline-by-prefix.js`', 'code-review/classify-baseline-by-prefix.js'),
              ('code-review/fix-hooks-record-shared-engine-code-review.md', '`planning/015-x.md`', 'planning/015-x.md')]
for p, old, new in NEUTRALISE:
    t = rd(base, p)
    if t.count(old) == 1:
        wr(base, p, t.replace(old, new))
if subprocess.run(['git', '-C', base, 'status', '--porcelain'], capture_output=True, text=True).stdout:
    subprocess.run(['git', '-C', base, 'commit', '--quiet', '-am', 'scratch only: un-backtick the two known dangling citations'], check=True, env=ENV)
rc0, out0 = check(base)
assert rc0 == 0, 'control must pass so that an exit 1 discriminates'
open(os.path.join(out, 'control.txt'), 'w').write(out0 + f'\nexit={rc0}\n')
lines0 = set(out0.splitlines())
rows = [{'plant': 'control', 'exit': rc0}]
for i, (name, needle, plant, expect) in enumerate(PLANTS, 1):
    d = os.path.join(scratch, f'plant-{i}')
    shutil.rmtree(d, ignore_errors=True)
    shutil.copytree(base, d, symlinks=True)
    plant(d)
    subprocess.run(['git', '-C', d, 'add', '-A'], check=True, env=ENV)
    subprocess.run(['git', '-C', d, 'commit', '--quiet', '-m', 'plant'], check=True, env=ENV)
    rc, o = check(d)
    open(os.path.join(out, f'plant-{i}.txt'), 'w').write(o + f'\nexit={rc}\n')
    new = [l.strip() for l in o.splitlines() if l not in lines0 and needle in l]
    got = 'CAUGHT' if rc != 0 and new else ('ALLOWED' if not new else 'NEW-LINES-EXIT-0')
    rows.append({'plant': name, 'expect': expect, 'outcome': got, 'exit': rc, 'new_lines': new[:4]})
    print(name, '->', got, '(expected', expect + ')', flush=True)
    shutil.rmtree(d, ignore_errors=True)
json.dump(rows, open(os.path.join(out, 'planted-defects.json'), 'w'), indent=1)
shutil.rmtree(base, ignore_errors=True)
