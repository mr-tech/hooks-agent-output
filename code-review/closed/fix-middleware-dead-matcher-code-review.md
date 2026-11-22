---
ID: n/a
Origin: fix-middleware-dead-matcher
UUID: 54d67da4
Reviewed-At: 453de76187c5c368732a20d2dd8a671ed97eed4c — repos=website
Status: Committed
Status-Detail: "Round 1 APPROVED_WITH_COMMENTS at website 453de76; the work is committed on its chain branch, not pushed; CR-1 ruled outside this release (rulings block 17:40)."
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-middleware-dead-matcher

**Plan Reference**: none (fixer route; determination `steering/fix-middleware-dead-matcher-rulings.md` block "2026-11-22T17:15")
**Implementation Reference**: `agent-output/implementation/fix-middleware-dead-matcher-implementation.md` (record `2e61217`)
**Date**: 2026-11-22
**Reviewer**: `code-reviewer-fix-middleware-dead-matcher`

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T17:38 | `steering-hooks-fixer` (brief `steering/fix-middleware-dead-matcher-brief-code-reviewer.md`, arrived) | Round 1 at `Handoff-At` `453de76` | Round 1: APPROVED_WITH_COMMENTS at `453de76`. 19 production lines (under 20, no QA). Red test, suite (2362/2362, exit 0) and typecheck (exit 0) re-run in exports. Proxy registered as Node with 3 matchers. Running-instance probe: base and tip identical over 288 requests. CR-1 LOW routed to steering. Evidence: `verification/fix-middleware-dead-matcher/code-review/`. |
| 2026-11-22T17:45 | `devops-fix-middleware-dead-matcher` (Stage 1) | Document closed | Status: Committed |

## Scope assessed

The criteria come from the determination's scope statement, as written when the round opened: (1) `src/middleware.ts` becomes
`src/proxy.ts` with its function named `proxy` and its behaviour otherwise unchanged; (2) the matcher loses `/api/guilds/(.*)`; (3) the
header test moves to `src/__tests__/proxy.request-headers.test.ts`; (4) a test checks every matcher entry against the site's real
pages. Tree: website `453de76`, re-read with `git rev-parse` at the start and end of the round (unchanged). Files: every path in
`git diff --numstat 3859c29 453de76`, read through `git show 453de76:<path>`.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (present: `ls -d` in the workspace and
`git -C agent-output ls-files`, both resolved against `/usr/local/bin/hooks/agent-output`)
**Alignment Status**: ALIGNED

Problem Areas row "`middleware.ts` uses a deprecated file convention" prescribes this fix: "rename to `proxy.ts`". The row's other
half, dropping the unread `x-query-params` write, was already done at base `3859c29`. The determination treats the row's text about
the old middleware as history, and steering lodges the architecture entry at closure.

## Hazards re-derived

| # | Hazard (common brief) | Re-derivation | Holds |
|---|---|---|---|
| 1 | The proxy runs on Node, and the file sets no `runtime` | `git show 453de76:src/proxy.ts`: no `runtime` export. The tip build's `functions-config-manifest.json` has `/_middleware` with `"runtime": "nodejs"`, and `middleware-manifest.json` has no edge middleware. Base: edge, 4 matchers. | Yes, locally. Vercel's placement and latency are not measured (Assumption Not Checked). |
| 2 | No `middleware.*` convention file is left | `git ls-tree -r --name-only 453de76` filtered to `(middleware\|proxy)\.[jt]sx?$`: `src/proxy.ts` only. `check-proxy-registered.py` checks root and `src/` for `.ts/.tsx/.js/.jsx/.mjs`: PASS at tip; base fails (positive control) | Yes |
| 3 | The `x-pathname` pages `/message`, `/message/*`, `/preview` still receive it | `/message` and `/message/*` receive it (probe below). **`/preview` has no reader**: `git grep -n x-pathname 453de76` finds one production reader, `src/app/_navigation/Redirects/Server.tsx`, which only `src/app/message/layout.tsx` imports. The premise is corrected in CR-1. | Partly (CR-1) |
| 4 | Removing `/api/guilds/(.*)` changes no status code | The probe at both trees: `/api/guilds/1/x` 404 and `/api/v1/guilds/1/messages` 401, identical | Yes |

## Production-line count

The GLOSSARY "Production line" definition counts the added column of `git diff --numstat 3859c29..453de76` over production paths. The
only production path is `src/proxy.ts`, with **19** added lines (`numstat.txt`; `-M` gives the same result, `numstat-M.txt`).
`src/middleware.ts` adds 0. The two test paths are not production. The count is under 20, so review alone applies, and this round also ran
the suite, typecheck and the red test.

## TDD Compliance Check

**TDD Table Present**: The fixer route uses a Test section with negative controls instead of a table (`fixer.md` "TDD for the fix"). That section is present.
**All Rows Complete**: Yes. Each added case that passes at the red tree has a control that turns it red: `/preview`, `/message`,
`/message/(.*)`, and the inventory case (implementation document § Test).
**Concerns**: None blocking.

- **Red, re-run** (`31acb25` export): exit 1, `1 failed | 9 passed (10)`. The failing case is `/api/guilds/(.*) matches at least one
  of the site's routes`, `expected [] to not deeply equal []` (`red-at-31acb25.txt`). **Green** (`453de76`): exit 0, `9 passed (9)`.
- **Suite** (`453de76` export, memory-capped): exit 0. 2362 total, 2362 passed, 166 `testResults` entries (`suite-tip.json`). This
  reproduces the fixer's figures.
- **Typecheck**: exit 0 at tip and at base after `next build`. Before any build it exits 2 on a `.png` import in `src/app/page.tsx`,
  because the image module types come from the generated `next-env.d.ts`. That is a property of an unbuilt tree, the same at both
  SHAs, and not this change's.
- **Spec-form, naming, placement**: The titles state behaviour ("every proxy matcher entry … matches at least one of the site's
  routes"). There is no bug-form test, as there should not be: the dead entry is an intra-chain finding. `proxy.matcher-routes` and
  `proxy.request-headers` fit the positive form, with no ID token. Both files sit in `src/__tests__/` beside `src/proxy.ts`. Neither is
  time-based.
- **Expectations independence**: The expected value is "non-empty". The route inventory comes from file names on disk, and matching
  goes through Next's own `unstable_doesMiddlewareMatch`. Nothing is computed from the matcher under test. The inventory case keeps an
  empty or wrong walk from passing silently.
- **Pattern claim**: The fixer says the route walk mirrors `src/server/api/v1/__tests__/v1Routes.statbot-key-required.test.ts`. It
  does: `readdirSync(…, { recursive: true, encoding: 'utf8' })` with `__tests__` and `.d.ts` excluded. A sweep of `__tests__` for
  `readdirSync|globSync|fg.sync|glob(` finds 2 walks, below the third-duplicate lifting threshold.
- **Comments**: `convention-check.js --since=3859c29`: exit 0, 0 FAIL, 0 CANDIDATE. Unchecked SKIPs: `src/middleware.ts` (deleted),
  17 untracked `.playwright-mcp/*.png` (not this chain's), and the id-token/basename check, which the checker does not implement.
  I checked the names by hand above.

## Adversarial execution

This change touches the one request-header rewrite that the signed-out redirect gate depends on. `Server.tsx` redirects a visitor with
no session cookie unless `x-pathname` is `/message/m/0/edit` or `/send`. If the header is not overwritten, a client can spoof it.
I ran `next start` on base (39101) and tip (39102) production builds. No `.env*` was present, and at module scope Redis cannot connect
(`ERR_SOCKET_BAD_PORT`), so no live store was reachable. Every request was signed out, GET or HEAD only.

- **Instrument**: `probe-x-pathname.py`, raw sockets with no client normalisation.
- **Oracle**, fixed before the run: a request counts as "redirected" if it gets a 3xx whose `Location` ends `/message/m/0/edit`, or a
  body with `NEXT_REDIRECT` naming that target.
- **Input class**: 18 targets (all six message routes, trailing slash, `//`, `%6d`, dot segments, query-smuggled path, uppercase,
  `.rsc` suffix, `/preview`, both API paths) × 8 header sets (none; `x-pathname` spoof; uppercase name; duplicate conflicting values;
  spoof + `RSC: 1`; spoof + `x-middleware-subrequest` naming `middleware`, `src/proxy`, `src/middleware`) × 2 methods.
- **Result**: 288 rows per tree, 0 differing (`probe-base.tsv`, `probe-tip.tsv`). Unspoofed, every gated GET redirects and the
  exempt pair does not. No header set turns a redirecting GET into a non-redirect, except the `RSC: 1` rows.
- **Residue**: The `RSC: 1` rows return Next's `?_rsc` cache-buster 307. Following them with `?_rsc=probe` gives 307 for spoofed and
  unspoofed requests alike, at both trees, and even on the exempt `/message/m/0/edit` (`probe-rsc-followup.tsv`). That is Next's
  router-state hash check, which runs before the gate. Requests with a valid hash were not driven. HEAD carries no body, so the oracle
  is blind to it, and HEAD results are recorded only as base = tip.

This differential also settles the "behaviour otherwise unchanged" criterion for the affected input class, with every decision
quantity (status, location, redirect) the same across trees.

## Findings

### Critical
None

### High
None

### Medium
None

### Low/Info

CR-1 LOW Round 1 — Scope neighbour: the `/preview` matcher entry runs the proxy on a route whose render reads no `x-pathname`
- **Location**: `src/proxy.ts` `config.matcher`, entry `'/preview'`, at `453de76`. Added in `4fe53b6` (2023-08-22, `git log -S`).
- **Class**: A proxy matcher entry whose matched routes include no reader of the header the proxy sets, so the proxy runs for no
  effect.
- **Enumeration**: For each `config.matcher` entry I intersected its matched routes with the routes whose layout chain imports the
  header's readers. `git grep -n "x-pathname" 453de76` finds 1 production reader (`Redirects/Server.tsx`), and
  `git grep -n "_navigation/Redirects" 453de76 -- src` finds 1 production importer (`src/app/message/layout.tsx`). Result: 3 entries,
  **1 hit** (`/preview`). The predicate cannot see a reader that reaches the header without the literal string, for example by
  forwarding all request headers. I checked the three production `headers()` sites (`IsMobileWrapper.tsx` reads `user-agent`,
  `Providers.tsx` reads `cookie`, `Server.tsx`), and none iterates.
- **Issue**: This is the neighbour of the scope statement's property. The scope statement's entry matched no route. This entry matches a
  route, but nothing on it reads the result. The new matcher test cannot see this form, because it asserts route reachability, not
  consumer reachability. The common brief's hazard 3 lists `/preview` as a page that "must still receive" the header. No reader
  makes that so, and the premise should be corrected on steering's record. Per architecture row "2023-era toolchain in
  preview-image-generator", production traffic reaches `/preview` from the image generator. Removing the entry would stop the proxy
  running there, and the effect on render or caching is unmeasured. That is why this goes to a ruling rather than an in-round fix.
- **Required Action**: Route to steering as a re-scope, since the property differs from the swept one. The tree is not held.
  - **Preferred (structural)**: Extend the matcher test so each entry must reach a route whose tree reads the header. The route →
    layout-chain → reader graph is not something the suite derives today, so this is a larger test than the class warrants.
  - **Minimum**: On a ruling to remove it, drop `'/preview'` from `config.matcher`. The falsity signature is that the matcher test's
    `/preview` case disappears and `proxy.request-headers` still passes. A `/preview` render diff between trees is owed, because the
    image generator depends on that page.

## Verdict

**Status**: APPROVED_WITH_COMMENTS
**Rationale**: All four criteria are met at `453de76`. The red test is red at `31acb25` on exactly the dead entry and green at the tip.
The suite and typecheck exit 0. The build registers `src/proxy.ts` as a Node proxy with the three intended matchers and prints no
deprecation line. A running-instance differential shows the signed-out gate and every status code unchanged over the attacked
input class.

On the severity floor: the change relies on Next discovering the renamed file, and no suite assertion fails if that is lost. The
suite cannot reach build-time discovery. `check-proxy-registered.py` is the captured assertion that does fail (positive control: base
exit 1, tip exit 0), and it is handed to devops for the release build. CR-1 is LOW and does not hold the tree.

## Required Actions

None before release. CR-1 goes to steering for a re-scope ruling.

## Assumption Not Checked

Round 1: This review assumes that Vercel's build of website `master` registers and serves `src/proxy.ts` as a Node proxy on the three
matchers, and does not test it. It was checked only with a local `next build`/`next start` of Next 16.4.6. If the assumption is false:
on the production deployment, a signed-out GET of `/message/m/0/edit` redirects to itself, because the header is absent and `Server.tsx`
redirects. Or a signed-out GET of `/message/m/1/edit` sent with `x-pathname: /message/m/0/edit` renders without a redirect, because the
spoof is honoured. Or the Vercel build log lacks `ƒ Proxy (Middleware)` or still prints the deprecation line. Owner: devops, after the
production deploy of website `master` (the release form that exercises the path). Region placement and latency are also unmeasured
there.

## Next Steps

- Devops (started by `steering-hooks-fixer`): release website `master` under the owner's word. What a push deploys is devops's to
  establish from the workflow and Vercel configuration; the determination records "no workflows, Vercel deploys `master`". Run
  `check-proxy-registered.py` on the release tip's build. After deploy, run the two signed-out requests in Assumption Not Checked
  with raw requests, and read the build log for the absent deprecation line.
- Steering: rule CR-1 as a re-scope or decline it, and correct hazard 3's `/preview` premise.
- Evidence: `agent-output/verification/fix-middleware-dead-matcher/code-review/` (README lists each command and result).
