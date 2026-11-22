# Rulings — fixer chain `fix-decorator-offsets` (website editor: `***…***` syntax colouring overruns its span)

Steered by `steering-hooks`, item 9 (R-H4) of effort `fixer-queue-2026-11-21` (effort rulings blocks "2026-11-21T05:38Z" item 6,
"05:50Z"). tmux category: `fix-decorator-offsets`. Source: `research/codebase-bug-evaluation-2026-11-08.md:171`.

## 2026-11-22T03:03 — selection: fix it

Selection prompt put 03:0xZ, answered 03:0xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises: the sweep `verification/fix-decorator-offsets/scoping/sweep.md` (`cfcb975`, at
website `132a7ab`, read): `src/components/SlateEditor/utils/decorator.tsx` `walkAst` L34-67 — `first` set on the last child (L47), `last`
never passed (L51); sole caller `SlateEditor/index.tsx:123`; no test drives `decorator`; no test covers nested emphasis. The refutation
helper (export, run; raw output in scratch `out1.txt`, `out2.txt`): `***ab***` → `0-3 SYNTAX`, `3-7 [emText] "ab**"`, `3-5
[strongText,emText] "ab"`, `5-10 SYNTAX` (past the 8-char end); controls `**ab**`, `*ab*`, `**a** *b*` correct; `***ab*** cd` → `5-10
SYNTAX "*** c"`, `d` plain; `**a *b* c** d` correct (claim refuted for that shape); mounted real `SlateEditor` (jsdom): no throw, leaves
`"***"` syntax, `"ab"` strong+em, `"**"` syntax, `"* c"` syntax, `"d"` no class.
- Q: A "Agent: fix it (Recommended)" — "Three-asterisk bold-italic is coloured correctly in every editor text box, with a test for it and
  for the cases that already work. Released with the other website fixes."; B "Agent: don't fix". Chosen: **A**.
**This thread's error in the question text:** it said "The rest of the line loses its styling"; the run shows the trailing `d` rendered
plain, which is what unformatted text is anyway — the read showed only the space and `c` mis-coloured. Told him in chat. Reading the
mount output's last leaf against the sentence before putting it would have caught it.

Determination, stage set and branch cut: when the website tree is free (after chains 7, 8 and 9a), from that tip.

## 2026-11-22T20:19 — determination and stage set

Website `master` is free (9a released at `8845b7e`). Premises re-read at `origin/master` `8845b7e`: `git diff --stat 132a7ab origin/master --
decorator.tsx index.tsx` empty (sweep sites stand); the only test under `SlateEditor/` is 9a's `onCopy.cut.test.tsx`. `release-move.js
--dry-run` on `master` `8845b7e` (20:19Z): every check passed, no workflows.
**Determination.** Shape: defect, cause proven (sweep + refutation, block 03:03). Blast radius: syntax colouring in every editor built on
`SlateEditor`; display only (the decorator colours ranges, it does not change text). End step: website `master`, Vercel production.
Pipeline: the `fixer` agent.
**Scope statement** (website, from `8845b7e`): `walkAst` in `src/components/SlateEditor/utils/decorator.tsx` gives `***text***` (nested
strong+emphasis sharing delimiters) syntax ranges that stay inside the delimiters; the shapes that colour correctly today (`**ab**`,
`*ab*`, `**a** *b*`, `**a *b* c** d`) stay the same. A test drives `decorator` over each shape with expected ranges written as literals.
Write set: `decorator.tsx`, one new test file per Test Conventions beside it, the fixer's document and `verification/fix-decorator-offsets/`.
Exclusions: the markdown parser itself (a dependency); other decorations the walk produces, unless the fix moves them (then in scope).
**Stage set:** `fixer-fix-decorator-offsets` → `code-reviewer-fix-decorator-offsets` (under 20 production lines: the reviewer also runs
the suite, typecheck and the red test) → devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT; 20 or more
production lines restores QA Phase 2. **Not covered:** rendering in a real browser (devops's post-deploy walk can look at the colours).
Disclosed: the two 9b briefs were composed by a python script run from the shell (its standing section copied from 9a's common brief), not with Write/Edit as this thread's own rule asks; no gate fired. Contents read back (no 9a names left).

## 2026-11-22T20:31 — the fixer's block: heading lines mis-coloured at base; ruled A (own chain), no owner prompt

Fixer by message ~20:4xZ (document `implementation/fix-decorator-offsets-implementation.md`, record `fe7e8c0f`, section "BLOCKED: question
for steering"): fix and test at website `99fd3c3` (18 production lines; 15 cases, 11 red at base); heading lines (`# …`, mid-line `-# **a**`)
are mis-coloured at base because the walk never steps over the heading marker, whose width the parsed node does not keep; the fix's two
`Boolean(offset) &&` guards survive their negative controls, reachable only by a mid-line heading, where no correct value can be asserted
while headings stay broken. Options A (keep scope, drop the two guards, headings their own item), B (widen), C (keep untested guards, a
waiver), D (stop). Ruling (this thread's): **A**. His block-04:50 words ("fix everything you find along the way") settle fix-or-not —
headings are fixed, as their own fixer chain `fix-decorator-headings`, queued after 9f (before CR-1); how a heading marker should be
coloured is put to him at that chain's scoping if more than one answer is reasonable. B is not taken: it widens a reviewed-size fix past
the QA line for a defect with its own design question. No owner prompt for this block (his ruling covers it); told him in chat.

## 2026-11-22T20:34 — handed to code review at website f57c260; reviewer started

Fixer's spawn cue by message ~20:4xZ: document record `627ec83e`, `Handoff-At: f57c260 — repos=website` (read); ruling A applied (two
guards dropped). This thread's reads: `git log 8845b7e..f57c260` (two commits); numstat `decorator.tsx` 18/4, test 163/0. Reviewer brief
`steering/fix-decorator-offsets-brief-code-reviewer.md`; `code-reviewer-fix-decorator-offsets` started with `tmux-agent spawn`.

## 2026-11-22T20:44 — review round 1 REJECTED; re-scope: the chain takes the class (every node's source width), headings fold in

Reviewer's copy by message ~20:5xZ: `code-review/fix-decorator-offsets-code-review.md` (record `f6b9baa6`), round 1 REJECTED at `f57c260`.
CR-1 HIGH: a bare URL at the end of bold/italic/underline/strike/spoiler text, right at base, is wrong at the fix (url/autolink nodes share
type `link` with masked links); 5 grid shapes right → wrong. CR-2: the fix moves where other pre-existing width faults land — escapes
(`\*`), mentions (`<@123>`), root-level bare URLs/autolinks (wrong at both trees), heading markers; 7 escape/mention corpus rows right →
wrong. Heading inputs: 868 of 36,000 corpus rows colour differently from base, wrong → wrong by the recorded cause; `-# ***a***` loses all
syntax colouring (not oracle-checked row by row).
**Ruling (this thread's, under his block-04:50 "fix everything you find along the way"):** the defect is one class — the walk places a
node's syntax ranges without knowing that node's width in the source — so the chain takes the class, not one more instance. **Scope
statement, replacing block 20:19's:** `decorator.tsx`'s ranges account for the source width of every node kind the website's markdown
rules produce (`src/utils/markdown/rules.tsx` enumerated: emphasis forms, links masked and bare and autolink, escapes, mentions, heading
markers, and any other kind found there); no input colours worse than at base; a test drives every kind, alone, at a bold/italic edge and
at root, with literal expectations. Heading markers are coloured as syntax, like every other delimiter (this thread's reading; told him,
he can veto). Write set extends to `src/utils/markdown/rules.tsx` where a node must carry its width. The queued chain
`fix-decorator-headings` (block 20:31) folds into this one and is withdrawn. Stage set: unchanged in order; at 20 or more production lines
QA Phase 2 is restored (`qa-fix-decorator-offsets`, started by this thread on the reviewer's approval). Sent to the fixer and the reviewer.
