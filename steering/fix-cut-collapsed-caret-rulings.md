# Rulings — fixer chain `fix-cut-collapsed-caret` (website editor: cut with a collapsed caret deletes the next character)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), the first diagnose-first chain
(R-H3) of item 9 in effort `fixer-queue-2026-11-21`'s order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:38Z"
(item 6: "Each is a fixer chain whose first act is the red test; a hypothesis whose test stays green closes the chain with no fix") and
"05:50Z". tmux category: `fix-cut-collapsed-caret`. Source: `research/codebase-bug-evaluation-2026-11-08.md` H-3 (L170).

## 2026-11-22T02:09 — selection: fix it

Selection prompt put 02:0xZ, answered 02:0xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises read before the prompt: the sweep `verification/fix-cut-collapsed-caret/scoping/sweep.md`
(helper, at website `132a7ab`): `src/components/SlateEditor/utils/onCopy.ts:19` guards only on `editor.selection`; its cut branch
(`:34-38`) `Transforms.delete(editor, { at: editor.selection })` has no expanded-selection check; wired at `SlateEditor/index.tsx:125`;
surfaces `DiscordContentEditor` Desktop `:92` and Mobile `:96`, used by `ContentBody.tsx:21`, `TextDisplayEditor.tsx:26`, `Embed.tsx:82`,
`EmbedField.tsx:75,92`, `EmbedTitle.tsx:93`; no test touches cut; slate 0.123.0. The refutation helper (scratch `refute-cut/`, export,
run): collapsed caret in "abc" at offset 1 → "ac" through the project handler (claim 1 HOLDS); expanded over "b" → "ac" (control);
slate-react's own `onCut` leaves "abc" (read and run); in a mounted `Editable` the project handler deletes, slate's runs after and deletes
nothing — the mounted runs needed a scratch `isContentEditable` polyfill under jsdom (environment-fidelity caveat).
- Q: A "Agent: fix it (Recommended)" — "Cut with nothing highlighted does nothing, in every text box that uses this editor; cutting
  highlighted text is unchanged. A test proves both. Released to the site like the other fixes, after the Vercel settings are back.";
  B "Agent: don't fix". Chosen: **A**.

Determination, stage set and branch cut: when the website tree is free of chain 7 (and chain 8 per the order), from that tip.

## 2026-11-22T18:49 — determination and stage set

Website `master` is free (chain 8 released at `453de76`, block "released and live" in its rulings). Premises re-read at `origin/master`
`453de76`: `git diff --stat 132a7ab origin/master -- src/components/SlateEditor/` empty, so the sweep's sites stand; `onCopy.ts` read
whole (the cut branch deletes `at: editor.selection` with no expanded check); no test under `src/components/SlateEditor/`.
`release-move.js --dry-run` on `master` `453de76`: every check passed ("sibling serving refs (none)"), no workflows (18:49Z).
**Determination.** Shape: defect, cause proven (sweep + refutation, block 02:09). Blast radius: every editor built on `SlateEditor`
(the sweep's six surfaces). End step: website `master`, Vercel production. Pipeline: the `fixer` agent.
**Scope statement** (website, from `origin/master` `453de76`): the cut branch of `src/components/SlateEditor/utils/onCopy.ts` deletes only
an expanded selection; a collapsed caret cuts nothing. Copy is unchanged. A test proves both (collapsed: text unchanged; expanded:
highlighted text removed). Write set: `onCopy.ts`, one new test file named per Test Conventions beside the code it covers, the fixer's
document and `verification/fix-cut-collapsed-caret/`. Exclusions: slate-react's own `onCut` (third-party); the copy path's clipboard
behaviour; the six surfaces' own code (they pass the handler through).
**Stage set:** `fixer-fix-cut-collapsed-caret` → `code-reviewer-fix-cut-collapsed-caret` (under 20 production lines: the reviewer also
runs the suite, typecheck and the red test) → devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT; 20 or more
production lines restores QA Phase 2. **Hazard:** jsdom lacks `isContentEditable` (refutation needed a scratch polyfill): the
environment-fidelity convention binds — a test asserting a path jsdom cannot model is not written; the handler can be called directly.
**Not covered:** a real browser's cut event.

## 2026-11-22T18:53 — the fixer's block: a clicked emoji; ruled on his 02:09 words (scope statement corrected)

Fixer by message ~19:0xZ (document Status Blocked): emojis are inline voids; clicking one leaves a collapsed selection inside it (read
from slate-react's `onClick`, not run in a browser); at base `453de76` Cut on that selection copies the emoji and removes it (its probe at
base, `verification/fix-cut-collapsed-caret/emoji-cut-probe-run.txt`, read: the emoji node removed). A guard on `Range.isExpanded` alone
would make Cut on a clicked emoji only copy. Ruling (this thread's): his chosen option's words decide it — "Cut with nothing highlighted
does nothing, in every text box that uses this editor; cutting highlighted text is unchanged." Those words change the plain-caret case
only; the clicked-emoji case is not named, so it stays as today. This thread's 18:49 scope statement ("deletes only an expanded
selection") narrowed past his words and is corrected to: **Cut with a collapsed caret that is not inside an emoji (inline void) deletes
nothing; Cut on an expanded selection, and on a clicked emoji, behaves as at base.** The test asserts all three (plain caret: unchanged
text; expanded: removed; clicked emoji: removed, as at base). Inside the sweep's region (the cut handler), so no re-scope to him; told
him in chat, he can veto. Sent to `fixer-fix-cut-collapsed-caret`.

## 2026-11-22T19:06 — handed to code review at website 329cc20; reviewer started

Fixer's spawn cue by message ~19:2xZ: document `implementation/fix-cut-collapsed-caret-implementation.md` (record `083260a4`; `Handoff-At:
329cc20 — repos=website`, read). This thread's reads: `git log 453de76..329cc20` (two commits); `git diff --numstat`: `onCopy.ts` 5/4,
`__tests__/onCopy.cut.test.tsx` 84/0. Built to block 18:53's corrected statement (fixer's report). Reviewer brief
`steering/fix-cut-collapsed-caret-brief-code-reviewer.md`; `code-reviewer-fix-cut-collapsed-caret` started with `tmux-agent spawn`.

## 2026-11-22T19:10 — review round 1 REJECTED (CR-1, a missing Copy case); real-browser Ctrl+X routed to an agent

Reviewer's copy by message ~19:3xZ: `code-review/fix-cut-collapsed-caret-code-review.md` (record `bc02a58b`), Round 1 REJECTED at `329cc20`,
sent to the fixer: CR-1 MEDIUM — no test calls the handler as Copy, and a mutant making Copy delete survives; to be re-checked as a
sub-entry. The production fix itself it reports correct (5 lines; red/green reproduced; suite 2365/2365 exit 0; typecheck exit 0).
Assumption Not Checked (real browser: Ctrl+X with a plain caret removes nothing) — the reviewer routes it to the owner. Disposition
(this thread's): an agent can perform it — a browser walk of the signed-out editor (signed-out visitors reach the blank editor, chain 8's
live checks) — so it is not queued for him; it rides the devops brief as a post-deploy walk by a `browser-walker` helper, typing text,
placing a plain caret, pressing Ctrl+X, reading the text back; no save.

## 2026-11-22T19:15 — review approved at 8845b7e; devops started

Reviewer's spawn cue by message ~19:1xZ: `code-review/fix-cut-collapsed-caret-code-review.md` (record `de261824`, read: `Reviewed-At
8845b7e3409782e0…`, Round 1, `APPROVED`; sub-entry 1a fixed CR-1 with a Copy case); suite 2366/2366 exit 0; 5 production lines. Fixer's
`Handoff-At` now `8845b7e` (read). The reviewer's Assumption Not Checked (real-browser Ctrl+X) stays routed to an agent walk, not to him
(round-1 block). Devops brief `steering/fix-cut-collapsed-caret-brief-devops.md` (post-deploy browser-walk row); `devops-fix-cut-collapsed-caret`
started with `tmux-agent spawn`.
