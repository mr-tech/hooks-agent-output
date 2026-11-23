"""Compare the text box's per-character styling (captured leaves) with what parseLossless tokens imply.
Only cases whose typed text survived unchanged in the box and that hold no inline object are compared."""
import json, sys
tb = json.load(open(sys.argv[1])); los = [json.loads(l)['out'] for l in open(sys.argv[2])]
STY = {'bold_': 'b', 'italics_': 'i', 'underline_': 'u', 'strikethrough_': 's', 'spoiler_': 'sp', 'inlineCode_': 'c', 'fakeLink_': 'a', 'subtext_': 'sub',
       'codeBlockText_': 'cb', 'codeLine_': 'cb'}
SYN = {'syntaxBefore_', 'syntaxAfter_', 'syntaxOverride_', 'codeBlockSyntax_'}
MOD = {'bold': 'b', 'italic': 'i', 'underline': 'u', 'strikethrough': 's', 'spoiler': 'sp'}
def box(o):
    chars = []
    for li, l in enumerate(o['lines']):
        if li: chars.append(('\n', frozenset(), False))
        for it in l['items']:
            if 'cls' not in it: return None
            st = frozenset(STY[c] for c in it['cls'] if c in STY) | (frozenset(['cb']) if 'codeLine_' in l['cls'] else frozenset())
            syn = any(c in SYN for c in it['cls'])
            chars += [(ch, st, syn) for ch in it['text']]
    return chars
def nat(node, n):
    out = [(frozenset(), False)] * n
    def walk(x, st, cb=False, after_marker=False):
        k = x['kind']; t = k['type']
        if x.get('type') == 'token':
            syn = t in ('delimiter', 'code_delimiter', 'escape', 'subtext_marker', 'code_fence') or (t == 'whitespace' and after_marker)
            s2 = st | ({'cb' if cb else 'c'} if t == 'code_content' else set()) | ({'a'} if t == 'url' else set())
            if t in ('code_block_content', 'code_block_text'): s2 = s2 | {'cb'}
            for i in range(x['span']['start'], x['span']['end']): out[i] = (frozenset() if syn else frozenset(s2), syn)
            return
        s2 = set(st)
        if t == 'modifier': s2.add(MOD.get(k['value']['kind'], k['value']['kind']))
        if t == 'subtext': s2.add('sub')
        prev = ''
        for c in x.get('children', []):
            walk(c, s2, cb or t == 'code_block', prev == 'subtext_marker'); prev = c['kind']['type']
    walk(node, set())
    return out
res = {'same': [], 'differ': [], 'skipped': []}
kinds = set()
def collect(x):
    kinds.add(x['kind']['type'])
    for c in x.get('children', []): collect(c)
for o, l in zip(tb, los):
    collect(l)
    b = box(o)
    if b is None or ''.join(c[0] for c in b) != o['text']:
        res['skipped'].append(o['id']); continue
    n = nat(l, len(o['text'].encode('utf-16-le')) // 2)
    if len(n) != len(b): res['skipped'].append(o['id']); continue
    bad = [i for i in range(len(b)) if b[i][0] != '\n' and (b[i][1], b[i][2]) != n[i]]
    if not bad: res['same'].append(o['id'])
    else:
        res['differ'].append(o['id'])
        f = lambda seq: ' '.join(f"{json.dumps(o['text'][i])[1:-1]}:{'~' if s[1] else ''}{'+'.join(sorted(s[0])) or '-'}" for i, s in enumerate(seq))
        print(f"#{o['id']} {json.dumps(o['text'], ensure_ascii=False)}\n   box:    {f([(x[1], x[2]) for x in b])}\n   native: {f(n)}")
for k, v in res.items(): print(k, len(v), v)
print('token and node kinds seen:', sorted(kinds))
