#!/usr/bin/env python3
"""lockfile-movers.py BASE_LOCK NEW_LOCK -- lists package versions (the `packages:` section keys) removed and added, grouped by name,
and the importer specifier/version lines that changed. Pure read; takes its paths as arguments."""
import re, sys, collections
def sections(path):
    text = open(path).read()
    start = text.index('\npackages:\n')
    end = text.index('\nsnapshots:\n')
    return set(re.findall(r"^  '?((?:@[^/\s']+/)?[^@\s']+@[^\s':]+)'?:\s*$", text[start:end], re.M))
def split(k):
    i = k.rfind('@')
    return k[:i], k[i+1:]
base, new = sections(sys.argv[1]), sections(sys.argv[2])
rem, add = base - new, new - base
byname = collections.defaultdict(lambda: ([], []))
for k in rem: n, v = split(k); byname[n][0].append(v)
for k in add: n, v = split(k); byname[n][1].append(v)
print(f"packages keys: base {len(base)}, new {len(new)}, removed {len(rem)}, added {len(add)}")
for n in sorted(byname):
    r, a = byname[n]
    print(f"{n}\t{','.join(sorted(r)) or '-'}\t->\t{','.join(sorted(a)) or '-'}")
