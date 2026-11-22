Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-cut-collapsed-caret-brief-common.md` — read it whole first. Its scope
statement is corrected by rulings block "2026-11-22T18:53" (`steering/fix-cut-collapsed-caret-rulings.md`): Cut with a collapsed caret
that is not inside an emoji (inline void) deletes nothing; Cut on an expanded selection, and on a clicked emoji, behaves as at base.

You are `code-reviewer-fix-cut-collapsed-caret`. Review the fixer's hand-off per your definition, starting on its committed document:
`implementation/fix-cut-collapsed-caret-implementation.md` (record `083260a4`), `Handoff-At: 329cc20 — repos=website` (full SHA
`329cc20714c8b956a79ed2459f67d2fb13657ada`, read by steering with `git rev-parse`).

- The tree: website `chain/fix-cut-collapsed-caret`, checked out in `/usr/local/bin/hooks/website`; do not switch it — use a `git archive`
  export for any other SHA (`453de76` is the base).
- Production lines: `git diff --numstat 453de76 329cc20`, read by steering: `onCopy.ts` 5/4, `__tests__/onCopy.cut.test.tsx` 84/0. Re-derive
  the count under the GLOSSARY's "Production line" definition. Under 20, per the stage set you also run the suite and `pnpm run
  typecheck` (exit codes recorded, in an export: the shared tree's stale `.next/types` makes an in-tree typecheck exit 2) and the fixer's
  red evidence.
- Each hazard of the common part is a candidate to re-derive, the corrected statement's three cases and hazard 3 (environment fidelity:
  no assertion on a path jsdom fakes) first.
- Your document: `code-review/fix-cut-collapsed-caret-code-review.md`; evidence under `verification/fix-cut-collapsed-caret/code-review/`.
- A verdict carries `Reviewed-At: <sha>`. Approval: spawn cue to `steering-hooks-fixer` by SendMessage (devops is started from it). A
  rejection goes to `fixer-fix-cut-collapsed-caret`, copied to `steering-hooks-fixer`.
- Owner-needing items: SendMessage to `steering-hooks-fixer`.
