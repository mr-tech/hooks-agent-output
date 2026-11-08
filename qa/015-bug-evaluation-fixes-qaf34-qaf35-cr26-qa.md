---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "c5303ca — repos=website; QAF-34 (M6-a), QAF-35 (M5-h), CR-26 with CR-37 and CR-38 (the useMount callers, M6 Round 14), 4f9ed85..c5303ca; git-archive exports under unshare -rn; 2618926 is the differential's base"
Status: QA Complete
Status-Detail: "PASS at website c5303ca. M6-a PASS (QAF-34 RESOLVED: rules-title-i killed). QAF-35 RESOLVED (both rows seen red). The useMount callers PASS. Suite 1122/1122, 115 files, vitest exit 0, typecheck exit 0, identical by file and per-file count to 2618926. 13 mutants in the round's production diff: 11 killed, 2 equivalent. No new finding."
Phase: 2
---

# QA Report: Plan 015 — QAF-34, QAF-35 and CR-26's callers (website)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 27 (`18d361c`). M6-a's and M5-h (3)'s criteria are as at the `476c633` pass. CR-26, CR-37 and CR-38 are code-review findings under M6's Round 14, and no plan criterion moved.
**Implementation**: `implementation/015-bug-evaluation-fixes-qaf34-qaf35-cr26-implementation.md`, `Handoff-At` `c5303ca`, in three rounds: `b195eeb`, `2618926` and `c5303ca`.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md`. The Round 14 sub-entry at `2618926` is APPROVED_WITH_COMMENTS (`8367242`). The CR-38 sub-entry at `c5303ca` is APPROVED (`9b4d808`). `Reviewed-At` names `c5303ca`, and that is the stage start.
**The findings closed**: QAF-34 in `qa/015-bug-evaluation-fixes-m6-qa.md`, QAF-35 in `qa/015-bug-evaluation-fixes-m5-qa.md`.
**Register**: `qa/015-bug-evaluation-fixes-qa.md` § Blocking-condition register. No row is appended.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T10:46 | code-reviewer-hooks-015 (`8367242`, `9b4d808`); steering-hooks-015 (messages naming `2618926`, then `c5303ca`) | QA Phase 2: the M6-a title cells re-run, the QAF-35 rows, the round's production diff | Created. PASS at `c5303ca`. QAF-34 and QAF-35 RESOLVED. The pass first ran at `2618926`, the tree approved first, and was extended to `c5303ca` on a differential once code review approved CR-38. **Gate disclosed:** the stamp gate (a PostToolUse hook) refused this row's first, typed stamp (10:56 against a clock of 10:46). The stamp was replaced by the clock minute; no content changed. |

## Scope and criteria assessed

Fixed before execution:
- **M6-a, the preservation limb (QAF-34).** "A title renders no code block, unchanged", for both title parsers, static and interactive.
- **M5-h (3), the refused members (QAF-35).** The two rows owed by QAF-35, a bare `{` and `[{}]`, each show the one error line and no editor.
- **CR-26's callers (M6, Round 14).** Each of the three mount effects moved off `useMount` keeps its behaviour:
  - `Button` focuses on mount with `autoFocus` and not without. At `c5303ca` the focus comes from react-aria alone.
  - `DiscordMessageEditor` calls `onMount` once after mount and not on a re-render.
  - `useMounted` becomes true after mount.
- **The lint ban** (`.eslintrc.json`, CR-26). This is configuration, so the suite does not exercise it. Code review's plant rig is its instrument, and that rig is re-run here.

## TDD compliance gate

Passed. The implementation's tables have a row per added cell with a named red mutant:
- QAF-34: `m6a-title-codeblock-interactive` and `-static`.
- QAF-35: `m5h-array-allowed` and a parse-failure mutant.
- CR-37: the editor's emptied effect, and the Button's effect-plus-aria mutant.
- CR-38: `cr38-button-autofocus-not-passed-to-usebutton`.

"Written first: No, red by mutant" is correct for cells over built behaviour. For CR-26's ban, the lint rig carries a before and after.

## Test Execution Results

- **Suite at `2618926`** (`qa-m4-suite-run.sh`, export, `unshare -rn`, lo up, 0 non-lo links, 0 default routes): 1122 of 1122, 115 `testResults`, **vitest exit 0**, **typecheck exit 0**, 0 stderr lines (`verification/015/qa-p2-r4-*-2618926.*`).
  - Path membership against `4f9ed85`: added `src/components/__tests__/Button.auto-focus.test.tsx` and `src/utils/redis/__tests__/formatKey.key-format.test.ts` (CR-35's move); removed `src/utils/__tests__/formatKey.key-format.test.ts`.
  - Arithmetic: 1115 + 2 (title `describe.each` and the `parseContent` control) + 2 (QAF-35) + 1 (`onMount`) + 2 (`Button`) = 1122.
- **Suite at `c5303ca`**: 1122 of 1122, 115 files, **vitest exit 0**, **typecheck exit 0** (`qa-p2-r5-*-c5303ca.*`). The file set is identical to `2618926` by path, and so is each file's case count. The only production change in `2618926..c5303ca` is `src/components/Button.tsx` (+2 −8).
- **Production unchanged where M6-a and M5-h live:** `git diff --numstat 476c633 c5303ca -- src/app/preview src/utils/markdown ':!*__tests__*'`, written to a file, gives 0 paths. So M6-a's RK-1 differential (0 of 12,486 at `476c633`) and M5-h's class runs still describe this tree, and only their tests moved.
- **QAF-34 re-run** (`qa-sweep.sh 2618926 qa-r4b`, `mutators/qa-r2-supplement.py`): control 29/29.
  - `m6a-title-codeblock-interactive`, the `476c633` survivor `rules-title-i`, is now **killed**: 1 case, "interactive parseEmbedTitle … does not render a fence as a code block".
  - `m6a-title-codeblock-static` is killed by the static case only.
  - The interactive predicate is a top-level `codeBlock` node type. Its positive control, `interactive parseContent` on the same fence, contains `codeBlock`, so the predicate is not vacuous.
- **QAF-35 rows** (control 57/57):
  - `m5h-array-allowed` reddens "a JSON array" and "a JSON array holding an object", 2 cases.
  - QA's `r5-preview-parse-failure-rethrows` (the catch rethrows) reddens "a bare opening brace" together with "text that is not JSON", 26 cases at `c5303ca`.
  - Each new row is therefore seen red under a mutant of its own branch. Each also shares that branch with an older sibling row, which QAF-35 accepted.
  - `m5h-refuse-all` reddens the 14 accepting cases and none of the refusal rows, as designed.
- **The lint ban** (`cr-m6-probes/cr26-ban/run.sh`, run by QA against the shared tree's `.eslintrc.json`, blob `cf662fd`, the same blob as at `2618926` and `c5303ca`): `qa-r4-lint-ban-2618926.txt`. It flags 9 of 14 plants, including `react-use/lib` and `react-use/esm`, and both controls give 0. Byte-identical to code review's `lint-2618926.txt` after the header. Seen red: code review's `b195eeb` run leaves `lib-index` and `esm-index` unflagged. Residue as stated by code review: the dynamic `import('react-use')`.

**Mutation sweep.** *13 mutants in `mutators/qa-r4-supplement.py` (blob at agent-output after `c226f29`, with the `r5-*` entries added before their runs), each an exact-once replacement in the production diff `4f9ed85..c5303ca` (`Button.tsx`, `DiscordMessageEditor/index.tsx`, `utils/hooks/index.ts`, plus `src/app/preview/page.tsx`'s parse catch for QAF-35's row). Every run uses the whole suite. Excluded: `.eslintrc.json`, whose instrument is the plant rig above. Driver `qa-sweep.sh`; runs by helpers, read by QA; summaries `qa-r4-sweep-summary-2618926.txt` and `qa-r5-sweep-summary-c5303ca.txt`.* Controls: 1122/1122 at both trees.

| Mutant | Tree | Cells red |
|---|---|---|
| `r4-button-no-autofocus` (effect emptied and `autoFocus: false` to `useButton`) | `2618926` | 1: focused with `autoFocus` |
| `r5-button-aria-off` (`autoFocus: false` to `useButton`; the only mechanism at `c5303ca`) | `c5303ca` | 1: focused with `autoFocus` |
| `r4-button-always-focus` | `2618926` | 7: not focused without `autoFocus`, plus 6 editor cells whose buttons steal focus |
| `r4-button-aria-always` | `2618926`, `c5303ca` | 7 at each: the same set |
| `r4-editor-onmount-empty` | `2618926` | 1: `onMount` once |
| `r4-editor-onmount-every-render` | `2618926` | 1: the same cell ("not again") |
| `r4-mounted-never-without-delay` | `2618926` | 26 across 5 files |
| `r5-preview-parse-failure-rethrows` | `c5303ca` | 26: every refusal row resting on the catch, `{` included |
| QAF-34 `m6a-title-codeblock-interactive`, `-static`; QAF-35 `m5h-array-allowed` | `2618926` | 1, 1, 2 (above) |
| `r4-button-effect-empty` | `2618926` | **survived**: equivalent |
| `r4-mounted-every-render` | `2618926` | **survived**: equivalent |

Counting the three QAF mutants: 13 run, 11 killed, 2 equivalent.

**Survivors, dispositioned:**
- `r4-button-effect-empty`: **equivalent**, as code review established. react-aria's `useFocusable` focuses from `autoFocus`. The mutated line no longer exists at `c5303ca` (CR-38), where `r5-button-aria-off` holds the remaining mechanism.
- `r4-mounted-every-render` (the `[]` dropped from `useMounted`): **equivalent**. The state only moves from `false` to `true`. Re-running `setMounted(true)` after mount sets the same value, and React bails out. With a delay, each re-render queues a timer that sets the same value. No caller can observe the difference except a timer count, which no surface exposes.

## Implementation Review (Post-Implementation)

- The rewrites inline react-use 17.4.0's own `useMount` (`useEffect(fn, [])`), with block bodies that discard return values. Code review read the library source.
- CR-38 removes the duplicate focus mechanism, so `Button auto focus` now guards react-aria's path directly.
- `useParsePathname` remains untested (an earlier round's Outstanding Item 1, recorded).
- CR-35's move keeps the `formatKey` file's 2 cases.
- No overreach.

## Findings

None. QAF-34 and QAF-35 are RESOLVED (dated reconciles in their own documents).

## Assumption Not Checked

This pass assumes, with code review's Round 14 sub-entry, that jsdom's `document.activeElement` follows react-aria's mount-time `focus()` as Chrome does for a `<button>`. It does not test it, because a browser act needs steering's go.
- **What jsdom shows:** the button is focused with `autoFocus` and not without, and both halves are seen red.
- **Signature of its falsity:** in a real browser, a dialog that autofocuses a button opens with focus elsewhere. For example, in the New Message dialog (`NewMessageModal`, an `autoFocus` site), typing does not reach the field or button the code focuses.
- **Owner of closing:** UAT, as an observation during B-9's walk, which opens the New Message dialog in the stage browser. No row is minted: the property is the pre-existing `autoFocus` behaviour, which this chain claims to preserve. A failure there is a regression report against CR-26's callers.

## Handoff

- **Verdict:** PASS at `c5303ca` for M6-a (QAF-34), for QAF-35's rows, and for CR-26's three callers. This discharges the QAF-34 re-run and QAF-35, both owed before the effort-final pass.
- **Next for QA:** the effort-final pass (the owed list in the chain's first QA document).
- **Assumption Not Checked:** to UAT through B-9's walk, named again when UAT is briefed.
