---
ID: n/a
Origin: fix-website-save-gate-embeds
UUID: 07e578ce
Status: Active
Status-Detail: "Stage 1 and Phase 2A done at website 0e3d903; release ask (Phase 2B) not yet answered. Nothing pushed, no ref moved. Closes Released at Phase 2D."
---

# Deployment Record: fix-website-save-gate-embeds

**Plan Reference**: none (fixer route; owner's selections 7, 13 and 15, `steering/queue-hooks-rulings.md`).
**Stage start**: the QA Phase 2 verdict, `qa/closed/fix-website-save-gate-embeds-qa.md`, `QA Complete`, `Verified-At 0e3d903` (record `6ed8112`; re-read at write time). No UAT on a `fix-` chain. The code review's anchor read `Reviewed-At: 0e3d903` (record `3437072`, sub-entry 3, verdict `APPROVED_WITH_COMMENTS`), re-read at write time.
**Roadmap**: `ls agent-output/roadmap` is absent for this workspace; proceeding with reduced context (nothing cited).
**Release Identifier**: website `master` → `0e3d903ce98e108c7ca848b992ad89ac538f4b44` (no `version` field, no tags, no CHANGELOG; none synthesised).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T10:12 | steering-queue-hooks (brief `devops-save-gate-embeds-brief.md`) | Stage 1 and Phase 2A for `fix/website-save-gate-embeds` at 0e3d903 | Brief and rulings file read whole. The gate the brief named is met: the reviewer's scoped check of `963a25c..0e3d903` is in its document (anchor `0e3d903`, record `3437072`). Register: no rows (QA register, "no rows"). Tip build `next build` exit 0 in an isolated export. QA Phase 3 `Release Verified` at 0e3d903 (record `fc154a2`). Nothing pushed. The read-only query for the owner's live-database check was run on a throwaway local Postgres with 6 positive and 9 negative controls before it was written out. |

## Stage 1 verification (website, at 0e3d903)

| Check | Result | Instrument |
|---|---|---|
| Tree on the fix branch at the head under release | `fix/website-save-gate-embeds`, HEAD `0e3d903ce98e108c7ca848b992ad89ac538f4b44` | `git branch --show-current`; `git rev-parse HEAD` |
| Nothing in scope uncommitted | website `git status --porcelain` 0 lines; record repo: `git status --porcelain -- verification` 0 lines (the two entries it shows, `INBOX.md` and `steering/selection-ledger/2026-11-11.md`, are other sessions' and untouched) | `wc -l` |
| Fix range | 6 commits `6d78b19..0e3d903` (460000b, 08b0d7f, 4b9fadd, abdb71b, 963a25c, 0e3d903); 11 paths: 5 production (44 added, 14 removed lines) and 6 test | `git log --oneline`; `git diff --numstat 6d78b19 0e3d903` |
| Fast-forward onto production | `git merge-base --is-ancestor 6d78b19 0e3d903` exit 0; remote `master` = `6d78b19` (`git ls-remote origin master`, 10:11Z) | exit status; `ls-remote` |
| QA binds the tip | Phase 2 `Verified-At 0e3d903`; Phase 3 `Verified-At 0e3d903`, tip tree `50c575b31e011ae676c6b7054769af4a01ceb556` on both sides (`git rev-parse 0e3d903^{tree}`) | `qa/closed/…-qa.md`, `qa/website-2026-11-11-release-tip-qa.md` |
| Release consistency | `package.json` has no `version` field; `git cat-file -e 0e3d903:CHANGELOG.md` exit 128; `git tag` 0 lines. Cross-repo references and lockfile unchanged in the range: `git diff --quiet 6d78b19 0e3d903 -- package.json pnpm-lock.yaml pnpm-workspace.yaml vercel.json next.config.js .gitignore` exit 0 | exit status; `node` over `package.json` |
| Open disagreements with predecessor documents | none. Two non-gating items stay as their documents carry them: QAF-2 INFO (no action owed), the code review's two INFO items (QA observed the first, R4) | — |

## Blocking-condition register

Authority: `qa/closed/fix-website-save-gate-embeds-qa.md`, "Blocking-condition register": **no rows**. No pre-release row is unterminated; no post-deploy-observable row exists, so no carrier handoff is created. The owner's two checks (live database, user-visible flows incl. the Pusher assumption) are not register rows; they ride the release ask below and are recorded under "Owner checks".

## Stage 2 readiness (Phase 2A, 2026-11-11T10:12)

Included: chain `fix-website-save-gate-embeds` only. Execution mode: **Mode A, agent-executed**, the move run in this session after the owner's answer to the ask in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 (this record's Stage 1 closes the chain's documents) | — |
| Tip assembled | the fix branch itself: a fast-forward of remote `master`; no merge commit | `release-move.js … --dry-run` exit 0, "ff-from-remote ok" |
| Release-tip verdict | `Release Verified` at `0e3d903` (`qa/website-2026-11-11-release-tip-qa.md`, record `fc154a2`); step 1b: 21 open handoffs enumerated, 0 whose whole `Review-Trigger` names this verdict or a website production push | QA's record, read at write time |
| Consistency | see Stage 1 table | |
| Populations (4b) | the release has no consumer/pin population: website is a leaf deployment; no package, pin or subscriber is changed (`git diff --quiet` over `package.json`, lockfile: exit 0) | exit status |
| Packaging (build at the tip) | `npx next build` (Next.js 16.1.6, Turbopack) in an isolated `git archive` export of `0e3d903` (tree `50c575b3…` recorded), `node_modules` copied, under `systemd-run --scope` caps: **exit 0**, "Compiled successfully", 9 static pages generated, 10 app routes and 8 page-router routes listed; 10:10:09Z to 10:10:31Z. Env from the local `.env.local` (values never printed; the build writes nothing remote). Export deleted (`ls -d` exit 2). No lockfile or package-manager change, so the host-major install check does not apply. | `verification/fix-website-save-gate-embeds/devops/next-build-0e3d903.txt`, `…-meta.txt`, `build-tip.sh` |
| Workspace | website `git status --porcelain` 0 lines; HEAD `0e3d903` on `fix/website-save-gate-embeds`. Predecessor exclusion (gitignored `next-env.d.ts`, `.env.local*`) does not affect the move: `release-move` reported "untracked 0 path(s) left alone" | dry-run output |
| History rewritten | no; the verified commit is the tip and reachable | `git cat-file -e` |
| Serving refs | remote heads: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor` (`git ls-remote --heads origin`, 10:11Z). Only `master` is in release-move's serving list: "sibling serving refs (none) on one line ok" | dry-run |

**Phase 2C block (re-derived against the mechanism, per repository: website):**
- **Deploy mechanism.** Re-derived: `.github/` exists but `.github/workflows` is absent (`ls -d` exit 2); `release-move` prints "workflows none"; `vercel.json` holds only a `crons` entry (configuration, not a trigger); `package.json` has no deploy script. **Accepted as written, a named risk**: that a push of `master` builds and serves production through Vercel's git integration. The integration is outside the repo and not read. Evidence on record: `architecture/system-architecture.md` line 168 ("the website deploys on Vercel (owner ruling 2026-08-23)") and the owner's attestations that earlier pushes of `master` were live (`deployment/closed/014-test-suite-cleanup-deployment.md`, `fix-v1-guild-messages-auth-deployment.md`: "Yes, it's live").
- **Rollback.** The reversing patch was dry-run: `git diff 6d78b19 0e3d903 | git apply --check -R` against the tree at `0e3d903`, exit 0 (the revert applies cleanly). The owner's established fast path is Vercel promote of the previous deployment (not exercisable from here, so accepted as written). A git rollback is a new revert commit pushed as a fast-forward; it is the owner's call and a new ask.
- **Ordering.** Dry-run → owner's yes → move → `ls-remote` → owner's checks. Nothing interleaves with the move.
- **Serving refs.** As in the table.

**Runbook (one artifact; results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `6d78b19269408447f2b089ba64c90db05518b6ce` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | `6d78b19…` at 10:11Z (re-run at the move) |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 0e3d903ce98e108c7ca848b992ad89ac538f4b44 --dry-run` | exit ≠ 0 → stop | exit 0, earlier this run (before 10:11Z); re-run at step 4 |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | |
| 4 | the same command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | |
| 5 | `git ls-remote origin refs/heads/master` equals `0e3d903…`; tree on `master`, `git status --porcelain` 0 lines | any difference → route to the owner | |
| 6 | `git branch -d fix/website-save-gate-embeds` (merged); `ls-remote` shows no fix branch on origin | `-d` refuses → name it to the owner; do not force | |
| 7 | the owner's checks (below) | a falsifier seen → Vercel promote of the previous deployment, his call | |

## Owner checks (carried to the release ask)

1. **Live-database read (brief item 1; rulings 08:46Z item 2).** The fix repairs no stored row. Whether any stored message holds V2 components beside only-empty embeds is his to read. No agent reads that database. The query, run here on a throwaway local Postgres (`postgres:16`, container removed, port 55432 free after) over 15 seeded rows: it returned exactly ids 1 to 6 (`{}`, `{title:""}`, `{_key}` only, `{fields:[]}`, `{}` plus `{title:"",url:null}`, a `null` embed), and none of the 9 negative controls (real embed content, one real among empties, classic only, no `embeds` key, empty `embeds` array, an Action Row only, non-array `components`, non-array `embeds`, `{color:0}`). It encodes `hasClassicContent`'s own test and `V2_COMPONENT_TYPE_VALUES = [9,10,11,12,13,14,17]` read at `0e3d903`. Read-only (`SELECT` only). Files: `verification/fix-website-save-gate-embeds/devops/live-db-read.sql`, the seed and control result beside it. Limit: it matches `type` as the JSON number or string; a component whose `type` is anything else is outside it.
2. **His own check of the user-visible flows on hooks.gg** (fixer's "User-visible flows"; QA walked a local build only).
3. **QA's Assumption Not Checked** (Pusher on hooks.gg): inside item 2. Falsified if, on hooks.gg, a "Save as Classic" saver sees "Message Update Detected", or a Save of V2 components beside an empty embed leaves the Send page refusing.

## Post-Release Status

To be written at Phase 2D.

## Next Actions

Standing note: later documents are authoritative on current state. To be written at Phase 2D.
