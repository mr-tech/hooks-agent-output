Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-import-save-conflict-brief-common.md` — read it whole first.

You are `devops-fix-import-save-conflict`. You start on QA's committed Phase 2 verdict:
`/usr/local/bin/hooks/agent-output/qa/fix-import-save-conflict-qa.md` (record `84e9b6ee`, "Status: QA Complete", `Verified-At`
`b829314`). The code review: `code-review/fix-import-save-conflict-code-review.md` (record `592a7a59`, `Reviewed-At` `b829314`, round 1
REJECTED at `3c6f16f`, sub-entries 1 at `f23568a` and 2 at `b829314`, APPROVED). The fixer's document:
`implementation/fix-import-save-conflict-implementation.md`.

- **The release:** website `master` from `f4baebb` to the chain tip `chain/fix-import-save-conflict` (`b829314` at QA's verdict; re-read
  it). Vercel deploys `master` to production; website has no `.github/workflows` (`release-move.js --dry-run` 07:5xZ, block 07:54Z of
  `steering/fix-import-save-conflict-rulings.md`). His release approval is yours to ask in this session (Phase 2B); this thread puts no
  release prompt while you are live.
- **Gate evidence:** 27 added production lines (the reviewer's count), so the set has QA Phase 2. The verdict that gates the push is
  QA's `Verified-At`, which the review's `Reviewed-At` also names.
- **Decisions:** the rulings file above, blocks 07:54Z (determination, his Q2 words and this thread's reading) and 08:13Z (lint debt
  shipped by his selection; the preview ruling). Effort-wide: `steering/fixer-queue-2026-11-21-rulings.md`.
- **Assumptions Not Checked:** `code-review/fix-import-save-conflict-code-review.md`, "## Assumption Not Checked" (line 101) —
  discharged by QA's walk (`qa/…`, line 83); `qa/fix-import-save-conflict-qa.md`, "## Assumption Not Checked" (line 125): the walk
  served the `getFromUrl` / `getFromCode` bodies itself, and Discord's live row D/B/E responses are unchecked (BC-17).
- **Post-deploy row owed** (a row of your deployment record; its preconditions named here, per the batch retrospective's lesson): on
  hooks.gg, signed in as the Discord test account (the `discord-test-browser` skill), open "Create or upload a new message" and load,
  by the Message Link tab, a real Discord message from the Claude test server (guild `1566742402180456559`) for each row the test
  estate can produce — at least one Components V2 message and one classic message with content. **Precondition:** such messages must
  exist in that server; posting them there by the test bot or a test webhook is allowed (`/home/dev/.claude/CLAUDE.md`, Outbound
  messages: the test server is the agents' own). **Not allowed:** Save on hooks.gg (no production write); read the dialog's notice,
  preview and Save's enabled state only. Prediction: QA's flows 1-3; falsifier: no preview, or the old red error with Save off.
- **For his release word, quote with it** the fixer's **User-visible flows** (`implementation/fix-import-save-conflict-implementation.md`,
  § User-visible flows, line 114 on), each with its evidence: flows 1-5 were walked by QA on a local build with the import responses
  served in the router's shapes (not Discord's live responses); flow 6 rests on the suite.
- **Carriers for your forward-item sweep:** `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` (discharged by this
  chain — close it only after the post-deploy row is read); `handoff/newmessagemodal-preexisting-react-hooks-lint-errors-2026-11-21.md`
  (stays open, own trigger).
- **Hazards (the sweep did not cover them):** whether Discord ever returns row E (BC-17); production data; `PresetDialog` and `Form`
  submit handling; server `upsert` on a row E payload; `EditMessageMenu` and the `oldMessage` flow.
- After release: the chain branch is merged and deleted, the tree left on `master`, per your definition.
- Report delivery: your committed record is the receipt; owner-needing items and the release-complete cue go to `steering-hooks` by
  SendMessage.
