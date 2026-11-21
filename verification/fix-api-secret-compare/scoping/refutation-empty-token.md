# Refutation attempt: empty / unset HOOKS_API_TOKEN (website at b68f94c)

Export: `git -C /usr/local/bin/hooks/website archive b68f94c | tar -x -C <scratchpad>/refute-token/x`, node_modules symlinked. Dummy env values only, run under `env -i`, no .env read, no network or database contact. Every command ran under `timeout 300` and `ulimit -v 4000000`. The export has been deleted (`ls -d x` reported "No such file or directory"). Only run.ts and build.cjs (the harness, not repo code) remain in the scratchpad dir `refute-token/`.

Instrument note: vitest could not start under the 4000000 KB cap (`RangeError: WebAssembly.instantiate(): Out of memory`, also with `--pool=threads`). Not circumvented. The handler `src/pages/api/interactions-server.ts` and the real `src/env.mjs` and `bot/serverCommands` were bundled with the export's esbuild 0.14.47 (JS API plus an alias plugin for `~` and `bot`; zod and next left external) and run with `node run.cjs <header-or-NONE>`. HTTP status: 401 = refused. 400 = passed the token check and reached the dispatch (the name `ping` is not a server command). 405 would be a method refusal.

Observed results (NODE_ENV=production, all other required vars set to dummies):

| Case | HOOKS_API_TOKEN | SKIP_ENV_VALIDATION | Header | Status |
|---|---|---|---|---|
| control: matching | `tok` | unset | `tok` | 400 (passed) |
| control: wrong | `tok` | unset | `bad` | 401 |
| b | empty | unset | empty string | 400 (passed) |
| b2 | empty | unset | none | 401 |
| c | unset | `1` | none | 400 (passed) |
| c2 | unset | `1` | empty string | 401 |
| c3 | unset | unset | none | threw at import: `Invalid environment variables { HOOKS_API_TOKEN: [ 'Required' ] }` |
| c4 | empty | `1` | none | 401 |
| c5 | `tok` | `1` | none | 401 |
| c6 | unset | `''` (falsy) | empty string | threw at import (validation runs) |

## Limbs

(a) HOLDS (read from code, not run). Line 11: `req.headers['x-hooks-api-token'] !== env.HOOKS_API_TOKEN`. This is a plain `!==`, not constant-time. Timing was not measured.

(b) HOLDS. `src/env.mjs` declares `HOOKS_API_TOKEN: z.string()` with no `.min(1)` (read from code). The run case b confirms it: the empty token passed validation and an empty header string passed the check (400). Refinement from b2: a request with no header at all is refused (401), because `undefined !== ''`. Only an explicitly sent empty header passes against an empty token.

(c) HOLDS, with the condition that SKIP_ENV_VALIDATION is truthy (case c: unset token, no header, 400). Without it, an unset token fails at import (c3), so the handler never runs. An empty-string SKIP_ENV_VALIDATION is falsy, so validation still runs (c6). Under SKIP with an unset token, an empty header is refused (c2), since `'' !== undefined`.

(d) HOLDS (read from code, not run), and the repository cannot see the host.
- `grep -rn SKIP_ENV_VALIDATION` over the export, excluding node_modules, matches only `src/env.mjs` (the check) and `src/__tests__/env.client-proxy.test.ts` (which sets it to `''`). It is not in package.json, which has `build: next build` and `start: next dev`. It is not in vercel.json (crons only), next.config.js or ecosystem.config.json (pm2 running `next start`, no env block). No `.github` directory exists in the export.
- The repository cannot tell you: the host's actual environment (shell profile, pm2 or systemd or container env, a Vercel or host dashboard setting) or whether SKIP_ENV_VALIDATION is set there. It cannot tell you the deployed HOOKS_API_TOKEN value, or whether it is empty. It also cannot tell you how the production build is run, since a CI or deploy script outside this repository may exist, or what `.env` files exist on the host (none were read here). Absence of evidence in the repository is not evidence that the host leaves it unset.

(e) HOLDS (read from code, not run). Both handlers contain `const key = process.env.STATBOT_API_KEY; if (!key || req.headers.authorization !== \`Bearer ${key}\`) return res.status(401).end();` at line 22, before the method check. `!key` refuses both unset and empty. An attempt to run them failed at bundling (esbuild 0.14.47 rejects `satisfies` in `src/server/api/utils/shapes.ts`), so this limb stands on the code reading alone.

Net: no limb refuted. (b) carries a narrowing: an empty header must actually be sent, not omitted.
