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
