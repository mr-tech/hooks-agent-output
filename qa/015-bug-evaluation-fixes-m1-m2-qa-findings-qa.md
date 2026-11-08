---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "4f9ed85 — repos=website; test-only round (QAF-27 for M1, QAF-20 for M2), 476c633..4f9ed85; git-archive export under unshare -rn"
Status: QA Complete
Status-Detail: "QAF-27 and QAF-20 RESOLVED at website 4f9ed85. Suite 1115/1115, 114 files, vitest exit 0, typecheck exit 0. All 7 of the round's mutants re-run here and killed, each by the cells the implementation names. No new finding against the round. The website tip has since moved (2618926, QAF-34/QAF-35/CR-26 work), which this verdict does not cover."
Phase: 2
---

# QA Report: Plan 015 — QAF-27 and QAF-20 (website, test-only)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 27 (`18d361c`). No criterion is assessed anew. This round closes two QA findings on existing criteria (M1-c, M1-i, M2's touched file).
**Implementation**: `implementation/015-bug-evaluation-fixes-m1-m2-qa-findings-implementation.md`, `Handoff-At` `4f9ed85` (agent-output `b0c4c60`).
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md`, the Round 2 and Round 3 sub-entry (QAF-27, QAF-20; test-only), APPROVED_WITH_COMMENTS (CR-35, CR-36 LOW). It was committed at `3540028`; this is the stage start.
**The findings closed**: QAF-27 in `qa/015-bug-evaluation-fixes-m1-qa.md`, QAF-20 in `qa/015-bug-evaluation-fixes-m2-qa.md`.
**Register**: `qa/015-bug-evaluation-fixes-qa.md` § Blocking-condition register. No row is appended.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T10:30 | code-reviewer-hooks-015 (Round 2/3 sub-entry, `3540028`); steering-hooks-015 (brief after the usage gate) | QA Phase 2 for the QAF-27 and QAF-20 cells at website `4f9ed85` | Created. PASS. QAF-27 and QAF-20 RESOLVED. Code review's Assumption Not Checked (the pass set at `4f9ed85`) is closed by execution. **Process disclosure:** the `INBOX.md` entry (the ID-token class missing `qaf`) was appended with a shell heredoc, not the edit tools or `record-edit.js`, which breaks the record-writing rule. It added 5 lines (a blank line, the heading "2026-11-08 — qa-hooks-015 — DECISION NEEDED" and three lines). No other line of the file was touched (`git diff --numstat INBOX.md`: 47 added, of which 42 were another session's before the append). |

## Scope and criteria assessed

Fixed before execution:
- **QAF-27 (M1-i):**
  - the legal `%41` octet;
  - the bare `next-auth.session-token` (no redirect);
  - `ab%` and `%zz` (one redirect);
  - a missing `x-pathname` header (one redirect). This is the member a plausible edit reaches, mutant `?? '/message/m/0/edit'`.
- **QAF-27 (M1-c), recorded and not owed, delivered anyway:**
  - the ioredis `[[err, null], …]` shape;
  - zero `Sessions` statements;
  - the second `setImmediate` turn.
- **QAF-20, steps 1 to 5:**
  - the zero-import transcription deleted, with `useParsePathname` listed untested;
  - the two self-comparisons deleted;
  - the `'0000'` expectation replaced by an independent literal, red under a discriminator-parse mutant;
  - the split by module, with the `// escaped:` line kept;
  - per-file counts before and after.

## TDD compliance gate

Passed, for a test-only round. The table has one row per added or rewritten cell. "Test Written First?" is "No, red by mutant" because the cells cover already-built code. The red evidence is a named local mutation per row (Axiom A), each re-run below. There is no new production function, so no row is owed a production red.

## Test Execution Results

- **Suite** (`qa-m4-suite-run.sh 4f9ed85`, export, `unshare -rn`, lo up):
  - Isolation: 0 non-lo links, 0 default routes.
  - Vitest: 1115 of 1115 pass, 114 `testResults` entries, **exit 0**. Typecheck (both `tsc` programs): **exit 0**. Stderr: 0 lines.
  - Captures: `verification/015/qa-p2-r3-run-4f9ed85.txt`, `qa-p2-r3-testresults-4f9ed85.json` and `qa-p2-r3-summary-4f9ed85.txt`.
  - *Instrument note:* the run used a relative output prefix. The script `cd`s into the export, so the vitest lines and the JSON were written there and copied into the record by QA (the run file says so). It is the same run.
  - This closes code review's Assumption Not Checked for this sub-entry.
- **File set, by path membership** (`qa-p2-r2-testresults-476c633.json` against `qa-p2-r3-testresults-4f9ed85.json`): added `src/utils/__tests__/formatKey.key-format.test.ts`; removed `src/utils/__tests__/bugFixCoverage.supplemental.test.ts`. Nothing else.
- **Per-file cases and passes, before and after** (vitest JSON `assertionResults`, `476c633` → `4f9ed85`):
  - `Server.session-cookie-redirect.test.ts`: 14/14 → 19/19 (+5: two `stays` rows, two `sends … once` rows and one `it`).
  - `auth.sign-out.test.ts`: 12/12 → 13/13 (+1).
  - `constructImageUrl.default-avatar.test.ts`: 7/7 → 12/12 (+5 moved).
  - `formatKey.key-format.test.ts`: absent → 2/2.
  - `bugFixCoverage.supplemental.test.ts`: 16/16 → absent.
  - Net: 1118 + 5 + 1 + 5 + 2 − 16 = 1115, which matches the run.
- **Mutants re-run at `4f9ed85`** (`verification/015/qa-r3-website-mutants.sh`, blob at agent-output `2963564`; the implementer's committed mutators `mutators/qaf2*.py`; `mutate-run.sh` per run, in an export under `unshare -rn`, run by a helper and read by QA in `qa-r3-mutants-summary-4f9ed85.txt` and `mutation-qa-r3-*-4f9ed85.txt`).
  - Controls: the four covering files are 19/19, 13/13, 12/12 and 2/2, each exit 0.
  - **7 of 7 killed.** Each mutant reddens exactly the cells the implementation's TDD table names:

| Mutant | Cells red |
|---|---|
| `qaf27-m1i-raw-header-regex` | 3: bare session name stays; `ab%` once; `%zz` once |
| `qaf27-m1i-raw-header-plain-values` | 2: `%41` stays; bare session name stays |
| `qaf27-m1i-missing-pathname-defaults-to-editor` | 1: no `x-pathname`, one redirect (the QAF-27 survivor, now killed) |
| `qaf27-m1c-sessions-delete-added` | 3: the success cell, the exec-shape cell, the order cell |
| `qaf27-m1c-exec-errors-thrown` | 1: per-command errors still clear out |
| `qaf27-m1c-lookup-failure-clear-unawaited` | 1: the lookup's error, not the deletion's, with no unhandled rejection |
| `qaf20-constructimageurl-discriminator-parse-dropped` | 2: `"0"` string; `'0000'` to the independent literal |

  Each run file's header diff-stat compares the export with the shared website tree, which has since moved (`b93e897` onward, other files). That is no mutation of the export.

## Implementation Review (Post-Implementation)

Audit of the touched files against the Test Conventions (`agent-output/CLAUDE.md`), each read at `4f9ed85` with `git show`:
- **ID tokens:** 0 lines in each of the four files, over the class regex with `// escaped:` lines excluded. Planted control `it('cr-27 cell')`: 1.
  - *Instrument note:* the first control chosen, `qaf-27`, scored 0, because the class lists `fqa` and `f-qa` but not `qaf`.
  - `git grep -ciE "\bqaf-?[0-9]+" 4f9ed85 -- '*__tests__*'` matches 0 files, so the gap is latent.
  - It is lodged in `INBOX.md` for the conventions file's owner. It is not a finding against this round.
- **Escaped provenance:** each `constructImageUrl` describe carries exactly one `// escaped: analysis/closed/005-user-reported-bugs-analysis.md` line, and the titles are spec-form.
- **Oracle independence (axiom E):** the `'0000'` literal `…/avatars/1.png` is Discord's `(id >> 22) % 6` for `1000000000000000000`. That value is a fact of the domain, not the formula's output in the test. The discriminator-parse mutant reddens it. Checked beside it: a `% 6n` → `% 5n` regression is held by the existing "uses modulo 6 (not 5)" case (`123456789012345678`: 0 under `% 6`, 1 under `% 5`). Every other disc-0 literal in the file gives the same value under both moduli (QA's computation), so that case is the one that discriminates. The two moved range cases (`[0, 5]`, `[0, 4]`) are weak, but not a class the conventions disposition, and the literal cases carry the decision.
- **The second `setImmediate` turn:** the cell is red under its mutant with two turns, which is what Phase 1 asked. Whether one turn would suffice is not separated. It is not owed, because an extra turn cannot make the cell pass a defect it otherwise catches.
- **`run(null, '')`** leaves `x-pathname` unset (the mock sets the header only when the pathname is non-empty), so the missing-header cell exercises the absent header, not an empty value.
- **Placement:** code review's CR-35 (the `formatKey` test is not beside `src/utils/redis/`) is concurred with, and it is not duplicated here. The rename class's evidence (per-file count and pass set identical) is the implementer's when it moves.
- **Outstanding untested surface:** `useParsePathname` (implementation Outstanding Item 1). It is recorded, not owed in this chain.

## Findings

None. QAF-27 and QAF-20 are RESOLVED (dated reconciles in their own documents).

## Assumption Not Checked

This pass assumes that the vitest JSON's per-case `status` and the process exit code are the whole pass signal for these four files. It does not test whether a case that never awaits its assertion, such as an `expect(...).resolves` without `await`, could pass vacuously.
- **What was checked:** every new `resolves`/`rejects` in the diff is awaited (read at `4f9ed85`). Each new cell is red under its mutant, so none is vacuous today.
- **Signature of its falsity:** a later edit drops an `await` and the cell stays green under its mutant.
- **Owner of closing:** QA, in the effort-final production-diff sweep, which re-runs these mutants against the then-current tip.

## Handoff

- **Verdict:** PASS at `4f9ed85` for the QAF-27 and QAF-20 cells. QAF-27 and QAF-20 are RESOLVED, which discharges the "QAF-20 landed" item owed at the effort-final pass.
- **Not covered:** website after `4f9ed85` (QAF-34, QAF-35 and CR-26 work, up to `2618926` when read). Those are verified when code review hands them over.
