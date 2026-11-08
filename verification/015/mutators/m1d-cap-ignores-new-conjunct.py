p='src/server/api/utils/shared.ts'
s=open(p).read()
old="if (!message.id && Number(messageCount) >= MAX_MESSAGES)"
new="if (Number(messageCount) >= MAX_MESSAGES)"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
