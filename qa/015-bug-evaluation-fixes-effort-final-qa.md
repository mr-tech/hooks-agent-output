---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "b96e364,8de2b53 — repos=website,preview-image-generator; effort-final Phase 2. The production diffs 7ce866b..c5303ca (website) and 471578f..8de2b53 (generator) were swept at those tips in git-archive exports under unshare -rn. Website b96e364 is c5303ca plus three test-only rounds (620b4ee, 2b40dc5..b96e364; 0 production paths), where the survivors were re-run and the suite ran"
Status: QA Complete
Status-Detail: "QA Complete: PASS at website b96e364 and generator 8de2b53. QAF-41 and QAF-42 RESOLVED, with both plumbing survivors killed at b96e364. Suite 1130/1130, vitest exit 0, typecheck exit 0. QAF-37 to QAF-42 RESOLVED. UAT is next."
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
| 2026-11-08T12:53 | code-reviewer-hooks-015 (`8f4578c`, website `620b4ee` APPROVED, test-only) | Fix-round re-run | **PASS.** The 5 survivors are killed at `620b4ee`, and QAF-38, QAF-39 and QAF-40 are RESOLVED. Suite 1128/1128, exit 0. Verdict re-anchored to `620b4ee`. |
| 2026-11-08T14:24 | steering-hooks-015 (owner ruling, rulings block 14:18Z, `bab96e0`) | The plumbing-class sweep | **PASS withdrawn; QA Failed.** 13 plumbing mutants at `620b4ee`: 10 killed, 3 survived. QAF-41 and QAF-42 raised (MEDIUM, test-only); 1 survivor is outside the sweep scope. The method failure is recorded under the verdict. |
| 2026-11-08T14:42 | code-reviewer-hooks-015 (website `b96e364` APPROVED, test-only, `c878f4a`); steering-hooks-015 | Survivor re-run after the QAF-41/42 fix | **PASS; QA Complete** at website `b96e364`. 2 of 2 survivors KILLED, suite 1130/1130 with exit 0, typecheck 0. Code review's dialect premise is checked by execution and holds. QAF-41 and QAF-42 RESOLVED. |

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

## Fix round, website `c5303ca..620b4ee` (re-run 2026-11-08T12:53)

Stage start: code review's sub-entry approving `620b4ee`, test-only with no finding (agent-output `8f4578c`). `git diff --numstat c5303ca 620b4ee` touches 4 files, all under `__tests__/`; 0 lines are outside `__tests__`. Production code is unchanged, so the sweep's results at `c5303ca` stand, and only the survivors this round closes are re-run.
- **The 5 survivors, each alone, at `620b4ee`:** `effort-final/website-survivors-rerun-620b4ee.json` (`cfc82e2`; each old string checked exactly once at `620b4ee`). Runner table and failing cases are in `effort-final/website-survivors-620b4ee/`. The control is 1128/1128. **5 of 5 KILLED:**
  - `ef-header-other-bypasses-formatter`: the Header dates case.
  - `ef-folder-list-drops-prefix`: the folder dates case, "in the list view".
  - `ef-redis-wait-falsy-miss`: "is answered null at once when the value is cached by the time the wait starts".
  - `ef-redis-wait-timeout-falsy-miss`: "is answered null when the value is cached by the time the wait times out". Each wait site is killed by its own case alone.
  - `ef-imageuploader-validation-bypassed`: both refusal members, `a.png.html` and `a.txt?file=b.png`.
- **Suite at `620b4ee`:** `qa-m4-suite-run.sh` → `effort-final/qa-ef-suite-run-620b4ee.txt` and `-testresults-620b4ee.json`. 1128/1128 across 116 files, vitest exit 0, typecheck exit 0 (both programs), isolation counts 0/0, 0 stderr lines. Reconciled against `c5303ca`'s 1122 cases in 115 files: + 1 (folder `it.each`, now grid and list) + 3 (`ImageUploader.url-validation`, a new file) + 2 (redis waiter) = 1128 cases, and 116 files. The Header case was extended, not added.
- **Test audit (4 files):**
  - Names take the positive form, with no ID token in a basename or a title. Placement is beside each module.
  - Spec-form throughout, and each expectation is a literal.
  - The redis `TIMEOUT_MS` drives the fake timer. It is not the quantity under test (the null hit is), so axiom (E) is not engaged.
  - The fake timers are deterministic, so there is no wall-clock cell.
  - `ImageUploader`'s `FakeImage` stub fires `onload`, so it is a present-and-firing substitute. Its accepted-URL control proves the load path runs.
  - The folder list case first asserts that the list rendered, a liveness check before the date read.
  - No finding.

QAF-38, QAF-39 and QAF-40 RESOLVED (2026-11-08T12:53: website `620b4ee`; code review `8f4578c`; each survivor killed above).

## Plumbing sweep, website `620b4ee` (owner ruling, 2026-11-08T14:24)

The owner chose "Agent: QA runs the 15" (`steering/015-rulings.md` block 14:18Z, `bab96e0`).
- **Population:** recounted from `gap-dispositions.md`'s "wrapper or plumbing" class, it is **16 hunks**, not my "about 15".
- **13 get a mutant** (`plumbing-mutants.py` → `website-plumbing-mutants.json`, `30363d4`; each old string exactly once at `620b4ee`).
- **3 do not:**
  - `Button.tsx:54-55` is a pure deletion. Its present-tree counterpart is `cr38-button-autofocus-not-passed-to-usebutton`, KILLED in the main sweep.
  - `shared.ts:175-176` has been reached by `ef-shared-partial-user-branch-unfiltered` (KILLED) since that mutant was added after the gap map.
  - `redis:75` is the `getItem` return-type annotation. I misfiled it in the plumbing class; it is type-only.
- **Runner:** as for the sweep, one process. Load average 8.30 at the start. Outputs are in `effort-final/website-plumbing-620b4ee/`.

**Result: 10 of 13 KILLED, 3 SURVIVED.** The control is 1128/1128, and every kill names at least one failing case.

| Mutant | Outcome | Failing cases |
|---|---|---|
| `pl-jsonmodal-copytext-deps-empty` | KILLED | 1 |
| `pl-preview-data-ignores-query` | KILLED | 44 |
| `pl-author-mount-ts-not-set` | KILLED | 1 |
| `pl-author-interval-not-captured` | KILLED | 1 |
| `pl-wp-url-starts-stale` | KILLED | 1 |
| `pl-vw-url-starts-stale` | KILLED | 19 |
| `pl-vw-message-starts-stale` | KILLED | 3 |
| `pl-redis-getitem-falsy-value-miss` | KILLED | 4 |
| `pl-redis-clearuser-pipeline-not-run` | KILLED | 8 |
| `pl-auth-revoke-does-nothing` | KILLED | 4 |
| `pl-button-style-dropped` | SURVIVED | outside the sweep scope, below |
| `pl-shared-partial-guildid-unselected` | SURVIVED | **QAF-41** |
| `pl-auth-message-promise-unwrapped` | SURVIVED | **QAF-42** |

`pl-button-style-dropped` targets `style`, a token the chain did not change. The hunk's change on that line is `autoFocus` leaving the destructure, which the killed `cr38` mutant decides. The sweep covers only production code the effort changed, so this survivor is outside it. The mutant was badly aimed, and that is my error. Button's `style` passthrough is pre-existing, unchanged behaviour, and no finding is raised on it here.

QAF-41 MEDIUM Phase 2 — `getPartialMessages`'s selected columns have no assertion. In `src/server/api/utils/shared.ts` `getPartialMessages`, the chain's M1-a rewrite split the statement into `const query = getPostgres()…` with two `where` branches. With `'Guilds.guildId as guildId'` removed from its select, the suite stays green.
- **Why it matters:** each partial message's `guildId` is what places a message under its server rather than "My Account" in the message list. The rewrite claims to preserve the select list, which is identical at base (`7ce866b` `shared.ts`, the `'Guilds.guildId as guildId'` line in the same query). `shared.in-predicates.test.ts` covers this function's `in` predicates, not its columns. This is a preserved behaviour with no assertion that fails when it is lost.
- **Shown by:** `pl-shared-partial-guildid-unselected` survives (`website-plumbing-620b4ee/`).
- **Owed (implementer, test-only):** in `shared.in-predicates.test.ts`, the existing test on this function, assert that the compiled query selects `guildId` on both branches (guilds present, guilds empty). Show it red under the survivor and green at `620b4ee`.

QAF-42 MEDIUM Phase 2 — the session callback's no-recent-messages path has no cell. In `src/server/auth.ts`, the chain added `messagePromise.catch(() => {})`, and it wrapped `preferences?.recentMessageIds ? getUserRecentMessages(…) : []` in `Promise.resolve(…)`. Without the wrap, a user with no `recentMessageIds` reaches `[].catch`, a TypeError, so the session callback throws. The suite stays green.
- **Why it matters:** this is a behaviour the change relies on: its own new `.catch` needs a promise. The class it guards (a user with no recent messages, including every new user) cannot be expressed by the suite's fixture. `auth.hydrated-session.test.ts` builds its one user with `preferences: { recentMessageIds: ['m1'] }` (`git grep -n recentMessageIds 620b4ee -- '**/__tests__/**'`: 1 line).
- **Shown by:** `pl-auth-message-promise-unwrapped` survives.
- **Owed (implementer, test-only):** in `auth.hydrated-session.test.ts`, a case whose user has no `preferences` and one with `preferences: {}`. Each asserts that the session resolves with no throw. Show them red under the survivor and green at `620b4ee`.

**Withdrawal, and the method failure behind it.** The a906b0c PASS (`QA Complete`) is withdrawn. It rested on `gap-dispositions.md`'s plumbing class, which I wrote by reading each hunk and naming a neighbouring mutant that I judged decides it. I did not execute that claim, and for 2 of the 13 mutated hunks it was false. The neighbours named (`ef-shared-partial-*` for `shared.ts:157`, and the `m1h-*` mutants for `auth.ts:138`) decide a different property of the same statement. The class predicate, "a neighbouring mutant decides it", was never tested by mutating the line itself. That is the Assumption Not Checked this pass named and the owner's ruling closed. The retrospective's lesson: a disposition that a line is covered by its neighbour is a claim, and executing it is what makes it evidence.

## Fix round, website `620b4ee..b96e364` (re-run 2026-11-08T14:42)

Stage start: code review's sub-entry approving `b96e364` (agent-output `c878f4a`, `Reviewed-At` website `b96e364`; plan row `df12772`). `git diff --numstat 620b4ee b96e364` touches 2 files, both under `__tests__/`: `src/server/__tests__/auth.hydrated-session.test.ts` (+20 −2) and `src/server/api/utils/__tests__/shared.in-predicates.test.ts` (+5 −0). The two mutated production files show 0 changed lines over that range. Production code is unchanged since `c5303ca`, so the round re-runs only the 2 survivors it closes.
- **The 2 survivors at `b96e364`:** `effort-final/website-plumbing-rerun-b96e364.json` (blob `4f7923d6`), taken from `website-plumbing-mutants.json` with each old string checked to occur exactly once at `b96e364`. The runner is `~/.claude/tools/mutation-run.py`, `--dep node_modules --timeout 300`, with the suite under `unshare -rn` and the non-lo link check. Outputs are in `effort-final/website-survivors-b96e364/` (`survivors-driver-b96e364.txt`, `out/`). The control is 1130/1130 in 116 files. **2 of 2 KILLED.** The denominator is mutants whose suite started under a passing control: 0 stillborn, 0 not applied, 0 aborted.
  - `pl-shared-partial-guildid-unselected`: 2 red, the two `getPartialMessages` cells (no server, and some servers). The `getUserRecentMessages` cell is a different function, so it stays green under this mutant. Its own new assertion was seen red under code review's `recent-name-unselected` (`verification/015/cr-qaf-probes/cr40/summary-b96e364.txt`). So all three new select-clause assertions have been seen red.
  - `pl-auth-message-promise-unwrapped`: 2 red, both new cells, with `TypeError: messagePromise.catch is not a function` at `src/server/auth.ts` `hydratedAuthCallback`.
  - The kills come from the committed instruments at `b96e364`, so nothing needs a re-run after commit.
- **Suite at `b96e364`:** `qa-m4-suite-run.sh` → `effort-final/qa-ef-suite-run-b96e364.txt` and `-testresults-b96e364.json`. The run gave 1130/1130 across 116 files, vitest exit 0 and typecheck exit 0 (both programs). The isolation counts are 0/0, there are 0 stderr lines, and the export blob check matches. Reconciled against `620b4ee` per file, by path membership: the same 116 files, and the one changed pass set is `auth.hydrated-session.test.ts`, 18 → 20 (the `it.each` cells "no preferences" and "empty preferences"). Nothing was removed. 1128 + 2 = 1130.
- **Code review's Assumption Not Checked, closed by execution:** does the capturing driver's `PostgresQueryCompiler` text match production's `getPostgres()`? Evidence is in `effort-final/website-survivors-b96e364/dialect-premise-b96e364.txt`.
  - The lockfile pins project-utils `749606d`. The installed package resolves to that commit, and its `src/postgres.ts` equals the pin's.
  - `getPostgres()` builds `new Kysely({ dialect: new PostgresDialect(...), log })`, with no plugins (0 `plugins` occurrences in the installed `dist`).
  - Both resolve the same `kysely@0.26.1`. `PostgresDialect#createQueryCompiler()` returns an instance of the class the driver constructs.
  - So the literal is compiled by production's own compiler. The premise holds, and no finding is raised.
- **Test audit (2 files):**
  - Both are existing files, extended per the pattern-ladder rule. Basenames are unchanged and conform.
  - Over the added lines, the ID-token scan has 1 hit, `recentMessageIds: ['m1']`. That is fixture data, under the named exemption.
  - The tests are spec-form and their titles state behaviour.
  - `PARTIAL_MESSAGE_SELECT` is a literal written out independently, not read from production source or computed by the query builder. So axiom (E) holds. Code review's added-column mutant shows the literal is not just a prefix check that tolerates drift.
  - The QAF-42 cells assert guilds returned, `messages` empty, 0 recent-message lookups, and no unhandled rejection after a flush. The `hydrate(user)` default keeps every earlier caller's fixture, and the pass set confirms the 18 earlier cases are unchanged.
  - No TDD table is owed, because the round is test-only with no new function.
  - No finding.

QAF-41 and QAF-42 RESOLVED (2026-11-08T14:42: website `b96e364`; code review `c878f4a`; each survivor killed above).

## Verdict

**PASS (QA Complete)** at website `b96e364` and preview-image-generator `8de2b53`, plan rev 28. No production defect was found in either repository.
- Website: 265 mutants were run over the whole production diff `7ce866b..c5303ca` (`src` and `bot`, excluding `__tests__`). 256 were killed at `c5303ca`, and the 5 actionable survivors were killed at `620b4ee`. The 4 others are dispositioned. The owner-ruled plumbing class has 16 hunks, and 13 of them carry a mutant. Of those 13, 10 were killed at `620b4ee` and 2 at `b96e364`. The last, `pl-button-style-dropped`, is outside the sweep scope as above. The 3 hunks without a mutant are dispositioned.
- Generator: the whole diff `471578f..8de2b53` is swept, with QAF-37 RESOLVED.
- The suite at `b96e364` is 1130/1130, with vitest exit 0 and typecheck exit 0.
- The CR-12 belonging comparison, Discord's `color` contract and RK-7 hold, as recorded below.
- One stated limit carries forward to UAT: the Assumption Not Checked below.

*Withdrawn 2026-11-08T14:24 (plumbing sweep above):* **PASS (QA Complete)** at website `620b4ee` and preview-image-generator `8de2b53`. No production defect was found in either repository.
- Website: of 265 mutants over the whole production diff, 256 were killed at `c5303ca` and the 5 actionable survivors at `620b4ee`. The 4 others are dispositioned (equivalent, contract-barred, or invisible in jsdom), and the 70 hunks with no mutant are dispositioned by class.
- Generator: the whole diff is swept, with QAF-37 RESOLVED.
- The CR-12 belonging comparison is killed in every form. Discord's `color` contract holds, and so does RK-7.
- One stated limit carries forward: the plumbing-class Assumption Not Checked below. The owner's word on widening the sweep is with steering. If he says yes and a new mutant survives, this verdict is withdrawn.

*Superseded verdict, kept as the record of 12:40:* **QA Failed** at website `c5303ca` and preview-image-generator `8de2b53`. It fails on test adequacy alone: QAF-38, QAF-39 and QAF-40 are each MEDIUM, test-only and routed to the implementer. No production defect was found in either repository. Every other criterion this pass assessed is met:
- the generator's whole production diff is swept at the tip, with QAF-37 RESOLVED;
- the website sweep's other survivors are dispositioned;
- the CR-12 belonging comparison is killed under every form, 5 mutants;
- Discord's `color` contract holds;
- RK-7 holds.

Re-run scope after the fix round: the round changes no production code, so only the five survivors it closes are re-run, each alone against the committed tests. Those are `ef-header-other-bypasses-formatter`, `ef-folder-list-drops-prefix`, `ef-redis-wait-falsy-miss`, `ef-redis-wait-timeout-falsy-miss` and `ef-imageuploader-validation-bypassed`. A wider sweep runs only on the owner's word. The suite is re-run once at the new tip, for counts and exit code.

## Assumption Not Checked

This pass assumes that the suite's view of the website, TypeScript source transpiled by vitest with `process.env` read at run time, matches the production build that Vercel serves. It does not test that.
- **Where it bites:** Next inlines each `NEXT_PUBLIC_*` value into the client bundle at build time. The chain's `src/utils/getCDNUrl.ts` now reads `NEXT_PUBLIC_CDN_PORT`, and its cells set the variable at run time.
- **Signature of its falsity:** in a running build, image and preview URLs built by `getCDNUrl` carry no port when the variable is set (or a stale one), while the cells pass.
- **Owner of closing:** UAT, which drives the running build. The pre-release walks (B-2, B-4, B-5) load editor previews whose URLs pass through `getCDNUrl`. This is a stated observation for that walk, not a new row, because no criterion names the port.

Checked in this pass rather than assumed:
- **Plumbing class:** the owner-ruled sweep, 13 mutants, found 2 gaps: QAF-41 and QAF-42.
- **Reformatting class:** `reformat-check.py` → `reformat-check-run1.txt`. Of 16 hunks compared as token multisets (ignoring whitespace and wrap-added `,` and `;`), 1 differs, a leading `|` added to a TypeScript union type in `BottomPortal.tsx:136`, which is type-only. The control (`cron.ts:26`, `=` → `is`) is reported.
- **Import-only class:** `import-check.py` → `import-check-run1.txt`. 15 added import statements each resolve at `c5303ca` to a module exporting every name they bind, or to a package in `package.json`. The planted wrong name is reported.
- **Failing-case attribution:** over the 255 killed rows that did not time out, none has failed cases without a `FAIL` line.
- **The code-moved class's new homes are swept** (per-file counts above).
- **The equivalent class:** `redis:188`/`199-206` rest on an executed `git grep` of callers.

## Handoff

- **UAT is next (steering spawns it).** QA passed at 2026-11-08T14:42. UAT runs at website `b96e364`, generator `8de2b53`, plan rev 28, with the details below. *Superseded wording: "UAT is held. After the fix round for QAF-41 and QAF-42 and code review, QA re-runs those 2 survivors and the suite."* The register is in `qa/015-bug-evaluation-fixes-qa.md` § Blocking-condition register.
  - Pre-release rows for UAT's stage browser: B-1, B-2, B-4, B-5, B-9 to B-14. B-3 is withdrawn.
  - Post-deploy rows: B-6, B-7 and B-8. B-8 includes the rev 28 D36 limb and is devops's at M8-0 run 2.
  - Code review's CR-34 asks UAT to register an operator check on PM2's error log. It goes into that register as B-15 onward.
  - No row is appended by this pass.
- **Steering:** the owner ruled on the plumbing-class sweep (14:18Z, `bab96e0`), and it has run. UAT needs a session, and this pass is the spawn cue.
- **Rows inherited and not discharged:** B-1, B-2, B-4 to B-14.
- **Roadmap:** none exists, so no epic criterion moves.
