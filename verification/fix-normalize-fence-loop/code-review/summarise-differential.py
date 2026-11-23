import json,sys,collections
for d in ['base','fix']:
    o=json.load(open(f'{sys.argv[1]}/out-{d}.json'))
    c=collections.Counter()
    for r in o:
        c['inputs']+=1
        for k in ['loadRoundTrip','partialRoundTrip','normText','fixedPointMatchesLoader']:
            if not r[k]: c['NOT '+k]+=1
        if r['normThrow']: c['normThrow']+=1
        if r['normUpdatePasses']>0: c['norm upd>0']+=1
        if r['normUpdatePasses']>2: c['norm upd>2']+=1
        for e in r['edits']:
            c['edits']+=1
            if e['err']: c['edit err '+e['kind']]+=1
            if e.get('textOk') is False: c['typeEnd text wrong']+=1
            if e.get('reNormThrow'): c['reNormThrow']+=1
            if e.get('settled') is False: c['not settled '+e['kind']]+=1
            if e.get('reloadMatches') is False: c['reload mismatch '+e['kind']]+=1
            if e.get('reloadText') is False: c['reload text '+e['kind']]+=1
            if e['upd']>2: c['edit upd>2 '+e['kind']]+=1
    print(d, dict(sorted(c.items())))
