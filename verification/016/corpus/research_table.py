#!/usr/bin/env python3
"""Read the research's Evidence table and verbatim error bodies from its committed text.

Source: record commit c9f8e3a, research/closed/components-v2-send-validity-2026-11-11.md
(read by `git show`, so a later edit to the working file cannot move the oracle).

Usage: python3 -I research_table.py <agent-output repo> <out.json>
Prints: row count, refused count, accepted count, distinct error bodies.
"""
import json
import re
import subprocess
import sys

COMMIT = "c9f8e3a"
PATH = "research/closed/components-v2-send-validity-2026-11-11.md"

repo, out = sys.argv[1], sys.argv[2]
text = subprocess.run(["git", "-C", repo, "show", f"{COMMIT}:{PATH}"],
                      check=True, capture_output=True, text=True).stdout
lines = text.splitlines()

start = lines.index("## Evidence")
rows = {}
row_re = re.compile(r"^\| ([A-Z]\d+) \|")
for ln in lines[start:]:
    if ln.startswith("## Not established"):
        break
    m = row_re.match(ln)
    if not m:
        continue
    cells = [c.strip() for c in ln.strip().strip("|").split("|")]
    cid, shape, editor, discord, err, send, save, senders = cells
    discord = discord.replace("*", "")
    assert discord in ("accepted", "refused"), (cid, discord)
    eref = re.match(r"(E\d+):", err)
    assert cid not in rows, cid
    rows[cid] = {"shape": shape, "discord": discord, "error_ref": eref.group(1) if eref else None,
                 "send_check": send, "save_schema": save, "senders": senders}

bodies = {}
body_re = re.compile(r"^- (E\d+): `+(.*?)`+$")
for ln in lines[start:]:
    m = body_re.match(ln)
    if m:
        bodies[m.group(1)] = m.group(2)

for cid, r in rows.items():
    if r["discord"] == "refused":
        assert r["error_ref"] in bodies, cid

with open(out, "w", encoding="utf-8") as f:
    json.dump({"commit": COMMIT, "path": PATH, "rows": rows, "error_bodies": bodies}, f, indent=1,
              ensure_ascii=True)
ref = sum(r["discord"] == "refused" for r in rows.values())
print(f"rows={len(rows)} refused={ref} accepted={len(rows) - ref} error_bodies={len(bodies)}")
