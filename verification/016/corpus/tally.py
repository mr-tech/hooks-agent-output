#!/usr/bin/env python3
"""Scripted tally of plan 016's Requirement ledger against the research's Evidence table.

Reads the ledger from the plan at a named record commit (`git show`) and the Evidence table from
research-table.json (research_table.py's output). Expands ranges written "B1–B4" (en dash) and
checks, for the case-id tokens of the "Measured refused" and "Measured accepted, must pass" columns:

  1. every Evidence id appears exactly once across those cells;
  2. no ledger token names an id the Evidence table lacks (non-id prose such as "1025 chars" is
     listed, not counted);
  3. each id sits in the column matching Discord's measured verdict.

Usage: python3 -I tally.py <agent-output repo> <plan commit> <research-table.json>
Exit 0 only when all three hold.
"""
import json
import re
import subprocess
import sys

repo, commit, rt_path = sys.argv[1], sys.argv[2], sys.argv[3]
plan = subprocess.run(["git", "-C", repo, "show", f"{commit}:planning/016-send-check-validity.md"],
                      check=True, capture_output=True, text=True).stdout
rows = json.load(open(rt_path, encoding="utf-8"))["rows"]

lines = plan.splitlines()
i = next(n for n, ln in enumerate(lines) if ln.startswith("| L | Limb"))
ledger = []
for ln in lines[i + 2:]:
    if not ln.startswith("| L"):
        break
    cells = [c.strip() for c in ln.strip().strip("|").split("|")]
    ledger.append((cells[0], cells[2], cells[3]))

ID = re.compile(r"\b([A-Z])(\d+)(?:\s*[–-]\s*\1?(\d+))?\b")


def expand(cell):
    ids, prose = [], []
    # strip parenthetical prose before tokenising, but keep it for the report
    for paren in re.findall(r"\(([^)]*)\)", cell):
        prose.append(paren)
    bare = re.sub(r"\([^)]*\)", "", cell)
    for part in re.split(r"[;,]", bare):
        part = part.strip()
        if not part or part == "—":
            continue
        m = re.fullmatch(r"([A-Z])(\d+)(?:\s*[–-]\s*([A-Z])?(\d+))?", part)
        if not m:
            prose.append(part)
            continue
        letter, a, l2, b = m.group(1), int(m.group(2)), m.group(3), m.group(4)
        if b is None:
            ids.append(f"{letter}{a}")
        else:
            assert l2 in (None, letter), part
            ids.extend(f"{letter}{k}" for k in range(a, int(b) + 1))
    return ids, prose


seen = {}
problems = []
for limb, refused, accepted in ledger:
    for col, cell, want in (("refused", refused, "refused"), ("accepted", accepted, "accepted")):
        ids, prose = expand(cell)
        for p in prose:
            print(f"prose  {limb} {col}: {p!r}")
        for cid in ids:
            seen.setdefault(cid, []).append((limb, col))
            if cid not in rows:
                problems.append(f"{limb} {col}: {cid} not in the Evidence table")
            elif rows[cid]["discord"] != want:
                problems.append(f"{limb} {col}: {cid} is Discord-{rows[cid]['discord']}")

for cid in rows:
    if cid not in seen:
        problems.append(f"{cid} appears in no ledger cell")
    elif len(seen[cid]) > 1:
        problems.append(f"{cid} appears {len(seen[cid])} times: {seen[cid]}")

ref = sorted(c for c, v in seen.items() if any(col == "refused" for _, col in v))
acc = sorted(c for c, v in seen.items() if any(col == "accepted" for _, col in v))
print(f"ledger ids: refused={len(ref)} accepted={len(acc)} distinct={len(seen)}; "
      f"evidence rows={len(rows)}")
for p in problems:
    print("PROBLEM", p)
sys.exit(1 if problems else 0)
