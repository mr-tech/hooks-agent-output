---
UUID: c07b0565
Status: Open
Status-Detail: "STATBOT_API_KEY is read from process.env directly by the two Statbot API handlers rather than through src/env.mjs. Owed only when env.mjs next enters a scope; blocks nothing."
Owning-Stage: Implementation (fixer or implementer) whose scope next includes website src/env.mjs
Review-Trigger: When website src/env.mjs next enters a chain's scope.
---

# Handoff — Statbot API key through the env schema (website)

## What is seeded

The two Statbot API handlers, `src/pages/api/v1/guilds/[guildId]/messages.ts` and `src/pages/api/v1/guilds/[guildId]/messages/[id].ts`,
read `process.env.STATBOT_API_KEY` directly, while the repository's other server secrets go through the `src/env.mjs` schema. When a
chain's scope next includes `src/env.mjs`:

1. Add `STATBOT_API_KEY: z.string().min(1)` to the server schema (and its `process.env` read).
2. **Keep** each handler's request-time refusal of an unset or empty key (today `if (!key || …) return res.status(401).end();`, at
   website `b68f94c` line 23 of each file; chain `fix-api-secret-compare` changes the compare beside it, not the refusal).
3. Making the entry required turns a missing variable into a failure when `env.mjs` is imported (a run for `HOOKS_API_TOKEN`, unset,
   threw `Invalid environment variables` at import) instead of the Statbot API alone answering 401. That is a release behaviour the
   owner rules on: put it to him in that chain's scope question, with whether production sets the key (unread at this handoff's
   writing).

## Evidence

- Item 4 of `handoff/website-api-handler-hardening-2026-10-10.md` (b1fdd41a), which this handoff carries forward; the original raised by
  the code review of chain `fix-v1-guild-messages-auth` (CR-5, at website `c8c3d70`).
- `verification/fix-api-secret-compare/scoping/premises-b68f94c.md` §3-4: `STATBOT_API_KEY` is not declared in `env.mjs` at `b68f94c`;
  validation runs unless `SKIP_ENV_VALIDATION` is non-empty (`env.mjs:101`).
- `verification/fix-api-secret-compare/scoping/refutation-empty-token.md`, case c3 (the import-time throw, run).

## Origin

Chain `fix-api-secret-compare` (steering-hooks), which closes b1fdd41a's items 2, 3 and 5 and keeps `env.mjs` out of its scope; the
owner's selection to carry item 4 on a new handoff, `steering/fix-api-secret-compare-rulings.md` block "2026-11-21T15:30Z".

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T15:30 | steering-hooks (fix-api-secret-compare) | Created from b1fdd41a item 4 by the owner's selection |
