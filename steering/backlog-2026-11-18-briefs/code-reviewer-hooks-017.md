# Brief — code-reviewer-hooks-017

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` (determination, stage
set, prohibitions, architecture record, hazards). Read it before your first act.

From `steering-roadmap`, 2026-11-19. You are the session `code-reviewer-hooks-017`, launched in
`/usr/local/bin/hooks` (a cross-repository chain). Chain 017 is a full chain: code review per
milestone, then QA Phase 2 (`qa-hooks-017`).

## What you review first

M1's committed document: `/usr/local/bin/hooks/agent-output/implementation/017-existing-items-backlog-m1-implementation.md`,
agent-output commit `2bace82`. Its anchor, copied from that document's header at 00:3xZ:
`Handoff-At: 8147661 — repos=website`, on website branch `chain/017-existing-items-backlog` (cut by
steering from `origin/master` `1ad625e`, `steering/017-rulings.md` block "2026-11-19T00:29Z"). Plan:
`agent-output/planning/017-existing-items-backlog.md`, revision 4 (`a97628d`); start from its Reading
Order (code-reviewer row). Later milestones reach you by the implementer's hand-off, each on its own
document and SHA.

## Candidates to derive (this thread's, none a finding until you derive it)

- The implementer reports 5 eslint FAILs in `src/utils/__tests__/limits.import-validation.test.ts`, which
  it says pre-date M1 (21 at `1ad625e`, 5 at the tip), left unfixed under D-9. Its definition says to fix
  every FAIL; it disclosed the departure in its document. Whether D-9 ("accept, fix none") covers them is
  yours to judge.
- The website tree is shared. An untracked `.playwright-mcp/` is not the chain's.

## Delivery

APPROVED → `qa-hooks-017` by SendMessage, with your committed review's path and `Reviewed-At` SHA.
REJECTED → `implementer-hooks-017`. Owner-needing items and spawn cues → `steering-roadmap`.

## Not checked by this brief

Whether the suite figure the implementer reports (1505/1505, exit 0) reproduces; whether M1's moves
keep each file's case count (CLAUDE.md, the rename class's evidence).
