---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Verified-At: "febf20e39905c977b0d42081137817cb7b704478 — repos=website; production blobs identical to 24eda1c, where C1 was measured"
Status: QA Complete
Status-Detail: "Phase 2 refresh at website febf20e: QA Complete. QAF-1 and QAF-2 resolved; the chain is capped (rulings 22:27), so the remaining gaps are stated limits. Open: B-1, post-deploy, owner devops."
Phase: 2
---

# QA Report: fix-decorator-offsets

**Plan Reference**: none (a fixer chain). Scope: `steering/fix-decorator-offsets-rulings.md` blocks "2026-11-22T20:44" (the
source-width class, current scope statement) and "2026-11-22T21:21" (CR-4 carried by `fix-decorator-nested-styles`; CR-3 rides).
**Brief**: `steering/fix-decorator-offsets-brief-qa.md` and `steering/fix-decorator-offsets-brief-common.md`, both read whole.
**Gate documents**: `implementation/fix-decorator-offsets-implementation.md` § "Round 3" (`Handoff-At: 2e6127e`);
`code-review/fix-decorator-offsets-code-review.md` (scoped check, `Reviewed-At: 2e6127e3170a…`, `APPROVED`).
**Architecture**: none read for this pass. The common brief records that no architecture passage names the decorator, and the
reviewer found none (`architecture/system-architecture.md`). This document cites none.
**Evidence**: `verification/fix-decorator-offsets/qa/` (instruments under `instruments/`, sweep output under `sweep/`).

This is a post-implementation Phase 2 on a fixer chain. The stage set has no Phase 1 and no UAT; QA Phase 2 was restored at 20 or more
production lines (block 20:44).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T21:51 | `steering-hooks-fixer` (brief `steering/fix-decorator-offsets-brief-qa.md`) | Phase 2 at website `2e6127e` | Phase 2: **QA Failed**. Suite 2594/2594 exit 0, typecheck exit 0. Mutation sweep 97 of 101 killed; the 4 survivors are 2 equivalent mutants and 2 that expose QAF-1. Three instruments find 0 inputs worse than base, outside code blocks. QAF-1 MEDIUM: lines inside a fenced code block with a language now render differently from base (32 characters move from wrong to right, 4 from right to wrong), and no test asserts them. The emoji assumption is answered: false for an escaped emoji. Two separate emoji defects in the editor (pre-existing, identical at base) go to steering. |
| 2026-11-22T22:24 | `steering-hooks-fixer` (message; rounds 4–5, review record `58a83897`) | Phase 2 refresh at website `24eda1c` | Phase 2: **QA Failed**. QAF-1 resolved. QAF-2 MEDIUM: `codeLineRanges`'s `normalizeRanges` call (enclosing class on a nested highlight scope, e.g. `${y}` in a template string) has no assertion; its mutant survives. Otherwise clean: suite 2612/2612 exit 0, typecheck 0, sweep 17 of 18 over the round's diff; outside code lines byte-identical to `2e6127e`; inside code lines 0 characters regress against base or `2e6127e` (195 languages, split lines 131/131). |
| 2026-11-22T22:33 | `code-reviewer-fix-decorator-offsets` (scoped confirmation, record `4dfe5b40`); fixer round 6 (record `c25925bb`) | QAF-2 survivor re-run at website `febf20e` | Phase 2: **QA Complete**. Test-only delta; production blobs identical to `24eda1c`. Suite 2614/2614 exit 0, typecheck 0. `qa-code-ranges-not-normalized` KILLED by the 2 new rows, whose expectation matches whole-line highlight.js. One stated limit under the cap (an outer scope that is the line's first range; CR-4's class, carried by `fix-decorator-nested-styles`). |

## Criteria assessed (recorded before execution)

From the brief and block 20:44:

1. **C1**: no input colours worse than at base, over every node kind `src/utils/markdown/rules.tsx` produces.
2. **C2**: `decorator.tsx`'s ranges account for every kind's source width. A test drives every kind alone, at a bold/italic edge
   and at the root, with literal expectations.
3. **C3**: heading markers are coloured as syntax.
4. **C4**: the reviewer's unrun assumption, that a Unicode emoji never sits in a text leaf, checked in a mounted editor holding
   `🙂 **a**`. Its answer also settles the `TODO.md` item.
5. **C5** (this gate's own): test adequacy. This covers the shipped test file against the workspace Test Conventions, and a mutation
   sweep over the chain's production diff.

**Class of C1's example.** The class is "every input the editor hands the decorator". Its axes are node kind × position × parser
× **the line's element** (ordinary line, or a line inside a fenced code block, where the decorator takes a different branch). The
reviewer's two instruments, and my sentinel instrument, decorate only lines with `lang: ''`, so none of them covered the code-block
axis. That axis is where QAF-1 came from.

## Implementation Review

### Code Changes Summary

`git diff --numstat 8845b7e 2e6127e` (website):

| File | Added | Removed |
|---|---|---|
| `src/components/SlateEditor/utils/decorator.tsx` | 99 | 39 |
| `src/utils/markdown/rules.tsx` | 17 | 1 |
| `src/components/SlateEditor/utils/__tests__/decorator.emphasis-syntax-ranges.test.ts` | 411 | 0 |

There are 116 production lines added. The blobs at `2e6127e` are `decorator.tsx` `e578f004…` and `rules.tsx` `cbf4413b…`
(`git ls-files -s` and `git hash-object` in the export agree).

### TDD evidence (fixer chain: the fixer document's Test section, no table owed)

- **Red run, re-derived**: the tip's test file against base `decorator.tsx` and `rules.tsx` gives **228 cases: 151 failed, 77
  passed, exit 1** (`red-base.out`, `red-base.json.gz`). This matches the fixer's and the reviewer's figures.
- **Green at tip**: the suite run below.
- **The 77 cases that pass at base**: every one of the 228 titles fails under at least one KILLED mutant of my sweep. The union of
  `failing_titles` restricted to this file has 228 distinct titles. So no case in the file goes un-reddened.

## Test Execution Results

All runs used a `git archive` export of `2e6127e`, with `node_modules` symlinked and the git-ignored `next-env.d.ts` copied in, and
a memory cap (`systemd-run --user --scope -p MemoryMax=8G`).

| Run | Result | Exit | Evidence |
|---|---|---|---|
| `npx vitest run --reporter=json` (whole suite) | 168 files (`testResults` entries), 2594 tests, 2594 passed, `success: true` | 0 | `suite-tip.out`, `suite-tip.exit`, `suite-tip.json.gz` |
| `pnpm run typecheck` (both programs) | clean | 0 | `typecheck-tip.txt` |
| Red: tip test file against base production files | 228: 151 failed, 77 passed | 1 | `red-base.out`, `red-base.json.gz` |

## Test Coverage Analysis: mutation sweep (C5)

**Range and files**: `8845b7e..2e6127e`, production paths only: `src/components/SlateEditor/utils/decorator.tsx` and
`src/utils/markdown/rules.tsx`. The test file is excluded (mutant-gen: "skipped … (test file)").

**The set**: 101 mutants. 76 came from `node ~/.claude/tools/mutant-gen.js --repo website --range 8845b7e..2e6127e` (lines added
in the range; operators per its docstring; 0 dropped as not unique; `mutant-gen.txt`). The other 25 are QA's
(`instruments/build-mutants.py`, each an exact-once replacement, checked at build). They are: each conjunct of the compound
predicates dropped alone (`trailing && !(edgeChild.last && adjacentClosingWidth)`, `ast.type === 'link' && !isMaskedLink`,
`isMaskedLink`'s two conjuncts, the code-block guard); the link-opening regex narrowed to each bracket; `first`/`last` never set;
the opening and trailing grows made unconditional; and the source-width class members (string content jumped by content length,
not source length; a content-less node jumped by 0; `sourceOf` reading only `content`; merged text sources not merged; the
back-link ignored or not defined; the `source` stamp, `targetSource` and `markerWidth` default each removed).
File: `mutants-qa-2e6127e.json` (blob `374e948a…`).

**The run**: delegated to a helper, which ran `mutation-run.py --sha 2e6127e --dep node_modules --timeout 240 -- npx vitest run
src/components/SlateEditor src/utils/markdown src/components/DiscordContentEditor src/app/message/m`. Those are the test files
that import the markdown parser or the editor (`git grep` over `src/**/__tests__`). Control: 338 tests, passed. Runner blob
`b26916e7…`. Kill table `sweep/mutation-table-2e6127e…-20261122T213252Z-p3303411.json`, log `sweep-log.txt`. I read the table
myself: KILLED 97 (all `count: checked`), SURVIVED 4; stillborn, aborted, not-applied and control-failed 0. **97 of 101 mutants
over the 116 added production lines of `8845b7e..2e6127e`, excluding the test file.**

**Survivors, each dispositioned:**

| Mutant | Disposition |
|---|---|
| `qa-masked-type-conjunct-dropped` (`isMaskedLink` without `ast.type === 'link'`) | **Equivalent.** Both call sites already imply a link with array content: `adjacentClosingWidth` checks `type === 'link'` first, and the `walkAst` call is reached only with array content, which no other kind whose source starts with `[` has. Measured: the reviewer's 36,000-row corpus probe run on this mutant is byte-identical to the tip (`probe-identity.sha256`). The same instrument separates base and tip on 23,458 rows, so it can see a difference. |
| `qa-top-level-unflatten-dropped` (top-level walk without `unflattened`) | **Equivalent.** `flattenAst` (`src/utils/markdown/utils.ts`) replaces a node by its content only when the node's type equals its parent's. Top-level nodes have no parent, so no top-level element is ever a bare content array. Measured: corpus probe byte-identical to the tip, as above. |
| `decorator.tsx:95:if-false` (code-block highlight guard never true) | **Not equivalent: QAF-1.** |
| `decorator.tsx:95:===` (`typeof ast.content !== 'string'`) | **Not equivalent: QAF-1.** |

## Behaviour: C1, no input worse than base

Three instruments, each run on the base and tip exports:

1. **Reviewer's corpus probe, re-run** (`code-review/decorator.differential-probe.test.ts` + `visible.mjs`, hashes in
   `reviewer-instruments.sha256`): 36,000 rows, 0 changed from clean to wrong, 0 wrong at both, 16,258 changed from wrong to clean
   (`visible-score.txt`). My tip output is byte-identical to the reviewer's `tip-2e6127e/probe-tip3.json.gz` (sha256 `d137b1e8…`).
   The first run timed out at vitest's 5 s default under the sweep's load. It was re-run with `--testTimeout=300000`, exit 0.
2. **Reviewer's grammar oracle, re-run** (`tip-e6a5766/decorator.grammar-oracle.test.ts` + `score-oracle.mjs`): 7,137 rows. Base
   correct 911, tip correct 3,496, **0 worse**, 2,585 better. All 3,641 remaining tip mismatches are a missing enclosing class
   (the CR-4 property, carried by `fix-decorator-nested-styles`) (`oracle-score.txt`).
3. **QA sentinel oracle, new, differently shaped** (`instruments/decorator.sentinel-oracle.test.ts`). It enumerates
   `Object.keys(interactiveBaseRules)` at each tree: 25 keys, every one mapped to a sample or excluded by name (`newline`,
   `paragraph`). Each sample is placed between plain sentinel words (`zz <sample> zz`), at the root and inside each of 6 emphasis
   wrappers; line-start kinds (`heading`, `blockQuote`, `list`) get `<marker><wrapper>zz **b** zz<wrapper>`. Each case runs under
   `parseContent`, `parseEmbedTitle` and `parseEmbedField`. The expectation does not come from the decorator: every sentinel
   character must render non-syntax with exactly the wrapper's class. **819 rows: 0 move from right to wrong**, 337 from wrong to
   right, 435 right at both, and 47 wrong at both with an identical result (`codeBlock` 14, `list` 24, `em` 6 same-kind nesting,
   `emoji` 3 inside `_…_`). The 337 rows that improved are the positive control: the instrument fires on the defect the chain fixed
   (`sentinel-summary.txt`).
4. **Code-block lines, QA, new** (`instruments/decorator.code-block-lines.test.ts`, scored by `instruments/score-code-block.cjs`):
   see QAF-1.

**C1 verdict:** met for ordinary lines on all three instruments. **Not established for lines inside a fenced code block**
(QAF-1).

## C4: emoji in a text leaf (the reviewer's assumption, and `TODO.md` "website editor: an emoji before formatting…")

Instrument: `instruments/SlateEditor.emoji-text-leaf.test.tsx`, run in both exports (`emoji-rows-{tip,base}.jsonl`). It mounts the
real `SlateEditor` with `createRoot`/`act` inside the real `MarkdownProvider` and an `EmojiPickerContext` built by the real
`useEmojiPicker`, with the real `parseEmoji` and `parseContent`. It only wraps `withReact` to record the editor instance. It reads
each text leaf, whether `translateSurrogatesToInlineEmoji` would rewrite it, and the leaf's colouring through the real `decorator`
and `Text.decorations`. Environment fidelity: normalisation is Slate core and does not depend on the DOM. The DOM leaves did not
re-render after a programmatic `insertText` in jsdom, so the DOM column is **not** used for the typed cases. The decorator column
is the measure there. Control: `x **a**` renders `**`:syntax `a`:strongText in both columns.

| Case (identical at base and tip) | Emoji left in a text leaf? | Colouring after it |
|---|---|---|
| `🙂 **a**`: initial value, and typed key by key | No: lifted into an emoji element | `**a**` correct |
| `\🙂 **a**` typed (`\`, `🙂`, ` **a**`, or as one insert) | **Yes**: the leaf holds `\🙂 **a**` | **nothing coloured** |
| `**🙂 a**`, `` `🙂` **a** `` | No (lifted) | the run is split across leaves, so the bold is not coloured, as at base |

**Answer:** the assumption is **false** for an escaped emoji. `\🙂` stays in the text leaf because `parseEmoji`'s escape rule
consumes `\:` of the pre-transformed `\:slight_smile:`. The bold text after it then colours nothing. This is the same at base, so
C1 holds here. The `TODO.md` item is **reachable** in the editor, through an escaped emoji only. An unescaped emoji is lifted out
and does not shift the colouring.

**Found in the same probe, outside this chain (identical at base, routed to steering, not findings against this chain):**

- **E-1, text lost on paste.** Inserting a line that holds an emoji followed by text in one `insertText` call (what slate-react
  0.123.0's `insertTextData` does per pasted line, `slate-react.js` `insertTextData`) deletes the characters after the emoji.
  `x🙂 abcdefghijklmnopq` keeps `x`, the emoji, and `lmnopq`, so 12 characters are lost: the pre-transformed `:slight_smile:`
  width (14) minus the emoji's (2). `🙂 **a**` loses ` **a**` entirely. Mechanism: `withNormalizeNode.ts` `handleElement` sizes
  its insert range from the parsed node's pre-transformed `content` length.
- **E-2, a stored escaped emoji is rewritten on load.** An initial value `\🙂 **a**` loads as `:slight_smile: **a**`, so the
  backslash and the emoji are replaced. `getInitialValue.ts` builds text from `parseEmoji`'s pre-transformed node content, and the
  editor's `onChange` then reports the rewritten string.

## Test audit (C5)

- **Conventions** on `decorator.emphasis-syntax-ranges.test.ts`: the basename matches the positive form. ID-token class over the
  file: `grep -ciE` gives 0. No `Date`, timers, `readFileSync`, `__filename`, `.only` or `.skip`. `vi.mock('~/env.mjs')` is the
  only mock. Parsers, `decorator` and `Text.decorations` are real, so no fixture invents what a store or framework returns.
- **Expectations transcribed from output** (disclosed by the fixer): they are corroborated wherever the reviewer's grammar oracle
  reaches. I scanned all 213 rendered rows for a CR-4-shaped hole (a content leaf without a class its neighbours on both sides
  carry): 16 rows flagged (`test-rows-hole-scan.txt`). 14 are the masked-link target rendered `linkText` alone, which is the same
  design at base (base `decorator.tsx` grows the target with `'linkText'` alone). 2 are the escape between two separate links,
  which the scan flags falsely. No row pins a CR-4 value.
- **Gap**: no case decorates a line inside a code block (`grep -c "startCodeBlock: true"` gives 0; the test's helper hard-codes
  `lang: ''`). This is QAF-1.
- Residue, not blocking: syntax characters carry the enclosing run's class on an inner opening delimiter but not on an inner
  closing one (`**a *b* c**`: `syntax(4, 5, ['strongText'])`, `syntax(6, 7)`). There is no spec for classes on syntax
  characters, and neither instrument scores them. Noted for `fix-decorator-nested-styles`.
- Residue, not blocking: the decorator's `'lang'` class branch (no-content `codeBlock`) is reached by neither tree. The fence line
  `` ```js `` renders `js` plain at base and `codeBlockText` at tip, which the test asserts (row `'```js'`).

## Findings

QAF-1 MEDIUM Phase 2 RESOLVED — code-block lines with a language are highlighted whole from the line's own text, and the test asserts 14 code-line rows and 4 split-line rows: 12 of them fail against `2e6127e`, and 0 characters regress against base or `2e6127e` over 195 languages. Fixer rounds 4–5 (`a7e1adb`, `24eda1c`); refresh pass below; evidence `verification/fix-decorator-offsets/qa/refresh-24eda1c/`.

QAF-2 MEDIUM Phase 2 RESOLVED — the code-line table asserts a nested scope (`print(f"a {b}")`, python, both parsers; expected from highlight.js's whole-line output), and the survivor `qa-code-ranges-not-normalized` is KILLED by exactly those rows at `febf20e`. Fixer round 6 (record `c25925bb`); refresh below; evidence `verification/fix-decorator-offsets/qa/refresh-febf20e/`.

## Phase 2 refresh at website `24eda1c`

**Stage start**: `code-review/fix-decorator-offsets-code-review.md` at record `58a83897`, `Reviewed-At: 24eda1cdbcf9…`, `APPROVED`
(CR-5 fix confirmation). The brief was `steering-hooks-fixer`'s message. Gate documents: the implementation § "Round 4" and § "Round 5"
(record `8a9082f5`, `Handoff-At: 24eda1c`). Tree: a `git archive` export of `24eda1c` (`decorator.tsx` blob `0cdd886f…`). Evidence:
`verification/fix-decorator-offsets/qa/refresh-24eda1c/`.

**Criteria for this pass** (set before running anything): QAF-1 closed; C1 (no input worse than base) re-measured at `24eda1c` on every
instrument, including the code-line axis and the split-line shape (CR-5); a sweep over the round's production diff; suite and typecheck.

**Delta**: `git diff --numstat 2e6127e 24eda1c`: `decorator.tsx` 20/10, test 71/16. From base: `decorator.tsx` 111/41 and `rules.tsx`
17/1, so **128 production lines added**.

| Run (export of `24eda1c`) | Result | Exit |
|---|---|---|
| Whole suite, JSON reporter | 168 files, 2612 tests, all passed. File membership by path is the same as at `2e6127e`; only `decorator.emphasis-syntax-ranges.test.ts` moves, 228 → 246 | 0 |
| `pnpm run typecheck` | clean | 0 |
| Red: test file at `24eda1c` against `2e6127e`'s production files | 246: 12 failed (the 10 code-line rows wrong at `2e6127e`, including QAF-1's 4 regressed characters, and the 2 split-line rows), 234 passed | 1 |
| Red: the same file against base | 246: 167 failed, 79 passed | 1 |

**Sweep** (the round's diff only, as ruled): `mutant-gen --range 2e6127e..24eda1c` gives 10 mutants. I added 8 for `codeLineRanges` and the
top-level merge (start including its own node, emoji width zero, highlighting the node's text, anchor or focus not shifted, the language
branch always taken, ranges not normalised, the merge dropped) via `refresh-24eda1c/build-mutants.py`. Set `mutants-qa-24eda1c.json`, blob
`9ae13163…`. The runner (blob `b26916e7…`) used the same suite selection as before; control 356 tests, passed. Kill table
`refresh-24eda1c/sweep/mutation-table-24eda1c…-20261122T221958Z-p3840508.json`, which I read myself. **17 of 18 mutants over the 30
changed production lines of `2e6127e..24eda1c` in `decorator.tsx`, excluding the test file**; all 17 KILLED rows have `count: checked`.
The survivor is `qa-code-ranges-not-normalized`, which is not equivalent: it is QAF-2. The first pass's two QAF-1 survivors mutated a
guard this round removed; the branch that replaced it is killed both ways (`decorator.tsx:220:if-false`, 16 cases;
`qa-language-branch-always`, 220).

**C1 at `24eda1c`.** Every instrument was run on base, `2e6127e` and `24eda1c` in one pass each
(`instruments-run-{b5,r2e,t5}.out`, all exit 0):

| Instrument | Base → `24eda1c` | `2e6127e` → `24eda1c` |
|---|---|---|
| Corpus probe (36,000 rows) | 0 clean → wrong; 16,258 wrong → clean (`visible-score.txt`) | byte-identical (sha256 `d137b1e8…`, the same as the first pass; `identity.sha256`) |
| Grammar oracle (7,137 rows) | 0 worse, 2,585 better (`oracle-score.txt`) | byte-identical |
| Sentinel oracle (819 rows, 25 rule keys) | as in the first pass | byte-identical |
| Code-block lines, scorer v2, 195 languages (3,088 reachable rows, 44,390 characters) | 0 right → wrong, 13,070 wrong → right; right 44,388 | 0 right → wrong, 9,166 wrong → right |
| Reviewer's split probe (10 lines, 131 characters), scored against whole-line highlight.js (`refresh-24eda1c/score-split.cjs`, new) | 0 right → wrong; 80 → 131 right | 0 right → wrong; 100 → 131 right |
| Mounted editor (emoji and code-block shapes) | differs only on the code-block line (`"1"` now `hljs-number`) and the fence line (`js` as `codeBlockText`, which the test asserts) | identical (`emoji-diff-*-vs-t5.txt`) |

Positive controls: each scorer run with its arguments swapped reports the same counts in reverse (split: `t5 vs b5`, 51 right → wrong;
code-block scorer: first pass). The 2 code-block characters still wrong at `24eda1c` are `dts`'s `<@1>` under each parser, wrong at base
and `2e6127e` too. They are the enclosing-class property carried by `fix-decorator-nested-styles` (CR-4, CR-6).

**C1 verdict at `24eda1c`: met** on every instrument, ordinary lines and code lines alike. **C5: not met** (QAF-2).

**Out of scope, carried elsewhere** (steering's message): the emoji data-loss items (E-1, E-2, and the code-line variant the reviewer
found) belong to `fix-emoji-pretransform-widths`.

**Multi-emoji split lines (run, not assumed):** `refresh-24eda1c/decorator.code-multi-split.test.ts` decorates each text node of a code line
that two `:smile:` elements split, and scores it against highlight.js over the flattened line (`multi-split-summary.txt`). At `24eda1c`:
`const s = "a :smile: b :smile: c";` 20/20 (base 11), ``f(`t :smile: ${y} :smile:`);`` 14/14 (base 4). Its three custom-emoji rows
do not represent the case: `parseEmoji` returns `<:e:1>`, `<a:e:1>` and a full-length id as plain `text` nodes, unmounted and mounted, so
no custom-emoji element arises through the normaliser. Those rows are lines split by a text node, all right at the tip.

**Assumption Not Checked (refresh):** This pass assumes that a custom Discord emoji never becomes an emoji element in the editor. That
is read from `parseEmoji`'s output on four strings and from the picker's insert path (`useEmojiPicker` inserts `<:name:id>` as text),
and is not exercised through the picker in a mounted editor. If false, the signature is a code line holding an element with
`ast.type === 'discordEmoji'`, whose later text node colours off by the difference between its flattened and rendered widths. Owner:
`fix-emoji-pretransform-widths`, whose subject is those widths (named in the message to steering).

## Phase 2 refresh at website `febf20e` (QAF-2 survivor re-run)

**Stage start**: `code-review/fix-decorator-offsets-code-review.md` at record `4dfe5b40`, `Reviewed-At: febf20e39905…`, `APPROVED` (scoped
confirmation). I held the re-run until it was committed: the fixer had handed `febf20e` to QA directly, and steering ordered the review
first. Gate document: the implementation § "Round 6" (record `c25925bb`). Evidence: `verification/fix-decorator-offsets/qa/refresh-febf20e/`.
Rulings block 22:27 caps the chain: after QAF-2, any gap below HIGH is a stated limit, except a severity-floor finding.

**Delta**: `git diff --numstat 24eda1c febf20e` shows only the test file, +2/−0. `decorator.tsx` (`0cdd886f…`) and `rules.tsx` (`cbf4413b…`)
have the same blobs at both commits (`git rev-parse <sha>:<path>`). So every C1 measurement of the `24eda1c` pass reads the same production
bytes, and none was re-run (blob identity, not a reading of the diff).

| Check (export of `febf20e`) | Result | Exit |
|---|---|---|
| Whole suite, JSON reporter | 168 files, 2614 tests, all passed. File membership is the same as at `24eda1c`; only the decorator test moves, 246 → 248 | 0 |
| `pnpm run typecheck` | clean | 0 |
| Survivor re-run: `qa-code-ranges-not-normalized`, verbatim (`mutants-survivor.json`, blob `1ceab429…`; runner `b26916e7…`; control 358 passed) | **KILLED**, count checked (358 = 358), by exactly the two new rows: `print(f"a {b}")` in a `python` block under the content and field parsers | 0 |
| The new rows' expectation, against highlight.js over the whole line (`expected-hljs.txt`, independent of the decorator) | identical: `"print":hljs-built_in "(":- "f\"a ":hljs-string "{b}":hljs-string+hljs-subst "\"":hljs-string ")":-` | — |
| ID-token class over the test file | 0 (`grep -ciE`) | — |

The rows are spec-form and their expectation is a literal from an independent source. They are seen red under the mutant and green at
`febf20e`, so the survivor is closed. Sweep total over the chain's production diff, across the passes: first pass 97 of 101 (2
equivalent, 2 closed by round 4's rewrite), refresh 17 of 18, now 18 of 18.

**Stated limit (rulings block 22:27, below HIGH, not a severity-floor case):** the fixer reports that a nested highlight scope loses its
outer class when the outer scope is the line's first range (`f"a {b} c"` from the start of the line, Ruby `"a #{b} c"`, a leading `/**
@param */`), because `normalizeRanges` seeds its enclosing range only from a syntax first range. It is the enclosing-class property
(CR-4, CR-6), and the 195-language scorer shows no character worse than base. The defect is carried by `fix-decorator-nested-styles`,
routed by the fixer to steering. This pass did not measure the case beyond the scorer's population.

**Verdict: QA Complete** at `febf20e`. C1 is met (refresh at `24eda1c`, the same production bytes); C2 and C3 are met; C4 is answered
(first pass); C5 is met (QAF-1 and QAF-2 resolved). The open blocking-condition row B-1 (post-deploy, devops) is unchanged.

**Assumption Not Checked (this pass):** This pass assumes that a leaf carrying two highlight classes (`hljs-string hljs-subst`) is
coloured by the site's stylesheet as the inner scope inside a string, the way highlight.js's nested HTML would be. It does not test that
in a browser. If false, the signature is a `{b}` in a Python f-string, or a `${y}` in a JS template, shown in a colour that is neither
the string's nor the substitution's. Owner: devops's post-deploy walk, row B-1, which looks at a ```` ```js ```` block.

## Irreversible Side-Effect Register

No entries. The decorator only returns ranges and `rules.tsx` stamps parse-node fields. Neither writes stored text, the network or
any store (block 20:19: "display only"). No guard qualifies.

## Blocking-condition register (this chain's; first QA document)

*Point-in-time. Later stage documents (the deployment record, then any handoff carrier devops creates) are authoritative on each
row's execution state.*

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | post-deploy-observable | Settles C1 in a real browser: slate-react's leaf splitting in a real browser shows the colours `Text.decorations` gives in jsdom (the reviewer's round-1 assumption) | devops's post-deploy walk of the Vercel production deploy of website `master`, through the stage browser: an editor holding `***ab*** cd`, `# **a**`, `**a https://x.y**`, and a ```` ```js ```` block with the line `const a = 1;` | devops / fallback: the owner's look at the same three lines | website `master` deployed with this chain's commits (what the push deploys: devops's to establish) | `***`/`**`… syntax-coloured only at the delimiters; ` cd` plain; heading marker `# ` syntax; the URL link-coloured inside bold; `const` keyword-coloured, no console error | if a browser splits leaves differently, users see delimiters or prose mis-coloured although every jsdom instrument passes | devops | devops's deployment record for this chain (not yet created; the release brief names it) | open |

## Assumption Not Checked

Phase 2: This pass assumes that slate-react in a real browser ignores a decoration range ending past its text, as `Text.decorations`
does in jsdom. Inner code-block lines carry such ranges on 492 of the tip's reachable rows (22 at base). It does not test that in a
browser. If false, the signature is a console error or a mis-split leaf on the inner line of a ```` ```js ```` block in the editor.
Owner: devops's post-deploy walk (row B-1, which now includes that line). (The per-language premise was run, not assumed: 195
languages, 0 throws.)

**Reconcile note (2026-11-22T22:05, does not move the verdict):** `fixer-fix-decorator-offsets` reported two defects in `score-code-block.cjs`: it pairs base and tip rows by index, and it cuts a class name holding a space (`hljs-variable constant_`). Neither touched the figures above: the 4-language captures have 144 rows on each side with no `outOfText` records, and 0 spaced classes on the scored rows. The corrected `instruments/score-code-block-v2.cjs` pairs by (lang, startCodeBlock, parser, text) and reads each tag up to the next leaf. It reproduces the published tally exactly (`codeblock-score-v2.txt`). Over all 195 languages at `2e6127e` it gives 3,088 reachable rows: 4,356 characters from wrong to right, 452 from right to wrong, on 172 rows (`codeblock-all-langs-score-v2.txt`). v2 is the scorer for the refresh pass.

## Process notes (disclosed in this round)

- A command recreating two scratch export directories included `rm -rf` on a shell-variable path, and the built-in destructive-
  command check stopped it. The directories did not yet exist, so the removal was dropped, not rewritten. The re-issued command
  created them with `mkdir` (failing if present). Nothing else changed.
- Probe files were copied only into scratch exports. Nothing ran in the shared tree, and the website tree was not modified.

## Handoff

- **QA Failed → `fixer-fix-decorator-offsets`** (QAF-1), copied to `steering-hooks-fixer`.
- **Steering**: E-1 and E-2 are new, pre-existing editor defects outside this write set. The `TODO.md` emoji item is answered
  (reachable through an escaped emoji only). The assumption above is routed to the refresh pass.
- Next: a refresh Phase 2 pass at the fix round's SHA, scoped by a base/new differential over the decorator, before devops.
