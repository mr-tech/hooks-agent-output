# Brief — devops-hooks-018

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/018-brief-common.md` (determination, his answers, stage set, prohibitions,
architecture record, hazards). Read it before your first act. Its lines 25-28 (branch not cut) are superseded: the chain branch is cut.

From `steering-roadmap-hooks`, 2026-11-20T06:20Z. You are the session `devops-hooks-018`, launched in `/usr/local/bin/hooks/website`.

## Now: M5-a, the release-check branch

Plan `agent-output/planning/018-next-upgrade-save-size-cap.md` revision 8 (`2dc79a3`), § M5, M5-a, and his 04:11Z selection
(`steering/018-rulings.md` block "2026-11-20T04:11Z"; D-8): push a non-master release-check branch whose head is the chain tip `d1bb9b0`
plus one commit changing only `vercel.json` (`buildCommand` `SKIP_ENV_VALIDATION=1 next build`); read the deployment `READY` at that
head through `vercel api` (read-only Vercel reads are standing); show `git diff --name-only d1bb9b0 <head>` printing `vercel.json`
alone. That push builds a Vercel preview only (no `.github/workflows`; see the dry run below), so it needs no prompt. The chain tip
never carries that commit; delete the branch at release. Tell `uat-hooks-018` by SendMessage when it is `READY` (B-5), with the
preview URL.

## Then: Stage 1 and the release

Stage 1 starts on UAT's committed document and security's (stage set: UAT → security → devops). The architect's closing pass has
landed (APPROVED, agent-output `a4d94ce`), and the plan's Planner batch was folded at revision 8, so devops.md step 2c's waits are met
unless a later revision appears.
- **End step:** website `master` → the verified tip. Vercel deploys a `master` push to production. Stage 2 runs only on his release
  approval, which you ask for in your own session (Phase 2B). Steering puts no release prompt of its own while you are live.
- **Gate anchors**, copied 06:20Z from each document's anchor field (re-read before you act):
  - implementation `Handoff-At` `d1bb9b0` (zod pin, `implementation/018-next-upgrade-save-size-cap-m2-implementation.md`, `7c76319`);
  - code review `Reviewed-At` `d1bb9b0` (`code-review/018-next-upgrade-save-size-cap-code-review.md`);
  - QA `Verified-At` `d1bb9b0`, QA Complete (`qa/018-next-upgrade-save-size-cap-m4-qa.md`, `62703f1`). QA Phase 3 at the release tip
    runs on your request; QA says its verdict applies if the tip equals `d1bb9b0`.
- **Steering's dry run, 06:20Z:** `release-move.js website master d1bb9b0724cded3c3c303203c2cbafe5df7bbf96 --dry-run` (run from
  `/usr/local/bin/hooks`): "DRY RUN: every check passed; nothing moved". origin/master `7923a1d`; workflows none.
- **Register:** the plan's Decisions Register (D-1 to D-10) and Planner batch; rulings `steering/018-rulings.md`.
- **Forward-item sweep, Assumption Not Checked:** the critique's (`critiques/closed/018-next-upgrade-save-size-cap-critique.md`,
  "Assumption Not Checked"), the code review's and each QA document's (headings of that name), the architecture findings
  (`architecture/closed/018-next-upgrade-save-size-cap-architecture-findings.md`).
- **Carriers the scoping and its riders name:** `handoff/018-m4-r3-navigation-limit-to-architecture-record-2026-11-20.md` (the
  architect lands R3 after UAT's walk, before your release reconciliation); the paracord lockfile-regeneration finding (M2 document
  line 160, in the Planner batch); X-10's handoff `update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` (stays open).
- **Open production carriers to sequence against (X-12):** `handoff/message-page-header-decode-post-deploy-2026-11-20.md` (P-1, crontab
  reader P1R) and `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` (B-7, B-10; readers B7R, B10R).
- **Post-deploy rows for your Stage-1 handoff:** B-6 (M1-h), B-7 (M5-e, yours after the push), B-8, B-10 (M2-e; UAT runs it), from QA's
  register (`qa/018-next-upgrade-save-size-cap-qa.md`). Name each reader.
- **Security:** `security-hooks-website-deps` re-reviews the change and closes H-002 and M-001 after UAT; its pnpm audit re-run is
  there.

## Delivery

Your reports, owner-needing items and spawn cues → `steering-roadmap-hooks` by SendMessage.
