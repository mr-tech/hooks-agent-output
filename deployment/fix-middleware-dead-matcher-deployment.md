---
ID: n/a
Origin: fix-middleware-dead-matcher
UUID: 54d67da4
Status: Active
Status-Detail: "Stage 1 committed and Phase 2A complete at website 453de76; the release ask is put to the owner in this session; nothing pushed."
---

# Deployment Record: fix-middleware-dead-matcher

**Plan Reference**: none (fixer route; his selections of 2026-11-22T01:49 and 17:15, `steering/fix-middleware-dead-matcher-rulings.md`).
**Stage start**: the code review at `Reviewed-At: 453de76187c5c368732a20d2dd8a671ed97eed4c`, `Round 1`, `APPROVED_WITH_COMMENTS` (record `4823fb3`; re-read at write time). No QA and no UAT in this chain's stage set (19 production lines).
**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep`; proceeding with reduced context (nothing cited).
**Release Identifier**: website `master` → `453de76187c5c368732a20d2dd8a671ed97eed4c` (no `version` field in `package.json`, no CHANGELOG, no tags; none synthesised).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-22T17:44 | `steering-hooks-fixer` (brief `steering/fix-middleware-dead-matcher-brief-devops.md` and `-brief-common.md`, arrived and read whole) | Stage 1 and Phase 2A for `chain/fix-middleware-dead-matcher` at 453de76 | Stage 1 verified (table below); implementation and code-review documents closed `Committed`. Phase 2A: tip build at 453de76 exit 0, `check-proxy-registered.py` PASS, no deprecation line; `release-move.js --dry-run` exit 0. Nothing pushed. Two `vercel ls --prod` look-only reads were not completed (see Pre-deploy reads). |

## Stage 1 verification (website, at 453de76)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-middleware-dead-matcher`, HEAD `453de76187c5c368732a20d2dd8a671ed97eed4c`, tree `b31f7eb10f5deca0007748f0ed6820181aa2a85b` | `git branch --show-current`; `git rev-parse HEAD`, `HEAD^{tree}` |
| Nothing in scope uncommitted | website `git status --porcelain`: `?? .playwright-mcp/` only (not this chain's; ignored by the release move: "untracked 17 path(s) left alone"). Record: `git status --porcelain -- verification/fix-middleware-dead-matcher implementation code-review deployment` was empty before this stage's writes | `git status --porcelain` |
| Fix range | 3 commits `3859c29..453de76` (7062ea5, 31acb25, 453de76); 4 paths: `src/proxy.ts` 19 added (the only production path), `src/middleware.ts` 23 removed, two test files (49 added; 2/2 renamed) | `git diff --numstat 3859c29 453de76` |
| Fast-forward onto production | remote `master` = `3859c29d557c920a5b611b8e3a4e7b5bf7b1222e` (`git ls-remote origin master`, 17:40Z by steering, and again by fetch at 17:44Z: `origin/master` = `3859c29…`); `3859c29` is the chain's base | `ls-remote`; `rev-parse origin/master` |
| QA | not in the stage set: the code review ran the suite (2362/2362, exit 0), typecheck and the red test (red at `31acb25`, green at `453de76`) and its verdict binds `453de76`, the tip | code-review document, "TDD Compliance Check" |
| Release consistency | no package `version` field (`grep -n '"version"' package.json` prints nothing for the package); no CHANGELOG (`ls` exit 2). `project-utils` and `paracord` are pinned to full commit SHAs (`40ba5d3a…`, `3f203086…`) in `package.json` and `pnpm-lock.yaml`, and `git diff --quiet 3859c29 453de76 -- package.json pnpm-lock.yaml` exit 0: no cross-repo reference changed | exit status; `grep -n` of the lockfile |
| Convention file left | `git ls-tree -r --name-only 453de76` filtered to `(middleware\|proxy)\.[jt]sx?$`: `src/proxy.ts` only (hazard 2) | `git ls-tree` |
| Open disagreements with predecessor documents | none. CR-1 (LOW) is ruled outside this release (rulings block 17:40) and carried by steering's own chain; hazard 3's `/preview` premise is corrected in the brief's first lines | rulings file, brief |

## Blocking-condition register

The chain has no register (no QA or UAT document): no pre-release row exists to terminate, and no post-deploy-observable row exists, so no carrier handoff is created. The code review's and the fixer's "Assumption Not Checked" are not register rows; they are devops's own post-deploy reads, listed below and carried by this record until Phase 2D.

## Stage 2 readiness (Phase 2A, 2026-11-22T17:44)

Included: chain `fix-middleware-dead-matcher` only. Execution mode: **Mode A, agent-executed**, run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 | — |
| Tip assembled | the chain branch itself: a fast-forward of remote `master` (`3859c29` → `453de76`); no merge commit | `release-move.js --dry-run` "ff-from-remote ok" |
| Release-tip verdict | no QA in the stage set; the code review at `Reviewed-At 453de76` is the verdict and 453de76 is the tip, tree `b31f7eb1…` on both. Not a QA Phase 3 record: the move takes `--reason` naming it | `rev-parse` |
| Consistency | see the Stage 1 table | |
| Populations (4b) | no consumer, pin or subscriber is changed: website is a leaf deployment; the lockfile is untouched (`git diff --quiet`, exit 0) | exit status |
| Packaging (build at the tip) | `SKIP_ENV_VALIDATION=1 npx next build` (Next.js 16.4.6, Turbopack) in an isolated `git archive` export of `453de76`, `node_modules` hard-linked, under `systemd-run --scope` caps (8G, 900s): **exit 0**, "Compiled successfully", 17:41:35Z to 17:41:57Z. `ƒ Proxy (Middleware)` listed. Deprecation line `grep -c` = **0**. `check-proxy-registered.py` on that build: **PASS, exit 0** (no `middleware.*` file, `/_middleware` runtime `nodejs`, matchers `/message`, `/message/(.*)`, `/preview`, no edge middleware). The script's own exit 1 was `grep -c` returning 1 for a zero count, not a build failure. Export deleted (`ls -d` exit 2); no `next build` process remains. No `.env*` copied | `verification/fix-middleware-dead-matcher/devops/build-453de76/` (`build.txt`, `build.exit` 0, `check-proxy-registered.{txt,exit}`, `deprecation-count.txt`, the two manifests, `steps.txt`); `build-tip.sh` |
| Lockfile or package-manager change | none, so the deploy-host package-manager-major install check does not apply | `git diff --quiet` |
| Workspace | all chain commits present; porcelain shows only `.playwright-mcp/` (not this chain's). Predecessor exclusions: the reviewer's gitignored build outputs; none affects the move (`release-move` left the 17 untracked paths alone and does not refuse on them) | `git status --porcelain`; dry-run |
| History rewritten | no: the verified commit is the tip and reachable (`git rev-parse 453de76`) | — |
| Serving refs | remote `master` is the only serving ref release-move lists for this repo: "sibling serving refs (none) on one line ok" | `release-move.js --dry-run` |

**Phase 2C block (re-derived against the mechanism, per repository: website):**
- **Deploy mechanism.** Re-derived: `.github/workflows` absent (`release-move` prints "workflows none"); no `vercel.json` at the tip's root listing a trigger (the file is absent from the tree here). **Accepted as written, a named risk**: that a push of `master` builds and serves production through Vercel's git integration. The integration lives outside the repo and is not read. Evidence on record: `architecture/system-architecture.md` line 57 (website on Vercel, owner ruling 2026-08-23) and the owner's attestations on earlier releases (`deployment/closed/fix-website-save-gate-embeds-deployment.md`). Which commit the integration builds (its default-ref behaviour) is accepted as written.
- **Rollback.** The reversing patch is checked at the tip's tree: `git diff 3859c29 453de76 | git apply --check -R`, exit 0 at 17:44Z (diff in `devops/reverse.diff`). The owner's established fast path is Vercel promote of the previous deployment (look-only access here; accepted as written, not exercised). A git rollback is a new revert commit pushed as a fast-forward; a new ask.
- **Ordering.** Dry-run → owner's yes → move → `ls-remote` → post-deploy reads. Nothing interleaves with the move.
- **Serving refs.** As in the table.

**Pre-deploy reads.** `timeout 60 vercel ls --prod < /dev/null` from the website directory was issued twice (17:42Z to 17:44Z), each time stopping at "Retrieving project…" with exit 124 (timed out): **not completed**. The prediction-versus-live baseline of the current production deployment is therefore not captured; the post-deploy reads below stand without a before value. Captures: `verification/fix-middleware-dead-matcher/devops/vercel-ls-prod-before.txt`, `…-2.txt`.

**Runbook (one artifact; results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `3859c29d557c920a5b611b8e3a4e7b5bf7b1222e` → stop; the tip is no longer a fast-forward and the review must be re-taken | `3859c29…` (fetch at 17:44Z); re-read just before the move |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 453de76187c5c368732a20d2dd8a671ed97eed4c --dry-run --reason "<review record and Reviewed-At>"` | exit ≠ 0 → stop | exit 0 (`devops/release-move-dry-run-1.txt`); re-run just before the move |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | |
| 4 | the same command without `--dry-run` | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | |
| 5 | `git ls-remote origin refs/heads/master` equals `453de76…`; tree on `master`, `git status --porcelain` shows only `.playwright-mcp/` | any difference → route to the owner | |
| 6 | `git branch -d chain/fix-middleware-dead-matcher`, its output captured | `-d` refuses → name it to the owner; do not force | |
| 7 | `vercel ls --prod`, then `vercel inspect <url>` and `vercel logs <url>` (look-only; `timeout 60`, stdin closed, retry once): the newest production deployment is Ready, built from the pushed commit, serving hooks.gg; build log has no "middleware file convention is deprecated" line; record what `inspect` shows of the proxy's deployment | deployment Error, or built from another commit → report to the owner; a rollback is his call (Vercel promote) | |
| 8 | signed-out `GET https://hooks.gg/message/m/0/edit` must not redirect (the header is present) | a redirect to itself → the assumption is false; report | |
| 9 | signed-out `GET https://hooks.gg/message/m/1/edit` sent with `x-pathname: /message/m/0/edit` must redirect (the header is overwritten) | rendered without a redirect → the spoof is honoured; report | |

**Assumption Not Checked carried to the post-deploy reads (devops's, this record until Phase 2D).** The code review's: Vercel's build of `master` registers and serves `src/proxy.ts` as a Node proxy on the three matchers; falsified by steps 8 or 9, or by a build log lacking `ƒ Proxy (Middleware)` or still printing the deprecation line (step 7). The fixer's: not checked there are a running `next dev`/`next start` walk, Vercel's handling of the Node proxy (regions, latency), Turbopack vs webpack on Vercel; region placement and latency stay unmeasured and are recorded as what `inspect` shows. CR-1 (the `/preview` entry runs the proxy where nothing reads the header) is ruled outside this release and carried by steering's own chain.

## User Confirmation

To be put to the owner directly by this session as a selection prompt (Phase 2B), in his form: the context first, then the decision, plain English; the fixer's user-visible flows in his words.

## Release Execution

Not yet executed.

## Post-Release Status

Not yet released.
