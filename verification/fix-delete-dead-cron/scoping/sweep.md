# Sweep B — fix-delete-dead-cron scoping

Refs: website origin/master 76da25c, project-utils origin/master 749606d. Code read at the ref only.

## B1 — references to `/api/cron` or `ScheduledMessages`

Method: `git -C website grep -nEi "api/cron|ScheduledMessage|scheduledMessage|cron-parser|cron" origin/master -- . ':!pnpm-lock.yaml' ':!src/generated'` (output was cut at 60 lines, so the list below was completed with targeted greps for `src/@types/global.d.ts`, `shared.ts`, `guild.ts`, and `bot lang patches README.md .github`), and `git -C project-utils grep -nEi "ScheduledMessage|api/cron|cron" origin/master -- . ':!pnpm-lock.yaml'`.

"Break" means: if `src/pages/api/cron.ts` and the `vercel.json` `crons` entry are deleted (table and column left in place).

| File:line | What | Breaks on deleting endpoint + vercel.json entry? |
|---|---|---|
| `website/vercel.json` (the whole file: `"crons":[{"path":"/api/cron?key=vercel","schedule":"0 0 * * *"}]`) | the scheduler | It is the entry being deleted. The file holds nothing else, so the file goes or becomes `{}`. |
| `website/src/pages/api/cron.ts:1-81` (`:15` key check, `:21-27` select, `:48-70` updates) | the endpoint | The deletion target. |
| `website/package.json:52` `"cron-parser": "^4.8.1"` | dependency | Not broken. `git grep -n "cron-parser" origin/master -- src` shows its only importer is `cron.ts:1`; so the dependency becomes unused (removal is a choice; lockfile not examined). |
| `website/src/server/api/__tests__/cron.scheduled-selection.test.ts:22,25-46` (`import('~/pages/api/cron')`; 3 cases) | tests of the endpoint | **Breaks** (import fails) unless deleted with the endpoint. |
| `website/src/server/api/utils/guild.ts:54-62` `.leftJoin('ScheduledMessages', ...)` selecting `scheduledMessageId/Cron/Error/SendAt/Sent` | read-side join in the guild message list | **Does not break** (table stays) but it depends on the table, so it breaks if the table is dropped. |
| `website/src/server/api/utils/shared.ts:37-86` (`DatabaseScheduledMessage`, `isScheduledMessage`, `tmp.scheduledMessage = {...}`) | maps joined rows to the API shape | Same: independent of the endpoint; depends on the table and columns. |
| `website/src/@types/global.d.ts:73-101` `ApiScheduledMessage`, `scheduledMessage?` on the message type | type | Independent of the endpoint. |
| `website/src/server/api/routers/__tests__/message.personal-ownership.test.ts:102-106,129` (`scheduledMessage*` fields, `sql.includes('left join "ScheduledMessages"')`) | fixture of the join | Independent of the endpoint. |
| `website/src/generated/Database/types.ts:50-94`, `website/src/generated/db/types.ts:57-101` | generated Kysely types (excluded from the first grep, found by the project-utils-style grep) | Independent. |
| `project-utils/prisma/schema.prisma:92,116,136-151` (`model ScheduledMessage`, `@@map("ScheduledMessages")`, relations on Guild/Message) | schema | Independent of the endpoint; table drop would be a schema change. |
| `project-utils/src/generated/Database/types.ts:50,94`, `src/generated/db/types.ts:57,101`, `dist/index.d.ts:29,78,85` | generated types, committed `dist/` | Independent. |
| `website/src/**/utils` use of `DatabaseSchema` in `cron.ts:3,48` | type import | only in the deleted file. |

Not found: `ecosystem.config.json` (website; a single pm2 app running `next start`, no cron), README.md (`git show origin/master:README.md | grep -niE "cron|schedul"` -> no match), `.github` (none listed), `bot/`, `lang/`, `patches/` (grep returned 0), package.json scripts (only the `cron-parser` dependency), env schema (`src/env.mjs` has no cron-key entry), project-utils README/package.json (grep for cron/schedul returned nothing).

Agent-output record (`grep -rnE "ScheduledMessages|/api/cron" architecture research planning/closed handoff`):
- `architecture/system-architecture.md:172` "Cron: daily `/api/cron?key=vercel` per `vercel.json`." (a doc line that would go stale on deletion); `:90` diagram mentions "interactions, cron".
- `research/competitive-feature-landscape-2026-11-08.md:166` "Executor exists, no writer": `cron.ts` selects due rows, POSTs, advances `sendAt` by cron-parser or marks sent; `:67` lists `cron.ts`/`vercel.json` as existing assets; `:502` feature S1 "Scheduled send, one-off" is proposed on top of the `ScheduledMessages` table and `cron.ts` executor (needs a tRPC writer); `:624` notes `webhookUrl` would be stored plaintext.
- `research/codebase-bug-evaluation-2026-11-08.md:84` F-1: cron never selected any row because `error = $1` with null; `planning/closed/015-bug-evaluation-fixes.md:332-333` fixed that selection and states "no producer inserts into `ScheduledMessages`", so the fix had no observable effect in production.
- `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` (UUID 4bc9b626, Open, read whole): `GET /api/cron?key=vercel` (`cron.ts:12-81`, schedule `0 0 * * *`) is guarded only by `req.query.key !== 'vercel'` -> 404 (`cron.ts:15`); the key is a constant in source and URL; takes no message identifier; reads `Messages.data` via `ScheduledMessages` and updates `ScheduledMessages`; anyone can trigger it, the effect being sending already-due rows to their stored webhook URL; no procedure writes `ScheduledMessages`; sweep class UNCLEAR; not established: whether Vercel config/env adds another check, or what an off-schedule trigger changes in practice. States no remedy. Evidence: `verification/access-defects/scoping/sweep.md` row S14 at website 787bec5.
- `handoff/closed/bug-evaluation-fixes-post-deploy-2026-11-08.md` hits on the grep are about a live-schema check and were not read for cron content.

Writers of `ScheduledMessages` in website at the ref: none found. `git grep` shows `insertInto('ScheduledMessages')` is not in the earlier output (the table appears only in `selectFrom`, `leftJoin`, `updateTable` in `cron.ts` and the `leftJoin` in `guild.ts`). Whether rows exist in the production database was not checked (no database read); deletion of the endpoint is safe for code but the row population is unknown.

## UI that creates a scheduled message
`git -C website grep -niE "schedul" origin/master -- src/app src/components` returned 4 lines: `src/app/legal/privacy/page.tsx:600` (legal text about student schedules) and `src/app/message/m/[id]/edit/page.tsx:111,114` (`requestIdleCallback` "schedule" local variable). No UI creates a scheduled message. The tRPC side has no writer either (`insertInto('ScheduledMessages')` absent; `research/...:166` agrees). The only appearance of scheduled data in the UI path is the read-side `scheduledMessage?` field from `shared.ts`, which nothing populates.

## Not covered
- Production database contents and Vercel dashboard cron/env configuration.
- The `grep` of the first command was cut at 60 lines; coverage of the remainder was by targeted greps, so a hit in a file outside those I named (e.g. a component reading `scheduledMessage`) is possible. A grep of `src/app src/components` for `scheduledMessage` was not run separately.
- Lockfiles (pnpm-lock.yaml) and `src/generated` in website were excluded from the grep.
- preview-image-generator: count-only grep of src for `api/cron|ScheduledMessages|STATBOT_API_KEY` returned no matching file; nothing else read there.
- No .env file read; no test or build run.
