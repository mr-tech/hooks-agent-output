Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-import-save-conflict-brief-common.md` — read it whole first.

You are `code-reviewer-fix-import-save-conflict`. You start on the fixer's committed document (`implementation/fix-import-save-conflict-*.md`
in `/usr/local/bin/hooks/agent-output`) and its handoff SHA, per your definition.

- Review the website change on `chain/fix-import-save-conflict` against the scope statement in `steering/fix-import-save-conflict-rulings.md`,
  block "2026-11-21T07:54Z", and the hazard-bearing analysis in the common part, each hazard a candidate to re-derive.
- Where the fix adds fewer than 20 production lines (count it yourself), you also run the full suite (exit code beside the counters)
  and the red tests at `f4baebb` and at the handoff SHA; QA Phase 2 is then not in the set. At 20 or more, your verdict goes to
  `qa-fix-import-save-conflict` by SendMessage — to `steering-hooks` as a spawn cue when no QA session is live.
- An approval with no QA owed is delivered to `steering-hooks` by SendMessage; a rejection goes to `fixer-fix-import-save-conflict`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
