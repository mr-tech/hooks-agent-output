"""Reduce an ESLint JSON report to one TSV line per finding: path, line, column, ruleId, severity.

Usage: python3 -I reduce.py <report.json> <tree root> <out.tsv> <files.txt>
"""
import json, sys
report, root, out, files = sys.argv[1:5]
root = root.rstrip('/') + '/'
data = json.load(open(report))
with open(out, 'w') as o, open(files, 'w') as f:
    for entry in sorted(data, key=lambda e: e['filePath']):
        path = entry['filePath'].removeprefix(root)
        f.write(path + '\n')
        for m in entry['messages']:
            o.write(f"{path}\t{m.get('line')}\t{m.get('column')}\t{m.get('ruleId')}\t{m.get('severity')}\n")
