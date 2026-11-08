p='src/utils/redis/index.ts'
s=open(p).read()
old="  if (discordId) pipeline.del(formatKey('user-guilds', discordId));"
new="  pipeline.del(formatKey('user-guilds', discordId as string));"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
