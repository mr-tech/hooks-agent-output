"""Compare render-sites results between the base tree and the tip (plan 016 AC1b-1, AC1b-2).

AC1b-1: at the tip, the 'page' mount (the real /preview route) emits no chrome on any fixture.
AC1b-2: on every other mount, each fixture's chrome is identical between trees, except that the tip
may add M1's reason line (a text in M1_REASONS, read from the tip's validateV2Components return
strings by the caller and passed as argv[3]) and, with it, the error border.
Usage: python3 -I compare_render_sites.py <base.json> <tip.json> <m1-reasons.json>
"""
import json, sys
base, tip, reasons = (json.load(open(p)) for p in sys.argv[1:4])
M1 = set(reasons)
FIELDS = ['textError', 'errorBorder', 'errorStateBorderPainted', 'erroringState', 'redText', 'ariaInvalid', 'tooLong']
bad = []; moved = []
for name, r in tip['page'].items():
    if r['textError'] or r['errorBorder'] or r['errorStateBorderPainted'] or r['erroringState'] or r['ariaInvalid'] or r['tooLong']:
        bad.append(f"AC1b-1 page/{name}: {r}")
for mode in [m for m in tip if m != 'page']:
    for name in tip[mode]:
        b, t = base[mode][name], tip[mode][name]
        if all(b[f] == t[f] for f in FIELDS):
            continue
        added = [x for x in t['textError'] if x not in b['textError']]
        removed = [x for x in b['textError'] if x not in t['textError']]
        others = [f for f in FIELDS if f not in ('textError', 'errorBorder') and b[f] != t[f]]
        border_ok = t['errorBorder'] == b['errorBorder'] or (t['errorBorder'] == 1 and b['errorBorder'] == 0 and added)
        if removed or others or not border_ok or any(x not in M1 for x in added) or len(added) > 1:
            bad.append(f"AC1b-2 {mode}/{name}: base {b} tip {t}")
        else:
            moved.append(f"{mode}/{name}: + {added} border {b['errorBorder']}->{t['errorBorder']}")
print(f"fixtures per mode: {len(tip['page'])}; modes: {sorted(tip)}")
print(f"page mount at tip, fixtures with any chrome: {sum(1 for x in bad if x.startswith('AC1b-1'))}")
print(f"allowed movement (M1's line added): {len(moved)}"); [print('  ' + m) for m in moved]
print(f"violations: {len(bad)}"); [print('  ' + x) for x in bad]
sys.exit(1 if bad else 0)
