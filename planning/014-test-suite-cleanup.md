---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Approved
Status-Detail: Revision 8 is the approved plan (cycle-2 critique closed `c557300`; M4b/M4a may open on its lists); implementer-hooks-014 executing from M0. M2 cleared by analysis `50f053a` (D13 reopening class not met); QA Phase 1 in progress (qa-hooks-14); implementer spawns on Phase 1 landing (D16). M2 (DOM harness) is an owner-authorised scope delta and carries a REQUIRED analysis (analyst-014) before its implementation; every other milestone is implementable on critic approval.
Revision: 8
Target Release: website `master` moved to the chain-014 merge SHA (the package carries no version artefact); `agent-output` moves alongside
Epic Alignment: none registered — the owner-approved coordination plan `/home/dev/.claude/plans/we-recently-changed-the-wobbly-sparrow.md` is the source of the effort's outcome
Lane: standard (agent-output/README.md carries no small-lane section — recorded absence, not a judgement)
Architectural surface: none — test infrastructure and a conventions document only; no product layer, contract or core path changes
Owning-Stage: implementer
---

# Plan 014 — Hooks test-suite cleanup (pilot)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-08-27 | R-3 | planner-hooks-014 | Recorded: cycle-2 critique closed at pass 2, APPROVE, `critiques/closed/014-test-suite-cleanup-cycle2-critique.md` (`c557300`); rev 8 is the approved plan. Scope delta: none — registration only. |
| 2026-08-27 | 8 | planner-hooks-014 | QA-1 (`qa/014-test-suite-cleanup-qa.md` `6bf43c8`): rev 7 left row 13 in both M4a and M4b and made "row 15 is M3 + M4c only" false. Row 13 removed from M4a (it is M4b-only: oracle repair then rename); rows 14 and 15 named as the M4b→M4c exceptions. Same defect as critique cycle 2 M-13/M-14 (`d2bc424`); L-12 applied (literal branch alone for rows 13, 15); partition restated in M4b. Scope delta: none. |
| 2026-08-27 | 7 | planner-hooks-014 | Consumes QA Phase 1 (`qa/014-test-suite-cleanup-qa.md`, `bd5ddfd`): M0 reconciles files by `testResults[].name` membership against the `find` list (never `numTotalTestSuites`, which counts describes too); AC2's key is the pair (file path, `fullName`); M0 step 3 pre-closed by QA's one-file probe, re-confirmed on the full run; M4b's oracle-repair set is the plan's four rows plus QA's enumerated residue (rows 13, 15 at Phase 1). Scope delta: none — instruments and the residue's enumeration only. |
| 2026-08-27 | R-2 | planner-hooks-014 | Recorded: critique closed at pass 4, APPROVE, `critiques/closed/014-test-suite-cleanup-critique.md` (`4b7f15e`); rev 6 is the approved plan. QA Phase 1 landed (`qa/014-test-suite-cleanup-qa.md`). implementer-hooks-014 briefed; Owning-Stage → implementer. Scope delta: none — registration only. |
| 2026-08-27 | 6 | planner-hooks-014 | Critic pass 3 (`eff80a5`, APPROVE stands): exit-code observable made plan-wide (M-11); Validation instrument is `pnpm run typecheck` (M-12); D13 row carries the S4 consequence (L-10); `DiscordMessageEditor` added to M4c residue (L-11); environment-fidelity convention added to M1's doc content. D17 registered (steering contact rule). Scope delta: none. |
| 2026-08-27 | 5 | planner-hooks-014 | Consumes `analysis/014-test-suite-cleanup-analysis.md` (`50f053a`): M2 fixed as jsdom via `test.projects`, `.test.tsx` admitted, forward step `pnpm add -D jsdom`; M2 acceptance adds the process exit code; **rev 3's install-site paragraph was wrong (npm/`npm ci` against a pnpm tree) — planner's error, replaced by the analysis's record**; helpers re-sited to `src/**/__tests__/helpers/` (S5); M4c target set widened (S1), EmojiPicker named as residue (S2), row 45 convert→delete (S4), tRPC mock kept out of the standard (S3). Scope delta: no milestone change; one disposition moved (row 45) and M4c's target set widened. |
| 2026-08-27 | R-1 | planner-hooks-014 | Registration: D16 (QA first; implementer after Phase 1). Scope delta: none — registration only. |
| 2026-08-27 | 4 | planner-hooks-014 | Critique pass 2 APPROVE (`265b383`). Lows L-7..L-9 corrected: ID tokens stripped from doc-bound text; ownership exception names row 14 only; AC7 residue names the class not QA's instrument. Status → Approved. Scope delta: none. |
| 2026-08-26 | 3 | planner-hooks-014 | Answers critique cycle 1 (`critiques/014-test-suite-cleanup-critique.md`, `3fba6de`): M-1..M-10 and L-1..L-6 each corrected by rewriting the rubric, plan, AC and Risks sections — predicate forms, domains and residue; evergreen doc vs chain rows; fixed milestone sequence; M3/M5 instruments; AC2 identity key; AC7 holder = QA; rows 14/20/22 → H5 partial; rename all five (Q1); scoped CR on M2 only (Q2); POC install site (Q3). Scope delta: none. |
| 2026-08-26 | 2 | planner-hooks-014 | D14 registered (scope confirmed). D15 amends D6: M1's canonical file becomes `agent-output/CLAUDE.md`, symlinked at `/usr/local/bin/hooks/CLAUDE.md`; M1 OPEN QUESTION closed; rollback for M1 rewritten. Scope delta: none beyond rev 1's. |
| 2026-08-26 | 1 | planner-014 | Created. Value statement and mint approved by the owner (relayed by steering-test-cleanup). Registers rulings D1–D13. Rubric amended with classes H4–H9 for the inventory's eight unclassified files. Scope delta vs the coordination plan: **M2 adds a DOM test harness (D13)** — devDependency + vitest config — where the coordination plan had delete-or-convert on an analyst verdict. |

## Value Statement and Business Objective

As a future implementer or planner working in the Hooks workspace, I want the website test suite audited against a written Test Conventions standard — junk classes dispositioned with per-deletion proof that no coverage was lost, and the standard living in `/usr/local/bin/hooks/CLAUDE.md` — so that the next chain copies a clean suite and cites the standard instead of the memorial/source-text/ID-named patterns the suite currently teaches.

Owner-approved verbatim 2026-08-26 (D12).

## Objective and known context

- Workspace: `/usr/local/bin/hooks` = four sibling repos (`website`, `project-utils`, `preview-image-generator`, `agent-output`). Only `website` has tests: vitest ^4.1.2, `include: ['src/**/*.test.ts']`, `environment: 'node'`, 48 files / 570 static `it(`/`test(` sites (inventory, `grep -cE`, 2026-08-26, at `website` `a74b9e2`). **No suite has been run — no count in this plan is a passing count until M0 captures one.**
- Source of truth for classification: `agent-output/analysis/test-inventory-2026-08-26.md` (ID-less researcher document; cited, not altered). Its rows are the input class for every criterion below.
- Rules in force at the diff: qa.md "Regression-Test Authorship" (V-28), code-reviewer test-only diffs (V-27), implementer pattern ladder (V-22). None covers auditing existing tests; this chain's retrospective carries that to pi (D7).
- No CLAUDE.md exists anywhere under `/usr/local/bin/hooks` (inventory, `find`). `architecture/website.md` carries nothing on tests — recorded absence; no owner questions arise from it because no invariant it names is touched.
- `website/package.json` has no `version` field and no CHANGELOG exists → no release-artifact milestone.
- No DOM harness installed (no jsdom / happy-dom / testing-library in `package.json`; D28 tree fact re-verified 2026-08-26 at `a74b9e2`).

## Decisions Register

Route for every row unless stated: owner selection prompt in session steering-test-cleanup, relayed to planner-014 by steering-test-cleanup, 2026-08-26.

| # | Decision (every operative clause) | Owner's words / route | Reopens on |
|---|---|---|---|
| D1 | Hooks is the pilot; Statbot follows. | Selection prompt (relayed). | Owner withdrawal only. |
| D2 | A test pinning a known-unfixed bug: delete the pin; log the bug as a handoff in `agent-output/handoff/`. No bug fixes in this chain. | Selection prompt (relayed). | Owner withdrawal only. Consequence: every J1/J2 row in the disposition table names its handoff path. |
| D3 | CI wiring is out of scope. | Selection prompt (relayed). | Owner withdrawal only. |
| D4 | Shared helper layer: the planner decides per package/family, with a cost line each way. | Selection prompt (relayed). | Owner withdrawal only. Consumed in M3. |
| D5 | Statbot shape — not this chain. Registered so the inheritance is visible. | Selection prompt (relayed). | n/a here. |
| D6 | The Hooks conventions doc is a new `CLAUDE.md` at the workspace root, four-repo map + Test Conventions only — **home amended by D15**. | Selection prompt (relayed). | Owner withdrawal only. |
| D7 | The "audit existing tests" rule reaches agent definitions via this chain's retrospective → pi, not by definition edits in-chain. | Selection prompt (relayed). | Owner withdrawal only. |
| D8 | `shapes-v2.test.ts` case `accepts text display with empty content (owner ruling 2026-08-25, D34)` is deleted. | Owner, verbatim: "Delete it — the handoff supersedes D34." (relayed). | Owner withdrawal only. Consequence: the case is removed, not converted; the open handoff `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` is the surviving record and this chain does not touch it. |
| D9 | Owner observations made against in-flight branch revisions (the five `013-owner-*-2026-08-25` files) are intra-chain. Escaped provenance = a release or incident artefact only. | Owner, verbatim: "No — only releases/incidents count; treat as intra-chain." (relayed). | Owner withdrawal only. Consequence: axiom (B) below is tightened to this wording; the five files are spec-form and dispositioned under H1/H2. |
| D10 | All other agents are spawned by the owner; this planner spawns no subagents. | Owner, verbatim: "all other agents are to be spawned by me for efficiency." (relayed). | Owner withdrawal only. |
| D11 | Stages talk directly; steering receives gate state only. | Owner, verbatim: "instruct agents to talk directly with eachother as it makes sense to... I do not believe Steering needs to be reported to for everything." (relayed). | Owner withdrawal only. |
| D12 | Value statement approved as written; chain 014 minted. | Selection "Yes — mint 014 and plan under that value statement" (relayed). | n/a. |
| D14 | The six-milestone scope (M0 baseline, M1 CLAUDE.md, M2 harness, M3 helpers, M4a/b/c, M5 sweep) is confirmed. | Selection "Confirm the 6-milestone scope" (relayed by steering-test-cleanup, 2026-08-26). | Owner withdrawal only. |
| D15 | `CLAUDE.md` is canonical at `agent-output/CLAUDE.md` and symlinked at `/usr/local/bin/hooks/CLAUDE.md`; the symlink itself is unversioned. | Selection "Canonical in hooks/agent-output/CLAUDE.md, symlinked at /usr/local/bin/hooks/CLAUDE.md"; option text as put by steering: "Versioned in the record repo; the workspace path still auto-loads via the symlink. Symlink itself is unversioned." (relayed, 2026-08-26). | Owner withdrawal only. Consequence: closes M1's OPEN QUESTION; amends D6. |
| D16 | QA Phase 1 runs first; the implementer is spawned only after the Phase 1 document lands. | Owner, verbatim: "QA first only; implementer after Phase 1 lands." — selection prompt in steering-test-cleanup, relayed, 2026-08-27. | Owner withdrawal only. |
| D17 | For chain 014, a stage messages steering-test-cleanup only for (a) an item that needs the owner — a block, an OPEN QUESTION, a scope delta that adds or reshapes a milestone — or (b) a cue that the next stage needs spawning. Status, revisions, pass/cycle outcomes and "nothing for the owner" stay in the documents and go to the consuming stage. | Owner: "Do both" on steering's proposal, wording steering's (agent-authored, author steering-test-cleanup); relayed 2026-08-27. | Owner withdrawal only. |
| D13 | A DOM test harness is authorised as a declared scope delta: new devDependency + vitest environment change; source-text tests over `.tsx` are converted to behavioural tests instead of deleted; an analyst determines the harness shape. | Owner, verbatim: "Which makes more sense to do in the long-term? I'm leaning towards 2, authorize." — option 2 as put to him by steering: "Authorise a DOM harness as a declared scope delta — new devDependency + vitest environment change; the analyst then needed — you'd spawn it. Converts those files to behavioural tests instead of deleting." (relayed). | Analyst finding that no harness can mount the target components under this toolchain (Next 16 / React 19 / vitest 4) without production-code change — then M2 reverts to delete-with-Outstanding-Items and the owner is told. **Class tested 2026-08-27 (analysis `50f053a`): not met.** Consequence: row 45 (`plan-004-lazy-loading`) still takes H1's delete branch — its subject is unobservable by any mount, which is not this class. |

Standing constraint inherited from chain 012/013, restated: **no agent sends a live Discord POST** (012 D14) — irrelevant to test work here except that no converted test may hit the network.

## Assumptions

1. The suite at `a74b9e2` passes. Unverified; M0 makes it a fact or a finding before anything is touched.
2. The `vi.mock('~/env.mjs')` idiom (36/48 files) is sufficient for module-level imports; the live question for components is reachability under a DOM environment — the analysis (M2) settles it.
3. The static count 570 is a floor; the executed count differs by `it.each` expansion. Both instruments are recorded in the conventions doc as measuring different things.

## Rubric as amended (M1 carries the evergreen standard; chain-application rows stay here)

**Axioms.**
(A) A test is evidence only if it has been seen to fail against the defect it names — recorded once, in the disposition table, from a local, restored mutation.
(B) A bug-form test is earned only by an escaped defect: an artefact that is a **release or incident record** — an incident/handoff dated before the fix commit, a user report, or a release that shipped the defect. Owner observations against unreleased branch work, and any review/QA finding ID, are intra-chain and do not qualify. Ambiguous → spec-form.
(C) Test and file names name the surface and behaviour — never a chain, milestone, ticket, agent, date or person. Hooks form: `__tests__/<module>.<behaviour>.test.ts[x]`, `<module>` = the production module's basename (hyphens admitted: `interactions-edge`). Provenance is one line `// escaped: <artefact path>`.
(D) A test whose expected value is a known-wrong result is a pin, not a test.
(E) A test's expected value is independent of the code under test: never computed by the formula under test, never read from a production module's text, never supplied by the test's own transcription of production code. Universal — every case in the suite is in its class.

**Classes and dispositions.** J1/J2, J3/H2, J4, J5, J6/H3 and H1 stand as in the coordination plan, with H1 now reading: *convert to a behavioural test — under the DOM harness (M2) where the surface is a component — else delete and list the surface in Outstanding Items.* New classes (evergreen; the inventory item each answers is chain-application):

| Class | Predicate | Disposition | Evidence owed |
|---|---|---|---|
| H4 never-red guard | The file states, or the record shows, it passed at HEAD when written. **Stated limit: the class is enumerable only by the file's own admission — no instrument sees "was never red".** | Keep only if it goes red under one local mutation of the guarded behaviour; else delete. Strip the "not a TDD red/green" framing either way. | Mutation recorded in the disposition table. |
| H5 self-referential oracle | Expected value computed by the formula under test, or by a local transcription of it (violates E). | Rewrite the expectation as a literal or independently derived value, or import the production function where the transcription stood in for it; keep the file. | New expectation shown red against a one-token mutation of the production formula. |
| H6 third-party source assertion | Reads text under `node_modules`. | Delete. No covering test owed — the surface is not the product's. | None. |
| H7 zero-production-import transcription | No `~/` or `bot/` import; asserts on a local copy of production code. | Delete. A pin inside → a handoff record, never a fix. The surface goes to Outstanding Items unless a covering test is named. | Named covering test or an Outstanding Items line. |
| H8 oracle-contamination guard | Reads its **own** `__filename` to assert the test never calls the function under test. Not H1: H1's predicate is *production* text. | Keep; rename per (C). | None. |
| H9 hand-rolled renderer | Defines its own `render()` over React elements. | Convert to the DOM harness. | Converted test red on a mutation of the rendered behaviour, green at head. |

Chain-application rows (this plan only, never the doc): `shapes-v2.test.ts` D34 case → delete (D8); the five `013-owner-*` files → spec-form by D9 → H1 convert / H2 rename; rows 14, 20, 22 carry local transcriptions used as oracles (`switchToClassic`, `modeAfterLoad`/`confirmationFor`, `producerHash`/`consumerHash`) → H5 partial (M4b).

**Naming predicate implementing (C)** — replaces the coordination plan's `^(\d{3}-|qa\d|cr-|plan-)`:
- *Positive form, basenames* (acceptance): `^[a-z][a-zA-Z0-9-]*\.[a-z][a-zA-Z0-9-]*\.test\.tsx?$` **and** neither segment contains an ID token, where the ID-token class is, case-insensitively, `\b(m|ms|cr|qa|fqa|f-qa|ec|d|l|plan|rider)-?[0-9]+[a-z]?\b|\b0[0-9]{2}\b|20[0-9]{2}-[0-9]{2}-[0-9]{2}`. `v[0-9]+` is product vocabulary and is not in the class. (Illustration, plan only — not for the doc: a behaviour segment carrying a milestone token fails; `shapes.v2-message.test.ts` passes.)
- *Negative form, cross-check*: the same ID-token class, case-insensitive, over **three domains only** — basenames, `describe`/`it`/`test` title strings, and comment lines (`//`, `/* */`) — → 0 lines outside `// escaped:` lines. Effort-bound comments (`// D11`, review-round notes) are removed under the implementer's comment rule in the same pass. **Bounded residue, exempt and named**: string literals inside code (fixture timestamps such as `2026-08-23T00:00:00Z`, tmpdir prefixes such as `012-backfill-`, `it.each` format strings) — the class the predicate cannot distinguish from names; M4a strips them where the string is a title, leaves them where it is data.

**Instrument note**: static `it(`/`test(` site count and vitest `numTotalTests` measure different things (`it.each` expansion; at `a74b9e2`: 560 sites + 10 `it.each` = 570, executed count unknown until M0); a gap is not missing coverage. Counts via `grep -c`/`-rc` or the JSON reporter, never `| wc -l`.

**Helper policy** (D4): lift at the third duplicate into `src/utils/__tests__/helpers/` (or the nearest `__tests__/helpers/`); a helper that *is* an anti-pattern (`readSrc`) is deleted with the pattern, never lifted.

**V-22 applied to tests**: before adding a test, name the existing test covering the surface and tighten it.

## Plan

**Plan-wide observable**: every captured suite run records the vitest **process exit code** beside its counters; any pass-set acceptance in M0, M2, M3, M4a, M4c or M5 is satisfied only at exit 0 — the analysis proved a run can report all-passed and exit 1.

**Sequence is fixed (serialises every shared file, 9b):** M0 → M1 → M3 → M4b → M4a → M2 → M4c → M5. Ownership: `agent-output/CLAUDE.md` + symlink — M1. `website/package.json`, `pnpm-lock.yaml`, `website/vitest.config.ts` — M2. `src/**/__tests__/helpers/*` — created in M3, read-only after (sited inside `__tests__` because `tsconfig.json` includes `src/**/*.ts` and excludes only `**/__tests__`; a `src/test-helpers/` would enter the production tsc program — analysis S5). Each test file is opened by M3 (helper import lines only, no case or title change) and then by exactly one of M4a/M4b/M4c; no two of those open the same file. Handoffs — M4b.

### M0 — Baseline run (first act; blocks everything)

1. In `website` at `a74b9e2`: `npx vitest run --reporter=json --outputFile=../agent-output/verification/014/baseline-a74b9e2.json`, plus `--reporter=verbose` text to `baseline-a74b9e2.txt`.
2. `find src \( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' \) > /tmp/f && grep -c '' /tmp/f` recorded beside `.numTotalTests`, `.numPassedTests`, `.numFailedTests`, and the exit code. File reconciliation is **membership, not count**: every `testResults[].name` (repo-relative) is in the `find` list and vice versa — `numTotalTestSuites` is never used (it counts `describe` blocks too; QA's falsifiable prediction: 205).
3. AC2's identity key is the **pair** (repo-relative file path, `assertionResults[].fullName`) — `fullName` is file-local and every file is renamed. QA pre-closed the reporter-shape assumption on one file (`verification/014/qa-phase1/probe-json-reporter-isValidUrl.json`); M0 re-confirms it on the full run.
Acceptance (property): every inventory file is reported collected, with its per-case pass/fail set captured at the named path; a failing file is a finding to the owner before M3 opens (a red baseline is not repaired in this chain unless he rules it). Instrument: vitest JSON reporter; fresh run; one run at the base SHA.

### M1 — `agent-output/CLAUDE.md`, symlinked at `/usr/local/bin/hooks/CLAUDE.md` (D6 as amended by D15)

Content, only this: (i) four-repo map — one line per repo, which carries tests, that `/usr/local/bin/hooks` is not a repo and `git -C` is mandatory, **and the symlink's own recreation line** (`ln -s agent-output/CLAUDE.md /usr/local/bin/hooks/CLAUDE.md`, unversioned by D15); (ii) Test Conventions — runner and commands (`pnpm test`, `npx vitest run --reporter=json --outputFile=<path>` with the exit code recorded, `pnpm run typecheck`), placement, naming form and both predicate forms, axioms A–E, the class table with predicates/dispositions/evidence, escaped-provenance standard, helper policy, V-22-for-tests, instrument note, the harness usage line M2 supplies, and an **environment-fidelity convention**: component tests run under jsdom; a DOM global that exists but never fires is worse than one that is absent, so a substitute environment is adopted only when a measured behaviour matches the browser; keyboard activation of react-aria controls is expressed as a `detail: 0` click. (Evergreen wording — passes the doc's negative-form check.) **No chain IDs, dates, register rows or file dispositions** — those live in this plan.
Steps: write the file; create the relative symlink.
Acceptance (properties): every class the disposition table uses is defined in the doc (enumerated from the table's class column); every fenced command in the doc runs as written in `website`; the negative predicate over the doc → 0 lines; `test -e /usr/local/bin/hooks/CLAUDE.md && readlink -f /usr/local/bin/hooks/CLAUDE.md` prints the canonical path, captured in the implementation doc.
**OPEN QUESTION [RESOLVED 2026-08-26, D15]**: canonical in `agent-output`, symlink at the workspace root.

### M2 — DOM harness (D13; declared scope delta; analysis COMPLETE)

Analysis: `agent-output/analysis/014-test-suite-cleanup-analysis.md` (`50f053a`; rig record under `verification/014/`). Verdict consumed: every target component mounts under jsdom with zero changes under `website/src`; **D13's reopening class is not met.** Decisions taken from it:
- Environment: **jsdom** (happy-dom's `ResizeObserver` exists and never fires, which takes the product's "observer present" branch silently). Configured as vitest `test.projects`: a node project over `src/**/*.test.ts`, a dom project over `src/**/*.test.tsx` @ jsdom — environment follows the extension, no per-file directive to forget, no node test gains `window`. `include` must admit `.test.tsx` (collection failure is silent otherwise). `tsconfig.test.json` already covers `__tests__/**/*.tsx`.
- No `@testing-library/react`; React DOM `createRoot` + `act`. Keyboard activation of react-aria buttons is expressed as a `detail: 0` click (measured).
- Forward step: `pnpm add -D jsdom` (the package is pnpm@10.28.2 with `pnpm-lock.yaml`; **rev 3's `npm install --no-save` / `npm ci` paragraph was the planner's error and never applied** — the analyst kept its own rig and the tree stayed clean). Rollback: `git -C website revert <M2 commit>` incl. `pnpm-lock.yaml`, implementer on the chain branch, devops after release.
- Nothing in `src/` outside tests and `__tests__/helpers/`.
Acceptance (properties): (1) every case in the M0 per-case pass set still passes under the node project (subset relation on the key; the analysis measured the node project's assertion set byte-identical to baseline — the implementer re-measures on the tree); (2) **the vitest process exits 0** — the analysis found runs that report all-passed and exit 1 from post-teardown module rejections in the edit page's eager `import()`s, so the pass set alone cannot see this failure; how the rejection is prevented is the implementer's, and the analysis names a deterministic way; (3) every component in the M4c target set mounts in at least one test by the end of M4c, with exit 0.
Product-behaviour change: **none** — no downstream milestone is PREMISE-STALE.

### M3 — Helper layer (D4), per family with cost lines

| Family | Files | Decision | Cost of lifting | Cost of leaving |
|---|---|---|---|---|
| `make*` component builders (9: `makeLinkButton, makeActionRow, makeTextDisplay, makeThumbnail, makeSection, makeContainer, makeSeparator, makeMediaGallery, makeFile`) | 5 | **Lift** to `src/utils/__tests__/helpers/components.ts`, one signature per builder. | Reconcile three drifted `makeSection` signatures; 5 files touched. | Every new shape test copies one of three drifts. |
| `data(o)` | 3 | **Lift** to `src/utils/__tests__/helpers/messageData.ts`. | Trivial. | Third copy is the trigger. |
| `author()` | 3 | **Lift** to `src/utils/__tests__/helpers/discord.ts`. | Trivial (byte-identical). | As above. |
| `makeEditable*` | 2 | **Leave.** | Below trigger. | Second copy only. |
| `makeRes`, `serialized`, `fakeDatabase`, `values`, `apiMessage` | 1 each | **Leave** — no family. | n/a | n/a |
| `readSrc` / `read` | 5 | **Delete with H1** in M4c. | Lifting entrenches H1. | n/a |
| `render()` | 2 | **Replace** by the harness in M4c. | Depends on M2. | Dies with H9. |
Files M3 opens (import lines only): rows 1, 5, 7, 14, 15, 25, 26, 27, 40, 42, 44. Not lifted, by decision: the analysis's auto-vivifying tRPC mock (S3) stays a per-test device, never a helper — a mock that answers every call is not a standard.
Acceptance (property): in test files, definitions of the three lifted families → 0: `grep -rcE 'function (data|author)\(|function make(LinkButton|ActionRow|TextDisplay|Thumbnail|Section|Container|Separator|MediaGallery|File)\(' src --include='*.test.ts*'` summed = 0; each lifted helper has ≥3 importers; the M0 per-case pass set is unchanged.

### M4 — Dispositions, all 48 files (disposition table: `path | class | disposition | surface | covering test (path::name) | old title → new title | seen-to-fail evidence`)

**M4b — deletions, handoffs, oracle repairs (runs before M4a).**
- Row 43 `message-init-route0.test.ts` — H7 + J1/J2: delete; write `agent-output/handoff/message-init-cached-edits-lost-<date>.md` carrying the BROKEN case's own words verbatim ("unconditional copyIntroMessage() replaces cached edits"; "This is the current bug — cached edits are lost") and stating that presence of the defect in production code was **not verified** by this chain. Surface → Outstanding Items unless a covering test is named.
- Row 11 `011-style-reconciliation-poc.test.ts` — H6: delete.
- Row 3 `012-backfill-report.test.ts` — H4 on the never-red case: keep if red under mutation, else delete that case; then rename (counted here, not M4a).
- Row 46 `plan-005-bug-fixes.test.ts` — H5: literal expectations for the two self-referential cases; rename; `// escaped: analysis/closed/005-user-reported-bugs-analysis.md`.
- Rows 14, 20, 22 — plus the residue QA's AC7 sweep enumerates in `qa/014-test-suite-cleanup-qa.md` (at Phase 1: row 13 `012-message-mode`, expected value is a production function's output; row 15 `012-validity-predicate`, two production functions cross-checked — for these two the literal branch alone applies, since the production import *is* the defective oracle; where row 13's delegation to `switchToV2`/`switchToClassic` is itself the specified behaviour, the disposition row's surface cell says so and the case is kept as a delegation spec) — H5 partial: replace transcription- or production-derived expectations (`switchToClassic`; `modeAfterLoad`/`confirmationFor`; `producerHash`/`consumerHash`) with literals or the production import; case counts unchanged; then rename. Rows 14 and 15 each keep two source-text cases for M4c — **the only exceptions to one-milestone ownership, named**: rows 14 and 15 are opened by M4b (oracle repair) and then M4c (source-text cases); M4b completes first. Rows 13, 20, 22 are M4b-only (repair, then rename inside M4b). Partition check: M4b opens rows 3, 7, 11, 13, 14, 15, 20, 22, 43, 46 (10); M4a 27; M4c 13 (10, 32, 33, 34, 36, 45, 14, 15, 16, 19, 35, 38, 39); 10 + 27 + 13 = 50, rows 14 and 15 counted twice → 48 distinct.
- Row 7 `shapes-v2.test.ts` — delete the D34 case (D8); title strips and rename.

**M4a — pure renames, title strips, effort-bound comment removal (H2); no case change.** Every remaining file, including the three clean ones and the title-only ones, is renamed to the (C) form — uniform rule, no exemptions (critic Q1 settled: rename). Rows 1, 2, 4, 5, 6, 8, 9, 12, 17, 18, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 37 (H8), 40, 41, 42, 44, 47 (`// escaped:` line added), 48. Illustrative names only: `utils.components-v2-data-layer.test.ts`, `isValidUrl.url-validation.test.ts`, `limits.mutual-exclusivity.test.ts`. Evidence per file: per-file case count equal and zero failures on both trees, with the `old title → new title` column filled for every retitled case (the identity key across a title strip).

**M4c — H1/H9 conversions (after M2).** Evidence per converted case: red on a local mutation of the behaviour, green at head; source-text cases removed only after the behavioural replacement is green.
- Wholly source-text over components: rows 10, 32, 33, 34, 36 — convert to mounted-behaviour assertions (resting state, notice location, Load-enables-not-loads, readable errors), rename.
- Row 45 `plan-004-lazy-loading.test.ts` — **H1 delete branch** (analysis S4): its subject is the `ssr:`/`loading:` options passed to `next/dynamic`, which no mount can observe; delete, and list the lazy-loading surface (`edit/page.tsx` and the five dynamics wrappers) in Outstanding Items.
- M4c target set (analysis S1, widened): `TransitionHeightElement`, `JsonModalBody`, `NewMessageJsonInput`, `MessageProvider`, `NullableComponent`, `NewMessageModal`, `SaveAsMenu`, and `edit/page.tsx` as reached by the converted cases. **Named residue**: `EmojiPicker` (×3), the individual dynamics wrappers, and `DiscordMessageEditor` (mounted only transitively; exit 0 in a test of its own undetermined) were not established by the analysis; a converted case needing them that fails to mount goes to Outstanding Items, not to a silent drop.
- Mixed: rows 14, 15, 16, 19, 35 — convert the source-text cases (2, 2, 3, 3, 2), keep the rest, rename (14/15 already retitled in M4b — rename here).
- H9: rows 38, 39 — replace `render()` with the harness.
Impossible conversion (analysis says no mount) → case deleted, surface in Outstanding Items, never silently dropped.

### M5 — Acceptance sweep and capture at the merge SHA (executing agent writes `agent-output/verification/014/*`)

1. `npx vitest run --reporter=json --outputFile=../agent-output/verification/014/final-<sha>.json` — `numFailedTests` = 0; every retained baseline case (via the title mapping) present and passing.
2. Positive naming predicate over `find src \( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' \)` → every basename passes; negative form over its three domains → 0 lines outside `// escaped:`.
3. `grep -rcE '\.(skip|only)\(' src --include='*.test.ts*'` → 0.
4. `grep -rlE 'readFileSync' src --include='*.test.ts*'` → only the row-3 temp-file reads and the row-37 `__filename` guard (named allowlist of two files).
5. `grep -rLE "(from |import\()\s*'(~|bot)/" src --include='*.test.ts*'` → 0 files (dynamic `await import('~/…')` counts; catches H7).
6. `grep -rc '// escaped:' src --include='*.test.ts*'` summed = bug-form files kept (expected 2: rows 46, 47), listed by path.
7. Reconciliation: 48 = deleted + converted + renamed + kept, per the disposition table.

## Acceptance criteria (whole chain, as properties)

- AC1 Every inventory row has a disposition-table row with a doc-defined class and a non-empty evidence column; instrument: table vs inventory by count and path.
- AC2 No case that passed at baseline and is retained loses its pass; class: the baseline per-case pass set; identity across a title strip: the table's `old title → new title` column; a case is retained iff its disposition is rename/keep/oracle-repair.
- AC3 Every deletion names a covering test or an Outstanding Items line; class: disposition = delete.
- AC4 Every basename vitest collects passes the positive predicate, no exemptions; the negative form → 0 over its three domains, residue as named.
- AC5 Every kept bug-form test carries `// escaped:` naming a release/incident artefact; class: files on the M5 step-6 list.
- AC6 Every converted or oracle-repaired case was seen red under a recorded local mutation; class: disposition ∈ {convert, oracle-repair}; instrument: the evidence column.
- AC7 Axiom (E) holds over every case in the suite; **holder: the qa subagent** (adequacy owner under V-27 — a test-only diff opens no review round, so code review cannot hold it; critic Q2 settled). The class of known violators is rows 46, 14, 20, 22 (M4b) plus anything M4c writes; residue: any transcription the inventory did not tag — a bounded class QA enumerates by its own instrument.
- AC8 Human-observable: the next feature chain's planner cites `agent-output/CLAUDE.md` (via the symlink) — checked by that chain's retrospective.

Code review on this chain: **scoped to M2's `package.json`/`vitest.config.ts`/lockfile diff only** (non-test files); all test-only diffs go to QA under V-27.

QA Phase 1 sequencing: **runs before implementation** (after critique) — test-only chain; QA's adequacy sweep is the substantive gate.

## Testing Strategy

Unit-level; no e2e. Expectation: no net loss of behavioural cases (AC2); H1 surfaces gain first behavioural coverage (M4c). Critical scenarios at high level: pass-set parity across renames; red-then-green per conversion; harness introduction leaving node tests intact. Phase 1 content is the qa subagent's.

## Validation

`pnpm run typecheck` in `website` at the merge SHA — the project's own script, which runs both tsc programs (`tsconfig.json` excludes `**/__tests__`; `tsconfig.test.json` covers them — a bare `npx tsc --noEmit` type-checks none of the 48). M5 commands. No migrations.

## Risks

| Risk (class) | Falsifier | Record per pass |
|---|---|---|
| A source-text test has rotted to vacuous truth and is counted as coverage. | M0/M4c: a `not.toContain` case whose target no longer exists. | rev 1: suite unrun. rev 2: unchanged. rev 3: unchanged — closes at M0. |
| The harness changes node tests' behaviour. | M2: any baseline-passing case failing after config. | rev 1–3: not yet testable. |
| A component does not mount without production change (D13 reopening class). | Analysis (e). | rev 1–3: analysis open. rev 5: not met — all named targets mount; residue EmojiPicker/dynamics named in M4c. |
| A rig defect reads as a product finding (analysis method warning: config outside vite root failed all 48 under DOM). | A DOM-run failure not reproduced by a second instrument on the tree. | rev 5: one member found and caught by the analyst; recorded in `verification/014/README.md`. |
| Deleting a pin loses the only record of a real bug. | Handoff exists before the delete commit. | rev 1–3: no deletion yet. |
| The disposition table becomes narrative instead of per-row evidence. | Any row with an empty evidence column at review. | rev 1–3: no table yet. |
| Acceptance instruments contradict the dispositions they verify (critic cycle 1: ten members). | Any M5 command reading a failure on a file the plan leaves as-is. | rev 3: ten members found by critique, all corrected. rev 4 (pass 2): no new member. rev 7: **one new member** — row 13 in two milestone lists would have read M5 step 7 as 49 vs 48 (QA-1 / critic M-13); corrected at rev 8. |

## Rollback

Test-file edits/renames/deletes and `test-helpers/` — `git -C website revert <commit>`, implementer on the chain branch, devops after release. M2 — revert of the commit incl. lockfile, same parties. `agent-output/CLAUDE.md` — `git -C agent-output revert <commit>`, implementer; the symlink — `rm /usr/local/bin/hooks/CLAUDE.md`, any stage. Handoffs stand.

## Outstanding Items

Populated by the implementer per M4; empty at rev 3.

## Handoff Notes

- Critic: approved at pass 2. No OPEN QUESTION stands.
- Analyst-hooks-14 (M2): complete; `analysis/014-test-suite-cleanup-analysis.md` is cited, not re-derived.
- Implementer: fixed sequence M0 → M1 → M3 → M4b → M4a → M2 → M4c → M5; close the M0 step-3 assumption first; M2 reads the analysis's mock tables and exit-code finding before configuring.
- QA: owns adequacy (V-27) and AC7; registers AC8 as the post-chain observable.
- Code reviewer: M2's non-test diff only (`package.json`, `pnpm-lock.yaml`, `vitest.config.ts`).
