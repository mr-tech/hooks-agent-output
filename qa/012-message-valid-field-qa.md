---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Verified-At: >-
  website chain/012-message-valid-field @ c85945f (committed clean tree: 22 spec files / 411
  tests, all green, this session's own run 2026-08-23 — re-anchored from 17cada0 by
  differential-scoped pass, rev 7; differential captured at
  agent-output/verification/012/qa-phase2-reanchor-c85945f/, zero movement over the verified
  surface, suite re-executed at the new anchor). c85945f's sole delta from 17cada0 is the two
  QA instruments, now committed — no content-identity fallback remains. project-utils master @
  749606d (M1-b re-read at the committed rollup). Any production-code change after this expires
  the verdict.
Status: QA Complete
Status-Detail: >-
  Phase 1 rev 3. Strategy complete and re-derived against plan rev 6 (`7af8936`), which enacted
  all three QA findings (D11, D12, F-QA2). R12/R13 closed by owner ruling. One new finding —
  F-QA8, M2-f's recovery is reachable but content-destructive — routes to the owner. Rev 3 adds
  F-QA9 (whitespace-content class, undecided truth condition) and F-QA10 (top-level-only detection
  is complete over the representable domain, not by checking; falsifier installed), and corrects
  rev 1's account of the JSON-modal path. Rev 4: R16 and R18 both **closed by owner ruling** —
  F-QA8 accepted with the guidance redirected to the JSON editor, F-QA9's live POST **withdrawn**
  in favour of measuring the population at M6-b. Successor rows R19 and R20 carry the executable
  residue. Rev 5: R19 and R15 both corrected against the critic's cycle-2 pass-2 items (F-QA11); an
  unrelayed ordering defect in the 5712-keyed rows found and fixed; the critic's static-reading
  assumption on D13's cost table closed by execution (EXT-3) — conclusion intact, justification
  replaced (F-QA12). Rev 5b: F-QA12's own instrument had the residue planner rev 10 risk row R6
  named — it transcribed the merge instead of calling it, so the refactor it guards against left it
  green. Closed: it now runs the shipped `updateMessage`/`saveMessage`, and the deep-merge mutant is
  **observed killing 4 of 6** where it previously survived all 6. Rev 5c: F-QA12 **narrowed by
  correction** — my rev-5 claim that `useApiMethods.ts` was "a third file neither review named" is
  false; the critic named it and credited the mechanism. Struck beside the original. The execution
  and the rev-5b pin stand; the finding is now a correction to QA's own account, not to the critic's.
  Rev 6 (Phase 2): full execution against `17cada0`. TDD gate passed with red re-derived at the
  chain base by this session's own worktree run (5/36 partition; all six implementer spec files
  failing in the recorded classes). Bounded mutation sweep executed: 10 mutants, 8 killed by their
  named fixtures, MS-4 survivor (pre-declared, routed), MS-8 survivor **found and closed** by a
  QA-authored spec seen red under the mutant. Round-6 code-review assumption (28-package refresh)
  closed by execution with its babel framing bounded. L5 closed by execution. Verdict: **PASS** —
  QA Complete; handing off to the uat agent. Rev 7: verdict re-anchored `17cada0` → `c85945f`
  (implementer committed the two QA instruments; delta re-derived, suite re-executed at the
  committed clean tree — 22 files / 411 tests green; differential captured at
  verification/012/qa-phase2-reanchor-c85945f/; code review round 7's Assumption Not Checked
  closed; the 402/408/411 figures reconciled each to its tree). **Rev 8 (2026-08-25, D23)**:
  QA-R4 and QA-R15 re-specified onto SCR-1, a purpose-made scratch record, after the owner's
  SQL repair of 5712/5842 removed their subject in both directions; superseded wordings kept,
  State cells routed. Subject discrimination executed and captured at
  verification/012/scratch-subject-SCR1/ (8/8 green at website a74b9e2; all 8 assertions seen
  red under 7 mutants). No row added (D18), no other row's requirements changed, D26 not
  reopened — both rows gate closure, not the send. Verdict unchanged and NOT re-anchored:
  Verified-At stays c85945f; a74b9e2 anchors the re-specification's readings only. **Rev 9
  (2026-08-25, D27)**: QA-R2 re-specified onto SCR-1 as well, folded into the same section. All
  three rows now share one subject, so an ordering constraint applies and is stated as a runnable
  sequence — create → R4 → R2 → R15 → dispose — R15 being a persisting act that ends the state the
  other two observe. Rev 8's contrary ordering sentence corrected in place, dated, with why it was
  defensible when written. R2's binary failure clause replaced by a three-way reading so a stale
  column cannot be misread as a field defect. Still no row added; Verified-At still c85945f.
---

# QA Report: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` (rev 4, commit `13b4d4c`)
**Critique Reference**: `agent-output/critiques/closed/012-message-valid-field-critique.md` (commit `cd742f7`, APPROVED)
**Contract**: `agent-output/handoff/message-valid-field-for-statbot-2026-08-23.md` (UUID 61f24e56) — owner-accepted, not amendable without him
**QA Status**: QA Complete (Phase 2 verdict PASS at `17cada0`; plan references above are the rev-4
originals kept for the Phase 1 record — Phase 2 executed against plan rev 23, code review round 6
`15de931`, implementation doc `1db8186`)
**QA Specialist**: qa (session `qa-hooks-012-1`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-25 | steering-hooks-012-2 | **D27** — owner's ruling on QA's rev-8 report: re-specify QA-R2 onto SCR-1 too, the same way as R4/R15 | **Rev 9.** R2 re-specified onto SCR-1 and folded into the existing section rather than a second one, since all three rows now share one subject and one lifecycle. R2's superseded wording kept, State cell routed, with the reason named: against a repaired 5712 its failure clause had become a **booby trap** — a `true` reading there is now the *correct* reading. **Self-correction, dated and in place**: rev 8's claim that *"R4 and R15 can now be executed at any time, in either order relative to R2"* was true when written (R2 still keyed on 5712) and is **false under D27** — three rows on one record, one of which persists, brings the interference back in the same shape. New authoritative subsection **SCR-1's lifecycle** states the constraint as a runnable order (create → R4 → R2 → R15 → dispose) because the owner runs these from steering's queue file, not from this document. R2's failure clause given a **three-way reading** rather than the original binary: a `true` on SCR-1 is a stale column (creation SQL did not set `valid`) if R4 showed the error, and a real field defect only if R4 did not — so **R4 disambiguates R2**, which is why it runs first. Recorded that SCR-1 is **rebuildable** where 5712 never was, so a voided observation costs a re-run, not a verdict. R3 untouched and still the paired positive control; SCR-1 additionally supplies both directions on a **single** record (`false` at R2, `true` at R15). D18, D24, D26 all unchanged; `Verified-At` again not re-anchored. |
| 2026-08-25 | steering-hooks-012-2 | **D23** — re-specify QA-R4 and QA-R15 against a subject that still exists, so something verifies D11 end to end before closure | **Rev 8.** Both rows re-specified onto **SCR-1**, a purpose-made scratch record (row-D/cell-B5 shape). Old wordings kept unedited, State cells routed. Reachability established rather than assumed: the 2026-08-23 **table-wide** backfill run found the stranded class had exactly 2 members (5712, 5842), both since repaired by the owner's SQL, and at `a74b9e2` **no supported UI route can mint another** — `switchToClassic` clears the bit, `switchToV2` empties content, and every import route disposes row D to Classic. So no *found* subject exists and D23's scratch-record option is the only live one. **Instrument captured, not narrated**: `verification/012/scratch-subject-SCR1/` executes the shipped predicate and mode-switch over the exact SCR-1 payload — 8/8 green at `a74b9e2`, and **all 8 assertions observed red** under 5 source and 2 fixture mutants. Its **sole-carrier control** is the load-bearing one: without it a mis-built SCR-1 (e.g. a bad username) is refused for the wrong reason and R4 passes vacuously — F-QA13's boolean trap one level up, since an unqualified *"Send is disabled"* does not discriminate either. SCR-1's creation prescribed so that **QA-R9/QA-R20 are untouched** (`valid = false` set in the same statement, so no backfill run is needed) and so that R4/R15 **drop out of the 5712 ordering constraint** — a reduction in the owner's queue; no other row's requirements changed. **D26 not reopened**: both rows are post-deploy-observable, gate closure and not the send, and the section says so flatly — the overlap (R15's act *is* the guidance's Route A) is disclosed as a consequence, never as a condition. `Verified-At` deliberately **not** re-anchored: this is a specification, not a verdict. New Assumption Not Checked booked and routed to devops (deployed SHA vs `a74b9e2`). |
| 2026-08-23 | steering-hooks-012 (carrying code review round 7, `06b204d`) | Differential re-anchor at `c85945f`; close round 7's Assumption Not Checked; derive the suite count, inherit no figure | **Rev 7.** Re-anchored: `Verified-At: c85945f`. Delta re-derived at the commit (parent = `17cada0`; two QA instrument files, zero production source); both md5s match this header's rev-6 identities. Suite **re-executed at the committed clean `c85945f`: 22 files / 411 tests green** — round 7's falsity signature did not fire; closed here. The three circulating figures reconciled to their trees (20/402 = `17cada0` committed alone; 21/408 = +repair-path untracked; 22/411 = +both instruments ≡ `c85945f`; 402+6+3=411 — ambiguity was citation, not measurement). Differential captured at `verification/012/qa-phase2-reanchor-c85945f/`. Rev-6 routing note (implementer to commit the instruments) struck as done, kept beside. Held until round 7's transfer ruling so both gates moved on one basis. |
| 2026-08-23 | planner, **routed via steering-hooks-012** (not the normal handoff — route recorded per steering's request) | Rev-27 registration write repaired by the planner (`63460d0`); R-numbering collision resolved at plan rev 28 | **Rev 6a.** Verified at the diff, not the relay: my rev-27 plan write carried two defects outside its declared scope, both mine — my Edit's anchor consumed the frontmatter's closing `---` without reproducing it (silent; would have broken machine-readable Status for every downstream reader), and I left the Revision/Status-Detail pairing at 26 while adding row 27 (a rule the plan has carried since rev 20; first violation by a non-planner stage). Prose byte-preserved; repairs verified in the committed tree. **Disposition answer: repair-in-place was right** — bouncing would have left a structurally broken header live in a shared tree for the length of a round, for two fixes with one unambiguous correct form each. **Method failure named**: my write procedure had no post-write structural check on documents I do not own. Control adopted: after any write to a frontmatter document, verify `grep -n '^---$'` still terminates the header, and diff my own hunk for consumed structural tokens before reporting the write. **Reciprocal naming clause adopted** (mirroring plan rev 28): this register's rows are cited **QA-R#** in cross-document text from this rev on; bare R# inside this document refers to this register, plan Risks rows are the plan's R1–R7. Retrospective material: the silent-defect class (structural damage outside the edited prose) is invisible to the author's own green checks by construction. |
| 2026-08-23 | steering-hooks-012 | **Phase 2** — post-implementation execution against `website` `17cada0`, carry-forward items named (round-6 assumption, round-1 red assumption, L5, typecheck blindness, Phase 1 data-conformance assumption) | **Rev 6, Phase 2 complete, verdict PASS.** All numbers re-derived by this session's own runs, none inherited. TDD gate: table complete; red re-verified at base `72dc7de` via throwaway worktree (5/36 partition red on the exact five named cells; all six implementer spec files failing in the TDD table's recorded classes). Full suite 20 files / 402 tests green on the committed tree (22/411 with the two QA instruments). `npm run build` and `tsc --noEmit` green by own run. Mutation sweep: 10 mutants, 8 killed by named fixtures; **MS-4 survivor** (backfill UPDATE's NULL guard — pre-declared unkillable here, routed); **MS-8 survivor found** (evaluationFailures category population deletable with suite green) and **closed** by QA-authored spec, red-under-mutant observed. Round-6 assumption closed with babel framing bounded (no `.babelrc`; SWC build, esbuild tests; babel reachable only via eslint tooling and styled-jsx peer). L5 closed by execution: delegate cases discriminate dispatch inversion (killed L5-A), literal cases carry branch coverage (killed L5-B) — no rewrite needed. Two findings opened (F-QA13 spec type-unsoundness LOW, F-QA14 record overstatement MEDIUM→routed). Handing off to the uat agent. |
| 2026-08-23 | steering-hooks-012 | QA Phase 1 — test strategy before implementation | Phase 1 written. Sources read in full: plan rev 4, critique (closed, APPROVED), both handoffs, workspace architecture record. Code read directly on both chain branches. Deliverables: executability determination, testing-infrastructure list, Irreversible Side-Effect Register, per-criterion property audit, pre-registered M2 partition spec (executed — Red confirmed), mutation sweep plan, seven findings, blocking-condition register. |
| 2026-08-23 | steering-hooks-012 (correction) | Owner ruling *"change, qa-1 will handle both"* — this session carries Phase 2 as well | Remit widened from Phase 1 only to the whole QA remit. Independence measures added (see *Independence Under a Single-Session Remit*) because the session that writes the strategy will later judge against it. |
| 2026-08-23 | steering-hooks-012 | Correction: rev 5's "a third file neither review named" is false as to the critic | **Phase 1 rev 5c.** Verified at the critic's committed record before acting, not on the relay: cycle-2 pass-2 names `useApiMethods.ts` and credits `updateMessage`'s wholesale `data` replace in **two** places. Two claims struck beside their originals — that the critic credited `standardizeMessage`, and that the file was unnamed by *either* review. Accurate history: **QA's** review credited `standardizeMessage`; the critic's was right by reading and simply unexecuted. F-QA12 narrows to *execution plus the rev-5b pin*, and must be cited downstream in that form. Error is QA's own: I characterised another document without opening it, while arguing that static reads cannot settle properties — the document was committed and one `grep` away. |
| 2026-08-23 | steering-hooks-012 | Planner rev 10 (`ed6845e`) risk row R6: EXT-3 would not go red under the refactor it guards against — QA's file, QA's call | **Phase 1 rev 5b.** Confirmed and **closed rather than accepted as a recorded gap**. EXT-3 transcribed the `updateMessage` merge, so it characterised a copy while being cited for protection of the original; the deep-merge falsifier left it green. It now calls the **shipped** `updateMessage` and `saveMessage` (identity-mocking `useCallback` only, no new dependency in a shared tree). Evidence is the mutant, not the claim: transcribed version **survived** it 6/6, shipped version **kills** it 4/6, one failure surfacing the operator-visible consequence — *"Components V2 messages cannot contain embeds or content."* Mutation performed on a file QA does not own under a restore-guard protocol; original md5 confirmed byte-identical afterwards. |
| 2026-08-23 | steering-hooks-012 | Critic cycle-2 pass 2 APPROVED (`a4bec32`); two items against this register relayed for re-derivation, plus a closure the critic named QA for | **Phase 1 rev 5.** All re-derived. (a) **R19 was wrong twice** — it named "V2 components + stranded flag", a *consistent* record needing no repair, while citing cell B3, which is *type-1 legacy* components; and it collapsed three shapes into two. Corrected; **F-QA11** opened on it as my own defect. (b) **R15 lagged M2-f's rev-7 flag-free clause** and was therefore **non-discriminating** — it passes on pre-D11 code via rebuild-as-V2. Corrected. (c) **Found unrelayed while checking (b)**: the register carried **no execution order** for the 5712-keyed rows, though R15 is a persisting act that destroys R2/R4/M6-c's preconditions; plan rev 9 leaves that sequencing to this document. Ordering note added. (d) The critic's uncovered assumption — D13's cost table verified by static reading, Load path never executed — **closed by execution**: new spec block **EXT-3** runs the real Load→save chain. Conclusion holds; **justification did not** (F-QA12). |
| 2026-08-23 | steering-hooks-012 | Owner rulings on R16 (F-QA8) and R18 (F-QA9), both taken back to him on the rev-3 correction | **Phase 1 rev 4.** Both rows **closed**. (a) **R16** — *"Stands, but point the guidance at the JSON editor"*: D11 stands, the preservation build is declined a second time on corrected facts, and the guidance becomes **shape-dependent** rather than one line. Steering records that the basis it first gave the owner was wrong in the direction that made accepting look cheaper, and that the rev-3 correction changed the outcome rather than decorating it. Successor row **R19** carries the shape-dependence, which is the part a one-line guidance would lose. (b) **R18** — *"Measure the population first"*: the M6-b category is taken and the owner's live POST is **withdrawn, not deferred**. Successor row **R20** carries the count. Recorded explicitly: a measured zero is **not** a tested-accepted — it closes the question *for this corpus, now*, and leaves Discord's general behaviour undetermined by anything in this chain. |
| 2026-08-23 | steering-hooks-012 | Relay of a read-only determination (statbot code-review question): whitespace-content gap, JSON-modal cost, top-level-only fragility. Re-derive before acting | **Phase 1 rev 3.** All three re-derived **by execution**, not accepted on relay. (a) **F-QA9** opened — whitespace-only content is not content to the gate (`content.trim()`), a class the frozen partition did not distinguish; M2 moves no whitespace verdict, so it is a **D1 truth-condition** question, not an M2-b risk. Registered as R18 and proposed as an M6-b category. (b) **Rev 1's JSON-modal account corrected** — measured, it drops `components` and `flags` but **preserves `content`**, so for 5712 it is *lossless* while D11's sanctioned path is the lossy one. F-QA8 updated beside its original text, not over it. (c) **F-QA10** — top-level-only V2 detection is complete over the representable domain, not by checking; executable falsifier installed. Spec extended to 36 tests (EXT-1, EXT-2). |
| 2026-08-23 | steering-hooks-012 | Relay: `check-repo` FAILing at 257; re-derive before acting. Plus owner rulings D11/D12 and plan rev 6 | **Phase 1 rev 2.** (a) Count re-derived independently: **257 confirmed**, exactly two from this document, both dangling repo-rooted citations to Phase-2 destinations. Fixed via the checker's own `check-repo:ignore` opt-out with stated reasons, plus a real `verification/012/README.md`; **re-run reconciles at 255**, zero from this document. (b) Plan rev 6 read: D11, D12 and F-QA2 all enacted. R12/R13 closed. (c) M2-e/M2-f traced and simulated — **new finding F-QA8**: M2-f's recovery is reachable but destroys the user's message content, and M2-f as worded measures reachability, not preservation. Spec extended to 30 tests. |

## Timeline

- **Test Strategy Started**: 2026-08-23
- **Test Strategy Completed**: 2026-08-23
- **Implementation Received**: 2026-08-23 (`17cada0`, code review round 6 APPROVED_WITH_COMMENTS)
- **Testing Started**: 2026-08-23
- **Testing Completed**: 2026-08-23
- **Final Status**: QA Complete (PASS at `17cada0`)

---

## Scope and Remit

This session carries **both** QA phases for chain 012, per the owner's ruling relayed by
steering-hooks-012 on 2026-08-23 (*"change, qa-1 will handle both"*). The original brief assigned
the post-implementation verdict to a separate session; that instruction was withdrawn explicitly by
the sending session and is recorded here so the change of remit is visible in the document rather
than only in a message.

### Independence Under a Single-Session Remit

A strategy written by the session that will later judge against it loses the independence a
two-session split would have supplied by construction. It has to be replaced by something a third
party can check. Four measures, all of them observable in the record rather than asserted:

1. **Expectations are frozen before the code exists.** Every expected verdict in this document and
   in the pre-registered spec (`website/src/utils/__tests__/012-send-gate-partition.test.ts`) was
   fixed at Phase 1 and committed before implementation began. Git history, not my word, is the
   evidence that they predate the code.
2. **Every sentinel expectation is sourced outside this codebase.** Record 5712's expected `false`
   comes from the owner's live Discord `400`/`50035`; the bare-Text-Display V2 shape's expected
   `true` from his live HTTP `200`. Neither is computed from a symbol or constant the repository
   owns. A fixture that derives its expectation from the code under test cannot fail under the
   defect it exists to detect.
3. **Each mutant is named together with the single cell that must kill it.** A Phase-2 sweep that
   reports a kill without the named cell going red has not reproduced the claim.
4. **Counts travel with their enumeration predicate and its exclusions**, so a later number is
   checkable against the population it was taken over rather than quotable bare.

At Phase 2 I will state, per criterion, whether the criterion was met **against the frozen
expectation** or whether the expectation itself moved — and if it moved, why, in the same line. An
expectation quietly edited to match an implementation is the specific failure this section exists
to make visible.

---

## Can This Strategy Be Executed Before the Owner-Gated Push? — determined, not assumed

steering-hooks-012 asked this directly rather than letting it be assumed. Determined against the
trees and the live environment, 2026-08-23:

| Fact | Instrument | Result |
|---|---|---|
| npm registry reachable | `npm ping --registry=https://registry.npmjs.org` | **PONG, 170ms** |
| `hooks-gg/project-utils` reachable over SSH | `git ls-remote git@github.com:hooks-gg/project-utils.git` | **`eb38a15` = HEAD = `refs/heads/master`** |
| …over anonymous HTTPS | `curl https://api.github.com/repos/hooks-gg/project-utils` | **404** — the repo is private; HTTPS-without-credentials is why a naive `git ls-remote https://…` fails |
| `website/node_modules` | `ls -d` | **absent** — the suite was not runnable when this pass began |
| `project-utils/node_modules` | `ls -d` | present |
| pnpm store holds a `hooks-gg/project-utils` git entry | listing of `~/.local/share/pnpm/store/v10` | **no** — the git entries there are all `DiscordStatbot/*` |

The SSH probe independently corroborates the critique's pin fact #8 (website pins `eb38a15` =
project-utils `master` HEAD) against the remote rather than against the architecture record, and
additionally establishes that **remote `master` has not moved since the pin was taken**.

**Determination.** The strategy is executable end-to-end before the owner-gated push, with one
sharp exception:

- **Executable now** — M2 and M3 unit coverage (`src/utils/limits.tsx` has no `project-utils`
  dependency at all); M4 and M5 integration coverage (they import `getPostgres` from
  `project-utils`, which resolves fine **at the old pin**, and the query/response assertions
  below need no database); M1-b (it reads `project-utils`' own committed `dist/index.d.ts` on its
  chain branch — no install, no push).
- **Not executable before the push** — a full `tsc`/`next build` typecheck of `upsertMessage`,
  because `values: InsertObject<DatabaseSchema, 'Messages'>` will name a `valid` column the
  installed old-pin `DatabaseSchema` does not declare; and the pinned-build proof (release
  condition 3), which is post-push by construction.

**The trap this creates, named so nobody walks into it.** Vitest does not typecheck. Throughout the
chain window the suite will be **green while `tsc` is red**, and the two facts look alike in a
report that says only "tests pass". The implementer must record the typecheck state as a separate
line from the suite result in every round, and Phase 2 will treat an implementation document that
reports only "tests pass" as incomplete rather than as passing.

---

## TESTING INFRASTRUCTURE NEEDED

1. **`pnpm install` in `website`** — `node_modules` was absent. Run with `--frozen-lockfile` so
   neither `package.json` nor `pnpm-lock.yaml` is touched (the pin is release-condition-3 material
   and must not drift). Requires the SSH key already present on this box; verified reachable above.
   *Status: executed by this pass — see Execution Record.*
2. **A `test` npm script.** `package.json` declares `vitest ^4.1.2` as a devDependency but carries
   **no `test` script**; every existing suite runs via a bare `npx vitest run`. Proposed:
   `"test": "vitest run"`, `"test:watch": "vitest"`. `package.json` is a shared production file on
   a chain branch, so this is **proposed to the implementer, not landed by QA** — flagged rather
   than edited.
3. **A Kysely query-compilation harness for M4** — no database required. Kysely's `.compile()`
   returns the SQL text and parameters, which is the instrument that settles M4-b's conflict-branch
   property directly (see below). Needs only `vi.mock('project-utils')` returning a Kysely instance
   over a dummy dialect.
4. **Hand-rolled `NextApiRequest`/`NextApiResponse` doubles for M5.** The repository has no API-route
   tests today. Deliberately **no new dependency** (`node-mocks-http` and friends are not warranted
   for two handlers); a `res` double recording `status`/`json` calls is ~15 lines and keeps the
   dependency surface unchanged.
5. **Nothing else.** No new framework, no new config file, no build-tooling change. `vitest.config.ts`
   already aliases `~` and runs `environment: 'node'`, which is exactly what the predicate needs.

**Dependencies to install:**

```bash
cd /usr/local/bin/hooks/website && pnpm install --frozen-lockfile
```

---

## Irreversible Side-Effect Register (Phase 1, mandatory)

Design-time input for the implementer, not a post-hoc audit. Every irreversible side effect this
change can cause, what must be true before it fires, and whether that ordering is enforced
identically on **every** route that can trigger it.

| # | Irreversible effect | Routes that can trigger it | Precondition that must hold first | Enforced identically on every route? |
|---|---|---|---|---|
| S1 | **DDL `ALTER TABLE "Messages" ADD COLUMN valid BOOLEAN`** against production | One: owner's own session (Assumption 4; no migration mechanism exists in `project-utils` — verified across full git history at rev 1) | Must precede the `website` deploy. Misordering (i) in release condition 5: the upsert names a column the table lacks and **every message save fails** until the DDL lands | Yes — single route, single actor. Guard is his attestation, quoted with timestamp |
| S2 | **Backfill mass `UPDATE`** across the whole `Messages` table | One: the M6 script, owner-executed (or agent-executed against a database he provides) | `website` deploy landed first (misordering (ii): a record saved in the window carries a stale non-NULL verdict M6-a's NULL count cannot see). **And the NULL-only condition must live inside the write** — `UPDATE … WHERE valid IS NULL`, not a `SELECT … WHERE valid IS NULL` followed by an unconditional `UPDATE` | **Not yet — no code exists.** This is the critic's carried assumption and it is a register entry, not a footnote. See mutation sweep MS-4 |
| S3 | **Suppression of live Discord notifications** — once Statbot gates on `valid: false`, affected guilds stop receiving messages. Guild `966088462803537960` is the known member | Two, and they are **not** symmetrically ordered: (a) the owner's live declaration after his M6-b review; (b) **statbot chain 023 deploying its gate at any time after `website` deploys M5** | The owner's review of the M6-b outcome distribution | **No — this is finding F-QA7.** The hooks.gg-side order (release condition 5) binds four components in this workspace; statbot's release is a fifth component in another and is bound only by a human relay |
| S4 | **Outbound POST to the preview-image service** (`postMessagePreviewImage`, `src/server/api/utils/shared.ts`) — fires on every upsert, and **twice** for a message carrying an id (once before the write, once is skipped; the `!message.id` branch fires after) | One: `upsertMessage` | Not new behaviour. The precondition is that M4 does not change *when* it fires or *what payload* it carries | Yes today. M4 touches this function, so "unchanged" becomes a criterion rather than a given — see M4-e below |
| S5 | **Pusher broadcast `message-update`** to every connected client of that message (`pusher.trigger`, same function) | One: `upsertMessage`, update branch only | Same as S4 — not new, but inside M4's blast radius. The broadcast payload is `hashMessage(message)`, and `hashMessage` runs `standardizeMessage`, whose field whitelist does **not** include `valid` | Yes — and the whitelist is what keeps it that way. See M4-e |
| S6 | **Composer send-gate behaviour change (M2)** — message states that reach Discord today become blocked-with-explanation | One: the shipped gate | Intended, and the whole point of M2. No guard owed | Yes — but see **F-QA1**, which is about what the user can do *after* being blocked |

**What the register changed at design time.** S3 and S6 are the two entries the plan does not
already carry a guard for; both became findings (F-QA7, F-QA1) rather than test cases, because
neither is closable by a test. S2's guard is the one the code-reviewer already owns; it is
restated here so that if the code-reviewer stage is skipped, the obligation does not vanish with
it — mutation sweep MS-4 gives QA an independent instrument for the same property.

---

## Property Audit — per acceptance criterion (mandatory)

For every criterion that names an example, the question asked in writing: *what class is this an
example of, and does the test enumerate the class?* Plus, per named risk sub-class, the fixture in
which each conjunct is the **sole carrier** of the decision, and the member in the **permitting**
direction.

| Criterion | The example it names | The class it is an example of | Enumerated? | Positive control (permits) | Sole-carrier fixture |
|---|---|---|---|---|---|
| **M1-a** | — (already stated over the population) | all existing rows | Yes — a single SQL count, expected 0 | n/a (a count, not a gate) | n/a |
| **M1-b** | `DatabaseSchema.Messages` | the committed rollup a consumer installs | Yes — read `dist/index.d.ts` at the M1 commit | The other `Messages` columns must still be declared — a rollup that *only* has `valid` is a regression | n/a |
| **M2-a** | record 5712 | the (flags-bit × structure × content-source) partition, **14 cells** | **Yes — spec cells A1–A7, B1–B7** | **B2**: flag set, bare Text Display → still `ok`. A blanket "flag set ⇒ refuse" fix passes every other residue cell and dies only here | `flags` disjunct: **B5**. `hasV2struct` disjunct: **A1**. `content` in `hasContent`: **A1**. `embeds` in `hasContent`: **A2** (unflagged), **B7** (flagged). `hasComponents`: **A5** |
| **M2-b** | "the existing validation suite green" | every state where flag and structure agree | Partially as worded — see **F-QA3**. Closed by enumeration here: **all 14 cells carry a frozen verdict, and exactly three (B3, B5, B7) may change.** A fourth changing cell is an M2-b failure whatever the suite says, and the spec asserts that set by identity | A1–A7 are the whole unflagged half and all must be unchanged | n/a |
| **M2-c** | 5712 in the composer | human-observable; one record suffices to refute | Yes — a single observation refutes by construction | Register row R4 asks for a *sendable* message still sending | n/a |
| **M2-d** | the mode-switch modal | modal behaviour on both toggle directions | Register rows R5/R6 (both directions) | classic→V2 **and** V2→classic each still warn | n/a |
| **M3-a** | the send page's call site | every payload `Messages.data` can hold | By construction (one symbol, two callers) **plus** an executable identity assertion — see T2/T3 | A predicate that always returns `false` satisfies "refuses 5712"; **B2/A3 as predicate fixtures** are what refuse it | n/a |
| **M3-b** | 5712; the bare-V2 shape | sentinels with externally-sourced expectations | Yes — both in the spec, provenance in comments, neither computed | The bare-V2 sentinel **is** the positive control | n/a |
| **M3-c** | absent `username` | every record whose `data` lacks or empties `username` (`MIN_NAME_LENGTH = 1`, so `''` fails) | Yes — T4, plus the **empirical** half only M6-b can answer | A record *with* a valid username must compute `true` | n/a |
| **M3-d** | already-stored refused records | that class; nothing rewrites content | Yes — assert the predicate is pure w.r.t. its argument (deep-equal before/after) | n/a | n/a |
| **M4-a** | `upsertMessage` | every writer of `Messages.data`, **re-enumerated at implementation** | Yes — re-run the sweep at Phase 2 and reconcile counts against rev 1's three writers | `updateRecentMessageData` must **not** gain a `valid` write (it never touches `data`) — the negative member of the writer class | n/a |
| **M4-b** | the conflict branch | both branches × both verdict directions | Yes — 4 cells (insert/update × valid→invalid/invalid→valid), settled on compiled SQL | An update that *keeps* the same verdict must also still write it | `valid` in the insert column list: the insert cells. `valid` in `DO UPDATE SET`: **only** the update cells |
| **M4-c** | "a known-invalid draft" | every payload the save path accepts today | Yes — the existing save-path suite plus register row R7 | **This criterion is entirely a positive control**: the class must still be *permitted* | n/a |
| **M4-d** | a client-supplied top-level `valid` | every request to `message.upsert` | Yes — T6, both placements (top-level and inside `data`) | A request with **no** `valid` must still store the computed verdict — otherwise a "strip everything" fix passes | n/a |
| **M4-e** (added by QA) | — | S4/S5: preview-image POST and Pusher broadcast unchanged in count, ordering and payload | Yes — call-count and payload assertions on the mocked effects | n/a | n/a |
| **M5-a** | "beside `id` and `name`" | both endpoints × {`true`, `false`, `NULL`} = 6 cells | Yes — and **at the serialized-JSON layer**, see F-QA4 | `true` and `false` must both be **present**; only `NULL` is absent. A "never emit the key" implementation passes a NULL-only test | Each of the three stored states is the sole carrier of its own cell |
| **M5-b** | `data` carrying no injected `valid` | every response | Yes — assert over the response `data` for all three stored states | A stored `data` that legitimately contains a user-authored `valid` must pass through **unchanged** — the criterion governs what the mapping adds | n/a |
| **M5-c** | `mapMessage` / `ApiMessage` | every other response shape in the repo | Yes — assert `mapMessage`'s emitted key set is unchanged | n/a | n/a |
| **M6-a** | — | the whole table at time T | Owner/backfill instrument; register row R8 | n/a | n/a |
| **M6-b** | the check categories | includes the **evaluation-failure residue** (count + row ids) | Register row R9, and see **F-QA2** on the threshold | The report must also show a `true` count — an all-`false` distribution is the alarm | n/a |
| **M6-c** | 5712; one of the 16 | both sentinels in the backfilled table | Register rows R2/R3 — **both directions, deliberately paired** | The bare-V2 record carrying `true` **is** the pairing | n/a |

---

## Test Strategy

Cases, fixtures and files are QA's. High-level shape below; the executable material is named by
path, per *An Instrument That Discriminates a Finding Is Captured, Not Narrated*.

### Instruments — where they live

| Instrument | Path | State |
|---|---|---|
| M2 partition spec + M3-b sentinels + **D11 round-trip simulation (rev 2)** | `website/src/utils/__tests__/012-send-gate-partition.test.ts` | **Written and executed at Phase 1.** Uncommitted — it is `website` source on a chain branch, and the chain-branch commit grant is the implementer's, not QA's. See *Handoff* |
| M3 predicate spec | `website/src/utils/__tests__/012-validity-predicate.test.ts` | Phase 2 — cannot be written before the module it imports exists |
| M4 write-path spec | `website/src/server/api/utils/__tests__/012-upsert-valid.test.ts` | Phase 2 |
| M5 endpoint spec | `website/src/pages/api/v1/__tests__/012-valid-exposure.test.ts` | Phase 2 |
| Mutation sweep record | `agent-output/verification/012/mutation-sweep.md` <!-- check-repo:ignore — forward reference: a Phase-2 destination declared at Phase 1, listed in `agent-output/verification/012/README.md`. No verdict cites it yet; it resolves once QA writes it. --> | Phase 2 — destination registered in `verification/012/README.md` |
| Backfill report (only if an agent executes it) | `agent-output/verification/012/backfill-report.md` <!-- check-repo:ignore — forward reference, and conditional: this file exists only if an AGENT executes the backfill. Owner-executed is the expected case (plan Assumption 4), in which it never exists by design. --> | M6 — and may never exist: see `verification/012/README.md` |

### Unit — M2, the corrected gate

The 14-cell partition above, pre-registered and already executed. **Phase-1 execution record:**

```
npx vitest run src/utils/__tests__/012-send-gate-partition.test.ts
Test Files  1 failed (1)
     Tests  4 failed | 16 passed (20)
Failing: B3, B5, B7, and the 5712 sentinel (which is B5's shape).
```

That is the Red half of TDD, observed rather than asserted, **before any implementation exists**.
It establishes two things a later reader can check independently:

1. **The three cells I predicted would change are exactly the three that fail today.** Not four,
   not two.
2. **Every other cell already holds**, so M2-b's baseline is a measured fact rather than a
   hope — including **B2**, the positive control that keeps the 16 known bare-Text-Display records
   sendable.

One hazard found by executing rather than by reading, recorded because the general form matters
more than the instance: **`src/constants/index.ts` imports `~/env.mjs`, which validates the entire
production environment at module scope and throws.** Any spec reaching `~/constants` — which
includes anything importing `~/utils/limits` — must mock it. The adjacent suites already do; a spec
written by reading the gate alone would not have.

### Unit — M3, the predicate

Parity is claimed *by construction*. The job here is to make the construction observable and to
enumerate the ways it can silently stop being true. Each trap below is stated with the single
fixture that discriminates it.

| # | Trap | Why it is plausible | Discriminating fixture |
|---|---|---|---|
| T1 | The predicate normalises before validating — `stripKeys`, `standardizeMessage`, or `enforceImportMutualExclusivity` | All three are in `~/utils` and all three are applied elsewhere on the save/send path, so reaching for one is the natural move | Structurally-V2 components **plus** non-empty content. The send gate says `v2-exclusive`; `stripKeys` **deletes** `content` when structure is V2, so stripKeys-then-validate says `ok`. Parity breaks in the dangerous direction — a record marked sendable that is not |
| T2 | The checks are reimplemented rather than called | The predicate is "server-side" and `limits.tsx` is a `.tsx` file, which invites a copy | Assert the predicate module declares no validation logic of its own, and that mutating `validateMessage` moves the predicate's verdict (MS-2) |
| T3 | Imported via the `~/utils` barrel instead of `~/utils/limits` | The send page itself imports from the barrel (`page.tsx` line 35), so the barrel looks like the canonical route | `~/utils/index.ts` re-exports with `export * from './limits'`, so the symbol **is** identical — assert `(await import('~/utils')).validateMessage === (await import('~/utils/limits')).validateMessage`. The reason to import directly is node-safety (the barrel pulls SVG and env), not symbol identity, and the spec should say which property it is protecting |
| T4 | Missing `username` is defaulted to something valid | M3-c's asymmetry looks like a bug to anyone who has not read the plan, and "fixing" it is a one-line temptation | `data` with no `username` → predicate must return `false`, matching the gate. Paired with a valid-username control returning `true` |
| T5 | Non-conformant stored `data` throws and the predicate swallows it as `true` | `try { … } catch { return true }` is a natural defensive reflex | `{ embeds: {} }` (non-array) makes `.reduce` throw; `{ content: 5 }` makes `.trim()` throw; `{ components: null }` makes `.some` throw. Contract to pin: **the predicate's disposition for a throwing input is `false`**, per M6-b. Whether it catches internally or the caller maps the throw is the implementer's, but one of them must, and the spec pins which |
| T6 | (M4-d) A client-supplied `valid` reaches storage | Zod strips unknown keys today, so it is right *by accident* — and the criterion is the property, not the mechanism | Two placements: top-level `valid: true` on an invalid payload, and `data.valid: true`. Stored verdict must equal `predicate(storedData)` in both. Plus the control: a request with no `valid` still stores the computed verdict |

**M3-a's observable structural sharing** — the plan leaves the "how" to QA. Two assertions, both
cheap: the symbol-identity check in T3, and a source-level assertion that the predicate module's
text contains exactly one call into the gate and no re-declared check name. The repository has
precedent for source-level assertions of this kind.

### Integration — M4, the write path

Settled on **compiled SQL**, which needs no database: build the Kysely query the way `upsertMessage`
does, call `.compile()`, and assert over the returned `sql` text and `parameters`.

- **M4-b, the enumerated trap.** `valid` must appear in **both** the insert column list **and** the
  `on conflict … do update set` list. The conflict branch names its columns explicitly today
  (`name`, `data`, `previewImageNonce`, `updatedAt`), so a `valid` present only in `values` compiles
  cleanly and silently preserves a stale verdict on every re-save. The compiled-SQL assertion makes
  the two lists separately observable — an assertion on behaviour alone would need a real database
  to catch it.
- **Four cells**: {insert, update} × {valid→invalid, invalid→valid}. The update × verdict-changed
  cells are the sole carriers of the `DO UPDATE SET` membership.
- **M4-a**: re-run the writer sweep at Phase 2 and reconcile against rev 1's enumeration (three
  writers: `upsertMessage`, `updateRecentMessageData`, the delete procedure). Report corrected sites
  against matched sites; disposition any residual by name. The negative member matters —
  `updateRecentMessageData` must **not** gain a `valid` write.
- **M4-e** (added): assert `postMessagePreviewImage` and `pusher.trigger` are called the same number
  of times, in the same order, with the same payloads as before M4 (S4/S5).

### Integration — M5, the exposure

Six cells: two endpoints × {`true`, `false`, `NULL`}, each endpoint asserted independently because
the `ResponseMessage` interface and the pick list are **duplicated per file** — the duplication is
precisely why one endpoint passing says nothing about the other.

**The instrument is the serialized JSON, not the response object** (see F-QA4). Assert over
`JSON.parse(JSON.stringify(body))`:

- stored `true` → `'valid' in body === true`, `body.valid === true`
- stored `false` → `'valid' in body === true`, `body.valid === false`
- stored `NULL` → `'valid' in body === false`

An object-level `expect(body).not.toHaveProperty('valid')` **fails against a correct implementation**
that sets `valid: undefined`, and an object-level `expect(body.valid).toBeUndefined()` **passes
against an incorrect one** that emits `valid: null`. Both are wrong instruments for this criterion.

Also required: `ResponseMessage` must declare `valid?: boolean`, not `valid: boolean` — the
non-optional form makes the omission case a type error and pushes the implementer toward emitting
`null`, which violates M5-a.

### Mutation sweep (bounded, seeded at the guards in the Side-Effect Register)

Each mutant is named with **the single cell that must kill it**. A kill reported without that cell
going red has not been reproduced.

| # | Mutant | Seeded at | Must be killed by |
|---|---|---|---|
| MS-1 | `hasV2struct \|\| flagSet` → `hasV2struct && flagSet` | M2's corrected gate | **B5** (flag set, no components) |
| MS-2 | `hasV2struct \|\| flagSet` → `hasV2struct` (drop the disjunct) | M2 | **B5** — survives A1–A7, B1, B2, B4, B6 |
| MS-3 | `hasV2struct \|\| flagSet` → `true` | M2 | **B2** and **A4** — the positive controls |
| MS-4 | The backfill's `WHERE valid IS NULL` moved out of the `UPDATE` into a preceding `SELECT` | S2 | A concurrent-save fixture: read a row's NULL, let a save land, then write. Verdict must be the save's, not the backfill's. **If this mutant cannot be killed by any executable fixture, say so and route it — do not record it as equivalent** |
| MS-5 | `valid` removed from the `DO UPDATE SET` list | M4 | The update × verdict-changed cells |
| MS-6 | `valid` removed from the insert column list | M4 | The insert cells |
| MS-7 | M5's conditional spread → unconditional `valid: m.valid` | M5 | The `NULL` cell, at the serialized-JSON layer only |

Survivors are recorded **with a disposition**; equivalent mutants are recorded, never dropped.
Counts quoted off this table travel with the predicate: *"N mutants seeded at the branch conditions
and decision constants of the M2 gate, the M4 write, the M5 mapping and the M6 backfill guard —
excludes the checks `validateMessage` runs after the content/V2 clause (username, embed-character,
displayable-text, message-length), which this chain does not modify."*

### Telemetry Validation

Not incident work, so the register is short — but M6-b's report **is** telemetry, and it is the
artifact an owner decision is made on.

- **Classification: normal** (one-shot, low-volume, structured, safe-by-default). Row ids are
  internal integers, not PII.
- **Assert structured fields, never message strings**: the report must carry `total`, `trueCount`,
  `falseCount`, a per-first-failing-check count map, and an `evaluationFailures` category with both
  a count **and** the row ids. A test asserting the printed prose is brittle and worthless.
- **Assert the invariant, not just presence**: `trueCount + falseCount === total`, and
  `evaluationFailures.count` is included in `falseCount` (per M6-b's disposition), not floating
  beside it. That arithmetic is what makes an unexpected mass-invalidation legible as a number.
- **No secret is asserted at full value anywhere in this chain.** Nothing in scope handles one; if
  the backfill script ever logs its connection string, that is a finding, not a fixture.

---

## Execution Record (Phase 1)

Numbers re-derived by this pass, not carried from any predecessor document.

| Instrument | Command | Result |
|---|---|---|
| Full existing suite, baseline | `npx vitest run` (website, `72dc7de`, after `pnpm install --frozen-lockfile`) | **14 files, 316 tests. 13 files / 312 tests pass.** The only 4 failures are the pre-registered Red cells below — the pre-existing suite is fully green |
| Pre-registered M2 partition spec, rev 1 | `npx vitest run src/utils/__tests__/012-send-gate-partition.test.ts` | **16 passed, 4 failed.** Failing: **B3, B5, B7** and the 5712 sentinel (B5's shape). Exactly the set predicted before the run |
| Same spec, rev 3 (EXT-1 whitespace, EXT-2 nesting falsifier) | same command | **31 passed, 5 failed (36).** The Red set is unchanged — all five are the same pre-M2 defect. Every EXT cell is characterisation or structural and passes today |
| Same spec, rev 5 (EXT-3 added), 2026-08-23 | `npx vitest run src/utils/__tests__/012-send-gate-partition.test.ts` | **42 passed, 0 failed.** ⚠ **NOT a verdict, and not evidence about M2.** This run happened against a working tree in which the implementer's M2 edit to `limits.tsx` is **present and uncommitted** — `git status` shows ` M src/utils/limits.tsx`, another session's work in progress, which I did not touch. The previously-Red cells (B3/B5/B7 and the two 5712 rows) are green *because M2 is partly built*, not because anything of mine changed. Phase 2 will re-run this against a committed tree and record its own `Verified-At`. **What this run does establish** is EXT-3's cost table, which depends on `utils/index.ts`, `shapes.ts` and `useApiMethods.ts` — all unmodified in the tree — and not on `limits.tsx`; the single EXT-3 assertion that does touch the gate (`validateMessage` on the repaired 5712) is flagged here as provisional |
| **Red-before-Green, measured rather than asserted** | `git show a7ebe4d:src/utils/limits.tsx \| grep -c flags` → **0**; working tree → **6** | The implementer committed the pre-registered spec at **`a7ebe4d`** against a `limits.tsx` containing **no `flags` handling at all**. The Red therefore preceded the Green **in the repository's own history**, not merely in a narrative. This is the check that TDD compliance actually turns on, and it is available to any later reader from the two commits alone |
| Same spec, rev 2 (D11 round trip added) | same command | **25 passed, 5 failed (30).** The fifth Red is *"5712 is unsendable as stored"* — the same pre-M2 defect as the other four, and it goes green with them. **The D11 round-trip simulation passes today**, which is what makes F-QA8 a measured result rather than an argument |
| `check-repo` before / after the citation fix | `node tools/check-repo.js` | **257 → 255.** Independently reproduces the planner's relayed count. Enumerated my document's own citation candidates under the checker's three predicates: **5 total — 3 resolve, 2 suppressed with reasons, 0 failing** |
| Gate never reads `flags` | `grep -c "flags" src/utils/limits.tsx` | **0** — independently reproduces critique verification #1 |
| Every `.flags` write in `src/` | `grep -rn "\.flags" src/ --include=*.ts --include=*.tsx`, tests excluded | **Exactly two sites**: one write (`stripKeys`, `src/utils/index.ts`) and one read (`sendWebhook.ts`). *Predicate: literal `.flags` member access in non-test `src/`; excludes `bot/`, destructured bindings, and dynamic `['flags']` access* |
| Registry / SSH reachability | see *Can This Strategy Be Executed…* | both reachable; pin `eb38a15` = remote `master` HEAD |

---

## Findings

### F-QA1 (HIGH) — the recovery the plan and the handoff both promise does not exist in the composer

**Route: the owner, through steering. This is not mine to decide and not the implementer's.**

The handoff's *Known consequence, accepted* says the affected guild's problem is "resolved by that
guild's owner **editing the message in the hooks.gg composer**". M3-d restates it: the corrected
gate "explains the problem". Both rest on the premise that editing in the composer can clear the
condition. **On the current code it cannot.** Traced end to end:

1. **`stripKeys` (`src/utils/index.ts`) sets `IS_COMPONENTS_V2_FLAG` when the structure is V2 and
   never clears it when the structure stops being V2.** It is the only `.flags` write in `src/`.
2. **`handleModeSwitch` (`src/components/DiscordMessageEditor/index.tsx`)**, on V2→classic, filters
   V2 components out and calls `setMessageMode` — it **does not touch `flags`**.
3. **`detectMode` (`src/providers/MessageProvider/index.tsx`)** derives the editor's mode from
   `hasV2Components` — **structure only, never `flags`**.

So the sequence *build a V2 message → save → switch to classic → add content → save* produces a
stored record with `flags: 32768`, content, and no V2 components. **That is 5712's exact shape, and
it is produced by an ordinary, supported user action** — not by a fluke and not (necessarily) by the
JSON editor.

Reopened afterwards, that record loads in **classic** mode (step 3), and after M2 the composer will
say *"Components V2 messages cannot contain embeds or content"* over a message showing no Components
V2 at all, with **Send disabled and no control that clears the flag**. The user is told to remove
something the UI does not show them.

**One escape exists and it is accidental.** `JsonModalBody` seeds its textarea from
`standardizeMessage(stripKeys(...))`, and `standardizeMessage`'s field whitelist **omits `flags`**;
its *Load* button replaces `data` wholesale with the parsed object. So opening the JSON modal and
pressing *Load* — changing nothing — silently drops the flag and fixes the record. That is a real
path, but it is undiscoverable, undocumented, and it also discards every other non-whitelisted
field. It is not "editing the message in the composer".

> **CORRECTION, rev 3 (2026-08-23) — recorded beside the paragraph above, not over it.** "Discards
> every other non-whitelisted field" was true but too vague to be useful, and it obscured the fact
> that matters. Measured by executing `standardizeMessage(stripKeys(...))` on both record shapes:
>
> | Input record | JSON-modal seed after Load |
> |---|---|
> | 5712 (`flags`, `content`, `username`, `avatar_url`, `components: []`) | `{username, avatar_url, content}` — **`content` preserved**, `flags` dropped, no components to lose |
> | flag + Action Row + content (spec cell B3's class) | `{username, content}` — **the Action Row is destroyed** |
>
> `standardizeMessage` copies `username`, `avatar_url`, `content`, `allowed_mentions`, `embeds`
> and rebuilds nothing else — **`components` and `flags` are both dropped**. So the cost is
> class-dependent, and for the named sentinel it is **zero**: the JSON-modal path repairs 5712
> losslessly. That inverts the comparison in F-QA8 and is why this correction is load-bearing
> rather than cosmetic. Provenance: raised by a steering determination from a statbot code-review
> question; re-derived here by execution before being recorded.

**Why this is a new fact and not ruling D10 re-raised.** D10 (*"Leave it out, note it"*) disposed of
save-path flag normalisation when the flag's only consequence was the field's value. After M2 the
same flag also decides whether a record is **recoverable in the UI**. That consequence did not exist
when D10 was ruled, so the owner is deciding on facts he has not seen — which is exactly the
condition under which a disposition is re-put rather than relied on.

**Cheapest closure, stated so the ask is concrete rather than open-ended**: clearing
`IS_COMPONENTS_V2_FLAG` in `handleModeSwitch`'s V2→classic branch is one line, in a branch that
already destroys the departing V2 data, and it lands inside M2's own milestone rather than as a
follow-on chain. **I am not proposing it as scope — I am pricing it, so the owner's choice is
between two known costs rather than between a known cost and an unknown one.** If he declines, the
consequence to accept explicitly is: affected guild owners cannot fix their messages without being
told about the JSON modal, and that instruction has to come from somewhere.

### F-QA2 (MEDIUM) — R2's falsifier threshold is stated over a narrower class than the change creates

R2's instrument is "a `false` count materially above the sweep's expectation (~1 in 1,976)". That
expectation cannot bound the population M2 creates, for **two independent reasons**:

1. **Narrower predicate.** The sweep counted records of 5712's *shape* (flag set + content + empty
   components) — spec cell **B5**. M2 also flips **B3** (flag set + non-V2 components + content) and
   **B7** (flag set + embeds, no components). Neither is in the sweep's predicate.
2. **Narrower population.** The sweep covered 1,976 messages across the 444 **Statbot-configuring**
   guilds. `Messages` holds every hooks.gg message; the plan says so itself ("the full `Messages`
   table may be larger"). A rate measured on a subset selected by a *different* property is not a
   rate on the whole.

And per F-QA1, the class has a **live generator** in a supported UI flow, so its frequency is the
frequency of a user action, not of an accident.

**Not a blocker** — M6-b's owner-reviewed gate contains the risk by construction. But the threshold
the owner reads it against should not be "~1". Recommended, and cheap: **M6-b breaks the flag-residue
class out with its own count**, and R2's per-pass record drops "~1 in 1,976" as a threshold, keeping
it only as what it is — a rate over a differently-defined subset.

### F-QA3 (LOW) — M2's acceptance partition names three of four (flag × structure) cells

M2-a is stated over flag-**set** states; M2-b over states where flag and structure **agree**. The
cell *(flag unset, structurally V2)* — spec cells A1, A2, A3 — falls under neither as worded. Its
correct behaviour is "unchanged", and the spec covers it. **Closed here by enumeration**, recorded
so that no later pass relies on the criteria's wording to have been exhaustive.

### F-QA4 (MEDIUM) — M5-a's "omits the key entirely" is only observable after serialization

`res.json()` runs `JSON.stringify`, which **drops `undefined`-valued keys**. So:

- `{ id, name, data, valid: undefined }` — object has the key, **JSON does not**. Correct; fails a
  naive `expect(body).not.toHaveProperty('valid')`.
- `{ id, name, data, valid: null }` — **JSON has the key**, with `null`. Incorrect under D1's
  absent-field rule; passes a naive `expect(body.valid).toBeUndefined()`.

Both naive instruments are wrong, in opposite directions. The instrument is pinned above:
`JSON.parse(JSON.stringify(body))` and `'valid' in`. Recorded as a finding rather than only as a
test note because it is exactly the shape of defect that ships with a green suite.

### F-QA5 (MEDIUM, RESOLVED by this pass) — the suite was not executable

`website/node_modules` was absent; no suite could run. Resolved with
`pnpm install --frozen-lockfile --ignore-scripts`, chosen so that neither `package.json` nor
`pnpm-lock.yaml` could drift (the pin is release-condition-3 material). **Disclosed in the round it
happened**, per this workspace's shared-tree discipline: this pass added ~1 directory of installed
dependencies to a shared tree and destroyed nothing. Baseline captured immediately afterwards.

### F-QA6 (LOW, pre-existing, out of scope) — v1 error branch never ends the response

Both v1 handlers do `if (error instanceof z.ZodError) return res.status(400);` — no `.end()`, so a
malformed query leaves the response open rather than returning 400. Pre-existing, untouched by this
plan, **not** a 012 finding. On-next-touch note for whichever chain next works these handlers.
Recorded here because M5 edits these two files and a reader will see it.

### F-QA7 (MEDIUM) — the live-declaration gate binds hooks.gg's four components, not Statbot's

Release condition 5 orders DDL → `project-utils` push → `website` deploy → backfill → owner review →
live declaration. Statbot's own deploy is a **fifth component, in another workspace, bound only by a
human relay**.

D1's absent-key rule makes every ordering safe *while the key is absent*. But from the moment M5
deploys, the key is **present and carrying real values** — and the owner's review has not happened
yet. If statbot chain 023 ships its gate inside that window, deliveries stop on a distribution
nobody has reviewed. The M6-b gate is the plan's central risk control (D6), and this is the one path
that goes around it.

Statbot chain 023 is implementing in parallel *right now*, which is what makes this worth stating
rather than filing. Two dispositions, both the owner's: order statbot's deploy explicitly after the
declaration, or accept the window knowingly. **Either is fine; the default — nobody having decided —
is not.** Routed, not absorbed.

### F-QA8 (MEDIUM, opened at rev 2) — M2-f's recovery is reachable, but it destroys the user's message

**Route: the owner, through steering.** M2-f itself says a shortfall here "routes back to the owner
— never a narrowing absorbed silently", so this is the criterion working, not the criterion failing.

D11 clears `IS_COMPONENTS_V2_FLAG` in `handleModeSwitch`'s **V2→classic** branch. M2-f already
identifies the wrinkle: an affected stored record loads in **classic** mode (`detectMode` derives
mode from `hasV2Components` — structure only), so reaching the patched branch "requires toggling
through". Traced to its end, and **simulated executably** in the pre-registered spec:

| Step | Action | `flags` | `content` | Gate verdict |
|---|---|---|---|---|
| 0 | 5712 as stored, loaded in classic mode | `32768` | present | refused (after M2) — mutual exclusivity |
| 1 | toggle classic→V2 | `32768` | **destroyed** — the branch clears `content` and `embeds` unconditionally | — |
| 2 | toggle V2→classic (**D11 clears the flag here**) | `0` | still empty | refused — *"Message must have content, embeds, or components."* |
| 3 | user **retypes** the message | `0` | retyped | **sendable** |

So the record *is* recoverable through supported controls alone, exactly as M2-f requires — **and
the price is the message text.** For 5712 that is a real Italian Member-of-the-Month notification its
guild owner would have to type again. There is no shorter path: `stripKeys` is the only `.flags`
write in `src/` and it only ever **sets** the bit, and save-path normalisation that would clear it is
ruled out of scope by D10. The classic→V2 leg is mandatory, and its clearing of `content`/`embeds` is
unconditional — `hasDepartingData` gates only the *warning*, not the destruction.

**The criterion-completeness point, which is the substance of this finding.** M2-f measures
**reachability**; it does not measure **preservation**. As worded it will pass, cleanly and
honestly, against a recovery that costs the user their content. That gap is invisible to a green
suite and to the criterion's own reading — it is exactly the *"the test discriminates for the
specified behaviour, but the specified behaviour does not cover the property"* case.

> **SHARPENED, rev 3 (2026-08-23).** Measured (see the correction under F-QA1), the two recovery
> paths destroy **different things**, and for the named sentinel the sanctioned one is the lossy one:
>
> | Path | flag cleared | `content` | `components` | For 5712 |
> |---|---|---|---|---|
> | Mode-toggle round trip (**D11**, the sanctioned fix) | yes | **destroyed** — must retype | preserved (type-1 filtered) | **lossy** |
> | JSON modal *Load* (undiscoverable, pre-existing) | yes | **preserved** | **destroyed** | **lossless** |
>
> So for 5712 — the record the owner chose D11 to repair — the pre-existing undiscoverable path
> costs nothing and D11's path costs the message text. This does not reverse F-QA8; it makes the
> disposition sharper, because "accept the cost" now means accepting a cost that a path already in
> the product does not impose on this record. For records carrying **both** components and a
> stranded flag (spec cell B3's class), the comparison flips again — D11's path is the lossless one
> there. Neither path is lossless in general.

**Not a blocker, and deliberately not a redesign.** The user is warned before step 1 ("Your embeds
and content will be removed. This cannot be undone."), and copy-the-text-out-first is an available
manual workaround. Two dispositions, both the owner's, and both cheap:

1. **Accept the cost explicitly**, and let M2-f stand as a reachability criterion — in which case
   the guidance given to affected guild owners should say *copy your message text before toggling*,
   because nothing in the UI will.
2. **Extend M2-f with a preservation clause** — recovery without content loss — which is a
   materially larger change than D11's one line and would reopen the D10 boundary.

**I am pricing, not proposing.** What matters is that the choice is made on the traced cost rather
than on the assumption that D11 delivered a clean repair. Register row **R16**.

> **RULED, rev 4 (2026-08-23).** Owner, verbatim: **"Stands, but point the guidance at the JSON
> editor"**. Disposition 1 — D11 stands, M2-f stays a reachability criterion, and the preservation
> build is declined **a second time, on the corrected facts** rather than on the original ones.
>
> The finding's own routing worked in the strict sense: steering had already put F-QA8 to the owner
> and he had accepted the cost, **on a basis that was wrong in the direction that made accepting
> look cheaper** — the JSON path relayed as uniformly destructive, unchecked against 5712, the one
> record the decision turned on. The rev-3 measurement went back to him and he re-ruled on it.
> Recorded here because it is the concrete case for *"re-derive anything you intend to make
> verdict-bearing"*: the correction changed which facts the ruling stands on, not merely its
> footnotes.
>
> **What the ruling does not settle, and what R19 therefore carries.** "Point the guidance at the
> JSON editor" is correct **for 5712's shape** and wrong for cell B3's — a record carrying both
> components and a stranded flag loses its components down the JSON path and nothing down the
> toggle. Neither path is lossless in general, so guidance stated as one line will be wrong for one
> of the two shapes whichever line it is. That is the half of this finding that survives its own
> closure.


### F-QA9 (MEDIUM, opened at rev 3) — whitespace-only content is not content, and nobody has decided whether that is right

**Route: the owner, or statbot's corpus. Register row R18.**

`hasContent` tests `content.trim()`, so `content: "   "` is **not content** to this gate. Verified by
execution, not by reading:

| Cell | Input | Gate today |
|---|---|---|
| W1 | whitespace content + structurally-V2 components | **permits** (`''`) |
| W2 | tabs/newlines + structurally-V2 components | **permits** |
| W3 | whitespace content + flag set + no components | *"Message must have content, embeds, or components."* |

The original frozen partition's content-source axis was {content string, embeds array, neither},
using `'Hi'` and `''` — **no cell separated `"   "` from `""`.** That is a genuine gap in my
enumeration and I am recording it as mine, not as a relay.

**Two things make this smaller than it first looks, and one keeps it open.**

- **It is not an M2 question.** M2 moves **no** whitespace verdict in either direction — both W1 and
  W3 are decided by `hasContent === false`, which neither M2 nor D11 touches. So M2-b is not at
  risk and the frozen residue enumeration (B3/B5/B7) stands unchanged. Asserted executably as cell
  W4 so a later reader cannot mistake EXT-1 for a hole in M2's coverage.
- **It is a D1 truth-condition question**: does `valid: true` correctly describe a V2 record whose
  content is whitespace? If Discord accepts that shape, the gate is right and there is nothing here.
  If Discord rejects it with `50035`, then hooks.gg marks **sendable** a message that is not — the
  precise failure this whole chain exists to prevent, arriving at Statbot as a live send failure on
  a record hooks.gg vouched for.
- **It is not determinable from this codebase.** It needs a live POST, which is the owner's
  instrument (as it was for both existing sentinels). I have therefore pinned **characterisation
  only** — what the gate does today — and entered no guessed correctness expectation into the frozen
  set.

**Cheapest disposition, and it defers the correctness question to data rather than to judgement:**
add the class as its **own named category in M6-b's distribution report** — records whose
`data.components` are structurally V2 and whose `content` is non-empty but whitespace-only. That
measures the population before anything gates on it, costs one predicate in a report that already
breaks out three other classes, and puts a number in front of the owner at the review he is already
doing. If the count is zero, the question is moot and closes itself.

> **RULED, rev 4 (2026-08-23).** Owner, verbatim: **"Measure the population first"**. The M6-b
> category is taken, and the owner's live POST is **withdrawn — not deferred**. No Discord
> determination will be made in this chain.
>
> **A measured zero is not a tested-accepted, and R20's closure is worded to keep the two apart.**
> A zero count says *no record in this corpus is in the class today*, which is a fact about the
> corpus at backfill time. It does **not** say Discord accepts flag-set-plus-whitespace content —
> that general question stays open, undetermined by anything in this chain, and no agent here can
> determine it. The distinction is load-bearing rather than pedantic: a later reader who sees R20
> closed on a zero and concludes *the whitespace class is safe* would be entitled to write the
> first record into it. What is actually true is that the class is **empty and unguarded**, and the
> next record to enter it is decided by the gate's current behaviour with nothing having tested
> whether that behaviour is right.
>
> Characterisation cells W1–W4 stand as they are. No correctness expectation entered the frozen
> set, and none may enter it on the strength of a count.

### F-QA10 (LOW, opened at rev 3) — top-level-only V2 detection is complete over the representable domain, not complete by checking

`validateContentRequirements`' inline `.some`, `hasV2Components`, and 012's `hasV2struct` all detect
V2-ness at **top level only**. That is currently sound, and it is sound **by the shape of the
schema rather than by any check**:

- the only non-V2 top-level type is the Action Row (`type: 1`);
- `actionRowShape.components` is `z.array(linkButtonShape)`, and `linkButtonShape` is `type: 2`;
- `2` is not in `V2_COMPONENT_TYPE_VALUES` (`[9,10,11,12,13,14,17]`);
- every other top-level type **is** V2 and is caught at top level.

So a V2 element nested where no V2 sits at top level **cannot be built**. No defect exists today, and
none ever did — the shape has always been this narrow.

**Why it is worth a finding anyway.** The soundness is a property of a *neighbouring* module's schema,
not of the gate. The day Action Row children widen — a select menu, a general container — the gate,
`hasV2Components` **and** the 012 predicate all inherit the hole simultaneously and silently, and
nothing in the suite would go red. That is the definition of a check that is correct by accident.

**Closed with a falsifier rather than a change**: spec block **EXT-2** asserts at source level that
Action Row children remain link-buttons-only. If that assertion ever fails, three call sites must
stop being top-level-only, and the spec says which. No action is owed now; this is an installed
tripwire, not an open item.

Also recorded for the chain: statbot's reviewer had assumed nesting might be reachable. It is not —
determined structurally here, and the field's history shows it never was.


### F-QA11 (MEDIUM, opened at rev 5, **against my own register**) — R19 named a class that cannot have members, and R15 could not observe its own failure

Relayed by steering as the critic's, with an instruction to re-derive. Both re-derived and both
stand. Recording them as findings rather than as silent edits, because they are the same defect
class this document exists to catch, committed by this document.

**R19 named the wrong class.** I wrote *"records carrying **V2 components** and a stranded flag"*.
A record carrying genuine V2 components **and** the V2 flag is **consistent** — `stripKeys` sets that
flag precisely because those components are present. It is sendable, it is not in the affected
population, and it needs no guidance at all. The class I meant, which plan Validation item 7 states
and which my own cell **B3** enumerates, is flag-stranded records carrying **type-1 legacy**
components. So the row pointed guidance at a class that **cannot have members**, while the class
that does have members went unnamed.

**And it collapsed three shapes into two.** Derived executably at EXT-3, the repair costs are:

| Shape | Cell | JSON editor *Load* | Mode toggle | Lossless path |
|---|---|---|---|---|
| flag stranded, **no components** (5712) | B5 | content kept, nothing to lose | content **destroyed** | **editor** |
| flag stranded, **type-1 components, no content** | B4 | components **destroyed** | components kept, no content to lose | **toggle** |
| flag stranded, **content *and* type-1 components** | B3 | content kept, components **destroyed** | components kept, content **destroyed** | **none — each route destroys what the other preserves** |

My two-way split had no room for the third row, so the shape with **no safe instruction** was the one
the register did not mention. Guidance derived from my row would have sent B3-class owners down the
toggle and told them nothing about the content loss.

**R15 could not observe its own failure.** As written it asked only that 5712 reach a Send-enabled
state through composer controls. That is satisfiable on **pre-D11 code**: delete the content, add a
Text Display, and the record is a genuine V2 message — Send-enabled, flag still stranded. The row
would have gone green against the unfixed build. Plan rev 7 added the discriminating clause (**the
persisted record carries no `IS_COMPONENTS_V2_FLAG`**) after critique F6; my row had not followed it.

I hold every other agent to *"a control counts as installed only once observed to fire"*. R15 was
wired and not installed, and I did not catch it — the critic did. Both rows are corrected in place
with the correction noted in the row, per *Restating and Correcting*.

**A third defect, found here rather than relayed.** Checking R15 against plan rev 9 surfaced that the
register carried **no execution order** at all for the 5712-keyed rows, although R15 is a *persisting*
act whose execution destroys R2's, R4's and M6-c's preconditions. Plan rev 9 states the constraint
and leaves the sequencing to qa/uat — that is this document, and it was absent. See the ordering note
under the register. Out of order, R2 and R4 report *the fix never worked* over a fix that worked and
was then overwritten by the very next row.

### F-QA12 (opened at rev 5; **materially narrowed at rev 5c** — see the correction block at its foot) — D13's cost table is true, and *my* reason for it was not

**This closes the critic's cycle-2 Assumption Not Checked**, which it named QA for: its verification
of D13's cost table was **static source reading** and never executed the JSON-modal *Load* path. Its
falsity signature — *a 5712-shaped record still carrying `flags: 32768` after Load and save* — is now
asserted directly, as the first test in spec block **EXT-3**.

**Verdict: the signature does not occur.** The table holds. 5712 comes back flag-free with its
content intact, and after M2 the repaired record passes the gate. The owner's guidance ruling rests
on a true premise.

**But the justification was wrong, and it is worth more than the confirmation.** ~~Both my rev-3
measurement and the critic's static reading attributed~~ **— corrected at rev 5c: *my* rev-3
measurement attributed** the losslessness to `standardizeMessage` dropping `flags`. **The critic's
did not; it credited both the seed whitelist and the wholesale replace.** Executed, **`standardizeMessage` is not on the Load path at all.** It shapes only
the textarea's initial value (`JsonModalBody`, the `usePassedProp` initialiser). *Load* runs a
different chain entirely:

`JSON.parse` → `enforceImportMutualExclusivity` → `discordMessageImportShape.parse` → `updateMessage`

The flag actually clears for two independent reasons, **neither of them the one *I* had on record**
(at rev 5 this read "the one on record", which was wrong about the critic — see rev 5c below):

1. the flag never reaches the textarea, so an unedited *Load* has no flag to carry back; and
2. `updateMessage` (`useApiMethods.ts`) **replaces `data` wholesale** — `{ ...oldMessage, ...newMessage }`
   merges at the *top* level, and the modal passes `{ data: validated }`, so the stored `data` object
   with its `flags: 32768` is discarded rather than merged into.

**Why a right answer for the wrong reason is still a finding.** ~~Reason 2 lives in a **third file**,
in a function neither review named.~~ **Struck at rev 5c — false as to the critic, which named both
the file and the mechanism.** What stands without it: the day `updateMessage` becomes a deep merge — an unremarkable
refactor, made to fix an unrelated field being clobbered — the flag survives *Load*, D13's guidance
silently stops repairing anything, and the guild owner following the owner's instruction is told his
message is fixed when it is not. Nothing in the suite would have gone red before EXT-3 existed.

This is the general form worth carrying: **a static read of the named function cannot settle a
property that emerges from the composition.** The critic's own instinct to flag the assumption was
right, and the assumption was more load-bearing than its LOW framing suggested — it sits under an
owner ruling.

**Instrument captured, not narrated**:
`website/src/utils/__tests__/012-json-editor-repair-path.test.ts` — **its own file**, 6 tests, all
passing. Every step calls the **shipped** function — `stripKeys`, `standardizeMessage`,
`enforceImportMutualExclusivity`, `discordMessageImportShape`, and (from rev 5b) `updateMessage` and
`saveMessage` themselves. Only the two mode-switch branches are transcribed.

#### Rev 5b — the residue planner rev 10 (`ed6845e`) risk row R6 left here, closed

**The defect, restated as the planner found it and I confirmed it:** at rev 5 the state merge was
**transcribed** from `useApiMethods.ts` into a local `applyLoad`. So the instrument pinned a *copy*
of the mechanism while being cited for protection of the *original*, and the sentence this finding
turns on — *"a deep-merge refactor leaves nothing in the suite red"* — **stayed true after the
instrument existed**, for exactly the falsifier it was built to guard. My own rev-5 header conceded
the transcription in as many words; that is a concession, not a control.

**Closed by calling the shipped closures.** `useApiMethods` is a hook factory, and the repo runs
vitest in the `node` environment with no `@testing-library/react`. Rather than add a dependency to a
shared tree, the test identity-mocks **`useCallback` only** — the memoisation wrapper, not the merge —
so the factory is callable and the closures it returns are shipped code. `react-toastify` is stubbed
(used only by `reloadMessage`, never called here). The provider's `useLatest(message)` ref sync
(`MessageProvider/index.tsx`) is stood in for. The merge itself is no longer restated anywhere.

**Observed failing before it counted as evidence.** The guarded refactor was applied as a mutant to
the shipped `updateMessage` — `data: { ...oldMessage.data, ...newMessage.data }` in place of the
top-level replace — and the suite run:

| | rev 5 (transcribed) | rev 5b (shipped) |
|---|---|---|
| deep-merge mutant applied | **6 pass / 0 fail** — mutant survives | **2 pass / 4 fail** — mutant killed |
| shipped code | 6 pass | 6 pass |

The four killed include the falsity signature itself (*expected 32768 to be +0*) and — the one worth
quoting to a non-engineer — the losslessness test, which fails with the operator-visible consequence:
`validateMessage` returns **"Components V2 messages cannot contain embeds or content."** That is
precisely the guild owner following the owner's written instruction and being told the message is
still broken.

**Mutation protocol on a shared tree** (`useApiMethods.ts` is not QA's file and no session had it
modified): byte copy taken to `/tmp`, mutant applied, run, then the working file's checksum verified
still equal to *my mutant* before restoring — so a concurrent write by another session would have
aborted the restore rather than being clobbered by it. Restored file md5 `2eb7a4d0…` matches the
pre-mutation original and `git diff --numstat` is empty. Nothing of another session's was touched.

**What the rev-5b instrument still does not cover**, stated so it is a decision and not a gap: a
refactor that moves the replace-vs-merge decision *out* of `updateMessage` — into the modal's
`onConfirm`, or into `makeEditable` — is not covered by this mutant, only by the four assertions'
end-to-end shape, which would catch it if and only if the resulting behaviour changes. That is
adequate: the property asserted is end-to-end (*5712 comes back flag-free and intact*), so any
refactor that breaks the property breaks the test, wherever it lives. What the mutant additionally
buys is proof that the assertion is **load-bearing on the shipped merge specifically**.

#### Rev 5c — correction: the critic *had* named the file, and this finding is smaller than I wrote it

Relayed by steering, and **verified here at the critic's committed record before acting on it**, not
accepted on the relay: `agent-output/critiques/closed/012-message-valid-field-critique.md`, cycle 2
pass 2. It names `useApiMethods.ts` and credits the mechanism in **two** places — its Assumption Not
Checked reads *"state write via `updateMessage`'s top-level spread replacing `data` wholesale"*, and
its D13 verification reads *"`updateMessage` (`useApiMethods.ts`) spreads at the message level —
`{...oldMessage, ...newMessage}` — so Load replaces `data` wholesale and a stale flag cannot
survive."*

**So two claims of mine were false and are struck above**: that the critic attributed losslessness to
`standardizeMessage`, and that reason 2 lived in a function *neither* review named. The accurate
history is narrower and less flattering to this finding: **my** review credited `standardizeMessage`;
**the critic's credited the wholesale replace and named the file.** Its recorded reason *survived* my
execution rather than being displaced by it. The critic checked its own record before challenging me,
which is the right order and is why this correction exists at all.

**What survives, and it is not nothing.** The execution was still the discriminating act — the
critic's own Assumption Not Checked says so, and neither review had established the property by
running it. `standardizeMessage`'s absence from the Load path is still a correction to *my* rev-3
account. And the sentence this finding turns on — *nothing in the suite would have gone red* — never
depended on who had named the file; it depended on nothing pinning the mechanism, which is what rev
5b fixed.

**What this changes in how the finding should be read.** F-QA12 is **not** "both reviews got the
reason wrong." It is: *QA got the reason wrong, the critic got it right by reading, and neither had
run it — so the instrument's value is execution plus the rev-5b pin, not a correction to the
critic's record.* Anyone citing F-QA12 downstream should cite it in that narrower form.

**Attribution of the error, stated because a correction that only stops repeating a claim leaves the
accusation standing.** The false claim is mine — I wrote it and it went into my rev-5 report. Steering
has withdrawn its onward relay in both channels and called that share its own; I am not passing this
one along to it. The method failure worth naming is specific: **I characterised what another
document said without opening it**, while in the same breath insisting that a static read cannot
settle a property. The document was committed and one `grep` away. The rule I applied to source code
— verify the artifact, do not infer it from prose — I did not apply to a peer's record.

> **Why it is a separate file, decided at rev 5 after first writing it into the partition spec.**
> The partition spec's *entire* evidential value is that it was pre-registered and frozen **before
> any implementation existed**. This block was written **after the implementer began**. Appending it
> there would have blurred the one property that makes that file evidence, and would have left
> QA-authored hunks inside a file the implementer now commits — where a `git commit --only` on that
> path would have swept them in unknowingly. The partition spec has been restored **byte-identical
> to `a7ebe4d`** (`git diff --numstat` returns nothing against it), so its Red-before-Green record is
> untouched by anything QA did afterwards.

---

## Phase 2 — Test Execution (rev 6, 2026-08-23)

**Subject**: `website` `chain/012-message-valid-field` @ **`17cada0`** (chain base `72dc7de`);
`project-utils` `master` @ **`749606d`**. Tree state at execution: clean except two untracked QA
instruments (both this session's, identities in the header). Governing disposition: **D18** — new
findings become handoff material; a CRITICAL or HIGH defect in what shipped would still hold the
tree. None was found.

Every number below is this session's own run. Nothing is inherited from the implementation
document, the code review, or the steering brief.

### TDD Compliance Gate — PASSED, with red independently re-derived

The implementation doc's TDD Compliance table exists and is complete: every new function/class has
a row; no applicable column reads "No". Beyond the table's existence, the **round-1 code-review
assumption** (eight TDD rows landed in one commit, red-before-green *assumed*; falsity signature:
any new spec passing against `72dc7de`) was discharged by execution, not by reading:

- Throwaway worktree at `72dc7de` (`git worktree add`, metadata-only — the shared tree never moved;
  removed after use), HEAD's spec files copied in, `node_modules` symlinked.
- **All six implementer spec files fail at base**, each in the class the TDD table records:
  `012-message-mode`, `012-validity-predicate`, `012-backfill-classify`, `012-backfill-report` die
  on `Cannot find module`; `012-upsert-valid` 6/6 assertion/`not a function` failures;
  `012-valid-exposure` 4/6 failures.
- **Partition spec at base: 36 tests, 5 failed** — exactly B3, B5, B7, the 5712 sentinel, and the
  M2-f "unsendable as stored" case. Reproduces the TDD table's 5/36 claim (and confirms commit
  `a7ebe4d`'s message counts are wrong, as the implementation doc already records at L3).
- Precision owed on the falsity signature: at *test* granularity, 2 of `012-valid-exposure`'s 6
  cases (the two stored-NULL cells) pass vacuously at base — the pre-M5 handlers never emit the
  key, so "absent where NULL" holds trivially. Their discriminating power is established separately
  by mutation (MS-7a/MS-7b below), so this is stated, not waved through.

### Execution record

| Instrument | Command / method | Result |
|---|---|---|
| Full suite, committed tree only | `npx vitest run --exclude "**/012-json-editor-repair-path**"` at `17cada0` (before the MS-8 spec existed) | **20 files / 402 tests, all green** |
| Full suite, with QA instruments | `npx vitest run` | **22 files / 411 tests, all green** (408 before the MS-8 guard spec; its 3 tests added after being seen red under the mutant) |
| Production typecheck | `npx tsc --noEmit -p tsconfig.json` | **0 errors** — reproduces round 6's green |
| Production build | `npm run build` | **Compiled successfully** (own run; round 6's result reproduced) |
| Frozen-spec integrity | `git diff a7ebe4d 17cada0 -- …012-send-gate-partition.test.ts` | **Empty** — the pre-registered spec is byte-identical to its pre-implementation commit |
| M1-b, committed rollup | `git -C project-utils show 749606d:dist/index.d.ts` | `valid: boolean \| null` on `Messages` at the committed rollup; **installed copy identical** at the same declaration |
| M4-a writer re-enumeration | `grep -rn "updateTable('Messages')\|insertInto('Messages')" src` (non-test) | **3 sites**: `buildUpsertMessageQuery` (persists `data`, writes `valid` — covered), `updateRecentMessageData` (recent\* columns only, never `data` — the negative member, correctly gains no `valid` write), `backfillValid` (writes `valid` by design, NULL-guarded). Exactly one persister of `data` on the app path, matching the plan's enumeration |
| M5-c | `mapMessage` at base vs `17cada0`, function-scoped diff | **Byte-unchanged**; carries no `valid`. Instrument substitution recorded: Phase 1's audit table asked for a unit assertion on `mapMessage`'s key set; none exists — verified by diff enumeration instead, which answers the criterion ("no other response shape changes") directly |
| M4-e (S4/S5) | Diff read of `upsertMessage`'s hunks | Side-effect call sites outside the changed hunks / unchanged in form; the hunks replace inline values/query with the extracted builders. Accepted at the reviewer's Minimum (implementation Outstanding item 6): asserted by diff, backstopped by register row **R7** |
| Coverage tooling | `check-coverage.sh` (testing-patterns) | No coverage provider configured in the repo — coverage evidence in this chain is the criterion→instrument map plus the mutation kills below, which for the changed surface is stronger than line coverage |
| Version artifacts | — | N/A per plan M7: neither package carries a `version` field or CHANGELOG |

### Mutation sweep — executed (Phase 1 plan, plus two L5 probes and one new seed)

Protocol per file: md5 before; byte copy to `/tmp`; mutant applied by `sed` and confirmed present;
targeted spec run captured to a file; original restored; md5 and `git diff --numstat` confirmed
byte-identical. All mutated files are the implementer's committed work — temporarily mutated and
restored under the same restore-guard protocol as rev 5b, disclosed here in the round it happened.

| # | Mutant | Result | Killed by |
|---|---|---|---|
| MS-1 | gate `\|\|` → `&&` | **KILLED** (8 red) | **B5** as required, plus A1/A2 sole-carrier controls |
| MS-2 | gate drops the flag disjunct | **KILLED** (5 red) | **Exactly** B3, B5, B7 + both 5712 rows — the flag disjunct is the sole carrier in all five, and every structural cell stayed green |
| MS-3 | gate `hasV2 = true` | **KILLED** (3 red) | A4, A6, and the M2-f recovery case. **Prediction correction, recorded beside the original**: Phase 1's table named "B2 and A4"; B2 cannot discriminate this mutant (B2 is already V2-side, verdict invariant). The kill is carried by the classic-side positive controls. The Phase 1 kill-cell prediction was wrong for B2; the mutant is killed regardless |
| MS-4 | backfill UPDATE loses `.where('valid','is',null)` | **SURVIVOR** — 41/41 green | Pre-declared in Phase 1: not equivalent, and no executable fixture in this environment can kill it (requires DB concurrency). **Disposition**: guard verified present at source (`backfillValid.ts`, the per-row `updateTable` chain); damage bounded by release order (saves recompute their own rows) and caught in aggregate by M6-a only if rows are left NULL, which this mutant does not cause. **Routed as handoff material under D18** — a DB-backed integration harness is the only closure |
| MS-5 | `valid` out of `DO UPDATE SET` | **KILLED** (2 red) | The enumerated-trap case + the verdict-unchanged case |
| MS-6 | `valid` out of insert values | **KILLED** (3 red) | The `built.valid` compute cells. Instrument note: the "insert column list carries `valid`" regex stayed green under this mutant (it matches the conflict clause's `"valid"` too) — the insert-list property's real carriers are the compute cells, which is sufficient; noted so nobody reads that one assertion as the carrier |
| MS-7a | list endpoint: conditional spread → unconditional | **KILLED** (1 red) | That endpoint's stored-NULL cell |
| MS-7b | [id] endpoint: same | **KILLED** (1 red) | That endpoint's stored-NULL cell |
| L5-A | `applyModeSwitch` ternary inverted | **KILLED** (2 red) | Both delegate cases |
| L5-B | `switchToClassic` mask → `flags = 0` | **KILLED** (1 red) | The named "clears ONLY the V2 bit" control |
| MS-8 | `accumulate` drops the `evaluationFailures` population line | **SURVIVOR at `17cada0`** (41/41 green) — **CLOSED by QA spec** | New QA-authored spec `012-backfill-evaluation-failure-category-qa.test.ts`: **red under the mutant (2/3), green on shipped code (3/3)**. See F-QA14 |

Predicate, travelling with the counts: *11 mutants seeded at the branch conditions and decision
constants of the M2 gate, the mode-switch functions, the M4 write builders, the M5 mappings, and
the M6 backfill guard/accumulator — excludes the checks `validateMessage` runs after the
content/V2 clause (username, embed-character, displayable-text, message-length), which this chain
does not modify, and excludes the DB-execution shells (`runBackfill`/`main`, `upsertMessage`
wiring), which no suite in this repo can execute.*

### Carry-forward items — each re-derived, none inherited

**1. Round 6's Assumption Not Checked (28 unrelated package upgrades behaviourally inert) —
CLOSED, with its framing bounded.** The named falsity signature — a suite failure on unchanged
source against the refreshed lockfile — did not fire: full suite green (my run), `npm run build`
green (my run), `tsc` green (my run). Source between `f983508` and `17cada0` is the lockfile plus
one moved test file (`git diff --stat`, own run: 2 files). Bounding the framing: **babel is not
this app's transpiler** — the repo has no `.babelrc`/`babel.config`, so `next build` compiles with
SWC and vitest transforms with esbuild; `pnpm why @babel/core` shows babel reachable only as a peer
of eslint tooling and of Next-internal `styled-jsx`. So "the transpiler is precisely what moved"
overstates the exposure: the moved `@babel/*` packages sit on paths my instruments either exercise
indirectly (build) or not at all (lint). What my instruments genuinely do not exercise is the
**deployed bundle executing** — that residue is exactly what the register's post-deploy rows
(R2–R7) exist to observe, and it is theirs, not a further pre-release check.

**2. Round 1's red-before-green assumption — CLOSED** (TDD gate section above).

**3. L5 — CLOSED by execution, no rewrite required.** The reviewer was right that the two
`applyModeSwitch` delegate cases are tautological with respect to defects in the branch functions —
and they are also the *sole* discriminators of dispatch inversion, observed killing L5-A. Branch
coverage is carried by the literal-expectation cases, observed killing L5-B. The describe title
already carries the wiring disclaimer. The suite partitions responsibility correctly; independence
holds where it matters.

**4. Typecheck blindness (`tsconfig` excludes `**/__tests__`) — probed, one LOW finding.** A
QA-side tsc run with tests included (override config; the shipped config's other includes
preserved except `next-env.d.ts` and non-src trees): **28 errors, all in test files** — 5 in this
chain's `012-message-mode.test.ts` (F-QA13), 22 in pre-existing chain-011-and-earlier specs, 1 a
probe artifact (the omitted `next-env.d.ts` carries Next's image-type declarations; confirmed by
reading it). **No production-source error surfaces when tests are included.** The blindness itself
is the repo-wide tooling gap the implementation doc's round 5 already names and routes.

**5. Phase 1's own Assumption Not Checked (production `Messages.data` structurally conformant) —
mechanism verified, one overstatement found (F-QA14), measurement still the owner's.** The
detection mechanism is real and tested (`classifyRow` catches throws; three fixture classes). The
**category population** — count *and row ids* reaching the report the owner reviews at R9 — was
unguarded (MS-8) and the implementation doc's closure section overstates what the classify spec
proves. Now guarded by the QA spec. The measurement itself remains the owner's at M6-b, exactly as
routed.

### Property-audit delivery check

The Phase 1 audit table (above) stated, per criterion, the class each example belongs to and the
required sole-carrier/positive-control fixtures. Phase 2 verified delivery: M2's partition delivers
every named sole-carrier cell (proven live by MS-1/MS-2/MS-3's kill patterns); M3 delivers T2/T3
(source-level single-call + direct-import + symbol identity), both sentinels with recorded
provenance, the username asymmetry **with its permitting control**, purity, and throw-handling in
both directions; M4 delivers both branches × both verdict directions on compiled SQL plus the
injection cell (and M4-d's top-level half holds structurally: `buildMessageValues` picks only
`name`/`data`); M5 delivers both endpoints × three stored states at the serialized-JSON layer
(F-QA4's instrument, vindicated by the MS-7 kills). Departures from the audit table, all recorded
above: M5-c verified by diff enumeration instead of a unit assertion; M4-e accepted at the
reviewer's Minimum; M6's DB half owner-executed per the strategy.

### New findings (Phase 2)

#### F-QA13 (LOW, routed as handoff material under D18) — `012-message-mode.test.ts` is not type-sound

Five TS2345 errors when tests are typechecked: fixtures pass `{ type: number }` skeletons where
`ModeSwitchDraft` declares `SupportedTopLevelComponent[]`. Behaviourally sound — the functions read
only `.type`, and the mutation kills above prove the assertions discriminate — but the spec would
not survive the tsconfig gap being closed, and unsound fixtures are exactly how a future
type-narrowing refactor gets a green suite while changing behaviour for real component shapes.
Fix is mechanical (typed fixture builders or targeted casts); belongs with whichever chain closes
the `**/__tests__` exclusion. The 22 errors in pre-existing specs are the same class, pre-dating
this chain.

#### F-QA14 (MEDIUM as a record defect, coverage half CLOSED here) — the evaluation-failure category was detectable-but-unguarded, and the implementation doc's closure of my assumption overstates its evidence

The implementation doc ("Assumption Not Checked — closure") states the count-and-row-ids category
is "tested: `012-backfill-classify.test.ts`, describe `classifyRow — evaluation failures`". That
describe proves **detection** (the boolean on the classification). Nothing drove an
`evaluationFailure` classification through `accumulate` into `report.evaluationFailures` — proven
live by MS-8: deleting the population line left the committed suite green 41/41. The category is
the one instrument that lets the owner's R9 review distinguish "cannot evaluate" from "genuinely
invalid", on a **one-shot** run the NULL guard makes unregeneratable. Source verified correct by
reading; the coverage gap is **closed by the QA spec** (red under MS-8, green on shipped code);
what remains is the record: the implementation doc's closure sentence should narrow from "tested"
to "detection tested; population guarded by QA's Phase 2 spec" — the implementer's document, the
implementer's correction, routed in the handoff. Not a shipped-behaviour defect; does not hold the
tree.

### Assumption Not Checked (Phase 2)

**This pass assumes the wiring seams no suite in this repository can execute — that
`handleModeSwitch` calls `applyModeSwitch`, and `upsertMessage` calls
`buildMessageValues`/`buildUpsertMessageQuery`, each with the right arguments — and it does not
test them.** The premise is specific: every executed instrument above exercises the *extracted*
functions; the callers' wiring to them is asserted by reading (implementation Outstanding item 9
says the same, and the reviewer accepted it at his Minimum). **Falsity signature**: production
composer or save behaviour diverging from the extracted functions' proven behaviour while every
suite here stays green — most visibly, a mode toggle in the deployed editor that does not clear
the flag (R5/R6/R15's surface), or a deployed save that stores no verdict (R7's surface).
**Closure owner: the uat agent and the owner, at the register's post-deploy rows R4–R7 and R15** —
which exist for exactly this class and are named again in the handoff, so the assumption is
routed, not shelved.

### Verdict

**QA Complete — PASS, issued at `17cada0` (rev 6), re-anchored at `Verified-At: c85945f` (rev 7)**
— see the rev-7 re-anchor block below. No CRITICAL or HIGH defect in what shipped. Survivor MS-4,
findings F-QA13/F-QA14's record half, and CR-L11 (the reviewer's, already routed) travel as
handoff material under D18. The pre-release register rows QA-R1 and QA-R14 are executed and
recorded below; all post-deploy rows remain open by construction and travel to UAT. ~~A commit of
the two QA instrument files by the implementer (their commit grant) is recommended before
release~~ — **done at `c85945f`** (implementer, both md5s verified against this header before
committing; superseded routing note kept struck, not deleted).

**Handing off to the uat agent for value delivery validation.**

### Rev 7 — differential-scoped re-anchor: `17cada0` → `c85945f`

The tree moved after the rev-6 verdict: the implementer committed this document's two instrument
files at `c85945f` (parent exactly `17cada0`; delta 59 + 189 lines, both test files, zero
production source, zero deletions — re-derived at the commit, not inherited). Under Verdict
Freshness the rev-6 verdict expired; per "the differential scopes the refresh; it never replaces
it", the refresh was **executed, not read off the file list**:

- **Both trees executed over the verified surface**, and the suite **re-run at the committed
  `c85945f` on a clean tree**: **22 files / 411 tests, all green, exit 0.** Zero movement.
- **Differential captured** at `agent-output/verification/012/qa-phase2-reanchor-c85945f/` —
  commands, parentage, md5 identity checks, and all four tree-state runs.
- **Code review round 7's Assumption Not Checked — CLOSED here** (routed to QA by steering as the
  instrument's owner; the reviewer explicitly did not run the suite). Its falsity signature — any
  count at `c85945f` other than 22 / 411 on unmoved source — did not fire.
- **The three circulating suite figures reconciled, each named to its tree** (full table in the
  capture): **20 / 402** is the committed `17cada0` tree alone; **21 / 408** is `17cada0` plus the
  repair-path instrument untracked; **22 / 411** is `17cada0` plus both instruments — content-
  identical to `c85945f`, and now re-observed at the committed `c85945f` itself. Consistent by
  arithmetic: 402 + 6 + 3 = 411. The ambiguity was in citation, never in a run.
- Sequencing note: the re-anchor was held until the code reviewer's round-7 transfer ruling
  arrived (`06b204d`, verdict transfers re-anchored), so both gates moved on the same basis
  rather than QA deciding the freshness rule's application unilaterally.

---

## BLOCKING RELEASE CONDITIONS — chain 012 register

> **BLOCKING RELEASE CONDITION** — each **pre-release** row below must be executed and recorded in
> the UAT document before merge/deploy. **Post-deploy-observable** rows gate the chain's **closure**,
> never the release act.

**This register is minted here.** Chain 012 had none, and no prior chain in this workspace has used
one — so this is the chain's single register and every later gate document **appends to it** rather
than minting a parallel ID space.

**Naming (rev 6a, mirroring plan rev 28)**: in cross-document text these rows are cited **QA-R#**
(QA-R1…QA-R20) to distinguish them from the plan's Risks rows R1–R7, which share the letter. Bare
R# within this document refers to this register.

**Standing note, so a later reader does not take this as current**: this list is point-in-time. The
UAT document, and then the deployment record, are authoritative on each row's execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| R1 | pre-release | The 14-cell M2 partition is green, with B3/B5/B7 flipped and A1–A7/B1/B2/B4/B6 unmoved | `npx vitest run src/utils/__tests__/012-send-gate-partition.test.ts` | QA (automated; no human) | M2 implemented | 20/20 pass | If a cell outside the residue moved, M2 changed sendability for messages nobody asked it to touch — users lose the ability to send messages that work today | qa | **EXECUTED, PASS — Phase 2, `17cada0`**: 36/36 green (the spec grew from the 20 cells this row's prediction was sized against to 36 — rev-1 prediction superseded by spec growth, recorded beside, not over); the five previously-red cells (B3/B5/B7 + both 5712 rows) flipped green and every A-cell unmoved, with the partition file byte-identical to its pre-implementation commit `a7ebe4d` |
| R2 | post-deploy-observable | GET v1 guild-messages for `966088462803537960` shows message 5712 with top-level `valid: false` | HTTP GET against production | Owner (the read is owner-executed; a hooks-side agent read was blocked by the classifier in the statbot workspace — if that block fires here, **stop and report, never reword**) | After backfill completes | `valid: false` — a **single** observation refutes by construction | If it shows `true` or omits the key, the field is not communicating what it was built to communicate, and Statbot gates on nothing | devops (owner observes) | **SUPERSEDED AS SPECIFICATION 2026-08-25 (D27)** — still Open, still owed. Its subject (record 5712) was repaired by the owner's SQL, which makes this row's failure clause a booby trap against it: a `true` reading on 5712 is now the **correct** reading, not the failure this clause describes. Row text kept as written; the executable specification is the re-specified R2 below, on SCR-1. |
| R3 | post-deploy-observable | The same request for a guild holding a bare-Text-Display V2 record shows `valid: true` | HTTP GET against production | Owner | After backfill completes | `valid: true` — single observation suffices | **This is R2's paired positive control.** If it shows `false`, the field marks well-formed messages invalid and Statbot silently stops delivering messages that work — the mass-invalidation failure, arriving as silence rather than as an error | devops (owner observes) | Open |
| R4 | post-deploy-observable | 5712 loaded in the composer shows the mutual-exclusivity notification with Send disabled (M2-c) | Composer UI | Owner (only he can load that guild's message) | After website deploy | Notification shown, Send disabled | If Send is still enabled, the composer keeps telling users a message is fine that Discord rejects with `50035` — the original defect, unfixed | uat (owner observes) | **SUPERSEDED AS SPECIFICATION 2026-08-25 (D23)** — still Open, still owed. Its subject (record 5712 in the composer) ceased to exist in either direction when the owner repaired 5712 by SQL as part of chain 013, so this wording can no longer reach a terminal state. Row text kept as written; the executable specification is the re-specified R4 below. |
| R5 | post-deploy-observable | Mode toggle classic→V2 still shows "Switch message mode?" and still warns (M2-d) | Composer UI | Owner | After website deploy | Modal shown | If the modal is gone, the fix silently destroyed users' content on a toggle | uat (owner observes) | Open |
| R6 | post-deploy-observable | Mode toggle V2→classic still shows the modal (M2-d, other direction) | Composer UI | Owner | After website deploy | Modal shown | As R5. **Both directions are registered deliberately** — M2-d names one behaviour with two members | uat (owner observes) | Open |
| R7 | post-deploy-observable | Saving a deliberately unsendable draft **succeeds**, and its API representation then shows `valid: false` (M4-c's human-observable half) | Composer save, then v1 GET | Owner | After website deploy | Save succeeds; next fetch shows `valid: false` | **If the save is rejected, the change has silently turned a communication field into a gate** — users can no longer save work in progress, which the owner explicitly ruled they must be able to do (D1) | uat (owner observes) | Open |
| R8 | post-deploy-observable | At stated time T after backfill and **before** the live declaration, `SELECT count(*) FROM "Messages" WHERE valid IS NULL` = 0 | SQL | Owner | After backfill completes | 0 | A non-zero count means the backfill ran partially; Statbot sees records with no key and treats them as today, indefinitely rather than for a rollout window | devops (owner observes) | Open |
| R9 | pre-release **(gate, not a check)** | The owner has reviewed the M6-b outcome distribution — including the evaluation-failure category's count **and** row ids — **before** the live declaration | The backfill's own report | **Owner — this row is his decision, not a QA verdict.** No agent may mark it passed | After backfill completes, before declaration | A `false` count consistent with a small residue class; see **F-QA2** on why "~1" is not the right yardstick | If the declaration goes out unreviewed, an unexpected mass-invalidation reaches Statbot's gate as stopped deliveries across many guilds, discovered by guild owners rather than by us | owner (recorded by devops) | Open |
| R10 | pre-release | Pinned-build proof: after the approved `project-utils` push and the `website` pin/lockfile refresh, remove the installed copy, `pnpm install --frozen-lockfile`, rebuild — passes | Shell | devops (automated; no human) | After `project-utils` push | Clean install and build | Without it, every "done" in this chain may rest on a locally-resolved dependency that no deploy will ever see, and production breaks on a column its `DatabaseSchema` does not declare | devops | Open |
| R11 | pre-release | Release order verified as an **order**, not as occurrence: DDL → `project-utils` push → `website` pin refresh + deploy → backfill → review → declaration | The deployment record | devops (automated/documentary; no human) | At release | Order holds | Misordering (i): **every message save fails** between deploy and DDL. Misordering (ii): records saved in the window carry stale verdicts M6-a's NULL count cannot see, breaking the freshness clause Statbot is entitled to trust | devops | Open |
| R12 | pre-release | **F-QA7**: the owner has stated whether statbot chain 023's deploy is ordered after the live declaration, or the window is knowingly accepted | Owner's ruling, recorded | Owner | Now — decidable today, before anything ships | A stated disposition either way | If nobody decides, Statbot may gate on an unreviewed distribution and stop deliveries before the owner has seen a single number — routing around the plan's own central risk control | owner (put by steering) | **CLOSED 2026-08-23** — *"Order Statbot's deploy last"*; plan register D12, release condition 5 extended to five ordered components. **Superseded by R17**, which is the executable half |
| R13 | pre-release | **F-QA1**: the owner has ruled on whether the V2 flag is cleared on mode switch, or the composer-recovery consequence is accepted with a stated plan for telling affected guild owners | Owner's ruling, recorded | Owner | Now — decidable today, before M2 is written | A stated disposition either way | If unaddressed, affected guild owners are told to fix their message in the composer and find no control that does it. The chain ships a clearer error and no way to act on it | owner (put by steering) | **CLOSED 2026-08-23** — *"Clear the flag on switch back"*; plan register D11, enacted in M2 (M2-d revised, M2-e/M2-f added). **Succeeded by R14, R15, R16** |
| R14 | pre-release | **M2-e**: every V2→classic switch leaves no `IS_COMPONENTS_V2_FLAG`, over the whole class of departing contents — and clears **only** that bit | The pre-registered spec's M2-e block (5 departing states + a bit-masking control) | QA (automated; no human) | M2 implemented | All green | A `flags = 0` assignment instead of a mask passes every class member and silently destroys unrelated flag bits on every mode switch — for every user, not just affected ones | qa | **EXECUTED, PASS — Phase 2, `17cada0`**: the partition spec's M2-e block green **and** the real extracted function proven — `012-message-mode.test.ts`'s five departing states + masking control green, with the `flags = 0` mutant (L5-B) and the dropped-disjunct mutant (MS-2) both observed killed. Residue: the `handleModeSwitch`→`applyModeSwitch` wiring is unexecutable here — carried by R5/R6/R15, per the Phase 2 Assumption Not Checked |
| R15 | post-deploy-observable | **M2-f**: stored record 5712 brought to a Send-enabled state through supported composer controls alone, no JSON modal, **and the persisted record then carries no `IS_COMPONENTS_V2_FLAG`** (plan Validation 4(e); critique F6/F11) — **run LAST of the 5712 rows; see the ordering note below** | Composer UI, then the persisted record | Owner (only he can load that guild's message) | After website deploy, and **after R2, R4 and M6-c have been read** | Reachable, and flag-free afterwards — via the round trip in F-QA8 | If unreachable, D11's one line did not deliver what the owner chose it for, and the fix bought the affected guild owner nothing. **Without the flag-free clause this row does not discriminate at all** — a user reaches Send-enabled on *pre-D11* code by rebuilding the record as a genuine V2 message (delete the content, add a Text Display), flag still set. As I first wrote it, this row would have confirmed a fix that was not there. Corrected 2026-08-23 against plan rev 7's M2-f | uat (owner observes) | **SUPERSEDED AS SPECIFICATION 2026-08-25 (D23)** — still Open, still owed; same reason as R4. The flag-free clause this row was corrected to carry is preserved verbatim in the re-specified R15 below, because it remains the only thing that discriminates. |
| R16 | pre-release | **F-QA8**: the owner has ruled on whether M2-f's content-destroying recovery is accepted as-is, or M2-f gains a preservation clause | Owner's ruling, recorded | Owner | Now — decidable before M2 is written | A stated disposition either way | If accepted silently, guild owners are sent to a repair that retypes their message, and nobody tells them to copy the text first. M2-f passes cleanly either way, so nothing downstream will catch it | owner (put by steering) | **CLOSED 2026-08-23** — *"Stands, but point the guidance at the JSON editor"*. D11 stands; preservation build declined a second time, on the rev-3 corrected facts. **Succeeded by R19** |
| R18 | pre-release | **F-QA9**: the whitespace-content class is decided — either statbot's corpus/the owner's live POST settles whether Discord accepts flag-set-plus-whitespace content, or M6-b carries the class as its own category so the population is measured before it gates | Owner's live POST, or statbot's corpus, or the M6-b count | Owner (live POST is his instrument, as for both existing sentinels) | Now for the ruling; the count at backfill | Either a Discord verdict, or a category count — plausibly zero, which closes it | If undecided and Discord in fact rejects the shape, hooks.gg marks **sendable** a message that is not, and Statbot attempts a send that fails on a record hooks.gg vouched for — the exact failure the chain exists to prevent | owner (put by steering) | **CLOSED 2026-08-23** — *"Measure the population first"*. M6-b category taken; owner's live POST **withdrawn, not deferred**. **Succeeded by R20** |
| R17 | pre-release | **D12 enactment**: the devops agent records that the statbot-side ordering instruction was **relayed**, and does not claim statbot's compliance (which is that workspace's to verify) | The deployment record | devops (documentary; no human) | At release | Relay recorded | D12 has no planning-document mirror on the statbot side — plan rev 6 makes this row the only executable trace that the constraint travelled at all. An unrecorded relay is indistinguishable from no relay | devops | Open |
| R19 | pre-release | **R16/D13 enactment**: the guidance is **shape-dependent over THREE shapes**, not two (plan Validation item 7) — (i) flag-stranded with **no components** (5712; cell B5) → JSON editor *Load*, lossless; (ii) flag-stranded with **type-1 legacy components and no content** (cell B4) → mode toggle, lossless; (iii) flag-stranded with **both content and type-1 components** (cell B3) → **no lossless path exists**; each route destroys what the other preserves, so the guidance must state which side is lost rather than name a winner | The recorded guidance text | Owner (he communicates; no agent may) | Now — decidable before M2 ships | Three shapes named — two with a lossless path, one with none. Executed as **EXT-3** in the pre-registered spec | Guidance written as one line is **wrong for at least one shape whichever line it is**, and a guild owner who follows it loses data while doing exactly what he was told — a loss that reads as a hooks.gg bug rather than as following instructions. **My first wording of this row was itself wrong in two ways** (F-QA11), which is this same defect at one remove | owner (drafted by whoever writes the release note; **he sends it — no agent does**) | Open |
| R20 | pre-release **(gate, not a check)** | **R18 enactment**: M6-b's distribution report carries the whitespace-content class as its **own named category** — `data.components` structurally V2 and `content` non-empty but whitespace-only — with a count **and** row ids, reviewed by the owner at the R9 review he is already doing | The backfill's own report | **Owner — his decision, not a QA verdict**; the count itself is automated | After backfill completes, before declaration | Plausibly **0**. A zero closes the question *for this corpus, at this time* — it is **not** a Discord determination and must not be recorded as one | A non-zero count means live records are being marked **sendable** on a shape nobody has tested Discord against; Statbot then attempts sends hooks.gg vouched for and they fail — the exact failure this chain exists to prevent, arriving as delivery failures rather than as an alert | owner (recorded by devops) | Open |

> **EXECUTION ORDER — the 5712-keyed rows interfere, and this register did not say so.**
> **R15 is a persisting act.** Any save recomputes `valid` (M4), so executing R15 flips 5712 to
> `valid: true` and **destroys the preconditions of R2, R4 and M6-c's sentinel**. Read them in the
> order **M6-c → R2 → R4 → R15**. After R15 — or after the affected guild owner performs his own
> D13-guided repair, whose timing nobody here controls — R2's expected value legitimately becomes
> `true` via M4. That is a correct recompute, **not** a failure of the fixed-vs-unfixed distinction
> and not a false red on M6-c, provided the order held.
>
> Plan rev 9 states the constraint (Validation item 4, critique F10) and explicitly leaves
> sequencing *within* a stage to qa/uat — **which makes this register the place it has to live, and
> it was not here.** Found by reading plan rev 9 against my own rows; not relayed. Added 2026-08-23.
> Whoever executes these rows reads this note first: run out of order, R2 and R4 return
> `true`/enabled and read as *the fix never worked*, when in fact it worked and was then overwritten.

R2 satisfies the standing requirement that a chain fixing a user-reported defect register at least
one post-deploy observable distinguishing **fixed from unfixed in production** — the fix's signature
here is a value appearing where none was, which a deploy having happened says nothing about.

---

## Re-specification of QA-R2, QA-R4 and QA-R15 (D23, D27) — 2026-08-25

**Authority**: plan register **D23**, which supersedes D19 and routes QA-R4 and QA-R15 back to QA
to be re-specified against a subject that still exists, *"so that something still verifies D11 end
to end before closure"*; and **D27** (registered 2026-08-25), which does the same for **QA-R2** on
the owner's ruling, after QA reported that 5712's repair had spent that row's discriminating power.
The wording below is QA's in both cases. This section adds **no row** — D18's scope closure stands;
R2, R4 and R15 keep their IDs and their obligations, and only their subject and instruments change.

**Rev 9 (D27) folded R2 into this section rather than starting a second one**, because all three
rows now share one subject and one lifecycle, and splitting them across two places is exactly how a
queue-runner ends up executing them out of order.

**Tree these readings were made against**: `website` `a74b9e2` — `master`, clean, the released
chain-013 tree, which is what the deployed composer runs. This is **not** a re-anchoring of this
document's `Verified-At: c85945f`; chain 012's Phase 2 PASS stands for its own tree and is not
re-issued here. What follows is a specification, not a verdict.

### Why the old subject is gone, and why no *found* subject replaces it

All three rows named **record 5712** — R4 and R15 as loaded in the composer, R2 as read from the v1 endpoint. The owner repaired 5712 and 5842 by direct
SQL as part of chain 013 — his words, relayed 2026-08-25: *"They were fixed as a part of 013. sql
statements"*. So the subject is absent in **both** directions: there is no stranded 5712 to observe
failing, and its repaired state was produced by SQL rather than by either supported route, so it
attests to nothing about the composer.

D23 offers *a fresh reproduction* or *a purpose-made scratch record*. **A fresh reproduction is not
available**, and the evidence says so twice over:

1. **The corpus holds no other member.** The 2026-08-23 backfill run
   (`verification/012/backfill-report-1787522866564-i3s31k.md`) is the one run that covered the
   table — `rowsClassifiedThisRun` 4825 = `tableWideRowCount` 4825 — and it found
   `flagStructureDisagreement` = **2 rows, ids 5712 and 5842**, with
   `"Components V2 messages cannot contain embeds or content."` counted **2**. Both are now
   repaired. *(The 2026-08-25 07:47 runs do **not** bear on this: `rowsClassifiedThisRun` is 0 and 2
   against a `tableWideRowCount` of 4839, so their zero counters describe only the rows classified
   in that run — never the table. Stated because the shape of those files invites the opposite
   reading.)*
2. **No supported UI route can mint another one.** At `a74b9e2`, read directly:
   `switchToClassic` (`src/utils/messageMode.ts`) clears the bit — that is D11 — and `switchToV2`
   empties `content`/`embeds`, so the mode toggle cannot leave the bit set over content in either
   direction. Every import route disposes the shape: `resolveContentLoss` (`src/utils/index.ts`)
   classifies bit-over-content-with-no-V2-component as **row D** with `mode: 'classic'`, and
   `applyDisposition` runs `applyModeSwitch('classic', …)`, clearing the bit;
   `NewMessageJsonInput` applies that before the record reaches `NewMessageModal`. **This is the
   good outcome**, not an obstacle: M2 and D11 closed the generator. It is precisely why the
   subject must now be purpose-made.

   *Bounded residue, recorded and dispositioned, not raised as a finding.* `NewMessageModal.onSubmit`
   gates on `gateBeforePersist`, which asks only for **row E**; a row-D payload arriving from the
   Discord-link, webhook or command loaders would therefore persist unmodified, unlike the JSON
   loader which disposes first. Applying the input-robustness disposition order: the callers of
   those loaders are Discord's own API and webhook responses, and Discord rejects
   V2-flag-with-content with `50035` — the premise of this whole chain — so the input cannot arrive.
   **No finding.** Recorded here only so a later reader who notices the asymmetry does not have to
   re-derive its disposition.

### SCR-1 — the subject

A **purpose-made scratch record** in a guild the owner controls. Its `data` payload, exactly:

| Field | Value |
|---|---|
| `username` | `QA Scratch` |
| `content` | `QA-R4/QA-R15 scratch subject - safe to delete.` |
| `embeds` | `[]` |
| `components` | `[]` |
| `flags` | `32768` (`IS_COMPONENTS_V2_FLAG`) |

This is row D / cell B5 — 5712's shape.

**A purpose-made subject can be built wrong, and that is its one real hazard.** `validateMessage`
short-circuits on the first failing check, so a scratch record that is *also* username-invalid is
refused for the **username** reason and never reaches the mutual-exclusivity clause. R4 would then
be observed "passing" — Send disabled — on a record that says nothing about M2-c. This is the same
trap `TODO.md` records for the boolean (an unqualified `valid = false` does not discriminate between
independent refusal reasons; F-QA13, `32737d3`), arriving one level up: **an unqualified "Send is
disabled" does not discriminate either.**

That property is therefore not asserted in prose. It is **executed**:
`verification/012/scratch-subject-SCR1/` runs the shipped `validateMessage`, `isMessageV2` and
`applyModeSwitch` over the exact payload above — 8 assertions, 8 green at `a74b9e2`, this session's
own run. Its **sole-carrier control** asserts that clearing *only* the V2 bit makes SCR-1 fully
sendable, which is what fails if the payload is mis-built. Every one of the 8 assertions was
observed red under a targeted mutant (5 source mutants, 2 fixture mutants; table in that README),
including the sole-carrier control under a fixture given an empty username. No assertion there is
carried as evidence without having been seen to fail.

**Creating SCR-1 without disturbing any other row.** Two steps, and deliberately not one:

1. In the composer, in a guild you control, create a normal Classic message with the `username` and
   `content` above, no embeds, no components. Save it. It is valid at this point; note its id.
2. One SQL statement sets the bit **and** the column together, so the record arrives in the state
   the predicate would have computed for it:

   ```sql
   UPDATE "Messages"
      SET data = (data::jsonb || '{"flags": 32768}'::jsonb), valid = false
    WHERE id = <the id from step 1>;
   ```

   *(Illustrative: `data`'s declared type is `unknown` in the generated schema, so if the column is
   `json` rather than `jsonb` the cast back may need adjusting. The intent — add `flags: 32768`,
   set `valid = false` — is what matters.)*

**Why `valid = false` is set explicitly in the same statement.** The backfill is NULL-only and
idempotent. Leaving `valid` NULL would require a backfill run to classify SCR-1, and that run's
report would then carry SCR-1 in `flagStructureDisagreement` and in the `false` count — landing a
self-inflicted row in the distribution the owner reviews at **QA-R9**, whose whole purpose is to
show him a *real* distribution before the live declaration. Setting the column in the same statement
means **no backfill run is needed and QA-R9 and QA-R20 are untouched by this re-specification.** The
value written is not a guess: the SCR-1 instrument executes the shipped predicate over this exact
payload and it returns the mutual-exclusivity string, so `valid` is `false`.

That the flip to `true` at R15 is then a genuine recompute and not a leftover is guaranteed by the
write path: `src/server/api/utils/shared.ts` writes `valid: isMessageValid(message.data)` on **every**
upsert (M4).

### The re-specified rows

These replace the same-numbered rows in the register above **as the executable specification**. The
superseded wordings are kept in place, unedited, with their State cells routing here. **Read
*SCR-1's lifecycle* below before running any of them** — they share one record and one of them
changes it.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| **R2** *(re-specified)* | post-deploy-observable | **The v1 read for SCR-1's guild shows SCR-1 carrying top-level `valid: false`, while SCR-1 is still in its stranded state — i.e. before R15.** **This row is not about record 5712 and must never be run against it**: 5712 was repaired by the owner's SQL, so a `true` reading there is now the *correct* reading and the superseded row's failure clause would misfire on it | `GET /api/v1/guilds/<guildId>/messages` against production — the same handler R15 uses, which returns `data` verbatim alongside `valid` | **SCR-1**, in its stranded state. Owner executes the read; **a hooks-side agent read was blocked by the classifier in the statbot workspace — if that block fires here, stop and report, never reword** | Once SCR-1 exists (creation step 2 complete), **and before R15**. Needs no backfill run | `valid: false`, key present. **A single observation refutes by construction** | **Three-way reading — do not collapse it.** (a) `valid: true`: **read R4's result before concluding.** If R4 showed the error text with Send unavailable, the predicate is refusing SCR-1 correctly and the stored column is merely stale — the creation statement did not set `valid` — so the observation is **void and SCR-1 must be rebuilt**, not a failure of the field. If R4 showed no error, the field genuinely marks a stranded record valid, **Statbot gates on nothing**, and that is the failure this row exists to catch. (b) Key **omitted**: `valid` is NULL, which is again creation and not the field — void, rebuild. (c) `valid: false`: predicted | devops (owner observes) | **Open — re-specified 2026-08-25 (D27)** |
| **R4** *(re-specified)* | post-deploy-observable | **SCR-1 loaded in the composer opens in Components V2 mode and displays the error text _"Components V2 messages cannot contain embeds or content."_ verbatim; and the Send action for that message is not available.** The reason string is part of the condition, not decoration — see the discrimination note below | The deployed composer, **two screens**: the editor renders the string (`DiscordMessageEditor/index.tsx`, `noContentError`) and the message's Send screen gates the action (`app/message/m/[id]/send/page.tsx`, `allowSave` via `isMessageValid`). Subject construction pre-verified by `verification/012/scratch-subject-SCR1/` | **SCR-1**. No fallback instrument exists: `website` has no DOM harness (chain 013, D28), so this wiring is unexecutable by any suite — which is exactly why the row is an observation | Once SCR-1 exists. **Depends on no other register row** | Error text shown verbatim, Send unavailable. **A single observation refutes by construction** | If Send is available, the composer still tells users a message is fine that Discord rejects with `50035` — the original defect, unfixed, and the affected guild owner gets no warning before he sends. **If the error names a different reason, the observation is void rather than passing** — SCR-1 was built wrong and must be rebuilt before either row means anything | uat (owner observes) | **Open — re-specified 2026-08-25 (D23)** |
| **R15** *(re-specified)* | post-deploy-observable | **From R4's end state: one press of "Classic" on the mode switch, then Save — no JSON modal.** Afterwards the v1 read for that message shows `data.flags` with `IS_COMPONENTS_V2_FLAG` (32768) **cleared**, `content` unchanged, and top-level **`valid: true`** | The deployed composer for the act; **`GET /api/v1/guilds/<guildId>/messages` for the persisted state** — that handler returns `data` verbatim alongside `valid`, so `flags` is readable without database access | **SCR-1**, the same record R4 was observed on. Owner performs the composer act (no agent may act in production). The read half needs no human in principle, but agent reads of production have been classifier-blocked before — **if that block fires, stop and report, never reword** (as R2 already records) | After R4 has been observed **on this same record**. **No dependency on R2, R3 or M6-c** — that is the change; see the ordering note below | Bit cleared, `content` byte-identical, `valid: true`. **A single observation refutes by construction** | If the bit survives, D11's one line did not deliver what the owner chose it for, and the repair guidance now in his hands (D25) leaves the affected guild owner exactly where he started — having followed our instructions. If `content` changed, the guidance's *"Your text, embeds and link buttons are kept"* is false, and a guild owner loses his message while doing what he was told. **Send becoming available is NOT sufficient on its own** — see the flag-free clause below | uat (owner observes) | **Open — re-specified 2026-08-25 (D23)** |

### Three things about these rows that are load-bearing

**1. The flag-free clause is preserved because it is still the only discriminator.** The original
R15 was corrected on 2026-08-23 to carry it, and the reason survives the change of subject intact: a
user reaches Send-available on *pre-D11* code by rebuilding the record as a genuine V2 message —
delete the content, add a Text Display — with the flag still set. The SCR-1 instrument executes that
confounder and shows it: sendable, bit retained. So "Send became available" confirms nothing on its
own; only the **persisted, cleared bit** distinguishes D11 working from D11 absent.

**2. No confirmation modal will appear at R15, and that is correct.** `handleModeSwitch`
(`DiscordMessageEditor/index.tsx`) asks for confirmation only when data would depart — for
V2→classic that is `hasV2Content(components)`, and SCR-1 has no components at all. So the press goes
straight through. **This is not QA-R5 or QA-R6 failing.** Those rows assert the modal on toggles
*with* departing content and are untouched by this re-specification; a reader must not take a
missing modal here as bearing on them.

**3. The 5712 execution-order note above no longer governs these rows — but a new ordering
constraint replaces it on SCR-1.**

> **CORRECTED 2026-08-25 (rev 9, D27).** As written at rev 8 this point said: *"SCR-1 is not 5712,
> so the interference is gone: R4 and R15 can now be executed at any time, in either order relative
> to R2, R3, M6-c and the live declaration."* **That was true when written and is now false.** It
> was defensible at rev 8 because R2 still keyed on 5712, so nothing R15 touched was another row's
> subject. D27 moved R2 onto SCR-1, and with three rows now keyed to one record the interference
> returns — in the same shape as the original, because the cause is the same: **R15 is a persisting
> act.** Corrected here rather than silently, because the superseded sentence is exactly the kind a
> queue-runner would rely on. The current constraint is in *SCR-1's lifecycle* below and that
> subsection, not this one, is authoritative on order.

The 5712 note itself stands unedited. After these three re-specifications it governs no row
specified here; what remains under it is **M6-c's 5712 sentinel**, which is not routed to me and
about which I make no claim beyond the fact — established above — that 5712 is no longer stranded.
No row's requirements are increased by any of this, and no row outside R2, R4 and R15 is changed.

### SCR-1's lifecycle — the ordering constraint, and it is real

Three rows now key on one record, and one of them changes it. **This subsection is authoritative on
order** — including over anything the rev-8 text above said.

| Stage | SCR-1's state | What it is |
|---|---|---|
| after creation steps 1–2 | **α — stranded**: V2 bit set, `content` present, `valid = false` | the state R2 and R4 are written against |
| R4 observes | α, unchanged | an observation; changes nothing |
| R2 observes | α, unchanged | an observation; changes nothing |
| **R15 acts** | **α → β**: bit cleared, `content` unchanged, `valid = true` | **a persisting act; it ends α** |

**So R4 and R2 must both be observed before R15.** This is not a preference. Any save recomputes
`valid` (M4 — `src/server/api/utils/shared.ts` writes `valid: isMessageValid(message.data)` on every
upsert), so R15's save is precisely what removes the state the other two rows exist to observe. Run
out of order, **R2 and R4 return `valid: true` and a Send-available composer, and read as *the fix
never worked* — when in fact it worked and was then overwritten.** That is the identical failure the
original 5712 ordering note warned about; the subject changed, the mechanism did not.

**Order to run, and it is the whole constraint:**

> **create SCR-1 → R4 → R2 → R15 → dispose**

R4 sits before R2 because **R4's result is what disambiguates a `valid: true` at R2** — see R2's
three-way reading. R2 and R4 are otherwise order-free with respect to each other; both must precede
R15.

**One thing SCR-1 has that 5712 never had: it is rebuildable.** If the order is broken — R15 run
early, or SCR-1 built wrong and an observation voided — re-running creation step 2 against the same
record returns it to state α at no cost, and the rows can be observed again. The original rows were
unrecoverable on a misstep because their subject was a real guild owner's message. **A voided
observation here is an inconvenience, not a lost verdict**, and nobody should feel pressure to read
an ambiguous result as a pass.

### This does not gate, condition, or reopen the send (D26)

**D26 waived the pre-send precondition on the repair guidance.** The guidance goes out on the code
reading alone, and the accepted consequence — *the first person to actually run this path is an
affected guild owner following our instructions* — is the owner's, already ruled.

R4 and R15 are **post-deploy-observable** rows: by this register's own classification they gate the
chain's **closure**, never a release act, and the send is not a release act they touch. Stated
flatly so nothing downstream can read otherwise:

- **The guidance may be sent at any time, before or after these rows are executed, in any order.**
- **Neither row is a precondition on the send, and neither may be cited as one.**
- **Nothing here proposes an observation as a condition on the send, and D26 is not reopened.**

The overlap is nonetheless real and is disclosed rather than left for someone to discover: the act
R15 specifies — open in V2 mode, press Classic, save — **is** the mechanism the guidance names,
because D11 and the guidance's Route A are the same code path, and D23 asked precisely that
something verify D11 end to end. So if the owner executes R15 before he sends, he will incidentally
have become the first person to run the route. That is a **consequence to be aware of, not a
condition to be met**; it is his to sequence as he pleases, and either order satisfies both D26 and
these rows.

### Disposal

If the sequence completes, SCR-1 ends clean by construction — bit cleared, `valid: true`, a
perfectly ordinary Classic message — and may simply be deleted. **If any observation is taken and
R15 is never run**, a stranded record is left in the table: it will appear in any future table-wide
backfill as a `flagStructureDisagreement` row with a `false` verdict, and read to a later reader as
a live defect of exactly the kind this chain existed to find. Whoever stops part-way through the
sequence deletes SCR-1 or records its id here.

### Assumption Not Checked — this pass

**This pass assumes the deployed hooks.gg composer is serving `a74b9e2`'s code — the tree I read —
and it does not test that.** Every claim above about what the composer will do at R4 and R15 comes
from reading `src/utils/messageMode.ts`, `src/utils/index.ts`, `src/utils/limits.tsx` and
`DiscordMessageEditor/index.tsx` at that SHA and from executing the pure functions there. **I made
no request to the deployed application**, and no agent here may. Nothing I ran touched a database or
a network host: the SCR-1 instrument ran in a throwaway worktree with `DATABASE_URL` pinned to a
dead port.

**Falsity signature** — it does not look like a deployment problem, it looks like D11 failing. If
the deploy lags the tree (a pending or failed build), R4 and R15 go red in a specific pattern: the
error text appears but the bit **survives** the Classic save (pre-D11 code), or no error text
appears at all and Send is available (pre-M2 code). Both read as *"the fix does not work"* while the
actual fault is that the fix was never served — and on that misreading the repair guidance in the
owner's hands would be withdrawn as broken when it is correct.

**Owner of closure: devops**, at the deployment record, which is where the deployed SHA is named.
This chain's own deployment record (`deployment/012-message-valid-field-deployment.md`) **cannot**
answer it — it predates chain 013's release and names no `a74b9e2`. Concretely: whoever executes R4
or R15 confirms the deployed `website` SHA is `a74b9e2` or later **before** treating a red as a
defect in D11. Named again in the return to steering, so this is routed rather than shelved.

---

## Assumption Not Checked

**This pass assumes that production `Messages.data` payloads are structurally conformant to
`MessageData` — `embeds` and `components` are arrays, `content` and `username` are strings where
present — and it does not test that.** I designed every fixture in this strategy from the type
declarations and the code on the chain-branch trees; **I have read no production row.** The only
production record whose shape I have is 5712, and I have it secondhand from the handoff.

**Falsity signature**: M6-b's evaluation-failure category comes back non-empty — rows where
`validateMessage` throws before returning, at `embeds.reduce` (non-array `embeds`),
`content.trim()` (non-string `content`), or `components.some` (null `components`). Under M6-b's
disposition those rows are written `valid: false`, so **the observable is guild owners reporting
that Statbot stopped delivering messages that send perfectly well** — the same signature as a
correct invalidation, which is what makes it dangerous. My fixture set contains no member drawn from
that class, so nothing I have written would have caught it.

**Owner of closure: the implementer**, at M6-b — the category must carry a count **and** the row ids,
not a count alone, because only the ids let a non-empty class be examined rather than merely noted.
The **owner's** M6-b review (R9) is where its falsity becomes a decision. Both are named again in the
handoff below, so this is routed rather than shelved.

> **Phase 2 state (2026-08-23)**: the mechanism half is built and now guarded — detection was
> tested by the implementer; the category *population* was unguarded (mutation survivor MS-8) and
> is closed by QA's own spec, red-under-mutant observed (see Phase 2, F-QA14). The measurement
> half remains the owner's at M6-b, unchanged.

---

## Handoff

**Phase 1 complete (rev 2). QA Status → Awaiting Implementation.**

**Rev-1 routing, now closed.** All three findings put to the owner or the planner were accepted and
enacted at plan rev 6 (`7af8936`): **F-QA1 → D11** (flag cleared on switch back, folded into M2 with
M2-d revised and M2-e/M2-f added), **F-QA7 → D12** (statbot's deploy ordered after the live
declaration), **F-QA2 → accepted** (M6-b breaks out the flag/structure-disagreement class; R2's
"~1 in 1,976" retired as a threshold and kept as context). Register rows R12 and R13 are closed
against those rulings.

**Nothing now routes to the owner. Both open items closed at rev 4; their executable residue
stays here:**

1. **F-QA8 / R16 — CLOSED.** *"Stands, but point the guidance at the JSON editor."* D11 stands and
   M2-f stays a reachability criterion. What survives the closure is **R19**: the guidance is
   shape-dependent, and stated as one line it will be wrong for one of the two shapes whichever
   line it is.
2. **F-QA9 / R18 — CLOSED.** *"Measure the population first."* The M6-b category is taken and the
   live POST is **withdrawn, not deferred**. **R20** carries the count, worded so that a measured
   zero is not mistaken for a tested-accepted: it would say the class is *empty*, never that the
   shape is *safe*.
3. **`check-repo` is back to 255** — the predecessor-era baseline — with zero failures from this
   document. Both were forward references to Phase-2 destinations; fixed with the checker's own
   `check-repo:ignore` opt-out carrying stated reasons, plus a real `verification/012/README.md`
   registering what will land there. Reconciled by re-run, not by the fix list.

**To the implementer**, when authorised:

- The pre-registered spec at `website/src/utils/__tests__/012-send-gate-partition.test.ts` is
  **written but not committed** — it is `website` source on a chain branch, and that commit grant is
  yours, not QA's. Commit it **before** writing M2, so the record shows Red preceding Green. Its
  frozen expectations are not yours to edit; a disagreement is a finding.
- **Entry conditions, as probe shapes rather than test lists** — prove the comparand exists on the
  live path before building the comparison that consumes it:
  - *before M3*: confirm `(await import('~/utils')).validateMessage === (await import('~/utils/limits')).validateMessage` — the barrel re-exports with `export * from './limits'`, so identity should hold; if it does not, M3-a's by-construction parity has no comparand.
  - *before M4*: confirm Kysely's `.compile()` on the actual upsert returns SQL whose `on conflict … do update set` list is separately inspectable. If it is not, M4-b has no instrument that works without a database, and say so rather than substituting a weaker one.
  - *before M5*: confirm `res.json` is reached through `JSON.stringify` in this Next version, so an `undefined`-valued key really is omitted on the wire.
- **Report the typecheck state on its own line, every round**, separate from the suite result. Vitest
  does not typecheck, and `tsc` will be red against the old pin until the push.
- **M6-b must carry row ids, not just counts**, for the evaluation-failure category — see *Assumption
  Not Checked*, which is yours to close.
- The **TDD Compliance table** is the first thing Phase 2 checks. Missing or incomplete is an
  immediate reject, before any test is run.

- **M2-e is the one to watch for a masking defect.** Clear the bit with `& ~IS_COMPONENTS_V2_FLAG`,
  never `flags = 0`. The spec's bit-masking control is the only cell that catches the difference.

**Next agent: the implementer subagent**, after the owner approves the rev-7 delta and the scoped
critic re-review completes. Nothing in this document blocks M1 or M2. R19 and R20 are enactment
rows, not decisions — R19 decides what is *said* about the recovery, R20 adds one predicate to a
report that already breaks out three other classes. Phase 2 (execution and verdict)
returns to this session.

*Phase 2 not yet reached — no verdict is carried by this revision, and no `Verified-At` anchor is
claimed.*
