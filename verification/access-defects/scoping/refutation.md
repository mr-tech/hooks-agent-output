# Refutation run: C1, C2, C3 (website 787bec5, project-utils 749606d)

All three claims NOT REFUTED. Each was run through the real code path: `appRouter.createCaller` (src/server/api/root.ts) with a constructed session, real kysely queries (project-utils getPostgres) against a throwaway postgres:16 container (port 54399, stopped and removed; `docker ps -a | grep -c refute-pg` returned 0).

Disclosure: my first attempt to write this file through a shell heredoc was refused by the record-write gate hook; I re-issued it with the Write tool.

## Setup
- Export: /tmp/claude-1000/-usr-local-bin-hooks/da93f9fd-44c6-4138-a9b0-34fe42c702c0/scratchpad/refute-access/web (git archive 787bec5; node_modules symlinked to the deweed install, not modified).
- Schema: `prisma migrate diff --from-empty --to-schema-datamodel` on project-utils 749606d prisma/schema.prisma, saved to .../refute-access/schema.sql, applied with psql (9 tables).
- Before any save: `ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001` (Users and Accounts sequences likewise). All message ids used are >= 900000000000001.
- Env: DATABASE_URL=postgresql://postgres:x@localhost:54399/postgres, NODE_ENV=test. No .env.local read.
- Stubbed (vi.mock, in my export's test only): `~/env.mjs` (dummy values); `pusher` (trigger is a no-op); `@vercel/functions` waitUntil (no-op); previewImage `mintNonce`/`runPreviewContinuation` (no generator, no bucket); `~/utils/redis` and its client (dummy). Routers, authorizeUser, getMessage, upsertMessage, getUserRecentMessages and hydratedAuthOptions.callbacks.session are real.
- Test file: .../refute-access/web/src/server/__tests__/refute.test.ts. Command: `cd .../refute-access/web && DATABASE_URL=... NODE_ENV=test npx vitest run --project node src/server/__tests__/refute.test.ts --disableConsoleIntercept` (exit 0). Output: .../refute-access/run4.txt (rtk swallows console output on a passing run, hence the flag and file).
- Users: A = db id 900000000000001 (discord discA), B = 900000000000002 (discord discB).

## C3: NOT REFUTED
B saved a personal message via message.upsert (no id): row id 900000000000001, fk_users_id = B, fk_guilds_id null. A (a different user) then called message.getOne("900000000000001") and got:
`{"id":"900000000000001",...,"name":"B-private-name","data":{"content":"B-secret-content"},...}`
Code: src/server/api/routers/message.ts getOne: with no guildId it only calls authorizeUser(session.user.id) with no messageIds, so ownership is never checked.

## C1: NOT REFUTED
A called user.updatePreferences({recentMessageIds:["900000000000001"]}); accepted, stored as `{"recentMessageIds":["900000000000001"]}`. The real hydratedAuthOptions.callbacks.session for A then returned:
`hydration: {"messages":[{"id":"900000000000001","createdAt":1795120168375,"updatedAt":1795120168373,"name":"B-private-name","previewImageNonce":null}]}`
Code: routers/user.ts updatePreferences does no ownership check; utils/shared.ts getUserRecentMessages (line 108) selects by id only.
Not run: the HTTP/NextAuth adapter path that supplies `user` to the callback; I passed {id, preferences} read from A's DB row. (Run 3 in run3.txt shows the same C1 and C3 output.)

## C2: NOT REFUTED
- A filled to 1000 rows (MAX_MESSAGES=1000, direct SQL, sequence moved to 900000000100000 first so fill ids avoid the target). Id-less A upsert threw "You have reached the limit of 1000 messages per user."
- Target id 900000000000500, no row there (query printed `[]` after the fill, before A's upsert). A message.upsert with id 900000000000500 succeeded: row created, fk_users_id = A, name "A-planted". A's row count went 1000 -> 1001 (cap check is `!message.id && count >= MAX`).
- Sequence set to 900000000000500; B (1 row) made an id-less message.upsert: returned id 900000000000500, name "B-second-name". Row after: `{id:900000000000500, fk_users_id:900000000000001 (A), name:'B-second-name', data:{content:'B-second-content'}}`. B's name/data on A's row; owner still A. Final DB: `900000000000001|1001`, `900000000000002|1`.
- Caveats: B's id-less save only lands on the planted id when the sequence yields it, and I forced that with ALTER SEQUENCE. My first run (run3.txt) was flawed (a fill row already held id 500, so A's upsert was an update); the reported result is the corrected run4.txt.
