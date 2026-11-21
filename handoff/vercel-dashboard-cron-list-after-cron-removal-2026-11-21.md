---
UUID: 9f04d154
Status: Open
Status-Detail: "Owed after the fix-delete-dead-cron release reaches Vercel production: the owner reads the website project's Cron Jobs list in the Vercel dashboard and reports whether it is empty. Nothing else can read that list."
Owning-Stage: owner
Review-Trigger: the fix-delete-dead-cron release reaching Vercel production (the push of the chain's commit to website master)
---

# Vercel dashboard Cron Jobs list, after the daily cron's removal

## What is seeded

Chain `fix-delete-dead-cron` deletes the website's `/api/cron` route and `vercel.json` (whose only key was the daily `crons` entry
`/api/cron?key=vercel`, `0 0 * * *`). Its code review's Assumption Not Checked (`code-review/closed/fix-delete-dead-cron-code-review.md`)
is that production then carries no cron at all, meaning no cron is also configured in Vercel's dashboard outside `vercel.json`.

The owed read, after the release deploy: the owner opens the Vercel project `hooks-gg-website` (team `hooks-gg`), Settings, Cron Jobs, and
reports whether the list is empty.

- Empty: the assumption holds. Steering closes the source handoff `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md`
  (Review-Trigger fired by this chain) and this one `Addressed`.
- A job still listed: it now calls a path that answers not-found each day near 00:00 UTC. The owner removes it in the dashboard or
  asks for a chain; nothing in the repository can remove it.

No command available to the agents shows this list: the Vercel CLI 29.1.1 `inspect` output for the live deployment shows no cron
section (`verification/fix-delete-dead-cron/devops/vercel-inspect-prod-0c14d5b.txt`), and `vercel logs` returns the build log only.

## Evidence

- Build log of the live production deployment, which was built from website `0c14d5b` and still lists the route `/api/cron`:
  `verification/fix-delete-dead-cron/devops/vercel-build-log-prod-0c14d5b.txt`.
- `vercel.json` at `0c14d5b` held only `crons` (`git show 0c14d5b:vercel.json`); deleted at website `132a7ab`.

## Origin

`deployment/closed/fix-delete-dead-cron-deployment.md` (devops, Stage 1, 2026-11-21), carrying the code review's Assumption Not Checked for
the chain `fix-delete-dead-cron`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T20:54 | devops-fix-delete-dead-cron | Created at Stage 1 as the carrier of the dashboard read. |
| 2026-11-21T23:19 | devops-fix-delete-dead-cron | Review-Trigger fired: the release reached production (push to website master at 23:18:58Z, `origin/master` `132a7ab`). The read is now owed by the owner; devops asks it in the release report to steering. Origin path repointed to the closed deployment record. |
| 2026-11-21T23:25 | devops-fix-delete-dead-cron | Reconcile note: the row above said the trigger had fired. It had not: the push reached `master`, but Vercel's production deployment of it errored and production still serves the previous release (`deployment/fix-delete-dead-cron-deployment.md` § Correction). The Review-Trigger stands as written and is unfired until a production deployment of this change is Ready. The owner is not to be asked for the read yet. |
