---
ID: n/a
Origin: fix-emoji-pretransform-widths
UUID: 27c7b0a0
Status: Active
Status-Detail: "Round 2 (CR-1) handed off at website 0411d3b; owed: code review Round 2, then QA Phase 2 (83 added production lines), then devops's merge to website master."
Handoff-At: 0411d3b — repos=website
Origin-Chain: none
---

# fix-emoji-pretransform-widths — implementation

## Round 2: CR-1, an emoji next to a name the rename manufactured (review Round 1 at `c2fee5c`, REJECTED)

The round-1 sections below record the work through `c2fee5c`. This section and its rows are authoritative from round 2 on: the
header, the production-line count and the Handoff.

**Finding** (`code-review/fix-emoji-pretransform-widths-code-review.md`, record `b7f2aac4`, CR-1 HIGH). The rename can manufacture a
`:name:` token that begins or ends inside a renamed emoji. `:ok🙂` becomes `:ok:slight_smile:`, where `:ok:` (👌) ends inside the
renamed 🙂. `\🙂ok:` becomes `\:slight_smile:ok:`, where `:ok:` begins at the renamed name's closing colon. Round 1's map sent an
offset inside a renamed name to that name's end. That handed the 🙂 to the straddling token, and the element replaced it. `wow :o🙂`
loaded and typed as `wow :o:`, where base had renamed it to `wow :o:slight_smile:`. The reviewer's probe found 8 of 407 rows passing at
base and failing at `c2fee5c` (`verification/fix-emoji-pretransform-widths/code-review/regressions.txt`). Re-derived here by the red
run below and by re-running that probe.

**Route taken: the reviewer's minimum, not the preferred.** The map now also answers `splitsName(offset)`: is the offset strictly
inside a renamed name? An emoji node whose start or end splits a name is not converted. The normalizer skips it and goes on to the
next node. The initial value keeps it as its typed text, sliced through the same map. Text concatenation was already exact, because
the rounded map never decreases. The decorator converts nothing, and its ranges round through the same map. The route not taken was
parsing surrogates without the rename. It would need the `text` rule changed, since text runs through surrogates today
(`[\s\S]+?(?=[^0-9A-Za-z\sÀ-￿]…)`, `rules.tsx:451`). It would also change the stored `:name:` form, which the ruling excludes,
and every interactive parser's output. That is a design decision beyond this scope. Consequence: an emoji that a name runs into or out
of stays as a plain emoji character in the line, not an emoji element. The text is kept whole.

**CR-2 (LOW, optional): not taken.** Declaring `sourceOffsets` on `InteractiveParser` means editing `src/@types/simple-markdown.d.ts`,
which is outside the write set (rulings block "2026-11-22T22:59").

**Change** (`0411d3b`). `emoji.tsx`: `surrogateSourceOffset` becomes `surrogateSourceOffsets`, which returns `{ at, splitsName }` (type
`SurrogateSourceOffsets`). `utils.ts` attaches it as `sourceOffsets`. `common.ts`: `sourceOffsetsOf` replaces `sourceOffsetOf` and
imports the type only, which is erased at build and so keeps the markdown module out of the editor bundle. `withNormalizeNode.ts` and
`getInitialValue.ts`: the emoji branch is `isEmojiNode(x) && !offsets.splitsName(start) && !offsets.splitsName(end)`, written inline
rather than as a type-predicate helper, because a predicate with extra conditions would narrow a straddling emoji node to "not an
emoji" on `false`. `decorator.tsx`: `offsets.at` in place of `toSource`.

`git diff --numstat febf20e 0411d3b` (production paths): `common.ts` 7/0, `decorator.tsx` 9/5, `getInitialValue.ts` 15/6,
`withNormalizeNode.ts` 16/7, `emoji.tsx` 31/0, `utils.ts` 5/3. **Production lines added: 83**, so QA Phase 2 still runs. Tests:
decorator 21/0, initial value 39/0, normalizer 66/0.

**Tests added** (spec-form, real parser, the real name `:ok:`, the straddle neither first nor last on its line, both directions):
- Normalizer: `a :ok🙂 🙂 b` gives `['a :ok🙂 ', '[:slight_smile:]', ' b']`, and `a \🙂ok: 🙂 b` gives `['a \🙂ok: ', '[:slight_smile:]', ' b']`.
  The straddle stays as typed and the following emoji is still converted.
- Initial value: `a :ok🙂 b` and `a \🙂ok: b` load unchanged, and the two lines above load to the same shapes.
- Decorator: `a :ok🙂 *b*` and `a \🙂ok: *b*` colour `*b*` at its own position.

**Red run** at `c2fee5c` (export with the three updated test files; `verification/fix-emoji-pretransform-widths/red-run-straddle-c2fee5c.{json,txt,exit}`):
exit 1, 277 cases, 271 passed, 6 failed. All six are new straddle cases, quoted: normalizer `[ 'a ', '[:ok:]', ' ', …]` and
`[ 'a \🙂', '[:ok:]', ' ', …]`; initial value `expected 'a :ok: b'` and `expected 'a \🙂:ok: b'`, plus the two shapes. The two decorator
rows pass at `c2fee5c`, because the decorator converts nothing. Their controls are below.

**Negative controls** at `0411d3b` (`mutation-run.py … --sha 0411d3b --mutants verification/fix-emoji-pretransform-widths/round-2/mutants.json
--dep node_modules --timeout 300 -- npx vitest run`, exit 0; table
`round-2/controls/mutation-table-0411d3ba…-20261122T232828Z-p450104.json`). 17 of 17 are KILLED with the count checked. The 11 round-1
controls are re-pointed at the new names, and 6 are new:
- `splitsName` start check dropped, at the normalizer and at the initial value: each KILLED by the `\🙂ok:` direction.
- `splitsName` end check dropped, at the normalizer and at the initial value: each KILLED by the `:ok🙂` direction.
- `start <= offset` and `offset <= end`: each KILLED, because every whole emoji then reads as split.

The decorator row `a :ok🙂 *b*` fails under `decorator-anchor-unmapped`. The row `a \🙂ok: *b*` fails under it and under
`decorator-focus-unmapped`. The identity-map control is now `at` returning its input.

**Reviewer's probe re-run** on the round-2 tree (`code-review/probe.review.test.tsx.txt` unchanged, output
`round-2/review-probe-worktree.jsonl`, comparison `round-2/review-probe-compare.txt`). 407 rows, the same inputs as both review
captures. Rows passing at base and failing here: 0 for load, 0 for typed, 0 for the decorator. Rows passing: load 352 / 397 / 407,
typed 283 / 397 / 407, decorator 390 / 407 / 407 (base / `c2fee5c` / round 2).

**Found, not absorbed.** Three probe rows still emit a decorator range past the end of the line: `:ok:# ~~`, `# :_#bc👍🏻` and
`#~~:ok:#  `. All three are heading-syntax ranges, and each is out of bounds at base too (base capture `decoOutOfBounds` 1 for each).
`:ok:# ~~` contains no emoji, so the offset map is the identity there and the cause is not this chain's property. Base had 20 such rows
and round 2 has 3. Routed to steering as a candidate separate defect; not fixed here.

**Verification at `0411d3b`** (clean `git archive` export; captures under `verification/fix-emoji-pretransform-widths/round-2/`):

| Check | Result |
|---|---|
| Suite: `npx vitest run --reporter=json` | exit 0; 2643 / 2643 passed, 170 files (`suite-0411d3b.*`) |
| `pnpm run typecheck` | exit 0 (`typecheck-0411d3b.*`) |
| `npx eslint . --max-warnings=0` | exit 1; 751 problems (423 errors, 328 warnings) in 265 files, the same totals as `c2fee5c`. None in a touched path (`grep -c` over the nine paths: 0). |
| `convention-check.js website --since=febf20e` | exit 0; 0 FAIL, 0 CANDIDATE (`convention-check-0411d3b.txt`); SKIPs as in round 1 |

2643 − 2635 = 8 new cases: normalizer 2, initial value 4, decorator 2.

**User-visible flows added:** type or paste `wow :ok🙂 hi`. Every character stays. The 🙂 stays a plain emoji character beside the
`:ok` text and is not turned into the 👌 emoji. Before round 2 the 🙂 disappeared; at base it was saved as `:slight_smile:`.

## Scope statement

The determination's block (`steering/fix-emoji-pretransform-widths-rulings.md`, "2026-11-22T22:59"; route: `steering-hooks-fixer`
→ this fixer by brief `steering/fix-emoji-pretransform-widths-brief-fixer.md`), quoted:

> code that applies parsed widths or positions to the editor's original text uses the source width of each node, never the
> pre-treated width: (1) `withNormalizeNode.ts` `handleElement` — a pasted or typed line with an emoji keeps every character (E-1),
> including in a fenced code line, and an escape (`\*`) before an emoji shifts nothing (sweep's extra find); (2) `getInitialValue.ts`
> — a stored message loads with its text unchanged, an escaped emoji included (E-2); (3) `decorator.tsx` — formatting after an emoji
> (escaped or not) colours at its true position. A test drives each through the real parser with literal expectations.

Write set: those three files and any helper beside them, `src/utils/markdown/` where a node must carry its source width, new tests,
this document and `verification/fix-emoji-pretransform-widths/`. **Exclusion:** an emoji element is stored and copied as its `:name:`
form (`flattenNodeText.ts:11`, `onCopy.ts:29`). It is not changed here, and the tests below assert the emoji element by its
`ast.name`, never by its stored text.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/fix-emoji-pretransform-widths-rulings.md` block "2026-11-22T22:59" (pipeline: the `fixer` agent); the owner's selections in block "2026-11-22T22:56". |
| 2 | Bounded scope statement | Quoted above, with write set and exclusion. Sweep: `verification/fix-emoji-pretransform-widths/scoping/sweep.md` at `origin/master` `febf20e`. |
| 3 | Fix branch | `chain/fix-emoji-pretransform-widths`, cut by steering from `febf20e`. `git -C website branch --show-current` at start returned `chain/fix-emoji-pretransform-widths`. |
| 4 | Record on the mechanism | No `architecture/` entry names these files (brief, § Architecture; not re-searched beyond the brief). Research: none; the sweep above is the mechanism record. |

## Diagnosis

**Cause.** The interactive parser (`src/utils/markdown/utils.ts` `interactiveParser`, from `d5f2dc8`, 2023) parses
`translateSurrogatesToInlineEmoji(input)`, which renames every known emoji (`🙂`, 2 UTF-16 units) to its `:name:` (`:slight_smile:`,
14). Every width the parse reports (node `content`, node `source`) is therefore a width in the renamed text. Three consumers apply
those widths as offsets into the original text:

- `withNormalizeNode.ts` `handleElement`: the emoji element's insertion range was `offset .. offset + cur.content.length`. For
  `x🙂 abcdefghijklmnopq` that is `1..15` over the original, so the emoji (2) and the 12 characters after it are replaced (E-1). The
  same path runs for a fenced code line (no line-type guard). `offset` also summed `content`, so an escape node (`\*`, content `*`)
  shifts the range one to the left.
- `getInitialValue.ts`: text between emoji was rebuilt from each node's `content`. An escape loses its backslash (`\*a\*` loads as
  `*a*`). An escaped emoji (`\🙂`, renamed `\:slight_smile:`, parsed as escape `\:` + text) loads as `:slight_smile:` (E-2).
  `SlateEditor/index.tsx:58-59` then writes the loaded text back through `onChange`, so the stored message changes on load.
- `decorator.tsx`: every range is computed in renamed-text widths and emitted as an offset into the original text, so formatting
  after an emoji is 12 units too far (off the end of a short line).

**Instruments.** (a) The red run below: each case drives the real parser, with the outputs quoted there. (b) Origin probe
(`verification/fix-emoji-pretransform-widths/origin-probe.test.ts.txt`, outputs `origin-probe-8845b7e.txt`, `origin-probe-febf20e.txt`):
the decorator's ranges for `🙂 *a*` are `[15,16] [16,17] [17,18]` at `8845b7e`, the commit before the `fix-decorator-offsets` chain's
first commit `99fd3c3`, and the same at `febf20e`. The decorator shift predates that chain. (c) `git blame febf20e` of the faulty
lines: `withNormalizeNode.ts:190-197` from `cbb038a`/`86df55d`/`a8bc58a` (2022), `getInitialValue.ts:64-65` from `86df55d`/`2c7b1e3`
(2022–2023), `utils.ts:66-67` from `d5f2dc8` (2023). Hence `Origin-Chain: none`.

**Every consumer of the resolved value.** The change adds a non-enumerable `sourceOffset` map to the array the interactive parser
returns. The array's elements and their properties are unchanged. Interactive parse results are consumed by the three files above
(sweep § 2, class (a)/(b); class (c) render-only callers use the static parser, which is unchanged). `renderElementFactory.tsx` reads
`element.ast`, a node, not the array. A non-enumerable property is absent from spread, `JSON.stringify` and `Object.keys`. No guard
compares a raw width: the three `.length` sites were the only width arithmetic on these results outside `decorator.tsx`'s own walk,
which stays in renamed-text widths and is converted once at its output.

**Base against fix for behaviour routed out of scope.** The `:name:` stored form of an emoji element is the same at base and fix
(`flattenNodeText.ts` untouched; the new tests read `ast.name`). The `text` rule's list-stop rewrite (sweep § 1, a source shrink
inside lists, not an emoji width) is not touched.

**Residue already in production (escaped defect: `febf20e` is serving on `master`).** Read from the code path:
- E-1: characters a user typed or pasted after an emoji were deleted from the editor's document by the normalizer before any save.
  Whatever the user then saved, sent or shared lacked them. The fix cannot restore them.
- E-2 and escapes: each time a stored message was opened in the editor, `\🙂` became `:slight_smile:` and `\*` became `*`, and
  `onChange` wrote that back into the message being edited. Any message saved, sent or shared after such a load carries the rewritten
  text.
- Release form: the editor is client code in the Vercel build of `master`. Every load after the deploy runs the fixed code. Data
  already rewritten stays rewritten. Deploy consequence: devops's to establish.
- Who checks the live state: the owner, since saved and shared messages are production data. This fixer read none.

## Change

The parser now carries a map from renamed-text offsets back to original-text offsets. Each consumer measures nodes by their
`source` (which keeps an escape's backslash) and converts through that map. The map travels on the parse result because the editor
receives its parser as a prop and loads `~/utils/markdown` only through `import()` (`MarkdownProvider.tsx:25`). A static import of the
emoji table into the editor would have defeated that. The non-enumerable property mirrors `rules.tsx`'s `node` property on content
arrays, which `decorator.tsx` `unflattened` reads back the same way.

- `src/utils/markdown/emoji.tsx`: `surrogateSourceOffset(text)`, built from the same `replacer` regex as the rename. An offset inside
  a renamed emoji maps to the emoji's end in the original.
- `src/utils/markdown/utils.ts`: `interactiveParser` attaches `sourceOffset` to its result.
- `src/components/SlateEditor/utils/common.ts`: `sourceOf` (moved from `decorator.tsx`, unchanged) and `sourceOffsetOf(ast)`.
- `withNormalizeNode.ts`: the emoji range is `toSource(offset) .. toSource(end)`, with widths from `sourceOf`.
- `getInitialValue.ts`: the text between emoji is `text.slice(toSource(start), toSource(end))` of the original line. The parser's
  appended `\n\n` falls past the line's end and `slice` clips it, which replaces the old last-node `slice(0, len - 2)`.
- `decorator.tsx`: its ranges are converted through `toSource` after `normalizeRanges`. A range wholly inside a renamed emoji becomes
  empty and the existing `anchor < focus` filter drops it.
- Lint gate (commit `c2fee5c`): `convention-check.js` reported 4 FAILs. They were the four eslint warnings already present at base on
  lines of `getInitialValue.ts` and `withNormalizeNode.ts`. Fixed with no change of value: two signatures wrapped, and
  `(x && lang) || ''` rewritten as `x && lang ? lang : ''`. `??` was not used because it would yield `false` where the old expression
  yields `''`.

Commits on `chain/fix-emoji-pretransform-widths`: `1da7727` (fix and tests), `8cb9265` (fallback removed, escaped-emoji case added;
see Test), `c2fee5c` (lint). `git diff --numstat febf20e c2fee5c`:

| added | removed | path |
|---|---|---|
| 19 | 0 | `src/components/SlateEditor/utils/__tests__/decorator.emphasis-syntax-ranges.test.ts` |
| 35 | 0 | `src/components/SlateEditor/utils/__tests__/getInitialValue.stored-text-loads-unchanged.test.ts` |
| 59 | 0 | `src/components/SlateEditor/utils/__tests__/withNormalizeNode.emoji-keeps-line-text.test.tsx` |
| 6 | 0 | `src/components/SlateEditor/utils/common.ts` |
| 9 | 5 | `src/components/SlateEditor/utils/decorator.tsx` |
| 14 | 5 | `src/components/SlateEditor/utils/getInitialValue.ts` |
| 15 | 6 | `src/components/SlateEditor/utils/withNormalizeNode.ts` |
| 21 | 0 | `src/utils/markdown/emoji.tsx` |
| 5 | 3 | `src/utils/markdown/utils.ts` |

**Production lines added: 70** (6 + 9 + 14 + 15 + 21 + 5, the added column over the six non-test paths). That is 20 or more, so
**QA Phase 2 runs**. Irreversible actions added: none. Lifetimes added: none. Declined work added: none.

## Test

Spec-form; placement and names per Test Conventions. The id-token class was checked by hand (`grep -ciE` of the class over both new
basenames, their lines and the decorator diff: 0, 0, 0), because `convention-check.js` SKIPs it.

- `withNormalizeNode.emoji-keeps-line-text.test.tsx` (jsdom): an editor composed as `SlateEditor/index.tsx:60` composes it
  (`withNormalizeNode(withEmojis(withHistory(withReact(createEditor()))), false, markdown.interactive.parseEmoji)`). Text is entered
  with `Transforms.insertText` at the line's end, and Slate's own normalization runs. Four cases: a plain line; `\*` before the
  emoji; an escaped emoji before an emoji; a fenced `js` code line. Not exercised: a real paste event, IME or DOM mapping (brief,
  "What this brief did not check"). Devops's post-deploy walk pastes the E-1 line.
- `getInitialValue.stored-text-loads-unchanged.test.ts`: `flattenNodeText(getInitialValue(text, parseEmoji, false))`, the value
  `SlateEditor/index.tsx:58-59` writes back, equals the stored text for `\🙂 **a**`, `a \🙂` and `\*a\*`. Text-node shapes are checked
  for `a🙂 b c` and `\*🙂 b`.
- `decorator.emphasis-syntax-ranges.test.ts`: new `describe` "rendered text for a line with an emoji left as text". Twelve rows
  (four lines × the content, title and field parsers), through the file's existing `rendered` helper.

All parser values come from the real `markdown.interactive` parsers. No invented value stands in for a store, wire or framework
context.

**Red run** (export of `febf20e` with the three test files copied in, `npx vitest run <the three files> --reporter=json` under
`systemd-run --user --scope -p MemoryMax=8G`): exit 1, 268 cases, 249 passed, 19 failed. All 19 failures are new cases and all are
assertion mismatches. Captures: `verification/fix-emoji-pretransform-widths/red-run.{json,txt,exit}`. Quoted:
`expected [ 'x', '[:slight_smile:]', 'lmnopq' ]` (E-1); `expected [ '\', '[:slight_smile:]', '' ]` (`\*🙂abc`); code line
`[ 'x = "', '[:slight_smile:]', '' ]`; `expected ':slight_smile: **a**' to be '\🙂 **a**'` (E-2); `expected '*a*' to be '\*a\*'`;
decorator `expected '"🙂 *a*":-'` (no formatting) and `'"**":S "🙂 a**":strongText'`. One new case passed at red: `a🙂 b c` (shape). Its
control is below. The escaped-emoji-before-emoji case was added at `8cb9265`. Its red run at `febf20e`
(`red-run-escaped-emoji-case.{json,txt,exit}`, exit 1): `Error: Could not completely normalize the editor after 126 iterations`. At
base the normalizer never settles on that line.

**Green run**: the full suite at `c2fee5c` below (every new case passes).

**Negative controls** (`python3 ~/.claude/tools/mutation-run.py --repo website --sha 8cb9265 --mutants
verification/fix-emoji-pretransform-widths/mutants.json --dep node_modules --timeout 300 -- npx vitest run`, exit 0; table
`verification/fix-emoji-pretransform-widths/controls/mutation-table-8cb9265…-20261122T230924Z-p254097.json`). All 11 are KILLED with
the test count checked:

| Control | What it removes | First failing case |
|---|---|---|
| `parse-result-carries-identity-map` | the map (identity) | `a🙂 b c` shape (the case that passed at red) |
| `map-guard-before-name-removed` | `if (offset <= start) break;` | normalizer, plain line |
| `map-guard-inside-name-removed` | `if (offset < end) return sourceEnd;` | initial value `\🙂 **a**` |
| `normalizer-anchor-unmapped` | anchor `toSource(offset)` → `offset` | normalizer, escaped emoji before emoji |
| `normalizer-focus-unmapped` | focus `toSource(end)` → `end` | normalizer, plain line |
| `normalizer-content-width` | `sourceOf(cur)` → `cur.content` | normalizer, `\*` before emoji |
| `initial-value-start-unmapped` | slice start unmapped | initial value `\🙂 **a**` |
| `initial-value-end-unmapped` | slice end unmapped | initial value `\🙂 **a**` |
| `initial-value-content-width` | `sourceOf(node)` → `node.content` | initial value `\*🙂 b` shape |
| `decorator-anchor-unmapped` | range anchor unmapped | decorator `\🙂 **a**` |
| `decorator-focus-unmapped` | range focus unmapped | decorator `🙂 *a*` |

**A guard dropped rather than controlled.** `1da7727`'s `sourceOffsetOf` fell back to an identity map when a result carried none. No
test can turn that fallback red: every real interactive parse carries the map, and the only parsers without it are test mocks that
return `[]`, where the map is never called. `8cb9265` removes the fallback. The two anchor-mapping sites had no case where they
mattered, so `8cb9265` also added the escaped-emoji-before-emoji case, which the `normalizer-anchor-unmapped` control kills.

## Verification

Every run below is in a `git archive` export with `node_modules` symlinked and the git-ignored `next-env.d.ts` copied in. Suites run
under `systemd-run --user --scope -p MemoryMax=8G`.

| Check | Base `febf20e` | Fix `c2fee5c` |
|---|---|---|
| Suite: `npx vitest run --reporter=json` | exit 0; 2614 / 2614 passed, 168 files | exit 0; 2635 / 2635 passed, 170 files (`suite-c2fee5c.{json,txt,exit}`) |
| `pnpm run typecheck` (both `tsc` programs) | not run | exit 0 (`typecheck-c2fee5c.{txt,exit}`) |
| Lint: `npx eslint . --max-warnings=0` (the `lint` script without its `--fix`) | exit 1; 755 problems (423 errors, 332 warnings) in 267 files (`lint-febf20e.*`) | exit 1; 751 problems (423 errors, 328 warnings) in 265 files (`lint-c2fee5c.*`). No path this chain touched is listed (`grep -c` over the log for the nine paths: 0). The 4 fewer are the lint-gate fixes. |
| `node ~/.claude/tools/convention-check.js website --since=febf20e` | — | exit 0: 0 FAIL, 0 CANDIDATE, 18 SKIP (`convention-check-c2fee5c.txt`) |

Counts: suite counts from the JSON reporter's `numTotalTests` / `numPassedTests`, files from `len(testResults)`. Lint file counts from
`grep -c "^/"` on the saved logs. Every run's output was captured as `.log` and renamed to `.txt` before the commit, because the record's `.gitignore:21` ignores `*.log`. 2635 − 2614 = 21 new cases: 4 normalizer, 5 initial value, 12 decorator.

Convention-check SKIPs, named as unchecked: 17 `.playwright-mcp/*.png` files (another session's untracked captures, outside the
examined set) and the id-token/basename check (the checker does not implement the CLAUDE.md class verbatim; checked by hand under
Test). The repository-wide lint fails at base and at fix alike. Its 423 errors are not in files this chain touched.

No package-manager operation ran. The lockfile is unchanged (`pnpm-lock.yaml` is absent from the numstat).

## User-visible flows

For the owner's own check, in the message editor (any text box that shows formatting as you type):

1. Paste or type `x🙂 abcdefghijklmnopq`. The emoji appears as an emoji and every letter after it stays. Before the fix, `abcdefghijk`
   disappeared.
2. In a code block (a line between ```` ```js ```` and ```` ``` ````), type `x = "🙂" + 1;`. Everything after the emoji stays.
3. Type `\*` and then an emoji and some text. The `\*` and the text stay.
4. Open a saved message containing `\🙂 **bold**` or `\*not italic\*`. It opens exactly as saved, with the backslashes kept. Before
   the fix, opening it turned `\🙂` into `:slight_smile:` and dropped the backslashes, and that changed text was what got saved.
5. Type `🙂 *italic*` or `\🙂 **bold**`. The italic or bold styling covers the right words. Before the fix, the styling after an emoji
   was missing.

Unchanged on purpose: an emoji inserted into the editor is still saved and copied as its `:name:` text (the exclusion).

## Handoff

- **SHA:** website `c2fee5c` on `chain/fix-emoji-pretransform-widths` (no upstream; nothing pushed).
- **Reviews:** `code-reviewer-fix-emoji-pretransform-widths`, then QA Phase 2, because 70 production lines is 20 or more.
- **Merges:** devops, to website `master`, which Vercel deploys to production (brief, common part), under the owner's release approval.
- Delivered as a spawn cue to `steering-hooks-fixer` by SendMessage (brief: steering starts the reviewer).

## Changelog

| Date | Change |
|---|---|
| 2026-11-22T23:14 | Created at hand-off. Fix committed at `1da7727`, `8cb9265`, `c2fee5c`. Red, controls and verification captured under `verification/fix-emoji-pretransform-widths/`. `Handoff-At: c2fee5c`. |
| 2026-11-22T23:31 | Round 2 (CR-1, review Round 1 REJECTED at `c2fee5c`): straddling emoji nodes are left unconverted, committed at `0411d3b`; red at `c2fee5c`, 17 controls KILLED, reviewer's probe 0 regressions; `Handoff-At: 0411d3b`. CR-2 not taken (outside the write set). |
