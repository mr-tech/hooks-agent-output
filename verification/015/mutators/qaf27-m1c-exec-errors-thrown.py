p='src/server/auth.ts'
s=open(p).read()
old="    redis.clearUser(userDbId, sessionToken, account.providerAccountId),"
new="""    redis.clearUser(userDbId, sessionToken, account.providerAccountId).then((results) => {
      for (const [err] of results as unknown as [Error | null, unknown][]) if (err) throw err;
    }),"""
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
