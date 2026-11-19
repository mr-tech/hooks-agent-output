# Applies the class-gap mutant: the producer JSON-encodes the hash only when it contains an 'e'.
import sys; p=sys.argv[1]; s=open(p).read()
a="'message-update', JSON.stringify(hashMessage(message)));"
b="'message-update', ((h) => (h.includes('e') ? JSON.stringify(h) : h))(hashMessage(message)));"
assert s.count(a)==1; open(p,'w').write(s.replace(a,b)); print('applied')
