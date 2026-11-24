import subprocess,sys,shutil,os
SRC='/usr/local/bin/hooks/website/'
EXP=os.environ['EXPORT']+'/'
V='/usr/local/bin/hooks/agent-output/verification/019/impl/'
S='src/components/SlateEditor/utils/scan.ts'
H='src/components/SlateEditor/utils/highlightScan.ts'
D='src/components/SlateEditor/utils/decorator.tsx'
U='src/components/SlateEditor/utils/unitStyles.ts'
T=['src/components/SlateEditor/utils/__tests__/decorator.preview-equals.test.tsx']
muts=[
 ('m5-e1',U,"  bold: 'strongText',","  bold: 'strongTextX',",'bold class dropped'),
 ('m5-e2',U,"inlineCode: 'inlineCodeText', subtext: 'subtextText', link: 'linkText',","inlineCode: 'inlineCodeText', subtext: 'subtextText',",'link class dropped'),
 ('m5-e3',U,"inlineCode: 'inlineCodeText', subtext","subtext",'inline code class dropped'),
 ('m5-e4',D,"const styles = styleUnit(surface, unit.text, unit.startsInCodeBlock);","const styles = styleUnit('content', unit.text, unit.startsInCodeBlock);",'every surface drawn with the content mask'),
 ('m5-e5',U,"  spoiler: 'spoilerText',","  spoiler: 'spoilerTextX',",'spoiler class dropped'),
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
