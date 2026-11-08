p='src/app/_navigation/Redirects/Server.tsx'
s=open(p).read()
old="(await headers()).get('x-pathname') ?? ''"
new="(await headers()).get('x-pathname') ?? '/message/m/0/edit'"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
