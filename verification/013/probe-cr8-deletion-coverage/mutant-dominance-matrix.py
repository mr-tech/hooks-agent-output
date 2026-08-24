import subprocess, re, json, os
os.chdir('/tmp/cr8-mut')
MM='src/utils/messageMode.ts'; IDX='src/utils/index.ts'
mm0=open('mm.pristine.ts').read(); idx0=open('idx.pristine.ts').read()

MUTANTS = {
 'M1 v2 keeps embeds':        (MM, lambda s: s.replace("    content: '',\n    embeds: [],", "    content: '',")),
 'M2 v2 keeps content':       (MM, lambda s: s.replace("    content: '',\n    embeds: [],", "    embeds: [],")),
 'M3 rowE always classic':    (IDX,lambda s: s.replace("    return applyModeSwitch(chosenMode, draft);", "    return applyModeSwitch('classic', draft);")),
 'M4 v2 injects embed':       (MM, lambda s: s.replace("    embeds: [],", "    embeds: [{ title: 'injected' }] as never,")),
 'M5 rowE guard removed':     (IDX,lambda s: s.replace("    if (!chosenMode) {\n      throw new Error('applyDisposition: a chosenMode is required when requiresChoice is true');\n    }\n    return applyModeSwitch(chosenMode, draft);", "    return applyModeSwitch(chosenMode ?? 'v2', draft);")),
 'M6 classic keeps all comps':(MM, lambda s: s.replace("    components: (prev.components ?? []).filter(\n      (c) => (c as { type: number }).type === 1,\n    ),", "    components: (prev.components ?? []),")),
 'M7 classic keeps the bit':  (MM, lambda s: s.replace("  next.flags = ((next.flags as number | undefined) ?? 0) & ~IS_COMPONENTS_V2_FLAG;", "")),
 'M8 v2 omits the bit':       (MM, lambda s: s.replace("    flags: ((prev.flags as number | undefined) ?? 0) | IS_COMPONENTS_V2_FLAG,", "")),
 'M9 settled always classic': (IDX,lambda s: s.replace("  return applyModeSwitch(disposition.mode, draft);\n}", "  return applyModeSwitch('classic', draft);\n}")),
 'M10 settled always v2':     (IDX,lambda s: s.replace("  return applyModeSwitch(disposition.mode, draft);\n}", "  return applyModeSwitch('v2', draft);\n}")),
 'M11 settled returns draft': (IDX,lambda s: s.replace("  return applyModeSwitch(disposition.mode, draft);\n}", "  return draft;\n}")),
 'M12 classic clears content':(MM, lambda s: s.replace("  const next: T = {\n    ...prev,", "  const next: T = {\n    ...prev,\n    content: '',")),
 'M13 classic clears embeds': (MM, lambda s: s.replace("  const next: T = {\n    ...prev,", "  const next: T = {\n    ...prev,\n    embeds: [],")),
}
def restore():
    open(MM,'w').write(mm0); open(IDX,'w').write(idx0)
def run():
    r=subprocess.run(['npx','vitest','run','src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts',
                      '--reporter=json','--outputFile=/tmp/cr8-out.json'],capture_output=True,text=True)
    d=json.load(open('/tmp/cr8-out.json'))
    out={}
    for f in d['testResults']:
        for t in f.get('assertionResults',[]):
            out[t['fullName']]=t['status']
    return out
restore(); base=run()
applier={k:v for k,v in base.items() if 'applyDisposition' in k}
names=sorted(applier)
print(f"applyDisposition block: {len(names)} tests, all {set(applier.values())} at baseline\n")
kill={n:set() for n in names}
for mname,(path,fn) in MUTANTS.items():
    restore(); s=open(path).read(); s2=fn(s)
    if s2==s: print(f"  !! {mname}: MUTATION DID NOT APPLY -- skipping (would be a false 'survives')"); continue
    open(path,'w').write(s2)
    res=run()
    killed=[n for n in names if res.get(n)=='failed']
    for n in killed: kill[n].add(mname)
    print(f"{mname:28s} kills {len(killed)}/{len(names)}")
restore()
print("\n--- kill sets ---")
for n in names: print(f"  {n.split(chr(41))[-1].strip()[:46]:48s} {sorted(x.split()[0] for x in kill[n])}")
print("\n--- DOMINANCE: is any test's kill set a subset of another's? ---")
dom=False
for a in names:
    for b in names:
        if a!=b and kill[a] and kill[a] <= kill[b] and kill[a]!=kill[b]:
            print(f"  DOMINATED: '{a.split('>')[-1].strip()[:50]}' < '{b.split('>')[-1].strip()[:50]}'"); dom=True
        elif a<b and kill[a]==kill[b] and kill[a]:
            print(f"  EQUAL kill sets: '{a.split('>')[-1].strip()[:44]}' == '{b.split('>')[-1].strip()[:44]}'"); dom=True
empty=[n for n in names if not kill[n]]
for n in empty: print(f"  KILLS NOTHING in this mutant set: {n.split('>')[-1].strip()[:60]}")
if not dom and not empty: print("  none - every test has a distinct, non-empty kill set")
