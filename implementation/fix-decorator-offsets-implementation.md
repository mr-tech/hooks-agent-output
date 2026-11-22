---
ID: n/a
Origin: fix-decorator-offsets
UUID: 12ef2086
Status: Blocked
Status-Detail: "BLOCKED to steering-hooks-fixer at 2026-11-22T20:29Z: a second defect (heading lines never step over their # marker) found on the way; it decides whether the fix's two parent-delimiter guards are kept, so code review waits on the re-scope."
Handoff-At: 99fd3c3 — repos=website; provisional, not handed off while Blocked
Origin-Chain: none
---

# fix-decorator-offsets — implementation

## BLOCKED: question for steering (owner-needing)

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
  (each only under a parent that has delimiters; `last` not for a link); the reverse adjacent-syntax merge stops at a link. Two signatures
  wrapped to 100 columns (lint, below), no behaviour.
- `src/components/SlateEditor/utils/__tests__/decorator.emphasis-syntax-ranges.test.ts` (new): 6 `it` + 2 `it.each` (6 + 3 rows) = 15
  cases.

`git diff --numstat 8845b7e 99fd3c3`: `163 0` test, `18 4` `decorator.tsx`. Production lines added: **18** (under 20: code review only).

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

The two survivors are the conditions the BLOCKED question is about: only a mid-line heading reaches them (`probe/depth-99fd3c3.out`), and
the heading defect leaves no correct expectation to assert. Disposition waits on steering's ruling.

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
- No package-manager operation; no lockfile change.

## User-visible flows

For the owner's own look in any editor text box (message content, embed fields, usernames):

- Type `***bold italic***`: the three stars at each end are greyed as markers, the words in between are bold and italic, and text typed
  after it is not coloured.
- Type `**bold**`, `*italic*`, `**bold** *italic*` and `**bold *italic* bold** after`: they look exactly as before.
- Type `__*underlined italic*__`, `||**bold spoiler**||` or `***~~struck~~***`: only the markers are greyed, the text is styled.
- Type `**[label](https://example.com)**`: the brackets and parentheses are greyed, the label and address coloured as a link.
- Known and unchanged (see BLOCKED): a line starting with `# ` is still coloured a couple of characters off.

## Handoff

Not handed off: Blocked. On a ruling, the handoff is to `code-reviewer-fix-decorator-offsets` at the then `Handoff-At` (spawned by
`steering-hooks-fixer`), merge to website `master` by devops on the owner's word (rulings 20:19).

## Changelog

| Date | Rev | Change |
|---|---|---|
| 2026-11-22T20:29 | — | Created. Fix and test committed on `chain/fix-decorator-offsets` at `99fd3c3`; red, green, controls, suite, typecheck and lint recorded. BLOCKED to steering on the heading-marker defect and the two parent-delimiter guards. |
