---
ID: 017
Origin: 017
UUID: 5c3e9a71
Reviewed-At: "8147661 — repos=website; M1 only (implementation document 2bace82); the chain branch moved to 736c7bf (M2, 1c07354 and 736c7bf) during the round, outside this verdict"
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: 017 — the existing-items backlog

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 4. I read the body at `a97628d`, then the delta to `9d4f3e1`. The delta's hunks touch the header, the changelog, the owed re-verdicts, Decisions Register rows, the OQ section and the Resumption State. None touches `### M1` or its criteria, so the delta does not expire this verdict.
**Implementation Reference**: `agent-output/implementation/017-existing-items-backlog-m1-implementation.md` at agent-output `2bace82`, `Handoff-At: 8147661 — repos=website`
**Date**: 2026-11-19
**Reviewer**: code-reviewer-hooks-017

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T00:44 | steering-roadmap (brief `steering/backlog-2026-11-18-briefs/code-reviewer-hooks-017.md`, `7655982`) | Round 1: review M1 at website `8147661` | Round 1, M1 only. APPROVED_WITH_COMMENTS: CR-1 LOW (the 5 eslint FAILs left in `limits.import-validation.test.ts` are covered by D-9), CR-2 INFO (comments in two moved files fail the allowlist; out of the change's lines and owed elsewhere). The criteria assessed are M1-a, M1-b and M1-c as revision 4 states them at round open. Captures are in `verification/017/code-review/m1/`. Handed to `qa-hooks-017`. Gate disclosed: the stamp gate refused this row as first written (typed 00:47 against the clock's 00:44); it was re-stamped with `record-edit.js` `2026-11-19T00:44`. |

## Scope and Tree

- **Criteria assessed** (recorded before the diff was read): M1-a, M1-b and M1-c, quoted in plan § Plan `### M1`, revision 4.
- **Tree**: website `8147661` (`chain/017-existing-items-backlog`). Files were read with `git show 8147661:<path>`.
- **SHA check**: the branch tip was `8147661` at round start. At round end it was `736c7bf`, after M2's commits `1c07354` and `736c7bf`. This verdict binds to `8147661` only. M2's diff touches one M1-moved file (`useApiMethods.json-editor-repair.test.ts`, +27) and is M2's to review.
- **Files reviewed** (every row of the implementation document's Files Modified table and rename table):
  - `src/utils/index.ts`;
  - `src/utils/__tests__/limits.import-validation.test.ts`;
  - `src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.component-limit.test.tsx`;
  - the four renames.
- **Not part of this tree**: the working tree also holds M2's then-uncommitted files and an untracked `.playwright-mcp/`. These appear in this round's `convention-check` output (below) and are excluded from it by path. `.playwright-mcp/` is not this chain's (brief).
- **No running instance**: M1 adds no security boundary, auth gate or irreversible action, so adversarial execution is not owed.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`. It exists in the record: `ls -d agent-output/architecture/system-architecture.md` from `/usr/local/bin/hooks`, and `git -C agent-output ls-files architecture/system-architecture.md` at HEAD.
**Alignment Status**: ALIGNED

M1-b takes the deletion option of Recommendation 6 ("Delete `enforceImportMutualExclusivity` or route it through `isMessageV2`").

The architecture record does not yet reflect the deletion. `git -C agent-output grep -c enforceImportMutualExclusivity HEAD -- architecture` gives 6 lines in `system-architecture.md`:
- the Problem Areas row "`enforceImportMutualExclusivity` is dead…";
- Recommendation 6;
- other lines.

It also gives 1 line in `017-existing-items-backlog-architecture-findings.md`. The plan's `Architectural-Surface` header names that row and Recommendation 6 as lines this chain closes, so reconciling them falls to the architect's closing pass. This is not a defect in M1's code.

M1-a follows the record's placement rule (`agent-output/CLAUDE.md`, "Placement and naming"): each file now sits in the `__tests__/` beside the module it imports, and the three target directories already existed.

## Instruments and Reproduction

The review's evidence comes from four processes:
- git (blob ids, `git grep`);
- the repository's eslint binary;
- `~/.claude/tools/convention-check.js` and `~/.claude/tools/mutation-run.py`;
- the implementer's vitest captures, which I read but did not re-run (re-running the suite is QA's).

I authored only `rename-recount.py` and the hide-guard mutant list. Each carries a control.

| Claim under review | Instrument (this round) | Result |
|---|---|---|
| M1-a: blobs unchanged across the moves | `git rev-parse 1ad625e:<old>` against `8147661:<new>`, ×4 | 4 SAME (`c91a7d8`, `9d5ce5a`, `18c7033`, `94938db`). None of the four has a relative import, a relative `vi.mock`, or `__dirname`/`__filename`/`readFileSync`/`import.meta` (`grep -cE`, 0 each), so a move cannot change what they resolve. |
| M1-a: per-file case count and pass set identical by path; the file-set difference is exactly the four renames | `verification/017/code-review/m1/rename-recount.py` over `impl/base/vitest-1ad625e.json` and `impl/m1/vitest-m1.json`. It is a second instrument beside the implementer's `compare.py`, keyed on (fullName, status) multisets. | `rename-recount.out`: the base-only and tip-only sets are exactly the 4 old and 4 new paths. Case counts: 1, 11, 7 and 6, SAME. `limits.import-validation` 33 → 19 (14 removed, 0 added, 0 non-passed). `component-limit` 33 → 44 (11 added, 0 removed). No other file's cases differ. Totals 1508 → 1505, 123 files each, `success` true; `vitest.exit` 0 and `vitest-m1.exit` 0. Control (base against itself): empty differences (`rename-recount.control.out`). |
| M1-b: no reference to `enforceImportMutualExclusivity` remains | `git -C website grep -c enforceImportMutualExclusivity 8147661` over all paths, not only `src` | no line (exit 1). At `1ad625e`: 17 in the test file and 1 in `src/utils/index.ts`, its definition. |
| M1-b: no production behaviour changes | Reference sweep at `1ad625e` with a second instrument: namespace imports (`import * as … from '~/utils'`) and dynamic `import()`/`require` of the barrel. Then `git diff --name-only 1ad625e 8147661` with `__tests__` excluded. | No namespace import. One dynamic `import('~/utils')`, in `messageValidity.predicate.test.ts`; it reads only `validateMessage`. The only production file changed is `src/utils/index.ts`, and only the unreferenced function and its doc comment were removed. `V2_COMPONENT_TYPES` and `MessageMode` keep their other uses (3 and 9 hits at the tip). |
| M1-b: the "no behaviour change" claim | — | No input reaches the deleted code: nothing at the base referenced it outside its own definition and the deleted test block, and the trees' reachable production code is byte-identical. A randomized differential would compare identical code, so I did not run one. The executed comparison is the suite at both trees (row above). |
| M1-c: each hidden-validation case discriminates its own guard | `mutation-run.py --sha 8147661` with `verification/017/code-review/m1/hide-guard-mutants.json`. Each of the five mutants removes one `hideValidation ? '' :` ternary in `DiscordMessageEditor`'s render. It ran in isolated exports with `--dep node_modules`, a transcribed config (`vitest.probe.config.mjs`: `process.cwd()` in place of `__dirname`, the dom project only), over the `component-limit` file. | 5 of 5 KILLED, control 44 = mutant 44 (count checked). Each mutant failed exactly one case, its own "renders no text for … when validation is hidden" (`hide-guard-run/mutation-table-…json`, `failing_titles`). |
| Lint: rule counts in the edited test file | eslint from stdin with the repository config at both SHAs (`git show <sha>:<file> \| node_modules/.bin/eslint --stdin --stdin-filename …`) | At `1ad625e`, 21 findings: 14 `no-unsafe-call`, 5 `no-non-null-assertion`, 1 `import/order`, 1 `import/first`. At `8147661`, 5 findings: 3 `no-non-null-assertion` (lines 84, 94, 115), `import/order` (6), `import/first` (19). No rule rose. The implementer's 21 → 5 reproduces. |
| Conventions | `node ~/.claude/tools/convention-check.js website --since=1ad625e` (shared tree, which holds M2's uncommitted files at run time) | 10 FAIL, 0 CANDIDATE, 19 SKIP. 5 FAILs are M1's, all eslint in `limits.import-validation.test.ts` (CR-1). The other 5 are in M2's then-uncommitted `MessageProvider.own-save-notice.test.tsx` and `useApiMethods.ts`, so they are outside this tree and M2's to review. The 19 SKIPs are 17 `.playwright-mcp/*.png` (not the chain's), `src/utils/index.ts` (no added lines, so not checked), and the checker's own `id-token, basename` limb, which did not run. |
| The ID-token and basename limbs the checker skipped | By hand, over `git diff -U0 1ad625e 8147661 -- src`: CLAUDE.md's ID-token class, comment lines, and the positive basename form | 33 added lines: 0 ID-token hits and 0 comment lines. 0 changed basenames off the positive form. Positive control: `it('cr-3 case')` matches (1). The predicate cannot see an ID token split across string concatenation or held in a variable used as a title; none of the 33 lines builds a title that way. |

Captures: `verification/017/code-review/m1/` holds:
- `rename-recount.py`, `.out` and `.control.out`;
- `hide-guard-mutants.json`, `vitest.probe.config.mjs` and `hide-guard-run/`.

The `convention-check` and eslint outputs quoted above are in the same directory.

## TDD Compliance Check

**TDD Table Present**: Yes
**All Rows Complete**: Yes
**Concerns**: None blocking.

M1 adds no production function. Its 11 cases describe behaviour that M1 leaves unchanged. Axiom A's red is a mutation, run against the committed spec. That is valid evidence, and the implementer's document says plainly that the red came after the commit.

One record gap, which this round closes. The table credits the five "validation is hidden" cases' red to `kt-298` and `kt-349`. Those mutants insert a stray `=` and fail every case in the describe, so they do not show that a hidden case fails when its own `hideValidation` guard is lost. This round's hide-guard probe supplies that red: 5 of 5, each mutant failing exactly its own case. It is not a finding.

Expectations are independent: each expected string is a literal and none is read from `limits.tsx` (axiom E). The fixture values feed real production validators; no value stands in for a store, the wire or a framework context.

`tdd-check.py` applies to Python sources only. It does not apply here and was not run.

"Before adding a test" is met. The implementer tightened the covering file, `DiscordMessageEditor.component-limit.test.tsx`, in place with its own `mountDom`, `keyed` and `texts` helpers. The new "displayable text" case overlaps the existing "validation lines that precede the component lines" case, but it is stronger: it reads the whole `.discord-visualizer__message` text with every child editor stubbed to `null`, so a stray text node anywhere in the container fails it.

No bug-form test was added, so no escaped provenance is owed. No time-based test was added.

## Findings

### Critical
None

### High
None

### Medium
None

### Low/Info

CR-1 LOW Round 1
**Lint**: five eslint findings remain in a test file M1 edited.
- **Location**: `src/utils/__tests__/limits.import-validation.test.ts` at `8147661`: the import block (`import/order`; `import/first` at the `~/utils/__tests__/helpers/components` import after the `vi.mock` calls) and three non-null assertions in the `hasV2Components` and `validateContentRequirements` cases.
- **Class**: a file the chain changes still carries eslint findings at the chain tip.
- **Enumeration**: `node ~/.claude/tools/convention-check.js website --since=1ad625e`. It gives 10 eslint FAILs: 5 in M1's committed tree, all in this file, and 5 in M2's then-uncommitted working-tree files, outside this tree. The predicate lints whole files, but only files the change touched. It cannot see a file the chain leaves untouched (X-11's population) or a finding eslint's config does not enable.
- **Issue**: every one of the five was already there at `1ad625e`. Per rule, the counts went from 21 to 5 and none rose, so M7-b holds for this file.

  The implementer's definition asks that every FAIL be fixed. The owner's D-9 ("accept, fix none … no source files change") governs lint for this chain, and D-9 is the narrower and higher authority. A definition's default does not override an owner's ruling, and fixing these lines would widen M1's diff beyond its four items, which D-9's shown text excludes.

  Judgement on the brief's candidate: **D-9 covers them.** The departure was disclosed correctly in the implementation document.
- **Required Action**: none in this chain.
  - **Minimum**: M7-b at the chain tip re-derives this file's per-rule counts against `1ad625e` (QA at Phase 2, per M7-b). Note that M7-a's baseline was taken at `1ad625e`, before M1's deletion removed 16 of this file's findings.
  - **Preferred (structural)**: a lint gate, which is X-12's and outside this chain under D-9.

CR-2 INFO Round 1
**Comments**: comments in two of the moved test files fail the allowlist.
- **Location**:
  - `src/server/api/utils/__tests__/messageValidity.predicate.test.ts`: 14 comments, the first "// Expected values are the send-gate partition's own frozen verdicts…";
  - `src/providers/MessageProvider/__tests__/useApiMethods.json-editor-repair.test.ts`: 7 comments.
- **Class**: a source comment that matches no `ALLOW` entry of `comment-gate.js`.
- **Enumeration**: `node ~/.claude/tools/convention-check.js . --no-eslint --files <the four moved files>`, from `website/`, gives 2 FAIL (21 comments) in 2 of the 4 files. Across the whole suite the population is not measured. The predicate is comment-gate's own, so it cannot see a rationale carried in a string literal or a title.
- **Issue**: these comments are not in M1's added lines. The renames are 100% similar, so the prescribed `--since` check correctly does not judge them. M1-a's own property requires the moves to keep blob ids unchanged, so removing the comments inside M1 would break M1-a's evidence form.

  M2's diff adds 27 lines to `useApiMethods.json-editor-repair.test.ts`, so that file becomes a file a fix round touches. Under engineering-standards, "a round that changes code removes the comments the change made stale" applies only to the comments M2's lines make stale.
- **Required Action**: none for M1.
  - **Routed**: to `agent-output/INBOX.md` as a test-tree hygiene candidate for the record's owning session, so it does not depend on this document being read.

No finding changes a decision. The two above go to their stated carriers.

## Verdict

**Status**: APPROVED_WITH_COMMENTS
**Rationale**: every M1 criterion is met at `8147661` and reproduced here by an instrument the implementer did not author.
- **M1-a**: 4 renames, blob-identical, with per-file case and pass sets identical by path.
- **M1-b**: no reference remains anywhere in the repository; the 19 surviving cases are identical by title; typecheck exit 0 is the implementer's capture.
- **M1-c**: five exact-text cases, each a literal. The no-error case and the five hidden cases were each observed red, the hidden cases each by their own guard in this round.

The production change is the deletion of an unreferenced export. The remaining findings are a LOW covered by an owner ruling and an INFO outside the change's lines.

## Required Actions

None required. Optional: none beyond CR-1's M7-b re-derivation, which is already a criterion.

## Assumption Not Checked

- Round 1: this review assumes that the implementer's tip capture `verification/017/impl/m1/vitest-m1.json` (1505 of 1505, exit 0) is a run of the tree at `8147661`. I recounted from the capture and did not re-run the suite.
  - **If false**: a QA Phase 2 run at `8147661` shows a `numTotalTests` other than 1505, or a `testResults` path set that differs by membership from the capture's 123 paths, or a non-zero exit.
  - **Owner**: QA Phase 2 (`qa-hooks-017`).

## Next Steps

- QA Phase 2 for M1 at `8147661` (`qa-hooks-017`). That run closes the assumption above.
- The architect's closing pass reconciles `system-architecture.md`'s Problem Areas row and Recommendation 6 (plan header `Architectural-Surface`).
- M7-b at the tip re-derives CR-1's file.
- CR-2 is routed to `agent-output/INBOX.md`.
- M2 (`1c07354`, `736c7bf`) reaches this stage by the implementer's hand-off, on its own document and SHA.
