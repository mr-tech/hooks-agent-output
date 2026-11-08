---
UUID: 942c237b
Status: Open
Status-Detail: "Carries chain 015's RK-8 past the chain: preview-image-generator's M8-d fix reaches a private member of generic-pool (_waitingClientsQueue, with a callable dequeue), which a generic-pool release within the ^3.9.0 range can rename or remove. The owner accepted the reach with a startup guard (D36, rulings 09:25Z). Minted at Stage 1 so CR-39, AF-32 and L-C9-4 have a carrier when the plan closes."
Owning-Stage: devops
Review-Trigger: when a preview-image-generator commit changes the generic-pool version its package-lock.json resolves (3.9.0 at 8de2b53); the same event triggers handoff/preview-image-generator-host-security-posture-2026-11-08.md
---

# generic-pool private-field reach in the preview generator (RK-8)

## What is seeded

M8-d of plan 015 (preview-image-generator, `src/getPool.ts`) attaches a creation-error handler through generic-pool's documented `factoryCreateError` event, and drains the failed request by reaching `_waitingClientsQueue.dequeue`, which is not public. The lockfile resolves generic-pool 3.9.0, the newest published version at `8de2b53`, and `prod.yml` installs with `npm ci`. A later minor or patch release inside `^3.9.0` can rename or remove the field or its `dequeue`. The owner accepted the reach with a startup guard (D36: `checkPoolShape()` in `src/server.ts`, called before `server.listen`).

**Signature at the M8 tip (`8de2b53`).** With the member absent, the generator writes the line `generic-pool no longer exposes _waitingClientsQueue.dequeue` once, with `console.error` (so to stderr, which is PM2's error log), before it is ready, attaches no handler, and keeps serving. A failing Chromium launch then leaves the waiting acquire pending while the pool retries creation: F-34's original hang. The owner accepted that cost (CR-34, "record it, no code", rulings 10:14Z). Measured by code review on Node v24.14.0 in an export with no browser binary: the acquire stays pending, 3,700 to 4,700 launches a second, about 36,000 stderr lines a second (`verification/015/cr-m8-probes/drift-mutant-8de2b53-{1,2,3}.txt`; controls `drift-control-8de2b53-*.txt` launch only the pool's minimum). Production's engine (Node 18.17.1) and failure mode (Chrome 116 present: a crash or timeout) are unmeasured, so its rate and log volume are unknown.

**Residue, a bounded class (critique L-C9-2, CR-33, QA's Assumption Not Checked at `b21c7b5`).** A release that keeps `_waitingClientsQueue` and a callable `dequeue` but changes what they mean (`factoryCreateError`'s timing, what `dequeue` returns, whether the dequeued request's `reject` rejects it) writes no line. The signature is M8-d (a) failing with no startup line. The startup check cannot see it; the M8-d probe can.

## The read, at the trigger

The reader is the devops session deploying that commit. It reads, in this order:

1. **The startup line, in both PM2 logs, the error log first.** The error log is `/etc/.pm2/logs/hooks-image-preview-generator-prod-error.log`; the out log is `.../hooks-image-preview-generator-prod-out.log`. Count with `grep -cF 'generic-pool no longer exposes _waitingClientsQueue.dequeue'` over the whole file, with the file's line count shown in the same session. Predicted: 0. Over `claude-ro` on `hooks-pig`: reads only, no pm2 command, no write.
2. **The M8-d probe**, a failing factory with one waiting request: `verification/015/m8-local-probe/probe.cjs` (its two M8-d pool cells), run through `verification/015/m8-local-probe/run.sh <repo> <scratch> <sha> <out>`. It runs locally, in an export of the commit being deployed, under `unshare -rn`. A failure of M8-d (a) here with no startup line is the residue class above.
3. **The drift probe**, `verification/015/cr-m8-probes/run-drift.sh <export dir> <out>`, runs locally on an export of the deployed commit, under the host's Node version (18.17.1; `pm2.log` "Node.js version" line, last written 2026-08-23T04:17:40), **never on the generator host** (AF-32; CR-39; L-C9-4). Its mutant launches thousands of Chromium processes a second, which is not acceptable beside the root, no-sandbox production process, and `claude-ro` is read-only. Its result is that engine's launch rate with a missing binary: a magnitude read for comparison with the measured figures above, not a falsifier. Production's failure mode stays unmeasured.

**Falsifier.** The startup line in either log; M8-d (a) failing at the probe; or, in production, a launch-error burst with requests left unanswered. Passes observed since rev 26: none.

## Facts read at Stage 1 (closes L-C9-4's Assumption Not Checked)

The host's PM2 daemon writes the generator's stderr to a separate `hooks-image-preview-generator-prod-error.log`. The deployed `ecosystem.config.js` (the pre-chain tree, `kill_timeout: 5000`) sets no `error_file`, `out_file` or `merge_logs`, and `combine_logs` is commented out, so PM2 uses its default per-app names. The file exists, root-owned and world-readable, 110 lines, last written 2026-11-08T17:27:00Z, listed from `/etc/.pm2/logs` (`verification/015/devops-stage1-host-read-2026-11-08T2128Z.txt`). The path was established by that directory listing, not by reading `pm_err_log_path` from `dump.pm2`, because the owner's filtered-extract ruling (OQ-H, rulings 05:24Z) allows only name, `kill_timeout` and `shutdown_with_message`.

## Evidence

- Plan: `planning/015-bug-evaluation-fixes.md` RK-8, M8-d (d), M9 "RK-8 carrier", D36.
- Code review: Round 18 sub-entry (`3540028`, CR-34), Round 21 (`d7b0c57`, CR-39). Architect: AF-30, AF-31, AF-32 (`ca92900`). Critique cycle 9 pass 3 (`8b7f9b0`, L-C9-4).
- Owner's ruling: `steering/015-rulings.md` blocks 09:25Z (RK-8, accept with startup guard) and 10:14Z (CR-34, record it).

## Origin

devops Stage 1, chain 015 (plan M9 names devops as minting this at closure; minted at Stage 1 so the plan's open Planner-batch rows CR-39, AF-32 and L-C9-4 have a carrier when it closes). The raising document is `deployment/015-bug-evaluation-fixes-deployment.md`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T21:30 | devops-hooks-015 (Stage 1) | Created, carrying RK-8's read in full with CR-39, AF-32 and L-C9-4 folded into its text. |
