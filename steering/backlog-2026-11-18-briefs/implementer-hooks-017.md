# Brief — implementer-hooks-017

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` (determination, stage
set, prohibitions, architecture record, hazards). Read it before your first act.

From `steering-roadmap`, 2026-11-19T00:29Z. You are the session `implementer-hooks-017`, launched in
`/usr/local/bin/hooks` (a cross-repository chain).

## Your commission

Plan `agent-output/planning/017-existing-items-backlog.md`, **revision 4** (agent-output `a97628d`;
R-6 `99643d4` after it is registration only). Every pre-code gate approved revision 4:
`steering/017-rulings.md` block "2026-11-19T00:29Z" (implementation start, with the gate documents and
SHAs). QA Phase 1: `qa/017-existing-items-backlog-qa.md` at `3af80aa`. Start from the plan's Reading
Order (implementer row).

Milestone order, the plan's own (§ Plan): M1, M2, M3, M4; M5 and M6 only after gate M5-0; M7 last.
- **M5 and M6 code waits on OQ-7** (his D-15: "Before M5 code, a devops session asks you for the probe
  push"). When M1 to M4 are through, tell `steering-roadmap`, which starts devops for the probe push.
- Before code on a milestone with a user-visible surface, send `steering-roadmap` your flow questions:
  only the flows that hold a decision, the rest recorded in your document. Those flows wait for his
  answers. Waiting there is the mechanism working.

## The tree

- Website: on the chain branch `chain/017-existing-items-backlog`, cut by steering at 00:29Z from
  `origin/master` `1ad625e`, no upstream. Your first act there is `git -C /usr/local/bin/hooks/website
  branch --show-current`. An untracked `.playwright-mcp/` is in the tree: not yours, held, never staged.
- Generator (`/usr/local/bin/hooks/preview-image-generator`): devops names its branch before M6; commit
  nothing there before it is recorded.
- M5's `@vercel/functions` is a deliberate lockfile step (plan M5, Recommendation 3).

## Delivery

Your consuming stage is the code reviewer: send each milestone hand-off's document path and handoff SHA
to `code-reviewer-hooks-017` by SendMessage, or to `steering-roadmap` when no reviewer session is live
(steering then starts one). `BLOCKED:` items, owner-needing items and spawn cues go to `steering-roadmap`
by SendMessage.

## Not checked by this brief

Whether the suite at `1ad625e` runs green in the shared tree's install (QA ran it in an export; the plan's
Entry facts carry the figures); whether the website's `node_modules` matches `1ad625e`'s lockfile.
