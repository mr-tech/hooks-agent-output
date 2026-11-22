---
ID: n/a
Origin: fix-emoji-pretransform-widths
UUID: 27c7b0a0
Reviewed-At: c2fee5ca8a40e41ab86386d84625e684d4cf8b16 — repos=website
Status: In Review
Round: 1
Verdict: REJECTED
---

# Code Review: fix-emoji-pretransform-widths

**Plan Reference**: none (fixer route). Scope statement: `steering/fix-emoji-pretransform-widths-rulings.md` block "2026-11-22T22:59".
**Implementation Reference**: `agent-output/implementation/fix-emoji-pretransform-widths-implementation.md` (record `eaecd18d`), `Handoff-At: c2fee5c — repos=website`
**Date**: 2026-11-22
**Reviewer**: `code-reviewer-fix-emoji-pretransform-widths`

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T23:23 | `steering-hooks-fixer` (brief `steering/fix-emoji-pretransform-widths-brief-code-reviewer.md`) | Review the fix at website `c2fee5c` | Round 1: REJECTED on CR-1 (HIGH). The new offset map moves an emoji into a neighbouring `:name:` token the rename manufactured, so `wow :o🙂` loads and types as `wow :o:` and the 🙂 is deleted. CR-2 LOW, CR-3 pre-existing, routed. SHA `c2fee5c` was the same at start and end. The stamp gate refused a typed time in this row; I replaced it with the clock's. |

## Scope and criteria assessed (recorded before reading the diff)

These are the scope statement's three properties: (1) `handleElement` keeps every character of a typed or pasted line with an emoji, in a fenced code line too, and an escape before an emoji shifts nothing; (2) `getInitialValue` loads a stored message with its text unchanged, an escaped emoji included; (3) `decorator.tsx` colours formatting after an emoji at its true position. Exclusion: an emoji element's `:name:` stored form.

Production lines: `git diff --numstat febf20e c2fee5c` gives 6 + 9 + 14 + 15 + 21 + 5 = **70** over the six non-test paths. This re-derives the fixer's 70, so QA Phase 2 follows approval.

## Architecture Alignment

**System Architecture Reference**: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`. It exists: `ls -d` listed it, and `git -C /usr/local/bin/hooks/agent-output ls-files -- architecture/system-architecture.md` counted 1 path.
**Alignment Status**: ALIGNED

`grep -i` for the touched symbols over `system-architecture.md` and `website.md` returns only the Problem Areas row on `decorator.tsx` reading highlight.js's private `_emitter`. That path (`codeLineRanges`) is untouched. The pattern claim was checked: the non-enumerable `sourceOffset` on the parse array mirrors `rules.tsx` `interactiveBaseRules`, which `Object.defineProperty`s `node` onto content arrays (read at `c2fee5c`). Every producer of an interactive parse is `interactiveParser` (`git grep` of `InteractiveParser`: the four entries of `utils/markdown/index.tsx` `interactive`), so every real result carries the map.

## TDD Compliance Check

**TDD Table Present**: The fixer route keeps red/green and controls in place of a table. Red run at `febf20e` (19 assertion failures, plus the escaped-emoji case's non-settling normalizer), green suite at `c2fee5c`, and 11 negative controls, all KILLED.
**All Rows Complete**: Yes for the cases written.
**Concerns**: The new tests are spec-form and drive the real `markdown.interactive` parsers with literal expectations. Their names match the positive form. `convention-check.js website --since=febf20e`: exit 0, 0 FAIL, 0 CANDIDATE, 18 SKIP (17 `.playwright-mcp` captures, plus the id-token/basename check, which the checker does not implement). The id-token check is unchecked by tool. A read of the two new basenames and their titles finds no token (`verification/fix-emoji-pretransform-widths/code-review/convention-check-c2fee5c.txt`). The cases' fixtures never put a `:name:` token next to a renamed emoji, which is CR-1's class.

**Lint value-neutrality** (brief item): `(c && lang) || ''` → `c && lang ? lang : ''`. If `c` is falsy, both give `''`. If `c` is truthy and `lang` falsy, both give `''`. If both are truthy, both give `lang`. The two signature wraps are layout only. This is value-neutral by exhaustion of the three truth cases.

## Process whose output is the evidence

The evidence is the real `markdown.interactive.parseEmoji` / `parseContent`, the real `getInitialValue`, the real Slate normalizer (`withNormalizeNode(withEmojis(withHistory(withReact(createEditor()))))`) and the real `decorator`, run in `git archive` exports of `febf20e` and `c2fee5c`. I authored only the corpus and the oracle. The oracle is `canon(out) === canon(in)`, where `canon` = `translateSurrogatesToInlineEmoji` because the exclusion stores an element as `:name:`. Its blind spot: it accepts any text rewrite that renames to the same string. Base's `:o🙂` → `:o:slight_smile:` passes it, which is why the "regressions against base" figure below under-counts base's own damage and over-counts the fix's.

Instruments, under `verification/fix-emoji-pretransform-widths/code-review/`:
- `probe.review.test.tsx.txt`: a seeded random corpus of 400 lines over 19 tokens, plus 7 fixed lines. Outputs `probe-febf20e.jsonl` and `probe-c2fee5c.jsonl` (407 rows each), exits `probe-*.exit` (0).
- `parse-dump.review.test.ts.txt` → `parse-dump-c2fee5c.json`: node-by-node renamed and mapped spans.
- `realistic.review.test.ts.txt` → `realistic-{febf20e,c2fee5c}.json` (exit 0).

| Quantity (`grep -c` over the jsonl) | base `febf20e` | fix `c2fee5c` |
|---|---|---|
| load not canon-equal | 55 | 10 |
| typed line not canon-equal | 119 | 10 |
| typed run threw | 5 | 0 |
| decorator labels differ from the renamed line's | 17 | 0 |
| decorator range outside the text | 20 | 3 |

The hazards from the common part, re-derived through the real parser: E-1 (`x🙂 abcdefghijklmnopq`) keeps every character at fix and loses them at base. E-2 (`\🙂 **a**`) loads unchanged at fix. An escape before an emoji is fine. The decorator after an emoji is fine (`🙂 *a*`, `👍🏻 *a*` give the same labels as the renamed line). The fix delivers each stated hazard. The residue is CR-1.

## Findings

### Critical
None.

### High

**CR-1 HIGH Round 1 Correctness**: An emoji next to a `:name:` token that the rename manufactured is deleted on load and on typing
- **Location**: `src/utils/markdown/emoji.tsx` `surrogateSourceOffset` (the `if (offset < end) return sourceEnd;` branch), as applied by `withNormalizeNode.ts` `handleElement` and `getInitialValue.ts` (default export), at `c2fee5c`.
- **Class**: A node of the interactive parse whose span in the renamed text starts or ends strictly inside a renamed emoji's `:name:` was produced by the pretreatment, not by the user's text. Any consumer that maps such a node's span back to the original text misattributes the emoji's characters. When the node is an emoji node, the element replaces them and the emoji is lost.
- **Enumeration**: `probe-c2fee5c.jsonl`: 10 of 407 rows fail `loadOk`, and the same 10 fail `typedOk`. The parse dump shows each is a straddle. Two forms:
  - The end is inside a name: `:ok🙂` → `:ok:slight_smile:`. The nameEmoji `:ok:` spans renamed `[0,4]`, mapped to `[0,5]`.
  - The start is inside a name: `\🙂ok:` and `:_🙂ok:`. The name's closing colon opens `:ok:` at renamed `[14,18]`, mapped to `[3,6]`.

  Realistic lines (`realistic-*.json`): `wow :o🙂` loads as `wow :o:`, and `no :x👍 ok` as `no :x: ok`, at fix. At base they load as `wow :o:slight_smile:` and `no :x:thumbsup: ok`. 8 rows pass `loadOk` at base and fail it at fix (`python3` diff of the two jsonl files, in the round's commit). Typing has no regression, but it is still lost at fix (base wrote a lone surrogate, `:ok:\ude42 a`). What this predicate does not see: the corpus uses only the emoji names `ok` and `a`, so the other names are unmeasured. It also misses multi-line messages, code lines, custom emoji `<:x:id>` adjacent forms, and a straddle in the decorator, whose canon-based oracle cannot see a misattributed range.
- **Issue**: The fix's own property (2), "a stored message loads with its text unchanged", fails. `SlateEditor/index.tsx` writes the loaded value back through `onChange`, so opening a message saved as `wow :o🙂` silently rewrites it to `wow :o:` (⭕). The emoji is gone, not renamed. Property (1) fails the same way when typing `:o` and then an emoji. Magnitude: measured on 407 generated lines (10 affected, about 2.5% of a corpus deliberately dense in `:` and emoji), on Node with vitest. The production rate is not measured. The trigger needs a colon that starts a token, a real emoji name, then an emoji with no space (`:o`, `:x`, `:a`, `:ok`, `:100`…). `:D🙂`, `:P👍` and `10:30🙂` are unaffected (`realistic-c2fee5c.json`).
- **Required Action**: eliminate the class, meaning no parse node may straddle a rename boundary in any consumer.
  - **Preferred (structural)**: stop the pretreatment from manufacturing tokens. The interactive parser should either recognise surrogate emoji in the original text (the `emoji` rule already matches `EMOJI_RE` on surrogates), or make each renamed name atomic to the parser, so that no rule's capture can begin or end inside one. Then every node's span maps exactly, and the `return sourceEnd` branch becomes unreachable. Cost: the static parser shares `translateSurrogatesToInlineEmoji`, but it does not consume widths. State what each of the three `sourceOffsetOf` callers does under this change.
  - **Minimum**: in `surrogateSourceOffset`'s consumers, an emoji node whose renamed start or end falls strictly inside a renamed name is not converted. It stays text, and so does the straddled emoji. A text node already keeps its characters under the present map, and `\🙂` relies on that. Apply this at `handleElement`, `getInitialValue` and the decorator's emoji handling.
  - **Test shape** (expectations independence): spec-form cases through the real parser, asserting the loaded text and the typed line equal the input literally, e.g. `'wow :o🙂 a'` → `'wow :o🙂 a'`. Include both straddle directions. Fixture property: the straddling name is a real emoji name, and the straddle is neither first nor last on the line. Falsity signature: an assertion mismatch showing the emoji's characters missing (`'wow :o: a'`), never a timeout. Show it red at `c2fee5c`.

### Medium
None.

### Low/Info

**CR-2 LOW Round 1 Maintainability**: The parse result's `sourceOffset` is invisible to the type, so a parser without it compiles and throws
- **Location**: `src/components/SlateEditor/utils/common.ts` `sourceOffsetOf`; `src/@types/simple-markdown.d.ts` `InteractiveParser`.
- **Class**: A runtime contract (every interactive parse carries `sourceOffset`) that is held only by a cast through `unknown`.
- **Enumeration**: `git grep -c "sourceOffsetOf(" c2fee5c -- src` gives 4 files: the definition and its 3 callers. Parser mocks returning a bare array: `DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx` (`parseEmoji: () => []`). Today that mock never reaches `toSource`. The grep misses mocks that return a non-empty array.
- **Issue**: Removing the identity fallback (`8cb9265`) was right, since no test could turn it red. But the type now lets a mock or a future parser return a plain array, which fails as `TypeError: toSource is not a function` at the first emoji, not at compile time.
- **Required Action**: Preferred: declare the return type of `InteractiveParser` as `StrictSingleASTNode[] & { sourceOffset(offset: number): number }` and delete the cast. The cost is the mock above, which must then supply the property. Minimum: none required. This finding does not block on its own.

**CR-3 LOW Round 1 pre_existing**: The decorator emits ranges past the line's end on lines with `#`
- **Location**: `src/components/SlateEditor/utils/decorator.tsx` (default export), at `febf20e` and `c2fee5c`.
- **Class**: A decorator range whose offsets fall outside `[0, text.length]`.
- **Enumeration**: `grep -c '"decoOutOfBounds":[1-9]'` gives 20 at base and 3 at fix (`:ok:# ~~`, `# :_#bc👍🏻`, `#~~:ok:#  `). Two of the three have no surrogate emoji, so this is not this chain's rename. No row is newly out of bounds at fix. The predicate does not see an in-bounds range that is misplaced.
- **Required Action**: Out of this chain's scope (it is not a width of the rename). Routed to `steering-hooks-fixer` for a carrier. Not a hold on this tree.

## Verdict

**Status**: REJECTED
**Rationale**: CR-1 (HIGH). The fix makes property (2) false for a class of stored text, `:o🙂`. Where base renamed the emoji, the fix deletes it on load, and the editor writes that back. Everything else the scope names is delivered and verified through the real parser.

## Required Actions

1. CR-1: eliminate the straddle class (Preferred or Minimum above), with the red-first spec-form cases described there.
2. CR-2: optional with the round.
3. Re-review covers the fix diff as a sub-entry of Round 1. I will re-run `probe.review.test.tsx.txt`, extended with more real names and both straddle directions, at the new SHA.

## Assumption Not Checked

This review assumes Slate applies `handleElement`'s insert and the browser's real paste and IME the same way `Transforms.insertText` does in jsdom, and it does not test that. Falsity signature: a pasted `x🙂 abcdefghijklmnopq` in the deployed editor loses or duplicates characters while the jsdom case passes. The owner is QA Phase 2, as a browser walk on a local build, before devops's merge.

## Next Steps

- Implementer: `fixer-fix-emoji-pretransform-widths` for CR-1 (and CR-2 at its choice). Copied to `steering-hooks-fixer`.
- `steering-hooks-fixer`: a carrier for CR-3. QA Phase 2 owns the assumption above once a fixed tree is approved.
