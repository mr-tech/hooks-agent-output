---
UUID: aad5cae1
Status: Open
Status-Detail: "Sign-out revokes and clears one arbitrary Discord account row when a Hooks user holds several, and the account lookup returns an arbitrary one. A known limit by the owner's ruling (chain 015 D34); nothing is owed unless such a user is found or reported."
Owning-Stage: planner
Review-Trigger: when a Hooks user holding more than one Discord Accounts row is found (a database read) or reported
---

# One Hooks user, several Discord accounts

## What is seeded

The `Accounts` table is unique only on (`provider`, `providerAccountId`), so one Hooks user (`userId`) can hold
several rows with `provider = 'discord'`. Two sites read "the" Discord account of a user by `userId` and take
the first row returned, with no order:

- `src/server/auth.ts` `removeUserSession` (website `3031878`): on sign-out it revokes that one row's Discord
  token and nulls its tokens. Any other Discord row of the same user keeps a live token.
- `src/utils/redis/index.ts` `fetchUserAccount` (website `3031878`): the account lookup the rest of the site uses
  returns an arbitrary one of the rows.

The two sites share the defect. Under the owner's standing rule, a bug in a shared pattern is fixed at both sites
together, never at one alone.

How a second row can arise: through the site's own buttons, it cannot. A signed-in user is offered sign-out, not
sign-in. But next-auth 4.24.5 links a new Discord account to an already signed-in user when the sign-in URL is
visited by hand while signed in. `src/server/auth.ts` has no `signIn` callback refusing it.

When the trigger fires, the work is a plan that, at minimum:
- revokes and nulls every Discord row of the user on sign-out;
- gives the lookup a defined choice among several rows;
- disposes the hand-made link (refuse it, or accept and handle it).
Refusing the link is a product rule for the owner, and it leaves existing rows in place.

Population: unread. No database instrument is reachable from the agents' box. The read that would settle it is
the count of `userId` values with more than one `Accounts` row where `provider = 'discord'`.

## Evidence

- Architect's finding AF-26, `architecture/015-bug-evaluation-fixes-architecture-findings.md` (agent-output
  `1e80a16`, option (b) corrected at `9c84362`): the schema (project-utils `749606d`), next-auth's linking, and
  both read sites.
- Steering's read of the site's sign-in paths and next-auth `core/lib/callback-handler.js`, recorded in
  `steering/015-rulings.md` block "2026-11-08T08:10Z — AF-26" (`766bd4b`). `send/page.tsx` was not read there.

## Origin

Chain 015 (`planning/015-bug-evaluation-fixes.md`), architect AF-26, raised from QA's routed assumption on M1-c.
The owner ruled it a known limit (plan D34, Exclusions X-20).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T08:11 | planner (planner-hooks-015) | Opened on the owner's AF-26 ruling (rulings `766bd4b`). |
