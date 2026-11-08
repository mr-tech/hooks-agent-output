---
UUID: 9cefc40f
Status: Open
Status-Detail: "Providers.tsx decodes a client-reachable x-query-params header with decodeURIComponent; a malformed value throws during render. Outside plan 015's pool; nothing blocks on it."
Owning-Stage: planner
Review-Trigger: when src/app/_components/Providers.tsx getMessage or src/middleware.ts is next edited, or when the next website hardening effort is scoped
Priority: low
---

# Providers.tsx decodes a client-reachable header that can throw

## What is seeded

In the website repository at `6001f7f`:

- `src/middleware.ts` (default export) clones the request headers. It sets `x-query-params` only when the request
  has a query string, and its matcher covers only `/message/(.*)`, `/api/guilds/(.*)` and `/preview`.
- `src/app/_components/Providers.tsx` `getMessage` is a root-level provider. It passes the `x-query-params` header
  to `decodeURIComponent`.
- So on any path the matcher skips, and on a matched path with no query string, a header the client sent reaches
  the decode unchanged. `x-query-params: %` throws there, and that render fails.

The work: the property to hold is "for every value of `x-query-params` a client can send, on every path,
`Providers` renders without throwing". Either the middleware always overwrites or deletes the header on every
path that renders `Providers`, or the decode is guarded. Which one is for the effort that takes this.

A second member is outside the instrument below: a header-derived value decoded by a library such as
`queryString.parse` rather than by `decodeURI*`. Enumerate it when this is taken.

## Evidence

- Code review 015, Round 2 sub-entry, finding CR-6 (`code-review/015-bug-evaluation-fixes-code-review.md`,
  agent-output `7976a9a`), read at website `6001f7f`. Enumeration: `git grep -nE "decodeURI(Component)?\(" 6001f7f
  -- src bot`, excluding tests, gives 2. `Providers.tsx` is the member. `onCopy.ts` decodes a fragment the editor
  itself wrote, so it is not a member.
- Read, not run: no request with a malformed header has been sent.

## Origin

Code review 015 Round 2, CR-6 (LOW), raised against the CR-4 sweep's disposition in the M1 implementation
document (§ Fix Round 1, Class Sweep). Plan 015's D6 confines the chain to findings F-1 to F-50. Plan 015
Exclusions X-17 cites this handoff.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T06:47 | planner (planner-hooks-015) | Opened from code review CR-6 (`7976a9a`) as the carrier for plan 015 Exclusions X-17. |
