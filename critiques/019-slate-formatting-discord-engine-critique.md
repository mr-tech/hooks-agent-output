---
ID: 019
Origin: 019
UUID: 286c730a
Status: Open
Status-Detail: "Cycle 1 pass 2 on plan revision 2 with registration R-2: REQUEST REVISION. 22 of the 23 pass-1 findings are RESOLVED. Open: F-6 (the editor's half), F-24 (new), and F-25 and F-26, two classes closed by property with stated limits SL-1 to SL-7 (the stop authority fired on both). Revision 3 is owed for D-13 in any case. Waits on it."
Artifact-Revision: 2 — read whole at 8dfd4659 (cycle 1 pass 2); registration R-2 at 4c872804 read as a delta
Reviewed-At: "4c872804 — repos=agent-output; website read at af3d95a and 0411d3b; @discord/markdown-wasm 0.16.0 run in scratch"
Verdict: REQUEST REVISION
---

# Critique — Plan 019, Slate formatting on Discord's engine

**Artifact**: `planning/019-slate-formatting-discord-engine.md`, revision 2 (`8dfd4659`), read whole, with registration R-2
(`4c872804`) read as a delta. Revision 1 (`103687b4`) was read whole at pass 1.
**Analysis**: M1's document is not committed yet, so none was read.
**Read at cycle 1 pass 2**: effort rulings block 16:29Z; website `vitest.config.ts` and `MarkdownTimestamp.tsx` at `af3d95a`;
research Appendix B's header and row 42; QA's document at its rows P-Q13, E-4, EC-4 and B-5;
`verification/019/architect-conformance/split.out`; `verification/019/qa/link-inputs.json`; `@discord/markdown-wasm@0.16.0`
installed in scratch and run (Appendix).
**Read at cycle 1 pass 1**: the briefs; effort rulings, whole; the architect's pre-planning findings; the inventory; the research
document's Question to Recommendations sections; `architecture/website.md` and the named parts of `system-architecture.md`;
plan 018's OQ-5 and RK-7; website code at `af3d95a`; `preview-image-generator@8512a1d src/generateImage.ts`; the two Discord
packages from `npm pack`. The list is in this critique at `0435794c`.
**Roadmap**: `roadmap/` holds no roadmap document, so alignment is judged against the rulings and the architecture record.
**Date**: 2026-11-23.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-23T16:11 | steering-hooks-fixer (brief `steering/019-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | Depth: whole-document, the cycle's first pass, at `103687b4`. Artifact changes: none before this pass. New findings: F-1 to F-23 (3 HIGH, 15 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. One lookup of this pass's website export was not completed, then re-run with literal paths (effort rulings block 15:29Z). At the seam, after `4cdbdcee`, the architect's conformance findings and QA's Phase 1 findings on revision 1 were read: F-23 is marked as repeating CF-2, and partial overlaps are named in place. |
| 2026-11-23T16:34 | planner-019 (message naming revision 2 at `8dfd4659`) | cycle 1 pass 2: plan revision 2, whole-document read | Depth: whole-document. The delta `103687b4..8dfd4659` is 617 added and 344 removed lines over a 528-line file (`git diff --numstat`, one commit), so the revision was read whole at 801 lines, not as a diff. Boundary check by this pass's own instrument, a regex over both revisions for the AC, AN, D, X, RK, OQ, P and rider IDs: none removed; added AC-2.7, AC-3.6, AC-4.6, AC-5.7, AC-6.5, OQ-5, P-5, P-6, RK-8 and X-13 to X-21; no milestone added or removed. Registration R-2 (`8dfd4659..4c872804`, 3 added, 1 removed) adds D-13 and one Status-Detail sentence and changes no criterion; it is registered by this line. Artifact changes: the folds of F-1 to F-23, CF-1 to CF-7 and QAF-1 to QAF-14. Findings addressed: F-1 to F-5 and F-7 to F-23 RESOLVED (22); F-6 stays OPEN for the editor. New findings: F-24 (MEDIUM), and F-25 and F-26, each a second member of a folded shape, closed by property with stated limits SL-1 to SL-7. The stop authority fired on both. Verdict REQUEST REVISION. |

## Verdict

**REQUEST REVISION — cycle 1, pass 2.** The stop authority fired on two shapes.

Pricing: still sized to the ask. There are seven milestones, none added or removed. The plan grew from 528 to 801 lines. The
growth is in M3's instruments (the outcome table, the three-class table, the coverage report, the live re-derivation of frozen
literals) and in two guards other gates asked for (AC-4.6 from QA, AC-5.7 from the architect). Rider R-A now has its criterion
line (AC-2.7) and is priced as a rider.

22 of the 23 findings of pass 1 are resolved, the three that stopped approval among them. Why revision 2 is still not
approved:

- **Revision 3 is owed in any case.** He answered OQ-5 at 16:29Z: the engine decides the editor's emoji (D-13, registered
  as R-2). Revision 2's AC-6.5, X-8, M2's provider sentence and the Header notes still describe the option he did not
  choose, and the plan's Status-Detail says the fold is revision 3.
- **F-24** (new). M3 runs the Discord command at later release gates only for chains that touch the region. D-12 says
  "every release gate".
- **F-6** is landed for the preview and open for the editor.

**Stop authority.** Two findings of this pass are second members of shapes that revision 2 folded: F-5's (F-25) and F-10's
(F-26). They are not grounds for this REQUEST REVISION. Each class is stated once below as a property, checked over its
domain in this pass, and its gaps are recorded as stated limits SL-1 to SL-7, each naming who bears it. The planner's own
rule remedies a second member by the property over its class (planner.md, Revisions), and revision 3 can carry both
properties. Where it does not, the limits stand as written. Nothing from either class routes to the owner.

**RK-8, the class from pass 1: no new member in pass 2.** Each statement of today's behaviour that revision 2 added was
read at the code or the record and holds: P-5 (the two paste refusals and the partial mode), P-6 (two vitest projects
through `vitest.config.ts:project`; `test` is `vitest run`), M2's three loading states, AC-3.3's two modes, AC-5.6's block
context, AC-6.1b's five `message.upsert` writers, AN-1's Preview form from plan 018, and AC-4.6's claim that both Discord
parsers link `discord://` (research Appendix B row 42).

No milestone is marked `PREMISE-STALE`. `Target-Release` equals the scoping block's end step. The hard stop did not fire
(pass 2 of 15).

Routed to the owner: nothing from this pass. F-24 goes to him only if the planner keeps the narrowing.

## Value Statement Assessment

Present, in user-story form, and delivered directly. Revision 2 adds the sentence that settles its meaning off the agree
class: "the way Discord does" is the native formatter's way there (D-5, D-6), and M3's three-class table says what is
asserted on each class. That closes the preview's half of F-6. The editor's half is still open. On the five surfaces other
than message content, AN-3 now sends a legacy-only result to him before M2's approval (F-7).

## Assumption Not Checked

Cycle 1 pass 2: this pass assumes that Discord's legacy parser links a `tel:` or `sms:` target in at least one form the
native parser does, and does not test it. The legacy code was not run. If it is false, SL-1 has no member in the agree
class, AC-3.1 never meets AC-4.6 there, and the limit costs nothing. The analyst's AN-4 oracle settles it by running the
four probe inputs of the Appendix that return those schemes.

Cycle 1 pass 1's line (the research's class sizes, 235 of 272 and 33 stored) still stands unchecked. It is the analyst's
at AN-4 and the implementer's at M3.

## Unresolved Open Questions

One: **OQ-5** (the editor's emoji lift). The plan's body shows it open with option a written as the floor. He has answered
it (effort rulings block 16:29Z; D-13 in the register, R-2): option b. The body folds it at revision 3, so no selection is
put from this pass. OQ-4 is `[RESOLVED]` by the architect's CF-7.

## Findings

### Open

F-6 MEDIUM cycle 1 pass 1 — OPEN — Nothing states what the editor draws on inputs outside its agree set
- **Location**: M3, "Three classes"; AC-3.2; AC-5.1.
- **Landed** (revision 2): the three-class table, AC-3.6 for the preview on the disagree and native-only classes, and X-18.
- **Still open**: the table's second and third rows speak of the preview's DOM only. The editor has its own agree set:
  AC-3.2 compares AN-6's legacy box run with AN-6's frozen native mapping. On a typed case outside that set nothing is
  asserted and nothing is listed. The research found 25 of 68 comparable cases outside it under its own mapping (V-22), and
  the architect's AF-8 called for "a second known-differences list".
- **Recommendation**: give the editor its rows in the table: what is asserted off its agree set, against what, and where
  those cases are listed. AN-6's frozen native mapping already exists as an expected value that is separate from the
  adapter. Or record it as a limit naming who bears detection.

F-24 MEDIUM cycle 1 pass 2 — OPEN — M3 narrows D-12's "every release gate" to chains that touch the region
- **Location**: M3 "Form", "Who runs it"; the outcome table's last column ("A later chain not touching it: The command is
  not run"); M7's Test Conventions bullet; D-12.
- **Description**: D-12's operative clause is "runs at every release gate and every pin change", and its option text says
  the same. Revision 2 runs the command at "every later release gate whose chain touches the region". The difference is
  not only cost. With the narrower rule, a move at Discord (causes C2, C3 and C4 of the table) is seen only when some chain
  next touches the editor region or the pin, which may be months. Under D-12's words it is seen at the next website
  release of any kind.
- **Impact**: the standing text M7 puts into the workspace Test Conventions would state a rule he did not choose.
- **Recommendation**: carry D-12's clause as he chose it, or put the narrowing to him with what it gives up. This changes
  no code or test of this chain. It changes the text the implementer proposes at M3.

F-25 MEDIUM cycle 1 pass 2 — OPEN — Engine-output classes listed from a source that omits members (second member of F-5's shape); closed by property, limits SL-1 and SL-2
- **The second member**: AC-4.6's allow-list is `http`, `https`, `mailto`, `discord`, "plus any scheme AN-3 shows". The
  engine at the pin also returns `tel` and `sms` links (Appendix), and AN-3's table, surface by `Syntax` bit, does not
  enumerate schemes.
- **Property**: for every class of values the engine returns that the plan lists or that a kept renderer switches on, the
  listed set contains every value the engine returns over M3's input classes, and a value outside the set has a stated
  outcome.
- **Domain**, enumerated from `@discord/markdown-types@0.14.0 index.d.ts` (its closed sets and the two open fields the site
  switches on), with what this pass found for each:

  | Class | Listed in the plan | Observed at the pin | Holds |
  |---|---|---|---|
  | Node kinds, token kinds, and their sub-kinds (modifier, link, mention, emoji) | AC-2.4, declared and observed enumerators; unmapped-kind outcome in M2 | P-1 | yes |
  | `Syntax` single bits | AC-2.3: 31 | 38 keys, 31 single-bit, 7 groups (run) | yes |
  | Heading level | `#`, `##`, `###` (AC-5.6) | 1, 2, 3; `####` is a paragraph (run) | yes |
  | Code block language | an open string; the editor guards it with `hljs.getLanguage` (`decorator.tsx`) | any string | yes for the editor; the preview's renderer was not read in this pass |
  | Link scheme | AC-4.6: four | `http`, `https`, `mailto`, `discord`, `tel`, `sms`, and `dev` under `DEV_LINKS` (run) | **no: SL-1** |
  | Timestamp style | "every style letter", unlisted | `d f s t D F R S T`, and none (run) | **no: SL-2** |

- **SL-1** (link schemes). `tel` and `sms` are outside AC-4.6's list. AC-4.6 gives them an outcome (the label as text, no
  `href`), so nothing breaks. Where both Discord parsers link such a target, AC-3.1 and AC-4.6 disagree on that input, and
  the table would call it C5, a site defect, when it is the list. `dev` appears only under a mask that carries
  `DEV_LINKS`, which AC-2.3 governs. Bearer: the implementer at M4, when AC-3.1 fails on such an input. It takes the input
  to the planner, who adds the scheme or records the difference.
- **SL-2** (timestamp styles). The engine accepts nine style letters. `MarkdownTimestamp.tsx` at `af3d95a`, which M4
  keeps, has formats for six (`t T d D f F`) and handles `R`. It has none for `s` and `S`. No criterion lists the styles
  or says what the site draws for those two, and AC-3.1's canonical form blurs the style (X-19). Bearer: nobody by any
  criterion. The implementer meets it only by reading this line, and otherwise a user who types `<t:…:s>` does. This is
  the limit most worth folding.

F-26 MEDIUM cycle 1 pass 2 — OPEN — An instrument or step given a job it cannot reach (second member of F-10's shape); closed by property, limits SL-3 to SL-7
- **The second member**: M3, "Form": `pnpm test:discord` "re-derives every frozen literal live". Two of the frozen
  families have no live source the plan establishes: AN-3's mask rows (a read of served code and a signed-in walk) and
  AN-6's native mapping (module 818948 "read as prose"). AN-4 establishes only that `parseToAST` and the legacy text-box
  table run from fetched assets.
- **Property**: every sentence that gives an instrument, a step or a stage a job over a class names one that exists when
  the job runs and can reach every member of the class. What it cannot reach is named as residue.
- **Domain**: the plan's criteria (AC-2.1 to AC-6.5), the seven AN items, the outcome table's cells, the Header's base
  step and M7's bullets, all read in this pass. Five sentences do not hold:
- **SL-3** (live re-derivation). The live command can re-derive what the fetched legacy code computes: AC-3.2's and
  AC-5.6's expected values. AN-3's masks and AN-6's native mapping are frozen from a read, and they go stale silently
  until someone re-reads them at a pin change. Cause C4 of the table reaches only the first family. Bearer: the
  implementer at M3, who names in its document which literals the command re-derives. QA's re-key reads that list.
- **SL-4** (AC-3.4's base-red list). AC-3.4 says every limb fails at the chain base "except the normalisation limb".
  The refused-paste limb that revision 2 added to AC-3.3 also passes at the base: `onPaste` already refuses and leaves the
  text as it was (read from code at `af3d95a`, not run). The rule that holds is the one AC-3.4 already states for the
  normalisation limb: a limb the base passes is shown red by mutation only. Bearer: QA at Phase 2, which takes the
  base-green limbs from a run at the base, not from the list.
- **SL-5** (the unmapped-kind fallback). M2 says an unmapped kind "renders its source characters". A `parse` node carries
  no source text and no span (P-1), so the sentence holds only if AN-5 picks `parseLossless`. Bearer: the implementer at
  M4, with AN-5's result. Under the `parse` form it takes the sentence to the planner.
- **SL-6** (AN-3's count). A legacy-only surface goes to him "before M2's approval" with a disagree count "from M3's
  classification". M3 does not exist before M2. The count has to be the analyst's, taken with AN-4's oracle over the 272
  corpus. Bearer: the analyst at AN-3.
- **SL-7** (AC-6.3's sign-in read). AC-6.3 gives the analyst a read ("whether a local build can complete Discord
  sign-in"), and M1 says the analyst works only on M1's items, which do not list it. Bearer: UAT at register row B-4. If
  the analysis holds no attempt, UAT makes it before the walk.

### Resolved

F-1 HIGH cycle 1 pass 1 — RESOLVED — each AN item now carries its "Not completed" outcome and the approval it holds. Plan revision 2, M1.

F-2 HIGH cycle 1 pass 1 — RESOLVED — outcome table by cause and gate, the release-interval figure, D-5's instrument corrected, the Test Conventions carrier. Plan revision 2, M3 "Outcome of a red `pnpm test:discord`", D-5, M7. Its later-chains column is F-24.

F-3 HIGH cycle 1 pass 1 — RESOLVED — pending stays hidden as today; rejected is marked a deviation with AF-7 as its reason. Plan revision 2, M2 loading states, AC-2.5, P-4.

F-4 MEDIUM cycle 1 pass 1 — RESOLVED — the gap is recorded on every capture, the quiet window is read from source, and the missing production read is a stated limit carried by QA's candidate E-4. Plan revision 2, AN-2, RK-2, X-21.

F-5 MEDIUM cycle 1 pass 1 — RESOLVED — declared and observed enumerators, an outcome for an unmapped kind, the `0` rule. Plan revision 2, AC-2.4, M2, RK-3, AC-2.3. Its class is F-25.

F-7 MEDIUM cycle 1 pass 1 — RESOLVED — a legacy-only surface goes to him before M2's approval. Plan revision 2, AN-3. The count's source is SL-6.

F-8 MEDIUM cycle 1 pass 1 — RESOLVED — the rule names the inline runs, and block context stays the Slate layer's. Plan revision 2, AC-5.6.

F-9 MEDIUM cycle 1 pass 1 — RESOLVED — two modes, the paste limb bounded to accepted inputs, the refusals kept with their own property. Plan revision 2, AC-3.3, P-5.

F-10 MEDIUM cycle 1 pass 1 — RESOLVED — the mutated code is named per criterion. Plan revision 2, AC-3.4. Its class is F-26.

F-11 MEDIUM cycle 1 pass 1 — RESOLVED — AN-1 cites plan 018's RK-7 and takes its build form. Plan revision 2, AN-1.

F-12 MEDIUM cycle 1 pass 1 — RESOLVED — the base is `master` at the cut, with a re-derivation step the implementer runs. Plan revision 2, Header notes "Base".

F-13 MEDIUM cycle 1 pass 1 — RESOLVED — AN-4 reads the driver's install behaviour; M3 takes AC-2.2's pin rule; the rollback names its runner. Plan revision 2, AN-4, M3.

F-14 MEDIUM cycle 1 pass 1 — RESOLVED — the loose form is named, with the strict count beside it and its blur in X-19. Plan revision 2, M3 "Three classes".

F-15 MEDIUM cycle 1 pass 1 — RESOLVED — QA's production read is cited (it matches QA's P-Q13), the anchors must exist, and the reader is the carrier. Plan revision 2, Testing Strategy.

F-16 MEDIUM cycle 1 pass 1 — RESOLVED — AC-2.7. Plan revision 2, M2.

F-17 MEDIUM cycle 1 pass 1 — RESOLVED — Reading Order with the owed re-verdicts table; its rows name current headings. Plan revision 2.

F-18 MEDIUM cycle 1 pass 1 — RESOLVED — AC-6.3 has a provision step and AC-6.4 names what a place would take. Plan revision 2, M6. The step's place is SL-7.

F-19 LOW cycle 1 pass 1 — RESOLVED — AC-3.1, AC-3.2, AC-4.1 and AC-5.1 name D-4 and D-5. Plan revision 2.

F-20 LOW cycle 1 pass 1 — RESOLVED — X-13 to X-16, X-19 and X-20. Plan revision 2, Exclusions.

F-21 LOW cycle 1 pass 1 — RESOLVED — the conditional package is in AC-2.1 and AC-2.2; AC-2.6 covers both parts of the notice. Plan revision 2, M2.

F-22 LOW cycle 1 pass 1 — RESOLVED — gates stated in M5 and M6; devops mints the handoff. Plan revision 2, M5, M6, M7.

F-23 LOW cycle 1 pass 1 — RESOLVED — AC-6.5 under option a, with the header and provider sentences reworded. Plan revision 2. D-13 replaces it at revision 3. Duplicates: CF-2 in architecture/019-slate-formatting-discord-engine-architecture-findings.md

## Questions

Pass 1's three questions are answered in revision 2: the oracle helper with AN-3's literal masks (AC-2.1), the generator
count fixed from QA's EC-4 (AC-3.3), and the outcome table.

For revision 3, which folds D-13:

1. **Planner.** Which text does the lift hand the engine: one line, as the decorator does (AC-5.6), or the whole value?
   AC-6.5 says "the same text" and does not say. The answer decides whether an emoji inside a run that crosses lines is an
   element in the editor.
2. **Planner.** The plan's OQ-5 text says the fold "touches no other milestone". Which milestone removes
   `simple-markdown`, its patch and its type file? Three things outside M6 read that library today: M4's kept renderers
   (the `react` functions on `rules.tsx:staticBaseRules`), the timestamp callback's type (the architect's CF-6), and M2's
   lockfile disposition and rollback pairing.

## Scope assumptions the plan lists

- **Unit**: holds only where AN-3 finds each surface to be a mask of the native parser. Revision 2 sends the other result
  to him (F-7).
- **Reach**: holds. Pass 1's search found 45 files, tests included, none under `bot` or `lang`; revision 2's P-4 now names
  the one file that was missing.
- **Layer**: holds, and AC-5.6 and AC-3.3 now say so.
- **Emoji lift**: X-8 is replaced by D-13 at revision 3.

## Review-method lines with no finding

Pass 2:
- **Reading Order.** Present; each row names current headings; the owed re-verdicts table is there.
- **Decisions Register.** D-13's label and option text match effort rulings block 16:29Z. D-5's reopening instrument is
  corrected. No row is re-raised.
- **Restated figures.** The architect's 2,154 ms and 5.2 ms are line 1 of `split.out`. The 106 link inputs: the file holds
  106 strings, all distinct (python `len` and `set`). QA's production hrefs match QA's P-Q13 and B-5. QA's document holds
  the candidate E-4 and the measurement EC-4 that the plan cites.
- **Release target.** Unchanged, and equal to the scoping block's end step.
- **New steps and their runners.** The base re-derivation (implementer), the upgrade handoff (devops, Stage 1), the Test
  Conventions text (implementer proposes, steering lands; commit subjects in `git log -- CLAUDE.md` name plan 014's M1 and
  M5 as having landed that file) and the X-8 handoff (devops) each name a runner.
- **Riders.** R-A carries a criterion line, the yield clause and a priced drop disposition.

Pass 1, still standing: the port scope against the 25 keys of `rules.tsx:staticBaseRules`; the carried figures (`61e5dfe`
to `af3d95a` moves test files only); S-30's four call sites; the 34 open handoffs' triggers; no code in the plan; no
Content-Security-Policy header in the repository.

## Process record

- Pass 1: the website was read from a `git archive af3d95a` export in this session's scratchpad and by `git grep`, `git diff
  --numstat` and `git ls-tree` against the object store. The shared tree was not touched. The export and the two unpacked npm
  packages were deleted at the end of that pass.
- Pass 1: one lookup of the export was not completed, then re-run with literal paths (effort rulings block 15:29Z).
- Pass 1: the architect's conformance document and QA's Phase 1 document on revision 1 were read at the seam, after this
  document's first commit (`4cdbdcee`). F-23 repeats CF-2 and is marked.
- Pass 2: website files were read with `git show af3d95a:<path>`. The pinned package was installed into an empty scratch
  directory with install scripts off and run under `timeout` from a script kept in a different directory. The directory
  is deleted at the end of this pass; the Appendix holds the inputs and the output.
- Pass 2: the architect's delta pass on revision 2 (`ee54771c`) was committed while this pass ran. It was not read before
  this pass was written.

## Resumption State

Written at steering's ask for a clear, after pass 2 (`e3e49ac7`).

- **Done**: cycle 1 pass 1 on revision 1 (`103687b4`, read whole) and pass 2 on revision 2 (`8dfd4659`, read whole) with
  registration R-2 (`4c872804`). Verdict REQUEST REVISION. `planner-019` was sent this document at `e3e49ac7`.
- **Next**: cycle 1 pass 3, on revision 3, when the planner's message names it. Read it as the `git diff` from `4c872804`
  (the last state this critique read), boundary checked by an ID-set comparison of the two revisions; escalate to a whole
  read only if the diff again replaces most of the file or reshapes a milestone (the D-13 fold may reshape M6).
- **What pass 3 checks**: F-6 (the editor's rows in the three-class table); F-24 (D-12's "every release gate"); whether
  the two properties of F-25 and F-26 were adopted, or SL-1 to SL-7 carry landing triggers in the plan; the D-13 fold
  against effort rulings block 16:29Z and the two Questions; RK-8's pass-2 record ("no new member") written back; any
  open `OPEN QUESTION`. The architect's CF-8 and QA's QAF-15 to QAF-17 on revision 2 were not read; read their heads at the
  seam for overlaps, after this document's pass-3 commit.
- **Standing rules of the brief** (`steering/019-brief-critic.md`, `steering/slate-formatting-brief-common.md`): shell in
  the record folder; website read by `git show <sha>:<path>` or an export with literal paths; record documents by Write or
  Edit only; stamps from `date -u`.
- **Tree**: record `master`; nothing of this session is uncommitted. Scratch exports and the engine install are deleted;
  no process of this session is running. No question is awaiting an answer.

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
