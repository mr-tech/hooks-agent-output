---
UUID: ce9ae147
Status: Open
Status-Detail: "Carries chain fix-website-dependency-audit's one post-deploy row B-1 and its two Assumptions Not Checked: the first scheduled run (06:43Z 2026-11-21) of tools/website-dependency-audit.js under cron's environment. Read by scheduled reader R1 (kit verification/fix-website-dependency-audit/post-deploy/kit/). Gates nothing: the crontab line is installed and the chain is closed."
Owning-Stage: devops
Review-Trigger: "the scheduled reader R1's fire after the tool's first scheduled run (07:13Z, 2026-11-21 to 2026-11-28): its completion row, last cell run-R1-complete, in this record's changelog"
---

# Handoff: fix-website-dependency-audit, first scheduled run (B-1)

## What is seeded

Chain `fix-website-dependency-audit` installed a daily crontab line at 2026-11-21T01:11Z
(`43 6 * * *`, UTC) that runs `tools/website-dependency-audit.js` over website `origin/master`'s dependency files and
appends undispositioned advisories to `INBOX.md`. Its end step was the first scheduled run's log. That run is at
2026-11-21T06:43Z; steering ruled that the chain closes on this carrier instead of waiting for it. The row and both
Assumptions Not Checked travel here, in full. The deployment record
(`deployment/closed/fix-website-dependency-audit-deployment.md`) holds none of them open.

### B-1 (reader R1)

- **Class**: post-deploy-observable (QA's register row, `qa/closed/fix-website-dependency-audit-qa.md`, "Blocking-condition register").
- **Condition**: criteria 3 to 5 and 8 hold under cron's environment: the first scheduled run reads a non-empty audit.
- **Instrument**: `bash verification/fix-website-dependency-audit/post-deploy/kit/read.sh <out-file>`, which prints the lines of `/home/dev/.local/state/website-dependency-audit/cron.log` and counts them. The instrument was shown working in `verification/fix-website-dependency-audit/live-run-c7b6898.txt` and, at the installed tree, in `verification/fix-website-dependency-audit/devops-smoke-cron-env-5d0baf8.txt` (a hand run under `env -i`, scratch inbox and state; not the scheduled run).
- **Earliest decidable**: the first `cron.log` line written by the 06:43Z run (the log folder was empty at install: the smoke run wrote to scratch files).
- **Predicted**: one line `<UTC minute>Z website 76da25c (origin/master; remote head 76da25c): advisories 81, undispositioned 0, newly reported 0 []`. The local clone's `origin/master` was `76da25c` at install and differs from the seeded `d1bb9b0` only by a removed npm `overrides` block, so N = 81 and U = 0 are predicted unless advisories were published since. U > 0 is correct behaviour, with U entries in `INBOX.md`; N other than 81 with every advisory dispositioned is also correct. One observation refutes.
- **Failure mode**: a `website-dependency-audit failed:` line (the tool works, the environment does not: network, `HOME`, `PATH`), which also puts one failure entry in `INBOX.md`; or `advisories 0` (a degraded audit that looks quiet, which the tool cannot see).
- **Owner**: devops (R1). **Result**: _blank_

### The two Assumptions Not Checked

1. **QA** (`qa/closed/fix-website-dependency-audit-qa.md`, "Assumption Not Checked"): real `pnpm audit --prod --json` output over `76da25c`'s lockfile has the shape the stub's fixture reproduces. Closes true on a line with `advisories N`, N > 0; false on `failed: pnpm audit gave no advisories` or `advisories 0`.
2. **Code review** (`code-review/closed/fix-website-dependency-audit-code-review.md`, "Assumption Not Checked"): cron's environment at 06:43Z (registry reach, `HOME` for pnpm's config and store, `/usr/local/bin` node on `PATH`) lets `pnpm audit` answer as it did under the reviewer's `env -i` run. Closes true on any `advisories N` line; false on a `failed:` line.

## Mechanism

| Item | Line |
|---|---|
| Reader R1 | brief `verification/fix-website-dependency-audit/post-deploy/kit/briefs/R1.md`, kit `kit.json` beside it, run by `node ~/.claude/tools/post-deploy-launcher.js` |
| Crontab line | `13 7 21-28 11 *`, tagged `# fix-website-dependency-audit R1`, fires daily 07:13Z from 2026-11-21 to 2026-11-28; the launcher skips every fire after the completion row exists. 07:13Z is thirty minutes after the tool's run, which takes under a minute |
| Fire log | `verification/fix-website-dependency-audit/post-deploy/kit/out/fires.log` |
| Deadline | the 2026-11-28 fire: if `cron.log` still has no line from a scheduled run, B-1 is written `NOT READ` with the completion row |

## Evidence

- Install, mechanism and smoke: `deployment/closed/fix-website-dependency-audit-deployment.md`; captures `verification/fix-website-dependency-audit/devops-crontab-after.txt`, `devops-smoke-cron-env-5d0baf8.txt`.
- The tool's lines: `tools/website-dependency-audit.js`, the `console.log` of the run line and the `failed:` line on `console.error`.

## Origin

QA Phase 2 register row B-1 and the two Assumptions Not Checked above; devops brief `steering/fix-website-dependency-audit-brief-devops.md`; steering's instruction of 2026-11-21 to carry the first-run read on a post-deploy handoff.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T01:13 | devops-fix-website-dependency-audit | Created at the chain's close. B-1 and both Assumptions Not Checked carried in full; reader R1's kit and crontab line installed; kit smoke recorded in the next row. |
| 2026-11-21T01:14 | devops-fix-website-dependency-audit | Reader R1 armed: crontab line `13 7 21-28 11 *` installed (live crontab: 2 lines added, none removed; `verification/fix-website-dependency-audit/post-deploy/kit/out/crontab-installed-lines.txt`). `node ~/.claude/tools/post-deploy-launcher.js verification/fix-website-dependency-audit/post-deploy/kit/briefs/R1.md --smoke` exit 0, `SMOKE OK`. `read.sh` run once against the absent log: `cron_log_present=no`. The row is open until R1's completion row. |
