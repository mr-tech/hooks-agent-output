# Rulings — fixer chain `fix-decorator-offsets` (website editor: `***…***` syntax colouring overruns its span)

Steered by `steering-hooks`, item 9 (R-H4) of effort `fixer-queue-2026-11-21` (effort rulings blocks "2026-11-21T05:38Z" item 6,
"05:50Z"). tmux category: `fix-decorator-offsets`. Source: `research/codebase-bug-evaluation-2026-11-08.md:171`.

## 2026-11-22T03:03 — selection: fix it

Selection prompt put 03:0xZ, answered 03:0xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises: the sweep `verification/fix-decorator-offsets/scoping/sweep.md` (`cfcb975`, at
website `132a7ab`, read): `src/components/SlateEditor/utils/decorator.tsx` `walkAst` L34-67 — `first` set on the last child (L47), `last`
never passed (L51); sole caller `SlateEditor/index.tsx:123`; no test drives `decorator`; no test covers nested emphasis. The refutation
helper (export, run; raw output in scratch `out1.txt`, `out2.txt`): `***ab***` → `0-3 SYNTAX`, `3-7 [emText] "ab**"`, `3-5
[strongText,emText] "ab"`, `5-10 SYNTAX` (past the 8-char end); controls `**ab**`, `*ab*`, `**a** *b*` correct; `***ab*** cd` → `5-10
SYNTAX "*** c"`, `d` plain; `**a *b* c** d` correct (claim refuted for that shape); mounted real `SlateEditor` (jsdom): no throw, leaves
`"***"` syntax, `"ab"` strong+em, `"**"` syntax, `"* c"` syntax, `"d"` no class.
- Q: A "Agent: fix it (Recommended)" — "Three-asterisk bold-italic is coloured correctly in every editor text box, with a test for it and
  for the cases that already work. Released with the other website fixes."; B "Agent: don't fix". Chosen: **A**.
**This thread's error in the question text:** it said "The rest of the line loses its styling"; the run shows the trailing `d` rendered
plain, which is what unformatted text is anyway — the read showed only the space and `c` mis-coloured. Told him in chat. Reading the
mount output's last leaf against the sentence before putting it would have caught it.

Determination, stage set and branch cut: when the website tree is free (after chains 7, 8 and 9a), from that tip.
