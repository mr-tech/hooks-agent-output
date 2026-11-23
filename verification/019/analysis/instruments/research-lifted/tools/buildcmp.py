"""Locate the markdown modules by content in each downloaded build and compare them.
usage: buildcmp.py <dir> [<dir> ...]   (each dir holds js/*.js)"""
import glob, hashlib, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mods import index
PRED = {
    'rules':   ['EMBED_TITLE_RULES', 'INLINE_REPLY_RULES', 'looseEm'],
    'facade':  ['parseEmbedTitle', 'parseTopic', 'parseInlineReply', 'parseToAST'],
    'smd':     ['simple-markdown: outputFor'],
    'heading': ['allowHeading&&', 'requiredFirstCharacters:[" ","#"]'],
    'subtext': ['allowSubtext', '-# +'],
    'list':    ['%INDENT_CAPTURE_PATTERN%'],
    'link':    ['foundNestedMaskedLink', 'Provided protocol is not allowed'],
    'glue':    ['./discord_markdown_wasm_bg.js'],
    'wasmapi': ['@discord/markdown-wasm is not initialised'],
    'flags':   ['MULTILINE_QUOTE:', 'ASTERISK_ITALIC:'],
    'gate':    ['native-markdown"', 'enable_native_markdown'],
    'slatemap':['Slate: Unknown markdown rule'],
    'nativedeco':['subtext_marker', 'codeBlockSyntax'],
}
def strip_ids(body):
    body = re.sub(r'^\d+', 'ID', body)
    return re.sub(r'\bn\((\d+)\)|\br\((\d+)\)', 'REQ', body)
for d in sys.argv[1:]:
    found = {k: [] for k in PRED}
    wasm = set()
    for f in sorted(glob.glob(os.path.join(d, 'js', '*.js'))):
        data, mods = index(f)
        if not any(all(n in data for n in ns) for ns in PRED.values()):
            continue
        for mid, a, b in mods:
            body = data[a:b]
            for k, ns in PRED.items():
                if all(n in body for n in ns):
                    found[k].append((mid, os.path.basename(f).split('.')[0], b - a,
                                     hashlib.sha256(body.encode()).hexdigest()[:10],
                                     hashlib.sha256(strip_ids(body).encode()).hexdigest()[:10]))
            if 'markdown_wasm' in body or 'markdown-wasm' in body:
                pass
        for m in re.finditer(r'r\.p\+"([0-9a-f]{16}\.wasm)"', data):
            wasm.add(m.group(1))
    print('==', d)
    for k, v in found.items():
        print(f'  {k:10s}', ' | '.join(f'id {m} chunk {c} size {s} sha {h} sha-idless {h2}' for m, c, s, h, h2 in v) or 'NOT FOUND')
