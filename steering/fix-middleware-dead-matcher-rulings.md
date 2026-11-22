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
