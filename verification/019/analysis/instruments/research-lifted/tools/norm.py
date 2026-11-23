"""Normalise parser outputs to one canonical string form so different implementations can be compared.

Canonical inline forms: text is a JSON string; b() i() u() s() sp() c("…") a(url|label…) e(u:…) e(c:id:name:anim)
ts(value:style) m(kind:id). Blocks: h1..h3() sub() q() ul() ol<start>() li() cb(lang|"…").
Top level: blocks and inline runs in order; line breaks between top-level blocks are dropped and runs of
newlines inside text are kept, then a second "loose" form strips leading/trailing newlines of every text run.
"""
import json
import re


def text(s):
    return ('T', s)


def merge(nodes):
    out = []
    for n in nodes:
        if n is None:
            continue
        if n[0] == 'T' and out and out[-1][0] == 'T':
            out[-1] = ('T', out[-1][1] + n[1])
        elif n[0] == 'T' and n[1] == '':
            continue
        else:
            out.append(n)
    return out


def show(nodes, loose=False):
    parts = []
    for n in nodes:
        if n[0] == 'T':
            s = n[1].strip('\n') if loose else n[1]
            if s or not loose:
                parts.append(json.dumps(s, ensure_ascii=False))
        else:
            name, attr, kids = n
            if loose and name == 'a':
                # Discord stores the WHATWG-serialised URL; a host-only URL gains a trailing slash and a lower-cased scheme and host.
                url, sep, rest = attr.partition(' ')
                m = re.match(r'^([A-Za-z][A-Za-z0-9+.-]*)://([^/?#]*)(.*)$', url)
                if m and m.group(1).lower() in ('http', 'https'):
                    url = f'{m.group(1).lower()}://{m.group(2).lower()}{m.group(3) or "/"}'
                attr = url + sep + rest
            if loose and name == 'cb':
                lang, _, body = attr.partition('|')
                attr = lang + '|' + json.dumps(json.loads(body).strip('\n'), ensure_ascii=False)
            inner = show(kids, loose) if kids is not None else ''
            parts.append(f'{name}({attr}{"|" if attr and kids else ""}{inner})')
    return ' '.join(parts)


# ---------- Discord native (wasm) ----------
def nat_inline(nodes):
    out = []
    for n in nodes or []:
        t = n['type']
        v = n.get('value')
        if t == 'text':
            out.append(text(v))
        elif t in ('bold', 'italic', 'underline', 'strikethrough'):
            out.append(({'bold': 'b', 'italic': 'i', 'underline': 'u', 'strikethrough': 's'}[t], '', nat_inline(v)))
        elif t == 'spoiler':
            out.append(('sp', '', nat_inline(v['content'])))
        elif t == 'code':
            out.append(('c', json.dumps(v, ensure_ascii=False), None))
        elif t == 'link':
            label = nat_inline(v.get('text')) if v.get('text') else None
            attr = v['url'] + (f' title={json.dumps(v["title"])}' if v.get('title') else '')
            out.append(('a', attr, label))
        elif t == 'emoji':
            if v['type'] == 'unicode':
                out.append(('e', 'u:' + v['value'], None))
            else:
                c = v['value']
                out.append(('e', f'c:{str(c["id"]).rstrip("n")}:{c["name"]}:{int(bool(c["animated"]))}', None))
        elif t == 'timestamp':
            out.append(('ts', f'{str(v["value"]).rstrip("n")}:{v.get("style") or ""}', None))
        elif t == 'mention':
            mv = v.get('value')
            if isinstance(mv, dict):
                mv = str(mv.get('id', '')).rstrip('n') if 'id' in mv else ':'.join(str(mv[k]) for k in sorted(mv))
            out.append(('m', f'{v["type"]}:{str(mv).rstrip("n") if mv is not None else ""}', None))
        elif t == 'code_block':
            out.append(('cb', f'{v.get("language") or ""}|{json.dumps(v.get("content"), ensure_ascii=False)}', None))
        else:
            out.append(('?' + t, json.dumps(v, ensure_ascii=False, sort_keys=True), None))
    return merge(out)


def nat_blocks(nodes):
    out = []
    for i, n in enumerate(nodes):
        t = n['type']
        v = n.get('value')
        if t == 'paragraph':
            out.extend(nat_inline(v))
            if i != len(nodes) - 1:
                out.append(text('\n'))
        elif t == 'empty':
            out.append(text('\n'))
        elif t == 'heading':
            out.append((f'h{v["level"]}', '', nat_inline(v['content'])))
        elif t == 'subtext':
            out.append(('sub', '', nat_inline(v['content'])))
        elif t == 'quote':
            out.append(('q', '', nat_blocks(v)))
        elif t == 'list':
            kids = [('li', '', nat_blocks(it['content'])) for it in v['items']]
            out.append((('ol' + str(v.get('value'))) if v['type'] == 'ordered' else 'ul', '', kids))
        elif t == 'code_block':
            out.append(('cb', f'{v.get("language") or ""}|{json.dumps(v.get("content"), ensure_ascii=False)}', None))
        else:
            out.extend(nat_inline([n]))
    return merge(out)


# ---------- simple-markdown family (Discord legacy, website, discord-markdown, discord-markdown-parser) ----------
SM = {'strong': 'b', 'em': 'i', 'u': 'u', 's': 's', 'del': 's', 'strikethrough': 's', 'underline': 'u', 'spoiler': 'sp'}


def sm_nodes(nodes):
    if nodes is None:
        return []
    if isinstance(nodes, str):
        return [text(nodes)]
    if isinstance(nodes, dict):
        nodes = [nodes]
    out = []
    for n in nodes:
        if isinstance(n, list):
            out.extend(sm_nodes(n))
            continue
        t = n.get('type')
        c = n.get('content')
        if t == 'text':
            out.append(text(c if isinstance(c, str) else ''.join(x[1] for x in sm_nodes(c) if x[0] == 'T')))
        elif t in SM:
            out.append((SM[t], '', sm_nodes(c)))
        elif t in ('inlineCode', 'code'):
            out.append(('c', json.dumps(c, ensure_ascii=False), None))
        elif t in ('link', 'url', 'autolink'):
            target = n.get('target', '')
            label = sm_nodes(c)
            flat = ''.join(x[1] for x in label if x[0] == 'T') if all(x[0] == 'T' for x in label) else None
            attr = target + (f' title={json.dumps(n["title"])}' if n.get('title') else '')
            out.append(('a', attr, None if flat is not None and flat == target else label))
        elif t == 'emoji' and n.get('id') is not None:
            out.append(('e', f'c:{n.get("id")}:{str(n.get("name", "")).strip(":")}:{int(bool(n.get("animated")))}', None))
        elif t in ('emoji', 'twemoji'):
            out.append(('e', 'u:' + (n.get('surrogate') or n.get('name') or str(c)), None))
        elif t == 'nameEmoji':
            out.append(('e', 'u:' + n['surrogate'], None) if n.get('surrogate') else text(str(c)))
        elif t == 'slashCommand':
            out.append(('m', f'command:{n.get("id")}', None))
        elif t in ('customEmoji', 'discordEmoji'):
            out.append(('e', f'c:{n.get("emojiId") or n.get("id")}:{str(n.get("name", "")).strip(":")}:{int(bool(n.get("animated")))}', None))
        elif t in ('timestamp', 'discordTimestamp'):
            out.append(('ts', f'{n.get("timestamp")}:{n.get("format") or n.get("style") or ""}', None))
        elif t in ('mention', 'discordUser', 'user'):
            if n.get('id') is not None:
                out.append(('m', f'user:{n["id"]}', None))
            else:
                out.append(('m', f'{str(n.get("text") or c).lstrip("@")}:', None))
        elif t in ('roleMention', 'discordRole', 'role'):
            out.append(('m', f'role:{n.get("id")}', None))
        elif t in ('channelMention', 'discordChannel', 'channel'):
            out.append(('m', f'channel:{n.get("id")}', None))
        elif t in ('discordEveryone', 'everyone', 'here'):
            out.append(('m', f'{str(c if isinstance(c, str) else t).lstrip("@")}:', None))
        elif t == 'commandMention':
            out.append(('m', f'command:{n.get("id")}', None))
        elif t == 'staticRouteLink':
            out.append(('m', f'static:{n.get("id")}', None))
        elif t in ('br', 'newline'):
            out.append(text('\n'))
        elif t == 'paragraph':
            out.extend(sm_nodes(c))
            out.append(text('\n'))
        elif t == 'heading':
            out.append((f'h{n.get("level")}', '', sm_nodes(c)))
        elif t == 'subtext':
            out.append(('sub', '', sm_nodes(c)))
        elif t in ('blockQuote', 'blockquote'):
            out.append(('q', '', sm_nodes(c)))
        elif t == 'list':
            kids = [('li', '', sm_nodes(it)) for it in n.get('items', [])]
            out.append((('ol' + str(n.get('start'))) if n.get('ordered') else 'ul', '', kids))
        elif t in ('codeBlock', 'codeblock'):
            out.append(('cb', f'{n.get("lang") or ""}|{json.dumps(c, ensure_ascii=False)}', None))
        elif t == 'silentPrefix':
            out.append(('silent', '', None))
        else:
            out.append(('?' + str(t), json.dumps({k: v for k, v in n.items() if k != 'type'}, ensure_ascii=False, sort_keys=True, default=str)[:120], None))
    return merge(out)


def canon(kind, out, loose=False):
    nodes = nat_blocks(out) if kind == 'native' else sm_nodes(out)
    s = show(nodes, loose)
    return s
