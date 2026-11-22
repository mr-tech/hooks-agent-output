# Rulings — fixer chain `fix-blockquote-rewrite` (website editor: opening a box rewrites `>>> ` quotes)

Steered by `steering-hooks`, item 9 (R-H8, the last hypothesis) of effort `fixer-queue-2026-11-21` (effort rulings blocks
"2026-11-21T05:38Z" item 6, "05:50Z"). tmux category: `fix-blockquote-rewrite`. Source: `research/codebase-bug-evaluation-2026-11-08.md:175`.

## 2026-11-22T04:49 — selection: fix it

Selection prompt put 04:4xZ, answered 04:4xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises: the sweep `verification/fix-blockquote-rewrite/scoping/sweep.md` (`28e05f1`, at website
`132a7ab`, read): load `src/components/SlateEditor/utils/getInitialValue.ts:26-29,41-42` strips `>>> ` (not gated by `partialMarkdown`) and
makes one `blockQuote` per line; save `flattenNodeText.ts:7,13` emits `> ` per quote line; mount write `SlateEditor/index.tsx:58-59`;
blur write `Desktop.tsx:45-52`. Surfaces: `ContentBody.tsx:21`, `Embed.tsx:82`, `EmbedField.tsx:92`, `TextDisplayEditor.tsx:26`; partial
(marker deleted): `EmbedField.tsx:75`, `EmbedTitle.tsx:93`. No test round-trips `>>> `. The refutation helper (export, run, 4/4, exit 0;
output scratch `refute-quote/out.txt`): `">>> a\nb"` → `"> a\n> b"`; `">>> a"` → `"> a"`; `">>> a\n\nb"` → `"> a\n> \n> b"`; partial
`">>> a"` → `"a"`; mounted `SlateEditor` calls `onChange` once on mount with `"> a\n> b"`, no user action; controls unchanged; blur re-write
read from code; the site's preview renders both forms as one quote (read from code); Discord's rendering not checked.
- Q: A "Agent: fix it (Recommended)" — "Opening and leaving a box never changes its text: >>> quotes are kept as written everywhere,
  including titles and field names. Tests for both forms. Queued after the other website fixes."; B "Agent: don't fix". Chosen: **A**.
Precision on the question's length wording ("about 2 characters per extra quoted line"): the sweep's count is 2(m−2) for an m-line quote —
no growth for two lines, +2 for each line beyond the second.

Determination, stage set and branch cut: when the website tree is free (after chains 7, 8, 9a-9e), from that tip. 9c
(`fix-normalize-fence-loop`) touches the same files (`withNormalizeNode`, `getInitialValue`); the two may run as one chain — decided at
determination time.
