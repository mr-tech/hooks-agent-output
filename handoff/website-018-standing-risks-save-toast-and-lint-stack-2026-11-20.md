---
UUID: 1a8baa02
Status: Open
Status-Detail: "Two post-release falsifiers from plan 018's Risks table that only later events can decide: RK-3 (a stored message above a new list bound cannot be re-saved with Save, which shows a reason-less toast) and RK-5 (the lint stack sits on an ESLint major npm marks deprecated). Plan 018 is released; both are stated limits he accepted (D-10, X-16)."
Owning-Stage: steering
Review-Trigger: "for RK-3: a user report, or an observation by a stage, of the editor's 'Error. Failed to save message. Please try again.' toast on a message the user did not just paste, or the next edit to the editor's Save error handling; for RK-5: when a lint dependency (eslint, eslint-config-airbnb, eslint-plugin-react, typescript-eslint, eslint-config-next) next fails to install or load, or is next bumped"
---

# Handoff — website: plan 018's standing risks RK-3 and RK-5

## What is seeded

**RK-3.** At website `d1bb9b0` (released 2026-11-20T08:07:52Z) every save list is refused over its bound. A message already stored with a list above a new bound
cannot be re-saved with Save; Save shows the fixed toast "Error. Failed to save message. Please try again." with no reason (plan 018 M1-f, X-18, D-10 —
the owner's selection to leave the toast), while the JSON view and Save As show the reason. The affected population is pasted-JSON messages over Discord's own
limits. No production read is open to agents to count them. **Falsifier:** a user report of that toast on a message he did not just paste. **What a later
stage does:** route the report to the planner as a candidate for showing the reason on Save (his option "Agent: show the reason on Save", not chosen at 04:11Z).

**RK-5.** npm marks `eslint` 9.39.5 deprecated ("This version is no longer supported") and `eslint-config-airbnb` 19.0.4 peers ESLint 8 only, so the lint stack
(plan 018 M3, D-6) sits on an unsupported major behind a compatibility layer; ESLint 10 is excluded (X-16: `eslint-plugin-react` 7.37.5 peers no higher than ^9.7).
**Falsifier:** a lint dependency that fails to install or load at a later bump. Lint is red repository-wide before and after the chain (X-6, architecture Problem Areas).

## Evidence

`planning/closed/018-next-upgrade-save-size-cap.md` § Risks (RK-3, RK-5), Exclusions (X-6, X-16, X-18), Decisions Register (D-6, D-10).

## Origin

Plan 018's Risks table, carried here by devops at Phase 2D because the plan is closed and its falsifiers are events after the release.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T13:39 | devops-hooks-018 | Opened at Phase 2D with RK-3 and RK-5 (the plan's other risks: RK-1 and RK-2 decided by M4's walks and M5-a, RK-4 by the sequencing note in the deployment record, RK-6 a standing per-review prediction, RK-7 a prediction M5-a did not exercise). |
