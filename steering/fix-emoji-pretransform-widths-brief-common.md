# Brief, common part — fixer chain `fix-emoji-pretransform-widths`

From `steering-hooks-fixer`, written 2026-11-22T22:59Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. tmux category: `fix-emoji-pretransform-widths`.

## Determination and stage set

- His words and the determination (scope statement, write set, exclusion, what the sweep did not cover):
  `/usr/local/bin/hooks/agent-output/steering/fix-emoji-pretransform-widths-rulings.md`, blocks "2026-11-22T22:56" (his two selections:
  this chain next; start now despite the weekly limit) and "2026-11-22T22:59" (the determination). The blocks govern.
- Stage set, quoted: "`fixer-fix-emoji-pretransform-widths` → `code-reviewer-fix-emoji-pretransform-widths` (under 20 production lines:
  the reviewer also runs the suite, typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan,
  critic, Phase 1 or UAT."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`).
- Sweep: `/usr/local/bin/hooks/agent-output/verification/fix-emoji-pretransform-widths/scoping/sweep.md` (at `origin/master` `febf20e`).
  Prior evidence: `verification/fix-decorator-offsets/qa/emoji-rows-*.jsonl` (QA), `verification/fix-decorator-offsets/code-review/tip-a7e1adb/`
  (the code-fence probe and `norm-*.json`), and the refutation helper's paste probe (scratch
  `/tmp/claude-1000/-usr-local-bin-hooks/de89c5c3-7eac-431a-b09e-679fd5be1482/scratchpad/refute-paste/`, `results.jsonl`).
- **Usage:** the week's allowance is at 95%. At 98% every session checkpoints and stops until the reset (2026-11-25T09:00Z); keep your
  document's state current at each commit so a stop loses nothing.

Repositories: `/usr/local/bin/hooks/website` (branch `chain/fix-emoji-pretransform-widths`, cut by steering from `origin/master` `febf20e`,
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

Never read a `.env*` value (a probe that needs the env schema passes dummy values on the command line, as the refutation helper did).
Never use the bare word `none` anywhere in a command. A call stopped by a control: stop, message `steering-hooks-fixer`, never re-issue
it in another form; the record says only "not completed". A hang or timeout is not a control and may be retried once. Record documents are
written with Write/Edit or `record-edit.js`, never a shell heredoc. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`. Suite
runs are memory-capped (`systemd-run --user --scope -p MemoryMax=8G …`; `ulimit -v` breaks vitest). Mutations and probes run in a
`git archive` export, never in the shared tree. A local build saves nothing in this chain; if one ever does, the CLAUDE.md id-range rule
applies first.

## Architecture

No architecture passage is known to name these files; steering lodges any entry at closure.

## Hazard-bearing analysis (each a candidate to re-derive)

1. E-1 (text lost): `withNormalizeNode.ts` `handleElement` (L172-198) sizes the emoji element's range from the pre-treated `content.length`
   (`:slight_smile:` 14) over the original text (`🙂` 2): 12 characters after the emoji are replaced. Same path in a fenced code line.
2. E-2: `getInitialValue.ts` (L49-69) rebuilds text from the pre-treated parse, so a stored `\🙂` loads as `:slight_smile:` and onChange
   reports the rewritten string — a stored message changes on load.
3. The `escape` rule's node is 1 narrower than its source; an escape before an emoji shifts `handleElement`'s offsets (sweep item 9).
4. `decorator.tsx` (L222) was rewritten by the previous chain to use source widths for every node kind; the emoji pre-treatment still
   shifts its input — re-derive what remains.
5. Exclusion (not changed): an emoji element is stored and copied as `:name:` (`flattenNodeText.ts:11`, `onCopy.ts:29`).
6. No existing test touches `getInitialValue.ts` or `withNormalizeNode.ts`; `onCopy.cut.test.tsx` uses a hand-built emoji element the real
   parser would not produce.

## What this brief did not check

Real paste events, IME, Slate normalisation order, DOM mapping; custom Discord emoji via the picker.
