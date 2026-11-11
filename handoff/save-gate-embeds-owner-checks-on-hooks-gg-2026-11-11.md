---
UUID: 76413abf
Status: Open
Status-Detail: "Released 2026-11-11T10:13Z (website master 0e3d903). Owed: the owner's own check on hooks.gg of the Save flows, which closes QA's Assumption Not Checked (Pusher), and his optional live-database read. Neither blocks anything; no stage is waiting."
Owning-Stage: Owner (his own checks); the steering thread carries it to him and closes this on his reported result
Review-Trigger: when the owner next saves a Components V2 message on hooks.gg, or reports a "Message Update Detected" prompt after a save, or runs the live-database read
---

# Handoff — the owner's checks on hooks.gg after the Save-gate fix (fix-website-save-gate-embeds)

## What is seeded

The fix `fix-website-save-gate-embeds` was released by a push of website `master` to
`0e3d903ce98e108c7ca848b992ad89ac538f4b44` (2026-11-11T10:13Z). QA walked it on a local build only.
Two checks are the owner's and were not run by any stage:

1. **His check of the Save flows on hooks.gg** (the fixer's "User-visible flows"). Pass condition:
   - Editor → Save on a stored V2 message that carries only empty embeds saves with no prompt; the
     editor then holds the message without the empty embeds; the Send page accepts it without a reload.
   - Editor → Save on a V2 message with real content or embeds shows the "Choose which to keep"
     dialog. After **Save as Classic** the editor switches to Classic and holds the content; after
     **Save as Components V2** it stays V2 and holds the components.
   - **QA's Assumption Not Checked** (it assumed hooks.gg's Pusher app delivers `message-update` to the
     saving client as the local one did) is **falsified** if, on hooks.gg, the saver sees "Message
     Update Detected" after "Save as Classic", or a Save of V2 components beside an empty embed leaves
     the Send page refusing until a reload. On a falsifier: Vercel promote of the previous
     deployment is the quick rollback, his call; the reversing patch checks clean
     (`git diff 6d78b19 0e3d903 | git apply --check -R`, exit 0).
2. **His optional live-database read.** The fix repairs no stored row. A stored message holding V2
   components beside only-empty embeds is written without them at its next editor Save or Save-as.
   The read-only `SELECT` is `verification/fix-website-save-gate-embeds/devops/live-db-read.sql`
   (validated on a throwaway Postgres: matched 6 of 6 positive controls, 0 of 9 negative controls;
   `live-db-read-seed.sql` and `live-db-read-result-control.txt` beside it). Its result is a count
   of rows the fix will tidy at their next Save, not a gate.

## Evidence

- QA Phase 2: `qa/closed/fix-website-save-gate-embeds-qa.md`, "Assumption Not Checked" and "Browser walk" (R1b, R2, R3 against the base-tree red B2).
- Deployment record: `deployment/fix-website-save-gate-embeds-deployment.md`, "Owner checks".
- Fixer's flows: `implementation/closed/fix-website-save-gate-embeds-implementation.md`, "User-visible flows".

## Origin

Raised by devops at the release of chain `fix-website-save-gate-embeds` (rulings block "2026-11-11T08:46Z", item 2, and the QA Phase 2 assumption). The related open record `handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md` stays Open: this fix is not shown to explain its limb (d); QA's walk holds one observation on that shape (an unchanged classic save raised no prompt on a local build).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-11T10:14 | devops-fix-website-save-gate-embeds | Created at the release of website `0e3d903`. |
