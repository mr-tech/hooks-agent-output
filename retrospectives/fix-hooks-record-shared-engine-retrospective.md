---
ID: n/a
Origin: fix-hooks-record-shared-engine
UUID: 2b33b8c9
Status: Active
---

# Retrospective: fix-hooks-record-shared-engine

**Plan Reference**: none (fixer chain). The chain source is `implementation/closed/fix-hooks-record-shared-engine-implementation.md` (ID, Origin and UUID inherited from it). The scope is in `steering/record-tools-shared-engine-rulings.md`.
**Date**: 2026-11-10
**Retrospective Facilitator**: retrospective (`retrospective-fix-hooks-record-shared-engine`, a subagent of `steering-cleanup-hooks`)

## Changelog
| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-10T09:35 | steering-cleanup-hooks (spawn brief) | Retrospective of the closed fixer chain | Written from the documents, commits and captures. Cost readout taken. Value delivered: YES. |

## Summary

**Corpus**. This retrospective can read the following:
- the three closed stage documents;
- the rulings file;
- the three briefs in `steering/record-engine-briefs/`;
- the cleanup record `steering/cleanup-2026-11-10.md`;
- the captures under `verification/fix-hooks-record-shared-engine/`;
- the record's git history (`git log`, `git show --stat`, `git diff --numstat`) and a live `git ls-remote`;
- `TODO.md`;
- `architecture/system-architecture.md` and `~/.claude/agents/record-tools-architecture.md`;
- the `cc-usage.py` readout.

No roadmap document exists: `roadmap/` holds only `.gitkeep`, so there is no roadmap to cite.

It cannot read the following:
- the content of any SendMessage, including the fixer's `BLOCKED:` (msg 6680fbac) and every hand-off;
- session transcripts;
- what the helper subagents of QA did beyond their captures;
- any ruling or correction given in conversation and not written down;
- whether a stage ran a check it does not record.

Everything outside the corpus is unverifiable-by-construction here, not refuted.

**Value Statement**: no plan, so there is no value statement. The scope statement is the owner's words: "Do what's necessary to make the record healthy." (rulings, 08:53Z block). The bounded form is "`node tools/check-repo.js` exits 0 on this record", which the fixer brief states.

**Value Delivered**: YES.
- `node tools/check-repo.js` exits 0 at my read (09:35Z): "PASS — no new failures (256 baselined)."
- The baseline holds 256 entries (`grep -c '"check"' tools/check-repo-baseline.json`).
- QA criterion 2 shows that exit 0 means a sound record, not a blind check: the check still catches 9 of 9 planted defects.

**Implementation Duration**: from the owner's opening word (08:53Z) to the QA refresh PASS at 0f09e6c (commit 09:29:53Z) and the push (09:31Z) is about 38 minutes. The fixer started at 08:55Z (rulings, 09:32Z block). There is no UAT.

**Overall Assessment**: a well-gated small chain. The dry measurement up front turned a scoping estimate of 26 failures into a measured 262 before anything was committed. Code review caught a false premise that steering had planted. QA's mutation sweep caught a test gap that review had passed. Every one of these process facts was lodged in the round it happened.

The weaknesses:
- steering took two premises from prose and did not check them at the mechanism;
- steering's closure was not atomic;
- convention checking is switched off for record repositories, so two stages hand-substituted greps for it.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

**Went well**

- **Measure before you commit.** The fixer brief made a dry measurement the first deliverable, with "stop and `BLOCKED:` on anything else you would baseline". The measurement found 262 failures against the 26 the scoping had in hand. 252 of them were pre-012 legacy, because the engine has no `FIRST_CHECKED_CHAIN` omission. The scoping determination had flagged that question as unread ("Whether the engine has an equivalent is unread"). It also found 2 strict-YAML failures, which the old checker could not see. The `BLOCKED:` on those two came back answered within minutes (fixer changelog 09:05 row; rulings 08:58Z block). No baseline entry was taken without a ruling.
- **The fixer departed from steering's guidance on evidence.** Steering's guidance named `duplicateBasenameExemptDirectories` for the 22 probe-folder names. The measurement showed the engine already allows names shared only across `verification/` folders, and that an unused exempt directory would itself fail as stale. The fixer declined the guidance and recorded why (implementation, Diagnosis). This is the brief's "design choices inside the scope are yours" working as intended.
- **The instruments were independent in shape, not just in author.** The baseline's class membership was checked three ways:
  - by the fixer's generator using the old checker's `chainOf`;
  - by the reviewer's basename-prefix classifier, with a positive control;
  - by QA's Leg B, a copy of the old checker dumping its own 83 omitted files.

  Each instrument carries its own control. This is the claims.md rule ("agreement is evidence only where instruments differ in shape") applied as written.
- **The briefs listed hazards as candidates.** The QA brief turned "exits 0 because the record is sound" into a planted-defect requirement, and that became QA criterion 2. The fixer brief's "Not checked by this brief" list named exactly the items that turned out material: the legacy omission, the index format, and the count of new failures.
- **Errors were lodged in the round.**
  - Steering's "no remote" error has a dated reconcile note (rulings 09:11Z) that names who found it.
  - The reviewer recorded that its own citations broke the check (CR sub-entry 1.1).
  - The fixer recorded that its first red run was overwritten in place and why.
  - The fixer recorded the five `/tmp` directories that run left, and their removal by literal path.
  - Steering lodged its closure error for this retrospective (rulings 09:32Z block).
- **The QA gate found what review passed.** Code review enumerated test titles against their assertions (CR-2). QA's mutation sweep enumerated settings against assertions. Two settings with a stated purpose, `documentRules` and `releaseJoinExemption`, survived 14 of 14 tests (QAF-1). The fix was test-only. Review's scoped check (sub-entry 1.2) and QA's re-run both reddened the three survivors with different instruments. The loop from QA Failed to PASS took 09:21Z to 09:28Z (commits 7712cb3 → 4110770).

**Didn't go well**

- **Steering took mechanism facts from prose.**
  - The scoping determination and the code-reviewer brief said `~/.claude/tools` "has no remote". That wording came from the statbot entrypoint's error text, not from `git remote -v` (reconcile note, rulings 09:11Z).
  - The fixer then copied the same text into both new entrypoints and the README, unchecked (implementation, CR-1 paragraph: "I copied it unchecked").
  - The global rule this breaks is in `~/.claude/CLAUDE.md` § "A convention file is prose about the system, not the system".

  The false premise moved through three documents and two source files before review stopped it. The cost was one review sub-round and four text corrections.
- **Steering's closure was not atomic.**
  - At 6cde776 the code-review and QA documents were moved into `closed/` with `Status: In Review` and `Status: QA Complete` (`git show 6cde776:<path> | grep ^Status:`), while only the implementation document's Status changed (`git show --stat 6cde776`: 0 lines changed in the other two).
  - 1e3ba46 completed the closure 36 seconds later.

  Steering's own account is that "the closure script stopped on its own check after the first document and the shell went on to move and commit all three" (rulings 09:32Z). So a compound shell line carried on past a failed step.
- **A whole-record test case is coupled to every other session's writes.**
  - The reviewer's own document cited two paths that do not resolve (CR sub-entry 1.1). That made `node tools/check-repo.js` exit 1, and the fixer's suite went 13/14.
  - QA saw the same state at f824d3d (12/13).

  The case is a deliberate statement of scope (implementation, Test). Even so, the reviewer committed and handed off a document that failed the record check. The lifecycle skill already requires `check-repo.js` to run after a stage's last write and before delivery (SKILL.md § Delivering Your Report). Whether the reviewer ran it before the hand-off is unverifiable-by-construction: its document does not say.
- **Convention checking does not reach record tools.** `convention-check.js … --since=7b4419a` SKIPs every file under a record repository ("exempt from every check"). The fixer and the reviewer each hand-ran a comment-line grep as a substitute, each with a stated blind spot. Test naming for the record's tests has no stated convention at all: QA residue, CR-4, now `TODO.md` § "The record tools' tests have no stated naming convention".
- **The stage start was recorded late.** The fixer started at 08:55Z, and the rulings file records that only in its 09:32Z closure block ("Start recorded late").
- **The cleanup record states a push ahead of the act.**
  - Its final health table (commit f120055, 09:33:25Z) says the index was "Rebuilt on the new engine and pushed after this record's commit".
  - At 09:35Z, `git ls-remote origin master` returns `1611473`. Local `HEAD` is `f120055`, and 183c5af is not an ancestor of `origin/master` (`git merge-base --is-ancestor`, exit 1).

  The five closure and index commits after 1611473 were not on origin at my read. The push may follow this retrospective. This is a claim written in the past tense before the act, not a failed act.

## Testing by Hand (QA and UAT: what ran by hand, its cost, how it could run unattended)

There is no UAT. Where the record shows per-segment time, it is from changelog stamps; tokens are per session only (§ Cost).

| Segment | What ran by hand | Record of its cost | Unattended form |
|---|---|---|---|
| Fixer dry measurement | A scratch entrypoint against the record, three variants, with failures grouped by `classify-engine-failures.js` | Within 08:55Z–09:05Z | Already scripted (`dry-entrypoint-check.js`, `classify-engine-failures.js`, committed). A one-off for a migration, so no further runner is worth building. |
| Old vs new `--status` byte-identity and `INDEX.md` format diff | Run three times, by the fixer, the reviewer and QA, each in its own detached worktree. QA's first attempt compared clones at different HEADs and had to be redone (QA § Criterion 4). | Not separable | A migration-time comparison. It is now spent, because the old tools are gone from `HEAD`. Not worth a runner. |
| Review probes (`cr2-probe-*`, `qaf1-probe-*`) | One-token edits to `SETTINGS` and the baseline in a worktree, restored, red/green read per case | Sub-entries 1.1 and 1.2 | This is what `mutant-gen.js` plus QA's `sweep.py` already do. The sweep's hand-mutant list (`mutants.json`, 14 hand mutants) covers settings the operators cannot express. |
| QA planted defects, baseline predates move, mutation sweep | Scripted (`planted-defects.py`, `baseline-predates-move.py`, `sweep.py`) and executed by a helper subagent ($0.01 under QA's row) | 09:19Z verdict; QAF-1 re-run 09:27Z | Already unattended. What persists is the suite itself: the release-tip and armed-notes cases in `tools/recordEntrypoints.test.js` now guard the two settings. |

Nothing was put to the owner, no environment was rebuilt, and no browser was used.

## Lessons Learned

1. Measuring with the real mechanism before committing changes the size of a problem. Here the estimate was 26 and the measurement 262. A scoping item marked "unread" is a measurement owed, not a footnote.
2. Error text in a sibling repository's code is prose about a mechanism. It propagates like documentation does, through briefs into new source, and a reviewer reading the real mechanism is the only stage placed to stop it.
3. A configuration value with a stated purpose is production behaviour. A review that pairs test titles with assertions does not see one. A sweep that mutates the settings does.
4. A multi-document closure run as one shell line that continues past a failed step leaves the record in a state no single document describes.
5. A test that asserts the whole record is healthy, in a record that several sessions write, makes every stage's document part of every other stage's suite. That is useful as a detector (QA § Observation), but each writer has to run the check before hand-off, or the failure lands on someone else.

## Recommendations (each naming the file it would change)

1. **`~/.claude/agents/steering.md`**: a scoping determination or brief that states a fact about a mechanism (a remote, a port, a path, an engine setting) cites the command that established it, or marks it "unread". Source: the "no remote" premise (rulings 09:11Z).
2. **`~/.claude/skills/record-closure/` (record-closure skill)**: close each document as its own step, with its Status write, changelog row and move, and stop the sequence at the first failure. Never run a compound line that moves several documents after one check. Better still, have the closure tool refuse to move a document whose `Status` is not terminal. Source: 6cde776.
3. **`~/.claude/agents/fixer.md`** (record-deliverable rules): every setting the change introduces with a stated purpose has an assertion that fails when the setting is flipped, shown before hand-off. Source: QAF-1.
4. **`~/.claude/agents/code-reviewer.md`**: in a record repository, the review document's commit is followed by `node tools/check-repo.js`, run before the hand-off message rather than only at run end. A failure in one's own document is fixed before delivery. Source: CR sub-entry 1.1.
5. **`~/.claude/tools/convention-check.js`**: run the comment gate and the test-naming check over a record repository's `tools/`, rather than exempting the whole repository, so that record tools are not hand-checked by grep. This is the Agents domain's. Source: implementation § Verification; CR § Source comments.
6. **`~/.claude/agents/record-tools-architecture.md`** (architect): its Scope names only the statbot and paracord entrypoints. The hooks record's `tools/check-repo.js` and `tools/build-index.js` are now thin entrypoints too (d96b799), with `selfName: 'hooks'` and a baseline holding the pre-012 legacy that the engine does not omit.

No handoff is created. This effort has no next chain that a recommendation is scoped to alone.

## Cost

Readout: `python3 ~/.claude/tools/cc-usage.py chain hooks-record-engine --since 2026-11-10T08:47Z --until 2026-11-10T09:31Z`, and for the steering row `… chain cleanup-hooks` over the same window. The window runs from the scoping determination's time to the push.

| Session | Requests | $ |
|---|---|---|
| `fixer-hooks-record-engine` | 120 | 7.97 |
| `code-reviewer-hooks-record-engine` | 57 | 3.39 |
| `qa-hooks-record-engine` (own 75 req $4.90; `general-purpose` helper 11 req $0.01) | 86 | 4.92 |
| Stage subtotal | 263 | 16.28 |
| `steering-cleanup-hooks` (outside the stage family; matched by its own suffix) | 48 | 15.84 |
| **Total** | 311 | **32.12** |

- **Session set**: the three stage sessions, each resolved from the registry cache with its live entry gone, and the steering thread. No session was unrecoverable.
- **Steering row**: the window bounds it. Inside the window it carries pre-chain work: the 08:47Z–08:53Z scoping determination and rulings, before the owner opened the chain. It also carries the chain-serving cleanup edits: the strict-YAML quoting at 7b4419a and the `CLAUDE.md` row at f824d3d. It excludes the cleanup's passes before 08:47Z and the closure commits after 09:31Z.
- **This retrospective**: it runs as a subagent of steering after 09:31Z, so it is filed under steering's row and falls outside the window.

**$ per added production line**: `git diff --numstat 7b4419a 1611473` over the production paths `tools/check-repo.js` (+35/−833) and `tools/build-index.js` (+13/−257) gives 48 added lines, a net −1042. $32.12 / 48 is about **$0.67 per added production line**, or $0.34 on the stage sessions alone.

These are excluded from "production":
- `tools/check-repo-baseline.json` (+1282), which is generated data;
- `tools/recordEntrypoints.test.js` (+174), a test;
- `README.md` (+12/−7) and `CLAUDE.md` (+1/−1), which are documentation.

The chain mostly deleted code, so a per-added-line rate overstates its unit cost.

## Handoff

- The architect, for recommendation 6 (`~/.claude/agents/record-tools-architecture.md` Scope).
- The roadmap, once this retrospective is closed. No roadmap document exists in this record.
