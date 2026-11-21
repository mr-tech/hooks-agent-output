---
UUID: 09ed9be5
Status: Open
Status-Detail: "A stored recent-message id in non-canonical digits (leading zeros) passes the hydration's filter unchanged, so the recent strip cannot match its row; owed: the hydration passes on messageIdShape's canonical output, with duplicates removed. Blocks nothing."
Owning-Stage: the fixer or implementer of the next chain that edits `keepMessageNumbers` or `hydratedAuthCallback`
Review-Trigger: when `keepMessageNumbers` (website `src/server/api/utils/shared.ts`) or `hydratedAuthCallback` (website `src/server/auth.ts`) is next edited
---

# The hydrated session's recent ids are filtered but not canonicalised

## What is seeded

`keepMessageNumbers(ids)` (website `src/server/api/utils/shared.ts`, from chain `fix-recent-message-ids`) keeps an element when
`messageIdShape.safeParse(id).success` and returns the element **as stored**, discarding the shape's canonical output
(`messageIdShape` parses to BigInt and passes on `id.toString()`). `hydratedAuthCallback` (`src/server/auth.ts`) gives that list to
`session.user.preferences.recentMessageIds`. A stored element such as `'0900000000000101'` therefore stays in the session while its row
comes back as `'900000000000101'`, and the message page's recent strip (`src/app/message/page.tsx`, `recentMessages`, which matches
`m.id === id`) does not show it. The next `user.updatePreferences` save canonicalises it on the server (the router's
`boundedArray(messageIdShape, …)`), and where the list also holds the canonical form it is then stored twice.

Owed:
- `keepMessageNumbers` returns each accepted element's `messageIdShape` output (`safeParse(id).data`), so the query and the session
  both receive canonical digits.
- Duplicates are removed after canonicalising, first occurrence kept, so `['7', '007']` becomes `['7']` and never `['7', '7']`.
- A spec-form test where a non-canonical stored element is neither first nor last in the list, asserting that the session's
  preferences hold its canonical form and that its row is listed. It must fail with an inequality on the preference list (not a
  timeout) against today's `keepMessageNumbers`.

Population: how many stored ids are non-canonical in production is not measured. The client builds the list only from
`String(id)` of database rows and the session's list, so the expected count is zero.

## Evidence

- Probe `verification/fix-recent-message-ids/code-review/recent.pg.test.ts`, driven by `run-probe.sh` against a throwaway
  `postgres:16`. Case "leading-zero form of own personal id": at website `8f24e65` and at `76da25c` alike,
  `messageIds = ['900000000000101']` and `preferenceIds = ['0900000000000101']`
  (`verification/fix-recent-message-ids/code-review/out/hydration-8f24e65.json`, `hydration-76da25c.json`). Pre-existing: the fix leaves it as base had it.
- Corpus check from the same probe (`out/corpus-8f24e65.json`): of 4000 seeded values, the shape accepted 2003. Postgres refused
  none of them and read none differently, so binding the canonical form selects the same rows.

## Origin

`code-review/fix-recent-message-ids-code-review.md`, Round 1, CR-1.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T06:15 | code-reviewer-fix-recent-message-ids | Created from CR-1, Round 1. |
