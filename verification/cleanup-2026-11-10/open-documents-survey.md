# Open-document sweep (read-only), record HEAD ac62240, 2026-11-10

All paths relative to /usr/local/bin/hooks/agent-output. Nothing there was edited. The tree has foreign uncommitted
changes (`git status --short`: INBOX.md, TODO.md, code-review/closed/013-...-code-review.md, handoff/preview-image-generator-host-security-posture-2026-11-08.md, implementation/closed/012-...-implementation.md, ...); not mine, not touched.

Vocabulary source: `node ~/.claude/tools/seam.js --vocabulary` (saved at scratchpad/vocab.txt).
`check-repo.js --status` output saved at scratchpad/status.txt. `ls -d planning/*.md` -> "No such file or directory" (exit 2): **no plan outside planning/closed/**; planning/ holds only `closed/`.

## 0. The open chain-014 document

`node tools/check-repo.js --status` (status.txt:23-24): "chain 014 — 1 open, 11 closed" with `▶ verification         Complete`.
It is **verification/014/disposition-table.md** (frontmatter lines 1-5: `ID: 014`, `Origin: 014`, `UUID: 4671e28c`, `Status: Complete`; no Status-Detail; no changelog section).
- Kind `verification` is NOT in the seam vocabulary (no row), so "Complete" is neither working nor terminal by the printed table. check-repo's "open" = "not under closed/" (tools/check-repo.js:747 `docs.filter(d => !d.closed)`), and verification/ has no closed/ directory (`ls verification`: 012 013 014 015 cleanup-2026-11-10 fix-v1-guild-messages-auth README.md).
- Role: plan 014 AC1's instrument ("standalone artifact covering all 48 rows", disposition-table.md:8-9; planning/closed/014-test-suite-cleanup.md:209) and the "single source" for Outstanding Items (planning/closed/014-test-suite-cleanup.md:252).
- Chain 014 is otherwise fully closed: planning Released, deployment Released "chain closed 2026-08-27" (status.txt:25,33), retrospective Processed (status.txt:35).
- Disposition (b/ambiguous): nothing records a closing act for a verification table. devops.md:67 enumerates the closure set as plan, implementation, code-review, QA, UAT (+ deployment at 2D, devops.md:161); verification is not listed. Candidate next act: a ruling on whether verification documents move to a `verification/closed/` at all (steering/owner-of-process decision), not a per-document closure. I did not find an agent definition that owns it.

## 1. analysis/test-inventory-2026-08-26.md

- Frontmatter: `Status: Active`; no `Status-Detail` (lines 1-6: UUID 4e9b17c3, Status Active). ID-less.
- Vocabulary (analysis): working `Active`; terminal `Committed` `Released` `Abandoned` `Superseded`.
- Changelog (only 1 row, lines 10-14): "| 2026-08-26 | Created. Full inventory of `website`'s 48 test files against the coordination plan's rubric. Static analysis only; suite not executed. |"
- Own closing text: none stated. Its Open Questions table (analysis/test-inventory-2026-08-26.md:379-386) lists 6 questions each with "What would close it", all pointed at chain 014's work (Q5 -> "The implementer's Disposition Table", Q6 -> "Per-file mutation ... during the disposition pass", Q3 -> "One suite run at `a74b9e2`").
- Consumption recorded: `analysis/closed/014-test-suite-cleanup-analysis.md:5` `Parent: test-inventory-2026-08-26.md`; planning/closed/014-test-suite-cleanup.md:59 "Source of truth for classification: ... test-inventory-2026-08-26.md ... Its rows are the input class for every criterion"; retrospectives/closed/014-test-suite-cleanup-retrospective.md:93 "Research (inventory) ... `f7666b3`, ID-less researcher doc, 48 files classified. Chain's input, not a chain stage."; retro:747 "48/48 inventory rows dispositioned"; verification/014/disposition-table.md:8-9 "covering all 48 rows of `agent-output/analysis/test-inventory-2026-08-26.md`". Chain 014 Released.
- Not found: any document that states this inventory itself may be closed, or a Released/Committed token set on it. INDEX.md:237 still lists it Active. grep -rln shows only the 014 documents + INDEX cite it.
- Candidate disposition (a, weak): consumed and the consuming chain Released, so closable. Which terminal token is not recorded: `Released` (input to a released chain) or `Superseded` (by verification/014/disposition-table.md) are the plausible ones; `Committed` is the token other ID-less analysis docs would use. The 014 analysis (closed) itself uses a non-vocabulary `Planned` (see section 8), so no clean precedent. Owner of the call: the analysis/researcher role (the document is an ID-less researcher document, retro:93).

## 2. architecture/013-components-v2-editing-surfaces-architecture-findings.md

- Frontmatter: `ID: 013`, `Origin: 013`, `Status: Active`; no Status-Detail.
- Vocabulary (architecture): working `Evergreen` `Active`; terminal `Resolved` `Superseded`.
- Changelog last 3 (= all 3 rows, lines 14-16):
  - "| 2026-08-24 | Data-flow correction (standing constraint, independent of the plan's revision) | The `system-architecture.md` "Data flow" defect re-derived against `website` `c85945f` and corrected; D-004 ... Committed `35906ab`. Handed to steering-hooks-013 ..."
  - "| 2026-08-24 | Plan review, rev 9 (`b57639c`) | ... **APPROVED_WITH_CHANGES.** |"
  - "| 2026-08-24 | Re-review, rev 10 (`9140ffe`) | **RC-1 discharged by D18/M8-G and withdrawn** ... **APPROVED.** |"
- Own closing text (line 145): "`system-architecture.md` reconciliation is owed **after** implementation, not now: the two V2 Problem Areas close, and the Data-flow bullets get their post-M1/M8 state. Recorded in the master doc's Roadmap Readiness so the next architect pass finds it."
- Was it done? **No, recorded as not done:**
  - INBOX.md:140-146 (architect-hooks-015, 2026-11-08): "`architecture/system-architecture.md` has not been reconciled to chains 012–014's implemented state. Chain 015's reconciliation is landed; the earlier chains' is not." and "`architecture/013-...-findings.md` is still `Status: Active`, although chain 013 is closed. Its open items need dispositioning and the document closing. Both belong to the architect. Asking for the next architect session the owner or steering commissions to take them."
  - retrospectives/closed/013-components-v2-editing-surfaces-retrospective.md:778-781 "It is Active because work is owed, and nothing in the pipeline will ask for it"; retro:1020-1023 tasks `architect` with the reconciliation.
  - Tree check: architecture/system-architecture.md:250 still reads "plan 013 (Components V2 editing surfaces) is open and in critique"; :177 still carries the Problem Area row "Persisting writers do not share one path | Low". Latest system-architecture change is the chain-015 reconciliation (changelog line 12, `dfd42a6`), which did not touch the 012-014 state.
- Disposition (b): not closable. Next act: an architect session reconciles system-architecture.md for chains 012-014 (the two V2 Problem Areas, Data-flow, line 250) and dispositions the findings' open items, then sets `Resolved`. Owner: architect; commissioned by owner/steering (INBOX.md:146). Nothing steering can do mechanically.
- Evergreen siblings confirmed (not closed): architecture/system-architecture.md:2, website.md:2, preview-image-generator.md:2 all `Status: Active` (the vocabulary's evergreen records; the token `Evergreen` is also allowed). Candidate (c).

## 3. deployment/fix-v1-guild-messages-auth-deployment.md

- Frontmatter: `ID: n/a`, `Origin: fix-v1-guild-messages-auth`, `Status: Active`, `Status-Detail: "Released: website master = ddbd750 on origin (move by steering, f4b7fb0); owner confirms Vercel live. B-3 PASS (401, 0 B, 16:52Z). Phase 2D held until B-4 (owner's dashboard check) is terminal."` (lines 4-6)
- Vocabulary (deployment): working `Active`; terminal `Committed` `Released` `Abandoned` `Superseded`.
- Changelog last 3 (lines 16-25; 6 rows total):
  - 2026-10-10T15:47 steering (B-1 answered) / Finish Stage 1: "**B-1 EXECUTED.** ... Every pre-release row is now terminal ... **Stage 1 committed**: ..."
  - 2026-10-10T15:56 steering (release approved; B-3 waiver) / Stage 2: "**Phase 2A ran and stopped at two blocks.** (1) **Build gate (step 5) BLOCKED.** ... disk 100% used ..."
  - 2026-10-10T16:52 steering (move done, Vercel live) / Record the move and the build waiver; run B-3: "... **Serving state VERIFIED** ... **B-3 EXECUTED, PASS** ... returned status `401`, body 0 bytes ... B-4 is next, as the owner's check."
- What holds it open: register row 50 "B-4 (Statbot's own calls still succeed) | post-deploy | Open (B-1 and B-2 are now terminal) | As B-3"; runbook step 6 "B-4: the owner's dashboard check | fails -> Vercel promote of the previous deployment | [Result blank]" (deployment doc lines 50 and 127). devops.md:161 "Phase 2D closes this record"; Status-Detail says Phase 2D held until B-4 terminal.
- Carrier: handoff/fix-v1-guild-messages-auth-post-deploy-2026-10-10.md, `Status: Open`, Status-Detail "B-4 ... is open, awaiting the owner's dashboard check."; Owning-Stage "devops (Stage 2 post-release, for B-3 and B-4's fallback); the owner is B-4's observing subject". It states the exit: "When both rows are terminal, record them in the deployment record's Post-Release Status and close this handoff `Addressed`." (handoff line ~41). B-4 fallback: "Vercel request log for `/api/v1/guilds/*/messages*` after the deploy time ... Deadline: 24 h after the deploy" (handoff lines 24-26; deploy 2026-10-10T16:52Z so the deadline lapsed 2026-10-11T16:52Z with no fallback run recorded; changelog of handoff has rows only through 16:52 on 10-10, handoff lines 54-55).
- OWNER-QUEUE.md:29-38 "## Check the statrole editor still loads hooks.gg messages ... Does the list load? Tell steering "loads" or "empty / error"." Still queued; last OWNER-QUEUE commit is 74090f1 (2026-11-08), nothing since records an answer. steering/v1-guild-messages-auth-rulings.md ends (last lines) at the f4b7fb0 block "Vercel live"; grep for an answer found none. Also: "Post-Release Status" section does not exist in the deployment doc (`grep -c "Post-Release Status"` -> 0), so devops 2D has not begun.
- 015 awareness: steering/015-rulings.md:47-48 "Its open post-deploy carriers are `handoff/fix-v1-guild-messages-auth-post-deploy-2026-10-10.md` and the OWNER-QUEUE statrole-editor check."; planning/closed/015-bug-evaluation-fixes.md:1183 lists the handoff as "not triggered".
- Disposition (b): not closable. Next act: (1) owner answers the OWNER-QUEUE statrole-editor check ("loads" / "empty / error") -- owner-only observation; or (2) devops runs the B-4 Vercel-log fallback (needs Vercel log access; the 24 h deadline has passed, so a ruling on whether it can still stand in is the owner's/devops'); then devops Phase 2D writes Post-Release Status, sets terminal (`Released`) and moves it to closed/, and closes the handoff `Addressed`. Owner: devops (record), owner (the observation).

## 4. qa/website-2026-10-10-release-tip-qa.md

- Frontmatter: `Status: Release Verified`; `Status-Detail: "Release tip website ddbd750 (fast-forward of master f2c85f5) verified. The deploy stays held on blocking release conditions B-1 and B-2 (chain register, qa/fix-v1-guild-messages-auth-qa.md)."`; `Verified-At: ddbd750c1ab4808317f3408524cf5f9b7d8d0935`; `Phase: 3`; `Origin: fix-v1-guild-messages-auth`, `UUID: 9c90dfa0`.
- Vocabulary (qa): working incl. `Release Verified`; terminal `Committed` `Released` `Superseded`.
- Changelog: 1 row (line 21): "2026-10-10T08:29 | steering | Release-tip verdict at website ddbd750 | **Release Verified at ddbd750.** The full suite was executed at the tip: 598/598, 54 files, exit 0. Typecheck is clean. QAF-1 is discharged by blob equality ..."
- The Status-Detail is stale: it says the deploy is held on B-1 and B-2; deployment doc lines 47-48 record both terminal (B-1 "match" 2026-10-10T15:46Z; B-2 = 1 per consumer 08:37:12Z), and the release executed (deployment doc line 6 and changelog 16:52: master = ddbd750 on origin).
- Closing text: the verdict "is a verdict on the tree. It does not authorise the release" (qa doc Verdict section); "Any change to the tip expires this verdict"; its "Not run here" list (build, redirect premise, B-3, B-4) are "devops's Phase 2A steps or post-deploy rows, not this verdict's". Release-tip verdict served its purpose: devops cites it as "DONE: release-tip verdict" (deployment doc line 91). Tip is the released commit (deployment changelog 16:52: `ls-remote origin refs/heads/master` = ddbd750), so it did not expire.
- Precedent in the same chain: sibling qa/closed/fix-v1-guild-messages-auth-qa.md is already closed `Status: Committed`, with Status-Detail "release-tip verdict in qa/website-2026-10-10-release-tip-qa.md ... B-3 and B-4 carried by handoff/fix-v1-guild-messages-auth-post-deploy-2026-10-10.md." So the chain already treats B-3/B-4 as carried by the handoff, not by QA documents.
- Disposition (a, candidate): criteria for a release-tip verdict are recorded as met (release executed at exactly this tip). Closable with terminal `Released` (release executed at ddbd750) or `Committed` (the sibling's token). The Status-Detail should be updated in the same act. Judgement owner: QA (devops.md:67 puts closing committed qa docs in devops' Stage 1 step 8, which was apparently missed for this Phase 3 document). Caveat: it also remains the deployment doc's cited evidence (line 91), which does not need it to be open.

## 5. research/codebase-bug-evaluation-2026-11-08.md

- Frontmatter: `Status: Active`; Status-Detail (lines 3-9, quoted end): "... Nothing here is fixed; this is a research document, and it stays Active until the hypotheses H-1 to H-8 are run (G-5)."
- Vocabulary (research): working `Active`; terminal `Answered` `Abandoned` `Superseded`.
- Changelog last 3 of 4 rows (lines 20-22): "2026-11-08T01:48 | researcher | Findings 1-5 and 7, ratings, open questions and gaps written; editor-component sweep pending | Active"; "2026-11-08T01:50 | researcher | Editor sweep folded in (F-38-F-50, H-1-H-8); typecheck result recorded; G-2 resolved, G-5 added | Active"; "2026-11-08T04:07 | researcher | Owner answers to OQ-1-3 recorded verbatim; OQ-1 is no defect; F-28 intent corrected ...; RBAC remark routed; G-3 resolved | Active".
- Closing text: its own Status-Detail (above) -- stays Active until H-1..H-8 run (Remaining Gaps G-5, line 251: "Run the disconfirming test in each row of the hypotheses table; H-1 and H-2 first ... | planner / qa"). Also open: G-1 (F-2(a) in production; owner), G-4 (F-31 truncation in production; "owner / devops"), line 252-253.
- What chain 015 did with it (plan Released 2026-11-08, status.txt:39; chain 015 "0 open, 40 closed", status.txt:37):
  - Source of the chain: planning/closed/015-bug-evaluation-fixes.md:9 and :62; steering/015-rulings.md:5.
  - Every F-1..F-50 id appears in the plan (script: node regex over the plan text, "not mentioned in plan:" empty; scratchpad/f-cov.txt). Plan exclusions that leave F-findings unfixed: X-1 (F-36, "Stated limit"), X-18 (F-15, F-39: "Not reproducible in real Chrome ... removed by the owner (D30)", carrier "Stated limit (D30...)").
  - Recommendation limbs: steering/015-rulings.md:33-37 "(1) F-2 confirmed against a DB: IN ... (2) F-28 visibility in Discord: IN ... (3) F-31 `pm2 show` kill_timeout: IN ... (4) OQ-1: OUT". Evidence: plan:1063 limb (1) walk; uat/closed/015-bug-evaluation-fixes-uat.md:29 "B-6 post-deploy: Get Message for a Manage-Server, non-admin member ... B-6 EXECUTED PASS at 22:56:15Z"; uat:113 "B-1 M1-a no-admin list | EXECUTED 2026-11-08 PASS"; plan:791 records `kill_timeout` 5000 read from the host. So limbs 1-3 are recorded as done.
  - **Left out of 015's scope** (planning/closed/015-bug-evaluation-fixes.md:189 D6): "H-1-H-8 ... the eleven handoffs in research Findings 7, the RBAC remark and any security assessment are out". Exclusion rows: X-5 "H-1-H-8 | Out by D6 | **Research G-5**" (plan:1158); X-6 handoffs "Each handoff"; X-7 RBAC remark "Stated limit (product direction, no effort)"; X-8 security "Stated limit". **So H-1..H-8's only carrier is this research document's G-5 -- closing the research would remove it.** The RBAC remark's carrier is also only prose (research lines ~199-203 "carried to whoever plans the next effort") plus plan X-7; no handoff exists for it (handoff/ listing has no RBAC/hypothesis file; `ls handoff`).
  - G-4 (F-31 drain truncation in production) is carried elsewhere: handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md exists (candidate; I did not read it to confirm it supersedes G-4).
  - Retrospective: retrospectives/closed/015-bug-evaluation-fixes-retrospective.md has 0 matches for "codebase-bug-evaluation" (`grep -c`), and names researcher-bugs only as "the source research, pre-chain" (retro:133). No document says the research is "fully addressed".
  - Handoff handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md (Open) carries eight chain-015 Assumptions Not Checked, not the hypotheses.
- Disposition (b): not closable. Next act: either (i) a handoff is minted carrying H-1..H-8 (the disconfirming tests) and the RBAC remark, re-pointing plan X-5/X-7's carrier -- then the researcher may close `Answered` (findings delivered, 015 consumed F-1..F-50); or (ii) the hypotheses are run (G-5; planner/qa) first. Owner: researcher (closure judgement and the handoff, since the doc's own Status-Detail sets the condition); the choice of whether to run H-1..H-8 is an owner/planning decision. G-1 also remains owner-side (but UAT B-1 executed the no-admin walk, uat:113, which is the G-1 test; the research G-1 row has not been updated -- candidate).

## 6. research/competitive-feature-landscape-2026-11-08.md

- Frontmatter: `Status: Active`; Status-Detail (lines 3-10, key sentence): "Not Answered: no Hooks.gg usage data exists (G1), and the owner has not yet selected items to plan against. Stays Active until he does; the planner then cites this document and it closes Answered."
- Vocabulary: as research.
- Changelog last 3 of the table (lines 24-26): "2026-11-08T05:14 | researcher | Owner rulings recorded verbatim. **Q1** *"sure"* ... **Q2** *"no, no paid tier ..."*"; "2026-11-08T05:32 | researcher | **Q7** ruled, verbatim: *"eh, there's no legal risk in keeping the language"*" ; "2026-11-08T05:48 | researcher | Owner asked for a 1-10 rerate ... Added "Rerated on the owner's 1-10 scale" ...".
- Closing criterion: owner selects items -> planner cites it -> `Answered`. Evidence it has not happened: `grep -rln "competitive-feature-landscape"` finds only INDEX.md (no plan, steering rulings, INBOX, OWNER-QUEUE, retrospective cite it); planning/ has only closed/ and `ls roadmap` is just .gitkeep; chain 015 does not mention it (grep in steering/015-rulings.md, INBOX.md, OWNER-QUEUE.md: no match). Last commit to it 643a7bc (rerate).
- Chain 015 relation: none; 015 was the bug-evaluation chain, not feature selection.
- Disposition (b): not closable. Next act: owner selects items from Scored list S1-S33 to plan against (or rules the research Abandoned); planner then cites it; researcher closes `Answered`. Owner: owner (selection), then planner, then researcher.

## 7. steering/015-security-brief.md

- No frontmatter at all (file opens "# Brief — security-hooks-015 (chain 015, bug-evaluation fixes)"), so no Status/Status-Detail/changelog. `steering/` is not a lifecycle domain (not in the vocabulary; INDEX.md:287 lists it with status `—`; check-repo --status does not mention it: `grep -c security-brief status.txt` = 0). There is no steering/closed/ directory (`ls steering`).
- What it is: steering's brief to the security stage, delivering to "Write your document under `agent-output/security/` with chain ID 015" (brief lines 33-35 region).
- Consumed: security/closed/015-preview-image-generator-security-audit.md is `Status: Review Complete` (terminal) and :131 "**Closed 2026-11-08T22:20, Status Review Complete.** ... its binding rules were the brief's (`steering/015-security-brief.md`) and the closure brief's, and bind through them"; the audit's first changelog row cites the brief (audit:16).
- Disposition: not a lifecycle document; there is nothing to close mechanically (no Status to set, no closed/ home under steering/). Candidate (c)/steering-owned record, like steering/015-rulings.md, steering/014-rulings.md (also outside any closed/). The consuming document is already terminal.

## 8. Status audit, chains 012+ and ID-less (scratchpad/tools/sweep.js, output scratchpad/sweep.txt)

Method: for every `*.md` directly in `<domain>/` and `<domain>/closed/` of the 14 vocabulary kinds, parsed the frontmatter `Status:` line, compared with the seam.js token sets; skipped filenames with prefix 001-011. (Does not cover verification/, steering/, operator-direct/, user-files/, which have no vocabulary row.)

**A. In `closed/` with non-terminal Status (6 documents with a non-terminal token, plus 1 with none):**
1. analysis/closed/014-test-suite-cleanup-analysis.md: `Status: Planned` (not in the analysis vocabulary at all). Status-Detail :7 "Complete for the commissioned brief (a)-(e), and CONSUMED by the planner at plan rev 5 ... Remains Active until the chain closes". Chain 014 closed -> candidate terminal `Released`/`Committed` (status.txt:26 shows it as "Planned"). Owner: analyst/devops.
2. code-review/closed/013-components-v2-editing-surfaces-code-review.md: `Status: Code Review Approved` (line 159; not a code-review token -- it is a planning token). Latest round 25 "APPROVED, SCOPED". Candidate `Committed`. NB this file shows as modified in the working tree (`git status --short`, foreign; not mine).
3. qa/closed/013-components-v2-editing-surfaces-qa.md: `Status: QA Complete` (working token). The file itself says at :158-160 "`QA Complete` — not a terminal status under document-lifecycle ... Nothing moved. DevOps closes it" (that sentence is about 012's qa doc). Candidate `Committed`. status.txt:17 flags it FAILING/BLOCKING.
4. deployment/closed/012-message-valid-field-readiness.md, 013-components-v2-editing-surfaces-readiness.md, 014-test-suite-cleanup-readiness.md: `Status:` values are prose beginning "Superseded by <file> — release executed ..." (a terminal token followed by free text on the Status line, so the exact-token match fails; status.txt lines 9, 20, 34 show them as "Superseded by ..."). Format defect, intent terminal.
5. deployment/closed/014-test-suite-cleanup-deployment.md: `Status: Released — chain closed 2026-08-27; every register row terminal` (token + free text on the Status line, line 5; the detail is also in Status-Detail line 6). Same format defect, intent terminal.
6. code-review/closed/012-carry-forward-to-post-refresh-pass.md: no frontmatter, no Status ("Not a verdict ... the code-reviewer's own working note"). Cited twice in INDEX.md (`grep -c` -> 2).
Additionally note: qa/README.md has no Status (a directory README, expected).

**B. Outside `closed/` with a terminal Status:** none found among the kinds above (sweep.txt contains no OPEN-TERMINAL line). The still-open documents have working tokens only (e.g. handoff `Open`, research `Active`, architecture `Active`).
Not covered by the vocabulary: verification/014/disposition-table.md `Status: Complete` (see section 0).

Also from status.txt (informational, other chains): chain 012 shows `planning Released ... FAILING/BLOCKING`, `qa`/`uat` rows as Released; the only chain-013 open is the architecture finding above.

## Summary table

| Document | Status now | Candidate |
|---|---|---|
| verification/014/disposition-table.md (chain 014 open) | Complete (no vocab row) | (b) no closing act defined for verification docs; needs a process ruling |
| analysis/test-inventory-2026-08-26.md | Active | (a, weak) consumed by released chain 014; terminal token unrecorded (Released/Superseded) |
| architecture/013-...-findings.md | Active | (b) architect reconciliation owed and recorded as not done (INBOX.md:140-146) |
| deployment/fix-v1-guild-messages-auth-deployment.md | Active | (b) B-4 open; owner check queued (OWNER-QUEUE.md:29); devops 2D |
| qa/website-2026-10-10-release-tip-qa.md | Release Verified | (a) release executed at the verified tip; Released/Committed; Status-Detail stale |
| research/codebase-bug-evaluation-2026-11-08.md | Active | (b) H-1..H-8 uncarried (plan X-5 carrier = this doc); needs a handoff or the tests run |
| research/competitive-feature-landscape-2026-11-08.md | Active | (b) owner has not selected items |
| steering/015-security-brief.md | no Status | not a lifecycle doc; consumer already terminal |
| planning/*.md | none exist | confirmed |
