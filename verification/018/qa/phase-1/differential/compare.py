#!/usr/bin/env python3
"""Compare two save-list differential captures (base, tip) per plan 018 M1-a, M1-b, M1-c.

Usage: python3 -I compare.py <base.json> <tip.json>

Bounds are the plan's M1 table, written here as literals; labels carry `<proc> <site> n=<len> <kind>`.
For each label:
  len <= bound: (plan rev 3 M1-b, M1-i) for the two procedures, where base records k issues the tip carries base's
                first min(k, CAP) issues in order, followed by exactly one summary issue at path [] when k > CAP;
                for the client `import` schema (not capped) the tip equals the base exactly.
  len >  bound: tip must hold exactly one issue, code too_big, maximum == bound, path == the list's path,
                no issue inside the list, and no throw (M1-a); base refused iff tip refused at the six
                sites bounded today (M1-c); at the five new bounds tip refuses (M1-c).
Prints one line per violation and a summary; exits 1 on any violation.
Positive control: run it with base.json as both arguments and a hand-edited tip, or against the base
capture alone with `--self-check`, which must report the over-bound violations base carries today.
"""
import json
import sys

BOUNDS = {'S1': 5, 'S2': 3, 'S3': 10, 'S4': 40, 'S5': 25, 'S6': 3, 'S7': 100, 'S8': 100, 'S9': 10, 'S10': 40, 'S11': 11}
BOUNDED_TODAY = {'S1', 'S2', 'S3', 'S5', 'S9', 'S10'}
CAP = 20  # plan rev 3 M1-i (AD-5), a literal


def within_bound_ok(proc, b, t):
    """M1-b over M1-i's cap; the import schema is not capped (M1-i)."""
    if proc == 'import' or len(b['issues']) <= CAP:
        return b == t
    if 'threw' in t or t['success']:
        return False
    ti = t['issues']
    return ti[:CAP] == b['issues'][:CAP] and len(ti) == CAP + 1 and ti[CAP]['path'] == []
LIST_PATH = {
    'S1': ['components', 0, 'components'], 'S2': ['components', 0, 'components'], 'S3': ['components', 0, 'items'],
    'S4': ['components', 0, 'components'], 'S5': ['embeds', 0, 'fields'], 'S6': ['allowed_mentions', 'parse'],
    'S7': ['allowed_mentions', 'users'], 'S8': ['allowed_mentions', 'roles'], 'S9': ['embeds'], 'S10': ['components'],
}


def list_path(proc, site):
    if site == 'S11':
        return ['recentMessageIds']
    prefix = ['message', 'data'] if proc in ('upsert', 'updatePreferences') else []
    return prefix + LIST_PATH[site]


def check_over(label, proc, site, rec):
    out = []
    bound, path = BOUNDS[site], list_path(proc, site)
    if 'threw' in rec:
        return [f'{label}: threw {rec["threw"]}']
    issues = rec['issues']
    if len(issues) != 1:
        out.append(f'{label}: {len(issues)} issues, want 1')
    for i in issues:
        if i['path'][:len(path)] == path and len(i['path']) > len(path):
            out.append(f'{label}: issue inside the list at {i["path"]}')
    if issues and not (issues[0]['code'] == 'too_big' and issues[0].get('maximum') == bound and issues[0]['path'] == path):
        out.append(f'{label}: first issue {issues[0]}, want too_big max {bound} at {path}')
    return out


def main():
    if sys.argv[1] == '--self-check':
        base = json.load(open(sys.argv[2]))
        bad = []
        for label, rec in base.items():
            proc, site, n, _ = label.split(' ')
            if int(n[2:]) > BOUNDS[site]:
                bad += check_over(label, proc, site, rec)
        print(f'self-check: {len(bad)} over-bound violations in this capture (base must be non-zero)')
        sys.exit(0 if bad else 1)
    base, tip = json.load(open(sys.argv[1])), json.load(open(sys.argv[2]))
    bad = []
    if set(base) != set(tip):
        bad.append(f'label sets differ: {len(set(base) ^ set(tip))} labels')
    for label in sorted(set(base) & set(tip)):
        proc, site, n, kind = label.split(' ')
        n = int(n[2:])
        b, t = base[label], tip[label]
        if n <= BOUNDS[site]:
            if not within_bound_ok(proc, b, t):
                bad.append(f'{label}: within bound, base {b} != tip {t}')
        elif proc == 'import' and ('threw' in b or (kind in ('null', 'number') and site in ('S1', 'S4', 'S10'))):
            # The import schema's preprocess (filterSupportedComponents) runs before any list check: it throws on a
            # null button at S1 and drops non-object elements at S1/S4/S10, so there the tip must equal the base
            # (the bound applies to what the preprocess keeps).
            if b != t:
                bad.append(f'{label}: import preprocess path, base {b} != tip {t}')
        else:
            bad += check_over(label, proc, site, t)
            if site in BOUNDED_TODAY and b['success'] != t['success']:
                bad.append(f'{label}: refusal moved at a site bounded today')
            if site not in BOUNDED_TODAY and t['success']:
                bad.append(f'{label}: over a new bound but accepted')
    for line in bad:
        print(line)
    print(f'{len(base)} base labels, {len(tip)} tip labels, {len(bad)} violations')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
