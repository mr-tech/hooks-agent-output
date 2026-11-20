---
ID: n/a
Origin: fix-message-page-header-decode
UUID: c8a9f0ca
Status: Active
Status-Detail: "Phase 2A readiness. Held at the release-tip verdict gate (step 3): the chain has no QA stage and so no verdict on the tip 7923a1d; QA Phase 3 requested through steering. Nothing pushed. No owner ask is put until the verdict is recorded."
---

# Deployment — fix-message-page-header-decode (website `master`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T02:29 | steering-roadmap-hooks (brief `steering/fix-message-page-header-decode-brief-devops.md`, spawn cue from security's APPROVED at `7923a1d`) | Stage 1 and Phase 2A for `chain/fix-message-page-header-decode` at `7923a1d` | Brief, its common part and every chain document read whole. Stage 1 done: implementation and code-review documents closed `Committed` (record `2596a57`), carrier handoff `handoff/message-page-header-decode-post-deploy-2026-11-20.md` with its P1R kit and crontab line (same record). Tip build `next build` exit 0 in an isolated export. Dry run passed; reversing patch applies. Phase 2A held at step 3 (release-tip verdict). Nothing pushed. Disclosures: the first isolated build failed on the environment validator (no `.env` in an export) and was re-run with `SKIP_ENV_VALIDATION=1`, both captures kept; `crontab <file>` failed on this box's long scratchpad path and the same file was installed with `crontab - < file` (a tool path limit, not a control); the stamp-gate hook refused this row's first time, typed ahead of the clock, and it was re-stamped from `date -u` (a gate satisfied). |

## Plan Reference

No plan: a `fix-` chain (`ID: n/a`). Fixer document `implementation/closed/fix-message-page-header-decode-implementation.md` (`Origin: fix-message-page-header-decode`, UUID `c8a9f0ca`, `Handoff-At: 7923a1d`). Scoping determination: `steering/website-deps-review-rulings.md`, block "2026-11-20T02:03Z". Source handoff the chain answers: `handoff/providers-query-params-header-decode-throws-2026-11-08.md` (`Status: Open`; closing it `Addressed` is steering's at the chain's closure).

## Release Identifier

Website `master` at `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (no tag; the SHA on the serving ref is the identifier).

## Release Date

_Pending the owner's approval._

## Execution Mode

Mode A, agent-executed, in this session, on the owner's sanction put here (Phase 2B). The move is `release-move.js`.

## Release Summary

- **Type:** fix, production. **Environment:** hooks.gg through Vercel: a push to `master` deploys to production; no beta; no GitHub workflow (`.github/workflows` absent; `vercel.json` carries a cron entry only).
- **Epic:** none (a `fix-` chain; the scoping determination names no epic or criterion).
- **What ships** (`git diff --numstat 983681c 7923a1d`): `Providers.tsx` 1/15, a new test 51/0, `package.json` 0/4, `pnpm-lock.yaml` 0/338. The server no longer decodes the client-sent `x-query-params` header (H-001 of `security/website-deps-review-security-audit.md`); `query-string`, `sanitize-html`, `@types/sanitize-html` and the direct `sharp` are removed, so `decode-uri-component` leaves the lockfile.

## Repositories and SHAs shipped

| Repository | Ref | From | To |
|---|---|---|---|
| website | `master` (origin) | `983681ca6cd7cbacd0796ed093e094057ad7f9be` | `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (one commit; a fast-forward) |

No other repository ships. The record repository (`agent-output`) is not a release.

## Serving Ref at Cutover

`master` is the one serving ref at origin (`release-move.js website --report`: "one serving ref at origin (master); no pair"). Other remote branches (`backup`, `external-message-api`, `redesign`, `regex-refactor`) are not serving refs.

## Pre-Release Verification

| Check | Result | Source |
|---|---|---|
| QA | Not in the stage set: 1 production line added, under the 20-line threshold (determination, block "2026-11-20T02:03Z") | rulings file |
| UAT | Not in the stage set | rulings file |
| Code review | APPROVED, `Reviewed-At: 7923a1d9…`, Round 1; red 4/4 at base, green at fix, suite 1913/1913 exit 0, typecheck 0 | `code-review/closed/fix-message-page-header-decode-code-review.md` (record `d67e7d5`) |
| Security | APPROVED, `Reviewed-At: 7923a1d9…`, risk LOW; H-001 exercised on production builds of base and fix | `security/fix-message-page-header-decode-security-audit.md` (record `5640deb`) |
| Anchors | Fixer `Handoff-At: 7923a1d`, code review and security `Reviewed-At: 7923a1d9ac0b…`: all one commit, equal to the chain branch tip and to `HEAD` of the website tree (`git rev-parse HEAD` = `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`, tree `7ff130dfadb7515514d445717c79af0e3cccc768`) | read 2026-11-20T02:28Z |
| Blocking-condition register | No register rows: no QA document exists; the code reviewer's and security's own conditions carry terminal states (no Required Actions; no Required Controls). The one post-deploy row P-1 is carried by `handoff/message-page-header-decode-post-deploy-2026-11-20.md` | documents read |
| **Release-Tip Verdict** | **OPEN.** No QA record exists against the tip, and no Phase 2 verdict whose tree could cover it (none ran). The tip is `7923a1d` itself (one commit over `origin/master` `983681c`, nothing to assemble), so the verdict is owed on exactly the tree the code reviewer and security ran. Requested of QA Phase 3 through steering. Until it is recorded (or the owner waives the gate in his words), the move is blocked: `release-move.js` refuses a real move with neither `--qa-record` nor `--reason` (dry run, `devops/release-move-dry-run-no-evidence.txt`: "evidence none: a real move refuses without --qa-record or --reason") | `~/.claude/agents/devops.md` Phase 2A step 3 |
| Release consistency | No package `version` field. Cross-repo references: `project-utils` `github:hooks-gg/project-utils#master` pinned in the lockfile to `749606d0…`, `paracord` to `3f203086…`; the diff touches neither (`git diff 983681c 7923a1d -- pnpm-lock.yaml \| grep -c -E 'project-utils\|paracord'` = 0). No consumer of website exists in this workspace. The lockfile loses 43 `packages` and 43 `snapshots` keys, adds 0 (fixer's and security's key-set instruments agree) | read 2026-11-20T02:26Z |
| Packaging integrity | Isolated `git archive 7923a1d` export, no `.env`: `pnpm install --frozen-lockfile --offline --ignore-scripts` exit 0 under pnpm 10.28.2 (`devops/packaging-install-7923a1d.txt`); `pnpm run build` exit 0 with `SKIP_ENV_VALIDATION=1` (`devops/packaging-build-7923a1d.txt`). The first build without that variable stopped at the environment validator before any page rendered (`devops/packaging-build-7923a1d-env-validation-refusal.txt`): an export has no `.env`, not a defect of the change. Capped scopes (`systemd-run --user --scope`, `RuntimeMaxSec`, `MemoryMax`, `TasksMax`); the export was deleted | captures |
| Package manager on the host | `packageManager` is `pnpm@10.28.2` and the install ran under it. The lockfile only loses entries. **Accepted as written:** which pnpm major Vercel runs is not read; a named risk, not a verification | `package.json` |
| Workspace cleanliness | Website: `git status --porcelain` shows only `?? .playwright-mcp/` (17 untracked paths, another session's). Record: the chain's paths are committed; unrelated untracked files in `agent-output` (a selection-ledger day file, UAT screenshots of another chain) are not this chain's. The one exclusion predecessor verdicts declare is that untracked `.playwright-mcp/`; `release-move.js` reports it ("untracked 17 path(s) left alone") and its dry run passes, so it affects no release mechanism | `git status` |
| History | No rewrite: `7923a1d` is one commit over `983681c`; `merge-base --is-ancestor 983681c 7923a1d` exit 0 (security re-derived it); the verified SHA is reachable from `chain/fix-message-page-header-decode` | read |
| Serving refs on one line | `release-move.js website --report`: one serving ref, no pair; exit 0 | 2026-11-20T02:28Z |

## Operational text re-derived against the mechanism (before the first ref moves)

| Item | Statement | Mark |
|---|---|---|
| Deploy mechanism | A push to `master` on `git@github.com:hooks-gg/website.git` triggers Vercel's production deploy. No workflow files; `vercel.json` holds only a cron entry | **Accepted as written** (steering's brief and the repository's own deploy practice; the Vercel project link is not read here). Named risk: which commit Vercel builds is the pushed one, by its default-ref behaviour |
| Rollback | Reverse the diff: `git diff 983681c 7923a1d > devops/rollback-7923a1d-to-983681c.patch` (31,372 bytes), then `git apply --check -R` against the tree at `7923a1d`: exit 0. The rollback itself is a new `master` commit and push (a production deploy), so it takes his word | **Re-derived**, instrument `git apply --check -R` (no tree write) |
| Ordering | One repository, one ref; the chain branch merges by fast-forward only. Nothing consumes website's `master` as a pin | **Re-derived** (`release-move.js` dry run: "ff-from-remote ok") |
| Serving refs | `master` only | **Re-derived** (`--report`) |

## Runbook (Mode A; results blank until run)

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git ls-remote origin refs/heads/master` | not `983681ca6cd7cbacd0796ed093e094057ad7f9be` → stop, the base moved | |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe --dry-run --qa-record <release-tip QA record>` | exit ≠ 0 | |
| 3 | The same without `--dry-run` | exit ≠ 0 → stop and report, never retried in another form | |
| 4 | `git ls-remote origin refs/heads/master` | not `7923a1d9…` | |
| 5 | Switch the tree back onto `master` (devops's act, over a tracked-clean tree only), then `git branch -d chain/fix-message-page-header-decode` | a dirty tracked tree → stop, route to the owner | |
| 6 | Fill ledger row E-WEBSITE-PUSH in `handoff/message-page-header-decode-post-deploy-2026-11-20.md` (When, SHA from step 4) and commit it | — | |

The post-deploy read P-1 is not a step: its scheduled reader P1R (crontab line installed 2026-11-20T02:25Z, first fire 04:07Z) gates on step 6's ledger cell.

## Open disagreements with predecessor documents

None open. A qualifier declined, a count disputed or a field flagged stale: none found in the fixer, code-review or security documents (the code reviewer's and the fixer's counts agree: 1913 cases, exit 0; the lockfile figures agree across fixer, reviewer and security).

## Assumption Not Checked, by predecessor, that this release exercises

- **Code review:** Vercel's production `/_next/image` does not depend on the removed direct `sharp`. Closed by row P-1 after the push. Steering's pre-push read (200, `image/png`, `server: Vercel`) is an inference from headers.
- **Security:** the same assumption, listed under "Relied on, not checked here"; plus whether a visitor's header reaches the function on Vercel, which "no longer matters to the fix". Steering's ruling at block "2026-11-20T02:03Z" names that header read (confirmation (b)) as a post-deploy read; the devops brief carries only P-1. Put to steering in this turn's message.

## User Confirmation

_Not asked. The ask follows the release-tip verdict._

## Release Execution

_Not run._

## Post-Release Status

_Not reached._ Rollback Plan: above. Post-release observation: carrier `handoff/message-page-header-decode-post-deploy-2026-11-20.md`, row P-1, reader P1R.

## Next Actions

- QA Phase 3 on website `7923a1d` (release-tip verdict), through steering.
- Phase 2B ask, then Phase 2C, then Phase 2D.
