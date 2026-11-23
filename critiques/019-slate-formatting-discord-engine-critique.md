---
ID: 019
Origin: 019
UUID: 286c730a
Status: Open
Status-Detail: "Cycle 1 pass 3 on plan revision 3: REQUEST REVISION. F-6 and F-24 to F-26 are RESOLVED (26 of 26 earlier findings). Open: F-27 and F-28 (MEDIUM, the outcome table), F-30 (LOW), and F-29, a class closed by property with stated limit SL-8 (the stop authority fired; it is not a ground). SL-9 is a further limit under F-26's property. Waits on revision 4."
Artifact-Revision: 3 — read as the delta 4c872804..9ac9ba62 with M5 and M6 read whole (cycle 1 pass 3)
Reviewed-At: "9ac9ba62 — repos=agent-output; website read at af3d95a"
Verdict: REQUEST REVISION
---

# Critique — Plan 019, Slate formatting on Discord's engine

**Artifact**: `planning/019-slate-formatting-discord-engine.md`, revision 3 (`9ac9ba62`). Revision 1 (`103687b4`) and revision 2
(`8dfd4659`) were read whole at passes 1 and 2.
**Analysis**: `analysis/019-slate-formatting-discord-engine-analysis.md` (`aafecf1`), read at pass 3 for AN-3 to AN-7, its
hypotheses, determinations and gaps.
**Read at cycle 1 pass 3**: the plan's diff `4c872804..9ac9ba62`; the plan's Reading Order, D-1 to D-9, M5, M6 and Planner batch
at `9ac9ba62`; effort rulings blocks 17:04Z and 17:17Z; the analysis as above; `verification/019/architect-conformance/time.out`;
`verification/019/planning/simple-markdown-importers-af3d95a.txt`; website `package.json`, `pnpm-workspace.yaml` and
`src/@types/slate.d.ts` at `af3d95a`; the headings of the architect's findings and the cited rows of QA's document.
**Read at earlier passes**: listed in this critique at `e3e49ac7` (pass 2) and `0435794c` (pass 1).
**Roadmap**: `roadmap/` holds no roadmap document, so alignment is judged against the rulings and the architecture record.
**Date**: 2026-11-23.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-23T16:11 | steering-hooks-fixer (brief `steering/019-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | Depth: whole-document, the cycle's first pass, at `103687b4`. New findings: F-1 to F-23 (3 HIGH, 15 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. |
| 2026-11-23T16:34 | planner-019 (message naming revision 2 at `8dfd4659`) | cycle 1 pass 2: plan revision 2, whole-document read | Depth: whole-document (617 added, 344 removed over 528 lines). Registration R-2 read as a delta. Findings addressed: F-1 to F-5 and F-7 to F-23 RESOLVED (22); F-6 stayed OPEN for the editor. New findings: F-24 (MEDIUM), and F-25 and F-26, each a second member of a folded shape, closed by property with stated limits SL-1 to SL-7. The stop authority fired on both. Verdict REQUEST REVISION. |
| 2026-11-23T17:19 | planner-019 (message naming revision 3 at `9ac9ba62`); steering-hooks-fixer (resume pointer after a clear) | cycle 1 pass 3: plan revision 3 | Resumed after a clear from this document's Resumption State at `c579526e`; nothing of pass 2 was re-verified beyond what this row names. Depth: delta-bounded. The delta `4c872804..9ac9ba62` is 430 added and 208 removed lines over 1,025 (`git diff --numstat`, three commits, two of them a Status write and a Resumption State), fully readable as a diff. M5 and M6, which the delta reshapes (the run unit; the lift and the removal), were read whole. Boundary check by this pass's own instrument, a regex over both revisions for the AC, AN, D, X, RK, OQ, P, C and rider IDs: none removed as a token; added AC-3.7, AC-3.8, AC-4.7, AC-4.8, AC-5.8, AC-6.6, AN-8, C6, D-14, D-15, P-7, P-8, RK-9, X-22 to X-24; X-8, X-15 and X-16 have no Exclusions row left and are named only where withdrawn. No milestone added or removed. Artifact changes: the folds of pass 2, CF-8 and the architect's A′/B3 design, QA's re-key, the analysis, D-13 to D-15. Findings addressed: F-6, F-24, F-25 and F-26 RESOLVED. New findings: F-27 and F-28 (MEDIUM), F-30 (LOW); F-29, a second member of QAF-2's shape, closed by property with stated limit SL-8; SL-9 under F-26's property. The stop authority fired on F-29. Verdict REQUEST REVISION. |

## Verdict

**REQUEST REVISION — cycle 1, pass 3.** The stop authority fired on one shape (F-29). The hard stop did not fire (pass 3 of
15).

Pricing: sized to the ask plus his three rulings. There are still seven milestones. The plan grew from 801 to 1,025 lines, and
the growth follows D-13 (the lift on the engine, `simple-markdown` removed), D-14 (the visible form, the adjustment module, the
staleness check he was told the option carries) and D-15 (the run unit). AN-8 adds four reads; one holds an approval. No
machinery here is outside a ruling's option text.

All four findings open after pass 2 are resolved, and both questions are answered. The grounds for this REQUEST REVISION are
two cells of M3's outcome table, both created by this revision:

- **F-27.** AC-3.2's live limb now runs Discord's native box with the *served* wasm. The table still says a served wasm that
  differs from the pinned one is "not a failure" (C2). When that difference changes the box's output, C4 and then C5 hold this
  chain's gate, and nothing in the table says which wasm the frozen literal is taken under.
- **F-28.** For a later release that does not touch the region, the table says the release "is never held by Discord's
  movement", and its C1 cell holds that release until Discord is reachable. No stage is named as the runner there.

**The planner's two choices, put for challenge.**
- *The command runs at a later release but C3 to C6 do not hold it.* Accepted. D-12 names the run, not a hold, and the run
  restores what F-24 asked for: a move at Discord is seen at the next website release. The cost bearer is named (a handoff,
  Owning-Stage planner). The one cell challenged is C1 (F-28).
- *AC-3.2's expected value is the native box over every typed input.* Accepted. D-15's option text says "the expected values
  come from the native box (818948)", and steering recorded the reading in effort rulings block 17:17Z, from D-6's option text.
  It also closes F-6. Two register rows were not re-aimed with it (F-30), and the choice is what makes F-27 arise.

**Stop authority.** F-29 is a second member of the shape QA's QAF-2 raised and revision 2 folded: the membership of a
criterion's class decided by the code the criterion judges. It is not a ground for this verdict. The class is stated once below
as a property, checked over its domain in this pass, and its one gap is stated limit SL-8, with its bearer. Revision 4 can
carry the property; where it does not, the limit stands as written. Nothing from it routes to the owner.

**RK-8, the class from pass 1: no new member found by this pass.** The planner's own pass found one (AC-5.2) and wrote it back.
Each statement of today's site that revision 3 added was read at `af3d95a` and holds: P-7 (`src/@types/slate.d.ts`: element
types `div`, `codeBlock`, `blockQuote`; inline types `emoji`, `nameEmoji`, `discordEmoji`), P-8 (16 importers by `git grep -l`,
one under `__tests__`; `package.json` `^0.7.3`; the patch file, the `patchedDependencies` entry and the type file exist), and
`jsdom` `^30.0.1` in `package.json`. Not read: X-22's "as it does today on a hung JavaScript chunk".

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged and equals the scoping block's end step.

Routed to the owner: nothing from this pass. F-28's C1 cell goes to him only if the planner keeps the hold.

## Value Statement Assessment

Present, in user-story form, and delivered directly. Revision 3 adds what "the way Discord does" means per view: the native
formatter for the content preview off the agree class (D-5, D-6), Discord's legacy rendering by visible style for embeds and the
V2 text display (D-14), and Discord's native box for the editor (D-15). The sentence itself is unchanged. RK-9 carries what
D-14's option told him was unmeasured.

## Assumption Not Checked

Cycle 1 pass 3: this pass assumes that if Discord moves an embed surface to its native formatter, the move shows as a reference
to the native switch (module 146849's two strings) inside the embed renderer or V2 text-display module that AC-3.8 (i) reads,
and does not test it. No Discord bundle was read in this pass. If it is false, Discord draws embeds natively while AC-3.8 (i)
stays green and the adjustment module corrects toward a rendering nobody sees; limb (iii) reads legacy code and would not show
it either. The implementer at M3 owns closing it: AC-3.8 has it run the predicate on the content path's member, and where that
member is not the renderer module itself, the limb's reach is a stated limit for the planner.

Pass 2's line is settled: AN-6 and AN-7 ran the legacy code, and `tel` and `sms` are now in AC-4.6's list. Pass 1's line (the
research's class sizes) is settled by AN-3: 235 of 272 re-derived on the analyst's harness.

## Unresolved Open Questions

None. Seven `OPEN QUESTION` lines, each marked `[RESOLVED]` with its ruling or finding named.

## Findings

### Open

F-27 MEDIUM cycle 1 pass 3 — OPEN — The outcome table has no cell for a served wasm that changes the native box's output
- **Location**: M3 "Form" (`pnpm test:discord` runs "its native box (module 818948, with the served wasm)"); outcome table rows
  C2, C4 and C5; AC-3.2; AC-5.6's last line; analysis AN-4 ("`fetch` serves the served wasm's bytes").
- **Description**: at revision 2 the live oracle was Discord's legacy JavaScript, which does not depend on the wasm, so C2
  could say drift is "not a failure: the site ships Discord's published 0.16.0, unchanged". Revision 3's AC-3.2 takes its
  expected value from the native box run on the served wasm, while the site runs the pinned wasm. The served build has moved
  six times in 34 days (M3's own figure). On the first move that changes a token over AC-3.2's inputs, C4 fires and "the
  literal is re-derived from the live oracle"; `pnpm test` then compares the pinned engine with a literal taken under a newer
  one, and C5 calls the difference a site defect, fixed under D-7. The only fix is a pin change, which C2's own column calls a
  deliberate upgrade. So this chain's Phase 2 or Phase 3 gate can wait on Discord's release schedule, which the revision 2
  disposition of pass 1's question 3 said no outcome does.
- **Impact**: a held release with no stated way out, at a rate bounded above by Discord's wasm releases (about one a week).
- **Recommendation**: state the outcome for C2 and C4 arriving together on the native-box family: which wasm the frozen
  literal and the live value are taken under, and whether a difference traced to the wasm alone holds a gate. It is a table
  cell and a sentence in AC-3.2; the mechanism is the planner's.

F-28 MEDIUM cycle 1 pass 3 — OPEN — The later-release column holds an unrelated release on Discord's reachability, and names no runner
- **Location**: M3 outcome table, column "A later release not touching the region", row C1 ("Same"); the paragraph under the
  table; "Who runs it"; M7's Test Conventions bullet; RK-6.
- **Description**: the paragraph says such a release "runs the command (D-12) and is never held by Discord's movement". Its C1
  cell is "Same": the gate holds until a green run. RK-6 names "Discord changes its page or blocks headless clients" as a
  cause C1 covers, so a block at Discord holds every later website release, a fix-lane release included, for as long as it
  lasts. Revision 2's cell was "The command is not run". Separately, "every later website release gate" names no stage: this
  chain's runs are QA's Phase 2 and Phase 3, a fixer chain has no Phase 3, and the column's other cells say only that devops
  writes the handoff.
- **Impact**: M7 lands this column in the workspace Test Conventions as a standing rule for every chain. D-12's words are
  "fails loudly offline" and "run at every release gate"; they do not say an unrelated release waits.
- **Recommendation**: make C1's later-release cell follow the column's own rule, or put the hold to him with its cost; and name
  the stage that runs the command at a later release in the text M7 proposes.

F-29 MEDIUM cycle 1 pass 3 — OPEN — A criterion's class decided by the code it judges (second member of QAF-2's shape); closed by property, limit SL-8
- **The second member**: AC-3.7 passes an input when the preview equals legacy "or the input is a member of a listed residue
  class in the known-differences report". That report is "generated, never hand-written" from "the legacy-only surfaces'
  residue left after adjustment", which is the set of inputs on which the site's own output differs. Read so, every differing
  input lists itself and AC-3.7 cannot fail; AC-3.4's mutation of the adjustment module would also list, not go red.
- **Property**: for every criterion that holds over a class or excepts one, each input's membership is decided by values the
  code under test did not compute, and a member that appears after the class is fixed fails.
- **Domain**: every criterion in M2 to M6 with a class, an exception or a residue, read in this pass:

  | Criterion | Membership decided by | Holds |
  |---|---|---|
  | AC-3.1, AC-3.6 (content agree and disagree) | Discord's legacy parse and the native parse under AN-3's literal masks | yes |
  | AC-3.2 (every typed input; residue X-19) | the input's own form (an inline object, an unclosed fence) | yes |
  | AC-3.3 (refused pastes) | the listed refusals of P-5 | yes |
  | AC-3.4 (base-green limbs) | a run at the base | yes |
  | AC-3.7 (listed residue) | the site's output differing from legacy | **no: SL-8** |
  | AC-3.8 (ii) (an adjustment's reached members) | the adjustment's own predicate over the engine's tree; condition (c)'s second clause is over every input | yes, except an adjustment that reaches no member, which passes empty |
  | AC-4.6 (schemes) | a literal list, with the observed enumerator | yes |
  | AC-5.8 (editor equals preview) | every input; the expected value is the site's preview, which AC-3.7 holds | yes, as far as AC-3.7 does |

- **SL-8** (AC-3.7's residue). The plan constrains the listed classes only by their reasons (B3's a, b or c), which the
  implementation document records and code review reads once. It does not say the listed set is fixed after that, nor what an
  input does that was equal and comes to differ. AN-3 bounds the candidates at 32 to 54 of 272 per surface. Bearer: the
  implementer at M3, where AC-3.4 requires AC-3.7 to be shown red under a mutation of the adjustment module; a run that lists
  the mutant's differences instead of failing is the member, and goes to the planner. After M4, QA at Phase 2 reads the
  residue count against the one recorded at M3 and M4 (RK-9's falsifier). A later chain has no bearer until the planner
  states one.

F-30 LOW cycle 1 pass 3 — OPEN — D-4's and D-5's rows still aim at the criteria revision 3 moved
- **Location**: Decisions Register, D-5 "Consequence: the agree class of AC-3.1 and AC-3.2"; D-4 "AC-3.1, AC-3.2 and AC-3.6
  derive from this row".
- **Description**: AC-3.2 no longer has an agree class (D-15), five surfaces left D-5's treatment (D-14), and AC-3.7 and
  AC-3.8 now run Discord's fetched code under D-4. A withdrawal of D-4 or D-5 would retire the wrong members (planner.md,
  "names every register row … it moves and re-aims each").
- **Recommendation**: re-aim the two cells, or record in one line that the pass declined to.

### Stated limit added under a closed property

- **SL-9** (F-26's property: a stage given a job it can reach). AC-3.7 gives code review a read ("code review reads it": the
  reason per listed residue class), and M4 holds the adjustment module. The Reading Order's code-reviewer row names M2, M5, M6
  and Exclusions, not M3 or M4. Bearer: the code reviewer, who reaches AC-3.7 only by this line or by M5's citation of AC-5.8.

### Resolved

F-1 HIGH cycle 1 pass 1 — RESOLVED — each AN item carries its "Not completed" outcome and the approval it holds. Plan revision 2, M1.

F-2 HIGH cycle 1 pass 1 — RESOLVED — outcome table by cause and gate, the release-interval figure, D-5's instrument corrected, the Test Conventions carrier. Plan revision 2, M3, D-5, M7. Two cells revision 3 created are F-27 and F-28.

F-3 HIGH cycle 1 pass 1 — RESOLVED — pending stays hidden as today; rejected is a marked deviation. Plan revision 2, M2, AC-2.5, P-4.

F-4 MEDIUM cycle 1 pass 1 — RESOLVED — the gap is recorded on every capture; the missing production read is a stated limit. Plan revision 2, AN-2, RK-2, X-21.

F-5 MEDIUM cycle 1 pass 1 — RESOLVED — declared and observed enumerators, an outcome for an unmapped kind, the `0` rule. Plan revision 2, AC-2.4, M2, RK-3, AC-2.3.

F-6 MEDIUM cycle 1 pass 1 — RESOLVED — the class table has the editor's rows: content against the native box on every typed input (AC-3.2), the legacy-only surfaces against the site's preview (AC-5.8), legacy-box differences listed. Plan revision 3, M3 "Classes".

F-7 MEDIUM cycle 1 pass 1 — RESOLVED — a legacy-only surface went to him before M2's approval; ruled at D-14. Plan revision 2, AN-3; revision 3, D-14.

F-8 MEDIUM cycle 1 pass 1 — RESOLVED — the rule names the inline runs; block context stays the Slate layer's. Plan revision 2, AC-5.6.

F-9 MEDIUM cycle 1 pass 1 — RESOLVED — two modes, the paste limb bounded, the refusals kept. Plan revision 2, AC-3.3, P-5.

F-10 MEDIUM cycle 1 pass 1 — RESOLVED — the mutated code is named per criterion. Plan revision 2, AC-3.4.

F-11 MEDIUM cycle 1 pass 1 — RESOLVED — AN-1 takes plan 018's build form. Plan revision 2, AN-1.

F-12 MEDIUM cycle 1 pass 1 — RESOLVED — the base is `master` at the cut, with a re-derivation step. Plan revision 2, Header notes.

F-13 MEDIUM cycle 1 pass 1 — RESOLVED — AN-4 needs no driver; M3 takes AC-2.2's pin rule; the rollback names its runner. Plan revision 2, AN-4, M3.

F-14 MEDIUM cycle 1 pass 1 — RESOLVED — the loose form is named, with the strict count and its blur in X-19. Plan revision 2, M3.

F-15 MEDIUM cycle 1 pass 1 — RESOLVED — QA's production read is cited and the reader is the carrier. Plan revision 2, Testing Strategy.

F-16 MEDIUM cycle 1 pass 1 — RESOLVED — AC-2.7. Plan revision 2, M2.

F-17 MEDIUM cycle 1 pass 1 — RESOLVED — Reading Order with the owed re-verdicts table. Plan revision 2. Its code-reviewer row is SL-9.

F-18 MEDIUM cycle 1 pass 1 — RESOLVED — AC-6.3 has a provision step and AC-6.4 names what a place would take. Plan revision 2, M6.

F-19 LOW cycle 1 pass 1 — RESOLVED — the criteria name their decision rows. Plan revision 2. Two rows' aim after revision 3 is F-30.

F-20 LOW cycle 1 pass 1 — RESOLVED — Exclusions rows with carriers. Plan revision 2, Exclusions.

F-21 LOW cycle 1 pass 1 — RESOLVED — AC-2.1, AC-2.2, AC-2.6. Plan revision 2, M2.

F-22 LOW cycle 1 pass 1 — RESOLVED — gates stated in M5 and M6; devops mints the handoff. Plan revision 2.

F-23 LOW cycle 1 pass 1 — RESOLVED — replaced by D-13: AC-6.5 on the engine, AC-6.6. Plan revision 3, M6. Duplicates: CF-2 in architecture/019-slate-formatting-discord-engine-architecture-findings.md

F-24 MEDIUM cycle 1 pass 2 — RESOLVED — the command runs at every later website release gate, as D-12 reads. Plan revision 3, M3 "Who runs it", M7. The column it added is F-28.

F-25 MEDIUM cycle 1 pass 2 — RESOLVED — SL-1: `tel` and `sms` listed, checked by the observed enumerator (AC-4.6). SL-2: AC-4.7, AN-8's first limb, X-24. Plan revision 3, M4, M1.

F-26 MEDIUM cycle 1 pass 2 — RESOLVED — SL-3: M3 "Form" names what is and is not re-derived, with the mask read's bearer. SL-4: AC-3.4 takes base-green limbs from a run. SL-5 holds (AN-5 chose `parseLossless`). SL-6 discharged (AN-3's counts are the analyst's). SL-7: AN-8's third limb. Plan revision 3. A further limit under its property is SL-9.

## Questions

Pass 2's two questions are answered in revision 3: the lift reads the decorator's run unit (AC-6.5), and AC-6.6 at M6 removes
`simple-markdown`, with M4 moving the kept renderers off its types and the rollbacks paired.

None new. F-27 and F-28 carry what revision 4 needs to state.

## Scope assumptions the plan lists

- **Unit**: one adapter with seven masks. AN-3 found five surfaces legacy-only; D-14 keeps the one engine there.
- **Reach**: holds, unchanged.
- **Layer**: holds. The run unit spans `div` and `blockQuote` elements and never a `codeBlock` element (M5).
- **Emoji lift**: from the engine (D-13).

## Review-method lines with no finding

Pass 3:
- **Decisions Register.** D-14's and D-15's option texts match effort rulings block 17:04Z word for word. D-11's title is cut
  to its marker clause, with D-15 named as replacing the other. D-13's consequence cell is updated. No row is re-raised.
- **Restated figures**, each read at its source: AN-3's masks and disagree counts (analysis AN-3 table); AN-6's 39 of 65, 63 of
  65, 85 cases and 26 differences; AN-4's Node and jsdom run; `time.out` row `4096 lines`, lossless median 9.895 ms; QA's 13.9 ms
  per input and its eight corpus rows; P-8's 16 and 15.
- **Riders.** None added. R-A is unchanged.
- **Exclusions.** X-22 to X-24 each carry a reason and a carrier. X-8, X-15 and X-16 are withdrawn with the ruling or read
  that withdrew them named.
- **Instruments.** AC-3.8 (i)'s predicate names the milestone that exercises it on a real member and a real non-member (M3).
  AC-5.7's timing read is recorded and is not a pass condition; its reader is the implementer at M5. AN-8's first limb has its
  "not completed" outcome (X-24).
- **Rollbacks.** M4's, M5's and M6's pairing after AC-6.6 is stated, with runners.
- **Release target.** Unchanged.
- **Reading Order.** Present; rows name current headings (SL-9 on one row's reach).

Passes 1 and 2, still standing: listed in this critique at `e3e49ac7`.

## Process record

- Pass 3: the plan was read as `git diff 4c872804 9ac9ba62` saved in this session's scratchpad, and M5 and M6 by the Read tool.
  Website files were read with `git show af3d95a:<path>` and `git grep`. Nothing was installed or run.
- Pass 3: one comparison command was not completed, then re-run in a form that writes no file.
- Pass 3: the architect's and QA's passes on revision 3 were not read before this pass was written. The architect's headings
  were seen while locating its A′/B3 section; CF-9 and CF-10 there concern the lift on edit and the element's fields, and no
  finding of this pass repeats them.
- Passes 1 and 2: in this document at `e3e49ac7`.

## Resumption State

Written after pass 3.

- **Done**: cycle 1 passes 1 to 3. Verdict REQUEST REVISION on revision 3 (`9ac9ba62`). `planner-019` is sent this document at
  its pass-3 commit.
- **Next**: cycle 1 pass 4, on revision 4, when the planner's message names it. Read it as the `git diff` from `9ac9ba62`,
  boundary checked by an ID-set comparison computed in memory (no file written from the shell).
- **What pass 4 checks**: F-27 (the C2-with-C4 cell and which wasm AC-3.2's literals are taken under); F-28 (C1's later-release
  cell and the runner); F-30; whether F-29's property was adopted or SL-8 carries a bearer for later chains; SL-9; RK-8's
  pass-3 record written back ("no new member found by the critic's pass").
- **Standing rules of the brief** (`steering/019-brief-critic.md`, `steering/slate-formatting-brief-common.md`): shell in the
  record folder; website read by `git show <sha>:<path>`; record documents by Write or Edit only; stamps from `date -u`.
- **Tree**: record `master`. Nothing of this session is uncommitted after the pass-3 commit; no process of this session is
  running. No question is awaiting an answer. A cache-warm wake is armed.

## Appendix — engine probes (cycle 1 pass 2)

`@discord/markdown-wasm@0.16.0` with `@discord/markdown-types@0.14.0`, `npm install --ignore-scripts`, Node 24.14.0, `parse`
with its default flags (`Syntax.ALL`), 2026-11-23.

**Link schemes.** Each input, then the `url` of every link node returned:

| Input | Link `url` |
|---|---|
| `<+15551234567>` | `tel:+15551234567` |
| `<a@b.co>` | `mailto:a@b.co` |
| `a@b.co` | no link |
| `<mailto:a@b.co>` | `mailto:a@b.co` |
| `<tel:+15551234567>` | `tel:+15551234567` |
| `<ftp://x.y>`, `[a](ftp://x.y)` | no link |
| `[a](tel:+15551234567)` | `tel:+15551234567` |
| `[a](mailto:a@b.co)` | `mailto:a@b.co` |
| `[a](sms:+15551234567)` | `sms:+15551234567` |
| `[a](discord://-/channels/1/2)` | `discord://-/channels/1/2` |
| `discord://-/channels/1/2` | no link |
| `[a](steam://run/1)`, `[a](spotify:track:1)`, `[a](//x.y)`, `[a](file:///etc/passwd)` | no link |
| `[a](javascript:alert(1))`, `[a](data:text/html,x)`, `[a](vbscript:x)` | no link |
| `[a](HTTP://X.Y)` | `http://x.y/` |
| `dev://branch/main`, `[a](dev://branch/main)` | `dev://branch/main` |
| `[a](blob:https://x.y/1)` | `https://x.y/1` |

**`Syntax`.** `Object.keys(Syntax)`: 38 keys; 31 hold a single bit; the other seven are `EMOJI`, `LINKS`, `MENTIONS`,
`CODE_SPANS`, `ITALIC`, `QUOTES` and `ALL`.

**Timestamp styles.** `<t:1700000000:X>` for every ASCII letter X: a timestamp node comes back for `d f s t D F R S T`,
nine letters, and for `<t:1700000000>` with no style.

**Heading levels.** `# a`, `## a` and `### a` return headings of level 1, 2 and 3. `#### a` and `##### a` return a paragraph.
