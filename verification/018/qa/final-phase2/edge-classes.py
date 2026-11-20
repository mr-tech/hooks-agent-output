# Classify each changed production-closure edge (prod-edges.py output) against plan rev 8 M2-b's mover classes and M3's CR-5 edges.
# An edge is in class when its parent or child package name is a named mover (version moved), else it is listed as UNCLASSIFIED.
import re,sys
M2={'next','@next/env','postcss','styled-jsx','@swc/helpers','caniuse-lite','baseline-browser-mapping','sharp','@img/colour','@emnapi/runtime','semver','highlight.js','@next/bundle-analyzer','zod'}
M2_PREFIX=('@next/swc-','@img/sharp-')
M3={'fast-glob','is-core-module','hasown'}
def name(pv): return pv.rsplit('@',1)[0] if not pv.startswith('@') or pv.count('@')>1 else pv
lines=[l for l in open(sys.argv[1]) if l.startswith('  ')]
tally={'M2':0,'M3':0,'UNCLASSIFIED':0}
for l in lines:
    m=re.match(r'\s+([+-]) (\S+) -> (\S+)',l); s,p,c=m.groups(); n=[name(p),name(c)]
    cls='M3' if any(x in M3 for x in n) or ('@prisma/internals' in p and name(c)=='semver') else ('M2' if any(x in M2 or x.startswith(M2_PREFIX) for x in n) else 'UNCLASSIFIED')
    tally[cls]+=1
    if cls=='UNCLASSIFIED': print('UNCLASSIFIED',s,p,'->',c)
print(tally, 'of', len(lines))
