#!/usr/bin/env python3
"""lint-differential.py BASE.json NEW.json BASE_ROOT NEW_ROOT -- per-rule finding counts and linted-file path membership of two ESLint JSON outputs.
Prints: file counts; files only in one side; per rule id: base count, new count, delta (rows where they differ). Pure read."""
import json, sys, collections
b, n, br, nr = sys.argv[1:5]
def load(p, root):
    d = json.load(open(p)); files = {}; rules = collections.Counter()
    for f in d:
        rel = f['filePath'].replace(root.rstrip('/') + '/', '')
        files[rel] = f
        for m in f['messages']:
            rules[m.get('ruleId') or '(none: ' + (m.get('message') or '')[:60] + ')'] += 1
    return files, rules
bf, brules = load(b, br); nf, nrules = load(n, nr)
print(f"files: base {len(bf)}, new {len(nf)}")
print("only in base:", sorted(set(bf) - set(nf)))
print("only in new:", sorted(set(nf) - set(bf)))
print(f"findings: base {sum(brules.values())}, new {sum(nrules.values())}")
rows = []
for r in sorted(set(brules) | set(nrules)):
    if brules[r] != nrules[r]: rows.append((r, brules[r], nrules[r], nrules[r] - brules[r]))
print(f"rule ids whose count differs: {len(rows)} of {len(set(brules) | set(nrules))}")
for r, x, y, d in rows: print(f"{r}\t{x}\t{y}\t{d:+d}")
