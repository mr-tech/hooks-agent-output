---
ID: n/a
Origin: fixer-batch-2026-11-20
UUID: 9bdfb3dd
Status: Active
Status-Detail: "Fixer-batch retrospective over fix-dialog-closes-on-first-portal-load (website 1ad625e) and fix-personal-message-access (website 983681c), written after both chains closed out. Rests until pi runs on the owner's command."
---

# Retrospective (fixer batch 2026-11-20): fix-dialog-closes-on-first-portal-load, fix-personal-message-access

**Plan Reference**: none (fixer chains). The chains' fixer documents:
- `implementation/closed/fix-dialog-closes-on-first-portal-load-implementation.md` (chain A)
- `implementation/closed/fix-personal-message-access-implementation.md` (chain B)

**Date**: 2026-11-20
**Retrospective Facilitator**: retrospective (`retrospective-hooks-fixer-batch-2026-11-20`, a subagent of `steering-roadmap-hooks`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T01:54 | steering-roadmap-hooks (spawn brief, rulings block 2026-11-20T01:50Z) | Fixer-batch retrospective over chains A and B | Written from the documents. Cost read per chain. Ten recommendations, each naming the file it would change. No handoff created. One gate event disclosed under Corpus. |

## Summary

**Corpus.**
- *Read:* both chains' rulings files whole (`steering/fix-dialog-closes-on-first-portal-load-rulings.md`; `steering/fix-personal-message-access-rulings.md`, re-read at write time through block 01:50Z, 340 lines). `steering/backlog-2026-11-18-rulings.md` blocks 21:53Z (commission, grouping). `steering/017-rulings.md` blocks 2026-11-19T08:09Z to 09:01Z. Chain B's common brief (§ Hazard analysis), its code-reviewer and QA briefs. Every stage document of both chains, all closed: chain A's implementation, code review and deployment; chain B's implementation, code review, QA Phase 2, Phase 3 release-tip QA, security audit and deployment. The open carriers `handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md`, `handoff/fix-personal-message-access-post-deploy-2026-11-20.md` and `handoff/editor-shows-blank-shell-when-personal-message-load-is-refused-2026-11-20.md` (header). `INBOX.md` entries of 2026-11-18. `architecture/system-architecture.md`, by grep for these chains' rows only. The deweeder tables under `verification/fixer-batch-2026-11-20/deweed/`.
- *Not read:* the `verification/` captures themselves, beyond the ones named below. They are cited as the documents cite them.
- *Cannot be read:* rulings given in conversation and not lodged; message contents between sessions (a send is visible only where a document records it); the exact command forms behind each disclosed record write; anything a session corrected before its document was committed. Anything outside this corpus is unverifiable-by-construction here, not refuted.
- *Gate event in this run:* `record-write-gate-hook` refused one read-only `grep` of mine. Its pattern text contained `sed -i` and the command named two closed record documents. I re-issued it as two Read tool calls, which write nothing. Whether the refusal was a false positive is the owner's to judge.

**Value Statement** (each chain's scope statement):
- **A:** "an open dialog closes itself, or never appears, when something rendered inside it loads code for the first time in the page's life". The remedy goes once into `AnchoredPopover/Child.tsx`, with a lint rule as the class catch (rulings A, block 21:59Z).
- **B:** "a signed-in user can get, change or delete only the personal messages (no guild) they own. A message number sent by the browser never lets a user read, create, claim, overwrite or delete a row that is not theirs". Bounded at 22:35Z and amended at 22:59Z (rulings B).

**Value Delivered**: YES for both chains.
- **A:** the production look (handoff rows, record `efc6e21`) passed all four flows on hooks.gg.
- **B:** post-deploy B-2 (400 `BAD_REQUEST`) and B-1 (404, none of account 2's content shown) were both on the fixed limb (`handoff/fix-personal-message-access-post-deploy-2026-11-20.md`, read at write time).
- B's residue read R-1 is still open. It measures damage done before the fix and does not condition delivery. The owner holds it (OWNER-QUEUE, `fc8bb6c`).

**Implementation Duration** (determination to release):
- **A:** 21:59Z to 22:41:18Z on 2026-11-18, which is 42 minutes. The production look passed at 22:56Z.
- **B:** 2026-11-19T20:30Z to 2026-11-20T01:33:58Z, which is 5 h 04 min. About 3 h 12 min of that was owner wait:
  - the scope question, put in plain text at 20:3xZ while prompts were off and answered at 22:35Z;
  - the release prompt, put at 00:26Z and answered at 01:33Z.
  - Agent work, from chain start (22:37Z) to the release ask (00:26Z), took about 1 h 50 min over five fix rounds.

**Overall Assessment**: both chains delivered and both production reads confirm it.
- Chain A ran the fixer route as designed. Its one process lesson, that the devops session held no browser for the production look, was applied in chain B, which planned a uat-role reader from the start.
- Chain B's quality came from independence. Four stages each built their own real-database instrument with their own oracle. Security, a stage this thread added to the fixer set, found the one defect that three earlier stages passed (M-001).
- The weaknesses are upstream framing and relay hygiene:
  - the hazard analysis in the common brief stated the race as "check-then-write", and the fixer, code review and QA all inherited that boundary;
  - the bounded scope statement narrowed the option the owner chose;
  - two relays were recorded as sent and were not.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Batch-level reads

- **A lesson carried within the batch.** In chain A, devops had no `mcp__playwright__*` tools, so the production look was not done in its session (deployment A, changelog 22:42). Steering then started a uat-role session (rulings A, block 22:43Z). Chain B's determination named a uat-role post-deploy reader from the outset (rulings B, block 20:30Z, "Stage set"), and the carrier was written for it at Stage 1. There was no re-route.
- **The same finding appeared in both chains:**
  - record writes that the record-write gate did not see (below);
  - times typed rather than taken, which the stamp gate caught four times.
- **One test-account browser was shared across threads.** Chain B's post-deploy reader released the profile "to chain 081 at 01:45Z, on steering-roadmap-statbot's ask" (rulings B, block 01:50Z). Nothing was delayed by it in this batch. It is one resource contended by more than one steering thread.
- **The same question reached the owner several times.** Before chain B, the access defects went to him at 08:12Z (plain), 08:41Z, 08:43Z and 08:44Z, and were settled at 09:01Z (017 rulings). The two middle answers were his questions, not selections: *"There's no way I messed that up. For real?"* and *"Are you absolutely sure there's no filtering mechanism…"*. The full-path trace (08:43Z) and the production browser check (09:01Z) answered them. Chain B's scope question was then put three times (20:3xZ plain, 21:1xZ restated, 22:3xZ selection). The prompts-off flag accounts for the form. That flag is his setting, so this is not a defect of the process.

### Chain A — fix-dialog-closes-on-first-portal-load

**Went well**
- **The determination closed the shape before any code.** It gave the mechanism with an executed proof (analysis 015 V-1 to V-6), a class rule ("no lazily loaded component suspends past its own boundary") with a catch in scope, and an explicit fence.
- **The fixer re-derived a hazard, and it mattered.** Under vitest, `next/dynamic` resolves to the Pages-router module, which never suspends. The fixer showed the red test passing against the defect without the alias (`controls/alias-control.txt`) and routed the suite-wide consequence to `INBOX.md`.
- **Discrimination was shown for both the test and the class catch.** Each lint-rule clause was shown deciding (`controls/lint-rule-control.cjs`). The test's case-2 control was KILLED.
- **The closed record was corrected at the mechanism.** Chain 004's closed documents assert that `next/dynamic` has no Suspense boundary. That contradiction reached the architecture record: `system-architecture.md` line 126 now records the static import and the rule.

**Didn't go well**
- **A MEDIUM test-durability finding shipped behind a handoff that may never fire.** The red test discriminates only as its file's first case (code review A, CR-1). The handoff's trigger is "when … is next edited". The reviewer's reasoning is recorded: the static import removes the lazy state, and the lint rule is the first line. The guard is still silently disarmable by a reorder or `--sequence.shuffle`, and nothing will re-read it unless someone edits that file.
- **The production look had no session holding the tool** (above). It cost a re-route and a fourth session.

### Chain B — fix-personal-message-access

**Went well**
- **A security stage was added by choice, and it found the defect.** The fixer stage set has no security gate. This thread added one because the change "changes an authentication boundary on production" (block 20:30Z). Security executed M-001 through the real routers (300 of 300 leaks) after the fixer, code review and QA had passed that surface. Its remedy was shown in an export (8 of 8, 0 of 300) before it was routed. Fixing it cost one round: the M-001 ruling was at 00:04Z, and QA's refresh at `983681c` was committed at 00:16Z (`1c88873`), about 12 minutes later.
- **Four instruments with four oracles.** The fixer (`pg/ownership.pg.test.ts`), the code reviewer (`code-review/attack.pg.test.ts`, 187 then 192 cases), QA (`qa/second-user.pg.test.ts`, 21 cases, 12 mutant runs) and security (`identity.pg.test.ts`, `read-race.pg.test.ts`) each drove the real routers against a throwaway `postgres:16`. Each calibrated at base. Once M-001 was named, the code reviewer's extended instrument reproduced it independently (Round 2, red at `75f1543`).
- **Every stage disclosed its own instrument defects in the round.** Examples: the fixer's text-compared fake and wrong caller path; the reviewer's over-counting oracle and leaked containers; security's string-matched `UNAUTHORIZED`. Each kept the defective run's output.
- **The refutation helper earned its place.** Steering ran it on the fixer's residue conclusion before the release question (block 23:50Z). It REFUTED limb (c): `id >= last_value` also returns the latest legitimate row when `is_called` is true (block 23:53Z; `verification/access-defects/scoping/residue-refutation.md`). Unchecked, the query put to the owner would have reported a legitimate row as planted. The fixer had marked its query "I have not run it", and steering's rule to refute a premise before putting a question did the rest. The fixer added a reconcile note rather than overwriting its text.
- **Routing was recorded per finding.** Every finding has a disposition line with a carrier by path: CR-1 to CR-6, QAF-1, M-001, I-1, I-2, F-1 and F-2. Every handoff carries Owning-Stage and an event-form trigger.
- **The production reads were designed before release.** B-2 settles that the running code is the fix before B-1 is read (QA register). Both were executed on the fixed limb within 8 minutes of the push.

**Didn't go well**
- **The hazard framing narrowed a class, and every verifier inherited the boundary.**
  - The common brief's hazard 6 reads: "The check-then-write race … Say whether any path still checks in one query and **writes** in another" (`steering/fix-personal-message-access-brief-common.md` line 86).
  - The fixer considered `getOne` and dismissed it by argument: "`getOne` checks then returns, which is a read with no write" (implementation, hazard 6, before its reconcile note).
  - Code review "deliberately excluded `getOne`" from its race-bypass mode, "which matched the fixer's hazard-6 framing, which I accepted unexecuted" (code review, Round 2 reconcile note).
  - QA re-derived hazard 6 as "every write path carries the owner term" (QA, Implementation Review, item 6).
  - The steering lens tells the stages to re-derive each hazard. They re-derived its members inside the stated class, never the class boundary. The class is check-then-act, where returning a pre-check read is an act, and security named it that way.
- **The scope statement narrowed the option the owner chose** (block 22:59Z, this thread's own recorded error). His chosen option said "puts the owner check inside the save/update/delete queries" and "cleans up oddly formatted message numbers". The bounded statement named only S6a and S7 for the owner term, and S7 to S9 for canonical ids. Both missing members were ruled back in after the fixer's first handoff. The cost was a second fixer round and a reviewer hold, about 8 minutes. Steering named the check that would have caught it: read the scope statement against the chosen option's text before sending.
- **M-001 sat at an in-scope surface (S2) that two gates passed before security executed it.** Code review's Round 1 "Checked and found sound" list included "`getOne` owner compare". QA passed S2 on refusal cases with the check in force. Neither instrument modelled a concurrent delete on a read. This is the framing above, seen from the gates' side: a member dismissed by argument was not executed, though the reviewer's bypass mode already existed and could have taken it.
- **Relays were recorded before they were sent.**
  - Block 00:04Z lists "Relays: the fixer …, security, the code reviewer and QA". Its own correction at 00:13Z says the relays went to the fixer and security only.
  - The code reviewer's Round 2 verdict went to steering alone, with QA live and idle, although its brief routes an approval to a live QA session. The reviewer's document says: "I did not check that QA was live before the first send" (code review, Next Steps).
  - The reviewer's sub-entry 1a also states "Handed to QA Phase 2 (`qa-hooks-fix-personal-message-access`) at `12bcd75`". No QA session existed until 23:23Z (rulings B, block 23:23Z). What that send reached cannot be read from the record.
  - No delay followed: QA's refresh was committed 4 minutes after the Round 2 verdict. The slips recur all the same.
- **QA wrote its criteria after execution began.** The QA document discloses this ("written into the document after execution began, not before as qa.md step 3 requires"). The list was the determination's, unchanged, so nothing was lost this time.

### Record-write and stamp gate events across stages (as disclosed in the documents)

| Chain | Stage | Event | Gate saw it? | Source |
|---|---|---|---|---|
| A | fixer | a prose comment in a new test, refused by the comment gate; removed | yes, satisfied | implementation A, Verification |
| A | code reviewer | a changelog time typed (22:31), refused by the stamp gate; re-written with `record-edit.js` | yes, satisfied | code review A, line 202 |
| A | uat (post-deploy) | a shell heredoc refused by the record-write gate; re-issued with Write | yes, satisfied | rulings A, block 22:56Z |
| A | steering | a handoff changelog row appended by a `python3` shell write | **no** | rulings A, block 22:56Z |
| B | steering | a heredoc write of block 22:35Z refused; re-issued with Edit | yes, satisfied | rulings B, block 22:35Z |
| B | steering | a heading typed a minute ahead (22:38Z), refused by the stamp gate. The record says it "was committed that way at `9943a73`", then carries the `date -u` minute | yes | rulings B, block 22:37Z |
| B | helper (exclusion handoffs) | a shell write refused; re-issued with Write | yes, satisfied | rulings B, block 22:37Z |
| B | fixer | a changelog row by inline Python (23:37 row) | **no** | implementation B, changelog 23:37 |
| B | fixer | a placeholder time `00:2x` flagged by the stamp gate, then substituted with `sed -i`; the row's first disclosure added by inline Python. "This is the second time in this document" | stamp: yes; record-write: **no** (twice) | implementation B, changelog 00:13 |
| B | devops | a carrier row time typed ahead (00:25 against 00:21), refused by the stamp gate | yes, satisfied | handoff changelog 00:21 |
| B | devops | one path in the deployment record corrected with `sed -i` | **no** | deployment B, changelog 00:24 |
| B | QA | `next-env.d.ts` copied into the typecheck export, called "a gate satisfied" | n/a (a build prerequisite, not a hook) | QA, Typecheck |
| B | security | a secret-pattern `grep` refused by the search tool as too complex; re-run as a `python3 -I` scan | n/a (an instrument limit) | security, Run record |

Read across the rows:
- **The stamp gate works as designed.** It caught every typed time it saw. The cost is one re-write each time.
- **The record-write gate let four writes through**, all inline Python or `sed -i`. Its own pattern (`record-write-gate-hook.js` line 43, `INPLACE`) names both forms. So the commands that passed were in a shape the pattern does not reach.
- **No disclosure quotes its command.** `claims.md`, Lodge in the round, requires that ("each with its command quoted"). Why the gate missed them is therefore unverifiable-by-construction.
- **The fixer repeated the pass-through after disclosing it once.** A disclosure alone did not change the act.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

Neither chain ran UAT. Chain A ran no QA (6 production lines). Every QA, code review and security run in chain B was scripted: vitest, `mutation-run.py`, and the drivers `run-pg.sh`, `run-attack.sh`, `run-second-user.sh` and `run-security.sh`. What ran by hand:

| Chain | Walk | Driven by | Time | Cost (readout below) | How it could run unattended |
|---|---|---|---|---|---|
| A | Production look: 4 flows on hooks.gg on a fresh load (Upload Message dialog with "Save To", Save As, the `Navigation` menus, the colour picker), plus build identity by chunk 200/404 | `uat-fix-dialog-closes-on-first-portal-load` + `browser-walker` | 22:43Z → 22:56Z, about 13 min | uat row $2.64 (own $1.99, walker $0.65) | A scripted runner over a steps file: open each surface on a fresh page load, assert the dialog node stays present and visible, assert the popover node is a child of `body`. `verification/fix-dialog-closes-on-first-portal-load/post-deploy/flash-observer.js` and `live-chunk-identity.txt` are its first pieces |
| B | Pre-chain production check of C1 (two test accounts; 017 rulings 08:45Z to 09:01Z), launched twice | `uat-access-check` | about 08:45Z → 09:01Z | not read (session outside both chains' families) | The same two-account runner as B-1 |
| B | B-2: one signed-in `GET message.getOne` past int8 | `uat-hooks-fix-personal-message-access` | 01:37:58Z | within the uat row below | One HTTP request with the test profile's session cookie; status and code compared to the register's prediction |
| B | B-1: account 2 creates a marked message, account 1 opens it, account 2 deletes it | the same session + `browser-walker` | 01:40Z → 01:41:50Z; rows written 01:43Z | uat row $2.62 (own $2.32, walker $0.30) | A two-account scripted runner: create with marker, open as the other account, assert the marker absent and the `getOne` status 404, delete, assert deleted. The walk in `verification/access-defects/browser-check/README.md` has now run twice, and any later access fix runs it a third time |
| B | QA's signed-out production look (401 before input) | QA | 23:45:54Z | within the QA row | Already a single captured request (`verification/fix-personal-message-access/qa/prod-look-getone-past-int8.json`) |

What is worth building:
- **A pinned browser runner.** The record has none: `tools/` holds `build-index.js`, `check-repo.js` and `uat-local-stack.sh`. The `browser-walker` definition says "a repeated walk belongs in the record's scripted browser runner instead". Both chains' production looks, and B-1 run twice, are such repeats (Recommendation 6).
- **A pinned real-postgres router driver.** Chain B wrote or copied four drivers that do the same staging: `git archive` export, throwaway `postgres:16`, schema `pg/schema-749606d.sql`, the id sequence moved past 900000000000001, caps, and container removal. QA's copy came from the fixer's (`run-second-user.sh`, "copied from `run-pg.sh`"). The oracles must stay separate, since their independence is what caught M-001. The driver need not (Recommendation 7).

**The standing suite now covers:** the fixer's and QA's router cases in `message.personal-ownership.test.ts` (32 cases), `auth.hydrated-recent-messages`, `shapes.message-id`, `MessageProvider.save-new-number`, and chain A's `Child.portal-inside-open-dialog`. These are named, not re-proposed.

**Test-case scoring** (steering's deweeder, `verification/fixer-batch-2026-11-20/deweed/website-merged.tsv`):
- 108 cases in the 11 test files the two chains touched; 30 scored below 7, all disposition `remove`.
- Counts by file, computed here with `python3 -I` and `csv.DictReader` over `website-merged.tsv` joined to `cases-website.tsv` on `id`:
  - `shared.upsert-broadcast`: 6 of 12
  - `message.personal-ownership`: 8 of 32
  - `shared.message-cap`: 5 of 10
  - `shared.upsert-preview-continuation`: 4 of 9
  - `shapes.message-id`: 3 of 13
  - `shared.upsert-valid`: 2 of 6
  - `auth.hydrated-recent-messages`: 1 of 2
  - `previewImage.commit-statement`: 1 of 15
  - chain A's two cases, `MessageProvider.save-new-number` and `shared.in-predicates`: 0
- Steering's block 01:50Z records that 29 of the 30 name a covering case scored 7 or more. Nothing is deleted on this. A deletion is a later chain's, behind a mutation re-run.

## Lessons Learned

1. **A hazard in a brief is a boundary its readers inherit.** The author and every verifier received the same hazard analysis (steering.md, "the hazard-bearing analysis … sent alike to the author of the change, the verifying stages … and the judging ones"). A hazard stated by its instance ("check-then-write") instead of its class ("check-then-act: anything acted on or returned after a separate check") narrowed three stages at once. Only a stage that built its own threat model from the property (security) crossed the boundary.
2. **A class member dismissed by argument was the one that failed.** The fixer argued `getOne` out of hazard 6. The reviewer accepted the argument unexecuted, though its bypass mode could have executed it at no extra cost. Every other member of the class had been executed. The reviewer's own reconcile note names the missed instrument shape: "a race stand-in on reads".
3. **A scope statement written from an option's words can lose some of them.** The narrowing was caught by steering itself, at the fixer's first handoff, from the fixer's "Observed outside the scope" list. That is a later and more expensive point than the moment of writing.
4. **A relay line written as intent reads as a record of sends.** Block 00:04Z's "Relays:" line and the reviewer's sub-entry 1a "Handed to QA" both state sends that the record shows did not reach their named recipient. Both were corrected or explained later. A reader of the first version would have assumed QA knew.
5. **The refute-before-asking rule works on agent-authored owner steps.** An unexecuted query, honestly labelled as a sketch, would still have misled the owner. Executing it against a throwaway database before the question caught it.
6. **A disclosure without its command cannot be diagnosed.** Four record-write gate pass-throughs are recorded, and none quotes the command. Whether the gate has a gap, or the commands named the path indirectly, cannot be told from the record.
7. **Choosing security for a fixer chain that changes an authorization boundary paid for itself.** Security cost $20.26 in-window, the largest single row in chain B, and found the only defect that reached the review-approved tree.

## Recommendations (each naming the file it would change)

Each recommendation reaches its stage through pi, on the owner's scheduling.

1. **State each brief hazard as its class predicate.** File: `~/.claude/agents/steering.md`, § Briefs, the bullet "citations of the evergreen architecture record … and the hazard-bearing analysis" (lines 151–156). Each hazard is written as the widest class the property implies, for example "check-then-act: any value written, returned or acted on after a separate check". The instance read at the determination goes beneath it as the known member. Verifying stages are told the class boundary is theirs to re-derive, not only its members. *Sighted:* chain B (hazard 6, M-001).
2. **A dismissed class member is executed, not argued.** File: `~/.claude/agents/code-reviewer.md`, the adversarial-execution guidance. When the author's document dismisses a member of a hazard class by argument, the reviewer's instrument executes that member in the same mode as the class's other members, or the review names it as unexecuted in Assumption Not Checked. *Sighted:* chain B (code review, Round 2 reconcile note).
3. **Map the chosen option's text to the scope statement before sending.** File: `~/.claude/agents/steering.md`, § Fixer (line 251 onward), or the scoping-determination guidance it cites. After his selection, the bounded scope statement quotes the chosen option's text and maps each clause to its swept members. The mapping is read against that text before the fixer's brief is sent. *Sighted:* chain B (block 22:59Z).
4. **Record relays after they are sent.** File: `~/.claude/agents/steering.md`, rulings-block practice. A "Relays:" line lists the sends made, with recipient and minute, and is written after the sends. Intended relays go in a separate "To send:" line. *Sighted:* chain B (block 00:04Z, corrected 00:13Z).
5. **Check liveness before a conditional delivery.** File: `~/.claude/agents/code-reviewer.md`, delivery of verdicts. When a brief routes delivery on a session being live, the reviewer checks liveness first (`session-liveness` skill) and records the recipient actually sent to. A Next Steps line never states a hand-off to a session that does not exist. *Sighted:* chain B (Round 2; sub-entry 1a).
6. **Pin a scripted post-deploy browser runner in the record.** Files: a new runner under `agent-output/tools/` that takes a steps file (URL, account profile, action, assertion, expected value) and writes a per-step pass/fail table; and `~/.claude/agents/browser-walker.md`, to point at it. Its first two steps files would be chain A's four flows and the two-account read check (B-1, with B-2 as a request step). *Sighted:* both chains; also the 2026-11-19 pre-chain check.
7. **Pin a real-postgres router driver for website.** Files: a new driver under `agent-output/tools/`, built from `verification/fix-personal-message-access/pg/run-pg.sh` and its three siblings, taking `<sha> <test-file> <out>`; and the workspace `agent-output/CLAUDE.md` Test Conventions, to name it. Each stage keeps its own test file and oracle. Only the staging is shared: export, schema from project-utils, id sequence restart, caps, and container removal on every exit. *Sighted:* chain B (four drivers).
8. **Promote the open-handoff trigger sweep to the record's tools.** File: `agent-output/tools/open-handoff-trigger-sweep.py`, promoted from `verification/fix-personal-message-access/qa/phase3/open-handoff-triggers.py`. Both `~/.claude/agent-skills/stage-procedures/qa-phase-3.md` step 1b and `~/.claude/agents/planner.md` line 200 name that path "where it has one". This record does not have it, so QA wrote its own, and devops reused it. *Sighted:* chain B (QA Phase 3; deployment, Phase 2A).
9. **Log the record writes the gate allowed.** File: `~/.claude/tools/record-write-gate-hook.js`. When a Bash command names a record path and the hook allows it, the hook appends the command, session and time to a log the record can read. The owner's pending decision on widening the gate (`~/.claude/agents/INBOX.md`, entry "2026-11-19 — steering-cleanup — DECISION NEEDED", options (a) to (c)) gains these sightings:
   - chain A, steering's `python3` row;
   - chain B, the fixer's two inline-Python writes and one `sed -i`;
   - chain B, devops's `sed -i`;
   - this run's refusal of a read-only `grep`, for his judgement of the gate's precision.
10. **Add security to a fixer chain that changes an authorization boundary.** File: `~/.claude/agents/steering.md`, § Fixer. The fixer stage set takes a `security` stage after QA when the change moves an authentication or authorization boundary on production. That was this thread's choice in chain B, recorded at 20:30Z, and it found M-001. *Sighted:* chain B.

**Minor, for pi's reading:** the brief named this document's Origin `fixer-batch-2026-11-20`, while the lifecycle form is `fixes-<UTC date>-<thread>` (`references/documents.md`, ID Assignment Rules). The steering brief governed here, because the scoring folder `verification/fixer-batch-2026-11-20/` already carries that name. One of the two texts should be brought into line with the other.

No recommendation is for the effort's next chain alone, so no handoff is created in this run.

## Cost

Each figure is taken with `python3 ~/.claude/tools/cc-usage.py chain <suffix> --since <determination> --until <release>`. The suffix matches `*<suffix>` and `*<suffix>-<n>`. Subagent usage is filed under its parent row.

**Chain A** — `chain fix-dialog-closes-on-first-portal-load --since 2026-11-18T21:59 --until 2026-11-18T22:42`
- Session set: fixer $5.54, code-reviewer $2.28, devops $1.18, uat $0.00 (it ran after the release). **Total $9.01.** All 4 sessions were resolved from the registry cache; none was unrecoverable.
- After the release, `--since 2026-11-18T22:42 --until 2026-11-18T22:57`: uat $2.64 (own $1.99, `browser-walker` $0.65) and devops $0.19, total $2.83.
- Steering row `chain steering-roadmap`, same window: session `c585f1cc`, $8.81 (own $7.93, `general-purpose-sonnet` $0.88). It also carried chain 017's opening work in that window (ID minted 22:05Z, analyst started; `017-rulings.md` blocks 22:05Z to 22:18Z), so it is not chain A's alone.
- Production lines: 6 (`git diff --numstat 395510e 1ad625e`: `Child.tsx` +6; `.eslintrc.json` is lint configuration and the test is a test). **$1.50 per production line** for the role sessions in window, and $1.97 with the post-release look.

**Chain B** — `chain hooks-fix-personal-message-access --since 2026-11-19T20:30 --until 2026-11-20T01:34`
- Session set:
  - fixer `b5afe525` $12.78 and `26de9dd0` $2.74 (two sessions, before and after its 23:3xZ clear);
  - code-reviewer $7.00;
  - qa $9.19 (own $9.17, `general-purpose` $0.03);
  - security $20.26;
  - devops $3.05;
  - uat and architect $0.00 (they ran after the release).
  - **Total $55.02.** All 8 rows were resolved from the registry cache; none was unrecoverable.
- After the release, `--since 2026-11-20T01:34 --until 2026-11-20T01:50`: architect $3.25, security (closing) $2.87, uat $2.62 (own $2.32, `browser-walker` $0.30), devops $0.78, code-reviewer $0.16. Total $9.68.
- Steering rows, `chain steering-roadmap-hooks`, same window:
  - `da93f9fd` $10.94. It holds pre-chain work for chain 017: its `retrospective` subagent $3.17 and `deweeder` $4.69.
  - `6c2fc78b` $11.07: own $10.32 and `general-purpose-sonnet` $0.75, the refutation helpers among them.
  - Rows with no usage in the window and a `seen` stamp earlier than the chain are a same-named thread's earlier sessions, reported out.
- Coordinator, `chain steering-coordinator`, same window: one row, `6071e0ba`, $0.06. It is not attributable to the chain.
- **Outside both families:** `security-hooks-website-deps`, the dependency review opened on his 01:33Z selection, is its own effort and is not counted.
- Production lines: 123 (`git diff --numstat 787bec5 983681c -- src ':!**/__tests__/**'`, 5 files). The fixer's document says 124, and the deployment record notes the one-line difference. **$0.447 per production line** for the role sessions in window, and $0.526 with post-release work. Adding the steering session `6c2fc78b`, whose window work was mostly this chain's, gives $0.616.

**Batch:** $64.03 for role sessions in window ($9.01 + $55.02) over 129 production lines, which is $0.496 per line. That excludes post-release work and steering.

## Handoff

- **Recommended next:** pi, on the owner's command, for Recommendations 1 to 10. pi closes this document as `Processed` once they are extracted.
- **Architect:** no new architectural pattern needs documenting. Both chains' changes are in `system-architecture.md`: line 126 for chain A, and the Problem Areas reconcile `3cb97ea` for chain B.
- **Open carriers this retrospective leaves as found:**
  - `handoff/fix-personal-message-access-post-deploy-2026-11-20.md` (R-1, his);
  - `handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md`;
  - `handoff/editor-shows-blank-shell-when-personal-message-load-is-refused-2026-11-20.md` (F-1);
  - and the exclusion handoffs S14, S15 and S1b, the recent-list guild rows, `getOne`'s absent number, and CR-3.
- **Items that need a carrier outside this document:** Recommendations 6, 7 and 8 change the record's own tools. They are the record owner's work, and this run writes only under `retrospectives/`, so each needs an `INBOX.md` entry from the steering thread. Recommendation 9's sightings belong beside the pending DECISION NEEDED entry in `~/.claude/agents/INBOX.md`.
