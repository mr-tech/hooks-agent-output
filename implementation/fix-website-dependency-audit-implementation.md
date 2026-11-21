---
ID: n/a
Origin: fix-website-dependency-audit
UUID: d9ef268a
Status: Active
Status-Detail: "Round 1 REJECTED at 9fc299c on CR-1 (one test case); fixed at ed7926d, awaiting the reviewer's fix confirmation; QA Phase 2 is owed (123 production lines); devops installs the crontab line and reads the first run."
Handoff-At: ed7926d — repos=agent-output
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

The temporary export is a second lifetime. It is created by `mkdtemp` and removed in `finally` on every path:
success, git failure, tar failure, pnpm failure and unparseable output. The case "removes the lockfile export after a
readable and after an unreadable run" was red with the removal deleted (mutant `export-not-removed`). There is no
`await`: the tool is synchronous.

**Declined work.**
- An unreadable audit declines the whole run. Nothing is written, and the next daily run reports what it would have.
  The case "writes nothing on an unreadable audit and reports the advisory on the next readable run" follows one
  advisory from the declined run to its report. It is red with the shape guard removed (`advisories-shape-unchecked`).
- An advisory already reported is skipped. Its one entry is already in `INBOX.md`, where the session that processes
  the inbox reads it.

**Irreversible effects.** An append to `INBOX.md` (shared, uncommitted) · route: the tool's `appendFileSync`, after a
readable audit · precondition: the advisory has no `module|GHSA` disposition and no state key · test: "adds exactly
one inbox entry …" and "adds no entry on a second run …".

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
  was never a record document. The stamp gate refused this document's first changelog row, whose time had been typed rather than taken from the clock. The row was rewritten through `record-edit.js` with `2026-11-21T00:09`.

## Handoff

- **SHA under review:** `ed7926d` (record `master`; Round 1 was at `9fc299c`, and `9fc299c..ed7926d` changes only the test file and `mutants.json`). The production diff is `git diff f943553 ed7926d --
  tools/website-dependency-audit.js tools/websiteDependencyAudit.test.js tools/website-audit-dispositions.json`.
- **Reviews:** `code-reviewer-fix-website-dependency-audit`, then QA Phase 2 (`qa-fix-website-dependency-audit`).
  The tool adds 123 production lines (non-blank, `grep -c -v '^\s*$'`), which is 20 or more.
- **Merges:** none. The work is already on the record's `master`; there is no branch and no push. After QA's verdict,
  the `REVIEW` constant and `_review` field go from `pending review at f943553` to `reviewed`.
- **Crontab line proposed for devops**, 06:43 local daily, a minute off :00/:30. The comment follows the form of the
  crontab's other lines:

```
# 2026-11-21 (devops-fix-website-dependency-audit; owner Q2 'yes', steering/website-deps-review-rulings.md 23:44Z; record entry only, steering/fix-website-dependency-audit-rulings.md 23:58Z): daily pnpm audit of website origin/master joined with tools/website-audit-dispositions.json; new undispositioned advisories go to INBOX.md once. Remove when the owner retires the audit.
43 6 * * * cd /usr/local/bin/hooks/agent-output && PATH=/usr/local/bin:/usr/bin:/bin /usr/local/bin/node tools/website-dependency-audit.js --pnpm /home/dev/.local/share/pnpm/pnpm >> /home/dev/.local/state/website-dependency-audit/cron.log 2>&1 # fix-website-dependency-audit
```

  The log folder must exist before the first run, or the redirect fails: `mkdir -p
  /home/dev/.local/state/website-dependency-audit`. The tool creates it only once it writes state.
- **Stated limits.** The audit reads `origin/master` as the local website clone last fetched it; the tool does not
  fetch. A failed run writes only to `cron.log`, which nobody is prompted to read. The registry's rate limits were not
  measured. A new installed version of an advisory that already has a disposition is not reported.

## Changelog

| Date | Change |
|---|---|
| 2026-11-21T00:09 | Created. Tool, test and seeded dispositions committed at `afb3ff2` and `9fc299c`; 18/18 negative controls killed; handed off at `9fc299c`. |
| 2026-11-21T00:18 | Code review Round 1 REJECTED at `9fc299c` on CR-1 (`code-review/fix-website-dependency-audit-code-review.md`, cd93a06). Fixed at `ed7926d`: one case for an unwritable inbox, with the reviewer's state-order mutant added; 13/13 green, 19/19 controls killed. Handoff-At moved to `ed7926d`. |
