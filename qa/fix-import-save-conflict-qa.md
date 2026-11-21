---
ID: n/a
Origin: fix-import-save-conflict
UUID: 0030da7d
Verified-At: "f23568aae25666650e687d7396c76f3ac9583bed — repos=website; chain/fix-import-save-conflict, base f4baebb"
Status: QA Failed
Status-Detail: "Phase 2 at website f23568a: QA Failed on QAF-1 MEDIUM (a draft that arrives after the dialog mounts has no failing assertion) and QAF-2 LOW (User-visible flow 3 is wrong about the red line). Returned to fixer-fix-import-save-conflict; a refresh pass is owed at the next SHA."
Phase: 2
---

# QA Report: fix-import-save-conflict

**Plan Reference**: none (fixer chain). Scope statement: `steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z"; the preview ruling is block "2026-11-21T08:13Z".
**Implementation Reference**: `implementation/fix-import-save-conflict-implementation.md` (`Handoff-At: f23568a`). **Code review**: `code-review/fix-import-save-conflict-code-review.md` (`Reviewed-At: f23568a`, APPROVED, record `87e66c6f`).
**Brief**: `steering/fix-import-save-conflict-brief-qa.md` and `…-brief-common.md`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T08:39 | steering-hooks (brief); code review's approval at `f23568a` | Phase 2 of a fixer chain at the reviewer's `Reviewed-At` | Phase 2 QA Failed. The fix is correct on every row walked in a real build: rows A to E, in all four tabs, and a draft changed in place. QAF-1 MEDIUM: no case loads a draft after the dialog mounts, and a stale settled-draft memo survives the whole suite (probe captured). QAF-2 LOW: User-visible flow 3 says no red "cannot contain" line is shown, but the real preview shows one while the choice is pending. Both of the reviewer's Assumption Not Checked lines are discharged by the walk. Disclosed: the record's stamp gate refused a typed (estimated) stamp on this row, and I replaced it with the `date -u` minute. The probe file was written with a shell heredoc (it is an instrument under `verification/`, not a record document). |

## Scope and stage start

- No Phase 1: this is a `fixer` task, and Phase 1 was not selected for it (GLOSSARY, "Scoping determination"). This is the chain's first QA document, so it holds the blocking-condition register (below).
- Stage start: the code review's committed APPROVED verdict at `Reviewed-At` `f23568a` (record `87e66c6f`). `git rev-parse chain/fix-import-save-conflict` returned `f23568aae25666650e687d7396c76f3ac9583bed` at the start of this pass. Tests ran in the shared tree at that HEAD, and the walk and probes ran in `git archive` exports of it. Blob identity was checked (`NewMessageModal.tsx` `712d83bd…` in both).
- Production lines re-counted with `git diff --numstat f4baebb..f23568a`: `src/app/message/_components/NewMessageModal.tsx` 27 added, 5 removed. The only other changed file is the test file, at 160 added and 20 removed. So QA Phase 2 is owed, and that matches the reviewer's count. The fixer's 22 was correct at `3c6f16f`.
- Architecture: `architecture/system-architecture.md` and `architecture/website.md` exist (named by the code review, which read them). This pass relied on nothing in them beyond what the review records, and found nothing that changes what they say about the persist gate.

### Criteria assessed (recorded before execution)

1. A conflicting draft from any import tab (rows A to E) never leaves Save disabled with no way out. Rows A to D are settled with the JSON tab's notice, and row E opens the Classic-or-V2 choice. The members of "any import tab" are Message Link, Webhook, Message Context Command and JSON. Each is dispositioned below.
2. Save writes the settled or chosen draft, never the raw one.
3. (Growth, 08:13Z ruling, assessed by the reviewer at sub-entry 1.) The preview shows the draft Save writes, or the raw draft while a row E choice is pending.
4. The JSON tab's own behaviour is unchanged (common brief).
5. The fixer's **User-visible flows** 1 to 6 are true of a running build (QA brief).

Each criterion's example and its class: the tests exemplify "an imported draft" with a Message Link import whose data is present **when the dialog mounts**. The class is every draft the dialog can be handed, including the usual case, where the draft arrives after mount because the user types a link and the query resolves. The tests do not enumerate that member (QAF-1).

## TDD evidence (fixer chain: red and green runs, no table owed)

- Red run at `f4baebb`, `verification/fix-import-save-conflict/red-run-f4baebb.{json,txt}`: exit 1. Read from the JSON: row D, row B and both row E cases failed; the classic case and the JSON-tab row E case passed (that case is kept on its control, `settled-draft-loses-components`).
- Red run of the preview at `3c6f16f`, `red-run-preview-3c6f16f.{json,txt}`: exit 1. Only "the preview shows a V2-flagged message … as the Classic message Save writes" failed.
- The settled-floor case (case 8) and the row E preview case (case 7) have no red run against the tree before them. Both are counted on mutation instead (below): `floor-removed` reddens case 8, and `preview-settled-only` reddens case 7.
- Tests are spec-form. An ID-token grep over the test file at `f23568a` gave 0 (reviewer). No `// escaped:` line is owed: the source handoff records a QA conversion finding, not an escaped defect.
- Test-file audit against the Test Conventions: the basename `NewMessageModal.persist-gate-wiring.test.tsx` matches the positive form. Mounting uses `createRoot`/`act` through `mountDom`. Expectations are literals. The invented tRPC wrapper is named by the fixer (Iron Law 5) and is now checked against the router's return at source: `src/server/api/routers/message.ts` `getFromUrl`, case 200 `return { guildId, message: data, droppedComponentTypes }`. The `MessagePreview` stub records its prop and does not render; the walk covers rendering (ANC 2 below). No time-based cell.

## Test Execution Results

| Run | Tree | Result | Capture |
|---|---|---|---|
| Full suite `npx vitest run --reporter=json`, run 1 | shared tree at `f23568a` | 2311 total, 2310 passed, 1 failed, 159 files, **exit 1**. The failure was `src/server/api/__tests__/trpc.batch-refusal.test.ts` › "refuses two calls with a bad-request status before any call reaches the database", a 5007 ms timeout, while the mutation sweep was loading the box. That file is unchanged `f4baebb..f23568a` (`git diff --quiet`). Re-run alone: 2/2, exit 0 (`batch-refusal-rerun.out`). | `verification/fix-import-save-conflict/qa/suite-f23568a.{json,out,txt}` |
| Full suite, run 2, on a quiet box | same | **2311 total, 2311 passed, 159 files, exit 0**. The file paths are the same set as the fixer's `fix-suite.json` (compared by path membership). | `verification/fix-import-save-conflict/qa/suite-f23568a-run2.{json,out,txt}` |
| `pnpm run typecheck` (both programs) | same | exit 0 | `verification/fix-import-save-conflict/qa/typecheck-f23568a.out`, exit in `verification/fix-import-save-conflict/qa/suite-f23568a.txt` |
| Persist-gate-wiring file | same | 9 of 9 passed (titles read from the run-1 JSON) | as run 1 |

The run-1 timeout is outside this chain's surface and passed both alone and in run 2. It is recorded as a load-sensitive timeout, not a finding against this chain.

## Mutation sweep

**Scope:** `git diff f4baebb..f23568a` over production paths, which is the one file `src/app/message/_components/NewMessageModal.tsx`. The test file is excluded. **Set:** 17 mutants in `verification/fix-import-save-conflict/qa/sweep-mutants.json` (blob `dd5b75ae…`):
- 4 from `node ~/.claude/tools/mutant-gen.js --repo website --range f4baebb..f23568a` (`verification/fix-import-save-conflict/qa/mutant-gen.json`). These are every operator candidate on the added lines; the test file is skipped.
- 13 hand-written: the `??` fallbacks the generator does not mutate, the memo's and callback's dependency arrays, and coupling mutants. `floor-row-e-too` floors row E only when the settled draft is absent; `settled-is-raw` floors and gates on the raw draft through the settled variable.

**Run:** `mutation-run.py` at `f23568a` in fresh exports, `--dep node_modules`, suite `npx vitest run` over the 4 dialog-mounting files (the same 4 the reviewer used), with a 240 s timeout. The runner's blob is `b26916e7…`. Kill table and output: `verification/fix-import-save-conflict/qa/sweep/` (`mutation-table-…-20261121T082636Z-…json`, `driver.txt`). Runs were by a helper; I read the table myself.

**Score:** 13 KILLED, count checked, of the 17 mutants in `verification/fix-import-save-conflict/qa/sweep-mutants.json` on the added lines of `NewMessageModal.tsx` in `f4baebb..f23568a`. This excludes `??`, `?.` and `=>` from generation; the `??` sites were added by hand. 0 stillborn, 0 aborted.

| Survivor | Disposition |
|---|---|
| `NewMessageModal.tsx:383:num` (`scale={0.5}` → `1.5`) | Not a property of this chain. The value is `0.5` at `f4baebb` too, and the line was only re-wrapped. Out of scope. |
| `submit-deps-drop-settled` | Equivalent. `settledMessage` is a `useMemo` of `loadedMessage` alone, so `onSubmit` is recreated on every change of `loadedMessage` and captures the matching `settledMessage`. |
| `row-e-stray-notice` | Residue. No criterion names the absence of a settled notice on row E; criterion 1 names the notice for rows A to D. The mutant needs a literal string where the code returns `null`; `noticeMessageForSettled` returns `null` for class `none`. Recorded, not a finding. |
| `memo-deps-empty` (`useMemo(…, [loadedMessage])` → `[]`) | **Not equivalent: QAF-1.** |

## Findings

QAF-1 MEDIUM Phase 2: No case loads a draft after the dialog has mounted, so a settled draft that goes stale goes unseen. The fix depends on `settledMessage`/`settledNotice` (`NewMessageModal` `useMemo` over `resolveContentLoss`) being recomputed when `loadedMessage` changes. Every real import arrives after mount: the user types a link, URL or code, and the query or fetch resolves. Every import case in `NewMessageModal.persist-gate-wiring.test.tsx` instead sets `linkImport` before `mount()`, so the draft is present on the first render. The `messageProviderDeps` `useQuery` mock returns `queryData` synchronously, whatever the `enabled` flag says. `react-hooks/exhaustive-deps` is `'off'` (`eslint.config.mjs`), so no lint gate catches a wrong dependency array either.
- Evidence: the mutant `memo-deps-empty` survived all 4 dialog-mounting files.
- Probe: `verification/fix-import-save-conflict/qa/probe-post-mount/NewMessageModal.post-mount-probe.test.tsx` is the shipped file plus one case. It mounts with no draft, then calls `importViaMessageLink({ components: [] })`, types a link into the URL field, and asserts the Classic notice and a write with the flag cleared. At `f23568a` it ran 10/10, exit 0 (`probe-tip.{json,out}`). Under `memo-deps-empty` it ran 9 passed and 1 failed, exit 1 (`probe-mut.{json,out}`, `probe-exit.txt`). Only the new case failed, on "expected 'Create or upload a new message…' to contain 'it has been saved as Classic and the …'".
- Failure scenario: the memo's dependencies are lost or narrowed. A user then loads a row D message, sees no notice and gets the raw-draft floor error, which is the reported defect returning, while the suite stays green. Or, after the change in place (walk step 5), the stale settled draft of the first message is written.
- Required: tighten the existing file with a case whose draft arrives after mount, and preferably one that changes the draft in place (row D, then row E). Each must be seen red under `memo-deps-empty`. The probe file is a ready shape. The case belongs in the shipped file, per the Test Conventions ("Before adding a test").

QAF-2 LOW Phase 2: User-visible flow 3 is wrong for a running build. The implementation document says: "No red 'cannot contain' error is shown and Save is enabled." In the walk (steps 3, 5 and 8, Webhook and Message Link tabs), the dialog's red floor notice is indeed absent and Save is enabled. But the real `MessagePreview`, fed the raw row E draft as steering ruled ("as loaded while the choice is pending"), renders its own red line "Components V2 messages cannot contain embeds or content." between the content and the container (screenshots `s3-webhook-rowE.png` and `s8-link-rowE.png`, kept untracked in this session's scratchpad; text in `verification/fix-import-save-conflict/qa/walk/evidence/step3-webhook-rowE-classic.json` and `step8-link-rowE-classic.json`, field (e)). The owner checks the release against this list, so he would see a red "cannot contain" line and could read it as the defect. Required: restate flow 3 to match the build. The red line is the preview's rendering of the draft as loaded and is not this chain's code: the preview showed the raw draft at `f4baebb` too. Whether the preview should show it while the choice is pending follows steering's 08:13Z ruling. This pass does not reopen that ruling.

## The reviewer's Assumption Not Checked lines (both owned here)

- **ANC 1 (the tRPC client's shape after superjson and `makeEditable`): discharged for the client path.** Walk steps 7 and 8 (Message Link) and step 9 (Message Context Command) served `message.getFromUrl` / `message.getFromCode` bodies to the real browser client. Those bodies were superjson-encoded from the real `discordResponseToMessage` output, in the router's return shapes read at source: `getFromUrl` case 200, and `getFromCode` → `messageStore.retrieve`'s `{ data, guildId }`. Generator: `verification/fix-import-save-conflict/qa/walk/gen-fixtures.walk.test.ts`, output `fixtures.json`. The dialog showed the settled notice, the preview, and the expected write on each. The running router (Discord, redis) was not exercised: see Assumption Not Checked.
- **ANC 2 (the real `MessagePreview` renders a settled row D draft as Classic): discharged.** In steps 1, 7 and 9 the preview reads "u / BOT / … / walk row D text", with no V2 container and no red line.

## Walk (real build)

Build: a `git archive` export of `f23568a` in this session's scratchpad, `pnpm install --frozen-lockfile --offline`, `.env.local` symlinked (only key names and URL hosts read: `NEXTAUTH_URL` and `REDISHOST` are loopback), and `next dev -H 127.0.0.1 -p 3000`. The local Postgres came from `tools/uat-local-stack.sh up` (`verification/fix-import-save-conflict/qa/walk/local-stack-up.txt`; next id 900000000000001). The test account signed in through Discord OAuth (consent page only, no challenge).

Interception: every import response and every Save was fulfilled in the browser. `message.upsert` was captured and answered 400, so **no save reached a server**. The local database wrote only the test account's sign-in rows, no message, and no Pusher event was raised. Webhook fetches to `discord.com/api/webhooks/**` were answered from the raw fixtures, so the browser's own `discordResponseToMessage` converted them. Steps: `verification/fix-import-save-conflict/qa/walk/walk-steps.md`. Evidence: `verification/fix-import-save-conflict/qa/walk/evidence/*.json`. The helper kept route state on the browser context instead of `globalThis`, and rebuilt the fixtures inline with the same contents (its report). In step 1, one extra identical upsert was captured before the routes were reinstalled.

| Step | Tab, draft | Result |
|---|---|---|
| 1 | Webhook, row D | Classic notice; no red text; preview shows the content; write `content` "walk row D text", `flags` 0 |
| 2 | Webhook, row B | "set to match" notice; write `flags` 32768, `components[0].type` 17 |
| 3 | Webhook, row E → Save as Classic | No notice or floor error. Save enabled. Save opened "Are you sure?" with both options naming what they drop, plus Cancel. Write `content`, `components` `[]`, `flags` 0. The preview's red line is QAF-2 |
| 4 | Webhook, row E → Save as Components V2 | Write `content` "", `components[0].type` 17, `flags` 32768 |
| 5 | Webhook, row D then row E in place | The notice cleared; Save asked; after Cancel, no write |
| 6 | Webhook, V2-flagged empty embed | "Message must have content, embeds, or components."; Save disabled; no write |
| 7 | Message Link, row D | As step 1 |
| 8 | Message Link, row E → Classic | As step 3 (QAF-2 the same) |
| 9 | Message Context Command, row D | As step 1 |
| 10 | JSON, row D draft | The JSON tab's notice appears exactly once; write `flags` 0 |

Per member of "any import tab": Message Link (7, 8), Webhook (1 to 6) and Message Context Command (9) are walked. JSON (10) is walked, with suite cases 0 and 5 beside it. Criterion 4: `NewMessageJsonInput.tsx` is unchanged in `f4baebb..f23568a` (the numstat lists only the two files above), and step 10 shows no second notice.

Flows: 1 holds up to the write. The editor opening after Save was not observed, because Save was answered by the interception; that is the unchanged `onSuccess` route. 2, 4, 5 and 6 hold. 3 is QAF-2. Step 10's preview also shows "This username is too short or too long." for a JSON draft with no username, at both trees' JSON-tab path; that is not this chain's surface.

Set up and removed: the export (deleted), `next dev` (stopped by SIGINT to both process groups; port 3000 not listening; `ps` shows neither pid), and container `hooks-postgres-local` (`uat-local-stack.sh down`, `verification/fix-import-save-conflict/qa/walk/local-stack-down.txt`). The probe exports were deleted. The browser was closed and its caches emptied by the helper. Screenshots stay untracked in the scratchpad.

## Irreversible Side-Effect Register

| Effect | Performed by | Guard before it fires | Routes |
|---|---|---|---|
| A message row is written (`api.message.upsert`) | `NewMessageModal` `submitData` | `disableSave` (the floor on the settled draft, name present); `onSubmit` → `gateBeforePersist(settledMessage ?? loadedMessage)`; for row E, `commitChoice` → `applyDisposition(loadedMessage, mode)` | Save button / form submit → `onSubmit`; choice button → `commitChoice`. Both read in `f23568a`. |

Whether a written row is reversible (deletion by its owner) is `UNVERIFIED`: no delete route was read. The guards above are inside the sweep's scope and were swept: `floor-*`, `gate-on-raw-draft`, `settled-is-raw` and `row-e-settled` were all KILLED.

## Blocking-condition register

The chain's register, which a later pass appends to. **No rows.** The stage set has no UAT, and the walk executed every user-visible flow before release. This is not a user-reported defect (the source is a QA conversion finding, `handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`), so no post-deploy distinguishing row is owed. Later stage documents (the deployment record) are authoritative on anything they add.

## Assumption Not Checked

This pass assumes the running `getFromUrl` and `getFromCode` procedures return the bodies the walk served for them (the router's return shapes read at source, superjson-encoded) and does not test it. It also leaves Discord's live responses for rows D, B and E unchecked (BC-17). Falsity signature: on production, a Message Link or code import of a real message shows no preview, or the old red error with Save off, while the Webhook tab works. Owner: devops, as a hazard line at release with the owner's check of flows 1 to 3; carried in the handoff below.

## Handoff

- **QA Failed** at website `f23568a`. Returned to `fixer-fix-import-save-conflict` for QAF-1 (a test case) and QAF-2 (the flow text). No production change is asked for. A round that changes test files and the implementation document only re-runs the survivors it closes (`memo-deps-empty`) and this pass's suite. A round that changes production code expires this verdict for the swept surface.
- The Assumption Not Checked line goes to devops through the eventual PASS message to `steering-hooks`.
