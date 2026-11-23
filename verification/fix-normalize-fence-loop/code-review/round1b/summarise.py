import json,sys,collections
S=sys.argv[1]
fixA={r['text']:r for r in json.load(open(f'{S}/out-fix.json'))}
for d in ['fix2','fix2m']:
  o=[r for r in json.load(open(f'{S}/differential-{d}.json')) if '🙂' not in r['text']]
  c=collections.Counter(inputs=len(o))
  for r in o:
    for k in ['loadRoundTrip','partialRoundTrip','normText','fixedPointMatchesLoader']:
      if not r[k]: c['NOT '+k]+=1
    if r['normThrow']: c['normThrow']+=1
    if r['normUpdatePasses']>0: c['norm upd>0']+=1
    for e in r['edits']:
      c['edits']+=1
      if e['err']: c['edit err']+=1
      if e.get('textOk') is False: c['typeEnd text wrong']+=1
      if e.get('settled') is False: c['not settled']+=1
      if e.get('reloadText') is False: c['reload text differs']+=1
      if e.get('reloadMatches') is False: c['reload shape differs']+=1
    a=fixA[r['text']]
    if any(a[k]!=r[k] for k in ['loadRoundTrip','partialRoundTrip','normText']): c['differs from d3b98cf on text quantities']+=1
    if [e['saved'] for e in a['edits']]!=[e['saved'] for e in r['edits']]: c['edit saved text differs from d3b98cf']+=1
  print(d,'(emoji-free)',dict(sorted(c.items())))
for d in ['fix2','fix2m']:
  print('== fence-lang',d)
  for r in json.load(open(f'{S}/fence-lang-{d}.json')): print(repr(r['text']),r['err'],r['updFirst'],r['updSecond'],r['loaderLangs']==r['normLangs'],r['normLangs'])
