p='src/server/auth.ts'
s=open(p).read()
old="    messagePromise.catch(() => {});\n"
assert s.count(old)==1
open(p,'w').write(s.replace(old,""))
