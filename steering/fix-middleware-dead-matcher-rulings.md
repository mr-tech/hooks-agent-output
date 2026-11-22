# Rulings — fixer chain `fix-middleware-dead-matcher` (website: a middleware matcher entry no route serves)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 8 of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z", "05:38Z"
(item 5, T9), "05:50Z" (order: 8). tmux category: `fix-middleware-dead-matcher`. Source: `TODO.md` item (inventory row T9,
`verification/fixer-queue-2026-11-21/scoping/inventory.md:31`).

## 2026-11-22T01:49 — selection: chain 8's scope (remove the entry; add the matcher test)

Selection prompt put 01:4xZ, answered 01:4xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises read before the prompt: the sweep `verification/fix-middleware-dead-matcher/scoping/sweep.md`
(helper, at website `132a7ab`): `src/middleware.ts:6` matcher `['/message', '/message/(.*)', '/api/guilds/(.*)', '/preview']`; only
`/api/guilds/(.*)` reaches no route (`git ls-tree`: the API routes sit under `/api/v1/guilds/`; no rewrites); the middleware only sets
`x-pathname`, read only by `src/app/_navigation/Redirects/Server.tsx:5`; `src/__tests__/middleware.request-headers.test.ts` (5 cases)
covers `/message` entries only. The refutation helper (scratch `refute-matcher/`), all four HOLD: dev server of an export with and
without the entry — status codes identical on `/api/guilds/1/x` (404), `/api/v1/guilds/1/messages` (401), `/message`, `/message/m/new`,
`/preview` (200); the middleware ran on `/api/guilds/1/x` only with the entry; `unstable_doesMiddlewareMatch` agreed; the existing test
passes both ways (run).
- Q: A "Agent: remove it and add the test (Recommended)" — "The dead entry goes, and a test checks every middleware address against the
  site's real pages, so a future dead or mistyped entry is caught. A few dozen lines of test."; B "Agent: remove the entry only". Chosen: **A**.

Determination, stage set and branch cut: written when website `master` is free of chain 7 (released or parked), from that tip.
Record passages describing an older middleware (sweep's record hits, 12 files) are history; the architect gets one entry at closure.

## 2026-11-22T16:59 — rider: the Next.js "middleware" file-convention deprecation (his report)

His words, in this session: "worth noting the logs have this warning (unrelated to the effort) ⚠ The "middleware" file convention is
deprecated. Please use "proxy" instead." Read this turn: website tracks `src/middleware.ts`; `package.json` `"next": "^16.4.6"`.
Disposition (this thread's, under his "fix everything you find along the way", `fixer-queue-2026-11-21-rulings.md` block 04:50): the
rename to the `proxy` convention rides this chain, which already owns `src/middleware.ts` and its test; the determination, written when
website `master` is free of chain 7, scopes it (the new convention's file and export names read from Next's docs then, the existing
test and the matcher test moved with it). Told him in chat; he can veto.

## 2026-11-22T17:15 — selection: the proxy rename rides this chain; determination and stage set

Selection prompt put 17:1xZ, answered 17:1xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's, in his 18:37Z form. Premises read before the prompt: the rider sweep `verification/fix-middleware-dead-matcher/scoping/sweep-proxy.md`
(helper, at website `origin/master` `3859c29`; installed and locked Next 16.4.6): the renamed file is `src/proxy.ts`; a default export or a
named `proxy` export is accepted; `config.matcher` unchanged; the proxy always runs on Node.js, the edge runtime unsupported
(`node_modules/next/dist/docs` `version-16.md:600`, `proxy.md:257`); a project holding both files fails the build. This thread's own
read earlier today (`vercel inspect`, 07:28Z): the live deployment lists `λ _middleware` in 19 regions. Unread: the speed effect.
- Q: A "Agent: rename it now (Recommended)" — "The warning goes away and we follow Next.js's supported path. A few changed lines plus the
  existing test moved with the file, reviewed and released with the unused-address fix. Possible small added delay on those pages for
  distant visitors (unmeasured)."; B "Leave it for now" — "The fix removes only the unused address. The warning stays, and the file keeps
  working until a future Next.js version drops the old name, at which point it has to be done anyway." Chosen: **A**.

**Determination.** Shape: hygiene (a dead matcher entry; a deprecated file convention), cause proven (sweeps `scoping/sweep.md` and
`scoping/sweep-proxy.md`). Blast radius: the request header `x-pathname`, read only by `src/app/_navigation/Redirects/Server.tsx:5`, on
`/message`, `/message/*`, `/preview`. End step: website `master`, which Vercel deploys to production; `release-move.js --dry-run` on
`master` `3859c29` (17:1xZ): every check passed, no workflows, one serving ref. Pipeline: the `fixer` agent.
**Scope statement** (website, from `origin/master` `3859c29`): (1) `src/middleware.ts` becomes `src/proxy.ts`, its function named `proxy`
as Next's guide recommends, behaviour otherwise unchanged; (2) its matcher loses `/api/guilds/(.*)`; (3)
`src/__tests__/middleware.request-headers.test.ts` becomes `src/__tests__/proxy.request-headers.test.ts`, importing the new file; (4) a
test checks every matcher entry against the site's real pages (his 01:49 selection A). Write set: those paths, a new test file under
`src/__tests__/` named per Test Conventions, the fixer's document and `verification/fix-middleware-dead-matcher/`. Exclusions (sweep
placement): tRPC `t.middleware` (`src/server/api/trpc.ts`), floating-ui `middleware` options (three component files), the
`src/env.mjs:55` comment, lockfile package names, Next's own `unstable_doesMiddlewareMatch` and `x-middleware-*` names. Record passages on
the older middleware: history, one architect entry at closure.
**Stage set:** `fixer-fix-middleware-dead-matcher` → `code-reviewer-fix-middleware-dead-matcher` (under 20 production lines: the reviewer
also runs the suite, typecheck and the red test) → devops for website `master` (his word, asked by devops in its own session). No plan,
critic, Phase 1, QA or UAT; a production count of 20 or more restores QA Phase 2.
**Red evidence (this thread's guidance):** the matcher test red with the dead entry, green without; a production build in an export
printing the deprecation warning at base and not at the tip. **Not covered by the sweeps:** a real build, Vercel's handling of a Node
proxy (regions, latency), Turbopack vs webpack on Vercel. Devops hazard: post-deploy, the build log carries no deprecation line and the
`/message` pages still render (the header's consumer).

## 2026-11-22T17:32 — handed to code review at website 453de76; reviewer started

Fixer's spawn cue by message ~17:4xZ: document `implementation/fix-middleware-dead-matcher-implementation.md` (record `2e61217`;
`Handoff-At: 453de76 — repos=website`, read). This thread's reads: `git log 3859c29..453de76` (three commits); `git diff --numstat`:
`src/proxy.ts` 19/0, `src/middleware.ts` 0/23, `proxy.matcher-routes.test.ts` 49/0, header test moved 2/2. Fixer's figures (its document,
not re-run here): suite 2362/2362 exit 0; base build prints the deprecation line once, tip none; tip registers the proxy as nodejs (base
edge). Two calls not completed at first issue and each re-issued once (fixer's report, recorded in its document). Reviewer brief
`steering/fix-middleware-dead-matcher-brief-code-reviewer.md`; `code-reviewer-fix-middleware-dead-matcher` started with `tmux-agent spawn`.

## 2026-11-22T17:40 — review approved at 453de76; CR-1 ruled; devops started

Reviewer's spawn cue by message ~17:3xZ: `code-review/fix-middleware-dead-matcher-code-review.md` (record `4823fb3`, read: `Reviewed-At
453de76187c5…`, Round 1, `APPROVED_WITH_COMMENTS`); 19 production lines re-derived; suite 2362/2362 exit 0; red at `31acb25`, green at
`453de76`; hazards 1, 2, 4 hold. CR-1 (LOW): the `/preview` matcher entry runs the proxy where nothing reads `x-pathname` (the reader is
imported only by the message layout) — corrects the common brief's hazard 3. Ruling (this thread's, under his block-04:50 "fix everything"):
CR-1 does not ride this release (a re-round would move the reviewed tree, and removing it changes what runs on the page the
preview-image-generator screenshots, unmeasured); it is its own fixer chain, queued after 9f, its determination measuring the
screenshot path first. Devops brief `steering/fix-middleware-dead-matcher-brief-devops.md` (CR-1 correction carried in its first lines);
`devops-fix-middleware-dead-matcher` started with `tmux-agent spawn`.

## 2026-11-22T18:45 — pushed on his word; deploy reads; his selection on the signed-out checks

Devops by message ~18:43Z: his selection "Agent: push it live now (Recommended)" (in its session); website `master` `3859c29` → `453de76`
(18:41:16Z; `git ls-remote` read by devops); record `deployment/fix-middleware-dead-matcher-deployment.md` Active (`6711bc29`). Its
Vercel reads hung (exit 124, four tries) and its two signed-out requests were not completed. This thread's read (`vercel inspect
https://hooks.gg`, 18:44Z, first try): `dpl_7amFajR7sNEhdbPLBcjWDUc9psb2` Ready, created 18:41:17Z; built-from commit not read here.
Ruled to devops (this thread's): a CLI timeout is not a control — retry under `timeout 60`, two tries each. Owner-wait `release-ask` resolved.
Selection prompt put 18:4xZ, answered 18:4xZ (ledger `steering/selection-ledger/2026-11-22.md`, this thread's block of that minute);
wording this thread's. Premise read: the review's two discriminating requests (`code-review/closed/fix-middleware-dead-matcher-code-review.md`
L167-168, L177). Options: A "Agent: re-run with label renamed (Recommended)" — "the deploy agent re-runs the two signed-out visits to hooks.gg
with that word removed, then finishes and closes the release. A few seconds' work."; B "You: check it yourself" — "In a private browser
window (signed out), open hooks.gg/message/m/0/edit: it should open the blank editor without bouncing."; C "Skip the live check" — "Close
the release on the reviewer's running-copy test alone." Chosen: **A**; relayed verbatim to devops.
