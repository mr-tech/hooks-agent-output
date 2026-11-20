# Brief — implementer-hooks-018

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/018-brief-common.md` (determination, his answers, stage set, prohibitions,
architecture record, hazards). Read it before your first act. Its line 25-28 ("the chain branch is not cut yet … run nothing in the
shared tree") is superseded by this brief for you: the branch is cut (below), and the shared tree is yours to build and test in.

From `steering-roadmap-hooks`, 2026-11-20T04:33Z. You are the session `implementer-hooks-018`, launched in
`/usr/local/bin/hooks/website`.

## Your stage

Implement plan `agent-output/planning/018-next-upgrade-save-size-cap.md` **revision 5** (agent-output `e45e8cf`), milestones M1 to M4
in the plan's order. M5 is devops's and UAT's (the release-check branch and the preview walk); you build nothing for it.

Gates that approved revision 5, each read at its own document's header this turn:
- critique `critiques/closed/018-next-upgrade-save-size-cap-critique.md`, APPROVED, `Reviewed-At` `e45e8cf` (closed at `b61164b`);
- architecture `architecture/018-next-upgrade-save-size-cap-architecture-findings.md`, APPROVED revision 5, at `1f78e40`;
- QA Phase 1 `qa/018-next-upgrade-save-size-cap-qa.md`, re-keyed to revision 5, at `0160d45` (Status Awaiting Implementation).
The start is recorded in `steering/018-rulings.md`, block "2026-11-20T04:33Z".

## The tree

- Chain branch `chain/018-next-upgrade-save-size-cap` in `/usr/local/bin/hooks/website`, cut by steering from `origin/master` at
  `7923a1d`, no upstream (implementer.md, "The Chain Branch"). Your first act there: `git -C /usr/local/bin/hooks/website branch
  --show-current`.
- `git status` showed one untracked entry at the cut, `.playwright-mcp/`. It is not yours; leave it.
- Source commits on the chain branch are yours. You push nothing; branch pushes and the release are devops's.
- M2 and M3 change the lockfile. A local build that saves falls under the local-build rule quoted in the common part (move the
  message id sequence before the first save).

## Open handoffs the plan names for you

`planning/…` § "Open handoffs whose trigger names this chain's surfaces":
- `update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` fires when M1 edits `updatePreferences`. It is steering's to
  disposition (X-10); tell steering by SendMessage when that M1 commit lands.
- `anchored-popover-first-load-test-is-order-dependent-2026-11-18.md` fires only if M2 edits that test file (X-11).
- `website-api-handler-hardening-2026-10-10.md` fires only if a file under `src/pages/api/` is edited; none is planned (X-9).

## Delivery

- Handoff → `code-reviewer-hooks-018`, by SendMessage, with your committed implementation document's path and SHA and the handoff
  SHA; to `steering-roadmap-hooks` when no `code-reviewer-hooks-018` session is live at delivery. Send steering a spawn cue for
  the reviewer when you are close to handoff.
- `BLOCKED:`, owner-needing items, `PREMISE-STALE` or a product-behaviour change, and spawn cues → `steering-roadmap-hooks` by
  SendMessage.

## Not checked by this brief

The suite's count and exit code at `7923a1d` on this tree (the planner's base validation is under
`verification/018/planning/base-validation/`); whether `node_modules` in the shared tree matches `7923a1d`'s lockfile.
