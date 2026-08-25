---
UUID: 8f3fa8c3
Status: Addressed
Status-Detail: >-
  Re-statused 2026-08-24 by steering-hooks-013-2 under plan 013's M6 (Record closure). No longer
  unassigned and no longer awaiting research: research 8311155a answered it, and plan 013
  (013-components-v2-editing-surfaces.md) absorbed the result and has implemented against it.
  Per that plan, 013 addresses observations 1, 2, 5, 6 and 7 directly. Observation 3 (toggle to V2
  clears content, with a prompt) is by design and untouched. Observation 4 is addressed on its
  stranded-flag half only (D15 + M7: a record whose bit is set without V2 components now opens in
  V2, and one toggle to Classic clears the bit losslessly); its other half - the indicator is the
  mode, and the toggle to V2 removes classic data by design - is unchanged, and a dedicated control
  is explicitly not in scope. TERMINAL 2026-08-25: chain 013 RELEASED - `website` serving ref
  `master` `2d90e8a` -> `b56570d`, 20:30:01 UTC, recorded at deployment record §16 and plan 013 rev
  51, which are the authority for the release act and are not restated here. The release was the
  only condition this document held itself open against, so it is `Addressed` and moved to
  `closed/`. Nothing in the mapping above is re-derived, revisited or amended by that closure.
Owning-Stage: >-
  Chain 013 (plan 013-components-v2-editing-surfaces.md), discharged. The record was steering's and
  the one act that remained - the terminal re-status at 013's release - has been made. Nothing is
  owed on this document by any stage.
Review-Trigger: >-
  Re-read this if users report losing message content while editing, if records appear whose stored
  type disagrees with their contents, or if anyone proposes work on the JSON editor, the
  message-type toggle, or "Save as..." — any of those would touch this question and should not
  proceed without it being answered.
---

# Handoff — is Components V2 supported outside the create-and-send flow?

**Raised:** 2026-08-23, by the owner, from first-hand use of the product.
**Written by:** `steering-hooks-012`, as the record of what he observed and directed.

**Provenance, and it matters for how you treat what follows.** Everything in "What was observed" is
the owner's own account of behaviour he watched happen. He is the instrument for it: none of it has
been re-derived, reproduced or verified by any agent, and no agent has read the source involved. Treat
it as a reliable report of symptoms and an unreliable account of causes — he was describing what he
saw, not diagnosing it, and says so.

**A note on scope, from him directly: do not narrow this.** This was raised while something else was
in flight, and he was explicit that the researcher must not assess it against that work or treat it
as a sub-problem of it. The question here is generic and stands on its own. If you find yourself
scoping the investigation to whatever else is happening in the repo, that is the failure mode this
paragraph exists to prevent.

---

## What was observed

**1. JSON import sets the message type to Classic**, apparently regardless of what the imported JSON
describes.

**2. When imported JSON implies a different type than the one currently set, the type switches but
the message ends up empty.** His reading of the symptom — offered as a guess, not a finding — is that
the clear-on-type-change behaviour runs *after* the import rather than before it, so the import's
content is discarded by the very act of switching to the type the import asked for.

**3. Toggling a message to Components V2 clears its existing content.** A prompt is shown and the
clear is the accepted, deliberate behaviour of that toggle.

**4. There is no way to remove the Components V2 indicator without either clearing the content or
hand-editing the JSON.** Those are the only two routes he could find.

**5. "Save as..." on a Components V2 message is broken.**

**6. The JSON view may not support Components V2 at all**, and the import may be silently stripping
content rather than failing.

**7. The underlying state is not observable from the UI.** There is no view of what is actually
stored. The only signal available is an error message reporting a conflict between a Components V2
indicator and the content field — so the state has to be inferred from an error, which is why (6) is
a suspicion rather than a conclusion.

## The hypothesis he stated

That the Components V2 implementation covered **only the flow of creating a message and sending it**,
and that everything else — editing an existing one, importing it, exporting it, duplicating it,
changing its type — was likely never built for V2.

He offered this explicitly as a hypothesis about what happened, not as a finding. It is the most
economical explanation of the symptoms above, which is exactly what should make a researcher careful
with it: it predicts the symptoms well and would be easy to confirm by looking only where it points.

## What is not established

- Whether import **strips** content, or whether the content was never successfully set in the first
  place. These have the same appearance from outside and different causes.
- Which flows are affected. The list above is what one person hit while doing something else — it is
  a sample, not an enumeration.
- Whether any of the data loss is **silent**. Some of it announces itself; whether all of it does is
  unknown, and silent loss is a materially worse problem than loud loss.
- Whether the stored representation is even capable of round-tripping V2, or whether the gap is only
  in the editing surface.

## Why it is worth research rather than a fix

Each symptom above could be filed as its own bug, and fixing them one at a time is available. But if
the hypothesis is right, they are not separate bugs — they are one unbuilt half of a feature, and
patching them individually produces a surface that mostly works, which is the condition under which
data loss becomes silent rather than visible. Establishing which of those two worlds this is should
come before anyone commits to fixing anything.

**A useful starting shape**, offered without prejudice to a better one: enumerate every flow that
reads, writes or changes a message's type or contents — create, send, load for edit, JSON import,
JSON export, "Save as...", duplicate, type toggle — and for each, establish whether Components V2 is
represented at all, whether a round trip preserves the message, and whether any failure is silent.
The enumeration is likely worth more than any individual finding, because the gap being described is
an absence, and absences are found by listing what should be there.

## Related open work

A separate handoff is open on whether the JSON editor can store configurations the composer itself
would refuse (`handoff/json-editor-bad-configurations-2026-08-23.md`, UUID `cb83fd7b`). It overlaps
this question and was raised in a different context with its own framing. Read it for the symptoms if
useful, but **treat this question as independent** — inheriting its scope would re-narrow exactly
what the owner asked to keep open.

## Changelog

| Date | Who | What |
|---|---|---|
| 2026-08-24 | **steering** (steering-hooks-013-2) | **Re-statused under plan 013's M6.** `Status: Open` -> `Active`; `Status-Detail` and `Owning-Stage` rewritten to record that research `8311155a` answered the question and plan 013 absorbed and implemented it, with observation 3 and half of observation 4 recorded as deliberately out of scope. **Not terminalised** - 013 has not released. **Three judgements are steering's own, not the plan's**: (1) M6's Objective says *"this plan proposes the wording"* and the plan contains no proposed wording, so the wording above is steering's composition from the plan's observation mapping; (2) no fleet precedent exists for re-statusing a handoff a chain has absorbed - all six handoffs in this repo, including chain 012's own after 012 released, stand at `Open` - so the status value is steering's choice from the lifecycle vocabulary; (3) this document had no changelog section and this table was added to carry the dated line M6's acceptance requires. The gap at (1) is recorded as a held planner item against plan 013. |
| 2026-08-25 | **steering** (steering-013-close [4190de]) | **CLOSED — `Status: Active` -> `Addressed`, and the file moved to `handoff/closed/`.** The only condition this document held itself open against was 013's release, stated in its own `Status-Detail` as *"moves to a terminal status and into closed/ at release, not before"*. That release happened: `website` `master` `2d90e8a` -> `b56570d`, 2026-08-25 20:30:01 UTC. **Verified at the sources, not from a message**: deployment record §16 (`deployment/closed/013-components-v2-editing-surfaces-deployment.md`) and plan 013 rev 51 (`Status: Released`), with `uat/closed/013-components-v2-editing-surfaces-uat.md` rev 53 showing the blocking-condition register closed and `NOT EXECUTED` nowhere. **Executed, not judged**: the criterion was recorded here in advance and is mechanical; no part of the observation mapping above is re-derived, revisited or amended, and **nothing is claimed about observations 3 and 4's out-of-scope halves, which remain out of scope and unaddressed by 013**. Closed on the owner's direction in session, 2026-08-25. |
