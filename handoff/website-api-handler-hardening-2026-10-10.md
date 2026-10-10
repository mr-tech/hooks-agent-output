---
UUID: b1fdd41a
Status: Open
Status-Detail: "Four LOW items in website's API handlers, raised by the fix-v1-guild-messages-auth code review (round 1, APPROVED_WITH_COMMENTS) and kept out of that fix's owner-bound scope. Item 1 awaits the owner's selection (rider or this handoff). Nothing blocks the v1 auth fix's release."
Owning-Stage: Unassigned. Implementation (fixer or implementer) once the owner routes it; item 1's route is the owner's selection, carried by steering.
Review-Trigger: When any file under website src/pages/api/ is next edited, when a route is added under /api/v1/, or when src/env.mjs next enters a scope, whichever comes first.
---

# Handoff — website API handler hardening (out of the v1 auth fix's scope)

## What is seeded

1. **`src/pages/api/messages/codes/[code].ts`, `handler`, the `catch`.** It contains `if (error instanceof z.ZodError) return res.status(400);`. That sets the status and never sends a response, so a request with any extra query parameter stalls (`queryShape` is `.strict()`), and the route is unauthenticated. Owed: `return res.status(400).end();` plus a spec-form test asserting status `400` **and** that the response was sent (`ended === true` on the `__tests__/helpers/apiResponse.ts` double, or that file's equivalent). The test must be shown red without `.end()`. The class sweep `git grep -nE 'res\.status\([^)]*\)\s*;?\s*$' <sha> -- src ':!**/__tests__/**'` must then return 0 hits. Its blind spots are multi-line chains, `res.statusCode =` assignments and a bare `return`, so the review must check those by reading. The cost per stalled request has not been measured.
2. **Constant-time secret comparison.** The 3 sites are `src/pages/api/v1/guilds/[guildId]/messages.ts` `handler`, `.../messages/[id].ts` `handler` (both `req.headers.authorization !== \`Bearer ${key}\``), and `src/pages/api/interactions-server.ts` `handler` (`req.headers['x-hooks-api-token'] !== env.HOOKS_API_TOKEN`). Owed: one `secretEquals(a, b)` that applies `crypto.timingSafeEqual` to the SHA-256 digests of both strings, so length cannot leak, used at all 3 sites. The v1 sites must keep failing closed when `STATBOT_API_KEY` is unset or empty, and must accept exactly `Authorization: Bearer <key>`. Whether timing is exploitable over the network has not been measured.
3. **v1 guard coverage that cannot be forgotten.** Today each route file carries its own two-line guard (2 of 2 routes guarded at website `c8c3d70`). Owed: a spec test that enumerates every route file under `src/pages/api/v1/` from the filesystem, imports each default handler, and asserts `401` with no database read for a request with no credential. It must be shown red by adding an unguarded stub route. When a third v1 route arrives, lift the guard into a shared `requireStatbotKey`.
4. **Env access idiom.** The v1 handlers read `process.env.STATBOT_API_KEY` directly, while the repo's other server secrets go through the `src/env.mjs` schema. If `env.mjs` enters a scope, add `STATBOT_API_KEY: z.string().min(1)` and **keep** the handlers' request-time `!key` check. Making the entry required turns a missing variable into a failed build instead of a `401`, which is a release behaviour the owner rules on.

## Evidence

- `agent-output/code-review/fix-v1-guild-messages-auth-code-review.md`, findings CR-2, CR-3, CR-4 and CR-5, with their enumeration commands and hit counts at website `c8c3d70`.
- The stall mechanism was measured on the v1 handlers before the fix: `agent-output/verification/fix-v1-guild-messages-auth/http-malformed-1acffee.txt` (curl exit 28 at 15 s). Item 1 is inferred by analogy and was not run.

## Origin

Raised by the code review of chain `fix-v1-guild-messages-auth`, round 1, at website `c8c3d70`. The v1 auth defect itself is handoff `v1-guild-messages-endpoints-unauthenticated-2026-08-24.md` (8818bd89), and that handoff is not superseded by this one.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-10-10T07:57 | code-reviewer (fix-v1-guild-messages-auth) | Created from CR-2 to CR-5 |
