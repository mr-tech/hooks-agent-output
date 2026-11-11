---
ID: n/a
Origin: fix-website-save-gate-embeds
UUID: 07e578ce
Verified-At: "0e3d903 — repos=website; production files identical to 963a25c (git diff --numstat 963a25c 0e3d903: one test file, 6/0)"
Status: Committed
Status-Detail: "Phase 2 PASS at website 0e3d903, committed with the chain (devops Stage 1, 2026-11-11T10:12Z). QAF-1 resolved in the pass. Assumption Not Checked (Pusher on hooks.gg) is carried by deployment/fix-website-save-gate-embeds-deployment.md, Owner checks."
Phase: 2
---

# QA Report: fix-website-save-gate-embeds

**Plan Reference**: none (fixer route). Scope: `steering/queue-hooks-rulings.md` blocks "2026-11-11T09:04Z — code review
round 1 REJECTED; CR-1 decided", "2026-11-11T09:23Z — selection 15" and "2026-11-11T09:27Z — fixer BLOCKED on the
editor's mode", read at the file this pass.
**Implementation Reference**: `implementation/fix-website-save-gate-embeds-implementation.md` (record `d89d629`, `Handoff-At: 963a25c`).
**Code review**: `code-review/fix-website-save-gate-embeds-code-review.md` (record `5849cb7`), `Verdict: APPROVED_WITH_COMMENTS`, `Reviewed-At: 963a25c`.
**Brief**: `steering/queue-hooks-briefs/qa-save-gate-embeds-brief.md`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T10:02 | steering-queue-hooks (brief above; stage start = the review's committed verdict at `Reviewed-At 963a25c`, re-derived: `git rev-parse HEAD` = `963a25c3…`, tree clean) | Phase 2 on a fixer chain (44 production lines) | Phase 2 PASS at `0e3d903`. Suite 1144/1144, exit 0 at `963a25c`; typecheck 0. Sweep: 19 of 22 killed; 2 survivors closed by QA's case at `0e3d903` (QAF-1 MEDIUM, resolved), 1 equivalent by reachability. Browser walk on a local build: both of the reviewer's Assumptions Not Checked closed, with a base-tree red; the first INFO item observed. Captures in `verification/fix-website-save-gate-embeds/qa-phase2/`. |
| 2026-11-11T10:12 | devops | Document closed (Stage 1). Status: Committed. Verdict unchanged. Release-tip record: `qa/website-2026-11-11-release-tip-qa.md` (`fc154a2`). |

## Route and what this pass is

A `fixer` task: no plan, no Phase 1, no UAT, by the owner's scoping determination ("Held item 4": "QA Phase 2 only if the
fix adds 20 or more production lines"). This is a post-implementation audit, not the two-phase record the QA process
prescribes. Re-derived: `git diff --numstat 6d78b19 963a25c` over the five production files gives 19+15+8+1+1 = **44**
added lines. What a Phase 1 would have changed: the `embeds`-absent input (QAF-1) is the case a strategy written from
`gateBeforePersist`'s `Partial` contract would have named before implementation.

Read before acting: brief whole; the three rulings blocks and "Held item 4"; the review document whole; the
implementation document whole; the lifecycle `SKILL.md`, `delegation.md`, `verdicts.md`, `findings.md`;
`stage-procedures/agent-browser.md`; workspace `CLAUDE.md` Test Conventions. **Not read**: `architecture/website.md`
W-1/W-2/A-4 and `system-architecture.md` D-005 beyond Runtime Flow 1b (Pusher), which I read; W-1/W-2 are used here only
as the rulings blocks state them. No `deweed.md` exists for this chain.

**TDD gate.** On a `fix-` chain the evidence is the fixer's Test section: red runs at `6d78b19`, `460000b`, `4b9fadd`,
`abdb71b` and four mutations, green 58/58 exit 0 (implementation document, Test table). Present; not re-run case by case.
The sweep below re-observes every guard red independently.

## Criteria assessed (listed before execution)

1. **C1** A draft with V2 components beside embeds that are all empty (by `hasClassicContent`) saves as V2 without them,
   with no prompt — editor Save and Save-as.
2. **C2** Limits: only all-empty embeds, only where V2 components are present; row D untouched; the flag not changed;
   nothing with content removed.
3. **C3** The JSON surfaces behave as at `6d78b19`.
4. **C4** `saveMessage` and `commitSaveChoice` share one step that stores the resolved data and sets the editor's message
   to it (selection 15), and its mode from the stored data (09:27Z).
5. **C5** (review, Assumption 1) The save-time choice dialog renders and works for a choice draft.
6. **C6** (review, Assumption 2) The saving client receives its own `message-update` and is not prompted.
7. **C7** (review, INFO 1) On a failed save the editor already shows the resolved data, and the unsaved indicator stays on.

**Class per criterion.** C1's class is "embeds every one of which has no non-`_key` value other than `undefined`, `''`,
`null` or `[]`" (`hasClassicContent`'s own test). The gate's `it.each` covers `{}`, `{title:''}`, `{_key}`,
`{fields:[]}`; the drop helper delegates membership to `hasClassicContent`, so the class is enumerated by that predicate,
not by the fixtures. Residue (not blocking): `null`-valued and multi-embed all-empty members are not fixtures; the `.some`
→ `.every` mutant (H9) is killed. C2's class includes the input "V2 components with no `embeds` key", admitted by the
`Pick<Partial<MessageData>>` contract and not normalised by `makeEditable` (`src/utils/index.ts`, read at `963a25c`):
QAF-1.

## Test Execution Results

| Run | Tree | Result | Capture |
|---|---|---|---|
| Whole suite, `npx vitest run --reporter=json` | `963a25c` (shared tree, clean) | 118 files (`testResults`), 1144 / 1144 passed, 0 failed; **exit 0** | `qa-phase2/suite.json`, `suite-exit.txt` |
| `pnpm run typecheck` (both programs) | `963a25c` | exit 0 | `typecheck-log.txt`, `typecheck-exit.txt` |
| Whole suite with QA's case | `0e3d903` content | 118 files, 1145 / 1145, **exit 0**; typecheck exit 0 | `suite-qaf1.json`, `suite-qaf1-exit.txt` |
| eslint, the one file QA changed, against its `963a25c` blob via `--stdin` | `0e3d903` | 34 findings both sides, multiset diff empty (lint-neutral) | `lint-qaf1*.txt`, `lint-qaf1-multiset.diff` |

The fixer's 1144 / 118 re-derived here, not carried.

**Test audit (touched surface, Test Conventions).** Six test files touched in `6d78b19..0e3d903`. Placement: all under
`__tests__/` beside their modules, except `src/utils/__tests__/useApiMethods.json-editor-repair.test.ts`, a pre-existing
CR-2 member already routed to `INBOX.md` by the reviewer. Basenames match the positive form, 6 of 6. ID-token class over
every line of the six files: 0 hits, with a positive control that fires on 2 of 2 planted members (`conv-idtoken.txt`).
Spec-form throughout; no bug-form title (axiom B). Expected values are literals, independent of the code under test
(axiom E). Mounting: the provider test mounts the real `MessageProvider` (`mountInMessageProvider`); Save-as mounts the
real component. No time-based cell.

## Irreversible Side-Effect Register

| ID | Effect | Guard (path · symbol) | Swept |
|---|---|---|---|
| I-1 | `message.upsert` overwrites the stored row's `data` without its empty embeds (editor Save, Save-as) | `src/utils/index.ts` · `dropEmptyEmbedsBesideV2` (V2 guard, embeds-present guard, content guard); `gateBeforePersist` `data`; callers `useApiMethods` `saveMessage`, `SaveAsMenu` `onSubmit`, `NewMessageModal` `onSubmit` | mutants 4–11, H7–H11 |
| I-2 | `message.upsert` overwrites the stored row with the class the user chose to keep (choice save) | the choice itself (`gateBeforePersist` `mustAsk`, unchanged); `useApiMethods` · `persist`, `commitSaveChoice` | mutants 1–3, H1–H6 |

## Mutation sweep

**Scope**: the production diff `6d78b19..963a25c` — `src/utils/index.ts`, `src/providers/MessageProvider/useApiMethods.ts`,
`src/providers/MessageProvider/index.tsx`, `src/app/message/m/[id]/_components/SaveAsMenu.tsx`,
`src/app/message/_components/NewMessageModal.tsx`. Ran in `git archive` exports through `mutation-run.py` (blob
`b47679a2`), mutants file blob `0641afbe`, config instrument `vitest.sweep.config.mjs` blob `deb68513`, whole suite per
mutant, control 1144 = the shared-tree suite.

**Score**: 22 mutants = 11 `mutant-gen.js --range 6d78b19..963a25c` operator candidates on added lines (excludes the 12
TypeScript-generic `<`/`>` candidates on `src/utils/index.ts` lines 184 and 193–195, which the generator states yield
stillborn rows) + 11 hand mutants H1–H11 (write-back, mode, data selection, caller wiring, flag coupling). **19 killed**
at `963a25c`, every one `count: checked` (1144 = 1144). Killing cases per mutant: `sweep-killers.txt`. Every case this
chain added on the swept surface is red under at least one mutant. The two JSON-surface cases' surface is outside the diff;
their red is the fixer's `460000b` run.

| Survivor | Disposition |
|---|---|
| 6 `index.ts:188:if-false` · 8 `index.ts:188:\|\|` | Not equivalent: with `embeds` absent and V2 components present, `draft.embeds.some`/`.length` throws `TypeError`. **QAF-1.** Closed by QA's case: red under both (one failure each, the new case; `qaf1-redgreen.txt`), green at the tip, and re-run after its commit at `0e3d903` through `mutation-run.py`: **2 of 2 killed**, control 1145, `count: checked` (`sweep-qaf1/`). |
| 22 `H11-newmodal-raw` | Equivalent in reachable behaviour. `gate.data` differs from `loadedMessage` only for V2 beside all-empty embeds, and for V2 beside any embed `NewMessageModal`'s `disableSave` holds through `contentFloorError = validateContentRequirements(loadedMessage)` (read at `963a25c`). It becomes live when `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` is discharged; that handoff's work then owes a test. |

## Browser walk (C1, C4–C7)

**Environment, set up and removed by this pass.** `postgres:16` container `hooks-postgres-local` on 127.0.0.1:5432
(credentials from `.env.local`, values never printed), `prisma db push` of `project-utils/prisma/schema.prisma` (9 tables).
`.env.local`'s one `DATABASE_URL` is 127.0.0.1:5432, read as host and port only. Nothing was written to a remote
database. `next dev --webpack` on 127.0.0.1:3000 from `git archive` exports of `963a25c` (blobs verified) and then
`6d78b19`. The test account was signed in through Discord OAuth on the local build. **Pusher**: the local build publishes
with `.env.local`'s Pusher app (`ws-us2.pusher.com`), which may be production's (unread). Channels are
`message-update-<Messages.id>`, and ids are `BigInt` autoincrement. So before any save I restarted `Messages_id_seq` at
900000000000001, and every channel this walk published on (ids …001–…010) is out of production's range. The hazard for
the recipe is lodged in `INBOX.md` (2026-11-11 entry). **Removed**: both servers stopped (`:3000` 0 listeners), the
container removed (`:5432` 0 listeners, 0 containers by that name), both exports and the credential file deleted, and
the five `.playwright-mcp/` console files this walk wrote under the website tree deleted. Nothing was sent to Discord.

Instrument: `walk/save-scenario.js`. It loads `/message/m/<id>/edit` and presses Ctrl+S (then the choice button, if
any). It records the page's own Pusher frames, the "Message Update Detected" and "Are you sure?" dialogs, the open
dialog's text, the mode switch's active span, the save button, and the editor's held message from its `localStorage`
mirror (`message` key). It then follows the in-app Send link (client-side) and reads the send check. Walked by the
`browser-walker` helper; its JSON is read here directly, not from its summary. The stored rows are read from the DB
(`db-final.txt`).

| Run | Tree · stored shape · act | Observed | Stored row after |
|---|---|---|---|
| R1b (R1 not run: the click on the Send link was intercepted for 30 s by an open portal; not reproduced) | `963a25c` · V2 + `[{}]` · Save | no choice; held `embeds: []`; one own `message-update` frame; no prompt; save button off; Send check accepts | `embeds: []`, flag 32768, components kept |
| R2 | `963a25c` · V2 + `content:"hi"` · Save → **Save as Classic** | dialog with both options; after: no prompt; mode **Classic**; held `flags:0, content:"hi", components:[]`; own frame; Send accepts | `flags:0, content:"hi", components:[]` |
| R3 | `963a25c` · same · Save → **Save as Components V2** | no prompt; mode V2; held `content:""`, 1 component; own frame; Send accepts | V2, `content:""` |
| R4 | `963a25c` · V2 + `[{}]` · Save, `message.upsert` aborted | failure toast (at 2.5 s; gone by 8 s); held `embeds: []`; save button **on**; no frame | unchanged, `embeds:[{}]` |
| B1 (red) | `6d78b19` · V2 + `[{}]` · Save | held `embeds:[{}]`; own frame; **Send refuses** ("Components V2 messages cannot contain embeds or content") | `embeds:[{}]` |
| B2 (red, positive control) | `6d78b19` · V2 + `"hi"` · Save → Save as Classic | **"Message Update Detected"** shown to the saver; mode stays V2; held the mixed draft | `flags:0, content:"hi", components:[]` |

- **C5 met**: the dialog renders both options for a choice draft, and each writes its class (R2, R3).
- **C6 met**: the saver receives its own `message-update` in R1b, R2 and R3. At the tip it raises no prompt. At the base,
  the same act raises it (B2), so the instrument can see the prompt and the absence discriminates.
- **C4 met in a running build**: the editor's message and mode follow the stored data (R2, R3 against B2).
- **C7 observed as the reviewer read it**: R4. For empty embeds nothing is lost. The editor is ahead of the stored row
  until a retry. Within the 09:04Z statement; no finding.
- An unchanged classic save (id …006, the 2026-08-25 handoff's limb-(d) shape) received its own frame and raised no
  prompt on this build. One observation; limb (d) is not this fix's to close.

## Findings

QAF-1 MEDIUM Phase 2 RESOLVED — the drop helper's `embeds`-present guard (`dropEmptyEmbedsBesideV2`, the
`!draft.embeds || draft.embeds.length === 0` return) had no assertion: deleting or inverting it left 1144/1144 green,
while every Save of V2 components with no `embeds` key would throw. Closed in this pass by QA's case "V2 components with
no embeds key persist unchanged, with no choice" in `src/utils/__tests__/utils.disposition-resolver.test.ts`, website
`0e3d903` (test-only; red under mutants 6 and 8, green at the tip). The code reviewer's scoped check of the test-only
diff `963a25c..0e3d903` is sent to `code-reviewer-fix-website-save-gate-embeds` in this pass. This gate's audit of the
diff is above.

QAF-2 INFO Phase 2 — `JsonModalBody.conflict-resting-state`'s "V2 components beside an empty embed land as V2 with no
choice" asserts only the no-choice half; the property "the committed data has `embeds: []` and the V2 flag" is not
asserted for that surface. C3 does not rest on it: the resolver differential (0 of 800 cells, both trees executed,
`code-review-round1-subentry2/differential.txt`) and `NewMessageJsonInput`'s sibling, which asserts the landed data,
carry C3. No action owed.

## Blocking-condition register

This chain's register; no rows. No plan validation line designates an operator-observed check, and there is no UAT on
this route. The owner's live-database read and his own check of the user-visible flows are carried to the release step
by `steering/queue-hooks-rulings.md` block "2026-11-11T08:46Z — fixer handoff received", item 2, not by this register.
Post-deploy observable for a user-reported defect: not owed, as far as I read. The scoping determination ("Held item 4")
presents this as a defect found by comparing two predicates; I did not read further upstream for a user report. Rows
inherited and not discharged: none.

## Verdict

**QA Complete — PASS at website `0e3d903`** (production identical to the reviewed `963a25c`). C1–C7 met. Every guard in
the production diff is observed red at least once, the one gap is closed in this pass, and the user-visible flows hold in
a running build against a base-tree red. A later production change expires this verdict. A plan-level verdict does not
authorise the release; the merge and push are devops's, under the owner's approval. What a push of `master` deploys is
devops's to establish.

## Assumption Not Checked

This pass assumes the deployed build's Pusher app delivers `message-update` to the saving client as the `.env.local`
app did here, and it does not test hooks.gg. The signature of its falsity is that on hooks.gg a "Save as Classic"
saver sees "Message Update Detected", or a row-E Save leaves the Send page refusing. Owner of closing: the release step,
inside the owner's own check of the user-visible flows already carried there (rulings 08:46Z, item 2). Devops carries it.

## Handoff

Next: **devops** at release (no devops session live at 10:0xZ, so the spawn cue goes to `steering-queue-hooks`). Also
sent: the scoped check of the test-only `963a25c..0e3d903` to `code-reviewer-fix-website-save-gate-embeds`. Defects: none
open. QA's own test commit `0e3d903` is on `fix/website-save-gate-embeds`.
