---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "QAF-34 (MEDIUM), QAF-35 (LOW), CR-26 (LOW) and CR-35 (LOW) delivered on website's chain branch at b195eeb. QAF-34: the title case runs over both title parsers, red under m6a-title-codeblock-interactive (1 case) and under the static mutant (1 case), control 29 of 29. QAF-35: the two rows are red under named mutants, control 57 of 57. CR-26: no-restricted-imports bans react-use useMount and the three callers use useEffect; full gate at 86f5a6c 1119 of 1119, vitest exit 0, typecheck exit 0. CR-35: the formatKey test sits beside its module. CR-36 reconciled in the QAF document. Round 2 (CR-37 MEDIUM, code review REJECTED b195eeb for the CR-26 callers): spec-form cells for the editor `onMount` effect (red under the reviewer's mutator) and for Button `autoFocus` (the reviewer's mutator is equivalent: react-aria focuses on mount; the cell is red under a mutant that also stops autoFocus reaching react-aria); the lint ban also covers `react-use/lib` and `react-use/esm`. Full gate at 2618926: 1122 of 1122, 115 files, vitest exit 0, typecheck exit 0. Round 3 (CR-38): Button autoFocus effect deleted at c5303ca. Round 4 (QAF-38, QAF-39, QAF-40, QA effort-final Phase 2, test-only) at 620b4ee: five survivors each red in one existing or new cell and green at the tip; full gate 1128 of 1128, 116 files, vitest exit 0, typecheck exit 0. Round 5 (QAF-41, QAF-42, plumbing sweep, test-only) at 9b5e47f: both survivors red, full gate 1130 of 1130, 116 files, vitest exit 0, typecheck exit 0."
Handoff-At: "9b5e47f — repos=website"
---

# Implementation 015 — QAF-34, QAF-35, CR-26 (website)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md` rev 27 (`18d361c`): M6-a (preservation, "static and interactive"), M5-h (3) (Phase 1's literal members). Findings: `qa/015-bug-evaluation-fixes-m6-qa.md` § Findings QAF-34 (MEDIUM, blocks M6-a); `qa/015-bug-evaluation-fixes-m5-qa.md` § Findings QAF-35 (LOW); `code-review/015-bug-evaluation-fixes-code-review.md` Round 14 sub-entry CR-26 (LOW), and CR-35 and CR-36 (LOW, Round 2/3 sub-entry on `476c633..4f9ed85`). Brief: `scratchpad/brief-implementer-hooks-015.md` (steering, 2026-11-08).

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T10:16 | steering-hooks-015 → implementer-hooks-015 | QAF-34, QAF-35, CR-26 (+ CR-35, CR-36 from code review) | Tests at `b93e897` (QAF-34), `00c9bee` (QAF-35); lint rule and callers at `86f5a6c`; test move at `b195eeb`. Mutators `verification/015/mutators/qaf35-preview-parse-failure-renders-empty.py` and the existing `qa-r2-supplement.py` (`MUT_ID`). |
| 2026-11-08T10:30 | code-reviewer-hooks-015 → implementer-hooks-015 | CR-37 MEDIUM (REJECTED `b195eeb`), CR-26 narrowed | Cells at `87b662f`; lint paths at `2618926`. See § Round 2. |
| 2026-11-08T10:36 | code-reviewer-hooks-015 → implementer-hooks-015 | CR-38 LOW (Round 14 sub-entry APPROVED_WITH_COMMENTS; CR-37, CR-26 RESOLVED) | `Button`'s redundant `autoFocus` effect deleted at `c5303ca`. See § Round 3. |
| 2026-11-08T12:47 | qa-hooks-015 → implementer-hooks-015 | QAF-38, QAF-39, QAF-40 (MEDIUM, test-only; effort-final Phase 2 QA Failed) | Tests at `620b4ee`; mutator `verification/015/mutators/qaf38-40-apply-qa-mutant.py`. See § Round 4. |
| 2026-11-08T14:29 | qa-hooks-015 → implementer-hooks-015 | QAF-41, QAF-42 (MEDIUM, test-only; plumbing sweep) | Tests at `2b40dc5`, one class-sweep assertion at `9b5e47f`. See § Round 5. |

## Implementation Summary

Test changes for QAF-34 and QAF-35; one lint-configuration change and a three-line-each caller change for CR-26; one file move for CR-35. No other production source changed.

- **QAF-34** (`src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts`, the existing title case tightened): the one `parseEmbedTitle` case is now a `describe.each` over `markdown.static.parseEmbedTitle` (renders no `<pre><code>`) and `markdown.interactive.parseEmbedTitle` (its AST holds no `codeBlock` node; the interactive parser returns an AST, not markup). A positive control beside it: `markdown.interactive.parseContent` parses the same fence to a `codeBlock` node, so the interactive cell cannot pass because the AST never holds one.
- **QAF-35** (`src/app/preview/__tests__/page.invalid-data.test.tsx`, two rows in the existing table): `{` and `[{}]`.
- **CR-26**, structural form (the reviewer's Preferred): `.eslintrc.json` bans `useMount` from `react-use` (`no-restricted-imports`: `paths` with `importNames` for the named, aliased and namespace spellings, and a `patterns` group `react-use/*/useMount` for the deep `lib` and `esm` paths). The two `no-restricted-syntax` selectors are removed, which restores that rule's value at `7ce866b` (`"off"`). The three remaining callers (`src/components/Button.tsx`, `src/components/DiscordMessageEditor/index.tsx`, `src/utils/hooks/index.ts` `useMounted`) now call `useEffect(() => { … }, [])`; react-use 17.4.0's `useMount` is `useEffectOnce(() => { fn(); })`, and `useEffectOnce` is `useEffect(effect, [])` (read in `node_modules/react-use/lib`), so each caller keeps the same effect and still discards a returned value.
- **CR-35**: `formatKey.key-format.test.ts` moved with `git mv` from `src/utils/__tests__/` to `src/utils/redis/__tests__/`, beside `formatKey`.
- **CR-36**: the QAF document's M1-i bullet corrected (two `stays` rows, not three) with a changelog row.

## Milestones Completed

QAF-34, QAF-35, CR-26, CR-35, CR-36. Plan item (4) (M8-b/M8-d built as non-object 500 and as a property) unchanged, as the brief says.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | Brief `brief-implementer-hooks-015.md`: "Work: your 'Next, in order' list there: QAF-34, then QAF-35, then CR-26"; rulings block 04:37Z (stage set: the full chain) and 09:58Z (usage gate lifted) | Not a test |
| QA Phase 1/2 cover the surfaces | `qa/015-bug-evaluation-fixes-m6-qa.md` § QAF-34; `…-m5-qa.md` § QAF-35 | The cells below |
| Open questions | `grep -c 'OPEN QUESTION:'` on the plan: 0 open per the 09:40Z rulings block (not re-run here) | Not a test |
| User-visible surface | None. QAF-34 and QAF-35 are test-only; CR-26 changes lint configuration and moves three mount-time effects with identical behaviour (below). No flow is added | Not a test |
| Predicate for CR-26 run against a member and a non-member | The reviewer's planted file (members) and `cr26/planted-control.tsx` (non-member), both linted before and after | `cr26/cr26-lint-before-00c9bee.txt`, `cr26/cr26-lint-after-86f5a6c.txt` |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts` | title case over both parsers; interactive positive control | +18 −3 |
| `src/app/preview/__tests__/page.invalid-data.test.tsx` | two rows | +2 −0 |
| `.eslintrc.json` | `no-restricted-imports` added; the two `no-restricted-syntax` selectors removed (value `"off"` as at `7ce866b`) | +15 −7 |
| `src/components/Button.tsx` | `useMount` → `useEffect`, import | +4 −3 |
| `src/components/DiscordMessageEditor/index.tsx` | `useMount` → `useEffect`, import | +2 −3 |
| `src/utils/hooks/index.ts` | `useMount` → `useEffect` in `useMounted`, import | +2 −3 |
| `src/utils/__tests__/formatKey.key-format.test.ts` → `src/utils/redis/__tests__/formatKey.key-format.test.ts` | moved, unchanged | rename |
| `agent-output/implementation/015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md` | CR-36 reconcile | +3 −2 |

## Files Created

| Path | Purpose |
|---|---|
| `verification/015/mutators/qaf35-preview-parse-failure-renders-empty.py` | mutant: the preview parse failure returns `{}` instead of `null` |
| `verification/015/cr26/lint-planted.sh`, `planted-deep.tsx`, `planted-control.tsx` | CR-26 rig: lints the reviewer's planted file and two more over stdin, in an export of a SHA |
| `verification/015/cr26/cr26-lint-before-00c9bee.txt`, `cr26-lint-after-86f5a6c.txt` | the CR-26 red and green |
| `verification/015/mutation-qaf34-*-b93e897.txt`, `mutation-qaf35-*-00c9bee.txt` | mutation captures |
| `verification/015/cr26-final-run-86f5a6c.txt`, `cr26-final-testresults-86f5a6c.json` | the full gate at `86f5a6c` |
| `verification/015/cr-qaf-probes/placement-b195eeb.txt` | CR-35 enumeration after the move |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| QAF-34 title cell | The existing `describe.each` over parsers in `rules.multi-line-code-block.test.ts` (rung 1: the file already iterates `parseContent` and `parseEmbedField` that way) |
| QAF-35 rows | The existing `it.each` table in `page.invalid-data.test.tsx` (rung 1) |
| `no-restricted-imports` for `useMount` | None exists: `.eslintrc.json` held no `no-restricted-imports` at `7ce866b` (grep: the only `no-restricted-*` key was `no-restricted-syntax: "off"`). The ESLint `paths`/`patterns` form is the rule's own shape. This is the reviewer's Preferred (structural) fix; the callers follow the idiom CR-24 already used (`useEffect(() => cleanup, [])`) |
| `formatKey` test | `src/utils/redis/__tests__/` (rung 1: `redis.fetch-channel.test.ts` sits there) |

## TDD Compliance

No new production function. Every added or rewritten cell is shown red under a named mutant (Axiom A; qa.md: a mutation stands in for the red against the pre-change code), in isolated exports by `mutate-run.sh` (`EXPORT_ROOT` in the session scratchpad, whole process group killed at 180 s). The CR-26 rule is shown red by linting the planted files at the pre-change commit.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `markdown.interactive.parseEmbedTitle`: a fence yields no `codeBlock` node | `rules.multi-line-code-block.test.ts` | No, red by mutant (the production behaviour is built) | Yes | `m6a-title-codeblock-interactive` (restores `codeBlock` to the interactive title rule set): exactly 1 case fails, `interactive parseEmbedTitle fenced code blocks … no code blocks`; 28 pass (`mutation-qaf34-title-interactive-b93e897.txt`) | Yes |
| `markdown.static.parseEmbedTitle`: unchanged expectation, now in the same table | same | No, red by mutant | Yes | `m6a-title-codeblock-static`: exactly 1 case fails, the static one (`mutation-qaf34-title-static-b93e897.txt`) | Yes |
| `markdown.interactive.parseContent`: a fence yields a `codeBlock` node (control) | same | No | Not owed: a control on the fixture, shown by the interactive-title cell being the only one that fails under its mutant | not owed | Yes |
| `/preview` page: `[{}]` shows the one error line | `page.invalid-data.test.tsx` | No, red by mutant | Yes | `m5h-array-allowed` (`qa-r2-supplement.py`, `MUT_ID=m5h-array-allowed`): fails `a JSON array` and `a JSON array holding an object`, 2 of 57 (`mutation-qaf35-array-allowed-00c9bee.txt`) | Yes |
| `/preview` page: `{` shows the one error line | same | No, red by mutant | Yes | `qaf35-preview-parse-failure-renders-empty` (catch returns `{}`): fails `text that is not JSON` and `a bare opening brace`, and every other refusal row that depends on the catch or the null path (`mutation-qaf35-parse-failure-00c9bee.txt`); control 57 of 57, exit 0 | Yes |
| `no-restricted-imports` (`useMount`) | `verification/015/cr26/lint-planted.sh` (a lint rig, not a vitest case) | Yes | Yes | At `00c9bee` (before): the reviewer's planted file flags 3 lines (`no-restricted-syntax`: members A, B, H); the deep-path file flags 0; the control flags no `useMount` message. At `86f5a6c` (after): the planted file flags the namespace import and both named specifiers (3 lines), the deep file flags both imports (2 lines), the control flags no `useMount` message | Yes |

**Where the reviewer's falsity signature changed form.** CR-26 asked: "the planted file's 8 members all flagged, and the control not." That signature fits a replacement selector. The structural fix flags the import, so the class is unrepresentable rather than caught per call. A planted benign use (`I`) is flagged too, at its import. The signatures that hold are: every spelling of the import is flagged (named, aliased, namespace, deep `lib` and `esm` default imports), and an unrelated `react-use` import (`useLatest`, `useUpdateEffect`) is not. The reviewer should confirm the change of signature.

**Row-level separation not claimed.** `{` and `{not json` share a branch (the `catch`); `[{}]` and `[]` share the array conjunct. No natural mutant separates a new row from its existing sibling, so each new row is shown red in company with its sibling under a mutant of that branch, not alone.

**The `useEffect` callers are a behaviour-preserving substitution.** Both trees were executed over the affected surface: the full suite at `825a7d8` (before) and `86f5a6c` (after), compared by case name and status. 114 files both. Before 1115 of 1115; after 1119 of 1119. By path and full name: 1 case only before (the old title case, now two), 5 only after (the two QAF-35 rows, the two title cases, the control); 0 cases with a different status. 1115 − 1 + 5 = 1119. Whether `Button`'s `autoFocus` effect, `useMounted`'s timer and `DiscordMessageEditor`'s `onMount` each have a covering case was not enumerated; the equivalence rests on the library source (above) and the identical pass set.

## Class Sweep

QAF-34 and QAF-35 are QA findings, CR-26 and CR-35 are review findings; each class was enumerated once.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-34 (an omission or preservation asserted on one of two parallel parsers only) | `git grep -n -E "markdown\.interactive\|interactive\.parse" b195eeb -- 'src/**/__tests__/*'` | 2 hits, both in `rules.multi-line-code-block.test.ts` (`parseEmbedTitle` line 58, `parseContent` line 67). Production consumers of `interactive.parse*`: 8 sites (`parseEmoji` ×2, `parseContent` ×4, `parseEmbedTitle` ×2, `parseEmbedField` ×1 in `EmbedField.tsx:99`) | `parseEmbedTitle`: fixed (this round). `parseContent`: only the fixture control, which asserts the AST holds a `codeBlock`. `parseEmbedField` (interactive) has no cell; M6-a states no omission for it (only `heading`), and QA names only the title. `parseEmoji`: no fence rule. Reported as a follow-up, not owed (Found) |
| QAF-35 (a Phase 1 literal member absent from a table) | `git grep -c -E "'\{'\|\\[\{\}\\]" b195eeb -- src/app/preview/__tests__/page.invalid-data.test.tsx` | the two rows now present (read at `00c9bee`: `['a bare opening brace', '{']`, `['a JSON array holding an object', '[{}]']`); table lists read against QA's cell list for § M5-h (3): the other members were already present per QA's own audit | Fixed |
| CR-26 (a `useMount` callback that returns a function, in any spelling) | `git grep -n -E "\buseMount\b" 86f5a6c -- src bot` and `git grep -c -E "react-use/(lib\|esm)" 86f5a6c -- src bot` | `useMount`: 1 hit, `src/components/DiscordContentEditor/Desktop.tsx:37`, a commented-out `// useMount(() => {`; deep paths: 0 hits (exit 1). Before (`4f9ed85`): 6 live `useMount(` lines in 3 files plus the imports | The 3 callers fixed. The comment is inert and is left (not in the plan; a comment is not a call). The rule now flags the import itself. Lint of `src bot` with the new rule: `npx eslint src bot -f unix` (NODE_OPTIONS=--max-old-space-size=6144): 682 problems total, 0 `no-restricted-imports`. The 682 are pre-existing and untouched (the same run fails with exit 1 at HEAD for warnings and errors such as `Redirects/Client.tsx`'s `object-curly-newline`) |
| CR-35 (a test file not beside its module) | `python3 -I verification/015/cr-qaf-probes/test-placement.py website <sha>` | `4f9ed85`: 16 misplaced, 22 no-module. `b195eeb`: 15 misplaced, 22 no-module; the diff of the MISPLACED lines is exactly `src/utils/__tests__/formatKey.key-format.test.ts`. 0 lines mention `formatKey` after | Fixed. The 15 are the earlier members, which the reviewer routed to the Planner batch, not to me. Per-file counts and pass set: 2 cases, 2 pass before (`src/utils/__tests__/`, at `825a7d8`'s json) and after (`src/utils/redis/__tests__/`, `vitest run` exit 0, 2 of 2) |

## Test Execution Results

| Command | Results | Notes |
|---|---|---|
| `impl-suite-run.sh 86f5a6c <scratch> cr26-final` (absolute prefix owed; see Outstanding) | 1119 of 1119, 114 files, vitest exit 0, typecheck exit 0 (`tsc --noEmit && tsc --noEmit -p tsconfig.test.json`), isolation 0 non-lo links, 0 default routes. Run of record | `cr26-final-run-86f5a6c.txt`, `cr26-final-testresults-86f5a6c.json`. Arithmetic: 1115 at `825a7d8` − 1 (old title case) + 3 (title ×2, control) + 2 (QAF-35) = 1119 |
| `npx vitest run src/utils/redis/__tests__/formatKey.key-format.test.ts` at `b195eeb` | 2 of 2, exit 0 | The full gate was not re-run at `b195eeb`: the commit is a file rename with identical content |
| `npx eslint` over the touched test files and `Button.tsx`, `DiscordMessageEditor/index.tsx`, `hooks/index.ts` | exit 0, no issues, including with `react-hooks/exhaustive-deps` active on the three `[]` effects | |
| `node ~/.claude/tools/convention-check.js website --since=4f9ed85` | 0 FAIL, 0 CANDIDATE, 2 SKIP (no conventions file above the repo for id-token; one more not examined) at `b195eeb` | SKIP is unchecked, not a pass |
| mutations | QAF-34: interactive mutant 1 failed / 28 passed; static mutant 1 failed / 28 passed; control 29 of 29, exit 0. QAF-35: array mutant 2 of 57 failed; catch mutant killed `{` and the sibling refusals; control 57 of 57, exit 0 | exports of `b93e897` and `00c9bee`, outputs `verification/015/mutation-qaf3*-*.txt` |

## Outstanding Items

1. **Interactive `parseEmbedField` and `parseContent` have no fence-body cells** (only the AST-type control for `parseContent`). Not owed by M6-a or QAF-34; reported for the planner or QA's call.
2. **A real-world check of the three `useEffect` callers' own cases was not enumerated** (see TDD Compliance): the equivalence rests on react-use's source and an identical pass set.
3. **A script slip, disclosed.** `impl-suite-run.sh` `cd`s into the export, so a relative `<out-prefix>` writes into the export, not the record. My first two runs did (the first also hit my outer 590 s timeout, with no output). I copied the third run's two files from the export into `verification/015/` under the `cr26-final-` names. The run is of `86f5a6c`; its content is unchanged by the copy.
4. **Self-diagnosis (method).** I passed a relative prefix to a script that changes directory, and waited on it with `pgrep -f`, which matched my own command line, so the wait never ended and told me nothing. The check to apply first: read the script's `cd` before choosing an argument form, and wait on a PID or a file, not on a pattern that can match the waiter.

## Round 2 — CR-37 (and CR-26 narrowed), website `b195eeb..2618926`

**CR-37 MEDIUM** (code review, `162162d`): emptying each of the two moved mount effects left the whole suite green, so the preservation claim of CR-26's callers had no assertion. `useMounted` was already killed (26 failures).

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `DiscordMessageEditor` calls `onMount` once after mount, not on re-render | `DiscordMessageEditor.component-limit.test.tsx` (new describe, the file already mounts the editor with its stubs; the reviewer allowed extending it) | No, red by mutant (production behaviour is built) | Yes | `editor-onmount-effect-empty` (the reviewer's mutator, `cr-m6-probes/cr26-ban/mutators/`): 1 failed, 22 passed; control (both files) 25 of 25 exit 0 (`mutation-cr37-editor-onmount-87b662f.txt`, `mutation-cr37-control-87b662f.txt`) | Yes |
| `Button` with `autoFocus` is the active element after mount; without it, not | `Button.auto-focus.test.tsx` (new, `helpers/dom.ts`) | No, red by mutant | Yes, under a stronger mutant | The reviewer's `button-autofocus-effect-empty` **passes 2 of 2** (`mutation-cr37-button-autofocus-87b662f.txt`). Cause, read in `node_modules/.pnpm/react-aria@3.46.0…/@react-aria/interactions/src/useFocusable.tsx` (`autoFocusRef`, focus in an effect on mount): `useButton` already receives `autoFocus` through `_props` and focuses the element itself, so the emptied effect loses nothing and the mutant is **equivalent**, shown by execution. `cr37-button-autofocus-effect-and-aria-dropped.py` (effect emptied **and** `useButton({ ..._props, autoFocus: false })`) fails the `autoFocus` case, 1 failed, 1 passed (`mutation-cr37-button-both-dropped-87b662f.txt`) | Yes |

The `Button` effect is redundant with react-aria and was left in place: the plan's CR-26 fix is a behaviour-preserving substitution, and removing it is a change nobody asked for. Whether to delete it is the reviewer's or planner's call.

**CR-26 narrowed** (LOW): `react-use/lib` and `react-use/esm` were added to `paths` with `importNames: ["useMount"]` (`2618926`). The reviewer's re-attack (`cr-m6-probes/cr26-ban/run.sh`, 14 plants) over the new config: `cr26/cr26-ban-reattack-2618926.txt` flags 9 of 14 plants (the reviewer's 7 at `b195eeb`, plus `lib-index` and `esm-index`; counted with `grep -c 'no-restricted-imports=1'`), both controls pass. Still passing the ban: `react-use/lib/useMount.js` (the `.js` extension; `import/extensions` flags it as a different error), `require('react-use')` (`@typescript-eslint/no-var-requires` flags it), and dynamic `import()` (the stated residue).

**Gate:** `impl-suite-run.sh 2618926 <scratch> <abs>/cr37-final`: 1122 of 1122, 115 files, vitest exit 0, typecheck exit 0, isolation 0 and 0 (`cr37-final-run-2618926.txt`, `cr37-final-testresults-2618926.json`). Against `86f5a6c` by name and status: 0 status changes; 5 cases only after (3 new, 2 `formatKey` under the moved path), 2 only before (`formatKey` at the old path); 1119 + 3 = 1122. ESLint over the two test files exit 0; `convention-check --since=b195eeb` 0 FAIL, 0 CANDIDATE, 2 SKIP.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| CR-37 (a moved mount effect with no assertion that fails when it is emptied) | the three emptying mutants of `cr26-ban/run-mutants.sh` over the three moved sites in `git grep -n "useEffect(" b195eeb -- src/components/Button.tsx src/components/DiscordMessageEditor/index.tsx src/utils/hooks/index.ts` restricted to the lines `86f5a6c` changed | 3 members: `useMounted` killed (26, reviewer), `DiscordMessageEditor` `onMount` killed (this round), `Button` `autoFocus` equivalent (react-aria) with the stronger mutant killed | All three dispositioned. Residual after the fix: 0 members with no failing assertion |

**Self-diagnosis (method).** I claimed "behaviour-preserving" on the strength of the library's source and an unchanged pass set, which cannot show that anything asserts the behaviour: an unchanged pass set is also what a loss nobody tests produces. The check to apply first: empty each moved effect and see which test fails before writing "preserved".

## Round 3 — CR-38, website `2618926..c5303ca`

Code review corrected its CR-37 reading of `Button`: its emptied-effect mutant was equivalent, as § Round 2 showed. CR-38 (LOW): delete the redundant effect, so `Button.auto-focus.test.tsx` guards react-aria's path directly and fails under one mutant that passes `autoFocus: false` to `useButton`.

- **Change** (`src/components/Button.tsx`): the `useEffect(() => { if (autoFocus) localRef.current?.focus(); }, [])` line, the `useEffect` import and the then-unused `autoFocus` destructure are removed (+2 −8). `autoFocus` still reaches `useButton` through `_props`.
- **Red/green:** `verification/015/mutators/cr38-button-autofocus-not-passed-to-usebutton.py` (`useButton({ ..._props, autoFocus: false } …)`), run in an export of `c5303ca`: 1 failed (`is the focused element after mounting with autoFocus`), 1 passed (`mutation-cr38-button-autofocus-dropped-c5303ca.txt`). Control 2 of 2, exit 0 (`mutation-cr38-control-c5303ca.txt`). A single mutant, as the finding asked.
- **Gate at `c5303ca`:** 1122 of 1122, 115 files, vitest exit 0, typecheck exit 0, isolation 0 and 0 (`cr38-final-run-c5303ca.txt`, `cr38-final-testresults-c5303ca.json`). Against `2618926` by name and status: 0 added, 0 removed, 0 changed. ESLint over `Button.tsx` exit 0; `convention-check --since=2618926` 0 FAIL, 0 CANDIDATE, 1 SKIP.
- **Class sweep.** CR-38's class is a mount effect that duplicates behaviour a library already provides. Enumeration, run after the first draft of this line (which cited it before running it): `git grep -n "useEffect(() => {" c5303ca -- src/components/Button.tsx src/components/DiscordMessageEditor/index.tsx src/utils/hooks/index.ts` gives 12 lines: 0 in `Button.tsx`, 1 in `DiscordMessageEditor/index.tsx` (line 84), 11 in `hooks/index.ts` (5 live, 6 commented out). Of these, the lines `86f5a6c` changed are `DiscordMessageEditor/index.tsx:84` and `hooks/index.ts:18`; the others were not touched by CR-26 and are not members. 2 members remain: `DiscordMessageEditor` `onMount` (killed by its cell, and by `editor-onmount-deps-dropped`, per code review) and `useMounted` (killed, 26 failures). Neither duplicates a library path. 0 residual members.

## Round 4 — QAF-38, QAF-39, QAF-40 (effort-final Phase 2), website `c5303ca..620b4ee`

Source: `qa/015-bug-evaluation-fixes-effort-final-qa.md` § Findings (`3e074cf`); survivors and killing cases in `verification/015/effort-final/website-killtable.tsv`; mutants in `effort-final/website-gap-mutants.json`. Test-only: no production file changed (`git diff --stat c5303ca 620b4ee` is four test files). Stage start: QA's message to this session naming the three findings, and steering's relay naming this document's Resumption State.

**Patterns Extended / user-visible.** Test-only round; no user-visible surface touched. Each finding named the existing sibling cell to extend, and I extended it: `Header.search-result-dates.test.tsx` (sibling `ef-header-recent-bypasses-formatter`), `page.message-list.test.tsx` (sibling `ef-folder-grid-drops-prefix`), `redis.cached-null-hit.test.ts` (sibling `ef-redis-getfromcache-falsy-miss`). For QAF-40 no test touches `ImageUploader` (`ls src/components/__tests__`: none), so a new file in the DOM harness, `ImageUploader.url-validation.test.tsx`, beside the module, using `helpers/dom.ts` and the `typeInto` idiom from the Header cell.

| Finding | Cell | What it asserts | Survivor it is red under | Red (cases failed / run) | Control at `620b4ee` |
|---|---|---|---|---|---|
| QAF-38 | `Header.search-result-dates.test.tsx`, the one case extended with two messages whose `guildId` differs from the path's (`'987'`) so they land in "other matches" | a time (no year) for today and a date (year) for the same day last month, in the other-folder rows as well as the current-folder rows | `ef-header-other-bypasses-formatter` | 1 of 1, `expected 'Alpha other folder last month…' to contain '2026'` (`mutation-ef-header-other-bypasses-formatter-620b4ee.txt`) | 1 of 1, exit 0 |
| QAF-38 | `page.message-list.test.tsx`, the one case now `it.each` over `grid` and `list`; the list cell presses the page's own "toggle message list view" button and asserts the list is mounted | "Today at " appears exactly once (today's message), in both views | `ef-folder-list-drops-prefix` | 1 of 3 (the list cell only) (`mutation-ef-folder-list-drops-prefix-620b4ee.txt`) | 3 of 3, exit 0 |
| QAF-39 | `redis.cached-null-hit.test.ts`, new describe in the existing file: mutex held; the scripted store answers miss then `null` (value appears before the wait's immediate check) | resolves `null` at once, with no rejection | `ef-redis-wait-falsy-miss` | 1 of 6, the "at once" cell only (`mutation-ef-redis-wait-falsy-miss-620b4ee.txt`) | 6 of 6, exit 0 |
| QAF-39 | same describe: miss, miss, then `null` (value appears only before the timeout check); fake timers advanced 10 s | still pending before the timeout; resolves `null` after it | `ef-redis-wait-timeout-falsy-miss` | 1 of 6, the timeout cell only; received `error: "fetch timed out. key: user-access-token-u1"` (`mutation-ef-redis-wait-timeout-falsy-miss-620b4ee.txt`) | 6 of 6 |
| QAF-40 | new `ImageUploader.url-validation.test.tsx` (`Image` stubbed by a class that records `src` and fires `onload`) | each of two refused URLs (`…/a.png.html`, `…/a.txt?file=b.png`) loads nothing, shows "Invalid url." and no preview; the accepted control (`…/a.png?size=2`) loads once, shows a preview and no error | `ef-imageuploader-validation-bypassed` | 2 of 3 (both refused cells; the accepted control stays green) (`mutation-ef-imageuploader-validation-bypassed-620b4ee.txt`) | 3 of 3 |

Each mutant ran in an isolated `git archive` export of `620b4ee` through `verification/015/mutate-run.sh` (`EXPORT_ROOT` in this session's scratchpad), applied by `mutators/qaf38-40-apply-qa-mutant.py` reading QA's committed mutant file by `MUT_ID` (replacement applies exactly once, else exit). Outputs are named by SHA. The sibling mutants stay killed: `ef-header-recent-bypasses-formatter` 1 of 1, `ef-folder-grid-drops-prefix` 1 of 3 (grid cell), `ef-redis-getfromcache-falsy-miss` 2 of 6. The mutated runs are not network-isolated: `redis/client` is mocked, the `Image` global is stubbed, and no cell has an outbound path. The full gate below is isolated.

**TDD Compliance (Round 4).** No new function or class; behaviour already built. Each row's "red" is a named survivor against the existing production code, as the finding owed, and every row names exactly one mutant.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `Header` other-matches date | `Header.search-result-dates.test.tsx` | No, red by mutant (production built) | Yes | `ef-header-other-bypasses-formatter`: AssertionError, row lacks the year | Yes |
| folder page list-view date | `page.message-list.test.tsx` | No, red by mutant | Yes | `ef-folder-list-drops-prefix`: AssertionError in the list cell | Yes |
| redis `wait` immediate check | `redis.cached-null-hit.test.ts` | No, red by mutant | Yes | `ef-redis-wait-falsy-miss`: AssertionError, outcome unsettled | Yes |
| redis `wait` timeout check | `redis.cached-null-hit.test.ts` | No, red by mutant | Yes | `ef-redis-wait-timeout-falsy-miss`: AssertionError, rejected "fetch timed out" | Yes |
| `ImageUploader` `checkImage` guard | `ImageUploader.url-validation.test.tsx` (new file) | No, red by mutant | Yes | `ef-imageuploader-validation-bypassed`: AssertionError, `loads` holds the refused URL | Yes |

The finding for `checkImage`'s guard is a one-conjunct predicate (`!isValidImageUrl(url)`); its boundary pair is the refused/accepted pair (`a.png.html` and `a.txt?file=b.png` refused, `a.png?size=2` accepted), both inside M6-b's quantified members, and the predicate's own unit cells are `isValidImageUrl.extensions.test.ts`.

**Gate at `620b4ee`.** `impl-suite-run.sh 620b4ee <scratch> <abs>/qaf38-40-final`: 1128 of 1128, 116 files (1122 and 115 at `c5303ca`; +6 cases are 1 folder, 2 redis, 3 ImageUploader), vitest exit 0, typecheck exit 0 (both programs), isolation 0 non-lo links and 0 default routes, stderr 0 lines (`qaf38-40-final-run-620b4ee.txt`, `qaf38-40-final-testresults-620b4ee.json`). ESLint over the four test files exit 0. `convention-check website --since=c5303ca`: 0 FAIL, 0 CANDIDATE, 1 SKIP (no conventions file above the repo for the id-token and basename checks: unchecked, not a pass; the four basenames and titles carry no ID token by inspection).

**Class sweep.**

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-38 (a call site of the "Today" formatter with no cell) | `git grep -n "formatMessageDate(" 620b4ee -- src ':!**/__tests__/**'` (derived; QA's finding named the two pages) | 4 call sites (+ the definition): `Header.tsx:154`, `Header.tsx:192`, `f/[id]/page.tsx:391`, `f/[id]/page.tsx:499` | 154 (recent matches): killed by the Header cell, sibling mutant 1 of 1. 192 (other matches): killed this round. 391 (list): killed this round. 499 (grid): killed by the grid cell. Residual with no cell: 0 of 4 |
| QAF-39 (a cached falsy value read as a miss) | `git grep -n -E "cached(Item)?\??\.item\|if \(cached" 620b4ee -- src ':!**/__tests__/**'` | 5 lines, 4 sites: `redis/index.ts:60` (timeout check), `:67-68` (immediate check), `:77` (`getItem`'s `!== null`), `:119` (`getFromCache`) | 60 and 67: killed this round. 119: killed by the existing cells (2 of 6). 77 is `getItem`'s own null test: its `null` return is the miss the wrappers above read, and the three consumers' cells fail if it returns the item unwrapped; not a member of the falsy-narrowing class. Residual: 0 |
| QAF-40 (a predicate consulted at a call site with no cell) | `git grep -n "isValidImageUrl" 620b4ee -- src ':!**/__tests__/**'` | 4 lines: `ImageUploader.tsx:18` (import), `:21` (guard), `:74` (choice of error text), `isValidImageUrl.ts:3` (definition) | 21: killed this round. 74: the refused cells assert "Invalid url."; an ad hoc mutant `qaf40-imageuploader-error-always-not-found` (`mutators/qaf40-imageuploader-error-line.json`) fails 2 of 3 (`mutation-qaf40-imageuploader-error-always-not-found-620b4ee.txt`). 18, 3: import and definition. Residual: 0 |

**Outstanding.** (1) The `Image` stub is mine: jsdom does not load images, so the accepted-URL cell asserts the component's reaction to a load the stub reports, not a browser's load; the refused cells assert that no load is attempted, which holds in any environment. This follows the conventions' environment-fidelity rule: the load success path itself is not asserted against jsdom. (2) The folder page's list-view cell reaches the list through the page's own toggle button, with `detail: 0` click events, rather than by seeding `localStorage`. (3) QA re-runs the five survivors and the suite once at the new tip.

**Self-diagnosis (method).** None escaped: no defect reached a later gate in this round. The two redis cells needed a store that answers a scripted miss-then-hit; I named the two mutants before writing either cell, so the two cells split on the check each mutant narrows (the "at once" cell cannot kill the timeout mutant, and the reverse).

## Round 5 — QAF-41, QAF-42 (plumbing sweep), website `620b4ee..9b5e47f`

Source: `qa/015-bug-evaluation-fixes-effort-final-qa.md` § Plumbing sweep (`da49f25`); mutants in `effort-final/website-plumbing-mutants.json`. Test-only: `git diff --stat 620b4ee 9b5e47f` is three test-file changes in two files, no production change. Stage start: QA's message to this session naming both findings. Test-only round; no user-visible surface touched.

**Patterns Extended.** Both findings named the file to extend: `shared.in-predicates.test.ts` (its two `getPartialMessages` cells already capture the compiled SQL and parameters; the new line is another `toContain` on `sql`) and `auth.hydrated-session.test.ts` (its `hydrate()` fixture took a hard-coded user; it now takes the user as an optional argument defaulting to that same user, and the new cases pass their own).

| Finding | Cell | What it asserts | Survivor it is red under | Red (cases failed / run) at `9b5e47f` | Control |
|---|---|---|---|---|---|
| QAF-41 | `shared.in-predicates.test.ts`, both existing `getPartialMessages` cells | the compiled query selects `"Guilds"."guildId" as "guildId"` with guilds empty and with guilds present | `pl-shared-partial-guildid-unselected` | 2 of 4, one per branch (`mutation-pl-shared-partial-guildid-unselected-9b5e47f.txt`; also red at `2b40dc5`) | 4 of 4 exit 0 at `2b40dc5` (`mutation-qaf41-42-control-shared-2b40dc5.txt`) |
| QAF-42 | `auth.hydrated-session.test.ts`, new `it.each` describe: a user with no `preferences`, and one with `preferences: {}` | the session resolves with the guilds, `hydration.messages` equal to `[]`, no recent-messages fetch, no unhandled rejection | `pl-auth-message-promise-unwrapped` | 2 of 20, both new cells; the TypeError rejects the callback (`mutation-pl-auth-message-promise-unwrapped-9b5e47f.txt`; also red at `2b40dc5`) | 20 of 20 exit 0 at `2b40dc5` (`mutation-qaf41-42-control-auth-2b40dc5.txt`) |

Each mutant ran in an isolated `git archive` export through `mutate-run.sh`, applied by `mutators/qaf38-40-apply-qa-mutant.py` with `MUTANTS` pointing at QA's committed file. The runs are not network-isolated; `getPostgres` and redis are mocked in both files, so no cell has an outbound path. The full gate is isolated.

**TDD Compliance (Round 5).** No new function or class. Each row's red is a named survivor against the existing code, one mutant per row.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `getPartialMessages` select list | `shared.in-predicates.test.ts` | No, red by mutant (production built) | Yes | `pl-shared-partial-guildid-unselected`: AssertionError, SQL lacks the column | Yes |
| `getUserRecentMessages` select list (class-sweep member) | `shared.in-predicates.test.ts` | No, red by mutant | Yes | `qaf41-recent-messages-guildid-unselected` (`mutators/qaf41-recent-messages-guildid-unselected.json`): 1 of 4, AssertionError | Yes |
| `hydratedAuthCallback` no-recent-messages path | `auth.hydrated-session.test.ts` | No, red by mutant | Yes | `pl-auth-message-promise-unwrapped`: TypeError `.catch` of an array, surfaced as a rejected session | Yes |

The `Promise.resolve(` wrap is a two-input predicate (`recentMessageIds` present, or not); the two new cells are the "not" class, one per way of being absent (`preferences` undefined, `preferences` present without the field). The "present" side is the existing cells. The wrapped value is only wrong on the "not" side, so no third fixture is owed.

**Gate at `9b5e47f`.** `impl-suite-run.sh 9b5e47f <scratch> <abs>/qaf41-42-final`: 1130 of 1130, 116 files (1128 and 116 at `620b4ee`; +2 are the auth cells; the extra assertions add no cases), vitest exit 0, typecheck exit 0, isolation 0 and 0, stderr 0 bytes (`qaf41-42-final-run-9b5e47f.txt`, `qaf41-42-final-testresults-9b5e47f.json`). ESLint over both files exit 0. `convention-check website --since=620b4ee`: 0 FAIL, 0 CANDIDATE, 1 SKIP (no conventions file above the repo for the id-token and basename checks: unchecked, not a pass).

**Class sweep.**

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-41 (a select column the rewrite preserved, with no assertion) | `git grep -n "guildId as guildId" 2b40dc5 -- src ':!**/__tests__/**'` (derived), then `git diff -U0 7ce866b 2b40dc5` over the two files | 4 lines: `shared.ts:113` (`getUserRecentMessages`), `:143` (`getMessage`), `:162` (`getPartialMessages`), `guild.ts:59` | 162: fixed. 113: the chain edited this function (added the empty-list return), so a member; assertion added at `9b5e47f`, red under its own mutant. 143 and `guild.ts:59`: not touched by the chain (0 of the diff hunks hold the column, `guild.ts` has no change), so not members of the chain's changed surface. Residual: 0 |
| QAF-42 (a value assumed to be a promise at a call site the chain added) | `git grep -n "Promise.resolve(\|\.catch(() => {})" 2b40dc5 -- src ':!**/__tests__/**'` (derived) | 1 `Promise.resolve(` (`auth.ts:138`) and 4 `.catch(() => {})` (`auth.ts:73`, `:85`, `:141`, `:176`) | 138 and 141: fixed (the wrap and the `.catch` it feeds). 73, 85, 176: `.catch` on `fetch`, `redis.clearUser` and `redis.fetchGuild`, each always a promise by construction, not an operand that can be an array. Residual: 0 |

**Self-diagnosis (method).** Not an escaped defect: both lines are preserved behaviour that no earlier test of mine asserted, and the M1-a and M1 gates passed without a mutant on either. The check to apply first, for a rewrite that preserves behaviour: empty each preserved line and see which test fails, as was done for the `Button` effect.

## Next Steps

Code review of `2618926..c5303ca` (website; this document, Round 3; CR-38 only), then QA's scoped re-run of M6-a's title cells (`rules-title-i`) and the QAF-35 rows. The CR-26 signature change above needs the reviewer's confirmation.

## Resumption State (checkpoint 2026-11-08T11:25, implementer-hooks-015; steering's /checkpoint request)

- **Branches and HEAD.** website `chain/015-bug-evaluation-fixes` at `c5303ca`, clean. preview-image-generator `chain/015-bug-evaluation-fixes` at `8de2b53`, clean, not pushed. agent-output: everything of mine is committed (this document; the M8 document with § QAF-37 at `b449f15`; the QAF-37 probe cell at `8fb1eee`). Two empty untracked files of mine remain: `verification/015/cr37-final-run-2618926.txt.stderr` and `cr38-final-run-c5303ca.txt.stderr` (0 bytes, run side-products, not committed). Other sessions' modifications (`INBOX.md`, `qa/*`) are not mine. Nothing locally mutated; mutation exports and rig exports are in this session's scratchpad (`/tmp/claude-1000/-usr-local-bin-hooks/2e64cdda-da60-412f-b877-233044fe3158/scratchpad`), disposable. No process of mine is running.
- **Done this session.** QAF-34 (`b93e897`), QAF-35 (`00c9bee`), CR-26 (`86f5a6c`, narrowed at `2618926`), CR-35 (`b195eeb`), CR-36 (QAF document), CR-37 (`87b662f`), CR-38 (`c5303ca`): all with documents in this file's Rounds 1 to 3. Code review: APPROVED for `2618926..c5303ca` (CR-38 RESOLVED, `9b4d808`). QAF-37 (generator 10 s fallback): a rig cell in `m8-local-probe/probe.cjs`, no source change; control 35/35, mutant `qa-ef-fallback-timer-removed` killed by 2 cells; document `015-bug-evaluation-fixes-m8-implementation.md` § QAF-37.
- **Open, not mine to move.** Code review has no verdict on QAF-37 (`8fb1eee`) yet; QA's re-run of `qa-ef-fallback-timer-removed` alone waits for that sub-entry and for the website sweep to finish (the cell's 9500 to 12000 ms window is load-sensitive; my timings (10019 ms) were taken under unknown load, corrected to QA). QA's scoped re-run of M6-a's title cells and the QAF-35 rows. The website effort-final sweep (265 mutants at `c5303ca`) is QA's, running; anything it finds comes as a fresh message.
- **Next, in order.** None owed. A later fix round comes as a fresh message naming this Resumption State. Plan item (4) (M8-b/M8-d as non-object 500 and as a property): unchanged unless the planner's later revision says so. The pre-UAT planner fold (rev 28 items) needs nothing from me.
- **Questions sent and open.** None to the owner. To steering: the D36 log stream (stderr vs the out log) is parked in the pre-UAT fold. To UAT (via code review): `focusSafely` defers focus under a screen reader's virtual cursor, where the deleted `Button` effect focused at once; not mine to resolve.
- **Evidence run but not recorded.** None outstanding.
- **Lessons to keep.** Name the mutant a cell is for before writing the cell. A "behaviour-preserving" claim needs the loss of each moved effect shown to fail something, not an unchanged pass set. `impl-suite-run.sh` takes an absolute out-prefix (it `cd`s into the export). Never wait with `pgrep -f` on a pattern that matches the waiter; wait on the background-task notification. A timing claim needs the load stated or measured. Stamps come from `date -u`, never typed. Helper forms: `mutate-run.sh <sha> <label> <test> <mutator>` with `EXPORT_ROOT`, `MUT_ID` for `qa-r2-supplement.py`; `m8-local-probe/run.sh <repo> <scratch> <sha> <abs out>`; `qa-m8r-sweep.py <export> <mutants.json> <out dir> <agent-output> -j 1 <names>`; `cr26/lint-planted.sh <website> <sha> <out> <scratch>`.
