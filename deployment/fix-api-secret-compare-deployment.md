---
ID: n/a
Origin: fix-api-secret-compare
UUID: fbe73764
Status: Active
Status-Detail: "Phase 2A complete, readiness recorded; website 0c14d5b not yet on master. Awaiting the owner's release approval (Phase 2B); production push not yet run."
---

# Deployment Record: fix-api-secret-compare

**Plan Reference**: none (fixer route). Scope: `steering/fix-api-secret-compare-rulings.md` blocks "2026-11-21T13:39Z" (his three selections) and "2026-11-21T13:42Z" (determination, items 1-5).
**Stage start**: QA Phase 2 verdict `qa/closed/fix-api-secret-compare-qa.md`, `QA Complete`, `Verified-At` `0c14d5b` (record `fc63b90e`); code review `code-review/closed/fix-api-secret-compare-code-review.md`, `Reviewed-At` `0c14d5b`, round 1 `APPROVED_WITH_COMMENTS` (record `799172ab`). No UAT on this stage set. Brief: `steering/fix-api-secret-compare-brief-devops.md` with its common part.
**Roadmap**: `agent-output/roadmap/` holds `.gitkeep` and `closed/` only (read 2026-11-21); nothing cited. The scoping determination names no epic or criterion. Proceeding with reduced context.
**Release Identifier**: website `master` at `0c14d5bed78fd938f8290ed9ae57834e093bfdc1` (the SHA on the serving ref once moved; no tag).
**Execution Mode**: Mode A, agent-executed: `node ~/.claude/tools/release-move.js` run in this role session on the owner's release approval, which this session asks him for. Phase 2D runs identically.
**Release Summary**: type fixer-chain hardening release; environment production (Vercel, deploys website `master`); epic none.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T18:29 | steering-hooks (brief `steering/fix-api-secret-compare-brief-devops.md`) | Stage 1, then Stage 2 on the owner's word | Stage 1 committed (agent-output `2097c2f`): implementation, code review and QA Committed and closed, post-deploy handoff created. Phase 2A complete: tip assembled (fast-forward), verdict covers the tip, packaging re-run at the tip, readiness recorded here. Release approval not yet asked at this row. |

## Repositories and SHAs to ship

| Repository | Ref | Base | Tip | Commits |
|---|---|---|---|---|
| website | `master` (origin) | `b68f94cda114bcef1efd59954aba321e246dd683` (`git ls-remote origin master`, 18:29Z) | `0c14d5bed78fd938f8290ed9ae57834e093bfdc1` | `3a54c2f` helper move, `66699c5` tests (red), `1054bbc` fix, `32d10f7` typed helper, `b01ae0b` QAF-1 test, `0c14d5b` CR-2 tests |

No other repository ships. The record repository (`agent-output`) is not a serving ref; nothing there is pushed by this release.

## Pre-Release Verification

| Check | Result | Instrument |
|---|---|---|
| QA | `QA Complete`, `Verified-At` `0c14d5b` | `qa/closed/fix-api-secret-compare-qa.md` header, read at agent-output `2097c2f` |
| Code review | `APPROVED_WITH_COMMENTS`, `Reviewed-At` `0c14d5b`; CR-1 LOW declined by the fixer, accepted by the reviewer | `code-review/closed/…` header |
| UAT | none in the stage set | stage set, rulings block 13:42Z |
| Blocking-condition register | One row, B-1, post-deploy-observable: carried by `handoff/fix-api-secret-compare-post-deploy-2026-11-21.md`; no pre-release row exists, so none blocks the commit | QA document "Blocking-condition register" |
| Release tip assembled | `master` `b68f94c` is an ancestor of the chain tip (`git merge-base --is-ancestor master 0c14d5b` exit 0): the merge is a fast-forward and the tip is the chain branch's own commit `0c14d5b`. No merge commit | `git merge-base`, `git rev-parse` |
| Release-tip verdict | The tip's tree `a2a2673d163fdbcff8bd9ec0565388a9fe1d03ca` (`git rev-parse 0c14d5b^{tree}`) is the tree of QA's `Verified-At` `0c14d5b`, the same commit: the Phase 2 verdict covers the tip. No separate Phase 3 record exists, so the release move takes `--reason` naming that record and its `Verified-At` | `git rev-parse` |
| Open-handoff sweep (`qa-phase-3.md` step 1b) | This record has no `tools/open-handoff-trigger-sweep.py`. Enumerated by reading the `Review-Trigger` of every handoff with `Status: Open` (31 files in `handoff/`; the enumeration loop printed each trigger). None names this verdict or a production push of website. Candidates read: `website-git-dependencies-resolve-unpinned-2026-11-20.md` (its trigger, "a website release whose package.json or lockfile differs from d1bb9b0's", holds the same way for the release before this one; this release changes neither file against base, and the lockfile at the tip still names `paracord` `3f20308` and `project-utils` `749606d`, the pins that handoff asks a release to confirm); `website-api-handler-hardening-2026-10-10.md` (trigger "any file under src/pages/api/ next edited": this chain is that edit; it is the chain's source, closed by steering after the post-deploy reads). The gated time-based set: the workspace `CLAUDE.md` names none. This enumeration is devops's read, not a QA verdict: QA's Phase 3 dispositioning is not requested because the population is 0 | `grep`/`awk` loop over `handoff/*.md`; `git show 0c14d5b:pnpm-lock.yaml` |
| Release consistency | No `version` field applies (`package.json` carries `name` only). Cross-repo references: `git diff --name-only b68f94c 0c14d5b` lists 14 paths, none `package.json`, `pnpm-lock.yaml` or `src/env.mjs`; the git dependencies `paracord` and `project-utils` resolve to the same pins as at the base | `git diff --name-only`; `git diff --quiet b68f94c 0c14d5b -- package.json pnpm-lock.yaml` exit 0 |
| Packaging at the tip | An export of `git archive 0c14d5b` (the tree above) with a copy of the shared `node_modules` (no lockfile change, so no install), dummy values only, no `.env` file, in a `systemd-run --user --scope` capped at 10G. `pnpm run build` (`next build`, Next.js 16.4.6 Turbopack): **exit 0**, "Compiled successfully", `/api/interactions-server` and both `/api/v1/guilds/[guildId]/messages*` routes listed as dynamic (`tip-build-0c14d5b.txt`, `.exit`). `pnpm run typecheck` (both programs): **exit 0** (`tip-typecheck-0c14d5b.txt`, `.exit`). pnpm 10.28.2, the `packageManager` pin | `verification/fix-api-secret-compare/devops/` |
| Packaging, first typecheck run | The first typecheck ran before the build and exited 2, one error: `src/app/page.tsx(10,26)` cannot find module `~/assets/img/product_image.png`. Cause: `next-env.d.ts` is git-ignored (`.gitignore:86`) and generated by `next build`; the export had none yet. After the build generated it, the same command exited 0. The first run is kept as `tip-typecheck-0c14d5b-first-run-no-next-env.txt` | `git check-ignore -v next-env.d.ts` |
| Lockfile / package-manager change | None in this release, so no install under the host's pnpm major is owed | `git diff --quiet b68f94c 0c14d5b -- package.json pnpm-lock.yaml` exit 0 |
| Workspace cleanliness | Website: `git status --porcelain` shows `?? .playwright-mcp/` only (another session's, not this chain's), nothing tracked changed; branch `chain/fix-api-secret-compare` at `0c14d5b`. Record: nothing under the chain's paths uncommitted at Stage 1 (`git status --porcelain -- qa implementation code-review verification/fix-api-secret-compare handoff deployment` empty before this stage's own writes) | `git status --porcelain` |
| Predecessor exclusions | QA declared none that touch a release mechanism: the only exclusion on the surface is `.playwright-mcp/` (untracked, outside the diff), which `release-move.js` reports as "17 path(s) left alone" | dry-run output |
| History rewrite | None between verification and release: the verified commit `0c14d5b` is the tip, reachable from `chain/fix-api-secret-compare` | `git rev-parse` |
| Serving refs on one line | `release-move.js --report`: "one serving ref at origin (master); no pair" | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website --report` exit 0 |
| Open disagreements with predecessor documents | None open: QAF-1 and QAF-2 resolved, CR-2 resolved, CR-1 declined and accepted. One premise correction stands (the fixer's: `makeRes` had 5 importers, not 4), inside the write set | the three predecessor documents |
| Predecessor Assumptions Not Checked this release exercises | (1) QA: Vercel's Node runtime provides `crypto.createHash('sha256')` and `crypto.timingSafeEqual`; closes with register row B-1. (2) Code review: the Statbot caller sends single-message ids as plain decimals of at most 19 digits; closes by a production request-log read of 400s. Both are carried on the handoff above. Neither can be closed before the push by any read this session holds | predecessor documents; handoff |

## Mechanism, re-derived before the first ref moves

| Line | State | Instrument |
|---|---|---|
| Deploy mechanism | **Accepted as written, a named risk**: a push to website `master` is deployed by Vercel to production (scoping determination and brief, his word). Re-derived on the repository side: `.github/` holds `prompts/` only, `release-move.js` prints "workflows none — … absent: a push to master triggers no GitHub Actions workflow"; `vercel.json` carries a `crons` entry only. The Vercel project's production-branch setting and its build settings are unread (outside this workspace's reach); that the push deploys what `next build` just built here rests on that acceptance | `ls website/.github`; `cat website/vercel.json`; dry-run output |
| Rollback | Re-derived by dry-run: `git diff b68f94c 0c14d5b` written to `verification/fix-api-secret-compare/devops/rollback-diff-b68f94c-0c14d5b.patch` (14 paths) and `git apply --check -R <that file>` against the tree at `0c14d5b`: **exit 0**, the reverse applies cleanly. Reverting is a new commit pushed to `master`: a production push of its own, with its own approval. Faster: promoting the previous production deployment (the one built from `b68f94c`) in Vercel, **accepted as written** (a dashboard act of his; not read here). The change is read-only against the database (three credential checks and one id parse gating a `SELECT` and the bot's `get_message` relay), so a rollback carries no data to undo | `git apply --check -R` |
| Ordering constraints | None: one repository, one serving ref, no consumer to re-pin, no publish | `release-move.js --report` |
| Serving refs | Origin `master` only | `release-move.js --report` |
| The release move | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 0c14d5bed78fd938f8290ed9ae57834e093bfdc1 --reason "<names qa/closed/fix-api-secret-compare-qa.md and its Verified-At 0c14d5b>"`. Dry run (with the reason) at 18:2xZ: "ff-from-remote ok; sibling serving refs (none) on one line ok … DRY RUN: every check passed; nothing moved" (`verification/fix-api-secret-compare/devops/release-move-dry-run-with-reason.txt`). The mechanism check "a step that runs a tool the shipped diff changes": the diff changes no tool; `release-move.js` is `~/.claude`'s | dry-run capture |

## Runbook (one ordered artifact; completed rows are the execution record)

| # | Step | Result | Abort criterion |
|---|---|---|---|
| R1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` equals `b68f94cda114bcef1efd59954aba321e246dd683` | (blank) | Any other SHA: stop, a commit landed that this verdict did not see; report to steering |
| R2 | The owner's explicit yes to the release (Phase 2B), recorded below with the way the ask was put and its time | (blank) | No yes, or a decline: mark Aborted, nothing moves |
| R3 | `release-move.js … master 0c14d5b… --dry-run --reason "<…>"` again, immediately before the move | (blank) | Any refusal: stop, report the refusal text, do not re-issue in another form |
| R4 | `release-move.js … master 0c14d5b… --reason "<…>"` (fast-forwards local `master`, pushes `origin/master`, switches the tree back onto `master`) | (blank) | Any refusal or exit other than 0: stop, report; the tree must not be left switched over uncommitted work |
| R5 | `git ls-remote origin master` equals `0c14d5bed78fd938f8290ed9ae57834e093bfdc1`; push SHA and time recorded | (blank) | A different SHA: stop |
| R6 | Post-deploy reads B-1 and the Statbot-ids assumption: not run by this session, carried on `handoff/fix-api-secret-compare-post-deploy-2026-11-21.md` | carried | Not an abort row: a failed B-1 after the push is a rollback decision for the owner (hazard 1 below) |

## User Confirmation

Not yet asked. This section is written after the ask, with the way it was put (selection prompt: the `~/.claude/state/prompt-gate-off` flag is absent at 18:29Z, so prompts are on) and its time.

## Release Execution

Not yet run.

## Post-Release Status

Not yet released. B-1 and the Assumptions Not Checked are carried by `handoff/fix-api-secret-compare-post-deploy-2026-11-21.md`; its Review-Trigger is the deploy event. B-1's instrument was not shown on current production at Stage 1 (this session holds no Discord browser).

## Next Actions

Release ask to the owner (Phase 2B); then R3 to R5; then Phase 2D.
