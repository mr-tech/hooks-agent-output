---
ID: n/a
Origin: fix-message-page-header-decode
UUID: c8a9f0ca
Status: Released
Status-Detail: "Released: website master moved 983681c to 7923a1d at 2026-11-20T02:34:40Z on the owner's release approval (deployment/closed/fix-message-page-header-decode-deployment.md). Post-deploy row P-1 and the observation on middleware.ts:17-21: carriers named in the Stage 1 row below."
Handoff-At: 7923a1d — repos=website
Origin-Chain: none
---

# Fix — the message-page providers no longer decode a client-sent header (fix-message-page-header-decode)

## Scope statement

The owner's words, from the rulings file `steering/website-deps-review-rulings.md`:
- **Block "2026-11-20T01:59Z"**, Q "H-001 fix", chosen option: "Steering opens a small fixer chain on website: change the one function
  so the header is no longer decoded by the library, plus a lockfile override of decode-uri-component to 0.5.1 or later." For Q "Unused
  deps": remove them in H-001's chain.
- **Block "2026-11-20T02:03Z"**, chosen option: "The fixer removes sanitize-html with its @types/sanitize-html companion and the direct
  sharp, keeps form-data, and shows a production build plus the suite passing. If the build shows Next.js needs the direct sharp, the
  fixer keeps it and says so."

Route: brief `steering/fix-message-page-header-decode-brief-fixer.md` → common part `…-brief-common.md` → the determination in block
"2026-11-20T02:03Z". The scope covers sweep rows S1/S2 (`Providers.tsx` `getMessage`), the decode-uri-component ≥0.5.1 override (or its
absence), and removing `sanitize-html`, `@types/sanitize-html` and the direct `sharp`. It does not cover S3 (`middleware.ts`), S4–S6 or
S12–S17.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/website-deps-review-rulings.md`, block "2026-11-20T02:03Z" (read whole), relayed by the brief `steering/fix-message-page-header-decode-brief-fixer.md` |
| 2 | Bounded scope statement | Above. Property: a value the browser sends is decoded on the server through an outdated parsing dependency (decode-uri-component 0.4.1 via query-string). Region swept: `verification/fix-message-page-header-decode/scoping/sweep.md` (`d24b6c2`), S1–S28 at website `983681c`. |
| 3 | Fix branch | website `chain/fix-message-page-header-decode` at `983681c` at start (`git branch --show-current`, `git rev-parse HEAD` = `983681ca…`) |
| 4 | Record on the mechanism | Sweep §5: `architecture/closed/017-existing-items-backlog-architecture-findings.md:34` names the file only. `architecture/system-architecture.md` has no mechanism statement. `research/` has no hit. The record says nothing about `x-query-params` or the decode. |

## Diagnosis

- **Cause.** `src/app/_components/Providers.tsx:32-40` (at `983681c`) ran `queryString.parse(decodeURIComponent(hdrs.get('x-query-params')))`
  for every `/message/...` render, and used `.code` to fetch `/api/messages/codes/<code>`. `middleware.ts:12` copies every incoming
  header, and it sets `x-query-params` only when the URL has a `?` (`:17-21`). So, with no URL query, a header the browser sends reaches
  the decoder unchanged.
  **Instrument:** the red test below, which drives the composed entry point (`Providers`) with that header and no URL. Its output: a
  malformed value rejects with `URIError: URI malformed`, which crashes the `/message` layout. A `code=` value makes one server-side
  request to a path built from the client's value (`expected [ Array(1) ] to deeply equal []`).
- **What the path did for users: nothing.** The `getMessage` promise's result is discarded (`const [session] = await Promise.all([...])`).
  `/api/messages/codes/[code].ts` → `messageStore.retrieve` (`src/utils/redis/messageStore.ts:46-50`) is a Redis `GET` with no write.
  The share-code load users see runs in the browser: `src/providers/MessageProvider/index.tsx:139-144` reads `searchParams.get('code')`
  and calls tRPC `message.getFromCode`. This was read from the code, not run. So the fix removes the path; it does not reroute it.
- **Consumers of the value.** `x-query-params` is read only at `Providers.tsx:46` (sweep S13, which also covered tests). After the fix,
  nothing reads it. `middleware.ts:20` still sets it. That write is now dead, but it is harmless, and S3 is out of scope, so I left it
  (see Handoff, observations).
- **Base vs fix, share-code load.** The base loads the code twice: a discarded server fetch, then the client tRPC query. The fix keeps
  the client query only. No behaviour the base had is lost.
- **Residue in production.** None. The path writes nothing: the code fetch is a read, and the crash fails the render. A Vercel deploy
  replaces the function, so every later request runs the fixed code. Live check: steering's planned post-deploy confirmation (b), by an
  agent, with a harmless request.
- **Origin-Chain.** `git log -L32,40:src/app/_components/Providers.tsx 983681c`: the lines date from `3468587` (2023-05-30), `4fe53b6`
  (2023-08-22) and `d4b0bf4` (2026-02-27). None of these is a chain commit, so `none`.
- **Irreversible side effects added:** none. **Lifetimes added:** none. **Declined work:** none.

## Change

- `src/app/_components/Providers.tsx`: removed `getMessage`, the `query-string` import and the `x-query-params` read. The session is now
  awaited alone (+1 / −15).
- `src/app/_components/__tests__/Providers.request-headers.test.ts`: new spec-form test (+51).
- `package.json`: removed `query-string`, `sanitize-html`, `sharp` (dependencies) and `@types/sanitize-html` (devDependencies) (−4).
- `pnpm-lock.yaml`: `pnpm remove query-string sanitize-html @types/sanitize-html sharp` under pnpm 10.28.2 (−338, +0).

**Production lines added: 1** (`git diff --numstat 983681c 7923a1d`: `Providers.tsx` 1 added; `package.json` and the lockfile 0 added).
That is under 20, so no QA Phase 2 runs.

### Dependencies

- **decode-uri-component: absent.** `grep -c decode-uri-component pnpm-lock.yaml` at `7923a1d` gives `0` (at base: `3`). I added no
  override. Route (a) left `query-string` unused (`git grep -n -E "query-string|queryString" -- src bot`, excluding tests: only
  `middleware.ts`'s local variable `queryString`). Removing it removes its only dependent, so there is nothing for an override to pin.
  The owner's option named an override; it became moot, which hazard 2 anticipated. The npm-style `overrides` key (`semver`) is
  untouched, and whether pnpm 10 honours it is still untested.
- **Lockfile diff, every moved pin.** `verification/…/lockfile-keys-diff.txt` compares the `packages:` and `snapshots:` keys of the base
  and fix lockfiles. Result: 43 removed from each section, **0 added, 0 version changes**, and `git diff --numstat` shows 0 added lines.
  - The 43 removed are the four direct packages plus their exclusive subtrees: query-string's `decode-uri-component`, `filter-obj` and
    `split-on-first`; sanitize-html's `htmlparser2`/`dom*`/`entities`/`deepmerge`/`parse-srcset`; and sharp 0.32.6's `prebuild-install`,
    `tar-fs`, `color` and their dependencies.
  - Disposition: each one leaves with the removed package. No unrelated pin moved.
- **sharp: removed; Next.js does not need the direct copy.** `next build` exits 0 without it. Next's own `sharp@0.34.5` is still in the
  lockfile (lines 5975, 13923). `require.resolve('sharp')` from Next's package directory resolves
  `node_modules/.pnpm/sharp@0.34.5/…` (`next-sharp-resolve.txt`).
  - Not checked: which copy Vercel's runtime loads for `/_next/image`. The sweep's "not covered" applies, and steering's confirmation
    (a) covers it.
- **form-data:** kept, as ruled.
- **Install under the deploy host's package-manager major:** `packageManager` is `pnpm@10.28.2`, and the install ran under 10.28.2.
  `pnpm install --frozen-lockfile`, exit 0, "Lockfile is up to date" (`pnpm-frozen-install.txt`).

## Test

Spec-form: `src/app/_components/__tests__/Providers.request-headers.test.ts`, "the message-page providers given a client-sent
x-query-params header". It calls `Providers` (the composed server component that `/message/layout.tsx` mounts) with `next/headers`
mocked to give only that header (no cookie, no URL query). `fetch` is stubbed.
- `render for a truncated percent escape` (`%E0%A4%A`) / `a bare percent sign` (`100%`): `Providers(...)` resolves.
- `make no request from a plain code` (`code%3Dabc`) / `a code holding a path` (`code%3D..%252Fauth%252Fsession`): no `fetch` call.

**Red run** at `983681c` + the test (production unchanged):
`npx vitest run src/app/_components/__tests__/Providers.request-headers.test.ts`, exit 1. All 4 failed: two with `promise rejected
"URIError: URI malformed"`, two with `expected [ Array(1) ] to deeply equal []` (`verification/…/red-run.txt`).

**Green run** after the change: same command, exit 0, 4 passed (`green-run.txt`).

**Negative controls:** none owed. Every case was red at the red run. The diff adds no guard clause and no call-site value choice; it only
deletes.

**Invented values (Iron Law 5):**
- The header comes from a mocked `next/headers` `headers()`, not from a real request through `middleware.ts`. If the mock were false
  (Next or Vercel strips or rewrites a client-sent `x-query-params` before the server component), the defect would not reach production.
  The fix is still correct then, and confirmation (b) settles it.
- `fetch` is stubbed. It is only counted, never read.

## Verification

- **Existing suite**, `npx vitest run --reporter=json`:
  - Base (`983681c` + the new test): 149 files, 1913 cases, 1909 passed, 4 failed (only the new red cases), exit 1 (`suite-base.json`).
  - Fix (`7923a1d` tree): 149 files, 1913 cases, 1913 passed, **exit 0** (`suite-fix.json`).
  - The file set is identical by path (compared by sorted `testResults[].name`).
- **Typecheck**, `pnpm run typecheck` (both programs): exit 0 (`typecheck.txt`).
- **Production build**, `pnpm run build` (`next build`): **exit 0** (`next-build.txt`). It ran on this box with `.env.local` present but
  not read, and made no request to production. No save ran, so the local-build id rule was not engaged.
- **Lint:** `npx eslint --max-warnings=0` over the two changed source files: exit 0 (`eslint-changed.txt`, empty).
  - I did not use the repo's `lint` script, because it runs `--fix` over the whole tree. This follows `fix-personal-message-access`'s
    precedent.
  - Whole tree: `npx eslint . --max-warnings=0` exits 1, with 667 problems, none in a changed file. The per-directory tally covers
    `src/components`, `src/utils`, `src/app`, and others (`eslint.txt`).
  - A base comparison in a `git archive` export of `983681c` (node_modules symlinked) did not run. ESLint exited 2 with "couldn't
    determine the plugin 'react' uniquely", even with `--resolve-plugins-relative-to` (`eslint-base.txt`). So I have not shown that the
    whole-tree count is the same as at base.
  - The removed packages appear nowhere in `eslint.txt` (`grep -c -E "sanitize|sharp|query-string"` = 0). The export was removed.
- **Convention check**, `node ~/.claude/tools/convention-check.js website --since=983681c` (`convention-check-worktree.txt`): 0 FAIL,
  0 CANDIDATE.
  - SKIP: `package.json` and `pnpm-lock.yaml` (extensions not examined), `.playwright-mcp/*.png` (another session's untracked files),
    and the ID-token basename check ("states an ID-token class this checker does not implement verbatim — the checks did not run").
  - I checked that last one by hand: `Providers.request-headers.test.ts` matches the positive form, and the basename and the titles
    carry no ID token.
- **Source comments added:** none.
- **Captures:** all under `verification/fix-message-page-header-decode/`. I renamed the run outputs from `.log` to `.txt` because the
  record's `.gitignore:21` ignores `*.log`. They are committed under the ignore rule's terms, not forced past it.

## User-visible flows

For the owner's own check (no UAT stage runs):
1. **Share-code load on `/message/...`:** open the editor with `?code=<a share code>` (e.g. from the bot's share command). The message
   from that code loads into the editor, as before. This is the client tRPC `getFromCode` path, which the change does not touch.
2. **Any `/message/...` page, signed in and signed out:** the page renders, and the signed-in session and its messages appear as before.
3. **Images:** avatars and icons drawn by `next/image` without `unoptimized` still render. The direct `sharp` is gone; Next's own copy
   remains.

## Handoff

- **SHA:** website `7923a1d` (`chain/fix-message-page-header-decode`; no upstream; not pushed).
- **Reviews:**
  - Code review, session `code-reviewer-hooks-fix-message-page-header-decode`. Under 20 production lines, the reviewer also runs the
    suite and the red test.
  - Then security on the change, `security-hooks-website-deps`.
- **Merges:** devops, to website `master`. That push deploys to production on Vercel and needs the owner's release approval.
- **Observation, not absorbed:** `middleware.ts:17-21` still sets `x-query-params`, which nothing now reads. Removing it is S3,
  out of scope, so it is left for steering to route or drop.

## Changelog

| Date | Change |
|---|---|
| 2026-11-20T02:09 | Created. Red run (4/4 failed), change, green run, dependency removal, build, suite, typecheck, lint, convention check. Fix committed at website `7923a1d`; handed off to code review. |
| 2026-11-20T02:26 | devops Stage 1: recorded committed state, website `chain/fix-message-page-header-decode` tip `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (no push, no merge to `master`). Gates read: code review APPROVED `Reviewed-At: 7923a1d9…`, security APPROVED `Reviewed-At: 7923a1d9…`; no QA or UAT in the stage set. Closed `Committed`. Carriers for what this document leaves owed: the unread `x-query-params` write in `middleware.ts:17-21` is carried at `steering/website-deps-review-rulings.md` block "2026-11-20T02:11Z"; the Assumption Not Checked on Vercel's `/_next/image` is carried by row P-1 of `handoff/message-page-header-decode-post-deploy-2026-11-20.md`. |
| 2026-11-20T02:35 | devops Phase 2D: website `master` moved `983681c` to `7923a1d` at 02:34:40Z (`git ls-remote origin refs/heads/master` read back `7923a1d9…`); the chain branch was merged and deleted (`git branch -d`). Closed `Released`. |
