# QA M3 comparison: lint JSON (files, per-rule counts) and build manifests (content hashes, build id normalised) and nft traces.
import json,collections
def lint(p,k):
    j=json.load(open(p)); files={x['filePath'].split(k,1)[1].split('/',1)[1] for x in j}
    c=collections.Counter(m.get('ruleId') for x in j for m in x['messages']); return files,c
fa,ca=lint('a558f2d-lint.json','/m3p2/'); fb,cb=lint('969d92a-lint.json','/m3p2/')
print('lint files',len(fa),'->',len(fb),'only base',sorted(fa-fb),'only tip',sorted(fb-fa))
print('findings',sum(ca.values()),'->',sum(cb.values()))
d=sorted([r for r in set(ca)|set(cb) if ca[r]!=cb[r]], key=str); print('rule ids differing',len(d))
for r in d: print(f'  {r}: {ca[r]} -> {cb[r]}')
open('rule-diff-ids.txt','w').write('\n'.join(str(r) for r in d)+'\n')
def man(p): return dict(l.rstrip('\n').split('  ',1)[::-1] for l in open(p))
A1,A2,B=man('a558f2d-build1.manifest'),man('a558f2d-build2.manifest'),man('969d92a-build1.manifest')
def cmp(x,y,n):
    ks=set(x)|set(y); diff=sorted(k for k in ks if x.get(k)!=y.get(k))
    print(n,'files',len(x),len(y),'differing or missing',len(diff)); return diff
d12=cmp(A1,A2,'base build1 vs build2 (noise floor):'); dab=cmp(A1,B,'base build1 vs M3 build:')
print('  noise sample',d12[:5]); print('  M3 diff sample',dab[:8]); print('  M3 diffs not in noise set',len(set(dab)-set(d12)))
for p in ['a558f2d-build1.manifest.nft-paths','969d92a-build1.manifest.nft-paths']:
    s=open(p).read().split('\n'); print(p,'paths',len(s),'cr5 pkgs',sum(1 for l in s if l.startswith(('fast-glob@','is-core-module@','hasown@','semver@','@prisma+internals'))))
