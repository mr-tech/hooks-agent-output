# M5-0 limb 2 — the `waitUntil` probe (chain 017, OQ-7)

Written by implementer-hooks-017, 2026-11-19. Plan `planning/017-existing-items-backlog.md` § M5-0 limb 2, D-19.

## The branch

- Website branch `probe/017-waituntil`, one commit `d9030b9` on the chain's base `1ad625e` (`git diff --stat 1ad625e d9030b9`: `package.json` +1,
  `pnpm-lock.yaml` +84 −2, `src/pages/api/waituntil-probe.ts` +23).
- Built in a git worktree outside `/usr/local/bin/hooks`; the shared website tree stayed on `chain/017-existing-items-backlog` throughout and was not
  switched. The worktree is removed; the branch remains in the repository. It is never merged and is deleted by devops after the read.
- Not pushed. The push is devops's, on the owner's approval (D-15).

## The route

`GET /api/waituntil-probe?id=<token>[&mode=without]` (a Pages API route, `src/pages/api/waituntil-probe.ts`).

| Request | Line 1, before the response | Line 2, 5000 ms after the response |
|---|---|---|
| `?id=T` (mode `with`) | `preview-image-failure probe-control mode=with id=T` | `preview-image-failure probe-post-response mode=with id=T elapsedMs=<~5000>`, written by a promise passed to `waitUntil` from `@vercel/functions` |
| `?id=T&mode=without` | `preview-image-failure probe-control mode=without id=T` | `preview-image-failure probe-post-response mode=without id=T elapsedMs=<~5000>`, written by the same promise *not* passed to `waitUntil` (H-2's recorded control) |

Both lines are `console.error` (function stderr, the stream D-17's read found readable) and open with the M5-f prefix `preview-image-failure`.
The route returns `200 {"mode","id"}`; it reads no database, no environment variable and no secret. `id` is reduced to `[A-Za-z0-9-]`, 40 characters.
Use a distinct token per request (for example `with-<UTC stamp>` and `without-<UTC stamp>`), so the lines of each request can be read apart.

## Reading the outcome (D-19)

Per request token, in the deployment's runtime logs (`npx vercel@66.2.0 logs … --json --deployment <probe URL>`, M5-0, QAF-11):

| Mode | Lines present | Outcome for OQ-7 |
|---|---|---|
| `with` | control and post-response | **kept alive** |
| `with` | control only | **not kept alive** (the failure under D-19) |
| `with` | neither | **not readable** (repair and re-run once under the same approved push) |
| `without` | either | recorded beside it (H-2); not a gate |

Request the `with` route once the deployment is ready, then read after at least 10 s (the second line is written 5 s after the response).

## Evidence for the route itself (a spike; the route is never merged)

- Test, kept out of the branch (a file under `src/pages/` is a route in Next; this one lives in `src/utils/__tests__/` of the scratch worktree):
  `waituntil-probe.post-response-line.test.ts` beside this file, 4 cases. Red first: `probe-red.out` (module `~/pages/api/waituntil-probe` absent, no tests ran);
  green after the route: `probe-green.json` (4 of 4 passed, exit 0), with `@vercel/functions` mocked and fake timers. Cases: the control line precedes the response;
  `with` hands one promise to `waitUntil` that settles after 5000 ms with the second line; `without` never calls `waitUntil` and still writes the second line;
  an id with other characters is reduced.
- `npx eslint` over the route: no findings. `tsc --noEmit -p tsconfig.json` in the worktree: one error, `src/app/page.tsx` cannot find
  `~/assets/img/product_image.png` (no `next-env.d.ts` before a build; not in this change), none in the route.
- **Not run**: `next build` (the project's environment validation needs variables I did not read), and the route on Vercel. Whether the preview deployment
  builds is devops's confirmation step. The probe's one claim, that a `waitUntil` promise outlives the response there, is exactly what is unestablished.

## Package operation

`pnpm add @vercel/functions` (pnpm 10.28.2, after `pnpm install --frozen-lockfile`, exit 0 both): `package.json` gains `"@vercel/functions": "^3.11.3"`. The lockfile diff, all dispositioned:

| Moved pin | Disposition |
|---|---|
| new: `@vercel/functions@3.11.3` (peers `@aws-sdk/credential-provider-web-identity` and `ws`, both optional, resolved to the lockfile's existing `3.378.0` and `8.13.0`) | the dependency asked for |
| new: `@vercel/oidc@4.0.9`, `@vercel/cli-config@0.4.0`, `@vercel/cli-exec@1.0.1`, `jose@5.10.0`, `os-paths@4.4.0`, `xdg-app-paths@5.1.0`, `xdg-portable@7.3.0`, `zod@4.6.7` | transitive of the above, added |
| moved: `debug` 4.3.4 → 4.4.3 for two existing dependents, `proxy-agent@6.3.0` and `require-in-the-middle@5.2.0` | pnpm's resolution after the add; `debug@4.4.3` was already in the base lockfile (`git show 1ad625e:pnpm-lock.yaml`: 2 lines for it, package and snapshot). The branch is never merged, so no release inherits it; stated here because it is a pin that moved |

`@vercel/functions` declares `engines.node >= 20`; the project's Node version for the preview deployment is devops's to confirm with the environment facts.

## For devops-hooks-017

Branch `probe/017-waituntil`, SHA `d9030b9`.
