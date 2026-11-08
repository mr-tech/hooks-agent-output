p='src/env.mjs'
s=open(p).read()
old="prop !== 'NODE_ENV'"
new="!prop === 'NODE_ENV'"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
