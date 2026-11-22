---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Reviewed-At: e6a57665600c8897d3f71e9b69cb52119b522283 — repos=website
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
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

CR-4 MEDIUM Round 1
- **Category**: Test Conventions (axiom D) / pre-existing defect found along the way
- **Title**: A test row asserts a known-wrong missing spoiler class; the class-propagation defect behind it is pre-existing
- **Location**: `src/components/SlateEditor/utils/__tests__/decorator.emphasis-syntax-ranges.test.ts`, table "rendered text for shapes
  whose widths cancelled or shifted before", rows `content` and `field` for `__||c d[a](https://x.y)\*https://x.y||`. These expect
  `"https://x.y":linkText` for a URL inside a spoiler. Defect site: `decorator.tsx`, `normalizeRanges`, which inherits classes only
  from the previous non-syntax range (`prevMarkup`), not from every enclosing range.
- **Class**: A rendered leaf drops the style class of an enclosing run whenever an earlier sibling's range was the last markup seen.
  For example, base and tip both render `||**a** __b__||` with `b` as `uText` only, without `spoilerText` (`cls-*.json.gz`).
- **Enumeration**: the grammar oracle's mismatch set: 3,641 of 7,137 rows at the tip, every one a missing enclosing class
  (`oracle-summary.txt`). It is present at base in those rows or worse, so it is not a regression. In the test file I read all 221
  table rows: only the two rows above assert a leaf lacking an enclosing class. Masked-link targets rendering `linkText` alone are the
  long-standing design and are not counted. **Not matched**: the grammar has no same-kind nesting, `_` emphasis or headings beyond the
  marker, so the population figure is bounded to the grammar.
- **Issue**: the row pins a known-wrong value (Test Conventions axiom D). A future fix to class propagation would turn it red and look
  like a regression. The defect itself is a different property from the 20:44 scope (widths). It is display only and not worse than
  base: spoilered or struck text loses that style in the editor when it follows a sibling run.
- **Required Action**:
  - **Defect**: put to steering (under "fix everything you find along the way") to choose between this chain, which takes QA's line
    count higher, and its own chain or a handoff. **Preferred (structural)** for whoever takes it: each range carries the classes of
    every enclosing range, for example an ancestor stack in the walk, so inheritance cannot depend on sibling order.
  - **Test, if the defect is not taken here**: replace the pinned leaf with a fixture that keeps what the row is for (an escape between
    a masked link and a bare URL) without an enclosing run around the URL, or with the URL first in its run. **Fixture property**: no
    leaf in the expectation may sit after a sibling run inside a shared enclosing run. This is a test-only diff, the scoped check here,
    with test adequacy QA's at Phase 2. If the defect is taken, the row's expectation gains `spoilerText` and goes red first.

### Low/Info

CR-3 LOW Round 1
- **Category**: Maintainability (duplicated grammar knowledge)
- **Title**: The heading marker's width is re-parsed by a second regex with a non-null assertion
- **Location**: `decorator.tsx`, `HEADING_MARKER` and `openingWidth` (`HEADING_MARKER.exec(sourceOf(ast)) as RegExpExecArray`), against
  `rules.tsx` `heading.match` (`/^ *(#{1,3}) +([^\n]+?)#* *(?:\n|$)(?:\n|$(?=\s))*/`).
- **Class**: The decorator re-derives a node's geometry from source text with its own pattern instead of reading what the parsing rule
  captured. If the two patterns drift, `exec` returns `null` and decorate throws on every render of that line.
- **Enumeration**: `git grep -nE "HEADING_MARKER|startsWith\('\['\)|/\^\[\[<\]/" e6a5766 -- src/components/SlateEditor/utils/decorator.tsx`
  → 4 lines, 3 sites: the `HEADING_MARKER` declaration and its use in `openingWidth`, `isMaskedLink`, and the link opening in
  `openingWidth`. Only the heading site carries a cast that can throw. The other two fall
  back to 0 or false. Today the patterns agree: the edge probe's space-only and trailing-`#` headings produce no throw and no negative
  width. Not matched: geometry implied by `DELIMITERS`, which is the pre-existing table.
- **Required Action**: **Preferred (structural)**: the heading rule's interactive parse stamps its marker width (`capture[0]` up to
  the content), as it already stamps `source` (`rules.tsx` is in the write set), and the decorator reads it. **Minimum**: none owed
  for release. LOW, approved without it.

## Verdict

**Status**: APPROVED_WITH_COMMENTS (round 1 sub-entry, `e6a5766`)
**Rationale**: every criterion of block 20:44 is met, and no input colours worse than at base, measured by two independent
instruments. Suite, typecheck and red run are clean, and the code is coherent. CR-4 is a test row asserting a pre-existing
class-propagation defect, routed to steering for scope. CR-3 is LOW. No finding changes the release decision.

## Required Actions

1. CR-4: steering rules whether class propagation joins this chain. If not, the fixer replaces the pinned leaf (test-only, scoped
   check here) before release.
2. CR-3: optional.

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

- **Steering** (`steering-hooks-fixer`): CR-4 scope ruling, and start QA Phase 2 (111 production lines, block 20:44).
- **QA** (`qa-fix-decorator-offsets`): Phase 2 at `e6a5766`, including the mutation sweep and the sub-entry's assumption above.
- **Fixer**: CR-4's test row only if steering keeps class propagation out of this chain.
- **Devops**: round 1's assumption, at the post-deploy walk.
