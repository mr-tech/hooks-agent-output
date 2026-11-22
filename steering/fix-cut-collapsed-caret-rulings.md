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
