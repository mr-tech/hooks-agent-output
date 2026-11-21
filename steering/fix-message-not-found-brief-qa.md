Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-message-not-found-brief-common.md` — read it whole first.

You are `qa-fix-message-not-found`, QA Phase 2 for a fixer chain (no Phase 1; the stage set has no plan). You start on the code
reviewer's committed approval (`code-review/fix-message-not-found-*.md` in `/usr/local/bin/hooks/agent-output`), at its `Reviewed-At`
SHA, per your definition. You are in the set because the fixer's handoff states 56 added production lines
(`implementation/fix-message-not-found-implementation.md`, Handoff-At `6b539e5`); re-count it yourself.

- Verify against the scope statement in `steering/fix-message-not-found-rulings.md`, block "2026-11-21T06:46Z", and the hazards in the
  common part — in particular that the three cases are indistinguishable in code and message text, and that only `getOne` changed.
- The fixer's **User-visible flows** list is what he will read with the release; a flow your pass finds wrong is a finding.
- A PASS carries `Verified-At: <sha>`; deliver it to `steering-hooks` by SendMessage (devops is started from it). A failure goes to
  `fixer-fix-message-not-found`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
