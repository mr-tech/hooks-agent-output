"""AN-3 table (analysis 019): surface x Syntax bit -> legacy (Discord's legacy parser under Node, each surface's own call),
native (the native parser's reach on that surface, read from the bundle), rendered (test account 1's DOM).
usage: an3-table.py <bits.json> <an3-legacy-surfaces.json> <an3-dom2.json> <posted-nourl.json> <posted-url.json> <posted-v2.json>"""
import json
import re
import sys

bits = json.load(open(sys.argv[1]))
legacy = {r['bit']: r for r in json.load(open(sys.argv[2]))['rows']}
dom = json.load(open(sys.argv[3]))
dom = json.loads(dom) if isinstance(dom, str) else dom
nourl, url, v2 = (json.load(open(p)) for p in sys.argv[4:7])
dom_by_id = {m['id']: m for m in dom['messages']}

# What the rendered DOM shows for each bit (a construct's element or class), read from V-20's tag table.
MARK = {
    'CUSTOM_EMOJI': r'<img[^>]*class="[^"]*emoji', 'COLON_EMOJI': r'<img[^>]*class="[^"]*emoji', 'UNICODE_EMOJI': r'<img[^>]*class="[^"]*emoji',
    'MASKED_LINK': r'<a\b', 'DETECTED_LINK': r'<a\b', 'AUTO_LINK': r'<a\b', 'CONTACT_LINK': r'<a\b', 'DEV_LINKS': r'<a\b',
    'USER_MENTION': r'class="[^"]*mention', 'CHANNEL_MENTION': r'class="[^"]*[mM]ention', 'ROLE_MENTION': r'class="[^"]*[mM]ention',
    'GAME_MENTION': r'class="[^"]*[mM]ention', 'COMMAND_MENTION': r'class="[^"]*[mM]ention', 'EVERYONE_MENTION': r'class="[^"]*[mM]ention',
    'HERE_MENTION': r'class="[^"]*[mM]ention', 'STATIC_MENTION': r'class="[^"]*[mM]ention', 'TIMESTAMP': r'class="[^"]*timestamp',
    'CODE_BLOCK': r'<pre\b', 'CODE': r'<code class="inline', 'DOUBLE_CODE': r'<code class="inline', 'BOLD': r'<strong\b',
    'ASTERISK_ITALIC': r'<em\b', 'UNDERSCORE_ITALIC': r'<em\b', 'UNDERLINE': r'<u\b', 'STRIKETHROUGH': r'<s\b',
    'SPOILER': r'spoilerContent_', 'HEADING': r'<h[1-3]\b', 'LIST': r'<[uo]l\b', 'QUOTE': r'blockquote', 'MULTILINE_QUOTE': r'blockquote',
    'SUBTEXT': r'<small\b',
}
LEG = {  # legacy node types that realise a bit
    'CUSTOM_EMOJI': {'customEmoji'}, 'COLON_EMOJI': {'emoji'}, 'UNICODE_EMOJI': {'emoji'}, 'MASKED_LINK': {'link'}, 'DETECTED_LINK': {'link'},
    'AUTO_LINK': {'link'}, 'CONTACT_LINK': {'link'}, 'DEV_LINKS': {'link'}, 'USER_MENTION': {'mention'}, 'CHANNEL_MENTION': {'channelMention', 'channel'},
    'ROLE_MENTION': {'roleMention'}, 'GAME_MENTION': {'gameMention'}, 'COMMAND_MENTION': {'commandMention'}, 'EVERYONE_MENTION': {'mention'},
    'HERE_MENTION': {'mention'}, 'STATIC_MENTION': {'staticRouteLink'}, 'TIMESTAMP': {'timestamp'}, 'CODE_BLOCK': {'codeBlock'}, 'CODE': {'inlineCode'},
    'DOUBLE_CODE': {'inlineCode'}, 'BOLD': {'strong'}, 'ASTERISK_ITALIC': {'em'}, 'UNDERSCORE_ITALIC': {'em'}, 'UNDERLINE': {'u'},
    'STRIKETHROUGH': {'s'}, 'SPOILER': {'spoiler'}, 'HEADING': {'heading'}, 'LIST': {'list'}, 'QUOTE': {'blockQuote'},
    'MULTILINE_QUOTE': {'blockQuote'}, 'SUBTEXT': {'subtext'},
}


def dom_embeds(posted):
    out = {}
    for row in posted:
        m = dom_by_id.get(row['message_id'])
        embeds = (m or {}).get('embeds') or []
        for k, e in enumerate(row['embeds']):
            out[e['bit']] = (embeds[k] if k < len(embeds) else None, e['stored'])
        if m is None or len(embeds) != len(row['embeds']):
            print('WARN embed count', row['message_id'], len(embeds), len(row['embeds']))
    return out


A, B = dom_embeds(nourl), dom_embeds(url)
v2row = v2[0]
v2html = (dom_by_id.get(v2row['message_id']) or {}).get('accessoriesHTML') or ''
# Split the V2 message into its text displays in posting order by the case text markers is unreliable, so read per case
# by locating each case's own text display: the n-th text-display container.
v2parts = re.split(r'(?=<div[^>]*class="[^"]*\bmarkup_)', v2html)[1:]

surfaces = [
    ('content (webhook)', None, 'content_webhook'), ('embed description', ('A', 'description'), 'embed_description'),
    ('embed field value', ('A', 'fieldValue'), 'embed_field_value'), ('embed title', ('A', 'title'), 'embed_title'),
    ('embed title, embed has url', ('B', 'title'), 'embed_title_with_url'), ('field name', ('A', 'fieldName'), 'field_name'),
    ('field name, embed has url', ('B', 'fieldName'), 'field_name_embed_has_url'), ('footer', ('A', 'footer'), None),
    ('author name', ('A', 'author'), None), ('V2 text display', ('V2', None), 'text_display_webhook'),
]
NATIVE = {'content (webhook)': 'mask ALL&~DEV_LINKS (minus QUOTES when formatInline)'}

print('| Bit | ' + ' | '.join(s for s, _, _ in surfaces) + ' |')
print('|---|' + '---|' * len(surfaces))
table = {}
for b in bits:
    bit = b['bit']
    cells = []
    for name, src, lkey in surfaces:
        lg = None
        if lkey:
            got = legacy[bit][lkey]
            lg = bool(set(got) & LEG[bit]) if isinstance(got, list) else None
        else:
            lg = False  # footer and author are drawn as plain text (read: renderFooter / renderAuthor)
        rd = None
        if src and src[0] in ('A', 'B'):
            e, stored = (A if src[0] == 'A' else B).get(bit, (None, None))
            html = (e or {}).get(src[1])
            if html is not None and src[0] == 'B' and src[1] == 'title' and MARK[bit] == r'<a\b':
                rd = len(re.findall(r'<a\b', html)) > 1  # the title itself is the embed's link
            else:
                rd = None if html is None else bool(re.search(MARK[bit], html))
        elif src and src[0] == 'V2':
            idx = [x['bit'] for x in bits].index(bit)
            html = v2parts[idx] if idx < len(v2parts) else None
            rd = None if html is None else bool(re.search(MARK[bit], html))
        nat = 'mask' if name in NATIVE else 'none'
        table.setdefault(bit, {})[name] = {'legacy': lg, 'native': nat, 'rendered': rd}
        cell = f"{'L' if lg else '-'}{'' if rd is None else ('/R' if rd else '/-')}"
        if rd is not None and lg is not None and rd != lg:
            cell += ' **≠**'
        cells.append(cell)
    print(f'| {bit} | ' + ' | '.join(cells) + ' |')
json.dump({'v2parts': len(v2parts), 'table': table}, open('an3-table.json', 'w'), indent=1)
print('v2 text displays found', len(v2parts))
