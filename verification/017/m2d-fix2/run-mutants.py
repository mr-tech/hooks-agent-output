#!/usr/bin/env python3
"""usage: run-mutants.py <website repo> <sha> <out dir> <scratch dir>
One named mutant per export of `git archive <sha>`; each is a list of exact-once edits; vitest runs network isolated in its own
process group, killed at 300 s (a timeout counts as a kill); outputs to files under <out dir>."""
import json, os, shutil, signal, subprocess, sys
repo, sha, out, scratch = sys.argv[1:5]
os.makedirs(out, exist_ok=True); os.makedirs(scratch, exist_ok=True)
P = 'src/providers/MessageProvider/usePusher.ts'
S = 'src/server/api/utils/shared.ts'
TESTS = ['src/providers/MessageProvider', 'src/server/api/utils/__tests__/shared.upsert-broadcast.test.ts',
         'src/app/message/__tests__/layout.navigation-guard.test.tsx']
CLEAN = ('      pusher.disconnect();\n', '')
LATEST_DECL = ('export default (', 'let latestPusher: { disconnect: VoidFunction } | null = null;\n\nexport default (')
LATEST_SET = ('    const channel = pusher.subscribe(', '    latestPusher = pusher;\n    const channel = pusher.subscribe(')
MUTANTS = [
  ('control', []),
  ('nm39-producer-bare-hash', [(S, 'JSON.stringify(hashMessage(message))', 'hashMessage(message)')]),
  ('nm40-producer-encodes-twice', [(S, 'JSON.stringify(hashMessage(message))', 'JSON.stringify(JSON.stringify(hashMessage(message)))')]),
  ('nm42-no-disconnect', [(P,) + CLEAN]),
  ('nm43-disconnect-unmount-only-effect', [(P,) + CLEAN, (P,) + LATEST_DECL, (P,) + LATEST_SET,
     (P, '  }, [messageRef.current && isApiMessage(messageRef.current) && messageRef.current.id]);',
         '  }, [messageRef.current && isApiMessage(messageRef.current) && messageRef.current.id]);\n\n  useEffect(() => () => { latestPusher?.disconnect(); }, []);')]),
  ('nm44-disconnect-latest-instance', [(P, '      pusher.disconnect();', '      latestPusher?.disconnect();'), (P,) + LATEST_DECL, (P,) + LATEST_SET]),
  ('nm45-disconnect-in-effect-body', [(P,) + CLEAN, (P, '    const channel = pusher.subscribe(', '    pusher.disconnect();\n    const channel = pusher.subscribe(')]),
  ('disconnect-before-unsubscribe-dropped-unbind', [(P, '      channel.unbind();\n', '')]),
]
summary = open(os.path.join(out, 'summary.txt'), 'w')
for name, edits in MUTANTS:
    exp = os.path.join(scratch, 'exp-' + name)
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
        report = os.path.join(out, name + '.json')
        with open(os.path.join(out, name + '.out'), 'w') as fh:
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
