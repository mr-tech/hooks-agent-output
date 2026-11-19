# Residue refutation: the fixer's "Residue already in production" (website 75f1543 and 787bec5)

Run by a `general-purpose-sonnet` helper for `steering-roadmap-hooks`, 2026-11-19T23:5xZ. It was briefed with the conclusion alone, from
`implementation/fix-personal-message-access-implementation.md`, § Diagnosis, "Residue already in production". Copied into the record
by steering from the helper's scratch `RESULT.md`. The helper's test file and raw logs were scratch and are not kept.

Setup: web75 is `git archive 75f1543`, web786 is `git archive 787bec5`, with node_modules symlinked read-only to the shared install. Schema
from project-utils `749606d` via `prisma migrate diff`. Container `postgres:16`, `residue-refute-pg`, port 54411, `DATABASE_URL` set
explicitly. Every sequence was restarted at 900000000000001 before any save, and every id used is at or above that. Command:
`DATABASE_URL=... NODE_ENV=test timeout 600 npx vitest run --project node src/server/__tests__/refute.test.ts`, exit 0 in both trees.
Stubbed: env, pusher, `@vercel/functions`, the preview image calls and redis. The router, `authorizeUser`, `upsertMessage` and `getMessage`
are real, called through `appRouter.createCaller`. The container was removed afterwards (`docker ps -a … | grep -c residue-refute` → 0).
Disclosure: the record-write gate refused the helper's first shell write of its result. It re-issued the write with the Write tool.

**(a) NOT REFUTED.**
- At 75f1543, a row at 900000000000500 was planted by SQL (owner A), and the sequence was set to 499 with `is_called` true.
- B's id-less `message.upsert` failed with `TRPCError INTERNAL_SERVER_ERROR`. The cause was pg 23505 on `Messages_pkey`, and the message
  was the raw pg text.
- Row 500 was byte-identical before and after. B's retry got id 900000000000501.
- The text "Failed to save message" is read from code, not run: `src/providers/MessageProvider/index.tsx:284`, whose `onError` shows
  `'Error. Failed to save message. Please try again.'` for any error.

**(b) NOT REFUTED (the mechanism, at 787bec5).**
- Same setup at 787bec5: B's id-less save succeeded. Row 500 kept `fk_users_id` = A but now held B's name and data (`ON CONFLICT (id)
  DO UPDATE`, `buildUpsertMessageQuery`).
- At 787bec5, B's `getOne(500)` returned B's data. At 75f1543 it returns NOT_FOUND.
- Whether such rows exist in the real database was not tested.

**Overwrite paths at 75f1543: none found in these calls.**
- B's `upsert` with explicit id 500 got NOT_FOUND. `getOne`, `delete` and `updateRecentMessageData` on 500 also got NOT_FOUND.
- An `upsert` with an unused explicit id 900000000000999 inserted at the server-assigned id 502; the client id was ignored.
- Row 500 was unchanged at the end.
- The guild path was not tested. The owner scoping of `buildUpdateOwnedMessageQuery` was read from code, not run on its own.

**(c) REFUTED as worded ("exactly").**
- `id >= last_value` is over-inclusive. With `is_called` true, the legitimate latest-issued row sits at `id = last_value`. Observed:
  `nextval` returned 900000000100000, a legitimate row was inserted there, and the query returned it.
- The correct predicate: `id > last_value OR (id = last_value AND NOT is_called)`.
- The other directions held. A planted row below `last_value` was excluded (passed). With `is_called` false and a planted row at
  `last_value`, the row was included, and the next draw failed 23505.
- The sequence cache was 1 here (`pg_sequence.seqcache`). A cache above 1, and production's setting, were not tested.
