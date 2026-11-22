---
ID: n/a
Origin: fix-middleware-dead-matcher
UUID: 54d67da4
Status: Committed
Status-Detail: "Committed on chain/fix-middleware-dead-matcher at website 453de76, not pushed; release to website master on the owner's approval, carried by deployment/fix-middleware-dead-matcher-deployment.md."
Handoff-At: 453de76 — repos=website
Origin-Chain: none
---

# fix-middleware-dead-matcher — implementation

## Scope statement

Route: the owner's selections of 2026-11-22T01:49 (A, remove the entry and add the matcher test) and 2026-11-22T17:15 (A, rename to
the proxy convention), determination by `steering-hooks-fixer` in `steering/fix-middleware-dead-matcher-rulings.md` block
"2026-11-22T17:15". Quoted:

> (website, from `origin/master` `3859c29`): (1) `src/middleware.ts` becomes `src/proxy.ts`, its function named `proxy` as Next's
> guide recommends, behaviour otherwise unchanged; (2) its matcher loses `/api/guilds/(.*)`; (3)
> `src/__tests__/middleware.request-headers.test.ts` becomes `src/__tests__/proxy.request-headers.test.ts`, importing the new file; (4) a
> test checks every matcher entry against the site's real pages (his 01:49 selection A).

Write set: those paths, one new test file under `src/__tests__/`, this document and `verification/fix-middleware-dead-matcher/`.
Nothing outside it was changed.

## Entry Conditions

| Condition | Value |
|---|---|
| Scoping determination | `steering/fix-middleware-dead-matcher-rulings.md` block "2026-11-22T17:15" (with "01:49" and "16:59"); brief `steering/fix-middleware-dead-matcher-brief-fixer.md` + `-brief-common.md` |
| Bounded scope statement | Quoted above; exclusions as in the block (tRPC `t.middleware`, floating-ui `middleware` options, `src/env.mjs:55`, lockfile names, Next's own `unstable_doesMiddlewareMatch` / `x-middleware-*`) |
| Fix branch | website `chain/fix-middleware-dead-matcher`, cut by steering from `3859c29`; `git branch --show-current` read at start |
| Record on the mechanism | `verification/fix-middleware-dead-matcher/scoping/sweep.md`, `.../scoping/sweep-proxy.md`; installed Next docs `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` (export forms, lines 56-66; codemod, line 789). `architecture/` passages on the older middleware are history per the determination; no stage edits `architecture/`. |

## Diagnosis

- **Dead entry.** Cause: `matcher` at base `src/middleware.ts:6` lists `/api/guilds/(.*)`; no route file sits under `/api/guilds/`
  (API routes are `src/pages/api/v1/guilds/...`). Instrument: the new matcher test at `31acb25` (red run below) — the entry matches no
  URL derived from `src/app` and `src/pages`; and the base build's `.next/server/middleware-manifest.json` registers it
  (`verification/.../middleware-manifest-base.json`). Introduced 2023-05-30 (`3468587`, `git log -S`), before the record's first chain.
- **Deprecated convention.** Cause: Next 16 (`package.json` `^16.4.6`, bump `7cc7bfc` 2026-02-27, before the record) deprecates the
  `middleware` file name. Instrument: a production `next build` of a base export prints `⚠ The "middleware" file convention is
  deprecated. Please use "proxy" instead.` once (`build-base.txt`, `grep -c` = 1); the tip export prints it 0 times (`build-tip.txt`).
- **Consumers of the changed value.** The proxy sets one request header, `x-pathname`, read only by
  `src/app/_navigation/Redirects/Server.tsx:5` (imported by `src/app/message/layout.tsx`). The tip build's matchers are `/message`,
  `/message/(.*)`, `/preview` (`functions-config-manifest-tip.json`), so every page the reader serves still gets the header; the removed
  entry reached no page, so no reader loses it.
- **Runtime placement (base vs fix).** At base the middleware is built as an edge function (`middleware-manifest-base.json`, 4 matchers +
  `/api/interactions-edge`; `functions-config-manifest-base.json` lists no `/_middleware`). At tip it is `/_middleware` with
  `"runtime": "nodejs"` (`functions-config-manifest-tip.json`). This is the change the owner's 17:15 selection accepted ("possible small
  added delay … unmeasured"); latency and Vercel region placement are not measured here.
- **Residue in production.** The middleware writes no store, cookie or response state — it only adds a request header to the request
  it forwards — so nothing carries over from the old build; a Vercel deploy of `master` replaces the function whole.

## Change

Website commits on `chain/fix-middleware-dead-matcher` from `3859c29`:

- `7062ea5` — `src/middleware.ts` → `src/proxy.ts`, default export renamed `proxy` (the guide's `export default function proxy` form);
  its four boilerplate comments dropped (comment allowlist); `src/__tests__/middleware.request-headers.test.ts` →
  `src/__tests__/proxy.request-headers.test.ts`, importing `../proxy` (2 lines changed).
- `31acb25` — new `src/__tests__/proxy.matcher-routes.test.ts`: derives one URL per route file under `src/app` (`page`/`route`) and
  `src/pages` (dynamic segments filled with `1`), and asserts each `config.matcher` entry matches at least one through
  `unstable_doesMiddlewareMatch`; plus one case that the inventory holds `/message`, `/message/m/1/edit`, `/api/v1/guilds/1/messages`.
  Enumeration mirrors `src/server/api/v1/__tests__/v1Routes.statbot-key-required.test.ts`.
- `453de76` — `src/proxy.ts` matcher loses `/api/guilds/(.*)`.

`git diff --numstat 3859c29 453de76`: `49 0 src/__tests__/proxy.matcher-routes.test.ts`; `2 2 src/__tests__/{middleware… => proxy…}`;
`0 23 src/middleware.ts`; `19 0 src/proxy.ts`. **Production lines added: 19** (`src/proxy.ts`, the only production path) — under 20,
so code review alone, per the stage set.

## Test

- **Red** (tree identical to `31acb25`): `npx vitest run src/__tests__/proxy.matcher-routes.test.ts src/__tests__/proxy.request-headers.test.ts`
  → exit 1, `1 failed | 9 passed (10)`; the one failure is `/api/guilds/(.*) matches at least one of the site's routes`,
  `expected [] to not deeply equal []` (`verification/fix-middleware-dead-matcher/red-matcher.txt`).
- **Green** (tree identical to `453de76`): same command → exit 0, `9 passed (9)` (`green-matcher.txt`).
- **Negative controls** (cases passing at red), in a `git worktree add --detach` export at `453de76`, each restored after:

| Control | Cases red | Log |
|---|---|---|
| unmutated | none (exit 0) | `control-unmutated.txt` |
| `src/app/preview/page.tsx` moved out | `/preview` entry | `control-preview-page-removed.txt` |
| `src/app/message/page.tsx` moved out | `/message` entry; inventory case | `control-message-page-removed.txt` |
| `src/app/message/f`, `src/app/message/m` moved out | `/message/(.*)` entry; inventory case | `control-message-subpages-removed.txt` |

- **Rename** (the determination's red-evidence guidance): production `next build` (`SKIP_ENV_VALIDATION=1`, no `.env*` in the exports)
  of a base export prints the deprecation line once and of a tip export zero times; both exit 0 (`build-base.txt`, `build-tip.txt`).
  The 5 moved request-header cases pass at tip, unchanged apart from the import.
- The new test reads the route file names (not file text) from the real tree; its expected value is "a non-empty match set", not
  computed from the matcher. No lifetime, declined work or irreversible action is added.

## Verification

| Check | Base `3859c29` | Tip `453de76` |
|---|---|---|
| Suite (`npx vitest run --reporter=json`, shared tree) | 2358 cases, 2358 passed, 165 files, exit 0 (`suite-base.json`) | 2362 cases, 2362 passed, 166 files, exit 0 (`suite-tip.json`, `suite-tip.exit`) |
| `pnpm run typecheck`, clean export after `next build` | exit 0 | exit 0 (`typecheck-export-*.txt`) |
| ESLint, tracked files of a clean export, `--max-warnings=0` | exit 123: 423 errors, 344 warnings, 519 files | exit 123: 423 errors, 344 warnings, 520 files; per-file identical to base, none in the changed files (`eslint-tracked-*.summary.json`) |
| `convention-check.js --since=3859c29` | — | 0 FAIL, 0 CANDIDATE; SKIPs: `src/middleware.ts` (deleted), untracked `.playwright-mcp/*.png`, and the id-token/basename check unimplemented in the checker (names checked by hand against the positive form: `proxy.request-headers`, `proxy.matcher-routes` conform) |

`pnpm run typecheck` in the shared tree exits 2 on `.next/types/validator.ts(227,39)`: a gitignored, stale generated file naming the
removed `src/pages/api/cron.js`, not a source error (`typecheck-tip.txt`); the clean exports above pass. ESLint over the shared tree
also swept the untracked `.archive/`; those runs were superseded by the export runs and not kept. Exit 123 is ESLint's error exit; its
failures predate this chain. No package-manager operation ran; `pnpm-lock.yaml` is untouched.

Not checked: a running `next dev`/`next start` request walk; Vercel's handling of the Node proxy (regions, latency); Turbopack vs
webpack on Vercel.

Process notes this round: two calls were not completed at first issue — a removal during export setup, and the first negative-control
run — and each was re-issued once (the first with literal paths, the second with its run label changed); reported to
`steering-hooks-fixer`. Exports used hard-linked copies of `node_modules` and were removed with `git worktree remove`; no process
remains (`ps`).

## User-visible flows

For the owner, after release:

- Opening the message editor (`/message`, a saved message's edit or send page, a new message) works as before, and a signed-out visitor
  is still sent to the blank editor.
- The preview page opens as before.
- Nothing else on the site changes. The build log no longer shows the "middleware is deprecated" warning.
- Possibly a slightly slower first response on those pages for distant visitors (the step now runs on Vercel's Node servers instead of
  its edge network); unmeasured.

## Handoff

- SHA: website `453de76` on `chain/fix-middleware-dead-matcher` (no upstream; not pushed).
- Reviews: `code-reviewer-fix-middleware-dead-matcher` (started by `steering-hooks-fixer` on this document's spawn cue); under 20
  production lines, the reviewer also runs the suite, typecheck and the red test (red at `31acb25`).
- Merges: devops, to website `master`, under the owner's word (Vercel deploys `master` to production).

## Changelog

| Date | Change |
|---|---|
| 2026-11-22T17:31 | Created by `fixer-fix-middleware-dead-matcher`: rename, test, entry removal at website `453de76`; handed to code review. |
| 2026-11-22T17:45 | Document closed by `devops-fix-middleware-dead-matcher` (Stage 1) | Status: Committed |
