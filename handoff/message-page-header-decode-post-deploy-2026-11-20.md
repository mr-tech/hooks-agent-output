---
UUID: ff56b327
Status: Open
Status-Detail: "Carries post-deploy row P-1 of chain fix-message-page-header-decode: one GET of the production image optimiser after website master moves to 7923a1d. Pushed 2026-11-20T02:34:40Z (ledger E-WEBSITE-PUSH filled); first P1R fire at or after 02:49:40Z is 04:07Z. Read by the scheduled reader P1R."
Owning-Stage: devops
Review-Trigger: the P1R scheduled reader's fire at least 15 minutes after the E-WEBSITE-PUSH ledger cell is filled (the deploy of website master 7923a1d)
---

# Post-deploy row P-1 — `/_next/image` after the direct `sharp` was removed (fix-message-page-header-decode)

## What is seeded

Chain `fix-message-page-header-decode` removes the direct `sharp` (0.32.x) from website. Next.js 16.1.6 keeps its own `sharp` 0.34.5
(`pnpm-lock.yaml`, 2 lines at base and fix). On this box Next's optimiser answers from its own copy (security, run 6). Whether **Vercel's**
production `/_next/image` answers without the direct copy is not checked on any build: it is the code review's and security's
Assumption Not Checked. If it is false, every image drawn through `next/image` (avatars, icons) fails after the deploy: an availability
fault, not an exposure.

**Row P-1** (a read an agent makes; reader: the scheduled headless run P1R, stage devops):

| Field | Value |
|---|---|
| Prediction | After the push the request below answers 200 with `content-type: image/png`, as it did before the push |
| Instrument | `bash verification/fix-message-page-header-decode/post-deploy/kit/p1-read.sh <out-file>`: `curl -s -o /dev/null -D - 'https://hooks.gg/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Fembed%2Favatars%2F0.png&w=64&q=75'` (the same GET steering made before the push, headers at `verification/fix-message-page-header-decode/steering/next-image-headers-pre-push.txt`: 200, `image/png`, 495 bytes, `server: Vercel`, `x-vercel-cache: MISS`) |
| Pass | 200 and `image/png` |
| Fail | a 5xx, or any other status or type. A 5xx means images broke with the `sharp` removal. That is a rollback question for the owner, never the reader's act |
| When decidable | at least 15 minutes after the push (the Vercel build must be live; an earlier read answers from the old build) |
| Deadline | the P1R fire on 2026-11-22. With E-WEBSITE-PUSH still blank, the result is `NOT REACHED` |
| Result | _(blank until a read that reaches the new build)_ |

- **Interim** (2026-11-20T04:07:06Z): NOT DECIDING, curl_exit=0, `HTTP/2 200`, `image/png`, 495 bytes, but `x-vercel-cache: HIT`, `age: 6531`, `date: 02:18:15 GMT` = steering's pre-push read, so the answer is the cached pre-push entry (max-age 14400, expires about 06:18Z) and does not exercise the optimiser on `7923a1d`. Not recorded as PASS; next fires read again (a MISS or a `date` after 02:34:40Z decides). Output `verification/fix-message-page-header-decode/post-deploy/kit/out/P1R.20261120T040706Z.txt`.

**Event ledger** (filled by devops at Phase 2C, from `git ls-remote origin master` after the push):

| Event | When | SHA |
|---|---|---|
| E-WEBSITE-PUSH (website `master` moved to `7923a1d`) | 2026-11-20T02:34:40Z | `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` |

**Schedule.** Crontab line (installed at Stage 1; the gate in the brief makes every fire before the push a stop):

```
7 */2 20-22 11 * cd /usr/local/bin/hooks/agent-output && /usr/local/bin/node /home/dev/.claude/tools/post-deploy-launcher.js verification/fix-message-page-header-decode/post-deploy/kit/briefs/P1R.md >> verification/fix-message-page-header-decode/post-deploy/kit/out/cron.log 2>&1 # chain fix-message-page-header-decode P-1
```

Brief `verification/fix-message-page-header-decode/post-deploy/kit/briefs/P1R.md`; kit `…/kit/kit.json`; completion token
`run-P1R-complete`. First fire after installation: 2026-11-20T04:07Z. The line is removed when the carrier closes.

## Evidence

- Pre-push read: steering, 2026-11-20T02:18:15Z, `steering/website-deps-review-rulings.md` block "2026-11-20T02:18Z"; headers at
  `verification/fix-message-page-header-decode/steering/next-image-headers-pre-push.txt`. Its reading was an inference from headers,
  not proof; this row's read is the deciding one.
- The Assumption Not Checked: `code-review/closed/fix-message-page-header-decode-code-review.md` (§ Assumption Not Checked) and
  `security/fix-message-page-header-decode-security-audit.md` (§ Relied on, not checked here).

## Origin

devops Stage 1 for chain `fix-message-page-header-decode`, from the brief `steering/fix-message-page-header-decode-brief-devops.md`
(post-deploy row P-1).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T02:25 | devops (devops-hooks-fix-message-page-header-decode) | Opened at Stage 1 with row P-1, the event ledger, the P1R kit and its crontab line. |
| 2026-11-20T02:34 | devops (devops-hooks-fix-message-page-header-decode) | Website `master` moved to `7923a1d` (`release-move.js` exit 0 at 02:34:36Z to 02:34:40Z; `git ls-remote origin refs/heads/master` read back `7923a1d9…`). E-WEBSITE-PUSH filled; the P1R gate (push plus 15 minutes) opens at 02:49:40Z. |
| 2026-11-20T04:07 | devops (P1R scheduled reader) | P1R read 20261120T040706Z: 200 image/png but served from the pre-push cache entry (HIT, date 02:18:15Z); undecided, no PASS written. read-20261120T040706Z |
| 2026-11-20T06:07 | devops (P1R scheduled reader) | P1R read 20261120T060707Z: curl_exit=0, 200 image/png, again the pre-push cache entry (HIT, age 13732, date 02:18:15Z, same state as the 04:07Z Interim, so no new Interim line); undecided, no PASS written; the entry expires about 06:18Z, so the next fire reads past it. read-20261120T060707Z |
