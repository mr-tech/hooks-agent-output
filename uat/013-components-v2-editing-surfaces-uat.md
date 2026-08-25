---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: Active
Status-Detail: >-
  **Rev 17 — verdict UNCHANGED; the condition is narrower.** QA split BC-19 as recommended: **BC-19a**
  *(appears-at-all — a real code import)* and **BC-19b** *(legible-and-placed)*, 19b's decidability
  depending on 19a. **Rev 15's failure mode (b) *"the page throws"* is RETIRED on evidence** — verified
  here, not adopted: one mount site inside `<MessageProvider>`, and the sibling `Navigation.tsx` is blob
  `339ed840` at `a151fb4`/`abcf585`/`4a7126b` and untouched by the release, so that boundary runs in
  production already. **An unreachable failure is not a reason.** **F-9 answered: this document never
  carried the false form** — 0 lines pair `a151fb4` with `test-only`, because rev 13 derived the delta
  from the tree instead of restating it. Instrument class now **six** members.
  **Rev 15 — verdict UNCHANGED; the residue is WIDER than rev 13 described.** QA Phase 3: **RELEASE
  VERIFIED at `4a7126b`** (577/577, build 0). Its coverage finding **corroborated here, not adopted**:
  on the **code-import** surface the **producer is mocked out** (`013-qa-toast-vessel-render.test.ts:21`)
  and the **mount is text-pinned only** — and `CodeMessageNotice.tsx` is **absent at `a151fb4`**, so that
  surface has **never executed in production**. R13.6's *"instrument-guarded on both surfaces"* was true
  of the paste surface and **overstated** for this one; corrected by reconcile note. **BC-19's falsity
  signature restated and widened** — *no notice at all* and *the page throws* are new; a **split is
  recommended to QA**. Verdict does not move: the finding lands **inside** a condition already blocking.
  **Rev 14 — verdict UNCHANGED; three reconciling writes.** R13.5.1's ANC closure **corrected**: right
  method, but one control short — QA supplied the negative control, re-derived here (three DIFFER vs live
  `master`, one file absent), so the closure is **joint**. **BC-11b `TERMINAL: CANNOT BE EXECUTED`** (a
  fourth state this definition does not contain — never read as closed); **BC-18/BC-19 reclassification
  DECLINED by QA and its reasoning adopted over mine** — the rows do not expire and stay `PRE`, OPEN;
  **BC-21** registered. **Finding U-5: `4a7126b` is NOT released** (`git ls-remote origin master` =
  `a151fb4`), contra QA's prose — **so rev 13's condition has NOT been overtaken and the window is open.**
  **Rev 13 — a SECOND release decision, on a SEPARATE tree: `chain/013-toast-vessel` @ `4a7126b`,
  the owner's 2026-08-25 toast-vessel fix. `APPROVED FOR RELEASE, conditional on the human
  click-through of BC-18 and BC-19.`** Identity re-derived from the tree (R13.5), predecessors read
  directly: **code review `Code Review Approved`, round 22 binding at `4a7126b`**; **QA `QA Complete`
  at `4a7126b`**. **013 HAS ALREADY BEEN RELEASED** — `origin/master` = `a151fb4`, pushed 00:56:37
  on 2026-08-25 by a party none of steering, devops or the implementer claims. **Rev 10's decision is
  EXPIRED by its own terms** (four production files changed at `abcf585`) and was **overtaken, not
  discharged**: its twelve `PRE` rows went out unexecuted. The released tree nonetheless carried rev
  10's production-code identity exactly — the only delta `821330d..a151fb4` is the three test paths
  rev 10 named as the one move it survives — so the cost of the ordering is the **conditions**, not
  the code. Value re-measured on a wider predicate than any predecessor used: 013 added exactly
  **three** `toast.*` sites across all of `src`; two converted, one retained, and the retained one is
  the site the owner's second ruling carves out. **Authority ruled, not deferred**: the ruling is
  sufficient because the change sits inside the plan's own D4-approved Value Statement — but it has
  **no Decisions-Register entry** (finding **U-4**, routed to steering). Open residue is **one agreed
  boundary**, adopted at QA's narrower scoping: **visibility, placement, and the real Next.js
  server/client mount** — owner-observation only under D28. Ledger terminalised row by row in R13.7;
  **nothing withdrawn — `WITHDRAWN` is the owner's ruling alone.** Rev 12 and earlier stand as
  written; no superseded text was overwritten.
Verified-At: >-
  **CURRENT (rev 13).** `website` @ `chain/013-toast-vessel`, HEAD = `4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f`
  (`git rev-parse HEAD`), base `a151fb4` confirmed an ancestor. Production population = the four files
  introduced at `abcf585`, blob-identical at `abcf585` and `4a7126b` (`git rev-parse <tip>:<path>`) and
  hashed as file bytes: `NewMessageJsonInput.tsx` d2ffdb00…; `CodeMessageNotice.tsx` fbe23995…;
  `layout.tsx` 14d3d74a…; `MessageProvider/index.tsx` 238f2a16… — **full digests in R13.5**. Delta
  `abcf585..4a7126b` is two files, both under `src/utils/__tests__/`. **Exclusion list**: four untracked
  paths under `.cr24-probe/` (another session's probe rig, foreign to this verdict). Uncovered
  population: none in `website`. **Any change to a production-code blob expires the predecessor verdicts
  and this decision with them.**
  **SUPERSEDED (rev 10), retained because §2 of the rev-10 block resolves through it.** `website` @
  `chain/013-components-v2-editing-surfaces`, HEAD = `821330d`, `c85945f` an ancestor. Three uncommitted
  test paths, hashed as file bytes, reproducing QA's manifest exactly:
  `src/utils/__tests__/012-json-editor-repair-path.test.ts` 33af76e25e0bd5f6350c9fd398c2a135fb9db53f8be6c352eee1af4768021714;
  `src/utils/__tests__/012-message-mode.test.ts` 94cd8738162139121c421056737edf7d1b9da53ca91dac2209288bcf2f5fe411;
  `src/utils/__tests__/013-fqa19-ingress-gate-reachability.test.ts` 82e92af1ab7c4c6bf718f28d10c4977479b00644d538f7798ce82253de9c3fcd.
  Base SHA `821330d`; exclusion list empty. **All three landed as commits and are part of `a151fb4`**
  (`git diff --numstat 821330d a151fb4`), which discharges U-C4. The rev-10 anchor is superseded for
  verdict purposes and is NOT the identity of the decision above.
---

# UAT Report: Plan 013 — Components V2 support across the editing surfaces

**Plan Reference**: `agent-output/planning/013-components-v2-editing-surfaces.md` — rev 18, Status
`Approved` (frontmatter re-read at write time, 2026-08-24)
**Date**: 2026-08-24
**UAT Agent**: Product Owner (UAT) — session `uat-hooks-013` (rev 1–9); `uat-hooks-013-2` (rev 10, the gate pass)
**Plan Reference re-read at rev 10**: `agent-output/planning/013-components-v2-editing-surfaces.md` — **rev 20**, `Status: Approved`, frontmatter and D28 read directly 2026-08-24
**Re-read at rev 13 (2026-08-25)**: plan frontmatter `Status: UAT Approved` (already set; **not advanced by this pass**); `grep -c "toast"` over the plan = **0** — see finding U-4. Session `uat-hooks-013-3` (rev 13, the toast-vessel gate pass).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-24 | steering-hooks-013-2 (sequencing overridden explicitly; **no verdict invited**) | Execute D20's pre-deploy precondition: mint two throwaway records — one 5712-shaped, one 5842-shaped — through the product's own New Message JSON surface at production `c85945f`, re-deriving the mintability finding rather than inheriting it | **BLOCKED, reported, nothing improvised.** The New Message JSON surface is unreachable from this session (no authenticated session; `message.upsert` is a `protectedProcedure`; no browser, no `DISPLAY`, no browser-automation tooling). The route at `c85945f` was traced **by reading** and is recorded below as corroboration, explicitly **not** as the re-derivation D20 requires. The executed re-derivation was separately blocked by the auto-mode classifier when creating the probe rig; disclosed in this document per CLAUDE.md rather than retried in another form. BC-11 stays **NOT EXECUTED**. No release decision. |
| 2026-08-24 | steering-hooks-013-2 (relay of an owner decision + **D27**, plan rev 19 `a479afe`) | Owner chose option (a) on the mint — he does it himself; act on D27 by sending UAT's two probe extensions to QA directly | Rev 2. **No state change to any register row.** Owner's mint is recorded as **intent, not evidence**; BC-11 Half A stays `NOT EXECUTED` pending his attestation, which is complete evidence when quoted with its timestamp and is not satisfied by a relay. Classifier block on the probe rig **parked and staying parked** — steering confirmed it will not run it either, so D20's re-derivation clause is outstanding and QA's probe is the only executed evidence for the mintability finding. Extensions (i) `optionalIdMessageShape` and (ii) the uncovered persist leg sent direct to `qa-hooks-013-2`, citing `b6e9662`. Still no verdict. |
| 2026-08-24 | steering-hooks-013-2 (an inference offered **explicitly as unestablished**, to re-derive not adopt) | Test whether Half B is blocked for the same reasons as Half A, and if so prepare a one-shot observation script | Rev 3. **Inference SURVIVES in part and is corrected in part.** Survives: Half B is not executable by this session — all 8 message-router procedures are `protectedProcedure` (0 `publicProcedure`) and the oracle is a UI event, so the browser constraint decides it independently of timing. Corrected: **it does not follow that Half B is the owner's** — the plan's M8-G clause admits the form *"in any environment seeded with the shape"*, and the planner already wrote a fallback disposition for the no-seeded-environment case. Two register defects found and sent to QA: BC-11's **Subject** cell names `UAT agent` with no fallback, which is wrong for both halves; its **earliest-decidable** cell states Half A's precondition only and omits Half B's. Observation script for the designated observer added as Appendix A, **not executed**. Still no verdict. |
| 2026-08-24 | **owner**, attested in the steering session; **route: relayed out-of-band by steering-hooks-013-2 — not a stage handoff** | Deliver the owner's attestation that the two seed records exist, for UAT to judge under its own gate | Rev 4. **BC-11 Half A → `EXECUTED`, terminal.** His words, verbatim: *"Re: UAT's JSON message - both are created. 5855 and 5856"* (2026-08-24). Terminalised on the attestation per the plan's evidence rule and this agent's own — never record a capture as missing against a condition he executed. **Not recorded as fact**: the shape-to-ID mapping (steering expressly did not assert it; Half B exercises both records by its own terms, so nothing is blocked). **D20's re-derivation clause RESOLVED on the substance** — discharged by production execution rather than by UAT's instrument, delta and route-residual recorded; classifier block retired for that purpose. Half B unchanged and still owed. Still no verdict. |
| 2026-08-24 | *(none — raised by this pass)* | — | Rev 5. **Finding U-1 raised**: D20's seed records (5855, 5856) are permanent members of `flagStructureDisagreement`, so after the owner's D19 repair the plan's assumption-7 detector reads **2** where he expects **0** — a working repair looks like a failed one — and the V2-error limb fires too, since that is Half B's precondition. Verified verbatim against the plan's Assumptions item 7 and its "29 empty, 2 disagreeing" count. Routed to steering as plan-touching; no remedy adopted. One inference left deliberately unexecuted and flagged. Still no verdict. |
| 2026-08-24 | qa-hooks-013-2, direct under D27 (`9946eb9`) | Both UAT digests actioned: extensions executed, BC-11 split, one assumption routed back that lands on Appendix A | Rev 6. Both extensions **CONFIRMED by QA's execution** (24 assertions, 5 mutants killed), including the conflict-UPDATE leg Half B actually exercises. BC-11 **split into BC-11a (`EXECUTED`, terminal) / BC-11b (`NOT EXECUTED`)**, both defect reports adopted; register restated here from QA's document re-read at write time. **Appendix A amended**: QA's unexamined read path makes a Classic-mode open ambiguous between a read-path defect and the ask not firing — the script now stops the observer there rather than letting either conclusion be drawn. **F-QA11 ruled out for this script by this pass**: `SaveAsMenu` uses `?? ''` → `null` (accepted), not `NewMessageModal`'s `?? '0'` (refused), so Save As is not exposed. Still no verdict. |
| 2026-08-24 | qa-hooks-013-2, direct under D27 (`32737d3`) | Both items this pass handed over were **executed** rather than recorded at read level | Rev 7. **R7's first limb CONFIRMED not tripped** by the seeds — U-1 is narrower than raised. **Correction carried**: `valid = false` does not discriminate; the seeds are invalid for **two** independent reasons (no username, plus the V2/classic conflict), so anything keying on the boolean must key on the **reason string**. **F-QA11 class-closed by QA over a predicate** (4 sites; two guard `'0'` explicitly), making it a single-site oversight and this pass's Save As read mutant-checked rather than read-level. Appendix A's F-QA11 note strengthened to *positively distinguishable*. Still no verdict. |
| 2026-08-24 | qa-hooks-013-2 (`30f419f`) — receipt both ways, nothing owed | — | Rev 8. **F-QA14 concurrence recorded here**, because QA recorded it as concurred by both stages and a concurrence present in only one document is not one: an inference with a **sound conclusion** is the dangerous case, since the trap travels attached to a correct answer and nothing downstream contradicts it — **a stated gap survives being right**. **Run Record and Resumption** table added: BC-11a and the D20 clause terminal; **BC-11b owed and blocking**; U-1 with steering; the UAT gate itself entirely unstarted. Session ended near its run-length ceiling with work **complete, not truncated**. Still no verdict. |
| 2026-08-24 | steering-hooks-013-2 — **QA COMPLETE handed in, verdict invited** | Run the UAT gate and issue the release decision | Rev 9. **VERDICT DECLINED ON RUN-LENGTH GROUNDS, flagged early as instructed.** ~58 requests, 226k prefix; a sound verdict needs the identity re-derived as a content manifest (three uncommitted `website` source files in scope), four predecessor documents read directly, and **15** register rows driven terminal — far beyond the ceiling's ~10-request exception. **No predecessor document read, no status restated, no release decision issued.** Successor re-reads everything. Remaining budget spent only on what lowers their cost: **C-1…C-4** recorded as conditions rather than prose, and **BC-15/D28 re-derived from QA's register and the plan directly** (not from steering's restatement) and folded into Appendix A — including an ordering hazard nobody had stated: **BC-11b must precede BC-15 on any record**, and no Save may follow BC-15's Load, or the seed is consumed and cannot be re-minted. |
| 2026-08-24 | steering-hooks-013-2 — successor spawned by the owner after rev 9's ceiling handback | Run the UAT gate and issue the release decision | **Rev 10. THE GATE RAN. Release decision: `APPROVED FOR RELEASE, CONDITIONAL` over an 18-row ledger.** Resumed from rev 9's Run Record; **C-1…C-4 all discharged and each re-derived rather than adopted** — C-1's tip had already moved (`164d720` → **`821330d`**) and the three-path manifest reproduces digest-for-digest; C-2's BC-15 and D28 read from QA's register and plan rev 20 directly; C-3 stands unchanged; C-4 adopted no remedy. All four predecessor documents read directly: **QA `QA Complete` @ `821330d`** (green), **code review round 19 `APPROVED` but its document Status is `In Review` and no verdict covers `821330d`** (U-C1), **implementation Status `Active`, M6 unchecked, `821330d`/F-QA21 absent from it entirely** (U-C2). **Finding U-2 raised — the register carries two distinct `BC-13`s and two distinct `BC-14`s**; the Phase-1 `BC-14` (*the user-reported defect is fixed in production*) is the row a by-number reference silently drops, and it is the chain's own reason for existing. Routed to QA; every row here is named as well as numbered. **Twelve `PRE` rows stand outstanding** (eleven `NOT EXECUTED` outright; `BC-10` met on its suite limb with its spot observation owed) — Validation item 3 is owed before this verdict and is not met, which is why the approval is conditional and not unconditional. |
| 2026-08-24 | steering-hooks-013-2 — three follow-ups after the verdict | Reconcile the ledger to QA's renumbering; disposition the U-C2 conflict; package the `PRE` ledger as one operator script | **Rev 11. The verdict is UNCHANGED and is not reopened.** (1) **QA renumbered** on finding U-2 — Phase 2's rows become **BC-16** `p2-rowd-load-gate` and **BC-17** `discord-returns-row-e`; Phase 1 keeps BC-13/BC-14. Mapping re-derived from QA's own table, not the relay. **All four affected rows resolved unambiguously because each was carried by name** — the property that made the collision recoverable. (2) **U-C2 was defective as I wrote it**: it asked the implementer to set a terminal `Status`, which the document-lifecycle table reserves to devops. The implementer declined with that reason and is right. **U-C2 narrows to the recording half — now `EXECUTED` (`7f3111f`), verified from the document** (`F-QA21` × 6, `821330d` × 5, against 0/0 at rev 10) — and the Status half becomes **U-C6, devops's, not a `PRE` row**. **U-C3 also `EXECUTED`**: M6 checked, all seven milestones now complete. (3) **Appendix B added** — one consolidated script for the whole `PRE` ledger, with **three new ordering hazards** beyond rev 9's pair (seed containment; BC-2→BC-3's one-hour TTL clock; and the correction that **the mint route is still OPEN pre-deploy**, so spare seeds can and should be minted now — without them **BC-11b is not runnable to its own prediction**, whose *"both outcomes"* clause Appendix A had dropped). |
| 2026-08-25 | steering-hooks-013-2 — owner ruling relayed verbatim | What do the affected `PRE` rows become, and does anything he *can* do satisfy them? | **Rev 12. Verdict unchanged; nothing reopened. Appendix C added.** Applied **his own operative test** — *can it be generated for him to input into the editor?* — rather than the Discord/not-Discord split. **Most affected rows were never unfulfillable: they were under-specified by my own script**, which handed over `<container>` placeholders instead of paste-ready JSON. **Literal payloads authored for BC-1, BC-6, BC-7, BC-8, BC-9**, derived from the import schema at `821330d` (container = type 17 with ≥1 child; type 11 is in neither supported set, which is what makes it BC-6's dropped-type case). **BC-5 fulfillable in principle but its payload is NOT authored** — the folder-page export's shape is in no document I hold, and an invented fixture would make BC-5 read as executed while testing nothing; one-line question routed. **BC-2 and BC-3 marked RECOMMEND WITHDRAWAL and routed to the owner with the cost stated — not withdrawn.** Their oracle is the Discord ingress path itself, so no payload can reach it. **BC-6 does NOT substitute for them, and BC-10 is exactly why** — steering's flagged tension resolved by refusing the substitution, not by taking it. |
| 2026-08-25 | steering-hooks-013-2 [019315] — third UAT session, spawned by the owner after `uat-hooks-013-2` retired at its run-length ceiling | Assess `chain/013-toast-vessel` @ `4a7126b`, the owner's 2026-08-25 toast-vessel fix, and issue a release decision | **Rev 13. A SECOND release decision, on a separate tree: `APPROVED FOR RELEASE, conditional on the human click-through of BC-18 and BC-19`.** **013 was released while rev 10's conditional approval stood undischarged** — `origin/master` = `a151fb4` (`git ls-remote`), pushed 00:56:37; its twelve `PRE` rows went out unexecuted, and the approval was **overtaken, not met**. Recorded as a recovery state, not a sanctioned ordering. **The ordering did not cost code integrity**: `git diff --numstat 821330d a151fb4` is exactly the three test paths rev 10 named as the one move it survives — re-derived, and it inverts the obvious reading. It cost **the conditions**, plus a possible irrecoverable loss of BC-11b's spare seeds (R13.1). **No deployment record exists for a release that ran** — new condition U-C7, devops. **Authority ruled rather than deferred**: the ruling stands because the change sits inside the plan's own D4 Value Statement; its absence from the Decisions Register is **finding U-4**, routed to steering (U-C8). **Value re-measured on a wider predicate** than the reviewer used — `git grep -c` across the whole `toast.*` surface: 013 added exactly three sites, `toast.error`/`toast.success` did not move, two converted, one retained, and the retained one is the site his second ruling carves out. **U-C1 and U-C4 driven terminal** by direct re-derivation. Residue carried as **one agreed boundary** at QA's narrower scoping. **Nothing withdrawn.** |
| 2026-08-25 | steering-hooks-013-2 [019315], relaying `qa-hooks-013-2`; **nothing asked** | Informational: QA re-derived and confirmed rev 13's blob-SHA closure, added the control it lacked, and terminalised three rows | **Rev 14. Verdict UNCHANGED and not reopened. Three writes judged owed because each corrects or completes a claim THIS document makes.** (1) **R13.5.1 corrected by reconcile note**: its closure was right and its method was right, but a MATCH-only result cannot be told apart from an instrument that matches everything. QA supplied the negative control; **re-derived here rather than adopted** — three DIFFER against live `master`, one file absent. Closure is **joint**, not this document's alone. **Plus an instrument defect**: `git rev-parse <tree>:<path>` on an absent path echoes its argument to stdout, so a stdout-only comparison mislabels ABSENT as DIFFER — settle existence with `git cat-file -e`. (2) **Three rows adopted from QA**: **BC-11b `TERMINAL: CANNOT BE EXECUTED`** — noted as a **fourth** state my definition does not contain, terminal only in that no act can change it and **never to be read as closed**; **BC-18/BC-19 reclassification DECLINED**, and QA's reasoning is better than my question — the rows **do not expire**, and `POST` would have moved them into the class least likely ever to be settled; **BC-21** registered as the genuine post-deploy detector R13.7.3 said was owed. (3) **Finding U-5**: **`4a7126b` is NOT released** — `git ls-remote origin master` = `a151fb4`, contra QA's prose *"with 4a7126b shipped ahead of them"*, which **its own BC-21 row contradicts** in the same document. **Rev 13's condition has NOT been overtaken; the window is open** and, on QA's own finding, does not expire. Owner confirmed the push was his and the site is live — two questions answered. |
| 2026-08-25 | `qa-hooks-013-2`, direct | Phase 3 RELEASE VERIFIED at `4a7126b`; one coverage finding routed because it bears on UAT's rows | **Rev 15. Verdict UNCHANGED; the residue it is conditional on is WIDER than rev 13 described.** QA's finding **corroborated by `git grep` at `4a7126b`, not adopted**: the code-import chain has **no executing coverage of the producer** — `013-qa-toast-vessel-render.test.ts:21` mocks `MessageProvider` out — and **none of the mount**, `layout.tsx` being text-pinned only. **The instrument names the gap itself** at line 122: *"a null context would throw in production and pass [here]"* — production throws, suite stays green. Combined with this stage's own R14.1 derivation that `CodeMessageNotice.tsx` is **absent at `a151fb4`**, that surface has **never executed in production**: neither an executing test of producer or mount, nor one instant of runtime. **R13.6 corrected by reconcile note** — *"guarded on both surfaces"* was true of the paste surface only. **BC-19 restated**: the owner must perform a **real code import**, and *no notice at all* / *the page throws* join *illegible* in its falsity signature; **split recommended to QA**, not performed. **Verdict does not move** — the finding lands inside a condition already blocking, and U-5's open window is what makes it survivable. Also: QA verified R14.1.1 **worse than reported** — `git rev-parse` on an absent path **exits 0**, so `|| echo MISSING` guards never fire. Instrument-lie class now **four** members, predicate stated. |
| 2026-08-25 | `steering-hooks-013-2` [019315] — one fact, no request | U-C8 was discharged before rev 13's handback listed it outstanding | **Rev 16. One row reaches its terminal state; verdict untouched.** **U-C8 · `EXECUTED` — TERMINAL**: the 2026-08-25 ruling is registered as **D29 at plan rev 22** (`d60c857`), both parts verbatim, the third site's retention recorded as **ratified by selection with no verbatim sentence and none manufactured**, and the row marked **registration only — it enacts nothing**. **Verified against the plan rather than the relay**, by the same instrument that raised finding U-4: `grep -c "toast"` over the plan now returns **1** where it returned **0** at rev 13. **My handback asserted this was outstanding and it was not** — corrected here rather than left standing, because a ledger row that inverts a blocking status is exactly the exposure finding U-2 named. **The route, not the ledger, was the defect**: U-C8 was routed, discharged, and the discharge never returned to the router — the failure the one-line route-recording rule exists to catch. **Carried to the retrospective as a fifth item**, and it is a different class from the other four: those were instruments that lied, this is a **handoff that completed without closing its loop**. Nothing else in this document changes; **U-4 stands as a finding correctly raised and now correctly closed.** |
| 2026-08-25 | `qa-hooks-013-2`, direct | BC-19 split performed; mode (b) declined; F-9 exposure question put to this document | **Rev 17. Verdict UNCHANGED; the condition is narrower and better ordered.** **BC-19 split ADOPTED** — **BC-19a** *(appears-at-all: a real code import, carrying the unproven producer and mount)* and **BC-19b** *(legible-and-placed)*, whose decidability **depends on 19a** — an ordering the unsplit row hid and this document had not stated. **Rev 15's mode (b) *"the page throws"* RETIRED, and QA is right**: the comment it rested on is true about the test, not about production. **Verified git-side rather than adopted** — one mount site inside `<MessageProvider>`; sibling `Navigation.tsx` blob **`339ed840` at all three tips**, untouched by the release, in a `_layout` holding exactly those two files. **The boundary already runs in production. An unreachable failure is not a reason** — carrying (b) would have made a blocking row harder to settle while adding nothing observable. **A widened falsity signature is not automatically a better one**; my widening was right on (a)/(c) and wrong on (b), and the difference is reachability, which I did not test before adding it. **F-9 answered: NO** — 0 lines in this document pair `a151fb4` with `test-only`; the sole `test-only` is anchored at `abcf585`. It never entered because rev 13 **derived** the delta from the tree rather than restating QA's note — concrete evidence for the retrospective predicate, not a restatement of it. **Instrument class now six**, the two newest found by this pass's own verification. |

## Scope of This Revision — and What It Deliberately Does Not Do

This revision is a **precondition pass**, run out of the normal gate order at steering's explicit
and narrow instruction. The reason the order was broken is a property of the task and not a
convenience: under **D20** (plan rev 13) the route that can mint the 5712/5842 shape **expires at
deploy** — after 013, M8-D, M4-a and the toggle mean no surface writes it — so the mint is the one
part of UAT's stage that must happen against production `c85945f` and is not gated on M4/M6.

Accordingly, and stated so no later reader mistakes this document for the gate:

- **No release decision is recorded.** Not `APPROVED FOR RELEASE`, not conditional approval, not
  `NOT APPROVED`. The UAT verdict is a document review over the Implementation, Code Review and QA
  documents, and those documents do not yet exist in their final form.
- **No value-delivery assessment is recorded**, for the same reason.
- Predecessor-status verification (Implementation complete / Code Review approved / QA Complete) is
  **not** performed here and is owed at the real UAT pass.
- Nothing in this revision may be cited as evidence that any gate was met.

## Value Statement Under Test

Copied verbatim from the plan (`## Value Statement and Business Objective`), approval status D4,
*APPROVED AS WRITTEN — not a word amended*:

> As a **guild owner editing a Components V2 message in hooks.gg**, I want **every editing surface
> around the composer — "Save As", the Message JSON view, copy and Load, import from a Discord
> message URL, a webhook URL or the bot's "Get Message" code, and cross-tab change detection — to
> carry my message's components and its V2 flag faithfully**, so that **no editing action silently
> discards what I built or misreports what kind of message it is, and I never land on an empty copy
> of a message that was whole a moment ago**.

## The D20 Precondition — What Was Asked, and What Happened

**Authority**: plan `013` Decisions Register **D20**, registered 2026-08-24 from an owner
selection-prompt answer; and the plan's **Validation item 8**. Both read directly at write time.

D20 places on UAT: *create two throwaway records of its own — one 5712-shaped, one 5842-shaped —
**through the product's own New Message JSON surface** before the release act, and observe M8-G
against one of those.* The owner's stated cost when he chose this option was *"two junk messages
left in the account"*, which is the authorised ceiling. Whether the seeds are removed afterwards is
expressly **not ruled and not a gap** (D20); this pass invents no disposition.

### Result: NOT EXECUTED — the surface is unreachable from this session

The mint requires an **authenticated** session against the product. Established this pass:

| Fact | Instrument | Result |
|---|---|---|
| The write the mint performs is authenticated | `grep -n "upsert:" website/src/server/api/routers/message.ts` at `c85945f` | `upsert: protectedProcedure` — a session is required; there is no anonymous create path |
| No browser is available to drive the surface | `which google-chrome chromium chromium-browser firefox`; `echo $DISPLAY` | only `/usr/bin/firefox` (v154.0); `DISPLAY` **empty** |
| No browser-automation tooling is available | tool search for browser/navigate/screenshot tools; `ls website/node_modules/puppeteer*`; `ls preview-image-generator/node_modules/.bin` | no `claude-in-chrome` tools present; no puppeteer reachable. `WebFetch` is read-only and **documents that it fails on authenticated URLs** — it cannot paste JSON into a UI in any case |
| No session credential is available to this agent | — | none held. `website/.env.local` holds **service** credentials and is read no further than key names by standing instruction; it carries no browser session, and obtaining one would mean authenticating as the owner through Discord OAuth — his identity, not this agent's, and not sought |

**Nothing was improvised.** Per the brief's boundary and this agent's own constraints, no direct
database insert, no tRPC call, and no fixture was used to manufacture a record. A record created by
any other route would not establish what D20 has UAT establish, and would leave the register reading
as though it had. **A precondition falsely marked satisfied is worse than one openly blocked.**

### Addendum, 2026-08-24 (rev 2) — the owner will mint the records himself

Steering (`steering-hooks-013-2`) put the three options to him; he chose **(a)**: he mints the two
records himself before going. **This is recorded as intent and not as evidence.** He has said he
will; he has not reported it done, and **BC-11 Half A is therefore NOT marked satisfied on the
strength of this.**

When it is established, the instrument is fixed by the plan's own evidence rule (Surfaces Without
Automated Coverage): *where the designated observer is the owner, no capture path is minted and no
file is owed — his attestation, quoted with its timestamp in the consuming document, is complete
evidence.* So the real UAT pass **quotes his attestation with its timestamp**; it does not paraphrase
it, does not accept a relay in its place, and **never records a capture file as missing against a
condition he executed**. Existence of the two records is established by that pass, not inherited from
this line.

### Addendum, 2026-08-24 (rev 4) — HALF A IS EXECUTED. The attestation, verbatim

The condition the rev-2 addendum named in advance has been met. The owner minted both records himself
and attested it. **His words, quoted and not paraphrased:**

> Re: UAT's JSON message - both are created. 5855 and 5856

**Date**: 2026-08-24, given unprompted in the steering session immediately after he was handed the two
JSON payloads this document lists.

**Route of the evidence, recorded because it was not a stage handoff**: the payloads reached him from
`steering-hooks-013-2`, and his attestation reached this document from `steering-hooks-013-2`. Steering
is the **route, not the source** — the fact is his, quoted from him above rather than attributed to the
relay.

**Disposition: BC-11 Half A → `EXECUTED`, 2026-08-24. Terminal.** This pass terminalises on the
attestation and does not hold the row open for independent confirmation. The plan's evidence rule makes
his attestation complete evidence where he is the designated observer, and this agent's own governing
rule is explicit: *never ask the owner to create, populate, or save a capture file, and never record one
as missing against a condition he executed — record his statement with its timestamp and terminalise on
it.* Holding the row open against live records he has named by ID would be manufacturing a gate he has
already walked through.

**Two things the attestation does NOT establish, recorded so nobody later reads them out of it:**

1. **The shape-to-ID mapping is not stated.** He said "5855 and 5856"; he did not say which is
   5712-shaped and which is 5842-shaped. Steering, which relayed the payloads in this document's order,
   expressly declined to assert the mapping, and **this document records none.** It blocks nothing:
   Half B exercises **both** records by its own terms ("repeat on the 5842-shaped record"). If the
   mapping is ever wanted for the record it is a one-line question for him — not one worth spending at
   a moment he is trying to leave.
2. **His words do not name the route.** He was handed New Message JSON paste steps and answered "UAT's
   JSON message", which reads straightforwardly as that route. Noted once for completeness and **not
   treated as a gap** — treating it as one would be the manufactured doubt the rule above forbids.

### A route that was considered and NOT taken

The product could in principle be served locally at `c85945f` and its real New Message JSON surface
driven there; because the single selectable `DATABASE_URL` is **the remote hosted database**, such a
record would land in the same account. This is recorded so the option is visible, **not as a
recommendation**. It still requires authenticating as the owner, which this agent will not do, and
it stands a service against the live database — a class this chain has ruled on carefully elsewhere.
**It is the owner's call, not this pass's.**

## D20's Re-Derivation Requirement — Also Not Discharged

D20's row states expressly that the mintability of the 5712 shape through the JSON surface at
`c85945f` is **qa-hooks-013's** finding — established by execution with a discriminating control and
two killed mutants at `agent-output/verification/013/probe-preexisting-seed-route/` (README read this
pass) — and that **UAT re-derives it rather than inheriting it**.

**It was not re-derived.** Creation of this pass's probe rig
(`agent-output/verification/013/probe-uat-d20-seed-route/`) was **denied by the Claude Code auto-mode
classifier**. Per CLAUDE.md the denial was **not** rephrased, split into separately-passing pieces, or
routed through another tool; it is reported instead, and is disclosed here in the round it happened
rather than first in a hand-back. Nothing was created — `ls -d` confirms the directory does not exist.

**Status at rev 4 — RESOLVED ON THE SUBSTANCE.** This supersedes the rev-2 status below, which is
preserved as written and was correct when written. D20's clause exists so that UAT does not *inherit*
the claim that the 5712 shape is mintable through the JSON surface at `c85945f`. That claim is now
established **by execution in production**: two records of those shapes exist, minted after the owner
was handed exactly those payloads (rev 4 addendum). That is a stronger derivation than the module-level
probe D20 contemplated, and it is not QA's word taken on trust.

**A required action discharged in a different form — or by a different party — than the one it named is
closed on the substance, with the delta recorded, not returned for a documentation shuffle.** The
delta: D20 named *UAT's own instrument*; what discharged it was *the owner's production mint*. The
residual: his words do not name the route — noted, not treated as a gap, not blocking. **The
classifier-blocked probe is retired for this purpose and needs no ruling from him**; the block itself
was never adjudicated and now does not need to be.

**Status at rev 2, preserved**: the block was **parked for the owner and stays parked.** Steering has confirmed it
will not perform the blocked action either — the trigger for that would be the owner's sanction
obtained in a session, never the block itself. Whether it was a false positive is his call and not
this agent's to make about its own action. **The consequence, stated so nobody assumes otherwise:
D20's re-derivation clause is outstanding, and QA's probe remains the *only* executed evidence for
the mintability finding.**

### What was established instead, and its exact weight

The route was traced **by reading** the tree at `c85945f`. **Reading is not execution, and this is
therefore corroboration, not the re-derivation D20 requires.** It is recorded because it is useful to
whoever finishes the job:

| Leg | At `c85945f` | Source |
|---|---|---|
| 1. paste → parse | `JSON.parse(jsonMessageString)` in a `useUpdateEffect` | `src/app/message/_components/NewMessageJsonInput.tsx` |
| 2. reconcile | `enforceImportMutualExclusivity(parsed)` — result destructured as `{ data: cleaned }`; `detectedMode` deliberately unused at this surface | same file |
| 3. client shape | `discordMessageImportShape.parse(cleaned)` → `setMessage(cleaned)` | same file |
| 4. send | `upsertMessage({ message: { data: loadedMessage, name: messageName, guildId: … } })` | `NewMessageModal.tsx` (`loadedMessage`, the `upsert` mutation) |
| 5. server boundary | `.input(z.object({ message: optionalIdMessageShape }))`, where `optionalIdMessageShape = messageShape.extend({id})` and `messageShape.data = discordMessageShape` | `src/server/api/routers/message.ts`; `src/server/api/utils/shapes.ts` |
| 6. persist | `buildMessageValues` sets **`data: message.data`** — the object verbatim; `valid: isMessageValid(...)` is computed alongside and does not rewrite `data` | `src/server/api/utils/shared.ts` |

**Two observations for QA Phase 2 and for this pass's own later verdict.** Both are *read-level* and
neither contradicts QA's executed finding; both extend it, and both need execution before anyone
relies on them:

1. QA's probe asserts the server boundary as `discordMessageShape`. The procedure's actual input is
   **`optionalIdMessageShape`**, one layer out, wrapping it as `{ message: { data, name, guildId, id? } }`.
   QA's assertion is a strict subset of the real boundary; the `name`/`guildId` fields it does not
   exercise are the remaining unverified part of leg 5.
2. QA's probe covers legs 2–3 and part of 5. **Leg 6 — the persist leg, which decides what is at
   rest — is not covered by it at all.** That leg is what makes the minted record a *member of
   M8-G's class* rather than merely an accepted request, so it is the leg most worth an assertion.

A detached worktree at `c85945f` was created for this reading and **is left in place** for whoever
resumes: `/tmp/uat013-c85945f` (`git -C website worktree list`). It is this session's, not foreign
debris, and the shared tree's branch was **not** switched.

## Blocking Release Condition Register — Adopted

**Register of record**: `agent-output/qa/013-components-v2-editing-surfaces-qa.md`, section *Blocking
Release Condition Register — chain 013*, re-read at write time 2026-08-24. **Re-read again at rev 6 (QA doc rev 2, `9946eb9`)**, the authority for the BC-11a/BC-11b split restated below; QA also added a dated register maintenance log there. That document states it is
chain 013's **single** register; this pass found no second travelling list and mints none. From this
revision forward **this document is authoritative on each row's state**, per the register's own
standing note.

**No row reached a terminal state this pass.** All 14 rows (BC-1 … BC-14) stand as QA left them —
`Not started` — with the one qualification below. `PRE` rows must be terminal before the release act;
`POST` rows are post-deploy-observable and gate the **chain's closure**, never the release act.

| Row | Class | State after this pass | Note |
|---|---|---|---|
| BC-1 … BC-10 | PRE | Not started | Not reachable: they need the chain tip, and M4/M6 are open |
| **BC-11** | — | **SUPERSEDED by BC-11a + BC-11b** | Split by QA at `9946eb9` on this pass's two defect reports; retained as a pointer row. **No requirement withdrawn**, both halves survive verbatim, same ID space |
| **BC-11a** (the mint) | PRE | **`EXECUTED` 2026-08-24 — TERMINAL** | The owner's attestation, quoted verbatim above (5855, 5856). Two residues recorded and not asserted: the shape-to-ID mapping, and that his words reached the register by citation of this document rather than by his writing into a stage document |
| **BC-11b** (the ask) | PRE | **`NOT EXECUTED`** | Non-terminal; **blocks an unconditional approval**. Appendix A is its one-shot script. Subject is now *any party with a browser and a chain-tip environment carrying the shape* — today the owner, **because no session on this box holds browser tooling: a fact about tooling, not a plan requirement** |
| BC-12, BC-13, BC-14 | POST | Not started | Post-deploy-observable; gate chain closure, not the release act. BC-13's owner is devops and its primary instrument is **the clock — no human subject** |

### BC-11, read apart into its two halves

BC-11 is a single register row whose **primary instrument is operator observation** and whose
**subject is the UAT agent**, but whose condition spans two instants that this pass found it useful to
name separately, because they have opposite timing and only one of them was on tonight's table:

- **Half A — the mint (pre-deploy, and it expires).** Paste `{"content":"hi","flags":32768}` and
  `{"content":"hi","flags":32768,"components":[]}` into New Message at `c85945f`, creating one
  5712-shaped and one 5842-shaped record. **This is what tonight attempted. It is BLOCKED and NOT
  EXECUTED.** It cannot be recovered after go-live.
- **Half B — the observation (needs the chain tip).** Open a seed record in V2 mode, add one
  container, press **Save**; the ask appears naming both drops and **nothing is written** until a
  choice is taken. Same at **Save As**; repeat on the 5842-shaped record. Half B is not yet
  reachable and is not claimed either way.

Half B has a **precondition QA recorded and this pass restates so it is not lost**: `showComponentButton`
requires `isEditing && isV2Mode && showComponentsEditable && canAddComponent` — an observer who has
collapsed the components section will see no add-component control and would **wrongly report the ask
as unreachable**.

**The consequence, stated plainly**: if Half A is never executed, Half B has no member to run against
once the owner's D19 repair lands, and the central new behaviour D18 introduces ships on suite
evidence alone. That is precisely the one-way door D20 was ruled to prevent, and it closes at deploy.

### Half B re-derived, 2026-08-24 (rev 3) — and where the re-derivation corrects the inference

Steering offered, expressly as an unestablished inference to be re-derived rather than adopted, that
Half B may be blocked for the same reasons as Half A. **Re-derived here from the tree and the plan,
not adopted.**

**It survives, on two independent constraints:**

| Constraint | Instrument | Result |
|---|---|---|
| Authentication | enumeration of every procedure in `src/server/api/routers/message.ts` at `c85945f` | **8 of 8 are `protectedProcedure`; `publicProcedure` count is 0.** `get`, `getOne`, `getAll`, `getFromUrl`, `getFromCode`, `upsert`, `delete`, `updateRecentMessageData`. There is no anonymous path to *open* a saved record, let alone re-save one |
| A browser | this session's tooling | **Decisive on its own.** Half B's oracle is *"the ask appears"* — a UI event. No browser, empty `DISPLAY`, no automation tooling. This holds at **any** SHA and in **any** environment, so it is independent of Half B's timing dependency |

**But the inference's conclusion does not follow, and this is the correction.** Half B being outside
*this session* does not make it the **owner's**. The plan's own M8-G clause admits the form more
widely than "production" — verbatim:

> **Human-observable form (F-1's, production-reachable, no SQL)**: while a member exists — before the
> D19 repair, **or in any environment seeded with the shape** — open 5712 in the composer (V2 mode,
> the V2 error visible), add one container, press Save: the ask appears naming both drops, and
> nothing is written until one is taken; the same at Save As.

So Half B belongs to **any party holding a browser and a chain-tip environment carrying the shape** —
which may be a stage agent, and is the owner only because no session in this chain appears to hold
browser tooling. That is a fact about tooling, not a requirement of the plan, and it should not be
written into the register as though it were the latter.

**The planner also already wrote the fallback**, which this pass did not have to invent — verbatim:
*"Where the repair has already run and no seeded environment is available, the suite is the evidence
and UAT records the reason — the D19 repair preceded the deploy — not 'no member to observe'."* Note
its condition is conjunctive: it applies only where the repair **has** run **and** no seeded
environment is available. If the owner mints the seeds and does not repair, the fallback is not
available and the row is still owed.

### Two defects in BC-11 as written — routed to QA, whose row it is

1. **The Subject cell is wrong.** It reads `UAT agent`, with no fallback. UAT can execute **neither**
   half. Per this agent's own rule the owner is taken from the **primary** instrument and never the
   fallback — and BC-11's primary is *operator observation*, which needs a human with a browser. The
   cell needs re-assignment; **this document does not edit QA's register.**
2. **The earliest-decidable cell states Half A's precondition only.** It names the seed's existence
   and says nothing about Half B needing a chain-tip environment. Compare **BC-1**, whose cell reads
   *"chain tip deployed to any environment with a stored V2 message"* — the convention already exists
   in this register; BC-11 simply does not use it.

Neither defect changes what BC-11 requires. Both make it harder to schedule correctly, which is what
an earliest-decidable cell is for.

### The retention instruction, recorded for what it is

Steering told the owner **not to delete the two seed records** after minting them. Recorded here
because it bears on this condition's integrity and because its status matters: **it is steering's
instruction, not the owner's ruling.** D20 expressly left the seeds' disposition unruled and called
that "not a gap"; this instruction partially fills that space from a source that cannot rule on it.

It is sound insurance and this pass does not object to it. It is, however, **less load-bearing than
its framing suggests** — because the plan admits a seeded environment, a party that can stand up a
chain-tip environment could seed one by running `c85945f` there first. Retention makes Half B cheap;
it is not the only thing standing between the chain and an unobservable condition.

### Validation item 8 — the ordering line this pass can already give

Validation item 8 requires the deployment record **and** UAT's release decision each to state, in one
line, **which came first**: M8-G's production observation, or the owner's D19 repair. As of
2026-08-24 the record is: **neither has occurred.** The observation has not happened (Half A blocked,
Half B unreachable); no D19 repair declaration by the owner has been received by this pass. This line
is point-in-time and is re-derived at the real UAT pass, not carried from here.

## Finding U-1 — D20's seeds disarm the plan's own falsifier for assumption 7

**Raised by this pass, 2026-08-24 (rev 5). Not previously priced by anyone, as far as this pass can
see. Routed to steering as a plan-touching finding, not settled here.**

Records 5855 and 5856 now exist in production carrying the flag-over-content shape. They are, by
construction, permanent members of the category 012's classifier counts — `flagStructureDisagreement`
(`flagV2 && !structurallyV2`) — and steering has instructed the owner **not to delete them**, because
Half B runs against them.

The plan's detector for assumption 7 failing (Assumptions, item 7) reads, verbatim:

> **Where a silent failure is caught**: … the classifier he runs under D20 (`flagStructureDisagreement`,
> his instrument) reading **> 0** after he has declared the repair done, or a record opening in V2 with
> the composer's V2 error after that declaration (R8's falsifier), is the signature.

**Both limbs are now tripped by the seeds, by construction and permanently:**

1. The count limb. The plan records the pre-existing population as **"29 empty, 2 disagreeing"**. After
   the owner's D19 repair of 5712 and 5842, the count he expects is **0**; what he will actually read is
   **2** — UAT's own seeds. **A working repair will look like a failed one.**
2. The V2-error limb. A seed *opening in V2 with the composer's V2 error* is not a signature of failure
   here — **it is the precondition Half B needs** and the reason the seeds were minted.

**This is a false-positive trap that fires at exactly the wrong moment**: when the owner checks whether
his own repair worked. It is a direct and, on this pass's reading, unnoticed consequence of D20, which
was registered as changing *"no criterion, milestone or release condition"* — and strictly that is
still true, since it changes no criterion's text. What it changes is what one of them *measures*.

**Not this pass's to settle**, and no option is adopted here. The cheap remedy is documentary: R-5's
deployment record already exists to tell the owner the **source class** of what he is looking at, so
the residual can be named there — the falsifier read as *"> 0 excluding 5855 and 5856"*, or the
expected residual stated as **2**. That line is **devops's** to write and the falsifier's wording is
the **planner's**; whether the seeds are deleted after Half B is the **owner's**, and D20 expressly
left their disposition unruled. This pass records the interaction and routes it.

**Not established, and deliberately not assumed**: that the seeds carry `valid = false` and therefore
stay out of `flagStructureDisagreementValidTrue` (R7's first limb). The inference is available — the
plan records that category as reading **0** at 012's backfill run while 5712/5842 were its
`flagStructureDisagreement` members, so those shapes evaluate invalid, and the seeds share the shape —
but it rests on shape identity and this pass did not execute it. **If R7's falsifier is read after the
deploy, that inference should be executed first, not relied on.**

**Update, 2026-08-24 (rev 7) — the inference above was EXECUTED by QA and is CONFIRMED, with a
correction it did not carry.** The text above is preserved as written; it was correct to withhold it.
QA executed it at `c85945f` (`32737d3`): the seeds carry `valid = false` and **do stay out of
`flagStructureDisagreementValidTrue`, so R7's first limb is not tripped by them.** U-1's blast radius
is that much smaller.

**The correction, which matters more than the confirmation.** An unqualified *"the seeds are
`valid = false`"* **does not discriminate**: a username-less message is refused for an entirely
unrelated reason, and the seed JSON carried no username, so 5855/5856 are almost certainly `false` for
**two independent reasons**. Only with a username supplied is the V2/classic conflict the sole carrier
of the refusal. **Anything downstream keying on `valid = false` must key on the reason string, not the
boolean.** That trap sat inside the reasoning, not the conclusion — which is why the inference was
worth handing over as a stated gap rather than a comfortable result.

## Weighing of Production Evidence

None is offered and none is claimed. No operator attestation, no production run-time, and no
production read is relied on in this revision. Recorded so that the absence is deliberate and visible
rather than an omission: nothing here is supported by *"it has been running and nobody complained"*,
which in any case would be evidence only against loud failure modes and none at all against the
silent ones — and the classes 013 exists to fix (an empty copy, a prompt that never fires, a body
silently dropped) are **silent by signature**.

## UAT Status

> **Dated pointer, 2026-08-24 (rev 10).** The text below is rev 4–9's and is preserved as written; it was correct for those passes, which deliberately issued no verdict. **The gate has since run.** The current UAT status and the release decision are in **“Rev 10 — The UAT Gate, Executed”** at the end of this document, and the frontmatter `Status-Detail` carries the short form.

**Status**: **NOT A VERDICT — precondition pass only.** Neither `UAT Complete` nor `UAT Failed`.
**Rationale**: QA Phase 2 has not run and the chain is not finished (M4 open, M6 open). The gate was
not exercised; one pre-deploy precondition was attempted and is blocked.

## Release Decision

> **Dated pointer, 2026-08-24 (rev 10).** The text below is rev 4–9's and is preserved as written; it was correct for those passes, which deliberately issued no verdict. **The gate has since run.** The current UAT status and the release decision are in **“Rev 10 — The UAT Gate, Executed”** at the end of this document, and the frontmatter `Status-Detail` carries the short form.

**None issued.** No `APPROVED FOR RELEASE`, no conditional approval, no `NOT APPROVED`.

Recorded for the pass that does issue one: a release decision must name the SHA or content identity
its predecessor verdicts were reached at, reproducing that identity from the tree rather than
inheriting it, and must state that any change to production code expires those verdicts and the
decision with them. The anchors touched by *this* revision are `website` `master` = `c85945f`
(production; read via a detached worktree) and the chain branch tip `ad9f331` (read only, not
verified). **Neither is a verdict anchor.**

## Next Actions

> **Dated pointer, 2026-08-24 (rev 10).** The text below is rev 4–9's and is preserved as written; it was correct for those passes, which deliberately issued no verdict. **The gate has since run.** The current UAT status and the release decision are in **“Rev 10 — The UAT Gate, Executed”** at the end of this document, and the frontmatter `Status-Detail` carries the short form.

*Point-in-time list — later stage documents are authoritative on these items' current state.*

Two items are **parked for the owner** and are not escalations; both were reported to
steering-hooks-013-2 rather than raised while he sleeps.

1. **BC-11 Half A — CLOSED.** `EXECUTED` 2026-08-24 on the owner's attestation (5855, 5856). Nothing
   further is owed on it. **The two records must not be deleted** — Half B runs against them.
2. **D20's re-derivation — CLOSED on the substance.** Discharged by the owner's production mint rather
   than by UAT's instrument; delta and route-residual recorded above. **The classifier block needs no
   ruling from him and is withdrawn from his queue.**
3. **Finding U-1 — routed to steering, not settled.** The R-5 deployment-record line is devops's, the
   falsifier's wording is the planner's, the seeds' disposition is the owner's. **Whoever reads
   `flagStructureDisagreement` after the D19 repair needs to know 5855 and 5856 are in it deliberately.**
4. **BC-11 Half B — the ask.** Needs a party with a browser **and** a chain-tip environment carrying
   the shape; per the plan that environment need not be production. Not this session, and not
   automatically the owner. **Appendix A is the one-shot script, ready now.** Subject assignment is
   QA's to fix on the register.
5. Not owed yet, listed so the sequence is visible: predecessor-status verification, the value
   assessment, the walkthrough of BC-1 … BC-11, and the release decision — all at the real UAT pass,
   after Implementation, Code Review and QA Phase 2 are complete.

## Concurrence — F-QA14 (method, routed to the retrospective)

Recorded here because QA has recorded it in `qa/013-...-qa.md` (`30f419f`) as **concurred by both
stages**, and a concurrence asserted in one document and absent from the other is not one. **This pass
concurs**, in the terms it originated:

> An inference whose **conclusion is sound** is the dangerous case, not the safe one. Had the
> `valid = false` inference been handed over as a comfortable result rather than a stated gap, it would
> have been adopted **with the trap attached to a correct answer** — and nothing downstream would ever
> have contradicted it, because the answer was right. **A stated gap survives being right.**

QA adds the generalisation, which this pass also concurs with: every instrument defect found in this
cwd so far was caught by a **contradiction against a second instrument**, never by re-running the
first. This one was caught instead by the originator declining to let the first instrument stand
alone — **cheaper than either**, because it costs one sentence at handover rather than a second
instrument later.

## Conditions the Successor Inherits — written as conditions, not prose

> **Dated pointer, 2026-08-24 (rev 10).** **C-1, C-2, C-3 and C-4 are all discharged this pass**, each re-derived from the tree and the source documents rather than adopted. Their dispositions are recorded in **“Rev 10 — The UAT Gate, Executed” § C-1…C-4**. The text below is preserved as written.

**Added rev 9, on steering's hand-in of QA COMPLETE. This pass did NOT read the predecessor documents
and issues no verdict; the successor re-reads all of them directly. What follows is recorded as
conditions so they are inherited as such rather than rediscovered in someone's prose.**

**C-1 — The release tip WILL move once, and QA's green rests on an uncommitted tree.** Per steering
(not re-derived by this pass): three `website` **source** files are QA's re-anchor and coverage work
and are uncommitted — `012-json-editor-repair-path.test.ts` and `012-message-mode.test.ts` (modified),
`013-fqa19-ingress-gate-reachability.test.ts` (untracked); `website` HEAD stands at `164d720`; QA's
commit grant covers `agent-output` only, so it correctly did not commit them. **Consequences the
successor must carry as conditions**: (a) `164d720` is **not** the final release tip; (b) the
code-reviewer's δ re-verification **re-opens** when the tip moves; (c) the verdict identity is
therefore a **per-path content manifest** — base SHA, exclusion list, uncovered populations named —
not a bare SHA, per the document-lifecycle rule for uncommitted content; (d) **those three files are
not this stage's to commit or revert.**

**C-2 — BC-15 exists and is `PRE`, and its owner column is `uat`.** Re-derived from QA's register and
plan rev 20 directly, not from steering's restatement. **D28** (owner ruling, selection prompt
2026-08-24) closes the mounted-render check by **the owner's own browser observation folded into
BC-11b's sitting**; no DOM harness joins this chain. BC-15's condition: *the owner observes that
5712's Load button is genuinely **enabled**, and that pressing it unedited clears the flag while
keeping the content.* Prediction: **button enabled; content intact; bit cleared.** Falsity signature,
in QA's and the reviewer's shared words: *an operator opens 5712's JSON, presses Load, and the button
is still inert although the gate computes false.* **If the observation contradicts the gate, that is a
finding and it re-opens QA's verdict** — it is not for the observer or this stage to reconcile.

**C-3 — BC-11b is unchanged.** `NOT EXECUTED`, non-terminal, blocking an unconditional approval. Its
subject remains *any party with a browser and a chain-tip environment carrying the shape*; the M8-G
clause admits *"in any environment seeded with the shape"*, and the owner is merely the only party
with a browser. **That is a fact about tooling and must not harden into a plan requirement.**

**C-4 — Not this stage's to settle, and no remedy is to be adopted**: R-5's widening is the blocking
edge before devops writes the deployment record, and **U-1 folds into that same decision point and is
not raised separately**. The seeds' disposition stays unruled (D20).

## Run Record and Resumption

> **Dated pointer, 2026-08-24 (rev 10).** This table described rev 9's stopping state and is preserved as written. It is **no longer current**: the successor session ran, and the row that read *“Not started — the UAT gate itself”* is now executed. See **“Rev 10 — The UAT Gate, Executed”**.

**This session stopped near its run-length ceiling, with its work for the night complete rather than
truncated.** Nothing was left mid-flight. A successor UAT session resumes **from this document alone**
and needs no briefing:

| | |
|---|---|
| **Done and terminal** | BC-11a (the mint) — `EXECUTED` 2026-08-24 on the owner's attestation, quoted verbatim above. D20's re-derivation clause — RESOLVED on the substance |
| **Owed, non-terminal** | **BC-11b (the ask)** — blocks an unconditional approval. **Appendix A is its one-shot script, current.** Needs a browser and a chain-tip environment carrying the shape |
| **Raised, awaiting disposition** | **U-1** (with steering) — the seeds disarm both limbs of assumption 7's falsifier; narrowed at rev 7 (R7's limb confirmed clean); carries the `valid`-boolean trap |
| **Not started** | The UAT gate itself. Predecessor-status checks, value assessment, the BC-1…BC-10 walkthrough, and the release decision are **all** still owed, and gated on Implementation, Code Review and QA Phase 2 (itself gated on M4 + M6) |
| **Registers** | QA's (`qa/013-...-qa.md`) is chain 013's single register and the authority on row *definitions*; **this document is authoritative on row state**, and QA's maintenance log names rev 7 (`92e3dbf`) as the successor entry point for BC-11a/BC-11b |
| **Left in place deliberately** | Detached worktree `/tmp/uat013-c85945f` at `c85945f`, this session's, not foreign debris. The shared tree's branch was never switched |
| **Standing** | Seed records **5855 and 5856 must not be deleted** — BC-11b runs against them. That instruction is steering's, not an owner ruling; D20 left their disposition expressly unruled |

---

## Appendix A — Observation script for BC-11 Half B (NOT EXECUTED)

Prepared at rev 3 for whoever is designated the observer, so it can be run **once, without a re-run**,
at the release moment rather than composed at it. **Nothing here has been executed and nothing here
is evidence.** It is derived from the plan's M8-G criterion and QA's BC-11 row, both cited above; the
**exact wording** of the ask is confirmed against the implementation and code-review documents at the
real UAT pass, not assumed from this script.

**Preconditions**

- A chain-tip environment (production after deploy, *or* any environment seeded with the shape).
- A seed record present: 5712-shaped `{"content":"hi","flags":32768}` and, for step 5,
  5842-shaped `{"content":"hi","flags":32768,"components":[]}`.
- **Do not collapse the components section.** QA's precondition: `showComponentButton` requires
  `isEditing && isV2Mode && showComponentsEditable && canAddComponent`. An observer with the section
  collapsed sees no add-component control and would **wrongly report the ask as unreachable.**

**Steps, and what to record at each**

| # | Action | Record |
|---|---|---|
| 1 | Open the 5712-shaped record in the composer | Does it open in **V2 mode**? Is the **V2 error** visible? Is the body text `hi` still shown? **If it opens in Classic with no V2 error and no components section, STOP — see the ambiguity rule below. Do not conclude anything.** |
| 2 | Add **one container** | Did the add-component control appear at all? (If not, check the section is expanded before concluding anything) |
| 3 | Press **Save** | **The ask appears**, and it **names both drops**. Record the wording verbatim |
| 4 | Dismiss without choosing, then re-open the record | **Nothing was written** — the record is as it was. This is the negative half and is the easiest to skip |
| 5 | Repeat 1–4 at **Save As**, then repeat on the **5842-shaped** record | Same result at both |

**Recording rule.** The observed result is written **beside** the prediction, never over it. The
prediction is: *the ask appears; nothing is written before a choice.* If the observer is the owner,
his attestation **quoted with its timestamp** is complete evidence — no capture file is minted, none
is owed, and none is recorded as missing.

**Ambiguity rule (added at rev 6 on QA's Assumption Not Checked, `9946eb9` §4) — read before step 1.**
Everything QA established about these records stops at the values handed to the insert/update statement.
**The read path is unexamined.** If `getMessage`, or whatever `MessageProvider` runs on load, coerces or
defaults `flags` on the way *out*, then 5855/5856 are stored as row-D members and nonetheless **open as
something else**.

So if the record opens in **Classic mode with no V2 error and no components section**, that observation
is **ambiguous between a read-path defect and the ask not firing.** **Do not record it as either.**
Record exactly what was seen and hand it back — QA owns closing it at Phase 2, in M7-a's
mode-derivation coverage, by exercising the extracted `detectMode` over a fixture shaped the way
storage returns it rather than over a literal. The same applies to any **validation error appearing
instead of the ask**: record it; do not read it as the ask having failed.

**One false alarm ruled out in advance (rev 6).** F-QA11 — `NewMessageModal` opening with
`useState(guildId ?? '0')`, so Save is enabled while the dropdown still reads "Select a Guild" and `'0'`
is refused by `discordIdShape` — **does not apply to this script.** Step 5's Save As uses
`useState(message.guildId ?? '')` and sends `selectedGuildId || null`, reaching the boundary as `null`,
which QA executed and found accepted. **F-QA11 is a New Message defect, not a Save As one**; an observer
hitting a guild validation error at Save As has found something new, not F-QA11. **Strengthened at
rev 7**: QA closed this class by execution (`32737d3`) over the predicate *a site building
`message.upsert`'s `guildId` from a value picked this session* — 4 matching sites, of which **two guard
the `'0'` sentinel explicitly**, so F-QA11 is a **single-site oversight, not a design choice**, and the
Save As clear is mutant-checked rather than merely read. A guild error at Save As is therefore
**positively distinguishable**, not just "not F-QA11 as far as anyone read".

### The sitting now carries TWO observations (rev 9), and their ORDER matters

Under **D28** the same browser sitting owes **BC-15** as well as BC-11b: *5712's Load button is
genuinely enabled, and pressing it unedited clears the flag while keeping the content* (prediction:
**button enabled; content intact; bit cleared**).

**ORDERING HAZARD — read before starting, because a one-shot sitting can destroy its own subject.**
BC-15's Load applies row D to the **draft**: after it, the composer's draft is Classic, content kept,
bit cleared. That draft **is no longer a row-E candidate**, which is precisely what BC-11b needs.

**Therefore, on any given record: run BC-11b FIRST, then BC-15.**

- BC-11b is **non-destructive as scripted** — step 4 dismisses without choosing, so nothing is written.
- **After BC-15's Load, do NOT press Save.** Loading alone changes the draft, not the stored record;
  saving would **persist the cleared bit and consume the seed permanently**, and the seeds cannot be
  re-minted — the mint route closed at deploy.
- If BC-11b has to be repeated after a BC-15 Load, **re-open the record fresh**; do not continue from
  the post-Load draft.

**This ordering is this pass's reading, not an executed result.** It follows from row D's stated effect
and from BC-11b needing a flag-over-content draft. **If the observer's environment behaves otherwise,
record what was seen and hand it back** — under the ambiguity rule above, not as a conclusion.

**BC-15 steps** (after BC-11b is complete on that record): open the 5712-shaped record → open **Message
JSON** → confirm the **Load button is enabled**, not inert → press **Load** with **no edits** → record
whether the warning appears, the body text `hi` **survives**, and the record shows as **Classic**.
**Then stop — do not Save.**

**If it cannot be run**, the disposition is already written by the planner and is not improvised: where
the D19 repair has run **and** no seeded environment is available, the suite is the evidence and the
reason recorded is *"the D19 repair preceded the deploy"* — **not** "no member to observe". If either
limb of that condition is unmet, the row is still owed and `NOT EXECUTED` is not a terminal state.

---

# Rev 10 — The UAT Gate, Executed

**Date**: 2026-08-24 · **Session**: `uat-hooks-013-2` (successor to `uat-hooks-013`, which handed back
at rev 9 on run-length grounds without issuing a verdict) · **Return channel**: `steering-hooks-013-2`.

Everything above this line is preserved as written. Nothing was overwritten; where this pass corrects
or supersedes an earlier statement it says so, dated, in place.

**What this pass did**: read the four predecessor documents directly, re-derived the tree identity from
the tree, drove every blocking-release-condition row to a state, and issued the release decision. It did
**not** inspect production source to form the verdict (this stage is a document review), did **not**
re-run the suite, and adopted **no** remedy for a finding that is somebody else's to settle.

---

## 1. Predecessor Status Verification

The gate my definition sets is: Implementation *complete*, Code Review *approved*, QA *QA Complete*.
Each read directly at write time, 2026-08-24. **One of the three is unambiguously met.**

| Predecessor | Required | Found | Verdict |
|---|---|---|---|
| **QA** — `agent-output/qa/013-components-v2-editing-surfaces-qa.md` | `QA Complete` | **`QA Complete`**, `Verified-At: 821330d` plus a three-path content manifest; suite **550 tests / 37 files / exit 0** at that composite identity | **MET** |
| **Code Review** — `agent-output/code-review/013-components-v2-editing-surfaces-code-review.md` | approved | Binding verdict **round 19 `APPROVED`** at `53beb37`; **round 19-δ CLEARED** at `164d720`. But the document's `Status` field reads **`In Review`**, and **no code-review verdict covers the release tip `821330d`** | **NOT MET as written** → condition **U-C1** |
| **Implementation** — `agent-output/implementation/013-components-v2-editing-surfaces-implementation.md` | complete | `Status: Active`. Six of seven milestones checked (M1, M2, M3, M4, M7, M8, all reviewed); **M6 unchecked**. The document does **not record `821330d` or F-QA21 anywhere** — `grep -c "F-QA21"` returns **0** | **NOT MET as written** → conditions **U-C2**, **U-C3** |

**Neither shortfall is a failure verdict, and this pass does not dress them as one.** No predecessor
returned FAILED; QA's Phase 2 `QA FAILED` at `4e9da96` was closed by the F-QA15 fix and superseded by
the refresh pass. What is missing is *coverage of the release tip* and *record closure* — both real,
both named below with an owner, neither a defect in the delivered behaviour.

**On the code-review gap specifically, and why this pass does not close it itself.** The reviewer's own
standing condition is that *any commit after `53beb37` re-opens re-verification*. `821330d` is such a
commit. This pass re-derived, from the tree, that the delta is confined to one test file and that both
reviewed source blobs are byte-identical across `53beb37`, `164d720` and `821330d` (`JsonModalBody.tsx`
`cfbec5b`, `discordResponseToMessage.ts` `81f4562`). **That is evidence for the reviewer's ruling; it is
not the ruling.** Whether a byte-identical source tree carries the verdict forward is the code-reviewer's
call under its own delta-round rule, and UAT taking it would be transferring a verdict, which is the
prohibited act.

---

## 2. Verdict Identity, Re-Derived From The Tree

Constructed this pass, not inherited — the full manifest is in the frontmatter `Verified-At`. In short:

- `website` HEAD = **`821330d`**, branch `chain/013-components-v2-editing-surfaces`; `c85945f` is an
  ancestor, so integration is a fast-forward.
- Three uncommitted **test** paths in scope, hashed as file bytes; **all three digests reproduce QA's
  manifest exactly**. Exclusion list **empty** — nothing foreign is in `website`'s working tree.
- **`master` is still `c85945f`, locally and on `origin`.** *The deploy has not run.* This is a
  pre-deploy UAT in the sanctioned order, not a recovery pass.

**Expiry, stated as this stage must state it**: any change to a **production-code** blob expires the
predecessor verdicts and this decision with them. Committing QA's three test paths moves the SHA but
**not** the production-code identity, and this decision survives that specific move — established by
`git diff --numstat` confining every delta from `53beb37` to `821330d` to one file under
`src/utils/__tests__/`, and by the two reviewed blob hashes above. It does **not** survive anything else.

---

## 3. C-1 … C-4 — the conditions rev 9 handed forward

Each re-derived from the tree or the source document, never adopted from a restatement.

- **C-1 — the tip will move; QA's green rests on an uncommitted tree. DISCHARGED, and it had already
  moved.** Rev 9 recorded HEAD at `164d720`; **the tree now stands at `821330d`** (the implementer's
  F-QA21 fix, committed after rev 9 was written). The three-path manifest reproduces digest-for-digest.
  QA's own re-anchor note records the move and re-ran at the new identity. C-1's consequence (a) is
  therefore *already realised once*; consequences (b), (c), (d) all stand and are carried as **U-C1**,
  the frontmatter identity, and **U-C4** respectively. **The three files remain not this stage's to
  commit or revert, and were not touched.**
- **C-2 — BC-15 exists, is `PRE`, D28 closes the mounted-render check by the owner's observation.
  DISCHARGED.** Re-derived from QA's register §10 and plan rev 20's D28 row directly. BC-15's owner
  column reads `uat (to record the owner's attestation)`; its subject is *the owner, in the BC-11b
  sitting*; its prediction is **button enabled; content intact; bit cleared**. **Confirmed: no DOM
  harness was added** — D28's ruling is honoured on both sides. Carried into the ledger below.
- **C-3 — BC-11b unchanged. CONFIRMED.** `NOT EXECUTED`, non-terminal, blocking an unconditional
  approval. Its subject remains *any party with a browser and a chain-tip environment carrying the
  shape*; M8-G's clause admits *"in any environment seeded with the shape"*. **This pass restates, as
  rev 9 did, that the owner's involvement is a fact about available tooling and not a plan
  requirement**, and does not write it into the ledger as one.
- **C-4 — R-5's widening and U-1 are not this stage's; adopt no remedy. HONOURED.** R-5's widening is
  recorded as **U-C5** and routed, not decided. **U-1 is folded into that same decision point and is
  not raised separately**, exactly as instructed. The seeds' disposition stays unruled (D20). No remedy
  is proposed for any of the three.

---

## 4. Value Delivery Assessment

**The Value Statement, clause by clause, against what the documents establish.** The plan's own
Objective is the yardstick: projection confinement, round-trip closure, and *the flag is the mode*.

| Value-statement clause | Delivering milestone | Documentary evidence | Delivered? |
|---|---|---|---|
| *"Save As" carries components and the V2 flag* | M1 (transport form at every write boundary), M8-G (persist gate) | Impl: M1-a…d delivered, round-2 `APPROVED_WITH_COMMENTS`; M8-G all three real persisting writers gate via `gateBeforePersist`, round 14 `APPROVED_WITH_COMMENTS` | **Yes, at the data layer** |
| *the Message JSON view carries them* | M2, M7 | M2-a/b/c delivered, round 13 `APPROVED`; JSON view shows stored `flags` | **Yes, at the data layer** |
| *copy and Load carry them* | M2-a, M2-c, M4-c, F-QA15 fix | The Load gate now floors the **resolved** draft, so row D loads: reviewer's closure/no-hole/no-crash attack at round 19, QA's fix-verify probe green (25 assertions, F1/F2 killed) | **Yes, at the data layer** |
| *import from a message URL, a webhook URL, or the bot's "Get Message"* | M3-a/b/c | `discordResponseToMessage` carries `components` and copies Discord's `flags` bit exactly, never derived from structure; unsupported types dropped **and named**; round 15 `APPROVED_WITH_COMMENTS` | **Yes, at the data layer** |
| *cross-tab change detection* | M1-d | `normalizeForHash` runs the live draft through the server's own zod normalisation before hashing; round-2 re-derivation widened the false-prompt class to 8/4 cases and confirmed the fix closes the wider class | **Yes, at the data layer** |
| *no editing action silently discards what I built* | M8 (D17's five rows), M8-E's choice UI | `enforceImportMutualExclusivity`'s silent strip retired at **both** JSON surfaces; row E asks and writes **nothing** before a choice; `applyDisposition` is the sole application path, grep-confirmed by the implementer and re-derived by the reviewer | **Yes, at the data layer** |
| *never misreports what kind of message it is* | M7 (D15/D16) | `isMessageV2` is the single predicate; `switchToV2` sets the bit; the composer shows V2 for every such record | **Yes, at the data layer** |
| *I never land on an empty copy of a message that was whole a moment ago* | M1 + M8-G together | The class the research named (flows 6, 11, 12, 13 producing empty records with `valid=false` and no error shown) is closed at the transport form and gated at every persisting writer | **Yes, at the data layer** |

**And the sentence this assessment turns on:**

> **Every clause above is delivered *in mechanism* and *unobserved in effect*.** Not one of the plan's
> twelve `PRE` operator-observable conditions has been executed. The evidence is module-level: pure
> functions, source text, a green suite, and adversarial probes. **What no document in this chain
> records is a human seeing any of it happen in a browser.**

That is not pedantry here, and the reason is structural rather than procedural. **013 exists to fix
failure modes whose signature is *absence*** — an empty copy, a body silently dropped, a prompt that
never fires, a button that is inert. A suite proves the gate *computes* the right answer. It cannot
prove React *applied* it — which is precisely what D28 registers, in QA's and the code-reviewer's
independently-reached shared words: *an operator opens 5712's JSON, presses Load, and the button is
still inert although the gate computes false.* **A silent failure mode is invisible to every instrument
this chain has run.** BC-15 and BC-11b are not tidy-up; they are the only instrument pointed at the
class the chain was commissioned to close.

**Verdict on value**: the objective is **achieved in the delivered code as documented**, and **not yet
demonstrated at the surface the user touches**. Core value is not deferred — it is built and unwatched.

---

## 5. Objective Alignment and Drift

**Does the code meet the original plan objective?** — **YES, with the surface layer unobserved.**

**Drift detected: none of substance.** Specifically checked and found clean:

- **Scope**: 18 files in the plan's inventory; 16 carry a real diff, 2 investigated and confirmed to
  need no change, both disclosed at the milestone that determined it. Two out-of-inventory deltas —
  `package.json` (D21, pre-explained) and `SaveChoiceModal.tsx` (new production file, M8-G) — are
  **explained, not absorbed**, by the implementer's own M6 reconciliation, derived from
  `git diff --numstat` against the merge-base rather than from any total stated aloud.
- **No feature growth**: D28 was taken specifically to *avoid* adding a DOM harness mid-chain, and the
  tree confirms it was not added.
- **Findings routed rather than silently absorbed**: B3-lossless to `agent-output/TODO.md` (a chain-012
  consequence), F-QA22 (`enforceImportMutualExclusivity` now has zero production callers) held as a
  planner item, F-QA11 bounded by execution to a single pre-existing site outside 013.

**One residual worth the owner's eye, recorded and not acted on**: 013 falsifies a plan-012 conclusion —
the B3 class now **has** a lossless path where 012 recorded that it had none, so 012's R19 repair
guidance is superseded. QA flagged it; it is lodged in `TODO.md`. **It changes what someone should be
told, not what 013 ships.** Communicating it is the owner's, not any agent's.

---

## 6. Finding U-2 — the register carries duplicate IDs, and one collision hides the chain's own reason for existing

**Raised by this pass. Not previously recorded by any stage. Routed to QA, whose register it is.**

Chain 013 has exactly **one** blocking-condition register, in QA's document, and this pass found no
second travelling list and mints none. But that single register now carries **two distinct rows numbered
`BC-13` and two distinct rows numbered `BC-14`**, because QA's Phase 2 append states *"continuing at
BC-13"* when the Phase 1 register already ran to `BC-14`:

| Number | The two rows it now names | Class | Owner | Terminal state |
|---|---|---|---|---|
| **BC-13** | *(Phase 1)* **bot-code TTL residue** — codes stored before go-live carry no dropped set, so the notice cannot render for them | POST | **devops** | outstanding, see ledger |
| | *(Phase 2)* **F-QA15's Load gate** — 5712's Load button is enabled and the repair completes | PRE | implementer | **DISCHARGED 2026-08-24** |
| **BC-14** | *(Phase 1)* **the user-reported defect is fixed in production** (handoff `8f3fa8c3`, observations 1/2/5/6/7) | POST | **uat** | outstanding, see ledger |
| | *(Phase 2)* **can Discord's API *return* a message carrying both classic content and V2 components** | POST | **uat** | outstanding, see ledger |

**Why this is a finding and not a tidiness note.** A reference by number alone silently resolves to one
of two rows, and a numbering slip can invert a blocking status invisibly to every check that reads the
sentence instead of the target. The concrete exposure here: **the Phase-1 `BC-14` is the row that
distinguishes *fixed* from *unfixed* in production for the user-reported defect this entire chain was
commissioned to fix.** It is the row most likely to be dropped by a reader who follows the number to the
Phase-2 append and stops. This pass caught it only by checking every numbered reference against the
register rather than following it.

**Disposition**: routed to QA for renumbering; **no row is withdrawn, no requirement changes, and this
document does not edit QA's register.** Every row in the ledger below is carried by **name as well as
number**, so a later renumbering cannot invert anything here.

## 7. Finding U-3 — two record-hygiene defects, neither blocking

1. **QA's `Verified-At` frontmatter is truncated by YAML.** It reads
   `Verified-At: 821330d  # re-anchored 2026-08-24; supersedes 164d720 (see Re-anchor note)`. The
   `#` comment is dropped by any YAML reader, so the pointer to the Re-anchor note — which is what makes
   the value auditable — is invisible to every machine reader. Caught by
   `node tools/check-repo.js`, which names this failure explicitly. **The value itself (`821330d`) is
   correct and this pass verified it against the tree**; only the pointer is lost. Routed to QA.
   *(Document-lifecycle: free-prose frontmatter values are always quoted.)*
2. **`node tools/check-repo.js` reports FAIL, 14 problems.** Run from `agent-output/` this pass.
   **None is in `uat/`.** One is U-3.1 above; four are stale links in 012 documents and probe READMEs;
   six are duplicate basenames across `verification/013/` probe directories (a convention, not a
   defect); three are stage-suffix conventions for `deployment/` and a 012 carry-forward file.
   **Recorded because the skill requires it and because a FAIL that is always FAIL stops being read.**
   Not blocking; not this stage's to fix.

---

## 8. Weighing of Production Evidence

**None is offered, none is claimed, and none is available.** `master` stands at `c85945f`; 013 has not
deployed. There is no *"it has been running a week with no errors"* to weigh here, and this pass
records the absence deliberately rather than leaving it to be inferred.

Recorded so it cannot be reached for later: **were such an attestation offered after deploy, it would be
evidence against 013's loud failure modes only** — a crash, a 4xx on send, a broken render every user
sees. **It would be no evidence at all against the silent ones**, and 013's entire subject matter is
silent: an empty copy, a body dropped without a word, a prompt that never fires, a button that stays
inert. Those signatures *are* absence, so an argument from absence would be circular. **BC-1…BC-11b,
BC-14 and BC-15 are what covers the silent class. Nothing else does.**

---

## 9. The Blocking Release Condition Ledger

> **Dated line, 2026-08-25 (rev 13) — this ledger's STATE has moved on; its row definitions have not.**
> **R13.7 below is authoritative on every row's current state.** Since this table was written, 013 was
> released (`origin/master` = `a151fb4`), so the twelve `PRE` rows went out unexecuted and now gate the
> **chain's closure** rather than a release act that is past; **U-C1 and U-C4 have reached `EXECUTED`**;
> and QA has appended **BC-18, BC-19, BC-20** to this same single register. **No row was withdrawn and no
> definition changed here.**

**This is the chain's one register, restated by state.** QA's document
(`agent-output/qa/013-components-v2-editing-surfaces-qa.md`, re-read at write time 2026-08-24) is the
authority on row **definitions**; **this document is authoritative on row state**, per the register's own
standing note. Rows are named as well as numbered (finding U-2). **No row is withdrawn — `WITHDRAWN` is
the owner's ruling alone, and this pass rules none.**

`PRE` = must be terminal **before the release act**. `POST` = post-deploy-observable; gates the **chain's
closure**, never the release act.

> **Reconcile note, 2026-08-24 (rev 11) — QA renumbered, and this ledger is updated in place with the
> superseded numbers retained inline.** Finding U-2 has been actioned by QA, whose register it is.
> **Phase 1 keeps its numbers; Phase 2's two rows move to the register's true high-water mark.**
> Mapping, re-derived from QA's own table at write time rather than from the relay that reported it:
>
> | Was | Now | Stable name | Class | Owner |
> |---|---|---|---|---|
> | BC-13 *(P1)* | **BC-13** — unchanged | `bot-code-ttl-residue` | POST | devops |
> | BC-14 *(P1)* | **BC-14** — unchanged | `user-defect-fixed-in-prod` | POST | uat |
> | BC-13 *(P2)* | **BC-16** | `p2-rowd-load-gate` | PRE | discharged |
> | BC-14 *(P2)* | **BC-17** | `discord-returns-row-e` | POST | uat |
>
> **All four of this ledger's affected rows resolved unambiguously**, because each was carried by name
> as well as number — which is the property that made the collision recoverable rather than silent.
> QA has adopted the same property register-wide. **No requirement changed and no row was withdrawn**;
> only the labels moved. The tables below now carry the new number with the old one retained in the
> cell, so a reader arriving from any of the four documents that cite the old numbers lands correctly.

### 9.1 `PRE` rows — terminal before the release act

| Row (number · name) | Owner (from the **primary** instrument) | Prediction | State |
|---|---|---|---|
| **BC-1 · Load confirmation names what changes** | operator with a browser at a chain tip | the confirmation names both differences before anything is committed | **NOT EXECUTED** |
| **BC-2 · URL/webhook import names uncarried types** | operator | dialog shows supported components **and** a notice naming the select | **NOT EXECUTED** |
| **BC-3 · bot `Get Message` path shows the same notice** | operator | editor opens with supported components and the same notice | **NOT EXECUTED** |
| **BC-4 · import failing the floor keeps the dialog open, does not navigate** | operator, **paired with** the suite's no-upsert assertion (EC-3) | dialog stays, error shown, no new message created | **NOT EXECUTED** (suite limb met) |
| **BC-5 · folder-page export paste shows the floor error, not green** | operator | *"Message must have content, embeds, or components."* | **NOT EXECUTED** |
| **BC-6 · the lenient filter names the dropped types** | operator | the notice names the type | **NOT EXECUTED** |
| **BC-7 · paste a container → V2, bit set, visible warning** | operator | editor in V2 with the container **and** a warning | **NOT EXECUTED** |
| **BC-8 · paste the 5712 shape → Classic, content intact, bit cleared, warning, no V2 error** | operator | Classic, `hi` present, warning shown | **NOT EXECUTED** |
| **BC-9 · paste content+container → two options, nothing created before a choice** | operator, paired with the suite | two options; nothing created before a choice; **both** outcomes verified by repeating with the other option | **NOT EXECUTED** |
| **BC-10 · M8-F parity across modal Load and New Message paste** | **qa (suite is primary)**; operator for a two-cell spot check | identical dispositions, cell by cell | **SUITE LIMB MET** — 550/37/exit 0 at the verdict identity; **spot-observation limb NOT EXECUTED** |
| **BC-11 · (pointer)** | — | — | **SUPERSEDED by BC-11a + BC-11b.** No requirement withdrawn |
| **BC-11a · the mint** | uat (records the attestation) | both records appear; a single successful save refutes *"the route is closed"* by construction | **`EXECUTED` 2026-08-24 — TERMINAL.** The owner minted 5855 and 5856 and attested it verbatim (quoted above, rev 4). Confirmed unchanged this pass |
| **BC-11b · the ask fires on save over a seed** | operator with a browser at a chain tip carrying the shape (**not automatically the owner** — C-3) | the ask appears naming both drops; **nothing written** before a choice | **NOT EXECUTED** — non-terminal, **blocks an unconditional approval** |
| **BC-16 · `p2-rowd-load-gate`** *(was BC-13, Phase 2)* · F-QA15's Load gate | **implementer** — its primary needs no human | probe green; 5712 loads and saves with content intact and the bit cleared | **`EXECUTED` / DISCHARGED 2026-08-24** at `164d720`; probe green, 25 assertions, mutants F1/F2 killed. **Its mounted-render half moved to BC-15** |
| **BC-15 · D28's mounted render** | uat (records the owner's attestation), observed by the owner in the BC-11b sitting | **button enabled; content intact; bit cleared** | **NOT EXECUTED** — non-terminal, **blocks an unconditional approval** |

**Twelve `PRE` rows stand outstanding**: eleven `NOT EXECUTED` outright (BC-1…BC-9, BC-11b, BC-15) and
**BC-10** met on its suite limb with its spot observation owed. **Two are terminal** (BC-11a, BC-16).

**The plan's Validation item 3 requires every human-observable form to be executed and recorded
*before UAT's verdict*. It is not met, and this pass does not pretend otherwise** — that shortfall is
the entire reason the approval below is conditional rather than unconditional.

### 9.2 `POST` rows — gate the chain's closure, never the release act

Per this stage's rule, each is acted on **at its earliest-decidable condition** — watched for
decidability, not left until somebody happens to look.

| Row (number · name) | Owner | Earliest decidable | Prediction | State |
|---|---|---|---|---|
| **BC-12 · a V2 message that sent at `c85945f` still sends after deploy** | implementer owns the decision (M8-G send path); **uat owns the observation** | the deploy is live | **the send succeeds. A single 4xx refutes by construction** — not a rate to accumulate; one failure is a hotfix trigger | **NOT EXECUTED** — conditionally approved, gates chain closure |
| **BC-13 · `bot-code-ttl-residue`** *(Phase 1, number unchanged)* · bot-code TTL residue | **devops** (records the window in the deployment record) | **one hour after the deploy SHA is live** | the residue is empty | **NOT EXECUTED** — devops resolved the instrument as the owner's attestation timestamp, a conservative upper bound (readiness F-1) |
| **BC-14 · `user-defect-fixed-in-prod`** *(Phase 1, number unchanged)* · the user-reported defect is fixed in production | **uat** | the deploy is live | all four observations confirmed | **NOT EXECUTED** — *the row a by-number reference drops; see U-2* |
| **BC-17 · `discord-returns-row-e`** *(was BC-14, Phase 2)* · can Discord's API *return* a message carrying both classic content and V2 components | **uat** | chain tip deployed **and** an import attempted against a message known to predate V2 enforcement | if such a message exists, the row-E choice appears rather than silent loss | **NOT EXECUTED** |

**Single-observation sufficiency, read off the rows themselves**: BC-12's prediction states that one 4xx
refutes by construction, and BC-11a's states that one successful save refutes by construction. Those
rows close on **one discriminating instance** and must not be left accumulating a rate.

### 9.3 Conditions this stage adds — documentary, not behavioural

> **Reconcile note, 2026-08-24 (rev 11) — U-C2 was defective as written, and this pass corrects its own
> condition rather than holding the implementer to it.** U-C2 asked the implementer to *record
> `821330d`/F-QA21* **and** to *bring the document's `Status` to a completed state*. **The second half
> was not the implementer's to do.** The document-lifecycle skill's own Agent Responsibilities table
> reads `Implementer | Inherit | **DevOps closes after commit**`, and the terminal statuses
> (`Committed`, `Released`) are devops's to set. The implementer declined that half, gave exactly this
> reason, and recorded it in its document instead of leaving a silent gap. **Its reading is correct and
> this pass adopts it.**
>
> **A condition nobody is permitted to discharge is worse than an open one**, because it reads as
> satisfiable right up to the release act and then cannot be closed by anyone. That was my drafting
> error, not a defect in the implementer's work, and the correction is recorded here rather than
> quietly rewritten: **U-C2 narrows to the recording half** (now terminal), and **the Status half moves
> to U-C6, owned by devops** — where the lifecycle already put it. Being a post-commit closure step,
> **U-C6 is not a `PRE` condition and does not gate the release act**; it gates the chain's closure.
> The superseded wording of U-C2 stands in the changelog and in the rev-10 block above.
>
> Both discharges below were **verified against the implementation document directly**, not accepted
> from the relay that reported them: `grep -c` gives **6** mentions of `F-QA21` and **5** of `821330d`
> where rev 10 measured **0** of each, and M6's checkbox now reads `[x]` with its acceptance
> re-derived from the plan's own text.

| ID · name | Owner | What is owed | State |
|---|---|---|---|
| **U-C1 · code-review coverage of the release tip** | **code-reviewer** | A δ re-verification covering `821330d` — and, once QA's three test paths land, the tip they produce. Steering is holding one ping so a single pass covers both moves; this pass endorses that sequencing but does not schedule it | **NOT EXECUTED** |
| **U-C2 · the implementation document records the release tip** *(narrowed — see the reconcile note above)* | **implementer** | ~~and the doc's `Status` must reach a completed state~~ → **moved to U-C6**. Remaining: `821330d` and F-QA21 recorded in the document that owns delivery | **`EXECUTED` 2026-08-24 — TERMINAL** (`7f3111f`). Verified from the document: `F-QA21` × 6, `821330d` × 5, against 0 and 0 at rev 10 |
| **U-C3 · M6 record closure** | **implementer** (files-touched reconciliation), **steering** (the two handoff re-status lines), **the architect** (the architecture correction) | M6's three acceptance clauses, re-derived from the plan's *Acceptance* line | **`EXECUTED` 2026-08-24 — TERMINAL** (`7f3111f`). Verified from the document: M6's checkbox reads `[x]`, its acceptance re-derived from the plan and each clause confirmed against `agent-output`'s git history. **All seven milestones now checked** |
| **U-C4 · commit approval for QA's three test paths** | **the owner** (approval); **devops** (integration) | QA's grant covers `agent-output` only and it correctly declined the implementer's offer to commit on its behalf. Until they land, the suite-green half of QA's verdict rests on a working tree | **NOT EXECUTED** |
| **U-C5 · R-5's widening** | **the owner** | The deployment record is known incomplete as the plan states it. Devops names this **the blocking edge** before the record can be written. **U-1 folds into this same decision point and is not raised separately.** No remedy is adopted or proposed here | **NOT EXECUTED — owner's decision, routed not decided** |
| **U-C6 · terminal `Status` on the implementation document** *(split out of U-C2)* | **devops** | Set the terminal status (`Committed` / `Released`) on the implementation document at its closure step, per the document-lifecycle Agent Responsibilities table. **Not a `PRE` condition** — it is a post-commit act and gates the chain's closure, not the release act | **NOT EXECUTED** — terminalises at devops's own stage |

**On U-1, once, so it is not mistaken for silence**: records 5855 and 5856 are permanent members of
`flagStructureDisagreement`, so a working D19 repair will read as a failed one unless the residual is
named. **The wording is the planner's, the deployment-record line is devops's, the seeds' disposition is
the owner's (D20 left it expressly unruled). This pass adopts none of them.** It folds into U-C5.

---

## 10. Validation and Release Conditions — plan compliance

| # | Condition | State |
|---|---|---|
| 1 | typecheck, full suite, build green on the chain tip (reviewer and QA re-run, never inherit) | **MET** on QA's and the reviewer's own instruments: 550/37/exit 0 at the verdict identity; `tsc` 0; `next build` 0. **Not re-run by this stage, which does not re-execute tests** |
| 2 | M1-a's reference list captured and reconciled by `grep -rc` | **MET** — captured in the implementation doc, counts computed inside grep |
| 3 | **Every human-observable form executed and recorded before UAT's verdict** | **NOT MET** — twelve `PRE` rows outstanding. This is the condition the conditional approval is built around |
| 4 | R-4: no live `valid` declaration, nothing triggered in the statbot workspace; the deployment record says so in one line | **OWED at the deployment record** — devops's line, not written |
| 5 | R-5: the deployment record states, per flow, that the surface no longer writes floor-failing records, plus the D12 import line | **OWED — U-C5, the owner's decision. The blocking edge before devops writes the record** |
| 6 | Post-deploy observables, owner-observed | **OWED** — carried as BC-12, BC-14 (Phase 1), BC-14 (Phase 2) |
| 7 | Rollback: the serving ref moves back to `c85945f`; no schema, no data migration, nothing in `project-utils` | **UNDERSTOOD, with a devops caveat this pass carries rather than resolves**: the readiness assessment records that the rollback *as the plan states it* is a force-push, **which is nobody's to run on their own initiative**. Devops's finding, devops's to resolve before the release act |
| 8 | The deployment record **and UAT's release decision** each state, in one line, which came first: M8-G's production observation, or the owner's D19 repair | **STATED BELOW — §11** |

---

## 11. Validation item 8 — the ordering line, re-derived at this pass

Required in one line, and re-derived at write time rather than carried from rev 9:

> **As of 2026-08-24, neither has occurred.** M8-G's production observation has not happened — BC-11b is
> `NOT EXECUTED` and the deploy has not run (`master` = `c85945f`). No declaration by the owner that the
> D19 repair of 5712/5842 has run appears in the plan, the QA document, the deployment readiness
> assessment, or `agent-output/OWNER-QUEUE.md`, each read at write time.

**Consequence, stated because it is a one-way door and it closes on its own**: M8-G's production-reachable
observation exists **only while a member of the population is unrepaired**. Seeds 5855 and 5856 are that
population now, and **they cannot be re-minted — the mint route closes at deploy**. If the D19 repair runs
before BC-11b and BC-15 are observed, and no seeded environment is stood up, the planner's own fallback
applies verbatim — *the suite is the evidence, and the reason recorded is "the D19 repair preceded the
deploy", not "no member to observe"*. That fallback is **conjunctive** and is not available today: the
repair has **not** run. **Until it does, the row is owed and `NOT EXECUTED` remains non-terminal.**

**The ordering hazard rev 9 established stands and is carried, not re-derived live at the sitting**:
on any given record, **BC-11b runs FIRST, then BC-15**; **after BC-15's Load, do NOT press Save** — Load
changes the draft, not the stored record, and a Save would persist the cleared bit and **consume the seed
permanently**. Appendix A is the one-shot script, current, and is marked as this chain's reading rather
than an executed result.

---

## 12. UAT Status

**Status**: **UAT Complete**

**Rationale**: the gate ran. The Value Statement is delivered in mechanism across every clause, with the
delivering milestone and the reviewing round named for each; drift is nil; no predecessor returned a
failure verdict; and the residue is fully enumerated with an owner and a terminal state per row. **UAT
Complete is a statement about this stage's work being finished, not a claim that the surface layer has
been observed** — it has not, and §4 and §9 say so at length.

## 13. Release Decision

> **Reconcile note, 2026-08-25 (rev 13) — the decision below is EXPIRED, by its own terms, and the text
> is preserved rather than overwritten.** It stated that *any change to a production-code blob expires the
> predecessor verdicts and this decision with them*. Four production files changed at `abcf585`. It was
> also **overtaken before it expired**: 013 was released at `a151fb4` on 2026-08-25 00:56:37 with its
> twelve `PRE` conditions unexecuted, so the approval was never discharged. **What it said was defensible
> when written** — and the tree that shipped did carry its production-code identity exactly (R13.1).
> **The current decision is R13.10, anchored at `4a7126b`.**

**Final Status**: **APPROVED FOR RELEASE, conditional on the human click-through of BC-1 … BC-10,
BC-11b and BC-15. If any of these fail, return to the implementer before release.**

Additionally conditional on **U-C1 … U-C5** reaching a terminal state before the release act.

**This is a ledger, not an exception.** Every outstanding condition above names an owner and one of
three terminal states — `EXECUTED` (with result and date), `WITHDRAWN` (the owner's ruling alone), or
`SUPERSEDED` (with what replaced it). **`NOT EXECUTED` is not a terminal state**: it blocks an
unconditional approval, and **no release is recorded complete while any `PRE` condition stands at it**.
*"Satisfied incidentally"* is not a terminal state either — record it as `EXECUTED` with the evidence, or
it was never a gate. **This pass withdraws nothing; any request to withdraw a condition goes to the
owner through steering.**

**The identity this decision is anchored at**: `website` `821330d` plus the three-path test manifest in
the frontmatter, re-derived from the tree by this pass and not inherited from any predecessor.
**Any change to a production-code blob expires the predecessor verdicts and this decision with them.**
Committing QA's three test paths is the one move this decision survives, on the derivation in §2.

**Why conditional and not `NOT APPROVED`**: nothing in the delivered behaviour is known to be wrong.
Every gate that has run has passed, the one blocking QA defect was found, fixed, and independently
fix-verified, and the outstanding work is a browser sitting plus four documentary closures. **Why not
unconditional**: the plan's Validation item 3 places the walkthrough *before* this verdict, twelve `PRE`
rows are outstanding, two predecessor documents do not cover the release tip, and the failure class 013
exists to close is silent — invisible to every instrument that has run so far.

**Recommended version**: **none, and none is to be synthesised.** `website/package.json` carries no
`version` field and the repo has no CHANGELOG (plan, *Release Artifacts*); the release **is the serving
ref moving from `c85945f`**, which devops names in the deployment record. Recommending a semver bump here
would mint an artifact the plan expressly declines.

**Key changes for the release record** (devops's to place; content, not wording):

- Components V2 components and the V2 flag now survive every editing surface: Save As, the Message JSON
  view, copy/Load, URL / webhook / bot-code import, and cross-tab change detection.
- The silent content strip at both JSON surfaces is retired; content loss is now disposed of by five
  explicit rows, and the ambiguous case **asks** and writes nothing until the user chooses.
- A record whose V2 flag is set without V2 components now opens in V2 mode and can be repaired with one
  unedited Load — *open JSON, Load, Save*, zero edits.
- Discord ingress carries the V2 flag exactly as Discord sent it and names any component types it could
  not carry.
- Cross-tab *"Message Update Detected"* no longer fires on a no-op save.
- **Consumers of chain 012's guidance**: the B3 class now has a lossless path where 012 recorded it had
  none; 012's R19 repair guidance is superseded.

---

## 14. Next Actions

> **Dated line, 2026-08-25 (rev 13).** **R13.11 supersedes this list.** Discharged since it was written,
> each verified by re-derivation in R13.7.5: **item 2 (U-C1) — `EXECUTED`**, the code-review gate is met at
> `a151fb4` and round 22 binds `4a7126b`; **item 5 (U-C4) — `EXECUTED`**, QA's three test paths landed and
> are part of `a151fb4`; **items 3 and 4 (U-C2, U-C3) — `EXECUTED`** at rev 11. **Item 1's sitting did not
> happen before the release** and its rows are now non-terminal against the chain's closure.

*Point-in-time list — later stage documents are authoritative on these items' current state.*

1. **The browser sitting — BC-1 … BC-10, BC-11b, BC-15.** One sitting, at a chain-tip environment (per
   M8-G, production is not required — any environment seeded with the shape qualifies). **Appendix A is
   the one-shot script and is current.** Order: **BC-11b before BC-15 on any record; no Save after
   BC-15's Load.** The observed result is recorded **beside** the prediction, never over it. **If the
   observation contradicts the gate, that is a finding and QA wants it back — not a stale fixture to
   explain away.**
2. **U-C1 — code-reviewer**: one δ re-verification covering `821330d` and the tip QA's three files
   produce.
3. **U-C2 — implementer**: record `821330d`/F-QA21 in the implementation document and bring its `Status`
   to a completed state.
4. **U-C3 — steering and the architect**: M6's two remaining shares.
5. **U-C4 — the owner**: commit approval for QA's three test paths.
6. **U-C5 — the owner**: R-5's widening, the blocking edge before devops writes the deployment record.
   **U-1 folds into this decision and is not a separate ask.**
7. **U-2 — QA**: renumber the duplicate `BC-13` / `BC-14` rows. No requirement changes; the exposure is
   that the Phase-1 `BC-14` is the row a by-number reference drops.
8. **U-3 — QA**: quote the `Verified-At` frontmatter value so its pointer survives YAML.
9. **After the sitting**: the retrospective's precondition (UAT Complete) is satisfied now; devops
   executes the release once the `PRE` ledger is terminal.

---

## Appendix B — Consolidated operator script for the whole `PRE` ledger (rev 11)

**Written 2026-08-24 at steering's request, and within this stage's remit**: my definition already makes
the walkthrough of blocking conditions UAT's to drive and record. **This packages what the conditions
already require into one sitting. It reopens nothing** — the verdict stands as issued at rev 10, and no
condition is added, weakened or withdrawn here.

**Nothing in this appendix is an executed result.** Every "expect" line is a **prediction**. Appendix A
remains the detailed script for BC-11b; this appendix supersedes it **only** on the two points marked
*(corrects Appendix A)* below.

---

### B.0 — The finding that changes the sitting's risk, stated first

**The seed mint route is still open right now, and it closes at deploy.**

Rev 9 recorded, correctly for the moment it was written, that *"the seeds cannot be re-minted — the mint
route closes at deploy"*, and built a no-Save rule around that scarcity. **Re-derived this pass: the
deploy has not run.** `master` is `c85945f` locally and on `origin`, which is the tree D20's mint route
belongs to and the tree the owner minted 5855 and 5856 through earlier today. D20's expiry is at the
**deploy**, not at the sitting.

**Consequence, and it is the single most useful thing in this appendix**: *before* the sitting, spare
seeds can still be minted through production's New Message JSON at `c85945f`, exactly as 5855/5856
were. **After the deploy they cannot** — BC-8 is the observation that the route is closed at the tip.

**Therefore: mint spares first.** Four of each shape is cheap insurance and costs two minutes:

    {"content":"hi","flags":32768}                      ← 5712-shaped
    {"content":"hi","flags":32768,"components":[]}      ← 5842-shaped

**Why this is not optional bookkeeping**: BC-11b's *Predicted value* requires *"both outcomes verified by
repeating with the other option"*, and **taking an option writes to the record and consumes its row-E
candidacy.** With two seeds and four destructive legs to run (two shapes × Save and Save As, each with
both options), the row is **not runnable to its own prediction on two seeds.** Spares dissolve that.

**This is this pass's reading, derived from D20's text and the tree state, not an executed result.**
If production's New Message JSON refuses the paste, record what was seen and hand it back — do not
conclude the route is closed.

### B.0.1 — A defect in Appendix A, corrected here *(corrects Appendix A)*

Appendix A scripts BC-11b's **dismissal** leg only — step 4, *"dismiss without choosing… nothing was
written"* — and states the prediction as *"the ask appears; nothing is written before a choice"*.
**BC-11b's actual Predicted value in QA's register carries a third clause Appendix A drops**: *"both
outcomes verified by repeating with the other option."*

**Appendix A is therefore incomplete, not wrong.** The dismissal leg is necessary and is the easiest to
skip; it is not sufficient. **B.4 below runs all three legs.** Recorded as a correction to this stage's
own artifact rather than fixed silently.

---

### B.1 — Which environment (derived from the plan, not supplied to me)

**These are `PRE` rows. Production is explicitly not required.** M8-G's clause admits the form *"in any
environment seeded with the shape"*, and the register's own convention (BC-1) reads *"chain tip deployed
to **any** environment with a stored V2 message"*. The deploy has not run and **must not** be run to
satisfy them — that would invert the gate.

**What the repo settles, and what it does not:**

| Fact | Source | Consequence |
|---|---|---|
| The chain tip is `821330d` on `chain/013-components-v2-editing-surfaces` | re-derived from the tree | this is what must be served |
| Building on this machine loads `.env.local`, **whose only selectable `DATABASE_URL` is the remote hosted database** | devops readiness assessment | **a locally-served chain tip already sees seeds 5855/5856. No seeding step is needed** |
| Vercel is the platform; **whether branch pushes produce preview deployments is not visible from the repo** | `.vercel/project.json`; readiness Q2, explicitly unresolvable here | a preview URL is a legitimate alternative **if** one exists — the owner can see the dashboard; no agent here can |

**So the recommended environment is the chain tip served locally at `821330d`, authenticated as
himself.** **The trade-off, stated because it is his to accept and not mine to assume**: this stands a
dev server against the **live** database, so anything he saves during the sitting lands in the real
account. That is the same class of decision the D20 mint already took deliberately. If he prefers not
to, a Vercel preview of the chain branch is the alternative — **but it points at the same database**, so
it changes where the code runs, not what the writes touch.

### B.2 — What must be standing before he starts

- [ ] Chain tip `821330d` served and reachable; logged in as himself.
- [ ] **Seeds 5855 and 5856 present, plus the spares from B.0.** Confirm in the messages list first.
- [ ] **The components section EXPANDED in the composer.** `showComponentButton` requires
      `isEditing && isV2Mode && showComponentsEditable && canAddComponent`. **With it collapsed there is
      no add-component control and BC-11b reads as unreachable when it is not.** This is the single
      most likely way to get a false negative in the whole sitting.
- [ ] **A scratch V2 message** that is *not* a seed — for BC-1. Any ordinary message with components.
- [ ] **A Discord message carrying a select menu**, reachable by URL — for BC-2, and the *same* message
      for BC-3.
- [ ] A **folder-page export** to paste — for BC-5.
- [ ] A JSON payload with a **top-level Thumbnail (type 11)** — for BC-6.

### B.3 — Order dependencies (one carried, three new)

**Rev 9 found the first of these and it was invisible until someone looked. I did not assume it was the
only one, and it was not.**

1. **BC-11b before BC-15, on any given record.** *(carried from rev 9, unchanged.)* BC-15's Load applies
   row D to the draft, leaving it Classic with the bit cleared — **no longer a row-E candidate**, which
   is exactly what BC-11b needs.
2. **After BC-15's Load, do NOT press Save.** *(carried.)* Load changes the draft, not the stored
   record. Saving persists the cleared bit. **With B.0's spares this is now recoverable before the
   deploy and unrecoverable after — the rule stands either way.**
3. **Seed containment — NEW.** **Only BC-11b and BC-15 touch 5855/5856 or the spares.** Every other row
   runs on scratch input. BC-1, BC-7, BC-8 and BC-9 all drive Load or paste flows that clear the flag or
   write a record; run on a seed, they consume it exactly as a stray Save would. Same class as hazard 1,
   one surface over.
4. **BC-2 → BC-3 are a timed pair — NEW.** BC-3's earliest-decidable condition is *"bot `Get Message`
   run on the same message, **within the 1h store TTL**"*. The Get Message run **starts a one-hour
   clock**, and BC-3 must complete inside it, on the **same** message as BC-2. **Do not start it until
   ready to do both.** (This is also why BC-13 `bot-code-ttl-residue` exists as a POST row — same TTL,
   different question.)

### B.4 — The run, in order

Recording rule throughout: **the observed result is written BESIDE the prediction, never over it.** His
attestation, quoted with its timestamp, is complete evidence — **no capture file is minted, none is
owed, and none will be recorded as missing.**

| # | Row | Do | **Prediction** (not a result) |
|---|---|---|---|
| 1 | **BC-11b** *(blocking)* | On a **5712-shaped seed**: open it → confirm **V2 mode** and the **V2 error** visible and body `hi` present → add **one container** → press **Save** | **The ask appears and names BOTH drops. Nothing is written yet** |
| 2 | **BC-11b** leg 2 | **Dismiss without choosing**, re-open the record | **Nothing was written — the record is as it was.** The easiest leg to skip |
| 3 | **BC-11b** leg 3 *(B.0.1)* | Repeat 1, then **take option A**. On a **spare**, repeat and **take option B** | **Each option lands what it names and drops what it names.** Both seeds consumed — expected |
| 4 | **BC-11b** at **Save As** | Repeat 1–3 at **Save As** instead of Save, on spares | Same behaviour at both controls |
| 5 | **BC-11b** on the **5842 shape** | Repeat 1–4 on a **5842-shaped** seed | Same result |
| 6 | **BC-15** *(blocking)* | On a **fresh 5712-shaped seed**: open **Message JSON** → **is the Load button enabled, not inert?** → press **Load** with **zero edits** → **THEN STOP. DO NOT SAVE** | **Button enabled; warning appears; body `hi` survives; record shows Classic** |
| 7 | **BC-1** | On the **scratch V2 message** (not a seed): open Message JSON, change something, Load | **The confirmation names which top-level types are added/removed and whether the mode changes** |
| 8 | **BC-7** | New Message paste: `{"components":[<container>]}` | **Editor in V2, bit set, and a visible warning** |
| 9 | **BC-8** | New Message paste: `{"content":"hi","flags":32768}` | **Classic, `hi` intact, bit cleared, visible warning, no V2 error.** *This is the 5712 shape — it is now disposed of, not minted. This step is the evidence that D20's route is closed at the tip* |
| 10 | **BC-9** | New Message paste: `{"content":"hi","components":[<container>]}`; dismiss once, then run twice more taking each option | **Two options, each naming its drop. Nothing created until one is taken.** Dismissal leaves message and pasted text unchanged |
| 11 | **BC-10** spot check | **Deliberately** repeat steps 8 and 9 (rows B and D) at the **modal Load** surface as well as the paste surface | **Identical row, drop set and notice class at both surfaces.** Record as `EXECUTED` with these two cells named — *"satisfied incidentally" is not a terminal state* |
| 12 | **BC-6** | Paste JSON carrying a **top-level Thumbnail (type 11)** | **The notice NAMES the dropped type.** Today it is silent; a component vanishing without trace is the failure |
| 13 | **BC-5** | Paste a **folder-page export** | **The composer's floor error** — *"Message must have content, embeds, or components."* **A green state here is the failure** |
| 14 | **BC-4** | Attempt an import that fails the floor | **The dialog STAYS OPEN with the error and does NOT navigate. No new message created** |
| 15 | **BC-2** | Import by **URL** a Discord message carrying a **select menu** | **Dialog shows supported components AND a notice naming the select** |
| 16 | **BC-3** *(starts the 1h clock — see B.3.4)* | Run the bot's **Get Message** on the **same** message, then load the code | **The editor shows the same notice**, within the TTL |

### B.5 — Rules that govern every step

- **Ambiguity rule.** If a seed opens in **Classic with no V2 error and no components section**, that is
  **ambiguous** between a read-path defect and the ask not firing. **Record exactly what was seen and
  hand it back. Do not conclude either.** QA owns closing it. The same applies to a **validation error
  appearing instead of the ask** — record it; do not read it as the ask having failed.
- **A guild error at Save As is a new finding, not F-QA11.** F-QA11 is a New Message defect, bounded by
  QA's execution to a single site; Save As reaches the boundary as `null`, which QA executed and found
  accepted. So a guild error at step 4 is **positively distinguishable** and worth reporting.
- **If the observation contradicts the gate — BC-15 above all — that is a finding, and QA wants it
  back.** It is not a stale fixture for the observer or for this stage to explain away, and it
  **re-opens QA's verdict**.
- **Any row failing returns to the implementer before release**, per the release decision as issued.

---

## Appendix C — The owner's 2026-08-25 ruling against the `PRE` ledger

**His words, quoted and not paraphrased, relayed by `steering-hooks-013-2`:**

> *Also, and I'm stating this clearly, I will not be going around fetching messages. You give me the
> JSON or the item is unfulfillable by me. I'm not going to go hunting for random messages in Discord.
> If it cannot be generated for me to input into the editor, it will not be done.*

**The operative test, taken from his sentence and not from anyone's gloss**: *can it be generated for
him to input into the editor?* Not *is it Discord-adjacent*. Applied row by row below. **This appendix
withdraws nothing** — `WITHDRAWN` is his ruling alone.

### C.1 — Rows the ruling does NOT reach: fulfillable, and the payloads are owed by me

**These were never unfulfillable. They were under-specified by my own script**, which handed over
placeholders like `<container>` instead of paste-ready JSON. Under this ruling a placeholder is not a
lesser inconvenience — **it is the item being unfulfillable, in exactly the way he describes.** That is
my defect, and the fix is to author the literals, which I do here.

Derived from the import schema at the chain tip (`821330d`,
`website/src/server/api/utils/shapes.ts`): a container is `type: 17` requiring `components` with at
least one child; a text display is `type: 10` with `content`; `SUPPORTED_TOP_LEVEL_TYPES` is
`{1,9,10,12,13,14,17}` and `SUPPORTED_CONTAINER_CHILD_TYPES` is `{1,9,10,12,13,14}` — **type 11
(Thumbnail) is in neither**, which is what makes it the dropped-type case.

| Row | **Paste-ready JSON — hand him exactly this** |
|---|---|
| **BC-7** *(row B: → V2, bit set, warning)* | `{"components":[{"type":17,"components":[{"type":10,"content":"hi"}]}]}` |
| **BC-8** *(row D: → Classic, content kept, bit cleared, warning)* | `{"content":"hi","flags":32768}` |
| **BC-9** *(row E: → two options, nothing written until one is taken)* | `{"content":"hi","components":[{"type":17,"components":[{"type":10,"content":"hi"}]}]}` |
| **BC-6** *(the lenient filter NAMES the dropped type)* | `{"components":[{"type":17,"components":[{"type":10,"content":"hi"}]},{"type":11,"media":{"url":"https://picsum.photos/200"}}]}` — the container survives, **the type-11 thumbnail is dropped and must be named** |
| **BC-1**'s scratch V2 message | **No hunting required**: paste BC-7's payload and save it. That *is* the scratch V2 message |
| **BC-11b / BC-15** seeds and spares | Already literal: `{"content":"hi","flags":32768}` and `{"content":"hi","flags":32768,"components":[]}` |

**BC-5 — fulfillable in principle, payload NOT authored, and I will not invent one.** BC-5 pastes a
**folder-page export**. That is our own product's artifact, so his test is met in principle — but **no
document I hold establishes the export's shape**, and a fixture that is not what the folder page
actually emits would make BC-5 test nothing while reading as executed. That is the precise failure this
ledger exists to refuse. **One-line question routed to the implementer or QA: what does a folder-page
export literally look like?** Once answered, BC-5 joins the table above.

### C.2 — Rows the ruling DOES reach: BC-2 and BC-3 — **RECOMMEND WITHDRAWAL**, routed to the owner

**BC-2** (`M3-b`: import a Discord message carrying a **select menu** by URL/webhook → the dialog names
the types it could not carry) and **BC-3** (the same message via the bot's **Get Message**, inside the
1h TTL). Their oracle is the **Discord ingress path itself** — `discordResponseToMessage`, which is
M3's entire subject. **No payload can satisfy them**, because the thing under test is the fetch, not
the JSON. They need a real Discord message containing a select menu (type 3, unsupported by design),
and finding one is exactly *"hunting for random messages in Discord"*.

**No agent here can generate one.** Creating one would mean an agent posting to Discord, which is
barred outright and for which no approval path exists. I did not look for a way around that.

**Per this stage's rule I mark them RECOMMEND WITHDRAWAL, state the cost, and route it up. I do not
withdraw them.** His options, with a real *don't do it*:

1. **Withdraw BC-2 and BC-3** — his ruling, recorded with the cost below.
2. **Supply one URL** if a qualifying message already happens to be in front of him. **This is one
   message, not a hunt** — and it satisfies both rows, since BC-3 reuses BC-2's message.
3. **Leave them open** — they stay `NOT EXECUTED`, non-terminal, and continue to block an
   unconditional approval. Legitimate, and the honest default if he does not want to decide now.

**What withdrawing costs, stated so the decision is made on a stated basis.** M3's data layer is
covered — M3-a/b/c delivered, reviewed `APPROVED_WITH_COMMENTS` at round 15, with `013-m3-bot-get-message.test.ts`
exercising the bot path. **What ships unobserved is the operator-visible notice actually rendering on
the ingress surfaces.** That is a **silent** failure mode: a notice that does not render is
indistinguishable, to the user, from nothing having been dropped — the component vanishes without trace,
which is the class 013 exists to close.

**The residual is narrower than "M3-b is unverified", and stating it precisely is the point.** If
**BC-6 passes**, the drop-notice renders at the JSON paste surface, so what remains unverified is
specifically that **the import dialog (URL/webhook) and the editor-on-bot-code-load wire that same
notice**.

### C.3 — Why BC-6 does NOT substitute for BC-2/BC-3

Steering raised this as a tension in my own document and was right to. **The answer is that no
substitution is being made, and BC-10 is exactly why.** BC-10 exists to refuse *"the same notice
reached through a different surface"* as equivalence — one object treated two ways is the hazard R9
names. BC-6 and BC-2 reach a superficially similar notice through **different code paths**: BC-6 through
the paste/lenient-filter route, BC-2 through `discordResponseToMessage`. **Accepting BC-6 for BC-2 would
record M3-b as observed on evidence that never touched M3's code.** So BC-6 **narrows the residual** and
**does not discharge the rows**. If they are closed, they are closed by his withdrawal — openly — and
never by a substitution that reads as execution.

### C.4 — Disposition summary

| Row | State after this appendix |
|---|---|
| BC-1, BC-6, BC-7, BC-8, BC-9 | **Fulfillable. Literal payloads authored above.** State unchanged: `NOT EXECUTED`, awaiting the sitting |
| BC-5 | **Fulfillable in principle; payload owed.** One-line question routed to the implementer/QA |
| **BC-2, BC-3** | **`NOT EXECUTED`, non-terminal, RECOMMEND WITHDRAWAL — routed to the owner.** Not withdrawn here |
| BC-4, BC-10, BC-11b, BC-15 | Unaffected by the ruling |

**Nothing in this appendix changes the release decision**, which stands as issued at rev 10.
`OWNER-QUEUE.md` is steering's document: the payloads above are offered for transcription **verbatim**,
and I have not edited that file.

---

# Rev 13 — The Toast-Vessel Change, Assessed After the Release Already Ran

**Session**: `uat-hooks-013-3`, spawned by the owner, briefed by `steering-hooks-013-2 [019315]`.
**Date**: 2026-08-25.
**What this revision does**: issues a release decision on `chain/013-toast-vessel` @ **`4a7126b`**, a
**post-release fix to code already live**; records the ordering fact that 013 shipped while rev 12's
conditional approval stood undischarged; and terminalises the inherited ledger item by item against
the new evidence. **Rev 10's verdict is not reopened — it is expired, by its own terms, and the reason
is recorded below rather than assumed.**

Every predecessor status in this revision was read directly from the predecessor document at write
time. Nothing in the briefing that reaches this verdict was adopted on the briefing's word; each
figure below names the instrument that produced it.

---

## R13.1 — The ordering, stated plainly, and what it did and did not cost

**013 has been released.** `git ls-remote origin master` → **`a151fb47a84d7de95124b412194873f7e84edf27`**
(established at the remote, not from a tracking ref). The merge was a fast-forward; `origin/master`'s
reflog records `update by push` at **00:56:37 on 2026-08-25**. Neither steering, nor devops, nor the
implementer performed it, and **the owner has not confirmed it was his**.

This is a **recovery state, not a sanctioned ordering**, and this document declines both available
evasions: it does not pretend the ordering was normal, and it does not treat a shipped system as if
it were still a proposal.

**What the ordering did NOT cost — re-derived here, because it inverts the obvious reading.** The
tree that shipped carries rev 10's production-code identity **exactly**:

| Derivation | Instrument | Result |
|---|---|---|
| `821330d` an ancestor of `a151fb4` | `git merge-base --is-ancestor` | **true** |
| non-test delta `821330d..a151fb4` | `git diff --name-only … ':(exclude)*__tests__*'` | **empty** |
| full delta `821330d..a151fb4` | `git diff --numstat` | **exactly three files**, all under `src/utils/__tests__/` — the same three paths rev 10's frontmatter named as uncommitted and hashed |

Rev 10 wrote: *"Committing QA's three test paths is the one move this decision survives."* **That is
the only move that happened.** So the release did not ship unreviewed or unverified code. It shipped
code this document had approved.

**What the ordering DID cost, which is the whole of it.** Rev 10's approval was conditional on a
twelve-row `PRE` walkthrough. **The release act consumed the condition without discharging it.** The
approval was *overtaken*, not met. Two consequences follow, and neither is recoverable by re-running
anything:

1. **A release ran with no deployment record.** `agent-output/deployment/` holds a *readiness
   assessment* for 013 (`013-…-readiness.md`, Status `Active`) and **no deployment record**. Plan
   Validation items 4, 5 and 7 are each discharged *at* the deployment record; with no record they
   are not merely owed, they have no surface to be written on. **Routed to devops.** This document
   does not write that record and does not schedule it.
2. **The seed-mint route may have closed with no spares minted.** Rev 11 established that the route
   writing the 5712/5842 shape expires at deploy, and that **BC-11b is not runnable to its own
   prediction without spares** — its prediction requires *both* outcomes, and verifying the second
   consumes a seed. Seeds 5855 and 5856 are the entire population. **Whether the deploy fired is
   unanswered**, so whether this cost was actually incurred is unanswered with it. **No re-running
   recovers it.** Routed to the owner as a fact, not a task.

**Weighing the production evidence, per this stage's rule.** There is none to weigh. An operator
attestation is evidence against **loud** failure modes and none at all against **silent** ones — and
here not even the loud half is available: no attestation of production behaviour since the push
exists, in this document, in `OWNER-QUEUE.md`, or in any deployment record, each read at write time.
**Nothing below is terminalised on "it seems to be working."**

---

## R13.2 — The authority question, ruled rather than inherited

The change under assessment exists on an **owner ruling given in conversation**. There is no plan
revision and no planner pass: `grep -c "toast"` over
`agent-output/planning/013-components-v2-editing-surfaces.md` returns **0**. The code reviewer and QA
each judged this a traceability defect rather than an authority one and **scoped** their verdicts
rather than stopping. **This stage is not bound by that call and reaches it independently, by a
different route.**

**Ruling: the basis is sufficient, and the reason is the Value Statement I already hold under test.**

The plan's D4-approved Value Statement — reproduced at the head of this document, not a word amended
— requires that *"no editing action silently discards what I built."* A warning that a component was
dropped, delivered in a vessel that erases itself after a few seconds, is a **near-miss of that exact
clause**: the discard is announced in a container designed to disappear. The toast-vessel change is
therefore not new scope arriving without a plan. **It is 013's own value clause being delivered
properly at the presentation layer**, and it is squarely inside the statement this gate exists to test.

That is why the owner needed no plan revision to authorise it, and why a plan revision is nonetheless
owed — for the record, not for the authority.

**Finding U-4 — the ruling has no register entry.** The ruling survives only as relayed quotation
across three stage documents (code review round 20, QA's toast-vessel pass, this document's Appendix C
and R13.3). The plan's Decisions Register — the surface built for exactly this — carries no row.
**Consequence**: a reader arriving at the plan cannot discover why four source files changed after
release, and the "scoped, not ratified" qualification every stage attached lives nowhere that outranks
a stage document. **Severity: non-blocking for the release act; blocking for the chain's record.**
**Routed to steering** (registration is steering's write, as D28's was). No wording is drafted here.

**What is NOT ruled here, and is not this stage's to rule.** The product decision itself — that
stateful notices belong in the surface and transient ones in a toast — is the owner's, and it is
ratified by his own instruction. This document conforms to it; it does not endorse it. Likewise the
**retained** Load site (`JsonModalBody`): he ratified the retention **by selection**, with the
reviewer's counter-argument in front of him. **There is no verbatim sentence to that effect and none
is manufactured here.**

---

## R13.3 — Value delivery, re-derived on a wider predicate than any predecessor used

**The owner's scope, both parts, quoted and not paraphrased** (relayed by `steering-hooks-013-2`; the
second amends the first):

> Some idiot decided to put a permanent state warning into a toast. When inserting the conflicting
> payload into the new message JSON modal, the warning is a toast. This is horrible UX. It needs to be
> a message in the modal itself. Toasts are for transient states, like a request firing and/or
> failing, not for permanent state. This needs to be reevaluated and changed everywhere that 013
> decided to use a toast for a stateful message.

> On the Load one, if the error is not stateful but transient, then a toast might be correct. It's
> reporting on an action where the state cannot be represented persistently. I'm not saying all toasts
> are bad, but that if the action is not transient then the message should be persistent.

**"Everywhere that 013 decided to use a toast" is a completeness claim, so it is measured, not
accepted.** The reviewer enumerated on `toast.warn`. This pass widened the predicate to the **entire
`toast.*` surface**, so that a stateful notice hiding in `toast.error` could not pass. Counts computed
**inside git's own grep** (`git grep -c <pattern> <tree> -- src`), never through a pipe:

| Call site class | `c85945f` (pre-013) | `a151fb4` (013 as released) | Moved by 013? |
|---|---|---|---|
| `toast.warn` | **0** | **3** | **+3** |
| `toast.error` | 7 | 7 | no |
| `toast.success` | 1 | 1 | no |
| `toast.info` / bare `toast(` | 0 | 0 | no |

Per file, the whole `toast.` surface moves in exactly three places: `NewMessageJsonInput.tsx` 0→1,
`JsonModalBody.tsx` 0→1, `MessageProvider/index.tsx` 4→5. **Every other toast-bearing file in `src` is
byte-for-byte unmoved in its count.** So the population the owner's instruction reaches is **exactly
three**, the reviewer's enumeration is confirmed by a strictly wider instrument, and **nothing outside
`toast.warn` was hiding in the scope.**

**Disposition, at the tip under assessment.** `git grep -c "toast\.warn" 4a7126b -- src` returns **one
production site**: `JsonModalBody.tsx`. So:

- **Two converted** — `NewMessageJsonInput` (the paste surface, *the site his first sentence names*) to
  a persistent `settledNotice` in the modal; `MessageProvider`'s dropped-types notice to a persistent
  `CodeMessageNotice` banner in the layout.
- **One retained** — `JsonModalBody`'s Load toast: **exactly the site his second ruling carves out.**

**The delivered disposition matches the instruction he actually gave, site for site, with no site
unaccounted for.** That is the value finding, and it is the strongest one available at this gate.

**A second-order gain, worth recording because it improves rows already owed.** Rows **BC-6, BC-7,
BC-8 and BC-9** predict *a notice naming what was dropped*. Their predictions were written
vessel-neutral, so the conversion does not stale them — and it makes them **easier to observe**: a
persistent in-modal notice can be looked at, where a toast had to be caught. The walkthrough these
rows belong to is **cheaper** at `4a7126b` than it was at `821330d`.

---

## R13.4 — Predecessor status, verified directly

| Document | Status field, read at write time | Coverage of the tip under assessment |
|---|---|---|
| **Code review** `code-review/013-…-code-review.md` | **`Code Review Approved`** | **Round 22 binding at `4a7126b` — APPROVED** (test-only; the round-20 source verdict at `abcf585` carries). Round 20 is `APPROVED_WITH_COMMENTS`, **SCOPED** — code quality and conformance to the relayed ruling, explicitly **not** ratification of the ruling or of the retained site |
| **QA** `qa/013-…-qa.md` | **`QA Complete`**, `Verified-At: 4a7126b` | **QA COMPLETE at `4a7126b`.** *"No open finding of mine blocks a release."* Every captured instrument adopted; suite 577/40 |
| **Implementation** `implementation/013-…-implementation.md` | **`Active`** | Records the toast round: `abcf585` × 11, `4a7126b` × 2, `toast` × 44 (`grep -c`). **Terminal `Status` is devops's** — condition **U-C6**, unchanged |
| **Plan** `planning/013-…-editing-surfaces.md` | **`UAT Approved`** | Already set. **Not advanced by this pass** and not re-set: the field is correct as it stands, and the plan is steering's/the owner's document. See finding U-4 for what the plan *does* lack |

**No predecessor returned a failure verdict at `4a7126b`.** QA's earlier `QA FAILED` at `abcf585`
(F-QA23) is **superseded by its own document** at `664e0c0` and again at `4a7126b`, and is recorded
here as history, not as a live state.

---

## R13.5 — Verdict identity, re-derived from the tree

Re-derived by this pass at pass start; **not inherited from the briefing or from any predecessor.**

- **Repository**: `website` @ `chain/013-toast-vessel`, **HEAD = `4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f`**
  (`git rev-parse HEAD`).
- **Base**: `a151fb4` (live `master`) confirmed an ancestor of HEAD (`git merge-base --is-ancestor` →
  true); `a151fb4` confirmed an ancestor of `abcf585` likewise. Integration is a fast-forward.
- **Production-code population — four files, introduced at `abcf585`.** Blob identity re-derived at
  **both** tips (`git rev-parse <tip>:<path>`), and file bytes hashed with `sha256sum`:

| Path | blob @ `abcf585` | blob @ `4a7126b` | `sha256sum` of file bytes |
|---|---|---|---|
| `src/app/message/_components/NewMessageJsonInput.tsx` | `f63b95df` | `f63b95df` | `d2ffdb003f737b2f0badc1419201723a1fc9b8252ca8d10e9e35858a80e4f3e8` |
| `src/app/message/m/[id]/_layout/CodeMessageNotice.tsx` | `75dafce9` | `75dafce9` | `fbe23995a71ae510923d663c6191264f7f27011a642f2ac88d656d027e02ce4a` |
| `src/app/message/m/[id]/layout.tsx` | `d50a1992` | `d50a1992` | `14d3d74a92059f9bb3af064383e6ec84ca68956a6ea7ea7ad90174efeecd3fdb` |
| `src/providers/MessageProvider/index.tsx` | `955fc0ea` | `955fc0ea` | `238f2a169b1bf7459db1bf81979c002171e21c89a38aa61331c7629691109d98` |

- **Delta `abcf585..4a7126b`** (`git diff --numstat`): **two files, both under `src/utils/__tests__/`**
  — `013-qa-paste-surface-render.test.ts` (+82) and `013-qa-toast-vessel-render.test.ts` (+132).
  **Test-only, confirmed.**
- **Exclusion list** (`git status --porcelain --untracked-files=all`, whole repo): four untracked
  paths under `.cr24-probe/` — `DriftExtraState.tsx`, `a1-drift.test.ts`, `a3-drift.test.ts`,
  `vitest.config.ts`. **Foreign to this verdict, another session's probe rig, left in place.** No
  in-scope path is uncommitted; the SHA therefore stands alone and no content-manifest fallback is
  owed for the production population.
- **Uncovered population**: none in `website`. `project-utils` and `preview-image-generator` are
  untouched by this chain (plan Validation item 7) and are not covered here.

**This decision is anchored at `4a7126b`. Any change to a production-code blob expires the
predecessor verdicts and this decision with them** — do not rely on another agent noticing.

### R13.5.1 — QA's mandatory Assumption Not Checked is CLOSED by this derivation

> **Corrected at rev 14 (2026-08-25) — see R14.1. The closure holds; this statement of it was one
> control short.** A MATCH-only result cannot be distinguished from an instrument that returns MATCH for
> everything. QA supplied the negative control and it is re-derived in R14.1. The closure is **joint**,
> not this document's alone. The text below stands as written.

QA recorded: *"This pass assumes the four production files are byte-for-byte what `abcf585`
introduced, and verifies that only by `git diff --numstat` over the range — a path-and-count
instrument, not a content hash of each file at each tip. A rebase, an amend, or a force-push that
reconstructed the range with altered content while preserving the same per-path add/delete counts
would be invisible to it."*

**That is the instrument this pass ran.** `git rev-parse <tip>:<path>` returns the **blob SHA**, which
is a content hash of the file at that tip; all four match across `abcf585` and `4a7126b`, and a
reconstructed `abcf585` would not still be `abcf585`, a commit SHA being itself content-addressed.
**The assumption is closed on the substance, not narrowed** — and it is closed in a document other
than the one that raised it, which is recorded as the delta rather than returned for a shuffle. QA
routed it to **devops at release assembly**; that routing stands as a second, independent check and is
not cancelled by this closure.

---

## R13.6 — The one genuine open item: BC-18 / BC-19, carried as ONE agreed boundary

> **Corrected and widened at rev 15 (2026-08-25) — see R15.1/R15.2.** *"Instrument-guarded on both
> surfaces"* holds for the **paste** surface and is **overstated** for the **code-import** surface, whose
> producer and mount have no executing test and which has never run in production. **BC-19's falsity
> signature is larger than stated below.** The text below stands as written.

The crux all evening was whether the converted notices actually render. **They are now
instrument-guarded on both surfaces, by mutation, against the real components** — render,
suppress-on-error, clear, and styled — and the guard was reproduced independently by three stages
(QA's probe; the implementer's adoption; the reviewer's own first-principles re-attack, 3/3 with the
never-render and drop-the-`!error`-conjunct mutants both killed). QA **withdrew its own F-QA26
"unreachable" finding by execution**, and the reviewer independently confirmed the withdrawal — a
retraction that ended better-evidenced than the claim it replaced.

**What remains is exactly three properties, and it is one boundary, not two positions.** The reviewer
and QA reached it independently from opposite directions and each asked that it be carried as one;
this document carries it that way, and adopts **QA's narrower scoping** — *"BC-18 shrank when QA
withdrew its own finding"* — never its earlier, wider form:

> **VISIBILITY** (CSS cascade, `z-index`, `overflow`, contrast) · **PLACEMENT** · **the real Next.js
> server/client MOUNT.** Owner-observation only, under **D28**.

**Falsity signature, in operator terms** (the reviewer's, recorded so the observation is decidable
rather than impressionistic): *he pastes a conflicting payload into New Message and sees **no
persistent in-modal warning**, or one that **never clears** when the JSON is fixed.*

**Why this residue is not cosmetic, stated because the conditional below rests on it.** Before the
fix, the user got a warning that vanished. If the residue fails — the notice renders into a hidden,
overlapped or unmounted box — the user gets **nothing**, which is strictly worse than the state being
fixed. And its signature is **absence**, so it is a **silent** failure mode: no attestation, however
long and however quiet, is evidence against it. That is precisely the class 013 exists to close, and
it is the reason the approval below is conditional rather than unconditional.

**Counterweight, recorded with equal weight.** Holding the fix keeps the defect he reported live in
production. QA's release note is carried verbatim in substance — *a coverage failure must not be why a
live UX fix waits* — with QA's own qualification that it has **softened, not lapsed**: the coverage
now exists rather than being promised.

**Register hygiene check, run because this stage's rule requires it.** QA appended BC-18, BC-19 and
BC-20 to **chain 013's single register**, explicitly continuing after its true high-water mark of
BC-17 and naming the ID-collision note as the mistake it was avoiding. **There is no second travelling
list.** Verified against QA's §8 directly. Recorded as a pass.

---

## R13.7 — The Ledger, terminalised item by item

**The register does not collapse into "superseded" because production moved.** Each condition reaches
its own terminal state or stands openly at a non-terminal one. **`WITHDRAWN` remains the owner's
ruling alone; this pass withdraws nothing.**

### R13.7.1 — Class change forced by the ordering, recorded not laundered

The twelve `PRE` rows rev 12 handed forward were defined as *terminal before the release act*. **The
release act has occurred.** They cannot now be `PRE` in the sense their class names. This pass
therefore records, once and explicitly:

> **The twelve rows went out unexecuted. Their state stays `NOT EXECUTED` and non-terminal; what
> changes is what they now gate — the chain's closure, not a release act that is already past.**
> This is a consequence of the ordering, **not** a discharge, **not** a withdrawal, and **not** a
> reclassification of any row's definition. **Row definitions are QA's.** Where a row's class should
> formally move, that is a request routed to QA, not a change performed here.

### R13.7.2 — Inherited `PRE` rows (rev 12's ledger)

| Row (number · name) | Owner | State at rev 13 |
|---|---|---|
| **BC-1 · Load confirmation names what changes** | operator | **NOT EXECUTED** — payload authored (App. C); gates chain closure |
| **BC-2 · URL/webhook import names uncarried types** | operator | **NOT EXECUTED — RECOMMEND WITHDRAWAL stands, routed to the owner, not withdrawn.** Three options in `OWNER-QUEUE.md`; unanswered |
| **BC-3 · bot `Get Message` shows the same notice** | operator | **NOT EXECUTED — RECOMMEND WITHDRAWAL stands**, as BC-2 |
| **BC-4 · import failing the floor keeps the dialog open** | operator + suite (EC-3) | **NOT EXECUTED** (suite limb met). **Its fixture is visibly owed** and is not invented here |
| **BC-5 · folder-page export paste shows the floor error** | operator | **NOT EXECUTED — payload still NOT authored.** The folder-page export's real shape appears in no document held; the one-line question to the implementer/QA is **unanswered**. An invented fixture would make BC-5 read as executed while testing nothing |
| **BC-6 · the lenient filter names the dropped types** | operator | **NOT EXECUTED** — payload authored; **observability improved** by the conversion (R13.3) |
| **BC-7 · paste a container → V2, bit set, visible warning** | operator | **NOT EXECUTED** — payload authored; now overlaps **BC-18**'s surface |
| **BC-8 · paste the 5712 shape → Classic, content intact, warning** | operator | **NOT EXECUTED** — payload authored; now overlaps **BC-18**'s surface |
| **BC-9 · paste content+container → two options, nothing created** | operator + suite | **NOT EXECUTED** — payload authored |
| **BC-10 · M8-F parity across modal Load and New Message paste** | qa (primary) + operator (spot) | **SUITE LIMB MET; spot-observation limb NOT EXECUTED** |
| **BC-11 · (pointer)** | — | **SUPERSEDED by BC-11a + BC-11b** — unchanged |
| **BC-11a · the mint** | uat | **`EXECUTED` 2026-08-24 — TERMINAL.** Confirmed unchanged this pass |
| **BC-11b · the ask fires on save over a seed** | operator with a browser | **NOT EXECUTED — and now AT RISK of being unrunnable to its own prediction.** See R13.1(2): its *both outcomes* clause needs a spare seed, the mint route closes at deploy, and whether the deploy fired is unanswered. **Escalated to the owner as a fact.** No re-running recovers it |
| **BC-15 · D28's mounted render** | uat (records the attestation), observed by the owner | **NOT EXECUTED.** Order rule stands: **BC-11b before BC-15 on any record; no Save after BC-15's Load** |
| **BC-16 · `p2-rowd-load-gate`** | implementer | **`EXECUTED` / DISCHARGED 2026-08-24 — TERMINAL** |

### R13.7.3 — `POST` rows

| Row · name | Owner | Earliest decidable | State at rev 13 |
|---|---|---|---|
| **BC-12 · a V2 message that sent at `c85945f` still sends after deploy** | implementer (decision) / **uat** (observation) | **the deploy is live — possibly NOW** | **NOT EXECUTED.** Single-observation sufficiency: **one 4xx refutes by construction.** Decidability is unknown because the deploy question is unanswered — **watch for decidability, do not wait for someone to look** |
| **BC-13 · `bot-code-ttl-residue`** | devops | one hour after the deploy SHA is live | **NOT EXECUTED** — and **the deployment record that would carry it does not exist** (R13.1). Routed to devops with the record |
| **BC-14 · `user-defect-fixed-in-prod`** | **uat** | the deploy is live | **NOT EXECUTED.** *The row a by-number reference drops (U-2) — and it is the chain's own reason for existing* |
| **BC-17 · `discord-returns-row-e`** | uat | tip deployed **and** an import attempted against a pre-enforcement message | **NOT EXECUTED** |
| **BC-20 · `dropped-notice-guards-send`** *(new, QA §8)* | **uat** | chain tip deployed | **NOT EXECUTED.** Prediction: no report of a message sent missing components the importer dropped. **A silent mode — absence of reports is not evidence for it** |

### R13.7.4 — `PRE` rows for the change under assessment

| Row · name | Primary instrument | Subject | Prediction | State |
|---|---|---|---|---|
| **BC-18 · `paste-notice-renders`** | **shrank at QA's withdrawal**: `verification/013/probe-qa-paste-surface-render/` now closes renders / suppresses-under-error / clears / styled, 4 mutants 4/4 killed, reproduced by the reviewer 3/3 | **the owner, at a browser** — for the remainder only | a persistent warning appears in the modal and **clears** when the JSON is corrected | **NOT EXECUTED — residue only** (visibility, placement, real mount). **Do not carry its earlier, wider scoping** |
| **BC-19 · `code-import-notice-visible`** | `verification/013/probe-qa-toast-vessel-render/` — logic **PASSED** | the owner's eye | notice visible above the fold, not hidden behind nav | **Logic `EXECUTED`; visual limb NOT EXECUTED** |

### R13.7.5 — Documentary conditions (rev 10/11's `U-C` series), re-derived

| ID · name | Owner | State at rev 13 | Evidence, re-derived this pass |
|---|---|---|---|
| **U-C1 · code-review coverage of the release tip** | code-reviewer | **`EXECUTED` — TERMINAL** | The code-review document states *"CODE-REVIEW GATE MET at the settled final tip `a151fb4`"*, and round 22 binds **`4a7126b`** as APPROVED. Read from the document's own frontmatter at write time |
| **U-C2 · implementation records the release tip** | implementer | **`EXECUTED` 2026-08-24 — TERMINAL** (unchanged) | — |
| **U-C3 · M6 record closure** | implementer / steering / architect | **`EXECUTED` 2026-08-24 — TERMINAL** (unchanged) | — |
| **U-C4 · commit approval for QA's three test paths** | owner (approval) / devops (integration) | **`EXECUTED` — TERMINAL** | The three paths **landed**: `git diff --numstat 821330d a151fb4` is exactly those three files. The suite-green half of QA's verdict no longer rests on a working tree. *Recorded as `EXECUTED` with the evidence — "satisfied incidentally" is not a terminal state* |
| **U-C5 · R-5's widening** | **the owner** | **NOT EXECUTED — owner's decision, routed not decided.** Now compounded: it is the blocking edge before a deployment record that also does not exist | `OWNER-QUEUE.md`, read at write time — unanswered |
| **U-C6 · terminal `Status` on the implementation document** | **devops** | **NOT EXECUTED** | Implementation `Status: Active`, read directly. Gates chain closure, not the release act |

### R13.7.6 — New conditions this pass adds

| ID · name | Owner | What is owed | State |
|---|---|---|---|
| **U-C7 · a deployment record for the release that ran** | **devops** | A deployment record for `a151fb4` exists nowhere. Plan Validation items 4, 5 and 7 discharge *at* that record, and BC-13's window is written into it | **NOT EXECUTED** |
| **U-C8 · the plan's Decisions Register carries the 2026-08-25 ruling** | **steering** (registration write) | Finding **U-4**. No wording drafted here | **`EXECUTED` 2026-08-25 — TERMINAL.** Registered as **D29 at plan rev 22** (`d60c857`), discharged **before** rev 13's handback listed it outstanding — this stage was not told. **Verified against the plan, not the relay**: `D29` × 2, and `grep -c "toast"` over the plan now returns **1** where the same instrument returned **0** when U-4 was raised. Marked **registration only — it enacts nothing**; the plan body still carries no vessel requirement, which is a planner pass the owner has declined to start |

**Three questions sit with the owner and are recorded as unanswered, not assumed resolved**: whether
the 00:56:37 push was his; **whether the deploy fired** (which decides R13.1(2), and no re-running
recovers it); and his ruling on BC-2/BC-3.

---

## R13.8 — Objective Alignment

**Does the change meet the plan's objective?** **YES**, on the Value Statement clause it serves — and
the reasoning is in R13.2, not asserted here.

**Drift detected**: **none in behaviour.** The delivered disposition matches the owner's instruction
site for site, on a population this pass measured independently and wider than the reviewer did
(R13.3). **Drift in the record: yes, and it is finding U-4** — the ruling that authorised four source
files has no entry in the document built to hold it.

**Value judged delivered in mechanism and unobserved at the surface layer.** That sentence is the same
one rev 10 wrote, and it is still the honest one: every instrument that can reach the notices says
they render, suppress, clear and are styled; **nobody has looked at them.**

---

## R13.9 — UAT Status

**Status**: **UAT Complete**

**Rationale**: the gate ran against the tip under assessment. Predecessor statuses were read directly
and all pass at `4a7126b`; the verdict identity was re-derived from the tree and not inherited; the
value claim was re-measured on a wider predicate than any predecessor used and holds site for site;
the authority question was ruled rather than deferred; and the inherited ledger reached a stated
terminal or openly non-terminal state **row by row**. **UAT Complete is a statement about this stage's
work being finished. It is not a claim that the surface layer has been observed** — it has not, and
R13.6 says so precisely.

---

## R13.10 — Release Decision

**Final Status**: **APPROVED FOR RELEASE, conditional on the human click-through of BC-18 and BC-19.
If any of these fail, return to the implementer before release.**

**This is a ledger, not an exception.** Every outstanding condition in R13.7 names an owner and one of
three terminal states — `EXECUTED` (with result and date), `WITHDRAWN` (the owner's ruling alone), or
`SUPERSEDED` (with what replaced it). **`NOT EXECUTED` is not a terminal state**: it blocks an
unconditional approval, and **no release is recorded complete while any condition stands at it.**

**The identity this decision is anchored at**: `website` **`4a7126b`**, with the four-path blob and
`sha256sum` manifest, the base `a151fb4`, and the `.cr24-probe/` exclusion list, all set out in R13.5
and **re-derived from the tree by this pass**. **Any change to a production-code blob expires the
predecessor verdicts and this decision with them.**

**Why conditional and not `NOT APPROVED`.** Nothing in the delivered behaviour is known to be wrong.
The change is inside the plan's own Value Statement (R13.2), it disposes of the complete measured
population site for site (R13.3), both predecessor gates pass at this exact tip, and the render
question that was the crux is now instrument-guarded on **both** surfaces and independently
reproduced. The live system currently carries the defect this fix removes.

**Why not unconditional.** The residue is **silent** and it is not cosmetic: if the notice fails to
become visible, the user gets nothing where they previously got something, and no amount of quiet
production is evidence against that (R13.6). It is one browser look, and it is the same sitting that
already owes twelve rows.

**Which environment discharges BC-18/BC-19 is the owner's call, and it is routed, not decided here.**
QA classes both `PRE` and dates them *decidable now — the code is committed*, which presumes a
chain-tip environment. The owner has ruled he will not go hunting; standing up a chain-tip environment
is a different ask, and it is his time. If he will only observe in production, then in practice these
rows are post-deploy-observable, **and that is a reclassification request for QA — not a change this
document performs.**

**Recommended version**: **none, and none is to be synthesised.** `website/package.json` carries no
`version` field and the repo has no CHANGELOG (plan, *Release Artifacts*). The release **is the
serving ref moving** — from `a151fb4` to the tip devops assembles — which devops names in the
deployment record. **Devops must re-run readiness and cut a new release**: every `a151fb4`-stamped
readiness finding is expired by the four-file production change at `abcf585`, exactly as the code
reviewer recorded.

**A release-tip verdict (QA Phase 3) is still owed and is NOT this document's.** Devops commissions
it. A plan-level verdict does not authorise a release act, and its absence is not a gap in this
document.

**Key changes for the release record** (devops's to place; content, not wording):

- Notices about content the editor could not carry are now **persistent messages in the surface**
  rather than toasts that disappear: in the New Message JSON modal, and as a banner in the message
  layout after a code import.
- The Load confirmation in the message JSON modal **remains a toast**, deliberately — it reports a
  discrete action, not a standing state.
- Carried forward, unchanged from the released `a151fb4` record: everything in rev 10's "Key changes"
  list, which devops has not yet written down anywhere.

---

## R13.11 — Next Actions

*Point-in-time list — later stage documents are authoritative on these items' current state.*

1. **The owner — two questions and one look.** Was the 00:56:37 push yours? Did the deploy fire? And
   the BC-18/BC-19 look, whose falsity signature is in R13.6.
2. **The owner — BC-2/BC-3.** Three options stand in `OWNER-QUEUE.md`, including a real *leave them
   open*. Unanswered; not withdrawn.
3. **The owner — U-C5**, R-5's widening; still the blocking edge before any deployment record.
4. **Devops — U-C7.** A deployment record for the release that already ran, plus a re-run readiness
   and a new release cut from `4a7126b`. Also **U-C6**, and QA's Assumption-Not-Checked re-verification
   at assembly (R13.5.1 closes it once; devops's check is the independent second).
5. **Steering — U-C8 / finding U-4.** Register the 2026-08-25 ruling in the plan's Decisions Register.
   > **Discharged 2026-08-25** — plan rev 22, **D29**, commit `d60c857`. Verified against the plan at
   > write time. **The handback that listed it outstanding was wrong**; see the rev-16 changelog row.
6. **QA — BC-5's payload** (what does a folder-page export literally look like?) and **BC-4's fixture**,
   both visibly owed; plus the class question in R13.10 if the owner will only observe in production.
7. **The retrospective — its precondition is satisfied.** UAT Complete does not wait on release. Note
   for it, since it is the transferable part: **three separate stages this chain caught an error by
   re-measuring rather than by re-reading a report** — QA's own F-QA26 withdrawal, the reviewer's
   re-attack of an adopted instrument, and this pass's wider `toast.*` enumeration. The chain's most
   reliable defence was never review; it was re-derivation.

**Repository check, recorded because this stage runs it**: `node tools/check-repo.js` reports **16
problems** (duplicate probe-capture basenames under `verification/013/`; three SCOPE failures on
filenames — two `deployment/*-readiness.md` and one `code-review/012-carry-forward-*.md`). **All are
pre-existing and none belongs to this pass or to the change under assessment.** The tool **exits 0
while printing FAIL**, so its exit code is not a usable gate — recorded as an observation for the
tooling owner, not adopted as a finding here.

---

# Rev 14 — Reconciliation: QA's control, three rows terminalised elsewhere, and one premise that does not hold

**Date**: 2026-08-25. **Session**: `uat-hooks-013-3`. **Trigger**: `qa-hooks-013-2`, relayed by
`steering-hooks-013-2 [019315]`. **Nothing was asked of this stage**; the writes below are judged
owed because each corrects or completes a claim **this document makes**.

**Authority**: `agent-output/qa/013-components-v2-editing-surfaces-qa.md`, **re-read directly at
write time** — not taken from the relay. **The verdict of rev 13 is unchanged and is not reopened.**

---

## R14.1 — R13.5.1 was one control short. Corrected, and the correction is QA's

> **Reconcile note, 2026-08-25 (rev 14) — this corrects R13.5.1 of this document. The superseded text
> stands as written and is not overwritten.**

R13.5.1 recorded QA's mandatory Assumption Not Checked as **closed** on the ground that
`git rev-parse <tip>:<path>` returns a per-file content hash, and that all four production blobs match
across `abcf585` and `4a7126b`.

**The closure was right and the method was right. The *report of it* was incomplete.** A **MATCH-only**
result is indistinguishable from an instrument that returns MATCH for everything. R13.5.1 stated no
negative control, so as written it could not tell those two apart. **QA supplied the control** — the
same command against live `master` — and got **DIFFER**. In QA's framing, the closure was *"one control
away from being unarguable."*

**Re-derived here rather than adopted**, because a control taken on a peer's word is not a control:

| Path | blob @ `a151fb4` (live) | blob @ `4a7126b` | Result |
|---|---|---|---|
| `NewMessageJsonInput.tsx` | `c3293497` | `f63b95df` | **DIFFER** |
| `layout.tsx` | `aef786f7` | `d50a1992` | **DIFFER** |
| `MessageProvider/index.tsx` | `c6c08f5a` | `955fc0ea` | **DIFFER** |
| `CodeMessageNotice.tsx` | **absent** | `75dafce9` | **absent at `master`** — new at `abcf585` |

**The instrument discriminates.** Three files that exist at both tips return DIFFER against live
`master` and MATCH across `abcf585..4a7126b`. **The ANC is closed on that basis**, and the closure is
**jointly** QA's and this stage's — not this document's alone, as R13.5.1 implied. QA's routing to
**devops at release assembly** stands unchanged as the independent second check.

### R14.1.1 — A defect in the control instrument, recorded because it is the class this chain keeps catching

`git rev-parse <tree>:<path>` on a path **absent** from that tree writes `fatal: path … does not exist`
to stderr **and echoes the argument string to stdout**. A naive MATCH/DIFFER comparison capturing
stdout only therefore compares a blob SHA against the literal text `a151fb4:src/…`, and silently
reports **DIFFER** where the truth is **ABSENT**.

Here that mislabelling was benign — absence *is* a legitimate difference, and it is why row 4 above is
stated as absent rather than as a blob mismatch. **The general form is not benign**: an existence
predicate that cannot fail loudly is the same defect class as the piped-count and `ls -a | grep -x`
failures in `RTK.md`. **Settle existence with `git cat-file -e <tree>:<path>`**, which exits non-zero
and prints nothing to stdout. Verified both ways at write time. Recorded for the retrospective.

---

## R14.2 — Three rows terminalised or amended in QA's register, adopted here

**QA owns row definitions; this document is authoritative on state. All three were re-read from QA's
document at write time.**

**BC-11b — `TERMINAL: CANNOT BE EXECUTED`.** The owner confirmed by selection that the push was his
and the site is live, so `a151fb4` has been serving since ~00:56:37. BC-11b's *both outcomes* clause
needed a spare seed beyond 5855/5856; **the mint route closed at deploy and no spares were minted**.
R13.7.2 escalated this as a fact rather than a task and R13.1(2) named it irrecoverable; **it is now
realised.** Adopted.

> **Stated because this stage's definition does not contain this state.** My definition fixes three
> terminal states — `EXECUTED`, `WITHDRAWN`, `SUPERSEDED`. **`CANNOT BE EXECUTED` is a fourth**, and
> it is not a synonym for any of them: it is not `WITHDRAWN` (nobody ruled the condition unnecessary,
> and only the owner could), and not `SUPERSEDED` (nothing replaced it). **It is terminal in the only
> sense that matters — no future act can change it — and it must never be read as "closed."** What it
> records is a **permanent absence of evidence**: confirmation that the second disposition path
> behaves on a real production record is now unobtainable and will stay so. **Marking it is the
> register working**; the coverage it stood for is gone either way, and this is the form in which that
> loss stays visible instead of lapsing quietly. Carried to the retrospective as a realised risk —
> `devops-hooks-013`'s F-7.

**BC-18 / BC-19 — reclassification DECLINED by QA, and QA is right.** R13.10 routed the class question
to QA as the only stage that could decide it. **Its answer is better than the question**: `PRE`/`POST`
in that register states what can **observe** a condition, never what anyone intends to do — and unlike
BC-11a, **these rows do not expire at deploy**. Both remain observable from a local dev server exactly
as they always were. **Nothing was lost by shipping first except the ordering.** So they are
**re-dated, not reclassified**: still `PRE`, earliest-decidable amended to *decidable now, and equally
decidable after deploy — this condition does not expire*, and recorded **NOT MET AT THE RELEASE ACT**.
State: **OPEN, owner, executable at any time.**

> QA also carried R13.6's silent-mode argument into the register and sharpened it: **a
> post-deploy-observable row whose failure signature is absence is the weakest kind of row**, because
> nobody reports a warning they never saw — so reclassifying to `POST` would have moved these rows
> into the class where they are *least likely ever to be settled*. **Declining the reclassification
> protects the rows.** This document adopts that reasoning over its own framing in R13.10.

**BC-21 · `notice-silence-detector` — new `POST` row, registered by QA.** One **deliberate** paste of
a rows-B/D payload on the live site, **not** a wait for user reports — which cannot detect an absence.
One successful observation refutes *"the notice is silently absent"* by construction. Owner; subject
the owner, no non-human primary under D28. **It does not substitute for BC-18.** This is the genuine
post-deploy detector R13.7.3 identified as owed against BC-20's absence-signature; registering it was
QA's, correctly.

---

## R14.3 — Finding U-5: `4a7126b` is NOT released, and QA's prose says it is

**Re-derived at write time, at the remote and not from a tracking ref:**

    git ls-remote origin master  →  a151fb47a84d7de95124b412194873f7e84edf27

**`origin/master` has not moved. The toast-vessel fix is not deployed.**

QA's reconciliation prose states the rows are *"recorded as NOT MET AT THE RELEASE ACT, by the owner's
informed choice, **with `4a7126b` shipped ahead of them**"*, and heads its BC-21 section *"since the
owner has shipped."* **QA's own BC-21 row contradicts that prose in the same document** — its
earliest-decidable cell reads *"now — `a151fb4` is live; re-decidable **whenever `4a7126b` deploys**"*,
which is future tense and correct.

**What is established**: the owner confirmed the `a151fb4` push was his and that the site is live. **What
is not established**: that `4a7126b` has been released. A *decision* to ship ahead of the observation is
not a *shipment*, and no deployment record exists for either.

**Why this matters to this document specifically, and it is not a quibble.** Rev 13's release decision
is **conditional on BC-18 and BC-19 preceding the release act**. If `4a7126b` were already out, that
condition would have been overtaken — for the **second time in this chain**. It has not been. **The
window is open**, and QA's own finding is what makes it worth saying: **these rows do not expire.**
Both are observable from a local dev server, today, before devops cuts anything.

**So rev 13's condition stands as issued and remains meetable in the order it was written.** This
document does not record it as overtaken, and no reader should.

**Routed**: to steering and QA as a records correction — **QA's row is right and its prose is wrong**,
and it is the prose that travels in relays. Nothing about QA's re-dating reasoning is affected; only
the premise that the ship already happened. **No wording is drafted here.**

---

## R14.4 — Ledger deltas at rev 14

| Row / condition | State at rev 13 | **State at rev 14** | Authority |
|---|---|---|---|
| **BC-11b · the ask fires on save over a seed** | NOT EXECUTED — *at risk* | **`TERMINAL: CANNOT BE EXECUTED`** — permanent absence of evidence, never "closed" | QA §3, re-read |
| **BC-18 · `paste-notice-renders`** | NOT EXECUTED — residue only | **`PRE`, OPEN, owner — NOT MET AT THE RELEASE ACT; does not expire, executable at any time** | QA §1, re-read |
| **BC-19 · `code-import-notice-visible`** | Logic EXECUTED; visual NOT EXECUTED | **unchanged in substance; re-dated as BC-18** | QA §1, re-read |
| **BC-21 · `notice-silence-detector`** | — | **NEW `POST` row, Not started, owner** | QA §2, re-read |
| *Was the 00:56:37 push the owner's?* | unanswered | **ANSWERED — yes, confirmed by selection** | QA §3, re-read |
| *Did the deploy fire?* | unanswered | **ANSWERED — yes; `a151fb4` serving since ~00:56:37** | QA §3, re-read |
| *Is `4a7126b` released?* | not asked | **NO — `origin/master` = `a151fb4`. Finding U-5** | `git ls-remote`, this pass |
| **U-C7 · deployment record** | NOT EXECUTED | **NOT EXECUTED — unchanged, and now covers a confirmed-live deploy** | `deployment/`, re-read |

**Release decision: UNCHANGED.** `APPROVED FOR RELEASE, conditional on the human click-through of
BC-18 and BC-19`, anchored at `4a7126b`. Its production-code identity is unmoved — the four blobs are
byte-identical to R13.5, re-verified by the control in R14.1. **Nothing is withdrawn.**

**Next actions unchanged from R13.11**, with one addition and one subtraction: **add** BC-21 to the
owner's list, and **remove** the two push/deploy questions, now answered. **BC-11b leaves the actionable
list** — not because it closed, but because nothing can act on it.

---

# Rev 15 — QA Phase 3's coverage finding widens the residue my approval is conditional on

**Date**: 2026-08-25. **Session**: `uat-hooks-013-3`. **Trigger**: `qa-hooks-013-2`, direct.
**Verdict UNCHANGED**: `APPROVED FOR RELEASE, conditional on the human click-through of BC-18 and
BC-19`, anchored at `4a7126b`. **What changes is what that condition is carrying**, and R13.6
overstated the guard on one of the two surfaces.

**QA reports RELEASE VERIFIED at `4a7126b`** (Phase 3; suite 577/577 exit 0, build exit 0, no
assembly, bundle of one) — the release-tip verdict R13.10 recorded as owed and not this stage's.
**U-5 accepted in full by QA**, corrected in place, and stated in the Phase 3 record so devops cannot
read BC-18/BC-19 as overtaken.

---

## R15.1 — Reconcile note against R13.6: *"instrument-guarded on both surfaces"* was true of one

> **Reconcile note, 2026-08-25 (rev 15). R13.6's superseded text stands as written.**

R13.6 recorded that the converted notices are *"instrument-guarded on both surfaces, by mutation,
against the real components — render, suppress-on-error, clear, and styled"*, with the residue being
**visibility, placement, and the real Next.js mount**. **That is accurate for the paste surface and
overstated for the code-import surface.**

QA's Phase 3 finding, **corroborated here rather than adopted** (`git grep` against `4a7126b`, counts
computed inside git):

| Link in the code-import chain | Executing coverage at `4a7126b` |
|---|---|
| **producer** — `MessageProvider` sets the dropped-types notice state | **none.** `013-qa-toast-vessel-render.test.ts:21` reads `vi.mock('~/providers/MessageProvider', …)` — **the one render test naming the provider mocks it out** |
| **mount** — `layout.tsx` renders `<CodeMessageNotice/>` inside `<MessageProvider>` | **none executing.** `layout` appears only in the two toast tests, as source-text pinning |
| **component** — `CodeMessageNotice` renders / clears / is styled given props | **guarded**, by mutation against the real component (QA's probe, reproduced by the reviewer) |

**The instrument names the gap itself**, and this is sharper than the summary of it —
`013-qa-toast-vessel-render.test.ts:122`, read at write time:

> *"…a live `MessageProvider` context at runtime. A null context would throw in production and pass
> [here]."*

**A failure mode in which production throws and the suite stays green, written into the test that
would stay green.** Disclosed, not hidden — but it is a disclosure this document had not carried.

### R15.1.1 — And this surface has no production evidence either. None.

`CodeMessageNotice.tsx` is **absent at `a151fb4`** — derived in R14.1 by this stage, and it is why the
positive control shows absence rather than a blob mismatch. **The file is new at `abcf585`, so the
code-import notice surface has never executed in production at all.**

Combined with the table above, the honest statement of this surface's evidence is:

> **The component is proven to render in isolation. The layout is proven to *contain the tag* as text.
> Nothing proves the notice appears on the page, and nothing ever has — there is neither an executing
> test of the producer or the mount, nor a single instant of production runtime.** Every link but one
> is unproven.

**Per this stage's rule on operator attestation, this is worth naming precisely**: the surface carries
**both** failure classes. A **silent** one — the notice never appears, and absence generates no
complaint (BC-19, BC-21). And a **loud** one — a null context throws and the page breaks, which would
be caught on the first code import. **Neither has any production evidence, because there has been no
production.**

---

## R15.2 — BC-19's falsity signature, restated because the ask is larger than this document described

R13.6 gave BC-19 as *"is the notice visible and legibly placed."* On the finding above that is too
small. **Recorded beside the original, never over it:**

> **BC-19, restated.** The owner performs **a real code import that drops components** — not a look at
> a page. **Falsity signature, in operator terms**: he imports such a message and either (a) **no
> notice appears at all**, or (b) **the page throws** where it previously worked, or (c) the notice
> appears but is hidden, overlapped or illegible. **(a) and (b) are new to this statement of the row**;
> only (c) was carried before.

**Routed to QA, not performed here — row definitions are QA's.** BC-19 now bundles two questions that
fail in different ways and are settled by different observations: *does it appear at all* and *is it
legible*. **Recommendation: split it.** The first is the one carrying the unproven producer and mount;
the second is the eye check R13.6 described. A row that bundles a silent mode with a loud one is
harder to settle than either alone. **No wording drafted.**

---

## R15.3 — Why the verdict does not move

**The condition already gates this.** BC-19 is exactly the row covering the code-import surface, and
rev 13's approval is conditional on it. A finding that lands **inside** a condition this document
already made blocking does not call for a new verdict — it calls for the condition to be described
correctly, which is R15.1 and R15.2. **Escalating to `NOT APPROVED` for something the ledger already
holds would be theatre.**

**What genuinely changed is the weight, and it is recorded rather than absorbed**: BC-19 went from an
eye check to the only thing standing between this surface and its first production runtime. **The
window U-5 established is what makes that survivable** — `4a7126b` is not released
(`git ls-remote origin master` = `a151fb4`, re-derived at write time), and on QA's finding these rows
do not expire. **The observation can still happen before anything is cut, in rev 13's order.**

**Ledger delta at rev 15**: no row changes state. **BC-19's scope is corrected and widened**; a split
is recommended to QA. Nothing withdrawn.

---

## R15.4 — The instrument-lie class, now four members and a stated predicate

QA verified R14.1.1 and found it **worse than reported**: `git rev-parse <tree>:<absent-path>` not only
echoes its argument to stdout, **it exits 0** — so an `|| echo MISSING` guard **never fires**. The
guard silently does nothing. QA had used that exact form earlier in the session, safe only because all
three paths happened to exist.

**Four members in this chain, and the predicate is worth more than the list:**

| # | Instrument | Lie |
|---|---|---|
| 1 | piped `grep -c` over filtered output | undercounts (46 against a true 51) |
| 2 | `ls -a \| grep -x <name>` | false absence, non-deterministic across identical runs |
| 3 | `git diff --name-only \| grep -c .` | 8 against a true 7 — **observed today** |
| 4 | `git rev-parse <tree>:<path>` on an absent path | echoes the argument, **exits 0**; existence guards never fire |

> **Predicate**: *an existence or count predicate that cannot fail loudly.* Each member returns a
> plausible value where it should have refused. **Remedy in every case: an instrument that computes
> before the filter and fails loudly** — `grep -c`/`grep -rc`, `git diff --numstat`, `ls -d <path>`,
> `git cat-file -e <tree>:<path>`.

**Stated on its own terms so it survives these four instances**, per the document-lifecycle rule that
a rule and the sighting that motivated it separate. Carried to the retrospective, where it belongs with
the rev-13 note that this chain's most reliable defence was re-derivation rather than review.

---

# Rev 17 — BC-19 split adopted, mode (b) retired on evidence, and the F-9 question answered

**Date**: 2026-08-25. **Trigger**: `qa-hooks-013-2`, direct. **Verdict UNCHANGED.** Row definitions
are QA's; this records state and answers a question put to this document.

## R17.1 — F-9: this document never carried the false form. Answer: NO

**Question**: did this document carry QA's false *"every commit since `a151fb4` is test-only"* (F-9)?
The form is false because `a151fb4..4a7126b` contains `abcf585`, which is **four source files**.

**Measured over this document, not recalled:**

- Lines containing **both** `a151fb4` and `test-only`: **0**.
- Total occurrences of `test-only`: **1**, at line 1544 — quoting the reviewer's round-22 verdict, and
  **anchored at `abcf585`**, which is the true anchor.
- R13.5 states the delta as **`abcf585..4a7126b`** throughout.

**Why it never entered.** At rev 13 the delta was **derived from the tree** — `git diff --numstat`
plus per-path blob identity at both tips — rather than restated from QA's `Verified-At-Note`, which is
where F-9 lived. **This is a concrete instance of the predicate carried to the retrospective**, not a
restatement of it: the false form was in a document this stage read, and re-deriving is the reason it
did not propagate. Recorded because evidence for that claim is worth more than the claim.

## R17.2 — BC-19 split: ADOPTED as BC-19a / BC-19b

The split R15.2 recommended is **performed by QA** (`aef3c2e`), whose row it is:

- **BC-19a · `appears-at-all`** — a **real code import that drops components**, not a look at a page.
  Carries the unproven producer and mount. **One successful import refutes *"never appears"* by
  construction.**
- **BC-19b · `legible-and-placed`** — the eye check. **Earliest-decidable depends on 19a**: it cannot
  be observed until 19a produces something to look at.

**The ordering dependency is the part worth having**, and this document did not state it: the unsplit
row read as one observation when it is two, the second conditional on the first. Both remain **`PRE`,
owner, executable now**, and **neither is discharged by the Phase 3 verdict** (release record §5;
`agent-output/qa/release-4a7126b-tip-verification.md`). **BC-18 unchanged.**

## R17.3 — Failure mode (b), *"the page throws"*: RETIRED. Verified, not adopted

R15.2 added **(b) the page throws** to BC-19's falsity signature, on the strength of QA's instrument
comment (*"a null context would throw in production and pass here"*). **QA declines it, and QA is
right: that comment is true about the test and does not establish a live failure mode.**

Re-derived here git-side rather than accepted:

| Claim | Instrument | Result |
|---|---|---|
| `CodeMessageNotice` has one mount site | `git grep -c` at `4a7126b`, `src` | **2 non-test files**: its own definition and `layout.tsx`. **One mount site**, inside `<MessageProvider>` |
| A sibling proves the boundary in production | `git cat-file -e` + `git rev-parse` at three tips | `src/app/message/m/[id]/_layout/Navigation.tsx` = **`339ed840` at `a151fb4`, `abcf585` and `4a7126b`** — matching QA's cited blob |
| …and this release does not touch it | `git diff --name-only a151fb4 4a7126b -- <path>` | **empty — untouched** |
| …and it is literally the sibling slot | `git ls-tree` of the `_layout` directory | that directory holds **exactly two files**: `CodeMessageNotice.tsx` and `Navigation.tsx` |

**So the boundary (b) posited as unproven — async server layout → client component consuming
`useMessage()` inside `<MessageProvider>` — has been running in production continuously**, via a
byte-identical component this release does not touch. The null-context state **cannot arise at the
shipped mount**. **(b) is retired**, and R15.2's statement of it is corrected here rather than left
standing.

> **The reasoning is worth keeping past this row.** An **unreachable** failure is not a reason. Carrying
> (b) would have made a row *already blocking a release* harder to settle while adding nothing an
> observation could discharge — it would have undone the very benefit the split was for. **A widened
> falsity signature is not automatically a better one.** My rev-15 widening was right on (a) and (c)
> and wrong on (b), and the difference is reachability, which I did not test before adding it.

**BC-19's falsity signature therefore stands as: (a) no notice appears at all → BC-19a; (c) the notice
appears but is hidden, overlapped or illegible → BC-19b.**

**Noted, not adopted as a release row**: QA found `useMessage`'s null guard names the **wrong
component** — it throws *"UnsavedWarning components must be wrapped in `<UnsavedWarning />`"*. **Pre-existing,
outside the `a151fb4..4a7126b` delta, so it does not gate `4a7126b`**; routed to the implementer as
diagnosability. Recorded here only because had (b) ever been reachable, the guard would have sent the
investigator to the wrong component.

## R17.4 — The instrument class gains two sightings, from this pass's own verification

Both hit while checking R17.3, both the same predicate, **both caught by a contradiction rather than by
re-reading**:

| # | Instrument | Lie |
|---|---|---|
| 5 | `git cat-file -e <tip>:<guessed-path>` | Returned **ABSENT** for `src/components/Navigation.tsx` — a path that never existed. **Absent-because-wrong-path is indistinguishable from absent-because-not-there.** Had it been reported, it would have contradicted a true claim of QA's |
| 6 | `git rev-parse "$t:$P"` with **`$P` empty** | Returned **three different plausible 8-char hashes** — the *root tree* SHA at each tip. An empty path variable yields a confident, differing, entirely wrong answer |

**Sighting 6 is the sharpest member yet** and is why the predicate is worth stating on its own terms:
it did not fail, it did not return a null, and it did not repeat itself — **it returned three
*differing* values, which is exactly what a real difference looks like.** Nothing in the output
announced that the question asked was not the question intended. **Remedy in both cases: name the path
from the tree (`git ls-tree`), then assert existence before comparing.**

**Six members now, predicate unchanged**: *an existence or count predicate that cannot fail loudly.*

## R17.5 — State

**Release decision UNCHANGED**: `APPROVED FOR RELEASE, conditional on the human click-through of
BC-18, BC-19a and BC-19b`, anchored at `4a7126b`. **The condition is narrower and better ordered than
at rev 15, and nothing was withdrawn** — (b) was retired on evidence by the row's owner, which is the
register working. **UAT Complete.**
