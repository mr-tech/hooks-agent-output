# Code review evidence — fix-middleware-dead-matcher, Round 1

Bound to website `453de76187c5c368732a20d2dd8a671ed97eed4c` (tip), `31acb25` (red), `3859c29` (base). Each tree was a
`git archive` export into the reviewer's scratchpad with `node_modules` hard-linked from the shared tree (`cp -al`); paths inside
captured logs name those scratch exports, since removed. Cited by `code-review/fix-middleware-dead-matcher-code-review.md`.

| File(s) | Command (from the export root) | Result |
|---|---|---|
| `red-at-31acb25.{txt,exit}` | `systemd-run --user --scope -p MemoryMax=8G npx vitest run src/__tests__/proxy.matcher-routes.test.ts src/__tests__/proxy.request-headers.test.ts` at `31acb25` | exit 1; `1 failed \| 9 passed (10)`; the failure is `/api/guilds/(.*) matches at least one of the site's routes` |
| `green-at-453de76.{txt,exit}` | same at `453de76` | exit 0; `9 passed (9)` |
| `suite-tip.{json,txt,exit}` | `… npx vitest run --reporter=json --outputFile=…` at `453de76` | exit 0; 2362 total, 2362 passed, 0 failed; 166 `testResults` entries |
| `typecheck-tip-unbuilt.{txt,exit}` | `pnpm run typecheck` before any build | exit 2: `src/app/page.tsx` cannot resolve a `.png` import (image module types come from the build-generated `next-env.d.ts`) |
| `typecheck-{base,tip}.{txt,exit}` | `pnpm run typecheck` after `next build` | exit 0 both |
| `build-{base,tip}.{txt,exit}` | `SKIP_ENV_VALIDATION=1 … npx next build` | exit 0 both; deprecation line `grep -c` 1 at base, 0 at tip |
| `functions-config-manifest-*.json`, `middleware-manifest-*.json` | copied from `.next/server/` after the builds | tip: `/_middleware` `runtime: nodejs`, 3 matchers, no edge middleware; base: edge middleware, 4 matchers |
| `check-proxy-registered.py`, `check-proxy-registered-{base,tip}.txt` | `python3 -I check-proxy-registered.py <built tree>` | tip PASS exit 0; base exit 1 on 3 checks (positive control). Re-runnable by devops on the release tip's build. |
| `probe-x-pathname.py`, `probe-{base,tip}.tsv`, `server-*.log` | `SKIP_ENV_VALIDATION=1 npx next start -p 39101` (base) / `39102` (tip), then `python3 -I probe-x-pathname.py <port> <label>` | 288 rows each, 0 differing between trees; no spoofed header defeats the signed-out redirect |
| `probe-rsc-followup.tsv` | inline raw-socket follow-up of the `RSC: 1` rows with `?_rsc=probe` | 307 on every row, spoofed or not, both trees, including the exempt `/message/m/0/edit`: Next's cache-buster check, not the gate |
| `numstat.txt`, `numstat-M.txt` | `git diff --numstat [-M] 3859c29 453de76` | `src/proxy.ts` 19 added — the only production path |
| `convention-check.{txt,exit}` | `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=3859c29` | exit 0; 0 FAIL, 0 CANDIDATE, 19 SKIP |

Servers were started with no `.env*` present: Redis fails to connect (`ERR_SOCKET_BAD_PORT`, `server-*.log`), so no live store was
reachable. Only GET and HEAD were sent; nothing was saved. Both servers were stopped by process group after the probe.
