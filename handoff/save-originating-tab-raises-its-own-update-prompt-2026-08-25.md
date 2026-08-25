---
UUID: 4b1e9d07
Status: Open
Status-Detail: >-
  Issued 2026-08-25 by steering-hooks-013-3 at the owner's explicit direction ("Route 10 to a
  handoff"), during chain 013's closeout. Found in PRODUCTION by the owner while executing release
  condition BC-14, which is the only instrument in chain 013 that reaches this surface - no
  automated test in that chain covers it. The defect is NOT chain 013's to fix: the owner ruled
  013 complete in the same message, and this handoff is the route he chose for the finding rather
  than a reopening. Nothing here is derived: the symptom is his sentence verbatim, and the two
  limbs it does not cover are stated as uncovered rather than inferred.
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
