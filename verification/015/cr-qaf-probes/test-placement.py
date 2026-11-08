#!/usr/bin/env python3
# Usage: test-placement.py <website repo> <sha>
# Class: a test file under src/**/__tests__/ whose <module> segment names a production module that does not sit in the
# directory directly above that __tests__/ (Test Conventions, "Tests live beside the code they cover").
# For each test basename <module>.<behaviour>.test.ts[x], production files (non-test, under src/) whose stem equals <module>
# are found. MISPLACED: at least one exists and none is in the parent of __tests__. NO-MODULE: none exists anywhere.
# Blind spots: a module segment that names a directory (index.ts) or a non-file surface; a stem shared by several
# production files where one happens to sit in the parent (counted as placed); helpers/ files are skipped.
import subprocess, sys, os, re
repo, sha = sys.argv[1], sys.argv[2]
files = subprocess.run(['git', '-C', repo, 'ls-tree', '-r', '--name-only', sha, '--', 'src'], capture_output=True, text=True, check=True).stdout.split('\n')
files = [f for f in files if f]
prod = {}
for f in files:
    if '/__tests__/' in f: continue
    stem = os.path.basename(f).split('.')[0]
    prod.setdefault(stem, []).append(os.path.dirname(f))
tests = [f for f in files if '/__tests__/' in f and re.search(r'\.test\.tsx?$', f) and '/helpers/' not in f]
mis, nomod = [], []
for t in tests:
    mod = os.path.basename(t).split('.')[0]
    parent = t.split('/__tests__/')[0]
    dirs = prod.get(mod, [])
    if not dirs: nomod.append(t)
    elif parent not in dirs: mis.append((t, sorted(set(dirs))))
print(f'sha {sha} tests {len(tests)} misplaced {len(mis)} no-module {len(nomod)}')
for t, d in mis: print(f'MISPLACED {t} -> module in {", ".join(d)}')
for t in nomod: print(f'NO-MODULE {t}')
