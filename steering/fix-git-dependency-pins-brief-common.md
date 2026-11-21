# Brief, common part — fixer chain `fix-git-dependency-pins`

From `steering-hooks`, written 2026-11-21T22:58Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. tmux category: `fix-git-dependency-pins`.

## Determination and stage set

- His words and the determination (scope statement in two halves, write set, exclusions, what the sweep did not cover):
  `/usr/local/bin/hooks/agent-output/steering/fix-git-dependency-pins-rulings.md`, blocks "2026-11-21T22:28" and "2026-11-21T22:58". The
  blocks govern.
- Stage set, quoted: "`fixer-fix-git-dependency-pins` → `code-reviewer-fix-git-dependency-pins` (production lines added under 20: the
  reviewer also runs the suites, typecheck and the fixer's red evidence) → devops: project-utils `master` push (mid-chain, no approval) →
  fixer: the website pin → reviewer → devops for website `master` (his word). No plan, critic, Phase 1, QA or UAT."
- Sources: `/usr/local/bin/hooks/agent-output/handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` (H37; its item 4 = H41);
  `/usr/local/bin/hooks/agent-output/research/codebase-bug-evaluation-2026-11-08.md` F-36.
- Sweep: `verification/fix-git-dependency-pins/scoping/sweep.md`; refutation runs: steering's scratch `refute-pins/` (summarised in block
  22:28).

Repositories (workspace `/usr/local/bin/hooks` is not a repository: `git -C <repo>` on every call):
- `/usr/local/bin/hooks/project-utils` — branch `chain/fix-git-dependency-pins`, cut by steering from `origin/master` `749606d`, no upstream.
- `/usr/local/bin/hooks/website` — **not yet this chain's.** It is on chain 6's branch until chain 6 releases. Steering switches it to
  `chain/fix-git-dependency-pins` and tells the fixer; until that message, no stage of this chain reads or writes the website working
  tree (read website at `origin/master` with `git show`/`git grep` only).
- `/usr/local/bin/hooks/agent-output` — the record.

## Standing prohibitions relied on (quoted whole)

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

His standard for questions put to him (effort rulings block "2026-11-21T18:37Z"): context first, then the decision, plain English, no
commit IDs or technical detail he would have to look up.

No stage reads preview-image-generator. Never read a `.env*` value. Never use the bare word `none` (or a path ending `/none`) as a command
operand. Any call not completed: stop, message `steering-hooks`, never split, re-word or re-issue it in another form; the record says only
"not completed". Record documents are written with Write/Edit or `record-edit.js`, never a shell heredoc. Website Test Conventions:
`/usr/local/bin/hooks/agent-output/CLAUDE.md`. Runs are memory-capped (`systemd-run --user --scope -p MemoryMax=8G …`; `ulimit -v`
breaks vitest).

## Architecture

`/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` L121, L166 (records the project-utils pin as `eb38a15`, behind the
lock's `749606d`), L236-237 (the 13 `dist/` files). Not edited by any stage: steering lodges them for the architect at closure.

## Hazard-bearing analysis (each a candidate to re-derive)

1. Project-utils carries its build output in the tree (`~/.claude/skills/pinned-dep-shipping/SKILL.md`): `build` is `tsc -b && rimraf dist
   && cp -r build/js dist`, so a rebuild rewrites all of `dist/`. Show the rebuilt `dist/` equals the committed one apart from
   `prisma.js(.map)`; a difference elsewhere means the committed `dist/` is already stale — stop and message steering.
2. Moving `prisma-kysely` to `devDependencies` removes it from every consumer's installed set. Inside this workspace the only consumer is
   website (its runtime never imports it, read from code). Consumers outside the workspace are unread.
3. A website pin must name a commit GitHub serves: the new project-utils commit exists on GitHub only after devops's mid-chain push.
4. Pin by hand (his selection): `pnpm install --lockfile-only` after editing `package.json` re-resolves ~91 / ~40 unrelated lockfile lines
   (refutation run). Edit `pnpm-lock.yaml` by hand and prove it with `pnpm install --frozen-lockfile`; the diff names only the two packages
   and what only they held.
5. The shared website tree's `.next/types/validator.ts` is stale (names the deleted `cron.ts`); `pnpm run typecheck` there fails until
   `next typegen` or a build regenerates it. Run checks in an export.

## What this brief did not check

`mr-tech/paracord`'s branches; consumers outside the workspace; project-utils' lockfile contents; whether `dist/` rebuilds identically.
