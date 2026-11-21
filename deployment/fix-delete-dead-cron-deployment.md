---
ID: n/a
Origin: fix-delete-dead-cron
UUID: af508ebe
Status: Active
Status-Detail: "Stage 1 done (committed at website 132a7ab on chain/fix-delete-dead-cron, not pushed). Stage 2 readiness complete; the release is not yet asked of the owner or run. The release moves website master, which Vercel deploys to production."
---

# Deployment — fix-delete-dead-cron (website `master`)

## Changelog

| Date (UTC) | Agent | Change |
|---|---|---|
| 2026-11-21T20:56 | devops | Document created at Stage 2 readiness (Phase 2A steps 1-10), after Stage 1 (record commit `e53d265`). Brief `steering/fix-delete-dead-cron-brief-devops.md` read whole; its common part read. No wake-up from an earlier session: this is the first pass. Steering's brief had arrived, so no gap is recorded there. |

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

Not yet run. Filled in Phase 2C.

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
| 1 | `git ls-remote origin master` | not `0c14d5b…` (someone else moved it) | |
| 2 | `git -C /usr/local/bin/hooks/website status --porcelain` | any tracked change | |
| 3 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 132a7ab6f49d8a85ead507e2221ab3c3a531fd00 --reason "<review record and Reviewed-At>"` | exit not 0, or a refusal | |
| 4 | `git ls-remote origin master` | not `132a7ab…` | |
| 5 | `git -C /usr/local/bin/hooks/website branch --show-current` | not `master` | |

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

To be filled when asked. The ask is put by selection prompt (the prompt flag `~/.claude/state/prompt-gate-off` is absent), in the owner's words: context, then the decision, no commit IDs. The three user-visible flows
from the fixer's document are quoted to him.

## Release Execution

Not yet run.

## Post-Release Status

Not yet run. The only forward read is the dashboard cron list, carried by `handoff/vercel-dashboard-cron-list-after-cron-removal-2026-11-21.md`.

## Next Actions

- Owner: the dashboard read above (carried by the handoff).
- Steering: closes the source handoff after the post-deploy reads, and lodges the architecture record's L172 for the architect (both named in the brief).
