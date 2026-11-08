p='src/server/auth.ts'
s=open(p).read()
old="access_token ? redis.fetchUserGuilds(providerAccountId, access_token) : ([] as UserGuild[]),"
new="access_token ? await redis.fetchUserGuilds(providerAccountId, access_token) : [],"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
