---
ID: n/a
Origin: fix-personal-message-access
UUID: 1b613853
Status: Active
Status-Detail: "APPROVED_WITH_CONTROLS at website 75f1543. One finding open: M-001 MEDIUM, getOne hands a personal message to a non-owner when the owner's delete lands between the load and the ownership check. Control RC-1 is owed before the website master push. The session-identity assumption handed over from code review was executed on the real session path and holds locally. M-001 is IN_PROGRESS: steering routed it to remediation on the chain branch (rulings block 2026-11-20T00:04Z, RC-1 option 1). Waiting on the delta at the new SHA, after code review and QA."
Reviewed-At: "75f1543ce352ae9ae08bb2a34d8bafa1d653e6dd — repos=website; base 787bec5 (origin/master). Production tree identical to ed88e7c."
Kind: code-audit
---

# Security Assessment: website — personal-message access fix (fixer chain fix-personal-message-access)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T00:03 | steering-roadmap-hooks → security-hooks-fix-personal-message-access (brief `steering/fix-personal-message-access-brief-security.md`; common part `steering/fix-personal-message-access-brief-common.md`; rulings block 2026-11-19T23:49Z) | Security on the change `787bec5..75f1543`, over S2/S18, S6a, S6b, S7, S8, S9 and S11, and the session-identity assumption from code review | Initial assessment. Verdict APPROVED_WITH_CONTROLS. M-001 MEDIUM open. Identity assumption executed, holds locally. |
| 2026-11-20T00:05 | steering-roadmap-hooks → security-hooks-fix-personal-message-access (message 00:0xZ; `steering/fix-personal-message-access-rulings.md` block 2026-11-20T00:04Z, record `fce289f`) | Routing of M-001 | M-001 moves OPEN → IN_PROGRESS: remediation on the chain branch (RC-1 option 1), then code review delta, QA re-verification, and the delta back to this stage. The verdict at `75f1543` stands until the tree moves; no re-review yet. |

## Metadata

| Field | Value |
|-------|-------|
| Assessment Type | Targeted Code Review (implementation review): Phase 2 over the production diff, with the authentication path the diff relies on. Phase 3 only as far as "did dependencies change" (they did not). Phases 1, 4 and 5 not run, apart from the compliance mapping of what was read. |
| Mode Determination | Inferred from the brief, which names the diff. **Mode**: Targeted Code Review (reason: a named diff, `787bec5..75f1543`). **Scope**: below. |
| Scope | website `787bec5..75f1543` on `chain/fix-personal-message-access`. Production files: `src/server/api/routers/message.ts`, `src/server/api/utils/shared.ts`, `src/server/api/utils/shapes.ts`, `src/server/auth.ts`, `src/providers/MessageProvider/index.tsx` (117 lines added, 54 removed: `git diff --numstat 787bec5 75f1543 -- src ':!**/__tests__/**'`). Read whole beside the diff, because the property rests on them: `src/server/api/trpc.ts`, `src/server/api/utils/user.ts`, `getAccount.ts`, `authorizeGuildUser.ts`, `authorizeGuildAdmin.ts`, `src/server/api/routers/user.ts`, `src/kysely-adapter/index.ts`, `src/utils/redis/index.ts`, and next-auth 4.24.5's session route, cookie defaults, provider defaults and callback handler in `node_modules`. |
| Property under review | The owner's words, rulings block 2026-11-19T20:30Z: a signed-in user can get, change or delete only the personal messages (no guild) they own. A message number sent by the browser never lets a user read, create, claim, overwrite or delete a row that is not theirs. |
| Out of scope | S14, S15, S1b, the server-message rows in the recent list, `getOne`'s error on an absent number, CR-3 and CR-4. Each is carried by a handoff (rulings blocks 22:37Z, 22:59Z, 23:09Z). The brief asks for a finding there only if this change makes it worse. None is made worse (§ Outside the reviewed delta). |
| Reviewer | security-hooks-fix-personal-message-access (role session), 2026-11-19 to 2026-11-20 UTC |

S-numbers are the scoping sweep's (`verification/access-defects/scoping/sweep.md`). Finding IDs are this document's.

## Executive Summary

The change does what it set out to do on six of the seven surfaces, and on those it holds against a second user under every attack I ran. Saves, the recent-webhook update and delete now carry the owner inside the write itself. A save never inserts at a browser-sent number. The hydrated recent list filters by owner at the read. Message numbers are canonical at every input.

One surface is not closed. `message.getOne` loads the row, then checks ownership in a later query, and that check passes when it finds no row. If the owner deletes the message between the two, the caller receives the message they did not own (M-001). In a real-database run without any hook, a second user polling `getOne` received the owner's message at the moment of deletion in 300 of 300 trials. This is far narrower than production today, where any signed-in user reads any personal message at will. It is still a read of a row that is not the caller's, which the property says never happens.

The assumption handed over from code review, that the session carries the caller's own identity, was executed on the real path from the cookie: next-auth's session route, this project's adapter, both session callbacks, the account cache and `getAccount`. It holds locally. What that run cannot see is listed under § Session identity.

**Overall Risk Rating**: MEDIUM for the change as it stands (M-001). LOW once M-001 is closed.
**Verdict**: APPROVED_WITH_CONTROLS at website `75f1543`. The control is RC-1 (§ Required Controls). Releasing this tree reduces exposure against `787bec5` on every surface read, so I do not block the release on M-001. My recommendation is still to fix it before the push: the remedy is a few lines at the fix's own site, and a candidate was shown to close it. A change to any production file in scope expires this verdict.

## Threat Model Summary

Actor: any signed-in Hooks user (a Discord account is enough), acting through `/api/trpc` with a message number of their choosing. Asset: other users' personal messages (`Messages` rows with `fk_users_id` set and no guild): name, `data`, recent webhook ids, preview nonce. Trust boundary: the tRPC procedure, where the browser's number meets the session's identity.

| STRIDE | Read at `75f1543` |
|---|---|
| Spoofing | Identity comes from an opaque session token looked up in `Sessions` on every request (database strategy, next-auth `core/init.js`). Forged, altered, expired and deleted tokens get no session (executed). |
| Tampering | Every write statement carries the owner (`buildUpdateOwnedMessageQuery`, `updateRecentMessageData`, `deleteOwnedMessage`). The insert takes no browser number. Executed with the router's pre-check bypassed. |
| Repudiation | Not assessed. The change adds no logging and removes none. |
| Information disclosure | S11 closed at the read. S2 closed except under the delete race (M-001). `getOne`'s answers still tell absent, personal and server numbers apart (I-1). |
| Denial of service | A save with an unknown number now becomes a create under the cap. The count-then-insert stays two statements, as the architecture record already states (Problem Areas, "`upsertMessage` counts the owner's messages on every save"). Not made worse. |
| Elevation of privilege | No path found by which a second user gains a write or delete on a personal row. Server-message rules are unchanged by the diff (S1b, carried). |

## Findings

### Critical Findings (Must Fix Before Production)

None.

### High Findings (Fix Before Production Recommended)

None.

### Medium Findings (Fix in Next Sprint)

| ID | Severity | Title | Category | Location | Introduced | Description | Remediation | CVSS |
|----|----------|-------|----------|----------|------------|-------------|-------------|------|
| M-001 | MEDIUM | `message.getOne` returns a personal message to a non-owner when the owner's delete lands between the load and the ownership check | Broken access control, time-of-check to time-of-use (OWASP A01:2021; CWE-367, CWE-639) | website `75f1543`: `src/server/api/routers/message.ts` `getOne`, personal branch; `src/server/api/utils/user.ts` `authorizeUser`, the `oldMessages.some(…)` test | No. It is what remains of S2. At `787bec5` there was no ownership check. The fix added one that passes when the row is gone. | `getOne` calls `getMessage(messageId)` and keeps the row. It then calls `authorizeUser(session.user.id, message.id)`, which runs `getAccount` and then selects `fk_users_id` for that number. `authorizeUser` throws only if some returned row has another owner. If the owner's delete commits after the load and before that select, the select returns no row, nothing throws, and `getOne` returns the row it loaded. **Executed** (`verification/fix-personal-message-access/security/read-race.pg.test.ts`, real routers and a throwaway postgres): with the owner's delete placed in the window, user B's `getOne` returned A's message (`out/read-race-75f1543.json`: 8 cases, 1 failed, exit 1). With no hook, 6 concurrent B pollers and A's real `message.delete`: 300 of 300 trials leaked; 1129 of 10027 poll responses carried A's text (`out/read-race-75f1543-timing.json`). The window is the `getAccount` round trip, so a request spends a large share of its life inside it. What limits the attack is not the timing. The attacker must be polling that number when its owner deletes it, and must know or guess the number (numbers are sequential, and appear in public preview URLs). The other procedures do not share the defect: under the same interleave the recent-webhook update, the save and the delete changed nothing of A's and returned none of A's text (same file, 3 cases passed). | Make the read and the ownership test one statement, or make the check fail closed. Either: (a) select the owner with the row and compare in process, or put the owner term in the read's `where`, so no second query decides; or (b) keep the shape and refuse when the check saw no row: `const { oldMessageCount } = await authorizeUser(…); if (!oldMessageCount) throw NOT_FOUND`. Shape (b) was applied in a throwaway export (`verification/fix-personal-message-access/security/remedy-candidates.json`, `getone-requires-the-checked-row`): 8 of 8 cases passed, and the timing run leaked in 0 of 300 trials over 10193 polls (`out/read-race-75f1543-getone-requires-the-checked-row.*`). The fixer chooses the shape. A suite case is owed with it (§ Testing Recommendations). | 5.7 (CVSS 3.1 AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:N/A:N). 4.8 if the window is scored AC:H; measured locally it was won every time. |

### Low Findings (Track for Future)

None.

### Informational / Best Practice Recommendations

| ID | Severity | Title | Location | Note |
|----|----------|-------|----------|------|
| I-1 | INFO | `getOne`'s answers tell three kinds of number apart | website `75f1543` `message.ts` `getOne` | An absent number fails in `getMessage` (`executeTakeFirstOrThrow`), another user's personal message answers `NOT_FOUND`, and a server message the caller does not manage answers from `authorizeGuildAdmin` (`FORBIDDEN`). So a signed-in user can classify any number. Numbers are sequential, so this tells little. It is narrower than base, where the row itself came back. The absent-number half is carried by `handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md`. A uniform `NOT_FOUND` there would close the personal half as well. No action is asked by this document. |
| I-2 | INFO | The website's production dependencies carry open advisories, unassessed | website `pnpm-lock.yaml` at `75f1543` | Not part of this change: `git diff --quiet 787bec5 75f1543 -- package.json pnpm-lock.yaml` exits 0. `pnpm audit --prod --json` reports, in its own metadata, 8 critical, 76 high, 50 moderate and 12 low (141 advisory entries; summary at `verification/fix-personal-message-access/security/out/pnpm-audit-prod-summary-75f1543.txt`). Reachability was not assessed. For the path this review rests on: the four next-auth 4.24.5 entries concern the email provider (two), `getToken()` (not called in `src`: `grep -rn 'getToken('` printed no line) and check cookies shared between providers (one provider is configured). I did not assess them further. Carried by one entry in the record's `INBOX.md` asking for a Dependency-Only review. |

## Surfaces, against the property

| Surface | Holds at `75f1543`? | Basis |
|---|---|---|
| S2 `message.getOne`, S18 the `[id]` pages | Yes without a concurrent delete. **No** under the delete race (M-001). | Attack instrument, identity instrument, read-race instrument. Callers of `getOne`: `MessageProvider` and `app/message/f/[id]/page.tsx` (grep of `src`). The owner's own read works (controls in all three instruments). |
| S6a `message.upsert`, update | Yes | The update's `where` carries `fk_users_id` or `fk_guilds_id` (`buildUpdateOwnedMessageQuery`). Green with the router's pre-check bypassed. |
| S6b `message.upsert`, create | Yes | `buildInsertMessageQuery` takes no number: `buildMessageValues` sets none, and the `values.id = message.id` line is gone. An unknown number becomes a create under the cap at the database's next number. |
| S7 `message.updateRecentMessageData` | Yes | Owner term in the update. Green under bypass and under the delete interleave. |
| S8 `message.delete` | Yes | `deleteOwnedMessage` carries the owner. The owner is derived from the row's own guild, then the caller is authorized for it. |
| S9 preview prefix | Yes | The prefix is built from the canonical number, and only after a row was removed. |
| S11 hydrated recent list | Yes for personal rows | `getUserRecentMessages` filters by `fk_users_id` in the read, with `user.id` from the adapter. Executed through the real session path with A's number stored in B's preferences. Server rows are still returned (carried, below). |

## Session identity (the assumption handed over from code review)

**The claim**: the session reaching `protectedProcedure` carries the caller's own Discord id in `session.user.id`, and `getAccount` maps it back to the caller's own user row. Falsity signature (code review): one account's request resolves, in `getAccount`, to another account's `userId`.

**Read from code, at `75f1543` and next-auth 4.24.5**:
- The strategy is `database`, because an adapter is configured and no strategy is set (`core/init.js`). The cookie holds an opaque token. Each request looks it up: `core/routes/session.js` calls the adapter's `getSessionAndUser(sessionToken)` and passes that `user` to the session callback. This project's adapter joins `Sessions` to `Users` on `Sessions.sessionToken = <token>`. So `user.id` in both callbacks is the user row of the presented token, and it is what `hydratedAuthCallback` now passes to `getUserRecentMessages`.
- Both callbacks set `session.user.id` to the `providerAccountId` of an `Accounts` row whose `userId` is that user (`redis.fetchUserAccount`, cached 600 s under `user-access-token-<user row id>`). `getAccount` then selects by `(provider 'discord', providerAccountId)`, which is unique in the schema read (`Accounts_provider_providerAccountId_key`, `verification/fix-personal-message-access/pg/schema-749606d.sql`). So the round trip returns the same user row, including for a user holding two Discord accounts.
- The cookie is `httpOnly`, `sameSite: lax`, and `secure` under an https URL (`core/lib/cookie.js`). The Discord provider takes the default `checks: ["state"]` (`core/lib/providers.js`). `profile()` returns no email, so the callback handler's email lookup is not reached, and a new user's row id is assigned by the database (`callback-handler.js` drops the profile's `id`).

**Executed** (`verification/fix-personal-message-access/security/identity.pg.test.ts`, driver `run-security.sh`). The caller is identified only by the cookie on the request. Real: `createTRPCContext`, next-auth `getServerSession`, the adapter, both session callbacks, `~/utils/redis` with its cache, mutex and wait path, `getAccount`, `authorizeUser`, the routers, kysely, pg, a throwaway `postgres:16`. Stubbed: env values, the ioredis client (an in-memory map with publish and subscribe), global `fetch` (Discord answers an empty server list), Pusher, `waitUntil`, preview generation, the S3 client.

| Tree | Cases | Failed | Exit | Capture |
|---|---|---|---|---|
| `75f1543` | 30 | 0 | 0 | `verification/fix-personal-message-access/security/out/identity-75f1543.json` |
| `787bec5` (base, calibration) | 30 | 7 | 1 | `verification/fix-personal-message-access/security/out/identity-787bec5.json` |

At `75f1543`, for both the plain and the hydrated session:
- each cookie resolves to its own Discord id, and `getAccount` on that id returns that session's own user row;
- B's cookie is refused A's message on `getOne`, save, recent-webhook update and delete, and the `Messages` table is unchanged;
- B's hydrated session lists B's stored number and not A's, with both stored in B's preferences. This is the adapter path the refutation run did not drive (`verification/access-defects/scoping/refutation.md`, C1);
- no cookie, an unknown token, A's token altered four ways, A's row id or Discord id as the token, a SQL wildcard, A's token under the non-secure cookie name, an expired session row and a deleted session row all get no session and `UNAUTHORIZED`. A deleted session row gets none even while the account cache still holds the user;
- twenty concurrent cold-cache requests for A and B each resolve to their own id, and the cache holds one key per user row;
- a user row with two Discord accounts maps back to its own user row whichever account the session takes.

The 7 base failures are S2 and S11 seen through the real session path, so the instrument can fail on the defects under repair.

**Result**: the falsity signature was not produced. The assumption holds on this code, locally.

**What this does not establish** (each stays with the post-deploy walk B-1 and B-2, or is unread on this box):
- Production's values: `NEXTAUTH_URL`, the Discord user-info host in `DISCORD_URL`, and whether the redis instance is shared with another writer of `user-access-token-*` keys. `.env.local` was not read.
- The real ioredis client and a real Discord sign-in. The OAuth callback was read, not run.
- Production's live schema. The unique index on `Accounts` was read from project-utils `749606d`, not from the database.
- The HTTP layer of tRPC (batching, GET and POST parsing, the superjson transformer). The runs enter at `createTRPCContext` and `createCaller`.
- The server-message path's own identity (`authorizeGuildAdmin` reads the cookie through `fetchAccountFromSession`), which the architecture record already lists as Medium ("The session→account cache outlives the session"). It decides no personal-message question.

## Prior evidence, re-derived

The reviewer's attack instrument (`verification/fix-personal-message-access/code-review/attack.pg.test.ts`) was re-run by this stage at `75f1543` through `run-security.sh`: 187 cases, 0 failed, vitest exit 0 (`verification/fix-personal-message-access/security/out/attack-75f1543.json`, counts read from the JSON's `numTotalTests` and `numFailedTests`). I read the instrument whole. Its oracle compares every pre-existing row before and after, and its bypass mode removes the router's pre-check, so the write's own owner term is the only guard. It does not drive a read racing a delete, which is where M-001 sits.

## Hazard analysis, re-derived

The common brief lists seven hazards as candidates. Each was re-read at `75f1543`.

| # | Hazard | Read |
|---|---|---|
| 1 | Server messages share the write path | The update's term is `fk_guilds_id = <the authorized guild's row>` on the server path and `fk_users_id` on the personal path, chosen by `values.fk_guilds_id`. A server admin saving a server message they did not create is unaffected. S1b's membership rule is untouched by the diff. |
| 2 | The cap | The client-number bypass is gone: the count runs whenever no owned row was updated. Count and insert remain two statements, so concurrent creates at the cap can both pass. That limit predates the chain and is in the architecture record. |
| 3 | Foreign numbers already stored in preferences | Covered at the read. Executed with A's number stored in B's preferences. |
| 4 | `/message/f/[id]` stops copying another user's personal message | As the owner chose. The owner's own read works, the server branch of `getOne` is unchanged, and `getFromCode` is not in the diff. |
| 5 | Canonical numbers | `messageIdShape` is at `getOne`, `upsert`, `updateRecentMessageData` and `delete`. Thirteen text forms of a victim's number, through each procedure: 187 of 187. |
| 6 | Check-then-write | No write decides in one query and writes in another any more. **One read still loads in one query and checks in another: `getOne` (M-001).** `updateRecentMessageData` and `delete` also read first, but their writes carry the owner and return nothing of the row. |
| 7 | Production on push | Deploy consequence: devops's to establish. Read here: the tree at `75f1543` holds no `.github/workflows` file (`git ls-tree -r --name-only 75f1543`, 0 matches) and `vercel.json` holds one cron entry. |

## Outside the reviewed delta

None of these is made worse by the change. Each has a carrier, named by path.

- **Server-message rows in the hydrated recent list.** `getUserRecentMessages` keeps the arm `fk_guilds_id is not null`, so a user who stores any server message's number gets its name, timestamps, guild id and preview nonce. Base returned every row, so the arm is not a regression. From a security view it is the widest exposure left on this surface: the nonce completes a public preview URL. Carrier: `handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md`.
- **Rows carrying both an owner and a guild.** QA's Assumption Not Checked. Such a row is a server message that its creator can still overwrite on the personal path. Same at base. Carrier: steering's held production read at the release seam (rulings block 2026-11-19T23:49Z).
- **Rows already planted at browser-sent numbers on production.** After the release, an id-less save that reaches a planted number fails once on the primary key, where at base it wrote onto the planter's row. Rows already written that way stay readable by the planter. Carrier: the same held read (rulings block 22:59Z).
- **`user.updatePreferences` accepts any string as a recent number** (CR-3). Self-only. Carrier: `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md`.
- **S14, S15, S1b.** Untouched by the diff. Carriers: the three handoffs of rulings block 22:37Z.

## Required Controls

- **RC-1 (M-001).** Before the website `master` push, one of:
  1. M-001 is remediated on the chain branch and the delta comes back to this stage at the new SHA. Recommended.
  2. The owner accepts releasing with M-001 open, and a handoff with `Owning-Stage` and an event-form `Review-Trigger` carries it. This is his to accept and no stage's: his property says "never", and this tree does not yet meet it.
- **RC-2.** The post-deploy walk B-2, then B-1 (QA's blocking-condition register), stays owed. It is the only read of the session path on production. This verdict relies on it and does not replace it.

## Testing Recommendations

- With the remedy, a suite case in `src/server/api/routers/__tests__/message.personal-ownership.test.ts`, spec-form: `getOne` refuses, and returns none of the row, when the ownership query finds no row for the number it loaded. It is red at `75f1543` by construction and needs no mutation beyond the remedy's own removal.
- For the delta re-review: `run-security.sh <sha> <port> <work> <out> read-race.pg.test.ts`. Expected: 8 of 8, and `leakedTrials` 0 in the timing file.
- The identity instrument is kept at `verification/fix-personal-message-access/security/identity.pg.test.ts` for any later change to `src/server/auth.ts`, the adapter or `fetchUserAccount`.

## Compliance Mapping

| Requirement | Standard | Status | Notes |
|-------------|----------|--------|-------|
| Access control enforced on a trusted service layer | OWASP ASVS 4.0 V4.1.1 | ✅ | Every check and owner term is server-side. |
| Protection against direct object reference on create, read, update, delete | OWASP ASVS 4.0 V4.2.1; OWASP Top 10 2021 A01 | ❌ read (M-001); ✅ create, update, delete | |
| Resistance to time-of-check to time-of-use races | OWASP ASVS 4.0 V1.11.3 | ❌ `getOne`; ✅ writes | |
| Positive validation of input | OWASP ASVS 4.0 V5.1.3 | ✅ | `messageIdShape`: 1 to 19 ASCII digits, bounded to int8, canonical output. |
| Session cookie attributes | OWASP ASVS 4.0 V3.4.1 to V3.4.3 | ✅ by library default | Read from next-auth 4.24.5. Production's cookie was not read. |
| Components with known vulnerabilities | OWASP Top 10 2021 A06 | Not assessed | I-2. |

## Not covered

A targeted review. Not covered, and worth a follow-up where named:
- Phase 3 beyond I-2: no reachability analysis of any advisory. **Follow-up recommended: a Dependency-Only review of the website.**
- Phase 4: headers, TLS, Vercel project settings, bucket and Pusher settings.
- Production's database (row policies, sequence state, live schema), per the scoping determination's own list.
- gitleaks, semgrep and osv-scanner are not installed on this box. In their place: a pattern scan of the 830 added lines of the full diff (6 hits, all test fixtures such as `SECRET = 'owner-only-content'`), a sink scan of the added production lines (no raw SQL, `eval` or HTML sink added), and `pnpm audit`.
- The timing measurement ran on loopback. Production's win rate was not measured, and no request was sent to production by this stage.

## Run record

- **Set up and removed.** Seven throwaway `postgres:16` containers named `fpma-sec-*`, one per run, on 127.0.0.1 ports 54431 to 54435, each removed by its driver's exit trap. `docker ps -a --filter name=fpma-sec` printed no line after each batch. Each run used a `git archive` export under this session's scratchpad, removed by the same trap; the work directory was empty afterwards. Both batches ran under `systemd-run --user --scope` with a runtime, memory and task cap.
- **Standing prohibitions.** No build was served. Pusher was stubbed in every run. Message numbers were moved to 900000000000001 or above before any write, and every row written sits in a throwaway database. `.env.local` was not read; the exports hold no env file.
- **Instrument defect of mine.** The identity instrument's first run asserted the text `UNAUTHORIZED` in `String(error)`, which holds the message and not the code. That gave 9 false reds at `75f1543`. I changed the assertion to the error's `code` and re-ran both trees. The first run's output is kept at `verification/fix-personal-message-access/security/out/identity-run1-oracle-defect/`.
- **A filter refusal, satisfied.** My first secret-pattern `grep` over the diff was refused by the search tool behind the output filter ("exceeds complexity limits"). I ran the same patterns with a `python3 -I` scan over the diff saved to a file. No control blocked any action.
- **Record check at session start.** `node tools/check-repo.js`: one failure, the code review document's capture path, already in `INBOX.md` from QA and since corrected by the reviewer (its sub-entry 1c). No orphan in `security/`.

## Next

- M-001 is IN_PROGRESS (routed 2026-11-20T00:04Z to RC-1 option 1; option 2 was not put to the owner). The fixer hands the new SHA to code review, QA re-verifies, and the delta returns here: I re-run `read-race`, `identity` and the attack instrument at that SHA.
- Devops follows for the website `master` push, on the owner's word, once RC-1 is satisfied.
