p='src/server/api/utils/shared.ts'
s=open(p).read()
old="'Messages.name',\n      'Messages.previewImageNonce', 'Guilds.guildId as guildId',\n    ])\n    .where('Messages.id', 'in', messageIds)"
new="\n      'Messages.previewImageNonce', 'Guilds.guildId as guildId',\n    ])\n    .where('Messages.id', 'in', messageIds)"
assert s.count(old)==1, s.count(old)
open(p,'w').write(s.replace(old,new))
assert open(p).read().count(new)>=1
