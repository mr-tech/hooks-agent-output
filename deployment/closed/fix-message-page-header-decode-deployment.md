---
ID: n/a
Origin: fix-message-page-header-decode
UUID: c8a9f0ca
Status: Released
Status-Detail: "Released: website master moved 983681c to 7923a1d at 2026-11-20T02:34:40Z on the owner's release approval, read back at origin. Post-deploy row P-1 is carried by handoff/message-page-header-decode-post-deploy-2026-11-20.md (reader P1R); this record does not wait on it."
---

# Deployment — fix-message-page-header-decode (website `master`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T02:29 | steering-roadmap-hooks (brief `steering/fix-message-page-header-decode-brief-devops.md`, spawn cue from security's APPROVED at `7923a1d`) | Stage 1 and Phase 2A for `chain/fix-message-page-header-decode` at `7923a1d` | Brief, its common part and every chain document read whole. Stage 1 done: implementation and code-review documents closed `Committed` (record `2596a57`), carrier handoff `handoff/message-page-header-decode-post-deploy-2026-11-20.md` with its P1R kit and crontab line (same record). Tip build `next build` exit 0 in an isolated export. Dry run passed; reversing patch applies. Phase 2A held at step 3 (release-tip verdict). Nothing pushed. Disclosures: the first isolated build failed on the environment validator (no `.env` in an export) and was re-run with `SKIP_ENV_VALIDATION=1`, both captures kept; `crontab <file>` failed on this box's long scratchpad path and the same file was installed with `crontab - < file` (a tool path limit, not a control); the stamp-gate hook refused this row's first time, typed ahead of the clock, and it was re-stamped from `date -u` (a gate satisfied). |
| 2026-11-20T02:30 | steering-roadmap-hooks (message) | Route for the release-tip verdict; confirmation (b) | Route 1 taken: `qa-hooks-fix-message-page-header-decode` spawned for QA Phase 3 at `7923a1d`, including step 1b; verdict to this session. Confirmation (b) dropped as a row by steering's ruling; the pre-push preview push is not taken. Held until the QA record arrives. |
| 2026-11-20T02:33 | qa-hooks-fix-message-page-header-decode (message; record `8599120`) | Release-tip verdict | `Release Verified` at `7923a1d`, tree identity re-derived equal. Dry run with `--qa-record` exit 0, "DRY RUN: every check passed; nothing moved" (`devops/release-move-dry-run-qa-record.txt`). Phase 2A complete; Phase 2B ask follows. |
| 2026-11-20T02:36 | owner (selection prompt), devops | Release approved, executed and closed | The owner answered the selection prompt with "Agent: push master to 7923a1d (Recommended)". Move run in this session: `release-move.js` exit 0 at 02:34:36Z to 02:34:40Z; origin `master` read back as `7923a1d9…`. Chain branch deleted. E-WEBSITE-PUSH written to the carrier handoff (`c4e45de`); implementation, code-review and QA Phase 3 documents closed `Released`; architect and security routed by `INBOX.md`. Phase 2D worked in order (section above). Record closed `Released`. |

## Plan Reference

No plan: a `fix-` chain (`ID: n/a`). Fixer document `implementation/closed/fix-message-page-header-decode-implementation.md` (`Origin: fix-message-page-header-decode`, UUID `c8a9f0ca`, `Handoff-At: 7923a1d`). Scoping determination: `steering/website-deps-review-rulings.md`, block "2026-11-20T02:03Z". Source handoff the chain answers: `handoff/providers-query-params-header-decode-throws-2026-11-08.md` (`Status: Open`; closing it `Addressed` is steering's at the chain's closure).

## Release Identifier

Website `master` at `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (no tag; the SHA on the serving ref is the identifier).

## Release Date

2026-11-20T02:34:40Z (website `master` moved; read back at origin).

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
| **Release-Tip Verdict** | **RECORDED (supersedes the OPEN text that follows, kept as the 02:29Z state).** QA Phase 3 `Release Verified`, `Verified-At 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`, tree `7ff130dfadb7515514d445717c79af0e3cccc768`: `qa/website-983681c-7923a1d-release-tip-qa.md`, record commit `8599120`, `Phase` 3, committed clean (`git diff --quiet HEAD` exit 0). Tree identity re-derived here at 02:33Z: `git rev-parse 7923a1d^{tree}` equals the record's tree and the shared tree's `HEAD^{tree}`. QA re-ran the suite (1913/1913, exit 0, all 149 files by path), typecheck (0 on both trees) and the red/green pair (4/4, 4/4) in network-isolated exports; step 1b: 29 open handoffs, 2 members (the P-1 carrier, which fires after the push; `qa-014`, nothing of QA's remains); no gated time-based set. The state at 02:29Z was: no QA record exists against the tip, and no Phase 2 verdict whose tree could cover it exists against the tip, and no Phase 2 verdict whose tree could cover it (none ran). The tip is `7923a1d` itself (one commit over `origin/master` `983681c`, nothing to assemble), so the verdict is owed on exactly the tree the code reviewer and security ran. Requested of QA Phase 3 through steering; steering spawned `qa-hooks-fix-message-page-header-decode` for Phase 3 at `7923a1d` with the open-handoff sweep (message 2026-11-20T02:30Z), verdict to this session; no waiver is put to the owner. Until it is recorded (or the owner waives the gate in his words), the move is blocked: `release-move.js` refuses a real move with neither `--qa-record` nor `--reason` (dry run, `devops/release-move-dry-run-no-evidence.txt`: "evidence none: a real move refuses without --qa-record or --reason") | `~/.claude/agents/devops.md` Phase 2A step 3 |
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
- **Security:** the same assumption, listed under "Relied on, not checked here"; plus whether a visitor's header reaches the function on Vercel, which "no longer matters to the fix". Steering's ruling at block "2026-11-20T02:03Z" names that header read (confirmation (b)) as a post-deploy read; the devops brief carries only P-1. Steering ruled it dropped as a row (message to this session, 2026-11-20T02:30Z): after the fix nothing reads the header, so the read decides nothing. P-1 stays the only post-deploy row.

## User Confirmation

Put to the owner directly by this session as a blocking selection prompt (`~/.claude/state/prompt-gate-off` absent at 2026-11-20T02:33:54Z), after the QA Phase 3 record, the tip build and the dry run with `--qa-record`. The prompt stated: the identifier (`master` `983681c` to `7923a1d`, a fast-forward of one commit, 4 files, +52/−357), the environment (hooks.gg through Vercel; no beta; no GitHub workflow; the Vercel project itself unread, accepted as written from steering's brief), what changes for users, what was checked and what was not (hooks.gg itself; whether Vercel's `/_next/image` works without the direct `sharp`), the rollback, and the fixer's User-visible flows list (three flows, none a gate). Options: push, hold, abort. **Response: "Agent: push master to 7923a1d (Recommended)"**, by selection, answered before 2026-11-20T02:34:30Z (the runbook's first step). Declined: no.

## Release Execution

Mode A. Captures: `verification/fix-message-page-header-decode/devops/runbook-steps-1-2.txt`, `runbook-steps-3-4.txt`, `runbook-step-5.txt`.

| # | Step | Result |
|---|---|---|
| 1 | `git ls-remote origin refs/heads/master` at 02:34:30Z | `983681ca6cd7cbacd0796ed093e094057ad7f9be`, as expected |
| 2 | `release-move.js … --dry-run --qa-record qa/website-983681c-7923a1d-release-tip-qa.md` | exit 0, "DRY RUN: every check passed; nothing moved" |
| 3 | The same without `--dry-run` | exit 0 from 02:34:36Z to 02:34:40Z: "OK moved master: 983681ca… -> 7923a1d9… on origin; tree on master" |
| 4 | `git ls-remote origin refs/heads/master` | `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` (local `master` the same) |
| 5 | Tree on `master` (tracked-clean; `release-move.js` switched it); `git branch -d chain/fix-message-page-header-decode` | exit 0; no `chain/*` branch remains |
| 6 | Ledger E-WEBSITE-PUSH filled in `handoff/message-page-header-decode-post-deploy-2026-11-20.md` | `2026-11-20T02:34:40Z`, `7923a1d9…` (record `c4e45de`) |

**Push evidence (the deployment, per "Deploy evidence"):** ref `master`, SHA `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`, 2026-11-20T02:34:40Z. Serving state is evidenced by the push. Nothing was read from a host.

**Deployed against verified, per repository (website).** Deployed ref `master`; the pushed commit is `7923a1d`, read from `ls-remote` after the move. The code review's and security's `Reviewed-At`, the fixer's `Handoff-At` and the release-tip record's `Verified-At` are all `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`: **the same commit**, so no diff of the surface is owed.

**Deploy mechanism, as accepted:** a push to `master` deploys through Vercel (no workflow). Named risk, not a verification: that Vercel builds the pushed commit by its default-ref behaviour.

## Post-Release Status

Status `Released` at 2026-11-20T02:34:40Z. Authorizer: the owner (selection above). Included plans: none (a `fix-` chain); the one chain `fix-message-page-header-decode`. Known issues: none known. Rollback Plan: above (a reversing `master` commit; the patch applies cleanly; the push takes his word).

Post-release observation, carried and not held open by this record: row P-1 (`/_next/image` after the direct `sharp` was removed) in `handoff/message-page-header-decode-post-deploy-2026-11-20.md`, reader P1R, first fire at or after 02:49:40Z is 04:07Z. A 5xx there is a rollback question for the owner.

## Phase 2D reconciliation

**The chain's documents** (enumerated by `grep -rl "UUID: c8a9f0ca"` and `Origin: fix-message-page-header-decode` over the record), with terminal tokens:

| Document | Status | Location |
|---|---|---|
| `implementation/closed/fix-message-page-header-decode-implementation.md` | Released | `implementation/closed/` |
| `code-review/closed/fix-message-page-header-decode-code-review.md` | Released | `code-review/closed/` |
| `qa/website-983681c-7923a1d-release-tip-qa.md` (Phase 3) | Released | `qa/closed/` |
| `deployment/fix-message-page-header-decode-deployment.md` (this record) | Released | `deployment/closed/` |
| `security/fix-message-page-header-decode-security-audit.md` | `Active`, stays open: it closes (`Review Complete`) when the chain closes, and that is security's. Routed by one `INBOX.md` entry (2026-11-20, devops-hooks-fix-message-page-header-decode), citing the P-1 carrier | `security/` |
| `handoff/message-page-header-decode-post-deploy-2026-11-20.md` | `Open`: carries P-1, closes when P1R's completion row lands | `handoff/` |

No other open `fix-` chain document exists (`grep -rl '^Origin: "\?fix-'` outside `closed/`: this chain's two only), so no other fix chain's `Handoff-At` needs the ancestor check. The fix branch is merged (`git branch -d` exit 0) and deleted.

**Handoffs the chain answered:** `handoff/providers-query-params-header-decode-throws-2026-11-08.md`, `Status: Open`. The release makes its work (`getMessage` removed, so the header is no longer decoded); closing it `Addressed` is steering's at the chain's closure.

**Architecture:** `architecture/system-architecture.md:179` lists `sharp` among website's dependencies, which the release removed as a direct dependency. Routed to the architect by one `INBOX.md` entry. Nothing in `architecture/` was edited.

**Roadmap:** a `fix-` chain owes none (the scoping determination names no epic or criterion).

**Forward items beyond the register** (`grep -l 'Assumption Not Checked'` over the chain's documents: the code review, the QA Phase 3 record, and this record; security's equivalent is its "Relied on, not checked here"):
- Vercel's `/_next/image` without the direct `sharp` (code review, security, QA Phase 3): carried by row P-1 of the post-deploy handoff.
- The unread `x-query-params` write in `middleware.ts:17-21` (fixer observation; security I-2; QA step 3): carried at `steering/website-deps-review-rulings.md`, block "2026-11-20T02:11Z" (leaves it; no handoff). QA notes it for the separate H-002/M-001 chain.
- CR-1, the commented-out `sanitizeHtml(` call in `JsonModalBody.tsx`: carried at the same file, block "2026-11-20T02:18Z".
- `package.json`'s `overrides` key does nothing under pnpm (security I-3): carrier `security/website-deps-review-security-audit.md` I-6.
- Confirmation (b), the client-header read: dropped as a row by steering's ruling (message 2026-11-20T02:30Z).
- Whether pnpm major on Vercel matches 10.28.2: accepted as written (named risk above); no carrier is owed.

## Next Actions

None owed by this record. Rows whose trigger is at or after its closure have carriers: P-1 (the post-deploy handoff, reader P1R), security's closure (INBOX entry), the architecture line (INBOX entry), the source handoff's closure (steering).
