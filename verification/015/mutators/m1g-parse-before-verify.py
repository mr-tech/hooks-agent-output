p='src/pages/api/interactions-edge.ts'
s=open(p).read()
a="""  if (!isValid || req.body === null) {
    return new NextResponse('invalid request signature', { status: 401 });
  }

  const interaction = JSON.parse(rawBody) as IncomingInteraction;
"""
b="""  const interaction = JSON.parse(rawBody) as IncomingInteraction;

  if (!isValid || req.body === null) {
    return new NextResponse('invalid request signature', { status: 401 });
  }
"""
assert s.count(a)==1
open(p,'w').write(s.replace(a,b))
