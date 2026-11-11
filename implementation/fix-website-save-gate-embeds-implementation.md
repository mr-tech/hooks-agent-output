---
ID: n/a
Origin: fix-website-save-gate-embeds
UUID: 07e578ce
Status: Active
Status-Detail: "Re-handed off for the next Round 1 sub-entry re-review at website 963a25c (CR-4 both writers, CR-5, CR-6). 44 production lines added against 6d78b19, so QA Phase 2 is owed after review. Then the merge at release (devops, under the owner's approval)."
Handoff-At: 963a25c — repos=website
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

**Extended by selection 15** (`steering/queue-hooks-rulings.md`, block "2026-11-11T09:23Z — selection 15", agent-output `67220b7`; the owner's choice "Agent: fix both paths now (Recommended)"): *the editor's two persisting writers, `saveMessage` and `commitSaveChoice`, share one save step that stores the resolved data and sets the editor's message to it.* The 09:04Z statement's limits stand otherwise. Steering's ruling on my BLOCKED (block "2026-11-11T09:27Z", `93c81f3`, read from selection 15's words, not a new owner answer): the same step sets the editor's mode from the stored data. The setter passed into `useApiMethods` and its `MessageProvider` call site are wiring inside scope.

**Replaced: the first statement** (`steering/queue-hooks-briefs/fixer-save-gate-embeds-brief.md`;
route: selection 7): *"must not be saved in a state the send check refuses without the user being
shown a choice."* Round 1 was built to it (`460000b`). The reviewer's CR-1 rejected it because it
moved 013 M8's ruled partition on both JSON surfaces. Steering records that the framing was its own
error.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/queue-hooks-rulings.md`, block "2026-11-11T08:33Z — re-checks at website `6d78b19` and the scoping determinations", paragraph "Held item 4". Revised by block "2026-11-11T09:04Z — … CR-1 decided" (`43daf3d`) and extended by blocks "09:23Z — selection 15" (`67220b7`) and "09:27Z" (`93c81f3`), each relayed by SendMessage from `steering-queue-hooks`. |
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

Production, against `6d78b19` (`git diff --numstat`): 44 lines added, 14 removed. `index.ts` 19/4,
`useApiMethods.ts` 15/7, `MessageProvider/index.tsx` 8/1, `SaveAsMenu.tsx` 1/1,
`NewMessageModal.tsx` 1/1.

- `src/utils/index.ts`: the row-E condition is back as at `6d78b19`, so `resolveContentLoss`'s
  partition is unchanged. New `dropEmptyEmbedsBesideV2(draft)` returns the draft unchanged unless
  V2 components are present (`hasV2Components`), `embeds` is non-empty, and no embed passes
  `hasClassicContent({ embeds: [embed] })`. Then it returns `{ ...draft, embeds: [] }`. Flags, content
  and components are untouched. `gateBeforePersist` is generic over the draft and returns
  `data: dropEmptyEmbedsBesideV2(draft)` on every path (CR-5). On row E the helper's content guard
  returns the draft unchanged, so the guard is now observable.
- `src/providers/MessageProvider/useApiMethods.ts`: one shared step, `persist(draft, data)`. When
  `data` is not the draft's own data, it sets the editor's message to `{ ...message, data }` and its
  mode to `detectMessageMode({ data })`, as the provider's load path does. It then calls
  `upsertMessage({ message: stripKeys({ ...draft, data }) })`. `saveMessage` persists `gate.data`
  through it (CR-4). `commitSaveChoice` persists `applyDisposition(draft, mode)` through it
  (selection 15). The hook takes `setMessageMode` as a new last parameter. The dead commented-out
  `toastIdRef` parameter line next to it is deleted (see Verification, comment gate).
- `src/providers/MessageProvider/index.tsx`: passes `editableState.setMessageMode` into
  `useApiMethods`.
- `src/app/message/m/[id]/_components/SaveAsMenu.tsx`: `onSubmit` submits `gate.data`.
- `src/app/message/_components/NewMessageModal.tsx`: `onSubmit` submits `gate.data` (CR-6).

The step's `useCallback` has no dependencies. `setMessage` and `setMessageMode` are `useState`
setters, so they are stable. `upsertMessage` was captured the same way by `saveMessage` at `6d78b19`.

Tests:
- `src/utils/__tests__/utils.disposition-resolver.test.ts`: the 4-shape `it.each` states "persist as
  V2 without the embed, with no choice". Limit cases: a clear flag stays clear; one empty plus one
  real embed still asks, with nothing dropped; row D (flag, content, empty embed, no V2 components)
  is kept whole; an Action-Row-only draft keeps its empty embed.
- `src/providers/MessageProvider/__tests__/MessageProvider.save-step.test.tsx`: new, a real
  `MessageProvider` mount (`helpers/mountMessageProvider`) on a stored message with an id (`42`,
  through `message.getOne`). Three cases:
  - **Save, V2 beside `{}`:** written and held data have `embeds: []`, and the
    `hashMessage(normalizeForHash(…))` of what is held equals that of what was written.
  - **Choice save, Save as Classic, on V2 plus content:** written and held agree (hash equal),
    components are dropped, content is kept, and the mode is `classic`.
  - **Choice save, Save as Components V2:** the same with content dropped, and the mode is `v2`.

  It replaces `useApiMethods.save-empty-embeds.test.tsx` (`4b9fadd`), a bare-hook harness whose
  `setMessage: () => {}` could not see the editor's message, and then
  `MessageProvider.save-empty-embeds.test.tsx` (`abdb71b`). Both are deleted.
- `src/app/message/m/[id]/_components/__tests__/SaveAsMenu.empty-embeds-beside-v2.test.tsx`: new, a
  mount of Save-as that presses Save and reads the `message.upsert` input.
- `NewMessageJsonInput.conflict-resting-state.test.tsx` and `JsonModalBody.conflict-resting-state.test.tsx`:
  extended with "V2 components beside an empty embed land as V2 with no choice" (the reviewer's
  Minimum, second form).
- `src/utils/__tests__/useApiMethods.json-editor-repair.test.ts`: its hook call passes `() => {}` for
  the new parameter. No assertion changed.

No lifetime is added. Declined work: the choice save's hold (`pendingSaveChoice`) is unchanged from
`6d78b19`. The provider test follows one held save to its write (`commitSaveChoice` → `persist` →
`upsertMessage`).

## Test

Spec-form (axiom B: no incident record cites the defect). Driver:
`verification/fix-website-save-gate-embeds/round1-subentry3/red-export.sh` (a copy of the earlier
rounds' driver with a mutation-target argument; the earlier copies are unchanged). Each run makes an
isolated `git worktree add --detach` export of the named tree, overlays the final test files
(`targets.txt`, 7 files), applies the one-line `sed` mutation where named, runs vitest under a
`systemd-run --scope` with `RuntimeMaxSec=300`, captures to a file, and removes the export. The
shared tree was never moved. Each export's tree is in `red-<label>-tree.txt`, each mutation in
`red-<label>-mutation.diff` (one line removed each), and the failures per run in `red-summary.txt`.

| Run | Tree | Result (of 58) | What it shows |
|---|---|---|---|
| original | `6d78b19` | 12 failed, exit 1 | All three provider cases, Save-as and the 8 gate cases fail (`data` is absent there). The JSON-surface cases **pass**: those surfaces behave as at `6d78b19`. |
| rejected | `460000b` | 14 failed, exit 1 | Both JSON-surface cases fail too: they catch the Round 1 partition move. |
| tip-4b9fadd | `4b9fadd` | 3 failed, exit 1 | The three provider cases, i.e. CR-4 on both writers. The reviewer's required red at `4b9fadd`. |
| tip-abdb71b | `abdb71b` | 2 failed, exit 1 | Only the two choice-save cases: `commitSaveChoice` not yet on the shared step. |
| no-write-back | `963a25c`, the step's `setMessage` line deleted | 3 failed, exit 1 | All three provider cases. |
| no-mode-set | `963a25c`, `if (mode) setMessageMode(mode);` deleted | 1 failed, exit 1 | Only Save as Classic. The V2 case cannot see it, because its mode was already `v2`. |
| no-v2-guard | `963a25c`, the helper's `hasV2Components` guard deleted | 2 failed, exit 1 | The row-D and Action-Row limit cases. |
| no-content-guard | `963a25c`, the helper's content guard deleted | 1 failed, exit 1 | The mixed-embeds case (CR-5: observable now). |
| green | shared tree at `963a25c` | 58 passed, exit 0 | `green-run.txt` |

**CR-6 has no red.** For V2 components beside any embed, `NewMessageModal`'s Save is disabled by
`contentFloorError`, which is computed on the raw draft (the out-of-scope handoff). So the changed
line is not reached for this shape through the rendered UI. I make no claim about its effect.
`NewMessageModal.persist-gate-wiring.test.tsx` stays green.

**The reviewer's limb (d) note:** the hash-equality assertion holds on the fixed tree for all three
cases. No failure other than the dropped data appeared, so nothing was seen of the save-with-nothing-changed
prompt (`handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md`). That is not a
claim it is fixed: these fixtures change data on every save.

## Verification

Captures in `verification/fix-website-save-gate-embeds/round1-subentry3/` (the earlier rounds' are
in `round1-subentry2/`, `round1-rereview/` and one level up).

| Check | Result | Capture |
|---|---|---|
| Whole suite, `npx vitest run --reporter=json` | 1144 / 1144 passed, 0 failed, 118 files; process exit 0 | `suite.json`, `suite-run.txt` |
| `pnpm run typecheck` (both programs) | exit 0 | `typecheck.txt` |
| eslint over the 11 touched files | exit 1, 86 findings, identical (file · message · rule) to the 86 from linting the nine pre-existing files' `6d78b19` blobs through `--stdin`. The two new test files have none. I fixed my own findings before the commit: 2 at the `MessageProvider` call site, 3 in the provider test. | `lint.txt`, `lint-base.txt`, `lint-diff.txt` (empty) |
| `convention-check.js website --since=6d78b19` | 86 FAIL (the 86 pre-existing eslint findings), 0 CANDIDATE, 1 SKIP; no comment-gate failure | `convention-check.txt` |
| Build verification | The workspace `CLAUDE.md` names no pinned-build check for `website`. `next build` not run. No package-manager operation. | — |

The pre-existing lint findings are left unfixed (CR-3, ruled lint-neutral and accepted). The count
grows from 44 only because this round touches `MessageProvider/index.tsx`, `NewMessageModal.tsx` and
`useApiMethods.json-editor-repair.test.ts`, all of which carry findings at `6d78b19`.

**Gate satisfied, disclosed in this round:** the comment-gate hook refused my edit of
`useApiMethods.ts`'s parameter list. My hunk overlapped the pre-existing line
`// toastIdRef: React.MutableRefObject<null | Id>,`, a commented-out parameter that matches no
`ALLOW` entry. I met its standard by deleting that dead line, which changes no behaviour, and did
not reshape the edit to avoid the gate's view.

**SKIP, unchecked by the tool:** the ID-token and basename checks did not run. Read by eye: the new
basenames `MessageProvider.save-step.test.tsx` and `SaveAsMenu.empty-embeds-beside-v2.test.tsx`
match the positive form, and no new title carries an ID token.

## User-visible flows

- **Editor → Save** on a stored V2 message that carries only empty embeds: it saves at once, as V2
  without those embeds, with no prompt. The editor then shows what was saved. The saver no longer
  gets "Message Update Detected … reload?" for their own save, and the Send page accepts the message
  without a reload. (The Pusher delivery to the saving client is QA's to check in a browser, per the
  reviewer's Assumption Not Checked.)
- **Editor → Save → the choice dialog** (a V2 message with real content or embeds): after **Save as
  Classic**, the editor drops the V2 components it held and switches to Classic editing. After
  **Save as Components V2**, the editor drops the content and embeds it held and stays in V2 editing.
  Before, the editor kept the full mixed draft after the save. This change to shipped behaviour is
  the owner's selection 15, with the mode by steering's 09:27Z ruling.
- **Save as…** on a V2 message with only empty embeds: it saves at once as V2 without them. Save-as
  does not change the editor.
- **Editor → JSON → Load**, and the **New Message dialog's JSON tab**, with such JSON: unchanged from
  `6d78b19` (it lands as V2 with no choice).
- **New Message dialog → Save** (bot, webhook or code tab): unchanged for this shape; still blocked
  by the content floor (out-of-scope handoff).

## Handoff

- SHA: website `963a25c` on `fix/website-save-gate-embeds` (the next sub-entry of Round 1).
- Reviews: `code-reviewer-fix-website-save-gate-embeds`. Then **QA Phase 2**: 44 production lines
  added against `6d78b19`, above the brief's 20-line threshold. It covers both save paths and the
  browser check named above.
- Merges: devops at release, under the owner's approval. The fix branch is deleted after the merge.

## Round 1 history

- `460000b`: row E widened to "V2 components beside any embed", per the first statement. REJECTED
  (CR-1 HIGH: 144 of 800 cells moved B/C→E on both JSON surfaces; CR-2 LOW: test placement; CR-3:
  pre-existing lint, ruled lint-neutral and accepted). Captures are one level up.
- `08b0d7f`: CR-2, the test moved unchanged (`move-compare.txt`: identical pass set).
- `4b9fadd`: the revision to the 09:04Z statement. Sub-entry REJECTED (CR-4 HIGH: Save never wrote
  the stored data back to the editor; CR-5, CR-6 LOW). Captures in `round1-rereview/`.
- `abdb71b`: CR-4 at `saveMessage`, CR-5, CR-6. A checkpoint, not handed off. Captures in
  `round1-subentry2/`.
- `963a25c`: the shared save step for both writers, with the mode (selection 15; 09:27Z). Captures
  in `round1-subentry3/`.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-11T08:44 | fixer | Document created. Fix committed at website `460000b` (commit time). Handed off to code review. |
| 2026-11-11T09:01 | fixer | Code review Round 1 REJECTED at `460000b`. CR-2: test moved to `src/providers/MessageProvider/__tests__/` at website `08b0d7f`, sha256 unchanged; pass set identical before and after (1/1 passed, exit 0 both; `verification/fix-website-save-gate-embeds/move-compare.txt`); typecheck and eslint exit 0 after. CR-3 lint-breakdown correction applied. CR-1 held for steering's decision. Status → Blocked. |
| 2026-11-11T09:12 | fixer | CR-1 decided (rulings `43daf3d`); scope statement replaced. Revision committed at website `4b9fadd` (commit time): row E restored; Save drops embeds that are all empty beside V2 components; JSON-surface tests extended. Red (A)/(B)/(C)/(M) and green recorded under `round1-rereview/`. 21 production lines added, so QA Phase 2 is owed. Status → Active, Handoff-At → `4b9fadd`. |
| 2026-11-11T09:26 | fixer | Round 1 sub-entry REJECTED at `4b9fadd` (review record `65e719a`). Steering fenced CR-4 at `saveMessage`, CR-5 and CR-6 inside scope. Committed at website `abdb71b` (checkpoint): `saveMessage` sets the editor's message to `gate.data` when the gate changed it; `gateBeforePersist` always calls `dropEmptyEmbedsBesideV2`; `NewMessageModal.onSubmit` submits `gate.data`; `MessageProvider.save-empty-embeds.test.tsx` (provider mount, stored message with an id) replaces `useApiMethods.save-empty-embeds.test.tsx`. Captures in `verification/fix-website-save-gate-embeds/round1-subentry2/`: red (A) `6d78b19` 10 failed, (B) `460000b` 12, (C) unwired 2, (D) `4b9fadd` 1 (the provider test only), (M) no V2 guard 2, (M2) no content guard 1 (the mixed-embeds case), each exit 1; green 49/49 exit 0 (with `NewMessageModal.persist-gate-wiring`); suite 1142/1142 exit 0; typecheck 0; lint 44 = 44. CR-6 cannot be shown red through the UI: for this shape `NewMessageModal`'s Save is disabled by `contentFloorError`. Selection 15 (rulings `67220b7`) lifted the hold on `commitSaveChoice`; BLOCKED to steering on the editor mode after a Classic choice (msg `bfcd2b1d`). Status → Blocked. |
| 2026-11-11T09:35 | fixer | Selection 15 lifted the `commitSaveChoice` hold (rulings `67220b7`); steering ruled option 1 on my BLOCKED (09:27Z, `93c81f3`). Committed at website `963a25c` (commit time): one shared save step in `useApiMethods` for `saveMessage` and `commitSaveChoice` that sets the editor's message and mode to the stored data; `MessageProvider` passes `editableState.setMessageMode`; `MessageProvider.save-step.test.tsx` replaces `MessageProvider.save-empty-embeds.test.tsx`. Comment gate satisfied by deleting the dead `toastIdRef` comment line (disclosed under Verification). Captures in `round1-subentry3/`: red at `6d78b19` 12, `460000b` 14, `4b9fadd` 3, `abdb71b` 2; mutations no-write-back 3, no-mode-set 1, no-v2-guard 2, no-content-guard 1 (each exit 1); green 58/58 exit 0; suite 1144/1144 exit 0; typecheck 0; lint 86 = 86. 44 production lines added. Status → Active, Handoff-At → `963a25c`. Re-handed off to the reviewer. |
