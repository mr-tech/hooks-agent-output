Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-message-not-found-brief-common.md` — read it whole first.

You are `devops-fix-message-not-found`. You start on QA's committed Phase 2 verdict:
`/usr/local/bin/hooks/agent-output/qa/fix-message-not-found-qa.md` (record `c4c2afc`, "Status: QA Complete", `Verified-At` `f4baebb`,
production code identical to `6b539e5`). The code review: `code-review/fix-message-not-found-code-review.md` (record `a56b691`,
`Reviewed-At` `6b539e5`, round 1, APPROVED_WITH_COMMENTS); steering has asked the reviewer for a sub-entry over QA's test-only delta
`6b539e5..f4baebb` — read its `Reviewed-At` at your Stage 1 and state in your record whether it names the tip. The fixer's document:
`implementation/fix-message-not-found-implementation.md`.

- **The release:** website `master` from `6f76c6d` to the chain tip `chain/fix-message-not-found` (`f4baebb` at QA's verdict; re-read
  it). Vercel deploys `master` to production; website has no `.github/workflows` (`release-move.js --dry-run` 06:4xZ, block 06:46Z of
  `steering/fix-message-not-found-rulings.md`). His release approval is yours to ask in this session (Phase 2B); this thread puts no
  release prompt while you are live.
- **Gate evidence:** 56 added production lines, so the set has QA Phase 2. The verdict that gates the push is QA's `Verified-At`.
- **Decisions:** the rulings file above (block 06:46Z, the determination, which quotes his two selections). Effort-wide:
  `steering/fixer-queue-2026-11-21-rulings.md`, blocks 05:50Z (Q1) and 05:55Z.
- **Assumptions Not Checked:** `code-review/fix-message-not-found-code-review.md`, "## Assumption Not Checked" (line 116) — closed true by
  QA (`qa/…`, line 83); `qa/fix-message-not-found-qa.md`, "## Assumption Not Checked" (line 165), routed by QA to its row B-1.
- **Post-deploy row owed:** QA's register row B-1 (`qa/fix-message-not-found-qa.md` line 163, owner qa, post-deploy-observable) needs its
  carrier from your Stage 1 (devops.md): QA's pre-release read was 6022 → 500 "no result", 1000 → 403 FORBIDDEN; the prediction after the
  push is both 404 with the one text, the edit page showing the notice after one request. A read through the Discord test account is a
  standing default, never asked; it is read-only (no save, no delete on production).
- **For his release word, quote with it:** the fixer's **User-visible flows** (`implementation/fix-message-not-found-implementation.md`,
  § User-visible flows, lines 221–229) and the reviewer's CR-1 line: "If you reload a message that was deleted, or that you lost access
  to, the page shows the same notice." And this exclusion (block 06:46Z): signed-out visitors to these pages still see the blank editor.
- **Carriers for your forward-item sweep:** the three source handoffs (discharged by this chain):
  `handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md`,
  `handoff/editor-shows-blank-shell-when-personal-message-load-is-refused-2026-11-20.md`,
  `handoff/deleted-message-url-serves-blank-editor-2026-11-20.md`.
- **Hazards (the sweep did not cover them):** `useApiMethods`/`usePusher` refetch after a refusal not traced; `WebhookProvider`'s
  Discord-message loads not read; nothing about signed-out behaviour changes.
- After release: the chain branch is merged and deleted, the tree left on `master`, per your definition.
- Report delivery: your committed record is the receipt; owner-needing items and the release-complete cue go to `steering-hooks` by
  SendMessage.
