Duties negated: none.

From `steering-hooks-fixer`. You are `researcher-slate-formatting-oracle`. Run a research pass per your definition. Your document is ID-less,
under `/usr/local/bin/hooks/agent-output/research/`, named for the question.

## Why

The owner is opening one effort for every formatting fix in the website's message editor (Slate) and its preview, together with a fuzzer or
intensive check meant to cover every edge case. His words and this thread's reading are in
`/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-23T09:07Z", "09:10Z", "09:11Z" and "09:13Z":
- The standard is Discord's own formatting behaviour ("I tried my best to get the Slate implementation to be the same as Discord's").
- Hyperlink formatting is named ("I believe there's something off with the formatting there").
- He suggests that third-party Discord clients may share Discord's markdown logic and could serve as an oracle. That is a claim to
  establish, not a premise.

A fuzzer can only find "differs from Discord" if it has an oracle for what Discord does. Your question is which oracle.

## The question

1. Which implementations of Discord's message markdown exist that the effort could run or read? Cover:
   - third-party and alternative clients (open-source desktop, terminal and mobile clients, client mods);
   - libraries (`simple-markdown`, which the website already depends on at `^0.7.3`, and any Discord-specific parsers built on it or
     written fresh);
   - what Discord's own client is known to use.
   For each: the source, licence, last activity, the rules it implements, and whether it formats in the text box (editor) or only in
   rendered messages.
2. How faithful is each to Discord's current rendering? Check at least: headings, subtext (`-#`), masked links, bare and `<>` links,
   spoilers, nested emphasis (`***`, `__*`, `||**…**||`), code spans and fences with and without a language, `>` and `>>>` quotes, lists,
   timestamps `<t:…>`, mentions, custom and Unicode emoji, and escapes. Evidence over claims: a changelog, a test file, or a run.
3. How should fidelity be verified against real Discord? The agents' own test server (guild `1566742402180456559`) may be used freely, and
   so may the test-account browser (`discord-test-browser` skill; the test bot posts there). Sketch a method that posts a corpus, reads
   Discord's rendered output (DOM structure, not pixels), and compares it with a candidate parser. Say what Discord's editor (as opposed to
   its rendered message) does differently, if anything, and how that could be read.
4. Recommend an oracle arrangement for the effort's fuzzer, with its known gaps.

## Bounds

- Read-only on `/usr/local/bin/hooks/website`. Use `git -C … show origin/master:<path>` or an export for code reads. The editor code is
  `src/components/SlateEditor/**` and `src/utils/markdown/**`.
- An inventory of the editor's known defects is being built at
  `/usr/local/bin/hooks/agent-output/verification/slate-formatting-effort/scoping/inventory.md`. Read it if it exists; do not duplicate it.
- Discord: the test server only. Nothing goes to any other server, DM or person (`/home/dev/.claude/CLAUDE.md`, "Outbound messages", quoted:
  "A message that reaches a real person is mine to send."). Never read a `.env*` value. Never use the bare word `none` in a command.
- A call stopped by a control: stop, message `steering-hooks-fixer`, and never re-issue it in another form. The record says only "not
  completed".
- Record documents are written with Write/Edit, never a shell heredoc.

## Routing

Your document goes to `steering-hooks-fixer` by SendMessage once it is committed. It then feeds the effort's scoping and the planner.
Owner-needing items also go to `steering-hooks-fixer`. If you put a question to him yourself, use his standard: context first, then the
decision, in plain English, with no commit IDs (effort rulings block "2026-11-21T18:37Z").
