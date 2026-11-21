---
ID: n/a
Origin: fix-recent-message-ids
UUID: c304ae49
Status: Active
Status-Detail: "Stage 1 and Phase 2A done at website 6f76c6d; nothing pushed. Held for the owner's release approval (Phase 2B), asked in this session. Post-deploy: P-1 is run here after the push; P-2 rides handoff/fix-recent-message-ids-post-deploy-2026-11-21.md."
---

# Deployment Record: fix-recent-message-ids

**Plan Reference**: none (fixer chain; the owner's scope selection, `steering/fixer-queue-2026-11-21-rulings.md` blocks 2026-11-21T05:32Z and 05:38Z; the scoping determination, `steering/fix-recent-message-ids-rulings.md` block 2026-11-21T05:43Z, with the 06:27Z block).
**Stage start**: QA Phase 2 `qa/fix-recent-message-ids-qa.md`, `Status` `QA Complete`, `Verified-At` `6f76c6d` (record `ec750c0`), re-read at write time. There is no UAT on this chain. Anchors re-read at the record, all at `6f76c6d`: fixer `Handoff-At` (`implementation/fix-recent-message-ids-implementation.md`, record `74eace6`/`3b2f973`), code review `Reviewed-At` `6f76c6d`, `Verdict` `APPROVED_WITH_COMMENTS` (sub-entry 1.1, record `b6d5634`), QA Phase 3 `Verified-At` `6f76c6d` (record `5379096`).
**Roadmap**: `agent-output/roadmap/` was not read for this stage; the determination names no epic or criterion, so the chain owes the roadmap no entry. Nothing is cited from it.
**Release Identifier**: website `master` `76da25ccd8fbd063803d4896b9eda3c3759d7221` → `6f76c6de2daab590777c047e9439cf5f5a9ed215`. `package.json` carries no `version` field (`grep -c '"version"'` 0), the repo has no CHANGELOG and no tags (`git tag | wc -l` 0); none synthesised.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T06:43 | steering-hooks (brief `steering/fix-recent-message-ids-brief-devops.md` with its common part, on QA's PASS at `6f76c6d`) | Stage 1 and Phase 2A for `chain/fix-recent-message-ids` at `6f76c6d` | Briefs, QA, code review, rulings read whole. Tip build `next build` exit 0 in an isolated export (removed). Dry run passed; reversing patch applies. QA Phase 3 requested and received (record `5379096`). Pre-push Vercel log baseline read. Carrier handoff for P-2 created. Nothing pushed. Disclosures: (1) the stamp gate refused the carrier handoff's first changelog row, whose minute I typed ahead of the clock; it was re-stamped through `record-edit.js` (a gate satisfied). The same gate refused this document's own first changelog row for the same reason (a minute typed ahead of the clock); re-stamped the same way. (2) A throwaway `mktemp -d` under `/tmp/claude-1000/` was created and removed (`rmdir`) before use, since the scratchpad was the right place; no build ran there. (3) This session has no `mcp__playwright__*` tools, so the P-2 read, and its pre-push baseline, were not made here (see P-2) |

## Stage 1 verification (website, at 6f76c6d)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-recent-message-ids`, HEAD `6f76c6de2daab590777c047e9439cf5f5a9ed215` (commit time 2026-11-21T06:28:45Z), no upstream (`git config --get branch.chain/fix-recent-message-ids.remote` exit 1; no `chain/*` head on origin, `ls-remote --heads origin 'chain/*'` 0 lines) | `git branch --show-current`; `git rev-parse` |
| Nothing in scope uncommitted | website `git status --porcelain`: the one entry is `?? .playwright-mcp/` (17 untracked paths `release-move` leaves alone, not this chain's). Record: the chain's stage documents are committed (`qa` `ec750c0`, code review `b6d5634`, implementation `3b2f973`, rulings and brief `939396f`); the only untracked paths under `verification/fix-recent-message-ids/` were this stage's `devops/` and QA's `qa/phase-3/`, committed with their records | `git status --porcelain` |
| Chain range | 4 commits `76da25c..6f76c6d` (408702d, b766367, 8f24e65, 6f76c6d); 8 paths. Production lines added (`git diff --numstat origin/master 6f76c6d -- src ':!**/__tests__/**'`): user.ts 4, shared.ts 11, auth.ts 15 = **30**. The fixer's, the reviewer's and QA's counts are 30 as well; no disagreement | `git log --oneline`; `git diff --numstat` |
| Fast-forward onto production | `git merge-base --is-ancestor origin/master 6f76c6d` exit 0; remote `master` = `76da25c` (`git ls-remote origin master`, after `git fetch`) | exit status; `ls-remote` |
| QA binds the tip | Phase 2 `Verified-At` `6f76c6d`; the tip's tree is `fc58d634ebc3f600524fe7d7c69da1c4a4eb2b8a` (`git rev-parse 6f76c6d^{tree}`), **the tree that verdict ran against (the same SHA)**. QA Phase 3 re-derived the same tree | the QA documents |
| Release consistency | `package.json` has no `version`; no CHANGELOG, no tags. `git diff --name-only origin/master 6f76c6d` outside `src/` prints 0 lines: manifests, lockfile, `vercel.json` and configs are unchanged. The one cross-repo dependency, `project-utils: github:hooks-gg/project-utils#master`, is locked to `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` (`pnpm-lock.yaml` lines 166–168, 5397–5398), the current remote `master` of project-utils (`git -C project-utils ls-remote origin master`) and the sibling clone's HEAD. The chain changes nothing in project-utils; the pin names the intended target | exit status; `ls-remote` |
| Open disagreements with predecessor documents | none open. Recorded, not disputed: code review CR-1 (canonical form of a stored id), routed to `handoff/hydrated-recent-ids-not-canonicalised-2026-11-21.md` (UUID 09ed9be5), which stays open on its own trigger | the documents |

## Blocking-condition register (the chain's one register)

Authority: `qa/fix-recent-message-ids-qa.md`, "Blocking-condition register": it has **no rows**, so none is unterminated and nothing pre-release blocks. The code review and fixer documents carry no register row. The plan-at-rest step (2c) does not apply: the chain has no plan, no critique and no Planner batch. The post-deploy rows owed come from steering's brief and QA's and the reviewer's Assumption Not Checked, and are rows of this record (below): P-1 is read in this session after the push; P-2 is carried in full by `handoff/fix-recent-message-ids-post-deploy-2026-11-21.md` (Owning-Stage `uat`, created at Stage 1). No crontab line: the P-2 reader is a uat-role session spawned by steering after the push, not a timed read.

## Stage 2 readiness (Phase 2A)

Included: chain `fix-recent-message-ids` only. Execution mode: **Mode A, agent-executed**, the move run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 (Stage 1 closes the chain's committed documents) | — |
| Tip assembled | the chain branch itself, a fast-forward of remote `master`; no merge commit and nothing assembled on a scratch branch | `release-move.js … --dry-run`: "ff-from-remote ok" |
| Release-tip verdict | QA Phase 2 `Verified-At` `6f76c6d` covers the tip (tree `fc58d634…` both sides). Phase 3 record `qa/website-6f76c6d-release-tip-qa.md`, `Status` `Release Verified`, `Verified-At` `6f76c6d`, record commit `5379096`. Step 1b: `verification/fix-recent-message-ids/qa/phase-3/handoff-trigger-sweep.py`, 32 handoffs read, 32 `Open`, 19 matching the pre-filter, a `grep -l` cross-check also 32; one names a website release (`website-git-dependencies-resolve-unpinned-2026-11-20.md`, a lockfile pin check that holds: both pins identical at `76da25c` and `6f76c6d`); no gated time-based set in the workspace | QA's record; message 2026-11-21T06:4xZ |
| Consistency | see the Stage 1 table | |
| Populations (4b) | website is a leaf deployment. The one pin, project-utils, is unchanged and current. No package, subscriber or consumer is changed (`git diff --name-only` outside `src/`, 0 lines). Re-derived at the mechanism | exit status |
| Packaging (build at the tip) | `pnpm exec next build` (Next.js Turbopack, node v24.14.0, pnpm 10.28.2) in an isolated `git archive` export of `6f76c6d` (tree `fc58d634…`), `node_modules` copied, the Production variable names set to dummy values (no `.env.local` copied, nothing remote written), under `systemd-run --user --scope` caps (900 s, 6 G, 2000 tasks): **exit 0**, "Compiled successfully", 9 static pages, 9 app routes, 8 page-router routes and the proxy; 2026-11-21T06:39:46Z to 06:40:12Z. Export deleted (`ls -d` exit 2). The diff carries no lockfile or package-manager change, so the host-major install check does not apply | `verification/fix-recent-message-ids/devops/next-build-6f76c6d/{build-output.txt,meta.txt,exit}` (`build-output.txt` is `build.log` copied, since `*.log` is ignored), `…/devops/build-tip.sh` |
| Workspace | all four chain commits are on the branch; website porcelain as above. Predecessor exclusions: `.env.local*`, `.next`, `.vercel`, `node_modules` and tsbuildinfo files are ignored (`git status --porcelain --ignored`), the untracked `.playwright-mcp/` is left alone by `release-move`. None affects a release mechanism: the move is a push of a commit and Vercel builds from the pushed tree | `git status --porcelain --ignored`; dry-run output |
| History rewritten | no; the verified commit is the tip and is reachable | `git merge-base --is-ancestor` |
| Serving refs | remote heads: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor`. `release-move --report`: "one serving ref at origin (master); no pair". The split check is trivially met; no ref but `master` moves | `release-move.js --report` exit 0 |

**Assumption Not Checked, swept (Phase 2A step 9b).** Each predecessor's, with what the release form exercises and the read that closes it:
- **Code review** (every production `Users.preferences.recentMessageIds` is an array or absent): the release exercises it on every signed-in session request. Closed by **P-1**, the post-deploy read of the production runtime logs for `ids.filter is not a function`. A live session could not run it before the push: it needs the new code serving.
- **QA Phase 2, first item** (Discord's `/users/@me/guilds` returns `permissions` in the form `hasDiscordPermissions` parses): exercised on every hydration. Closed by **P-2**, carried by the handoff. No session with the browser could run it before the push (and the old build proves nothing about the new trim).
- **QA Phase 2, refresh** (NextAuth's adapter hands `hydratedAuthCallback` `user.preferences` as parsed JSON): the same item as the code review's; closed by P-1.
- **QA Phase 3** (Vercel installs with the frozen lockfile): the diff changes no manifest or lockfile, so the resolution Vercel makes is the one it made for the current production build. Not read from the host; **accepted as written, a named risk**, with `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` as its owner (stays Open with its edit limb unfired).
- **Hazards the sweep did not cover** (the brief): no production count of stored bad or foreign ids; other writers of `Users.preferences` not enumerated; NextAuth internals and the 600-second guild cache not exercised. Named risks, not closed by this release; no read of production's `Users` table is owed or available to an agent. A user who loaded a server message's number into his list without administering that server loses it from his recent list after release (read from code, not run; intended by the scope).

**Phase 2C block, re-derived against the mechanism (repository: website; only repository shipped):**
- **Deploy mechanism.** Re-derived: `website/.github/workflows` is absent (`release-move` prints "workflows none — … absent"; `ls website/.github` shows only an untracked `prompts/`). `vercel.json` holds only a `crons` entry (configuration, not a trigger; the diff does not touch it). The git-integration deploy is re-derived from earlier pushes, not read from the host: the closed record `deployment/closed/fix-personal-message-access-deployment.md` (the push of `983681c`, 2026-11-20T01:33:58Z) cites chain 017's capture of a Vercel deployment with `source: git`, `target: production`, `githubCommitRef: master` created two seconds after that chain's push. **Accepted as written, a named risk**: which commit the integration checks out is its default-ref behaviour. The push is the deploy evidence.
- **Rollback.** Dry-run: `git diff origin/master 6f76c6d` written to `verification/fix-recent-message-ids/devops/release-76da25c-6f76c6d.diff` (20237 bytes), `git apply --check -R` on it against the tree at `6f76c6d`, exit 0 (the revert applies cleanly; `rollback-apply-check.exit`). The owner's established fast path is Vercel promote of the previous deployment (the one serving `76da25c`); not exercisable from here, **accepted as written**. A git rollback is a new revert commit pushed as a fast-forward, which is a new ask. The fix writes no schema and one stored value (`Users.preferences`, overwritten by the user's next save), so a rollback restores the pre-fix reads and writes; a list a user re-saved clean under the new build stays clean.
- **Ordering.** Website only. The diff is `src/` only and uses no new column, table or env variable; project-utils and its schema are unchanged, no migration is involved. Order: dry run, QA's Phase 3 record, the owner's yes, the move, `ls-remote`, then P-1 (here) and P-2 (the handoff's reader). Nothing interleaves with the move.
- **Serving refs.** As in the table: `master` only.
- **A release step that runs a tool the diff changes**: none; the move runs `release-move.js` from `~/.claude/tools/`, which this diff does not touch.

**Read rows run once before the first go (live value beside the prediction):**

| Row | Pre-push read | Prediction | Reading |
|---|---|---|---|
| P-1 baseline | `vercel logs` (v66.2.0, `-p hooks-gg-website --scope hooks-gg -e production -s 23h`), 2026-11-21T06:4xZ: 373 records, 308 on the session route, `ids.filter is not a function` count 0, any "is not a function" 0; window 2026-11-20T08:08Z to 2026-11-21T06:32Z. `verification/fix-recent-message-ids/devops/vercel-baseline-pre-push.txt` | the instrument is live (control > 0) and the line is absent on the old build | as predicted |
| P-2 baseline | **not made**: this session has no `mcp__playwright__*` tools, and the skill forbids loading them from a session not launched with `--browser`. Recorded as not done for that reason | — | not done |

**Runbook (one artifact; the results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `76da25ccd8fbd063803d4896b9eda3c3759d7221` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 6f76c6de2daab590777c047e9439cf5f5a9ed215 --dry-run --qa-record /usr/local/bin/hooks/agent-output/qa/website-6f76c6d-release-tip-qa.md` | exit ≠ 0 → stop | an earlier dry run with the `--reason` form: exit 0 at 2026-11-21T06:39:49Z, "ff-from-remote ok; sibling serving refs (none) on one line ok … DRY RUN: every check passed; nothing moved" (`release-move-dry-run-1.txt`). Re-run with `--qa-record` below |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | |
| 4 | the step 2 command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | |
| 5 | `git ls-remote origin refs/heads/master` equals `6f76c6de…`; tree on `master`, `git status --porcelain` shows only `?? .playwright-mcp/` | any difference → route to the owner | |
| 6 | `git branch -d chain/fix-recent-message-ids` (merged); `ls-remote --heads origin 'chain/*'` shows none | `-d` refuses → name it to the owner; do not force | |
| 7 | write E-WEBSITE-PUSH into the carrier handoff's ledger; tell steering to spawn the P-2 reader | — | |
| 8 | **P-1**: `npx -y vercel@66.2.0 logs -p hooks-gg-website --scope hooks-gg -e production -s 1h --json -n 10000`, counted only (no raw text kept): records at or after the push time on the session route (control), and `ids.filter is not a function` (failure line) | failure line ≥ 1 → falsifier: the new build fails sessions; route to the owner at once (Vercel promote of the previous deployment is his call). Control 0 → undecided, not passed: read again after traffic, and create the scheduled reader (launcher + crontab line) before closing. Predicted: failure 0, control > 0 | |
| 9 | **P-2**: the uat-role reader of `handoff/fix-recent-message-ids-post-deploy-2026-11-21.md`; not run by this session | the handoff's falsifier → the owner | |

## User Confirmation

(Not yet asked. To be put by this session as a selection prompt after QA's Phase 3 record, which exists, and with the dry-run result.)

## Release Execution

(Not yet executed.)

## Post-Release Status

(Not yet released.)
