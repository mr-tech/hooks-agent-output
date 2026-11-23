---
ID: 019
Origin: 019
UUID: 286c730a
Status: Resolved
Status-Detail: "Cycle 1 pass 5 on plan revision 5: APPROVED, and closed at that pass. F-1 to F-30 are RESOLVED. F-31 (LOW) carries its landing trigger in the plan's Planner batch (the planning pass that folds AN-8's GAME_MENTION limb) and closes there as landed-by-author. A later revision that changes a criterion's text opens cycle 2."
Artifact-Revision: 5 — read as the delta e53c7cdb..d2912590 (cycle 1 pass 5)
Reviewed-At: "d2912590 — repos=agent-output; website read at af3d95a"
Verdict: APPROVED
---

# Critique — Plan 019, Slate formatting on Discord's engine

**Artifact**: `planning/019-slate-formatting-discord-engine.md`, revision 5 (`d2912590`). Revisions 1 and 2 were read whole
(passes 1 and 2); revision 3 as a delta with M5 and M6 whole (pass 3); revisions 4 and 5 as deltas (passes 4 and 5).
**Read at cycle 1 pass 5**: the plan's diff `e53c7cdb..d2912590`; `verification/019/qa/probe-mask-vs-an3-table.r4.out`.
**Analysis**: `analysis/019-slate-formatting-discord-engine-analysis.md` (`aafecf1`). AN-8's results have not landed.
**Read at cycle 1 pass 4**: the plan's diff `9ac9ba62..e53c7cdb`; the analysis at its wasm-hash lines and AN-3's GAME_MENTION
row; QA's document at `24d537bf` for its GAME_MENTION finding; `verification/019/qa/probe-mask-vs-an3-table.out`; QA's P-Q9 row
for the 15,480 figure.
**Read at earlier passes**: listed in this critique at `af0b21d` (pass 3), `e3e49ac7` (pass 2) and `0435794c` (pass 1).
**Roadmap**: `roadmap/` holds no roadmap document, so alignment is judged against the rulings and the architecture record.
**Date**: 2026-11-23.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-23T16:11 | steering-hooks-fixer (brief `steering/019-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | Depth: whole-document, the cycle's first pass, at `103687b4`. New findings: F-1 to F-23 (3 HIGH, 15 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. |
| 2026-11-23T16:34 | planner-019 (message naming revision 2 at `8dfd4659`) | cycle 1 pass 2: plan revision 2, whole-document read | Depth: whole-document. Findings addressed: F-1 to F-5 and F-7 to F-23 RESOLVED (22). New findings: F-24 (MEDIUM), and F-25 and F-26, closed by property with stated limits SL-1 to SL-7. The stop authority fired on both. Verdict REQUEST REVISION. |
| 2026-11-23T17:19 | planner-019 (message naming revision 3 at `9ac9ba62`); steering-hooks-fixer (resume pointer after a clear) | cycle 1 pass 3: plan revision 3 | Resumed after a clear from this document's Resumption State at `c579526e`. Depth: delta-bounded, M5 and M6 read whole. Findings addressed: F-6, F-24, F-25 and F-26 RESOLVED. New findings: F-27 and F-28 (MEDIUM), F-30 (LOW); F-29 closed by property with stated limit SL-8; SL-9 under F-26's property. The stop authority fired on F-29. Verdict REQUEST REVISION. |
| 2026-11-23T17:27 | planner-019 (message naming revision 4 at `e53c7cdb`) | cycle 1 pass 4: plan revision 4 | Depth: delta-bounded. The delta `9ac9ba62..e53c7cdb` is 132 added and 75 removed lines over 1,083 (`git diff --numstat`, three commits, two of them registrations R-4 and R-5), fully readable as a diff; it reshapes no milestone. Boundary check by this pass's own instrument, the ID regex over both revisions computed in memory: none removed; added X-25 and X-26; no criterion ID added, and AC-2.3, AC-3.2, AC-3.7, AC-3.8, AC-4.7 and AC-6.5 changed in place, as the owed re-verdicts table lists. Artifact changes: the folds of pass 3, the architect's CF-9 and CF-10, QA's QAF-18 to QAF-22 and its GAME_MENTION mask finding. Findings addressed: F-27 to F-30 RESOLVED; SL-8 and SL-9 landed; the pass-3 assumption answered by AC-3.8 (i′) and X-26. New finding: F-31 (LOW), OPEN with a landing trigger. Verdict APPROVED. |
| 2026-11-23T17:31 | planner-019 (message naming revision 5 at `d2912590`) | cycle 1 pass 5: plan revision 5 | Depth: delta-bounded. The delta `e53c7cdb..d2912590` is 73 added and 35 removed lines (`git diff --numstat`, two commits, one of them registration R-6), fully readable as a diff; it reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed, none added. Artifact changes: AC-2.3 states six mask literals (and "seven masks" is corrected to six); AC-6.5's expected spans come from Discord's native box, with emoji edits added to its typed-edit class (the architect's CF-11, QA's QAF-23); M3's drift rule holds no gate on a live native-box departure under drift; F-31 is a Planner batch row and M4's mask line marks its premise not established. Findings addressed: F-31 carries its landing trigger in the plan. New findings: none. Verdict APPROVED. |
| 2026-11-23T17:31 | critic-019 | Document closed | Status: Resolved. Every finding is RESOLVED or, for F-31, carries a landing trigger recorded in the plan's Planner batch. |

## Verdict

**APPROVED — cycle 1, pass 5.** Neither the stop authority nor the hard stop fired (pass 5 of 15). Pricing: sized to the ask
plus his three rulings, unchanged; revision 5 adds no criterion, milestone or instrument.

Pass 5 read revision 5's delta and found nothing new:
- **F-31** is a Planner batch row with its landing trigger, and M4's mask line now says the premise is not established.
- **AC-2.3's six literals** each differ from AN-3's native mask by the one bit `0x400` on the five legacy-only masks, and
  content's is unchanged (this pass's arithmetic; QA's probe at revision 4 reads "cells 248 mismatches 1", content's).
- **The pass-4 assumption** no longer bears on a gate: under drift a live native-box departure is reported with C2 and holds
  nothing, and `pnpm test`'s frozen literals under the pinned wasm still catch a site regression.
- **AC-6.5's expected value** moved to Discord's native box doing its own join (the architect's CF-11), with the oracle helper
  as a positive control. This pass's assumption below is about its reach.

The pass-4 verdict follows, as written at that pass.

**APPROVED — cycle 1, pass 4.** Neither the stop authority nor the hard stop fired (pass 4 of 15).

Pricing: sized to the ask plus his three rulings, unchanged from revision 3. Seven milestones. Revision 4 adds no criterion;
it restates six, adds one read to AN-8 (the slow-CPU capture, from QA) and one site helper for the emoji image and size (from
the architect).

What revision 4 settled:
- **F-27.** The native box now runs on the pinned wasm, and its literals are taken under it. Under drift the native-box limbs
  report "not comparable under drift" with both hashes and hold nothing.
- **F-28.** A later release that does not touch the region is held by nothing the command reports, a fetch failure included.
  Devops at Stage 1 runs it there.
- **F-29 and SL-8.** AC-3.7 excuses an input only through a frozen residue list. Each entry's predicate is evaluated on the
  oracle helper's parse, not the site's output; a newly different input fails; the list changes only by a reviewed commit. An
  adjustment that reaches no member fails AC-3.8 (ii).
- **F-30, SL-9** and the pass-3 assumption (AC-3.8 (i′), with X-26 for what it still cannot see).

One finding is open and does not hold approval: **F-31** (LOW). The mask line clears `GAME_MENTION` on the legacy-only surfaces
on a premise the analysis marks not established. AN-8's limb reads it, and the planner's next batch folds AN-8.

A reading recorded, not a finding: outcome row C6's later-release cell names limb (i) and not (i′). The row's first cell groups
the two, so (i′) at a later release is read as (i): it goes to him through steering and holds no release.

**RK-8, the class from pass 1: no new member found by this pass.** Two statements of today's site that revision 4 added (the
emoji image and jumbo flag come from `simple-markdown`'s emoji rule; `common.ts` holds two `isEmojiNode(node?.ast)` predicates)
are the architect's reads at CF-10 and were not re-read here.

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged and equals the scoping block's end step. No `OPEN
QUESTION` is unresolved.

Routed to the owner: nothing.

## Value Statement Assessment

Present, in user-story form, and delivered directly. Unchanged at revision 4.

## Assumption Not Checked

Cycle 1 pass 5: this pass assumes that a run of Discord's native box (module 818948) exposes the emoji spans of its own parse,
and does not test it. The analysis's AN-6 table describes the box's output as leaf attributes per token, where an emoji is an
`atom` carrying the enclosing styles, not a span marked as an emoji. If it is false, M3's implementer finds no emoji span to
freeze for AC-6.5, and the expected value falls back to the oracle helper that revision 5 made the positive control. The
implementer at M3 owns closing it and takes a miss to the planner; the architect's delta pass on revision 5 reads the same form.

Cycle 1 pass 4 (no longer bears on a gate; plan revision 5, M3 "Which wasm"): this pass assumes that Discord's served box JavaScript, run against the pinned wasm bytes while the served wasm
differs, either fails to initialise or computes what it would on its own wasm, and does not test it. No Discord build was run.
If it is false, a native-box limb goes red under drift as a moved literal (C4) when neither the site nor Discord's box moved,
and the gate holds on it. The implementer at M3 owns closing it (its re-derivation list names the wasm each live limb runs
on); QA reads any C4 that arrives together with C2 against both hashes before it is treated as a hold.

Pass 3's line is answered by AC-3.8 (i′), with X-26 as its stated residue.

## Unresolved Open Questions

None.

## Findings

### Open

F-31 LOW cycle 1 pass 4 — OPEN, landing trigger named — The mask line clears `GAME_MENTION` on a premise the analysis marks not established
- **Location**: M4, the adjustment module's mask line ("legacy never parses a game mention there"); AC-2.3; M1 AN-8's
  GAME_MENTION limb and its "not completed" outcome.
- **Description**: the line rests on QA's probe, which reads the analysis's AN-3 table. That table's GAME_MENTION row says "not
  established (G-1)": `<game:id>` is plain text in both parsers, and the regex export of module 856896 was not read. AN-8's
  second limb is the read. Its "not completed" outcome says only that the kind stays X-14, not what the mask line does. No
  generator input can show a wrong bit, because the written form is unknown.
- **Impact**: small. A game mention in an embed is the only input reached.
- **Recommendation**: when AN-8 is folded, state the mask line against its result: kept where legacy has no rule on those
  surfaces, restored where it has one, and marked unread where the limb is not completed.
- **Landing trigger**: the planning pass that folds AN-8's GAME_MENTION limb, recorded at plan revision 5 in the Planner batch
  (row F-31) and in M4's mask line. It closes there as landed-by-author, in that revision; it is not critic-verified.

### Resolved

F-1 HIGH cycle 1 pass 1 — RESOLVED — each AN item carries its "Not completed" outcome and the approval it holds. Plan revision 2, M1.

F-2 HIGH cycle 1 pass 1 — RESOLVED — outcome table by cause and gate, the release-interval figure, the Test Conventions carrier. Plan revision 2, M3, D-5, M7.

F-3 HIGH cycle 1 pass 1 — RESOLVED — pending stays hidden as today; rejected is a marked deviation. Plan revision 2, M2, AC-2.5, P-4.

F-4 MEDIUM cycle 1 pass 1 — RESOLVED — the gap is recorded on every capture; the missing production read is a stated limit. Plan revision 2, AN-2, RK-2, X-21.

F-5 MEDIUM cycle 1 pass 1 — RESOLVED — declared and observed enumerators, an outcome for an unmapped kind, the `0` rule. Plan revision 2, AC-2.4, M2, RK-3, AC-2.3.

F-6 MEDIUM cycle 1 pass 1 — RESOLVED — the class table has the editor's rows. Plan revision 3, M3 "Classes".

F-7 MEDIUM cycle 1 pass 1 — RESOLVED — a legacy-only surface went to him before M2's approval; ruled at D-14. Plan revisions 2 and 3.

F-8 MEDIUM cycle 1 pass 1 — RESOLVED — the rule names the inline runs; block context stays the Slate layer's. Plan revision 2, AC-5.6.

F-9 MEDIUM cycle 1 pass 1 — RESOLVED — two modes, the paste limb bounded, the refusals kept. Plan revision 2, AC-3.3, P-5.

F-10 MEDIUM cycle 1 pass 1 — RESOLVED — the mutated code is named per criterion. Plan revision 2, AC-3.4.

F-11 MEDIUM cycle 1 pass 1 — RESOLVED — AN-1 takes plan 018's build form. Plan revision 2, AN-1.

F-12 MEDIUM cycle 1 pass 1 — RESOLVED — the base is `master` at the cut, with a re-derivation step. Plan revision 2, Header notes.

F-13 MEDIUM cycle 1 pass 1 — RESOLVED — AN-4 needs no driver; M3 takes AC-2.2's pin rule; the rollback names its runner. Plan revision 2, AN-4, M3.

F-14 MEDIUM cycle 1 pass 1 — RESOLVED — the loose form is named, with the strict count and its blur in X-19. Plan revision 2, M3.

F-15 MEDIUM cycle 1 pass 1 — RESOLVED — QA's production read is cited and the reader is the carrier. Plan revision 2, Testing Strategy.

F-16 MEDIUM cycle 1 pass 1 — RESOLVED — AC-2.7. Plan revision 2, M2.

F-17 MEDIUM cycle 1 pass 1 — RESOLVED — Reading Order with the owed re-verdicts table. Plan revision 2.

F-18 MEDIUM cycle 1 pass 1 — RESOLVED — AC-6.3 has a provision step and AC-6.4 names what a place would take. Plan revision 2, M6.

F-19 LOW cycle 1 pass 1 — RESOLVED — the criteria name their decision rows. Plan revision 2.

F-20 LOW cycle 1 pass 1 — RESOLVED — Exclusions rows with carriers. Plan revision 2, Exclusions.

F-21 LOW cycle 1 pass 1 — RESOLVED — AC-2.1, AC-2.2, AC-2.6. Plan revision 2, M2.

F-22 LOW cycle 1 pass 1 — RESOLVED — gates stated in M5 and M6; devops mints the handoff. Plan revision 2.

F-23 LOW cycle 1 pass 1 — RESOLVED — replaced by D-13: AC-6.5 on the engine, AC-6.6. Plan revision 3, M6. Duplicates: CF-2 in architecture/019-slate-formatting-discord-engine-architecture-findings.md

F-24 MEDIUM cycle 1 pass 2 — RESOLVED — the command runs at every later website release, as D-12 reads. Plan revision 3, M3 "Who runs it", M7.

F-25 MEDIUM cycle 1 pass 2 — RESOLVED — SL-1: `tel` and `sms` listed, checked by the observed enumerator (AC-4.6). SL-2: AC-4.7, AN-8's first limb, X-24. Plan revision 3.

F-26 MEDIUM cycle 1 pass 2 — RESOLVED — SL-3 to SL-7 landed or discharged at revision 3 (M3 "Form", AC-3.4, AN-5, AN-3, AN-8). SL-9: the code-reviewer row names M3 and M4. Plan revision 4, Reading Order.

F-27 MEDIUM cycle 1 pass 3 — RESOLVED — the native box runs on the pinned wasm; under drift its limbs are "not comparable" and hold nothing. Plan revision 4, M3 "Which wasm the native box runs on", outcome row C2, AC-3.2.

F-28 MEDIUM cycle 1 pass 3 — RESOLVED — the later-release column holds no release on any cause; devops at Stage 1 is the runner. Plan revision 4, outcome row C1, M3 "Who runs it", M7.

F-29 MEDIUM cycle 1 pass 3 — RESOLVED — the property is adopted: AC-3.7's frozen residue list (predicate on the oracle helper's parse, a difference signature, changed only by a reviewed commit), and AC-3.8 (ii) fails an adjustment that reaches no member. SL-8 landed with it. Plan revision 4, AC-3.7, AC-3.8.

F-30 LOW cycle 1 pass 3 — RESOLVED — D-4's and D-5's consequence cells are re-aimed. Plan revision 4, Decisions Register.

## Questions

None.

## Scope assumptions the plan lists

Unchanged from pass 3: one adapter with seven masks (five of them now with `GAME_MENTION` cleared, F-31); the read-only
branches move with the editor surfaces; the Slate block layer stays the site's own; the emoji lift reads the engine.

## Review-method lines with no finding

Pass 4:
- **Decisions Register.** D-4 and D-5 changed in their consequence cells only; no verbatim cell moved. No row is re-raised.
- **Restated figures**, each read at its source: the wasm hash `da7b9e5e…` equal for the built and the served file (analysis
  AN-1 and AN-4 lines); QA's 8 of 248 mask cells (`probe-mask-vs-an3-table.out`: "cells 248 mismatches 8", all GAME_MENTION);
  15,480 typed edits (QA's P-Q9).
- **Instruments.** AC-3.7's residue count names its reader (QA at Phase 2, against the count recorded at M4). AC-4.7's `R` limb
  is read under a fixed clock. AC-6.5's expected spans come from the oracle helper's own join, not the adapter's.
- **Runners.** The later-release run is devops's at Stage 1, recorded in that chain's deployment document.
- **Exclusions.** X-25 and X-26 carry a reason and a carrier. X-21 is restated on QA's declining of E-4.
- **Reading Order.** Rows name current headings; the code-reviewer row reaches AC-3.7 and the adjustment module.
- **Release target.** Unchanged.

Earlier passes, still standing: listed in this critique at `af0b21d`.

## Process record

- Pass 4: the plan was read as `git diff 9ac9ba62 e53c7cdb` saved in this session's scratchpad; the ID comparison ran in memory.
  Nothing was installed or run.
- Pass 4: the architect's delta pass on revision 4 was committed (`a5f78f83`) while this pass ran and was not read before
  this pass was written. QA's re-key on revision 4 was not yet committed.
- Pass 3: one comparison command was not completed, then re-run in a form that writes no file.
- Passes 1 to 3 otherwise: in this document at `af0b21d`.

## Resumption State

Closed at cycle 1 pass 5 (APPROVED on plan revision 5, `d2912590`); nothing is in flight, and a later criterion-changing revision opens cycle 2 from that SHA.

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
