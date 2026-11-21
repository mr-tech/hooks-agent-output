Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-message-not-found-brief-common.md` — read it whole first.

You are `code-reviewer-fix-message-not-found`. You start on the fixer's committed document (`implementation/fix-message-not-found-*.md`
in `/usr/local/bin/hooks/agent-output`) and its handoff SHA, per your definition.

- Review the website change on `chain/fix-message-not-found` against the scope statement in `steering/fix-message-not-found-rulings.md`,
  block "2026-11-21T06:46Z", and the hazard-bearing analysis in the common part, each hazard a candidate to re-derive.
- Where the fix adds fewer than 20 production lines (count it yourself), you also run the full suite (exit code beside the counters)
  and the red tests at `6f76c6d` and at the handoff SHA; QA Phase 2 is then not in the set. At 20 or more, your verdict goes to
  `qa-fix-message-not-found` by SendMessage — to `steering-hooks` as a spawn cue when no QA session is live.
- An approval with no QA owed is delivered to `steering-hooks` by SendMessage; a rejection goes to `fixer-fix-message-not-found`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
