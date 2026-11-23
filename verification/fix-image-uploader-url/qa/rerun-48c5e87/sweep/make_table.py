import glob
import json
import os
import sys

# Usage: python3 -I make_table.py [<mutation-table.json>] [<out.md>]
# Defaults: the newest mutation-table-*.json beside this script, written to table-48c5e87.md beside it.
here = os.path.dirname(os.path.abspath(__file__))
if len(sys.argv) > 1:
    src = sys.argv[1]
else:
    src = max(glob.glob(os.path.join(here, "mutation-table-*.json")), key=os.path.getmtime)
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, "table-48c5e87.md")

with open(src, encoding="utf-8") as fh:
    data = json.load(fh)

lines = ["id | outcome | tests_run | failing_titles"]
for m in data["mutants"]:
    titles = m.get("failing_titles")
    joined = "null" if titles is None else "; ".join(titles)
    lines.append(f"{m['id']} | {m['outcome']} | {m.get('tests_run')} | {joined}")

with open(out, "w", encoding="utf-8") as fh:
    fh.write("\n".join(lines) + "\n")
print(f"source: {src}")
print(f"rows: {len(data['mutants'])}")
print(f"wrote: {out}")
