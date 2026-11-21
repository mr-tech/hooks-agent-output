---
ID: n/a
Origin: fix-recent-message-ids
UUID: c304ae49
Status: Released
Status-Detail: "Released 2026-11-21T06:45:05Z: website master 76da25c -> 6f76c6d on origin (release-move.js exit 0; ls-remote read back), on the owner's release approval. Chain branch merged and deleted. P-1 (production log read) and P-2 (hooks.gg test-account read) both read, neither falsified; P-2 handoff Addressed."
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
| 2026-11-21T06:58 | devops-fix-recent-message-ids | Release approved, executed and closed | The owner answered the selection prompt with "Agent: push master to 6f76c6d (Recommended)". Move run in this session: `release-move.js` exit 0 at 06:45:00Z to 06:45:05Z; origin `master` read back as `6f76c6d`. Chain branch deleted. E-WEBSITE-PUSH written to the carrier handoff (`4b2bfec`); QA Phase 3 record and the fixer's document `Released`; architecture line already lodged by the fixer. P-1 read here (three reads, no failure line); P-2 read by `uat-fix-recent-message-ids`, PASS. Phase 2D worked in order (section above). Record closed `Released`

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
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `76da25ccd8fbd063803d4896b9eda3c3759d7221` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | `76da25ccd8fbd063803d4896b9eda3c3759d7221` at 2026-11-21T06:44:53Z, just before the move (`step1-ls-remote-before.txt`). Abort criterion not met |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 6f76c6de2daab590777c047e9439cf5f5a9ed215 --dry-run --qa-record /usr/local/bin/hooks/agent-output/qa/website-6f76c6d-release-tip-qa.md` | exit ≠ 0 → stop | an earlier dry run with the `--reason` form: exit 0 at 2026-11-21T06:39:49Z, "ff-from-remote ok; sibling serving refs (none) on one line ok … DRY RUN: every check passed; nothing moved" (`release-move-dry-run-1.txt`). Re-run with `--qa-record` at 2026-11-21T06:44:54Z immediately before step 4: exit 0, "DRY RUN: every check passed; nothing moved" (`release-move-dry-run-2.txt`) |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | Yes, by selection, answered before 06:44:53Z: "Agent: push master to 6f76c6d (Recommended)" (see User Confirmation) |
| 4 | the step 2 command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | exit 0, 2026-11-21T06:45:00Z to 06:45:05Z: "OK moved master: 76da25ccd8fbd063803d4896b9eda3c3759d7221 -> 6f76c6de2daab590777c047e9439cf5f5a9ed215 on origin; tree on master" (`release-move-real.txt`) |
| 5 | `git ls-remote origin refs/heads/master` equals `6f76c6de…`; tree on `master`, `git status --porcelain` shows only `?? .playwright-mcp/` | any difference → route to the owner | `ls-remote` = `6f76c6de2daab590777c047e9439cf5f5a9ed215` at 06:45:09Z; `branch --show-current` = `master`; `rev-parse HEAD master` both `6f76c6de…`; porcelain `?? .playwright-mcp/` only. Pass (`post-move-readback.txt`) |
| 6 | `git branch -d chain/fix-recent-message-ids` (merged); `ls-remote --heads origin 'chain/*'` shows none | `-d` refuses → name it to the owner; do not force | `git branch -d` exit 0 ("Deleted branch chain/fix-recent-message-ids (was 6f76c6d)"); `git branch --list 'chain/*'` and `ls-remote --heads origin 'chain/*'` both empty; `git merge-base --is-ancestor 6f76c6d origin/master` exit 0. Pass |
| 7 | write E-WEBSITE-PUSH into the carrier handoff's ledger; tell steering to spawn the P-2 reader | — | E-WEBSITE-PUSH written (record `4b2bfec`); spawn cue for the P-2 reader sent to `steering-hooks` at 06:46Z. Done |
| 8 | **P-1**: `npx -y vercel@66.2.0 logs -p hooks-gg-website --scope hooks-gg -e production -s 1h --json -n 10000`, counted only (no raw text kept): records at or after the push time on the session route (control), and `ids.filter is not a function` (failure line) | failure line ≥ 1 → falsifier: the new build fails sessions; route to the owner at once (Vercel promote of the previous deployment is his call). Control 0 → undecided, not passed: read again after traffic, and create the scheduled reader (launcher + crontab line) before closing. Predicted: failure 0, control > 0 | **EXECUTED, not falsified** (`p1-read.py`, three reads, all exit 0, window 2h, counts only: 06:46:11Z, 06:47:5xZ, 06:57:2xZ; `p1-read-2.txt`, `p1-read-3.txt`). The new deployment (`dpl_DnUVq7QcUdWiVdAWWcyHaXH9HGay`) first logs at 06:45:47Z, 42 seconds after the push; it carries 21 session-route and 7 `message.get` stderr records, all in its first 35 seconds. `ids.filter is not a function`: **0**; any "is not a function": 0 (before the push, over 23 h: 0 and 0). Prediction held (failure 0, control > 0). Limits, stated: the function logs keep stderr lines only, never a request record, so the number of signed-in requests the new build served cannot be counted from them, and the session-route lines are cold-start lines (the kind `verification/017/qa-phase1/vercel-runtime-logs/README.md` describes). The window after the new build began is about 12 minutes of traffic, and retention is under a day. The one hydration read with a real stored list on the new build is the uat session's P-2 walk (two accounts, one holding a stored server message number): no failure line followed it. So the reviewer's assumption (every stored `recentMessageIds` is an array or absent) is not falsified in this window and is not established beyond it. A read within the next ~22 hours, while retention still reaches the push, would widen the window: `python3 -I verification/fix-recent-message-ids/devops/p1-read.py 2026-11-21T06:45:05Z <scratch> 23h`. It is not owed; it is the only widening available and it expires |
| 9 | **P-2**: the uat-role reader of `handoff/fix-recent-message-ids-post-deploy-2026-11-21.md`; not run by this session | the handoff's falsifier → the owner | **EXECUTED, PASS** by `uat-fix-recent-message-ids` (handoff `c3c76c16`, now `handoff/closed/fix-recent-message-ids-post-deploy-2026-11-21.md` `Addressed`; record commits `5a245a9`, `7112fd5`, `53a359f`, `4cd9c52`). First read 06:46Z was undecidable (no server row in the list); after a test message (6029) was saved in the Claude server: account 1 (admin of Claude) lists 6029, account 2 (member) omits it with 6029 in its stored list. Both limbs as predicted, which also shows the new filter serving. 6029 deleted and account 1's list restored by one `user.updatePreferences` call (200). I read the handoff's Status and Result at the record; the walk itself is theirs |

## User Confirmation

Put to the owner directly by this session as a blocking selection prompt (`~/.claude/state/prompt-gate-off` absent at 2026-11-21T06:43Z), after QA's Phase 3 record (`5379096`), the tip build and the dry run, with `origin/master` re-read as `76da25c` and the tip as `6f76c6d` immediately before. The prompt stated: the identifier (`master` `76da25c` → `6f76c6d`, a fast-forward of 4 commits, 30 production lines, 8 files, `src/` only), the environment (hooks.gg through Vercel git integration, no beta, no GitHub workflow, no self-hosted runner), what changes for users (read from code, covered by the suite, not run on production), the one user-visible loss (a server message number loaded without administering that server leaves his recent list), what was checked and what was not (production itself; the hooks.gg read goes to a browser-capable session because this one has none), and the rollback. Options: push, hold, abort. **Response: "Agent: push master to 6f76c6d (Recommended)"**, by selection, answered before 2026-11-21T06:44:53Z. Declined: no.

## Release Execution

Mode A. Commands and results are in the runbook. `release-move.js` exit 0 with `--qa-record qa/website-6f76c6d-release-tip-qa.md` (now `qa/closed/…`); origin `master` = `6f76c6de2daab590777c047e9439cf5f5a9ed215`, read by `git ls-remote origin refs/heads/master` at 06:45:09Z. Push ref `master`, SHA `6f76c6de…`, timestamp 2026-11-21T06:45:00Z to 06:45:05Z. Captures: `verification/fix-recent-message-ids/devops/{step1-ls-remote-before.txt,release-move-dry-run-2.txt,release-move-real.txt,post-move-readback.txt}`.

**Serving state**: the push is the deploy evidence, complete as it stands, and it is recorded VERIFIED on the push. What Vercel built is not read from the host and is not marked NOT VERIFIED. Named risk, accepted as written: which commit the git integration checks out is its default-ref behaviour (see "Deploy mechanism"). The uat session's P-2 walk (account 2's stored 6029 omitted from its list) is the same fact seen on hooks.gg.

## Phase 2D: release metadata and reconciliation

Standing note: point-in-time as of 2026-11-21T07:00Z; the serving line may have moved since, and later records are authoritative on their own refs.

| Field | Value |
|---|---|
| Release identifier | website `master` → `6f76c6de2daab590777c047e9439cf5f5a9ed215` (was `76da25ccd8fbd063803d4896b9eda3c3759d7221`; no version field, no tags; none created) |
| Environment / serving ref | production (Vercel git integration, no beta); `master`, the sole serving ref (`release-move --report`: no pair) |
| Release date | 2026-11-21, 06:45:05Z |
| Execution mode | Mode A, agent-executed, in this session |
| Authorizer | the owner, by selection at the Phase 2B prompt |
| Included plans | none; chain `fix-recent-message-ids` only (fixer route, `ID: n/a`, UUID `c304ae49`) |
| Repositories and SHAs shipped | `website` only: `76da25c` → `6f76c6d` (408702d, b766367, 8f24e65, 6f76c6d). `project-utils` is read only and unchanged; `agent-output` is the record, not a shipped repository |

**Deployed against verified, per repository (website).** Deployed ref `master`; the pushed commit is `6f76c6d`, read from `ls-remote` after the move. Phase 2's `Verified-At`, the release-tip record's `Verified-At`, code review sub-entry 1.1's `Reviewed-At` and the fixer's `Handoff-At` are all `6f76c6d`. **The same commit**, so no diff of the surface is owed.

**Fix branch.** `chain/fix-recent-message-ids` is merged (`git merge-base --is-ancestor 6f76c6d origin/master` exit 0) and deleted by `git branch -d` (exit 0, output in `post-move-readback.txt`; no such head on origin). It never had an upstream.

**Architecture lines.** `system-architecture.md:136` ("returns the user's own rows and guild rows") is false from this release: the hydrated list returns a server's row only to an owner or Administrator of it. The fixer lodged it for the architect in `INBOX.md` ("2026-11-21 — fixer-fix-recent-message-ids — FYI", line 308 at write time); I add no second entry. The roadmap: the determination names no epic or criterion, so a `fix-` chain owes none.

**The chain's documents and terminal tokens** (enumerated by `grep -rl "Origin: fix-recent-message-ids"` over the record, plus the Phase 3 record by its own Origin):

| Document | Terminal token | Where |
|---|---|---|
| `implementation/…-implementation.md` | Released | `implementation/closed/` |
| `code-review/…-code-review.md` | Committed | `code-review/closed/` |
| `qa/…-qa.md` (Phase 2) | Committed | `qa/closed/` |
| `qa/website-6f76c6d-release-tip-qa.md` (Phase 3) | Released | `qa/closed/` |
| this deployment record | Released | `deployment/closed/` |
| `handoff/…-post-deploy-2026-11-21.md` (P-2 carrier, UUID c3c76c16) | Addressed (by `uat-fix-recent-message-ids`) | `handoff/closed/` |

`fix-` chains whose `Handoff-At` is an ancestor of `6f76c6d` (`git merge-base --is-ancestor`, loop over every `fix-*` implementation document): this chain and earlier ones, all already terminal — `Released` for `fix-agent-comment-sweep-merge`, `fix-dialog-closes-on-first-portal-load`, `fix-message-page-header-decode`, `fix-personal-message-access`, `fix-trpc-batch-limit`, `fix-website-save-gate-embeds`; `Committed` for `fix-v1-guild-messages-auth` (closed, with its own `Released` deployment record). Earlier releases' documents; none is this release's to rewrite. **The handoffs the chain answered** (its scoping block's sources), with their `Status` at this write: `handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md` (UUID 98f075f4) `Open`; `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` (UUID af63220f) `Open`. This release discharges both (items 1 to 3 of the scope statement); closing them `Addressed` is steering's, at the chain's closure.

**Forward items beyond the register**, found by `grep -l 'Assumption Not Checked'` over the chain's documents (code review, QA Phase 2, QA Phase 3; the fixer's document has none) and the routing phrases:
- Code review's and QA's refresh assumption (stored `recentMessageIds` is an array or absent): row P-1, above; not falsified in a ~12 minute window, not established beyond it. The widening read is stated in the row.
- QA Phase 2's assumption (Discord's `permissions` wire form): P-2, `handoff/closed/fix-recent-message-ids-post-deploy-2026-11-21.md`, EXECUTED, prediction held.
- QA Phase 3's assumption (Vercel installs with the frozen lockfile): the diff changes no manifest or lockfile; accepted as written, owner `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` (`Open`, its edit limb unfired by this release, QA's pin check).
- `handoff/hydrated-recent-ids-not-canonicalised-2026-11-21.md` (UUID 09ed9be5, the reviewer's CR-1): stays `Open`, own trigger (`keepMessageNumbers` or `hydratedAuthCallback` next edited).
- `handoff/authorize-guild-admin-tests-membership-not-admin-bits-2026-11-19.md` (Owning-Stage steering): QA reads its open question as now established and tested by `redis.fetch-user-guilds.test.ts`; its disposition is steering's.
- `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md`: fires only if a post-deploy read covers `/api/trpc` status codes; P-1 counted stderr lines by prefix and did not, so it is not fired.
- Hazards the sweep did not cover (the brief): no production count of stored bad or foreign ids; other writers of `Users.preferences` not enumerated; NextAuth internals and the 600-second guild cache not exercised. Named risks, carried here only; no agent read path exists for production's `Users` table.
- Retrospective: not mine to invoke; it joins the next fixer batch (ruling 05:43Z). The spawn cue goes to steering in this turn's message.

## Post-Release Status

- **Status**: Released, 2026-11-21T06:45:05Z. Deploy evidenced by the push. P-1 and P-2 both read; neither falsified.
- **Known issues**: none open in this chain's code. Limits: P-1's window and its stderr-only logs (above); a user who loaded a server message's number without administering that server loses it from his recent list (intended by the scope). One production write by the uat session during P-2: test message 6029 in the Claude server, deleted, and test account 1's stored list restored (handoff changelog).
- **Rollback plan**: Vercel promote of the previous deployment (the one serving `76da25c`; accepted as written, not exercised). A git revert of `76da25c..6f76c6d` applies cleanly (`git apply --check -R`, exit 0) and ships as a new fast-forward push, which needs a new ask. Communicating a rollback to anyone is the owner's.

## Next Actions

Standing note: later documents are authoritative on current state.
- Steering closes the two source handoffs `Addressed` and decides `authorize-guild-admin-tests-membership-not-admin-bits-2026-11-19`.
- The retrospective joins the next fixer batch.
