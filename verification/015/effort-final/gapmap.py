#!/usr/bin/env python3
"""Gap map: website production diff 7ce866b..c5303ca (src, bot; excluding __tests__) hunk by hunk at the tip, against the
tip-file line spans of every APPLIES mutant (website-mutants-apply*.json). A hunk is 'covered' when at least one mutant's
old-string span intersects the hunk's added lines; a pure-deletion hunk is listed with its tip anchor line and is covered
when a mutant span includes that line or the line after it. Output: gapmap.txt (one row per hunk). Read-only."""
import json, re, subprocess
W='/usr/local/bin/hooks/website'; BASE='7ce866b'; TIP='c5303ca'
diff=subprocess.run(['git','-C',W,'diff','-U0',BASE,TIP,'--','src','bot',':!**/__tests__/**'],capture_output=True,text=True).stdout
muts=json.load(open('website-mutants-apply.json'))
import os
if os.environ.get('WITH_GAP'): muts += json.load(open('website-gap-mutants.json'))
for m in json.load(open('website-mutants-apply-multipair.json')):
    for i,p in enumerate(m['pairs']): muts.append({'id':m['id']+f'#{i}','file':p['file'],'old':p['old']})
cache={}
def src(f):
    if f not in cache: cache[f]=subprocess.run(['git','-C',W,'show',f'{TIP}:{f}'],capture_output=True,text=True).stdout
    return cache[f]
spans={}
for m in muts:
    s=src(m['file']); i=s.find(m['old'])
    if i<0: continue
    a=s.count('\n',0,i)+1; b=a+m['old'].count('\n')
    spans.setdefault(m['file'],[]).append((a,b,m['id']))
rows=[]; f=None
for line in diff.splitlines():
    if line.startswith('+++ b/'): f=line[6:]
    elif line.startswith('@@'):
        mm=re.match(r'@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@',line)
        start=int(mm.group(3)); cnt=int(mm.group(4)) if mm.group(4) is not None else 1
        rows.append([f,start,cnt,[]])
    elif rows and (line.startswith('+') or line.startswith('-')) and not line.startswith(('+++','---')):
        rows[-1][3].append(line[:110])
out=[]; nc=0
for f,start,cnt,body in rows:
    lo,hi=(start,start+cnt-1) if cnt else (start,start+1)
    hit=[i for a,b,i in spans.get(f,[]) if a<=hi and b>=lo]
    st='COVERED' if hit else 'GAP'
    nc+= not hit
    out.append(f"{st}\t{f}:{lo}-{hi}\t{','.join(hit[:4])}{'…' if len(hit)>4 else ''}\n" + ''.join(f"    {b}\n" for b in body[:8]))
open('gapmap.txt','w').write(f"hunks {len(rows)} gaps {nc} mutant spans {sum(len(v) for v in spans.values())}\n"+''.join(out))
print(len(rows), nc)
