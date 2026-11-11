---
ID: n/a
Origin: fix-website-save-gate-embeds
UUID: 07e578ce
Reviewed-At: 0e3d903 — repos=website; Round 1 first pass at 460000b, sub-entry 1 at 4b9fadd, sub-entry 2 at 963a25c
Status: In Review
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-website-save-gate-embeds

**Plan Reference**: none (fixer route). Scope: the bounded statement in
`steering/queue-hooks-briefs/fixer-save-gate-embeds-brief.md`, as revised by
`steering/queue-hooks-rulings.md` blocks 09:04Z (`43daf3d`), 09:23Z (`67220b7`) and 09:27Z (`93c81f3`).
**Implementation Reference**: `implementation/fix-website-save-gate-embeds-implementation.md` (record `790b1b0`)
**Date**: 2026-11-11
**Reviewer**: Code Reviewer (`code-reviewer-fix-website-save-gate-embeds`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T08:58 | steering-queue-hooks (brief `code-reviewer-save-gate-embeds-brief.md`) | Round 1: review the fix at `Handoff-At 460000b`, under-20 route (suite + red test run here) | Round 1 REJECTED on CR-1 (HIGH): the fix moves plan 013's owner-ruled row-E cell on the JSON surfaces, a design decision the fixer's brief required to be blocked on. The code is correct for the save defect, and the red and green runs reproduce. CR-2 (LOW, test placement) and CR-3 (LOW, 34 pre-existing lint FAILs, ruled lint-neutral and routed). Captures in `verification/fix-website-save-gate-embeds/code-review-round1/`. |
| 2026-11-11T09:04 | steering-queue-hooks (rulings block "2026-11-11T09:04Z — code review round 1 REJECTED; CR-1 decided", agent-output `43daf3d`) | CR-1 decided | Received, not a sub-entry. Verdict unmoved. Option (a) is excluded. The JSON surfaces stay as at `6d78b19` (D17, M8 reading (1) stands). For Save, the owner chose a narrower form than my (c): drop only the embeds that are empty by `hasClassicContent`, only beside V2 components, with no prompt; row D and the flag are untouched. This is criterion growth, recorded as such: the sub-entry assesses the revised statement and its limits, not the round-open criterion. The sub-entry's checks: the row differential re-run against `6d78b19` must show 0 cells moved on the JSON surfaces; a test must fail if a removal reaches an embed with content or a row-D save; the Minimum's two JSON-surface tests must state "lands V2 with no choice"; and CR-2. |
| 2026-11-11T09:21 | fixer-fix-website-save-gate-embeds (SendMessage; document record `a4d5774`) | Round 1 sub-entry at `4b9fadd` (revised statement, rulings `43daf3d`) | Sub-entry REJECTED. CR-1 dispositioned (0 of 800 resolver cells move against `6d78b19`), CR-2 dispositioned, CR-3 holds at 44 (lint-neutral). New: CR-4 HIGH, where Save writes a draft the editor does not hold, giving the saver a "Message Update Detected" prompt and leaving the send page refusing until reload; CR-5 LOW, a dead guard; CR-6 LOW, `NewMessageModal` ignores `gate.data`. Captures in `verification/fix-website-save-gate-embeds/code-review-round1-subentry/`. 21 production lines, so QA Phase 2 is owed after approval. |
| 2026-11-11T09:24 | steering-queue-hooks (rulings block "2026-11-11T09:23Z — selection 15", agent-output `67220b7`) | Fence answer | Received, not a sub-entry; the sub-entry verdict is unmoved. `commitSaveChoice` joins the fix by owner selection ("Agent: fix both paths now (Recommended)"), so CR-4's Preferred is the criterion: one shared save step for `saveMessage` and `commitSaveChoice` that stores the resolved data and sets the editor's message to it. CR-5 and CR-6 are inside the fence. Bearing on the sub-entry's Assumption Not Checked: `handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md` records the owner seeing the saving tab raise "Message Update Detected" against its own save (limb (d)). That is primary evidence that Pusher delivers to the saver. It is a different shape (nothing changed), so the assumption stays QA's for this shape. For the next sub-entry: limb (d)'s cause is unestablished. If CR-4's hash-equality assertion fails at the fixed tree for a reason other than the dropped data, that is limb (d), not CR-4. The test's base-tree control (`save-echo-hash.txt`, `6d78b19`: hashes equal for the unchanged save) is what separates the two. |
| 2026-11-11T09:41 | fixer-fix-website-save-gate-embeds (SendMessage; document record `790b1b0`) | Round 1 sub-entry 2 at `963a25c` (selection 15, rulings `67220b7`; mode by steering's 09:27Z ruling, `93c81f3`) | Sub-entry APPROVED_WITH_COMMENTS. CR-4, CR-5 and CR-6 dispositioned; every Round 1 finding is now dispositioned, so the document collapses to disposition lines (the arguments stay in `d1af1b3` and `65e719a`). Two INFO notes routed to QA Phase 2. Captures in `verification/fix-website-save-gate-embeds/code-review-round1-subentry2/`. 44 production lines against `6d78b19`, so QA Phase 2 is next. |
| 2026-11-11T10:08 | qa-fix-website-save-gate-embeds (SendMessage; QA record `6ed8112`) | Scoped check of a test-only diff, `963a25c..0e3d903` | Sub-entry 3, test-only, so no round opens. Verdict unmoved: APPROVED_WITH_COMMENTS. Disposition line under Findings. Captures in `verification/fix-website-save-gate-embeds/code-review-round1-subentry3/`. |

## Scope, identity and inputs

- **Tree**: website `963a25c` (`git rev-parse HEAD` = `963a25c3dc5a…` on `fix/website-save-gate-embeds`,
  `git status --short` empty), at the start and the end of this sub-entry. Files were read via
  `git show 963a25c:…`, and the probes ran in detached exports. Production against `6d78b19`, by
  `git diff --numstat`: `src/utils/index.ts` 19/4, `useApiMethods.ts` 15/7 (via `4b9fadd`),
  `MessageProvider/index.tsx` 8/1, `SaveAsMenu.tsx` 1/1, `NewMessageModal.tsx` 1/1. That is 44 added
  lines, so **QA Phase 2 is owed**. I did not run the suite (QA's). Its fixer capture is
  `round1-subentry3/suite-run.txt`, `suite exit=0`, not reproduced here.
- **Criterion assessed**: the 09:04Z statement (Save drops embeds that are all empty beside V2
  components, with no prompt; JSON surfaces as at `6d78b19`; row D and the flag untouched),
  extended at 09:23Z (the editor's two writers share one save step that stores the resolved data
  and sets the editor's message to it) and 09:27Z (that step sets the editor's mode from the stored
  data).
- **Architecture**: W-1, W-2/D-005 met. Nothing with content is removed without a choice, and the
  server is untouched. D17/M8 partition met: the resolver is unchanged against `6d78b19`. D-004's
  not-taken bit normalisation is not reintroduced: the bit is never changed by the drop, and row D
  is untouched. **Alignment Status**: ALIGNED.
- **TDD**: no TDD Compliance table on the fixer route (`fixer.md`); red, then green, is recorded per
  run in `round1-subentry3/red-summary.txt`. `tdd-check.py` is Python-only: N/A.

## Findings (Round 1, all dispositioned)

- CR-1 HIGH Round 1, row-E partition moved on the JSON surfaces. **Class gone**: the resolver
  differential gives 0 of 800 cells against `6d78b19`, at `4b9fadd` and again at `963a25c`
  (`code-review-round1-subentry/differential.txt`, `code-review-round1-subentry2/differential.txt`;
  positive control 144 at `460000b`, `code-review-round1/differential.txt`). Check:
  `JsonModalBody.conflict-resting-state` and `NewMessageJsonInput.conflict-resting-state`, "V2
  components beside an empty embed land as V2 with no choice" (red at `460000b`,
  `round1-rereview/red-summary.txt`).
- CR-2 LOW Round 1, test outside its module's `__tests__/`. **Class gone for this chain's files**:
  `MessageProvider.save-step` and `SaveAsMenu.empty-embeds-beside-v2` sit beside their modules. 7
  pre-existing members are routed to `INBOX.md` (entry 2026-11-11). Check: `no test`.
- CR-3 LOW Round 1, pre-existing eslint FAILs in touched files. **Ruled lint-neutral, accepted**: at
  `963a25c`, `convention-check --since=6d78b19` gives 86 FAIL (all eslint), 0 CANDIDATE, 1 SKIP. The
  eslint `--stdin` multiset over every touched file is 86 at `6d78b19` and 86 at `963a25c`, identical
  (`code-review-round1-subentry2/lint-multiset.diff` empty). Routed to `INBOX.md`. Check: `no test`.
- CR-4 HIGH Round 1, Save persisted data the editor did not hold. **Class gone**: `useApiMethods`'s
  `persist` is the one step both `saveMessage` and `commitSaveChoice` call. It sets the editor's
  message to the resolved data and its mode from `detectMessageMode`, then upserts. `git grep -n
  "upsertMessage(" 963a25c -- src/providers` gives 1 hit, inside `persist`. The re-attack is my own
  model (`save-step-echo.mjs`): the server-side hash (`optionalIdMessageShape.parse` of the upsert
  input) equals `usePusher`'s hash of the held message in all four cases (save with a drop, choice
  Classic, choice V2, save with nothing to drop), and the held message passes the send check
  (`save-step-echo.txt`). The same comparison at `4b9fadd` gave `promptShown: true`
  (`code-review-round1-subentry/save-echo-hash.txt`). Check:
  `MessageProvider/__tests__/MessageProvider.save-step.test.tsx`, on the real provider through
  `mountInMessageProvider`, 3 cases. All 3 are red at `4b9fadd` and under the write-back mutation,
  and the mode case is red under the mode-set mutation (`round1-subentry3/red-no-write-back.txt`,
  `red-no-mode-set.txt`).
- CR-5 LOW Round 1, a guard that could not fire. **Class gone**: `gateBeforePersist` now returns
  `dropEmptyEmbedsBesideV2(draft)` on every row, so the content guard decides the gate's output for
  row E. The re-attack is my own mutation (the guard deleted, `mut-no-content-guard.diff`): the row-E
  draft with `[{}, {title:'x'}]` goes from `dataEmbeds: [{}, {title:'x'}]` to `[]`
  (`save-step-echo.txt`). Check: "V2 components beside one empty and one real embed still ask, and
  persist nothing dropped", red under the fixer's guard mutation (`round1-subentry3/red-no-content-guard.txt`,
  1 failed).
- CR-6 LOW Round 1, `NewMessageModal` discarded `gate.data`. **Class gone**: `git grep -n -E
  "gateBeforePersist\(" 963a25c -- src ':!src/**/__tests__/**'` gives 3 callers, all of which
  submit `gate.data` or pass it to `persist`. Check: `no test` (the shape is unreachable there while the
  floor runs on the raw draft; that is the out-of-scope handoff).

- Scoped check, sub-entry 3 (`963a25c..0e3d903`, test-only: `utils.disposition-resolver.test.ts`
  6/0). QA's case "V2 components with no embeds key persist unchanged, with no choice" covers QAF-1
  (mutants on `dropEmptyEmbedsBesideV2`'s `!draft.embeds || draft.embeds.length === 0` return
  survived). It is spec-form, its expected value is a literal, it extends the existing file (no
  new file), and its title has 0 ID-token hits. Re-attacked with my own probe (`no-embeds-key.mjs`):
  at `0e3d903` the gate returns `mustAsk: false` with the draft unchanged, matching the case's
  literal. Under `||` → `&&` (`mut-or-to-and.diff`) it throws `TypeError: Cannot read properties of
  undefined (reading 'length')` (`no-embeds-key.txt`), so the case is red there. The production
  code at the tip is correct; the gap was coverage only. eslint over the file's blob is 32 at
  `963a25c` and 32 at `0e3d903`, identical. Check: that case.

### INFO, Round 1 sub-entry 2 (routed to QA Phase 2, no action owed by the fixer)

- **The editor shows the dropped state before the save resolves.** `persist` calls `setMessage`
  before `upsertMessage` returns, so on a failed save the editor already holds the resolved data,
  while `savedMessage` keeps the old row and the unsaved indicator stays on. For empty embeds
  nothing is lost. For a choice, the user chose the drop. This is a user-visible ordering, by read,
  not run: QA's to observe on a forced save failure.
- **The test's hash oracle is the client's normalisation, not the server's parse.**
  `MessageProvider.save-step` compares `normalizeForHash(held)` with `normalizeForHash(written)`,
  but the server broadcasts `hashMessage(optionalIdMessageShape.parse(input))`. My probe shows the
  two agree on these fixtures (`save-step-echo.txt`). Where they could differ in general is the
  2026-08-25 limb-(d) handoff's question, not this fix's.

## Verdict

**Status**: APPROVED_WITH_COMMENTS (Round 1, sub-entry 2 at website `963a25c`; sub-entry 3, a test-only scoped check, carries it to `0e3d903`).
**Rationale**: every Round 1 finding is dispositioned with a check that fails if its class returns.
The JSON surfaces are verified unchanged. Save and the choice save leave the editor holding exactly
what was stored, so the saver gets no reload prompt by the model and the send check passes over
the held message. Lint is neutral against the base. The comments are the two INFO items, for QA.

## Required Actions

None owed by the fixer. QA Phase 2 receives the two INFO items and both Assumptions Not Checked.

## Assumption Not Checked

- Round 1: This review assumes that the save-time "Choose which to keep" dialog (editor Save and
  Save-as) renders and works for row-E drafts as it did before this fix. I did not drive it in a
  browser. If this is false, a row-E Save shows no options or writes nothing. Owner: QA Phase 2.
- Round 1 sub-entry: This review assumes that Pusher delivers `message-update` to the client whose
  save triggered it. The owner's 2026-08-25 report (`handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md`,
  limb (d)) is evidence that it does, for a different shape. If this is false, CR-4's prompt limb
  was never live, and only the send-page and local-state limb was. Owner: QA Phase 2, by a browser
  save of a stored message in the shape, which must show no "Message Update Detected".

## Next Steps

- **QA Phase 2** (44 production lines): spawn cue to `steering-queue-hooks`, since no QA session is
  named for this chain. QA receives the INFO items and both assumptions above.
- Then **devops** at release, under the owner's approval. The owner's live-database check
  (rulings block 08:46Z, item 2) is carried there.

*Gate disclosure, Round 1*: the stamp-gate hook refused this document's first write because the
changelog stamp was typed, not read from the clock. I substituted the stamp with `date -u` output.
It is a gate whose remedy is the change it demands, so I satisfied it, not worked around it.
