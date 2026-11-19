---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: In Progress
Status-Detail: "Revision 7 approved by all three gates (critic 2ed550b, architect 0e380fc, QA Phase 1 re-key 7eda138). M5-0 is met: limb 2 kept alive, limb 3 lasts to 55 s (deployment record 8f26f37), so T = 40 s stands. M5, M6 and M8 are in implementation on revision 7 (steering's start, rulings block 2026-11-19T05:19Z). M1 to M4 are through code review and QA Phase 2 at website 5c3d03f. M7 is last."
Revision: 7
Plan-ID: 017
Target-Release: "website master (Vercel production) first, then preview-image-generator prod (prod.yml), each push his word, run by devops. Order and reason: § Release and rollback. Neither package.json carries a version field (git show 1ad625e:package.json, 8de2b53:package.json), so no version artifact moves."
Epic-Alignment: "Hooks.gg existing-items queue: the commission of 2026-11-18T21:53Z (items 2 to 5 of the five-item ranking), under his 2026-11-11 ruling that new feature work waits until the existing items are handled (steering/queue-hooks-rulings.md, selection 2)."
Lane: "full chain, set by the scoping determination (rulings block 2026-11-18T21:59Z, Pipeline). Not proposed small: M5 changes the shared save path and a second service's contract; M2 changes the notice every editor tab runs; M3 changes the browser-stored draft every editor reads; M4 adds a context above every /message page."
Architectural-Surface: "Yes; the architect's conformance pass is a named step (stage set). (1) A cross-repo contract: bucket deletion moves from the generator to the website, the stored preview nonce commits only after the generator's answer, and the key form [dev/]previews/<id>/<nonce>.jpeg is decided on each side by a named variable (M5, M6). (2) Post-response work in the save path through @vercel/functions waitUntil, a new dependency (M5). (3) A stored representation: the browser's draft storage, a new typed key and a per-tab id (M3). (4) A navigation-guard context mounted at src/app/message/layout.tsx, with its own ConfirmationProvider instance and ConfirmationDialog (M4). Architecture lines the chain closes or invalidates: system-architecture.md Runtime Flow 3 (who deletes; the key form), Problem Areas rows 'A failed preview generation shows a broken image', 'enforceImportMutualExclusivity is dead', 'ESLint carries known findings'; Recommendations 1, 4, 6; website.md A-6 (persist also records the tab's own save), A-7 (the draft key and its one reader), A-8 (the providers below the message layout's header and sidebar). From M8 (revision 5): system-architecture.md Problem Areas row 'Enter-to-confirm in dialogs rests on an unidentified mechanism'. Its dead compare is gone at all three sites; the stopping mechanism stays unidentified (X-20). M8 adds no architectural surface: it changes where two leaf dialogs' Enter listens, in the form M4 gave ConfirmationDialog."
---

# Plan 017 — the existing-items backlog: stale previews, the saving tab's own notice, signed-out edits, hygiene

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-18T22:11 | 0 | planner-hooks-new | Created from the scoping determination (rulings block 2026-11-18T21:59Z) and the commission (block 21:53Z). User stories, inherited rulings, scope questions and the analysis commission; no milestones. Scope delta: none (first revision); sized against the ask, four items, no feature. |
| 2026-11-18T22:24 | R-1 | planner-hooks-017 | OQ-6 restated by replacement: its premise, that the lint script exits 2 at the base, was refuted by steering-roadmap (`verification/017/steering-refute/`). The error was this planner's: a helper's run in an export was taken as the tree's. The base count was re-taken at `verification/017/entry/lint-base/`; the `eslint-395510e-*` captures beside it are the refuted export runs. Gate disclosed: the record-write gate refused a shell heredoc for `lint-base/README.md`, which was written with the Write tool. Scope delta: none. |
| 2026-11-18T22:44 | R-2 | planner-hooks-017 | Registered for revision 1 (Planner batch): chain A's CR-3 INFO (`code-review/closed/fix-dialog-closes-on-first-portal-load-code-review.md`, CR-3) and the base moving to website `1ad625e` (chain A released 22:41Z), both relayed by steering-roadmap. |
| 2026-11-18T23:17 | R-3 | planner-hooks-017 | Commissioned AN-4 (§ "Analysis commissioned"): the generator's production render times, read under steering's ruling `steering/017-rulings.md` block 2026-11-18T23:15Z. |
| 2026-11-18T23:18 | 1 | planner-hooks-017 | Milestones M1 to M7, Decisions D-7 to D-13, Exclusions, Risks and Release written from his six selections of 23:08Z (`steering/017-rulings.md` block 23:08Z) and analysis 017 (`1534ec4`: AN-1 to AN-3, G-1; `b7b4d08`: AN-4). OQ-1 to OQ-6 resolved in place; OQ-7 opened (gate M5-0); all three Planner batch rows discharged. Scope delta: M1 to M7 added (rev 0 had none). Against the ask: item 4 is larger than its handoff (D-11 adds the three stored-draft losses), and item 5's lint limb is smaller (D-9, record only); items 2 and 3 are as asked, with item 3 reduced to one live path plus a pinned absence (AN-1). |
| 2026-11-18T23:27 | R-4 | planner-hooks-017 | Registered D-14 to D-16, his three selections on revision 1; words in `steering/017-rulings.md` block 2026-11-18T23:26Z (`dda0356`) and the 23:26Z ledger block. Scope delta: none (registration only). |
| 2026-11-18T23:57 | 2 | planner-hooks-017 | Folds the three gate verdicts on revision 1: critique cycle 1 pass 1 (`aa2e8ef`, F-1 to F-18), the architect's conformance pass (`406b34a`, AF-1 to AF-9) and QA Phase 1 (`d1add83`, `06511f1`, QAF-1 to QAF-9 with the QAF-9 reconcile); disposition of every finding in § "Gate findings folded". OQ-8 to OQ-10 opened for him; D-17 registered (steering's 23:41Z Standing Default). Scope delta: no milestone added or removed; M3 gains a named storage form, a write matrix, a preservation limb for the other stored keys and an unload-exit table; M4 gains a navigation-guard context and moves `ConfirmationProvider` up a layout (OQ-10); M5 gains an ordered nonce, a deletion form, the cross-repo key contract and a fixed log prefix; M5-0 gains three outcomes and a control line; M6 gains a provision step and per-class failure lines. Against the original ask: what each item delivers is unchanged; the mechanism under items 2 and 4 is larger. |
| 2026-11-19T00:12 | R-5 | planner-hooks-017 | Registered D-18 to D-21, his four selections on revision 2 (OQ-8, OQ-9, OQ-10, X-17 to X-19); words in `steering/selection-ledger/2026-11-19.md` block "2026-11-19T00:10Z — steering-roadmap" and `steering/017-rulings.md` block 2026-11-19T00:11Z (`7c14195`). Scope delta: none — registration only. |
| 2026-11-19T00:15 | 3 | planner-hooks-017 | Folds critique cycle 1 pass 2 (`51805f4`: F-19 to F-23; SL-1 and SL-2 members fixed), the architect's delta approval (`5ee7b89`: AF-16 to AF-18), QA's Phase 1 re-key (`df45dde`: QAF-10 to QAF-12, EC-1, EC-2, NM-22 to NM-25), his D-18 to D-21 into the criteria, and steering's two candidates (`steering/017-rulings.md` block 00:06Z), each re-derived. M4's dialog form now rides D-20 (its own provider instance at the layout instead of moving the editor's); disposition table § "Gate findings folded". OQ-11 to OQ-13 opened for him (F-19). Scope delta: no milestone added or removed; M3 gains a byte bound and a matrix row; M4's dialog form changes inside D-20; M5 gains a lock-read statement form, a real-Postgres lane, an age reference on the committed object and a 12-hour reader. Against the original ask: what each item delivers is unchanged. |
| 2026-11-19T00:23 | 4 | planner-hooks-017 | Folds critique cycle 1 pass 3 (`97b96e3`: F-24, F-25), the architect's delta read (`26f648e`: AF-22) and QA's re-key on revision 3 (`0137fa0`: QAF-13, QAF-14, NM-26 to NM-28, and its LastModified assumption); disposition table § "Gate findings folded". OQ-11 and OQ-12 reworded from a four-pair table, while both are with him unanswered (put 00:21Z). Scope delta: none in milestones or delivery; M3-h reads from the table; M4-a names how the guard reaches its dialog; M5-c form 3 deletes nothing when its own object is missing; M5-g's falsifier is B-6; RK-7 gains a liveness precondition. |
| 2026-11-19T00:28 | R-6 | planner-hooks-017 | Registered D-22 to D-25, his four selections on revision 3 (OQ-11, OQ-12, OQ-13 all option a; X-18's third case); words in `steering/selection-ledger/2026-11-19.md` block "2026-11-19T00:26Z — steering-roadmap" and `steering/017-rulings.md` block 2026-11-19T00:27Z (`a9e2ed3`). OQ-11 to OQ-13 marked resolved, OQ-13's withdrawn option-(b) figure noted, QA's revision-4 verdict (`3af80aa`) and steering's architect routing recorded in the owed re-verdicts. Scope delta: none — registration only. |
| 2026-11-19T00:30 | R-7 | implementer-hooks-017 | Status set to In Progress: implementation starts on revision 4 at steering's start (`steering/017-rulings.md` block 2026-11-19T00:29Z), website chain branch `chain/017-existing-items-backlog`. Status write only; no criterion moves. |
| 2026-11-19T00:45 | R-8 | code-reviewer-hooks-017 | Code review, M1 only, round 1: APPROVED_WITH_COMMENTS at website `8147661` (`code-review/017-existing-items-backlog-code-review.md`, agent-output `725e441`). CR-1 LOW: D-9 covers the five eslint findings left in `limits.import-validation.test.ts`. CR-2 INFO: routed to `INBOX.md`. Milestone-scoped verdict, so plan Status is unmoved; no criterion moves. |
| 2026-11-19T00:56 | R-9 | qa-hooks-017 | QA Phase 2, M1 only: PASS (`QA Complete`) at website `8147661` (`qa/017-existing-items-backlog-m1-qa.md`). Suite 1505 of 1505, exit 0, re-run in an export; M1-a, M1-b and M1-c verified; 14 of 14 M1-c mutants killed. QAF-15 LOW (the lint base figure for `limits.import-validation` is 7, not 21; M7-b still holds) and QAF-16 LOW (a pre-existing React stub, carried to M2's pass). Milestone-scoped verdict, so plan Status is unmoved; no criterion moves. |
| 2026-11-19T01:17 | R-10 | code-reviewer-hooks-017 | Code review, M2 only, round 2: APPROVED_WITH_COMMENTS at website `ec984fe` (`code-review/017-existing-items-backlog-code-review.md`, agent-output `45d2c8d`). CR-3 MEDIUM is routed to QAF-16's disposition at QA Phase 2. CR-4 LOW: a disposition line owed in the M2 document. Milestone-scoped, so plan Status is unmoved; no criterion moves. |
| 2026-11-19T01:26 | R-11 | qa-hooks-017 | QA Phase 2, M2 only: QA Failed at website `ec984fe` (`qa/017-existing-items-backlog-m2-qa.md`). M2's behaviour holds: suite 1542 of 1542, exit 0; the AN-1 re-run shows M2-b fixed; 11 of 12 mutants killed. QAF-17 MEDIUM blocks: an M2-b interleaving (another tab's broadcast inside the window) has no assertion. The remedy is test-only, and QA supplies the case. QAF-16 dispositioned with CR-3 (fix at `442059d`, read at the refresh). Milestone-scoped verdict, so plan Status is unmoved; no criterion moves. |
| 2026-11-19T01:27 | R-12 | code-reviewer-hooks-017 | Code review M2 round 2 verdict corrected: APPROVED_WITH_COMMENTS → REJECTED at website `ec984fe` (agent-output `af518e9`). CR-5 MEDIUM duplicates QAF-17; a test-only fix returns as a sub-entry. Milestone-scoped; plan Status is unmoved; no criterion moves. |
| 2026-11-19T01:48 | R-13 | code-reviewer-hooks-017 | Code review, M2 round 2 sub-entry: the test-only fix is confirmed APPROVED at website `dd26104` (agent-output `fb4c5f3`). CR-5 and CR-3 are gone, CR-4 is recorded. Milestone-scoped; plan Status is unmoved; no criterion moves. |
| 2026-11-19T01:49 | R-14 | qa-hooks-017 | QA Phase 2 refresh, M2 only: PASS (`QA Complete`) at website `dd26104` (`qa/017-existing-items-backlog-m2-qa.md`), superseding R-11's QA Failed at `ec984fe`. Suite 1606 of 1606, exit 0; 14 of 14 M2 mutants killed. QAF-17 and QAF-16 (CR-3) are RESOLVED. M3's changes in the tree are outside this verdict. Milestone-scoped verdict, so plan Status is unmoved; no criterion moves. |
| 2026-11-19T02:25 | R-15 | code-reviewer-hooks-017 | Code review, M3 only, round 3: REJECTED at website `3498ef3` (agent-output `7e3bad7`). CR-6 MEDIUM and CR-7 MEDIUM (severity floor; test-only remedies, plus a captured `1ad625e` reader run for M3-f); CR-8 LOW asks for a deviation line on the write matrix's fetch row, for the planner's next revision. Milestone-scoped; plan Status is unmoved; no criterion moves. |
| 2026-11-19T02:32 | R-16 | code-reviewer-hooks-017 | Code review, M3 round 3 sub-entry: the test-only fix is confirmed APPROVED at website `1ab3b96` (agent-output `457d142`). CR-6 and CR-7 are gone; CR-8 is recorded as a write-matrix deviation for the planner's next revision. Milestone-scoped; plan Status is unmoved; no criterion moves. |
| 2026-11-19T03:01 | R-17 | qa-hooks-017 | QA Phase 2, M3 only: PASS (`QA Complete`) at website `1ab3b96` (`qa/017-existing-items-backlog-m3-qa.md`). Suite 1620 of 1620, exit 0. The bounded E-7 sweep over M3's production diff detected 73 of 78 scored mutants, and the 5 survivors are equivalent. M3-f shown against the `1ad625e` reader with a planted control. No finding. Milestone-scoped verdict, so plan Status is unmoved; no criterion moves. |
| 2026-11-19T03:25 | R-18 | code-reviewer-hooks-017 | Code review, M4 only, round 4: REJECTED at website `de06d95` (`code-review/017-existing-items-backlog-code-review.md`, agent-output `97cffb5`). CR-9 HIGH: with the link prompt and the update prompt open together, one Enter answers both (`ConfirmationDialog` binds Enter at the document), against M4-b's "each is answered on its own"; probe and planted control in `verification/017/code-review/m4/probe-enter-both/`. CR-10 LOW and CR-11 LOW ride the same fix round. Milestone-scoped; plan Status is unmoved; no criterion moves. |
| 2026-11-19T03:39 | R-19 | code-reviewer-hooks-017 | Code review, M4 round 4 sub-entry: the fix is confirmed APPROVED at website `a5dd76f` (agent-output `e12881a`). CR-9, CR-10 and CR-11 are gone, and 6 of 6 re-attack mutants were killed. Milestone-scoped; plan Status is unmoved; no criterion moves. |
| 2026-11-19T04:14 | R-20 | qa-hooks-017 | QA Phase 2, M4 only: **QA Failed** at website `a5dd76f` (`qa/017-existing-items-backlog-m4-qa.md`). Suite 1693 of 1693, exit 0. Sweep over M4's production diff: 52 of 55 mutants killed. NM-8, NM-9, NM-24, NM-25 and NM-29 were each killed by QA's own mutant. QAF-18 MEDIUM: the case for an older guard's withdrawal cannot fail (survivor `qa-unregister-unconditional`). The fix is test-only, to the implementer. QAF-19 LOW: one title prints the wrong column. Register row B-12 appended. Milestone-scoped verdict, so plan Status is unmoved; no criterion moves. |
| 2026-11-19T04:16 | R-21 | planner-hooks-017 | Registered QAF-19 LOW (`qa/017-existing-items-backlog-m4-qa.md`, `de8d171`) in the Planner batch as a stated limit under steering's M4 cap (`steering/017-rulings.md` block 2026-11-19T04:14Z, `a805d4d`). Scope delta: none (registration only). |
| 2026-11-19T04:20 | R-22 | code-reviewer-hooks-017 | Code review, M4 round 4 sub-entry: QAF-18's test-only fix is confirmed APPROVED at website `5c3d03f` (agent-output `33b90ce`). 4 of 4 registration mutants were killed, QA's `qa-unregister-unconditional` among them. Milestone-scoped; plan Status is unmoved; no criterion moves. |
| 2026-11-19T04:22 | R-23 | qa-hooks-017 | QA Phase 2, M4 refresh: PASS (`QA Complete`) at website `5c3d03f` (`qa/017-existing-items-backlog-m4-qa.md`), superseding R-20's QA Failed at `a5dd76f`. The round is one test-only commit. Suite 1693 of 1693, exit 0. `qa-unregister-unconditional` is killed by the repaired case, so QAF-18 is RESOLVED. QAF-19 stays parked (R-21). Milestone-scoped verdict, so plan Status is unmoved; no criterion moves. |
| 2026-11-19T04:57 | 5 | planner-hooks-017 | Adds M8 from his 04:50Z selection (D-26; `steering/017-rulings.md` block 2026-11-19T04:50Z, `ac98bf6`) and steering's brief: in `WarningDialog` and `ImageUploader`, Enter answers only the dialog holding focus, with CR-9's Preferred form mirrored from M4's `ConfirmationDialog` (`a5dd76f`). Value statement 5 is proposed for his approval (OQ-14); X-7 is retired into M8-d, with X-20 for what stays; RK-11 is added. The three M4 and M3 record corrections are carried as Planner batch rows to the post-Phase-2 seam, not folded, because they change no code, test or verifier. Scope delta: M8 added (one milestone, two leaf files, after code start, by his selection); no other milestone moves; against the original ask, item 4's work grows by M8. Gate rounds: the critic, the architect and QA Phase 1 on revision 5, then one code review and one QA Phase 2 for M8; the stated-limit alternative was his declined option "record it, don't fix". No standing verdict expires (M8's files are outside M1 to M4's diffs). |
| 2026-11-19T05:05 | R-24 | planner-hooks-017 | Registered D-27 to D-29. D-27 and D-28 are his probe-push approval and his bypass-secret revocation (`steering/selection-ledger/2026-11-19.md` blocks "2026-11-19T04:55Z — devops-hooks-017" and "2026-11-19T04:58Z — devops-hooks-017"; deployment record `d61f445`). D-29 is his wording for statement 5 (ledger block "2026-11-19T05:01Z — steering-roadmap"; `steering/017-rulings.md` block 2026-11-19T05:01Z, `a949b03`). OQ-7 and OQ-14 are resolved. Scope delta: none (registration only). |
| 2026-11-19T05:05 | 6 | planner-hooks-017 | Folds steering's two 05:01Z briefs (`steering/017-rulings.md` blocks 2026-11-19T05:01Z). M5-0 gains limb 3 (OQ-15): limb 2's probe settled 5 s after the response and made no generator call (`d61f445`, "What this does not establish"), while T = 40 s needs post-response work to run until 55 s from the request's start. Statement 5 takes his wording (D-29); M8's direction line takes steering's focus run; M5-f names its premise and its first real member; RK-2's falsifier and X-20's reason are updated. Scope delta: M5-0 gains limb 3, a pre-code gate costing one more probe push if he approves it, which drops to RK-2 if he does not; M8's criteria are unchanged; revision 5 was never routed, so the gates read revision 6 once. Against the original ask: as at revision 5. Gate rounds: the same three reads as revision 5, now on revision 6. |
| 2026-11-19T05:08 | R-25 | planner-hooks-017 | Registered D-30, his OQ-15 answer (push limb 3's probe); words in `steering/017-rulings.md` block 2026-11-19T05:06Z (`3c24ead`) and the ledger block it names. OQ-15 resolved; Status-Detail's limb 3 clause brought current. Scope delta: none (registration only). |
| 2026-11-19T05:09 | R-26 | planner-hooks-017 | Recorded the architect's conformance read on revision 6: APPROVED stands, with AF-23 INFO (`architecture/017-existing-items-backlog-architecture-findings.md`, `635868d`). AF-23 is held for one fold with the critic's and QA's verdicts. Scope delta: none. |
| 2026-11-19T05:16 | 7 | planner-hooks-017 | Folds the three verdicts on revision 6: critique cycle 2 pass 1 (`6d55bfc`: APPROVED; F-26 to F-28 LOW, SL-4), the architect's conformance read (`635868d`: APPROVED stands; AF-23 INFO) and QA's Phase 1 re-key (`b974198`: QAF-20 and QAF-21 MEDIUM), plus limb 3's result (deployment record `8f26f37`: lasts to 55 s, QAF-21's five checks answered from a whole capture). M8-b's table and M8-c name the focus position, with the red rows in U off its buttons (QAF-20, SL-4); M8-a gains the `useDocumentEventListener` listing (F-26); M8's form prefers the lifted check and places the ref inside each instance's panel (AF-23); M5-0 limb 3 states its read checks, its read boundary and a complete outcome rule (QAF-21, F-27), and records its result; two revision labels are corrected (F-28). Scope delta: none in milestones; M8's criteria now say where focus sits (what they require is unchanged in kind, but they can now fail at `5c3d03f`); M5-0 limb 3 is closed as met. Against the original ask: as at revision 5. Gate rounds: the critic's delta-bounded pass 2 and QA's re-key, plus the architect's delta read of AF-23's fold if steering routes one. |
| 2026-11-19T05:18 | R-27 | planner-hooks-017 | Recorded the architect's delta read on revision 7: APPROVED stands, no finding, AF-23 closed (`architecture/017-existing-items-backlog-architecture-findings.md`, `0e380fc`). Scope delta: none. |
| 2026-11-19T05:18 | R-28 | planner-hooks-017 | Recorded QA's Phase 1 re-key on revision 7: no finding, QAF-20 and QAF-21 resolved, EC-3 and EC-4 entry conditions added (`qa/017-existing-items-backlog-qa.md` § "Phase 1 re-key on plan revision 7", `7eda138`). Scope delta: none. |
| 2026-11-19T05:24 | R-29 | implementer-hooks-017 | Status stays In Progress; Status-Detail brought into agreement: M5, M6 and M8 implementation starts on revision 7 at steering's start (`steering/017-rulings.md` block 2026-11-19T05:19Z, `04a5e55`), website `chain/017-existing-items-backlog` and generator `chain/017-existing-items-backlog` (`8de2b53`). Status-Detail write only; no criterion moves. |
| 2026-11-19T05:41 | R-30 | code-reviewer-hooks-017 | Code review, M8 only, round 5: APPROVED_WITH_COMMENTS at website `c37d41a` (`code-review/017-existing-items-backlog-code-review.md`, agent-output `4950989`). CR-12 LOW is a record line: the image dialog's tests stand in a `FakeImage`, which the M8 document does not name. 8 of 8 reviewer mutants were killed, and M8-c's lone-dialog literals were reproduced at `1ad625e`. Milestone-scoped; plan Status is unmoved; no criterion moves. |

## Reading Order

| Role | Sections, in order |
|---|---|
| implementer | Decisions Register · Plan (the `### M…` heading being coded) · Testing Strategy · Exclusions · Release and rollback |
| code-reviewer | Decisions Register · Plan · Exclusions · Risks |
| qa | Plan · Testing Strategy · Validation · Risks · Gate findings folded |
| uat | Value Statement and Business Objective · Plan (each "Human-observable form" line) · Exclusions |
| devops | Release and rollback · Entry facts (per repository) · `### M5 — …` (M5-0) · `### M7 — …` · Risks |

Owed re-verdicts:

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| Revision 4 delta (OQ-11/OQ-12 table, M3-h, M4-a dialog reach, M5-c missing-reference rule, M5-g falsifier, RK-7 liveness) | revision 4 commit | critic, cycle 1 pass 4 | passed: APPROVED, critique closed (`77dfec4`) |
| M5-c's missing-reference rule (QAF-13) in the oracle; M4-b's two-level layout member; B-10's liveness rows | revision 4 commit | QA Phase 1 re-key | passed, no finding (`3af80aa`) |
| Revision 4 delta, as a conformance read (steering's routing, 00:27Z block) | revision 4 commit | architect, conformance read | passed: APPROVED, no finding (`96b4b62`) |
| Revisions 5 and 6 delta: M8, D-26 to D-29, value statement 5, X-7 retired, X-20, RK-11, § Plan's order line; M5-0 limb 3 with OQ-15, M5-f's premise and first real member, RK-2, OQ-7 and OQ-14 resolved | revision 6 commit | critic, new cycle | passed: APPROVED, cycle 2 pass 1 (`6d55bfc`); F-26 to F-28 folded at revision 7 |
| The same delta, as a conformance read (the Architectural-Surface line's M8 sentence included) | revision 6 commit | architect, conformance read | passed: APPROVED stands (`635868d`); AF-23 folded at revision 7 |
| M8-a to M8-d keyed into the register and named mutants; M8's human-observable row; M5-0 limb 3's outcomes and its capture | revision 6 commit | QA Phase 1 re-key | QAF-20 and QAF-21 MEDIUM (`b974198`), folded at revision 7 |
| Revision 7 delta: M8-a's third listing, M8-b's table with focus positions, M8-c's off-button rows, M8's human-observable focus step, M8's form (AF-23), M5-0 limb 3's read rule and result, F-28's labels | revision 7 commit | critic, cycle 2 pass 2 (delta-bounded) | owed |
| The same delta, re-keyed: NM-30 to NM-38 against M8-b's red rows and M8-c's off-button rows; B-13, B-14 | revision 7 commit | QA Phase 1 re-key | passed, no finding; QAF-20 and QAF-21 resolved; EC-3 and EC-4 added for the implementer (`7eda138`) |
| AF-23's fold, the line "The form, mirrored" only | revision 7 commit | architect, delta read | passed: APPROVED stands, no finding; AF-23 closed (`0e380fc`) |

## Value Statement and Business Objective

One statement per item. Each is delivered by this chain and none is deferred. He approved the first
four as worded (D-7), and the fifth, added with M8 at revision 5, in his selected wording (D-29).

1. **Stale, not broken, previews (item 2).** As a Hooks user who has saved a message, I want the
   message's preview image to keep showing the last image that was made when a new one cannot be
   made, so that a generator outage or a failed render never leaves a broken image where my message
   used to be. His words: *"Show a stale one is fine."* (`architecture/preview-image-generator.md`
   P-6).
2. **The saving tab is not told about its own save (item 3).** As a Hooks user editing a message, I
   want "Message Update Detected" to appear only when a *different* tab or person has saved the
   message, so that the warning keeps meaning something and I do not learn to dismiss it. His
   report, verbatim (BC-14, 2026-08-25): *"Everything is fine except "Message Update Detected" still
   occurs on save in the tab the save executed."*
3. **Signed-out edits are not lost without a warning (item 4).** As a user who is not signed in and
   has edited a message, I want to be warned before an action throws those edits away, so that I do
   not lose work silently. Stated so he sees it (determination, item 4 "In"): the in-app navigation
   guard has never worked for anyone; making it work makes it work for signed-in users too.
4. **Hygiene (item 5).** As the owner, I want the website's known lint findings cleared or accepted,
   the dead mode-rule function removed or rerouted, six test files moved beside their modules and the
   editor's error-line text asserted, so that the next change to these files starts from a clean,
   checked base. No behaviour changes.
5. **One Enter answers one dialog (M8, D-29).** As a Hooks user editing a message, I want Enter to
   answer only the dialog I am in, so that pressing Enter on 'Message Update Detected' does not also
   delete an embed field or set an image in the dialog underneath. (His wording, by selection, D-29.)
   Steering's helper executed the direction at website `5c3d03f` (rulings block 2026-11-19T05:01Z).
   With focus in the delete warning or the image dialog, Enter fires only that dialog. With focus in
   "Message Update Detected" off its buttons, it fires Reload and the dialog underneath. The
   defect, verbatim from the reviewer's FYI (`agent-output/INBOX.md`, 2026-11-19,
   code-reviewer-hooks-017): *"While one of them is open and the editor's update prompt ("Message
   Update Detected") is raised by another tab's save, one Enter would answer both."*

The defect statements, quoted from their reports: item 2, the handoff: *"So the failure mode is a
**broken image**, not a stale one."* Item 3: his BC-14 sentence above. Item 4, the handoff: *"every
unsaved-changes guard in the message editor is gated on the user being authenticated, so for an
unauthenticated user they are inert"*. Reframing, marked as one: analysis AN-2 found that reload or
close loses nothing for a signed-out user, so item 4's delivered value is the three stored-draft
losses (D-11), with the guards turned on to match signed-in behaviour.

## Objective

Deliver the four statements, discharge the carriers the determination names (the four item
handoffs, `handoff/website-tests-not-beside-their-module-2026-11-08.md`,
`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md`, and
`architecture/system-architecture.md` Recommendations 1, 4 and 6), and release both repositories to
production.

## Decisions Register

Settled decisions that bind this plan. Where his answer was a selection, the verbatim column holds
the option he selected, which is agent-authored text (author named). Route for D-7 to D-12: a
selection-prompt answer, 2026-11-18T23:08Z, ledger `steering/selection-ledger/2026-11-18.md` block
"2026-11-18T23:08Z — steering-roadmap" (questions 1 to 4 from line 32, 5 and 6 from line 65), put by
steering-roadmap from option text this planner drafted.

| D | Decision | Date | His words, verbatim, and route | Reopening class (observable through) |
|---|---|---|---|---|
| D-1 | Items 2 to 5 are worked; order and grouping are steering's, his to veto | 2026-11-18 | *"Do all 5 in whatever order and group however you determine best."* Witnessed by steering-roadmap, rulings block 2026-11-18T21:53Z | Owner withdrawal only. |
| D-2 | A failed generation should leave a stale preview showing; the save does not block | 2026-08-24 | *"Show a stale one is fine."* His answer to "show no preview, show a stale one, or block the save?", recorded owner-authored in `architecture/preview-image-generator.md` P-6 | Owner withdrawal only. |
| D-3 | Keep-only-latest is intended; no retention requirement exists | 2026-08-24 | *"Intended. There's no purpose for retention."* (corrected by him the same day from a typo). `architecture/preview-image-generator.md` P-5 | Owner withdrawal only. M5's brief coexistence of objects is a new requirement justified by D-2 and stated as one (M5-c). |
| D-4 | The back end stores what the front end allows; no server-side gate on save | 2026-08-24 | *"…I'd say that the back-end reflects what the front-end allows. If a shape is allowed in the front-end, then it's not silently morphed in the back-end…"* (full text `architecture/website.md` W-2; D-005) | Owner withdrawal only. |
| D-5 | Cross-tab divergence is flagged, not coordinated | 2026-08-24 | *"…flag when front-end state doesn't match back-end because of a different tab saving"*. `architecture/website.md` W-6 | Owner withdrawal only. M2 keeps the cross-tab flag (BC-14 limb c) and adds no merge or lock. |
| D-6 | No new feature work in this chain | 2026-11-11 | *"…this new stuff is planned after the existing items are handled"*. `steering/queue-hooks-rulings.md`, selection 2 | Owner withdrawal only. |
| D-7 | The four user stories are approved as worded | 2026-11-18 | Selected: "Agent: proceed on all four (Recommended)". Shown: "The planner writes milestones for all four stories as worded, in revision 1." | Owner withdrawal only. |
| D-8 | The website logs one line per failed or unreachable preview; nothing user-facing | 2026-11-18 | Selected: "Agent: website logs failures (Recommended)". Shown: "The website writes one line per failed or unreachable preview to Vercel's logs. No user sees anything; failures become countable." | Owner withdrawal only. Consequence: the website learns each generation's outcome after the save replies, so M5's mechanism is post-response work (OQ-3). Limit of the selection, stated to him at revision 2 and not a reopening: a line lasts about a day in Vercel's logs (Vercel's Pro documentation: 1 day; the CLI refuses `-s 1d` and serves `-s 23h`, D-17's read), so "countable" holds for a reader that runs at intervals shorter than that window: every 12 hours (M5-f). Criteria: M5-f. |
| D-9 | Lint: record the base result as accepted, fix none | 2026-11-18 | Selected: "Agent: accept, fix none (Recommended)". Shown: "Record today's result as the known baseline; no source files change, so the chain's diff stays on its four items." | Owner withdrawal only. Criteria: M7-a, M7-b; Exclusions X-11, X-12. |
| D-10 | The Vercel project settings are read read-only under the hooks-gg team | 2026-11-18 | Selected: "Agent: read under hooks-gg (Recommended)". Shown: "The analyst runs 'vercel project inspect hooks-gg-website --scope hooks-gg', read-only, and records both values." | Executed by the analyst (analysis 017 `1534ec4`, G-1): a 60 s function timeout (Observed); no Fluid compute (Inference: AN-3 grades "the default is the effective setting" so; no criterion rests on it). Reopens on a change to the project's function settings (the same read). |
| D-11 | Item 4: fix the stored-draft losses at their source and turn the existing warnings on signed out | 2026-11-18 | Selected: "Agent: fix at source + warnings (Recommended)". Shown: "Fix the shared-draft losses at their source, so a draft survives sign-in, another tab and the expired-session sign-out, and turn the existing warnings on for signed-out users too. More work than the handoff; revision 1 prices it." | Owner withdrawal only. Criteria: M3. Price: M3's scope (§ Plan). The sign-in exit's warning, which the shown text did not cover, is OQ-8; it does not reopen this row. |
| D-12 | Warn on a link click away from an editor with unsaved changes, for everyone; record what cannot be stopped | 2026-11-18 | Selected: "Agent: warn on link clicks (Recommended)". Shown: "Warn when someone clicks a link away from an editor with unsaved changes, for everyone (a new prompt signed-in users will see), and record the navigations that can't be stopped as a known limit." | Owner withdrawal only. Criteria: M4; limit: X-14. The form M4 needs (a context above the editor's providers) is OQ-10. |
| D-13 | AN-4's host read is made without asking him | 2026-11-18 | Agent-authored, by steering-roadmap: a read through the read-only alias `ssh hooks-pig` is made under the lifecycle Standing Default (`steering/017-rulings.md` block 23:15Z). Not his words. | Withdrawal by him or by steering. |
| D-14 | Scope M1 to M7 confirmed; implementation waits for the critic, the architect and QA Phase 1 to approve | 2026-11-18 | Selected: "Agent: confirm M1–M7 (Recommended)". Shown: "The critic, the architect and QA Phase 1 start on revision 1 now. Implementation waits until those three gates approve." Selection-prompt answer, 2026-11-18T23:26Z; ledger `steering/selection-ledger/2026-11-18.md` block "2026-11-18T23:26Z — steering-roadmap"; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. |
| D-15 | OQ-7 proceeds open; the probe push is not approved by this answer | 2026-11-18 | Selected: "Agent: proceed with it open (Recommended)". Shown: "The gates and M1–M4 and M7 go ahead. Before M5 code, a devops session asks you for the probe push. If the probe fails, M5 and M6 stop and come back to you with the fallback." Selection-prompt answer, 2026-11-18T23:26Z; ledger `steering/selection-ledger/2026-11-18.md` block "2026-11-18T23:26Z — steering-roadmap"; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. The chosen option's stop condition, verbatim: "If the probe fails, M5 and M6 stop and come back to you with the fallback." Which probe outcome "fails" names is OQ-9. |
| D-16 | Exclusions X-1 to X-16 accepted as written; X-13's placement question stays in the record's inbox | 2026-11-18 | Selected: "Agent: accept all 16 (Recommended)". Shown: "The plan keeps X-1 to X-16 as written. X-13's question about a test-placement exception in CLAUDE.md stays in the record's inbox for that record's owner." Selection-prompt answer, 2026-11-18T23:26Z; ledger `steering/selection-ledger/2026-11-18.md` block "2026-11-18T23:26Z — steering-roadmap"; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Revision 2 restated X-5's reason (AF-2) and added X-17 to X-19, which D-21 covers. Revision 5 retires X-7 under D-26. |
| D-17 | QA's read of Vercel production runtime logs is made without asking him | 2026-11-18 | Agent-authored, by steering-roadmap: the read is made under the lifecycle Standing Default (`steering/017-rulings.md` block 2026-11-18T23:41Z). Not his words. Result: `verification/017/qa-phase1/vercel-runtime-logs/` (record `06511f1`). | Withdrawal by him or by steering. |
| D-18 | OQ-8: the edit page's sign-in exits and the expired-session sign-out leave without the browser prompt | 2026-11-19 | Selected: "Agent: skip the prompt (Recommended)". Shown: "Log in and the automatic sign-out leave without the browser prompt, since nothing is lost on them. This changes only M3's exit table." Selection-prompt answer, 2026-11-19T00:10Z; ledger `steering/selection-ledger/2026-11-19.md` block "2026-11-19T00:10Z — steering-roadmap" (question 1); rulings block `steering/017-rulings.md` 2026-11-19T00:11Z; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Criteria: M3-d's exit table. |
| D-19 | OQ-9: D-15's "fails" means not kept alive; a not-readable run is repaired and re-run once by devops under the same push, and a second not-readable run goes to him | 2026-11-19 | Selected: "Agent: fails = didn't keep running (Recommended)". Shown: "Only a clean 'not kept running' stops M5 and M6. An unreadable run is repaired and re-run once by devops under the same push you approve; a second unreadable run comes to you." Same ledger block (question 2) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Stop condition, verbatim: "a second unreadable run comes to you." Criteria: M5-0 limb 2. |
| D-20 | OQ-10: M4 adds the navigation-guard context and moves the confirmation dialog up to the /message layout | 2026-11-19 | Selected: "Agent: accept the guard (Recommended)". Shown: "M4 adds the guard and moves the dialog up a layout, so the send page's Header and Sidebar links warn too. What you chose is unchanged; the mechanism is larger." Same ledger block (question 3) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Criteria: M4-a, M4-d. |
| D-21 | Exclusions X-17 to X-19 accepted as written | 2026-11-19 | Selected: "Agent: accept X-17 to X-19 (Recommended)". Shown: "The plan keeps all three as written, as stated limits." Same ledger block (question 4) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. |
| D-22 | OQ-11: the draft store holds at most 20 drafts and 1 MB, the least recently edited dropped silently past it | 2026-11-19 | Selected: "Agent: cap 20 drafts / 1 MB (Recommended)". Shown: "At most 20 drafts and 1 MB. When it's full, the least recently edited draft is dropped, silently." Selection-prompt answer, 2026-11-19T00:26Z; ledger `steering/selection-ledger/2026-11-19.md` block "2026-11-19T00:26Z — steering-roadmap" (question 1); rulings block `steering/017-rulings.md` 2026-11-19T00:27Z (`a9e2ed3`); option text agent-authored (steering-roadmap, from this plan). The option was worded before revision 4's four-pair table (F-24); with D-23 his pair is (a)·(a), whose outcome the table states, recorded beside his selection in the rulings block. | Owner withdrawal only. Criteria: M3 "Storage form" (Bound), M3-h. |
| D-23 | OQ-12: the shared storage code stops throwing on a full store for every key, and the draft store drops an old draft and retries | 2026-11-19 | Selected: "Agent: fix in shared code (Recommended)". Shown: "The shared storage code stops throwing for every stored setting, and the draft store drops an old draft and retries. This fixes the shared bug once, where it lives." Same ledger block (question 2) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Criteria: M3 "Storage form" (Quota), M3-g, M3-h. |
| D-24 | OQ-13: each successful save sweeps that message's leftover images more than 120 s older than the committed one | 2026-11-19 | Selected: "Agent: sweep after each save (Recommended)". Shown: "After each successful save, delete that message's leftover images more than 120 s older than the current one. Only the latest image is kept again; it costs one storage listing per save." Same ledger block (question 3) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. Criteria: M5-c form 3. |
| D-25 | X-18's third case accepted: two tabs on one saved message share one stored draft | 2026-11-19 | Selected: "Agent: accept it (Recommended)". Shown: "X-18 keeps its third case as a known limit. Two tabs on one message overwrite each other's draft, as they do today." Same ledger block (question 4) and rulings block; option text agent-authored (steering-roadmap, from this plan). | Owner withdrawal only. |
| D-26 | The two dialogs' page-wide Enter is added to 017 as revision 5: the implementer applies M4's reviewed fix to both dialogs, through code review and QA, and it ships in 017's release | 2026-11-19 | Selected: "Agent: add it to 017 (Recommended)". Shown: "The planner adds it to 017 as revision 5. The critic, architect and QA read the change, then the implementer applies M4's already-reviewed fix to both dialogs, through code review and QA. It ships in 017's release. Cost: one plan revision and its gate reads, plus one small fix round (estimated, not measured)." Selection-prompt answer, 2026-11-19T04:50Z; ledger `steering/selection-ledger/2026-11-19.md` block "2026-11-19T04:50Z — steering-roadmap" (question 1); rulings block `steering/017-rulings.md` 2026-11-19T04:50Z (`ac98bf6`), which carries the option text and the cost he saw; option text agent-authored (steering-roadmap). | Owner withdrawal only. Criteria: M8. Retires X-7 (M8-d removes the dead compare at both remaining sites); D-16's acceptance of X-7 as written is superseded for that row. The value statement M8 adds is OQ-14's, put to him on its own. |
| D-27 | M5-0 limb 2's probe push is approved: devops pushes `probe/017-waituntil` at `aca8cb3`, requests the route twice, records the result, deletes the branch, and may repair and re-run once under the same approval | 2026-11-19 | Selected: "Agent: push the probe and run the test (Recommended)". Shown (opening): "I push branch probe/017-waituntil at aca8cb3 (the route, the @vercel/functions dependency, and a one-line build override in vercel.json), then request the route twice on the preview, read its logs, write the result into the deployment record, and delete the branch (local and GitHub) after the read. The branch is never merged. If the first run is unreadable I repair and re-run once under this same approval; a second unreadable run comes back to you." The full text, with what was read and not read, is in the ledger block. Selection-prompt answer in devops-hooks-017's session, 2026-11-19T04:55Z; ledger `steering/selection-ledger/2026-11-19.md` block "2026-11-19T04:55Z — devops-hooks-017"; option text agent-authored (devops-hooks-017). | Consumed by the run of 04:55:12Z to 04:57:41Z (`d61f445`), so not reopenable. Limb 3's push is a new ask (OQ-15). |
| D-28 | The automation bypass secret that limb 2's `vercel curl` added to the project is revoked | 2026-11-19 | Selected: "Agent: revoke the bypass secret I created (Recommended)". Shown (opening): "I run `vercel project protection disable <project> --protection-bypass --protection-bypass-secret <that secret>` (the CLI's own revoke command, printed in its output), then read the project settings back to confirm no automation-bypass entry remains." The full text is in the ledger block. Selection-prompt answer in devops-hooks-017's session, 2026-11-19T04:58Z; ledger block "2026-11-19T04:58Z — devops-hooks-017"; option text agent-authored (devops-hooks-017). | Executed: 0 entries read back at 04:59Z (`d61f445`). Consequence: limb 3 reads the entries before its request and restores that count. |
| D-29 | Value statement 5 takes the corrected wording; M8's fix is unchanged | 2026-11-19 | Selected: "Agent: use corrected wording (Recommended)". Shown: "Statement 5 reads: "As a Hooks user editing a message, I want Enter to answer only the dialog I am in, so that pressing Enter on 'Message Update Detected' does not also delete an embed field or set an image in the dialog underneath." The planner registers it; M8's fix is unchanged." Selection-prompt answer, 2026-11-19T05:01Z; ledger block "2026-11-19T05:01Z — steering-roadmap"; rulings block `steering/017-rulings.md` 2026-11-19T05:01Z (`a949b03`); option text agent-authored (steering-roadmap). The statement's wording is carried verbatim into § Value Statement. | Owner withdrawal only. Resolves OQ-14. Criteria: M8, unchanged. |
| D-30 | OQ-15: one more probe branch is pushed for M5-0 limb 3; devops runs and reads it, deletes the branch, and removes any bypass secret it adds | 2026-11-19 | Selected: "Agent: push one more probe (Recommended)". Shown: "devops-hooks-017 pushes one more probe branch on this answer. The website has no GitHub workflows, and the last probe push built only a Vercel preview; master didn't move. It runs and reads the probe, then deletes the branch, as before (about 2.5 min). It removes any bypass secret it adds. The preview stays until Vercel expires it. This settles the 40 s window before M5 code." Selection-prompt answer, 2026-11-19T05:06Z; ledger `steering/selection-ledger/2026-11-19.md` block "2026-11-19T05:06Z — steering-roadmap"; rulings block `steering/017-rulings.md` 2026-11-19T05:06Z (`3c24ead`), which carries the option text and premises; option text agent-authored (steering-roadmap). | Consumed by limb 3's run. Its limb-2-style repair-once rule applies under this same approval; a second not-readable run goes to him (M5-0 limb 3). Criteria: M5-0 limb 3; its drop disposition is not taken. |

## Assumptions and open questions

OPEN QUESTION [RESOLVED]: OQ-1, failure visibility. Answered by D-8.

OPEN QUESTION [RESOLVED]: OQ-2, item 2's reach. The unit is one save of one message, and the reach
is every save that requests a preview (`upsertMessage`, both request sites). A brand-new message
whose first generation fails stores no nonce, so it shows the default image (M5-d). Agent-authored;
a mechanism choice inside the agreed scope.

OPEN QUESTION [RESOLVED]: OQ-3, item 2's mechanism. `after()` throws in the Pages Router tRPC route
(AN-3, verified locally at Next 16.1.6). D-8 needs the outcome of a render that finishes after the
save replies, so the design is post-response work through `@vercel/functions` `waitUntil`, under the
project's 60 s limit (D-10). Whether `waitUntil` works from this route is gate M5-0 (OQ-7).

OPEN QUESTION [RESOLVED]: OQ-4, item 3. Answered by AN-1: at `395510e` no enumerated save raises the
notice in the saving tab. The one live path is an edit typed while the save is in flight (M2).

OPEN QUESTION [RESOLVED]: OQ-5, item 4. Answered by AN-2 and D-11 (M3, M4).

OPEN QUESTION [RESOLVED]: OQ-6, lint. Answered by D-9 (M7).

OPEN QUESTION [RESOLVED]: OQ-7, `waitUntil` from this project. Answered by M5-0 limb 2: kept alive
(deployment record `d61f445`, on his approval, D-27). It shows 5 s of post-response life; limb 3 showed
the span to 55 s that T needs (lasts, deployment record `8f26f37`).

OPEN QUESTION [RESOLVED]: OQ-8, the sign-in exits. Answered by D-18: they leave without the
prompt (M3-d, which carries the reads the question rested on).

OPEN QUESTION [RESOLVED]: OQ-9, the probe's "fails". Answered by D-19 (M5-0).

OPEN QUESTION [RESOLVED]: OQ-10, the send page's links. Answered by D-20 (M4-a).

OPEN QUESTION [RESOLVED]: OQ-11, the draft store's bound. Answered by D-22: option (a), at most 20
entries and 1 MB.

OPEN QUESTION [RESOLVED]: OQ-12, the quota error. Answered by D-23: option (a), the shared `set`
stops throwing and the draft store evicts and retries.

The two answers combined (F-24); his pair is (a) · (a). What each of the four pairs does, kept as
the record of what the options meant (steering's 00:27Z block):

| OQ-11 · OQ-12 | Past 20 entries or 1 MB | Browser storage full |
|---|---|---|
| (a) · (a) | the least recently edited draft is evicted, silently | the least recently edited draft is evicted and the write retried; with nothing left to evict, the write is dropped and the edits stay on the page; the editor keeps working |
| (a) · (b) | the same | the write throws inside the editor's store effect, on every later edit (reachable only when other data fills the origin, since the drafts stay under 1 MB) |
| (b) · (a) | nothing happens; no bound | the least recently edited draft is evicted and the write retried, as (a) · (a): a silent loss, but only at the browser's quota |
| (b) · (b) | nothing happens; no bound | the write throws inside the editor's store effect, on every later edit, as it can today |

OPEN QUESTION [RESOLVED]: OQ-13, the leftover-object sweep. Answered by D-24: option (a), M5-c
form 3. (Revision 3's "a few objects a year" for option (b) is withdrawn: it was taken from the
generator's failures, a different event from a lost continuation, whose rate is unmeasured;
steering's correction in the question put at 00:2xZ.)

OPEN QUESTION [RESOLVED]: OQ-14, value statement 5. Answered by D-29: his selected wording, in
§ Value Statement; M8's criteria are unchanged.

OPEN QUESTION [RESOLVED]: OQ-15, limb 3's probe push. Answered by D-30: push it (option (a)).

Revision 0's scope assumptions, each now stated as a criterion: unit and reach (M5-a), layer (both
repositories, M5 and M6), whether item 3 is live (M2), and severity (M3).

## Analysis commissioned

Analysis: `analysis/017-existing-items-backlog-analysis.md`. AN-1 to AN-4 are answered (`b7b4d08`).

- **AN-1 (item 3).** Answered: no enumerated save raises the notice at `395510e`; an in-flight edit
  does. Instrument: `verification/017/analysis/an1/own-save-broadcast.probe.tsx`. QA re-ran it at
  `1ad625e` with identical rows (QA Phase 1, Premises).
- **AN-2 (item 4).** Answered: losses S2, S3 and S5, and the dead navigation guard. Next 16.1.6
  offers only `<Link onNavigate>` `preventDefault`.
- **AN-3 (item 2).** Answered: `after()` is unavailable in this route. `waitUntil` is documented but
  unexecuted (G-2). Production serves with a 60 s limit (G-1).
- **AN-4 (item 2, gap G-3).** Answered (`b7b4d08`, captures `verification/017/analysis/an4/`): 16832
  production successes from 2023-08-22 to 2026-11-18, render plus store median 2197 ms, p95 2932,
  p99 3729, max 26275, none at 30 s or more. 15 requests did not succeed (about 0.09%; 10 of the 15
  error-log stack heads are `TimeoutError`). The `-preview` instance has served 0 requests. Each
  `<N>` is timed from the request's body end, so it includes the wait for the pooled browser under
  production load (AF-7, read at `8de2b53` `src/server.ts` `processImage`).

## Gate findings folded

Every finding on revision 1, its disposition, and where the plan now carries it. Severity is the
raising gate's.

| Finding | Disposition | Where |
|---|---|---|
| F-1 HIGH, AF-4 HIGH | Form named: a guard context at `message/layout.tsx` with its own dialog (revision 3, QAF-12); the class enumerated with where each member renders | M4-a, M4-d; OQ-10 |
| F-2 HIGH | The unload class enumerated; the sign-in and forced sign-out members put to him | M3-d; OQ-8 |
| F-3 MEDIUM, AF-1 HIGH, QAF-1 HIGH, QAF-2 MEDIUM, QAF-5 MEDIUM | Deletion form named (replaced nonce, refused commit's own object, an age-guarded sweep); the table's dimensions are each save's write, answer, commit and deletes, plus a message delete; the orphan residue stated over its class | M5-c, M5-e; RK-2, RK-5 |
| F-4 MEDIUM, AF-2 HIGH, QAF-3 MEDIUM | Order token named: an ordered nonce minted from the database clock in the upsert's own statement; conditional update; X-5's reason restated | M5-a; X-5; RK-9 |
| F-5 MEDIUM, QAF-9 INFO (reconcile) | Retention, reader, window, fixed prefix, non-zero precedent and the pool queue stated; D-8's limit stated to him | M5-f; D-8; D-17 |
| F-6 MEDIUM | Three outcomes and a pre-response control line; author, requester and branch contents named | M5-0; OQ-9 |
| F-7 MEDIUM, AF-5 MEDIUM, QAF-6 MEDIUM | The draft gets its own typed key; shared code changes only on the quota path; the other stored keys keep their form and cross-tab sync | M3 "Storage form", M3-g |
| F-8 MEDIUM, AF-5 MEDIUM | Write matrix, bound and quota handling | M3 "Write matrix", M3-h |
| F-9 MEDIUM | All six members restated | M2-a, M3 (red source per limb), M5-a, M5-f, M6-a |
| F-10 MEDIUM | The runner's start is an owner step; deploy evidence is the host's start line; the website's revert waits on it | § Release and rollback |
| F-11 MEDIUM | The chain-015 precedent's content stated as read; provision steps named with their builders and removal | M5 "Human-observable form", M6-0 |
| F-12 LOW | RK-7's carrier is QA's B-10 | RK-7 |
| F-13 LOW | Reachability window stated | M2 "Human-observable form" |
| F-14 LOW, AF-6 LOW | Record form named; a failed save's record is dropped; a creating save adds none | M2 "Record" |
| F-15 LOW, AF-9 INFO, QAF-4 MEDIUM | The skill's read stated; the contract's home and the key criterion | § Release and rollback; M5-g |
| F-16 LOW | Exclusions row | X-17 |
| F-17 LOW | Party named on every rollback and on M7-b | M3 to M5, M7-b |
| F-18 LOW | Reading Order rows use the headings as written | § Reading Order |
| AF-3 MEDIUM | Key form and the deciding variable on each side | M5-g |
| AF-7 LOW | Generator per-class failure lines; the cost sentence | M6-c; M5 "Cost" |
| AF-8 INFO | Recorded beside the fallback | M5-0 |
| QAF-7 LOW | NM-1 cited beside the kill table | M1-c |
| QAF-8 LOW | Raw anchors dispositioned; the human-observable names a link the page renders | M4-d, M4 "Human-observable form" |
| QA, Premises: local sign-in provisioned; G-6 verified | The production fallback removed; M4-c's red recorded as Verified | M3, M4-c |
| Critic's question on the Fluid-compute label | Relabelled as Inference | D-10; § Validation |
| F-19 MEDIUM (pass 2) | Each of the three mechanisms put to him beside its stated-limit form | OQ-11 to OQ-13 |
| F-20 LOW | Reader every 12 h against the 23 h window, deduplicated by record; artifact path named; D-8's sentence corrected | M5-f; D-8 |
| F-21 LOW | RK-7's read is a crontab line with an earliest time and an artifact; the read is M6-c's `error-status` count | RK-7 |
| F-22 LOW | Order token stated as two properties, SQL illustrative; P1 and P2 Observed on Postgres 16.16 (QA); production's version and the host's `ENV` carried with named falsifiers | M5-a; M5-g |
| F-23 LOW | Matrix row for two tabs on one saved message; X-18 member | M3 "Write matrix"; X-18 |
| SL-1 members 1 to 3 | Text made to agree: M2's errored-but-stored save named as residue in one place; M3-a and M3-b hold for entries still stored; L's migration row reworded | M2 "Window"; M3-a, M3-b; M3 "Storage form" |
| SL-2 members 1 to 3 | Added to M4-d's table; the third listing added to the tip re-derivation; the deviation sentence corrected | M4-a, M4-d |
| AF-16 LOW | Byte bound offered as OQ-11 (a) | M3 "Storage form"; OQ-11 |
| AF-17 INFO | Adopted: age measured against the committed object's `LastModified` in the same listing; EC-1 not needed | M5-c |
| AF-18 LOW | The list shows the new preview on its next fetch | M5 "Human-observable form" |
| QAF-10 MEDIUM | The replaced nonce is read under the row lock; a real-Postgres lane runs the shipped statements (EC-2) | M5-a; § Testing Strategy |
| QAF-11 LOW | M5-0 reads its member with `--deployment <probe URL>` | M5-0 |
| QAF-12 MEDIUM | The guard renders its own provider instance and dialog at the layout; the editor's provider and dialog stay where they are, so `/send`'s update prompt is unchanged and the two dialogs never share a slot | M4-a, M4-b |
| Steering candidate 1 (`SessionProvider` effect) | Re-derived at source: keyed on the server-given `session` prop, so it runs at page load; the expired-session member is expected empty (Inference); D-18 covers it either way | M3-d |
| Steering candidate 2 (retention) | Re-derived: about a day (Vercel's documentation 1 day; the CLI's 1 d refusal) | D-8; M5-f |
| F-24 MEDIUM (pass 3) | A four-pair table under OQ-12; OQ-11 (b) reworded to defer the full-storage outcome to it; M3-h reads from it | OQ-11, OQ-12; M3-h |
| F-25 LOW | M5-g's production falsifier is his B-6 look | M5-g |
| AF-22 LOW | The guard captures `showConfirmation` from its own instance; `StyledLink` never calls `useConfirmation`; tests mount the two-level layout with a `/send` member inside `MessageProvider` | M4-a |
| QAF-13 MEDIUM | A listing without the committing save's own object deletes nothing | M5-c form 3 |
| QAF-14 LOW | B-10's liveness precondition: a fixture line counted at M6, and the region's success count above zero at each read | RK-7 |
| QA's LastModified assumption (re-key on revision 3) | Argued to hold for either stamping point; the residue is a clock disagreement of more than 60 s inside the bucket. The two-put check on the real bucket is not required | M5-c form 3 |

## Plan

Milestones run in the order below. M1 moves files that M2 edits, so it lands first. M7 records lint
at the chain tip, so it lands last. M8, added at revision 5 and written after M7, runs after M4,
beside M5 and M6 (no shared file), and lands before M7's tip read. One branch per repository: website `chain/017-existing-items-backlog`
(steering cuts it at implementation start) and preview-image-generator `chain/017-…` off `prod`
(devops names it). The re-derivation gate: the owner's implementation approval is expected to
cover M1 to M7 together, which leaves the gate's population empty. M8's premise is argued against
M1 to M4's landed behaviour (M8, "Re-derivation gate"). Any milestone added after
approval is marked `PREMISE-STALE` when an earlier milestone's product behaviour ships, until a
plan revision re-argues it.

### M1 — Hygiene in the test tree, and the dead mode-rule function (item 5)

No production behaviour changes. Surfaces read at website `1ad625e`.

- **M1-a — four test files move beside their modules.** Each file moves to the `__tests__/`
  directly under its production module's directory, basename unchanged. The rule is
  `agent-output/CLAUDE.md`, Placement. The module is the one each file's imports name (read by this
  planner, `git show 1ad625e:<path>`):

  | File (now) | Module it imports | Moves to |
  |---|---|---|
  | `src/utils/__tests__/messageStore.dropped-set-report.test.ts` | `~/utils/redis/messageStore` | `src/utils/redis/__tests__/` |
  | `src/utils/__tests__/messageValidity.predicate.test.ts` | `~/server/api/utils/messageValidity` | `src/server/api/utils/__tests__/` |
  | `src/utils/__tests__/useApiMethods.json-editor-repair.test.ts` | `~/providers/MessageProvider/useApiMethods` | `src/providers/MessageProvider/__tests__/` |
  | `src/utils/__tests__/usePusher.hash-parity.test.ts` | `~/providers/MessageProvider/usePusher` | `src/providers/MessageProvider/__tests__/` |

  The other two handoff members (`cron.scheduled-selection`, `interactions-edge.signature-before-parse`)
  stay, under Exclusions X-13. Property: for each moved file, the per-file case count and pass set
  are identical before and after, read from vitest's JSON `testResults` by path. The suite's file set
  differs from the base only by these renames, by path membership. The evidence form is Test
  Conventions' rename row. Moving `messageValidity.predicate` beside its module makes it a second
  file there testing `isMessageValid`; that is placement, not duplication. The four files import
  through the `~/` alias only (the critic's read), so a `git mv` leaves their blob ids unchanged
  (`git rev-parse <rev>:<old>` against `<new>`).
- **M1-b — `enforceImportMutualExclusivity` is deleted** (Recommendation 6, "Delete … or route it
  through `isMessageV2`"). Delete is chosen because it has no production caller: at `1ad625e`,
  `git grep -n enforceImportMutualExclusivity 1ad625e -- src` finds its definition in
  `src/utils/index.ts` and the rest in `src/utils/__tests__/limits.import-validation.test.ts`. The
  test file's `describe('enforceImportMutualExclusivity', …)` block (14 of the file's 33 cases, QA's
  read of the base JSON) is deleted with it. Its other 19 cases stay, by title, all passing.
  Property: at the milestone tip, `git grep -c enforceImportMutualExclusivity -- src` returns no
  line. Typecheck exits 0 (`pnpm run typecheck`). Sibling: Test Conventions "Superseded
  implementation" (delete; the current implementation is covered by `messageMode.detection.test.ts`,
  which the implementer mutation-checks once, per that row).
- **M1-c — the editor's error lines assert their exact text** (`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md`).
  The class is every error line `src/components/DiscordMessageEditor/index.tsx` renders, five at
  `1ad625e`: `noContentError`, `embedCharacterError`, `v2TextError`, `componentCountError`,
  `v2ComponentError` (file unchanged from `395510e`, `git diff --quiet`, so the kill table's line ids
  still apply). Property: for each member, with its error set and the others empty, the line's
  rendered text equals its reason string exactly. The accessories container and the region after
  each line carry no text node of their own. Each expected value is a literal, never computed from
  `limits.tsx` (axiom E). Red (axiom A): the five mutants in
  `verification/016/qa-sweep-395510e/kill-table-395510e.json` cover the accessories container and
  `v2ComponentError`; QA's NM-1 supplies a mutant for each of the other four members. Green with
  `hideValidation` set, where no error line renders. Tighten first: `DiscordMessageEditor.component-limit`
  and `.duplicate-placement` (`DiscordMessageEditor/__tests__/`).
- Rollback: `git -C website revert <M1 commit>`, by the implementer on the chain branch before
  release, by devops on `master` after it (the same party rule for every website milestone below).
  Handoff notes: `usePusher.hash-parity` lands at its new path before M2 edits it, which fires that
  handoff's trigger and discharges it.

### M2 — The saving tab recognises its own save (item 3)

Surfaces: `src/providers/MessageProvider/usePusher.ts`, `useApiMethods.ts` `persist`,
`MessageProvider/index.tsx` (wiring), read at `1ad625e`. Sibling, mirrored: `website.md` A-6. The
editor persists its own message through one step, `persist`, and the tab's record of what it sent
is taken there and nowhere else. A new persisting path inherits it by going through `persist`.

- **Record.** A record is `hashMessage(normalizeForHash(payload))`, the form the broadcast compare
  already computes (`usePusher.ts`), so producer and consumer hash one form (Runtime Flow 1b). One
  ref, created in `MessageProvider` and passed to `useApiMethods` and `usePusher` the way
  `messageRef` is (sibling: `messageRef`). A record is added by `persist` only for a message that
  has an id, since `upsertMessage` broadcasts only then (`shared.ts`, `if (message.id)` before
  `pusher.trigger`). A record is removed when an equal broadcast arrives, or when that save's
  mutation errors.
- **M2-a — absence over AN-1's members** (carried and re-derived at the chain tip). For each of AN-1's
  eleven members, in both delivery orders (the broadcast before the save's response, and after it),
  the saving tab raises no "Message Update Detected": Classic nothing changed; Classic after an edit;
  Classic after an edit leaving trailing whitespace; V2 nothing changed; V2 after an edit; V2 beside
  an empty embed; the dialog's V2-with-content choosing Classic; the same choosing V2; not-valid
  passing the shape, nothing changed; the same after an edit; not-valid failing the shape, nothing
  changed (`an1/rows-395510e.json`, 22 rows plus the two outside-class rows). A pinned absence:
  green at `1ad625e` for every member. The red that makes it evidence is AN-1's run at `a74b9e2`,
  where the dialog members raise it (`an1/rows-a74b9e2.json`). Residue: combinations AN-1 did not
  run (for example V2 with trailing whitespace) are not claimed.
- **M2-b — an edit typed while the save is in flight.** For every save from tab T, followed by one
  or more edits in T before T receives that save's broadcast, in both orders relative to the save's
  response, T raises no notice for that broadcast. Red at `1ad625e`: AN-1's outside-class member,
  in both orders.
- **M2-c — the cross-tab notice is kept** (D-5; BC-14 limb c; hazard 4). For every broadcast whose
  hash equals neither T's current content nor any record T holds, T raises the notice. Members:
  another tab's save of a component-only edit, a field edit and a name change; T with and without
  unsaved edits; another tab's save arriving while T's own save is in flight; and another tab saving
  content T sent earlier and has already seen broadcast, after T has moved on. The loss sentence
  keeps its current condition (`hasChangedRef`).
- **Window: how long T keeps a record.** It must outlast the save's round trip and Pusher's
  delivery, and it must not suppress a different tab's save. So a record lives from the send until
  an equal broadcast or the mutation's error, and no clock ends it. Residue, two bounded classes
  (RK-3). (1) A remote save whose content equals a record T still holds, the record left by a save
  whose broadcast Pusher never delivers: the record suppresses only a later remote save of exactly
  that content, and equal content is no divergence to flag. (2) A save that succeeds on the server
  while the client sees an error: its record is already dropped, so if T edits before its broadcast
  arrives, T raises the notice for its own save, which is M2-b's residue. QA's Assumption Not Checked (Pusher delivers a save's broadcast back to its sender)
  is UAT's at B-1.
- **Human-observable form.** Two tabs on one message. In tab 1, start typing, press Save while still
  typing, and keep typing until the saved toast shows. Tab 1 shows no "Message Update Detected"; tab 2
  shows it. Reachability: tab 1's observation can fail only when an edit lands between the send and
  the broadcast's arrival, so a walk that stops typing at Save does not exercise M2-b. Walked before
  release on a local build by UAT (QA's B-1), under `agent-output/CLAUDE.md` "Local builds of
  `website`" (ids moved past 900000000000001 before the first save); that walk fires
  `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md`, and its brief names
  it. In production after the deploy, his look (QA's B-8). The production look confirms tab 2's
  notice (M2-c) and confirms M2-b only when the window is hit.
- Negative-criterion instrument: the carried AN-1 probe and `MessageProvider/__tests__/usePusher.update-prompt.test.tsx`
  (4 cases at base, none on own-save recognition), tightened first. Rollback: as M1.

### M3 — A stored draft survives sign-in, another tab and an expired-session sign-out (item 4, D-11)

Surfaces at `1ad625e`: `src/utils/withLocalStorage.ts` `set`; `src/utils/hooks/useLocalStorage.ts`
`useLocalMessageStore`; `src/@types/global.d.ts` `LocalStorage`; `MessageProvider/index.tsx` `useValue`:
the route-0 effect (`local.id ? copyIntroMessage() : local`), the `codeMessage` effect, the `message`
effect that writes the store, the fetch effect and its `localMessageStore.set`, `getMessage`'s
newer-local preference, and the upsert's `onSuccess`. Then `src/app/_navigation/Redirects/Client.tsx`
and `src/providers/SessionProvider.tsx`.

**Sibling reading.** `withLocalStorage` / `useLocalStorage` are a generic store serving four typed
keys (`theme`, `frequentlyUsedEmojis`, `message`, `client_preferences`; `global.d.ts` `LocalStorage`).
Their cross-tab re-read on every `storage` event is the sync `theme` and `client_preferences` rely
on, so it is not a bug in the shared pattern. The losses come from one caller choosing one key for
every draft. So the fix is made where the key is chosen, in the draft's caller, and the shared code
changes only where it is wrong for every key: `set` does not catch `setItem`'s quota error.

**Storage form.**

- A new typed member of `LocalStorage`, `messageDrafts`: a map from an entry key to an entry
  `{ data, name, editedAt }` (`editedAt`: the client time of the entry's last write). Entry keys:
  `0:<tab id>` for a route-0 draft, and `<message id>` for a saved message's unsaved edits. It is read
  and written through `useLocalStorage`, and every write reads the stored map immediately before it
  writes, never an in-memory copy.
- The tab id lives in `sessionStorage` under `messageDraftTab`: a random id made on first need. It
  survives a reload and an OAuth round trip in the same tab, and a new tab has none. Deviation, with
  its reason: no sibling uses `sessionStorage`; per-tab identity that survives a reload has no
  sibling.
- The legacy key `message` is read once, as migration input (the matrix's first row), and from then
  on is written only beside a route-0 entry write, so after the first route-0 write it holds the most
  recently written route-0 draft (M3-f). Until that write it may still hold a copy of a saved message,
  as `1ad625e` left it.
- Most-recent rule: a tab at route 0 that has no entry of its own copies the route-0 entry with the
  greatest `editedAt` under its own key and shows it. With none, it shows the intro message and writes
  nothing until an edit.
- Bound (OQ-11, option a as written; option b removes this item): at most 20 entries and at most
  1 MB serialised. A write that would pass either first evicts the least recently edited entries
  other than the one being written. The values are agent-chosen. They are decided by two things: the
  whole map is read and written on every keystroke and re-parsed by every other tab (AF-16; 17.2 ms
  to serialise and 5.1 ms to parse a 7.4 MB map on this box, `verification/017/architect-delta/`),
  so 1 MB keeps that well under a frame; and 20 is many times the drafts a user works on at once. No
  live population exists (a new key), so the count and size are read on the walk (B-2) rather than
  measured beforehand. One entry larger than 1 MB is still written (the entry being written is never
  evicted), and the quota path bounds it.
- Quota (OQ-12, option a as written; option b removes this item): shared `withLocalStorage.set`
  stops throwing when `setItem` throws and reports that the write did not land, dispatching no
  `storage` event for it. The draft store then evicts the least recently edited entry other than the
  one being written and retries, until the write lands or no other entry remains. Then the write is
  dropped: the edits stay on the page, and no error reaches the editor.

**Write matrix.** Rows are transitions; each cell names the stored class it writes and the writing
path at the tip (today's path at `1ad625e` in brackets, the precedent). R0: this tab's route-0 entry.
Sn: message *n*'s entry. L: the legacy `message` key.

| Transition | R0 | Sn | L |
|---|---|---|---|
| First load after deploy, `messageDrafts` absent | an id-less L becomes R0, `editedAt` from its stored timestamp (migration, in the draft hook) | an L with id *n* becomes Sn | kept |
| An edit at route 0 (typed, Clear, Load, mode switch) | written (`message` effect) [`message` effect writes `message`] | — | written |
| A share code opened at route 0 | written (`codeMessage` effect) [same effect] | — | written |
| Route 0 opened, R0 present | read and shown [route-0 effect] | — | — |
| Route 0 opened, no R0 | the most recent route-0 entry copied in; none, intro shown, nothing written [route-0 effect: `local.id ? intro : local`] | — | — |
| A creating save succeeds (route 0 becomes `/m/<new>/edit`) | removed (upsert `onSuccess`) [the store then holds the new id, so route 0 shows the intro] | — | removed if it holds that draft |
| Message *n* opened (fetch) | — | read; shown when newer than the fetched copy (`getMessage`, rule unchanged); nothing written [fetch effect writes `message`] | — |
| An edit on *n* | — | written while `data` differs from the saved copy; removed when equal (`message` effect) | — |
| This tab saves *n* | — | removed if its `data` equals what was saved (upsert `onSuccess`) | — |
| Another tab saves *n* | — | that tab removes Sn only if Sn's `data` equals what it saved; a diverged Sn stays | — |
| Two tabs edit *n* at once, neither saving | — | one Sn, the last writer's: today's one-key behaviour for that pair (residue, X-18); a save by either raises the other's notice (D-5) | — |
| Message *m* opened while Sn exists | — | Sn untouched | — |
| Message *n* deleted | — | unread from then on; leaves by eviction (residue, X-18) | — |
| Sign-out of any kind; the redirect to route 0 | nothing written by the sign-out; route 0 per the rows above | untouched | — |
| Reload; close and reopen | same tab id after a reload; a new tab per "no R0" | untouched | — |
| A 21st entry, or a write refused for quota | eviction per Storage form | eviction per Storage form | a refused L write is dropped |
| A browser duplicates the tab (copies `sessionStorage`) | both tabs share R0: today's last-writer-wins for that pair (residue, X-18) | — | — |
| The website is reverted to the pre-chain code | not read | not read | read by the old code (M3-f) |

Consequence, stated for him: a signed-in user's unsaved edits on one message now survive opening
another message (the row "Message *m* opened"), where today the fetch overwrites the one key.
Steering told him at 22:32Z that a source fix would likely do this; it does.

The loss class is AN-2's rows (`verification/017/analysis/an2/rows-395510e.json`, re-run at
`1ad625e` by QA with identical rows). Where each limb's red comes from is stated on the limb. M3-a
and M3-b hold for an entry still stored: an entry evicted under the bound or dropped by the quota
path (M3-h) is their residue.

- **M3-a (S2). Red at `1ad625e`.** A signed-out draft at route 0 is restored unchanged (deep-equal
  `data` and `name`) after each of: sign in, then open any saved message, then return to route 0;
  sign in, then route 0; reload; close and reopen.
- **M3-b (S3). Red at `1ad625e`.** A signed-in user with unsaved edits on message *n* loses the
  session without using Log out. Members: the session cookie outlives its session, so
  `SessionProvider` calls `signOut()`; and the status turns `unauthenticated`, so `Redirects/Client`
  redirects to route 0. After signing in again and opening *n*, the editor shows the unsaved edits,
  as a reload does today (AN-2 S4). Route 0 meanwhile shows its own draft, not *n*'s edits.
- **M3-c (S5). Red at `1ad625e` (rows 1 to 3).** Decision table over two tabs at route 0:

  | Act | Outcome |
  |---|---|
  | Tab A edits, then tab B edits, then A reloads | A shows A's last draft |
  | A edits, B edits, then B reloads | B shows B's last draft |
  | A edits, B edits, then a new tab opens route 0 | It shows B's draft, the one edited most recently |
  | A edits, then closes; a new tab opens route 0 | It shows A's draft |

- **M3-d — warnings on signed out. Red at `1ad625e`.** `hasChanged` no longer depends on the
  session. For every session status (`authenticated`, `unauthenticated`, `loading`), `hasChanged` is
  true exactly when the editor's data differs from the saved copy's (`typedDeepEqual`). The unload
  class is every document unload from the edit page while `hasChanged` is true; its members at
  `1ad625e` and their outcomes at the tip:

  | Exit | Session | Outcome at the tip |
  |---|---|---|
  | Close, reload, typed URL or bookmark | signed out | the browser's "Changes you made may not be saved." (new; shown to him in D-11) |
  | Same | signed in | the same prompt (unchanged) |
  | `InfoPanel` "Log in" (`signIn`) | signed out | no prompt (D-18) |
  | `NavMenu` sign-in (`signIn`) | signed out | no prompt (D-18) |
  | `SessionProvider` `signOut()` on an expired session | was signed in | no prompt (D-18) |
  | `NavMenu` Log out (`signOut`) | signed in | the prompt (unchanged; X-8) |
  | Raw anchors in the embed preview (`EmbedAuthor`, `EmbedTitle`) | either | none: `target='_blank'`, so the page does not unload |

  Reads under the table, at `1ad625e`: `edit/page.tsx` mounts `useUnloadAlert(hasChanged)`, and its
  `InfoPanel` `onContinue` calls `signIn('discord', …)`; `m/[id]/_layout/Navigation.tsx` mounts
  `NavMenu`, whose button calls `signIn` signed out and `signOut` signed in. react-use 17.4.0
  `useBeforeUnload` calls `preventDefault` and sets `returnValue` whenever its flag is true, and
  next-auth 4.24.5 `signIn` and `signOut` leave by assigning `window.location.href` (read by this
  planner in the shared install: `react-use/lib/useBeforeUnload.js`; `next-auth/react/index.js`
  `signIn`, `signOut`). `SessionProvider.tsx` `SessionWrapper` calls `signOut()` from an effect keyed
  on `!!session`, where `session` is the prop the server rendered the page with, so it runs when a
  page loads with a stale cookie, before the editor has a message to differ from its saved copy. So
  its row's member is expected empty (Inference: read, not run; steering's helper read the same,
  block 00:06Z). D-18 covers it either way.

  The Reload confirmation stays unreachable signed out, because route 0 is never a saved message
  (AN-2). The update prompt's loss sentence stays unreachable signed out, because `usePusher.ts`
  subscribes only when `isApiMessage(messageRef.current)` and `Redirects/Client` holds a signed-out tab
  at route 0 (the critic's read).
- **M3-e — the existing store is carried. Green at `1ad625e` by construction; red from a mutation at
  the tip** (the migration dropped). A browser holding `message` as `1ad625e` writes it loses nothing
  it would have restored at `1ad625e`. Members: a route-0 draft with no `id`; a copy of message *n*
  newer than its saved copy; the intro message. Fixtures are literal stored strings, never generated
  by the new code.
- **M3-f — revert-safe. Evaluated at the tip against the old code's reader; red from a mutation**
  (the L write dropped). After a revert of the website to the pre-chain code, the most recently
  written route-0 draft is restored by the old code. Residue: other tabs' route-0 drafts, and every
  saved message's unsaved edits (the old code keeps one key, today's S3 class).
- **M3-g — the other stored keys keep their form. Green at `1ad625e`; red from QA's NM-6.** For
  `theme` (also read raw, with no JSON parse, by `src/app/layout.tsx`), `frequentlyUsedEmojis` and
  `client_preferences` (whose fields include the list-view preferences read in `message/page.tsx` and
  `message/f/[id]/page.tsx`): a value stored as `1ad625e` writes it is read unchanged; every write
  stores the string `1ad625e` stores for the same value; and a write in one tab updates the other
  tabs as today. Fixtures are literal stored strings per key. The one change on these keys, stated:
  a write refused for quota no longer throws.
- **M3-h — the bound holds. Red from a mutation** (eviction removed). Under OQ-11 (a): for every
  sequence of writes, the map holds at most 20 entries and at most 1 MB serialised unless one entry
  alone exceeds it; an eviction never removes the entry being written. Under OQ-12 (a): a write
  refused for quota leaves the editor working with the edits on the page. Each half is removed with
  its option if he chooses (b); the outcome of each of the four answer pairs is the table under
  OQ-12, and this limb is read from it. Declined work's fate, in operator terms: an evicted entry is
  gone. The group most exposed is a browser past the bound (more than 20 route-0 drafts or unsaved
  messages, or a megabyte of them), or, under OQ-11 (b) with OQ-12 (a), a browser whose storage is
  full; each loses the least recently edited first.
- **Human-observable form.** Signed out at `/message/m/0/edit`: type a draft, sign in with the test
  account, open a saved message, return to the new-message page. The draft is there. Walked before
  release by UAT on the local stack (`tools/uat-local-stack.sh`), where QA Phase 1 showed Discord
  sign-in to loopback works (QA's B-2). In production after the deploy, his look (QA's B-9). Also
  handed on: `handoff/message-init-cached-edits-lost-2026-08-27.md` (route-0 initialisation), whose
  trigger M3's tests fire. M3-a covers its claim, so M3 discharges it.
- Price (D-11): one new typed key and the tab id; the quota path in the shared `set`; five effects in
  `MessageProvider`; and the two sign-out paths. This is the chain's largest website milestone.
  Rollback: `git -C website revert <M3 commit>`, party as M1, with M3-f's residue.

### M4 — Warn on a link away from an editor with unsaved changes (item 4, D-12)

Surfaces at `1ad625e`: `src/components/StyledLink.tsx`; `src/app/message/layout.tsx`;
`src/app/message/m/[id]/layout.tsx`; `src/providers/ConfirmationProvider.tsx`;
`src/providers/MessageProvider/index.tsx`; `src/utils/hooks/useUnloadAlert.ts`.

- **M4-a — the form** (AF-4; D-20). A navigation-guard context is mounted in
  `src/app/message/layout.tsx`, inside `Providers`, around `Navigation` and the children. Its value
  outside any registration is "no guard". `MessageProvider`, which owns `hasChanged` and spans both
  `/edit` and `/send`, registers its guard while mounted and removes it on unmount. `StyledLink` calls
  the registered guard from `<Link onNavigate>` (the one interception Next 16.1.6 offers, AN-2).
  - *The dialog* (QAF-12). The guard context mounts its own instance of the site's
    `ConfirmationProvider` and renders the site's `ConfirmationDialog` inside it, at
    `message/layout.tsx`. The editor's provider in `m/[id]/layout.tsx` and its `ConfirmationDialog` in
    `m/[id]/edit/page.tsx` stay where they are. Reasons, read at `1ad625e`: `ConfirmationDialog` is
    rendered only by `edit/page.tsx`, so moving the editor's provider would leave `/send` without a
    renderer, and mounting one there would newly show `usePusher`'s "Message Update Detected" on
    `/send`, where today it sets the provider's props with nothing rendering them; and the provider
    holds one props slot that `showConfirmation` overwrites, so a shared instance would drop one of
    two dialogs opened together. Sibling, mirrored with no code change: `ConfirmationProvider` and
    `ConfirmationDialog` as `Navigation.tsx`'s Reload uses them. This rides D-20 ("moves the dialog up
    a layout"): a dialog now lives at the layout, and the send page's Header and Sidebar links warn.
    Because `useConfirmation` returns the nearest instance and the editor's instance shadows the
    layout's inside `m/[id]/layout.tsx` (AF-22), the guard captures `showConfirmation` from its own
    instance at the layout, and `StyledLink` reaches the confirmation only through the guard context,
    never by calling `useConfirmation`. M4-b's tests mount the real two-level layout tree
    (`message/layout.tsx` over `m/[id]/layout.tsx`) and include a member inside `MessageProvider` on
    `/send` (`send/page.tsx`'s links), where the editor's instance has no renderer.
  - *Deviation, with its reason*: the guard hook returns "no guard" outside its provider instead of
    throwing, as the provider pattern's hooks do (`useMessage`), because `StyledLink` renders on pages
    with no editor (`CookieConsent`, `LandingCTA`, `_layout/Footer`), and `Dropdown` and `InfoPanel`
    render on both kinds of page.
  - `StyledLink`'s props are unchanged.
- **M4-b — the property.** For every link in M4-d's class, when `hasChanged` is true, activating it by
  pointer click or by keyboard (a click with `detail: 0`) shows the confirmation first; Cancel leaves
  the user on the page with the edits intact; confirm navigates. When `hasChanged` is false, no
  confirmation is shown. A link to the same message's `/edit` or `/send` never prompts, the id
  compared exactly, never as a prefix. When the link's confirmation and the editor's update prompt
  are open together, both stay open and each is answered on its own; neither is dropped. The editor's
  own confirmations (Reload, the JSON modal's, the editor's `showConfirmation`) behave as at `1ad625e`,
  and `/send` still renders no update prompt. On every page with no editor mounted, every `StyledLink`
  navigates as at `1ad625e`.
- **M4-c — the dead guard is removed.** At the milestone tip, `git grep -c "next/router" -- src`
  (production files) returns no line, and `useUnloadAlert` keeps only `useBeforeUnload`. Red:
  **Verified** at `1ad625e` by QA's G-6 walk, signed in: with unsaved edits, a click on the link to
  `/message/f/0` showed no dialog and navigated, twice, with a planted `confirm()` seen by the same
  tool as the control (`verification/017/qa-phase1/g6-walk/`).
- **M4-d — the class and its enumerator.** The class: every link rendered on `/message/m/[id]/edit`
  or `/send` whose activation navigates the current tab to a destination other than this message's
  `/edit` or `/send`. Members at `1ad625e` (this planner's read of `m/[id]/_layout/Navigation.tsx`;
  the critic's F-1 and QA's § M4 read of the Header and Sidebar):

  | Link | Where it renders | Routes | In the class |
  |---|---|---|---|
  | `/message/f/0` (user icon) and `/message/f/<guild>` (guild icon), `StyledLink` | `m/[id]/_layout/Navigation.tsx`, inside `MessageProvider` | `/edit`, `/send` | yes |
  | `/message/m/<id>/send`, `StyledLink` (send item) | the same | `/edit` | no: same message |
  | "New", `href: '/message/m/new'`, `target: '_blank'` | the same | `/edit`, `/send` | no: opens a new tab |
  | Header search results to another message's `/edit`, `StyledLink` | `message/_layout/Header.tsx`, above the editor's providers | `/send` | yes |
  | Header link to the current message | the same | `/send` | no: same message |
  | Sidebar `/`, `/message`, `/message/f/<guild>`, `/message/f/0`, `/message/m/0/edit`, `/legal/*`, `StyledLink` | `message/_layout/Sidebar.tsx`, above the editor's providers | `/send` | yes |
  | Raw anchors `href={url}` in `EmbedAuthor.tsx`, `EmbedTitle.tsx` | the editor | `/edit` | no: `target='_blank'` |
  | `/message/f/<guild>` and `/message/f/0`, `StyledLink` | `m/[id]/send/page.tsx`, inside `MessageProvider` | `/send` | yes |
  | `NavMenu`'s string items `/message/m/new`, `/support`, `/message`, through `Dropdown`'s `StyledLink` | `NavMenu`, mounted by `m/[id]/_layout/Navigation.tsx` and by `message/_layout/Header.tsx` | `/edit`, `/send` | yes |
  | `InfoPanel`'s `StyledLink` | `InfoPanel`, rendered only when `onContinue` is a URL; both editor pages pass a callback | — | no member at `1ad625e` |

  The last three rows are the critic's SL-2 members (critique pass 2, read at `1ad625e`). M4's first
  step re-derives this table at the chain tip from three listings — the `next/link` importers, every
  `StyledLink` importer (`git grep -l`), and the string `onPress` item sites, because `Dropdown`
  takes its hrefs from its callers — path and symbol, and writes it to the implementation
  document. A member found at the tip that is not in this table is added to the table with its
  disposition before code review.
- **Known limit (X-14).** A navigation made by code (`router.push`/`replace`), a `redirect()`, or
  back/forward cannot be stopped at Next 16.1.6 (AN-2). The ones that leave an editor at `1ad625e`
  are `NewMessageModal`, `SaveAsMenu`, `m/new/page.tsx`, `f/[id]/page.tsx` after a create, and
  `Redirects/Client`. M3 makes the last one lose nothing.
- **Human-observable form.** On `/message/m/<id>/edit` with unsaved edits, signed in, click the user
  icon (the link to `/message/f/0`, the one G-6 clicked): a confirmation appears, Cancel keeps the
  edits, confirm navigates. On `/send`, click the Sidebar's link to `/message`: the same. Walked on
  the local stack by UAT (QA's B-3), and in production by him (QA's B-9).
- Rollback: `git -C website revert <M4 commit>`, party as M1.

### M5 — The stored preview moves only on a confirmed new image; failures are logged (item 2, website)

**M5-0 — gate before M5 or M6 code** (OQ-7, resolved by limb 2; limb 3 is OQ-15). Recorded under `verification/017/m5-0/`.

1. AN-4's render-time distribution. **Met**: p99 3729 ms, max 26275 ms, against the 60 s limit
   (AN-4, `b7b4d08`). T is set from it (M5-f): **T = 40 s**.
2. A `waitUntil` probe. The implementer writes it on a probe branch off the chain branch's base: one
   Pages API route under `src/pages/api/`, plus `package.json` and `pnpm-lock.yaml` for
   `@vercel/functions` (not installed at `1ad625e`, AN-3). The route writes a control line before it
   responds, then passes `waitUntil` a promise that settles after the response and writes a second
   line. Both lines open with the M5-f prefix. A second request to the same route without
   `waitUntil` is recorded beside it (H-2). devops pushes the branch (his approval, D-15; the website's
   workflow files do not show what a branch push deploys, so the push gate applies), confirms the
   preview deployment built, requests the route, and reads the deployment's runtime logs with the
   instrument QA showed returns runtime records (`npx vercel@66.2.0 logs … --json`,
   `verification/017/qa-phase1/vercel-runtime-logs/`; `vercel logs` on CLI 29.1.1 returns build-log
   lines only), scoped to the probe with `--deployment <probe URL>` (QAF-11; B-7's production query
   cannot see a preview deployment), within the retention window (about a day, D-17). The capture,
   the probe lines as the prefix query's first real member, goes under `verification/017/m5-0/`.
   Before the push, devops establishes what the preview deployment's environment connects to (QA's
   E-6). The probe branch is never merged and is deleted after the read, by devops.

   Outcomes: **kept alive** (both lines present); **not kept alive** (the control line present, the
   post-response line absent); **not readable** (the control line absent, or no deployment). Under
   D-19, only "not kept alive" is a failure. A not-readable run is repaired and re-run once by devops
   under the same approved push; a second not-readable run goes to him.

   **Result** (deployment record `d61f445`, on his approval, D-27): kept alive. Under one request id,
   the post-response line came 5006 ms after the control line, and `mode=without` wrote the control
   line alone.
3. **Post-response life across T** (revision 6; his push, OQ-15). Limb 2's promise settled 5 s after
   the response and made no generator call (`d61f445`, "What this does not establish"). M5-f's
   T = 40 s needs post-response work to run until 55 s after the request starts: up to 15 s of the
   save's own work, then T. Vercel's documentation ends `waitUntil` work at the function's maximum
   duration, which is 60 s on this project (D-10). For post-response work that is Inference, and for a
   Preview deployment it is unread. What the promise awaits does not change the platform's lifetime
   for it (Inference, the same documentation), so the probe makes no generator call.
   - *The probe.* Limb 2's route and form, with one change: the promise writes a line at 5, 15, 30, 45
     and 55 s after the request starts, each with the M5-f prefix and its elapsed milliseconds. The
     implementer writes it on a probe branch off `1ad625e`. devops pushes it, requests it, reads the
     logs and deletes the branch, as for limb 2. Before the request, devops reads the project's
     protection-bypass entries. After the run, it restores that count (limb 2's side effect, D-28).
     The capture goes under `verification/017/m5-0/limb3/`: the deployment's whole function log and
     its request log over the window, unfiltered.
   - *The read* (QAF-21, F-27). A line counts only when all three hold:
     - it carries the probing request's `requestId`;
     - its platform timestamp minus the control line's agrees with its `elapsedMs` within 1 s (limb
       2's two lines agreed to the millisecond, `d61f445`);
     - no other request reached the deployment until 60 s after the probing request started, by the
       deployment's request log.

     The read is taken after that 60 s has passed, and its time is recorded beside the request's. A
     read taken earlier classifies nothing.
   - *Outcomes*, over every subset of the five lines:
     - **Lasts** (all five lines present): T = 40 s stands.
     - **Cut at L** (the control line present, and L is the last line of an unbroken run from the 5 s
       line, with no line after it, L < 55 s): M5 and M6 code
       stop. A revision re-derives T against L. It goes to him if T can no longer outlast AN-4's max
       (26275 ms) inside the 15 s save budget.
     - **Not readable** (the control line absent; any line absent while a later one is present, a
       log-delivery fault, never a cut; or a failed check under *The read*): repaired and re-run once,
       as in limb 2 (D-19's rule, carried); a second not-readable run goes to him.

   **Result** (deployment record `8f26f37`, on his approval, D-30): lasts. The six lines carry one
   request id, the one request in the deployment's request log. Each line's timestamp less the
   control line's is within 1 ms of its `elapsedMs` (5015 to 55015 ms). The read came at 05:12:31Z,
   89 s after the 05:11:02Z request. The bypass count was 0 before and after. Limits, devops's: the
   request log's completeness is its own summary's (no excluded interval), a platform wake that is
   not a request would not show in it, and the Preview's own function limit is unread.

If the probe fails (D-19), M5 and M6 stop and the plan goes to him with the fallback: the
save awaits only the generator's acknowledgement, the generator copies the last good image under the
new nonce when a render fails, and render failures are logged on the generator host instead of in
Vercel. That fallback departs from D-8's words, so it is his call. A second candidate goes beside it
(AF-8, recorded, not designed here): the generator writes one stable key per message only on
success, and the website adds its rotating nonce as a cache-busting query. It needs no continuation,
no deletion transfer and no new dependency, and it rests on two unread facts: that the CDN keys its
cache on the query string, and how rows naming a legacy key migrate. It also moves D-8's line to the
generator host.

Surfaces at `1ad625e`: `src/server/api/utils/shared.ts` `upsertMessage`, `postMessagePreviewImage`,
`buildMessageValues`, `buildUpsertMessageQuery`, `getMessage`; `src/server/api/utils/deleteMessagePreviewImages.ts`
(the website's bucket helper, sibling, mirrored for the deletion; the delete route keeps calling it
unchanged); `src/server/api/routers/message.ts` `upsert`, `delete`. Dependency added:
`@vercel/functions`, as a deliberate lockfile step (Recommendation 3). Lockfile disposition:
`git diff pnpm-lock.yaml` read; every moved pin is named and dispositioned in the implementation
document; no pin other than the new package and its own dependencies moves.

The outcome classes for one save's request (each limb below is over all of them): 204; 500 (render
or storage failure); 404 (wrong key, path or method); any other status; a network error (refused,
unreachable, reset); no answer within T; the continuation ended by the platform's limit.

- **M5-a — the stored nonce moves only on success, in save order.**
  - *Order token, two properties.* (1) Two saves of one message are ordered as their upserts on its
    row are, with no clock other than the database's. (2) Every new nonce sorts above every existing
    nonce, and the order is independent of the database's collation. ILLUSTRATIVE ONLY, the form AF-2
    proposed: each upsert's statement returns `clock_timestamp()`, read under the row's lock, and the
    nonce is `v`, then that time in microseconds zero-padded to a fixed width, then 16 random hex
    characters, compared under `COLLATE "C"`; ties break on the random part. Existing nonces are 32 hex
    characters (`genUuid().replace(/-/g, '')`). Both properties are **Observed** for that form on
    Postgres 16.16 by QA's probe (`verification/017/qa-phase1/pg-order-probe/`, P1: tokens follow lock
    order; P2: new above old under `C` and `en_US`). Production's Postgres version is unread and no
    instrument on this box reads it (X-2); the falsifier is RK-9's. No reader of the nonce parses it
    (AF-2's `git grep previewImageNonce` at `1ad625e`: `getPreviewImageUrl` and the generator's key
    interpolate it; the shapes and selects pass it through).
  - *The upsert no longer writes `previewImageNonce`* (`buildMessageValues`, `buildUpsertMessageQuery`
    `doUpdateSet`). A new message's row starts with none.
  - *Commit.* After a 204, the continuation runs one conditional update: the nonce becomes *s*'s
    where the row is *m* and its nonce is null or sorts below *s*'s. The nonce it replaced is read
    under the same row lock as the update (QAF-10: QA's probe P3 shows a subquery read outside the
    lock returning a stale value under a concurrent commit, while a locked read returns the current
    one). It never inserts.
  - *Property.* For every set of saves of *m*, after their continuations, the row's nonce is the
    greatest-ordered nonce among the saves whose 204 was processed while the row existed; with none,
    it is the nonce the row held before them. The row's other columns are written as today. The
    save's response is unchanged except its `previewImageNonce`, which is the committed nonce (the
    previous one, or null) instead of the nonce of an image not yet made. The response does not wait
    for the generator (QA's NM-17; hazard 3).
- **M5-b — the named image exists.** For every message whose row names a nonce, the object at that
  nonce's key (M5-g) exists at every moment, as the website and generator write and delete it.
  Residue: rows already pointing at a missing object before the release (X-2), and bucket acts
  outside these two programs.
- **M5-c — deletion.** Objects are deleted by the website only, in three forms:
  1. a commit deletes the object of the nonce it replaced, when that nonce is not null;
  2. a continuation whose commit is refused (a later save has committed, or the row is gone) deletes
     its own object;
  3. (OQ-13, option a as written; option b removes this form) after its commit, a continuation lists
     the message's prefix and deletes every object other than the one it committed whose
     `LastModified` is at least **L = 120 s** before the committed object's `LastModified` in the
     same listing (AF-17): both times are the bucket's clock, never the function's, so no header read
     is needed (QA's EC-1 falls away). L must cover the earliest any in-flight save's object can be
     written: a later save's continuation starts after the committed save's started, and each writes
     its object within its own life (60 s, D-10), so a later in-flight object is at most 60 s older
     than the committed one and is never collected; the other 60 s are margin. The argument holds
     whether the bucket stamps `LastModified` at the start or the end of a put, since both fall inside
     the writing continuation's life; its residue is a disagreement of more than 60 s between the
     bucket's own servers' clocks, which no read here can measure without writing to the real bucket
     (QA's re-key on revision 3 routed a two-put check on the `dev/` prefix to the implementer; it is
     not required, because a put to the real bucket is outside what any stage here may do unasked).
     **A listing that does not contain the committing save's own object deletes nothing** (QAF-13: a
     later save's form 1 can delete it first, as in `W1 C1 W2 C2 D2 D1`, and a sweep without its
     reference would then delete the newly committed image).

  Property: after every completed commit's deletes, the prefix holds the committed object plus only
  objects written after it or less than L before it. An earlier save still in flight may have its
  object collected; its commit is refused and its own delete then finds nothing, which is harmless. Keep-only-latest (D-3) is restored at the message's first
  completed commit at least L after an extra object was written. The brief coexistence is a new
  requirement justified by D-2, against D-3. Residue, a bounded class (RK-2): every object whose 204
  no continuation processed (the continuation ended by the platform, or "no answer within T" with
  the render finishing later). Each is removed at the message's next completed commit at least L
  later, and stays for good if the message is never saved again or has been deleted.
- **M5-d — a new message.** A message whose generation has never succeeded stores no nonce, so
  `getPreviewImageUrl` returns the default image until its first success.
- **M5-e — saves and deletes of one message, interleaved.** The table's dimensions are, for saves
  *s1* and *s2* of *m* (upsert order), the position of each save's object write, its answer's
  arrival and class (204 or a failure class), its commit (accepted or refused) and its deletes;
  plus a delete of the message (row delete, then the delete route's purge) at any position. The
  outcomes are M5-a's property, M5-b, M5-c's property and residue, and: after a message delete, no
  continuation recreates the row, and every object a continuation wrote after processing its 204 is
  deleted by that continuation. QA's executable oracle (`verification/017/m5-decision-table/`; at
  revision 2, 36 rows and 3120 interleavings with message deletes and an old orphan, 0 violating, five
  mutants each firing, QA's re-key at `df45dde`) is re-keyed by QA to form 3's revision-3 age
  reference before the implementer's tests read it. An expected value is never computed from production code.
- **M5-f — one log line per failure** (D-8). For every save whose outcome class is 500, 404, another
  status, a network error or no answer within T, exactly one line is written to the function's log.
  It opens with the fixed prefix `preview-image-failure` (`git grep -c` is 0 in both repositories at
  `1ad625e` and `8de2b53`), then names the message id, the outcome class and the elapsed
  milliseconds. It carries no message content, no nonce and no key. On 204, no line is written. A
  continuation the platform ends writes nothing; T exists so that "no answer within T" is logged
  before the platform's cut. T is decided by two values. It must outlast every recorded generator
  success, queueing included: the max is 26275 ms (AN-4), each `<N>` includes the wait for the
  pool's one browser (`max: 1`), and puppeteer's 30 s default navigation timeout ends a hung render
  with a 500 inside it. It must also end at least 5 s before the platform's 60 s cut; M5-0 limb 3
  saw post-response work run to 55 s after the request's start, on a Preview (`8f26f37`). So
  **T = 40 s**, which holds for a save whose own work before the continuation takes up to 15 s. The
  save's own duration is unmeasured; a longer one can lose its line (RK-2).
  - *Instrument.* Vercel's runtime logs for the production deployment. Reset semantics: retention
    is about a day on this project (Vercel's Pro documentation: 1 day; the CLI refuses `-s 1d` and
    serves `-s 23h`; D-17's read). Feeds: one line per failing save. Window: the 23 hours before each
    read. Non-zero precedent: function stderr is readable today, 246 production records in 23 h, 14 on
    `/api/trpc/message.get` (D-17's read). The query selects on the prefix, never on `level:error`,
    which already counts about 240 unrelated lines a day.
  - *Reader* (QA's B-7). A crontab line on this box, installed by devops at Stage 1, runs every 12
    hours, so consecutive 23-hour windows overlap and no hour goes unread (F-20); counts are taken
    over the union of records, each record counted once by its id. Earliest read: 12 hours after the
    website deploy. Artifact: `verification/017/post-deploy/b7/<UTC stamp>.json`, one per read.
    Non-member control: the `/api/auth/session` cold-start lines. First real member: M5-0 limb 2's
    probe lines, 3 records read with `--deployment` (deployment record `d61f445`, § Outcome).
  - *What a count can say.* At AN-4's rate (15 non-successes in 16847 requests; 196 generations in
    30 days) a count is expected to read zero whether the line works or not. B-7 is a health
    check; the fixed-versus-unfixed distinction for item 2 is B-4, before release.
- **M5-g — the key contract** (AF-3, QAF-4). Every object key is `[dev/]previews/<message id>/<nonce>.jpeg`.
  The `dev/` prefix is decided on the website by `env.NODE_ENV === 'development'` (the deleter,
  `deleteMessagePreviewImages.ts`, and every new deletion) and `process.env.NODE_ENV` (the reader,
  `src/utils/getCDNUrl.ts`, `/dev`), and on the generator by `config.ENV === 'development'`
  (`src/generateImage.ts`; `src/config.ts` reads `process.env.ENV`). Property: on every environment
  where both run, the website's deletion prefix equals the generator's write prefix. Production: the
  website's `NODE_ENV` is `production`; the generator's `ENV` on its host is unread (its `.env`
  holds secrets, and no read here prints it), and production previews resolve under `previews/`
  without `dev/` (Inference from the working production images, chain 016's post-deploy looks). Its
  falsifier, after both deploys, is his B-6 look (F-25): a saved message's new preview showing after
  a reload of the list means the generator wrote where the website reads and deletes; a broken or
  unchanged preview names RK-10 or RK-1. The local walk records both variables' names and values. Every
  listing keeps the trailing `/` after the id (QA's NM-13). Tests use literal keys.
- **Cost** (AF-7). Each save now holds a function instance for the generator's round trip (AN-4
  median 2197 ms, bound T = 40 s) on a project without Fluid compute (D-10, Inference), where today
  it holds none. His valuation that costs are immaterial (`preview-image-generator.md` P-1) rests on
  facts holding, so the cost was put in front of him with revision 2 (steering's 00:11Z block).
- **Human-observable form.** On a local build with the generator stopped, save an edit to a message
  that has a preview. The message list keeps showing the old preview. Start the generator and save
  again: the new preview shows on the list's next fetch, a reload, because the message list learns
  a committed nonce only when it refetches (`message/page.tsx`, `f/[id]/page.tsx`; AF-18), so a walk
  reads it after a reload and never reads an unreloaded stale thumbnail as a failure. Walked by UAT
  on the local stack (QA's B-4). The rig, built by the
  implementer as M5's last step and handed to UAT: a loopback S3 stub that serves the objects it
  stores over HTTP; `CDN_ENDPOINT` and `NEXT_PUBLIC_CDN_HOST` pointed at it in the process
  environment and checked on the stub's request log, because `.env.local`'s `CDN_ENDPOINT` is a real
  DigitalOcean Spaces host and the website now deletes there (QA's E-9); the generator from the chain
  tip pointed at the same stub. `verification/015/m8-local-probe/`, read by the critic (F-11), forks
  the built server with dead endpoints and has no S3 stub or answering `/preview`, so it is not a
  precedent for this rig. Every process the rig starts is stopped, and its files removed, by the
  stage that started it on every exit path. In production, his look after the deploy: a normal save
  updates the preview, seen after a reload of the list (QA's B-6).
- Rollback: `git -C website revert <M5 commit>`, party as M1; the revert carries the lockfile back.
  The order against the generator is in § Release and rollback.

### M6 — The generator writes only a confirmed image and deletes nothing (item 2, generator)

Surfaces at `8de2b53`: `src/generateImage.ts` (default export, `generateMessagePreviewImage`,
`deleteMessagePreviewImages`), `src/server.ts` `processImage`, `src/config.ts`. The repository has no
tests (workspace `CLAUDE.md`). Verification is by probe under `verification/017/m6-probe/`.

- **M6-0 — the probe rig, built first, by the implementer.** In an export of the generator's chain
  tip, with its own `npm ci` from `package-lock.json` and puppeteer's Chrome: a loopback S3 stub that
  records every put and every delete; a stub `/preview` that answers 200, 404, 500, a hang past
  puppeteer's 30 s timeout, a reset and a 300. It runs network-isolated (`unshare -rn` with loopback
  raised). No precedent exists for it (F-11's read of `verification/015/m8-local-probe/`). The
  implementer stops it and removes the export on every exit path, and records both in the
  implementation document.
- **M6-a — 204 means the object for this nonce was written.** A request that passes the body and key
  checks is answered 204 exactly when its object (M5-g) was stored, and 500 otherwise, with nothing
  written. The render-path members answered 500:
  - `page.goto` rejects;
  - `page.goto` resolves with `null`, or with a main-resource status outside 200 to 299. At
    puppeteer-core 21.1.0 (`package-lock.json` at `8de2b53`), `goto` "will not throw an error when
    any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500
    "Internal Server Error"" (`lib/types.d.ts` of the published 21.1.0 tarball, sha256 `1e317926…`,
    read by this planner);
  - the screenshot rejects;
  - the put rejects.

  Unchanged: a bad body answered 500 and a wrong key, path or method answered 404, both before
  render. Residue: a request whose pool acquire never resolves is not answered at all
  (`system-architecture.md`, the generic-pool Problem Area); the website logs it as "no answer
  within T".
- **M6-b — the generator deletes nothing.** No request to this service deletes an object. Deletion
  is the website's (M5-c).
- **M6-c — its log lines keep their interface** (`preview-image-generator.md` A-1). `Server running
  at`, `Server received`, `Created instance`, `POST /generate` and the drain-complete line keep their
  text and emission count. `Generated image for message … in <N>ms` keeps its text, because AN-4 and
  later reads use it. New (AF-7): one always-on line per render-path failure, opening with the
  `preview-image-failure` prefix and naming its class (`goto-rejected`, `error-status`, `screenshot`,
  `put`), the message id and the elapsed milliseconds, with no content, nonce or key. Its shape is
  added to `verification/015/pig-host-read.sh` in the same change.
- The request contract is unchanged: `id`, `nonce` and `message` in, a status out. So Exclusions X-4
  (body validation) holds.
- **Security review** of the delta before release (stage set).
- Rollback: `git -C preview-image-generator revert <M6 commit>` on `prod`, pushed by devops on his
  word, deployed as § Release and rollback states.

### M7 — Lint baseline recorded; release readiness (item 5, D-9)

- **M7-a — baseline recorded as accepted.** At website `1ad625e`, through the shared install, by this
  planner (`verification/017/entry/lint-1ad625e/`, 454 files):
  - before fixes: 314 errors and 367 warnings in 112 files;
  - what the lint script (`eslint --fix . --max-warnings=0`) leaves after ESLint's fixes: 50 errors
    and 364 warnings in 71 files. Per rule: `summary.txt`.
  The critic re-summed both captures and matched them (critique pass 1, Premises). The architect's
  closing pass restates the Problem Areas row "ESLint carries known findings" from this capture, with
  its count and instrument, as accepted.
- **M7-b — the chain adds no finding.** At the chain's website tip, for every file the chain changed,
  each rule's count in the no-fix report is no higher than at `1ad625e`, and every new file has none.
  Instrument: the same two commands at the tip, in an export, compared per file and per rule. Run by
  the implementer before code review and by QA at Phase 2. Agent-authored criterion; it keeps D-9's
  baseline true at the release.
- **M7-c — nothing enforces lint** (chain A CR-3). Recorded, not fixed, under D-9: Exclusions X-12.
- Release readiness: § Release and rollback. QA Phase 3 runs at the merged tip in each repository.

### M8 — One Enter answers only the dialog that holds focus: the delete warnings and the image dialog (added by his selection, D-26)

Added at revision 5 (D-26). It is a numbered milestone, not a named rider, because its two files are
outside every approved milestone's diff. Surfaces at website `5c3d03f`, the same text as at `1ad625e`
(`git diff --stat 1ad625e 5c3d03f` over both files prints nothing, this planner, 2026-11-19T04:5xZ):
- `src/components/WarningDialog.tsx` `WarningDialog`: "Delete Field?", "Delete Embed?" and
  `` `Delete ${label}?` ``, rendered by `EmbedField.tsx`, `EmbedEditor/index.tsx` and `ComponentEditor.tsx`;
- `src/components/ImageUploader.tsx` `ImageUploader`: rendered through `components/dynamics/ImageUploader`
  by `Author.tsx`, `EmbedAuthor.tsx`, `EmbedFooter.tsx`, `EmbedImage.tsx` and `EmbedThumbnail.tsx`. It is
  mounted with `unmount={false}`, so several instances live on the edit page at once, each with its
  hotkey enabled only while it is open.

The defect, verbatim from the reviewer's FYI (`agent-output/INBOX.md`, 2026-11-19, code-reviewer-hooks-017):
*"While one of them is open and the editor's update prompt ("Message Update Detected") is raised by
another tab's save, one Enter would answer both."* Steering's helper executed it at `5c3d03f` (rulings
block 2026-11-19T04:50Z): one Enter on the document fired `["warn.confirm","img.close","img.set","reload"]`.
A second helper run (rulings block 2026-11-19T05:01Z) set the direction:
- with focus in the delete warning or the image dialog, Enter fired only that dialog;
- with focus in "Message Update Detected" off its buttons, it fired Reload and the dialog underneath;
- with focus on a react-aria `Button`, Enter never reached the document.

Which element a browser focuses when the update prompt opens is RK-11's.

- **M8-a — the class and its members** (CR-9's class). A dialog whose Enter answer listens at the
  document, so a key meant for one open dialog answers another. Locating instruments, over production
  source (`':!**/__tests__/**'`):
  - `git grep -n "useHotkeys(\['enter'\]"`;
  - `git grep -n "addEventListener('keydown'"` for a raw listener;
  - `git grep -n "useDocumentEventListener('keydown'"` for this repository's own wrapper
    (`src/utils/hooks/index.ts` `useDocumentEventListener`, which calls `document.addEventListener`
    with a variable, so the second listing cannot see it; F-26).

  At `5c3d03f` (this planner, 2026-11-19T04:5xZ for the first two, 05:1xZ for the third), the first
  gives 3 hits, the second 0 and the third 1. The third's hit, `src/components/EmojiPicker/Root.tsx`,
  tracks Shift and is a real non-member. So:
  - `ConfirmationDialog.tsx` `Inner` is a non-member: it has been scoped to its own dialog since `a5dd76f` (M4, CR-9).
  - `WarningDialog.tsx` and `ImageUploader.tsx` are the members.

  The other `useHotkeys` sites are outside the class: `esc` in `Sidebar.tsx` and `m/[id]/_layout/Navigation.tsx`
  closes the sidebar, and `edit/page.tsx` `useRegisterHotkeys` binds `HOT_KEY_MAP`'s `ctrl+…` keys
  (`src/constants/index.ts`), not a dialog's answer.

  The grep only locates; what judges a hit is M8-b's property. The predicate has a real member
  (`WarningDialog.tsx` at `5c3d03f`) and a real non-member (`ConfirmationDialog.tsx` at `a5dd76f`).
  M8's first step re-runs the three listings at the chain tip and writes them to the implementation
  document. A hit found there that this list lacks gets its disposition before code review.
- **M8-b — the property.** For each member and each mounted instance of it, while it is open, an
  Enter keypress runs its answer only when `document.activeElement` lies inside that instance's own
  dialog element. The answer is `onConfirm` for `WarningDialog`, and `submit` for `ImageUploader`
  (set only while an image is loaded). With `ConfirmationDialog`'s scoping, one Enter answers at most
  one open dialog, the one holding focus. Every other open dialog stays open and unanswered, and can be
  answered on its own afterwards.

  Decision table over the finite combination of which dialogs are open and where focus is. W is a
  `WarningDialog` instance, I an `ImageUploader` instance, U the editor's `ConfirmationDialog`
  instance and L the layout's link prompt (M4). U's reachable way to open over W or I is another tab's
  save (`usePusher`'s update prompt, raised through `showConfirmation`).

  Where focus sits inside a dialog decides who answers. Steering's helper showed this at `5c3d03f` in
  jsdom (rulings block 2026-11-19T05:01Z, preserved under `verification/017/qa-phase1-r6/`):
  - Enter on a focused react-aria `Button` never reaches the document, so only that button acts.
  - The hook ignores form fields (M8-c).
  - Only with focus in a dialog off its buttons (its panel or its text) does a document hotkey decide.

  So the table names the position (QAF-20). The rows marked red fail at `5c3d03f`; the rows marked
  control pass at `5c3d03f` and after.

  | Open | Focus in | One Enter answers | Every other open dialog |
  |---|---|---|---|
  | W alone | W, off its buttons | W's hotkey, `onConfirm`, as at `1ad625e` (M8-c) | — |
  | W alone | one of W's buttons | that button only, as at `1ad625e` (M8-c) | — |
  | I alone | I, off its buttons | I's hotkey: `submit` (`onClose`, then `setImage`) with an image loaded, nothing without, as at `1ad625e` (M8-c) | — |
  | I alone | one of I's buttons, or the URL field | that control only, as at `1ad625e` (M8-c) | — |
  | W and U | U, off its buttons | U only. Red: at `5c3d03f` W's `onConfirm` and Reload both run | W open, unanswered, answerable on its own |
  | W and U | W, off its buttons | W only (control) | U open, unanswered, answerable on its own |
  | W and U | U's Reload (its autofocused button) | Reload only (control; not discriminating) | W open, unanswered, answerable on its own |
  | I and U | U, off its buttons | U only. Red: at `5c3d03f` I's `submit` and Reload both run | I open, unanswered, answerable on its own |
  | I and U | I, off its buttons | I only (control) | U open, unanswered, answerable on its own |
  | U and L | either | M4-b, unchanged | M4-b |
  | W or I, with L | — | unreachable: L opens only on a link click and W or I only on a user act in the editor, and each is blocked by the other's modal (CR-9, "Outside M4's change"); no case owed | — |
  | W and I | — | unreachable for the same reason; no case owed | — |
  | none of W, I | anywhere | nothing that W or I runs (each is enabled only while open, as at `1ad625e`) | — |

  Which dialog takes focus when U opens over W or I, and at which element, is headlessui's choice. The
  tests place focus at each row's position and assert that only the focused dialog answers. A real
  browser's choice, and whether Enter on a focused `Button` stays off the document there too, are
  RK-11's, walked in QA's B-13.
- **M8-c — a lone dialog behaves as at `1ad625e`.** For each member open alone, and for every focus
  position inside its panel, one Enter has the same effect as at `1ad625e`. The positions:
  - W: the panel off its buttons, the close button, Cancel, and the confirm button;
  - I: the panel off its buttons, the close button, the URL field, Cancel, Clear and Save, each with
    and without a loaded image.

  The off-button position is the only one where the hotkey decides alone. Its `1ad625e` answer is
  W's `onConfirm`, and I's `submit` with an image loaded (nothing without one).

  Expected values are literals recorded from a run of the same cases at `1ad625e`. They are never
  derived from the code under test.

  What this limb rests on, read at react-hotkeys-hook 5.2.4 (the lockfile's version, `pnpm-lock.yaml`;
  the installed `dist/index.js` keydown handler, read 2026-11-19T04:5xZ):
  - The hook ignores a keydown from a form field (`input`, `textarea`, `select`, role `textbox` and the
    others in its list) unless `enableOnFormTags` is set. So Enter in the URL field never fires I's
    hotkey, before or after.
  - Given its returned ref, the hook fires only when the active element is that element or inside it.
    This is a second admitted form of the scope.

  Plan 015's D30 kept "a Cancel key press never deletes" as already true, on a real-Chrome read
  (`verification/015/m3-chrome-read/README.md`). Here that property is the Cancel row of this limb:
  Enter on a focused Cancel runs no confirm, after M8 as before. What stops it stays unidentified (X-20).

  The one change: while a dialog is open, Enter with focus outside every dialog stops answering it.
  headlessui's focus trap keeps focus inside the open panel, so ordinary input cannot reach that state
  (CR-9's Preferred form, its stated cost).
- **M8-d — the dead compare goes.** At the milestone tip, `git grep -c "tagName !== '~/components/Button'" -- src`
  prints no line. Counts by the same command:
  - `1ad625e`: 3 (`ConfirmationDialog`, `ImageUploader`, `WarningDialog`);
  - `5c3d03f`: 2 (`ImageUploader`, `WarningDialog`).

  This retires X-7.
- **The form, mirrored.** Sibling: website `a5dd76f` `src/components/ConfirmationDialog.tsx:Inner`. It
  puts a ref inside the panel, and its handler checks
  `ref.current?.closest('[role="dialog"]')?.contains(document.activeElement)`. The preferred form
  (AF-23) lifts that one check into a shared function that all three dialogs call, for example a hook
  taking the ref and the answer, because three inline copies of one predicate is the drift shape
  `architecture/website.md` A-3 records. A third inline copy is admitted. When the check is lifted,
  `ConfirmationDialog`'s behaviour stays as approved at `5c3d03f` and its cases pass unchanged.
  - *Where the ref goes.* Inside each instance's own panel, as in `Inner`. Both members call
    `useHotkeys` above `PresetDialog`, and `ImageUploader` keeps closed instances mounted
    (`unmount={false}`). A ref on the outer component, or one shared across instances, fails M8-b's
    per-instance property.

  One form serves all three (his standing mirroring rule). No deviation.
- **Human-observable form.** Two tabs on one saved message, signed in:
  1. In tab A, open a field's "Delete Field?" (or the image dialog, with a loaded image).
  2. Save from tab B, so that "Message Update Detected" appears in A.
  3. Put focus in "Message Update Detected" off its buttons, on its text, as QA's B-13 states, and
     press Enter once.

  Only "Message Update Detected" answers (Reload). The delete warning or the image dialog stays open
  and unanswered, and can be answered on its own. Before the fix, its action also runs. With focus
  on a button the walk reads the same before and after, so it does not count. QA has registered it as a pre-release row (B-13), walked by UAT on the local stack before
  release. After deploy it can be checked in production by the same act.
- **Order.** M8 code starts once the critic, the architect and QA Phase 1 have approved revision 7
  (OQ-14 is answered, D-29). It shares no file with M5 or M6, so it may run beside them. It lands
  before M7's tip read, since M7-b counts lint over every changed file, these two included.
- **Re-derivation gate.** M8 is written against website `5c3d03f`, after M1 to M4 landed, so its
  premise is argued against their behaviour. It is not marked `PREMISE-STALE`.
- Rollback: `git -C website revert <M8 commit>`, party as M1.

## Testing Strategy

- **Website.** The standard is `agent-output/CLAUDE.md` § Test Conventions: vitest, placement and
  naming, axioms A to E, DOM tests for `.tsx` mounted with `createRoot` and `act`. Expected types:
  - M1: renames, a deletion, and new exact-text assertions (DOM);
  - M2 and M3: DOM tests mounting the real `MessageProvider`, with AN-1's and AN-2's probes as the
    carried instruments; M3-g and M3-e with literal stored strings;
  - M4: DOM tests of the link class, mounting the message layout's guard context;
  - M8: DOM tests with the real hotkey library, each member open beside the editor's confirmation
    dialog in both orders and open alone, M8-c's expectations as literals from a `1ad625e` run;
  - M5: Node tests of `upsertMessage`'s continuation, with fetch, the bucket, the database and
    `waitUntil` substituted (the substitute records the promise and the test settles it),
    mirroring `src/server/api/utils/__tests__/shared.upsert-valid.test.ts` and its
    `helpers/capturingDatabase`; the M5-e oracle read by them once QA has re-keyed it;
  - M5, real Postgres (QAF-10, QA's EC-2): the shipped upsert and commit statements, run against a
    throwaway Postgres container on this box with two concurrent sessions, because the Node tests
    substitute the database and cannot tell a locked read of the replaced nonce from an unlocked one.
    QA's `verification/017/qa-phase1/pg-order-probe/` is the prototype. The implementer runs it at
    M5 under `verification/017/m5-pg/` and removes the container on every exit path; QA re-runs it at
    Phase 2. It is outside the standing suite, so these limbs have no standing instrument.
  A run counts only with process exit 0 beside the counters, and `pnpm run typecheck` covers both
  programs. Critical scenarios: every limb red where the limb names its red, and the M5-e table.
  QA's named mutants NM-1 to NM-25 bind the implementer (QA Phase 1 and its revision-2 re-key,
  § Named mutants).
- **Generator.** No suite. The M6 probe (M6-0's rig) runs on this box.
- **Hosts and instruments per milestone.**
  - This box: vitest, the probes, lint, the local walks.
  - The generator host: AN-4's read and B-10, through the read-only alias `ssh hooks-pig`.
  - Vercel: M5-0's preview deployment and B-7, read with `npx vercel@66.2.0 logs … --json` (exists
    on this box: QA ran it, D-17).
  - Production, after the deploy: his looks (B-6, B-8, B-9).
- **Pre-landing probe against post-landing gate.** M5-0 runs every cell that does not need the
  landed tree: the `waitUntil` cell (and its control), and the render times, which are met. M5-a to
  M5-g are the post-landing gate.
- **A changed tool used as a gate's instrument.** `verification/015/pig-host-read.sh` gains M6-c's
  shape in this chain and is B-10's instrument; B-10 runs the changed script beside AN-4's unchanged
  count script, whose output is recorded with it.

## Validation

Run once at the named trees by this planner on 2026-11-18, captures under `verification/017/entry/`:

- Website `1ad625e`, suite: 1508 of 1508 passed, 123 files, exit 0 (`base-1ad625e/vitest.json`,
  `vitest.exit`). QA reproduced it in its own export (QA Phase 1, Premises).
- `pnpm run typecheck`: exit 0.
- Lint baseline: M7-a.
- Serving refs (`release/`):
  - website: one serving ref (`master`), no pair;
  - preview-image-generator: `master` `87dcb41` is contained in `prod` `8de2b53`
    (`merge-base --is-ancestor`: master in prod 0, prod in master 1);
  - project-utils: one serving ref.
- Environment premises carried, each dated: Vercel production has a 60 s function timeout
  (Observed) and no Fluid compute (Inference) (analyst, 2026-11-18T23:12Z,
  `an3/vercel-api-project-record-extract.txt`). Production served `395510e` at 2026-11-18
  (`an3/vercel-inspect.txt`); chain A's release then moved `master` to `1ad625e` (`git ls-remote`,
  22:4xZ). Runtime-log retention about a day (QA, 2026-11-18T23:43Z, D-17: the CLI refuses
  `-s 1d` and serves `-s 23h`; Vercel's Pro documentation says 1 day, steering's read, block 00:06Z).

## Risks

| RK | Risk | Falsifier (carrier) | Record per review pass |
|---|---|---|---|
| RK-1 | `waitUntil` does not keep post-response work alive in this route, so previews stop updating | M5-0 limb 2; after release, his look at a saved message's preview (QA's B-6) | — |
| RK-2 | A continuation ends before it processes its answer (the platform's cut, a save longer than 15 s, a render past T): a stale preview (safe), an orphan object (M5-c's residue), and a "no answer" line or none | M5-0 limb 3 for the platform's cut on post-response work (lasts to 55 s on a Preview, `8f26f37`); AN-4: max 26275 ms over 16832 successes; after release, B-7's 12-hourly count of `preview-image-failure` lines with class "no answer within T" | — |
| RK-3 | Own-save recognition suppresses a real remote update (hazard 4) | M2-c's members; residue as stated in M2 | — |
| RK-4 | The storage change loses a draft already in a user's browser at first load | M3-e's fixtures | — |
| RK-5 | Two saves of one message, or a save and a delete, commit the wrong nonce, delete the committed object or resurrect a row | M5-e's oracle (re-keyed to revision 2 at `df45dde`, 0 of 3120 violating; owed again for revision 3's age reference); the real-Postgres lane | — |
| RK-6 | The generator deploy stops a process mid-render | `handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md`, devops's read | — |
| RK-7 | Stored messages whose `/preview` render answers an error status stop being re-imaged and keep their stale image (unclosed-assumptions item 7) | QA's B-10. Reader: a crontab line on this box installed by devops at Stage 1, earliest read 30 days after the generator deploy, running `verification/015/pig-host-read.sh` with M6-c's shape through `ssh hooks-pig`. The read is the count of M6-c's `preview-image-failure` lines of class `error-status` since the deploy; each counted line is a member (a stored message whose render answers an error status and keeps a stale image), and zero over the 30 days is no member observed. Artifact: `verification/017/post-deploy/b10/<UTC stamp>.txt`. Carrier for the result: the handoff devops mints at Stage 1. Liveness precondition (QAF-14), without which zero means nothing: (1) at M6, the changed `pig-host-read.sh` is shown counting one fixture line of M6-c's exact shape on this box, by the implementer, captured under `verification/017/m6-probe/`; (2) at each read, the same region's `Generated image for message` count since the deploy is above zero, recorded beside the failure count. | — |
| RK-8 | M4 misses a link | M4-d's table re-derived at the tip against its three listings (the `next/link` and `StyledLink` importers, and the string `onPress` item sites) | SL-2 (critique pass 2): three members found missing from revision 2's table, added at revision 3 |
| RK-9 | The database clock steps backwards between two saves of one message, so a later save's nonce sorts below an earlier one's and is refused: the earlier save's preview shows until the next save | None measured: the clock order is Observed on Postgres 16.16 (QA's P1) and production's version is unread; a member shows as a stale preview after a save, never a broken one (M5-b holds either way), seen in his look (B-6) | — |
| RK-10 | The website's and generator's `dev/` predicates disagree on an environment, so deletions miss (a leak) | M5-g; the local walk's recorded values | — |
| RK-11 | When the update prompt opens over an open delete warning or image dialog, a browser leaves focus in the dialog underneath, so Enter answers that one and not the one on top | Which dialog takes focus is headlessui's choice, and jsdom cannot show a browser's. M8-b holds either way (exactly one answers, the focused one). Falsifier: UAT's real-browser walk of M8's human-observable form (QA's B-13) | — |

## Release and rollback

- **Order: website first, then the generator.** In the window with the new website and the old
  generator, behaviour is today's: the old generator still deletes before it renders, so a failure
  shows a broken image. In the reverse window (old website, new generator), nothing deletes the old
  objects (a leak), and the website still rotates the nonce unconditionally. So the generator waits
  until the website release is verified live. Rollback runs the reverse way: the generator is
  reverted first (deletion restored) and confirmed deployed, then the website.
- **Website:** `master` fast-forward to the chain tip, pushed by devops on his word; Vercel deploys.
  Dry run and report: `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master <tip> --dry-run`.
  Deploy evidence: QA's B-11 (`vercel inspect` commit contained in the release).
- **Generator:** `prod` fast-forward, pushed by devops on his word; `prod.yml` runs on a self-hosted
  runner on the host. Per `preview-image-generator.md` P-3, a push while the runner is down queues
  the job and deploys nothing; at chain 015's release the generator deployed 24 minutes after the
  push because he had to start the runner. So: **owner step**, written as a file under
  `verification/017/` by devops and printed for him (`owner-steps` skill) — start the runner when
  devops reports the job queued and no host start line after the push. Deploy evidence: the host's
  generator start line after the push, read through `ssh hooks-pig` (B-11), never the push alone.
  The same holds for the rollback push, and the website's revert waits on that evidence. `master`
  follows so that `prod` keeps containing it. The host has a `-preview` instance
  (`verification/015/pig-host-read.sh` header), but no `preview` branch exists at the remote. Whether
  to use it is devops's call, and it is a hazard line.
- **Cross-repo contract.** The cross-repo-contract skill
  (`~/.claude/agent-skills/cross-repo-contract/SKILL.md`, read by the critic and the architect) asks
  for no contract file; it governs shared types and pinned dependencies, and the two repositories
  share neither. The contract is HTTP plus the bucket's keys: what 204 means (M6-a), who deletes
  (M5-c, M6-b) and the key form (M5-g). QA reads the skill's Shared Types rule as applying because
  each side re-implements the prefix; with no type to share across these repositories, M5-g's
  criterion is how the plan carries it. Its home is `system-architecture.md` Runtime Flow 3 and
  `preview-image-generator.md`, reconciled from the implemented tree by the architect's closing pass,
  no later than devops Stage 1 (AF-9).
- Handoffs this release fires: the drain handoff (generator stop); none of the generic-pool,
  host-posture or API-key handoffs, because no lockfile pin of puppeteer or generic-pool moves and no
  workflow or `deploy.sh` file is edited.
- Launch directory for spanning stages: `/usr/local/bin/hooks` (two product repositories and the
  record).
- QA sequencing: QA Phase 1 runs before implementation (stage set); its re-key to revision 7 runs before M5, M6 and M8 code.

## Entry facts (per repository)

Read 2026-11-18 by this planner unless marked.

| Repository | Ref read | Hooks | Tracked build output | Consequence |
|---|---|---|---|---|
| website | `origin/master` `1ad625e` (chain A released 22:41Z; `git ls-remote`); the tree on `master` at `1ad625e` at 23:5xZ | `core.hooksPath` unset; no non-sample hook in `.git/hooks` | none under `dist`/`build`/`.next` | This chain's branch is cut at implementation start by steering. |
| preview-image-generator | `origin/prod` `8de2b53`, `origin/master` `87dcb41` | none | none tracked under `dist`/`build` | No tests and no installed `node_modules` on this box; M6-0 installs in an export. |
| project-utils | `origin/master` `749606d` | `.githooks/pre-commit` rebuilds and refuses a commit that leaves modified files | `dist/` tracked (13 files) | Read only; no change planned (X-5). |
| agent-output | `master` | — | — | `tools/open-handoff-trigger-sweep.py` does not exist; the handoff enumeration was made by reading every open handoff's frontmatter. |

Gate refusals in this planner's run, each disclosed and not retried in another form:

1. A helper's `grep -rn` over an export of website `src` (named the generator's `prod.yml`;
   `verification/017/entry/disclosure-refused-grep.txt`).
2. This planner's `grep` with relative paths after a `cd` into the generator. It was re-issued once
   with absolute paths, which show the gate its true target, the form the gate's message names. It
   found no `node_modules`.
3. This planner's recursive `grep` over `uat qa verification/016` for a preview URL. Not re-issued.
   The CDN question it served was dropped from the design.

### Open handoffs whose trigger this chain fires

Enumerated from all 22 open handoffs' `Review-Trigger` (a python read of each frontmatter, this
planner, 2026-11-18T23:5xZ, re-run at revision 2 because § Release and rollback changed). Since
revision 1, `upload-message-dialog-closes-on-first-portal-load-2026-11-08` is closed and
`anchored-popover-first-load-test-is-order-dependent-2026-11-18` is open.

| Handoff | Disposition |
|---|---|
| preview-image-failure-shows-broken-not-stale-2026-08-24 | Discharged by M5 and M6. |
| save-originating-tab-raises-its-own-update-prompt-2026-08-25 | Discharged by M2. |
| unsaved-change-guards-disabled-for-unauthenticated-users-2026-08-24 | Discharged by M3 and M4. Items 1 to 3 by M3-d; item 4 by M4. |
| website-tests-not-beside-their-module-2026-11-08 | Discharged by M1-a and X-13. |
| editor-error-lines-render-text-unasserted-2026-11-11 | Discharged by M1-c. |
| message-init-cached-edits-lost-2026-08-27 | Discharged by M3-a. |
| local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11 | Named in the briefs of the M2, M3 and M5 walks; UAT reads it. |
| preview-image-generator-drain-under-load-unobserved-2026-11-08 | Fires at the M6 deploy; devops. |
| bug-evaluation-fixes-unclosed-assumptions-2026-11-08 | Item 3 (only the website calls `/generate`): M6-b means another caller's objects would accumulate, not vanish; it stays QA's. Item 7: RK-7, B-10. |
| qa-014-bc7-closing-observation-and-test-inventory-2026-11-10 | QA's, at Phase 1. |
| preview-image-generator-api-key-in-workflow-files, -host-security-posture, -generic-pool-private-field | Not fired (no workflow, `deploy.sh` or puppeteer/generic-pool pin change). |
| anchored-popover-first-load-test-is-order-dependent-2026-11-18 | Not fired: its test file is not edited by this chain. |
| the other nine | Not fired (re-checked against M1 to M7 at revision 2). At revision 5, no open handoff names M8's surfaces: `grep -il` for `hotkey`, `WarningDialog`, `ImageUploader` and `tagName` over `handoff/*.md` hit 4 files, each on unrelated text ("implementer-", read at 2026-11-19T04:5xZ). |

## Exclusions

| X | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | Retention beyond M5-c's transient coexistence | D-3 | Stated limit |
| X-2 | Rows already pointing at a missing preview object | Determination Out; no DB instrument on this box. After release, a resave repairs a row. | Stated limit |
| X-3 | The generator host's security posture | Accepted by him | `handoff/preview-image-generator-host-security-posture-2026-11-08.md` |
| X-4 | `/generate` body validation | The request contract is unchanged (M6), so the determination's rider condition does not fire | `architecture/system-architecture.md` Problem Areas row |
| X-5 | project-utils schema change | The order two saves need rides in the nonce itself, minted from the database clock (M5-a, AF-2's option a); every reader of the nonce only interpolates or passes it | Stated limit |
| X-6 | The Pusher app per environment | Determination Out | Stated limit |
| X-7 | The Enter-key compare in the dialogs | Retired at revision 5 by D-26. M4 removed it from `ConfirmationDialog` (`a5dd76f`), and M8-d removes it from the other two. What stays is X-20. | — (retired) |
| X-8 | A prompt on the signed-in Log out beyond today's | Determination Out. M3's source fix also keeps the edits through Log out; the browser's unload prompt there is unchanged (M3-d). | Stated limit |
| X-9 | Delete, Clear, Load and mode-switch confirmations | Determination Out; they work for both | Stated limit |
| X-10 | Recommendations 2, 3 and 5; `TODO.md` items | Determination Out. Recommendation 3 binds M5's lockfile step. | Stated limit |
| X-11 | The 50 errors and 364 warnings the lint script leaves | D-9 | Architecture Problem Areas row, restated in the architect's closing pass (M7-a) |
| X-12 | Nothing enforces lint: no workflow or hook runs ESLint, and `next build` does not lint. Chain A's `no-restricted-syntax` rule has two phrasings it cannot see (0 members) | D-9 ("no source files change") | Architecture Problem Areas row (M7-c); chain A CR-3 |
| X-13 | `cron.scheduled-selection` and `interactions-edge.signature-before-parse` stay in `src/server/api/__tests__/` | Their modules live under `src/pages/api/`. Next 16.1.6's default `pageExtensions` are `tsx, ts, jsx, js` (`next/dist/server/config-shared.js`), `next.config.js` sets none, and `next/dist/build/entries.js` has no `__tests__` exclusion (`grep -c` 0). So a test file there would be built as an API route. Read, not run; steering's helper ran it under webpack (`steering/017-rulings.md` block 23:24Z), Turbopack not run. | `agent-output/INBOX.md` entry "2026-11-18 — planner-hooks-017 — DECISION NEEDED" (a Placement exception in `CLAUDE.md`), left uncommitted for the record's owning session |
| X-14 | Navigations that cannot be stopped: `router.push`/`replace`, `redirect()`, back/forward | D-12; Next 16.1.6 (AN-2) | Stated limit; UAT row |
| X-15 | `beforeunload` on the send page | `useUnloadAlert` is mounted on the edit page only. Edits survive in storage (M3), so closing the send page loses nothing. | Stated limit |
| X-16 | Pre-013 history of the own-tab notice (G-5) | No criterion rests on it | Stated limit |
| X-17 | A fallback at the preview read sites (`getPreviewImageUrl` and its callers) | The determination puts them in scope only if the design adds a fallback there; M5-b makes every committed nonce name an existing object, so none is added | Stated limit |
| X-18 | Draft-store residue: an entry for a deleted message until eviction; two tabs sharing one id after the browser duplicates a tab; two tabs editing one saved message, which share its one entry (last writer wins, as today) | None loses work today's store keeps; the first is bounded by M3-h's bound under OQ-11 (a), and by the quota under (b) | Stated limit (the third member added at revision 3, F-23; D-21 accepted the row as written at revision 2) |
| X-19 | Orphan preview objects whose 204 no continuation processed, under a message never saved again or deleted | M5-c's residue; removing them needs a sweep outside a save, which no design here has | Stated limit; RK-2 |
| X-20 | What stops Enter on a focused Cancel from running confirm stays unidentified | M8 keeps its effect as at `1ad625e` (M8-c) and names no mechanism. Steering's 05:01Z helper saw, in jsdom, that Enter on a focused react-aria `Button` never reaches the document; the code that stops it is not read. Identifying it was outside the determination (015 D30 and its X-18) and outside D-26's option. | `architecture/system-architecture.md` Problem Areas row "Enter-to-confirm in dialogs rests on an unidentified mechanism", restated by the architect's closing pass |

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| Generator `page.goto` does not reject on an HTTP error status | steering-roadmap, `verification/017/steering-refute/` (c2) | Discharged at revision 1: M6-a, re-derived at puppeteer-core 21.1.0's published source. |
| Nothing enforces lint (chain A CR-3) | `code-review/closed/fix-dialog-closes-on-first-portal-load-code-review.md` CR-3 | Discharged at revision 1: M7-c, X-12. |
| Base moved to website `1ad625e` | steering-roadmap | Discharged at revision 1: every cited line re-read at `1ad625e`, or shown unchanged from `395510e` by `git diff --quiet`; suite and lint re-taken there. |
| QAF-19 LOW: website `src/app/message/__tests__/layout.navigation-guard.test.tsx`, `it.each` "search result to %s: asks is %s", fills its second format slot with the row's current-id column, so the titles print an id ("… asks is 4") where the expectation belongs. The assertions are correct; only a failing run's title would misstate what was expected | `qa/017-existing-items-backlog-m4-qa.md` QAF-19 (agent-output `de8d171`), routed under steering's M4 cap (`steering/017-rulings.md` block 2026-11-19T04:14Z, `a805d4d`) | Parked as a stated limit with no fix round, per the cap. Changes no criterion, test assertion or verifier. Gets its fold disposition at the post-Phase-2 seam. |
| M4-d's member table, four corrections: `NavMenu`'s Invite Bot (another site; a member, which Next's `onNavigate` never reaches), Support (`newTab`; not a member), `InfoPanel`'s bot invitation on `/send` (a member), and the cookie notice's "Learn more" (new tab; not a member) | `implementation/017-existing-items-backlog-m4-implementation.md` § "Class re-derivation at the tip" (`c16132b`); `steering/017-rulings.md` block 2026-11-19T02:43Z | Carried to the post-Phase-2 seam of the last milestone. Each member was dispositioned and covered at M4's code review and QA Phase 2 (`5c3d03f`), so the table's text changes no code, test or verifier. |
| M4-a's "the one interception Next 16.1.6 offers": `StyledLink` also intercepts a plain click on a link to another site, from `onClick` | M4 document § Deviations (`c16132b`); rulings block 2026-11-19T02:43Z | Carried to the same seam, for the same reason. |
| M3's write matrix, row "Message *n* opened (fetch)": the Sn cell is "removed when the fetched copy is shown", not "nothing written" | CR-8 LOW (`code-review/017-existing-items-backlog-code-review.md`); M3 document, CR-8 deviation | Carried to the same seam. The code is kept, reviewed and QA-passed at M3 (`1ab3b96`). |

## Resumption State

Written 2026-11-19T05:16Z by planner-hooks-017, at revision 7.

- **Done.** Revision 7 folds the three verdicts on revision 6 (critic `6d55bfc`, architect `635868d`,
  QA `b974198`) and limb 3's result (`8f26f37`, lasts). M5-0 is met. D-26 to D-30 are registered. M1 to
  M4 are through code review and QA Phase 2 at website `5c3d03f`.
- **Next.** The critic's delta-bounded pass 2 and QA's re-key read revision 7. The architect's delta
  read of AF-23's fold is steering's to route. M5, M6 and M8 code start on their approval (steering's
  hold). Findings fold in one revision.
- **Open items carried.** The Planner batch holds QAF-19 and the three record corrections, folded at
  the post-Phase-2 seam. The INBOX.md entry "2026-11-18 — planner-hooks-017 — DECISION NEEDED" (X-13)
  stays for the record's owning session.
- **Branches.** Website `chain/017-existing-items-backlog` at `5c3d03f`; both probe branches are
  deleted. The generator's branch is not yet cut (devops names it before M6).
- **Uncommitted or mutated.** Nothing of this planner's beyond that INBOX entry.
- **Gate refusal disclosed at the 00:3xZ checkpoint, kept here.** The record-write gate refused a shell
  heredoc append to this plan (an empty append). It was not re-issued in that form, and that section
  was written with the Edit tool.
- **Messages sent.** Revision 7 goes to the critic and QA directly (both asked for the folding
  revision), with steering told for routing. Owed to this planner: their verdicts on revision 7.
