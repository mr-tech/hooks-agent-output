---
UUID: f1356f4b
Status: Addressed
Status-Detail: "Addressed by fixer chain fix-desktop-draft-as-typed on his selection 'save as you type' (effort rulings block 2026-11-21T05:50Z, reach block 05:59Z): desktop content editor, embed author name and footer text reach the draft as typed; released website master b68f94c 2026-11-21T11:33Z; post-deploy row P-1 HOLDS on production (handoff/closed/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md, c673ee77)."
Owning-Stage: planner
Review-Trigger: when the message editor's draft store (src/utils/messageDrafts.ts) or the content editor's commit-on-close is next changed, or when the next website editing or data-loss effort is scoped
Priority: low
---

# Text in an open content editor is not drafted until the editor closes

## What is seeded

- **Observation** (uat-hooks-017-looks, live hooks.gg at website `7923a1d`, test account 1, 2026-11-20 02:56–03:07Z): during row B-9's
  literal runs, text typed into the still-open content editor was lost on a reload and on a forced sign-out. With the editor closed
  first (B-2's committed-edit form), the draft survived both. UAT pass 1 of plan 017 recorded the same on the local build (`uat/closed/`
  017 UAT document, "Instrument notes").
- **Not established:** whether the pre-017 code at `1ad625e` behaved the same; whether the leave-page warning fires on that reload; the
  user-facing intent for an open editor's text. The last needs his word if a chain takes it.
- **Next step, if picked up:** state the intended draft boundary (on each keystroke, on a pause, or on close), then measure the current
  behaviour against it at the base before any fix.

## Evidence

- `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`, row B-9's Result (`aaccb15`).
- `verification/017/post-deploy/looks/` (`README.md`, `b9.jsonl`, `m3a*.mjs`, `m3b.mjs`).

## Origin

uat-hooks-017-looks's report to steering-roadmap-hooks (2026-11-20T03:1xZ): "Whether it deserves a handoff is yours to decide." This
thread opened one so the limit stays visible after the three item handoffs close.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T03:14 | steering-roadmap-hooks | Opened from the stated limit on plan 017's post-deploy row B-9 (`aaccb15`). |
| 2026-11-21T11:40 | steering-hooks | Closed Addressed: fixer chain `fix-desktop-draft-as-typed` released `b68f94c` (11:33Z) and its post-deploy row P-1 holds (`c673ee77`); chain rulings `steering/fix-desktop-draft-as-typed-rulings.md`. |
