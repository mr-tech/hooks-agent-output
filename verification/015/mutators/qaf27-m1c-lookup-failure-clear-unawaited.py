p='src/server/auth.ts'
s=open(p).read()
old="    await redis.clearUser(userDbId, sessionToken).catch(() => {});\n    throw err;"
new="    void redis.clearUser(userDbId, sessionToken);\n    throw err;"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
