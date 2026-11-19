"""Re-count M1's suite captures by path, independently of the implementer's compare.py.

Usage: python3 -I rename-recount.py <base vitest JSON> <tip vitest JSON>

Reads each capture's testResults, keys every file by its path relative to the website root, and
prints: file-set difference both ways, per-file (title, status) multiset for the four renamed
files and the two edited ones, and the totals. Positive control: a capture compared with itself
prints an empty difference; the base compared with the tip must print exactly the four old paths
on one side and the four new paths on the other.
"""
import collections
import json
import sys

RENAMES = {
    'src/utils/__tests__/messageStore.dropped-set-report.test.ts': 'src/utils/redis/__tests__/messageStore.dropped-set-report.test.ts',
    'src/utils/__tests__/messageValidity.predicate.test.ts': 'src/server/api/utils/__tests__/messageValidity.predicate.test.ts',
    'src/utils/__tests__/useApiMethods.json-editor-repair.test.ts': 'src/providers/MessageProvider/__tests__/useApiMethods.json-editor-repair.test.ts',
    'src/utils/__tests__/usePusher.hash-parity.test.ts': 'src/providers/MessageProvider/__tests__/usePusher.hash-parity.test.ts',
}
EDITED = [
    'src/utils/__tests__/limits.import-validation.test.ts',
    'src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.component-limit.test.tsx',
]


def load(path):
    data = json.load(open(path))
    files = {}
    for result in data['testResults']:
        name = result['name']
        rel = name[name.index('/src/') + 1:] if '/src/' in name else name
        files[rel] = collections.Counter(
            (a['fullName'], a['status']) for a in result['assertionResults'])
    return data, files


base_data, base = load(sys.argv[1])
tip_data, tip = load(sys.argv[2])
print('base only:', sorted(set(base) - set(tip)))
print('tip only:', sorted(set(tip) - set(base)))
for old, new in RENAMES.items():
    same = base.get(old) == tip.get(new)
    print(f'{"SAME" if same else "DIFF"} {sum(base.get(old, {}).values())} -> {sum(tip.get(new, {}).values())} {new}')
for path in EDITED:
    b, t = base.get(path, collections.Counter()), tip.get(path, collections.Counter())
    print(f'{path}: {sum(b.values())} -> {sum(t.values())}; removed {sum((b - t).values())}; added {sum((t - b).values())}; '
          f'tip non-passed {sum(v for (n, s), v in t.items() if s != "passed")}')
others = [p for p in set(base) & set(tip) if p not in EDITED and base[p] != tip[p]]
print('other files whose cases differ:', sorted(others))
for label, d in (('base', base_data), ('tip', tip_data)):
    print(label, 'numTotalTests', d['numTotalTests'], 'numPassedTests', d['numPassedTests'],
          'files', len(d['testResults']), 'success', d.get('success'))
