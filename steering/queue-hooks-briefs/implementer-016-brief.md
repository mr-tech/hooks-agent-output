# Brief — implementer-hooks-016 (plan 016, the send-check validity chain)

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11T11:43Z. You are the session `implementer-hooks-016`, launched in
`/usr/local/bin/hooks/website`. Repositories: `/usr/local/bin/hooks/website` (source) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` always.

## Your start

The approved plan: `agent-output/planning/016-send-check-validity.md`, **revision 5** (record
`b2d78b0`; registrations R-3 and R-4 after it, record `678c8b4`). Every pre-code gate has approved
revision 5, each read by this thread at its document's header at `HEAD` at 11:43Z:
- critique cycle 3, `agent-output/critiques/closed/016-send-check-validity-cycle3-critique.md`
  (`Verdict: APPROVED`, record `88b0da9`);
- architecture delta pass, `agent-output/architecture/016-send-check-validity-architecture-findings.md`
  (APPROVED on revision 5, record `1492d33`);
- QA Phase 1, `agent-output/qa/016-send-check-validity-qa.md` (`Awaiting Implementation`, re-keyed
  to revision 5, no finding open, record `97343f0`). It holds the blocking-condition register
  B-1 to B-6.
The implementation start is recorded in `agent-output/steering/queue-hooks-rulings.md`, the block
headed "2026-11-11T11:43Z — implementation start"; read that file whole before your first act.

**Chain branch:** `chain/016-send-check-validity`, created by this thread at website
`0e3d903ce98e108c7ca848b992ad89ac538f4b44` (`master`, equal to `origin/master` by
`git ls-remote`). The tree is on it. One untracked path was present before and after the switch,
`.playwright-mcp/` (another session's capture; not yours to commit or remove).

## Before code

The chain touches user-visible surfaces (the send page's refusals, the editor inputs, the preview
route). Your flow questions (your definition's pre-code step) go to `steering-queue-hooks` by
SendMessage; this thread puts them to the owner and carries his answers back.

## Stage set

Quoted from the scoping determination (rulings block "2026-11-11T09:17Z"): "Pipeline: full chain.
Planner, critic, architect conformance, QA Phase 1, implementer with a deweeder, code review, QA
Phase 2, UAT, devops, retrospective." No register row has changed it.

## Delivery

Your report is delivered to the code reviewer. No code-reviewer session is live for this chain:
send a spawn cue to `steering-queue-hooks` at your handoff. Before each hand-off, the round's
range goes to `deweeder-hooks-016` (started with you) before any mutation sweep. `BLOCKED:`
items and owner-needing items go to `steering-queue-hooks`. `planner-hooks-016` is live for a
plan ambiguity.

## Standing (pointers)

- `agent-output/CLAUDE.md`: Test Conventions, and "Local builds of `website` — before the first
  save" (binds any local save).
- Architecture: `agent-output/architecture/system-architecture.md`,
  `agent-output/architecture/website.md` (W-1, W-2, A-4).
- No agent reads the production database; Discord sends are in the agents' test server only.
- The secret-file gate refuses a repository-wide `git grep` in `preview-image-generator`; that
  repository is out of scope (plan X-8).

## Not checked by this brief

- The plan's body beyond its header, changelog and the revision 5 diff; the gate documents beyond
  their headers; `verification/016/`.
- Whether the website's dependencies are installed and the suite is green at `0e3d903` in this tree.
