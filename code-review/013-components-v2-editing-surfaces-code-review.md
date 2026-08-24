---
ID: 013
Origin: 013
UUID: 22d69e06
Reviewed-At: "Round 6 (current, binding): 816d7fd5804fee5d51e526d7d01622624bde108b (chain/013-components-v2-editing-surfaces; the round-5 fix round 52e0e8a plus its comment correction 816d7fd) — M8 ENTRY CONDITION EC-3 only, not milestone M8. Verified at the start of the pass and re-verified at the end. The tree moved TWICE during the pass: 52e0e8a -> 816d7fd (re-anchored mid-pass; emitted-code identity between the two established by execution with a positive control, so the attack results carry and were re-run anyway), then -> a3e758b (the M2+M8 wiring, a DIFFERENT UNIT OF WORK that this verdict does not reach). Superseded, retained for the record: round 5 at 0c8fad5 (EC-3 fix), round 4 at 92ce026 (EC-3), round 3 at 18407d8 (M7), round 2 at 495463a (M1 fix round), round 1 at a4eb00d (M1). NO VERDICT IN THIS DOCUMENT TRAVELS BETWEEN THESE TREES."
Status: In Review
Status-Detail: >-
  Round 6, the round-5 fix round, at 816d7fd. APPROVED_WITH_COMMENTS. No HIGH. Both round-5 MEDIUMs
  are closed STRUCTURALLY (the Preferred fix each time) and both closures are established by
  execution over an EXHAUSTIVE 1120-draft corpus with an independent oracle and a mutant control,
  not by reading the diff: D18's core invariant (gate.mustAsk <=> applyDisposition throws) holds
  1120/1120, no settled draft loses content it was carrying (795/795), and every row-E option's
  advertised dropSet equals the keys the real serialiser changes (325/325). Purity survives a change
  that put it at risk. Two new MEDIUM, both about ENFORCEMENT rather than behaviour. First: the EC-3
  contract is checked by NO instrument in the repository — tsconfig excludes **/__tests__ and vitest
  does not typecheck, so re-adding the very parameter round-5 MEDIUM-1 deleted leaves tsc at 0
  errors and the suite 32/32 green; the round-5 disposition record counts a control that is dead.
  Narrows but does not close at a3e758b (4 of 7 EC-3 symbols still have zero typechecked consumers,
  gateBeforePersist among them). Second: chosenOption still carries a draft-derived label the
  applier never reads, so the class closed at one parameter is residual at the one beside it — and
  this residual UNDERSTATES the loss where its predecessor overstated it, so the safe-direction
  argument does not carry over. Two LOW: the test named as MEDIUM-1's regression check is separated
  from its sibling by none of four mutants, and review-round numbers survive in test-name strings
  where a comment-shaped sweep cannot see them. Adversarial execution correctly exempt at 816d7fd
  (trigger tested mechanically, empty, with a control) and EXPIRED at a3e758b — round 7 is under the
  mandatory obligation.
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
| 2026-08-24 | implementer-hooks-013 (direct, per D22) | Review M7 — mode follows the flag (D15) — at `18407d8`; implementation doc at `83164da` | Round 3. First pass on M7. Plan re-read at rev 16 per this role's Reading Order (Decisions Register -> Milestones -> Out of Scope -> Risks), including D15/D16/D7/D17/D24 and R8. Every enumeration in the implementation document re-derived. Third probe built (`probe-cr3-mode-predicate/`) to settle the classification change by execution over the whole 36-cell (flag x structure) partition rather than from the diff, with three mutants as controls and the implementer's own spec mutation-checked. **APPROVED_WITH_COMMENTS.** |
| 2026-08-24 | steering-hooks-013 (correction, post-verdict) | "QA is not the next stage" — second round running | Correction pass, no verdict change and no re-review: `18407d8` unmoved. Verified the phasing against the plan myself rather than on the relay — Testing Strategy says QA Phase 1 runs **before** implementation, so Phase 2 follows implementation's completion, not a milestone; five milestones remain and the implementer's next step is M8's **EC-3** (QA's F-QA4, High). Round 3's Next Steps rewritten and round 2's left standing with a marked correction rather than silently edited. Round 1 had this right; rounds 2 and 3 drifted from it, which is my regression and is recorded as such. Steering has lodged the underlying definition gap for retrospective → pi (`~/.claude/agents/INBOX.md`, `ee1ae0e`). |
| 2026-08-24 | steering-hooks-013 (D25 round) — self-initiated follow-up | Steering asked to be told if the per-round expected-six check is thinner than it is being treated as | Between-rounds note, **no verdict, no re-review**; `18407d8` remains the binding tree and `92ce026` is unsubmitted. Tested the check rather than introspecting about it. One of my own worries collapsed — the five `standardizeMessage` reds are per-test, not module-load, so nothing is masked and the check is stronger than I had framed it. The baseline itself was prose, so it is now an instrument: `verification/013/baseline-expected-six/` (`63b9a91`), four controls, end-to-end run re-deriving round 3's 443/437/6. Building it diagnosed **INFO-4** — suite figures are quoted from the shared working tree, which vitest contaminates with other sessions' untracked test files; measured twice at +7/+7/+0, cause named as `qa-hooks-013`'s 7-test probe. Residual blind spot stated, not closed, with CR3 named as the compensating instrument. No QA re-anchor requested. |
| 2026-08-24 | implementer-hooks-013 (direct, per D22) | Review M8's **entry condition EC-3** — the pure resolver and persist gate — at `92ce026` | Round 4. First pass on EC-3; **not** milestone M8, which has not started. Fourth probe built (`probe-cr4-disposition-gate/`) to settle the disposition by execution over the whole eight-cell partition, with expectations transcribed from the **plan's** table rather than the code, four mutants as controls, and one attempted mutant recorded as NOT RUN because the shell left a literal `\n` and its green is not evidence. TDD red re-derived by reverting `utils/index.ts` to `18407d8` against the `92ce026` spec (15/4 TypeError, matching the table). Implementer's spec mutation-checked and genuine. `tsc`, `next build` and the failure set all re-derived on clean extractions; two instrument failures of my own (Turbopack rejecting an out-of-root `node_modules` symlink, and a gitignored `.env`) are recorded in `gates/README.md` rather than reported as build failures. Three MEDIUM, one LOW (routed to QA), two INFO. **APPROVED_WITH_COMMENTS.** |
| 2026-08-24 | implementer-hooks-013 (direct, per D22) | Re-review the EC-3 fix round at `0c8fad5` (`2f49182` + `0c8fad5`) | Round 5. Sweep re-run rather than the flagged sites checked; the round fixed a **guard** and an **instrument**, so both were re-attacked from first principles rather than read. Fifth probe built (`probe-cr5-application-half/`): all three round-4 MEDIUMs verified closed by execution, the implementer's vacuous-`.toThrow()` self-catch confirmed by reintroducing the loose form (it passes against a tree with no `applyDisposition`), and the new import cycle probed in **both** module orders. Two new MEDIUM found by re-attack, both in `applyDisposition` — an untied draft/disposition pair demonstrated to destroy a body silently, and an advertised `dropSet` that disagrees with what is enacted. One INFO records my own round-4 inconsistency (the spec's header row table). **APPROVED_WITH_COMMENTS.** |
| 2026-08-24 | implementer-hooks-013-2 (direct, per D22) | Re-review the round-5 fix round at `52e0e8a`; re-anchored mid-pass to `816d7fd` | Round 6, and the first round by this reviewer generation — carried from files (`e0f477f`, `3304fad`), not from a conversation. Every sweep and every figure in the implementation document re-derived rather than accepted, including the architecture document's absence, which was re-checked from the workspace root rather than inherited. The implementer's comment-only claim for `816d7fd` was settled by **executing** it — emitted JavaScript compared byte-for-byte at both commits — after a **positive control** caught my first comparison reporting IDENTICAL over four empty files, which is recorded in full because it is the defect this role raises against others. Sixth probe built (`probe-cr6-derivation-round/`): an exhaustive 1120-draft corpus, an oracle written independently of the implementation, a mutant control, and a purity check under frozen inputs. TDD red re-derived (10 red, matching) and **classified** — 5 discriminators, 4 pre-existence TypeErrors, 1 throw-match — so MEDIUM-2's fix is test-gated and MEDIUM-1's is not. Both round-5 MEDIUMs closed structurally; two new MEDIUM about enforcement rather than behaviour, one of them found by mutating the code to re-add the deleted parameter and watching every gate stay green. The implementer's comment sweep was verified by **breaking its predicate**, which found the class is wider than its comment-shaped form. The plan's Status field was NOT set, for the reasoning given in the verdict. **APPROVED_WITH_COMMENTS**, bound to `816d7fd` and to no other tree. |

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

> **CORRECTION, 2026-08-24, added after round 3** — *this line was wrong when written and is left
> standing with its correction rather than rewritten.* **QA was not the next stage at `495463a`.**
> The plan runs **QA Phase 1 before implementation** (Testing Strategy), so Phase 2 runs after
> implementation *completes*, not after a milestone; seven milestones remained at this tip. The
> correct next stage was the implementer's next milestone. Round 1 stated this correctly ("QA is not
> yet due … QA Phase 2 is scoped to the whole plan, not to M1") and rounds 2 and 3 both drifted from
> it; `steering-hooks-013` corrected it after round 3. The routing below — that these items are
> **owned by** QA Phase 2 — is unaffected and stands; only the claim about what runs next was wrong.

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

---

# ROUND 3 — milestone M7, "Mode follows the flag" (D15), at `18407d8`

Rounds 1 and 2 above are M1 and are retained unedited. **M1's approval at `495463a` is unaffected
by this round**; nothing M7 touches is in M1's file set. The binding verdict for M7 is below.

## Scope Actually Assessed

```
git -C website diff --numstat 495463a 18407d8
3    5   src/app/message/m/[id]/send/page.tsx
4    5   src/providers/MessageProvider/index.tsx
98   0   src/utils/__tests__/013-m7-mode-follows-flag.test.ts
22   0   src/utils/messageMode.ts
```

One commit, four files, `+127 / -10`. Re-derived from the tree, not read off the implementation
document's tables, and matching them. All four read in full via `git show 18407d8:<path>`.

Three files were **not** changed and were nevertheless read in full at `18407d8`, because M7's
correctness is a set of claims about them: `src/utils/limits.tsx` (whose `validateContentRequirements`
is the predicate M7-a says the mode must agree with), `src/utils/index.ts` (`hasV2Components`,
`V2_COMPONENT_TYPES`) and `src/components/DiscordMessageEditor/index.tsx` (the toggle that calls
`applyModeSwitch`, whose output M7-b changes without the file changing).

`JsonModalBody.tsx` is untouched. The implementer says this was confirmed with steering; I confirmed
it against the plan independently — M7's **Files** line reads *"The modal's mode writer
(`JsonModalBody.tsx` Load) is **not** M7's file: it is M8's."* Correct.

**M2–M6 and M8 are not reviewed, not scored and not commented on.** They do not exist at this tree.

## Verification Re-Run (nothing inherited)

| Check | Method | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` **in the real repo** | **0 errors** (`TSC_EXIT=0`). Run in `website` itself: a `/tmp` materialisation fails on gitignored assets, which is an artifact of `git archive`, not of the commit. |
| Build | `npx next build` | `BUILD_EXIT=0`, **0 warnings** (`grep -ci warn` over the captured output → 0). |
| Full suite, **committed tree** | clean `/tmp` materialisation of `18407d8` | **443 total / 437 pass / 6 fail**, 26 test files. |
| Failure identity **and reason** | `grep -E "AssertionError\|TypeError"` over the run | 5 × `TypeError: standardizeMessage is not a function` — byte-for-byte the known pre-existing set, **same reason** as at `495463a`, not merely the same count — plus **one new**: `012-message-mode.test.ts > switchToV2 — classic -> v2 branch > clears content and embeds, preserves components and flags`, failing `AssertionError: expected 32768 to be +0`. That is D16 being enacted against a test that asserts the pre-D16 behaviour. |
| Provenance of the reported figure | diff against the implementation document | The document reports `450 / 444 / 6`, a **working-tree** figure; the committed tree gives `443 / 437 / 6`. The 7-test delta is the one untracked out-of-scope file. Same class as round 2's INFO-5, second occurrence — see INFO-3. |
| **R2's plan-assigned reviewer obligation** | `git rev-parse c85945f:src/server/api/utils/messageValidity.ts` vs `18407d8:` | **Discharged.** Both resolve to blob `f477b7129e49e69ccf1b73b4654359e5d4c5f698` — byte-identical between chain base and tip. Risk R2's mitigation reads *"the file's hash unchanged between base and tip is captured by the reviewer"*; this is the first round that has captured it. Note the path: the plan cites the file bare, and it resolves only as `src/server/api/utils/messageValidity.ts` — round 1's R2 finding, still held under D24. |

**On the one red test.** It is not a defect and it is not the implementer's to fix. The plan names it
by name and assigns it: Plan Scope records `012-message-mode.test.ts` among the *"existing tests …
whose `flags` assertions M7-b makes red"* and closes *"Named here as a coordination fact; what to do
with them is QA's."* Serialised Shared Files repeats it: *"The 012 test files named in Plan Scope are
QA's to re-anchor; the implementer does not edit them."* I verified both lines rather than accepting
the implementer's account of them. **Validation and Release Conditions item 1 — the full suite green
— therefore remains unmet at this tip, by design, and is QA's to close.** It is a release condition,
not a milestone gate, and it does not hold this verdict.

## Enumerations Re-Run — the sweep, not the flagged sites

| Class | Predicate I ran | Hits | Disposition |
|---|---|---|---|
| `IS_COMPONENTS_V2_FLAG` readers in source | `git grep -c "IS_COMPONENTS_V2_FLAG" 18407d8 -- src bot` | 6 source files: `constants/messageLimits.ts`, `scripts/backfillValid.ts`, `utils/index.ts`, `utils/limits.tsx`, `utils/messageMode.ts`, `utils/sendWebhook.ts` | Exactly the plan's own six. Confirms the implementer's count; re-derived, not accepted. |
| `setMessageMode` writers | `git grep -c "setMessageMode" 18407d8 -- src` | 3 writers (`MessageProvider/index.tsx`, `DiscordMessageEditor/index.tsx`, `JsonModalBody.tsx`) plus the definition in `useEditableState.ts` and the type in `global.d.ts` | Matches the plan's enumeration. M7 owns the first, M7-b reaches the second through `applyModeSwitch`, and the third is M8's by the plan's own assignment. |
| The two V2-type sets | `git grep -c "V2_TYPES\|V2_COMPONENT_TYPES"` plus reading both definitions | `limits.tsx`'s `V2_TYPES` and `utils/index.ts`'s `V2_COMPONENT_TYPES` are **both** `new Set(V2_COMPONENT_TYPE_VALUES)` | They cannot disagree on membership: one array constant, two Sets. This is why M7-a's "same predicate" clause holds — see INFO-1 for the residue. |
| Consumers of the three new exports | `git grep -c` union'd with serena `find_referencing_symbols` | `send/page.tsx`, `MessageProvider/index.tsx`, the M7 spec, and `messageMode.ts` itself | No stragglers; no inline copy of either predicate left behind in either component. |
| `hasV2Components` consumers | same | `utils/index.ts` (definition + 2 internal uses), `messageMode.ts` | Both former component-level callers are gone, which is M7-c's point. |
| Test files referencing `switchToV2` / `applyModeSwitch` | `git grep -c` over `src/utils/__tests__` | 4 files | **Two of them do not reference the product's function at all** — see MEDIUM-2. This is the enumeration that produced this round's most consequential finding. |

**Blind spot, stated at authoring time**: `git grep -c` on a symbol name matches a *name*, not a
symbol, so it cannot distinguish a reference to the product's export from a local declaration that
shadows it. That is precisely what it failed to distinguish here, and it is the same limit round 1's
LOW-2 established for a *deleted* symbol — the superset property that made the grep sound there makes
it unsound here, where the symbol survives. I used serena `find_referencing_symbols` for the new
exports and read both suspect files directly rather than trusting either count.

## Adversarial Execution — why the trigger is not met, and what was executed instead

M7 touches `showV2PatchWarning`, which decides whether a caution is shown before a user patches an
already-sent Discord message. That is adjacent to an irreversible action, so the trigger deserves an
answer rather than an assumption.

**It is not met.** The predicate feeds exactly one thing —
`<NullableComponent show={showV2PatchWarning}>` — and I checked the gate it does *not* feed:

```
const allowSave = !!(isMessageValid && selectedWebhook && !isLoading && (!showEdit || oldMessage));
```

`allowSave` does not read the warning, and M7 does not touch `allowSave`. So M7-c can add or remove
a caution; it cannot permit or forbid the irreversible act. There is no authentication or
authorisation gate anywhere in M7's four files, and no security boundary.

**What was executed instead**, because "it only affects a warning" is still a claim about direction:
the probe asserts **monotonicity of the warning set over the whole 36-row partition** — no message
that warned before M7 stops warning, and both suppressing conjuncts (`showEdit`, `oldMessage`) still
suppress on every row. Measured: six cells change `false → true`, zero change `true → false`. The
change is strictly toward more caution, and that is established by running it, not by reading it.

## The Differential — 36 cells, four trees

`probe-cr3-mode-predicate/` runs the tree's own `isMessageV2`, `detectMessageMode`,
`showV2PatchWarning` and `applyModeSwitch` over every combination of six flag states and six
component shapes. The new side transcribes nothing; the old side is a **declared model** — two lines
of guard quoted verbatim from `git show 495463a:.../MessageProvider/index.tsx`, wrapped around the
*real* `hasV2Components` imported from the tree under test, because `detectMode` is declared inside
`useValue()` and is not importable. That asymmetry is stated in the probe and in its README rather
than glossed.

M7-a's "same predicate" clause is checked against the product, not against a model:
`validateContentRequirements` emits *"Components V2 messages cannot contain embeds or content."*
**iff** its own internal `hasV2` is true, so giving it content turns that error into a readable oracle
for a variable that is not exported.

| Tree | Result |
|---|---|
| **`18407d8`** (M7) | **122 / 122 passed** |
| `495463a` (pre-M7) | 11 failed — **6 in section A** (the mode predicate disagrees with `validateContentRequirements` on every flag-only row) and **5 in section D** (`switchToV2` does not set the bit; OQ-7's misreport is live) |
| `18407d8` + flag disjunct deleted from `isMessageV2` | 14 failed — killed |
| `18407d8` + `switchToV2` stops ORing the bit | 5 failed — killed |
| `18407d8` + `applyModeSwitch`'s ternary inverted | 11 failed — killed |

Four things follow that reading the diff could not produce.

**1. Twelve of thirty-six mode cells changed, and they fall into two classes, not one.** Six are
cells the flag decides — the V2 bit set with no V2 components — of which four flip `classic → v2`
(D15/D12's class, the milestone's whole purpose) and two go from *no mode written* to `v2`. The other
six are cells where **a mode is now written where the pre-M7 guard wrote none**, and **four of those
have nothing to do with the flag**. See MEDIUM-1.

**2. Nothing moves in the unsafe direction.** No row that classified as `v2` becomes `classic`, and
after M7 no row in the partition is left with no mode written at all. Research G4's gap is closed
for the whole partition, not only for the flag-carrying records the plan's text discusses.

**3. `applyModeSwitch` — the plan's *named* M7-b instrument — behaves over the D7 residue.** Driven
through `applyModeSwitch` rather than through `switchToV2`/`switchToClassic` directly, over four
unrelated-bit combinations in both directions plus a round trip: bits preserved exactly, Action Rows
surviving the outbound leg, and the round trip restoring the original `flags` value. D7's residue is
intact in both directions, which M7-b requires and which no test in M7's own spec asserts through
the named instrument (LOW-1).

**4. M7 makes 5712's recovery non-destructive, and that is bigger than the plan's one-line note.**
Pre-M7 the record opened in **Classic**, so reaching the flag-clearing toggle required switching *to*
V2 first — and that outbound leg unconditionally cleared `content`. The existing 012 spec states this
as settled fact in its own header comment: *"reaching the V2->classic branch that D11 patches
requires toggling classic->V2 FIRST. That outbound leg unconditionally clears content and embeds."*
After M7 the record opens in V2 and **one toggle to Classic clears the bit with the content intact** —
executed, section E. R8 calls this "one lossless toggle"; this is the first time it has been run.

## Findings

### MEDIUM-1 — the class of records whose mode changes is wider than the plan and the document describe

**Location**: `src/providers/MessageProvider/index.tsx`, `detectMode` (the removed
`if (msg?.data?.components)` guard); recorded against
`agent-output/implementation/013-components-v2-editing-surfaces-implementation.md` (`83164da`) and
the plan's **R8** row and **Validation and Release Conditions item 5**.

**Class**: a behaviour change described by one of the two classes it produces. The implementation
document and R8 both frame M7's mode change as *"every existing record with the bit set and no V2
components opens in V2 where it opened in Classic before"*. That is true and it is half of it. The
old guard skipped **every** message with no `components` key, flag or no flag, leaving whatever mode
was standing; the new predicate writes a mode for all of them. So an ordinary classic message — no
flag, no components key — now actively sets **Classic** where it previously set nothing.

**Enumeration**: the full 36-cell partition, run rather than reasoned —
`probe-cr3-mode-predicate/run-cr3-18407d8.txt`, rows marked `B*`. Six cells gain a written mode;
**four of them (`R00`, `R10`, `R40`, `R50`) are not flag-related**. `git grep -c` cannot enumerate
this class at all: it is a property of a removed conditional, not of any symbol, which is why it took
execution to find. The predicate does not see load paths that never called `detectMode` in the first
place — if one exists, its cells are outside this count.

**Is the code wrong? No.** M7-a says the mode is *"V2 iff … and **Classic otherwise**"*, over the
class *"every message the composer loads into the editor"*. Writing Classic for a classic message is
the criterion, not scope growth. The implementation is correct and I am not asking for a code change.

**Magnitude**: user-visible, and this is a **reasoned consequence, not a measurement** — I have no
production access and state it as a hypothesis. A user composing in V2 who then loads a classic
message (a Save As copy, a local-store restore, a bot code) previously kept V2 mode and now gets
switched to Classic. Whether that is better is not mine to judge; that it is a change nobody has
written down is the finding.

**Required Action — eliminate the class of *undescribed* change, not the line**:
- **Preferred (structural)**: the implementation document's M7 section states the change as its two
  classes with the cell counts, so no downstream stage reconstructs it from the diff; and **the
  planner widens R8 and Validation item 5's deployment-record clause** to name both classes, since
  R-5 currently obliges the deployment record to state only the flag class.
- **Minimum**: the implementation document records the second class in one sentence.

**This one is not settled between us.** The half that touches R8 and R-5 is **D22 exception 1** — a
finding implying the plan is incomplete — and goes to steering for the planner, not to the
implementer. Flagged inline as the rule requires.

**Check that fails if the class is reintroduced or mis-described**:
`agent-output/verification/013/probe-cr3-mode-predicate/mode-differential.test.ts`, section B, whose
`B*` rows print the class explicitly; captured at `run-cr3-18407d8.txt`.

### MEDIUM-2 — two of the four files named as M7's red-test domain cannot go red, and their transcriptions have drifted

**Location**: `src/utils/__tests__/012-send-gate-partition.test.ts` and
`src/utils/__tests__/012-json-editor-repair-path.test.ts`; recorded against the implementation
document's reconciliation sweep (`83164da`), the plan's **Plan Scope** red-domain sentence, and QA's
**red-test domain** table rows 1 and 4 (`qa/013-components-v2-editing-surfaces-qa.md`).

**Class**: a test that **models** the function under test instead of executing it, listed as
coverage of that function — and, downstream of that, a reconciliation sweep that reads *"still
green"* from such a file as evidence that nothing regressed.

Both files declare their own local `switchToV2` / `switchToClassic`. `012-send-gate-partition.test.ts`
says so in a comment — *"Transcribed from handleModeSwitch's `switchMode`"*, and above it,
*"SEMANTICS the implementation must have, not the implementation."* Its local `switchToV2` is
`{...prev, content: '', embeds: []}` — the **pre-D16** behaviour. The product's is not that any more.
The transcription has silently drifted, and it is green.

Three consequences, in increasing order of importance:

1. **The plan's prediction could never have fired.** Plan Scope predicts M7-b turns
   `012-send-gate-partition.test.ts` red *"(3)"* and lists `switchToV2`/`applyModeSwitch` *"3"* for
   `012-json-editor-repair-path.test.ts`. Neither file calls the product's function. Predicted red:
   four files; actual red: one. The prediction was derived by counting a **name**, which is exactly
   the substitution round 1's LOW-2 established as unsound wherever the symbol survives — and QA
   re-derived it independently and reached the same wrong answer **using the same instrument**, its
   own predicate being *"every file whose text references a symbol whose behaviour a milestone
   changes … enumerated by `grep -rc`"*. QA recorded the predicate's blind spot for
   helper-mediated reachers; the converse blind spot — a local declaration shadowing the name — is
   not recorded, and it is the one that bit.
2. **The sweep's conclusion is right by accident.** The implementation document reports these files
   *"fully green — no unexpected regression"*. Green from a file that cannot go red carries no
   information about M7 either way. The reasoning, not the conclusion, is the defect.
3. **`012-send-gate-partition.test.ts` now carries a claim M7 has falsified**, in a file whose own
   header says *"Do not 'update expectations to match' — a disagreement is a finding, not a stale
   fixture."* Its comment reads *"detectMode derives mode from structure, never flags"* and its
   narrative asserts that recovering 5712 *"requires toggling classic->V2 FIRST"* and that *"that
   outbound leg destroys the content."* After M7 all three are false — the probe's section E shows
   the one-toggle lossless exit. A pre-registered spec asserting a superseded narrative, still
   passing, is the failure mode its own header was written to prevent.

**Enumeration**, run before this finding was written, with two independent predicates that agree:

```
git grep -c "^function switchToV2\|^function switchToClassic" 18407d8 -- src/utils/__tests__
  → 012-json-editor-repair-path.test.ts: 2      012-send-gate-partition.test.ts: 2
git grep -lc "Transcribed from\|not the implementation\|SEMANTICS the implementation" 18407d8 -- src bot
  → the same two files, and no others
```

Both predicates match only these two files. Neither can see a transcription written as
`const switchToV2 = …`, a transcription of a *differently named* product function, or an inline
re-implementation with no declaration at all — so the true class may be larger and these two
predicates cannot tell me by how much.

**Settled by execution, not by reading.** `mutation-check/` runs both files, plus the M7 spec,
against three mutants of `messageMode.ts`. `012-send-gate-partition.test.ts` fails on **none** of
them — it is inert with respect to the module it is listed as covering.

**Required Action — eliminate the class**:
- **Preferred (structural)**: both files import `switchToV2`/`switchToClassic` from
  `~/utils/messageMode` and delete their local copies. A transcription that can drift is the defect;
  a file that imports the product cannot drift silently. Where a test genuinely needs the *old*
  behaviour as a historical fixture, it states the old value as a literal rather than as a
  re-implementation that looks live.
- **Minimum**: the stale comment and the falsified narrative in `012-send-gate-partition.test.ts` are
  corrected, and QA's red-domain table records that rows 1 and 4 are name-matches, not behaviour
  members.

**Owner: QA, not the implementer.** Both are 012 test files, which Serialised Shared Files puts
explicitly out of the implementer's hands. What *is* the implementer's is the sweep's reasoning — see
the Required Actions list. The plan-side half (Plan Scope's prediction) is **D22 exception 1** and
goes to steering.

**Check**:
`agent-output/verification/013/probe-cr3-mode-predicate/mutation-check/` —
`run-implementer-specs-mut-isv2.txt`, `run-implementer-specs-mut-switchv2.txt`,
`run-implementer-specs-mut-apply.txt`. The absence of any `012-send-gate-partition.test.ts` failure
across all three is the finding's evidence.

### LOW-1 — M7's own spec does not reach M7-b's named instrument, and the document says it does

**Location**: `src/utils/__tests__/013-m7-mode-follows-flag.test.ts`; the implementation document's
**Test Coverage** bullet for M7.

**Class**: a milestone's stated instrument replaced by an assertion one level below its call site, so
the dispatch between them is unasserted — plus a coverage claim naming a symbol the spec never
imports.

M7-b's criterion names its instrument explicitly: *"Instrument: the draft `applyModeSwitch` returns,
asserted over the class in the suite."* The spec asserts `switchToV2` and `switchToClassic` directly.
The document's Test Coverage bullet says the spec covers *"`switchToV2`/`switchToClassic`/
`applyModeSwitch` over the D7-residue … and OQ-7 … properties"*.

**Enumeration**: `git grep -c "applyModeSwitch" 18407d8 -- src` → `messageMode.ts` 1,
`DiscordMessageEditor/index.tsx` 2 (the real toggle), `012-message-mode.test.ts` 4. The M7 spec: **0**.
The predicate would not see the symbol reached through an alias or a re-export; neither exists here.

**Settled by execution.** With `applyModeSwitch`'s ternary inverted, the M7 spec passes **entirely**;
the mutant is killed only by `012-message-mode.test.ts`
(`mutation-check/run-implementer-specs-mut-apply.txt`). So the dispatch *is* covered — by the one
file the plan hands to QA for re-anchoring, and which currently carries this round's single red test.
That is a fragile place for a milestone's named instrument to live.

**Magnitude**: low. `applyModeSwitch` is a one-line ternary and it is covered today.

**Required Action**: **Preferred** — the M7 spec's M7-b cases drive `applyModeSwitch(targetMode, …)`
rather than the two branch functions, which is what the criterion names and costs one line per case;
my section D can be copied. **Minimum** — correct the Test Coverage bullet, which currently claims
coverage the spec does not have.

### LOW-2 — the TDD table under-counts the red set (second instance on this plan)

**Location**: implementation document (`83164da`), TDD Compliance table, the `detectMessageMode` and
`switchToV2` rows.

**Class**: a TDD table whose per-symbol red counts do not sum to the red set that was actually
observed — so a reader cannot reconstruct the red run from the table.

**Enumeration and measurement**: I ran the M7 spec from `18407d8` against `495463a`'s source
(`mutation-check/vitest.redcheck.config.ts`, captured at
`mutation-check/run-m7spec-vs-495463a.txt`). **15 of 16 red**, the one green being the unchanged
`switchToClassic` case — which the document names correctly. The table's rows sum to 14:
`isMessageV2` 4 + `detectMessageMode` 4 + `showV2PatchWarning` 4 + `switchToV2` 2. The measured
reasons are `isMessageV2` 4, `detectMessageMode` **5**, `showV2PatchWarning` 4, `AssertionError` 2.
The extra `detectMessageMode` red is M7-b's OQ-7 case, which calls `detectMessageMode` and so went
red on a `TypeError` rather than on the flag assertion the table attributes to that row.

**Why it is worth a line**: this is the **second instance of the same class on this plan** — round 1's
LOW-1 recorded a TDD table naming one red case where there were three (`ba0f6e3`, `Reviewed-At:
a4eb00d`), and this is the second (`e1ca0e8` line, `Reviewed-At: 18407d8`). Two citable instances
make it a **pattern**, and it is routed as one in Next Steps. The under-count is small each time; the
recurrence is the point, because the TDD table is the only record that the red was red for the
milestone's reason.

**Required Action**: state each row's red set by *case*, and where a case goes red for a reason
belonging to a different row, say so. **Minimum**: correct the two counts.

### INFO-1 — one product predicate, two implementations, and why the tidy fix is the wrong one

M7-a requires the mode predicate to be *"the same predicate as `validateContentRequirements`'s
`hasV2`, so the two never disagree on one record."* What is delivered is two implementations that
agree: `isMessageV2` composes `hasV2Components` with the flag mask; `limits.tsx` inlines
`components.some((c) => V2_TYPES.has(c.type)) || !!(flags & IS_COMPONENTS_V2_FLAG)`.

They cannot disagree on membership — `V2_TYPES` and `V2_COMPONENT_TYPES` are both
`new Set(V2_COMPONENT_TYPE_VALUES)`, one array constant — and I verified agreement by execution on
all 36 rows (probe section A, 36/36 `agree`). The residue is the guard: `hasV2Components` returns
`false` for a non-array `components`, where `limits.tsx` would throw; `validateMessage`'s
destructuring default makes that unreachable today.

**I am not asking for the tidy fix, and this is the reason.** `src/utils/index.ts` does
`export * from './limits'`, so `limits.tsx` importing `isMessageV2` from `~/utils/messageMode`
— which imports `~/utils` — closes a cycle `limits → messageMode → utils/index → limits`. The
duplication is a consequence of the module layout and predates M7. A cleanup that unified them the
obvious way would trade a harmless duplication for an import cycle: the safe fix here is not the tidy
one. If it is ever unified, the structural home is a leaf module both can import — beside
`V2_COMPONENT_TYPE_VALUES` in `constants/messageLimits.ts`, or a new `utils/v2.ts` — and that is M2's
or a later milestone's call, not M7's.

**Check**: probe section A, all 36 rows, plus `CTRL-1`, which asserts that a structural-only
predicate **disagrees** with `limits.tsx` on a flag-only row — so section A's agreement is
distinguishable from a comparison of two references to the same function.

### INFO-2 — the removed `?.data?.` guard: disposed of, not overlooked

The old `detectMode` and `messageHasV2` both guarded `msg?.data?.components`; the new predicates
guard only the message and then read `data.components`. Applying the input-robustness order rather
than reflexively asking for a runtime guard: **`ActiveMessage.data` is declared non-optional**
(`type ActiveMessage = … & { data: EditableMessageData }`, `src/@types/global.d.ts`), so the contract
says the caller cannot send `data: undefined` — step 1, no finding, stop. Nothing here could exploit,
so step 3 does not reopen it. Recorded explicitly so a later round does not re-raise it as an
oversight; the removal is correct and the old guard was defending against something the type forbids.

### INFO-3 — suite figure provenance, second occurrence

The document's `450 / 444 / 6` is a working-tree figure; `18407d8` itself gives `443 / 437 / 6`. No
correctness impact — the six failures are identical in identity and reason at both counts — but the
figure cannot be reproduced by anyone checking out the sha it is attached to. Round 2 raised the same
class (INFO-5) against my own round-1 count as much as against the document's. Second occurrence;
routed with LOW-2 as part of the same record-accuracy pattern in Next Steps.

## Positive Observations

- **The closure section is the best thing in this round's document.** The QA-routed Assumption Not
  Checked asked whether the two predicates could be lifted without changing behaviour. The
  implementer read both closures directly, reported that **the risk QA named did not materialise**,
  and then reported the thing QA had not asked about: that a *faithful* lift would have shipped the
  bug M7 exists to fix, because both originals were structural-only. Answering the question that was
  asked, finding that it was the wrong question, and saying both — rather than reporting "no closure
  risk, extraction safe" and lifting — is the behaviour the assumption mechanism exists to produce.
- **The fix inherits the disjunction rather than re-deriving it.** `isMessageV2` composes the
  existing `hasV2Components` and the existing constant; it invents no leaf list and no second
  definition of "V2". This is the same structural instinct that made M1's fix round hold, applied
  again without being asked.
- **`switchToClassic` was left alone.** I-D11's behaviour is untouched, the plan says it should be,
  and the spec's one green-at-base case documents that deliberately rather than by omission.
- **The `switchToV2` diff is `+1` with no deletions and preserves every other bit** — `| FLAG` rather
  than an assignment. D7's residue survives in both directions, which I verified through
  `applyModeSwitch` over four bit combinations and a round trip, not from the diff.
- **`JsonModalBody.tsx` was not touched**, against the pull of it being the obvious third mode
  writer. The plan assigns it to M8 and the implementer checked rather than assumed.
- **The red was verified for the right reason before the green.** Fifteen of sixteen cases red at the
  chain base, and the sixteenth green because its behaviour genuinely does not change.

## Assumption Not Checked

**This review assumes that `MessageProvider`'s four `detectMode` call sites are the complete set of
paths by which a message reaches the composer's editor, and it does not test that.** Everything above
is a statement about the *predicate*: given a message, which mode does it classify to. Whether the
predicate is *reached* on every load path is a different claim, and the probe cannot make it — the
repo has no browser harness (plan assumption 5), so I read the call sites rather than exercising
them. M7-a's class is *"every message the composer loads into the editor — by id from the API, from
a bot code, from local store, a Save As copy, a JSON Load, a New Message import"*, which is six named
entry points against four call sites; the plan reconciles that by assigning the JSON Load to M8, but
the reconciliation is prose and I did not execute it.

**Falsity signature**: a load path that populates `message` without passing through `detectMode`.
Its observable signature is specific and distinguishable from every other defect in this plan — the
mode on screen is *stale rather than wrong*: it shows whatever the previous message's mode was, so
the same record opens in V2 or Classic **depending on what the user looked at before it**. Path
dependence is the discriminator. A record that always opens in the same wrong mode is MEDIUM-1's
class or a predicate bug; a record whose opening mode depends on history is an unreached call site.

**Owning stage: QA, Phase 2.** QA's required-tests table already scopes M7-a over the load-path
class, and the discharging check is a call-site enumeration by reference-following from
`setMessageMode` and from the provider's message-setting effects — not by grep, for the reason
MEDIUM-2 documents at length. Named again in Next Steps so it is routed rather than shelved.

## Verdict

**Status**: **APPROVED_WITH_COMMENTS**

**Rationale**: M7's code is correct and the milestone's substance is delivered. That is established
by execution over the whole 36-cell (flag × structure) partition rather than argued from a
four-file diff: 122/122 at `18407d8`, 11 failures at `495463a` locating the defect precisely on the
six flag-only rows and on `switchToV2`, and three independent mutants — one per moving part — all
killed. Every one of the twelve cells whose classification changed is explained by a clause of M7-a,
no cell moves in the unsafe direction, the patch warning only ever grows, and D7's residue survives
the toggle in both directions through the plan's named instrument. The predicate agrees with
`validateContentRequirements` on all 36 rows against a positive control that shows the comparison can
fail. Typecheck 0, build 0/0.

**Two MEDIUM findings, neither of which is a defect in the code.** MEDIUM-1 is a change that is
correct and under-described: the mode-writing class is twice the size the plan's R8 row and the
implementation document state, and four of the six newly-written cells have nothing to do with the
flag. MEDIUM-2 is a pre-existing test-quality defect that M7 *surfaced* rather than caused — two of
the four files named as M7's red-test domain transcribe the mode functions locally, cannot go red
from a `messageMode.ts` change, and now carry a narrative M7 has falsified while still passing. Its
owner is QA. What is the implementer's in MEDIUM-2 is narrower and worth stating plainly: a
reconciliation sweep that reads *"still green"* as evidence, from files that could not have gone red.

**Neither MEDIUM blocks QA**, and one of them is QA's to fix. The single red test in the suite is
predicted by name in the plan and assigned to QA by two separate sections, both of which I verified
rather than accepted; Validation item 1 therefore remains open by design.

**Not settled here, per D22 exception 1** — both halves that imply the plan is incomplete go to
steering for the planner, not to the implementer: R8 and Validation item 5's deployment-record clause
name only the flag class (MEDIUM-1), and Plan Scope's red-domain prediction counts names rather than
behaviour members (MEDIUM-2).

**This verdict binds `18407d8d03411103cec06124c8c476362c0ad3f8` and no other tree.** Verified at the
start of the pass and re-verified unmoved at the end. Any change to any covered blob expires it and
the review re-runs. **M1's approval at `495463a` stands and is untouched by this round.**

## Required Actions

**None blocking.** The gate is passed and QA may proceed.

To the implementer, before M7 is called closed in the record:

1. **MEDIUM-1 (minimum half)** — the implementation document states the second mode-writing class:
   a mode is now written for every record with no `components` key, not only flag-carrying ones.
   Four of the six newly-written cells are not flag-related.
2. **MEDIUM-2 (the half that is yours)** — the reconciliation sweep's entry for
   `012-send-gate-partition.test.ts` and `012-json-editor-repair-path.test.ts` records that green
   there is **uninformative**, because both transcribe the functions locally. The conclusion may
   stand; the reasoning may not.
3. **LOW-1** — drive M7-b's cases through `applyModeSwitch` (preferred), or correct the Test Coverage
   bullet, which claims coverage the spec does not have.
4. **LOW-2** — correct the two TDD-table red counts and state each row's red set by case.
5. **INFO-3** — take suite figures from a clean materialisation of the sha they are attached to.

To QA, at Phase 2 (not blocking this verdict):

6. **MEDIUM-2 (the substance)** — re-anchor `012-message-mode.test.ts`'s pre-D16 assertion, and treat
   the two transcribing files as the finding their own header describes: import the product's
   functions and delete the local copies, rather than updating the transcriptions to match.
7. **The Assumption Not Checked** — enumerate the composer's load paths by reference-following and
   confirm each reaches `detectMode`.

## Captured Instruments (round 3)

| Path | What it settles |
|---|---|
| `agent-output/verification/013/probe-cr3-mode-predicate/` | What M7 actually changed, by execution over the whole mode-decision input class. `mode-differential.test.ts` (122 assertions over 36 rows: predicate agreement against `validateContentRequirements`'s own error as oracle, the old/new classification differential, warning monotonicity, the flag algebra through `applyModeSwitch`, and 5712's one-toggle exit), `vitest.cr3.config.ts` (tree-selectable via `PROBE_SRC`, output via `PROBE_OUT`), captures for `18407d8`, `495463a` and three mutants, and a README stating what the probe proves, that its old side is a **declared model** rather than a probe, and what it cannot see. |
| `agent-output/verification/013/probe-cr3-mode-predicate/mutation-check/` | Whether the **implementer's own** M7 spec and the two 012 specs discriminate. `vitest.cr3-mutation.config.ts` plus `vitest.redcheck.config.ts` (spec from one tree, source from another — how LOW-2's red count was measured). Runs: clean, three mutants, and the M7 spec against `495463a` (15/16 red). |

Both carry positive controls and both kill their mutants, so a green run from either is
distinguishable from an instrument that imported nothing.

**`no test` from me, explicitly**, for M7's in-suite coverage: Vitest already reaches
`src/**/__tests__/`, the plan puts M7-a/b/c's enumerations in the project's own suite, and QA owns
the acceptance cases. What I owed instead was evidence that the in-suite version can fail, and
`mutation-check/` is that evidence — including the finding that one of its four mutant-detections
lives in a file scheduled for rework by another stage.

## Next Steps

**Handing off to the implementer subagent** — `implementer-hooks-013`, directly, per D22 — to
continue with the remaining milestones. Its next step is **M8's EC-3**, QA's Phase-1 entry condition
(**F-QA4**, High): one shared, importable, pure persist gate consulted by all five `message.upsert`
writers, rather than a gate written three times across independent `.tsx` call sites. EC-3 gates M8
and M2 both, and QA assigns it to the implementer *before any M8 spec is written*.

**QA is not the next stage, and this document said otherwise in an earlier draft.** The plan runs
**QA Phase 1 before implementation** (Testing Strategy), so **Phase 2 runs after implementation
completes**, not after a milestone — five milestones remain (M2, M3, M4, M6, M8). Round 1 stated this
correctly and rounds 2 and 3 both drifted from it; `steering-hooks-013` corrected it, I verified the
phasing against the plan rather than taking it on the relay, and round 2's line above now carries the
same correction. The items below are **owned by** QA Phase 2 — that routing is unchanged and does not
imply QA runs next.

**A sequencing consequence worth stating once, since it now spans five milestones**: the suite stays
non-green until QA Phase 2 re-anchors `012-message-mode.test.ts`, so every subsequent milestone review
— mine included — must re-establish that the six failures are the *expected* six rather than reading a
green suite. MEDIUM-2's two drifted transcriptions sit unfixed for the same span, and a transcription
that has already drifted once can drift further as M2, M4 and M8 change the same functions. Recorded
for steering as a sequencing fact, not reassigned: the files are QA's by the plan's own allocation.

**Routed, not shelved** — the Assumption Not Checked above belongs to **QA Phase 2**: enumerate the
composer's load paths by reference-following and confirm each reaches `detectMode`. Its falsity
signature is path-dependent mode on open. QA's two still-open assumptions from earlier rounds ride
the same phase: `safeParse` over the stored `Messages.data` corpus (round 2) and **F-QA8**'s
`message.upsert` writer set (round 1).

**To steering, for the planner** — two items settled by neither of us, both **D22 exception 1**:

1. **R8 and Validation item 5** name only the flag class of M7's mode change. The measured class is
   twice that size and four of the six newly-written cells are not flag-related (MEDIUM-1). R-5's
   deployment-record clause inherits the gap.
2. **Plan Scope's red-domain prediction** counts symbol *names*, not behaviour members: two of its
   four M7 files transcribe the functions locally and could never go red (MEDIUM-2). QA's own
   re-derivation reproduced the error with the same instrument, so this is a plan-and-QA item, not a
   plan-only one.

**Pattern, with two citable instances** — the TDD table under-counting its red set: round 1's LOW-1
(`ba0f6e3`, `Reviewed-At: a4eb00d`) and this round's LOW-2 (`Reviewed-At: 18407d8`). Recorded for the
retrospective. INFO-3's suite-figure provenance is a second occurrence of round 2's INFO-5 and rides
with it. Neither is escalated further; both are small each time and the recurrence is the signal.

**Also for steering, discharged rather than outstanding**: risk **R2**'s mitigation — *"the file's
hash unchanged between base and tip is captured by the reviewer"* — is captured here for the first
time. `src/server/api/utils/messageValidity.ts` is blob `f477b71…` at both `c85945f` and `18407d8`.
The plan's bare citation of that filename remains the unresolvable one from round 1, still **held**
under D24 along with R4's prediction record; until that pass runs, this review is the authoritative
statement of both.

**M1 is unaffected.** Its approval at `495463a` (round 2, `e1ca0e8`) stands.

---

# Between rounds — the expected-six baseline is now an instrument (2026-08-24)

Not a review round. **No verdict here applies to `92ce026`**, which has not been submitted; the
binding verdict remains round 3 at `18407d8`.

Steering's D25 reply made this reviewer's per-round *"still the expected six"* check the standing
mitigation for the five milestones during which the suite cannot be green, in preference to an
out-of-phase QA re-anchor. Steering asked to be told if that check is thinner than it was being
treated as. Answering that honestly required testing the check rather than introspecting about it,
so the check was tested, and one worry of mine collapsed while a different one was confirmed and
closed.

**The worry that collapsed.** I had been treating the five `standardizeMessage` reds as possible
whole-file masking — if the module failed at load, everything else in the file would be invisible.
It does not. `standardizeMessage` is called inside the per-test helper `editorRoundTrip`, not at
module scope; the file loads, all six of its tests are collected, and one passes. Nothing is masked,
and a new test in that file that broke would raise the count. **The check is stronger in that
dimension than I had been treating it as**, and steering's judgement is better supported than my own
framing of it was.

**The worry that was confirmed, and what it cost.** The baseline the check compares against existed
only as sentences in this document. By my own deliverables rule, *a number reproducible only by
rebuilding the instrument is prose* — and the next four reviews were being asked to re-derive it
from my paragraphs. It is now
`agent-output/verification/013/baseline-expected-six/`: `check-expected-six.sh <sha>` re-derives the
failure **set** and diffs it against a pin, exit 2 on divergence. Four controls, including reason
drift on the same test and a simulated seventh failure; both diverge as required, and an end-to-end
run at `18407d8` independently re-derives round 3's `443/437/6`.

**What building it turned up — INFO-4, and it is the reason this was worth doing now.** Suite figures
in the implementation record are taken from the shared *working tree*, which carries other sessions'
untracked test files, and **vitest collects them**. Measured twice, identical signature:

| round | reported | clean `git archive` extraction | delta |
|---|---|---|---|
| M7 `18407d8` | 450/444/6 | **443/437/6** | +7 / +7 / +0 |
| M8-EC3 `92ce026` | 469/463/6 | **462/456/6** | +7 / +7 / +0 |

Cause, now named rather than inferred: `src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`,
7 tests, untracked, `qa-hooks-013`'s work in progress. Round 3 recorded the M7 gap as
working-tree-versus-committed without identifying the file; this is the same mechanism, so INFO-3's
provenance note now has a diagnosed cause and a second instance.

**Class:** a suite figure quoted from a tree that is not the commit. **Enumeration:** `git -C
website status --short` before any suite run — any `??` under a test glob contaminates it; this does
not match files ignored by `.gitignore` but still collected, nor a *tracked* file another session has
modified but not committed, which changes results without appearing as `??`. **Required action —
Preferred (structural):** quote suite figures from `check-expected-six.sh <sha>`, which extracts
clean and cannot see the working tree. **Minimum:** state the tree the figures came from.

Severity stays INFO: both times the foreign tests all passed, so they inflated totals without
touching the failure set, and both conclusions held. That is luck about the foreign file's colour,
not a property of the method — a foreign red would have been read as a regression in the commit.

**The residual blind spot, stated rather than closed.** The comparator keys on
`file :: test :: first reason line`, so a new defect reproducing an existing red *exactly* is
invisible to it — live here, since any future defect leaving the V2 flag set at that point yields
`012-message-mode.test.ts`'s identical `expected 32768 to be +0`. Reason *drift* is caught (control
1). The compensating instrument is `probe-cr3-mode-predicate/`, which covers that surface
behaviourally over 36 rows and keys on nothing in the suite output. That pairing is what makes the
mitigation adequate; the count check alone would not be.

**No re-anchor requested.** With the baseline mechanical and CR3 covering the collision-prone
surface, steering's call to prefer this over an out-of-phase QA spawn holds on the evidence, not
merely on the absence of a counter-argument.

---

# Round 4 — M8's EC-3 (the pure resolver and persist gate) at `92ce026`

**Reviewed-At**: `92ce026a5bb0ddf0b2d1fe451d14bd74c77c746a`, chain branch
`chain/013-components-v2-editing-surfaces`. Verified at the start of the pass and again at the end.
Round 3's verdict stays bound to `18407d8` and does **not** travel to this tree.

**Verdict: APPROVED_WITH_COMMENTS.** EC-3's substance is delivered — the disposition and the gate
exist as pure importable functions, so `requiresChoice` / `mustAsk` are assertable without the
call-site observation no harness here can make. The implementation is faithful to the plan's own
eight-cell table, the TDD is genuine under mutation, and all three gates reproduce independently.
Every finding below is about a **contract that M8 is about to consume at seven call sites**, and
each is cheapest to fix now, before the wiring exists.

## Scope, and what I checked rather than accepted

`+78 −0` in `src/utils/index.ts`, `+168 −0` in a new spec. Nothing else. Purely additive: no
existing export touched.

| claim | how re-derived | result |
|---|---|---|
| eight-cell fidelity to D17 | `probe-cr4-disposition-gate/`, 10 cells driven directly, expectations transcribed from the **plan's** table | **10/10 match** |
| TDD red, "right reason" | reverted `utils/index.ts` to `18407d8`, kept the spec at `92ce026` | **19 failed**, `15 × resolveContentLoss is not a function`, `4 × gateBeforePersist` — exactly the table's 15/4 |
| the spec is not a check that cannot fail | three mutants against the implementer's own spec | **dies on all three** (4, 1, 2 failures) |
| `tsc --noEmit` 0 | clean `git archive` extraction | **0** |
| `next build` exit 0, 0 warnings | clean extraction | **exit 0, 0 warnings** |
| suite "no new failures" | `baseline-expected-six/check-expected-six.sh` at `18407d8` vs the `92ce026` pin | **MATCH** — the set is unchanged between the two trees |
| nothing is wired | `git grep -c` on all five new symbols | definitions + spec only, **0 other consumers** |

**On the suite figure, stated non-circularly**: the baseline was pinned *at* `92ce026`, so
"MATCH at `92ce026`" would be comparing a tree to itself and proves nothing. The load-bearing run is
the one at **`18407d8`**, which matches the `92ce026` pin — that is what establishes this commit
introduced no new failure. Clean figures are **462/456/6** here and **443/437/6** there; see INFO-4.

**Good patterns, said plainly.** The row table is transcribed into the spec's header as a comment
addressed to a *tool*-free reader — but the expectations themselves are literals off that table, so
EC-5 independence genuinely holds and the mutation results prove it. `gateBeforePersist` does its
own bit-masking rather than trusting a caller, which is precisely the right instinct — and is the
reason MEDIUM-3 below is about `resolveContentLoss` and not about the gate.

## MEDIUM-1 — `dropSet` is constant across the entire input domain, and empty on the one row where content is certainly lost

**Location**: `src/utils/index.ts`, `resolveContentLoss` (all four return sites), and the
`ContentLossDisposition` interface.

**Class**: a returned field that carries no information — identical for every input — while its name
and type promise a per-row answer, and whose value is actively misleading on row E.

**Enumeration**: `probe-cr4-disposition-gate`, section CR4-B, run over all ten cells. Captured
output: `dropSet` is `[]` in **10 of 10**, row E included. The predicate is exhaustive over the
`(bit × components × content)` partition the plan defines; it does **not** cover embeds shapes beyond
the three in CR4-E, and it cannot see a future caller that sets `dropSet` itself.

**Why it matters, concretely.** Row E is the one disposition where the user is *told what will be
dropped* — that is the whole of D17's governing principle. A caller writing the obvious
`if (d.dropSet.length) showDrops(d.dropSet)` renders **nothing** on exactly that row. The real drops
live only in `options[].dropSet`, which a reader of the top-level field has no reason to consult.
Worse for the next gate: **M8-F's parity obligation is stated over "row, drop set, notice class"**,
so a field that never varies satisfies "same drop set at both surfaces" vacuously — the parity check
QA is being asked to build cannot fail on this component.

**Required action — Preferred (structural)**: make the trap unrepresentable by discriminating the
type on the choice, so no value ever carries both a meaningless `dropSet` and the real drops:
a `requiresChoice: true` disposition has `options` and **no** `dropSet` field; a
`requiresChoice: false` disposition has `dropSet` and **no** `options`. TypeScript then rejects
`d.dropSet` on a row-E value at compile time rather than returning `[]`.
**Minimum**: leave the shape and have QA's M8-F parity instrument assert over `options[].dropSet`
rather than `dropSet` — this keeps the trap but stops the parity check being vacuous.

**Magnitude**: unmeasured beyond the enumeration — the consequence is a hypothesis about M8's
callers, since no caller exists yet. What *is* measured is that the field is constant over the
domain and empty on row E.

## MEDIUM-2 — the decision is centralised; applying the decision is not

**Location**: `src/utils/index.ts` — `resolveContentLoss` / `gateBeforePersist` as the complete
delivered surface.

**Class**: an entry condition that centralises a *decision* while leaving its *application* to each call
site, so the divergence hazard the condition exists to close survives one level down.

**Enumeration**: `git grep -c` at `92ce026` for every exported symbol of this change —
`resolveContentLoss` (2 in `index.ts`, 22 in the spec), `gateBeforePersist` (1 / 7),
`ContentLossDisposition` (2), `ContentLossOption` (4), `ROW_E_OPTIONS` (2). **No function anywhere
consumes a `ContentLossDisposition` and returns a draft.** The predicate matches exported names in
`src/`; it does not match a helper that might be added inside a component, nor an application written
inline without naming the type.

**Why it matters.** The resolver reports `mode: 'classic'` for row D and
`options: [{mode:'v2', dropSet:['content','embeds']}]` for row E — but *nothing ships that turns
either into a draft*. Row D requires clearing the V2 bit; row E requires deleting the chosen keys.
So each of M8's consumers — the two JSON surfaces plus the five IS-1 writers, **seven sites** — must
implement flag-clearing and key-dropping itself. That is R9's failure mode ("one object, two
dispositions") restated for the application half, and it is exactly what EC-3 was raised to prevent:
QA's own falsity signature for skipping EC-3 is *"the decision lives in `JsonModalBody`,
`NewMessageJsonInput`, `SaveAsMenu` and `useApiMethods` separately"*. The decision no longer does.
The application still would.

**Required action — Preferred (structural)**: add the application alongside the decision — a pure
`applyDisposition(draft, disposition, chosenOption?) → draft` in the same module, so the surfaces
*render and apply* what the resolver reports and no call site writes flag or key manipulation of its
own. M7 already ships `applyModeSwitch`/`switchToClassic`, which clears the bit correctly; the
application function should delegate to it rather than restate it.
**Minimum**: M8 wires exactly one shared helper for the application even if it lives in a component
module, and the implementation doc names the single site.

**This is the finding I would most like acted on before M8 begins**, because its cost multiplies by
seven once the wiring is written.

## MEDIUM-3 — `flagBit: boolean` invites the caller to compute the wrong bit

**Location**: `src/utils/index.ts`, `resolveContentLoss` first parameter.

**Class**: a contract that accepts a *derived* value where the raw value is available, so every call
site re-derives it and any one of them can derive it wrongly — with no type error.

**Enumeration + demonstration**: `probe-cr4-disposition-gate`, CR4-C, executed:
with `flags = 4` (`SUPPRESS_EMBEDS`, D7 residue, **not** the V2 bit) over classic content,
`resolveContentLoss(!!(flags & IS_COMPONENTS_V2_FLAG), …)` returns row **A** (nothing shown) while
`resolveContentLoss(!!flags, …)` returns row **D** — a warning, and the message re-moded. Both calls
type-check. The same section shows `gateBeforePersist({flags: 4, …})` is **not** susceptible,
because it takes the number and masks internally.

**Disposition order applied**: the contract says `boolean`, and every boolean is a valid boolean — so
this is not a missing runtime guard, it is the contract leaving the question open (step 2). The fix
belongs in the signature, not behind it.

**Required action — Preferred (structural)**: take `flags: number | undefined` and mask inside,
exactly as `gateBeforePersist` already does; the misuse then cannot be written. The boolean parameter
buys nothing — no caller has a bit without having the number.
**Minimum**: keep the boolean but have all seven M8 call sites obtain it only via
`gateBeforePersist`, never by calling `resolveContentLoss` directly.

## LOW-1 — EC-3 names `chosenOutcome`; the delivered object has `options`, and the substitution is undeclared

**Location**: `ContentLossDisposition` versus QA's EC-3 probe text.

EC-3 specifies the resolver returns
`{ row, mode, dropSet, noticeClass, requiresChoice, chosenOutcome }`. The delivered interface has
`options` in place of `chosenOutcome`. **I think the substitution is right**: the resolver is pure
over `(flagBit, components, content, embeds)` and cannot know a choice that has not been made, so
`chosenOutcome` is not computable from its inputs — `options` is the computable form of the same
idea. But the implementation doc describes the shape without noting that a **named field of the
entry condition is absent**, so a reader checking EC-3 off against the delivery finds a field
missing and no disposition for it.

**Class**: a named element of an entry condition satisfied by substitution without the substitution
being declared. **Enumeration**: the six field names in EC-3's probe text against the interface —
five present, one substituted, 1 of 6. **Required action**: not a code change — **QA owns EC-3** and
should record whether `options` discharges `chosenOutcome`. Routed to `qa-hooks-013`, not to the
implementer.

## INFO-1 — two spec names promise a mutation the function does not perform

`013-m8-ec3-resolver-gate.test.ts` names tests *"row D: … Classic, warning, **bit cleared**"* and
*"row B: … V2, **bit set**, warning"*. Nothing in either test asserts a bit changing, and nothing
could: `resolveContentLoss` is pure and returns a report, never a draft. The names describe a
**caller's** obligation. A reader auditing "is the bit cleared on row D?" finds a green test named
for it that never checks it — coverage claimed by a name rather than an assertion. This is the
same defect class as MEDIUM-2 seen from the test side. **Required action**: rename to what is
asserted (*"reports Classic with the conflict notice"*), and let the real obligation be asserted
against the application function MEDIUM-2 asks for.

## INFO-4 (carried) — suite figures are quoted from the shared working tree

Filed in the between-rounds note above and repeated here because it recurs in this commit's message
(`469/463/6`; clean is `462/456/6`). Cause: `013-qa-phase1-seed-route-probe.test.ts`, 7 tests,
untracked, another session's. **Required action — Preferred (structural)**: quote suite figures from
`baseline-expected-six/check-expected-six.sh <sha>`, which extracts clean and cannot see the working
tree. **Minimum**: name the tree the figures came from. Steering has corrected the attribution
upstream — this is a shared-tree property, **not** an implementer accuracy problem, and should not be
recorded as one.

## TDD Compliance

Verified, not accepted. The table's two rows claim red at 15/4 with `TypeError`; reverting
`utils/index.ts` to `18407d8` against the `92ce026` spec reproduces **15 × `resolveContentLoss is not
a function`** and **4 × `gateBeforePersist is not a function`**, 19 failed. No exemption is claimed
and none is needed. Expectations independence (EC-5) holds and is demonstrated by mutation rather
than asserted: the spec dies on all three mutants.

## Adversarial execution — why it is scoped out this round, and when it becomes mandatory

`gateBeforePersist` is a guard on an irreversible action (a persisted overwrite), which normally
triggers the standing requirement to stand the service up and attack it. It does **not** this round,
for a reason established by enumeration rather than assumed: `git grep -c` shows **no call site
consumes either function**, so no running instance can reach them and any "attack" would only be my
own harness calling a pure function — which is what the CR4 probe already does, exhaustively.

**This exemption expires the moment M8 wires the gate.** At that point the gate is reachable, and the
review of that commit must drive the five IS-1 writers against a running instance and assert the
negative on the persistence surface itself — no `message.upsert` before a choice — not on the
response. Recorded here so the next round inherits the obligation rather than the exemption.

## Assumption Not Checked

**This review assumes that an embed reaching `resolveContentLoss` through the real import pipeline
has the same emptiness verdict as the hand-built embeds CR4-E drove, and does not test it.** CR4-E
called `hasClassicContent` through the resolver with literal embed objects (`[{}]`, `[{title:'x'}]`);
it never fed an embed that had passed through `filterSupportedComponents` and
`discordMessageImportShape.parse`, which may add or strip keys (`_key` is already special-cased in
`hasClassicContent`, which is evidence that pipeline-shaped embeds differ from hand-built ones).
**Falsity signature**: a pasted object whose embed is meaningful before parsing and empty after (or
the reverse) lands on a different row at the wired JSON surface than the resolver reports in
isolation — observable as row B where the probe says row E, i.e. a silent strip of a real body,
which is the defect 013 exists to fix. **Owner**: the implementer, at M8-A/M8-B, where the resolver
first sees post-parse data — the disposition must be taken on the object that will actually land;
QA's M8-F parity instrument is the backstop that would catch it if the wiring takes it on the
pre-parse object instead. Named again in Next Steps.

## Next Steps

1. **`implementer-hooks-013`** — MEDIUM-2 first and before any M8 wiring: an application function, so
   flag-clearing and key-dropping are written once rather than seven times. Then MEDIUM-1
   (discriminated union) and MEDIUM-3 (`flags: number`), both of which are signature changes that get
   more expensive with every call site added. INFO-1 is a rename. **Carry the Assumption Not Checked
   into M8-A/M8-B**: take the disposition on the post-parse object, and say in the implementation doc
   which object it was taken on.
2. **`qa-hooks-013`** — LOW-1: record whether `options` discharges EC-3's named `chosenOutcome`. And
   note MEDIUM-1's consequence for **M8-F**: a parity assertion over `dropSet` cannot fail, because
   that field is constant across the domain; assert over `options[].dropSet` instead.
3. **`steering-hooks-013`** — nothing new is routed. INFO-4's attribution correction is already in
   hand.

**QA is not the next stage** — Phase 2 follows implementation's completion, and M2, M3, M4, M6 and
M8 itself remain. EC-3 is a precondition; M8 has not started.

**M1 and M7 are unaffected.** Their approvals at `495463a` and `18407d8` stand on their own trees.

---

# Round 5 — EC-3 fix round at `0c8fad5`

**Reviewed-At**: `0c8fad5173613d2163bd9d1ecb62123ab2e928cb` (`2f49182` + `0c8fad5`, both after
`92ce026`). Verified at the start of the pass and again at the end. Round 4's verdict stays bound to
`92ce026`.

**Verdict: APPROVED_WITH_COMMENTS.** All three round-4 MEDIUMs are closed **structurally** — the
Preferred fix in each case, not the Minimum — and each closure is verified by execution, not by
reading the diff. Two new MEDIUM findings arise from the re-attack, both in the newly added
`applyDisposition`, and one of them is round-4 MEDIUM-3's own class reappearing at the new function.
Neither blocks EC-3; both should land **before M8 wires anything**, which is the very next unit of
work.

## Dispositions of the round-4 findings — class gone, and the check that fails if it returns

Per the standing rule, each disposition records two things: that the class is eliminated, and the
captured check that fails if it comes back.

| finding | class gone? | check that fails if it returns |
|---|---|---|
| MEDIUM-1 dead `dropSet` | **Yes, structurally** — discriminated union; `'dropSet' in d` is `false` in **8/8** cells, the field is removed rather than emptied | `probe-cr5-application-half/application-half.cr5.test.ts`, CR5-A. Also in the project's own suite (the implementer's row-E assertion) |
| MEDIUM-2 no applier | **Yes** — `applyDisposition` added, delegating to `applyModeSwitch` rather than restating flag rules | CR5-B/C/D; and `013-m8-ec3-resolver-gate.test.ts`'s six `applyDisposition` assertions |
| MEDIUM-3 `flagBit: boolean` | **Yes, structurally** — signature is now `flags: number \| undefined`, masked internally | CR5-A: `flags = 4` → row **A**, `4 \| BIT` → row **D** |
| INFO-1 misleading test names | Yes | `no test` — a naming change; nothing asserts a name |

**I re-ran the sweep rather than checking the flagged sites.** `git grep -c` on all six exported
symbols at `0c8fad5`: definitions and the spec only, no `.tsx` consumer. The predicate matches
exported names in `src/`; it does not match an inline reimplementation that never names the symbols.

## Verified rather than accepted

| claim | how | result |
|---|---|---|
| eight cells survive the signature change | CR5-A, expectations from the plan's table | **8/8** |
| TDD red for the fix round | reverted `index.ts` to `92ce026` against the `0c8fad5` spec | **8 red**: 5 × `TypeError: applyDisposition is not a function`, 1 × the throw-match, 1 × the `dropSet` absence assertion, 1 × the MEDIUM-3 regression |
| the vacuity self-catch is real | reintroduced the bare `.toThrow()` | **green against a tree with no `applyDisposition`** — the vacuity was real, the tightening closes it |
| `tsc --noEmit` | clean extraction | **0** |
| `next build` | clean extraction | **exit 0, 0 warnings** |
| failure set unchanged | `check-expected-six.sh 0c8fad5` | **MATCH**, clean totals **472/466/6** |

**On the red count, a correction in the implementer's favour.** Their message to me said *"8/8 red
for `applyDisposition`"*; the **implementation document says 6/6**, which is what I reproduce (5
`TypeError` + 1 throw-match). The other two of the eight are the MEDIUM-1 and MEDIUM-3 regression
assertions going red — which is *better* than claimed, because it shows those two are genuinely
discriminating tests and not decoration. The authoritative record is right; only the summary rounded.

**Two things done well enough to name.** First, the implementer caught a **check that cannot fail in
their own work** — a bare `.toThrow()` satisfied by the pre-existence `TypeError` — and tightened it
before I saw it. I verified the vacuity by reintroducing it, and it is exactly as they described.
Second, they removed a rationale docblock and a header paragraph written *to a future reviewer*
before committing. Both are the discipline this process asks for, applied unprompted.

## MEDIUM-1 (round 5) — `draft` and `disposition` are untied, and a mismatched pair destroys a body silently

**Location**: `src/utils/index.ts`, `applyDisposition(draft, disposition, chosenOption?)`.

**Class**: a contract that accepts a **derived** value alongside the source it was derived from,
without tying them — so a caller can pass a disposition computed from a *different* draft and the
function will apply it. **This is round-4 MEDIUM-3's class**, closed at `resolveContentLoss` and
reopened at `applyDisposition` in the same round.

**Enumeration**: the three exported functions taking a disposition or a derived flag —
`resolveContentLoss` (**closed**, now takes raw `flags`), `gateBeforePersist` (**never had it**,
takes the draft and derives internally), `applyDisposition` (**open**). 1 of 3. The predicate is the
exported signatures in `src/utils/index.ts`; it does not match a future function that takes a
disposition without naming the type.

**Demonstrated, not theorised** — CR5-D, executed:
a row-B disposition (*"nothing to lose — save as V2"*, `requiresChoice: false`) computed from an
empty-bodied V2 draft, applied to a draft carrying `content: 'a body the user typed'` and an embed,
yields **`content: ''`, `embeds: []`** — the body destroyed, **no choice presented** — while
`gateBeforePersist` on that same draft returns **`mustAsk: true`**. The gate and the applier
disagree about the same object, and the applier wins because nothing consults the gate.

That is precisely D18's subject: *"the save path stops silently destroying the user's classic
body — it blocks and asks."* The new API can be driven into the behaviour the ruling forbids.

**Required action — Preferred (structural)**: make the mismatch unrepresentable by removing the
parameter — `applyDisposition(draft, chosenOption?)`, computing the disposition from the draft
internally exactly as `gateBeforePersist` does. Callers that need the disposition for rendering
still call `resolveContentLoss`/`gateBeforePersist`; nobody hands one back in.
**Minimum**: keep the signature and have every M8 call site obtain draft and disposition in one
expression, never storing a disposition across a state change — with the invariant stated in the
implementation doc rather than in a comment.

**Magnitude**: unmeasured as a production consequence — nothing is wired, so this is a hypothesis
about M8's callers. What is measured is that the mismatched pair is accepted and destroys the body.

## MEDIUM-2 (round 5) — the advertised drop and the enacted drop are separate sources of truth, and already disagree

**Location**: `ROW_E_OPTIONS` in `src/utils/index.ts` versus `switchToClassic`/`switchToV2` in
`src/utils/messageMode.ts`.

**Class**: a user-facing promise and its enactment maintained in two places with nothing asserting
they agree.

**Enumeration**: the two members of `ROW_E_OPTIONS`, each compared against what `applyModeSwitch`
actually does. **2 of 2 checked, 1 disagrees.** The predicate compares the advertised `dropSet`
strings to the observed field changes; it cannot see a disagreement in a drop that no `dropSet`
string names.

**Executed** — CR5-B: the classic option advertises `dropSet: ['components']`, but
`switchToClassic` **keeps Action Rows** (`type === 1`), so `[container, actionRow]` becomes
`[actionRow]`. The notice M8-E renders from that string will tell the user their components will be
dropped while their button rows survive. The v2 option agrees exactly (`content`, `embeds`).

Also established: **`applyDisposition` never reads `dropSet`**. A deliberately bogus
`dropSet: ['nothing','at','all']` changes nothing about what is dropped — the drops are enacted
entirely by `mode`. So `dropSet` is a *label*, and nothing keeps the label honest.

Direction matters here and it is the safe one: the label **overstates** the loss (more is promised
dropped than actually is), so no user is under-warned. That is why this is MEDIUM and not HIGH.

**Required action — Preferred (structural)**: derive the label from the enactment instead of
maintaining it beside it — compute each option's `dropSet` by diffing the draft against
`applyModeSwitch(option.mode, draft)`, so the advertised drop is by construction what happens.
**Minimum**: correct the string to what is actually dropped (V2 components, not all components) and
have QA's M8-E instrument assert the notice against the applied result rather than against the
constant.

## INFO-1 (round 5) — a new import cycle, tested and benign, recorded as fragility

`src/utils/index.ts` now imports `applyModeSwitch` from `~/utils/messageMode`, while
`messageMode.ts` imports `hasV2Components` from `~/utils` — a cycle through the barrel.

I did not assert this was safe. Probed in **both** import orders including the TDZ-risky leaf-first
one (`cycle-index-first.cr5.test.ts`, `cycle-mode-first.cr5.test.ts`): both modules initialise and
every cross-referenced function works, and `next build` bundles it. **It holds only because neither
module calls the other at module-evaluation time** — `ROW_E_OPTIONS` and `V2_COMPONENT_TYPES` are
module-scope `const`s that would be in TDZ if it did. No action required now; the structural exit, if
one is ever wanted, is to move `hasV2Components` and its type set out of the barrel into a leaf both
sides import.

## INFO-2 (round 5) — the spec's header duplicates the plan's row table, and I let this pass in round 4

`013-m8-ec3-resolver-gate.test.ts` carries the D17 row table in a header comment. Under the tool
test that is prose in a source file, and it is a **second source of truth** that can drift from the
plan silently — the same class as MEDIUM-2 above, one level up. **I did not raise this in round 4
and should have**; recording my own inconsistency rather than quietly starting to enforce it. The
fix is not to delete the table but to make it executable, as the CR5 and CR4 probes do — transcribe
it into a `const` the assertions iterate, so drift from the plan shows up as a failing test rather
than as a stale comment.

## INFO-3 (round 5) — the +7 recurs, and is now disclosed

Clean totals at `0c8fad5` are **472/466/6**; the reported figure is **479/473/6**. Third instance,
same `+7/+7/+0`, same cause. **The implementer has acted on this**: the implementation document now
says *"(working tree, includes the untracked QA probe)"* — the Minimum action from INFO-4, taken
unprompted. No further action asked of them; the structural form remains
`check-expected-six.sh <sha>`.

## TDD Compliance

Verified by re-derivation, not accepted. Ten new tests, 29/29 green at the tip, and the red state
reproduces exactly against `92ce026`'s source. No exemption claimed. The `applyDisposition` throw
assertion is genuinely discriminating, proven by reintroducing the loose form and watching it pass.

## Adversarial execution

Still scoped out, and for the same enumerated reason: `git grep -c` shows no call site reaches any of
the three functions, so nothing can be driven against a running instance that the probe does not
already drive directly. **The exemption expires when M8 wires the gate** — which is now the next unit
of work, so the next review round on wiring must stand the service up and assert the negative on the
persistence surface itself.

## Assumption Not Checked

**This review assumes `applyModeSwitch` behaves at the persist boundary the same way it behaves when
called directly on a plain object, and does not test it.** Every CR5 assertion calls
`applyDisposition` on hand-built literals; none drives it through a real draft object as the
composer holds it — which may carry `_key` fields, React state identity, or keys the spread
preserves and the persist path then serialises. **Falsity signature**: an applied disposition that
looks correct in isolation persists a record still carrying the dropped key — a V2 record with a
surviving `content`, i.e. the 5712 shape D19 exists to abolish, recreated by the very function meant
to prevent it. **Owner**: the implementer, at M8-G, where `applyDisposition` first meets a real
writer, with QA's IS-1 no-upsert-before-choice instrument as the backstop. Named again in Next Steps.

## Next Steps

1. **`implementer-hooks-013`** — before wiring anything: **MEDIUM-1 (round 5)** first, since the
   wiring about to be written is exactly what would carry a stale disposition across a state change;
   then **MEDIUM-2 (round 5)**. Both are cheaper now than after the JSON modal's Load exists. The
   plan-order correction (`d598b54`, M2 before M8) does not change this — the shared M2+M8 wiring in
   `JsonModalBody.tsx` is the first consumer either way. **Carry the Assumption Not Checked into
   M8-G** and name, in the implementation doc, the actual object `applyDisposition` is handed.
2. **`qa-hooks-013`** — LOW-1 from round 4 still stands. Add: **M8-E's notice instrument must assert
   against the applied result, not against `ROW_E_OPTIONS`' constant strings** — MEDIUM-2 (round 5)
   shows the constant is already wrong for the classic option.
3. **`steering-hooks-013`** — nothing routed. Noting only that round-4 MEDIUM-3's class reappeared at
   a new function inside the same fix round; that is a data point about class-scoped findings
   needing an enumeration that includes *functions not yet written*, not a process failure by the
   implementer, who fixed exactly what was enumerated.

**QA is not the next stage.** M2, M3, M4, M6 and M8 remain; the next unit is the shared M2+M8 wiring
in `JsonModalBody.tsx`'s Load.

**M1, M7 and EC-3-at-`92ce026` are unaffected.** Their verdicts stand on their own trees.

## Method note (round 5, added after steering's D25-round query) — I tested the "same shape" hypothesis and it does not hold

Steering proposed that round 3's red-domain error and round 5's enumeration limitation are the same
shape — *"the instrument's basis and the class's definition were not the same thing, and the gap was
invisible from inside the instrument"* — and asked me to test it rather than accept it. Tested
against this document; **it does not hold**, and the test found something more specific.

**Round 3's red-domain error**: a class defined by *behaviour* (files that go red when `messageMode`
changes) enumerated by a *symbol-name* predicate. Wrong **kind** of predicate. Note who made it:
that was the plan's and QA's instrument, and I caught it **because** I ran two independent predicates
of my own and wrote down what neither could see — *"neither can see a transcription written as
`const switchToV2 = …` … so the true class may be larger and these two predicates cannot tell me by
how much."* The gap was **visible from inside**, and stating it is what made the finding checkable.

**Round 4 MEDIUM-3's limitation** (the one that reopened at `applyDisposition`): the enumeration was
**complete and correct over the tree it ran against**. There was no third function at `92ce026`. So
it is not a wrong-kind-of-predicate error at all.

**What it actually was, and it is measurable.** MEDIUM-3's section is headed
**"Enumeration + demonstration"** and delivers only the demonstration — `flags = 4` yielding row D.
A demonstration establishes that the defect exists *at a site*; an enumeration establishes the
class's *extent*. Merging the headings let the vivid half stand in for the other. With no predicate
stated, there was nothing to write a blind-spot clause against — and had I written one, the natural
sentence was *"this covers functions existing at `92ce026`; it cannot see a function the fix will
add"*, which is exactly the gap that materialised.

**Measured across this document**: 16 findings carry an explicit "what this predicate does not
match" clause. **MEDIUM-3 is the sole finding that carries none.** One skip in seventeen, with a
recognisable signature.

**Consequence for the retrospective, stated so it is not merged into a vaguer item.** These two need
different remedies and combining them would deliver neither:

- Round 3's remedy is **instrument choice** — a behaviour-defined class needs reference-following,
  not name-matching. That item is stronger standing alone, and QA reproducing it independently is
  what makes it about the instrument rather than about a person.
- Round 5's remedy is **not a new rule**. The blind-spot clause is already mandatory in this role's
  definition (*"the blind spot is a property of the predicate and is knowable at authoring time"*).
  This is a **compliance** miss, not a design gap, and the check is mechanical: no finding ships
  whose Enumeration lacks a "does not match" clause, and "Enumeration + demonstration" is a heading
  to distrust, because it invites exactly this substitution.

I am adopting that check for the remaining rounds of this plan. Steering offered to drop the
hypothesis if it failed; it failed, but the test was worth running and this note is its output.

---

# Standing obligations for the next code-reviewer on plan 013

Written at a generation seam, on the owner's ruling *"Respawn at the next seam, same with
code-reviewer"* (relayed by `steering-hooks-013`, 2026-08-24). **Everything a successor needs is
below or cited from here; nothing in this section depends on remembering a conversation.** Both this
thread and the steering thread respawned at this point, so a successor cannot ask either of us.

## 1. Adversarial execution — the exemption, and a trigger a successor can test

Rounds 4 and 5 scoped out the mandatory "stand the service up and attack it" step for
`gateBeforePersist`, which guards an irreversible action (a persisted overwrite). **The exemption
rests on one fact only: nothing can reach the gate.** It is not a judgement about the code.

**Test the trigger mechanically — do not interpret "M8 wires the gate":**

```
git -C /usr/local/bin/hooks/website grep -c \
  "gateBeforePersist\|applyDisposition\|resolveContentLoss" <sha> -- src \
  | grep -v "src/utils/index.ts" | grep -v "__tests__"
```

**Empty output → the exemption still holds.** **Any hit → the exemption has expired**, and that
round MUST drive the five IS-1 writers against a running instance and assert the negative *on the
persistence surface itself* — no `message.upsert` before a choice — not on a response status. The
five writers are enumerated in QA's IS-1 row: `useApiMethods.saveMessage`, `SaveAsMenu.onSubmit`,
`NewMessageModal.onSubmit`, `m/new/page.tsx`, `f/[id]/page.tsx`.

**The command above was run, and controlled.** At `0c8fad5` it returns **empty**, which is
correct — nothing is wired. Control against a symbol that *does* have consumers
(`hasV2Components`) returns `src/utils/messageMode.ts:2` through the identical pipeline, so the
empty result is a real absence and not a broken predicate. **Blind spot**: it matches these three
names only — it cannot see a consumer that reaches the gate through a re-export under another name,
nor an inline reimplementation that never calls them.

The next unit of work is the shared M2+M8 wiring in `JsonModalBody.tsx`'s Load (plan order corrected
at `d598b54`: **M2 before M8**), so the expiry is expected at that commit.

## 2. My enumeration limitation, recorded as mine

Round 4's MEDIUM-3 named a class — *"a contract that accepts a derived value where the raw value is
available"* — and the fix closed it at `resolveContentLoss`. **The same class reopened in the same
fix round** at the newly added `applyDisposition` (round 5, MEDIUM-1). My enumeration covered
functions that existed at `92ce026`; it could not reach a function the fix would add.

The diagnosis is in the **Method note (round 5)** above: that finding is the **only one of 17** in
this document whose Enumeration carries no "what this predicate does not match" clause, and its
heading — *"Enumeration + demonstration"* — is what let the demonstration stand in for the
enumeration.

**Adopted check, carry it forward**: no finding ships whose Enumeration lacks an explicit
"does not match" clause, and treat *"Enumeration + demonstration"* as a heading to distrust. When a
finding's Required Action will cause **new code to be written in the same module**, state the class
as an invariant the new code inherits — the enumeration cannot cover code that does not exist yet.

## 3. A hypothesis that was tested and withdrawn — do not resurrect it

`steering-hooks-013` proposed that round 3's red-domain error and round 5's enumeration limitation
were the same shape (*"the instrument's basis and the class's definition were not the same thing"*).
**Tested against this document; it failed** — see the Method note. **Steering then withdrew it
explicitly** rather than softening it, and asked that the withdrawal be recorded so neither
successor revives it:

> round 3's was a wrong *kind* of predicate over a behaviour-defined class, and the gap **was**
> visible from inside the instrument … Round 4's MEDIUM-3 enumeration was complete and correct over
> the tree it ran against. "Instrument basis ≠ class definition" does not describe the second one.

The two remain **separate** retrospective items with different remedies: round 3 needs an
instrument-choice fix (reference-following, not name-matching, for a behaviour-defined class) and is
stronger standing alone — QA reproduced it independently, which makes it about the instrument rather
than a person. Round 5 needs **no new rule**; it is a compliance miss against one this role already
states.

## 4. The plan's Status field — do not set it

**This role's definition instructs the reviewer to set the plan's Status to "Code Review Approved"
on a passing review. Do not do that on plan 013.** Steering ruled twice — rounds 2 and 3 — that the
field stays as it is, *for the reviewer's own reasoning*: this plan is being reviewed
**milestone by milestone**, and a plan-level "approved" status asserted from a milestone-level
verdict would be false at the plan level. Five milestones (M2, M3, M4, M6, M8) remain undelivered.

**If the field's absence is raised at you, do not move it — refer it to steering.** Steering lodged
the underlying definition gap in `~/.claude/agents/INBOX.md` (`ee1ae0e`) for retrospective → pi.
This paragraph exists because that ruling lived only in cross-session messages until now.

## 5. Instruments — which are current, and which are paired

Index: **`agent-output/verification/013/README-code-review-instruments.md`** (mine;
`verification/013/README.md` is QA's document and is not mine to edit).

The one thing not to get wrong: **`baseline-expected-six/` and `probe-cr3-mode-predicate/` are a
pair and both are run every round.** The failure-set comparator cannot see a new defect that
reproduces an existing red exactly — live here, since anything leaving the V2 flag set yields
`012-message-mode.test.ts`'s identical `expected 32768 to be +0`. CR3 covers that surface
behaviourally and keys on nothing in the suite output. **Steering is carrying a judgement conditional
on both being run** (that an out-of-phase QA re-anchor was not worth putting to the owner). If the
mode-predicate probe stops being run, that judgement lapses — say so rather than letting it hold.

Also note **`probe-cr4-disposition-gate/` is superseded in part**: the signature changed at
`2f49182`, so its boolean call shape now under-reads (`true & 32768 === 0`). Use CR5.

## 6. Standing procedural facts a successor would otherwise re-derive

- **The suite is not green and will not be** until QA re-anchors `012-message-mode.test.ts` at
  Phase 2. Six failures are expected; establish it is *the same six* with the pinned baseline, never
  by reading a total.
- **Never take suite figures from the working tree.** It is shared and carries other sessions'
  untracked test files, which vitest collects. Measured three times at exactly `+7/+7/+0`
  (`013-qa-phase1-seed-route-probe.test.ts`, `qa-hooks-013`'s). This is a shared-tree property, **not
  an implementer accuracy problem** — steering corrected that attribution to the owner.
- **RTK filtering makes exact-match and positional predicates unsound.** Use `git grep -c`,
  `grep -c`, `git diff --numstat`, `git rev-parse`, or write to a file and read it. A `git log`
  reading of the tip disagreed with `git rev-parse` in this very chain, and `rev-parse` was right.
- **Verdicts do not travel between trees.** Re-verify the SHA at the start *and* end of every pass;
  the tree moved under this reviewer mid-session once already.

---

# Round 6 — the round-5 fix round, at `816d7fd`

**Reviewed-At**: `816d7fd5804fee5d51e526d7d01622624bde108b` (chain branch
`chain/013-components-v2-editing-surfaces`). Verified at the start of the pass and again at the end.

**The tree moved twice during this pass, and the verdict is bound to one commit only.** The round
opened on `52e0e8a` at the implementer's request. Mid-pass the implementer committed `816d7fd`
(a self-caught source-comment correction) and I re-anchored — I did not carry the `52e0e8a` work
across on the strength of a "comment-only" claim; I established emitted-code identity by execution
first (below). Then, while this document was being written, the implementer committed `a3e758b`
(the M2+M8 Load wiring). **`a3e758b` is a different unit of work and this verdict does not reach
it.** What `a3e758b` changes about one of my findings is stated in the finding itself, so the fix
is not misdirected; everything else about it is round 7's, under a materially different obligation —
see "Adversarial execution" below.

**Verdict: APPROVED_WITH_COMMENTS.** Both round-5 MEDIUMs are closed **structurally**, the Preferred
fix in each case, and both closures are established by execution over an exhaustive corpus rather
than by reading the diff. Two new MEDIUMs, both about *enforcement* rather than about behaviour:
the EC-3 contract is checked by no instrument in the repository, and the class round-5 MEDIUM-1
closed is residual at the sibling parameter — where it now fails in the **unsafe** direction, which
its predecessor did not.

## Scope actually assessed

`git diff --numstat 0c8fad5 816d7fd` → two files: `src/utils/index.ts` (+63/−24) and
`src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts` (+56/−64). Both read at `816d7fd` via
`git show`, not from the working tree. The working tree carries one foreign untracked file
(`src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`, `qa-hooks-013`'s); it is excluded
from scope and is not mine to touch.

**Sources of truth read.** `agent-output/planning/013-components-v2-editing-surfaces.md` (body);
`agent-output/implementation/013-components-v2-editing-surfaces-implementation.md`; this document's
rounds 4 and 5 and its "Standing obligations" section. **`agent-output/architecture/system-architecture.md`
was checked for and does not exist** — established by `ls agent-output/architecture/` run from
`/usr/local/bin/hooks`, the workspace root, not from inside `website/`. I did not carry a
predecessor's absence claim; I re-ran it. **Consequently this verdict is scoped to what I could
assess**: implementation quality, contract design, and conformance to the plan's D17/D18 rulings.
It makes no claim of architectural grounding, because there is no architecture document to ground it
against.

## Verification re-run — nothing inherited

Every figure below is one I produced at `816d7fd`. None is taken from the implementer's message or
from the implementation document.

| claim | instrument | result |
|---|---|---|
| the project's own spec passes | `npx vitest run src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts` | **32/32** |
| typecheck clean | `npx tsc --noEmit` | **exit 0, 0 errors** |
| failure **set** unchanged | `baseline-expected-six/check-expected-six.sh 816d7fd` | **MATCH** — the expected six by identity and reason; clean totals **475/469/6** |
| the paired behavioural probe (see "the pairing") | `probe-cr3-mode-predicate/` | **122/122** |
| compilation | `next build` in a `cp -al` extraction | **✓ Compiled successfully in 8.9s** (prerender not reached — rig, see Method notes) |
| lint on the changed file | `npx eslint src/utils/index.ts --max-warnings=0` | **1 error, `import/no-cycle`** — round 5's INFO-1, introduced at `2f49182`, not by this round (`git show 2f49182 -- src/utils/index.ts` shows the `~/utils/messageMode` import added there) |

**On the suite figure, the implementer is right and had already corrected themselves.** Their
round-5 message said `482/476/6`; they then self-corrected to `475/469/6`. I reproduce **475/469/6**
at both `52e0e8a` and `816d7fd` from a clean `git archive` extraction. The `+7/+7/+0` delta is the
foreign untracked QA probe that vitest collects in the shared tree — a shared-tree property, **not
an implementer accuracy problem**, and the fourth occurrence of it in this chain. Nothing is asked
of the implementer here; its disposition is QA's, lodged DECISION NEEDED at `2e33fd3`.

**The pairing was run.** `check-expected-six.sh` and `probe-cr3-mode-predicate/` are a pair because
the comparator keys on `file :: test :: first reason line` and therefore cannot see a new defect that
reproduces an existing red exactly — a case that is live in this chain, since anything leaving the V2
flag set yields `012-message-mode.test.ts`'s identical `expected 32768 to be +0`. Both ran; the
judgement `steering-hooks-013` is carrying conditional on that pairing **has not lapsed**.

## Was `816d7fd` decision-neutral? Established by execution, not by the diff's file list

The implementer described `816d7fd` as comment-only. That is a decision-neutrality claim, and
neither their word nor a diff read settles it. I transpiled both files at both commits with the
repository's own `esbuild` and compared the emitted JavaScript byte-for-byte:

```
emit(52e0e8a:src/utils/index.ts)  ==  emit(816d7fd:src/utils/index.ts)             IDENTICAL (13138 B)
emit(52e0e8a:…013-m8-ec3-resolver-gate.test.ts) == emit(816d7fd:…)                 IDENTICAL (11326 B)
POSITIVE CONTROL: emit(816d7fd index.ts) vs emit(index.ts with `dropped` → `dropped.slice()`)
                                                                                   DIFFER at byte 2188
```

The positive control matters and is not decoration — **my first run of this comparison was vacuous
and reported IDENTICAL for all four files because esbuild had rejected the arguments and written
zero bytes**; four empty files compare equal. The control is what caught it. Recorded in full under
Method notes, because it is exactly the failure this role exists to catch and I nearly shipped it.

Emitted-code identity is a stronger basis than a diff read, so the attack results below — produced
against `52e0e8a` — carry to `816d7fd`, and I re-ran every one of them at `816d7fd` anyway.

## Enumerations re-run — the sweep, and the predicate broken

**I re-ran every sweep myself rather than accepting the implementer's counts.** All at `816d7fd`,
with `git grep -c` (which computes before the output filter; see Method notes).

| predicate | implementer reported | I reproduce | what the predicate does **not** match |
|---|---|---|---|
| `applyDisposition(` outside `__tests__` | 0 | **0** | a call reaching it through a re-export under another name; an inline reimplementation naming nothing |
| `dropSet` in `src/` outside `__tests__` | 3, all in `index.ts` | **3** — the interface field, the doc-comment mention *(now removed at `816d7fd`, so 2)*, the one construction site | a hand-built option literal that never uses the key name |
| `ROW_E_OPTIONS` | 0 | **0** | — (symbol deleted; a re-added constant under a different name is invisible) |
| rationale comments in the two changed files | 6 removed | **0 remain** in the changed regions | **see below — this is the predicate I broke** |

**Breaking the comment predicate is what found something.** The shape predicate
(`^\s*//`, `^\s*/\*`, `^\s*\*`) confirms the sweep: zero comment-shaped rationale survives. I then
ran two predicates it cannot see past — trailing same-line comments (**0**) and JSX comments
(**0**) — and one keyed on *keyword rather than shape*:
`git grep -in "round-5\|round 5\|MEDIUM-\|round-4" 816d7fd -- <the two files>` → **0 in `index.ts`,
6 in the spec**, every one of them inside a `describe`/`it` **string**, where a comment-shaped
predicate cannot reach. That is LOW-2 below. The implementer's sweep was correct against the class
as they scoped it; the class is slightly wider than its comment-shaped form.

## Re-attack — the fix to a guard is attacked, not read

`applyDisposition` is a guard and `diffDroppedKeys` is a newly authored instrument, so both trigger
re-attack from first principles. I did not read the fix and agree with it.

**The instrument, named before it was built.** The process whose output is my evidence is the
repository's own `applyModeSwitch`/`switchToClassic`/`switchToV2` — the code under review, executed —
not a model of it. `diffDroppedKeys`' oracle in my probe is written independently of `index.ts`'s
own `diffDroppedKeys`, so CR6-B is a check and not a restatement of the implementation.

**The corpus is exhaustive, not sampled.** The full cross product of
5 flag values × 8 component shapes × 4 content values × 7 embed shapes = **1120 drafts**, including
`[]`, `[{}]`, `[{_key:'a'}]`, whitespace-only content, non-V2 residue flags, Action-Row-only
component lists, and mixed `[container, actionRow]` orderings. 325 land in row E, 795 settled.

`probe-cr6-derivation-round/derivation.cr6.test.ts`, **10/10 at both `52e0e8a` and `816d7fd`**:

| check | result |
|---|---|
| **CR6-A** — D18's core invariant: `gateBeforePersist(d).mustAsk === true` ⟺ `applyDisposition(d)` throws | **1120/1120**. The gate and the applier can no longer disagree about any object in the domain |
| **CR6-A** — no settled draft loses classic content it was carrying | **795/795** |
| **CR6-A** — arity: `applyDisposition.length === 2` (the old signature was 3) | closed |
| **CR6-B** — every row-E option's advertised `dropSet` equals the keys the real serialiser changes, computed by an independent oracle | **325/325 drafts, both options each** |
| **CR6-B mutant control** — the pre-`52e0e8a` hardcoded `['content','embeds']` literal fails that same check | **fails**, as it must; the check discriminates |
| **CR6-D** — purity: the resolver, the gate and the applier mutate none of their inputs (deep-frozen across the corpus) | **1120/1120 unmutated** |
| **CR6-C** — the residual (MEDIUM-2 below) | demonstrated |
| **CR6-E** — key-level granularity bound (INFO-2 below) | demonstrated |

Purity was worth attacking specifically and is worth calling out as clean: `resolveContentLoss` is
declared a **pure** resolver in D17/D18, and this round made it call the serialiser. Had
`switchToClassic` mutated rather than copied, `resolveContentLoss` — and therefore
`gateBeforePersist`, the guard — would have begun mutating its caller's draft as a side effect of
being asked a question. Both switches build new objects (`{...prev}`, `.filter`), so it holds; I
checked it rather than assumed it, over the whole corpus with frozen inputs.

## Dispositions of the round-5 findings

Each records two things: that the class is gone, and the captured check that fails if it returns.

| finding | class gone? | check that fails if it returns |
|---|---|---|
| **MEDIUM-1 (r5)** `draft`/`disposition` untied | **Yes, structurally** — the parameter is removed, not documented around; the disposition is derived internally exactly as `gateBeforePersist` does. Verified by execution over 1120 drafts (CR6-A) | **`no test` — and this is a finding.** See MEDIUM-1 (round 6): re-adding the parameter leaves the suite **32/32 green** and `tsc --noEmit` at **0 errors**. Nothing in the repository fails |
| **MEDIUM-2 (r5)** advertised vs enacted drop | **Yes, structurally** — the label is computed by running the real `applyModeSwitch` and diffing, per the Preferred action verbatim. Verified over all 325 row-E drafts against an independent oracle (CR6-B) | `probe-cr6-derivation-round/derivation.cr6.test.ts` CR6-B, plus the project's own three new spec rows. Mutant control included |
| **INFO-1 (r5)** import cycle | unchanged; still benign, still fragile for the same reason | carried, no action |
| **INFO-2 (r5)** spec header duplicates the plan's row table | **No — still present**, `013-m8-ec3-resolver-gate.test.ts` header docblock. The comment sweep did not reach it (it predates this round) | carried; see INFO-1 (round 6) |
| **INFO-3 (r5)** working-tree suite figure | **Yes** — corrected to `475/469/6`, which I reproduce exactly | `check-expected-six.sh <sha>` |

Both MEDIUMs took the **Preferred (structural)** fix rather than the Minimum. In MEDIUM-1's case
that meant deleting a parameter rather than writing down an invariant about it, which is the
difference between a class that is unrepresentable and a class that is merely discouraged.

## Findings

### MEDIUM-1 (round 6) — the EC-3 contract is enforced by no instrument in this repository, so "unrepresentable" is a claim about callers that do not exist yet

- **Location**: `website/tsconfig.json`, the `exclude` array, against `applyDisposition` /
  `resolveContentLoss` / `gateBeforePersist` in `src/utils/index.ts`.
- **Class**: a type-level contract whose only consumers live under `__tests__` is checked by
  nothing — `tsconfig.json` carries `"exclude": ["node_modules", "**/__tests__"]`, so `tsc` never
  sees those call sites, and vitest transpiles without typechecking. A structural claim about such
  a contract is true of production callers that do not exist and false of every caller that does.
- **Enumeration**: the seven EC-3 exports —
  `resolveContentLoss`, `gateBeforePersist`, `applyDisposition`, `ContentLossOption`,
  `ContentLossDisposition`, `ContentLossRow`, `ContentLossNoticeClass` — via
  `git grep -c <sym> 816d7fd -- src ':!src/utils/__tests__' ':!src/utils/index.ts'`:
  **0 non-test consumers, 7 of 7.** *What the predicate does not match*: a consumer reaching a
  symbol through a re-export under a different name; and a consumer outside `src/` — note that
  `bot/`, `scripts/` and `lang/` **are** in tsconfig's `include`, so a consumer there would be
  typechecked and the predicate would miss that mitigation.
- **Demonstrated, not theorised.** Mutant: re-add `callerDisposition: ContentLossDisposition` as a
  **required** second parameter to `applyDisposition` — precisely the class round-5 MEDIUM-1 closed.
  Result: `npx tsc --noEmit` **exit 0, 0 errors**; `013-m8-ec3-resolver-gate.test.ts` **32/32 green**.
  The regression is invisible to every gate the project runs.
- **Why it matters here specifically**: this is a **dead control being counted**. Round 5's
  disposition table records MEDIUM-1 as closed structurally; a reader takes that to mean something
  would fail if it came back. Nothing would. A dead control is worse than an absent one.
- **Magnitude**: measured on the instruments (0 type errors, 32/32 green under the mutant).
  Production consequence at `816d7fd` is **unmeasured**, because nothing is wired.
- **What `a3e758b` changes, so the fix is not misdirected.** The M8 wiring adds consumers in
  `src/app/message/m/[id]/_components/JsonModalBody.tsx`, which **is** typechecked. Re-running the
  same enumeration at `a3e758b`: `resolveContentLoss`, `applyDisposition` and `ContentLossOption`
  now have typechecked consumers; **`gateBeforePersist`, `ContentLossDisposition`, `ContentLossRow`
  and `ContentLossNoticeClass` still have zero — 4 of 7 remain open.** The class narrows at
  `a3e758b`; it does not close. `gateBeforePersist` in particular — the D18 persist gate itself —
  is still reachable from no production code.
- **Required Action**:
  - **Preferred (structural)**: typecheck the specs — a `tsconfig.test.json` extending the base
    config with `"include": ["src/**/__tests__/**/*.ts"]`, run beside `tsc --noEmit` in the same
    gate. **This is scope growth beyond plan 013 and is not the implementer's to take on their own
    initiative** — routed to `steering-hooks-013-2` per D22, not asked of the implementer here.
  - **A tidy fix here reintroduces the defect the exclusion exists to prevent.** The exclusion was
    added deliberately by `8f28066 exclude __tests__ from tsconfig to fix Vercel build`. Do **not**
    remove `"**/__tests__"` from the base `tsconfig.json`; add a second config. I am naming this
    because deleting the exclusion is the obvious-looking fix and it would break the deploy.
  - **Minimum** (inside this chain, the implementer's): correct the round-5 MEDIUM-1 disposition
    record in the implementation document to `no test`, and name `a3e758b` as the commit where
    enforcement begins for the three wired symbols.

### MEDIUM-2 (round 6) — `chosenOption` still carries a draft-derived label into the applier, and this residual fails in the unsafe direction

- **Location**: `applyDisposition`'s `chosenOption?: ContentLossOption` parameter, `src/utils/index.ts`.
- **Class**: the same class round-5 MEDIUM-1 closed — a parameter carrying a value derived from a
  draft, untied to the draft actually passed — residual at the sibling parameter. `chosenOption.mode`
  is read; `chosenOption.dropSet` is read by nothing, so the label the user was shown and the loss
  actually enacted can differ.
- **Enumeration**: parameters of the three exported EC-3 functions that carry a draft-derived value.
  `resolveContentLoss` — none (raw scalars; closed at round 4). `gateBeforePersist` — none (derives
  internally). `applyDisposition` — `chosenOption`. **1 of 3, open.** *What the predicate does not
  match*: a function M8 adds after `816d7fd`; and a derived value smuggled in as a property of
  `draft` itself rather than as its own parameter.
- **Demonstrated, executed** (CR6-C): draft A `{flags:0, content:'hi', embeds:[], components:[container]}`
  yields a v2 option advertising `dropSet: ['content']`. The user then adds an embed; draft B's own
  v2 option would advertise `['content','embeds']`. `applyDisposition(draftB, optionFromA)` is
  **accepted**, and returns `content: ''`, `embeds: []` — the embed destroyed under a label that
  never named it. Also executed: a deliberately bogus `dropSet: ['nothing','at','all']` produces a
  **byte-identical** result to the honest option, confirming `dropSet` is read by nothing.
- **The direction reversed, and that is why this is not simply a repeat.** Round-5 MEDIUM-2's
  constant label *overstated* the loss — more promised dropped than actually was — so no user was
  under-warned, and that is expressly why it was MEDIUM and not HIGH. This residual path
  **understates** it: the user is warned about `content` and loses an embed. The safe-direction
  argument that held for the predecessor does not hold here.
- **Magnitude**: production consequence **unmeasured** — a hypothesis about M8's callers, since
  nothing was wired at `816d7fd`. What is measured is that the mismatched pair is accepted and
  destroys an embed the label did not name.
- **Required Action**:
  - **Preferred (structural)**: `applyDisposition(draft, chosenMode?: MessageMode)`. A bare mode
    carries no draft-derived label, so nothing stale can travel — the same move that closed
    round-5 MEDIUM-1, applied to the parameter beside it. Callers rendering the notice keep calling
    `resolveContentLoss`/`gateBeforePersist`; nobody hands a derived object back in.
  - **Minimum**: every call site obtains the option and applies it in one expression, never storing
    an option across a state change — the invariant recorded in the implementation document, not in
    a source comment.
- **The invariant the new code inherits** (stated because the enumeration cannot cover code that
  does not exist yet, per this document's own adopted check): *any draft-derived value is valid only
  for the exact draft object it was derived from.* The M8 wiring must satisfy that, and its
  implementation document should say how.

### LOW-1 (round 6) — the test named as MEDIUM-1's regression check discriminates nothing its siblings do not

- **Location**: `013-m8-ec3-resolver-gate.test.ts`,
  `it("MEDIUM-1 (round 5) regression: applyDisposition cannot be handed a mismatched disposition …")`.
- **Class**: a test whose name asserts a property its body does not exercise. Its draft literal is
  byte-identical to the existing `row B/C settled` test's, and nothing mismatched appears anywhere
  in it.
- **Enumeration**: four mutants applied to `applyDisposition`'s two return sites —
  (M1) return `draft` unchanged; (M2) `chosenOption?.mode ?? disposition.mode` on settled rows;
  (M3) always `'classic'`; (M4) drop the row-E guard and default to `'v2'`. For each, the effect on
  the named test and on `row B/C settled` was recorded: **identical in 4 of 4** — both red under M1
  and M3, both green under M2 and M4. **No mutant separates them.** *What this does not match*: four
  hand-chosen mutants at one function's return sites; a mutant elsewhere in the module could in
  principle separate them and I did not search exhaustively.
- Additionally, against the pre-fix tree it goes red as
  `TypeError: Cannot read properties of undefined (reading 'requiresChoice')` — the *pre-existence*
  reason, shared with three sibling tests. That is the same vacuity shape the implementer themselves
  caught and fixed in round 5's bare `.toThrow()`; it has reappeared one test over.
- **Required Action**:
  - **Preferred (structural)**: delete it. The property it names is not runtime-testable at all
    (MEDIUM-1 round 6), and the honest disposition record is `no test` — a duplicate test wearing
    the claim in its name is what makes a dead control look live.
  - **Minimum**: rename it to what it actually checks — *a row-B draft resolves to V2 and preserves
    its components* — and record the disposition's real check as `tsc`, conditional on specs being
    typechecked.

### LOW-2 (round 6) — review-round references survive in test-name strings, where a comment-shaped sweep cannot see them

- **Location**: `013-m8-ec3-resolver-gate.test.ts`, six `describe`/`it` name strings.
- **Class**: a reference to a review document's item **number** carried in a source file without the
  item's **name**. Review numbering is per-round and restarts, so `MEDIUM-2` resolves to a different
  finding in round 4 than in round 5, and neither is recoverable from the source once the round
  closes.
- **Enumeration**: `git grep -in "round-5\|round 5\|MEDIUM-\|round-4" 816d7fd -- src/utils/index.ts
  src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts` → **0 in `index.ts`, 6 in the spec**, all
  inside name strings. *What the predicate does not match*: a reference phrased in prose
  ("the reviewer's second finding"), and — deliberately — stable ruling ids such as `D17`/`D18`,
  which are **not** in this class and should stay.
- **Why LOW and not MEDIUM**: test names are consumed by the runner, so they pass the tool test as
  code, not as comments. And **four of the six already pair the number with the property** — e.g.
  *"(MEDIUM-2, round 5) — an empty embeds array is not a real loss"* — which is self-detecting on
  read and fine as it stands. Only two carry bare numbers:
  `describe('EC-3 — applyDisposition, the application half (MEDIUM-2 round 4 / MEDIUM-1 round 5, D18)')`
  and LOW-1's own test name.
- **Required Action**: **Minimum** — in those two, keep the property description and drop the
  round-numbered reference; keep `D18`. No structural change is warranted, and I am explicitly not
  asking for a sweep of the other four.

### INFO-1 (round 6) — round-5 INFO-2 carried, unchanged

The spec's header docblock still reproduces the plan's D17 row table as prose
(`013-m8-ec3-resolver-gate.test.ts`, the module docblock). It predates this round and the comment
sweep did not reach it. Round 5's recommendation is unchanged and I endorse it: do not delete the
table, make it executable — transcribe it into a `const` the assertions iterate, so drift from the
plan surfaces as a failing test rather than as a stale comment.

### INFO-2 (round 6) — the key-level label cannot describe a partial components loss, and that bound is worth writing down

CR6-E, executed: for `components: [container, actionRow]`, the classic option's `dropSet` is
`['components']`, and `switchToClassic` returns `[actionRow]` — the Action Row **survives**. The
`dropSet` fix makes the label track *which keys* change; it cannot express *which elements within a
key* change, because `dropSet` is a set of key names.

This is **not** a reopening of round-5 MEDIUM-2 and I am not raising it as one: the enacted-versus-
advertised agreement the Preferred action asked for holds exactly, at the granularity `dropSet` has.
It is recorded because the notice M8-E renders from that string will read "components" while some
components survive, and **the notice's wording — not `dropSet` — is where that is solved.** Also
bounded, and executed: a draft whose only components are Action Rows never reaches row E at all
(`resolveContentLoss(0, [actionRow], 'hi', [])` → row **A**, `requiresChoice: false`), so the case
is confined to mixed component lists. QA's M8-E instrument is the right owner.

### INFO-3 (round 6) — an input-robustness question, disposed of at step 1, and why the disposal is conditional

CR5's now-expired assertions surface a tempting finding: `applyDisposition(draft, {mode: null})`
silently applies **classic** rather than throwing, because `applyModeSwitch` treats any non-`'v2'`
value as classic. Applying the disposition order: *can the caller send it?* `ContentLossOption.mode`
is `MessageMode`, a closed union excluding `null`, so the contract says no — **stop, no finding**.
There is no exploit path, so step 3 does not override.

Recorded rather than dropped for one reason: that disposal rests entirely on the type system, and
per MEDIUM-1 (round 6) the type system did not see any caller of this function at `816d7fd`. The
step-1 answer is therefore **conditional on MEDIUM-1 (round 6)**, and becomes unconditional for each
call site as it lands in typechecked `src/`. Worth stating so a later reader does not take the
disposal as unconditional and skip the guard when a caller arrives from parsed JSON.

## TDD Compliance

**Table present**: yes. **All rows complete**: yes. **No exemption claimed** — correctly, since this
round changed behaviour.

**Verified by re-derivation, not accepted.** I reverted `src/utils/index.ts` to `0c8fad5` in an
isolated `git archive` extraction — the shared working tree was not touched — and ran the
`816d7fd` spec against it: **10 failed, 22 passed**. That matches the implementer's claim of 10
exactly. Reasons, which are the load-bearing part:

- **5 × `AssertionError` on `dropSet` values** — the genuinely discriminating half. These are red
  because the old hardcoded label differs from the derived one, which is MEDIUM-2's actual subject.
- **4 × `TypeError: Cannot read properties of undefined (reading 'requiresChoice')`** — the
  pre-existence reason, from the arity change.
- **1 × the throw-match assertion.**

The five `dropSet` assertions are real discriminators. The four `TypeError`s are not — they would go
red for any signature change whatever — and one of them is LOW-1's, which is why LOW-1 is a finding
rather than a note. **The honest summary is that MEDIUM-2's fix is test-gated and MEDIUM-1's is not**,
and the implementation document should say so rather than presenting ten reds as ten discriminators.

## Adversarial execution

**At `816d7fd` the exemption held, and I tested the trigger mechanically rather than interpreting it**,
using the command this document's Standing obligations section pins:

```
git grep -c "gateBeforePersist\|applyDisposition\|resolveContentLoss" 816d7fd -- src \
  | grep -v "src/utils/index.ts" | grep -v "__tests__"
```

→ **empty**. Control through the identical pipeline on a symbol that does have consumers
(`hasV2Components`) → `src/utils/messageMode.ts:2`, so the empty result is a real absence and not a
broken predicate. Nothing can be driven against a running instance that CR6 does not already drive
directly.

**The exemption has now expired.** The same command at `a3e758b` returns
`src/app/message/m/[id]/_components/JsonModalBody.tsx:4`. **Round 7 — the review of `a3e758b` — is
under the mandatory obligation**: stand the service up, drive the five IS-1 writers
(`useApiMethods.saveMessage`, `SaveAsMenu.onSubmit`, `NewMessageModal.onSubmit`, `m/new/page.tsx`,
`f/[id]/page.tsx`) from a raw socket rather than a client library, and assert the negative **on the
persistence surface itself** — no `message.upsert` before a choice — never on a response status. Note
for that round: at `a3e758b`, `gateBeforePersist` still has **zero** production consumers, so
"every application site routes through `applyDisposition`" and "the persist gate is wired" are two
different claims and only the first has been made.

## Positive observations

- **Both fixes took the Preferred structural option, not the Minimum.** MEDIUM-1 was closed by
  *deleting a parameter* rather than by documenting an invariant about it. That is the difference
  between a class that cannot be expressed and one that is merely discouraged, and it is the harder
  of the two to choose when the Minimum is sitting right there.
- **`diffDroppedKeys` derives the label by running the real serialiser.** The tempting fix for
  round-5 MEDIUM-2 was to correct the string. Deriving it from execution means the label cannot drift
  from `switchToClassic`/`switchToV2` again, including through future changes to either — and the
  two new spec rows (the partial-components case and the empty-embeds case) are exactly the two cases
  that distinguish a derived label from a corrected one.
- **`ROW_E_OPTIONS` was deleted, not emptied.** The module-scope constant is gone rather than left
  behind holding a better value — which also removes a module-evaluation-time object from a module
  that participates in an import cycle, making the cycle strictly less fragile than round 5 found it.
- **Two self-catches, both unprompted and both correct.** The source-comment reintroduction and the
  working-tree suite figure were caught and corrected by the implementer before I raised either. I
  had the comment finding written when their correction arrived; it is theirs, not mine, and the
  record should show that. The comment sweep they ran was also correct against its own predicate —
  what I found by breaking it (LOW-2) is a wider class, not a missed member of theirs.
- **Purity was preserved through a change that easily could have broken it.** Making a resolver
  declared pure call the serialiser is exactly where a mutating switch would have leaked side effects
  into a guard. It holds across 1120 frozen drafts.

## Assumption Not Checked

**This review assumes that the object M8's wiring hands `applyDisposition` is a single coherent
draft — one object whose `flags`, `components`, `content` and `embeds` are all current with respect
to each other — and does not test it.** Every CR6 assertion builds that object as one literal. The
composer does not hold it that way: `DiscordMessageEditor/index.tsx` keeps `content`, `embeds` and
`components` as three separate `useStateSetter` slices over `message`, and **`flags` is not among
them** — `git grep -c flags 816d7fd -- src/components/DiscordMessageEditor/index.tsx` returns
**nothing**, so wherever the flag comes from at the call site, it is not that component's state.

**Falsity signature**: a call site reassembles the four fields from separate sources and reads a
`flags` value stale with respect to the components slice — so `resolveContentLoss` sees flag-clear
plus V2 components (**row B**, settled) where the live editor state is **row E**. `applyDisposition`
then applies V2 and clears the body **with no choice presented**: precisely the behaviour D18
forbids, and the 5712 shape D19 exists to abolish, reintroduced by the reassembly at the call site
rather than by any defect in the function. Note this is *not* reachable through `applyDisposition`'s
own contract — it is reachable only by constructing its argument from more than one snapshot, which
is why no amount of testing the function closes it.

**Owner**: the **implementer**, at the M2+M8 Load wiring — which is `a3e758b`, already committed, so
this is live rather than prospective. The wiring's implementation document must name the actual
object handed to `applyDisposition` and where its `flags` value comes from. QA's IS-1
no-upsert-before-choice instrument is the backstop. Routed again in Next Steps.

*(One assumption I did **not** need to carry: whether `hasClassicContent` classifies the composer's
real default embed as I assumed. I checked instead of assuming — the add-embed handler is
`setEmbeds([...embeds, {} as EditableEmbed])`, a bare `{}`, and `[{}]` is in the corpus and correctly
reports no classic content. Closed, not declared.)*

## Verdict

**Status: APPROVED_WITH_COMMENTS**, bound to **`816d7fd`** and to no other tree.

**Rationale.** Both round-5 MEDIUMs are closed structurally and both closures are established by
execution over an exhaustive 1120-draft corpus with an independent oracle and a mutant control — not
by reading the diff, and not by accepting the implementer's counts, every one of which I reproduced
myself. The behaviour delivered is correct across the whole input domain I could construct, the
resolver's declared purity survives a change that put it at risk, and the round took the harder
structural fix in both cases.

The two new MEDIUMs are about **enforcement, not behaviour**, which is why they do not reject.
Neither describes a defect a user can reach at `816d7fd`: nothing was wired. MEDIUM-1 says the
record overstates what protects the fix; MEDIUM-2 says the class closed at one parameter is residual
at the one beside it. Both are cheaper to fix before the wiring hardens than after — and the wiring
has now landed, which raises their priority without changing their severity.

**Neither reaches HIGH.** MEDIUM-2's failure mode requires a caller to hold an option across a
state change, and no such caller existed on the reviewed tree; its magnitude as a production
consequence is explicitly unmeasured. MEDIUM-1 is a documentation-integrity defect about a control,
not a control failure.

**Three MEDIUMs across rounds 5 and 6 in one file is close to the "pattern of MEDIUM findings"
rejection threshold, and I considered it.** I am not rejecting, for a reason I want on the record:
each round's MEDIUMs have been *found by the previous round's fix being correct enough to expose the
next layer*, and each has been fixed structurally on first ask. That is a converging process, not an
accumulating one. If a fix round were to introduce a MEDIUM in a layer already reviewed, that
reasoning would not hold and I would reject.

**I am not setting the plan's `Status` field.** My definition instructs it on a passing review; I am
declining for the same reason my predecessor did, and having read their reasoning I independently
agree with it rather than deferring to it: this plan is being reviewed milestone by milestone, five
of its eight milestones are undelivered, and writing "Code Review Approved" at the plan level would
publish a false claim about work that does not exist. A milestone-level verdict cannot carry a
plan-level status. The definition gap is already lodged for retrospective → pi at `ee1ae0e`; if the
field's absence is raised at me I will refer it to steering rather than move it.

## Required Actions

**To `implementer-hooks-013-2`** (none of these block; all are cheaper before the wiring hardens):

1. **MEDIUM-2 (round 6)** — `applyDisposition(draft, chosenMode?: MessageMode)`. Preferred/structural.
   The same move that closed round-5 MEDIUM-1, applied to the parameter beside it. **Do this before
   more call sites accumulate**, since `a3e758b` has already added two.
2. **MEDIUM-1 (round 6), Minimum only** — correct the round-5 MEDIUM-1 disposition record to
   `no test`, and name `a3e758b` as where enforcement begins for the three now-wired symbols. The
   structural half is not yours (see below).
3. **LOW-1** — delete or rename the MEDIUM-1 regression test. Preferred: delete.
4. **LOW-2** — drop the bare round-numbers from the two `describe`/`it` names that carry no property
   with them. Keep `D18`. Leave the other four alone.
5. **Carry the Assumption Not Checked into the `a3e758b` implementation document**: name the actual
   object handed to `applyDisposition` and where its `flags` comes from.

**To `steering-hooks-013-2`** (routed per D22 as scope growth, not asked of the implementer):

6. **MEDIUM-1 (round 6), Preferred/structural** — a `tsconfig.test.json` so spec files are
   typechecked. This is outside plan 013's milestones and needs the owner's word. **Carry the
   warning with it**: the base `tsconfig.json` exclusion exists because of
   `8f28066 exclude __tests__ from tsconfig to fix Vercel build`, so the fix adds a second config
   and must not delete the exclusion from the first.

**To `qa-hooks-013`**:

7. Round-5's item stands: M8-E's notice instrument asserts against the **applied result**, not
   against the option constants. Add: per INFO-2 (round 6), the notice **wording** is where partial
   components loss is solved — `dropSet` cannot express it, and asserting the notice says
   "components" is not the same as asserting it is true.

## Captured Instruments (round 6)

New, at `agent-output/verification/013/probe-cr6-derivation-round/`:

| file | what it establishes |
|---|---|
| `derivation.cr6.test.ts` | CR6-A/B/C/D/E — the 1120-draft exhaustive corpus, the D18 gate/applier invariant, the advertised-vs-enacted agreement against an independent oracle, the mutant control, the purity check, the residual demonstration, and the granularity bound |
| `vitest.cr6.config.ts` | its config |
| `run-cr6-52e0e8a.txt`, `run-cr6-816d7fd.txt` | captured runs at both trees, 10/10 each |

**Superseded**: `probe-cr5-application-half/`'s CR5-B, CR5-C and CR5-D now fail (3 of 19) — **all
three by instrument expiry, none by defect.** They were built for the three-parameter signature and
the constant `dropSet`, both of which this round removed; their failure *is* the fix working. CR5-A
and the two cycle probes remain valid and pass. Recorded in the instruments README. An instrument's
validity is indexed to the claim it was built for, and these two claims are gone.

**Neither of the two round-6 MEDIUMs gets a captured check from me, deliberately.** MEDIUM-1's
subject is that no runtime check *can* exist for it — writing one would be the dead control the
finding is about. MEDIUM-2's fix belongs in the project's own suite, where a framework already
reaches this code: authoring it is not mine. Both are `no test` from me, explicitly, and the
instrument's location is handed to the implementer with the finding.

## Next Steps

1. **`implementer-hooks-013-2`** — Required Actions 1–5. MEDIUM-2 (round 6) first and before further
   wiring.
2. **`steering-hooks-013-2`** — Required Action 6 (scope growth, owner's word needed). Also: your
   pairing condition **has not lapsed** — both `check-expected-six.sh` and `probe-cr3-mode-predicate/`
   were run this round, 122/122 on the latter.
3. **`qa-hooks-013`** — Required Action 7.
4. **Round 7 = `a3e758b`, under the adversarial-execution obligation.** The exemption expired at
   that commit, tested mechanically, not interpreted. That round stands the service up and asserts
   the negative on the persistence surface. It also re-reads this round's declined and deferred
   findings first, per the standing rule.

**QA is not the next stage.** M3, M4 and M6 remain, and M8-G is not delivered.

**Rounds 1–5's verdicts are unaffected.** Each stands on its own tree.

## Method notes (round 6)

### A vacuous comparison I nearly shipped, and the control that caught it

Establishing that `816d7fd` was decision-neutral meant comparing emitted JavaScript at two commits.
My first run reported:

```
IDENTICAL   (index.ts)
IDENTICAL   (013-m8-ec3-resolver-gate.test.ts)
```

Both were false. `esbuild` had rejected its arguments (`"loader" without extension only applies when
reading from stdin`), written **zero bytes** to all four output files, and `cmp` had dutifully
reported four empty files as pairwise identical. The sha256 of every output was
`e3b0c44298fc…` — the hash of the empty string, which is what made it visible.

**The comparison could not have failed.** Any pair of inputs would have produced IDENTICAL, including
two files that differ completely. It is precisely the "Checks That Cannot Fail" defect this role
raises against others, arising in my own instrument, in the same pass in which I raised LOW-1 for a
version of it.

What caught it was adding a **positive control**: emit a copy of the file with one token changed
(`return dropped;` → `return dropped.slice();`) and require the comparator to report DIFFER. It did,
at byte 2188 — and only then does IDENTICAL on the real pair mean anything. The general form, which
is worth more than this instance: **an equality check between two derived artifacts must be shown to
be capable of reporting inequality, on that run, on those artifacts.** A control is not the same as
a mutant test of the code; it is a test of the comparator.

### Three rig failures, recorded so they are not rediscovered

These join the two already recorded in `probe-cr4-disposition-gate/gates/README.md`. All three
produce a red or absent result that has nothing to do with the code under review.

1. **A probe directory's `node_modules` can silently degenerate from a symlink into a real
   directory.** `probe-cr3-mode-predicate/node_modules` had become a real directory containing only a
   `.vite` cache, so `npx` could not resolve the workspace vitest, fetched **vitest 4.1.11 from the
   network**, and failed at config load with `Error: Cannot find module 'vitest/config'` and exit 1.
   That reads exactly like "the CR3 probe fails at this tree" — which, given the pairing this probe
   is half of, would have been a consequential misreading. **A further trap**: `ln -sfn <target>
   node_modules` does **not** repair it — when `node_modules` is an existing directory, `ln` creates
   the link *inside* it. The fix is `rm -rf node_modules && ln -sfn <target> node_modules`. Verify
   with `ls node_modules/vitest` before trusting a run.
2. **`eslint` cannot run from a `git archive` extraction with a symlinked `node_modules`.** It exits
   2 with `ESLint couldn't determine the plugin "react" uniquely`, seeing two `eslint-plugin-react`
   versions through the pnpm store. Lint provenance questions are better answered from the real tree
   plus `git show`, not from an extraction.
3. **`next build` in an extraction needs more dummy env than the CR4 README lists.** Beyond that
   list: `PREVIEW_IMAGE_API_KEY`, `PREVIEW_IMAGE_URL`, `NEXT_PUBLIC_PUSHER_KEY`,
   `NEXT_PUBLIC_PUSHER_CLUSTER`, `PUSHER_APP_ID`, `PUSHER_SECRET`, `ENCRYPTION_IV`,
   `HOOKS_API_TOKEN`. Compilation completes before env validation runs, so
   `✓ Compiled successfully` is obtainable — and is the part that carries typecheck and bundling —
   even when prerendering then fails on `Invalid environment variables`. **This round reached
   compilation and not prerender**, and says so rather than claiming a clean build.

### On `git grep -c` versus the output filter

Every count in this round used `git grep -c`, `grep -c` or `git diff --numstat`, all of which compute
before the output filter. This is not caution for its own sake: an exact-match or positional
predicate over filtered output is unsound rather than merely inaccurate, and reproduces stably, so
re-running it looks like confirmation. Where a claim rested on a count, a contradicting counter was
what would have caught it — never a second run of the same filtered form.
