---
ID: 014
Origin: 014
UUID: 4671e28c
Status: Committed
Status-Detail: >-
  Phase 1 complete against plan rev 8. Test strategy, Irreversible Side-Effect Register and the
  AC7 axiom-(E) enumeration land here; the implementer is unblocked from M0. BLOCK-1 (npm/pnpm)
  was RESOLVED by rev 5 independently of this pass. No PASS verdict is issued or implied by this
  document — the suite has not been run in full.
Verified-At: "f2c85f5c7e3ad03879845ae1116518dc71cf2077 (website, chain branch chain/014-test-suite-cleanup) — source tree confirmed clean for src/ bot/ package.json before every capture. agent-output at e766b8c."
---

# QA Report: Plan 014 — Hooks test-suite cleanup (pilot)

**Plan Reference**: `agent-output/planning/014-test-suite-cleanup.md` (revision 8, agent-output `47a4138`)
**QA Status**: QA Complete
**QA Specialist**: qa (`qa-hooks-14`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-27T04:56 | uat-hooks-014 → devops-hooks-014 | Stage 1 closure | **`Status` set to `Committed` (was `QA Complete`, which stays the verdict of record in the Verdict section) and this document moved to `qa/closed/`** by devops Stage 1 step 8. The `QA Complete` verdict at website `f2c85f5` is unchanged and was carried forward, not re-litigated. **Still owed by this document's author: a dated reconcile note for UAT-1** — the register carries two distinct rows both numbered **BC-7** (`BC-7/AC8` in the Phase 1 register; `BC-7/row-19` in the Phase 2 appended table). Devops did **not** renumber it: a record is corrected by its author. A closed document is still corrected in place. |
| 2026-08-27T05:50 | steering-test-cleanup (owner sanction: "Steering writes the note", qa-hooks-014-2 unreachable) | UAT-1 reconcile | **Dated reconcile note, no renumbering:** the register carries two distinct rows both numbered **BC-7** — the Phase 1 row (AC8, next planner cites the conventions doc) and the Phase 2 appended row (row 19 persist-gate path unreachable). Both stand; downstream records (UAT, deployment) cite them as **BC-7/AC8** and **BC-7/row-19**, which is the disambiguation of record. Numbers already cited elsewhere are not changed. Route: UAT-1 found by uat-hooks-014, routed to qa; written by steering on the owner's word 2026-08-27. |
| 2026-08-27T05:05 | planner-hooks-014 → qa-hooks-014-2 | Phase 2 verdict at `f2c85f5` (plan rev 16) | **QA Complete.** Suite and typecheck re-derived, not cited: 566/566, exit 0, 51 files; typecheck exit 0 both programs. TDD gate passes on a verified premise — **0 production files changed chain-wide** (`git diff --numstat a74b9e2..f2c85f5 -- src bot`, 71 paths, all tests), which also discharges IS-6 across the chain in one stroke. Property audit run per criterion AC1-AC8. Two findings, neither blocking: **QA-3** row 47 carries an oracle repair but sits in the M4a section whose format has no evidence column — I supplied the missing AC6 evidence myself by mutation; **QA-4** one concrete instance of Phase 1's named split-line residue, confirmed non-discriminating by the same mutation. AC2 could not be independently replayed end-to-end — stated, not papered over. |
| 2026-08-27T03:55 | planner-hooks-014 → qa-hooks-14 | Plan rev 8 (`47a4138`) | **QA-1 CLOSED**, verified on five limbs against the text. Row 13 dropped from M4a (M4b-only); the stale row-15 sentence removed; rows 14 and 15 named as the only M4b→M4c exceptions; partition restated and now enumerated — M4b's ten rows listed explicitly. The critic reached the same defect independently at cycle 2 (M-13/M-14, `bd49f93`) — two instruments agreeing, which is the corroboration this workspace's hazards file says to look for rather than a re-run of the first. |
| 2026-08-27T03:30 | planner-hooks-014 → qa-hooks-14 | Plan rev 7 (`78616ec`) consuming this document | Re-anchored on rev 7. M0's instruments and AC2's key corrected in the plan; M4b's oracle list now **points** to this document's AC7 enumeration rather than restating it, with the "at Phase 1" qualifier preserving the class as open — the right citation form. **QA-1 raised** (below): consuming the enumeration put row 13 into two milestones and falsified a standing sentence about row 15. Found by re-reading the revision rather than the summary of it. |
| 2026-08-27T03:05 | planner-hooks-014 → qa-hooks-14 | Plan rev 6 (`52ff3f9`), critic pass 3 | Re-anchored on rev 6. **Two Phase 1 findings adopted plan-wide**: INST-3 becomes the plan's exit-code observable (any pass-set acceptance in M0/M2/M3/M4a/M4c/M5 satisfied only at exit 0), and the Validation instrument becomes `pnpm run typecheck` — the planner establishing the stronger form of my point, that a bare `npx tsc --noEmit` type-checks **none** of the 48 because `tsconfig.json` excludes `**/__tests__`. BC-5 residue gains `DiscordMessageEditor`. AC7's rows 13/15 remain routed to the implementer via this document, not via a plan edit. |
| 2026-08-27T02:40 | planner-hooks-014 → qa-hooks-14 | Plan rev 5 (`72cde0a`) consuming the M2 analysis (`50f053a`) | Phase 1 re-anchored on rev 5. **BLOCK-1 RESOLVED** — rev 5 replaced the npm install/restore paragraph independently, and records it as the planner's error never applied; this pass's measurement corroborates rather than drives that. New **INST-3** from rev 5's exit-code finding: AC2's pass-set key is not sufficient on its own, at any comparison point. BC-1/BC-2/BC-5/BC-6 restated. |
| 2026-08-27T02:10 | planner-hooks-014 → qa-hooks-14 | QA Phase 1 under D16 (QA first; implementer after Phase 1 lands) | Phase 1 written. Irreversible Side-Effect Register produced. AC7 enumerated by a captured instrument: named class 4 files → **27 candidate files**, of which **2 new genuine violations** (rows 13, 15). M0 step-3 assumption **closed by measurement** ahead of M0. One **blocking** finding (BLOCK-1, pnpm/npm), two instrument findings (INST-1, INST-2). AC8 registered as the chain's post-deploy observable. |

## Timeline

- **Test Strategy Started**: 2026-08-27T01:05 UTC
- **Test Strategy Completed**: 2026-08-27T02:10 UTC
- **Implementation Received**: 2026-08-27T04:50 UTC (M5 closed, website `f2c85f5`)
- **Testing Started**: 2026-08-27T04:50 UTC
- **Testing Completed**: 2026-08-27T05:05 UTC
- **Final Status**: **QA Complete** at website `f2c85f5`

## Documents read

Plan 014 rev 4 + R-1 (body in full; changelog latest entry only, per revise-by-replacement);
`analysis/test-inventory-2026-08-26.md` in full; `critiques/014-test-suite-cleanup-critique.md`
(`265b383`) in full; `verification/README.md`.

**Recorded absences — cited because my definition names them, not because they were expected:**

- The QA stage README that my definition points at — a README.md under agent-output's qa
  directory — **does not exist** (`ls -d` → No such file or directory). My agent
  definition instructs me to work the checklist there. There is none, so this pass follows the
  definition's own process text and this absence is the citation that would otherwise have been a
  document reference.
- `agent-output/roadmap/` carries no epic; the plan records `Epic Alignment: none registered`. No
  architecture document addresses tests (`architecture/website.md`). Both re-derived, not inherited
  from the critique.
- `analysis/014-test-suite-cleanup-analysis.md` **does not exist yet** — `analyst-hooks-14`'s M2
  document is open. Phase 1 did not need it and did not wait on it; nothing below depends on a
  finding from it. Where a strategy element is contingent on it, the contingency is stated as such.

---

## Phase 1 scoping statement

The critique cycle reasoned over the plan's design properties and approved it. Under my definition
Phase 1 is therefore **scoped — not skipped — to the coverage-obligation half**: the half a critique
structurally cannot produce, being about the *suite's input space* rather than the design's
properties. The Irreversible Side-Effect Register (below) is mandatory under any narrowing and is
produced in full.

Concretely, this pass answers, per named risk class, the two questions a critique does not ask:
*which fixture makes each conjunct carry the decision alone*, and *does the class have a member in
both directions*.

---

## FINDINGS

### BLOCK-1 — `website` is a pnpm project; M2's rev-3 install site and its restore command were both npm, and the restore command could not execute at all

**Status: RESOLVED at plan rev 5 (`72cde0a`), independently of this pass, before any install
happened. Retained in full because the measurement is the record of why it mattered, and because
the register row it produced (BC-1) survives it in changed form.**

Rev 5 replaced the paragraph and records it as *"the planner's error and never applied — the analyst
kept its own rig and the tree stayed clean"*, with the forward step now `pnpm add -D jsdom`. That is
the correct disposition and it is the planner's, not mine: this pass reached the same conclusion from
the tree at roughly the same time, and **corroborates it rather than causing it**. The account below
stands as written at 02:10; it is not restated as though it had been a live block after 02:40.

Plan 014's M2 paragraph ("Install site for (e)") instructs the analyst to install harness candidates
with `npm install --no-save` in `website`, and states that `node_modules` "is restored by `npm ci`
when the analysis closes". The critique recorded this as L-2 RESOLVED. Both halves are wrong against
the tree, and the second is not merely suboptimal — it is inoperable.

Measured at `website` `a74b9e2`, 2026-08-27, re-derived at write time:

| Fact | Instrument | Result |
|---|---|---|
| `package.json` declares a package manager | `cat package.json` | `"packageManager": "pnpm@10.28.2"` |
| Lockfile present | `ls -d package-lock.json pnpm-lock.yaml yarn.lock` | `pnpm-lock.yaml` **only**; no `package-lock.json`, no `yarn.lock` |
| `node_modules` layout | `ls -d node_modules/.pnpm node_modules/.modules.yaml node_modules/.package-lock.json` | `.pnpm/` and `.modules.yaml` present (pnpm symlink farm); `.package-lock.json` **absent** |
| pnpm available | `pnpm --version` | `10.28.2` (corepack `0.34.6`) |

**`npm ci` without a `package-lock.json` does not run.** Verified by executing it — not by recalling
the documentation — in a scratch directory holding only a minimal `package.json`
(`/tmp/qa14-npmci-probe`, npm 11.9.0):

```
npm error code EUSAGE
npm error The `npm ci` command can only install with an existing package-lock.json or
npm error npm-shrinkwrap.json with lockfileVersion >= 1.
```

The probe was run in a temp directory precisely so that establishing this cost the shared tree
nothing.

**Why this is blocking rather than a tidy-up.** `npm install` into a pnpm-managed `node_modules`
does not add a package beside the others; it rewrites the tree from a pnpm symlink farm into a flat
npm tree. The plan's stated undo (`npm ci`) then fails on the missing lockfile, and the actual undo
(`pnpm install --frozen-lockfile`) is nowhere in the plan. So the documented sequence ends with
`website/node_modules` in a state no instruction in this chain restores.

Three things sit downstream of that `node_modules` right now:

1. **M0's baseline**, the run every AC2 comparison in this chain is keyed to.
2. **`verification/014/node_modules`**, a symlink to `website/node_modules`, placed by
   `analyst-hooks-14` for the M2 rig (verified live: `lrwxrwxrwx … -> /usr/local/bin/hooks/website/node_modules`).
   This workspace has a recorded hazard in which a probe rig's `node_modules` degenerates and the
   probe then reads as *failing at the tree* when the rig is what broke.
3. **This session's own probes**, which ran against that `node_modules`.

**Held, not cleared — and it held.** My definition binds me here: shared-tree state another session
placed — installed dependencies included — is held, and the gate is held *before* the destroying
step, not after. `analyst-hooks-14` owns the M2 rig, and per rev 5 it kept its own rig and never ran
the npm pair. **As of 2026-08-27T02:05 the destruction had not happened**: `jsdom`, `happy-dom` and `@testing-library/react` are all absent from `node_modules`,
`.pnpm/` is intact, and `website` is clean at `a74b9e2`. This finding is therefore **prospective and
still cheap** — which is the only reason it is worth raising at Phase 1 rather than at Phase 2.

**Recommended correction as written at 02:10 — superseded by rev 5, which adopted the first option** (M2's paragraph is
plan text, and the install is the analyst's act):

- install with `pnpm add -D <pkg>` (or `pnpm add -D --lockfile-only=false` per the analyst's need),
  restore with `pnpm install --frozen-lockfile`;
- or, if the `--no-save` property is the point, note that pnpm has no exact `--no-save` equivalent
  and the honest substitute is to install into the **rig**, not into `website`, leaving
  `website/node_modules` untouched entirely;
- either way the restore command must be one that exists, and the M2 acceptance line should require
  the post-restore `node_modules` shape to be re-derived (`.pnpm/` present) rather than assumed.

**Failure mode in operator terms**: if this is not ruled before the analyst's POC install, the
baseline that every AC2 comparison in chain 014 is keyed to may be captured against, or invalidated
by, a `node_modules` that no instruction in the plan can put back — and the resulting red suite will
look like the test cleanup having broken the tests.

### INST-1 — M0 step 2 pairs `numTotalTestSuites` with the 48-file count; they do not measure the same thing

The inventory already established that the static `it(` site count (570) and vitest's
`numTotalTests` measure different things, and the plan records that as an instrument note. **The
same defect exists one level up, in `numTotalTestSuites`, and neither the plan nor the critique
names it.** M0 step 2 instructs the implementer to record the 48-file `find` count "beside
`.numTotalTestSuites`", which invites exactly the false-deficit reading the plan's own instrument
note was written to prevent.

Measured, running one file (`isValidUrl.test.ts`) through the JSON reporter:

| Quantity | Value |
|---|---|
| files run | 1 |
| `describe` sites in that file (`grep -cE`) | 1 |
| `testResults.length` | 1 |
| **`numTotalTestSuites`** | **2** |

So `numTotalTestSuites` is neither the file count nor the describe count: on this evidence it is
**files + describe blocks**.

**Falsifiable prediction for M0**, stated so it can be wrong: across the suite,
`grep -c ''` over the `find` list = **48** files and `grep -rcE '^[[:space:]]*describe(\.[a-z]+)?\('`
sums to **157** describe sites, so `numTotalTestSuites` should read **205**. If M0 reads 205 the
model holds. **If M0 reads anything else, the model above is wrong and the reconciliation predicate
must be re-derived before AC2 leans on it** — do not reconcile against 48 either way. The quantity
that *is* comparable to 48 is `testResults.length`.

### INST-2 — AC2's identity key needs the file path; `fullName` is not unique across 48 files

Not a defect in the plan, a refinement it should carry before the implementer builds on it. See the
next section for the measured shape.

### INST-3 — an all-passed pass set does not mean a successful run, so AC2's key is not sufficient on its own

**Raised by the M2 analysis and carried into plan rev 5's M2 acceptance; extended here, because it
is not only M2's problem.**

Rev 5 records that the analysis found vitest runs which *report every case passed and exit 1*, from
post-teardown module rejections in the edit page's eager `import()`s, and adds "the vitest process
exits 0" as an M2 acceptance property because "the pass set alone cannot see this failure".

That is right, and its scope is wider than M2. **AC2 — the criterion the whole chain leans on — is
keyed on the per-case pass set.** If a tree can be all-passed and still exit 1, then AC2 is
satisfiable by a tree whose test run failed. The pass set is a necessary condition for "no coverage
lost"; it was never a sufficient one, and until rev 5 nothing in the chain measured the difference.

**Consequence for every comparison point in this chain, not just M2**: the exit code is a conjunct of
the comparison, recorded beside the JSON at M0, at M2, and at M5 — and a baseline captured without it
cannot be repaired later, because the process that produced it is gone. This is why BC-2 now names it.

Corroborating datum from this pass: the single-file reporter probe exited **RC=0**, so the shape
captured in it is a clean-run shape and is sound as the AC2 key's evidence. That is a fact about one
small node-project file, **not** about the suite — the failure rev 5 describes arises from the edit
page's imports, which that file never touches.

---

## M0 step-3 assumption: CLOSED BY MEASUREMENT, ahead of M0

The critique's own **Assumption Not Checked** was that the vitest ^4.1.2 JSON reporter emits
per-case `assertionResults` (name + status), and the planner routed it to the implementer at M0 step
3. My definition directs Phase 1 to hand the implementer **probe shapes** — *prove the comparand
exists on the live path before building the comparison that consumes it*. AC2's entire identity key
is that comparand, so this pass proved it rather than passing the assumption along.

Instrument: `verification/014/qa-phase1/probe-json-reporter-isValidUrl.json`, produced by

```
npx vitest run src/utils/__tests__/isValidUrl.test.ts --reporter=json \
  --outputFile=../agent-output/verification/014/qa-phase1/probe-json-reporter-isValidUrl.json
```

**Scoped deliberately to one small file, not the suite** — M0's baseline is the implementer's act
and its first-run character is load-bearing; a Phase 1 probe must not pre-empt it or contaminate it.

**Result — the assumption holds.** `assertionResults` is present, per case:

```json
{ "ancestorTitles": ["isValidUrl"],
  "fullName": "isValidUrl accepts valid https URL",
  "status": "passed",
  "title": "accepts valid https URL",
  "duration": 1.489, "failureMessages": [], "meta": {}, "tags": [] }
```

Top-level keys: `numTotalTestSuites, numPassedTestSuites, numFailedTestSuites, numPendingTestSuites,
numTotalTests, numPassedTests, numFailedTests, numPendingTests, numTodoTests, snapshot, startTime,
success, testResults`. Per-file entries carry `assertionResults, startTime, endTime, status,
message, name`, where `name` is the **absolute** file path.

**INST-2, stated precisely.** AC2 keys retained cases on the disposition table's
`old title → new title` column. `title` and `fullName` are **file-local**, and this chain renames
every file — so the key the implementer must build is the pair
**(`testResults[].name` normalised to a repo-relative path, `assertionResults[].fullName`)**, with the
*file* side of the pair also mapped old → new. A key on `fullName` alone will silently collide the
moment two files share a case title, and this suite has 48 files with heavily repeated title
vocabulary. Two consequences for the disposition table: it needs the **file** rename mapping to be
machine-readable alongside the title mapping, and the absolute paths in `name` must be normalised
before comparison or every key changes when the checkout path does.

---

## AC7 — axiom (E) enumeration over every case in the suite (QA's exclusive obligation)

The plan assigns AC7 to me and states its residue as *"any transcription the inventory did not tag —
a bounded class QA enumerates by its own instrument"* (critique L-9 stripped the instrument the plan
had named, leaving the choice to me). Phase 1's job is to make that class a **list**, not a promise.

**The instrument is captured, not narrated**: `verification/014/qa-phase1/ac7-sweep.js`, output at
`ac7-sweep-a74b9e2.txt`, README in the same directory. It runs from the `website` root.

### Enumeration predicate — quote this with any count below

Domain: the **48** files matched by
`find src \( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' \)` at `a74b9e2`.
Production-symbol domain: **308** exported names over **315** non-test sources under `src/` + `bot/`.
Axiom (E) is enumerated in limbs, because its three clauses have different mechanical signatures:

| Limb | Predicate | Excludes |
|---|---|---|
| **E1** oracle-by-formula | the matcher's argument **calls a symbol imported from `~/` or `bot/`** | expectations split across physical lines — E1 is a **floor** |
| **E2** oracle-by-source-text | the file reads a production module's text under `src/`/`bot/` | — |
| **E3a** transcription, expected side | the matcher's argument references a **test-local computing** name | fixture builders, by a body classifier — not by a name list |
| **E3b** transcription-as-subject | the assertion's subject is a test-local computing name **and the subject reaches no production symbol on that line** | subjects that call production directly or via member access (`shape.safeParse(`) |
| **E3b-indirect** | same, through **exactly one** intermediate variable | two-hop chains — named residue, not absence |

### The predicate was falsified twice by its own known-instance check, and both are recorded

My definition requires that a class predicate be derived from the class's *definition*, that every
known instance fall inside its matches, and that a known instance outside the matches falsify the
**predicate**, not the instance. It did, twice:

1. **First predicate** — "a test-local callable whose name collides with a production export".
   It matched **none** of the plan's four named violators (rows 46, 14, 20, 22). It was a coordinate
   list fitted to the single instance whose name happened to collide (`switchToClassic`); the other
   three transcribe production *logic* under invented names (`modeAfterLoad`, `confirmationFor`,
   `producerHash`/`consumerHash`). Discarded, not patched.
2. **Second predicate** — same-line matching only. It missed **row 14**, a named violator, whose
   transcription reaches the assertion through an intermediate variable across two lines
   (`const after = switchToClassic(draft); expect(after.flags).toBe(4);`). This is what the
   E3b-indirect limb exists for.

After both corrections **all four named violators fall inside the matches** (candidate lines: row 46
→ 4, row 14 → 19, row 20 → 10, row 22 → 8). The check is re-runnable from the captured output.

### The instrument has a positive control, and the control caught a third defect

Per "a new instrument is mutated before its result is trusted": a scratch tree (`/tmp/qa14-control`)
with one production module, one clean test, and three planted violators (E1, E3b, E3b-indirect).

**The control's first run flagged only the E1 plant and missed both transcription plants.** Cause:
suppressing a TS-generics false positive (`Record<string, unknown>` reading as operators) had been
done by stripping `<` and `>` wholesale, which also blinded the classifier to a planted `n > 10`.
Fixed by classifying on the function **body** rather than the signature — the signature being where
generics live — and restoring comparison operators. Final control state: all three plants flagged,
the clean file correctly silent (the negative control fires nothing).

### Result

**27 of 48 files carry at least one axiom-(E) candidate**, under the predicate and exclusions above.
Per-limb file counts: E1 **4**, E2 **12**, E3a **3**, E3b **10**, E3b-indirect **17**.

**Independent cross-check, unprompted and passing:** E2's 12 files are *exactly* the inventory's 12
H1 files, path for path — two instruments built independently from different definitions agreeing on
a set, not merely on a count.

### Adjudication — candidates are not violations

The plan's named AC7 class is 4 files. The sweep's candidate set is 27. Adjudicating by reading:

| File (inventory row) | Limb | Verdict | Reasoning |
|---|---|---|---|
| `012-message-mode` (13) | E1 | **VIOLATION — new, not named by the plan** | `expect(applyModeSwitch('v2', prev)).toEqual(switchToV2(prev))`. The expected value *is* a production function's output. A defect in `switchToV2` moves code and oracle together and the case still passes. It tests **delegation**, not behaviour. |
| `012-validity-predicate` (15) | E1 | **VIOLATION — new, not named for this reason** | `expect(isMessageValid(x)).toBe(validateMessage(x) === '')`, ×3. Two production functions cross-checked; a shared defect moves both. Row 15 is in the plan, but as H1-partial and M3/M4c — its axiom-(E) character is unrecorded. |
| `plan-005-bug-fixes` (46) | E3a | VIOLATION — already named (M4b) | `${avatarIndex}` computed by the formula under test. Confirms the plan. |
| `013-m1-fix-round-1-hash-parity` (22) | E3a/E3b | VIOLATION — already named (M4b) | `expect(consumerHash(…)).toBe(producerHash(…))` — **both** sides test-local. |
| `013-fqa31-…-actual-mode` (20) | E3b | VIOLATION — already named (M4b) | `modeAfterLoad` / `confirmationFor` are local transcriptions occupying the subject position. |
| `012-send-gate-partition` (14) | E3b-indirect | VIOLATION — already named (M4b) | `switchToClassic` transcription via an intermediate. |
| `plan-005-qa-validation` (47) | E3a | **Candidate — implementer to adjudicate at M4b** | Shares row 46's provenance and idiom; not separately read at this pass. Flagged so it is not lost. |
| `012-backfill-report` (3) | E1 | NOT a violation | `expect(reportPath('a')).not.toBe(reportPath('b'))` is an **injectivity property** over one function. A constant `reportPath` fails it. Discriminating. |
| `013-m1-transport-form` (23) | E1 | NOT a violation **as a set** | `hashMessage` distinctness/determinism properties. Caveat worth carrying: L67 (`expect(hashMessage(a)).toBe(hashMessage(b))`) is vacuous under a constant `hashMessage`; L51/57/61 are what kill that mutant. Do not let a future "simplify" pass delete the siblings and keep L67. |
| `sub-component-actions` (48), `008-qa-validation` (9), `012-valid-exposure` (8) | E3b-indirect | NOT violations — fixture-reference class | `expect(result[0]).toBe(section.components[0])` compares production output against the **input fixture**. That is correct identity-preservation testing. |
| `components-v2-data-layer` (40) | E3b | NOT a violation (weak) | `hasAnyKey` / `collectKeys` are local **assertion helpers over production output**, not transcriptions of production logic. Noted: `expect(new Set(keys).size).toBe(keys.length)` is self-referential in form and worth a glance at M4a. |
| remaining E2 files | E2 | Already dispositioned | The 12 E2 files are the inventory's H1 set; M4b/M4c already own them. No new obligation. |

**AC7 scope delta the implementer must absorb: rows 13 and 15 join the M4b oracle-repair list.** The
plan's AC7 residue clause anticipated exactly this; it is now enumerated rather than promised.

**Residue this instrument does not see, stated so it is not read as zero:** expectations split across
physical lines; transcription chains of depth ≥ 2; a transcription reached through an object property
or an array of functions; and any oracle whose contamination is semantic rather than syntactic. AC7
is discharged at Phase 2 by re-running this sweep against the end state **and** by reading every case
M4c writes, since new cases are not covered by an enumeration taken at `a74b9e2`.

---

## Irreversible Side-Effect Register (MANDATORY)

Enumerated for this chain rather than inherited. The chain writes no product code and touches no
user-visible flow, so the classical publish/charge/migrate families are empty — but "irreversible"
here means *evidence that cannot be recovered once destroyed*, and that class is **not** empty.

| # | Irreversible side effect | Route(s) that can trigger it | What must be true first | Enforced identically on every route? |
|---|---|---|---|---|
| IS-1 | **`website/node_modules` rewritten from the pnpm layout** | M2 analysis POC install; any `npm install` in `website`; any `npm ci` | Owner/analyst ruling on BLOCK-1; a restore command that **exists** (`pnpm install --frozen-lockfile`); M0 baseline already captured | **NO** — the plan names an npm route whose undo is inoperable. This is BLOCK-1. |
| IS-2 | **Deletion of a test file that is the only record of a defect** | M4b rows 43, 11; the row-3 never-red case; the row-7 D34 case | The handoff exists **and is committed** before the delete commit; or a named covering test | Partly — the plan requires the handoff for row 43 (D2) but states the ordering only in prose. Ordering must be evidenced by commit order, not asserted. |
| IS-3 | **Loss of the baseline pass set** | M0 not captured, captured to a path that is later cleaned, or captured against a mutated `node_modules` | M0 runs **first**, at `a74b9e2`, output committed to `verification/014/` | Single route, but the output path sits beside another session's rig — see IS-5. |
| IS-4 | **A rename losing a case's identity** | M4a, M4b, M4c renames | `old title → new title` **and** old→new *file* mapping recorded at the moment of the rename | Route-uniform, but INST-2 shows the recorded key is currently under-specified. |
| IS-5 | **Destruction of another session's rig state** | `npm ci` / `rm -rf node_modules` in `website`; any cleanup of `verification/014/` | Ask `analyst-hooks-14`; record the ruling — including a ruling that the new state is the intended steady state | **NO** — nothing in the plan names the analyst's rig as state to be held. |
| IS-6 | **Mutation testing left applied** | M4b/M4c evidence gathering (axiom A, H4, H5, H9 all require a local mutation) | Mutation is local and **restored**; restoration verified by `git -C website status --porcelain` being clean **and** the case green again | Route-uniform in the plan's wording; the *verification* of restoration is not stated anywhere. Add it. |

**Handed to the implementer as input, not as a post-hoc audit** (this register is a design-time
artifact). Two entries are not merely notes: **IS-1 is BLOCK-1**, and **IS-6** needs an explicit
restoration check in the disposition table, because a mutation left applied in a test-cleanup chain
is indistinguishable from an intended edit.

### Bounded mutation sweep owed at Phase 2

Each register entry's guard carries a bounded mutation sweep in Phase 2, seeded at that guard's
branch conditions and decision constants; **every survivor recorded with a disposition, equivalent
mutants recorded rather than dropped.** For this chain the guards are the M5 predicates, and the
sweep seeds are: the positive-form naming regex (each alternation branch), the ID-token class (each
token family), the M5 step-4 allowlist of two files, and the M5 step-5 import predicate. A spec
written to close a survivor counts as evidence only once seen **red under the mutant it targets** and
green against the shipped code.

---

## TESTING INFRASTRUCTURE NEEDED

Deliberately short. This chain's infrastructure question was **M2's**, and at the time this section
was first written M2's analysis was open — pre-empting it would have been inventing requirements the
analyst was commissioned to determine. It closed at rev 5 and its determinations are recorded below
as cited, not re-derived.

**Present and verified at `a74b9e2`** — no action needed:

- vitest **4.1.2** installed (`node_modules/vitest/package.json`), config `include:
  ['src/**/*.test.ts']`, `environment: 'node'`, aliases `~`→`src`, `bot`→`bot`.
- JSON reporter emits per-case `assertionResults` — measured, above.
- `tsconfig.test.json` **exists**, and `package.json`'s `typecheck` script is
  `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`.

**Determined at plan rev 5** (from the M2 analysis; recorded here, not re-derived — the analysis is
cited, and this pass did not run the harness):

- **jsdom**, via vitest `test.projects`: a node project over `src/**/*.test.ts`, a dom project over
  `src/**/*.test.tsx`. Environment follows the extension. No `@testing-library/react`; React DOM
  `createRoot` + `act`. Forward step `pnpm add -D jsdom` — which resolves BLOCK-1 as a forward
  matter and turns `package.json` + `pnpm-lock.yaml` into tracked, reviewable changes.
- **Helpers sited at `src/**/__tests__/helpers/`**, because `src/test-helpers/` would enter the
  production tsc program. This converges with item 1 below from the opposite direction and makes it
  sharper, not weaker.

**Still needed:**

1. ~~**Plan correction, Validation section**~~ — **closed at rev 6**; recorded as raised because the
   register row it produced (BC-6) stands. As written at rev 5: It specifies `npx tsc --noEmit`
   only. That checks production sources. This chain edits, renames and creates **test** files plus a
   new helpers directory which rev 5 deliberately sited *inside* `__tests__/` so the base tsconfig
   **excludes** it. So after rev 5 the base invocation covers the new helpers even less than before,
   and `tsconfig.test.json` is the only thing that types them at all. The Validation line should be
   the repo's own `typecheck` script — **both** invocations, including `-p tsconfig.test.json`.
   Without the second, a rename or a helper extraction that breaks a test-only type resolves to green
   at M5 and red for the next chain that typechecks.
2. **No new frameworks, libraries, or config files** are needed for M0, M1, M3, M4a, M4b or M5. M2's
   are settled above.

---

## Property audit — per acceptance criterion, what class is the example an example of?

Asked and answered in writing per criterion, as my definition requires. *Checking that a test
discriminates for the specified behaviour is not checking that the specified behaviour covers the
property.*

| AC | The example it names | The class it is an example of | Does the plan's instrument enumerate the class? |
|---|---|---|---|
| AC1 | one disposition row per inventory row | the 48-row input class | **Yes.** Count-and-path against the inventory. Closed. |
| AC2 | a case that passed at baseline and is retained | the baseline per-case pass set | **Yes for cases, NO for the key.** See INST-2: `fullName` is file-local and every file is renamed. Fix the key before relying on it. |
| AC3 | a deletion naming a covering test | disposition = delete | **Yes**, but see IS-2: the plan states the handoff-before-delete *ordering* in prose only. Evidence it by commit order. |
| AC4 | a basename passing the positive predicate | every basename vitest collects | **Partly.** The positive form is enumerated over `find` output; the **negative** form's three domains carry a named string-literal residue. The residue is bounded and correctly named (critique verified 9 members). Accepted. |
| AC5 | `// escaped:` on a kept bug-form test | M5 step-6's list (expected: rows 46, 47) | **Yes** — and note the *both-directions* obligation below. |
| AC6 | a converted case seen red under a mutation | disposition ∈ {convert, oracle-repair} | **Yes** by the evidence column; **but** nothing verifies the mutation was *restored*. See IS-6. |
| AC7 | rows 46, 14, 20, 22 | **every case in the suite** | **Not by the plan's instrument — by mine.** The named class is 4 files; the candidate class is 27; two new violations found (rows 13, 15). This is the criterion where the example most badly under-covered the property, which is exactly why the plan assigned the class to QA rather than the example. |
| AC8 | the next chain's planner citing `agent-output/CLAUDE.md` | post-chain human observation | **Registered below.** It is not mechanically checkable in this chain by construction. |

### Class tests need a discriminating control in **both** directions — per named risk sub-class

The M5 sweep is a set of blocklist predicates ("→ 0 lines", "→ 0 files"). **Every one of them passes
against an empty or mis-rooted file list.** A blanket-zero result and a correct result are
indistinguishable unless each predicate has a member that makes it *fire*. This is owed per named
sub-class, not once for the sweep:

| M5 step | Negative direction (must read 0) | **Positive control owed — a member on which the predicate FIRES** |
|---|---|---|
| 2 positive naming form | every basename passes | a basename that **fails** it (e.g. a scratch `m9f-dropped.test.ts`) — proves the regex is anchored and reachable |
| 2 negative ID-token form | 0 lines outside `// escaped:` | a line carrying **each token family** (`M1`, `F-QA15`, `CR-3`, `D34`, `012`, a `2026-…` date) — six sub-classes, six controls, **not one** |
| 3 `.skip`/`.only` | 0 | a planted `it.only` — the inventory measured 0 at `a74b9e2`, so this predicate has **never been seen to fire in this repo** |
| 4 `readFileSync` allowlist | exactly two named files | a third file reading `readFileSync` — proves the allowlist is an allowlist and not a tautology |
| 5 production-import predicate | 0 files | a test file importing nothing from `~`/`bot` — the row-43 shape, which **disappears from the tree at M4b**, so the control must be planted deliberately once row 43 is gone |
| 6 `// escaped:` count | equals the bug-form file list | a file with the marker that is **not** on the list, and one on the list **without** it |

**Every guard must be observed failing at least once before its test counts as evidence.** Step 5's
control is the sharp one: the only member of its class in the tree today is deleted by this very
chain, so after M4b the predicate reads 0 for two different reasons — because it works, and because
nothing can trigger it. Those must be told apart by planting, running, and removing a control.

Ask of every fixture: *can this fixture represent the case this code path exists to handle?* For the
M5 sweep the dominant risk is not a wrong assertion but a **file list that cannot express the failing
case** — a mis-rooted `find`, a `--include` that excludes `.tsx` after M2 admits it, or a predicate
run from the wrong cwd. Each M5 command should be run once from the wrong root, deliberately, and
seen to produce a *different* answer.

### Conjunct coverage

Two M5 predicates are compound and their conjuncts can mask each other:

- **AC4's positive form** is `basename matches the shape` **AND** `neither segment contains an ID
  token`. A name failing both is not evidence for either. Owed: a fixture where the shape is correct
  and only the ID token decides (`utils.m1-transport.test.ts`), and one where no ID token appears and
  only the shape decides (`utils.test.ts`).
- **M5 step 4** is `readFileSync present` **AND** `file not on the two-name allowlist`. Owed: a
  file on the allowlist *without* `readFileSync` — otherwise the allowlist is never the deciding
  conjunct and its removal would be invisible.

This is not answerable by reading — mutually masking conjuncts are invisible to code review and to a
green suite — and is answerable cheaply by mutation.

---

## Test Strategy (Pre-Implementation)

**Frame.** This chain's "user" is the next planner or implementer in this workspace. The product
being tested is **the suite itself plus the conventions document**; the failure that matters is *the
next chain copies a pattern this chain was supposed to remove, or loses coverage it was supposed to
keep, and nobody notices*.

**No product-behaviour change exists in this chain** — no user-visible flow, confirmed against the
plan and the tree. There is therefore no e2e layer and nothing for a running build to demonstrate.

### Critical scenarios, from that user's perspective

1. **Silent coverage loss across a rename.** The highest-frequency operation in the chain (28+
   files) is also the one whose failure is invisible: a case that quietly stops being collected
   reads identically to a case that was renamed. Guarded by AC2 — *provided* INST-2's key is fixed.
2. **A conversion that is green for the wrong reason.** An M4c behavioural test that mounts nothing
   and asserts on a null render passes. Guarded by AC6's red-under-mutation requirement, which is
   why AC6 is not negotiable down to "the test passes".
3. **A source-text test already rotted to vacuous truth being counted as coverage lost.** The plan's
   own Risks table names this and closes it at M0. Worth restating as a *strategy* point: for any
   H1 case, "it passed at baseline" is **not** evidence it was testing anything. Before M4c claims a
   conversion preserves coverage, the original case must be shown to fail against a mutation of the
   surface it names — otherwise the conversion replaces nothing.
4. **The conventions document teaching a pattern the suite no longer contains.** M1's acceptance
   already requires every fenced command to run as written and the negative predicate to read 0 over
   the doc. Add: the class table's classes must be exactly the classes the disposition table uses —
   in **both** directions (no class defined-but-unused, none used-but-undefined).
5. **BLOCK-1's failure mode**, above.

### Test types

Unit only. No integration or e2e layer exists or is warranted: there is no service, no database
path, no network call, and D14/012's no-live-POST constraint is inherited but inert here (no
converted test may reach the network — M2's harness must be offline, which the analyst should state
explicitly).

### Telemetry Validation

**Not applicable, and recorded as considered rather than skipped.** This chain adds no runtime code
path, so there is no normal-vs-debug telemetry classification to make. The nearest analogue is the
inventory's "instrumentation gaps" section, whose *normal* recommendation — a standing predicate that
every test file imports at least one `~/` or `bot/` symbol — the plan has already adopted as M5 step
5. Its *debug* recommendations (mutation runs; a one-off `SKIP_ENV_VALIDATION=1` run to measure how
many of the 36 `vi.mock('~/env.mjs')` lines are load-bearing) are correctly scoped as run-once and
discarded; **neither should be wired into the suite**, and I concur with that.

---

## Acceptance criteria for QA's own Phase 2 pass

Phase 2 does not begin until the implementer's document lands. It will:

1. **Re-derive, never cite.** Every count carried forward is re-run — the plan's numbers (48/570/157)
   and the implementation document's alike. Test adequacy is this gate's alone: the diff is
   test-only, so it reaches code review only for M2's non-test files under V-27, and nothing else
   audits it.
2. **TDD compliance gate first.** With a caveat the implementer should hear now: the standard TDD
   Compliance table asks "test written first / failure verified / passes after". **Most of this
   chain is not new feature code** — it is deletion, renaming and oracle repair. The table's rows
   apply cleanly to M4c conversions and M5 controls, and to the oracle repairs (each owes a
   *new expectation shown red against a one-token mutation of the production formula*, per H5). For
   pure renames the honest analogue is AC2's pass-set parity, not a fabricated red/green. **I will
   not reject M4a rows for lacking a red phase, and I will reject any table that invents one.**
3. **Treat "pure rename" as a claim, not a category.** Behaviour preservation is established by
   executing both trees over the affected surface, not by reading the diff's file list.
4. **Re-run the AC7 sweep at the end state** and read every case M4c writes, since an enumeration
   taken at `a74b9e2` does not cover cases that did not exist then.
5. **Execute the both-directions controls** tabulated above, and record each as observed-firing.
6. **Verify mutation restoration** (IS-6) across the whole chain, not per row.
7. **Re-anchor `Verified-At`** on the tree actually tested.

---

## BLOCKING RELEASE CONDITIONS — chain 014's register

> **BLOCKING RELEASE CONDITION** — each item must be executed and recorded before the release act,
> except rows classed *post-deploy-observable*, which gate the **chain's closure** and never the
> release act.

This is chain 014's **single** blocking-condition register, minted here. Any later gate-scoped pass
**appends** to it rather than minting a parallel ID space, and names this register when it does.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| BC-1 | observable pre-release | M2's forward step leaves the pnpm layout intact and changes **only** `package.json` + `pnpm-lock.yaml` | `ls -d node_modules/.pnpm` before and after `pnpm add -D jsdom`; `git -C website status --porcelain` naming exactly those two files plus test paths | implementer (no human needed) | At M2 | `.pnpm/` present both times; no `package-lock.json` created | An npm-shaped install would leave `website/node_modules` in a state the chain cannot restore, and the resulting red suite reads as the cleanup having broken the tests | implementer | **OPEN — de-escalated at rev 5** (was BLOCK-1; the npm pair was never run) |
| BC-2 | observable pre-release | M0 baseline exists at `a74b9e2`, committed, with per-case `assertionResults` **and the process exit code recorded beside it** | the M0 baseline JSON named in the plan's M0 step 1, under the chain's verification directory |  implementer (no human needed) | M0, before M3 opens any file | `numFailedTests` readable; `testResults.length` = 48; exit code recorded | Without it AC2 has no left-hand side and every "no coverage lost" claim in the chain is unfalsifiable. Without the **exit code**, a baseline that reported all-passed while the process failed cannot be told apart later — the process is gone (INST-3) | implementer | OPEN |
| BC-3 | observable pre-release | Each M5 predicate observed **firing** on a planted control, then the control removed | the six controls tabulated above | implementer (no human needed) | After M4c, before M5's clean run | each predicate non-zero on its control, 0 after removal | A mis-rooted `find` or an over-anchored regex reads 0 for the wrong reason, and the sweep certifies a suite it never examined | implementer | OPEN |
| BC-4 | observable pre-release | Every mutation used as AC6/H4/H5/H9 evidence was restored | `git -C website status --porcelain` clean at M5 **and** the case green | implementer (no human needed) | At each disposition row's close | clean tree | A mutation left applied in a test-cleanup chain is indistinguishable from an intended edit and ships as one | implementer | OPEN |
| BC-5 | observable pre-release | AC7 re-run at the end state; rows 13 and 15 dispositioned; **every** case M4c writes read — a set widened at rev 5 to `NewMessageModal`, `SaveAsMenu` and `edit/page.tsx`, with `EmojiPicker`, the dynamics wrappers and (rev 6) `DiscordMessageEditor` named as residue | `verification/014/qa-phase1/ac7-sweep.js` at the merge SHA + reading | qa (no human needed) | After M4c | candidate set re-adjudicated; no unrecorded violation | Axiom (E) is declared universal; a PASS over an unenumerated class is the exact shape by which a green suite certifies an exploitable gap | qa | OPEN |
| BC-6 | observable pre-release | `pnpm run typecheck` green at the merge SHA — **adopted as the plan's Validation instrument at rev 6**, on the stronger ground the planner established: `tsconfig.json` excludes `**/__tests__`, so a bare `npx tsc --noEmit` type-checks *none* of the 48 files this chain edits | `npm run typecheck` in `website` | implementer (no human needed) | At M5 | exit 0 | A rename that breaks a test-only type is green at M5 and red for the next chain that typechecks | implementer | OPEN |
| **BC-7** | **post-deploy-observable** | **AC8** — the next feature chain's planner **cites `agent-output/CLAUDE.md`** (via the symlink) instead of re-deriving the conventions | the next chain's planning document + that chain's retrospective | the next chain's planner / retrospective agent | **Not decidable in chain 014.** Earliest: the first planning document opened in this workspace after 014 releases | A single citation refutes non-adoption by construction — one observation is sufficient, and no distribution needs to accumulate | The document is written, symlinked, correct — and simply not read, so the suite drifts back to the patterns this chain removed and the pilot answers nothing about whether Statbot should follow (D1) | roadmap / the next chain's planner | **OPEN — gates chain closure, NOT the release act** |

**Standing note on this list**: it is point-in-time. Later stage documents — the UAT document, then
the deployment record — are authoritative on each item's execution state. A reader landing here must
not take these states as current.

**On BC-7 and the "user-reported defect" rule**: my definition requires a chain fixing a
user-reported defect to register at least one post-deploy observable distinguishing fixed from
unfixed in production. **Chain 014 fixes no user-reported defect** — it is a test-suite cleanup with
no product surface — so that rule is satisfied vacuously, and BC-7 exists for a different reason:
AC8 is the chain's only claim about the future, and the value statement rests entirely on it.

**Every plan validation line designating an operator-observed check becomes a register row.** Plan
014 designates **none** — no line asks the owner to observe anything, consistent with there being no
user-visible flow. So no row here is owned by the owner, and BC-7's subject is a *stage*, not a
person. That is the correct outcome, recorded so a later reader does not read the absence as an
omission.

---

## QA-1 — rev 7's consumption of the AC7 residue broke the plan's one-milestone file-ownership rule

**Status: CLOSED at plan rev 8 (`47a4138`), verified 2026-08-27T03:55.** Raised 03:35 against rev 7;
never gated M0–M3, and the implementer was held off M4b/M4a before it could bite. Retained in full
because the failure mode it names is silent by construction and worth the next reader's time.

**Closure evidence — five limbs, each checked against the plan text, none inferred from the report of
the fix**: (1) M4a's list now begins `Rows 1, 2, 4, 5, 6, 8, 9, 12, 17` — row 13 gone; (2) `grep -c`
for the stale "Row 15 is M3 + M4c only" sentence → **0**; (3) the exception is now named — *"the only
exceptions to one-milestone ownership, named: rows 14 and 15 are opened by M4b (oracle repair) and
then M4c … M4b completes first"*; (4) the partition reconciles again and is now **enumerated** rather
than asserted — M4b's ten rows listed by number, `10 + 27 + 13 = 50, rows 14 and 15 counted twice →
48 distinct`; (5) M4b still names rows 13 and 15, so the disposition this pass asked for survived the
ownership fix rather than being reverted with it.

**Independently corroborated.** The critic reached the same defect at cycle 2 (M-13/M-14, `bd49f93`)
without seeing QA-1. Two instruments built from different starting points agreeing is the
corroboration this workspace's hazards file names as the reliable signal — as against re-running the
first instrument, which reproduces stably and reads as confirmation.

*The account below is as written at 03:35 against rev 7 and is not restated as though still live.* Recorded here rather than only in a message because
the defect was introduced by consuming *this* document, which makes it mine to carry.

Rev 7 added rows 13 and 15 to M4b's oracle-repair list — the correct disposition, and the one this
pass asked for. But the plan states a file-ownership invariant, verified verbatim in rev 7:

> "Each test file is opened by M3 (helper import lines only, no case or title change) and then by
> **exactly one** of M4a/M4b/M4c; no two of those open the same file."

with **exactly one** named exception (row 14, opened by M4b then M4c). After rev 7 there are two more,
neither named:

| # | Defect | Verified against rev 7 |
|---|---|---|
| QA-1a | **Row 13 is now in both M4a and M4b.** M4a's rename list still reads `Rows 1, 2, 4, 5, 6, 8, 9, 12, **13**, …`, and M4b's oracle list now names `row 13 012-message-mode`. | `grep -o` over both lists in `planning/014-test-suite-cleanup.md` |
| QA-1b | **"Row 15 is M3 + M4c only" is now false.** M4b's oracle list names row 15. | same |

**Why this is not cosmetic.** The two milestones carry *incompatible evidence rules*. M4a is "pure
renames, title strips … **no case change**", and its per-file evidence is per-file case count equal
on both trees. M4b's oracle repair **changes the expectation inside a case**. An implementer reading
row 13 as an M4a file will apply the no-case-change rule and skip the oracle repair — and the M4a
evidence it then records (case count equal, zero failures) will be **true**, because an unrepaired
self-referential oracle passes. So the failure is silent: row 13's axiom-(E) violation survives, and
the evidence column says the file is fine.

The fixed sequence (M4b before M4a) means the *ordering* is already safe; what is unsafe is that two
sections of the plan give the same file contradictory instructions and only one of them mentions the
other.

**Correction requested** (planner's, not mine to make): drop row 13 from M4a's list and name it in
M4b's ownership exception alongside row 14, or state explicitly that rows 13 and 15 are opened by
M4b then M4a/M4c under the same named-exception form row 14 already uses; and restate the row-15
sentence. Either shape is fine — what matters is that the exception is *named*, since the plan's
whole partition argument (the critique's "M4b 8 + M4a 28 + M4c 13 = 49, row 14 twice = 48 distinct")
is a reconciliation that now does not reconcile.

**Generalisation worth one line, because it will recur**: an enumeration handed from one stage to
another lands as *rows*, but the receiving plan's invariants are stated over *files*. Adding a row is
not a local edit when the file it names is already spoken for.

---

## Assumption Not Checked

**This pass assumes that the 48 files enumerated at `a74b9e2` are the files vitest actually
collects, and it does not test that.** The domain of every count in this document — the 48-file
input class, the 27-file AC7 candidate set, the 157 describe sites, the 205 predicted suite count —
comes from a `find` over the filesystem, **not** from vitest's own collection. The two can disagree:
`include: ['src/**/*.test.ts']` is a glob over a configured root, and a file `find` returns can be
excluded by root, by glob, or by a config change M2 is expected to make.

*Falsity signature*: the M0 baseline JSON (named in the plan's M0 step 1, not yet written) reporting
`testResults.length ≠ 48`, or
carrying a path `find` did not list. If that happens, **every file-scoped count in this document is
scoped to the wrong domain**, AC7's "27 of 48" is a fraction of the wrong denominator, and the
enumeration must be re-run against the reporter's file list rather than the filesystem's.

*Stage that owns closing it*: **the implementer, at M0**, by comparing `testResults[].name` against
the M0 step-2 `find` list path-for-path — not by comparing counts, since two different 48s can
disagree on membership. This is named again in the handoff below so it is routed, not shelved.

*Why it was not closed here*: closing it requires a full-suite run, and the full-suite run **is** M0
— the implementer's first act, whose first-run character is load-bearing evidence for a suite that
has never been executed. Pre-empting it from QA would consume the very fact M0 exists to establish.
The single-file probe was scoped deliberately to avoid that.

---

## Outstanding Items

Point-in-time; later stage documents are authoritative.

0. **QA-1 — CLOSED at rev 8**, verified on five limbs; corroborated independently by the critic at
   cycle 2. Nothing further owed.
1. **BLOCK-1 — CLOSED at rev 5**, independently of this pass and before any install ran. BC-1
   survives in de-escalated form: M2's `pnpm add -D jsdom` must be observed leaving the pnpm layout
   intact and touching only `package.json` + `pnpm-lock.yaml`.
1b. **INST-3 — ADOPTED at rev 6** as a plan-wide observable: every captured run records the exit
   code, and any pass-set acceptance is satisfied only at exit 0. Nothing further owed.
2. **Rows 13 and 15** join M4b's oracle-repair list (AC7 scope delta).
3. **Row 47** (`plan-005-qa-validation`) — E3a candidate, adjudication deferred to M4b.
4. **INST-1, INST-2** — instrument corrections for M0 step 2 and AC2's key.
5. **Validation section — ADOPTED at rev 6** (`pnpm run typecheck`), on a stronger ground than this
   pass gave: a bare `npx tsc --noEmit` type-checks none of the 48. Nothing further owed.
6. **IS-6** — mutation-restoration verification is owed a line in the disposition table.
7. **Critique L-7** (three ID tokens in text routed into the evergreen doc) and **L-8** (M4b's
   ownership exception names row 15, which M4b does not open) are still OPEN against plan rev 4.
   Both land at the next planner touch or the implementer's M1 write. **L-9 is discharged by this
   document** — AC7's residue is enumerated, and QA chose its own instrument.

## Handoff Notes

- **Analyst (`analyst-hooks-14`)** — nothing owed. BLOCK-1 was raised against rev 3's paragraph and
  rev 5 retired it before it could bite; the rig was kept and the tree stayed clean, which is the
  outcome the finding wanted. Your rig under the chain's verification directory, and its
  `node_modules` symlink, are **held, not cleared** by this stage. QA's own instruments live in a
  separate `qa-phase1/` subdirectory and touch nothing of yours.
- **Implementer** — three things before M0's first command: (1) the M0 step-3 assumption is
  **already closed**, evidence at `verification/014/qa-phase1/probe-json-reporter-isValidUrl.json`,
  so do not re-litigate it — but **do** close the Assumption Not Checked above by comparing
  `testResults[].name` against the `find` list **path-for-path, not by count**; (2) INST-1 —
  reconcile 48 against `testResults.length`, **never** against `numTotalTestSuites` (predicted 205);
  (3) INST-2 — AC2's key is the *pair* (repo-relative file path, `fullName`), with the file side
  mapped old→new; (4) INST-3 — record the **process exit code** beside the baseline JSON, and treat
  it as a conjunct of every later pass-set comparison, not as M2's concern alone. The Irreversible Side-Effect Register above is input to your work, not an audit of
  it.
- **Planner** — nothing outstanding that needs a plan edit. M2's install/restore commands were
  corrected at rev 5; INST-3 and the typecheck instrument were adopted at rev 6. **AC7's rows 13 and
  15 are deliberately *not* requested as a plan edit**: the plan's AC7 residue clause already assigns
  the class to QA's own instrument, so this document is where they belong and the implementer reads
  them here. L-7 and L-8 remain open against rev 6 — both non-gating, both next-touch.
- **Code reviewer** — unchanged: M2's non-test diff only.
- **QA (me), Phase 2** — on the implementer's document landing.

---

# PHASE 2 — Post-Implementation Test Execution

**Tree under verification**: `website` `f2c85f5c7e3ad03879845ae1116518dc71cf2077`, branch
`chain/014-test-suite-cleanup`. `git status --porcelain -- src bot package.json` empty before every
capture below — the SHA is a supportable identity, not an inherited one. Plan rev 16 (`56f23b6`),
whose criteria are unchanged since rev 9 apart from the rev-14 and rev-15 instrument corrections,
both of which this pass holds.

## Re-derived, never cited

Every number below is from this pass's own run. The implementation document's figures were read
only *after* mine, and are noted where they agree.

| Gate | Command | Result |
|---|---|---|
| Suite | `npx vitest run --reporter=json` | **566 passed / 566 total, 0 failed, 51 files** |
| Process exit | same run | **0** — recorded beside the counters, per this workspace's rule that a green pass set is not a green run |
| Validation | `pnpm run typecheck` | **exit 0** — both `tsc` programs (the base program excludes `**/__tests__`, so `tsconfig.test.json` is the only one covering the suite) |
| File domain | `find` + `os.walk`, compared by **path membership** | 51, identical sets, no diff either way |

Agrees with the implementer's independently captured `verification/014/final-f2c85f5.json`.

## TDD Compliance gate — PASS, on a premise I verified rather than accepted

The implementation document argues the standard table's rows do not apply because no new
function or class was authored. **That premise is now measured, not asserted:**

```
git diff --numstat a74b9e2..f2c85f5 -- src bot   →  71 changed paths, of which
                                                     NON-TEST (production): 0
```

Zero production files changed across the entire chain. So there is no new function or class for a
red/green cycle to attach to, and the exemption is legitimate.

The table it does provide carries 12 rows of real axiom-(A) evidence — each naming the mutation, the
cases that failed, and a `git diff`-empty restoration. It does **not** invent a red phase for pure
renames, which Phase 1 said in terms would be rejected. Gate passes.

**IS-6 (mutation restoration across the whole chain) is discharged by the same evidence.** Phase 1
asked for this chain-wide rather than per row, and the zero net production diff proves every
mutation made during M4b/M4c/M5 was restored — a stronger result than per-row attestations, since it
cannot miss one.

## Irreversible Side-Effect Register — outcomes

| # | Effect | Outcome at `f2c85f5` |
|---|---|---|
| IS-1 | `node_modules` rewritten from the pnpm layout | **Did not fire.** The npm route rev 5 removed was never run. Direct dependencies unchanged (79 → 79, no adds/removes/version changes); one devDependency added (`jsdom ^30.0.1`). |
| IS-2 | Deletion of a test that is the only record of a defect | **Fired once, correctly ordered, and evidenced by commit time rather than asserted**: row 43's handoff (`agent-output` `c5e1d59`, 00:34:55) precedes its delete (`website` `62b61bd`, 00:37:31) by **156 s**. Cross-repo, so ancestry cannot show this and timestamps are the only instrument. |
| IS-6 | A mutation left unrestored | **Did not fire** — see above, proven chain-wide. |

## Property audit — per acceptance criterion

Asked of each: *what class is the example an example of, and does the instrument enumerate the class?*

| AC | Verdict | Basis |
|---|---|---|
| AC1 | **MET** | All 48 inventory rows present in the disposition table, checked by **row-number membership**, not the piped `grep \| sort \| uniq -c` the record used — 0 missing, 0 out of range. |
| AC2 | **MET on the plan's own instrument, which is not independently verifiable by construction — see Assumption Not Checked** | The plan defines identity across a title strip as the table's `old title → new title` column. Two independent replays were attempted and **both failed to measure it**: verbatim `(file, fullName)` gives 0 survivors of 617 (every file was renamed), and ID-token-normalised titles give 261 of 617 (titles were *rewritten*, not merely stripped). The mapping *is* the identity, so consuming it would not be independent. |
| AC3 | **MET** | 3 deletions (rows 11, 43, 45); each names a covering test or an Outstanding Items line. Row 11 owes none (third-party source). IS-2 ordering evidenced above. |
| AC4 | **MET** | Two independently built instruments agree at `f2c85f5`: 51 files, 0 positive-form failures, 0 negative-form hits. My own controls fired **6/6 in both directions**, and the rev-14 widening admits exactly **13** files while rejecting **0** — it closes on its predicate, not on the instances that exposed it. |
| AC5 | **MET** | `grep -rc '// escaped:'` → exactly 2 files, both citing `005-user-reported-bugs-analysis.md`. Verified myself after **my own earlier claim that none existed proved false**. The exemption is load-bearing, not vacuous: both lines carry `005`, which *is* an ID token, and both *are* comment lines. |
| AC6 | **MET for 19 of 20; 1 record gap — QA-3** | Row 13 legitimately owes nothing (nothing was repaired; demanding a red phase there is what Phase 1 forbade). Row 47 is the gap. |
| AC7 | **MET, with one residue instance recorded — QA-4** | Sweep at `f2c85f5`: **E2 12 → 0**, **E3a 3 → 0**, 20 of 51 files carrying candidates. Rows 13 and 15 dispositioned under rev 12's carve-out with **both limbs executed by probe**. All 12 new files read whole for the four contamination classes a line-based sweep cannot see: **clean**; no test imports a production constant (verified by reading every import, presence-based). |
| AC8 | **REGISTERED, not checkable here** | Post-chain human observation by the next chain's retrospective. |

## AC2 — sharpened after this verdict, recorded beside it rather than over it

This pass reported AC2 as "met on the plan's own instrument but not independently replayed", which
reads as a QA limitation — something this pass did not get to. **The sharper characterisation,
established by `planner-hooks-014` at plan rev 17 (`0af3338`) and recorded here because a reader of
this document would otherwise take the weaker one:** the criterion names as its identity instrument
the disposition table's own `old title → new title` column — **a mapping authored by the hand it
measures.** That is a defect in the criterion itself, not in this pass's diligence, and no agent can
close it by trying harder: any replay consuming that column inherits whatever the column got wrong.

The practical consequence for anyone downstream is unchanged and is stated in Assumption Not Checked
below — AC2 rests on the per-transition chain of custody, and the row-by-row audit against
`verification/014/baseline-a74b9e2.json` is the **retrospective's** to own. The difference is in what
a reader should conclude: not "QA left this", but "this criterion cannot be discharged by the stage
that holds it".

**The verdict does not expire on this.** Rev 17 records a defect in a criterion this verdict
verified; it does not change what the criterion demands, and no production code moved — the tree at
`f2c85f5` is untouched. Recorded per the restating-and-correcting rule: the original line stands in
the table above, sharpened, not silently rewritten to look as though it always said this.

## FINDINGS

### QA-3 — row 47 carries an oracle repair but sits in a section whose format has no evidence column

`bugFixCoverage.supplemental.test.ts` (row 47) is bucketed **Kept (oracle-repaired)** by the step-7
reconciliation, and its own cell records "E3a candidate, adjudicated: fixed". But its table row lives
in the **M4a section** — "pure renames, no case change" — whose 4-column format carries no
`seen-to-fail evidence` column at all. AC6's designated instrument *is* that column, so AC6 had no
evidence for a row inside its class.

**I closed it by measurement rather than bouncing it.** Mutating the production formula
`(BigInt(id) >> 22n) % 6n` → `% 7n` in `src/utils/constructImageUrl.ts`:

- `handles maximum realistic Discord snowflake ID` → **RED** (`2199023255551` is `1 mod 6` but `3 mod 7`)
- `returns values in range [0, 5] for discriminator 0` → **RED** (`expected 6 to be less than 6`)
- restored; `git diff` empty; 28/28 green, exit 0 at head

So **AC6 is substantively satisfied for row 47** — the repaired literal expectations are
load-bearing. What is missing is only the *record*. Disposition: the implementer adds the evidence
cell; no re-verification is owed, because this pass supplies the evidence.

**The generalisable defect is the section format, not the row.** A row can be moved into a bucket
whose criterion demands evidence while sitting in a section that has nowhere to put it. Any future
row promoted from rename to repair inherits the same silent gap.

### QA-4 — a concrete instance of Phase 1's named split-line residue, confirmed non-discriminating

Phase 1 declared "expectations split across physical lines" as residue the sweep cannot see, and
stated it so it would not be read as zero. It is no longer zero — one instance, at
`bugFixCoverage.supplemental.test.ts::'handles discriminator as string "0000" (leading zeros)'`:

```
const url      = constructImageUrl('1000000000000000000', null, '0000');
const expected = constructImageUrl('1000000000000000000', null, 0);
expect(url).toBe(expected);
```

The expected value is produced by the function under test, one line above the assertion. E1 misses
it because the matcher's argument is a bare identifier; E3b-indirect misses it because that limb
explicitly excludes imported production symbols (`if (imported.has(callee)) return;`).

**Confirmed vacuous under the very mutation its own formula fails**: in the run above, this case
stayed **green** while its two literal-expectation siblings went red. Both sides move together.

**Not blocking, and it is not a defect on its own** — it is a parity property between two inputs,
adjudicated at Phase 1 as acceptable *as a set* where discriminating siblings exist in the same
file. They do. The hazard is a later "simplify" pass deleting the siblings and keeping this case,
leaving a file that asserts nothing and still reads as covered.

**This is the third member of one recurring class this chain has produced** — after the `hashMessage`
L67 caveat (Phase 1) and the `embeds: {}` mislabel (fixed at `f2c85f5`). Each is a case that looks
interchangeable with discriminating siblings and is not. Recorded for the retrospective as a class,
not three incidents.

## Assumption Not Checked

**This pass assumes the per-transition pass-set evidence composes into end-to-end AC2 preservation,
and it does not test that.** What went unexamined is the composition itself: each milestone's
identity check was executed and recorded at the point it happened, and one of them (M2) was
independently re-executed on both trees by the code reviewer — but no instrument in this pass, or
any other, replays the 617 baseline cases against the 566 final ones through the rename mapping
end to end. Both replays I attempted measured something else and I have reported them as failures
rather than as evidence.

**Observable signature if it is false**: a baseline case that was silently dropped rather than
deliberately dispositioned would appear as a surface with no covering test and no Outstanding Items
line — invisible to every green run, and visible only to a row-by-row reconciliation of the
baseline's 617 titles against the table's mapping.

**Owner**: the retrospective. The mapping needed to close this is the disposition table's own
`old title → new title` column, so closing it means auditing that column against the baseline
capture — work that belongs to a reader who is not consuming the column as their identity function.
Named again in the handoff below so it is routed, not shelved.

## Blocking-condition register — appended rows

Appended to the chain's single register minted in Phase 1. No parallel ID space.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| BC-7 | post-deploy-observable | Row 19's persist-gate choice path stays unreachable through the UI, and shipping this chain does not change that | Mount `NewMessageModal`, trip `gateBeforePersist.mustAsk`, press Save | uat agent (fallback: owner) | After merge | Save disabled before the choice prompt can appear | An operator hitting a content-loss draft gets a disabled Save and no explanation, and the choice UI he is meant to see never appears | uat | **OPEN — out of charter (D2), fix not attempted** |
| *(reconcile note 2026-08-27, steering on owner sanction)* | — | This row is cited downstream as **BC-7/row-19**; the Phase 1 register's BC-7 (AC8) is a distinct row, cited as **BC-7/AC8**. Numbering not changed (UAT-1). | — | — | — |
| BC-8 | post-deploy-observable | Row 43's deleted pin — the route-0 mount-effect init surface has no covering test | The handoff record's own repro | owner | Post-chain | Cached edits lost on route-0 init, as recorded | A user's cached edits vanish on load with nothing in the suite that would catch a regression | owner | **OPEN — handoff `message-init-cached-edits-lost-2026-08-27.md`** |
| BC-9 | post-deploy-observable | Toast-bearing surfaces actually show a transient notice to a user | Drive a code-fetch error and an in-flight save in a running build | uat agent | After merge | A visible toast in both cases | The suite proves `toast.error`/`toast.loading` were *called*, never that anything renders — `react-toastify` renders outside the mounted tree, so a regression that breaks rendering while preserving the call is invisible to every test in this chain | uat | **OPEN — no automated coverage by design** |

> **Standing note**: this list is point-in-time. The UAT document, and then the deployment record,
> are authoritative on each row's execution state.

## Verdict

**QA Complete** at `website` `f2c85f5`, plan rev 16.

Nothing found in this pass is a functional defect, and the chain's stated purpose is demonstrably
achieved on instruments built independently of the implementer's: the two classes it set out to
eliminate are **gone** (E2 source-text 12 → 0, E3a 3 → 0), the naming standard holds over all 51
files in both directions, and no production code was touched in the doing of it.

QA-3 is a record gap whose substance this pass supplied. QA-4 is a recorded residue instance,
non-blocking by the precedent Phase 1 set for its class. Neither warrants a fix round; both are
routed below.

Handing off to the uat agent for value delivery validation.
