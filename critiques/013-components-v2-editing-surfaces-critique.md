---
ID: 013
Origin: 013
UUID: 22d69e06
Status: OPEN
Status-Detail: >-
  Cycle 1, pass 4 (rung 1–5), scoped to rev 9–10's new and changed material. Verdict REQUEST
  REVISION, scoped to two one-clause items in M2 (M-8: M2-a's exception set omits row B;
  M-9: the rider's drop disposition prices states D17 forbids — the rider is absorbed). M1, M7
  and M3 may begin under this verdict; M2 and M8 wait for rev 11. Pass-3 entry conditions
  M-7, L-6, L-7 verified landed → RESOLVED. Stop authority fired once (M-10, the L-7 shape):
  closed by property, stated limit with transfer. Q3 closed by D17. No owner question open.
---

# Critique — Plan 013, Components V2 support across the editing surfaces

**Artifact**: `agent-output/planning/013-components-v2-editing-surfaces.md`, rev 10 (agent-output `9140ffe`; `website` chain branch `chain/013-components-v2-editing-surfaces` at `c85945f`, verified not switched).
**Analysis**: none commissioned. Sources re-derived directly at each pass: research `8311155a` and `5c1e9d27`, handoffs `8f3fa8c3` and `cb83fd7b`, plan 012's Decisions Register rows D3, D5, D10–D21. The architect's `35906ab` is cited by the plan; this pass re-derived its `stripKeys` finding from `c85945f` rather than reading the architect's document.
**Date**: 2026-08-24 (review began 2026-08-23).
**Status**: Revision 3 — cycle 1, pass 4.
**Roadmap**: absent (`agent-output/roadmap/` holds only `.gitkeep`); no Master Product Objective document exists to align against, so none is cited.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-23) | Critique rev 3 | Created. Pass 1: REQUEST REVISION. M-1–M-4, L-1–L-3. Q1 routed to the owner via steering. |
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-24) | Critique rev 6 | Pass 2: M-1–M-4, L-1–L-3 RESOLVED. New: M-5 (REQUEST REVISION), M-6 (stated limit), L-4, L-5. Q1 answered (D12); Q2 routed. |
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-24) | Critique rev 8 | Pass 3: M-5, M-6, L-4, L-5 RESOLVED (revs 7–8; D15, D16). New: M-7 (stated limit, stop authority), L-6, L-7. Q2 answered by D15; Q3 routed. Verdict APPROVE with stated limits. |
| 2026-08-24 | steering-hooks-013 brief for a scoped pass 4 against rev 9 `b57639c`, then steering's correction to rev 10 `9140ffe` (both cross-session, 2026-08-24) | Critique rev 10, scoped: M8 (incl. M8-G), M7-c, mark-and-supersede of D2/D5/D11/D13/D15, M2-d reduction, PREMISE-STALE clearances on M2/M4, entry conditions M-7/L-6/L-7 | Pass 4: M-7, L-6, L-7 RESOLVED (verified). New: M-8, M-9 (Medium, one clause each), M-10 (stated limit, stop authority), L-8–L-15. Q3 closed by D17. Verdict REQUEST REVISION scoped to M2; M1/M7/M3 may begin. |

**Target moved under this pass.** Steering released me against rev 9 and, in the same breath, relayed D18 to the planner; rev 10 was committed while I was reading the rev 8→9 diff, and steering corrected the target by message. Recorded here per steering's own instruction: the cost was one further diff read (rev 9→10, +32/−25); nothing done against rev 9 was invalidated, because rev 10 is additive to M8 (M8-G, the "Reach" paragraph, one M4-b clause, one inventory row) and changes no rev-9 criterion.

## Assumption Not Checked

This pass assumes Discord accepts, on a webhook send with `IS_COMPONENTS_V2_FLAG` set, a wire payload that carries `content: ""` and `embeds: []` rather than omitting the keys — the form the send path will emit if the implementer retires `stripKeys`' deletion (M8-G) and leaves `send/page.tsx` as it is, which the plan explicitly leaves to the implementer — and does not test it against Discord. Falsity signature: a V2 send from `send/page.tsx` returning a Discord 4xx after deploy for a draft that sent at `c85945f`. Owner of closing it: the implementer at M8-G (the send-path decision), with the detector being QA's post-deploy observable *"Save As on a V2 message yields a V2 copy that sends"* and M3-a's send form. Named again in the handoff (L-14 carries it into R5).

Still live from pass 3, not closed by steering's docket entry: V2 mode has no route to `content`/`embeds` other than the two `isClassicMode`-gated editors; falsity signature and owner as stated at pass 3 (QA's M7-a checklist). This pass adds one confirming read — `showComponentButton = isEditing && isV2Mode`, `showEmbedButton = isEditing && isClassicMode` (`DiscordMessageEditor/index.tsx`) — which is what M8-G's "the composer cannot compose a row-E draft" rests on; still not closed.

Still live from pass 2: the server's upsert input runs `discordMessageShape`, not the import shape; a direct `message.upsert` call can mint the D13 shape (now: a row-D or row-E record M8 never saw). Outside D5's clause; QA's tRPC-boundary test owns it. Under M8-G such a record, once loaded and saved, meets the ask — which is the ruling's point.

## Value Statement Assessment

Unchanged, approved as written (D4). Under D17 + D18 the statement's "no silent discard" is delivered more directly than at any prior revision: the last silent strip (L-5's line) is withdrawn, and the persist path's own deletion goes with it. **Pass.**

## Overview

Rev 9 registers D17 (the five-row table) and enacts it as M8; rev 10 registers D18 and adds M8-G inside it. Both are enactments of owner rulings that changed what criteria require, run as planning revisions with the gate applied — the right form.

**Pricing against the ask: sized to the ask.** M8 (six criteria and the cell table) is the size of D17; M8-G (one criterion, one counted file, two conditional) is the size of D18 and is priced in the register row as the ruling required; M7-c is my L-6; the M4-b clause is D9's own form applied at a door D18's principle names, at zero new files. Nothing in revs 9–10 is machinery the owner did not ask for. The rider is the one item that has become *smaller* than its structure, and that is M-9.

**Steering's two calls, checked as asked.** (1) The M4-b clause standing without owner routing: I concur — D9 already rules that a dropped component type is named; D18's *notify* limb reaches the lenient filter by the plan's own reach enumeration; the *choice* limb has nothing to offer (assumption 2). An existing ruling applied, not a new decision. (2) The architect's Medium routed to Out of Scope: I concur — of the three `message.upsert` writers not through `stripKeys`, M4-a takes the create writer through it, and the two canned-intro writers persist a fixed classic message (`m/new/page.tsx`, `f/[id]/page.tsx`; five sites total by `grep -rc`, agreeing with the architect's count), so M8-G holds vacuously there. Unifying the writers' path is an architecture record, and a criterion on it would be new scope.

**The nine readings at M8.** Each checked against the ruling's words and the standing register; none is undecidable by the planner, and I route none to the owner. Reading (3) is the one with a consequence (cell *bit set, no V2 components, no body* → row C) and it follows from D13's "not a conflict" joined to D15, both rulings.

**Ladder**: cycle 1, pass 4, rung 1–5. Stop authority fired once this pass (M-10).

## Architectural Alignment

`Architectural-Surface: none added` remains accurate at rev 10: M8 changes the reconciler's contract and adds a choice at existing surfaces; M8-G removes a deletion from an existing serialiser. Premises re-verified at `c85945f` for the new material:

- **M8's class is non-empty at row E as enumerated.** `discordMessageImportShape`'s only refinement is `refineDisplayableText` (a displayable-text size check); the base shape admits `content`, `embeds`, `components` and `flags` together, so a row-E object parses and the disposition can run after the shape rather than being pre-empted by it. Today's strip runs *before* parse in both surfaces (`enforceImportMutualExclusivity(parsed)` → `parse(cleaned)`); M8-E retires it.
- **The eight cells partition the class and each maps to its row.** Three binary predicates, 2³ cells, none unassigned; A ← {clear,none,·}, B ← {clear,present,absent}, C ← {set,none,absent} ∪ {set,present,absent}, D ← {set,none,present}, E ← {·,present,present}. Verified against D17's rows; the only cell the rows do not name verbatim is {set,none,absent}, which reading (3) places in C on D13. The "neither content nor components" residue is correctly outside the rows (the floor's).
- **M8-G's premise.** `stripKeys` (`src/utils/index.ts`): inside `if (hasV2)` it ORs the bit and then `delete casted.data.embeds; delete casted.data.content;` — the architect's finding holds. Callers: `send/page.tsx`, `SaveAsMenu.tsx`, `JsonModalBody.tsx`, `usePusher.ts`, `useApiMethods.ts` — the persist, seed, hash and send paths the plan names. `saveMessage` (`useApiMethods.ts`) calls `upsertMessage({ message: stripKeys(...) })`. The send gate `allowSave` requires `isMessageValid` (`!validateMessage(message.data)`), so no draft carrying both reaches the wire — M8-G's "wire-shaping is outside the class" holds.
- **The composer cannot compose a row-E draft**: component button gated on `isV2Mode`, embed button on `isClassicMode`, content editor on `isClassicMode` (pass 3). Holds.
- **Entry conditions landed**: M7-a now enumerates the three `setMessageMode` writers with counts equal to mine and assigns the modal's to M8 (M-7); M7-c names `send/page.tsx` `messageHasV2` and the file is inventory row 17 (L-6); the coordination fact names `012-message-mode.test.ts` (7) and `012-send-gate-partition.test.ts` (3) with counts equal to mine (L-7).

## Scope Assessment

Mark-and-supersede: D2, D5, D11, D15 annotated correctly and their operative text untouched (the diff prepends annotations only). D13's annotation is right on the withdrawn consequence but leaves one clause unmarked that D17 also supersedes (L-9). PREMISE-STALE: M4's clearance holds on all three criteria; M2's clearance holds for M2-c and for M2-a outside rows B/D/E but claims closure for row B, which M8-B itself breaks (M-8). D18 is a third pre-ship premise withdrawal and the gate's own record does not show it applied (L-13). Inventory 18 counted rows plus two conditional: reconciles.

## Technical Debt Risks

- After M8-G the tree holds one serialiser that is identity-modulo-`_key`s-plus-bit, which is the invariant the architect will record; the debt the plan is paying is the "defence-in-depth" comment's deletion, which was doing the reconciler's job at the wrong layer. Good.
- The disposition lives in one reconciler and is rendered by two surfaces (R9). The plan's parity property (M8-F) is the right guard; the residual is UI-level, uncovered by automation, and lands as UAT checklist rows — named.

## Findings

Pass-1 (M-1–M-4, L-1–L-3), pass-2 (M-5, M-6, L-4, L-5) findings: RESOLVED at revs 4–8; dispositions in the pass-2/3 revisions. Pass-3 dispositions this pass:

- **M-7** — RESOLVED at rev 9: the modal's mode writer assigned to M8 in M7-a's text, M7's Files line and the shared-file row; M8-F delivers M7-a's predicate there.
- **L-6** — RESOLVED at rev 9: M7-c, with the structural readers named as non-members and the file in the inventory.
- **L-7** — RESOLVED at rev 9: both files in the coordination fact with counts.

### Medium

**M-8 — M2-a's exception set names row D only; row-B stored records break the same round trip under M8-B** — Status: OPEN.
*Description.* M2-a requires open → Load (unchanged) to yield `data ≡` prior `data` for every message loadable in the composer, with one exception (row D, where the Load is the repair). M8-B makes an unchanged Load of any stored record carrying V2 components with the bit clear set the bit *and show a warning*. Such records exist at rest by the plan's own account: M4-a's mechanism paragraph states that `NewMessageModal.onSubmit` forwards without `stripKeys`, "leaving a bit-clear-at-rest interval" until first send or composer save — a paste-created V2 message never saved is a row-B record, and M4-a stops new ones without repairing old ones (Out of Scope: existing rows are not repaired). M2's clearance paragraph says the round trip "hold[s] unchanged for every object outside rows D and E", which is false for these.
*Impact.* QA writes M2-a's suite from the plan: a row-B fixture is expected to round-trip and warns instead; the implementer is sent back or the warning is filed as a defect. Population: not derivable (the same instrument gap as the 29 rows), bounded above by paste-created messages never saved.
*Recommendation.* One clause at M2-a (a second bounded exception: row-B records — the bit set, the warning shown, mode V2 before and after) and the matching word in M2's clearance paragraph. No new machinery.

**M-9 — The rider's drop disposition prices post-drop states D17 forbids; the rider can no longer yield and is absorbed** — Status: OPEN (the finding steering asked for).
*Description.* M2-d's post-drop values: row B falls to "accepted, loads as V2, the bit set at the next save, **no warning**"; row D falls to the floor's refusal, "the record unchanged". D17 row B: *"Present error / warning message, fail gracefully, save as V2"*; row D: *"…fail gracefully, save as Classic"* — and D5's refusal is the very thing D17 withdrew. Exercising the drop would put the plan in breach of the owner's ruling on both rows. A rider whose yield clause cannot be exercised without breaching a standing ruling is not yielding; its "one clause" is host behaviour the owner has ruled directly, with *"I won't hear another word"*. The attachment's remaining substance is traceability — handoff `cb83fd7b` is closed by M8-B/M8-D — which M6 already carries.
*Impact.* A reviewer or implementer who meets a conflict at M8-B/D reads "the rider yields" and drops owner-ruled behaviour; the 012 handoff's "if the rider drops, the three-step form returns" is a state the plan may not enter.
*Recommendation.* Retire the yield clause and the priced drop at M2-d and at M8's "Rider" line; keep M2-d as a two-line attachment record (D2's clause enacted at M8-B/M8-D; reopening: owner withdrawal of D17 only); strike the conditional in the 012 handoff. This is a reduction, not growth; it is one planner clause. D2's register row is annotated already and needs no edit.

**M-10 — Tests asserting `stripKeys`' deletion go red under M8-G and are absent from the coordination fact** — Status: STATED LIMIT (stop authority; second instance of the L-7 shape, *existing tests a milestone's behaviour change turns red, absent from the coordination fact*).
*Instance.* `mutual-exclusivity.test.ts` asserts `result.data.content`/`.embeds` `toBeUndefined()` after `stripKeys` (4 such assertions), `components-v2-data-layer.test.ts` 5 (`stripped.data.content`/`.embeds` at its lines 443–444 among them); `grep -c`, 2026-08-24. Neither is in the rev-10 list, which names four files.
*Closure by property.* Over the domain *every file under `src/**/__tests__/` referencing a symbol whose behaviour a milestone of this plan changes* — the symbols being `standardizeMessage`, `hashMessage` (M1), `enforceImportMutualExclusivity` (M2/M8), `stripKeys` (M8-G), `switchToV2`/`applyModeSwitch` (M7-b), `detectMode` (M7-a), `filterSupportedComponents`/`discordMessageImportShape` (M4-b), `discordResponseToMessage` (M3) — enumerated by `grep -rc` at the chain base: every member is QA's to re-anchor, none the implementer's to delete or edit. The plan's list is then illustrative of the domain, not the domain. Residue the system cannot distinguish: tests that reach a changed symbol only through an un-named helper — bounded by the repo's test tree and found when they go red.
*Transfer.* QA takes the enumeration at Phase 1 by `grep -rc` over the symbol list, not from the plan; the implementer records every file that went red in the implementation doc's files-touched reconciliation (M6 already requires the reconciliation). The planner adds nothing per file at next touch — a list maintained per finding has this half-life.

### Low

**L-8 — Out of Scope still declines I-D10's option "in favour of import-time rejection"** — OPEN. The rejection was withdrawn at D17; the line's reason should read "in favour of D17's disposition (M8)". Stale wording every downstream reader of that entry inherits; one phrase.

**L-9 — D13's annotation leaves "the components are NOT consulted by the conflict check" unmarked** — OPEN. D17 consults them: the same *bit + body* is row D without V2 components and row E with. The annotation marks the withdrawn consequence and says the definition survives as row D's trigger; row D's trigger is narrower than D13's definition by that clause. Mark the clause superseded in part; operative text stays.

**L-10 — M8-A/M8-C's "nothing is shown … no message of any kind" collides with M2-c's confirmation at the modal** — OPEN. A Load whose object differs from the current message in components or flags shows M2-c's confirmation by requirement; a QA checklist item written from M8-A's human form ("no message of any kind appears") fails on it. Scope "nothing shown" to the disposition's notice class (M8-F's term), with M2-c's confirmation named as unaffected.

**L-11 — M7-c enumerates its class from `hasV2Components` only; the class's definition also contains flag-only readers** — OPEN. `sendWebhook.ts` sets `with_components=true` from `message.flags & IS_COMPONENTS_V2_FLAG` alone — a reader whose question is V2-ness. It satisfies M7-c's predicate because `send/page.tsx` runs `stripKeys` (which ORs the bit from structure) before it, not because it asks the product's question. Enumerate from both symbols (`grep -rc` on `IS_COMPONENTS_V2_FLAG` gives `sendWebhook.ts`, `limits.tsx`, `messageMode.ts`, `stripKeys`, the 012 classifier) and name `sendWebhook.ts` as a satisfied member with that reason, so the class is enumerated from its own definition.

**L-12 — M2's closure depends on M8 while M8 depends on M2** — OPEN. M2-b's expected values are M8's rows B/C/E; M2-a's row-D value is M8-D; M8 lists M2 as a dependency ("the round trip is closed before its disposition changes"). Sequentially, M2 cannot close before M8 has landed the rows it cites. State which criterion closes at which milestone: M2 closes on M2-a outside rows B/D/E and on M2-c; M2-a's row values and M2-b close at M8. One sentence at M2's Dependencies.

**L-13 — The re-derivation gate's record does not show D18 applied** — OPEN. The Milestones preamble records the gate applied "twice, before anything shipped" (D15, D17) with an examined-list each time; D18 withdraws a premise (`stripKeys` deletes under V2) that M1-b/c/d, M2-a and M4-a's "transport form" all read, and rev 10 examines them only piecemeal (R5's record; M8-G's "Consequence for M1-c and M1-d"). Every one of those criteria survives — the retirement makes M1's ≡ exact rather than modulo the deletion — so nothing is marked; but the preamble should say the gate ran a third time and what it found, or the next reader assumes it was skipped.

**L-14 — R5's record should carry the send path as its falsifier now that M8-G changes `stripKeys`** — OPEN. R5's subject is the serialiser's blast radius; rev 10 correctly records that M8-G changes it. The one path the plan leaves to the implementer — whether `send/page.tsx` keeps omitting empty `content`/`embeds` on the wire — is the path with no pre-deploy instrument (no e2e). Add the falsifier: *a V2 send failing at Discord after deploy for a draft that sent at `c85945f`*, detected by the existing post-deploy observable. (This is the pass's Assumption Not Checked, routed.)

**L-15 — The 012 handoff's "the Load itself is the repair, zero edits" overstates by one save** — OPEN. Reading (7): on the modal "save as" is the state the Load lands, *written by the next save*. For 012's planner the guidance is "open JSON, Load, Save"; zero edits, one save. One word.

## Questions

**Q1–Q2** — closed (D12/D13; D15). **Q3** — closed by D17 (row E: a choice, neither reading). No question for the owner this pass. To steering, for the record and not as questions: the two calls above are concurred with, with reasons; none of the nine readings warrants the owner's time.

## Risk Assessment

R1–R6: no member (R5's rev-10 note is correct; L-14 adds its falsifier). **R7**: no member; unchanged by D17/D18. **R8**: no member; unchanged (reading (8)). **R9** (new, rev 9): no member (nothing built); well-formed, magnitude the eight cells × two surfaces, guard M8-F. "How will this plan result in a hotfix?" — the candidates: the send wire form after M8-G (the Assumption Not Checked; L-14) is the only one with a Discord-side unknown; M-8 is a QA-round cost, not a production one; R9's divergence is caught by M8-F's fixtures if QA runs them through both entry points, which the plan requires.

## Recommendations

**REQUEST REVISION, scoped.** Two Medium items, each one planner clause in M2 (M-8 at M2-a and the clearance paragraph; M-9 at M2-d and M8's Rider line, plus the 012 handoff's conditional). The Lows may land in the same pass at the planner's discretion; none gates. What this buys over recording M-8/M-9 as limits: M2-a is a criterion QA writes tests from, and M2-d's yield clause is an instruction a reviewer may act on — both are consumed as fact by readers who do not read critiques.

- **Execution under this verdict**: the implementer may begin **M1, M7 and M3** now — none is touched by M-8/M-9 and none depends on M2 or M8. **M2 and M8 wait for rev 11.** M4 waits on M2 as the plan already orders.
- **Rev 11 check**: a critic pass limited to the two clauses (and any Lows landed), not a full pass — pass 5 of this cycle, rung 1–5.
- **Stated limit M-10** travels to QA (enumerate the red-test domain by `grep -rc` at Phase 1) and the implementer (record red files in the reconciliation).
- **Assumption lines** (this pass's, pass 3's, pass 2's) to QA; this pass's also to the implementer at M8-G.
- Nothing to 012; nothing to the owner.

Recommended sequence after rev 11: the architect pass the plan names (the invariant now includes M8-G's clause), QA Phase 1, implementer at M1/M7 in parallel with the architect pass.

## Revision History

| Pass | Date | Artifact rev | Findings addressed | New findings | Status changes |
|---|---|---|---|---|---|
| 1 | 2026-08-24 | 3 | — | M-1–M-4, L-1–L-3 | Critique OPEN |
| 2 | 2026-08-24 | 6 (revs 4–6: D11 trim; D12, D13, D14) | M-1–M-4, L-1–L-3 → RESOLVED | M-5 (Medium), M-6 (stated limit), L-4, L-5 | Q1 closed; Q2 opened; R7: no member |
| 3 | 2026-08-24 | 8 (revs 7–8: D15, D16; M7; PREMISE-STALE gate on M2/M3) | M-5, M-6, L-4, L-5 → RESOLVED | M-7 (stated limit, stop authority), L-6, L-7 (entry conditions) | Q2 closed by D15; Q3 opened; R7/R8: no member; verdict APPROVE with stated limits |
| 4 | 2026-08-24 | 10 (revs 9–10: D17 → M8, D18 → M8-G; M7-c; gate on M2/M4; target moved from rev 9 to rev 10 under the pass, steering's error, cost one diff read) | M-7, L-6, L-7 → RESOLVED (verified) | M-8, M-9 (Medium), M-10 (stated limit, stop authority), L-8–L-15 | Q3 closed by D17; R1–R9: no member; verdict REQUEST REVISION scoped to M2; M1/M7/M3 may begin |
