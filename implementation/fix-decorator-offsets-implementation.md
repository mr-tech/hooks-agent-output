---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Status: Active
Status-Detail: "Round 2 handed to code review at website e6a5766 (2026-11-22T21:12Z) under the 20:44 re-scope; 111 production lines, so QA Phase 2 follows review; merge to website master by devops on the owner's word."
Handoff-At: e6a5766 — repos=website
Origin-Chain: none
---

# fix-decorator-offsets — implementation

## Resumption State (checkpoint 2026-11-22T21:16Z, on steering's request)

- **Done:** round 2 committed on website `chain/fix-decorator-offsets`, HEAD `e6a5766` (`2ad482a` the class fix, `e6a5766` limbs
  removed + link-edge rows); this document at record `c88dbcd4`; spawn cue sent to `steering-hooks-fixer` (msg `887e5f62`), which
  relayed it to the reviewer.
- **Next:** wait for code review of `e6a5766` (round numbering the reviewer's). On findings: re-read this Round 2 section, the review
  document, and `steering/fix-decorator-offsets-rulings.md` from block 20:44 on; fix on the same branch, re-run red/controls/suite/
  typecheck in exports, and re-run the reviewer's corpus probe (`verification/fix-decorator-offsets/code-review/decorator.differential-probe.test.ts`
  + `visible.mjs`, plus `round2/invariants.mjs`) at base and tip. On approval: nothing for this stage; QA Phase 2 is steering's to start.
- **Approach in flight:** none; no edit or run open.
- **Uncommitted / locally mutated:** none of mine. The website tree is clean apart from the foreign `.playwright-mcp/`. The worktrees
  `wt-base`, `wt-tip` and `wt-fix` are removed, and no probe file remains in `__tests__/`.
- **Evidence:** all committed under `verification/fix-decorator-offsets/round2/` and `controls/run3`, `run4`. Scratch copies in the session
  scratchpad are not relied on.
- **Questions sent:** to steering with the hand-off: (1) the emoji pre-treatment in `utils.ts` (outside the write set); (2) the disclosed
  shared-tree control. Neither blocks review.

## Round 2: re-scope after review round 1 (rulings block "2026-11-22T20:44")

**Scope statement, replacing block 20:19's** (`steering/fix-decorator-offsets-rulings.md`, block "2026-11-22T20:44", record `601c68ca`,
read whole): "`decorator.tsx`'s ranges account for the source width of every node kind the website's markdown rules produce
(`src/utils/markdown/rules.tsx` enumerated: emphasis forms, links masked and bare and autolink, escapes, mentions, heading markers, and
any other kind found there); no input colours worse than at base; a test drives every kind, alone, at a bold/italic edge and at root,
with literal expectations. Heading markers are coloured as syntax, like every other delimiter." Write set adds `src/utils/markdown/rules.tsx`
"where a node must carry its width". The queued chain `fix-decorator-headings` (block 20:31) folds into this one and is withdrawn. QA
Phase 2 is restored at 20 or more production lines. Review round 1 (`code-review/fix-decorator-offsets-code-review.md`, record `f6b9baa6`,
REJECTED at `f57c260`): CR-1 (bare URLs ending a delimited run, 5 grid shapes right → wrong) and CR-2 (escape, mention, URL and heading
width faults; 7 escape/mention rows right → wrong) are this round's acceptance cases.

### Diagnosis (round 2)

**Cause, as one class.** The walk placed each node's syntax from a fixed table of delimiter widths and its `content` length. Any node
whose source is wider than that table and its content (bare URL: 0 delimiters, not 1; autolink: `<`/`>` with no `(target)`; masked
link with `<target>` or a title; escape `\*` with content `*`; mentions `<@1>`, `<@&1>`, `<#1>` with content one bracket narrower each
side; timestamp with no content at all; heading marker; a same-kind nesting the parser's `flattenAst` (`src/utils/markdown/utils.ts`
L16-34) replaces by its bare content array) shifted every later range. Instrument: the reviewer's own corpus probe
(`code-review/decorator.differential-probe.test.ts`, 36,000 rows, three parsers) and my leaf probe (`round2/probe-leaves.test.ts.txt`),
both run against the real `decorator` and the real interactive parsers at base and at the fix.

**Node kinds enumerated from `rules.tsx`** (`baseInteractiveRules`, L477-522 at base, plus the static rules it spreads), with each kind's
source geometry and how the fix handles it:

| Kind | Source | Handling at `e6a5766` |
|---|---|---|
| `em`, `strong`, `u`, `s`, `spoiler` | fixed delimiters each side | opening from the table; closing = source − opening − content |
| `link`, masked | `[` label `](` target … `)` | opening 1; closing split `](`/`](<` syntax, raw target `linkText`, rest (`>`, title, `)`) syntax |
| `link`, autolink | `<` url `>` | opening 1, closing 1, merged with a parent's closing |
| `link`, bare url (`url` rule) | url | no delimiters |
| `heading` | ` *#{1,3} +` content trailing | marker syntax, trailing `#`/spaces syntax (ruling 20:44) |
| `escape` (type `text`) | `\` + char | stepped over at its source width, no colour (as at base) |
| `discordUser`, `discordRole`, `discordChannel` | `<@1>`, `<@&1>`, `<#1>` | stepped over at source width, no colour (as at base) |
| `discordTimestamp` | `<t:…>`, no content | stepped over at source width |
| `discordEmoji`, `emoji`, `nameEmoji`, `discordEveryone`, `inlineCode`, `text`, `blockQuote` (interactive) | content equals source | unchanged |
| `codeBlock` (interactive) | ```` ``` ```` + lang, no content | unchanged (its own branch) |
| `newline`, `paragraph` | container / no content | paragraph unwrapped at root; other top-level nodes now walked (base walked only `ast[0]`) |
| `list` | no `content` key | not decorated at base or fix (out of the walk; not a width fault) |

**Base vs fix over the corpus** (`round2/visible-summary.txt`, the reviewer's `visible.mjs` oracle, base `8845b7e` vs `e6a5766`):
36,000 rows; 23,458 differ visibly; **0 clean → wrong; 0 wrong at both**; 16,258 wrong → clean; 7,200 clean at both (changed, e.g. a class
on a syntax character). My invariants over the same rows (`round2/invariants.txt`, `round2/invariants.mjs`): no throws, no
empty or reversed range (base 630), no overlapping syntax ranges at either tree; ranges past the text's end 3,498 (base 54,452: heading
lines' trailing newlines the parser appends), which Slate's `Text.decorations` ignores. The oracle is partial (the reviewer's note: it
cannot see a merely shifted styled range), so the rendered-leaf table below is the per-kind check.

**CR-1's 5 shapes** render identically to base on all three parsers (`round2/accept-*.out`); **CR-2's escape/mention rows** (the 8
tagged rows of `code-review/newwrong-nonheading.txt`) render correctly at the fix and are in the test with literal leaves.

**Found, not absorbed (outside the write set): emoji pre-treatment.** `interactiveParser` (`src/utils/markdown/utils.ts` L62-76) runs
`translateSurrogatesToInlineEmoji` before parsing, which turns a Unicode emoji (2 characters) into its `:name:` form, so every source width
after it is the pre-treated text's, not the editor's. `🙂 **a**` colours nothing at base and at the fix (`round2/leaves-*.out`), so not
worse. Read from code, not run: in the editor `withNormalizeNode.ts` L172 moves every emoji `parseEmoji` finds into its own element, so a
text leaf does not hold one. Not in the test (it would pin a known-wrong value, axiom D). Routed to steering with the hand-off.

**Base vs fix for lists:** `- **a**` and `1. **a**` colour nothing at either tree (the `list` node has no `content`). Not a width
fault; recorded, not in the test.

### Change (round 2)

- `src/utils/markdown/rules.tsx` (+9 −1): the interactive rule wrapper stamps every parsed node with `source: capture[0]` and gives its
  content list a hidden `node` link back to it (so a node `flattenAst` replaces by its content is recovered); the interactive masked-link
  parse keeps `targetSource: capture[2]` (the raw target, before `unescapeUrl`).
- `src/components/SlateEditor/utils/decorator.tsx`: widths from each node's source (table above); same-kind nestings walked as
  themselves; every top-level node walked, paragraphs unwrapped; merged text nodes merge their sources; empty ranges dropped.
- Test file: 227 cases (below).

`git diff --numstat 8845b7e e6a5766`: test `410 0`, `decorator.tsx` `102 39`, `rules.tsx` `9 1`. **Production lines added: 111**, so
**QA Phase 2 is restored** (rulings 20:44). Website commits this round: `2ad482a` (the class fix), `e6a5766` (two limbs no rendered text
depends on removed, six link-edge rows added).

**Limbs removed as unreachable or without effect** (each: a control or a corpus comparison showing it changes nothing):
- `first` skip limited to children with an opening of their own: removing it changed 0 of 36,000 corpus rows. Removed at `2ad482a`.
- `opening &&` before the opening grow: survived its control at `2ad482a` (`controls/run3/`), and removing it changed 0 of 36,000 corpus
  rows. Removed at `e6a5766`.
- Clipping ranges to the text: survived its control (`ranges-not-clipped`, `controls/run3/`); Slate's leaf splitting already ignores
  offsets past the end. Removed at `e6a5766`.
- `sourceOf`'s empty fallback and the masked-link "target not found" fallback: no input reaches them once every node carries its source
  and the raw target is kept.
- The `last` skip limited to children whose closing merges with the parent's **is** reachable (a heading ending underline text,
  `__-# > __…`; the corpus found it after I first removed it); kept and tested.

### Test (round 2)

Spec-form. One file, `decorator.emphasis-syntax-ranges.test.ts`: the 15 range-level cases from round 1, unchanged and passing, plus two
tables asserting what each character **renders**. These drive the real `decorator` with the real `parseContent`, `parseEmbedTitle` and
`parseEmbedField`, and read the result through Slate's own `Text.decorations`, the consumer that applies decorations to leaves (last
range wins per character, `Object.assign`). That gives 212 rows: every kind above alone, first and last at a bold edge, last at an italic
edge, and at the root before bold text, under `parseContent`. The link kinds are repeated under both embed parsers, along with heading,
block-quote, code-fence and same-kind nesting rows, the escaped-target and link-edge rows, and all 13 acceptance rows × 3 parsers.
Expectations are literal strings. Each was read character by character against its input before it was written, from the leaf probe's
output at the fix, with base's output beside it (`round2/leaves-*.out`, `accept-*.out`, `esc-*.out`, `nest-*.out`, `sv-*.out`, `hl.out`).
They were not computed by the code under test at assertion time, but they were transcribed from its reviewed output; the reviewer may
weigh that.

- **Red run** (final file, 227 cases, against base `decorator.tsx` and `rules.tsx` in a `git worktree --detach` export at `8845b7e`):
  `round2/red-run.txt`: 150 failed, 77 passed, exit 1.
- **Green** at `e6a5766`: 227 passed (within the suite run below).
- **Negative controls** at `e6a5766` (`controls/mutants-e6a5766.json`, 38 mutants, table `controls/run4/`, log `controls/run4.txt`, exit 0):
  **38 of 38 KILLED**. They cover each delimiter width, the heading-marker pattern, every added condition and chosen index, the source
  stamp, the flattened-node link, the raw target, the text-merge source, the top-level walk and the empty-range filter. The union of
  their failing titles is all 227 cases, so every case that passes at base was seen red under some control.
- **History:** at `2ad482a` 35 of 40 killed (`controls/run3/`). Survivors `masked-link-closing-adjacent` and `reduce-past-zero-width` were
  reachable but hidden by text ending at the link: rows with text after the link were added. `target-search-from-start` needed a link whose
  label equals its target: row added. `opening-zero-guard-removed` and `ranges-not-clipped`: code removed (above).

### Verification (round 2)

- **Suite** at `e6a5766` (clean `git worktree` export, `node_modules` symlinked, the shared tree's generated `next-env.d.ts` copied in
  as in round 1): 168 files, 2593 tests, all passed, exit 0 (`round2/suite.txt`, `round2/suite.json.gz`); by path, only-tip = this test
  file, only-base = empty (base 2366 + 227 = 2593).
- **Typecheck** (`pnpm run typecheck`, both programs) in the same export: exit 0 (`round2/typecheck.txt`).
- **Lint**: `convention-check.js website --since=8845b7e` on the shared tree at `e6a5766`, exit 0, 0 FAIL, 0 CANDIDATE; SKIP: the
  ID-token check, run by hand over the test file's `describe`/`it` titles with the CLAUDE.md class (`grep -ciE` → 0); no comment lines
  added (`grep -cE "^\s*//"` → 0 in both changed source files and the test).
- No package-manager operation; no lockfile change.

### Disclosed in this round

- **One negative control ran in the shared tree, against my constraints.** To show the corpus rows `**b [a *c*](https://x.y)** d` and
  `*b [**c**](https://x.y)* d` discriminate the zero-width stop in `reduceAdjacentSyntax`, I deleted `if (!width) return acc;` from the
  working `decorator.tsx`, ran the leaf probe, and restored the line with Edit. The window was uncommitted, between `2ad482a` and
  `e6a5766`, with `git diff` read after (only the two intended removals). The same mutant then ran properly in an export
  (`reduce-past-zero-width`, KILLED in `controls/run4/`).
- Scratch probe files (`decorator.probe-*.test.ts`, `decorator.differential-probe.test.ts`) were copied into the shared tree's
  `__tests__/` for single runs and deleted after each; none was committed (`git status` read before each commit). Their sources are kept
  under `verification/fix-decorator-offsets/probe/` and `round2/`.

## Round 1 record (history; scope superseded by block 20:44)

## Block resolved: ruling A

Steering ruled **A** (`steering/fix-decorator-offsets-rulings.md`, block "2026-11-22T20:31", committed `4554b711`): keep the scope as
determined, drop the two `Boolean(offset) &&` guards, hand off for code review. Done at website `f57c260`; controls, suite, typecheck and
lint re-run there (Test, Verification).

**Superseded by block 20:44:** the queued chain below was withdrawn and headings folded into this chain (Round 2 above). As written at
20:33: **Heading defect: found here, carried by the queued fixer chain `fix-decorator-headings`** (same rulings block: queued after 9f; how
a heading marker is coloured goes to the owner at that chain's scoping where more than one answer is reasonable). Evidence held for it:
`verification/fix-decorator-offsets/probe/subtext-wt-base.out` (base `8845b7e`) and `probe/subtext-website.out` (fix): `# **a**`,
`-# **a**`, `-# *a* b`, `-# a **b**` all mis-coloured at base; and `probe/depth-99fd3c3.out`, 16 inputs probed for a parent without
delimiters holding a delimited edge child (`> **a**`, `# **a**`, `-# **a**`, `- **a**`, `**> a**`, `**# a**`, `**<https://x.y>**`,
`**https://x.y**`, `||> **a**||`, ``**`a`**``, `**a\nb**`, `>>> **a**`, `[**a**](https://x.y)`, `**<@123>**`, `**:smile:**`,
`*a* **b** __c__`), of which only the mid-line heading `-# **a**` reached one. With the guards dropped, a delimited child at the edge of
a mid-line heading skips its own delimiter; that line is mis-coloured at base and stays so until that chain lands.

## BLOCKED: question for steering (owner-needing; resolved above)

**Context, for the owner, plain English.** The fix works for everything the scope names: bold-italic (`***text***`) and the other
places where one style sits flush inside another (bold inside a spoiler, italic inside underline, strike inside bold-italic, a link at
the start or end of bold text) now colour their markers exactly over the markers. The four shapes that already worked are unchanged.

On the way I found a second, separate fault: **lines that start with a heading marker (`# `, `## `, `### `) are coloured in the wrong
places, and so is text after a `#` that the editor reads as a heading mid-line (for example `-# **a**`).** The colouring code never steps
over the `# ` marker, so every colour on such a line lands a couple of characters early. That was true before this fix (run at the base,
`verification/fix-decorator-offsets/probe/subtext-wt-base.out` below). For a plain heading line (`# **a**`) the fix changes nothing. For a
mid-line heading whose text starts or ends with bold/italic, the fix changes *which* wrong characters get coloured, still wrong.

Mending headings needs a design choice the scope does not cover: the parsed heading keeps only its level, not how wide its marker was
(leading spaces, one to three `#`, trailing `#`s), so the marker's width has to be recovered some other way.

It matters to this fix because the fix carries two small safety conditions ("a style only hands its markers to its inner text when it
has markers of its own"). The only typed text that can exercise them is a mid-line heading, which the second fault breaks, so I cannot
show those two conditions doing their job with a correct expected result. My rules say an untested condition is either shown working or
removed.

**Decision.** Options:

- **A — Agent: keep this fix's scope; remove the two untestable conditions** (Recommended). Everything the scope names is fixed and tested;
  heading lines stay mis-coloured as they are today, and a mid-line heading with bold/italic at its edge stays mis-coloured in a slightly
  different place. The heading fault is written up as its own item for a later fix, which would put the conditions back with a test.
  Stays under 20 production lines: code review only.
- **B — Agent: widen this fix to also colour heading lines correctly**, then test the two conditions on a heading. Needs the design choice
  above, in this chain; likely 20+ production lines, which brings back QA Phase 2 before release.
- **C — Agent: keep the two conditions untested**, heading fault written up separately. Waives my rule that every added condition is
  shown to work; that waiver is the owner's to give, not mine.
- **D — Agent: stop here.** Nothing released; branch kept as it is.

Read behind the options: probes in `verification/fix-decorator-offsets/probe/` (run by this fixer, 2026-11-22, at website `8845b7e` and
`99fd3c3`), controls in `verification/fix-decorator-offsets/controls/run1/`. Search for other reachable parents without markers: 16 inputs
probed (`probe/depth-99fd3c3.out`), only the mid-line heading reached one. Not refutation-checked by a helper (escalation.md asks that of
the session that puts the question to the owner).

## Scope statement

Route: `steering/fix-decorator-offsets-rulings.md`. The owner's selection, block "2026-11-22T03:03", option A, his words: "Three-asterisk
bold-italic is coloured correctly in every editor text box, with a test for it and for the cases that already work."

Determination, block "2026-11-22T20:19": "`walkAst` in `src/components/SlateEditor/utils/decorator.tsx` gives `***text***` (nested
strong+emphasis sharing delimiters) syntax ranges that stay inside the delimiters; the shapes that colour correctly today (`**ab**`,
`*ab*`, `**a** *b*`, `**a *b* c** d`) stay the same. A test drives `decorator` over each shape with expected ranges written as literals."
Write set: `decorator.tsx`, one new test file beside it, this document, `verification/fix-decorator-offsets/`. Exclusions: the markdown
parser itself; "other decorations the walk produces, unless the fix moves them (then in scope)".

## Entry Conditions

| Condition | State |
|---|---|
| Scoping determination | `steering/fix-decorator-offsets-rulings.md` blocks "2026-11-22T03:03" and "2026-11-22T20:19"; brief `steering/fix-decorator-offsets-brief-fixer.md` + `-brief-common.md` |
| Bounded scope statement | Quoted above, with write set and exclusions |
| Fix branch | `git -C website branch --show-current` → `chain/fix-decorator-offsets` (cut by steering at `8845b7e`) |
| Record on the mechanism | No `architecture/` entry names the decorator (common brief, "Architecture"); `research/codebase-bug-evaluation-2026-11-08.md:171` (H-4) and the sweep `verification/fix-decorator-offsets/scoping/sweep.md`, both read |

## Diagnosis

**Cause.** `walkAst` (`decorator.tsx`, base L34-67) lets a child skip its opening delimiter when `edgeChild.first` is set and its closing
one when `edgeChild.last` is set, because the parent's own grow already counted them through `reduceAdjacentSyntax` (forward from
`content[0]`, reverse from `content.at(-1)`). Base L47 passed `first: a === astContent.at(-1)` (true for the **last** child) and never
passed `last`. So the last child skipped an opening nobody counted for it unless it was also the first, and every edge child grew a
closing the parent had already counted: ranges after it shift right, past the text's end.

**Instrument.** The red test (below) and a probe driving the real `decorator` with the real `markdown.interactive.parseContent`
(`probe/decorator.probe-shapes.test.ts.txt`; output `probe/base-8845b7e.out`). Base, quoted: `"***ab***"` → `0-3 S "***" | 3-7[emText]
"ab**" | 3-5[strongText,emText] "ab" | 5-10 S "***"` (end 10 > length 8), matching the sweep's refutation. The same probe shows the
fault on every flush nesting: `__*a*__` → `4-8 S "*__"` (length 7), `||**a**||` → `5-11` (length 9), `***~~a~~***` → `6-17` (length 11),
`**[a](https://x.y)**` → `17-21` (length 20).

**Second limb: a link's closing bracket.** A masked link's `]` is followed by its `(target)`, so it is never adjacent to its parent's
closing delimiter. Base `reduceAdjacentSyntax` (reverse) still counted a last-child link's `]` into the parent's closing grow. At base
this was masked by the link always growing its own `]` (no `last` was ever passed); once `last` is passed correctly, `**b [a](https://x.y)**`
shifts the target one left (`probe/fix-flags-only.out`: `7-18[linkText] "(https://x."`). The fix moves this decoration, so it is in
scope by the determination's exclusion clause; the reverse merge now stops at a link and a last-child link keeps its own `]`.

**Consumers of the changed values.** `edgeChild.first`/`.last` are read only at the opening and closing grows (base L42, L51;
`git grep -n "edgeChild" -- src/components/SlateEditor/utils/decorator.tsx`); `reduceAdjacentSyntax` is called only from those two
grows. `decorator`'s sole caller is `SlateEditor/index.tsx:123` (sweep). Display only: the ranges colour leaves, no text is changed.

**Base vs fix, shapes the fix moves outside the named ones** (`probe/fix-final.out`, all now correct): `***a** b*`, `***a* b**`,
`*a **b***`, `***~~a~~***`, `__*a*__`, `||**a**||`, and three link positions in bold. Each is in the test.

**Second defect found (not absorbed): heading marker width.** `probe/subtext-wt-base.out` (base) and `probe/subtext-website.out` (fix):
`# **a**` → `0-2 S "# " | 2-3[strongText] "*" | 3-5 S "*a"` at both (wrong, unchanged). `-# **a**` → base `1-2[strongText] "#" | 2-4 S
" *"`, fix `1-3 S "# " | 3-4[strongText] "*" | 4-6 S "*a"` (wrong at both, moved). `heading` (rules.tsx L285-291, regex
`^ *(#{1,3}) +([^\n]+?)#* *`) is not in `OFFSETS`, so the walk never grows its marker. Base had this mis-colouring, so it is not this
chain's regression; routed to steering above.

**Residue in production.** None to carry: the decorator writes nothing; it recomputes ranges on every render from the text.

**Origin-Chain.** Base L47 from `2c7b1e3` (2023-01-19), L42/L51 from `a8bc58a` (2022-11-28) (`git blame`, sweep §1): before the pipeline,
so `none`.

## Change

- `src/components/SlateEditor/utils/decorator.tsx`: children get `first` when they are the first child and `last` when they are the last
  (`last` not for a link); the reverse adjacent-syntax merge stops at a link. At `99fd3c3` both flags were also conditioned on the parent
  having delimiters; those two conditions were dropped at `f57c260` under ruling A (above). Two signatures
  wrapped to 100 columns (lint, below), no behaviour.
- `src/components/SlateEditor/utils/__tests__/decorator.emphasis-syntax-ranges.test.ts` (new): 6 `it` + 2 `it.each` (6 + 3 rows) = 15
  cases.

`git diff --numstat 8845b7e f57c260` (the handoff): `163 0` test, `18 4` `decorator.tsx`. Production lines added: **18** (under 20:
code review only). Website commits: `99fd3c3` (fix + test), `f57c260` (guards dropped).

## Test

Spec-form, drives the real exported `decorator` with the real `markdown.interactive.parseContent` and a real slate editor; expected
ranges are literals. Invented values: the element's `lang: ''` and `startCodeBlock: false` are written by hand; `getInitialValue.ts`
gives a plain line exactly these (L9-11 and its non-code branch); a false value would surface as code-block highlighting or no ranges at
all. `~/env.mjs` is mocked as the sibling `DiscordContentEditor` tests do; the decorator path reads nothing from it.

- **Red run**, first form (6 cases), on the shared tree with `decorator.tsx` at `8845b7e`: `verification/fix-decorator-offsets/red-run.txt`
  — 2 failed (`***ab***`, `***ab*** cd`), 4 passed, exit 1. Received matches the sweep: `3-7 emText`, `5-10` syntax.
- **Red run, final file** (15 cases) in a `git worktree add --detach` export at `8845b7e`: `red-run-final.txt` — 11 failed, 4 passed
  (the four shapes that work at base), exit 1.
- **Green run** at the fix: `green-run.txt` — 15 passed, exit 0.
- **Negative controls** (`python3 ~/.claude/tools/mutation-run.py` at `99fd3c3`, mutants `controls/mutants.json`, table `controls/run1/`,
  log `controls/run1.txt`, exit 0):

| Control | Covers | Outcome |
|---|---|---|
| `strong-delimiter-width` (strong 2→1) | the bold, side-by-side and italic-in-bold cases passing at base | KILLED |
| `em-delimiter-width` (em 1→2) | the italic case passing at base | KILLED |
| `reverse-merge-link-guard-removed` | added guard: reverse merge stops at a link | KILLED |
| `last-link-exclusion-removed` | added guard: a last-child link keeps its `]` | KILLED |
| `first-index-chosen-as-last` | chosen value `i === 0` | KILLED |
| `last-index-chosen-as-first` | chosen value `i === length - 1` | KILLED |
| `first-parent-offset-guard-removed` | added guard `Boolean(offset) &&` on `first` | **SURVIVED** |
| `last-parent-offset-guard-removed` | added guard `Boolean(offset) &&` on `last` | **SURVIVED** |

The two survivors are the conditions the BLOCKED question was about: only a mid-line heading reaches them (`probe/depth-99fd3c3.out`), and
the heading defect leaves no correct expectation to assert. **Dropped** at `f57c260` (ruling A).

- **Controls at the handoff `f57c260`** (`controls/mutants-f57c260.json`, table `controls/run2/`, log `controls/run2.txt`, exit 0): the six
  remaining controls, strings re-pointed at the new lines, all **KILLED** (6 of 6). No added guard or chosen value is left uncontrolled.
- **Green at `f57c260`**, shared tree: `green-run-guards-dropped.txt` — 15 passed, exit 0.

## Verification

- **Suite** (whole, JSON reporter, clean `git worktree` exports, `node_modules` symlinked): base `8845b7e` 167 files, 2366 tests, all
  passed, exit 0 (`suite-base.json`, `suite-base.txt`); fix `99fd3c3` 168 files, 2381 tests, all passed, exit 0 (`suite-fix.json`,
  `suite-fix.txt`). Membership by path: only-fix = the new test file; only-base = empty.
- **Typecheck** (`pnpm run typecheck`, both programs) in the same exports: first run exit 2 at both base and fix, one identical
  `TS2307` on `~/assets/img/product_image.png`, because the export lacks the git-ignored, Next-generated `next-env.d.ts`. With the shared
  tree's `next-env.d.ts` copied in: base exit 0, fix exit 0 (`typecheck-base.txt`, `typecheck-fix.txt`; renamed from `.log`, which the record ignores). That file imports
  `./.next/types/*.d.ts`, absent in the export; tsc does not resolve side-effect imports, so they did not count.
- **Lint**: `node ~/.claude/tools/convention-check.js website --since=8845b7e` exit 0 (`convention-check.txt`). Its first run had four
  eslint FAILs, all fixed before the commit: my brace style and import order, and two pre-existing `max-len` lines in `decorator.tsx` the
  gate reports for a touched file (wrapped). `npx eslint` over the two files at `99fd3c3`: exit 0 (`eslint-fix.txt`). SKIP named as
  unchecked by the tool: the ID-token check; run by hand instead with the CLAUDE.md class over the test file, `grep -ciE` → 0. Other SKIPs
  are `.playwright-mcp/` images (not this chain's).
- **At the handoff `f57c260`** (clean `git worktree` export, `node_modules` symlinked, `next-env.d.ts` copied in as above): suite 168
  files, 2381 tests, all passed, exit 0 (`suite-tip.json`, `suite-tip.txt`); `pnpm run typecheck` exit 0 (`typecheck-tip.txt`); `npx eslint`
  over the two files exit 0 (`eslint-tip.txt`); `convention-check.js --since=8845b7e` on the shared tree before the commit, exit 0
  (`convention-check-guards-dropped.txt`).
- No package-manager operation; no lockfile change.

## User-visible flows

For the owner's own look in any editor text box (message content, embed title, embed fields), as of round 2:

- Type `***bold italic***`: the three stars at each end are greyed as markers, the words in between are bold and italic, and text typed
  after it is not coloured.
- Type `**bold**`, `*italic*`, `**bold** *italic*` and `**bold *italic* bold** after`: they look exactly as before.
- Type `__*underlined italic*__`, `||**bold spoiler**||` or `***~~struck~~***`: only the markers are greyed, the text is styled.
- Type `**[label](https://example.com)** after`: the brackets and parentheses are greyed, the label and address coloured as a link, the
  closing stars greyed, and "after" plain.
- Type `**read this https://example.com**` or `<https://example.com>`: the address is coloured as a link with no greyed first letter;
  the angle brackets are greyed.
- Type `# **Heading**` or `-# **small text**`: the `#` marker is greyed like the other markers, and the bold word lines up with its stars.
- Type `**<@123> hello**`, `**\* hello**` or a timestamp inside bold: the mention, escape or timestamp is left uncoloured and the bold
  and its closing stars land in the right place.
- In an embed title (where links are not allowed), `[label](https://example.com)` shows the address as a link and the brackets plain.
- Unchanged: list lines (`- item`) are not coloured at all, as before.

## Handoff

- **SHA:** website `e6a5766` on `chain/fix-decorator-offsets` (round 2; round 1 was `f57c260`).
- **Who reviews:** `code-reviewer-fix-decorator-offsets` (round numbering is the reviewer's), spawned or resumed by `steering-hooks-fixer`
  on this document's spawn cue. **111 production lines: QA Phase 2 follows an approving review** (`qa-fix-decorator-offsets`, started by
  steering, rulings 20:44).
- **Who merges:** devops, to website `master`, on the owner's word (rulings block 20:19). Vercel deploys `master` to production.

## Changelog

| Date | Rev | Change |
|---|---|---|
| 2026-11-22T20:29 | — | Created. Fix and test committed on `chain/fix-decorator-offsets` at `99fd3c3`; red, green, controls, suite, typecheck and lint recorded. BLOCKED to steering on the heading-marker defect and the two parent-delimiter guards. |
| 2026-11-22T20:33 | — | Ruling A (rulings block 20:31): two guards dropped at website `f57c260`; 6 of 6 controls killed, suite 2381/2381, typecheck and lint exit 0 there. Heading defect recorded as carried by `fix-decorator-headings`. Status Blocked → Active; `Handoff-At` `f57c260`; handed to code review. |
| 2026-11-22T21:12 | — | Round 2 under the 20:44 re-scope (review round 1 REJECTED, CR-1/CR-2): every node kind colours by its source width, `rules.tsx` stamps sources, website `2ad482a` and `e6a5766`; 227 cases, red 150/77 at base, controls 38 of 38, suite 2593/2593, typecheck and lint exit 0, reviewer corpus 0 clean→wrong. 111 production lines: QA Phase 2 restored. One control run in the shared tree disclosed. `Handoff-At` `e6a5766`; handed to code review. |
