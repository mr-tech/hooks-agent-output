---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Reviewed-At: 2e6127e3170a1a31524e24321fec6a90b43703a3 — repos=website
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

## Verdict

**Status**: APPROVED (round 1 sub-entry, fix confirmation at `2e6127e`)
**Rationale**: every criterion of block 20:44 is met, and no input colours worse than at base by two independent instruments.
CR-1 to CR-4 are all resolved. The CR-3 change is behaviour-identical on the corpus, the grammar oracle and the heading edge shapes.
Suite, typecheck and red run are clean.

## Required Actions

None in this chain. CR-4's defect is carried by `fix-decorator-nested-styles`.

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

- **Steering** (`steering-hooks-fixer`): start QA Phase 2 (116 production lines, block 20:44).
- **QA** (`qa-fix-decorator-offsets`): Phase 2 at `2e6127e`, including the mutation sweep and the sub-entry's assumption above.
- **Devops**: round 1's assumption, at the post-deploy walk.
