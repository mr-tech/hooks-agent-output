import sys
p='src/server/auth.ts'
s=open(p).read()
old="  }).catch(() => {});\n}"
new="  }).then((res) => { if (!res.ok) throw new Error('revoke refused'); });\n}"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
