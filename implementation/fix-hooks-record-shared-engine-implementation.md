---
ID: n/a
Origin: fix-hooks-record-shared-engine
UUID: 2b33b8c9
Status: Active
Status-Detail: "Code review Round 1 APPROVED_WITH_COMMENTS at d96b799; CR-1/CR-2 fixed at 7dab510. Owed: reviewer's fix confirmation, QA Phase 2."
Handoff-At: 7dab510 — repos=agent-output; code review Round 1 fixes over d96b799
Origin-Chain: none
---

# fix-hooks-record-shared-engine — implementation

## Scope statement

The owner's words (witnessed by steering, rulings file `steering/record-tools-shared-engine-rulings.md`,
block "2026-11-10T08:53Z"): **"Do what's necessary to make the record healthy."**, given after the
scoping determination in the same file (block "2026-11-10T08:47Z — scoping determination"). The bounded
statement, relayed by steering in `steering/record-engine-briefs/record-engine-fixer-brief.md`:

> Move this record's `tools/check-repo.js` and `tools/build-index.js` onto the shared record engine
> (`~/.claude/tools/record-engine.js`), in the form of the statbot record's entrypoints […], so that
> `node tools/check-repo.js` exits 0 on this record. In: the two entrypoints, the entrypoint test, the
> settings, a baseline file. Out: any edit to the engine or anything under `~/.claude`; any edit to a
> chain document, handoff or evidence file to make a check pass; `tools/uat-local-stack.sh` and
> `tools/uatLocalStack.test.js` (chain PI006's); `INDEX.md` (steering rebuilds it); every other
> repository.

The rulings block also lists `README.md`, "only where a line states the old checker's behaviour". The
one exception to "anything under `~/.claude`" is an entry in `~/.claude/agents/INBOX.md`. The brief
names that inbox as the route for engine findings, and steering's answer to this document's `BLOCKED:` (rulings file, last block) directs it.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/record-tools-shared-engine-rulings.md`, blocks "2026-11-10T08:47Z — scoping determination" and "2026-11-10T08:53Z", relayed in the brief above by `steering-cleanup-hooks`. |
| 2 | Bounded scope statement | Quoted above. Chain paths (rulings, 08:53Z block): `tools/check-repo.js`, `tools/build-index.js`, the entrypoint test, the baseline under `tools/`, this document, `verification/fix-hooks-record-shared-engine/`, and `README.md` where a line states the old checker's behaviour. |
| 3 | Fix branch | **Negated by the brief**: there is no `fix/` branch. The source lives in the record repository, and the commits go on its `master` over the paths above, by pathspec. |

## Diagnosis

**Cause.** The record's own `tools/check-repo.js` (846 lines, ported from the statbot record at
b2d4b52 on 2026-08-23) keys `DUPLICATE_BASENAME_EXCEPTIONS` by bare file name and has no baseline. So
the 22 BASENAMES failures in the probe folders could be cleared only by exempting a file name
everywhere, and the 4 unsuffixed documents could not be cleared at all. Instrument: a read of
`tools/check-repo.js` (lines 81–83 and 403–424 at 7b4419a), and `node tools/check-repo.js` at 8af81c0,
which exited 1 with **29** failures. Those were the 26 the brief cites
(`verification/cleanup-2026-11-10/after-check-repo.txt`) plus 3 LINKS citing this document before it
existed.

**Origin-Chain: none.** `git blame -L 81,83` puts the exception lines in b2d4b52, "tools: port
check-repo.js and build-index.js from the statbot agent-output repo", which is a port, not a chain's
change.

**Residue.** None. This is record tooling, and no production system, data or provider is involved.

### Dry measurement (first deliverable, before any commit)

Instrument: `verification/fix-hooks-record-shared-engine/dry-entrypoint-check.js`, a scratch
entrypoint outside the tree. It points `root` at this record and `toolsDir` at the scratch directory,
so no baseline is read. Settings: `documentRules: true`, `releaseJoinExemption: true`, `notADocument`
{WORKING-NOTES.md, INDEX.md, .gitkeep}, only the `README.md` exception, and both instants either unset
or set to the run's own time. No tracked file was changed. Failures were grouped by
`classify-engine-failures.js`, which applies the old checker's own `chainOf` boundary
(`FIRST_CHECKED_CHAIN = 12`).

| Tree | Variant | Failures | Capture |
|---|---|---|---|
| 8af81c0 | no instants | 262 | `dry-engine-no-instants-at-8af81c0.txt` |
| 8af81c0 | both instants at now | 262 | `dry-engine-at-8af81c0.txt` |
| 7b4419a | both instants at now | 260 | `dry-engine-at-7b4419a.txt` |

Per check, and what each class is (at 7b4419a):

| Check | Count | Class | Disposition |
|---|---|---|---|
| FRONTMATTER | 200 | Pre-012 legacy: 68 ID not three-digit, 68 Origin not three-digit, 64 filename/ID disagree. | Baseline (brief's guidance; the engine has no pre-012 omission). |
| LINKS | 30 | Pre-012 legacy markdown links written one directory too shallow. | Baseline (as above). |
| SCOPE | 14 | Pre-012 legacy documents with no stage suffix. | Baseline (as above). |
| BASENAMES | 8 | Pre-012 legacy plan/implementation pairs that share a file name. | Baseline (as above). |
| SCOPE | 4 | The four named unsuffixed documents: `code-review/closed/012-carry-forward-to-post-refresh-pass.md`, `deployment/closed/01{2,3,4}-…-readiness.md`. | Baseline (brief's guidance). |
| LINKS | 3 | Citations of this document. | Cleared when this document was written. |
| BASENAMES | 1 | `.gitignore` at the root and at `verification/014/.gitignore`. | A two-path exception in settings. |
| FRONTMATTER (strict YAML) | 2 at 8af81c0, 0 at 7b4419a | An unquoted `: ` in `Status-Detail` of `analysis/closed/014-test-suite-cleanup-analysis.md` and `planning/closed/014-test-suite-cleanup.md`. The old checker had no strict-YAML check. | Raised `BLOCKED:` to steering. Steering chose option 2 and corrected both documents itself at 7b4419a, so nothing is baselined for them. |

The instants arm nothing that fails here: changelog-rows judged 0 rows at the gate tree, and
status-vocabulary judged 0 closed documents since the instant.

The brief's guidance names `duplicateBasenameExemptDirectories` for the 22 probe-folder names. The
measurement shows it is not needed: the engine already allows any name shared only across distinct
`verification/` folders ("21 shared only across different verification/ folders (allowed)"). The 22nd
is the `.gitignore` pair, which has one copy outside `verification/`. An exempt directory that matched
nothing would itself fail as stale.

**`--status`.** The old and engine paths at 8af81c0 print byte-identical output, both exit 0
(`status-old-vs-engine.diff`, diff exit 0). One difference is read from code, not observed: the old
checker associates an open handoff with a chain by `\b0*<n>\b`, and the engine by `mentionsChain`
(the ID as written, alphanumeric-bounded).

**Index side.** Both generators were run `--tracked` over a detached worktree at 8af81c0 (removed
after; `git worktree list` shows only the main tree). Diff: `index-diff-old-vs-engine.txt`, with the
non-handoff rows in `index-diff-old-vs-engine-nonhandoff-rows.txt`. The engine adds statusless rows
for `INBOX.md`, `OPEN_QUESTIONS.md`, `OWNER-QUEUE.md` and `TODO.md`, which the old builder skipped by
design. It shows the 10 `steering/` documents with stage `—`, and adds `· priority <p>` to the 27
handoff rows. `runIndex` reads only `settings.root`, so no entrypoint setting can change this. It is
not a failure: index staleness is a warning. It is routed to `~/.claude/agents/INBOX.md` (entry
"2026-11-10 — fixer-hooks-record-engine — FYI"). `INDEX.md` is steering's to rebuild.

## Change

| File | Change |
|---|---|
| `tools/check-repo.js` | 846 → 48 lines: the statbot entrypoint form, with this record's `SETTINGS` and a `REVIEW` marker export. |
| `tools/build-index.js` | 270 → 26 lines: the statbot entrypoint form, with a `REVIEW` marker export. |
| `tools/check-repo-baseline.json` | New. 256 entries, each `{check, detail, _why}`: 252 pre-012 legacy entries and the 4 named SCOPE documents. Generated by `verification/fix-hooks-record-shared-engine/make-engine-baseline.js` from the engine's own `--full` output; the script refuses any failure outside those two classes. |
| `tools/recordEntrypoints.test.js` | New. The statbot test, adapted to this record (below). |
| `README.md` | § `tools/`: the old "currently exits 1 … expected" paragraph and the check table, restated for the engine and the baseline. |

Settings (agent-authored design choices within the scope, except where marked):
- `selfName: 'hooks'`, which matches the engine's `REPO_ALIASES` key for this record.
- `gateInstant` and `vocabularyInstant`: both `2026-11-10T09:01:13Z`, the adoption time taken by
  `date -u` at the write (the instant choice is steering's guidance).
- `documentRules: true`, as in the statbot record. It arms origin-uuid, duplicate-id and
  handoff-priority, none of which fails here.
- `releaseJoinExemption: true`. It has no effect today: both `qa/closed/release-*` files carry no
  `ID`. It is kept so a future release-tip record with `ID: none` passes, as in statbot.
- `notADocument`: carried over from the old checker, including `.gitkeep`.
- `duplicateBasenameExceptions`: `README.md` (reason carried over), and `.gitignore` limited to its
  two paths, so that a third copy fails.
- No `duplicateBasenameExemptDirectories` (see Diagnosis).

**Review marker.** The fixer rule requires a `pending review at <sha>` marker at the head of a record
tool. The comment gate admits no comment for it (`~/.claude/tools/comment-gate.js` `ALLOW` has no such
entry), so it is a string constant, `const REVIEW = 'pending review at 7b4419a'`, exported from both
entrypoints. `7b4419a` is the base the change was built on, and the reviewed tree is `Handoff-At`. The
marker is not carried in the test file, where it would be an unused constant, or in the baseline JSON,
whose array the engine reads entry by entry and where a non-entry object would break `baselineKey`.
It is removed (`REVIEW = 'reviewed'`) at QA Phase 2's verdict.

**Declined work.** The baseline holds back 256 failures from the default run. They go nowhere: they
are closed history this record is not to repair (owner ruling 2026-08-24 for pre-012, quoted in the
old checker; rulings 08:53Z block for the four). They stay visible under `--full`. An entry that stops
matching prints a `BASELINE` warning, so a repaired or moved document surfaces for pruning.

**Lifetimes; irreversible effects.** The change adds nothing with a lifetime and no irreversible
action.

## Test

`node --test tools/recordEntrypoints.test.js`. The test clones the committed record, copies in the
working entrypoints and baseline, and runs them. Cases taken from statbot unchanged: engine absent →
exit 2 naming the path and the box binding; js-yaml missing → exit 2 naming the install command;
`RECORD_ENGINE_DIR` override honoured; requiring either file writes and prints nothing. Adapted or
added for this record:
- both instants are UTC instants no later than now (`require` moved into a subprocess);
- no `.gitignore` or `verification/` basename failure under `--full`;
- the committed record passes with its baseline and no stale entry;
- `--status` exits 0 and reaches the engine;
- `build-index.js --tracked --check` reads through the engine;
- (code review Round 1, CR-2) every baseline entry names only pre-012 documents or one of the four named unsuffixed documents. The predicate is written in the test from literal patterns (`^(?:00\d|01[01])-` on the basename, `-plan-(?:00\d|01[01])\.md$`) and the four literal paths, independent of `make-engine-baseline.js`'s `chainOf`;
- (CR-2) the override case's live leg runs `--help` and asserts exit 0 and the engine's own usage line, which the old tools did not print.

The statbot `package.json` case is dropped, because this record has no such manifests.

| Run | Tree | Result | Capture |
|---|---|---|---|
| Red | 7b4419a with the old tools, plus the new test | 13 tests, 2 pass, 11 fail, exit 1 | `verification/fix-hooks-record-shared-engine/red-run.txt` |
| Green, before commit | new tools, uncommitted | 12 pass, 1 fail. The full-pass case saw this document's 3 citations, absent from the committed clone (expected), exit 1. | `green-run-precommit.txt` |
| Green, committed | d96b799 | 13 tests, 13 pass, 0 fail, exit 0 | `green-run.txt` |
| Control | `RECORD_ENGINE_DIR` → a sentinel engine (record-engine.js prints only `SENTINEL …`), selecting only the two cases green at both trees | 2 tests, 0 pass, 2 fail, exit 1 | `control-preservation-cases.txt` |

The two cases green on both trees, `--status` and `--tracked --check`, guard behaviour the brief says
to keep. The control shows they read the engine's real output and do not pass vacuously.

The first red run is overwritten in place. The old `check-repo.js` runs `main()` and calls
`process.exit` when required, which killed the test process after 1 case. That case's `require`
was moved into a subprocess, and the capture above is the re-run.

The full-pass case depends on the whole record staying healthy, as the check itself does. This is a
deliberate statement of the scope ("exits 0 on this record"), not a unit property.

### Code review Round 1 (CR-1, CR-2)

The review (`code-review/fix-hooks-record-shared-engine-code-review.md`, APPROVED_WITH_COMMENTS at d96b799) raised two LOW items. Both were verified at the mechanism before acting:
- **CR-1**: `git -C ~/.claude/tools remote -v` shows `origin git@github.com:mr-tech/agent-tools.git`, so the "has no remote" text was wrong. It came from the statbot entrypoints, and I copied it unchecked. Corrected in both entrypoints' engine-absent message and in README § `tools/`, in RQ-3's sense: "bound to this box; its git remote is a backup, not a second home". The README's "each armed from this record's adoption instant" was also wrong: `record-engine.js` lines 811 and 836 arm duplicate-id and handoff-priority on `documentRules` alone, and `checkStatusVocabulary` judges open documents with no instant. The README now states which instant, if any, arms each rule.
- **CR-2**: the preferred fix was taken (the two test cases above). The full-pass case was retitled to what it asserts.

| Run | Tree | Result | Capture |
|---|---|---|---|
| Green | f824d3d + the CR edits, uncommitted (committed as 7dab510) | 14 tests, 13 pass, 1 fail, exit 1. The failing case is the whole-record pass: 2 LINKS in the code reviewer's own document (`code-review/fix-hooks-record-shared-engine-code-review.md:43` cites `code-review/classify-baseline-by-prefix.js` and `planning/015-x.md`, which do not exist). `node tools/check-repo.js` on the working tree reports the same 2. Not this change's, and routed to the reviewer. <!-- check-repo:ignore — quotes the reviewer document's two dangling citations as the evidence of that failure --> | `green-run-cr-round1.txt` |
| Control A | export of f824d3d + the CR edits, baseline + one planted entry `planning/015-planted-chain-document.md: no UUID field`, baseline-class case only | 1 test, 0 pass, 1 fail: `outside` holds exactly the planted entry | `control-baseline-planted-entry.txt` |
| Control B | same export, both entrypoints' default engine directory mutated to a silent engine (prints nothing, exits 0), override cases only | 2 tests, 0 pass, 2 fail at the usage-line assertion. The pre-round assertion (`doesNotMatch SENTINEL`) would have passed. | `control-live-leg-silent-engine.txt` |

The export was removed with `git worktree remove`, and the silent engine was deleted.

## Verification

- **Existing tests of the surface**: none existed (the old tools had no test). `tools/uatLocalStack.test.js` is chain PI006's and tests a different surface. Not run.
- **Build**: this record names no build verification (the workspace `CLAUDE.md` names none for `agent-output`). No package-manager operation ran, so no lockfile moved.
- **Lint**: the record has no lint script and no eslint config. `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/agent-output --since=7b4419a` exited 0 with 0 FAIL, 0 CANDIDATE, 11 SKIP: the three `.js` files are "under a record repository — exempt from every check", and the ID-token/basename check did not run. **The comment gate, test-naming rules and eslint are therefore unchecked on these files.** Substitutes run: `node --check` on all three files passes, and `grep -n -E '^\s*(//|/\*|\*)'` over them finds no comment line (exit 1).
- **Check**: `node tools/check-repo.js` exit 0, "PASS — no new failures (256 baselined).", with one INDEX staleness warning (steering's). `--full` reports the 256.

**Set up and removed on this box.** A detached worktree of the record at 8af81c0 in the session scratchpad, used for the index diff; removed with `git worktree remove`, and `git worktree list` shows only the main tree. Scratch engine directories and the dry entrypoints in the scratchpad, deleted after their captures were committed. Five `/tmp` directories that the first red run left (`record-entrypoints-czuVt9`, `engine-bare-hCC68L`, `engine-sentinel-OBtjU1`, `engine-absent-RTo9cA`, `engine-absent-kbfK9H`, all 09:00:43Z; its `process.exit` skipped the test's `after()`), removed by literal path. No process was left running.

## User-visible flows

None: record tooling only.

## Handoff

- Handoff-At: d96b799 (source and this document as handed; the commit after it adds only the green-run captures and these rows). At d96b799: `node tools/check-repo.js` exit 0 (`check-repo-at-d96b799.txt`), `--status` exit 0, `build-index.js --tracked --check` exit 1 (stale, steering's rebuild).
- Reviews: `code-reviewer-hooks-record-engine`, then `qa-hooks-record-engine` (QA Phase 2; the change exceeds 20 production lines).
- Merges: nothing to merge, since the commits are on `master`. Steering pushes; the record has no workflow files, so the push deploys nothing.

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-11-10T09:01 | Document opened. | fixer-hooks-record-engine |
| 2026-11-10T09:05 | Dry measurement, Diagnosis, Change, Test and Verification written; `BLOCKED:` on two strict-YAML entries sent to steering-cleanup-hooks (msg 6680fbac) and answered (option 2, corrected at 7b4419a). | fixer-hooks-record-engine |
| 2026-11-10T09:05 | Source committed at d96b799; green run at d96b799 13/13 exit 0; Handoff-At d96b799; handed to code-reviewer-hooks-record-engine. | fixer-hooks-record-engine |
| 2026-11-10T09:06 | Box cleanup recorded (worktree, scratch, five /tmp test directories). | fixer-hooks-record-engine |
| 2026-11-10T09:13 | Code review Round 1: CR-1 corrected (four texts), CR-2 preferred fix taken (two cases); green 13/14 (the 1 is the reviewer document's 2 LINKS); controls A and B red. | fixer-hooks-record-engine |
| 2026-11-10T09:14 | CR fixes committed at 7dab510; Handoff-At moved to 7dab510; fix confirmation sent to code-reviewer-hooks-record-engine. | fixer-hooks-record-engine |
