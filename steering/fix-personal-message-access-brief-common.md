# Brief, common part — fixer chain fix-personal-message-access

From `steering-roadmap-hooks`, written 2026-11-19T22:3xZ at the scope selection. Every brief of this chain names this file
second, after its `Duties negated:` line, and adds only what is that stage's own. Chain rulings file:
`/usr/local/bin/hooks/agent-output/steering/fix-personal-message-access-rulings.md`.

## Determination, scope and stage set

- **Determination:** the rulings file's block "2026-11-19T20:30Z — scoping determination". It holds the property, the region swept,
  the placement of every sweep hit, what would catch a breach, and what the sweep did not cover.
- **His scope selection:** block "2026-11-19T22:35Z — scope: fix all three, with query hardening (his selection)". The bounded scope
  statement there governs. Quoted:
  "In scope: S2 with S18, S6b, S11, an owner term in the S6a and S7 write queries, and a canonical id at the S7, S8 and S9 inputs. All of
  it is in website alone. Out: S5, S16 and S17 (no record; X-21 carries S17). S14, S15 and S1b get one handoff each."
  **Amended 22:59Z** (block "2026-11-19T22:59Z", this thread's ruling, correcting its own narrowing of his chosen option's words):
  - an owner term in the delete query of S8 (`message.delete`) as well as in S6a and S7;
  - a canonical id at the `message.upsert` input (S6a/S6b, `optionalIdMessageShape.id`) as well as at S7, S8 and S9.
  Out, each to a handoff: the hydrated recent list's server-message rows (S1b family); `getOne`'s absent-number error.
- **S-numbers:** the sweep, `/usr/local/bin/hooks/agent-output/verification/access-defects/scoping/sweep.md` (website `787bec5`).
- **Executed evidence:** the refutation run, `/usr/local/bin/hooks/agent-output/verification/access-defects/scoping/refutation.md`.
  S2, S6b and S11 NOT REFUTED through `appRouter.createCaller` against a throwaway postgres. Its export is gone from the box; its setup
  section is the recipe (schema from project-utils `prisma/schema.prisma` via `prisma migrate diff`, sequence moved first, stubs listed).
- **Property (his words, block 20:30Z):** a signed-in user can get, change or delete only the personal messages (no guild) they own. A
  message number sent by the browser never lets a user read, create, claim, overwrite or delete a row that is not theirs.
- **Stage set**, quoted from block 20:30Z: "`fixer` (red test per in-scope surface), then `code-reviewer`, then QA Phase 2 (at 20 or more
  production lines), then `security` on the change … then devops for website `master` (his word needed). No plan, critic, Phase 1 or
  UAT. Post-deploy: the browser check, walked by a uat-role session on the test accounts (screenshots stay untracked, his 09:01Z ruling)."
- **Repositories:** `/usr/local/bin/hooks/website` (source), `/usr/local/bin/hooks/project-utils` (read only; a schema change is a
  re-scope), `/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository: `git -C <repo>` on every call.
- **Chain branch:** website `chain/fix-personal-message-access`, cut by steering at 22:36Z from `origin/master` `787bec5`, with no upstream.
  The tree was clean but for the untracked `.playwright-mcp/` screenshots from 2026-11-11, which are not this chain's: leave them.
  The lockfile is unchanged across the switch (same commit).
- **End step:** a website `master` push. Vercel deploys it to production, with no beta; `website/.github/workflows` is absent. It needs his word.
- **Permitted paths for the fixer:** website `src/**` within the scope above and its `__tests__/`; its document
  `implementation/fix-personal-message-access-…`; `verification/fix-personal-message-access/`.

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

Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)". This includes axiom (B): S2 escaped
to production, confirmed by `verification/access-defects/browser-check/README.md`. Whether that record earns a bug-form test is the
stage's call under (B).

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages": the Discord test server (guild `1566742402180456559`) is the agents' own; "A
message that reaches a real person is mine to send."

## Architecture record

`/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`, Problem Areas: "Persisting writers share a criterion, not a
path" (line 195; five `message.upsert` call sites), "`upsertMessage` counts the owner's messages on every save" (line 198; the
`!message.id &&` cap test that S6b's run shows lets a client id pass the cap), "The session→account cache outlives the session"
(Medium), and "A hand-made sign-in visit can give one user several Discord accounts". `/usr/local/bin/hooks/agent-output/architecture/website.md`
W-2 (line 46): "The back end reflects what the front end allows". A server-side refusal this chain adds is a deliberate exception for
ownership, never for draft validity.

## Hazard analysis (this thread's, composed at the determination — each a candidate to re-derive)

1. **Guild messages share the write path.** `upsertMessage` writes guild rows too (`fk_guilds_id`). An owner term keyed on
   `fk_users_id` alone in the S6a or S7 write queries would refuse a guild admin saving a guild message they did not create. The owner
   term must keep the guild path's existing rule (S1b's membership check, out of scope) unchanged.
2. **The cap.** The 1000-message cap is skipped whenever a client id is sent (`!message.id && count >= MAX`). A fix that turns an unknown
   client id into a create must not keep that bypass. A fix that refuses an unknown id changes what any client that sends an id it
   never got from the server sees. Read every `message.upsert` call site for that.
3. **S11 data already stored.** Production preferences may already hold foreign ids in `recentMessageIds`. A check only at
   `updatePreferences` leaves them readable. A filter at the read (`getUserRecentMessages`) covers stored data.
4. **`/message/f/[id]` (S18) stops copying another user's personal message.** That is what his "owner only" chose. The owner's own copy,
   guild messages and the share-code path (S5, public by design) must keep working. Name every caller of `getOne`.
5. **Canonical ids.** Id text like `0123` or `+123` may pass as a bigint to the query while keying preview objects by its raw text (S9).
   Canonicalise at the input once, so the check, the write and the preview key see one id.
6. **The check-then-write race** is read from code only (determination, "Not covered"). Moving the owner term into the write closes it
   for S6a and S7. Say whether any path still checks in one query and writes in another.
7. **Production on push.** There is no beta: the push serves real users at once. Chain 017's post-deploy looks by him (B-6, B-8, B-9 in
   `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`) are live on production now. This chain's release lands under them.

## Not checked by this thread

Database row policies and sequence state on production; Vercel env values; Pusher and bucket settings; NextAuth internals, including the
adapter path that supplies `user` to the session callback (S11's run did not exercise it); whether `session.user.guilds` holds only
guilds the user manages; every `message.upsert` caller's id handling beyond the sweep's rows.
