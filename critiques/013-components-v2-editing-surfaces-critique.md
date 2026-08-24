---
ID: 013
Origin: 013
UUID: 22d69e06
Status: OPEN
Status-Detail: >-
  Cycle 1, pass 2 (rung 1–5). Verdict REQUEST REVISION on one Medium (M-5: a D12 price the plan
  says dissolved under D13 survives in the composer and is unnamed). Pass-1 findings M-1–M-4,
  L-1–L-3 RESOLVED at revs 4–6. Stop authority fired on one shape (rider drop mispriced, L-1 → M-6):
  closed by stated property, recorded as a stated limit, not cycled. One owner question (Q2)
  routed to steering — a question, not a gate.
---

# Critique — Plan 013, Components V2 support across the editing surfaces

**Artifact**: `agent-output/planning/013-components-v2-editing-surfaces.md`, rev 6 (agent-output `e551f8c`; `website` chain branch `chain/013-components-v2-editing-surfaces` at `c85945f`, verified not switched).
**Analysis**: none commissioned. Sources re-derived directly at each pass: research `8311155a` and `5c1e9d27` (probes included), handoffs `8f3fa8c3` and `cb83fd7b`, `architecture/system-architecture.md` ("Data flow"), plan 012's Decisions Register rows D3, D5, D10–D21 (read in 012, not in 013's restatement).
**Date**: 2026-08-24 (review began 2026-08-23).
**Status**: Revision 1 — cycle 1, pass 2.
**Roadmap**: absent (`agent-output/roadmap/` holds only `.gitkeep`); no Master Product Objective document exists to align against, so none is cited.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-23) | Critique rev 3 | Created. Pass 1: REQUEST REVISION. M-1–M-4, L-1–L-3. Q1 routed to the owner via steering. |
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-24) | Critique rev 6 | Pass 2: M-1–M-4, L-1–L-3 verified RESOLVED (revs 4–6; D12, D13, D14). New: M-5 (Medium, REQUEST REVISION), M-6 (stated limit by stop authority), L-4, L-5. Q1 answered (D12); Q2 routed to the owner via steering as a question. R7 reported against: no member. |

## Assumption Not Checked

This pass assumes the rider's refusal (M2-d) is placed on a boundary both JSON surfaces pass through — `discordMessageImportShape` is parsed by `JsonModalBody` (Load, `onConfirm`) and by `NewMessageJsonInput` at `c85945f` — and does not test whether the server's upsert input runs the same object: it does not (`optionalIdMessageShape` extends `messageShape`, whose `data` is `discordMessageShape`, a different Zod object from the import shape). Falsity signature: a payload the UI refuses under M2-d that a direct `message.upsert` call accepts — a 5712-shaped record minted through the API, not the editor. This is outside D5's clause ("reject at import") and outside the value statement (a guild owner editing in hooks.gg), so it is recorded here as the boundary the pass did not cross, not as a finding. Owner of closing it: QA's integration test at the tRPC boundary (Testing Strategy names `optionalIdMessageShape`/`upsertMessage`), which either asserts the API's behaviour on that shape or records it as out of the plan's class. Named again in the handoff.

Pass 1's assumption (research probes not re-run at `c85945f`) is still open and still QA Phase 1's; nothing in revs 4–6 touched it.

## Value Statement Assessment

Unchanged since rev 2, approved as written (D4). Every milestone still traces to one of its two outcomes. Under D12/D13 one shape the value statement's "misreports what kind of message it is" could describe — a V2-marked message shown in Classic mode — is now an owner-ruled behaviour with its reasons in the register; the value statement is not weakened by it, but the plan must name what the user sees (M-5). **Pass.**

## Overview

Rev 6 carries three owner rulings since pass 1 (D12, D13, D14), one steering correction (rev 4, D11 trim) and the planner's enactment of all four. The register is well-formed throughout: every row carries date, verbatim words with route, and a reopening class; D5 and D11 are marked re-specified/superseded *in part* with the surviving clause stated, which is the correct form for a partial supersession. D13's two planner readings (emptiness boundary = `hasClassicContent`; sub-case (ii) refused before the strip) are flagged where they are enacted and in Handoff Notes; steering reports the owner has confirmed (ii) directly, so it is weighed here as settled. No `PREMISE-STALE` marking; no open `OPEN QUESTION`.

**Pricing against the ask: sized to the ask.** Inventory 12 → 15 files: three are M-2's carriage (the code path's receiving end — `StoredMessage`, `getFromCode`, the provider's code effect), which is the remedy of a pass-1 finding, not growth; `NewMessageModal.tsx`'s M4-a extension is priced scope under D14. Large scope stands approved.

**Ladder**: cycle 1, pass 2, rung 1–5.

## Architectural Alignment

Unchanged: `Architectural-Surface: none added` remains accurate; the architecture "Data flow" correction stays with the architect under the dated constraint. Objective clause 3 is now stated as flag/classic-content exclusivity rather than "flags derive from structure", and the plan says why (D13) — the architect's invariant from the research is qualified at one named point. That is the honest form; the Handoff Note for the architect should carry the qualification when the invariant is written into `system-architecture.md` (it currently points the architect at "the invariant in Objective", which now includes the qualification — adequate).

Premises re-verified this pass at `c85945f`:

- `hasClassicContent` (`src/utils/index.ts`): non-blank `content`, or an embed with a meaningful non-`_key` field — matches the plan's reading (i) exactly; its unit tests (`mutual-exclusivity.test.ts`) pin `''`, whitespace and `[]` as absent.
- `enforceImportMutualExclusivity`: structural only; when `hasV2Components` is false it keeps `content`/`embeds` and keeps `flags` — so a D13 non-member (`{flags:32768, components:[ActionRow]}`) passes through with its marking, as M2-d and M3-a(ii) say.
- `validateContentRequirements` (`src/utils/limits.tsx`): `hasV2 = structuralV2 || flagV2; hasV2 && hasContent → "Components V2 messages cannot contain embeds or content."` — the floor already refuses D13's class on its own (M-6).
- `stripKeys` only ORs the bit in (`src/utils/index.ts`, the one `IS_COMPONENTS_V2_FLAG` write); `applyModeSwitch` (`src/utils/messageMode.ts`) is the only clearing site (012 D11).
- Backfill classifier unchanged: `flagStructureDisagreement = flagV2 && !structurallyV2` — R7's category still counts the D12 class.
- `shapes.ts` carries no `.default(`/`.transform(`/`.catch(` (count 0) — M1-d's "same function over the same form" is not threatened by server-side defaulting; key order is the only server/client difference and M1-d names it.
- `DatabaseMessage.createdAt` exists (`shared.ts`) — R-5's window is readable.
- `DiscordMessageEditor` renders `validateContentRequirements(message)` as `noContentError` (line 198/310) but nothing in the editor disables Save on it; only the send page gates on `validateMessage` (M-5).

## Scope Assessment

Sized to the ask (above). Rider: acceptance line, yield clause and priced drop disposition all present; the drop price is now wrong in one respect (M-6, stated limit). Scope constraints: both still carry date, reason and expiry; neither's premise has lapsed.

## Technical Debt Risks

- The rider's distinguishable domain after M4-c is one sub-case (V2 components + classic content + bit, refused before the strip). On the 5712 shape the rider and the floor refuse the same object with near-identical messages. That is not debt if the plan says which instrument owns which member (M-6); it is debt if two tests assert two messages for one refusal.
- A tolerated marking (D12/D13) sits in Classic mode with no UI that shows it and one that refuses content under it (M-5). 012's observation-4 class is therefore made *reachable from import*, where before 013 it was reachable only from hand-typed JSON. The plan's Out of Scope entry for observation 4 is still correct; its premise ("after M2 the JSON route is lossless") now carries more weight.

## Findings

Pass-1 findings, dispositions (history in the committed revisions):

- **M-1** — RESOLVED at revs 5–6. Owner ruled Q1 (D12); D13 then removed the JSON-side refusal, so the cross-writer inconsistency M-1 named no longer exists: `{flags:32768, components:[ActionRow]}` is accepted on ingress (M3-a ii) and on both JSON surfaces (M2-d non-member), stored `valid=true`, counted by 012's classifier — R7 registers the falsifier. Verified against `enforceImportMutualExclusivity` and `validateContentRequirements` above.
- **M-2** — RESOLVED at rev 5. Receiving end named per entry point; `StoredMessage`, `getFromCode`, the provider code effect added to the inventory; `[code].ts` named as a reader left unchanged; both residues bounded (pre-deploy codes ≤1 h TTL; additive field on the raw API).
- **M-3** — RESOLVED at rev 5. M1-d carries its human-observable form and Validation item 6 carries the two-tab row.
- **M-4** — RESOLVED at rev 4 (steering trimmed D11 in place with a dated note stating what was removed) and rev 5 (M4-a states the create writer's mechanism at `c85945f`; D14 approves the extension).
- **L-1** — RESOLVED at rev 5 as asked (a price was written); its price is superseded by M4-c — see M-6.
- **L-2** — RESOLVED at rev 5 (M3-c: the `message.upsert` call site is the instrument).
- **L-3** — RESOLVED at rev 5 (R-5 basis stated as criterion-established; window = `createdAt` after go-live; `createdAt` verified).

### Medium

**M-5 — The D12 price the plan says "does not arise" under D13 survives in the composer, and the plan does not name it** — Status: OPEN.
*Description.* M2-d, M3-a and D12's reach note all state that D12's priced asymmetry "does not arise" under D13. The JSON-refusal half of that price did dissolve. What remains: a record carrying the V2 bit over Action Rows only (D12's import, or a D13-accepted hand marking) opens in **Classic** mode with nothing on screen showing the marking (research System Weakness 7: no surface renders `flags`). The user types content — the ordinary Classic action — and `DiscordMessageEditor` shows *"Components V2 messages cannot contain embeds or content."* in a mode that has no Components V2 in it. Save is not gated on that error (only the send page is), so the save writes `{flags:32768, content, components:[ActionRow]}` — `valid=false`, the 5712 shape 012 D5 called a composer bug — and the send page then refuses it. The only exits are the toggle round-trip (V2 clears the content, back to Classic clears the bit — 012 D11) or deleting the `flags` line in JSON. Magnitude: bounded to the class *records at rest with the bit over non-V2 structure* — D12 imports plus D13-accepted markings; every member is one content edit from `valid=false`; rate not derivable (D8), so stated as a class with a falsifier, not a rate.
*Impact.* R-5 tells the owner what he holds when ruling on D20; it names the classifier category growing but not that the same records re-mint the 5712 shape through the composer's own Save. M3-a(ii)'s human-observable form ends at "sending it to Discord succeeds" — true for the record as imported, and silent on the next edit. UAT will execute the form, pass it, and the residue will surface as a support question.
*Recommendation.* Name it, no machinery: one sentence at M3-a(ii) and at M2-d's non-member clause stating the marking's composer-side cost and its two exits; a clause in R-5's one-liner; a third falsifier on R7 (*a D12/D13-marked record saved from Classic mode with content → `valid=false`*) so the class is a standing prediction; and the Out of Scope entry for observation 4 says the marking is now reachable from import. This is not D12 or D13 re-raised — both are terminal and neither's reopening class has a member; it is the plan's own consequence claim being corrected. Whether the owner wants more than naming is Q2.

**M-6 — The floor at the modal (M4-c) overlaps the rider on the 5712 shape; the rider's drop price is wrong and one refusal has two instruments** — Status: STATED LIMIT (stop authority; second instance of the *drop disposition mispriced* shape after L-1).
*Description.* M4-c requires "both JSON importers" to report valid only where the accepted object passes `validateContentRequirements` — research flow 14 defines "either JSON importer" as the modal's Load and the new-message input, so M4-c puts the floor on the modal. The floor already refuses `flagV2 && hasContent` with *"Components V2 messages cannot contain embeds or content."* So once M4-c lands: (a) M2-a's exception — an unchanged Load of 5712/5842 refused "by M2-d" — is refused by the floor whether or not the rider exists; (b) the drop disposition's post-drop value — *"re-stores the same record unrefused, lossless, still stranded"* — is false: the floor refuses it, and the three-step repair is unchanged; (c) the rider's distinguishable reach is reading (ii) only — V2 components + classic content + bit — where the strip would otherwise remove the content before the floor sees it. (The floor's `embeds.length > 0` is wider than `hasClassicContent`'s meaningful-field test, so `{flags:32768, embeds:[{}]}` is a rider non-member the floor refuses — same outcome, different instrument.)
*Closure by property.* Over the domain *every plan text whose expected value is a refusal of a bit-over-classic-content object* — enumerated: M2-a's exception, M2-d's instrument sentence, M2-d's post-drop values, the Handoff Note for 012's planner, M4-c — the user-visible outcome is one and the same with or without the rider: **refused before write, the conflict named, the record unchanged; deleting the `flags` line and pressing Load repairs it.** Verified: each of the five texts states that outcome except the post-drop clause, which states "unrefused". Residue the system cannot distinguish: which of two near-identical messages is shown (rider's vs floor's) — bounded to wording.
*Transfer.* QA reads the expected value from the property, not from the instrument name, and writes one expectation per member; the implementer orders the rider before the floor (as M2-d already requires for (ii)) so the rider's message is the one shown on members of both. The post-drop clause is corrected by the planner at next touch of M2-d — the M-5 round is one — and is not itself a reason for a round.

### Low

**L-4 — M2-d's "accepted" overstates what a bare-bit or `components: []` member gets** — Status: OPEN.
M2-d says a bit over `components: []` or over no components "is accepted as the user's marking". It is not refused *by the rider*; M3-c/M4-c's floor then refuses it as *"Message must have content, embeds, or components."* One clause: "not a conflict; the floor's emptiness check still applies". Otherwise QA writes a Load-succeeds expectation for an object the plan elsewhere refuses.

**L-5 — The one silent discard the plan leaves in place is not named as a residue against the value statement** — Status: OPEN.
M2-b keeps the existing strip: V2 components + classic content + **no** bit → content and embeds removed. On the modal, M2-c's confirmation names type changes, which implies the loss; on the new-message paste there is no confirmation and the composer simply shows V2 without the content. That is standing behaviour (research P4; owner's conflict definition at D13 excludes it) and the plan is right not to change it — but the value statement's "no editing action silently discards what I built" is exactly what it describes. One line in Out of Scope naming it as an accepted residue with its reason (D13's class excludes the bit-clear case; the strip is plan 001's design).

## Questions

**Q1** — answered: D12 (b), then re-specified by D13. Closed.

**Q2 — for the owner, via steering-hooks-013 (a question, not a gate; M-5 is answered by naming regardless).** A D12 import or a D13-accepted marking sits in Classic mode invisibly; typing content there produces a Components V2 error and, if saved, a `valid=false` record. Is naming this in the plan enough, or does he want the marking visible or clearable from Classic mode — which is observation 4's control, currently Out of Scope and scope growth if taken? The critique proposes nothing either way.

## Risk Assessment

R1–R6 prediction records are current through rev 5/6 and no member is reported this pass. **R7 (standing prediction from M-1)**: reported against — no member (nothing deployed); M-5 asks for a third falsifier. "How will this plan result in a hotfix?" — the remaining candidate is M-5: a user lands in Classic with a marking they cannot see, gets a V2 error, saves anyway, and cannot send. It is a plan-text gap (unnamed residue) over owner-ruled behaviour, not a data-loss path; the exits exist today.

## Recommendations

**REQUEST REVISION** — one Medium (M-5, a naming edit at four places), plus L-4, L-5 and M-6's post-drop clause as one-line rides. Pass 3 is expected to buy: R-5's basis and M3-a(ii)'s observable form telling the owner and UAT the full price of the marking he chose — nothing new in scope. Q2 goes to the owner in parallel; its answer does not block pass 3 unless he chooses the control.

## Revision History

| Pass | Date | Artifact rev | Findings addressed | New findings | Status changes |
|---|---|---|---|---|---|
| 1 | 2026-08-24 | 3 | — | M-1–M-4, L-1–L-3 | Critique OPEN |
| 2 | 2026-08-24 | 6 (revs 4–6: D11 trim; D12, D13, D14 enacted) | M-1–M-4, L-1–L-3 → RESOLVED | M-5 (Medium), M-6 (stated limit, stop authority), L-4, L-5 | Q1 closed; Q2 opened; R7 reported: no member |
