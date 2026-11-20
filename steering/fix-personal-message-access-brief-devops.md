# Brief — devops, fix-personal-message-access

Duties negated: none.

Common part, read first and whole: `/usr/local/bin/hooks/agent-output/steering/fix-personal-message-access-brief-common.md`. It carries
the determination and his scope selection, with the 22:59Z amendment, the stage set, the standing prohibitions, the architecture
citations and the hazard analysis. Chain rulings file: `/usr/local/bin/hooks/agent-output/steering/fix-personal-message-access-rulings.md`.
This is a fixer chain: it has no plan, no Decisions Register and no UAT. The rulings file is the register.

- **You:** session `devops-hooks-fix-personal-message-access`, cwd `/usr/local/bin/hooks/website`.
- **Start:** now. The spawn cue came from security's re-review at `983681c`.
- **End step:** website `master` → the chain tip. Vercel deploys a `master` push to production; there is no beta. Stage 2 runs only on his
  release approval, which you ask for in your own session (Phase 2B). Steering puts no release prompt of its own while you are live.
- **Gate anchors**, each copied at compose time (00:2xZ) from its document's anchor field:
  - fixer `Handoff-At: 983681c…` (`implementation/fix-personal-message-access-implementation.md`, record `388f173`);
  - code review `Reviewed-At` Round 2 at `983681c` (`code-review/fix-personal-message-access-code-review.md`, record `9bd32a4`);
  - QA `Verified-At: 983681c…` (`qa/fix-personal-message-access-qa.md`, record `1c88873`);
  - security `Reviewed-At: 983681c…`, APPROVED, M-001 resolved (`security/fix-personal-message-access-security-audit.md`, record
    `dfea2f9`).
  Re-read each before you act.
- **Steering's dry run, 00:2xZ:** `release-move.js website master 983681ca6cd7cbacd0796ed093e094057ad7f9be --dry-run`: "every check
  passed; nothing moved". ff-from-remote ok; no sibling serving refs; `workflows none — …/.github/workflows absent`. Live `master` was
  `787bec5` (`ls-remote`). Run your own.
- **Assumption Not Checked, per stage, to sweep:** the code review's and QA's (both: whether `fk_users_id` and `fk_guilds_id` can both be
  set; the session-identity assumption), each under its document's "Assumption Not Checked" heading. Also security's RC-2 in its audit's
  Required Controls.
- **Post-deploy carriers for your Stage 1 handoff** (a timed or event read, never this thread's memory). Both are walked by a uat-role
  session on the test accounts on live hooks.gg, under his standing ruling (`steering/015-rulings.md` line 429), with screenshots kept
  untracked (his 09:01Z ruling, `steering/017-rulings.md`):
  - B-2 first: a signed-in `message.getOne` on `99999999999999999999` returns 400 BAD_REQUEST (500 means unfixed).
  - Then B-1: re-walk `verification/access-defects/browser-check/README.md`. Account 1 must be refused account 2's personal message.
  - Together these are security's RC-2, the one production read of the session path. QA's register rows B-1 and B-2.
- **Handoffs this chain created**, for your forward-item sweep (paths in rulings blocks 22:37Z, 22:59Z and 23:09Z). Seven in all. One,
  `handoff/upsert-message-count-problem-area-false-after-access-fix-2026-11-19.md` (Owning-Stage architect), fires at this release.
- **Open carrier touching the route:** chain 017's `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`. His looks B-6, B-8 and
  B-9 are live on production, and this release lands under them.
- **His residue read** (the production database, which only he can query) is steering's question to him. It gates no release act.
- **Deliver your report to** `steering-roadmap-hooks` by SendMessage, along with owner-needing items and spawn cues.
