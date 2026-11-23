---
UUID: 26c40e4f
Status: Open
Status-Detail: "Carrier of plan 017's post-deploy rows B-6 to B-11 (QA's register) and the forward items that only production can decide, opened at devops Stage 1; both releases are live (E-WEBSITE-PUSH 2026-11-19T20:11Z, E-GENERATOR-PUSH 20:14Z, E-GENERATOR-START 20:15Z) and B-11 is executed; B-6 to B-10 are unread but B-7's first post-website read is 0 failures. B-7 is read by the scheduled headless reader B7R and B-10 by B10R (kit verification/017/post-deploy/kit/); B-6, B-8 and B-9 were moved to a test-account session by his selection (017 rulings block 2026-11-20T02:41Z) and executed PASS on 2026-11-20 (aaccb15), their item handoffs closed Addressed; B-11 is devops's at each deploy. Open: B-7 and B-10. No row gates the release act or the commit."
Owning-Stage: devops
Review-Trigger: "the scheduled readers' completion rows (B7R, B10R: last cell run-B7R-complete or run-B10R-complete in this record's changelog) and his look report on B-6, B-8 and B-9 after both releases are live; for F-7, the next UAT walk that opens a delete warning or the image dialog in a real browser, or the next change to ImageUploader.tsx or WarningDialog.tsx"
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
| E-WEBSITE-PUSH | website `master` moved to the release | 2026-11-19T20:11:47Z | website `master` `787bec5627702d2881b826e596ec2b8f8853c4fa` (was `1ad625e`); production deployment `dpl_37f5wm52P7tqpRaMyPGFtk5cU6h8` created 20:11:49Z, Ready by 20:13:06Z | devops, Stage 2 (`release-move.js` exit 0; `verification/017/devops/b11-website-inspect-787bec5.txt`) |
| E-GENERATOR-PUSH | generator `prod` moved to the release | 2026-11-19T20:14:17Z | generator `prod` `8512a1d003af7fdbce56b85ef27218dd885becd1` (was `8de2b53`); `master` followed at 20:15:48Z (same SHA) | devops, Stage 2 (`release-move.js` exit 0) |
| E-GENERATOR-START | the host's generator start line after the push (the generator's deploy evidence, B-11) | 2026-11-19T20:15:11.173Z (stop 20:15:08Z; deploy boundary) | deployed checkout's prod ref `8512a1d003af7fdbce56b85ef27218dd885becd1` (B-11 limb 2, 20:15:37Z) | devops, Stage 2, read through `ssh hooks-pig` (`verification/017/devops/g9-limb1-poll.txt`, `g9-limb2-read.txt`, `g10-pig-host-read-after-017.txt`) |

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
- **Owner**: owner. **Result**: **EXECUTED 2026-11-20 (02:47–02:50Z), PASS**, by a test-account session on his ruling (`steering/017-rulings.md` block 2026-11-20T02:41Z; uat-hooks-017-looks). Production was website `7923a1d` (contains `787bec5`, `merge-base --is-ancestor` exit 0) and generator `8512a1d`, read by `git ls-remote`. Message 6024 was edited and saved twice, at 02:47:03.793Z and 02:49:23.831Z (140 s apart). Each time the list card's preview src moved to a new nonce (`previews/6024/v1795142824794…`, then `v179514296486…`) by the first poll, about 6 s after the save, and it then held. The image after save 2 reads the edited line ending in the marker; after save 1 the line is visibly longer, but the 192 px image is too small to read the marker. Neither image shows "Invalid message data." (F-5 not seen), and no preview froze (RK-1, F-3 and F-2 not seen). **F-4 unverified**: no read access to the bucket listing exists here, and none was attempted. Evidence: `verification/017/post-deploy/looks/b6-1.jsonl`, `b6-2.jsonl`, `README.md`.

### B-7  (reader B7R)

- **Class**: post-deploy-observable
- **Condition**: D-8's failure line is readable in production.
- **Instrument**: Vercel runtime logs for the production deployment, read by devops: `bash verification/017/post-deploy/kit/b7-read.sh <out-prefix>`, which runs `npx vercel@66.2.0 logs -p hooks-gg-website --scope hooks-gg -e production -s 23h --json -q 'preview-image-failure' -n 1000`, with the same window unfiltered as the liveness control (219 records at E-BASELINE-B7; the register's `/api/auth/session` cold-start lines are 217 of them; a `-q` on the path matches nothing, since the path is not in the message). Retention is under one day (`-s 1d` is refused), so the reader runs twice a day.
- **Earliest decidable**: website deploy live. Liveness precondition: met at QA's Phase 1 by a different line (function stderr is readable in production; the tRPC `onError` is development-only), re-shown at every fire by the control count.
- **Predicted**: at AN-4's rate (15 non-successes in 16847 requests; 196 generations in 30 days) the expected count of failure lines is about 0.17 per 30 days. **A zero is evidence of nothing.** This row is a health check; the fixed-versus-unfixed distinction for item 2 is B-4, pre-release (EXECUTED, PASS).
- **Failure mode**: if no failure line can be read even under a planted failure, D-8's countability is not delivered. A member of class "no answer within T" is RK-2's falsifier and F-2's.
- **Owner**: devops. **Result**: _blank_
- **Interim** (2026-11-20T07:17:06Z): first live read, control 302 records, failure lines 0

### B-8  (his look)

- **Class**: post-deploy-observable
- **Condition**: His BC-14 report, in his terms: two tabs on one message in production; in tab 1 he saves and keeps typing at once.
- **Instrument**: his look. **Subject / fallback**: owner.
- **Earliest decidable**: website deploy live; B-11.
- **Predicted**: tab 1 shows no "Message Update Detected"; tab 2 shows it. Unfixed production shows it in tab 1 (AN-1 outside-class member, verified at hook level), so this row distinguishes fixed from unfixed.
- **Failure mode**: if tab 1 shows it, his report stands.
- **Owner**: owner. **Result**: **EXECUTED 2026-11-20 (02:55–02:56Z), PASS 5 of 5**, by a test-account session on his ruling (block 2026-11-20T02:41Z). Two tabs were open on message 6024. In tab 1 the walk saved, then typed into the message-username field 38, 69, 106, 158 and 263 ms after the `message.upsert` POST, so the typing landed in every run. Tab 1 showed no "Message Update Detected" in any run (50 ms poller, 10 s watch). Tab 2 showed it 0.64–0.71 s after each save. No Pusher or console errors; one `ws-us2.pusher.com` socket per tab. An earlier set of 5 runs is void: the name input does not take typed text, so the post-save typing never landed (`b8-attempt1-void.jsonl`). Evidence: `verification/017/post-deploy/looks/b8.jsonl`.

### B-9  (his look)

- **Class**: post-deploy-observable
- **Condition**: His M3 and M4 look in production (the plan's "in production by him").
- **Instrument**: his look. **Subject / fallback**: owner.
- **Earliest decidable**: website deploy live; B-11.
- **Predicted / failure mode**: as B-2 and B-3 in the register: the signed-out draft is there after sign-in, open a message, back; message n's unsaved edits are back after a forced sign-out; with unsaved edits, a link away from the editor asks first, Cancel keeps the edits, confirm navigates. If the draft is gone, item 4's main loss is not fixed; if the click navigates without asking, M4 is unfixed.
- **Owner**: owner. **Result**: **EXECUTED 2026-11-20 (02:56–03:07Z), PASS**, by a test-account session on his ruling (block 2026-11-20T02:41Z). The walk used B-2's committed-edit form: each edit was committed by closing the content editor before the act.
  - **M3-a**: the walk signed out of hooks.gg by clearing its `__Secure-next-auth.session-token` cookie (Discord untouched), then put `m3adraft` in route 0's draft. The draft was kept after a reload and in a new tab. Log in raised no unsaved prompt. After OAuth, opening a message and returning, route 0 still showed `m3adraft`.
  - **M3-b**: `m3bmark` was an unsaved edit on 6024. The cookie was cleared (in production this stands in for the deleted session row of the local walk) and the page reloaded. It landed on route 0 signed out, showing `m3adraft` and not the marker. After signing in again, 6024 opened from the list showed `m3bmark`.
  - **M4**: clicking the "Servers" link (a link away from the editor; the user icon now opens a menu and is not a link) raised "You have unsaved changes!". Cancel kept the edit on `/message/m/6024/edit`. Leave Page went to `/message`. A lone prompt answered by Enter also navigated.
  - **Stated limit**: text typed into the still-open content editor is stored only when the editor closes. The literal runs lost it on reload and on forced sign-out. Pass 1 recorded the same on the local build (UAT document, "Instrument notes"). No criterion here requires it, and it was not compared with `1ad625e`.
  - Evidence: `verification/017/post-deploy/looks/b9.jsonl` (`variant:true` committed, `variant:false` literal), `README.md`.
  - Messages created for these looks (6022, 6023, 6024) were deleted by 03:10:16Z (`cleanup.jsonl`).

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
- **Instrument**: `vercel inspect https://hooks.gg` (commit) with `git merge-base --is-ancestor`; the generator host's start line after the `prod.yml` run, read through `ssh hooks-pig`, **and** (QAF-28 limb, added 2026-11-19) the deployed checkout's prod ref: `bash verification/017/devops/read-generator-deployed-ref.sh <release SHA>` (one read of `/usr/local/bin/hooks-image-preview-generator/deployed/prod/.git/refs/heads/prod` over `claude-ro`; `deploy.sh` copies the Actions checkout, `.git` included, so it is the commit the last deploy copied). The start line alone passes on a crash-restart or a restart after a failed copy; the ref does not.
- **Earliest decidable**: each deploy. **Predicted**: containment exit 0; a generator start after the push; the deployed ref equals the release SHA (exit 0). **Failure mode**: if it is not contained, B-6 to B-9 read old code.
- **Owner**: devops. **Executed 2026-11-19T20:13Z (website) and 20:15Z (generator)**: website `hooks.gg` is the production deployment of `787bec5`, containment exit 0; generator start line `20:15:11.173Z` after the push at `20:14:17Z`, and the deployed checkout's prod ref equals `8512a1d` (both limbs exit 0). **Residue (QAF-28)**: the ref file proves which commit the last deploy copied, not which process is serving; a copy that succeeded and a reload that failed leaves the new ref with an old process, which the start line's stamp (G9 limb 1) covers, so the two limbs together close the gap and neither alone does. **Result**: recorded in the deployment record's Release Execution at Stage 2, with the ledger rows above.

## Forward items that only production can decide (from the chain's Assumption Not Checked lines)

Swept by instrument at Stage 1 (`verification/017/devops/assumptions-extract.md`: 18 sections by heading over the QA, UAT, code-review, implementation, plan, critique, analysis and architecture documents). Each is carried here or named discharged in the deployment record.

| ID | Assumption (source) | Falsifier | Reader |
|---|---|---|---|
| F-1 | Production's Postgres evaluates `clock_timestamp()` in an upsert's `RETURNING` after the row lock and orders `COLLATE "C"` as the probe's 16.16 does; its `server_version` is unread (`qa/…-qa.md` § Assumption Not Checked, line 529 of that document; RK-9). No read access to the production database exists on this box. | Two saves of one message commit out of upsert order: an older preview after a quick double save | his B-6 look; not read by devops |
| F-2 | A Preview deployment's post-response lifetime equals Production's; the Preview's function limit is unread, Production's is D-10's 60 s (QA, line 856; M5-0 limb 3 ran on a Preview, lasts to 55 s) | B-7 shows "no answer within T" lines, or B-6 a stale preview on saves whose render was quick | B7R and B-6 |
| F-3 | Production's `Messages."previewImageNonce"` column is `text` as the Prisma schema declares (`qa/…-m5-qa.md` § Assumption Not Checked) | every commit of a 33-character nonce fails ("value too long"): previews never move after the deploy | his B-6 look |
| F-4 | Spaces' `ListObjects` returns `LastModified` for every key of a message's prefix and virtual-hosted addressing reaches the bucket (code review Round 6) | after two saves more than 120 s apart, a listing of `previews/<id>/` holds more than one object; or an SDK error with no `preview-image-failure` prefix after a 204 | his B-6 look with a read-only listing; no credential for a production bucket listing is held or read by devops |
| F-5 | A `/preview` page that falls back to "Invalid message data." answers 200 in production, so the generator stores the fallback and answers 204 (code review Round 7; `qa/…-m6-qa.md`; X-22, D-31) | a saved message's preview reads "Invalid message data." with no failure line on either service | his B-6 look |
| F-6 | UAT's O-1: four `/preview` error-status answers on a local production build, cause not captured. His selection 19:13Z (plan D-36, R-63 `141b379`), `steering/017-rulings.md` block "2026-11-19T19:13Z": "Agent: release, watch prod (Recommended)": the release goes ahead and B-6 and B-10 carry it. `/preview` is unchanged 1ad625e..7293a35; the generator's `error-status` means any non-2xx or no response | B-10's `error-status` count above 0; on B-7, a failure line of class `status-500` or another non-ok class; a preview image that stays stale on B-6 | B10R, B7R and his B-6 look |
| F-7 | In a real browser, focus stays inside a closing headlessui panel through its 75 ms leave, as jsdom shows (`qa/closed/017-existing-items-backlog-m8-qa.md` § Assumption Not Checked). QA routed it to UAT's B-13 walk as "a look at `document.activeElement` straight after closing the image dialog with Enter"; UAT's pass 2 recorded no such look. If false, W's and I's `enabled` guards are equivalent in a browser and QAF-22's closing-window case specifies a guard no user can reach; the plan's property stands either way, so this gates nothing. No production instrument sees it | In a browser, after Escape or Cancel closes a delete warning or Enter closes the image dialog, `document.activeElement` is outside the dialog before the leave ends | **Owner: UAT.** **Trigger (event): the next UAT walk that opens a delete warning or the image dialog in a real browser, or the next change to `ImageUploader.tsx` or `WarningDialog.tsx` (M8's `enabled` guards), whichever comes first.** Steering's ruling 2026-11-19: give it a carrier |

Items the release itself, not production, discharges (named in the deployment record, not carried here): the M1 fresh-install, M7-b re-lint on the merged tip and call-deletion mutant set are QA Phase 3's at the release tip (Stage 2).

## Evidence

`verification/017/devops/` (baselines, the assumption extract), `verification/017/post-deploy/kit/` (kit, scripts, briefs). QA register: `qa/closed/017-existing-items-backlog-qa.md`. UAT: `uat/closed/017-existing-items-backlog-uat.md`.

## Origin

Created at devops Stage 1 for plan 017 (`deployment/017-existing-items-backlog-deployment.md`), as devops.md Stage 1 step 8 requires: the register's rows B-6 to B-11 name "carrier handoff created by devops at Stage 1" as their carrier, and RK-7 names a crontab line installed at Stage 1 for B-10.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T19:11 | devops-hooks-017 | Opened at Stage 1. Rows B-6 to B-11 and F-1 to F-6 carried; ledger blank for the pushes; kit written under `verification/017/post-deploy/kit/`; both instruments run once as baselines (E-BASELINE-B7, E-BASELINE-B10). Crontab: six lines installed (three B7R, three B10R; `crontab -l` read back identical to the file written; the prior crontab is untouched above them), launcher `--smoke` exit 0 for both briefs, run after this row. The stamp gate refused this record's first row (typed 19:20 against a 19:11Z clock); re-stamped from `date -u`, a format standard satisfied. |
| 2026-11-19T19:17 | devops-hooks-017 | On steering's word at the Stage 2 go (message 2026-11-19, no approval carried): added F-7 (the M8 closing-window focus assumption UAT did not look at) with owner UAT and an event trigger, and put D-36 and R-63 `141b379` beside F-6's selection. Review-Trigger extended for F-7. |
| 2026-11-19T19:54 | devops-hooks-017 | QAF-28 (qa-hooks-017, release-tip record, LOW, routed to devops): B-11's generator limb amended with a containment read. A read-only path exists: the deployed checkout's `.git/refs/heads/prod` over `claude-ro`. Instrument `verification/017/devops/read-generator-deployed-ref.sh`; live baseline and stub dry run in `read-generator-deployed-ref-live-baseline.txt` (current prod `8de2b53` exit 0, `8512a1d` exit 1, unreadable stub exit 3, match stub exit 0, all as predicted). Residue named in B-11. |
| 2026-11-19T20:16 | devops-hooks-017 | Release executed (Stage 2, Phase 2C): ledger rows E-WEBSITE-PUSH, E-GENERATOR-PUSH and E-GENERATOR-START filled; B-11 executed on both repositories (both generator limbs exit 0). B-7's first post-website read: failure-prefix lines 0, control 240 records. Readers B7R and B10R run from their scheduled lines; E-GENERATOR-START starts B10R's 30-day window. His looks on B-6, B-8, B-9 are live from now. |
| 2026-11-19T20:20 | devops-hooks-017 | Smoke after this record's last write (Phase 2D): `post-deploy-launcher.js` `--smoke` on B7R and B10R both `SMOKE OK`, the kit armed, nothing started. The ledger is filled, so B7R's gate (E-WEBSITE-PUSH) is open and its first scheduled fire is 2026-11-20T07:17Z. |
| 2026-11-20T03:12 | uat-hooks-017-looks | Results for B-6, B-8 and B-9 (brief `steering/017-brief-uat-looks.md`; his ruling, 017 rulings block 2026-11-20T02:41Z): all three EXECUTED, PASS, by a test account on live hooks.gg at website `7923a1d` and generator `8512a1d`. F-4 is unverified because no bucket listing access exists. B-9 records a stated limit: text in the still-open editor is not drafted. Evidence is in `verification/017/post-deploy/looks/`. No other row was touched. Reconcile 2026-11-20T03:15: this row's stamp was typed as 03:14, later than its commit `aaccb15` (03:12:57Z), which check-repo flagged (steering's word). It is corrected to the commit minute. |
| 2026-11-20T03:14 | steering-roadmap-hooks | `Status-Detail` replaced (its author, devops-hooks-017, has exited): it still named B-6, B-8 and B-9 as his own looks, which the 02:41Z selection moved and `aaccb15` executed PASS. Their three item handoffs are closed Addressed. Two handoffs opened from the walk's notes: `handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md`, `handoff/deleted-message-url-serves-blank-editor-2026-11-20.md`. |
| 2026-11-21T11:34 | devops-fix-desktop-draft-as-typed | Noted at the release of fix-desktop-draft-as-typed (website master b663b35 -> b68f94c, 2026-11-21T11:32:56Z to 11:33:01Z): row B-9's stated limit (text typed into the still-open content editor was lost on a reload) is the property that chain fixes on desktop for the content editor, the embed author name and the footer. Its read on the saved-message route is row P-1 of handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md (UUID 4bbe68a5), not yet read. No row of this record changed; B-7 and B-10 are not that chain's and keep this record open. |
| 2026-11-23T18:43 | devops-fix-image-uploader-url | F-7's event trigger ("the next change to `ImageUploader.tsx`") fired at the release of fix-image-uploader-url (website master af3d95a -> 5ec0621, 2026-11-23T18:36:07Z). Read once, partial, on live hooks.gg signed out in a clean Chrome (`verification/fix-image-uploader-url/devops/walk/walk-signed-out-results.json`, step W5): after Enter in the image dialog's box closed the dialog, `document.activeElement` read at the press was still the dialog's input (the dialog was still in the DOM) and at 400 ms was a button outside the dialog. That agrees with F-7's premise that focus stays inside the closing panel through its leave; the leave's own window (75 ms) was not sampled, and the walk drove only Enter, not Escape or Cancel on a delete warning. F-7 stays Open; no row changed status. |
