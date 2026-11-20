#!/usr/bin/env python3
"""Phase 3 open-handoff enumeration for plan 018 (qa-phase-3.md step 1b).
Lists every handoff/*.md (not closed/) with Status Open and prints its whole Review-Trigger
frontmatter value (folded lines joined), plus whether it matches the patterns given.
Usage: python3 -I phase3-open-handoff-triggers.py <record-root> <regex>..."""
import sys, re, pathlib
root = pathlib.Path(sys.argv[1]); pats = [re.compile(p, re.I) for p in sys.argv[2:]]
n_open = n_match = 0
for f in sorted((root / "handoff").glob("*.md")):
    t = f.read_text().split("\n")
    if t[0].strip() != "---": continue
    end = t.index("---", 1)
    fm = t[1:end]
    status = next((l.split(":",1)[1].strip() for l in fm if l.startswith("Status:")), None)
    if status != "Open": continue
    n_open += 1
    trig, on = [], False
    for l in fm:
        if l.startswith("Review-Trigger:"):
            on = True; trig.append(l.split(":",1)[1].strip()); continue
        if on:
            if re.match(r"^[A-Za-z][A-Za-z-]*:", l): break
            trig.append(l.strip())
    val = " ".join(x for x in trig if x).strip()
    hit = [p.pattern for p in pats if p.search(val)]
    if hit: n_match += 1
    print(f"{'MATCH' if hit else '-----'} {f.name} :: {hit} :: {val if val else '<NO Review-Trigger>'}")
print(f"open={n_open} matched={n_match}")
