Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-api-secret-compare-brief-common.md` — read it whole first.

You are `code-reviewer-fix-api-secret-compare`. You start on the fixer's committed document
(`implementation/fix-api-secret-compare-implementation.md` in `/usr/local/bin/hooks/agent-output`, commit `53460cfd`) and its
`Handoff-At` SHA (`32d10f7`, copied from that field), per your definition.

- Review the website change on `chain/fix-api-secret-compare` (`b68f94c..32d10f7`) against the scope statement in
  `steering/fix-api-secret-compare-rulings.md`, block "2026-11-21T13:42Z", and the hazard-bearing analysis in the common part, each
  hazard a candidate to re-derive (2, unequal lengths; 3, `secretEquals` outside the edge bundle; 4, non-string headers; 5, what the
  tests can show of the constant-time property, above all).
- The fixer's premise correction: `makeRes` had 5 importers at `b68f94c`, not the 4 the determination names; the fifth
  (`cron.scheduled-selection.test.ts`) was moved with the rest. Establish the count from git at `b68f94c` yourself.
- The production-line count governs QA: count it yourself (GLOSSARY, "Production line"). At 20 or more, your verdict goes to
  `qa-fix-api-secret-compare` by SendMessage — to `steering-hooks` as a spawn cue when no QA session is live (`ListAgents`). Under 20,
  you also run the full suite (exit code beside the counters) and the red tests at `b68f94c` and the handoff SHA, and an approval goes
  to `steering-hooks`.
- The fixer's **User-visible flows** list is what he will read with the release; a flow your review finds wrong is a finding.
- A rejection goes to `fixer-fix-api-secret-compare`. Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
