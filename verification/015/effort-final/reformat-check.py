#!/usr/bin/env python3
"""QA effort-final: the 'reformatting' class of gap-dispositions.md, checked by execution. For each listed hunk of
git diff -U0 7ce866b c5303ca, compare the old and new sides as token multisets (words and punctuation), ignoring
whitespace, ',' and ';' (wrap-added separators). Equal multisets mean no token was added, removed or changed
(a reorder, such as class-name lint, keeps the multiset). Positive control: a known behavioural hunk must differ."""
import re, subprocess, collections
W='/usr/local/bin/hooks/website'
HUNKS={'bot/scripts/app_commands/common.ts':[10],'src/app/message/f/[id]/page.tsx':[179],'src/app/message/m/[id]/send/page.tsx':[302,305],
 'src/components/BottomPortal.tsx':[136,173],'src/server/api/utils/shapes.ts':[160,244,258,269,321],'src/server/auth.ts':[220],
 'src/utils/discordResponseToMessage.ts':[159],'src/utils/limits.tsx':[43,61,170]}
CONTROL=('src/pages/api/cron.ts',26)
def hunks(f):
    d=subprocess.run(['git','-C',W,'diff','-U0','7ce866b','c5303ca','--',f],capture_output=True,text=True).stdout
    out={}; cur=None
    for l in d.splitlines():
        m=re.match(r'@@ -\d+(?:,\d+)? \+(\d+)',l)
        if m: cur=int(m.group(1)); out[cur]=([],[]); continue
        if cur is None or l.startswith(('---','+++')): continue
        if l.startswith('-'): out[cur][0].append(l[1:])
        elif l.startswith('+'): out[cur][1].append(l[1:])
    return out
tok=lambda t: collections.Counter(x for x in re.findall(r"\w+|[^\s\w]", '\n'.join(t)) if x not in ',;')
n=0; diff=[]
for f,starts in HUNKS.items():
    h=hunks(f)
    for st in starts:
        o,nw=h[st]; n+=1
        if tok(o)!=tok(nw): diff.append((f,st,dict(tok(o)-tok(nw)),dict(tok(nw)-tok(o))))
f,st=CONTROL; o,nw=hunks(f)[st]
print('hunks checked',n,'differing',len(diff)); [print('  DIFF',d) for d in diff]
print('control',f,st,'differs:',tok(o)!=tok(nw), dict(tok(o)-tok(nw)), dict(tok(nw)-tok(o)))
