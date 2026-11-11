# Brief — architect-hooks-016 (conformance pass, plan 016, the send-check validity chain)

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T10:39Z. You are the session `architect-hooks-016`, launched
in `/usr/local/bin/hooks/website`. Repositories: `/usr/local/bin/hooks/website` (source) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## Your start

The conformance pass on plan 016, `agent-output/planning/016-send-check-validity.md`,
`Revision: 1` (read from its frontmatter at record `3b4205d`). The planner committed revision 1 at
record `4c9bcf2`; `3b4205d` adds only this thread's registration (changelog R-1: Decisions Register
rows D-12 and D-13), which changes no requirement. No gate has read any revision of this plan.

## Stage set

Quoted from the scoping determination (`agent-output/steering/queue-hooks-rulings.md`, block
"2026-11-11T09:17Z — scoping determination"): "Pipeline: full chain. Planner, critic, architect
conformance, QA Phase 1, implementer with a deweeder, code review, QA Phase 2, UAT, devops,
retrospective." No register row has changed that set.

## What the record holds for this pass

- The rulings file above: read it whole. The owner's words on this plan are its blocks "selection
  14" (09:09Z), "selections 17 to 20" (10:30Z) and "selections 21 and 22" (10:38Z).
- The records you steward: `agent-output/architecture/system-architecture.md` (D-004, D-005) and
  `agent-output/architecture/website.md` (W-1, W-2, A-4). The plan's `Architectural-Surface` field
  says his selection 19 (plan D-10) deviates from A-4's same-constant pattern and leaves to you
  whether A-4's line needs a note.
- An open handoff whose trigger this pass fires, by its own `Review-Trigger` ("when an architect is
  next commissioned in this record"): `agent-output/handoff/architecture-record-reconciliation-owed-2026-11-10.md`
  (`Status: Open`, `Owning-Stage: architect`; header read 10:39Z, body not read by this thread).

## A second item, outside the conformance pass

A candidate entry for `architecture/website.md`, routed to the architect by
`agent-output/retrospectives/fix-website-save-gate-embeds-retrospective.md` (record `c787c2d`, its
"Next: the architect" line). The claim is the retrospective's and was not re-read at the code by
this thread: since website `963a25c` both of the editor's persisting writers go through one step in
`useApiMethods` that leaves the editor holding exactly what was stored, mode included, and a later
writer that calls `upsertMessage` around that step brings back the self-raised "Message Update
Detected" (finding CR-4 of `agent-output/code-review/closed/fix-website-save-gate-embeds-code-review.md`).
Whether that is an entry, and its wording, are yours. It is not part of plan 016 and gates nothing
there; take it after the conformance verdict is committed. If your definition does not give you
this act in this session, say so to `steering-queue-hooks` and it returns to `TODO.md`.

## Running beside you

`critic-hooks-016` and `qa-hooks-016` (Phase 1) are started on the same revision at the same time.
The planner is `planner-hooks-016`, live.

## Delivery

Your conformance document's findings go to `planner-hooks-016`; an approval with no findings goes
to `steering-queue-hooks` when no other pre-code gate has findings on, or has yet to read, that
revision (the lifecycle skill's next-act table, evaluated when you deliver). Owner-needing items
and spawn cues come to `steering-queue-hooks` by SendMessage.

## Not checked by this brief

- The plan's M1 body was read by this thread only where the revision 0 to 1 diff touched it.
- The code review's path under `closed/` is as the earlier chain's close-out recorded it; not
  re-listed this turn.
- Whether `architecture/system-architecture.md` § Roadmap Readiness is current: the handoff above
  says it is not to be cited until reconciled, and this brief cites none of it.
