import sys,os,re
d=sys.argv[1]
rows=[]
for n in sorted(os.listdir(d)):
    p=os.path.join(d,n)
    if not n.endswith('.md') or not os.path.isfile(p): continue
    t=open(p,encoding='utf-8').read()
    m=re.match(r'^---\n(.*?)\n---\n',t,re.S)
    if not m: print('NOFM',n); continue
    fm=m.group(1)
    st=re.search(r'^Status:\s*(.*)$',fm,re.M)
    st=st.group(1).strip().strip('"') if st else '?'
    # whole Review-Trigger value incl folded continuation lines
    rt=re.search(r'^Review-Trigger:(.*(?:\n[ \t]+.*)*)',fm,re.M)
    rt=' '.join(rt.group(1).split()) if rt else ''
    rows.append((n,st,rt))
opn=[r for r in rows if r[1]=='Open']
print('total_md',len(rows),'open',len(opn))
for n,st,rt in opn: print('OPEN|',n,'|',rt)
