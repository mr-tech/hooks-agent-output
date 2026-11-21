# Sweep — fix-delete-dead-cron scoping, read at origin/master

Written 2026-11-21 by a sweep helper. Every fact below carries the command that produced it, run from `/usr/local/bin/hooks/agent-output` unless shown otherwise. Nothing committed.

## Placement

The path requested for this sweep, `/usr/local/bin/hooks/agent-output/verification/fix-delete-dead-cron/scoping/sweep.md`, already exists (7.2K, titled "Sweep B", citing website `76da25c` and project-utils `749606d`). I did not overwrite it, because it is another author's record. This sweep is in `/usr/local/bin/hooks/agent-output/verification/fix-delete-dead-cron/scoping/sweep-origin-0c14d5b.md`. Steering decides which file stands.

Relation of the two SHAs: `git -C /usr/local/bin/hooks/website diff --quiet 76da25c 0c14d5bed78fd938f8290ed9ae57834e093bfdc1 -- src/pages/api/cron.ts vercel.json` exits 0 (both files identical), and `git -C /usr/local/bin/hooks/website rev-list --count 76da25c..0c14d5bed78fd938f8290ed9ae57834e093bfdc1` prints 20. I did not check the other 20 commits for other changes to the table or to the Vercel configuration.

## Refs read

| Repo | origin/master SHA | Command |
|---|---|---|
| website | `0c14d5bed78fd938f8290ed9ae57834e093bfdc1` | `git -C /usr/local/bin/hooks/website ls-remote origin master` |
| project-utils | `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` | `git -C /usr/local/bin/hooks/project-utils ls-remote origin master` |
| preview-image-generator | `8512a1d003af7fdbce56b85ef27218dd885becd1` | `git -C /usr/local/bin/hooks/preview-image-generator ls-remote origin master` |

Code was read with `git show <sha>:<path>`, `git grep ... <sha>` and `git ls-tree`. The working tree was not used for code.

## Process notes

1. One Bash call was not completed. It combined a website `git grep` for `cron-parser`, a website `ls-tree` for `.github` and yml files, and a preview-image-generator `git grep -c` pathspec sanity count; no part of it was re-issued. Consequences: (a) the preview-image-generator zero-hit result in step 3 has no independent pathspec sanity count; (b) the `cron-parser` count and the website `.github` check are taken from earlier calls (listed in steps 1 and 3), not from that batch.
2. I wrote a scratch file `/tmp/unused` by mistake (an output redirect in a record grep, against the scratchpad rule) and deleted it with `rm -f /tmp/unused` (exit 0).

## Step 1 — the schedule

Command: `git -C /usr/local/bin/hooks/website show 0c14d5bed78fd938f8290ed9ae57834e093bfdc1:vercel.json | cat -n` — whole file, 8 lines:

```
1 {
2   "crons": [
3     {
4       "path": "/api/cron?key=vercel",
5       "schedule": "0 0 * * *"
6     }
7   ]
8 }
```

The file holds only the `crons` key, with one entry. Deleting that entry leaves `{ "crons": [] }`, or `{}` if the key is removed too. This ref has no `buildCommand` key (planning/closed/018 cites a `buildCommand` in `vercel.json` at `7923a1d`, a different ref).

Other scheduling or cron configuration in website:
- Command: `git -C /usr/local/bin/hooks/website ls-tree -r --name-only 0c14d5bed78fd938f8290ed9ae57834e093bfdc1 | grep -iE '(vercel|cron|\.github|netlify|wrangler|scheduler)'` — 3 paths: `src/pages/api/cron.ts`, `src/server/api/__tests__/cron.scheduled-selection.test.ts`, `vercel.json`. The same pattern includes `\.github`, so the website tree has no `.github` entries.
- Command: `git -C /usr/local/bin/hooks/website grep -n -i -E 'crons?|schedule' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1 -- ':!*.lock' ':!pnpm-lock.yaml'` — cron-related hits: `package.json:52` `"cron-parser": "^4.8.1"`; `vercel.json:2,4,5`; `src/pages/api/cron.ts:1,20-27,28-40,48-50,56,60,67,71`; the test file; and `src/@types/global.d.ts:73,75,101` and `src/server/api/utils/shared.ts:38-88` (scheduled-message data types, not cron config). No other scheduler configuration.
- Command: `git -C /usr/local/bin/hooks/website grep -n -i 'vercel' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1 -- ':!*.lock' ':!*lock.json' ':!*lock.yaml'` — 27 files. None other than `vercel.json:4` is a cron entry. Others are `@vercel/*` packages, `VERCEL_URL` / `VERCEL` reads in `src/env.mjs:15-19` and `src/utils/getBaseUrl.ts:4-5`, a `.vercel` line in `.gitignore:82`, and README boilerplate.
- `src/middleware.ts` (present at this ref): `git -C /usr/local/bin/hooks/website grep -n -E 'matcher|/api/' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1 -- src/middleware.ts` — line 6 `matcher: ['/message', '/message/(.*)', '/api/guilds/(.*)', '/preview']`. `/api/cron` is not matched, so middleware does not sit in front of the cron route.

## Step 2 — the endpoint

File: `src/pages/api/cron.ts` (81 lines). Read in full with `git -C /usr/local/bin/hooks/website show 0c14d5bed78fd938f8290ed9ae57834e093bfdc1:src/pages/api/cron.ts | cat -n`.

Imports:
- line 1 `parseExpression` from `cron-parser`
- line 2 `isApiError` from `paracord`
- line 3 `getPostgres`, type `DatabaseSchema` from `project-utils`
- line 5 type `UpdateObject` from `kysely`
- line 6 types `NextApiRequest`, `NextApiResponse` from `next`
- line 8 `getApi` from `~/utils/discord`

Defined in the file:
- line 10 `const database = getPostgres();` (module scope)
- line 12 `export default async function handler(req, res)` — the only export
- locals: `api` (13), `scheduled` (20), `promises` (42), `update` (48), `newSendAt` (50), `message` (65)

Key check: line 15 `if (req.query.key !== 'vercel') {` then line 16 `res.status(404).end();`. The key is a string literal. The file reads no environment variable.

Table operations in the file: `selectFrom('ScheduledMessages')` at lines 20-27 (with a `leftJoin` to `Messages` at line 22); `updateTable('ScheduledMessages')` at lines 55-59 (success path) and 66-70 (catch path). Commented-out Prisma equivalents at lines 28-40, 60-63, 71-74.

## Step 3 — references in the three repos

Counts were taken with the commands shown. Hits are `repo:path:line — text`.

**(a) Route path and key.** Command: `git -C /usr/local/bin/hooks/website grep -n -i -E 'api/cron|cron\?|key=vercel|CRON_SECRET|cronkey|cron_key|CRON_KEY' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1` — 2 hits:
- `website:vercel.json:4 — "path": "/api/cron?key=vercel",`
- `website:src/server/api/__tests__/cron.scheduled-selection.test.ts:23 — ({ default: handler } = await import('~/pages/api/cron') as { default: Handler });`

No `CRON_SECRET` or similar name in website. project-utils and preview-image-generator: no `api/cron` hit (see the scoped commands in this step).

**(b) Route file basename `cron`.** Command: `git -C /usr/local/bin/hooks/website grep -n -E "(pages/api/cron|/cron['\"]|/cron\.ts|\bcron\.(ts|js|mjs|json))" 0c14d5bed78fd938f8290ed9ae57834e093bfdc1` — 1 hit: the test file, line 23 (same line as in (a)).

**(c) The literal key `'vercel'` in code.** Command: `git -C /usr/local/bin/hooks/website grep -n -E "'vercel'" 0c14d5bed78fd938f8290ed9ae57834e093bfdc1`:
- `website:src/pages/api/cron.ts:15 — if (req.query.key !== 'vercel') {`
- `website:src/server/api/__tests__/cron.scheduled-selection.test.ts:28 — await handler({ query: { key: 'vercel' } } as never, makeRes() as never);`
- `website:src/server/api/__tests__/cron.scheduled-selection.test.ts:38` — same statement.

**(d) Identifiers.** `handler` (the default export): `git -C /usr/local/bin/hooks/website grep -c -E '\bhandler\b' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1` lists 24 files; the word is generic, so only the cron test is cited here (line 17 `let handler: Handler;`, 23, 28, 38). `database` (module const) is too generic for a useful count and was not searched exhaustively.

**(e) Key or secret names.** Command: `git show 0c14d5bed78fd938f8290ed9ae57834e093bfdc1:src/env.mjs | grep -n -o -E '[A-Z_]*(CRON|SECRET|KEY)[A-Z_]*' | sort | uniq -c`. Names only: `NEXTAUTH_SECRET`, `SECRET`, `DISCORD_CLIENT_SECRET`, `CDN_KEY`, `CDN_SECRET`, `DISCORD_PUBLIC_KEY`, `ENCRYPTION_KEY`, `PUSHER_SECRET`, `PREVIEW_IMAGE_API_KEY`, `NEXT_PUBLIC_PUSHER_KEY`. No cron-named variable. Website tree has no `.env.example` (`git ls-tree -r --name-only ... | grep -E '(^|/)\.env|env\.mjs|\.env\.'` lists only `src/env.mjs`). No values were printed.

**(f) The table `ScheduledMessages`, case-insensitive.** Command: `git -C /usr/local/bin/hooks/website grep -c -i -E 'scheduled_?messages?' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1` — 67 lines in 8 files:
- `src/@types/global.d.ts` 2
- `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx` 7
- `src/pages/api/cron.ts` 12
- `src/server/api/__tests__/cron.scheduled-selection.test.ts` 3
- `src/server/api/routers/__tests__/message.get-one-not-found.test.ts` 6
- `src/server/api/routers/__tests__/message.personal-ownership.test.ts` 6
- `src/server/api/utils/guild.ts` 4
- `src/server/api/utils/shared.ts` 27

Full line list: `git -C /usr/local/bin/hooks/website grep -n -i -E 'scheduled_?messages?' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1 -- src`. No hit in `bot`, `lang`, `patches`, `public`, `README.md`, `package.json` (except the `cron-parser` line above, which the pattern does not match), or the docs.

project-utils: `git -C /usr/local/bin/hooks/project-utils grep -c -i -E 'scheduled_?messages?' 749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` — 10 lines in 4 files: `dist/index.d.ts` 2 (lines 29, 78), `prisma/schema.prisma` 4 (lines 92, 116, 136, 151), `src/generated/Database/types.ts` 2 (lines 50, 94), `src/generated/db/types.ts` 2 (lines 57, 101). The project-utils `grep -n -i -E 'cron|vercel|api/cron|key=|scheduled'` (lockfile excluded) returns only these table lines plus the `cron` column lines (`prisma/schema.prisma:143`, `dist/index.d.ts:85`, `src/generated/db/types.ts:64`, `src/generated/Database/types.ts:57`). No cron route or key in project-utils.

preview-image-generator: `git -C /usr/local/bin/hooks/preview-image-generator grep -c -i -E 'cron|vercel|scheduled|api/cron|ScheduledMessage|key=' 8512a1d003af7fdbce56b85ef27218dd885becd1 -- src package.json ':(glob)*.md'` — no output (exit 1), so 0 hits. Caveat: the pathspec sanity count was in the batch that was not completed, so this zero is not independently confirmed. Top-level files of that repo (`git ls-tree --name-only`): `.eslintignore .eslintrc.json .github .gitignore README.md ecosystem.config.js package-lock.json package.json src tsconfig.json`. `.github` was not searched.

## Step 4 — writers and readers, schema

Writers (SQL-producing call sites):
- `website:src/pages/api/cron.ts:56 — .updateTable('ScheduledMessages')` (success path, sets `sent`, `error`, or `sendAt`)
- `website:src/pages/api/cron.ts:67 — .updateTable('ScheduledMessages')` (catch path, sets `error` and `sent`)

Total writers: 2 call sites, both in `cron.ts`, both updates to rows already selected by the same handler. Command: `git -C /usr/local/bin/hooks/website grep -n -i -E "(insertinto|updatetable|deletefrom|upsert|\.create|\.update|\.delete)[^;]{0,60}sched" 0c14d5bed78fd938f8290ed9ae57834e093bfdc1` returns exactly those two lines. No INSERT, create, upsert or delete against `ScheduledMessages` exists in website, project-utils, or preview-image-generator (scoped as in step 3).

History: `git -C /usr/local/bin/hooks/website log --oneline -G 'insertInto\([^)]*[Ss]cheduled' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1` prints nothing; `git log --oneline -G 'scheduledMessage\.(create|upsert)'` prints nothing; `git log --oneline -G 'ScheduledMessages'` prints 7 commits (not inspected individually); `git log --oneline -S 'ScheduledMessages' -- src/pages/api/cron.ts` prints `a974c25 fix join queries` and `98ecb0b replace prisma with kysely`. In project-utils, `git log --oneline -G 'insertInto|scheduledMessage'` prints 5 commits (`4b5c9b6`, `248663d`, `e6249b0`, `67c7bf9`, `7393691`); this is a loose pattern and I did not inspect those commits.

Readers (SELECT or JOIN call sites):
- `website:src/pages/api/cron.ts:21 — .selectFrom('ScheduledMessages')` with `leftJoin` to `Messages` (line 22), select (line 23), where clauses (lines 24-26) — the endpoint's own read
- `website:src/server/api/utils/guild.ts:54 — .leftJoin('ScheduledMessages', ...)` with select at lines 60-62 — a live read in the guild message query, not part of the endpoint
- `website:src/server/api/utils/shared.ts:161 — .leftJoin('ScheduledMessages', ...)` with select at lines 167-169 — a live read in the shared message query, not part of the endpoint

Total product-code read sites: 3. Test files reference the table only inside SQL strings they match (listed in step 3 (f)).

Schema definition:
- `project-utils:prisma/schema.prisma:136-152` — `model ScheduledMessage { ... @@map("ScheduledMessages") }`. Columns: `id`, `fk_guilds_id`, `fk_messages_id` (unique), `webhookUrl`, `createdAt`, `updatedAt`, `cron String?`, `sendAt`, `sent Boolean @default(false)`, `error String?`. Relations: `guild` (line 148) and `message` (line 149), both `onDelete: Cascade`. Back-relations: `prisma/schema.prisma:92` (`scheduledMessages ScheduledMessage[]` on Guild), `:116` (`scheduledMessage ScheduledMessage?` on Message).
- Kysely types: `project-utils:src/generated/db/types.ts:57-68` and `project-utils:src/generated/Database/types.ts:50-` (two generated copies); `project-utils:dist/index.d.ts:78-` (committed build output).
- Migrations: none. `git -C /usr/local/bin/hooks/website ls-tree -r --name-only 0c14d5bed78fd938f8290ed9ae57834e093bfdc1 | grep -i -E 'prisma|migrat|kysely|schema|\.sql$|generated'` lists only `src/kysely-adapter/database.ts`, `src/kysely-adapter/index.ts`, `src/lang/generated/*`, and a test; no `prisma/` or `migrations/` path. project-utils has 27 tracked files and no migrations folder (`git -C /usr/local/bin/hooks/project-utils ls-tree -r --name-only 749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`).

## Step 5 — tests that import or exercise the endpoint

- `website:src/server/api/__tests__/cron.scheduled-selection.test.ts` — the only test that imports the route. Case count: `git show 0c14d5bed78fd938f8290ed9ae57834e093bfdc1:src/server/api/__tests__/cron.scheduled-selection.test.ts | grep -c -E '\b(it|test)\('` prints 3 (three `it(` call sites, no `it.each`, so 3 cases). The route is loaded by dynamic import at line 23 inside `beforeEach`; it mocks `project-utils` (line 11) and `~/utils/discord` (line 12); helpers `../utils/__tests__/helpers/capturingDatabase` (line 5) and `./helpers/apiResponse` (line 7). If `cron.ts` is deleted and this file is kept, its `beforeEach` import fails.
- Command for the whole repo: `git -C /usr/local/bin/hooks/website grep -l -E 'pages/api/cron|api/cron' 0c14d5bed78fd938f8290ed9ae57834e093bfdc1` — 2 files: that test and `vercel.json`.
- The test files that name `ScheduledMessages` but do not import the route (`MessageNotFound.edit-and-send-pages.test.tsx`, `message.get-one-not-found.test.ts`, `message.personal-ownership.test.ts`) exercise the guild and shared joins, not the endpoint.

## Step 6 — the record

Command: `grep -rln -E 'api/cron|cron\.ts|ScheduledMessage|cron-endpoint|key=vercel|vercel\.json|\bcron\b' architecture research planning handoff roadmap` run from `/usr/local/bin/hooks/agent-output` (the `closed/` subdirectories are included by the recursive grep; `roadmap/closed` does not exist, `ls -d` exit 2). Each hit with the line that names the item. The record is read from the working tree, as the task directed for the record, not from a product ref.

Hits that name the endpoint, table or schedule:
- `architecture/system-architecture.md:172 — 6. **Cron**: daily `/api/cron?key=vercel` per `vercel.json`.` (a doc line that deletion would make stale); `:90` diagram text `interactions, cron`.
- `architecture/architecture-diagram.mmd:6 — api["Pages Router API\ntRPC v11 · NextAuth · cron · v1"]`.
- `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` — read whole. UUID 4bc9b626, Status Open, Owning-Stage "steering thread for the website access surfaces", Review-Trigger "when website src/pages/api/cron.ts is next edited". Its body cites `cron.ts:12-81`, `cron.ts:15`, and says "No procedure writes `ScheduledMessages` (`research/competitive-feature-landscape-2026-11-08.md:166`). Sweep class: UNCLEAR." It also says "The owner left this surface out of the fix chain … This record states no remedy." Its evidence is cited as website `787bec5`; that SHA is an ancestor of `0c14d5b` (`git -C /usr/local/bin/hooks/website merge-base --is-ancestor 787bec5 0c14d5bed78fd938f8290ed9ae57834e093bfdc1`, exit 0), and `cron.ts` and `vercel.json` are identical between them (`git diff --quiet 787bec5 0c14d5b… -- src/pages/api/cron.ts vercel.json`, exit 0). The handoff's "No procedure writes" overstates the research line: the research line at `:166` says "No tRPC procedure creates or edits a row", and `cron.ts` itself edits rows (step 4).
- `research/competitive-feature-landscape-2026-11-08.md:67` (lists `src/pages/api/cron.ts`, `vercel.json` as assets); `:166` ("**Executor exists, no writer.** … No tRPC procedure creates or edits a row …"); `:211` and `:212` (scheduling UI rows, "cron column exists"); `:271` ("table + daily cron exist"); `:502` (S1: "Needs a tRPC writer + a send-page control"); `:503` (S2); `:620` (cadence daily, `vercel.json` `"0 0 * * *"`); `:624` (`webhookUrl` stored plaintext).
- `research/codebase-bug-evaluation-2026-11-08.md:84` — F-1: "Cron never selects any scheduled message … **No code in `website` inserts into `ScheduledMessages`** (`grep -rln ScheduledMessages src bot` → only `cron.ts`, `shared.ts`, `guild.ts`, `global.d.ts`)"; `:232` — "The cron handler returns `{ success: true }` regardless of how many rows it selected (F-1)."
- `planning/closed/015-bug-evaluation-fixes.md:332-333` — "M1-b (F-1) — every compiled cron selection filters `ScheduledMessages.error` with `is null`. Residue (stated limit): no producer inserts into `ScheduledMessages` (research F-1), so the fix has no observable effect in production."
- `planning/closed/017-existing-items-backlog.md:387` and `:1374` — the cron test named as a handoff member and as staying in `src/server/api/__tests__/` (X-13).
- `planning/closed/018-next-upgrade-save-size-cap.md:147`, `:156`, `:499`, `:501` — `vercel.json` `buildCommand` at `7923a1d` (a different ref; at `0c14d5b` the file has no `buildCommand`).
- `handoff/closed/website-tests-not-beside-their-module-2026-11-08.md:24` — lists `cron.scheduled-selection` as a test name.
- `architecture/closed/018-next-upgrade-save-size-cap-architecture-findings.md:121` — "`git diff --name-only` shows `vercel.json` alone" (a build-time check, not the cron).

Hits on the word `cron` that concern host crontabs, not the Vercel cron (listed so steering can exclude them): `handoff/closed/fix-website-dependency-audit-first-run-2026-11-21.md:4, 23-25, 34, 44, 48` (`cron.log` on the host); `handoff/closed/message-page-header-decode-post-deploy-2026-11-20.md:42` (a host crontab line).

Hits matched by the pattern but not read in context (the grep output was truncated): `planning/closed/012-message-valid-field.md:250`; `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md:308`; `handoff/closed/bug-evaluation-fixes-post-deploy-2026-11-08.md:34-36`; `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md:17`; `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md:6`; `planning/closed/015-bug-evaluation-fixes.md:1237`.

## Step 7 — what no instrument here can see

- Production database rows: whether `ScheduledMessages` holds any row, any row with `sent = false` and `sendAt` in the past (which the cron would send), or rows written by anything outside these repos. No database was read.
- Vercel dashboard: whether the cron is deployed and enabled, the Vercel plan tier (research line 620 says cadence depends on it), environment variables in the Vercel project, and any Vercel firewall or deployment protection in front of `/api/cron`.
- Writers outside the four repos: any service or bot that inserts into `ScheduledMessages` and lives elsewhere. `website/bot/` was searched (no hit), but nothing outside the workspace was.
- Git history beyond the `-G` and `-S` heuristics above: a multi-line `insertInto` call would be missed by a one-line pattern. Only `origin/master` was read, not other branches.
- Whether the deployed build equals origin/master. Not checked.
- Runtime behaviour: no route was called, no test was run, no build was run.
- preview-image-generator `.github/` was not read (excluded by the sweep rule).
- The 20 commits between `76da25c` and `0c14d5b` other than `cron.ts` and `vercel.json` were not inspected.
