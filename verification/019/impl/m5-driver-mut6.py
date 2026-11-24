import subprocess,sys,shutil,os
SRC='/usr/local/bin/hooks/website/'
EXP=os.environ['EXPORT']+'/'
V='/usr/local/bin/hooks/agent-output/verification/019/impl/'
C='src/components/DiscordMessageEditor/components/'
D='src/components/SlateEditor/utils/decorator.tsx'
T=[C+'__tests__/DiscordContentEditor.call-site-surfaces.test.tsx']
muts=[
 ('m5-s1',C+'EmbedEditor/Embed.tsx',"surface='embedDescription'","surface='fieldValue'",'the embed description on the field value surface'),
 ('m5-s2',C+'EmbedEditor/EmbedField.tsx',"surface={embedHasUrl ? 'embedTitleWithUrl' : 'embedTitle'}","surface='embedTitle'",'a field name ignores the embed address'),
 ('m5-s3',C+'EmbedEditor/EmbedTitle.tsx',"surface={url ? 'embedTitleWithUrl' : 'embedTitle'}","surface='embedTitle'",'the title ignores the embed address'),
 ('m5-s4',C+'EmbedEditor/EmbedField.tsx',"surface='fieldValue'","surface='embedDescription'",'a field value on the description surface'),
 ('m5-s5',C+'ContentBody.tsx',"surface='content'","surface='v2Text'",'the message content on the v2 text surface'),
 ('m5-s6',C+'ComponentEditors/TextDisplayEditor.tsx',"surface='v2Text'","surface='content'",'a text display on the content surface'),
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
