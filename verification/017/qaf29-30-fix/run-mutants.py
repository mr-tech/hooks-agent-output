#!/usr/bin/env python3
"""A mutant id with colons is written to disk with them as hyphens (a colon in the working directory breaks the PATH npx runs under).
usage: run-mutants.py <website repo> <sha> <out dir> <scratch dir>
One named mutant per export of `git archive <sha>`; each is a list of exact-once edits; vitest runs network isolated in its own
process group, killed at 300 s (a timeout counts as a kill); outputs to files under <out dir>."""
import json, os, shutil, signal, subprocess, sys
repo, sha, out, scratch = sys.argv[1:5]
os.makedirs(out, exist_ok=True); os.makedirs(scratch, exist_ok=True)
TESTS = ['src/providers/MessageProvider/__tests__/MessageProvider.stored-draft.test.tsx',
         'src/components/__tests__/WarningDialog.enter-scope.test.tsx',
         'src/components/__tests__/ImageUploader.enter-scope.test.tsx']
CONTENTS = ('className="contents"', '')
MUTANTS = [
  ('control', []),
  ('index.tsx:153:stmt', [('src/providers/MessageProvider/index.tsx', 'writeRouteZeroDraft(tmp);', ';')]),
  ('ConfirmationDialog.tsx:17:attr:2', [('src/components/ConfirmationDialog.tsx',) + CONTENTS]),
  ('WarningDialog.tsx:23:attr:2', [('src/components/WarningDialog.tsx',) + CONTENTS]),
  ('ImageUploader.tsx:96:attr:2', [('src/components/ImageUploader.tsx',) + CONTENTS]),
]
summary = open(os.path.join(out, 'summary.txt'), 'w')
for name, edits in MUTANTS:
    safe = name.replace(':', '-')
    exp = os.path.join(scratch, 'exp-' + safe)
    shutil.rmtree(exp, ignore_errors=True); os.makedirs(exp)
    subprocess.run(f'git -C {repo} archive {sha} | tar -x -C {exp}', shell=True, check=True)
    os.symlink(os.path.join(repo, 'node_modules'), os.path.join(exp, 'node_modules'))
    ok = True
    for f, old, new in edits:
        path = os.path.join(exp, f); s = open(path).read()
        if s.count(old) != 1:
            summary.write(f'{name}: edit did not apply exactly once ({s.count(old)}): {old[:40]!r}\n'); ok = False; break
        open(path, 'w').write(s.replace(old, new))
    if ok:
        report = os.path.join(out, safe + '.json')
        with open(os.path.join(out, safe + '.out'), 'w') as fh:
            p = subprocess.Popen(['unshare', '-rn', 'npx', 'vitest', 'run', *TESTS, '--reporter=json', f'--outputFile={report}'],
                                 cwd=exp, stdout=fh, stderr=subprocess.STDOUT, start_new_session=True)
            try: code = p.wait(timeout=300)
            except subprocess.TimeoutExpired:
                os.killpg(p.pid, signal.SIGKILL); p.wait(); code = 'timeout'
        try:
            d = json.load(open(report))
            fails = [t['fullName'][-100:] for r in d['testResults'] for t in r['assertionResults'] if t['status'] == 'failed']
            summary.write(f"{name} exit {code} failed {d['numFailedTests']} of {d['numTotalTests']}\n")
            for x in fails: summary.write('    ' + x + '\n')
        except Exception as e:
            summary.write(f'{name} exit {code} no json {e}\n')
    shutil.rmtree(exp, ignore_errors=True); summary.flush()
summary.write('leftover exports: %d\n' % len([x for x in os.listdir(scratch) if x.startswith('exp-')]))
