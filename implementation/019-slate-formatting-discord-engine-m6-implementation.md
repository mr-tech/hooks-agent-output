---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M6 is built on chain/019-slate-formatting-discord-engine. First delivery: website 119471f (code review Round 6, approved with
  comments; QA Phase 2 failed at 119471f on AC-6.8 and QAF-50). Fix Round 1 (CR-20, AC-6.8 of plan Revision 20; QAF-50, QAF-46; the
  AC-3.3 cap) is handed to code review at 42128cd, a tree identical to 10abfa9. Whole suite 3,715 of 3,715, exit 0, 64.4 s.
Handoff-At: 42128cd — repos=website — M6 Fix Round 1 handed to code review (tree identical to 10abfa9); whole suite 3,715 of 3,715, exit 0
---

# Implementation 019 — M6: the Slate layer, round trip and input

## Plan Reference

`agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 15 (R-71, record `efa66eae`), milestone M6, with D-21
(AC-6.5's expected source), D-22 (AC-6.7, quote continuation) and SL-16, SL-17, CF-22, CF-23, CF-24, QAF-40 to QAF-42 as the plan
folds them. QA Phase 1: `qa/019-slate-formatting-discord-engine-qa.md`. Chain branch `chain/019-slate-formatting-discord-engine`.
The plan's Status was already `In Progress`.

## Date

2026-11-24 (UTC). Session `implementer-019`.

## Changelog

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-24T03:49 | steering-hooks-fixer (message; stage start, effort rulings block 2026-11-24T03:49Z, record `71823d9c`) | Build M6 | S-29 `8cb4d83`; emoji lift on the engine `c3af0ac`; quote carry `f58a816`; M5 fix data `cf126ea`; `simple-markdown` removal `4897f1c`; AC-6.5 and AC-6.2 properties `3493290`; code-line shortcut removed `ef19961`; lint and comment gate `42d4574`. |
| 2026-11-24T05:10 | steering-hooks-fixer (message after /clear; Resumption State items 1 to 6) | Finish the owed items and hand M6 to code review | M5 Fix Round 1 handed and approved with comments; stub-tree reds; `native-box-classes` compares inputs holding an element (`1aaa960`); sweeps at `9719d02` and `d652d12`; caret defect fixed (`d652d12`); survivor tests (`a490d40`, `223c078`, the Enter row); whole suite and convention check at `119471f`; planner told Outstanding 2 (confirmed, R-74). |
| 2026-11-24T07:07 | planner-019 (message after /clear; Revision 16, then 17 to 20 as the gates read them; release at R-86, hand-off at R-88) | CR-20's fix round: AC-6.8 | Count test red at `119471f` (`daad7fa`); `resolveEmoji` per run unit and the timed bench (`ebb757e`); QAF-50, QAF-46 and the generator count fit (`7cea6a9`); `resolveEmoji` returns nothing (`10abfa9`); a neighbour step tried and reverted (`acd9df8`, `42128cd`). See Fix Round 1. |

## Implementation Summary

- **S-29 (AC-6.1).** A `> ` or `>>> ` line that a typed edit turns into a code line keeps its marker in the saved text
  (`withNormalizeNode.ts` `handleEditor`, one `insertText`). The 15,480-edit differential is 15,480 of 15,480 and its 346-entry hold-out
  list is deleted.
- **The emoji lift reads the engine (AC-6.5, AC-6.2).** `emojiLift.ts` lists the engine's `emoji` nodes of a run unit
  (`emojiLayout`); `getInitialValue(input, surface, partialMarkdown)` lifts them on load; `withNormalizeNode(editor, partial, surface)`
  lifts and re-decides on edit (`resolveEmoji`, `revertToText`). The element is `{type:'emoji', source, src, alt, title, custom}`
  (JSON-safe: the engine's custom id is a bigint). `flattenNodeText` saves `source`. `common.ts`, `onCopy.ts` need no other change.
- **Quote continuation (AC-6.7, D-22).** `editor.insertBreak` and `insertSoftBreak` carry `> ` onto the new line from a `> ` quote
  line only (`carriesMarker`); `editor.apply` carries nothing on any split, so a paste adds no marker (CF-22); a typed `> ` on a
  carried marker replaces it (`resolveCarried`, CF-23's transient `carried` field); Backspace ends a continued quote, and for a
  carried marker held as text in a code line `onKeyDown` deletes the marker.
- **`simple-markdown` leaves the product (AC-6.6, CR-19).** Rules, interactive parsers, ambient types, patch, manifest entry,
  `pnpm-workspace.yaml` and the lockfile's four entries are gone.
- **The held-out lists are deleted (R-30, CR-7).** `git grep -c "BASE_RED\|holdsEmoji" <tip> -- src` prints nothing.

## Milestones Completed

M6 in code: AC-6.1 (S-29 and the load, save and settle properties over every class, emoji included), AC-6.1b (the read, below),
AC-6.2, AC-6.5 (properties, hand control, frozen literals), AC-6.6, AC-6.7. Not built: AC-6.3 (UAT's walk, QA register B-4) and AC-6.4
(an optional owner observation; M6 makes no edit of `setOnInsert`).

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | effort rulings block 2026-11-24T03:49Z (record `71823d9c`), Revision 12; then Revisions 13 to 15 each passed all three gates before the code they release | n/a |
| QA Phase 1 covers M6 | `qa/019-…-qa.md`, Phase 1, last re-key on Revision 15 (`3b264329`) | n/a |
| Open questions | none open in the plan | n/a |
| Premise | no `PREMISE-STALE` on M6 | n/a |
| Cap | M6 is capped (block 00:49Z) | n/a |
| The box exposes its spans | **false**: probe `verification/019/impl/m6-box-emoji-probe-2e36107.test.ts`, outputs `m6-box-emoji-probe-2e36107.json`, `m6-box-emoji-entries-2e36107.json`; D-21 retires EC-7 and makes the oracle helper the source | `discordOracle.emoji-spans.test.ts` |
| AC-6.5's hand control against the helper | 52 members agree at first run; 22 differed and steering ruled (block 2026-11-24T04:51Z, record `89dae9f6`): the 12 address members take the helper's value (the engine under D-13, Discord's display unread) and the 10 label members take `[]` (D-5, AN-7 G-14) | `discordOracle.emoji-spans.test.ts` (113 cases) |
| AC-6.7 Enter question | owner's answer, block 2026-11-24T04:00Z (record `603fb039`); plan Revision 14 | `withNormalizeNode.quote-continues-on-enter.test.tsx` |

## Flows (user-visible work)

M5 and M6 flows were derived in the M4 document ("M5 and M6 flows, derived ahead of stage start"); the Enter flow held a decision and
was put to the owner through steering (answered, D-22). Recorded as built:

| Flow | Line | Rung |
|---|---|---|
| Emoji lift on load and edit | a Unicode, ZWJ, skin-tone, keycap, flag or tag emoji, a custom emoji, and a `:name:` the engine calls an emoji, become one image element and save and copy as the typed text; `©`, `™`, `®` and a heart with no variation selector stay text | `getInitialValue`, `withNormalizeNode` `handleElement`, as before, now fed by the engine |
| Emoji where the engine does not call it one | typing backticks around an element, or typing a web address before it, turns it back into its text, and removing them lifts it again; an emoji in a code line is text (visible change: it was an image) | CF-9's re-decide, in the same normalise pass |
| Enter in a `> ` quote line | the new line starts with `> `; in a `>>>` block, a code fence opened on an unquoted line, or any other line, nothing is carried | the base's Enter continuation, now stated by AC-6.7's table |
| A paste with line breaks | saved exactly as pasted (visible change: it used to gain `> ` on lines after a quote line) | AC-3.3's paste limb |
| Typing `> ` onto a carried `> ` | the typed marker replaces the carried one; a further `> ` is content | D-22 |
| Ending a continued quote | Backspace at the start of the new line, as today for a quote line; where the carried marker sits in a code line as text, Backspace right after it deletes it (new) | `onKeyDown` `normalizeBackspace` |
| Guild emoji picker | not changed (`editor.insertText(emoji)`) | AC-6.3 is UAT's |

## Files Modified

| Path | Changes |
|---|---|
| `src/components/SlateEditor/utils/withNormalizeNode.ts` | S-29; takes the surface; `resolveEmoji`, `revertToText`, `carriesMarker`, `resolveCarried`, the `insertBreak` and `insertSoftBreak` overrides; the `split_node` override carries nothing |
| `src/components/SlateEditor/utils/getInitialValue.ts` | `(input, surface, partialMarkdown)`; lines built first, `liftLoaded` after |
| `src/components/SlateEditor/utils/{common,flattenNodeText,renderElementFactory,onKeyDown,decorator,unitStyles,index}.ts(x)` | element shape and readers; the backspace gesture; the run unit and unit parse moved out |
| `src/components/SlateEditor/index.tsx`, `DiscordContentEditor/{Desktop,Mobile}.tsx` | no `emojiParser` prop |
| `src/@types/slate.d.ts` | the emoji element, `carried`, no `ast` |
| `src/utils/markdown/{index,preview,emoji}.tsx`, `src/providers/MarkdownProvider.tsx`, `src/components/{Markdown,DiscordContentEditor/index}.tsx` | local `StaticParser`; static map only; `emoji.tsx` keeps three helpers |
| `package.json`, `pnpm-lock.yaml` | `simple-markdown` removed; the lockfile lost exactly its four entries (15 lines deleted, 0 added) |
| frozen data | `discordNativeBox.json`, `discordTypedCases.json` (QAF-39, in the M5 document) |
| tests | rebased onto the surface signature; see § Files Created |

Deleted: `src/utils/markdown/{rules.tsx,utils.ts}`, `src/@types/simple-markdown.d.ts`, `patches/simple-markdown@0.7.3.patch`,
`pnpm-workspace.yaml`, `__tests__/{emoji.longest-sequence-first,utils.static-pre-transform-gone}.test.ts`, the two hold-out lists
`blockLayerEditsBaseRed.json` (`8cb4d83`) and `mountedBaseRed.json` (`f58a816`).

## Files Created

| Path | Purpose |
|---|---|
| `src/components/SlateEditor/utils/emojiLift.ts` | the engine's emoji spans of a unit; the element builder; `liftLoaded` |
| `src/components/SlateEditor/utils/{runUnit,unitParse}.ts` | the run unit (from M5's decorator) and its fence-framed parse (from `styleUnit`) |
| `.../utils/__tests__/emojiLift.layout.test.ts` | the layout of units, literal spans |
| `.../utils/__tests__/withNormalizeNode.quote-continues-on-enter.test.tsx` | AC-6.7's table, literals |
| `.../utils/__tests__/withNormalizeNode.emoji-set-equals-the-engines.test.tsx` | AC-6.5 typed-edit property (backticks, link syntax, typed inside code and addresses) against the helper's spans |
| `.../utils/__tests__/getInitialValue.emoji-spans-equal-the-engines.test.ts` | AC-6.5 loaded-text property over 3,040 inputs on six surfaces against frozen spans |
| `.../__tests__/SlateEditor.emoji-forms-reach-the-message.test.tsx` | AC-6.2: 23 forms, opened, typed, pasted, both modes |
| `.../__tests__/helpers/{emojiInputs,quoteTable}.ts`, `helpers/data/emojiSpans.json` | the input class, the independent quote table, the frozen spans (250 KB) |
| `src/utils/markdown/__tests__/{discordOracle.emoji-spans,discordEmojiSpans.frozen-literals,simpleMarkdown.absent-from-product}.test.ts` | the hand control, the freeze re-derived, AC-6.6 |
| `.../utils/__tests__/{renderElementFactory.emoji-element,emojiLift.layout-cache}.test.{tsx,ts}`, `.../{getInitialValue,withNormalizeNode}.engine-not-ready.test.{ts,tsx}` | the emoji image's attributes, the layout cache's bound, the editor before the engine loads |

Also changed by the round after the sweep: `withNormalizeNode.ts` (`d652d12`, the caret mapping), and the tests `decorator.native-box-classes`, `emojiLift.layout`, `getInitialValue.emoji-spans-equal-the-engines`, `withNormalizeNode.emoji-keeps-line-text`, `withNormalizeNode.quote-continues-on-enter`.

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| Run unit | M5's `unitAround` and `styleUnit`'s fence framing, moved to `runUnit.ts` and `unitParse.ts` and shared by the lift |
| Engine tree walk | M4's `emojiSrc` (`emojiDisplay.ts`) for the image address |
| Enter | the base's quote continuation, moved from the `split_node` override to `insertBreak` |
| Frozen oracle data | `discordNativeBox.json`'s form for `emojiSpans.json` |

## TDD Compliance

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| S-29's prefix insertion (`handleEditor`) | `withNormalizeNode.quote-and-fence-lines-settle.test.tsx` | Yes | Yes | AssertionError: `[ '```\n`x``', 'codeBlock' ]` against the text with `> `, and 346 edits wrong (`m6-red-1.txt`); green `m6-green-1.txt` | Yes |
| `emojiLayout` | `emojiLift.layout.test.ts` | Yes | Yes | `Cannot find module '…/emojiLift'` (first row of the module; `m6-red-2.txt`) | Yes (`m6-green-2.txt`) |
| `liftLoaded`, `emojiElementOf`, `spansInLine`, `getInitialValue` on the surface | `getInitialValue.stored-text-loads-unchanged.test.ts` | Yes | Yes | `TypeError: parseEmoji is not a function` (the signature; `m6-red-3.txt`); assertion-level by mutant `load-lifts-nothing` and `span-need-not-end-in-line`, both KILLED | Yes |
| `resolveEmoji`, `revertToText`, `pointAtOffset`, `flatOffset`, `startsOf` | `withNormalizeNode.emoji-keeps-line-text.test.tsx`, `…emoji-set-equals-the-engines.test.tsx` | No: the normaliser was written with the lift, then the tests | Yes, by mutant, and by stub-tree (isolated export of `1aaa960`, `node_modules` linked, the function holding no body; both test files, 21 cases) | mutants `no-redeciding-on-edit`, `no-lift-on-edit`, `unit-never-written-with-sources` KILLED (`m6-mut-3493290-*.txt`); first run of the rewritten file failed on a truncated source file (`m6-run-4.txt`), not an assertion. **Stub `resolveEmoji` (`return false`): 17 failed, 4 passed**, AssertionErrors such as `expected [ 'a:smile:b' ] to deeply equal [ 'a', '[:smile:]', 'b' ]` and `expected [ 'a`', '[🙂]', '`b' ] to deeply equal [ 'a`🙂`b' ]` (`m6-stub-1aaa960-A.txt`). **Stub `revertToText` (empty body): 7 failed, 14 passed**, e.g. `expected [ 'https://x.y/a', '[🙂]', '' ] to deeply equal [ 'https://x.y/a🙂' ]` (`m6-stub-1aaa960-B.txt`). The real code: 21 of 21 (`m6-stub-1aaa960-green.txt`). `pointAtOffset`, `flatOffset`, `startsOf` run inside `revertToText` and `resolveEmoji`; the sweep covers their guards | Yes |
| `emojiToImage`, the `emoji` case of `renderElementFactory` | `renderElementFactory.emoji-element.test.tsx` (new, `9719d02`) | No: the factory's emoji case was written at `c3af0ac`, no test rendered it; the sweep found its mutants alive, so the test was written and each mutant run against it | Yes, by five mutants in an isolated export (`and-for-or` on `custom \|\| isEmbed`, `custom-ignored`, `alt-from-title`, `embed-class-always`, `src-from-alt`), all KILLED, the unmutated control green | AssertionErrors on the img attributes and the wrapper class | Yes (3 of 3) |
| `carriesMarker`, `splitCarrying`, `resolveCarried`, the `split_node` override | `withNormalizeNode.quote-continues-on-enter.test.tsx` | Yes | Yes | five AssertionErrors (`m6-red-5.txt`); mutants `carry-never-fires`, `NM-68`, `NM-69`, `carry-on-paste`, `typed-marker-not-taken-in` all KILLED | Yes (`m6-green-5.txt`) |
| `normalizeBackspace` on a carried code-line marker | same | Yes | Yes | AssertionError `'> ```\n> x\n> '` against `'> ```\n> x\n'` (`m6-red-6.txt`) | Yes |
| the typed drive (`typeText`) and `continuesQuote` | mounted typed tests | n/a (test helper) | positive control: Enter then Backspace leaves an empty line (`quote-continues…` case) | the drive's first run left a shared Backspace event with `defaultPrevented` set; fixed to a fresh event per use | Yes |
| `nativeEmojiSpans` (helper) | `discordOracle.emoji-spans.test.ts` | No: the helper was written first, then its table | Yes, by mutant | `helper-ignores-its-mask-NM-44`, `helper-first-occurrence-join`, `helper-offsets-in-unescaped-text`, `helper-keeps-spans-inside-code` all KILLED | Yes |
| `revertToText`'s caret mapping (`moved`) | `withNormalizeNode.emoji-keeps-line-text.test.tsx` (caret cases) | Yes | Yes | AssertionError: a caret on a second emoji element ends at `[0,0]` offset 4 where `[0,2]` offset 0 is the text after it (`m6-red-8.txt`; one failed, eighteen passed) | Yes (`m6-green-8.txt`, 19 of 19): the structural fix at `d652d12` drops `onElement`, which was `flat + grown` for the element's own caret and wrong for any other element's |
| `emojiLayout`'s engine-not-ready return, `liftLoaded`, `resolveEmoji`'s `layout` guard, `styleUnit` | `getInitialValue.engine-not-ready.test.ts`, `withNormalizeNode.engine-not-ready.test.tsx` | No: found by the sweep as survivors | Yes, by mutant (`if (false &&` at `emojiLift.ts:62`, `withNormalizeNode.ts:110`, `unitStyles.ts:99`, each red in an isolated export) | TypeError reading `tree` / `emojis` of `undefined` | Yes |
| the layout cache (`emojiLayout`'s `layoutCache`, limit 256) | `emojiLift.layout-cache.test.ts` | No: survivors `if (false &&`, `>=`→`>`, `256`→`257` | Yes, by those mutants | parse count 0 where 1 is expected after 256 others | Yes |
| `liftLoaded` over several runs, `holdsSpan`, `emojiElementOf`, `parseUnit`'s parity | `getInitialValue.emoji-spans-equal-the-engines.test.ts`, `emojiLift.layout.test.ts`, `withNormalizeNode.emoji-keeps-line-text.test.tsx` | No: survivors | Yes, by `walk-first` and `walk-last` at `emojiLift.ts:108`, `\|\|` at `:92` (a skin tone typed after an emoji), `startCodeBlock`/`empty` at `:76`/`:77`, `? 1`→`? 2` at `unitParse.ts:14` | AssertionErrors on literal ranges and elements | Yes |
| `resolveCarried`, `carriesMarker`, `normalizeBackspace`'s guard | `withNormalizeNode.quote-continues-on-enter.test.tsx` (the carried mark and Backspace describes, three Enter rows) | No: survivors | Yes, by the conjunct, loop-start, clear-condition, `fenceQuoted` and `created.type` mutants (the 8 of 33 and `:370`) | AssertionErrors on the saved text and on which lines hold the carried mark | Yes |
| `pointAtOffset`, `flatOffset`, `startsOf` (`withNormalizeNode.ts`), `widthOf`, `sourceWidthOf`, `holdsSpan` (`emojiLift.ts`), the emoji case's `emojiToImage` (`renderElementFactory.tsx`), `parseUnit` (`unitParse.ts`) | the six files `withNormalizeNode.emoji-keeps-line-text`, `withNormalizeNode.emoji-set-equals-the-engines`, `emojiLift.layout`, `renderElementFactory.emoji-element`, `getInitialValue.emoji-spans-equal-the-engines`, `decorator.native-box-classes` (70 cases) | No: written after the code, and each already carries mutant reds (rows above); a stub-tree red closes the "No" (QA's gate, record a5d676e) | Yes, each by a stub tree: an isolated export of `119471f` (`export-tip`, `node_modules` linked, nothing in the shared tree), the one function holding no body, the same 70 cases run | One AssertionError each, on the first case: `pointAtOffset` 6 failed of 70 (`m6-stub2-119471f-pointAtOffset.txt`); `flatOffset` 7 (`-flatOffset.txt`); `startsOf` (returns `[]`) 22 (`-startsOf.txt`); `widthOf` 7 (`-widthOf.txt`); `sourceWidthOf` 21 (`-sourceWidthOf.txt`); `holdsSpan` 25, `expected undefined to be true` (`-holdsSpan.txt`); `emojiToImage` (returns a bare `<img />`) 2, `expected [ '', '', null, null, null ] to deeply equal [ '🙂', 'slightly smiling face', …(3) ]` (`-emojiToImage.txt`); `parseUnit` (returns `undefined`) 62, `expected [ 'x🙂 abcdefghijklmnopq' ] to deeply equal [ 'x', '[🙂]', ' abcdefghijklmnopq' ]` (`-parseUnit.txt`). A first run of `startsOf` and `emojiToImage` with `undefined` and `null` bodies failed with TypeErrors; those were replaced by the wrong-value stubs above, the TypeError runs not counted | Yes, the unstubbed export: 6 files, 70 of 70 (`m6-stub2-119471f-green.txt`). `parseUnit` is also the extraction from M5's `styleUnit`; code review's both-trees measurement (0 of 36,690 nodes differ, record 8c2a4593) stands beside the stub red, not in its place |
| AC-6.6 absence | `simpleMarkdown.absent-from-product.test.ts` | Yes | Yes | three AssertionErrors (`m6-red-7.txt`) | Yes |
| AC-5.8 over inputs with elements (CR-18) | `decorator.preview-equals.test.tsx` | Yes (the floor raised first) | Yes | `expected 1436 to be greater than 2200` (`m6-red-4.txt`) | Yes |

`tdd-check.py` refuses TypeScript; rows are read by hand.

Named mutants (isolated export of `3493290`, `unshare -rn`, driver `m6-driver-mut.py`, outputs `m6-mut-3493290-<name>.txt`): 16 of 17
KILLED. Survivor `code-line-keeps-elements`: equivalent, because a code line's unit carries `startCodeBlock`; even with a second code line added as a case it survives, so the guard
was removed at `ef19961` and the tests run green. NM-17, NM-19 (the base red), NM-44, NM-68, NM-69 and QAF-40's join mutants are among
the killed. For SL-17: `\*a😄` is reddened by `helper-offsets-in-unescaped-text`, and `a\_b😄` by the same mutant.

## Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---------|---------------------|----------------------------------|--------------------------|
| CR-18 (AC-5.8 drops any input holding an element) | `git grep -c "editor === null\|return null" <ref> -- src/components/SlateEditor/utils/__tests__/decorator.preview-equals.test.tsx`, and the same class elsewhere: `git grep -n "holdsElement" <ref> -- src` | `2e36107`: 2 in the preview test; `42d4574`: 0 in it. `holdsElement` at `42d4574`: 2 hits, both in `decorator.native-box-classes.test.ts` (the declaration, the skip at its line 81) | preview test: fixed, compared 2,239 of 2,245 per surface where the floor is 2,200; the 6 differences are named by id (`BOX_READS_ELEMENT_AS_QUESTION_MARK`, `QUOTE_PREFIX_DRAWN_IN_SPAN`), each checked to differ and nothing else may. `native-box-classes`: fixed at `1aaa960`: the 12 element-holding inputs of 280 are compared, the element's source characters left out of the expected line, and a floor of 10 holds them (the mutant `element width 0` is red, `AssertionError: expected [ '**:smile:**' ] to deeply equal []`). **Residual at `9719d02`: `git grep -c "holdsElement" 9719d02 -- src` prints nothing (exit 1); the wider `holdsElement\|holdsEmoji\|BASE_RED` over `src` and `public` prints nothing.** Original count at `42d4574`: 2 |
| CR-19 (dead interactive parsers) | `git grep -c -i "interactiveParser\|interactiveBase\|interactiveWithoutLinks\|markdown\.interactive\|\.interactive\." <ref> -- src` | `2e36107`: 53; `4897f1c`: 0 | all removed with `rules.tsx`, `utils.ts` and the interactive map |
| Sweep survivor: a point on an emoji element maps to the reverting element's end (`revertToText`, `onElement`) | `git grep -n "path.length > [0-9]\|path.length === [0-9]\|\.path\.length" <ref> -- src public` | `d652d12~1`: 3 hits (`withNormalizeNode.ts` 2, `onChange.ts` 1); `119471f`: 2 (`withNormalizeNode.ts` line 146, `onChange.ts` line 16) | `withNormalizeNode.ts:146` (`flatOffset`): the depth test asks whether a point is on an element and is right; the defect was the second use in `moved`, removed. `onChange.ts:16`: not M6's file, asks the same depth question to move a selection off an element; not applicable. Residual 2, both dispositioned; the removed hit was the class member |

## Test Execution Results

| Command | Result |
|---|---|
| whole suite at `119471f` (`npx vitest run --reporter=json`) | **exit 0**; 240 files, 781 suites, **3,692 of 3,692 passed**, 0 failed, 0 pending; 2 m 19 s wall (`m6-suite-final-119471f.json`, `.txt`, `.time`). Counts by the JSON's `numTotalTests` and its `testResults` length (240 files); an `it.each` row is one case |
| `pnpm run typecheck` at `119471f` | exit 0 (both programs). The first commit of the render test (`9719d02`) carried a fixture type error in the test program, repaired before the next commit |
| convention check (`--since=2e36107`, `m6-convention-check-119471f.txt`) | 8 FAIL, all `eslint` in `SlateEditor/index.tsx` (the D-20 errors, same 8 rules and lines as at `2e36107`); **0 CANDIDATE**; 37 SKIP, none a source (generated images, JSON, a deleted patch) except the id-token basename check, which the tool does not implement: by hand over this round's test files, a grep of the ID-token class prints nothing |
| AC-6.5 time | typed-edit property file 14.6 s (its two heaviest cases 7.7 s and 6.8 s), loaded-text property file 1.9 s, 23-form file 4.6 s, each against AC-3.3's 60 s cap. Counts: loaded-text 3,040 inputs on six surfaces, of which 2,988 per surface are compared (the clean-fence ones); typed edit: more than 700 emoji tokens, 8 cases |
| AC-6.6 | `pnpm install --frozen-lockfile --ignore-scripts` in an export exits 0 (`m6-frozen-install.txt`); the lockfile diff is four removals, no pin moved. No package-manager operation since |
| AC-6.1b, a read | `git grep -n "saveMessage(" 9719d02 -- src`: four production sites, all user acts (`Navigation.tsx` lines 143 and 294, `edit/page.tsx` lines 65 and 221); the rest are tests. `git diff --numstat 2e36107..9719d02` over those two files prints nothing: M6 changes no caller |
| `native-box-classes` after CR-18's last member | 280 inputs compared, 12 hold an element (floor 10), all equal; mutant `an element's width taken as 0` is red |
| self-check sweep 1 (`mutant-gen.js --range 2e36107..42d4574`, run at `9719d02`, `m6-sweep-9719d02-s0..s5`) | 214 mutants, 150 killed, 64 survived. **Superseded**: it found the `revertToText` caret defect and the unguarded engine-not-ready, multi-run, cache, fence-parity, carried-flag and Backspace-conjunct paths below |
| self-check sweep 2 (`--range 2e36107..d652d12`, run at `d652d12`, `m6-sweep-d652d12-s0..s5`, six shards, `--no-cache`, timeout 400 s) | 208 mutants, **175 killed, 33 survived** (`withNormalizeNode` 124: 102 killed; `emojiLift` 42: 35; `onKeyDown` 15: 12; `runUnit` 17: 17; `unitParse` 4: 3; `unitStyles` 2: 2; one each in `common`, `flattenNodeText`, `getInitialValue`, `renderElementFactory`: killed) |
| the 33 survivors re-run at `223c078` (`m6-sweep-223c078-survivors`) | 8 killed (the two `onKeyDown` conjuncts, `pointAtOffset`'s `<=`, `fenceQuoted`, `resolveCarried`'s loop start and its clear condition ×2, `unitParse` parity), 25 survived |
| the one survivor the tip's last test kills | `withNormalizeNode.ts:370` (`if (created.type === 'blockQuote')` made false) is red on the new Enter row `'> a  > b'` (`'> a  \n> b'` against `'> a  \n> > b'`), run in an isolated export: **killed**. Total **184 of 208 killed, 24 survivors** |

**The 24 survivors, each with its disposition** (an equivalent is one whose mutated run passes every test of its file set; where a probe drove the path it is named):

| Mutants | Disposition |
|---|---|
| `emojiLift.ts:26` `[0]`→`[1]` | equivalent: an index in a type position, no runtime effect |
| `emojiLift.ts:109` (`if (false &&`, `\|\|`→`&&`) | equivalent: each line is rebuilt from `lines[index]`, never from `lifted`, so a second visit gives the same element; a code line as the starting line parses in its fence context and lists nothing. The four literal fence cases of `getInitialValue.emoji-spans-equal-the-engines.test.ts` pass with either mutant |
| `emojiLift.ts:112` walk-first, walk-last | equivalent: the receiver is a `Map`, which the generator's own text names as unmutated by its truncation |
| `emojiLift.ts:114` walk-first, walk-last | equivalent by input shape: `liftLoaded` is called on lines `getInitialValue` has just built, each with one span |
| `withNormalizeNode.ts:118`, `137`, `339`, `343` (`return true`→`false`), `110` (`return false`→`true`) | equivalent: the value only ends the pass early; every change is an operation that makes Slate run the normaliser again, to the same fixed point |
| `withNormalizeNode.ts:123` `i += 2` | equivalent: Slate keeps a text node on each side of an inline, so the plain children sit at even indices and the elements the loop skips at odd ones |
| `withNormalizeNode.ts:121` width `0`→`1` | equivalent: a span is at least one character and lines are one newline apart, so the next line's span never ends within the extra column |
| `withNormalizeNode.ts:152` (`if (false &&`, `-1`→`-2`) | unreachable: the last child of a line is a text node whose end is the line's width, so `findIndex` finds one. Kept as the type's fallback |
| `withNormalizeNode.ts:161` (`||`→`&&`, `if (false &&`) | not reached: with the branch off, a probe that inserts an emoji element as the first and as the last child of a fenced code line gives `['🙂ab']` and `['🙂ab😀']` all the same, because Slate's own pass has already put a text node on each side. A guard kept for an element with no text sibling; the probe was run in an isolated export and is not a committed file |
| `withNormalizeNode.ts:58` `&&`→`\|\|` | equivalent: a quote line with an empty prefix inserts `''`, a no-op, and a non-quote line holds no prefix |
| `withNormalizeNode.ts:308` `fenceQuoted` initial `false`→`true` | equivalent: every path to `insideFence` has passed the assignment on the opening line |
| `withNormalizeNode.ts:322` final `return false`→`true` | unreachable: the loop returns at `i === lineIndex` and `lineIndex` is a line of the editor |
| `withNormalizeNode.ts:363` `-1`→`-2` | equivalent: both fail `lineIndex >= 0` |
| `withNormalizeNode.ts:371` `carried: true`→`false` (the quote-line branch) | equivalent: the same normalisation pass clears the flag in every input tried (`'> a  > >'` ends with none either way) |
| `onKeyDown.ts:39` `anchor.path[0]`→`[1]` | equivalent: the next normalisation clears the flag, because the marker is gone (`resolveCarried`); the test reads the flag after that pass |

## Outstanding Items

1. **Lint, D-20.** `SlateEditor/index.tsx` still has its 8 errors; M6 added none (this file lost the `emojiParser` lines only).
2. **A reading of the plan's "one `?` each", for the planner.** The plan has the lift parse the unit with each existing element as `?`. A probe in an export showed that cannot settle: `https://x.y/a*b*c🙂` read as text has no emoji node, as `?` it is inside an address, so the lift and the re-decide fought (126 normalisation iterations, the generator input `> hello world<id:guide>⏎https://x.y/a*b*c🙂\[x\[` typed). The lift therefore writes each element as its source text when it parses a unit (`unitAround(…, 'source')`), so the editor's elements equal a fresh load by construction. The decorator keeps `?`, as D-15 says. Where the two differ is AC-5.8's named class `BOX_READS_ELEMENT_AS_QUESTION_MARK` (3 inputs).
3. **Named differences of AC-5.8 (6 inputs per surface at most, by id in the test):** `link:61`, `gen:870`, `gen:1677` (a bare address beside an emoji, the box's `?`); `gen:709`, `gen:1113`, `gen:1368` (a quote line's `> ` drawn as text inside an open span).
4. **Fence-parity inputs are outside AC-6.5's loaded-text property** (`hasCleanFences`): an unclosed fence, or one not at a line start, is a code line to the Slate layer and plain text to the engine. This is X-19, M5's stated limit. **Per surface, of 3,040 inputs, 52 are outside the property and 2,988 are compared; of the 52, the lifted spans differ from the frozen engine spans in** 7 on `content`, 7 on `embedDescription`, 7 on `fieldValue`, 7 on `v2Text`, 3 on `embedTitle` and 11 on `embedTitleWithUrl` (counted by a probe in an isolated export of `9719d02`'s sources, which is the tip's for these files; the probe is not a committed file). The planner asked for these counts to be stated here (R-74 message); code review and QA read the narrowing at M6.
5. **Unused dependency:** `emoji-regex` has no importer now. Left in `package.json`; removing it moves the lockfile beyond AC-6.6.
6. **CR-17** (`visibleForm.ts`'s dead inline-code arm) not taken: M6 does not touch that file.
7. **Behaviour M6 changes outside the service's own source:** the stored text of a message is unchanged character for character (D-10); what changes is what the editor writes for an emoji it used to save as `:name:`. The plan's re-derivation gate: M7 is `PREMISE-STALE` until re-argued when M6 ships.
8. **A defect of M6's own code found by the sweep, not by the tests.** `revertToText`'s caret mapping treated any point on an emoji element as a point on the element being reverted, so a caret on a second element moved to the first element's end. The row-by-row tests I wrote beforehand named a caret on the reverting element only. The method fault: I wrote the normaliser's tests for the cases I had in mind and left the caret mapping to the end-to-end property tests, which carry no selection. Fixed at `d652d12`; the sweep's 33 survivors then led to nine further tests (TDD Compliance). 
9. **Self-diagnosis (method).** I removed an unreachable guard only after a case drove its path and the mutant survived; I wrote the normaliser's tests after its code (the stub-tree reds are now recorded in TDD Compliance); I truncated `withNormalizeNode.ts` with a script that cut from a function to the end of the file, found by a test, and recorded the repair in the commit. The lesson: replace a span of a file only by two anchors, never from one to the end.

## Fix Round 1 (CR-20, AC-6.8 of plan Revision 20; QAF-50, QAF-46; AC-3.3's cap)

Date 2026-11-24 (UTC). Plan Revision 20 (critic `1c6ee275`, architect `81d964c3`, QA `0dca93e`; release at R-86, hand-off release at R-88; the count bound's removal at R-90 and `bc96c93b`). Chain branch `chain/019-slate-formatting-discord-engine`. Website commits: `daad7fa` (the count test, red at `119471f`), `ebb757e` (the fix and the timed bench), `7cea6a9` (QAF-50, QAF-46, the generator count), `10abfa9` (`resolveEmoji` returns nothing), `acd9df8` and its revert `42128cd` (a neighbour step, tried and reverted below). Hand-off tip `42128cd`; its tree is identical to `10abfa9` (`git diff --quiet 10abfa9 42128cd` exits 0), so every record named `10abfa9` below is a record of the tip.

### What changed

- `withNormalizeNode.ts`: `handleEditor` no longer loops over every line calling `resolveEmoji` (each call rebuilt the line's run unit: 2,048 builds a keystroke at 2,048 lines). `resolveEmoji` builds the changed line's unit once and settles every line that shares that unit; for a code line it settles only that line, because a code line's unit reaches into the runs beside it and those lines' own units differ. The old per-line body is `resolveLine`, unchanged, taking the unit and layout as arguments. Nothing else in `src` moved.
- Tests: `withNormalizeNode.keystroke-run-unit-builds.test.tsx` and `__tests__/helpers/keystrokes.ts` (the count); `withNormalizeNode.keystroke-time.bench.ts` (the timed limb, under `__tests__/` as SL-20 fixes); one case in `withNormalizeNode.quote-and-fence-lines-settle.test.tsx` (QAF-50); one member in `discordOracle.emoji-spans.test.ts` (QAF-46); the generator count in `roundTripInputs.ts` and the two files that read it (the cap).

**Files modified** (`git diff --numstat 119471f 42128cd`): `src/components/SlateEditor/utils/withNormalizeNode.ts` (+18 −8: `resolveLine` extracted, `resolveEmoji` per unit, the `handleEditor` loop removed); `…/utils/__tests__/withNormalizeNode.quote-and-fence-lines-settle.test.tsx` (+9: QAF-50); `src/utils/markdown/__tests__/discordOracle.emoji-spans.test.ts` (+1: QAF-46); `…/__tests__/helpers/roundTripInputs.ts` (+3 −1: `MOUNTED_GENERATOR_COUNT`); `…/__tests__/SlateEditor.typed-generated-text-reaches-the-message.test.tsx` and `…pasted-text-reaches-the-message.test.tsx` (+2 −2 each: the count in the title).

**Files created:** `src/components/SlateEditor/__tests__/helpers/keystrokes.ts` (+89: the keystroke class, the residue filter); `…/utils/__tests__/withNormalizeNode.keystroke-run-unit-builds.test.tsx` (+106: the count); `…/utils/__tests__/withNormalizeNode.keystroke-time.bench.ts` (+79: the timed limb). Record: `verification/019/impl/m6-fix-*`.

### Entry Conditions (Fix Round 1)

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | planner-019's message "CR-20's fix round is released" after all three gates passed Revision 19 (R-86); the hand-off released by Revision 20's three gates (R-88). Steering's ruling that CR-20 is fixed before release: block 2026-11-24T07:05Z (record `3ec39942`) | n/a |
| QA Phase 1 covers the milestone | `qa/019-…-qa.md`, re-key on Revision 20 (`0dca93e`) | n/a |
| Open questions | none | n/a |
| Premise | M6 not `PREMISE-STALE` | n/a |
| Cap | lifted for CR-20 alone (D-23); QAF-50 is a severity floor and QAF-46 was sent to this round at R-90 | `withNormalizeNode.quote-and-fence-lines-settle.test.tsx`, `discordOracle.emoji-spans.test.ts` |
| AC-6.8 count limb, size equality | the count for each kind and place is equal at 200 and 2,048 lines (200 and 1,000 for `a🙂`, 200 and 1,364 for fenced blocks, 200 and 2,048 for the fenced-quote text) and at least 1; the positive control counts at least 1 | `…keystroke-run-unit-builds.test.tsx` |
| The corpus and generator bound | removed by steering (block 07:42Z, record `bc96c93b`); not relaxed to 8 | n/a |
| SL-19 | a keystroke that leaves two changed run units: `a⏎```⏎xy⏎```⏎b`, Enter after `x`, was exhibited by QA (P-Q23). In this tree it dirties two code lines and each is settled by its own call; the fixture is not in the count test because every size-equality case needs a long text. The count limb holds the many-unit text (`a⏎```⏎x⏎```⏎` repeated) and the fenced-block text, whose keystrokes include Enter in a code line, at both sizes | `…keystroke-run-unit-builds.test.tsx` ("fenced blocks of three lines between plain lines") |
| SL-22, SL-23 (the residue) | the test keeps a keystroke only when no other line's type, `startCodeBlock`, `lang` or emoji elements change (`leavesOtherLinesAlone`). On the fenced-quote text it left out none of the eight kinds-and-places on `> x` at line 101 (see Observations); a forward delete at the end of `> x` joins the closing fence onto the line and the lines below keep their types and fence state | `keystrokes.ts`, `m6-fix-fenced-quote-delete.txt` |
| SL-24, CF-29 | the 2,048-line fenced-quote size (10,239 characters) is past the field limit and is kept for growth only, said in the test's `describe` name; the bench does not run it | `…keystroke-run-unit-builds.test.tsx` |
| SL-20 | the bench lives under `__tests__/`, not beside the code, so `tsconfig.json` does not type-check it into production | `tsconfig.test.json` includes it; `pnpm run typecheck` exit 0 |
| The two instruments of the unit-build class | the text predicate and a reference query (below) | `m6-fix-unitAround-references.txt` |

### Flows (user-visible work)

None. This round changes how many times the normaliser builds a run unit; the saved text and the editor's document after a keystroke are what they were (the differential below, with its one stated family of differences). No user-visible surface is touched, so no question goes to the owner. B-10 (QA's register) is the human-observable form, UAT's.

### Patterns Extended

| Surface | Pattern | Rung |
|---|---|---|
| `resolveEmoji` builds one unit per call | the decorator shares one unit across a unit's lines for a pass (`decorator.tsx`, `pass.units`), and `liftLoaded` builds a unit once and marks its lines done (`emojiLift.ts`, `done`) | in-repo, read by real call sites |
| the count instrument | `decorator.one-parse-per-unit.test.ts`: a `vi.mock` pass-through of the counted function, `mockClear` before the act | in-repo |
| the bench | none exists in this repository (`git ls-files | grep -c bench` before this round: 0); `vitest bench` with the same projects; the file name keeps it out of `pnpm test`'s include | none; named so, SL-20 |
| the keystroke helper | `withNormalizeNode.emoji-set-equals-the-engines.test.tsx` `pointAt` is a document-offset point finder; `keystrokes.ts` needs a line-and-place point, so it is its own helper, used by the count test and the bench (two callers) | in-repo, extended, not copied |

### TDD Compliance (Fix Round 1)

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `resolveEmoji`, one unit build per call (CR-20) | `withNormalizeNode.keystroke-run-unit-builds.test.tsx` | Yes (`daad7fa`, before `ebb757e`) | Yes, against `119471f` in an isolated export (`export-tip`, source blob-identical to the commit) | AssertionError, 52 of 54 failed, 2 passed (the positive control and the sample floor): `expected 2048 to be 200`, `expected 1364 to be 200`, `expected 4104 to be 408`, and the fenced-quote cases (`m6-fix-red-count-119471f.txt`). An earlier red, with the two corpus-bound cases steering later removed: 46 of 48 (`m6-fix-red-count-corpus-bound-119471f.txt`) | Yes, 54 of 54 (`m6-fix-green-count.txt`) |
| `resolveLine` (the old per-line body, extracted) | the same file, with `withNormalizeNode.emoji-keeps-line-text`, `…emoji-set-equals-the-engines` | Yes (existing cases) | Yes, stub tree: an export of `10abfa9` whose `resolveLine` body is `return false`, the same three files | AssertionError, 25 of 85 failed: `expected [ 'x🙂 abcdefghijklmnopq' ] to deeply equal [ 'x', '[🙂]', ' abcdefghijklmnopq' ]` (`m6-fix-stub-resolveLine.txt`); the unstubbed export 85 of 85 (`m6-fix-stub-resolveLine-green.txt`) | Yes |
| AC-6.8's timed limb | `withNormalizeNode.keystroke-time.bench.ts` | Yes, the file was written before the fix | Yes, in the shape a bench has: at `119471f` the 50-keystroke medians are 16.9, 66.9, 419.4 and 1,751.3 ms at 200, 400, 1,000 and 2,048 plain lines against the 16 ms bound (`m6-fix-bench-tip.txt`, the file with its assertion removed because the committed assertion stops the run at the first miss); the committed file at `119471f` printed 65.8 ms for 400 lines and hung at its teardown until a 280 s timeout, so its own assertion output was not captured (`m6-fix-bench-red-119471f.txt`) | AssertionError on the median, at the tree under test | Yes, exit 0, every median at most 9.6 ms (`m6-fix-bench-fix.txt`) |
| QAF-50: a single-line box keeps a typed `> a` and `>>> a` plain | `withNormalizeNode.quote-and-fence-lines-settle.test.tsx` (tightened: the file already covers the line types of a loaded single-line box) | Yes | Yes, against QA's W12 (the `if (!partialMarkdown)` guard removed) in an isolated export | AssertionError, 2 failed: `expected [ '> a', [ 'blockQuote' ] ] to deeply equal [ '> a', [ 'div' ] ]` and the `>>> a` form (`m6-fix-partial-typed-quote-W12.txt`); a third member, `` ```js ``, passed under W12 and was removed as a never-red case | Yes (`m6-fix-partial-typed-quote-green.txt`) |
| QAF-46: an emoji newer than the table | `discordOracle.emoji-spans.test.ts` (a member of `ALONE`: 8 cases) | Yes | Yes, against a mutation of the oracle helper that drops spans whose first code point is at least U+1FA70, in an isolated export | AssertionError, 2 failed: `expected [] to deeply equal [ [ +0, 2 ] ]` and `[ [ 2, 4 ] ]` (`m6-fix-oracle-newer-emoji-mutant.txt`). The other six cases hold `[]` and cannot fail under it | Yes, 121 of 121 (`m6-fix-oracle-newer-emoji-green.txt`) |
| the generator count (AC-3.3's cap) | `SlateEditor.typed-generated-…`, `SlateEditor.pasted-…` | n/a: a count of an input class, not behaviour | Measured: whole offline suite 128.0 s before, 64.4 s after | n/a | Yes, 3,715 of 3,715 |

`tdd-check.py` takes Python only and refuses these sources, so the rows are read. The helper `keystrokes.ts` has no test of its own: the count test's positive control (a character typed in a one-line message counts at least 1) fails if `press` or `caretAt` does nothing, and the residue filter's effect is read in Observations.

### Class Sweep (Fix Round 1)

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| CR-20: a per-line caller rebuilds a run unit on every keystroke | `git grep -n "unitAround" <ref> -- src public ':!*__tests__*'` | `119471f`: 7 hits: `decorator.tsx:6` (import), `decorator.tsx:81`, `emojiLift.ts:3` (import), `emojiLift.ts:110`, `runUnit.ts:11` (definition), `withNormalizeNode.ts:13` (import), `withNormalizeNode.ts:108`. `10abfa9`: 7 hits, `withNormalizeNode.ts:146` for the last. Residual 7 (the call site moved) | `decorator.tsx:81`: builds a unit once per pass and shares it across the unit's lines (`pass.units.set` for each key); not a member. `emojiLift.ts:110`: `liftLoaded` skips lines in `done`; one build per unit; not a member. `withNormalizeNode.ts:146` (was 108): the one member; now one build per call. Definition and imports: not applicable |
| the same class, by a reference query | a script over the TypeScript language service, `findReferences` at `runUnit.ts` `unitAround` (`m6-fix-unitAround-references.cjs.txt`; the box has no `typescript-language-server`, so `LSP` answered "Executable not found") | `m6-fix-unitAround-references.txt`: 1 definition and 6 references, the same 3 call sites as the text predicate | the text predicate and the reference query agree; nothing the predicate missed |
| a loop over every line at keystroke time | `git grep -n "for (let [a-z] = 0; [a-z] < editor.children.length\|editor.children.forEach\|editor.children.map" <ref> -- src public ':!*__tests__*'` | `119471f`: 2 hits, `withNormalizeNode.ts:89` (the `resolveEmoji` loop) and `:326` (`resolveCarried`). `10abfa9`: 1 hit, `:336` (`resolveCarried`). Residual 1 | `:89`: removed, the fix. `:336`: a flag scan over the lines with no unit build, present at the base; the bench (3.1 ms at 1,000 lines, 6.4 ms at 2,048) covers it; not a member |
| a gap my own negative control exposed: a line whose emoji decision depends on an edited line's text but that is not itself dirty (found by the differential below) | the typed-edit differential: for each of 3,000 inputs, each line, 3 places, 12 keystrokes, the hash of the document and selection at `119471f` and at the tree (`m6-fix-crprobe.keystroke-document.test.tsx.txt`), compared as dictionaries (`m6-fix-diff-compare.txt`) | `10abfa9`: 161,136 keystrokes, 3 differ: `gen:151`, `gen:429`, `gen:901`, each `\` typed at the start of line 0, which is the opening fence line | see Outstanding 1: all three are the unclosed-fence family (X-19, QAF-48), a line the Slate layer types `codeBlock` and the engine reads as plain text; at `119471f` the line below a fence whose first backtick is escaped gets its emoji lifted; with the fix it keeps them as text until the next forced normalise. A neighbour step that removes the difference (`acd9df8`: 0 of 161,136 differ) was written, swept (12 of 22 mutants survived, mostly in the new code) and reverted (`42128cd`) |
| the `rm` safety check | n/a (a gate satisfaction, below) | n/a | disclosed there |

### Test Execution Results (Fix Round 1)

| Command | Result | Compilation, lint, compatibility | Capture |
|---|---|---|---|
| `unshare -rn sh -c "ip link set lo up && /usr/bin/time … npx vitest run --project node --project dom --reporter=json"` at the tree (`10abfa9`), the committed generator count of 400 | 3,715 of 3,715 passed, 235 files, **exit 0**, **64.4 s** wall, box load 2.4 at the start and 9.1 at the end (other sessions) | n/a | `m6-fix-suite-10abfa9.{json,txt,time,load}` |
| the same at `7cea6a9` | 3,715 of 3,715, exit 0, 62.6 s, load 1.5 to 9.0 | | `m6-fix-suite-n400.*` |
| the same without `unshare`, generator count 1,000, the fix | 3,715 of 3,715, exit 0, 128.0 s, load 1.7 to 5.7 | | `m6-fix-suite.*` |
| `pnpm run typecheck` | exit 0 | both `tsc` programs | `m6-fix-typecheck-10abfa9.txt` |
| `eslint --max-warnings=0` over the 7 files this round touched | clean. The 9 problems `eslint src/components/SlateEditor` still prints are `index.tsx` (D-20's 8 errors) and `onChange.ts` (1 warning), neither touched here | | n/a (command output only) |
| `node ~/.claude/tools/convention-check.js … --since=119471f` | 0 FAIL, 0 CANDIDATE, 18 SKIP: 17 are `.playwright-mcp/*.png` (another session's captures) and one is the id-token basename check, which the tool names as not run: "CLAUDE.md states an ID-token class this checker does not implement verbatim". I read my own basenames and titles by hand: `keystroke-run-unit-builds`, `keystroke-time`, `keystrokes`; no ID token | | `m6-fix-convention-check-10abfa9.txt` |
| `vitest run` of the count test, the fix | 54 of 54, exit 0 | | `m6-fix-green-count.txt` |
| `vitest bench --run --project dom` of the bench, the fix, box load 0.96 to 1.04 | exit 0 | | `m6-fix-bench-fix.{txt,time,load}` |

AC-3.3's cap (steering block 2026-11-24T08:17Z, record `9c5a0a04`, QA's instrument: the whole offline suite, `/usr/bin/time`, against the chain base `af3d95a`'s 31.1 s, under 60 s added, so 91.1 s):
- Before: the whole suite took 128.0 s at the fix with 1,000 generator inputs; the typed-generated file alone, run one tree after another at load 2 to 4.6, took **29.6 s at the base `2e36107`, 99.5 s at `119471f` and 96.9 s at the fix** (`m6-fix-typedgen-{base,tip,fix}.*`). The fix saved 2.6 s there: the cost is the number of inputs typed. At the base `mountedInputs('generator')` dropped every emoji-holding input and the held-out list, which left 354 inputs (16,000 characters) in the full-markdown run and 226 (7,179) in the single-line run; M6 deleted both filters, which gives 1,000 (73,249) and 390 (13,670), 3.7 times the characters. The per-character cost did not move: 1.19 ms at the fix, 1.21 ms at the base over 200 inputs, and 1.03 ms with the lift switched off.
- After: the typed and the pasted generator limbs run the first **400** inputs (`MOUNTED_GENERATOR_COUNT`). The whole suite under `unshare` takes 64.4 s: **33.3 s above the base's 31.1 s, 26.7 s under the 91.1 s line, 29 % of the line**; the longest file is the typed-generated one at 60.0 s. The margin held while box load rose from 2.4 to 9.1 during the run. 400 is not the largest count the line allows (about 600 would meet it with no margin); it leaves the margin.
- The full 1,000: **`test:discord` does not hold it**, which the ruling assumed ("the full count stays in test:discord"). `git ls-files | grep "__tests__/discord"` lists no typed-generated file, and `discordOffline.whole-command.test.ts` runs the whole discord command inside `pnpm test` in a loopback-only namespace and asserts the output holds no "N passed", so a file that passes there would break it and add its minutes to `pnpm test`. The count is an environment knob instead: `MOUNTED_GENERATOR_COUNT=1000 npx vitest run --project dom src/components/SlateEditor/__tests__/SlateEditor.typed-generated-text-reaches-the-message.test.tsx` runs 1,000 (2 of 2 passed, 103.6 s, `m6-fix-typedgen-full-count-env.txt`). The 1,000 also passed in the 128.0 s whole-suite run above. A home for the full count in `test:discord` is the planner's to place.
- AC-6.5's typed emoji edits share the cap: `withNormalizeNode.emoji-set-equals-the-engines.test.tsx` took 13.5 s in the 128.0 s run and 14.0 s in the 64.4 s run; the count test takes 4.1 s.

### Observations (AC-6.8's records)

**What the count reads.** The count test counts calls to `unitAround` through a `vi.mock` pass-through of `../runUnit`, from `mockClear()` immediately before `press(...)` to the return of `press`. Slate flushes normalisation synchronously inside `apply`, so that window is every `Editor.normalize` drain the keystroke runs (Revision 19's window). There is no pass boundary inside it; a "pass" in the critic's sense (F-47) is not separated.

**Entries and builds per kind** (`m6-fix-observations-10abfa9.txt`; the one keystroke at the middle line; `normalizeNode` entries are an observation, with no assertion on them). Builds are the same at 200 and 2,048 lines:

| Text | Kind and place | `normalizeNode` entries | Builds |
|---|---|---|---|
| plain | insert at start or end | 3 | 1 |
| plain | backspace at start / end | 2 / 4 | 1 |
| plain | delete at start / end | 4 / 2 | 1 |
| plain | Enter at start or end | 6 | 2 |
| `> ` quote | insert, backspace, delete | 2 to 3 | 1 |
| `> ` quote | Enter at start / end | 15 / 14 | 6 / 5 |
| `a🙂` | insert, backspace, delete | 2 to 3 | 1 |
| `a🙂` | Enter | 5 to 6 | 2 |

Enter on a quote line takes 14 to 15 entries because the new line takes `splitCarrying`'s marker write and `handleEditor` retypes it between plain and quote more than once; each entry that reaches the resolve builds once. That is the base's own normaliser traffic. It is the reason the corpus bound of 4 failed, and the per-kind distribution over the 272 corpus and 1,000 generator inputs is in `m6-fix-builds-per-kind-distribution.txt`: 26,688 keystrokes, builds 0 to 8, 430 above 4, maximum 8 (Enter). At `119471f` the same population has 5,746 above 4, 459 above 8 and a maximum of 18 (`m6-fix-red-count-corpus-bound-119471f.txt`). Revision 20 removed the bound.

**The fenced-quote text and the residue.** `> x` at line 101 of the 200-line and the 2,048-line fenced-quote texts: all eight kinds and places (insert, backspace, delete and Enter at start and end) pass the filter, so **none was left out**. The critic's reading (F-50) that a forward delete at the end of `> x` flips the fences below did not hold: after it the text is `["> ```", "> x```", "> y", "> ```", …]`, the joined line still closes the fence, and every later line keeps its type and `startCodeBlock` (`m6-fix-fenced-quote-delete.txt`). The filter compares type, `startCodeBlock`, `lang` and emoji sources.

**SL-22's residue keystroke.** "A character typed in front of `>>>`": the marker is the line's `quotePrefix`, not text, so offset 0 of line 0 is after it. `x` typed there (the `>>>` text, line 0, start): 3 entries, 1 build, median of five 0.8 ms at 200 lines and 6.5 ms at 2,048. The keystroke that does retype the lines below is QAF-45's, `>` typed at the start of `>> a` (it makes `>>> a`): at 40 lines it settles; at 200 lines it **throws Slate's "Could not completely normalize the editor after 126 iterations"**, at `119471f` and at the fix alike, on both the `content` and `embedDescription` surfaces (`m6-fix-gt-marker-probe.txt`, `.test.tsx.txt`). Outstanding 2.

**Timed limb** (the fix, box load 0.96 to 1.04; medians over 50 keystrokes, 95th percentile in brackets; `m6-fix-bench-fix.txt`):

| Text, lines | 200 | 400 | 1,000 | 2,048 |
|---|---|---|---|---|
| plain | 1.4 (5.7) | 1.5 (4.7) | 3.1 (10.1) | 6.4 (20.6) |
| `> ` quote | 1.2 (15.7) | 1.5 (20.5) | 3.3 (44.4) | 6.2 (84.7) |
| `>>> ` | 0.9 (2.5) | 1.3 (4.0) | 2.9 (11.4) | 5.7 (21.9) |
| `a🙂`, 1,000 lines | | | 9.6 (28.8) | |
| fenced blocks, 1,364 lines | | | | 2.3 (3.3) |

The tip at `119471f`, same bench with its assertion removed, load 2.3 (`m6-fix-bench-tip.txt`): plain 16.9, 66.9, 419.4, 1,751.3 ms; `> ` quote 19.3, 72.6, 460.2, 1,865.7; `>>> ` 17.9, 67.5, 431.8, 1,775.3; `a🙂` 1,000 lines 1,042.1; fenced blocks 7.5. Every fixed median is at most 9.6 ms against 16. The `a🙂` text is the tight one: at box load about 15, during the first bench run of this round, it read **17.8 ms**; that file was overwritten and is not kept, which I state rather than quote from memory as a record. At load 1 it reads 9.6 to 10.5 ms in three runs (12.4 to 13.4 ms in three isolated runs of that text alone at load about 2.1). The criterion is a quiet-box median, and the planner's message says recording the load beside each run is right and asks for the figures if it reads over 16 ms again at a low load; it has not. The cost of that text is the engine's parse of its 4 K characters, about 12 ms, paid once per keystroke whose text is not in the layout cache; it is not the per-line work this round removed.

**Two figures the plan did not ask for.** A single `Enter` on a 2,048-line plain text builds 2 units against 1 for an insert: the second is the new line's own entry. The bench's 95th percentiles for the quote texts (up to 84.7 ms) come from Enter and merge keystrokes, whose entries are 5 to 15 per keystroke on quote lines.

### Self-check sweep over this round's diff

`mutant-gen.js --repo … --range 119471f..10abfa9` wrote 5 operator mutants (only the added lines are mutated: `withNormalizeNode.ts` lines 146 to 151); I added three by hand. `mutation-run.py` in an isolated export of `10abfa9` with `node_modules` bound read-only, timeout 400 s, one shard, the suite command `npx vitest run --project node --project dom` plus nine named files per mutant, control passing (`m6-fix-sweep-10abfa9/`, `.log.txt`, `.time`; mutants `m6-fix-mutants-10abfa9.json`, blob `5f1d6ea0…`): **7 of 8 killed**, 0 stillborn.

| Mutant | Result | Disposition |
|---|---|---|
| `if (!layout) return;` mutated two ways (`if (false && …)`, `!` removed) | killed (2 of the 5 operator mutants) | |
| `line.type === 'codeBlock'` flipped | killed | |
| the `.some` over the unit's lines truncated, two forms | killed (2 of the 5) | |
| `return false` flipped to `true` on a missing layout | not generated at `10abfa9`: at `7cea6a9` it was generated and SURVIVED (`m6-fix-sweep-7cea6a9.log.txt`) because no caller read `resolveEmoji`'s result, so it was equivalent; `10abfa9` makes `resolveEmoji` return nothing, which removes the mutant instead of excusing it | |
| hand `loop-back` (the `119471f` form: every line, each with its own `resolveEmoji`), QA's NM-71 | **killed**, 287.9 s (the per-line rebuild makes that run slow) | |
| hand `edited-line-only` (settle only the edited line) | killed (the existing `a`🙂\nb` cases) | |
| hand `code-line-shares` (a code line settles its whole unit) | **SURVIVED** | equivalent over every probe: the same document and selection after 161,136 keystrokes (`m6-fix-diff-codelineshares-mutant.txt.gz` against the tree's file); I could not find a fixture whose result differs (six candidate texts with a code line beside a run holding an emoji, each typed into at every line: all equal). The guard is kept: it states that a code line's unit holds lines whose own units differ, and it keeps a code-line keystroke from resolving them with another unit's layout |

**QA's named mutants for the fix round** (QA `Named mutants`, Re-key on Revision 16 and 17): NM-70 (a unit cache keyed on the line index): unplaced, this fix builds no cache. NM-71 (the per-line resolve back): placed as `hand:loop-back`, killed by the count test. NM-72 (a resolve on the first changed unit only): unplaced as written, because nothing chooses among changed units: each changed line gets its own `handleElement` call and its own `resolveEmoji`. QA's Phase 1 expects NM-72 to survive on the code-line Enter fixture and to be equivalent; I did not place a stand-in, so there is nothing to report as killed or surviving.

A neighbour step (`acd9df8`, reverted at `42128cd`): its sweep killed 10 of 22 (`m6-fix-sweep-acd9df8.log.txt`). Its survivors were in the new bounds and the `isCode` branches, whose effects overlap each other, which is the sign of code with no fixture of its own beyond the one the step was written for. Reverting it removes the code, not the finding (Outstanding 1).

### Gate satisfactions disclosed in the round

- **Comment gate.** `comment-gate` rejected three comment lines in the first draft of `keystrokes.ts` and one `eslint-disable` line in the bench; each was removed, not relocated (the rationale is in this document and in the tests' names).
- **Built-in `rm` check.** One command ending in `rm $S/$d/…/zz-bs.test.tsx` (variables in the target) was blocked and did not run; I re-issued it with literal absolute paths, the form the message names. The target was my own probe file inside a scratch export. The check was not aimed at that.
- **A wrong-form command of mine.** `pkill -f "until grep -q"` matched its own command line and killed the run I had just started; I started the run again without it. Nothing else was killed.
- **A stray stage.** `git add src/utils` (a plain `add`, against the workspace rule) staged one of my own files before its commit; it was committed by `git commit --only` in `7cea6a9`, and no other session's work was staged or committed.

### Outstanding Items (Fix Round 1)

1. **Typing `\` in front of a fence line, in an unclosed-fence input, leaves the line below with text where `119471f` had an emoji element** (3 of 161,136 probed keystrokes: `gen:151`, `gen:429`, `gen:901`, line 0, start). The line is one the Slate layer types `codeBlock` and the engine reads as plain text (X-19, QAF-48), outside AC-6.5's loaded-text property by `hasCleanFences`. Cause: the line below is not dirty, so no `handleElement` settles it, and its unit includes the edited line above. A forced normalise then lifts the emoji, so the document is not a fixed point of `normalize` in that corner. Repro: `"```ts\n``a 🙂\n```"`, type `\` at the start of line 0 (`m6-fix-fence-backslash-red-no-neighbours.txt`). Options for the planner and code review: leave it as stated residue (the plan's own wording: "a line it did not edit changes its emoji elements … held by AC-6.5", which excludes unclean fences); or ask for the neighbour step (`acd9df8`, 0 of 161,136 differ, builds at most 3 for a run beside fences, equal at both sizes), written once more with fixtures for its bounds before it is kept. My choice was the first, because the step's mutation score was 10 of 22 and the family is outside every criterion. Severity LOW (the saved text is unchanged; the editor shows an emoji as text until the next full normalise).
2. **Slate's normalise-iteration cap is hit by `>` typed to make `>>> ` at the start of a 200-line message** (200 lines throws, 40 settles; at `119471f` and at the fix). Not a CR-20 member and not changed by it. A thrown error inside the editor's input handler; QAF-45's keystroke. Severity MEDIUM, as an unprobed browser effect: I did not reproduce it in a browser. Follow-up for the planner.
3. **The full 1,000 generator inputs have no home in `test:discord`** (see the cap section). The knob keeps them runnable; a home is a plan decision.
4. **AC-3.3's cap rests on QA's instrument and the box's load.** The 64.4 s run had its box load rise from 2.4 to 9.1 while it ran. QA re-measures.
5. **The first differential result I reported to myself was wrong.** I recorded "0 differences" from a first run, deleted that output file when I tidied, and found 3 differences on the re-run; I could not reproduce the zero. The numbers above are from `m6-fix-diff-compare.txt`, where the comparison is made in Python over the dictionaries, and the tip's rerun differs from the tip's first run in 0 of 161,136, so the instrument is deterministic. The earlier zero is withdrawn, not carried.
6. **Self-diagnosis (method).** I took a differential's zero from `diff | grep -c` without checking the instrument against a known difference first, and then removed its output; a control (the 3 known cases, or a planted difference) before the first reading would have caught it at once. I also wrote the neighbour step before it had a test of its own, and the sweep showed it. The residue and the cap were each found by measuring, not by reading: the corpus bound's basis (3 entries by the critic's probe) was a probe of plain slate, and this editor's own retyping gives up to 15 entries on a quote line.
7. **Behaviour this round changes outside the service's source:** none; the saved text is unchanged. No downstream milestone's premise expires beyond M6's stored-form note above (M7).
8. **Not taken:** QAF-47 and QAF-49 (their own handoffs), CR-21 (`emoji-regex`, unchanged), QAF-48 (stated limit).

### Next Steps (Fix Round 1)

`code-reviewer-019` reads `42128cd` against `119471f`, in order of risk: `withNormalizeNode.ts` (`resolveEmoji`, `resolveLine`), the count test and `keystrokes.ts` (the filter), the bench, the generator count change. Then QA Phase 2 on the fix tip: the count limb, the timed limb (`m6-fix-bench-fix.txt` is the implementer's, not a verdict), the cap, QAF-50's W12 and QAF-46's mutant. UAT's B-10 is the human-observable form.

## Next Steps (first delivery, `119471f`)

Code review of M6 at `119471f`, in order of risk: `withNormalizeNode.ts` (`resolveEmoji`, `revertToText`, the carry), `emojiLift.ts`, the `simple-markdown` removal; it reads 8cb4d83, c3af0ac and f58a816 as a first review (they were in the tree at M5's Fix Round 1). Then QA Phase 2: it re-runs m5-d2 against `runUnit.ts` and reads NM-68 and NM-69 on the QAF-42 fixture forms. The planner confirmed the source-text reading (R-74, no revision); the seam fold names it in AC-6.5.

## Resumption State

Written 2026-11-24 after Fix Round 1's hand-off to code review.

- **Done.** M6 first delivery `119471f` (code review Round 6 approved with comments, record `8c2a4593`; QA Phase 2 at `119471f` failed, record `4da9b76b`). Fix Round 1 committed on the chain branch at `42128cd` (tree identical to `10abfa9`): CR-20 and AC-6.8, QAF-50, QAF-46, the generator count fit. This document is current at that commit; the evidence is in `verification/019/impl/m6-fix-*`.
- **Next, and its start condition.** Nothing of mine is in flight. Code review of `42128cd` (code-reviewer-019) is next; any finding goes to a fix round of its own.
- **Open items for others.** Outstanding 1 (the unclosed-fence family: leave it as residue, or ask for the neighbour step), Outstanding 2 (Slate's iteration cap on `>` typed to make `>>> ` at 200 lines, pre-existing), Outstanding 3 (the full 1,000 generator inputs have no home in `test:discord`).
- **Local state not restored.** Scratchpad exports only (`export-tip`, `export-base`, `export-stub`, `export-fix`, `export-7cea6a9`, probe files): nothing in the shared tree, nothing to restore. No process of mine is running. `git status` in the website tree lists only the foreign `?? .playwright-mcp/`.
- **Evidence run but not recorded.** The first bench run of the `a🙂` text at box load about 15 (17.8 ms) was overwritten; it is named in the Observations as an unrecorded reading.
- **Questions sent.** Answered by action or message: the corpus bound (revision 20), the AC-3.3 cap (block 08:17Z), QAF-50 and QAF-46 (planner). None open.
- **Cache-warm wake.** Armed at the start of this session for 08:03Z; re-arm when it fires.
