---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M5 is built on chain/019-slate-formatting-discord-engine (slices at website 921eeb8, 6f4d48f, 65b8e2c, 3ffb2b4, 2e36107) and is
  handed to code review at 2e36107. Open: the convention check's 8 FAILs, all eslint errors already in SlateEditor/index.tsx at the base
  (Outstanding 1, a ruling owed); 9 sweep survivors dispositioned as equivalent or not M5's (Outstanding 3); the emoji and block-layer
  exclusions of AC-5.8 (Outstanding 4); a blind spot in M4's visibleForm helper (Outstanding 5).
Handoff-At: 2e36107 — repos=website — M5 complete, handed to code review; the self-check sweep ran at 3ffb2b4, whose M5 source equals this tip's (later commits add tests and M3 helper changes only); whole offline suite at this tree: 224 files, 3,280 of 3,280, exit 0
---

# Implementation 019 — M5: the editor's colouring on `parseLossless`

## Plan Reference

`agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 12 (record `b0af4dc3`), milestone M5. QA Phase 1:
`qa/019-slate-formatting-discord-engine-qa.md`, Revision 12 re-key (record `e6450353`). Chain branch
`chain/019-slate-formatting-discord-engine`. The plan's Status was already `In Progress` (no row owed).

## Date

2026-11-24 (UTC). Session `implementer-019`.

## Changelog

| Date | Handoff | Request | Summary |
|------|---------|---------|---------|
| 2026-11-24T04:20 | steering-hooks-fixer (message: resume M5 from the Resumption State) | Slices 2 and 3, hand-off | Code lines `6f4d48f`, properties and call sites `65b8e2c`, comment removal `3ffb2b4`, sweep-survivor cases `2e36107`; handed to code review at `2e36107`. Between: M3 fix rounds 7 (CR-15, `d6aab03`) and 8 (QAF-38, `81c68b2`), both closed by their reviewers. |
| 2026-11-24T01:28 | steering-hooks-fixer (message, M5 stage start, block 2026-11-24T01:02Z) | Build M5 | Slice 1 at `921eeb8`. Between: M3 fix round 6 (`9a5f4fe`, `b04c09f`) and M4's stub-tree records, for qa-019's record `908aeee0`. |

## Implementation Summary

`decorator.tsx` now takes `(editor, mounted, isEmbed, surface)`. It builds a run unit (adjacent `div` and `blockQuote` elements, joined by
`\n`, a quote element contributing its `quotePrefix`, an emoji element one `?`), asks `unitStyles.ts` for the per-character classes of the
unit's lossless parse, and cuts the text node's ranges from them. One parse per distinct unit text, kept in a bounded cache keyed by the
unit text and its fence context. `SlateEditor` takes `surface` in place of `contentParser`, redraws when the engine settles, and the
content editor stays closed while the engine is pending. The six call sites pass their surface.

Code lines take highlight.js's public `HighlightResult.value`: `highlightScan.ts` reads its closed HTML grammar (`<span class="…">`, `</span>`, five entities) into the classes of every scope open around each character, outer first, and `decorator.tsx` cuts the node's ranges from them with the same `rangesOf` the inline path uses. No highlight.js member outside its public typings is read, `_emitter` is gone, and so are `createLeaf.ts`, `normalizeRanges` and their `simple-markdown` types.

## Milestones Completed

M5 in full: slice 1 (the run-unit decorator, the surface prop, the pending gate), slice 2 (code lines from highlight.js's public HTML; `createLeaf.ts` deleted), slice 3 (AC-5.3 range bounds, AC-5.7 parse counts and the timing read, AC-5.8 editor equals preview, the six call sites' surfaces).
AC-5.5 (the real browser) is UAT's walk (QA register B-3), not built here.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | steering's message, effort rulings block 2026-11-24T01:02Z (commit `4ecb64f`); Revision 12 | n/a |
| QA Phase 1 covers M5 | `qa/019-slate-formatting-discord-engine-qa.md`, `Phase: 1`, Revision 12 re-key `e6450353` | n/a |
| Open questions | none open in the plan | n/a |
| Premise | no `PREMISE-STALE` on M5 | n/a |
| Cap | M5 is capped (block 00:49Z): a gate finding below HIGH is a stated limit | n/a |

## Flows (user-visible work)

The M5 lines are in the M4 document, "M5 and M6 flows, derived ahead of stage start", and none held an owner decision. Slice 1 adds one
decision of mine, recorded here and not asked, taken inside the scope steering gave for the two readings:

| Flow | Line |
|---|---|
| Subtext content in the editor | the text after `-# ` draws the class `subtextText`, which the box's `subtext` style set requires for AC-3.2's set equality; no stylesheet rule is added, so the editor shows no visible change for it (the marker and its space draw as `syntax`) |
| Fence line | the opening fence line is drawn as a fence (`syntax`, and `lang` on the language) and the closing fence line likewise, by the Slate layer's fence parity (the unit is parsed with a synthetic body and closing fence, or opener, added, then cut back to the text); the native box draws a lone `` ```js `` plain, so this is the Slate-governed residue of X-19 |
| Code lines | no visible change: a nested highlight scope now keeps its outer scope's class, so a character in `${…}` inside a template string draws `hljs-string` and `hljs-subst` together; a code line's colours otherwise equal the old path's |
| Pending engine | the content editor stays closed (as the preview shows nothing); rejected: the editor opens and shows the text unformatted |

## Files Modified

| Path | Changes |
|---|---|
| `src/components/SlateEditor/utils/decorator.tsx` | rewritten on run units; code lines read `HighlightResult.value` through `scanHighlight` |
| `src/components/SlateEditor/index.tsx` | `surface` prop; `decorate` memoised on the engine state |
| `src/components/DiscordContentEditor/{index,Desktop,Mobile}.tsx` | `surface` in place of `interactiveParser`; the editor is not mounted while the engine is pending |
| `src/components/DiscordMessageEditor/components/{ContentBody,ComponentEditors/TextDisplayEditor,EmbedEditor/Embed,EmbedEditor/EmbedTitle,EmbedEditor/EmbedField}.tsx` | each passes its surface: content, v2Text, embedDescription, embedTitle or embedTitleWithUrl, the field name as embedTitle or embedTitleWithUrl by the embed's url, the field value as fieldValue |
| tests | `SlateEditor.opening-writes-stored-text`, `mountedEditor`, `DiscordContentEditor.desktop-typed-text-reaches-message` re-based onto `surface`; the last gains the pending-gate case |

## Files Created

| Path | Purpose |
|---|---|
| `src/components/SlateEditor/utils/unitStyles.ts` | `styleUnit(surface, text, startsInCodeBlock)`: per-character classes of one run unit |
| `src/components/SlateEditor/utils/highlightScan.ts` | `scanHighlight(html)`: per-character class lists of highlight.js's HTML |
| `.../utils/__tests__/highlightScan.scope-classes.test.ts` | literal cases for the scan |
| `.../utils/__tests__/decorator.code-line-scopes.test.tsx` | AC-5.3/AC-5.4 over 193 languages and 10 snippets, expected value highlight.js's HTML parsed by jsdom's `DOMParser` |
| `.../utils/__tests__/decorator.one-parse-per-unit.test.ts` | AC-5.7: the engine called once per run unit, and the stale limb |
| `.../utils/__tests__/decorator.range-bounds.test.ts` | AC-5.3: no range empty or outside its node, six surfaces, 2,378 inputs |
| `.../utils/__tests__/decorator.preview-equals.test.tsx` | AC-5.8 on the five legacy-only surfaces |
| `src/components/DiscordMessageEditor/components/__tests__/DiscordContentEditor.call-site-surfaces.test.tsx` | the surface each of the six call sites passes |
| `.../utils/__tests__/unitStyles.char-classes.test.ts` | literal cases for the unit styles |
| `.../utils/__tests__/decorator.native-box-classes.test.ts` | AC-3.2/AC-5.1 limb: the decorator against the frozen native box |
| `.../utils/__tests__/decorator.emoji-split-invariance.test.ts` | AC-5.2: the classes around an emoji element |
| `.../__tests__/SlateEditor.coloured-by-surface.test.tsx`, `helpers/markdownProviderMock.ts` | the surface prop, the engine redraw; the provider mock lifted at its third copy |

Deleted: `utils/createLeaf.ts` (its code-line role is `highlightScan.ts` and `rangesOf`; its ast types had no other user), and `decorator.emphasis-syntax-ranges.test.ts` (262 cases of the replaced width-inference decorator's range shapes; the Test
Conventions' "superseded implementation" class). Its covering tests, each mutation-checked below: `decorator.native-box-classes` (every
frozen typed and corpus input), `unitStyles.char-classes`, `decorator.emoji-split-invariance`.

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| Decorator | the contract `(editor, mounted, isEmbed, parser)` kept with the surface in place of the parser; `createLeaf` kept for the code lines until slice 2 |
| Leaf classes | `markdown.scss`'s `.strongText`, `.emText`, `.uText`, `.sText`, `.inlineCodeText`, `.codeBlockText`, `.spoilerText`, `.linkText`, `.syntax`, `.lang`; `.subtextText` has no rule |
| Engine gating | `useEngineState` of `MarkdownProvider` (M2/M4's `Markdown.tsx` pattern) |
| Code-line ranges | the inline path's `rangesOf` (one range per run of equal classes), fed `CharStyle[]` from the scan instead of from `styleUnit` |
| Test provider mock | `SlateEditor.opening-writes-stored-text`'s mock, lifted to `helpers/markdownProviderMock.ts` at the third copy |

## TDD Compliance

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `styleUnit` (bold, masked link, bare link, subtext, markers, cross-line, astral, empty) | `unitStyles.char-classes.test.ts` | Yes | Yes | ModuleNotFoundError `../unitStyles` (first row of the module; `m5-red-1.txt`) | Yes |
| `styleUnit` subtext space as marker; opening fence framing | same | Yes | Yes | AssertionError on both at the first implementation run (7 of 9 green, 2 failed: `subtextText` on the space; an inline-code parse of an empty fence); the output was not saved, mutants `m5-u2`, `m5-u4` stand in (`m5-u2.txt`, `m5-u4.txt`) | Yes |
| `decorator` (run unit, surface) | `decorator.native-box-classes.test.ts` | Yes | Yes | TypeError `parserContent is not a function` against the old decorator (`m5-red-2.txt`); the three inputs that then differed from the frozen box were closed one by one (link title whitespace; quote prefix not a text node; the fence parity residue) | Yes |
| `SlateEditor` `surface` prop; engine redraw | `SlateEditor.coloured-by-surface.test.tsx` | Yes | Yes | AssertionError: no `strongText` after the engine resolves; link text drawn on the title surface (`m5-red-3.txt`) | Yes |
| content editor pending gate | `DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx` | No: the gate was coded first | Yes, by mutant | AssertionError: the editor opened while pending (`m5-mutant-gate-desktop.txt`) | Yes |
| `decorator` emoji split | `decorator.emoji-split-invariance.test.ts` | No: written after the decorator | Yes, by mutants | `m5-d4` (emoji counts zero), `m5-d5` (offset ignores earlier siblings) both red | Yes |

Slice 2 and 3 rows:

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `scanHighlight` | `highlightScan.scope-classes.test.ts` | Yes | Yes | Error `Cannot find module '../highlightScan'` (first row of the module; `m5-red-5.txt`); mutants c1, c2, c3 | Yes |
| `decorator` code lines (`codeLineRanges`) | `decorator.code-line-scopes.test.tsx` | Yes | Yes | AssertionError: 142 of 1,930 language and snippet pairs differ from highlight.js's HTML, and 2 draw an empty or outside range (`m5-red-4.txt`); mutants c4, c5, c7 | Yes |
| `decorator` parse cache (`stylesOf`) | `decorator.one-parse-per-unit.test.ts` | No: the cache was coded in slice 1 | Yes, by mutant | AssertionError `to have a length of 1 but got 51`, and the stale limb `to deeply equal [['content','*bc*']]` (`m5-p1.txt`, `m5-p2.txt`) | Yes |
| `decorator` range bounds | `decorator.range-bounds.test.ts` | No: the decorator's ranges existed | Yes, by mutant | r1 (ends one past), r2 (empty), r3 (starts before): each AssertionError on the offenders list (`m5-r1.txt` to `m5-r3.txt`) | Yes |
| `decorator` editor equals preview | `decorator.preview-equals.test.tsx` | No: the decorator existed | Yes, by mutant | e1 (bold class), e2 (link), e3 (inline code), e5 (spoiler) fail on all five surfaces; e4 (every surface drawn with the content mask) fails on three of five (`m5-e1.txt` to `m5-e5.txt`) | Yes |
| `ContentEditorMobile` pending gate | `DiscordContentEditor.mobile-opens-after-engine-settles.test.tsx` | No: the gate was coded in slice 1 | Yes, by mutant | three Mobile mutants fail the three gate cases (`m5-sv-Mobile_tsx_93_*.txt`); the first-column "No" is closed by the mutants, the gate has no function to stub | Yes |
| the six call sites | `DiscordContentEditor.call-site-surfaces.test.tsx` | No: the sites were changed in slice 1 | Yes, by mutant | s1 to s6, one wrong surface each, each AssertionError (`m5-s1.txt` to `m5-s6.txt`) | Yes |

Stub-tree reds for slice 1's two "No" rows. `decorator.emoji-split-invariance`: a copy whose `decorator` holds no body fails 4 of 19 cases at assertion level (`m5-stub-decorator-emoji-split.txt`), green at the real code, 19 of 19 (`m5-stub-decorator-emoji-split-green.txt`). The pending gate has no function to stub; its row stays closed by the mutant that removes it (`m5-mutant-gate-desktop.txt`).

TDD new-names check (`tdd-check.py`): it refuses TypeScript; rows read by hand above.

Mutation check of the covering tests (isolated export `scratchpad/export-m5`, outputs `verification/019/impl/m5-*.txt`):

| Mutant | Change | Result |
|---|---|---|
| m5-u1 | whitespace after a link close takes the stack | killed |
| m5-u2 | subtext space not syntax | killed |
| m5-u3 | closing-fence shift dropped | killed |
| m5-u4 | unclosed fence not closed for the parse | killed |
| m5-u5 | subtext content class dropped | killed |
| m5-u6 | url after a link close takes the stack | killed |
| m5-d1 | lines joined by a space, not a newline | killed |
| m5-d2 | quote prefix left out of the unit text | **survived**: equivalent so far: the engine's trees for `> *a\nb*` and `*a\nb*` carry the same classes and the frozen quote inputs agree; a live-box input that separates it is not found |
| m5-d3 | each line its own unit | killed |
| m5-d4 | emoji element counts zero | killed (after `decorator.emoji-split-invariance` was added) |
| m5-d5 | offset of a later text node ignores earlier siblings | killed (same) |
| m5-w1 | `engine` dropped from the decorate memo's deps | killed (`SlateEditor.coloured-by-surface`) |
| m5-w2 | the editor ignores its surface | killed (same) |
| m5-gate | pending gate removed from `Desktop.tsx` | killed |
| m5-c1 | `scanHighlight`: a closing span does not close its scope | killed |
| m5-c2 | an entity counts as its source characters | killed |
| m5-c3 | a nested scope keeps only its own class | killed |
| m5-c4 | a later text node of a code line reads from the line start | killed |
| m5-c5 | no guard for a language highlight.js does not know | killed |
| m5-c6 | the scan's lone `<` or `&` alternative dropped | **survived**: the alternative was unreachable (highlight.js escapes both), so it was removed from the scanner and the test re-run green |
| m5-c7 | `ignoreIllegals: false` | killed |
| m5-p1 | the style cache is not read | killed (3 of 3 cases) |
| m5-p2 | the cache keyed on the unit's first line, not its text | killed (the stale limb) |
| m5-r1 / r2 / r3 | a range ends one past its text / is empty / starts before it | killed, each |
| m5-e1 / e2 / e3 / e5 | bold / link / inline-code / spoiler class dropped | killed, each, on all five surfaces |
| m5-e4 | every surface drawn with the content mask | killed on `embedTitle`, `embedTitleWithUrl`, `fieldValue`; survives on `embedDescription` and `v2Text`, whose masks equal content's (`0x3fffffff`) |
| m5-s1 to s6 | each call site on another surface | killed, each |
| m5-sv-* (9) | the sweep's survivors that were gaps (Mobile gate 3, Desktop focus 1, code-line start 2, cache bound 3) | killed after the new cases |

Drivers: `mut2.py`, `mut3.py`, `mut4.py`, `mut5.py`, `mut6.py` (scratchpad), each running in `export-m5b`, an `rsync` copy of the tree with `node_modules` linked and `.env.local*` removed, output to the files named, process group killed at 300 s.

## Class Sweep

Not a fix round.

## Test Execution Results

| Command | Result |
|---|---|
| `pnpm test` at the tree of `d6aab03` | exit 0; 223 files, 3,268 of 3,268 (`m3-suite-r7-d6aab03.{log.txt,exit}`); at `81c68b2` (M3 round 8) 3,272 of 3,272 |
| `pnpm run typecheck` at the same tree | exit 0 (`m5-typecheck-slice2.txt`, run after the last test-file edit; `m3-r7-typecheck.txt` at `d6aab03`) |
| eslint (JSON output) over `utils/`, `utils/__tests__/` and the call-site test | 0 errors in M5's files; warnings only in files M5 did not write (`onChange.ts`, `onKeyDown.ts`) |
| `convention-check.js --since=b04c09f` (`m5-convention-check.txt`) | 0 CANDIDATE; 8 FAIL, all `eslint` in `SlateEditor/index.tsx` (below); 20 SKIP: PNG captures of the foreign `.playwright-mcp/` listing, two files deleted in the range, and the ID-token basename check, which the tool does not implement verbatim: **unchecked by tool**; by hand, no M5 basename or test title holds an ID token (`m5-…` appears only in this document and `verification/`) |
| first convention run | 9 FAIL: the 8 above and 2 source comments in `decorator.native-box-classes.test.ts`, removed at `3ffb2b4` |
| AC-5.7 timing read (D-15) | median **4.87 ms** (min 4.21, max 7.69, 20 runs after 2 warm-ups) for a decorate pass over a 4,160-character, 35-line unit in which one line changed each run, on this box, node under vitest; under the option's "about 10 ms" (9.895 ms lossless median, `time.out`). `m5-timing-read.result.txt`; nothing goes to the owner |
| self-check sweep (`mutant-gen.js --range b04c09f..3ffb2b4`, `mutation-run.py` over an export of `3ffb2b4`, vitest with `--no-cache --configLoader runner` and a transcribed config for `__dirname`) | 126 mutants (decorator 66, unitStyles 44, highlightScan 7, Desktop 6, Mobile 3): **108 killed, 18 survived** (table `m5-sweep-3ffb2b4/mutation-table-*.json`, mutants `m5-mutants-3ffb2b4.json`, config `m5-sweep-vitest.config.ts`). After the tightening below, the 9 survivors that were real gaps are killed (`m5-sv-*.txt`); 9 remain, dispositioned in Outstanding 3 |
| the whole suite at `2e36107` (the handoff tip) | exit 0; 224 files, 3,280 of 3,280 (`m5-suite-final.{log.txt,exit}`); typecheck exit 0 (`m5-typecheck-final.txt`); convention check as above |

`SlateEditor/index.tsx` FAILs: the 8 eslint errors are at the base too (`b04c09f:index.tsx`, 9 errors, same rules: `no-unused-vars` on `e`, `react-hooks/immutability` on `editor.children =`, `react-hooks/use-memo` on the `useCallback(factory(...))` forms). M5 changed 13 lines of that file (the `surface` prop and the memo deps). Clearing them rewrites the file's hook structure, beyond the plan; I did not, and I ask for a ruling (Outstanding 1).

**Account of the offline suite's change, 3,460 cases in 214 files at `b04c09f` to 3,268 in 223 at `d6aab03` (−192 cases, +9 files; measured by running each file's JSON, `m5cases.json`).**
Removed: `decorator.emphasis-syntax-ranges.test.ts`, 262 cases (measured at an export of `b04c09f`), the width-inference decorator's range shapes (the "superseded implementation" class; the decorator they pinned is gone, and the cases are replaced by `decorator.native-box-classes`, which compares every frozen typed and corpus input to the native box, `unitStyles.char-classes`, and `decorator.emoji-split-invariance`; each is mutation-checked in the table above). Added: 68 cases in 10 new files (`unitStyles.char-classes` 9, `decorator.native-box-classes` 2, `decorator.emoji-split-invariance` 19, `SlateEditor.coloured-by-surface` 3, `decorator.code-line-scopes` 6, `highlightScan.scope-classes` 10, `decorator.one-parse-per-unit` 3, `decorator.range-bounds` 7, `decorator.preview-equals` 5, `DiscordContentEditor.call-site-surfaces` 4), plus 1 in `DiscordContentEditor.desktop-typed-text-reaches-message` (2 to 3, the pending gate). Net −262 + 69 = −193, and M3's round 7 case (+1, `discordLive.drift-compare`) gives the −192. File count: 214 − 1 + 10 = 223. After that, M3's round 8 (+4 `discordRouting.predicates`, `81c68b2`: 3,272) and this document's survivor cases (+8: mobile 4, desktop 1, code-line third node 1, cache bound 2; one more file): 224 files, 3,280 cases at `2e36107`.

Evidence and input counts for AC-5.8: each of `embedDescription`, `fieldValue`, `v2Text` compared 1,138 of 2,378 inputs, and `embedTitle`, `embedTitleWithUrl` 1,098 (the 272 corpus, 106 link inputs, 2,000 generator inputs; `m5-preview-equals-sixth.txt` and the run that followed). Excluded, by predicate, with the reason: inputs the Slate layer lifts into an emoji element (an element carries no decoration, so it has no style set to compare); 109 inputs whose fences the Slate layer's parity reads differently from the engine's (an unclosed fence, a fence not at a line start); 24 inputs whose quote prefix the Slate layer strips where the engine reads `>` as text (a leading space before `>`, a `>` after a `>>> ` line). A link's visible text is not compared (the preview writes the normalised address, `x.y/`, punycode and percent-encoding), only its style and that it is a link; a mention or timestamp, which the preview draws as one pill, matches any run of editor characters of the same style.

## Outstanding Items

1. **Ruling owed (a convention-check FAIL, not fixed):** the 8 eslint errors in `SlateEditor/index.tsx` are older than M5 (same 9 at `b04c09f`). Options: (a) a later chain clears them, M5 hands off with this named; (b) M5 clears them now, a hook rewrite of `SlateEditor` outside the plan. I took (a) pending steering's word.
2. **AC-5.5** (the real-browser walk, 65 comparable cases) is UAT's, not run here.
3. **18 survivors of the sweep; 9 were gaps and are closed by new cases, 9 are equivalent or not M5's.** Closed (each KILLED under its own mutant, `m5-sv-*.txt`, driver `m5-driver-mut9.py`):
   - `Mobile.tsx` pending gate (3 mutants: `===` to `!==`, `||` to `&&`, `!markdown` to `markdown`): new `DiscordContentEditor.mobile-opens-after-engine-settles.test.tsx`, 4 cases (open when resolved, when rejected; closed when pending, with no provider).
   - `Desktop.tsx` `!_focused`: a desktop case "holds no editor until the content is focused".
   - `decorator.tsx` code-line `start` walk (walk-first, walk-last): a code line's third text node draws from its own characters.
   - `decorator.tsx` cache bound (`512` to `513`, `>=` to `>`, eviction removed): two cases at the boundary pair, 512 units drawn twice parse none again, and with 513 the second unit is kept and the oldest parses again.
   Remaining 9, each with its reason:
   - `Desktop.tsx` line 25, `isEmbed = false` to `true`: not an M5 guard; the line is in the diff because `surface` replaced `interactiveParser` on it. The stubbed editor in the desktop test does not read `isEmbed`.
   - `decorator.tsx` line 41, the quote prefix left out of the unit text: the same as m5-d2 (survivor of slice 1): no frozen or generated input separates it.
   - `decorator.tsx` line 83, `if (!styles)` made dead: equivalent in output (the result is `undefined` either way); it differs only in caching an `undefined` entry.
   - `unitStyles.ts` line 64, `style && MODIFIER_CLASS[style]` to `||`: equivalent, because `modifierStyle` returns only the five `MODIFIER_KINDS` values and `MODIFIER_CLASS` has exactly those five keys.
   - `unitStyles.ts` line 84, two `&&` to `||` (the subtext whitespace condition): equivalent over the population. Probe `m5-probe-subtext-whitespace.json`: over six surfaces and every corpus, link and generator input plus six subtext inputs, every token after a `subtext_marker` is whitespace (1,164 of 1,164), and no whitespace token in a subtext node follows anything else or comes first (0). Not a proof for every input.
   - `unitStyles.ts` line 101, `startsInCodeBlock ? 1 : 0` to `? 2 : 0`: equivalent, since only the parity of `fences` is read.
   - `unitStyles.ts` line 112, the root walk's initial `inCodeBlock: false` and `linkClosed: false`: equivalent by construction, because the root node's `inner` overrides both before any token reads them.
4. **AC-5.8's stated limits** (above): the emoji-element inputs, the fence-parity and quote-prefix inputs, link text and atom text are not compared. The fence-parity and quote-prefix differences are the Slate block layer's (it strips `> ` and ` > ` and `>>> ` where the engine draws `>` as text), a pre-existing difference between the layers that M5 does not change; on the legacy surfaces the preview shows the `>`, the editor does not.
5. **A defect in M4's helper, found while building AC-5.8 (not mine to fix here):** `src/utils/markdown/__tests__/helpers/visibleForm.ts` `walk` tests `STYLE_NAMES.has(n.name)` before `n.name === 'c'`, and `c` is in `STYLE_NAMES`, so the `c` branch (an inline code node's characters, carried in its `attr`) is dead; a DOM-side code node, which has `kids: null`, contributes no unit. Probe: `visibleFromDom(drawnDom('embedDescription', '\`a\`'))` is `[]`, and `'x \`ab\` y'` gives units for `x`, ` `, ` `, `y` only (a run under a minute). So M4's `preview.dom-equals-engine-tree` and `discordPreview.legacy-equality` cannot see an inline-code character's text or style on the DOM side. Severity MEDIUM for M4's coverage (the check is blind to one construct, not wrong). My test normalises the DOM nodes (`codeWithKids`) before calling it. M4's fix round or a handoff record is the carrier; I name it to steering.
6. **`subtextText`** has no stylesheet rule (slice 1). **Survivor m5-d2** (slice 1). The fence-line colouring follows the Slate layer's parity (slice 1).
7. Self-diagnosis (method): in slices 1 and 2, `decorator`, the parse cache and the range bounds were written before their tests; the red for each is by mutant, and the stub-tree red is recorded for the emoji rows. In slice 3 I wrote AC-5.8's comparison against the preview before looking at what the preview draws, and spent five rounds on harness differences (heading and list markers, link display text, emoji elements, block-layer prefixes, inline code) that a first look at 20 inputs would have shown together. The lesson for the method: read a sample of both sides before writing the comparison.

## Next Steps

Code review of M5 at `2e36107`, in this order of risk: `highlightScan.ts` and `codeLineRanges` (the replacement of `_emitter`), `decorator.preview-equals`'s exclusion predicates (Outstanding 4), the parse cache's bound and key (`STYLE_CACHE_LIMIT` 512, key = fence context plus text). Then QA Phase 2 on M5, then M6.

## Resumption State

None needed: M5 is handed off, the tree is committed (website `d6aab03`; record at the commit after this document). Scratch only under the session scratchpad: `export-m5b`, `mut*.py`, `mrun-work`.
