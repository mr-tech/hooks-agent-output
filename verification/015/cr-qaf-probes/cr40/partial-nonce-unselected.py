p='src/server/api/utils/shared.ts'
s=open(p).read()
old="'Messages.previewImageNonce', 'Guilds.guildId as guildId',\n    ]);"
new="'Guilds.guildId as guildId',\n    ]);"
assert s.count(old)==1, s.count(old)
open(p,'w').write(s.replace(old,new))
assert open(p).read().count(new)>=1
