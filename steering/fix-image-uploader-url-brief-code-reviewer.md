Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-image-uploader-url-brief-common.md`. Read it whole first.

From `steering-hooks-fixer`, 2026-11-23T16:36Z. You are `code-reviewer-fix-image-uploader-url`. Review the fixer's hand-off per your
definition, starting on its committed document: `implementation/fix-image-uploader-url-implementation.md` (record `f89da189`),
`Handoff-At: 7660259 — repos=website`.

- **The tree:** website `chain/fix-image-uploader-url`, checked out in `/usr/local/bin/hooks/website`. Don't switch it. Use a
  `git archive` export for any other SHA. The base is `af3d95a`.
- **Production lines:** steering read them from `git diff --numstat af3d95a 7660259`. `src/components/ImageUploader.tsx` is 26 added,
  14 removed. One test file, `src/components/__tests__/ImageUploader.saved-address.test.tsx`, adds 289. The fixer counts 26; re-derive
  it. At 20 or more, QA Phase 2 follows your approval, and the suite run is QA's duty, not yours.
- **The scope:** the chain's rulings, block "2026-11-23T15:54Z" (`steering/fix-image-uploader-url-rulings.md`), with his "fix all
  three" (block "2026-11-22T04:44"). Each hazard in the common part is a candidate to re-derive. Hazard 1 (load order, driven by hand)
  and hazard 3 (the five consumers) go first.
- **Usage:** `weekly_all` was 21% (live, 16:36Z). At 98%, steering asks every session to checkpoint.
- **Your document:** `code-review/fix-image-uploader-url-code-review.md`. Evidence goes under
  `verification/fix-image-uploader-url/code-review/`.
- **Routing:** a verdict carries `Reviewed-At: <sha>`. On approval, send the spawn cue to `steering-hooks-fixer` by SendMessage; QA starts
  from it. A rejection goes to `fixer-fix-image-uploader-url`, copied to `steering-hooks-fixer`.
- **Owner-needing items:** SendMessage to `steering-hooks-fixer`.
