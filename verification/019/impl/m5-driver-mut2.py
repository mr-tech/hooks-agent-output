import subprocess,sys,shutil,os
SRC='/usr/local/bin/hooks/website/'
EXP=os.environ['EXPORT']+'/'
V='/usr/local/bin/hooks/agent-output/verification/019/impl/'
S='src/components/SlateEditor/utils/scan.ts'
H='src/components/SlateEditor/utils/highlightScan.ts'
D='src/components/SlateEditor/utils/decorator.tsx'
T=['src/components/SlateEditor/utils/__tests__/highlightScan.scope-classes.test.ts','src/components/SlateEditor/utils/__tests__/decorator.code-line-scopes.test.tsx']
muts=[
 ('m5-c1',H,"else if (token === '</span>') open.pop();","else if (token === '</span>') open.length += 0;",'a closing span does not close its scope'),
 ('m5-c2',H,"const text = ENTITIES[token] ?? token;","const text = token;",'an entity counts as its source characters'),
 ('m5-c3',H,"out.push([...open]);","out.push(open.slice(-1));",'a nested scope loses its outer class'),
 ('m5-c4',D,"const start = line.children.slice(0, path.at(-1)).map((c) => flattenNodeText(c)).join('').length;","const start = 0;",'a later text node of a code line reads from the line start'),
 ('m5-c5',D,"  if (hljs.getLanguage(line.lang) === undefined) return [];\n","",'unknown language not guarded'),
 ('m5-c6',H,"[^<&]+|[<&]/g","[^<&]+/g",'a lone angle or ampersand dropped from the text'),
 ('m5-c7',D,"ignoreIllegals: true","ignoreIllegals: false",'illegal sequences not ignored'),
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
