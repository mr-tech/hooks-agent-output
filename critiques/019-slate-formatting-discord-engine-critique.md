---
ID: 019
Origin: 019
UUID: 286c730a
Status: Open
Status-Detail: "Cycle 1 pass 1 on plan revision 1: REQUEST REVISION. F-1 to F-23 OPEN (3 HIGH, 15 MEDIUM, 5 LOW). One open question in the plan, OQ-4, is the architect's. Waits on the planner's next revision."
Artifact-Revision: 1 — read whole (cycle 1 pass 1)
Reviewed-At: "103687b4 — repos=agent-output; website read at af3d95a (a scratch export), 0411d3b and 61e5dfe; preview-image-generator at 8512a1d"
Verdict: REQUEST REVISION
---

# Critique — Plan 019, Slate formatting on Discord's engine

**Artifact**: `planning/019-slate-formatting-discord-engine.md`, revision 1 (`103687b4`), read whole.
**Analysis**: M1's document is not committed yet (`analysis/` holds none for 019), so none was read.
**Read this pass**: the critic brief and the common brief; effort rulings `steering/fixer-queue-2026-11-21-rulings.md`, whole;
the architect's pre-planning findings (`86418be`); the inventory; the research document's Question to Recommendations
sections (`research/closed/slate-formatting-discord-oracle-2026-11-23.md`); `architecture/website.md`;
`architecture/system-architecture.md` Components, Dependencies, the three Problem Areas rows the plan names, D-001 and D-003;
`steering/019-brief-analyst.md` and `steering/019-brief-devops.md`; `planning/closed/018-next-upgrade-save-size-cap.md` OQ-5
and RK-7. Code: website at `af3d95a` (`MarkdownProvider.tsx`, `utils/markdown/index.tsx` and `utils.ts`, the rule keys of
`rules.tsx`, `SlateEditor/index.tsx`, `decorator.tsx`, `getInitialValue.ts`, the surfaces' parser and mode props);
`preview-image-generator@8512a1d src/generateImage.ts`; `@discord/markdown-wasm@0.16.0` and `@discord/markdown-types@0.14.0`
from `npm pack` (`parse.d.ts`, `package.json`, `index.d.ts`, `syntax.d.ts`).
**Roadmap**: `roadmap/` holds no roadmap document, so alignment is judged against the rulings and the architecture record.
**Date**: 2026-11-23.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-23T16:11 | steering-hooks-fixer (brief `steering/019-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | Depth: whole-document, the cycle's first pass, at `103687b4`. Artifact changes: none before this pass. New findings: F-1 to F-23 (3 HIGH, 15 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. One lookup of this pass's website export was not completed, then re-run with literal paths (effort rulings block 15:29Z). |

## Verdict

**REQUEST REVISION — cycle 1, pass 1.**

Pricing: sized to the ask. The seven milestones cover the scope statement of block 09:18Z, the engine he chose at 15:23Z
(D-6) with the architect's seven integration requirements, and steering's three additions inside the region (block
15:49Z). Nothing in the plan is machinery beyond those. One rider is attached, R-A, and it is flagged: it has no
criterion line (F-16).

Three findings stop approval:

- **F-1.** M1 is accepted even when its items end "not completed", and seven later criteria take their expected values
  from those items.
- **F-2.** The plan adds a command that every release gate runs and does not say what a gate does when it is red. One of
  its causes, Discord shipping a new parser build, has happened about weekly.
- **F-3.** The loading state is changed from "hidden until ready" to "plain text, then formatted" without the plan
  saying it departs from today's behaviour.

Four findings share one shape (F-3, F-8, F-9, F-11): the plan says what the site or the project does today, and the
code or the record at the receiving end says otherwise. Prediction for the plan's Risks, which the planner is asked to
register: "a statement in M2 to M6 of what the site does today (a loading state, an editor mode, a refusal, an input the
block layer supplies, a build target) is contradicted by the code at the base or by a closed plan." Falsifier: a later
pass or stage finding one more.

No milestone is marked `PREMISE-STALE`. `Target-Release` equals the scoping block's end step ("website `master`, Vercel
production", block 09:18Z). The stop authority did not fire: no gate's finding has been folded yet, so nothing here is a
second instance. The hard stop did not fire (pass 1 of 15). The plan holds one open question, OQ-4, which is the
architect's (below).

Nothing is routed to the owner from this pass. F-2 and F-7 may each end in a question to him once the planner writes
them. One fact went to steering at this pass because a stage is acting on it now (F-11).

## Value Statement Assessment

Present, in user-story form, and delivered directly: the preview and the editor move in one release, and the fuzzer lands
in the suite. The standard is reframed to "where both of Discord's formatters agree", and the reframe is marked with the
original beside it. The outcome is checkable on the agree class through AC-3.1 and AC-3.2. It serves the product's
purpose as the architecture record states it (a Discord message and embed builder): no drift.

Two gaps, both filed. Outside the agree class the statement's outcome has no criterion (F-6). On the five surfaces other
than message content, what "the way Discord does" means waits on AN-3, and the plan has no clause for one of its two
possible results (F-7).

## Assumption Not Checked

Cycle 1 pass 1: this pass assumes the research's class sizes (the two Discord parsers agree on 235 of 272 corpus cases as
written and disagree on 33 of the stored texts; V-8, V-18) and does not test them. Neither parser was run in this pass,
and the research's captures live in a scratch directory outside the record. If the figures are false, M3's first
classification of the lifted corpus returns different class sizes. Closing it is the analyst's at AN-4 and the
implementer's at M3, whose AC-3.4 records the counts by class.

P-2 was a candidate for this line and was run instead: `git -C preview-image-generator show
8512a1d:src/generateImage.ts`, read whole. `generateMessagePreviewImage` calls `page.goto(url, { waitUntil:
'networkidle0' })` and then `page.screenshot`, with no wait on the page's content. P-2 holds.

## Unresolved Open Questions

One: **OQ-4** (S-14: which public highlight.js 11.12.0 surface gives the token tree in place of `_emitter.rootNode`).
The plan addresses it to the architect at conformance and to AN-6, not to the owner, and writes both outcomes: a public
surface, or a stated limit carried by the Problem Areas row. This pass does not approve. If OQ-4 is still open at the
approving pass, the selection is put then: "This plan has 1 unresolved open question. Approve for implementation with it
unresolved, or have the planner address it first?"

## Findings

### High

F-1 HIGH cycle 1 pass 1 — OPEN — M1 is accepted with its items "not completed", and seven later criteria take their expected values from those items
- **Location**: M1 § Acceptance; AC-2.3, AC-3.1, AC-3.2, AC-4.2, AC-4.3, AC-5.5, AC-5.6; D-10 and D-11 "Reopened by"; OQ-4.
- **Description**: M1's acceptance reads "states a result, with its capture path, for every AN item, or marks the item
  not completed". Only AN-1 and AN-2 are pass or fail. So 5 of the 7 items can end "not completed" and M1 still passes.
  What each of the five feeds:

  | Item | What takes its output |
  |---|---|
  | AN-3 | AC-2.3's literals; the surfaces AC-3.1 runs on |
  | AN-4 | AC-3.1's oracle and the parse state it runs under (G-14); AC-3.5's locator |
  | AN-5 | AC-4.2's label; the tree M4 renders from; AC-4.3's span |
  | AN-6 | AC-3.2's and AC-5.6's literals; AC-5.5's cases; D-11's reopening read; OQ-4 |
  | AN-7 | D-10's reopening read; AC-3.1's check on masked links with an emoji label |

- **Impact**: M2 can reach implementation approval with no mask table. The implementer would then write the masks and
  their expected values from one reading, which AC-2.3's independence clause forbids.
- **Recommendation**: for each AN item, say what "not completed" does: which criterion or approval it holds, or which
  named limit it becomes and who decides. M1's heading already says "REQUIRED before M2's implementation approval"; the
  acceptance should say the same item by item.

F-2 HIGH cycle 1 pass 1 — OPEN — A red `pnpm test:discord` at a gate has no stated outcome, and one of its causes has come about weekly
- **Location**: M3 (opening paragraph, "Drift alarm", AC-3.5); D-12; D-5 "Reopened by"; M7; RK-6.
- **Description**:
  - The command can fail for four causes: the fetch fails (AC-3.5); Discord's served wasm differs from the pinned one
    (the drift alarm); a locator predicate matches no module or several (AC-3.5); the site differs from the oracle. Only
    the last is a defect in the site. The plan says the command "runs at QA Phase 2 and 3 and on every pin change" and
    does not say what a gate does with a red from the first three.
  - Rate: `npm view @discord/markdown-wasm time --json`, run in this pass, gives six releases from 0.11.0 (2026-10-13) to
    0.16.0 (2026-11-16), 2, 8, 3, 9 and 12 days apart. The package's releases are taken here as the measure of how often
    the served build moves (research V-4 found the two byte-equal on 2026-11-23). The newest is 7 days old, and
    implementation waits behind chain 9e. A drift red between M2's pin and Phase 3 is the likely case, not an edge.
  - A pin change inside the chain moves AC-2.2's literal `0.16.0`, AC-2.3's 31 bits, AC-2.4's 16 and 21 kinds and the
    init-failure line's `version=`. The plan does not say so.
  - D-12's "every release gate" reaches later chains. No standing file tells a later chain's QA that the command exists
    or what its red means: the workspace `CLAUDE.md` Test Conventions name `pnpm test` only, and M7 lists no update.
  - D-5's row names the drift alarm as the instrument that shows "Discord's switch ends". The drift alarm reads the
    native wasm's hash. The legacy parser leaving the bundle would show as a locator predicate matching no module, and
    from then on AC-3.1 and AC-3.2 have no expected values.
- **Impact**: either releases wait on Discord's release schedule, or a red gate is passed by hand under no rule and
  stops meaning anything.
- **Recommendation**: a table of cause × gate (this chain's Phase 2 and Phase 3, a pin change, a later chain's release
  gate) giving the outcome and who acts; the release-interval figure beside the drift alarm; the standing file that
  carries D-12's "every release gate" clause after this chain closes, and who proposes the edit; D-5's instrument
  corrected. Where an outcome makes a release wait on Discord, the option he chose for D-12 did not show that cost
  (block 15:49Z), so that outcome goes to him through steering.

F-3 HIGH cycle 1 pass 1 — OPEN — The loading state departs from today's behaviour, and the plan does not say so
- **Location**: M2 ("Until init resolves, consumers render the plain text, never an empty block (AF-7)"); AC-2.5; P-4; RK-2.
- **Description**: at `af3d95a` the message is hidden until the markdown module has loaded:
  `src/components/DiscordMessageEditor/index.tsx` (`show={!!(markdown && (onMount || mounted))}`) and
  `src/components/DiscordContentEditor/index.tsx` (renders `null` while `!markdown`); the read-only branch of
  `EmbedField.tsx` does the same. A failed import leaves it hidden (`src/providers/MarkdownProvider.tsx` `useValue`). AF-7's plain-text sentence is about a failed `init`. The plan
  applies it to the pending state too and cites AF-7 for both. M2's "Mirrors" line cites `useValue` for the lazy load
  and marks no deviation, and P-4's consumer list leaves out `DiscordMessageEditor/index.tsx`, the file that holds the
  gate.
- **Impact**: every load of every page that renders markdown would show unformatted text and then redraw it formatted,
  for a time AN-1 has not measured yet, over a download of 450,861 bytes gzipped on a cold cache (effort rulings block
  15:23Z). Today those pages show nothing until ready. A preview image captured too early is a blank frame today; under AC-2.5 it is an unformatted message that
  looks like a real preview (F-4).
- **Recommendation**: keep today's behaviour for pending and AF-7's plain text for rejected. Or mark the pending limb as
  a deviation with its reason, in which case it is a behaviour choice with more than one reasonable answer and goes to
  him (D-7). AN-2 says which pending behaviour its captures ran under.

### Medium

F-4 MEDIUM cycle 1 pass 1 — OPEN — RK-2 is tested on this box only, and a pass records no margin
- **Location**: AN-2; RK-2; Testing Strategy, "Post-deploy observable".
- **Description**: the wasm compile and the first formatted render happen after the last network byte, on the capturing
  host's CPU. AN-2 runs on this box against a local build, and it measures "the gap between network quiet and the first
  formatted render" only when a capture fails. A pass of 150 of 150 says nothing about how near the generator's own host
  runs to the edge. The length of puppeteer's quiet window at the generator's pinned version was not read in this pass.
  After release nothing reads a generated image: the one post-deploy observation is a link in the editor.
- **Impact**: every preview image made after the release rests on a margin nobody has measured.
- **Recommendation**: AN-2 records the gap on a pass as well. RK-2 names a falsifier that reads production, with its
  carrier, or states the limit and who would notice.

F-5 MEDIUM cycle 1 pass 1 — OPEN — AC-2.4 takes its class from a type file that does not declare what `parse` returns
- **Location**: AC-2.4; RK-3; AC-2.3.
- **Description**:
  - `@discord/markdown-wasm@0.16.0 src/parse.d.ts:parse` declares `Block[]`. `@discord/markdown-types@0.14.0
    index.d.ts:Block` is `Empty | Heading | List | Quote | Subtext`. `Inline` has no `text` member, while `Paragraph`'s
    value and `Heading`'s content are `Inline[]`.
  - The plan's own capture (`verification/019/planning/parse-spans-probe.out`) shows `paragraph` at the top level for
    three of its four inputs, and `text` inside paragraph, heading and subtext content.
  - AC-2.4 lists the two as "observed in P-1" and then says "A kind added by a later pin fails the type-check, because
    the maps are exhaustive over the union". RK-3 rests on the same sentence. The union already omits two kinds the
    parser returns at this pin, and four inputs were enough to find them.
  - Counts checked against the same file, all matching the plan: 31 single-bit `Syntax` members (`grep -c readonly`
    gives 38; seven are the groups `EMOJI`, `LINKS`, `MENTIONS`, `CODE_SPANS`, `ITALIC`, `QUOTES` and `ALL`), 16
    `LosslessNodeKind` members and 21 `TokenKind` members (counted from the file in this pass).
  - `syntax.d.ts` says a flags value of `0` means `Syntax.ALL`. AC-2.3 compares masks "bit for bit" and does not carry
    the rule. A surface that AN-3 finds to allow no syntax cannot be written as a mask.
- **Impact**: a pin change that adds a kind the types do not declare passes the type-check, and the plan does not say
  what the preview draws for a kind outside the map.
- **Recommendation**: AC-2.4 names two enumerators: the declared unions, and the set of `type` values the engine returns
  over M3's input classes, every one a key of the map. RK-3 says what the type-check catches and what it does not. The
  plan states what an unmapped kind renders as, or records it as a limit. AC-2.3 states the `0` rule.

F-6 MEDIUM cycle 1 pass 1 — OPEN — Nothing states what the site draws on inputs outside the agree class
- **Location**: Objective ("Everywhere else, the site follows the native formatter"); M3 "Three-way classification" and
  "Known-differences report"; AC-3.1; AC-4.1; AC-5.1.
- **Description**: AC-3.1 and AC-3.2 assert the agree class. For the disagree class the report prints "the site follows
  native" on each row, and no criterion checks that it does. For the native-only class no outcome is written at all: it
  is not asserted, and the report is generated "from the disagree class". Sizes: 33 of the 272 stored corpus texts
  disagree (research V-18), and native-only is every input on any surface AN-3 puts there. The disagree class is also
  where the engine's output is hardest for the site's renderers: a spoiler split across blocks arrives as fragments that
  share an `id` (`@discord/markdown-types@0.14.0 index.d.ts:Spoiler`). D-5 removes Discord as the standard on that class.
  It does not remove the plan's own sentence.
- **Impact**: a rendering defect that shows only on those inputs passes every criterion, and the report would still say
  the site follows native.
- **Recommendation**: carry the three classes as a table: class, what is asserted, against what, where the class is
  listed. Give native-only an outcome. State "follows native" as a property over the two classes, or record it as a
  limit naming who bears detection. How its expected value stays independent of the code under test is the planner's and
  QA's to settle.

F-7 MEDIUM cycle 1 pass 1 — OPEN — AN-3 has no clause for a surface that Discord parses with one formatter only
- **Location**: AN-3; D-5; D-6; RK-4; the "Unit" scope assumption.
- **Description**: D-5 and RK-4 rest on two formatters chosen per user, and the cost he was shown was measured on message
  content: 33 of 272 (block 15:23Z). Research H-3 holds, at low to medium confidence, that embed text is parsed by the
  legacy rule sets even where the native parser is on. If AN-3 confirms that for any of the five other surfaces, then on
  that surface the "native tree" is the site's own choice of mask and not a second Discord formatter. Every difference
  from the legacy parser there is a difference from what every Discord user sees, and its size is unmeasured (research
  G-9). AN-1, AN-2, AN-6 and AN-7 each say where a contrary result goes. AN-3 does not.
- **Impact**: M2's masks would be built and M4 approved with a cost, on five of the six surfaces, that no ruling has seen.
- **Recommendation**: AN-3 says where such a result goes and before which approval: to him, through steering, with the
  per-surface disagree count that M3's classification gives. This is a question under D-5's own premise, not a
  re-opening of D-5.

F-8 MEDIUM cycle 1 pass 1 — OPEN — AC-5.6's per-line rule names no class of run, and as written it unstyles code fences
- **Location**: AC-5.6; M5 ("Code lines keep highlight.js"); D-11.
- **Description**: AC-5.6 reads "Each line's classes are computed from that line's text alone: a run whose delimiters sit
  on different lines styles neither line." A code fence is such a run. Today a code line is styled from its Slate element
  and a fence line from block state, not from the line's text: `src/components/SlateEditor/utils/decorator.tsx`, default
  export (`ancestor.lang`; `inCodeBlock: ancestor.startCodeBlock`), set by `getInitialValue.ts` and `codeFence.ts`.
  Research V-21 shows Discord's own box styling fences and highlighting the lines between them. D-11's option text is
  "each line styled alone".
- **Impact**: AC-5.6 contradicts M5's body, AC-5.3 and AC-5.4. An implementer who follows the criterion drops fence
  styling.
- **Recommendation**: name the class the rule covers (the inline runs: the five `ModifierKind` members, inline code and
  links), and say that code-line, fence-line and quote-line context comes from the Slate layer. That is the plan's
  "Layer" scope assumption written into the criterion.

F-9 MEDIUM cycle 1 pass 1 — OPEN — AC-3.3 ranges over inputs and not over the editor's mode, and two existing refusals contradict its paste limb
- **Location**: AC-3.3; AC-6.1.
- **Description**: `src/components/SlateEditor/index.tsx` takes `partialMarkdown`, which the embed title and field-name
  editors set (`EmbedTitle.tsx`, `EmbedField.tsx`). In that mode `getInitialValue` skips quote and fence recognition, and
  `onPaste` refuses a paste that holds a line break. In both modes `onPaste` refuses a paste over 6,000 characters
  (`MAX_PASTE_LENGTH`). AC-3.3 says "pasting it whole yields the same text" for every input of the generator, the corpus
  and the probe corpus, and names no mode.
- **Impact**: the paste limb is false by design for multi-line inputs in two of the six editors, and the load, save and
  typing limbs are unstated for that mode.
- **Recommendation**: state the mode dimension and each mode's accepted inputs, with the two refusals written as today's
  failure-path behaviour: kept, or changed by a decision.

F-10 MEDIUM cycle 1 pass 1 — OPEN — AC-3.4's mutation cannot make AC-3.3 fail
- **Location**: AC-3.4; AC-3.3.
- **Description**: AC-3.4 wants each criterion shown failing at the base and "under a restored one-token mutation of the
  adapter's maps". AC-3.3's four properties run `getInitialValue`, `flattenNodeText`, a mounted editor and the
  normaliser. None reads the adapter's maps. Its normalisation limb is also green at the base: the loop fix is in
  `af3d95a` (`withNormalizeNode.quote-and-fence-lines-settle.test.tsx` is in that tree).
- **Impact**: for that limb neither instrument AC-3.4 names can show red, so the criterion as written cannot meet axiom A.
- **Recommendation**: AC-3.4 names what is mutated per criterion as a class, the code each property exercises, in place
  of the adapter's maps for all three.

F-11 MEDIUM cycle 1 pass 1 — OPEN — AN-1's Vercel limb is marked unread, and a closed plan on this repository holds the read
- **Location**: AN-1, fourth bullet ("if the project builds branch previews. That is unread").
- **Description**: `planning/closed/018-next-upgrade-save-size-cap.md`, OQ-5 `[RESOLVED]` and RK-7: "A push whose tree has
  no build-command override does not reach READY in the Preview environment." `src/env.mjs` requires five variables that
  the project gives to Production only (`verification/017/m5-0/devops/preview-env-names.txt`, read 2026-11-19). The two
  READY previews on record came from a branch whose one change was a `vercel.json` build command carrying
  `SKIP_ENV_VALIDATION=1`. At `af3d95a` the tree has no `vercel.json` (`git ls-tree`, 0 entries) and `src/env.mjs` still
  names `SKIP_ENV_VALIDATION` (`grep -c`, 1). Whether the Preview target's variables are the same today was not read in
  this pass. That read is devops's.
- **Impact**: a plain push of the spike branch is predicted to fail its build. "Previews do not build" would then enter
  the analysis as AN-1's Vercel result while the record holds the form that builds one.
- **Recommendation**: AN-1 cites plan 018's RK-7 and its probe form, and says what its Vercel numbers are taken on.
  Steering was told at this pass, because `steering/019-brief-devops.md` lists the same items as not checked and devops
  is acting on that brief now.

F-12 MEDIUM cycle 1 pass 1 — OPEN — The base will move before implementation, and the plan pins its criteria to `af3d95a`
- **Location**: Header notes ("Base", "Target Release"); AC-3.4; M7; P-4; AC-6.1; AC-6.1b.
- **Description**: the header says chain 9e takes the tree first and releases on its own. Read in this pass: the website
  tree is on `chain/fix-image-uploader-url`, and `origin/master` is still `af3d95a` (`git ls-remote`). AC-3.4 ("at the
  base `af3d95a`"), M7 ("from `af3d95a` to the tip"), P-4's consumer list and M6's re-reads all name `af3d95a`. The header
  did this re-derivation once, from `0411d3b` to `af3d95a` (8 files; `git diff --numstat` in this pass agrees). No step
  does it from `af3d95a` to the chain's own base.
- **Recommendation**: define the base as `master` at the chain branch's cut. Name the step and the stage that diffs
  `af3d95a` against it over the region and re-reads the rows the diff touches.

F-13 MEDIUM cycle 1 pass 1 — OPEN — M3 may add a browser driver with no pin rule or lockfile disposition, and its rollback names no runner
- **Location**: AN-4 ("which driver (a new devDependency) and what it costs per run"); M3 § Rollback ("test-only, with no
  production effect"); AC-2.2.
- **Description**: `package.json` at `af3d95a` names neither puppeteer nor playwright. AC-2.2's lockfile disposition is
  M2's. Handoff 02a4cca1 says the site "works while the production install includes devDependencies" (`Status-Detail`;
  the install setting itself was not read in this pass). If so, a driver that downloads a browser at install changes the
  Vercel build although no shipped code changes. AN-4 asks the cost per run, not the cost
  at install. M3's rollback line names no party.
- **Recommendation**: M3 carries the exact-pin rule and the lockfile disposition for anything it adds. AN-4 reports what
  the driver does at install. The rollback names who runs it.

F-14 MEDIUM cycle 1 pass 1 — OPEN — AC-3.1 does not say which canonical form decides the agree class
- **Location**: M3 "Three-way classification" and "Normaliser"; AC-3.1 "Residue".
- **Description**: the research compares in two forms. Discord's two parsers disagree on 50 of 272 cases in the strict
  form and on 37 in the loose one (research V-8). The loose form trims newlines at the edges of text runs and of
  code-block bodies and rewrites URLs to the spelling Discord stores (research, Methodology). The plan says "canonical
  form" and names neither. Thirteen corpus cases change class with the choice, and whatever the chosen form blurs is
  asserted nowhere.
- **Recommendation**: name the form, and list what it blurs as part of AC-3.1's named residue.

F-15 MEDIUM cycle 1 pass 1 — OPEN — The post-deploy observation cites no read of production, and its reader runs before the deploy
- **Location**: Testing Strategy, "Post-deploy observable"; AC-4.2.
- **Description**: "That is false at `af3d95a`" rests on the inventory's LF-1 run, a server-side render in an export at
  `0411d3b`. No read of the production page is cited. "Its reader is devops at Stage 1": Stage 1 ends before the push
  (devops.md, Stage 1 steps 7 and 8), and a post-deploy row is read by the carrier that step creates. The wording "an
  anchor whose `href` is not …" also reads as a pass when the page has no anchor at all, which is what a failed init
  gives.
- **Recommendation**: cite one read of production's present anchor for the two inputs. Name the reader as the carrier's.
  Say that the anchor must exist.

F-16 MEDIUM cycle 1 pass 1 — OPEN — Rider R-A has no acceptance-criterion line
- **Location**: M2, "Rider R-A".
- **Description**: a named rider carries one criterion line, the yield clause and a drop disposition priced in advance
  (planner.md, Plan Scope Guidelines). R-A has the last two. Its handoff's trigger does fire on this milestone
  (`handoff/website-paracord-listed-as-devdependency-but-imported-at-runtime-2026-11-22.md`, `Review-Trigger`, read in
  this pass).
- **Recommendation**: add the line, or drop R-A to its on-next-touch note. Until then it is flagged as scope growth and
  is not priced as a rider.

F-17 MEDIUM cycle 1 pass 1 — OPEN — No Reading Order
- **Location**: the top of the plan.
- **Description**: the file is 528 lines at revision 1 (`grep -c ''`), past the planner's threshold of about 500, and
  folding this pass will lengthen it. Every later stage pays for the missing routing on each read.
- **Recommendation**: add it, with the owed re-verdicts table. Landing trigger: the revision that folds this pass, the
  planner's.

F-18 MEDIUM cycle 1 pass 1 — OPEN — AC-6.3 and AC-6.4 state limits that quote no attempt
- **Location**: AC-6.3 ("where a build can be signed into. Otherwise this is a stated limit"); AC-6.4 ("composition
  events on a phone keyboard cannot be driven from this box").
- **Description**: neither quotes an attempt that failed or what building a way would take (planner.md,
  "Human-observable form"). The record leaves the picker read owed: effort rulings block 09:05Z, item 2, says the
  `discord-test-browser` skill "may be able to drive the guild-emoji picker" and "The read is still owed". His standing default is that a walk no stage can
  run gets what it lacks built (lifecycle `references/escalation.md`, Standing Defaults).
- **Recommendation**: each limit quotes its attempt, or names the provision step that would make the walk possible, from
  plan time.

### Low

F-19 LOW cycle 1 pass 1 — OPEN — Criteria that follow from D-5 and D-4 do not name them
- **Location**: AC-3.1, AC-3.2, AC-4.1, AC-5.1.
- **Description**: their member set is the agree class (D-5) under an oracle fetched at test time (D-4). Neither row is
  named in them.
- **Recommendation**: name the rows, so that a withdrawal retires the members.

F-20 LOW cycle 1 pass 1 — OPEN — Exclusions and residues in milestone bodies have no Exclusions row
- **Location**: AN-7 (the G-11 limit, "the native parser's render stays unseen"); AC-3.1 and AC-3.2 "Residue"; AC-4.4
  ("listed as residue", with no place named); AC-6.1b ("messages already rewritten in production are his").
- **Recommendation**: one Exclusions row each, with its reason and its carrier.

F-21 LOW cycle 1 pass 1 — OPEN — The optional `@discord/markdown-react` is outside AC-2.1 and AC-2.2, and AC-2.6 checks half the notice
- **Location**: M2 (first bullet; the MIT-notice bullet); AC-2.1; AC-2.2; AC-2.6.
- **Description**: M2 lets the implementer take the package "under the same pin rule". AC-2.1's confinement and AC-2.2's
  pin name two packages. AC-2.6 searches for the copyright line, while M2's body requires the permission text as well.
- **Recommendation**: write the conditional package into both criteria, and make AC-2.6 cover both parts of the notice.

F-22 LOW cycle 1 pass 1 — OPEN — M5 and M6 state no re-derivation gate, and M7's handoff names no minting stage
- **Location**: M5; M6; M7 ("Handoff for X-8, minted at closure").
- **Description**: M5 changes what the editor shows. M6 changes the stored form of an emoji (D-10), a stored
  representation. Neither states the gate or says why its downstream population is empty. The X-8 handoff has no stage
  named to mint it.
- **Recommendation**: one line in each milestone, and a named stage in M7.

F-23 LOW cycle 1 pass 1 — OPEN — X-8's visible residue is stated at no milestone, and two sentences are wider than X-8 allows
- **Location**: X-8; the "Emoji lift" scope assumption; Header notes ("closes on landing"); M2 (the `MarkdownProvider`
  bullet).
- **Description**: with X-8, which text becomes an emoji element is still decided by five `simple-markdown` rules and the
  pre-transform (`src/utils/markdown/index.tsx`, `interactive.parseEmoji`), while the preview's emoji come from the
  engine. Where the two differ, the editor shows an emoji and the preview shows text, or the reverse. AC-5.2 keeps the
  colouring independent of this, and nothing names the case. The header says the Problem Area "closes on landing", and M2
  says the provider exposes the adapter "where today it exposes the `simple-markdown` parser map"; under X-8 the provider
  still hands out `parseEmoji`.
- **Recommendation**: state the residue at M5 or M6 with X-8 as its carrier, and reword the M2 sentence. Whether the
  Problem Area closes with the lift left in place is the conformance pass's to rule.

## Questions

1. **Planner.** AC-2.1's range includes `__tests__`, and M3's classification needs the native tree. Do the tests reach the
   engine through the adapter, and with whose masks? A direct import breaks AC-2.1. The adapter's own masks would let a
   wrong mask move an input from "fails" to "known difference".
2. **Planner, QA.** M3 puts the generator's properties, typing included, into `pnpm test`: at least 4,000 strings and
   2,041 fixed inputs (272 + 107 + 1,662). What does the standing suite's run time become? AN-4 reports a run time for
   the Discord command only, and every later chain pays for the other.
3. **Planner.** Under F-2: is a release that waits on Discord's release schedule a design choice inside the agreed scope
   (the standing default), or a cost D-12's option should have shown him?

## Scope assumptions the plan lists for this pass

- **Unit** (one adapter, surfaces told apart only by mask): holds only if AN-3 finds each surface's Discord behaviour is
  a mask of the native parser. F-7 covers the other result.
- **Reach** (the read-only branches and `/preview` move with the editors): holds. The static paths M4 lists are the ones
  in the code at `af3d95a`. A search of `src`, `bot` and `lang` for the engine's import specifiers and `useMarkdown`
  found 45 files, tests included, and none under `bot` or `lang`. Every non-test file is in P-4, in M4's list or mounts
  the provider, with one exception: `DiscordMessageEditor/index.tsx` (F-3).
- **Layer** (the Slate block layer stays the site's own): holds, and two criteria have to say so (F-8, F-9).
- **Emoji lift** (X-8): a sound exclusion with a reason and a carrier. Its residue is F-23.

## Review-method lines with no finding

- **Port scope.** The 25 keys of `rules.tsx:staticBaseRules` each have a kind in the engine. What the plan adds beyond
  them (command, game and static mentions, subtext, contact links) is inside "the way Discord does" (D-3).
- **Carried figures.** `git diff --numstat 61e5dfe af3d95a -- src` lists three test files and no production file, so
  QA's 346 of 15,480 stands at the base.
- **S-30.** `git grep -n -w saveMessage 0411d3b -- src`, a wider predicate than the plan's, gives the same four call
  sites, each a user act. `commitSaveChoice` is called from the choice dialog only.
- **Open handoffs.** All 34 open handoffs' `Review-Trigger` fields were listed. Each one that this chain fires is
  dispositioned in the plan (X-2, X-3, X-4, X-12, R-A, AC-6.3, AC-6.4).
- **Release target.** It equals the scoping block's end step. The dry-run capture is in the record. The website has no
  `.github/workflows` directory.
- **Decisions Register.** D-10 to D-12 match block 15:49Z, and D-5 and D-6 match their blocks. No row is re-raised.
- **Siblings.** Each milestone names what it mirrors. The exact pins it cites (`3.11.3`, `3.22.4`), the two test files
  M6 extends and `codeFence.ts` are in the tree at `af3d95a`.
- **Constraints.** No code in the plan. No write matrix is owed. The repository sets no Content-Security-Policy header
  (`git grep -l -i` over the tree at `af3d95a`, no file; `grep -c` over `next.config.js`, 0), so nothing in the tree
  bars compiling wasm.

## Process record

- The website was read from a `git archive af3d95a` export in this session's scratchpad and by `git grep`, `git diff
  --numstat` and `git ls-tree` against the object store. The shared tree was not touched. The export and the two
  unpacked npm packages are deleted at run end; all three can be made again from the SHA and the pinned versions.
- One lookup of the export was not completed, then re-run with literal paths (effort rulings block 15:29Z).
- The architect's conformance document and QA's Phase 1 document on revision 1 were committed while this pass ran. They
  were not read before this document was written.
