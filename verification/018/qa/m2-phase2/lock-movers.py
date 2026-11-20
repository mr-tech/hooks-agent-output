# Usage: python3 -I lock-movers.py <old pnpm-lock.yaml> <new> <outdir>. Parses top-level sections by indentation:
# a key line is exactly two spaces then a non-space, ending in ':'; quotes stripped. Package name = key up to the last '@'
# before the version (after a leading '@' for scoped names); snapshot keys keep their peer suffix as the text.
import sys,re,os
def sections(path):
    sec=None; out={}
    for line in open(path):
        if re.match(r'^[a-zA-Z]', line): sec=line.rstrip().rstrip(':'); out.setdefault(sec,[]); continue
        m=re.match(r"^  (\S.*):\s*(\{\})?$", line)
        if m and sec: out[sec].append(m.group(1).strip("'"))
    return out
def name_ver(k):
    base=k.split('(')[0]
    i=base.rfind('@'); return base[:i], base[i+1:]
a,b,od=sys.argv[1],sys.argv[2],sys.argv[3]
A,B=sections(a),sections(b)
rep=[]
for sec in ('packages','snapshots'):
    ka,kb=set(A.get(sec,[])),set(B.get(sec,[]))
    rep.append(f"{sec}: keys {len(ka)} -> {len(kb)}; removed {len(ka-kb)}; added {len(kb-ka)}")
    if sec=='packages':
        va={};vb={}
        for k in ka: n,v=name_ver(k); va.setdefault(n,set()).add(v)
        for k in kb: n,v=name_ver(k); vb.setdefault(n,set()).add(v)
        movers=sorted(n for n in set(va)|set(vb) if va.get(n)!=vb.get(n))
        open(os.path.join(od,'packages-mover-names.txt'),'w').write('\n'.join(movers)+'\n')
        rep.append(f"packages: mover names {len(movers)}")
    else:
        # same name@version in both, key text changed (peer suffix)
        ta={};tb={}
        for k in ka: ta.setdefault('@'.join(name_ver(k)),set()).add(k)
        for k in kb: tb.setdefault('@'.join(name_ver(k)),set()).add(k)
        tm=sorted(nv for nv in set(ta)&set(tb) if ta[nv]!=tb[nv])
        open(os.path.join(od,'snapshots-text-movers.txt'),'w').write('\n'.join(tm)+'\n')
        rep.append(f"snapshots: same name@version, key text changed {len(tm)}")
nx=[k for k in B['packages']+B['snapshots'] if k.startswith('next@')]
rep.append("next@ keys at new: "+' | '.join(x[:40] for x in nx))
open(os.path.join(od,'lock-movers-summary.txt'),'w').write('\n'.join(rep)+'\n'); print('\n'.join(rep))
