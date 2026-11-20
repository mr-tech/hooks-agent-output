# Brief, common part — fixer chain fix-message-page-header-decode

From `steering-roadmap-hooks`, written 2026-11-20T02:0xZ at the determination. Every brief of this chain names this file second, after
its `Duties negated:` line, and adds only what is that stage's own. Rulings file:
`/usr/local/bin/hooks/agent-output/steering/website-deps-review-rulings.md`.

## Determination, scope and stage set

- **His words:** block "2026-11-20T01:59Z" (H-001: a fixer chain now; route (a) plus an override; unused dependencies removed in this
  chain; H-002 and M-001 in a separate chain after) and block "2026-11-20T02:03Z" (remove `sanitize-html`, `@types/sanitize-html` and the
  direct `sharp`; keep `form-data`; keep `sharp` if the build shows Next.js needs it, and say so).
- **Determination:** block "2026-11-20T02:03Z", which holds the property, the region swept, the placement of every hit, the breach catch,
  what is not covered, the stage set and the end step. Read it whole.
- **The finding:** `security/website-deps-review-security-audit.md`, H-001 (record `1248690`). Its timings are from a development build.
  A production-build check was not completed.
- **The sweep:** `verification/fix-message-page-header-decode/scoping/sweep.md` (`d24b6c2`), rows S1 to S28 at website `983681c`.
- **Stage set**, quoted: "`fixer` (a red test for the property), then `code-reviewer` (and, under 20 production lines, the suite and
  the red test too), then QA Phase 2 at 20 or more lines, then `security` on the change (`security-hooks-website-deps`, the reviewing
  stage), then devops for website `master`."
- **Repositories:** `/usr/local/bin/hooks/website` (source) and `/usr/local/bin/hooks/agent-output` (record). `git -C <repo>` on every
  call.
- **Chain branch:** website `chain/fix-message-page-header-decode`, cut by steering at 02:03Z from `origin/master` `983681c`, with no
  upstream. Leave the untracked `.playwright-mcp/` alone.
- **End step:** a website `master` push. Vercel deploys it to production; there is no beta and no workflow. It needs his word.
- **Permitted paths for the fixer:** website `src/**` within scope with its `__tests__/`, `package.json`, the lockfile and
  `pnpm-workspace.yaml`; its document `implementation/fix-message-page-header-decode-…`; and `verification/fix-message-page-header-decode/`.

## Standing prohibitions

`/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)" and "Local builds of `website` — before the first save".
The second is quoted whole in `steering/fix-personal-message-access-brief-common.md`, and it binds any local build that saves. Never read
a `.env.local` value. Send no request to hooks.gg or any production host. Any timing or load check runs on localhost only, under a
`timeout`.

## Hazard analysis (this thread's — each a candidate to re-derive)

1. **What the header carries today.** `middleware.ts:17-21` sets `x-query-params` from the URL's query, and `getMessage` uses `.code`
   to fetch `/api/messages/codes/<code>`, whose result `Providers` discards (sweep). Read that before removing the path: a share-code
   load on `/message/...?code=` must keep working.
2. **Removing `query-string` vs overriding.** If route (a) leaves `query-string` unused, removing it removes `decode-uri-component`
   entirely. His option names an override; report what was done and why.
3. **pnpm overrides.** `package.json` has an npm-style `overrides` key (`semver`), and there is no `pnpm.overrides`. Whether pnpm 10
   honours the npm key is untested. Prove the resolved version from the lockfile, not from the config.
4. **`sharp`.** Next 16.1.6 carries its own `sharp`, and `next/image` is used. Removing the direct `sharp` may change what Next.js
   loads for image optimisation on Vercel. A production build is the minimum evidence.
5. **Lockfile churn.** Any install changes the lockfile. A diff that moves unrelated versions is a scope delta: stop and tell steering.
6. **Production on push.** There is no beta.

## Not checked by this thread

Vercel's header handling; which `sharp` Next.js resolves; Next.js internal parsers; whether a production build reproduces H-001.
