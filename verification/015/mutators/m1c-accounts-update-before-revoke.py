p='src/server/auth.ts'
s=open(p).read()
old="""  if (account.access_token) await revokeAccessToken(account.access_token);

  await Promise.all(["""
new="""  const nulled = getPostgres()
    .updateTable('Accounts')
    .set({ access_token: null, refresh_token: null })
    .where('provider', '=', 'discord')
    .where('providerAccountId', '=', account.providerAccountId)
    .execute();
  if (account.access_token) await revokeAccessToken(account.access_token);
  await nulled;

  await Promise.all(["""
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
