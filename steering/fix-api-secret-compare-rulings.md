# Rulings — fixer chain `fix-api-secret-compare` (website: API credential checks are not constant-time; the bot endpoint admits an empty token)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 5 of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z", "05:38Z",
"05:50Z". tmux category: `fix-api-secret-compare`. Source: `handoff/website-api-handler-hardening-2026-10-10.md` (b1fdd41a).

## 2026-11-21T13:39Z — selection: chain 5's scope (empty token refused; id rider in; the handoff whole)

Selection prompt put 11:4xZ, answered 13:39Z (ledger `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T13:39Z —
steering-hooks"); wording this thread's. Premises, read before the prompt: the sweep `verification/fix-api-secret-compare/scoping/sweep.md`
(`6be102a`, at `76da25c`); its re-read at `b68f94c` (`premises-b68f94c.md`, `dec5170`: nothing in the region changed, every cited line
the same); the refutation helper (`refutation-empty-token.md`, `0b700a4`, the real handler and `env.mjs` run under node with dummy
values): (a) `interactions-server.ts:11` plain `!==` HOLDS (read from code); (b) an empty `HOOKS_API_TOKEN` passes validation and an
empty header passes the check (run; an omitted header is refused); (c) with `SKIP_ENV_VALIDATION=1` an unset token and no header pass
(run; without the flag an unset token throws at import); (d) no repository file sets the flag (grep; the host is unread); (e) both v1
handlers refuse an unset or empty `STATBOT_API_KEY` (read from code; the bundle failed on `satisfies`).
- Q empty token: A "Agent: refuse empty token (Recommended)" — "The bot endpoint refuses when its token is empty or unset, as the
  Statbot API endpoints already do. If production's token is in fact empty, the bot's get_message command stops working until you set a
  token in Vercel (unread: production's value)."; B "Agent: constant-time only". Chosen: **A**.
- Q id rider (v1 `messages/[id].ts:19` `z.number({ coerce: true })`): A "Agent: fix it in chain 5 (Recommended)" — "the strict check the
  editor's API already uses (digits only, in range)"; B "Agent: separate chain later"; C "Agent: don't fix". Chosen: **A**.
- Q handoff rest (b1fdd41a item 3, a guard test over every v1 route; item 5, the `makeRes` helper move, 4 importers): A "Agent: include
  both (Recommended)" — "closes that handoff whole … test-file changes only"; B "Agent: guard test only"; C "Agent: neither". Chosen: **A**.
Exclusions he saw in the prompt: `cron.ts`'s check (chain 6 deletes the endpoint); the Discord signature check (`discord-verify`, a
library). The determination, the stage set and the briefs are written next, from this block.
