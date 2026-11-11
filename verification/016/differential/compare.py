"""Compare AC1-9 results of two trees (plan 016): per class, the inputs whose validateMessage
('vm') or validateContentRequirements ('vcr') result moved. Class (a) and (c) admit no movement;
class (b) movement is listed for disposition against the ledger's L1 to L10 classes.
Usage: python3 -I compare.py <inputs.json> <base.json> <tip.json>"""
import json, sys, collections
inp, b, t = (json.load(open(p)) for p in sys.argv[1:4])
bad = 0
for cls in 'abc':
    mv = [i for i in range(len(b[cls])) if b[cls][i] != t[cls][i]]
    vcr = [i for i in mv if b[cls][i]['vcr'] != t[cls][i]['vcr']]
    print(f"class {cls}: n={len(b[cls])} vm-or-vcr moved={len(mv)} vcr moved={len(vcr)}")
    for k, v in collections.Counter((b[cls][i]['vm'] or 'PASS', t[cls][i]['vm'] or 'PASS') for i in mv).most_common(8):
        print(f"   {v} x {k[0]!r} -> {k[1]!r}")
    if cls in 'ac' and mv: bad += 1
    if cls == 'b':
        for i in mv: print('   b moved:', json.dumps(inp['b'][i]['input'])[:200])
print('VERDICT', 'MOVEMENT IN A NO-MOVEMENT CLASS' if bad else 'no movement in (a) or (c)')
sys.exit(1 if bad else 0)
