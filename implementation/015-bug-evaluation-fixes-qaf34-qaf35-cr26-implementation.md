---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "QAF-34 (MEDIUM), QAF-35 (LOW), CR-26 (LOW) and CR-35 (LOW) delivered on website's chain branch at b195eeb. QAF-34: the title case runs over both title parsers, red under m6a-title-codeblock-interactive (1 case) and under the static mutant (1 case), control 29 of 29. QAF-35: the two rows are red under named mutants, control 57 of 57. CR-26: no-restricted-imports bans react-use useMount and the three callers use useEffect; full gate at 86f5a6c 1119 of 1119, vitest exit 0, typecheck exit 0. CR-35: the formatKey test sits beside its module. CR-36 reconciled in the QAF document. Round 2 (CR-37 MEDIUM, code review REJECTED b195eeb for the CR-26 callers): spec-form cells for the editor `onMount` effect (red under the reviewer's mutator) and for Button `autoFocus` (the reviewer's mutator is equivalent: react-aria focuses on mount; the cell is red under a mutant that also stops autoFocus reaching react-aria); the lint ban also covers `react-use/lib` and `react-use/esm`. Full gate at 2618926: 1122 of 1122, 115 files, vitest exit 0, typecheck exit 0."
Handoff-At: "c5303ca — repos=website"
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
