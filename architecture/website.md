---
Status: Active
Last Updated: 2026-08-24
Record-Type: owner-sourced architecture record
Repo: website (hooks-gg/website)
---

# website — architecture record

## What this document is

The **why** behind `website`'s architecture, in the owner's own words. It is the companion to `system-architecture.md`, which states what the system *is*; this states what it is *for*, and which of its properties are load-bearing intent rather than accident.

**It is owner-sourced by construction.** An agent drafts the questions and transcribes the answers; an agent never supplies an answer by inference from code. That rule exists because an agent-authored "architecture" document launders inferred intent into an artifact every later stage trusts more than the code — and this repo has already paid for that once: `system-architecture.md` carried *"`sendWebhook` applies `IS_COMPONENTS_V2_FLAG`"* for months, a mechanism nobody observed, inferred from the constant appearing in the file (corrected 2026-08-24, `35906ab`).

**Growth rule**: the record grows by use. A chain that changes or discovers an invariant named here proposes the entry update as part of that chain, and the owner confirms the wording. Propose, never land alone.

**Known limitation of the method — verbatim transcription defeats paraphrase, not the author's own slips.** Quoting exactly protects against an agent softening, sharpening or summarising what the owner said. It offers no protection at all when the owner mistypes, because **a quoted sentence looks identical whether or not it says what its author meant**, and the grading scheme will mark the slip *owner-authored* — the strongest grade, decaying only by his withdrawal. The instance that established this: `preview-image-generator.md` P-5 was first answered *"There's purpose for retention"* and corrected the same day to *"There's **no** purpose for retention"*. The two readings point opposite ways — one protects an invariant a future chain must not touch, the other makes retention a new requirement to justify — and nothing in the artifact could have caught it. What follows for anyone maintaining these records: an answer that reads as an invariant is worth a sanity check against the mechanism and against his other answers before it is relied on, and a confirmed correction **replaces the original in place** with the correction noted, rather than being appended as a second version.

## How to read a provenance grade

Every entry carries one. They decay differently, and that is the point.

| Grade | What it means | How it decays |
| --- | --- | --- |
| **Owner-authored** | He stated the rationale in his own words. | Only by his withdrawing it. Strongest grade. |
| **Confirmed inference** | An agent wrote the mechanism; he ratified it. | **Only as good as the inference he was shown.** If the summary hid an error, his agreement does not repair it. Re-verify the inference, not the agreement. |
| **Only path known** | He chose it because he knew of no alternative, not because he weighed one. | **Open to revisit on evidence.** A better route is not a violation of this decision; it is the thing the decision was waiting for. |

A reader must never flatten these into "the owner said so".

---

## W-1 — The persist path must not delete a user's content

**Status**: ruled, and being enacted. **Provenance**: owner-authored.

He ruled that `stripKeys`' silent deletion of `content`/`embeds` under V2 components is not intended behaviour and is retired: the serialiser stops deleting, and the block-and-ask moves to the persisting writers.

Registered as **D18** in plan 013's Decisions Register, enacted as criterion **M8-G**. Cited, not restated — the register is authoritative and a copy here would drift from it.

**What it governs**: no serialiser on the persist, seed or hash paths removes user content on its own. `stripKeys`' output is its input modulo `_key`s plus the V2 bit set from structure.

---

## W-2 — The back end reflects what the front end allows

**Provenance**: owner-authored. **Asked** 2026-08-24: should `message.upsert` reject an unserialised message, or is "every caller remembers to call `stripKeys`" the intended contract?

> "idk what "unserialised" means. A message is allowed to be saved in a bad state (e.g., missing content, over character limits, etc.) The exception to this is probably what you're asking about: is it required that the _shape_ of the message be validated? I'd say that the back-end reflects what the front-end allows. If a shape is allowed in the front-end, then it's not silently morphed in the back-end. If there's a question of what's allowed in the front-end, that's the question to ask. (We're talking strictly about saving the message as it's being edited.)"

**The question's failure to land is part of the record.** "Unserialised" was this pipeline's vocabulary, not the product's, and he could not act on it. He answered the question underneath it anyway. Questions to this record are written in the product's terms or they waste his time — the fault was the asker's.

**What it governs**: persisting an invalid draft is *intended*. Validity is recorded (chain 012's `valid` column), never enforced at the write boundary. Where a shape should not be storable, the answer is to settle what the front end allows — not to add a server-side gate. Recorded as **D-005** in `system-architecture.md`.

**Note for the record, and it is the strongest evidence this workspace has that owner-sourced architecture pays for itself**: this answer was given on a different day, from a different direction, to a question about a different problem — and it **independently ratified a choice plan 013 had already made** (D18/M8-G puts the ask at the front-end writers and stops the serialiser morphing). It also *excluded* an option this architect had ranked second: gating `message.upsert` on `validateMessage`, which would refuse the bad-state saves he says are allowed. Had this record existed a day earlier, it would have predicted D18 and spared the wrong proposal.

---

## W-3 — One component tree serves both editing and preview

**Provenance**: ⚠️ **confirmed inference** — not owner-authored. **Asked** 2026-08-24: the master doc has D-001's rationale marked as inference; in your words, why one tree?

> "Agent's inference is correct."

**What he ratified** (recorded so a future reader can check the inference rather than the agreement) is D-001 as it stands in `system-architecture.md`: *WYSIWYG fidelity requires the preview to be pixel-true to the editor; therefore one `DiscordMessageEditor` tree, mode-switched by `editableState.showEdit`, with the consequence that no drift is possible between edit and preview rendering and every sub-component must implement both modes.*

**What he was shown, verbatim** (supplied by steering-hooks-013 2026-08-24; this is the message he replied to, and under this grade the framing *is* the evidence):

> **3 — one component tree for edit and preview.** The editor and the preview aren't two renderers. There's a single `DiscordMessageEditor` tree that gets switched between editable and read-only by a flag, so the preview *is* the editor with editing turned off. The screenshot pipeline reuses the same tree through the `/preview` route. The cost is that every sub-component has to implement both modes. The record has the reasoning as "WYSIWYG fidelity requires the preview to be pixel-true" — which is an agent's inference, not your words. **Why one tree?**

**This ratification is stronger than a bare agreement, and the record says so deliberately.** He was shown the mechanism, the cost, **and an explicit flag that the stated rationale was an agent's inference rather than his** — then answered *"Agent's inference is correct."* He was not agreeing with something presented to him as fact; he was told what was inference and confirmed it as inference. That is the best a confirmed-inference entry can be. The grade still holds — re-verify the mechanism, not the agreement — but the evidence behind it is complete, and the gap this entry previously carried is closed.

---

## W-4 — Preview images are made by screenshotting the app's own preview route

**Provenance**: ⚠️ **only path known** — explicitly **open to revisit on evidence**. **Asked** 2026-08-24: why screenshot the app's own `/preview` route rather than render server-side?

> "That's the only way I figured how to do it: to render an exact representation of the message in the browser, one had to load and snapshot it in the browser. If there are other ways, I just did not know of them."

**This changes what D-003 is, and the master doc's framing of it should not be inherited uncritically.** D-003 reads as a considered trade-off defended on fidelity grounds ("zero rendering drift"). His words frame it as the only route he knew. A reader who inherits the trade-off framing will weigh a proposed alternative against a rationale **nobody ever held**.

The hedge — *"If there are other ways, I just did not know of them"* — is the most useful sentence in the answer. It tells a future chain that this decision is open in a way D-002's (`api-extractor`, deliberately mirroring statbot) is not. The constraint that is real and survives any alternative: **an exact representation of the message**. Fidelity is the requirement; puppeteer is the implementation he could reach.

---

## W-5 — Only the Components V2 bit carries product meaning

**Provenance**: owner-authored. **Asked** 2026-08-24: is `flags` a general Discord flags field the user drives through JSON, or is the V2 bit the only one the product has an opinion about?

> "V2 is the only one the product has an opinion about"

**What it governs**: every other bit — 4 `SUPPRESS_EMBEDS`, 4096 `SUPPRESS_NOTIFICATIONS`, any future one — is user data that passes through every surface unexamined and unchanged. This **bounds** plan 013's D7 ("non-V2 bits stay writable"): writable, and also *not something the product asserts anything about*. A future surface that starts interpreting another bit is making a product decision, not an implementation one, and needs his ruling.

---

## W-6 — Cross-tab divergence is flagged, not coordinated

**Provenance**: owner-authored, with his own hedge; mechanism confirmed against the tree before recording. **Asked** 2026-08-24: is a message being edited in two tabs a shape the product intends to support at all?

> "Sure. Not relevant to 013, but iirc there's a `pusher` or similar service employed to try and allow some kind of coordination (or rather, flag when front-end state doesn't match back-end because of a different tab saving)"

**His recall is accurate, including the mid-sentence correction from "coordination" to "flag".** Confirmed at `c85945f`: `shared.ts` `upsertMessage` triggers `message-update` on a per-message Pusher channel carrying `hashMessage(message)`; each open composer subscribes (`providers/MessageProvider/usePusher.ts`) and compares against `hashMessage(stripKeys(current))`, raising the *"Message Update Detected"* prompt offering Reload on mismatch.

**What it governs**: the product intends to **detect** divergence and offer a reload. It does not intend to merge, lock, or reconcile. A future proposal for real collaborative editing is a new product decision, not an extension of this one.

Recorded in `system-architecture.md` as Runtime Flow 1b — the service was absent from that document entirely until this answer prompted the check.

---

## Open questions for the owner

None outstanding at 2026-08-24.
**Closed 2026-08-24** — *what the front end allows when a V2-flagged record already carries a body*. His answer, verbatim: *"We'll fix the two outliers and the question becomes moot because that shape will be disallowed. Whatever default consequence there then is does not need to be decided or reasoned around."* No editor change; the two production rows are to be repaired so the shape ceases to exist. **The shape is intended not to exist, rather than to be handled** — he has explicitly ruled out reasoning about the default consequence, so no decision, trade-off or alternative is recorded for it, and the absence of one is not a gap in this record.

---

## Recovered rationale — agent-derived, not owner testimony

*The provenance-grade table above governs W-1…W-6 only; it does not apply to the entries below.*

### A-1 — Zod issues are formatted per issue and joined here; never split out of library output

**Mechanism**: `src/utils/formatMutationError.ts` (`formatZodIssues`), called by
`src/app/message/m/[id]/_components/JsonModalBody.tsx` and
`src/app/message/_components/NewMessageJsonInput.tsx`.

`formatZodIssues` formats **each** `ZodIssue` on its own — a one-element array has no inter-issue
joiner to collide with — and performs the join itself. The invariant is one line per issue,
regardless of what any single issue's own message contains.

**The rejected alternative is the point of this entry.** The superseded implementation asked the
library to format the whole array and then recovered the issue boundaries by splitting its output on
a delimiter. The message payload is user-supplied and free to contain that delimiter, so the
boundary recovery was unsound for a class of inputs rather than merely untidy. A future change that
formats the array in one call and splits the result re-opens that class, and will look correct in
every test whose fixture messages happen not to contain the delimiter.

**Do not** reintroduce a delimiter-split boundary recovery here, and do not "simplify" the per-issue
map into a single whole-array call.

Register: **D47** (`M9-a`) in `planning/closed/013-components-v2-editing-surfaces.md`. The class has
three call sites, not one.

### A-2 — A Load confirmation names the mode the commit will actually set, not the mode the draft reads as

**Mechanism**: `src/utils/index.ts` (`settledMode`, `computeLoadDiff`, `describeLoadDiff`), consumed
by `JsonModalBody.tsx`'s Load confirmation; disposition source `resolveContentLoss` in the same
module; the raw predicate is `isMessageV2`.

The invariant: **the mode a Load confirmation names must be the mode `commitLoad` actually sets.**
That is `resolveContentLoss`'s `disposition.mode` over the disposed draft — never the raw
flag/structure read `isMessageV2` gives over the undisposed one.

The two disagree, and the disagreement is not hypothetical. For a draft carrying the Components V2
flag with classic content and no V2 components, the raw draft reads as V2 **on the flag alone**,
while the disposed result is Classic with the flag cleared. A confirmation built on `isMessageV2`
therefore tells the user they are staying in V2 immediately before the commit moves them to Classic.

**The one branch that does read raw, and why it is safe.** Where `resolveContentLoss` reports
`requiresChoice`, there is no settled mode to report — the user has not chosen yet — and
`settledMode` falls back to the structural/flag read, matching `isMessageV2`'s own predicate. That
branch is unreachable from the Load button: the button is disabled unless `validatedDraft` is set,
and `JsonModalBody`'s parse effect sets `validatedDraft` to `null` on exactly the `requiresChoice`
path (`commitLoad` also returns early on it). A change that enables Load while a choice is pending,
or that populates `validatedDraft` on the `requiresChoice` path, makes that fallback reachable and
silently wrong. **This is a one-change warning: the fallback's safety is a property of
`JsonModalBody`'s gating, not of `settledMode`.**

Register: **D47** (`M9-b`) in `planning/closed/013-components-v2-editing-surfaces.md`. The
confirmation surface was introduced earlier under that plan's `M2-c` on the raw predicate; this
entry records why the predicate was replaced.

### A-3 — The dropped-types notice has exactly one definition, and the consolidation was earned by observed drift

**Mechanism**: `src/server/api/utils/shapes.ts` (`describeDroppedComponentTypesNotice`), called by
`NewMessageJsonInput.tsx`, `NewMessageModal.tsx` and `JsonModalBody.tsx`.

Three surfaces render the "dropped component types" notice, and they render it from one function.
The consolidation is not a style preference: the three sites previously carried the string inline
with no shared constant, and **one of them had already drifted** — a trailing period the other two
did not have. The class the shared definition closes is copy divergence across surfaces the user is
expected to read as one message.

A future change that needs the notice on a fourth surface calls this function. A change that needs
different wording on one surface is a product decision, not a local edit — see **P-1**, which is why.

Register: **D49** (`M9-f`) in `planning/closed/013-components-v2-editing-surfaces.md`. The notice's
continued existence on these three surfaces is governed by **D9** and **D29**; **D40** withdrew it
from the bot-code entry point **only**, and expressly preserved it here. `W-1` above is the nearest
neighbour and is not in tension with this entry: `W-1` governs what the persist path may delete,
this entry governs how one notice is defined.

### P-1 — The dropped-types notice wording is the owner's edit, and the trailing-period divergence entered with it

The notice string that
`describeDroppedComponentTypesNotice` returns — `Not supported on Hooks.gg: <types>` — is **the
owner's edit of agent copy.** An agent wrote the notice in an earlier effort; he rewrote its
wording at commit `2d90e8a` ("remove useless message", authored `lando <calrissian@opayq.com>`),
in the same commit that deleted the bot-code path's notice component. **D40** in
`planning/closed/013-components-v2-editing-surfaces.md` records that the superseded wording was
agent-derived and carries his stated objection to it.

Two consequences a reader cannot derive from the tree:

1. **The shipped wording is his and is not a candidate for agent tidying.** He chose it, on a
   user-facing surface, in preference to what an agent had put there; changing it is a product
   decision that goes to him, not a refactor. This is the copy-side counterpart of `W-2` — the
   front end settles what is allowed — applied to what the front end *says* rather than to what it
   accepts.
2. **The trailing-period divergence that `A-3` consolidated away entered with that edit.** What
   `2d90e8a` shows: the three sites it replaced were **identical** to one another beforehand, each
   reading ``Not carried: ${…}. Discord does not support these on hooks.gg.``; after it,
   `NewMessageJsonInput.tsx` and `NewMessageModal.tsx` read ``Not supported on Hooks.gg: ${…}``
   while `JsonModalBody.tsx` reads ``Not supported on Hooks.gg: ${…}.`` — a trailing period the
   other two do not carry, left over from the sentence-final period of the wording being replaced.
   The copy the edit superseded held no divergence; three hand-edits in one commit produced one.
   That is the concrete evidence that this string wants a single definition.

### A-4 — Message validity lives in one module, and its counters and bounds have fixed homes

**Grade**: agent-designed — a pattern read from code at `7ce866b`, not his intent; re-verify against the code.

**Mechanism**: `src/utils/limits.tsx` `validateMessage` is the single validity predicate. It is read by the send gate, by `isMessageValid` (`src/server/api/utils/messageValidity.ts`, which writes the stored `valid` column on save) and by `src/scripts/backfillValid.ts`. A counter that a validator needs lives in that module beside the validator, typed structurally (`sumDisplayableText`), so the same helper accepts editor drafts and stored `MessageData`. Bounds are constants in `~/constants` (which re-exports `./messageLimits`), and the editor and the save schema (`shapes.ts`) read the same constant for the same bound.

**Consequence a change must carry**: a change to `validateMessage`'s refusal set changes stored `valid` only for rows saved afterwards. The backfill re-derives `valid IS NULL` rows only, and the public v1 API serves the stored value. A predicate change therefore states its residue for already-stored rows (plan 015 AF-1).

---

## Addendum changelog

| Date | Rev | Change |
|---|---|---|
| 2026-09-08 | 1 | Added `A-1`…`A-3` and `P-1`, recovered from design rationale this repo had carried in its source comments. Agent-derived; not owner testimony. |
| 2026-09-08 | 2 | `P-1` corrected on the owner's own account of the code, his words: *"it's my edit of agent copy (agent's was the previous effort)"*. Superseded wording claimed the notice string was his authorship rather than his edit of an agent's. Consequence 1 stands. Consequence 2 stands and is now stated from `2d90e8a`'s diff. |
| 2026-09-08 | 3 | steering-S038 | P-1 folded into the recovered-rationale section under the owner's 2026-09-08 placement rule (annotated lines only); its claim framing removed, substance unchanged. |
| 2026-11-08T05:17 | 4 | architect-hooks-015 | Added `A-4` (agent-designed) from the plan 015 conformance pass: where message validity, its counters and its bounds live. |
