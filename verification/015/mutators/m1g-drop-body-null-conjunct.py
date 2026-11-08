p='src/pages/api/interactions-edge.ts'
s=open(p).read()
old="if (!isValid || req.body === null)"
new="if (!isValid)"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
