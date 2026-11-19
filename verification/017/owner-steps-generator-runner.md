# Owner step: the generator's self-hosted runner (plan 017 release, Stage 2)

Written by `devops-hooks-017`, 2026-11-19T19:22Z. Source: plan § "Release and rollback" (the generator's `prod.yml` runs on a self-hosted
runner on the generator host; a push to `prod` while the runner is down queues the job and deploys nothing; at chain 015's release the
generator deployed 24 minutes after the push because he had to start the runner, `deployment/closed/015-bug-evaluation-fixes-deployment.md`).

## Before the generator push (his confirmation, before his yes)

The workflow runs on the runner on the host. Whether the runner is running is his to confirm before he says yes to the release: no agent
reads it, and nothing is asked of the host for it. If it is not running, start it before the push, the way he did at chain 015's release.

## Step A: only if the job is queued after the push (devops reports it)

1. **What and why**: devops pushes `prod` and then reads the host's generator start line for 12 minutes (12 reads, 60 s apart, read-only,
   `claude-ro`). If no start line later than the push appears, the job is queued because the runner is down. Start the runner so the queued
   job runs. Until it runs, nothing of the generator's change is deployed, which is the safe order for this release (the website is already
   live; the old generator still deletes before it renders).
2. **Where it runs**: the generator host (`hooks-pig`), as the user that runs the GitHub Actions runner for `hooks-gg/preview-image-generator`.
3. **The command**: the one he used at chain 015's release (about 22:02Z on 2026-11-08, "runner started. deploy complete"). The record holds no
   command for it, so none is printed here and none is invented. If the runner was configured as a service, starting that service is the act.
4. **What he should see**: the queued workflow run for the `prod` push starts on the runner and finishes (`npm ci --omit=optional`, `npm run build`,
   the deploy script that reloads the app).
5. **What to send back**: "runner started" in the session that asked. Devops then reads the host's start line (read-only) and records it.
