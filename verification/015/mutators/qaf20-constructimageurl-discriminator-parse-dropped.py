p='src/utils/constructImageUrl.ts'
s=open(p).read()
old="typeof discriminator === 'number' ? discriminator : parseInt(discriminator, 10)"
new="discriminator as number"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
