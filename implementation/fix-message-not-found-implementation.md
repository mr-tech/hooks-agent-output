---
ID: n/a
Origin: fix-message-not-found
UUID: 46210f8b
Status: Active
Status-Detail: "Fix committed on website chain/fix-message-not-found at 6b539e5; handed to code review. Then QA Phase 2 (56 added production lines), then devops for website master on his word."
Handoff-At: 6b539e5 — repos=website
Origin-Chain: fix-personal-message-access
---

# fix-message-not-found — implementation

## Scope statement

The owner's words reached this chain through `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:50Z" (Q1) and
"2026-11-21T05:55Z". The scoping determination and the bounded statement are in `steering/fix-message-not-found-rulings.md`, block
"2026-11-21T06:46Z". They were relayed by `steering-hooks` in `steering/fix-message-not-found-brief-fixer.md` and
`steering/fix-message-not-found-brief-common.md`. Quoted from the block:

> Repository `website` only, from `origin/master` `6f76c6d`, on `chain/fix-message-not-found`:
> 1. `message.getOne`, for a signed-in caller, answers one TRPCError code, NOT_FOUND, with one message text, for a number no row holds, a
>    personal message of another user, and a server message whose server he cannot manage. Only `getOne` changes: `authorizeGuildAdmin`,
>    `authorizeGuildUser` and their other callers keep their answers.
> 2. `/message/m/[id]/edit` and `/message/m/[id]/send`, when that load fails with NOT_FOUND, show one not-found state — the same wording in
>    every case, which never says whether the number exists (proposed: "This message doesn't exist, or you don't have access to it."; the
>    fixer may adjust, the same text everywhere), with a link back to his messages — in place of the blank editor or spinner.
> 3. That load is not retried on NOT_FOUND (nor on any other 4xx tRPC code); a 5xx keeps react-query's retry.

Write set, exclusions (signed-out callers, the `/message/f/[id]` copy toast, the v1 REST route, guild pages that load by server) and
"What the sweep did not cover": the same block.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/fix-message-not-found-rulings.md`, block "2026-11-21T06:46Z", relayed by the brief above. |
| 2 | Bounded scope statement | Quoted above. Property and swept region: the block's "Scope sweep" (`verification/fix-message-not-found/scoping/sweep.md`, commit `0124978`). |
| 3 | Fix branch | `chain/fix-message-not-found`, cut by steering from `origin/master` `6f76c6d`. At start `git -C website branch --show-current` returned that name; HEAD `6f76c6d`; `status --porcelain` held one line, `?? .playwright-mcp/`. |
| 4 | Record on the mechanism | `architecture/system-architecture.md:136` (the personal-message bullet: "`getOne` answers `NOT_FOUND` for a personal message unless `authorizeUser` finds the row is the caller's"; still true, now incomplete; see INBOX below). `architecture/system-architecture.md:213` (access refusals leave no signal; unchanged by this fix). `architecture/website.md`: a grep for `getOne`, `NOT_FOUND`, `not found` or `retry` matched nothing. `research/` (open and `closed/`): a filename listing matched nothing for not-found, getone, message-load or retry. |

## Diagnosis

**Cause, server.** `message.getOne` (`message.ts:56-69` at `6f76c6d`) gives three different answers to a signed-in caller who cannot see a
message:

| Case | Answer at `6f76c6d` | Where |
|---|---|---|
| a number no row holds | `INTERNAL_SERVER_ERROR`, "no result" | `getMessage` ends in `executeTakeFirstOrThrow` (`shared.ts:166`), which throws kysely's `NoResultError`; nothing in `getOne` catches it |
| another user's personal message | `NOT_FOUND`, "One of the provided messages does not exist." | `authorizeUser` (`user.ts:27-31`) throws before `getOne`'s own `NOT_FOUND` ("This message does not exist.") is reached |
| a server message of a server he cannot manage | `FORBIDDEN`, "User does not have permission to access to this server." | `authorizeGuildAdmin` via `authorizeGuildUser` |

Instrument: the red run of `message.get-one-not-found.test.ts` (Test, below) through the real `authorizeUser`, `authorizeGuildUser` and
`authorizeGuildAdmin` over the fake kysely driver. Its received values are the three rows above, in
`verification/fix-message-not-found/fixer/red-run-6f76c6d.out`.

**Cause, page.** `MessageProvider`'s `getOne` query (`index.tsx:209-216`) sets no `retry`, and `TrpcProvider` builds `new QueryClient()`
with no default, so react-query retries a failed load three times with backoff (1 s, 2 s, 4 s). `messageError` is exposed and rendered by
no page. The edit page renders `{!message ? null : (` (`edit/page.tsx:160`), an empty box. The send page shows `LoadingDots` while
`isLoading` holds through the retries, then renders with a null message. Instrument: the red run of the composed page test, below. At
`6f76c6d` neither page showed any not-found text within the 1 s poll, and the page's `getOne` was still retrying.

**Consumers of the answer this fix changes** (`getOne`'s error code and text), from a grep over `website/src` for `getOne` and for the
old texts and `data?.code`/`httpStatus` comparisons:
- `MessageProvider` `getOne` query → its `messageError`, now also `isNotFound` and the `retry` rule (this fix).
- `/message/f/[id]` copy action (`page.tsx:181-198`): toasts "Failed to copy message." on any error, whatever the code; it keeps
  react-query's default retry. Unchanged, excluded by the block.
- `message.updateRecentMessageData`'s `onSuccess` invalidates `getOne`: a refetch of the same query, governed by the same rule.
- No code compares `getOne`'s old texts. "One of the provided messages does not exist." is still thrown by `user.ts:30` and
  `authorizeGuildUser.ts:29` for their other callers, unchanged. `message.ts:246` ("This message does not exist.") belongs to another
  procedure, unchanged. `guild.ts:18` (`getGuild` maps `NOT_FOUND` to null) is reached through `authorizeGuildAdmin`'s other callers, not
  through `getOne`; `authorizeGuildAdmin` is unchanged.

**Which errors map** (hazard 1 of the brief). In `getOne` only:
- `NoResultError` from `getMessage` → the one `NOT_FOUND`.
- `FORBIDDEN` from `authorizeGuildUser` → the one `NOT_FOUND`. Its `UNAUTHORIZED` answers (no session cookie, no account for the session,
  Discord's guild list unreadable) and its plain `Error` (Discord's list not an array, `redis/index.ts:230`) keep their answers. A failure
  to reach Discord is not "not found".
- `NOT_FOUND` from `authorizeUser` → the one `NOT_FOUND`. This also covers `getAccount`'s `NOT_FOUND` ("Account does not exist."), which
  at `6f76c6d` a signed-in caller with no account row got only for a personal message number. That told those numbers apart, so it maps too.
- Any other error, a database failure included, keeps its answer: a 500, which the page still retries.

Residual tell, stated: a signed-in caller whose Discord token is broken gets `UNAUTHORIZED` for a server message's number and the one
`NOT_FOUND` for the others. That is the block's design (a failure to reach Discord is not "not found"). The caller sees it only while
his own session is broken.

**Base against fix for behaviours routed out of scope.** Signed out, `protectedProcedure` answers `UNAUTHORIZED` (401) before `getOne`'s
body, at base and fix alike. The retry rule now stops after the first 401, where base retried it three times. The edit page's end state
is unchanged (an empty editor, the sign-in panel), and the send page leaves its spinner sooner. That is item 3's "nor on any other 4xx",
not a regression. The `/message/f/[id]` copy action is unchanged.

**Residue in production.** `getOne` is a read: no write runs before or beside the failing call. From the blank editor at `6f76c6d`,
`saveMessage` and `updateMessage` do nothing while the message is null (`useApiMethods.ts:53,82`), and the save hotkey needs a message.
So no row was written from the refused state. Release form: a Vercel deploy serves the fixed server answer to every request from the
switch. A tab already open keeps the old client bundle, with its retries and blank editor, until reload. That is harmless: the server
answer it shows is already the uniform one. No live state to check.

**Origin-Chain.** The non-uniform answer is composed of lines from `4fe53b6` (2023-08-22, "redesign": the unguarded `getMessage`, the
`authorizeGuildUser` call, the query without `retry`) and `983681c` (chain `fix-personal-message-access`: the personal-message refusal
and its separate text). The blank editor branch is `2ea8c22` (2023-09-23). Neither 2023 commit belongs to a chain. The field names the
one chain whose change wrote part of the defect.

## Change

- `src/server/api/routers/message.ts`: `messageNotFound()`, the one `NOT_FOUND` with the text "This message doesn't exist, or you don't
  have access to it.". `asNotFound(refusal)` maps only the named refusal (a `NoResultError`, or a `TRPCError` of one code) to it and
  rethrows anything else. `getOne` applies it at its three sites.
- `src/providers/MessageProvider/index.tsx`: exported `retryUnlessRefused(failureCount, error)`, which retries up to three times unless
  the tRPC answer's `httpStatus` is 4xx; passed as `retry` on the `getOne` query only; `isNotFound` in the context, true when the load's
  error code is `NOT_FOUND`.
- `src/app/message/m/[id]/_components/MessageNotFound.tsx` (new): the notice, the same text, and a "Back to your messages" link to
  `/message`.
- `src/app/message/m/[id]/edit/page.tsx`, `src/app/message/m/[id]/send/page.tsx`: render `MessageNotFound` in place of the page when
  `isNotFound`, after every hook.
- Tests: `src/server/api/routers/__tests__/message.get-one-not-found.test.ts` (new) and
  `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx` (new).

Not changed, inside the write set: `shared.ts` (`getMessage` keeps `executeTakeFirstOrThrow`, since `updateRecentMessageData` and
`upsertMessage`'s post-save read also call it), the layout and `_layout/Navigation.tsx`. Signed in, the header shows the name field,
empty while the message is null; "New Message" is the signed-out branch (`Navigation.tsx:318`) or the field's placeholder, and it is
hidden while the value is `' '`. `TrpcProvider.tsx` is not touched (a re-scope, per the block).

`instanceof NoResultError` holds only if `project-utils`' `getPostgres()` builds its Kysely from the same kysely module the router
imports. Website's `node_modules/kysely` and `project-utils`' resolve to one directory,
`node_modules/.pnpm/kysely@0.26.1/node_modules/kysely` (`readlink -f` on both), and the lockfile holds one `kysely@0.26.1`.

Production lines added: `git diff --numstat 6f76c6d..6b539e5` over the five production paths, added column: 21 + 8 + 4 + 5 + 18 =
**56**. So QA Phase 2 runs.

## Test

Before adding: the existing test on the surface is `message.personal-ownership.test.ts`. It mocks `authorizeGuildAdmin` whole, and its
responder answers a full row for any number, so it cannot express the absent number or the unmanageable server through the real readers.
The new server file drives the real `authorizeUser`, `authorizeGuildUser` and `authorizeGuildAdmin`, with only the `redis` boundary
replaced. The existing file is left as it is: its cases still pass and still describe its surface.

Spec-form, no `// escaped:` line: the release records that observed the defect are handoffs, not incident records, and the block treats
the change as specified behaviour.

**Red run** at `6f76c6d` production (the two new files in the tree, `git diff --quiet HEAD -- src` true):
`npx vitest run src/server/api/routers/__tests__/message.get-one-not-found.test.ts src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx`
→ exit 1, **11 failed, 3 passed** (`verification/fix-message-not-found/fixer/red-run-6f76c6d.out`). A first red run failed two server
cases on a harness fault: the test's `req.cookies: {}` shadowed the cookie header, so `cookies-next` read no session. I removed that
field and re-ran. The file holds the second run.
- Red on the defect: the three per-case answers (500 "no result"; `NOT_FOUND` with the other text; `FORBIDDEN`), the same-answer case
  (3 distinct outcomes), both pages' notice case and both pages' once-only case (no text within the poll), and the three retry-rule
  cases (`retryUnlessRefused is not a function`: the rule is absent at base).
- Passed at red (each needs a control, below): the owner gets his personal message; a manager gets the server message; an unreadable
  guild list answers `UNAUTHORIZED`.

**Green run** at `6b539e5`: the same command → exit 0, **14 passed** (`verification/fix-message-not-found/fixer/green-run.out`).

**Values invented at a boundary** (Iron Law 5):
- `redis.fetchAccountFromSession` and `redis.fetchUserGuilds` are replaced by stubs answering an account and a guild list (`[]` = manages
  no server; `[{ id }]` = manages it; `null` = Discord unreadable). The real `fetchUserGuilds` returns only owned or Administrator guilds,
  so the list is already the managed set. If the stub's shape were false, say the real function returned guild objects whose `id` is
  not the Discord id, the manager case would fail as `NOT_FOUND` and the unmanageable case would still pass. The manager case's control
  (`server-message-always-refused`) shows the case can detect that.
- The session cookie arrives as a raw `cookie` header read by the real `cookies-next`, and the database rows come from the fake kysely
  driver, compiled by real Kysely. The page test's errors come from the real tRPC handler over HTTP through the real `TrpcProvider` and
  `httpLink`, so `data.httpStatus` and `data.code` are the client's own.

**No time-based case.** The once-only case does not wait out a backoff. react-query sets the query's error, which the notice renders,
only after retries end, so the notice on screen with one recorded request shows no retry. The notice case's `vi.waitFor` polls a
condition (default 1 s cap) and resolves on the first request at the fix.

**Negative controls** (`verification/fix-message-not-found/fixer/controls-mutants.json`, run by
`python3 ~/.claude/tools/mutation-run.py --repo website --sha 6b539e5 … --dep node_modules -- npx vitest run`, each mutant against its
own test file): see the table in this section, filled from `verification/fix-message-not-found/fixer/controls/`.

Result: **14 of 14 KILLED**, every control passed (7 cases per file, `tests_run` equal to the control's), 0 stillborn, 0 aborted
(`controls/mutation-table-6b539e5…-20261121T070056Z-p1461612.json`, `controls/run.log`). Each mutation runs in its own `git archive`
export; the shared tree was not edited.

| Mutant | What it removes or changes | Cases turned red |
|---|---|---|
| `absent-number-unmapped` | the `NoResultError` mapping | absent number; same answer in all three |
| `forbidden-unmapped` | the `FORBIDDEN` mapping | unmanageable server; same answer in all three |
| `owner-refusal-text-unmapped` | the `authorizeUser` `NOT_FOUND` mapping (the other text) | another user's personal message; same answer in all three |
| `every-error-mapped` | the rethrow of unmapped errors | `UNAUTHORIZED` kept (passed at red) |
| `server-message-always-refused` | a guild message refused outright | manager gets the server message (passed at red); `UNAUTHORIZED` kept |
| `personal-message-always-refused` | the `oldMessageCount` check made unconditional | owner gets his message (passed at red) |
| `retry-ignores-4xx` | the 4xx test in `retryUnlessRefused` | both pages' notice and once-only cases; not-found and bad-request not retried |
| `retry-unbounded` | `failureCount < 3` | 5xx retried up to three times |
| `retry-never` | the rule returns false | 5xx retried up to three times |
| `retry-option-dropped` | `retry: retryUnlessRefused` on the query | both pages' notice and once-only cases |
| `not-found-flag-off` | `isNotFound` computed false | both pages' notice and once-only cases |
| `edit-page-guard-dropped` | the edit page's `isNotFound` return | edit notice and once-only |
| `send-page-guard-dropped` | the send page's `isNotFound` return | send notice and once-only |
| `back-link-elsewhere` | the link's `/message` target | both pages' notice case |

No case is dropped: each of the 14 is red under at least one row.

## Verification

| Check | Command | Result |
|---|---|---|
| Existing suite, base | `npx vitest run --reporter=json` at `6f76c6d` (`suite-base-6f76c6d.json`) | exit 0; `numTotalTests` 2283, passed 2283; 157 files |
| Suite, fix | the same at the tree of `6b539e5` (`suite-fix.json`, run before the commit on identical source except two test-file lint edits, re-run below) | exit 0; 2297 passed of 2297; 159 files. 2283 + 14 new = 2297; 157 + 2 new files = 159 |
| Suite, fix commit | `npx vitest run --reporter=json` with `git diff --quiet HEAD -- src` true at `6b539e5` (`suite-6b539e5.json`) | exit 0; 2297 passed of 2297; 159 files. By path: every base file is present, and the two new test files are the only additions |
| Typecheck | `pnpm run typecheck` (both programs) | exit 0 (`typecheck.out`) |
| Lint | `node ~/.claude/tools/convention-check.js website --since=6f76c6d` (`convention-check.out`) | 7 files examined, 2 test files; 0 CANDIDATE; **5 FAIL, all pre-existing** (below); 18 SKIP |
| Build verification | the workspace `CLAUDE.md` names none for `website` (no pinned-build rule); no package-manager operation ran, and `pnpm-lock.yaml` is unchanged `6f76c6d..6b539e5` | — |

**The five FAILs**, all in `src/providers/MessageProvider/index.tsx`: lines 121 and 200 `no-unnecessary-type-arguments`, 161 and 178
`react-hooks/set-state-in-effect`, 358 `react-hooks/use-memo`. ESLint over the base file in a detached worktree at `6f76c6d`
(`eslint-base-6f76c6d.json`) reports the same five rules at 115, 194, 155, 172 and 350. That is the same code, shifted by the 6 and 8
lines this diff adds above them. `git blame` at `6b539e5` puts each line on `4fe53b6` or `36fdbb3`, not on this commit. They are
unchanged by this fix and left as they are; fixing the three `react-hooks` findings would change render behaviour outside the
statement. The 18 SKIPs: 17 untracked `.playwright-mcp/` captures, outside the examined set and not this chain's; and the ID-token
basename check, which the tool does not implement verbatim, so it is **unchecked**. By hand, the two new basenames,
`message.get-one-not-found.test.ts` and `MessageNotFound.edit-and-send-pages.test.tsx`, match the positive form and carry no ID token.
No source comment is added.

Instrument disclosures:
- A first try at the base lint piped `git show` into `eslint --stdin`. The rtk hook filters `git show` output, so the content was
  mangled. I deleted those files and did not rely on them. A second try fed an unfiltered `git archive` copy (blob `e3bfe1b` = `HEAD:`
  blob) to stdin. Type-aware lint reads the on-disk file under that name, so it crashed. The worktree run replaced both, and the
  worktree is removed (`git worktree list` shows the main tree only).
- `npx vitest --version` was rewritten by the rtk hook into a full suite run (2297 passed, 0 failed). It is not cited as evidence.

## User-visible flows

- Signed in, open `/message/m/<number>/edit` for a number that was deleted or never existed: the notice "This message doesn't exist, or
  you don't have access to it." with a "Back to your messages" button, in place of the empty editor.
- The same for another user's personal message, and for a message of a server you don't manage: the same notice, word for word.
- The same three cases at `/message/m/<number>/send`: the same notice in place of the spinner and the empty send page.
- "Back to your messages" goes to `/message`.
- The page asks for the message once on these refusals (one request in the network panel) and shows the notice straight away.
- Your own messages and your servers' messages open in the editor and send page as before.

## Handoff

- SHA: website `6b539e5` on `chain/fix-message-not-found` (no upstream; not pushed).
- Reviews: `code-reviewer-fix-message-not-found`, a verdict at `6b539e5`; then QA Phase 2 (`qa-fix-message-not-found`), since the fix
  adds 56 production lines (≥ 20).
- Merges: devops, at release to website `master` (Vercel production), on his release approval.
- INBOX: one entry, "2026-11-21 — fixer-fix-message-not-found — FYI", for the architect, on `system-architecture.md:136`. It is left
  uncommitted because `INBOX.md` holds other sessions' uncommitted hunks; the steering session commits the inbox.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T07:01 | fixer-fix-message-not-found | Created. Red run at `6f76c6d`, fix committed at `6b539e5`, verification recorded. |
| 2026-11-21T07:04 | fixer-fix-message-not-found | Negative controls (14 of 14 killed) and the suite at `6b539e5` recorded; INBOX entry for the architect; handed to code review at `6b539e5`. |
