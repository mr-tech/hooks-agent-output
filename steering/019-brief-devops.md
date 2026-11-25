# Brief — devops-019, Stage 1

Duties negated: the wait on the architect's closing pass (devops.md, step 2c). The owner waived that pass by selection (rulings block
"2026-11-25T15:46Z — selection: plan 019 to the bare minimum; QA's effort-final mutation sweep stopped", Q2), and the plan registers it as D-33.

Common part: `/usr/local/bin/hooks/agent-output/steering/slate-formatting-brief-common.md`. Read it whole first. This effort is plan 019.

From `steering-hooks-fixer`, 2026-11-25T16:33Z. You are `devops-019`, a fresh session launched in `/usr/local/bin/hooks`. Your earlier
document is `/usr/local/bin/hooks/agent-output/deployment/019-slate-formatting-discord-engine-deployment.md` (the M1 AN-1 act). Continue in it.

## Now: Stage 1 for plan 019, from website `48eb60a`

- **Plan:** `/usr/local/bin/hooks/agent-output/planning/019-slate-formatting-discord-engine.md`. It is at Revision 26 (record `d79f481e`),
  Status UAT Approved by row R-137 (record `d2b99b88`). Re-read `Revision` and `Status` before you act. Read § Decisions Register
  (D-19 one release; D-32 to D-34) and § M7 — Release.
- **The gates, with the SHA each one's anchor field names:**
  - UAT: `uat/019-slate-formatting-discord-engine-uat.md`, `Verified-At: 48eb60a`, APPROVED FOR RELEASE (record `d06fe6b5`).
  - QA Phase 2 on M6: `qa/019-slate-formatting-discord-engine-m6-qa.md`, `Verified-At: 48eb60a` (record `ce8d31a0`).
  - Code review: `code-review/019-slate-formatting-discord-engine-code-review.md`, `Reviewed-At: 48eb60a` (record `e0dcfdb0`).
  - Critique: `critiques/closed/019-slate-formatting-discord-engine-critique.md`, APPROVED on revision 26 (record `3cbae50e`).
- **The stage set is release essentials** (D-33, on rulings block 15:46Z). QA's effort-final mutation sweep on M6 was not run, on his waiver.
  The Planner batch is not folded beyond M7's premise paragraph, and the batch's open rows sit on the rebuild sizing document. There is no
  architect closing pass (Duties negated, above). The release tip still needs QA Phase 3. UAT walked all nine flows (D-34).
- **QA Phase 3 (B-6):** it runs on the release tip you assemble. It includes AC-3.3's full generator run (`MOUNTED_GENERATOR_COUNT=1000`),
  once (rulings block "2026-11-25T15:49Z"). Record the tip, then message `steering-hooks-fixer`. This thread starts QA Phase 3 in `qa-019`.
  A per-plan verdict satisfies the gate only where the plan's tree is the tip's tree.
- **B-5 is post-deploy** (AC-4.2 read on production, his D-2). Create its Stage 1 carrier: a handoff record and the scheduled reader it names
  (QA register B-5, `qa/019-slate-formatting-discord-engine-qa.md`; QA's P-Q13 row names the instrument).
- **M7's workspace `CLAUDE.md` Test Conventions update is release work** (rulings block 15:49Z). Read what M7 asks. Say in your document
  whether it lands with the release and who commits it. `CLAUDE.md` is canonical in the agent-output repository.
- **The production push is his.** Ask him in your own session at Phase 2B (standing ruling 19, block "2026-11-21T05:32Z — the commission,
  relayed by the coordinator"). Before that, read what the push triggers from the website repository's own deploy mechanism.

## For your forward-item sweep

- Decisions Register: plan § Decisions Register (D-1 to D-34). Effort rulings:
  `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`. Read `fixer-queue-2026-11-21-standing.md` first, then
  the log from block "2026-11-25T15:25Z".
- Assumption Not Checked: QA M6 § "Assumption Not Checked" (lines 256 and 509 at `ce8d31a0`). Code review § "Assumption Not Checked"
  (line 2054 at `e0dcfdb0`). Critique § "Scope assumptions the plan lists". UAT § Value Delivery: "QA's Assumption Not Checked on Fix
  Round 6's `linesOf` branches stands unread" (the sweep was waived).
- Carriers:
  - `handoff/slateeditor-index-preexisting-react-hooks-lint-errors-2026-11-24.md`: Open; its Review-Trigger is this release's production
    deploy.
  - `planning/slate-editor-rebuild-sizing-2026-11-25.md`: Active; its Review-Trigger is 019's release.
  - UAT-1 (UAT document § Findings): routed to the rebuild's sizing document.
- The editor rebuild does **not** open at this release. It opens only on his word (rulings block "2026-11-25T15:38Z").

## The tree (read in the 2026-11-25T16:33Z turn by `git -C website branch --show-current` and `status --porcelain`; re-read before you act)

The shared website tree is on `chain/019-slate-formatting-discord-engine` at `48eb60a`. One untracked path, `.playwright-mcp/`, is
another session's. Leave it alone. Switching back at release is yours (Stage 2), over a clean tree. A dirty tree goes to steering.

## Not checked by this brief

`release-move.js --dry-run` on website `master`; the deploy mechanism; whether `master` moved since 019's base; and B-5's reader form.

## Routing

Commit your Stage 1 record in your deployment document, with stamps from `date -u` in the same turn. Message `steering-hooks-fixer` when
Stage 1 is committed or when the release tip is ready for QA Phase 3. Send owner-needing items and spawn cues there too. The release
question goes to him in your own session.
