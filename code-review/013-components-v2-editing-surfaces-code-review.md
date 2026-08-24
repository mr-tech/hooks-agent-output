---
ID: 013
Origin: 013
UUID: 22d69e06
Reviewed-At: "a4eb00d2c4869844bca4cbfa974749cbacc962fa (chain/013-components-v2-editing-surfaces tip; base c85945f). Re-verified unmoved at the end of the pass. Working tree carried no tracked modifications at either check — only two untracked files, both declared out of scope by the launch brief."
Status: In Review
Status-Detail: >-
  Round 1, M1 only. REJECTED on one HIGH: M1-d's producer/consumer clause is false at this tree and
  M1 widens the class of false "Message Update Detected" prompts. Two of M1's five plan-assigned
  inventory files were never opened. Established by execution over both trees, not by reading —
  probe at verification/013/probe-cr1-hash-producer-consumer/. M2-M8 not reviewed and not scored;
  they do not exist at this tree.
---

# Code Review: Plan 013 — Components V2 support across the editing surfaces (M1 only)

**Plan Reference**: `agent-output/planning/013-components-v2-editing-surfaces.md` (read at rev 13; D22 re-read at rev 14, `ae13df0`)
**Implementation Reference**: `agent-output/implementation/013-components-v2-editing-surfaces-implementation.md` (`599856d`)
**QA Reference**: `agent-output/qa/013-components-v2-editing-surfaces-qa.md` (`98f978e`, Phase 1)
**Critique Reference**: `agent-output/critiques/013-components-v2-editing-surfaces-critique.md` (`d38f057`, cycle 1 pass 5, APPROVE)
**Date**: 2026-08-24
**Reviewer**: code-reviewer-hooks-013

## Changelog

| Date | Agent Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-24 | steering-hooks-013 (cross-session brief) | Review `a4eb00d` — milestone M1 only, mid-implementation | Round 1. Read plan rev 13 per the Reading Order for this role (Decisions Register in full → Milestones → Out of Scope → Risks), QA Phase 1 (EC-5 and the M1 unit obligations), the critique, both architecture documents, and the implementation document. Every count in the implementation document re-derived rather than accepted. Built and ran a two-tree differential probe (`verification/013/probe-cr1-hash-producer-consumer/`) to settle M1-d's final clause by execution. **REJECTED** on one HIGH. |
| 2026-08-24 | steering-hooks-013 (D22 amendment, mid-pass) | Fix rounds run direct with the implementer from the first finding set onward | Read D22 at plan rev 14 (`ae13df0`) directly, not from the relay. This verdict still goes to steering, as the amendment says. Findings from here go to `implementer-hooks-013`; the four never-settled classes are marked inline where they arise (HIGH-1 carries one). |

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
