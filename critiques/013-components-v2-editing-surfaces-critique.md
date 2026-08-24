---
ID: 013
Origin: 013
UUID: 22d69e06
Status: OPEN
Status-Detail: >-
  Cycle 1, pass 3 (rung 1–5). Verdict APPROVE with stated limits. Pass-2 findings M-5, M-6, L-4,
  L-5 RESOLVED at rev 7 (M-5 dissolved under D15, verified in code). Stop authority fired a second
  time (criterion-domain member outside milestone ownership, M-2 → M-7): closed by property,
  recorded as a stated limit with its transfer. Two Lows (L-6, L-7) travel as entry conditions.
  One owner question (Q3, reading (iii)) routed to steering — a question, not a gate.
---

# Critique — Plan 013, Components V2 support across the editing surfaces

**Artifact**: `agent-output/planning/013-components-v2-editing-surfaces.md`, rev 8 (agent-output `28c72bd`; `website` chain branch `chain/013-components-v2-editing-surfaces` at `c85945f`, verified not switched).
**Analysis**: none commissioned. Sources re-derived directly at each pass: research `8311155a` and `5c1e9d27` (probes included), handoffs `8f3fa8c3` and `cb83fd7b`, `architecture/system-architecture.md` ("Data flow"), plan 012's Decisions Register rows D3, D5, D10–D21 (read in 012).
**Date**: 2026-08-24 (review began 2026-08-23).
**Status**: Revision 2 — cycle 1, pass 3.
**Roadmap**: absent (`agent-output/roadmap/` holds only `.gitkeep`); no Master Product Objective document exists to align against, so none is cited.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-23) | Critique rev 3 | Created. Pass 1: REQUEST REVISION. M-1–M-4, L-1–L-3. Q1 routed to the owner via steering. |
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-24) | Critique rev 6 | Pass 2: M-1–M-4, L-1–L-3 RESOLVED. New: M-5 (REQUEST REVISION), M-6 (stated limit), L-4, L-5. Q1 answered (D12); Q2 routed. |
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-24) | Critique rev 8 | Pass 3: M-5, M-6, L-4, L-5 RESOLVED (revs 7–8; D15, D16). New: M-7 (stated limit, stop authority), L-6, L-7. Q2 answered by D15 (premise rejected); Q3 routed. R7/R8 reported against: no member. Verdict APPROVE with stated limits. |

## Assumption Not Checked

This pass assumes the composer's V2 mode exposes no route to `content`/`embeds` other than the two editors gated on `isClassicMode` (`DiscordMessageEditor`: the content editor at the `NullableComponent show={isClassicMode || !isEditing}` site and the embeds list at its `isClassicMode` site) — M-5's dissolution rests on it — and does not test the JSON modal's Load in V2 mode or any other field as a route. Falsity signature: a V2-mode draft acquiring non-blank `content` or a meaningful embed without a mode switch, saved `valid=false` with the V2 error showing. Owner of closing it: QA's M7-a checklist (the human-observable form on a flag-set record) together with M2-d's suite (Load of content under the bit is refused). Named again in the handoff.

Still live from pass 2, not closed by steering's docket entry: the server's upsert input runs `discordMessageShape`, not the import shape the rider sits on; a direct `message.upsert` call can mint the D13 shape. Outside D5's clause; QA's tRPC-boundary test owns it.

## Value Statement Assessment

Unchanged, approved as written (D4). Under D15 the second outcome ("misreports what kind of message it is") is now delivered *more* directly than at rev 6: a flag-set record is shown as what the product says it is. The one silent discard left (Out of Scope, L-5's line) is named against the statement with its reason. **Pass.**

## Overview

Rev 7 is the pass in which the owner withdrew the plan's founding premise (D15: the flag is the mode), and the planner applied the re-derivation gate as planner.md 8b intends — M2 and M3 marked `PREMISE-STALE`, each cleared by a paragraph at its head that says what survives and what changes; M1 and M4 examined and found not built on the withdrawn premise. I checked the clearances against the criteria: M2's properties are over `data`; M3-a/b/c do not depend on what the composer does with the flag; M1 is over the serialised form and the hash; M4-a is one-directional on structure; M4-c's floor already reads the flag. All four hold. Objective clause 3 states the withdrawn premise explicitly so no reader inherits it, and the architect's handoff points at the rev-7 invariant, not the research's. Rev 8 registers D16 and writes M7-b. No `PREMISE-STALE` marking is in force; no open `OPEN QUESTION`.

**Pricing against the ask: sized to the ask.** M7 (two criteria, one file added under D16; inventory 15 → 16) is the enactment of an owner ruling that changed what a criterion requires, not growth: it is the size of D15. The two items steering asked me to weigh as dispositions rather than rulings, checked: (1) *"it's V2" = flag OR V2 components* is the join of D15's sufficient condition with D11's surviving holding (V2 components with the bit clear load as V2 — an owner ruling), and it is the predicate `validateContentRequirements` already implements; it derives from two rulings and does no ruling's work. (2) *M7's addition* enacts D15 and was reported with an invitation to require otherwise; recording it as authorised-without-standing-clearance is the correct form. Neither is a finding.

**Ladder**: cycle 1, pass 3, rung 1–5. Stop authority fired once this pass (M-7).

## Architectural Alignment

`Architectural-Surface: none added` remains accurate; M7 changes a predicate in an existing hook, not a layer. The invariant the architect will record has changed shape since the research (D15); the plan says so at Objective clause 3 and in the architect's handoff — correct. Premises re-verified at `c85945f`:

- `detectMode` (`MessageProvider/index.tsx`) reads `hasV2Components` alone and returns without setting a mode when `components` is absent — research G4 and M7-a's "no `components` key" clause both hold.
- `switchToClassic` clears the bit and keeps `content`/`embeds` (spread); `switchToV2` clears `content`/`embeds` and leaves `flags` untouched — D16/M7-b's premise holds; I-D11's repair path for 5712 (open in V2 → toggle to Classic → content intact) holds.
- V2 mode hides the content editor and the embeds list (`isClassicMode` gates at both sites); the composer's toggle is the only mode writer in that file. **M-5's dissolution is real**: with the marking shown as the mode, the content-under-a-latent-flag path does not exist.
- `setMessageMode(` writers, `grep -rc`: `JsonModalBody.tsx` 1, `MessageProvider/index.tsx` 1, `DiscordMessageEditor/index.tsx` 1 — three, which is M7-a's enumeration (M-7).
- `enforceImportMutualExclusivity` returns `detectedMode` from structure alone, and `JsonModalBody`'s Load writes that value to `setMessageMode` (M-7).
- `send/page.tsx` `messageHasV2` reads structure alone (L-6).

## Scope Assessment

Sized to the ask (above). Rider: acceptance line, yield clause, priced drop — the drop price now correct (M-6 resolved). Scope constraints: unchanged, premises intact. R8 is a well-formed new risk row with a magnitude (two measured rows plus unmeasured) and the exit named.

## Technical Debt Risks

- Two predicates for V2-ness now exist in the tree: `validateContentRequirements`'s `hasStructuralV2 || hasFlagV2` (the product's, per D15) and the structural one in `hasV2Components`/`enforceImportMutualExclusivity`/`stripKeys`/`send/page.tsx`. The plan aligns the mode writers (M7-a) and leaves the structural readers where structure is the right question (`stripKeys` sets the bit from structure — correct). The reconciler's `detectedMode` and the send page's warning are the two readers whose question is mode, not structure (M-7, L-6).

## Findings

Pass-1 findings: M-1–M-4, L-1–L-3 RESOLVED (revs 4–6; see pass-2 revision). Pass-2 dispositions:

- **M-5** — RESOLVED at rev 7, by dissolution not restatement: verified above. R7's proposed third limb correctly not added (unreachable). Q2's premise was rejected by the owner (D15); the answer is in the register.
- **M-6** — RESOLVED at rev 7: the post-drop clause now states the floor refuses the flag-stranded Load; QA reads the outcome, not the instrument.
- **L-4** — RESOLVED at rev 7: per-member statement (Action Rows → V2 mode; `[]`/none → the floor's message).
- **L-5** — RESOLVED at rev 7: named in Out of Scope as an accepted residue with D13's reason; reading (iii) flagged there → Q3.

### Medium

**M-7 — M7-a's enumerated class contains a mode writer no milestone owns: the JSON modal's Load** — Status: STATED LIMIT (stop authority; second instance of the *criterion-domain member outside inventory/ownership* shape after pass-1 M-2).
*Description.* M7-a's class is "every call site of `detectMode` plus every other writer of `setMessageMode`". The third writer is `JsonModalBody`'s `onConfirm`, which sets the mode to `enforceImportMutualExclusivity`'s `detectedMode` — structure only. Under M7-a, Load of `{flags:32768, components:[ActionRow]}` must land in V2 mode (M2's clearance paragraph says exactly this: "an accepted bit over Action Rows loads in **V2 mode** … (M7)"); at `c85945f` it lands in Classic. M7's Files line names `MessageProvider/index.tsx` and `messageMode.ts` only; Serialised Shared Files assigns `JsonModalBody.tsx` and `src/utils/index.ts` to M1 then M2, and gives M7 no hold on either. M7 "can run first"; M2's hold on those files begins after M1. So the member is in the criterion's domain and in nobody's milestone.
*Closure by property.* Over the domain *every acceptance criterion whose class is enumerated by symbol reference or by carriage* — M1-a (`standardizeMessage` references), M3-b (the code path's carriage), M7-a (`detectMode` sites and `setMessageMode` writers) — every member of the enumeration is assigned to a milestone in Serialised Shared Files. Verified: M1-a's three members (M1), M3-b's four (M3), M7-a's provider (M7) and toggle (M7-b via `messageMode.ts`; the editor file needs no edit) — all assigned; the modal's writer is the one gap. Residue the system cannot distinguish: none — the enumeration is the tree's own reference list.
*Transfer.* The implementer assigns the modal's mode write (whether by changing the reconciler's `detectedMode` to the D15 predicate or at the call site is theirs) under M7 or M2, records the delta in the implementation doc, and M6's reconciliation explains it; QA's M7-a suite over the Load member is the detector — a Load of the illustrative non-member landing in Classic is the failure. One ordering fact the implementer inherits: if the reconciler's `isV2` is widened to read the flag, its V2 branch deletes `content`/`embeds` — the rider's refusal must run before it, which M2-d already requires for reading (ii). The planner corrects the Files line and the shared-file row at next touch; it is not a reason for a round.

### Low

**L-6 — `send/page.tsx` reads V2-ness from structure alone, outside M7-a's class** — Status: OPEN (entry condition).
`messageHasV2 = hasV2Components(components)` drives the "V2 patch warning" when editing an already-sent message. Under D15 a flag-only V2 message (D12 import, 5712-class after repair, a D16 toggle over Action Rows) gets no warning. It is not a `setMessageMode` writer, so M7-a's enumeration does not reach it. One line: either include the site in M7-a's class or name it as a residue with the owner's reason. Entry condition for the implementer: the plan says which.

**L-7 — Tests over `switchToV2`/`applyModeSwitch` are not in the coordination list M7-b will make red** — Status: OPEN (entry condition).
`grep -rc`: `012-message-mode.test.ts` 7, `012-send-gate-partition.test.ts` 3, `012-json-editor-repair-path.test.ts` 3 reference `switchToV2`/`applyModeSwitch`, with `flags` assertions in reach of the `switchToV2(` calls. The plan's "existing tests that cite the retired seam" list names two files and predates M7. Add the two missing names to the coordination fact (QA re-anchors; the implementer does not edit them) so M7-b's red is expected, not discovered.

## Questions

**Q1** — answered (D12, then D13). **Q2** — answered (D15 rejected the premise). Both closed.

**Q3 — for the owner, via steering-hooks-013 (a question, not a gate; the plan is approvable either way).** Reading (iii), the planner's alone and never put: D15's second sentence — *"If it's V2 and there are conflicts in the body, there's an error message"* — is read with "conflicts" as D13's own term (*the flag is set and there is content or embeds*), so a pasted object with **V2 components, classic content and no bit** is not a conflict and keeps today's silent strip on import (Out of Scope, L-5's line); the composer, by contrast, already shows the V2 error for that same object. Does "conflicts in the body" mean D13's flag-set class only (reading (iii) stands; the register records it; no text changes), or any V2 message — flag or components — carrying content (the rider's class widens by one clause at M2-d/M2-b, the Out of Scope line is withdrawn, and the silent strip becomes a refusal naming the conflict)? Cost in his terms: the first keeps one silent discard on the new-message paste; the second makes a user who pastes V2 JSON with leftover content delete it by hand before Load. The critique proposes neither.

## Risk Assessment

R1–R6: no member. **R7**: reported against — no member; the second limb is correctly a defect again under D15. **R8** (new, rev 7): reported against — no member (nothing deployed); magnitude stated (two measured rows plus unmeasured); exit named. "How will this plan result in a hotfix?" — the candidates left are M-7 (a Load landing in Classic that M7-a says is V2 — caught by QA's suite if the member is assigned) and L-6 (a missing warning, not a data path). Neither is a data-loss route.

## Recommendations

**APPROVE with stated limits.** The plan is implementation-ready: every owner question is ruled and registered, the withdrawn premise is stated and the gate applied, criteria are properties over enumerated classes with instruments, the rider is structured and priced. What travels onward:

- **Entry conditions** (checked by the next reader, not agreed with): M-7's member assigned by the implementer with the delta recorded (detector: QA's M7-a suite over the modal Load); L-6 stated one way or the other; L-7's two test files added to the coordination fact. The planner may land all three at next touch; none requires a pass 4.
- **Q3** to the owner in parallel. If reading (iii) stands, steering registers it (changes no criterion). If it widens, one planner clause at M2-d/M2-b and a critic check limited to that clause — not a full pass.
- Assumption lines (this pass's and pass 2's) to QA.

Handoff: implementer may begin at M1 (no dependency on Q3; M2-d follows M1). Recommended next: the architect pass the plan names, then QA Phase 1, then the implementer.

## Revision History

| Pass | Date | Artifact rev | Findings addressed | New findings | Status changes |
|---|---|---|---|---|---|
| 1 | 2026-08-24 | 3 | — | M-1–M-4, L-1–L-3 | Critique OPEN |
| 2 | 2026-08-24 | 6 (revs 4–6: D11 trim; D12, D13, D14) | M-1–M-4, L-1–L-3 → RESOLVED | M-5 (Medium), M-6 (stated limit), L-4, L-5 | Q1 closed; Q2 opened; R7: no member |
| 3 | 2026-08-24 | 8 (revs 7–8: D15, D16; M7; PREMISE-STALE gate on M2/M3) | M-5, M-6, L-4, L-5 → RESOLVED | M-7 (stated limit, stop authority), L-6, L-7 (entry conditions) | Q2 closed by D15; Q3 opened; R7/R8: no member; verdict APPROVE with stated limits |
