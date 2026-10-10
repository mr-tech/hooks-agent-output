---
UUID: 7be7102d
Status: Open
Status-Detail: "Carries the post-deploy rows for the website v1 guild-messages auth fix, deployed at ddbd750. B-3 PASS (401, 16:52Z). B-4 (Statbot's own calls still succeed) is open, awaiting the owner's dashboard check."
Owning-Stage: devops (Stage 2 post-release, for B-3 and B-4's fallback); the owner is B-4's observing subject
Review-Trigger: when Vercel reports the production deployment of the website master push carrying ddbd750 as live
---

# Post-deploy checks: website v1 guild-messages auth fix

## What is seeded

The fix makes `website`'s two v1 guild-messages endpoints require Statbot's key. Production stays exposed until the fix deploys. Two rows from the chain's blocking-condition register can only be decided after the deploy, so this handoff carries them. Each is written out in full below.

**B-3: the deployed list endpoint refuses an unauthenticated request** (criterion C-1 on the deployed build).
- **Instrument.** Exactly one unauthenticated `GET https://hooks.gg/api/v1/guilds/9999999999999999999/messages`. Record the status and the body length only. The owner sanctioned this one request for devops (rulings, "B-2 and production probes", option "Yes, both"). The in-session-sanction waiver (2ba5a88, widened at 1d6bbb7) does **not** cover it. So the session that sends it must hold the owner's sanction for that request.
- **Fallback.** The owner opens that URL in a browser.
- **Earliest-decidable.** Vercel reports the production deployment for the merge commit as live.
- **Predicted value.** `401` with a 0-byte body. The unfixed tree answers `200` with a 2-byte `[]` (measured in the research, F4), so one observation tells the two apart.
- **Failure mode.** Still `200` means the deploy did not ship the guard (a stale or failed build), and the exposure is live.

**B-4: Statbot's own authenticated calls still succeed** (C-2). It is the liveness row beside B-3's refusal, and it runs after B-3 passes.
- **Instrument.** The owner opens the Statbot dashboard's statrole editor for a guild that has hooks.gg messages and sees the hooks.gg message list populate. That path goes statbot-api → `/api/v1/guilds/:id/messages`.
- **Fallback.** The Vercel request log for `/api/v1/guilds/*/messages*` after the deploy time: count 401s from Statbot's egress against 200s.
  - Liveness precondition: at least one Statbot call appears in the window.
  - Deadline: 24 h after the deploy.
- **Predicted value.** The list populates.
  - One populated list refutes a key or host mismatch for statbot-api, by construction.
  - statroles is covered only by the fallback, or by a statrole notification that sends.
- **Failure mode.** The list errors, or it is empty where messages exist. That means the keys or the host differ. The remedy is to revert (Vercel promote of the previous deployment) or fix the env.
- **Residual limits B-4 also observes.** These are from B-2's file-only read (`deployment/fix-v1-guild-messages-auth-deployment.md`, "B-2 execution record"):
  - a second `HOOKS_HOST=` line with another value cannot be excluded by the count;
  - a running statbot-api process may hold a pre-reload environment.

When both rows are terminal, record them in the deployment record's Post-Release Status and close this handoff `Addressed`.

## Evidence

- The register as minted: `qa/closed/fix-v1-guild-messages-auth-qa.md` at agent-output 9b4de7e, "Blocking-condition register", rows B-3 and B-4.
- Pre-release state when this handoff was created:
  - B-1 = "match" (owner's words, rulings block "B-1 answered: key match (his words)", 5d4cb30);
  - B-2 = 1 on statbot-api production-blue, production-green and production-premium, and on statroles (deployment record, 08:37:12Z);
  - the redirect probe `http://hooks.gg/` → 308 to `https://hooks.gg/` (same host; deployment record, 08:32:08Z).
- Release tip: website `ddbd750`, Release Verified (`qa/website-2026-10-10-release-tip-qa.md`, 0006119).

## Origin

devops Stage 1, step 8, chain `fix-v1-guild-messages-auth`. The raising document is `deployment/fix-v1-guild-messages-auth-deployment.md`. The QA register named this carrier as `fix-v1-guild-messages-auth-post-deploy`; this file adds the record-date suffix.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-10-10T15:47 | devops (Stage 1) | Created at the Stage 1 commit, carrying B-3 and B-4 from the chain register in full. |
| 2026-10-10T16:52 | devops (Stage 2) | The trigger fired: master = ddbd750 on origin, and the owner said "Yes, it's live". **B-3 EXECUTED, PASS**: 401, 0 B, 16:52:28Z (`deployment/fix-v1-guild-messages-auth-deployment.md`). B-4 is open with the owner (OWNER-QUEUE). |
