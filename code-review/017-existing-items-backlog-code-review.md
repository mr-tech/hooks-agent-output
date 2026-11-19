---
ID: 017
Origin: 017
UUID: 5c3e9a71
Reviewed-At: "1ab3b96 — repos=website; Round 3 sub-entry, M3 fix confirmation (implementation document 5fb85ff); Round 3 was reviewed at 3498ef3; M2 was confirmed at dd26104; Round 1, M1, was reviewed at 8147661"
Status: In Review
Round: 3
Verdict: APPROVED
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
| 2026-11-19T01:27 | qa-hooks-017 (QAF-17, `5630f1b`) | R2-reconcile: Round 2's verdict corrected | Round 2 reopened by correction: CR-5 MEDIUM (duplicates QAF-17) is a severity-floor finding I missed. Verdict APPROVED_WITH_COMMENTS → REJECTED; the fix is test-only and returns as a Round 2 sub-entry. Method observation for the retrospective: the reviewer checked the implementer's mutant list for coverage instead of enumerating the criterion's interleavings itself. |
| 2026-11-19T01:48 | implementer-hooks-017 (fix SHA `dd26104`, M2 document `e088937`) | Round 2 sub-entry: confirm the test-only fix for CR-5, CR-3 and CR-4 | Round 2 sub-entry: APPROVED at `dd26104`. 4 of 4 re-attack mutants were killed as assertions (`verification/017/code-review/m2-fix/`). CR-5 and CR-3 are gone, CR-4 is recorded. M3's `index.tsx` change is outside this sub-entry, and M2's wiring there is untouched. |
| 2026-11-19T02:25 | implementer-hooks-017 (M3 document `e6588c0`) | Round 3: review M3 at website `3498ef3` | Round 3, M3 only. REJECTED: CR-6 MEDIUM (the provider's restore sites are asserted on `content` only; probe mutants P1, P2 and P4 survived), CR-7 MEDIUM (M3-f's old-reader instrument was not run; P3 survived), CR-8 LOW (the fetch path removes `Sn` against the matrix's "nothing written"; record line). The criteria assessed are M3-a to M3-h, the Storage form and the Write matrix, as revision 4 states them at round open. Captures are in `verification/017/code-review/m3/`. Disclosed: CR-6's and CR-8's enumerations were written before they were run; both were then run, CR-8's matched, and CR-6's text was corrected to the predicate's 10 hits. |
| 2026-11-19T02:32 | implementer-hooks-017 (fix SHA `1ab3b96`, M3 document `5fb85ff`) | Round 3 sub-entry: confirm the test-only fix for CR-6, CR-7 and CR-8 | Round 3 sub-entry: APPROVED at `1ab3b96`. P1 to P7 re-run by me, 7 of 7 killed as assertions (`verification/017/code-review/m3/fix-run/`). M3-f's `1ad625e` reader run and its negative control were read and discriminate. CR-6 and CR-7 are gone, CR-8 is recorded. Provenance note: the seed-writing tip test's source is to be added to the captures. |

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

### Round 2 sub-entry — fix confirmation at `dd26104`

**Scope**: the fix diff `ec984fe..dd26104` over M2's files. The M2 commits in it are `442059d`, `bce3119` and `dd26104`, all test-only. `git diff --name-only ec984fe dd26104` over `usePusher.ts`, `useApiMethods.ts` and `index.tsx` lists only `index.tsx`, which M3's commits changed (`d9ebe97`, `79144cb`, `536b8e6`). None of M3's changed lines touches M2's wiring: `git diff -U0` filtered for `ownSave|forgetOwnSave|onError|usePusher|useApiMethods` gives 0 lines, and the five wiring lines are present at `dd26104`. M3's code and its `messageProviderDeps.ts` helper change (`79144cb`) are M3's to review.

The branch tip was `dd26104` at the start and end of the sub-entry, and the three test files I read are byte-equal to their `dd26104` blobs.

**Re-attack** (`mutation-run.py --sha dd26104`, isolated exports, `verification/017/code-review/m2-fix/`: `fix-mutants.json`, `run/`). 4 of 4 KILLED, with control count equal to mutant count. Each failed exactly its intended case with an `AssertionError`, in about 3 s against a 240 s timeout, so none was a timeout:
- `cr5-any-broadcast-consumes-a-record` (QA's coupling mutant) → "raises only the other tab's notice when its save arrives between this tab's save and that save's broadcast, and an edit follows";
- `cr5-sibling-any-failure-forgets-a-record` (the same shape on `forgetOwnSave`, the implementer's class-sweep member) → "raises no notice for a later save in flight when an earlier save, already broadcast, then reports failure";
- `cr3-id-guard-dropped` → "records nothing for a message that has no id yet";
- `cr3-record-call-removed` → "records one hash for a message that has an id".

**Conventions**: `convention-check.js . --files` over the two changed test files gives 0 FAIL, with the id-token limb skipped; my hand predicate over their added lines gives 0 hits. eslint on `useApiMethods.json-editor-repair.test.ts` at `dd26104` gives 42 findings, with `rules-of-hooks` only at the base line 48, equal to base (`eslint-stub-file-dd26104.out`).

That file is M1's blob plus the single `{ current: [] }` argument the new parameter requires, not M1's content exactly as the implementer's message says. The difference is immaterial.

**Dispositions** (class gone, plus the check that fails if it returns):
- **CR-5**: gone. The check is the `own-save-notice` case above, killed by `cr5-any-broadcast-consumes-a-record`. The class's sibling member on `forgetOwnSave` is closed by its own case.
- **CR-3**: gone. The class enumeration re-run at `dd26104` gives 6 hits, and `useSaveWith` is not among them (`hook-named-test-helpers-dd26104.out`; the 6 are the non-member server fixtures). The two `persist` cases now render the real hook under `createRoot`/`act` in `useApiMethods.own-save-record.test.tsx`. The checks are `cr3-id-guard-dropped` and `cr3-record-call-removed`, CR-3's two falsity signatures, each an assertion failure.
- **CR-4**: recorded, in the M2 document's Outstanding Items (agent-output `e088937`). `no test`.

**Sub-entry verdict**: APPROVED at `dd26104` for M2. Every Round 2 finding is dispositioned. The suite figure (1606 of 1606, exit 0) is the implementer's and was not re-run here; that is QA's refresh.

## Round 3 — M3 at `3498ef3`

### Scope and tree

- **Criteria assessed** (recorded before the diff was read): M3-a to M3-h, the "Storage form" and the "Write matrix", as plan § Plan `### M3` states them in revision 4 (plan commit `e9f83be`).
- **Tree**: website `3498ef3`, the `Handoff-At` of `implementation/017-existing-items-backlog-m3-implementation.md` (agent-output `e6588c0`). M3's commits are `d9ebe97`, `79144cb`, `536b8e6`, `08124a4` and `3498ef3`. The production diff is `git diff ec984fe 3498ef3 -- src ':!**/__tests__/**'`, because M2's fix commits in that range are test-only.
- **Tree check**: the branch tip and the shared tree's HEAD were `3498ef3` at round start and end. The tree was clean apart from `.playwright-mcp/`.
- **Files reviewed**: every row of Files Modified and Files Created.
- **No running instance**: M3 adds no security boundary, auth gate or irreversible server action. The browser-storage rewrite is reversible by M3-f's revert path. Adversarial execution is not owed.

### Architecture alignment (Round 3)

**Alignment Status**: MINOR_DEVIATIONS, each stated by the implementer:
- the draft store reads through `withLocalStorage` directly rather than `useLocalStorage` (the plan's "Storage form"; reason: no read-at-call-time). Every write still reads the stored map first (`writeDraft`, `removeDraft` → `readDrafts`), which is the property the plan states.
- the fetch path removes `Sn` when the fetched copy is shown (CR-8).

The shared `set` changes only where it was wrong for every key: it no longer throws, and it dispatches no event on a refused write (`website.md` A-7 and the plan header name these lines for the architect's closing pass).

### Instruments and reproduction (Round 3)

| Claim under review | Instrument (this round) | Result |
|---|---|---|
| "`getMessage`'s newer-local rule unchanged" | Base comparison source: `git grep -n updatedAt ec984fe -- src/providers/MessageProvider` | At base, `useApiMethods` stamps `updatedAt: Date.now()` (client) and `getMessage` compares it with the server's `updatedAt`. At the tip, `editedAt` is `Date.now()` and the same comparison is made. Unchanged, clock skew included. |
| The legacy `message` key has no other reader; quota is caught for every key | `git grep -nE "withLocalStorage\(\s*'message'…\|getItem\(\s*'message'…" 3498ef3 -- src`; `git grep -nE "localStorage\.setItem\|sessionStorage\.setItem"` | Only `messageDrafts.ts` reads `message`. The only direct writes are `withLocalStorage.set` (now caught) and `tabId`'s `sessionStorage.setItem` (inside `try`). D-23's "every stored setting" holds. |
| `useBeforeUnload` takes a function for the flag | `node_modules/react-use/lib/useBeforeUnload.js` (17.4.0) | `typeof enabled === 'function' ? enabled() : true` is read at the event. `block && (() => !isLeavingWithoutAlert())` is therefore evaluated per unload. |
| M3-a's "deep-equal `data` and `name`" and the saved-message restore | Probe mutants at `3498ef3` (`verification/017/code-review/m3/probe-mutants.json`, `probe-mutants-class.json`; `run/`, `run-class/`), over every DOM test in `src/utils` and `src/providers/MessageProvider` (139 cases, control passing) | P1 (route-0 restore drops the draft's `name`) SURVIVED. P2 (it drops embeds) SURVIVED. P4 (`getMessage` drops embeds) SURVIVED. P5, P6 (migration) and P7 (copy-in) were KILLED. See CR-6. |
| M3-f, evaluated against the old code's reader | P3 (the legacy write carries an `id`, which the old reader `local.id ? copyIntroMessage() : local` turns into the intro message) | SURVIVED. No old-reader run exists in `verification/017/impl/m3/`. See CR-7. |
| Lint (M7-b) | `convention-check.js website --since=ec984fe` at `3498ef3` (`m3/convention-check-since-ec984fe.out`), and the base whole-tree capture for the two files that carry findings (`m3/lint-base-global-withLocalStorage.out`) | 15 FAIL: `global.d.ts` 13 `no-unused-vars` + 1 `max-len`, and `withLocalStorage.ts` 1 `max-len`. Both equal base rule by rule. The 10 new test files and the other production files have 0 FAILs. |
| Conventions the checker skipped | ID-token class and comments by hand over `git diff -U0 ec984fe 3498ef3 -- src` | 1018 added lines, 0 comment lines. 1 date-shaped hit, `expires: '2999-01-01'` in a `Session` fixture: data, under the bounded exemption. |
| The self-check sweep and named mutants | The implementer's captures, read | 58 of 72 killed at `536b8e6`; 9 of the 14 survivors closed by cases at `08124a4`; NM-6, NM-7 ×3, NM-27 and NM-28 ×2 killed. The five equivalence claims hold on reading: 6 (re-arm delay), 7–8 (opaque id), 12 (no-window guard), 14 (`bubbles` on the target). The bound is counted in UTF-16 code units (`JSON.stringify(...).length`), which the plan's "1 MB serialised" leaves open. The plan's reason (serialise and parse cost) is measured in that unit, so this is no finding. |

### TDD compliance (Round 3)

**TDD Table Present**: Yes. **All Rows Complete**: Yes.

Each new module's first row is its compile-time red. The rows added after the sweep say "Written first: No" and name the mutant that closes them, which is the honest form. The self-diagnosis (asserting example inputs, not the property that separates a rule from its near-miss) is accurate, and CR-6 is another member of it.

Every M3-e fixture is a literal stored string, so axiom E holds there. `tdd-check.py` does not apply to TypeScript.

### Round 3 sub-entry — fix confirmation at `1ab3b96`

**Scope**: `git diff --numstat 3498ef3 1ab3b96` lists 1 file, `__tests__/MessageProvider.stored-draft.test.tsx` (+67 −22), so the fix is test-only. A filtered `--name-only | grep -vc` read 3; that was the output filter's artifact, and the file-based recount is the one recorded. The branch tip and the shared tree's HEAD were `1ab3b96` at the start and end, and the test file is byte-equal to its blob.

**Re-attack** (`mutation-run.py --sha 1ab3b96`, my P1–P7, `verification/017/code-review/m3/probe-mutants-all.json`, `fix-run/`): 7 of 7 KILLED at 141 = 141 cases, each by `AssertionError`:
- P1 (2 cases), P2 (8), P3 (1), P4 (4);
- P5, P6, P7 (4 each).

**CR-7 part 2, M3-f's named instrument** (read; the captures are the implementer's): `old-reader.route-zero-legacy.probe.test.tsx`, run in a `git archive 1ad625e` export. Its helpers `mountMessageProvider` and `messageProviderDeps` exist at `1ad625e` (`git cat-file -e`; `AUTH_MOCK` and `CONFIRMATION_PROVIDER_MOCK` found by `grep -c`, 2), so the provider and its harness are the base tree's.
- **Positive run**: seeded with `legacy-string-tip-1ab3b96.json`, it shows the draft's name, content and embed (`old-reader-1ad625e.out`, 1 passed).
- **Negative control**: the same string with an `id` shows the intro message and fails (`old-reader-1ad625e-control-with-id.out`, AssertionError). The instrument discriminates.
- **Provenance note** (no finding): the tip-side test that wrote the seed string is not among the captures, only its log (`legacy-capture-tip-1ab3b96.out`). The string's content matches the tip fixture. The implementer is asked to add that source beside the probe, so the seed can be reproduced from the record.

**Conventions**: `convention-check.js . --files` over the changed file gives 0 FAIL. The hand predicate over its added lines gives 0 ID-token and 0 comment hits.

**Dispositions**:
- **CR-6**: gone. The checks are P1, P2 and P4, each killed by the tightened `toEqual` cases on `data` and `name`, at `fix-run/`.
- **CR-7**: gone. The check is P3, killed by "holds the route-0 draft last written, for the code that reads it" (keys and literal value). The named instrument's run and its negative control are captured under `verification/017/impl/m3/`.
- **CR-8**: recorded as a deviation for the planner (M3 document, Outstanding Items). `no test`.

**Sub-entry verdict**: APPROVED at `1ab3b96` for M3. The suite figure (1620 of 1620, exit 0) is the implementer's and was not re-run; that is QA's.

## Findings

### Critical
None

### High
None

### Medium

CR-6 MEDIUM Round 3
**Checks that cannot fail**: the provider's two draft-restore sites are asserted only on `content`, so a restore that loses the draft's `name` or any other part of its `data` passes.
- **Location**: `src/providers/MessageProvider/index.tsx` at `3498ef3`: the route-0 effect's `makeEditable({ name: draft.name, data: draft.data, updatedAt: draft.editedAt })`, and `getMessage`'s `{ ...message, data: draft.data, name: draft.name, … }`. The cases are in `__tests__/MessageProvider.stored-draft.test.tsx`, whose `content()` helper reads only `data.content`.
- **Class**: a restore of a stored draft into the editor with no assertion that the restored `data` and `name` equal the stored ones, which M3-a states as "deep-equal `data` and `name`".
- **Enumeration**: `git grep -nE "draft\.data\|legacy\.data\|drafts\[newest\]" 3498ef3 -- src ':!**/__tests__/**'` gives 10 hits (`verification/017/code-review/m3/cr6-restore-sites.out`).
  - **Outside the class**: 4 hits. Three are `useApiMethods.ts` :68, :85 and :97, where `draft` is `persist`'s local payload, not a stored draft. One is `index.tsx` :246, a removal predicate, not a restore.
  - **The class**: 6 hits at 4 sites, each probed by a mutant:
  - route-0 effect: P1 (`name`) SURVIVED, P2 (embeds) SURVIVED;
  - `getMessage`: P4 (embeds) SURVIVED;
  - `readDrafts` migration: P5 and P6 KILLED;
  - `routeZeroDraftFor` copy-in: P7 KILLED.

  3 members are open, at 2 sites. Blind spot: a field the mutants did not drop (components, flags) is covered only by the same fix, and a restore through a path not named above (none found) is not covered.
- **Issue**: M3-a, M3-b and M3-e restore drafts users typed. Every provider-level fixture is a content-only `data`, so nothing distinguishes "the draft" from "the draft's content". This is a property M3 relies on with no failing assertion, which is the severity floor (MEDIUM; it blocks hand-off to QA).
- **Required Action**: tighten the provider cases. Do not add a sibling file.
  - **Minimum (and sufficient)**:
    - the route-0 restore cases (M3-a, M3-c) and the saved-message restore cases (M3-b, M3-e) compare the restored `message.data` and `message.name` with the stored draft by `toEqual`;
    - the fixture property: the draft's `name` differs from every default name (`New Message`, the saved copy's), and its `data` carries at least one field besides `content` (an embed or a component);
    - the falsity signature: P1, P2 and P4 each fail as an assertion, not a timeout.
  - **Preferred (structural)**: one fixture constant used by both the write and the expectation's literal, written out in full, never built by `messageDrafts` (axiom E).

CR-7 MEDIUM Round 3
**Criterion instrument not run**: M3-f is "evaluated at the tip against the old code's reader", but no run of that reader exists. The legacy-key case checks only that the key's content matches.
- **Location**: `src/utils/messageDrafts.ts` `writeRouteZeroDraft` (`legacyStore().set(message)`) at `3498ef3`; `MessageProvider.stored-draft.test.tsx` "holds the route-0 draft last written, for the code that reads it" (`toMatchObject({ data: { content } })`); `verification/017/impl/m3/`, which holds no old-reader capture.
- **Class**: a revert-safety property whose stated instrument, the old code's reader, was replaced by a partial transcription of its input.
- **Enumeration**: one writer of the legacy key (`writeRouteZeroDraft`) and one remover (`removeRouteZeroDraft`), per `git grep -n "legacyStore()" 3498ef3 -- src`. The old reader at `1ad625e` is `MessageProvider/index.tsx`'s route-0 effect `local.id ? copyIntroMessage() : local` over `useLocalMessageStore`, plus `getMessage`'s `localMessage.id === message.id`.

  Probe P3 (the legacy write gains an `id`) SURVIVED. Under it, the old reader would show the intro message and the revert would lose the draft.
- **Issue**: the plan names the instrument ("against the old code's reader"), and a criterion that names an instrument is met only by running it. The in-suite case cannot see the field the old reader branches on. This is a relied-on property with no failing assertion, so the severity floor applies (MEDIUM; it blocks hand-off).
- **Required Action**:
  - **Minimum**:
    1. In-suite: assert the legacy string's form as the old reader consumes it. That means no `id`, plus `name`, `data` deep-equal to the draft, and `updatedAt`, all as literals. Falsity signature: P3 fails as an assertion.
    2. The named instrument: mount the `1ad625e` `MessageProvider` at route 0, in a `git archive 1ad625e` export, with `localStorage.message` seeded by the exact string the tip writes (captured from a tip run, not typed). Assert that the restored data equals the draft. Capture the run under `verification/017/impl/m3/` and cite it in the document. That run is the M3-f evidence.
  - **Preferred (structural)**: none in the source. The old reader lives only in history.

CR-5 MEDIUM Round 2 Duplicates: QAF-17 in qa/017-existing-items-backlog-m2-qa.md
**Checks that cannot fail**: the guard that lets only a matching broadcast consume a record was never seen red.
- **Location**: `src/providers/MessageProvider/usePusher.ts` at `ec984fe`, the `message-update` handler, `if (ownSaveIndex >= 0) ownSaveRecordsRef.current.splice(ownSaveIndex, 1);`. The missing case belongs in `__tests__/MessageProvider.own-save-notice.test.tsx`.
- **Class**: a branch M2 relies on (a broadcast whose hash matches no record leaves every record in place) with no assertion that fails when the branch is lost.
- **Enumeration**: QA's mutant `qa-coupling-any-broadcast-consumes-a-record` (`verification/017/qa-m2/m2-mutants-qa.json`) survives the `MessageProvider/__tests__` folder at `ec984fe`. QA's case reddens it (`qa-m2/survivor-close/red-mutant.exit` 1; `green-ec984fe.exit` 0). I read both captures; I did not re-run them.
  - Members of the class I can name: the consume-on-non-match branch above. Its sibling `qa-coupling-any-record-suppresses` was killed (QA's table).
  - Blind spot: a mutant list covers only the guards someone thought to mutate.
- **Issue**: in M2-b's own scenario (T saves, then keeps editing), a broadcast from another tab arriving inside T's window consumes T's record under the mutant. T's own broadcast then raises "Message Update Detected" in the saving tab, which is the defect M2 exists to remove.

  My Round 2 rationale said "M2-b, M2-c and the Window each have a case that a named mutant reddens". That was true of the named mutants and false of this interleaving, which I did not enumerate. This is the severity floor (MEDIUM; it blocks hand-off to QA), so the published APPROVED_WITH_COMMENTS was wrong (reconcile below).
- **Required Action**: the case QA supplied, in the existing file, spec-form.
  - **Falsity signature**: under `qa-coupling-any-broadcast-consumes-a-record`, an assertion failure (notice shown), not a timeout.
  - **Fixture property**: the foreign broadcast sits strictly between T's send and T's own broadcast, neither first nor last in the delivery order.
  - Test-only, so the confirmation is a scoped sub-entry of this round (Fix Confirmation rule), not a new round.

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

CR-8 LOW Round 3
**Plan deviation not reconciled**: the fetch path removes a saved message's draft when the fetched copy is shown, where the plan's write matrix says "nothing written".
- **Location**: `src/providers/MessageProvider/index.tsx` at `3498ef3`, the fetch effect's `removeDraft(fetchedMessage.id)` in the `mostRecent === fetchedMessage` branch. Plan M3 "Write matrix", row "Message *n* opened (fetch)", Sn cell.
- **Class**: a write the plan's matrix rules out, made without a recorded deviation.
- **Enumeration**: every `removeDraft` / `writeDraft` / `writeRouteZeroDraft` / `removeRouteZeroDraft` call in `index.tsx` (`git grep -nE "removeDraft\|writeDraft\|RouteZeroDraft" 3498ef3 -- src/providers/MessageProvider/index.tsx`), compared one by one with the matrix. That gives 7 call sites, and 1 departs: this one. Blind spot: writes made through a helper not named in the predicate (none found).
- **Issue**: the outcome equals base, since at `1ad625e` the fetch overwrote the one key. An `Sn` older than the fetched copy is never shown again under `getMessage`'s rule, so removing it loses nothing reachable. The Reload confirmation relies on it to discard edits.

  But the implementation document lists it as a "design note", not as a departure from a criterion's table, and the matrix's row "Another tab saves *n*: a diverged Sn stays" now holds only until this tab next opens *n*.
- **Required Action**: record it as a deviation with this reason in the M3 document, for the planner to fold into the matrix at the next revision. Keep the code. Writing "nothing" would leave unreachable entries to the eviction path. `no test` beyond the existing "discards the stored edits and shows the saved copy".

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

**Round 3 (M3 at `3498ef3`) — Status**: REJECTED
**Rationale**: CR-6 and CR-7 are severity-floor findings, each shown by a surviving mutant:
- CR-6: the provider restores a draft and no assertion fails when the draft's `name` or non-content `data` is lost (P1, P2, P4);
- CR-7: M3-f's named instrument, the old code's reader, was never run, and the legacy form it branches on is unasserted (P3).

Both remedies are test-only (and, for CR-7, one captured cross-tree run).

The design is otherwise sound:
- one writer path per class;
- reads at write time;
- quota caught for every key, with no other direct writer;
- the D-18 exits each mounted;
- base-equal lint;
- every equivalence claim holding.

CR-8 is a record line.

**Round 2 (M2 at `ec984fe`) — Status**: REJECTED (reconciled; published as APPROVED_WITH_COMMENTS)

Reconcile, written at the R2-reconcile changelog row: QAF-17 (`qa/017-existing-items-backlog-m2-qa.md`, agent-output `5630f1b`) found a relied-on guard with no failing assertion. That is CR-5, and under the severity floor it blocks hand-off to QA, so the round's verdict moves to REJECTED.

The approval was defensible as written only on the claim that every M2-b limb had a reddening case. I checked that against the implementer's named and sweep mutants. I did not enumerate the interleavings myself, and the gap was mine.

The rationale below is kept as published. Its first sentence is wrong about M2-b.

The fix is test-only. It returns here as a scoped sub-entry, then goes to QA's refresh. CR-3 is dispositioned by QA in the Preferred form (QAF-16, real render); I will check the implementer's `442059d` against CR-3's two falsity signatures in the same sub-entry.
**Rationale**: M2-b, M2-c and the Window each have a case that a named mutant reddens. The record has exactly one writer and two removers, and no other client save can produce a broadcast. The test's broadcast hash is the router's own parse and hash. The `onError` semantics M2 relies on hold in the installed `query-core`. M2-a is met for 10 of its 11 members; the eleventh is unobservable, which the record must say (CR-4). CR-3 is a lint control blinded in test code, routed to QAF-16's disposition at QA Phase 2. Neither finding changes product behaviour or a criterion's outcome.

**Round 1 (M1 at `8147661`) — Status**: APPROVED_WITH_COMMENTS
**Rationale**: every M1 criterion is met at `8147661` and reproduced here by an instrument the implementer did not author.
- **M1-a**: 4 renames, blob-identical, with per-file case and pass sets identical by path.
- **M1-b**: no reference remains anywhere in the repository; the 19 surviving cases are identical by title; typecheck exit 0 is the implementer's capture.
- **M1-c**: five exact-text cases, each a literal. The no-error case and the five hidden cases were each observed red, the hidden cases each by their own guard in this round.

The production change is the deletion of an unreferenced export. The remaining findings are a LOW covered by an owner ruling and an INFO outside the change's lines.

## Required Actions

- Round 3 (REJECTED), to the implementer:
  - CR-6: provider restore cases compared by `toEqual` on `data` and `name`, with fixtures carrying a non-default name and a non-content field. P1, P2 and P4 must fail.
  - CR-7: the legacy-form assertion (P3 must fail), plus the `1ad625e` reader run captured under `verification/017/impl/m3/`.
  - CR-8: a deviation line in the M3 document.
  - Return the fix SHA for a scoped Round 3 sub-entry, then QA Phase 2.
- Round 2 (REJECTED after reconcile):
  - CR-5 must be fixed: QA's QAF-17 case.
  - CR-3, via QAF-16's disposition (Preferred: a real render; no `use` rename); QA ruled it.
  - CR-4: a disposition line in the M2 document.
  - All three return in one scoped sub-entry at the fix SHA, then QA's refresh.
- Round 1: none beyond CR-1's M7-b re-derivation, which is already a criterion.

## Assumption Not Checked

- Round 1: this review assumes that the implementer's tip capture `verification/017/impl/m1/vitest-m1.json` (1505 of 1505, exit 0) is a run of the tree at `8147661`. I recounted from the capture and did not re-run the suite.
  - **If false**: a QA Phase 2 run at `8147661` shows a `numTotalTests` other than 1505, or a `testResults` path set that differs by membership from the capture's 123 paths, or a non-zero exit.
  - **Owner**: QA Phase 2 (`qa-hooks-017`). Closed by QA at agent-output `7d7eb50` (1505 of 1505, exit 0, path set equal by membership).
- Round 2: this review assumes that the tRPC transport delivers the client's `message` to the router unchanged apart from the input schema's parse. If it did not, the server's `hashMessage(message)` would differ from the record `hashMessage(normalizeForHash(payload))` for a real save. The test models the server as `optionalIdMessageShape.parse` plus `hashMessage` over the captured mutation input, and never sends a request through the transport.
  - **If false**: with Pusher delivering, a real two-tab walk shows tab 1 raising "Message Update Detected" for its own save with an edit typed in flight (M2-b fails), while tab 2's notice (M2-c) still shows.
  - **Owner**: UAT, walk B-1 on a local build (plan M2 "Human-observable form"). In production, his B-8 look exercises it only when the in-flight window is hit.

- Round 3: this review assumes that a browser keeps a tab's `sessionStorage` (`messageDraftTab`) across the Discord OAuth round trip and a reload in the same tab, as jsdom models it. If that is false, the tab id changes across sign-in, so the tab's own route-0 entry is not found.
  - **If false**: on the local-stack walk, after signing in, route 0 shows the most-recently-edited copy-in, or the intro when this tab's draft was not the newest, instead of this tab's own draft. `localStorage.messageDrafts` then holds two `0:` entries for one tab.
  - **Owner**: UAT, walk B-2 (plan M3 "Human-observable form"). In production, his B-9 look exercises it only when two route-0 drafts exist.

## Next Steps

- Round 3: to the implementer for CR-6, CR-7 and CR-8. The fix SHA returns here as a Round 3 sub-entry, then goes to QA Phase 2 for M3. UAT B-2 closes the Round 3 assumption.

- Round 2: QA Phase 2 for M2 at `ec984fe` (`qa-hooks-017`), with CR-3 inside QAF-16's disposition. CR-4 goes to the implementer's next document write. UAT B-1 closes the Round 2 assumption.

- QA Phase 2 for M1 at `8147661` (`qa-hooks-017`). That run closes the assumption above.
- The architect's closing pass reconciles `system-architecture.md`'s Problem Areas row and Recommendation 6 (plan header `Architectural-Surface`).
- M7-b at the tip re-derives CR-1's file.
- CR-2 is routed to `agent-output/INBOX.md`.
- M2 (`1c07354`, `736c7bf`) reaches this stage by the implementer's hand-off, on its own document and SHA.
