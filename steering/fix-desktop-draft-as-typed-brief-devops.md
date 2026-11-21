Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-desktop-draft-as-typed-brief-common.md` — read it whole first.

You are `devops-fix-desktop-draft-as-typed`. You start on QA's committed verdict:
`/usr/local/bin/hooks/agent-output/qa/fix-desktop-draft-as-typed-qa.md` (record `71fc7b56`, "Status: QA Complete", `Verified-At`
`b68f94c`) — a pre-release browser walk of flows 1-4, the stage his 11:14Z selection added. The code review:
`code-review/fix-desktop-draft-as-typed-code-review.md` (record `488b209`, `Reviewed-At` `b68f94c`, Round 1 APPROVED_WITH_COMMENTS;
CR-1 corrected by the fixer, record `f25ef260`). The fixer's document: `implementation/fix-desktop-draft-as-typed-implementation.md`.

- **The release:** website `master` from `b663b35` to the chain tip `chain/fix-desktop-draft-as-typed` (`b68f94c` at QA's verdict; re-read
  it). Vercel deploys `master` to production; website has no `.github/workflows` (`release-move.js --dry-run` 10:43Z, block 10:43Z of
  `steering/fix-desktop-draft-as-typed-rulings.md`). His release approval is yours to ask in this session (Phase 2B); this thread puts
  no release prompt while you are live.
- **Gate evidence:** 17 added production lines (the reviewer's recount), so no QA Phase 2 test audit; the review ran the suite (exit 0
  at both SHAs), the red tests and 7 controls. QA's walk verdict and the review's `Reviewed-At` name the same SHA.
- **Decisions:** the rulings file above — blocks 10:43Z (determination; his Q3 and reach words by pointer), 11:13Z (approval; CR-1 read
  as no product decision), 11:14Z (his selection: walk before release; the amended stage set). Effort-wide:
  `steering/fixer-queue-2026-11-21-rulings.md`, blocks 05:50Z and 05:59Z.
- **Assumptions Not Checked:** `code-review/fix-desktop-draft-as-typed-code-review.md`, "## Assumption Not Checked" (line 96) —
  discharged at route 0 by QA's walk; `qa/fix-desktop-draft-as-typed-qa.md`, "## Assumption Not Checked" (line 103) — the saved-message
  route was not walked; it becomes the post-deploy row below, run by an agent, not left to his walk. QA's Residue (line 97): Chrome only;
  per-keystroke write cost unmeasured.
- **Post-deploy row owed** (a row of your deployment record; preconditions named, per the batch retrospectives' lessons): on hooks.gg in
  a desktop-width window, signed in as the Discord test account (the `discord-test-browser` skill), open one of that account's saved
  messages at `/message/m/<id>/edit` (017's B-9 walk used 6024; whether it still exists is unread — any saved message of the test
  account serves). Type into the open content editor and into an embed's author name, reload before clicking away, and read whether the
  text comes back and the leave prompt fires. **Baseline before the push:** the same steps on production before the release (the text is
  lost there), its unchanged limbs read as the baseline. **Precondition:** a saved message owned by the test account on production; if
  none exists, the row is reported NOT EXECUTED to `steering-hooks`, not satisfied by creating one. **Not allowed:** Save on hooks.gg (no
  production write); afterwards type the field back to its saved text so the draft is removed. Prediction: QA's flows 1 and 3 at the
  saved route; falsifier: the typed text is gone after the reload.
- **For his release word, quote with it** the fixer's **User-visible flows** (`implementation/fix-desktop-draft-as-typed-implementation.md`,
  § User-visible flows, line 115 on), each with its evidence: flows 1, 3, 4 walked by QA in Chrome at route 0 on a local build (QA
  § Per-flow execution); flow 2 walked for embed description and field name only — title, field value and Text Display rest on the
  shared component and the suite; flow 5 on the code and the reviewer's probe; flow 6 on `git diff --quiet` of the two dialogs; flow 7
  on code reading.
- **Carriers for your forward-item sweep:** `handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md` (f1356f4b,
  discharged by this chain — close it only after the post-deploy row is read); `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`
  (26c40e4f; its B-9 stated limit is what this chain fixes — note the release in its changelog; its open rows B-7 and B-10 are not
  this chain's and keep it open).
- **Hazards (the sweep did not cover them):** pre-017 behaviour at `1ad625e`; `useLocalStorage` readers of the synchronous `storage`
  event; per-keystroke cost of the 1 MiB draft map (unmeasured); browsers other than Chrome; mobile `BottomPortal` close.
- After release: the chain branch is merged and deleted, the tree left on `master`, per your definition.
- Report delivery: your committed record is the receipt; owner-needing items and the release-complete cue go to `steering-hooks` by
  SendMessage.
