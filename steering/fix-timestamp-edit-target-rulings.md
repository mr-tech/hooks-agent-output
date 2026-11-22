# Rulings — fixer chain `fix-timestamp-edit-target` (website preview: a timestamp edit can rewrite a different timestamp)

Steered by `steering-hooks`, item 9 (R-H5) of effort `fixer-queue-2026-11-21` (effort rulings blocks "2026-11-21T05:38Z" item 6,
"05:50Z"). tmux category: `fix-timestamp-edit-target`. Source: `research/codebase-bug-evaluation-2026-11-08.md:172`.

## 2026-11-22T04:03 — selection: fix both cases

Selection prompt put 04:0xZ, answered 04:0xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises: the sweep `verification/fix-timestamp-edit-target/scoping/sweep.md` (`a4d1462`, at
website `132a7ab`, read): the index is taken once at mount from `state.indexes.timestamp++` (`MarkdownTimestamp.tsx:44-48`), counting only
rendered timestamps; the rewrite in `src/components/Markdown.tsx:18-27` counts every `<t:…>` match in the raw value, code spans included;
`localDate` is `useState` (`:35`), not resynced. Surfaces: read-only branches of `DiscordContentEditor/index.tsx:53-62` (content, embed
description, text display), `EmbedTitle.tsx:48-79`, `EmbedField.tsx:54-61`. No test covers `<t:…>`. The refutation helper (export, run,
real `Markdown` + rules, popover/calendar mocked, spy `onChange`): (1) `` `<t:1700000000:f>` and <t:1800000000:f> `` — editing the rendered
one gives `` `<t:1900000000:f>` and <t:1800000000:f> ``; (2) control without backticks edits the right one; (3) re-rendering the same root
from `<t:1800000000:f>` to `<t:1700000000:f> and <t:1800000000:f>`, editing the second gives `<t:1900000000:f> and <t:1800000000:f>` — both
instances carry index 0. Stale `localDate`: read from code, not run.
- Q: A "Agent: fix both (Recommended)" — "Editing a timestamp always changes the one you clicked, in both cases, with tests for each and
  for normal editing. Queued after the other website fixes."; B "Agent: fix the code case only"; C "Agent: don't fix". Chosen: **A**.

Determination, stage set and branch cut: when the website tree is free (after chains 7, 8, 9a-9c), from that tip.
