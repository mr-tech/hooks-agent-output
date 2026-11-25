# usage: python3 -I an3-compare.py ; re-classifies the captured DOM (an3-dom.json) with the browser classifier's rules, the mention
# rule made case-insensitive (the in-page run's /mention/ missed class "channelMention"), and compares with an3-legacy-tree.json's
# non-text kinds per surface. Control: the same DOM against legacySurfaceParse's fieldValue reading, which has no heading, must differ.
import json, re
from html.parser import HTMLParser
class C(HTMLParser):
    def __init__(s): super().__init__(); s.out=[]; s.stack=[]
    def handle_starttag(s, t, a):
        a=dict(a); c=a.get('class') or ''; anc=s.stack
        inside=lambda p: any(re.search(p, x, re.I) for x in anc)
        k=None
        if re.fullmatch(r'h[1-3]', t): k='heading'
        elif t in ('strong','em','u','s'): k=t
        elif t=='code': k='codeBlock' if 'pre' in [x.split(' ')[0] for x in anc] else 'inlineCode'
        elif re.search('spoilerContent', c) and not inside('spoilerContent'): k='spoiler'
        elif t=='a' and not re.search('mention', c, re.I): k='link'
        elif t=='img' and a.get('data-type')=='emoji': k='emoji'
        elif re.search('mention', c, re.I) and not inside('mention'): k='channelMention'
        elif re.search('blockquoteContainer', c): k='blockQuote'
        elif t in ('ul','ol'): k='list'
        if k: s.out.append(k)
        if t not in ('img','br','path','input','meta'): s.stack.append(t+' '+c)
    def handle_endtag(s, t):
        if t in ('img','br','path','input','meta'): return
        for i in range(len(s.stack)-1,-1,-1):
            if s.stack[i].split(' ')[0]==t: del s.stack[i:]; break
dom=json.loads(json.load(open('an3-dom.json'))); leg=json.load(open('an3-legacy-tree.json'))
def kinds(h): p=C(); p.feed(h); return p.out
print('client build', dom['build'], '| oracle build', leg['buildNumber'])
for r, l in zip(dom['rows'], leg['rows']):
    a=kinds(r['html']); b=[k for k in l['kinds'] if k!='text']
    print(r['id'], l['surface'], 'EQUAL' if a==b else 'DIFFER'); print('  DOM   ', a); print('  legacy', b)
ctl=[k for k in leg['rows'][0]['kinds'] if k!='text' and k!='heading']
print('control (DOM vs a reading without heading):', 'DIFFER (fires)' if kinds(dom['rows'][0]['html'])!=ctl else 'EQUAL (control failed)')
