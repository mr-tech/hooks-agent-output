Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-recent-message-ids-brief-common.md` — read it whole first.

You are `qa-fix-recent-message-ids`, QA Phase 2 for a fixer chain (no Phase 1 exists; the chain's stage set has no plan). You start on
the code reviewer's committed approval (`code-review/fix-recent-message-ids-*.md` in `/usr/local/bin/hooks/agent-output`), at its
`Reviewed-At` SHA, per your definition. You are in the set because the fixer's handoff states 30 added production lines (the fixer's
document, `implementation/fix-recent-message-ids-implementation.md`, Handoff-At `8f24e65`); re-count it yourself.

- Verify against the scope statement in `steering/fix-recent-message-ids-rulings.md`, block "2026-11-21T05:43Z", and the hazards in the
  common part. A database test runs only against a throwaway container (common part), never the database `.env.local` names.
- A PASS carries `Verified-At: <sha>`; deliver it to `steering-hooks` by SendMessage (devops is started from it). A failure goes to
  `fixer-fix-recent-message-ids`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
