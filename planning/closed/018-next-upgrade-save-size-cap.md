---
ID: 018
Origin: 018
UUID: 6273a762
Status: Committed
Status-Detail: "Committed for release website master d1bb9b0 (a fast-forward of master from 7923a1d). UAT APPROVED FOR RELEASE (fabdbe7) and security APPROVED (fa2ce9f) at d1bb9b0; devops Stage 1 done (deployment/018-next-upgrade-save-size-cap-deployment.md). Post-deploy rows B-6, B-7, B-8 and B-10 ride handoff/018-next-upgrade-save-size-cap-post-deploy-2026-11-20.md. The push awaits the owner's release approval."
Revision: 8
Plan-ID: 018
Target-Release: "website master (Vercel production), moved from 7923a1d to the chain's verified tip by devops on the owner's word"
Epic-Alignment: "None recorded: agent-output/roadmap/ holds no roadmap (ls, 2026-11-20T03:1xZ). The chain serves the owner's routing of security findings H-002 and M-001 (steering/website-deps-review-rulings.md, block 2026-11-20T01:59Z)."
Lane: "planned (not proposed small): the framework moves under every page"
---

# Plan 018 — Next.js 16.4.6 and the save-list cap (H-002, M-001)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-20T03:20 | 0 | planner-hooks-website-deps-upgrade | Plan written on the owner's word (rulings blocks 01:59Z, 02:53Z, 03:08Z; ID minted at agent-output `2b7b2de`). Hazard 4 settled by a run: ESLint 8.57.1 cannot load `eslint-config-next` 16.4.6, so OQ-1 goes to the owner. Scope delta: none against block 02:53Z; OQ-1 asks whether the lint package is held at 15.5.14 (a narrowing) or an ESLint 9 milestone is added (a widening). |
| 2026-11-20T03:31 | 1 | planner-hooks-018 | Folds his two answers of `steering/018-rulings.md` block 2026-11-20T03:25Z (`42dc4b2`): OQ-1 resolved as D-6, the Exclusions accepted as D-7; feasibility of the lint move run (`verification/018/planning/eslint9-flat-probe/`). Scope delta: M3 added (ESLint 9, a flat config, `typescript-eslint` 8, `eslint-config-next` 16.4.6; under D-6 also `eslint-plugin-react` 7.37.5, `eslint-plugin-import` 2.32.0, `@eslint/js` 10 → 9 to match ESLint 9, and removal of the unreferenced `eslint-plugin-n` and `eslint-plugin-promise`); old M3 and M4 renumbered M4 and M5; M2 no longer carries the lint packages. The plan is now five milestones against the four the determination implied, the fifth being the lint move his OQ-1 answer admits. |
| 2026-11-20T04:05 | 2 | planner-hooks-018 | Folds `critiques/018-next-upgrade-save-size-cap-critique.md` pass 1 (`ac93b5a`, REQUEST REVISION), `qa/018-next-upgrade-save-size-cap-qa.md` Phase 1 (`e1b25c7`) and `architecture/018-next-upgrade-save-size-cap-architecture-findings.md` (`81b0d58`); new runs: the abort form over the real schema (`verification/018/planning/abort-form-probe/`) and a preview-imitating build (`verification/018/planning/preview-imitation/`). Scope delta: M1's mechanism changes (the length check aborts the parse; typed shared helper; one recent-ids constant), its population becomes 21 site-and-procedure pairs and it names its three browser consumers; M4's class is enumerated by a record search (R4 dropped, R6 and R7 added, R5 narrowed to its consumed limb); M5 waits on OQ-5 (a plain push cannot build a preview, and a preview cannot serve sign-in); three stated limits added (X-18 to X-20). Size: five milestones, as at revision 1. |
| 2026-11-20T04:12 | 3 | planner-hooks-018 | Folds his three answers of `steering/018-rulings.md` block 2026-11-20T04:11Z (`df692af`) as D-8 to D-10, critique pass 2's F-16 (`409b52c`) and QA Phase 1's re-key QAF-6, QAF-7 (`qa/018-next-upgrade-save-size-cap-qa.md`); new run: stopping a parse after N issues (`verification/018/planning/error-cap-probe/`). Scope delta: M1 gains M1-i, the error cap (D-9), and M1-b is restated over it; X-19 leaves the Exclusions; M5 is written for the chosen release-check branch (D-8) and OQ-5 closes; M4's R7 leaves the class (no consumer, 015 D30); M1-g names its set-up step; M1-h cites QA's base read and rides devops's post-deploy carrier. Size: five milestones; M1 one criterion larger. |
| 2026-11-20T04:16 | R-1 | planner-hooks-018 | Registers critique pass 3's F-17, F-18 (`f209354`, APPROVED with SL-1) and the architect's AF-8 (`9a58650`, APPROVED_WITH_CHANGES) as Planner batch rows; the fold waits on QA's re-key of revision 3. |
| 2026-11-20T04:25 | 4 | planner-hooks-018 | Folds critique pass 3's F-17, F-18 (`f209354`), the architect's AF-8 (`9a58650`) and QA's re-key QAF-8 (`9218925`); new runs over the site's own schema: `verification/018/planning/union-cap-probe/` (a third plain union, `spacing`; created and returned counts made equal) and `strip-cap-probe/` (code-path-message refusals; an async stop leaves unhandled rejections). Scope delta: M1-i restated — it counts issues in the result, bounds each issue's size, and states its wiring (per-parse, shared, `ZodError`, synchronous); M1-a scoped over the cap and its issue named by `message`; M1-b compares code, path and message over the union sites. Size: five milestones; M1 unchanged in criteria count, M1-i larger in text. |
| 2026-11-20T04:27 | R-2 | planner-hooks-018 | Registers the architect's APPROVED on revision 4 and AF-9 LOW (`29b6ff8`) as a Planner batch row. |
| 2026-11-20T04:30 | R-3 | planner-hooks-018 | Registers critique pass 4 on revision 4 (`f13a0f3`, APPROVED) and its F-19, F-20 LOW as Planner batch rows. |
| 2026-11-20T04:31 | 5 | planner-hooks-018 | Folds critique pass 4's F-19, F-20 (`f13a0f3`), the architect's AF-9 (`29b6ff8`) and QA's re-key QAF-9 (`413798f`); every gate approved revision 4. Scope delta: M1-i's wording only — its unit is the M1 parse's own uncapped result, the union isolation is one typed helper, the long-value population adds `textDisplayShape.type` inside a section and cites QA's enumeration; no criterion added or removed. Size: five milestones, as at revision 4. |
| 2026-11-20T04:36 | R-4 | implementer-hooks-018 | Status set to In Progress: implementation of revision 5 started at steering's recorded start (`steering/018-rulings.md` block 2026-11-20T04:33Z) on website `chain/018-next-upgrade-save-size-cap` from `7923a1d`. |
| 2026-11-20T05:09 | 6 | planner-hooks-018 | Folds the implementer's M2 report relayed by steering (04:5xZ; `verification/018/implementation/m2/`) after a planning run, `verification/018/planning/m2-tsconfig/`, which also found the `ts-node` scripts failing under the change. Scope delta: M2's steps add three `tsconfig.json` keys (`moduleResolution` `bundler`, a `paths` entry for highlight.js's types, `moduleResolution` `node` in the `ts-node` block); M2-b bounds the tsconfig diff to them and holds highlight.js at 11.7.0; M2-c adds the build leaving tsconfig as committed and the `ts-node` check; X-21 added. Size: five milestones; M2 one file wider. |
| 2026-11-20T05:20 | 7 | planner-hooks-018 | Folds the architect's AF-10 (`2ec5f52`), critique cycle 2 pass 1's F-21 and F-22 (`9ab8420`) and QA's QAF-10 (`1c2f073`): revision 6's `paths` entry removed highlight.js from the build. New run `verification/018/planning/m2-tsconfig/` (`A-final/`, `hl-compare/`). Scope delta: M2 drops the `paths` entry and moves `highlight.js` 11.7.0 → 11.12.0 under D-6 (X-21 removed; steering tells him at the next prompt, per block 03:25Z); M2-b, M2-c (the built output must hold highlight.js; exit codes recorded) and a new M2-e (a walked highlighted code block) follow. Size: five milestones; M2 one package and one criterion wider than at revision 5. |
| 2026-11-20T05:22 | R-5 | planner-hooks-018 | Registers the architect's APPROVED on revision 7 and AF-11 LOW (`60d0a11`) as a Planner batch row. |
| 2026-11-20T05:23 | R-6 | planner-hooks-018 | Registers critique cycle 2 pass 2 on revision 7 (`15988b6`, APPROVED with SL-2) and its F-23 MEDIUM, F-24 LOW as Planner batch rows. |
| 2026-11-20T05:24 | R-7 | planner-hooks-018 | Records QA's re-key of revision 7 (`a7394c6`, no findings); parks AF-11, F-23 and F-24 for the fold seam. |
| 2026-11-20T05:32 | R-8 | planner-hooks-018 | Registers three below-HIGH M2 items from the implementer's M2 document (`b4b34b6`) under steering's cap (block 05:26Z) as Planner batch rows M2-I1 to M2-I3. |
| 2026-11-20T05:35 | R-9 | code-reviewer-hooks-018 | M1 code review Round 1, scoped to the milestone (plan Status unmoved): **REJECTED** at website `f9e66c2` (`code-review/018-next-upgrade-save-size-cap-code-review.md`, `55fe778`). CR-1 HIGH: M1-b fails because the capped refusal gives an explicit-message issue zod's default wording (shown by a run). CR-2 LOW: the cap relies on zod 3.22.4's `makeIssue` calling the error map, and `^3.20.6` admits 3.25.76, where the cap misses (a Planner batch candidate). CR-3 INFO. |
| 2026-11-20T05:41 | R-10 | code-reviewer-hooks-018 | M2 code review Round 2, scoped to the milestone (plan Status unmoved): **APPROVED_WITH_COMMENTS** at website `b0b0158` (`code-review/018-next-upgrade-save-size-cap-code-review.md`, `34ed471`). M2-a to M2-d reproduced in the reviewer's own export; the three ts-node scripts typecheck under their options. CR-4 INFO, a record count. M1 stays REJECTED (R-9). |
| 2026-11-20T05:42 | R-12 | planner-hooks-018 | Registers code review CR-2 LOW (`55fe778`) as a Planner batch row under steering's ruling, block 2026-11-20T05:42Z (`f391462`). |
| 2026-11-20T05:43 | R-11 | code-reviewer-hooks-018 | M1 code review Round 1 sub-entry 1 (scoped to the milestone; plan Status unmoved): **APPROVED_WITH_COMMENTS** at website `a558f2d` (`code-review/018-next-upgrade-save-size-cap-code-review.md`). CR-1 closed, re-attacked through both procedures' input shapes; CR-2 carried by the Planner batch (ruling 05:42Z); CR-3 reconciled. With M2's R-10, both milestones are now with QA Phase 2. |
| 2026-11-20T05:45 | R-13 | qa-hooks-018 | M2 QA Phase 2, scoped to the milestone (plan Status unmoved): **PASS** at website `b0b0158` (`qa/018-next-upgrade-save-size-cap-m2-qa.md`, evidence `verification/018/qa/m2-phase2/`). M2-a to M2-d reproduced; suite 2259/2259, exit 0, with per-file parity against `f9e66c2`. No finding. M2-e is B-9/B-10 (UAT). The verdict expires when M1's fix `a558f2d` lands over it; the refresh is carried by QA's M1 pass. |
| 2026-11-20T05:56 | R-14 | code-reviewer-hooks-018 | M3 code review Round 3, scoped to the milestone (plan Status unmoved): **APPROVED_WITH_COMMENTS** at website `969d92a` (`code-review/018-next-upgrade-save-size-cap-code-review.md`, `a05fb21`). CR-5 LOW: the M2-b-form lockfile disposition compares per-name version sets, so it cannot see 3 production edges re-pointed under `project-utils > prisma-kysely` (a generator-only path). M2-b's wording is a Planner batch candidate. CR-6 LOW: pre-existing. |
| 2026-11-20T05:56 | R-15 | planner-hooks-018 | Registers code review Round 3's CR-5 LOW (`a05fb21`) as a Planner batch row. |
| 2026-11-20T05:58 | R-16 | qa-hooks-018 | M1 QA Phase 2, scoped to the milestone (plan Status unmoved): **PASS** at website `a558f2d` (`qa/018-next-upgrade-save-size-cap-m1-qa.md`, `eb0c713`; evidence `verification/018/qa/m1-phase2/`). Suite 2261/2261, exit 0. Differential 0 violations over 1224 labels. Sweep of M1 guards: 66 of 69 killed plus NM-4 re-targeted, 3 survivors equivalent. M2 re-anchored at `a558f2d` (PASS). B-2 gains the capped-refusal HTTP limb (UAT). The effort-final sweep is owed. |
| 2026-11-20T06:06 | R-17 | qa-hooks-018 | M3 QA Phase 2, scoped to the milestone (plan Status unmoved): **PASS** at website `969d92a` (`qa/018-next-upgrade-save-size-cap-m3-qa.md`, `e0d8b95`; evidence `verification/018/qa/m3-phase2/`). M3-a to M3-e hold. Suite 2261/2261, exit 0, identical to `a558f2d`. No built JS differs. **QAF-11 LOW** for the Planner batch beside CR-5: five function traces gain 4 package-metadata paths (`cross-spawn@7.0.6`, `semver@6.3.1`), so the M3 sentence "affects no build or runtime output" needs correcting. |
| 2026-11-20T06:08 | 8 | planner-hooks-018 | Folds the Planner batch at steering's brief (`steering/018-rulings.md` block 2026-11-20T06:06Z): AF-11, F-24 (`60d0a11`, `15988b6`), F-23 (SL-2), M2-I1 to M2-I3 (`b4b34b6`), CR-2 (`55fe778`, block 05:42Z), CR-5 (`a05fb21`) and QAF-11 (`e0d8b95`). Scope delta: M2's steps add `zod` pinned exactly at 3.22.4 (one specifier, no version moves; one implementer commit follows); M2-b names the `sharp` and peer-suffix movers and adds an edge-level production-closure comparison; M2-d records the Edge Runtime warning; M2-e names UAT as its post-deploy runner; M3's rollback line corrected; the rest wording. Size: five milestones; M2 one specifier wider. |
| 2026-11-20T06:13 | R-18 | planner-hooks-018 | Registers M2-I4 LOW (`paracord` unpinned in `package.json`; `7c76319`) as a Planner batch row with its disposition, at steering's relay. |
| 2026-11-20T06:13 | R-19 | code-reviewer-hooks-018 | CR-2's zod pin, code review Round 1 sub-entry 2: **APPROVED** at website `d1bb9b0` (`code-review/018-next-upgrade-save-size-cap-code-review.md`, `7804862`). CR-7 INFO, pre-existing: `paracord` and `project-utils` are git dependencies with no commit, so any lockfile regeneration can move them (a Planner batch candidate). |
| 2026-11-20T06:14 | R-20 | planner-hooks-018 | Registers code review CR-7 INFO (`7804862`) beside M2-I4 as a Planner batch row. |
| 2026-11-20T06:19 | R-21 | qa-hooks-018 | Effort-final QA Phase 2: **PASS** at website `d1bb9b0` (`qa/018-next-upgrade-save-size-cap-m4-qa.md`, `62703f1`; evidence `verification/018/qa/final-phase2/`). Re-keyed to revision 8. M4's QA limbs hold, with R6 re-read by QA. M1 to M3 re-verified at the tip: suite 2261/2261, exit 0; differential 0 violations; build, traces and lint identical to `969d92a`. M2-b's edge limb: 158 changed production edges, all in class. The sweep stands on blob identity with `a558f2d`. Status set to QA Complete. |
| 2026-11-20T06:48 | R-22 | uat-hooks-018 | UAT on revision 8: **APPROVED FOR RELEASE** at website `d1bb9b0` (`uat/018-next-upgrade-save-size-cap-uat.md`, `fabdbe7`). B-1, B-2 (both limbs), B-3 (R1, R2; R3 recorded: X-14 holds; R5 as 16.1.6, instrument not discriminating, UAT-2 LOW), B-9 and M5-d on local production builds of the tip with base `7923a1d` as control; B-4 on the release-check preview `5677889`. UAT-1 MEDIUM: B-7's version instrument must read `/_next/static/immutable/` (devops's handoff). Status set to UAT Approved. |
| 2026-11-20T07:04 | R-23 | security-hooks-website-deps | Security on the change `7923a1d..d1bb9b0`: **APPROVED** at website `d1bb9b0` (`security/018-next-upgrade-save-size-cap-security-audit.md`, `fa2ce9f`; evidence `verification/018/security/`). H-002 and M-001 of the dependency review are VERIFIED at that tree and close at the release. The audit at the chain lockfile holds 81 entries, none new and no Next.js entry. No control is owed before the push. L-001 LOW, not blocking: tRPC batching lets one request carry about 1,050 capped saves; carried, with the review's leftovers (X-4's and X-5's items among them), by `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`. Status unchanged. |
| 2026-11-20T07:12 | R-24 | devops-hooks-018 | Stage 1: Status Committed with the release identifier (website master d1bb9b0); B-5 EXECUTED; the chain's documents closed Committed; post-deploy carrier and the unpinned-git-dependency handoff created; the Reading-Order cell for revision 8's fold set discharged (critic 4c8d4b8, architect a4d94ce). Nothing pushed. |

## Header

- **Plan ID** 018. **Revision** 8. **Status** In Progress.
- **Target Release:** website `master`, which Vercel deploys to production (`link.productionBranch: master`,
  `verification/018/planning/vercel-project-preview-fields.md`). The package has no `version` field (`package.json` at
  `7923a1d`), so the release is the serving ref moving, named by its SHA. No version or CHANGELOG milestone.
- **Serving refs read at planning** (website; `git ls-remote origin`, 03:1xZ): `master` `7923a1d9…` serves production. `backup`,
  `external-message-api`, `redesign`, `regex-refactor` exist; a non-`master` branch push starts a Vercel preview deploy, not a
  production one (project record). Whether that preview builds is a separate fact: a tree without a build-command override does
  not (M5's premise, RK-7). `.github/workflows`: absent (`release-move.js website master 7923a1d… --dry-run`: "workflows none … DRY RUN:
  every check passed"). `--report`: "one serving ref at origin (master); no pair". project-utils is read only and ships nothing in
  this chain. Every remote push — any preview push and the release push — is devops's act.
- **Repositories:** `website` (the change); `project-utils` (read only, `origin/master` `749606d`); `agent-output` (the record).
  One repository is changed, so the launch directory is `/usr/local/bin/hooks/website` for every stage.
- **Architectural surface:** none new. No layer, no cross-repo contract, no rewritten core path. Read for this:
  `architecture/website.md` W-2, A-1, A-4 (the save schema and its bounds) and `architecture/system-architecture.md:110` (the
  Next.js 16 hybrid). Lines the chain touches: A-4 ("Bounds have two homes") gains the new list bounds and the recent-ids constant
  (AF-3, AF-4); the master record's Quality Attribute "`satisfies z.ZodType<...>` locks Zod schemas to TS types" is kept (M1-d);
  `system-architecture.md:179` (the removed direct `sharp`) is the architect's. The architect's conformance pass is in the stage set.
- **Base:** website `origin/master` `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`. The chain branch is cut by steering at
  implementation start.

## Reading Order

The plan is under 500 lines; no Reading Order is owed.

Owed re-verdicts:

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| M1-g, M1-h (§ M1) | revision 3 | critic (pass 3, `f209354`), QA (re-key, `9218925`) | discharged |
| M4's class (R7 removed) and M5 (§ M4, § M5) | revision 3 | critic (pass 3), QA (re-key), architect (`9a58650`) | discharged |
| M1-a, M1-b, M1-i (§ M1) | revision 4 | critic (pass 4, `f13a0f3`), QA (re-key, `413798f`), architect (`29b6ff8`) | discharged |
| M1-i's wording (§ M1) | revision 5 | critic (pass 5, `b61164b`), QA (`cdb71e2`), architect (`1f78e40`) | discharged |
| M2's steps, M2-b, M2-c, X-21 (§ M2, § Exclusions) | revision 6 | critic (cycle 2 pass 1, `9ab8420`), QA (`1c2f073`), architect (`2ec5f52`) | discharged: REQUEST REVISION, folded at revision 7 |
| M2's steps, M2-b, M2-c, M2-e (§ M2) | revision 7 | critic (`15988b6`), QA (`a7394c6`), architect (`60d0a11`) | discharged |
| Revision 8's fold (§ M2, § M3, § Release) | revision 8 | critic (the fold's gate); the architect reads it in its closing pass | discharged: critic cycle 3 pass 1 (4c8d4b8, APPROVED), architect closing pass (a4d94ce, APPROVED) |

## Value Statement and Business Objective

As the operator of hooks.gg, I want the site on a Next.js release that carries no advisory the dependency review found reached,
and I want a signed-in save that sends an oversized list to be refused with one error for that list, so that neither a crafted
App Router request nor one oversized list in a save can make the server spend seconds of CPU and hundreds of megabytes building an
error. The lint setup moves with the framework (M3) so that a developer who runs lint gets the rules written for the Next.js and
React releases the site runs, on the configuration format ESLint 9 and later require, making the next lint upgrade a version change
rather than a rewrite; it buys nothing at runtime, and its cost is RK-5.

Inside every bound, nesting multiplies: a 707,607-byte save of lists all within their bounds gave 48,500 issues and a
13,324,552-character message (`verification/018/steering/refute-within-bound/output.txt`, steering's helper, the real `shapes.ts`).
His D-9 adds the error cap (M1-i) so that no save can build an error of that size.

The originating report's statements, verbatim (`security/website-deps-review-security-audit.md`):
- H-002: "Next.js 16.1.6 carries two App Router denial-of-service advisories with no precondition the site lacks".
- M-001: "A signed-in user's 1 MB save request makes the server build a validation error of more than 100 MB".

## Decisions Register

| ID | Decision | Date | His words, verbatim, and route | Reopened by |
|---|---|---|---|---|
| D-1 | The Next.js upgrade and the save-size cap are one chain, opened after H-001 ships | 2026-11-20 | "Agent: separate chain after H-001 (Recommended)" — selection-prompt answer, ledger `steering/selection-ledger/2026-11-20.md`, heading "2026-11-20T01:59Z — steering-roadmap-hooks"; option wording steering's | Owner withdrawal only |
| D-2 | Target Next.js 16.4.6, with its lint and analyzer packages | 2026-11-20 | "Agent: 16.4.6 (Recommended)" — selection-prompt answer, same ledger, heading "2026-11-20T03:08Z — steering-roadmap-hooks". The option text he saw: "Agent moves Next.js and its lint/analyzer packages to the latest 16.4 release." (steering's wording) | Owner withdrawal only; the lint package's route is D-6 |
| D-3 | The chain branch is pushed for a Vercel preview, and UAT loads the public pages, images and the sign-in redirect there before the release push | 2026-11-20 | "Agent: preview first (Recommended)" — same ledger and heading. Option text: "Agent pushes the chain branch (preview only, production untouched). UAT loads the public pages, images and the sign-in redirect on the preview. Signed-in pages can't run there." (steering's wording) | Narrowed by D-8: the preview is the release-check branch, and the sign-in redirect moves to the local build. Owner withdrawal only |
| D-4 | Scope as determined in block 02:53Z, its exclusions out | 2026-11-20 | "Agent: as determined (Recommended)" — same ledger and heading. Option text: "Agent opens a planned chain on exactly that scope. Release is a website master push, which needs your word." The question text named "a cap on all 11 lists in the two save requests". (steering's wording) | Owner withdrawal only |
| D-5 | The release is a website `master` push, which needs his word; devops asks for it in its own session | 2026-11-20 | Carried in D-4's option text above; steering's common brief, "End step" | Owner withdrawal only |
| D-6 | `eslint-config-next` goes to 16.4.6 with what it needs (ESLint 9, a flat config, `typescript-eslint` 8), and the chain may upgrade any package it judges useful, each recorded as a scope delta with its reason | 2026-11-20 | "you can upgrade any packages to anything deemed useful" — typed in answer to the selection prompt on OQ-1, ledger `steering/selection-ledger/2026-11-20.md`, heading "2026-11-20T03:25Z — steering-roadmap-hooks"; relayed by steering, `steering/018-rulings.md` block 2026-11-20T03:25Z, which records the reading that this is the "ESLint 9 milestone" limb (steering's reading) | Owner withdrawal only. Does not reopen X-1 (zod 4): D-7 |
| D-7 | Exclusions X-1 to X-15 of revision 0 stand, each with its carrier | 2026-11-20 | "Agent: accept as written (Recommended)" — selection-prompt answer, same ledger heading; option text "Agent leaves all of them out; each keeps its stated limit or handoff record, and the plan proceeds to critique." (steering's wording) | Owner withdrawal only |
| D-8 | The preview is a release-check branch: the chain tip plus one commit adding only the build-skip setting, pushed to a non-master branch; UAT checks public pages, redirects and images there; sign-in is checked on a local build; the release pushes the tip without that commit | 2026-11-20 | "Agent: release-check branch (Recommended)" — selection-prompt answer, ledger `steering/selection-ledger/2026-11-20.md`, heading "2026-11-20T04:11Z — steering-roadmap-hooks"; relayed in `steering/018-rulings.md` block 2026-11-20T04:11Z. Option text: "Devops pushes the chain tip plus one extra commit that only adds the build-skip setting, to a non-master branch (preview only). UAT checks public pages, redirects and images on Vercel's own build; sign-in is checked on a local build. The release pushes the tip without that commit." (steering's wording) | Owner withdrawal only; RK-7's falsifier (a push without the override reaching READY) would make the extra commit unnecessary |
| D-9 | The save cap also caps the error: the server stops checking after a small number of errors and returns a short reason, so no save can build a huge error; one more change in the save-cap milestone, with its own tests | 2026-11-20 | "Agent: also cap the error (Recommended)" — same ledger heading and relay. Option text: "The planner adds to the save-cap milestone: the server stops checking after a small number of errors and returns a short reason, so no save can build a huge error. One more change in the same milestone, with its own tests." (steering's wording). M1-i carries its binding phrases verbatim | Owner withdrawal only |
| D-10 | The editor's Save keeps its current message for a stored message over a new bound (X-18 stands) | 2026-11-20 | "Agent: leave it (Recommended)" — same ledger heading and relay. Option text: "Agent keeps Save's current message; it affects only pasted messages already over Discord's own limits, and the reason is visible in the JSON view." (steering's wording) | Owner withdrawal only |

Agent-authored decisions (Standing Default "a design or mechanism choice inside the agreed scope is the stage's"; recorded, not
his words): AD-1 the cap mechanism (M1-d); AD-2 the bound values at the five sites that have none (M1 table); AD-3 no lower body
limit on the tRPC route (X-9); AD-5 the error cap's number, 20 issues (M1-i). AD-4 (the reason-less Save toast) is now his D-10.

## Objective

1. Website resolves `next` 16.4.6 and serves it in production.
2. Every server-reachable save list refuses an over-limit length with one returned issue, before validating any element, and no
   save's refusal carries more than a small, fixed number of issues.
3. The lint setup runs on ESLint 9 with `eslint-config-next` 16.4.6, carrying today's configuration.
4. Behaviour the record ties to Next 16.1.6 is re-verified at 16.4.6, and the upgraded site is seen on a Vercel preview of a
   release-check branch before release (D-8).

## Assumptions and open questions

OPEN QUESTION [RESOLVED]: OQ-5, what the preview check can be (critique F-1; D-3) — resolved by D-8. Runs, not inference:
- A tree with no build-command override does not build in Vercel's Preview environment: `src/env.mjs` requires `DATABASE_URL`,
  `REDISHOST`, `REDISPORT`, `REDISUSER` and `REDISPASSWORD`, which the project gives to Production only
  (`verification/017/m5-0/devops/preview-env-names.txt`, names and targets, read 2026-11-19; this pass did not re-read the list).
  A local build of `7923a1d` with every Preview-target name set to a dummy and those five unset exits 1: "Invalid environment
  variables: DATABASE_URL, REDISHOST, REDISPORT, REDISUSER, REDISPASSWORD: Required"
  (`verification/018/planning/preview-imitation/README.md`). The two READY previews on record were built from a branch whose one
  change was `vercel.json` `"buildCommand": "SKIP_ENV_VALIDATION=1 next build"` (`verification/017/m5-0/README.md`).
- Built with that override and served without it at request time (as a Vercel function runs: a build-command variable is not
  present then), the same build answers: `/`, `/legal/privacy`, `/legal/terms`, `/preview`, `/message`, `/message/m/0/edit`,
  `/message/m/0/send` 200; `/support` 308 to the Discord invite; `/message/m/5` 307 to `/message/m/5/edit`; one `/_next/image`
  avatar 200; `/api/auth/providers` and `/api/auth/signin/discord` **500** ("Invalid environment variables", the same five names).
  So a preview can show the public pages, the redirects and images, and cannot show the sign-in redirect. The run did not set
  `VERCEL`/`VERCEL_URL`/`VERCEL_ENV`, which `env.mjs` reads; a limit of the imitation.
- Anonymous loads of a preview host answered 200 on 2026-11-19 (`verification/017/m5-0/limb3/probe-requests-log.jsonl`), so
  preview protection is not an obstacle.
Where searched: website `src/env.mjs`, `vercel.json`, `next.config.js` at `7923a1d`; 017's M5-0 record; the two runs above.
Answered by D-8 (the release-check branch). These facts are M5's premise.

OPEN QUESTION [RESOLVED]: OQ-1, the lint package — resolved by D-6 as milestone M3.

OPEN QUESTION [CLOSED]: OQ-2, are the two Next.js internals the test helpers import moved by 16.4.6? No: byte-identical
(`verification/018/planning/next-internals-16.1.6-vs-16.4.6.md`).

OPEN QUESTION [CLOSED]: OQ-3, can zod 3.22.4 refuse an over-limit list with one issue, before its elements run, in the site's real
schema? Yes, in the abort form (M1-d), and not in the form revision 1 closed it on. The revision-1 form left a refused list dirty,
so the message-level `superRefine(refineDisplayableText)` ran over unvalidated elements and threw on `null` (QAF-1, F-2) and added a
second issue (AF-2). The abort form, run over the real `shapes.ts` and `user.ts` in an isolated export (288 rows: S1–S11 through
both procedures and the import shape; element kinds valid, invalid, number, `null`, nested over-limit; lengths bound, bound+1,
bound+50): every one of the 182 over-limit rows gives one issue at the list, none inside it, no displayable-text issue, no throw;
rows at the bound equal the base's; typecheck exits 0 with every `satisfies` in `shapes.ts` as at `7923a1d`
(`verification/018/planning/abort-form-probe/`; the 182 re-tallied by the planner from `rows-abort.txt`). Deciding source, zod
3.22.4 `lib/types.js`: a `fatal` issue aborts (2963–2964); an aborted inner returns before the refinement runs (3019–3020); a
pipeline returns `INVALID` on an aborted first stage (3285–3286).

OPEN QUESTION [CLOSED]: OQ-4, is a preview behind a Vercel login? No: anonymous loads answered 200 (017's record, under OQ-5).

Assumptions (each with its read):
- Node: Vercel builds with `24.x` (project record); local v24.14.0; `next` 16.4.6 requires `>=20.9.0` (`npm view`). React stays
  19.2.4.
- The release notes from 16.1.7 to 16.4.6 were read by a helper (`verification/018/planning/next-16.4.6-release-notes.md`, 30
  tags; not re-derived by the planner, and assumed complete by the critic's pass 1). Closing that assumption is the implementer's at
  M2-d and QA's at Phase 2.

## Plan

### M1 — Every server-reachable save list refuses an over-limit length with one returned issue (M-001)

**Class (enumerated, finite):** the 11 server-reachable array sites of `sweep-unbounded-input.md` §2 at `7923a1d` (confirmed by the
critic's `grep` over the tree), crossed with the procedures that reach them: S1–S10 through `message.upsert`
(`optionalIdMessageShape`, at `message.data…`) and through `user.updatePreferences` (`partialMessageShape`, at `message.data…`), and
S11 through `user.updatePreferences` only (its inline input) — **21 site-and-procedure pairs** (QAF-5).

| # | Site (path:symbol at 7923a1d) | Bound today | Bound after M1 | Home of the bound |
|---|---|---|---|---|
| S1 | `shapes.ts` `actionRowShape.components` | 5 | 5 | `MAX_ACTION_ROW_BUTTONS`, today's bound kept (D-4) |
| S2 | `shapes.ts` `sectionShape.components` | 3 | 3 | `MAX_SECTION_TEXT_COMPONENTS`, today's bound kept (D-4) |
| S3 | `shapes.ts` `mediaGalleryShape.items` | 10 | 10 | `MAX_MEDIA_GALLERY_ITEMS`, today's bound kept (D-4) |
| S4 | `shapes.ts` `containerShape.components` | none | 40 | `MAX_TOTAL_COMPONENTS`, as `discordMessageBaseShape.components` reads it (AD-2) |
| S5 | `shapes.ts` embed `fields` | 25 | 25 | `MAX_EMBED_FIELDS`, today's bound kept (D-4) |
| S6 | `shapes.ts` `allowed_mentions.parse` | none | 3 | the length of one constant tuple of the element's admitted values, from which the element's union is also built, so X-13's later fix moves both (AF-4) (AD-2) |
| S7 | `shapes.ts` `allowed_mentions.users` | none | 100 | one mention-id constant in the `~/constants` barrel beside `MAX_EMBEDS`, not under its "Components V2 limits" comment (AF-4); Discord: "Array of user ids to mention, max 100" (docs.discord.com/developers/resources/message, a helper's read) (AD-2) |
| S8 | `shapes.ts` `allowed_mentions.roles` | none | 100 | the same constant; Discord: "Array of role ids to mention, max 100" (AD-2) |
| S9 | `shapes.ts` `discordMessageBaseShape.embeds` | 10 | 10 | `MAX_EMBEDS`, today's bound kept (D-4) |
| S10 | `shapes.ts` `discordMessageBaseShape.components` | 40 | 40 | `MAX_TOTAL_COMPONENTS`, today's bound kept (D-4) |
| S11 | `routers/user.ts` `updatePreferences` input `recentMessageIds` | none | 11 | `MAX_RECENT_MESSAGE_IDS` (10) in the `~/constants` barrel beside `MAX_MESSAGES`, read by the server's slice, by the client's cut and by this bound as `+ 1`; the one is the open message's slot, which also keeps an already-loaded bundle's list (open message plus 10) accepted after release (AF-3) (AD-2) |

**Consumers of the changed shapes** (F-8; `git grep` over importers of `utils/shapes`, non-test files, by the critic; re-read here):
the two procedures; `JsonModalBody.tsx` and `NewMessageJsonInput.tsx`, which parse every paste in the browser with
`discordMessageImportShape` (it extends `discordMessageBaseShape`, so S4, S6, S7 and S8 bind it, and its top-level list is S10's
form inside its `z.preprocess`); and `usePusher.ts` `normalizeForHash`, which calls `discordMessageShape.safeParse` and falls back
to the unparsed message on failure.

**Acceptance criteria (properties):**
- **M1-a.** For each of the 21 pairs, each list length above its bound (at least bound+1 and bound+50), and each element kind in the
  finite class {valid; invalid of the right type; a wrong primitive type; `null`; an element whose own list is over its bound, where
  the element has one}, the procedure refuses the input with `BAD_REQUEST` — never another code, never a throw past tRPC — and,
  where fewer than 20 issues precede the list in parse order, its issues include exactly one for that list (`code` `too_big`,
  `path` the list's path, `message` zod's "Array must contain at most <bound> element(s)"), none whose path lies inside that list,
  and no displayable-text issue; where 20 or more precede it, the refusal is M1-i's capped form and the list's issue is absent
  (F-18). Instrument: the tRPC caller of each procedure (S11 through `user.updatePreferences`). QA owns the cases.
- **M1-b.** For each pair and each length at or below its bound, where the `7923a1d` schema's result holds k issues for an input
  (issues *in the result*: the unit M1-i counts), the M1 refusal carries the `code`, `path` and `message` of the same first
  min(k, 20) issues in the same order, followed by M1-i's one summary issue when k > 20. The population includes each of the three
  plain-union sites failing (M1-i), alone and mixed. Instrument: the `7923a1d` schema over the same inputs, each issue reduced to
  those three fields, compared issue for issue with the refusal. No expected issue list may be computed from, or supplied as, the M1
  schema's own output.
- **M1-c.** At the six sites bounded today (S1, S2, S3, S5, S9, S10) the set of inputs refused equals the set refused at `7923a1d`
  (AF-2): the issue list of a refused input may shrink (to the one length issue, the displayable-text issue no longer added after a
  refused list), never grow. At the five new bounds (S4, S6, S7, S8, S11) the inputs newly refused are exactly those with a list
  longer than the bound.
- **M1-d (mechanism, AD-1).** One shared helper, exported from `shapes.ts` beside `discordIdShape` (and imported by `routers/user.ts`
  for S11), checks the length first and, on failure, records the one issue as **fatal**, so the parse of the enclosing object aborts
  as an invalid element aborts it today and no parent refinement runs (OQ-3's deciding source). Its declared type is the input and
  output of `z.array(element)`, with the one cast inside the helper (AF-1). All 11 sites use it, and so does the import schema's
  top-level list. `pnpm run typecheck` exits 0 with every `satisfies` clause in `shapes.ts` as at `7923a1d` (blob comparison of each
  clause's line, or a read of `git diff` showing none touched). Mirror: the six sites' `.max(CONST)` form, deviated from because it
  cannot meet M-001's bar (`refute-zod-max/output.txt`); the deviation and its reason go in A-4.
- **M1-e (declined work has a fate; QAF-3, F-11).** S11: for every stored recent list, the list the client sends is within the
  bound, over the class {stored length 0, 10, 11, 50} × {a message with an id open, no message id} plus a stored list that already
  holds the open id at position 11 or later. Instrument: `usePreferences.ts` driven with each member and the server bound applied to
  what it sends; the 50-with-no-id case is red at the decision-only tree (bound added, composer as at `7923a1d`).
- **M1-f (fate of a stored message over a new bound; F-3).** What each surface shows, from the code at `7923a1d`:
  - the editor's Save (`MessageProvider` `upsertMessage` `onError`) shows the fixed toast "Error. Failed to save message. Please try
    again." with no reason, on every attempt (X-18, D-10);
  - Save As and the new-message modal show the server's issue lines (`formatMutationError`, `SaveAsMenu.tsx`, `NewMessageModal.tsx`),
    so the bound's line appears there;
  - the JSON view parses the message on open and on every edit, and shows the bound's issue at the list's path (A-1 formatting).
  Where the item goes: nothing is deleted or rewritten; the user shortens the list in the JSON view and saves. Most exposed: messages
  built from pasted JSON (the editor cannot add mention ids or a container's 41st child). Discord refuses users or roles above 100
  and a message above 40 total components at send, so such a message could not be sent today either. S6's residue (a pasted `parse`
  of four or more entries, necessarily repeating a value) is stated, not gated. A stored message over a new bound also makes
  `normalizeForHash` fall back to the unparsed message, as it already does for any message the shape refuses; the own-save notice
  (W-6) compares two values taken the same way.
- **M1-g (human-observable form, two surfaces; QAF-2, F-3).**
  - *Browser:* in the JSON view, pasting a message whose `allowed_mentions.users` holds 150 malformed ids shows one error line (the
    100 bound) where `7923a1d` shows 150. The paste is refused in the browser and no request is sent.
  - *Server:* a stored message whose `allowed_mentions.users` holds 150 well-formed ids, saved with **Save As**, shows one line naming
    the 100 bound; at `7923a1d` the same message saves. Set-up (F-16): after M1 neither the JSON view nor the editor can make that
    message, so UAT creates it on a local build of `7923a1d` by pasting it into the JSON view and saving (which succeeds there), then
    serves the M1 tip over the same local database, opens that message in the editor without opening the JSON view, and uses Save As.
  Both walked by UAT on a local build before release, signed in with the test account, under the local-build rule (message ids
  moved to 900000000000001 before the first save; `CLAUDE.md`, "Local builds of `website`").
- **M1-h (post-deploy observable; F-9, QAF-7).** One signed-in test-account `message.upsert` with 50 invalid embeds, sent over HTTP
  to hooks.gg: 400 `BAD_REQUEST` with 51 issues at `7923a1d` (read by QA at 04:09Z while production served Next 16.1.6,
  `verification/018/qa/phase-1/prod-base-reads/README.md`), 1 issue after release. The after read is a row of devops's Stage-1
  post-deploy handoff, which carries every open post-deploy row, with `Owning-Stage: uat` for this row; UAT runs it after the push
  with its signed-in browser. A refused save writes nothing; test accounts may write to production (his ruling,
  `steering/015-rulings.md` line 429).
- **M1-i (the error cap; D-9).** His option's binding phrases, verbatim: "the server stops checking after a small number of errors
  and returns a short reason, so no save can build a huge error". Over every input to the 21 pairs (any body the route accepts),
  the two procedures' input checks:
  - *the unit (F-17, F-19):* an issue is one that the M1 parse's own result would carry with no cap. On an over-limit list that is
    the one list issue (M1-a), never the per-element issues the `7923a1d` schema records there; `7923a1d` is M1-b's comparison
    only. An issue zod creates and discards — a plain `z.union`'s losing branches — is not one. At `7923a1d` the save schema has three plain unions:
    `sectionShape.accessory`, `separatorShape.spacing` and the element of `allowed_mentions.parse` (`git grep -n -E 'union|\.or\('`
    over `shapes.ts`, `routers/user.ts`, `routers/message.ts`); the other unions are `z.discriminatedUnion`, which parses only the
    chosen option. Counted on created issues, six failing accessories are refused with 21 issues, 17 of them branch lines the base
    never shows (`verification/018/planning/union-cap-probe/`, `rows-base.txt`);
  - *stop checking:* record at most 20 issues (AD-5) and then stop validating — the parse is ended, not completed and trimmed.
    Instrument: QA's element-read count (a real stop reads 63 elements where full-then-trim reads 4,800,
    `verification/018/qa/phase-1/error-cap-async-probe/`);
  - *a short reason:* refuse with the first 20 issues in parse order plus one summary issue (`path` `[]`, a message saying the check
    stopped after 20 errors), so Save As and the new-message modal render 21 lines;
  - *no huge error (QAF-8):* every issue of every refusal — capped or not, k of 1 included — carries exactly `code`, `path` and
    `message`, the three fields `formatMutationError` `looksLikeZodIssues` checks and the only ones zod-error 1.5.0 reads outside its
    tests, so each line shown equals the base's for the same issue (`strip-cap-probe/`: eight inputs, equal lines). `received` and `unionErrors` carry the
    refused input (one 100,000-character `parse` element: 301,470 characters at `7923a1d`, QA's
    `verification/018/qa/phase-1/issue-size-probe/report.txt`). The refusal's `message` is at most 16 KB over this population:
    steering's within-bound worst bodies (707,607 bytes and 48,500 issues at most, 13,324,552 characters at `7923a1d`,
    `verification/018/steering/refute-within-bound/`); M1-a's over-limit bodies; and one long value (100,000 characters) at each
    position whose failure records the input — a `z.literal` or a union of literals that is not a `z.discriminatedUnion`
    discriminator, enumerated by QA from `z.literal(` and `z.union(` in `shapes.ts` and `routers/user.ts` with the discriminators
    excluded by name — a position is excluded only where it is reached as a discriminator, so a shape reached both ways is a member
    by the plain route (QA's enumeration, `qa/018-next-upgrade-save-size-cap-qa.md` QAF-9 at `413798f`: 12 `z.literal(` and 3
    `z.union(` lines in `shapes.ts`, none in `routers/user.ts`; at `7923a1d`: `parse`'s element, also three at its bound;
    `linkButtonShape.type` and `.style`; the accessory and its branches' `type`; `spacing`; `textDisplayShape.type` inside
    `sectionShape.components`, a plain `z.array` there, 100,257 characters at base). The M1 tip's figures (issues, message length, parse-and-respond time) are recorded beside the
    base's;
  - *wiring (AF-8):* the count is per parse — no module or global counter, never `z.setErrorMap`; one shared definition in
    `shapes.ts` beside the M1-d helper wraps both procedures' inputs; the union sites' isolation is likewise one helper there, used
    at all three sites and declared as `z.ZodType<…>` of the union's output and input as M1-d's helper is, not as `z.ZodUnion`, which
    the object it returns is not (AF-9; no reader of a `ZodUnion` member at `7923a1d`: `git grep -n -E '\.options\b|ZodUnion'` over
    `src` finds UI option lists only); the refusal is thrown as a `ZodError` of the kept issues plus
    the summary, so tRPC's message is the JSON `formatMutationError` parses; the stopping parse is synchronous, and a stopped parse
    leaves no unhandled rejection (a stop inside zod's async parse left three in one run and kept a different first 20 for one body,
    `strip-cap-probe/strip-report-async.txt`; the save schema has no async step at `7923a1d`); two concurrent refusals keep their
    issues apart.
  An input with 20 or fewer issues is refused as M1-a and M1-b state, with no summary issue. The callers' input types (`RouterInputs`
  for both procedures) are those at `7923a1d` (typecheck exit 0; M1-d's `satisfies` clauses kept). Premise runs, all over the
  site's own schema at `7923a1d`: one form meeting every limb — the three union sites parsed outside the caller's error map, then a
  per-call wrapper keeping `code`, `path`, `message`, mounted with the site's own `createTRPCRouter` — counts created = returned on
  all 50 union rows, leaves every issue list, the 288-row abort-form probe and the suite (1913 of 1913, exit 0) as at base, passes
  `pnpm run typecheck`, and refuses steering's bodies with 21 issues in 3,669 to 5,011 characters and QAF-8's in 168 to 512
  (`union-cap-probe/`, `strip-cap-probe/`; ILLUSTRATIVE ONLY, `isolated-union.diff`); the architect's tRPC 11.10 caller run
  (`verification/018/architect-conformance/error-cap-wiring/`); QA's async-path run (same issue order on a complete parse; 21 lines
  rendered). Not run: the wrapper's own TypeScript typing (the typecheck line covers it). The form is the implementer's. The JSON
  view's own browser-side parse is not capped (it builds no server response; its lines are A-1's). Number 20: the editor shows one
  line per issue, and 20 lines fit the error areas of Save As and the new-message modal; the critic and QA may move it with a reason.

**Rollback (code):** `git -C /usr/local/bin/hooks/website revert --no-edit <M1 commits>` on the chain branch, by the implementer
before release; after release, the release rollback below. **Verification:** suite and typecheck exit codes; M1-a–M1-e and M1-i
cases; security re-runs `zodSaveSchema.cost-probe.test.ts` and the within-bound worst case at the tip.

**Re-derivation gate:** M1 changes an API response (the issue list of a refused save). Every downstream milestone not authorised
when M1 ships is marked `PREMISE-STALE`; implementation approval covers M1–M5 together, so at approval the population is empty.

### M2 — Next.js 16.4.6 (H-002)

**Steps (what, not how):** raise `next` and `@next/bundle-analyzer` to `16.4.6` (the lint packages move in M3); regenerate
`pnpm-lock.yaml` with pnpm 10.28.2 (`packageManager`). React, React DOM, their types and Node stay. Raise `highlight.js` to
11.12.0, specifier `^11.12.0` (D-6; reason below). Pin `zod` exactly at `3.22.4` in `package.json` (CR-2, steering's ruling at
block 05:42Z): M1-i's count rests on zod 3.22.4's error map, and `^3.20.6` admits 3.25.76, under which the cap misses issues (the
code reviewer's run, `code-review/018-next-upgrade-save-size-cap-code-review.md`). The importer already resolves 3.22.4 (`pnpm-lock.yaml`
at website `969d92a`, `importers` `zod` `version: 3.22.4`), so only the specifier changes. It lands in its own commit after the
revision-8 fold, with a frozen install, reviewed and verified as usual. In `tsconfig.json`, two keys and nothing else, the end-of-file newline kept
(`verification/018/planning/m2-tsconfig/`, `A-final/tsconfig.diff`):
- `compilerOptions.moduleResolution` `node` → `bundler`. Next 16.4.6 writes it on every build as a "mandatory change" where
  TypeScript is 5 or later and `module` is not CommonJS or AMD (`dist/lib/typescript/writeConfigurationDefaults.js`
  `preferBundlerResolution`, read at 16.4.6 and 16.1.6; the implementer's build log). Committing it keeps the build from rewriting
  the file, locally and on Vercel.
- `ts-node.compilerOptions.moduleResolution` `node`. The `ts-node` block sets `module` `commonjs`, and TypeScript refuses `bundler`
  with it (TS5095), so the architecture record's check for `limits.tsx`
  (`npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"`) and the `lang`, `push-commands` and `backfill-valid`
  scripts would fail to start. Next does not manage this block.

Why `highlight.js` moves (a scope delta under D-6, "you can upgrade any packages to anything deemed useful"; agent-authored, planner,
revision 7): under `bundler`, TypeScript resolves through `exports`, and highlight.js 11.7.0's has no `types` condition, so
`decorator.tsx` and `markdown/rules.tsx` fail with TS7016 and the build exits 1. 11.8.0 is the first release with the condition
(`npm view highlight.js@<v> exports`); 11.12.0 is the current one (2026-08-12). A `paths` entry for the package's types is not a
substitute: Turbopack reads `paths` for runtime imports too, and the build then holds no highlight.js (AF-10, F-21, QAF-10). What the
move changes, run (`m2-tsconfig/hl-compare/`): no language removed (192 → 193), every name or alias 11.7.0 resolved still resolves,
the editor's `_emitter.rootNode` tree still has `children` in 18 of 18 samples and its content differs in 5 (typescript, css,
html, java, diff), and the preview's HTML differs in 4 (the same, less html) — finer or extra token classes (TypeScript object keys,
Java `void` as a type, a diff hunk header; the CSS sample's difference lies past the 300 characters the comparison printed). The
comparison ran in Node; how the differences look is M2-e's walk (AF-11, F-24). No sibling precedent:
preview-image-generator has no Next, no `moduleResolution` and no highlight.js (`tsconfig.json`, `package.json` read).

The two test helpers on Next.js internals (`src/components/__tests__/helpers/linkNavigation.tsx`,
`src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx`) stay as they are unless the suite at 16.4.6
shows otherwise (OQ-2); an edit to the second fires `handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md` (X-11).

**Acceptance criteria:**
- **M2-a (H-002's bar; F-13).** The `next` package's versions in the lockfile are enumerated by the lines matching `^  next@`
  (package and snapshot keys, two spaces, unquoted): at `7923a1d` they are 2 lines, both `next@16.1.6` (`grep -c -E "^  next@"`;
  real member `  next@16.1.6:`; real non-member `  '@next/eslint-plugin-next@16.1.6':`, which the anchor does not match). At the M2
  tip every such line names 16.4.6, and the importer's `next:` entry resolves 16.4.6. Security re-runs `pnpm audit --prod --json`
  and joins it with its dispositions: neither GHSA-q4gf-8mx6-v5v3 nor GHSA-8h8q-6873-q5fj is listed for `next`.
- **M2-b (nothing else moved).** Every pin the lockfile moves is listed in the implementation document with a disposition, from
  `git diff 7923a1d -- pnpm-lock.yaml`: expected movers are `next` and its declared dependencies, `optionalDependencies` included
  (`@next/env`, `@next/swc-*`, `postcss`, `styled-jsx`, `@swc/helpers`, `caniuse-lite`, `baseline-browser-mapping`, and `sharp`
  0.34.5 → 0.35.5 with what it declares: `@img/*`, `@img/colour`, `@emnapi/runtime`, `semver` 7.8.6; `npm view next@16.4.6
  optionalDependencies` names `sharp` `^0.35.5`, 16.1.6's `^0.34.4`); `@next/bundle-analyzer` and its own dependencies; the snapshot
  keys of the six packages that peer on `next` (`next-auth`, `@vercel/analytics`, `@vercel/speed-insights`, `cookies-next`,
  `@trpc/next`, `next-remote-watch`; `awk` over the base lockfile's `snapshots:`), whose own versions do not move; snapshot keys whose
  peer suffix follows `@emnapi/runtime` (`vitest`, `vite`, `rolldown`, `@vitest/mocker`, `@napi-rs/wasm-runtime`,
  `@rolldown/binding-wasm32-wasi`), whose versions do not move (M2-I1, M2-I2); and `highlight.js` 11.7.0 → 11.12.0, which has no
  dependencies. Any other moved version is a finding before code review. A per-name version comparison cannot see a dependency edge
  re-pointed between two versions that both stay in the lockfile (CR-5), so the disposition also compares the production closure
  edge by edge (`verification/018/code-review/m3/prod-edges.py` over `pnpm list --prod --depth Infinity --json`, tip against base),
  and a "no runtime move" claim is stated only from that comparison. `package.json`'s diff touches only the specifiers named in the
  steps (`next`, `@next/bundle-analyzer`, `highlight.js`, and `zod`'s pin); `tsconfig.json`'s diff is exactly the two keys the steps
  name.
- **M2-c (F-7).** In an isolated export with `pnpm install --frozen-lockfile`, no `.env` file and `SKIP_ENV_VALIDATION=1`:
  `next build` exits 0 and leaves `tsconfig.json` as committed (no "mandatory changes" line in the build output); then
  `pnpm run typecheck` (both programs) exits 0; the architecture record's `ts-node` check of `limits.tsx`, transpile-only and typed,
  exits 0, each exit code recorded beside its output; the build output holds highlight.js's runtime — files under `.next/static`
  and under `.next/server` containing `highlightAuto`, and likewise `registerLanguage`, each at least 1 (`grep -rl` into a file,
  then `wc -l`; real member: the base 16.1.6 build, 1 static and 2 server; real non-member: revision 6's `paths` form, 0 and 0,
  `verification/018/architect-conformance/hljs-paths/counts.txt`; form A at 1 and 4, `m2-tsconfig/A-final/counts.txt`); and no
  built chunk calls `getLanguage(` or `highlight(` on `(void 0)` (QA's probe, `verification/018/qa/m2-hljs-resolution/`, 0 at base,
  10 under the `paths` form); the suite exits 0 with every case passing, compared with
  the base by path membership of `testResults` files and per-file case counts. Base readings in the same form: build exit 0,
  typecheck after the build exit 0 (`verification/018/planning/preview-imitation/`), suite 1913 cases in 149 files, exit 0
  (`base-validation/summary.md`).
- **M2-d.** The build's warnings are captured; a deprecation warning for `middleware.ts` is recorded for the architect (X-8). A
  change the release-notes reading did not name, surfacing here, is a finding. One surfaced at implementation and is folded at
  revisions 6 and 7: the mandatory `moduleResolution` rewrite and its consequences (the steps above). A second is recorded for the
  architect beside X-8 (M2-I3): "The Edge Runtime is deprecated. You can use the \"nodejs\" runtime instead", printed for
  `/api/interactions-edge`, the one edge-runtime route; nothing is edited (X-9).
- **M2-e (human-observable; the suite cannot see this: vitest resolves through its own `alias`).** On a local build of the M2 tip,
  a message holding a fenced code block with a language (` ```js `, ` ```ts `, ` ```diff `) renders highlighted, with no error,
  in the editor's text (the decorator) and in the message preview (the `codeBlock` rule). Walked by UAT before release, in the same
  local-build session as M1-g, under the local-build rule (QA's register row B-9). After deploy, UAT takes the same look on hooks.gg
  with the test account, editor and preview: a row of devops's Stage-1 post-deploy handoff, `Owning-Stage: uat`, as M1-h's (QA's
  B-10; F-23). Vercel builds the release itself, so this is the only read of the bundle users get.

**Rollback:** the package step reverts by reverting its commit (`git revert`), lockfile and `tsconfig.json` with it; implementer before release, devops
after. **Re-derivation gate:** M2 changes product behaviour (the framework under every page); same population statement as M1.

### M3 — Lint on ESLint 9, a flat config and `eslint-config-next` 16.4.6 (D-6)

**Value:** the Value Statement's lint clause; its cost RK-5.

**Today** (`7923a1d`): ESLint 8.57.1, a 369-line `.eslintrc.json` and a 9-entry `.eslintignore` (`grep -c .`). Counted by a
comment-stripping parse (`python3 -I`, `//` lines removed before `json.loads`; the file holds five `//` comments, so a strict JSON
parser stops at line 16), matched by the critic's node script: `env` 2, `plugins` 2, `parser`, `parserOptions`, `extends` 5,
`settings` 4 keys, 45 top-level rules; one override with `files`, `extends` 3, `parserOptions` (`ecmaVersion` 2022; `project`
naming both tsconfig files, which makes the type-aware rules run) and 32 rules. The lint script is red (V-1) and nothing runs it
(017 X-12; steering's refutation at 03:25Z).

**Steps (what, not how):**
- `eslint` to the latest 9.x (9.39.5), `@eslint/js` to the same 9.x (10.0.1 today, whose peer is `eslint ^10`; referenced by no
  tracked file). Not ESLint 10: `eslint-plugin-react` 7.37.5, its latest, peers `eslint` no higher than `^9.7` (X-16).
- `eslint-config-next` and `@next/eslint-plugin-next` to 16.4.6; `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`
  5.62 replaced by `typescript-eslint` 8 (a devDependency at `^8.58.0` already, unreferenced); `eslint-plugin-react` to 7.37.5 and
  `eslint-plugin-import` to 2.32.0; `@eslint/eslintrc` added to load the eslintrc-only airbnb and tailwindcss configs.
- `eslint-plugin-n` and `eslint-plugin-promise` removed: no config entry and no source file names them, and they peer ESLint 7–8.
- `.eslintrc.json` and `.eslintignore` replaced by one flat config.

**Premise, run:** a helper's probe (03:3xZ, an isolated export of `7923a1d`) loaded such a config after two forced changes (the
compatibility layer's plugin instances re-pointed at `eslint-config-next`'s; five rules `typescript-eslint` 8 no longer has dropped)
and ran to exit 1 with 833 problems (base 665) (`verification/018/planning/eslint9-flat-probe/`). Its README says the archived
`package.json` already pinned ESLint 9; `git show 7923a1d:package.json` has `~8.57.0`, and the README lists 8 ignore entries where
the file has 9 — so the README does not establish which tree it measured (F-15). The probe's config is a sketch, not a reviewed
form; its figures orient only.

**Acceptance criteria:**
- **M3-a.** At the M3 tip, `pnpm exec eslint . --max-warnings=0` (never with `--fix` as an instrument) exits 0 or 1, never 2, and
  `.eslintrc.json` and `.eslintignore` no longer exist.
- **M3-b (requirement ledger).** Every entry listed under "Today", the override's `parserOptions` included, and each of the 9 ignore
  entries has one row in the implementation document: carried (where, in the flat config) or dispositioned with its reason. The
  five rules `typescript-eslint` 8 removed (`semi`, `no-throw-literal`, `space-before-blocks`, `type-annotation-spacing`,
  `member-delimiter-style`) are rows with dispositions. The `no-restricted-syntax` rule on `next/dynamic` calls is carried.
- **M3-c (differential; F-10).** The new config and the base config run over the same source tree (`7923a1d`'s sources, with only
  M3's lint files and packages changed), each with ESLint's JSON formatter. Two quantities are compared: the set of linted files
  (path membership), and per rule id the finding count. Every difference is a row naming one cause from this class: (1) a rule added
  to or removed from a preset at its new version; (2) a kept rule whose behaviour or default options changed at its plugin's new
  version; (3) a rule removed upstream (M3-b); (4) a different set of linted files, itemised by file; (5) an ESLint 9 default the
  config does not restore (M3-d's accepted members only). The probe's moved ids (`max-len`, `object-curly-newline`,
  `object-property-newline`, `react/function-component-definition`, `@typescript-eslint/prefer-nullish-coalescing`,
  `@typescript-eslint/no-unused-vars`, `@typescript-eslint/no-base-to-string`, among others) are expected under (2) or (4). A
  difference with no cause in the class is a finding before code review.
- **M3-d (ESLint 9 defaults).** The class is the defaults ESLint's v9 migration guide lists as changed; each member is a row: kept at
  the base behaviour by the config, or accepted with its reason (and then a cause-(5) row in M3-c). Members known now: unused
  `eslint-disable` directives are reported by default (base: not reported — kept off); the default linted file patterns (flat
  config lints `*.js`/`*.mjs`/`*.cjs` unless told otherwise — the config names the base's `.ts`/`.tsx`/`.jsx` set); `no-unused-vars`'
  `caughtErrors` default (`"all"` in ESLint 9). An inline directive naming `@typescript-eslint/ban-types` (removed in v8) is edited
  to the rule that replaced it or removed.
- **M3-e.** Lint stays red and unenforced (X-6, X-17); the `lint` script's command line keeps its form.

**Lockfile disposition:** in the M2-b form. **Rollback:** revert M3's commit; implementer before release, devops after. M3 changes
no built JS (`next build` does not lint; refutation, 03:25Z): its lockfile re-pointing adds 4 package-metadata paths (the directory
and `package.json` of `cross-spawn@7.0.6` and `semver@6.3.1`) to five API functions' file traces, and no JS of either package is
traced or bundled (QA's comparison of `.nft.json` traces against two builds of the parent, `qa/018-next-upgrade-save-size-cap-m3-qa.md`
QAF-11 at `e0d8b95`). M3 triggers no re-derivation gate.

### M4 — Behaviour the record ties to Next 16.1.6, re-verified at 16.4.6

**Class:** enumerated by `git grep -n -i -E "next(\.js)? ?16(\.1\.6)?|16\.1\.6" -- architecture planning/closed handoff research`
in agent-output (04:0xZ; 22 lines outside this chain's own documents, plus `004`'s two). Every hit is a row below or a disposition:

| # | Behaviour | Record | What must hold at 16.4.6 | Instrument and runner |
|---|---|---|---|---|
| R1 | Leave-page guard: a link click with unsaved edits on the editor asks; Cancel keeps the edits; confirm navigates | 017 AN-2, D-12, M4 human-observable form | as stated (`<Link onNavigate>` `preventDefault`) | existing tests (QA names them) + UAT walk on the local build |
| R2 | `StyledLink`'s plain-click interception of a link to another site, from `onClick` | 017 M4-a, rulings 2026-11-19T02:43Z | as stated | existing tests + UAT walk |
| R3 | Stated limit X-14: `router.push`/`replace`, `redirect()` and back/forward cannot be stopped | 017 X-14, AN-2 | recorded either way; no guard is built here (X-20) | UAT walk: on the editor with unsaved edits, press the browser's back; record whether a confirmation appears |
| R5 | `loading: () => null` on the six `next/dynamic` wrappers (`src/components/dynamics/*`) stops Suspense propagation: the editor shell stays rendered while a lazily loaded child is pending | 004 Assumptions 1, 5 | as stated | UAT walk on the local build with the network throttled; jsdom is not admitted as the instrument unless its Suspense is shown to match the browser (Test Conventions, environment fidelity) |
| R6 | A client navigation `/message/f/A` → `/message/f/B` mounts B's page and modal fresh (`layout-router.js`, `createRouterCacheKey`) | 015 X-22 (plan row 1175; architecture findings "X-22 … is not a defect") | as stated | read of `next` 16.4.6's `layout-router.js` and `createRouterCacheKey` by the implementer at M2, recorded in its document; UAT walk if the read differs |

Dispositions of the other hits: `.render.preload` (004 Assumption 2) — no consumer at `7923a1d` (QAF-4: `git grep -n preload` over
non-test `src`), so not re-verified; 015's "M3 premise question" (the App Router's React root is `document`; plan row 1214) — its
row is marked "Superseded at rev 15" and 015 removed its M3 as not a defect (D30, plan row 100), so no fix or test at `7923a1d`
rests on it (QAF-6); 017 AN-3 and X-13 — X-15; 014 D13 (a DOM harness under Next 16) — the suite at M2-c; the
master record's "Next.js 16 hybrid" and the diagram — descriptive; the P-1 handoff's `sharp` note — devops's, X-12; 015's dev-overlay
"unread" — no behaviour rests on it. 017's X-15 (`beforeunload`) ties to no Next.js version and is not in the class (revision 1's R4).

**Acceptance criteria:**
- **M4-a.** Each row's instrument passes at the M3 tip; UAT's walks run before M5, on a local build, signed in with the test account
  (`browser-walker`), captures under `verification/018/uat/local/`.
- **M4-b.** Where a behaviour no longer holds, the regression is fixed inside M2 only if the fix is confined to the surface 015, 017 or
  004 built; any other remedy is a milestone-level scope delta to the owner before code continues.
- **M4-c.** R3's and R6's results are written into the UAT and implementation documents and carried to the architect.
**No code is expected.** Rollback: none.

### M5 — The upgraded site seen on a release-check preview before release (D-3, D-8)

**Premise:** the runs under OQ-5 (a plain push cannot build a preview; with the override, everything but `/api/auth/*` serves).
After QA Phase 2 passes M1–M4:
- **M5-a.** Devops pushes a release-check branch whose head is the chain tip plus one commit changing only `vercel.json`
  (`buildCommand` `SKIP_ENV_VALIDATION=1 next build`), and reads the deployment `READY` at that head through `vercel api`. The tree
  identity is shown by `git diff --name-only <tip> <head>` printing `vercel.json` alone. The chain tip never carries that commit;
  the branch is deleted at release.
- **M5-b (public pages; F-4).** The set is the build's route table at the M3 tip and `next.config.js` `redirects()`, each member with
  its expected answer from the code and the preview imitation: `/`, `/legal/privacy`, `/legal/terms`, `/preview`, `/message`,
  `/message/m/0/edit`, `/message/m/0/send` answer 200 and render (a visitor with no session cookie is sent to the signed-out editor,
  `Redirects/Server.tsx`); `/support` 308 to the Discord invite; `/message/m/<n>` 307 to `/message/m/<n>/edit`. A route added to the
  table by 16.4.6 joins the set.
- **M5-c (images).** The landing page's local image and one `/_next/image` request for a `cdn.discordapp.com` avatar answer 200 with
  an image content type.
- **M5-d (sign-in redirect).** Walked on the local build at M4, not the preview: pressing sign-in reaches Discord's authorise page;
  UAT stops there (D-8). On the preview `/api/auth/*` answers 500 (OQ-5's run), which UAT records and does not count as a failure.
- **M5-e (H-002 human-observable form).** The preview's page script carries `window.next={version:"16.4.6"` (instrument read
  non-zero on production for 16.1.6: `verification/018/planning/prod-next-version-pre.txt`). After release the same read on hooks.gg
  is H-002's post-deploy observable, run by devops after the push (a public GET, no session).
Captures go to `verification/018/uat/preview/` (screenshots untracked, his ruling). **Rollback:** none (a preview).

### Release (devops)

Devops Stage 1, then the release ask (D-5), then `release-move.js website master <tip> --qa-record <QA Phase 3 record>`. **Rollback
of the release:** devops runs `git -C /usr/local/bin/hooks/website revert --no-edit <base>..<tip>` and moves `master` to the revert
by `release-move.js` on his word; Vercel's "promote previous deployment" is his, from the dashboard. Post-deploy rows: M1-h and M2-e
(UAT's, in devops's Stage-1 handoff) and M5-e (devops). Release order against open carriers: P-1 and 017's B7R/B10R read production; devops sequences (X-12).

## Testing Strategy

- Standard: `agent-output/CLAUDE.md` "Test Conventions (`website`)" — vitest, placement beside the code under `__tests__/`, names
  free of ID tokens, axioms A–E; `pnpm run typecheck`, never bare `tsc`, after a build has generated `next-env.d.ts`; exit code
  recorded beside every count.
- M1: pure-logic tests over the 21 pairs through the procedures' real inputs (Node environment); expected values are literals
  (bounds, issue counts), never the schema's output; `null` and nested over-limit elements are members (QAF-1). The composer (M1-e)
  as a hook test. M1-i's worst-case body is steering's within-bound input; its time figure is a measurement recorded beside the
  base's, outside the standing suite's pass/fail.
- M2: build, typecheck and suite in an isolated export in M2-c's form; lockfile checks by `grep -c` with the anchored predicate.
- M3: both lint configs over the same source tree with ESLint's JSON formatter, tallied per rule id and per linted file; never `--fix`.
- M4: existing tests, one source read (R6) and UAT walks on a local build, signed in.
- M5: UAT walk of the preview, anonymous; the sign-in redirect on the local build.
- Hosts: this box for every run; Vercel read through `vercel api` and a browser. The chain changes no tool a gate uses as its
  instrument.

## Validation

- **V-1** (`verification/018/planning/base-validation/`, a helper, 03:0xZ–03:1xZ): base `7923a1d`, isolated export — install exit
  0; suite 1913/1913, 149 files, exit 0; lint exit 1 (300 errors, 365 warnings; X-6).
- **V-2** (`verification/018/planning/preview-imitation/`, a helper, 03:5xZ): the same base with no `.env` and
  `SKIP_ENV_VALIDATION=1` — `next build` exit 0; `pnpm run typecheck` after the build exit 0 (before the build, exit 2 on one TS2307
  for `~/assets/img/product_image.png`, because the gitignored `next-env.d.ts` is generated by the build).
- **V-3:** the abort form (OQ-3), the internals (OQ-2), the preview imitation (OQ-5) and the stopping parse (M1-i) — runs cited
  there.

## Risks

- **RK-1** A navigation change in 16.3.0 (history push fix; scroll handler made default) alters a 017 guard. Falsifier: M4's walks.
- **RK-2** Vercel's build at 16.4.6 differs from the local build. Falsifier: M5-a.
- **RK-3** A stored message carries a list above a new bound and cannot be re-saved with Save (M1-f, X-18). No production read is
  open to agents to count them. Falsifier: a user report of the reason-less toast on a message he did not just paste.
- **RK-4** The release lands inside P-1's or 017's post-deploy windows. Falsifier: devops's sequencing note in its Stage 1.
- **RK-5** npm marks `eslint` 9.39.5 deprecated ("This version is no longer supported", the probe's `add-log.txt`), and
  `eslint-config-airbnb` 19.0.4 peers ESLint 8 only, so the lint stack sits on an unsupported major behind a compatibility layer.
  Falsifier: a lint dependency that fails to install or load at a later bump (X-16).
- **RK-6 (standing prediction, critique pass 1's class).** Class: a criterion, a closed question or a decision row says what code, a
  build or a host does, and no read at the receiving end supports it. Domain: OQ-2 to OQ-5; M1-e to M1-h; M2-c, M2-d; M3's "Premise,
  run"; M4 R1–R6; M5-a to M5-e; the release rollback. Falsifier: a later pass or gate finding a sentence there that a read
  contradicts. Record per review pass: pass 1 — members found (F-1, F-2, F-3, F-4, F-8), folded at revision 2 by runs or reads cited
  at each; pass 2 — none (critique `409b52c`); QA's re-key of revision 2 — one (QAF-6, R7 resting on a superseded 015 row), folded
  at revision 3. The domain now also holds M1-i. Critique pass 3 — one (F-17, M1-i's premise run over a bare array), and the
  architect's read of revision 3 — none (AF-8 asks for an unstated constraint, not a contradicted one); QA's re-key of revision 3 —
  one (QAF-8, the 16 KB limb resting on a count cap). Both folded at revision 4 by runs over the site's own schema
  (`union-cap-probe/`, `strip-cap-probe/`), which the critic's property for F-17's class asks of every cited premise run. Critique cycle 2 pass 1 — one (F-21: revision 6 said the `paths` entry left the runtime package unchanged; a build
  showed highlight.js absent; also AF-10, QAF-10); folded at revision 7, whose M2-c reads the built output.
- **RK-7 (prediction, F-1).** "A push whose tree has no build-command override does not reach READY in the Preview environment."
  Falsifier: such a push reaching READY.

## Exclusions

| # | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | zod 4 (the advisory's patched major) | His option chose the save-size cap (block 02:53Z, D-4) | Stated limit; security's M-001 disposition |
| X-2 | The other 39 `z.string()` server lines | One issue per string, not per element; the 1 MB body limit bounds them (block 02:53Z) | Stated limit |
| X-3 | `interactions-server.ts` (body read with no schema) | Token-gated, not client input (block 02:53Z) | Stated limit |
| X-4 | project-utils declaring `prisma-kysely` at runtime (audit I-2); preview-image-generator's `@next/eslint-plugin-next ^13.4.12` | Other repositories (block 02:53Z) | Security's audit I-2; stated limit |
| X-5 | `x-pathname` trusted for a redirect (I-5); Vercel's cache keeping RSC apart from HTML (A-2) | Not in his selection (block 02:53Z) | Security's audit I-5, A-2 |
| X-6 | Fixing the lint script's findings (300 errors and 365 warnings at the base; the new config's own count after M3) | Red before the chain; 017 X-11/X-12; M3 moves the setup, not the findings (M3-c) | Architecture Problem Areas row (017 M7) |
| X-7 | The H-001 leftovers: `middleware.ts`'s unread `x-query-params` write; CR-1's commented `sanitizeHtml` in `JsonModalBody.tsx` | His 03:08Z answer declined the option adding them | Rulings blocks 02:11Z, 02:18Z |
| X-8 | Renaming `middleware.ts` to `proxy.ts` | Deprecated, still honoured at 16.4.6 (release notes, helper's reading) | M2-d records the warning; architect's Problem Area (AF-6) |
| X-9 | A lower body limit on the tRPC route (AD-3) | Does not meet M-001's bar alone: within any limit an array still yields one issue per element; a value needs the largest legitimate save, which no agent can read from production | Stated limit |
| X-10 | `recentMessageIds` elements accepting non-int8 strings | Pre-existing, self-only; M1 edits the site, which fires the handoff's trigger | `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` (Owning-Stage steering) |
| X-11 | Order-independence of the first-load test | Only owed if M2 edits `Child.portal-inside-open-dialog.test.tsx` (not expected, OQ-2) | `handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md` |
| X-12 | Sequencing the release against P-1 and 017's post-deploy reads | Devops's act | Devops Stage 1 (RK-4) |
| X-13 | `allowed_mentions.parse` admitting `'user'` and `'here'`, which Discord's page does not list | Pre-existing element domain; M1 bounds the list's length only, from the same tuple (S6) | Architect's Problem Area (AF-6) |
| X-14 | No server check of the 40-component total across nesting | W-2 lets invalid drafts save; the within-bound cost is capped by M1-i | Stated limit |
| X-15 | 017's `after()` finding (AN-3) and `pageExtensions` reading (X-13), both "at 16.1.6" | Neither design depends on the 16.1.6 behaviour continuing | Stated limit |
| X-16 | ESLint 10 | `eslint-plugin-react` 7.37.5, its latest, peers `eslint` no higher than `^9.7` (`npm view`) | RK-5 |
| X-17 | Enforcing lint (a hook, a workflow or a build step) | Not in his selection; lint is red (X-6) | 017 X-12's carrier (Architecture Problem Areas) |
| X-18 | The editor's Save keeps its fixed toast, with no reason, for a stored message over a new bound | His D-10; the reason shows in the JSON view and on Save As (M1-f); the population is pasted-JSON messages over Discord's own limits (RK-3) | Stated limit (D-10) |
| X-20 | A guard for navigations made by code, `redirect()` or back/forward | 017 X-14's stated limit; M4 R3 only records whether 16.4.6 changes it | Stated limit; the architect's record (M4-c) |

## Open handoffs whose trigger names this chain's surfaces

Enumerated by reading every open handoff's frontmatter under `handoff/`, 03:1xZ (the record has no `open-handoff-trigger-sweep.py`).

| Handoff | Disposition |
|---|---|
| `update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` | Fires at M1 (edits `updatePreferences`); X-10, steering routes |
| `anchored-popover-first-load-test-is-order-dependent-2026-11-18.md` | Fires only if M2 edits the file; X-11 |
| `mutant-equivalence-by-argument-unverified-2026-11-19.md` | Fires only if the diff touches `StyledLink.tsx` and its siblings; QA's |
| `bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md`; `qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` | QA's at Phase 1 (fired; QA recorded it) |
| `website-api-handler-hardening-2026-10-10.md` | Fires only if a file under `src/pages/api/` is edited; none is planned (X-9) |
| `message-page-header-decode-post-deploy-2026-11-20.md`; `017-existing-items-backlog-post-deploy-2026-11-19.md` | Devops's; X-12 |

Precedent read on the surfaces this plan changes: 012 (embed caps), 013 D32/D47 (issues shown to users, one line per issue — A-1),
016 D-10 (a bound the schema does not refuse is one-sided by his selection — A-4; M1 adds no bound on that surface), 015 and 017
(navigation; M4), 004 (`next/dynamic`; M4), 017 M5-0 (the preview record; OQ-5).

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| F-17 MEDIUM: M1-i's count (issues created) and M1-b's (issues returned) differ where a plain `z.union` fails; stated limit SL-1 until folded | `critiques/018-next-upgrade-save-size-cap-critique.md` pass 3 (`f209354`) | Folded at revision 4: M1-i *the unit*, M1-b |
| F-18 LOW: M1-a not stated over the cap | same, pass 3 (`f209354`) | Folded at revision 4: M1-a |
| AF-8 MEDIUM (required before implementation approval): M1-i states its wiring's four constraints | `architecture/018-next-upgrade-save-size-cap-architecture-findings.md` (`9a58650`) | Folded at revision 4: M1-i *wiring* |
| AF-9 LOW: the union isolation is one shared helper in `shapes.ts` beside the other two, used at all three sites, declared as `z.ZodType<…>` of the union's input and output (not `z.ZodUnion<T>`) | same, revision 4 read (`29b6ff8`) | Folded at revision 5: M1-i *wiring* |
| F-19 LOW: M1-i's unit is an issue the parse's own uncapped result would carry; `7923a1d` stays M1-b's comparison only | `critiques/018-next-upgrade-save-size-cap-critique.md` pass 4 (`f13a0f3`) | Folded at revision 5: M1-i *the unit* |
| F-20 LOW: the Planner batch's closing line names the revision-3 re-key, now committed; M1-i's "unchanged" wording trips the record check's OUT-OF-SCOPE warning | same, pass 4 (`f13a0f3`) | Folded at revision 5: M1-i *no huge error*; the closing line below |
| QAF-9 LOW: M1-i's long-value population omits `textDisplayShape.type` inside `sectionShape.components` | `qa/018-next-upgrade-save-size-cap-qa.md` (`413798f`) | Folded at revision 5: M1-i *no huge error* |
| AF-11 LOW: M2's "Why highlight.js moves" names the 4 preview-HTML differences but not the 5 editor-tree ones (typescript, css, html, java, diff; `hl-compare/output.txt` "tree differ 5"); "keeps its shape" checks only that `rootNode.children` is an array | `architecture/018-next-upgrade-save-size-cap-architecture-findings.md` (`60d0a11`) | Folded at revision 8: M2, "Why `highlight.js` moves" |
| F-23 MEDIUM: M2-e's after-deploy look on hooks.gg names no runner and is not among § M5's post-deploy rows; stated limit SL-2 until folded | `critiques/018-next-upgrade-save-size-cap-critique.md` cycle 2 pass 2 (`15988b6`) | Folded at revision 8: M2-e, § Release's post-deploy rows; SL-2 retired |
| F-24 LOW: duplicates AF-11 (the editor-tree count beside the HTML count) | same (`15988b6`) | Folded at revision 8, with AF-11 |
| M2-I1 LOW (planner's severity; the source says only "below HIGH"): M2-b's parenthetical list of `next`'s declared dependencies omits `sharp` 0.34.5 → 0.35.5 and what it declares (`@img/*`, `@img/colour`, `@emnapi/runtime`, `semver` 7.8.6). `next@16.4.6`'s `optionalDependencies` names `sharp` `^0.35.5` and 16.1.6's `^0.34.4` (`npm view`), so these fall within M2-b's class; the implementer dispositioned each pin | `implementation/018-next-upgrade-save-size-cap-m2-implementation.md` (`b4b34b6`, Outstanding Items), relayed by steering under `steering/018-rulings.md` block 2026-11-20T05:26Z (M2 capped) | Folded at revision 8: M2-b |
| M2-I2 LOW: M2-b omits the snapshot-key movers `vitest`, `vite`, `rolldown`, `@vitest/mocker`, `@napi-rs/wasm-runtime`, `@rolldown/binding-wasm32-wasi`, whose peer suffix follows `@emnapi/runtime`; no version of theirs moves | same | Folded at revision 8: M2-b |
| M2-I3 LOW: a new build warning at 16.4.6, "The Edge Runtime is deprecated", for `/api/interactions-edge` (M2-d); no edit, X-9 | same | Folded at revision 8: M2-d |
| CR-2 LOW: `zod` is specified `^3.20.6`, which admits 3.25.76, under which M1-i's count misses issues (the reviewer's run: 1,600 for a 40×40 invalid-accessory save); M1-i rests on 3.22.4's error-map behaviour. M2's steps are to name `zod` pinned exactly at 3.22.4 | `code-review/018-next-upgrade-save-size-cap-code-review.md` (`55fe778`); ruling `steering/018-rulings.md` block 2026-11-20T05:42Z (`f391462`, option A) | Folded at revision 8: M2's steps and M2-b; the implementer pins next |
| CR-5 LOW: M2-b's disposition, run as per-name version sets, cannot see a dependency edge re-pointed between two versions that both stay in the lockfile. The reviewer found M2's 144 changed edges all within M2-b's classes; at M3, three production-closure edges under `project-utils` > `prisma-kysely`, generator-only by its read. Proposed: the disposition adds an edge-level comparison of the production closure (`verification/018/code-review/m3/prod-edges.py` over `pnpm list --prod --depth Infinity --json`), and a "no runtime move" claim rests on it | `code-review/018-next-upgrade-save-size-cap-code-review.md` Round 3 (`a05fb21`) | Folded at revision 8: M2-b (the form M3 also uses) |
| QAF-11 LOW: M3's rollback line says lint "affects no build or runtime output"; its lockfile re-pointing adds 4 package-metadata paths to five API functions' traces, no JS | `qa/018-next-upgrade-save-size-cap-m3-qa.md` (`e0d8b95`), relayed by steering block 2026-11-20T06:06Z | Folded at revision 8: M3's rollback line |
| M2-I4 LOW: `paracord` is specified `github:mr-tech/paracord` with no commit; the lockfile pins it at `3f20308` (0.0.5) at base `7923a1d` and at tip `d1bb9b0` alike, and regenerating the lockfile re-resolves it to `1b7cadb` (0.0.9), also moving a second zod tree under `zod-validation-error` (the implementer's run, discarded) | `implementation/018-next-upgrade-save-size-cap-m2-implementation.md` (`7c76319`), relayed by steering under the M2 cap | Stated limit: pre-existing, and the chain does not move it. The release installs from the committed lockfile; no stage regenerates it. Devops Stage 1 note: confirm the release tip's lockfile still names `paracord` at `3f20308`. Pinning `paracord` by commit is outside H-002 |
| CR-7 INFO (pre-existing): widens M2-I4 to `project-utils`, specified `github:hooks-gg/project-utils#master` and locked at `749606d` at base and tip alike; a regeneration can move it too. Frozen installs are unaffected | `code-review/018-next-upgrade-save-size-cap-code-review.md` Round 1 sub-entry 2 (`7804862`) | With M2-I4: stated limit; the devops Stage 1 note covers both — the release tip's lockfile still names `paracord` at `3f20308` and `project-utils` at `749606d`. Pinning either by commit (the `pinned-dep-shipping` method) is outside H-002 |

QA Phase 1 before implementation: yes (stage set, block 02:53Z); its re-key of each revision is recorded in § Reading Order, Owed
re-verdicts.

## Resumption State

Closed at devops Stage 1 (2026-11-20T07:12Z); nothing resumes from this document.
