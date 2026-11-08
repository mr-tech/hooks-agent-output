---
UUID: 39f2d12f
Status: Open
Status-Detail: "On production hooks.gg, 'new message' → 'Upload Message' on the account folder page opens no dialog after a fresh page load. Cause: a portaled popover's first lazy load of FloatingPortal suspends to the layout boundary, which hides the open Headless UI Dialog, and the Dialog closes itself. The code dates from 2023, before chain 015, and lies outside its pool (D6). Nothing in chain 015 blocks on it."
Owning-Stage: planner
Review-Trigger: when src/components/AnchoredPopover/Child.tsx or NewMessageModal is next edited, or when the next website effort is scoped
---

# Upload Message dialog closes itself on a portal's first lazy load

## What is seeded

**The defect, as observed on production.** On hooks.gg, signed in, a fresh page load of `/message/f/0` followed by
"new message" → "Upload Message" shows no dialog: "Create or upload a new message" never appears, there is no console
error, and nothing is saved. The dialog does open when the same page lifetime has already loaded the `FloatingPortal`
module, for example after opening an editor page and following the app's own link to `/message/f/0`.

**The mechanism**, proven locally at website `b96e364` and `7ce866b` under both Turbopack and webpack builds:
1. The press opens NewMessageModal, a Headless UI `Dialog`.
2. The modal renders its portaled "Save To" Dropdown. Its popover's portal is
   `dynamic(() => …FloatingPortal, { ssr: true })` in `src/components/AnchoredPopover/Child.tsx`, with no `loading`
   option and no Suspense boundary of its own.
3. On the page lifetime's first render of that dynamic, the lazy read suspends up to the layout's boundary. React
   hides the boundary's existing host nodes with `display: none !important`, the Dialog's portal included.
4. Headless UI's `useOnDisappear` sees the Dialog root's zero rect and calls `onClose` (`closeNewMessageModal`). The
   dialog closes in the same interaction, so nothing ever paints.

A one-property mutation, `loading: () => null` on that dynamic, makes the dialog open (analysis V-4, the mutation
diff).

**The class.** Any Headless UI Dialog that is open when a portaled `AnchoredPopover` renders for the first time in
the page lifetime is closed by the same path. Likely members, not probed: `SaveAsMenu` and `ColorPicker`, which also
pass `portal`. A remedy is owed over the class (every consumer of the `FloatingPortal` dynamic, enumerated from its
importers), not only for NewMessageModal.

**Owed:** a fix and a test that is red on a fresh page lifetime, the shape the defect takes in production. Under the
owner's standing rule, the fix goes into the shared `AnchoredPopover/Child.tsx` once, never into one consumer.

## Evidence

- Analysis: `analysis/015-bug-evaluation-fixes-upload-dialog-analysis.md` (agent-output `f2b0487`), findings V-1 to
  V-6. V-6: `git log -S"mod.FloatingPortal"` dates the dynamic to `fae733f` (2023-02-28). Probes and results are in
  `verification/015/upload-dialog/`, including `instrumentation-and-mutation.diff` and `result-inst-mut.json`.
- Production, fresh load (uat-hooks-015, 2026-11-08, owner ruling D40): `verification/015/uat/hooksgg-upload-fresh-load.js`
  and `hooksgg-upload-fresh-load.png`. After `goto` and a 6 s wait, the session was signed in, there were 0
  `[data-floating-ui-portal]` nodes before the press, and no dialog text appeared at 0.5, 2, 5 or 8 s after it.
- Production, opening case (uat-hooks-015, third walk, ~20:28Z): `verification/015/uat/hooksgg-upload-dialog-live.js`
  and `hooksgg-upload-dialog.png`. Sign-in through Discord OAuth in a new tab, then `goto` `/message/f/0`, and the
  dialog opened. Why that sequence opens it is not established. It ran after an OAuth return in the same tab, which may
  have loaded the module earlier in that page's life.
- Live code: 23 of 24 `/message/f/0` chunk hashes match the local `7ce866b` build, and the 24th differs only in
  env-inlined code (`verification/015/upload-dialog/live-f0-chunks.txt`). Vercel's deployed SHA itself is unread.

## Origin

Chain 015 UAT finding UAT-4 (`uat/015-bug-evaluation-fixes-uat.md`). Then the owner's rulings D39 (analyse it) and
D40 ("Agent: live check first"), in `steering/015-rulings.md` blocks 20:44Z and 21:14Z. The analysis was by
analyst-hooks-015 and the live check by uat-hooks-015. The handoff was written by the planner per D40.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T21:16 | planner (planner-hooks-015) | Created from the D39 analysis and UAT's D40 live check. |
