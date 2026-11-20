"""Apply one exact-once replacement from a JSON list to an export. Usage: apply-replacement.py <file.json> <id> <export-dir>"""
import json
import sys

mfile, mid, export = sys.argv[1:4]
rows = json.load(open(mfile))
row = next(r for r in rows if r["id"] == mid)
path = f"{export}/{row['file']}"
text = open(path).read()
count = text.count(row["old"])
assert count == 1, f"{mid}: old occurs {count} times"
open(path, "w").write(text.replace(row["old"], row["new"]))
print("applied", mid, row["file"])
