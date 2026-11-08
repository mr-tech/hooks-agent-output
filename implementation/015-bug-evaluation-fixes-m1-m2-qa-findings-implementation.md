---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "QAF-27 (M1) and QAF-20 (M2) delivered as test-only changes on website's chain branch at 4f9ed85: the owed M1-i and M1-c cells are added to the existing files, and bugFixCoverage.supplemental.test.ts is split by module and deleted. Seven named mutants are each killed by their own cells (run at 825a7d8; 4f9ed85 only drops five comments). Gate at 825a7d8: 1115 of 1115, 114 files, vitest exit 0, typecheck exit 0. QAF-34 and QAF-35 (QA, 476c633) are not started."
Handoff-At: "4f9ed85 — repos=website"
---

# Implementation 015 — QAF-27 and QAF-20 (website, test-only)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md` (M1-c, M1-i; M2 Outstanding Item 1). The findings: `qa/015-bug-evaluation-fixes-m1-qa.md` § Findings QAF-27 (LOW, "Required (implementer), optional before the effort-final pass: add the M1-i members to the existing `it.each`, and the missing-header cell. The others are recorded, not owed"), and `qa/015-bug-evaluation-fixes-m2-qa.md` § Findings QAF-20 (LOW, steps 1 to 5, owed before the effort-final Phase 2). Steering's brief (2026-11-08, "QAF-27 LOW and QAF-20, owed before the effort-final QA pass").

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T09:55 | steering-hooks-015 → implementer-hooks-015 | QAF-27, QAF-20 | Tests at `825a7d8`; comment gate at `4f9ed85`. Mutators `verification/015/mutators/qaf27-*.py`, `qaf20-*.py`. |

## Implementation Summary

Test-only; no production source changed. Each owed cell was added to the file that already covers the surface.

- **QAF-27, M1-i** (`Server.session-cookie-redirect.test.ts`): three `stays` rows (a session value holding a legal `%41` octet; a bare `next-auth.session-token` with no `=`, which Next reports present) and two `sends … once` rows (`ab%`, `%zz`, which Next reports absent), now also asserting `toHaveBeenCalledTimes(1)`. A new case: no `x-pathname` header, one redirect.
- **QAF-27, M1-c** (`auth.sign-out.test.ts`): `log.clearResult` lets the pipeline resolve the ioredis `[[err, null], …]` shape (new case: sign-out still resolves and still issues the `Accounts` update); `sessionsStatements()` asserts zero `"Sessions"` statements in two cells; the deletion-failure cell yields two `setImmediate` turns, as Phase 1 named.
- **QAF-20** (steps 1 to 5):
  1. The `useParsePathname Regex Correctness` describe (7 cases over local copies of the regexes) is deleted. `useParsePathname` has no test now (Outstanding Item 1).
  2. The two `formatKey` self-comparison cases are deleted.
  3. The `"0000"` expectation is the literal `https://cdn.discordapp.com/embed/avatars/1.png`, not `constructImageUrl(…, 0)`.
  4. The remnant is split by module: the five `constructImageUrl` cases moved into the existing `constructImageUrl.default-avatar.test.ts` as a second describe (its `// escaped:` line kept), the two literal `formatKey` cases into the new `formatKey.key-format.test.ts`. The supplemental file is deleted. The five moved comments were removed because the comment gate rejects them.
  5. Counts below.

## Milestones Completed

QAF-27 (the owed members) and QAF-20 (steps 1 to 5). **Not started:** QAF-34 and QAF-35 (QA at `476c633`), CR-26.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | Steering's message "(2) QAF-27 LOW and QAF-20, owed before the effort-final QA pass" (cross-session, 2026-11-08) | Not a test |
| QA Phase 1 covers the surfaces | `qa/015-bug-evaluation-fixes-qa.md` § M1 and the two Phase 2 records above | The cells below |
| User-visible surface | None: test-only | Not a test |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/app/_navigation/Redirects/__tests__/Server.session-cookie-redirect.test.ts` | five rows/cases, call-count assertions | +13 −1 |
| `src/server/__tests__/auth.sign-out.test.ts` | exec-shape case, `Sessions` assertions, second turn | +15 −1 |
| `src/utils/__tests__/constructImageUrl.default-avatar.test.ts` | the five moved cases, `"0000"` literal | +54 −0 (net after the comment removal) |
| `src/utils/__tests__/bugFixCoverage.supplemental.test.ts` | deleted | −142 |

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/__tests__/formatKey.key-format.test.ts` | the two literal `formatKey` cases |
| `agent-output/verification/015/mutators/qaf27-*.py` (6), `qaf20-constructimageurl-discriminator-parse-dropped.py` | the named mutants |
| `agent-output/verification/015/mutation-qaf*-825a7d8.txt`, `qaf27-qaf20-final-*-825a7d8`, `qaf20-before-supplemental.json`, `qaf20-after.json` | captures |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| M1-i cells | The existing `it.each` tables in `Server.session-cookie-redirect.test.ts` (rung 1) |
| M1-c cells | The existing capturing-database and pipeline mock in `auth.sign-out.test.ts` (rung 1) |
| Moved `constructImageUrl` cases | The existing `constructImageUrl.default-avatar.test.ts` (rung 1: the file already covers the surface) |
| `formatKey` | None exists for `formatKey` (the new file follows the `<module>.<behaviour>.test.ts` form) |

## TDD Compliance

No new production function. Each added or rewritten cell is shown red under a named mutant (Axiom A; qa.md: a mutation stands in for the red against the pre-change code), in isolated exports of `825a7d8` by `mutate-run.sh` (`EXPORT_ROOT` in the session scratchpad, whole process group killed at 180 s, outputs `verification/015/mutation-<label>-825a7d8.txt`). Control with no mutator: 4 files, 46 of 46, exit 0.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|----------------|-----------|---------------------|-------------------|----------------|------------------|
| `Server` redirect: bare `next-auth.session-token` stays; `ab%`, `%zz` redirect once | `Server.session-cookie-redirect.test.ts` | No, red by mutant (cells written against already-built code) | Yes | `qaf27-m1i-raw-header-regex` (the session cookie read from the raw header): kills exactly the bare-name row and both `ab%`/`%zz` rows | Yes |
| `Server` redirect: legal `%41` octet stays | same | No, red by mutant | Yes | `qaf27-m1i-raw-header-plain-values` (raw header, plain characters only): kills the `%41` row and the bare-name row | Yes |
| `Server` redirect: no `x-pathname` header redirects once | same | No, red by mutant | Yes | `qaf27-m1i-missing-pathname-defaults-to-editor` (`?? '/message/m/0/edit'`): kills that case only | Yes |
| `removeUserSession`: zero `Sessions` statements | `auth.sign-out.test.ts` | No, red by mutant | Yes | `qaf27-m1c-sessions-delete-added`: kills the success cell, the exec-shape cell, and the order cell (3) | Yes |
| `removeUserSession`: per-command errors do not fail the sign-out | same | No, red by mutant | Yes | `qaf27-m1c-exec-errors-thrown`: kills that case only | Yes |
| `removeUserSession`: lookup-failure clear awaited, two turns | same | No, red by mutant | Yes | `qaf27-m1c-lookup-failure-clear-unawaited` (`void redis.clearUser(…)`): kills the deletion-also-fails cell. Whether the second turn alone is what kills it was not separated (the one-turn version was not run against the mutant) | Yes |
| `constructImageUrl`: `'0000'` parses to 0 (independent literal) | `constructImageUrl.default-avatar.test.ts` | No, red by mutant | Yes | `qaf20-constructimageurl-discriminator-parse-dropped` (`discriminator as number`): kills the `'0000'` case and the pre-existing `"0"` string case | Yes |

The `formatKey` cases and the four moved `constructImageUrl` cases are unchanged in expectation (literals; two of them were already independently derived), so they carry no new red; the pass set is shown by the counts. The guards list from the diff is the test files only; there is no production guard.

**Per-file case counts and pass sets, before and after** (`qaf20-before-supplemental.json` at `476c633`; `qaf20-after.json` at `825a7d8`, vitest JSON `assertionResults`):

| File | Before | After |
|---|---|---|
| `bugFixCoverage.supplemental.test.ts` | 16 cases, 16 pass (5 `constructImageUrl`, 4 `formatKey`, 7 `useParsePathname`) | deleted |
| `constructImageUrl.default-avatar.test.ts` | 7 | 12 (the 5 moved) |
| `formatKey.key-format.test.ts` | not present | 2 |

16 − 7 (`useParsePathname`) − 2 (self-comparisons) = 7 retained, which equals the 5 moved plus the 2 `formatKey` cases. All 14 cases in the two files pass.

## Class Sweep

Not a reviewer fix round. Each QA finding's class was enumerated once.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| QAF-20 (a test over a local copy of production logic; a case comparing a value with itself; an oracle that calls the function under test) | `git grep -n "bugFixCoverage" 4f9ed85 -- src` | 0 | File deleted; no reference remains. The wider class (other zero-production-import transcriptions) is the conventions' class table's, dispositioned file by file in the earlier rounds; not re-enumerated here |
| QAF-20 step 1 (the surface left untested) | `git grep -c useParsePathname 4f9ed85 -- 'src/**/__tests__/*'` | 0 | `useParsePathname` has no test; recorded as Outstanding Item 1 |

## Test Execution Results

| Command | Results | Notes |
|---|---|---|
| `verification/015/impl-suite-run.sh 825a7d8 <scratch> verification/015/qaf27-qaf20-final` | 1115 of 1115, 114 files, vitest exit 0, typecheck exit 0 (`tsc --noEmit && tsc --noEmit -p tsconfig.test.json`), isolation: 0 non-lo links, 0 default routes | Run of record. Arithmetic: 1118 at `476c633` + 5 (M1-i) + 1 (M1-c) + 5 + 2 (moved and new) − 16 (supplemental) = 1115; files 114 − 1 + 1 |
| `mutate-run.sh 825a7d8 <label> <file> <mutator>` × 7, plus a control | each mutant: the failures listed in TDD Compliance; control 46 of 46, exit 0 | |
| `npx eslint` over the touched test files | exit 0 after one fix: a blank line between import groups in `constructImageUrl.default-avatar.test.ts` (an error already in that file, fixed because the file is touched) | `Redirects/Client.tsx` has an `object-curly-newline` error at HEAD; untouched by this round, not fixed |
| `node ~/.claude/tools/convention-check.js website --since=476c633` | 0 FAIL, 0 CANDIDATE, 2 SKIP (no conventions file above the repo for id-token; the deleted file) at `4f9ed85` | The first run at `825a7d8` had one FAIL: 5 comments moved from the supplemental file; removed at `4f9ed85` (disclosed: a gate satisfied in this round) |
| `npx vitest run` on the changed file after the comment removal | 12 of 12 | The full gate was not re-run at `4f9ed85`; the change is five deleted comment lines |

## Outstanding Items

1. **`useParsePathname` has no test.** The regex copies were the only coverage and were a transcription. The hook's real regexes are untested (QAF-20 step 1). A DOM test mounting a component that calls the hook would be the instrument.
2. **QAF-34 MEDIUM (blocks M6-a) and QAF-35 LOW** (QA at `476c633`, messages 2026-11-08T09:5x) are not started; the usage gate stopped the session. QAF-34: tighten the existing title case in `rules.multi-line-code-block.test.ts` into one `describe.each` over both title parsers (static and interactive), red under mutant `m6a-title-codeblock-interactive`. QAF-35: add `{` (class 1) and `[{}]` (class 2) rows to the table in `page.invalid-data.test.tsx`.
3. **CR-26 LOW** (the `useMount` lint reach) is still owed.
4. **The second-turn cell**: see the TDD row; the claim is only that the cell is red under the mutant.
5. **Self-diagnosis (method).** I added the `x=%41` row first and only then looked for the mutant that would separate it; none could, so it was removed. The check I should apply first: name the mutant a cell is for before writing the cell, and write no cell without one.

## Next Steps

QA (effort-final Phase 2 owes QAF-34, QAF-35); code review of the M8 fix round at generator `8de2b53` (separate document). Then CR-26.

## Resumption State (checkpoint 2026-11-08T09:58, implementer-hooks-015; usage gate, steering's message)

- **Branches and HEAD.** website `chain/015-bug-evaluation-fixes` at `4f9ed85`, clean of my work. preview-image-generator `chain/015-bug-evaluation-fixes` at `8de2b53`, clean, not pushed. agent-output: everything of mine is committed (this document with its Checkpoint; M8 document at `9f431e7`, QAF document at `b0c4c60`). `INBOX.md`, `qa/*`, `cr-m5-probes/*` modifications are other sessions'. Nothing locally mutated; mutation exports and rig exports are in this session's scratchpad (`/tmp/claude-1000/-usr-local-bin-hooks/7ab2f8e5-9cb7-4bda-8c06-1fe0f88cd6fa/scratchpad`), disposable.
- **Done this session.** M8 fix round at generator `8de2b53`: CR-27 (drain-complete only on success, `Drain failed after Nms:` on stdout), the D36 startup check (`checkPoolShape`, CR-28, CR-33, AF-30, AF-31; Patterns row corrected). Rig 32 of 32, six mutants killed, document `015-bug-evaluation-fixes-m8-implementation.md` (Handoff-At `8de2b53`). QAF-27 and QAF-20 at website `4f9ed85` (this document). QAF-33 dropped by the owner (rulings `c8c7649`).
- **Handoffs.** M8 round: sent to code-reviewer-hooks-015 (delivered earlier in the session) and steering. The QAF-27/QAF-20 handoff message to code-reviewer-hooks-015 **failed: "No agent named 'code-reviewer-hooks-015' is reachable"** (the M8 message had succeeded). Steering should route `476c633..4f9ed85` (website, this document at `b0c4c60`) to code review by whatever session holds that role now.
- **Next, in order (none started).** (1) **QAF-34 MEDIUM, blocks M6-a** (`qa/015-bug-evaluation-fixes-m6-qa.md` § Findings): tighten the title case in `rules.multi-line-code-block.test.ts` into one `describe.each` over both title parsers (`markdown.static.parseEmbedTitle` and the interactive one); red under mutant `m6a-title-codeblock-interactive` (which restores codeBlock to the interactive title rule set), green at the tip; or show by execution the mutant is equivalent. (2) **QAF-35 LOW** (`qa/015-bug-evaluation-fixes-m5-qa.md`): add `{` (class 1) and `[{}]` (class 2) `it.each` rows to `page.invalid-data.test.tsx`. (3) **CR-26 LOW**: `no-restricted-imports` of `useMount` from `react-use` (3 callers left, none returns); the current `no-restricted-syntax` guard flags 3 of 8 planted members (`cr-m6-probes/usemount-lint-planted.tsx`). (4) Plan rev 27 M8-b/M8-d: built as non-object 500 and as a property; change nothing there unless the planner's later revision says so. Each: tighten the existing file, name the mutant first, mutate with `verification/015/mutate-run.sh <committed sha> <label> <test> <mutator>` (`EXPORT_ROOT` = a scratchpad), one handoff.
- **Questions sent and open.** To steering: the D36 line goes to stderr (`console.error`); if M9's run-2 read counts the out log only it will not see it (who decides the stream?). With the member absent a launch failure leaves requests pending and creation retries (AF-31's accepted cost). To nobody else. Nothing open to the owner.
- **Evidence run but not recorded.** None outstanding. The full gate was last run at `825a7d8` (1115 of 1115); `4f9ed85` changed only five comment lines in one test file (12 of 12 there).
- **Lessons to keep.** Read the criterion text a ruling points at (the plan's D36 limb (d), "at startup, before it serves a request") before choosing where the code goes; my first guard was lazy and refused service. A stub of a dependency's changed shape must leave the dependency working: rename the source in a copy and map `generic-pool` to it by a preload. A mutant's sed addresses are patterns, never compiled line numbers; read a mutant's first output lines before counting its kills. Name the mutant before writing the cell. `convention-check` flags comments moved with code; strip them when moving. `git commit --only` with a deleted path works after `git rm`. This session's helper command forms: `m8-local-probe/run.sh <repo> <scratch> <sha> <out>`, `m8-local-probe/m8-guard-mutants.sh <scratch> <sha> <out dir>`, `cr-m8-probes/run-attack.sh <scratch> <sha> <out>`, `impl-suite-run.sh <sha> <scratch> <prefix>`.
