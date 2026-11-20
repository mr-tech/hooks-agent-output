"""Compare two reduced reports: file membership, per-rule counts, and finding-level multiset difference.

Usage: python3 -I compare.py <base.tsv> <base-files.txt> <new.tsv> <new-files.txt>
"""
import sys
from collections import Counter
bt, bf, nt, nf = sys.argv[1:5]
read = lambda p: [l.rstrip('\n').split('\t') for l in open(p) if l.strip()]
bfiles, nfiles = set(open(bf).read().split()), set(open(nf).read().split())
print('files: base', len(bfiles), 'new', len(nfiles))
print('only in base:', sorted(bfiles - nfiles)); print('only in new:', sorted(nfiles - bfiles))
b, n = read(bt), read(nt)
print('findings: base', len(b), 'new', len(n))
bc, nc = Counter(r[3] for r in b), Counter(r[3] for r in n)
diff = {k: (bc[k], nc[k]) for k in set(bc) | set(nc) if bc[k] != nc[k]}
print('rule ids whose count differs:', len(diff), 'of', len(set(bc) | set(nc)))
for k in sorted(diff): print(f'  {k}\t{diff[k][0]}\t{diff[k][1]}\t{diff[k][1]-diff[k][0]:+d}')
key = lambda r: (r[0], r[1], r[2], r[3])
bk, nk = Counter(map(key, b)), Counter(map(key, n))
gone, came = bk - nk, nk - bk
same_count = [k for k in sorted(set(bc) & set(nc)) if bc[k] == nc[k]]
hidden = {k: (sum(v for x, v in gone.items() if x[3] == k), sum(v for x, v in came.items() if x[3] == k)) for k in same_count}
hidden = {k: v for k, v in hidden.items() if v != (0, 0)}
print('rule ids with EQUAL counts but different findings (location-level):', len(hidden))
for k, (g, c) in sorted(hidden.items()): print(f'  {k}\tgone {g}\tnew {c}')
for k, (g, c) in sorted(hidden.items()):
    print('#', k)
    for x in sorted(gone):
        if x[3] == k: print('   -', *x[:3])
    for x in sorted(came):
        if x[3] == k: print('   +', *x[:3])
