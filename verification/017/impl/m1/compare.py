#!/usr/bin/env python3
"""M1 evidence: compare two vitest JSON reports by path membership and per-file (fullName, status) pairs.

Usage: python3 -I compare.py <base.json> <tip.json> <website-root>
Prints: file-set difference (by path relative to the website root), per-file case count and pass set for
the four M1-a renames (old path in base, new path in tip), and the M1-b titles that survive in
limits.import-validation (by fullName, base minus the enforceImportMutualExclusivity describe).
"""
import json
import sys

RENAMES = {
    'src/utils/__tests__/messageStore.dropped-set-report.test.ts': 'src/utils/redis/__tests__/messageStore.dropped-set-report.test.ts',
    'src/utils/__tests__/messageValidity.predicate.test.ts': 'src/server/api/utils/__tests__/messageValidity.predicate.test.ts',
    'src/utils/__tests__/useApiMethods.json-editor-repair.test.ts': 'src/providers/MessageProvider/__tests__/useApiMethods.json-editor-repair.test.ts',
    'src/utils/__tests__/usePusher.hash-parity.test.ts': 'src/providers/MessageProvider/__tests__/usePusher.hash-parity.test.ts',
}
LIMITS = 'src/utils/__tests__/limits.import-validation.test.ts'


def load(path, root):
    out = {}
    for tr in json.load(open(path))['testResults']:
        rel = tr['name'][len(root):].lstrip('/')
        out[rel] = sorted((a['fullName'], a['status']) for a in tr['assertionResults'])
    return out


base, tip, root = load(sys.argv[1], sys.argv[3]), load(sys.argv[2], sys.argv[3]), sys.argv[3]
only_base, only_tip = sorted(set(base) - set(tip)), sorted(set(tip) - set(base))
print('files base', len(base), 'tip', len(tip))
print('only in base:', only_base)
print('only in tip:', only_tip)
ok = sorted(only_base) == sorted(RENAMES) and sorted(only_tip) == sorted(RENAMES.values())
print('file-set difference is exactly the four renames:', ok)
for old, new in RENAMES.items():
    same = base[old] == tip[new]
    passed = sum(1 for _, s in tip[new] if s == 'passed')
    print(f'{new.rsplit("/", 1)[1]}: cases base {len(base[old])} tip {len(tip[new])} passed {passed} identical (fullName,status): {same}')
    ok = ok and same
survive = [(n, s) for n, s in base[LIMITS] if not n.startswith('enforceImportMutualExclusivity')]
print('limits.import-validation base', len(base[LIMITS]), 'minus enforce describe', len(survive), 'tip', len(tip[LIMITS]),
      'identical:', survive == tip[LIMITS], 'all passed:', all(s == 'passed' for _, s in tip[LIMITS]))
removed = [n for n, _ in base[LIMITS] if n.startswith('enforceImportMutualExclusivity')]
print('removed cases', len(removed))
ok = ok and survive == tip[LIMITS]
other_changed = [p for p in base if p in tip and p != LIMITS and base[p] != tip[p]]
print('other files whose cases differ:', other_changed)
print('RESULT', 'OK' if ok else 'MISMATCH')
