"""List open handoff/ records (top level, not closed/) and their whole Review-Trigger value (folded lines joined);
flag those whose trigger matches PATTERN (case-insensitive regex). Usage: python3 open-handoff-sweep.py <handoff dir> <pattern>"""
import os, re, sys
d, pat = sys.argv[1], re.compile(sys.argv[2], re.I)
rows = []
for f in sorted(os.listdir(d)):
    p = os.path.join(d, f)
    if not f.endswith('.md') or not os.path.isfile(p): continue
    t = open(p, encoding='utf-8').read()
    m = re.match(r'---\n(.*?)\n---', t, re.S)
    if not m: continue
    fm = m.group(1)
    st = re.search(r'^Status:\s*(.*)$', fm, re.M)
    if not st or st.group(1).strip() != 'Open': continue
    rt = re.search(r'^Review-Trigger:(.*(?:\n[ \t]+.*)*)', fm, re.M)
    trig = ' '.join(rt.group(1).split()) if rt else ''
    rows.append((f, bool(pat.search(trig)), trig))
print(f'open handoffs: {len(rows)}; matching: {sum(r[1] for r in rows)}')
for f, hit, trig in rows:
    if hit: print(f'MATCH {f} :: {trig}')
