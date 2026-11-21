---
ID: n/a
Origin: fix-website-dependency-audit
UUID: d9ef268a
Verified-At: "ead3ea1 — repos=agent-output"
Status: Released
Status-Detail: "Phase 2 verdict QA Complete at ead3ea1 (QAF-1..QAF-5 closed; suite 23/23, exit 0; 63 of 72 mutants killed, 9 equivalent or without a reader). Closed by devops at the chain's release: crontab line installed 2026-11-21T01:11Z, no push. Register row B-1 and the Assumption Not Checked are carried by handoff/fix-website-dependency-audit-first-run-2026-11-21.md, read by scheduled reader R1."
Phase: 2
---

# QA Report: fix-website-dependency-audit

**Plan Reference**: none (fixer chain). Scope: `steering/fix-website-dependency-audit-rulings.md`, blocks "2026-11-20T23:58Z", "2026-11-20T23:59Z", "2026-11-21T00:01Z", "2026-11-21T00:19Z".
**Implementation Reference**: `implementation/fix-website-dependency-audit-implementation.md` (record `3d0da59`, `Handoff-At: c5508c7`).
**Stage start**: the code review's committed verdict, `code-review/fix-website-dependency-audit-code-review.md` (record `bf39906`, `Verdict: APPROVED`, `Reviewed-At: c5508c7`). Brief: `steering/fix-website-dependency-audit-brief-qa.md` with its common part.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T00:56 | steering-roadmap-hooks (brief, record `097b839`) | Phase 2 on a fixer chain at `c5508c7` | Phase 2. A fixer chain, so there is no Phase 1 (owner's selection of the fixer route). Suite re-run network-isolated in an export: 18/18, exit 0. Mutation sweep over the chain's production file (60 generated + 12 QA mutants): 49 of 72 KILLED, 23 SURVIVED. Of the survivors, 8 are equivalent or have no reader; 15 show four claimed properties with no failing assertion (QAF-1..QAF-4, MEDIUM, severity floor) and one untested disjunct (QAF-5, LOW). **QA Failed**: to the fixer for test tightening; no production change is owed. |
| 2026-11-21T01:09 | fixer-fix-website-dependency-audit (message; implementation document `9a21bba`, `Handoff-At: ead3ea1`) | Phase 2 refresh after the QAF round | Phase 2 refresh at `ead3ea1`. Production unchanged since `c5508c7`, the test file +68 −0. Suite network-isolated: 23/23, exit 0. My re-run of the 23 survivors at `ead3ea1`: 14 KILLED, each by the case written for it; the 9 still surviving are the ones already ruled equivalent or without a reader. QAF-1..QAF-5 closed. **QA Complete** at `ead3ea1`; to devops. |
| 2026-11-21T01:14 | devops-fix-website-dependency-audit | Document closed | Status: Released. The tool is installed on a crontab line (01:11Z, no push). Row B-1 and this document's Assumption Not Checked are carried by `handoff/fix-website-dependency-audit-first-run-2026-11-21.md` and read at the first scheduled run (06:43Z) by reader R1. |

## Scope and criteria assessed (recorded before executing)

From block 23:59Z, rulings 00:01Z and 00:19Z (the same seven as the review, plus the two limbs):

1. The audit runs over website `origin/master`'s dependency files through a `git archive` export, never the shared tree; git use is read-only.
2. Only a `module|GHSA` key with a non-empty `how` dispositions an advisory.
3. **Each** undispositioned advisory gets one `INBOX.md` entry in the `inbox-entry` form, once, never repeated while it stays undispositioned.
4. A quiet run writes nothing but its log.
5. A departed advisory does not fail the run; an unreadable audit reports no advisory.
6. No Discord, webhook or headless-agent effect; `verification/website-deps-review/` unchanged.
7. The seeded dispositions are the review's, one `module|GHSA` key per advisory.
8. Limb (a): one inbox entry when a streak of failed runs starts, none until a run succeeds.
9. Limb (b): one entry per differing local/remote pair, read only.

Stated limit, not assessed as a defect: a disposition holds for every version of its module under its GHSA (CR-3, ruling 00:19Z).

**Class enumeration (step 3).** Criterion 3 names "each" advisory; the suite's example member is one undispositioned advisory per run (`nanoid`, two versions merged). The class is N ≥ 1 distinct undispositioned advisories in one run; no case has N ≥ 2 (QAF-1). Criteria 3, 8 and 9 are once-only properties stated without conditions; the suite exercises each with the other two conditions absent (state with no reported key, a clone in step, no failure), so their co-occurrence is the unexamined part of the class (QAF-2).

## Tree identity

`c5508c7` (record `master`). Record `HEAD` was `097b839` at the start; `git diff --quiet c5508c7 HEAD -- tools/website-dependency-audit.js tools/websiteDependencyAudit.test.js tools/website-audit-dispositions.json` exited 0, as did the same check against the working tree. Runs used a `git archive` export of `c5508c7`; each file's blob in the export equals `git rev-parse c5508c7:<path>` (`9fc0ea0`, `abcf823`, `262ef37`). The website was read only (`rev-parse`, `diff --stat`, `show`).

## TDD compliance (fixer route)

The evidence is the fixer document's Test section: red run `verification/fix-website-dependency-audit/red-run.txt` (8/8 `Cannot find module`), `red-run-limbs.txt` (3 of 16 fail at `ed7926d`'s tool), `red-run-cr4-reviewer-mutant.txt`, and the green run (`green-run.txt`). Present; no table owed.

## Irreversible Side-Effect Register

Produced because the tool appends to a shared file. Enumerated by effect (every write and outbound call in the tool at `c5508c7`: `grep -c -E "appendFileSync|writeFileSync|renameSync|rmSync|mkdirSync"` = 5 sites; git calls by `grep -n` = `rev-parse`, `archive`, `ls-remote` only).

| Effect | Route (path, symbol) | Precondition | Same ordering on every route? | Guard mutants |
|---|---|---|---|---|
| Append to `INBOX.md` (shared, uncommitted; not revertible by git) | `appendEntries`, called only from `persist`; `persist` called from `audit` and `recordFailure` | advisory: no `module\|GHSA` disposition with `how`, no `state.reported` key; failure: no `state.failing`; stale: local ≠ remote and pair not in `state.stale` | Yes — `persist` appends, then writes state, for both callers (read at `c5508c7`; held by the review's three ordering mutants, KILLED) | killed: `91:&&`, `91:if-false`, `156:if-false`, `175:not`, `177:*`, `181:if-false`, `183:if-false`; **survived: the four coupling mutants (QAF-2) and the walk truncations (QAF-1)** |
| Write state file `~/.local/state/website-dependency-audit/reported.json` (suppresses later reports; reversible by deleting it) | `writeState` (temp file + `rename`), from `persist` only | after the append | Yes, as above | `108:true` KILLED; `179:>` SURVIVED (QAF-4) |
| `git -C website rev-parse / archive / ls-remote` | `exportLockfile`, `remoteHead` | none (read only; no `fetch`, `update-ref` or `checkout` in the tool) | n/a | refs-unchanged assertion in the per-pair case |
| Temporary export folder | `mkdtemp`, removed in `audit`'s `finally` | — | n/a | `171:true` KILLED (`171:true:2` equivalent, below) |

## Test execution

| Run | Command | Result | Capture |
|---|---|---|---|
| Suite, network-isolated | `unshare -rn node --test tools/websiteDependencyAudit.test.js` in the export (node v24.14.0) | 18 tests, 18 pass, 0 fail, **exit 0** | `verification/fix-website-dependency-audit/qa/suite-run-c5508c7.txt` |
| Mutation sweep | `mutation-run.py --repo agent-output --sha c5508c7 --mutants verification/fix-website-dependency-audit/qa/mutants-sweep-c5508c7.json --timeout 120 --readonly-root /home/dev/.local/state --readonly-root /usr/local/bin/hooks -- unshare -rn node --test tools/websiteDependencyAudit.test.js` (runs delegated to a helper; table read here) | control passed; **49 of 72 KILLED** (count checked 18 = 18 on all 49), 23 SURVIVED, 0 stillborn/aborted | `verification/fix-website-dependency-audit/qa/mutation-table-sweep-c5508c7.json`, `verification/fix-website-dependency-audit/qa/mutation-driver-sweep-c5508c7.txt`, `verification/fix-website-dependency-audit/qa/mutation-rows-sweep-c5508c7.txt` |

The suite ran under `unshare -rn`, so as a mapped root: the two `EISDIR` fixtures hold under root, as the review required. The sweep's read-only roots kept a mutant that drops argument parsing from writing the real state default or anything under the workspace.

**Sweep scope.** The chain's production diff, `git diff --name-only f943553 c5508c7 -- tools/`: `tools/website-dependency-audit.js` (mutated) and `tools/website-audit-dispositions.json` (data, not mutated; its content is the review's seed differential, 84/84 units). The test file is excluded by rule. 72 mutants = 60 from `node ~/.claude/tools/mutant-gen.js --repo agent-output --sha c5508c7 --files tools/website-dependency-audit.js` (operators: comparison and logical swaps, `!` removed, booleans flipped, number +1, `if (false && `, walk truncation; excludes `??`, `?.`, `=>`, and comparisons inside template substitutions) + 12 QA mutants (`verification/fix-website-dependency-audit/qa/mutants-qa-c5508c7.json`: 8 coupling mutants, each once-only guard gated on each sibling condition in both polarities, and 4 entry-content mutants). Instruments by blob: `mutation-run.py` `b26916e`, sweep set `44ecb5a`.

**Positive control on the same run.** The four opposite-polarity coupling mutants (`qa-coupling-stale-key-only-with-advisory`, `-reported-key-only-when-stale`, `-marker-only-after-a-report`, `-streak-ends-only-on-reporting-recovery`) and `qa-prod-flag-dropped` were KILLED, so the QA mutants are applied and the suite can see them; their siblings survive because of the fixtures, not the instrument.

### Survivors, each dispositioned

| Mutant(s) | Change | Disposition |
|---|---|---|
| `60:num`, `60:num:2`, `77:num`, `77:num:2` | `maxBuffer` 256 MiB → 512 MiB | Equivalent for every real input (the audit's JSON is far below either bound) |
| `77:num:3` | pnpm timeout 300000 → 300001 ms | Equivalent |
| `171:true:2` | `rmSync(…, force: false)` | Equivalent: the folder always exists (`mkdtemp` just made it) |
| `196:num`, `204:num` | exit code 1 → 2 | No reader: tests and cron read only non-zero; cron does not record the status. Not a finding |
| `190:num:2` | `now` keeps 17 characters (`…T00:46:`) | Cosmetic in log and state values, which nothing parses; residue |
| `175:walk-first/last`, `178:walk-first/last` | only the first or last undispositioned advisory is reported / given an entry | **QAF-1** |
| `qa-coupling-stale-key-only-without-advisory`, `-reported-key-only-when-in-step`, `-marker-only-before-any-report`, `-streak-ends-only-on-quiet-recovery` | each once-only guard depends on a sibling condition | **QAF-2** |
| `qa-entry-names-remote-ref-sha`, `qa-stale-entry-names-remote-as-read`, `qa-entry-omits-advisory-url`, `190:num` | entry content: which SHA it names, the advisory URL, the heading's date | **QAF-3** |
| `179:>` (`entries.length >= 0`) | the state file is written on every run, a quiet one included | **QAF-4** |
| `49:if-false` | the `!argv[i].startsWith('--')` disjunct removed (precedence leaves the other two) | **QAF-5** |

## Findings

QAF-1 MEDIUM Phase 2
**Criterion 3 is tested only for one undispositioned advisory per run.** Location: `tools/websiteDependencyAudit.test.js` (every case); production `audit`, `fresh` and `entries`. Under `178:walk-first`, a run with two new advisories appends one entry but records both keys, so the second advisory is never reported, which is the failure the owner's "so a new advisory is read by someone" rules out. Under `175:walk-*` the second is delayed a day. All four survive at 18 = 18. Property to check: a run with two distinct undispositioned advisories (different modules or GHSAs) appends two entries, each naming its own GHSA, and a second run appends none. Spec-form; tighten the first case or add one beside it.

QAF-2 MEDIUM Phase 2
**The three once-only properties are tested only one at a time; each fails when it co-occurs with another.** Location: production `audit` (`for (const u of fresh) …`, `if (newPair) …`, `delete state.failing`) and `recordFailure` (`state.failing = now`); the streak, per-pair and second-run cases. Each survivor, with its effect on the owner's inbox:
- `-stale-key-only-without-advisory`: a stale clone on a day that also reports an advisory repeats the stale entry on every later run (limb (b), "once per differing pair").
- `-reported-key-only-when-in-step`: while the clone is stale, every undispositioned advisory is repeated daily (criterion 3).
- `-marker-only-before-any-report`: once any advisory has been reported, which is the steady state, every failed run adds an entry (limb (a), "one per streak"). Every streak fixture starts from a state with no reported key.
- `-streak-ends-only-on-quiet-recovery`: a recovery that reports an advisory leaves the marker set, so the next streak is silent (limb (a)).
Property to check: each once-only property holds with the sibling condition present. Concretely, (i) stale clone plus an undispositioned advisory, run twice: one stale entry and one advisory entry, then none; (ii) a streak that starts after an advisory was reported: one failure entry for the streak; (iii) a failure, then a recovery that reports an advisory, then a failure: two failure entries. The opposite-polarity mutants are already killed, so the cases are owed only in these directions.

QAF-3 MEDIUM Phase 2
**What an entry says is asserted only in part.** The implementation document names its content ("naming the SHA, the versions, the advisory URL and up to three paths"), and block 23:59Z requires the `inbox-entry` form. Survivors: `qa-entry-names-remote-ref-sha` (with a stale clone, an advisory entry names the remote head rather than the tree actually audited; the first case's SHA match cannot tell them apart because local = remote there); `qa-stale-entry-names-remote-as-read` (the stale entry's "the audit read `<sha>`" names the wrong side; the per-pair case matches both SHAs anywhere in the text); `qa-entry-omits-advisory-url`; and `190:num` (the heading's date becomes `026-11-21T`; `headings()` counts any line starting `## `). Property to check: the advisory entry names the audited SHA when local ≠ remote, and names the advisory URL; the stale entry attributes the audited SHA to local; every added heading matches `^## \d{4}-\d{2}-\d{2} — .+ — FYI$`.

QAF-4 MEDIUM Phase 2
**"A run where every advisory is dispositioned writes only its log line" (the tool's `USAGE`) has no assertion on the state file.** Under `179:>` every quiet run creates or rewrites `reported.json`; the quiet-run case asserts only the inbox. The consequence is small (same content rewritten), but the property is claimed and unasserted, which is the severity floor. Property to check: after a quiet run from no state file, the state file does not exist.

QAF-5 LOW Phase 2
**The bad-argument guard's `startsWith('--')` disjunct is never the sole carrier.** `49:if-false` leaves `node … website /path` accepted as `--website`. The contract is the crontab line devops writes, and a bad argument reaches only `cron.log` (a stated limit), so this is not blocking. Property to check, if the round is open anyway: a bare `website <path>` argument fails with `bad argument`.

**Residue (not findings).** (1) A readable audit that degrades to `advisories 0` would be a quiet run, with no instrument in the tool to see it; register row B-1 reads the count at the first run. (2) The case "does not fail when a dispositioned or reported advisory has left the audit" seeds a state file without `stale`, a shape the tool at `c5508c7` never writes; it passes only because the clone is in step. Not a wrong assertion.

## Blocking-condition register (the chain's; this is its first QA document)

Later stage documents (the deployment record, then any handoff carrying an open row) are authoritative on each row's execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | post-deploy-observable | Criteria 3–5 and 8 under cron's environment: the first scheduled run reads a non-empty audit | Read the first `cron.log` line after install (the line form is shown working in `verification/fix-website-dependency-audit/live-run-c7b6898.txt`) | devops session / none | crontab line installed, `/home/dev/.local/state/website-dependency-audit/` created, and the first 06:43-local run after that | One line `website <local7> (origin/master; remote head <remote7>): advisories N, undispositioned U, newly reported U […]`, with N > 0. The local clone's `origin/master` is `76da25c` now, and its dependency files differ from the seeded `d1bb9b0` only by a removed npm `overrides` block in `package.json` (`git diff --stat d1bb9b0 76da25c -- package.json pnpm-lock.yaml pnpm-workspace.yaml patches`, lockfile unchanged), so N = 81 and U = 0 are predicted unless advisories were published since; U > 0 is correct behaviour, with U entries in `INBOX.md`. One observation refutes. | A `website-dependency-audit failed:` line with one failure entry (the tool works, the environment does not); or `advisories 0` (a degraded audit that looks quiet, which the tool cannot see) | devops-fix-website-dependency-audit | handoff/fix-website-dependency-audit-first-run-2026-11-21.md (reader R1; moved there at 2026-11-21T01:14, the carrier is authoritative on execution state) | Open — carried |

## Assumption Not Checked

This pass assumes that real `pnpm audit --prod --json` output over `76da25c`'s lockfile has the shape the stub's fixture reproduces, and does not test it (every run here was network-isolated by rule; the fixer's and the reviewer's live runs at `d1bb9b0` are the evidence). If false, B-1's first line reads `failed: pnpm audit gave no advisories` or `advisories 0`. Owner: devops, at B-1.

## Phase 2 refresh at `ead3ea1`

**Tree.** `git diff --quiet c5508c7 ead3ea1 -- tools/website-dependency-audit.js tools/website-audit-dispositions.json` exit 0; `git diff --numstat c5508c7 ead3ea1 -- tools/` gives `68 0 tools/websiteDependencyAudit.test.js` only. Record `HEAD` matched `ead3ea1` on the three paths (`git diff --quiet`, exit 0). The fixer's own runs were not network-isolated; mine below were.

**Scope (a round with no production change re-runs only the survivors it closes).** The 23 SURVIVED rows of `verification/fix-website-dependency-audit/qa/mutation-table-sweep-c5508c7.json`, extracted into `verification/fix-website-dependency-audit/qa/mutants-survivors-c5508c7.json` (its id set equals the table's SURVIVED set, checked by node). Because the test diff only adds lines, the 49 kills at `c5508c7` stand.

| Run | Result | Capture |
|---|---|---|
| Suite, `unshare -rn node --test tools/websiteDependencyAudit.test.js` in an export of `ead3ea1` (blobs verified) | 23 tests, 23 pass, **exit 0** | `verification/fix-website-dependency-audit/qa/suite-run-ead3ea1.txt` |
| Survivors, `mutation-run.py --sha ead3ea1` with the same confinement as the sweep (runs delegated to a helper; table read here) | control green, 23 = 23; **14 of 23 KILLED**, all count-checked; 9 SURVIVED | `verification/fix-website-dependency-audit/qa/mutation-table-survivors-at-ead3ea1.json`, `verification/fix-website-dependency-audit/qa/mutation-driver-survivors-at-ead3ea1.txt`, `verification/fix-website-dependency-audit/qa/mutation-rows-survivors-at-ead3ea1.txt` |

**Which case killed each mutant** (`failing_titles`):
- QAF-1: `175:walk-*` and `178:walk-*` by "adds one entry for each of two undispositioned advisories, and none on a second run".
- QAF-2:
  - `-stale-key-only-without-advisory` and `-reported-key-only-when-in-step` by "reports a stale clone and an undispositioned advisory once each when they occur together, naming the audited tree".
  - `-marker-only-before-any-report` by "adds one failure entry for a streak that starts after an advisory was reported".
  - `-streak-ends-only-on-quiet-recovery` by "ends a streak on a recovery that reports an advisory, so the next streak adds its own entry".
- QAF-3:
  - `qa-entry-omits-advisory-url` by the first case.
  - `qa-entry-names-remote-ref-sha` and `qa-stale-entry-names-remote-as-read` by the stale-plus-advisory case.
  - `190:num` by three cases' heading-form check.
- QAF-4: `179:>` by "leaves the inbox unchanged when every advisory is dispositioned".
- QAF-5: `49:if-false` by "fails on a bare argument without its dashes, and writes nothing".

Each case is green at `ead3ea1` and red under its mutant, so it counts as evidence. The new cases are spec-form, and no title carries an ID token. The still-surviving 9 (`60:num`, `60:num:2`, `77:num`, `77:num:2`, `77:num:3`, `171:true:2`, `190:num:2`, `196:num`, `204:num`) keep their dispositions from the table above.

**Effort-final sweep figure.** Of the 72 mutants matching mutant-gen's operators over `tools/website-dependency-audit.js` plus the 12 QA mutants, 63 are killed: 49 at `c5508c7` and 14 at `ead3ea1`. The other 9 are dispositioned as equivalent or without a reader. Excluded: `??`, `?.`, `=>`, comparisons inside template substitutions, and the data file `website-audit-dispositions.json`, which is covered by the review's seed differential instead.

**Findings.** QAF-1, QAF-2, QAF-3, QAF-4 and QAF-5 are closed at `ead3ea1`. The checks that fail if any of them returns are the kill table above and the mutant set `verification/fix-website-dependency-audit/qa/mutants-sweep-c5508c7.json`.

**Verdict: QA Complete at `ead3ea1`**, for the paths `tools/website-dependency-audit.js`, `tools/websiteDependencyAudit.test.js` and `tools/website-audit-dispositions.json`. Any later change to those paths expires it. The `REVIEW` constant and `_review` field moving to `reviewed`, which is the fixer's post-verdict act, changes no behaviour. Register row B-1 stays open, owned by devops. The Assumption Not Checked above stands unchanged for this pass.

## Handoff

QA Complete at `ead3ea1`. To `devops-fix-website-dependency-audit`: install the crontab line and read the first run (B-1). If no devops session is live, the spawn cue goes to `steering-roadmap-hooks`. The fixer moves `REVIEW` and `_review` to `reviewed`.

Earlier handoff, at `c5508c7`: QA Failed at `c5508c7` → `fixer-fix-website-dependency-audit` for QAF-1..QAF-4 (tests only, spec-form, each new or tightened case seen red under its surviving mutant in `verification/fix-website-dependency-audit/qa/mutants-sweep-c5508c7.json`), QAF-5 optional. The re-run after that round covers the survivors it closes (no production change, so no wider sweep). Devops is cued only after a passing verdict.
