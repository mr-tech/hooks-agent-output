# CR round 7 — the newly-tracked QA spec is type-sound, and the round-6 class is still empty

**Built by**: code-reviewer, 2026-08-23, delta round at website `c85945f`.

## Why this instrument exists

`c85945f` adds two test files and nothing else. One of them —
`src/scripts/__tests__/012-backfill-evaluation-failure-category-qa.test.ts` — **did not exist at
round 6** (mtime 12:15:34; the round-6 review committed 11:44:08), so it is content this review had
never examined, whatever its tracking status. Reading it raised exactly one hypothesis worth
testing: `MessageData` appears in type position at two sites with **no import** for it.

**Hypothesis refuted by reading the declaration**: `MessageData` is an ambient global
(`src/@types/global.d.ts:116`, inside the file's `declare global` block), so the bare reference is
bound. Recorded rather than dropped — a refuted hypothesis is part of the evidence.

That left the stronger question the hypothesis was a proxy for: is the new file a member of
**F-QA13**'s class (specs that would not survive the `**/__tests__` tsconfig exclusion being
closed)? That cannot be answered by reading, because the shipped config never typechecks the file.

## Instrument

A throwaway tsconfig extending the real one with `**/__tests__` **removed from `exclude`**, run
with `tsc --noEmit`, then deleted. This is deliberately *stronger* than what the production build
does: it compiles files the build never sees.

## Result

    27 errors total; 0 from either newly-tracked file
    F-QA13's 5 in 012-message-mode.test.ts reproduce exactly
    the 22 pre-existing (10 + 7 + 5) reproduce exactly

The new spec is **not** a member of F-QA13's class, and QA's error counts are independently
confirmed by this session's own run rather than carried.

## Also captured here

- `npm run build` at `c85945f`: **exit 0**, both v1 routes dynamic.
- The round-6 enumeration re-run. Its predicate is *tracked* files under `src/pages`, and tracking
  status is precisely what `c85945f` changed — so the enumeration was re-run rather than assumed
  stable: **8 tracked ts/tsx, 0 lacking a default export**, and 0 files under `src/pages` changed.

See `run-typecheck-with-tests.txt` for the verbatim run.
