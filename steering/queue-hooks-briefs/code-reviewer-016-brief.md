# Brief — code-reviewer-hooks-016 (plan 016, the send-check validity chain)

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T12:40Z. You are the session `code-reviewer-hooks-016`, launched in
`/usr/local/bin/hooks/website`. Repositories: `/usr/local/bin/hooks/website` (source) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## Your start

Your predecessor's committed document:
`agent-output/implementation/016-send-check-validity-implementation.md` (record `1212bf6`), whose
`Handoff-At` field names the tree you review (copied from that field at 2026-11-11T12:40Z: `ee114ff`,
repos=website). Chain branch `chain/016-send-check-validity`, base `0e3d903` (`master`). The
plan: `agent-output/planning/016-send-check-validity.md`, revision 6 (record `07e2e41`;
registrations to R-9, record `a8468d0`). Read `agent-output/steering/queue-hooks-rulings.md`
whole before your first act.

## Stage set

Quoted from the scoping determination (rulings block "2026-11-11T09:17Z"): "Pipeline: full chain.
Planner, critic, architect conformance, QA Phase 1, implementer with a deweeder, code review, QA
Phase 2, UAT, devops, retrospective." No register row has changed it.

## Delivery

Your verdict is delivered to `qa-hooks-016` on approval (live; its Phase 2 starts on your
committed verdict) and to `implementer-hooks-016` on rejection. Owner-needing items and spawn
cues go to `steering-queue-hooks` by SendMessage.

## Hazard-bearing analysis (this thread's, each a pointer; verify at the source)

- The send check `validateMessage` (`src/utils/limits.tsx`) has three production callers: the
  send page, `isMessageValid` (which writes the stored `valid` column on save) and
  `src/scripts/backfillValid.ts` (rulings block "2026-11-11T09:17Z", Blast radius; read at
  `6d78b19`, not re-read at this tip). `agent-output/architecture/website.md` A-4 binds a change
  to it; W-1 and W-2 bind the save path (no server-side refusal of a save; the owner's selection
  19, rulings block "2026-11-11T10:30Z").
- The preview route: the owner's selection 23 (rulings block "2026-11-11T11:11Z", plan D-14):
  no error lines or red border there; the editor and the send page keep every line.
- The corpus fixture `src/utils/__tests__/helpers/discordV2SendCorpus.ts` is fixed byte-identical
  by AC1-1 and sits outside AC1-11's lint population (plan X-12, revision 6). The repository's
  `lint` script runs `eslint --fix .` and would rewrite it (X-12; do not run that script).
- Lint: the base tree is red before the chain (plan X-10). The implementer reports, by message,
  21 pre-existing lint FAILs from `convention-check` in changed files besides the fixture, left
  under X-10 and recorded for you in its document: a candidate for your ruling, not read by this
  thread.
- The deweeder's table: `agent-output/verification/016/deweed.md` (two rounds).
- Test conventions and the local-build rule: `agent-output/CLAUDE.md`.
- Architecture record: `agent-output/architecture/system-architecture.md`,
  `agent-output/architecture/website.md`.

## Not checked by this brief

- The diff `0e3d903..ee114ff` itself; the implementer's reported suite figures (vitest 1503 of
  1503 in 122 files, exit 0; typecheck exit 0), which are its claims.
- Which of the plan's milestones (M1, M1b, M2, M3) the handoff covers: the implementer's message
  named M1, M1b and M2.
- `preview-image-generator` and `project-utils`: out of scope by the plan.
