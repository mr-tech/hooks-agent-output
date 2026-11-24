# usage: python3 -I caret-line-check.py <old.json.gz> <fix.json.gz>
# For each keystroke whose result differs, is the caret on the line just edited (the next line for Enter)?
import gzip, json, sys, collections
a = json.load(gzip.open(sys.argv[1])); b = json.load(gzip.open(sys.argv[2]))
c = collections.Counter(); odd = []
for k in a:
    if a[k]['after'] == b[k]['after']: continue
    f, line, place, key = k.split('|', 3); line = int(line)
    sa = json.loads(a[k]['after'])['s']['anchor']['path'][0]; sb = json.loads(b[k]['after'])['s']['anchor']['path'][0]
    want = line + 1 if key == '<enter>' else line
    ok = lambda s: s == want or (key == '<backspace>' and place == 'start' and s == line - 1)
    c[(ok(sb), ok(sa))] += 1
    if not ok(sb): odd.append(k)
print('(fix caret on expected line, old caret on expected line):', dict(c)); print('fix elsewhere:', odd)
