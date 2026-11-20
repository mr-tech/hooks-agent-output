# Preview-environment imitation, website at 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe

Isolated export under the scratchpad (deleted afterwards). `/usr/local/bin/hooks/website` not touched; no `.env*` copied; every build and server ran under `env -i PATH HOME` plus the named variables only. Only requests to 127.0.0.1 (plus the server's own image fetch to Discord's CDN).

## Commands
1. `git -C website archive 7923a1d... | tar x -C $S`; `systemd-run --user --scope -p RuntimeMaxSec=1200 -p MemoryMax=6G -p TasksMax=512 pnpm install --frozen-lockfile` -> exit 0.
2. Base: `systemd-run ... env -i PATH HOME NEXT_TELEMETRY_DISABLED=1 SKIP_ENV_VALIDATION=1 pnpm exec next build` -> **exit 0** (`build-base.txt`); then `pnpm run typecheck` (env -i, no env vars) -> **exit 0** (`typecheck-after-build.txt`).
   (A first attempt put `env -i` before `systemd-run`, which lost the D-Bus variables; the build never ran, and the typecheck ran before `next-env.d.ts` existed and failed on `~/assets/img/product_image.png` TS2307. Both reruns above are the real results. This confirms 017's note: typecheck needs the build's generated `next-env.d.ts`.)
3. Preview imitation: `preview-env.sh` (sourced). Fresh `rm -rf .next` before each build.
   - no skip: `next build` -> **exit 1** (`build-preview-noskip.txt`). First error: `Invalid environment variables: DATABASE_URL, REDISHOST, REDISPORT, REDISUSER, REDISPASSWORD: Required`, at prerender of `/_not-found`.
   - `SKIP_ENV_VALIDATION=1 next build` -> exit 0 (`build-preview-skip.txt`).
   - `next start -p 3999 -H 127.0.0.1` under `timeout 300`, env as preview-env.sh, no SKIP at runtime; curls (`curls.sh`, `-s -o /dev/null -w '%{http_code} %{redirect_url}\n'`, no -L, 60 s cap); killed by recorded pid. Repeated with `SKIP_ENV_VALIDATION=1` at runtime too.
4. After stopping: `ps -o pid,args -u dev | grep -c '[n]ext start'` -> 0; `'[n]ext-server'` -> 0; `ss -ltn | grep -c :3999` -> 0.

## Env names
Set (dummy values, names only): CDN_BUCKET CDN_ENDPOINT CDN_KEY CDN_SECRET DISCORD_BOT_TOKEN DISCORD_CLIENT_SECRET DISCORD_PUBLIC_KEY DISCORD_URL ENABLE_EXPERIMENTAL_COREPACK ENCRYPTION_IV ENCRYPTION_KEY GITHUB_USER_ACCESS_TOKEN GITHUB_USER HOOKS_API_TOKEN NEXTAUTH_SECRET NEXTAUTH_URL NEXT_PUBLIC_CDN_HOST NEXT_PUBLIC_DISCORD_CLIENT_ID NEXT_PUBLIC_PUSHER_CLUSTER NEXT_PUBLIC_PUSHER_KEY NEXT_TELEMETRY_DISABLED PREVIEW_IMAGE_API_KEY PREVIEW_IMAGE_URL PUSHER_APP_ID PUSHER_SECRET STATBOT_API_KEY.
URL-shaped ones (DISCORD_URL, CDN_ENDPOINT, PREVIEW_IMAGE_URL) were `http://127.0.0.1:1` (loopback), NEXTAUTH_URL `http://127.0.0.1:3999`.
Not set: every Production-only name, notably DATABASE_URL, DATABASE_PRIVATE_URL, REDISHOST, REDISPORT, REDISUSER, REDISPASSWORD, REDIS_*, PG*, POSTGRES_*, and the rest. Not simulated: VERCEL / VERCEL_URL / VERCEL_ENV (017's script set them; env.mjs's NEXTAUTH_URL schema depends on `VERCEL`).

## Route table (build-base.txt, verbatim)
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /legal/privacy
├ ○ /legal/terms
├ ƒ /message
├ ƒ /message/f/[id]
├ ƒ /message/m/[id]/edit
├ ƒ /message/m/[id]/send
├ ƒ /message/m/new
└ ○ /preview

Route (pages)
┌ ƒ /api/auth/[...nextauth]
├ ƒ /api/cron
├ ƒ /api/interactions-edge
├ ƒ /api/interactions-server
├ ƒ /api/messages/codes/[code]
├ ƒ /api/trpc/[trpc]
├ ƒ /api/v1/guilds/[guildId]/messages
└ ƒ /api/v1/guilds/[guildId]/messages/[id]

ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Curl tables (status, redirect)
| Path | Runtime without SKIP | Runtime with SKIP |
|---|---|---|
| / | 200 | 200 |
| /legal/privacy | 200 | 200 |
| /legal/terms | 200 | 200 |
| /preview | 200 | 200 |
| /support | 308 https://discord.gg/Yf7We6k2Nb | 308 https://discord.gg/Yf7We6k2Nb |
| /message | 200 | 200 |
| /message/m/0/edit | 200 | 200 |
| /message/m/0/send | 200 | 200 |
| /message/m/5 | 307 http://127.0.0.1:3999/message/m/5/edit | 307 (same) |
| /api/auth/providers | **500** | 200 |
| /api/auth/signin/discord | **500** | 302 http://127.0.0.1:3999/?callbackUrl=http%3A%2F%2F127.0.0.1%3A3999&error=discord |
| /_next/image?url=...discordapp.com/embed/avatars/0.png&w=64&q=75 | 200 | 200 |

## First server-log errors
- Without SKIP: `server-noskip-errors.txt`; the 500s log `Error: Invalid environment variables` (DATABASE_URL, REDISHOST, REDISPORT, REDISUSER, REDISPASSWORD Required), repeated per failing request.
- With SKIP: `server-skip-errors.txt`; `[ioredis] Unhandled error event: RangeError: Port should be >= 0 and < 65536. Received type number (NaN)` (REDISPORT unset), then `unhandledRejection` of the same. The process kept serving (all curls above answered).

Files: build-base.txt, typecheck-after-build.txt, build-preview-noskip.txt, build-preview-skip.txt, curl-noskip.txt, curl-skip.txt, server-*-errors.txt, preview-env.sh, curls.sh.
