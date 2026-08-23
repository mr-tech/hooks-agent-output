---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: Ready for critique
Status-Detail: >-
  Rev 2, planner pass 2. Value statement approved as written (D4). All six owner questions ruled
  2026-08-23 and registered D4–D9; no OPEN QUESTION remains. Rider criterion M2-d written per D5
  (reject at import, naming the conflict). Proposed M5 removed per D8. Awaiting the critic; chain
  branch `chain/013-components-v2-editing-surfaces` exists at `c85945f` (created by steering).
Target-Release: website serving ref `master` moving from `c85945f`; release ordered by 012 D12/D20 (see Validation and Release Conditions)
Lane: standard
Architectural-Surface: none added — consolidation of an existing serialisation seam inside `website`; no new layer, contract or core path
Rev: 2
---

# Plan 013 — Components V2 support across the editing surfaces

**Plan ID**: 013 · **Target Release**: `website` `master` moving from `c85945f` (no version field, no CHANGELOG in the package — see Release Artifacts) · **Epic Alignment**: roadmap absent (`agent-output/roadmap/` holds only `.gitkeep`, read 2026-08-23); the effort is owner-directed through handoff `8f3fa8c3` · **Base commit**: `c85945f` · **Chain branch**: `chain/013-…`, created and checked out by steering-hooks-013 (not by this planner; shared tree, several live sessions, no `.solo` marker) · **Rider**: `json-editor-bad-configurations-2026-08-23.md` (UUID `cb83fd7b`), attached at source by owner ruling D2.

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-08-23 | 1 | planner (planner-hooks-013, pass 1) | Created. ID 013 minted under D1 (`.next-id` read 13, written 14). Sources read directly: research `8311155a` and `5c1e9d27`, handoffs `8f3fa8c3` and `cb83fd7b`, plan 012's Decisions Register (D10, D11, D12, D18, D19, D20 restated as I-rows), `architecture/system-architecture.md`. Rider registered (D2). Five owner questions raised (OQ-1–OQ-5) and routed via steering; the rider criterion in M2 is deliberately unwritten pending OQ-1. Not committed to critique. |
| 2026-08-23 | 2 | planner (planner-hooks-013, pass 2) | Six owner rulings registered D4–D9 (selection prompts in the steering session, relayed by steering-hooks-013, 2026-08-23). M2-d written per D5 (reject at import, naming the conflict; only the V2 bit examined, per D7). M3-b made unconditional per D9. Proposed M5 deleted per D8 — the deleted text carried the upsert-attribution proposal; it lives in the two research documents' Instrumentation Gaps tables, unchanged, and in row D8; no Out-of-Scope note is written, per the ruling's own words. OQ-1–OQ-6 collapsed to dispositions. Risks R3/R5 prediction records updated; shared-file table updated for `shapes.ts`. Status → Ready for critique. |

## Reading Order

| Role | Sections, in order |
|---|---|
| implementer | Decisions Register → Objective → Milestones → Serialised Shared Files → Risks |
| code-reviewer | Decisions Register → Milestones (acceptance properties) → Out of Scope → Risks |
| qa | Objective (the invariant) → Milestones → Testing Strategy → Validation and Release Conditions |
| uat | Value Statement → Objective → Validation and Release Conditions → Handoff Notes |
| devops | Validation and Release Conditions → Release Artifacts → Handoff Notes |

Everything unnamed is reference, reached only when a named section cites it. The critic reads the whole plan.

## Value Statement and Business Objective

As a **guild owner editing a Components V2 message in hooks.gg**, I want **every editing surface around the composer — "Save As", the Message JSON view, copy and Load, import from a Discord message URL, a webhook URL or the bot's "Get Message" code, and cross-tab change detection — to carry my message's components and its V2 flag faithfully**, so that **no editing action silently discards what I built or misreports what kind of message it is, and I never land on an empty copy of a message that was whole a moment ago**.

**Approval status**: APPROVED AS WRITTEN (D4, 2026-08-23) — not a word amended.

## Decisions Register

| # | Decision (every operative clause) | Date | Owner's words, verbatim, with route | Reopening class |
|---|---|---|---|---|
| D1 | Chain 013 is OPENED for the Components-V2 editing effort and the planner MINTS its ID; the effort BEGINS now | 2026-08-23 | *"Spawn a planner to mint 013 and begin the effort."* Route: given in the steering session, relayed verbatim by steering-hooks-013 in the launch brief, 2026-08-23. `.next-id` read 13 at mint, agreeing with the naming. | Owner withdrawal only. |
| D2 | The JSON-editor bad-configurations handoff (`cb83fd7b`, researched in `5c1e9d27`) is IN SCOPE FROM THE FIRST PASS AS A RIDER on this chain — not a separate chain, not a delta composed later | 2026-08-23 | *"json-editor-* is being brought in as a rider. There is a handoff and research document for it."* Route: given in the steering session, relayed verbatim by steering-hooks-013 in the launch brief, 2026-08-23. The rider's boundary is research `5c1e9d27` F4's: one clause — *what the JSON reconciler does with a `flags` bit that disagrees with structure* — and it must NOT absorb the 5712 framing (statbot, the `valid` field, 012 D5), which is 012's and released. | Owner withdrawal only; or the owner choosing the "do not do it" option at OQ-1, which drops the rider to an on-next-touch note (its pre-declared drop disposition). |
| D3 | Chain 013 is BASED ON `c85945f`, the deployed tip of `website` `master` — not on the pre-012 commit `72dc7de` | 2026-08-23 | **Agent-authored, not owner words.** Author: the researcher (`8311155a`, "Branch base for the successor effort" — the owner asked the question; the determination and its six-point argument are the researcher's). Independently verified by steering-hooks-013 (`master` and `chain/012-message-valid-field` both at `c85945f`, clean tree) and by this planner (`git -C website branch -v`, 2026-08-23). The owner has not ruled on it in his own words. | A 012 rollback becoming a live question (the research's own stated reopening event); or owner ruling. |
| D4 | The VALUE STATEMENT IS APPROVED AS WRITTEN — the effort's outcome is the statement in "Value Statement and Business Objective", unamended | 2026-08-23 | Selection-prompt answer: *"Approve as written"* (options agent-authored — worded by this planner at OQ-5, put by steering-hooks-013; owner selected, amended no word). Route: given in the steering session by selection prompt, relayed by steering-hooks-013 same day. | Owner withdrawal only. |
| D5 | The RIDER CLAUSE IS OPTION (a): the JSON import REJECTS a payload whose V2 flag bit disagrees with its structure and NAMES THE CONFLICT — NOT (b) a silent clear (I-D11's analogue) and NOT (c) save-path normalisation for every writer (I-D10's deferred option, which was in front of him and not taken). Consequence carried with the ruling: cross-tab hash blindness is not closed as a side effect of the rider; if it is fixed, it is fixed on its own criterion in M1 (M1-d) | 2026-08-23 | Selection-prompt answer: *"Reject at import, naming the conflict"* (options agent-authored — this planner's OQ-1 (a)/(b)/(c)/(d), put by steering-hooks-013; owner selected). Route: given in the steering session by selection prompt, relayed by steering-hooks-013 same day, with the consequence sentence stated by steering in the relay as its own carriage (*"if cross-tab detection is to be fixed, it needs its own criterion in M1, not a side effect of the rider"*). | Owner withdrawal only. |
| D6 | The EFFORT STARTS NOW — before 012's queued post-release checks (backfill review → live declaration → statbot gate deploy), which sit inside the D20 hold | 2026-08-23 | *"I'll once again note that while 012 is in flight, but on hold until this effort is complete."* and *"Spawn a planner to mint 013 and begin the effort."* Route: given in the steering session before this plan's pass 1; relayed verbatim by steering-hooks-013 in answer to OQ-2, 2026-08-23, as a relay of a standing ruling rather than a fresh prompt. D1's reading confirmed. | Owner withdrawal only. |
| D7 | NON-V2 FLAG BITS typed through JSON (4 SUPPRESS_EMBEDS, 4096 SUPPRESS_NOTIFICATIONS, any other) STAY WRITABLE — no change; only the V2 bit receives D5's conflict check | 2026-08-23 | Selection-prompt answer: *"Leave them writable"* (options agent-authored — this planner's OQ-3, put by steering-hooks-013; owner selected). Route: given in the steering session by selection prompt, relayed by steering-hooks-013 same day. | Owner withdrawal only; or a Discord-side change making a non-V2 bit unsendable by webhook (a new fact). |
| D8 | ATTRIBUTION INSTRUMENTATION IS OUT — no upsert surface log, and NO NOTE; the proposed M5 does not exist | 2026-08-23 | Selection-prompt answer: *"Leave it out, no note"* (options agent-authored — this planner's OQ-4, put by steering-hooks-013; owner selected this over *"leave it out, note it"* with both in front of him). Route: given in the steering session by selection prompt, relayed by steering-hooks-013 same day. Reach as enacted by this planner: M5 deleted, no Out-of-Scope note, no handoff; this register row and the changelog accounting line are the registration of the ruling itself, which planner.md requires — if the owner meant "no note" to reach the register too, that correction is his, through steering. | Owner withdrawal only. |
| D9 | UNSUPPORTED COMPONENTS ON DISCORD INGRESS (URL, webhook URL, bot code) ARE DROPPED AND THE IMPORT VISIBLY NAMES WHAT WAS DROPPED — the import succeeds; not silent, not whole-import rejection | 2026-08-23 | Selection-prompt answer: *"Drop them, say what was dropped"* (options agent-authored — this planner's OQ-6, with this option marked as the planner's recommendation; put by steering-hooks-013; owner selected). Route: given in the steering session by selection prompt, relayed by steering-hooks-013 same day. | Owner withdrawal only. |

**Inherited standing decisions** (restated here per planner.md; the authoritative rows are plan 012's Decisions Register, read directly 2026-08-23 — a reader verifies against that document, never against this restatement):

| # | Inherited ruling (012 row) | Bearing on 013 |
|---|---|---|
| I-D10 | *"Leave it out, note it"* — save-path flag normalisation stayed out of 012 as an on-next-touch note, not a milestone, not a rider. | 013 is the next touch of the save path's serialisers, and the deferred option was put to the owner at OQ-1 as option (c) and **not taken** (D5): the rider rejects at import instead. The note's disposition is therefore *declined at the next touch, by owner ruling*; M6 proposes that dated line for 012's Out of Scope. `stripKeys` is not changed by the rider. |
| I-D11 | *"Clear the flag on switch back"* — the V2→classic mode-switch branch clears `IS_COMPONENTS_V2_FLAG`. | Standing behaviour at `c85945f` (`src/utils/messageMode.ts` `switchToClassic`). 013 does not alter the toggle (flow 5 is by design); the rider's option (b) is this ruling's analogue at the import boundary. |
| I-D12 | *"Order Statbot's deploy last"* — statbot's `valid`-gate deploy happens only after the hooks.gg owner declares the field live, which follows his review of the backfill distribution. Sole planning-register record on either side. | A constraint on 013's **release**, not its start. Expressed in Validation and Release Conditions items R-4 and R-5 below; not relaxed. |
| I-D18 | *"Drop it. No more scope expansion. The plan ships as is. Everything else gets folded into handoffs."* (012) | Every finding 012 folded into handoffs is a candidate input here, none is scope by default. The two handoffs this chain opens are the ones D2 and the parent name; nothing else is absorbed without an owner ruling. |
| I-D19 | *"Leave them open"* — 012's QA-R4 and QA-R15 stay open, their subject (record 5712 loaded in the composer) unloadable; chain-012 closure blocked pending this effort. | 013 makes no promise about record 5712 specifically (rider boundary, D2). What 013 changes that bears on those rows is recorded in Handoff Notes for steering; re-specifying them is 012's business, not this plan's. |
| I-D20 | *"This effort is on hold until the fixes are implemented."* — 012 on hold; its live declaration waits, and by D12 so does statbot's deploy. | "The fixes" is read (by steering-hooks-012, recorded at 012 D20) as this effort. 013's completion is what D20 waits on; 013's release conditions therefore state what the owner will have in hand when he decides whether the hold lifts (R-5). Lifting the hold is his ruling, never a 013 release step. |

**Standing constraints with expiry** (recorded per planner.md):

- *Do not correct `architecture/system-architecture.md` "Data flow" in passing* — steering-hooks-013 instruction, 2026-08-23; reason: the research (`8311155a`, System Weakness 6) assigns the correction to the architect, whose evergreen document it is. Expires when the architect pass named in Handoff Notes lands the correction, or on owner ruling.
- *Any analyst need is an ask to the owner for a durable analyst session, never a spawned subagent* — adopted from 012 D3 (*"If the planner needs an analyst agent, tell it to ask me for a durable one."*), which was a process ruling for that chain; adopted here as the conservative reading rather than assumed to lapse. Expires on owner ruling either way. No analyst is commissioned at rev 1: both research documents answer by execution what an analysis would have re-derived.

## Objective

Restore one invariant across `website`'s message-data surfaces, stated by the architect during the research and adopted here as the thing every milestone is measured against:

- **Projection confinement**: the output of a display projection never crosses a write boundary, never seeds a control whose value can be committed, and never feeds change detection.
- **Round-trip closure**: for every stored `data` value *d* the server accepts, `stripKeys(makeEditable({data: d})).data ≡ d` modulo `_key`s and key order.
- **Flags derive from structure**: the V2 flag is an output of the components' structure, never an independent input. (The rider is this clause at the one surface where a user can type `flags`; its shape is OQ-1.)

### The defect, carried verbatim from the research

Research `8311155a` (UUID; Status Answered; 15-assertion probe at `c85945f`, 15 passed, 2026-08-23), F1: *"`website` has two serialisers for message `data`, and only one of them knows about Components V2."* Its determination: *"one missing invariant with three violation sites, plus one ingress gap covering three entry points, plus one client/server filter mismatch on the create path — six sites."* Its F5: *"Flows 6, 11, 12, 13 produce an empty record with `valid=false` and no error shown."*

Research `5c1e9d27` (rider; 5-assertion probe at `c85945f`, 5 passed, 2026-08-23), F1: *"import is a mint for 5712-shaped records"* — `enforceImportMutualExclusivity` *"detects mode structurally only … `flags` is never read."*

The owner's seven observations (handoff `8f3fa8c3`, §"What was observed") are mapped to mechanisms in research F4; this plan addresses observations 1, 2, 5, 6 and 7 directly. Observation 3 (toggle to V2 clears content, with a prompt) is by design and untouched. Observation 4 (no way to remove the V2 indicator without clearing content or hand-editing JSON) is *partly* addressed: after M2, the JSON route is lossless for every shape, so the hand-edit route becomes safe; a dedicated UI control is not in scope (see Out of Scope).

### Counts, with instrument and date

- Flows enumerated: **17** (research `8311155a` F3, by reference-following with serena over `stripKeys`/`standardizeMessage`/`hashMessage`/`discordResponseToMessage` plus every `message.upsert` caller, 2026-08-23). Affected: flows 6, 7, 8, 10, 11, 12, 13, 14, 15.
- Rows failing *"Message must have content, embeds, or components."* in production: **29** of 4825 (012 backfill report `verification/012/backfill-report-1787522866564-i3s31k.md`, run 2026-08-23). Which surface wrote them is not derivable (research G3; owner-run SQL is the only instrument).
- Rows with flag/structure disagreement: **2** (5712, 5842; same report).
- Files this plan opens: **12** (this planner's inventory below, 2026-08-23) — above the <10 preference; justification: one seam with sites across the create, edit and import surfaces; splitting would re-open `src/utils/index.ts` and `JsonModalBody.tsx` in every part (see Plan Scope).

## Assumptions

1. The stored JSONB representation round-trips V2 (research F2, P10, Verified). Nothing in 013 touches the schema or `project-utils`.
2. The V2 acceptance boundary is the existing `topLevelComponentShape` union and `SUPPORTED_TOP_LEVEL_TYPES` / `SUPPORTED_CONTAINER_CHILD_TYPES` (`src/server/api/utils/shapes.ts`). 013 does not widen the set of component types hooks.gg can represent; it makes every surface carry what the set already admits. (Interactive components with `custom_id` — selects, non-link buttons — remain unrepresentable; webhooks cannot send them.)
3. `isMessageValid` (`src/server/api/utils/messageValidity.ts`) and the D1 contract of chain 012 are untouched. 013 changes which records get *written*, not how any record is *judged*.
4. The Discord API returns `components` and `flags` on a fetched message without a request parameter (`getFromUrl` uses `GET /channels/{c}/messages/{m}`; discord-api-types `APIMessage` carries both). If the installed `discord-api-types` lacks the V2 member types, the implementer records it in the implementation doc and the plan is revised — not an analyst commission.
5. No browser-level test harness exists (the suite is Vitest over modules; inventory 2026-08-23: 22 test files, none rendering components). UI-visible behaviour is therefore verified by named operator observation (see "Surfaces without automated coverage").

## Open Questions

All six put to the owner as selection prompts by steering-hooks-013 and ruled 2026-08-23; each is one disposition line, the argument retired to the register row it names.

- `OPEN QUESTION [RESOLVED] OQ-1` — rider clause shape: (a) reject at import, naming the conflict. Register D5; enacted at M2-d.
- `OPEN QUESTION [RESOLVED] OQ-2` — start before 012's post-release checks: START NOW. Register D6.
- `OPEN QUESTION [RESOLVED] OQ-3` — non-V2 flag bits typed via JSON: leave them writable, no change. Register D7; bounded residue named in M2-d.
- `OPEN QUESTION [RESOLVED] OQ-4` — attribution instrumentation: leave it out, no note. Register D8; M5 deleted.
- `OPEN QUESTION [RESOLVED] OQ-5` — value statement: approved as written. Register D4.
- `OPEN QUESTION [RESOLVED] OQ-6` — unsupported components on Discord ingress: drop them, say what was dropped. Register D9; enacted at M3-b.

## Plan Scope

Single repo (`website`), single seam, six sites; the rider is one clause in a function M2 opens anyway (research `5c1e9d27` F4). Not split: every part would re-open `src/utils/index.ts` and `JsonModalBody.tsx`. Estimated at under one week of implementer time. **Lane: standard** — the blast radius is a shared serialiser read by every message surface, however few the lines. Large-scope justification recorded above under "Counts"; the critic approves or narrows.

Files this plan opens (inventory 2026-08-23, by reference-following; the implementer re-derives before touching):

| Path | Symbol(s) | Milestone |
|---|---|---|
| `src/utils/index.ts` | `standardizeMessage`, `hashMessage`, `enforceImportMutualExclusivity` | M1, M2 |
| `src/app/message/m/[id]/_components/SaveAsMenu.tsx` | `onSubmit` | M1 |
| `src/app/message/m/[id]/_components/JsonModalBody.tsx` | seed initialiser, Copy, Load `onConfirm` | M1, M2 |
| `src/providers/MessageProvider/usePusher.ts` | `message-update` handler | M1 |
| `src/server/api/utils/shared.ts` | `upsertMessage` Pusher trigger (hash producer) | M1 |
| `src/utils/discordResponseToMessage.ts` | default export | M3 |
| `src/utils/redis/messageStore.ts` | `store` (its `Pick`) | M3 |
| `bot/serverCommands.ts` | `get_message` | M3 |
| `src/server/api/routers/message.ts` | `getFromUrl` | M3 |
| `src/utils/hooks/useValidateWebhook.ts` | converter call | M3 |
| `src/app/message/_components/NewMessageJsonInput.tsx` | validate-then-forward | M4 |
| `src/server/api/utils/shapes.ts` | `discordMessageImportShape` (D5's conflict rejection, if the implementer places it in the shape), `SUPPORTED_TOP_LEVEL_TYPES`, `filterSupportedComponents` | M2, M4 |

Existing tests that cite the retired seam and will need re-anchoring by QA, not deletion by the implementer: `src/utils/__tests__/012-json-editor-repair-path.test.ts` (asserts today's seed shape at its line citing `standardizeMessage`), `src/utils/__tests__/m7-m10-coverage-gaps.test.ts`. Named here as a coordination fact; what to do with them is QA's.

## Milestones

Ordering is by dependency: M1 establishes the transport form everything else carries. **Re-derivation gate (planner.md 8b)**: M1, M2, M3 and M4 each change product behaviour observable outside the source (stored representations, the JSON view's output, import results). When each ships, every downstream milestone not yet authorised for execution is marked `PREMISE-STALE` here and cleared by one paragraph re-arguing its premise against the shipped behaviour. The gate is applied at ship time; no marking is in force at rev 1.

### M1 — One transport form for message data; retire the display projection from every write boundary

**Objective**: every surface that re-serialises `data` for persistence, for a committable seed, or for change detection uses the round-trippable form (`stripKeys` over the editable message), never `standardizeMessage`.

**Acceptance criteria (properties)**:

- **M1-a Projection confinement.** Over the class *all call sites of `standardizeMessage` in `src/` and `bot/`*, enumerated by symbol reference (serena `find_referencing_symbols` on `src/utils/index.ts`, and `grep -rc` as the independent count), **zero** sit on a write boundary (an argument to `message.upsert` or any mutation), seed a control whose value can be committed (the JSON modal), or feed change detection (`hashMessage`). Whether `standardizeMessage` survives as a pure display helper or is deleted is the implementer's; the property is the empty set at those three classes of site. The instrument is the reference list, captured in the implementation doc.
- **M1-b Save As is a faithful copy.** Over the class *every stored message `data` value the server's `optionalIdMessageShape` accepts* — enumerated by generating members across the shape's own partition: classic-only, V2-only (each supported top-level type, containers with each supported child type), classic with action rows, with and without `username`/`avatar_url`/`allowed_mentions`, with and without `flags` — the copy Save As writes has `data ≡` the original's stored `data` modulo `_key`s and key order, and `valid` on the copy equals `valid` on the original. Human-observable form: in production, Save As on any Components V2 message lands the user on a copy that renders in V2 mode with every component present, and the send page accepts it. Expectations independence: no verifying expectation may be produced by running the code's own serialiser over the fixture; the expected copy is the fixture's stored form stated independently.
- **M1-c The JSON view shows the whole message.** Over the same class as M1-b, the JSON modal's seed and its Copy output parse (through `discordMessageImportShape`) to an object `≡` the stored `data` modulo `_key`s and key order — components and `flags` included. Human-observable form: open Message JSON on a V2 message; the text contains its `components` array.
- **M1-d Change detection sees V2.** Over the class *all pairs of messages whose stored `data` differ in any component, component field, or the V2 flag bit*, `hashMessage` differs, bounded by the residue *genuine 32-bit hash collisions* (named; the instrument is the hash's domain, not a promise of injectivity). Over the class *all pairs equal modulo `_key`s and key order*, `hashMessage` is equal (no false "updated elsewhere" prompts from key-order noise). The producer (`upsertMessage`'s Pusher trigger) and the consumer (`usePusher`) compute the same function over the same form. This criterion stands on its own (D5's carried consequence): the rider was ruled to option (a), so nothing in M2 closes hash blindness as a side effect; M1-d is the only place it is fixed.

**Dependencies**: none. **Owner**: implementer. **Files**: per inventory.

### M2 — The JSON modal is a round-trip editor, and the rider clause

**Objective**: opening Message JSON and pressing Load without editing changes nothing; what a user edits is what is committed; a typed `flags` bit that disagrees with structure is handled per OQ-1.

**Acceptance criteria (properties)**:

- **M2-a Round-trip closure at the modal.** Over the class *every message loadable in the composer* (the M1-b enumeration, plus the two production shapes 012 measured — flag set with classic content and empty components; flag set with content and `components: []`), the sequence open → Load (unchanged) yields `data ≡` the prior `data` modulo `_key`s and key order **and** the derived mode unchanged, with one bounded exception, stated as its own expected value: for a stored record whose `flags` V2 bit disagrees with its structure (012's two measured shapes), the seed after M1-c carries that flag, so an unchanged Load is **refused by M2-d, naming the conflict**, and the record is unchanged; removing the `flags` line and pressing Load then succeeds with `content`/`embeds` intact — the repair is one named edit, never a silent loss. This is a consequence of D5 that 012's D13 guidance must reflect (Handoff Notes). Human-observable form: Load on an unedited V2 message leaves the editor showing the same components in V2 mode, and the composer reports no content error.
- **M2-b Hand-authored V2 JSON loads as V2.** Over the class *every JSON object `discordMessageImportShape` accepts whose components contain at least one V2 top-level type*, Load yields V2 mode with those components present and `content`/`embeds` absent (research P4's module-level result, now required at the UI: research G1/H1 is closed by this criterion's human-observable form — the editor shows V2 after Load — rather than by an owner check).
- **M2-c The overwrite confirmation is truthful.** Over the class *every Load whose accepted object differs from the current `data` in components or flags*, the confirmation names that difference in one line (which top-level component types will be removed or added, and whether the message type changes). This is the operator-visible failure statement for a surface with no automated coverage (see below): a user who confirms has been told what they lose.
- **M2-d Rider clause (D2, shape per D5).** Over the class *every JSON object either JSON surface would otherwise accept — the edit-page modal's Load and the new-message paste (research `5c1e9d27` Q1/Q1b) — whose `flags` value has the `IS_COMPONENTS_V2_FLAG` bit SET while `hasV2Components` over its `components` is FALSE* (the mint: research F1's shape, with or without action rows), the import is **refused** — no Load, no Create — and the error shown names the conflict in one line: that the payload declares Components V2 by flag but carries no Components V2 components. Only the V2 bit is examined (D7): every other bit passes through unexamined and unchanged, as today — that is the named residue, not a gap. Bounded on the other side: a payload with V2 components and the bit absent or clear is **not** in the rejected class — under the invariant the bit derives from structure and `stripKeys` sets it on save, and M2-b requires such payloads to load as V2. (This planner's reading of the class, taken from the research's own statement of the mint; if the owner intended the conflict symmetric, the correction is one line to this class, via steering.) Instrument for the negative ("the record is not written"): the suite asserts refusal at the boundary the implementer places it, and the human-observable form is the modal's red error with Load disabled after pasting `{"content":"hi","flags":32768}` (illustrative member). Drop disposition, pre-declared per planner.md: on any conflict critique or review raises with the host, M2-d drops to an on-next-touch note in Out of Scope and M2 proceeds without it. The rider yields; it never spawns a round.

**Dependencies**: M1 (the seed must be the transport form before the round trip can close). **Owner**: implementer. **Shared file**: `src/utils/index.ts` and `JsonModalBody.tsx` — held by M1 until M1 closes, then by M2.

### M3 — Discord ingress carries V2

**Objective**: importing a message from a Discord URL, a webhook URL, or the bot's "Get Message" code preserves the message's components and V2 flag to the extent hooks.gg can represent them, and never yields a silently empty record.

**Acceptance criteria (properties)**:

- **M3-a Preservation.** Over the class *every Discord API message whose top-level components all lie in `SUPPORTED_TOP_LEVEL_TYPES` (and container children in `SUPPORTED_CONTAINER_CHILD_TYPES`)*, the imported `data` carries those components and the V2 flag when Discord's message carried it, and the composer detects V2 on load. All three entry points (`getFromUrl`, `useValidateWebhook`, `messageStore.store`) share the one converter and the bot's `Pick` requests `components` and `flags`. Human-observable form: import a V2 message the bot itself sent, by URL; the editor opens in V2 mode with its components.
- **M3-b Residue is bounded and loud (D9).** Over the class *every Discord API message carrying at least one component type outside the supported sets* (selects, buttons with `custom_id`, and any type the shape union lacks; enumerated as the complement of `SUPPORTED_TOP_LEVEL_TYPES` / `SUPPORTED_CONTAINER_CHILD_TYPES` over the discord-api-types `ComponentType` enum installed), the import **succeeds** with the supported subset and the user is **shown which component types were not carried**, in the same dialog that shows the import, on all three entry points. A silent drop is the failure this criterion catches; a whole-import rejection is equally a failure (D9 declined it). Instrument: the notice itself — operator observation, captured per "Surfaces Without Automated Coverage"; the suite asserts the converter reports the dropped set alongside the data. Human-observable form: import by URL a message from another bot that carries a select menu; the editor opens with the supported components and a notice naming the select menu as not carried.
- **M3-c No empty success.** Over the class *every import that reaches `message.upsert`*, an import whose accepted `data` fails `validateContentRequirements` is refused or announced before the record is written — never navigated to as a success. (The 29-row shape stops being producible from these surfaces; whether it is producible from elsewhere is M4-c.)

**Dependencies**: M1 (form), independent of M2. **Owner**: implementer.

### M4 — Create-path parity and the lenient filter's own consistency

**Objective**: the new-message JSON paste validates the object it forwards; the lenient filter and the shape union agree; pasting the app's own exports is not reported valid-and-empty.

**Acceptance criteria (properties)**:

- **M4-a Same object validated and forwarded.** Over the class *every JSON object a user can paste into the new-message input*, the object handed to `NewMessageModal.onSubmit` is the object `discordMessageImportShape` accepted (research P6's class: client-valid, server-rejected is empty). Instrument: server rejections on the create path for inputs the client marked valid, in the suite; human-observable form: no *"Invalid discriminator value"* error after the UI showed the paste as valid.
- **M4-b Supported set ≡ shape union.** `SUPPORTED_TOP_LEVEL_TYPES` (and the container child set) contains exactly the discriminator values `topLevelComponentShape` (and the container's child union) accept — asserted over the sets themselves, so the Thumbnail-11 disagreement (handoff `cb83fd7b`, "Two findings established by execution", re-derived by research P6) is the instance and the equality is the class. A top-level thumbnail is then filtered leniently, not hard-rejected.
- **M4-c Import verdict agrees with the composer's floor.** Over the class *every pasted object*, both JSON importers report valid only where the accepted object passes `validateContentRequirements` — so pasting a folder-page export (whole `ApiMessage`; research P7) or any object whose keys are all unknown is reported as *what it is* (the composer's own *"Message must have content, embeds, or components."*), not as a valid empty message. Bounded residue: an intentionally empty paste (`{}`) is reported the same way; that is correct, not a defect. Human-observable form: paste a folder-page copy into New Message → JSON; the input shows the floor error instead of a green state.

**Dependencies**: M1; M2 holds `shapes.ts` first. **Owner**: implementer.

### M6 — Record closure

**Objective**: the two handoffs are re-statused by the party that owns them (steering authored both; this plan proposes the wording), the architecture correction is handed to the architect (not made here), and 012's on-next-touch note (I-D10) carries a dated line naming this chain as the next touch at which the owner declined save-path normalisation in favour of import-time rejection (D5). The write to 012's plan happens on steering's signal, never during the hold on this planner's own initiative.

**Acceptance**: the three records above carry the dated lines; the implementation doc's files-touched table reconciles to the inventory in Plan Scope (deltas explained, none silent).

## Release Artifacts

`website/package.json` carries no `version` field (read 2026-08-23) and the repo has no CHANGELOG. Per planner.md Version Management, no artifact milestone exists and none is synthesised; the release is the serving ref moving, which devops names.

## Surfaces Without Automated Coverage

The repo has no component/browser test harness (assumption 5), and this plan does not add one — a legitimate cost/benefit call for a UI whose data layer is fully testable at module level. Every confirm-commit and error branch this plan adds or changes on `SaveAsMenu`, `JsonModalBody`, `NewMessageModal`/`NewMessageJsonInput` and the import dialogs is therefore a named criterion stating the operator-visible failure: **M2-c** (the Load confirmation names what is lost), **M3-b** (the import notice names what was not carried), **M3-c** (no navigation to an empty "success"), **M4-c** (the floor error, not a green state). QA converts these to named manual checklist items; UAT executes them as a blocking release condition. Where the designated observer is the owner, no capture path is minted and no file is owed — his attestation, quoted with its timestamp in the consuming document, is complete evidence (planner.md). Where the observer is a stage agent, the capture lands at `agent-output/verification/013/<criterion>.md`.

## Serialised Shared Files

One implementer owns all milestones; execution is sequential, so no two milestones hold a file concurrently. Coordination facts: `src/utils/index.ts` and `JsonModalBody.tsx` — M1 then M2; `shapes.ts` — M2 then M4; `shared.ts` — M1 only. The 012 test files named in Plan Scope are QA's to re-anchor; the implementer does not edit them.

## Testing Strategy

Expected types: **unit** (Vitest, `src/utils/__tests__/` and `src/server/api/utils/__tests__/`, the repo's existing homes) over the serialisers, reconciler, converter and shape sets, with the M1-b enumeration generated across the shape's partition rather than hand-listed; **integration** at the tRPC input boundary (`optionalIdMessageShape` / `upsertMessage`) for the write-side properties; **no e2e** — UI criteria are manual checklist items per the section above. Coverage expectation: every property above has at least one executable assertion over its class, and each negative criterion names its instrument. TDD is the implementer's mandate; red is demonstrated at the chain base. **QA Phase 1 runs before implementation** (as in chain 012), because the properties' enumerations are the thing most likely to be under-specified and cheaper to correct before code exists. Test *cases* are QA's (`agent-output/qa/`), not this plan's.

## Validation and Release Conditions

1. `pnpm typecheck` and the full Vitest suite green on the chain branch tip; build green (the reviewer and QA re-run, never inherit).
2. M1-a's reference list captured in the implementation doc; `grep -rc standardizeMessage src bot` reconciles with it (counts computed inside grep, never through the output filter).
3. Every human-observable form above executed and recorded (owner attestation or `verification/013/` capture) before UAT's verdict.
4. **R-4 (I-D12, not relaxed)**: 013's release makes no live declaration of the `valid` field and triggers nothing in the statbot workspace. The sequence *backfill review → live declaration → statbot gate deploy* is 012's, resumes only on the owner lifting D20, and 013's deployment record says so in one line.
5. **R-5 (what the owner will hold when he rules on D20)**: 013's deployment record states, for each of flows 6, 8, 11–14, that the surface no longer writes records failing the composer's floor — with the criterion that established it — so the D20 decision and the live declaration are made on a stated basis, not on "the fixes are in". 013 does **not** repair existing rows (29 empty, 2 disagreeing); see Out of Scope.
6. Post-deploy observables (fixed vs unfixed, in production, owner-observed): Save As on a V2 message yields a V2 copy that sends; Message JSON on a V2 message shows its components; Load unchanged leaves the message intact. QA registers each as a post-deploy-observable row.
7. Rollback: a single-repo deploy on Vercel from `master`; rollback is the serving ref moving back to `c85945f`. No schema, no data migration, nothing in `project-utils`. Records written by the fixed surfaces between deploy and rollback are ordinary valid records and survive rollback unharmed.

## Risks

| Risk (class) | Falsifier (what counts as a member) | Mitigation | Prediction record |
|---|---|---|---|
| R1 — A display consumer of `standardizeMessage` exists that genuinely needs the lossy form and is broken by retirement | A reference outside the three confined classes whose output is rendered, found in M1-a's enumeration | Enumerate by reference before editing; keep the helper as display-only if a consumer exists | rev 1: inventory shows three references (SaveAsMenu, JsonModalBody, hashMessage) plus tests; no display consumer seen. Recorded per pass. |
| R2 — Chain 012's D1 contract or `isMessageValid` is touched, invalidating statbot 023's premise (012 R4's class, inherited) | Any revision or diff touching `messageValidity.ts`, the six D1 clauses, or the v1 exposure | Assumption 3 is a criterion: the file's hash unchanged between base and tip is captured by the reviewer | rev 1: no member — no milestone names the predicate. |
| R3 — The residue on ingress (unsupported components) is larger than assumed and users experience the notice as loss | Owner or UAT reports an import whose dropped set was the message's substance | OQ-6 puts the choice to the owner; the notice names types, not counts | rev 1: pending OQ-6. rev 2: D9 ruled the notice; no member — the class stays open for UAT to report a member against. |
| R4 — Hash change breaks cross-tab detection during rollout (a client on the old hash vs a server on the new) | A "Message Update Detected" prompt firing on every save for a client that has not reloaded | Accept: Vercel deploys atomically and the prompt is benign; record in the deployment note | rev 1: no member. |
| R5 — The rider (OQ-1 = c) changes `stripKeys` and thereby the flag on every save, a behaviour change wider than the rider's clause | Any criterion in M1 whose expected value depends on the OQ-1 choice | The rider yields (D2); under (c) the clause is stated as its own property over all writers and reviewed as a scope delta before implementation | rev 1: pending OQ-1. rev 2: no member — D5 chose (a); `stripKeys` is untouched by the rider and no M1 expected value depends on it. |
| R6 — Shared-tree hazard: the chain branch is created and switched by steering over a tree with live sessions | A checkout over a dirty tree, or a session editing during the switch | Steering owns the switch (brief); this planner does not touch the tree | rev 1: no member; base verified clean by steering and this planner. |

## Out of Scope — routed, not absorbed

- **Repair of existing production rows** (29 empty; 5712 and 5842 disagreeing): data work the owner runs read-only SQL for (research G3, H2); no session queries the database. A handoff is the vehicle if he wants it; not this plan.
- **A UI control that clears the V2 indicator without content loss** (owner observation 4): after M2 the JSON route is lossless, which is the research's own resolution; a dedicated control is product direction not asked for.
- **Widening the representable component set** (interactive components): assumption 2.
- **The mode toggle's clear-on-switch** (observation 3, flow 5): by design, plan 001 M8.
- **`system-architecture.md` "Data flow" correction**: the architect's (standing constraint above).
- **Research G4** (`detectMode` leaving the prior mode standing when `components` is absent): noted; low value; not a criterion here. Reopens if M2-a's human-observable form shows a stale mode after Load.
- **Save-path flag normalisation for every writer** (012 I-D10's deferred option, this plan's OQ-1 (c)): put to the owner at the next touch and DECLINED (D5) in favour of import-time rejection. Not re-raised without evidence in D5's reopening class.
- **The 5712 framing** (statbot, `valid`, 012 D5): D2's boundary.

## Handoff Notes

- **For steering-hooks-013**: all six questions ruled and registered (D4–D9); the plan is ready for the critic. One reading of reach is recorded for the owner to correct if wrong: D8's "no note" enacted as *no Out-of-Scope note, no handoff, M5 deleted*, with the register row and changelog line kept as the ruling's own registration; and M2-d's rejected class read as *bit set, structure classic* only (the research's mint), not the symmetric case.
- **For 012's steering/UAT record** (not a 013 obligation, a fact 013 changes): 012 D13's repair guidance points shape-(i) records at the JSON modal's Load; UAT U-6 called the JSON view's V2-stripping a *candidate falsifier* of that route. After 013 deploys — not before — the route changes in two ways D13's guidance must reflect: (1) the JSON view shows the stored `flags`, so for a flag-stranded record an **unchanged** Load is refused by M2-d with an error naming the conflict (no silent loss, no repair either); (2) removing the `flags` line and pressing Load repairs the record with `content`/`embeds` intact. U-6's candidate falsifier (the view strips V2 content) is resolved — the view strips nothing after M1-c — but the guidance's instruction becomes *open JSON, delete `flags`, Load*, not *open JSON, Load*. 012's QA-R4/QA-R15 (I-D19) are untouched by 013.
- **For the architect**: the invariant in Objective is the entry the research recommends for `system-architecture.md`; the "Data flow" line's second serialiser is the correction. An architect pass is recommended after critique, before implementation, as a named step — not because surface is added but because the invariant is being written down for the first time.
- **For the researcher** (`researcher-hooks-v2-flow`, offered by the owner 2026-08-23 as the contact for questions on `8311155a`): no question outstanding at rev 1.
- Chain branch naming follows 012's pattern (`chain/013-components-v2-editing-surfaces`) subject to steering; this planner does not switch the tree.
