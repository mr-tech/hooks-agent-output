---
ID: n/a
Origin: fix-cut-collapsed-caret
UUID: 22b61dde
Status: Active
Status-Detail: "Stage 1 committed and Phase 2A complete at website 8845b7e; nothing pushed; the release ask to the owner is the next act. Mode A (agent-executed)."
---

# Deployment Record: fix-cut-collapsed-caret

**Plan Reference**: none (fixer route; the owner's selection of 2026-11-22T02:09, `steering/fix-cut-collapsed-caret-rulings.md`, corrected by block 18:53).
**Stage start**: the code review at `Reviewed-At: 8845b7e3409782e0f07ecd36a818f48f4ebcc721`, `Round 1`, `Verdict: APPROVED` (record `de261824`, sub-entry 1a; re-read at write time). No QA and no UAT in this chain's stage set (5 production lines, under 20).
**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep`; proceeding with reduced context (nothing cited).
**Release Identifier**: website `master` → `8845b7e3409782e0f07ecd36a818f48f4ebcc721` (no `version` field in `package.json`, no CHANGELOG, no tags; none synthesised).
**Steering brief**: `steering/fix-cut-collapsed-caret-brief-devops.md` and `-brief-common.md`, arrived and read whole. Steering's brief did arrive.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T19:17 | `steering-hooks-fixer` (brief above) | Stage 1 and Phase 2A for `chain/fix-cut-collapsed-caret` at 8845b7e | Stage 1 verified (table below); implementation and code-review documents closed `Committed`. Phase 2A: tip build at 8845b7e exit 0; `release-move.js --dry-run` exit 0; reverse patch checks. Nothing pushed. Disclosure: two changelog stamps typed ahead of the clock were refused by the stamp gate and re-stamped from the clock with `record-edit.js` (implementation and code-review documents). |

## Stage 1 verification (website, at 8845b7e)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-cut-collapsed-caret`, HEAD `8845b7e3409782e0f07ecd36a818f48f4ebcc721`, tree `a9eb81337f716067c82bb80fc33f56b6c30880ca` | `git branch --show-current`; `git rev-parse HEAD`, `8845b7e^{tree}` |
| Nothing in scope uncommitted | website `git status --porcelain`: `?? .playwright-mcp/` only (not this chain's; `release-move` leaves the 17 untracked paths alone). Record: this chain's paths under `implementation/`, `code-review/` and `verification/fix-cut-collapsed-caret/` were committed before this stage's writes (record HEAD `b9e36b5b`) | `git status --porcelain` |
| Fix range | 3 commits `453de76..8845b7e` (`c576417`, `329cc20`, `8845b7e`); 2 paths: `src/components/SlateEditor/utils/onCopy.ts` 5 added / 4 removed (the only production path), `__tests__/onCopy.cut.test.tsx` 95 added | `git diff --numstat 453de76 8845b7e` |
| Fast-forward onto production | remote `master` = `453de76187c5c368732a20d2dd8a671ed97eed4c` (`git ls-remote origin master`, and by fetch: `origin/master` = `453de76…`, 19:16Z); `453de76` is the chain's base | `ls-remote`; `rev-parse origin/master` |
| QA | not in the stage set: the code review ran the suite (2366/2366, exit 0), typegen and typecheck (exit 0) and the red test (red against the base handler, green at the tip) and its verdict binds `8845b7e`, the tip | code-review document, sub-entry 1a |
| Release consistency | `package.json` carries `"name": "website"` and no package `version`; no CHANGELOG (`ls` exit 2); no tags created. `git diff --quiet 453de76 8845b7e -- package.json pnpm-lock.yaml` empty (`git diff --stat` prints nothing): no cross-repo reference or lockfile change, so no stale pin can be introduced | `grep -E '"(name\|version)"' package.json`; `git diff --stat` |
| Open disagreements with predecessor documents | none. The fixer's and the reviewer's production-line count agree (5); the reviewer's CR-1 was fixed and re-verified | documents read whole |

## Blocking-condition register

The chain has no register (no QA or UAT document): no pre-release row exists to terminate and no post-deploy-observable row exists, so no carrier handoff is created. The code review's "Assumption Not Checked" (a real browser's Ctrl+X on a plain caret removes nothing) is not a register row; the brief assigns it to devops as a post-deploy browser walk by a `browser-walker` helper, carried by this record until Phase 2D closes it (runbook rows 8 and 9). Steering's disposition: rulings block 19:10.

## Stage 2 readiness (Phase 2A, 2026-11-22T19:17)

Included: chain `fix-cut-collapsed-caret` only. Execution mode: **Mode A, agent-executed**, run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 | — |
| Tip assembled | the chain branch itself: a fast-forward of remote `master` (`453de76` → `8845b7e`); no merge commit | `release-move.js --dry-run` "ff-from-remote ok" |
| Release-tip verdict | no QA in the stage set; the code review at `Reviewed-At 8845b7e` is the verdict and `8845b7e` is the tip, tree `a9eb8133…` on both (`git rev-parse HEAD^{tree}`). Not a QA Phase 3 record: the move takes `--reason` naming it | `rev-parse` |
| Consistency | see the Stage 1 table | |
| Populations (4b) | no consumer, pin or subscriber is changed: website is a leaf deployment; the lockfile is untouched. The change reaches the six editor surfaces through the one shared handler (code review, hazard 4: `git grep -c "onCopy(" 329cc20 -- src bot`, reviewer's count) | review document |
| Packaging (build at the tip) | `SKIP_ENV_VALIDATION=1 npx next build` (Next.js 16.4.6, Turbopack) in an isolated `git archive` export of `8845b7e`, `node_modules` hard-linked, under `systemd-run --user --scope` caps (8G, 900s): **exit 0**, "Compiled successfully", 19:16:41Z to 19:17:05Z; `ƒ Proxy (Middleware)` listed; export tree `a9eb8133…` equals the tip's. The one "deprecated" line in the log is the Edge Runtime notice for `/api/interactions-edge`, not touched by this chain. Export deleted (`ls -d` exit 2); no `next build` process remains (`ps` count 0). No `.env*` copied | `verification/fix-cut-collapsed-caret/devops/build-8845b7e/` (`build.txt`, `build.exit` 0, `steps.txt`, `build-start.txt`); `devops/build-tip.sh` |
| Lockfile or package-manager change | none, so the deploy-host package-manager-major install check does not apply | `git diff --stat` empty |
| Workspace | all chain commits present; porcelain shows only `.playwright-mcp/` (not this chain's). Predecessor exclusions: the reviewer's gitignored build outputs and the shared tree's stale gitignored `.next/types/validator.ts` (brief: leave it); none affects the move (`release-move` left the 17 untracked paths alone and refuses only on a dirty tracked tree) | `git status --porcelain`; dry-run |
| History rewritten | no: the verified commit is the tip and reachable (`git rev-parse 8845b7e`) | — |
| Serving refs | remote `master` is the only serving ref `release-move` lists for this repo: "sibling serving refs (none) on one line ok" | `release-move.js --dry-run` |

**Phase 2C block (re-derived against the mechanism, per repository: website):**
- **Deploy mechanism.** Re-derived: `.github/workflows` absent (`release-move` prints "workflows none — … absent: a push to master triggers no GitHub Actions workflow"); no `vercel.json` in the tree. **Accepted as written, a named risk**: that a push of `master` builds and serves production through Vercel's git integration. The integration lives outside the repo and is not read. Evidence on record: `architecture/system-architecture.md` (website on Vercel) and the previous release's deployment record `deployment/closed/fix-middleware-dead-matcher-deployment.md` (push of `453de76` at 18:41Z → deployment `dpl_7amFajR7sNEhdbPLBcjWDUc9psb2` Ready, built from that commit, aliased hooks.gg). Which commit the integration builds (its default-ref behaviour) is accepted as written.
- **Rollback.** The reversing patch is checked at the tip's tree: `git diff 453de76 8845b7e` written to a file, then `git apply --check -R`, exit 0 at 19:16Z (`devops/reverse.diff`). The owner's established fast path is Vercel promote of the previous deployment (look-only access here; accepted as written, not exercised). A git rollback is a new revert commit pushed as a fast-forward: a new ask.
- **Ordering.** Dry-run → owner's yes → move → `ls-remote` → post-deploy reads. Nothing interleaves with the move.
- **Serving refs.** As in the table.

**Pre-deploy read.** `timeout 60 vercel inspect https://hooks.gg < /dev/null` from the website directory (19:17Z, exit 0, `devops/vercel-inspect-before.txt`): serving deployment `dpl_7amFajR7sNEhdbPLBcjWDUc9psb2`, `hooks-gg-website`, **Ready**, created 18:41:17Z (the previous release, `453de76`), aliases include `hooks.gg` and `www.hooks.gg`. Prediction for the post-push read: a different deployment id, Ready, created after the push, built from `8845b7e`, aliased hooks.gg.

**Runbook (one artifact; results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `453de76187c5c368732a20d2dd8a671ed97eed4c` → stop; the tip is no longer a fast-forward and the review must be re-taken | `453de76…` (fetch at 19:16Z); re-read just before the move |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 8845b7e3409782e0f07ecd36a818f48f4ebcc721 --dry-run --reason "<review record and Reviewed-At>"` | exit ≠ 0 → stop | exit 0 (`devops/release-move-dry-run-1.txt`); re-run just before the move |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | Yes, by selection ("Agent: push it live now (Recommended)"), answered by 20:13:13Z (`devops/confirmation-time.txt`) |
| 4 | the same command without `--dry-run` | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | Steps 1 and 2 re-run at 20:13Z (`ls-remote` = `453de76…`, `devops/ls-remote-before-move.txt`; dry run exit 0, `devops/release-move-dry-run-2.txt`). Real move exit 0, 20:13:19Z to 20:13:24Z: "OK moved master: 453de76… -> 8845b7e… on origin; tree on master" (`devops/release-move-real.txt`, `release-move-real-start.txt`) |
| 5 | `git ls-remote origin refs/heads/master` equals `8845b7e…`; tree on `master`, `git status --porcelain` shows only `.playwright-mcp/` | any difference → route to the owner | `ls-remote` = `8845b7e3409782e0f07ecd36a818f48f4ebcc721`; `branch --show-current` = `master`; `rev-parse HEAD master` both `8845b7e…`; porcelain `?? .playwright-mcp/` only. Pass |
| 6 | `git branch -d chain/fix-cut-collapsed-caret`, its output captured | `-d` refuses → name it to the owner; do not force | "Deleted branch chain/fix-cut-collapsed-caret (was 8845b7e).", exit 0 (`devops/branch-d.txt`); `git branch --list 'chain/fix-cut*'` 0 lines; `ls-remote --heads origin 'chain/*'` 0 lines. Pass |
| 7 | `vercel inspect https://hooks.gg`, then `vercel logs <deployment url>` (look-only; `timeout 60`, stdin closed, retry up to twice; a hang is not a control): the serving deployment is a new one, Ready, built from the pushed commit, serving hooks.gg | deployment Error, or built from another commit → report to the owner; a rollback is his call (Vercel promote) | **`vercel inspect https://hooks.gg`** (20:14:30Z, exit 0 on the second try; the first timed out at 60s; `devops/vercel-inspect-after-1.txt`, `-2.txt`): id `dpl_3JEEF7Vs4MaWBa3Gk82TsxdbDpud` (a new id; the pre-push one was `dpl_7amFajR7sNEhdbPLBcjWDUc9psb2`), `hooks-gg-website`, status **Ready**, created 20:13:25Z, aliases `hooks.gg`, `www.hooks.gg`, `hooks-gg-website-git-master-hooks-gg.vercel.app` and two others. **`vercel logs <deployment url>`** (exit 0 on the second try; the first timed out; `devops/vercel-logs-1.txt`, `-2.txt`): "Cloning github.com/hooks-gg/website (Branch: master, Commit: 8845b7e)"; "Detected Next.js version: 16.4.6"; "Compiled successfully in 4.8s"; "Deployment completed" 20:14:02Z. Passes: Ready, built from the pushed commit, serving hooks.gg |
| 8 | post-deploy browser walk on hooks.gg, signed out, blank message editor, nothing saved (`browser-walker` helper): type a short text; place a plain caret mid-word, nothing highlighted; press Ctrl+X; read the text back. Pass: unchanged | the text changes → the Assumption Not Checked is false; report to `steering-hooks-fixer` and the owner at once | |
| 9 | same walk: highlight one word; press Ctrl+X; read the text back. Pass: the word is gone | the word remains → report | |

**Assumption Not Checked carried to the post-deploy walk (devops's, this record until Phase 2D).** The code review's: a real browser's native cut on a collapsed plain caret in a `contenteditable` removes nothing; falsified by row 8 (text changes) in a real browser. The fixer's and the brief's: slate-react's `onCut` beyond the refutation's read, and a real browser's cut event (brief-common, "What this brief did not check"), read by rows 8 and 9. If no real browser is available to the helper, rows 8 and 9 are recorded "not run" and `steering-hooks-fixer` is told.

## User Confirmation

*(not yet put; filled by Phase 2B)*

## Release Execution

*(not yet executed)*

## Post-Release Status

*(Active: nothing released.)*

## Next Actions

- Phase 2B: the release ask, in this session.
