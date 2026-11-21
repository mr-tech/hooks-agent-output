---
UUID: 5b0c7a42
Status: Open
Status-Detail: "Hazard lines the scoping sweep of fixer chain fix-import-save-conflict did not cover and no stage of the chain checked; the chain is released (website master b829314). Nothing here is known broken."
Owning-Stage: steering (scopes a chain or an analysis for any of these if the trigger fires)
Review-Trigger: "when a chain next edits NewMessageModal.tsx's submit path, PresetDialog or Form submit handling, the server message.upsert, EditMessageMenu or the oldMessage flow; or when BC-17 (does Discord return a message with both V2 components and content) is answered"
---

# Handoff — fix-import-save-conflict: hazards no stage checked

## What is seeded

`steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z" ("What the sweep did not cover"), and the devops brief
`steering/fix-import-save-conflict-brief-devops.md` name these. The code review, QA Phase 2 and Phase 3 and this release checked none of them:

1. Whether Discord ever returns a message with both V2 components and classic content (row E), or a V2 flag with content and no V2 components (row D)
   through the import tabs (qa BC-17). The fix is tested on the converter's mechanical output. Row PD-1 of
   `handoff/fix-import-save-conflict-post-deploy-2026-11-21.md` reads what the test estate can produce, not these rows.
2. Production data: whether any stored message row already holds a row D or row E shape.
3. `PresetDialog` and `Form` submit handling: the dialog's `Form` skips its submit handler when disabled; the change moved what disables Save
   (the floor now reads the settled draft), and other hosts of `Form` were not re-read.
4. The server `message.upsert` on a row E payload: the dialog writes a settled or chosen draft, so a row E payload should not arrive, but
   the server's own validation of it was not read.
5. `EditMessageMenu` and the `oldMessage` flow: not read for any dependence on the raw imported draft.

## Origin

Named by the scoping determination (steering, 07:54Z) and carried by the devops brief; recorded by devops at Phase 2D of the release
(`deployment/fix-import-save-conflict-deployment.md`, "Forward items beyond the register") so that the closing record is not its only carrier.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T08:55 | devops-fix-import-save-conflict | Opened at release closure: five unchecked hazards, no known defect. |
