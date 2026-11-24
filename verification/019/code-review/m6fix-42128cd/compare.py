# usage: python3 -I compare.py <tree-A.json.gz> <tree-B.json.gz>
import gzip, json, sys
a = json.load(gzip.open(sys.argv[1])); b = json.load(gzip.open(sys.argv[2]))
assert a.keys() == b.keys()
print('keystrokes', len(a), 'inputs', len({k.split('|')[0] for k in a}))
diff = [k for k in a if a[k]['after'] != b[k]['after']]
print('differ', len(diff), diff)
for name, d in (('A', a), ('B', b)):
    nf = [k for k in d if not d[k]['fixedPoint']]
    err = [k for k in d if d[k]['after'].startswith('ERR')]
    print(name, 'non-fixed-point', len(nf), nf, 'errors', len(err))
