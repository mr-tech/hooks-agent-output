---
UUID: af63220f
Status: Open
Status-Detail: "user.updatePreferences accepts any string in recentMessageIds, so a non-int8 entry fails that user's own hydrated session. Pre-existing at 787bec5, self-only; same class as CR-2. The edit trigger fired at chain 018's M1 (website 532c0ee, which bounds the list's length, not its elements); 018 excludes it as X-10, accepted by the owner, so it stays open. No stage owns this input yet."
Owning-Stage: steering thread for the website access surfaces (to route it to a stage)
Review-Trigger: when website src/server/api/routers/user.ts updatePreferences is next edited by a chain other than 018, or when the next chain touching website message-number inputs opens
---

# updatePreferences accepts non-int8 entries in recentMessageIds

## What is seeded

`user.updatePreferences` (`src/server/api/routers/user.ts`) takes the input `recentMessageIds: z.array(z.string()).optional()`, with no
digit or int8 bound. The stored ids are read back by `hydratedAuthCallback` (`src/server/auth.ts`), which passes them to
`getUserRecentMessages`. An entry that is not a valid int8 reaches the `where id =` of that query, postgres refuses it
(`value "99999999999999999999" is out of range for type bigint` was the text seen in the reviewer's run), and the user's own hydrated
session fails.

It is the same class as CR-2: a message-number input whose contract admits a value the column cannot hold, so the refusal comes from
postgres. Fixer chain `fix-personal-message-access` takes CR-2 at its own inputs (`messageIdShape` and `getOne`'s regex) in its next
round; this input is not one of them. The fix neither adds nor fixes this site; it was present at `787bec5`.

It is self-only: a user can only write their own preferences. It is not an ownership breach. This record states no remedy beyond that
CR-2 names its class.

## Evidence

`code-review/fix-personal-message-access-code-review.md`, finding CR-3 (INFO, round 1, reviewed at website `d597734`) and CR-2's
Enumeration line. Run by the reviewer: the observation case in `attack.pg.test.ts` ("a stored number beyond int8 ... fails that user's
hydrated session") passes at every SHA, so the session callback throws. The site count (1) is from the reviewer's
`git grep -n "recentMessageIds" d597734 -- src`.
Not re-run here: the input type and the call path are read from code, not run.

## Origin

Raised by the code reviewer of chain `fix-personal-message-access` as CR-3 in round 1 and routed to a handoff by steering in rulings
block "2026-11-19T23:09Z" (`steering/fix-personal-message-access-rulings.md`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T23:09 | helper for steering-roadmap-hooks | Created. |
| 2026-11-20T04:44 | steering-roadmap-hooks | Trigger fired: chain 018 M1 edits `updatePreferences` (website `532c0ee`, `git show --stat`: `src/server/api/routers/user.ts` 11 lines), reported by `implementer-hooks-018`. Dispositioned: stays open. Plan 018 excludes this input's element bound as X-10, accepted with the Exclusions by his 03:25Z selection (`steering/018-rulings.md`). Review trigger re-set to the next edit outside 018 or the next message-number-input chain; the release-of-fix limb is spent (fix-personal-message-access released). |
