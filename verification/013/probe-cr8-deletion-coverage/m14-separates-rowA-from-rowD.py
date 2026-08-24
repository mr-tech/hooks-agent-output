import subprocess, json, os
os.chdir('/tmp/cr8-mut')
MM='src/utils/messageMode.ts'; mm0=open('mm.pristine.ts').read()
def run():
    subprocess.run(['npx','vitest','run','src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts',
                    '--reporter=json','--outputFile=/tmp/cr8o2.json'],capture_output=True,text=True)
    d=json.load(open('/tmp/cr8o2.json'))
    return {t['fullName']:t['status'] for f in d['testResults'] for t in f.get('assertionResults',[])}
# M14: switchToClassic ORs in a stray non-V2 bit. Row A asserts flags === 0 (dies);
# row D asserts only that the V2 bit is clear (survives).
mut = mm0.replace("  next.flags = ((next.flags as number | undefined) ?? 0) & ~IS_COMPONENTS_V2_FLAG;",
                  "  next.flags = (((next.flags as number | undefined) ?? 0) & ~IS_COMPONENTS_V2_FLAG) | 1;")
assert mut != mm0, "M14 did not apply"
open(MM,'w').write(mut)
res=run(); open(MM,'w').write(mm0)
for n,v in res.items():
    if 'applyDisposition' in n and ('row A/settled' in n or 'row D settled' in n):
        print(f"  {v:7s}  {n.split(')')[-1].strip()[:60]}")
