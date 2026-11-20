#!/usr/bin/env python3
"""Which lockfile movers lie inside the dependency closure of the lint packages (M3 lockfile disposition).
Usage: lockfile-closure.py <website repo> <base sha> <new sha> <movers file from lockfile-movers.py>
Roots: the importer's direct dependencies whose name matches ROOT. A mover is 'in class' when its package name is in either commit's closure."""
import re, subprocess, sys
repo, base, new, movers = sys.argv[1:5]
ROOT = re.compile(r'^(eslint$|eslint-|@eslint/|@next/eslint-plugin-next$|typescript-eslint$|@typescript-eslint/)')
def lock(sha): return subprocess.run(['git', '-C', repo, 'show', f'{sha}:pnpm-lock.yaml'], capture_output=True, text=True, check=True).stdout
def parse(text):
    section = None; roots = {}; snaps = {}; cur = None; sub = None; imp = None; name = None
    for line in text.splitlines():
        if re.match(r'^[a-z]', line): section = line.split(':')[0]; continue
        if section == 'importers':
            m = re.match(r'^      (\S.*):$', line)
            if m: name = m.group(1).strip("'")
            m = re.match(r'^        version: (.*)$', line)
            if m and name and ROOT.match(name): roots[name] = m.group(1)
        if section == 'snapshots':
            m = re.match(r"^  (\S.*):( \{\})?$", line)
            if m: cur = m.group(1).strip("'"); snaps[cur] = []; continue
            m = re.match(r"^      ('?[^:\s]+'?): (.*)$", line)
            if m and cur is not None: snaps[cur].append((m.group(1).strip("'"), m.group(2).strip("'")))
    return roots, snaps
def closure(text):
    roots, snaps = parse(text); seen = set(); stack = [f'{n}@{v}' for n, v in roots.items()]; names = set()
    while stack:
        k = stack.pop()
        if k in seen: continue
        seen.add(k); names.add(re.match(r'^(@?[^@]+)@', k).group(1))
        for n, v in snaps.get(k, []): stack.append(f'{n}@{v}')
    return names, roots
bn, br = closure(lock(base)); nn, nr = closure(lock(new))
print('roots base:', len(br), 'new:', len(nr), '| closure names base:', len(bn), 'new:', len(nn))
inside, outside = [], []
for line in open(movers):
    if line.startswith(('#', 'packages keys', 'snapshots keys')): continue
    if '\t->\t' not in line: continue
    name = line.split('\t')[0]
    (inside if name in bn or name in nn else outside).append(name)
print('movers inside the lint closure:', len(inside)); print('movers outside it:', len(outside), outside)
