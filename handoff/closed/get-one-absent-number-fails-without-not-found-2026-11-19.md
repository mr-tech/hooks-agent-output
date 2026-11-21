---
UUID: 1f405282
Status: Addressed
Status-Detail: "Discharged by fixer chain fix-message-not-found, released to website master f4baebb at 2026-11-21T07:51:38Z: getOne answers one NOT_FOUND, with one text, for an absent number, another user's message and a server the caller cannot manage."
Owning-Stage: steering thread for the website access surfaces (to route it to a stage)
Review-Trigger: when website src/server/api/routers/message.ts getOne or src/server/api/utils/shared.ts getMessage is next edited, or when the next chain touching website access control opens
---

# getOne on an absent number does not fail as NOT_FOUND

## What is seeded

After the fix (website `2e50cd9`, chain branch `chain/fix-personal-message-access`), `message.getOne` loads the row first
(`message.ts:54`; row load `shared.ts:137-154`, `executeTakeFirstOrThrow`). On a number no row holds, the caller sees
`executeTakeFirstOrThrow`'s error, not a `NOT_FOUND`. On a number held by another user's personal message the caller is refused by the
owner check. So "absent" and "not yours" can be told apart.

The fixer's words: "Numbers are sequential, so this reveals little." Existence is not a read of a row, which is why the chain did not take
it (rulings block "2026-11-19T22:59Z"). This record states no remedy.

Read from code, not run: the two failure shapes were not compared in a test or database run in this record.

## Evidence

`implementation/fix-personal-message-access-implementation.md`, § Diagnosis, "Observed outside the scope, not absorbed", third bullet.
`verification/access-defects/scoping/sweep.md` row S2 (`message.getOne`: `message.ts:51-61`, row load `shared.ts:137-154`), at `787bec5`.
Read from code, not run.

## Origin

Raised by the fixer of chain `fix-personal-message-access` in its implementation document and ruled out of the chain by steering in rulings
block "2026-11-19T22:59Z" (`steering/fix-personal-message-access-rulings.md`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T22:59 | helper for steering-roadmap-hooks | Created. |
| 2026-11-21T07:53 | steering-hooks | Document closed. Status: Addressed. Discharged by `fix-message-not-found` (`steering/fix-message-not-found-rulings.md` block 06:46Z), released `f4baebb` (`deployment/closed/fix-message-not-found-deployment.md`). |
