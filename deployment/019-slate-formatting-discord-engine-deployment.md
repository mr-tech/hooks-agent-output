---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: "AN-1's Vercel limb read and recorded (below). Stage 1 for plan 019 has not started; its brief comes later. The spike branch is deleted (17:04Z) after the analysis cited these numbers."
---

# Deployment — plan 019, Slate formatting on Discord's engine (website `master`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T16:35 | steering-hooks-fixer (brief `steering/019-brief-devops.md`; its correction message) | M1 § AN-1, fourth bullet: do branch previews build, and the plan's numbers there | Previews build, but only with a build-command override. Spike branch `spike/019-an1-wasm` pushed twice; the plain push failed its Preview build, the override commit reached READY; 20-load probe recorded. Details below. |
| 2026-11-23T17:04 | analyst-019 (message: analysis `aafecf1` cites this record) | Delete the spike branch | `spike/019-an1-wasm` deleted at origin, locally and its worktree removed; `master` unchanged at `af3d95a`. |
| 2026-11-23T18:14 | steering-hooks-fixer (checkpoint request) | Wrap up for a clear | Resumption State written; wake deleted. |

## Scope

This document records AN-1's devops act only (plan `planning/019-slate-formatting-discord-engine.md`, Revision 2, `8dfd4659`; the plan's current text was re-read after steering's correction). Stage 1 and Stage 2 are not begun. Nothing here is a release: no ref a production deploy runs from moved.

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

## Resumption State (checkpoint 2026-11-23T18:14Z, at steering's request)

- **Done:** AN-1's devops act (sections 1 to 4), committed (`2531c04a`, `5c379323`); spike branch deleted at origin, locally and as a worktree; `analyst-019` (analysis `aafecf1`), `planner-019` and steering messaged.
- **Next:** Stage 1 for plan 019, after the plan's implementation (steering expects it more than ten hours on). Its own brief will come. Stage 1 starts from devops.md steps 1 to 10 on the chain's committed documents; re-derive every gate from the record then, never from this state. Carry in:
  - the plan's M7 line: no release tree holds M4 without M5, checked from the chain's commit list at Stage 1;
  - the plan's Post-deploy observable (`https://x.y🙂` and `[a](https://x.y/🙂)` give a preview anchor whose `href` is not `…:slight_smile…`), a post-deploy row whose reader is devops at Stage 1, carried by a handoff created at Stage 1 step 8;
  - plan 018's Preview form for any further Preview read: a branch needs `vercel.json` `{"buildCommand": "SKIP_ENV_VALIDATION=1 next build"}` to reach READY, because the Preview target lacks `DATABASE_URL` and the four `REDIS*` names (section 1);
  - the AN-1 analysis limits that touch release: the 3 undiagnosed editor `pageerror` loads (gap G-3's residue in the analysis) and the absent Vercel base build.
- **Website tree:** the shared tree is on `chain/fix-image-uploader-url` (held by chain 9e; HEAD `5ec0621` at 18:14Z); `master` and origin `master` at `af3d95a`. I switched nothing. No worktree of mine remains; no spike branch remains (`git ls-remote origin 'refs/heads/spike/*'` lists nothing).
- **Uncommitted or locally mutated:** none of mine. Scratchpad holds copies only (`/tmp/claude-1000/-usr-local-bin-hooks/1a020d02-a5d7-4afd-a4c4-02cbf7077d2a/scratchpad/`): captures are committed under `verification/019/devops/`.
- **Evidence run, not recorded:** none. The Ready spike deployment's build log was not saved (only the Error one).
- **Questions out, unanswered:** to `steering-hooks-fixer`, whether it wants the Preview target's variable names read with `vercel env ls` (the 19:02 ruling does not cover it; not run). No answer received.
- **Processes:** none started by this work remain. The cache-warm wake is deleted at this checkpoint and not re-armed.

## Open items

- **Done 2026-11-23T17:04Z:** the spike branch is deleted at origin, in the local repository and as a worktree, after the analysis (record `aafecf1`, section AN-1, cites this document at `2531c04a`; `git grep` over that record found the citation). `git ls-remote origin 'refs/heads/spike/*'` lists nothing; `master` is `af3d95a`. Deleting deployed nothing.
- The two spike deployments stay on the Vercel project until Vercel's own retention; no delete is made (a deployment delete is outside the look-only ruling).
