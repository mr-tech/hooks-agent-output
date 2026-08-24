---
UUID: 7c4e1a92
Status: Open
Status-Detail: >-
  Issued 2026-08-24 by steering-hooks-013-2 under plan 013's M6 (Record closure). Plan 013
  established an architectural invariant that system-architecture.md does not yet record, and that
  supersedes two statements previously believed true. The correction is deliberately NOT made by
  chain 013 - M6's wording is that it "is handed to the architect (not made here)" - because the
  record is the architect's to write. Nothing here is derived by this thread: the content is plan
  013's Handoff Notes verbatim in substance, and the plan is the authority.
Owning-Stage: >-
  Architect. The act is a pass over architecture/system-architecture.md recording the invariant
  below and removing the two withdrawn statements. No code change is implied and none is wanted.
Review-Trigger: >-
  Re-read this if anyone proposes work on the message-mode toggles, the JSON import or reconcile
  paths, the persist/seed/hash serialisers, or any change keyed on the Components V2 flag - and
  before any future plan cites system-architecture.md for what determines a message's mode, since
  the record is currently wrong on exactly that point.
---

# Handoff — record plan 013's mode invariant in `system-architecture.md`

**Raised:** 2026-08-24, by `steering-hooks-013-2`, discharging plan 013's M6.
**Written by:** steering. **Nothing here is re-derived by this thread.** The substance is plan
013's own Handoff Notes entry "For the architect"; plan
`planning/013-components-v2-editing-surfaces.md` is the authority and should be read directly
rather than trusted through this document.

## Why this exists

Plan 013 wrote down, for the first time, what determines a message's mode. It differs from what the
research proposed and from what an earlier revision of the plan itself asserted. `system-architecture.md`
records neither the new invariant nor the withdrawal of the old ones, so a reader of the architecture
record today is told something the chain has established is wrong.

Chain 013 deliberately does not make the correction. M6's wording is that it "is handed to the
architect (not made here)."

## What to record

The invariant is **Objective clause 3 as it stands at plan rev 12**:

- **The flag is the mode** for what the composer loads — V2 iff the bit is set **or** V2 components
  are present; structure sets the bit on save; the toggles set and clear it.
- **A JSON submission is disposed of by D17's five rows**, under the owner's governing principle
  (the table at the plan's M8), which reaches **every** content-loss door.
- **No serialiser on the persist, seed or hash paths removes a classic body on its own** (M8-G,
  D18). The architect's own `35906ab` finding is folded into this by the owner.

## What to remove, because it is withdrawn and still stands in the record

- **"Flags derive from structure"** — the research's proposal, **withdrawn at D15**.
- **"A bit over content is refused at import"** — plan rev 8's own statement, **withdrawn at D17**.
- The **"Data flow"** line's second serialiser is the other correction.

## Status of the work this describes

Plan 013's implementation of all of the above is complete and code-reviewed (M1, M2, M3, M4, M7, M8).
It has **not** been released, and QA Phase 2 and UAT have not returned verdicts. The invariant is a
statement about the design, not a claim that the release has shipped — recording it does not depend
on the release, and it should not be worded as though it had.

## What this handoff does not ask for

No code change. No plan change. No release action. If the architect finds the invariant itself
wrong, that is a finding against plan 013 and routes to steering, not a silent divergence between
the two records.

## Changelog

| Date | Who | What |
|---|---|---|
| 2026-08-24 | **steering** (steering-hooks-013-2) | **Issued**, discharging plan 013's M6 acceptance clause *"the architect handoff is issued"*. Content is the plan's Handoff Notes entry for the architect; no part of it re-derived here. Issued as a document rather than by invoking an architect session, because M6's wording hands the correction over rather than making it, and because steering authors handoffs in this repo. **Recorded as steering's own reading**: an earlier reading of M6 treated this clause as requiring an architect *run*, which would have needed an owner selection prompt under the standing warmth rule and would have held M6 — and with it QA Phase 2 — until the owner was available. That reading was wrong and is corrected here. |
