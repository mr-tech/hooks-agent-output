# QA Phase 2 (chain 015, M5) mutants at website da24eb7.
# Selected by MUT_ID; each target must occur exactly once (else the mutator exits non-zero).
import os
import sys

FMT = 'src/utils/formatMessageDate.ts'

MUTANTS = {
    # M5-e: "today" compared on the UTC calendar instead of the user's local one.
    'm5e-utc-getters': [(FMT,
        "  return a.getFullYear() === b.getFullYear()\n    && a.getMonth() === b.getMonth()\n    && a.getDate() === b.getDate();",
        "  return a.getUTCFullYear() === b.getUTCFullYear()\n    && a.getUTCMonth() === b.getUTCMonth()\n    && a.getUTCDate() === b.getUTCDate();")],
}

mutant_id = os.environ['MUT_ID']
edits = MUTANTS[mutant_id]
sources = {}
for path, old, _ in edits:
    sources.setdefault(path, open(path).read())
for path, old, new in edits:
    n = sources[path].count(old)
    if n != 1:
        sys.exit(f'mutant {mutant_id}: target in {path} found {n} times')
    sources[path] = sources[path].replace(old, new)
for path, text in sources.items():
    open(path, 'w').write(text)
