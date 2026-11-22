---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Reviewed-At: f57c2608f5fb17e3b35f092d8dad00315b4f3646 — repos=website
Status: In Review
Round: 1
Verdict: REJECTED
---

# Code Review: fix-decorator-offsets

**Plan Reference**: none (fixer route). Scope: `steering/fix-decorator-offsets-rulings.md` blocks "2026-11-22T03:03", "2026-11-22T20:19", "2026-11-22T20:31".
**Implementation Reference**: `agent-output/implementation/fix-decorator-offsets-implementation.md` at record `627ec83e`, `Handoff-At: f57c260 — repos=website`.
**Date**: 2026-11-22
**Reviewer**: `code-reviewer-fix-decorator-offsets`
**Evidence**: `/usr/local/bin/hooks/agent-output/verification/fix-decorator-offsets/code-review/`

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T20:43 | `steering-hooks-fixer` (brief `steering/fix-decorator-offsets-brief-code-reviewer.md`) | Round 1 review of website `f57c260` | Round 1: REJECTED. CR-1 HIGH: a bare URL ending bold, italic, underline, strike or spoiler text was coloured right at base and is wrong at the fix. CR-2 MEDIUM, put to steering: other width faults (escaped characters, mentions, URLs, heading markers) now land in different places, and in a few shapes a cancellation at base no longer holds. Suite, typecheck and red test re-run in clean exports, all matching the fixer's figures. |
| 2026-11-22T20:44 | `steering-hooks-fixer` | Ruling on CR-2 and write set | Round 1 note: steering re-scoped the chain to every node kind's source width (headings folded in, `rules.tsx` added to the write set, QA at 20+ lines). CR-2 now routed to the fixer. Verdict unchanged. |

## Scope and Criteria Assessed

Recorded before reading the diff, from the determination (block "2026-11-22T20:19"): (1) `***text***` syntax ranges stay inside the
delimiters; (2) the shapes that colour correctly today stay the same, the four named shapes included; (3) a test drives `decorator` over
each shape with literal expectations; (4) other decorations the walk produces are in scope when the fix moves them (exclusion clause).
The ruling at 20:31 adds: heading lines are out of this chain. It accepts "wrong before, still wrong" for them, and nothing newly wrong.

Tree: website `f57c2608f5fb17e3b35f092d8dad00315b4f3646` (`git rev-parse HEAD`, read at start and end of the review: unchanged). Base
`8845b7e`. Files read with `git show f57c260:<path>`: `src/components/SlateEditor/utils/decorator.tsx`,
`src/components/SlateEditor/utils/__tests__/decorator.emphasis-syntax-ranges.test.ts`, and for context `createLeaf.ts`,
`getInitialValue.ts`, `SlateEditor/index.tsx`, `src/utils/markdown/index.tsx`, and `simple-markdown`'s `autolink`/`url` rules.

**Production lines**: `git diff --numstat 8845b7e f57c260`: `decorator.tsx` 18 added / 4 deleted, test file 163/0. Under GLOSSARY "Production
line" that is **18**, below 20, so no QA stage. A CR-1 remedy that takes the count to 20 or more brings QA Phase 2 back.

## Runs owed on the under-20 route

All runs were in `git archive` exports (scratch), with `node_modules` symlinked and the shared tree's git-ignored `next-env.d.ts`
copied in. Suite runs were memory-capped with `systemd-run --user --scope -p MemoryMax=8G`.

| Run | Tree | Result | Exit | Evidence |
|---|---|---|---|---|
| Whole suite (`npx vitest run --reporter=json`) | fix `f57c260` | 168 files, 2381 tests, 2381 passed, `success: true` | 0 | `suite-fix.txt`, `suite-fix.json.gz` |
| `pnpm run typecheck` (both programs) | fix `f57c260` | clean | 0 | `typecheck-fix.txt` |
| Red test: the new test file run with `decorator.tsx` at base (decorator byte-identical to `8845b7e`, `cmp`) | base `8845b7e` + test from `f57c260` | 15 cases: 11 failed, 4 passed (the four named shapes that already worked) | 1 | `red-base.txt`, `red-base.json.gz` |
| `node ~/.claude/tools/convention-check.js website --since=8845b7e` | shared tree at `f57c260` | 0 FAIL, 0 CANDIDATE, 18 SKIP (17 `.playwright-mcp` images; the ID-token/basename check named as not run) | 0 | `convention-check.txt` |
| ID-token/basename check by hand: CLAUDE.md class over the test file (`grep -ciE`), positive-form regex over the basename | test file at `f57c260` | 0 ID-token lines; basename conforms (1) | — | this table |

These reproduce the fixer's own figures (2381/2381, typecheck 0, 11 red / 4 green).

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (tracked; `git ls-files`). `grep -ci decorat`
returns 2 lines. Both are about the highlight.js `_emitter` problem area (`handleCodeBlockRange`), which this diff does not touch.
`architecture/website.md` returns 0. **Alignment Status**: ALIGNED. No passage covers `walkAst`.

## TDD Compliance Check

**TDD Table Present**: No table. The fixer's document carries its record as prose plus a controls table (Test section): first-form red
run, final red run, green, and eight negative controls, six of them re-run at `f57c260`, all killed. **All Rows Complete**: the
red/green record is complete, and I re-ran the red run (above).
**Concerns**:
- Expectations are literals (axiom E), checked by reading every `syntax(…)`/`styled(…)` row against the input text.
- The fixture element `{ type: 'div', lang: '', startCodeBlock: false }` matches what `getInitialValue.ts` gives a plain line. The
  parser is the real `markdown.interactive.parseContent`.
- Test name, placement and the absence of comments are all per Test Conventions. The test is spec-form, which is correct because
  the defect never escaped (no release or incident shipped it).
- **Gap (CR-1):** the test drives only `parseContent` and only masked links. No case has a bare URL or an autolink, and none uses the
  embed parsers (`parseEmbedTitle`, `parseEmbedField`) that the other editors pass to the same decorator.

## Decision-neutrality / shapes-that-work differential

Claim under test: "the shapes that colour correctly today stay the same" (determination). Evidence process: **the real `decorator` of
each tree, executed**. The instrument is mine: `decorator.differential-probe.test.ts`, which runs in each export. It draws a seeded
random corpus of 6,000 strings from 23 tokens (delimiters, words, masked links, bare URLs, autolinks, code ticks, escapes, an emoji, a
mention, `# `, `-# `, `> `) plus 27 fixed shapes. Each string goes through `parseContent` (isEmbed false), `parseEmbedTitle` and
`parseEmbedField` (isEmbed true), each with `mounted` true and false. That gives 36,000 rows per tree. AST node types are recorded
per row, and they are identical across the two trees in all 36,000 rows (the parser is unchanged).

- Raw ranges differ in 2,588 rows (`compare.mjs`, `summary2.txt`). Ranges clipped to the text differ in 2,330 rows
  (`visible.mjs`, `visible-summary.txt`). Of those 2,330, 868 parse a `heading` node and 1,462 do not.
- Partial oracle (`visible.mjs`): a prose letter or a URL character coloured as syntax is wrong. Over the 2,330 changed rows: 326
  wrong→clean, 98 clean→wrong, 1,484 wrong at both, and 422 the oracle cannot decide. **Blind spot**: it cannot see a styled range
  that is merely shifted, such as base `***ab***`'s `emText` over `"ab**"`, so "clean" is an upper bound on correctness. It also
  scores out-of-bounds tails, present at both trees on every URL/autolink row, only after clipping.
- Every non-heading clean→wrong row was read (`newwrong-nonheading.txt`, 30 unique). Each one has a bare URL or autolink as the last
  child of a delimited run. This includes the embed-title rows, where links are disabled and the `(https://…)` text parses as a bare
  URL. The exceptions involve an escape (`\*`) or a mention (`<@123>`) whose width was already wrong at base. Those go to CR-2.
- **Headings (brief's question):** yes, 868 heading rows now colour differently from base. The cause the fixer recorded, and I
  reproduced (`targeted-summary.txt`: `# **a**`, `## ***a***`, `-# ***a***`), is that no range inside a heading accounts for the
  marker width. So every range inside a heading is already misplaced at base, and a change inside a heading is wrong→wrong. This is
  bounded by that cause and was not oracle-checked row by row. One shape gets visibly worse: `-# ***a***` loses all its syntax
  colouring (base `1-4[emText] | 1-2[strongText] | 2-7 S`, fix only `1-2[emText,strongText] "#"`). That is still wrong-to-wrong,
  which ruling A accepts.

## Findings

### Critical
None.

### High

CR-1 HIGH Round 1
- **Category**: Correctness / regression of a shape that worked
- **Title**: A bare URL ending bold, italic, underline, strike or spoiler text gets syntax colour on its first character
- **Location**: `src/components/SlateEditor/utils/decorator.tsx`, `walkAst`, the `astContent.forEach` call that now passes
  `first: i === 0` and `last: … && a.type !== 'link'`. Also `walkAst`'s link branch (`ast.type === 'link' && ast.target`), which grows
  `[`, `](`, target and `)` for every link node.
- **Class**: The walk applies masked-link geometry (`[` … `](target)`) to every `link` node. But `simple-markdown`'s `url` and
  `autolink` rules also emit `type: "link"` (`node_modules/simple-markdown/simple-markdown.js`, both `parse` functions: `type: "link"`,
  `target: capture[1]`) for text that has no brackets. So the corrected `first`/`last` flags now hand a bracketless link a 1-character
  opening "delimiter" that does not exist. At base this was cancelled by accident whenever the URL was the last, non-first child.
- **Enumeration**: grid `grid.json` → `grid-summary.txt`. It covers 6 delimiters × 3 preceding children × {bare, autolink}, 36 shapes,
  `parseContent`, mounted, with an oracle that requires every URL character to be link-coloured and not syntax, and every closing
  delimiter character to be syntax. Result: **base ok → fix WRONG: 5** (`**a https://x.y**`, `*a https://x.y*`, `__a https://x.y__`,
  `~~a https://x.y~~`, `||a https://x.y||`). Base wrong → fix wrong: 28. Base wrong → fix ok: 2. Base ok → fix ok: 1. The corpus
  sweep gives the same class on the embed parsers (`newwrong-nonheading.txt`, tags `bare*`, plus the PLAIN/code/emoji embed-title rows
  whose `(https://…)` is a bare URL). **Not matched by this predicate**: URL shapes other than `https://x.y`, URLs nested two levels
  deep, and a bare URL followed by trailing text the URL regex swallows. Those belong to the remedy's own sweep.
- **Magnitude**: measured, not read. 5 of the 36 grid shapes go from right to wrong, and 44 rows tagged bare-or-autolink of the 36,000
  corpus rows (0.12%) go clean→wrong. The corpus is synthetic and says nothing about usage frequency. The base-ok shape, "a bold or
  spoiler sentence that ends in a link" (`**read this https://…**`, `||spoiler https://…||`), is ordinary Discord text. Display
  only: no stored text changes. Measured with vitest 4 / jsdom on the real decorator, not in a browser.
- **Issue**: The determination requires that shapes which colour correctly today stay the same, and puts in scope any decoration the
  fix moves. Before the fix, `**a https://x.y**` coloured `**` as syntax, `https://x.y` as link and `**` as syntax. After it, the `h`
  is syntax, `ttps://x.y*` is link and only the last `*` is syntax (`q-summary.txt`). No test covers a bare URL or an autolink, so the
  suite stays green. The fixer's 16-input probe (`probe/depth-99fd3c3.out`) had `**https://x.y**` and `**<https://x.y>**`, but only
  as sole children, where nothing changes visibly.
- **Required Action**: eliminate the class "a bracketless link node is decorated as a masked link".
  - **Preferred (structural)**: have the walk tell a masked link from a `url`/`autolink` node and grow each one by its own source
    geometry: autolink `<`·url·`>`, bare url with no syntax, masked `[`·text·`](`·target·`)`. Then `first`/`last` hand out only
    delimiters that exist. `simple-markdown` gives the three the same `type`. Telling them apart either needs `rules.tsx` (outside the
    write set: put to steering as a write-set extension) or a source-text check inside `decorator.tsx` (inside the write set). Root-level
    `https://x.y` and `<https://x.y>` are also wrong at both trees (`q-summary.txt`: `0-1 S "h"`). That part was not moved by the fix,
    so it is steering's to scope (CR-2).
  - **Minimum**: for a link child without brackets, the flags must reproduce base colouring at every position where base was right. At
    least the 5 enumerated shapes must be unchanged from base, on all three parsers.
  - **Each caller**: `walkAst` has one caller, `decorator`, which has one caller, `SlateEditor/index.tsx` (`decorate=`). The editors
    pass three parsers (`parseContent`; `parseEmbedTitle`, which has links disabled so URLs are bare; `parseEmbedField`). Either
    remedy changes ranges only. The test must cover each parser the remedy depends on.
  - **Test shape** (expectations independence): add literal-expectation cases for a bare URL and an autolink that are the last, non-first
    child of a delimited run. **Fixture property**: the URL is neither the only child nor the first. Falsity signature: at `f57c260`'s
    decorator the case fails an assertion with `h` received as `syntax: true`, never by a timeout. Count the result against the
    20-line QA threshold.

### Medium

CR-2 MEDIUM Round 1
- **Category**: Scope: other sites of the same property, put to steering
- **Title**: Width faults in other nodes now land in different places, and a few base cancellations break
- **Location**: `walkAst` as a whole. It assumes each node's source width equals delimiter offsets plus `content.length`, and some
  node kinds break that assumption.
- **Class**: Nodes whose parsed content is narrower than their source text shift every later range: escape `\*` (content `*`), mention
  `<@123>` (`**<@123>**` → strong over `"<@12"` at both trees), the heading marker (ruling 20:31), and bracketless links (CR-1). By
  correcting the delimiter accounting, the fix moves where each of these errors lands.
- **Enumeration**: `newwrong-nonheading.txt` tags `escape*`/`mention*` → 7 unique clean→wrong rows. Example: embed title
  `***> \****\*[b](<https://x.y>)b||`. At base its autolink was coloured right because two errors cancelled. At the fix it is shifted
  2 left. Heading rows: 868 changed, wrong→wrong (above). Cannot enumerate the full set of narrow-content node kinds from the output.
  The rule list is `src/utils/markdown/rules.tsx`, and not every rule was probed (no list, spoiler-in-quote, code-in-heading
  combinations). That population is not measured.
- **Issue**: These are pre-existing defects of other node kinds, outside the scope statement's named shape. But the exclusion clause
  makes a decoration the fix moves part of the scope, and a handful of rows go from right to wrong because a cancellation that held
  at base no longer does. That is the fix's own consequence, not only "wrong before, still wrong".
- **Required Action**: put to steering as a scoping question (fixer route, "another site of the property"). Either (a) these node kinds
  join this chain, or (b) a handoff/queued chain carries "every node's colouring accounts for its source width". Under (b), the 7
  escape/mention right→wrong rows are named in that carrier as accepted for this release. The decision is steering's, and the owner's
  where steering says so. Not a fixer action until steering rules.
- **Ruled 2026-11-22T20:44** (`steering/fix-decorator-offsets-rulings.md` block "2026-11-22T20:44", record `601c68ca`): option (a). The
  chain takes the class: every node kind `rules.tsx` produces, headings included, with heading markers coloured as syntax. No input
  may colour worse than at base, so the 7 escape/mention rows and CR-1's 5 shapes are acceptance cases. The write set adds
  `src/utils/markdown/rules.tsx`, and QA Phase 2 comes back at 20 or more production lines. CR-2 is now the fixer's. The re-review
  re-runs `decorator.differential-probe.test.ts` and the grid over the new tip, scored against this ruling's "no input colours worse
  than at base".

### Low/Info
None.

## Verdict

**Status**: REJECTED
**Rationale**: CR-1 makes a shape that coloured correctly at base wrong. The shape is ordinary text, and the determination requires it
to stay the same. It is a moved decoration, so the exclusion clause puts it in scope, and no test catches it. Everything else the
scope names holds: all 11 previously-wrong cases are correct, the 4 named shapes are unchanged, expectations are literal, and suite,
typecheck and convention check exit 0.

## Required Actions

1. CR-1: the fixer stops bracketless links (bare URL, autolink) from getting colour they did not have at base when they sit at a run's
   edge. Preferred is the structural remedy. Add literal tests with the fixture property above, re-run controls, and re-count
   production lines (20 or more brings back QA Phase 2).
2. CR-2: steering rules on scope before or alongside the fix round.

## Assumption Not Checked

Round 1: This review assumes that a real browser's Slate rendering splits leaves exactly at the ranges `decorator` returns, including
ranges past the text's end, which are present at both trees on every URL/autolink line and which jsdom tolerated in the refutation
mount. It does not test this. If the assumption is false, a browser would show a thrown decoration error or leaves split at different
characters than the probe's ranges on a line containing `https://…` or `<https://…>`. Owner: devops's post-deploy walk on the Vercel
production deploy of website `master` (rulings block 20:19, "Not covered"), typing `**a https://example.com**` and
`<https://example.com>` in a message box.

## Next Steps

- **Fixer** (`fixer-fix-decorator-offsets`): CR-1.
- **Steering**: CR-2 ruled at 20:44 (re-scope to the whole source-width class, `rules.tsx` added to the write set). CR-1 and CR-2 now
  both go to the fixer.
- **Devops**: the Assumption Not Checked above, at the post-deploy walk once a later round approves.
- Re-review is a sub-entry of Round 1 on the fix diff, unless the fix goes beyond CR-1/CR-2's scope.
