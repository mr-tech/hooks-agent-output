---
ID: n/a
Origin: "release chain/017-existing-items-backlog -> website 7293a3567f8166c6160f31fa4517674c6b19401e, preview-image-generator 8512a1d003af7fdbce56b85ef27218dd885becd1"
UUID: 5f116a62
Verified-At: "7293a35,8512a1d — repos=website,preview-image-generator; the assembled tip is a fast-forward in both repositories, so its trees are the plan-level Phase 2 Verified-At trees (qa/closed/017-existing-items-backlog-qa.md, cf69ef1)"
Status: Release Verification Failed
Status-Detail: "Failed on QAF-29 MEDIUM and QAF-30 MEDIUM (severity floor; test-only remedies, no production change). Handed back to the implementer; the fixed tip 787bec5 is Release Verified in qa/website-787bec5-generator-8512a1d-release-tip-qa.md. QAF-28 LOW routed to devops."
Phase: 3
---

# QA Release-Tip Verification: chain/017-existing-items-backlog → website 7293a35, generator 8512a1d

**Release identifier**: `chain/017-existing-items-backlog` (website `7293a3567f8166c6160f31fa4517674c6b19401e` onto
`origin/master` `1ad625e`; preview-image-generator `8512a1d003af7fdbce56b85ef27218dd885becd1` onto `origin/prod` `8de2b53`).
**Bundled**: one plan, 017 (`planning/closed/017-existing-items-backlog.md`). Its plan-level verdict is
`qa/closed/017-existing-items-backlog-qa.md` (QA Complete at website `7293a35`, generator `8512a1d`, `cf69ef1`); milestone
verdicts are in `qa/closed/017-existing-items-backlog-m1-qa.md` to `-m8-qa.md`. None is reopened (qa-phase-3.md step 1).
**Requested by**: `devops-hooks-017`, message 4cccfcec (2026-11-19), with the Phase 2A addendum after `21d55f9`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T19:51 | qa-hooks-017 (devops-hooks-017's request, message 4cccfcec; addendum after agent-output `21d55f9`) | Phase 3. Tip re-derived. Step 1b: 22 open handoffs, 3 named by this verdict or a production push, each dispositioned. Step 2: no gated time-based set exists. Carried items: the fresh install matches the lockfile (M1's assumption discharged); suite 1853 of 1853 exit 0 and typecheck exit 0 at the tip in that install; M7-b holds at the tip; the call-deletion set kills 53 of 58 (website) and 3 of 3 (generator). New: QAF-28 LOW, QAF-29 MEDIUM, QAF-30 MEDIUM. **Release Verification Failed.** devops's runbook rows B-7, B-10, B-11 read against the register. |
| 2026-11-19T20:08 | qa-hooks-017 (devops-hooks-017's request at website 787bec5) | Successor named | The tip moved to website `787bec5` (the test-only QAF-29/QAF-30 fix). Its verdict, **Release Verified**, is `qa/website-787bec5-generator-8512a1d-release-tip-qa.md`. This document's verdict stands for its own tree, `7293a35`, which will not ship. |

## The tip, re-derived

| Read | Result |
|---|---|
| `git -C website rev-parse chain/017-existing-items-backlog`; `git ls-remote origin master` | `7293a35…`; remote `master` `1ad625e…` |
| `git -C preview-image-generator rev-parse chain/017-existing-items-backlog`; `git ls-remote origin prod` | `8512a1d…`; remote `prod` `8de2b53…` |
| `merge-base --is-ancestor 1ad625e 7293a35`; `… 8de2b53 8512a1d` | exit 0; exit 0 |

Both moves are fast-forwards, so the merge result is the chain tip and its tree is the plan-level `Verified-At` tree. Steps
3 and 5 compare nothing (qa-phase-3.md, opening note): one plan, no second plan to interact with. Step 2's suite was run
anyway, in a fresh install, because M1's Assumption Not Checked routed that run here.

## Step 1b — open-handoff sweep

The record has no `tools/open-handoff-trigger-sweep.py`. **Command**: `python3 -I verification/017/qa-phase3/open-handoff-sweep.py
handoff` (reads each top-level `handoff/*.md` frontmatter, the whole `Review-Trigger` value with folded lines joined;
output `open-handoff-sweep.out`). **Count**: 22 handoff documents, 22 with `Status: Open`. Every trigger was read whole.
A keyword cross-check, `grep -c -i -E '^OPEN\|.*\|.*(prod|deploy|restart|release|push|phase 3|release.tip|QA next runs)'`
over that output, gives 6 (`open-handoff-regex-count.out`). 2 of those are wording hits outside the predicate:
host-security-posture matches "prod" in "product", and save-originating-tab's "production" is about citing evidence.

**Predicate**: the trigger names this verdict or a production push (a deploy or restart) of website or
preview-image-generator. Members: 3. One more fires on this run by its own wording.

| Handoff | Why it is a member | Disposition |
|---|---|---|
| `preview-image-generator-drain-under-load-unobserved-2026-11-08.md` | "the next production stop … (any later prod.yml deploy or restart)" | **Fires at the generator push, after this verdict; owner devops.** The runbook carries it as row G10 (`deployment/017-existing-items-backlog-deployment.md` at `21d55f9`), one `pig-host-read.sh` read after G9. The read the handoff owes is unchanged: `git diff --numstat f616d83 HEAD -- verification/015/pig-host-read.sh` is `32 0`, one hunk after line 255 (sections [1] to [6] intact; the 32 lines are section [7], reviewed in code review Round 7). G10 must record the handoff's five fields from section [6] and section [5]'s orphaned-Chromium count, and disposition the handoff. Routed to devops in this pass's message. |
| `preview-image-failure-shows-broken-not-stale-2026-08-24.md` | "if the generator service is restarted, redeployed" | **Re-read.** Plan 017's handoff table says "Discharged by M5 and M6" (its item 2 is this fix), but the file is still `Open`. Its closure to `Addressed` is the discharging stage's at release, against the post-deploy rows that observe it (B-6 to B-9). No pre-release act is owed. |
| `017-existing-items-backlog-post-deploy-2026-11-19.md` | "after both releases are live" | This chain's own post-deploy carrier, devops's. Post-deploy by construction; never gates the release act. |
| `qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` (not a member; fires because QA runs) | "when QA next runs in this record" | Its one QA item was discharged by `qa-hooks-016` on 2026-11-11 (its changelog). Items 2 and 3 are the analyst's and the record vocabulary's. Nothing for QA. |

The edit-triggered handoffs are outside this predicate, but this release touches files named in one. The generator diff
(`git diff --name-only 8de2b53 8512a1d`: `src/generateImage.ts`, `src/server.ts`) touches no lockfile or workflow, so
`…-generic-pool-private-field`, `…-host-security-posture` and `…-api-key-in-workflow-files` do not fire.

## Step 2 — the gated time-based set

**No gated set exists in this workspace.** `vitest.config.ts` at `7293a35` has two projects (`node`, `dom`) and no flag,
excluded directory or separate config. `git grep -c -E 'skipIf|runIf|describe\.skip|it\.skip|test\.skip|process\.env\.[A-Z_]*(SLOW|TIME|GATED)' 7293a35 -- '*__tests__*'`
matches 0 files (exit 1). So no gated cell runs here and no criterion of plan 017 rests on one.

Residue, not a finding of this pass: the standing suite holds one time-based cell. `git grep -n -E 'useRealTimers|setTimeout\('`
over the tip's tests gives 12 lines: 11 `vi.useRealTimers()` restores, and `NewMessageModal.persist-gate-wiring.test.tsx`'s
`waitForJsonEditor`, which sleeps on real 25 ms timers against a 5000 ms deadline. It last changed at `beba354`
(2026-08-27), and the release diff has 0 `NewMessageModal` paths. Lodged in `INBOX.md` (2026-11-19, qa-hooks-017) for the
next website test-cleanup effort.

## Carried items

### Fresh install at the tip against the lockfile (M1's Assumption Not Checked)

Instruments in `verification/017/qa-phase3/`; export `git archive 7293a35`, deleted at run end.

| Command | Result |
|---|---|
| `unshare -rn pnpm install --frozen-lockfile --offline` in the export (pnpm 10.28.2) | exit 0 (`fresh-install.{out,exit}`). The frozen lockfile satisfies `package.json`. pnpm 10 ignored 12 dependency build scripts (listed in the output). |
| `.pnpm` package membership, fresh against the shared `website/node_modules` (`pnpm-membership.out`) | 1490 and 1490, 1490 common, 0 only in either |
| `cmp` of the installed `node_modules/.pnpm/lock.yaml`, fresh against shared; and fresh against the tip's `pnpm-lock.yaml` | exit 0; exit 0 |
| Control: the same `cmp` against the base `1ad625e` `pnpm-lock.yaml` (+80 −0 to the tip) | exit 1: the comparison sees a real lockfile difference |

**M1's assumption is discharged.** The shared install, which every Phase 2 run and this pass's sweep linked, is the
install the lockfile describes.

| Run, in the fresh install | Result |
|---|---|
| `unshare -rn npx vitest run --reporter=default --reporter=json` | **1853 of 1853, 144 files, exit 0** (`suite-7293a35.{json,out,exit}`) |
| The same against the plan-level capture at `7293a35` (`qa-m2-r4/refresh-7293a35/full-suite.json`), by file path and per-case (title, status) set (`suite-vs-phase2.out`) | 144 and 144 files, 0 only in either, **0 files differing** |
| Control: the same comparison against the `60252be` capture (`suite-compare-control-60252be.out`) | 3 files differing (the M2 rounds' files): the comparison sees a real difference |
| `pnpm run typecheck` (both `tsc` programs) | exit 0 (`typecheck-7293a35.{out,exit}`). The first run exited 2 on `TS2307` for an image module: an export has no Next-generated `next-env.d.ts` or `.next/types` (both gitignored, `.gitignore` lines 86–87). They were copied from the shared tree, as the M7 pass did (`typecheck-generated-inputs.txt`, with the `next-env.d.ts` hash). |

### M7-b re-read at the tip, with `--plant` (code review Round 8's assumption)

| Command | Result |
|---|---|
| `unshare -rn npx eslint . -f json` in the fresh export | exit 1, as at the base. 485 files, 112 with messages, 314 errors, 365 warnings (`nofix-7293a35.{json,out,exit}`) |
| `nofix-7293a35.rel.json`: the same report with the export root rewritten to `/website/` (asserted on every path), because `m7b-check.py` derives relative paths by splitting on `/website/` | 485 files rewritten |
| `m7b-check.py` (blob `2608d4e`) over `git diff --name-status -M 1ad625e 7293a35` (`chain-name-status-7293a35.txt`), base `entry/lint-1ad625e/nofix.json` | **60 lintable changed files (M 25, A 31, R 4); 0 violations** |
| The same with `--plant` | 3 violations, **plants found 3 of 3** |
| The same pair against `qa-m7/nofix-1ad625e-export.json` with its root rewritten (`nofix-1ad625e-export.rel.json`) | 0 violations; plants found 3 of 3 |

**M7-b holds at the tip.** The carried instruction to run against `qa-m7/nofix-1ad625e-export.json` as committed was
wrong in its path form. That report's paths are `/tmp/…/web-1ad625e/…`, so the checker joined no base entry and read 30
false violations, every one with base count 0 (`m7b-check*-7293a35.base-UNJOINED-export-paths.out`, kept as the
evidence). This is a stated limit of the instrument, not a fix: `m7b-check.py` reads a base whose paths lack `/website/`
as empty, without complaint. M7's base reproduction showed the export and the planner's capture identical per file and per
rule, and both bases agree here.

### The call-deletion set (the effort-final Assumption Not Checked)

**Predicate** (`verification/017/qa-phase3/call-deletion-gen.mjs`, blob `8bc0b98`, its header): over each production file
the range changed, restricted to lines `git diff -w -U0 <base> <tip>` marks changed:
- `stmt`: an expression statement whose expression, after parentheses, `await` and `void`, is a call, replaced by `;`;
- `attr`: a JSX attribute or spread attribute, removed;
- `wrap`: a `waitUntil(x)` call, replaced by `x`.

Excludes calls whose value is consumed (operands, arguments, initialisers, returns, expression-bodied arrows) and
whitespace-only changed lines. The TypeScript parser is the export's `typescript` 5.9.3.

**Scope**: website `1ad625e..7293a35`, the 23 production files of `web-production-numstat.txt` (24 less `global.d.ts`, types
only); generator `8de2b53..8512a1d`, `src/generateImage.ts` and `src/server.ts`. 58 and 3 mutants, 0 unplaced
(`*-call-deletion-gen.out`). The known instances fall inside: the fetch effect's `removeDraft` (`index.tsx:224`, and the
siblings at 188 and 259), and `shared.ts:262`'s `waitUntil` (as `stmt` and `wrap`). Committed at `5fb3504` before either
run: mutants blobs `8466288` (website) and `62eefed` (generator).

**Runs** (through a `general-purpose` helper, one after the other):
- Website: `mutation-run.py --sha 7293a35 --dep node_modules --timeout 300 -- unshare -rn npx vitest run`, runner blob
  `b26916e`. Kill table `web-sweep/mutation-table-7293a35…-20261119T192551Z-p2532803.json`. Control 1853, exit 0.
  **53 of 58 KILLED, 5 SURVIVED** (denominator: mutants whose suite started under a passing control; stillborn 0,
  aborted 0). One kill is by the 300 s timeout: `previewImage.ts:116:stmt`, with "deletes its own object and nothing else
  when a later save has committed" and "deletes its own object when the row is gone, and recreates no row" printed as
  failed before the kill.
- Generator: `m6-probe/mutate-probe.py` (`--quick`) over a `git archive 8512a1d` export without `.github`, installed by
  `unshare -rn npm ci --offline` (exit 0, `gen-npm-ci.*`). Control 16 cases, 0 failed. **3 of 3 KILLED**
  (`gen-sweep-run.out`).

**Every survivor, dispositioned.**

| Survivor | Disposition | Evidence |
|---|---|---|
| `index.tsx:153:stmt`: `writeRouteZeroDraft(tmp);` in the `codeMessage` effect deleted | **QAF-29 MEDIUM** (below). Not equivalent: the effect sets `loadedRef.current = tmp` before `setMessage(tmp)`, and the `message` effect returns at `message === loadedRef.current`, so nothing else writes R0 for a share code. | Plan M3 write matrix, row "A share code opened at route 0: written (`codeMessage` effect) [same effect]"; source at `7293a35` lines 150–159, 182–192; `git grep` over the tests: `getFromCode` appears only in `MessageProvider.transient-toast.test.tsx`'s error case |
| `ConfirmationDialog.tsx:17:attr:2`, `WarningDialog.tsx:23:attr:2`, `ImageUploader.tsx:96:attr:2`: `className="contents"` removed from M8's wrapper | **QAF-30 MEDIUM** (below). Not equivalent: `PresetDialog`'s panel is `styles.flex({ col: true, gap: 4 })` with `{children}` direct (`PresetDialog.tsx` lines 50–64). With `contents`, the message and the footer are the panel's flex items, 16 px apart. Without it, they are one block item and the gap is gone. | Code review: "`contents` keeps the panel's flex layout" (`code-review/closed/017-existing-items-backlog-code-review.md`, M8 round) |
| `previewImage.ts:124:stmt`: `console.error(err)` in `runPreviewContinuation`'s catch deleted | **Residue, no criterion member.** D-8's line for a failed or unreachable preview is `logFailure` (line 110, KILLED): `requestPreview` turns a network error or timeout into a class and never throws. This catch sees only the commit query's and the deletes' errors after generation; the base swallowed those (`catch (_) { /* pass */ }`). The plan's "existing `console.error(err)`" (line 1024) is the generator's, killed here as `server.ts:39`. | Source lines 50–75, 100–126 |

## Findings

QAF-28 LOW Phase 3 — B-11's generator limb reads a start line, not the running release.
- **Property wanted checked.** After the generator push, the process serving production runs a checkout that contains `8512a1d`.
- **Failure scenario.** Runbook row G9 (`poll-generator-start.sh`) exits 0 on any ISO-stamped `Server running at` line later than the push. A pm2 crash-restart in the poll window, or a deploy that restarts after a failed pull, passes G9 while the old code runs, and B-6 to B-9 then read old code. `pig-host-read.sh` reads no commit (`grep -c -i git`: 0).
- **Why LOW.** B-11 is post-deploy-observable and never gates the release act. The row as I minted it named only the start line, so the gap is in the register row (qa.md: a row read from a process is tested as containment), not in devops's command, which reads what the row says.
- **Route.** devops, as the B-11 owner: add a containment limb (the deployed checkout's `HEAD` containing `8512a1d`, read over `claude-ro`, or the deploy job's own log) where a read-only path exists, else record the residue in the carrier. The register's document is closed, so this is a carrier amendment, devops's to establish.

QAF-29 MEDIUM Phase 3 — the share-code load's route-0 write has no assertion that fails when it is lost.
- **Property wanted checked.** Opening a share code at route 0 (`/message/m/0?code=<code>`) writes this tab's route-0 draft, so a later route-0 open without the code (Create Message, the nav) shows that message, as the base did through the `message` key.
- **Failure scenario.** `writeRouteZeroDraft(tmp)` is removed or moved behind the `loadedRef` guard. A user opens a share code, does not edit, then clicks Create Message: they get another tab's draft or the intro. 1853 of 1853 stay green (`index.tsx:153:stmt` SURVIVED).
- **Why MEDIUM and blocking.** The plan claims this cell preserved ("[same effect]", M3 write matrix). A claimed preservation with no failing assertion is the severity floor (GLOSSARY, "Severity floor").
- **Remedy (test only; no production change).** A spec-form case in the existing `MessageProvider.stored-draft` file, tightened first (CLAUDE.md, "Before adding a test"). Mount at route 0 with a `code`, resolve `message.getFromCode`, and assert this tab's R0 entry holds that message. It must be seen red under the deletion.

QAF-30 MEDIUM Phase 3 — the dialogs' `contents` wrapper has no assertion that fails when it is lost.
- **Property wanted checked.** In `ConfirmationDialog`, `WarningDialog` and `ImageUploader`, the element carrying `useDialogEnter`'s ref has `display: contents`, so the panel's own flex layout still lays out the dialog body.
- **Failure scenario.** A later edit drops or renames the class. The three dialogs lose the 16 px gap between message and footer (`ImageUploader`: between its fields block and footer). Every case stays green (3 survivors).
- **Why MEDIUM and blocking.** The change relies on it (code review's reading above), and nothing fails when it is lost.
- **Remedy (test only).** jsdom computes no Tailwind layout, so the standing instrument is the class itself. In each dialog's existing DOM test, assert the ref-bearing wrapper's `className` includes `contents` and that the message and `DialogFooter` are its children. Each assertion must be seen red under its mutant. The rendered spacing is a browser look; UAT owns any such look.

## Verdict

**Release Verification Failed** at website `7293a35`, generator `8512a1d`.
- **Regressed:** not an interaction (one plan). Plan 017's own surface, M3 (QAF-29) and M8 (QAF-30), carries two claimed
  behaviours with no failing assertion, found by the call-deletion set the plan-level pass routed here.
- **Holds:** the fresh install, the suite, typecheck, M7-b and the generator set, as above.
- **Remedies:** both test-only. No production line changes, so no sweep beyond these survivors is owed on the fix round.
  The fix round's evidence is each new case seen red under its survivor's mutant and green at its head. Then code review's
  scoped check of the test-only diff, and a fresh Phase 3 at the new tip. The website tip moves, which expires devops's
  request and the architect's closing pass, as devops stated.
- **Not this gate's to waive:** releasing over the two MEDIUMs is the owner's offer, not a question this gate puts.

## devops's runbook rows read against the register (devops.md Phase 2C, second-stage read)

Register rows: `qa/closed/017-existing-items-backlog-qa.md` B-7, B-10, B-11 and § Register amendments (reconciles
2026-11-19T00:22Z); QAF-14 (resolved at revision 4). Runbook: `deployment/017-existing-items-backlog-deployment.md` at
`21d55f9`.

| Row | Command | Reads what the row predicts? |
|---|---|---|
| B-7 | `post-deploy/kit/b7-read.sh` | **Yes.** The failure read is `vercel@66.2.0 logs -e production -s 23h -q 'preview-image-failure'`, the D-8 prefix (`previewImage.ts` line 42's `PREVIEW_FAILURE_PREFIX` line). The unfiltered read of the same window is both the liveness check and the non-member control: at baseline 219 records and 217 `/api/auth/session`, against 0 prefix lines (`devops/b7-baseline-20261119T1909Z.counts.txt`). The kept `failure.jsonl` carries record ids, so the union over 12-hourly reads is computable from the artifacts, not by the script. The member check against a planted line stands from the 00:11Z reconcile. A zero is evidence of nothing (the row's own predicted value). |
| B-10 | `post-deploy/kit/b10-read.sh` | **Yes.** It streams `verification/015/pig-host-read.sh` and prints `[7]` plus 9 lines: the four per-class counts, `error-status` included, and both QAF-14 liveness limbs. QAF-14's first limb: the fixture run `qa-m6/pig-host-read-fixture-tip.out` counts 10 of 10 members and excludes the 3 non-members, on the script as it stands (its last change `008468b` precedes that run). The second limb: the "Generated image" count since the deploy boundary, 76 at baseline (`devops/b10-baseline-20261119T1908Z.txt`). The failure counts are over an unstamped log, as the script states. That is sound here because no pre-release line has the new shape (all classes 0 at baseline). |
| B-11, website (W5) | `devops/poll-website-deploy.sh 7293a35… 20 30`, then `vercel inspect https://hooks.gg` and `merge-base --is-ancestor` | **Yes.** The poll alone shows a READY production deployment of the SHA, not what the domain serves. W5 adds the domain inspect and the containment test the row names. |
| B-11, generator (G9) | `devops/poll-generator-start.sh <push ISO> 12 60` | **Reads the row as written, and the row is weak:** QAF-28. The string comparison of the boundary against the push time errs late within one second, which is conservative. |

## Assumption Not Checked

This pass assumes that the Vercel production build of `7293a35` treats the dependency build scripts pnpm 10 ignored here
(12, including `@prisma/client`, `prisma`, `sharp` and `esbuild`; `fresh-install.out`) as the current production build
does, and does not test it. The fresh install and the suite ran without them. If false, the deploy fails at build, or a
Prisma or image path fails at runtime after deploy. The owner is devops: its packaging build at the tip (Phase 2A step 5)
and W5's ERROR exit catch the build half; the runtime half is B-11's and B-6's. Named again in the hand-off.

## Process record

- Exports: `p3/web-7293a35` (website, fresh install) and `p3/gen-8512a1d` (generator, no `.github`) under this session's
  scratchpad, and the helper's `web-work` and `gen-work`. All deleted at run end. Nothing started on this box survives the
  run; the helper's `pgrep` found no vitest or Chrome process from it.
- A record-write gate refused the shell append to `INBOX.md` (record documents are written with the edit tools or
  `record-edit.js`). The entry was re-issued through `record-edit.js`: the change met the gate's form, not a workaround.
- Handed off: to `implementer-hooks-017` (QAF-29, QAF-30) and `devops-hooks-017` (this verdict, QAF-28, the drain handoff's
  G10 fields), by SendMessage.
