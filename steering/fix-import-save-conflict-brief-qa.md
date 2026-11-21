Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-import-save-conflict-brief-common.md` — read it whole first.

You are `qa-fix-import-save-conflict`, QA Phase 2 for a fixer chain (no Phase 1; the stage set has no plan). You start on the code
reviewer's committed approval (`code-review/fix-import-save-conflict-*.md` in `/usr/local/bin/hooks/agent-output`), at its `Reviewed-At`
SHA, per your definition. You are in the set because the fixer's handoff states 22 added production lines
(`implementation/fix-import-save-conflict-implementation.md`, Handoff-At `3c6f16f`); the reviewer counts 27 at its approval
(`f23568a`, record `87e66c6f`); re-count it yourself. The reviewer's two Assumption Not Checked lines are yours (its document).

- Verify against the scope statement in `steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z", and the hazards in the
  common part — in particular rows A-E each reach a working Save, the saved draft is the settled or chosen one, and the JSON tab's own behaviour is unchanged.
- The fixer's **User-visible flows** list is what he will read with the release; a flow your pass finds wrong is a finding.
- A PASS carries `Verified-At: <sha>`; deliver it to `steering-hooks` by SendMessage (devops is started from it). A failure goes to
  `fixer-fix-import-save-conflict`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
