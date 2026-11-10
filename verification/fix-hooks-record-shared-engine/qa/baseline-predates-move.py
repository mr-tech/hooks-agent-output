#!/usr/bin/env python3
"""Does every baseline entry match a failure that existed before the move, and is each in a sanctioned class?

Usage: python3 -I baseline-predates-move.py <record> <scratch-dir> <out-dir> <tools-sha>
  <record> the shared record (read only: clones are taken from it). Pre-move tree: 7b4419a (the fix's base);
  tools under test: <tools-sha> (argv 4).

Leg A (match, engine-shaped): a clone at 7b4419a gets the <tools-sha> entrypoints and baseline in its working tree and
  runs the default check. Every entry that matches no live failure prints a BASELINE stale warning; "N baselined"
  with N = the entry count and no BASELINE block means every entry matched a pre-move failure. Positive control: the
  same run with one planted entry that matches nothing must print a BASELINE warning naming it.
Leg B (class, old-checker-shaped): a copy of the OLD checker at 7b4419a, with one line added after its own legacy
  filter to print the files it omitted, gives the pre-012 set by the old tool's own predicate. The four SCOPE
  documents come from the old checker's own pre-move output (verification/cleanup-2026-11-10/after-check-repo.txt).
  Every path named in every entry's detail (tokens matching a tracked file) must be in one of those two sets.
  Positive controls: a planted entry naming a chain-015 document, and a fifth unsuffixed document, are flagged.
"""
import json, os, re, shutil, subprocess, sys

rec, scratch, out, TOOLS_SHA = sys.argv[1:5]
os.makedirs(out, exist_ok=True)


def clone(name, sha):
    d = os.path.join(scratch, name)
    shutil.rmtree(d, ignore_errors=True)
    subprocess.run(['git', 'clone', '--quiet', '--no-hardlinks', rec, d], check=True)
    subprocess.run(['git', '-C', d, 'checkout', '--quiet', sha], check=True)
    return d


def show(sha, path):
    return subprocess.run(['git', '-C', rec, 'show', f'{sha}:{path}'], check=True, capture_output=True, text=True).stdout


def check(d, args=()):
    r = subprocess.run(['unshare', '-rn', 'node', 'tools/check-repo.js', *args], cwd=d, capture_output=True, text=True, timeout=240)
    return r.returncode, r.stdout + r.stderr


baseline_text = show(TOOLS_SHA, 'tools/check-repo-baseline.json')
baseline = json.loads(baseline_text)
report = {'entries': len(baseline)}

pre = clone('pre-7b4419a', '7b4419a')
for f in ('check-repo.js', 'build-index.js', 'check-repo-baseline.json'):
    open(os.path.join(pre, 'tools', f), 'w').write(show(TOOLS_SHA, f'tools/{f}'))
rc, txt = check(pre)
open(os.path.join(out, 'legA-new-tools-on-7b4419a.txt'), 'w').write(txt + f'\nexit={rc}\n')
m = re.search(r'(\d+) baselined', txt)
report['legA'] = {'exit': rc, 'baselined': int(m.group(1)) if m else None, 'stale_block': 'BASELINE — ' in txt}
planted = {'check': 'links', 'detail': 'planning/closed/001-nonexistent.md:1  ->  x.md   (markdown-link, resolves to planning/closed/x.md)', '_why': 'planted'}
open(os.path.join(pre, 'tools', 'check-repo-baseline.json'), 'w').write(json.dumps(baseline + [planted], indent=2))
rc2, txt2 = check(pre)
open(os.path.join(out, 'legA-positive-control.txt'), 'w').write(txt2 + f'\nexit={rc2}\n')
report['legA_control'] = {'exit': rc2, 'stale_block': 'BASELINE — ' in txt2, 'names_planted': '001-nonexistent.md' in txt2}

old = show('7b4419a', 'tools/check-repo.js')
anchor = '  const omitted = everything.length - files.length;\n'
assert old.count(anchor) == 1
old = old.replace(anchor, anchor + "  if (process.env.QA_DUMP_LEGACY) { console.log(JSON.stringify(everything.filter((f) => isPreWorkflowChain(f)))); process.exit(0); }\n")
open(os.path.join(pre, 'tools', 'check-repo.js'), 'w').write(old)
r = subprocess.run(['node', 'tools/check-repo.js'], cwd=pre, capture_output=True, text=True, env={**os.environ, 'QA_DUMP_LEGACY': '1'}, timeout=240)
legacy = set(json.loads(r.stdout.strip().splitlines()[-1]))
after = open(os.path.join(rec, 'verification/cleanup-2026-11-10/after-check-repo.txt')).read()
scope4 = set(re.findall(r'^\s+(\S+\.md): no recognised stage suffix', after, re.M))
tracked = set(subprocess.run(['git', '-C', pre, 'ls-files'], capture_output=True, text=True).stdout.split('\n'))
report['legacy_files'] = len(legacy)
report['scope4'] = sorted(scope4)


def classify(entries):
    bad = []
    for e in entries:
        paths = [t.rstrip(':,') for t in re.split(r'\s+', e['detail'])]
        paths = [re.sub(r':\d+$', '', p) for p in paths]
        named = [p for p in paths if p in tracked or re.match(r'^[a-z-]+/.*\.md$', p) and not p.startswith('../')]
        first_doc = [p for p in named if p in tracked or p.startswith(('planning/', 'deployment/'))]
        if not first_doc:
            bad.append((e['detail'][:120], 'no tracked path'))
            continue
        for p in first_doc:
            if p not in legacy and p not in scope4:
                bad.append((e['detail'][:120], p))
    return bad


bad = classify(baseline)
report['legB_outside'] = bad
fifth = {'check': 'scope', 'detail': "deployment/closed/015-new-readiness.md: no recognised stage suffix for 'deployment/' (expected one of deployment)", '_why': 'planted'}
c015 = {'check': 'links', 'detail': 'planning/015-x.md:3  ->  ../nowhere.md   (markdown-link, resolves to nowhere.md)', '_why': 'planted'}
report['legB_control'] = classify([fifth, c015])
json.dump(report, open(os.path.join(out, 'baseline-predates-move.json'), 'w'), indent=1)
print(json.dumps({k: v for k, v in report.items() if k != 'scope4'}, indent=1))
shutil.rmtree(pre, ignore_errors=True)
