# Brief — planner-hooks-016 (respawn; plan 016, the send-check validity chain)

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T11:38Z. You are the session `planner-hooks-016`, a fresh
generation: the earlier one was stopped at 11:23Z after its Checkpoint. Launched in
`/usr/local/bin/hooks/website`. Repositories: `/usr/local/bin/hooks/website` (source) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## Your start

Your Resumption State: `agent-output/planning/016-send-check-validity.md`, section "Resumption
State" (your Checkpoint, record `a9bb644`). Read it, then the rulings file
`agent-output/steering/queue-hooks-rulings.md` whole, before your first act. One thing in that
Resumption State is superseded: the chain did not stop on the usage gate (rulings block
"2026-11-11T11:24Z"); it is running.

What the record lacks, and why you are started: QA's Phase 1 re-key on revision 4 is committed
(`agent-output/qa/016-send-check-validity-qa.md`, record `96fbc66`; `Status: Awaiting
Implementation`, read at `HEAD` at 11:38Z). Its Status-Detail names one finding for you, QAF-12
LOW, on AC1b-1. The finding and what it asks are in that document; read them there.

## Stage set

Quoted from the scoping determination (rulings block "2026-11-11T09:17Z"): "Pipeline: full chain.
Planner, critic, architect conformance, QA Phase 1, implementer with a deweeder, code review, QA
Phase 2, UAT, devops, retrospective." No register row has changed it. Milestone M1b was added by
the owner's selection 23 (rulings block "2026-11-11T11:11Z", plan D-14).

## Delivery

Your consuming stages are the critic, the architect's conformance pass and QA Phase 1.
- `qa-hooks-016` and `critic-hooks-016` are live (`ListAgents`, 11:38Z). The critic was cleared
  after its Checkpoint; a message to it names its Resumption State (in
  `agent-output/critiques/closed/016-send-check-validity-cycle2-critique.md`).
- `architect-hooks-016` is stopped. Where your disposition of the finding needs the architect's
  pass, send a spawn cue to `steering-queue-hooks` by SendMessage.
- When every pre-code gate stands approved on the current revision, the implementer's spawn cue
  goes to `steering-queue-hooks`.
- `OPEN QUESTION` items, a scope delta at milestone level and any owner-needing item go to
  `steering-queue-hooks` by SendMessage.

## Standing (this thread's guidance, by pointer)

- The whitespace limb (L1, with L8) was revised in revisions 1, 2 and 3: a further finding on it
  is `steering-queue-hooks`'s to decide before you fold it (rulings block "2026-11-11T11:15Z").
- The roadmap is absent for this workspace by the owner's standing instruction; do not raise it.

## Not checked by this brief

- QAF-12's body beyond its line in QA's document, and whether it changes a criterion: yours.
- The plan's text beyond its header (`Revision: 4`, `Status: Active`) and its Resumption State.
- `verification/016/preview-chrome/`: not read.
