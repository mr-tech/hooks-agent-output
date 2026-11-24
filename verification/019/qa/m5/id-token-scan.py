# ID-token scan (workspace Test Conventions class) over basenames, titles and comment lines of the files listed in argv[1], read at website SHA argv[2]. Positive control on the same run.
import re,subprocess,sys
files=open(sys.argv[1]).read().split(); sha=sys.argv[2]
tok=re.compile(r'\b(m|ms|cr|qa|qaf|fqa|f-qa|ec|d|l|plan|rider)-?[0-9]+[a-z]?\b|\b0[0-9]{2}\b|\b[0-9]{4}-[0-9]{2}-[0-9]{2}\b',re.I)
title=re.compile(r'''\b(describe|it|test)(\.each\([^)]*\))?\s*\(\s*(['"`])(.*?)\3''')
def scan(name,text):
  hits=[]; base=name.rsplit('/',1)[-1]
  if tok.search(base): hits.append(('basename',base))
  for i,l in enumerate(text.splitlines(),1):
    s=l.strip()
    if s.startswith('// escaped:'): continue
    if s.startswith(('//','*','/*')) and tok.search(s): hits.append((i,'comment',s[:100]))
    for m in title.finditer(l):
      if tok.search(m.group(4)): hits.append((i,'title',m.group(4)[:100]))
  return hits
tot=0
for f in files:
  t=subprocess.run(['git','-C','/usr/local/bin/hooks/website','show',sha+':'+f],capture_output=True,text=True).stdout
  h=scan(f,t); tot+=len(h)
  for x in h: print(f,x)
print('files',len(files),'hits',tot)
ctrl=scan('a/x.QAF-12.test.ts',"it('names QAF-12 here', () => {});\n// see CR-7\nit('v2 shape', () => {});\n")
print('control hits',len(ctrl),ctrl)
