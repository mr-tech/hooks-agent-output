import subprocess, json, os
os.chdir('/tmp/cr8-mut')
MM='src/utils/messageMode.ts'; mm0=open('mm.pristine.ts').read()
def run_file(path):
    r=subprocess.run(['npx','vitest','run',path,'--reporter=json','--outputFile=/tmp/cr8o.json'],capture_output=True,text=True)
    try: d=json.load(open('/tmp/cr8o.json'))
    except Exception: return None
    return {t['fullName']:t['status'] for f in d['testResults'] for t in f.get('assertionResults',[])}
TARGETS=['src/utils/__tests__/','src/server/api/utils/__tests__/']
open(MM,'w').write(mm0)
base=run_file('src/utils/__tests__')
open(MM,'w').write(mm0.replace("  const next: T = {\n    ...prev,", "  const next: T = {\n    ...prev,\n    embeds: [],"))
mut=run_file('src/utils/__tests__')
open(MM,'w').write(mm0)
if base is None or mut is None:
    print("run failed"); raise SystemExit
newly=[n for n in base if base[n]=='passed' and mut.get(n)=='failed']
print(f"M13 (switchToClassic clears embeds) across ALL of src/utils/__tests__:")
print(f"  baseline passing: {sum(1 for v in base.values() if v=='passed')}")
print(f"  newly failing under M13: {len(newly)}")
for n in newly[:10]: print("   -", n[-95:])
