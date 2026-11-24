import subprocess,sys,shutil,os
SRC='/usr/local/bin/hooks/website/'
EXP=os.environ['EXPORT']+'/'
V='/usr/local/bin/hooks/agent-output/verification/019/impl/'
D='x'
T=['src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx','src/components/DiscordContentEditor/__tests__/DiscordContentEditor.mobile-opens-after-engine-settles.test.tsx', 'src/components/SlateEditor/utils/__tests__/decorator.one-parse-per-unit.test.ts', 'src/components/SlateEditor/utils/__tests__/decorator.code-line-scopes.test.tsx']
muts=[('m5-sv-Desktop_tsx_90_not', 'src/components/DiscordContentEditor/Desktop.tsx', ' {!_f', ' {_f', 'Desktop.tsx:90:not'), ('m5-sv-Mobile_tsx_93_===', 'src/components/DiscordContentEditor/Mobile.tsx', "ne === 'p", "ne !== 'p", 'Mobile.tsx:93:==='), ('m5-sv-Mobile_tsx_93_||', 'src/components/DiscordContentEditor/Mobile.tsx', "' || !", "' && !", 'Mobile.tsx:93:||'), ('m5-sv-Mobile_tsx_93_not', 'src/components/DiscordContentEditor/Mobile.tsx', ' !m', ' m', 'Mobile.tsx:93:not'), ('m5-sv-decorator_tsx_16_walk-first', 'src/components/SlateEditor/utils/decorator.tsx', 'line.children.slice(0, path.at(-1))', '(Array.isArray(line.children.slice(0, path.at(-1))) ? line.children.slice(0, path.at(-1)).slice(0, 1) : line.children.slice(0, path.at(-1)))', 'decorator.tsx:16:walk-first'), ('m5-sv-decorator_tsx_16_walk-last', 'src/components/SlateEditor/utils/decorator.tsx', 'line.children.slice(0, path.at(-1))', '(Array.isArray(line.children.slice(0, path.at(-1))) ? line.children.slice(0, path.at(-1)).slice(-1) : line.children.slice(0, path.at(-1)))', 'decorator.tsx:16:walk-last'), ('m5-sv-decorator_tsx_25_num', 'src/components/SlateEditor/utils/decorator.tsx', '512', '513', 'decorator.tsx:25:num'), ('m5-sv-decorator_tsx_84_if-false', 'src/components/SlateEditor/utils/decorator.tsx', ' if (s', ' if (false && s', 'decorator.tsx:84:if-false'), ('m5-sv-decorator_tsx_84_ge', 'src/components/SlateEditor/utils/decorator.tsx', '>=', '>', 'decorator.tsx:84:>=')]
only=sys.argv[1:]
for name,f,a,b,desc in muts:
    if only and name not in only: continue
    for t in T+[f]:
        os.makedirs(os.path.dirname(EXP+t),exist_ok=True); shutil.copy(SRC+t,EXP+t)
    s=open(EXP+f).read(); assert a in s,(name,a); open(EXP+f,'w').write(s.replace(a,b,1))
    out=V+name+'.txt'
    with open(out,'w') as fh:
        fh.write('export: '+EXP+'\nmutant: '+desc+'\n')
        r=subprocess.run(['timeout','300','unshare','-rn','npx','vitest','run']+T,cwd=EXP,stdout=fh,stderr=subprocess.STDOUT,start_new_session=True)
        fh.write('exit %d\n'%r.returncode)
    shutil.copy(SRC+f,EXP+f)
    print(name,desc,'KILLED' if r.returncode else 'SURVIVED',flush=True)
