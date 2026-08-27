#!/usr/bin/env python3
"""QA Phase 2 instrument — plan 014 M5 step 2.

Checks the CLAUDE.md positive-form basename predicate in BOTH directions, and
reconciles the rev-14 widening (module anchor ^[a-z] -> ^[A-Za-z]) against the
whole enumerated class rather than against the instances that revealed it.

Run from the `website` repo root:  python3 <this file>
"""
import os
import re
import sys

OLD = re.compile(r'^[a-z][a-zA-Z0-9-]*\.[a-z][a-zA-Z0-9-]*\.test\.tsx?$')
NEW = re.compile(r'^[A-Za-z][a-zA-Z0-9-]*\.[a-z][a-zA-Z0-9-]*\.test\.tsx?$')
ID_TOKEN = re.compile(
    r'\b(m|ms|cr|qa|fqa|f-qa|ec|d|l|plan|rider)-?[0-9]+[a-z]?\b|\b[0-9]{3}\b|\b\d{4}-\d{2}-\d{2}\b',
    re.I)

# Both-directions controls. Each states the answer the predicate MUST give.
# A control counts as installed only once observed to fire.
CONTROLS = [
    # (basename, must_match_NEW, why)
    ('JsonModalBody.load-settled-notice.test.tsx', True,
     'PascalCase MODULE segment — the rev-14 widening; must be admitted'),
    ('messageValidity.predicate.test.ts', True,
     'camelCase module — admitted before and after the widening'),
    ('JsonModalBody.LoadSettledNotice.test.tsx', False,
     'PascalCase BEHAVIOUR segment — behaviour anchor stays ^[a-z]; must be REJECTED'),
    ('JsonModalBody.test.tsx', False,
     'no behaviour segment at all; must be REJECTED'),
    ('json-modal-body.load-settled-notice.test.js', False,
     'wrong extension; must be REJECTED'),
    ('012-message-mode.test.ts', False,
     'leading digits — not a letter anchor; must be REJECTED'),
]


def collect(root):
    out = []
    for dirpath, _dirnames, filenames in os.walk(root):
        if 'node_modules' in dirpath.split(os.sep):
            continue
        for fn in filenames:
            if fn.endswith(('.test.ts', '.test.tsx', '.spec.ts')):
                out.append(os.path.join(dirpath, fn))
    return sorted(out)


def main():
    root = 'src'
    if not os.path.isdir(root):
        sys.exit('run me from the website repo root (no ./src here)')

    files = collect(root)
    print(f'# basename predicate check — {len(files)} test files under {root}/')
    print('# positive form OLD: ^[a-z][a-zA-Z0-9-]*\\.[a-z][a-zA-Z0-9-]*\\.test\\.tsx?$')
    print('# positive form NEW: ^[A-Za-z][a-zA-Z0-9-]*\\.[a-z][a-zA-Z0-9-]*\\.test\\.tsx?$')
    print('# EXCLUDES: paths (the predicate is over basenames only); the ID-token')
    print('#           negative form is reported as a SEPARATE limb, not folded in.')
    print()

    # --- Controls first. An instrument is not trusted until its controls fire. ---
    print('## Controls — both directions')
    control_fail = 0
    for name, expected, why in CONTROLS:
        got = bool(NEW.match(name))
        ok = got == expected
        if not ok:
            control_fail += 1
        print(f'   [{"OK " if ok else "FAIL"}] NEW({name}) = {got}, expected {expected} — {why}')
    print(f'   controls: {len(CONTROLS) - control_fail}/{len(CONTROLS)} fired as specified')
    print()

    # --- Reconciliation of the rev-14 widening over the whole class ---
    gained, still_rejected, id_hits = [], [], []
    for path in files:
        base = os.path.basename(path)
        o, n = bool(OLD.match(base)), bool(NEW.match(base))
        if n and not o:
            gained.append(base)
        if not n:
            still_rejected.append(base)
        if ID_TOKEN.search(base):
            id_hits.append(base)

    print('## Limb 1 — files the rev-14 widening newly admits (OLD rejected, NEW admits)')
    print(f'   count: {len(gained)}')
    for b in gained:
        print(f'     + {b}')
    print()
    print('## Limb 2 — files STILL rejected by the corrected positive form')
    print(f'   count: {len(still_rejected)}')
    for b in still_rejected:
        print(f'     ! {b}')
    print()
    print('## Limb 3 — ID-token class over basenames (separate negative form)')
    print(f'   count: {len(id_hits)}')
    for b in id_hits:
        print(f'     ? {b}')
    print()
    print(f'# totals: {len(files)} files | newly admitted {len(gained)} | '
          f'still rejected {len(still_rejected)} | id-token basenames {len(id_hits)}')
    return 1 if control_fail else 0


if __name__ == '__main__':
    sys.exit(main())
