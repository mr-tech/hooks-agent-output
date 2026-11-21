---
ID: n/a
Origin: fix-website-dependency-audit
UUID: d9ef268a
Status: Active
Status-Detail: "Code review APPROVED at c5508c7 (code-review/fix-website-dependency-audit-code-review.md, bf39906). QA Phase 2 is owed (179 production lines); then devops installs the crontab line and reads the first run. REVIEW and _review stay at pending review until QA's verdict."
Handoff-At: c5508c7 — repos=agent-output
Origin-Chain: none
---

# fix-website-dependency-audit — implementation

## Scope statement

The scoping determination is `steering/fix-website-dependency-audit-rulings.md`, block "2026-11-20T23:59Z — scoping
determination: fixer chain in the shared record repository". It was relayed by `steering-roadmap-hooks` in
`steering/fix-website-dependency-audit-brief-fixer.md` and in the common part
`steering/fix-website-dependency-audit-brief-common.md`. Route: the owner answered "yes" to Q2,
`steering/website-deps-review-rulings.md` block "2026-11-20T23:44Z". He then selected **record entry only**, block
"2026-11-20T23:58Z" of the chain's rulings file.

> the audit runs over website `origin/master`'s `package.json` and `pnpm-lock.yaml` (an export, never the shared
> tree), joins each entry with the dispositions already made, and for each entry with no disposition appends one
> entry to `/usr/local/bin/hooks/agent-output/INBOX.md` in the `inbox-entry` skill's form — once per advisory, never
> repeated on later runs while it stays undispositioned; a quiet run writes nothing but its log. Daily, at a minute
> off :00/:30.

Paths: `tools/website-dependency-audit.js` with `tools/websiteDependencyAudit.test.js`,
`tools/website-audit-dispositions.json`, this document and `verification/fix-website-dependency-audit/`. Excluded:
any Discord or webhook post, any headless agent run, audits of the other repositories, and changes to
`verification/website-deps-review/`.

**Ruling taken during the run.** Block "2026-11-21T00:01Z" settles a question this session raised as BLOCKED
(message to `steering-roadmap-hooks`, id `d8f6f05a`). Its ruling: **option 1**. The dispositions file is seeded with
one `module|GHSA` key per current advisory. No bare module defaults are carried over, and the review's file stays
unchanged.

## Entry Conditions

| Condition | Value |
|---|---|
| Scoping determination | `steering/fix-website-dependency-audit-rulings.md` block "2026-11-20T23:59Z", relayed in the fixer brief |
| Bounded scope statement | quoted above, with its paths and exclusions |
| Fix branch | None. This chain builds in the shared record repository on `master`, over the paths the block enumerates (brief) |
| Record on the mechanism | `verification/website-deps-review/security/apply-dispositions.js` and `dispositions.json` beside it, named as the reuse in the block. `security/closed/website-deps-review-security-audit.md` lines 92 and 209 give the audit command and the aim. The block's estate search found no existing audit runner. No `architecture/` entry covers record tooling for the audit |
| Base | `f943553` (record `master` at the start of the work) |

## Diagnosis

This is a new capability, so there is no defect cause. The instruments that fixed the tool's design:

- **The audit runs over a bare export.** `git -C website archive origin/master package.json pnpm-lock.yaml
  pnpm-workspace.yaml patches` was extracted to a scratch folder, and `pnpm audit --prod --json` was run there
  (pnpm 10.28.2, the version `package.json` names in `packageManager`). Result: exit 1, with 81 advisory entries and
  metadata `{"low":8,"moderate":22,"high":50,"critical":4}`, the same as `verification/018/security/out/` at
  `d1bb9b0`. No `node_modules` is needed. pnpm exits 1 whenever it finds advisories, so the tool judges success by
  whether the output carries an `advisories` object, not by the exit code. `pnpm-workspace.yaml` (its
  `patchedDependencies`) and `patches/` are exported with the lockfile, so the audit sees the same configuration the
  website installs with.
- **Bare module defaults would hide new advisories.** A node join of the d1bb9b0 audit against the review's
  `dispositions.json` gave: 6 entries match a `module|GHSA` key, 8 a `module@version` key, and 67 a bare module
  default spread over 27 packages. Under `apply-dispositions.js`'s key rules, a new GHSA in any of those 27 packages
  would count as dispositioned. Following the ruling above, the tool honours only a `module|GHSA` key with a
  non-empty `how`. The ruling's reasoning, "a default written before an advisory existed has not assessed it",
  applies equally to a `module@version` key, so neither form dispositions an advisory. `--help` states this rule.
- **Mirroring the sibling.** The join's lookup is not shared with `apply-dispositions.js`. That file is a script, not
  a module, and its folder is excluded from change. Its key rules are also the very ones the ruling sets aside for
  this tool. The seed script (`verification/fix-website-dependency-audit/seed-dispositions.js`) reproduces the
  sibling's lookup verbatim, so the seeded dispositions are exactly the review's.
- **Seeding.** `seed-run.txt`: 81 entries gave 62 keys, which equals the 62 distinct GHSA ids in the 018 summary.
  Every key has a non-empty `how`, and every key has the `module|GHSA` form. In 8 advisories the installed versions
  take different dispositions: `form-data` ×2, `nanoid` ×4 and `ws` ×2, e.g. nanoid 3.3.6 is BUILD and 4.0.2 is
  ABSENT. For those, `disp`, `ships` and `how` name each version.
- **The cron environment.** Under `env -i HOME=/home/dev PATH=/usr/bin:/bin`, the pnpm shim fails with `exec: node:
  not found` (exit 127). The tool exits 1 and writes nothing. With `PATH=/usr/local/bin:/usr/bin:/bin` the run is
  quiet and exits 0 (`live-run-cron-env.txt`). The crontab line therefore sets `PATH`.

**Residue.** None. Nothing has run in production. The live runs (`live-run-scratch-inbox.txt`,
`live-run-cron-env.txt`) wrote to a scratch inbox and a scratch state file. The record's `INBOX.md` was never
written: every run passed `--inbox` pointing at the scratch file.

## Change

- `tools/website-dependency-audit.js` (new, 123 non-blank lines). It exports the four files from the website's
  `origin/master` with `git archive` into a temporary folder and removes that folder on every exit path. It runs
  `pnpm audit --prod --json` there and joins each advisory against `module|GHSA` keys. Each undispositioned advisory
  not yet in the state file gets one inbox entry, in the `inbox-entry` form, `FYI`, naming the SHA, the versions,
  the advisory URL and up to three paths. The state file is written afterwards. Every run prints one log line. An
  unreadable audit, a git failure or a bad argument exits 1 and writes nothing. `--help` prints the procedure for
  adding a disposition. Its head carries `const REVIEW = 'pending review at f943553'`. The comment gate admits no
  comment for the marker, which is why it is a constant (precedent:
  `implementation/closed/fix-hooks-record-shared-engine-implementation.md`, "Review marker").
- `tools/websiteDependencyAudit.test.js` (new, 12 cases).
- `tools/website-audit-dispositions.json` (new, 62 keys plus `_about`, and `_review: "pending review at f943553"`).
- `verification/fix-website-dependency-audit/`: the seed script and its run, red and green runs, the mutants and kill
  table, live runs, and the convention check.

**State file.** `~/.local/state/website-dependency-audit/reported.json` (default; `--state` overrides it). It sits
outside the repository, like the kicked-cohort checker's state beside it. It is runtime state, not a record path.
Deleting it makes the next run report every undispositioned advisory once more.

**Lifetimes.** A state-file key is written when its advisory is reported and is never removed by the tool.

| Exit between acquiring and releasing | Disposition |
|---|---|
| Inbox append throws (before any key is written) | No key is written. The next run reports the advisory again; nothing is lost |
| State write throws (after the append) | The inbox has the entry but no key was kept. The next run repeats the entry once. Appending first is deliberate: a duplicate is preferred to a lost report. The case "keeps no reported key when the inbox cannot be written, and reports the advisory on the next run" holds this order: it is red under mutant `state-written-before-append` (CR-1), at ed7926d |
| The advisory is later dispositioned, or leaves the audit | The key stays. It is ignored, because only keys of currently undispositioned advisories are read (case "does not fail when … has left the audit") |

**Failure-streak marker** (`state.failing`, CR-2 limb (a)). It is set when a streak's first failure has appended its inbox entry, and released by the next run that succeeds.

| Exit between acquiring and releasing | Disposition |
|---|---|
| Further failed runs | The marker holds; no entry is added. Red under `streak-guard-removed` and `streak-marker-not-set` (case "adds one inbox entry when a streak of failed runs starts, and none for the rest of the streak") |
| A run succeeds | **Released**: `delete state.failing`, and the state is written even when the run has no entries. Red under `streak-not-ended` and `state-not-written-on-recovery` (case "adds a new failure entry for a streak that starts after a run succeeded") |
| The failure entry's append throws (inbox unwritable) | No marker is set, so the next failure tries again. The run exits 1 with both errors in the log. Since c5508c7 both writers go through one function, `persist` (append, then write state). The order is held by the case "starts no streak when the failure entry cannot be written, and adds it on the next failure" (CR-4). It is red under the reviewer's `failure-state-written-before-append` applied to c7b6898 (`red-run-cr4-reviewer-mutant.txt`), and under `failure-state-written-before-persist` and `state-written-before-append` (the order inside `persist`) at c5508c7 |
| A bad argument | It fails before any path is known, so no entry and no marker are written; only the log has it (case "fails on an argument it does not know") |
| The state file cannot be read | `recordFailure` cannot read it either; the failure reaches only the log. Stated limit below. The state is written by `rename` from a temporary file, so the tool itself never leaves a partial one |

**Stale-pair keys** (`state.stale["<local>..<remote>"]`, CR-2 limb (b)). A key is written when its pair's entry is appended, and never removed: a pair of SHAs cannot recur once the clone is fetched. Red under `stale-pair-unguarded` and `stale-pair-not-kept` (case "adds one entry per pair …"), and under `stale-without-difference` (8 cases) when equal SHAs are reported. The check is `git ls-remote <remote> refs/heads/<branch>`, read only. The case asserts that the clone's `refs/remotes/` and its `origin/master` are unchanged. The live run hashes `git for-each-ref` of the real website clone before and after: `bdc949b5896e06cf` both times (`live-run-c7b6898.txt`). An empty ls-remote answer fails the run (`remote-head-empty-accepted`, case "fails … when the remote has no head for the released branch").

The temporary export is a second lifetime. It is created by `mkdtemp` and removed in `finally` on every path:
success, git failure, tar failure, pnpm failure and unparseable output. The case "removes the lockfile export after a
readable and after an unreadable run" was red with the removal deleted (mutant `export-not-removed`). There is no
`await`: the tool is synchronous.

**Declined work.**
- A failed run declines the whole audit and reports no advisory. Since c7b6898 the first failure of a streak appends
  one failure entry (limb (a)); the next run that succeeds reports what the failed runs would have. The case
  "writes nothing on an unreadable audit and reports the advisory on the next readable run" follows one advisory from
  the declined run to its report. It is red with the shape guard removed (`advisories-shape-unchecked`).
- A pair of differing SHAs that was already reported is not reported again. Its entry is already in `INBOX.md`.
- An advisory already reported is skipped. Its one entry is already in `INBOX.md`, where the session that processes
  the inbox reads it.

**Irreversible effects.** An append to `INBOX.md` (shared, uncommitted) · route: the tool's `appendFileSync`, after a
readable audit · precondition: the advisory has no `module|GHSA` disposition and no state key · test: "adds exactly
one inbox entry …" and "adds no entry on a second run …". The same append carries a failure entry (precondition: no
`state.failing`; tests: the two streak cases) and a stale-pair entry (precondition: local ≠ remote and the pair not
in `state.stale`; test: "adds one entry per pair …").

## Test

- **Red run** (`red-run.txt`): `node --test tools/websiteDependencyAudit.test.js` before the tool existed. 8 tests, 0
  pass, 8 fail (`Cannot find module`), exit 1. Those 8 cases state the brief's four properties: one entry per
  undispositioned advisory, no repeat, a quiet run writes nothing, and a departed advisory does not fail the run.
  They also cover the bare-key and empty-`how` rules, the unreadable audit and the export's removal.
- **Green run** (`green-run.txt`, at `9fc299c`): 12 tests, 12 pass, exit 0. Four cases were added after the red run:
  the blank-line separator, a missing ref, `--help`, and an unknown argument. Each was seen red under the control
  listed below.
- **Negative controls** (`mutants.json`, `mutation-table-9fc299c.json`, `mutation-driver-9fc299c.txt`):
  `mutation-run.py` on `9fc299c`, each run in its own `git archive` export, never in the shared tree. Result: 18 of 18
  KILLED, with test counts checked (12 = 12). The failing case for each:

| Mutant | Guard or value | Case that went red |
|---|---|---|
| how-required | `d && d.how` | treats a disposition with an empty assessment as no disposition |
| bare-module-key-honoured | only `module\|GHSA` read | treats a bare module key or a version-line key as no disposition |
| reported-not-skipped | state filter | adds no entry on a second run |
| quiet-run-appends | `if (fresh.length)` | leaves the inbox unchanged when every advisory is dispositioned (and 2 more) |
| advisories-shape-unchecked | `advisories` object check | writes nothing on an unreadable audit … |
| git-exit-unchecked | `check()` exit guard | fails naming git when the released ref does not exist |
| export-not-removed | `finally` removal | removes the lockfile export … |
| lead-without-newline-single / lead-with-newline-none | separator choice, both arms | separates the entry by a blank line … / adds exactly one inbox entry … |
| versions-not-merged | per-GHSA merge | adds exactly one inbox entry …, naming every installed version |
| export-omits-{package-json, lockfile, workspace, patches} | each member of `EXPORTED` | 9 cases each (the stub `pnpm` refuses an export that lacks any of the four) |
| help-not-handled | `--help` branch | prints the procedure … on --help |
| unknown-argument-accepted | bad-argument throw | fails on an argument it does not know |
| state-dir-not-made | `mkdirSync` of the state folder | 6 cases |
| absent-state-unhandled | missing state file | 9 cases |
| state-written-before-append (CR-1, the reviewer's mutant, added at ed7926d) | inbox append before the state write | keeps no reported key when the inbox cannot be written, and reports the advisory on the next run |

**Round 1 fix (CR-1).** One case was added at ed7926d. The inbox path is a directory, so the read and the append fail with `EISDIR`, which holds for root too; the run must exit non-zero with no key for the advisory, and the next run, with a usable inbox, adds exactly one entry. Green: 13/13, exit 0 (`green-run.txt`). Negative controls at ed7926d: 19 of 19 KILLED, counts checked 13 = 13 (`mutation-table-ed7926d.json`, `mutation-driver-ed7926d.txt`). No production change.

**CR-2 limbs (a) and (b)** (steering block "2026-11-21T00:19Z"; production change at c7ef844 and c7b6898).
- Red run (`red-run-limbs.txt`): the new test file against `ed7926d`'s tool, in a scratch copy. 16 tests, 13 pass,
  3 fail, exit 1. The 3 that fail are the streak case, the streak-after-success case and the per-pair case. A first
  attempt at this red run was discarded: its test helper made the stale commit with `git push` to the clone's own
  origin URL, which also moved the clone's `refs/remotes/`. The helper now has the bare origin fetch from the clone.
- Existing cases changed: "fails naming git when the released ref does not exist" now asserts that no advisory is
  reported, not that the inbox is untouched, because a failure writes its streak entry. The unreadable-audit case
  likewise counts only the advisory entry that the next run adds.
- One case was added beside the limbs: a remote with no head for the branch fails the run.
- Green (`green-run.txt`, at c7b6898): 17/17, exit 0.
- Negative controls: at c7ef844, 28 of 29 KILLED (`mutation-table-c7ef844.json`). The survivor,
  `state-defaults-dropped`, removed the `{ reported: {}, stale: {} }` default when an existing state file is read. No
  case discriminates it, since every state file the tool writes already carries both keys, so the default was
  removed from the code (c7b6898) rather than kept. At c7b6898: 28 of 28 KILLED, all counts checked 17 = 17
  (`mutation-table-c7b6898.json`, `mutation-driver-c7b6898.txt`). The old mutants whose sites moved
  (`quiet-run-appends`, `state-dir-not-made`, `absent-state-unhandled`, `state-written-before-append`) were re-pointed
  at the new code. The ten new ones are named in the lifetime tables above, together with `failure-not-recorded`
  (the `recordFailure` call; both streak cases go red).
- Live run (`live-run-c7b6898.txt`), in the cron environment against a scratch inbox: `website d1bb9b0 (origin/master;
  remote head d1bb9b0): advisories 81, undispositioned 0, newly reported 0`, exit 0, the scratch inbox unchanged at
  16 bytes, and the website clone's refs unchanged.

**CR-4** (reviewer's sub-entry at 9a61b8a): the failure writer lacked a case holding append-before-state. I did both of
the reviewer's options. Structurally, `persist(opts, entries, state)` appends (when there are entries) and then writes
state, and both `audit` and `recordFailure` call it. A recovery with no entries still writes state. The minimum: one
new case, in which an unreadable audit meets an inbox that is a directory (`EISDIR`, which also holds for root), and
the next failure, with a usable inbox, adds exactly one failure entry. At c7b6898 under the reviewer's mutant, 17 of
18 pass and the new case fails (`red-run-cr4-reviewer-mutant.txt`). At 5b41d04, 29 of 30 controls were killed. The
survivor was `quiet-run-appends`, whose guard now sits inside `persist`, where only a recovery with no entries
reaches it. The recovery case now asserts the inbox is byte-identical across the successful run (c5508c7). At
c5508c7: green 18/18, exit 0; 30 of 30 KILLED, counts checked 18 = 18 (`mutation-table-c5508c7.json`,
`mutation-driver-c5508c7.txt`). `mutants.json` adds `failure-state-written-before-persist` and
`audit-state-written-before-persist`.

- **Invented values.** The audit JSON is made up of real advisory objects from
  `verification/018/security/out/pnpm-audit-prod-d1bb9b0.json` (ws GHSA-3h5v-q93c-6h6q and nanoid
  GHSA-mwcw-c2x4-8c55, both version entries), trimmed to the fields the tool reads. They reach the tool through a stub
  `pnpm` that prints them. If the fake were wrong, the live run against the real `pnpm audit` would fail to parse, or
  report advisories the seed covers. The live run did neither: `advisories 81, undispositioned 0, newly reported 0`
  (`live-run-scratch-inbox.txt`). The website is stood in for by a temporary git repository, read through the real
  `git archive`.
- No time-based test.

## Verification

- **Existing tests.** The record's standing `node --test` files do not name these paths (block 23:59Z: `git grep`
  exit 1). The new file: 12/12, exit 0.
- **Build.** None. The record has no build, and no package-manager operation was run, so there is no lockfile to diff.
- **Lint and conventions.** `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/agent-output
  --since=f943553` (`convention-check.txt`): 0 FAIL, 0 CANDIDATE, exit 0. Two lines are SKIPs and so unchecked: "under
  a record repository — exempt from every check" for the tool, its test and the seed script, and the ID-token check
  ("states an ID-token class this checker does not implement verbatim"). The record has no eslint config, so lint is
  unchecked. Comment lines in the three `.js` files: `grep -c -E '^\s*(//|/\*)'` gives 0 for each.
- **Record check.** `node tools/check-repo.js`: exit 1 with 15 failures, none in a file this chain wrote. 14 LINKS are
  in `verification/fix-trpc-batch-limit/scoping/sweep.md` and 1 HEADING-STAMP is in
  `verification/018/planning/m2-tsconfig/README.md`. `INBOX.md` already names both
  (`grep -c "m2-tsconfig\|sweep.md"` gives 3).
- **Rounds disclosed.** One live-run command was refused by `record-write-gate-hook`. It read `$S/INBOX.md`, a
  shell-variable path to the scratch inbox, as a record document inside the repository. The scratch inbox was then
  created with the Write tool, and the run was issued with literal absolute paths under the scratchpad. The target
  was never a record document. The stamp gate refused this document's first changelog row, whose time had been typed rather than taken from the clock. The row was rewritten through `record-edit.js` with a stamp taken from the clock.

## Handoff

- **SHA under review:** `c5508c7` (record `master`). Round 1 was at `9fc299c`; CR-1 was confirmed at `ed7926d` and CR-2
  at `c7b6898`. `c7b6898..c5508c7` carries CR-4. The production diff is `git diff f943553 c5508c7 --
  tools/website-dependency-audit.js tools/websiteDependencyAudit.test.js tools/website-audit-dispositions.json`.
- **Reviews:** `code-reviewer-fix-website-dependency-audit`, then QA Phase 2 (`qa-fix-website-dependency-audit`).
  The tool adds 179 production lines (non-blank, `grep -c -v '^\s*$'`), which is 20 or more.
- **Merges:** none. The work is already on the record's `master`; there is no branch and no push. After QA's verdict,
  the `REVIEW` constant and `_review` field go from `pending review at f943553` to `reviewed`.
- **Crontab line proposed for devops**, 06:43 local daily, a minute off :00/:30. The comment follows the form of the
  crontab's other lines:

```
# 2026-11-21 (devops-fix-website-dependency-audit; owner Q2 'yes', steering/website-deps-review-rulings.md 23:44Z; record entry only, steering/fix-website-dependency-audit-rulings.md 23:58Z): daily pnpm audit of website origin/master joined with tools/website-audit-dispositions.json; new undispositioned advisories, the start of a failure streak and a clone behind its remote go to INBOX.md once each. Remove when the owner retires the audit.
43 6 * * * cd /usr/local/bin/hooks/agent-output && PATH=/usr/local/bin:/usr/bin:/bin /usr/local/bin/node tools/website-dependency-audit.js --pnpm /home/dev/.local/share/pnpm/pnpm >> /home/dev/.local/state/website-dependency-audit/cron.log 2>&1 # fix-website-dependency-audit
```

  The log folder must exist before the first run, or the redirect fails: `mkdir -p
  /home/dev/.local/state/website-dependency-audit`. The tool creates it only once it writes state.
- **Stated limits.**
  - The audit reads `origin/master` as the local website clone last fetched it, and never fetches. A difference from
    the remote head is reported once per pair (limb (b)).
  - A failure reaches the inbox once per streak (limb (a)). The exceptions reach only `cron.log`: a bad argument in
    the crontab line, an unreadable state file, and an inbox that cannot be written.
  - The registry's rate limits were not measured.
  - CR-3, accepted by steering block 00:19Z: a disposition holds for every installed version of its module under its
    GHSA, so a new version line of an assessed advisory is not reported.

## Changelog

| Date | Change |
|---|---|
| 2026-11-21T00:09 | Created. Tool, test and seeded dispositions committed at `afb3ff2` and `9fc299c`; 18/18 negative controls killed; handed off at `9fc299c`. |
| 2026-11-21T00:18 | Code review Round 1 REJECTED at `9fc299c` on CR-1 (`code-review/fix-website-dependency-audit-code-review.md`, cd93a06). Fixed at `ed7926d`: one case for an unwritable inbox, with the reviewer's state-order mutant added; 13/13 green, 19/19 controls killed. Handoff-At moved to `ed7926d`. |
| 2026-11-21T00:30 | CR-1 confirmed closed by the reviewer at `ed7926d` (f7849cf). CR-2 limbs (a) failure-streak entry and (b) stale-pair entry, per steering block 00:19Z: red 3 of 16 at `ed7926d`'s tool; done at c7ef844 and c7b6898; 17/17 green; 28/28 controls killed at c7b6898 (one undiscriminated default removed after it survived at c7ef844); live run quiet with the clone's refs unchanged. Handoff-At moved to `c7b6898`. |
| 2026-11-21T00:41 | CR-2 confirmed at `c7b6898` (reviewer 9a61b8a); CR-4 fixed: a shared `persist` writer and the unwritable-inbox failure case at 5b41d04; the recovery case tightened at c5508c7 after `quiet-run-appends` survived; 18/18 green, 30/30 controls killed. Handoff-At moved to `c5508c7`. |
| 2026-11-21T00:43 | Code review APPROVED at `c5508c7` (reviewer bf39906); the reviewer sent steering the QA Phase 2 spawn cue. |
