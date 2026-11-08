p='src/app/_navigation/Redirects/Server.tsx'
s=open(p).read()
old="""  const sessionCookie = cookieStore.get('__Secure-next-auth.session-token')
    ?? cookieStore.get('next-auth.session-token');"""
new="""  void cookieStore;
  const sessionCookie = /(^|;\\s*)(__Secure-)?next-auth\\.session-token=[A-Za-z0-9._=-]*(;|$)/.test((await headers()).get('cookie') ?? '');"""
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
