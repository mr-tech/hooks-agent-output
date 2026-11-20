---
UUID: 4b1e9d07
Status: Addressed
Status-Detail: "Discharged by plan 017 (released website 787bec5 on 2026-11-19) and its post-deploy row B-8, executed PASS 5 of 5 on live hooks.gg on 2026-11-20 02:55-02:56Z by uat-hooks-017-looks as a test account: with two tabs on one message, the saving tab never showed Message Update Detected while typing 38-263 ms after the save, and the other tab showed it 0.64-0.71 s after each save. Carrier handoff/017-existing-items-backlog-post-deploy-2026-11-19.md, row B-8, record aaccb15."
Owning-Stage: >-
  Planner, to decide whether this warrants a chain and at what size. Deliberately NOT scoped,
  diagnosed or routed to an implementer here - steering performed no investigation, and a handoff
  that guesses at a mechanism sends its reader looking in the place the guess names.
Review-Trigger: >-
  Re-read this before any work on the save path, the message-update / concurrent-edit detection,
  or the multi-tab reconcile - and before anyone cites BC-14 as evidence that the original
  user-reported defect is fully fixed in production, because BC-14 returned a finding on one limb
  and its two count-based limbs were never numerically observed.
---

# Handoff — the tab that performs a save raises "Message Update Detected" against its own save

## The observation, verbatim and complete

The owner, 2026-08-25, reporting release condition **BC-14** executed against production `a74b9e2`:

> **Everything is fine except "Message Update Detected" still occurs on save in the tab the save
> executed.**

**That sentence is the entire evidence base.** He was asked for four things; this is his report on all
four, and the quoted words are all he wrote about the failure.

## What the check asked, so a reader can see exactly what was and was not observed

BC-14's operator text (authored by `uat-hooks-013-6`, delivered verbatim) asked four things:

- **(a)** Save As a V2 message with components → the copy has every component. **Count them.**
- **(b)** On the copy, open Message JSON → the components are there. **Count them there too.**
- **(c)** Same message in two tabs; change only a component in tab 1 and Save → **tab 2** shows
  "Message Update Detected".
- **(d)** Save again with nothing changed → **nothing is raised.**

**What is actually established:**

| Limb | State |
|---|---|
| (a) | Reported fine, no count given |
| **(b)** | **NOT numerically observed.** The text explicitly said *"'It looked right' is not an observation of (b)"* and asked for both numbers. **They were not supplied.** (b) rests on "everything is fine" |
| (c) | Reported fine |
| **(d)** | **THE FINDING** — the prompt fires in the saving tab |

**(b) is called out because it was designed as the limb that fails silently** — the screen can look
correct while the JSON is wrong. It is recorded here as **uncovered**, not as passed.

## Why (c) passing makes this WORSE, not better — `uat`'s point, and it reframes the defect

**Limb (c) PASSED and limb (d) FAILED.** So the cross-tab protection **exists and works** — and the same
mechanism is firing falsely against the user's own save.

`uat-hooks-013-6`, whose register owns BC-14 and whose own cell for the row predicted this exact harm:

> **"trains him to dismiss the real ones"**

**A protection that cries wolf is being desensitised by its own false positives.** That is a different and
worse defect from a stray popup: the failure mode is not the annoyance, it is that the **working** half of
the feature stops being trusted. **(c) passing and (d) failing is a worse combination than both failing.**

## The word "still" is UNRESOLVED and must not be inherited

His sentence says the prompt **"still occurs"**. That admits two readings which scope this work
differently:

- **pre-existing**, and survived chain 013 without being touched; or
- **surviving the fix that targeted it** — i.e. 013 addressed this surface and did not fully land it.

**Neither reading is adopted here.** Whoever picks this up **establishes which, from the code and the
history**, and does not inherit an assumption from that line. `uat` flagged it as the convenient-reading
trap and declined it; so does this handoff.

## What this handoff deliberately does not say

- **No mechanism.** Steering did not read the save path, the update-detection code, or any test. The
  symptom is his; the cause is unexamined.
- **No severity, no priority.** Not steering's to assign.
- **No claim about whether 013 introduced it.** His words are *"still occurs"*, which is his
  characterisation and is quoted rather than interpreted. Establishing whether it predates the chain
  is a first task for whoever picks this up, not an assumption to inherit.
- **No scope.** Whether this is a one-line guard or a reconsideration of concurrent-edit detection is
  unknown here.

## Chain 013's closing state, as context rather than as a claim on this work

013 released 2026-08-25 20:30:01 UTC and the owner ruled it complete. Of its four post-deploy release
conditions, **BC-17 was WITHDRAWN by him**, **BC-12 and BC-20 he declined to execute**, and **BC-14
returned this finding.** So **three of four terminalised without their observation being made** - his
call, legitimately his to make, and recorded so that a later reader cannot mistake a declined row for a
passing one.

**The user-reported defect BC-14 exists to confirm fixed in production is therefore confirmed only on
the owner's "everything is fine", with one limb failing and one limb never numerically observed.**

## Trigger read, 2026-11-11 (`steering-queue-hooks`)

The `Review-Trigger` fired (work on the save path, chain `fix-website-save-gate-embeds`) and this
document was read whole. A candidate mechanism for **one** path now exists, modelled by the code
reviewer and not observed in a running instance: after a "Choose which to keep" save,
`commitSaveChoice` stores data the editor does not hold, so the hash the server broadcasts differs
from the saving tab's (`code-review/fix-website-save-gate-embeds-code-review.md`, CR-4). The owner
chose to fix that path in that chain (`steering/queue-hooks-rulings.md`, selection 15). **It is not
shown to explain limb (d)** above, which was a save with nothing changed; this handoff stays Open
and nothing else in it is answered by this note.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T03:14 | steering-roadmap-hooks | Closed Addressed: Status set from Open. Plan 017's post-deploy row B-8 passed on live hooks.gg, walked by `uat-hooks-017-looks` as a test account on his selection (`steering/017-rulings.md` block 2026-11-20T02:41Z); result in `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` (`aaccb15`). This document had no changelog; this section opens one. Moved to `handoff/closed/`. |
