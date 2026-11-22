Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-middleware-dead-matcher-brief-common.md` — read it whole first.

You are `code-reviewer-fix-middleware-dead-matcher`. Review the fixer's hand-off per your definition, starting on its committed
document: `implementation/fix-middleware-dead-matcher-implementation.md` (record `2e61217`), `Handoff-At: 453de76 — repos=website`
(full SHA `453de76187c5c368732a20d2dd8a671ed97eed4c`, read by steering with `git rev-parse`).

- The tree: website `chain/fix-middleware-dead-matcher`, checked out in `/usr/local/bin/hooks/website`; do not switch it — use a
  `git archive` export for any other SHA (`3859c29` is the base).
- Production lines: `git diff --numstat 3859c29 453de76`, read by steering: `src/proxy.ts` 19/0, `src/middleware.ts` 0/23,
  `src/__tests__/proxy.matcher-routes.test.ts` 49/0, the moved header test 2/2. The fixer counts 19 added production lines, one under the
  20 that restores QA Phase 2: re-derive that count under the GLOSSARY's "Production line" definition. Under 20, per the stage set you
  also run the suite and `pnpm run typecheck` (exit codes recorded) and the fixer's red evidence.
- The fixer reports `pnpm run typecheck` exits 2 in the shared tree on a stale gitignored `.next/types/validator.ts`, and 0 in clean
  exports: run yours in an export.
- Each hazard of the common part is a candidate to re-derive, hazard 1 (the proxy runs on Node, not edge) and 2 (no `middleware.*`
  convention file left) first.
- Your document: `code-review/fix-middleware-dead-matcher-code-review.md`; evidence under `verification/fix-middleware-dead-matcher/code-review/`.
- A verdict carries `Reviewed-At: <sha>`. Approval: spawn cue to `steering-hooks-fixer` by SendMessage (devops is started from it). A
  rejection goes to `fixer-fix-middleware-dead-matcher`, copied to `steering-hooks-fixer`.
- Owner-needing items: SendMessage to `steering-hooks-fixer`.
