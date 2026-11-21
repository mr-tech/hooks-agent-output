Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-recent-message-ids-brief-common.md` — read it whole first.

You are `code-reviewer-fix-recent-message-ids`. You start on the fixer's committed document
(`implementation/fix-recent-message-ids-*.md` in `/usr/local/bin/hooks/agent-output`) and its handoff SHA, per your definition.

- Review the website change on `chain/fix-recent-message-ids` against the scope statement in
  `steering/fix-recent-message-ids-rulings.md`, block "2026-11-21T05:43Z", and the hazard-bearing analysis in the common part, each
  hazard a candidate to re-derive.
- Where the fixer's handoff states fewer than 20 added production lines (GLOSSARY, "Production line" — count it yourself), you also run
  the full suite (exit code beside the counters) and the red tests at `76da25c` and at the handoff SHA; QA Phase 2 is then not in the
  set. At 20 or more, your verdict goes to `qa-fix-recent-message-ids` instead, by SendMessage — to `steering-hooks` as a spawn cue
  when no QA session is live.
- An approval with no QA owed is delivered to `steering-hooks` by SendMessage (the chain's devops is started from it); a rejection
  goes to `fixer-fix-recent-message-ids`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
