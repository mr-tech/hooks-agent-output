---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "8147661 — repos=website; M1 only. The suite, the typecheck and the mutant run all ran in an isolated git archive export of 8147661. The chain branch is at 736c7bf (M2), which is outside this verdict."
Status: QA Complete
Status-Detail: "M1 (M1-a, M1-b, M1-c) passes at website 8147661 (plan revision 4). Milestone-scoped, so plan Status is unmoved. QAF-15 LOW and QAF-16 LOW do not block. The effort-final mutation sweep is owed."
Phase: 2
---

# QA Report: Plan 017 — M1 (hygiene in the test tree; the dead mode-rule function)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 4. I read the body at
`a97628d`, then the diff to `8bd5496` (R-8). The diff has no hunk in `### M1`, the Testing Strategy, Validation or Risks
(`git diff -U0 a97628d HEAD`, hunk headers), so no M1 criterion moved.
**Implementation Reference**: `implementation/017-existing-items-backlog-m1-implementation.md` (agent-output `2bace82`,
`Handoff-At: 8147661`).
**Stage start**: code review round 1, APPROVED_WITH_COMMENTS, `Reviewed-At: 8147661`
(`code-review/017-existing-items-backlog-code-review.md`, agent-output `725e441`; plan row R-8 `8bd5496`). Re-derived at the
record: the review's header and verdict were read at HEAD.
**Blocking-condition register**: the chain's register is in `qa/017-existing-items-backlog-qa.md`. This pass appends no
row, because M1 designates no operator-observed check.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T00:56 | code-reviewer-hooks-017 (cross-session message; review `725e441`) | QA Phase 2 for M1 at website `8147661` | Phase 2, M1 only. Steering wrote no Phase 2 brief, so I read the Decisions Register myself, together with the code review's Assumption Not Checked. The suite was re-run in an export: 1505 of 1505, exit 0. The path set matches the implementer's capture, which closes the review's assumption. Typecheck exits 0. NM-1 and the kill-table positions, plus five swap mutants of QA's: 14 of 14 killed by a second runner. Verdict: PASS (`QA Complete`, M1-scoped). QAF-15 LOW: the lint base figure 21 is an instrument artifact; the true base is 7. QAF-16 LOW: a pre-existing React stub, carried to M2's pass. Gate disclosed: the stamp gate refused this row as first written (typed 00:56 against the clock's 00:55); by the re-stamp attempt the clock had reached 00:56, so the stamp stands as the clock's minute. |

## Criteria assessed (recorded before execution)

These are M1-a, M1-b and M1-c as plan revision 4 states them. Two further items were routed here:
- the code review's Assumption Not Checked, on the tip capture;
- CR-1's minimum, M7-b's per-rule lint counts for the files M1 changed. M7-b remains a chain-tip criterion; this is a partial read.

Class per criterion:
- **M1-a** names its members: four files. Each was verified.
- **M1-b** is an absence over all of `website` at the tip.
- **M1-c**'s class is every error line that `DiscordMessageEditor/index.tsx` renders. It was enumerated at `8147661`:
  - `git grep -c text-error 8147661 -- src/components/DiscordMessageEditor/index.tsx` gives 5;
  - `grep -c` over the `git show` bytes also gives 5;
  - the members are `noContentError`, `embedCharacterError`, `v2TextError`, `componentCountError` and `v2ComponentError`;
  - `index.tsx` is unchanged from `1ad625e` (`git diff --numstat 1ad625e 8147661` lists no such path).

  The test covers all five members.

## Implementation Review (Post-Implementation)

### Code Changes Summary

`git diff --numstat 1ad625e 8147661`:
- **Production**: `src/utils/index.ts` 0/21, the `enforceImportMutualExclusivity` export and its doc comment deleted.
- **Tests**:
  - `limits.import-validation.test.ts` 3/173;
  - `DiscordMessageEditor.component-limit.test.tsx` 35/0;
  - four renames at 0/0.

The implementation document's Files Modified table says "+34" and "−172 / +1". The measured figures are +35 and −173/+3. This is a prose miscount with no bearing on any criterion. It is recorded here and not raised as a finding.

### TDD compliance gate

The table is present. M1 adds no function or class, so no row is owed for new code. The implementer wrote one row per behaviour
case, each with a named mutant and a failure reason that is an assertion, not a compile failure. The red came after the commit,
against unchanged production code, and the document says so. That is Axiom A's mutation form, so the gate passes. The
reviewer's hide-guard run, 5 of 5 each failing only its own case, supplies the per-guard red that the table's `kt-298` and
`kt-349` rows could not show.

## Test Coverage Analysis

| File | Function/Class | Test File | Test Case | Coverage Status |
|---|---|---|---|---|
| `DiscordMessageEditor/index.tsx` | the five error lines | `DiscordMessageEditor.component-limit.test.tsx` | "renders only the reason text for %s" ×5 | COVERED, each red under its own NM-1 or kill-table mutant and its own swap mutant |
| same | the accessories container and the lines when no error is set | same | "renders no text when the message has no error" | COVERED (red under `kt-298` and `kt-349`) |
| same | the `hideValidation ? '' :` guards, `index.tsx` 180–184 | same | "renders no text for %s when validation is hidden" ×5 | COVERED (each red under its own guard mutant, in the reviewer's run; red under `kt-298` and `kt-349` in this run) |
| `src/utils/index.ts` | `enforceImportMutualExclusivity` (deleted) | `messageMode.detection.test.ts` covers the current implementation | — | Superseded-implementation row: the implementer's mutant `isMessageV2-or-to-and` fails 7 cases (`impl/m1/8147661-m1b/`) |

### Audit of the touched surface against Test Conventions

The instrument is `verification/017/qa-m1/audit-predicates.sh` at `8147661`, output in `audit-predicates.out`. It covers six files:
- `limits.import-validation`;
- `component-limit`;
- the four moved files.

Results:
- **ID-token class**: 0 hits over title-call lines, comment lines and basenames in every file. The positive control matches 2 of 2 planted lines.
- **Positive basename form**: all 6 match.
- **Source-text and time-based predicates**: 0 in every file. These search for `readFileSync`, `__filename`, `__dirname` and `import.meta`, and for timers and clock reads.
- **Renderer**: `component-limit`'s three local wrappers (`renderedText`, `mountWith`, and one more) all call the project harness `mountDom` (`~/components/__tests__/helpers/dom`). None is a hand-rolled renderer.
- **Project imports**: every file imports from `~/`, so none is a zero-production-import transcription.

The predicates are syntactic. They bound only these six files, and they cannot see a source-text read routed through a helper.

Fixtures (Iron Law 5):
- **`messageStore.dropped-set-report`** fakes `~/utils/redis/client` with an in-memory map. `setnx` always answers 1. For the path the test drives, a freshly generated code on an empty map, real Redis answers 1 as well. The assertion reads what the real `messageStore.store` wrote, so the fake invents no answer that the asserted behaviour depends on. No finding.
- **`useApiMethods.json-editor-repair`** replaces React's `useState` and `useCallback` with plain closures (QAF-16).

## Test Execution Results

All runs below were made by this pass in the export `$SCRATCH/exp-8147661`:
- built with `git archive 8147661 | tar -x`;
- `node_modules` symlinked to the shared install, held and untouched;
- no `.env*` file;
- blobs of the three changed files verified against `git rev-parse` (`export-blob-check.txt`).

Lockfile and `package.json` are unchanged from `1ad625e` to `736c7bf` (`git diff --numstat`, empty). Every run was network-isolated (`unshare -rn`).

| Command | Result | Capture (`verification/017/qa-m1/`) |
|---|---|---|
| `npx vitest run --reporter=json` | 1505 passed of 1505, 123 `testResults` files, `success` true, **exit 0** | `vitest-8147661.{json,exit,stdout,stderr}` |
| `pnpm run typecheck` (both programs) | **exit 0** (see the first note below) | `typecheck-8147661.{out,exit}`; first attempt `typecheck-8147661-no-next-env.*` |
| `node suite-compare.mjs`, QA's base run (Phase 1 `qa-phase1/base-1ad625e/vitest.json`) against this run, with `renames.json` | see the breakdown below | `compare-base-qa1ad625e-vs-qa8147661.out` |
| Controls for `suite-compare.mjs` | base against itself: no difference. Without the rename map: 8 unexplained paths, so the predicate fires. | `compare-control-base-self.out`, `compare-positive-control-no-renames.out` |
| Implementer's tip capture `impl/m1/vitest-m1.json` against this run | 1505 against 1505, 0 base-only and 0 tip-only paths, 0 changed files | `compare-impl-tip-vs-qa-tip.out` |
| M1-a blob identity | 4 of 4 identical: `c91a7d8`, `9d5ce5a`, `18c7033`, `94938db`. `git rev-parse 1ad625e:<old>`, `8147661:<new>` and `git hash-object` of the export agree. Each old path is absent at `8147661` (`cat-file -e` exit 128). | `m1a-blobs.out` |
| M1-b absence, two instruments | `git grep -c enforceImportMutualExclusivity 8147661` over all paths: exit 1. `grep -rlI` over the export (excluding `node_modules` and `.next`): exit 1. Positive controls at `1ad625e`: git finds 17 + 1 lines; the filesystem grep over `git archive 1ad625e src` finds 2 files. | `m1b-absence.out` |
| M1-c mutants, second runner (`~/.claude/tools/mutation-run.py --sha 8147661`, run by a helper, table read here) | see the score below | `m1c-run/mutation-table-…-20261119T004839Z-p4118658.json` |

**Suite comparison breakdown.** The comparison script ran as `node suite-compare.mjs`, with the base run and `renames.json` as described in the table:
- 1508 cases against 1505, 123 files against 123;
- 4 base-only and 4 tip-only paths, all explained by the rename map;
- the 4 renamed files have identical (status, fullName) multisets, with 1, 11, 7 and 6 cases;
- `limits.import-validation` went from 33 to 19: 14 removed, all under `enforceImportMutualExclusivity`, and none added, so the 19 survivors are identical by title;
- `component-limit` went from 33 to 44: 11 added, none removed;
- no other file changed.

**Mutant score.** 14 of 14 KILLED, every one count-checked (44 = 44 against a passing control). The set is every mutant in `m1c-mutants-qa.json` (blob `8a29718`), with nothing excluded; stillborn, aborted and not-applied were all 0. The 14 are:
- QA's NM-1 for four members;
- the five kill-table positions, each re-anchored to a unique string;
- five `qm-swap-*` mutants. Each makes one error line render the next member's variable.

Instrument blobs:
- runner `b26916e`;
- probe config `361b4c8` (the reviewer's `vitest.probe.config.mjs`);
- suite file `component-limit` at `8147661`, `9274360`.

### Seen-red record (per case, from the table's `failing_titles`)

- Each "renders only the reason text for X" case was reddened by its own member's NM-1 (or `kt-347`/`kt-348-*` for
  `v2ComponentError`) and by its own `qm-swap-X`.
- `noContentError` and `embedCharacterError` are reddened by the new cases **only**: no older case in the file fails under their
  mutants. This is the handoff's gap (`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md`), and these cases now
  close it.
- "renders no text when the message has no error" and the five hidden cases are reddened by `kt-298` and `kt-349`. The hidden
  cases are also reddened one-to-one by the reviewer's guard mutants (`code-review/m1/hide-guard-run/`).
- No new case is green under every mutant of its surface.

Second instrument: the implementer's `mutate.py` gave 9 of 9 on the first nine. `mutation-run.py` agrees on the same nine (a
differently built driver, run in a fresh export per mutant).

Not mutated: the line order, and an error line's `show` widened to always render an empty `div`. An empty `div` has no text, so
that mutant is equivalent under M1-c's text property.

### Notes on the runs

- **Typecheck in an export.** `next-env.d.ts` is gitignored (`.gitignore:86`) and generated, so `git archive` does not carry it.
  The first attempt exited 2 with one `TS2307` on `~/assets/img/product_image.png`. I copied `next-env.d.ts` and
  `.next/types/routes.d.ts` from the shared tree (read, not moved; hashes in `typecheck-generated-inputs.sha256`) and re-ran: exit 0.
  The implementer's exit 0 ran in the shared tree, not an export. That tree held only the commit's tracked files plus the
  generated ones then, so the two results agree. Mine is the run at the committed tree.
- **M7-b partial (CR-1's minimum), per rule.** Measured at `8147661` by eslint from stdin in the shared tree (`lint/summary.txt`).
  Each file is no higher than its base:

  | File | At `8147661` | Base | Base source |
  |---|---|---|---|
  | `limits.import-validation` | 5 | 7 | planner's `entry/lint-1ad625e/nofix.json` |
  | `index.ts` | 2 | 2 | stdin |
  | `component-limit` | 0 | 0 | stdin |
  | `messageStore` | 5 | 5 | `nofix.json` |
  | `messageValidity` | 7 | 7 | `nofix.json` |
  | `useApiMethods` | 42 | 42 | `nofix.json` |
  | `usePusher` | 11 | 11 | `nofix.json` |

  The renamed files' base comes from `nofix.json`, because stdin at an old path fails to parse (`parserOptions.project`), which
  `lint/base-*.json` shows.

  Limits:
  - The tip read ran in the shared tree at `736c7bf` with M2's files. `useApiMethods`' count equals its base per rule anyway.
  - An eslint run inside the export failed twice and was not pursued. The first failure was "couldn't determine the plugin
    react uniquely" (`lint/export-8147661.err`). The second, with `--resolve-plugins-relative-to`, exited 2 and wrote no report.
  - M7-b's chain-tip run in an export is still owed (QAF-15).

## Findings

QAF-15 LOW Phase 2 — The eslint base figure of 21 for `limits.import-validation.test.ts` is an instrument artifact; the base is
7. The implementer's document gives "21 findings at `1ad625e` … 5 at `8147661`", and review CR-1 says "M1's deletion removed 16
of this file's findings". Both linted the `1ad625e` bytes from stdin in the shared tree, where `src/utils/index.ts` no longer
exports `enforceImportMutualExclusivity`. Typed linting therefore resolved the 14 deleted calls against the moved tree and
reported them as `no-unsafe-call`. The planner's whole-tree run at the base tree (`entry/lint-1ad625e/nofix.json`) gives 7:
5 `no-non-null-assertion`, 1 `import/first`, 1 `import/order`, and no `no-unsafe-call`. M7-b still holds for this file:
5 ≤ 7, rule by rule. **Property wanted:** M7-b's base counts for any file are read from a lint of the base tree, never by
stdin against a tree that has moved. **Owner:** `implementer-hooks-017` for M7-b's instrument. The code reviewer reconciles
CR-1's figure. The instrument defect is lodged in `verification/017/README.md`.

QAF-16 LOW Phase 2 — `src/providers/MessageProvider/__tests__/useApiMethods.json-editor-repair.test.ts` replaces React's
`useState` with a non-reactive closure and `useCallback` with the identity function, inside `vi.mock('react')`. That invents
what a framework context returns (Iron Law 5). The file's own comment names it. Whether the introducing document names it is
**not established**:
- `git log -S'useState: (initial'` over the file's paths returns `c345db1` (2026-08-27, chain 014's rename from
  `012-json-editor-repair-path.test.ts`) and `8147661`, so the stub predates `c345db1`;
- this pass did not trace it to its first commit or its author's document;
- an earlier draft of this paragraph named website `963a25c` and chain 016. That was my error, withdrawn before commit:
  `963a25c` is the save-gate fixer's, and its document says the file's "hook call passes `() => {}` … No assertion changed".

The file predates this chain, and M1-a requires its blob to be unchanged, so M1 cannot carry the fix. **Property wanted:** the
JSON-repair cases drive `useApiMethods` with real React state semantics (mounted through the DOM harness), or the substitute is
named with what it cannot represent: a re-render after `setPendingSaveChoice`. **Carrier:** QA Phase 2 for M2. M2's commit
`1c07354` adds 27 lines to this file (code review, Scope and Tree). If the chain closes first, the item moves to
`agent-output/INBOX.md` as a test-tree item.

## Verdict

**PASS. M1 is `QA Complete` at website `8147661`**, milestone-scoped:
- **M1-a**: four renames, blob-identical. Per-file pass sets are identical by path membership against QA's own base run, and
  the file-set difference is exactly the renames.
- **M1-b**: no reference remains anywhere in the repository (two instruments, both with positive controls). The 19 surviving
  cases are identical by title. Typecheck exits 0 at the committed tree.
- **M1-c**: all five members of the class are asserted by literal text. Each case was seen red under a mutant of its own
  surface.

The code review's Assumption Not Checked is closed: `numTotalTests` is 1505, the 123 paths are identical by membership, and
the exit is 0.

No Irreversible Side-Effect Register guard changed in M1 (E-1 to E-9 are all M3, M5 or M6 surfaces, or deploys), so no
milestone sweep is owed here. The effort-final mutation sweep stays owed over `git diff 1ad625e..<tip>`. M1's production
change is a deletion, and `mutant-gen.js` generated 0 mutants for it (`impl/m1/8147661-mutant-gen.out`).

This verdict applies to `8147661` only. Any later change to M1's files expires it, and M2's `1c07354` changes one of them,
under M2's own pass.

Rows inherited and not discharged: B-1 to B-11. M1 designates none, and none moved.

## Assumption Not Checked

This pass assumes that the shared `node_modules`, which the export links, is the install that `pnpm-lock.yaml` at `8147661`
describes, and does not test it. `package.json` and the lockfile are unchanged from `1ad625e`, but whether the installed tree
matches the lockfile was not checked (no `pnpm install --frozen-lockfile --offline` dry check). If it is false, a fresh install
at the release tip runs different dependency versions: a different case count, a failing case, or a typecheck error that this
run did not see. Owner: devops's release-tip QA Phase 3, which runs in a fresh install at the assembled tip.

## Handoff

- **Code-reviewer** (for the CR-1 figure) and **implementer** (for M7-b): QAF-15.
- **QA's own M2 pass**: QAF-16.
- The consuming stage for this verdict is M2's code review and QA, so nothing is owed to UAT at M1.
