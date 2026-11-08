p='src/server/auth.ts'
s=open(p).read()
old="""      .execute(),
  ]);
}

interface AuthCallbackParams"""
new="""      .execute(),
    getPostgres().deleteFrom('Sessions').where('userId', '=', userDbId).execute(),
  ]);
}

interface AuthCallbackParams"""
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
