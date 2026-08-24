---
ID: 013
Origin: 013
UUID: 22d69e06
Status: OPEN
Status-Detail: >-
  Cycle 1, pass 1 (rung 1–5). Verdict REQUEST REVISION. Four Medium, three Low. One owner
  decision (Q1) routed to steering-hooks-013 for the owner; it settles M-1's remedy and is not the
  planner's to choose.
---

# Critique — Plan 013, Components V2 support across the editing surfaces

**Artifact**: `agent-output/planning/013-components-v2-editing-surfaces.md`, rev 3 (agent-output `8d4a3a5`; `website` chain branch at `c85945f`).
**Analysis**: none commissioned. Sources re-derived directly: research `8311155a` and `5c1e9d27` (both read in full, probes included), handoffs `8f3fa8c3` and `cb83fd7b`, `architecture/system-architecture.md` ("Data flow" line), plan 012's Decisions Register rows D3, D5, D10–D21 (read in 012, not in 013's restatement).
**Date**: 2026-08-24 (review began 2026-08-23).
**Status**: Initial — cycle 1, pass 1.
**Roadmap**: absent (`agent-output/roadmap/` holds only `.gitkeep`, read 2026-08-23); no Master Product Objective document exists to align against, so none is cited.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-24 | steering-hooks-013 brief (cross-session, 2026-08-23) | Critique rev 3 | Created. Pass 1: REQUEST REVISION. M-1–M-4, L-1–L-3. Q1 routed to the owner via steering. |

## Assumption Not Checked

This pass assumes research `8311155a`'s 15-assertion probe and `5c1e9d27`'s 5-assertion probe still pass at `c85945f` and does not re-run either. Falsity signature: any probe assertion failing on re-run at the chain base — which would mean the plan's "defect carried verbatim" describes a tree that is not the one under the chain. Owner of closing it: QA Phase 1, which the plan schedules before implementation and which demonstrates red at the chain base. Named again in the handoff.

## Value Statement Assessment

Present, in the required form, and owner-approved unamended (D4). The "so that" names two user-observable outcomes — no silent discard, never landing on an empty copy — and every milestone traces to one of them (M1/M2 → the first and second; M3/M4 → the first). The value is delivered in this plan, not deferred: the six sites the research enumerates are all in M1–M4, and the one thing left out (repair of existing rows) is data work the plan correctly routes rather than absorbs. **Pass.**

## Overview

The plan converts one research determination — a lossy display projection sitting on write, seed and change-detection boundaries — into an invariant (Objective) and four milestones, each stated as properties over enumerated classes. The register is complete, every open question is dispositioned, both standing constraints carry date/reason/expiry, and the rider carries all three structural clauses. No `PREMISE-STALE` marking is in force; nothing is out of scope for this pass on that ground.

Pricing against the ask: **sized to the ask.** The ask is handoff `8f3fa8c3`'s seven observations (research: six sites) plus the rider's one clause (D2, bounded by `5c1e9d27` F4). M1–M3 are the six sites; M2-d is the rider's clause; M4-a/M4-b are the research's sixth site (the create-path filter mismatch, flow 10), not rider growth; M4-c is flow 14. **Large scope (12 files, above the <10 preference): approved** — the justification holds on the file inventory: every split re-opens `src/utils/index.ts` and `JsonModalBody.tsx`.

Rev 3 (steering's registration pass) was reviewed as any other text. D10 is sound in form: dated, routed, reopening class stated, title carries the operative clauses, and its effect is registration-only. D11 has a form defect (M-4).

## Architectural Alignment

`system-architecture.md` "Data flow" describes one loop — `makeEditable()` in, key-stripping out — and is silent on the second serialiser; the plan adopts the research's invariant and hands the correction to the architect under a dated, expiring constraint. That is the right disposition and the plan does not fix it in passing. `Architectural-Surface: none added` is accurate: the plan consolidates onto an existing seam (`stripKeys`) and adds no layer or contract. The plan's premises about existing code were verified at the receiving end (see Findings for the two that did not hold):

- `hashMessage` producer/consumer — verified: `src/server/api/utils/shared.ts` `upsertMessage` triggers `message-update` with `hashMessage(message)` (the upsert input, not the DB row); `src/providers/MessageProvider/usePusher.ts` binds `message-update` and compares against `hashMessage(stripKeys(messageRef.current))`. Both sides hash a `stripKeys` output, so M1-d's "same function over the same form" holds by construction once `standardizeMessage` leaves `hashMessage`.
- `standardizeMessage` reference count — `grep -rc` (computed inside grep): `SaveAsMenu.tsx` 2, `JsonModalBody.tsx` 2, `src/utils/index.ts` 2 (definition + `hashMessage`), `012-json-editor-repair-path.test.ts` 3. Matches R1's rev-1 record.
- Ingress — verified: all three entry points call `discordResponseToMessage` (`routers/message.ts` `getFromUrl`, `hooks/useValidateWebhook.ts`, `redis/messageStore.ts` `store`); the converter's parameter type is `Pick<Message, 'author'|'content'|'embeds'>` and `store`'s `Pick` omits `components`/`flags`, as the plan says. Assumption 4 verified (`getFromUrl` issues `GET /channels/{c}/messages/{m}`).
- `SUPPORTED_TOP_LEVEL_TYPES` = `{1, 9, 10, 11, 12, 13, 14, 17}` vs the union's `1|9|10|12|13|14|17` — M4-b's instance confirmed.
- 012's backfill classifier (`src/scripts/backfillValid.ts`): `flagStructureDisagreement = flagV2 && !structurallyV2` — one-directional, the same direction as M2-d and D11.

## Scope Assessment

Sized to the ask (above). Rider structure: M2-d carries an acceptance-criterion line, the yield clause and a pre-declared drop disposition; it cannot block its host. One pricing gap in the drop disposition is L-1. Scope constraints: both carry date, reason and expiry; neither's premise has lapsed.

## Technical Debt Risks

- The plan leaves `NewMessageModal.onSubmit` writing `makeEditable(...).data` straight to `message.upsert` (no `stripKeys`), so the create path remains the one writer that does not derive the V2 bit from structure. Today that produces valid, sendable records (the bit is set at send), so it is not a defect — but it is the mechanism behind M-4 and the create-side member of M-1's class, and the plan should say which it intends.
- `StoredMessage` (redis) has two readers — `getFromCode` and `src/pages/api/messages/codes/[code].ts` — and the plan's inventory opens neither. Any change to what `store` persists reaches both (M-2).

## Findings

### Medium

**M-1 — M3-a carries the V2 bit as an input, against Objective clause 3, and M2-d's rejected class does not travel to that writer** — Status: OPEN.
*Description.* The Objective's third clause: *"the V2 flag is an output of the components' structure, never an independent input."* M3-a instead requires the import to carry *"the V2 flag when Discord's message carried it."* These disagree over the class *Discord V2 messages whose top-level components are all Action Rows* — a shape Discord accepts under `IS_COMPONENTS_V2` (V2 messages carry no `content`, so the flag-plus-content shape is unreachable from Discord: disposition-order step 1 removes it; the action-row-only shape survives). Post-M3, such a message imports as `{flags: 32768, components: [ActionRow…]}`: `hasV2Components` false, `detectMode` → Classic, `validateContentRequirements` passes (no content, has components) so `valid=true`, and 012's classifier counts it as `flagStructureDisagreement` **and** `flagStructureDisagreementValidTrue` — a category that read **0** at 012's run (`backfill-report-1787522866564-i3s31k.md`). The same object pasted into either JSON surface is the rider research's second mint case and is **refused** by M2-d. So after 013 one writer refuses what another carries, and the plan's own invariant is not discharged against the ingress milestone. The plan's "degraded-input" residue in M3-b is named for dropped *components*; the flag's derivation at the same writer is not discharged anywhere.
*Impact.* R-5 tells the owner he rules on D20 "on a stated basis"; that basis omits a writer 013 itself changes that can grow the disagreement category he reviews. Magnitude: bounded by the class above; its production rate is not derivable from the tree (no attribution — D8), so it is stated as a class with a falsifier, not as a rate.
*Recommendation.* Owner decision first (Q1 below) — whether an action-row-only Discord V2 message is V2 or Classic in hooks.gg's model is product direction, not a planner call. Then the planner states M3's flag property consistently with the ruling: either the bit derives from post-filter structure on ingress (M3-a rewritten; the carried-bit class becomes a named loss the M3-b notice can state), or the carried bit is a named bounded residue in **both** M3-a and M2-d (JSON refuses it, ingress carries it, stated as such). Either way, register the class as a standing Risk row with this falsifier: *`flagStructureDisagreementValidTrue` > 0 on any post-013 classifier run, or any URL/webhook/code import landing in Classic mode with the V2 bit set.*

**M-2 — M3-b's receiving end does not exist on the third entry point, and the carriage to it is not in the inventory** — Status: OPEN.
*Description.* M3-b requires the not-carried types be shown *"in the same dialog that shows the import, on all three entry points."* Entry points 1 and 2 (`getFromUrl`, `useValidateWebhook`) surface in `NewMessageModal` — a dialog. Entry point 3 has no dialog: the bot's `get_message` converts at store time (`messageStore.store` → `discordResponseToMessage` → redis `StoredMessage{data}`), and the website consumes it via `getFromCode` → the `MessageProvider` code effect → `makeEditable(storedToActive(codeMessage))` → `detectMode`, straight into the editor; errors go to `toast.error`. For the dropped set to reach a user on that path it must travel through `StoredMessage` (`src/@types/global.d.ts`), `getFromCode` (`routers/message.ts` — the inventory names only `getFromUrl` there), the provider's code effect (`MessageProvider/index.tsx`, not in the inventory), and some UI element the plan does not name. `StoredMessage` also has a second reader, `src/pages/api/messages/codes/[code].ts`, which returns it raw. Two residues are unnamed: codes stored pre-deploy (≤1 h TTL) carry no dropped set, so the notice cannot render for them; and the raw-code API's consumers see whatever `store` newly persists.
*Impact.* As written the criterion cannot be met literally on one of the three entry points it names, and the implementer will discover the carriage mid-milestone. Criterion-vs-file-inventory reconciliation (M6's acceptance) will then show unexplained deltas.
*Recommendation.* State M3-b's human-observable form per entry point (the code path's is the editor, not a dialog), add the carriage sites to the inventory (`StoredMessage`, `getFromCode`, the provider's code effect, `[code].ts` as a reader to leave unchanged or not), and name the two residues as bounded. No design — which element renders the notice is the implementer's.

**M-3 — M1-d has no human-observable form and no post-deploy-observable row** — Status: OPEN.
*Description.* Steering's pointer asked whether M1-d actually covers cross-tab blindness. At the function level it does, and the code confirms the premise: producer and consumer both call `hashMessage` and both hash a `stripKeys` form, so retiring `standardizeMessage` from `hashMessage` closes P8's blindness on both sides at once; the key-order clause is stated. What falls between criteria is the *observation*: every other M1 criterion carries a human-observable form, and Validation item 6's post-deploy observables list Save As, JSON view and Load — not the "Message Update Detected" prompt, which is the one behaviour a person watches here (two tabs, a component-only edit in one, the prompt in the other). M1-d is the criterion D5's carried consequence rests on; without a human-observable form it has no UAT row and no post-deploy row.
*Impact.* A person-watchable criterion with no named observation is verified only by suite; the plan's own rule (Surfaces Without Automated Coverage; planner.md "Human-observable form") is not met for the one criterion the owner was told stands on its own.
*Recommendation.* Add the human-observable form (the prompt firing on a component-only change from another tab, and not firing on a no-op save) and the matching post-deploy row.

**M-4 — D11's title carries an agent-authored mechanism claim that is false at one of the two surfaces M2-d names** — Status: OPEN. Addressed to steering-hooks-013 (rev 3 author).
*Description.* D11's decision column ends *"— the bit derives from structure and `stripKeys` sets it on save."* On the edit page that holds (`useApiMethods.saveMessage` → `stripKeys`). On the new-message paste — the second surface M2-d explicitly covers — `NewMessageModal.onSubmit` forwards `makeEditable({data}).data` to `message.upsert` with no `stripKeys`; the bit is set only at send (`send/page.tsx` → `stripKeys`) or at the next composer save. So a V2 paste created through that surface is stored with V2 structure and no bit. That is *not* a disagreement under 012's one-directional classifier and is `valid=true`, so it is not a defect; but the register row states a mechanism as part of the ruling that is wrong for half the ruling's domain, and the register is terminal and consumed at the title.
*Impact.* Every downstream reader takes the title as the owner's operative clause. The ruling's operative content is the first sentence (one-directional class, V2-with-bit-clear accepted); the mechanism is planner rationale that belongs in the body — and there it needs the correct statement.
*Recommendation.* Steering trims D11's title to the operative clauses (the trim states what the removed text carried, per document-lifecycle); the planner states in M2-b/M4-a where the bit is derived on the create path, or names the bit-clear-at-rest interval as an accepted residue.

### Low

**L-1 — The rider's drop disposition is not fully priced** — Status: OPEN.
M2-a's bounded exception (*"an unchanged Load is refused by M2-d, naming the conflict"*) and Handoff Note item (1) for 012's D13 guidance both cite M2-d's behaviour as their expected value. If the rider drops per its disposition, an unchanged Load of a flag-stranded record after M1-c re-stores the same record unrefused (harmless, lossless, no repair), and both texts need rewriting — a planner round the disposition says a drop never costs. State that price now: the post-drop expected value for M2-a's exception and the guidance note, in one line each.

**L-2 — M3-c's negative names no suite instrument** — Status: OPEN.
M2-d names its instrument for "the record is not written"; M4-a names one for its negative; M3-c (*"refused or announced before the record is written — never navigated to as a success"*) names only the human-observable half. Name what catches a write at the suite boundary, as M2-d does.

**L-3 — R-5's basis is suite-established; the post-deploy negative has no declared window** — Status: OPEN.
Validation item 5 makes the deployment record assert per flow that the surface "no longer writes records failing the composer's floor," citing the criterion. That is honest about its basis. But the only production instrument for the same negative is 012's classifier re-run (owner-run, read-only — research G3), a cumulative count with no window: read after deploy it is indistinguishable from the pre-existing 29. Either name the window (rows with `createdAt` after the deploy SHA's time) beside R-5 as the owner's optional post-deploy read, or record explicitly that R-5 is criterion-established only and no production read is claimed. This asks for no attribution (D8 is not re-raised); a windowed count needs none.

## Questions

**Q1 — for the owner, via steering-hooks-013 (blocking for M-1's remedy; enumerated, with a "don't do it").** When a message is imported by URL, webhook URL or bot code that Discord sent as Components V2 but whose components are only button rows, what should hooks.gg store and show?
- (a) **Classic, derived from structure** — the editor shows Classic with the buttons; Discord's V2 flag is not carried, and the import notice can say so. Consistent with the plan's invariant; the message sends as classic-with-buttons.
- (b) **V2, as Discord sent it** — the flag is stored; the editor shows Classic (mode is structural) and the send carries the flag; the JSON editor would refuse the same text pasted by hand (M2-d), and 012's disagreement category counts it. The plan then names that as accepted residue in both places.
- (c) **Leave it as written** — M3-a and M2-d stay as they are and the inconsistency stands unrecorded (the "don't do it" option); this critique records it as a stated limit.
Cost in the owner's terms: (a) loses one thing Discord said about the message; (b) keeps it at the price of one shape the JSON editor rejects while the URL import accepts; (c) costs nothing now and leaves the next reader to rediscover it.

## Risk Assessment

The plan's Risks table is well-formed (class, falsifier, mitigation, per-pass record). R1–R6 records are current at rev 2. M-1 proposes a seventh class row. R4 (hash rollout) is correctly accepted: the producer hashes the upsert input, so a stale client's mismatch is one benign prompt.

"How will this plan result in a hotfix?" — the two candidates found: M-2's third entry point (a criterion the implementer cannot meet as written), and M-1's ingress shape growing a category the owner reviews under D20 without the plan having said it would. Neither is a data-loss path; both are plan-text corrections.

## Recommendations

REQUEST REVISION. In order: Q1 to the owner (steering carries it); planner revises M3-a per the ruling and adds the Risk row (M-1); reconciles M3-b's third entry point with the inventory (M-2); adds M1-d's observable forms (M-3); steering trims D11's title and the planner places the corrected mechanism in the body (M-4); L-1–L-3 as one-line edits. Pass 2 then expects to buy: a plan whose every writer of `data` is discharged against the invariant it names — nothing new in scope.

## Revision History

| Pass | Date | Artifact rev | Findings addressed | New findings | Status changes |
|---|---|---|---|---|---|
| 1 | 2026-08-24 | 3 | — | M-1–M-4, L-1–L-3 | Critique OPEN |
