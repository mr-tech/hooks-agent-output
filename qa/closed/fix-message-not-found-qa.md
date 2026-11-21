---
ID: n/a
Origin: fix-message-not-found
UUID: 46210f8b
Verified-At: "f4baebb — repos=website; production code identical to 6b539e5 (6b539e5..f4baebb touches two test files only)"
Status: Committed
Status-Detail: "Phase 2 PASS at website f4baebb (chain/fix-message-not-found), released with master at f4baebb on 2026-11-21T07:51:38Z. Post-deploy row B-1 is open, carried by handoff/fix-message-not-found-post-deploy-2026-11-21.md (Owning-Stage qa)."
Phase: 2
---

# QA Report: fix-message-not-found

**Plan Reference**: none (fixer route). Scope statement: `steering/fix-message-not-found-rulings.md`, block "2026-11-21T06:46Z".
**Implementation Reference**: `implementation/fix-message-not-found-implementation.md` (`Handoff-At: 6b539e5`).
**Code Review**: `code-review/fix-message-not-found-code-review.md` (`Reviewed-At: 6b539e5`, Round 1, APPROVED_WITH_COMMENTS).
**Brief**: `steering/fix-message-not-found-brief-qa.md` and `steering/fix-message-not-found-brief-common.md`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T07:40 | steering-hooks (brief above); stage start is the code review's committed verdict at `Reviewed-At` `6b539e5` | Phase 2 for a fixer chain at 56 added production lines | Phase 2 at `6b539e5`, then re-anchored on QA's test-only commit `f4baebb`. Suite 2297/2297 at `6b539e5` and 2303/2303 at `f4baebb`, exit 0 both times. A 28-mutant sweep over the production diff left 6 survivors. QAF-1 and QAF-2 (MEDIUM) were closed by QA cases at `f4baebb`: 7 of 7 re-run mutants killed, plus 1 of 1 for the success path. QAF-3 LOW is a stated limit; QAF-4 LOW (harness) was fixed. The reviewer's Assumption Not Checked is closed true. Post-deploy row B-1 was minted, and its instrument read current production. **PASS.** |
| 2026-11-21T07:52 | devops-fix-message-not-found | Document closed | Status: Committed. Released with website `master` at `f4baebb` (07:51:38Z). Row B-1 is carried by `handoff/fix-message-not-found-post-deploy-2026-11-21.md`, `Owning-Stage` qa; the register row's `State` stays `open` there, not here. Moved to closed/. |

## Scope of this pass

- **Phase 1:** none. On the fixer route the owner's selection gives no Phase 1 (GLOSSARY, "Scoping determination").
- **Irreversible Side-Effect Register:** not produced. `getOne` is a read, and the change adds no write, publish or delete. The fixer's "Residue in production" also shows that the blank editor's save paths are no-ops on a null message (`useApiMethods.ts` `saveMessage` and `updateMessage`), as the reviewer re-read.
- **Production lines added, re-counted:** `git diff --numstat 6f76c6d 6b539e5` over the five production paths gives 18 + 4 + 5 + 8 + 21 = **56**. The second instrument, of a different shape, is the reviewer's `grep -c` over a diff file (47 + 9). That is 20 or more, so this stage is in the set.
- **Criteria assessed, listed before execution:** the three items of the bounded scope statement (block 06:46Z); the five hazards of the common brief; and the fixer's **User-visible flows** list (brief). No criterion was added afterwards.
- **Architecture:** `architecture/system-architecture.md` line 136 (the personal-message bullet) still holds and is now incomplete; the fixer's INBOX FYI carries it. Line 213 ("Access refusals leave no always-on signal") is unchanged by this fix. `architecture/website.md` was not read this pass.

## Implementation Review

### Code Changes Summary

Production code is `6f76c6d..6b539e5`, 5 paths, all inside the write set:
- `src/server/api/routers/message.ts`: `messageNotFound`, `asNotFound`, and `getOne`'s three mapping sites.
- `src/providers/MessageProvider/index.tsx`: `retryUnlessRefused`, the `retry` option on `getOne`'s query, and `isNotFound`.
- `src/app/message/m/[id]/_components/MessageNotFound.tsx` (new).
- `src/app/message/m/[id]/edit/page.tsx` and `src/app/message/m/[id]/send/page.tsx`: the early return.

Unchanged: `authorizeGuildAdmin.ts`, `authorizeGuildUser.ts`, `user.ts`, `shared.ts`, `TrpcProvider.tsx` and `Navigation.tsx` are absent from `git diff --numstat 6f76c6d f4baebb`.

QA's commit `f4baebb` changes only the two new test files (`git diff --numstat 6b539e5 f4baebb`: +70/−4 and +30/−6).

### TDD evidence (fixer route)

No TDD table is owed on a fixer chain. The evidence is the fixer document's Test section. Red at `6f76c6d`: exit 1, 11 failed / 3 passed (`verification/fix-message-not-found/fixer/red-run-6f76c6d.out`). Green at `6b539e5`: 14 passed. Each case that passed at red is paired with a killed control. The tests are spec-form, with no `// escaped:` line; this is correct, because the three sources are handoffs, not incident records. Basenames and titles, including QA's new titles, carry no ID token (checked by hand against the Test Conventions class).

### Audit of the implementer's tests

- **Iron Law 5, the fixture that invents a store's return (QAF-1).** The guild-site case "answers unauthorized, not not found" gave `fetchUserGuilds` a `null`. The real `fetchUserGuilds` (`src/utils/redis/index.ts`, through `getFromCache`) never resolves `null`. A Discord failure either throws `Error('Failed to fetch guilds…')` or rejects inside `wait`. The fixer's document names the stub, but its falsity analysis covers only the id shape. So the case's title described a production state that cannot occur, and it asserted the 401 that production does not give in that state (it gives 500).
- **Other-direction controls missing on the page (QAF-2).** The page file asserted the notice for a not-found load. It did not assert that the notice is absent for any other refusal, and no page-file case loaded a message.
- **Once-only case (QAF-3).** This is the reviewer's note, measured below.
- **Harness defect (QAF-4).** The page file's `pusher-js` mock was an arrow function, which cannot be called with `new`. It never ran, because no case loaded a message. Once a message loads, `usePusher` constructs `Pusher` and the root unmounts with `TypeError: … is not a constructor`. QA replaced it with the constructible form that `MessageProvider.stored-draft.test.tsx` already uses.
- **Independence.** Expected values are literals, or errors the real client receives from the real handler over HTTP. None is derived from production constants. `retryUnlessRefused`'s `[true, true, true, false]` is react-query's default of 3 retries, a domain fact.

### Cases QA added (committed at `f4baebb`)

`src/server/api/routers/__tests__/message.get-one-not-found.test.ts`, describe "message.getOne when the load fails for a reason other than access". It replaces the `null`-fixture describe:
- "answers a server error, not not found, when the user's servers cannot be read from Discord": `fetchUserGuilds` throws the real `Error` shape.
- "answers a server error, not not found, when the database fails while checking the message's owner": the owner query throws.
- "answers unauthorized, not not found, for a server message when the session has no account": `fetchAccountFromSession` answers `null`, which the real function returns when no session row matches.

`src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx`:
- "the edit page for a message the signed-in user can load › opens the message, with no not-found notice", and the same for the send page. The owner's row is served through the real handler, and the cases expect `[200]`.
- "the edit page for a load refused other than as not found › shows no not-found notice", and the same for the send page. The load is `not-a-number` → `BAD_REQUEST`. The case waits on a probe component that reads `useMessage().messageError`, so the absence is read after the error has rendered.
- The `pusher-js` mock fix (QAF-4).

Each case was seen red under a mutant (Mutation sweep, below). The cases pass `pnpm run typecheck` (both programs, exit 0, `verification/fix-message-not-found/qa/raw/typecheck-tests.out`) and eslint on both files (exit 0, `verification/fix-message-not-found/qa/raw/eslint-tests.out`). Both runs were on bytes identical to `f4baebb`: the blobs `d952efb` and `a62a669` equal `git rev-parse f4baebb:<path>`.

## Test Execution Results

All captures are under `agent-output/verification/fix-message-not-found/qa/`.

| Run | Command | Result |
|---|---|---|
| Suite at `6b539e5` | `npx vitest run --reporter=json` (`raw/suite-6b539e5.{json,out}`), `git diff --quiet HEAD -- src` true | exit 0. `numTotalTests` 2297, passed 2297. 159 `testResults`. By path against the fixer's base capture, the only additions are the two new files, and nothing is removed. |
| Typecheck at `6b539e5` | `pnpm run typecheck` (`raw/typecheck.out`) | exit 0 |
| Suite at `f4baebb` | the same command (`raw/suite-f4baebb.{json,out}`) | exit 0. 2303 passed of 2303, which is 2297 − 1 + 3 + 4. 159 files, with the same path set as at `6b539e5`. |
| Refusal probe, reviewer's instrument | `code-review/getOne.refusal-probe.test.ts` (sha256 `849eb8ea…`, record commit `a56b691`), run in a `git archive` export of `6b539e5` under `unshare -rn` with loopback up | `NODE_ENV=production`: exit 0, all three oracles hold, 0 `"stack` matches (`raw/probe-prod-6b539e5.{json,out}`). Default env, the positive control: exit 1. The three refusals' 404 bodies differ by throw-site stack (`message.ts:74`, `:76`, `:78`); 146 `"stack` matches (`raw/probe-default-env-6b539e5.{json,out}`). |

### The reviewer's Assumption Not Checked (built-app error bodies): closed, true

`initTRPC.create` in `src/server/api/trpc.ts` passes no `isDev`. In tRPC 11.10.0, `isDev` defaults to `process.env.NODE_ENV !== "production"` (`initTRPC-RoZMIBeA.mjs`), and `data.stack` is added only when `isDev` holds (`getErrorShape-vC8mUXJD.mjs`). Next's bin sets `NODE_ENV` by command (`node_modules/next/dist/bin/next`, the `defaultEnv` assignment). The live answer was read directly:
- `curl` of `https://hooks.gg/api/trpc/message.getOne` signed out → 401, body with no `stack` key (`grep -c '"stack"'` = 0; `raw/prod-unauth-getone-body.json`).
- Signed in as the test account, 500 and 403 bodies carry no `stack` key (`raw/prod-signed-in-getone-pre-deploy.json`).

The default-env probe run above is the positive control: it shows the count can see a stack when one is served. So production serves no throw-site stack, and the three cases' bodies cannot be told apart by it.

### Mutation sweep

- **Scope:** production paths of `git diff 6f76c6d..6b539e5`, the five files above.
- **Set:** `verification/fix-message-not-found/qa/sweep/sweep-mutants.json` (blob `9a9f780`). It holds 21 generated mutants (`node ~/.claude/tools/mutant-gen.js --repo website --range 6f76c6d..6b539e5`, every operator candidate on added lines, 0 dropped, test files skipped) and 7 QA mutants (`verification/fix-message-not-found/qa/sweep/qa-mutants.json`). The QA mutants are the per-site "maps more than its refusal" class, one coupling mutant, and the notice predicate in both directions.
- **Runner:** `mutation-run.py` (blob `b26916e`), whole suite per run (`npx vitest run`), `--dep node_modules`, a `git archive` export per run. It was run by a helper; QA read the table.

**At `6b539e5`** (`qa/sweep/run/mutation-table-6b539e5…-20261121T072043Z-p1676876.json`, control 2297 passed): 22 of 28 killed, all with count checked, 0 stillborn, 0 aborted. The 6 survivors are dispositioned here:

| Survivor | Disposition |
|---|---|
| `MessageNotFound.tsx:9:true`, `:9:true:2`, `:9:num` (`col`/`cx` flipped, `gap` 4→5) | Layout class arguments. The statement names the wording and the link, not the layout, so this is outside the criterion's class. No test is owed. |
| `qa-guild-site-maps-plain-errors` | **QAF-1.** Closed at `f4baebb`. |
| `qa-owner-site-maps-every-error` | **QAF-1.** Closed at `f4baebb`. |
| `qa-notice-on-any-refusal-code` | **QAF-2.** Closed at `f4baebb`. |

Two killed rows matter for the findings:
- `qa-notice-also-on-success` was killed only by `src/app/message/__tests__/layout.navigation-guard.test.tsx`, no page-file case (QAF-2).
- `qa-notice-on-first-failure-with-default-retry` was killed only by `src/server/api/__tests__/trpc.batch-refusal.test.ts`, no case of the page file (QAF-3).

**Re-run at `f4baebb`**, over QA's test round. This round has no production change, so the re-run covers the survivors it closes plus the mutants whose only killer was the replaced `null` case. The set is `verification/fix-message-not-found/qa/sweep/rerun-mutants.json` (blob `a13945d`), and the table is `qa/sweep/rerun/mutation-table-f4baebb…-20261121T073412Z-p1812102.json`. Control: 2303 passed. **7 of 7 killed**, count checked:

| Mutant | Cases turned red |
|---|---|
| `qa-guild-site-maps-plain-errors` | servers cannot be read from Discord → server error |
| `qa-owner-site-maps-every-error` | database fails while checking the owner → server error |
| `qa-notice-on-any-refusal-code` | edit and send "shows no not-found notice" |
| `message.ts:39:&&` | session has no account → unauthorized |
| `qa-guild-site-maps-unauthorized` | session has no account → unauthorized |
| `every-error-mapped` (fixer's) | retry rule's server-error case; the three new server cases |
| `server-message-always-refused` (fixer's) | manager gets the server message; Discord failure; no account |

**Success path at `f4baebb`** (`verification/fix-message-not-found/qa/sweep/positive-control/`, the page file only, control 11): `qa-notice-also-on-success` was KILLED by both "opens the message, with no not-found notice" cases.

Every case QA added is red under at least one mutant above. The suite instruments are the committed blobs at `f4baebb`.

## Hazards of the common brief, re-derived

1. **Which errors map.** Only the three named refusals map. A Discord failure (plain `Error`), a database failure at the load site or the owner site, and `UNAUTHORIZED` keep their answers. This is asserted at all three sites as of `f4baebb`: at `6b539e5` the guild and owner sites carried no such assertion (QAF-1).
2. **One text.** The server case expects one `{ code, message }` for all three. The probe under `NODE_ENV=production` finds byte-identical status and body per request form.
3. **`getGuild` mapping.** `authorizeGuildAdmin.ts` is unchanged (numstat).
4. **Retry.** `retryUnlessRefused` is on `getOne`'s query only. It refuses 4xx and retries other errors up to 3 times. It is killed by `retry-option-dropped`, `retry-ignores-4xx` and the generated `index.tsx:66` operators.
5. **Header.** `Navigation.tsx` is unchanged. QA did not render the real layout around the notice (Assumption Not Checked).

## User-visible flows (fixer's list): checked

| Flow | Evidence | Verdict |
|---|---|---|
| Deleted or never-existing number at `/edit`: the notice and "Back to your messages" | page case "shows the not-found notice…" (edit); server absent-number case; probe | holds |
| Another user's personal message, or a server you don't manage: the same notice word for word | server per-case and same-answer cases; probe oracle 2 | holds |
| The same three at `/send`, in place of the spinner | page case (send); the early return comes before the `LoadingDots` branch (`send/page.tsx`) | holds |
| "Back to your messages" goes to `/message` | `href="/message"` asserted; `back-link-elsewhere` was killed (fixer) | holds |
| One request on these refusals; the notice straight away | `[404]` asserted; `retry-ignores-4xx` and `retry-option-dropped` killed both cases (fixer) | holds, with QAF-3's limit |
| Your own messages and your servers' messages open as before | page cases "opens the message…" (own personal message, `f4baebb`); server cases for the owner and the manager | holds |

No flow is wrong. The reviewer's CR-1 line (reload of a message that is now gone shows the notice) is steering's addition to the quote, not this pass's.

## Findings

QAF-1 MEDIUM Phase 2 RESOLVED — the stated preservation "any other error keeps its answer" was asserted at the load site only. The guild site's sole case used a `null` that `fetchUserGuilds` never returns, and the owner site had no case. Survivors `qa-guild-site-maps-plain-errors` and `qa-owner-site-maps-every-error` at `6b539e5` are killed at `f4baebb` by QA's three server cases.

QAF-2 MEDIUM Phase 2 RESOLVED — the page file lacked both other-direction controls: no notice for a refusal that is not not-found, and a loadable message opening without the notice. Survivor `qa-notice-on-any-refusal-code` and the page-file blindness to `qa-notice-also-on-success` are closed by QA's four page cases at `f4baebb`.

QAF-3 LOW Phase 2 — the property wanted is that the page makes no second `getOne` request after a not-found answer. The once-only case's `[404]` is never the sole carrier of that property. Under `qa-notice-on-first-failure-with-default-retry` (notice from `failureReason`, `retry: 3`), no page-file case reddened. The case discriminates only because react-query sets `error` after retries end, so a retried 404 delays the notice past `vi.waitFor`'s 1 s cap. Making the count the carrier needs a time-based cell or access to the query client; neither is in this file. Stated limit; criterion 3 stays covered by the kills above. It is transferred to B-1, whose page limb counts the requests on hooks.gg.

QAF-4 LOW Phase 2 RESOLVED — the page file's `pusher-js` mock could not be constructed, and was latent because no case loaded a message. Fixed at `f4baebb` with the suite's existing constructible form.

## Blocking-condition register

This is the chain's register (its first QA document). It is point-in-time: the deployment record, then the carrier `handoff/` document devops creates at Stage 1, are authoritative on each row's execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | post-deploy-observable | Scope items 1–3 on production: signed in, an absent number and a server message the user can't manage get the one not-found answer. The edit page shows the notice after one request. The user's own message still loads. | In the stage browser, signed in as the test account on `https://hooks.gg/message`, `browser_evaluate` of `fetch('/api/trpc/message.getOne?input=' + encodeURIComponent(JSON.stringify({json: id})))` for `6022` (absent), `1000` (a server the test account can't manage) and `6010` (loads). Then open `/message/m/6022/edit` and count `message.getOne` requests in `browser_network_requests` after the notice shows. Shown to work at minting: run read-only at 07:35Z, values in `verification/fix-message-not-found/qa/raw/prod-signed-in-getone-pre-deploy.json`. | QA through the stage browser / the owner by the same page | The Vercel production deployment serves a website commit containing `6b539e5` (precondition, devops's to establish from the deployment record) | **Fixed:** `6022` and `1000` give 404 `NOT_FOUND` "This message doesn't exist, or you don't have access to it.", byte-identical bodies; `6010` gives 200; the page shows the notice with 1 request. **Unfixed (measured 07:35Z):** `6022` gives 500 "no result", `1000` gives 403 `FORBIDDEN`. One observation refutes by construction. | If `6022` still answers 500, the server half did not ship, and the user still sees a blank editor that retries four times. If the two answers differ, the page still tells a deleted number from another server's. If `6010` fails, the change broke loading. | qa | the post-deploy carrier devops creates at Stage 1 (`handoff/fix-message-not-found-post-deploy-<date>.md`) | open |

## Assumption Not Checked

Phase 2: This pass assumes the notice renders legibly inside the real `/message/m/[id]` layout on hooks.gg (the navigation header with the signed-in name field, the edit page's fixed shell), as it does in the test's mount, and does not render a built app. Falsity signature: on hooks.gg, at `/message/m/6022/edit` after the deploy, the notice is hidden, clipped or overlapped, or a stray editable name field sits above it. Owner: B-1's page limb (qa, post-deploy), and steering's release quote to the owner.

## Handoff

- **Verdict: PASS**, `Verified-At` website `f4baebb`. Its production code is identical to `6b539e5`, the reviewed tree; the delta is test-only and is judged by this gate.
- **Next stage: devops**, for website `master`, started by steering. The release consequence is devops's to establish.
- **To steering:** B-1 needs a carrier at devops Stage 1; the Assumption Not Checked is routed to B-1; CR-1's flow line is steering's.
