# Rulings — fixer chain `fix-normalize-fence-loop` (website editor: a quote plus a bare code fence makes every edit throw)

Steered by `steering-hooks`, item 9 (R-H2) of effort `fixer-queue-2026-11-21` (effort rulings blocks "2026-11-21T05:38Z" item 6,
"05:50Z"). tmux category: `fix-normalize-fence-loop`. Source: `research/codebase-bug-evaluation-2026-11-08.md:169`.

## 2026-11-22T03:41 — selection: fix it (in queue order)

Selection prompt put 03:3xZ, answered 03:4xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises: the sweep `verification/fix-normalize-fence-loop/scoping/sweep.md` (`a125465`, at
website `132a7ab`, read): `src/components/SlateEditor/utils/withNormalizeNode.ts` compares `child.lang !== currentLang` (L33) where a bare
fence leaves `currentLang` `null` (L64 regex `+`) while `getInitialValue.ts:87-88` (regex `*`) sets `''`; the quote branch re-inserts
the line's text each pass (L45-49); one call site `SlateEditor/index.tsx:61`; surfaces without `partialMarkdown`: `ContentBody.tsx:21`,
`Embed.tsx:82`, `EmbedField.tsx:92`, `TextDisplayEditor.tsx:26`; no test covers it. The refutation helper (export, run, real parser):
`> a` + bare fence + `foo` — forced normalise threw "Could not completely normalize the editor after 378 iterations!"; inserting one
character threw after 126 iterations; text unchanged apart from the typed character; controls (```` ```js ````, no quote line, bare fence
alone) settle with 0 operations; mounted `SlateEditor` (jsdom): typing throws the same error and `onChange` is not called — the typed
character never reaches the parent state. Not checked: React's handling of the throw in a browser; a real `beforeinput` event.
- Q: A "Agent: fix it (Recommended)" — "Text with a quote and a no-language code block can be edited normally in every affected box, with
  tests for that case and the working ones. Queued after the other website fixes, released the same way."; B "Agent: fix it first"; C
  "Agent: don't fix". Chosen: **A** (queue order kept).

Determination, stage set and branch cut: when the website tree is free (after chains 7, 8, 9a, 9b), from that tip.
