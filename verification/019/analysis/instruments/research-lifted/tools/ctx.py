"""Print context around each occurrence of a literal (or regex with -r) in a minified file.
usage: ctx.py [-r] <file> <needle> [before=200] [after=400] [max=10]
"""
import re
import sys

args = sys.argv[1:]
is_re = False
if args and args[0] == '-r':
    is_re = True
    args = args[1:]
path, needle = args[0], args[1]
before = int(args[2]) if len(args) > 2 else 200
after = int(args[3]) if len(args) > 3 else 400
limit = int(args[4]) if len(args) > 4 else 10
data = open(path, encoding='utf-8', errors='replace').read()
pat = re.compile(needle if is_re else re.escape(needle))
hits = [m.start() for m in pat.finditer(data)]
print(f'{path}: {len(data)} chars, {len(hits)} hits of {needle!r}')
for off in hits[:limit]:
    print(f'--- @{off}')
    print(data[max(0, off - before):off + after])
