---
ID: 014
Origin: 014
UUID: 4671e28c
Status: OPEN
Status-Detail: >-
  Cycle 1, pass 1 (rung 1–5). Verdict REQUEST REVISION. Ten Mediums, all in acceptance
  instruments and predicates — none in scope or machinery; six Lows. No Critical. No OPEN QUESTION
  stands in the plan. Sized to the ask as amended by D13/D14.
---

# Critique — Plan 014, Hooks test-suite cleanup (pilot)

**Artifact**: `agent-output/planning/014-test-suite-cleanup.md`, revision 2 (agent-output `0540f34`; `website` at `a74b9e2`, verified).
**Analysis**: `analysis/014-test-suite-cleanup-analysis.md` — commissioned (M2), not yet written; not read. Sources re-derived directly: coordination plan `/home/dev/.claude/plans/we-recently-changed-the-wobbly-sparrow.md`; inventory `analysis/test-inventory-2026-08-26.md` (all 48 rows, per-class counts, the eight unclassified items); handoff `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`; qa.md "Regression-Test Authorship"; implementer.md pattern ladder; code-reviewer.md test-only-diff clause; `website/vitest.config.ts`, `package.json`, and the 48 test files' names, imports and helper definitions.
**Date**: 2026-08-26T23:55 UTC.
**Status**: Initial — cycle 1, pass 1.
**Roadmap / architecture**: `agent-output/roadmap/` absent; `architecture/website.md` carries nothing on tests (plan says so; confirmed by the inventory's own absence note). No Master Product Objective document exists to align against — none cited.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-26T23:55 | planner-hooks-014 → critic-hooks-014 | Critique rev 2 | Initial. Whole-document pass; premises verified at `website` `a74b9e2`. 10 Medium, 6 Low. REQUEST REVISION. |

## Assumption Not Checked

This pass assumes the vitest ^4.1.2 JSON reporter emits per-file `testResults[]` with per-case `assertionResults[].fullName`, which is the key M0, AC2 and M4a's "pass set identical" all silently rely on, and does not test it by running the suite. Falsity signature: `verification/014/baseline-a74b9e2.json` with no per-case entries, or with names that do not survive a title strip. Owner of closing: the implementer at M0 (the chain's first act), recorded in the implementation doc; named again in the handoff below.

## Value Statement Assessment

Present, owner-approved verbatim (D12), in user-story form, and every milestone traces to one of its three clauses: the audit (M0, M4, M5), the per-deletion proof (M4b/M4c evidence columns, AC3, AC6), the standard living at `/usr/local/bin/hooks/CLAUDE.md` (M1, as amended by D15 — the symlink keeps the value statement's path literally true). The "so that" is checked by AC8 in the next chain's retrospective, which is the coordination plan's own real acceptance test. No drift.

## Overview

**Pricing against the ask**: sized to the ask as amended. The coordination plan's Hooks step is (i) a conventions doc, (ii) a disposition table over 48 files, (iii) execution with per-deletion proof. Plan 014 carries those as M1, M4, M5 plus M0 (a baseline the coordination plan's verification section already presupposes), M2 (D13 — owner-authorised scope delta, registered with its reopening class) and M3 (ruling 4 delegated the helper decision to the planner; cost lines are present). D14 confirms the six-milestone shape. Nothing in the plan exceeds a registered ruling; nothing below proposes adding any.

The plan is well-formed: Decisions Register with routes and reopening classes; rollback per change class naming the party; QA Phase 1 sequencing line; architectural-surface declaration; PREMISE-STALE gate discharged (M2 correctly argues devDependency/config are not product behaviour); shared-file ownership stated; every one of the 48 rows appears in exactly one M4 sub-milestone (counted: 31 + 4 + 13 = 48). Body is 215 lines — no Reading Order owed.

The findings are of one broad kind: **acceptance instruments that disagree with the dispositions they are meant to verify**. Each is checkable today against the tree, and each would surface at M5 as a false failure or a silent extra change — which is the hotfix shape for a test-only chain: an implementer "fixing" the gate by renaming or editing files the plan said to leave alone.

**Planner's four questions, answered in brief** (detail in Findings):
1. *Axiom (E) and H4–H9 as properties over enumerable classes*: H5, H6, H8, H9 are. H4's class is enumerable only by self-declaration (the inventory's own weakness 1) — a stated limit, not a finding. H7's evidence column is a property but its instrument (M5 step 5) has a false positive (M-7). (E) is universal in the rubric and file-46-only in AC7 (M-10).
2. *Positive predicate*: rejects all 48 current names (verified: 0/48 match), including `m7-m10-coverage-gaps`. It does **not** reject every ID-bearing name — a lowercase ID in the behaviour segment passes it, and the negative form is case-sensitive so it passes that too (M-2). It also rejects five files the plan says not to rename (M-1).
3. *M3 helper layer*: D4 is satisfied — six families, a decision and a cost line each way. Two defects: its acceptance grep contradicts its own "leave" decision (M-6), and it opens eleven files the plan says only M4 opens (M-5).
4. *M0 and the two-instrument note*: sound. Re-derived: `grep -rcE '^\s*(it|test)\('` sums to 560 and there are 10 `it.each` sites; the inventory's 570 counts both, so the two static counts reconcile and the note's claim that vitest's `numTotalTests` will differ by `.each` expansion is correct. M1's symlink step matches D15 (relative target `agent-output/CLAUDE.md` resolves from the link's directory to the canonical file); one instrument nit (L-1).

## Architectural Alignment

Architectural surface declared none; verified — the plan touches `vitest.config.ts`, `package.json` devDependencies, tests and `src/test-helpers/`. No contract, no cross-repo API (cross-repo-contract skill not applicable: `agent-output/CLAUDE.md` is a document, not an interface). M2's environment change is the one item with a blast radius beyond its files (globals under a DOM environment) and the plan carries that as a Risk row with a falsifier — correct.

## Scope Assessment

Sized to the ask as amended (above). One scope-shaped observation, not growth: the rubric's last two rows ("D34 case", "`013-owner-*` files") are dispositions of this chain, not conventions, and carrying them verbatim into an evergreen `CLAUDE.md` is what makes M-4 a contradiction.

## Technical Debt Risks

- The unversioned symlink (D15) is a working-directory fact with no reproduction recorded anywhere a fresh session would read (L-1). Not a finding against D15 — the ruling is terminal — but the plan should say where the recreation line lives.
- The negative naming predicate, as written, will keep firing on product data (ISO dates in fixtures, zero-padded numeric literals) after the cleanup (M-3); a gate that reads non-zero when the suite is clean gets allow-listed or dropped by the next writer.

## Findings

### Medium

**M-1 — Positive naming predicate fails five files the plan leaves unrenamed.** Status: OPEN.
Rows 40, 41, 48 (`components-v2-data-layer`, `isValidUrl`, `sub-component-actions` — M4a "no change") and rows 7, 44 (`shapes-v2`, `mutual-exclusivity` — "title-only strips") do not match `^[a-z][a-zA-Z0-9]*\.[a-z][a-zA-Z0-9-]*\.test\.tsx?$` (verified: no `<module>.<behaviour>` dot form; `shapes-v2` also carries a hyphen in the module segment). AC4's class is "every file vitest collects", so M5 step 2 reads five failures against files the plan said to leave alone. Impact: the implementer either fails M5 or renames five files outside any disposition row. Recommendation: the plan decides which — extend M4a to rename them (five rows, pure-refactor evidence as for the rest), or state the predicate's exemption class explicitly. Either is a one-line change; leaving it ambiguous is not.

**M-2 — The naming cross-check has a hole exactly where today's IDs live: lowercase.** Status: OPEN.
Verified: `shapes.m9f-dropped-types.test.ts`, `limits.fqa17-parity.test.ts`, `utils.d34-case.test.ts` all pass the positive form (the behaviour segment admits `[a-z][a-zA-Z0-9-]*`), and the negative form's `(M|MS|CR|QA|F-?QA|D|EC|L)-?[0-9]+` is case-sensitive, so none is caught. 41 of the 48 current filenames carry their IDs in lowercase (`013-m9f-…`, `013-fqa17-…`, `013-qa-cr24-6-…`); a rename that keeps the token and adds a module prefix satisfies both forms. Impact: axiom (C)'s "never a chain, milestone, ticket" is unenforced for the most likely rename shape. Recommendation: the cross-check names the lowercase members of its class (a case-insensitive negative form is the obvious property; how it is run is QA's).

**M-3 — The negative predicate's domain is wider than axiom (C)'s and matches product data.** Status: OPEN.
Axiom (C) governs names and titles; the negative form runs over whole files and demands 0 lines outside `// escaped:`. Verified today: of 273 matching lines, 14 are neither titles nor comment lines — `mkdtempSync(join(tmpdir(), '012-backfill-report-'))` ×4 (row 3), a fixture `new Date('2026-08-23T00:00:00Z')` (row 4), `// D11` code comments and an `it.each` row label `'… M8-D member …'` (rows 14, 16, 12), `D17` inside `it.each` format strings (row 37). Rows 4, 12, 14, 16, 37 are M4a "no case change"; the fixture date is product data the predicate cannot distinguish from provenance. Impact: M5 step 2 and M1's doc check read non-zero on a clean tree, or M4a quietly edits code lines it declared untouched. Recommendation: state the negative form's domain as a property (filenames, `describe`/`it` titles, and comments — enumerated from the file's own syntax) and name the residue class it cannot distinguish (ISO timestamps in fixture data; zero-padded literals) rather than assuming it empty.

**M-4 — "Rubric goes into CLAUDE.md verbatim" contradicts M1's own acceptance.** Status: OPEN.
M1 accepts only if the negative predicate over `agent-output/CLAUDE.md` → 0. The rubric as written carries `D34`, `(D8)`, `(D9)`, `(D2)`, `M2`, `013-owner-*`, "item 4", "(M2)" — every one a hit. The last two class-table rows and the parenthetical rulings are dispositions of chain 014, not conventions. Impact: M1 cannot pass as specified; whichever way the implementer resolves it is an undeclared edit to the standard. Recommendation: the plan states which text is the evergreen standard (axioms, classes with predicates and dispositions, naming forms, helper policy, instrument note) and which is this chain's application of it (the D34 and `013-owner-*` rows, ruling citations) — the latter stays in the plan.

**M-5 — M3 opens eleven test files the plan says only M4 opens; ordering is left "any order".** Status: OPEN.
"Each of the 48 test files is opened by exactly one milestone" is false: lifting `make*` touches rows 5, 7, 40, 42, 44; `data(o)` rows 1, 14, 15; `author()` rows 25, 26, 27 — all also in M4a (or M4c for 14, 15). Handoff Notes then say "M1, M3, M4a/M4b in any order". Core Responsibility 9b (serialise shared files) applies. Impact: two milestones' evidence over the same file (M3's "pass set unchanged", M4a's "pass set identical before/after") have no defined before/after tree; a rename in M4a and an import rewrite in M3 land in an unstated order. Recommendation: name the order (M3 before M4a is the natural one — helper adoption is then part of the pre-rename tree) and correct the ownership sentence to the eleven-file overlap.

**M-6 — M3's acceptance grep contradicts M3's own "leave" decision and catches a file in no family.** Status: OPEN.
`grep -rc 'function data(\|function author(\|function make[A-Z]' … → 0` will read 10 for `makeEditable*` (rows 9 and 48, which M3 decides to **leave**) and 1 for `makeRes()` (row 8, in no family; verified). Impact: M3 cannot be accepted as written. Recommendation: the acceptance names the lifted families' exact symbols as its class, or the "leave" family is the stated residue.

**M-7 — M5 step 5 / H7 instrument flags a kept file that does import production code.** Status: OPEN.
`grep -rL -E "from '(~|bot)/"` returns row 8 (`012-valid-exposure.test.ts`) today because its imports are `await import('~/pages/api/v1/…')` (verified, two sites). Row 8 is an M4a pure rename, so the sweep reads 1, not 0, at the merge SHA. The predicate collapses "imports production code" to one syntactic form. Impact: a false failure at the gate, or an allow-list the next writer widens. Recommendation: state H7's class as "no import of a production module by any import form the runner resolves" and let QA pick the instrument.

**M-8 — AC2 / M4a evidence: "pass set identical before/after" has no stated identity across a title strip.** Status: OPEN.
The vitest JSON reporter keys cases by file path and full title; M4a changes both. AC2's "a case is retained iff its disposition is rename/keep" needs a key that survives the rename or a per-row mapping. Impact: the coverage-neutrality proof the value statement promises ("per-deletion proof that no coverage was lost") is unverifiable as specified for 31 files. Recommendation: name the artifact class that carries the identity — an old→new title mapping column in the disposition table, or a per-file (count, zero-failures) pair as the retained-set property — not which tool reads it.

**M-9 — AC7's instrument is a stage whose rule says it does not review tests alone.** Status: OPEN.
AC7: "instrument: code review reads the diff for arithmetic over production symbols." code-reviewer.md ("A diff touching only test files … never opens a round of its own: test adequacy is QA's gate, and tests are reviewed beside the production code they cover, never alone"). This chain has no production diff. Impact: (E)'s only named check has no owner unless someone decides CR runs here anyway — and that decision is not in the plan. Recommendation: name the holder (QA's adequacy sweep under V-27 is the natural one) or record, with route, that a scoped CR runs on this chain.

**M-10 — Axiom (E) is universal; AC7 scopes it to file 46 plus M4c.** Status: OPEN.
The inventory tags three further M4a files as carrying local transcriptions of production logic: row 14 (`function switchToClassic` at `012-send-gate-partition.test.ts`), row 20 (`modeAfterLoad`, `confirmationFor`), row 22 (`producerHash`, `consumerHash`) — all verified present. Whether each is an oracle (an (E) violation) or a fixture is undetermined, and M4a treats all three as pure renames. Impact: the standard the doc will teach is broken by three files kept under it on day one, or is not — nobody has looked. Recommendation: disposition the three under (E) (H5 rewrite, or a one-line "fixture, not oracle" note per row in the disposition table), or name them as (E)'s residue class in AC7. This is the same shape as the inventory's "could not classify" items and belongs in the rubric's application, not in a new class.

### Low

**L-1 — M1 symlink instrument and reproduction.** Status: OPEN. `readlink` prints the link text (`agent-output/CLAUDE.md`), not a resolved path; "resolves to the canonical file" is `readlink -f` or an existence test on the link. Separately, the unversioned symlink has no recorded recreation for a fresh workspace — the plan should say where that one line lives (the implementation doc, or the doc's own four-repo map).

**L-2 — M2 analysis brief (e): the POC's dependency install site is unstated.** Status: OPEN. A POC mount needs the candidate harness installed; installing into `website` touches `package.json`/lockfile on a shared tree, and a rig outside `website` cannot resolve `~` or Next. The brief should name the install mechanism and its tree effect so the analyst does not improvise one. Question, not design.

**L-3 — Rubric (C) module segment forbids hyphens; hyphenated production basenames exist.** Status: OPEN. `interactions-edge.ts`, `interactions-server.ts` (verified) cannot be named per (C) as written. No test targets them today; the doc is evergreen, so the form should admit the workspace's own basenames or state the transform.

**L-4 — Risks table "Record per pass" column not written at rev 2.** Status: OPEN. Every row still reads "rev 1: …"; planner.md requires the record per subsequent pass. Trivial; land with the next revision.

**L-5 — H4's class is enumerable only by self-declaration.** Status: OPEN — stated limit, no revision asked. "The file states, or the record shows, it passed at HEAD when written": the inventory's weakness 1 says no instrument sees "was seen to fail". Record it as a limit in the rubric (the class's only enumerator is the file's own admission) so the next writer does not read H4 as mechanically swept.

**L-6 — M0 step 2's `find` expression.** Status: OPEN. `find src -name '*.test.ts' -o -name '*.test.tsx'` works (implicit print binds to the whole expression) but the inventory's own form included `-o -name '*.spec.ts'`; consistency between the two counts' commands is the point of the instrument note.

## Questions

1. (M-1) Rename the five non-conforming "clean"/"title-only" files, or exempt them? Owner's call only if the planner wants the predicate to stay exactly as written.
2. (M-9) Does a scoped code review run on this test-only chain? The coordination plan's step 2 lists one; code-reviewer.md says a test-only diff opens no round. Whoever holds AC7 must be named.
3. (L-2) Where does the analyst install the harness candidates for the POC?

## Risk Assessment

Low for production — no product code moves. The chain's real risk is the one the value statement names in reverse: teaching a standard whose own gates read wrong on a clean tree (M-1, M-3, M-6, M-7), which the next chain would inherit as "the predicate is advisory". All ten Mediums are one-to-three-line criterion corrections; none reopens a register row, and none touches D13's reopening class.

## Recommendations

REQUEST REVISION, pass 1 of cycle 1 (rung 1–5). Revise M-1–M-10; L-1–L-6 at the planner's discretion in the same pass. No new guards, subsystems or acceptance machinery are proposed — every recommendation names a class or an artifact class already in the plan.

Standing prediction for the Risks register (not Critical, so no register row is required — recorded here so pass 2 can report against it): *an acceptance predicate in M5 reads non-zero on a tree the disposition table declares complete.* Falsifier: any M5 command whose result the implementer explains rather than reproduces.

## Revision History

| Pass | Artifact rev | Findings addressed | New findings | Status change |
|---|---|---|---|---|
| 1 (2026-08-26) | rev 2 `0540f34` | — | M-1–M-10, L-1–L-6 | OPEN |
