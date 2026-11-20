---
ID: 018
Origin: 018
UUID: 6273a762
Verified-At: "7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe — repos=website; Phase 1 reads and probes only, no verdict; probes ran in an isolated export of this commit (shapes.ts blob 1c13ca2 verified equal)"
Status: Awaiting Implementation
Status-Detail: "Phase 1 on plan revision 1 (agent-output c2a6b85). Findings QAF-1 to QAF-5 batched to planner-hooks-018. Blocking-condition register B-1 to B-8 is this chain's register."
Phase: 1
---

# QA Report: Plan 018 — Next.js 16.4.6 and the save-list cap (H-002, M-001)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 1 (`c2a6b85`). The plan has no Reading Order
section, so this pass read the whole body.
**Brief**: `steering/018-brief-qa.md` (`96612e1`); common part `steering/018-brief-common.md`; rulings `steering/018-rulings.md` block
2026-11-20T03:25Z (X-1 to X-15 accepted).
**Architecture read**: `architecture/website.md` W-2, A-1, A-4; `architecture/system-architecture.md` not re-read beyond the plan's
citation of line 110 (nothing in this pass rests on it).
**Roadmap**: absent (`agent-output/roadmap/` holds none; plan header `Epic-Alignment`). No epic criterion moves.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T03:43 | steering-roadmap-hooks (brief `96612e1`) | QA Phase 1 on revision 1 | Phase 1: strategy per milestone, populations measured, three probes run in an isolated export of `7923a1d` and captured under `verification/018/qa/phase-1/`; differential instrument for M1-b/M1-c built with its controls; findings QAF-1 to QAF-5 (1 HIGH, 3 MEDIUM, 1 LOW) to the planner; Irreversible Side-Effect Register; blocking-condition register B-1 to B-8; three QA-owned handoffs dispositioned. |

## Findings (Phase 1, to the planner as one batch)

QAF-1 HIGH Phase 1
- **Property wanted checked:** M1-a, "whatever the elements (valid, invalid, or of the wrong type) … exactly one issue for that list".
- **Defect:** OQ-3's premise run (`verification/018/planning/zod-length-first/probe.cjs`) parsed a bare array. In the real schema three of
  the sites sit under the message-level `superRefine(refineDisplayableText)` (`shapes.ts` `discordMessageShape`), whose
  `sumDisplayableText` reads `c.type` on every top-level component and recurses into `type` 9 and 17 children. Under the OQ-3 form a
  list over its bound is *dirty*, not aborted, so the pipe hands its unvalidated elements on and the refinement runs over them. A `null`
  element then throws.
- **Run** (the real base object and the real refinement function, read off the exported `discordMessageShape`; `list-bound-probe/report.txt`):
  `pipe S10, 50 null | THREW TypeError: Cannot read properties of null (reading 'type')`. The same happens for "50 with one null", "50
  containers each with a null child" (S4's path) and "41 sections with null children" (S2's path). Inside the bound with one null:
  `refused, 1 issues {"invalid_type":1}` (no throw). At `7923a1d` the same inputs are refused with no throw (S10 50 null: `refused, 51
  issues`), because a null aborts the array and the refinement never runs.
- **Failure in user terms:** a signed-in request with one `null` in an over-long `components` list gets a 500 (tRPC
  `INTERNAL_SERVER_ERROR`) where today it gets a 400 with issues. This is the cap form the plan's only feasibility evidence supports, so
  the implementer would build it.
- **Ask:** M1-a's case set names `null` elements, and a `null` nested one level down, at S2, S4 and S10 through both procedures. OQ-3
  states that its run did not include the parent refinement. The cap mechanism (AD-1) must also hold where a parent refinement runs over
  the capped list. This is named mutant NM-1.

QAF-2 MEDIUM Phase 1
- **Property:** M1-g's predicted value, the surface M1-g exercises, and M1-d's refusal-set statement for the client import schema.
- **Defect 1, prediction:** "one error line (the 100 bound) where the base shows 151". S7 has no bound at `7923a1d`, so 150 invalid ids
  give **150** issues: through the client import schema (`list-bound-probe/report.txt`: `S7 client import shape, 150 invalid users |
  refused, 150 issues`) and through `message.upsert` (`caller-probe/report.txt`: `BAD_REQUEST | issues in message: 150`). The "+1" holds
  only at sites bounded today (S9: 51).
- **Defect 2, surface:** the JSON view validates on every edit with `discordMessageImportShape` (`JsonModalBody.tsx`, the `useEffect`
  on `messageString`), and shows the issues with `formatZodIssues`. A paste that the client refuses never reaches `message.upsert`. So
  M1-g observes the shared base schema in the browser, not the server's refusal, and "a refused save writes nothing" is never reached.
  Nothing in the plan gives the **server** refusal a human-observable form. Its display path is `SaveAsMenu.tsx`, through
  `formatMutationError`.
- **Defect 3, M1-d:** `discordMessageImportShape` extends `discordMessageBaseShape` and overrides `components` alone. So S4 (inside the
  import's components), S6, S7 and S8 bind the JSON view's paste, and the paste refusal set moves at exactly those four. M1-d states
  only that the import's top-level list does not move.
- **Ask:**
  - Restate M1-g: prediction 150 → 1, its surface named as the JSON view's client-side check.
  - Add a server-path observable: a message already in the editor (stored, or a draft) whose `allowed_mentions.users` holds 150
    well-formed ids. Pressing Save shows one line naming the 100 bound. At `7923a1d` the same message saves.
  - Add an M1-d limb: the JSON view's paste refusal set moves exactly at S4, S6, S7 and S8 over their bounds, and nowhere else.
  - Register rows B-1 and B-2 below are minted against this restatement and name it.

QAF-3 MEDIUM Phase 1
- **Property:** M1-e, "for every stored recent list … the list the client composes and sends is within the bound".
- **Defect:** `usePreferences.ts` has two branches. With an open message id it composes `[id, …stored minus id]`. **Without one**, it
  sends `session.user.preferences.recentMessageIds` as stored (`recentMessageIds ?? session?.user?.preferences?.recentMessageIds`), and
  `useUpdatePreferences` sends whenever that value changes after mount. M1-e's instrument names stored lengths 0, 10, 11 and 50 but not
  the branch. A fix that bounds only the composed branch passes all four cases and still sends 50 on the other branch.
- **Ask:** M1-e's cases cross {0, 10, 11, 50} with {open message with id, no message id}, and a stored list that already holds the open
  id at position 11 or later. This is named mutant NM-4.

QAF-4 MEDIUM Phase 1
- **Property:** M4-a, "For each of R1–R5, the existing tests covering it pass at 16.4.6 (they are QA's to name)", and R5 "suite-checked".
- **Defect:** QA can name no test for R5.
  - `git grep -l preload` over `src/**/__tests__/*` at `7923a1d`: no match.
  - No production file calls `.render.preload`. `git grep -n preload` over non-test `src` finds only `ReactDOM.preload` of a font,
    a direct `import('./Picker')` and comments.
  - Six `next/dynamic` wrappers carry `loading: () => null` (`src/components/dynamics/*`), and no test asserts that they stop Suspense
    propagation.
  - Under the severity floor, a behaviour the plan relies on with no assertion that fails when it is lost is at least MEDIUM.
- **Ask:**
  - R5's first limb (`.render.preload`) has no consumer at the base, so either drop it with that disposition, or name its consumer.
  - The second limb gets an instrument that can fail: a browser observation on the local build that the editor shell renders while a
    lazily loaded child is pending, or a DOM test that mounts a real `next/dynamic` wrapper. A DOM test is admitted only where jsdom's
    Suspense matches the browser (Test Conventions, environment fidelity). Otherwise the walk is the instrument, and R5 is not
    "suite-checked".

QAF-5 LOW Phase 1
- **Property:** M1-a's instrument, "the procedure's input schema parsed directly, and one call per procedure through the tRPC caller".
- **Defect:** S11 exists only in `user.ts`'s inline `.input(z.object({ … }))`, which no export names. A direct parse of the exported
  shapes cannot reach it. S1–S10 are reached by both procedures, at two different paths (`message.data…` under each). The class is
  therefore 21 site × procedure pairs, not 11.
- **Ask:** M1-a's population is the 21 pairs. S11's cases go through the procedure's real input (the caller, or the router's
  `_def.procedures.updatePreferences._def.inputs[0]`, as QA's differential reads it).

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
| M1-b/c | inputs in QA's differential | 618 labels: 10 sites × 6 lengths {0, 1, b−1, b, b+1, b+10} × 5 element kinds {valid, invalid, null, number, mixed} × 2 procedures, plus S11 × 6 lengths × 3 kinds. Every label is computed per tree (`differential/base-7923a1d.json`). |
| M1-e | production users with a stored recent list over 10 | **Not measurable by agents**: the production database URL is the owner's (plan RK-3). The falsifier is a liveness row (B-8). |
| M1-f | stored messages over S4/S6/S7/S8's new bounds | **Not measurable by agents** (RK-3). Stated residue; falsifier is a user report. |
| M2-a | lockfile keys at `7923a1d` (`grep -c` over `git show 7923a1d:pnpm-lock.yaml`) | `next@16.1.6` 16, `@next/env@16.1.6` 2, `@next/swc-[a-z0-9-]*@16.1.6` 16, `next@16.4.6` 0. The instrument reads non-zero at base, which is its positive control. |
| M4 | tests per behaviour (`git grep -l` over `src/**/__tests__/*` at `7923a1d`) | R1/R2: `src/app/message/__tests__/layout.navigation-guard.test.tsx`, `src/providers/__tests__/NavigationGuardProvider.link-confirmation.test.tsx` (StyledLink). R4: `src/utils/hooks/__tests__/useUnloadAlert.act-suppression.test.tsx`, `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx`. R3: none (a stated limit; walk only). R5: **none** (QAF-4). |
| M5-b | public routes | The plan's set (sweep §4 inventory, plus the two redirects); not re-derived here. |

### Required Unit Tests (M1, Node environment)

- **M1-a, per pair.** For each of the 21 pairs, a list of bound+1 and of a far-over length, for each element kind (valid, invalid, `null`,
  a number, and a nested `null` at S2/S4/S10). Exactly one issue: `code` `too_big`, `maximum` the bound as a literal, `path` the list's
  full path as a literal. No issue inside the list. No throw.
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
- **M4:** the M4 tests named above at 16.4.6; walks B-3.
- **M5:** B-4, B-5.

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

- **Built:** the M1 two-tree differential, under `verification/018/qa/phase-1/differential/`.
  - `user.save-list-differential.test.ts` (sha256 `4562e07b…`) is copied into each export and run with `PROBE_OUT`. It reads each
    procedure's real input via `_def.procedures.<name>._def.inputs[0]`.
  - `compare.py` (sha256 `4b79dcfe…`) carries the plan's bounds as literals.
  - Controls on the base capture: `--self-check` finds 5032 over-bound violations (non-zero, as the base must; `self-check.txt`), and
    base-vs-base finds 0 within-bound violations (`base-vs-base.txt`; `grep -c 'within bound'` = 0).
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
| E-3 | A save request that crashes in validation (NM-1) returns 500 | Refused with an issue list, no throw | Not yet: depends on AD-1's form (QAF-1) | `list-bound-probe/report.txt` |
| E-4 | A local-build save during a walk publishes `message-update-<id>` on the Pusher app in `.env.local`, and may upload a preview to the configured bucket | Message ids moved to 900000000000001+ before the first save; the bucket key names read | Pusher: the workspace rule governs. Bucket target: `UNVERIFIED` (key names not yet read). | `CLAUDE.md` "Local builds of `website`"; `previewBucket`/`previewImage` modules named, not read |
| E-5 | Preview push (M5) deploys a Vercel preview that shares production's Discord and Pusher keys | No sign-in completed on the preview; no save possible (no Postgres) | M5-d stops at Discord's authorise page. A save on the preview cannot reach Pusher without a database: `UNVERIFIED` against `shared.ts` ordering. | common brief hazard 7; plan M5-d |
| E-6 | Release: website `master` push deploys production | Owner's word; QA Phase 3 record; `release-move.js` | Devops's one route | plan Release; Header (`release-move.js … --dry-run`) |
| E-7 | M1-h's production write attempt (B-6) | The payload is refused at both trees, so nothing is written | Yes at base through the caller (51 issues, 0 touches); over HTTP not yet run | `caller-probe/report.txt` |

## Blocking-Condition Register (this chain's; later passes append here)

Standing note: this register is point-in-time. The UAT document, and then the deployment record, are authoritative on each row's
execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | M1-g as restated by QAF-2: the JSON view shows the paste's issues | Browser walk on the local build: paste `allowed_mentions.users` with 150 invalid ids into the JSON view; count the error lines | UAT through the stage browser, test account / owner | Local build at the M1 tip; stack per Infrastructure | Tip: 1 line naming 100. Base: 150 lines (measured through the client schema). One observation decides it. | If 150 lines still show, the cap never reached the client schema the editor uses. | uat | The UAT pass to be briefed (`uat/018-…-uat.md`) | Open; depends on QAF-2's restatement |
| B-2 | observable pre-release | Server refusal of a message already in the editor (QAF-2 limb) | Walk: a message with 150 well-formed user ids, seeded in the local database (id ≥ 900000000000001) or as a draft from a base-build session on the same origin; press Save | UAT / owner | Local build at the tip; seeded row | Tip: one line from Save naming the 100 bound; nothing written. Base: saves. | If Save succeeds, the server cap is absent on the save path the editor uses. If several lines show, the cap is not length-first. | uat | The UAT pass to be briefed | Open; depends on QAF-2 |
| B-3 | observable pre-release | M4-a walks: R1 (leave-page guard, both Cancel and confirm), R2 (external link interception), R4 (`beforeunload` with unsaved edits), R3 recorded either way | `browser-walker`, signed in, local build at the M3 tip | UAT / owner | Local build at the M3 tip | R1, R2 and R4 behave as at 16.1.6. R3: recorded, no prediction. | A link click with unsaved edits navigates without asking, so the user loses edits. | uat | The UAT pass to be briefed | Open |
| B-4 | observable pre-release | M5-b/c/d on the preview: public pages 200, two redirects, images 200 with an image type, sign-in reaches Discord's authorise page and stops | Anonymous browser walk of the preview URL | UAT / owner | Preview `READY` at the tip (B-5) | All 200 / redirect / authorise as the plan states | A page that 500s on Vercel at 16.4.6 and not locally ships to every visitor. | uat | The UAT pass to be briefed | Open; depends on B-5 |
| B-5 | observable pre-release | M5-a: the preview deployment is `READY` and its `githubCommitSha` is the tip | `vercel api` read (read-only) | devops / none | After the chain branch push | `READY`, SHA equal | A build that fails only on Vercel. | devops | The deployment record | Open |
| B-6 | post-deploy-observable | M1-h: one test-account `message.upsert` with 50 invalid embeds on hooks.gg | The HTTP response's tRPC error message, parsed as the issue list; count | QA or UAT through the stage browser signed in to hooks.gg as the test account / owner | The serving production deployment's commit contains the release tip (containment, via `vercel api`) | Tip: 1. Base: 51 (through the caller, `caller-probe/report.txt`; over HTTP not yet run). One observation decides it. | If 51, production is not serving M1. | qa | `handoff/<name>.md`, created by devops at Stage 1 | Open; HTTP minting read owed at the first executor run (browser held at Phase 1, below) |
| B-7 | post-deploy-observable | M5-e: hooks.gg's page script carries `window.next={version:"16.4.6"` | `curl` of hooks.gg plus `grep -c` (the planner's instrument, non-zero today for 16.1.6: `verification/018/planning/prod-next-version-pre.txt`) | devops or QA / none | The release deployment serving | 16.4.6 count ≥ 1, and 16.1.6 count 0 | 16.1.6 still served means H-002 is not closed in production. | qa | `handoff/<name>.md` by devops at Stage 1 | Open |
| B-8 | post-deploy-observable (liveness beside S11's limit) | The recent list keeps updating after release, for the test account | Session read on hooks.gg (`/api/auth/session`, `user.preferences.recentMessageIds`, length and first id only). Open message A, then message B. Control: B's id moves to first place. | QA through the stage browser / owner | After release, same condition as B-6 | First id = the message last opened; length ≤ 11 | If the first id does not move, updates are refused silently (no `onError`): the recent list freezes for users. | qa | `handoff/<name>.md` by devops at Stage 1 | Open; minting read not done at Phase 1 (cause: browser held by another session, lock read 2026-11-20 before 03:43Z, `holder`) |

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

## Implementation Review (Post-Implementation)

Not started (Phase 2).
