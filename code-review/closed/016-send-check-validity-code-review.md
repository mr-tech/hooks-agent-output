---
ID: 016
Origin: 016
UUID: 54673438
Reviewed-At: "395510e — repos=website; Round 1 at ee114ff, its fix sub-entry at 395510e"
Status: Released
Status-Detail: "Round 1 APPROVED at website 395510e (REJECTED at ee114ff; fix sub-entry approved at 395510e). Released at devops Phase 2D (pushed 2026-11-11T18:29:46Z). The Assumption Not Checked was closed by UAT's B-1 send-gate pair."
Round: 1
Verdict: APPROVED
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
| 2026-11-11T13:03 | implementer-hooks-016 → code-reviewer-hooks-016 (message; implementation record `fe06be0`, `Handoff-At 395510e`) | Round 1 fix sub-entry over `ee114ff..395510e` | Round 1 sub-entry APPROVED at `395510e`. Test-only fix. CR-2: positional probe re-run by me, 10 of 10 mutants killed, control 0 of 334 failed. CR-1: fixture `cmp`-identical to record `188bc93`, `FAIL comment` 0. CR-3: retitled. Plan read at revision 7. |
| 2026-11-11T14:19 | devops-hooks-016 | Stage 1 commit record | Status Committed at website `395510e`; no push, no merge. Document moved to `code-review/closed/`. |
| 2026-11-11T18:30 | devops-hooks-016 | Release record | Status Released: website `master` pushed `0e3d903` -> `395510e` at 2026-11-11T18:29:46Z on the owner's release answer (selection prompt, 18:29Z); `deployment/016-send-check-validity-deployment.md`. |

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

CR-2 MEDIUM Round 1 RESOLVED: the fault now sits between valid siblings at every walk, including a new `section` placement for the Section-children walk (website `64a3d26`, test-only; `limits.tsx` is byte-unchanged over `ee114ff..395510e`). Test that fails if the class returns: `positional-probe.sh`, which I re-ran myself in a fresh export of `395510e`. All 10 mutants were killed, and the unmutated control was 0 failed of 334 (`verification/016/code-review-round1/positional-probe-395510e-reviewer/`).
CR-1 MEDIUM Round 1 RESOLVED: the website fixture is byte-identical to the regenerated one (`cmp` against record `188bc93`; sha256 `9ab22baa…`, blob `7fcf64fb…`, equal to plan revision 7's AC1-1). It has 0 comment lines, and at `395510e` the convention check reports `FAIL comment` 0 and fixture eslint 0 (`convention-check-395510e.txt`). Test that fails if the class returns: the convention check, plus Phase 2's sha256 check.

### Low/Info

CR-3 LOW Round 1 RESOLVED: both titles now read "caps the description input at 1024 characters" (`395510e`; `git grep "stops typing"` returns 0 hits). No test (a title).

### Round 1 argument (retired)

The full argument for CR-1 to CR-3 is in this document as committed at record `0ccd5ee`. The Round 1 probe captures stay at `verification/016/code-review-round1/positional-probe-ee114ff/`.

Steering capped milestone M1 (rulings block "2026-11-11T12:59Z", record `855adb8`). From that block on, an M1 finding below HIGH, other than a severity-floor finding, goes to the plan's Planner batch.

### Notes

**On the 21 pre-existing lint FAILs (the brief's candidate for a ruling): no finding.** I linted base and tip with eslint on stdin, so no file was written (`eslint-base-vs-tip.txt`). The counts are equal on all three files:
- `shapes.message-validation.test.ts`: 10 errors and 7 warnings at both; same rules, same lines; the chain's lines are appended after line 558.
- `ThumbnailEditor.tsx`: 0 errors and 2 warnings at both; the line numbers are shifted by 1 by the import.
- `MediaGalleryEditor.tsx`: 0 errors and 2 warnings at both.

AC1-11's per-file measure holds for these files, and X-10 is their carrier.

**Gate satisfied in this round (disclosed):** the record's stamp gate refused this document's first write because I had typed the changelog time (12:58) instead of reading the clock. The row now carries the clock minute, which `record-edit.js` substituted.

**Reference-query instrument: not run.** `typescript-language-server` is not installed (the LSP tool returned `ENOENT`). The caller enumeration above rests on the text predicate plus `pnpm run typecheck`, which the implementer reports as exit 0 and which I did not re-run.

**Adversarial execution: not owed this round, with reason.**
- The irreversible acts, the Discord send (`sendWebhook.ts`) and the save (`upsertMessage`), are not in the diff.
- The change only narrows the predicate that enables Send.
- The predicate was executed over its input class, at the function: the corpus in the suite, plus this round's 20,000-member two-tree run.
- How the running page wires Send to the predicate is this round's Assumption Not Checked, routed to UAT.

## Verdict

**Status**: APPROVED (Round 1 fix sub-entry, at website `395510e`)
**Rationale**: Round 1 at `ee114ff` was REJECTED on CR-2, a severity-floor finding, and on CR-1. The fix range `ee114ff..395510e` touches only test files and the fixture: 4 paths by `--numstat`, and production is byte-unchanged. It resolves all three findings, each re-verified by my own instrument run. Production code was approved as read in Round 1, and the extraction is behaviour-preserving by execution.

**Sub-entry scope.** I verified the fix diff only:
- `git log ee114ff..395510e`: `64a3d26`, `395510e`
- `git rev-parse HEAD` = `395510e…` at the start and at the end
- plan read at revision 7 (record `9fd96d5`); the delta changes AC1-1's recorded fixture identity and AC1-11/X-12, and both were checked above

The suite (1506/1506, exit 0) and the typecheck (exit 0) are the implementer's figures (`verification/016/implementer-fix-r7/`), not re-run by me.

## Required Actions

None.

## Assumption Not Checked

Round 1 assumes the following and does not test it: the send page disables Send exactly when `validateMessage(message.data)` refuses the stored data it loaded (`send/page.tsx`, `allowSave`), and the editor line shows the same refusal on that page.
- **Falsity signature**: in a browser walk of a local build, Send is enabled while the reason line shows, or disabled with no line.
- **Owner**: UAT, in QA register row B-1's walk (AC1-6).

## Next Steps

- **QA Phase 2** (`qa-hooks-016`) at website `395510e`.
- **UAT**: this round's Assumption Not Checked, in B-1's walk.
