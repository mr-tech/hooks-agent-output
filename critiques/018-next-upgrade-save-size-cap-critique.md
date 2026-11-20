---
ID: 018
Origin: 018
UUID: 6273a762
Status: Open
Status-Detail: "Cycle 1 pass 1 on plan revision 1: REQUEST REVISION. 15 findings open (3 HIGH, 7 MEDIUM, 5 LOW). F-1 carries an item for the owner, routed through steering."
Artifact-Revision: 1 — read whole at c2a6b85
Reviewed-At: "c2a6b85 — repos=agent-output; website code read at 7923a1d (origin/master)"
Verdict: REQUEST REVISION
---

# Critique — Plan 018, Next.js 16.4.6 and the save-list cap

**Artifact**: `planning/018-next-upgrade-save-size-cap.md`, revision 1 (`c2a6b85`), read whole (390 lines).
**Analysis**: none commissioned. **Date**: 2026-11-20.

**Also read at pass 1**: `steering/018-brief-critic.md` and `steering/018-brief-common.md`; `steering/018-rulings.md`;
`steering/website-deps-review-rulings.md` blocks 02:53Z, 02:54Z and 03:08Z; `steering/selection-ledger/2026-11-20.md` block
03:25Z; `security/website-deps-review-security-audit.md` (H-002, M-001, Assumptions Not Checked, Informational, Resumption
State); `verification/website-deps-review/scoping/sweep-unbounded-input.md` (whole) and `sweep-next-upgrade.md` (§4 to §6 and
the steering addendum); `architecture/website.md` W-2, A-1 and A-4; the planner's probes under `verification/018/planning/`
(all but the release-notes file); chain 017's preview record under `verification/017/m5-0/`; and website source at `7923a1d`.
**Roadmap**: `roadmap/` is empty (`ls`), so there is no Master Product Objective to check against. Alignment is judged
against the rulings and the architecture record.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-20T03:55 | steering-roadmap-hooks (brief `steering/018-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | First pass of the cycle, so the whole plan was read at `c2a6b85`. Artifact changes: none before this pass. New findings: F-1 to F-15 (3 HIGH, 7 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. F-1 carries a question for the owner on D-3, sent to steering. |

## Verdict

**REQUEST REVISION — cycle 1, pass 1.**

Pricing: M1, M2, M4 and M5 are sized to the ask (rulings block 02:53Z with the 03:08Z answers). M3 is one milestone more
than the ask. D-6 admits it as steering reads his typed words, and it is priced, but the plan never says what it buys (F-5).
No rider is attached.

Three findings stop approval:

- **F-1.** M5 cannot run as written. A plain push of the chain branch does not build in Vercel's Preview environment: the
  site's environment check needs five variables that the Preview target does not have. Chain 017's record shows this, and
  shows that the only two previews ever built carried a build-command override this plan does not have.
- **F-2.** The list form OQ-3 was closed on throws instead of refusing when an over-limit list holds `null`, at 3 of the 11
  sites. I ran it.
- **F-3.** M1-f and M1-g describe error displays that the editor's Save does not have. A user whose stored message exceeds
  a new bound would get a toast telling him to try again, with no reason.

Five findings share one shape (F-1, F-2, F-3, F-4, F-8): the plan says what a page shows, what a build does or who reads a
schema, and the statement was not read at the receiving end. The class is stated once under Findings, with a prediction for
the plan's Risks.

No open question is marked in the plan. No milestone is marked `PREMISE-STALE`. `Target-Release` equals the scoping block's
end step. The stop authority did not fire: nothing has been folded yet, so no finding is a second instance. The hard stop
did not fire (pass 1 of 15).

Routed to the owner, through steering: what D-3 can still deliver (F-1). Everything else is the planner's.

## Value Statement Assessment

Present, in user-story form, and delivered directly by M1 and M2. Its two wants map to H-002 and M-001, each quoted from
the audit. The outcome is checkable: the lockfile and the audit re-run for H-002, M1-a for M-001.

Two gaps, both filed as findings. M3 serves neither want and the statement does not mention it (F-5). The "so that" names
magnitudes, "seconds of CPU and hundreds of megabytes", that no criterion measures after M1 (F-14).

## Assumption Not Checked

Cycle 1 pass 1: this pass assumes that the helper's reading of the Next.js release notes from 16.1.7 to 16.4.6
(`verification/018/planning/next-16.4.6-release-notes.md`, 30 tags) is complete and correct, and does not test it. No tag
was read. If it is false, a change the plan names nowhere shows up as a build warning at M2-d, a failing walk at M4 or a
failing page at M5. Closing it is the implementer's at M2-d and QA's at Phase 2.

A second assumption sits under F-1: that the Preview target's variables today are those read on 2026-11-19
(`verification/017/m5-0/devops/preview-env-names.txt`). Rulings block 02:53Z states the same for today. This pass did not
re-read the project's variable list. If it is false, a plain push builds and F-1's first limb falls. The planner's
re-derivation of M5 closes it.

## Unresolved Open Questions

None. OQ-1 is `[RESOLVED]`; OQ-2, OQ-3 and OQ-4 are `[CLOSED]`. F-2 finds OQ-3 closed on a probe that does not cover the
site's schema. F-1 finds OQ-4 settled by a record the plan did not cite. Reopening either is the planner's.

## Findings

### High

F-1 HIGH cycle 1 pass 1 — OPEN — M5 cannot run as written: a plain chain-branch push does not build in the Preview environment
- **Location**: plan § M5 (steps, M5-a, M5-b's `/message` limb, M5-d); § Header, "Serving refs" ("consistent with 017's
  two READY previews"); OQ-4; D-3. Website `src/env.mjs` `server`; `vercel.json`.
- **Description**:
  - `src/env.mjs` requires `DATABASE_URL`, `REDISHOST`, `REDISPORT`, `REDISUSER` and `REDISPASSWORD`. The Vercel project
    gives all five to Production only (`verification/017/m5-0/devops/preview-env-names.txt`, names and targets, read
    2026-11-19; rulings block 02:53Z says the same today).
  - Chain 017 met this. Its devops built the site with only the Preview target's variable names: exit 1 in `src/env.mjs`
    while prerendering (`verification/017/m5-0/devops/probe-build-preview-env-no-skip.txt`), and exit 0 only with
    `SKIP_ENV_VALIDATION=1` (`probe-build-preview-env-skip-validation.txt`). The two READY previews the plan cites were
    built from `probe/017-waituntil` at `aca8cb3`, whose one change is `vercel.json` `"buildCommand":
    "SKIP_ENV_VALIDATION=1 next build"` (`verification/017/m5-0/README.md`, "Second commit").
  - `vercel.json` at `7923a1d` holds `crons` only (`git show origin/master:vercel.json`), and the plan adds no build
    command. So 0 of the 2 READY previews on record were built the way M5 would build, and M5-a fails on 5 missing
    variables.
  - Read from code, not run: `env.mjs` validates whenever the module is evaluated on the server, and a variable set in a
    build command is not set in the function at request time. `/message`, `/message/m/[id]/edit` and
    `/api/auth/[...nextauth]` are dynamic routes (017's route table, same file). With a build-time skip they would still
    fail at request time, which takes M5-b's `/message` limb and M5-d with it. Only the static pages are known to serve.
    017's probe route answered 200 because it "reads no database, no environment variable and no secret" (same README).
  - Preview protection is not the obstacle. An anonymous `curl` to a preview host answered 200 with `wafAction: allow` on
    2026-11-19 (`verification/017/m5-0/limb3/probe-requests-log.jsonl`). That record settles OQ-4 better than the
    absent-field inference the plan closed it on.
- **Impact**: M5 is the last step before the release ask. As written it fails at its first criterion after M1 to M4 have
  passed QA Phase 2. Each way out has a cost the plan has not priced: a build command on the chain branch reaches
  production with the release; a throwaway branch, as 017 used, moves M5-a's SHA off the chain tip; adding variables to
  the Preview target is his act. D-3's option text told him the public pages and the sign-in redirect load on the preview.
  The record contradicts the first for a plain push, and the code read contradicts the second.
- **Recommendation**: re-derive M5 from 017's M5-0 record. Run the unrun limb before anything is put to him: a build with
  the Preview target's names, served, then `GET /message/m/0/edit` and `GET /api/auth/providers`. State which form the
  preview build takes, what that form does to M5-a's SHA identity and to the release tip, and which of M5-b to M5-d a
  preview with no database can show. What D-3 can no longer deliver as he chose it is his question; steering has it.
  Register in Risks as a prediction: "a push whose tree has no build-command override does not reach READY in the Preview
  environment". Falsifier: such a push reaching READY.

F-2 HIGH cycle 1 pass 1 — OPEN — The list form OQ-3 was closed on throws on `null` elements at three sites
- **Location**: plan § Assumptions, OQ-3; M1-a; M1-c. Website `src/server/api/utils/shapes.ts` `sumDisplayableText`,
  `refineDisplayableText`, `discordMessageShape`; `src/providers/MessageProvider/usePusher.ts` `normalizeForHash`.
- **Description**:
  - OQ-3's probe (`verification/018/planning/zod-length-first/probe.cjs`) parses a bare list of strings. In the site's
    schema, three of the 11 lists (S10, S4, S2) sit under `discordMessageShape`'s `superRefine(refineDisplayableText)`.
    `sumDisplayableText` reads `c.type` on every element of `data.components` and recurses into the children of types 9
    and 17.
  - Today an invalid element aborts the parse, so the refinement never sees it. With the piped form, a failed length check
    leaves the list dirty, not aborted, and zod 3.22.4 then runs the refinement over the raw, unvalidated list.
  - Run in this pass against the installed zod 3.22.4, on a replica of those shapes (Appendix): 41 `null` elements in the
    top-level list, or inside one container's list, give 42 issues today, and with the piped form the parse throws
    `TypeError: Cannot read properties of null (reading 'type')`. 41 zeros give 1 issue, as OQ-3 says.
  - M1-a's element class is "valid, invalid, or of the wrong type". It does not list `null`, so a suite can pass M1-a on
    numbers and strings and ship the throw. M1-c is stated over "the set of inputs" with no class and no instrument; it
    holds only as far as M1-a's and M1-b's classes reach.
  - The throw also reaches the browser. `normalizeForHash` calls `discordMessageShape.safeParse` and relies on it
    returning.
- **Impact**: a signed-in request with an over-limit list of `null`s gets an unhandled server error where M-001's bar asks
  for a refusal. It affects 3 of 11 sites. Found now, it is a premise to re-run. Found during implementation, it is a
  change of mechanism mid-milestone, on the same form `architecture/website.md` A-4 already flags for its input type
  (its "plan 018 AF-1" sentence).
- **Recommendation**: reopen OQ-3 and re-run it against the site's own `optionalIdMessageShape` and `partialMessageShape`,
  with the form at each of the 11 sites and each list filled with each element kind. M1-a lists its element kinds as a
  finite class (at least: valid; invalid of the right type; a wrong primitive type; `null`; a nested list that is itself
  over its bound) and says that a refusal is a returned issue, never a throw. The plan states what the refinement does on
  a refused list. The mechanism stays the planner's and the implementer's.

F-3 HIGH cycle 1 pass 1 — OPEN — M1-f and M1-g name error displays the editor's Save does not have
- **Location**: plan M1-f, M1-g. Website `src/providers/MessageProvider/index.tsx` `upsertMessage` `onError`;
  `src/app/message/m/[id]/_components/JsonModalBody.tsx` (the effect on `messageString`; `confirmText: 'Load'`);
  `src/utils/formatMutationError.ts` and its call sites.
- **Description**: three statements, each checked in the code.
  1. The editor's Save shows no issues. `upsertMessage`'s `onError` ignores the error and shows the fixed toast "Error.
     Failed to save message. Please try again." `formatMutationError` is called in two places, `NewMessageModal.tsx` and
     `SaveAsMenu.tsx` (`git grep -n "formatMutationError("`, non-test files).
  2. The JSON view's error lines are made in the browser. `JsonModalBody` parses the pasted text with
     `discordMessageImportShape` in an effect and shows `formatZodIssues` of the result. Its button is "Load", and a draft
     that fails the parse cannot be loaded. No request is sent, so the walk needs no session and never reaches
     `message.upsert`.
  3. The base figure is 150, not 151. S7 has no bound at `7923a1d` (the plan's own table), so 150 invalid ids give 150
     issues and no length issue. The number carries no instrument.
- **Impact**: M1-g cannot be walked as written. Walked as the product behaves, it shows the shared schema in the browser,
  not the server refusing a save. M1-f's stated fate is false where it matters: a user whose stored message exceeds a new
  bound (S4, S6, S7 or S8) presses Save and is told to try again, with no reason, every time. The number of such messages
  is unknown (RK-3). 0 of the 2 displays these criteria name exist on the Save path.
- **Recommendation**: restate M1-f and M1-g from the code: where the bound's issue is shown today (the JSON view on open
  or paste, and Save As), what Save shows, and what the most exposed user sees. If the reason-less toast stays, it is a
  stated limit with an Exclusions row. Showing the reason on Save is more than the ask and is his to choose. M1-g names an
  observation the server path has before release, or says there is none and why. Publish 150 with its run.

**The class, stated once.** F-1, F-2, F-3, F-4 and F-8 are one shape: a criterion, a closed question or a decision row
says what code, a build or a host does, and no read at the receiving end supports it. planner.md already states the
property (Milestones: such a line "is derived by running it at the pinned version … or reading its source"). Its domain in
revision 1 is enumerable from the plan: OQ-2 to OQ-4; M1-e to M1-h; M2-c and M2-d; M3's "Premise, run"; M4 R1 to R5; M5-a
to M5-e; the release rollback. This pass read OQ-3, OQ-4, M1-e to M1-h, M2-c and M5-a to M5-d. It did not read M4 R1 to
R5 at 16.4.6, M5-c, or M5-e beyond the planner's capture. Prediction for the plan's Risks: another member exists in that
domain. Falsifier: a later pass or gate finding a sentence there that a read contradicts. If one appears after the fold,
the stop authority applies to it.

### Medium

F-4 MEDIUM cycle 1 pass 1 — OPEN — M5-b's set of public pages is wrong at the receiving end and incomplete
- **Location**: plan M5-b. Website `src/app/_navigation/Redirects/Server.tsx`; `next.config.js` `redirects`.
- **Description**: `Redirects/Server.tsx` sends a visitor with no session cookie to `/message/m/0/edit`, the signed-out
  editor. It is not a sign-in redirect. So `/message/m/0/edit` and `/message/m/0/send` are public pages and the set omits
  them. `/preview` is a static page that needs no session (017's route table; audit A-2) and is omitted. The set says
  "plus the two configured redirects" and lists one: `/message/m/:id` to `/message/m/:id/edit` is missing.
- **Impact**: UAT would mark the `/message` limb failed on a working site, and the product's main public page is not in
  the check.
- **Recommendation**: enumerate the set from the build's route table and `redirects()`, state each member's expected
  answer from the code, and mark which of them a preview can serve (F-1).

F-5 MEDIUM cycle 1 pass 1 — OPEN — M3 has no stated value
- **Location**: plan § Value Statement; § Objective item 3; D-6; M3; RK-5; X-6, X-16, X-17.
- **Description**: the Value Statement covers H-002 and M-001. Objective 3 says what M3 does, not what it is for. D-6's
  words, "anything deemed useful", make usefulness the test and leave the judgement with the chain; the plan gives D-6
  itself as M3's reason. The plan's own text is all on the cost side: nothing runs lint (X-17), lint stays red (X-6),
  ESLint 9.39.5 is already marked unsupported and the airbnb rules sit behind a compatibility layer with unmet peers
  (RK-5), the ledger has about 100 rows (M3-b), and the probe took 665 problems to 833. RK-5 was found after his 03:25Z
  answer. The option he was shown said "One more milestone with its own review and QA rounds" and did not say the target
  major is itself unsupported. Steering's recommended option was to hold at 15.5.14.
- **Impact**: a milestone with no "so that" cannot be judged delivered at UAT, and this pricing line cannot say what M3
  buys.
- **Recommendation**: state M3's value in one clause, in the Value Statement or in the changelog row (planner.md, "A
  change that reaches a criterion reaches the value statement it serves, or the changelog row says why not"), with RK-5
  beside it. If no value can be stated over holding at 15.5.14, that is a scope question for him with RK-5 in its text.
  D-6 itself is not re-raised here.

F-6 MEDIUM cycle 1 pass 1 — OPEN — M4's class is not enumerated from the record
- **Location**: plan § M4, "Class (finite, from the record)"; `verification/website-deps-review/scoping/sweep-next-upgrade.md`
  addendum §6.
- **Description**: the class names no search. Steering's record search (§6, 20 lines) returns two more behaviours tied to
  next 16.1.6 by source reads, and neither is in R1 to R5 or in X-15:
  - 015 X-22, the modal seed: a client navigation between two `/message/f/[id]` values mounts the page fresh, read from
    `layout-router.js` and `createRouterCacheKey` (`planning/closed/015-bug-evaluation-fixes.md`, row X-22;
    `architecture/closed/015-bug-evaluation-fixes-architecture-findings.md`, "X-22, the modal seed, is not a defect").
  - 015's M3 premise: the App Router's React root is `document` (`client/app-index.js`), which the F-15 fix rests on
    (same plan, the "M3 premise question" row).
  R4 is in the table although the record ties `beforeunload` to no Next.js version, and the row it cites, 017 X-15, is
  about the send page.
- **Impact**: a disposition that rests on a 16.1.6 source read is carried to 16.4.6 unchecked.
- **Recommendation**: name the search that enumerates the class and give every hit a row: a check, or an Exclusions row
  with its reason.

F-7 MEDIUM cycle 1 pass 1 — OPEN — M2-c has no base reading for the build or the typecheck
- **Location**: plan M2-c; § Validation V-1, V-2; `verification/018/planning/base-validation/`.
- **Description**: V-1 ran install, suite, lint and typecheck at `7923a1d`. It did not run `next build`. A bare export
  fails the build in `src/env.mjs` (F-1's mechanism); the form security found to pass is `SKIP_ENV_VALIDATION=1` with no
  `.env` file (audit, Resumption State). M2-c says "in an isolated export" and names no environment form. The typecheck
  exits 2 at the base (`typecheck.txt`), and the script is `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`, so the
  second program never ran. V-2 scopes the one error by reading files, "not run".
- **Impact**: at 16.4.6 a red build or typecheck cannot be put down to the upgrade.
- **Recommendation**: run both at `7923a1d` in the form M2-c will use, with the build's environment form named, and record
  the exit codes in V-1 and V-2.

F-8 MEDIUM cycle 1 pass 1 — OPEN — M1 moves bounds in shapes that three browser surfaces parse, and no criterion names them
- **Location**: plan § M1 class; M1-c; M1-d ("its refusal set does not move"). Website `shapes.ts`
  `discordMessageImportShape`; `JsonModalBody.tsx`; `NewMessageJsonInput.tsx`; `usePusher.ts` `normalizeForHash`.
- **Description**: besides the two procedures, the changed shapes are parsed by `JsonModalBody.tsx` and
  `NewMessageJsonInput.tsx` (through `discordMessageImportShape`) and by `normalizeForHash` (through
  `discordMessageShape`); the list is from `git grep` over importers of `utils/shapes`, non-test files.
  `discordMessageImportShape` extends `discordMessageBaseShape` and uses `topLevelComponentShape`, so S4, S6, S7 and S8
  gain their bounds there too. M1-d's sentence holds for the import shape's top-level list only: a paste the JSON view
  loads today, such as a container with 41 children or 101 mention ids, is refused after M1.
- **Impact**: W-2 makes "what the front end allows" the governing question, and M1 moves it at four lists without saying
  so. QA has no criterion to test the three surfaces against.
- **Recommendation**: M1 names every consumer of the changed shapes and what moves at each. M1-d's sentence is scoped to
  the top-level list. The import surface's new refusals become a criterion or an Exclusions row.

F-9 MEDIUM cycle 1 pass 1 — OPEN — Three criteria name no runner, and M1-h's instrument has not been read
- **Location**: plan M1-h; § Release, "Post-deploy rows"; M4-a; M4-c and row R3; § Testing Strategy, M4.
- **Description**:
  - M1-h needs a signed-in session on production. The plan says QA registers the row and it is "carried as QA registers
    them". The record's post-deploy readers are scheduled headless readers (017's B7R, the header-decode chain's P1R),
    which hold no session; a signed-in browser exists in qa and uat sessions only. Its base figure, 51, is a schema-level
    run. Nobody has read the response over HTTP: security read that step "from code, not run" (audit, M-001). Production
    at `7923a1d` emits the base response today.
  - M4-a's walk is signed in, on a local build. The Testing Strategy names `browser-walker`; M4-c says "the implementation
    document". No stage is named, and the implementer has no signed-in browser.
  - R3, "still a limit, or now stoppable — recorded either way", names no observation that decides it.
- **Impact**: a criterion with no runner is discovered unowned at the stage that should have run it.
- **Recommendation**: each names its stage and step. M1-h cites a read of the base response over HTTP, or states why none
  can be made before release.

F-10 MEDIUM cycle 1 pass 1 — OPEN — M3-c's class of causes is incomplete and disagrees with M3-d
- **Location**: plan M3-c, M3-d; `verification/018/planning/eslint9-flat-probe/README.md`, the per-rule table.
- **Description**: M3-c admits three causes: a preset adding or removing a rule, a rule removed upstream, an ESLint 9
  default. The plan's own probe shows rule ids that moved with none of these: `max-len` 285 to 286, `object-curly-newline`
  124 to 126, `object-property-newline` 2 to 8, `react/function-component-definition` 6 to 7,
  `@typescript-eslint/prefer-nullish-coalescing` 4 to 19, `@typescript-eslint/no-unused-vars` 18 to 28 and
  `@typescript-eslint/no-base-to-string` 1 to 2. Two causes are missing: a kept rule whose behaviour or default options
  changed at its plugin's new version, and a different set of linted files. M3-d requires every ESLint 9 default the base
  relied on to be kept at base behaviour, while M3-c admits "an ESLint 9 default" as a cause; both cannot hold for the
  same default. M3-d lists one member of its class.
- **Impact**: "A count that moves for no cause in the class is a finding before code review" would fire on at least seven
  rule ids the probe already shows.
- **Recommendation**: complete the class from the probe's table, with each moved id assigned a cause; compare the
  linted-file set as its own quantity; reconcile M3-c with M3-d.

### Low

F-11 LOW cycle 1 pass 1 — OPEN — M1-e names one of the two branches that send the recent list
- **Location**: plan M1-e. Website `src/providers/MessageProvider/usePreferences.ts`.
- **Description**: with a message open the hook composes the list. With none it forwards the stored list whole
  (`recentMessageIds ?? session?.user?.preferences?.recentMessageIds`). A stored list of 50 with no message open is sent
  as 50 and refused under a bound of 11. M1-e's instrument varies the stored length only.
- **Recommendation**: state the input class as stored length by message open or not. Landing: the next revision.

F-12 LOW cycle 1 pass 1 — OPEN — M3-b's enumeration omits the override's `parserOptions`, and its stated instrument cannot parse the file
- **Location**: plan § M3, "Today" ("parsed with `python3 -I`"); M3-b.
- **Description**: `.eslintrc.json` holds five `//` comments (`grep -c '//'`), the first at line 16; a strict JSON parser
  stops there (`jq` and node's `JSON.parse` both fail at line 16). With the comments stripped, this pass's count matches
  the plan's: env 2, plugins 2, extends 5, settings 4, rules 45; one override with files, 3 extends and 32 rules. The
  override has a fourth key the list omits: `parserOptions` (`ecmaVersion` 2022; `project`: both tsconfig files), the
  entry that makes the type-aware rules run.
- **Recommendation**: add the entry to M3-b's list and name the instrument that produced the counts. Landing: the next
  revision.

F-13 LOW cycle 1 pass 1 — OPEN — M2-a's predicate is not exercised and does not show "exactly one"
- **Location**: plan M2-a.
- **Description**: `'@next/eslint-plugin-next@16.1.6'` (two keys in `pnpm-lock.yaml`) contains `next@16.1.6` and stays
  until M3 by design. It is a real non-member that an unanchored count matches (16 lines hold `next@16.1.6` at the base,
  `grep -c`). "Exactly one `next` version" needs the `next@` package keys enumerated, not one version's absence.
- **Recommendation**: name one real member and one real non-member, and state the enumeration. Landing: the next revision.

F-14 LOW cycle 1 pass 1 — OPEN — What M-001 leaves after M1 is not stated
- **Location**: plan § Value Statement ("seconds of CPU and hundreds of megabytes"); M1 Verification; X-14.
- **Description**: inside every bound, nesting multiplies: 40 top-level components by 40 container children by 10 gallery
  items. Run in this pass on the replica (Appendix): 48,000 issues and a 12.5 MB message in about 0.2 s, from a 676 KB
  body. The Value Statement holds by an order of magnitude, but no criterion measures it. Security's probe fills one list
  past its bound and will read 1 issue. X-14's reason, "Not a per-element issue amplifier", understates nesting. X-14
  stands under D-7 and is not re-raised.
- **Recommendation**: publish the within-bound maximum as a stated limit with its instrument, so security's close of M-001
  has a figure. Landing: the next revision.

F-15 LOW cycle 1 pass 1 — OPEN — Text left at revision 0, and a probe note the base contradicts
- **Location**: plan § "Open handoffs…", the "Precedent read" line; M4 row R3; § M3, "Premise, run".
- **Description**: the "Precedent read" line cites "017 (navigation guards; M3), 004 (`next/dynamic`; M3)"; both are M4
  since the renumbering. R3's "no new guard is built here" cites no Exclusions row. The probe's README says the archived
  `package.json` "already pinned eslint ~9.39.5 … eslint-config-next ^16.4.6"; `git show 7923a1d:package.json` has
  `~8.57.0` and `^15.0.0`. It also carries 8 ignore entries where `.eslintignore` has 9 (`grep -c .`). The plan uses the
  probe's 833 for orientation only, so nothing gates on it.
- **Recommendation**: correct the two references, cite a row for R3, and say in "Premise, run" that the README does not
  establish which tree the probe measured. Landing: the next revision.

## Questions

1. For the owner, through steering, once the planner has run F-1's unrun limb: the preview he chose cannot be built by a
   plain push, and may not be able to show the signed-out editor or the sign-in redirect. What should the preview check
   be? The options' facts are the planner's to establish first.
2. For the planner: does a stored message over a new bound keep the reason-less toast as a stated limit, or is showing the
   reason proposed to him as added scope (F-3)?
3. For the planner: what does M3 buy over holding the lint package at 15.5.14 (F-5)?

## Review-method lines with no finding

- **The M1 class.** `grep -rnE 'z\.(array|record|set|map|tuple)\(|\.array\(\)' src` over the tree at `7923a1d`
  (`git diff --numstat origin/master`: empty): 11 live sites in `shapes.ts` (S1 to S10 and the import shape) and one in
  `routers/user.ts` (S11), plus two commented lines. It matches the plan's table. No `z.record`, `z.set`, `z.map` or
  `z.tuple`.
- **M2-b's six peer dependents.** `grep -n 'next@16\.1\.6' pnpm-lock.yaml`: 16 lines, being 6 importer lines and 6
  snapshot keys for the six packages the plan names, `next`'s own package and snapshot keys, and the two lint-plugin keys
  of F-13.
- **M3's counts.** Matched by a comment-tolerant parse (F-12). `.eslintignore` has 9 entries. No other ESLint config is
  tracked (`git ls-files`: the two files), `package.json` has no `eslintConfig` key, and no source file carries an
  `eslint-env` comment.
- **S11's premise.** `usePreferences.ts` and `routers/user.ts` `updatePreferences` read as the plan says; commits
  `6ab43b1` (2023-09-02) and `4fe53b6` (2023-08-22) exist.
- **M5-e's instrument.** Read non-zero on production (`verification/018/planning/prod-next-version-pre.txt`).
- **Release and rollback.** Each rollback names its command and its runner; the release and its rollback are devops's on
  his word.
- **Decisions Register.** D-1 to D-7 each carry his words, their route and a reopening class. None is re-raised.
- **Form.** 390 lines, so no Reading Order is owed. The package has no `version` field. The plan holds no code.

## Process record

- **Session start.** The orphan check found no open document in `critiques/`. `node tools/check-repo.js` exited 1 on one
  failure, `steering/018-rulings.md:48` (a placeholder heading stamp); `INBOX.md` already carries it, so no entry was
  added.
- **A probe was run.** A script in this session's scratchpad required the installed zod by absolute path
  (`website/node_modules/zod`, 3.22.4) under `timeout 60`. Nothing was written to or run inside the website tree. The
  script is deleted at run end; what it built and printed is in the Appendix. It is a replica, not the site's module, and
  F-2 asks the planner to re-run it against the real one.
- **Two commands of mine failed and were re-run in another form.** `jq` on `.eslintrc.json` stopped at the comment on line
  16; the count was taken with a comment-stripping node script. A `grep -o` with a long bounded repeat exceeded the
  search tool's limits; the lines were read with a short python extraction. No control blocked anything.

## Appendix — the zod replica (F-2, F-14)

Built from `shapes.ts` at `7923a1d`: `sumDisplayableText` and `refineDisplayableText` copied; element shapes cut down to
text display (10), media gallery (12) and container (17); the top-level and container lists are discriminated unions on
`type`, bounded at 40, gallery items at 10; the object carries `.superRefine(refineDisplayableText)`. Two list forms:
`today` is `z.array(elem).max(n)`; `piped` is `z.array(z.unknown()).max(n).pipe(z.array(elem))`. Output, whole:

```
zod 3.22.4
A top-level list, 41 x null | today | success false | issues 42 | codes too_big,invalid_type
A top-level list, 41 x null | piped | THREW TypeError: Cannot read properties of null (reading 'type')
B top-level list, 41 x 0 | today | success false | issues 42 | codes too_big,invalid_type
B top-level list, 41 x 0 | piped | success false | issues 1 | codes too_big
C one container (top list within bound), its list 41 x null | today | success false | issues 42 | codes too_big,invalid_type
C one container (top list within bound), its list 41 x null | piped | THREW TypeError: Cannot read properties of null (reading 'type')
D one container, its list 41 x 0 | today | success false | issues 42 | codes too_big,invalid_type
D one container, its list 41 x 0 | piped | success false | issues 1 | codes too_big
E within every bound (40 x 40 x 10 items, 3 bad fields each) | today | body 676296 bytes | issues 48000 | parse 89.001073 ms | message 12520002 bytes, 102.656036 ms to build
E within every bound (40 x 40 x 10 items, 3 bad fields each) | piped | body 676296 bytes | issues 48000 | parse 76.933648 ms | message 12520002 bytes, 93.744199 ms to build
```
