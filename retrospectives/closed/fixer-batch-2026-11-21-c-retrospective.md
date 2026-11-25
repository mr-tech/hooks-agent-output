---
ID: n/a
Origin: fixer-batch-2026-11-21-c
UUID: 82a92f3c
Status: Processed
Status-Detail: "Processed by pi batch 38 on 2026-11-25: every recommendation is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder."
---

# Retrospective (fixer batch 2026-11-21-c): fix-import-save-conflict, fix-get-one-absent-not-found

**Plan Reference**: none (fixer chains). The chains' fixer documents:
- `implementation/closed/fix-import-save-conflict-implementation.md` (chain 3)
- `implementation/closed/fix-get-one-absent-not-found-implementation.md` (chain 3b)

**Date**: 2026-11-21
**Retrospective Facilitator**: retrospective (`retrospective-fixer-batch-2026-11-21-c`, a subagent of `steering-hooks`)

The Origin and file name follow the spawn brief and the form of the two earlier batches of this day
(`fixer-batch-2026-11-21`, `fixer-batch-2026-11-21-b`). The lifecycle's table gives the form `fixes-<UTC date>-<thread>`. This document
keeps the brief's name so that the day's three batches sort together.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T10:24 | steering-hooks (spawn brief; rulings block 2026-11-21T10:18Z) | Fixer-batch retrospective over chains 3 and 3b of effort `fixer-queue-2026-11-21` | Written from the documents. The cost was read once per chain, and the captures are in `verification/fixer-batch-2026-11-21-c/cost/`. Says whether chain 3b applied the previous batch's lessons. Seven recommendations, plus sightings of the previous batch's pending ones. No handoff created. Disclosed: a shell-run Python edit of this document (two wording fixes) was refused by the record-write gate; re-issued with the Edit tool (a gate satisfied). The cost captures were written by shell redirect of `cc-usage.py` output under `verification/`, not a record document. |
| 2026-11-25T22:25 | pi (pi-batch) | Document closed | Status: Processed. pi batch 38 extracted the recommendations: each is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder. |

## Summary

**Corpus.**
- *Read first:* `architecture/website.md` and `architecture/system-architecture.md`, by grep for import, `getOne`, not-found, kysely,
  CJS and `getPostgres`, not whole. `agent-output/roadmap/` holds only `.gitkeep`, so no epic is cited.
- *Read whole:* `steering/fixer-queue-2026-11-21-rulings.md`; both chains' rulings files; both common briefs; chain 3b's reviewer resume
  brief; both implementation, code-review, QA Phase 2, QA Phase 3 and deployment documents; the handoffs
  `handoff/closed/fix-import-save-conflict-post-deploy-2026-11-21.md`, `handoff/fix-import-save-conflict-unchecked-hazards-2026-11-21.md`,
  `handoff/newmessagemodal-preexisting-react-hooks-lint-errors-2026-11-21.md`, `handoff/message-link-import-returns-empty-message-2026-11-21.md`
  and `handoff/closed/fix-get-one-absent-not-found-post-deploy-2026-11-21.md`; `retrospectives/fixer-batch-2026-11-21-b-retrospective.md`
  lines 1 to 341.
- *Read in part:* the selection ledger `steering/selection-ledger/2026-11-21.md` (uncommitted, read in the tree and left as it is),
  blocks 08:13Z to 10:10Z; `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md` (frontmatter);
  `handoff/closed/get-one-absent-number-still-500-in-production-2026-11-21.md` (changelog); `INBOX.md`, by grep;
  `qa/website-b663b35-release-tip-qa.md` lines 1 to 40; the first committed version of chain 3's implementation (`b55fba9c`), for its
  consumer list.
- *Not read:* `handoff/closed/fix-message-not-found-post-deploy-2026-11-21.md` whole; the per-stage briefs other than those named; the
  `verification/` captures other than those cited; the deweeder's scoring of these chains, which runs beside this retrospective.
- *Cannot be read:* rulings given in conversation and not lodged; the contents of messages between sessions; what any session fixed
  before its document was committed; the owner's own check of the User-visible flows after either release. Anything outside this corpus
  is unverifiable-by-construction here. It is not refuted.

**Value Statement** (each chain's scope statement, bounded):
- **3:** in `NewMessageModal`, a conflicting imported draft (rows A to E) never leaves Save off with no way out. Rows A to D are
  settled with the JSON tab's notice. Row E is held for the user's choice of Classic or V2. Save writes the settled or chosen draft, never
  the raw one (`steering/fix-import-save-conflict-rulings.md`, block 07:54Z). Grown by steering's ruling at 08:13Z: the preview shows the
  draft Save writes.
- **3b:** `message.getOne` answers NOT_FOUND with chain 2's one text for a number no row holds, in the runtime production uses. The red
  test's error comes from the kysely build the query really runs. The not-found edit page drops the editor's header controls
  (`steering/fix-get-one-absent-not-found-rulings.md`, block 08:57Z).

**Value Delivered**: **YES** for both. Authority for each: the post-deploy carrier's `Result` line, re-read at write time.
- **3:** released at 08:53:57Z. PD-1 confirmed the release serves: a row D draft in the Webhook tab gets the settled notice and Continue is
  enabled. The Message Link limb was falsified by a cause upstream of this release. Production's `message.getFromUrl` returns test-server
  messages with blank content. `src/server` is unchanged in the release, so the import was already broken before it
  (`handoff/closed/fix-import-save-conflict-post-deploy-2026-11-21.md`, Result). That defect is carried to a diagnose-first chain, 3c. The
  chain's own value is delivered for the Webhook and code tabs. For the Message Link tab it is delivered for any message whose content
  the server receives; for the test server's messages it cannot show until 3c.
- **3b:** released at 10:11:09Z. B-1 HOLDS on both limbs (10:13:30Z to 10:14:17Z): three absent numbers answer the one 404, and `/edit`
  shows the notice without the editor bar. Chain 2's escaped gap is closed. It had been on production from 07:51:38Z to 10:11:09Z.

**Implementation Duration** (from determination to release; no UAT):
- **3:** 07:54Z to 08:53:57Z, 60 minutes. This includes one REJECTED code-review round and one QA Failed round. The last QA Phase 2
  verdict was at 08:46Z.
- **3b:** 08:57Z to 10:11:09Z, 74 minutes. About 34 of those (09:17Z to 09:51Z) were the owner's park, so about 40 were working time.
  The QA Phase 2 verdict was at 10:03Z. There were no rejected rounds and no findings.

**Overall Assessment**: two clean releases, and the previous batch's lessons were applied, mostly through steering's briefs.
- **Chain 3** had two rejecting gates, and each caught something real. Code review found a decision with no assertion (CR-1) and, with
  steering's refutation helper, a gap between preview and Save that the fix itself had opened (CR-2). QA's class enumeration found that
  no test loads a draft after mount, and that a stale memo survived the suite (QAF-1). QA's real-build walk found that a User-visible
  flow was false (QAF-2). PD-1 then surfaced a pre-existing production defect. That read could have run before the push.
- **Chain 3b** applied batch b's lesson on fakes at the boundary. Its red test raises the error from the CJS kysely build. The
  reviewer's evidence ran project-utils' real `getPostgres` over a real postgres, an instrument of a different shape (§ "Did chain 3b
  apply 'red tests through the real dependency graph'?"). The one limb still unchecked before release was the Next bundle's module
  identity. As in chain 2, it rested on the post-deploy read, though devops had built the tip in 27 seconds at 10:08Z. This time
  the read held.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Batch-level reads

- **Work queued behind one tree, by his choice.** Chain 3b's determination (08:57Z) followed chain 3's push (08:53:57Z) by three
  minutes, as his 07:59Z selection ordered ("right after chain 3"). Chain 2's absent-number 500 stayed on production for 2 h 20 min
  (07:51:38Z to 10:11:09Z). About 60 minutes of that was the wait for chain 3, and about 34 was the park. His knowing choice is named
  here; nothing is proposed against it (as in batch b).
- **No contention for the tree or the box is recorded.** Chain 3b was cut at `b829314` while chain 3's PD-1 was being read on production.
  The read needed no tree. One box effect is recorded: QA's full-suite run beside its own mutation sweep timed out one unchanged case twice
  (below).
- **No question reached the owner twice.** In the window he answered four prompts (08:13Z, 08:53Z, 09:02Z with two questions,
  10:10Z) plus the park and unpark relays. Chain 3b hit chain 3's case again: pre-existing lint errors in a touched file. Steering did
  not ask a second time. It applied his 08:13Z words, "ship, record debt", to the sibling file and recorded why (chain 3b rulings, block
  09:16Z; `references/escalation.md`, an item a ruling's own words already answer).
- **Findings that recur across both chains:**

| Finding | Chain 3 | Chain 3b | Record |
|---|---|---|---|
| Pre-existing eslint errors in the one file the fix touches make `convention-check.js` FAIL | 3 FAIL, `NewMessageModal.tsx` | 5 FAIL, `Navigation.tsx` | handoffs 7ca5ab96 and b88e8be8, both `Open` |
| A typed changelog minute ahead of the clock is refused by the stamp gate and re-stamped | code review 08:17, QA 08:39, devops ×3 | QA 10:14 (B-1 carrier) | each disclosed in its own row |
| A run capture named `*.log`, which the record's `.gitignore` excludes, is renamed `.txt` | fixer 08:11 (`b55fba9`); devops `build.log`, by `sed -i` | fixer 09:15; devops cites `next-build-b663b35/build.log` | Recommendation 5 |
| A shell edit of a record document, disclosed | devops: in-place Python and `sed -i` (deployment changelog 08:52) | devops: none; fixer: the destructive-command check satisfied with literal paths | in-round disclosures |

  The stamp gate worked every time: each refusal was satisfied and disclosed in the round. A typed stamp *behind* the clock is invisible
  to that hook by its own header (`~/.claude/tools/stamp-gate-hook.js`, lines 15 to 16). How many of those passed is not measurable from
  the documents.
- **Source handoffs closed after the post-deploy read in both chains.** This is batch b's Recommendation 6, applied by steering. Chain
  3's source 7f21ac93 closed after PD-1 (rulings block 09:05Z). Chain 3b's 7c3e91a4 and e450d19c closed after B-1 held (block 10:18Z).
  Neither closed on the push, so neither closed on a discharge that later failed.
- **The park was clean.** "Park the chains" arrived at 09:17Z. Both chain 3b sessions committed a Checkpoint and stopped by 09:18Z. At
  09:51Z steering respawned only the reviewer, with a resume brief that named its Resumption State and said the fixer's unsent hand-off
  message was moot. The reviewer resumed at 09:51Z and approved at 09:55Z. The cost of the park is a second reviewer session, $2.06,
  carrying round 1 to its verdict. The first session, $1.17, had done the pre-park part.
- **Batch b's architect recommendation has no carrier.** Batch b's Handoff asked steering to lodge, through `INBOX.md`, that
  project-utils' `dist/` is CommonJS and loads kysely's CJS build. `grep -c -i -E 'cjs|commonjs' INBOX.md` gives 0. A grep of
  `architecture/system-architecture.md` for kysely finds lines 73, 97, 141-142, 166, 178, 187 and 276, and none of them states the module
  format. Chain 3b's fix makes the website independent of it, but the property still stands for any other `instanceof` against a kysely
  class (chain 3b's sweep P1: one site today). See Handoff.

### Chain 3 — fix-import-save-conflict

**Went well**
- **Steering's refutation helper sharpened a fixer report into a ruling.** The fixer raised the preview as an open question and called it
  "no regression" (first version, `b55fba9c`, line 47). The helper diffed `f4baebb` against `3c6f16f`. At base, preview and Save both
  used the raw draft. The fix moved Save and left the preview behind, which opened a gap (rulings block 08:13Z). Steering ruled the
  preview in scope from his words ("the way the JSON tab does") without a prompt. The fixer recorded the correction as its own error
  (implementation changelog 08:20).
- **The REJECTED round was cheap and precise.** It ran from 08:17Z to 08:23Z, 6 minutes. CR-1 came from a reviewer probe that removed
  the settled floor and survived (`code-review/floor-removed-all/`). At sub-entry 1 the reviewer re-ran 7 probes itself, and all were
  killed.
- **QA's class statement found what the controls could not.** The QA document names each criterion's example ("data present when the
  dialog mounts") beside its class ("every draft the dialog can be handed, including … after mount"). That gap is QAF-1. It is the
  previous batches' "name the class" rule working as written.
- **QA walked the real build in all four tabs before release.** It ran 10 steps through a `browser-walker` helper. Every import response
  and every save was intercepted, so no save reached a server. The walk discharged both of the reviewer's Assumption Not Checked lines
  and found QAF-2. That flow line was false: the real preview draws its own red line, and the stub in the test could not show it.
- **The release prompt stated the evidence class.** "QA walked flows 1-5 on a local build with the import responses served in the
  router's shapes, not Discord's live responses … Flow 6 rests on the suite only" (ledger 08:53Z). When PD-1 then found the Message Link
  path empty on production, nothing quoted to him had been stated as more than it was.
- **PD-1's read told the new build from the old one** by a browser-side route (a row D draft on a fake webhook URL) before it judged the
  real-path limb. It then read `getFromUrl` directly and placed the cause upstream of the release.

**Didn't go well**
- **A post-deploy limb that did not depend on the release was read only after it.** PD-1's Message Link limb runs through
  `message.getFromUrl`, which is unchanged in the release (`src/server` has no diff `f4baebb..b829314`). Its fixture messages were posted
  at 08:50Z. Devops wrote that PD-1 "is only decidable once the new build serves; no pre-push read is made here" (deployment, "Read rows
  run once before the first go"). A direct read of `getFromUrl` on production at 08:50Z would have given the 09:00Z answer. The release
  prompt could then have said that Message Link imports return empty on production today. Instead, flows 1 to 3 named the Message Link
  tab without that limit. Chain 3b's QA did run this kind of read: a pre-deploy baseline at 10:01:25Z, before the row was minted.
  Recommendation 1.
- **The fixer's controls did not remove every decision it listed.** The 08:09 consumer list named the floor. The controls substituted the
  raw draft into the floor (`floor-on-raw-draft`) but never removed the settled floor. That removal is CR-1's surviving probe. The
  preview was listed and judged by comparing base with fix for that one consumer, not by asking whether it still agreed with Save.
  Recommendation 3.
- **A dependency-array mutant was hand-written by QA, and no generator makes one.** `memo-deps-empty` (`[loadedMessage]` → `[]`)
  survived the fixer's 12 controls, the reviewer's 7 probes and the whole suite. `mutant-gen.js` gave 4 mutants on the range and none of
  the 13 hand-written ones QA needed. `react-hooks/exhaustive-deps` is off in website's eslint config (implementation, controls table), so
  lint does not catch it either. Recommendation 2.
- **QA's verdict suite ran beside its own mutation sweep, twice.** Both times one unchanged case
  (`trpc.batch-refusal.test.ts`) timed out at 5007 ms and 5014 ms, the suite exited 1, and a quiet re-run was needed. The test's
  sensitivity is lodged in `INBOX.md` (line 321). The run order is QA's own. Recommendation 6.

### Chain 3b — fix-get-one-absent-not-found

**Went well**
- **The fixer asked about the write set instead of widening it.** The new class sat beside `getMessage` in `shared.ts`, where the write set
  says "`getMessage` only". The fixer sent a BLOCKED message with three options. Steering ruled within 3 minutes (block 09:03Z), with
  three checkable conditions, and the fixer's document records each as met.
- **The other callers were measured, not argued.** The fixer's probe drives `updateRecentMessageData` over both kysely builds at base and
  tip, with a control (`probe-control-message-changed.txt`, 2 failed). QA's one surviving mutant, `absent-row-error-text-changed`, is the
  same edit, and the probe is red under it.
- **The owner's prompt carried an evidence class on every flow.** Steering's common brief says "the fixer's User-visible flows, each with
  its evidence". The fixer wrote "Evidence: case N" on each flow. Devops's prompt (ledger 10:10Z) says "flows 1-4 rest on the suite's
  cases … flow 3's server limb is read from code, not mounted". This is batch b's Recommendation 4, applied through the brief.
- **QA minted B-1 with an instrument shown to work** (a read-only run on production at 10:01:25Z). B-1's reader established which build
  served from the numbers themselves. It also reasoned about which absent numbers could prove absence under a fixed build that answers
  absent and forbidden alike, and rested the limb on `999999999999` and `900000000000500`.

**Didn't go well**
- **The bundling limb went to production unread, again.** Code review and QA each state the same Assumption Not Checked: that the Next
  production bundle holds `shared.ts` and `message.ts` as one module instance. QA's reason for not running it: "settling it needs a
  `next build` with env and an inspection of the bundle, which is more than a minute's run". Devops then built the tip in an isolated
  export from 10:08:07Z to 10:08:34Z (deployment, Packaging), but did not serve the build or send it a request. The limb was read on
  production by B-1, and it held. Batch b's Recommendation 2 asked for exactly this run ("a locally served production build … against
  that container"). It is sighted again here, with no defect behind it this time (Recommendation 4).
- **The standing database line survives in the brief.** Chain 3b's common brief still says "a test database is a throwaway container or
  the fake kysely driver", word for word as chain 2's did. Its hazard 1 overrode the line for this chain only.

### Did chain 3b apply "red tests through the real dependency graph"?

Batch b's lesson 1 and Recommendations 1 to 3, item by item. The authority is chain 3b's own documents.

| Batch b item | Applied? | Where, and with what effect |
|---|---|---|
| Lesson 1 / Rec 1: a double at a dependency boundary is built through the real boundary's import form | **Yes, through the scope statement and hazard 1** | The determination requires the red test's error to come from "the kysely build the query really runs (project-utils' real `getPostgres` over a throwaway postgres, or a `require('kysely')`-raised error)". The fixer took the second form: `createRequire(import.meta.url)('kysely')` over a capturing driver. Red at `b829314` gives exactly B-1's production signature, `{INTERNAL_SERVER_ERROR, "no result"}`. The standing suite now has a case red against production's form (case 1). Batch b had written that none existed. |
| Lesson 2: instruments sharing a double agree by construction | **Yes** | The reviewer says so in its Evidence section: "It is a different shape from the fixer's red test". Its probe ran project-utils' **real** `getPostgres()` (CJS) over a throwaway `postgres:16` at both SHAs: 500 at `b829314`, NOT_FOUND at `b663b35`. The fix's identity argument was read at the library by two stages: kysely builds `new errorConstructor(node)` for a class argument. |
| Lesson 3 / Rec 2's brief limb: the brief names the real-postgres harness | **Yes, in this chain's brief only** | Hazard 1 names `recent.pg.test.ts` and `run-probe.sh`. `steering.md`'s standing database line is unchanged (above). |
| Rec 1's last limb: a directory check is not identity evidence | **Partly** | QA reasons from `readlink -f` that both importers reach one physical package, then adds the entry-point step the batch said was missing: ESM `import` versus `require` → `dist/cjs`. That argument is sound. The suite case still builds its CJS kysely from website's resolution, not from project-utils'. If the two copies ever diverge (a project-utils kysely bump), the case would not notice. The reviewer's probe would, but it is not in the suite. |
| Rec 2's run limb: a locally served production build where module format or bundling matters | **No** | The Next-bundle limb was left to B-1 (above). |
| Rec 3: lift the real-postgres harness into one record tool | **No** | A fourth chain-local copy now exists: `verification/fix-get-one-absent-not-found/code-review/run-probe.sh`, beside `fix-recent-message-ids/code-review/`, `fix-personal-message-access/code-review/` and `fix-personal-message-access/pg/run-pg.sh` (`ls -d`). |

**Effect.** Chain 3b reached release with 0 review findings and 0 QA findings. B-1 held on its first read. Its pre-release evidence
covered the failure that escaped chain 2, by two instruments of different shape, one of them the real runtime path. All of chain 3b's
lesson-carrying came through the determination and the brief that steering wrote for it. None of it is in a definition yet, so the next
chain gets it only if its brief carries it again. The one limb left to production (the bundle's module identity) is the run batch b's
Recommendation 2 asked for and no stage ran. Test-case scoring runs separately, beside this document. Batch b's scorers had noted
ESM-fake cases kept at score 8 (effort rulings, block 08:06Z). Whether chain 3b changed those cases is the scoring's to say, not this
document's.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

Neither chain ran UAT. Both QA Phase 2 passes ran their suites, sweeps and probes by script (vitest, `mutant-gen.js`, `mutation-run.py`,
in exports). By hand, in a browser, or put to the owner:

| Chain | Check | Driven by | Time | Cost (cc-usage rows) | How it could run unattended |
|---|---|---|---|---|---|
| 3 | 10-step walk of the four import tabs on a local `next dev` build, every response and save intercepted | `qa` via a `browser-walker` helper | about 08:24Z to 08:39Z | `browser-walker` $0.69 of qa's $7.08 | The steps are already a file (`verification/fix-import-save-conflict/qa/walk/walk-steps.md`) and the fixtures are generated by a test (`gen-fixtures.walk.test.ts`). A pinned runner that takes the steps file and the fixtures and reports pass or fail per step would replay it. No such runner is in `agent-output/tools/` (listing). This is the 2026-11-20 batch's pending Recommendation 6, with one more sighting |
| 3 | PD-1 on hooks.gg: Webhook-tab build check, Message Link with two fixtures, direct `getFromUrl` read | `qa` in its stage browser (plus `browser-walker`) | 08:57Z to 08:59:40Z | qa $1.83 after the push, of it `browser-walker` $0.26 | The same runner. The `getFromUrl` limb needs no browser state beyond the session cookie, and could run **before** the push (Recommendation 1) |
| 3 | Fixture messages posted to the test server | devops, by script (`post-test-messages.py`) | 08:50Z | in devops's $1.39 | Already scripted |
| 3b | Pre-deploy production read of `getOne` for four numbers | `qa`, `browser_evaluate` of a `fetch` | 10:01:25Z | in qa's $4.08 | A step of the same runner. It was the row's minting check |
| 3b | B-1 on hooks.gg: four `getOne` reads, two `/edit` page reads | `qa` in its stage browser | 10:13:30Z to 10:14:17Z | qa $1.00 after the push | The same runner. The selectors are already in the row (`input[aria-label="Message Name"]`, `a[href$="/send"]`, …) |
| 3b | Next-bundle module identity | not run before release; B-1 read it on production | — | — | A served `next build` of the tip (devops already builds it) against the record's postgres harness, then one request (Recommendation 4) |
| both | The User-visible flows, quoted for his own check | the owner, optionally | unknown | unverifiable-by-construction | Each flow is a step of the same runner |

**Standing suites that now cover these surfaces** (named, not re-proposed):
- website `src/app/message/_components/__tests__/NewMessageModal.persist-gate-wiring.test.tsx`, 11 cases (chain 3);
- `src/server/api/routers/__tests__/message.get-one-not-found.test.ts`, including the escaped CJS case, and
  `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx` (chain 3b).

Two things are not in a standing suite. The other callers' `INTERNAL_SERVER_ERROR "no result"` text is asserted only by the fixer's
committed probe (QA residue). The real-postgres differential is a `verification/` probe.

## Lessons Learned

1. **A post-deploy limb whose path the release does not change is decidable before the push.** Read it at minting. Its answer belongs in
   the release prompt, not in the post-deploy read.
2. **A consumer list is a list of decisions to remove, not only to substitute.** Each consumer the Diagnosis names needs a control that
   deletes its use of the new value, and a check that it still agrees with its sibling consumers. Comparing one consumer base-to-fix
   misses a gap the fix opens between two consumers.
3. **Hook dependency arrays are logic that neither the generator nor lint sees here.** In a React fix, a memo or callback that goes stale
   is a behaviour change, and only a hand-written mutant found it.
4. **A test that stubs a surface cannot vouch for a flow that describes that surface.** Flow 3 was written over a stubbed `MessagePreview`
   and was false in the real build.
5. **A lesson carried by a brief works once per brief.** Chain 3b applied batch b's boundary lesson completely where its determination
   named it. The standing brief line it overrode, and the run limb no brief named, stayed as they were.
6. **"More than a minute's run" is an estimate, not a cost.** The build QA declined took devops 27 seconds, in the same chain, minutes
   later.

## Recommendations (each naming the file it would change)

1. **Read a post-deploy row's release-independent limb before the push, and quote it in the release prompt.** Files:
   `~/.claude/agents/devops.md` (Stage 1, row minting; "Read rows run once before the first go") and `~/.claude/agents/qa.md` (register
   row minting).
   - At minting, each limb of a post-deploy row is classed: does its path change in the release diff? (`git diff --quiet <base> <tip> --
     <path>`). A limb whose path does not change is read on production at once.
   - Its result goes into the release prompt's "Not checked" or "Known" block.
   - *Sighted:* chain 3, PD-1's Message Link limb. `getFromUrl` was unchanged, the fixtures were posted at 08:50Z, and the read waited
     until 09:00Z. Chain 3b's 10:01:25Z baseline is the form to keep.
2. **`mutant-gen.js` generates hook dependency-array mutants.** File: `~/.claude/tools/mutant-gen.js`. For each `useMemo`, `useCallback`
   and `useEffect` on an added line, it emits `[deps]` → `[]` and one mutant per dropped dependency.
   - *Sighted:* chain 3. `memo-deps-empty` was QAF-1's survivor. `submit-deps-drop-settled` was hand-written and found equivalent.
     website's eslint config has `react-hooks/exhaustive-deps` off.
3. **Every consumer the fixer's Diagnosis lists gets a removal control and an agreement check.** File: `~/.claude/agents/fixer.md`
   (negative controls; Diagnosis, "Consumers").
   - The control deletes the consumer's use of the new value. A substitution control does not count as one.
   - The Diagnosis states, per consumer, whether it still agrees with the others that read the same value: what Save writes, what the
     preview shows, what the floor checks.
   - *Sighted:* chain 3, CR-1 (the settled floor had a substitution control only) and CR-2 (the preview was judged base-to-fix). Chain
     3b's fixer measured every consumer of its changed error with a probe and a control, which is the form to keep.
4. **Where a criterion depends on bundling or module identity, devops serves the tip build it already makes, and sends the criterion's
   request.** Files: `~/.claude/agents/devops.md` (Phase 2A, Packaging) and `~/.claude/agents/qa.md` (Assumption Not Checked: "why it was
   not run" cites a measured cost or a missing precondition, never an estimate).
   - This is batch b's Recommendation 2's run limb, sighted a second time.
   - The served build uses the record's postgres harness (Recommendation 7 of this list), never `.env.local`'s database. The workspace
     `CLAUDE.md` rule moving message ids out of production's range applies before any save.
   - *Sighted:* chain 3b (the ANC was left to B-1 while a 27-second build ran unserved); chain 2 (batch b).
5. **Record captures are never `*.log`.** Files: `verification/fix-recent-message-ids/devops/build-tip.sh` and its copy
   `verification/fix-get-one-absent-not-found/devops/build-tip.sh` (each writes `build.log`, at line 22). Lifting the script into
   `agent-output/tools/` with a `.txt` output is the record owner's change. Also `~/.claude/agents/fixer.md`, `qa.md` and `devops.md`
   (capture naming), since the record's `.gitignore` line 21 excludes `*.log`.
   - *Sighted:* chain 3's fixer (`b55fba9` left the captures out, renamed at 08:11) and devops (a `sed -i` on the record). Chain 3b's
     fixer (09:15) and devops: the deployment record cites `next-build-b663b35/build.log`, and `git ls-files` lists only
     `build-output.txt`, `exit` and `meta.txt` there. The cited path is not in the repository.
6. **QA's verdict suite run does not share the box with its own mutation sweep.** File: `~/.claude/agents/qa.md` (Phase 2 execution
   order).
   - *Sighted:* chain 3, twice (`suite-f23568a.*` and `suite-b829314.*`, each exit 1 on the same unchanged timeout, each followed by a
     quiet re-run). The test's own load sensitivity is a separate item, already in `INBOX.md` line 321.
7. **Lift the real-postgres harness into one record tool, and replace the brief's database line with it.** Files: a new
   `agent-output/tools/` entry (the record owner's), and `~/.claude/agents/steering.md` § Briefs (the line "a test database is a
   throwaway container or the fake kysely driver").
   - This is batch b's Recommendations 2 (brief limb) and 3, sighted again.
   - There are now four chain-local copies under `verification/`. The record's helper policy for tests lifts at the third duplicate, and
     the same threshold argues for this tool.
   - The brief line still appears word for word in chain 3b's common brief. Hazard 1 had to override it.

**Sightings for pending recommendations of `retrospectives/fixer-batch-2026-11-21-b-retrospective.md`** (`Active`, read at 10:2xZ):
- **Rec 1** (a boundary double through the real import form): applied in chain 3b through its determination (table above). It is still
  absent from `fixer.md` and `code-reviewer.md` as far as this corpus shows; the definitions were not read here.
- **Rec 4** (an evidence class per flow): applied in chain 3b through its brief. Chain 3's brief (07:54Z) came before batch b
  (08:07Z), and its QAF-2 shows what the rule prevents.
- **Rec 6** (a source handoff closes after its post-deploy row passes): applied by steering in both chains.
- **Rec 7** (a falsified verdict gets a reconcile line in the closed record): still not done for chain 2.
  `grep -c -i falsif qa/closed/fix-message-not-found-qa.md` gives 0, and its last commit is still `83e96567` (07:53:13Z). Chain 3's PD-1
  falsified a limb by a cause upstream of the release, not chain 3's verdict, so no reconcile line is owed in
  `qa/closed/fix-import-save-conflict-qa.md`.
- **Rec 8** (steering lodges its own process facts): sighted in good form. Steering disclosed its record-write gate refusal in the block it
  touched (effort rulings 09:51Z).

**Not proposed:** the one-tree queueing of 3b behind 3, and the park. Both are his choices.

No recommendation is for the effort's next chain alone, so no handoff is created in this run. Chain 3c's diagnose-first constraint is
already on handoff 6cc5f883.

## Cost

Each figure was taken with `python3 ~/.claude/tools/cc-usage.py chain <suffix> --since <determination> --until <release, rounded up to
the minute>`. The outputs are in `verification/fixer-batch-2026-11-21-c/cost/`. Every chain session was resolved from the registry
cache, and none was unrecoverable. Subagent usage is filed under its parent row. Production lines come from
`git -C website diff --numstat <base> <tip> -- src ':!**/__tests__/**'`.

**Chain 3** (`chain fix-import-save-conflict --since 2026-11-21T07:54 --until 2026-11-21T08:54`)
- Session set: fixer $7.24, code-reviewer $3.33, qa $7.08 (own $6.38, `browser-walker` $0.69, `general-purpose` $0.01), devops $1.39.
  **Total $19.04.**
- After the release (`--since 08:54 --until 09:06`): qa $1.83 (PD-1, of it `browser-walker` $0.26), devops $0.71. Total $2.54.
- Production lines: 27 (`NewMessageModal.tsx` +27/−5). **$0.71 per production line.**

**Chain 3b** (`chain fix-get-one-absent-not-found --since 2026-11-21T08:57 --until 2026-11-21T10:12`)
- Session set: fixer $5.65, code-reviewer in two sessions, `d8563fc1` before the park $1.17 and `a30f06dc` after it $2.06, qa $4.09 (own
  $4.08, `general-purpose` $0.01), devops $1.84. **Total $14.81.**
- After the release (`--since 10:12 --until 10:19`): qa $1.00 (B-1), devops $0.15. Total $1.15.
- Production lines: 149 by numstat (`Navigation.tsx` +139, `shared.ts` +7, `message.ts` +3). 136 of the `Navigation.tsx` lines are a
  re-indent; `git diff -w --numstat` gives +13. **$0.10 per production line by numstat, $1.14 per line by `-w`.** The `-w` figure is
  the honest one for effort.

**Steering** (`chain steering-hooks --since 2026-11-21T07:54 --until 2026-11-21T10:19`): two sessions.
- `7f338190` (before the park), $21.02: own $12.11, `deweeder` $5.82, `general-purpose-sonnet` $0.47, `general-purpose` $0.01,
  `retrospective` $2.62.
- `c9d29d3a` (respawned 09:49:50Z, live), $4.67: own $3.79, `general-purpose` $0.08, `retrospective` $0.81.
- The window also carries work that is not these two chains'. The `deweeder` and the first `retrospective` row are batch b's scoring and
  retrospective (effort rulings, blocks 08:00Z and 08:06Z). The second `retrospective` row is this document, part-way through. The row
  also holds the PD-1 follow-up, chain 3c's queueing, and the park and unpark. It cannot be split by chain.
- The coordinator, `steering-coordinator`, was not read. No session outside the two families and steering was read.

**Batch:** $33.85 for role sessions in window ($19.04 + $14.81), over 176 production lines by numstat ($0.19 per line) or 40 by `-w`
($0.85 per line). That excludes post-release work ($3.69) and steering. Chain 3b is the fix round for chain 2's escaped limb. Counted
together, the not-found effort cost $19.62 + $14.81 = $34.43 in role sessions for 56 + 13 effective lines.

## Handoff

- **Architect: recommended.** Batch b's architect item (project-utils' committed `dist/` is CommonJS and loads kysely's CJS build, while
  website imports the ESM build) has no carrier: `INBOX.md` has no CJS or CommonJS line, and `architecture/system-architecture.md`
  describes `getPostgres()` without its module format (lines 141-142, 276). Chain 3b removed the one dependent site, so this is a
  standing property for the next `instanceof` against a kysely class, not a live defect. This run writes only under `retrospectives/`.
  The `INBOX.md` entry is steering's to lodge.
- **For steering, found while reading (not this stage's to fix):** `deployment/closed/fix-get-one-absent-not-found-deployment.md`
  (Packaging row) cites `verification/fix-get-one-absent-not-found/devops/next-build-b663b35/build.log`, which is ignored and
  untracked. Its content is in the committed `build-output.txt` beside it.
- **Open carriers this batch leaves, read at write time:** `handoff/message-link-import-returns-empty-message-2026-11-21.md` (`Open`,
  chain 3c); `handoff/fix-import-save-conflict-unchecked-hazards-2026-11-21.md` (`Open`, own trigger);
  `handoff/newmessagemodal-preexisting-react-hooks-lint-errors-2026-11-21.md` (`Open`); `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md`
  (`Open`). Later documents are authoritative on their state.
- **Roadmap:** none owed. The determinations name no epic.
