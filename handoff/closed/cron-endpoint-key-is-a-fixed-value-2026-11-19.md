---
UUID: 4bc9b626
Status: Addressed
Status-Detail: "Discharged by fixer chain fix-delete-dead-cron: the endpoint and its schedule were deleted at website 132a7ab, released to production 2026-11-22. At origin/master, src/pages/api/cron.ts and vercel.json are absent. The dashboard read was withdrawn on his ruling (handoff 9f04d154)."
Owning-Stage: steering thread for the website access surfaces (to route it to a stage)
Review-Trigger: when website src/pages/api/cron.ts is next edited, or when the next chain touching website access control opens
---

# Cron endpoint key is a fixed value in source

## What is seeded

`GET /api/cron?key=vercel` (website `src/pages/api/cron.ts:12-81`; `vercel.json` schedule `0 0 * * *`) is guarded only by
`req.query.key !== 'vercel'` -> 404 (`cron.ts:15`). The key is a constant in source and in the URL, not a secret.

Established by the sweep (read from code, not run): the endpoint takes no message identifier from the request, so it is not an
identifier-to-row path. It reads `Messages.data` through `ScheduledMessages` and updates `ScheduledMessages`. Anyone who sends the
request can trigger it; the effect is sending already-due rows to their stored webhook URL. No procedure writes `ScheduledMessages`
(`research/competitive-feature-landscape-2026-11-08.md:166`). Sweep class: UNCLEAR.

Not established: whether the 404 on a wrong key is the only check in front of it (Vercel configuration and env were not covered by the
sweep); what a trigger outside the schedule changes in practice (not run).

The owner left this surface out of the fix chain; the chain's scope statement lists it as "a constant, not a secret. It is not a
message-id path." This record states no remedy.

## Evidence

`verification/access-defects/scoping/sweep.md` row S14, website `787bec5`. Read from code, not run.

## Origin

Raised by the scoping determination of the chain `fix-personal-message-access` (rulings block "2026-11-19T20:30Z", Exclusions) and kept out of the chain by the owner's selection recorded in block "2026-11-19T22:35Z". The sweep is `verification/access-defects/scoping/sweep.md`, run at website `787bec5`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T22:36 | helper for steering-roadmap-hooks | Created. |
| 2026-11-24T03:57 | steering-hooks-fixer | Document closed | Status: Addressed. The endpoint no longer exists: `deployment/closed/fix-delete-dead-cron-deployment.md` released website `132a7ab`, and `git cat-file -e origin/master:src/pages/api/cron.ts` fails. Its dashboard residue read (handoff 9f04d154) was withdrawn on his ruling. |
