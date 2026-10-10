---
UUID: 6c6b20fd
Parent: v1-guild-messages-endpoints-unauthenticated-2026-08-24.md
Status: Answered
Status-Detail: >-
  (a) ANSWERED, Proven: production answers the list endpoint with no key — one sanctioned GET
  returned HTTP 200 application/json from the Next.js handler (x-matched-path on the route, no 404
  rewrite, no edge block). The deployed exposure is LIVE. (b) owner-needing: key equality
  (statbot HOOKS_API_KEY vs website STATBOT_API_KEY) cannot be established by any instrument
  available to this run without exposing a secret, and is additionally unobservable through the
  live system because the only code that compares the two keys is unreachable in production. The
  instrument that could settle it is named below and marked owner-needing.
---

# Research — the v1 guild-messages endpoints: is the deployed exposure live, and do the keys match?

## Changelog

| When (UTC) | Who | What | Result |
|---|---|---|---|
| 2026-10-10T07:24 | researcher | Investigated (a) and (b) per steering brief and ruling `v1-guild-messages-auth-rulings.md` | (a) Proven live; (b) owner-needing |
| 2026-10-10T07:24 | researcher | Document closed | Status: Answered |

## Question

Two things, bounded by the owner's "research first" ruling (`agent-output/steering/v1-guild-messages-auth-rulings.md`, 2026-10-10):

- **(a)** Does the deployed production site answer `/api/v1/guilds/[guildId]/messages` with no key? Sanctioned: exactly **one** unauthenticated GET to the list endpoint, made-up guild ID, record status + response class, never a body with message data.
- **(b)** Does the key Statbot sends (`Authorization: Bearer ${apiKey}`, built in `statbot-utils/src/api/ApiUtils.ts`) equal the website's `STATBOT_API_KEY` in production? If no available instrument can settle it without exposing a value, say so and name the instrument that could.

Out of scope (noted, not pursued): whether other matcher patterns are dead; whether the key is compromised; whether anyone has already read data this way (no log/host access — unestablished).

## Context

Sources read and relied on:
- Handoff `agent-output/handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md` (UUID 8818bd89, Open). Records the two masking defects and the local-only execution evidence; explicitly leaves the deployed exposure unestablished and calls it "the single cheapest thing … settle it first."
- Executed evidence at `agent-output` `79bbcaf` (round-7 code review, attack scripts) — the reviewer's local 500/405 results.
- `agent-output/architecture/system-architecture.md`: website deploys on **Vercel** (owner ruling 2026-08-23, line 145); PM2 config is not the live path.
- `agent-output/architecture/website.md`: read; no production base URL stated there, re-derived from the tree (below).
- Static facts re-derived first-hand at `website` `f2c85f5` (= `origin/master`, production serves this), via `git -C /usr/local/bin/hooks/website show f2c85f5:<path>`. The working tree is on `chore/agent-comment-sweep`; not switched.

## Methodology

1. Read both v1 handlers, `src/middleware.ts`, and `discordIdShape` at `f2c85f5` by `git show`. Re-derived the two defects from source rather than trusting the handoff's prose.
2. Derived the production base URL from the tree: `metadataBase: new URL('https://hooks.gg')` and the middleware's own rewrite target `https://hooks.gg/404`. Confirmed Vercel fronting by DNS only (no HTTP): `hooks.gg` → `76.76.21.21` (Vercel anycast), `www.hooks.gg` → CNAME `cname.vercel-dns.com`.
3. Chose a guild ID that passes `discordIdShape` (`/^[0-9]{17,23}$/`) yet cannot be a real guild: `9999999999999999999` (19 nines) decodes as a Discord snowflake to an impossible far-future timestamp, so it maps to no guild and the success path returns an empty set — no real data can come back.
4. Issued **one** unauthenticated GET to the production list endpoint, capturing status, headers, and byte length; body inspected only to classify it (empty array vs error page vs data), never recorded as data.
5. (b): traced the key on both sides to its env-var name only, redacting any literal; reasoned about what instrument could compare the two without printing either.

## Findings

### Verified (Proven — code execution / direct inspection)

**F1. The guard cannot fire on this route — re-confirmed at `f2c85f5`.** `src/middleware.ts` `export const config` sets `matcher: ['/message/(.*)', '/api/guilds/(.*)', '/preview']` — no entry matches `/api/v1/…`. The body's predicate is `if (url.pathname.startsWith('/api/v1/*'))` — a literal asterisk no real URL contains. Both defects stand exactly as the handoff records them; the handoff's masking property holds. The rewrite target, had it fired, is `NextResponse.rewrite('https://hooks.gg/404')`.

**F2. Neither handler authenticates.** `src/pages/api/v1/guilds/[guildId]/messages.ts` (`handler`) and `.../messages/[id].ts` (`handler`) contain no auth/session/Bearer/token check. The list handler: `if (req.method !== 'GET') return res.status(405).end()`, then `queryShape.parse(req.query)` (`z.object({ guildId: discordIdShape })`), then a Kysely `selectFrom('Messages').leftJoin('Guilds', …).where('Guilds.guildId','=',guildId)` returning `id, name, data, valid`. On `ZodError` → `res.status(400)` (note: no `.end()`/`.json()`); otherwise `res.status(500).end()`.

**F3. Production base URL is `https://hooks.gg`, fronted by Vercel.** Derived from `metadataBase: new URL('https://hooks.gg')` in the repo and corroborated by DNS (Vercel anycast `76.76.21.21`; `www` CNAME to `cname.vercel-dns.com`). No HTTP request was used to establish this.

**F4. The deployed production endpoint answers an unauthenticated GET — the exposure is LIVE.** The single sanctioned request:

```
GET https://hooks.gg/api/v1/guilds/9999999999999999999/messages   (no Authorization header)
→ HTTP/2 200
   content-type: application/json; charset=utf-8
   server: Vercel
   x-matched-path: /api/v1/guilds/[guildId]/messages
   x-vercel-cache: MISS
   content-length: 2
   body class: empty JSON array (2 bytes) — the handler's own success path over an empty result set
```

Response class = **handler data response** (Vercel routed straight to the Next.js API handler, which ran its success path and returned `application/json`). It is **not** a 404 rewrite (the guard did not fire — expected from F1), **not** an edge/platform/CDN block (no 401/403, no challenge; `server: Vercel` with the route echoed in `x-matched-path`), and **not** a handler error (contrast the reviewer's local 500, which came only from a dead-port DB). The body is empty solely because the guild ID is made-up; a real guild ID would return that guild's message rows (`id`, `name`, full `data` blob, `valid`) with no credential required. This directly answers the handoff's first open question and settles its urgency: there is no protective layer in front of `/api/v1/*` in production.

**F5. Statbot sends `Authorization: Bearer <HOOKS_API_KEY>`; the website compares against `STATBOT_API_KEY`.** In `statbot-utils/src/api/ApiUtils.ts` the hooks.gg Axios client is built at `this.#hooksgg = this.createInstance(hooksggHost, { headers: { Authorization: \`Bearer ${hooksggHost.apiKey}\` } }, …)`, and the two consumer methods call `this.hooksgg.get<...>('/api/v1/guilds/${guildId}/messages')` and `.../messages/${id}` — exactly the two endpoints (there is also a `proxy` branch that routes via statbot's own `/api/v3/guilds/${guildId}/hooksgg/messages` instead). `hooksggHost.apiKey` is provisioned per deployment: e.g. `statbot-statrole-remake/src/discord/client.ts` sets `apiKey: HOOKS_API_KEY`, and `HOOKS_API_KEY` is `process.env.HOOKS_API_KEY` (destructured in `statbot-statrole-remake/src/config.ts`). The website's middleware compares the inbound header against `Bearer ${STATBOT_API_KEY}` where `STATBOT_API_KEY = process.env.STATBOT_API_KEY` (Vercel env). So "the keys match" means: **statbot deployment env `HOOKS_API_KEY` == website Vercel env `STATBOT_API_KEY`**. No value of either was read, hashed, or recorded.

### High-confidence inference

**F6. Key equality has never been exercised, and cannot be exercised through the live system.** The only code that compares the two keys is the middleware predicate, which is unreachable in production (F1). Therefore no production behaviour — authenticated or not — can reveal whether the keys match: a correct key, a wrong key, and no key all produce the same 200 on this route today. This is why a fix is the first thing that would ever run the comparison, and why a mismatch is latent until then. Confidence High: it follows directly from F1 + F4 (the branch is dead) and F5 (the comparison lives only in that branch).

## System Weaknesses

- **Path-pattern authorization fails open.** A route added under a prefix the `matcher` does not cover loses its guard silently, with nothing reporting that the guard stopped applying — exactly what happened here. The handoff's recommended structural exit (authenticate inside each handler) addresses the class, not just the instance; this research does not design it (planner/implementer territory).
- **Key-equality is a latent release hazard.** Because the comparison has never run (F6), landing the fix flips an untested predicate into the request path. If `HOOKS_API_KEY` ≠ `STATBOT_API_KEY`, the fix will start rewriting Statbot's own calls to the 404 page — breaking Statbot's hooks.gg message reads — the moment it deploys. This is the risk the handoff's `Review-Trigger` already flags and is the reason (b) must be settled before, not after, a fix ships.

## Instrumentation Gaps

- **Normal (always-on, safe):** the two handlers emit nothing on an unauthenticated hit today (success path is silent; only the `catch` logs). Once auth moves into the handlers, a structured, low-cardinality counter/log on auth outcome (accepted / rejected, no key material) would make both "is the guard applying" and "is Statbot being rejected" observable — closing the blind spot that let this sit ~3 years.
- **Debug (opt-in, short-window):** to validate a fix in staging without touching prod, a temporary request-log of the auth decision on `/api/v1/*` (decision only, never the key) under a flag.

## Recommendations (investigation only)

1. **(a) is settled — treat the deployed exposure as live.** No further probing is warranted or sanctioned; the one GET was decisive.
2. **(b) is owner-needing (see Open Questions).** Settle key equality **before** any fix reaches production, by the instrument named below, because the fix itself is what first exercises the comparison and a mismatch breaks Statbot.
3. A fix, when planned, must verify by an executed unauthenticated request against the deployed build (per the handoff), not a diff read — the masking property makes a diff read non-discriminating.
4. Hand off to the **planner** for the fix (shape already stated in the handoff: authenticate in the handlers). This document is `Answered`; it is cited, not promoted.

## Open Questions

| # | Unknown | Blocker | What would close it | Owner |
|---|---------|---------|---------------------|-------|
| 1 | Does statbot's `HOOKS_API_KEY` equal the website's `STATBOT_API_KEY` in production? | Both are secrets in stores this run cannot read (website → Vercel prod env; statbot → each deployment's `HOOKS_API_KEY` env). Fences forbid reading/printing/hashing-and-printing any secret, forbid an authenticated request, and forbid prod host/log access. The live system cannot reveal it either (F6: comparison path is dead). | Someone with read access to **both** stores computes a salted digest of each value in one session (`HMAC-SHA256(key, random-salt-generated-that-session)`) and compares the two digests — equal digests ⇒ equal keys, and the salt keeps the digest from being a crackable fingerprint of the key. Never print either plaintext. Access needed: Vercel project env for `website` + the statbot deployment(s) env (`HOOKS_API_KEY`). This is owner/CI-level, not an agent under these fences. **Owner-needing.** | Owner |
| 2 | Has anyone actually read guild data through this endpoint? | No access to production logs/hosts (out of scope, forbidden). | Vercel/edge access logs for `/api/v1/guilds/*/messages` with non-matching or absent auth. | Owner |

### What (a) and (b) imply for the handoff's own out-of-scope questions (one line each, not investigated here)
- *Other dead matcher patterns:* F4 shows the fail-open class is real in production, which raises (does not settle) the handoff's question of whether `/message/(.*)`, `/api/guilds/(.*)`, `/preview` still match live routes — unexamined here.
- *Key compromise:* undecidable from here and, per the handoff, contingent on (a); (a) being live raises the stakes but establishes nothing about compromise.

## Sources

- `website` `f2c85f5` — `src/middleware.ts`; `src/pages/api/v1/guilds/[guildId]/messages.ts`; `.../messages/[id].ts`; `src/server/api/utils/shapes.ts` (`discordIdShape`); `metadataBase` in the app metadata.
- `statbot-utils/src/api/ApiUtils.ts` — `createInstance(hooksggHost, …)` and the two `this.hooksgg.get` calls; `statbot-statrole-remake/src/discord/client.ts` (`apiKey: HOOKS_API_KEY`) and `src/config.ts` (`HOOKS_API_KEY = process.env.HOOKS_API_KEY`).
- `agent-output/handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md`; `agent-output` `79bbcaf`; `agent-output/architecture/system-architecture.md`; `agent-output/steering/v1-guild-messages-auth-rulings.md`.
- One sanctioned production GET, 2026-10-10T07:22Z (F4). DNS lookups for `hooks.gg` / `www.hooks.gg` (no HTTP).
