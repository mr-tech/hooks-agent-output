---
ID: n/a
Origin: fix-trpc-batch-limit
UUID: 61d9ad16
Status: Committed
Status-Detail: "Committed at website chain/fix-trpc-batch-limit tip 76da25c (devops Stage 1, 2026-11-21); awaiting the release to website master on the owner's word. Closes Released at Phase 2D."
Handoff-At: 76da25c — repos=website
Origin-Chain: none
---

# fix-trpc-batch-limit — implementation

## Scope statement

The scope statement is steering's, from `steering/fix-trpc-batch-limit-rulings.md`, block "2026-11-20T23:57Z", on the owner's word in
`steering/website-deps-review-rulings.md` block "2026-11-20T23:44Z" ("yes to 1 and 2"). Route: fixer → code review (QA Phase 2 only
at 20 or more added production lines) → devops for website `master`, on the owner's word. Repository `website` only, from
`origin/master` `d1bb9b0`, on `chain/fix-trpc-batch-limit`:

1. A tRPC request that names more than one procedure call is refused before any call runs, at the single entry point
   `src/pages/api/trpc/[trpc].ts`. The site's own three links keep working.
2. The redirect decision in `src/app/_navigation/Redirects/Server.tsx` no longer rests on a client-settable `x-pathname`. The dead
   `x-query-params` write in `src/middleware.ts` is removed, with the test reads of it.
3. `package.json`'s top-level `overrides` key is deleted. Writing a real pin under `pnpm.overrides` is OUT; stop if `semver` appears
   in `pnpm audit --prod` at the tip.

The source carrier is `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`, items 1 to 3.

## Entry Conditions

| # | Condition | Value | Read |
|---|---|---|---|
| 1 | Scoping determination | `steering/fix-trpc-batch-limit-rulings.md` block "2026-11-20T23:57Z", relayed by `steering/fix-trpc-batch-limit-brief-fixer.md` and `-brief-common.md` | read whole, 2026-11-20T23:5xZ |
| 2 | Bounded scope statement | the three items above; write set as stated in `-brief-common.md` § Repositories | as above |
| 3 | Fix branch | `chain/fix-trpc-batch-limit` in `/usr/local/bin/hooks/website`, HEAD `d1bb9b0` at start | `git -C /usr/local/bin/hooks/website branch --show-current` → `chain/fix-trpc-batch-limit`; `rev-parse HEAD` → `d1bb9b0724cd…` |
| 4 | Record on the mechanism | `architecture/system-architecture.md` lines 213 and 234 (name `x-query-params` and `[trpc].ts`), `architecture/website.md`; sweep `verification/fix-trpc-batch-limit/scoping/sweep.md` | cited by the determination; see Diagnosis § Architecture record |

## Diagnosis

### Item 1 — batch calls

- **Cause.** `createNextApiHandler` at `[trpc].ts:8` passes no `allowBatching`. Installed `@trpc/server` 11.10.0
  (`node -p "require('@trpc/server/package.json').version"`) sets `allowBatching` to `true` when the option is absent
  (`dist/resolveResponse-BsnbAhRr.cjs:1856`) and splits a `batch=1` path on commas into as many calls (`:76-77`), with no count check.
  With `allowBatching: false` the batch is refused at `:1904` ("Batching is not enabled on the server", `BAD_REQUEST`). That check runs
  before any procedure resolves, and `createContext` is called lazily (`:1880-1893`).
- **Instrument.** The red test `src/pages/api/trpc/__tests__/trpc.batch-refusal.test.ts`, run against `d1bb9b0`: a 2-call and a
  500-call batch to the real handler over a real HTTP socket are answered 200, and the database is queried
  (`verification/fix-trpc-batch-limit/fixer/red-d1bb9b0.log`).
- **The site's links.** `@trpc/client` 11.10.0 adds `batch=1` only when the operation carries `inputs`
  (`dist/httpUtils-CjSUiDDG.cjs:47`); `httpLink` passes `input` (`dist/httpLink-ldcEDSeb.cjs:23-42`). All three site links are
  `httpLink` (`src/utils/api.ts:31`, `:46`, `src/providers/TrpcProvider.tsx:19`). A grep of `src` outside `__tests__` for
  `httpBatchLink|httpBatchStreamLink|unstable_httpBatch|splitLink|batch=1` exits 1 (no hit). So no site link sends a batch, and
  `allowBatching: false` is the fix the statement names, not a path count.
- **Measurement limit.** A 1000-call URL is refused by Node with 431 before tRPC sees it, both at base and at the fix (first red
  run, superseded). That is why the test uses 500.

### Item 2 — `x-pathname`, `x-query-params`

- **Cause.** The matcher `['/message/(.*)', '/api/guilds/(.*)', '/preview']` does not match a bare `/message`. On that path the
  middleware never runs, so a client-sent `x-pathname` reaches the page unchanged.
- **Instrument.** `unstable_doesMiddlewareMatch` from `next/experimental/testing/server` (Next 16.4.6, which calls the build's own
  `getMiddlewareMatchers`) over the base config: `/message` false, `/message?guild_id=1` false, `/message/` true,
  `/message/m/0/edit` true, `/message/f/1` true, `/messages` false. The red test
  `src/__tests__/middleware.request-headers.test.ts` at `d1bb9b0` confirms it: the page at `/message` sees the client's
  `/message/m/0/edit`.
- **Premise correction: `Server.tsx` is not mounted.** The determination says the component "is mounted under
  `src/app/message/layout.tsx`". The layout mounts `Redirects` (`_navigation/Redirects/index.tsx`), and there `<Server />` has been
  commented out since `4fe53b6` (2023-08-22, `git log -L5,6`). Only `Client.tsx` renders. A grep of `src` for importers of
  `Redirects/Server` or `./Server` finds one, its own test (`Server.session-cookie-redirect.test.ts:5`). So in production the
  `x-pathname` read decides nothing today. The fix still closes the hole the statement names: any message page that reads the header
  gets the middleware's value. Deleting or re-mounting `Server.tsx` is outside this scope and is not done.
- **Consumers of the resolved value** (the `x-pathname` a message page receives): `Server.tsx:5`, whose two raw comparisons are at
  `:11` (`!== '/message/m/0/edit'`, `!== '/message/m/0/send'`). Neither path is bare `/message`, so neither guard's outcome changes
  for paths the old matcher covered. The grep for `x-pathname` over `src` finds no other reader.
- **`x-query-params`.** The only write is `middleware.ts:16-21` (at `d1bb9b0`). The only reads are in
  `src/app/_components/__tests__/Providers.request-headers.test.ts:36,45`; the grep over `src` finds no production read.
  `Providers.tsx` reads only `cookie` (`:32-33`).
- **Base vs fix.** The middleware now also runs on bare `/message`. There it sets `x-pathname` and does nothing else. This behaviour
  is new in the fix. It is the change the statement names, not a regression.

### Item 3 — `overrides`

- **Cause.** `package.json:138-140` (at `d1bb9b0`) declares top-level `overrides`. pnpm 10.28.2 (`pnpm --version`) does not read
  that key (sweep P3), and `pnpm-lock.yaml` has no `overrides:` section. The key does nothing.
- **Instrument.** `pnpm install --lockfile-only --frozen-lockfile` after the deletion exits 0, and `git diff --quiet --
  pnpm-lock.yaml` exits 0: the lockfile is unchanged and still satisfies the manifest
  (`verification/fix-trpc-batch-limit/fixer/pnpm-lockfile-check.log`). No pin moved, so there is nothing to disposition.

### Residue in production

- Item 1: a batch that ran before release ran ordinary procedure calls, so there is no residue. After release, any external caller
  that batches gets 400. The determination knows of none (the public API is `/api/v1`, read from code).
- Item 2: no state. The header only lives for one request, and the one reader is not mounted.
- Item 3: none. The key had no effect.
- The release form (Vercel deploys `master`) carries the whole change in one deploy. Deploy consequence: devops's to establish.

### Origin-Chain

`git log -L` over the faulty lines: `[trpc].ts:8-19` from `3efcc5d` (2023-02-28); matcher `middleware.ts:6` from `4fe53b6` /
`3468587` / `f0f427b` (2023); `x-query-params` write `:16-21` from `f0f427b` (2023-05-11); `package.json:138-140` from `4fe53b6` /
`30574bc` (2022). All of these predate the pipeline, so `none`.

### Architecture record

`architecture/system-architecture.md` line 234 (read 2026-11-21) states the old matcher and the unread `x-query-params` write; this fix
changes both. Line 213, the "Access refusals" row, names `[trpc].ts` only for its development-only `onError` logging, which this fix
does not change. The change goes to the architect as one
`agent-output/INBOX.md` entry ("2026-11-21 — fixer-fix-trpc-batch-limit — FYI"), appended and left uncommitted, as the inbox rule
requires.

## Change

- `src/pages/api/trpc/[trpc].ts` — `allowBatching: false` (+1).
- `src/middleware.ts` — matcher gains `'/message'`; the `x-query-params` block is removed (+1 −8).
- `package.json` — top-level `overrides` removed (−3).
- `src/app/_components/__tests__/Providers.request-headers.test.ts` — deleted (−51). It held 4 cases, all of them reads of a
  client-sent `x-query-params`: 2 asserted the providers render for a malformed value, and 2 asserted the providers make no request
  for a `code` value. They specified that `Providers` ignores the header. With the header's only writer gone, the ruling removes the
  test reads of it.
- `src/pages/api/trpc/__tests__/trpc.batch-refusal.test.ts` — new (+77).
- `src/__tests__/middleware.request-headers.test.ts` — new (+43).

Commit `3d2ceec` on `chain/fix-trpc-batch-limit`. Production lines added: **2**, from the added column of
`git diff --numstat d1bb9b0..3d2ceec` over the production paths (`[trpc].ts` 1, `middleware.ts` 1; `package.json` is a manifest,
with 0 added).

## Test

Both test files are spec-form: no escaped-defect artefact earns a bug-form test (Test Conventions axiom B).

- **Red run** at `d1bb9b0` with the final test files, in a detached `git worktree` export under the session scratchpad
  (`node_modules` symlinked from the website). `npx vitest run` of the two files gives 5 failed, 3 passed, exit 1, and no unhandled
  errors (`fixer/red-d1bb9b0.log`). The failures are: 2-call batch → 200; 500-call batch → 200; `/message` and
  `/message?guild_id=123` → `x-pathname` `/message/m/0/edit` (the client's value); query-string request → `x-query-params` present.
- **Green run** in the same export with the fix applied: 8 passed, exit 0 (`fixer/green-fix-export.log`). In the shared tree at
  `3d2ceec`: 8 passed, exit 0 (`fixer/green-new-tests.log`).
- **Negative controls** for the 3 cases that pass at the red run, run in the export over the fix (diffs committed beside the logs):
  - `answers a single call` (the site's `proxy`, `api.ts:46`): switching that link to `httpBatchLink`
    (`fixer/control-site-link-batching.diff`) makes the case fail with "Batching is not enabled on the server"; 1 failed, exit 1
    (`fixer/control-site-link-batching.log`). This shows the test detects a site link that batches.
  - `/message/m/1/edit` and `/message/f/123`: deleting `requestHeaders.set('x-pathname', …)` (`fixer/control-middleware-no-pathname.diff`)
    fails all four `x-pathname` cases; 4 failed, exit 1 (`fixer/control-middleware-no-pathname.log`).
  - The values the diff chooses are `allowBatching: false` (from true/false) and the `'/message'` matcher entry. The red run at base is
    the control for each: true is the default there, and the entry is absent.
- **Invented values, named.** The batch test's session comes from a mock of `~/server/auth`, and its database is the
  `capturingDatabase` helper (the siblings' pattern, `user.save-limits.test.ts`). The real reader of the request is a Node `http`
  server that sets `req.query` the way Next's pages router does: `{...searchParams, trpc: <path segment>}`. If that transcription were
  false, the 200 at the red run and the site link's 200 at green would both fail, so the falsity would show. The middleware test's page
  side transcribes how Next merges headers (`next/dist/server/lib/router-utils/resolve-routes.js:415-434`: a truthy
  `x-middleware-override-headers`, names split on `,` and trimmed, values read from `x-middleware-request-<name>`). If that
  transcription were false, the `/message/m/1/edit` case would read a value other than the path, which control 2 shows the test can
  detect.
- **Instrument defect found and fixed in the round.** The first form of the merge helper tested `overridden === null`, and under
  control 2 an empty override list (`''`) threw `Headers.set: "" is an invalid header name`. Next treats `''` as no override
  (truthiness at `:415`). The helper now matches that, and the control and the red and green runs were re-captured with the
  corrected file.
- **Declined work.** A refused batch is not deferred or queued. It is answered 400, and none of its calls run. A caller re-issues each
  call as its own request, which is what every site link already does. The test follows that path with `answers a single call`;
  control 1 is the tree in which the site's link batches, and there that call is refused.
- **Item 3** has no behaviour to make red. pnpm never read the key, so deleting it changes neither resolution nor the lockfile (the
  frozen-lockfile check above). No test can tell the two manifests apart.
- No time-based test. No lifetime is added (no ledger entry, lock, listener or timer), so there is no exit table. No irreversible
  action is added.

## Verification

| Check | Command | Result | Capture (`verification/fix-trpc-batch-limit/fixer/`) |
|---|---|---|---|
| Existing suite, base | `npx vitest run --reporter=json` at `d1bb9b0` | 154 files, 2261 cases, 2261 passed, exit 0 | `suite-base-d1bb9b0.{json,log,exit}` |
| Suite at fix | same, at `3d2ceec` | 155 files, 2265 cases, 2265 passed, exit 0 | `suite-3d2ceec.{json,log,exit}` |
| Path membership | `testResults` path sets compared | only base: `Providers.request-headers.test.ts`; only fix: the two new files | — |
| Build verification | `pnpm run typecheck` (both tsc programs) at `3d2ceec` | exit 0 | `typecheck-3d2ceec.log` |
| Lint, changed files | `npx eslint --max-warnings=0` over the four changed `.ts` files | exit 0 | `lint-changed.log` |
| Lint, whole tree | `eslint --max-warnings=0` over the tracked and untracked-unignored source files that exist (`lint-files.z`) | 783 problems (434 errors, 349 warnings), none in a file this change touches (`grep -c` of the four paths: 0); not compared with a base run | `lint-tree-3d2ceec.log` |
| Conventions | `node ~/.claude/tools/convention-check.js … --since=d1bb9b0` | 0 FAIL, 0 CANDIDATE, 20 SKIP | `convention-check.log` |
| Lockfile | `pnpm install --lockfile-only --frozen-lockfile` (pnpm 10.28.2); `git diff --quiet -- pnpm-lock.yaml` | exit 0; unchanged | `pnpm-lockfile-check.log` |
| `pnpm audit --prod` | at the fix tree | `semver` hits: 0 (`grep -ci`); 84 found (8 low · 22 moderate · 50 high · 4 critical), equal to the base metadata in `verification/018/security/out/pnpm-audit-prod-d1bb9b0-disposition-summary.txt` | `pnpm-audit-prod-fix.log` |

The convention check's SKIPs, dispositioned:
- `package.json` is not examined (`.json`).
- The deleted test file is not examined (missing).
- 17 `.playwright-mcp/*.png` files are outside the change and untracked.
- The ID-token and basename check "did not run". It was run by hand: both new basenames match the positive form (`grep -cE`: 1
  each); the ID-token class over both files gives 0 (`grep -ciE`); neither file has a comment line (`grep -c '^\s*//\|/\*'`: 0 each).

The repository's `lint` script is `eslint --fix .`. It was not run as written, because `--fix` over `.` would rewrite files in the
shared tree. `.` also reaches the ignored, untracked `.archive/`, which gives parse errors.

**Gate satisfied (disclosed in the round).** The changed-files lint failed `import/order` twice on the new batch test. Fixed by
`npx eslint --fix` on that one file; the two new test files were then re-run green (8 passed, exit 0).

## User-visible flows

For the owner's own check after deploy (no UAT stage runs):
- Opening the message list at `/message`, signed in and signed out.
- Following a link to `/message?guild_id=<id>`, which should still land on that server's messages.
- Opening, editing and saving a message under `/message/m/…`, and the server view `/message/f/<id>`: every tRPC call the pages make
  should still succeed.

## Handoff

- SHA `3d2ceec` (website, `chain/fix-trpc-batch-limit`).
- Review: `code-reviewer-fix-trpc-batch-limit`. With 2 added production lines (fewer than 20) there is no QA Phase 2, and the
  reviewer also runs the suite and the red test (determination block).
- Merge: devops, to website `master`. Vercel deploys `master` to production, so the push needs the owner's word, asked by devops in
  its own session.

### Process record

- **Index touch.** `git rm` of the provider test staged its deletion, and `git restore --staged` cleared it at once in the same
  command line. For that moment the shared index held a staged deletion. `git diff --cached --quiet` read 0 afterwards. The commit
  took the deletion by `--only`.
- **Export.** A `git worktree add --detach` at `d1bb9b0` under the session scratchpad was used for the red run and the controls. It
  was removed with `git worktree remove --force`; `git worktree list` shows the main tree only, and `ls -d` of the path fails.
- **Superseded first red run.** The first red run of the batch test, before the `pusher`, `@vercel/functions` and `~/utils/redis`
  mocks, left an unhandled ioredis rejection (port `NaN` from the mocked env). It is superseded by `red-d1bb9b0.log`. The two
early per-file red logs (`fixer/red-batch-refusal-d1bb9b0.log`, `fixer/red-middleware-request-headers-d1bb9b0.log`) were taken in the
shared tree before any source edit, with earlier forms of the tests. They are kept as the first sighting only; the red run of record is
`red-d1bb9b0.log`.

## Code review Round 1 — CR-1 response

The review is `code-review/fix-trpc-batch-limit-code-review.md` (record `6e9821b`), REJECTED at `3d2ceec`. CR-1 MEDIUM: the rule
that no site link batches was asserted only on `proxy` (`api.ts:46`), which nothing in production calls, while the link production
uses (`TrpcProvider`) had no assertion. The finding is accepted. My earlier `answers a single call` case and its title claimed coverage
the test did not give.

**Remedy: Minimum, inside the write set.** The Preferred remedy touches `src/utils/api.ts` and `TrpcProvider.tsx`, which are outside
the write set; whether it enters scope is steering's ruling, put to steering by the reviewer. Commit `f47e304` (test-only; production
lines unchanged at 2):
- New `src/pages/api/trpc/__tests__/trpc.site-link.test.tsx` (DOM project, `mountDom`/`unmountDom` from
  `~/components/__tests__/helpers/dom`). It mounts the real `TrpcProvider` around a component calling
  `api.user.getPreferences.useQuery()`. The real `[trpc]` handler runs behind a Node `http` server, which records each request's
  URL and final status. The assertion is on the first recorded request: path `user.getPreferences`, no `batch` parameter, and
  status 200. It does not wait for the hook to settle, so react-query's retries cannot turn a failure into a timeout.
  The request reaching the server through an `api.*` hook confirms, by execution, the reviewer's reading that those hooks use
  `TrpcProvider`'s client.
- `trpc.batch-refusal.test.ts`: the `proxy` case ("the site's own link → answers a single call") and its `PORT` env stub are removed.
  Production does not call `proxy`, so its case had no merit of its own.
- **Invented values, named.** jsdom makes `getBaseUrl()` return `''`, so the provider fetches the relative `/api/trpc/…`. The test's
  `fetch` stub resolves that against the harness origin, as a browser resolves it against the page. If that were false, no request
  would reach the server and `vi.waitFor` would fail on `expected 0 to be greater than 0`. The server modules run in the DOM
  project, where `~/utils/discord` throws on `window`; it is mocked (`getApi: vi.fn()`) beside the siblings' redis and pusher mocks.
  `user.getPreferences` does not reach it.
- **In-round corrections.** The first export run failed with `expected 0 to be greater than 0`: the handler module loaded cold inside
  the request and took longer than `vi.waitFor`'s 1 s default. The handler is now imported in `beforeAll`. An interim
  `{ timeout: 3000 }` on the wait was flagged by convention-check as a wall-clock CANDIDATE and was removed; the default wait passed
  3 of 3 runs. Lint (`no-base-to-string`, `function-component-definition`) was fixed by typing the stub's input as `string | URL` and
  making the component an arrow function.

**Control (the reviewer's falsity signature).** In a detached export at `f47e304`, `TrpcProvider`'s link was switched to
`httpBatchLink` (`fixer/round1/control-provider-httpBatchLink.diff`). The case fails on an assertion, `expected true to be false`
(the `batch` parameter is present), in 78 ms, not as a timeout. With `httpBatchStreamLink` it fails the same way in 80 ms. Logs:
`fixer/round1/control-provider-*.log`. Green in the same export: 3 passed, exit 0 (`green-export-f47e304.log`). The case passes at
`d1bb9b0` too, because the base link does not batch, so these controls are its evidence.

**Verification at `f47e304`** (`verification/fix-trpc-batch-limit/fixer/round1/`):
- Suite: 156 files, 2265 cases, 2265 passed, exit 0 (`suite-f47e304.*`). That is +1 file and the same case count, since the `proxy`
  case went out and one new case came in.
- `pnpm run typecheck`: exit 0.
- `eslint --max-warnings=0` over both trpc test files: exit 0.
- `convention-check --since=3d2ceec`: 0 FAIL, 0 CANDIDATE. Its ID-token/basename SKIP was run by hand: the basename matches the
  positive form (`grep -cE` 1), the ID-token class gives 0, and there are 0 comment lines.

Exports `wt2` (at `3d2ceec`) and `wt3` (at `f47e304`) were removed with `git worktree remove --force`; `git worktree list` shows only
the main tree.

## Build-break fix round — the tests move out of `src/pages/api/`

Source: devops found the break (`deployment/fix-trpc-batch-limit-deployment.md`, record `1320e9b`). `next build` exits 1 at `f47e304`:
Next builds every file under `src/pages/api/` as an API route, and the two test files there "do not satisfy the constraint
'ApiRouteConfig'". The ruling is steering's (a), `steering/fix-trpc-batch-limit-rulings.md` block "2026-11-21T00:32Z" (commit
`c12a6c2`): move both files to `src/server/api/__tests__/`, the placement 017's X-13 used. The code review's sub-entry 2 (record
`58574af`) requires the same.

**My miss.** Neither my Verification nor my Round 1 table had a `next build` row. Typecheck and the suite never read
`.next/types/validator.ts`, so they could not see the break. 017 had already recorded the hazard (X-13), and I did not read it.

**Change, commit `76da25c`** (test-only; production lines unchanged at 2):
- `trpc.batch-refusal.test.ts` and `trpc.site-link.test.tsx` move from `src/pages/api/trpc/__tests__/` to
  `src/server/api/__tests__/`. Their basenames are unchanged. The handler import `'../[trpc]'` becomes `'~/pages/api/trpc/[trpc]'`:
  1 line in the first file, 2 in the second.
- `src/pages/api/trpc/__tests__/` is removed. `git ls-tree -r --name-only 76da25c -- src/pages | grep -c __tests__` gives 0.

**Verification at `76da25c`** (`verification/fix-trpc-batch-limit/fixer/round2/`):
- **`next build`**, as devops ran it: a `git archive` export with no `.env`; `pnpm install --frozen-lockfile` exit 0 (pnpm 10.28.2);
  `SKIP_ENV_VALIDATION=1 pnpm run build` exit 0. The route table lists `/api/trpc/[trpc]` and no test file
  (`build-install-76da25c.txt`, `build-76da25c.txt`). The export was then removed.
- Moved tests in that export: 3 passed, exit 0 (`green-export-76da25c.log`).
- **Controls re-run on the moved files**, in the same export:
  - With `TrpcProvider`'s link switched to `httpBatchLink` (round 1's diff), the provider case fails with `expected true to be
    false` in 77 ms (`control-provider-httpBatchLink.log`).
  - With `allowBatching: false` deleted from `[trpc].ts`, both batch cases fail with `expected 200 to be 400`, 2 failed and exit 1
    (`control-no-allowBatching.log`).
- Suite in the shared tree: 156 files, 2265 cases, 2265 passed, exit 0 (`suite-76da25c.*`).
- `pnpm run typecheck`: exit 0 (`typecheck-76da25c.log`).
- `eslint --max-warnings=0` over both moved files: exit 0 (`lint-changed.log`).
- `convention-check --since=f47e304`: 0 FAIL, 0 CANDIDATE.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-21T00:07 | fixer | Document created; fix committed at `3d2ceec`; handoff to code review |
| 2026-11-21T00:25 | fixer | Code review Round 1 CR-1 (REJECTED at `3d2ceec`): Minimum remedy at `f47e304`, the provider-link case and its control; `Handoff-At` moved to `f47e304`; re-handoff to code review |
| 2026-11-21T00:35 | fixer | Build-break fix round (steering 00:32Z ruling (a)): both tRPC endpoint tests moved to `src/server/api/__tests__/` at `76da25c`; `next build` exit 0 in an export; controls re-run; `Handoff-At` moved to `76da25c`; re-handoff to code review |
| 2026-11-21T00:40 | devops | Document closed | Status: Committed at `76da25c` (code review APPROVED at `76da25c`, record `1dc6670`; deployment record `deployment/fix-trpc-batch-limit-deployment.md`) |
