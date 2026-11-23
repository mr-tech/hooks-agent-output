"""Rewrite Discord's rendered message DOM to the canonical form of norm.py and compare with both parsers.

usage: domcmp.py <norm-tools-dir> <posted.json> <dom.json> <native.jsonl> <legacy.json> [--show all|diff]
posted.json: [{id, text, message_id, stored}]   dom.json: {message_id: innerHTML}
native.jsonl: one {"in","out"} per line in posted order.   legacy.json: {rows:[{id,out}]}

The DOM does not carry everything a tree does, so three things are blurred on BOTH sides before comparing:
  ts(...) -> ts()   (the DOM holds the rendered date text, not the value and style)
  m(...)  -> m()    (the DOM holds the resolved name, not the id and kind)
  a(url title="…"|…) keeps the title only where the DOM anchor's title differs from Discord's default tooltip.
"""
import html.parser
import json
import re
import sys

sys.path.insert(0, sys.argv[1])
import norm  # noqa: E402

VOID = {'br', 'img', 'path'}


class Tree(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = {'tag': 'root', 'attrs': {}, 'kids': []}
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = {'tag': tag, 'attrs': dict(attrs), 'kids': []}
        self.stack[-1]['kids'].append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i]['tag'] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1]['kids'].append(data)


def classes(n):
    return [re.sub(r'_[A-Za-z0-9_-]{6}$', '_', c) for c in (n['attrs'].get('class') or '').split()]


def flat_text(n):
    if isinstance(n, str):
        return n
    return ''.join(flat_text(k) for k in n['kids'])


def find(n, pred):
    if isinstance(n, str):
        return None
    if pred(n):
        return n
    for k in n['kids']:
        r = find(k, pred)
        if r:
            return r
    return None


UNKNOWN = []


def conv(kids):
    out = []
    for k in kids:
        if isinstance(k, str):
            out.append(norm.text(k))
            continue
        tag, cl = k['tag'], classes(k)
        if tag == 'span' and 'hiddenVisually_' in cl:
            continue
        if tag == 'span' and 'spoilerContent_' in cl:
            inner = find(k, lambda x: 'obscuredTextContentInner_' in classes(x))
            out.append(('sp', '', conv(inner['kids'] if inner else k['kids'])))
        elif tag == 'span' and 'timestamp_' in cl:
            out.append(('ts', '', None))
        elif tag == 'span' and ('mention' in cl or 'roleMention_' in cl or 'channelMention' in cl or 'wrapper_' in cl):
            out.append(('m', '', None))
        elif tag == 'span' and 'emojiContainer_' in cl:
            img = find(k, lambda x: x['tag'] == 'img')
            a = img['attrs']
            if a.get('data-id'):
                out.append(('e', f'c:{a["data-id"]}:{(a.get("data-name") or a.get("alt") or "").strip(":")}:{int(".gif" in a.get("src", "") or "animated=true" in a.get("src", ""))}', None))
            else:
                out.append(('e', 'u:' + a.get('alt', ''), None))
        elif tag == 'span':
            if cl:
                UNKNOWN.append('span.' + '.'.join(cl))
            out.extend(conv(k['kids']))
        elif tag in ('em', 'strong', 'u', 's'):
            out.append(({'em': 'i', 'strong': 'b', 'u': 'u', 's': 's'}[tag], '', conv(k['kids'])))
        elif tag == 'code' and 'inline' in cl:
            out.append(('c', json.dumps(flat_text(k), ensure_ascii=False), None))
        elif tag == 'pre':
            code = find(k, lambda x: x['tag'] == 'code')
            lang = [c for c in classes(code) if c not in ('hljs', 'scrollbarGhostHairline_', 'scrollbar_')]
            out.append(('cb', f'{" ".join(lang)}|{json.dumps(flat_text(code), ensure_ascii=False)}', None))
        elif tag == 'div' and 'blockquoteContainer_' in cl:
            bq = find(k, lambda x: x['tag'] == 'blockquote')
            out.append(('q', '', conv(bq['kids'])))
        elif tag in ('h1', 'h2', 'h3'):
            out.append((tag, '', conv(k['kids'])))
        elif tag == 'small':
            out.append(('sub', '', conv(k['kids'])))
        elif tag == 'ul':
            out.append(('ul', '', [('li', '', conv(li['kids'])) for li in k['kids'] if not isinstance(li, str)]))
        elif tag == 'ol':
            out.append(('ol' + k['attrs'].get('start', ''), '', [('li', '', conv(li['kids'])) for li in k['kids'] if not isinstance(li, str)]))
        elif tag == 'a':
            href = k['attrs'].get('href', '')
            label = conv(k['kids'])
            ltxt = flat_text(k)
            title = k['attrs'].get('title')
            attr = href
            if title is not None and title not in (href, ltxt, f'{ltxt}\n\n({href})'):
                custom = title[:-len(f'\n\n({href})')] if title.endswith(f'\n\n({href})') else title
                attr += f' title={json.dumps(custom)}'
            plain = all(x[0] == 'T' for x in label) and ''.join(x[1] for x in label) == href
            out.append(('a', attr, None if plain else label))
        elif tag == 'br':
            out.append(norm.text('\n'))
        else:
            UNKNOWN.append(tag + '.' + '.'.join(cl))
            out.extend(conv(k['kids']))
    return norm.merge(out)


def blur(s):
    s = re.sub(r'\bts\([^)|]*\)', 'ts()', s)
    s = re.sub(r'\bm\([^)|]*\)', 'm()', s)
    s = re.sub(r'\be\(u:[^)]*\)', 'e(u)', s)   # a shortcode's image carries its name, not the character
    s = re.sub(r'\bcb\([^|"]*\|', 'cb(|', s)     # the DOM carries the highlighter's resolved language, blank when unknown
    return s


def dom_canon(h):
    t = Tree()
    t.feed(h)
    t.close()
    return blur(norm.show(conv(t.root['kids']), True))


def main():
    posted = json.load(open(sys.argv[2], encoding='utf-8'))
    dom = json.load(open(sys.argv[3], encoding='utf-8'))
    nat = [json.loads(l)['out'] for l in open(sys.argv[4], encoding='utf-8')]
    leg = {r['id']: r.get('out') for r in json.load(open(sys.argv[5], encoding='utf-8'))['rows']}
    show = sys.argv[7] if len(sys.argv) > 7 else 'diff'
    tally = {'both': [], 'legacy-only': [], 'native-only': [], 'neither': []}
    for r, n in zip(posted, nat):
        d = dom_canon(dom[r['message_id']])
        a = blur(norm.canon('native', n, True))
        b = blur(norm.canon('sm', leg[r['id']], True))
        key = 'both' if d == a == b else 'legacy-only' if d == b else 'native-only' if d == a else 'neither'
        tally[key].append(r['id'])
        if show == 'all' or key in ('neither', 'native-only'):
            print(f'#{r["id"]} [{key}] {json.dumps(r["stored"], ensure_ascii=False)}\n   dom:    {d}\n   legacy: {b}\n   native: {a}')
    for k, v in tally.items():
        print(k, len(v), v)
    print('unknown dom shapes:', sorted(set(UNKNOWN)))


main()
