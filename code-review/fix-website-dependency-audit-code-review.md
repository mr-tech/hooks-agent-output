---
ID: n/a
Origin: fix-website-dependency-audit
UUID: d9ef268a
Reviewed-At: 9fc299c5c549fe3ecbda1e1b5512012395fbbc33 — repos=agent-output
Status: In Review
Round: 1
Verdict: REJECTED
---

# Code Review: fix-website-dependency-audit

**Plan Reference**: none (fixer route). Scope: `steering/fix-website-dependency-audit-rulings.md`, block "2026-11-20T23:59Z" (determination), with blocks "2026-11-20T23:58Z" (record entry only) and "2026-11-21T00:01Z" (seed per advisory).
**Implementation Reference**: `agent-output/implementation/fix-website-dependency-audit-implementation.md` (record `f073fd6`, `Handoff-At: 9fc299c`)
**Date**: 2026-11-21
**Reviewer**: Code Reviewer (session `code-reviewer-fix-website-dependency-audit`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T00:15 | steering-roadmap-hooks (brief `steering/fix-website-dependency-audit-brief-code-reviewer.md`) | Round 1: review the chain's paths at `9fc299c` | Round 1, REJECTED at `9fc299c` on CR-1 (MEDIUM, severity floor). The append-before-state ordering the implementation document claims has no failing assertion: a mutant that swaps it survives the suite. CR-2 and CR-3 are LOW, routed to steering for scope rulings. The seed is correct on 84/84 entry×version units, and live runs are quiet and report once. Gates this round: the record-write gate refused twice. The first time, a shell-variable scratch path was read as a record path; it was re-issued with literal scratch paths and a Write-tool inbox. The second time, a shell `mv` of my own `.md` capture under `verification/` was refused; its `.txt` replacement was written with the Write tool, and the stray `code-review/live-run-one-key-removed-inbox.md` was left untracked and uncommitted. |

## Scope and criteria assessed (recorded before reading the diff)

From block "2026-11-20T23:59Z" and the two rulings:
1. The audit runs over website `origin/master`'s `package.json` and `pnpm-lock.yaml` through an export, never the shared tree.
2. Each audit entry is joined with the dispositions already made. Only a `module|GHSA` key with a non-empty `how` counts (ruling 00:01Z, plus the fixer's extension to `module@version` keys, reviewed below).
3. Each undispositioned advisory gets one `INBOX.md` entry in the `inbox-entry` form, once, never repeated on later runs while it stays undispositioned.
4. A quiet run writes nothing but its log.
5. An advisory that leaves the audit does not fail the run (common brief, hazard 1). An unreadable audit writes nothing.
6. Nothing posts to Discord or a webhook, no headless agent runs, and `verification/website-deps-review/` is unchanged.
7. The seeded dispositions are the review's own, one `module|GHSA` key per current advisory.

## Tree identity

`9fc299c` is the `Handoff-At`. Files were read with `git show 9fc299c:<path>`, and runs used a `git archive` export of `9fc299c`. Record `HEAD` moved during the review (`26c3cc2` → `83a904f`, commits of chain `fix-trpc-batch-limit`). `git diff --quiet 9fc299c HEAD -- tools/website-dependency-audit.js tools/websiteDependencyAudit.test.js tools/website-audit-dispositions.json` exited 0, so the reviewed paths are unchanged. The website was read only (`rev-parse`, `ls-tree`) and never moved: `origin/master` = `d1bb9b0`.

## Files reviewed

`git diff --stat f943553 9fc299c` over the chain's paths. Production: `tools/website-dependency-audit.js` (new, 139 lines) and `tools/website-audit-dispositions.json` (new). Test: `tools/websiteDependencyAudit.test.js` (new, 12 cases). Plus `verification/fix-website-dependency-audit/*`.

- **`website-dependency-audit.js`.** Read whole. `exportLockfile` makes a `git archive` of the four `EXPORTED` paths into an `mkdtemp` folder, and `main`'s `finally` removes it. `runAudit` judges success by the `advisories` object, not by pnpm's exit code; a timeout or ENOENT gives null stdout, which is rejected. `undispositioned` honours only `dispositions[module|GHSA].how` and merges the versions and paths of advisory objects that share a GHSA. `main` appends to the inbox, then records the keys in state, both only when `fresh.length`. One log line is printed per run. Every throw ends in the module-level catch, which sets exit code 1. No comment lines (`grep -c -E '^\s*(//|/\*)'` = 0).
- **Key-form rule (fixer's extension).** Ruling 00:01Z settles bare-module defaults. The fixer extends it to `module@version` keys on the ruling's own reasoning ("a default written before an advisory existed has not assessed it"). The reasoning does carry over: a version-line key is also keyed by module, not by advisory. And because the seed (below) turns every such key into a `module|GHSA` key, nothing currently dispositioned is lost. Accepted. The ruling's reasoning carries one step further than the fixer took it, to versions installed after the assessment. That is CR-3.
- **`website-audit-dispositions.json`.** 62 keys plus `_about` and `_review`.
- **Test file.** The 12 titles name behaviours, and the ID-token class matches no basename or title (checked by hand, because convention-check SKIPs that check). The fixture dates in `INBOX_HEAD` and the state file are data under the bounded exemption. Record tool tests are camelCase-named (`recordEntrypoints.test.js`, `uatLocalStack.test.js`), and this one conforms. The fixture advisories are real objects: ids 1118728, 1109563 and 1109564 in `verification/018/security/out/pnpm-audit-prod-d1bb9b0.json` have the same module, GHSA, severity, title and findings (Iron Law 5, re-read). The stub `pnpm` refuses wrong arguments and an incomplete export. Expectations are literal. Spec-form; no bug-form test.
- **Inbox entry form.** It has the `## <date> — <author> — FYI` head, a concern line naming the dispositions file by path, the ask, and `**Done here**` / `**Not done**`. The author slot names the tool and crontab, not a session. That is right for a session-less writer: a reply cannot reach a cron job, and the ask names the procedure instead.

**Pattern claim.** The document says the seed script "reproduces the sibling's lookup verbatim". I compared it with `verification/website-deps-review/security/apply-dispositions.js` `lookup`. The `byVersion` find, the bare-module fallback and the `how` throw are identical. The `byGhsa` branch returns one disposition per finding instead of one per advisory, so that split versions can be keyed, and it does not mark keys as used, which the seed does not need. The tool's own join deliberately does not mirror the sibling, because ruling 00:01Z sets those key rules aside. Nothing here duplicates a shared pattern: the sibling is a script, not a module. Its kicked-cohort cron sibling, `statbot/agent-output/tools/kicked-cohort-reinstall-check.js` (`main` catch), also logs failures only, so the estate has no failure-surfacing pattern to mirror (see CR-2).

## Instruments and runs

Provenance: every quantity below comes from the reviewed tool at `9fc299c`, the real `pnpm audit` and the sibling's own key rules. The one process I authored is the seed differential, a second, differently shaped instrument from the fixer's seed script. It joins per installed version and compares field by field, where the seed builds per key. Captures are in `verification/fix-website-dependency-audit/code-review/`.

| Check | Result | Capture |
|---|---|---|
| Seed differential over d1bb9b0's 81 entries | Entry forms 6 `module\|GHSA` / 8 `module@version` / 67 bare across 27 modules, which reproduces the fixer's counts. 84 entry×version units: 68 identical, 16 matched within a version-split key, 0 differ. 62 keys, none outside the audit, no audit key unseeded, all of `module\|GHSA-…` form, none with an empty `how`. | `seed-differential.js`, `seed-differential-out.json` |
| Live run ×2, `env -i HOME PATH=/usr/local/bin:/usr/bin:/bin`, scratch inbox and state | `advisories 81, undispositioned 0, newly reported 0`, exit 0, both runs. No state file. Export folder removed. | `live-run-quiet-9fc299c.txt` |
| Live positive control: same, with `nanoid\|GHSA-mwcw-c2x4-8c55` removed from a copy | Run 1: one entry naming 3.3.6 and 4.0.2, the SHA and both paths; state key written. Run 2: `newly reported 0`, inbox unchanged. | `live-run-one-key-removed-9fc299c.txt`, `live-run-one-key-removed-inbox.txt` |
| Mutant `state-written-before-append` (`mutation-run.py`, export of `9fc299c`) | Applied; control passed; 12 = 12 cases ran; **SURVIVED** | `mutant-state-order.json`, `mutation-table-state-order-9fc299c.json`, `mutation-driver-state-order-9fc299c.txt` |
| Probe of CR-1's discriminating case (inbox path unusable) | Head: exit 1, no state. Mutant: exit 1, state holds the key, so the advisory is never reported | `probe-unwritable-inbox-9fc299c.txt` |
| `convention-check.js --since=f943553` | exit 0; 0 FAIL, 0 CANDIDATE. SKIPs: the three `.js` files ("under a record repository — exempt from every check"), the ID-token/basename check (done by hand, above), and `.json`/`.txt`/`.md` outside its set | in scratch, not committed; reproduces the fixer's `convention-check.txt` |

**The fixer's 18/18 table.** I did not re-run it. Its mutants file was read whole: each guard named in the "Change" section has a mutant. The one property without a mutant is CR-1's.

**Adversarial execution.** Not triggered. The change adds no security boundary or auth gate. Its one effect beyond its own state is an append to an uncommitted, shared `INBOX.md`, which the positive control above drove against a scratch inbox. Its precondition (no `module|GHSA` disposition and no state key) is held by killed mutants `how-required`, `bare-module-key-honoured` and `reported-not-skipped`.

**Contracts crossed.** None. The tool reads `pnpm audit --prod --json` (pnpm 10.28.2 output, verified live) and sends nothing to another service.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`, present (`ls -d` against `/usr/local/bin/hooks/agent-output`; `git cat-file -e 9fc299c:architecture/system-architecture.md` exit 0). It has no statement on record tools or scheduled audits, and the change adds a standalone record tool. **Alignment Status**: ALIGNED.

## TDD Compliance Check

**TDD Table Present**: Fixer route. Red, green and negative controls are given in prose under "Test". There are no Python sources, so `tdd-check.py` does not apply.
**All Rows Complete**: The red run is `red-run.txt` (8/8 `Cannot find module`). The four later cases are each tied to a killed mutant.
**Concerns**: CR-1.

## Findings

### Critical
None.

### High
None.

### Medium

**CR-1 MEDIUM Round 1 Test Coverage**: the claimed append-before-state ordering is unasserted
- **Location:** `tools/website-dependency-audit.js` `main`, the `if (fresh.length)` block (append, then `state.reported[u.key] = now`, then `writeFileSync(opts.state, …)`). The claim is in the implementation document's "Lifetimes" table, rows 1 and 2: "Appending first is deliberate: a duplicate is preferred to a lost report".
- **Class:** a property the implementation document states as deliberate, with no assertion that fails when it is lost. This is the severity floor: MEDIUM, and it blocks hand-off to QA.
- **Enumeration:** I listed by hand every behavioural claim in the document's "Change" section (Lifetimes rows 1–3, export lifetime, Declined work ×2, Irreversible effects precondition) and in the tool's `USAGE` (fixed export set, once-only report, quiet run, ignored keys, unreadable audit), 11 claims in all, and matched each against `mutants.json` and the test titles. 10 have a killed mutant or a covering case. 1 has neither: the ordering, which covers Lifetimes rows 1 and 2. The list cannot see a property the document relies on without stating it.
- **Evidence:** mutant `state-written-before-append` SURVIVED with 12 of 12 cases run. The probe shows its consequence: with an unusable inbox, head keeps no key, but the mutant keeps the key, so the advisory is never reported. That is the one failure the owner's "so a new advisory is read by someone" rules out.
- **Required Action (Minimum):** add one case in which the inbox cannot be written. The run must exit non-zero and leave no state key for the advisory, and a following run with a usable inbox must add exactly one entry. Falsity signature: under `state-written-before-append`, the following run adds 0 entries, so the entry-count assertion fails (it is not a timeout). The fixture property: the inbox must fail for a reason that also holds when the suite runs as root, because a permission bit is not honoured for root. Add the mutant to `verification/fix-website-dependency-audit/mutants.json` and record its kill. No production change is owed.

### Low/Info

**CR-2 LOW Round 1 Operability**: a run that stops serving the audit's purpose is visible only in `cron.log`
- **Location:** the module-level `try/catch` around `main` (the `console.error` and `process.exitCode = 1`), and `DEFAULTS.ref` `'origin/master'` read without a fetch.
- **Class:** a condition under which the scheduled audit stops reporting new advisories leaves no signal anywhere a session reads. The output is an operator-visible signal (its destination is the log).
- **Enumeration:** `grep -c -E "throw new Error|JSON\.parse|readFileSync|appendFileSync|writeFileSync|mkdirSync|spawnSync"` over the tool at `9fc299c` gives 14 failure sites, and all of them end in that catch. Add the stale-ref member: `origin/master` is whatever the website clone last fetched, and the log prints the SHA but never compares it with the remote. A persistent failure (pnpm path, network, a registry change of the audit endpoint, a removed `patches/`) or a stale ref leaves `INBOX.md` silent indefinitely. The predicate cannot see cron not running at all, which leaves no log line. The fixer states both limits itself ("A failed run writes only to `cron.log`, which nobody is prompted to read"; "the tool does not fetch").
- **Required Action:** a scoping ruling, not this round's work. Surfacing a failure or a stale ref in `INBOX.md` widens the 23:59Z specification, which names only undispositioned advisories, and the owner's 23:58Z selection ("record entry only") was made on the advisory question. The stage set has no UAT, so this routes to `steering-roadmap-hooks`. Options for the ruling: (a) one inbox entry when a failure streak begins, recorded in state, and none while it continues; (b) the same for a ref whose `git ls-remote` head differs from the local `origin/master` (read-only, no fetch into the shared clone); (c) accept as stated. Not a blocker for QA.

**CR-3 LOW Round 1 Design**: a disposition is honoured for installed versions it did not assess
- **Location:** `undispositioned`, `const d = dispositions[key]; if (d && d.how) continue;`, the single caller being `main`.
- **Class:** an advisory's disposition is matched by `module|GHSA` alone, so a version (or dependency path) added to the released lockfile after the assessment is treated as assessed.
- **Enumeration:** in `website-audit-dispositions.json` at `9fc299c`, 62 keys; 8 name their versions (the version-split keys, `seed-run.txt`), 54 name none. Example: `nanoid|GHSA-mwcw-c2x4-8c55` is `BUILD 3.3.6; ABSENT 4.0.2`. A release that put nanoid 3.3.x on a path that ships to the browser would produce no entry. The predicate cannot see path changes within an already-assessed version, which no field records. The fixer states the limit ("A new installed version of an advisory that already has a disposition is not reported").
- **Required Action:** a scoping ruling for `steering-roadmap-hooks`. Ruling 00:01Z settled key form only; its reasoning ("a default written before an advisory existed has not assessed it") reads onto versions too. Preferred (structural), if ruled in: each disposition records the versions it assessed (the seed already has them per version), and an installed version outside that set counts as undispositioned. The cost is a reseed and one more field in the `--help` procedure. Minimum: accept as stated. Not a blocker for QA.

## Verdict

**Status**: REJECTED
**Rationale**: criteria 1–7 hold at `9fc299c`. The export is `git archive` only; the key rule is enforced; the entry is written once and not repeated (live, twice); quiet runs write nothing (live); departed advisories do not fail the run; nothing is posted and the excluded paths are untouched; the seed equals the review's dispositions on every unit. The rejection rests only on CR-1's severity floor: the document's own guarantee against a lost report is not held by any test. The fix is one test case plus its mutant record. CR-2 and CR-3 travel to steering and do not hold the tree.

## Required Actions

1. CR-1: add the case and its mutant record per CR-1's Required Action, then hand back for a fix confirmation (a sub-entry of Round 1, scoped to that diff).

## Assumption Not Checked

This review assumes that cron's environment at 06:43 local (network reach to the registry, `HOME` for pnpm's config and store, the `/usr/local/bin` node on `PATH`) lets `pnpm audit` answer as it did under my `env -i` run, and does not test it. If that is false, the first `cron.log` line reads `website-dependency-audit failed:` instead of `advisories 81, …`. Closing it is owned by `devops-fix-website-dependency-audit` at its read of the first scheduled run's log, the chain's end step.

## Next Steps

- `fixer-fix-website-dependency-audit`: CR-1.
- `steering-roadmap-hooks`: scoping rulings on CR-2 and CR-3. The stray untracked `verification/fix-website-dependency-audit/code-review/live-run-one-key-removed-inbox.md` (my capture; the record-write gate refused its shell move) needs removal by someone permitted to.
- After the fix confirmation: QA Phase 2 (`qa-fix-website-dependency-audit`), then devops installs the crontab line and closes the Assumption Not Checked at its first-run read.
