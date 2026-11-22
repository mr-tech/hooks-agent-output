# Brief, common part — fixer chain `fix-cut-collapsed-caret`

From `steering-hooks-fixer`, written 2026-11-22T18:49Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. tmux category: `fix-cut-collapsed-caret`.

## Determination and stage set

- His words and the determination (scope statement, write set, exclusions, what the sweep did not cover):
  `/usr/local/bin/hooks/agent-output/steering/fix-cut-collapsed-caret-rulings.md`, blocks "2026-11-22T02:09" (his selection A: "Cut
  with nothing highlighted does nothing, in every text box that uses this editor; cutting highlighted text is unchanged. A test proves
  both.") and "2026-11-22T18:49" (the determination). The blocks govern.
- Stage set, quoted: "`fixer-fix-cut-collapsed-caret` → `code-reviewer-fix-cut-collapsed-caret` (under 20 production lines: the reviewer
  also runs the suite, typecheck and the red test) → devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT; 20 or
  more production lines restores QA Phase 2."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`).
- Sweep: `/usr/local/bin/hooks/agent-output/verification/fix-cut-collapsed-caret/scoping/sweep.md` (at `132a7ab`; `SlateEditor/` is
  unchanged to `453de76`). Source: `research/codebase-bug-evaluation-2026-11-08.md` H-3 (L170).

Repositories: `/usr/local/bin/hooks/website` (branch `chain/fix-cut-collapsed-caret`, cut by steering from `origin/master` `453de76`,
no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use `git -C <repo>`.

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

No architecture passage is known to name the cut handler; steering lodges any entry at closure.

## Hazard-bearing analysis (each a candidate to re-derive)

1. `onCopy.ts`'s cut branch runs `Transforms.delete(editor, { at: editor.selection })` whatever the selection's shape; with a collapsed
   caret slate deletes the next character (refutation: "abc" at offset 1 → "ac").
2. The copy half of the handler calls `preventDefault()` only when a fragment exists; a collapsed caret yields none, so the browser's own
   cut then runs too. What the browser does on a collapsed cut is not asserted by jsdom.
3. jsdom lacks `isContentEditable`; the refutation mounted `Editable` only with a scratch polyfill. The environment-fidelity convention
   (CLAUDE.md, DOM component tests) binds: call the handler directly against a slate editor rather than assert a path jsdom fakes.
4. Six surfaces pass the handler through (`DiscordContentEditor` Desktop/Mobile → content, text display, embed description, embed field
   name/value, embed title); the fix is in the one shared handler.

## What this brief did not check

A real browser's cut event; slate-react's `onCut` beyond the refutation's read.
