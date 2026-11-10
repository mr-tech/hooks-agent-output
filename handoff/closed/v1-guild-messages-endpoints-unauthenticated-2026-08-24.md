---
UUID: 8818bd89
Status: Addressed
Status-Detail: "Addressed: both v1 guild-messages handlers require the Statbot key since website 1acffee, live since 2026-10-10 (unauthenticated request: 401, 0 bytes). The open questions are answered in steering/v1-guild-messages-auth-rulings.md, block 2026-11-10: the owner rules the key is not treated as compromised; of the other matchers, /message and /preview are live and /api/guilds is a dead pattern that guards nothing. The remaining post-deploy check (Statbot's own calls) rides handoff/fix-v1-guild-messages-auth-post-deploy-2026-10-10.md."
Owning-Stage: >-
  Unassigned. The next step is implementation plus one piece of establishment, in that order of
  weight: the fix is known in shape, but whether the endpoints are reachable in the DEPLOYED
  environment was explicitly not established and materially changes the urgency. Chain 013 proceeds
  without this and does not touch it.
Review-Trigger: >-
  Re-read this before anyone edits `src/middleware.ts`, adds a route under `/api/v1/`, changes the
  `matcher` array, or relies on middleware for authorization anywhere in this repo; before any change
  to how `STATBOT_API_KEY` is issued or rotated; if Statbot reports auth failures against the v1
  endpoints; and before closing chain 013, whose release does not depend on this but whose deploy
  puts the same endpoints in front of traffic again.
---

# Handoff — the v1 guild-messages endpoints are unauthenticated, and their guard cannot fire

**Raised:** 2026-08-24, by `code-reviewer-hooks-013-2`, during chain 013's round-7 adversarial
execution. It surfaced because that role's definition requires enumerating what an entry point
branches on at module scope before attacking it — a required step, not a digression.
**Written by:** `steering-hooks-013-2`, at the owner's direction (he answered `handoff` when asked
whether to fix it now, mint a chain for it, establish the deployed exposure first, or hold).

**Provenance, stated because it decides what a reader may lean on.** The *executed* evidence is the
reviewer's and is committed at `agent-output` `79bbcaf`, with both attack scripts. The *static*
facts in "What is wrong" below were re-derived first-hand from `website` at `b3f8ea9` by the thread
that wrote this document, and are marked accordingly. Nothing here is a paraphrase of a summary.

## What is wrong — two independent defects that mask each other

Re-derived by this thread by reading `src/middleware.ts` directly at `b3f8ea9`:

1. **The middleware never runs on the route.** `export const config` sets
   `matcher: ['/message/(.*)', '/api/guilds/(.*)', '/preview']`. The endpoints in question live at
   `/api/v1/guilds/…`, which no entry in that array matches.
2. **The predicate tests for a literal asterisk.** The body reads
   `if (url.pathname.startsWith('/api/v1/*'))`. No real request URL contains a `*`, so the
   `Bearer ${STATBOT_API_KEY}` comparison inside it is unreachable even on a request the matcher
   does admit.

**The two handlers carry no authorization of their own.** `grep -cE 'auth|session|Bearer|STATBOT|token'`
returns **0** on each of `src/pages/api/v1/guilds/[guildId]/messages.ts` and
`src/pages/api/v1/guilds/[guildId]/messages/[id].ts`.

**THE MASKING IS THE MOST IMPORTANT PROPERTY IN THIS DOCUMENT.** Repairing the `startsWith` typo
alone leaves the matcher still excluding the route. Repairing the matcher alone leaves the predicate
still unmatchable. **Either fix, alone, reads as correct in review and changes nothing at runtime.**

## What was demonstrated by execution — the reviewer's, not this thread's

Against a locally running instance built from `87cfbd8`, using a raw socket rather than a client
library: `GET /api/v1/guilds/<snowflake>/messages` with **no** authorization header, with a **wrong**
bearer, and with an **empty** bearer all returned **500** — the handler's own `catch` after it
reaches for the database — and `POST` returned **405**, the handler's own method check. Both status
codes prove the handler executed; had the guard fired, the response would have been the middleware's
rewrite to the 404 page instead.

The endpoint's success path returns every message row for the guild: `id`, `name`, the full `data`
blob, and `valid`. **Discord guild IDs are not secrets**, so knowledge of a guild ID is not a
meaningful barrier.

## What is NOT established — do not close this document by assuming either way

- **Whether the deployed environment is exposed.** The reviewer tested a **local** instance only. It
  did not establish whether an edge, platform or CDN layer blocks or authenticates `/api/v1/*` in
  production. If such a layer exists, this is far less urgent than it reads; if it does not, it is a
  live data exposure. **This is the single cheapest thing anyone picking this up can settle, and it
  should be settled first**, because it decides how much of the rest is an emergency.
- **Whether anything has actually read data this way.** No log analysis was done. Nobody looked.
- The reviewer did not touch the hosted database this repo is configured against, and declined to.

## Why this is not a chain 013 finding

`src/middleware.ts` is untouched by chain 013 — `git log --oneline c85945f..b3f8ea9 -- src/middleware.ts`
is empty, and `git log -2 --date=short -- src/middleware.ts` puts its last change at **2023-08-22**.
The dead branch predates the chain by roughly three years.

The reviewer deliberately kept it out of the 013 verdict, and this document endorses that reasoning:
reject authority covers the work under review, and holding a milestone hostage to a pre-existing
defect in a file the chain never touched would misroute both the milestone and the defect.

## Fix shape, as the reviewer stated it

**The structural exit is to authenticate in the handlers, not in the middleware** — a shared
`requireStatbotAuth(req)` as the first statement of each handler. The reasoning is that
path-pattern authorization fails open on every route someone forgets to add to the list, which is
exactly the failure that occurred here: a route was added under a prefix the pattern did not cover,
and nothing anywhere reported that its guard had stopped applying.

**Whoever implements this must verify by executing an unauthenticated request, not by reading the
diff.** Given the masking property above, a diff read cannot distinguish a real fix from a fix that
changes nothing.

## Open questions this document does not answer

- Is `/api/v1/*` reachable from the public internet in the deployed environment? (Above; settle first.)
- Are there **other** routes that were intended to be covered by this middleware and are not? The
  `matcher` array names `/message/(.*)`, `/api/guilds/(.*)` and `/preview`; nobody has audited
  whether those three still correspond to the routes that exist, or whether `/api/guilds/(.*)` is
  itself now a dead pattern. **This document establishes nothing about them** — it is raised only
  because the same class of defect would look identical.
- Should `STATBOT_API_KEY` be treated as compromised? Unanswerable from here, and it depends
  entirely on the first question.

## Related, and deliberately not folded in

Chain 013's reviewer separately routed a **plan-level** question to the owner about whether the
persist API's acceptance of malformed shapes from any caller means D18/D19 is a client convention or
a server-enforced invariant. That is a *different* defect class in a *different* layer, it is
currently **held** by owner ruling along with four other plan items, and it must not be merged into
this document — they share only the general shape "the server trusts its callers".

## Sources

- `agent-output` `79bbcaf` — round 7 review, full write-up, both attack scripts, every enumeration
  with its blind-spot clause. **The authoritative record of the executed evidence.**
- `website` at `b3f8ea9` — `src/middleware.ts`, and the two handlers named above.
- `website` `8f28066` — unrelated to this defect, but cited here as a caution for anyone editing
  `tsconfig.json` while in the same area: the `**/__tests__` exclusion exists to fix the Vercel
  build, and removing it breaks the deploy.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-10T09:44 | steering-cleanup-hooks | Closed `Addressed`. The defect was fixed by the fixer chain `fix-v1-guild-messages-auth` (website `1acffee`, released at `ddbd750`, B-3 PASS 2026-10-10T16:52Z). This document's three open questions: deployed reachability is settled by that fix and probe; the dead-matcher audit was read by steering at website `master` `b96e364` (only `/api/guilds/(.*)` is dead, and the middleware holds no authorization today); the owner answered "No" to treating the Statbot key as compromised. `Status-Detail` replaced; body unchanged. |
