---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Status: Active
Status-Detail: >-
  Rev 5. QA Phase 1 complete (qa doc, commit 2455193); two owner rulings enacted — D11 (V2 flag
  cleared on mode switch back, folded into M2) and D12 (statbot deploy ordered after the live
  declaration, release condition 5) — and F-QA2 accepted (M6-b flag-residue breakout; R2 threshold
  retired). Scope delta reported to steering; downstream movement awaits the owner's approval of
  the delta.
---

# Plan 012 — `valid` field on stored messages

| Field | Value |
|---|---|
| Plan ID | 012 |
| Revision | 5 |
| Target Release | Next `project-utils` `master` push + next `website` `master` deploy (Vercel), plus owner-executed DDL and backfill against the production database. Neither package carries a `version` field or CHANGELOG, so the release is named by the serving refs moving; the devops agent verifies at release. **No roadmap document exists in this workspace** (`roadmap/` is empty) — the target is derived from the originating handoff, not a roadmap grouping. |
| Epic Alignment | None citable — recorded absence, not an oversight: no roadmap document exists to align against. The effort is owner-directed via handoff `message-valid-field-for-statbot-2026-08-23.md` (UUID 61f24e56). |
| Lane | standard — blast radius spans the shared data layer (schema), a cross-product API surface, and the production dataset; not small however few the lines. |
| Architectural surface | None new. One additive, owner-registered field on the **existing** hooks.gg → Statbot v1 read surface; no new layer, no new cross-repo contract, no rewritten core path. No architect pass named. |
| QA sequencing | QA Phase 1 (test strategy) runs before implementation — standard order, nothing here argues otherwise. Run and complete 2026-08-23: `agent-output/qa/012-message-valid-field-qa.md`, commit `2455193`; one session carries both QA phases per the owner ruling recorded there. |

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-08-23 | 1 | planner | Created from handoff 61f24e56. Contract carried verbatim from the handoff and statbot plan 023 register rows D9/D10 (read directly). Repository context from three exploration sweeps of `website` and `project-utils` (this date). OQ-1 opened: the composer's send-gate checks do not catch the motivating record 5712 — flags-bit clause needs an owner ruling. |
| 2026-08-23 | 2 | planner | Three owner rulings registered (D5–D7, relayed by steering-hooks-012). OQ-1 resolved: the gap is a composer bug to fix, not a predicate clause — D1 preserved. M2 and M5 marked PREMISE-STALE; re-scope (one added milestone: correct the send gate) derived and PROPOSED, reported to steering, awaiting authorisation before any further pass builds on it. R4's live member resolved. Not a registration pass — the ruling changes what M2's criteria require. |
| 2026-08-23 | 3 | planner | Re-scope authorised (D8, verbatim there) and enacted: send-gate fix is M2, predicate simplifies to gate reuse with no residue exception, milestones renumbered M1–M7, both PREMISE-STALE markings cleared with re-argued premises in place. D9 (JSON-editing origin: different effort, handoff by steering, not a 012 finding) and D10 (save-path normalisation left out, noted) registered. Rev-2 "Proposed Re-Scope" section retired — its five points now live as M2, M3, M6-c, and the two Out of Scope entries (the mapping this line records). |
| 2026-08-23 | 4 | planner | Critique pass 1 (012-message-valid-field-critique.md, rev-3 findings) addressed: F1 — total release order stated with the two named misordering failures and a NULL-only/idempotent backfill; F2 — script placement subordinated to the reuse property, report stays the verification/012 artifact; F3 — evaluation-failure residue named with its `false` disposition in the M6-b report; F4 — register parenthetical rephrased to past disposition. M1–M5 text untouched. Corroboration cited in M6: steering-023's live read of record 5712 (route: delivered by peer session steering-hooks-012, out-of-band, not by handoff). |
| 2026-08-23 | 5 | planner | Two owner rulings from QA Phase 1 enacted (qa doc commit `2455193`, its register rows R13/R12 carry the findings): D11 — V2 flag cleared in the mode-switch V2→classic branch, folded into M2 (M2-d revised; M2-e/M2-f added; F-QA1 carries the trace); D12 — statbot chain 023's deploy ordered after the live declaration, added to release condition 5 from this plan's side. F-QA2 accepted on planner judgement: M6-b breaks out the flag/structure-disagreement class; R2's "~1 in 1,976" retired as a threshold. Delta interrupts per standing directive — downstream movement awaits owner approval of the delta. |

## Reading Order

| Role | Read, in order |
|---|---|
| implementer | Decisions Register → Milestones → Serialised Shared Files → Risks |
| code-reviewer | Decisions Register → Milestones (acceptance properties) → Out of Scope |
| qa | Acceptance properties in Milestones → Testing Strategy → Validation and Release Conditions |
| uat | Value Statement → Validation and Release Conditions → Known Consequence (under Objective) |
| devops | Target Release row → M4's pin-resolution precondition → Validation and Release Conditions → Rollback |

Everything unnamed is reference.

---

## Value Statement and Business Objective

As the owner of hooks.gg and Statbot, I want stored hooks.gg messages to carry a machine-readable `valid` field — computed from the composer's own send checks, recomputed on every save, and backfilled across all existing records — so that Statbot can refuse messages hooks.gg already knows cannot be sent, instead of revalidating on its own side or attempting a send that fails.

The owner's framing, verbatim (2026-08-23, carried from the handoff):

> "Let me phrase it this way, validation for compliance is on hooksgg. Statbot should not be concerned with revalidating that which should not have been broken in the first place."

> "Right now, there's no way for hooksgg to communicate that a message is invalid. I think I need to pause this effort while I add a `valid` field to messages that Statbot can key off of."

**The gap is communication, not validation** (handoff, verbatim): "hooks.gg already knows which messages cannot be sent; it just has no machine-readable way to say so."

---

## Decisions Register

| # | Decision (every operative clause) | Date | Owner's words, verbatim, with route | Reopening class |
|---|---|---|---|---|
| D1 | The `valid`-field shape is accepted AS PROPOSED in all six points — `valid: boolean` on the record beside `id`/`name` (not inside `data`); truth condition = hooks.gg's existing composer send-checks; BACKFILLED across all existing records from day one; RECOMPUTED on every save; absent field = Statbot behaves as today (a rollout-window artifact bounded by the backfill); `valid: false` rejected by Statbot before processing; no per-reason detail on the record | 2026-08-23 | Three selection-prompt answers; options agent-authored (worded by steering-023), owner selected each unaltered and added no words. Registered at statbot plan 023 row D10 and in handoff 61f24e56 ("Agreed shape"); both read directly by this plan on 2026-08-23. Route: selection-prompt answers relayed by steering-023, recorded same day. | Owner withdrawal only. |
| D2 | Validation for message compliance is hooks.gg's, not Statbot's; Statbot does not revalidate | 2026-08-23 | *"Let me phrase it this way, validation for compliance is on hooksgg. Statbot should not be concerned with revalidating that which should not have been broken in the first place."* Route: witnessed by statbot steering-023, registered at statbot plan 023 row D9, carried into handoff 61f24e56; both read directly. | Owner withdrawal only. |
| D3 | If this plan needs an analyst, it asks the owner for a durable analyst session — it does not spawn an analyst subagent | 2026-08-23 | *"If the planner needs an analyst agent, tell it to ask me for a durable one."* Route: relayed by steering-hooks-012 in this chain's launch brief, 2026-08-23. | Owner withdrawal only. (Process ruling; recorded because it binds this chain's conduct.) |
| D4 | Chain 012 is opened for this handoff; the planner mints the ID | 2026-08-23 | No verbatim wording available — direction relayed, not quoted: the owner named this chain 012 in directing the launch (agent-recorded, author: steering-hooks-012). Route: relayed by steering-hooks-012 in the launch brief, 2026-08-23; `.next-id` read 12 at mint, agreeing with the naming. | Owner withdrawal only. |
| D5 | The UI failing to catch 5712's stored state is a BUG IN THE COMPOSER that must be fixed — not a question about the field's truth value; the truth condition (D1) stands unamended | 2026-08-23 | *"So you're saying there's a bug where the UI is saying something is valid when it's not? That's not a question about about the truth value, it's a bug in the UI that must be fixed."* [sic] Route: relayed by steering-hooks-012, 2026-08-23, in answer to OQ-1 as put through steering; none of the three enumerated options was selected. | Owner withdrawal only. |
| D6 | The expanded scope is confirmed: the backfill's per-check outcome distribution stays, as the gate the owner reviews before the field is declared live to Statbot; risk R2 remains carried, not escalated | 2026-08-23 | Selection-prompt answer; option agent-authored (worded by steering-hooks-012), owner selected *"Confirm the expanded scope"* unaltered. Route: relayed by steering-hooks-012, 2026-08-23. | Owner withdrawal only. |
| D7 | The unauthenticated state of the v1 read endpoints is known and accepted; no action | 2026-08-23 | *"This is known and accepted. No action necessary."* Route: relayed by steering-hooks-012, 2026-08-23, in answer to the finding routed in this plan's rev-1 report. Dismissal scope: it retires the class *findings that the v1 guild-messages read surface lacks authentication*, and releases no gate (the finding was routed for disposition, never gating this chain). | Owner withdrawal; or a change that adds write capability or a new data class to the v1 surface — a new fact, not this finding re-raised. |
| D8 | The re-scope is AUTHORISED as derived (option 1): the composer send-gate fix folds into chain 012; grounding observation offered as the stronger reason — the "Switch message mode?" modal already warns about losing content on mode toggle, so the UI treats message mode as a real property of a message (the owner is the instrument for this observation; this plan's exploration record independently agrees) | 2026-08-23 | *"1. and for a perhaps stronger reason that makes the backend change idiomatic, when toggling between the message types, the UI "Switch message mode?" modal appears warning the user of losing the current content."* (First part of a single utterance; the remainder is row D9.) Route: relayed by steering-hooks-012, 2026-08-23, answering the rev-2 re-scope question and the intent question together. | Owner withdrawal only. |
| D9 | The JSON-editing origin question is a DIFFERENT EFFORT — worth a handoff (authored by the steering thread) and research later, on the owner's word; not a rider on 012, not scoped in. The conditional within it is a hypothesis, explicitly not a ruling and not a finding: it is not registered as fact and does not enter 012's premise | 2026-08-23 | *"If there is not a bug in the UI, then it's maybe possible that JSON editing allows for bad configurations. But that's a different effort worth a handoff and researching later."* (Second part of the D8 utterance; the conditional does not withdraw ruling D5 — it names a second possible origin for 5712-shaped records.) Route: relayed by steering-hooks-012, 2026-08-23. | Owner withdrawal; or the steering-authored handoff being opened for research, which starts that effort rather than reopening this row. |
| D10 | Save-path flag normalisation stays OUT of 012 — left as an on-next-touch note, not a milestone, not a rider | 2026-08-23 | Selection answer: *"Leave it out, note it"* (option wording steering's; owner selected). Route: relayed by steering-hooks-012, 2026-08-23. | Owner withdrawal only. |
| D11 | The composer's inability to repair a flag-stranded record is closed by CLEARING `IS_COMPONENTS_V2_FLAG` in the mode-switch V2→classic branch — one line, INSIDE M2's milestone, not a follow-on chain; the alternative (accept non-recoverability, with a stated plan for telling affected guild owners about the JSON modal) was shown and declined | 2026-08-23 | Selection-prompt answer: *"Clear the flag on switch back"* (option wording agent-authored: priced by QA at finding F-QA1, put to the owner by steering; owner selected). Route: given in the steering session by selection prompt, relayed by steering-hooks-012 same day; QA register row R13. Not D10 re-raised: D10 disposed of save-path normalisation when the flag's only consequence was the field's value; after M2 the same flag also decides whether a record is recoverable in the UI — a fact not before the owner at D10 (F-QA1 carries the argument). | Owner withdrawal only. |
| D12 | Statbot chain 023's deploy of its `valid` gate is ORDERED AFTER this chain's live declaration — closing the window in which the key is present with real values but the backfill distribution is unreviewed; the alternative (accept the window knowingly) was shown and declined | 2026-08-23 | Selection-prompt answer: *"Order Statbot's deploy last"* (option wording agent-authored, put by steering from QA finding F-QA7; owner selected). Route: given in the steering session by selection prompt, relayed by steering-hooks-012 same day; QA register row R12. Cross-workspace enactment: the steering thread relays the ruling to steering-023 as the owning session, which confirms it with the owner and implements it on its side — this plan states the constraint from its side and directs nothing in chain 023. | Owner withdrawal only. |

Standing constraint restated from the handoff's `Owning-Stage`: whoever plans this **inherits the contract verbatim from the Agreed shape section and must not amend it without the owner**, because statbot chain 023 has registered it as a decision (row D10). Expiry condition: owner ruling amending the shape (OQ-1 requested this for one clause and was resolved without amendment — D5 relocated the fix to the composer). Recorded 2026-08-23.

---

## Objective

Add a nullable boolean column `valid` to the `Messages` table (model `Message`, `project-utils/prisma/schema.prisma`), computed server-side from the composer's send-gate checks, set on every write of message content, exposed at top level in both Statbot-facing v1 endpoints, and backfilled across the whole table — then declare the field live to the Statbot side only after the owner has reviewed the backfill's outcome distribution.

### The concrete case (carried verbatim from the handoff)

Stored message **5712**, guild `966088462803537960`: `flags: 32768` (`IS_COMPONENTS_V2`) with non-empty `content` and empty `components`. "Discord rejects that combination — verified live by the owner on 2026-08-23, `400`, `code 50035`, `MESSAGE_CANNOT_USE_LEGACY_FIELDS_WITH_COMPONENTS_V2`. […] It is exactly the record a `valid` field should mark `false`." Scale: one such record among 1,976 stored messages across the 444 Statbot-configuring guilds (instrument: owner-executed sweep, `/usr/local/bin/statbot/agent-output/user-files/023/hooksgg-sweep.js` → `r.json`, 2026-08-23; the full `Messages` table may be larger — the backfill covers all rows, counted at run time by the backfill itself).

### Known consequence, accepted (carried from the handoff)

When 5712 is marked invalid and Statbot gates on it, guild `966088462803537960` stops receiving that notification. "This is correct behaviour […] resolved by that guild's owner editing the message in the hooks.gg composer." Never to be mistaken for a regression.

Rev-5 note: QA's Phase 1 trace (finding F-QA1) found that on the pre-D11 code the composer offered **no control** that clears the stranded flag — the promised resolution did not exist. Owner ruling D11 (the flag cleared on switch back, enacted in M2) is what makes the quoted sentence true; M2-f keeps it observable.

### What this is NOT (carried from the handoff)

This field does not address the Statbot 500s on Components V2 statrole notifications. Those 16 messages are **valid** (a bare top-level Text Display with `flags: 32768` is well-formed — owner-verified HTTP 200, 2026-08-23); a correct `valid` field marks them `true` and they still fail, because that defect is Statbot's (chain 023's core work).

---

## Assumptions

1. **The composer's single send gate is the truth condition's referent.** The UI has exactly one sendability aggregation point: `validateMessage` (`website/src/utils/limits.tsx`), consumed as `isMessageValid` on the send page (`src/app/message/m/[id]/send/page.tsx`), which disables the Send button. Sub-checks the UI displays but which do not gate Send (embed title/author/field, link-button URL) do not block sending, so they do not enter `valid` — `valid: true` means "the Send gate would allow this", not "no red text anywhere". This is a precisification of D1's truth condition against the code, not an amendment: no check is added, none that gates send is dropped.
2. **`validateMessage` is server-usable.** It is pure (no React/Slate/browser globals) when imported directly from `~/utils/limits` rather than the `~/utils` barrel; its constants import is node-safe. Verified by exploration 2026-08-23; the existing Vitest suite (`environment: 'node'`) already exercises it.
3. **`valid` describes the stored record**, so the predicate runs on the persisted `data` exactly as stored — not on pre-save editor state. This is what D1's "it describes the record" requires and what Statbot consumes.
4. **Schema changes reach the production database out-of-band.** `project-utils` has no migration mechanism (verified across full git history, 2026-08-23); the 2023 table drop (`4b5c9b6`) shipped schema + generated types only, with DDL executed manually. The `valid` column and the backfill follow the same precedent: owner-executed against the production database.
5. **Statbot's contract needs no flag day.** D1's absent-field rule means every ship ordering relative to statbot chain 023 is correct; rollback on the hooks.gg side (stop emitting the key) degrades to today's behaviour, not to breakage.
6. **No formal `api-contract/` scaffold is introduced.** The cross-repo-contract skill's discovery found neither `api-contract/` nor `.contracts/` in these repos; the change is additive, single-field, and owner-registered on both sides (this plan's D1; statbot plan 023 D10), and the workspace's cross-repo citation convention is itself undecided (owner's to state). The handoff plus the two registers are the contract record. Proposing a scaffold is deliberately declined as ceremony for one boolean; revisit if a third consumer or a second field appears (the handoff's own Review-Trigger names that event).

---

## Open Questions

### OPEN QUESTION [RESOLVED] OQ-1: does the validity predicate consider the stored `flags` V2 bit?

**OQ-1 RESOLVED — owner ruling D5, 2026-08-23: neither enumerated option.** The owner relocated the defect: *"That's not a question about about the truth value, it's a bug in the UI that must be fixed."* The composer's send gate failing to catch 5712's stored state (`flags: 32768` + content + empty components — the gate derives V2-ness structurally and never reads `flags`) is a **composer bug**; fixing it makes the gate itself catch 5712, and the predicate — which reuses the gate — inherits the catch with **no extension clause**, so D1's "no check that does not already exist in the UI" holds without contradiction. The full rev-1 argument lives at commit `8d012bf`. Consequences enacted at rev 3 under authorisation D8: the corrected gate is milestone M2, and the predicate (M3) reuses it unmodified; the finding's substance (which checks miss what, and why) is preserved in M2's body.

### OPEN QUESTION [RESOLVED] OQ-2: where does the recompute hook attach?

The handoff asked whether mutation paths beyond the normal save exist. **Resolved by enumeration** (repository sweep, 2026-08-23, instrument: search for all `Messages`-table writers across `src/`, `bot/`, and API routes): exactly three writers exist — `upsertMessage` (`src/server/api/utils/shared.ts`; the only path that persists `data`, serving both UI saves and JSON imports through tRPC `message.upsert`), `updateRecentMessageData` (same file; touches only `recentWebhookId`/`recentThreadId`/`recentMessageId`, never `data`, so no recompute is due), and the `delete` procedure. Bot/interaction handlers use a separate Redis store; cron writes only `ScheduledMessages`. The hook attaches at `upsertMessage`, and the acceptance property (M4-a, coverage over the writer class) is stated over the enumerated writer class so any future writer joins the criterion, not just the example.

### OPEN QUESTION [RESOLVED] OQ-3: is the backfill spot-checked against the composer before Statbot is told the field is live?

Yes, and strengthened: the backfill emits an outcome distribution (per-check counts for every record computed `false`), the named sentinel records are checked against **Discord's recorded verdicts** (not against the predicate itself), and the owner reviews the distribution before the live declaration (M5). Resolution rationale: the truth condition is defined by parity with the UI, and a separately executed compute run is exactly where parity drift or an unexpected mass-invalidation would surface — the review gate converts both risks into an observed decision instead of a silent ship.

---

## Milestones

Sequential; each later milestone depends on its predecessors. Per the re-derivation gate in this planner's definition: M2–M6 ship changes to product behaviour, so any milestone not yet authorised for execution when an earlier one ships is re-argued against the shipped behaviour before proceeding.

### M1 — Schema: nullable `valid` column (repo: `project-utils`)

Add `valid` as a **nullable** boolean to `model Message` in `prisma/schema.prisma` (table `Messages`). Nullable is the contract, not a convenience: `NULL` is the "not yet computed" state that D1's absent-field rule names — a record the save path and backfill have not yet touched carries no `valid` key downstream, and no default may assert a validity nobody computed. Regenerate and rebuild in the repo's own ordered chain, which the pre-commit hook only partially enforces: **`npx prisma generate` first** (nothing scripts it, and `npm run rebuild` does not run it — schema edits without it leave `src/generated/db/types.ts` stale while the hook passes), then `npm run rebuild`, then commit schema + generated types + `dist/` together (the hook fails the commit if the rebuild dirties tracked files). Do not touch the orphan `src/generated/Database/types.ts` (capital D — a frozen dead artifact, not the source of truth). Note: `api-extractor` resolves from a global install, not `node_modules` — an environment fact the implementer verifies before relying on `rebuild`.

The DDL against the production database (adding the nullable column) is **owner-executed**, per this repo's only precedent (Assumption 4). His attestation that it ran, quoted with timestamp in the implementation document, is complete evidence; no capture file is owed.

**Acceptance properties:**
- **M1-a.** For the whole population of existing `Messages` rows, adding the column changes no stored value and no consumer-visible behaviour: every row reads `valid IS NULL` until M3/M5 write it, and (per the exposure rule in M4) a `NULL` produces no `valid` key downstream. Instrument: SQL count of non-null `valid` immediately after DDL, read once before any M3/M5 write — expected 0.
- **M1-b.** The regenerated package exports the column through the committed rollup: `DatabaseSchema.Messages` as seen by a consumer installing the pinned package includes optional `valid`. Instrument: the committed `dist/index.d.ts` at the M1 commit (verified against the committed tree, never an installed copy — cross-repo-contract skill, "Pinned Dependency Verification").

### M2 — Correct the composer's send gate (repo: `website`)

**Re-argued premise (clearing rev 2's PREMISE-STALE marking; the marked milestone anticipated the
predicate carrying an extension clause).** Under D5 the missing check is the composer's bug, so
the check belongs to the UI's own gate — and what this milestone does that the current behaviour
does not do anywhere is exactly that: make the gate decide the flags/structure-disagreement
class, so the predicate (M3) can reuse the gate unmodified and D1's "no check that does not
already exist in the UI" holds literally rather than by exception.

The send gate treats a message as Components V2 when its components are structurally V2 **or**
its `flags` carry `IS_COMPONENTS_V2_FLAG`. Today the gate derives V2-ness only structurally
(`validateContentRequirements`, `src/utils/limits.tsx`, does not receive `flags` at all), so a
5712-shaped state — flag set, content present, components empty — enables Send and would reach
Discord's `400`. The fix lands in the gate's own module and takes effect wherever the gate's
checks are consumed (the Send gate and the composer's notification rendering consume the same
checks); the error copy already exists ("Components V2 messages cannot contain embeds or
content."). This is a change to shipped product behaviour: states that today sail through to
Discord's rejection become blocked-with-explanation. Idiomatic grounding (D8, the owner as
instrument): the composer already treats message mode as a real property — the "Switch message
mode?" modal warns about losing content when toggling message types — so the gate reading mode
from `flags` follows the product's own model; this plan's exploration record independently agrees
(the mode-switch confirmation destroys the departing side on classic↔V2 switches).

**Second component (D11): the mode switch clears the flag.** QA's Phase 1 trace, quoted from its
handoff of finding F-QA1: "No composer control clears `IS_COMPONENTS_V2_FLAG`; the recovery both
the handoff and M3-d promise does not exist." The only `.flags` write in `src/` sets the flag and
never clears it, so the supported flow *build V2 → save → switch to classic → add content → save*
produces exactly 5712's shape — and after the gate fix alone, its owner would face a disabled Send
over a condition no visible control clears (the JSON-modal escape QA found is accidental and
undiscoverable). Under D11, the V2→classic branch of `handleModeSwitch`
(`src/components/DiscordMessageEditor/index.tsx`) — the branch that already destroys the departing
V2 components — also clears `IS_COMPONENTS_V2_FLAG`. This closes the generator (the flow above
stops minting flag-stranded records) and restores the recovery the handoff's "Known consequence"
promises. The full trace, including why this is not D10 re-raised, lives in the QA document
(F-QA1); the register row is D11.

**Acceptance properties:**
- **M2-a (the residue class is decided as V2).** For every composer state whose `flags` carry
  `IS_COMPONENTS_V2_FLAG`, the gate's verdict equals its verdict for the structurally-V2 state
  with the same content, embeds and components — stated over the whole class of flag-set states,
  enumerated by the (flags-bit × structure) partition, never by the one example.
- **M2-b (verdicts stable outside the residue).** For every state where flag bit and structure
  agree (both V2, or neither), the gate's verdict is unchanged from today's. Instrument: the
  existing validation suite green, plus the partition statement above — a verdict change outside
  the residue class is this criterion's failure whatever the suite says.
- **M2-c (sentinel, human-observable).** Message 5712 loaded in the composer shows the
  mutual-exclusivity notification with Send disabled. Expected verdict sourced from the
  owner-recorded Discord `400`/`50035` (2026-08-23), never from the gate itself. Registered as a
  post-deploy observable in Validation.
- **M2-d (modal preserved; one intended data-effect change, named).** The "Switch message mode?"
  modal still appears and still warns on both toggle directions — the owner's D8 observation is
  the instrument for the current behaviour, and both directions are registered as post-deploy
  observables. The V2→classic branch's data effect changes in exactly one way: it clears
  `IS_COMPONENTS_V2_FLAG` (D11) alongside the V2-component filtering it already performs. Any
  other change to either branch's data effect — including any change to the classic→V2
  direction — is this criterion's failure.
- **M2-e (the generator is closed).** For every V2→classic mode switch, the resulting editor
  state — and the record persisted by any subsequent save — carries no `IS_COMPONENTS_V2_FLAG`.
  Stated over the whole class of V2→classic switches, whatever the departing content; the flow QA
  traced is one member of the class, never the criterion.
- **M2-f (recovery observable, sentinel).** An affected stored record — 5712 is the named
  member — can be brought to a Send-enabled state through supported composer controls alone, with
  no recourse to the JSON modal. Human-observable, registered as a post-deploy row. This binds
  the ruling to its purpose: the owner chose the fix over accepting non-recoverability, so if the
  one-line change turns out not to repair already-stored records (which load in **classic** mode,
  per QA's trace of `detectMode` — reaching the V2→classic branch requires toggling through), that
  is this criterion failing and it routes back to the owner — never a narrowing absorbed silently.

### M3 — The validity predicate (repo: `website`)

**Re-argued premise (completing the clearing of rev 2's marking).** With M2 in place the
corrected gate carries every check, so this milestone still does the one thing the corrected
behaviour does not: make the gate's verdict callable server-side against a stored record, which
no UI code path provides.

A server-side predicate that answers, for a stored `data` payload, exactly what the composer's Send gate answers — **by reusing the corrected gate's own aggregation, `validateMessage` from `src/utils/limits.tsx` (imported directly, not via the `~/utils` barrel), never by reimplementing its checks, and carrying no clause of its own**. The predicate is the truth condition made callable; it adds nothing the Send gate lacks and omits nothing that gates Send.

**Acceptance properties:**
- **M3-a (parity, by construction and by observation, no exceptions).** For every payload the `Messages.data` column can hold, the predicate's verdict equals the corrected Send gate's verdict on that payload. The input class is enumerated structurally: the predicate **calls** the same exported symbol the send page calls, so parity holds by construction over the whole domain; the criterion additionally requires that structural sharing itself be observable (the repo has precedent for asserting at source level that two call sites share one symbol — how is QA's).
- **M3-b (expectations independence, sentinel records).** The verifying expectations for the named sentinels come from Discord's recorded live verdicts, never from the predicate or from arithmetic over its own symbols: message 5712's expected verdict (`false`) derives from the owner-recorded `400`/`50035` (2026-08-23), and the bare-top-level-Text-Display V2 shape's expected verdict (`true`) from the owner-recorded HTTP 200 the same day. A fixture computing its expectation from the code under test fails this criterion regardless of verdict.
- **M3-c (known asymmetries stated, not discovered downstream).** The predicate inherits `validateMessage`'s own behaviour for records without a `username` in `data` (the gate fails an absent username, so such records compute `false` — exactly as the UI would refuse to send them). This is parity, not a defect; whether it invalidates a meaningful share of real records is an empirical question that M6's distribution report answers before anything gates on it (see Risks, R2).
- **M3-d (stored records the corrected gate refuses are marked, not repaired).** For the class of already-stored records the corrected gate refuses, the predicate computes `false` and nothing rewrites their content: resolution is their owners editing them in the composer — which, after M2, explains the problem and, per D11 (M2-e/M2-f), offers a control that repairs it. (The handoff's accepted resolution, made honest by the fix.)

### M4 — Recompute on every write of message content (repo: `website`)

`upsertMessage` computes `valid` from the exact `data` it persists and writes it in the same statement — on **both** branches of the upsert: the insert values and the `ON CONFLICT … DO UPDATE` column set (the conflict branch names its columns explicitly; a `valid` present only in the insert values silently preserves stale validity on every re-save — the enumerated trap this criterion exists to catch).

**Pin-resolution precondition, re-derived 2026-08-23 against the trees.** The website declares `project-utils` as `github:hooks-gg/project-utils#master` and its `pnpm-lock.yaml` pins remote commit `eb38a15` by `git+https://` URL — a fresh install resolves from GitHub, so **an unpushed local commit on project-utils' chain branch is uninstallable by the website**, and pushing is owner-gated. Two consequences the plan states rather than the implementer discovering: (i) during chain work, builds needing the new column's types may resolve `project-utils` locally, and any such resolution is disclosed in the implementation document in the round it happens — it is a development convenience, never evidence; (ii) no milestone touching the new column claims "done" on a build that may have resolved locally — the proof is the release-condition step in Validation (owner-approved push of project-utils, pin and lockfile refreshed and committed in website, installed copy removed, frozen-lockfile install, rebuild), per the cross-repo-contract skill's pinned-dependency discipline.

**Acceptance properties:**
- **M4-a (coverage over the writer class).** For every code path in the repository that persists `Messages.data` — a class enumerated by sweep of `Messages`-table writers (2026-08-23: exactly one such path, `upsertMessage`; re-enumerated at implementation, not assumed) — the row's stored `valid` after the write equals the predicate applied to the `data` stored by that write. The class is the writers, not the one example.
- **M4-b (both branches, observable).** For every save that changes a stored message's validity in either direction (valid→invalid and invalid→valid), the stored column reflects the new verdict after the save — for updates of existing rows, not only first inserts. The instrument that would catch the conflict-branch omission is precisely a re-save whose verdict differs from the stored value.
- **M4-c (no gating).** Saving remains ungated: for every payload the save path accepts today, it accepts the same payload after M4 — `valid: false` is recorded, never rejected. (D1: users can save broken messages; the field communicates, it does not forbid.) Negative observable: the save path's acceptance behaviour is unchanged across the whole input class the existing Zod shapes admit; the instrument is the existing save-path behaviour under the suite plus a human-observable save of a known-invalid draft succeeding in production after deploy.
- **M4-d (client cannot supply it).** For every request to `message.upsert`, a client-supplied top-level `valid` never reaches storage as the stored verdict — the server computes it. (Today's non-strict shapes strip unknown keys; the criterion is the property, not the mechanism.) Injection and derivation are the same defect: the stored value is never the caller's.

### M5 — Exposure on the Statbot-facing surface (repo: `website`)

Both v1 endpoints (`src/pages/api/v1/guilds/[guildId]/messages.ts` and `…/messages/[id].ts`) expose the column. Both build responses by explicit pick (select list, a local `ResponseMessage` interface duplicated per file, and an object literal), so the column is invisible until deliberately added in each — three edit points per endpoint, and the duplication means each endpoint satisfies the criteria independently.

**Acceptance properties:**
- **M5-a (shape).** For every record either endpoint returns, the response object carries `valid` at top level, beside `id` and `name`, equal to the stored column — and **omits the key entirely** where the stored value is `NULL` (D1's absent-field rule; the rollout-window artifact). The class is both endpoints × all rows they can return, enumerated from the endpoints' own pick lists.
- **M5-b (containment, negative).** For every response, `data` carries no `valid` key the mapping introduced — the field "can never leak into what gets mapped or sent" (D1's placement rationale). Instrument: the response `data` for records whose stored `data` lacks the key; any `valid` inside `data` is the mapping's defect. (A stored `data` that happens to contain a user-authored `valid` key inside message content is out of this criterion's class — the criterion governs what the mapping adds.)
- **M5-c (no other surface changes).** The editor-facing tRPC read paths (`mapMessage`, `ApiMessage`) are deliberately **not** extended: no consumer needs `valid` there (the composer computes its notifications live), and YAGNI holds until one does. The property: outside the two v1 endpoints and the write path, no response shape in the repo changes. On-next-touch note, not scope: if the editor ever wants the stored verdict, `mapMessage`'s fixed field list is the single place it lands.

### M6 — Backfill, distribution report, and the live declaration

**Re-argued premise (clearing rev 2's scoped marking on the sentinel criterion):** the sentinel's
verdict is no longer ruling-contingent — under D5/D8 the corrected gate decides 5712, so the
backfilled table marks it `false`; the criterion below states it settled.

A one-off backfill computes and writes `valid` for **every** row of `Messages` that carries none (the whole table's remaining `NULL` rows — after the M4 deploy, saves already write verdicts, and **the backfill writes only rows whose `valid` is `NULL`**, so it can never overwrite a save-computed verdict; totals counted by the run itself, with instrument and date recorded beside the number). The run is **idempotent and convergent**: same predicate, same stored data — a re-run after any interruption completes the remainder, which is the stated recovery from a partial run (whose leftover `NULL`s M6-a's count catches). It must use the same predicate the save path uses — the M3 module, not a reimplementation — so backfill parity with saves holds by construction. **The script lives where that reuse resolves — the `website` tree on the chain branch — and its *report* is the chain-bound artifact at `agent-output/verification/012/`** (critique F2: the earlier verification/012 placement of the runnable is subordinate to the reuse property; the sweep precedent was self-contained, this script is not; the mechanism is the implementer's). Execution against the production database is **owner-executed** (Assumption 4); his attestation of the run and its printed summary, quoted with timestamp in the implementation or deployment document, is complete evidence, and no capture file is owed for it. Where any agent instead executes it against a database the owner provides, the output is captured by the executing agent as a backfill report file (named `backfill-report.md`) under `agent-output/verification/012/`.

Corroborating baseline, cited not restated: `steering-023` read record 5712 live over the v1 endpoint on 2026-08-23 — HTTP 200, top-level keys `id`/`name`/`data` only, `data.flags` = 32768, no `valid` at either level. One record read once, corroborating this plan's rev-1 exploration of the pre-ship response shape; route recorded in the changelog (delivered by peer session, out-of-band).

**Acceptance properties:**
- **M6-a (totality).** At a stated time T after the backfill completes and before the live declaration, the count of `Messages` rows with `valid IS NULL` is 0. Instrument: a state count (not a cumulative counter) executed by the backfill run itself at completion; window boundary: read at T, and the criterion binds at T — later NULLs cannot arise from M4-covered writers, which always set the column.
- **M6-b (distribution before declaration).** The backfill reports: total rows; counts `true`/`false`; for every row computed `false`, the first failing check, aggregated as counts per check; **the flag/structure-disagreement class broken out with its own count** — rows whose stored `data.flags` carry `IS_COMPONENTS_V2_FLAG` while their components are not structurally V2 (QA finding F-QA2, accepted: this is the class M2 newly decides, and the statbot-side sweep's ~1-in-1,976 rate cannot bound it — the sweep's predicate was narrower than the class, its population a differently-selected subset, and the class had a live generator in a supported UI flow until D11 closes it); and **evaluation failures as their own named category** — the residue class *rows the predicate cannot evaluate* (it throws rather than returns). Such rows carry `valid: false` — the truth condition is "passes the checks", and a row the checker cannot evaluate has not passed them; a record hooks.gg cannot vouch for is never marked sendable — and their count and row ids appear in the report the owner reviews (critique F3; the class is plausibly empty, which the run measures rather than assumes). So an unexpected mass-invalidation (see R2) is a number the owner reads, not a surprise Statbot's gate discovers. **The owner reviews this distribution before the field is declared live. The declaration is his act**, recorded (with his words and timestamp) in this chain's deployment document, and relayed to the statbot workspace by the steering thread — no agent messages anyone.
- **M6-c (sentinels against independent verdicts — settled under D5/D8).** In the backfilled table: message 5712 (guild `966088462803537960`) carries `false` (expected value sourced from the owner-recorded Discord `400`/`50035` per M3-b, never from the predicate); at least one of the 16 known bare-Text-Display V2 records carries `true` (they are valid — the handoff's "What this is NOT" boundary, kept observable so this chain cannot be misread as addressing Statbot's crash).

### M7 — Record closure of the handoff's obligations

Bring the originating handoff current: its `Owning-Stage` now names this chain (routing fact, updated at plan creation), and at release its Status moves to `Addressed` with a changelog row naming this chain's deployment document — executed by the closing stage per the workspace's close procedure, not by this plan. The handoff's two open questions are answered by OQ-2/OQ-3 dispositions here; the plan is the record. No version-artifact milestone exists: neither package carries a `version` field or CHANGELOG.

---

## Serialised Shared Files

One implementer owns all milestones; execution is sequential, so no two milestones hold a file concurrently. Coordination facts for the record: `src/utils/limits.tsx` and `src/components/DiscordMessageEditor/index.tsx` (D11's flag-clear) are touched by M2 only; the M3 predicate module is new; `src/server/api/utils/shared.ts` is touched by M4 only; the two v1 endpoint files by M5 only; `prisma/schema.prisma` and the generated/dist chain by M1 only. Chain branches are raised (by the steering thread, 2026-08-23): **`chain/012-message-valid-field`** in both repos — `project-utils` from `eb38a15`, `website` from `72dc7de`; all chain work lands there.

---

## Testing Strategy

High level only; cases, fixtures and files are the qa subagent's (`agent-output/qa/`).

- **Unit**: the corrected gate over its partition classes (M2-a/M2-b — residue decided as V2, verdicts stable elsewhere) and the M3 predicate (whole-domain parity, sentinel records with independently-sourced expectations per M3-b). The existing Vitest suite (`environment: 'node'`; `src/utils/__tests__/mutual-exclusivity.test.ts` is the adjacent spec) is the natural neighbourhood; known boilerplate exists for mocking env/SVG imports when touching `~/utils`.
- **Integration-level**: the write path's both-branches property (M4-b) and client-supplied-`valid` property (M4-d); the v1 response shape properties (M5-a/M5-b) for present, `NULL`, and absent-column states.
- **Coverage expectation**: every acceptance property above maps to at least one executable or named-manual check; TDD per the implementer's definition.
- **Suites cannot reach the production database**: M6's properties are verified by the backfill's own instruments and the owner's review, registered by QA as post-deploy-observable rows, not simulated in the suite. M2-c and M2-d are likewise human-observable rows (composer behaviour), complementing the unit coverage, never replacing it.

## Validation and Release Conditions

1. All acceptance properties M1–M5 verified by QA against the chain branch tree (`chain/012-message-valid-field`; `Verified-At` discipline).
2. Owner-executed DDL attested (M1); backfill run and distribution reviewed by the owner (M6-a/b/c) — **the live declaration to Statbot happens only after that review**.
3. **The pinned-build proof** (M4's precondition, discharged here): after the owner-approved push of `project-utils` and the pin/lockfile refresh commit in `website`, the installed copy is removed and a frozen-lockfile install plus rebuild passes — no milestone touching the new column is "done" on a build that may have resolved the dependency locally.
4. **Post-deploy observables** (registered by QA as post-deploy rows; this plan fixes a user-visible defect class, so fixed-vs-unfixed must be distinguishable in production): (a) a GET to the v1 guild-messages endpoint for guild `966088462803537960` shows message 5712 carrying `valid: false` at top level; (b) the same request for a guild holding a known bare-Text-Display V2 record shows `valid: true`; (c) a human-observable check — the owner saves a deliberately unsendable draft in the composer and the record's API representation shows `valid: false` on the next fetch, while the save itself succeeded (M4-c's human-observable half); (d) message 5712 loaded in the composer shows the mutual-exclusivity notification with Send disabled (M2-c); (e) message 5712 brought to a Send-enabled state through supported composer controls alone, no JSON modal (M2-f, D11 — the recovery the fix was chosen to secure). Captures per the executing party: owner attestation quoted, or agent capture at `agent-output/verification/012/`.
5. **Total release order (critique F1; extended by D12) — five components ordered, not just the two refs**: **DDL → `project-utils` push → `website` pin/lockfile refresh and deploy → backfill → owner distribution review → live declaration → statbot chain 023's gate deploy.** The misorderings this exists to prevent, named so the devops agent verifies order and not merely occurrence: (i) *website deploy before DDL* — the upsert names a column the production table lacks, and **every message save fails** from deploy until the DDL lands; (ii) *backfill before website deploy* — a record saved in the window carries a stale non-NULL verdict that M6-a's NULL count cannot see, violating the contract clause ("recomputed on every save") that Statbot is entitled to trust; (iii) *Statbot's gate before the live declaration* — from the M5 deploy the key is present and carrying real values, so a Statbot gate shipped inside that window stops deliveries on a distribution nobody has reviewed — the one path around the M6-b gate (QA finding F-QA7, ruled by D12). The genuinely binding precedences, so a benign reorder is distinguishable from a violation: DDL before website deploy; website deploy before backfill; `project-utils` push before the website pin refresh; backfill before review before declaration; declaration before Statbot's gate deploy (D12). The fifth component lives in another workspace: the ruling is relayed by the steering thread to steering-023 as the owning session, which confirms it with the owner and implements it on its side — this plan states the constraint from its side and directs nothing in chain 023; the devops agent verifies the hooks.gg-side steps and records the D12 relay as made, not statbot's compliance. Recovery if the order slips anyway: the backfill's NULL-only, idempotent design (M6) converges on re-run, and any save recomputes its own row. Release = those refs moving **plus** the operational steps attested, verified in that order by the devops agent. The ref set is enumerated from each repo's own inventory: one serving ref each; the pin-ordering argument made for `website` is discharged for `project-utils` by its having no upstream dependency in this change.
6. Rollback: reverting the website deploy stops computing and emitting the field; the column may remain (nullable, unread by anything else); Statbot's absent-key rule (D1) restores today's behaviour exactly. No data repair needed to roll back. Note stated, not hidden: the same revert also restores the composer's pre-M2 gate behaviour — the bug D5 names — which is acceptable for a rollback window and re-fixed by rolling forward.

## Risks

| Risk (class) | Falsifier / instrument | Mitigation | Record per pass |
|---|---|---|---|
| **R1 — Truth-condition drift**: the predicate and the Send gate diverge as either evolves; the class is any payload where the two disagree. | A payload observed with predicate verdict ≠ Send-gate verdict (suite or production report). | M3-a's by-construction sharing (one symbol, two callers) makes divergence a code-review-visible act, not a silent drift. | rev 1: no member observed. rev 3: none; the residue exception is removed (D5/D8), so the class has no carve-out left to hide in. rev 4 (critique pass 1): no member — the critic re-derived the one-symbol-two-callers structure against the chain branch. rev 5 (QA Phase 1): no member — QA's frozen 14-cell partition gives the class an executable enumeration before any predicate exists. |
| **R2 — Mass invalidation at backfill**: the class is existing records failing checks users never hit at save time (the username default is the known candidate; the corrected gate's flags residue class is another, expected tiny — one record in the sweep). A large `false` population would make Statbot skip deliveries at scale the moment it gates. | M6-b's distribution report showing an unexpected `false` population, read against the report's own per-class counts — including the flag-residue breakout. The statbot-side sweep's ~1-in-1,976 (instrument and date in Objective) is a rate over a differently-defined subset — narrower predicate and narrower population (F-QA2) — kept as context, no longer a threshold. | The M6-b review gate: the owner sees the distribution **before** the live declaration; a surprising distribution stops the declaration, not deliveries (gate owner-confirmed, D6). | rev 1: opened; no data until backfill. rev 3: unchanged; scope of the gate confirmed by D6. rev 4 (critique pass 1): no data yet; the M6-b report widened per F3 to carry evaluation failures as their own category. rev 5 (QA Phase 1): F-QA2 accepted — the "~1" threshold retired from the falsifier; the flag-residue class named with its live generator (F-QA1), closed going forward by D11; M6-b breaks the class out with its own count. Still no data until backfill. |
| **R3 — Stale-types footgun**: a schema edit without `prisma generate` passes the pre-commit hook while generated types lag. | M1-b's committed-rollup check failing, or website type-check failing against the refreshed pin. | The ordered M1 steps name generation explicitly; M1-b verifies against the committed tree. | rev 1: no member observed. rev 4 (critique pass 1): no member — M1's ordered steps verified against the actual scripts by the critic. rev 5 (QA Phase 1): no member. |
| **R4 — Parallel-chain premise**: statbot chain 023 proceeds against this contract; a change here that alters any D1 clause invalidates its premise. | Any plan revision touching a D1 clause (OQ-1's ruling was the one anticipated instance, and it was put to the owner, who owns both registers). | Scope constraint (Decisions Register, standing constraint); steering relays outcomes across workspaces. | rev 1: OQ-1 pending — the live member. rev 2: resolved without a member appearing — D5 relocated the fix to the composer and amended no D1 clause; the contract statbot 023 builds on is untouched. No new member observed. rev 4 (critique pass 1): no member — rev 3 verified to amend no D1 clause. rev 5 (QA Phase 1): no member — D11 and D12 amend no D1 clause (a composer control and a deploy ordering; the six-point shape is untouched). |

## Out of Scope — findings routed, not absorbed

- **v1 endpoints are effectively unauthenticated** (found 2026-08-23 during exploration): the middleware's matcher never covers `/api/v1/…`, and its guard tests a path prefix containing a literal `*`, which no path matches; the handlers check nothing themselves. **Ruled by the owner, 2026-08-23 (register row D7): "This is known and accepted. No action necessary."** Terminal; not re-raised without evidence in D7's stated reopening class. This plan's M4 changes response *shape* only and neither narrows nor widens access.
- **Orphan generated-types artifact** (`project-utils/src/generated/Database/types.ts`, capital D, frozen at an old commit): dead but tracked. On-next-touch note for whichever chain next works `project-utils` housekeeping; deliberately untouched here (drop disposition: none owed — never scoped in).
- **Editor display of `valid`**: excluded (M5-c). The composer already explains invalidity live; the stored verdict has no UI consumer.
- **The JSON-editing origin hypothesis** (owner, D9, conditional preserved there verbatim): a possible second origin for 5712-shaped records. **A different effort by owner ruling** — carried by `handoff/json-editor-bad-configurations-2026-08-23.md` (UUID cb83fd7b, authored by the steering thread at the owner's direction), which cites this plan for the 5712 mechanism. Not a finding of this plan, not part of its premise, not a rider.
- **Save-path flag normalisation** (owner, D10: *"Leave it out, note it"*): whether the save path should stop producing new flag/structure-disagreeing records (e.g. normalising `flags` when structure carries no V2 components). On-next-touch note for whichever chain next works the save path; the field marks any such record `false` either way, so nothing is silently wrong without it.

## Handoff Notes

- Chain branches: **`chain/012-message-valid-field`** in both `project-utils` (from `eb38a15`) and `website` (from `72dc7de`), raised by the steering thread 2026-08-23 — the workspace's first chain branches, setting the naming pattern subject to the owner's say; steering relays any rename before an implementer runs.
- Cross-repo citations to statbot paths in this document are absolute, matching the handoff's own convention after its 2026-08-23 correction; the workspace's citation convention remains the owner's to state, and nothing here prejudges it.
- Analyst: none commissioned; per D3, any future need is an ask to the owner for a durable analyst session, through steering — never a spawned subagent.
- Operational note for any hooks-side agent reading production records over the v1 endpoint (sentinel checks, post-deploy observables): the statbot workspace's implementer had exactly such a read blocked by the auto-mode classifier. If the same block fires here, **stop and report it to the steering thread** — never a reworded retry, never routed through another tool or session (a control retried until it passes is not a control).
