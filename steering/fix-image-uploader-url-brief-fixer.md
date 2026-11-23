Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-image-uploader-url-brief-common.md` — read it whole first.

You are `fixer-fix-image-uploader-url`. Run the fixer chain per your definition on the scope statement in
`steering/fix-image-uploader-url-rulings.md`, block "2026-11-23T15:54Z". It has four limbs: Save commits what the box shows once loaded; a
failing address cannot be saved; no stale check lands, including after Clear; Cancel restores the saved image.

- Tree: website `chain/fix-image-uploader-url` at `af3d95a`, checked out by steering. Your first act there is
  `git -C /usr/local/bin/hooks/website branch --show-current`. Do not switch it.
- Your document: `implementation/fix-image-uploader-url-implementation.md`. Mint its Origin and UUID per your definition. Evidence goes
  under `verification/fix-image-uploader-url/`.
- A finding past the write set comes back to this thread for a re-scope before you code it.
- Hand-off: your `Handoff-At` SHA, and a **User-visible flows** list in plain words for his check, go to
  `code-reviewer-fix-image-uploader-url` by your document. Cue `steering-hooks-fixer` by SendMessage once it is committed; steering
  starts the reviewer. Owner-needing items: SendMessage to `steering-hooks-fixer`.
