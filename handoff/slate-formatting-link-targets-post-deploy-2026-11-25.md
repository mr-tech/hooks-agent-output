---
UUID: ba01be8d
Status: Open
Status-Detail: "Plan 019's one post-deploy row, QA register B-5 (link targets keep their emoji on production), is unread. website master was pushed 2026-11-25T17:39Z; the scheduled reader B5R reads it at its first fire at least 15 minutes later."
Owning-Stage: "the headless devops reader B5R, scheduled by crontab (kit verification/019/post-deploy/kit/); a failed read goes to the owner through the steering thread"
Review-Trigger: "the first fire of reader B5R at least 15 minutes after the production push of website master carrying plan 019"
---

# Plan 019 post-deploy row: link targets keep their emoji on production (B-5)

## What is seeded

One row of plan 019's blocking-condition register (`qa/019-slate-formatting-discord-engine-qa.md`, closed at Stage 1 and then under
`qa/closed/`). It gates nothing of the release act. It is decided on the first production read after the deploy.

**B-5, post-deploy-observable.**
- **Condition.** AC-4.2 in production: the plan's post-deploy observable, from the owner's link report (D-2).
- **Instrument as the register states it.** Stage browser on `hooks.gg/message/m/0/edit`: type `https://x.y🙂 [a](https://x.y/🙂)`,
  blur, read `main a[href]` (minted run, P-Q13).
- **Instrument as scheduled.** `node verification/019/post-deploy/kit/b5-read.js <out.json>`: the same steps in a fresh signed-out
  headless Chromium. It dismisses the log-in prompt and clicks the message content to mount the editor. Nothing is saved or sent.
- **Instrument correction.** P-Q13's filter kept only hrefs containing `x.y`. The fixed first target is `https://x.xn--y-bz3s/`, which
  does not contain it, so that filter would report one anchor on a fixed site. The script keeps hrefs beginning `https://x.y` or
  `https://x.xn--y-`.
- **Earliest-decidable condition.** The production push of website `master` carrying the release tip has been made (event
  E-WEBSITE-PUSH below). The push is the deployment; no host-side commit read is part of this row.
- **Predicted, unfixed** (measured on production before the push): `https://x.y:slight_smile` and `https://x.y/:slight_smile:`.
- **Predicted, fixed:** two anchors exist; no `:slight_smile` in either; the hrefs are the engine's `url` values,
  `https://x.xn--y-bz3s/` and `https://x.y/%F0%9F%99%82`.
- **Failure mode.** If production still shows `:slight_smile`, the deploy did not carry the fix, or carried it to a commit that is not
  serving.
- **Deadline.** The first fire at least 15 minutes after the push. An unread result (no browser, no page, no editor) is not a verdict;
  the next fire reads again.

**Later gate notes that name B-5.** Revision 2 re-key: the fixed form requires two anchors to exist. QA M4: the fixed label is the
punycoded address, as Discord draws it. QA Phase 1 § Assumption Not Checked: the 2026-11-23 unfixed reading assumed production served
`af3d95a`. That limb is superseded by the baseline below, taken again before this release's push.

**Result:** (blank until read)

## Event ledger

Devops fills `When` in the round that pushes. The reader's gate opens 15 minutes after it.

| Event | When (UTC) | Ref and SHA | Recorded by |
|---|---|---|---|
| E-WEBSITE-PUSH | 2026-11-25T17:39 | website `master` `48eb60a02f4af4f27f1a5426bbe7e58301b1d148` | devops-019 |

## Schedule

- Crontab line, installed 2026-11-25 at Stage 1: hourly at minute 23, 25 to 30 November and all of December 2026. It runs
  `verification/019/post-deploy/kit/gate.sh`, and only when the gate opens,
  `node ~/.claude/tools/post-deploy-launcher.js verification/019/post-deploy/kit/briefs/B5R.md`.
- Gate skips are logged outside the record, at `/home/dev/.local/state/019-b5/gate.log`.
- Browser library: `playwright-core` from a cache directory on this box (the script lists three locations). If all are gone, the read
  reports UNREAD.
- Remove the crontab line when this carrier is closed.

## Evidence

- Production baseline before the push, 2026-11-25T16:41Z: `verification/019/devops/b5-baseline-before-push.json`. Two anchors,
  `https://x.y:slight_smile` and `https://x.y/:slight_smile:`, no page or console error. It equals QA's 2026-11-23 reading
  (`verification/019/qa/prod-link-href-unfixed.txt`).
- The same script against a local build of website `48eb60a` (public environment values set to placeholders),
  `verification/019/devops/b5-dryrun-local-48eb60a.json`: `https://x.xn--y-bz3s/` and `https://x.y/%F0%9F%99%82`. One console 404, the
  Vercel Speed Insights script on a local server (as UAT recorded).
- UAT's B-2 on `48eb60a` read the same two fixed values (`uat/019-slate-formatting-discord-engine-uat.md`).

## Origin

Plan 019 Testing Strategy (post-deploy observable) and QA register B-5; the carrier is devops's Stage 1 act (plan critique F-15; UAT
§ Next Actions).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-25T16:44 | devops-019 | Created at Stage 1 with B-5 carried in full, the production baseline, the dry run and the schedule. |
| 2026-11-25T17:39 | devops-019 | E-WEBSITE-PUSH filled: pushed at 17:39:32Z (origin/master reflog, `update by push`). |
