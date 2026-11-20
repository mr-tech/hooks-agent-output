#!/usr/bin/env python3
"""Compare vitest JSON reports by testResults path membership and per-file case counts.
Usage: suite-compare.py <a.json> <b.json> <strip prefix a> <strip prefix b>"""
import json, sys
def load(p, pre):
    d = json.load(open(p)); r = {}
    for t in d["testResults"]:
        n = t["name"]; n = n[len(pre):] if n.startswith(pre) else n
        r[n] = (len(t["assertionResults"]), sum(1 for a in t["assertionResults"] if a["status"] == "passed"))
    return d, r
da, a = load(sys.argv[1], sys.argv[3]); db, b = load(sys.argv[2], sys.argv[4])
print("A: files", len(a), "numTotalTests", da["numTotalTests"], "passed", da["numPassedTests"], "failed", da["numFailedTests"], "success", da["success"])
print("B: files", len(b), "numTotalTests", db["numTotalTests"], "passed", db["numPassedTests"], "failed", db["numFailedTests"], "success", db["success"])
print("only in A:", sorted(set(a) - set(b)))
print("only in B:", sorted(set(b) - set(a)))
diff = [(k, a[k], b[k]) for k in sorted(set(a) & set(b)) if a[k] != b[k]]
print("files in both with differing (cases, passed):", diff)
