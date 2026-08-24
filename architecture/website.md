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
