Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-recent-message-ids-brief-common.md` — read it whole first.

You are `devops-fix-recent-message-ids`. You start on QA's committed Phase 2 verdict:
`/usr/local/bin/hooks/agent-output/qa/fix-recent-message-ids-qa.md` (record `ec750c0`, "Status: QA Complete", `Verified-At` `6f76c6d`).
The code review: `code-review/fix-recent-message-ids-code-review.md` (record `b6d5634`, `Reviewed-At` `6f76c6d`, sub-entry 1.1, a
test-only delta from round 1 at `8f24e65`). The fixer's document: `implementation/fix-recent-message-ids-implementation.md`.

- **The release:** website `master` from `76da25c` to the chain tip `chain/fix-recent-message-ids` (`6f76c6d` at QA's verdict; re-read
  it). Vercel deploys `master` to production; website has no `.github/workflows` (`release-move.js --dry-run` 2026-11-21T05:4xZ, block
  05:43Z of `steering/fix-recent-message-ids-rulings.md`). His release approval is yours to ask in this session (Phase 2B); this thread
  puts no release prompt while you are live.
- **Gate evidence:** 30 added production lines (fixer, reviewer and QA counts), so the set has QA Phase 2. The verdict that gates the
  push is QA's `Verified-At`; state in your record that the tip's tree is that tree.
- **Decisions:** the rulings file above is this chain's register: blocks 05:43Z (determination) and 06:27Z (QAF-3 test-only addition
  in scope; the real-wire permissions check carried to you). Effort-wide: `steering/fixer-queue-2026-11-21-rulings.md`.
- **Assumptions Not Checked:** `code-review/fix-recent-message-ids-code-review.md`, "## Assumption Not Checked" (line 193) and its
  devops line 208; `qa/fix-recent-message-ids-qa.md`, "## Assumption Not Checked" (line 163). The fixer's document has no such heading
  (`grep -n -i 'assumption not checked'`, no line).
- **Post-deploy rows owed** (each a row of your deployment record):
  1. A read of the production function logs after the deploy for `ids.filter is not a function` (a stored `recentMessageIds` that is not
     an array). Read-only Vercel reads are standing defaults, never asked (`steering/017-rulings.md` blocks 2026-11-18T23:15Z and 23:41Z,
     bounds in 23:41Z).
  2. On hooks.gg, signed in as the Discord test account (the `discord-test-browser` skill): the hydrated recent list after the push
     shows the test account's own server's messages and no other server's — the real-wire form of Discord's `permissions` field, which
     no test exercises (block 06:27Z). A read through the test account is a standing default, never asked.
- **Carriers for your forward-item sweep:** `handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md` and
  `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` (discharged by this chain);
  `handoff/hydrated-recent-ids-not-canonicalised-2026-11-21.md` (UUID 09ed9be5, the reviewer's CR-1, stays open, own trigger).
- **Hazards (the sweep did not cover them):** no production count of stored bad or foreign ids; other writers of `Users.preferences` not
  enumerated; NextAuth internals and the 600-second guild cache not exercised. A user who loaded a server message's number into his list
  without administering that server loses it from his recent list after release — read from code, not run; intended by the scope.
- After release: the chain branch is merged and deleted, the tree left on `master`, per your definition.
- Report delivery: your committed record is the receipt; owner-needing items and the release-complete cue go to `steering-hooks` by
  SendMessage.
