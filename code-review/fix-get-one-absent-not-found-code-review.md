---
ID: n/a
Origin: fix-get-one-absent-not-found
UUID: fcce3991
Reviewed-At: "b663b35 — repos=website"
Status: In Review
Status-Detail: "Round 1 partial, parked on the owner's word ('Park the chains', relayed by steering-hooks 09:17Z); no verdict rendered; findings not yet written."
Round: 1
---

# Code Review: fix-get-one-absent-not-found

**Plan Reference**: none (fixer chain); scope statement `steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T08:57Z"
**Implementation Reference**: `agent-output/implementation/fix-get-one-absent-not-found-implementation.md` (record commit `8400307c`, `Handoff-At` `b663b35`)
**Date**: 2026-11-21
**Reviewer**: code-reviewer-fix-get-one-absent-not-found

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T09:17 | steering-hooks | Review website `b663b35` against the 08:57Z scope statement | Round 1 opened and parked partway on steering's relay of "Park the chains": what was read is recorded below; no findings or verdict written. |

## Round 1 — what was read before the park (no verdict)

- Stage start: the implementation document at `Handoff-At` `b663b35`; website `HEAD` and `chain/fix-get-one-absent-not-found` both
  `b663b354fb236c3ee58d8b0be01778e1908e0e10` at 09:17Z; tree `?? .playwright-mcp/` only.
- Production lines, counted by me: `git diff --numstat b829314..b663b35` added column over production paths — `Navigation.tsx` 139,
  `shared.ts` 7, `message.ts` 3 — **149**, so QA Phase 2 is owed and the verdict goes to `qa-fix-get-one-absent-not-found`. Under
  `git diff -w`: 13 added, 6 removed across the three files.
- Production diff read whole (`git diff -w b829314..b663b35 -- src ':!*__tests__*'`) and the test/helper diff read whole. Nothing in
  `shared.ts` changes except the class and the one argument (ruling 09:03Z condition a, consistent with the diff read).
- Mechanism read in kysely 0.26.1 CJS (`dist/cjs/query-builder/select-query-builder.js`, `executeTakeFirstOrThrow`;
  `no-result-error.js`, `isNoResultErrorConstructor` = `hasOwnProperty(fn, 'prototype')`): a class passed as the argument is
  constructed with `new`, so the thrown error is the website-owned `MessageNotFoundError` whichever kysely build runs the query.
  project-utils' `getPostgres` resolves `kysely` to the same `.pnpm/kysely@0.26.1` CJS entry (`createRequire` from
  `project-utils/dist/postgres.js`, run 09:17Z).
- `node tools/check-repo.js` at session start: 16 failures, none in a document this run wrote.

None of these readings is a verdict yet. Nothing has been raised as a finding.

## Resumption State

- **Done**: brief, common part and rulings (08:57Z, 09:03Z, 09:16Z) read; implementation document read; the diff and kysely
  mechanism read (above); cache-warm wake armed, then deleted at this checkpoint.
- **Next, in order**:
  1. Re-verify website `b663b35` is still the chain tip; read the files under review through `git show b663b35:<path>`.
  2. Run the real-postgres probe as an independent instrument (common brief hazard 1): adapt
     `verification/fix-recent-message-ids/code-review/run-probe.sh` + `recent.pg.test.ts` into
     `verification/fix-get-one-absent-not-found/code-review/` — `message.getOne` for an absent number over project-utils' real
     `getPostgres` on a throwaway `postgres:16`, at `b829314` (expect 500 "no result") and at `b663b35` (expect NOT_FOUND, the one
     text). Docker was available with 0 containers at 09:17Z.
  3. Reproduce the fixer's red independently in an isolated export at `b829314` (tip test files over base source); confirm the
     CJS-built case fails with `{INTERNAL_SERVER_ERROR, "no result"}`.
  4. `node ~/.claude/tools/convention-check.js website --since=b829314`; disposition the 5 pre-existing `Navigation.tsx` eslint
     FAILs per ruling 09:16Z (check the fixer's handoff for them exists before review closes).
  5. Check Item 2: what else `Navigation` does in the not-found state (hotkeys, the File menu's handlers, `nameRef`), and that
     the header's loading state is acceptable; ruling 09:03Z condition c (`git grep -n "NoResultError" b663b35 -- src`).
  6. TDD table/compliance and Test Conventions (escaped line, basenames, the `PresetDialog` mock's `DialogFooter`).
  7. Write findings in class-scoped form, the Assumption Not Checked (candidate: the Next server bundle holds `shared.ts` and
     `message.ts` as one module instance in the tRPC route; falsity signature: absent number answers 500 "no result" after
     deploy; owner: devops's post-deploy row), the verdict, and deliver it to `qa-fix-get-one-absent-not-found` (or a spawn cue to
     `steering-hooks` when no QA session is live); a rejection to `fixer-fix-get-one-absent-not-found`.
- **Branch / HEAD**: website `chain/fix-get-one-absent-not-found` at `b663b35`; nothing of mine in the website tree.
- **Uncommitted or locally mutated**: none; no export, container or worktree created.
- **Evidence run but not recorded**: none beyond the readings above.
- **Questions sent**: none.
