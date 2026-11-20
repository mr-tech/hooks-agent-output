---
ID: 018
Origin: 018
UUID: 6273a762
Status: Active
Status-Detail: "Stage 1 done (plan 018 Committed at website d1bb9b0). Phase 2A open: release-tip verdict, tip packaging build, runbook and the owner's release approval are not yet taken; the push waits for P-1's decisive read (X-12). Nothing is pushed to master."
---

# Deployment — plan 018, Next.js 16.4.6 and the save-size cap (website `master`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T06:22 | steering-roadmap-hooks (brief `steering/018-brief-devops.md`) | M5-a, the release-check branch | Branch `release-check/018-next-upgrade-save-size-cap` at `5677889` (tip `d1bb9b0` plus `vercel.json` alone) pushed 06:21:54Z; Vercel preview `dpl_oVqvgvn5zFPquLnNehXZMWBHnq1E` READY (B-5). Capture `verification/018/devops/m5-a-release-check.txt` (record `daf117a`). UAT told. |
| 2026-11-20T07:11 | uat-hooks-018 (message, UAT `fabdbe7`) and security-hooks-website-deps (message, `fa2ce9f`) | Stage 1 | The brief's first Stage-1 gate waited for security's committed document; both are committed. Stage 1 steps 1 to 10 run (below): QA and UAT approvals carried, register terminal states, plan at rest, release consistency, scope committed, documents closed `Committed`, carriers created. |
| 2026-11-20T07:16 | qa-hooks-018 (message, record `ca1e3a9`) | Release-tip verdict; Phase 2A | QA Phase 3 `Release Verified` at `d1bb9b0`; dry run with `--qa-record` exit 0; packaging at the tip (install, build, both typechecks exit 0, `f267e92`); rollback form checked (`git apply --check -R` exit 0). Phase 2A steps 1 to 10 complete but the runbook's step 0: the push waits for P-1's decisive read (steering block 07:13Z concurs). Phase 2B ask follows after that read.

## Plan Reference

`planning/closed/018-next-upgrade-save-size-cap.md` (ID 018, revision 8, Status `Committed` at this Stage 1). Chain documents by `ID: 018`: critique (`critiques/closed/`, Resolved), architecture findings (`architecture/closed/`, Resolved), implementation M1 to M4, code review, QA (Phase 1 document and the M1 to M4 Phase 2 documents), UAT, security audit (open; closes with the chain, security's). Roadmap: absent (`agent-output/roadmap/` holds only `.gitkeep`), so no milestone or epic target was read and none is cited.

## Release Identifier

Website `master` at `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` (no tag; no `version` field exists; the SHA on the serving ref is the identifier). Shared by every plan of this deploy: plan 018 only.

## Release Date

_Blank until the push._

## Execution Mode

Mode A (agent-executed) is intended: `release-move.js` moves `master`, in this session, on the owner's release approval (Phase 2B). Stated again in the 2B summary. _Stage 2 not yet taken._

## Release Summary

- **Type:** framework upgrade plus input hardening, production. **Environment:** hooks.gg through Vercel: a push to `master` deploys production; no beta; no GitHub workflow (`git ls-tree` of `5677889` and `d1bb9b0`: 0 paths under `.github/workflows/`); `vercel.json` holds a cron entry (and, on the release-check branch only, the build-skip command).
- **Epic:** none recorded (no roadmap; plan header `Epic-Alignment`).
- **What ships** (`git diff --numstat 7923a1d d1bb9b0`, 18 commits, a fast-forward of `master`): Next.js 16.1.6 → 16.4.6 with its lint and analyzer packages; ESLint 9 with a flat config; `highlight.js` 11.12.0; `zod` pinned exactly at 3.22.4; every save list refused over its bound before its items are checked, with at most 20 issues and a summary returned (M-001); security's H-002 and M-001 verified closed at `d1bb9b0` (`security/018-next-upgrade-save-size-cap-security-audit.md`, `fa2ce9f`).

## Repositories and SHAs shipped

| Repository | Ref | From | To |
|---|---|---|---|
| website | `master` (origin) | `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (`git ls-remote origin refs/heads/master`, re-read 2026-11-20T07:16Z) | `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` (18 commits; `merge-base 7923a1d d1bb9b0` = `7923a1d`) |

No other repository ships. `project-utils` and `agent-output` are not releases. The release-check commit `5677889` never reaches `master` (every verdict names `d1bb9b0`; it is deleted at release).

## Serving Ref at Cutover

`node ~/.claude/tools/release-move.js website --report` (2026-11-20T07:11Z): "one serving ref at origin (master); no pair", exit 0. The other remote branches (`backup`, `external-message-api`, `redesign`, `regex-refactor`, and the release-check branch) are not serving refs; the release-check branch builds a Vercel preview only.

## Stage 1 — committed state (steps 1 to 10)

| Step | Record |
|---|---|
| 1, 2 Approvals | QA `QA Complete`, effort-final Phase 2 PASS `Verified-At` `d1bb9b0` (`qa/closed/018-next-upgrade-save-size-cap-m4-qa.md`, `62703f1`). UAT `Release-Decision: APPROVED FOR RELEASE`, `Verified-At` `d1bb9b0` (`uat/closed/018-next-upgrade-save-size-cap-uat.md`, `fabdbe7`; start re-derived from the committed document). Code review `Reviewed-At` `d1bb9b0` (APPROVED on the pin), implementation `Handoff-At` `d1bb9b0` (M2, with the pin). Security APPROVED at `d1bb9b0` (`fa2ce9f`). Steering's brief arrived (`steering/018-brief-devops.md`). |
| 2a QA verdict carried | `Verified-At: d1bb9b0` recorded. It names a SHA, a tree. The binding freshness check is Phase 2A step 3 below. |
| 2b Register | One register (`qa/…-qa.md` § Blocking-Condition Register; UAT's conditions appended there; UAT's document carries the states). **B-1, B-2, B-3, B-4, B-9 EXECUTED** (UAT, results in its register table; predictions met or recorded). **B-5 EXECUTED** (this record: READY `dpl_oVqvgvn5zFPquLnNehXZMWBHnq1E`, `githubCommitSha` `5677889…`, `git diff --name-only d1bb9b0 5677889` prints `vercel.json` alone, `verification/018/devops/m5-a-release-check.txt`). No pre-release row is unterminated. Post-deploy rows B-6, B-7, B-8, B-10 (and M1-h, M2-e's deploy limb, M5-e) are carried by `handoff/018-next-upgrade-save-size-cap-post-deploy-2026-11-20.md` (Post-Release Status names it). |
| 2b devops-owned reads | **QA M2's Assumption Not Checked** (Vercel's build equals the export's): the preview's build log has 0 "mandatory" lines (`grep -c`), Next.js 16.4.6, Turbopack, build exit; `verification/018/devops/m5-a-preview-build-log.txt`. **QA M3's** (the preview's function traces gain only 4 metadata paths): **NOT VERIFIED**, the build log lists routes and no trace contents; no behaviour rests on it; carried in the post-deploy handoff as a stated limit. |
| 2c Plan at rest | Planner batch: every row folded at revision 8 or a stated limit (M2-I4 and CR-7's devops note is discharged by step 4); critique `Resolved` (`4c8d4b8`, cycle 3 pass 1 on revision 8, APPROVED); the architect's closing pass on revision 8 APPROVED (`a4d94ce`); R3 landed (`7d419c1`). No revision after 8. The plan's Reading-Order row "Revision 8's fold … open" is a stale cell: critic and architect both discharged it; corrected at the closing write. |
| 3 Roadmap | Absent; recorded above. |
| 4 Release consistency | No package `version` field (`package.json` has none; `packageManager` `pnpm@10.28.2`); no CHANGELOG or README version to agree. Cross-repo references, read at `d1bb9b0` (`git show d1bb9b0:pnpm-lock.yaml`): `project-utils` `github:hooks-gg/project-utils#master` locked at `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`; `paracord` `github:mr-tech/paracord` locked at tarball `3f203086ae38699f26dbee90dadbb395a96be227`; both identical to base `7923a1d`. `next` 16.4.6 in `package.json` (`^16.4.6`) and the lockfile (2 `next@` keys, both 16.4.6); `zod` `3.22.4` exact. No consumer of website exists in this workspace. The unpinned git dependencies are carried by `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md`. |
| 5 Scope committed | `git status --porcelain --untracked-files=all` in website: only the untracked `.playwright-mcp/` (another session's captures). In `agent-output`: nothing of the plan's scope or `verification/018/` uncommitted before this stage's own writes. |
| 6 Committed state | Chain branch `chain/018-next-upgrade-save-size-cap`, tip `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96` (equals `HEAD` of the shared tree, 18 commits over `7923a1d`; implemented by the implementer, so no devops commit was made). Unpushed: `git ls-remote origin refs/heads/chain/018-next-upgrade-save-size-cap` prints nothing. |
| 7 | No push of the chain branch, no merge to the shared branch. |
| 8 Closure | Documents moved to `closed/` at Status `Committed` in this stage (the closing row below names them). Carrier created for the post-deploy rows. The architecture findings document is already `Resolved`/closed; no architecture findings document carrying `ID: 018` is open. |
| 9, 10 | Plan Status `Committed`, release identifier in `Status-Detail`. Roadmap subagent: no roadmap exists to update; recommendation to steering. |

## Pre-Release Verification (Phase 2A)

| Check | Result |
|---|---|
| UAT / QA | Carried (above). |
| Release-Tip Verdict | **RECORDED.** QA Phase 3 `Release Verified`, `Verified-At` `d1bb9b0724cded3c3c303203c2cbafe5df7bbf96`, `qa/website-7923a1d-d1bb9b0-release-tip-qa.md`, record commit `ca1e3a9`, `Phase` 3, committed clean (`git diff --quiet HEAD` exit 0). Tree identity re-derived here at 07:15Z: `git rev-parse d1bb9b0^{tree}` = `36f83a68fc6bb28cb33433d89677034b3ccb8595`, the tree QA's record names and the tree of the effort-final Phase 2 `Verified-At` (no assembling merge: a fast-forward). Dry run with `--qa-record`: exit 0, "DRY RUN: every check passed; nothing moved" (`verification/018/devops/release-move-dry-run-qa-record.txt`; origin and local `master` `7923a1d`, `ff-from-remote ok`, workflows none). Step 1b: 30 open handoffs, only the 018 post-deploy carrier fires (it reads after the push); the mutant-equivalence handoff's trigger did not fire; no gated time-based set in website. |
| Release consistency | Done at Stage 1 step 4. |
| Packaging integrity | **Done at the tip** (record `f267e92`): isolated `git archive d1bb9b0` export (tree `36f83a68fc6bb28cb33433d89677034b3ccb8595`), no `.env`, under pnpm 10.28.2 and node v24.14.0, the major Vercel's corepack runs (preview build log: "pnpm@10.28.2" from `package.json`): `pnpm install --frozen-lockfile --offline --ignore-scripts` exit 0, `pnpm run build` with `SKIP_ENV_VALIDATION=1` exit 0 (Next 16.4.6, 0 "mandatory" lines, the Edge Runtime deprecation warning M2-d records), `pnpm run typecheck` (both programs) exit 0, `tsconfig.json` byte-identical after the build (`cmp` 0). Captures `verification/018/devops/packaging-*.txt`, driver `packaging-tip.sh`. Two earlier runs were discarded: they overlapped and mixed their outputs (my error: I removed the export of a run still going); this is the third, alone. Export deleted. |
| Workspace cleanliness | Website: `git status --porcelain` shows only `?? .playwright-mcp/` (another session's captures), `HEAD` = `d1bb9b0` on `chain/018-next-upgrade-save-size-cap`. The one exclusion predecessor verdicts declare is that untracked directory (the QA exports ran from `git archive`, so none affects them); it is untracked, so it does not make `release-move.js` or a branch switch refuse (the fix chain's switch ran with it present). Record: this chain's paths committed; unrelated untracked files (a selection-ledger day file, other chains' screenshots) are not this chain's. |
| Serving refs on one line | Done (above). |
| Open disagreements with predecessors | None found at Stage 1. |

## Operational text re-derived against the mechanism (before the first ref moves)

| Item | Statement | Mark |
|---|---|---|
| Deploy mechanism | A push to `master` on `git@github.com:hooks-gg/website.git` deploys production on Vercel: no workflow files (0 paths); the Vercel project builds Next.js with `pnpm@10.28.2`; a non-master branch push builds a preview (read: the release-check push built `dpl_oVqvgvn5zFPquLnNehXZMWBHnq1E` with target `null`). Which commit the project builds on a `master` push is the pushed one. | Preview limb **re-derived** (Vercel API read); production limb **accepted as written** (the repository's own practice, 017 and the fix chain's pushes); named risk: default-ref behaviour |
| Rollback | **Re-derived**, instrument `git apply --check -R` (no tree write): `git diff 7923a1d d1bb9b0` written to `verification/018/devops/rollback-d1bb9b0-to-7923a1d.patch` (206,972 bytes, 20 files, +1909 −1480); `git apply --check -R` against the tree at `d1bb9b0`: exit 0. The rollback is the plan's `git revert --no-edit 7923a1d..d1bb9b0` on a branch off `master` (a new commit, hence a production deploy) moved by `release-move.js` on his word; Vercel's "promote previous deployment" is his, from the dashboard. A lockfile revert re-resolves nothing: the lockfile at `7923a1d` is a committed file. |
| Ordering | One repository, one ref. P-1's decisive read first (X-12); see the post-deploy handoff. | **Re-derived** from P1R's brief and fires log |
| Serving refs | `master` only | **Re-derived** (`--report`) |

## Runbook (Mode A; results blank until run)

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 0 | P-1's `Result` line in `handoff/message-page-header-decode-post-deploy-2026-11-20.md` is PASS or FAIL (not blank) | blank, or FAIL → stop and report to steering, the owner decides | |
| 1 | `git ls-remote origin refs/heads/master` | not `7923a1d…` → stop, the base moved | |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master d1bb9b0724cded3c3c303203c2cbafe5df7bbf96 --dry-run --qa-record <release-tip QA record>` (or `--reason` naming the Phase 2 record and its `Verified-At`) | exit ≠ 0 | |
| 3 | The same without `--dry-run` | exit ≠ 0 → stop and report, never retried in another form | |
| 4 | `git ls-remote origin refs/heads/master` | not `d1bb9b0…` | |
| 5 | Tree back on `master` (`release-move.js` does it over a tracked-clean tree), `git branch -d chain/018-next-upgrade-save-size-cap`, delete `release-check/018-next-upgrade-save-size-cap` locally and at origin | a dirty tracked tree → stop, route to the owner | |
| 6 | `bash verification/018/devops/read-serving-deployment.sh <out>` until exit 0 (bounded: 30 reads at 30 s; three consecutive exit 3 is a stop) | no exit 0 in the bound → report, no retry loop | |
| 7 | B-7: `bash verification/018/uat/preview/m5e-version-read.sh https://hooks.gg <workdir>` | `files-with-16.4.6` = 0 or `scripts` = 0 → report to the owner | |
| 7b | QA Phase 3's Assumption Not Checked, routed to devops: Vercel's production build installs from the frozen lockfile and gets `zod` 3.22.4. Read the production deployment's build log (`/v3/deployments/<id>/events`, as for the preview) for a non-frozen install or a different `zod` for website's own entry (the log suppresses install output, so the read is: the build log's Next.js version and the absence of any lockfile-update line; the install command is `pnpm install` under CI, which pnpm runs frozen); record what the log shows and mark the rest NOT VERIFIED | a lockfile-update or resolution line, or a Next.js version other than 16.4.6 → report to the owner | |
| 8 | Fill E-WEBSITE-PUSH and E-SERVING in the post-deploy handoff and commit it; steering is told so UAT (B-6, B-10) and QA (B-8) are cued | — | |

## Assumption Not Checked, by predecessor, that this release exercises

- **QA (effort-final):** the release tip is `d1bb9b0`'s tree. Closed at Phase 2A step 3 by `git rev-parse <tip>^{tree}` equality.
- **QA M3:** the preview's function traces. NOT VERIFIED (above); stated limit.
- **UAT:** R5's guarantee rests on 004's record, not on UAT's instrument (UAT-2; INBOX entry to the architect).

## User Confirmation

Put to the owner directly by this session as a blocking selection prompt (`~/.claude/state/prompt-gate-off` absent at 07:17Z), asked after the QA Phase 3 record, the tip packaging capture and the dry run with `--qa-record`, and before any ref moved. The prompt stated: the identifier (`master` `7923a1d` to `d1bb9b0`, a fast-forward of 18 commits); the environment (hooks.gg production through Vercel; no GitHub workflow, read from the repository); the gates (UAT, security, QA Release Verified at `d1bb9b0`, the tip's build and typecheck, the dry run, the preview served as the local build does); the rollback (a revert of the 18 commits, `git apply --check -R` exit 0, on his word, or Vercel's promote-previous from his dashboard); the post-deploy reads (mine for the version; UAT and QA for B-6, B-8, B-10); and the P-1 hold with its cost. Options: (1) push after P-1's 08:07Z read (Recommended), (2) push now, (3) do not release yet.

**Answer (07:17Z, by selection): "Agent: push master to d1bb9b0 after P-1's 08:07Z read (Recommended)."** The runbook's step 0 therefore stands; a FAIL on P-1 is not covered by this answer and goes to him.

The refutation helper the Escalation Form asks for (briefed with the conclusion alone) found: the schedule and the two undecided reads hold; a header read at 07:16Z shows an image answer generated at 06:29:00Z (`x-vercel-cache: HIT`, `age` 2859, 200 `image/png`), after the earlier deploy and before this release, so P1R's 08:07Z read can decide from it if it is still live (valid to about 10:29Z). That is a header read by a helper, not P-1's Result. The "date after the push decides" rule lives in the carrier's Interim line, not in the reader's brief; noted to steering.

## Release Execution

_Not yet run._

## Post-Release Status

_Open._ Post-deploy rows B-6, B-7, B-8, B-10: `handoff/018-next-upgrade-save-size-cap-post-deploy-2026-11-20.md`. Unpinned git dependencies: `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md`. Security's L-001 (tRPC batch size) and four informational items: `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`. X-10: `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` (stays open).

## Next Actions

Phase 2A remainder, P-1's decisive read, then Phase 2B.
