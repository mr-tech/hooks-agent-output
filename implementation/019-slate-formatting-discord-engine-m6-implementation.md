---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M6 is built on chain/019-slate-formatting-discord-engine through website 119471f and handed to code review there. M5 Fix Round 1 was
  approved with comments (79f96321) and M5 is QA Complete (e668730b). Self-check sweep: 184 of 208 mutants killed, 24 survivors
  dispositioned (Test Execution Results); the sweep found one defect in M6's own code, fixed at d652d12 (Class Sweep). Plan Revision 15
  with R-74 (source text for the lift, `?` for the decorator, accepted by the planner).
Handoff-At: 119471f — repos=website — M6 handed to code review; whole suite 3,692 of 3,692, exit 0
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

## Next Steps

Code review of M6 at `119471f`, in order of risk: `withNormalizeNode.ts` (`resolveEmoji`, `revertToText`, the carry), `emojiLift.ts`, the `simple-markdown` removal; it reads 8cb4d83, c3af0ac and f58a816 as a first review (they were in the tree at M5's Fix Round 1). Then QA Phase 2: it re-runs m5-d2 against `runUnit.ts` and reads NM-68 and NM-69 on the QAF-42 fixture forms. The planner confirmed the source-text reading (R-74, no revision); the seam fold names it in AC-6.5.

## Resumption State

Written 2026-11-24T07:10Z at steering's request (`/checkpoint`), at about 277K tokens.

- **Done.** M6 is committed on `chain/019-slate-formatting-discord-engine`; website HEAD is `119471f` and no source has moved since the hand-off. Code review Round 6 is APPROVED_WITH_COMMENTS (record `8c2a4593`: CR-18 and CR-19 resolved; CR-20 MEDIUM; CR-21 LOW). M5 is QA Complete (`e668730b`). QA Phase 2 for M6 was rejected once at the TDD compliance gate (`a5d676e`); the eight stub-tree reds and a green control were recorded and committed (record `78f93bdd`, `m6-stub2-119471f-*.txt`), and QA was told it can re-open the gate and run Phase 2 at `119471f`. This document is current at that record.
- **Next, and its start condition.** Steering's ruling on CR-20 (the keystroke cost: `handleEditor` calls `resolveEmoji` for every line and each call rebuilds the unit; 71 ms per keystroke at 400 lines against 1.1 ms at the base) is "fix it before release" (rulings file `steering/fixer-queue-2026-11-21-rulings.md`, block 2026-11-24T07:05Z, record `3ec39942`). `planner-019` is writing the plan revision that adds a keystroke-cost bound and the fix to M6. **My fix round starts on the critic's approval of the revision that settles CR-20, not before** (no code, no test, before it). Its hand-off goes to `code-reviewer-019` first; QA follows code review's verdict.
- **Approach for the fix round (the reviewer's route, to be checked against the revision).** Resolve per unit, building each unit once per pass, so `resolveEmoji`'s `unitAround` build is paid once per unit, not once per line. The red is a counting case on `unitAround` builds per normalisation pass. The reviewer's probe is `verification/019/code-review/m6-119471f/crprobe.normalize-cost-tip.test.ts.txt`; the revision's bound sets the cost case's threshold, read from it, not chosen here. A fix round carries the Class Sweep table (finding, enumeration command, full output, disposition per hit) over every caller that rebuilds a unit per line (`git grep -n "unitAround" <ref> -- src`), the re-run of the self-check sweep over the round's diff (`mutant-gen.js --range 119471f..<tip>`, shards through `mutation-run.py` as in § Test Execution Results, per-mutant `tests` from the mapping in `m6-mutants-d652d12-s*.json`), and the named mutants of the QA document whose guard the diff touches.
- **Also open and not mine to start.** CR-21 (`emoji-regex` has no importer) is left as is unless steering rules otherwise. QA's own Phase 2 pass at `119471f` runs in parallel; a fix round changes the tip it audits, so when the revision arrives ask steering whether QA's pass is paused or restarts.
- **Approach in flight.** None. No uncommitted source or document work in either repository; the working tree holds only the foreign `?? .playwright-mcp/`, and the record repo only other sessions' untracked files.
- **Local state not restored.** Scratchpad only (`export-tip`, `export-stub`, probe files, `mwork*`): nothing in the shared tree, nothing to restore. No process of mine is running (`pstree` shows none beyond the session itself).
- **Evidence run but not recorded.** None. Everything run since the hand-off is in `verification/019/impl/` and named in this document (`m6-suite-final-119471f.*`, `m6-sweep-*`, `m6-stub2-119471f-*`, `m6-convention-check-119471f.txt`). The in-session probes for `withNormalizeNode.ts:161` and `:152` (first and last child inserted into a code line), the fence-parity counts, and the `'> a  > >'` carried-flag probe are described in the document but are not committed files.
- **Questions sent.** None open. Answered: the planner confirmed the source-text reading (R-74, no revision). Sent and answered by action: M5 Fix Round 1 to code review (approved), M5 to QA (closed), M6 to code review (approved with comments), the stub-tree reds to QA.
- **Cache-warm wake.** Deleted at this checkpoint (`6fd1babc`). Arm a new one on the next turn.
