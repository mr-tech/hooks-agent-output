#!/usr/bin/env python3
"""Consolidate the chain-015 website mutant definitions at commit c5303ca.

Sources are READ, never executed: each mutator is parsed with ast, so importing or running a
mutator (which writes into a working tree, and some read MUT_ID at import) never happens here.
Tables are literal dicts named MUTANTS (values: (file, old, new[, count]) or a list of
(file, old, new) pairs); one-mutant scripts are sequences of `s.replace(old, new)` calls on the
file named by `p=`. Names and `+` concatenation of string constants are resolved in order.

For every pair, `old` is counted in the exact bytes of `git -C <website> show c5303ca:<file>`.
Status APPLIES iff every pair's count is exactly 1; otherwise NOT-APPLICABLE (a null count
means the file is missing at c5303ca). A mutant with any pair under a __tests__/ directory is
marked test_file=true (kept, not dropped).

Outputs (all in this script's directory):
  website-mutants-all.json, website-mutants-apply.json,
  website-mutants-apply-multipair.json, consolidate-report.txt

Re-run:  python3 -I /usr/local/bin/hooks/agent-output/verification/015/effort-final/consolidate.py
Writes only the four outputs above. Read-only against the website repo (git show only).
"""
import ast
import glob
import json
import os
import subprocess
import sys

REPO = '/usr/local/bin/hooks/website'
COMMIT = 'c5303ca'
V015 = '/usr/local/bin/hooks/agent-output/verification/015'
OUT = os.path.join(V015, 'effort-final')

# Mutator source directories. The first is the chain's mutators/ dir; the second is the CR-26
# (code review) one-mutant set found by the implementer-mutant search (see IMPLEMENTER_NOTE).
SOURCE_DIRS = [
    os.path.join(V015, 'mutators'),
    os.path.join(V015, 'cr-m6-probes', 'cr26-ban', 'mutators'),
]
# Not read: another repo (pig, the M8 rig). The .json twin is not a .py file, so glob skips it.
SKIPPED_BY_INSTRUCTION = {
    os.path.join(V015, 'mutators', 'qa-m8-supplement.py'): 'another repo (M8 rig, pig)',
    os.path.join(V015, 'mutators', 'qa-m8r-mutants.json'): 'another repo (M8 rig, pig); not .py',
}

IMPLEMENTER_NOTE = """\
Implementer / reviewer mutant definitions found (searched verification/015/ and implementation/015-*):
 1. verification/015/mutators/*.py: TAKEN (source group 1; 38 files parsed).
 2. verification/015/cr-m6-probes/cr26-ban/mutators/*.py (button-autofocus-effect-empty,
    editor-onmount-deps-dropped, editor-onmount-effect-empty, usemounted-effect-empty): TAKEN as
    source group 2 (one-mutant scripts; name matches the 'mutator' search criterion). Its
    run-mutants.sh and run-fix-check.sh are runners and were not taken.
 3. Sweep drivers that pick a mutant by MUT_ID from mutators/ and define none:
    verification/015/{m4-d29-sweep.sh, m4-nonjson-sweep.sh, m5-sweep.sh, m6-sweep.sh,
    m7-sweep.sh, qa-m4-sweep.sh, qa-sweep.sh}: NOT TAKEN (no old/new definitions).
 4. M8 rig, pig repo, EXCLUDED with the two skipped mutators files:
    verification/015/m8-local-probe/{qa-m8r-sweep.py (generic runner for the pig JSON set),
    m8-guard-mutants.sh (sed edits on a pig export), probe.cjs}, verification/015/qa-m8-sweep.sh
    (takes a <pig repo> argument), verification/015/cr-m8-probes/* (drift/rk8 probe output).
 5. implementation/015-bug-evaluation-fixes-m2-implementation.md and
    implementation/015-bug-evaluation-fixes-qaf34-qaf35-cr26-implementation.md: name MUT_ID values
    only (e.g. m5h-array-allowed, a qa-r2-supplement.py id); define none: NOT TAKEN.
 6. verification/015/mutation-*.txt and mutation-control-*.txt, m5-enumerations-6c42032.txt:
    run outputs and enumerations, not definitions: NOT TAKEN.
 7. verification/015/mutate-run.sh: the isolated-export runner that consumes MUT_ID: NOT TAKEN.
"""


class Unsupported(Exception):
    """Raised for an AST node the table/replace evaluator does not model."""


def ev(node, env):
    """Evaluate a literal-like expression: constants, bound names, str +, tuples, lists, dicts."""
    if isinstance(node, ast.Constant):
        return node.value
    if isinstance(node, ast.Name):
        if node.id in env:
            return env[node.id]
        raise Unsupported(f'name {node.id!r} not bound at this point')
    if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Add):
        left, right = ev(node.left, env), ev(node.right, env)
        if isinstance(left, str) and isinstance(right, str):
            return left + right
        raise Unsupported('non-string + operand')
    if isinstance(node, ast.Tuple):
        return tuple(ev(e, env) for e in node.elts)
    if isinstance(node, ast.List):
        return [ev(e, env) for e in node.elts]
    if isinstance(node, ast.Dict):
        if any(k is None for k in node.keys):
            raise Unsupported('dict unpacking')
        return {ev(k, env): ev(v, env) for k, v in zip(node.keys, node.values)}
    raise Unsupported(f'unsupported node {type(node).__name__}')


def walk_module(tree):
    """Walk top-level statements in order.

    Returns (env, replace_pairs, replace_error). replace_pairs holds (file, old, new) for every
    two-argument `<name>.replace(old, new)` call, with `file` = the value of `p` at that point.
    A failure to evaluate a replace() call is recorded, not raised, because table scripts also
    contain `src.replace(old, new)` with old/new bound by tuple unpacking.
    """
    env = {}
    replace_pairs = []
    replace_error = None
    for st in tree.body:
        for node in ast.walk(st):
            if (isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                    and node.func.attr == 'replace' and len(node.args) == 2 and not node.keywords):
                try:
                    f = env['p']
                    if not isinstance(f, str):
                        raise Unsupported('p is not a string')
                    replace_pairs.append((f, ev(node.args[0], env), ev(node.args[1], env)))
                except (Unsupported, KeyError) as exc:
                    replace_error = replace_error or f'replace() not evaluable: {exc}'
        if (isinstance(st, ast.Assign) and len(st.targets) == 1
                and isinstance(st.targets[0], ast.Name)):
            name = st.targets[0].id
            try:
                env[name] = ev(st.value, env)
            except Unsupported:
                env.pop(name, None)
    return env, replace_pairs, replace_error


def parse_entry_tuple(key, val):
    """(file, old, new) or (file, old, new, count). Returns (pairs, declared_count)."""
    ok = (isinstance(val, tuple) and len(val) in (3, 4)
          and all(isinstance(x, str) for x in val[:3])
          and (len(val) == 3 or isinstance(val[3], int)))
    if not ok:
        raise Unsupported(f'entry {key!r} is not (file, old, new[, count])')
    return [(val[0], val[1], val[2])], (val[3] if len(val) == 4 else None)


def parse_source(path):
    """Return (format, entries, reason). entries: list of (key, pairs, declared_count)."""
    with open(path, 'rb') as fh:
        tree = ast.parse(fh.read(), filename=path)
    env, rpairs, rerr = walk_module(tree)
    stem = os.path.splitext(os.path.basename(path))[0]
    try:
        if 'MUTANTS' in env:
            table = env['MUTANTS']
            if not isinstance(table, dict):
                return None, [], 'MUTANTS is not a dict literal'
            entries = []
            for key, val in table.items():
                if isinstance(val, list):
                    if not val:
                        raise Unsupported(f'entry {key!r} is an empty list')
                    pairs = []
                    for item in val:
                        p3, _ = parse_entry_tuple(key, item)
                        if len(item) != 3:
                            raise Unsupported(f'entry {key!r}: list items must be 3-tuples')
                        pairs.extend(p3)
                    entries.append((key, pairs, None))
                else:
                    pairs, declared = parse_entry_tuple(key, val)
                    entries.append((key, pairs, declared))
            return 'table(MUTANTS)', entries, None
        if rpairs:
            return 'replace-sequence', [(stem, rpairs, None)], None
        return None, [], f'no MUTANTS table and no replace() pairs ({rerr})'
    except Unsupported as exc:
        return None, [], str(exc)


_blob_cache = {}


def blob(path):
    if path not in _blob_cache:
        res = subprocess.run(['git', '-C', REPO, 'show', f'{COMMIT}:{path}'],
                             capture_output=True)
        _blob_cache[path] = res.stdout if res.returncode == 0 else None
    return _blob_cache[path]


def count_in_commit(path, old):
    data = blob(path)
    if data is None:
        return None  # file missing at COMMIT
    if old == '':
        raise ValueError('empty old string')
    return data.count(old.encode('utf-8'))


def is_test_file(path):
    return '__tests__' in path.split('/')[:-1]


def main():
    os.makedirs(OUT, exist_ok=True)

    sources, unparsed, parsed_info = [], [], []
    for d in SOURCE_DIRS:
        for p in sorted(glob.glob(os.path.join(d, '*.py'))):
            if p in SKIPPED_BY_INSTRUCTION:
                continue
            sources.append(p)

    raw = []
    for path in sources:
        fmt, entries, reason = parse_source(path)
        if reason is not None:
            unparsed.append((path, reason))
            continue
        parsed_info.append((path, fmt, len(entries)))
        stem = os.path.splitext(os.path.basename(path))[0]
        for key, pairs, declared in entries:
            pair_dicts = [{'file': f, 'old': o, 'new': n} for f, o, n in pairs]
            raw.append({'id': f'{stem}:{key}', 'source': path, 'pairs': pair_dicts,
                        'declared_count': declared})

    # Dedupe: identical pair sequences (same file, old and new, in order) collapse to the first.
    unique, dup_count = [], 0
    seen = {}
    for r in raw:
        key = tuple((p['file'], p['old'], p['new']) for p in r['pairs'])
        if key in seen:
            seen[key]['dups'].append(r['id'])
            dup_count += 1
        else:
            r['dups'] = []
            seen[key] = r
            unique.append(r)

    for r in unique:
        counts = [count_in_commit(p['file'], p['old']) for p in r['pairs']]
        r['counts'] = counts
        r['status'] = ('APPLIES' if all(c == 1 for c in counts) else 'NOT-APPLICABLE')
        r['test_file'] = any(is_test_file(p['file']) for p in r['pairs'])

    all_entries = [{
        'id': r['id'],
        'source': r['source'],
        'pairs': r['pairs'],
        'status': r['status'],
        'counts': r['counts'],
        'test_file': r['test_file'],
        'declared_count': r['declared_count'],
        'dups': r['dups'],
    } for r in unique]

    apply_single = [{'id': r['id'], 'file': r['pairs'][0]['file'],
                     'old': r['pairs'][0]['old'], 'new': r['pairs'][0]['new']}
                    for r in unique
                    if r['status'] == 'APPLIES' and not r['test_file'] and len(r['pairs']) == 1]
    apply_multi = [{'id': r['id'], 'pairs': r['pairs']}
                   for r in unique
                   if r['status'] == 'APPLIES' and not r['test_file'] and len(r['pairs']) > 1]

    def dump(name, obj):
        with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh:
            json.dump(obj, fh, indent=2, ensure_ascii=False)
            fh.write('\n')

    dump('website-mutants-all.json', all_entries)
    dump('website-mutants-apply.json', apply_single)
    dump('website-mutants-apply-multipair.json', apply_multi)

    n_applies = len([r for r in unique if r['status'] == 'APPLIES'])
    n_na = len([r for r in unique if r['status'] == 'NOT-APPLICABLE'])
    n_test = len([r for r in unique if r['test_file']])
    n_test_applies = len([r for r in unique if r['test_file'] and r['status'] == 'APPLIES'])
    total = len(unique)
    assert n_applies + n_na == total

    lines = []
    lines.append('consolidate-report: chain 015 website mutants at ' + COMMIT)
    lines.append(f'repo: {REPO}')
    lines.append(f'script: {os.path.join(OUT, "consolidate.py")}')
    lines.append('')
    lines.append(f'Source files parsed: {len(parsed_info)} (of {len(sources)} .py sources read)')
    for path, fmt, n in parsed_info:
        lines.append(f'  {path} | {fmt} | {n} definition(s)')
    lines.append('Source files NOT parsed (could not extract definitions):')
    if unparsed:
        for path, reason in unparsed:
            lines.append(f'  {path} | {reason}')
    else:
        lines.append('  none')
    lines.append('Skipped by instruction (not read):')
    for path, why in SKIPPED_BY_INSTRUCTION.items():
        lines.append(f'  {path} | {why}')
    lines.append('')
    lines.append(f'Raw definitions: {len(raw)}')
    lines.append(f'Duplicates collapsed: {dup_count} (kept entry lists them under "dups")')
    lines.append(f'Unique mutants (website-mutants-all.json entries): {total}')
    lines.append('')
    lines.append('Counts per status (len()):')
    lines.append(f'  total: {total}')
    lines.append(f'  APPLIES: {n_applies}')
    lines.append(f'  NOT-APPLICABLE: {n_na}')
    lines.append(f'  TEST-FILE: {n_test} (of which APPLIES: {n_test_applies})')
    lines.append(f'Runner-format outputs: single-pair APPLIES {len(apply_single)}, '
                 f'multi-pair APPLIES {len(apply_multi)}')
    lines.append('')
    lines.append(f'NOT-APPLICABLE list ({n_na}); counts are per pair, null = file missing:')
    for r in unique:
        if r['status'] != 'NOT-APPLICABLE':
            continue
        parts = []
        for p, c in zip(r['pairs'], r['counts']):
            cs = 'file missing' if c is None else str(c)
            parts.append(f'{p["file"]} old={p["old"][:70]!r} count={cs}')
        dec = '' if r['declared_count'] is None else f' declared_count={r["declared_count"]}'
        lines.append(f'  {r["id"]}{dec}: ' + ' ; '.join(parts))
    lines.append('')
    lines.append('Declared count 2 (the mutator expects two matches) but NOT-APPLICABLE under the'
                 ' every-pair-exactly-once rule:')
    flagged = [r for r in unique if r['declared_count'] == 2 and r['status'] == 'NOT-APPLICABLE']
    for r in flagged:
        lines.append(f'  {r["id"]}: counts={r["counts"]}')
    if not flagged:
        lines.append('  none')
    lines.append('')
    lines.append(IMPLEMENTER_NOTE.rstrip('\n'))

    report = '\n'.join(lines) + '\n'
    with open(os.path.join(OUT, 'consolidate-report.txt'), 'w', encoding='utf-8') as fh:
        fh.write(report)

    print(f'total={total} APPLIES={n_applies} NOT-APPLICABLE={n_na} TEST-FILE={n_test} '
          f'duplicates={dup_count} unparsed={len(unparsed)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
