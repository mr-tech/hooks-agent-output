p='src/server/api/utils/shared.ts'
s=open(p).read()
old="Number(messageCount) >= MAX_MESSAGES"
new="Number(messageCount) > MAX_MESSAGES"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
