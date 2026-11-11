---
ID: n/a
Origin: fix-website-save-gate-embeds
UUID: 07e578ce
Status: Blocked
Status-Detail: "Round 1 sub-entry REJECTED at 4b9fadd (CR-4 HIGH; CR-5, CR-6 LOW). CR-4 at saveMessage, CR-5 and CR-6 committed at website abdb71b (checkpoint, not handed off). commitSaveChoice joins the fix by selection 15 (rulings 67220b7). Blocked: BLOCKED to steering-queue-hooks at 09:31Z (msg bfcd2b1d) on whether the editor mode follows a Classic choice. Handoff held until that answer."
Handoff-At: 4b9fadd — repos=website
Origin-Chain: 013
---

# fix-website-save-gate-embeds — implementation

## Scope statement

**In force: the revised statement** (`steering/queue-hooks-rulings.md`, block "2026-11-11T09:04Z —
code review round 1 REJECTED; CR-1 decided", agent-output `43daf3d`). It replaces the first
statement, relayed to me by `steering-queue-hooks` by SendMessage. For Save, the route is the
owner's selection 13, "Agent: drop the empty embed (Recommended)". For the JSON surfaces, it is
steering's decision on plan 013 D17 ("fail gracefully when no content will be lost. If content must
be lost to fulfill the request, block, notify, and present the user with a choice.").

> A draft holding V2 components beside embeds that are all empty is saved as V2 without those
> embeds, with no prompt. The two JSON surfaces behave as at `6d78b19`.
> - Limits: only embeds that are empty by `hasClassicContent`'s own test are removed, and only where
>   V2 components are present. A row-D save (flag, content, no V2 components) is not touched and the
>   flag is not changed by this fix (plan 013 D19, D15). Nothing with content is removed (W-1).
> - If it cannot be built inside those limits, the fixer blocks and it returns to him.
> - The reviewer's Minimum stands in its second form: a test on each JSON surface for a V2 container
>   beside `{}` stating "lands V2 with no choice", by extending the two existing
>   `conflict-resting-state` tests.

The fence of the first statement still holds: repository `website` only. In: `src/utils/index.ts`,
`src/utils/limits.tsx`, their tests, and the gate's three callers only where its wiring requires.
Out: `src/server/**`, `project-utils`, `preview-image-generator`, and the two handoffs
(`components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`,
`newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`).

**Replaced: the first statement** (`steering/queue-hooks-briefs/fixer-save-gate-embeds-brief.md`;
route: selection 7): *"must not be saved in a state the send check refuses without the user being
shown a choice."* Round 1 was built to it (`460000b`). The reviewer's CR-1 rejected it because it
moved 013 M8's ruled partition on both JSON surfaces. Steering records that the framing was its own
error.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/queue-hooks-rulings.md`, block "2026-11-11T08:33Z — re-checks at website `6d78b19` and the scoping determinations", paragraph "Held item 4". Revised by block "2026-11-11T09:04Z — … CR-1 decided" (`43daf3d`), relayed by SendMessage from `steering-queue-hooks`. |
| 2 | Bounded scope statement | The revised statement, quoted above. |
| 3 | Fix branch | `fix/website-save-gate-embeds`, read by `git -C website branch --show-current` as my first act. HEAD `6d78b19`, `git status --short` empty. |

Read at start: the brief whole, the two rulings blocks, the lifecycle `SKILL.md` and its
`documents` and `seams` references, and the workspace `CLAUDE.md` (Test Conventions). Read for the
revision: the 09:04Z rulings block whole. Not read: `architecture/website.md` W-1/W-2 and
`system-architecture.md` D-005. I used them only as the brief and the block state them.

## Diagnosis

**Cause.** `hasClassicContent` (`src/utils/index.ts`, from `344e7b4`) ignores an embed whose every key
other than `_key` is empty. `validateContentRequirements` (`src/utils/limits.tsx`) counts every
embed. For V2 components beside `{}`, `{title:''}`, `{_key}` or `{fields:[]}`, the persist gate
(`resolveContentLoss`/`gateBeforePersist`, from `92ce026`, "013 M8 EC-3") settles to row B/C with
`mustAsk: false`. The editor's Save (`useApiMethods.saveMessage`) and Save-as (`SaveAsMenu.onSubmit`)
then persist the draft unchanged, and the send check refuses it ("Components V2 messages cannot
contain embeds or content.").

**Instrument.** Red run (A) under Test: at `6d78b19`, the mounted editor Save and the mounted Save-as
each write the draft with its empty embed (`expected [ {} ] to deeply equal []`). These are the same
four shapes the 013 probe named (`verification/013/probe-cr16-persist-gate/divergence.txt`).

**Reachability (from a read of the code paths, not run).** Add Embed shows only in Classic mode. V2
components can be added only in V2 mode. The Classic→V2 switch clears embeds. Both JSON load paths
apply the disposition, which clears embeds for a settled V2 draft. Every provider load runs
`detectMessageMode`. No UI route builds the draft. It is reached through a stored message (or a
local-store draft) already in that state, written by an older build or through the API, which does
not gate saves (W-2), and then saved.

**Residue in production.** The failing call is the `message.upsert` write. It persisted such a draft
unchanged, and nothing ran before or beside it. This fix repairs no stored row. A stored message in
that state is written without its empty embeds at its next editor Save or Save-as. Whether any
stored rows have this shape is the owner's to check against the live database. I have not read it.

**Direction.** Decided by the owner (Save) and by steering on D17 (JSON surfaces); see Scope
statement. An empty embed carries no content, so it is removed at Save without a prompt.

**Observed on the way, not absorbed (code read, not run).** A stored draft with the V2 flag, classic
content and no V2 components settles to row D. The editor's Save persists it unchanged with the
flag, and the send check refuses it. This is outside both statements. It went to steering at 08:46Z
(msg `f757a3cd`). The revised statement keeps row D untouched, and a test below shows it is.

## Change

Production, against `6d78b19`: 21 lines added, 6 removed (`git diff --numstat`: `index.ts` 19/4,
`useApiMethods.ts` 1/1, `SaveAsMenu.tsx` 1/1).

- `src/utils/index.ts`: the row-E condition is back as at `6d78b19`, so `resolveContentLoss`'s
  partition is unchanged. New `dropEmptyEmbedsBesideV2(draft)` returns the draft unchanged unless
  V2 components are present (`hasV2Components`), `embeds` is non-empty, and no embed passes
  `hasClassicContent({ embeds: [embed] })`. Then it returns `{ ...draft, embeds: [] }`. Flags, content
  and components are untouched. `gateBeforePersist` is now generic over the draft and returns `data`:
  the draft itself when a choice is required, otherwise `dropEmptyEmbedsBesideV2(draft)`.
- `src/providers/MessageProvider/useApiMethods.ts`: `saveMessage` persists
  `stripKeys({ ...draft, data: gate.data })`.
- `src/app/message/m/[id]/_components/SaveAsMenu.tsx`: `onSubmit` submits `gate.data`.
- `NewMessageModal.tsx`: not changed. Its Save is disabled for this draft by `contentFloorError` on
  the raw draft. That is the out-of-scope handoff, so its gate result is never reached for this shape.

Tests:
- `src/utils/__tests__/utils.disposition-resolver.test.ts`: the 4-shape `it.each` now states "persist
  as V2 without the embed, with no choice". New limit cases cover: a clear flag stays clear; one
  empty plus one real embed still asks, with nothing dropped; row D (flag, content, empty embed, no
  V2 components) is kept whole; an Action-Row-only draft keeps its empty embed.
- `src/providers/MessageProvider/__tests__/useApiMethods.save-empty-embeds.test.tsx`: new, a mount of
  the editor Save. It replaces `useApiMethods.save-choice.test.tsx` (`460000b`, moved at `08b0d7f`),
  whose assertion stated the rejected behaviour. It is deleted.
- `src/app/message/m/[id]/_components/__tests__/SaveAsMenu.empty-embeds-beside-v2.test.tsx`: new, a
  mount of Save-as that presses Save and reads the `message.upsert` input.
- `NewMessageJsonInput.conflict-resting-state.test.tsx` and `JsonModalBody.conflict-resting-state.test.tsx`:
  extended with "V2 components beside an empty embed land as V2 with no choice" (the reviewer's
  Minimum, second form).

No lifetime is added. No work is declined: the change removes a prompt path rather than adding one.

## Test

Spec-form (axiom B: no incident record cites the defect). The red runs are driven by
`verification/fix-website-save-gate-embeds/round1-rereview/red-export.sh`. Each run makes an
isolated `git worktree add --detach` export, overlays the final test files (`targets.txt`), runs
vitest under a `systemd-run --scope` with `RuntimeMaxSec=300`, captures to a file, and removes the
export. All captures are in that directory, with each export's tree in `red-<label>-tree.txt` and a
per-run list of failures in `red-summary.txt`.

| Run | Tree | Result | What it shows |
|---|---|---|---|
| (A) original | `6d78b19` + final tests | 10 failed / 38 passed, exit 1 | The editor Save and Save-as mounts are red: the empty embed is written. The 8 gate cases are red because `data` does not exist there. The JSON-surface cases are **green**: those surfaces behave as at `6d78b19`. |
| (B) rejected | `460000b` + final tests | 12 failed / 36 passed, exit 1 | Both new JSON-surface cases are red: they catch the Round 1 partition move. |
| (C) unwired | `6d78b19` callers + new `index.ts` + final tests | 2 failed / 46 passed, exit 1 | Only the editor Save and Save-as mounts fail: the caller wiring is what delivers the fix. |
| (M) no V2 guard | `4b9fadd`'s source with `dropEmptyEmbedsBesideV2`'s `hasV2Components` guard deleted (`red-no-v2-guard-mutation.diff`) | 2 failed / 46 passed, exit 1 | The row-D and Action-Row limit cases are red: they catch the guard being removed. |
| Green | shared tree at `4b9fadd` | 48 passed, exit 0 | `green-run.txt` |

Not separately discriminable: the "no embed with content" guard. Any draft holding such an embed
beside V2 components is row E, and the gate returns it unchanged before the helper runs. So
deleting that guard is not observable through the gate. The mixed-embeds case covers the outcome.

## Verification

Captures in `verification/fix-website-save-gate-embeds/round1-rereview/` (Round 1's first-pass
captures stay one level up).

| Check | Result | Capture |
|---|---|---|
| Whole suite, `npx vitest run --reporter=json` | 1142 / 1142 passed, 0 failed, 118 files; process exit 0 | `suite.json`, `suite-run.txt` |
| `pnpm run typecheck` (both programs) | exit 0 | `typecheck.txt` |
| eslint over the 8 touched files | exit 1, 44 findings, identical (file · message · rule) to the 44 from linting the six pre-existing files' `6d78b19` blobs through `--stdin`. The two new test files have none (after I fixed 4 of my own in the Save-as test before the commit). | `lint.txt`, `lint-base.txt`, `lint-diff.txt` (empty) |
| `convention-check.js website --since=6d78b19` | 44 FAIL (the 44 pre-existing eslint findings), 0 CANDIDATE, 1 SKIP | `convention-check.txt` |
| Build verification | The workspace `CLAUDE.md` names no pinned-build check for `website`. `next build` not run. No package-manager operation. | — |

The pre-existing lint findings are left unfixed. The reviewer ruled this lint-neutral and accepted
it (CR-3). This round adds 10 more pre-existing findings in the three files it newly touches
(`useApiMethods.ts`, `SaveAsMenu.tsx`, the two `conflict-resting-state` tests), all present at
`6d78b19`.

**SKIP, unchecked by the tool:** the ID-token and basename checks did not run. Read by eye: the new
basenames `useApiMethods.save-empty-embeds.test.tsx` and `SaveAsMenu.empty-embeds-beside-v2.test.tsx`
match the positive form, and no new title carries an ID token.

## User-visible flows

- **Editor → Save** on a stored V2 message that carries only empty embeds: it saves at once, as V2
  without those embeds, with no prompt. Before, it saved them and the message could not be sent.
- **Save as…** on the same message: the same, in the Save-as dialog.
- **Editor → JSON → Load**, and the **New Message dialog's JSON tab**, with such JSON: unchanged from
  `6d78b19` (it lands as V2 with no choice).
- **New Message dialog → Save** (bot, webhook or code tab): unchanged; still blocked by the content
  floor (out-of-scope handoff).
- A V2 message with one empty and one real embed: unchanged; the existing choice appears.

## Handoff

- SHA: website `4b9fadd` on `fix/website-save-gate-embeds` (Round 1 re-review, a sub-entry of
  Round 1).
- Reviews: `code-reviewer-fix-website-save-gate-embeds`. Then **QA Phase 2**: the revision adds 21
  production lines against `6d78b19`, which is above the brief's 20-line threshold.
- Merges: devops at release, under the owner's approval. The fix branch is deleted after the merge.

## Round 1 history

- `460000b`: row E widened to "V2 components beside any embed", per the first statement. REJECTED
  (CR-1 HIGH: 144 of 800 cells moved B/C→E on both JSON surfaces; CR-2 LOW: test placement; CR-3:
  pre-existing lint, ruled lint-neutral and accepted). Its captures are in
  `verification/fix-website-save-gate-embeds/` (`red-run.txt`, `green-run.txt`, `suite.json`, …).
- `08b0d7f`: CR-2, the test moved unchanged (`move-compare.txt`: identical pass set).
- `4b9fadd`: the revision to the revised statement, above. Its first-round test file is superseded.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-11T08:44 | fixer | Document created. Fix committed at website `460000b` (commit time). Handed off to code review. |
| 2026-11-11T09:01 | fixer | Code review Round 1 REJECTED at `460000b`. CR-2: test moved to `src/providers/MessageProvider/__tests__/` at website `08b0d7f`, sha256 unchanged; pass set identical before and after (1/1 passed, exit 0 both; `verification/fix-website-save-gate-embeds/move-compare.txt`); typecheck and eslint exit 0 after. CR-3 lint-breakdown correction applied. CR-1 held for steering's decision. Status → Blocked. |
| 2026-11-11T09:12 | fixer | CR-1 decided (rulings `43daf3d`); scope statement replaced. Revision committed at website `4b9fadd` (commit time): row E restored; Save drops embeds that are all empty beside V2 components; JSON-surface tests extended. Red (A)/(B)/(C)/(M) and green recorded under `round1-rereview/`. 21 production lines added, so QA Phase 2 is owed. Status → Active, Handoff-At → `4b9fadd`. |
| 2026-11-11T09:26 | fixer | Round 1 sub-entry REJECTED at `4b9fadd` (review record `65e719a`). Steering fenced CR-4 at `saveMessage`, CR-5 and CR-6 inside scope. Committed at website `abdb71b` (checkpoint): `saveMessage` sets the editor's message to `gate.data` when the gate changed it; `gateBeforePersist` always calls `dropEmptyEmbedsBesideV2`; `NewMessageModal.onSubmit` submits `gate.data`; `MessageProvider.save-empty-embeds.test.tsx` (provider mount, stored message with an id) replaces `useApiMethods.save-empty-embeds.test.tsx`. Captures in `verification/fix-website-save-gate-embeds/round1-subentry2/`: red (A) `6d78b19` 10 failed, (B) `460000b` 12, (C) unwired 2, (D) `4b9fadd` 1 (the provider test only), (M) no V2 guard 2, (M2) no content guard 1 (the mixed-embeds case), each exit 1; green 49/49 exit 0 (with `NewMessageModal.persist-gate-wiring`); suite 1142/1142 exit 0; typecheck 0; lint 44 = 44. CR-6 cannot be shown red through the UI: for this shape `NewMessageModal`'s Save is disabled by `contentFloorError`. Selection 15 (rulings `67220b7`) lifted the hold on `commitSaveChoice`; BLOCKED to steering on the editor mode after a Classic choice (msg `bfcd2b1d`). Status → Blocked. |
