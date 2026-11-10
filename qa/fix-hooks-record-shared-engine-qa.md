---
ID: n/a
Origin: fix-hooks-record-shared-engine
UUID: 2b33b8c9
Verified-At: e44a867 — repos=agent-output; tools identical to Handoff-At 7dab510 (git diff --stat 7dab510 e44a867 -- tools README.md empty); engine ~/.claude/tools a34093d, record-engine.js sha256 9c1a94ac…, seam.js cddce599…, both clean
Status: QA Failed
Status-Detail: "Phase 2 at e44a867: QAF-1 MEDIUM blocks (two settings with a stated purpose have no failing assertion). Owed: fixer round, then a survivor-scoped re-run here."
Phase: 2
---

# QA Report: fix-hooks-record-shared-engine

**Plan Reference**: none (fixer chain). Scope: `steering/record-tools-shared-engine-rulings.md` (blocks 08:47Z, 08:53Z, 08:58Z) and `steering/record-engine-briefs/record-engine-fixer-brief.md`; brief `steering/record-engine-briefs/record-engine-qa-brief.md`.
**Implementation Reference**: `implementation/fix-hooks-record-shared-engine-implementation.md` (Handoff-At 7dab510).
**Code review**: `code-review/fix-hooks-record-shared-engine-code-review.md`, Round 1 APPROVED_WITH_COMMENTS at d96b799, sub-entry 1.1 at 7dab510 (e44a867).
**Architecture**: `~/.claude/agents/record-tools-architecture.md` (read); `architecture/system-architecture.md` holds nothing on record tools (code review's read, not re-run).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-10T09:19 | code-reviewer-hooks-record-engine (SendMessage: APPROVED_WITH_COMMENTS at d96b799, then sub-entry 1.1 at 7dab510) | QA Phase 2 | Phase 2: QA Failed at e44a867. Suite 14/14 exit 0; check exits 0; planted defects 9/9 caught; baseline 256/256 predates the move; sweep 23/27 killed, 4 survivors; QAF-1 MEDIUM raised. Steering's brief arrived first. |

## Process note

This is a fixer chain, so there is no Phase 1, by the owner's selection of the fixer route (rulings 08:47Z/08:53Z). This document is a post-hoc Phase 2 record, not the two-phase record the QA process prescribes. No Irreversible Side-Effect Register is produced: the change touches no irreversible effect. The entrypoints read the record and print, and `build-index.js --tracked` writes only `INDEX.md`, which git can restore. Read in `tools/check-repo.js` `main` and `tools/build-index.js` `main`, both of which only `require` the engine and call it.

The stage start was the code review's committed verdict (53a469a, Reviewed-At d96b799). The fixer then moved Handoff-At to 7dab510, and the reviewer confirmed it in sub-entry 1.1 (e44a867). The measurements below are anchored on whichever tree each one names. The production source is identical between them except for one stderr string per entrypoint (`git diff d96b799 7dab510 -- tools/check-repo.js tools/build-index.js`).

## Criteria assessed (recorded before execution)

1. `node tools/check-repo.js` exits 0 on this record.
2. It exits 0 *because the record is sound*: the check still fails on a planted defect of each class it claims (broken link, unexempted duplicate name, bad ID, and the missing stage suffix the 4 baselined documents carry).
3. Every baseline entry matches a failure that existed before the move, and is in a sanctioned class (pre-012 legacy, or one of the 4 named unsuffixed documents).
4. `--status` and `build-index.js --tracked` still run. `--status` output is unchanged. An `INDEX.md` rebuilt by the new tool differs from the old tool's only as the implementation document explains.
5. Test adequacy: every setting and guard the change introduces has an assertion that fails when it is lost.

Criterion 2 names example classes. The class each one exemplifies is "a defect the engine checks, on a document the baseline does not hold". The plants below cover one member per named check, on open, closed-012+ and baselined pre-012 documents. A plant in every engine check (changelog rows, status vocabulary, …) was not attempted: those are engine behaviour and outside this change, which is residue, not a finding.

## TDD compliance (fixer chain: the Test section)

The fixer document carries a red run at 7b4419a (13 tests, 11 fail, exit 1), a green run at d96b799 (13/13, exit 0), and a sentinel-engine control for the 2 cases green on both trees. Round 1 adds the baseline-class case and the live-leg assertion. Their seen-red evidence is the reviewer's three planted entries (`verification/fix-hooks-record-shared-engine/code-review/cr2-probe-*-at-7dab510.txt`), and my sweep's hand-12 and hand-13 (below) independently redden the whole-record case. Gate: passed.

## Test Execution Results

All runs are network-isolated (`unshare -rn`) in scratch clones, never in the shared tree. Engine identity at the run: `verification/fix-hooks-record-shared-engine/qa/engine-identity-at-run.txt` (record-engine.js 9c1a94ac1f80…, seam.js cddce599…, `~/.claude/tools` a34093d, `git status --porcelain` empty). **This closes the code review's Assumption Not Checked.**

| Run | Tree | Result | Capture (under `verification/fix-hooks-record-shared-engine/qa/`) |
|---|---|---|---|
| `node --test tools/recordEntrypoints.test.js` | e44a867 | 14 tests, 14 pass, 0 fail, **exit 0** | `suite-at-e44a867.txt` |
| `node tools/check-repo.js` | e44a867 | **exit 0**, "PASS — no new failures (256 baselined)." | `check-default-at-e44a867.txt` |
| `--status` | e44a867 | exit 0; byte-identical to the old 7b4419a tool run on the same tree (`diff` exit 0, empty file) | `check-status-at-e44a867.txt`, `status-old-7b4419a-tools-vs-new-on-e44a867.diff` |
| `build-index.js --tracked --check` | e44a867 | exit 1, "INDEX.md is STALE (--tracked)" (steering's rebuild) | `index-check-at-e44a867.txt` |

**Observation, resolved before this verdict.** At f824d3d the suite went 12/13, exit 1, and the check exited 1 on 2 LINKS. Both were dangling backticked citations at line 43 of the code-review document, which the review committed after d96b799. The reviewer fixed them in e44a867. This is not a finding against the change: the new check caught a real defect in the record, which is criterion 2 working on a live member. The whole-record case depends on the whole record, as the implementation document states.

### Criterion 2: planted defects

Instrument: `planted-defects.py` (run at e44a867; output `planted-out/`). The scratch control first un-backticks the two known citations in its own copy only (there were none to change at e44a867, and the control passing is asserted), so that an exit 1 discriminates.

| Plant | Expected | Outcome |
|---|---|---|
| P1 broken link, open chain document | caught | caught |
| P2 broken link, closed chain-014 document | caught | caught |
| P3 new broken link in a baselined pre-012 document | caught | caught (the baseline does not blanket a legacy file) |
| P4 duplicate document name across two stage directories | caught | caught |
| P5 third `.gitignore` outside the two exempted paths | caught | caught |
| P6 name shared by a `verification/` file and one outside it | caught | caught |
| P7 ID not three digits | caught | caught |
| P8 ID disagrees with filename | caught | caught |
| P9 a fifth document with no stage suffix | caught | caught |
| P10 name shared only across two `verification/` folders | allowed (engine rule) | allowed |

"9 plants matching `expected caught` in the table above, each caught by exit ≠ 0 plus a new failure line naming the planted path, absent from the control's output — excludes checks the engine adds that this change does not configure." P10 is the engine's built-in allowance, which the old checker did not have. Steering's guidance had asked for a directory exemption here instead. It is recorded as residue: any name collision confined to `verification/` now passes, in any folders. This is the engine's rule, the same in statbot, and not this change's.

### Criterion 3: baseline predates the move

Instrument: `baseline-predates-move.py` (output `predate-out/`), with tools at 7dab510 (baseline blob unchanged since d96b799).
- **Leg A (engine-shaped).** The new entrypoints and baseline were run on the pre-move tree 7b4419a. Result: "256 baselined" with no `BASELINE` stale block, so all 256 of 256 entries match a failure present before the move. 3 failures are not baselined: citations, in the steering briefs and rulings, of the implementation document that did not exist yet. The positive control, one planted unmatched entry, prints a `BASELINE` block naming it.
- **Leg B (old-checker-shaped, unlike the reviewer's basename-prefix classifier).** A copy of the old checker at 7b4419a, with one dump line after its own legacy filter, lists the **83** files it omitted (the same count as its "83 file(s) … omitted" note in `verification/cleanup-2026-11-10/after-check-repo.txt`). The 4 SCOPE documents are taken from that same pre-move output. "256 baseline entries in `tools/check-repo-baseline.json`, every tracked path named in each detail checked — excludes nothing": 0 outside the old checker's legacy set ∪ the 4. Positive controls: a fifth unsuffixed document and a chain-015 link entry are both flagged.

### Criterion 4: index

Both generators were run with `--tracked` on one tree (e44a867), giving `index-old-vs-new-generator-on-e44a867.diff`: 46 lines added, 38 removed. The differences:
- 27 handoff rows gain `· priority`.
- `INBOX.md`, `OPEN_QUESTIONS.md`, `OWNER-QUEUE.md` and `TODO.md` gain statusless rows and name-table entries.
- The 10 `steering/` rows show stage `—`.
- The count line moves by those 4 files.

This matches the implementation document's Diagnosis § Index side, and the code review's CR-3. No other difference. (A first attempt compared clones at different HEADs, and the difference that showed up was a Status-Detail change. The run was redone on one tree, and the capture is that redo.)

### Criterion 5: mutation sweep

Scope: production code the effort changed, `git diff 7b4419a..d96b799` over `tools/check-repo.js`, `tools/build-index.js` and `tools/check-repo-baseline.json`. Test file, fixtures and `verification/` excluded. The mutant list is `mutants.json` (blob f57c2ad), built by `make-mutants.py` from `node ~/.claude/tools/mutant-gen.js --range 7b4419a..d96b799` (`mutant-gen-7b4419a..d96b799.json`; 13 of its 91 mutants are in `tools/`, and the rest are in `verification/` instruments). 14 hand mutants are added for the settings and baseline, which the operators cannot express. Driver: `sweep.py` (blob 461f1cf). Each run is a copy of a scratch clone at d96b799, killed by process group at 240 s, under a capped `systemd-run` scope. The runs were executed by a helper.

- **Round 0, d96b799** (suite blob 0db115b, 13 cases): "27 mutants over `tools/` lines added in 7b4419a..d96b799 plus 14 hand mutants of settings/baseline — excludes string literals (mutant-gen's own exclusion)": 23 killed, 4 survived, control 13/13 exit 0. Table: `sweep-out/kill-table.json`. The seen-red record (which cases each mutant reddened) is in the table's `failing` lists.
- **Round 1, 7dab510** production diff: two stderr strings, no operator mutants. The diff's 10 generated mutants all fall in the reviewer's `verification/` instrument and are out of scope. Survivors only, re-run at e44a867 (suite blob cd73fd5, 14 cases): `mutants-survivors-at-e44a867.json`, `sweep-out-survivors-at-e44a867/kill-table.json`, control 14/14 exit 0. **All 4 still survive.**

Survivor dispositions:

| Mutant | Disposition |
|---|---|
| `check-repo.js:20:true` (`documentRules: false`) | **QAF-1 (a).** |
| `check-repo.js:22:true` and `hand-14` (`releaseJoinExemption: false`) | **QAF-1 (b).** Not equivalent: a probe planting `ID: none` in `qa/closed/release-4a7126b-tip-verification.md` exits 0 with the setting on and exits 1 with it off ("ID 'none' is not three-digit zero-padded", "no UUID field"). Captures: `release-join-probe-true.txt`, `release-join-probe-false.txt`. |
| `hand-8` (`INDEX.md` dropped from `notADocument`) | Equivalent on this tree. The generated `INDEX.md` carries no frontmatter, and every citation in it is a tracked path, so treating it as a document yields no failure. It is dispositioned as equivalent rather than as a finding because no stated behaviour depends on the exclusion beyond "carried over", and the generator writes only paths that resolve. |

Seen-red per case (round 0; computed from `sweep-out/kill-table.json` against the control's 13 titles): every case is reddened by at least 2 mutants. The `.gitignore` case is reddened by 3 (hand-1, hand-2 and hand-10), "requiring build-index.js" by 2, and the whole-record case by 15. So no case is non-discriminating. The round-1 case added (baseline class) is reddened by the reviewer's plants, not by this sweep, because no baseline mutant here leaves the sanctioned classes.

## Findings

QAF-1 MEDIUM Phase 2 — Two settings with a stated purpose have no assertion that fails when they are lost: `documentRules` and `releaseJoinExemption` in `tools/check-repo.js` `SETTINGS`.
- **Property to check.** (a) The README § `tools/` (as corrected in Round 1) and the implementation document state that `documentRules: true` arms origin-uuid, duplicate-id and handoff-priority on this record. The suite passes 14/14 with it set to `false`. (b) The implementation document states that `releaseJoinExemption: true` is "kept so a future release-tip record with `ID: none` passes". The suite passes 14/14 with it set to `false`, and the QA probe above shows the setting decides that case.
- **Failure scenario.** A later edit drops either setting. The default check still exits 0 on today's record, and the three document rules, or the release-record exemption, silently stop applying. The first symptom is a missed duplicate R-n/D-n, or a Phase 3 record failing the check.
- **Severity floor.** These are behaviours the change claims, with no failing assertion (qa.md Deliverables), so the finding is MEDIUM and blocks the verdict.
- **Remedy (fixer's).** Tighten an existing case before adding one (workspace convention, "Before adding a test"). For (a), assert in the whole-record or `--status`-reaching case that the output carries the armed notes (`origin-uuid: N Origin group(s)`, and `duplicate-id:` and `handoff-priority:` lines without "not armed"). For (b), a case that plants a `release-*` file with `ID: none` in the test's own clone and asserts no FRONTMATTER failure for it. Each is to be seen red under its mutant: `check-repo.js:20:true`, and `check-repo.js:22:true`/`hand-14`, in `verification/fix-hooks-record-shared-engine/qa/mutants-survivors-at-e44a867.json`.

### Residue (not blocking)

- P10: any name collision confined to `verification/` passes. This is the engine's rule, not this change's.
- The workspace Test Conventions are scoped to `website`. Under that scope, the new title "… documents of chains before 012 …" would match the bare-`0NN` ID-token class. The record's tests have no stated convention (CR-4, now partly addressed by f824d3d's `CLAUDE.md` row). This is recorded for steering, not raised.
- CR-2's retitle is judged adequate. The new baseline-class case uses a basename-prefix predicate independent of `make-engine-baseline.js`, and the reviewer's three plants redden it.

## Assumption Not Checked

This pass assumes that the box's `~/.claude/tools` engine stays at a34093d / 9c1a94ac… through steering's push and the next uses of the check, and does not test that. The entrypoints load it unpinned. If it is false, a later `node tools/check-repo.js` prints failures or warnings that `check-default-at-e44a867.txt` does not show, or `sha256sum ~/.claude/tools/record-engine.js` differs. Owner: steering-cleanup-hooks, at the push and the `INDEX.md` rebuild.

## Handoff

- QAF-1 goes to `fixer-hooks-record-engine`. After the fix: code review of the round, then a re-run here scoped to the round's diff and the 3 surviving mutant IDs, plus the suite and the default check at the new tip.
- Steering: the residue above, and the Assumption Not Checked. There is no owner-needing item.
- The `REVIEW` markers stay `pending review at 7b4419a` until a passing verdict.
