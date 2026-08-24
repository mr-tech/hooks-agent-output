---
ID: 013
Origin: 013
UUID: 22d69e06
Reviewed-At: "Round 2 (current, binding): 495463ac3198a2c810198bdb6199bb5944ec6505 (chain/013-components-v2-editing-surfaces tip; predecessor a4eb00d, base c85945f). Verified at the start of the pass and re-verified unmoved at the end; no tracked working-tree modifications at either check — the same two untracked out-of-scope files as round 1. Round 1 (superseded, retained for the record): a4eb00d2c4869844bca4cbfa974749cbacc962fa."
Status: In Review
Status-Detail: >-
  Round 2, M1 only, at 495463a. APPROVED_WITH_COMMENTS. HIGH-1 and MEDIUM-1 both closed — verified
  by re-attacking from first principles, not by reading the fix. HIGH-1's class is gone across a
  35-case differential spanning four trees, and the re-attack found the class was WIDER than round 1
  measured (three false-prompt sources predating the chain, now also closed) while confirming the
  normaliser does not blind the detector. MEDIUM-1's extraction is byte-equivalent by execution over
  26 rows, and the implementer's own specs are shown to discriminate under mutation. LOW-1/LOW-2
  closed in the document; LOW-3 carried unchanged to M2; four new INFO items routed to a follow-up
  register per "Rounds stop" rather than held against the tree. Probes at
  verification/013/probe-cr1-hash-producer-consumer/ and probe-cr2-m1bc-extraction-equivalence/.
  M2-M8 not reviewed and not scored; they do not exist at this tree.
---

# Code Review: Plan 013 — Components V2 support across the editing surfaces (M1 only)

**Plan Reference**: `agent-output/planning/013-components-v2-editing-surfaces.md` (read at rev 13; D22 re-read at rev 14, `ae13df0`)
**Implementation Reference**: `agent-output/implementation/013-components-v2-editing-surfaces-implementation.md` (round 1 read at `599856d`; round 2 at `acbbe58`)
**QA Reference**: `agent-output/qa/013-components-v2-editing-surfaces-qa.md` (`98f978e`, Phase 1)
**Critique Reference**: `agent-output/critiques/013-components-v2-editing-surfaces-critique.md` (`d38f057`, cycle 1 pass 5, APPROVE)
**Date**: 2026-08-24
**Reviewer**: code-reviewer-hooks-013

## Changelog

| Date | Agent Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-24 | steering-hooks-013 (cross-session brief) | Review `a4eb00d` — milestone M1 only, mid-implementation | Round 1. Read plan rev 13 per the Reading Order for this role (Decisions Register in full → Milestones → Out of Scope → Risks), QA Phase 1 (EC-5 and the M1 unit obligations), the critique, both architecture documents, and the implementation document. Every count in the implementation document re-derived rather than accepted. Built and ran a two-tree differential probe (`verification/013/probe-cr1-hash-producer-consumer/`) to settle M1-d's final clause by execution. **REJECTED** on one HIGH. |
| 2026-08-24 | steering-hooks-013 (D22 amendment, mid-pass) | Fix rounds run direct with the implementer from the first finding set onward | Read D22 at plan rev 14 (`ae13df0`) directly, not from the relay. This verdict still goes to steering, as the amendment says. Findings from here go to `implementer-hooks-013`; the four never-settled classes are marked inline where they arise (HIGH-1 carries one). |
| 2026-08-24 | implementer-hooks-013 (direct, per D22) | Re-review M1 fix round 1 at `495463a`; implementation doc at `acbbe58` | Round 2. Every enumeration in round 1 re-run rather than inherited, and the differential re-derived from first principles: the round-1 instrument hardcoded the old consumer form, so it was rewired to read the tree under test and then validated by reproducing the round-1 captures case-for-case before it was trusted. Sixteen new cases added, including two false-negative controls the round-1 corpus had no way to express. Second probe built to settle MEDIUM-1's extraction by execution. Implementer's own specs mutation-tested. Two of my own slips are disclosed rather than left silent: I introduced a `check-repo.js` basename collision mid-pass and cleared it by renaming the three probe configs, and one append landed a stray copy of a review-document fragment in the `website` working tree, which I removed within the same minute — `git status` in `website` is back to the same two untracked out-of-scope files it started with, and no tracked file was touched. **APPROVED_WITH_COMMENTS.** |

## Scope Actually Assessed

`a4eb00d` is one commit and it is milestone **M1** in full — no more, no less. Confirmed against the
tree rather than against the commit message:

```
git -C website diff --numstat c85945f a4eb00d
1   0   package.json
2   2   src/app/message/m/[id]/_components/JsonModalBody.tsx
2   2   src/app/message/m/[id]/_components/SaveAsMenu.tsx
116 0   src/utils/__tests__/013-m1-transport-form.test.ts
12  35  src/utils/index.ts
```

Five files, matching the implementation document's Files Modified / Files Created tables. **M2–M8
are not reviewed, not scored and not commented on** — they do not exist at this tree.

Two untracked files are present (`013-m7-mode-follows-flag.test.ts`,
`013-qa-phase1-seed-route-probe.test.ts`). Declared out of scope by the brief; neither is read as
coverage of any criterion here. Noted only because the first fails collection
(`Invalid environment variables`), which changes `numTotalTestSuites` from the 133 the
implementation document recorded to 134 while contributing zero tests — see Verification Re-Run.

## Verification Re-Run (Validation item 1 — "the reviewer and QA re-run, never inherit")

Nothing below is inherited from the implementation document; each was re-derived at `a4eb00d`.

| Check | Method | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` | **0 errors**. The D21 `typecheck` script exists in `package.json`, so Validation item 1 now names a command that runs. |
| Build | `npx next build` | **exit 0**, `✓ Compiled successfully in 9.6s`, 9/9 static pages. |
| Full suite | `npx vitest run --reporter=json --outputFile=…`, totals read from the JSON reporter (never a piped count — RTK.md) | `numTotalTests` **425**, passed **420**, failed **5**, suites **134**. Reconciles with the implementation document except the suite count, explained by the untracked M7 file added to the tree after that document was written. |
| The 5 failures | JSON reporter, per-assertion | **All 5** in `src/utils/__tests__/012-json-editor-repair-path.test.ts`, all `TypeError: standardizeMessage is not a function`. Exactly the expected consequence of M1-a, on the file QA's Phase 1 red-test-domain table names as row 1, which is QA's to re-anchor at Phase 2. **Nothing else is red.** |
| M1-a enumeration (Validation item 2) | `grep -rc standardizeMessage src bot public prisma` — counts computed inside grep | 2 files, 4 hits: `013-m1-transport-form.test.ts:1` (a doc-comment reference in the new spec) and `012-json-editor-repair-path.test.ts:3`. **Zero in `src/utils/index.ts`, zero at any write boundary, seed control or hash.** M1-a holds. |
| R2 / assumption 3 (the plan assigns this capture **to the reviewer**) | `git diff --numstat c85945f a4eb00d -- '*valid*'` → empty | `src/server/api/utils/messageValidity.ts` is **unchanged** between base and tip. No member of R2. Note for the planner: R2's row names the file as `messageValidity.ts`; its actual path is `src/server/api/utils/messageValidity.ts`, and a bare-basename check resolves to nothing. Not a defect in the code — a citation that a reader following it literally cannot resolve. |
| TDD red claim | the implementer's own spec, byte-identical, executed against the pre-M1 tree | **3 of 7 red**, with exactly the quoted `AssertionError: expected '1c94efab' not to be '1c94efab'`. See LOW-1. |

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (D-001–D-005) and
`agent-output/architecture/website.md` (W-1–W-6), both read directly at this pass. Both exist; I state
that having read them rather than inheriting the implementation document's claim that it read them.

**Alignment Status**: **ALIGNED**.

The plan's own `Architectural-Surface` field says *"none added — consolidation of an existing
serialisation seam inside `website`"*, and that is what the diff does. `canonicalize` is a private
module-local helper on the existing seam; no new layer, contract or core path appears. The change
direction — one transport form replacing a lossy display projection — is a reduction in
representations, not an addition.

## TDD Compliance Check

**TDD Table Present**: Yes. **All Rows Complete**: Yes.

**Verified rather than accepted.** I copied `013-m1-transport-form.test.ts` out of `a4eb00d`
byte-identical and ran it against a materialisation of the pre-M1 tree
(`git -C website archive c85945f | tar -x -C /tmp/013-base`, `node_modules` symlinked; `git worktree`
deliberately avoided on a shared repo). Result: **3 failed | 4 passed**, with the exact
`AssertionError` string the document quotes.

So the table's *"Failure Verified? Yes"* row is **true, and stronger than claimed** — see LOW-1.

The `canonicalize` row's exemption argument is **honest and correct as far as it goes**: it states
plainly that the helper is not gated as its own unit and why. I verified the underlying claim rather
than accepting it. The two cases that exercise `canonicalize`'s distinguishing behaviour — key-order
equality and `_key` equality — were **green at `c85945f`**, so neither is red-then-green against the
pre-fix defect. They are not thereby worthless: both discriminate against the obvious wrong
implementation (a bare `JSON.stringify(data)`), which is a real guard. The document does not
overclaim them, and I record this as verified-and-accepted, not as a finding.

What *is* a finding is the pair of round-trip cases offered as M1-b's and M1-c's instrument, which
also pass at `c85945f` — see MEDIUM-1.

## Adversarial Execution — why the trigger is not met, and what was executed instead

M1 adds and modifies no security boundary, no authentication or authorization gate, and no
irreversible action. Enumerated against the diff: `SaveAsMenu.onSubmit` writes a **new** record
(create, not destructive); `JsonModalBody`'s change is a seed initialiser; `hashMessage` feeds a
confirmation prompt; `package.json` gains a script. The one destructive normalisation in the
neighbourhood — `stripKeys` deleting `content`/`embeds` under V2 components — is **not changed by
M1**: it already ran, ahead of `standardizeMessage`, at both call sites before this commit. So
standing the service up and driving it over a raw socket is not the instrument this change calls for.

It does not follow that reading was enough. The claim under review — *"the producer and the consumer
compute the same function over the same form"* — is a decision-neutrality claim in the sense the
review standards name: an argument about it does not settle it and the diff's file list does not
settle it. I therefore **executed both trees over a randomised-by-construction corpus of the affected
input class** and compared the one quantity a decision reads (the hash). That instrument, its
positive controls, its captured runs against both trees, and its stated blind spots live at:

> `agent-output/verification/013/probe-cr1-hash-producer-consumer/`

The process producing the evidence is the **product's own round trip** — `stripKeys`, `makeEditable`,
`hashMessage` and `optionalIdMessageShape` are imported from the tree under test at every step;
nothing is reimplemented. Positive controls are required to **mismatch**, so a green matrix cannot be
confused with a probe that imported nothing.

## Findings

### Critical

None.

### High

**[HIGH] Architecture Alignment / Correctness**: `hashMessage`'s producer and consumer still compute
different functions, so M1-d's final clause is false at this tree — and M1 **widens** the class of
false *"Message Update Detected — any changes you have made will be lost"* prompts

- **Location**: `src/providers/MessageProvider/usePusher.ts`, the `message-update` channel handler
  (`hashMessage(stripKeys(messageRef.current))`); `src/server/api/utils/shared.ts`, `upsertMessage`'s
  Pusher trigger (`hashMessage(message)`); `src/utils/index.ts`, `hashMessage`.
- **Class**: A hash used as a cross-tab equality oracle is computed from **two different
  normalisations of the same message** — the producer hashes the server's zod-parsed `data` (which is
  byte-for-byte what is stored), the consumer hashes `stripKeys(<live draft>)`. Any normalisation the
  shape performs that `stripKeys` does not makes an *unchanged* message hash **unequal**, and fires
  the reload prompt on a tab that has lost nothing.
- **Enumeration**: the divergence class is the shape's normalising leaves that sit under `data`.
  `grep -c "\.trim()" src/server/api/utils/shapes.ts` → **21**;
  `awk 'NR>=39 && NR<=137' src/server/api/utils/shapes.ts | grep -c "\.trim()"` → **10** inside the
  component and embed shapes, of which **5 sit under `components`** and therefore entered the hashed
  form for the first time at M1: `linkButtonShape.label`, `linkButtonShape.url`,
  `thumbnailShape.media.url`, `mediaGalleryItemShape.media.url`, `fileShape.file.url`. Consumer/
  producer call sites: `git grep -c hashMessage a4eb00d -- src` → `usePusher.ts:2`, `shared.ts:3`,
  `utils/index.ts:1`, spec `:8`.
  **What this predicate does not match**: `.trim()` is one divergence form only. It cannot see zod's
  unknown-key stripping, `z.preprocess`, `.default()`, `.catch()`, or refinement-driven rewriting —
  and the probe's corpus, built from the shape's *string* leaves, does not exercise those either. A
  divergence introduced through any of them would pass both the grep and the probe. This limitation
  is a property of the predicate and is stated here, not discovered later.
- **Issue**: This is the clause M1-d exists for, and the plan opened **both** files to make it true.
  Plan Scope's inventory assigns `src/providers/MessageProvider/usePusher.ts` (`message-update`
  handler) → **M1**, and `src/server/api/utils/shared.ts` (`upsertMessage` Pusher trigger, the hash
  producer) → **M1**. Neither was opened. Two of M1's five inventory files were left untouched, and
  the criterion they were opened for is the one that is false.
  Established by execution, not by reading — `run-a4eb00d.txt` vs `run-c85945f.txt`:

  | Case | `c85945f` | `a4eb00d` |
  |---|---|---|
  | SEQ-B B1 — trailing space in classic `content` | MISMATCH | MISMATCH *(pre-existing)* |
  | SEQ-B B2 — trailing space in a **button label** | equal | **MISMATCH (new)** |
  | SEQ-B B3 — leading space in a **V2 accessory URL** | equal | **MISMATCH (new)** |
  | CTRL C2 — a genuine V2 component-body edit | **EQUAL — the defect M1 fixes** | mismatch, as required |

  The last row is worth stating on its own: **M1's headline fix is real and independently confirmed
  here.** The finding is not that M1 broke change detection; it is that M1 turned the hash's blindness
  into the hash's over-sensitivity in a class the plan told it to close, at two files it did not open.
  The prompt is persistent rather than a race window: `MessageProvider`'s `upsert.onSuccess` does
  `setSavedMessage(message)` and never replaces the live draft with the server's parsed form, so the
  divergent draft survives the save and every later broadcast re-fires the prompt until the user
  reloads.
- **Magnitude**: measured where measurable, declared where not. **Measured**: 3 of 19 probe cases
  mismatch at `a4eb00d` against 1 at `c85945f`; **2 of the 3 are new**; the newly reachable trigger
  surface is 5 `.trim()` sites. **Not measured**: how often a real user's draft carries a trimmable
  component string — I have no database access and no production telemetry, and the probe establishes
  a mechanism and a reachable input class, never a rate. That half is an **unmeasured hypothesis** and
  is not what this finding gates on. What it gates on is the measured half: an acceptance criterion of
  the milestone under review is reported delivered and is demonstrably false.
- **Plan Risks row**: this instantiates the falsifier of **R4 — "Hash change breaks cross-tab
  detection during rollout"**, whose falsifier reads *"A 'Message Update Detected' prompt firing on
  every save for a client that has not reloaded."* B2/B3 are literal members. R4's *mitigation* is
  "Accept", but R4's stated cause is **rollout skew** (old client, new server) — a transient. What the
  probe found is a **permanent same-version divergence**, which R4's acceptance argument does not
  cover. Naming the row so the planner can write the prediction record in this cycle rather than a
  later one.
- **Required Action** — eliminate the class, not the three cases:
  - **Preferred (structural)**: give the hash **one** normaliser that both sides call, so the two
    forms cannot drift. Since `canonicalize` now strips `_key`s itself, the consumer's `stripKeys`
    call is no longer needed for its original purpose and is the sole remaining source of asymmetry;
    the natural shape is for `hashMessage` to own the whole normalisation (shape-parse included) and
    for both call sites to hand it the raw message. Note the trade-off before choosing: dropping the
    consumer's `stripKeys` makes a stored row that is not a `stripKeys` fixed point hash differently
    from the composer's view of it — which the probe's SEQ-A shows is *unreachable today*, because the
    only `id`-bearing writer applies `stripKeys` before the payload leaves the browser, but which M4-a
    is scheduled to change. Design the fix against that, not around today's reachability.
  - **Minimum**: at the consumer, normalise through the same shape the producer's input passed
    (`discordMessageShape` / `optionalIdMessageShape`) before hashing, at the single `usePusher` call
    site. This closes B1, B2 and B3 together.
  - **Not acceptable as the fix**: special-casing trim at the five enumerated leaves. That restores
    exactly the reasoning that produced the class — two normalisations kept in sync by hand — and the
    next shape change silently re-opens it.
- **D22 routing, stated so it is not settled in the wrong place**: making the two call sites agree is a
  code fix inside M1's own inventory and is **yours**. Changing what the shape stores — removing or
  relaxing `.trim()` — is a **product-behaviour change** and is **D22 exception 1**: it goes to
  steering for the planner, and must not be agreed between us. If you judge that this is not a finding
  at all, that is **D22 exception 2** — stop and send it to steering rather than arguing it here.

### Medium

**[MEDIUM] Checks That Cannot Fail**: the tests offered as M1-b's and M1-c's instrument pass on the
tree that has the defect those criteria name

- **Location**: `src/utils/__tests__/013-m1-transport-form.test.ts`, `describe('M1-b/M1-c — the
  transport form round-trips the whole message')` — both cases.
- **Class**: A test presented as an acceptance criterion's instrument that exercises a code path the
  change did not touch. It cannot fail under the defect the criterion exists to detect, so a green
  result carries no information about the criterion — while being counted as if it did.
- **Enumeration**: run the spec against the base tree and read which cases are green there.
  `PROBE_SRC=/tmp/013-base/src npx vitest run …` → **4 of 7 green at `c85945f`**, two of which are
  exactly these. Corroborated structurally: the `src/utils/index.ts` hunks touch only
  `standardizeMessage` → `canonicalize` and `hashMessage`; `stripKeys` and `makeEditable` — the two
  functions these cases call — are **unmodified** between `c85945f` and `a4eb00d`.
  Captured at `verification/013/probe-cr1-hash-producer-consumer/run-m1spec-vs-c85945f.txt`.
  **What this predicate does not match**: running the spec against the base tree cannot see a test
  newly written against *unchanged* code inside a file the diff *does* touch, nor one whose fixture is
  green at base for an unrelated reason.
- **Issue**: M1-b is *"Save As is a faithful copy"* and M1-c is *"the JSON view shows the whole
  message"*. What M1 actually changed for those is **two expressions**: `SaveAsMenu.onSubmit`'s
  `data:` and `JsonModalBody`'s seed. Neither is executed by any test. The cases that stand in for
  them test `stripKeys(makeEditable(x))`, which behaved identically before the commit. The
  implementation document is candid that the call sites are *"verified by direct reading"* — but its
  Milestones Completed table still records M1-b and M1-c as delivered, and the Test Coverage section
  presents these two cases as *"M1-b/M1-c instrument"*.
  The plan does not sanction this gap the way it sanctions others: **M1-b and M1-c are absent from
  "Surfaces Without Automated Coverage"**, whose list is explicit (M2-c, M3-b, M3-c, M4-c, M8-B, M8-D,
  M8-E, M8-G, M4-b). The Testing Strategy puts M1-b in the unit suite and says the enumeration is to
  be **"generated across the shape's partition rather than hand-listed"**; QA Phase 1 restates it with
  the partition spelled out, adds *"the JSON modal seed and Copy output parse through
  `discordMessageImportShape` to `≡` the stored `data`"*, and adds *"producer and consumer compute the
  same function over the same form"*. Two hand-authored fixtures at a layer the change did not touch
  is none of those things.
- **Whose work this is, split honestly**: the **generated partition suite is QA's** — the plan says
  *"Test cases are QA's, not this plan's"* — and I am not asking you to write it. What is yours is
  that the two changed expressions are currently **unreachable** by any module-level test, which is
  what forces the substitution in the first place.
- **Required Action**:
  - **Preferred (structural)**: make the two changed expressions reachable without a browser harness —
    extract the Save-As payload and the JSON-modal seed as small exported pure functions over
    `message` in `src/utils/index.ts` (M1's own file) and have the two components call them. The class
    disappears because there is then nothing left that only a component can execute.
  - **Minimum**: correct the claim rather than the code — mark M1-b and M1-c in the implementation
    document as *delivered in code, instrument owed to QA Phase 2*, and stop citing the two round-trip
    cases as their instrument. This is the acceptable outcome if you and QA prefer to leave the
    extraction to M2, which reopens both files anyway.

### Low / Info

**[LOW] TDD Compliance**: the red set is under-reported — 3 cases were red, 2 are named
- **Location**: implementation document, TDD Compliance table, `hashMessage` row; and `a4eb00d`'s
  commit message (*"both hashMessage both-directions cases (flag-bit change, component-field
  change)"*).
- **Class**: a TDD record that names a subset of the cases that were red. It understates rather than
  overstates, so it is not a false claim — but a later reader reconciling the record against the tree
  finds a discrepancy and cannot tell which direction it runs in without re-deriving.
- **Enumeration**: the spec's 7 cases, run at `c85945f` — 3 red (`differs when a message gains V2
  components…`, `differs when the V2 flag bit changes…`, `differs when a component field changes…`),
  4 green. Captured at `run-m1spec-vs-c85945f.txt`. Cannot be broader: the class is one table row.
- **Required Action**: **Minimum** — name all three red cases in the table row. No structural form.

**[LOW] Observability / Evidence**: M1-a's plan-mandated instrument was substituted, not run
- **Location**: implementation document, *"M1-a instrument (Validation item 2)"*.
- **Class**: an acceptance criterion naming two instruments, one of which is discharged by the other.
- **Enumeration**: M1-a says *"enumerated by symbol reference (serena `find_referencing_symbols` on
  `src/utils/index.ts`, and `grep -rc` as the independent count)"*; Validation item 2 says *"M1-a's
  reference list captured in the implementation doc; `grep -rc …` reconciles with it"*. The document
  supplies the grep and calls it the instrument; no reference list is captured. One instrument, not two.
- **Issue, and why it is LOW and not higher**: the outcome is unaffected and I re-derived it. The
  symbol is **deleted**, so `find_referencing_symbols` has no symbol to resolve, and `grep` over the
  name is a strict superset of any reference list — a zero-hit grep is conclusive where a reference
  list would be vacuous. The gap is in the record, not the answer. Worth one line because the same
  substitution at M3 or M8, where the symbols survive, would **not** be conclusive: grep matches
  name-strings, not symbols.
- **Required Action**: **Minimum** — record why grep is sufficient *for a deleted symbol* rather than
  presenting it as the criterion's instrument, so the reasoning does not get reused where it fails.

**[LOW] Error Handling**: the JSON-modal seed can now be the literal `undefined` where it previously threw
- **Location**: `src/app/message/m/[id]/_components/JsonModalBody.tsx`, the `usePassedProp` seed.
- **Class**: an expression whose nullish branch is admitted by the code (`message ?? {}`) but whose
  result is not — `JSON.stringify(undefined, null, 2)` returns `undefined`, and TypeScript's
  `JSON.stringify` overload declares `string`, so `tsc` cannot see it.
- **Enumeration**: one site. `git grep -c "JSON.stringify" a4eb00d -- 'src/app/message/**'` bounds the
  family; this is the only member seeded from a nullable `message`. Cannot be broader without a
  predicate for "stringify of a possibly-undefined value", which no grep expresses.
- **Issue**: disposed of by the review standards' input-robustness order. Step 1: **can the caller
  send it?** The contract says yes — `message ?? {}` is in the source, so the author admitted a
  nullish `message`. Step 2 therefore applies: **the defect is the contract**, not a missing runtime
  guard. Do not add a `?? '{}'`. Either the component's contract says `message` is non-null at render
  (and the `?? {}` goes), or the nullish case is a real state and gets an explicit branch. Step 4 is
  worth stating too: M1 **improved** this — the previous expression called `standardizeMessage(undefined)`
  and threw a `TypeError`. This is a note, not a regression.
- **Required Action**: **Preferred (structural)** — settle the contract at the component boundary and
  delete whichever half is dead. **Minimum** — none required for M1; it belongs with M2, which reopens
  this file.

**[INFO] Dead Code**: `message && hashMessage(message);` — a computed value discarded
- **Location**: `src/server/api/utils/shared.ts`, `upsertMessage`, immediately above the Pusher block.
- **Pre-existing; not introduced by M1 and not changed by it.** Raised because Serialised Shared Files
  assigns `shared.ts` to **M1 only** — no later milestone reopens it — and because it sits in the
  producer half of HIGH-1, which is where the fix for that finding most likely lands. Deleting it
  while you are there costs nothing; deciding it is out of scope is also fine. If the fix for HIGH-1
  goes to the consumer side instead, leave it and say so.

**[INFO] Repository hygiene**: `node tools/check-repo.js` exits 1 — 9 problems, all pre-existing
- Run at this pass per the document-lifecycle self-check. All 9 are chain-012 artifacts: 4 link
  failures and 3 basename collisions under `verification/012/`, and 2 scope-suffix failures, one of
  which — `code-review/012-carry-forward-to-post-refresh-pass.md` — is in **this agent's exclusive
  domain**. My pass creates none of them; re-running after writing this document confirms it adds no
  new failure.
- I have **not** renamed the 012 document. It is cited from `INDEX.md`, chain 012 is still live
  (`012-message-valid-field-code-review.md` is `Status: In Review`), and renaming a committed document
  another document resolves through is not a unilateral act mid-chain. Routed to steering rather than
  done or dropped.

## Positive Observations

These are not courtesies; each was checked.

- **`canonicalize` is the right shape.** Recursive, total over JSON values, `null`-safe
  (`value && typeof value === 'object'` correctly falls through for `null`), order-preserving for
  arrays and order-normalising for objects. It is module-private, which is correct — it has exactly
  one caller and no independent contract.
- **The retirement is complete, not additive.** `standardizeMessage` is **deleted**, not left beside
  its replacement. The review standards' Incomplete Extraction trap — the tested new implementation
  added next to the untested live one, suite green, two implementations of one rule — is precisely
  what was avoided. `grep -rc` over `src`, `bot`, `public` and `prisma` confirms zero source
  references remain.
- **The five red tests were left red.** The 012 file that M1 retires the symbol from was **not
  edited**, exactly as Serialised Shared Files requires, and the implementation document says so with
  the reason. The tempting fix — patch the five failing tests and hand over a green suite — would have
  quietly taken QA's Phase 2 re-anchoring decision away from QA. It was not taken.
- **The scope note is honest.** *"This pass delivered one of seven milestones… this is a scoped,
  honest partial delivery, not a completed implementation"* is the sentence a reviewer most wants to
  find and most rarely does.
- **The `canonicalize` TDD exemption is argued, not asserted.** It states what was not gated and why,
  rather than claiming coverage it does not have. I verified the underlying claim; the argument holds.
- **No source comment was added.** The diff introduces no explanatory prose in the source file and no
  comment addressed to this review. The one comment touched is the pre-existing StackOverflow
  attribution URL, which stays.
- **D21 was enacted minimally.** One line, and `npx tsc --noEmit` now runs — Validation item 1 names a
  command that exists, which it did not before.

## Assumption Not Checked

**This review assumes that `useApiMethods.saveMessage` is the only `message.upsert` caller that
supplies an `id` — and therefore the only writer whose payload becomes a Pusher broadcast — and it
does not test that.** The probe's SEQ-A result (producer and consumer agree in the steady state at
both trees, including the `A9` and `A10` shapes the plan says exist today) rests entirely on it: it is
true only because every broadcast-producing payload passes through `stripKeys` in the browser before
it leaves. I enumerated the upsert callers with `git grep -n "message\.upsert"`, which matches the
mutation-hook name and **cannot see** a payload that acquires an `id` indirectly — through a spread of
an existing message, an `overrideMessage` argument, or a router-level default.

**Falsity signature**: a writer that upserts with an `id` and a payload that never passed through
`stripKeys`. Its observable signature is a SEQ-A mismatch — a *"Message Update Detected"* prompt on a
tab holding exactly what the server stored, with no edit anywhere. If such a writer exists, HIGH-1 is
worse than reported: the divergence would reach the steady state and not only the saving tab, and it
would be reachable without any whitespace.

**Owning stage: QA, Phase 2.** This is not a new obligation invented here — QA's own **F-QA8** already
records that `grep -rc "message\.upsert"` is unsound for the IS-1 writer enumeration and requires
re-derivation by reference-following rather than by that grep. F-QA8's re-derivation closes this
assumption as a by-product. It is named again in Next Steps so it is routed rather than shelved.

## Verdict

**Status**: **REJECTED**

**Rationale**: One HIGH. M1-d's final clause — *"The producer (`upsertMessage`'s Pusher trigger) and
the consumer (`usePusher`) compute the same function over the same form"* — is **false at this tree**,
demonstrated by executing both trees over the affected input class rather than argued from the diff.
The plan opened both of those files under M1 for this purpose and **neither was opened**: two of M1's
five inventory files are untouched, and the criterion they were opened for is the one that fails. The
consequence is measured: the class of false *"any changes you have made will be lost"* prompts is
**wider at `a4eb00d` than at `c85945f`** — 3 mismatching cases against 1, two of them new, through 5
newly-hashed `.trim()` leaves. The implementation document reports M1-d delivered.

The rejection is on that criterion, not on the code's quality. **M1's central fix is real and I
confirmed it independently**: a genuine V2 component-body edit hashed *identically* before this commit
and hashes differently after — my own positive control, not the implementer's test. The diff is small,
correctly scoped, deletes rather than duplicates, and its documentation is unusually honest. Rejected
because an acceptance property of the milestone under review is reported closed and is not.

**This verdict binds `a4eb00d2c4869844bca4cbfa974749cbacc962fa` and no other tree.** Any change to any
covered blob expires it and the review re-runs.

## Required Actions

1. **HIGH-1** — eliminate the two-normalisation class between `hashMessage`'s producer and consumer.
   Structural form preferred; the point fix at `usePusher` is the minimum. **Do not** special-case the
   five trim leaves. If the fix you want changes what the shape stores, that is a product-behaviour
   change → **D22 exception 1**, steering and the planner, not us.
2. **MEDIUM-1** — either make `SaveAsMenu`'s payload expression and `JsonModalBody`'s seed expression
   reachable by a module-level test (preferred), or correct the implementation document so M1-b and
   M1-c read as *delivered in code, instrument owed to QA Phase 2* and stop citing the two round-trip
   cases as their instrument. Your call which; both close it.
3. **LOW-1** — name all three red cases in the TDD table row.
4. **LOW-2** — record why `grep` is conclusive *for a deleted symbol*, so the substitution is not
   reused at M3 or M8 where it would not be.
5. **LOW-3 / INFO-1** — no action required for M1. Judgement calls; say what you decided.

**On re-submission**: send me the new sha. I will re-run every enumeration in this document myself and
re-derive the differential from first principles against the new tree — a fix to a guard or an
instrument is re-attacked, not read. Each disposition needs two things, not one: that the class is
gone, and the path of the captured check that fails if it returns — or `no test`, explicitly.

## Captured Instruments

| Path | What it settles |
|---|---|
| `agent-output/verification/013/probe-cr1-hash-producer-consumer/` | M1-d's producer/consumer clause, by execution over both trees. `differential.test.ts` (19 cases, 2 positive controls), `vitest.config.ts` (tree-selectable via `PROBE_SRC`), `run-a4eb00d.txt`, `run-c85945f.txt`, `run-m1spec-vs-c85945f.txt`, and a README stating the sequences modelled and the probe's blind spots. |

The M1-b/M1-c partition suite is **`no test` from me by design**: Vitest already reaches
`src/**/__tests__/`, the plan puts that enumeration in the project's own suite, and QA owns the cases.
Authoring it here would give it a second home. MEDIUM-1 hands the implementer the extraction that
makes it writable.

## Next Steps

**Handing off to the implementer subagent** — `implementer-hooks-013`, **directly**, per D22 — to
address HIGH-1 and MEDIUM-1 and return a new sha for re-review. Findings go to it; this verdict goes
to steering.

**Routed, not shelved**: the Assumption Not Checked above belongs to **QA Phase 2**, discharged by its
own **F-QA8** re-derivation of the `message.upsert` writer set by reference-following. QA re-derives it
rather than inheriting this review's SEQ-A result.

**To steering**, three items that are not the implementer's: R2's unresolvable file citation
(`messageValidity.ts` → `src/server/api/utils/messageValidity.ts`) and R4's prediction record, both the
planner's; and the mis-suffixed `code-review/012-carry-forward-to-post-refresh-pass.md`, which I have
left in place rather than rename mid-chain.

**QA is not yet due.** This gate is not passed, and QA Phase 2 is scoped to the whole plan, not to M1.

---

# ROUND 2 — re-review of M1 fix round 1 at `495463a`

Everything above this line is round 1 against `a4eb00d` and is retained unedited as the record of
that tree. **The binding verdict is the one below.**

## Scope Actually Assessed (round 2)

```
git -C website diff --numstat a4eb00d 495463a
2    2   src/app/message/m/[id]/_components/JsonModalBody.tsx
2    2   src/app/message/m/[id]/_components/SaveAsMenu.tsx
10   1   src/providers/MessageProvider/usePusher.ts
54   0   src/utils/__tests__/013-m1-fix-round-1-extraction.test.ts
114  0   src/utils/__tests__/013-m1-fix-round-1-hash-parity.test.ts
8    0   src/utils/index.ts
```

One commit, six files, `+190 / -5`. It matches the implementation document's Files Modified / Files
Created tables — re-derived from the tree, not read off the tables. All six were read in full via
`git show 495463a:<path>`, not from the working tree.

`src/server/api/utils/shared.ts` and `src/server/api/utils/shapes.ts` are **unchanged** this round.
Both were nevertheless re-read in full at `495463a`, because the fix's correctness is a claim about
what the shape does and that claim cannot be checked from the side that changed. `shapes.ts` at 259
lines is the load-bearing artifact here; the decisive facts it settles are in HIGH-1's disposition.

**M2–M8 remain unreviewed and unscored.** They do not exist at this tree.

## Verification Re-Run (round 2 — nothing inherited)

| Check | Method | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` **in the real repo** | **0 errors**. Run in `website` itself, not in the `/tmp` archive: `git archive` omits gitignored assets, so a `/tmp` tree fails on `TS2307: Cannot find module '~/assets/img/product_image.png'` — an artifact of the extraction, not of the commit. Worth recording because the naive run exits 2 and looks like a regression. |
| Build | `npx next build` | `BUILD_EXIT=0`. |
| Full suite, **committed tree** | `git stash`-free: run against a `/tmp` materialisation of `495463a` | **427 total / 422 pass / 5 fail**, 136 suites. All five failures are in `012-json-editor-repair-path.test.ts` — the known pre-existing set, unchanged in identity and count from round 1. |
| Full suite, **working tree** | `npx vitest run` in `website` | **434 / 429 / 5**. This is the number the implementation document reports. |
| Provenance of the delta | diff of the two runs | The 7-test delta is entirely the two **untracked, out-of-scope** files. Not a defect; recorded because *the implementer's reported 434/429/5 is a working-tree number and the committed tree's is 427/422/5*. A count that includes files the commit does not contain cannot be reproduced by anyone checking out that sha. Raised as INFO-4. |
| Repo self-check | `node tools/check-repo.js`, run **from `agent-output/tools/`** | **9 problems, all pre-existing 012 artifacts** (4 links, 3 basenames, 2 scope). Same 9 as round 1. I introduced a 10th mid-pass by naming three probe configs `vitest.config.ts`; renaming them to `vitest.cr1.config.ts`, `vitest.cr1-mutation.config.ts` and `vitest.cr2.config.ts` cleared it. Disclosed here rather than left silent: it was my regression in my own domain, caught by the gate and fixed by satisfying it. |

## Enumerations Re-Run — the sweep, not the flagged sites

Per the standing rule, the implementer's Class Sweep Table (present at `acbbe58`, four rows) is
**re-derived, not accepted**, and each predicate is checked against the class's definition rather
than against the phrasing of the sites it was written from.

| Class | Predicate I ran | Hits | Disposition |
|---|---|---|---|
| `hashMessage` consumers | `git grep -c "hashMessage(" -- src bot` plus serena `find_referencing_symbols` on the definition | source: `usePusher.ts` ×1, `shared.ts` ×2, definition in `utils/index.ts` | Complete. Both producer sites are inside the tRPC mutation, downstream of `optionalIdMessageShape.parse` — so they were never the divergent side, which is why leaving `shared.ts` untouched is right rather than merely convenient. |
| `.trim()` in the shape | `git grep -c "\.trim()" -- src/server/api/utils/shapes.ts` | **21 total, 10 in the component/embed region**; identical at `a4eb00d` and `495463a` | The fix did not add or remove a trim leaf. It inherits all 21 by construction. **This is the point**: no leaf list is embedded anywhere, so the count changing does not break the fix. |
| Inline `stripKeys(...).data` payload expressions | `git grep -c "stripKeys(" -- src` + serena `find_referencing_symbols` | 4 source sites | Three are the extraction's; the fourth is `src/app/message/m/[id]/send/page.tsx` `sendWebhook({ message: stripKeys({ data: message.data }).data, … })` — **surfaced by serena, not by my grep pattern**. Transport-form family, not a hash consumer, so outside HIGH-1 and owned by a later milestone. Recorded so it is not rediscovered as a surprise at M5. |
| `saveAsPayload` / `jsonModalSeed` consumers | serena `find_referencing_symbols` on both, union'd with `git grep -c` | exactly the two components, plus the new spec | No stragglers; the extraction left no inline copy behind. |
| `standardizeMessage` (round 1's deleted symbol) | `git grep -c "standardizeMessage" -- src bot` | **4 hits in 2 test files, 0 in source** | Unchanged. Round 1's LOW-2 concern was that a name-grep would be reused where it is not sound; see LOW-2's disposition. |

**Blind spot in my own enumeration, stated at authoring time**: serena's
`find_referencing_symbols` results omitted references living in test files that `git grep` found. I
used the **union** of the two, not either alone. A reader reproducing this with only one instrument
will get a shorter list than mine, and neither instrument sees a reference constructed dynamically
(a string key, a re-export under another name); none exists here, but the predicate could not tell
me so.

## Re-Attack — the fix to a guard is attacked, not read

HIGH-1's fix is a **normalisation guard**, and MEDIUM-1's is a **change to what an instrument can
see**. Both fall squarely under the standing rule that a fix to a guard or an instrument is
re-attacked from first principles. Reading `normalizeForHash` and agreeing with it would not have
been review.

**The round-1 instrument was stale and would have answered the wrong question.** It hardcoded
`hashMessage(stripKeys(...))` as the consumer form — which was the live call site at `a4eb00d` and
is not the live call site at `495463a`. An instrument's validity is indexed to the claim it was
built for; the claim moved. The consumer side was rewired to read the tree under test through a
**namespace import**, deliberately not a named one:

```ts
import * as usePusherModule from '~/providers/MessageProvider/usePusher';
const CONSUMER_FORM = typeof usePusherModule.normalizeForHash === 'function'
  ? usePusherModule.normalizeForHash
  : (m) => stripKeys(m);
```

A missing *named* export is a link-time error; a missing *namespace member* is `undefined`. That
one choice keeps a single instrument runnable against all four trees, so the comparison across them
is a comparison and not four different experiments.

**The instrument edit was itself validated before it was trusted.** Re-running the amended probe
against `a4eb00d` and `c85945f` reproduced the round-1 captures case-for-case. Had the edit changed
the old trees' answers, I would have had a neutered instrument agreeing with the fix — which is
precisely the failure mode that makes "the tests are green" worthless.

## The Differential — four trees, 35 cases

`SEQ-A` models the steady state (composer holds exactly what the server stored). `SEQ-B` models the
saving tab holding its own pre-save draft when its own broadcast arrives — a persistent state, not a
race window, because `MessageProvider`'s `upsert.onSuccess` calls `setSavedMessage(message)` with
the **local draft** and never replaces it with the server's parsed form. `CTRL` rows must mismatch.

| Tree | Result |
|---|---|
| **`495463a`** (fix round 1) | **35 passed** — every `SEQ-B` case equal, all four controls mismatch, both guards green |
| `a4eb00d` (M1, round 1's tree) | 8 failed — `B1 B2 B3 D1 D2 D3 D4 D5` |
| `c85945f` (pre-M1 base) | 6 failed — `B1 D3 D4 D5`; **controls `C2` and `C3` came out EQUAL** |
| `/tmp/013-mutant` (`495463a` with the `safeParse` normalisation deleted) | 8 failed — **identical to `a4eb00d`** |

Three things follow that reading the diff could not have produced.

**1. The class was wider than round 1 measured, and the fix closes the extra width too.** `D3`
(embed title), `D4` (embed field name/value) and `D5` (`username`/`avatar_url`) mismatch **at
`c85945f` as well** — false-prompt sources that predate this chain entirely. Round 1 reported the
class as "3 cases at `a4eb00d` against 1 at `c85945f`". That was correct for the corpus I had and
**understated the defect**: the true pre-existing count is 4, not 1, and the true `a4eb00d` count is
8, not 3. My round-1 corpus was drawn from the *component* string leaves because M1 was what
widened the hashed form, and it structurally could not see leaves that were already hashed before
M1. I declared that blind spot when I authored the corpus; this is what it was hiding. The
correction is against my own round-1 number, not against the implementer.

**2. The fix does not blind the detector.** This is the failure mode a normalising fix invites and
the one no round-1 control could express: a normaliser that over-collapses stops false prompts by
making the detector stop detecting. `C3` (button label `B` → `B2`) and `C4` (embed title `T` → `T2`)
are genuine, non-whitespace edits to *trimmed* leaves — exactly the leaves the fix now normalises —
and both still mismatch at `495463a`. The guard removes the whitespace distinction and nothing else.

**3. The pre-M1 tree was worse in the more dangerous direction, which round 1 only half-saw.** At
`c85945f`, `C2` (a genuine V2 component-body edit) **and** `C3` (a genuine button-label edit) both
come out **EQUAL** — the tab is never told a real change landed, so it can silently overwrite it.
That is a **false negative**, strictly worse than the false prompt M1 introduced. Round 1 recorded
`C2`; `C3` is new this round and confirms the same hole was wider. M1 closed both, and this fix
closes M1's cost without reopening them. That is the clearest single statement of what the milestone
bought.

**Why it holds, structurally.** `normalizeForHash` applies `discordMessageShape` — the server's own
shape — rather than replicating any leaf list. It can therefore only collapse distinctions the
server itself collapses, so nothing that could persist is lost, and the 21-trim-leaf count can move
without breaking it. **That is the argument for accepting the fix. The green matrix is only its
evidence.** The mutant run is what makes the evidence load-bearing: delete the `safeParse` and the
matrix reverts exactly to `a4eb00d`'s 8 failures, so the fix is doing the work and the probe can
detect its absence.

## Finding Dispositions

Each records **two** things: that the class is gone, and the path of the captured check that fails
if it returns — or `no test`, explicitly.

### HIGH-1 — two normalisations across the `hashMessage` seam — **CLOSED**

**Class eliminated, not point-fixed.** The Minimum fix was taken (`normalizeForHash` at the consumer,
`shared.ts` untouched) but it was implemented in the structural spirit: the whole shape is applied,
so the fix has no leaf list to fall out of date. The two things I asked *not* to happen did not
happen — the five trim leaves are not special-cased anywhere, and no product behaviour changed, so
D22 exception 1 never fired.

I confirmed the decision to leave `shared.ts` alone rather than accepting it: both producer call
sites sit downstream of the tRPC mutation's `optionalIdMessageShape.parse` (`routers/message.ts`,
`upsert`), so the producer was already emitting the parsed form and was never the divergent side.

**Check that fails if the class returns**:
`agent-output/verification/013/probe-cr1-hash-producer-consumer/differential.test.ts` —
`SEQ-B` `B1`–`B3` and `D1`–`D5`, with controls `C1`–`C4` and guards `N1`/`F1`. Captured runs
`run-r2-495463a.txt`, `run-r2-a4eb00d.txt`, `run-r2-c85945f.txt`, `run-r2-mutant.txt`. Mutant-killed,
so the check is known to be able to fail.

**Also `no test` from me, deliberately, for the in-suite half**: the implementer's
`013-m1-fix-round-1-hash-parity.test.ts` is the right home for the in-repo regression, Vitest already
reaches it, and QA owns the acceptance cases. I mutation-tested it rather than authoring a rival —
see MEDIUM-1.

### MEDIUM-1 — payload/seed expressions unreachable by a module-level test — **CLOSED**

The **Preferred** structural fix was taken: `saveAsPayload` and `jsonModalSeed` extracted to
`src/utils/index.ts`, both components rewired, imports narrowed, no inline copy left behind
(enumeration above, 4 `stripKeys` sites, 3 accounted for and the 4th out of scope).

**Behaviour preservation was settled by execution, not by argument.** A "pure extraction" claim is a
claim, and the diff's file list does not settle it. `probe-cr2-m1bc-extraction-equivalence/` holds
the literal `a4eb00d` inline expressions — rebuilt from the tree's own `stripKeys`, its only
ingredient — beside the tree's exported functions and compares `JSON.stringify` byte-identity plus
`toStrictEqual` over 26 rows. **27/27 at `495463a`, every row identical; 7 failed against a mutant
that drops `components`.**

**Check**: `agent-output/verification/013/probe-cr2-m1bc-extraction-equivalence/equivalence.test.ts`,
runs `run-cr2-495463a.txt` and `run-cr2-mutant.txt`.

**Second check, on the instrument rather than the code** — the question round 1 actually raised was
whether the expressions were *reachable by a test*, so a green test is not by itself the answer;
a test that cannot fail would also be green. `mutation-check/` runs **the implementer's own three
specs** against an arbitrary tree via `PROBE_SRC`: 16/16 on the clean tree, **4 failed on the
mutants** — the three hash-parity cases die on the `normalizeForHash` mutation and the extraction
case dies on the `saveAsPayload` mutation. Their specs discriminate. Round 1's diagnosis is also
confirmed from the other side: `013-m1-transport-form.test.ts` **survived both mutants**, which is
exactly why it could not stand as M1-b/M1-c's instrument.

### LOW-1 — TDD table named one red case where there were three — **CLOSED**

Verified in `acbbe58` against my own re-derived red set (`run-m1spec-vs-c85945f.txt`, 3 of 7 red),
not against the document's own account. Three rows added for `normalizeForHash`, `saveAsPayload`
and `jsonModalSeed`. **`no test`** — a documentation defect has no runtime signature.

### LOW-2 — grep-for-a-deleted-symbol substitution, unqualified — **CLOSED**

The added line is better than what I asked for. It states the *reason* the substitution was sound —
"a name-string grep is a strict superset of any reference list for a symbol that no longer exists" —
and then draws the boundary itself: **not** reusable at a milestone where the symbol under scrutiny
survives. That is the general form, and it is the form that stops the substitution being reused at
M3 or M8 where it would be unsound. **`no test`** — a reasoning record, not behaviour.

### LOW-3 — `jsonModalSeed`'s declared return type is unsound — **CARRIED, unchanged, M2's**

`JSON.stringify`'s lib signature returns `string` unconditionally, so a `data`-less input yields the
*value* `undefined` from a function typed `string`. The extraction neither worsened nor closed this:
the inline expression carried the identical unsoundness. Now measured rather than asserted — CR2
rows `E9` (no `data` key), `E13` (`null`) and `E14` (`undefined`) show both old and new returning
`undefined`. Not raised against this round; M2 reopens `JsonModalBody` and owns it.

**Check**: the three CR2 rows above, which will change behaviour the day the type is fixed.

### INFO-1 — dead `message && hashMessage(message);` in `shared.ts` — **unchanged, correctly left**

The implementer left it and said so. Right call: `shared.ts` is untouched this round by design, and
touching it to tidy one dead expression would have put the producer side into a fix round that had
no business there.

## New This Round — follow-up register, not held against the tree

Per **"Rounds stop"**: this round's differentials establish that none of the four items below changes
a decision — CR1 is 35/35 and CR2 is 27/27 at `495463a`, so there is no behavioural quantity left
for them to move. They are recorded and routed, not made into another fix round. None is CRITICAL or
HIGH; reject authority is not engaged.

### INFO-2 — `normalizeForHash` normalises `data` only, while `hashMessage` hashes `{name, data}`

**Location**: `src/providers/MessageProvider/usePusher.ts`, `normalizeForHash`.
**Class**: a normaliser whose scope is narrower than the hashed form's scope — any field the shape
normalises that the normaliser does not reach reopens HIGH-1 for that field.
**Enumeration**: `messageShape`'s fields, read at `495463a`:
`name: z.string().min(1).max(MAX_MESSAGE_NAME_LENGTH)` — **no `.trim()` and no transform of any
kind**; `guildId: discordIdShape.nullable().optional()`; `data: discordMessageShape`. So the gap is
**empirically empty today** and the fix is correct as written. It does not match a transform added
via `z.preprocess` at the `messageShape` level rather than on the leaf, which would not appear in a
`.trim()` grep.
**Magnitude**: zero today — measured, not assumed: `SEQ-B` guard `N1` (name whitespace parity) is
**green at `495463a`**, which it can only be while `name` carries no transform.
**Required Action**: none now. `N1` is the standing guard: it goes red the day someone adds a
transform to `messageShape.name` without widening `normalizeForHash`, which is exactly when a person
needs to be told. **Check**: `probe-cr1-hash-producer-consumer/differential.test.ts`, `GUARD | N1`.

### INFO-3 — a near-vacuous case in the implementer's spec

**Location**: `src/utils/__tests__/013-m1-fix-round-1-hash-parity.test.ts`, the
`falls back to the stripKeys form (not a throw)` case, which asserts
`expect(() => normalizeForHash(...)).not.toThrow()`.
**Class**: a test whose assertion cannot fail under the defect it names. `safeParse` never throws by
contract, so this case passes on the pre-fix tree, on the mutant, and on a `return stripped`
stub — it constrains nothing.
**Enumeration**: one occurrence; `git grep -c "not.toThrow" -- src` = 1. Confirmed by execution
rather than by reading: this case is among the 12 that **survived** both mutants in
`mutation-check/run-implementer-specs-mutant.txt`, while its three siblings died.
**Required Action** (eliminate the class, not the line): assert the *value* — that the fallback
returns the `stripKeys` form — rather than the absence of a throw. My own `F1` row does this and can
be copied. Not worth a round on its own; fold it into whichever round next touches this file.

### INFO-4 — the two new specs carry review-thread prose in the source file

**Location**: file-level docblocks in `013-m1-fix-round-1-hash-parity.test.ts` and
`013-m1-fix-round-1-extraction.test.ts`.
**Class**: explanation addressed to a human reader — and specifically to *the review process*,
naming finding IDs and citing this review's probe path — living in a source file. No tool consumes
it; it fails the tool test, and rationale's two homes are the test's own assertions or the
agent-output record.
**Enumeration**: `git grep -c "code review HIGH-1\|code review MEDIUM-1" -- src` = 2 files. The
predicate matches this round's phrasing only; it would not see a docblock that explains itself
without naming a finding.
**No comment gate is installed in this repo** (`ls -d .husky` → absent), so there is no allowlist to
be authoritative here.
**I am recording this as INFO and not as a defect of this round, because I passed the identical
pattern at round 1**: `013-m1-transport-form.test.ts` carries the same file-level docblock and I
raised nothing. Raising it now would be a moving standard. The under-application was mine; the
standard applies from the next round of this plan onward, uniformly, and the existing three
docblocks are grandfathered rather than singled out.

### INFO-5 — the reported suite count is a working-tree number

**Location**: implementation document (`acbbe58`), the `434 / 429 / 5` line.
**Class**: a verification figure that cannot be reproduced from the sha it is attached to.
**Enumeration**: one figure; the committed tree at `495463a` gives **427 / 422 / 5** over 136 suites,
and the 7-test delta is entirely the two untracked out-of-scope files.
**Magnitude**: no correctness impact — the five failures are the known `012-json-editor-repair-path`
set at both counts, and no in-scope test is affected. It matters only as provenance: a reader
checking out `495463a` will not see 434.
**Required Action**: when a suite figure is recorded against a sha, take it from a clean
materialisation of that sha. Applies to my round-1 count too, which had the same provenance.

## Assumption Not Checked

**This review assumes that every row already in `Messages.data` parses cleanly under the current
`discordMessageShape`, and it does not test that.** The fix's guarantee is conditional:
`normalizeForHash` returns the shape-normalised form **only when `safeParse` succeeds**, and falls
back to the bare `stripKeys` form — that is, to the exact pre-fix behaviour, with HIGH-1's class
fully live — when it does not. Every one of my 35 cases feeds it a payload the current shape
accepts, so the entire green matrix is a statement about the success branch. I verified the fallback
does not throw (`F1`); I did not verify that the fallback is unreachable in the steady state.

**Falsity signature**: a stored row that the *current* shape rejects — a row written before a shape
tightening, an import path with looser rules, a leaf whose constraint was narrowed after the row
landed. Its observable signature is HIGH-1 recurring on exactly those messages and no others: a tab
editing one legacy message gets the false *"any changes you have made will be lost"* prompt on
whitespace, while every other message in the same session behaves correctly. That per-row split is
the discriminator — a defect that follows the row rather than the user or the surface.

**Owning stage: QA, Phase 2.** This needs the stored corpus, which I have no access to from a review
pass and will not acquire by reading source. The discharging check is mechanical: run
`discordMessageShape.safeParse` over the `data` column and report the reject count and the shape of
the rejects. If it is zero, the fallback is unreachable and HIGH-1 is closed unconditionally; if it
is not, the fallback branch needs its own decision and the finding reopens at that scope. Named
again in Next Steps so it is routed rather than shelved.

## Verdict

**Status**: **APPROVED_WITH_COMMENTS**

**Rationale**: Both blocking findings are closed, and closed by re-derivation rather than by reading
the fix. HIGH-1's class is gone across a 35-case differential spanning four trees, and the fix is
shown to be load-bearing by a mutant that reverts the matrix exactly to `a4eb00d`'s eight failures.
The structural reason is the one that matters: `normalizeForHash` applies the server's own shape
rather than replicating any leaf list, so it can only collapse distinctions the server itself
collapses, and the 21-trim-leaf count can move without breaking it. MEDIUM-1's extraction is
byte-equivalent over 26 rows by execution, and the implementer's own specs are shown to discriminate
under mutation — which is what MEDIUM-1 actually asked for, since a green test that cannot fail
would not have closed it.

The re-attack also **corrected my own round-1 numbers against myself**: the class was wider than I
measured — 8 mismatching cases at `a4eb00d` and 4 at `c85945f`, not 3 and 1 — because three
false-prompt sources predate the chain entirely and my component-scoped corpus could not see them.
The fix closes those too. And two new false-negative controls establish the direction round 1 could
not: at `c85945f` a genuine V2 component-body edit **and** a genuine button-label edit both hashed
identically, so the pre-M1 tree silently failed to warn on real changes. M1 closed that; this round
closes M1's cost without reopening it.

**Comments, not conditions.** LOW-3 is carried unchanged to M2, which reopens `JsonModalBody` and
owns it. INFO-2 through INFO-5 are routed to the follow-up register: this round's differentials
establish that none of them changes a decision, and per "Rounds stop" they do not hold the tree. The
Assumption Not Checked above is QA Phase 2's and is the one thing that could reopen HIGH-1 — it is
routed, not waived.

**This verdict binds `495463ac3198a2c810198bdb6199bb5944ec6505` and no other tree.** Verified at the
start of the pass and re-verified unmoved at the end. Any change to any covered blob expires it and
the review re-runs.

## Required Actions

**None blocking.** The gate is passed.

Carried forward, owned elsewhere:

1. **LOW-3** → **M2**, with `JsonModalBody`. CR2 rows `E9`/`E13`/`E14` are the standing measurement.
2. **Assumption Not Checked** → **QA Phase 2**. `safeParse` over the stored `data` corpus.
3. **INFO-2** → no action; guard `N1` is the standing tripwire.
4. **INFO-3** → fold into whichever round next touches the hash-parity spec.
5. **INFO-4** → applies uniformly from the next round of this plan onward; the three existing
   docblocks are grandfathered, and the under-application at round 1 was mine.
6. **INFO-5** → take suite figures from a clean materialisation of the sha they are attached to.
   Applies to my round-1 count as much as to the implementation document's.

## Captured Instruments (round 2)

| Path | What it settles |
|---|---|
| `agent-output/verification/013/probe-cr1-hash-producer-consumer/` | HIGH-1's disposition, by execution across four trees. `differential.test.ts` (35 cases: `SEQ-A` ×20, `SEQ-B` ×9, 4 positive controls incl. two false-negative controls, 2 guards), `vitest.cr1.config.ts` (tree-selectable via `PROBE_SRC`, output via `PROBE_OUT`), round-2 captures `run-r2-495463a.txt` / `run-r2-a4eb00d.txt` / `run-r2-c85945f.txt` / `run-r2-mutant.txt`, round-1 captures retained, README extended with a round-2 section stating what was added, what the instrument edit was validated against, and what it still cannot see. |
| `agent-output/verification/013/probe-cr1-hash-producer-consumer/mutation-check/` | Whether the **implementer's own** specs discriminate. `vitest.cr1-mutation.config.ts` runs them against an arbitrary tree via `PROBE_SRC`; `run-implementer-specs-clean-495463a.txt` (16/16) and `run-implementer-specs-mutant.txt` (4 failed). |
| `agent-output/verification/013/probe-cr2-m1bc-extraction-equivalence/` | MEDIUM-1's behaviour-preservation claim, by execution rather than by argument. `equivalence.test.ts` (26 corpus rows + 1 positive control), `vitest.cr2.config.ts`, `run-cr2-495463a.txt` (27/27), `run-cr2-mutant.txt` (7 failed), README. |

All three carry a positive control and all three are shown to kill a mutant, so a green run from any
of them is distinguishable from an instrument that imported nothing.

**Still `no test` from me, explicitly**: the in-suite regression for HIGH-1 and the M1-b/M1-c
partition cases. Vitest already reaches `src/**/__tests__/`, the plan puts those enumerations in the
project's own suite, and QA owns the acceptance cases. Authoring them here would give them a second
home. What I owed instead was evidence that the in-suite versions can fail, and `mutation-check/`
is that evidence.

## Next Steps

**Handing off to the qa subagent for test execution.**

**Routed, not shelved** — the Assumption Not Checked above belongs to **QA Phase 2**: run
`discordMessageShape.safeParse` over the stored `Messages.data` corpus and report the reject count.
A non-zero count reopens HIGH-1 at the scope of the fallback branch; zero closes it unconditionally.
QA's existing **F-QA8** re-derivation of the `message.upsert` writer set — round 1's assumption,
still open — remains due in the same phase.

**To steering**, unchanged and still not the implementer's: R2's unresolvable file citation and R4's
prediction record, both the planner's and both **HELD** as one pass under owner ruling D23 (plan rev
15, `b9e35c8`) — until that pass runs, the authoritative statement of both is this document at
`ba0f6e3`, per steering's own instruction. The mis-suffixed
`code-review/012-carry-forward-to-post-refresh-pass.md` stays in place under the standing 012 hold.

**Where a finding instantiates a plan Risks row**: HIGH-1 was R4's falsifier and it is now closed;
that outcome is the planner's to write into the prediction record when D23's held pass runs.
