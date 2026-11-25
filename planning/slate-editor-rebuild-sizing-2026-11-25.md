---
UUID: 9e25f695
Parent: slate-editor-design-2026-11-25
Status: Active
Status-Detail: "A sizing for the owner's choice, with no ID and no plan: a rebuild of the website editor's Slate layer on Discord's model, as its own effort after plan 019's release. Stays Active until he chooses whether to rebuild; a rebuild's plan then mints its own ID and cites this."
---

# Sizing: rebuilding the editor's Slate layer on Discord's model, as an effort after plan 019's release

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-25T15:29 | 0 | planner-019 | Written on steering's commission (effort rulings block "2026-11-25T15:25Z", record `903a6252`), narrowed by block "2026-11-25T15:28Z" (record `f3096590`). Scope delta: none — a sizing, no plan. |

## What was asked, and what binds it

- **The commission** (block 15:25Z, his selection "Agent: size a rebuild first (Recommended)"). Size a rebuild of the editor's
  Slate layer on Discord's model as `research/slate-editor-design-2026-11-25.md` (record `0f8b22cf`) describes it: flat lines,
  structure kept up in passes after each change rather than inside `normalizeNode`, and one builder for load and edit. The
  owner needs back:
  - the rebuild's size;
  - what it changes in 019's criteria;
  - what it removes, re-runs or adds;
  - its timing.
- **The timing is settled** (block 15:28Z, his words): "019 will not carry the new work." A rebuild is its own effort, after 019
  releases on the current editor under D-19. It is never a revision, milestone or rider of 019. So this sizes that one timing.
  He has not chosen to rebuild, so there is no ID and no plan.
- **Two premises he set for a rebuild only** (block 15:25Z, his selections). They change no criterion of 019's Revision 25, and
  D-13 stands for 019. They are recorded here, for a rebuild plan to register as its own Decisions Register rows. The words are
  the option labels he selected; steering-hooks-fixer authored the option text (ledger `steering/selection-ledger/2026-11-25.md`,
  block "2026-11-25T15:25Z").
  - Emoji, research OQ-1: "Agent: per line, like Discord (Recommended)". The option text says it matches Discord's box and
    removes that crash family. It also says that in wrapped inline code the editor shows a picture where the preview shows code
    text, which is expected of Discord's box but has not been seen there.
  - Quote marker, research OQ-2: "Agent: hidden, like Discord (Recommended)". The option text says the site still stores the
    marker beside the text, so some of that bug family can return.

## The answer in brief

- **Size.** About 865 of the Slate layer's 1,558 production lines are replaced, and about 459 more are adapted to the new line
  shape. 234 are kept unchanged. Of its 42 test files (3,806 lines), 25 (3,018 lines) are rewritten or retired, and 17
  (788 lines) are kept. It runs the full stage set as its own chain: plan, critic, architect, QA Phase 1, an analysis
  milestone, implementation, code review, QA Phase 2, UAT, release and QA Phase 3.
- **019 is unchanged.** It loses no stage, gains none, and none of its criteria change. Four open handoffs on the Slate layer,
  three from 019's chain and one from the fixer chain before it, become the rebuild's to discharge (§ "What it does to 019").
- **019's released criteria become the rebuild's specification.** The behaviour they describe is kept. Their mechanism clauses
  are rewritten: AC-6.5's run unit, AC-6.8's per-run-unit count, and AC-6.9's suppression sub-limb and inline-code members. The
  comparison base moves from the chain base `af3d95a` to 019's released tree (§ "What 019's criteria become").
- **The preview, the engine and the oracle are untouched.** The colouring keeps its pure functions, and only its per-line glue
  is adapted (OQ-4, below).

## Size

Every count is at website `48eb60a` (the chain tip, 2026-11-25T12:18Z), read with `git cat-file blob <sha>:<path> | grep -c ''`
per file over `git ls-tree -r --name-only 48eb60a -- src/components/SlateEditor` (62 paths). The working lists are in the
planner's scratch directory and are not part of the record.

**Production, 19 files, 1,558 lines.**

| Fate | Files (lines) | Total |
|---|---|---|
| Replaced: the structure upkeep and the second builder | `withNormalizeNode.ts` (600), `emojiLift.ts` (169), `getInitialValue.ts` (65), `codeFence.ts` (20), `quoteMarker.ts` (11) | 865 |
| Adapted to the new line shape | `index.tsx` (154; the plugin wiring), `decorator.tsx` (92), `renderElementFactory.tsx` (63; no `codeBlock` element), `onKeyDown.ts` (59; quote Backspace and Enter), `onCopy.ts` (41), `runUnit.ts` (30), `flattenNodeText.ts` (15; the save), `common.ts` (5) | 459 |
| Kept as they are | `unitStyles.ts` (109), `utils/index.tsx` (43), `onChange.ts` (36), `unitParse.ts` (19), `highlightScan.ts` (18), `RenderLeaf.tsx` (9) | 234 |

- **The new code's size is not measured.** The research's proof of concept runs the three passes in 143 lines, with no React,
  no history and a one-character emoji test (research Appendix B). The layer it replaces does the same jobs in 865 lines,
  plus the suppression and rebuild machinery a pass design does not need (`rebuildLines`, the `getDirtyPaths` override,
  `linesOf`). This is the planner's inference, not a measurement: the new layer is smaller than 865 lines and larger than 143.
- **Outside `SlateEditor`**, the type declarations `src/@types/slate.d.ts` change with the node shape. They are the one file in
  `src` outside the directory that imports Slate (`git grep -l "from 'slate"` at `48eb60a`). The product mounts the editor
  through a string-in, string-out contract (research P4-4), so no other product file changes.

**Tests, 42 files, 3,806 lines** (the one data file is left out). A file counts as structure-bound if it names a node field
(`quotePrefix`, `startCodeBlock`, `carried`, `codeBlock`, `blockQuote`) or imports a replaced or adapted module by relative
path. The predicate is the planner's grep, not a read of each file.

| Fate | Files | Lines |
|---|---|---|
| Rewritten or retired with the structure | 25: the `withNormalizeNode.*`, `emojiLift.*`, `getInitialValue.*`, `decorator.*`, `onCopy.*` and `renderElementFactory.*` files, and the helpers `fenceAndQuoteKeystrokes.ts`, `keystrokes.ts`, `mountedEditor.tsx`, `emojiInputs.ts` and `blockLayerEdits.ts` | 3,018 |
| Kept: they drive the mounted editor and read the text it reports, or test a kept pure function | 17: the nine `SlateEditor.*.test.tsx` files, `roundTripInputs.classes.test.ts`, `unitStyles.char-classes`, `highlightScan.scope-classes`, the two timed benches, and the helpers `roundTripInputs.ts`, `quoteTable.ts` and `markdownProviderMock.ts` | 788 |

The research counts 12 structure-field files, and this predicate counts 17. The difference is not reconciled, because the
research's script was not read. Its 16 internal-import files match this count.
The two benches pass the predicate, but they time keystrokes through the mounted editor, so they are kept, re-pointed if their
helper moves.

**Yardstick: what 019's M6 cost on the current model.** M6 ran from M5's tip `2e36107` (2026-11-24T03:43Z) to `48eb60a`
(2026-11-25T12:18Z): 52 website commits (`git rev-list --count 2e36107..48eb60a`), and 77 files changed under `src` with 3,199
lines added and 1,487 deleted (`git diff --numstat`). That took seven deliveries (the first and Fix Rounds 1 to 6), plan
revisions 13 to 25, and code review Rounds 6 to 9 with their sub-entries.
- A rebuild writes a layer of that kind again, against criteria already written.
- The research's helper counts the cap-throw class in four of M6's six fix rounds (research P4-2, its count, not re-counted
  here). The proof of concept shows that class absent by design for fences, `>>>` and per-line emoji (research P3-2, P3-3).
- How many fix rounds a rebuild takes is not predictable from this. The planner expects fewer than M6's, because the classes
  that drove M6's rounds are designed out, but that is not a measurement.

## What it re-runs

The rebuild is its own chain, so every editor-facing criterion is verified again on the new code. Its plan carries each one
from 019 as a carried criterion, re-derived against its own base, which is 019's released tree.

| 019 criterion | In the rebuild |
|---|---|
| AC-2.x (engine, adapter, pin, masks), AC-3.1, AC-3.6 to AC-3.8 (preview oracle, renderer, legacy surfaces, staleness), M4's AC-4.1 to AC-4.8 (the preview) | **Not re-run.** The preview, the adapter and the oracle are untouched (P4-4; `preview.tsx` names neither `SlateEditor` nor `slate`, `git grep -c` exit 1 at `48eb60a`) |
| AC-3.2 (editor oracle), AC-3.3 (round trip, with the mounted generator at `MOUNTED_GENERATOR_COUNT=1000`), AC-3.4 (seen red) | **Re-run, unchanged in text.** They are text in and text out |
| AC-5.1 to AC-5.8 (colouring) | **Re-run.** AC-5.2 (split invariance) and AC-5.7 (one parse per unit) are re-derived over the new run unit (OQ-4) |
| AC-6.1, AC-6.1b, AC-6.2 (emoji forms round trip), AC-6.3 (the guild-emoji picker, UAT B-4 with its local Postgres and sign-in provisioning), AC-6.4 (stated limit) | **Re-run, unchanged in text** |
| AC-6.6 (`simple-markdown` gone) | **One read, not a re-run.** 019 removes it. The rebuild reads its first limb again at its tip, with AC-2.1's module-graph instrument |
| AC-6.7 (quote continuation table) | **Re-run.** The table is the specification, and the quote pass now implements it |
| AC-6.5, AC-6.8, AC-6.9 | **Rewritten in their mechanism clauses** (next section) |
| UAT walks B-4, B-9, B-10, B-11, and SL-15's walk list | **Re-walked** on the rebuild's build |
| QA Phase 3, the release | **Its own** |

It adds:
- an **analysis milestone before code**, on four questions the research leaves open:
  - research G-3, `slate-history` undo under passes that run after a change (the proof of concept has no history);
  - research G-10, Slate 0.123.0 to 0.147.4 (whether the rebuild also upgrades Slate is a scope question for its plan);
  - which reading of "this line is code" the code-state pass takes: the fence count (Discord's older path) or the engine's
    `code_block` spans (its native path, and handoff CF-36's recommended form);
  - OQ-4's run boundary;
- an **owner step** for research P3-6. Seeing Discord's box on the native path decide an emoji inside cross-line inline code
  needs an account in Discord's native experiment, which the test account is not (research G-1). His Q2 option text already
  accepts the divergence unseen. So this is optional, and the plan states it as a limit if no account can be had.

## What 019's criteria become

AC-6.5, AC-6.8 and AC-6.9 hold as released behaviour of 019. In a rebuild plan they are carried and re-derived, as below.

- **AC-6.5, the emoji lift reads the engine (D-13).**
  - Kept: the expected spans come from the engine, so D-13 holds in its own words: "The editor's lift takes its emoji from
    Discord's formatter". The typed-edit property stays: after any edit, the emoji elements equal what a fresh load of the text
    gives.
  - Rewritten: the unit. The lift parses each line alone, with its code state, under his Q2. The expected spans are regenerated
    per line by the oracle helper, `discordOracle.ts` `nativeSurfaceParse`, over each line's text. "Which text it hands the
    engine (critic Q1)", which joins the run unit with the decorator's, is retired.
  - The rebuild's register needs a row narrowing D-13's unit from the run to the line. That row is D-13 changed by his Q2, so
    it is put to him as its own text when the plan is written.
  - The inputs where the per-line set and the run set differ are an inline-code span that crosses a line break around an emoji
    (research P3-6). They become a stated divergence between the editor and the preview, worded as his Q2 option text words it.
    The size of that set over 019's corpus is not measured. The rebuild's analysis milestone counts it.
- **AC-6.8, one keystroke's cost (D-23).**
  - Kept: the timed limb (a 16 ms median per keystroke) and its texts, plain and `a🙂` at 200 and 2,048 lines, and the fenced
    quote. That limb is behaviour. QAF-56 (QA, record `3ffb466`) asks how many runs make a reading. The rebuild's plan answers
    it in the limb's text, whatever 019's fold decides.
  - Rewritten: the count limb. "Works per run unit, not per line", observed through `spansInLine` and `afterLine`, is the
    current mechanism. Under passes, a keystroke that changes one line's state makes each pass visit that line's state once.
    So the count is restated over the passes' line visits, with the same cross-size equality at 200 and 2,048 lines and the
    same positive control. The observation points are new.
- **AC-6.9, code-fence, `>>>` and paste settle (D-24 to D-28, D-31).**
  - Kept: the headline properties (no throw, the write, a fresh load, the caret, work per line, the timed growth and the
    ceilings), CF-30's "not met by hiding the throw", the fence, `>>>` and paste members, and their text classes.
  - Changed by his Q2: D-28's six inline-code members leave the class "changes other lines". With emoji decided per line, a
    backtick on line 0 changes no other line (research P3-3: 0 lines changed and 2 operations at 5 to 1,000 `a🙂` lines in the
    proof of concept). They become controls asserting exactly that, and D-31's count members go with them. Removing them from
    the class follows from his Q2, so the rebuild plan says so beside D-28.
  - Retired with the mechanism: the sub-limb "A suppressed line is a fixed point" (R-111, CF-35), because there is no
    `getDirtyPaths` suppression. Its successor is "a second run of the passes applies no operation", which the proof of
    concept reads at 0 in every cell (research P3-2). R-129's off-selection condition and CR-31's move case are not owed as
    named members: the passes key on any document change, not on the selection or on `linesOf`. The plan states the class by
    its effect ("every edit", F-62's wording), so a drag-and-drop move, an off-selection transform and a move are members, each
    with a case.
  - Re-based: the timed ceilings (27 and 104 ms) and SL-29's yardstick come from `af3d95a`. A rebuild compares against 019's
    released tree instead. Opening a fence above 1,000 `a🙂` lines took 4,000 operations and 672 ms in the proof of concept
    (research P3-4, one headless reading). The work-per-line limb bounds that, and it is the case to watch against 019's release.
- **The quote marker (his Q3).** It stays hidden and stored beside the text, as in 019. So AC-6.7's table and the C4 class
  stay, and the rebuild does not remove that bug family, as his option text said.

## What it does to 019

- **No stage of 019 is removed, re-run or added**, and no criterion changes (block 15:28Z). M6's QA Phase 2, the seam fold,
  UAT and M7 run on the current editor as planned.
- **Four open handoffs** (`Status: Open` in `handoff/`, matched by `grep -i -E 'SlateEditor|withNormalizeNode|slate-'` at this
  write; a fifth match, on the preview's fenced-code test, names no editor code) have a review trigger that a rebuild fires,
  because it edits the code they name. The rebuild's plan dispositions each at entry:
  - `slate-code-line-emoji-load-normaliser-disagree-2026-11-25.md` (C3; one builder and the engine's code state discharge it);
  - `slate-smart-quote-repair-untested-2026-11-24.md`;
  - `slateeditor-index-preexisting-react-hooks-lint-errors-2026-11-24.md`;
  - `fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md`, from the fixer chain before 019, whose trigger
    names the picker's insert path and a signed-in walk.
- **019's seam fold may name the rebuild in the residue it writes.** Rows whose limit a rebuild removes, such as CR-31, R-129's
  unbound off-selection forms and CR-30, may state "a rebuild, if he opens one, discharges this" beside their carrier. That
  sentence changes no criterion. Whether to write it is the fold's call, not settled here.

## OQ-4: colouring and preview under a rebuild

Read at website `48eb60a` (`git show` of `decorator.tsx`, `runUnit.ts`, `unitParse.ts`):
- **The preview** needs no change. It does not reference the editor, and the rebuild leaves the adapter and the oracle alone.
- **The colouring's pure functions** need no change: `styleUnit` (`unitStyles.ts`), `parseUnit` (`unitParse.ts`) and
  `scanHighlight`. They take a unit's text and its start-in-code flag and return per-character styles.
- **The glue reads the current structure**, so it is adapted:
  - `decorator.tsx` sends a line with `lang` to highlight.js, returns nothing for `type === 'codeBlock'`, and counts an
    emoji element as one character;
  - `runUnit.ts` `unitAround` ends a run at a `codeBlock` element, puts `quotePrefix` back in front of a quote line, and
    reads `startCodeBlock` from the run's first line.
  Under Discord's model a code line is a `line` with a code-state attribute and there is no `codeBlock` element. These field
  reads move to the new attribute. That is about 122 lines, counted in "adapted" above.
- **The run boundary is a design choice.** Today a run stops at the code lines. Discord's native colouring joins consecutive
  `line` and `blockQuote` blocks (research P1-5), and in its model code lines are `line`s. Which boundary the rebuild takes
  decides AC-5.2's and AC-5.7's unit. It is an analysis question, not this sizing's.

## Not measured, and what would measure it

- The new layer's line count, and its fix-round count. Either is read only by building it.
- How many inputs over 019's corpus differ between per-line and per-run emoji. The rebuild's analysis milestone would count
  them by running the oracle helper both ways.
- The cost of a mounted fence open over 1,000 `a🙂` lines under passes. The proof of concept read 672 ms headless, once. The
  rebuild's first delivery would read it against 019's release.
- The size of a Slate upgrade, if the rebuild takes one (research G-10).
