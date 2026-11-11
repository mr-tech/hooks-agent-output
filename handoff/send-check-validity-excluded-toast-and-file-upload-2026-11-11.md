---
UUID: 54673438
Status: Open
Status-Detail: "Two items plan 016 excludes and does not discharge: the generic failure toast on a refused send (research F-14), and a File component's upload path (with removing File from the add menu). Neither blocks plan 016. The owner is shown both with plan 016 revision 1's Exclusions register."
Owning-Stage: planner (the next website effort scoped after the owner's rulings below); the owner rules whether each item is planned
Review-Trigger: "when the owner rules on plan 016's Exclusions X-1 or X-2; when src/utils/sendWebhook.ts's toast or the File component's editor or add-menu entry is next edited; when a user reports a send failing with only the generic toast; or when the existing-items queue of his prompt-2 ruling is done (steering/queue-hooks-rulings.md, selections 1 to 4) and new feature work is next planned"
---

# Handoff — two items plan 016 excludes: the generic send-failure toast and a File upload path

**Raised:** 2026-11-11, by `planner-hooks-new` (plan 016, revision 1, Exclusions X-1 and X-2).

## Item 1 — a refused send tells the user nothing specific (X-1)

Research `research/closed/components-v2-send-validity-2026-11-11.md` F-14, a code read at website
`6d78b19`: `sendWebhook` (`src/utils/sendWebhook.ts`) throws on any non-200 status, and its toast
reads "Failed to send message. Please try again or contact support." Discord's error body goes to
`console.error` only. Re-read by the planner at `0e3d903` (`sendWebhook.ts`, the `toast.promise`
call): unchanged.

Plan 016 makes the send check refuse the measured refusal class before Send, so the toast is reached
less often. It is still reached by every refusal outside that class (plan 016's ledger residue). The
scoping determination (`steering/queue-hooks-rulings.md`, block "2026-11-11T09:17Z") put this out of
scope.

## Item 2 — a File component cannot be sent from the website (X-2)

Research F-7: Discord refused a File component in all three forms the website can produce. Plan
016 refuses any message holding a File (its D-11). Making a File sendable (an upload path) and
removing File from the add menu are new product work. The owner's typed ruling of 2026-11-11
(prompt 2) holds them: "this new stuff is planned after the existing items are handled". Until
then, a user can add a File component and the send page refuses the message with a reason.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-11T10:32 | planner-hooks-new | Created at plan 016 revision 1. |
