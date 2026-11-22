# Rulings — diagnose-first chain `fix-embed-thumbnail-layout` (research H-6) — closed, no fix

Steered by `steering-hooks`, item 9 (R-H6) of effort `fixer-queue-2026-11-21` (effort rulings blocks "2026-11-21T05:38Z" item 6,
"05:50Z"). Source: `research/codebase-bug-evaluation-2026-11-08.md:173`. No stage session was started; no code changed.

## 2026-11-22T02:58 — selection: leave it, not a bug

Selection prompt put 02:5xZ, answered 02:5xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form; two screenshots sent to him with it. Premises: the sweep
`verification/fix-embed-thumbnail-layout/scoping/sweep.md` (`0452338`, at website `132a7ab`, read from code): the image's `hasThumbnail`
class (`Embed.tsx:102-108`) is never applied in non-test code (`showEmbedThumbnailEditable` is never set false). The refutation helper
(scratch `refute-thumb/`, export dev server, headless Chromium over DevTools, `/preview?data=` with data-URL images): claim 1 HOLDS (run,
`/preview` only: image `grid-column: 1 / 1`, thumbnail `2 / 2`, columns `300px 96px`); claim 2 (Discord stretches the image under the
thumbnail) UNSETTLED — needs a look at Discord; claim 3 REFUTED (run): forcing the class makes the columns `100px 300px` and squeezes the
description. Screenshots: `as-is.png`, `forced-hasThumbnail.png` in that scratch directory (sent to him).
- Q: A "Agent: leave it, not a bug (Recommended)" — "Today's layout stays (first picture). The unused stretch rule is noted as a known
  leftover; chain 9 moves to the next suspected bug."; B "Agent: match Discord, stretch image"; C "You: compare with Discord first".
  Chosen: **A**.
Closed with no fix. Known leftover: the unused `.discord-visualizer__embed-media.hasThumbnail` rule (`visualizer.scss:630-632`) and the
`hasThumbnail` prop computation — no carrier opened (his option A names it a note, not a task).
