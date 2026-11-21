---
ID: n/a
Origin: fix-delete-dead-cron
UUID: af508ebe
Status: Active
Status-Detail: "Reopened. Website master was pushed 0c14d5b to 132a7ab at 2026-11-21T23:18:58Z on the owner's approval, but Vercel's production deployment of that push errored (build: five required settings absent at prerender), so production still serves the previous release. Awaiting the cause and the owner's decision; see Correction."
---

# Deployment — fix-delete-dead-cron (website `master`)

## Changelog

| Date (UTC) | Agent | Change |
|---|---|---|
| 2026-11-21T20:56 | devops | Document created at Stage 2 readiness (Phase 2A steps 1-10), after Stage 1 (record commit `e53d265`). Brief `steering/fix-delete-dead-cron-brief-devops.md` read whole; its common part read. No wake-up from an earlier session: this is the first pass. Steering's brief had arrived, so no gap is recorded there. |
| 2026-11-21T23:18 | devops | Owner's release approval received ("Agent: release it now (Recommended)", selection prompt) and recorded under User Confirmation; pre-move reads taken. |
| 2026-11-21T23:19 | devops | Phase 2C: website `master` moved `0c14d5b` to `132a7ab`, push at 23:18:58Z, read back at origin 23:19:01Z. Phase 2D worked: fix branch deleted with `-d`; stage documents `Released`; reconciliation table written. Status Released; document closed to `deployment/closed/`. |
| 2026-11-21T23:25 | devops | Reopened on `steering-hooks`'s report that the production deployment for the push errored, which I then read myself (see Correction). Status Active, document back in `deployment/`. |

## Correction — 2026-11-21T23:25 (reconcile note; the sections below stand as written at their times)

**What this record said.** At 23:19Z (changelog row, Release Execution, Post-Release Status, Phase 2D table) it said "Deployment Complete", took serving state as evidenced by the push alone,
and closed as `Released`. Its Release Identifier and the push itself stand: `git ls-remote origin master` reads `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` again at 23:24:49Z
(`verification/fix-delete-dead-cron/devops/post-move-origin-read-2.txt`).

**Why that was defensible when written.** The deploy-evidence rule in this agent's definition takes a push to the deploy ref as a successful deployment unless the owner states otherwise, and
forbids asking for a runner's or a workflow run's outcome. The push was read back; no contrary statement existed at 23:19Z. I made no read of Vercel's deployment state after the push, and none was
owed under that rule. It was a wrong claim all the same: the rule's own exception, a statement otherwise, arrived at about 23:2xZ.

**What is now established (read by me at 23:23-23:25Z with the look-only CLI, stdin closed, after `steering-hooks` reported it).**
- `vercel ls --prod`: the newest production deployment, `hooks-gg-website-dbbvp2cya-hooks-gg.vercel.app`, is "Error", 17 s, created 2026-11-21T23:19:00Z; the one below it (`…oxeqdn0vp…`, built from `0c14d5b` at 18:35:46Z) is "Ready"
  (`vercel-inspect-errored-132a7ab.txt`). `hooks.gg` is aliased to that earlier deployment, per `steering-hooks`'s read of `vercel inspect https://hooks.gg`; the errored one carries only the project and git-master aliases.
  So production still serves the previous release, the change is NOT live, and no outage resulted.
- The build log of the errored deployment (`vercel-build-log-errored-132a7ab.txt`) shows a clone of `master` at commit `132a7ab`, pnpm 10.28.2, install, "Compiled successfully", TypeScript finished, then
  "Invalid environment variables" for five required names, `DATABASE_URL`, `REDISHOST`, `REDISPORT`, `REDISUSER`, `REDISPASSWORD` (names only, no value read), thrown from `src/env.mjs:115` while prerendering `/`; "Export encountered an error on /page: /, exiting the build."
- The earlier production build of `0c14d5b` (18:35Z, `vercel-build-log-prod-0c14d5b.txt`) passed the same prerender step with the same code path, so those five settings were supplied to it.

**What is not established.** Why the build did not see those settings this time. The release diff touches five paths (`package.json`, `pnpm-lock.yaml`, `cron.ts`, its test, `vercel.json`); none is read by `src/env.mjs`, and my own build at the tip with `SKIP_ENV_VALIDATION=1` passed. The control run
without the settings (base against tip) is below. The project's setting list in Vercel is not readable by the three sanctioned commands (`ls`, `inspect`, `logs`), so whether the settings changed between 18:35Z and 23:19Z is the owner's read, or needs his word for one more look-only command.

**Class of claim corrected.** The claim "serving state follows from the push" in this record: `grep -n -i -E "deployment complete|serving state|deploy evidence|evidenced by the push" deployment/fix-delete-dead-cron-deployment.md` is enumerated and each hit dispositioned in the changelog row of the closing correction (below, once the control run is read); other documents' hits are in the same note.

## Plan Reference

No plan: a fixer chain (`fix-`), `ID: n/a`, `Origin` and `UUID` from the fixer's document `implementation/closed/fix-delete-dead-cron-implementation.md`
(`Handoff-At` `132a7ab6f49d8a85ead507e2221ab3c3a531fd00`, record `7c99ece6`). Scope: the owner's determination, `steering/fix-delete-dead-cron-rulings.md`,
blocks "2026-11-21T20:26" (both). Source handoff: `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` (`Status` Open here; closing it `Addressed` is
steering's, after the post-deploy reads).

Stage set (quoted from the brief's common part): fixer, then code reviewer, then devops for website `master`. No plan, critic, Phase 1, QA or UAT.

Roadmap: `agent-output/roadmap/` holds only `.gitkeep`, so no roadmap document exists to cite. The release aligns with no milestone or epic target on record; the fix's authority is the owner's selection quoted above.

## Release Identifier

Website `master` at `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` (no tag is created; the SHA on the serving ref identifies the release).

## Release Date

2026-11-21, push at 23:18:58Z (read back at origin 23:19:01Z).

## Execution Mode

Agent-executed (Mode A), from this session, which is also the session that asks the owner for the release approval. The move is
`node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 --reason <text>`,
in its default form (branch move, switch of the tree onto `master`, push). The tool refuses a tracked-dirty tree, a non-fast-forward and a split.

## Release Summary

- Type: hardening/hygiene removal, not user-visible. Environment: Vercel production (project `hooks-gg-website`, aliases include `hooks.gg`).
- Epic: none on record (`fix-` chain; the scoping block names none).
- Change: the daily `/api/cron` endpoint (guarded by the fixed key `vercel`), its `vercel.json` schedule, its test and the `cron-parser` package (with its only dependent
  `luxon`) are removed. 0 production lines added, 162 deleted in 5 files.

## Repositories and SHAs shipped

| Repository | Branch | Base | Tip shipped | Commits |
|---|---|---|---|---|
| website | `chain/fix-delete-dead-cron` to `master` | `0c14d5bed78fd938f8290ed9ae57834e093bfdc1` (= `origin/master`, read by `git ls-remote` at 2026-11-21T20:54Z and again at 20:55Z) | `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` | 1 (`git rev-list --count origin/master..132a7ab`); merge-base is the base, so the move is a fast-forward |

No other repository is shipped. project-utils, preview-image-generator and the record are not released by this chain.

## Serving Ref at Cutover

One serving ref: `origin/master` (`release-move.js <repo> --report`: "one serving ref at origin (master); no pair"). Before: `0c14d5b`. After (to be read back, Phase 2C): `132a7ab`.

## Pre-Release Verification

| Item | State |
|---|---|
| QA | None in the stage set (the change adds 0 production lines, under the fixer route's 20). Not a gap. |
| UAT | None in the stage set. |
| Stage start | Code review `code-review/closed/fix-delete-dead-cron-code-review.md`, `Reviewed-At` `132a7ab`, `Verdict` APPROVED, round 1, no findings (record `0c6cd42c`); committed with this record at `e53d265`. |
| Blocking-condition register | None exists in this chain: no QA or UAT register, no plan. Nothing to terminate. |
| Release-tip verdict | No QA record exists, by the determination. The tip IS the reviewed commit: `git rev-parse 132a7ab^{tree}` equals itself, as the release is a fast-forward of one commit onto `0c14d5b`, with no assembly, merge or rebase. The reviewer ran, in an export of `132a7ab`: suite 2358/2358 with process exit 0, typecheck exit 0 (both tsc programs), and a raw-socket attack on `/api/cron` (63 requests per tree: 0 handler executions at the tip, 27 at the base control). The release move therefore takes `--reason` naming that review and its `Reviewed-At`, not `--qa-record`. This is the stage set's own last verdict, not a Phase 2 QA verdict, and it is said so here. |
| Release consistency | No package carries a `version` field (`grep '"version"' package.json`: no hit), so none is synthesised. Cross-repo references re-read: `project-utils` is `github:hooks-gg/project-utils#master` and `paracord` is `github:mr-tech/paracord` in `package.json`; the release diff does not touch either line or any lockfile entry of them (the lockfile diff is 17 deletions, all in `cron-parser` and `luxon`), so each still names its intended target. |
| Consumers of what is removed (re-derived at the tip by `git grep`, not carried) | `git grep -c -i -E "api/cron\|cron-parser\|luxon\|vercel\.json" 132a7ab -- . ':!pnpm-lock.yaml'` exit 1, no match; the same terms in `pnpm-lock.yaml`, exit 1, no match. Population of serving refs: one (above). |
| Packaging integrity | At the tip, in a `git archive` export of `132a7ab` (no `.env*` file, 0 counted): `pnpm install --frozen-lockfile --prefer-offline` under pnpm 10.28.2, exit 0; the lockfile is byte-identical to the tip's blob afterwards; `SKIP_ENV_VALIDATION=1 pnpm run build` (`next build`, Next 16.4.6 Turbopack), exit 0; its route list has no `/api/cron` (the production build of `0c14d5b` lists it). Capture: `verification/fix-delete-dead-cron/devops/packaging-install-build-at-132a7ab.txt`, driver `packaging-at-tip.sh`. The export was removed afterwards; `ps` shows no process left. |
| Deploy host's pnpm major | Read from the build log of the live production deployment (`dpl_AsiVPq5vBJY7dqJim5PcmFVWCrn9`, built from `0c14d5b` on master): "Detected ENABLE_EXPERIMENTAL_COREPACK=1 and 'pnpm@10.28.2' in package.json", Vercel CLI 66.2.0 on the build machine. That is the `packageManager` pin and the pnpm the frozen install above ran under. Captures: `vercel-build-log-prod-0c14d5b.txt`, `vercel-inspect-prod-0c14d5b.txt`. |
| Workspace cleanliness | Website porcelain `?? .playwright-mcp/` only (another session's; the tool reports 17 untracked paths left alone and refuses only tracked changes). Nothing under `verification/fix-delete-dead-cron/` is uncommitted (`git status --porcelain` over it: empty before this stage's captures, which are committed at `e53d265`). Predecessor exclusions: the shared tree's gitignored `.next/types/validator.ts` still names `cron.ts`, so `pnpm run typecheck` in the live tree fails until `next typegen` or a build regenerates it. It affects no release mechanism: `release-move.js` looks at tracked changes only, and Vercel builds from a clean clone. It is not this stage's file and is left alone. |
| Rewritten history | None between verification and release: `132a7ab` is reachable from `chain/fix-delete-dead-cron`, which is not rebased. |

## Operational text re-derived against the mechanism (before the first ref moves)

Repository: website.

| Line | Statement | Mark |
|---|---|---|
| Deploy mechanism | A push to `master` makes Vercel's Git integration build and deploy it to production. No `.github/workflows` exists (`release-move.js` prints "workflows none … absent"). The Vercel build log of the live deployment reads "Cloning github.com/hooks-gg/website (Branch: master, Commit: 0c14d5b)", and the deployment's aliases include `hooks.gg` and `…-git-master-…`. | re-derived: Vercel CLI 29.1.1 `inspect` and `logs` (look-only), plus the workflows directory |
| Which settings survive deleting `vercel.json` | The file's only key at `0c14d5b` was `crons` (`git show 0c14d5b:vercel.json`, read whole by the fixer and reviewer). The build log shows a custom install command, which therefore comes from the project's dashboard settings, not this file. Deleting the file loses nothing but the schedule. | re-derived for the file's content; the statement that Vercel treats an absent file as an empty one is accepted as written, a named risk |
| Rollback | Reverse application of the release diff to the tree: `git apply --check -R` of `verification/fix-delete-dead-cron/devops/release-diff-0c14d5b-132a7ab.patch`, exit 0 (`rollback-dry-run.txt`). To roll back, a revert of the one commit is released through the same tool and the same approval. Vercel also keeps the previous production deployment `hooks-gg-website-oxeqdn0vp` (built from `0c14d5b`, Ready) for a dashboard redeploy. | the reverse apply is re-derived by dry run; the dashboard redeploy is accepted as written (not run), a named risk |
| Ordering constraints | None. One repository, one commit, one serving ref, no consumer pins it. | re-derived: `--report`, and the consumer grep above |
| Serving refs | `master` only at origin. | re-derived: `release-move.js --report`, and `git ls-remote origin master` read `0c14d5b` at 20:54Z and 20:55Z |
| Dry run of the move | `release-move.js … master 132a7ab… --dry-run --reason <text>` at the tip: "ff-from-remote ok; sibling serving refs (none) on one line ok", "DRY RUN: every check passed; nothing moved", exit 0 (20:5xZ today; the determination's earlier dry run at 20:26Z is steering's). | re-derived |

## Runbook (Mode A; results blank until run)

| # | Step | Abort if | Result |
|---|---|---|---|
| 1 | `git ls-remote origin master` | not `0c14d5b…` (someone else moved it) | `0c14d5bed78fd938f8290ed9ae57834e093bfdc1`, read 23:18Z. Proceed. |
| 2 | `git -C /usr/local/bin/hooks/website status --porcelain` | any tracked change | `?? .playwright-mcp/` only; `git diff --quiet HEAD` exit 0. Proceed. |
| 3 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 --reason "<review record and Reviewed-At>"` | exit not 0, or a refusal | exit 0: "OK moved master: 0c14d5b… -> 132a7ab… on origin; tree on master" (`release-move-real.txt`). |
| 4 | `git ls-remote origin master` | not `132a7ab…` | `132a7ab6f49d8a85ead507e2221ab3c3a531fd00 refs/heads/master`, 23:19:01Z (`post-move-readback.txt`). |
| 5 | `git -C /usr/local/bin/hooks/website branch --show-current` | not `master` | `master`, HEAD `132a7ab`. |

A refused or classifier-blocked push is reported to the owner and to `steering-hooks`, never retried in another form.

## Open disagreements with predecessor documents

None. Where this record is more careful than a predecessor it says so above (the release-tip verdict is the code review, as the stage set has no QA).

## Assumption Not Checked, by predecessor, that this release exercises

| Predecessor | Assumption | Read that closes it | State |
|---|---|---|---|
| Code review (round 1) | Production carries no cron: an absent `vercel.json` gives no cron configuration, and no cron is configured in the Vercel dashboard. | The dashboard's Cron Jobs list after the deploy: the owner's, since no command available here reads it (`inspect` shows no cron section; `vercel logs` returns the build log only). | Carried by `handoff/vercel-dashboard-cron-list-after-cron-removal-2026-11-21.md` (`Owning-Stage` owner, event-form trigger). This record does not wait on it. |
| Code review and fixer | The deploy host's pnpm major. | The build log above: pnpm 10.28.2. | Closed here. |
| Fixer | Its own "Residue in production" notes: unsent `ScheduledMessages` rows never send; the dashboard cron list. | The owner's selection A (no check first); the dashboard read above. | Accepted by the owner; carried as above. |

No session can run any of these read steps before the first ref moves: the dashboard read is only decisive after the deploy.

## User Confirmation

Put by selection prompt from this session (the prompt flag `~/.claude/state/prompt-gate-off` was absent), in his form: context first, then the decision, no commit IDs.
The summary named the live site and its automatic publish, and quoted the fixer's three user-visible flows in plain words: (1) `/api/cron` shows the site's normal not-found page; (2) Vercel's
scheduled-jobs list should be empty, which only he can see, so he would be asked to look once after release; (3) any waiting scheduled message never sends, and no check was made first (his selection A, 20:26Z).
Options: "Agent: release it now (Recommended)" and "Agent: hold, don't release".

- Response: "Agent: release it now (Recommended)". The prompt was put after 2026-11-21T20:56Z (the readiness commit `4b616d2`); the answer's own time was not stamped by the prompt, and the first clock read after it is 2026-11-21T23:18Z (the pre-move reads below).
- Release approval recorded: yes, for the release as a whole (this chain's one commit), not for individual plans.

## Release Execution

Mode A, run by this session after the owner's release approval above. Commands and outputs are in the runbook (results column) and in
`verification/fix-delete-dead-cron/devops/release-move-real.txt`. The tool ran its checks first (fast-forward from the remote, no sibling serving ref, no workflow), then
`git branch -f master 132a7ab`, `git checkout master`, `git push origin refs/heads/master:refs/heads/master`. The push, at 2026-11-21T23:18:58Z, took `origin/master` from
`0c14d5b` to `132a7ab`. No tag and no publish: a branch move has nothing to publish.

**Serving state** is evidenced by the push, per the deploy-evidence rule: the push to `master` is the deployment, and the Vercel Git integration builds `master` (re-derived above).
No host-side read was made or requested. Nothing is marked NOT VERIFIED for serving state. No artifact-side check was left unperformed.

Consumers resolving to the release: none pin this repository by SHA; `project-utils` and `paracord` are consumed by website, not the reverse.

## Post-Release Status

- Status: Deployment Complete, 2026-11-21T23:19Z.
- Known issues: none known. The one forward read is the Vercel dashboard's Cron Jobs list, carried by `handoff/vercel-dashboard-cron-list-after-cron-removal-2026-11-21.md` (`Owning-Stage` owner); this record does not wait on it.
- Rollback plan: a revert of the one commit, released through `release-move.js` under a new approval (the reverse apply was dry-run at `rollback-dry-run.txt`, exit 0), or a dashboard redeploy of the previous
  production deployment (accepted as written, not run).

## Phase 2D reconciliation

| Step | Result |
|---|---|
| Plans/stage documents Released | The chain has no plan. Its two stage documents, `implementation/closed/fix-delete-dead-cron-implementation.md` and `code-review/closed/fix-delete-dead-cron-code-review.md`, are `Released` with changelog rows, in `closed/`. |
| Deployed against verified, per repository | website: deployed ref `master`, commit at it `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` (the pushed commit, read from local git and by `ls-remote`). The code review's `Reviewed-At` is `132a7ab6f49d8a85ead507e2221ab3c3a531fd00`: the same commit, so no diff between the two is owed. |
| Release-tip QA record | None exists (no QA in the stage set); nothing to close. |
| Metadata | Release identifier `132a7ab` on website `master`; environment Vercel production; timestamp 2026-11-21T23:18:58Z; authorizer the owner, by selection prompt in this session; included plans: none (fixer chain `fix-delete-dead-cron`). |
| Fix branch | `git branch -d chain/fix-delete-dead-cron` succeeded without `-D` (`fix-branch-delete.txt`); `git branch --list` for it prints nothing; the tree is on `master`. |
| Architecture | `architecture/system-architecture.md` line 172 ("Cron: daily `/api/cron?key=vercel` per `vercel.json`") is made stale by this release. The brief assigns lodging it for the architect to `steering-hooks` ("steering lodges it"), so this record names it and the message to steering repeats it; no second inbox line is written here. |
| Chain documents by `Origin` (`grep -rl "^Origin: fix-delete-dead-cron"` outside `verification/`) | Three: the fixer document `Released`, the code review `Released`, and this record. Terminal tokens: `Released`, `Released`, `Released` (this record at its close). The source handoff `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` is `Open`: its closing `Addressed` is steering's, after the dashboard read. |
| Other `fix-` chains carried by this release | None. The release is one commit onto `0c14d5b`. The only other open `fix-` documents, `fix-git-dependency-pins` (`Handoff-At` `40ba5d3`, repos=project-utils), are not in website's history (`132a7ab` carries one patch, the cron removal), and are not this release's. |
| Forward items beyond the register | `grep -l 'Assumption Not Checked'` over the chain's documents finds the code review and this record. The code review's two limbs: pnpm major, closed here; no dashboard cron, carried by the handoff above. The fixer document has no section of that name; its "Residue in production" items are this record's table above. No Risks table, Planner batch or routing phrase with an uncarried item. |
| Roadmap obligation | None owed: the scoping determination names no epic or criterion (`fix-` chain). |

## Next Actions

- Owner: the dashboard read above, carried by `handoff/vercel-dashboard-cron-list-after-cron-removal-2026-11-21.md` (event-form trigger, written before this record closes).
- Steering: closes the source handoff `4bc9b626` after that read; lodges the architecture line 172 for the architect; spawns the retrospective on the cue sent with this record's closing.
