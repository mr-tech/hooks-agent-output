---
ID: 013
Origin: 013
UUID: 22d69e06
Status: Resolved
Status-Detail: "Resolved 2026-11-11 by architect-hooks-016 at the owed post-implementation reconciliation (website 0e3d903): the two V2 Problem Areas and the Data-flow bullets are reconciled in system-architecture.md. O-1 is carried by its Problem Area 'Persisting writers share a criterion, not a path'; O-2 by plan 016, which extends the send check; F-1, RC-1 and O-3/O-4 closed with chain 013's release."
---

# Architecture Findings — Plan 013: Components V2 across the editing surfaces

## Changelog

| Date       | Event | Summary |
| ---------- | ----- | ------- |
| 2026-08-24 | Data-flow correction (standing constraint, independent of the plan's revision) | The `system-architecture.md` "Data flow" defect re-derived against `website` `c85945f` and corrected; D-004 "the flag is the mode" recorded from D15; two Problem Areas registered. Committed `35906ab`. Handed to steering-hooks-013 with six owner-sourced questions for a `website.md` per-repo record. |
| 2026-08-24 | Plan review, rev 9 (`b57639c`) | One required change (RC-1) on the interaction between the owner's `stripKeys` ruling and M7-a; three observations. D-004 extended for D17, which withdrew a clause the ADR carried. **APPROVED_WITH_CHANGES.** |
| 2026-08-24 | Re-review, rev 10 (`9140ffe`) | **RC-1 discharged by D18/M8-G and withdrawn** — the planner re-derived the finding from `c85945f` before writing the criterion. One new finding (F-1) on M8-G's population and observability argument, which contradicts the mechanism the criterion itself confirms. Out-of-Scope routing of the Medium judged correct. **APPROVED.** |
| 2026-11-11T10:51 | Reconciliation and closure (architect-hooks-016, on `handoff/architecture-record-reconciliation-owed-2026-11-10.md` item 2) | Integration requirement 3 discharged: `system-architecture.md` reconciled to 013 as implemented at website `0e3d903`. The High V2-flag Problem Area is resolved; the writers row is restated, with O-1 as its carrier. O-2 (only a disabled button between a conflicted draft and Discord) is the send check's surface, which plan 016 extends. F-1, RC-1, O-3 and O-4 closed with the chain. |
| 2026-11-11T10:51 | architect-hooks-016 | Document closed | Status: Resolved |

---

## Verdict (rev 10): APPROVED

RC-1 is discharged and withdrawn. One finding (F-1) remains, which strengthens an existing criterion rather than blocking it; it does not gate implementation.

**Verdict at rev 9, retained below as the record: APPROVED_WITH_CHANGES.**

---

## Rev 10 re-review (`9140ffe`)

### RC-1 — DISCHARGED, withdrawn

D18/M8-G resolves it, and resolves it as option (a): every `message.upsert` caller enumerated, nothing persisted until the user chooses, and the serialiser's deletion retired outright — `stripKeys`' output is its input modulo `_key`s plus the bit. The planner re-derived the mechanism from `c85945f` before writing the criterion rather than taking it from my finding, which is the right way to have used it. The "Reach of the principle" paragraph, enumerating all five content-loss doors and disposing of each, answers more than I asked.

I withdraw RC-1. Nothing in it survives as a required change.

### F-1 (finding, not a blocker) — M8-G's population argument contradicts the mechanism M8-G confirms

M8-G's property is correct and explicitly holds "regardless of its present size". The **population and observability argument attached to it is not**, and it is the part UAT will act on.

It states the population is *"bounded and possibly empty"* because *"the composer cannot compose one (V2 mode hides the content and embed editors, Classic mode hides the component button)"*, and that a member *"only the owner's SQL can seed"* — concluding that UAT records *"no member to observe, which is not a gap."*

That rules out **composing** a body in V2 mode. It does not rule out **retaining** one. Re-derived at `c85945f`:

- A stored 5712-shaped record (`{content:"hi", flags:32768}`, no components — or 5842's `components: []`) opens in **V2 mode** under M7-a, which says so explicitly for the no-`components` case.
- Its `content` stays in the draft: hidden from editing (`isClassicMode || !isEditing` guards the content editor) but retained, and still rendered in the read-only view.
- In V2 mode the component button **is** available: `showComponentButton = isEditing && isV2Mode && …` (`DiscordMessageEditor/index.tsx`). Only Classic mode hides it.
- Add one container. The draft now carries V2 components **and** a classic body — a row-E draft, composed entirely through the UI.

So the population is not possibly-empty: **rows 5712 and 5842 are its seeds, and they exist in production today** — the same two rows 012's backfill measured, cited in this criterion as evidence the population is empty. M7-a is what makes them reachable, and M7-a is in this plan.

**What follows, and it is a gain, not a loss**: M8-G *does* have a production-reachable human-observable form, needing no owner SQL — open 5712 in the composer, add one container, press Save; the ask must appear, naming both drops. Left as written, the plan tells UAT to record "no member to observe" for the single most important new behaviour D18 introduces. That would ship the criterion unobserved, which is avoidable in one paragraph.

**Required of no one; recommended to the planner**: replace the population sentence and the human-observable form with the above. The property, the instruments and the class need no change.

### The Out-of-Scope routing of the Medium — I judge it correct

Steering asked whether Out of Scope is the right disposition for a structural weakness. It is, and I would not have it absorbed:

- **No live defect survives 013.** M4-a takes `NewMessageModal.onSubmit`; the two canned-intro writers persist a fixed classic message, which I re-derived independently before registering the row.
- **M8-G narrows the debt further than the routing note claims.** It enumerates every `message.upsert` caller and binds each to the same ask. After 013 the writers share a *criterion* even though they do not share a *path* — so the residue is not "writers are ungoverned", it is "the governing is per-writer and enumerated, so a sixth writer inherits nothing". That is a smaller and more precise debt, and I have narrowed the Problem Area row to say so.
- **A criterion unifying every writer's path would need an owner ruling**, and the planner is right that it is not 013's to take unasked. The registry is where it belongs until the owner wants it.

### O-2 restated once, because M8-G now depends on it

M8-G excludes the send path on the ground that *"the send gate (`allowSave` requires `validateMessage` empty) admits no draft carrying both"*. That is sound, and it is the same reasoning I used. Note only that the gate is a client-side disabled button — `isDisabled={!allowSave}` — with no server-side check behind it and `sendWebhook` posting to Discord from the browser. It held before as a residue; it is now load-bearing for M8-G's own scoping. Worth one line in Risks so that a later chain adding a programmatic send path knows what it would be stepping around.

### O-1, O-3, O-4 stand unchanged.

---

## Verdict (rev 9, superseded): APPROVED_WITH_CHANGES

Rev 9 is the strongest plan I have reviewed in this workspace. M8's eight-cell partition over (V2 bit, `hasV2Components`, `hasClassicContent`) makes the JSON disposition a **total function over a named class** — every cell assigned, no cell derived, parity asserted across both surfaces (M8-F). That is the correct architectural shape, and it is what was missing when the same seam was planned in 001.

One required change. It is not a defect in what rev 9 says; it arises from a ruling that landed after rev 9 was written, interacting with a milestone rev 9 already contains.

---

## RC-1 (REQUIRED) — Removing `stripKeys`'s body deletion opens a write path D17 does not govern, and M7-a is what opens it

**Status of the input**: steering relayed that the owner ruled the `stripKeys` deletion of `content`/`embeds` (the Problem Area this architect registered on 2026-08-24) folds into 013 rather than being intended behaviour. The planner is pricing it. This finding is about *how* it must be priced.

### What I verified in the tree (`c85945f`), not taken from any document

1. **`validateMessage` gates exactly one thing: the send button.** `send/page.tsx` computes `isMessageValid` → `allowSave` → `isDisabled` on the send `Button`. The only other callers are `messageValidity.ts` (which *records* `valid`, 012's column) and `backfillValid.ts` (a script).
2. **The save path has no validation gate at all.** `saveMessage()` is reached from the Save button (`edit/page.tsx`, `_layout/Navigation.tsx`), a hotkey, and an effect; none consults `validateMessage`. `message.upsert` (`src/server/api/routers/message.ts`) does authorisation and `optionalIdMessageShape` parsing only — no normalisation, no rejection of an invalid record.
3. **`DiscordMessageEditor`'s `validateContentRequirements` call is presentational** — it renders `noContentError` as red text. It blocks nothing.
4. **V2 mode hides the content editor while editing but keeps the value**, and the read-only view still renders it (`isClassicMode || !isEditing` guards the content editor at `DiscordMessageEditor/index.tsx`).

**Therefore**: `stripKeys`'s deletion of `content`/`embeds` is not defence-in-depth against Discord. Discord is protected by the disabled send button. On the **save** path that deletion is the *only* thing preventing a V2-with-body record from being persisted.

### The interaction

M2-a states, as the ground for bounding its own class: *"No stored record is a row-E object (the composer cannot produce one: V2 mode hides the content editor, and every JSON submission resolves E before writing)."*

That premise is true at `c85945f` **because `stripKeys` deletes the body on save**. Remove the deletion, and M7-a — which this same plan adds — makes it false:

- A 5712-shaped stored record (`{content:"hi", flags:32768}`) opens in **V2 mode** under M7-a. That is M7-a working as intended, and its own human-observable form says so.
- The draft carries `content:"hi"`, live, uneditable in V2 mode, visible in the read-only view.
- The user adds one container. The draft is now bit + V2 components + body — **a row-E object, in the composer, with no JSON surface involved.**
- Save. No gate. Today `stripKeys` deletes the body and the record lands clean. Without the deletion it lands as a **stored row-E record**.

The record is then unsendable (the send gate refuses it, correctly) and the user has no in-composer control to remove the body, because V2 mode hides the content editor. That is the exact shape of the owner's observation 4, reintroduced at a new site by the fix for observation 4.

### What the plan must add

D17's subject is *"User submits JSON"*, so M8 reaches the modal Load and the paste. The composer's own save is not a JSON submission and is not in any of the eight cells. The owner's **governing principle**, however, reaches it plainly: a composer save that would drop the user's body is a "content must be lost" case, and the principle says *block, notify, and present a choice*.

The plan must state a disposition for the composer save of a row-E draft. I am not choosing for the planner; the options I can see, in the order I would rank them architecturally:

- **(a) One disposition function, three callers.** Extract the five-row disposition M8 builds so the modal Load, the paste, **and the composer save** call the same function. Row E's choice is then presented at the composer save too. This is the only option that leaves one implementation of the owner's ruling and discharges the Medium Problem Area (below) as a side effect rather than as extra work.
- **(b) Gate the write boundary.** `saveMessage`/`upsert` refuses a draft `validateMessage` rejects. Narrow and cheap, but it *blocks* without *offering the choice*, so it satisfies half the principle; and it changes save semantics for the 29 already-invalid production rows, which is a wider blast radius than it first appears.
- **(c) Narrow `stripKeys` rather than remove.** Keep the deletion only where the body is unreachable, drop it where the user can still see it. I rank this last: it preserves a silent mutation inside a serialiser, which is the shape of the original defect.

**The change I require is that rev 10 state which, and re-argue M2-a's parenthetical against it.** M2-a's sentence should become a property the plan *preserves* ("no save path lands a row-E record, because …"), not an assertion of impossibility — because the plan itself changes what the composer can produce.

---

## Observations (not blocking)

### O-1 — M4-a discharges one of three bypassing writers; the boundary stays a convention

The Medium Problem Area registered on 2026-08-24: three of five `message.upsert` call sites bypass `stripKeys`. M4-a fixes `NewMessageModal.onSubmit` — the one that matters, since it is the writer that stores imports. The other two (`message/f/[id]/page.tsx`, `message/m/new/page.tsx`) write canned intro messages and are Classic-only, so no live defect survives 013.

What survives is the **shape**: serialisation remains observed at the call site, not enforced at the boundary. Nothing stops the sixth writer. I am not asking 013 to fix this — but RC-1 option (a) would discharge it properly, which is why I rank it first. If the planner takes (b) or (c), the Problem Area row stays open in `system-architecture.md` and that is the correct outcome, not an omission.

### O-2 — Named residue: the only thing between a conflicted draft and Discord is a disabled button

Once `stripKeys` stops sanitising, the send path's protection is `isDisabled={!allowSave}` — a client-side UI state, not a boundary. No server-side check stands behind it, and `sendWebhook` posts to Discord directly from the browser. This is acceptable today (Discord discards the body itself, harmlessly). It is worth naming in the plan's Risks as a residue the ruling creates, so a later chain that adds a programmatic send path knows the guard was never structural.

### O-3 — M8-F is the property that makes this plan durable

Parity across both surfaces for the same object, with each fixture's expected row stated from its cell rather than computed by the reconciler under test, is exactly the discipline whose absence produced the defect I corrected in the architecture doc yesterday — a mechanism recorded from a grep hit instead of from behaviour. Keep M8-F's expectations-independence clause verbatim through any revision; it is doing more work than its length suggests.

### O-4 — A note on my own document

D-004, recorded 2026-08-24 from D15, carried the clause *"the import surfaces refuse it naming the conflict"* — D5 option (a), which D17 withdrew hours later. Corrected in `system-architecture.md` with a changelog row rather than silently. Recorded here because the plan's Handoff Notes point the architect at the master doc, and a reader arriving from rev 9 should know the ADR was extended, not merely written.

---

## Integration requirements

- No new layer, contract or core path. `Architectural-Surface: none added` in the plan's front matter is accurate and I confirm it — with the qualification that RC-1 option (a) *would* add one (a shared disposition function), and that would be an improvement, not a scope violation.
- Nothing in 013 touches `project-utils`, the schema, or the preview pipeline. Assumptions 1 and 3 hold against the tree.
- `system-architecture.md` reconciliation is owed **after** implementation, not now: the two V2 Problem Areas close, and the Data-flow bullets get their post-M1/M8 state. Recorded in the master doc's Roadmap Readiness so the next architect pass finds it.
