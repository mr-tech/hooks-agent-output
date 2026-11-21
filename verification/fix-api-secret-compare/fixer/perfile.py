import json,sys,os
base,after,root=sys.argv[1],sys.argv[2],sys.argv[3]
files=sys.argv[4:]
def load(p):
    d=json.load(open(p));out={}
    for r in d['testResults']:
        rel=os.path.relpath(r['name'],root)
        out[rel]=sorted((a['fullName'],a['status']) for a in r['assertionResults'])
    return out
b,a=load(base),load(after)
ok=True
for f in files:
    same=b.get(f)==a.get(f)
    ok&=same
    print(f"{f}\tbase={len(b.get(f) or [])}\tafter={len(a.get(f) or [])}\tpassset_identical={same}\tall_passed={all(s=='passed' for _,s in a.get(f) or [])}")
print("ALL_IDENTICAL",ok, "after_files",len(a))
