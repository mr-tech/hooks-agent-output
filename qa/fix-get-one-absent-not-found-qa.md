---
ID: n/a
Origin: fix-get-one-absent-not-found
UUID: fcce3991
Verified-At: "b663b35 — repos=website; chain/fix-get-one-absent-not-found b663b354fb236c3ee58d8b0be01778e1908e0e10"
Status: QA Complete
Status-Detail: "Phase 2 PASS at website b663b35, 0 findings. Post-deploy row B-1 (this register) is carried by devops's post-deploy carrier; it does not gate the release act."
Phase: 2
---

# QA Report: fix-get-one-absent-not-found

**Plan Reference**: none. This is a fixer chain. The scope statement is `steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T08:57Z".
**Implementation Reference**: `implementation/fix-get-one-absent-not-found-implementation.md` (`Handoff-At: b663b35`, record `9e357ef5`)
**Code Review Reference**: `code-review/fix-get-one-absent-not-found-code-review.md` (`Reviewed-At: b663b35`, Round 1 `APPROVED`, record `c55f4e53`/`84473927`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T10:03 | steering-hooks (brief `steering/fix-get-one-absent-not-found-brief-qa.md`) | Phase 2 at the reviewer's `Reviewed-At` | Phase 2: PASS at website `b663b35`, 0 findings. Suite 2316/2316 with exit 0; typecheck exit 0. Sweep 7 of 8 killed; the survivor is killed by the fixer's committed probe. A header probe for another user's message is red at base and green at tip. Production re-read before deploy: an absent number still answers 500. Register B-1 minted. |

## Scope and stage start

- **Stage start.** The code reviewer's committed verdict is `APPROVED`, Round 1, at `Reviewed-At` `b663b35`. I read it at the record on 2026-11-21T09:57Z (record commits `c55f4e53` and `84473927`).
  - The website tree: `HEAD` = `chain/fix-get-one-absent-not-found` = `b663b354fb236c3ee58d8b0be01778e1908e0e10`.
  - `git status --porcelain` showed `?? .playwright-mcp/` only. That path is foreign and was not touched.
- **No Phase 1.** This is a `fixer` task, and the owner selected no Phase 1 for it (GLOSSARY, "Scoping determination").
- **No Irreversible Side-Effect Register.** The fix touches no irreversible effect. `getOne` is a read, and the header change is a render. The implementation's "Residue in production" section was read for this.
- **Production lines.** I re-counted them with `git diff --numstat b829314..b663b35` over production paths: `Navigation.tsx` 139, `shared.ts` 7, `message.ts` 3, for **149**. That is at least 20, so this gate is owed. `git diff -w` shows `+13 -6` over the three files, so most of `Navigation.tsx`'s lines are a re-indent.
- **Criteria assessed.** These were fixed from the brief before anything was executed:
  - **C1.** Scope item 1: `message.getOne` answers NOT_FOUND with chain 2's one text for a number no row holds. This must hold whichever kysely build raised the error. The red error must come from the kysely build the query really runs, seen red at `b829314`.
  - **C2.** Scope item 2: on `/message/m/[id]/edit` in the not-found state, the name field, the File/Edit/View/Help menus and Send do not render. The site navigation and the notice stay.
  - **F1–F4.** The fixer's four **User-visible flows** (the brief: a flow found wrong is a finding).
- **Architecture.** I read `architecture/system-architecture.md` for project-utils' `getPostgres()`: it is a Kysely-over-pg singleton shipped as committed dist. The change states no new mechanism for the record.

## Implementation Review (Post-Implementation)

### Code Changes Summary

I re-read the diff with `git diff -w b829314..b663b35 -- src ':!**/__tests__/**'`.

- **`shared.ts`** declares `MessageNotFoundError extends Error` with the message `'no result'`, and `getMessage` calls `.executeTakeFirstOrThrow(MessageNotFoundError)`. Nothing else in the file changes.
- **`message.ts`** drops the `kysely` import. `asNotFound` takes `typeof MessageNotFoundError`, and `getOne` catches with `asNotFound(MessageNotFoundError)`.
- **`Navigation.tsx`** reads `isNotFound` from `useMessage()` and wraps the block that holds the name field and the menus in `{!isNotFound && ( … )}`.

**Mechanism, re-derived at the library.**
- Both `website/node_modules/kysely` and project-utils' own `node_modules/kysely` resolve to one physical package, `.pnpm/kysely@0.26.1` (`readlink -f` of both).
- The difference is the entry point. The website's ESM `import` loads one build, and project-utils' `require` loads `dist/cjs`.
- The CJS `select-query-builder.js` `executeTakeFirstOrThrow(errorConstructor)` throws `new errorConstructor(node)` whenever `isNoResultErrorConstructor(fn)` is true. That function is `hasOwnProperty(fn, 'prototype')`, which a class always satisfies.
- So the error thrown is the website's own class whichever kysely build ran the query. The `instanceof` test compares two website modules, not two kysely builds.

### TDD compliance (fixer form)

A fixer chain owes no TDD table. Its evidence is the fixer document's Test section:
- **Red at `b829314`:** `fixer/red-at-b829314.txt`, exit 1, 2 failed and 21 passed. The reviewer reproduced it independently in `code-review/red-at-b829314.txt`.
- **Green at `b663b35`:** 23 passed.
- **Controls:** 4 of 4 killed (`fixer/controls/mut-run.txt`).

This evidence is present and complete, so the gate passes.

## Test Coverage Analysis

| File | Function/Class | Test File | Test Case | Coverage Status |
|---|---|---|---|---|
| `shared.ts` | `getMessage` → `MessageNotFoundError` | `src/server/api/routers/__tests__/message.get-one-not-found.test.ts` | `message.getOne over the CommonJS kysely build that project-utils' getPostgres loads` › `answers not found with the one message text for a number no message holds` | COVERED (sweep: `getmessage-default-kysely-error` killed) |
| `message.ts` | `getOne`'s catch | same file, plus the existing absent-number cases | same, plus `gives the same answer in all three cases, with none of the message in it` | COVERED (sweep: `getone-refusal-by-trpc-code` killed) |
| `Navigation.tsx` | the `isNotFound` guard | `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx` | `the edit page's header` › `keeps only the site navigation beside the not-found notice …` and `shows the message name field, the File, Edit, View and Help menus and Send …` | COVERED (sweep: 5 guard mutants killed, both directions) |
| `shared.ts` | `MessageNotFoundError`'s message (the other callers' answer, which ruling 09:03Z condition b says is preserved) | none in the suite; `verification/fix-get-one-absent-not-found/fixer/probe/message.other-callers-probe.test.ts` | probe: `message.updateRecentMessageData for a number no message holds` × ESM and CJS | COVERED by the committed probe only. See the survivor disposition. |

### Test audit (Test Conventions, testing-patterns Iron Laws)

I audited the touched test files whole: the two test files and the helper `__tests__/helpers/capturingDatabase.ts`.

- **Hazard 1 (common brief).** The red error for C1 is raised by the CJS kysely build, from `createRequire(import.meta.url)('kysely')`. That build is the physical file project-utils' `require("kysely")` loads, so the error is not raised by the build the code under test imports. At the tip the code under test imports no kysely at all.
- **A second instrument, of a different shape.** The reviewer's probe runs project-utils' real `getPostgres()` over a throwaway `postgres:16`. It gives 500 at `b829314` and NOT_FOUND at `b663b35` (`code-review/out/getone-{b829314,b663b35}.json`). Hazard 1 is met.
- **Iron Law 5.** The capturing driver's row source is invented, an empty result for an absent id. The fixer's document names this ("the row source is a fake (an empty result), not a postgres"). An empty `rows` array is pg's real answer for no match, and the real-postgres probe covers that limb.
- **Escaped provenance.** Case 1 carries exactly one `// escaped: deployment/closed/fix-message-not-found-deployment.md` line. That artefact is `Status: Released`, released at 07:51:38Z, which is before the fix commit (09:09Z). It is valid bug-form provenance. Cases 2 and 3 are spec-form.
- **ID-token class.** I scanned the whole files, not only the added lines. The scan used `grep -n -i -E` of the class over each file, filtered to title and comment lines, and found 0 hits in each of the three files. This closes the reviewer's stated blind spot.
- **Time-based cells.** `grep -c -E "useFakeTimers|setTimeout|Date\.now|advanceTimers"` gives 0 in each file.
- **Mounting.** The DOM cases mount with `createRoot`/`act` through the file's `mountDom`, under the DOM project.
- **Expectations are literals.** They are `NOT_FOUND_TEXT` and `{nameField:false, menus:[], send:false}`, independent of the code under test (axiom E).
- **No disposition class is left standing on the touched surface.**

## Test Execution Results

Captures are under `verification/fix-get-one-absent-not-found/qa/`, committed in record `d1c5744e` (suite, typecheck, mutants) and `ebe3a2c9` (probe, production read).

| Check | Command | Result |
|---|---|---|
| Full suite at tip | `npx vitest run --reporter=json --outputFile=…/qa/suite-tip.json` in the shared tree at `b663b35` | exit **0** (`suite-tip.exit`). `numTotalTests` 2316, passed 2316, failed 0, pending 0. `testResults` has 159 entries. |
| Suite reconcile vs base | node over `verification/fix-get-one-absent-not-found/qa/suite-tip.json` and `verification/fix-get-one-absent-not-found/fixer/suite-base.json` (`b829314`), by path and by file::fullName | Files: 0 only-base and 0 only-tip. Cases: 3 new (cases 1 to 3 by title) and 0 lost. |
| Typecheck, both programs | `pnpm run typecheck` | exit **0** (`typecheck.exit`) |
| Header probe, another user's message (F3) | `qa/probe/header-other-users-message.block.tsx` appended to the tip's `MessageNotFound.edit-and-send-pages.test.tsx` (blob `6a52d2c9`), in a `git archive` export per SHA, run under `unshare -rn` with loopback up | **Tip `b663b35`: exit 0, 14 passed. Base `b829314`: exit 1, 2 failed** (case 2 and the probe, each on `nameField: true`). Probe file hashes: `probe-file-{tip,base}.sha256`. At base the probe got past its 404 and notice assertions, so the other-user case already answered 404 there; the probe fails only on the header. Exports removed afterwards. |
| Production, before deploy (B-1's instrument run read-only) | stage browser, test account signed in, `browser_evaluate` of the getOne `fetch` | 10:01:25Z: `6022` and `999999999999` give **500 `INTERNAL_SERVER_ERROR` "no result"**, `1000` gives 404 `NOT_FOUND` with the one text, `6010` gives 200 (`prod-getone-pre-deploy-2026-11-21T1001Z.json`). Production still holds the unfixed behaviour. Browser closed, no profile holder, caches emptied. |

### Mutation sweep

- **Predicate.** The sweep covers production lines that `git diff -w -U0 b829314..b663b35` reports as added, over `src` excluding `__tests__`:
  - `Navigation.tsx` lines 81, 268 and 410;
  - `message.ts` lines 14, 35 and 73;
  - `shared.ts` lines 151–156 and 172.
- **Exclusion.** The 136 lines of `Navigation.tsx` that changed only in whitespace are excluded. `node ~/.claude/tools/mutant-gen.js --range b829314..b663b35` generated 37 mutants (`verification/fix-get-one-absent-not-found/qa/mutants-range.json`), all in `Navigation.tsx`, and 35 of them sit on those re-indented, behaviour-unchanged lines.
- **Generated mutants kept.** Two: `Navigation.tsx:268:not` and `:268:&&`. mutant-gen produces nothing on the `shared.ts` and `message.ts` added lines, since they carry no operators.
- **Mutants added by QA.** `header-guard-reads-loading-state` is the guard keyed on the wrong state. `absent-row-error-text-changed` changes the preserved message text.
- **Fixer's controls, re-run.** The fixer's four controls were re-run as a cross-check under a differently shaped instrument: the full suite, against the fixer's two files.
- **Run.** `python3 ~/.claude/tools/mutation-run.py --sha b663b354… --mutants qa/mutants.json` (blob `82b9c95a`, committed in `d1c5744e` before the run) `--dep node_modules -- npx vitest run --config fixer/controls/vitest.config.ts` (blob `7526caaa`, record `9fb9046b`). It ran under `systemd-run --user --scope`, in per-run `git archive` exports. The runner was driven by a helper.
- **Captures.** `qa/sweep-run.txt` and the table `qa/sweep-out/mutation-table-b663b354…-20261121T095946Z-p3177733.json`.
- **Control.** It passed, with `tests_run` 2316. Every mutant has `count` `checked`, so tests_run equals the control's.

**Result: 7 of the 8 mutants in `verification/fix-get-one-absent-not-found/qa/mutants.json` (the predicate above plus the named QA and fixer additions) are KILLED.**

| Mutant | Outcome | Cases it reddened |
|---|---|---|
| `Navigation.tsx:268:not` | KILLED | case 3; case 2; `layout.navigation-guard.test.tsx` › `does not ask for the link to the same message's send page` |
| `Navigation.tsx:268:&&` | KILLED | same three |
| `header-guard-reads-loading-state` | KILLED | case 2 |
| `header-controls-always-hidden` | KILLED | case 3; the navigation-guard case |
| `header-controls-never-hidden` | KILLED | case 2 |
| `getone-refusal-by-trpc-code` | KILLED | 9 cases, including case 1, the absent-number page cases, `does not retry a not-found answer`, and case 2 |
| `getmessage-default-kysely-error` | KILLED | the same 9 |
| `absent-row-error-text-changed` | **SURVIVED** | none in the suite |

- **Every new case reddens under at least one mutant of its own surface.** Case 1 reddens under the two server mutants, case 2 under four guard mutants, and case 3 under three. None of the new cases is non-discriminating.
- **Survivor disposition, `absent-row-error-text-changed`.** It edits `super('no result')` to `super('no row')`, the same edit as the fixer's probe control. The fixer's committed probe `fixer/probe/message.other-callers-probe.test.ts` is red under it, with 2 failed (`fixer/probe/probe-control-message-changed.txt`), and green at `b663b35`.
  - What this behaviour is: the preserved claim (ruling 09:03Z condition b) that the other callers still answer `INTERNAL_SERVER_ERROR "no result"`.
  - Why it is not a finding at this tree: the claim has an assertion, seen failing when the behaviour is lost, committed with the chain. So the severity floor's condition ("no assertion that fails when it is lost") is not met at this tree.
  - Residue: the standing suite does not carry that probe. An assertion pinning an internal 500's text in the suite was not judged worth adding. Recorded as residue, not a finding.

### Criteria verdicts

- **C1: met.**
  - Case 1 is red at `b829314` and green at `b663b35`.
  - The real-postgres differential (reviewer) and the sweep both agree with it.
  - The example's class is "any id with no row". The code path does not branch on the id's value after the select, so a single absent id stands for the class. Production's two absent ids (`6022`, `999999999999`) answer alike.
  - One limb rests on the Next production bundle: whether shared.ts and message.ts load as one module instance there. That is this pass's Assumption Not Checked.
- **C2: met.** Case 2 is red at base and green at tip. The guard's mutants are killed in both directions, and case 3 stands as the control that a loadable message keeps its controls.
- **F1 (absent number → notice at once, not a retrying blank editor): met.**
  - `retryUnlessRefused` (`MessageProvider/index.tsx`) does not retry a 4xx, and the edit page returns `<MessageNotFound />` on `isNotFound`.
  - The existing case `asks for the message once, without retrying the refusal` (`[404]`) and case 1 cover it. Production's present 500 is the retried blank-editor state.
- **F2 (header reduced on that page): met** (case 2).
- **F3 (another user's message or an unmanaged server: same notice, now the same reduced header): met for another user's message** by the QA probe, red at base and green at tip.
  - For an unmanaged server, the header reads only `isNotFound`, the wire code. The existing `gives the same answer in all three cases` case shows that code is NOT_FOUND for the server case, and production gives 404 for `1000` today.
  - Not run as a header mount; recorded as residue.
- **F4 (own message unchanged): met** (case 3).
- **Residue (not blocking, outside the criterion's state).**
  - While an absent number is still loading, the full editor bar shows until the single NOT_FOUND arrives. The reviewer noted the same.
  - F1's "at once" holds only after the one request returns.

## Findings

None.

## Blocking-condition register

This is the chain's register. Later stage documents are authoritative on each row's execution state: devops's post-deploy carrier for this chain, then the deployment record.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | post-deploy-observable | C1 and C2 in production (settles scope items 1 and 2, and this pass's Assumption Not Checked): signed in, a number no row holds gets the one not-found answer, and `/edit` for it shows the notice without the editor bar. | In the stage browser, signed in as the test account on `https://hooks.gg/message`: `browser_evaluate` of `fetch('/api/trpc/message.getOne?input=' + encodeURIComponent(JSON.stringify({json: id})))` for `6022` and `999999999999` (absent), `1000` (a server not managed) and `6010` (loads). Then open `/message/m/6022/edit` and read: the notice; `input[aria-label="Message Name"]` absent; no File/Edit/View/Help buttons; no `a[href$="/send"]`; `[aria-label="toggle site theme"]` and `[aria-label="user menu"]` present; `message.getOne` requests in `browser_network_requests`. Shown to work at minting: run read-only 10:01:25Z (`verification/fix-get-one-absent-not-found/qa/prod-getone-pre-deploy-2026-11-21T1001Z.json`). | qa through the stage browser / the owner by the same page | Vercel production serves a website build whose commit contains `b663b35`. Established from devops's push record and, for the read, from the first absent-number answer changing from 500. A 500 before the first 404 is the old build still serving, not a falsifier: read again after a short wait before calling it. | **Fixed:** `6022` and `999999999999` give 404 `NOT_FOUND` "This message doesn't exist, or you don't have access to it.", byte-identical to `1000`'s body; `6010` gives 200; `/message/m/6022/edit` shows the notice, no name field, no menus, no Send, plus the theme toggle and user menu, after 1 getOne request (404). **Unfixed (measured 10:01:25Z on the build then serving):** `6022` and `999999999999` give 500 "no result"; `1000` gives 404; `6010` gives 200. One 404 for `6022` once the new build serves refutes the unfixed state by construction. | If `6022` still answers 500 after the new build serves, the fix did not reach the runtime. The likeliest cause is a duplicated module instance in the Next bundle (the Assumption Not Checked), and the user still sees a blank editor that retries. If the editor bar still shows above the notice, the header half did not ship. If `6010` fails, loading broke. | qa | The post-deploy carrier devops creates at this chain's Stage 1 (`handoff/<name>.md`, per the 08:57Z determination's post-deploy line). Its reading closes B-1 of `handoff/fix-message-not-found-post-deploy-2026-11-21.md` and handoff 7c3e91a4. | Open. It does not gate the release act. |

## Assumption Not Checked

This pass assumes something it does not test: that the Next production server bundle loads `src/server/api/utils/shared.ts` and `src/server/api/routers/message.ts` as one module instance in the tRPC API route. If it does, the `MessageNotFoundError` that `getMessage` throws is the class `getOne` checks.

- **Why it was not run:** settling it needs a `next build` with env and an inspection of the bundle, which is more than a minute's run.
- **Falsity signature:** after the deploy, an absent number on hooks.gg still answers 500 "no result".
- **Owner:** register row B-1, read by qa after the deploy. Its carrier is devops's.

## Handoff

- **PASS** at website `b663b35`, delivered to `steering-hooks` by SendMessage (the brief: devops is started from it).
- **Merge:** devops's, to website `master` (Vercel production), on the owner's word.
- **Release consequence:** devops's to establish (no workflow read in this pass).
- **The fixer's User-visible flows F1–F4 are correct as written.** F3's server limb is entailed by the wire code; it was not mounted.
- **Set up and removed this pass:**
  - two `git archive` exports in this session's scratchpad (removed, `ls -A` empty);
  - the runner's per-run exports under `mut-work` (removed; `ps` shows no vitest or mutation-run process);
  - the stage browser (closed, caches emptied).
