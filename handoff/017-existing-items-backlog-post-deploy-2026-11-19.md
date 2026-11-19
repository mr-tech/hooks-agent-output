---
UUID: 26c40e4f
Status: Open
Status-Detail: "Carrier of plan 017's post-deploy rows B-6 to B-11 (QA's register) and the forward items that only production can decide, opened at devops Stage 1: every row unread; neither release is pushed (E-WEBSITE-PUSH, E-GENERATOR-PUSH, E-GENERATOR-START blank). B-7 is read by the scheduled headless reader B7R and B-10 by B10R (kit verification/017/post-deploy/kit/); B-6, B-8, B-9 are his own looks; B-11 is devops's at each deploy. No row gates the release act or the commit."
Owning-Stage: devops
Review-Trigger: "the scheduled readers' completion rows (B7R, B10R: last cell run-B7R-complete or run-B10R-complete in this record's changelog) and his look report on B-6, B-8 and B-9 after both releases are live"
---

# Handoff: plan 017 post-deploy rows (the existing-items backlog)

## What is seeded

Plan 017 (`planning/closed/017-existing-items-backlog.md`, revision 11; at Stage 1 it is closed `Committed`) ships
two repositories: website `master` (Vercel production, by git integration) and preview-image-generator `prod`
(`prod.yml`, self-hosted runner), website first (plan § "Release and rollback"). Neither release is pushed at the time
this record is written, so no row below is decidable. The rows are QA's register's
(`qa/closed/017-existing-items-backlog-qa.md` § "Blocking-condition register (chain 017)", rows B-6 to B-11, class
post-deploy-observable), carried in full; the register is point-in-time and this record's `Result` lines are
authoritative on execution state. UAT gated none of them (`uat/closed/017-existing-items-backlog-uat.md`, § "Blocking-condition register — execution state").

**Mechanism.** The readers are crontab lines (below) run through `node ~/.claude/tools/post-deploy-launcher.js`, each
gated on this record's event ledger (devops writes the ledger at Stage 2; a reader never edits it). The read instruments
are read-only: `vercel logs` under `--scope hooks-gg` for B-7, and `verification/015/pig-host-read.sh` over the
standing `claude-ro` alias `hooks-pig` for B-10 (the bounds are steering's Standing Default of 23:15Z and 23:41Z,
`steering/017-rulings.md`, "further read-only Vercel and `claude-ro` host reads are Standing Defaults, never asked").
The reader's rules are `verification/017/post-deploy/kit/PROTOCOL.md`.

## Event ledger (devops writes; a reader never edits it)

| Event | What it is | When (UTC) | Ref and SHA | Source |
|---|---|---|---|---|
| E-BASELINE-B7 | B-7's instrument run once before any release, to see it work: failure-prefix lines 0; unfiltered window 219 records, 217 of them `/api/auth/session` | 2026-11-19T19:09Z | production deployment before the release; no ref moves | `verification/017/devops/b7-baseline-20261119T1909Z.counts.txt` |
| E-BASELINE-B10 | B-10's instrument run once before the release: section [7] classes all 0, boundary `2026-11-08T22:04:51.196Z`, liveness count 76 | 2026-11-19T19:08Z | generator host before the release | `verification/017/devops/b10-baseline-20261119T1908Z.txt` |
| E-WEBSITE-PUSH | website `master` moved to the release | _blank_ | _blank_ | devops, Stage 2 |
| E-GENERATOR-PUSH | generator `prod` moved to the release | _blank_ | _blank_ | devops, Stage 2 |
| E-GENERATOR-START | the host's generator start line after the push (the generator's deploy evidence, B-11) | _blank_ | _blank_ | devops, Stage 2, read through `ssh hooks-pig` |

## Crontab lines installed (UTC)

| Brief | Fires | Gate | Line |
|---|---|---|---|
| `verification/017/post-deploy/kit/briefs/B7R.md` | 07:17 and 19:17 daily, 2026-11-20 to 2027-01-31 | E-WEBSITE-PUSH filled | three lines tagged `# plan 017 B7R` (Nov 20-30, Dec 1-31, Jan 1-31) |
| `verification/017/post-deploy/kit/briefs/B10R.md` | 07:47 daily, 2026-12-19 to 2027-02-28 | E-GENERATOR-START filled and 30 days past it | three lines tagged `# plan 017 B10R` (Dec 19-31, Jan 1-31, Feb 1-28) |

Smoke (the launcher's `--smoke`, the last act after this record's last write): recorded in the changelog.

## Rows, carried in full from the register

### B-6  (his look)

- **Class**: post-deploy-observable
- **Condition**: RK-1, in his terms: after the website and generator deploys, he edits and saves one of his messages and looks at its preview in the message list.
- **Instrument**: his look. **Subject / fallback**: owner.
- **Earliest decidable**: both deploys live; the running-code precondition B-11 passed.
- **Predicted**: the preview shows the new edit within a minute.
- **Failure mode**: if it still shows the old one, post-response work is not running in production (RK-1).
- **Add-ons carried to this look** (each from a stage's Assumption Not Checked, below): open the preview images of the messages saved in the look and check none shows the line "Invalid message data." (F-5); a frozen preview on this look names RK-1, or F-3's column type, or F-2's function limit; a read-only listing of the saved message's `previews/<id>/` prefix, where he has the read access, shows one object after two saves more than 120 s apart (F-4).
- **Owner**: owner. **Result**: _blank_

### B-7  (reader B7R)

- **Class**: post-deploy-observable
- **Condition**: D-8's failure line is readable in production.
- **Instrument**: Vercel runtime logs for the production deployment, read by devops: `bash verification/017/post-deploy/kit/b7-read.sh <out-prefix>`, which runs `npx vercel@66.2.0 logs -p hooks-gg-website --scope hooks-gg -e production -s 23h --json -q 'preview-image-failure' -n 1000`, with the same window unfiltered as the liveness control (219 records at E-BASELINE-B7; the register's `/api/auth/session` cold-start lines are 217 of them; a `-q` on the path matches nothing, since the path is not in the message). Retention is under one day (`-s 1d` is refused), so the reader runs twice a day.
- **Earliest decidable**: website deploy live. Liveness precondition: met at QA's Phase 1 by a different line (function stderr is readable in production; the tRPC `onError` is development-only), re-shown at every fire by the control count.
- **Predicted**: at AN-4's rate (15 non-successes in 16847 requests; 196 generations in 30 days) the expected count of failure lines is about 0.17 per 30 days. **A zero is evidence of nothing.** This row is a health check; the fixed-versus-unfixed distinction for item 2 is B-4, pre-release (EXECUTED, PASS).
- **Failure mode**: if no failure line can be read even under a planted failure, D-8's countability is not delivered. A member of class "no answer within T" is RK-2's falsifier and F-2's.
- **Owner**: devops. **Result**: _blank_

### B-8  (his look)

- **Class**: post-deploy-observable
- **Condition**: His BC-14 report, in his terms: two tabs on one message in production; in tab 1 he saves and keeps typing at once.
- **Instrument**: his look. **Subject / fallback**: owner.
- **Earliest decidable**: website deploy live; B-11.
- **Predicted**: tab 1 shows no "Message Update Detected"; tab 2 shows it. Unfixed production shows it in tab 1 (AN-1 outside-class member, verified at hook level), so this row distinguishes fixed from unfixed.
- **Failure mode**: if tab 1 shows it, his report stands.
- **Owner**: owner. **Result**: _blank_

### B-9  (his look)

- **Class**: post-deploy-observable
- **Condition**: His M3 and M4 look in production (the plan's "in production by him").
- **Instrument**: his look. **Subject / fallback**: owner.
- **Earliest decidable**: website deploy live; B-11.
- **Predicted / failure mode**: as B-2 and B-3 in the register: the signed-out draft is there after sign-in, open a message, back; message n's unsaved edits are back after a forced sign-out; with unsaved edits, a link away from the editor asks first, Cancel keeps the edits, confirm navigates. If the draft is gone, item 4's main loss is not fixed; if the click navigates without asking, M4 is unfixed.
- **Owner**: owner. **Result**: _blank_

### B-10  (reader B10R)

- **Class**: post-deploy-observable
- **Condition**: RK-7: the generator's failure-stack count after release, against AN-4's 15; each counted `error-status` line is a member (a stored message whose `/preview` render answers an error status and keeps a stale image).
- **Instrument**: `bash verification/017/post-deploy/kit/b10-read.sh <out-file>` (`verification/015/pig-host-read.sh` section [7] over `ssh hooks-pig`): per-class counts of `preview-image-failure id=<id> class=<class> elapsedMs=<n>`, plus the liveness count (QAF-14): "Generated image for message" lines at or after the latest ISO-stamped "Server running at" line, which must be above zero for a zero failure count to mean anything. The error log is unstamped, so the counts are "since the line shape first existed", which is the deploy.
- **Earliest decidable**: generator deploy live (E-GENERATOR-START), plus 30 days of traffic (about 196 generations).
- **Predicted**: about 0.2 new stacks per 30 days at the old rate. A rise names stored messages whose `/preview` now answers an error status. UAT's O-1 (four `/preview` error-status answers on a local production build, cause not captured; a pre-existing surface, X-22) is the member this read would see in production.
- **Failure mode**: stored messages stop re-imaging and stay stale.
- **Owner**: devops. **Result**: _blank_

### B-11  (devops, at each deploy)

- **Class**: post-deploy-observable (a precondition, not a reader row)
- **Condition**: running-code precondition for B-6 to B-9: production's deployment contains the release commit.
- **Instrument**: `vercel inspect https://hooks.gg` (commit) with `git merge-base --is-ancestor`; the generator host's start line after the `prod.yml` run, read through `ssh hooks-pig`.
- **Earliest decidable**: each deploy. **Predicted**: containment exit 0; a generator start after the push. **Failure mode**: if it is not contained, B-6 to B-9 read old code.
- **Owner**: devops. **Result**: recorded in the deployment record's Release Execution at Stage 2, with the ledger rows above.

## Forward items that only production can decide (from the chain's Assumption Not Checked lines)

Swept by instrument at Stage 1 (`verification/017/devops/assumptions-extract.md`: 18 sections by heading over the QA, UAT, code-review, implementation, plan, critique, analysis and architecture documents). Each is carried here or named discharged in the deployment record.

| ID | Assumption (source) | Falsifier | Reader |
|---|---|---|---|
| F-1 | Production's Postgres evaluates `clock_timestamp()` in an upsert's `RETURNING` after the row lock and orders `COLLATE "C"` as the probe's 16.16 does; its `server_version` is unread (`qa/…-qa.md` § Assumption Not Checked, line 529 of that document; RK-9). No read access to the production database exists on this box. | Two saves of one message commit out of upsert order: an older preview after a quick double save | his B-6 look; not read by devops |
| F-2 | A Preview deployment's post-response lifetime equals Production's; the Preview's function limit is unread, Production's is D-10's 60 s (QA, line 856; M5-0 limb 3 ran on a Preview, lasts to 55 s) | B-7 shows "no answer within T" lines, or B-6 a stale preview on saves whose render was quick | B7R and B-6 |
| F-3 | Production's `Messages."previewImageNonce"` column is `text` as the Prisma schema declares (`qa/…-m5-qa.md` § Assumption Not Checked) | every commit of a 33-character nonce fails ("value too long"): previews never move after the deploy | his B-6 look |
| F-4 | Spaces' `ListObjects` returns `LastModified` for every key of a message's prefix and virtual-hosted addressing reaches the bucket (code review Round 6) | after two saves more than 120 s apart, a listing of `previews/<id>/` holds more than one object; or an SDK error with no `preview-image-failure` prefix after a 204 | his B-6 look with a read-only listing; no credential for a production bucket listing is held or read by devops |
| F-5 | A `/preview` page that falls back to "Invalid message data." answers 200 in production, so the generator stores the fallback and answers 204 (code review Round 7; `qa/…-m6-qa.md`; X-22, D-31) | a saved message's preview reads "Invalid message data." with no failure line on either service | his B-6 look |
| F-6 | UAT's O-1: four `/preview` error-status answers on a local production build, cause not captured. His selection 19:13Z, `steering/017-rulings.md` block "2026-11-19T19:13Z": "Agent: release, watch prod (Recommended)": the release goes ahead and B-6 and B-10 carry it. `/preview` is unchanged 1ad625e..7293a35; the generator's `error-status` means any non-2xx or no response | B-10's `error-status` count above 0; on B-7, a failure line of class `status-500` or another non-ok class; a preview image that stays stale on B-6 | B10R, B7R and his B-6 look |

Items the release itself, not production, discharges (named in the deployment record, not carried here): the M1 fresh-install, M7-b re-lint on the merged tip and call-deletion mutant set are QA Phase 3's at the release tip (Stage 2).

## Evidence

`verification/017/devops/` (baselines, the assumption extract), `verification/017/post-deploy/kit/` (kit, scripts, briefs). QA register: `qa/closed/017-existing-items-backlog-qa.md`. UAT: `uat/closed/017-existing-items-backlog-uat.md`.

## Origin

Created at devops Stage 1 for plan 017 (`deployment/017-existing-items-backlog-deployment.md`), as devops.md Stage 1 step 8 requires: the register's rows B-6 to B-11 name "carrier handoff created by devops at Stage 1" as their carrier, and RK-7 names a crontab line installed at Stage 1 for B-10.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T19:11 | devops-hooks-017 | Opened at Stage 1. Rows B-6 to B-11 and F-1 to F-6 carried; ledger blank for the pushes; kit written under `verification/017/post-deploy/kit/`; both instruments run once as baselines (E-BASELINE-B7, E-BASELINE-B10). Crontab: six lines installed (three B7R, three B10R; `crontab -l` read back identical to the file written; the prior crontab is untouched above them), launcher `--smoke` exit 0 for both briefs, run after this row. The stamp gate refused this record's first row (typed 19:20 against a 19:11Z clock); re-stamped from `date -u`, a format standard satisfied. |
