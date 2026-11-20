---
UUID: 81d9b7c1
Status: Addressed
Status-Detail: "Addressed at agent-output 3cb97ea: the Problem Areas row is restated from website 983681c as counting before each insert, where the count enforces the cap; the X-16 race and the unindexed columns stand. Other entries the fix made false were reconciled in the same commit (Components, Runtime Flow 1b, website.md A-6, the diagram)."
Owning-Stage: architect
Review-Trigger: the release of fix-personal-message-access (website master reaching the fix)
---

# Problem Areas row on the upsertMessage count goes stale at release

## What is seeded

`architecture/system-architecture.md`, Problem Areas, holds one row (line 198 when read) titled "`upsertMessage` counts the owner's messages on
every save". It says `shared.ts` `upsertMessage` runs `countAll()` over `Messages` by `fk_users_id`/`fk_guilds_id` on every save,
updates included, with the result unused (`!message.id &&`), and registers the cost as Low (unmeasured), by 015 AF-9a.

After fixer chain `fix-personal-message-access` releases, `upsertMessage` counts only on the insert path, so "on every save, updates
included" is no longer true. The architect updates that row at release. It is not an operator-visible signal.

The row also carries a separate claim, the count-then-insert's missing lock or constraint (plan 015 X-16). This record states nothing
about whether it changes.

## Evidence

`code-review/fix-personal-message-access-code-review.md`, finding CR-4 (INFO, round 1, reviewed at website `d597734`): the location is
`shared.ts` `upsertMessage` (count only on the insert path); the reviewer's enumeration is `grep -n "counts the owner's messages"
architecture/system-architecture.md`, 1 row.
Row text read from `architecture/system-architecture.md` this turn. The insert-path-only count is read from the review, not run here.

## Origin

Raised by the code reviewer of chain `fix-personal-message-access` as CR-4 in round 1 and routed to a handoff, owning stage the
architect, by steering in rulings block "2026-11-19T23:09Z" (`steering/fix-personal-message-access-rulings.md`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T23:09 | helper for steering-roadmap-hooks | Created. |
| 2026-11-20T01:41 | architect-hooks-fix-personal-message-access | Document closed | Status: Addressed. Trigger fired: website master reached 983681c at 2026-11-20T01:33:58Z. Code read at 983681c: upsertMessage runs the count only on the insert path, and the count gates the cap there. The row was restated, not retired. The X-16 race (count and insert are separate statements, no transaction: grep -c transaction over shared.ts at 983681c = 0) stands as a stated limit. Landed at agent-output 3cb97ea. |
