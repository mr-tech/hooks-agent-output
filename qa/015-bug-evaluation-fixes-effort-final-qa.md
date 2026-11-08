---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "c5303ca,8de2b53 — repos=website,preview-image-generator; effort-final Phase 2: the production diffs 7ce866b..c5303ca (website) and 471578f..8de2b53 (generator), swept at those tips in git-archive exports under unshare -rn"
Status: Testing In Progress
Status-Detail: "Effort-final Phase 2 in progress. Generator half run: 9 earlier M8-b to M8-e mutants all killed at 8de2b53, and 4 gap mutants: 2 killed (timeout), 1 equivalent by execution, 1 survivor (QAF-37 MEDIUM, implementer, test-only). Website sweep of 265 mutants at c5303ca running."
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

Controls: the rig control in the gap run is 32 cells, 0 failed (`gap/qa-m8r-control.txt`). The body-class control is 7/7 (`body/bodyclass-control-8de2b53.txt`). The first attempt at the 3 m8b mutants went through `qa-m8r-sweep.py --probe probe-body-class.cjs`, and all 3 were ABORTED: that driver copies `probe.cjs` and `probe-pages.cjs` but not `obs-preload.cjs`, so the server never started and the observer was never live (`body/qa-m8r-*-probe-body-class.txt`). Those rows are superseded by the `run-body-class-qa.sh` runs and are not scored.

Outside the local instrument: `ecosystem.config.js` `kill_timeout` 12000 is a PM2 setting that the rig does not run. Register B-8's "exit before 12000 ms, no SIGKILL for stop (2)" decides it in production.

**`qa-ef-clear-dropped` (drain without `pool.clear()`) is equivalent for the orphan outcome.** Probe: `effort-final/clear-orphan-probe/run.sh` and `probe-clear-orphans.cjs`, run 3 (`run3-8de2b53.txt`). One `/generate` launches Chrome (12 new `chrome` processes, counted by exact process name against a start baseline). Results:

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

*Results: pending (running).*

### Owed checks

- **Discord's Embed `color` contract (M2's Assumption Not Checked): discharged, holds.** Discord's API reference defines the notation: "Resource fields that may contain a `null` value have types that are prefixed with a question mark", and "Resource fields that are optional have names that are suffixed with a question mark" (`discord-api-docs`, `developers/reference.mdx`, § Nullable and Optional Resource Fields, read 2026-11-08). The Embed structure's row is field `color?`, type `integer` (`developers/resources/message.mdx`). So the field is optional and not nullable, and Discord omits it rather than sending `null`. A second source agrees: `discord-api-types` 0.38.40 at the website tip types `APIEmbed.color?: number`, beside `accent_color?: number | null` on the container. The library does mark nullability where it applies. No finding against M2-a.
- **RK-7: holds at `c5303ca`.** `qa-rk7-client-reach-run.sh` → `effort-final/rk7-client-reach-c5303ca.txt`: 80 roots, 232 reachable. The same 8 server-key modules are listed as not reachable as at `be881c9`. All controls fire: the positive control is reachable, the value import gives 1, the braces-type import gives 0, and the mixed import gives 1.

## Findings

QAF-37 MEDIUM Phase 2 — the shutdown path's 10 s fallback exit (`src/server.ts` `shutdown`, `setTimeout(() => { process.exit(0); }, 10e3)`) has no cell. Removing it (`qa-ef-fallback-timer-removed`) passes every rig cell (`gen-sweep-8de2b53/gap/qa-m8r-summary.txt`).
- **Why it matters:** the base has the same fallback, so the change preserves it, and M8-a's "exit before 12000 ms, no SIGKILL" (register B-8) relies on it whenever the drain does not settle. The drain waits for borrowed browsers, and a request held in `page.goto` (`networkidle0`, puppeteer's 30 s default navigation timeout) holds it past 10 s. Without the fallback, PM2 SIGKILLs at `kill_timeout` 12000 ms. This is a preserved behaviour with no assertion that fails when it is lost, which puts it at least MEDIUM.
- **Shown by:** the mutant survives with the control at 32 cells and 0 failed. The P1 failed-drain cell covers a drain that rejects, not one that never settles.
- **Owed (implementer, test-only):** a rig cell whose drain never settles (for example a held `/generate` whose page never reaches network idle, or a stubbed pool whose `drain` never resolves), asserting that the process exits with code 0 by about 10 s and before 12 s. It must be shown red under `qa-ef-fallback-timer-removed` and green at `8de2b53`. QA re-runs that mutant alone after the fix.

## Assumption Not Checked

*Pending until the website half is in.*

## Handoff

*Pending.*
