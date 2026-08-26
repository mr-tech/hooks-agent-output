---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Active
Status-Detail: Revision 2 — scope confirmed (D14), CLAUDE.md home settled (D15); with critic-hooks-014 for critique. M2 (DOM harness) is an owner-authorised scope delta and carries a REQUIRED analysis (analyst-014) before its implementation; every other milestone is implementable on critic approval.
Revision: 2
Target Release: website `master` moved to the chain-014 merge SHA (the package carries no version artefact); `agent-output` moves alongside
Epic Alignment: none registered — the owner-approved coordination plan `/home/dev/.claude/plans/we-recently-changed-the-wobbly-sparrow.md` is the source of the effort's outcome
Lane: standard (agent-output/README.md carries no small-lane section — recorded absence, not a judgement)
Architectural surface: none — test infrastructure and a conventions document only; no product layer, contract or core path changes
Owning-Stage: critic
---

# Plan 014 — Hooks test-suite cleanup (pilot)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
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
| D13 | A DOM test harness is authorised as a declared scope delta: new devDependency + vitest environment change; source-text tests over `.tsx` are converted to behavioural tests instead of deleted; an analyst determines the harness shape. | Owner, verbatim: "Which makes more sense to do in the long-term? I'm leaning towards 2, authorize." — option 2 as put to him by steering: "Authorise a DOM harness as a declared scope delta — new devDependency + vitest environment change; the analyst then needed — you'd spawn it. Converts those files to behavioural tests instead of deleting." (relayed). | Analyst finding that no harness can mount the target components under this toolchain (Next 16 / React 19 / vitest 4) without production-code change — then M2 reverts to delete-with-Outstanding-Items and the owner is told. |

Standing constraint inherited from chain 012/013, restated: **no agent sends a live Discord POST** (012 D14) — irrelevant to test work here except that no converted test may hit the network.

## Assumptions

1. The suite at `a74b9e2` passes. Unverified; M0 makes it a fact or a finding before anything is touched.
2. The `vi.mock('~/env.mjs')` idiom (36/48 files) is sufficient for module-level imports; the live question for components is reachability under a DOM environment — the analysis (M2) settles it.
3. The static count 570 is a floor; the executed count differs by `it.each` expansion. Both instruments are recorded in the conventions doc as measuring different things.

## Rubric as amended (goes into CLAUDE.md verbatim; M1)

**Axioms.**
(A) A test is evidence only if it has been seen to fail against the defect it names — recorded once, in the disposition table, from a local, restored mutation.
(B) A bug-form test is earned only by an escaped defect: an artefact that is a **release or incident record** — an incident/handoff dated before the fix commit, a user report, or a release that shipped the defect. Owner observations against in-flight branch revisions, and any CR/QA/critic finding ID, are intra-chain and do not qualify (D9). Ambiguous → spec-form.
(C) Test and file names name the surface and behaviour — never a chain, milestone, ticket, agent, date or person. Hooks form: `__tests__/<module>.<behaviour>.test.ts[x]` where `<module>` is the production module's basename. Provenance is one line `// escaped: <artefact path>`.
(D) A test whose expected value is a known-wrong result is a pin, not a test.
(E) *(new)* A test's expected value is independent of the code under test: never computed by the formula under test, never read from a production module's text, never supplied by the test's own transcription of production code.

**Classes and dispositions.** J1/J2, J3/H2, J4, J5, J6/H3 and H1 stand as in the coordination plan, with H1 now reading: *convert to a behavioural test — under the DOM harness (M2) where the surface is a component — else delete and list the surface in Outstanding Items.* New classes, each answering one inventory "could not classify" item:

| Class | Predicate | Disposition | Evidence owed |
|---|---|---|---|
| H4 never-red guard | The file states, or the record shows, it passed at HEAD when written (inventory item 1). | Keep only if it goes red under one local mutation of the guarded behaviour; else delete. Strip the "not a TDD red/green" framing either way. | Mutation recorded in the disposition table. |
| H5 self-referential oracle | Expected value computed by the formula under test (item 3). Violates (E). | Rewrite the expectation as a literal or independently derived value; keep the file and its `// escaped:` line. | New expectation shown red against a one-token mutation of the formula. |
| H6 third-party source assertion | Reads text under `node_modules` (item 6). | Delete. No covering test owed — the surface is not the product's. | None. |
| H7 zero-production-import transcription | No import from `~/` or `bot/`; asserts on a local copy of production code (item 2). | Delete. Any J1/J2 case inside → handoff (D2). The surface goes to Outstanding Items unless a covering test is named. | Named covering test or an Outstanding Items line. |
| H8 oracle-contamination guard | Reads its **own** `__filename` to assert the test never calls the function under test (item 7). Not H1: H1's predicate is *production* text. | Keep; rename per (C). | None. |
| H9 hand-rolled renderer | Defines its own `render()` over React elements (item 8). | Convert to the M2 harness. | Converted test red on a mutation of the rendered behaviour, green at head. |
| D34 case | `shapes-v2.test.ts` empty-Text-Display case (item 4). | Delete (D8). | None. |
| `013-owner-*` files | Item 5. | Spec-form by D9 → H1 convert (component) / H2 rename. | As H1/H2. |

**Naming predicate that implements (C)** — replaces the coordination plan's `^(\d{3}-|qa\d|cr-|plan-)`, which passes `m7-m10-coverage-gaps.test.ts`:
- *Positive form, filenames*: every test path under `src/**/__tests__/` matches `^[a-z][a-zA-Z0-9]*\.[a-z][a-zA-Z0-9-]*\.test\.tsx?$` (basename). Everything else fails.
- *Negative form, filenames and titles*: `grep -rnE '\b(M|MS|CR|QA|F-?QA|D|EC|L)-?[0-9]+\b|\b0[0-9]{2}\b|20[0-9]{2}-[0-9]{2}-[0-9]{2}|[Oo]wner ruling|[Pp]lan [0-9]|[Rr]ider' --include='*.test.ts*'` → 0 lines outside `// escaped:` lines. `v[0-9]+` (product vocabulary, e.g. Components V2) is deliberately not matched.
Both forms run; the positive form is the acceptance criterion, the negative is its cross-check.

**Instrument note (goes in the doc)**: static `it(`/`test(` site count and vitest `numTotalTests` measure different things (`it.each` expansion); a gap between them is not missing coverage. Counts are taken with `grep -c`/`-rc` or the JSON reporter, never `| wc -l`.

**Helper policy** (D4): lift a helper into `src/test-helpers/` at its third duplicate; a helper that *is* an anti-pattern (`readSrc`) is deleted with the pattern, never lifted.

**V-22 applied to tests**: before adding a test, name the existing test covering the surface and tighten it.

## Plan

Shared-file ownership: `agent-output/CLAUDE.md` and the workspace symlink — M1 only. `website/package.json`, `website/vitest.config.ts` — M2 only. `website/src/test-helpers/*` — created in M3, read-only thereafter. Each of the 48 test files is opened by exactly one milestone (table below). `agent-output/handoff/*` new files — M4b.

### M0 — Baseline run (first act of the chain; blocks everything)

Objective: turn the static inventory into an executed fact.
1. `cd website && npx vitest run --reporter=json --outputFile=../agent-output/verification/014/baseline-a74b9e2.json` at `a74b9e2`; also `--reporter=verbose` text to `baseline-a74b9e2.txt`.
2. `find src -name '*.test.ts' -o -name '*.test.tsx' > /tmp/f && grep -c '' /tmp/f` recorded beside `.numTotalFiles`, `.numTotalTests`, `.numPassedTests`, `.numFailedTests` from the JSON.
Acceptance (property): for every file in the inventory, the JSON reports it collected and its pass/fail set is captured at the named path; any failing file is a finding reported to the owner before M4 opens (a red baseline is not repaired in this chain unless the owner rules it). Instrument: vitest JSON reporter; reset: none (fresh run); window: one run at the base SHA.

### M1 — `agent-output/CLAUDE.md`, symlinked at `/usr/local/bin/hooks/CLAUDE.md` (D6 as amended by D15)

Objective: the standard exists before any file is touched under it.
Content, and only this: (i) four-repo map — one line per repo, which carries tests, that `/usr/local/bin/hooks` itself is not a repo and `git -C` is mandatory; (ii) Test Conventions — runner and commands (`npm test`, `npx vitest run --reporter=json --outputFile=<path>`), placement (`__tests__/` beside the module), naming form, axioms A–E, the class table above, the escaped-provenance standard, helper policy, V-22-for-tests, the instrument note, and the DOM-harness usage line M2 supplies.
Acceptance (properties): every class in the disposition table below is defined in the doc (enumerated from the table's class column); every command in the doc runs as written in `website` (enumerated from the doc's fenced commands); the doc contains no chain IDs, dates or agent names outside its own changelog-free body (the negative naming predicate run over the file → 0). Steps: write `agent-output/CLAUDE.md` (versioned, committed by the implementer); then `ln -s agent-output/CLAUDE.md /usr/local/bin/hooks/CLAUDE.md` (relative link; unversioned by D15). Acceptance adds: `readlink /usr/local/bin/hooks/CLAUDE.md` resolves to the canonical file, captured in the implementation doc. **OPEN QUESTION [RESOLVED 2026-08-26, D15]**: canonical in `agent-output`, symlink at the workspace root.

### M2 — DOM harness (D13; declared scope delta; REQUIRES ANALYSIS — REQUIRED before implementation)

Objective: components become reachable so H1/H9 files convert instead of dying.
**REQUIRES ANALYSIS** (analyst-014, `agent-output/analysis/014-test-suite-cleanup-analysis.md`): under vitest ^4.1.2 / React 19.2.4 / Next ^16.1.6 with `environment: 'node'`, determine (a) which environment (jsdom vs happy-dom) mounts each target component — `TransitionHeightElement.tsx`, `JsonModalBody.tsx`, `NewMessageJsonInput.tsx`, `providers/MessageProvider/index.tsx`, `NullableComponent`, `app/message/m/[id]/edit/page.tsx` and its siblings — with the existing `vi.mock('~/env.mjs')`, and which additional mocks (Next router/image, providers) each needs; (b) whether the environment is set per file (`// @vitest-environment`) or globally, and the effect of each on the 48 node tests' pass set; (c) whether `include` must admit `.test.tsx`; (d) whether `@testing-library/react` is required or React DOM `createRoot` + `act` suffices; (e) a throwaway POC mount of at least one target component per file group, in a rig under `agent-output/verification/014/`, never committed to `website`. A finding that no target component mounts without production-code change reopens D13.
Implementation (after analysis): add the devDependency(ies) and config the analysis names; nothing in `src/` outside tests and `test-helpers/`.
Acceptance (properties): every file in the M0 pass set still passes after the config change (enumerated from the baseline JSON — the pass set is a subset relation, not a count); every target component listed above mounts under the harness in at least one test by the end of M4c. Rollback: `git -C website revert <M2 commit>` — the forward step is a package-manager operation, so the revert of the commit (lockfile included) is the rollback, run by the implementer on the chain branch or the devops agent after release.
Product-behaviour change: **none** — devDependency and test config are not observable outside source; no downstream milestone is marked PREMISE-STALE.

### M3 — Helper layer (D4), per family with cost lines

| Family | Files | Decision | Cost of lifting | Cost of leaving |
|---|---|---|---|---|
| `make*` component builders (9 builders) | 5 | **Lift** to `src/test-helpers/components.ts`, one signature per builder; callers adopt it. | Reconcile three drifted `makeSection` signatures; 5 files touched in one pass. | Fifth copy already; every new shape test copies one of three drifts. |
| `data(o)` | 3 | **Lift** to `src/test-helpers/messageData.ts`. | Trivial (bodies differ by one literal). | Third copy is the policy trigger. |
| `author()` | 3 | **Lift** to `src/test-helpers/discord.ts`. | Trivial (byte-identical). | As above. |
| `makeEditable*` | 2 | **Leave** in place. | Premature — below trigger. | Second copy only. |
| `readSrc` / `read` | 5 | **Delete with H1** (smell, not helper). | Lifting entrenches H1. | n/a — removed by M4c. |
| `render()` | 2 | **Replace** by the M2 harness. | Dependent on M2. | Dies with H9. |
Acceptance (property): after M3, `grep -rc 'function data(\|function author(\|function make[A-Z]' src --include='*.test.ts*'` → 0 in test files; every lifted helper has at least three importers; the M0 pass set is unchanged.

### M4 — Dispositions, all 48 files

Sub-milestones by change class; every file appears once. Column "evidence" is the property the implementer's disposition table must satisfy per row (`path | class | disposition | surface | covering test (path::name) | seen-to-fail evidence`).

**M4a — pure renames/title strips (H2), no case change.** Evidence per file: case count and pass set identical before/after, both trees, from the JSON reporter.
Inventory rows 1, 2, 4, 5, 6, 8, 9, 12, 13, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 37 (H8 — keep, rename), 42, 44, 47 (add `// escaped:` line → `analysis/closed/005-user-reported-bugs-analysis.md`; H3), plus title-only strips in 7 (`shapes-v2`) and 44 (`mutual-exclusivity`). Rows 40, 41, 48 (clean): no change.
Row 7 additionally: delete the D34 case (D8) — one case removed, recorded as such, not a pure rename.

**M4b — deletions and handoffs.** Evidence per file: covering test named, or Outstanding Items line, per class.
- Row 43 `message-init-route0.test.ts` — H7 + J1/J2: delete whole file; write `agent-output/handoff/message-init-cached-edits-lost-<date>.md` carrying the BROKEN case's own words verbatim ("unconditional copyIntroMessage() replaces cached edits"; "This is the current bug — cached edits are lost") and stating that whether the defect is still present in production code was **not verified** by this chain. Surface (`selectInitialMessage`/`copyIntroMessage` — the real production symbols, if they exist) → Outstanding Items unless a covering test is found.
- Row 11 `011-style-reconciliation-poc.test.ts` — H6: delete.
- Row 3 `012-backfill-report.test.ts` — H4 on the never-red case only: keep the file (rename under M4a's form) if the case goes red under mutation, else delete that case; the other 29 cases are H2.
- Row 46 `plan-005-bug-fixes.test.ts` — H5: rewrite the two self-referential expectations as literals; rename; add `// escaped:` line. (Edited here, not M4a, because a case changes.)

**M4c — H1/H9 conversions (depends on M2).** Evidence per converted case: red on a local mutation of the behaviour, green at head; source-text cases removed only after the behavioural replacement is green.
- Wholly source-text over components: rows 10, 32, 33, 34, 36, 45 — convert each assertion to a mounted-behaviour assertion (what the owner rulings D29–D33 describe as user-visible: resting state, notice location, Load-enables-not-loads, readable errors), then rename.
- Mixed: rows 14, 15, 16, 19, 35 — convert the source-text cases (2, 2, 3, 3, 2 respectively; inventory case-level split), keep behavioural cases, rename.
- H9: rows 38, 39 — replace hand-rolled `render()` with the harness.
Where a conversion is impossible for a named reason (analysis says the component does not mount), the case is deleted and the surface is an Outstanding Items line — never silently dropped.

### M5 — Acceptance sweep and capture at the merge SHA

Commands, each output captured under `agent-output/verification/014/` (executing agent writes; owner never owes a file):
1. `npx vitest run --reporter=json --outputFile=../agent-output/verification/014/final-<sha>.json` — `numFailedTests` = 0; pass-set comparison vs baseline: every baseline-passing case that was *kept* (M4a set) is present and passing.
2. Positive naming predicate over `find src -name '*.test.ts*'` → every path matches; negative predicate → 0 lines outside `// escaped:`.
3. `grep -rcE '\.(skip|only)\(' src --include='*.test.ts*'` → 0.
4. `grep -rlE 'readFileSync' src --include='*.test.ts*'` → only row 3's temp-file reads and row 37's `__filename` guard (named allowlist of two files).
5. `grep -rL -E "from '(~|bot)/" src --include='*.test.ts*'` → 0 files (every test imports production code; catches H7).
6. `grep -rc '// escaped:' src --include='*.test.ts*'` summed = number of bug-form files kept (expected 2: rows 46, 47), listed by path.
7. Reconciliation: 48 = deleted + converted + renamed + kept, per the disposition table.

## Acceptance criteria (whole chain, as properties)

- AC1 Every one of the 48 inventory rows has a disposition-table row whose class is one of the doc's classes and whose evidence column is non-empty; instrument: the implementer's table vs the inventory, reconciled by count and by path.
- AC2 No case that passed at baseline and is retained loses its pass; the input class is the baseline JSON's pass set; a case is "retained" iff its disposition is rename/keep.
- AC3 Every deletion names a covering test or an Outstanding Items line; the class is enumerated from disposition = delete.
- AC4 Every filename and title satisfies (C) per the positive predicate; the class is every file vitest collects.
- AC5 Every bug-form test kept carries `// escaped:` naming a release/incident artefact; the class is enumerated by the negative predicate's allowlist.
- AC6 Every converted test was seen red under a recorded local mutation; the class is disposition = convert; instrument: the disposition table's evidence column, captured per file.
- AC7 (E) holds: no expectation is derived from the formula under test — the class is every case in files 46 and any case M4c writes; instrument: code review reads the diff for arithmetic over production symbols.
- AC8 Human-observable: the next feature chain's planner cites `agent-output/CLAUDE.md` (via `/usr/local/bin/hooks/CLAUDE.md`) — checked by that chain's retrospective, not this one.

QA Phase 1 sequencing: **runs before implementation** (after critique) — this is a test-only chain and QA's adequacy sweep is the substantive gate under V-27.

## Testing Strategy

Unit-level throughout; no e2e. Coverage expectation: no net loss of behavioural cases (AC2); H1 surfaces gain their first behavioural coverage (M4c). Critical scenarios at high level: parity of pass sets across renames; red-then-green on every conversion; harness introduction leaving node tests intact. Content of Phase 1 is the qa subagent's.

## Validation

Static: `npx tsc --noEmit` in `website` at the merge SHA (test files are type-checked). Suite: M5 commands. No migrations.

## Risks

| Risk (class) | Falsifier | Record per pass |
|---|---|---|
| A source-text test has rotted to vacuous truth and is counted as coverage. | M0/M4c: a `not.toContain` case whose target file or symbol no longer exists. | rev 1: none observed yet (suite unrun). |
| The harness changes node tests' behaviour (globals like `window` present). | M2 acceptance: any baseline-passing case failing after config. | rev 1: — |
| A component does not mount without production change (D13 reopening class). | Analysis (e). | rev 1: — |
| Deleting a pin loses the only record of a real bug. | Handoff exists before the delete commit. | rev 1: — |
| The disposition table becomes narrative instead of per-row evidence. | Any row with an empty evidence column at review. | rev 1: — |

## Rollback

Per change class: test-file edits/renames/deletes and `test-helpers/` — `git -C website revert <commit>`, implementer on the chain branch, devops after release. Package/config (M2) — revert of the commit including the lockfile, same parties. `agent-output/CLAUDE.md` — `git -C agent-output revert <commit>`, implementer; the symlink — `rm /usr/local/bin/hooks/CLAUDE.md`, any stage, since it is unversioned (D15). Handoff documents — stand regardless.

## Outstanding Items

Populated by the implementer per M4; empty at rev 1.

## Handoff Notes

- Critic: whole plan. No OPEN QUESTION stands at rev 2.
- Analyst-014 (M2): the REQUIRES ANALYSIS paragraph is the brief; output path named there.
- Implementer: M0 first, then M1, M3, M4a/M4b in any order, M2 → M4c last, M5 closes.
- QA: owns adequacy (V-27); registers AC8 as the post-chain observable.
