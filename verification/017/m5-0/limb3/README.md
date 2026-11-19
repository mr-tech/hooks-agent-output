# M5-0 limb 3 — the post-response span probe (chain 017, OQ-15)

Written by implementer-hooks-017, 2026-11-19. Plan `planning/017-existing-items-backlog.md` revision 6 (`21e61eb`), § M5 "M5-0" limb 3; his push approval 05:06Z (`steering/017-rulings.md`, `3c24ead`).

## The branch

- Website branch `probe/017-waituntil-span`, one commit `8c13d1c` (`8c13d1c0b74d822aeded205832917beaae365c74`) on `1ad625e`.
  `git diff --stat 1ad625e 8c13d1c`: `package.json` +1, `pnpm-lock.yaml` +80, `src/pages/api/waituntil-span-probe.ts` +25, `vercel.json` +1 (4 files, 107 insertions, 0 deletions).
- Built in a git worktree outside `/usr/local/bin/hooks`, since removed; the shared website tree stayed on `chain/017-existing-items-backlog` and was not switched.
- Not pushed. The push is devops's, on his 05:06Z approval. Never merged; deleted by devops after the read.
- `git diff --stat aca8cb3 8c13d1c` (limb 2's final probe commit): the route file renamed and changed (+9 −7), and `pnpm-lock.yaml` 4 lines (below). `package.json` and
  `vercel.json` are identical to `aca8cb3`: `"@vercel/functions": "^3.11.3"` and `"buildCommand": "SKIP_ENV_VALIDATION=1 next build"` as the first key, the `crons` entry untouched.

## The route

`GET /api/waituntil-span-probe?id=<token>[&mode=without]`, limb 2's form with one change.

| Line | When | Text |
|---|---|---|
| control | before the response | `preview-image-failure probe-control mode=<with\|without> id=<token>` |
| post-response, five of them | 5, 15, 30, 45 and 55 s after the request starts | `preview-image-failure probe-post-response mode=<mode> id=<token> atS=<5\|15\|30\|45\|55> elapsedMs=<measured>` |

All lines are `console.error`. In mode `with` one promise, settling when the 55 s line is written, is passed to `waitUntil` from `@vercel/functions`; in mode `without` the same
work runs and the promise is not passed (limb 2's H-2 form; the plan's limb 3 asks only for the `with` request). Timers are set from the start of the handler, so `elapsedMs` is the
distance from the request's start, not from the previous line. No generator call, no environment or secret read, no database; `id` reduced to `[A-Za-z0-9-]`, 40 characters.

## Reading the outcome (plan limb 3)

Per request token in the deployment's runtime logs (`--deployment <probe URL>`):

| Lines present for the `with` request | Outcome |
|---|---|
| control and all five (`atS` 5, 15, 30, 45, 55) | **lasts**: T = 40 s stands |
| control and the lines up to some `atS` = L < 55, none after | **cut at L**: M5 and M6 code stop; a revision re-derives T against L |
| control absent, or no deployment | **not readable**: repair and re-run once; a second goes to him |

Read at least 60 s after the request; the last line is written 55 s after it starts.

## Evidence for the route itself (a spike; never merged)

- Test kept out of the branch (a file under `src/pages/` is a route in Next): `waituntil-span-probe.post-response-lines.test.ts` beside this file, 4 cases, `@vercel/functions` mocked,
  fake timers (which also fake `Date`, so `elapsedMs` is exact). Red first: `probe-red.out` (module `~/pages/api/waituntil-span-probe` absent, no tests ran). Green after the route:
  `probe-green.json`, 4 of 4, exit 0. The span case checks the line count one millisecond before and at each of 5, 15 and 55 s, the promise's settlement only at 55 s, and that `waitUntil` receives one promise;
  `without` never calls `waitUntil`.
- `npx eslint` over the route: no findings (the scratch test had one `no-floating-promises`, fixed). `tsc --noEmit -p tsconfig.json`: one error, `product_image.png` not found (no `next-env.d.ts` before a build; as for limb 2), none in the route.
- Not run: `next build` and the route on Vercel. limb 2's build of `aca8cb3` (devops, `d61f445`) is the precedent for the same `package.json`, `vercel.json` and route form.

## Package operation

`pnpm install --frozen-lockfile` then `pnpm add @vercel/functions` (pnpm 10.28.2), both exit 0. The lockfile diff adds only `@vercel/functions@3.11.3` and its own dependencies
(`@vercel/oidc@4.0.9`, `@vercel/cli-config@0.4.0`, `@vercel/cli-exec@1.0.1`, `jose@5.10.0`, `os-paths@4.4.0`, `xdg-app-paths@5.1.0`, `xdg-portable@7.3.0`, `zod@4.6.7`); **no existing pin moves**
(0 deleted lines, `git diff 1ad625e 8c13d1c -- pnpm-lock.yaml`). Limb 2's run had also moved `debug` 4.3.4 to 4.4.3 for `proxy-agent@6.3.0` and `require-in-the-middle@5.2.0`
(`../README.md`); this run did not, which is the difference in the four `pnpm-lock.yaml` lines between `aca8cb3` and `8c13d1c`. The plan's limb 3 asks that no other pin move; it holds here.
