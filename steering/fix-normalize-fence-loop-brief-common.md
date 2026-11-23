# Brief, common part — fixer chain `fix-normalize-fence-loop` (with 9f `fix-blockquote-rewrite` riding)

From `steering-hooks-fixer`, written 2026-11-23T08:55Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its own stage's. tmux category: `fix-normalize-fence-loop`.

## Determination and stage set

- His words and the determination (scope statement, write set, what the sweeps did not cover):
  `/usr/local/bin/hooks/agent-output/steering/fix-normalize-fence-loop-rulings.md`, blocks "2026-11-22T03:41" (his selection to fix the
  loop), "2026-11-23T08:53Z" (re-sweep and refutation) and "2026-11-23T08:55Z" (his selection to run both as one fix; the determination).
  The 9f rider's source: `steering/fix-blockquote-rewrite-rulings.md`, block "2026-11-22T04:49" (his selection, its words quoted in the
  scope statement). The blocks govern.
- Stage set, quoted: "`fixer-fix-normalize-fence-loop` → `code-reviewer-fix-normalize-fence-loop` (under 20 production lines: the reviewer
  also runs the suite, typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan, critic, Phase 1
  or UAT."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`).
- Evidence:
  - The sweeps: `verification/fix-normalize-fence-loop/scoping/sweep.md` (at `132a7ab`), `sweep-0411d3b.md` (at `0411d3b`, run), and
    `verification/fix-blockquote-rewrite/scoping/sweep.md` (at `132a7ab`).
  - The refutation at `0411d3b`: `verification/fix-normalize-fence-loop/scoping/refutation-0411d3b.md`.
- **Usage:** `weekly_all` 3% (live, 08:49Z); at 98% every session checkpoints and stops until the reset. Keep your document's state current
  at each commit.

Repositories: `/usr/local/bin/hooks/website` (branch `chain/fix-normalize-fence-loop`, cut by steering from `origin/master` `0411d3b`,
no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use `git -C <repo>`.

## Standing prohibitions relied on (quoted whole)

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

His standard for questions put to him (effort rulings `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-21T18:37Z"): context
first, then the decision, in plain English, with no commit IDs or technical detail he would have to look up.

Further rules for this chain:
- Never read a `.env*` value.
- Never use the bare word `none` anywhere in a command.
- A call stopped by a control: stop, message `steering-hooks-fixer`, and never re-issue it in another form. The record says only "not
  completed". A hang or timeout is not a control and may be retried once.
- Record documents are written with Write/Edit or `record-edit.js`, never a shell heredoc.
- Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`.
- Suite runs are memory-capped (`systemd-run --user --scope -p MemoryMax=8G …`).
- Mutations and probes run in a `git archive` export, never in the shared tree.
- A local build saves nothing in this chain. If one ever does, the CLAUDE.md id-range rule applies first.

## Architecture

No architecture passage is known to name these files; steering lodges any entry at closure.

## Hazard-bearing analysis (each a candidate to re-derive)

1. Loop: `getInitialValue.ts:96` (`*`) stores a bare fence's lang as `''`; `withNormalizeNode.ts:66` (`+`) and the reset at `:71` leave
   `currentLang` null; the compare at `:35` is always true, so `handleEditor(update=true)` re-runs each pass, and the quote branch's
   `Transforms.insertText` at `:49-51` (no equality guard; `flattenNodeText.ts:13` always prefixes `> `) re-dirties the editor. Either limb
   alone ended the loop in the probes (`+`→`*` at `:66`; a changed-text guard at `:49`; `(child.lang || null)` at `:35`).
2. `>>>` rewrite: `getInitialValue.ts:32-35` strips `>>> ` and sets multiline state, `:47` strips `> `, no marker is stored on the node,
   and `flattenNodeText.ts:13` emits `> ` per blockQuote. `SlateEditor/index.tsx:58-59` writes on mount; `Desktop.tsx:45-52` writes on
   blur. Partial editors (`EmbedField.tsx:75`, `EmbedTitle.tsx:93`) delete the marker (`>>> a` → `a`).
3. Interaction: `handleEditor` reads `flattenNodeText` at `withNormalizeNode.ts:24`, and its `>>> ` test at `:29` cannot match after load.
   A stored marker changes what `:24` and `:29` see, and `:49-50` matches both `>>> ` and `> `. Re-run the loop cases with `>>>` inputs
   after the 9f change.
4. The emoji chain (released `0411d3b`) edited `withNormalizeNode.ts` and `getInitialValue.ts`. Its tests
   (`withNormalizeNode.emoji-keeps-line-text.test.tsx`, `getInitialValue.stored-text-loads-unchanged.test.ts`) must stay green.
