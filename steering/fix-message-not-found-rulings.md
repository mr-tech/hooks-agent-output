# Rulings — fixer chain `fix-message-not-found` (website: one 'not found' answer and page for a message that cannot be loaded)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 2 of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z", "05:38Z",
"05:50Z". Brief common part: `steering/fix-message-not-found-brief-common.md`. tmux category: `fix-message-not-found`.

## 2026-11-21T06:46Z — scoping determination: fixer chain, website, three handoffs

**His words.** Effort file block "2026-11-21T05:50Z", Q1, chosen by selection: "Agent: one not-found page (Recommended)" — "the same
'not found' wording for all three cases, so the page never reveals whether a message number exists, plus a link back to your messages.
The page doesn't retry on that error." Block "2026-11-21T05:55Z", chosen by selection: "Agent: one answer for message load
(Recommended)" — "the message load answers 'not found' for all three cases. Only that one load changes; the shared server-permission
check and the seven other places that use it keep answering 'forbidden'."

**Source.** `handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md`,
`handoff/editor-shows-blank-shell-when-personal-message-load-is-refused-2026-11-20.md`,
`handoff/deleted-message-url-serves-blank-editor-2026-11-20.md`; all IN whole; the last two's "needs his word" limb is answered by the
selections above.

**Shape.** Defect, user-visible on production (the second and third handoffs observed it on hooks.gg). No dated outside event. Cause read
from code, not run, re-read by this thread at website `origin/master` `6f76c6d` (06:4xZ): `getMessage` ends in
`executeTakeFirstOrThrow` (`shared.ts:166`), uncaught in `getOne` (`message.ts:56`); NOT_FOUND for another user's personal message
(`authorizeUser`, `message.ts:60`); FORBIDDEN for a server he cannot manage (`authorizeGuildUser`, `message.ts:59`); `messageError`
exposed (`MessageProvider/index.tsx:210,330`) and rendered nowhere; edit page `{!message ? null : (` (`edit/page.tsx:160`);
`new QueryClient()` with no retry default (`TrpcProvider.tsx:16`). Blast radius: `message.getOne` and the pages that load one message by
number. Specification: his selections. No library holds the fix. End step: website `master`, which Vercel deploys to production; his
word needed, asked by devops in its own session.
**Release ref.** `release-move.js /usr/local/bin/hooks/website master 6f76c6de… --dry-run` (06:4xZ): "DRY RUN: every check passed;
nothing moved"; workflows "none — …/.github/workflows absent"; `--report`: "one serving ref at origin (master); no pair". Tree: `master`
`6f76c6d` = `origin/master` after `git fetch`; one untracked path (`.playwright-mcp/`). Lockfile unchanged `76da25c..6f76c6d`.
**Released chains whose scope touched these routes:** `fix-recent-message-ids` (released 06:45:05Z, `shared.ts`'s recent-list query, not
`getMessage`; its open post-deploy carrier `handoff/fix-recent-message-ids-post-deploy-2026-11-21.md`, P-2, a recent-list read, outside
these routes); `fix-personal-message-access` (closed; the owner filter at `authorizeUser`).

**Scope sweep** (helper, `verification/fix-message-not-found/scoping/sweep.md`, commit `0124978`, at `76da25c`; premises re-read at
`6f76c6d` as above; a refutation helper's read of the three answers is quoted in effort block 05:55Z):
- Routes with the property: `/message/m/[id]/edit` and `/message/m/[id]/send`, both through `MessageProvider` (`getOne`); edit renders an
  empty box, send a spinner then a null message; the header reads "New Message" (`Navigation.tsx:318`).
- `/message/f/[id]`'s copy action: a generic toast "Failed to copy message." — an action, not a page load.
- `getOne`: 500 / NOT_FOUND / FORBIDDEN as above; signed-out: UNAUTHORIZED for every number (uniform), still a blank editor and retries.
- Retry: react-query's default of 3 for both `getOne` queries; other providers set `retry: 1` or `false`.
- No `not-found.tsx`, `error.tsx`, 404 page or `notFound()` call; `InfoPanel` is the existing page-level notice.
- Covering tests: `message.personal-ownership.test.ts` (NOT_FOUND for another user; int8 cases); nothing on an absent number,
  `messageError`, retry or the refused-load render.

**Stage set:** `fixer-fix-message-not-found` → `code-reviewer-fix-message-not-found` (and QA Phase 2, `qa-fix-message-not-found`, only if
the fix adds 20 or more production lines; under 20 the reviewer also runs the suite and the red tests) → devops for website `master` (his
word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** list is quoted to him with the release (steering.md, Fixer).
Security not in the set: nothing root executes; the change narrows what a response reveals.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `6f76c6d`, on `chain/fix-message-not-found`:
1. `message.getOne`, for a signed-in caller, answers one TRPCError code, NOT_FOUND, with one message text, for a number no row holds, a
   personal message of another user, and a server message whose server he cannot manage. Only `getOne` changes: `authorizeGuildAdmin`,
   `authorizeGuildUser` and their other callers keep their answers.
2. `/message/m/[id]/edit` and `/message/m/[id]/send`, when that load fails with NOT_FOUND, show one not-found state — the same wording in
   every case, which never says whether the number exists (proposed: "This message doesn't exist, or you don't have access to it."; the
   fixer may adjust, the same text everywhere), with a link back to his messages — in place of the blank editor or spinner.
3. That load is not retried on NOT_FOUND (nor on any other 4xx tRPC code); a 5xx keeps react-query's retry.
Write set: website `src/server/api/routers/message.ts`, `src/server/api/utils/shared.ts` (`getMessage` only), `src/providers/MessageProvider/
index.tsx`, `src/app/message/m/[id]/**` (pages, layout, `_components`, `_layout`), `src/app/_navigation/**` where the header names the
state, one new component for the not-found state beside its first user, their `__tests__/`; in the record, the fixer's document and
`verification/fix-message-not-found/`. A change to `TrpcProvider.tsx`'s global client defaults is a re-scope (it changes every query).

**Exclusions.**
- Signed-out callers: UNAUTHORIZED is already uniform over every number; what a signed-out visitor sees on these pages (blank editor) is
  a sign-in state, not one of his three cases. OUT; told to him with the release.
- `/message/f/[id]` copy toast: an action whose toast already states the failure. OUT.
- The v1 REST route: key-gated, already 404 for absent and other-guild. OUT.
- Guild message pages that load by server, not one message by number: no hit in the sweep.

**What the sweep did not cover** (devops hazard lines): nothing executed; `useApiMethods`/`usePusher` refetch after a refusal not traced;
`WebhookProvider`'s Discord-message loads not read.

## 2026-11-21T07:58Z — released, and an escaped defect on scope item 1's absent-number limb

Released: website `master` `6f76c6d` → `f4baebb` at 07:51:38Z on his selection (devops's message; `git ls-remote origin master` read
back `f4baebb000ac…` by this thread 07:5xZ); deployment record closed Released. Source handoffs closed Addressed 07:53Z.
Post-deploy B-1 (`qa-fix-message-not-found`, message 07:5xZ; record `e37f4ef`): FAILS on the absent-number limb — on hooks.gg as the
test account 07:53-07:56Z, 6022 and 999999999999 still answer 500 "no result" and `/message/m/6022/edit` is still the blank editor
with retries; 1000 (unmanaged server) gets the new 404 and notice with one request, so the new build serves. QA's established cause:
`instanceof NoResultError` compares kysely's ESM class (imported by `message.ts`) with the CJS one (project-utils' `getPostgres`
`require("kysely")`); every instrument faked `getPostgres` with ESM kysely. Not a regression (production answered 500 before too).
QA records its Phase 2 PASS as falsified for this class. Carrier: `handoff/get-one-absent-number-still-500-in-production-2026-11-21.md`
(UUID 7c3e91a4, Owning-Stage this thread); B-1 stays Open in `handoff/fix-message-not-found-post-deploy-2026-11-21.md`.
**Correction owed to him:** the first User-visible flow quoted with the release ("Signed in, open `/message/m/<number>/edit` for a
number that was deleted or never existed: the notice …") is false in production at `f4baebb`; told to him in this thread's chat 07:5xZ.
The source handoff `get-one-absent-number-fails-without-not-found-2026-11-19.md` was closed Addressed on a discharge that did not hold;
the new handoff 7c3e91a4 carries it, so it is not reopened. A refutation helper is trying the cause before the order question is put.
