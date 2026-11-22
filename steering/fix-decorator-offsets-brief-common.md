# Brief, common part — fixer chain `fix-decorator-offsets`

From `steering-hooks-fixer`, written 2026-11-22T20:19Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. tmux category: `fix-decorator-offsets`.

## Determination and stage set

- His words and the determination (scope statement, write set, exclusions, what the sweep did not cover):
  `/usr/local/bin/hooks/agent-output/steering/fix-decorator-offsets-rulings.md`, blocks "2026-11-22T03:03" (his selection A: "Three-asterisk
  bold-italic is coloured correctly in every editor text box, with a test for it and for the cases that already work.") and
  "2026-11-22T20:19" (the determination). The blocks govern.
- Stage set, quoted: "`fixer-fix-decorator-offsets` → `code-reviewer-fix-decorator-offsets` (under 20 production lines: the reviewer also
  runs the suite, typecheck and the red test) → devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT; 20 or more
  production lines restores QA Phase 2."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`).
- Sweep: `/usr/local/bin/hooks/agent-output/verification/fix-decorator-offsets/scoping/sweep.md` (at `132a7ab`; `decorator.tsx` and
  `SlateEditor/index.tsx` unchanged to `8845b7e`). Source: `research/codebase-bug-evaluation-2026-11-08.md:171` (H-4).

Repositories: `/usr/local/bin/hooks/website` (branch `chain/fix-decorator-offsets`, cut by steering from `origin/master` `8845b7e`, no
upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use `git -C <repo>`.

## Standing prohibitions relied on (quoted whole)

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

His standard for questions put to him (effort rulings `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-21T18:37Z"): context
first, then the decision, plain English, no commit IDs or technical detail he would have to look up.

Never read a `.env*` value. Never use the bare word `none` anywhere in a command — as an operand, a label or a loop value (it has
tripped a file safeguard twice today). A call stopped by a control: stop, message `steering-hooks-fixer`, never re-issue it in another
form; the record says only "not completed". A hang or timeout is not a control and may be retried once. Record documents are written
with Write/Edit or `record-edit.js`, never a shell heredoc. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`. Suite
runs are memory-capped (`systemd-run --user --scope -p MemoryMax=8G …`; `ulimit -v` breaks vitest). A local build saves nothing in
this chain; if one ever does, the CLAUDE.md id-range rule applies first.

## Architecture

No architecture passage is known to name the decorator; steering lodges any entry at closure.

## Hazard-bearing analysis (each a candidate to re-derive)

1. `walkAst` (`decorator.tsx` L34-67) sets `first` on the last child (L47) and never passes `last` (L51); for `***ab***` the refutation
   got `0-3 SYNTAX`, `3-7 emText "ab**"`, `3-5 strong+em "ab"`, `5-10 SYNTAX` — the closing range runs past the 8-character end.
2. `***ab*** cd` colours `" c"` as syntax; `**a *b* c** d` is already correct (the claim was refuted for that shape) — a fix must not
   change the shapes that work.
3. Expected ranges are written as literals (axiom E), never computed by the walk under test.
4. The decorator only colours ranges; it changes no stored text. A mounted `SlateEditor` under jsdom did not throw (refutation).

## What this brief did not check

Rendering in a real browser; the markdown parser's own handling of other delimiter runs (`****`, `_` forms).
