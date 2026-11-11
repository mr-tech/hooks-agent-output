# Brief — qa-hooks-016 (Phase 1, plan 016, the send-check validity chain)

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T10:39Z. You are the session `qa-hooks-016`, launched in
`/usr/local/bin/hooks/website`. Repositories: `/usr/local/bin/hooks/website` (source) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## Your start

Phase 1 (the test strategy, before implementation) on plan 016,
`agent-output/planning/016-send-check-validity.md`, `Revision: 1` (read from its frontmatter at
record `3b4205d`). The planner committed revision 1 at record `4c9bcf2`; `3b4205d` adds only this
thread's registration (changelog R-1: Decisions Register rows D-12 and D-13), which changes no
requirement. The critic and the architect's conformance pass read the same revision at the same
time; neither has a verdict yet, so a later revision may follow.

The plan gives Phase 1 two acts beyond the strategy: the corpus fixture and its re-send against
Discord (AC1-1), and the scripted tally of the 76 case ids (the Requirement ledger's last
paragraph). Read them at the plan.

## Stage set

Quoted from the scoping determination (`agent-output/steering/queue-hooks-rulings.md`, block
"2026-11-11T09:17Z — scoping determination"): "Pipeline: full chain. Planner, critic, architect
conformance, QA Phase 1, implementer with a deweeder, code review, QA Phase 2, UAT, devops,
retrospective." No register row has changed that set.

## Hazards that bear on this phase

- **Discord sends go to the agents' test server only** (global `CLAUDE.md`, "Outbound messages";
  plan D-6). The research's own probe files were deleted at its run end, so the corpus is a
  reconstruction; the research's Appendix carries the builders
  (`agent-output/research/closed/components-v2-send-validity-2026-11-11.md`).
- **Local builds of the website**: `agent-output/CLAUDE.md`, "Local builds of `website` — before
  the first save" (the message-id sequence restart; `.env.local` holds credentials, read key names,
  hosts and ports only). It binds any walk or local stack this phase stands up.
- **No agent reads the production database** (plan D-6, X-4).
- **Suite baseline**, the planner's run at website `0e3d903`, 10:24Z (plan, Validation): vitest
  exit 0, 1145 of 1145 cases, 118 file entries; `pnpm run typecheck` exit 0. Not re-run by this
  thread. Test Conventions are in `agent-output/CLAUDE.md`.
- **Open handoffs the plan routes to you**: `agent-output/handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md`
  ("fires when QA next runs", by the plan's Entry work; not read by this thread) and, through rider
  R1, `agent-output/handoff/website-tests-not-beside-their-module-2026-11-08.md`.
- A record tool exists for a local stack, `agent-output/tools/uat-local-stack.sh`; the last chain's
  retrospective says two stages built a Postgres by hand without it and that it lacks the id
  sequence restart (the retrospective's claim, not read at the tool by this thread).

## What the record holds that the plan cites

- The rulings file above: read it whole. The owner's words on this plan are its blocks "selection
  14" (09:09Z), "selections 17 to 20" (10:30Z) and "selections 21 and 22" (10:38Z).
- Architecture: `agent-output/architecture/system-architecture.md` (D-004, D-005) and
  `agent-output/architecture/website.md` (W-1, W-2, A-4).

## Delivery

Phase 1 findings on the revision go to `planner-hooks-016`; an approval with no findings goes to
`steering-queue-hooks` when no other pre-code gate has findings on, or has yet to read, that
revision (the lifecycle skill's next-act table, evaluated when you deliver). Owner-needing items
and spawn cues come to `steering-queue-hooks` by SendMessage.

## Not checked by this brief

- The plan's M1 body (AC1-1 to AC1-7) and Testing Strategy were read by this thread only where the
  revision 0 to 1 diff touched them.
- The research documents' Evidence tables and Appendix.
- How the test server is reached for the re-send (the researcher's method is in its document's
  Methodology; not read by this thread).
- The website tree is on `master` at `0e3d903` (10:27Z); the chain branch is not created until
  implementation starts.
