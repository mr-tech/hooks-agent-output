---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: Draft
Status-Detail: >-
  Rev 1, planner pass 1. Minted under owner authorisation (D1). Value statement NOT yet approved by
  the owner; the rider's clause shape (OQ-1) and four further owner-only questions are open and
  routed through steering-hooks-013. Not ready for critique until the value statement is approved
  and OQ-1 is ruled — M2's rider criterion cannot be written before it.
Target-Release: website serving ref `master` moving from `c85945f`; release ordered by 012 D12/D20 (see Validation and Release Conditions)
Lane: standard
Architectural-Surface: none added — consolidation of an existing serialisation seam inside `website`; no new layer, contract or core path
Rev: 1
---

# Plan 013 — Components V2 support across the editing surfaces

**Plan ID**: 013 · **Target Release**: `website` `master` moving from `c85945f` (no version field, no CHANGELOG in the package — see Release Artifacts) · **Epic Alignment**: roadmap absent (`agent-output/roadmap/` holds only `.gitkeep`, read 2026-08-23); the effort is owner-directed through handoff `8f3fa8c3` · **Base commit**: `c85945f` · **Chain branch**: `chain/013-…`, created and checked out by steering-hooks-013 (not by this planner; shared tree, several live sessions, no `.solo` marker) · **Rider**: `json-editor-bad-configurations-2026-08-23.md` (UUID `cb83fd7b`), attached at source by owner ruling D2.

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-08-23 | 1 | planner (planner-hooks-013, pass 1) | Created. ID 013 minted under D1 (`.next-id` read 13, written 14). Sources read directly: research `8311155a` and `5c1e9d27`, handoffs `8f3fa8c3` and `cb83fd7b`, plan 012's Decisions Register (D10, D11, D12, D18, D19, D20 restated as I-rows), `architecture/system-architecture.md`. Rider registered (D2). Five owner questions raised (OQ-1–OQ-5) and routed via steering; the rider criterion in M2 is deliberately unwritten pending OQ-1. Not committed to critique. |

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

**Approval status**: pending — put to the owner through steering-hooks-013 with this revision's report (OQ-5). No pass after this one is built until it is approved.

## Decisions Register

| # | Decision (every operative clause) | Date | Owner's words, verbatim, with route | Reopening class |
|---|---|---|---|---|
| D1 | Chain 013 is OPENED for the Components-V2 editing effort and the planner MINTS its ID; the effort BEGINS now | 2026-08-23 | *"Spawn a planner to mint 013 and begin the effort."* Route: given in the steering session, relayed verbatim by steering-hooks-013 in the launch brief, 2026-08-23. `.next-id` read 13 at mint, agreeing with the naming. | Owner withdrawal only. |
| D2 | The JSON-editor bad-configurations handoff (`cb83fd7b`, researched in `5c1e9d27`) is IN SCOPE FROM THE FIRST PASS AS A RIDER on this chain — not a separate chain, not a delta composed later | 2026-08-23 | *"json-editor-* is being brought in as a rider. There is a handoff and research document for it."* Route: given in the steering session, relayed verbatim by steering-hooks-013 in the launch brief, 2026-08-23. The rider's boundary is research `5c1e9d27` F4's: one clause — *what the JSON reconciler does with a `flags` bit that disagrees with structure* — and it must NOT absorb the 5712 framing (statbot, the `valid` field, 012 D5), which is 012's and released. | Owner withdrawal only; or the owner choosing the "do not do it" option at OQ-1, which drops the rider to an on-next-touch note (its pre-declared drop disposition). |
| D3 | Chain 013 is BASED ON `c85945f`, the deployed tip of `website` `master` — not on the pre-012 commit `72dc7de` | 2026-08-23 | **Agent-authored, not owner words.** Author: the researcher (`8311155a`, "Branch base for the successor effort" — the owner asked the question; the determination and its six-point argument are the researcher's). Independently verified by steering-hooks-013 (`master` and `chain/012-message-valid-field` both at `c85945f`, clean tree) and by this planner (`git -C website branch -v`, 2026-08-23). The owner has not ruled on it in his own words. | A 012 rollback becoming a live question (the research's own stated reopening event); or owner ruling. |

**Inherited standing decisions** (restated here per planner.md; the authoritative rows are plan 012's Decisions Register, read directly 2026-08-23 — a reader verifies against that document, never against this restatement):

| # | Inherited ruling (012 row) | Bearing on 013 |
|---|---|---|
| I-D10 | *"Leave it out, note it"* — save-path flag normalisation stayed out of 012 as an on-next-touch note, not a milestone, not a rider. | 013 is the next touch of the save path's serialisers. Whether the note is discharged here — and how — is OQ-1 (the rider's clause shape; option (c) there *is* save-path normalisation). This plan does not pre-empt it. |
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

Every item below is the owner's; each is routed to steering-hooks-013 as a selection prompt with this revision's report. None is chosen here. Per document-lifecycle "Escalation Form", each carries a real "don't do it" option.

**OPEN QUESTION OQ-1 (blocking for M2's rider criterion) — the shape of the rider's clause.** For a JSON payload whose `flags` V2 bit disagrees with its structure (bit set, no V2 components — or, symmetrically, V2 components present and bit clear, which `stripKeys` already repairs on save), what does the JSON reconciler do? Options from research `5c1e9d27` F4, plus the drop: **(a)** reject at import with a message naming the conflict; **(b)** clear the stray bit silently, as the toggle now does (I-D11's analogue); **(c)** normalise on the save path for every writer (I-D10's deferred option — also closes flow 15's hash blindness by construction and any future writer); **(d)** do not decide now — the rider drops to an on-next-touch note (its pre-declared drop disposition) and M2 ships without it. Cost note: (c) is the only option that touches `stripKeys`, a function every save already passes through; (a) and (b) touch only `enforceImportMutualExclusivity`.

**OPEN QUESTION OQ-2 — start before 012's post-release checks?** Research `8311155a` closing section: *"whether 013 starts before 012's queued post-release checks (backfill review → live declaration → statbot gate deploy) are done. Starting is safe."* D1 (*"begin the effort"*) reads as answering this; recorded so the owner confirms rather than the planner inferring. Options: start now (as D1 reads) / wait for the checks / stop the effort.

**OPEN QUESTION OQ-3 — non-V2 flag bits typed through JSON** (research `5c1e9d27` G2: `4` SUPPRESS_EMBEDS, `4096` SUPPRESS_NOTIFICATIONS and combinations are stored verbatim; nothing reasons about them). Options: leave them writable (no change) / constrain `flags` to the V2 bit only at import / decide later (note, no work).

**OPEN QUESTION OQ-4 — attribution instrumentation.** Both research documents name the same gap: nothing records which surface wrote a row, so the 29 empty rows and the 2 disagreeing rows cannot be attributed. Options: add one structured log line on `message.upsert` carrying a client-supplied surface tag (a small milestone M5, no payload logged) / leave it out (note only) / leave it out and do not note it.

**OPEN QUESTION OQ-5 — value statement approval.** The statement above, as written, or amended in his words.

**OPEN QUESTION OQ-6 — unsupported components on Discord ingress.** When a Discord message imported by URL, webhook URL or bot code carries components hooks.gg cannot represent (assumption 2's residue), the import: drops them **with a visible notice naming what was not carried** (planner's recommendation — consistent with the lenient JSON path, and turns a silent drop loud) / drops them silently as the JSON path does today / rejects the whole import. Not blocking M1–M2; blocking M3's residue criterion.

## Plan Scope

Single repo (`website`), single seam, six sites; the rider is one clause in a function M2 opens anyway (research `5c1e9d27` F4). Not split: every part would re-open `src/utils/index.ts` and `JsonModalBody.tsx`. Estimated at under one week of implementer time. **Lane: standard** — the blast radius is a shared serialiser read by every message surface, however few the lines. Large-scope justification recorded above under "Counts"; the critic approves or narrows.

Files this plan opens (inventory 2026-08-23, by reference-following; the implementer re-derives before touching):

| Path | Symbol(s) | Milestone |
|---|---|---|
| `src/utils/index.ts` | `standardizeMessage`, `hashMessage`, `enforceImportMutualExclusivity` | M1, M2 |
| `src/app/message/m/[id]/_components/SaveAsMenu.tsx` | `onSubmit` | M1 |
| `src/app/message/m/[id]/_components/JsonModalBody.tsx` | seed initialiser, Copy, Load `onConfirm` | M1, M2 |
| `src/providers/MessageProvider/usePusher.ts` | `message-update` handler | M1 |
| `src/server/api/utils/shared.ts` | `upsertMessage` Pusher trigger (hash producer) | M1 (and M5 if OQ-4 yes) |
| `src/utils/discordResponseToMessage.ts` | default export | M3 |
| `src/utils/redis/messageStore.ts` | `store` (its `Pick`) | M3 |
| `bot/serverCommands.ts` | `get_message` | M3 |
| `src/server/api/routers/message.ts` | `getFromUrl` | M3 |
| `src/utils/hooks/useValidateWebhook.ts` | converter call | M3 |
| `src/app/message/_components/NewMessageJsonInput.tsx` | validate-then-forward | M4 |
| `src/server/api/utils/shapes.ts` | `SUPPORTED_TOP_LEVEL_TYPES`, `filterSupportedComponents`, (`discordMessageImportShape` if OQ-1 = a) | M2, M4 |

Existing tests that cite the retired seam and will need re-anchoring by QA, not deletion by the implementer: `src/utils/__tests__/012-json-editor-repair-path.test.ts` (asserts today's seed shape at its line citing `standardizeMessage`), `src/utils/__tests__/m7-m10-coverage-gaps.test.ts`. Named here as a coordination fact; what to do with them is QA's.

## Milestones

Ordering is by dependency: M1 establishes the transport form everything else carries. **Re-derivation gate (planner.md 8b)**: M1, M2, M3 and M4 each change product behaviour observable outside the source (stored representations, the JSON view's output, import results). When each ships, every downstream milestone not yet authorised for execution is marked `PREMISE-STALE` here and cleared by one paragraph re-arguing its premise against the shipped behaviour. The gate is applied at ship time; no marking is in force at rev 1.

### M1 — One transport form for message data; retire the display projection from every write boundary

**Objective**: every surface that re-serialises `data` for persistence, for a committable seed, or for change detection uses the round-trippable form (`stripKeys` over the editable message), never `standardizeMessage`.

**Acceptance criteria (properties)**:

- **M1-a Projection confinement.** Over the class *all call sites of `standardizeMessage` in `src/` and `bot/`*, enumerated by symbol reference (serena `find_referencing_symbols` on `src/utils/index.ts`, and `grep -rc` as the independent count), **zero** sit on a write boundary (an argument to `message.upsert` or any mutation), seed a control whose value can be committed (the JSON modal), or feed change detection (`hashMessage`). Whether `standardizeMessage` survives as a pure display helper or is deleted is the implementer's; the property is the empty set at those three classes of site. The instrument is the reference list, captured in the implementation doc.
- **M1-b Save As is a faithful copy.** Over the class *every stored message `data` value the server's `optionalIdMessageShape` accepts* — enumerated by generating members across the shape's own partition: classic-only, V2-only (each supported top-level type, containers with each supported child type), classic with action rows, with and without `username`/`avatar_url`/`allowed_mentions`, with and without `flags` — the copy Save As writes has `data ≡` the original's stored `data` modulo `_key`s and key order, and `valid` on the copy equals `valid` on the original. Human-observable form: in production, Save As on any Components V2 message lands the user on a copy that renders in V2 mode with every component present, and the send page accepts it. Expectations independence: no verifying expectation may be produced by running the code's own serialiser over the fixture; the expected copy is the fixture's stored form stated independently.
- **M1-c The JSON view shows the whole message.** Over the same class as M1-b, the JSON modal's seed and its Copy output parse (through `discordMessageImportShape`) to an object `≡` the stored `data` modulo `_key`s and key order — components and `flags` included. Human-observable form: open Message JSON on a V2 message; the text contains its `components` array.
- **M1-d Change detection sees V2.** Over the class *all pairs of messages whose stored `data` differ in any component, component field, or the V2 flag bit*, `hashMessage` differs, bounded by the residue *genuine 32-bit hash collisions* (named; the instrument is the hash's domain, not a promise of injectivity). Over the class *all pairs equal modulo `_key`s and key order*, `hashMessage` is equal (no false "updated elsewhere" prompts from key-order noise). The producer (`upsertMessage`'s Pusher trigger) and the consumer (`usePusher`) compute the same function over the same form.

**Dependencies**: none. **Owner**: implementer. **Files**: per inventory.

### M2 — The JSON modal is a round-trip editor, and the rider clause

**Objective**: opening Message JSON and pressing Load without editing changes nothing; what a user edits is what is committed; a typed `flags` bit that disagrees with structure is handled per OQ-1.

**Acceptance criteria (properties)**:

- **M2-a Round-trip closure at the modal.** Over the class *every message loadable in the composer* (the M1-b enumeration, plus the two production shapes 012 measured — flag set with classic content and empty components; flag set with content and `components: []`), the sequence open → Load (unchanged) yields `data ≡` the prior `data` modulo `_key`s and key order **and** the derived mode unchanged, with one bounded exception: shapes whose `flags` bit disagrees with structure resolve per the OQ-1 ruling and that outcome is stated as the expected value for that class. Human-observable form: Load on an unedited V2 message leaves the editor showing the same components in V2 mode, and the composer reports no content error.
- **M2-b Hand-authored V2 JSON loads as V2.** Over the class *every JSON object `discordMessageImportShape` accepts whose components contain at least one V2 top-level type*, Load yields V2 mode with those components present and `content`/`embeds` absent (research P4's module-level result, now required at the UI: research G1/H1 is closed by this criterion's human-observable form — the editor shows V2 after Load — rather than by an owner check).
- **M2-c The overwrite confirmation is truthful.** Over the class *every Load whose accepted object differs from the current `data` in components or flags*, the confirmation names that difference in one line (which top-level component types will be removed or added, and whether the message type changes). This is the operator-visible failure statement for a surface with no automated coverage (see below): a user who confirms has been told what they lose.
- **M2-d Rider clause (D2) — UNWRITTEN pending OQ-1.** The property will be stated over the class *every accepted JSON object whose `flags` V2 bit disagrees with `hasV2Components` over its components*, on both the edit-page modal and the new-message paste path (research `5c1e9d27` Q1/Q1b), with the outcome the owner selects at OQ-1. Its drop disposition, pre-declared per planner.md: on (d), or on any conflict critique or review raises with the host, it drops to an on-next-touch note in Out of Scope and M2 proceeds without it. The rider yields; it never spawns a round.

**Dependencies**: M1 (the seed must be the transport form before the round trip can close). **Owner**: implementer. **Shared file**: `src/utils/index.ts` and `JsonModalBody.tsx` — held by M1 until M1 closes, then by M2.

### M3 — Discord ingress carries V2

**Objective**: importing a message from a Discord URL, a webhook URL, or the bot's "Get Message" code preserves the message's components and V2 flag to the extent hooks.gg can represent them, and never yields a silently empty record.

**Acceptance criteria (properties)**:

- **M3-a Preservation.** Over the class *every Discord API message whose top-level components all lie in `SUPPORTED_TOP_LEVEL_TYPES` (and container children in `SUPPORTED_CONTAINER_CHILD_TYPES`)*, the imported `data` carries those components and the V2 flag when Discord's message carried it, and the composer detects V2 on load. All three entry points (`getFromUrl`, `useValidateWebhook`, `messageStore.store`) share the one converter and the bot's `Pick` requests `components` and `flags`. Human-observable form: import a V2 message the bot itself sent, by URL; the editor opens in V2 mode with its components.
- **M3-b Residue is bounded and loud.** Over the class *every Discord API message carrying at least one component type outside the supported sets* (selects, buttons with `custom_id`, and any type the shape union lacks), the outcome is the OQ-6 ruling; under the recommended option, the record carries the supported subset and the user is shown which types were not carried, in the same dialog that shows the import. A silent drop is the failure this criterion catches; the instrument is the import UI's own notice (operator observation, captured — see below).
- **M3-c No empty success.** Over the class *every import that reaches `message.upsert`*, an import whose accepted `data` fails `validateContentRequirements` is refused or announced before the record is written — never navigated to as a success. (The 29-row shape stops being producible from these surfaces; whether it is producible from elsewhere is M4-c.)

**Dependencies**: M1 (form), independent of M2. **Owner**: implementer.

### M4 — Create-path parity and the lenient filter's own consistency

**Objective**: the new-message JSON paste validates the object it forwards; the lenient filter and the shape union agree; pasting the app's own exports is not reported valid-and-empty.

**Acceptance criteria (properties)**:

- **M4-a Same object validated and forwarded.** Over the class *every JSON object a user can paste into the new-message input*, the object handed to `NewMessageModal.onSubmit` is the object `discordMessageImportShape` accepted (research P6's class: client-valid, server-rejected is empty). Instrument: server rejections on the create path for inputs the client marked valid, in the suite; human-observable form: no *"Invalid discriminator value"* error after the UI showed the paste as valid.
- **M4-b Supported set ≡ shape union.** `SUPPORTED_TOP_LEVEL_TYPES` (and the container child set) contains exactly the discriminator values `topLevelComponentShape` (and the container's child union) accept — asserted over the sets themselves, so the Thumbnail-11 disagreement (handoff `cb83fd7b`, "Two findings established by execution", re-derived by research P6) is the instance and the equality is the class. A top-level thumbnail is then filtered leniently, not hard-rejected.
- **M4-c Import verdict agrees with the composer's floor.** Over the class *every pasted object*, both JSON importers report valid only where the accepted object passes `validateContentRequirements` — so pasting a folder-page export (whole `ApiMessage`; research P7) or any object whose keys are all unknown is reported as *what it is* (the composer's own *"Message must have content, embeds, or components."*), not as a valid empty message. Bounded residue: an intentionally empty paste (`{}`) is reported the same way; that is correct, not a defect. Human-observable form: paste a folder-page copy into New Message → JSON; the input shows the floor error instead of a green state.

**Dependencies**: M1 (shared `shapes.ts` ownership with M2 if OQ-1 = a; M2 holds first). **Owner**: implementer.

### M5 — Attribution instrumentation (CONDITIONAL on OQ-4)

**Objective**: every `message.upsert` records which surface wrote the row. Property, if authorised: over the class *all callers of `message.upsert`* (enumerated by reference), each supplies a surface tag from a closed set, and one structured line per upsert carries `{surface, hadComponentsIn, hadComponentsOut, flagsIn, flagsOut, valid}` with no message payload. Instrument: the log line; reset semantics: none (append-only); feeds on every upsert; window: from deploy. Not written further until OQ-4 is ruled.

### M6 — Record closure

**Objective**: the two handoffs are re-statused by the party that owns them (steering authored both; this plan proposes the wording), the architecture correction is handed to the architect (not made here), and 012's on-next-touch note (I-D10) carries a dated line naming this chain as the discharging document — or as the chain that declined it, per OQ-1.

**Acceptance**: the three records above carry the dated lines; the implementation doc's files-touched table reconciles to the inventory in Plan Scope (deltas explained, none silent).

## Release Artifacts

`website/package.json` carries no `version` field (read 2026-08-23) and the repo has no CHANGELOG. Per planner.md Version Management, no artifact milestone exists and none is synthesised; the release is the serving ref moving, which devops names.

## Surfaces Without Automated Coverage

The repo has no component/browser test harness (assumption 5), and this plan does not add one — a legitimate cost/benefit call for a UI whose data layer is fully testable at module level. Every confirm-commit and error branch this plan adds or changes on `SaveAsMenu`, `JsonModalBody`, `NewMessageModal`/`NewMessageJsonInput` and the import dialogs is therefore a named criterion stating the operator-visible failure: **M2-c** (the Load confirmation names what is lost), **M3-b** (the import notice names what was not carried), **M3-c** (no navigation to an empty "success"), **M4-c** (the floor error, not a green state). QA converts these to named manual checklist items; UAT executes them as a blocking release condition. Where the designated observer is the owner, no capture path is minted and no file is owed — his attestation, quoted with its timestamp in the consuming document, is complete evidence (planner.md). Where the observer is a stage agent, the capture lands at `agent-output/verification/013/<criterion>.md`.

## Serialised Shared Files

One implementer owns all milestones; execution is sequential, so no two milestones hold a file concurrently. Coordination facts: `src/utils/index.ts` and `JsonModalBody.tsx` — M1 then M2; `shapes.ts` — M2 (only under OQ-1 = a) then M4; `shared.ts` — M1 then M5 (if authorised). The 012 test files named in Plan Scope are QA's to re-anchor; the implementer does not edit them.

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
| R3 — The residue on ingress (unsupported components) is larger than assumed and users experience the notice as loss | Owner or UAT reports an import whose dropped set was the message's substance | OQ-6 puts the choice to the owner; the notice names types, not counts | rev 1: pending OQ-6. |
| R4 — Hash change breaks cross-tab detection during rollout (a client on the old hash vs a server on the new) | A "Message Update Detected" prompt firing on every save for a client that has not reloaded | Accept: Vercel deploys atomically and the prompt is benign; record in the deployment note | rev 1: no member. |
| R5 — The rider (OQ-1 = c) changes `stripKeys` and thereby the flag on every save, a behaviour change wider than the rider's clause | Any criterion in M1 whose expected value depends on the OQ-1 choice | The rider yields (D2); under (c) the clause is stated as its own property over all writers and reviewed as a scope delta before implementation | rev 1: pending OQ-1. |
| R6 — Shared-tree hazard: the chain branch is created and switched by steering over a tree with live sessions | A checkout over a dirty tree, or a session editing during the switch | Steering owns the switch (brief); this planner does not touch the tree | rev 1: no member; base verified clean by steering and this planner. |

## Out of Scope — routed, not absorbed

- **Repair of existing production rows** (29 empty; 5712 and 5842 disagreeing): data work the owner runs read-only SQL for (research G3, H2); no session queries the database. A handoff is the vehicle if he wants it; not this plan.
- **A UI control that clears the V2 indicator without content loss** (owner observation 4): after M2 the JSON route is lossless, which is the research's own resolution; a dedicated control is product direction not asked for.
- **Widening the representable component set** (interactive components): assumption 2.
- **The mode toggle's clear-on-switch** (observation 3, flow 5): by design, plan 001 M8.
- **`system-architecture.md` "Data flow" correction**: the architect's (standing constraint above).
- **Research G4** (`detectMode` leaving the prior mode standing when `components` is absent): noted; low value; not a criterion here. Reopens if M2-a's human-observable form shows a stale mode after Load.
- **The 5712 framing** (statbot, `valid`, 012 D5): D2's boundary.

## Handoff Notes

- **For steering-hooks-013**: five selection prompts (OQ-1–OQ-6, OQ-5 being the value statement) are in this revision's report, in the owner's terms. No critic runs before OQ-1 and OQ-5 are ruled; OQ-2 confirms D1's reading; OQ-3, OQ-4, OQ-6 can be ruled alongside.
- **For 012's steering/UAT record** (not a 013 obligation, a fact 013 changes): 012 D13's repair guidance points shape-(i) records at the JSON modal's Load; UAT U-6 called the JSON view's V2-stripping a *candidate falsifier* of that route. M1-c/M2-a make the route lossless for every shape, which resolves U-6's candidate in the guidance's favour **after 013 deploys** and not before. 012's QA-R4/QA-R15 (I-D19) are untouched by 013.
- **For the architect**: the invariant in Objective is the entry the research recommends for `system-architecture.md`; the "Data flow" line's second serialiser is the correction. An architect pass is recommended after critique, before implementation, as a named step — not because surface is added but because the invariant is being written down for the first time.
- **For the researcher** (`researcher-hooks-v2-flow`, offered by the owner 2026-08-23 as the contact for questions on `8311155a`): no question outstanding at rev 1.
- Chain branch naming follows 012's pattern (`chain/013-components-v2-editing-surfaces`) subject to steering; this planner does not switch the tree.
