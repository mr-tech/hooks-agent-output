# Brief — code-reviewer-fix-dialog-closes-on-first-portal-load

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-dialog-closes-on-first-portal-load-brief-common.md`
(determination, stage set, prohibitions, hazards 1 to 5). Read it before your first act.

From `steering-roadmap`, 2026-11-18. You are the session
`code-reviewer-fix-dialog-closes-on-first-portal-load`, launched in `/usr/local/bin/hooks/website`.

## What you review

The fixer's committed document:
`/usr/local/bin/hooks/agent-output/implementation/fix-dialog-closes-on-first-portal-load-implementation.md`,
agent-output commit `4360a16`. Its anchor, copied from that document's header at 22:2xZ:
`Handoff-At: 1ad625e — repos=website`, on branch `fix/dialog-closes-on-first-portal-load` (HEAD
`1ad625e2161b58c5f870c9db369f4056df690a03`, 0 tracked changes, read by this thread at the same time).

## Route

`git diff --numstat 395510e 1ad625e` (this thread, 22:2xZ): `src/components/AnchoredPopover/Child.tsx`
6/4, `.eslintrc.json` 7/1, `src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx`
73/0. Production lines (GLOSSARY: source the build compiles or the runtime loads) are `Child.tsx`'s 6;
lint configuration is none. Under 20: the stage set's route where your review also runs the suite and
the fixer's red test against the pre-fix tree. No QA Phase 2.

## Hazard analysis to add to the common part's (candidates, none a finding until you derive it)

- **The red test substitutes the module it exercises.** The fixer reports that the test mocks
  `next/dynamic` to `next/dist/api/app-dynamic`, because under vitest `next/dynamic` resolves to the
  Pages-router build, which never suspends, and without the mock the test passes on the defect (its
  `controls/alias-control.txt`). Whether the substituted module is the one the production App Router
  build loads at this site, so that the test's red is the production mechanism and not a property of
  the mock, is wanted from you, with the common part's hazards 1 and 2 (jsdom rects; module-cache
  ordering).
- **The class catch.** A lint rule in `.eslintrc.json`. Plan 017 recorded the lint script as not
  starting; that is refuted for the shared tree's install (it starts) and holds only in an exported
  copy with a symlinked `node_modules` (`agent-output/steering/017-rulings.md`, block 22:18Z;
  `agent-output/verification/017/steering-refute/`). The fixer says it showed its rule red against base
  `Child.tsx` in an isolated export — check by which instrument, given that export failure.
- The fixer lodged a suite-wide inbox entry about `next/dynamic` under vitest (uncommitted, per the
  inbox rule); it is not this fix's scope.

## Delivery

Your consuming stage on approval is devops for website `master` (production; the owner's word). No
devops session is live: send your spawn cue, and any owner-needing item, to `steering-roadmap` by
SendMessage. A rejection goes to `fixer-fix-dialog-closes-on-first-portal-load`.

## Not checked by this brief

The diff's content, the test and every capture under
`agent-output/verification/fix-dialog-closes-on-first-portal-load/` (none read by this thread);
whether the suite passes at `1ad625e` (the fixer's statement, not re-run).
