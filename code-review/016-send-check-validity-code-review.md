---
ID: 016
Origin: 016
UUID: 54673438
Reviewed-At: "ee114ff — repos=website"
Status: In Review
Round: 1
Verdict: REJECTED
---

# Code Review: Plan 016, the send check refuses what Discord refuses

**Plan Reference**: `agent-output/planning/016-send-check-validity.md`, revision 6 (record `07e2e41`; read at record `a8468d0`, registrations to R-9, unchanged since by `git diff --quiet a8468d0 HEAD`)
**Implementation Reference**: `agent-output/implementation/016-send-check-validity-implementation.md` (record `1212bf6`, `Handoff-At: ee114ff — repos=website`)
**Date**: 2026-11-11
**Reviewer**: Code Reviewer (`code-reviewer-hooks-016`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T12:51 | steering-queue-hooks → code-reviewer-hooks-016 (brief `steering/queue-hooks-briefs/code-reviewer-016-brief.md`) | Round 1 at `Handoff-At` `ee114ff` | Round 1 REJECTED. CR-2 MEDIUM is under the severity floor: no case puts a fault before a valid sibling in any of the five list walks, so it blocks hand-off to QA. CR-1 MEDIUM: the fixture's header comment fails the comment gate and X-12 does not cover it. CR-3 LOW. Captures are in `verification/016/code-review-round1/`. |

## Scope of this round

Tree: website `ee114ff` (chain `chain/016-send-check-validity`, base `0e3d903`). It was read with `git show` / `git diff 0e3d903 ee114ff`. `git rev-parse HEAD` read `ee114ff…` at the start and again at the end, and `git status --porcelain` showed only `.playwright-mcp/`, another session's file.

Criteria assessed, as the plan states them at round open (revision 6): M1 AC1-1 to AC1-5, AC1-7, AC1-8, AC1-10, AC1-11; M1b AC1b-1 to AC1b-3; M2 AC2-1, AC2-2 (suite half), AC2-3. The following belong to other stages under the plan and are not assessed here: AC1-6, AC1-6p, AC1b-4, AC2-2's browser half (UAT), and AC1-9's differential (QA Phase 2). This round ran a narrower differential of its own, below. M3 is devops's.

Files reviewed: every path in the implementation document's Files Modified and Files Created tables. These match `git diff --numstat 0e3d903 ee114ff` (15 paths, the fixture included).

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` and `agent-output/architecture/website.md` (A-4, W-1, W-2). Both exist (`ls`).
**Alignment Status**: ALIGNED

- **A-4.** The new validator `validateV2Components` (in `src/utils/limits.tsx`) sits beside `validateComponentCount`. `validateMessage` calls it after that function, so all three production callers inherit it. Callers checked by `git grep -n -E '\bvalidateMessage\(|\bvalidateV2Components\b|\bisMessageValid\('` at `ee114ff`, outside tests:
  - `send/page.tsx` (`allowSave`)
  - `messageValidity.ts` (`isMessageValid`, inside its `try`/`catch`)
  - `shared.ts` (`valid:` on save)
  - `backfillValid.ts` (`classifyRow`)
  - the editor (`DiscordMessageEditor/index.tsx`, `v2ComponentError`)
- **No server-side refusal (W-2, D-10).** `shapes.ts` is not in the diff (`--numstat`). The save-schema guard is in `shapes.message-validation.test.ts` › "discordMessageShape description bound".
- **AC1-10.** `limits.tsx` imports `z` from `zod` and its bounds from `~/constants/messageLimits` only. I ran `npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits'); console.log('ok')"` in `website/` at `ee114ff`: it printed `ok`, exit 0.
- **L7 form (architect AF-2 option a).** `requiredUrl = z.string().trim().url()` is the same library predicate as `shapes.ts:linkButtonShape.url`.
  - `linkButtonReason` calls `new URL(requiredUrl.parse(...))` only after `requiredUrl.safeParse` has succeeded.
  - zod 3.22.4 (`node_modules/zod/lib/types.js`, the `url` check) is itself `new URL(input.data)` after `trim`. So is 3.25.76, the other 3.x version in the lockfile (`v3/types.cjs`).
  - So the throw cannot be reached under the declared dependency range (`^3.20.6`). This is no finding, by the disposition order's step 1.
- **The preview signal (AC1b-3).** `hideValidation` is one optional `VisualizerProps` input, defaulting to `false`.
  - Only `src/app/preview/page.tsx` passes it (`git grep -n hideValidation`, production: 9 hits, every one in the editor, `Author` or the preview page).
  - It reaches the classic `Author` through `ContentBody`'s `{...props}` spread, the existing route for `username` and `setUsername`.

## TDD Compliance Check

**TDD Table Present**: Yes
**All Rows Complete**: Yes, with one exemption row verified by execution (below)
**Concerns**: CR-2 (an untested property the rows' cases do not reach). `tdd-check.py` covers Python sources only and does not apply; I read the rows myself.

- **Exemption row `isV2Message` ("behaviour-preserving extraction"): verified by executing both trees.**
  - Instrument: `verification/016/code-review-round1/extraction-differential.js`, a seeded 20,000-member random corpus of message bodies. It is run from a `git worktree` export of each tree and compared by `extraction-compare.js`.
  - Result (`extraction-compare-output.txt`): `validateContentRequirements` differs on 0 of 20,000. `validateMessage` differs on 0 of the 4,188 classic members. It moves on 1,041 V2 members, every one from `''` at base to a refusal at the tip, so no existing reason string changed.
  - The comparator's own positive control is those 1,041 movements, which go through the same equality test.
  - Output hashes: `extraction-differential-outputs.sha256`. Re-running with seed `20261111` and n `20000` reproduces them.
  - This is not QA's AC1-9 instrument: classes (b) and (c) there are QA's.
- **Expectations independence.** The corpus cases take their verdict from each member's `discord` field. The reason-distinctness case compares against a hand-typed list of the existing strings. The 1024 and 1025 cases use literals. No expected value is computed from `MAX_COMPONENT_DESCRIPTION_LENGTH` or from the validator. Pass.
- **Bug-form tests.** None. Every new title is spec-form, and there are no `// escaped:` lines.
- **Test conventions** (`agent-output/CLAUDE.md`).
  - All five new basenames match the positive form.
  - The helper is under `src/utils/__tests__/helpers/`.
  - DOM tests mount with `mountDom` (`createRoot`/`act`).
  - ID-token class (case-insensitive, `grep -c -i -P`) over every changed test file: 0 in each, apart from the fixture's 120 `measuredOn` dates and 6 `"id"` values (`D1`–`D6`). Those are fixture data under the bounded exemption, not titles; titles use `$shape`.

## Findings

### Critical
None.

### High
None.

### Medium

**CR-2 MEDIUM Round 1 Checks That Cannot Fail**: no case places a fault before a valid sibling, so "every element is checked" has no failing assertion at any of the five list walks
- **Location**: `src/utils/limits.tsx` at `ee114ff`, in `validateV2Components` (top-level walk) and `componentReason` (Section `children`, Media Gallery `items`, Container `children`, Action Row `children`). Tests: `src/utils/__tests__/limits.v2-send-validity.test.ts` › `place` and `faults`, plus the corpus cases.
- **Class**: a selection over a list ("refuse when any element is faulty") whose fixtures put the faulty element only last, so a regression that reads one position passes the suite.
- **Enumeration**: `git grep -n -E '\.map\((componentReason|linkButtonReason|\(item\) => imageReason)' ee114ff -- src/utils/limits.tsx` gives 5 hits, the five walks. I probed each with a first-only and a last-only mutant in a `git worktree` export, reading every mutant back from disk (`positional-probe.sh`; output in `positional-probe-ee114ff/summary.txt`, `per-mutant-counts.txt` and the `*.diff` files).
  - Survived: `top-last`, `container-last`, `row-last`, `gallery-last`, `section-last` and `section-first` (each 0/331).
  - Killed: `top-first` 42, `container-first` 37, `row-first` 16, `gallery-first` 18.
  - The run covered only this test file, which includes all 120 corpus members.
  - What the predicate cannot see: walks written in another form (`for`, `some`, `reduce`). Today there are none in `limits.tsx`, which I read whole.
- **Issue**: AC1-2 and the ledger's Placement paragraph require refusal "at every placement … every item of a Media Gallery, not only the first". The code walks every element correctly today. But the property the change claims has no assertion that fails when it is lost: a last-only gallery read refuses no first-of-many faulty item and the suite stays green. By the severity floor (a behaviour the change relies on with no failing assertion), this is MEDIUM and blocks hand-off to QA.
- **Required Action** (test-only; production is correct):
  - **Minimum**: for each of the five walks, add constructed cases whose faulty element is neither first nor last in its list, with valid siblings on both sides. Example: three children with the fault in the middle; two in a Section, which holds at most 3 children. Expected value: refused (`not.toBe('')`).
  - **Falsity signature**: every one of the ten mutants in `positional-probe.sh` is killed. Re-run it against the fixed SHA's export (usage in its header) and record the summary.
  - Extend the existing `place`/`faults` table rather than adding a new describe (the pattern-ladder rule). The deweeder's table holds no removed case that covers this (`verification/016/deweed.md`, searched for position words).

**CR-1 MEDIUM Round 1 Comments**: the corpus fixture's four-line header comment fails the comment gate, and nothing in the plan covers that FAIL
- **Location**: `src/utils/__tests__/helpers/discordV2SendCorpus.ts`, the header comment (lines 1 to 4 at `ee114ff`; no symbol names the site). It comes from `agent-output/verification/016/corpus/make_fixture.py`.
- **Class**: prose source comments outside the `comment-gate.js` `ALLOW` list in files the chain adds or changes.
- **Enumeration**: `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=0e3d903` at `ee114ff` exited 1: 7101 FAIL, 0 CANDIDATE, 2 SKIP (`convention-check-ee114ff.txt`). Of those, `grep -c '^FAIL comment'` gives 1, this file. `node ~/.claude/tools/comment-gate.js … --files <fixture> --tests` lists 4 prose comments in it (`comment-gate-fixture.txt`). What the predicate cannot see: comments in files outside the chain's range.
- **Issue**:
  - The implementation document's Convention check section counts "7080 on the corpus fixture" and sends all of them to X-12. Measured, they are 7079 eslint FAILs plus this 1 comment-gate FAIL (`grep -c '^FAIL eslint src/utils/__tests__/helpers/discordV2SendCorpus'` gives 7079).
  - X-12 covers the fixture's eslint findings only, and AC1-11 is an eslint criterion. The comment rule is the owner's allowlist ruling: a rejected comment is removed or moved elsewhere, never bypassed.
  - The bytes are fixed by AC1-1 (sha256 `49b54f8e…`), so the implementer cannot edit the copy on its own.
- **Required Action**:
  - **Preferred (structural)**: `make_fixture.py` stops emitting the header comment. Its rationale already lives in `verification/016/README.md` ("corpus/", the `make_fixture.py` line), where the generator's description belongs. The fixture is regenerated and re-copied byte-identical. AC1-1's recorded sha256 and blob move with it.
  - That is a planner decision (AC1-1's identity), with QA owning the generator. The implementer carries it to the planner as it did the X-12 contradiction.
  - **Falsity signature**: `grep -c '^FAIL comment'` over the convention check's output is 0 at the fixed SHA, and Phase 2's sha256 check passes against the new recorded digest.
  - **Minimum**: none. Leaving the comment and widening X-12 to cover it is the bypass the rule excludes.

**CR-1 reconcile (2026-11-11T12:59, verdict unmoved):** plan revision 7 (record `9fd96d5`) records the regenerated fixture (QA record `188bc93`) as AC1-1's identity: sha256 `9ab22baa…`, blob `7fcf64f`, and it retires X-12. Read at record `HEAD`: that fixture holds 0 comment lines (`grep -c '^ *//'`), and its sha256 is `9ab22baa9c81157d09d38b2e0da655af8881bb28b389b8d6894d0d693fa77afe`. So the planner's and QA's parts of CR-1's Preferred action are done. What remains is the implementer's: copy that file byte-identical into the website and update the implementation document. The sub-entry checks the copy's digest and the convention check's `FAIL comment` count. Milestone M1 is capped by steering (rulings block "2026-11-11T12:59Z", record `855adb8`). CR-1 to CR-3 finish as started. A later finding on M1 below HIGH, other than a severity-floor finding, goes to the Planner batch.

### Low/Info

**CR-3 LOW Round 1 Naming**: two test titles claim a behaviour their assertion cannot observe
- **Location**: `ThumbnailEditor.description-limit.test.tsx` and `MediaGalleryEditor.description-limit.test.tsx`, the case "stops typing and pasting at 1024 characters".
- **Class**: a test title naming an observation (typing and paste stop) where the assertion reads a precondition (the `maxLength` attribute). jsdom applies no `maxLength` to input (plan QAF-7), and the observation is B-2's browser half.
- **Enumeration**: `git grep -n "stops typing" ee114ff -- 'src/**/__tests__/**'` gives 2 hits. What the predicate cannot see: other titles that overclaim in different words. I read every new title in the diff and found none.
- **Required Action**: retitle both to what is asserted, for example "caps the description input at 1024 characters". A test name names the surface and the behaviour under test.

**On the 21 pre-existing lint FAILs (the brief's candidate for a ruling): no finding.** I linted base and tip with eslint on stdin, so no file was written (`eslint-base-vs-tip.txt`). The counts are equal on all three files:
- `shapes.message-validation.test.ts`: 10 errors and 7 warnings at both; same rules, same lines; the chain's lines are appended after line 558.
- `ThumbnailEditor.tsx`: 0 errors and 2 warnings at both; the line numbers are shifted by 1 by the import.
- `MediaGalleryEditor.tsx`: 0 errors and 2 warnings at both.

AC1-11's per-file measure holds for these files, and X-10 is their carrier.

**Gate satisfied in this round (disclosed):** the record's stamp gate refused this document's first write because I had typed the changelog time (12:58) instead of reading the clock. The row now carries the `record-edit.js` `2026-11-11T12:51` minute.

**Reference-query instrument: not run.** `typescript-language-server` is not installed (the LSP tool returned `ENOENT`). The caller enumeration above rests on the text predicate plus `pnpm run typecheck`, which the implementer reports as exit 0 and which I did not re-run.

**Adversarial execution: not owed this round, with reason.**
- The irreversible acts, the Discord send (`sendWebhook.ts`) and the save (`upsertMessage`), are not in the diff.
- The change only narrows the predicate that enables Send.
- The predicate was executed over its input class, at the function: the corpus in the suite, plus this round's 20,000-member two-tree run.
- How the running page wires Send to the predicate is this round's Assumption Not Checked, routed to UAT.

## Verdict

**Status**: REJECTED
**Rationale**: CR-2 is a severity-floor finding. AC1-2's "every placement … every item" has no assertion that fails when a walk stops reading every element, and that blocks hand-off to QA. CR-1 is an allowlist FAIL whose remedy runs through the planner. The production code reads correctly, and the extraction is behaviour-preserving by execution.

## Required Actions

1. **CR-2** (implementer, test-only): add constructed cases with the fault neither first nor last at each of the five walks. Shown by `positional-probe.sh` killing all ten mutants at the fixed SHA.
2. **CR-1** (implementer to the planner; QA's generator): drop the fixture's header comment at `make_fixture.py`, regenerate, re-copy, and have the planner re-record AC1-1's digest. Correct the implementation document's 7080 attribution (7079 eslint plus 1 comment-gate).
3. **CR-3** (implementer): retitle the two description-limit cases.

## Assumption Not Checked

Round 1 assumes the following and does not test it: the send page disables Send exactly when `validateMessage(message.data)` refuses the stored data it loaded (`send/page.tsx`, `allowSave`), and the editor line shows the same refusal on that page.
- **Falsity signature**: in a browser walk of a local build, Send is enabled while the reason line shows, or disabled with no line.
- **Owner**: UAT, in QA register row B-1's walk (AC1-6).

## Next Steps

- **Implementer** (`implementer-hooks-016`): CR-2, CR-3 and the CR-1 hand-off to the planner. The re-verification is a sub-entry of Round 1, scoped to the fix diff, with the probe re-run.
- **Planner** (through the implementer): AC1-1's digest after CR-1's regeneration.
- **UAT**: this round's Assumption Not Checked, in B-1's walk.
- QA Phase 2 starts only on an approving sub-entry.
