import subprocess,sys,shutil,os
SRC='/usr/local/bin/hooks/website/'
EXP=os.environ['EXPORT']+'/'
V='/usr/local/bin/hooks/agent-output/verification/019/impl/'
H='src/utils/markdown/__tests__/helpers/discordRouting.ts'
T=['src/utils/markdown/__tests__/discordRouting.predicates.test.ts']
muts=[('m3-r8-q1', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', 'embedReferencesSwitch: referencesSwitch(embed, switchId),', 'embedReferencesSwitch: false,', 'QA-R1 embedReferencesSwitch constant false'), ('m3-r8-q2', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', 'v2ReferencesSwitch: referencesSwitch(v2, switchId),', 'v2ReferencesSwitch: false,', 'QA-R2 v2ReferencesSwitch constant false'), ('m3-r8-q3', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', "parseEmbedTitle: callsFacade(embed, facade, 'parseEmbedTitle'),", 'parseEmbedTitle: true,', 'QA-R3 parseEmbedTitle constant true'), ('m3-r8-q4', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', "parseEmbedTitleWithoutLinks: callsFacade(embed, facade, 'parseEmbedTitleWithoutLinks'),", 'parseEmbedTitleWithoutLinks: true,', 'QA-R4 parseEmbedTitleWithoutLinks constant true'), ('m3-r8-q5', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', "parseRichEmbedText: callsFacade(embed, facade, 'parseRichEmbedText'),", 'parseRichEmbedText: true,', 'QA-R5 parseRichEmbedText constant true'), ('m3-r8-q6', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', "v2CallsParse: callsFacade(v2, facade, 'parse'),", 'v2CallsParse: true,', 'QA-R6 v2CallsParse constant true'), ('m3-r8-s1', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', 'embedReferencesSwitch: referencesSwitch(embed, switchId),', 'embedReferencesSwitch: referencesSwitch(v2, switchId),', 'embed reads the V2 module for the switch'), ('m3-r8-s2', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', "v2CallsParse: callsFacade(v2, facade, 'parse'),", "v2CallsParse: callsFacade(embed, facade, 'parse'),", 'V2 call read from the embed module'), ('m3-r8-s3', 'src/utils/markdown/__tests__/helpers/discordRouting.ts', '], fetcher);', ']);', 'the fetcher is not passed on')]
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
