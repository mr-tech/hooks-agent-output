Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-trpc-batch-limit-brief-common.md` — read it whole first; it names the
determination block, the scope statement, the write set and the prohibitions.

You are `fixer-fix-trpc-batch-limit`. Your stage document: `implementation/fix-trpc-batch-limit-<descriptor>.md` in
`/usr/local/bin/hooks/agent-output`, per your definition.

- Branch: website `chain/fix-trpc-batch-limit`, cut by steering from `origin/master` `d1bb9b0` (no upstream) and checked out in
  `/usr/local/bin/hooks/website`. Your first act there: `git -C /usr/local/bin/hooks/website branch --show-current`.
- The work: the three numbered items of the scope statement in `steering/fix-trpc-batch-limit-rulings.md`, block
  "2026-11-20T23:57Z", each with a red test where it has behaviour (items 1 and 2), per your definition. Item 3 (the `overrides` key)
  has no behaviour to make red; record why in the Test section.
- Report delivery: your handoff goes to `code-reviewer-fix-trpc-batch-limit` by SendMessage — to `steering-roadmap-hooks` when no
  reviewer session is live (`ListAgents`), as a spawn cue. State the production-line count your fix adds (GLOSSARY, "Production
  line") in the handoff, since 20 or more brings QA Phase 2 in.
- Owner-needing items, a re-scope (anything outside the write set, or `semver` appearing in `pnpm audit --prod` at your tip) and spawn
  cues: SendMessage to `steering-roadmap-hooks`.
