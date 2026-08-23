---
UUID: cb83fd7b
Status: Open
Status-Detail: >-
  Owner-directed follow-up, raised while ruling on chain 012's OQ-1 and deliberately kept out of that
  chain. The composer's mode-switch modal already treats message mode as a real property, so the
  question is whether the JSON editing path can still store configurations the composer itself would
  refuse. Nothing is built, nothing is investigated, and no effort is committed to — the owner's
  instruction was that this is worth a handoff and researching later.
Owning-Stage: >-
  Unassigned. The next step is research, not planning: whether the JSON editor can produce records
  the corrected send gate would reject is an open question about the product, and chain 012 proceeds
  without its answer either way.
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

## Sources

- `planning/012-message-valid-field.md` — rulings D5 (the composer-bug ruling, verbatim) and the
  Proposed Re-Scope section; the 5712 mechanism is established there and is not restated here.
- `handoff/message-valid-field-for-statbot-2026-08-23.md` — the contract chain 012 implements, and
  the origin of the 5712 case.
