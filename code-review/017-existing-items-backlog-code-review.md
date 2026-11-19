---
ID: 017
Origin: 017
UUID: 5c3e9a71
Reviewed-At: "ec984fe — repos=website; Round 2, M2 (implementation document 057109c); Round 1, M1, was reviewed at 8147661"
Status: In Review
Round: 2
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
| 2026-11-19T00:58 | qa-hooks-017 (QAF-15) | Reconcile CR-1's base lint figure | Round 1 reconcile: CR-1's base figure of 21 corrected to 7 (base-tree lint); 7 → 5, so M7-b holds and the verdict does not move. CR-2 re-checked on the 8147661 export and holds. |
| 2026-11-19T01:17 | implementer-hooks-017 (cross-session hand-off; M2 document `057109c`) | Round 2: review M2 at website `ec984fe` | Round 2, M2 only. APPROVED_WITH_COMMENTS: CR-3 MEDIUM (`useSaveWith`'s hook-style name hides a hook called outside a render from `rules-of-hooks`; positive control at line 160; routed to QAF-16's disposition at QA Phase 2), CR-4 LOW (M2-a's eleventh member, "fails shape", has no case and no recorded disposition; it is unobservable at the client). The criteria assessed are M2-a, M2-b, M2-c and the Window, as revision 4 states them at round open. Captures are in `verification/017/code-review/m2/`. Gate disclosed: the record-write gate refused a shell heredoc that drafted this round's section into a scratch file, reading it as a shell write to a record document; the section was then written into this document with the Edit tool. |

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
| Lint: rule counts in the edited test file (base figure reconciled 2026-11-19T00:58, see CR-1) | eslint from stdin with the repository config at both SHAs (`git show <sha>:<file> \| node_modules/.bin/eslint --stdin --stdin-filename …`) | At `1ad625e`, 21 findings: 14 `no-unsafe-call`, 5 `no-non-null-assertion`, 1 `import/order`, 1 `import/first`. At `8147661`, 5 findings: 3 `no-non-null-assertion` (lines 84, 94, 115), `import/order` (6), `import/first` (19). No rule rose. The implementer's 21 → 5 reproduces. |
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

## Round 2 — M2 at `ec984fe`

### Scope and tree

- **Criteria assessed** (recorded before the diff was read): M2-a, M2-b, M2-c and the "Window" paragraph, as plan § Plan `### M2` states them in revision 4. I read the plan as the diff from `9d4f3e1` to HEAD: only changelog rows R-8 and R-9 were added, and no criterion changed.
- **Tree**: website `ec984fe`, the implementation document's `Handoff-At` (agent-output `057109c`; `ef2adee` corrects one stamp only). M2's commits are `1c07354`, `736c7bf`, `53c3c58` and `ec984fe`, over M1 `8147661`. The branch tip was `ec984fe` at round start. At round end it was `d9ebe97` (M3: `messageDrafts.ts`, `withLocalStorage.ts`, `global.d.ts` and two new test files; `git diff --name-only ec984fe d9ebe97` shows 0 paths under `MessageProvider/`). This verdict binds to `ec984fe`, and M3 is outside it.
- **Files reviewed**:
  - `usePusher.ts`, `useApiMethods.ts` and `index.tsx` under `src/providers/MessageProvider/`;
  - the new `__tests__/MessageProvider.own-save-notice.test.tsx` (byte-equal to the `ec984fe` blob, `git hash-object`);
  - `__tests__/useApiMethods.json-editor-repair.test.ts` and `__tests__/usePusher.update-prompt.test.tsx`.
- **Not in this tree**: M3's uncommitted `src/utils/withLocalStorage.ts` and the untracked `withLocalStorage.stored-keys.test.tsx` were in the shared tree during the convention check. They are excluded by path.
- **No running instance**: M2 adds no security boundary, auth gate or irreversible action. It changes when an existing dialog shows. Adversarial execution is not owed.

### Architecture alignment (Round 2)

**Alignment Status**: ALIGNED. The record and the broadcast compare hash one form, `hashMessage(normalizeForHash(·))` (Runtime Flow 1b, `website.md` A-6).

The ref is created once in `MessageProvider` and passed to both hooks, as `messageRef` is. The broadcast handler still compares against the current content, so the cross-tab flag D-5 keeps is unchanged for every hash the tab holds no record of.

`website.md` A-6 ("persist also records the tab's own save") is named in the plan header among the lines the architect's closing pass reconciles.

### Instruments and reproduction (Round 2)

| Claim under review | Instrument (this round) | Result |
|---|---|---|
| The record is written in `persist` and nowhere else; a new persisting path inherits it (plan M2, "Surfaces") | Write surface of the records ref: `git grep -n "ownSaveRecordsRef\|recordsRef\|recordOwnSave\|forgetOwnSave" ec984fe -- src ':!**/__tests__/**'`. Second instrument: every caller of the two hooks whose signatures changed (`git grep -nE "usePusher\(\|useApiMethods\("`), which `tsc` (the implementer's typecheck exit 0) holds to the new required parameter. | One creation (`index.tsx`, `useRef<string[]>`), one push (`recordOwnSave`, from `persist` only), two removals (`forgetOwnSave` from the hook-level `onError`; the splice in the `message-update` handler). The production callers are `index.tsx` only; the test callers are the two edited files. |
| No other client save produces a broadcast, so none needs a record | Every client `api.message.upsert` call site: `git grep -n "upsertMessage\|message\.upsert" ec984fe -- src ':!**/__tests__/**' ':!src/server/**'`, each payload read | 4 paths outside `persist`: `NewMessageModal`, `SaveAsMenu`, `f/[id]/page.tsx` and `m/new/page.tsx`. Each sends a message with no `id` (`saveAsPayload`, `copyIntroMessage`). `upsertMessage` triggers Pusher only `if (message.id)` (`shared.ts` `upsertMessage`), so none of the four reaches a subscribed editor. |
| The tests' broadcast hash is what the server sends | `src/server/api/routers/message.ts` `upsert`, `.input(z.object({ message: optionalIdMessageShape }))`, passing `input.message` to `upsertMessage`, which sends `hashMessage(message)` | The test's `serverHashOf` is `hashMessage(z.object({ message: optionalIdMessageShape }).parse(input).message)`: the router's own input schema and the production hash. This is the real reader, not an invented value (Iron Law 5). The client side under test, `normalizeForHash`'s `discordMessageShape.safeParse`, is a separate path, so expected and actual are independent (axiom E). |
| The hook-level `onError` fires for every mutation; per-call callbacks fire only for the latest (implementation document, Patterns Extended) | Installed `@tanstack/query-core` 5.90.20 source (`verification/017/code-review/m2/query-core-onError.txt`) | `Mutation.execute` calls `this.options.onError(error, variables, …)` on each mutation built from the observer's options. `MutationObserver.mutate` replaces `#mutateOptions` and its `#currentMutation` on each call, and its `#notify` runs only those. The claim holds, and so does the test's `fail(i)` call shape `(error, variables)`. |
| M2-a: absence over AN-1's eleven members, both orders | The new file's `it.each` rows against `verification/017/analysis/an1/rows-395510e.json` | 10 of 11 members are present, each in both orders. "not-valid (fails shape) / nothing changed" is absent. AN-1's own row for it records `serverParse: rejected`, `broadcast: none (route rejects input before upsertMessage; no pusher.trigger)`. See CR-4. |
| M2-b, M2-c, multiplicity, failure and the Window | The implementer's mutant captures (`verification/017/impl/m2/`), read, not re-run | NM-2 to NM-5 and three `m2-*` mutants were killed. `m2-record-not-normalized` survived at `1c07354` and was killed after `736c7bf`. The sweep killed 13 of 14 at `736c7bf`; the survivor `splice(index, 2)` was killed after `53c3c58`, and the sweep killed 14 of 14 at `ec984fe`. M2-c's members each assert `confirm` length 1, and the equal-content member asserts no notice. The hazard-4 limb is covered by `nm5-current-clause-dropped` and `m2-own-clause-dropped`. |
| Lint: M7-b holds for M2's files | `convention-check.js website --since=8147661` with the tree at `ec984fe` (`verification/017/code-review/m2/convention-check-since-8147661.out`), plus a per-rule base-against-tip count for the one file that carries findings (`useApiMethods-test-lint-base-vs-tip.out`). The base is the whole-tree capture `entry/lint-1ad625e/nofix.json`, not a stdin lint (the QAF-15 artifact). | 45 FAIL: 42 in `useApiMethods.json-editor-repair.test.ts` and 3 in M3's uncommitted files. That file has 42 at base and 42 at tip, equal rule by rule. `usePusher.ts`, `useApiMethods.ts`, `index.tsx`, the new test file and `usePusher.update-prompt.test.tsx` have 0 each. The implementer's 47 at hand-off included M1's 5 under `--since=1ad625e`, so 47 − 5 = 42 reconciles. The equal count hides one blinded site (CR-3). |
| Conventions the checker skipped (id-token, basename) | By hand over `git diff -U0 8147661 ec984fe -- src` | 283 added lines: 0 ID-token hits and 0 comment lines. The new basename `MessageProvider.own-save-notice.test.tsx` has the positive form, and its module segment is the folder module `MessageProvider/index.tsx`. Helpers come from the existing `__tests__/helpers/`. |

### TDD compliance (Round 2)

**TDD Table Present**: Yes. **All Rows Complete**: Yes.

The red ran before the implementation: 5 failed of 32 at the M1 tip with the new file only (`impl/m2/red-pre-impl.json`). The M2-a and M2-c members pass both before and after the change, as a pinned absence and a kept behaviour. Each has a named mutant red.

The test added after a survivor (`53c3c58`) is spec-form, not bug-form. No escaped provenance is claimed, so none is owed. No time-based test was added. `tdd-check.py` applies to Python sources only and was not run.

One weakness: the two new cases in `useApiMethods.json-editor-repair.test.ts` assert only the record count, not its value. The value is asserted through the mount file's broadcast cases and `m2-record-not-normalized`, so that is not a gap. Where the two cases live is CR-3's subject.

## Findings

### Critical
None

### High
None

### Medium

CR-3 MEDIUM Round 2
**Checks that cannot fail**: a test helper's hook-style name hides a hook called outside a render from `react-hooks/rules-of-hooks`.
- **Location**: `src/providers/MessageProvider/__tests__/useApiMethods.json-editor-repair.test.ts` at `ec984fe`, `describe('useApiMethods saveMessage, the record of the tab\'s own save')`, `function useSaveWith`.
- **Class**: a test helper that calls a React hook outside any render, and is named as a hook so that `react-hooks/rules-of-hooks` treats it as one and stops reporting the call.
- **Enumeration**: `git grep -nE "^\s*(export\s+)?(async\s+)?function use[A-Z]…|^\s*(export\s+)?const use[A-Z]… =" ec984fe -- 'src/**/__tests__/**' 'bot/**'` gives 7 hits (`verification/017/code-review/m2/hook-named-test-helpers.out`). One is a member: `useSaveWith`, which calls `useApiMethods`. The other six (`useAccount`, `useLookupError`, `useDatabase` ×2, `useCounts`, `useRows`) are server-test fixture setters. Their files import no React and call no hook (`grep -c`, 0 each), so they are outside the class.
  - Blind spot: the predicate cannot see a hook reached through an alias (`const f = useApiMethods`), or a helper defined as a method or object property.
- **Issue**: the file's sibling helper `loadAndSaveViaShippedProvider` does the same thing, and lint reports it (`react-hooks/rules-of-hooks`, line 48, one of the file's 42 base findings). The implementation document lists "a hook called from a non-hook name" among the six findings M2 added at `53c3c58` and "removed" at `ec984fe`.

  The finding was not removed: the helper was renamed `useSaveWith`, which the rule takes for a custom hook. Positive control: the same bytes with the helper renamed `saveWith` give 43 findings, including `rules-of-hooks` at line 160 (`verification/017/code-review/m2/eslint-renamed-control.out`).

  The call still runs `useApiMethods` outside a render, under the file's `useState`/`useCallback` stub. That stub is QAF-16's subject: it holds one value per call site and cannot represent a re-render. M7-b's per-rule count stays at 42, so the criterion passes, but the lint gate's control over this file has been blinded at a new site. This is the form-not-substance pattern ("changes the action's form so the control no longer sees it"). There is no runtime magnitude: test code only.
- **Required Action**: eliminate the class. Do not rename the helper back and leave it at that, since that only restores the finding.
  - **Preferred (structural)**: run `useApiMethods` inside a real render, as QAF-16 asks. Mount a probe component with `createRoot` and `act` (Test Conventions, "DOM component tests") in a `.test.tsx`, where `useState` is React's own, and read the records ref after `saveMessage()`.

    The implementer says the no-id case cannot move to the mount. That holds only for the broadcast route. In a direct render of the hook, with the ref passed in, the ref is observable without any channel.

    The falsity signature the cases must show: with `if (payload.id)` removed from `persist` (`m2-id-guard-dropped`), the no-id case fails as an assertion, never a timeout. With the `recordOwnSave` call removed, the id case fails.
  - **Minimum**: give the helper a non-hook name and accept the `rules-of-hooks` finding as base-equivalent. This is permitted only if QA's QAF-16 disposition keeps the stub. M7-b then reads 43 against 42, a rise, which needs the owner's D-9 reading through steering. Hence Preferred.
  - **Callers**: `useSaveWith` has two (the two `it` cases). Both move to whichever form is chosen, and nothing outside the file calls it.
- **Carrier**: QA Phase 2 for M2, as part of QAF-16's disposition (`qa/017-existing-items-backlog-m1-qa.md` names QAF-16 as carried to M2's pass). It goes to the implementer if QA routes a fix. It does not hold this verdict.

### Low/Info

CR-4 LOW Round 2
**Criterion coverage**: one of M2-a's eleven members has no case and no stated disposition.
- **Location**: `src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx` at `ec984fe`, the `it.each` "raises no notice in the saving tab: %s" and the dialog cases. Also the implementation document `implementation/017-existing-items-backlog-m2-implementation.md`, Entry Conditions and TDD table.
- **Class**: a member a criterion enumerates, absent from the delivered instrument with no recorded reason.
- **Enumeration**: the plan's M2-a list (11 members) against the new file's rows (8 `it.each` rows plus 2 dialog cases, so 10 in each order) and AN-1's `rows-395510e.json` member names (11 plus the outside-class row). One is absent: "not-valid (fails shape) / nothing changed".
- **Issue**: the member's absence of a notice holds trivially in production. The router rejects shape-failing input before `upsertMessage` runs, so no broadcast exists (AN-1's row: `broadcast: none`). The one thing M2 adds for it is a record that the failed save's `onError` must forget, and that is asserted by "raises the notice for a later save of the content of a save that failed".

  So no behaviour is unasserted, and the severity floor does not apply. But the plan says M2-a is carried "for each of AN-1's eleven members", and neither the file nor the document says why this one was not.
- **Required Action**: record the member's disposition in the M2 implementation document: unobservable at the client (no broadcast), its record-removal covered by the failed-save case. No test is owed.
  - **Structural**: none. The fixture's oracle `upsertInput.parse` throws on a shape-failing payload, so the class cannot be expressed in this oracle.
  - **Carrier**: the implementer's next document write (M3's document, which is open). It does not hold the verdict.

CR-1 LOW Round 1
**Lint**: five eslint findings remain in a test file M1 edited.
- **Location**: `src/utils/__tests__/limits.import-validation.test.ts` at `8147661`: the import block (`import/order`; `import/first` at the `~/utils/__tests__/helpers/components` import after the `vi.mock` calls) and three non-null assertions in the `hasV2Components` and `validateContentRequirements` cases.
- **Class**: a file the chain changes still carries eslint findings at the chain tip.
- **Enumeration**: `node ~/.claude/tools/convention-check.js website --since=1ad625e`. It gives 10 eslint FAILs: 5 in M1's committed tree, all in this file, and 5 in M2's then-uncommitted working-tree files, outside this tree. The predicate lints whole files, but only files the change touched. It cannot see a file the chain leaves untouched (X-11's population) or a finding eslint's config does not enable.
- **Issue**: every one of the five was already there at `1ad625e`. Per rule, the counts went from 21 to 5 and none rose, so M7-b holds for this file.

  The implementer's definition asks that every FAIL be fixed. The owner's D-9 ("accept, fix none … no source files change") governs lint for this chain, and D-9 is the narrower and higher authority. A definition's default does not override an owner's ruling, and fixing these lines would widen M1's diff beyond its four items, which D-9's shown text excludes.

  Reconcile 2026-11-19T00:58 (QAF-15, `qa/017-existing-items-backlog-m1-qa.md`, agent-output `7d7eb50`): the base figure of 21 and the "16 removed" note below were an instrument artifact. My lint read the `1ad625e` bytes from stdin inside the shared tree, so the type-aware rules resolved `~/utils` against the tree at `8147661`, where the function no longer exists. That is why the 14 deleted calls appeared as `no-unsafe-call`: their lines (38 … 184) are exactly the 14 `enforceImportMutualExclusivity(` calls at `1ad625e`. The base tree's own lint (`verification/017/entry/lint-1ad625e/nofix.json`) gives 7 for this file: 5 `no-non-null-assertion`, 1 `import/order`, 1 `import/first`. The base-to-tip move is therefore 7 → 5. No rule rose, so M7-b holds and the verdict does not move. The figure was defensible as written only because it matched the implementer's own figure, and that agreement came from the same instrument: it is not a reproduction. The error was mine. The tip figure (5) is unaffected, since tip bytes were linted against the tip tree. Class swept: the other claim in this review that read the shared tree in place of `8147661` is CR-2's comment count. It was re-run on a `git archive 8147661` export and gives 14 and 7 again (`verification/017/code-review/m1/comment-gate-moved-files-8147661.out`), so it stands.

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

**Round 2 (M2 at `ec984fe`) — Status**: APPROVED_WITH_COMMENTS
**Rationale**: M2-b, M2-c and the Window each have a case that a named mutant reddens. The record has exactly one writer and two removers, and no other client save can produce a broadcast. The test's broadcast hash is the router's own parse and hash. The `onError` semantics M2 relies on hold in the installed `query-core`. M2-a is met for 10 of its 11 members; the eleventh is unobservable, which the record must say (CR-4). CR-3 is a lint control blinded in test code, routed to QAF-16's disposition at QA Phase 2. Neither finding changes product behaviour or a criterion's outcome.

**Round 1 (M1 at `8147661`) — Status**: APPROVED_WITH_COMMENTS
**Rationale**: every M1 criterion is met at `8147661` and reproduced here by an instrument the implementer did not author.
- **M1-a**: 4 renames, blob-identical, with per-file case and pass sets identical by path.
- **M1-b**: no reference remains anywhere in the repository; the 19 surviving cases are identical by title; typecheck exit 0 is the implementer's capture.
- **M1-c**: five exact-text cases, each a literal. The no-error case and the five hidden cases were each observed red, the hidden cases each by their own guard in this round.

The production change is the deletion of an unreferenced export. The remaining findings are a LOW covered by an owner ruling and an INFO outside the change's lines.

## Required Actions

- Round 2: CR-3, via QAF-16's disposition (Preferred: a real render; no `use` rename). CR-4: a disposition line in the M2 document. Neither blocks QA.
- Round 1: none beyond CR-1's M7-b re-derivation, which is already a criterion.

## Assumption Not Checked

- Round 1: this review assumes that the implementer's tip capture `verification/017/impl/m1/vitest-m1.json` (1505 of 1505, exit 0) is a run of the tree at `8147661`. I recounted from the capture and did not re-run the suite.
  - **If false**: a QA Phase 2 run at `8147661` shows a `numTotalTests` other than 1505, or a `testResults` path set that differs by membership from the capture's 123 paths, or a non-zero exit.
  - **Owner**: QA Phase 2 (`qa-hooks-017`). Closed by QA at agent-output `7d7eb50` (1505 of 1505, exit 0, path set equal by membership).
- Round 2: this review assumes that the tRPC transport delivers the client's `message` to the router unchanged apart from the input schema's parse. If it did not, the server's `hashMessage(message)` would differ from the record `hashMessage(normalizeForHash(payload))` for a real save. The test models the server as `optionalIdMessageShape.parse` plus `hashMessage` over the captured mutation input, and never sends a request through the transport.
  - **If false**: with Pusher delivering, a real two-tab walk shows tab 1 raising "Message Update Detected" for its own save with an edit typed in flight (M2-b fails), while tab 2's notice (M2-c) still shows.
  - **Owner**: UAT, walk B-1 on a local build (plan M2 "Human-observable form"). In production, his B-8 look exercises it only when the in-flight window is hit.

## Next Steps

- Round 2: QA Phase 2 for M2 at `ec984fe` (`qa-hooks-017`), with CR-3 inside QAF-16's disposition. CR-4 goes to the implementer's next document write. UAT B-1 closes the Round 2 assumption.

- QA Phase 2 for M1 at `8147661` (`qa-hooks-017`). That run closes the assumption above.
- The architect's closing pass reconciles `system-architecture.md`'s Problem Areas row and Recommendation 6 (plan header `Architectural-Surface`).
- M7-b at the tip re-derives CR-1's file.
- CR-2 is routed to `agent-output/INBOX.md`.
- M2 (`1c07354`, `736c7bf`) reaches this stage by the implementer's hand-off, on its own document and SHA.
