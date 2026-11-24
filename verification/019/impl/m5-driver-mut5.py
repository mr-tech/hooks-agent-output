import subprocess,sys,shutil,os
SRC='/usr/local/bin/hooks/website/'
EXP=os.environ['EXPORT']+'/'
V='/usr/local/bin/hooks/agent-output/verification/019/impl/'
S='src/components/SlateEditor/utils/scan.ts'
H='src/components/SlateEditor/utils/highlightScan.ts'
D='src/components/SlateEditor/utils/decorator.tsx'
T=['src/components/SlateEditor/utils/__tests__/decorator.range-bounds.test.ts']
muts=[
 ('m5-r1',D,"focus: { path, offset: i },","focus: { path, offset: i + 1 },",'a range ends one past its text'),
 ('m5-r2',D,"anchor: { path, offset: start },","anchor: { path, offset: i },",'a range is empty'),
 ('m5-r3',D,"anchor: { path, offset: start },","anchor: { path, offset: start - 1 },",'a range starts before its text'),
]
only=sys.argv[1:]
for name,f,a,b,desc in muts:
    if only and name not in only: continue
    for t in T+[f]:
        os.makedirs(os.path.dirname(EXP+t),exist_ok=True); shutil.copy(SRC+t,EXP+t)
    s=open(EXP+f).read(); assert a in s,(name,a); open(EXP+f,'w').write(s.replace(a,b,1))
    out=V+name+'.txt'
    with open(out,'w') as fh:
        fh.write('export: '+EXP+'\nmutant: '+desc+'\n')
        r=subprocess.run(['timeout','300','npx','vitest','run']+T,cwd=EXP,stdout=fh,stderr=subprocess.STDOUT,start_new_session=True)
        fh.write('exit %d\n'%r.returncode)
    shutil.copy(SRC+f,EXP+f)
    print(name,desc,'KILLED' if r.returncode else 'SURVIVED',flush=True)
