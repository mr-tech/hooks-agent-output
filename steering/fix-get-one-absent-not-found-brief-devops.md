Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-get-one-absent-not-found-brief-common.md` — read it whole first.

You are `devops-fix-get-one-absent-not-found`. You start on QA's committed Phase 2 verdict:
`/usr/local/bin/hooks/agent-output/qa/fix-get-one-absent-not-found-qa.md` (record `5b9472ef`, "Status: QA Complete", `Verified-At`
`b663b35`). The code review: `code-review/fix-get-one-absent-not-found-code-review.md` (record `84473927`, `Reviewed-At` `b663b35`,
round 1 APPROVED, 0 findings). The fixer's document: `implementation/fix-get-one-absent-not-found-implementation.md` (`Handoff-At`
`b663b35`).

- **The release:** website `master` from `b829314` to the chain tip `chain/fix-get-one-absent-not-found` (`b663b35` at QA's verdict;
  re-read it). Vercel deploys `master` to production. This thread's `release-move.js … master b663b354… --dry-run` at 10:06Z: "ff-from-remote
  ok; sibling serving refs (none) on one line ok … workflows none … DRY RUN: every check passed; nothing moved"; the `--qa-record` form
  on the Phase 2 record refused ("its Phase is not 3"), so the release-tip evidence is yours to obtain, as chain 3's was (a QA Phase 3
  record from `qa-fix-get-one-absent-not-found`, live at 10:06Z). His release approval is yours to ask in this session (Phase 2B); this
  thread puts no release prompt while you are live.
- **Gate evidence:** 149 added production lines (the reviewer's and QA's count, 136 a re-indent), so the set has QA Phase 2.
- **Decisions:** `steering/fix-get-one-absent-not-found-rulings.md`, blocks 08:57Z (determination, scope, post-deploy row), 09:03Z
  (`MessageNotFoundError` in scope), 09:16Z (pre-existing Navigation lint shipped and recorded, on his 08:13Z selection), 09:51Z
  (unpark). Effort-wide: `steering/fixer-queue-2026-11-21-rulings.md`.
- **Assumptions Not Checked:** `code-review/fix-get-one-absent-not-found-code-review.md`, "## Assumption Not Checked" (line 91), and
  `qa/fix-get-one-absent-not-found-qa.md`, "## Assumption Not Checked" (line 162) — the same one: the Next production bundle holds
  `shared.ts` and `message.ts` as one module instance in the tRPC route. Falsity signature: after the deploy an absent number on hooks.gg
  still answers 500 "no result". Both name your post-deploy row as its owner.
- **Post-deploy row owed** (a row of your carrier, read after the Vercel production build of `master` is live; preconditions named here):
  QA register row B-1's absent-number limb (`qa/fix-get-one-absent-not-found-qa.md`). On hooks.gg, signed in as the Discord test
  account (the `discord-test-browser` skill), read only: a message number no row holds (QA used 6022 at 10:01Z, then 500 "no result";
  re-confirm it is still absent) answers 404 with the one text, and `/message/m/<number>/edit` shows "This message doesn't exist, or
  you don't have access to it." without the editor bar (no name field, no File/Edit/View/Help menus, no Send). **Not allowed:** any
  save or other production write. Prediction: the fixer's flows 1-2; falsifier: 500 "no result", or the editor bar on the notice page.
- **For his release word, quote with it** the fixer's **User-visible flows** (`implementation/fix-get-one-absent-not-found-implementation.md`,
  § User-visible flows, line 205 on), each with its evidence: flows 1-4 rest on the suite's cases at `b663b35`; QA found them correct as
  written (its § Handoff), flow 3's server limb entailed by the code, not mounted; the reviewer's real-postgres probe shows flow 1's
  server answer at both SHAs. Production at 10:01Z still answers 500 for an absent number (QA's read).
- **Carriers for your forward-item sweep:** `handoff/get-one-absent-number-still-500-in-production-2026-11-21.md` (UUID 7c3e91a4) and
  `handoff/fix-message-not-found-post-deploy-2026-11-21.md` (B-1) — discharged by this chain; close each only after the post-deploy row
  is read and holds. `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md` stays open (its own trigger).
- **Hazards (the sweep did not cover them):** the outer `/message` header; `SendMenuTitle`; the Next bundle's module resolution
  (above); production data.
- After release: the chain branch is merged and deleted, the tree left on `master`, per your definition.
- Report delivery: your committed record is the receipt; owner-needing items and the release-complete cue go to `steering-hooks` by
  SendMessage.
