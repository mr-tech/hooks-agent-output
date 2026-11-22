Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-decorator-offsets-brief-common.md` — read it whole first. Rulings block
"2026-11-22T20:31" (`steering/fix-decorator-offsets-rulings.md`) adds: heading lines (`# …`, mid-line `-# **a**`) are mis-coloured at base
and are out of this chain, carried by the queued chain `fix-decorator-headings`; the fixer dropped two guards that only a heading reaches.

You are `code-reviewer-fix-decorator-offsets`. Review the fixer's hand-off per your definition, starting on its committed document:
`implementation/fix-decorator-offsets-implementation.md` (record `627ec83e`), `Handoff-At: f57c260 — repos=website` (full SHA
`f57c2608f5fb17e3b35f092d8dad00315b4f3646`, read by steering with `git rev-parse`).

- The tree: website `chain/fix-decorator-offsets`, checked out in `/usr/local/bin/hooks/website`; do not switch it — use a `git archive`
  export for any other SHA (`8845b7e` is the base).
- Production lines: `git diff --numstat 8845b7e f57c260`, read by steering: `decorator.tsx` 18/4, `__tests__/decorator.emphasis-syntax-ranges.test.ts`
  163/0. The fixer counts 18; re-derive the count under the GLOSSARY's "Production line" definition. Under 20, per the stage set you also
  run the suite and `pnpm run typecheck` (exit codes recorded, in an export: the shared tree's stale `.next/types` makes an in-tree
  typecheck exit 2; the fixer reports an export also needs the git-ignored `next-env.d.ts`, or base and fix both exit 2) and the red test.
- Each hazard of the common part is a candidate to re-derive, hazard 2 (shapes that worked stay the same) and 3 (literal expectations)
  first; and whether any heading input now colours differently from base (the ruling accepts "wrong before, still wrong", not a new wrong).
- Your document: `code-review/fix-decorator-offsets-code-review.md`; evidence under `verification/fix-decorator-offsets/code-review/`.
- A verdict carries `Reviewed-At: <sha>`. Approval: spawn cue to `steering-hooks-fixer` by SendMessage (devops is started from it). A
  rejection goes to `fixer-fix-decorator-offsets`, copied to `steering-hooks-fixer`.
- Owner-needing items: SendMessage to `steering-hooks-fixer`.
