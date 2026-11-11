"""Build AC1-9's input population (plan 016): three named classes, written to inputs.json.

(a) classic messages, seeded: no V2 structure (no component of type 9 to 17) and the V2 flag clear.
    Content, embeds, username and other flag bits vary, and classic Action Rows carry buttons in
    every L5 to L8 shape (no components key, [], url absent, '', 'abc', 'ftp://', label absent or
    whitespace, emoji {} / {name: ''} / valid) beside valid ones.
(b) every distinct input the base tree's own suite passed to validateMessage or
    validateContentRequirements (class-b-captured-inputs.jsonl, captured by a recording wrapper in
    an export of 0e3d903; the base suite ran 1145 of 1145 with it).
(c) the corpus's accepted members, as AC1-1 passes them: { username: 'Probe', ...body }.
Usage: python3 -I make_inputs.py <corpus fixture .ts> <out.json> [seed] [count]
"""
import json, random, re, sys, subprocess

fixture, out = sys.argv[1], sys.argv[2]
seed = int(sys.argv[3]) if len(sys.argv) > 3 else 16
count = int(sys.argv[4]) if len(sys.argv) > 4 else 20000
rng = random.Random(seed)

def pick(*xs): return rng.choice(xs)
URLS = [None, '', 'abc', 'ftp://example.com', 'https://example.com', 'http://a.b', 'discord://x', ' https://example.com ']
LABELS = [None, '', ' ', ' ', '\u0085', '﻿', 'Go', 'x' * 80]
EMOJI = [None, {}, {'name': ''}, {'name': '🔥'}, {'id': '123', 'name': 'e'}]
def button():
    b = {'type': 2, 'style': pick(5, 5, 5, 1)}
    u = pick(*URLS); l = pick(*LABELS); e = pick(*EMOJI)
    if u is not None: b['url'] = u
    if l is not None: b['label'] = l
    if e is not None: b['emoji'] = e
    if b['style'] != 5: b['custom_id'] = 'cid'
    return b
def row():
    r = {'type': 1}
    k = rng.random()
    if k < 0.1: return r
    r['components'] = [] if k < 0.2 else [button() for _ in range(rng.randint(1, 5))]
    return r
def embed():
    e = {}
    if rng.random() < .6: e['title'] = 't' * pick(0, 1, 256, 257)
    if rng.random() < .6: e['description'] = 'd' * pick(0, 1, 4096, 4097, 3500)
    if rng.random() < .3: e['fields'] = [{'name': pick('', 'n'), 'value': pick('', 'v')} for _ in range(rng.randint(0, 3))]
    if rng.random() < .3: e['footer'] = {'text': 'f' * pick(1, 2049)}
    if rng.random() < .3: e['author'] = {'name': 'a' * pick(1, 257)}
    return e
classic = []
for _ in range(count):
    m = {}
    if rng.random() < .9: m['username'] = pick('Probe', '', 'clyde', 'everyone', 'Captain Hook')
    if rng.random() < .8: m['content'] = pick('', ' ', 'hi', 'x' * 2000, 'x' * 2001, '\u0085')
    if rng.random() < .5: m['embeds'] = [embed() for _ in range(rng.randint(0, 11))]
    if rng.random() < .6: m['components'] = [row() for _ in range(rng.randint(0, 6))]
    if rng.random() < .5: m['flags'] = pick(0, 4, 4096, 4 | 4096)
    classic.append(m)

captured = [json.loads(l) for l in open('class-b-captured-inputs.jsonl')]
seen = set(); b = []
for r in captured:
    k = (r['fn'], json.dumps(r['input'], sort_keys=True))
    if k not in seen: seen.add(k); b.append({'fn': r['fn'], 'input': r['input']})

text = open(fixture, encoding='utf-8').read()
mark = 'DISCORD_V2_SEND_CORPUS: readonly DiscordV2SendCorpusMember[] = '
literal = text[text.index(mark) + len(mark):].rstrip().rstrip(';')
corpus = json.loads(subprocess.run(['node', '-e', f'process.stdout.write(JSON.stringify(require("vm").runInNewContext("("+require("fs").readFileSync(0,"utf8")+")")))'], input=literal, capture_output=True, text=True, check=True).stdout)
c = [{'id': m['id'], 'input': {'username': 'Probe', **m['body']}} for m in corpus if m['discord'] == 'accepted']

json.dump({'seed': seed, 'a': classic, 'b': b, 'c': c}, open(out, 'w'))
print(f"a={len(classic)} b={len(b)} c={len(c)} seed={seed}")
