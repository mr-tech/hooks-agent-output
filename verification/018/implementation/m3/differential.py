#!/usr/bin/env python3
"""M3-c differential: set of linted files (path membership) and per rule id the finding count.
Usage: differential.py <base.json> <new.json> <base root> <new root>   (roots stripped from file paths)"""
import json, sys
from collections import Counter
def load(p, root):
    d = json.load(open(p)); files = {}; rules = Counter(); sev = Counter()
    for f in d:
        n = f["filePath"]; n = n[len(root):].lstrip("/") if n.startswith(root) else n
        files[n] = len(f["messages"])
        for m in f["messages"]:
            rules[m.get("ruleId") or "(parse/no rule)"] += 1; sev[m["severity"]] += 1
    return files, rules, sev
bf, br, bs = load(sys.argv[1], sys.argv[3]); nf, nr, ns = load(sys.argv[2], sys.argv[4])
print("files: base", len(bf), "new", len(nf))
print("only in base:", sorted(set(bf) - set(nf)))
print("only in new:", sorted(set(nf) - set(bf)))
print("findings: base", sum(br.values()), "(errors %d, warnings %d)" % (bs[2], bs[1]), "new", sum(nr.values()), "(errors %d, warnings %d)" % (ns[2], ns[1]))
ids = sorted(set(br) | set(nr)); diff = [i for i in ids if br[i] != nr[i]]
print("rule ids whose count differs: %d of %d" % (len(diff), len(ids)))
for i in diff: print("%s\t%d\t%d\t%+d" % (i, br[i], nr[i], nr[i] - br[i]))
