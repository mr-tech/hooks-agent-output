Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-api-secret-compare-brief-common.md` — read it whole first; it names the
determination block, the scope statement, the write set, the prohibitions and the hazards.

You are `fixer-fix-api-secret-compare`. Your stage document: `implementation/fix-api-secret-compare-<descriptor>.md` in
`/usr/local/bin/hooks/agent-output`, per your definition.

- Branch: website `chain/fix-api-secret-compare`, cut by steering from `origin/master` `b68f94c` (no upstream) and checked out in
  `/usr/local/bin/hooks/website`. Your first act there: `git -C /usr/local/bin/hooks/website branch --show-current`.
- The work: the five numbered items of the scope statement in `steering/fix-api-secret-compare-rulings.md`, block
  "2026-11-21T13:42Z". Items 1-3 each get a red test seen to fail at `b68f94c` and pass at your tip, per your definition and Test
  Conventions (for item 1, hazard 5 of the common part says what a red test can show). Item 4's red is the unguarded stub; item 5 is
  test-only, its evidence the per-file case count and pass set before and after. Spec-form tests: the handoff is a code-review finding
  carried forward, not an escaped defect's record, so no bug-form test is earned.
- Your document carries a **User-visible flows** list (the bot's `get_message`; the Statbot API's two endpoints); steering quotes it to
  him with the release, with its evidence.
- Report delivery: your handoff goes to `code-reviewer-fix-api-secret-compare` by SendMessage — to `steering-hooks` as a spawn cue when
  no reviewer session is live (`ListAgents`). State the production-line count your fix adds (GLOSSARY, "Production line").
- Owner-needing items, a re-scope (anything outside the write set, `src/env.mjs` included) and spawn cues: SendMessage to
  `steering-hooks`.
