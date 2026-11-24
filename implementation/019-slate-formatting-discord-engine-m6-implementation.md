---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M6 is built on chain/019-slate-formatting-discord-engine through website 42d4574 and is not yet handed to code review: owed before
  hand-off are the self-check sweep (214 mutants, run at 42d4574, stopped at the checkpoint and to be re-run), the stub-tree reds
  for the emoji normaliser, the CR-18 class sweep's last member, a final whole-suite run, and this document's tables. Plan Revision 15.
Handoff-At: not yet — repos=website — M6 in progress; work tip 42d4574, nothing handed to code review for M6
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
| `resolveEmoji`, `revertToText`, `pointAtOffset`, `flatOffset`, `startsOf` | `withNormalizeNode.emoji-keeps-line-text.test.tsx`, `…emoji-set-equals-the-engines.test.tsx` | No: the normaliser was written with the lift, then the tests | Yes, by mutant; **stub-tree red owed** | mutants `no-redeciding-on-edit`, `no-lift-on-edit`, `unit-never-written-with-sources` KILLED (`m6-mut-3493290-*.txt`); first run of the rewritten file failed on a truncated source file (`m6-run-4.txt`), not an assertion | Yes |
| `carriesMarker`, `splitCarrying`, `resolveCarried`, the `split_node` override | `withNormalizeNode.quote-continues-on-enter.test.tsx` | Yes | Yes | five AssertionErrors (`m6-red-5.txt`); mutants `carry-never-fires`, `NM-68`, `NM-69`, `carry-on-paste`, `typed-marker-not-taken-in` all KILLED | Yes (`m6-green-5.txt`) |
| `normalizeBackspace` on a carried code-line marker | same | Yes | Yes | AssertionError `'> ```\n> x\n> '` against `'> ```\n> x\n'` (`m6-red-6.txt`) | Yes |
| the typed drive (`typeText`) and `continuesQuote` | mounted typed tests | n/a (test helper) | positive control: Enter then Backspace leaves an empty line (`quote-continues…` case) | the drive's first run left a shared Backspace event with `defaultPrevented` set; fixed to a fresh event per use | Yes |
| `nativeEmojiSpans` (helper) | `discordOracle.emoji-spans.test.ts` | No: the helper was written first, then its table | Yes, by mutant | `helper-ignores-its-mask-NM-44`, `helper-first-occurrence-join`, `helper-offsets-in-unescaped-text`, `helper-keeps-spans-inside-code` all KILLED | Yes |
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
| CR-18 (AC-5.8 drops any input holding an element) | `git grep -c "editor === null\|return null" <ref> -- src/components/SlateEditor/utils/__tests__/decorator.preview-equals.test.tsx`, and the same class elsewhere: `git grep -n "holdsElement" <ref> -- src` | `2e36107`: 2 in the preview test; `42d4574`: 0 in it. `holdsElement` at `42d4574`: 2 hits, both in `decorator.native-box-classes.test.ts` (the declaration, the skip at its line 81) | preview test: fixed, compared 2,239 of 2,245 per surface where the floor is 2,200; the 6 differences are named by id (`BOX_READS_ELEMENT_AS_QUESTION_MARK`, `QUOTE_PREFIX_DRAWN_IN_SPAN`), each checked to differ and nothing else may. **`native-box-classes`: owed, see Next** |
| CR-19 (dead interactive parsers) | `git grep -c -i "interactiveParser\|interactiveBase\|interactiveWithoutLinks\|markdown\.interactive\|\.interactive\." <ref> -- src` | `2e36107`: 53; `4897f1c`: 0 | all removed with `rules.tsx`, `utils.ts` and the interactive map |

## Test Execution Results

| Command | Result |
|---|---|
| component tests at `ef19961` | exit 0; 59 files, 638 of 638 (`m6-run-15.txt`) |
| whole offline suite at `4897f1c` | exit 0; 225 files, 3,330 of 3,330 (`m6-suite-a.txt`) |
| whole offline suite after the lint repairs | 1 failed: the offline whole-command case, because a re-derive test sat in the discord project and printed `6 passed`; the test moved to the offline project at `42d4574` and passes alone (`m6-suite-b.txt`). **A final whole run is owed.** |
| `pnpm run typecheck` | exit 0 at `3493290` and at the lint repairs |
| convention check (`--since=2e36107`, `m6-convention-check.txt`) | 8 FAIL, all `eslint` in `SlateEditor/index.tsx` (the 8 errors D-20 rules a stated limit; same 8 rules and lines as at `2e36107`); 0 CANDIDATE; the id-token basename check is unchecked by the tool: by hand, no basename or test title of M6 holds an ID token (`D-13`, `D-5` and `AN-7` appear only in the `basis` data strings of `discordOracle.emoji-spans.test.ts`) |
| AC-6.6 | `pnpm install --frozen-lockfile --ignore-scripts` in an export exits 0 (`m6-frozen-install.txt`); the lockfile diff is four removals (`patchedDependencies`, the importer, two package blocks), no pin moved |
| AC-6.1b (S-30), a read | `git grep -n "saveMessage(" <tip>` is owed at the tip for the code review's re-read; at `0411d3b` the plan names four sites, all user acts. M6 changes no caller |
| AC-6.5 count and time | loaded-text property: 3,040 inputs on six surfaces (the clean-fence ones compared, a floor of 2,800), 6 cases; typed-edit property: more than 700 emoji tokens, 8 cases. Counts and times: owed from the final run's JSON, to be set against AC-3.3's 60 s cap |
| self-check sweep (`mutant-gen.js --range 2e36107..42d4574`) | 214 mutants (withNormalizeNode 130, emojiLift 42, runUnit 17, onKeyDown 15, unitParse 4, unitStyles 2, one each in common, flattenNodeText, getInitialValue, renderElementFactory); list `m6-mutants-42d4574.json`, six shards `…-s0.json` to `-s5.json`. **Run and stopped at the checkpoint with no result: re-run** |

## Outstanding Items

1. **Lint, D-20.** `SlateEditor/index.tsx` still has its 8 errors; M6 added none (this file lost the `emojiParser` lines only).
2. **A reading of the plan's "one `?` each", for the planner.** The plan has the lift parse the unit with each existing element as `?`. A probe in an export showed that cannot settle: `https://x.y/a*b*c🙂` read as text has no emoji node, as `?` it is inside an address, so the lift and the re-decide fought (126 normalisation iterations, the generator input `> hello world<id:guide>⏎https://x.y/a*b*c🙂\[x\[` typed). The lift therefore writes each element as its source text when it parses a unit (`unitAround(…, 'source')`), so the editor's elements equal a fresh load by construction. The decorator keeps `?`, as D-15 says. Where the two differ is AC-5.8's named class `BOX_READS_ELEMENT_AS_QUESTION_MARK` (3 inputs).
3. **Named differences of AC-5.8 (6 inputs per surface at most, by id in the test):** `link:61`, `gen:870`, `gen:1677` (a bare address beside an emoji, the box's `?`); `gen:709`, `gen:1113`, `gen:1368` (a quote line's `> ` drawn as text inside an open span).
4. **Fence-parity inputs are outside AC-6.5's loaded-text property** (`hasCleanFences`): an unclosed fence, or one not at a line start, is a code line to the Slate layer and plain text to the engine (3 to 11 inputs per surface differ). This is X-19, M5's stated limit.
5. **Unused dependency:** `emoji-regex` has no importer now. Left in `package.json`; removing it moves the lockfile beyond AC-6.6.
6. **CR-17** (`visibleForm.ts`'s dead inline-code arm) not taken: M6 does not touch that file.
7. **Behaviour M6 changes outside the service's own source:** the stored text of a message is unchanged character for character (D-10); what changes is what the editor writes for an emoji it used to save as `:name:`. The plan's re-derivation gate: M7 is `PREMISE-STALE` until re-argued when M6 ships.
8. **Self-diagnosis (method).** I removed an unreachable guard only after a case drove its path and the mutant survived; I wrote the normaliser's tests after its code and owe the stub-tree red; I truncated `withNormalizeNode.ts` with a script that cut from a function to the end of the file, found by a test, and recorded the repair in the commit. The lesson: replace a span of a file only by two anchors, never from one to the end.

## Next Steps

Finish the owed items (Resumption State), then code review of M6 and of M5's Fix Round 1, in that order of risk: `withNormalizeNode.ts` (`resolveEmoji`, the carry), `emojiLift.ts`, the `simple-markdown` removal. Then QA Phase 2.

## Resumption State

Written 2026-11-24T05:15Z at steering's request, at about 615K tokens.

- **Done.** All M6 code is committed on the chain branch; HEAD is `42d4574` plus this document's commit. Commits: `8cb4d83`, `c3af0ac`, `f58a816`, `cf126ea`, `4897f1c`, `3493290`, `fb74a13`, `ef19961`, `42d4574`. Offline component tests green; typecheck 0; convention check at the 8 D-20 FAILs only. M5 Fix Round 1 (QAF-39) is written in the M5 document and committed at `cf126ea`.
- **Next, in order.**
  1. **Hand M5 Fix Round 1 to `code-reviewer-019` first** (SendMessage, the M5 document and `cf126ea`); QA follows code review's verdict.
  2. Re-run the self-check sweep at the tip. Command, from this document's table: `for i in 0..5`: `python3 ~/.claude/tools/mutation-run.py --repo /usr/local/bin/hooks/website --sha <tip> --mutants verification/019/impl/m6-mutants-<tip7>-s$i.json --work <scratch>/mwork$i --out verification/019/impl/m6-sweep-<tip7>-s$i --timeout 400 --dep node_modules -- npx vitest run --no-cache --configLoader runner --config verification/019/impl/m5-sweep-vitest.config.ts`. The shard files for `42d4574` exist; regenerate with `mutant-gen.js --range 2e36107..<tip>` if the tip moved, and add per-mutant `tests` (the mapping is in the commit history of this session: withNormalizeNode and onKeyDown mutants run the quote, emoji, settle and mounted typed and pasted tests; emojiLift mutants the emoji and load tests; runUnit, unitParse and unitStyles the decorator tests). Wait on each pid with `wait-pid.py <pid> --timeout …`. Record each survivor with a disposition in § Test Execution Results. Expect survivors in `renderElementFactory.tsx` (no test renders an emoji element: add one), and in the `onKeyDown` guards.
  3. Stub-tree reds for `resolveEmoji` and `revertToText` (a copy whose function holds no body: assertion-level red on `withNormalizeNode.emoji-keeps-line-text` and `…emoji-set-equals-the-engines`, then green), recorded in § TDD Compliance.
  4. CR-18's last member: `decorator.native-box-classes.test.ts` line 81 skips inputs that hold an element; make it drop only the element's source characters from the expected line (the element ranges: `emojiRangesOf` in `helpers/emojiInputs.ts`), re-run, record the hit count in the Class Sweep row.
  5. A final `pnpm test` with a JSON report for counts and the AC-6.5 timing; AC-6.1b's `git grep -n "saveMessage(" <tip>`; re-run the convention check; set `Handoff-At` and the header; hand M6 to `code-reviewer-019`.
  6. Send the planner the Outstanding 2 reading.
- **Approach in flight.** None; no uncommitted source work. The working tree holds only the foreign `?? .playwright-mcp/`.
- **Local state not restored.** Scratchpad only (`export-m6`, `export-mut`, `export-lock`, probe scripts); nothing in the shared tree. The six sweep runners were stopped.
- **Evidence run but not recorded.** `m6-run-*.txt`, `m6-suite-*.txt`, `m6-red-*.txt`, `m6-mut-3493290-*.txt` are in `verification/019/impl/` and named above; the partial sweep output under `m6-sweep-42d4574-s*/` has no table and is to be deleted before the re-run.
- **Questions sent.** None open. Answered: the box limb (D-21), the Enter question (D-22), the 22 members (block 04:51Z). Sent to `planner-019`: the typed-limb input (answered by Revision 14).
- **Cache-warm wake.** Deleted at this checkpoint. Arm a new one on the next turn.
