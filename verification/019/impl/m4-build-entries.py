import json,re,sys
V='/usr/local/bin/hooks/agent-output/verification/019/impl/'
sig=json.load(open(V+'m4-dom-residue-signatures.json'))
mins=json.load(open(V+'m4-dom-residue-all.json'))
EMO=re.compile('[\U0001F300-\U0001FAFF☀-➿©™‍️\U000e0000-\U000e007f⃣\U0001F1E6-\U0001F1FF]')
RULES=[
 ('F01','bare url the engine links and legacy does not, or links over a different extent', lambda s: re.match(r'^https?://',s) is not None),
 ('F02','emoji inside a masked link', lambda s: re.search(r'\[[^\]]*\]\(',s) is not None and (EMO.search(s) or re.search(r':\w+:|<a?:\w+:\d+>',s)) is not None),
 ('F03','empty masked link, or a destination holding markup', lambda s: re.search(r'\[[^\]]*\]\(',s) is not None),
 ('F04','quote marker with an empty or one-character body', lambda s: re.match(r'^>',s) is not None),
 ('F05','guild-navigation chip', lambda s: '<id:' in s),
 ('F06','emoji, joiner, keycap or flag sequence', lambda s: EMO.search(s) is not None and not re.search(r'[*_~|`]',s)),
 ('F07','list item with an unusual content character', lambda s: re.search(r'\n ?[-*] |^\d+\. |\n\d+\. |^- ',s) is not None),
 ('F08','code span of backtick runs', lambda s: '`' in s and not re.search(r'[*_~|]',s)),
 ('F09','empty or odd heading', lambda s: re.search(r'^\s*#',s) is not None or '\n#' in s),
 ('F10','spoiler runs', lambda s: '||' in s),
 ('F11','strikethrough runs', lambda s: '~~' in s),
 ('F12','unbalanced or empty emphasis run', lambda s: re.search(r'[*_]',s) is not None),
 ('F13','timestamp, mention or special-token chip', lambda s: re.search(r'<[a-z@/:]|@|:\w+:',s) is not None),
 ('F14','whitespace-only or control content', lambda s: s.strip()=='' or re.fullmatch(r'[\t\s]+',s) is not None or s.endswith('  ') or s.startswith('  ')),
]
famOf={}
for surf,v in mins.items():
    for k,ms in v['classes'].items():
        f='F99'
        for code,_,fn in RULES:
            if fn(k): f=code; break
        for m in ms: famOf[(surf,m)]=(f,k)
entries=[];from collections import Counter,defaultdict
cnt=defaultdict(Counter); un=Counter()
for r in sig['rows']:
    f,k=famOf[(r['surface'],r['src'])]
    entries.append({'surface':r['surface'],'src':r['src'],'text':r['text'],'signature':r['signature'],'family':f})
    cnt[f][r['surface']]+=1
    if f=='F99': un[k]+=1
print({f:dict(c) for f,c in sorted(cnt.items())})
print('F99 minimal classes', un.most_common(20))
REASONS={
 'F01':'(c) one adjustment was tried, a bare link of a one-character host, and reached none of the 2,378 inputs; the rest is a text rule over where a url starts and ends, which fails (a)',
 'F02':'(a) legacy reads a masked link holding an emoji by a text rule over the source (G-14); no predicate over the link node and its spans separates the class',
 'F03':'(a) legacy and the engine disagree on an empty masked link or a destination holding markup; the difference is in how the source is cut, not in the tree',
 'F04':'(b) no predicate over the tree defines the class: a quote marker with an empty or one-character body is read differently by the two parsers',
 'F05':'(a) Exclusions X-14: the site draws the five static mentions (the guild-navigation chips) as their source text, where legacy draws a chip node; a rewrite of the tree cannot produce the chip',
 'F06':'(a) legacy and the engine cut an emoji, joiner, keycap or flag sequence at different points; the cut is a text rule',
 'F07':'(b) no predicate over the tree defines the class: a list item after a newline with an unusual content character is read differently',
 'F08':'(b) no predicate over the tree defines the class: a code span of backtick runs is paired differently by the two parsers',
 'F09':'(b) no predicate over the tree defines the class: an empty or odd heading is read differently',
 'F10':'(b) no predicate over the tree defines the class: spoiler delimiter runs are paired differently',
 'F11':'(b) no predicate over the tree defines the class: strikethrough delimiter runs are paired differently',
 'F12':'(b) no predicate over the tree defines the class: unbalanced or empty emphasis runs are paired differently',
 'F13':'(a) Exclusions X-14 and AC-4.4: the site draws a command or game mention as its source text where legacy has a node; legacy also cuts @silent, an out-of-range timestamp and short-code forms by a text rule',
 'F14':'(b) whitespace-only or control content is trimmed differently',
 'F99':'(a) four minimal inputs of backtick, pipe and bracket runs that no family rule names; the engine and legacy cut them differently by a text rule',
}
NAMES={c:n for c,n,_ in RULES}; NAMES['F99']='backtick, pipe and bracket runs no family names'
fams=[{'code':c,'name':NAMES[c],'reason':REASONS[c],'counts':dict(cnt[c])} for c in sorted(cnt)]
json.dump({'families':fams,'entries':entries},open(sys.argv[1],'w'),ensure_ascii=False)
