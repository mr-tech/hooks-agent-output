"""AN-6 scoring (analysis 019): per-character (style set, is-marker) from Discord's own legacy text-box table
(339200) and native token mapping (818948), each run under Node, against the text box's DOM as captured by the
research walk (tb-all-clean.json). usage: an6-score.py <tb-all-clean.json> <an6-textbox.json>"""
import json, sys

tb = {o['id']: o for o in json.load(open(sys.argv[1]))}
run = {r['id']: r for r in json.load(open(sys.argv[2]))['rows']}

DOM_STY = {'bold_': 'b', 'italics_': 'i', 'underline_': 'u', 'strikethrough_': 's', 'spoiler_': 'sp', 'inlineCode_': 'c',
           'fakeLink_': 'a', 'subtext_': 'sub', 'codeBlockText_': 'cb', 'silentPrefix_': 'silent'}
DOM_SYN = {'syntaxBefore_', 'syntaxAfter_', 'syntaxOverride_', 'codeBlockSyntax_'}
ATT_STY = {'strong': 'b', 'em': 'i', 'looseEm': 'i', 'u': 'u', 's': 's', 'spoiler': 'sp', 'inlineCode': 'c', 'subtext': 'sub',
           'url': 'a', 'autolink': 'a', 'mailto': 'a', 'tel': 'a', 'link': 'a', 'codeBlockText': 'cb', 'silentPrefix': 'silent'}
ATT_SYN = {'syntaxBefore', 'syntaxAfter', 'codeBlockSyntax'}


def dom_chars(o):
    out = []
    for li, l in enumerate(o['lines']):
        if 'codeLine_' in l['cls'] or 'blockquoteContainer_' in l['cls']:
            return None, 'block element (code line or quote) in the box'
        if li:
            out.append(None)
        for it in l['items']:
            if 'cls' not in it:
                return None, 'inline object in the box'
            syn = any(c in DOM_SYN for c in it['cls'])
            st = frozenset() if syn else frozenset(DOM_STY[c] for c in it['cls'] if c in DOM_STY)
            out += [(st, syn)] * len(it['text'])
    return out, None


def table_chars(lines_entries, text):
    lines = text.split('\n')
    out = []
    for li, line in enumerate(lines):
        if li:
            out.append(None)
        cells = [(frozenset(), False)] * len(line)
        for e in (lines_entries[li] or []):
            syn = any(a in ATT_SYN for a in e['attributes'])
            st = frozenset() if syn else frozenset(ATT_STY[a] for a in e['attributes'] if a in ATT_STY)
            for i in range(e['start'], min(len(line), e['start'] + len(e['text']))):
                cells[i] = (st, syn)
        out += cells
    return out


def fmt(text, seq):
    return ' '.join(f"{json.dumps(ch)[1:-1]}:{'~' if s[1] else ''}{'+'.join(sorted(s[0])) or '-'}"
                    for ch, s in zip(text, seq) if s is not None)


res = {k: [] for k in ('legacy=dom', 'legacy!=dom', 'native=dom', 'native!=dom', 'native=legacy', 'native!=legacy')}
skipped = {}
for cid, o in tb.items():
    r = run[cid]
    d, why = dom_chars(o)
    boxtext = ''.join(it.get('text', '') for l in o['lines'] for it in l['items'])
    if d is not None and boxtext != o['text'].replace('\n', ''):
        d, why = None, 'box text differs from typed text'
    if d is None:
        skipped[cid] = why
        continue
    if len(d) != len(o['text']):
        skipped[cid] = 'length mismatch'
        continue
    lg = table_chars(r['legacy'], o['text'])
    nt = table_chars(r['native'], o['text'])
    for name, a, b in (('legacy', lg, d), ('native', nt, d)):
        res[f'{name}=dom' if a == b else f'{name}!=dom'].append(cid)
    res['native=legacy' if nt == lg else 'native!=legacy'].append(cid)
    if nt != lg or lg != d:
        print(f"#{cid} {json.dumps(o['text'], ensure_ascii=False)}\n   dom:    {fmt(o['text'], d)}\n   legacy: {fmt(o['text'], lg)}\n   native: {fmt(o['text'], nt)}")
print()
print('compared', sum(len(res[k]) for k in ('native=legacy', 'native!=legacy')), 'skipped', len(skipped))
for k, v in res.items():
    print(k, len(v), v)
print('skipped:', json.dumps(skipped))
