# TDD-compliance table audit, Fix Rounds 1 to 6 (M6, slate-formatting-discord-engine)

Document audited: `/usr/local/bin/hooks/agent-output/implementation/019-slate-formatting-discord-engine-m6-implementation.md`
(tables at lines 265, 436, 588, 718, 873, 1004). Code: `/usr/local/bin/hooks/website`.

Gate disclosure: my first attempt to write this file through a shell heredoc was refused by `record-write-gate-hook` (record documents are written with Write/Edit). I re-issued it with the Write tool; the content is the same.

Rule used for the verdicts:
- COMPLETE: a row names the function (or its behaviour) with Written First / Failure Verified / Pass After all acceptable and an assertion-level reason (expected/received value, or thrown-vs-not). "No" under Written First accepted only with a stub-tree red or a recorded mutant red specific to that function.
- INCOMPLETE: a row names the function but fails the rule.
- MISSING: no row names the function. Where a different row's test exercises it indirectly, the reason says so; the verdict stays MISSING because the table does not name it.
- Not counted: type-only changes, import changes, signature-only changes (`surface` argument threading), comment changes, and behaviour-preserving re-expression (`getInitialValue` default export now calling `buildLines`; `carriesMarker`'s `/^ *>>> /` replaced by `splitQuote(text,false).opens`, the same predicate).

## Enumeration commands and outputs

Production files changed per round (`git -C /usr/local/bin/hooks/website diff --name-only A..B -- src ':(exclude)**/__tests__/**'`):

| Round | Range | Files (count read from the listing) |
|---|---|---|
| FR1 | 119471f..42128cd | 1: `withNormalizeNode.ts` |
| FR2 | 42128cd..85ece66 | 1: `withNormalizeNode.ts` |
| FR3 | 85ece66..2b82972 | 1: `withNormalizeNode.ts` |
| FR4 | 2b82972..a7ad3f2 | 4: `emojiLift.ts`, `getInitialValue.ts`, `quoteMarker.ts` (new file), `withNormalizeNode.ts` |
| FR5 | a7ad3f2..40947a6 | 2: `emojiLift.ts`, `withNormalizeNode.ts` |
| FR6 | 40947a6..48eb60a | 1: `withNormalizeNode.ts` |

All under `src/components/SlateEditor/utils/`. Hunks read with `git -C ... diff -U0 A..B -- <those files>`.

Newness checks, `git -C /usr/local/bin/hooks/website grep -q -w <name> <start-ref> -- src ':(exclude)**/__tests__/**'` (exit 1 = absent = new; exit 0 = present). Exit codes are the instrument; no line counts were taken.

```
119471f resolveLine exit=1       (new, FR1)
119471f resolveEmoji exit=0      (changed, FR1)
42128cd retypeLines exit=1       (new, FR2)
42128cd linesAgree exit=1        (new)
42128cd verifiedLines exit=1     (new)
42128cd settledIn exit=1         (new)
42128cd settledLines exit=1      (new)
85ece66 holdsMarkerInText exit=1 (new, FR3)
85ece66 keepsSourceText exit=1   (new)
85ece66 settleLine exit=1        (new)
85ece66 insertTextData exit=1    (new)
2b82972 firstStartingFrom exit=1 (new, FR4)
2b82972 buildLines exit=1        (new)
2b82972 splitQuote exit=1        (new)
2b82972 QuoteSplit exit=1        (new, type only)
2b82972 ownLines exit=1          (new)
2b82972 sameType exit=1          (new)
2b82972 rebuildLines exit=1      (new)
2b82972 rebuilding exit=1        (new)
2b82972 holdsBadCodepoint exit=1 (new)
2b82972 getDirtyPaths exit=1     (new, an override of the editor method)
a7ad3f2 liftsInLine exit=1       (new, FR5)
a7ad3f2 straightened exit=1      (new)
a7ad3f2 emojiAgrees exit=1       (new)
a7ad3f2 staleEmojiLines exit=1   (new)
40947a6 linesOf exit=1           (new, FR6)
40947a6 noteEdited exit=1        (new)
40947a6 editedLines exit=1       (new)
```

Ancestry check for FR3's CR-26 row (`git merge-base --is-ancestor`): `59f65a4` (test) and `3d988f7` (red tree) are both in 85ece66..2b82972 (`git log --oneline 85ece66..2b82972` lists both), so "red at `3d988f7`" is a test-without-fix tree inside the round. Accepted.

## Fix Round 1 (119471f..42128cd), table at line 265

COMPLETE 2, INCOMPLETE 0, MISSING 1.

| Function | file | new/changed | row present? | verdict | reason |
|---|---|---|---|---|---|
| `resolveEmoji` | withNormalizeNode.ts | changed (builds one unit per call) | yes, row 1 | COMPLETE | Test first (`daad7fa` before `ebb757e`), red at `119471f`, `expected 2048 to be 200` etc., 52 of 54 failed; green 54 of 54 |
| `resolveLine` | withNormalizeNode.ts | new (name; body extracted unchanged) | yes, row 2 | COMPLETE | Stub-tree red (`resolveLine` body `return false`): 25 of 85 failed, `expected [ 'x🙂 abcdefghijklmnopq' ] to deeply equal [ 'x', '[🙂]', ' abcdefghijklmnopq' ]`; unstubbed 85 of 85 |
| `handleEditor` (the per-line `resolveEmoji` loop removed) | withNormalizeNode.ts | changed | no | MISSING | No row names `handleEditor`. Indirect: row 1's count test, and the `hand:loop-back` mutant (loop restored) killed in the sweep; that is in prose, not in the table |

## Fix Round 2 (42128cd..85ece66), table at line 436

COMPLETE 6, INCOMPLETE 0, MISSING 1.

| Function | file | new/changed | row present? | verdict | reason |
|---|---|---|---|---|---|
| `linesAgree` | withNormalizeNode.ts | new | yes, row 1 | COMPLETE | `a90ed57` before `a1037e4`; red at `42128cd`, `expected 'Could not completely normalize the ed…' to be ''`, 39 of 99; green 396 of 396 |
| `retypeLines` (incl. the marker-range delete in place of text replace, D-25, F-56) | withNormalizeNode.ts | new (renamed `handleEditor` body) and changed | yes, rows 1 and 3 | COMPLETE | Row 3: red at `42128cd`, 44 of 99, `line 0: >>> az but expected >>> za` |
| `editor.normalize` override | withNormalizeNode.ts | new | yes, row 1 (CF-30) | COMPLETE | as `linesAgree` |
| `verifiedLines` memo | withNormalizeNode.ts | new | yes, row 5 | COMPLETE | Cases were added after the code (`85ece66`), but the red is a mutant specific to the memo (`if (false && verifiedLines.get(editor) === editor.children)`): `expected 600 to be 200`. The Written First cell says "Yes" where its own text says after; the mutant red satisfies the rule |
| `settledIn` / `settledLines` | withNormalizeNode.ts | new | yes, row 4 | COMPLETE | Red against NM-76 (`if (settled.has(lineIndex)) return;` removed): `expected 2046 to be 198`, `expected 1024 to be 100`, `expected 2048 to be 200`; green 59 of 59 |
| `resolveEmoji` (settle memo) | withNormalizeNode.ts | changed | yes, row 4 | COMPLETE | as above |
| `handleEditor` (now `if (linesAgree(editor)) resolveCarried(editor)`) | withNormalizeNode.ts | changed | no | MISSING | Not named by any row. Indirect: row 1 exercises the drain path |

Weaker row beside complete ones (no function verdict changes, `linesAgree`/`retypeLines` have a complete row 1). Row 2 verbatim:
`| the same, the line types after the keystroke | the same ("leaves each line typed as a fresh load…") | Yes | Never red at `42128cd` (QA's table: the model ends correct after the throw). Red by NM-74 (the retype of the lines below skipped): see the sweep | AssertionError (NM-74) | Yes |`

## Fix Round 3 (85ece66..2b82972), table at line 588

COMPLETE 6, INCOMPLETE 0, MISSING 1.

| Function | file | new/changed | row present? | verdict | reason |
|---|---|---|---|---|---|
| `resolveEmoji` (settles each line of a unit via `settleLine`, settle memo) | withNormalizeNode.ts | changed | yes, row 1 | COMPLETE | `c1a1da1` first; red at `85ece66`, `expected 999494 to be less than or equal to 398940`, `250249 … 100490`; green |
| `insertTextData` override (paste wrapped in `withoutNormalizing`) | withNormalizeNode.ts | new | yes, row 2 | COMPLETE | `expected 1000999 to be less than or equal to 401990`, `expected 1501499 to be less than or equal to 602990` |
| `keepsSourceText` and the apply-wrapper carry (`known.children = editor.children`) | withNormalizeNode.ts | new / changed | yes, rows 5 and 6 | COMPLETE | Row 6 (the non-empty-text conjunct): written after a surviving mutant, red against that mutant in an isolated export, `expected [ 'a', ':smile:' ] to deeply equal [ 'a', '[:smile:]' ]`. Row 5 alone would be INCOMPLETE on reason (below) |
| `holdsMarkerInText` | withNormalizeNode.ts | new | yes, row 6 (quote prefix) | COMPLETE | `59f65a4` first; red at `3d988f7`, `line 1: ["blockQuote","",false,"",[]] but expected ["blockQuote","> ",false,"",[]]` |
| `quotePrefixOf` (now takes `continued`) | withNormalizeNode.ts | changed | yes, same row | COMPLETE | same |
| `retypeLines` (the `continued` threading) | withNormalizeNode.ts | changed | yes, same row | COMPLETE | same |
| `settleLine` (loop until the line settles) | withNormalizeNode.ts | new | no | MISSING | No row names it. It arrived in `49fc364` (a "refactor" commit); row 1's red is about work per line. Indirect: the `resolveEmoji` row |

Non-function rows that do not meet the rule (their surfaces belong to functions already above):
- Row 4: `| the four limbs for the `a🙂` fence members and the paste members | `withNormalizeNode.fence-and-quote-keystrokes-settle.test.tsx` | Yes (`c1a1da1`) | **No red at the pre-change tree**: 444 of 444 pass at `85ece66` (`m6-fix3-settle-additions-85ece66-green.log.txt`): the pre-change tree is correct and slow. They guard the fix. Red against mutants in the sweep: `hand-paste-leaves-normalizing-off` (the paste leaves normalising off) fails the fresh-load limb in the paste cases (`m6-fix3-sweep-49fc364/`, mutant-20) | the guard's mutants | Yes |`
- Row 5: `| `keepsSourceText` / the carry (`insert_node` of an empty text) | `withNormalizeNode.keystroke-run-unit-builds.test.tsx` (the count limb) | Yes | Yes: carry removed (`if-false`, mutant-14), carry across every operation (`hand-carry-every-operation`, mutant-24), killed | count limb and `emoji-keeps-line-text` | Yes |` (reason names test files, not a received value)
- Row 3, the positive control: declared "not red ... n/a".

## Fix Round 4 (2b82972..a7ad3f2), table at line 718

COMPLETE 5, INCOMPLETE 5, MISSING 4.

| Function | file | new/changed | row present? | verdict | reason |
|---|---|---|---|---|---|
| `rebuildLines` | withNormalizeNode.ts | new | yes, rows 1 and 7 | COMPLETE | Row 1: `1dbfe4a` first; red at `2b82972`, `expected 4987 to be less than or equal to 2014` etc., 4 of 4. Row 7 (`existing.carried`): `expected '> ```a\n> > \nb' to be '> ```a\n> \nb'` |
| `getDirtyPaths` override / `rebuilding` | withNormalizeNode.ts | new | yes, row 1 | COMPLETE | Mutant (override removed) red: `expected 4988 to be less than or equal to 998`, 4 of 4 |
| `retypeLines` (`splitQuote` use, `unsettled` skip) | withNormalizeNode.ts | changed | yes, rows 1 and 2 | COMPLETE | Row 2 `line 2: ["blockQuote","",true,"",[]] but expected ["blockQuote","> ",true,"",[]]` |
| `splitQuote` | quoteMarker.ts | new | yes, row 2 (CR-26) | COMPLETE | same row |
| `holdsMarkerInText` | withNormalizeNode.ts | changed (`marker` parameter) | yes, row 2 | COMPLETE | same row |
| `buildLines` | getInitialValue.ts | new (extracted from the default export) | no | MISSING | No row names it. Exercised by the load path and by `rebuildLines` |
| `liftLoaded` (new `only` parameter) | emojiLift.ts | changed | no | MISSING | No row names it; `rebuildLines` row 1 exercises it |
| `emojiLayout` (`layout.emojis.sort(...)`) | emojiLift.ts | changed | no | MISSING | No row names it; row 4 covers the search functions that depend on the order, not the sort |
| `sameType` | withNormalizeNode.ts | new | no | MISSING | No row names it; exercised by `rebuildLines` |
| `firstStartingFrom` | emojiLift.ts | new | row 4 (by its callers only) | INCOMPLETE | Not named; test after the change, no red, no mutant |
| `holdsSpan` | emojiLift.ts | changed | row 4 | INCOMPLETE | same |
| `spansInLine` | emojiLift.ts | changed | row 4 | INCOMPLETE | same |
| `ownLines` | withNormalizeNode.ts | new | row 5 | INCOMPLETE | Reason is "see Self-check sweep"; no expected/received value |
| `holdsBadCodepoint` | withNormalizeNode.ts | new | row 6 | INCOMPLETE | Reason is "the guard's mutant"; no assertion-level reason; written after the design |

Rows quoted for INCOMPLETE:
- Row 4 (`firstStartingFrom`, `holdsSpan`, `spansInLine`): `| `spansInLine`, `holdsSpan` by search (`emojiLift.ts`) | `emojiLift.layout.test.ts`, the cases added: a three-span layout for `holdsSpan`, a three-line unit for `spansInLine` with boundary pairs (a line cut inside, just after, just before its second span) | after the change (a refactor with coverage: **evidence for the exemption**: the new cases pass at `2b82972`'s code (`emojiLift.layout.test.ts` 36 of 36 at the old tree) and at the new; the paste, keystroke-fixedpoint and keystroke-settle differentials are byte-identical across the change: `cmp` of the outputs before and after, 15,966 + 36,560 + 2,760 inputs) | n/a (not a new behaviour) | n/a | Yes |` The row claims an exemption; no stub-tree red or mutant red is recorded for any of the three.
- Row 5 (`ownLines`): `| a rebuild with no selection, and with a range whose ends are elsewhere (`ownLines`) | `withNormalizeNode.fence-and-quote-keystrokes-settle.test.tsx` "a code fence opened by text inserted at a point, while the selection is elsewhere" | after the survivors of the first sweep (shard 1 mutants 35 to 37, shard 2 mutants 33 to 35) | Yes against the mutants of `ownLines` in the increment sweep | see Self-check sweep | Yes |`
- Row 6 (`holdsBadCodepoint`): `| a line holding a typographic quote is left to the normal path (`holdsBadCodepoint`) | same file, "leaves no typographic quote in a line it changes" | after the design (a guard) | Yes: the mutant `hand-bad-codepoint-not-excluded` is killed (rerun, shard 2) | the guard's mutant | Yes |`

Other short rows attached to functions that already have a complete row: row 3 (R-111 fixed point: "**No red at the pre-change tree**: 555 of 555 pass at `2b82972` ... red against NM-83 ... and NM-84 ... in the sweep", reason "the guard's mutants") and row 4b (the instrument's positive control, "not red").

## Fix Round 5 (a7ad3f2..40947a6), table at line 873

COMPLETE 6, INCOMPLETE 1, MISSING 0.

| Function | file | new/changed | row present? | verdict | reason |
|---|---|---|---|---|---|
| `staleEmojiLines` | withNormalizeNode.ts | new | yes, row 1 | COMPLETE | `9480bca` first; red at `a7ad3f2`: `expected 'Could not completely normalize the ed…' to be ''` (40), `{ operations: 78 … 980 }` (20), `line 0: a🙂z but expected za🙂` (21); green `ded68fc` |
| `rebuildLines` (`stale` argument) | withNormalizeNode.ts | changed | yes, row 1 | COMPLETE | same |
| `retypeLines` (stale branch) | withNormalizeNode.ts | changed | yes, row 1 | COMPLETE | same |
| `liftsInLine` | emojiLift.ts | new | yes, row 4 (CR-27) | COMPLETE | `forcedOperations: 3 … 9` (12 of 12), red at `a7ad3f2` |
| `straightened` | withNormalizeNode.ts | new | yes, row 7 | COMPLETE | Red at `55e5fdd`, `expected [Function] to not throw an error but 'Error: Could not completely…'` (16 of 28) |
| `fixSelection` (`atItsEnd`) | withNormalizeNode.ts | changed | yes, row 5 | COMPLETE | `line 0: a🙂z but expected za🙂` at 5 lines |
| `emojiAgrees` | withNormalizeNode.ts | new | yes, row 8 | INCOMPLETE | Row 8 is a refactor-with-coverage row, no red, no mutant |

Row 8 verbatim: `| `emojiAgrees` (the string comparison replaced) | covered by the above | a refactor with coverage: **evidence**: the four corpora's outputs at `70c5a86` are byte-identical (`cmp`) to `ded68fc`'s (keystroke fixed-point, its pass-through, settle, paste) and the class probe's operations and errors are identical | n/a | n/a | Yes |`
Against `a7ad3f2` the function is new, so the "refactor" label applies to an intra-round commit only; row 1 exercises `emojiAgrees` through `staleEmojiLines` but does not name it.

Other short rows attached to complete functions: row 3 (`| D-31's count limb ... | Yes (`9480bca`) | Yes, at `a7ad3f2`, by the members' throw (16), not by the count: the plan's "not yet seen red" stands; the count's own red is NM-88's (sweep) | `Error: Could not completely normalize …` | Yes |`) and row 6 (`INLINE_CODE_CONTROLS`, "not red at `a7ad3f2`", a declared control).

## Fix Round 6 (40947a6..48eb60a), table at line 1004

COMPLETE 4, INCOMPLETE 1, MISSING 1.

| Function | file | new/changed | row present? | verdict | reason |
|---|---|---|---|---|---|
| `noteEdited` (with the `apply` call site and `linesAgree`'s `editedLines.delete`) | withNormalizeNode.ts | new | yes, row 1 | COMPLETE | `1288100` first; red at `40947a6`: `expected 'Could not completely normalize the ed…' to be ''` on the four off-selection rows; the four controls pass as stated; green `372339f`, `2c0b182` |
| `editedLines` (node-keyed) | withNormalizeNode.ts | new | yes, rows 1 and 2 | COMPLETE | Row 1 as above; row 2 is the node-keyed refactor with byte-identical corpora (evidence, not a red; the function has row 1) |
| `staleEmojiLines` (keyed on edited lines) | withNormalizeNode.ts | changed | yes, row 1 | COMPLETE | same |
| `linesOf`, branch for an operation inside a line (`op.path.length > 1`) | withNormalizeNode.ts | new | yes, row 1 | COMPLETE | The red rows (backtick inserted or deleted at a point) pass through this branch |
| `linesOf`, top-level `split_node` / `merge_node` / `remove_node` / `insert_node` branches | withNormalizeNode.ts | new | row 3 (whole-line rows) | INCOMPLETE | Row 3 is written after the fix, mutants killed, reason cell describes the mutants; the row also sits below the table's closing prose, detached from the table |
| `linesOf`, `move_node` branch | withNormalizeNode.ts | new | no | MISSING | No row or test. The implementation document records (CR-31 LOW) that the clause does not hold: for a top-level move both transforms return the target path, so the run the line left is never noted; code unchanged, "no product code emits `move_node`" |

Row 3 verbatim: `| the widened case's whole-line rows (e2b5a15): the last line, a lone backtick pairing with line 0's, removed (`Transforms.removeNodes`); the same line merged into a line ending in a backslash (`Transforms.mergeNodes`); a backtick inserted at the end of the first line of each of two runs a code block apart, in one change; each with no selection, over 200 lines (150 per run): no error, fresh-load shapes, the selection kept | same describe, a second table of whole-line edits | after the fix (`e2b5a15`), driven by the sweep's survivors | Yes, by mutant (the red against the pre-change code is the first row's): 11 of the 40 pass-2 survivors killed, among them `hand-removal-notes-no-neighbour`, `75:===`, `90:walk-first`, `93:walk-first`, `93:walk-last` (`m6-fix6-sweep-e2b5a15-pass3-s1..4`) | assertion (the mutants throw Slate's iteration error or leave stale lines) | Yes |`
The mutant red is specific to `linesOf`'s branches, but 29 of the 40 pass-2 survivors are not accounted for in the row, and the reason cell is a description rather than an expected/received value.

## Totals

| Round | COMPLETE | INCOMPLETE | MISSING |
|---|---|---|---|
| FR1 | 2 | 0 | 1 |
| FR2 | 6 | 0 | 1 |
| FR3 | 6 | 0 | 1 |
| FR4 | 5 | 5 | 4 |
| FR5 | 6 | 1 | 0 |
| FR6 | 4 | 1 | 1 |

Judgement calls that move counts: (1) a function is MISSING where the table names a different function and the test exercises it only indirectly (`handleEditor` in FR1 and FR2, `settleLine`, `buildLines`, `liftLoaded`, `emojiLayout`, `sameType`); if indirect coverage were accepted these would move to COMPLETE or INCOMPLETE. (2) Two functions are COMPLETE only through a second row or a mutant (`keepsSourceText` via FR3 row 6; `verifiedLines` via a mutant red despite a "Yes" Written First cell). (3) Functions are grouped where one row covers them (for example `settledIn` / `settledLines`; `noteEdited` with its `apply` call site).
