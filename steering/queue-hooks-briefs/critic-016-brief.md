# Brief — critic-hooks-016 (plan 016, the send-check validity chain)

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T10:39Z. You are the session `critic-hooks-016`, launched in
`/usr/local/bin/hooks/website`. Repositories: `/usr/local/bin/hooks/website` (source) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## Your start

Plan 016, `agent-output/planning/016-send-check-validity.md`, `Revision: 1` (read from its
frontmatter at record `3b4205d`). The planner committed revision 1 at record `4c9bcf2`; `3b4205d`
adds only this thread's registration (changelog R-1: Decisions Register rows D-12 and D-13), which
changes no requirement. The planner's spawn cue for you arrived at 10:33Z. No gate has read any
revision of this plan.

## Stage set

Quoted from the scoping determination (`agent-output/steering/queue-hooks-rulings.md`, block
"2026-11-11T09:17Z — scoping determination"): "Pipeline: full chain. Planner, critic, architect
conformance, QA Phase 1, implementer with a deweeder, code review, QA Phase 2, UAT, devops,
retrospective." Security is not started, on the stated premise that the chain ships nothing root
executes. No register row has changed that set.

## What the record holds that the plan cites

- The rulings file above: read it whole. The owner's words on this plan are its blocks "selection
  14" (09:09Z), "selections 17 to 20" (10:30Z) and "selections 21 and 22" (10:38Z). The 10:30Z block
  records an error of this thread in the determination (two clauses that contradicted each other on
  the description fields); his selection 19 settled it.
- Architecture: `agent-output/architecture/system-architecture.md` (D-004, D-005) and
  `agent-output/architecture/website.md` (W-1, W-2, A-4).
- Research: `agent-output/research/closed/components-v2-send-validity-2026-11-11.md` and
  `agent-output/research/closed/components-v2-description-text-limit-2026-11-11.md`.

## Running beside you

`architect-hooks-016` (conformance) and `qa-hooks-016` (Phase 1) are started on the same revision
at the same time. The planner is `planner-hooks-016`, live.

## Delivery

Your report goes where the lifecycle skill's next-act table sends it for the verdict you commit,
evaluated when you deliver: a REQUEST REVISION to `planner-hooks-016`; an APPROVED to every
pre-code gate that has not read that revision, and to `steering-queue-hooks` when none is left.
Owner-needing items and spawn cues come to `steering-queue-hooks` by SendMessage.

## Not checked by this brief

- The plan's M1 body (its acceptance criteria AC1-1 to AC1-7) was read by this thread only where
  the revision 0 to 1 diff touched it.
- The research documents' Evidence tables, and the plan's hand tally of the 76 case ids.
- The planner's code reads at website `0e3d903`, other than: `src/server/api/utils/shapes.ts`
  lines 50, 63, 69 and 81; `src/utils/sendWebhook.ts` lines 86 to 93; the `trim()` sites in
  `src/utils/limits.tsx` line 141 and `src/utils/index.ts` line 38 (all `git grep -n` or `git
  show`, read from code, not run).
- The standing rule the plan's D-5 quotes from the planner definition was not read by this thread
  in the owner's own words.
