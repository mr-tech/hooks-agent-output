---
ID: n/a
Origin: fix-message-not-found
UUID: 46210f8b
Reviewed-At: "f4baebb — repos=website; sub-entry 1.1, test-only delta from 6b539e5"
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-message-not-found

**Plan Reference**: none (fixer route). Scope statement: `steering/fix-message-not-found-rulings.md`, block "2026-11-21T06:46Z".
**Implementation Reference**: `agent-output/implementation/fix-message-not-found-implementation.md` (record commit `64cf86d`, `Handoff-At: 6b539e5`)
**Date**: 2026-11-21
**Reviewer**: code-reviewer-fix-message-not-found

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T07:14 | steering-hooks (brief `steering/fix-message-not-found-brief-code-reviewer.md`) | Round 1: review website `chain/fix-message-not-found` at the fixer's `Handoff-At` | Round 1 at `6b539e5`: APPROVED_WITH_COMMENTS. One INFO (CR-1, user-visible, routed to steering for the release flows). Adversarial probe over raw HTTP passes at `6b539e5` and fails at base `6f76c6d` (positive control). 56 production lines added, so QA Phase 2 is owed. |
| 2026-11-21T07:42 | steering-hooks, QA's test-only commit `f4baebb` (QA record `c4c2afc`) | Round 1, sub-entry 1.1: review the `6b539e5..f4baebb` delta | The delta touches two test files only, and production is identical. Convention check clean. Every new case is red under a QA mutant. Verdict unchanged, now at `f4baebb`. |

## Tree and scope

- `Reviewed-At` `6b539e5` (website `chain/fix-message-not-found`, `git rev-parse` at start and end: `6b539e504023f92d454174047d5d85b810b8b95a` both times). Files read with `git cat-file blob 6b539e5:<path>`, each blob's hash checked against `git rev-parse 6b539e5:<path>`. Base `6f76c6d`.
- Criteria assessed this round: the three items of the bounded scope statement (block "2026-11-21T06:46Z"), as written at round open. No growth.
- Files reviewed (the implementation document's Change list, which matches `git diff --numstat 6f76c6d 6b539e5`, 7 paths): `src/server/api/routers/message.ts`, `src/providers/MessageProvider/index.tsx`, `src/app/message/m/[id]/_components/MessageNotFound.tsx` (new), `src/app/message/m/[id]/edit/page.tsx`, `src/app/message/m/[id]/send/page.tsx`, `src/server/api/routers/__tests__/message.get-one-not-found.test.ts` (new), `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx` (new). All inside the write set. `authorizeGuildAdmin.ts`, `authorizeGuildUser.ts`, `user.ts`, `shared.ts`, `TrpcProvider.tsx` and `Navigation.tsx` are unchanged (absent from the numstat).
- **Production lines added, re-counted:** `git diff --numstat 6f76c6d 6b539e5 -- src ':!**/__tests__/**'`, added column 18 + 4 + 5 + 8 + 21 = **56** (`verification/fix-message-not-found/code-review/raw/numstat.txt`). Second instrument: `git diff --output=<file>` over the same pathspec, then `grep -c '^+[^+]'` = 47 and `grep -c '^+$'` = 9, so 56. That is 20 or more, so QA Phase 2 is in the set, and this review does not run the suite or the red tests.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (tracked: `git -C agent-output ls-files` lists it)
**Alignment Status**: ALIGNED

The personal-ownership bullet ("`getOne` answers `NOT_FOUND` for a personal message unless `authorizeUser` finds the row is the caller's") still holds, and is now incomplete: `getOne` answers the one `NOT_FOUND` for all three refusals. The fixer lodged an FYI for the architect in `INBOX.md` (uncommitted, per its document). The "Access refusals leave no always-on signal" row is unchanged by this fix. Only `getOne` maps errors. The shared gate (`authorizeGuildAdmin`/`authorizeGuildUser`) and its other callers keep their answers, as his 05:55Z selection requires.

## Hazards from the common brief, re-derived

1. **Which errors map.** `getOne` (`message.ts`) wraps three sites with `asNotFound`: `getMessage` maps `NoResultError` only; `authorizeGuildUser` maps a `TRPCError` `FORBIDDEN` only (thrown at one place, `authorizeGuildAdmin`'s guild lookup); `authorizeUser` maps `NOT_FOUND`, which is the owner mismatch plus `getAccount`'s "Account does not exist.". `asNotFound`'s handler throws on both branches (its return type is `never`), so a refusal cannot fall through to `return message`. Anything else rethrows unchanged. Measured below (probe).
2. **One text.** Measured: the three refusals give byte-identical bodies and statuses (probe, oracle 2).
3. **`getGuild` mapping.** `authorizeGuildAdmin` is unchanged (numstat), so `getGuild`'s NOT_FOUND→null path is untouched.
4. **Retry.** `retryUnlessRefused` gives react-query's count semantics (`failureCount < 3`, called with 0-based counts) and refuses any 4xx `httpStatus`. An error without `data` (network failure) is still retried. It is set on `MessageProvider`'s `getOne` query only. A transient Discord failure reaches `getOne` as a plain `Error` (a non-array guild list throws in `fetchUserGuilds`, `redis/index.ts`), so it is answered 500 and still retried. `fetchUserGuilds` returns no `null` on any fetch path, so the 401 "Failed to fetch user servers." it now no longer retries is not a transient-failure answer.
5. **Header.** The fixer's claim checks out at `6b539e5`: `Navigation.tsx` renders the "New Message" text only in its `status !== 'authenticated'` branch. Signed in, the name `TextField` shows `' '` while the message is null. `updateMessage` and `saveMessage` (`useApiMethods.ts`) are no-ops on a null message.

Hook order: on both pages the `isNotFound` return comes after every hook call (edit: after `useId`; send: after `useCallback(sendMessage)`, before the derived `isLoading` return).

Pattern ladder: no not-found notice exists in `src/app` or `src/components` (`git grep -i -E "not found|doesn.?t exist|does not exist|no access|don.?t have access"` → 1 unrelated hit, `ImageUploader`'s "Image not found."). `InfoPanel` is the collapsible sign-in panel with an items list, not a one-line notice. `MessageNotFound` reuses the `Container`/`ContainerSection` + `rounded-lg bg-quaternary` idiom that `send/page.tsx` and `f/[id]/page.tsx` use, and `StyledLink`, so the navigation guard still applies to its link. No pattern finding.

## Adversarial execution

The change rewrites the call sites of `getOne`'s authorization gate, so the gate was attacked rather than read.

- **Process whose output is the evidence:** the real Next API handler (`src/pages/api/trpc/[trpc].ts` → `createNextApiHandler`, the real `appRouter`, `createTRPCContext`, `protectedProcedure`, `authorizeUser`/`authorizeGuildUser`/`authorizeGuildAdmin`, `cookies-next`, real Kysely over the fake driver `capturingDatabase`). Replaced boundaries: the next-auth session (`~/server/auth`), the redis account/guild readers, and `project-utils`' `getPostgres`. I wrote the harness. It is a model of those three boundaries, and the gate code itself is real.
- **Module-scope branches:** `[trpc].ts` sets `onError` only when `env.NODE_ENV === 'development'` (env mocked, so not set). tRPC adds `data.stack` to error bodies unless `NODE_ENV=production`, and the stack differs by throw site, so the probe runs under `NODE_ENV=production` to compare the bodies production serves. `getServerSideSessionCookie` reads `__Secure-next-auth.session-token` outside development, and the probe sends that cookie.
- **Requests:** HTTP/1.1 written to a raw `net` socket, no client library.
- **Input class:** 6 caller states (owner; manager of the guild; other user managing nothing; other user managing a different guild; Discord guild list unreadable; session with no account row) × 3 rows (absent number, another user's personal message, a server message) × 5 request-target forms (canonical, leading zeros `00<id>`, `hydrate=true`, `message%2EgetOne` encoded path, raw unencoded JSON input), plus 11 malformed forms per caller (JSON number, negative, `+`, leading space, int8 overflow, 20 digits, empty, array, missing input, POST to the query, `batch=1`). That is 156 requests per tree.
- **Oracle, defined before the run:** (1) the secret body text appears only for owner/personal and manager/server; (2) for each caller whose session is whole (`other`, `otherManagesElsewhere`), the three refused rows give one byte-identical `status body` per form; (3) owner and manager get 200 with the content in every form.
- **Result:** at `6b539e5`, exit 0, all three oracles hold. Every refused row for a whole session is `404` "This message doesn't exist, or you don't have access to it.", and every malformed form is the same 400/405 for every caller, before any row is read. At base `6f76c6d`, exit 1 (positive control): `500 "no result"` / `404 "One of the provided messages does not exist."` / `403 "User does not have permission…"`.
- **Residue (outside the criterion's class, holds no round):** a caller whose own session is broken gets 401 for a server message's number and the one 404 for the other two: `discordUnreadable` 401 "Failed to fetch user servers.", `noAccountRow` 401 "User is not authenticated.". This is the block's design ("a failure to reach Discord is not 'not found'"). The fixer's mapping section lists both, though its residual line names only the broken token. Response time is not measured: an absent number returns after one query, while the other two run more. Message numbers come from one sequence, so their existence is inferable from the sequence in any case.
- **Instrument:** `verification/fix-message-not-found/code-review/getOne.refusal-probe.test.ts`, run in `git archive` exports of each SHA (node_modules symlinked) by `NODE_ENV=production PROBE_OUT=<file> node node_modules/vitest/vitest.mjs run src/server/api/routers/__tests__/getOne.refusal-probe.test.ts`. Captures: `raw/probe-6b539e5.{json,out}`, `raw/probe-6f76c6d.{json,out}`.

## TDD Compliance Check

**TDD Table Present**: No. On the fixer route, the document's Test section carries the red run, the green run and the negative controls (fixer.md, "TDD for the fix"), and does so in full.
**All Rows Complete**: Yes. Red at `6f76c6d` 11 failed / 3 passed, green at `6b539e5` 14 passed. Each of the 3 cases that passed at red is matched to a control in the 14-of-14-killed table. `tdd-check.py` is Python-only and does not apply.
**Concerns**: none blocking.
- Independence: expected values are literals (the text, the codes, `href="/message"`, `[404]`), or the real client's errors from the wire (`errorFromTheWire`). None is computed from production constants.
- Iron Law 5: the redis stubs are named in the document with their falsity signature. The page test's errors come from the real handler over HTTP.
- Spec-form: correct, since the handoffs are not incident records.
- Naming: both basenames fit the positive form. My ID-token sweep over the two basenames and their `describe`/`it`/comment lines found 0 hits; the convention check's SKIP leaves that check undone, so I ran it.
- No time-based case: `vi.waitFor` polls a condition with its 1 s default.
- For QA Phase 2: no control kills a page's once-only case without also killing its notice case.

## Convention check

`node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=6f76c6d` (`raw/convention-check.out`, exit 1): 7 files examined, 2 test files, 5 FAIL, 0 CANDIDATE, 18 SKIP.
- The 5 FAILs are all eslint in `MessageProvider/index.tsx` at lines 121, 161, 178, 200 and 358. `git blame -L` at `6b539e5` puts them on `4fe53b6` (4) and `36fdbb3` (1), not this chain's commit, so they are pre-existing and not findings.
- The comment gate raised no FAIL, and the diff adds no source comment.
- The 18 SKIPs are 17 untracked `.playwright-mcp/` paths (not this chain's) and the ID-token basename check, which the tool did not run. That check is covered by hand above.

## Findings

### Critical
None.

### High
None.

### Medium
None.

### Low/Info

**CR-1 INFO Round 1 [User-visible flows]**: after a confirmed reload of a message that no longer exists, the editor gives way to the notice under a "Message reloaded!" toast
- **Location**: `MessageProvider/index.tsx` `useValue` (`isNotFound`), with `useApiMethods.ts` `reloadMessage` and `edit/page.tsx` `Page`, at `6b539e5`.
- **Class**: a user-visible state the fix adds that the fixer's **User-visible flows** list does not name. Here a refetch after a successful load turns `isNotFound` true, because react-query keeps `data` and sets `error`.
- **Enumeration**: `git grep -c -E 'refetch\(|onConfirm: reloadMessage|getOne.invalidate' 6b539e5 -- src ':!**/__tests__/**'` gives 5 hits in 5 files. `useApiMethods.ts` is the `refetch()` inside `reloadMessage`, the mechanism and not an entry point. `PartialMessagesProvider.tsx` refetches another query and is outside the class. That leaves 3 entry points:
  1. The header's "Reload" (`Navigation.tsx`), gated by `withConfirmation` ("Your changes will be lost.", "Discard Changes"). This reaches the state.
  2. `usePusher`'s confirmed reload, fired only on a `message-update` trigger (`shared.ts`, after a save, so the row exists; `message.delete` triggers nothing). This does not reach it.
  3. `updateRecentMessageData`'s `onSuccess` invalidate (`index.tsx`, after a send). This reaches it only if the row is deleted or access is lost between the load and the send.

  The predicate cannot see a refetch react-query makes on its own; `refetchOnWindowFocus: false` and `staleTime: Infinity` rule that out for this query.
- **Issue**: measured, not read (`code-review/reload-after-load.probe-tail.tsx` via `build-reload-probe.sh`, fixer's page harness, `raw/reload-6b539e5.out.json`). At `6b539e5`: owner's message loaded, one unsaved edit, row removed, Reload. Requests `[200, 404]`; the notice shows and the editor is gone; the provider still holds the message and `hasChanged` stays true. So the Back link's navigation guard still asks about unsaved changes the user just chose to discard. `reloadMessage` toasts "Message reloaded!" because `refetch()` resolves on error; that toast is pre-existing. At base `6f76c6d` the same steps gave `[200, 500]` (retrying), with the editor kept (`raw/reload-6f76c6d.out`). This state follows from scope item 2 (the load failed with NOT_FOUND), and the user has already confirmed discarding, so nothing is lost that he did not agree to lose. It is not a defect against the statement.
- **Required Action**: no code change. Steering adds one line to the flows quoted to the owner with the release: "If you reload a message that was deleted, or that you lost access to, the page shows the same notice." Carrier: steering's release quote (this INFO is user-visible; the stage set has no UAT). `no test`: the probe's captured check is the instrument, and a suite case for it is QA's to judge.

### Round 1, sub-entry 1.1 — test-only delta at website `f4baebb`

- **Identity.** `git rev-parse f4baebb` = `chain/fix-message-not-found` = `f4baebb000ac6fa31714108c9d2bf261dc3de4a4` at start and end. `git log 6b539e5..f4baebb` holds one commit, `f4baebb`. `git diff --numstat 6b539e5 f4baebb` gives 2 paths: `MessageNotFound.edit-and-send-pages.test.tsx` +70/−4 and `message.get-one-not-found.test.ts` +30/−6. No production path changed, so the round-1 assessment of production code carries to `f4baebb` unchanged. The delta is test-only, so this is a scoped check and not a new round.
- **Read against the production code it covers.**
  - Server file: the `null` guild-list case is gone. It stood for a value `fetchUserGuilds` never returns, as found in hazard 4 above. It is replaced by a thrown `Error` worded as the real `fetchUserGuilds` throw (`Failed to fetch guilds. Got: …`), expected `INTERNAL_SERVER_ERROR`. Two cases are added: an owner-check database failure, expected `INTERNAL_SERVER_ERROR`, and a session with no account on a server message, expected `UNAUTHORIZED` "User is not authenticated.". The no-account case is the residue the round-1 probe measured, now asserted in the suite.
  - Page file: two cases are added on each page. A loadable own message opens with `[200]` and no notice. A `BAD_REQUEST` refusal shows no notice, and it waits on the provider's own `messageError.data.code`, rendered by a test consumer of `useMessage`. The `pusher-js` mock is now a constructible function; this is the harness fault my reload probe met and worked around in its build script (QAF-4).
  - Expected values are literals (codes, the text, `[200]`), so they are independent of the code under test. The fixtures stand in for the real reader's output: the throw text matches `fetchUserGuilds`, and the rows are shaped as `getMessage` returns them.
- **Convention check.** `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=6b539e5`: exit 0, 2 test files examined, 0 FAIL, 0 CANDIDATE, 18 SKIP (17 untracked `.playwright-mcp/` paths and the ID-token basename check). By hand, the ID-token class over both files' `describe`/`it` titles and comment lines at `f4baebb` gives 0 hits. Basenames are unchanged. The delta adds no comment.
- **Each new case seen red.** QA's re-run at `f4baebb` (`qa/fix-message-not-found-qa.md`, Mutation sweep, `verification/fix-message-not-found/qa/sweep/rerun/`) gives 7 of 7 killed. Its success-path control (`…/qa/sweep/positive-control/`) kills `qa-notice-also-on-success` with both "opens the message" cases. I read QA's tables and did not re-run them, since test adequacy is QA's gate.
- **Assumption Not Checked (Round 1):** closed true by QA. Under `NODE_ENV=production` the probe finds 0 `"stack` matches in the bodies. Under the default env, the positive control, it finds 146, because the throw sites differ (`qa/fix-message-not-found-qa.md`, the refusal-probe row).
- **CR-1:** unchanged. It is routed to steering for the release flows line.

## Verdict

**Status**: APPROVED_WITH_COMMENTS (unchanged at sub-entry 1.1, now bound to `f4baebb`)
**Rationale**: All three scope items are met at `6b539e5`. The server answer is uniform, measured over raw HTTP with a positive control at base. Each page shows one notice with a link to `/message` and no retry on 4xx. Hooks are ordered correctly on both pages. The shared gate is unchanged. Tests are spec-form, independent and control-backed. The one INFO is a release-quote line, not a code change.

## Required Actions

None for the fixer. CR-1: one line in the release flows quote (steering).

## Assumption Not Checked

Round 1: This review assumes the deployed Vercel build serves tRPC error bodies without `data.stack` (`NODE_ENV=production` at the handler) and does not test it on a built app; the probe set `NODE_ENV=production` under vitest only. Falsity signature: the three refusals' 404 bodies differ in `data.stack`, because the throw sites differ (`asNotFound`'s handler vs the direct `throw messageNotFound()`), which tells the cases apart. Owner: QA Phase 2, by `next build` + `next start` locally and three raw `GET /api/trpc/message.getOne` bodies compared byte for byte.

## Next Steps

- QA Phase 2 (`qa-fix-message-not-found`): test execution at `6b539e5`, plus the Assumption Not Checked above (built-app error bodies) and the once-only-case note under TDD Compliance.
- Steering: CR-1's flows line, with the release.
- Devops, after QA: website `master`, which Vercel deploys. The release consequence is devops's to establish.
