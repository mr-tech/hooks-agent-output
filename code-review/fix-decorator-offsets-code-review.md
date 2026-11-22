---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Reviewed-At: 24eda1cdbcf980e91015582297daac0dfe4a0be1 — repos=website
Status: In Review
Round: 1
Verdict: APPROVED
---

# Code Review: fix-decorator-offsets

**Plan Reference**: none (fixer route). Scope: `steering/fix-decorator-offsets-rulings.md` blocks "2026-11-22T03:03", "2026-11-22T20:19"
(superseded), "2026-11-22T20:31" (superseded) and "2026-11-22T20:44" (current scope statement, record `601c68ca`).
**Implementation Reference**: `agent-output/implementation/fix-decorator-offsets-implementation.md` at record `c88dbcd4`, section "Round 2",
`Handoff-At: e6a5766 — repos=website`.
**Date**: 2026-11-22
**Reviewer**: `code-reviewer-fix-decorator-offsets`
**Evidence**: `/usr/local/bin/hooks/agent-output/verification/fix-decorator-offsets/code-review/`. Round 1 at `f57c260` is in the
directory root; the sub-entry at `e6a5766` is in `tip-e6a5766/`.

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T20:43 | `steering-hooks-fixer` (brief `steering/fix-decorator-offsets-brief-code-reviewer.md`) | Round 1 review of website `f57c260` | Round 1: REJECTED. CR-1 HIGH (bare URL at a run's edge, right → wrong); CR-2 MEDIUM to steering (other width faults moved). Argument in record `f6b9baa6`. |
| 2026-11-22T20:44 | `steering-hooks-fixer` | Ruling on CR-2 and write set | Round 1 note: re-scope to every node kind's source width; `rules.tsx` joins the write set; QA at 20+ lines. Record `2dc9572d`. |
| 2026-11-22T21:19 | `steering-hooks-fixer` (fixer hand-off, record `c88dbcd4`) | Round 1 sub-entry: re-review at website `e6a5766` | Round 1 sub-entry: APPROVED_WITH_COMMENTS. CR-1 and CR-2 resolved, measured by two instruments of different shape: 0 inputs colour worse than at base. CR-3 LOW (heading marker regex duplicated with a non-null assertion). CR-4 MEDIUM (a test row pins a pre-existing missing-outer-class defect; the defect is put to steering). 111 production lines, so QA Phase 2 is restored. Process note for the retrospective: the fixer disclosed one negative control run in the shared tree, restored before commit; the reviewed tree is the committed `e6a5766`, read from an export. |
| 2026-11-22T22:18 | `fixer-fix-decorator-offsets` (record `8a9082f5`) | Round 1 fix confirmation for CR-5 at website `24eda1c` | Round 1 sub-entry: APPROVED. CR-5 resolved (split lines 131/131, 0 worse than base). CR-6 LOW (empty-range filter removed; 2 zero-length highlight.js scopes found), routed. Suite 2612/2612, typecheck 0, red 2 at `a7e1adb`; 128 production lines, so QA Phase 2. |
| 2026-11-22T22:14 | `steering-hooks-fixer` | Ruling on the code-line emoji escalation | Round 1 note: the text loss folds into `fix-emoji-pretransform-widths` (next chain, block 22:13); this chain's scope is unchanged; CR-5 stays with the fixer. Verdict unchanged. |
| 2026-11-22T22:07 | `fixer-fix-decorator-offsets` (record `b7e392a0`) | Round 1 fix confirmation for QAF-1 at website `a7e1adb` | Round 1 sub-entry: REJECTED, CR-5 MEDIUM (severity floor). A code line split by an emoji element is highlighted per text node; 5 characters right at base are wrong. Lines without a language are identical to `2e6127e`; suite 2608/2608, typecheck 0. A pre-existing data loss (a Unicode emoji in a code line deletes the text after it, base and tip) is escalated to steering. |
| 2026-11-22T21:29 | `fixer-fix-decorator-offsets` (record `21813123`) | Round 1 fix confirmation at website `2e6127e` | Round 1 sub-entry: APPROVED. CR-3 and CR-4 resolved. Corpus, grammar oracle and heading edges identical to `e6a5766` (0 rows differ). Suite 2594/2594 exit 0, typecheck exit 0, red 151/77. 116 production lines, so QA Phase 2. |
| 2026-11-22T21:21 | `steering-hooks-fixer` | Ruling on CR-4 | Round 1 note: CR-4's defect goes to the queued chain `fix-decorator-nested-styles`; the fixer swaps the pinning fixture and takes CR-3; a scoped check of that delta comes before QA Phase 2. |

**Ruled 2026-11-22T21:21** (`steering/fix-decorator-offsets-rulings.md` block "2026-11-22T21:21"): the CR-4 defect goes to its own
queued chain `fix-decorator-nested-styles`, with the grammar oracle's rows as its acceptance set. In this chain the fixer swaps the
pinning test rows' fixture (test-only) and also takes CR-3. The reviewer runs a scoped check of that delta, and QA Phase 2 starts on
the scoped approval.

## Round 1 dispositions (at `f57c260`)

CR-1 HIGH Round 1 RESOLVED: bracketless links (bare URL, autolink) are walked by their own source geometry at `e6a5766`. The 5 grid shapes
are asserted as literal rendered leaves on three parsers (test table "shapes whose widths cancelled or shifted before"). Corpus and
grammar oracle show 0 rows worse than at base (sub-entry below). Captured check: `decorator.emphasis-syntax-ranges.test.ts`, rows
`**a https://x.y**` … `||a https://x.y||`.

CR-2 MEDIUM Round 1 RESOLVED: ruled into scope at 20:44 (record `601c68ca`). Escapes, mentions, timestamps, URLs, headings and same-kind
nestings are walked at source width at `e6a5766`. The 7 escape/mention rows are acceptance rows in the same test table, and heading
markers are coloured as syntax per the ruling. Captured check: the same test file plus `tip-e6a5766/decorator.grammar-oracle.test.ts`.

## Round 1 sub-entry — website `e6a5766`

Tree: `e6a57665600c8897d3f71e9b69cb52119b522283` (`git rev-parse HEAD`, read at start and end: unchanged). Commits since `f57c260`:
`2ad482a`, `e6a5766`. The re-scope moved the work well past CR-1/CR-2's sites, so the whole delta from base `8845b7e` was reviewed as a
first review of this tree, recorded as a sub-entry as steering directed.

**Criteria assessed** (block 20:44, at round open): (1) ranges account for the source width of every node kind `rules.tsx` produces;
(2) no input colours worse than at base; (3) a test drives every kind alone, at a bold/italic edge and at root, with literal
expectations; (4) heading markers coloured as syntax.

**Production lines**: `git diff --numstat 8845b7e e6a5766`: `decorator.tsx` 102/39, `src/utils/markdown/rules.tsx` 9/1, test 410/0.
Under GLOSSARY "Production line" that is **111**, which restores **QA Phase 2** (block 20:44). Because of that the under-20 review runs
are not owed, but I ran them anyway as evidence.

### Runs

The same export method as round 1: `git archive` of `e6a5766` and `8845b7e` in scratch, `node_modules` symlinked, `next-env.d.ts`
copied, memory-capped suite runs.

| Run | Tree | Result | Exit | Evidence (`tip-e6a5766/`) |
|---|---|---|---|---|
| Whole suite, JSON reporter | `e6a5766` | 168 files, 2593 tests, all passed, `success: true` | 0 | `r2-suite.txt`, `r2-suite.json.gz` |
| `pnpm run typecheck` | `e6a5766` | clean | 0 | `r2-typecheck.txt` |
| Red: tip test file against base `decorator.tsx` + `rules.tsx` | `8845b7e` + test | 227: 150 failed, 77 passed | 1 | `r2-red.txt`, `r2-red.json.gz` |
| `convention-check.js website --since=8845b7e` | shared tree at `e6a5766` | 0 FAIL, 0 CANDIDATE; ID-token/basename SKIP | 0 | `r2-convention.txt` |
| By hand: ID-token class over the test file; `^\s*//` comment lines added in the three files | `e6a5766` | 0; 0, 0, 0 | — | this table |

These reproduce the fixer's figures.

### Behaviour: no input worse than at base

Two instruments of different shape, both running the tree's real `decorator` and the real interactive parsers:

1. **Corpus differential** (mine, from round 1, unchanged: `decorator.differential-probe.test.ts` + `visible.mjs`). 36,000 rows: 23,458
   visibly changed, **0 clean → wrong**, 0 wrong at both, 16,258 wrong → clean, 7,200 the oracle cannot decide. No throws and no
   reversed ranges at the tip (`r2-visible-summary.txt`, `probe-tip.json.gz`). This reproduces the fixer's run of the same instrument.
   The blind spot is as stated in round 1: the oracle scores only syntax placed on prose and URL characters.
2. **Grammar oracle** (new, built so its blind spot differs: `decorator.grammar-oracle.test.ts` + `score-oracle.mjs`). It generates
   4,000 markdown trees from {words, strong, em, underline, strike, spoiler, bare URL, autolink, masked link, mention, escape, inline
   code}, nested up to 3 deep, with an optional heading marker. It serialises each tree and derives the **expected rendering of every
   character from the generated tree**: delimiters are syntax; content carries exactly its enclosing style classes; a masked target
   carries `linkText`. Each string is rendered through `decorator` and Slate's `Text.decorations` (the consumer slate-react 0.123 uses)
   on `parseContent` and `parseEmbedField`: 7,137 rows. Result: base correct 911, tip correct 3,496, **worse than base 0**, better
   2,585 (`oracle-summary.txt`). **Every** remaining tip mismatch is a missing enclosing class. No tip row misplaces a syntax character.
   Not matched: same-kind nesting, `_` emphasis, titles on links, the embed-title parser, newlines, and kinds outside the grammar.
   The edge probe below covers those.
3. **Edge probe** (`edge.json`, 42 hand-picked geometries: space-only headings, `#  **a**  `, heading inside bold, `(t)` and `'t'`
   titles, `[a]()`, `[](…)`, `[a\]](…)`, `<a:e:1>`, `<t:1>`, `<mailto:…>`, trailing-punctuation URLs, quote/heading mixes, a newline
   inside the text, `@here`). 0 throws, 0 reversed or negative ranges at the tip on all three parsers. Each `parseContent` pair was read
   against its text; each tip result is right or no worse than base (`edge-*.json.gz`).

The fixer's expectations were transcribed from the fix's own output, as the fixer disclosed. Instrument 2 is independent of the code
under test and agrees with every syntax position in its population. That supports the transcribed literals except where CR-4 applies.

### Design and code

- `rules.tsx` stamps `source: capture[0]` on every interactive node and keeps the raw masked-link target. The stamp is exactly the text
  the rule consumed, so widths come from the source instead of a table. The static parser is untouched. The interactive parse output
  also reaches `getInitialValue.ts` and `withNormalizeNode.ts` (via `parseEmoji`), which store emoji nodes as `element.ast`; the added
  `source` field is unread there (`renderElementFactory.tsx`, `flattenNodeText.ts` read `content`, `name`, `src`, `emojiId`, `animated`,
  `jumboable`).
- The non-enumerable `node` back-link on content arrays recovers nodes that `flattenAst` replaced. It is invisible to typing (cast in
  `unflattened`) and couples the decorator to `flattenAst`'s behaviour. Acceptable given that `flattenAst` is outside the write set.
  Noted for maintainers, not a finding.
- Limbs removed as unreachable are each backed by a control or a 0-of-36,000 corpus comparison (fixer's document). I did not re-run
  the 38 mutants: the mutation sweep is QA's at Phase 2.
- Architecture: `architecture/system-architecture.md` has no passage on `walkAst`. Its one decorator entry (`_emitter`) is untouched.
  ALIGNED.

## Findings (sub-entry)

### Critical
None.

### High
None.

### Medium

CR-4 MEDIUM Round 1 RESOLVED: the pinning fixture was replaced at `2e6127e` by `__||c d[a](https://x.y)||\*https://x.y` for the
content and field rows (the spoiler closes after the link). No leaf in the expectation now sits after a sibling run inside a shared
enclosing run; I read both rows against the text. The defect itself went to the queued chain `fix-decorator-nested-styles`
(rulings block 21:21), with the grammar oracle's rows (`tip-e6a5766/oracle-tip.json.gz`) as its acceptance set. Captured check:
`decorator.emphasis-syntax-ranges.test.ts`, those rows.

### Low/Info

CR-3 LOW Round 1 RESOLVED: at `2e6127e` the interactive `heading` rule stamps `markerWidth` from its own captures, and `openingWidth`
reads `ast.markerWidth ?? 0`. Sweep re-run: `git grep -cE "HEADING_MARKER|as RegExpExecArray" 2e6127e -- src` → 0 (exit 1), so no
throwing cast is left. The other two source-text sites (`isMaskedLink`, the link opening) fall back to false or 0 and stay as
recorded. Captured check: the added row `' # **a**'` (leading-space offset) and the heading rows of the test.

### Fix confirmation — website `2e6127e` (2026-11-22T21:29)

Delta `e6a5766..2e6127e` (one commit): `rules.tsx` +8, `decorator.tsx` +2/−5, test +3/−2. Production lines from base: `rules.tsx` 17 +
`decorator.tsx` 99 = **116**, so QA Phase 2 still applies. Re-verified (`tip-2e6127e/`), in a fresh `git archive` export:

| Check | Result |
|---|---|
| Suite | 168 files, 2594/2594 passed, exit 0 (`r3-suite.txt`) |
| `pnpm run typecheck` | exit 0 (`r3-typecheck.txt`) |
| Red: tip test against base | 228 cases: 151 failed, 77 passed, exit 1 (`r3-red.txt`) |
| `convention-check --since=8845b7e` (shared tree at `2e6127e`) | 0 FAIL, 0 CANDIDATE, exit 0 (`r3-convention.txt`) |
| Corpus probe, `e6a5766` vs `2e6127e` | **0 of 36,000** rows differ (`probe-tip3.json.gz`) |
| Grammar oracle, `e6a5766` vs `2e6127e` | 0 of 7,137 rows differ; against base, 0 worse (`oracle-tip3.json.gz`) |
| Edge probe + 6 heading-spacing shapes (`edge3.json`: leading spaces, `  ## **b** ##`, tab, trailing `#  `, mid-line `###`) | 0 of 288 rows differ; 0 throws (`edge3-*.json.gz`) |

The fixer's `markerWidth` takes the first `#` run from `capture[1]` and then every following space. For each heading shape probed,
including space-only content, that equals the removed greedy `HEADING_MARKER`, so behaviour is unchanged and only the source of
the width moved.

### Fix confirmation — website `a7e1adb`, QAF-1 (2026-11-22T22:07)

Delta `2e6127e..a7e1adb` (one commit, for QA's QAF-1 in `qa/fix-decorator-offsets-qa.md`): `decorator.tsx` +11/−10, test +27/−6.
Production lines from base: 101 + 17 = **118**. Now, a line whose element has a `lang` is highlighted with highlight.js over
`node.text`; other lines parse and walk as before, with top-level text merged.

The mechanism claim holds. `withNormalizeNode.ts` `handleEditor` and `getInitialValue.ts` set `lang` only where
`isFullCodeBlock`/`isCodeBlock` is true, which is a line inside a block that contains no ```` ``` ````.

| Check (`tip-a7e1adb/`) | Result |
|---|---|
| Suite (export) | 2608/2608, exit 0 (`r4-suite.txt`) |
| `pnpm run typecheck` | exit 0 (`r4-typecheck.txt`) |
| Corpus probe and grammar oracle, `2e6127e` vs `a7e1adb` (all lines without a language) | 0 of 36,000 and 0 of 7,137 differ |
| **Code line split by an emoji element** (`decorator.code-split-probe.test.ts`; 10 lines in js/python/ts/json, each decorated as two text nodes the way the editor holds them, scored per character against the same line highlighted whole) | right: base 80/131, `2e6127e` 100/131, `a7e1adb` 110/131. **5 characters right at base are wrong at `a7e1adb`** (6 against `2e6127e`), in 4 of the 10 lines: `const s = "a │ b";`, ``f(`t │ ${y}`);``, `print("x │ y")`, `type T = "a │ b";` (`split-*.json`) |
| Is the split reachable? (`withNormalizeNode.code-emoji-probe.test.ts`: `getInitialValue`, then `withNormalizeNode(withEmojis(createEditor()))`, `Editor.normalize({ force: true })`) | yes. A `js` block line with `:smile:` becomes `["const s = \"a ", <emoji>, " b\";"]` at base and tip (`norm-*.json`) |

CR-5 MEDIUM Round 1
- **Category**: Correctness / the scope criterion "no input colours worse than at base" (block 20:44)
- **Title**: A code line split by an emoji element is highlighted one text node at a time, and some characters regress from base
- **Location**: `decorator.tsx`, default export, the `if (ancestor.lang)` branch: `handleCodeBlockRange(leaf, ancestor.lang, node.text)`.
- **Class**: Code highlighting tokenises less than the line. Any line whose `codeBlock` element holds more than one text node (an emoji
  element between them) is highlighted per node, so a token that spans the split (a string, template or comment) restarts in the
  second node.
- **Enumeration**: `decorator`'s only line-level input is `[node, path]`, one text node. Every `codeBlock` element with an emoji element
  child is in the class. That is reachable by `withNormalizeNode`'s lifting of any emoji in a code line (`handleElement` runs for
  every non-emoji element, `codeBlock` included). Measured: 10 hand-picked lines, 4 with a regression, 5 of 131 characters right →
  wrong against base (30 wrong → right). **Not matched**: more than one emoji per line, emoji at a line's start or end, and languages
  outside js/python/ts/json. Population not measured, so it is QA's.
- **Magnitude**: measured in jsdom on the real decorator and normalizer: 5 of 131 characters in a hand-picked set. It is not a usage
  measure. Display only.
- **Issue**: the round's own claim is "0 right → wrong over 195 languages". QA's scorer drives one text node per line, so it cannot
  see this. The scope criterion is a no-worse-than-base property, and no assertion covers the split line, so the severity floor
  applies: MEDIUM, blocking.
- **Required Action**:
  - **Preferred (structural)**: highlight the line once and project the result onto each text node. Join the element's children's
    text (an emoji element contributes its source width, e.g. `flattenNodeText`'s content), highlight that string, then emit for
    `[node, path]` only the ranges inside that node's span, offset to it. The token stream is then the whole line by construction.
  - **Minimum**: none that keeps the criterion. Per-node highlighting with a wider context is the same projection.
  - **Callers**: `decorator`'s sole caller is `SlateEditor/index.tsx` `decorate=`. Lines without a language are unchanged by either
    form.
  - **Test shape**: a `codeBlock` element with children `[span "const s = \"a ", emoji element, span " b\";"]`, decorating the second
    span. Expected: literal leaves showing ` b"` as `hljs-string` and `;` uncoloured, read from highlight.js's HTML for the whole line.
    The fixture property: a string token opens before the emoji and closes after it. Falsity signature at `a7e1adb`: an assertion
    failure where ` b` is received without `hljs-string`.

**Found, pre-existing, outside the write set (escalated to steering, not this chain's):** a Unicode emoji inside a fenced code line
**deletes the text after it** on normalize. `getInitialValue` leaves a code line as one span, then `withNormalizeNode` lifts the emoji
using offsets from `parseEmoji`'s pre-treated text (`:slight_smile:`, wider than `🙂`), and the insert's range swallows what follows.
For `const s = "a 🙂 b";` the children become `["const s = \"a ", <emoji>, ""]`, with ` b";` gone, at **base and tip alike**
(`norm-base2.json`, `norm-tip4.json`). This was observed in jsdom with the real plugins, not in a browser. Ordinary lines are not
affected (`a 🙂 b` keeps ` b`), because `getInitialValue` lifts their emoji itself. This is the round-2 emoji pre-treatment item, now
with a data-loss signature.

### Fix confirmation — website `24eda1c`, CR-5 (2026-11-22T22:18)

Delta `a7e1adb..24eda1c` (`7708a8a`, `24eda1c`): `decorator.tsx` gains `codeLineRanges`. It highlights `flattenNodeText(line)` once,
then shifts the ranges by the flattened width of the children before the node. At `24eda1c` the shifted ranges are no longer
clamped or filtered. Production lines from base: 111 + 17 = **128**.

CR-5 MEDIUM Round 1 RESOLVED: split code lines are highlighted as the whole line. My split probe at `24eda1c`: 131/131 characters
equal the whole-line rendering (base 80, `a7e1adb` 110), and **0 right at base → wrong**. The 10 unsplit lines are identical to
`a7e1adb`. Captured check: the test's 4 split-line rows; at `a7e1adb` 2 fail, with ` b"` received without `hljs-string` and
` d` without `hljs-comment` (`r5-red.txt`).

Unclamped ranges: slate-react 0.123's `Text` passes the node's decorations to `slate.Text.decorations`. That function skips a
range whose end is at or before the leaf's start (`decorationEnd < leafStart`, or `=== leafStart` when the range is non-empty), and
any range starting at or after the leaf's end. I read the dist code, and the split probe renders through it.

| Check (`tip-24eda1c/`) | Result |
|---|---|
| Suite (export) | 2612/2612, exit 0 (`r5-suite.txt`) |
| `pnpm run typecheck` | exit 0 |
| Red: tip test file against `a7e1adb` production | 246: 2 failed (the split rows above), exit 1 |
| Corpus probe / grammar oracle vs `a7e1adb` | 0 of 36,000 / 0 of 7,137 differ |
| Split probe | 131/131, 0 worse than base (`split-tip5.json`) |

CR-6 LOW Round 1
- **Category**: Checks removed on survival evidence alone
- **Title**: The empty-range filter on the code-line path was removed, but highlight.js does emit zero-length scopes
- **Location**: `decorator.tsx`, `codeLineRanges` (no `anchor < focus` filter, unlike the markdown path's return).
- **Class**: A guard is removed because its negative control survived. Survival shows no test reaches the guard; it does not show
  the guarded input is unreachable.
- **Enumeration**: `hljs-empty-scopes.cjs`: 193 languages × 25 sample lines, **2 zero-length scopes** (`haxe` `{"a": ""}` → `type`;
  `profile` `f()` → `string`). An empty range inside a leaf is not skipped by `Text.decorations` (start equals end), so it splits the
  leaf and adds an empty leaf. Not matched: sample lines beyond the 25.
- **Magnitude**: unmeasured hypothesis on rendering. An extra empty leaf in a code line has no visible colour, and its caret effect
  is not established. Base had no filter on this path either, so it is not worse than base.
- **Required Action**: none for this release. **Preferred**: one exit filter shared by both paths. Routed with the queued
  `fix-decorator-nested-styles` chain, which works in the same function (steering, below).

## Verdict

**Status (current, at `24eda1c`)**: APPROVED. CR-5 resolved, CR-6 LOW routed. QA Phase 2 re-verifies QAF-1 at `24eda1c` (128 production lines).
**Earlier status (at `a7e1adb`)**: REJECTED: CR-5 (severity floor on the scope's no-worse-than-base criterion).
**Earlier status**: APPROVED (round 1 sub-entry, fix confirmation at `2e6127e`)
**Rationale**: every criterion of block 20:44 is met, and no input colours worse than at base by two independent instruments.
CR-1 to CR-4 are all resolved. The CR-3 change is behaviour-identical on the corpus, the grammar oracle and the heading edge shapes.
Suite, typecheck and red run are clean.

## Required Actions

1. None in this chain (CR-5 resolved at `24eda1c`). CR-6 LOW goes to steering as a row for `fix-decorator-nested-styles`.
2. The pre-existing code-line emoji text loss, ruled 2026-11-22T22:13 (`steering/fix-decorator-offsets-rulings.md` block "22:13"):
   it folds into the fixer chain `fix-emoji-pretransform-widths`, which runs next after this one. Its evidence is this review's
   `tip-a7e1adb/withNormalizeNode.code-emoji-probe.test.ts` and `norm-*.json`. This chain's scope is unchanged.

CR-4's defect is carried by `fix-decorator-nested-styles`.

## Assumption Not Checked

Round 1: This review assumes that a real browser's Slate rendering splits leaves exactly at the ranges `decorator` returns. If that is
false, a browser would show different coloured characters than `Text.decorations` produces in jsdom on a URL or heading line. Owner:
devops's post-deploy walk on the Vercel production deploy of website `master`.

Round 1 sub-entry: This review assumes that the editor's text leaves never hold a Unicode emoji that `interactiveParser`'s
`translateSurrogatesToInlineEmoji` rewrites to a wider `:name:`, because `withNormalizeNode.ts` (`parseEmoji`) lifts every recognised
emoji into its own element. I read that and did not run it. If the assumption is false, a mounted editor holding `🙂 **a**` in one
text leaf would colour `**a**` at offsets shifted by the rewrite. Owner: QA Phase 2 (`qa-fix-decorator-offsets`), with a jsdom-mounted
`SlateEditor` typing an emoji before bold text. This is beside steering's routing of the pre-transform item the fixer raised.

## Next Steps

- **Steering** (`steering-hooks-fixer`): resume QA Phase 2 at `24eda1c`, and carry CR-6 to `fix-decorator-nested-styles`.
- **QA** (`qa-fix-decorator-offsets`): QAF-1 re-verified at `24eda1c`, including split code lines (`tip-24eda1c/split-tip5.json`, probe
  `tip-a7e1adb/decorator.code-split-probe.test.ts`).
- **Devops**: round 1's assumption, at the post-deploy walk.
