---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Status: Active
Status-Detail: >-
  Rev 2. OQ-1 ruled by the owner (a composer bug, to be fixed — not a predicate clause); M2 and M5
  are PREMISE-STALE pending authorisation of the derived re-scope (one added milestone: correct the
  send gate in website). Delta reported to steering; no further passes until authorised. Target
  repos unchanged: project-utils then website.
---

# Plan 012 — `valid` field on stored messages

| Field | Value |
|---|---|
| Plan ID | 012 |
| Revision | 2 |
| Target Release | Next `project-utils` `master` push + next `website` `master` deploy (Vercel), plus owner-executed DDL and backfill against the production database. Neither package carries a `version` field or CHANGELOG, so the release is named by the serving refs moving; the devops agent verifies at release. **No roadmap document exists in this workspace** (`roadmap/` is empty) — the target is derived from the originating handoff, not a roadmap grouping. |
| Epic Alignment | None citable — recorded absence, not an oversight: no roadmap document exists to align against. The effort is owner-directed via handoff `message-valid-field-for-statbot-2026-08-23.md` (UUID 61f24e56). |
| Lane | standard — blast radius spans the shared data layer (schema), a cross-product API surface, and the production dataset; not small however few the lines. |
| Architectural surface | None new. One additive, owner-registered field on the **existing** hooks.gg → Statbot v1 read surface; no new layer, no new cross-repo contract, no rewritten core path. No architect pass named. |
| QA sequencing | QA Phase 1 (test strategy) runs before implementation — standard order, nothing here argues otherwise. |

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-08-23 | 1 | planner | Created from handoff 61f24e56. Contract carried verbatim from the handoff and statbot plan 023 register rows D9/D10 (read directly). Repository context from three exploration sweeps of `website` and `project-utils` (this date). OQ-1 opened: the composer's send-gate checks do not catch the motivating record 5712 — flags-bit clause needs an owner ruling. |
| 2026-08-23 | 2 | planner | Three owner rulings registered (D5–D7, relayed by steering-hooks-012). OQ-1 resolved: the gap is a composer bug to fix, not a predicate clause — D1 preserved. M2 and M5 marked PREMISE-STALE; re-scope (one added milestone: correct the send gate) derived and PROPOSED, reported to steering, awaiting authorisation before any further pass builds on it. R4's live member resolved. Not a registration pass — the ruling changes what M2's criteria require. |

## Reading Order

| Role | Read, in order |
|---|---|
| implementer | Decisions Register → Proposed Re-Scope Under D5 → Milestones → Serialised Shared Files → Risks |
| code-reviewer | Decisions Register → Proposed Re-Scope Under D5 → Milestones (acceptance properties) → Out of Scope |
| qa | Proposed Re-Scope Under D5 → Acceptance properties in Milestones → Testing Strategy → Validation and Release Conditions |
| uat | Value Statement → Validation and Release Conditions → Known Consequence (under Objective) |
| devops | Target Release row → Milestone ordering notes (M1→M3 pin discipline) → Validation and Release Conditions → Rollback |

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

Standing constraint restated from the handoff's `Owning-Stage`: whoever plans this **inherits the contract verbatim from the Agreed shape section and must not amend it without the owner**, because statbot chain 023 has registered it as a decision (row D10). Expiry condition: owner ruling amending the shape (which OQ-1 below explicitly requests for one clause). Recorded 2026-08-23.

---

## Objective

Add a nullable boolean column `valid` to the `Messages` table (model `Message`, `project-utils/prisma/schema.prisma`), computed server-side from the composer's send-gate checks, set on every write of message content, exposed at top level in both Statbot-facing v1 endpoints, and backfilled across the whole table — then declare the field live to the Statbot side only after the owner has reviewed the backfill's outcome distribution.

### The concrete case (carried verbatim from the handoff)

Stored message **5712**, guild `966088462803537960`: `flags: 32768` (`IS_COMPONENTS_V2`) with non-empty `content` and empty `components`. "Discord rejects that combination — verified live by the owner on 2026-08-23, `400`, `code 50035`, `MESSAGE_CANNOT_USE_LEGACY_FIELDS_WITH_COMPONENTS_V2`. […] It is exactly the record a `valid` field should mark `false`." Scale: one such record among 1,976 stored messages across the 444 Statbot-configuring guilds (instrument: owner-executed sweep, `/usr/local/bin/statbot/agent-output/user-files/023/hooksgg-sweep.js` → `r.json`, 2026-08-23; the full `Messages` table may be larger — the backfill covers all rows, counted at run time by the backfill itself).

### Known consequence, accepted (carried from the handoff)

When 5712 is marked invalid and Statbot gates on it, guild `966088462803537960` stops receiving that notification. "This is correct behaviour […] resolved by that guild's owner editing the message in the hooks.gg composer." Never to be mistaken for a regression.

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

**OQ-1 RESOLVED — owner ruling D5, 2026-08-23: neither enumerated option.** The owner relocated the defect: *"That's not a question about about the truth value, it's a bug in the UI that must be fixed."* The composer's send gate failing to catch 5712's stored state (`flags: 32768` + content + empty components — the gate derives V2-ness structurally and never reads `flags`) is a **composer bug**; fixing it makes the gate itself catch 5712, and the predicate — which reuses the gate — inherits the catch with **no extension clause**, so D1's "no check that does not already exist in the UI" holds without contradiction. The full rev-1 argument lives at commit `8d012bf`. Consequences carried into the re-scope below; the finding's substance (which checks miss what, and why) is preserved there and in M2's PREMISE-STALE note.

### OPEN QUESTION [RESOLVED] OQ-2: where does the recompute hook attach?

The handoff asked whether mutation paths beyond the normal save exist. **Resolved by enumeration** (repository sweep, 2026-08-23, instrument: search for all `Messages`-table writers across `src/`, `bot/`, and API routes): exactly three writers exist — `upsertMessage` (`src/server/api/utils/shared.ts`; the only path that persists `data`, serving both UI saves and JSON imports through tRPC `message.upsert`), `updateRecentMessageData` (same file; touches only `recentWebhookId`/`recentThreadId`/`recentMessageId`, never `data`, so no recompute is due), and the `delete` procedure. Bot/interaction handlers use a separate Redis store; cron writes only `ScheduledMessages`. The hook attaches at `upsertMessage`, and the acceptance property (M3) is stated over the enumerated writer class so any future writer joins the criterion, not just the example.

### OPEN QUESTION [RESOLVED] OQ-3: is the backfill spot-checked against the composer before Statbot is told the field is live?

Yes, and strengthened: the backfill emits an outcome distribution (per-check counts for every record computed `false`), the named sentinel records are checked against **Discord's recorded verdicts** (not against the predicate itself), and the owner reviews the distribution before the live declaration (M5). Resolution rationale: the truth condition is defined by parity with the UI, and a separately executed compute run is exactly where parity drift or an unexpected mass-invalidation would surface — the review gate converts both risks into an observed decision instead of a silent ship.

---

## Proposed Re-Scope Under D5 — NOT YET AUTHORISED

Derived from ruling D5; reported to steering 2026-08-23 as a scope delta and **awaiting
authorisation before any pass builds on it**. Nothing below is enacted; M2 and M5 stand
PREMISE-STALE until this proposal (or a directed alternative) is authorised and the markings are
cleared with re-arguing paragraphs.

1. **One added milestone — correct the composer's send gate (repo: `website`).** The send gate
   treats a message as Components V2 when its components are structurally V2 **or** its loaded
   `flags` carry `IS_COMPONENTS_V2_FLAG` — so a 5712-shaped editor state disables Send and shows
   the mutual-exclusivity notification whose copy already exists ("Components V2 messages cannot
   contain embeds or content."). This is the owner-ruled bug fix, a change to shipped product
   behaviour: states that today reach Discord's `400` become blocked-with-explanation in the
   composer. The fix lands in the gate's own module (`src/utils/limits.tsx` neighbourhood — the
   check must see `flags`, which `validateContentRequirements` today does not receive; where the
   signature threads through is the implementer's), never in a server-side fork of it.
2. **The predicate milestone simplifies.** The M2 predicate reuses the corrected gate **unmodified
   — no extension clause of any kind**. Parity (M2-a) loses its residue-class exception entirely:
   one symbol, two callers, over the whole domain.
3. **Records already stored in states the corrected gate refuses** are not repaired: they compute
   `valid: false`, surface through M4/M5, and are fixed by their owners in the composer — where
   the corrected gate now *explains* the problem. This is the handoff's own accepted resolution
   ("resolved by that guild's owner editing the message in the hooks.gg composer"), now made
   honest by the fix.
4. **Settled contingencies**: M5-c's 5712 sentinel verdict is `false` (no longer
   ruling-contingent); a new human-observable post-deploy row joins Validation — loading 5712 in
   the composer shows the cannot-send notification with Send disabled.
5. **Deliberately not derived into scope**: whether the *save path* should stop producing new
   flag/structure-disagreeing records (e.g. normalising `flags` when structure carries no V2
   components). The field marks any such record `false` either way, so nothing is silently wrong
   without it; preventing their creation is a separate product-behaviour choice left as an
   on-next-touch note unless the owner asks for it.

Target repos are unchanged by this re-scope: `project-utils` then `website`.

## Milestones

Sequential; each later milestone depends on its predecessors. Per the re-derivation gate in this planner's definition: M2–M6 ship changes to product behaviour, so any milestone not yet authorised for execution when an earlier one ships is re-argued against the shipped behaviour before proceeding.

### M1 — Schema: nullable `valid` column (repo: `project-utils`)

Add `valid` as a **nullable** boolean to `model Message` in `prisma/schema.prisma` (table `Messages`). Nullable is the contract, not a convenience: `NULL` is the "not yet computed" state that D1's absent-field rule names — a record the save path and backfill have not yet touched carries no `valid` key downstream, and no default may assert a validity nobody computed. Regenerate and rebuild in the repo's own ordered chain, which the pre-commit hook only partially enforces: **`npx prisma generate` first** (nothing scripts it, and `npm run rebuild` does not run it — schema edits without it leave `src/generated/db/types.ts` stale while the hook passes), then `npm run rebuild`, then commit schema + generated types + `dist/` together (the hook fails the commit if the rebuild dirties tracked files). Do not touch the orphan `src/generated/Database/types.ts` (capital D — a frozen dead artifact, not the source of truth). Note: `api-extractor` resolves from a global install, not `node_modules` — an environment fact the implementer verifies before relying on `rebuild`.

The DDL against the production database (adding the nullable column) is **owner-executed**, per this repo's only precedent (Assumption 4). His attestation that it ran, quoted with timestamp in the implementation document, is complete evidence; no capture file is owed.

**Acceptance properties:**
- **M1-a.** For the whole population of existing `Messages` rows, adding the column changes no stored value and no consumer-visible behaviour: every row reads `valid IS NULL` until M3/M5 write it, and (per the exposure rule in M4) a `NULL` produces no `valid` key downstream. Instrument: SQL count of non-null `valid` immediately after DDL, read once before any M3/M5 write — expected 0.
- **M1-b.** The regenerated package exports the column through the committed rollup: `DatabaseSchema.Messages` as seen by a consumer installing the pinned package includes optional `valid`. Instrument: the committed `dist/index.d.ts` at the M1 commit (verified against the committed tree, never an installed copy — cross-repo-contract skill, "Pinned Dependency Verification").

### M2 — The validity predicate (repo: `website`) — **PREMISE-STALE**

**PREMISE-STALE (2026-08-23, ruling D5).** As written below, M2 anticipates carrying an OQ-1
extension clause in the predicate; D5 rules the missing check a composer bug instead, so the
corrected gate carries it and the predicate carries nothing. M2 is not implemented, reviewed, or
tested until the re-scope above is authorised and this marking is cleared with a re-argued
premise. The body below is rev-1 text, retained so the criteria's structure (parity, expectations
independence, stated asymmetries) is visible to the re-argument.

A server-side predicate that answers, for a stored `data` payload, exactly what the composer's Send gate answers — **by reusing the gate's own aggregation, `validateMessage` from `src/utils/limits.tsx` (imported directly, not via the `~/utils` barrel), never by reimplementing its checks** — extended by the flags-bit clause if and only as OQ-1 is ruled. The predicate is the truth condition made callable; it adds no check the Send gate lacks (OQ-1's clause, if ruled in, is the one named, owner-ruled exception, deciding only the residue class the UI cannot represent).

**Acceptance properties:**
- **M2-a (parity, by construction and by observation).** For every payload the `Messages.data` column can hold, the predicate's verdict equals the Send gate's verdict on that payload — with the sole, bounded exception of the OQ-1 residue class (records whose stored `flags` V2 bit disagrees with component structure), decided per the ruling. The input class is enumerated structurally: the predicate **calls** the same exported symbol the send page calls, so parity over the shared domain holds by construction; the criterion additionally requires that structural sharing itself be observable (the repo has precedent for asserting at source level that two call sites share one symbol — how is QA's).
- **M2-b (expectations independence, sentinel records).** The verifying expectations for the named sentinels come from Discord's recorded live verdicts, never from the predicate or from arithmetic over its own symbols: message 5712's expected verdict derives from the owner-recorded `400`/`50035` (2026-08-23), and the bare-top-level-Text-Display V2 shape's expected verdict (`true`) from the owner-recorded HTTP 200 the same day. A fixture computing its expectation from the code under test fails this criterion regardless of verdict.
- **M2-c (known asymmetries stated, not discovered downstream).** The predicate inherits `validateMessage`'s own behaviour for records without a `username` in `data` (the gate fails an absent username, so such records compute `false` — exactly as the UI would refuse to send them). This is parity, not a defect; whether it invalidates a meaningful share of real records is an empirical question that M5's distribution report answers before anything gates on it (see Risks, R2).

### M3 — Recompute on every write of message content (repo: `website`)

`upsertMessage` computes `valid` from the exact `data` it persists and writes it in the same statement — on **both** branches of the upsert: the insert values and the `ON CONFLICT … DO UPDATE` column set (the conflict branch names its columns explicitly; a `valid` present only in the insert values silently preserves stale validity on every re-save — the enumerated trap this criterion exists to catch). Precondition: the website's `project-utils` pin is refreshed to the M1 commit and the lockfile committed, in the cross-repo order the skill mandates (publish the dependency, update the pin, commit the lockfile, rebuild from the lockfile) — the declaration alone never says what a fresh install builds against.

**Acceptance properties:**
- **M3-a (coverage over the writer class).** For every code path in the repository that persists `Messages.data` — a class enumerated by sweep of `Messages`-table writers (2026-08-23: exactly one such path, `upsertMessage`; re-enumerated at implementation, not assumed) — the row's stored `valid` after the write equals the predicate applied to the `data` stored by that write. The class is the writers, not the one example.
- **M3-b (both branches, observable).** For every save that changes a stored message's validity in either direction (valid→invalid and invalid→valid), the stored column reflects the new verdict after the save — for updates of existing rows, not only first inserts. The instrument that would catch the conflict-branch omission is precisely a re-save whose verdict differs from the stored value.
- **M3-c (no gating).** Saving remains ungated: for every payload the save path accepts today, it accepts the same payload after M3 — `valid: false` is recorded, never rejected. (D1: users can save broken messages; the field communicates, it does not forbid.) Negative observable: the save path's acceptance behaviour is unchanged across the whole input class the existing Zod shapes admit; the instrument is the existing save-path behaviour under the suite plus a human-observable save of a known-invalid draft succeeding in production after deploy.
- **M3-d (client cannot supply it).** For every request to `message.upsert`, a client-supplied top-level `valid` never reaches storage as the stored verdict — the server computes it. (Today's non-strict shapes strip unknown keys; the criterion is the property, not the mechanism.) Injection and derivation are the same defect: the stored value is never the caller's.

### M4 — Exposure on the Statbot-facing surface (repo: `website`)

Both v1 endpoints (`src/pages/api/v1/guilds/[guildId]/messages.ts` and `…/messages/[id].ts`) expose the column. Both build responses by explicit pick (select list, a local `ResponseMessage` interface duplicated per file, and an object literal), so the column is invisible until deliberately added in each — three edit points per endpoint, and the duplication means each endpoint satisfies the criteria independently.

**Acceptance properties:**
- **M4-a (shape).** For every record either endpoint returns, the response object carries `valid` at top level, beside `id` and `name`, equal to the stored column — and **omits the key entirely** where the stored value is `NULL` (D1's absent-field rule; the rollout-window artifact). The class is both endpoints × all rows they can return, enumerated from the endpoints' own pick lists.
- **M4-b (containment, negative).** For every response, `data` carries no `valid` key the mapping introduced — the field "can never leak into what gets mapped or sent" (D1's placement rationale). Instrument: the response `data` for records whose stored `data` lacks the key; any `valid` inside `data` is the mapping's defect. (A stored `data` that happens to contain a user-authored `valid` key inside message content is out of this criterion's class — the criterion governs what the mapping adds.)
- **M4-c (no other surface changes).** The editor-facing tRPC read paths (`mapMessage`, `ApiMessage`) are deliberately **not** extended: no consumer needs `valid` there (the composer computes its notifications live), and YAGNI holds until one does. The property: outside the two v1 endpoints and the write path, no response shape in the repo changes. On-next-touch note, not scope: if the editor ever wants the stored verdict, `mapMessage`'s fixed field list is the single place it lands.

### M5 — Backfill, distribution report, and the live declaration — **PREMISE-STALE (M5-c only)**

**PREMISE-STALE, scoped (2026-08-23, ruling D5).** M5-a/b stand as written (and are
owner-confirmed, D6). M5-c's sentinel framing is stale: it states 5712's expected verdict as
contingent on an OQ-1 option ruling; under D5 the verdict is settled `false`, reached through the
corrected gate. Cleared together with M2's marking when the re-scope is authorised.

A one-off backfill computes and writes `valid` for **every** row of `Messages` (the whole table, not only the 1,976 Statbot-visible records; total counted by the run itself, with instrument and date recorded beside the number). The script lives at `agent-output/verification/012/` (the workspace's home for chain-bound runnable material; precedent: the owner-executed sweep). It must use the same predicate the save path uses — the M2 module, not a reimplementation — so backfill parity with saves holds by construction. Execution against the production database is **owner-executed** (Assumption 4); his attestation of the run and its printed summary, quoted with timestamp in the implementation or deployment document, is complete evidence, and no capture file is owed for it. Where any agent instead executes it against a database the owner provides, the output is captured by the executing agent as a backfill report file (named `backfill-report.md`) under `agent-output/verification/012/`.

**Acceptance properties:**
- **M5-a (totality).** At a stated time T after the backfill completes and before the live declaration, the count of `Messages` rows with `valid IS NULL` is 0. Instrument: a state count (not a cumulative counter) executed by the backfill run itself at completion; window boundary: read at T, and the criterion binds at T — later NULLs cannot arise from M3-covered writers, which always set the column.
- **M5-b (distribution before declaration).** The backfill reports: total rows; counts `true`/`false`; and for every row computed `false`, the first failing check, aggregated as counts per check — so an unexpected mass-invalidation (see R2) is a number the owner reads, not a surprise Statbot's gate discovers. **The owner reviews this distribution before the field is declared live. The declaration is his act**, recorded (with his words and timestamp) in this chain's deployment document, and relayed to the statbot workspace by the steering thread — no agent messages anyone.
- **M5-c (sentinels against independent verdicts).** In the backfilled table: message 5712 (guild `966088462803537960`) carries the verdict OQ-1's ruling dictates (option 1: `false`; option 2: `true` — either way stated in advance, expected value sourced from the recorded Discord verdicts per M2-b, never from the predicate); at least one of the 16 known bare-Text-Display V2 records carries `true` (they are valid — the handoff's "What this is NOT" boundary, kept observable so this chain cannot be misread as addressing Statbot's crash).

### M6 — Record closure of the handoff's obligations

Bring the originating handoff current: its `Owning-Stage` now names this chain (routing fact, updated at plan creation), and at release its Status moves to `Addressed` with a changelog row naming this chain's deployment document — executed by the closing stage per the workspace's close procedure, not by this plan. The handoff's two open questions are answered by OQ-2/OQ-3 dispositions here; the plan is the record. No version-artifact milestone exists: neither package carries a `version` field or CHANGELOG.

---

## Serialised Shared Files

One implementer owns all milestones; execution is sequential, so no two milestones hold a file concurrently. Coordination facts for the record: `src/server/api/utils/shared.ts` is touched by M3 only; the two v1 endpoint files by M4 only; the M2 predicate module is new; `prisma/schema.prisma` and the generated/dist chain by M1 only. The steering thread creates and checks out the chain branch(es) — two repos move, named in this plan's report — before any implementer runs.

---

## Testing Strategy

High level only; cases, fixtures and files are the qa subagent's (`agent-output/qa/`).

- **Unit**: the M2 predicate over the acceptance classes — parity with the send gate, the OQ-1 residue class per ruling, sentinel records with independently-sourced expectations (M2-b). The existing Vitest suite (`environment: 'node'`; `src/utils/__tests__/mutual-exclusivity.test.ts` is the adjacent spec) is the natural neighbourhood; known boilerplate exists for mocking env/SVG imports when touching `~/utils`.
- **Integration-level**: the write path's both-branches property (M3-b) and client-supplied-`valid` property (M3-d); the v1 response shape properties (M4-a/M4-b) for present, `NULL`, and absent-column states.
- **Coverage expectation**: every acceptance property above maps to at least one executable or named-manual check; TDD per the implementer's definition.
- **Suites cannot reach the production database**: M5's properties are verified by the backfill's own instruments and the owner's review, registered by QA as post-deploy-observable rows, not simulated in the suite.

## Validation and Release Conditions

1. All acceptance properties M1–M4 verified by QA against the chain branch tree (`Verified-At` discipline).
2. Owner-executed DDL attested (M1); backfill run and distribution reviewed by the owner (M5-a/b/c) — **the live declaration to Statbot happens only after that review**.
3. **Post-deploy observables** (registered by QA as post-deploy rows; this plan fixes a user-visible defect class, so fixed-vs-unfixed must be distinguishable in production): (a) a GET to the v1 guild-messages endpoint for guild `966088462803537960` shows message 5712 carrying the OQ-1-ruled verdict at top level; (b) the same request for a guild holding a known bare-Text-Display V2 record shows `valid: true`; (c) a human-observable check — the owner saves a deliberately unsendable draft in the composer and the record's API representation shows `valid: false` on the next fetch, while the save itself succeeded (M3-c's human-observable half). Captures per the executing party: owner attestation quoted, or agent capture at `agent-output/verification/012/`.
4. Release = the two serving refs moving (`project-utils` `master`, then `website` `master` on Vercel — order per M3's pin discipline) **plus** the operational steps (DDL, backfill), which the devops agent verifies were attested before recording the release. The ref set is enumerated from each repo's own inventory: one serving ref each; the pin-ordering argument made for `website` is discharged for `project-utils` by its having no upstream dependency in this change.
5. Rollback: reverting the website deploy stops computing and emitting the field; the column may remain (nullable, unread by anything else); Statbot's absent-key rule (D1) restores today's behaviour exactly. No data repair needed to roll back.

## Risks

| Risk (class) | Falsifier / instrument | Mitigation | Record per pass |
|---|---|---|---|
| **R1 — Truth-condition drift**: the predicate and the Send gate diverge as either evolves; the class is any payload where the two disagree outside the OQ-1 residue. | A payload observed with predicate verdict ≠ Send-gate verdict (suite or production report). | M2-a's by-construction sharing (one symbol, two callers) makes divergence a code-review-visible act, not a silent drift. | rev 1: no member observed. |
| **R2 — Mass invalidation at backfill**: the class is existing records failing checks users never hit at save time (the username default is the known candidate; the OQ-1 clause, if ruled in, is another). A large `false` population would make Statbot skip deliveries at scale the moment it gates. | M5-b's distribution report showing a `false` count materially above the sweep's expectation (~1 in 1,976 among Statbot-visible records; instrument and date recorded in Objective). | The M5-b review gate: the owner sees the distribution **before** the live declaration; a surprising distribution stops the declaration, not deliveries. | rev 1: opened; no data until backfill. |
| **R3 — Stale-types footgun**: a schema edit without `prisma generate` passes the pre-commit hook while generated types lag. | M1-b's committed-rollup check failing, or website type-check failing against the refreshed pin. | The ordered M1 steps name generation explicitly; M1-b verifies against the committed tree. | rev 1: no member observed. |
| **R4 — Parallel-chain premise**: statbot chain 023 proceeds against this contract; a change here that alters any D1 clause invalidates its premise. | Any plan revision touching a D1 clause (OQ-1's ruling was the one anticipated instance, and it was put to the owner, who owns both registers). | Scope constraint (Decisions Register, standing constraint); steering relays outcomes across workspaces. | rev 1: OQ-1 pending — the live member. rev 2: resolved without a member appearing — D5 relocated the fix to the composer and amended no D1 clause; the contract statbot 023 builds on is untouched. No new member observed. |

## Out of Scope — findings routed, not absorbed

- **v1 endpoints are effectively unauthenticated** (found 2026-08-23 during exploration): the middleware's matcher never covers `/api/v1/…`, and its guard tests a path prefix containing a literal `*`, which no path matches; the handlers check nothing themselves. **Ruled by the owner, 2026-08-23 (register row D7): "This is known and accepted. No action necessary."** Terminal; not re-raised without evidence in D7's stated reopening class. This plan's M4 changes response *shape* only and neither narrows nor widens access.
- **Orphan generated-types artifact** (`project-utils/src/generated/Database/types.ts`, capital D, frozen at an old commit): dead but tracked. On-next-touch note for whichever chain next works `project-utils` housekeeping; deliberately untouched here (drop disposition: none owed — never scoped in).
- **Editor display of `valid`**: excluded (M4-c). The composer already explains invalidity live; the stored verdict has no UI consumer.

## Handoff Notes

- Target repos for the chain branch: **`project-utils` and `website`** (in that dependency order). The steering thread raises branches; no branch-naming convention exists in this workspace's README.
- Cross-repo citations to statbot paths in this document are absolute, matching the handoff's own convention after its 2026-08-23 correction; the workspace's citation convention remains the owner's to state, and nothing here prejudges it.
- Analyst: none commissioned; per D3, any future need is an ask to the owner for a durable analyst session, through steering — never a spawned subagent.
