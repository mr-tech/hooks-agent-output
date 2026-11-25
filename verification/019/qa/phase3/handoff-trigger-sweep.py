# usage: python3 -I handoff-trigger-sweep.py <record root> ; QA Phase 3 step 1b for plan 019 (no record tool exists for it).
# Lists every handoff/*.md outside closed/ with Status Open, its whole Review-Trigger value (folded lines joined), and whether
# that value names this verdict (019 / Phase 3 / release-tip) or a production push of website (website + push|release|deploy|production).
import os, re, sys
root = sys.argv[1]; d = os.path.join(root, 'handoff')
def fm(path):
    t = open(path, encoding='utf-8').read()
    if not t.startswith('---'): return {}
    body = t.split('---', 2)[1]; out = {}; key = None
    for line in body.splitlines():
        m = re.match(r'^([A-Za-z][\w-]*):\s?(.*)$', line)
        if m: key = m.group(1); out[key] = m.group(2).strip()
        elif key and line.startswith((' ', '\t')): out[key] += ' ' + line.strip()
    return out
verdict = re.compile(r'\b019\b|slate[- ]formatting|phase 3|release[- ]tip', re.I)
push = re.compile(r'website', re.I); act = re.compile(r'push|releas|deploy|production|prod\b|master|vercel', re.I)
n_open = 0; hits = []
for f in sorted(os.listdir(d)):
    p = os.path.join(d, f)
    if not f.endswith('.md') or not os.path.isfile(p): continue
    h = fm(p)
    if h.get('Status', '').strip().strip('"') != 'Open': continue
    n_open += 1; rt = h.get('Review-Trigger', '')
    why = []
    if verdict.search(rt): why.append('names-verdict')
    if push.search(rt) and act.search(rt): why.append('website-push')
    if why: hits.append((f, ','.join(why), rt))
print(f'open handoffs (Status Open, outside closed/): {n_open}; matching: {len(hits)}')
for f, w, rt in hits: print(f'- {f} [{w}]\n    Review-Trigger: {rt}')
