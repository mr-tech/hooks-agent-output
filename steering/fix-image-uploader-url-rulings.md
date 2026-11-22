# Rulings — fixer chain `fix-image-uploader-url` (website: the image URL dialog can save an address other than the one shown)

Steered by `steering-hooks`, item 9 (R-H7) of effort `fixer-queue-2026-11-21` (effort rulings blocks "2026-11-21T05:38Z" item 6,
"05:50Z"). tmux category: `fix-image-uploader-url`. Source: `research/codebase-bug-evaluation-2026-11-08.md:174`.

## 2026-11-22T04:44 — selection: fix all three

Selection prompt put 04:4xZ, answered 04:4xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises: the sweep `verification/fix-image-uploader-url/scoping/sweep.md` (`724b0e4`, at
website `132a7ab`, read): `src/components/ImageUploader.tsx` — Save commits `localImage` (L54-57), not `imageInput`; the URL check effect
(L68-79) has no stale-response guard; an invalid input only sets the error (L73-75); Cancel (L63-66) clears `localImage` only when
`image === ''` and never resets `imageInput`; `PresetDialog unmount={false}` (L92) keeps state across reopen. Render sites: `Author.tsx:158`
(`avatar_url`), `EmbedAuthor.tsx:186`, `EmbedFooter.tsx:151`, `EmbedImage.tsx:126`, `EmbedThumbnail.tsx:58`. Existing tests
(`ImageUploader.enter-scope`, `…url-validation`) cover none of the three sequences. The refutation helper (export, run, hand-resolved fake
`Image`, 7 cases, exit 0): (a) A then B, B resolves first — box B, preview A, Save → `setImage(A)`; (b) A loaded then invalid text — error
shown, Save enabled, Save/Enter → A; (c) saved X, type Y, Cancel, reopen — box Y, Save → Y; control as expected.
- Q: A "Agent: fix all three (Recommended)" — "Save always saves exactly what the box shows and only once it has loaded; a bad address
  can't be saved; Cancel puts the box back to the saved image. Tests for each case and normal use. Queued after the other website
  fixes."; B "Agent: fix 1 and 2 only"; C "Agent: don't fix". Chosen: **A**.

Determination, stage set and branch cut: when the website tree is free (after chains 7, 8, 9a-9d), from that tip.
