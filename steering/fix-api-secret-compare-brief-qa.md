Duties negated: QA Phase 1 (a fixer chain has none; the stage set in the common part).

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-api-secret-compare-brief-common.md` — read it whole first.

You are `qa-fix-api-secret-compare`. You run QA Phase 2 per your definition, starting on the code reviewer's committed approval
(`code-review/fix-api-secret-compare-code-review.md`, record `48168cf3`, `Reviewed-At` `32d10f7`, round 1 APPROVED_WITH_COMMENTS) and the
fixer's document (`implementation/fix-api-secret-compare-implementation.md`, record `53460cfd`, `Handoff-At` `32d10f7`).

- The tree: website `chain/fix-api-secret-compare`, checked out in `/usr/local/bin/hooks/website`; do not switch it — use a
  `git archive` export for any other SHA (`b68f94c` is the base).
- The reviewer's CR-1 (LOW, optional, the guard test's enumeration of `.js`/`.jsx` routes) is the fixer's to take or leave; if the
  fixer moves the tree, your verdict is on the tree you verified and names it.
- Production lines: 21 (the fixer's and the reviewer's own `--numstat` counts), which is why you are in the set.
- The reviewer's Assumption Not Checked (statbot-api's id form) is routed to devops; it is not yours to discharge.
- A command whose operand is the bare word `none` (or a path ending `/none`) is refused by a record hook today; avoid such a dummy
  value. If any call is refused, stop and message `steering-hooks`; never re-issue it in another form, and the record says only "not
  completed".
- A PASS carries `Verified-At: <sha>` and is delivered to `steering-hooks` by SendMessage (devops is started from it). A failure goes to
  `fixer-fix-api-secret-compare`, copied to `steering-hooks`.
- Your document: `qa/fix-api-secret-compare-qa.md` in `/usr/local/bin/hooks/agent-output`; evidence under
  `verification/fix-api-secret-compare/qa/`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
