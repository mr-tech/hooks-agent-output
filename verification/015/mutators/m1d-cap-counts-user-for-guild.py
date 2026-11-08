p='src/server/api/utils/shared.ts'
s=open(p).read()
old="messageCountQuery.where('fk_guilds_id', '=', guildId)"
new="messageCountQuery.where('fk_users_id', '=', guildId)"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
