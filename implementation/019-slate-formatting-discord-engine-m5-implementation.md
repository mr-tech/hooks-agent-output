---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: >-
  M5 is in progress on chain/019-slate-formatting-discord-engine. Slice 1 is committed at website 921eeb8: the run-unit decorator on
  the engine's lossless parse, the surface prop through the editor and its six call sites, the pending gate. Not built: the highlight.js
  scanner for code lines (AC-5.3, AC-5.4), the range-bounds property (AC-5.3), the parse-count and timing reads (AC-5.7), the
  editor-equals-preview property on the five legacy-only surfaces (AC-5.8), the cleanup of createLeaf.ts. Not yet handed to review.
Handoff-At: 921eeb8 — repos=website — slice 1 only; not handed to code review or QA
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
| 2026-11-24T01:28 | steering-hooks-fixer (message, M5 stage start, block 2026-11-24T01:02Z) | Build M5 | Slice 1 at `921eeb8`. Between: M3 fix round 6 (`9a5f4fe`, `b04c09f`) and M4's stub-tree records, for qa-019's record `908aeee0`. |

## Implementation Summary

`decorator.tsx` now takes `(editor, mounted, isEmbed, surface)`. It builds a run unit (adjacent `div` and `blockQuote` elements, joined by
`\n`, a quote element contributing its `quotePrefix`, an emoji element one `?`), asks `unitStyles.ts` for the per-character classes of the
unit's lossless parse, and cuts the text node's ranges from them. One parse per distinct unit text, kept in a bounded cache keyed by the
unit text and its fence context. `SlateEditor` takes `surface` in place of `contentParser`, redraws when the engine settles, and the
content editor stays closed while the engine is pending. The six call sites pass their surface.

## Milestones Completed

Slice 1 only (above).

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
| Pending engine | the content editor stays closed (as the preview shows nothing); rejected: the editor opens and shows the text unformatted |

## Files Modified

| Path | Changes |
|---|---|
| `src/components/SlateEditor/utils/decorator.tsx` | rewritten on run units; the code-line path (highlight.js through `_emitter`) is kept for slice 2 |
| `src/components/SlateEditor/index.tsx` | `surface` prop; `decorate` memoised on the engine state |
| `src/components/DiscordContentEditor/{index,Desktop,Mobile}.tsx` | `surface` in place of `interactiveParser`; the editor is not mounted while the engine is pending |
| `src/components/DiscordMessageEditor/components/{ContentBody,ComponentEditors/TextDisplayEditor,EmbedEditor/Embed,EmbedEditor/EmbedTitle,EmbedEditor/EmbedField}.tsx` | each passes its surface: content, v2Text, embedDescription, embedTitle or embedTitleWithUrl, the field name as embedTitle or embedTitleWithUrl by the embed's url, the field value as fieldValue |
| tests | `SlateEditor.opening-writes-stored-text`, `mountedEditor`, `DiscordContentEditor.desktop-typed-text-reaches-message` re-based onto `surface`; the last gains the pending-gate case |

## Files Created

| Path | Purpose |
|---|---|
| `src/components/SlateEditor/utils/unitStyles.ts` | `styleUnit(surface, text, startsInCodeBlock)`: per-character classes of one run unit |
| `.../utils/__tests__/unitStyles.char-classes.test.ts` | literal cases for the unit styles |
| `.../utils/__tests__/decorator.native-box-classes.test.ts` | AC-3.2/AC-5.1 limb: the decorator against the frozen native box |
| `.../utils/__tests__/decorator.emoji-split-invariance.test.ts` | AC-5.2: the classes around an emoji element |
| `.../__tests__/SlateEditor.coloured-by-surface.test.tsx`, `helpers/markdownProviderMock.ts` | the surface prop, the engine redraw; the provider mock lifted at its third copy |

Deleted: `decorator.emphasis-syntax-ranges.test.ts` (262 cases of the replaced width-inference decorator's range shapes; the Test
Conventions' "superseded implementation" class). Its covering tests, each mutation-checked below: `decorator.native-box-classes` (every
frozen typed and corpus input), `unitStyles.char-classes`, `decorator.emoji-split-invariance`.

## Patterns Extended

| Surface | Pattern extended |
|---|---|
| Decorator | the contract `(editor, mounted, isEmbed, parser)` kept with the surface in place of the parser; `createLeaf` kept for the code lines until slice 2 |
| Leaf classes | `markdown.scss`'s `.strongText`, `.emText`, `.uText`, `.sText`, `.inlineCodeText`, `.codeBlockText`, `.spoilerText`, `.linkText`, `.syntax`, `.lang`; `.subtextText` has no rule |
| Engine gating | `useEngineState` of `MarkdownProvider` (M2/M4's `Markdown.tsx` pattern) |
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

A "No" under "Test Written First?" for the last two rows is not yet closed by the stub-tree red the template requires; owed in slice 2's
round (stub `decorator` with no body against both test files, then green).

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

## Class Sweep

Not a fix round.

## Test Execution Results

| Command | Result |
|---|---|
| `pnpm test` at the tree of `921eeb8` | 217 files, 3,232 of 3,232, exit 0 (`m5-suite-slice1.{log.txt,exit}`). A first run had two 5,000 ms timeouts in `trpc.batch-refusal` and `preview.engine-not-ready` under load, unrelated files, kept as `m5-suite-slice1-first-run.log.txt`; the rerun is green |
| `pnpm run typecheck` | exit 0 (`m5-typecheck-slice1.txt`) |
| eslint over the changed files | clean except `SlateEditor/index.tsx`, whose errors are on lines this slice did not change (the `useCallback(factory(...))` forms, `editor.children =`, an unused `e`) |

## Outstanding Items

1. **Not built (slice 2 onward):** the highlight.js HTML scanner for code lines in place of `_emitter.rootNode` (AC-5.3's 193 languages, AC-5.4 nested scopes);
   AC-5.3's range-bounds property over the generator and corpus; AC-5.7's counted parses, stale limb and timing read; AC-5.8 editor equals
   preview on the five legacy-only surfaces; `createLeaf.ts` still imports `simple-markdown` types; convention check and the self-check sweep.
2. **Unfrozen limit:** the call sites' surface mapping (six sites) has no test of its own; a wrong surface is a wrong mask. Candidate for slice 2.
3. **Survivor m5-d2** (above).
4. **`subtextText`** has no stylesheet rule (above).
5. The fence-line colouring follows the Slate layer's parity, which differs from the native box on a lone opening fence and on a fence
   closed and reopened on one line (`` ```a\nb```c``` ``, named in `decorator.native-box-classes.test.ts` as Slate-governed).
6. Self-diagnosis (method): I wrote `decorator` and `decorator.emoji-split-invariance` before their tests, twice, as in M4.

## Next Steps

Slice 2 (code lines), slice 3 (properties, parse counts, timing, AC-5.8), then the self-check sweep, convention check, hand-off to code review.

## Resumption State

Written at the end of slice 1 (steering may clear this session).

- **Done.** Checkpoint at record `bd01c00b` and the commit after it. Website `921eeb8` on the chain branch, tree clean apart from `?? .playwright-mcp/` (foreign). M3 fix round 6 at `b04c09f` and M4's stub-tree records are with qa-019 (record `fe8ce8f3`).
- **Next, in order.** (1) Code lines: write `decorator.code-line-scopes.test.ts` (AC-5.4: nested scopes keep the outer class, expected value highlight.js's HTML parsed by jsdom `DOMParser`; AC-5.3: no zero-length range, none past the node, over `hljs.listLanguages()`), see it red against the `_emitter` path, then replace with a scanner of `HighlightResult.value`; delete the `createLeaf` ast types. (2) AC-5.7: mock `~/utils/markdown/engine` `parseLossless` as a pass-through counter; one parse per unit over a 50-text-node unit; the stale limb; time a 4,096-character multi-line unit, median of 20; over about 10 ms goes to steering. (3) AC-5.8: per legacy-only surface, editor classes vs preview classes in the visible form (`visibleForm.ts`, `previewDom.tsx` helpers exist) over the generator and the 272 corpus. (4) A test for the six call sites' surfaces. (5) stub-tree reds for the two "No" rows. (6) self-check sweep with `mutant-gen.js` in an export, `convention-check.js`, handoff.
- **Rulings that bind.** M5 capped (00:49Z). D-15 timing: over about 10 ms goes to steering. The two readings (marker class = `syntax`; emoji with no image stays text) are mine to record: the first is built; the second belongs to M6.
- **Approach in flight.** None; the tree is committed.
- **Local state not restored.** Scratch only: `scratchpad/export-m5`, `export-m4`, `export-tip`, `mut.py`, `stub_rows.py`.
- **Evidence run but not recorded.** None.
- **Questions sent.** None open. Owner questions: none.
- **Cache-warm wake.** Deleted at this checkpoint. Arm a new one on the next turn. The next step is slice 2 (code lines), per "Next, in order".
