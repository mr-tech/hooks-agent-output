---
ID: 018
Origin: 018
UUID: 6273a762
Verified-At: "7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe — repos=website; Phase 1 reads and probes only, no verdict; probes ran in an isolated export of this commit (shapes.ts blob 1c13ca2 verified equal)"
Status: Awaiting Implementation
Status-Detail: "Phase 1 re-keyed to plan revision 2 (agent-output 7a1bd46). QAF-1 to QAF-5 resolved; QAF-6 MEDIUM and QAF-7 LOW to planner-hooks-018. Register B-1 to B-8 re-specified; M5 rows held on OQ-5."
Phase: 1
---

# QA Report: Plan 018 — Next.js 16.4.6 and the save-list cap (H-002, M-001)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 2 (`7a1bd46`). Re-keyed from revision 1
(`c2a6b85`) by reading the `git diff c2a6b85 7a1bd46` of the plan whole. The plan says no Reading Order is owed.
**Brief**: `steering/018-brief-qa.md` (`96612e1`); common part `steering/018-brief-common.md`; rulings `steering/018-rulings.md` block
2026-11-20T03:25Z (X-1 to X-15 accepted).
**Architecture read**: `architecture/website.md` W-2, A-1, A-4; `architecture/system-architecture.md` not re-read beyond the plan's
citation of line 110 (nothing in this pass rests on it).
**Roadmap**: absent (`agent-output/roadmap/` holds none; plan header `Epic-Alignment`). No epic criterion moves.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T03:43 | steering-roadmap-hooks (brief `96612e1`) | QA Phase 1 on revision 1 | Phase 1: strategy per milestone, populations measured, three probes run in an isolated export of `7923a1d` and captured under `verification/018/qa/phase-1/`; differential instrument for M1-b/M1-c built with its controls; findings QAF-1 to QAF-5 (1 HIGH, 3 MEDIUM, 1 LOW) to the planner; Irreversible Side-Effect Register; blocking-condition register B-1 to B-8; three QA-owned handoffs dispositioned. |
| 2026-11-20T04:12 | planner-hooks-018 (revision 2, `7a1bd46`) | Phase 1 re-key on revision 2 | Phase 1 re-key. The plan's diff was read whole. QAF-1..5 RESOLVED (disposition lines). The planner's abort-form probe was re-tallied (182/182). QAF-6 MEDIUM (R7 cites a superseded 015 row and a fix 015 dropped) and QAF-7 LOW (M1-h's carrier) go to the planner. The differential was extended (1134 labels: b+50, nested kind, the import schema), with the base re-captured and its controls re-run. Production base reads were made over HTTP on hooks.gg (M1-h 51 issues; B-8 minting; Next 16.1.6), which closes the earlier Assumption Not Checked. Zod was shown not to move under the M2 package step. Register rows B-1..B-8 were re-specified with dated reconcile lines; B-4/B-5 are held on OQ-5. |

## Findings (Phase 1)

QAF-1 HIGH Phase 1 RESOLVED — plan rev 2 M1-a (`null` and nested over-limit kinds; returns, never throws) and M1-d (abort form, OQ-3
re-closed). QA re-tallied the planner's `verification/018/planning/abort-form-probe/rows-abort.txt`: 182 of 182 over-limit S1–S11 rows
carry `issues=1 atList=1 innerPath=false textIssue=false` (the 16 import rows, labelled `S10i`, are counted separately). Argument at
commit `e1b25c7`.

QAF-2 MEDIUM Phase 1 RESOLVED — plan rev 2 M1-g has two surfaces (the JSON view 150 → 1; Save As for the server, because Save's toast
carries no reason, X-18), and the Consumers paragraph names the import schema's binding at S4, S6, S7 and S8. Phase 2 checks the
paste refusal set by the differential's `import` rows (below). B-1 and B-2 are re-specified.

QAF-3 MEDIUM Phase 1 RESOLVED — plan rev 2 M1-e's class is {0, 10, 11, 50} × {id open, no id}, plus the open id at position 11 or later.

QAF-4 MEDIUM Phase 1 RESOLVED — plan rev 2 M4: R5 narrowed to `loading: () => null`, with a UAT walk under throttling as its
instrument. `.render.preload` is dispositioned as having no consumer.

QAF-5 LOW Phase 1 RESOLVED — plan rev 2 M1 class: 21 site-and-procedure pairs; S11 through the router's real input.

QAF-6 MEDIUM Phase 1
- **Property:** M4 R7, "The App Router's React root is `document` … on which 015's F-15 fix rests", instrument "the F-15 tests pass".
- **Defect:** QA can name no F-15 test, and the record holds no F-15 fix.
  - The 015 row R7 cites ("M3 premise question", plan row 1214 of `planning/closed/015-*.md`) is marked **"Superseded at rev 15"**:
    its conclusion ("F-15 reproduces in the app") was withdrawn on the implementer's document-root probe.
  - 015 then removed M3 (D30, rulings "M3: drop M3, not a defect"; plan rows 48 and 100).
  - `git grep -l -i 'hotkey\|useHotkeys'` over `src/**/__tests__/*` at `7923a1d` finds two files
    (`layout.navigation-guard.test.tsx`, `page.sign-in-exit.test.tsx`), and neither is an F-15 test by the record.
  - R7 therefore names a consumer and a test the record does not hold. Under the severity floor (a behaviour relied on with no
    assertion), this is MEDIUM.
- **Ask:** name the code at `7923a1d` whose behaviour rests on the root being `document`, with a test or walk that fails if the root
  moves. Or disposition R7 as `.render.preload` was: no consumer, 015 D30.

QAF-7 LOW Phase 1
- **Property:** M1-h's carrier, "the after read is UAT's, after the push, carried by a handoff UAT writes with `Owning-Stage: uat`".
- **Defect:** under QA's register rule, a post-deploy row still open at the deploy names as its carrier `handoff/<name>.md`, created
  by **devops at Stage 1**, which then holds every open post-deploy row. A second carrier written by UAT splits the chain's
  post-deploy rows across two handoffs, and nothing names who reconciles them. UAT as the executor (`Owning-Stage`) is not in dispute.
- **Ask:** M1-h's after read rides devops's Stage-1 carrier, with `Owning-Stage: uat` for that row. Also, M1-h's base read ("QA's,
  before the release push") is **done**: 51 over HTTP (B-6 below), so the plan can cite it.

## Test Strategy (Pre-Implementation)

From the user's side, what can break:
- A signed-in save gets a 500 instead of its error list (QAF-1).
- A save that worked yesterday is refused, at a new bound, with no way to fix it in the editor (M1-f).
- The recent-messages list stops updating, silently: `useUpdatePreferences` has no `onError`, so a refused update shows nothing (M1-e).
- Pages, images or the leave-page guard change under Next 16.4.6 (M2, M4, M5).
- Lint becomes a configuration error rather than a red count (M3).

### Populations, measured (each with its command)

| Criterion | Population | Measured |
|---|---|---|
| M1 class | `z.array(` sites in the save schemas | `git show 7923a1d:src/server/api/utils/shapes.ts \| grep -c 'z.array('` = **11**: S1–S10 plus `discordMessageImportShape.components` (client-only, M1-d). `user.ts` = 2: `recentMessageIds` (S11) and a commented line (`updateMessages`). `guild.ts` = 1, commented (`updateMessages`). `message.ts` = 0. The class is the plan's 11 sites, complete under this predicate. |
| M1-a | site × procedure pairs | 21 (QAF-5) |
| M1-b/c | inputs in QA's differential | Revision 1: 618 labels. **Reconcile 2026-11-20 (plan rev 2):** 1134 labels. 10 sites × 7 lengths {0, 1, b−1, b, b+1, b+10, b+50} × 5 kinds {valid, invalid, null, number, mixed} = 350, plus the `nested` kind (an element whose own list is over its bound) at S4, S9 and S10 = 21, gives 371 per input. That is computed for `upsert`, for `updatePreferences` (+21 S11 labels, 7 lengths × {string, number, null}) and for the client `import` schema: 371 + 392 + 371. The labels are computed per tree (`differential/base-7923a1d.json`, Counter by procedure). |
| M1-e | production users with a stored recent list over 10 | **Not measurable by agents**: the production database URL is the owner's (plan RK-3). The falsifier is a liveness row (B-8). |
| M1-f | stored messages over S4/S6/S7/S8's new bounds | **Not measurable by agents** (RK-3). Stated residue; falsifier is a user report. |
| M2-a | lockfile keys at `7923a1d` (`grep -c` over `git show 7923a1d:pnpm-lock.yaml`) | `next@16.1.6` 16, `@next/env@16.1.6` 2, `@next/swc-[a-z0-9-]*@16.1.6` 16, `next@16.4.6` 0. The instrument reads non-zero at base, which is its positive control. |
| M4 | tests per behaviour (`git grep -l` over `src/**/__tests__/*` at `7923a1d`) | R1/R2: `src/app/message/__tests__/layout.navigation-guard.test.tsx`, `src/providers/__tests__/NavigationGuardProvider.link-confirmation.test.tsx` (StyledLink). R4: `src/utils/hooks/__tests__/useUnloadAlert.act-suppression.test.tsx`, `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx`. R3: none (a stated limit; walk only). R5: **none** (QAF-4). **Reconcile 2026-11-20 (plan rev 2):** R4 has left the class (`beforeunload` ties to no Next version), and its two tests stay in the M2-c suite run. R5 is a UAT walk. R6 is the implementer's read of `layout-router.js`, plus a walk if the read differs; no test covers it. R7 has no test, and its cited fix is not in the record (QAF-6). |
| M5-b | public routes | The plan's set (sweep §4 inventory, plus the two redirects); not re-derived here. |

### Required Unit Tests (M1, Node environment)

- **M1-a, per pair.** For each of the 21 pairs, lists of bound+1 and bound+50 (plan rev 2), for each element kind:
  - valid; invalid of the right type; a wrong primitive; `null`;
  - where the element has its own list, an element whose list is over its bound;
  - a nested `null` at S2, S4 and S10.
  Each case expects exactly one issue for the list: `code` `too_big`, `maximum` the bound as a literal, `path` the list's full path as
  a literal. No issue inside the list, no displayable-text issue, and no throw.
- **M1-b, inside the bound.** Spec cases at lengths b and b−1, with invalid elements: per-element issues as literals (code and path),
  never the schema's output. QA's two-tree differential (below) carries the whole input space.
- **M1-c, refusal sets.** The six sites bounded today: an over-bound list of valid elements is still refused. The five new sites:
  length b accepted, b+1 refused.
- **M1-d.** One shared definition: covered by NM-2/NM-5, which a sweep kills only if every site's case exists.
  - The import schema's top-level list keeps its refusal set: 41 valid top-level components refused, with one issue.
  - QAF-2's limb: a paste at S7 with 101 well-formed ids is refused by the import schema; 100 is accepted.
- **M1-e (hook test, DOM environment):** `usePreferences` mounted with a mocked `useSession`, capturing the argument passed to
  `useUpdatePreferences`. Cases per QAF-3. The expected sent list is literal ids, never a slice computed in the test.

### Required Integration Tests

- One `createCaller` case per procedure (pattern: `message.personal-ownership.test.ts`): an over-bound list answers `BAD_REQUEST`, its
  message parses to an issue list of length 1, and the database records **zero** queries. The base figure through the caller is
  `caller-probe/report.txt`: 51 issues, 0 database touches.
- Control case: an accepted input passes the input stage (base: reaches `authorizeUser`).

### Acceptance Criteria — the instrument per milestone

- **M1:** the suite cases above. **QA's differential** (built, below) runs at Phase 2 over the tip export against
  `base-7923a1d.json`, using `compare.py`'s M1-a/b/c predicates. Mutation sweep over the M1 production diff (effort-final; the
  implementer's NM runs do not replace it).
- **M2:** `grep -c` per M2-a key form on the committed lockfile; `git diff 7923a1d -- pnpm-lock.yaml` dispositioned per M2-b; `next
  build`, suite and typecheck in an export with its **own** install (never a symlinked `node_modules`: Turbopack refused one at chain
  015, `bug-evaluation-fixes` handoff item 1). The suite is compared by `testResults` path membership and per-file counts against the
  base (1913 cases / 149 files, exit 0), exit code beside the counters.
- **M3:** both configs over the same tree with `--format json`, tallied per rule id by a script (never by a filtered count), never
  `--fix`; exit code 0/1 and never 2.
- **M4:** the M4 tests named above, at 16.4.6; walks B-3 (R1, R2, R3, R5); R6 and R7 by the implementer's source reads, which QA
  re-reads at Phase 2 against `next` 16.4.6's installed files.
- **M5:** B-4, B-5, held on OQ-5. Under the recommended option, M5-d (sign-in redirect) is walked on the local build and joins B-3.

### Named mutants

- **NM-1** (M1-a): the cap lets a parent refinement run over unvalidated elements. Wrong change: S10, S4 or S2 capped in the OQ-3 pipe
  form with `refineDisplayableText` unchanged; an over-bound list holding a `null` throws.
- **NM-2** (M1-a, M1-d): one site keeps `.max()` after element validation. Wrong change: S5's cap left as `.max(MAX_EMBED_FIELDS)`; an
  over-bound list of invalid fields records 1 + n issues.
- **NM-3** (M1-b, M1-c): off by one. Wrong change: one site's bound is `bound - 1`, or is compared exclusively; a list of exactly the
  bound is refused.
- **NM-4** (M1-e): the composer is bounded only on the branch with an open message id. Wrong change: the slice is applied to the
  composed `ids`, and the stored list is sent unchanged when there is no id.
- **NM-5** (M1-d): the shared definition is duplicated per site. Wrong change: the two top-level lists use different forms; caught
  only if the import case and the S10 case both exist.
- **NM-6** (M1-e, M1-c): S11's bound is 10 instead of 11. Wrong change: the server refuses the composer's `[open id, …10 stored]`.
- **NM-7** (M1-a, updatePreferences pairs): the cap reaches `optionalIdMessageShape` and not `partialMessageShape`. Wrong change: the cap
  is applied in a schema only `message.upsert` reads.
- **NM-8** (M1-a): wrong issue path. Wrong change: the cap's issue carries `path: []` relative to the procedure, or the element path.

### Testing Infrastructure

- **Capture label note:** in `list-bound-probe/report.txt` the S6 lines labelled "valid" used `'users'`, which S6's element does not admit (it admits `user`, `here`, `everyone`), so those three lines are all-invalid. No finding rests on them. The differential uses `'user'` (corrected before its committed capture).
- **Built:** the M1 two-tree differential, under `verification/018/qa/phase-1/differential/`.
  - `user.save-list-differential.test.ts` (sha256 `4562e07b…` at revision 1) is copied into each export and run with `PROBE_OUT`. It
    reads each procedure's real input via `_def.procedures.<name>._def.inputs[0]`.
  - `compare.py` (sha256 `4b79dcfe…` at revision 1) carries the plan's bounds as literals.
  - Controls on the base capture: `--self-check` finds 5032 over-bound violations (non-zero, as the base must; `self-check.txt`), and
    base-vs-base finds 0 within-bound violations (`base-vs-base.txt`; `grep -c 'within bound'` = 0).
  - **Reconcile 2026-11-20 (plan rev 2):** the instrument was extended to cover M1-a's revised class and the import schema.
    - Test file sha256 `129b6ac6…`: lengths b+50, the `nested` kind, and the `import` procedure over `discordMessageImportShape`.
    - `compare.py` sha256 `05042ae2…`: at S1, S4 and S10, import rows with `null`/`number` elements (which the preprocess drops or, at
      S1 with `null`, throws on) compare tip to base for equality.
    - Base re-captured in a fresh export of `7923a1d` (`shapes.ts` blob `1c13ca2` verified): 1134 labels, exit 0.
    - Controls: `--self-check` 15872 (non-zero); base-vs-base 0 within-bound and 0 import-preprocess violations
      (`grep -c 'within bound\|import preprocess'` = 0).
  - **Residue, outside the class:** the base capture shows `discordMessageImportShape` throws `TypeError` on a `null` button inside an
    action row (6 labels, `import S1 n≥1 null`): `filterActionRowButtons` reads `button.type`. This happens only on the client. The
    JSON view's `useEffect` catches it and shows the raw message as its error. Not a finding: it is pre-existing, client-only on the
    user's own paste, caught, and outside M1's lists. The differential holds the tip equal to the base there.
  - The instrument is mutated before its Phase 2 result is trusted, as the record rules require: a hand-planted tip JSON with one
    within-bound issue changed must fail, recorded at Phase 2.
- **TESTING INFRASTRUCTURE NEEDED: a local build stack for the walks (B-1, B-2, B-3).**
  - No Postgres listens on this box (`ss -ltn`, read 2026-11-20 before 03:43Z: only `127.0.0.1:6379`, which is another party's Redis and not ours to use).
  - The record's `tools/uat-local-stack.sh` stands one up. The walk's stage runs it, with its own Postgres and Redis, and removes them
    on exit.
  - The message-id `ALTER SEQUENCE` is run before the first save (workspace rule). Before that, the walk reads the key **names** in
    `.env.local` for the preview-bucket and generator settings. A local save calls the preview continuation, and whether that reaches
    production's bucket is `UNVERIFIED` (register E-4).
- **TESTING INFRASTRUCTURE NEEDED: M1-e's hook test.** `next-auth/react`'s `useSession` and `~/utils/hooks/useUpdatePreferences` are
  mocked at the module boundary. The capture records the argument only, and invents no store.

### Entry conditions (probe shapes, for the implementer)

1. Before building the cap, run it under the message-level refinement: the real `discordMessageShape` refinement over a capped S10 holding
   one `null` at length 41. The comparand (one `too_big` issue, no throw) must exist on that path before any M1-a test consumes it
   (QAF-1).
2. Before writing M1-e's cases, drive `usePreferences` with no message id and a stored list of 50, and record what reaches
   `useUpdatePreferences` (QAF-3).

## Irreversible Side-Effect Register

| # | Effect | Must hold before it fires | Every route enforces it identically? | Read that established it |
|---|---|---|---|---|
| E-1 | `message.upsert` writes `Messages`, then publishes on Pusher and starts the preview continuation | Session; input validated, with an over-bound list refused before any write | Yes, by framework: `protectedProcedure` then `.input(...)` before `.mutation`. The probe touched the database 0 times on refusal (`caller-probe/report.txt`). M1 moves only what the input stage refuses. | `message.ts` `upsert` (`.input(z.object({ message: optionalIdMessageShape }))`); caller probe |
| E-2 | `user.updatePreferences` overwrites `Users.preferences` (merge of old and new) | Session; input validated (S11 bound) | Same mechanism as E-1. One route. | `user.ts` `updatePreferences`; caller probe (0 touches on refusal; the control reached `authorizeUser`) |
| E-3 | A save request that crashes in validation (NM-1) returns 500 | Refused with an issue list, no throw | Not yet: depends on AD-1's form (QAF-1). **Reconcile 2026-11-20 (plan rev 2):** the abort form (M1-d) holds on the planner's run (0 throws in 288 rows, re-tallied by QA); the tip is checked by the differential at Phase 2. | `list-bound-probe/report.txt`; `verification/018/planning/abort-form-probe/` |
| E-4 | A local-build save during a walk publishes `message-update-<id>` on the Pusher app in `.env.local`, and may upload a preview to the configured bucket | Message ids moved to 900000000000001+ before the first save; the bucket key names read | Pusher: the workspace rule governs. Bucket target: `UNVERIFIED` (key names not yet read). | `CLAUDE.md` "Local builds of `website`"; `previewBucket`/`previewImage` modules named, not read |
| E-5 | Preview push (M5) deploys a Vercel preview that shares production's Discord and Pusher keys | No sign-in completed on the preview; no save possible (no Postgres) | M5-d stops at Discord's authorise page. A save on the preview cannot reach Pusher without a database: `UNVERIFIED` against `shared.ts` ordering. | common brief hazard 7; plan M5-d |
| E-6 | Release: website `master` push deploys production | Owner's word; QA Phase 3 record; `release-move.js` | Devops's one route | plan Release; Header (`release-move.js … --dry-run`) |
| E-7 | M1-h's production write attempt (B-6) | The payload is refused at both trees, so nothing is written | Yes at base through the caller (51 issues, 0 touches); over HTTP not yet run. **Reconcile 2026-11-20:** run over HTTP on hooks.gg: 400 `BAD_REQUEST`, refused at input. | `caller-probe/report.txt`; `prod-base-reads/README.md` |

## Blocking-Condition Register (this chain's; later passes append here)

Standing note: this register is point-in-time. The UAT document, and then the deployment record, are authoritative on each row's
execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | M1-g as restated by QAF-2: the JSON view shows the paste's issues | Browser walk on the local build: paste `allowed_mentions.users` with 150 invalid ids into the JSON view; count the error lines | UAT through the stage browser, test account / owner | Local build at the M1 tip; stack per Infrastructure | Tip: 1 line naming 100. Base: 150 lines (measured through the client schema). One observation decides it. | If 150 lines still show, the cap never reached the client schema the editor uses. | uat | The UAT pass to be briefed (`uat/018-…-uat.md`) | Open; depends on QAF-2's restatement. **Reconcile 2026-11-20:** the restatement landed (plan rev 2 M1-g, *Browser* limb; "150 malformed ids … one error line … where `7923a1d` shows 150; no request is sent"). The row settles M1-g's browser limb. |
| B-2 | observable pre-release | Server refusal of a message already in the editor (QAF-2 limb) | Walk: a message with 150 well-formed user ids, seeded in the local database (id ≥ 900000000000001) or as a draft from a base-build session on the same origin; press Save. **Reconcile 2026-11-20 (plan rev 2 M1-g *Server* limb, M1-f, X-18):** the action is **Save As**, not Save. Save shows only the reason-less toast "Error. Failed to save message. Please try again." Load the message before opening the JSON view. | UAT / owner | Local build at the tip; seeded row | Tip: one line from Save naming the 100 bound; nothing written. Base: saves. **Reconcile 2026-11-20:** "Save" reads "Save As". A second observation under the same seed: Save shows the fixed toast, which is X-18's stated limit and not a failure. | If Save succeeds, the server cap is absent on the save path the editor uses. If several lines show, the cap is not length-first. | uat | The UAT pass to be briefed | Open. **Reconcile 2026-11-20:** QAF-2 landed (rev 2). The row settles M1-g's server limb. |
| B-3 | observable pre-release | M4-a walks: R1 (leave-page guard, both Cancel and confirm), R2 (external link interception), R4 (`beforeunload` with unsaved edits), R3 recorded either way | `browser-walker`, signed in, local build at the M3 tip | UAT / owner | Local build at the M3 tip | R1, R2 and R4 behave as at 16.1.6. R3: recorded, no prediction. | A link click with unsaved edits navigates without asking, so the user loses edits. | uat | The UAT pass to be briefed | Open. **Reconcile 2026-11-20 (plan rev 2 M4):** R4 has left the class, so the walk is R1 (Cancel and confirm), R2, R3 (the browser's back with unsaved edits; record whether a confirmation appears) and R5 (network throttled; the editor shell stays rendered while a lazy child is pending). M5-d's sign-in redirect joins under OQ-5's recommended option (reaches Discord's authorise page; stop there). Captures go to `verification/018/uat/local/`. The row settles M4-a and M5-d. |
| B-4 | observable pre-release | M5-b/c/d on the preview: public pages 200, two redirects, images 200 with an image type, sign-in reaches Discord's authorise page and stops | Anonymous browser walk of the preview URL | UAT / owner | Preview `READY` at the tip (B-5) | All 200 / redirect / authorise as the plan states | A page that 500s on Vercel at 16.4.6 and not locally ships to every visitor. | uat | The UAT pass to be briefed | Open; depends on B-5. **Reconcile 2026-11-20 (plan rev 2 M5, OQ-5):** held on OQ-5. Under the recommended option, the walk covers the release-check branch's preview: `/`, `/legal/privacy`, `/legal/terms`, `/preview`, `/message`, `/message/m/0/edit`, `/message/m/0/send` 200; `/support` 308; `/message/m/<n>` 307; images 200. `/api/auth/*` 500 is recorded and is not a failure. M5-d moves to B-3. Re-specified at OQ-5's answer. The row settles M5-b and M5-c. |
| B-5 | observable pre-release | M5-a: the preview deployment is `READY` and its `githubCommitSha` is the tip | `vercel api` read (read-only) | devops / none | After the chain branch push | `READY`, SHA equal | A build that fails only on Vercel. | devops | The deployment record | Open. **Reconcile 2026-11-20 (plan rev 2 M5-a, OQ-5):** held on OQ-5. Under the recommended option it is `READY` at the release-check head, the tip's child, and `git diff --name-only <tip> <head>` prints `vercel.json` alone. A plain push of the tip is predicted not to reach READY (RK-7). The row settles M5-a. |
| B-6 | post-deploy-observable | M1-h: one test-account `message.upsert` with 50 invalid embeds on hooks.gg | The HTTP response's tRPC error message, parsed as the issue list; count | QA or UAT through the stage browser signed in to hooks.gg as the test account / owner | The serving production deployment's commit contains the release tip (containment, via `vercel api`) | Tip: 1. Base: 51 (through the caller, `caller-probe/report.txt`; over HTTP not yet run). One observation decides it. | If 51, production is not serving M1. | qa | `handoff/<name>.md`, created by devops at Stage 1 | Open; HTTP minting read owed at the first executor run (browser held at Phase 1, below). **Reconcile 2026-11-20 (plan rev 2 M1-h):** the base read is **done** over HTTP on hooks.gg, 2026-11-20T04:09Z, while production served Next 16.1.6: `POST /api/trpc/message.upsert` → 400 `BAD_REQUEST`, 51 issues (`prod-base-reads/README.md`). The instrument works at minting, so the predicted base value of 51 is confirmed. The executor after release is UAT, so the Owner cell reads **uat**. The carrier stays devops's Stage-1 handoff (QAF-7). The row settles M1-h. |
| B-7 | post-deploy-observable | M5-e: hooks.gg's page script carries `window.next={version:"16.4.6"` | `curl` of hooks.gg plus `grep -c` (the planner's instrument, non-zero today for 16.1.6: `verification/018/planning/prod-next-version-pre.txt`) | devops or QA / none | The release deployment serving | 16.4.6 count ≥ 1, and 16.1.6 count 0 | 16.1.6 still served means H-002 is not closed in production. | qa | `handoff/<name>.md` by devops at Stage 1 | Open. **Reconcile 2026-11-20 (plan rev 2 M5-e):** the plan runs the after read by devops after the push (a public GET), so the Owner cell reads **devops**. At 04:09Z, `window.next.version` on hooks.gg read `"16.1.6"` (`prod-base-reads/README.md`, item 2), a second instrument beside the planner's capture. The row settles M5-e. |
| B-8 | post-deploy-observable (liveness beside S11's limit) | The recent list keeps updating after release, for the test account | Session read on hooks.gg (`/api/auth/session`, `user.preferences.recentMessageIds`, length and first id only). Open message A, then message B. Control: B's id moves to first place. | QA through the stage browser / owner | After release, same condition as B-6 | First id = the message last opened; length ≤ 11 | If the first id does not move, updates are refused silently (no `onError`): the recent list freezes for users. | qa | `handoff/<name>.md` by devops at Stage 1 | Open; minting read not done at Phase 1 (cause: browser held by another session, lock read 2026-11-20 before 03:43Z, `holder`). **Reconcile 2026-11-20:** minting read done at 04:09Z: `/api/auth/session` → 200, signed in, `recentMessageIds` an array of length 10 (`prod-base-reads/README.md`, item 1). The row settles M1-e's liveness (declined work, S11). |

## Open handoffs (Owning-Stage qa), dispositioned at Phase 1

- **`handoff/mutant-equivalence-by-argument-unverified-2026-11-19.md`.** Its trigger is the diff touching `leaveWithoutAlert.ts`,
  `messageDrafts.ts`, `withLocalStorage.ts`, `StyledLink.tsx` or `generateImage.ts`. It has not fired: no planned step edits those
  files. It can fire through M4-b, whose permitted fix is "confined to the surface 017 or 004 built", and `StyledLink.tsx` is R2's
  surface. Phase 2 entry check: `git diff --name-only 7923a1d..<tip>` against the five paths. On a match, survivors #1 and #6 are QA's
  in that pass.
- **`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md`.** The trigger ("next website effort scoped") has fired. Per item:
  - #1 (export with a symlinked `node_modules` behaves as the shared tree): touched. Every run of this chain is in an export with its
    own install, so the symlink variant does not arise. The export ≡ shared-tree premise is still assumed, because a shared-tree run is
    barred until the branch is cut. The item stays carried.
  - #2–#8 (jsdom focus, `/generate` callers, thread `guild_id`, ioredis, generic pool, generator corpus, cross-guild read): none lies on
    this chain's surfaces; each stays as carried.
  - A row is written in its changelog.
- **`handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md`.** The trigger ("QA next runs") has fired again. Nothing
  QA-owned remains: item 1 was discharged 2026-11-11, and items 2 and 3 are the analyst's and the record vocabulary's. A row is written
  in its changelog. That the `Owning-Stage: qa` routing re-fires every QA pass is lodged in `INBOX.md` for steering.

## Assumption Not Checked

This pass assumes that the probes' export at `7923a1d` (its own `pnpm install --frozen-lockfile`, zod 3.22.4) parses as the
production bundle does, and does not test it. A production `message.upsert` over HTTP would show a different issue count from the
caller probe's 51 if it were false. B-6's first executor run closes it (owner: qa, at the B-6 read).
**Closed 2026-11-20 (re-key):** run over HTTP on hooks.gg, 51 issues (`prod-base-reads/README.md`).

**Re-key on plan revision 2.**
- **A premise run in the pass, not assumed:** the abort form rests on zod 3.22.4's `lib/types.js`. In the base export,
  `pnpm add next@16.4.6 @next/bundle-analyzer@16.4.6` (exit 0) leaves the `^  zod@` lockfile keys unchanged: `zod@3.22.4`,
  `zod@3.25.76` and `zod@4.6.7` before and after, 6 lines each. The installed `zod` is still 3.22.4
  (`verification/018/qa/phase-1/zod-under-m2/`).
- **Assumption Not Checked:** this pass assumes, and does not test, that a preview built with `SKIP_ENV_VALIDATION=1` at build time (OQ-5's
  recommended form) serves the same pages and images as the chain tip's own build. The two differ only by that variable at build time,
  and `env.mjs` also reads `VERCEL`/`VERCEL_URL`/`VERCEL_ENV`, which the planner's imitation did not set. The signature of its falsity
  is a page or redirect answering differently on the preview than on the local build at the tip. Owner: UAT, at B-4 against B-3's
  local-build captures, once OQ-5 is answered.

## Implementation Review (Post-Implementation)

Not started (Phase 2).
