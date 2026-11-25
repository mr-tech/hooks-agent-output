---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: "Stage 1 is done and QA Phase 3 is Release Verified at website 48eb60a. The readiness block and runbook are complete to R-1. Waits on the owner release answer in the devops session. No serving ref has moved."
---

# Deployment — plan 019, Slate formatting on Discord's engine (website `master`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T16:35 | steering-hooks-fixer (brief `steering/019-brief-devops.md`; its correction message) | M1 § AN-1, fourth bullet: do branch previews build, and the plan's numbers there | Previews build, but only with a build-command override. Spike branch `spike/019-an1-wasm` pushed twice; the plain push failed its Preview build, the override commit reached READY; 20-load probe recorded. Details below. |
| 2026-11-23T17:04 | analyst-019 (message: analysis `aafecf1` cites this record) | Delete the spike branch | `spike/019-an1-wasm` deleted at origin, locally and its worktree removed; `master` unchanged at `af3d95a`. |
| 2026-11-23T18:14 | steering-hooks-fixer (checkpoint request) | Wrap up for a clear | Resumption State written; wake deleted. |
| 2026-11-25T16:48 | steering-hooks-fixer (brief `steering/019-brief-devops.md`) | Stage 1 for plan 019 from website `48eb60a` | Gates re-derived, install and build pass at the tip, release move dry-runs clean, B-5 carrier and reader armed, readiness block and runbook written. QA Phase 3 next. |

## Plan Reference

`agent-output/planning/closed/019-slate-formatting-discord-engine.md`, Revision 26 (record `d79f481e`), critic APPROVED (`3cbae50e`).
One plan in this release. Brief: `steering/019-brief-devops.md` (2026-11-25T16:33Z). It negates one duty: the wait on the architect's
closing pass, which the owner waived (rulings block "2026-11-25T15:46Z", Q2; plan D-33).

The sections from here to "AN-1 act" are the release record: Stage 1, and the readiness block that must be committed before any ref moves.

## Release Identifier

Website `master` at **`48eb60a02f4af4f27f1a5426bbe7e58301b1d148`** (tree `f50f8aa46b0111cd389e68557d4918a3f8f306d7`). No tag is created.
The `website` package has no `version` field, so no version or CHANGELOG entry is written (plan § Version Management).

## Release Date

Not released.

## Execution Mode

**Mode A (agent-executed).** This session pushes `master` with `release-move.js` after the owner's release answer, asked in this session
(standing ruling 19, block "2026-11-21T05:32Z").

## Release Summary

Production website (Vercel). One release carries M2 to M7 (D-19). No roadmap epic (plan header).

- The message preview and the editor's colouring use Discord's published formatter `@discord/markdown-wasm` `0.16.0`; `simple-markdown`
  leaves the product.
- Link targets keep their emoji (his D-2 report). Channel mentions show the channel's name when a server is chosen.
- The editor keeps every character on type, paste, load and guild-emoji insert; a typed emoji is saved as the character (D-10).
- Enter after a `> ` line continues the quote. Long embed descriptions type without stalling; code-fence and `>>>` keystrokes near their
  top no longer raise an editor error.

## Repositories and SHAs shipped

| Repository | From (`master` at origin) | To | Content |
|---|---|---|---|
| `website` | `5ec06212d73073ab556e46582c3b23e3468da3a3` | `48eb60a02f4af4f27f1a5426bbe7e58301b1d148` | 98 commits, no merge commit, 166 files |

Chain branch `chain/019-slate-formatting-discord-engine`, local only, tip `48eb60a`. Nothing was committed to the website by this stage.
`preview-image-generator` and `project-utils` ship nothing.

## Serving Ref at cutover

`master` at origin, the one serving ref (`release-move.js --report`: "one serving ref at origin (master); no pair"). Read at the remote
this round: `git ls-remote origin refs/heads/master` gives `5ec0621`.

## Stage 1 — plan commit (2026-11-25)

**Stage start.** UAT committed at `d06fe6b5`: `Verified-At: 48eb60a`, APPROVED FOR RELEASE. Plan Status UAT Approved, R-137 (`d2b99b88`).

**QA verdict carried forward.** M6 Phase 2, `Verified-At: 48eb60a` (record `ce8d31a0`): QA Complete. Code review `Reviewed-At: 48eb60a`
(`e0dcfdb0`). The earlier milestones' verdicts bind `7dcedc9` (M2), `81c68b2` (M3), `e58f2ed` (M4) and `2e36107` (M5), all ancestors of
`48eb60a`.

**Blocking-condition register** (QA Phase 1 document; its state cells read "open" and its header makes the UAT document and this record
authoritative on execution).

| Row | Class | Terminal state |
|---|---|---|
| B-1, B-2, B-3, B-4, B-7 (both limbs), B-8, B-9, B-10, B-11 | observable pre-release | EXECUTED 2026-11-25, PASS (UAT § Flow Execution and § Release Decision, at `48eb60a`) |
| B-5 | post-deploy-observable | Carried: `handoff/slate-formatting-link-targets-post-deploy-2026-11-25.md` |
| B-6 | observable pre-release, decidable only on the release tip | EXECUTED 2026-11-25, PASS at runbook row R-1 (QA Phase 3, record `c41a8459`) |

**Plan at rest.** Revision 26 is critic-approved and the critique is closed Resolved. The unfolded Planner batch is carried by
`planning/slate-editor-rebuild-sizing-2026-11-25.md` (D-33). The architect's closing pass is waived. `planner-019`'s Resumption State
(2026-11-25T15:58Z) owes nothing until a stage sends a verdict to register.

**Release consistency.** No `version` field, none synthesised. Cross-repository references at `48eb60a`:
- `project-utils` pin `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`: unchanged from the base. Fetched by SHA from origin (exit 0); an
  ancestor of origin `master` `a47e683`.
- `paracord` pin `3f203086ae38699f26dbee90dadbb395a96be227`: unchanged specifier, fetched by SHA (exit 0). It moves from
  `devDependencies` to `dependencies` (the plan's rider R-A), which answers
  `handoff/website-paracord-listed-as-devdependency-but-imported-at-runtime-2026-11-22.md`.
- Lockfile: adds `@discord/markdown-wasm@0.16.0` and `@discord/markdown-types@0.14.0`; removes `simple-markdown`, its patch and
  `pnpm-workspace.yaml`; `semver@7.8.6` gains `optional: true` (QA's accepted recompute).
- Consumers of `website`: none.

**M4 and M5 together (plan M7, AF-2).** `e58f2ed`, `2e36107` and `cf126ea` are each in `48eb60a` and not in `5ec0621`.

**Tree.** Website `git status --porcelain` shows only another session's `.playwright-mcp/`. At Stage 1, under `verification/019/`, two modified files
(`impl/m6-fix-bench-fix.txt`, `.time`) went back to `implementer-019`, which restored them and noted it (record `f8093679`); `git diff
--quiet HEAD` then passed. The untracked files there are captured images, which stay out of commits.

**Tip-moving housekeeping (plan M7): none owed, so no commit was added.** No version field; the plan names no shipped-document edit; a
sweep of added comment and title lines in `5ec0621..48eb60a` for ID tokens found one line, whose match is the number "1,000" in a test
title, and no basename.

**Workspace `CLAUDE.md` Test Conventions update (plan M7; block "2026-11-25T15:49Z").** **Landed** before the release by steering
(record `16928fc5`; rulings block "2026-11-25T16:52Z"), from `implementer-019`'s proposed text (M6 implementation document, record
`6a9311ef`). It was missing when this stage first looked: M7 had it proposed at M3 and no document carried it, so this stage asked
steering for it. It changes the record only; the release tip did not move. For later releases it makes devops at Stage 1 the runner of
`pnpm test:discord` where the chain does not touch the formatting region.

**Packaging at the tip** (a `git archive` export of `48eb60a`, no `.env` file; captures `verification/019/devops/stage1-*-48eb60a.txt`).
- `pnpm install --frozen-lockfile --prefer-offline` under pnpm **10.28.2**, node v24.14.0: exit 0. 10.28.2 is `packageManager`'s pin and
  the version read in the Vercel build log of 2026-11-23 (AN-1 section). Packages came from this box's store; Vercel's own online install is covered by
  the Preview read below.

- `SKIP_ENV_VALIDATION=1 pnpm build`: exit 0, Next.js 16.4.6.
- Built assets: one wasm under `.next/static`, 1,230,190 bytes, sha256 equal to the installed package's (`da7b9e5e…57fb0`); 5 client
  files carry the Discord copyright notice; 0 name `simple-markdown`; 0 name `discord.com/assets` (the test oracle does not ship, D-4).

**Post-deploy row.** B-5's carrier and reader are in place (above). Reader kit `verification/019/post-deploy/kit/`; crontab lines
installed this round (hourly at minute 23, gated on the carrier's E-WEBSITE-PUSH); `--smoke` passed after the carrier's last write.
Production baseline before the push (standing ruling 21), 2026-11-25T16:41Z: the two link targets read the unfixed values
(`verification/019/devops/b5-baseline-before-push.json`), with no page or console error. The reader read the fixed values on a local build
of `48eb60a` (`b5-dryrun-local-48eb60a.json`). Production page loads this round: signed out, nothing saved or sent.

**Preview read (owed to devops at Stage 1 by analysis G-3 and QA M2's Assumption Not Checked).** A throwaway commit `ed60e5b` (`48eb60a`
plus `vercel.json` `{"buildCommand": "SKIP_ENV_VALIDATION=1 next build"}`, built with a temporary index, shared tree untouched) was
pushed to `release-check/019` at 2026-11-25T16:52:38Z and deleted at 17:08Z. No `.github/workflows` exists, so no Action ran. The only
alias was `…-git-release-check-019-hooks-gg.vercel.app` (`dpl_6mREYp7sjh4zg4qiEuTD6FycxTML`); `master` stayed `5ec0621`. Pages were
loaded signed out; nothing was clicked or saved. Captures `verification/019/devops/stage1-preview-*` and `stage1-prod-*`.
- **Vercel builds the tip.** Ready in 27 s: Vercel CLI 66.6.0, `pnpm@10.28.2` by corepack (the deploy host's package manager,
  re-derived), its own online install, Next.js 16.4.6.
- **Engine.** The wasm is served and is the pinned one: 1,230,190 bytes, sha256 `da7b9e5e…57fb0`. Discord's copyright notice is in a
  served chunk on `/preview`, `/message/m/new` and `/message/m/0/edit` (AC-2.6 on a Vercel build).
- **Page errors, and their source.** `/preview`: none. `/message/m/new`: 3 of 20 loads in Chrome 116, 1 of 10 in Chromium 143.
  `/message/m/0/edit`: 20 of 20 and 10 of 10. Chromium 143 shows React error #419 (the server could not finish a Suspense boundary).
  The Preview's runtime log gives the server error: `Invalid environment variables`, digest `1363069307`, naming `DATABASE_URL`,
  `REDISHOST`, `REDISPORT`, `REDISUSER`, `REDISPASSWORD`, which the Preview target lacks (AN-1 section 1). Chrome 116 reports the
  error's message as `undefined`, so its identity there rests on the same pages and the same server log. This is the source of the
  three errors AN-1 saw on the spike Preview, by page and count.
- **Not a property of the release.** Production's server HTML for `/message/m/0/edit` has no failed boundary (5 reads) and 14
  production loads raised no page error. A local build of `48eb60a` with the environment check passing renders the same page on the
  server with no failed boundary (`stage1-local-ssr-48eb60a.txt`).
- **Production, observed in passing (base code, nothing pushed).** Between about 16:55Z and 17:04Z two waits of 60 s for the load event
  on production `/message/m/0/edit` timed out, and one `curl` of it got no response in 60 s. The 14 loads at 17:08Z each finished
  under 0.7 s. Not diagnosed.

**Two commands not completed.** A record search was not completed; nothing in this record depends on it. A shell command building test
fixtures was not completed; the fixtures were then written with the Write tool.

**Forward items.** A sweep of the chain's documents found items whose only carrier was a closing document. Carriers written:
`handoff/slate-formatting-engine-and-oracle-follow-ups-2026-11-25.md` (names RK-9),
`handoff/slate-formatting-unwalked-browser-behaviour-2026-11-25.md`,
`handoff/website-leftovers-outside-the-formatting-region-2026-11-25.md`,
`handoff/slate-formatting-rollback-stored-emoji-read-2026-11-25.md`. QA's AN-3 re-read was sent to `qa-019` and run in Phase 3.

**Documents closed (step 8).** Closed documents for Plan 019: planning, implementation (M2 to M6), analysis, code-review, qa (six) and uat
moved to `closed/` as Committed, 15 in all (record `67585cf4` to `3584dc59`). `qa/website-48eb60a-release-tip-qa.md` stays open until the
release. `check-repo.js` afterwards: no failure from a line this stage wrote; the others are in the record inbox.

## Release readiness — re-derivation block (before any ref moves)

| Item | Statement | Basis |
|---|---|---|
| Deploy mechanism | No `.github/workflows` and no `vercel.json` at `48eb60a` | **Re-derived**: `git ls-tree -r 48eb60a -- .github vercel.json .vercelignore` lists nothing; `release-move.js --dry-run` says a push to `master` triggers no GitHub Actions workflow |
| Deploy mechanism | A push to `master` deploys to Vercel production through the Vercel project's Git integration | **Accepted as written** (named risk): project settings are not read. Evidence: earlier releases, and the 2026-11-23 inspect showing production deployments on the `git-master` alias |
| Environment, schema | No new variable, no schema change | **Re-derived**: `git diff --name-only 5ec0621 48eb60a` lists no `src/env.mjs`, `prisma` or `src/server/db` path |
| Ordering | One repository, one ref, no step before or after the push on another service | **Re-derived** from the diff's file list. `preview-image-generator` screenshots `/preview` and is unchanged (plan RK-2) |
| Rollback | A new commit on `master` whose tree is `5ec0621`'s and whose parent is `48eb60a` (`git commit-tree`, no working-tree write), moved with `release-move.js --reason`; then Vercel builds it | **Re-derived** in part: the range reverses cleanly (`git apply --check -R` of the binary diff against the tree at `48eb60a`, exit 0, `stage1-release-checks-48eb60a.txt`). The commit is not built until needed |
| Rollback limit | Messages saved by the new editor keep emoji as characters after a revert | **Accepted as written** (plan M7, stated limit, not read at the base) |
| Serving refs | `master` only; the move is a fast-forward from `5ec0621` | **Re-derived**: `release-move.js --report` exit 0; `--dry-run` exit 0, every check passed |
| Exclusions a verdict declared | `.playwright-mcp/` (untracked): `release-move.js` leaves untracked paths alone. `discord-reports/` (ignored): no effect | **Re-derived** by the dry run |

**Open disagreements with predecessor documents.** None open. Closed by this stage: the missing convention text has landed (above);
QA's B-5 instrument filter would have missed the fixed first anchor (corrected in the carrier); QA Phase 1's assumption that production
served `af3d95a` is superseded by the baseline taken this round (the push of `5ec0621` is the deploy evidence, and no host-side commit
read is made).

**Predecessors' assumptions the release exercises.** That Vercel's install gives the same tree as the offline one (QA Phase 3): the
Preview read serves the pinned wasm; re-read on the production site at R-6. That the engine builds and runs on production's build
(plan RK-1): closed by B-5's read. After a rollback only, the old site's preview of stored emoji (critique cycle 18): carried by its
handoff. No live session can run any of these before the push.

**Release-tip verdict (Phase 2A step 3).** The tip is M6 Phase 2's `Verified-At` itself, so its tree is that verdict's tree
(`f50f8aa…`) and the Phase 2 verdict covers it. QA Phase 3 is still run, because B-6 and block "2026-11-25T15:49Z" require it. Its record
is the evidence the release move cites.

### Runbook

| Row | Step | Predicted | Result | Abort |
|---|---|---|---|---|
| R-1 | QA Phase 3 on `48eb60a`: `pnpm test` offline, `pnpm test:discord` (B-6), AC-3.3's full generator run with `MOUNTED_GENERATOR_COUNT=1000`, and the open-handoff sweep (`qa-phase-3.md` step 1b) | Both commands exit 0; drift-alarm hashes equal or the outcome cause recorded | **PASS** (record `c41a8459`, `qa/website-48eb60a-release-tip-qa.md`, Release Verified): offline 4,785 of 4,785 exit 0; `test:discord` 41 of 41 exit 0, wasm hashes equal; generator 17 of 17 exit 0; step 1b, 39 open handoffs, 11 match, none holds | Any non-zero exit or a release-tip record not at `Release Verified`: no push |
| R-2 | Owner's release answer, asked in this session | yes |  | Anything but yes: no push, record "Aborted" |
| R-3 | `git -C website ls-remote origin refs/heads/master` | `5ec0621…` |  | Another value: re-assemble the tip; the verdicts re-key |
| R-4 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 48eb60a --dry-run --qa-record /usr/local/bin/hooks/agent-output/qa/website-48eb60a-release-tip-qa.md` | every check passed | Rehearsed 2026-11-25T17:10Z: every check passed, nothing moved, remote `master` `5ec0621`. Run again after R-2 | Any refusal: stop |
| R-5 | The same without `--dry-run` | `master` moves to `48eb60a` at origin and locally; the tree is switched to `master` |  | Any refusal: stop, report, do not retry in another form |
| R-6 | `git -C website ls-remote origin refs/heads/master` | `48eb60a…` |  | Another value: stop and report |
| R-7 | Fill E-WEBSITE-PUSH in the B-5 carrier, then `post-deploy-launcher.js … --smoke` | SMOKE OK |  | Smoke failure: fix the kit; the push stands |

## Pre-Release Verification

| Check | State |
|---|---|
| UAT approval | APPROVED FOR RELEASE at `48eb60a` |
| QA approval | M2 to M6 QA Complete; M6 at `48eb60a` |
| Release-tip verdict | `qa/website-48eb60a-release-tip-qa.md`, Release Verified at `48eb60a` (record `c41a8459`); B-6 EXECUTED, PASS |
| Release consistency | Done (above) |
| Packaging integrity | Install and build pass at the tip (above) |
| Workspace cleanliness | Done (above) |

## User Confirmation

Not asked. It is asked after R-1, in this session; this section will record how it was put and when.

## Release Execution

Not begun. No ref has moved.

## Post-Release Status

Not released.
- **Known limits that ship:** QAF-56 MEDIUM (one bench round of six read 17.1 ms against 16 ms); the effort-final mutation sweep was not
  run, on the owner's waiver; UAT-1 (select-all delete over a quote line leaves `> `, also in production today); eight pre-existing eslint
  errors in `SlateEditor/index.tsx` (D-20); the plan's Exclusions X-13 to X-26.
- **Rollback plan:** the re-derivation block.
- **Post-deploy row:** B-5, in `handoff/slate-formatting-link-targets-post-deploy-2026-11-25.md`. Its read also closes RK-1's open limb
  (the wasm builds and runs on production's build), since the fixed link targets come from the engine.
- **Architecture findings** for this chain are still open (`architecture/019-slate-formatting-discord-engine-architecture-findings.md`);
  routed to the architect by one record-inbox entry (2026-11-25).

## Next Actions

- The release question, then R-2 to R-7.
- At release: the carrier `handoff/slateeditor-index-preexisting-react-hooks-lint-errors-2026-11-24.md` and the rebuild sizing document
  have this release as their trigger. Steering tells the owner the rebuild is ready; it opens on his word only (block "2026-11-25T15:38Z").

## AN-1 act (2026-11-23)

This part records AN-1's devops act only (plan Revision 2, `8dfd4659`; the plan's current text was re-read after steering's correction). It was not a release: no ref a production deploy runs from moved.

## Disclosure: order of acts

The brief's text (Revision 1) called previews unread. Steering's correction message (critique F-11; plan Revision 2) reached this session after the first push had gone out at 2026-11-23T16:29:13Z. That push was a plain push with no build-command override, which F-11 predicted would fail; it did. It reached a Preview only, so it fell inside the push lane the brief allowed. I did not re-read the F-11 sources before it. The override commit followed, as Revision 2 directs.

## 1. Does the project build branch previews?

**Yes, with a condition.** Reads, all through the look-only CLI (`vercel` 29.1.1, `timeout 60`, `</dev/null`; ruling block "2026-11-21T19:02"):

- `vercel ls` at 16:03Z lists 20 deployments; the listing carries no branch or target column. Capture `verification/019/devops/vercel-ls-before-push-2026-11-23T16-03Z.txt`.
- `vercel inspect` of `hooks-gg-website-1r843p8i7` (`dpl_oVqvgvn5zFPquLnNehXZMWBHnq1E`, created 2026-11-20T06:21:59Z, Ready): its only alias is `…-git-release-check-018-next-upg-c39d5c-hooks-gg.vercel.app`, with no `hooks.gg` alias. That is plan 018's non-`master` branch, built as a Preview. Production deployments on the same listing carry `hooks.gg` and the `git-master` alias (`dpl_7RXkzDG2…`, `dpl_H394JR3g…`). Capture `inspect-018-release-check-preview.txt` (it holds that deployment and `ijl602uao`).
- The spike branch's own two deployments (section 2) are the direct evidence: a push of `spike/019-an1-wasm` produced a Vercel deployment each time, within 7 s.

**Condition (F-11, re-derived).** The plain push `5ac2dd1` built as deployment `hooks-gg-website-nv9rqbv39` and ended **Error** after 23 s. Its build log (`vercel logs <url>`, saved as `spike-preview-1-plain-push-build-log.txt`) shows `Compiled successfully` and TypeScript passing, then `Invalid environment variables` with five names `Required` and absent: `DATABASE_URL`, `REDISHOST`, `REDISPORT`, `REDISUSER`, `REDISPASSWORD`. The build exits 1 at prerender of `/`. So the Preview target lacks those five names today, which matches F-11's reading of `verification/017/m5-0/devops/preview-env-names.txt` (2026-11-19). This is a build-log read of names, no value.

**Not run.** `vercel env ls` for the Preview targets, which steering's message offered "if the ruling covers the read". The ruling's text lists deployments and logs only, and the brief says a read of project settings stops and goes to steering. So the Preview variables were read through the failed build's log, not through the settings. Steering decides whether a further names read is wanted.

## 2. The spike branch and its deployments

Built in a separate worktree (`git worktree add -b spike/019-an1-wasm <scratchpad> af3d95a`); the shared website tree stayed on `chain/fix-image-uploader-url` and was not switched. `master` and every chain branch untouched (`git ls-remote origin`, 16:35:39Z: `master` `af3d95a`, `spike/019-an1-wasm` `c90a3a2`).

| Commit | Content | Pushed | Deployment | Result |
|---|---|---|---|---|
| `5ac2dd1` | the analyst's `wasmSpike.tsx` at `src/utils/markdown/`, its `MarkdownProvider.spike.diff` applied, `@discord/markdown-wasm` at exact `0.16.0` in `package.json` and `pnpm-lock.yaml` | 2026-11-23T16:29:13Z | `hooks-gg-website-nv9rqbv39` | **Error** (env validation, above) |
| `c90a3a2` | plus `vercel.json` `{"buildCommand": "SKIP_ENV_VALIDATION=1 next build"}`, the plan 018 form (RK-7) | 2026-11-23T16:31:44Z | `hooks-gg-website-ojqw6ml5g` | **Ready**, 33 s, seen at 16:33:10Z |

`git diff --numstat af3d95a c90a3a2`: `package.json` +1, `pnpm-lock.yaml` +17 −1, `MarkdownProvider.tsx` +7 −1, `wasmSpike.tsx` +45, `vercel.json` +3. Diff of the two package files: `spike-package-lock.diff`.

**Lockfile pins moved** (plan 018 M2-b form; from `pnpm install --lockfile-only --ignore-scripts` under pnpm 10.28.2): new `@discord/markdown-wasm@0.16.0` (integrity `sha512-+wFNlHyO…U8m1Gw==`) and `@discord/markdown-types@0.14.0` (the package's only dependency). One further moved line, unrelated to the dependency: `semver@7.8.6` gains `optional: true`. It is pnpm's recomputation of the base lockfile and changes no version. The branch is never merged, so no release inherits it; the implementer's M2 lockfile diff carries its own disposition.

Preview build log of the Ready deployment: not saved separately; the first (Error) log is the one captured, because the second's evidence is its Ready state and the probe.

## 3. The numbers on the Vercel Preview

Build form they were taken on: **Vercel build, `next build` under `SKIP_ENV_VALIDATION=1`, Next.js 16.4.6 (Turbopack), pnpm 10.28.2, the project's Preview environment**, deployment `hooks-gg-website-ojqw6ml5g`, head `c90a3a2`. Preview Deployment Protection: not in the way (an unauthenticated `curl` of `/preview` and `/message/m/new` each returned HTTP 200, no redirect). Pages loaded only. No save, no sign-in, no write; `/message/m/new` is a guild picker that writes only on a click. No environment value was read or printed.

Probe: the analyst's `an1-load.js` (copied unchanged from `verification/019/analysis/an1/`), headless Chrome 116.0.5845.96 from puppeteer's cache, **20 loads of each of two pages, one fresh incognito context per load, over the public internet from this box** (the analyst's local run was on loopback; the two sets are not on one network). Run 16:33:26Z to 16:34:56Z, exit 0. Raw: `an1-vercel-preview-20.json`, stdout `an1-vercel-stdout.txt`.

| Number | Vercel Preview (this read) | Analyst's local run, for beside |
|---|---|---|
| Navigation to first formatted render, `/preview`, median / p95 (n = 20, 20 of 20 formatted) | **1214.4 ms / 1893.8 ms** | 1258.4 ms / 2221.2 ms (`an1-load-20.json`) |
| Wasm `init()` time, `/preview`, median / p95 | 191.0 ms / 430.4 ms | 297.3 ms / 692.4 ms |
| Editor page (`/message/m/new`): engine-ready mark, median / p95 (20 of 20 initialised) | 1599.8 ms / 2673.6 ms | 996.0 ms / 2237.8 ms |
| Wasm response | status 200, `content-type: application/wasm`, `content-encoding: br`, 447,426 bytes encoded, 1,230,190 decoded, at `/_next/static/immutable/media/discord_markdown_wasm_bg.0g4-dsbt98mfj.wasm` | raw 1,230,190, gzip level 9 450,875 (`chunk-sizes.txt`) |
| Chunk bytes, `/preview` (26 JS files loaded) | raw 2,707,837, gzip-6 758,426 | the local base and spike chunk sets are in `chunk-sizes.txt` (total JS 4,553,679 raw base, 4,563,710 spike, all 88 / 90 files, not one page) |
| Chunk bytes, editor page (47 JS files loaded) | raw 3,398,048, gzip-6 977,689 | same |
| The spike's own chunk (the file holding `md-engine-ready`) | `chunks/25p784p3j5j00.js`, raw 1,961, gzip-6 779 | local `43c3agrp2xheg.js` raw 6,822, gzip 2,857 |

Captures: `an1-vercel-chunks.json` (every JS response per page, with sizes), driver `chunks.js` (arguments: puppeteer dir, chrome binary, base URL, output path).

**Limits, stated.**

- **No "before" on Vercel.** The "chunk bytes before and after" comparison was not taken on Vercel: no deployment of `af3d95a` plus nothing else was built, so the Vercel chunk totals above have no base beside them. The analyst's local base-versus-spike numbers are the only before-and-after pair, and they came from a different build host.
- **`jsTransfer` reads 0** in the probe's output (`performance` resource `transferSize` for the chunks), so the probe's own transfer figure for JS is not usable; the byte figures above come from reading each response body instead.
- **Network differs.** This run crossed the internet; the local run did not. Do not read the medians as one measure on two hosts.
- **Editor `pageerror`.** In 3 of the 20 editor loads the page raised `pageerror Error` (the message text the probe kept is only "Error"). None on `/preview`. The engine initialised on all 20 editor loads, so it is not shown to touch the engine. It was not diagnosed here.
- **Not a production reading.** A Preview runs the project's Preview environment, whose database and Pusher settings were not read; no page was driven in a way that writes.

## 4. AN-1's result

AN-1's Vercel limb: **previews build, and the spike's wasm builds, is served and initialises there**, on the plan 018 build form (`SKIP_ENV_VALIDATION=1`), not on a plain push. This does not bear on the production environment, where the five variables are present.

## Resumption State

The 2026-11-23 checkpoint state is spent: Stage 1 above has taken its items.

## Open items

- **Done 2026-11-23T17:04Z:** the spike branch is deleted at origin, in the local repository and as a worktree, after the analysis (record `aafecf1`, section AN-1, cites this document at `2531c04a`; `git grep` over that record found the citation). `git ls-remote origin 'refs/heads/spike/*'` lists nothing; `master` is `af3d95a`. Deleting deployed nothing.
- The two spike deployments stay on the Vercel project until Vercel's own retention; no delete is made (a deployment delete is outside the look-only ruling).
