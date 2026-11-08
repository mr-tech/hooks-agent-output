---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "c5303ca,8de2b53 — repos=website,preview-image-generator; effort-final Phase 2: the production diffs 7ce866b..c5303ca (website) and 471578f..8de2b53 (generator), swept at those tips in git-archive exports under unshare -rn"
Status: QA Failed
Status-Detail: "QA Failed on test adequacy alone, with no production defect. Website c5303ca: 265 mutants over 7ce866b..c5303ca, 256 killed and 9 survived. 6 survivors are dispositioned; 3 are QAF-38, QAF-39 and QAF-40 (MEDIUM, test-only, implementer). Generator 8de2b53: whole diff swept, QAF-37 RESOLVED. The re-run after the fix covers the 5 survivors only."
Phase: 2
---

# QA Report: Plan 015 — effort-final Phase 2 (website, preview-image-generator)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 28 (`2a4533b`). Phase 1 is keyed to it (`cfbdc7d`).
**Stage start**: each milestone's last code-review verdict at its `Reviewed-At`: website `c5303ca` (Round 14 CR-38 sub-entry, APPROVED, `9b4d808`) and preview-image-generator `8de2b53` (Round 18 sub-entry, APPROVED_WITH_COMMENTS, `3540028`). Code review Round 21 (rev 28 gate read) moved no code. Steering's brief (2026-11-08, after the /clear) names this pass.
**Why this pass**: Phase 1 supplied fixture text the implementer shipped, so the effort's last Phase 2 verdict rests on a mutation sweep over the production code the effort changed (`git diff <chain base>..<tip>` over production paths). The milestone-scoped sweeps ran at earlier SHAs, and each covered only its own round. This pass sweeps each repository's whole production diff at its tip.
**Register**: `qa/015-bug-evaluation-fixes-qa.md` § Blocking-condition register.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T11:19 | steering-hooks-015 (brief after the /clear); planner-hooks-015 (rev 28) | QA effort-final Phase 2 | Created with the generator half, the owed checks and the website sweep's inputs. The website sweep is running. |
| 2026-11-08T12:40 | code-reviewer-hooks-015 (QAF-37 cell, `f77e71c`); implementer-hooks-015 (`8fb1eee`) | Website sweep result; QAF-37 re-run | QA Failed. Website: 256 of 265 killed. Of the 9 survivors, 6 are dispositioned and 3 raised as QAF-38, QAF-39 and QAF-40 (MEDIUM, test-only). QAF-37 RESOLVED. Two run false starts are disclosed and not scored. |

## Scope and criteria assessed

*Recorded 2026-11-08T11:19. This is after the generator runs below executed (11:05 to 11:18), so for the generator half the list is not "before executing". The list was fixed from the Resumption State's owed list (`qa/015-bug-evaluation-fixes-qa.md`, "Owed by QA at the effort-final Phase 2") before any run. It is written here late, and nothing was added after a result.*
- **Sweep, website:** the production diff `7ce866b..c5303ca` over `src` and `bot`, excluding `__tests__`, at `c5303ca`. It includes the implementer's recorded mutants and the CR-12 belonging comparison.
- **Sweep, generator:** the production diff `471578f..8de2b53` at `8de2b53`.
- **Discord's Embed `color` contract** (M2's Assumption Not Checked).
- **RK-7** re-run at the tip.
- The suite at the tip: `c5303ca` is the tree of the `qa/015-bug-evaluation-fixes-qaf34-qaf35-cr26-qa.md` run (1122/1122, 115 files, vitest exit 0, typecheck exit 0). The website head is still `c5303ca` (`git -C website rev-parse HEAD`), so that run is this tree's and is not repeated.

## TDD compliance gate

No new production code since the last milestone passes. The TDD tables were audited per milestone in their own documents. This pass adds no production change, so no new rows are owed.

## Test Execution Results

### Generator, `471578f..8de2b53` at `8de2b53`

Population: 5 files (`git diff --numstat 471578f 8de2b53`): `ecosystem.config.js`, `src/config.ts`, `src/generateImage.ts`, `src/getPool.ts`, `src/server.ts`. The diff is `verification/015/effort-final/gen-prod-diff-471578f-8de2b53.diff`. Export: `m8-local-probe/run.sh` at `8de2b53`, with the rig control 32 cells and 0 failed (`effort-final/gen-export-control-8de2b53.txt`).

Mutant sets, all committed before their runs:
1. The 22 mutants of the M8 round, `mutators/qa-m8r-mutants.json`, already run at `8de2b53` (19 killed, 3 dispositioned; `qa/015-bug-evaluation-fixes-m8-qa.md`). They are at the tip, so they are not re-run.
2. The 9 M8-b to M8-e mutants first run at `6c613a5` (`mutators/qa-m8-supplement.py`), re-run at the tip:
   - 6 under the rig `probe.cjs` (blob `25218c6`), restated to the compiled build: `effort-final/gen-m8be-mutants-8de2b53.json` (`c21d0da`). `m8d-no-create-error-handler` is restated to the conditional registration (D36).
   - 3 (m8b) at source level through `m8-local-probe/run-body-class-qa.sh` (`probe-body-class.cjs` blob `92d0273`, `obs-preload.cjs` blob `aa5f036`).
3. 4 gap mutants: sites in the diff that no earlier set reaches, `effort-final/gen-gap-mutants-8de2b53.json` (`10c4547`).

| Mutant | Outcome | Cases red |
|---|---|---|
| `m8c-finally-no-close` | KILLED | 2: the navigation-throws page closed; the screenshot-succeeded page closed |
| `m8c-sequential-delete` | KILLED | 2: server-level two failing requests get 500 and the process lives; no unhandled rejection when image and delete both fail |
| `m8d-factory-returns-null` | KILLED | 5, incl. the launch error rejects the request; no retry storm |
| `m8d-no-create-error-handler` | KILLED | 2: launch error not TypeError; no retry storm |
| `m8e-gate-dropped` | KILLED | 2: unset, empty |
| `m8e-empty-allowed` | KILLED | 1: empty alone |
| `m8b-object-test-dropped` | KILLED | 5: null, number, string, boolean, boolean false |
| `m8b-null-conjunct-dropped` | KILLED | 1: null alone |
| `m8b-catch-rethrows` | KILLED | 6: every refused member, the process exits code 1 |
| `qa-ef-use-release-dropped` | KILLED (timeout) | none named: the probe hangs after its last cell, and the driver's 300 s timeout counts as a kill |
| `qa-ef-use-release-success-only` | KILLED (timeout) | as above |
| `qa-ef-clear-dropped` | **equivalent on this engine** (by execution, below) | 0 |
| `qa-ef-fallback-timer-removed` | **SURVIVED** | 0: QAF-37 |

Controls: the rig control in the gap run is 32 cells, 0 failed (`gap/gap-qa-m8r-control.txt`). The body-class control is 7/7 (`body/bodyclass-control-8de2b53.txt`). The first attempt at the 3 m8b mutants went through `qa-m8r-sweep.py --probe probe-body-class.cjs`, and all 3 were ABORTED: that driver copies `probe.cjs` and `probe-pages.cjs` but not `obs-preload.cjs`, so the server never started and the observer was never live (`body/qa-m8r-*-probe-body-class.txt`). Those rows are superseded by the `run-body-class-qa.sh` runs and are not scored.

Outside the local instrument: `ecosystem.config.js` `kill_timeout` 12000 is a PM2 setting that the rig does not run. Register B-8's "exit before 12000 ms, no SIGKILL for stop (2)" decides it in production.

**`qa-ef-clear-dropped` (drain without `pool.clear()`) is equivalent for the orphan outcome.** Probe: `effort-final/clear-orphan-probe/run-clear-orphans.sh` and `probe-clear-orphans.cjs`, run 3 (`run3-8de2b53.txt`). One `/generate` launches Chrome (12 new `chrome` processes, counted by exact process name against a start baseline). Results:

| Run | Exit | Chrome left 3 s after exit |
|---|---|---|
| Control, shutdown message | code 0 | 0 |
| Positive control, SIGKILL (no exit handlers run) | SIGKILL | 12 |
| Mutant, shutdown message | code 0 | 0 |

Puppeteer 21.1.0 kills its browser on process exit, so `clear()` changes only graceful close against kill, which no criterion observes. Node 24 only; Node 18 is the M8 document's Assumption Not Checked, already routed to M8-0 run 2. RK-5's production read (B-8: no Chromium with ppid 1) is the production instrument.
- *Disclosed slip in this probe:* run 1 (`run1-8de2b53.txt`) counted and killed by `pgrep -f` / `pkill -9 -f 'puppeteer_dev_chrome_profile'`. That pattern matched the command line of my own tool shell, so the count was wrong, and the `pkill` ended the run, killing that shell. The baseline count of 2 is explained by my own two shells, the counting `sh` and the tool shell. A box-wide `ps` afterwards showed no `chrome` process, but I cannot prove that no foreign process matched. Runs 2 and 3 count by `pgrep -x chrome` against a baseline and kill only PIDs that appeared during the run. Run 2 launched no browser (no `PUPPETEER_EXECUTABLE_PATH`), so it decides nothing. Run 3 is the run of record.

### Website, `7ce866b..c5303ca` at `c5303ca`

Population: 49 production files (47 under `src`, 2 under `bot`), 168 hunks (`git diff -U0 7ce866b c5303ca -- src bot ':!**/__tests__/**'`; `effort-final/website-prod-diff-7ce866b-c5303ca.diff`). Excluded: `.eslintrc.json`, `tsconfig.test.json` and `vitest.config.ts` (tooling; the CR-26 lint ban has its own lint runs).

Mutant set (`effort-final/website-sweep-mutants.json`, `1067fad`), 265 mutants:
- 230 recorded single-pair mutants that apply exactly once at `c5303ca`. They come from every website mutator under `verification/015/` (consolidated by `consolidate.py`). There were 248 unique mutants and 17 duplicates collapsed. 16 do not apply because a later round replaced their target text; each is restated below or dispositioned in `consolidate-report.txt`.
- 2 recorded multi-pair mutants, each spanned into one exact-once replacement (`website-mutants-apply-multipair-spanned.json`).
- 33 gap mutants (`gap-mutants.py` → `website-gap-mutants.json`). They cover hunks that no recorded mutant's span reaches (`gapmap.py` → `gapmap.txt`: 94 of 168 hunks), plus restatements of the not-applicable recorded mutants on `WebhookMenu`'s error line and `useValidateWebhook`'s catch.
- After the gap set, 70 hunks have no mutant (`gapmap-with-gap-mutants.txt`, `remaining-gaps.txt`). Each is dispositioned by class in `effort-final/gap-dispositions.md`: imports, reformatting, code moved and swept at its new home, plumbing a neighbouring mutant decides, equivalent at the tip, and type-only.

The CR-12 belonging comparison (`routers/message.ts`, `channel.guild_id !== guildId`) is in the set 5 times: guild check dropped, compares channel id, refuses only when set and differs (the "has a `guild_id`" conjunct alone), null passes, and loose inequality.

Runner: `~/.claude/tools/mutation-run.py`, `--dep node_modules`, `--timeout 300`. The suite command is `unshare -rn sh -c 'ip link set lo up && [ <non-lo links> = 0 ] && npx vitest run'` (`effort-final/run-shard.sh`), in 3 shards. A test-fire on `ef-cron-error-eq-null` gave control 1122/1122, and the mutant KILLED with 1 failed and 1121 passed.

**Result: 265 mutants. 256 KILLED, 9 SURVIVED, 0 STILLBORN, 0 ABORTED, 0 CONTROL-FAILED.** Kill table: `effort-final/website-killtable.tsv`, built by `killtable.py` from the six runner tables in `effort-final/website-sweep-c5303ca/{firstpass,rerun}/{firstpass,rerun}-table*.json`. Each killed row names its failing cases, read from the run's stderr ` FAIL ` lines. Cross-check against a second instrument, the runner's own summary lines (`{firstpass,rerun}-driver*.txt`): the re-run killed 78 + 76 + 75 = 229 of 232, and the first pass killed 8 + 11 + 8 = 27 of the 33 ids that ran. That gives 256 killed and 9 survived, matching the table. The runner's own 'instruments' field in each table records the blob identity of the mutants file and the lock manifest. Raw per-run output was left in the scratchpad and is not committed (about 530 runs × 2 files).

How the run went, two disclosed false starts, neither scored:
1. Three shards ran in parallel at vitest's default worker count, and every control failed. Under the load, `NewMessageModal.persist-gate-wiring` "a classic draft loaded via the JSON tab writes through Save" timed out at 5000 ms. `run-shard.sh` now caps each shard at `--maxWorkers=5` (`25949f2`), and every control then passed at 1122/1122.
2. In the first capped pass, 232 of 265 rows were ABORTED with exit 127 in 0.45 s (`sh: 1: vitest: not found`). The runner names each export directory after the mutant id. The consolidated ids carry a `:`, which split `PATH` inside the export. Only the 33 colon-free `ef-*` ids ran. The 232 were re-run under ids with `:` replaced by `__` (`website-sweep-mutants-rerun.json`, `8b5ca5d`; the original id is kept as `orig_id`). The ABORTED rows are superseded and excluded from the table.

Kills to read with care:
- `ef-author-effect-deps-dropped`: KILLED by the 300 s timeout (count unknown). With `[]` dropped, the effect re-runs after every render, and its `setTs` re-renders, so the suite never finishes.
- `m4-table__m4a-catch-dropped`, `m4-table__m4d-webhook-catch-dropped`, `qa-m4-supplement__i3-catch-dropped`: KILLED with every case passing (count checked, 1122). vitest reports "Unhandled Rejection", so the process exits non-zero. These are real kills: the suite run is red, and the conventions' "a green pass set is not a green run" is exactly this.

Survivors (9), each dispositioned:

| Mutant | Disposition |
|---|---|
| `ef-embedfooter-iconurl-falsy` (`val === '' ? undefined : val` → `val \|\| undefined`) | **Equivalent.** `EmbedFooterType['icon_url']` is `string \| undefined`, and the two forms agree on every string and on `undefined`. |
| `qa-m4-supplement__rider-loose-inequality` | Dispositioned at M4 (`qa/015-bug-evaluation-fixes-m4-qa.md`): it differs only for a non-string `guild_id`, which Discord's contract bars. |
| `qa-r4-supplement__r4-mounted-every-render` | Equivalent, dispositioned at the CR-26 pass (`qa/015-bug-evaluation-fixes-qaf34-qaf35-cr26-qa.md`). |
| `m5-table__m5f-save-as-refills-on-close-too` | Dispositioned at M5 (`qa/015-bug-evaluation-fixes-m5-qa.md`): the extra refill runs during the leave transition, which jsdom does not render. That is a stated limit under the environment-fidelity convention. |
| `ef-header-other-bypasses-formatter`, `ef-folder-list-drops-prefix` | **QAF-38** |
| `ef-redis-wait-falsy-miss`, `ef-redis-wait-timeout-falsy-miss` | **QAF-39** |
| `ef-imageuploader-validation-bypassed` | **QAF-40** |

Each survivor of the first pass was judged against the tip source before this table was written. The siblings on the same surface were killed: `ef-header-recent-bypasses-formatter` (1 case), `ef-folder-grid-drops-prefix` (1) and `ef-redis-getfromcache-falsy-miss` (2). So each finding below is a site its sibling's cell does not reach, not a surface with no cell at all.

### Owed checks

- **Discord's Embed `color` contract (M2's Assumption Not Checked): discharged, holds.** Discord's API reference defines the notation: "Resource fields that may contain a `null` value have types that are prefixed with a question mark", and "Resource fields that are optional have names that are suffixed with a question mark" (`discord-api-docs`, `developers/reference.mdx`, § Nullable and Optional Resource Fields, read 2026-11-08). The Embed structure's row is field `color?`, type `integer` (`developers/resources/message.mdx`). So the field is optional and not nullable, and Discord omits it rather than sending `null`. A second source agrees: `discord-api-types` 0.38.40 at the website tip types `APIEmbed.color?: number`, beside `accent_color?: number | null` on the container. The library does mark nullability where it applies. No finding against M2-a.
- **RK-7: holds at `c5303ca`.** `qa-rk7-client-reach-run.sh` → `effort-final/rk7-client-reach-c5303ca.txt`: 80 roots, 232 reachable. The same 8 server-key modules are listed as not reachable as at `be881c9`. All controls fire: the positive control is reachable, the value import gives 1, the braces-type import gives 0, and the mixed import gives 1.

## Findings

QAF-37 MEDIUM Phase 2 — the shutdown path's 10 s fallback exit (`src/server.ts` `shutdown`, `setTimeout(() => { process.exit(0); }, 10e3)`) has no cell. Removing it (`qa-ef-fallback-timer-removed`) passes every rig cell (`gen-sweep-8de2b53/gap/gap-qa-m8r-summary.txt`).
- **Why it matters:** the base has the same fallback, so the change preserves it, and M8-a's "exit before 12000 ms, no SIGKILL" (register B-8) relies on it whenever the drain does not settle. The drain waits for borrowed browsers, and a request held in `page.goto` (`networkidle0`, puppeteer's 30 s default navigation timeout) holds it past 10 s. Without the fallback, PM2 SIGKILLs at `kill_timeout` 12000 ms. This is a preserved behaviour with no assertion that fails when it is lost, which puts it at least MEDIUM.
- **Shown by:** the mutant survives with the control at 32 cells and 0 failed. The P1 failed-drain cell covers a drain that rejects, not one that never settles.
- **Owed (implementer, test-only):** a rig cell whose drain never settles (for example a held `/generate` whose page never reaches network idle, or a stubbed pool whose `drain` never resolves), asserting that the process exits with code 0 by about 10 s and before 12 s. It must be shown red under `qa-ef-fallback-timer-removed` and green at `8de2b53`. QA re-runs that mutant alone after the fix.

QAF-38 MEDIUM Phase 2 — M5-e's "Today" rule has no cell at one call site on each page that carries it. The `Header.tsx` "other matches" list (`{formatMessageDate(msg.updatedAt)}` under `otherMatches.map`) and the folder page's list view (`f/[id]/page.tsx`, the `text-sm text-mute` site passing `'Today at '`) can each bypass the formatter, or drop the prefix, with the suite green.
- **Why it matters:** M5-e names both copies, `Header.tsx` and `f/[id]/page.tsx`. Each copy now has two call sites into `formatMessageDate`, and each call site is a member: a user sees the date at all four. The recent-matches site and the grid site have cells; their siblings do not. This is a behaviour the change relies on with no assertion that fails when it is lost.
- **Shown by:** `ef-header-other-bypasses-formatter` and `ef-folder-list-drops-prefix` survive, while `ef-header-recent-bypasses-formatter` and `ef-folder-grid-drops-prefix` are each killed by 1 case (`website-killtable.tsv`).
- **Owed (implementer, test-only):** extend the existing cells that kill the siblings, rather than adding new files. Each extended cell must reach the other-matches entry and the list view, be shown red under its survivor, and be green at `c5303ca`.

QAF-39 MEDIUM Phase 2 — the hot cache's waiter path does not treat a cached falsy value as a hit under any assertion. In `src/utils/redis/index.ts` `wait`, both sites read `cached.item` behind `if (cached)`: the immediate check after the waiter registers, and the timeout check. Either can be narrowed to `cached?.item`, which makes a cached `null` a miss, and the suite stays green.
- **Why it matters:** the `{ item }` wrapper is CR-3's fix (sign-out read a cached `null` as "no account"). The chain applies it at three sites: `getFromCache` and the two in `wait`. With the narrowing, a request that waits on another's mutex for a key whose cached value is `null` gets a rejection ("fetch timed out") after `timeoutSeconds` instead of `null`. Only `getFromCache`'s site has a cell.
- **Shown by:** `ef-redis-wait-falsy-miss` and `ef-redis-wait-timeout-falsy-miss` survive, and `ef-redis-getfromcache-falsy-miss` is killed (2 cases).
- **Owed (implementer, test-only):** in the existing cache test that kills `ef-redis-getfromcache-falsy-miss`, add a waiter case. The mutex must be held, so the call goes to `wait`, and the cached value must be `null`, set before and after the waiter registers. Assert it resolves `null`, with no rejection. Each case must be shown red under its survivor.

QAF-40 MEDIUM Phase 2 — the M6-b predicate has no cell at the point where it reaches a user. `src/components/ImageUploader.tsx` `checkImage` refuses a URL that `isValidImageUrl` rejects before loading it. With the guard removed (`if (false)`), the suite is green.
- **Why it matters:** M6-b states the predicate ("a URL is valid exactly when its path's final segment ends in one of …"), and `isValidImageUrl.ts` has its unit cells. The chain moved the predicate out of `ImageUploader` into its own module. The uploader's call site is what makes M6-b observable: a refused URL is never loaded and shows "Invalid url.". No cell asserts that the uploader consults the predicate.
- **Shown by:** `ef-imageuploader-validation-bypassed` survives.
- **Owed (implementer, test-only):** an `ImageUploader` cell (DOM harness) with a URL the predicate refuses, for example `a.png.html` from M6-b's members. It asserts the URL is refused without an image load, alongside a control URL the predicate accepts. It must be shown red under the survivor and green at `c5303ca`.

QAF-37 RESOLVED (2026-11-08T12:38: preview-image-generator `8de2b53` unchanged; the rig cell at agent-output `8fb1eee`, code review Round 18 sub-entry `f77e71c`).
- Re-run by QA with the committed probe blob `14f5cfc` (`effort-final/gen-qaf37-mutants-8de2b53.json`, `gen-sweep-8de2b53/qaf37/` (files prefixed `qaf37-`)), one run at a time.
- The control is 35 cells with 0 failed, and the fallback exits at 10,029 ms.
- `qa-ef-fallback-timer-removed` is KILLED, with 2 red: the code-0 exit and the window.
- The adequacy mutant `qa-ef-close-not-awaited` (the drain no longer waits for `server.close`) is KILLED, with 2 red: the window, and "no drain-complete line and no drain-failed line". So each of the cell's three checks has been seen red at least once. This answers code review's adequacy note.
- Load during the run: load average 9.95 at the start and 8.33 at the end on 18 cores, from other sessions. The box was not idle.

*Disclosed 2026-11-08T12:40, a gate satisfied:* this document's second changelog row and the plan's QA row were typed as 12:41 and 12:45 while the clock read 12:40. The stamp-gate PostToolUse hook blocked the plan edit on the future stamp. Both rows are re-stamped from `date -u` (`726f4d5`), and the plan row's first commit `c2e7f69` carried the typed stamp. Nothing else changed.

*Reconcile 2026-11-08T12:42 (record check):* the output files under `gen-sweep-8de2b53/{gap,qaf37,rig}/` and `website-sweep-c5303ca/{firstpass,rerun}/` carry their directory as a prefix, and `clear-orphan-probe/run.sh` is now `run-clear-orphans.sh`. This clears the duplicate-basename failures `tools/check-repo.js` raised against this run's files. Content is unchanged. Messages sent before the rename cite the old names.

## Verdict

**QA Failed** at website `c5303ca` and preview-image-generator `8de2b53`. It fails on test adequacy alone: QAF-38, QAF-39 and QAF-40 are each MEDIUM, test-only and routed to the implementer. No production defect was found in either repository. Every other criterion this pass assessed is met:
- the generator's whole production diff is swept at the tip, with QAF-37 RESOLVED;
- the website sweep's other survivors are dispositioned;
- the CR-12 belonging comparison is killed under every form, 5 mutants;
- Discord's `color` contract holds;
- RK-7 holds.

Re-run scope after the fix round: the round changes no production code, so only the five survivors it closes are re-run, each alone against the committed tests. Those are `ef-header-other-bypasses-formatter`, `ef-folder-list-drops-prefix`, `ef-redis-wait-falsy-miss`, `ef-redis-wait-timeout-falsy-miss` and `ef-imageuploader-validation-bypassed`. A wider sweep runs only on the owner's word. The suite is re-run once at the new tip, for counts and exit code.

## Assumption Not Checked

This pass assumes that each hunk in `effort-final/gap-dispositions.md`'s "wrapper or plumbing whose behaviour a neighbouring mutant decides" class is in fact decided by the neighbour it names. That is about 15 hunks, including `JsonModalBody`'s `copyText` memo, the `let isStale` declarations, the redis `{ item }` construction and `auth.ts`'s `Promise.resolve(` wrap. The pass does not test it: those lines carry no mutant of their own.
- **Signature of its falsity:** a mutant written on one of those lines that survives while the named neighbour is killed.
- **Owner of closing:** the owner's word, through steering. Mutating those lines widens the sweep beyond the survivors the fix round closes, which the sweep rule reserves to him. The cost is about 15 runs (about 10 minutes, one shard). Without his word, it stands as a stated limit of this pass, and the Phase 3 release-tip verdict inherits it by name.

Checked in this pass rather than assumed (under a minute):
- **Failing-case attribution.** Over the 255 killed rows that did not time out, none has `N failed` > 0 on its `Tests` line with no stderr `FAIL` line. The only rows with 0 `FAIL` lines are the 3 unhandled-rejection kills, each 1122 passed.
- **The code-moved class's new homes are swept.** The mutant counts per file in `website-sweep-mutants.json` are: `formatMessageDate.ts` 5, `isValidImageUrl.ts` 7, `messageLimits.ts` 3, `parseMessageId.ts` 3, and `limits.tsx` 9, of which 5 are on the component-count logic.

## Handoff

- **Implementer** (implementer-hooks-015): QAF-38, QAF-39 and QAF-40, all test-only on the website chain branch, then to code review as usual.
- **Code review:** the fix round's test diff, under its scoped check.
- **QA:** after code review's sub-entry, the five-survivor re-run and the suite at the new tip. Then the effort-final verdict, and UAT's hand-off.
- **Register:** `qa/015-bug-evaluation-fixes-qa.md`. No row is appended by this pass. Rows inherited and not discharged: B-1, B-2, B-4 to B-14 (B-3 withdrawn). B-8 carries the rev 28 D36 limb.
- **Roadmap:** no roadmap exists (plan `Epic-Alignment`), so no epic acceptance criterion moves.
