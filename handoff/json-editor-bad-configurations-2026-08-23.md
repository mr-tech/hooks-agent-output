---
UUID: cb83fd7b
Status: Active
Status-Detail: >-
  Re-statused 2026-08-24 by steering-hooks-013-2 under plan 013's M6 (Record closure). No longer
  unassigned and no longer awaiting research: research 5c1e9d27 answered it and bounded it (F4) to
  one clause - what the JSON reconciler does with a flags bit that disagrees with structure - and
  plan 013 carried it as a rider from its first pass under D2. Plan 013 records that this handoff is
  closed by M8-B and M8-D, which are D17's own rows, delivered and code-reviewed. The rider
  structure itself was retired at plan rev 11 (critique M-9): D17 rules rows B and D directly, so
  there is no yield clause and no priced drop, and what remained of the attachment is traceability -
  which this line is. Deliberately NOT terminal: chain 013 has not released, and this document moves
  to a terminal status and into closed/ at release, not before.
Owning-Stage: >-
  Chain 013 (plan 013-components-v2-editing-surfaces.md), as a rider under D2. The record is
  steering's; the remaining act on this document is its terminal re-status at 013's release.
Review-Trigger: >-
  Re-read this if 5712-shaped records keep appearing after chain 012's composer fix ships, if the
  backfill distribution report shows more invalid records than the composer alone explains, or if
  anyone proposes flag normalisation on the save path — that change would close this question by
  construction and make the research moot.
---

# Handoff — can the JSON editor store configurations the composer would refuse?

**Raised:** 2026-08-23, by the owner, while ruling on chain 012's OQ-1.
**Written by:** `steering-hooks-012`, as the record of what he directed. Nothing here is derived by
this thread; the mechanism detail belongs to the sources cited below and has not been re-verified here.

---

## What he said

Ruling on whether chain 012 should fold a stored-flags clause into the validity predicate, he
authorised the composer fix instead, and added — verbatim:

> "and for a perhaps stronger reason that makes the backend change idiomatic, when toggling between
> the message types, the UI "Switch message mode?" modal appears warning the user of losing the
> current content. If there is not a bug in the UI, then it's maybe possible that JSON editing allows
> for bad configurations. But that's a different effort worth a handoff and researching later."

Three distinct things are in that sentence, and only the first is settled:

1. **An observation about his own product**, and he is the instrument for it: the composer already
   shows a "Switch message mode?" modal warning about content loss when toggling message types. The
   UI therefore already treats mode as a real property of a message, which is what makes chain 012's
   flags-aware send gate idiomatic rather than an extension.
2. **A hypothesis, stated conditionally and not as a ruling:** *if* there is no bug in the UI, JSON
   editing may be how bad configurations get stored. He did not withdraw the composer-bug ruling
   (chain 012's D5) — he named a second possible origin for the same shape.
3. **A direction:** this is a different effort, worth a handoff and researching later.

## Why it is not part of chain 012

Chain 012 corrects the composer's send gate and adds a `valid` field that marks such records false.
Neither outcome depends on knowing where a 5712-shaped record came from — the field marks it false
whatever wrote it. Folding the question in would have coupled a schema-and-backfill chain to an
open-ended investigation of a second editing surface.

The owner also ruled, separately and in the same exchange, that **flag normalisation on the save
path stays out** ("Leave it out, note it"). That matters here: with the save path unchanged, any
write surface that bypasses the composer can still store the shape. This handoff is the question of
whether such a surface exists in practice.

## What research would need to establish

Stated as questions, not as a plan — whoever picks this up derives its own shape:

- Can the JSON editing path write a stored record the corrected composer send gate would refuse, and
  specifically the `flags: 32768` + content + empty-components shape that produced chain 012?
- Does the JSON path go through the same save code as the composer, or around it?
- Do such records exist in production today beyond message 5712, and did they come from that path?
  Chain 012's backfill distribution report (milestone M5) is the natural instrument and will exist
  before this is picked up.

## Where to start — pointers, not findings

Supplied by `planner-hooks-012` in its rev-3 report to steering, 2026-08-23, out of chain 012's
exploration record (commit `8d012bf`). Recorded here as **surfaces to examine**, with their claims
left where they were established — whoever researches this re-derives them rather than inheriting
them from this document:

- The JSON-import path runs through tRPC `message.upsert`, validated by `discordMessageImportShape`
  (`website` `src/server/api/utils/shapes.ts`). How `flags` is constrained there, if at all, against
  content and embeds is the first thing to establish.
- `enforceImportMutualExclusivity` (`website` `src/utils/index.ts`) reconciles imported JSON.
  **The open question named by the planner:** whether it clears or preserves a stray flags bit when
  the structure is classic. If it preserves one, import is a mint for 5712-shaped records; if it
  clears one, this handoff may close without an effort.
- `shapes-v2.test.ts` in `website` is where existing coverage of `flags: 32768` lives.
- Two facts that bound the blast radius once chain 012 ships: every import flows through
  `upsertMessage`, which M4 makes recompute `valid`; and D10's on-next-touch note (save-path flag
  normalisation) sits in 012's Out of Scope, so this research may be that next touch.

## Sources

- `planning/012-message-valid-field.md` — rulings D5 (the composer-bug ruling, verbatim) and the
  Proposed Re-Scope section; the 5712 mechanism is established there and is not restated here.
- `handoff/message-valid-field-for-statbot-2026-08-23.md` — the contract chain 012 implements, and
  the origin of the 5712 case.

## Two findings established by execution, 2026-08-23

Added by `steering-hooks-012`. These arrived by a route other than the normal handoff: a read-only
determination this thread commissioned to answer a question raised by statbot's code reviewer during
chain 012, briefed with the question and not with where to look. It worked by loading the modules
into Node and running payloads through them, so these are execution results rather than readings.
They are recorded here **because this document is the only durable place they fit** — no research or
analysis document established them, and a fact that lives only in a session's context is invisible by
construction. Whoever picks this up should re-derive both before acting on either.

- **The JSON modal's Load destroys `components` and `flags`.** `JsonModalBody` seeds its editor from
  `standardizeMessage(stripKeys(message).data)`, and `standardizeMessage` (`website`
  `src/utils/index.ts`) rebuilds the object from scratch copying only `username`, `avatar_url`,
  `content`, `allowed_mentions` and `embeds`. Opening the modal and pressing Load on an unchanged
  payload therefore silently drops the record's components and clears its V2 flag. Chain 012's QA
  identified this same path as the accidental, undiscoverable *escape* from a stranded flag
  (its finding F-QA1); the determination shows it is also an active data-loss path. Both readings are
  true of the same mechanism, and the second is the one that matters to this effort.
- **`SUPPORTED_TOP_LEVEL_TYPES` and `topLevelComponentShape` disagree about Thumbnail (11).** The
  supported-types set includes it; the shape union has no thumbnail member. So a top-level thumbnail
  survives the lenient import filter and then hard-rejects the whole import, instead of being
  filtered out as the lenient path intends. The lenient shape is not lenient for that one type.

One determination that **narrows** this effort rather than widening it: a payload whose only
Components V2 elements sit nested beneath a top-level Action Row is not representable by any route,
including this one — an Action Row's children are typed as link buttons only, and every other
top-level member is itself a V2 type. So the JSON path cannot mint a nested-only record, and this
research need not look for one.

## Changelog

| Date | Who | What |
|---|---|---|
| 2026-08-24 | **steering** (steering-hooks-013-2) | **Re-statused under plan 013's M6.** `Status: Open` -> `Active`; `Status-Detail` and `Owning-Stage` rewritten to record that research `5c1e9d27` (F4) answered and bounded it, that plan 013 carried it as a rider under D2, and that plan 013 records it as closed by **M8-B/M8-D** - delivered and code-reviewed. **Not terminalised** - 013 has not released. **The same three judgements recorded on handoff `8f3fa8c3` apply here**: the wording is steering's composition because M6's promised proposed wording is absent from the plan; the status value is steering's choice because no fleet precedent exists (all six handoffs in this repo stand at `Open`, chain 012's included, after 012 released); and this changelog table was added because the document had none. The first is recorded as a held planner item against plan 013. |
