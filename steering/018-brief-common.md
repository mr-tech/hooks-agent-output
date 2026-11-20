# Brief, common part — the H-002/M-001 chain (Next.js upgrade and save-size cap)

From `steering-roadmap-hooks`, written 2026-11-20T03:1xZ at the determination. Every brief of this chain names this file second, after
its `Duties negated:` line, and adds only what is its stage's own. Written as `steering/website-deps-upgrade-brief-common.md`. It is
renamed `steering/018-brief-common.md` once the planner minted ID 018 (agent-output `2b7b2de`). Rulings for this chain:
`steering/018-rulings.md` from 2026-11-20T03:1xZ; the blocks before it are in `steering/website-deps-review-rulings.md`. The tmux
category stays `website-deps-upgrade` for the whole chain.

## Determination, his answers, stage set

- His word opening the chain: `/usr/local/bin/hooks/agent-output/steering/website-deps-review-rulings.md`, block "2026-11-20T01:59Z",
  question "H-002/M-001", chosen "Agent: separate chain after H-001 (Recommended)".
- Scoping determination (the bounded scope statement, the exclusions, what the sweep did not cover): same file, block
  "2026-11-20T02:53Z — scoping determination: the H-002/M-001 chain (planned); A-1 read made".
- His three answers: same file, block "2026-11-20T03:08Z". In short (the block governs): Next.js **16.4.6**, with its lint and analyzer
  packages; a **Vercel preview deploy** of the chain branch, checked before the release push; scope **as determined**.
- Stage set, quoted from block 02:53Z: "planner → critic (first pass at xhigh) → architect conformance → QA Phase 1 → implementer →
  code-reviewer → QA Phase 2 → UAT (the framework moves under every page) → security (`security-hooks-website-deps`, on the change and
  to close H-002 and M-001) → devops for website `master`. Retrospective at close-out." Analyst: only where the plan commissions one.
- End step: website `master`, which Vercel deploys to production. His word is needed for it, and devops asks for it in its own session.
  A push of the chain branch deploys only a Vercel preview, so it needs no prompt (the 03:08Z selection names it).

Repositories: `/usr/local/bin/hooks/website` (the change), `/usr/local/bin/hooks/project-utils` (read only), and
`/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository, so use `git -C <repo>` on every call.
- The website tree is on `master` at `7923a1d`, equal to `origin/master` (read 02:5xZ). The chain branch is not cut yet; steering cuts it
  at implementation start.
- Until then, read website code at `origin/master` (`git show origin/master:<path>`) and run nothing in the shared tree. A stage that
  needs a build or a run uses an isolated export with its own install, under a cap.

## Standing prohibitions relied on (quoted whole)

From `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Local builds of `website` — before the first save":

> A locally served build publishes its save event to the Pusher app named in `website/.env.local`, on the channel
> `message-update-<message id>`, and a fresh local database numbers messages from 1. Whether that Pusher app is production's is not
> established on this box, so treat it as production's: a local save on a low id can raise "Message Update Detected" for a real user
> editing the production message with the same id.
>
> **Before any save on a local build, move the local message ids out of production's range**:
>
> ```sql
> ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001;
> ```
>
> Run it after the schema is pushed and before the first save, and record in the stage document the id range the walk wrote. A local
> database that already holds low-numbered messages is recreated, not reused. `.env.local` holds credentials: read key names, hosts and
> ports only, never a value.

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **Use the channels I've provided, fully and without asking.** The Discord test server (guild `1566742402180456559`) is the agents'
> own: type, send, run commands and change it as a test needs, as a test account or the test bot. A webhook or channel I hand over for a
> tool — the watchdog, the challenge alerts — is used for its stated purpose. Each place I add is used the same way.
>
> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His standing ruling on test accounts, `/usr/local/bin/hooks/agent-output/steering/015-rulings.md` line 429:

> Test accounts may sign in on live hooks.gg, and agents may write to the production database through them without asking, provided it
> is not customers' data.

His standing rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

Secret files: the preview-image-generator's `.github/workflows/prod.yml` is flagged by the secret-file gate. The gate refuses `grep`
and `git grep` calls that print lines even where they never aim at that file; its message names the permitted forms (counts, listings).
It refused four searches during this chain's scoping. Name repositories and paths explicitly, use a permitted form, report any refusal
to steering by message, and never re-issue a refused call in another form.

Screenshots and captured media stay untracked (his ruling, `steering/017-rulings.md` block 2026-11-19T09:01Z).

Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)".

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`. Its line 179 still lists the direct
  `sharp` that website `7923a1d` removed. devops of `fix-message-page-header-decode` routed that to the architect through
  `agent-output/INBOX.md`, and this chain's architect owns it.
- Per-repo record: `/usr/local/bin/hooks/agent-output/architecture/website.md`.

## Hazard-bearing analysis (each a candidate to re-derive)

1. **The findings:** `/usr/local/bin/hooks/agent-output/security/website-deps-review-security-audit.md`: H-002, M-001, A-1, A-2, I-6,
   and its Resumption State (security's bars for this chain).
2. **The sweeps:** `verification/website-deps-review/scoping/sweep-next-upgrade.md` (Next.js surface; Sections 2, 4 and 6 in the
   steering addendum) and `sweep-unbounded-input.md` (the 11 save-list sites, body limits, error-to-response path).
3. **The save lists' limits do not stop per-item errors:** `verification/website-deps-review/scoping/refute-zod-max/output.txt` (zod
   3.22.4, the real `shapes.ts`: 50 invalid embeds over a limit of 10 give 51 issues). A cap placed as a zod `.max()` alone does not
   meet M-001's bar.
4. **The lint packages:** `eslint-config-next` 16.x declares `eslint >=9.0.0` as a peer (`npm view`, sweep §5). Website has `eslint ~8.57.0`
   and `.eslintrc.json` (`package.json` at `origin/master`, read 03:1xZ). Moving the lint packages to 16.4.6 may bring an ESLint 9 and
   flat-config move. Whether that fits the scope he chose is the planner's to state; a milestone it adds is a scope delta for him.
5. **Behaviour tied to Next 16.1.6:** 017's navigation guards and link interception (AN-2, X-14, D-12; `planning/closed/017-existing-items-backlog.md`
   lines 232, 290, 749, 1375, 1396); 004's `next/dynamic` preload (`planning/closed/004-lazy-loading-preload-overhaul.md` lines 39,
   64); and two test helpers on Next.js internals (`src/components/__tests__/helpers/linkNavigation.tsx:1`,
   `src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx:12`).
6. **pnpm and `overrides`:** `package.json`'s `overrides` key is not honoured by pnpm (audit I-6). A pin must be written where pnpm
   reads it and proved from the lockfile.
7. **The preview:** a branch push makes a Vercel preview (two READY previews from `probe/017-waituntil*`, 2026-11-19, `vercel api`).
   Preview has no Postgres or Redis keys, and it shares Discord and Pusher keys with production (env key names and targets, values
   unread). Signed-in and saving flows cannot run there.
8. **Image serving:** `verification/website-deps-review/scoping/a1-vercel-image-config.json`. Steering reads it as Vercel's image
   service answering `/_next/image` (an inference, block 02:53Z). At 16.4.6 security's A-1 is moot for its Next.js entries (security's
   reading).

## What this brief did not check

- Next.js release notes between 16.1.6 and 16.4.6.
- The framework's default body limit value.
- Vercel's platform request limits.
- Whether ESLint 9 is required in practice, or whether `eslint-config-next` 16 installs with a peer warning.
- Whether the preview build uses the same Node version and build machine as production.
