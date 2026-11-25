---
ID: n/a
Origin: fixes-2026-11-21-steering-hooks-4
UUID: d6194936
Status: Processed
Status-Detail: "Processed by pi batch 38 on 2026-11-25: every recommendation is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder."
---

# Retrospective (fixer batch fixes-2026-11-21-steering-hooks-4): fix-api-secret-compare

**Plan Reference**: none (fixer chain). The chain's fixer document: `implementation/closed/fix-api-secret-compare-implementation.md`
(UUID fbe73764, `Released`).
**Date**: 2026-11-21
**Retrospective Facilitator**: retrospective (`retrospective-fixes-2026-11-21-steering-hooks-4`, a subagent of `steering-hooks`)

This batch holds one chain. It runs alone because the chain took a `QA Failed` and a `REJECTED` round (`steering.md`, Fixer
paragraph; chain rulings block 18:23Z). The Origin follows the lifecycle's batch form (`references/documents.md`):
`fixes-<UTC date>-<thread>`, with `-4` because this is the thread's fourth batch today.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T18:53 | steering-hooks (spawn prompt; chain rulings block 2026-11-21T18:47Z) | Batch-of-one retrospective over fixer chain `fix-api-secret-compare` | Created. Value delivered to the serving ref; serving itself not yet observed. 4h54m from determination to release, of which about 3h24m was the chain waiting on two owner prompts. QAF-1 and CR-2 show that each gate's mutant set missed something the next gate's caught. Nine recommendations. |
| 2026-11-25T22:25 | pi (pi-batch) | Document closed | Status: Processed. pi batch 38 extracted the recommendations: each is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder. |

## Summary

**Corpus.**
- *Read first:* `architecture/system-architecture.md` L117, L119, L126 and L171, the lines the chain cites. `roadmap/` holds
  `.gitkeep` and `closed/` only, so no epic is cited.
- *Read whole:* the chain rulings `steering/fix-api-secret-compare-rulings.md`, every block through 18:47Z (re-read at 18:5xZ; its
  last commit is `5b5b6887`, 18:48Z); the six briefs (common, fixer, code-reviewer, qa, devops, qa-postdeploy); the four closed stage
  documents (implementation, code review, QA, deployment); the post-deploy carrier `handoff/fix-api-secret-compare-post-deploy-2026-11-21.md`
  (3039bc8a, re-read at write time, `Status: Open`).
- *Read in part:* the effort rulings `steering/fixer-queue-2026-11-21-rulings.md`, blocks 05:50Z, 18:01Z, 18:02Z and 18:37Z; the
  selection ledger `steering/selection-ledger/2026-11-21.md`, blocks 13:39Z, 15:30Z, 16:05Z, 16:07Z, 18:00Z and 18:35Z; the headers
  of handoffs b1fdd41a and c07b0565 (both `Status: Open`); the `~/.claude/agents/INBOX.md` FYI entry from steering-hooks recording
  the owner's 18:37Z standard; file listings and mtimes under `verification/fix-api-secret-compare/`; the definition lines cited
  under Recommendations (`fixer.md` L49-50, `code-reviewer.md` L140-148 and L232 and L303-313, `qa.md` L120-122, `devops.md` L22 and
  L53 and L68, `steering.md` L254 and L328-345).
- *Instruments:* record and website `git log` (author and committer dates agree, both read), `git diff --numstat b68f94c 0c14d5b`,
  file mtimes, and `cc-usage.py` (see Cost).
- *Cannot read:* SendMessage traffic between sessions (so the time the fixer actually sent its spawn cue), anything said to the owner
  outside the ledger, the sessions' transcripts (none consulted), Vercel (both the serving deployment and production logs), and
  steering-hooks' own spend for this chain (no separate capture was taken). Anything that rests on these is
  unverifiable-by-construction, not refuted.
- *Not completed:* one read this retrospective attempted, of the agents' `INBOX.md` entry on the misread record flag (effort block
  18:01Z). It was not re-issued. That entry's content is taken here only from the effort block's own description of it.

**Value Statement** (scope statement, chain rulings block 13:42Z): one constant-time `secretEquals` used at the three credential
checks; the bot endpoint refuses an empty or unset `HOOKS_API_TOKEN`; the v1 single-message route reads `id` through `messageIdShape`;
a guard test over every v1 route; and the `makeRes` helper move, which closes handoff b1fdd41a's items 2, 3 and 5.

**Value Delivered**: YES at the serving ref. Website `origin/master` holds `0c14d5b` (pushed 18:35:45Z, deployment record R4-R5). All
five scope items are met, per QA's verdict at `0c14d5b` and the review's approval there. Whether Vercel serves that commit has **not
been read**. B-1's PASS at 18:43Z cannot show it either (see What Didn't, item 5). Item 2 of the post-deploy handoff, the production
400s on the single-message route, is open and queued to the owner.

**Implementation Duration**: 4h54m, from the determination (13:42Z) to the release push (18:35:45Z). The last QA Phase 2 verdict
landed at 18:23Z (`fc63b90e`). By the anchors below, the stages were working for about 1h30m of that. For the rest, the chain waited
on owner prompts.

**Overall Assessment**: the change is small (21 production lines) and well evidenced, and the gates worked: QA caught what review
approved, and review caught what QA's own proposed fix still let through. Both catches came from mutants written by a second party,
each targeting the chain's central claim. Neither came from the evidence the first party produced. The process costs were outside the
stages, in two owner prompts that held the chain for about 3h24m and a 378-word release question. A user-facing label ("Get JSON")
was also written without reading the product, and it travelled from the fixer's flows to the release question unchecked.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Timeline anchors

| Time (Z) | Event | Anchor |
|---|---|---|
| 13:42 | Scoping determination | rulings block 13:42Z |
| 13:44 | Fixer started | rulings; cc-usage `seen` 13:44:18Z |
| 13:4x | Steering puts the item-4 selection prompt (the chain "does not wait on it", block 13:42Z) | ledger block 15:30Z, "put 13:4xZ" |
| 13:58:59 | Fixer's document committed, Handoff-At `32d10f7` | record `53460cfd`; website `32d10f7` committed 13:54 |
| 15:2x | Fixer's spawn cue recorded by steering | rulings block 15:30Z |
| 15:30 | Item-4 prompt answered | ledger block 15:30Z |
| 15:31 | Reviewer started | cc-usage `seen` 15:31:08Z |
| 16:08 | Reviewer's live-attack server start not completed; reviewer waits on that limb only | rulings block 16:08Z |
| 16:07 / 16:1x | First prompt on it answered; the steering-run attempt is also not completed; second prompt put | ledger 16:07Z; effort block 18:01Z |
| 18:00 | Owner's word: re-issue with the dummy value renamed | ledger block 18:00Z |
| 18:01:37 | Live attack capture written | mtime of `code-review/attack-32d10f7.txt` |
| 18:02:20 | Review round 1 APPROVED_WITH_COMMENTS at `32d10f7` | record `48168cf3` |
| 18:10:20 | QA Failed (QAF-1) | `7d6b3007` |
| 18:13 / 18:15:46 | Fixer round `b01ae0b`; review sub-entry REJECTED (CR-2) | `ee847ac1`, `8214c8c0` |
| 18:18:42 / 18:21:15 / 18:23 | Fixer round `0c14d5b`; review approves; QA Complete | `6f7be029`, `799172ab`, `fc63b90e` |
| 18:26-18:29 | Devops Stage 1 and Phase 2A | `2097c2fd`, `cab35951` |
| ~18:31 / 18:35 | Release prompt put / answered | deployment record, User Confirmation |
| 18:35:45 | Push | R4 |
| 18:43 | B-1 read, PASS | handoff 3039bc8a Item 1 |

### Went well

1. **The gates caught real defects, and each gate brought its own adversary.** QA wrote 23 mutants of its own on top of `mutant-gen`'s
   20. Two of its `secretEquals` mutants survived (`return a === b`, `Buffer.equals`), which is QAF-1. The reviewer then re-attacked
   the QAF-1 fix from first principles, as `code-reviewer.md` L146 requires for a fix to a guard. QA's proposed case still let the
   accept-on-equality form survive, at all four decision points (5 of 5 probes), which is CR-2. After that round, 7 of 7 were killed.
   Both fix rounds were test-only and short: from QA Failed at 18:10 to QA Complete at 18:23 is 13 minutes, across two fixer rounds,
   two review sub-entries and a QA refresh.
2. **Evidence was re-derived, not inherited.** QA re-read the fixer's red and green captures with a JSON reader. The reviewer counted
   `makeRes` importers from git (5, not the 4 in steering's determination). Devops re-derived rollback with `git apply --check -R`
   and built the tip in an export.
3. **Steering lodged its own errors in the round they happened.** Two examples: block 13:42Z records that the 13:39Z prompt said "closes
   that handoff whole" without naming item 4, and names the check that would have caught it. Block 18:01Z corrects the stamps.
4. **A known hazard reached the stages downstream.** After the 18:00Z ruling, the QA and devops briefs each carry its operand
   warning, and both stages record that every act they attempted completed.
5. **QA's instruments were classes, not examples.** The id oracle checked 1422 ids against a domain oracle, with the base tree as a
   discrimination control (205 disagreements at `b68f94c`). The edge-import graph had a positive control and a planted member. The
   first two edge runs read wrong, and the positive control is what caught it (recorded in the QA document).

### Didn't

1. **The first party's evidence for the central claim did not test the claim.** Scope item 1 *is* the constant-time compare. The
   fixer's evidence was a spy proving that each site calls `secretEquals`, plus behavioural cases (equal, unequal, lengths), and every
   one of those passes with `return a === b`. Its 13 negative controls replaced the call at each site, but never `secretEquals`'s own
   decision. The reviewer's round 1 read those controls and approved ("Hazard 5 … each site must call it once"). The brief helped
   cause this: common hazard 5 says "The constant-time property is not observable by a functional test … keep `secretEquals`'s own
   cases behavioural". That defined the evidence as the hop into `secretEquals`, not the decision inside it. QA showed the decision
   is observable structurally: assert that `timingSafeEqual` is called with the digests and that its answer is returned. Sighted in
   fix-api-secret-compare (QAF-1, MEDIUM, blocking).
2. **QA's correct fix still had a hole that one more mutant found.** QA's proposed case asserted that `timingSafeEqual` is called and
   that its answer is returned. Both hold under `timingSafeEqual(…) || a === b`. The property that closes the gap is a fixture where
   the mocked compare *disagrees* with string equality, in both directions, at every decision point (CR-2's resolution). The general
   lesson: to pin "X decides through Y", the fixture has to make Y's answer and the naive answer differ. Sighted in
   fix-api-secret-compare (CR-2, MEDIUM).
3. **QA was in the stage set only because the change was one line over the threshold.** The fix added 21 production lines (my
   recount: `git diff --numstat b68f94c 0c14d5b`, 3+3+6+9). Under 20, `steering.md` L254 and `code-reviewer.md` L232 have review
   approve straight to devops, and `code-reviewer.md` L313 keeps mutation sweeps as QA's job. Review had already approved at
   `32d10f7`. So a 19-line version of the same change would have shipped with QAF-1 in it. The threshold measures the change's size.
   The defect sat in the property the change exists to deliver. QA's pre-release spend was $4.56 of the chain's $20.05.
4. **The chain spent about 3h24m of 4h54m waiting on two owner prompts.**
   - *Wait 1, about 1h32m:* the fixer's document was committed at 13:58:59. Steering recorded the spawn cue at 15:2xZ and started the
     reviewer at 15:31. Over the same span, steering's selection prompt on item 4 was open (put 13:4xZ, answered 15:30Z), although
     block 13:42Z says "the chain does not wait on it". *Inference:* the record cannot show when the fixer sent its cue (SendMessage
     traffic is outside the corpus). The anchors do agree with a cue that queued behind a blocking prompt. `steering.md` L331-336
     already says that while another chain can still reach a next act, a question goes in the plain-message form, not as a blocking
     prompt. The fixer was mid-work at 13:4xZ.
   - *Wait 2, about 1h52m:* the review's live-attack limb waited from 16:08Z to the owner's 18:00Z word (prompt put 16:1xZ), and the
     approval and QA's start waited with it. That prompt was the second on the same act. The first (16:07Z) offered "Agent: I start
     the server" while its own text said the cause was "unchecked". The refutation helper that settled the cause ran only after that
     answer. The effort recorded the same ordering error at 05:59Z ("the prompt was put before a refutation helper tried the sweep's
     conclusion"). It recurred within the day.
   - Batch signal: *the same question reached the owner more than once*, twice over. Handoff b1fdd41a was asked about at 13:39Z and
     again at 15:30Z (item 4 omitted the first time). The server start was asked about at 16:07Z and again at 18:00Z. Batch d's
     case-list read reached him a third time on the same misread flag (16:05Z).
5. **B-1 cannot tell the release from the build before it.** Its prediction ("the message JSON comes back") holds on the old
   deployment whenever production's token is non-empty, so a PASS is the same whether or not `0c14d5b` serves. Only a failure carries
   information. The row records "Vercel production serving … `0c14d5b`" as its earliest-decidable condition, and QA's result records
   that condition as unread (the GitHub deployments API answered 404; no instrument reads Vercel). `qa.md` L122 already asks that a row
   read from a process "names the release that process must be running, tested as containment". No instrument in this workspace can
   test that against Vercel. Steering has queued the serving read to the owner (`OWNER-QUEUE.md`, block 18:47Z).
6. **B-1 named an owner who cannot run its instrument, and was never shown working before the release.** `qa.md` L122: "a row
   another stage executes names an instrument that stage's definition can run", and "A row's instrument is shown to work at minting:
   run once read-only where it can run". QA minted B-1 with Owner `devops`, a Discord browser as the instrument, and the
   minting-time read deferred to devops's Stage 1. Devops holds no browser (`ToolSearch` found none, 18:2xZ). QA held the stage
   browser and ran the read itself after the release, on steering's 18:4xZ brief. So the pre-deploy run that would have shown the
   instrument working never happened, although the stage that minted the row could have run it at 18:23Z. Why QA deferred it is not
   in the record.
7. **A user-facing label was written without reading the product.** The fixer's User-visible flows call the command "Get JSON". It
   renders as "Get Message" (`src/lang/generated/en-US.json:4`, read at `0c14d5b`), and its reply is a load code with an editor link,
   not JSON. The name travelled unchecked into QA's B-1 prediction, the devops brief, the release question ("Get JSON fails for every
   hooks-bot user") and the post-deploy brief. QA's B-1 read corrected it at 18:43Z. `fixer.md` L49 asks for "product vocabulary".
8. **The release question was 378 words, led with the ask, and carried terms the owner has to look up.** The count is the question
   only, from python over the ledger block; the options add 114 more words. It contains five SHA-like tokens. It opens "Release the
   fix-api-secret-compare chain (website commit 0c14d5b, 6 commits on top of master b68f94c)…" and goes on to `9223372036854775807`,
   "2^53", "reverse-applies cleanly", "your 13:39Z selection", and the fixer's flows verbatim. His 18:37Z standard (effort rulings) is
   what this question drew. Part of the length is prescribed: `steering.md` L254 requires the fixer's flows "quoted to him with the
   fix's release — in the push prompt". Steering's devops brief, hazard 3, said the same ("in your release ask"). Devops followed the
   rule, and the rule produced the jargon. Steering has already lodged the standard in `~/.claude/agents/INBOX.md` (FYI).
9. **Two stamps in the review disagree with the record's other anchors.** The review's Adversarial execution section stamps its run
   "17:5xZ" and cites "selection 16:1xZ" as the owner's word. The ledger records the answer at 18:00Z, steering relayed it at 18:0xZ,
   and the attack capture's mtime is 18:01:37Z. On those three anchors the run followed his word. The "17:5xZ" stamp looks wrong, and
   "16:1xZ" is the time the prompt was put, not answered. Where it bears: a reader of the review alone would place the run before the
   word.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

No UAT is in a fixer stage set.

| Segment | Done by hand | Cost on record | How it could run unattended |
|---|---|---|---|
| QA Phase 2 at `32d10f7` and the refresh at `0c14d5b` | Nothing driven step by step: the mutation sweep was `mutation-run.py` run by a Haiku helper ($0.02), and the edge-import graph and id oracle were scripts under `verification/fix-api-secret-compare/qa/` | $4.56 pre-release for the whole QA session | Already scripted. The **edge-import graph** asserts that `interactions-edge.ts` does not reach `node:crypto` or `secretEquals`. That checks a standing architectural split (system-architecture L117), but it is a chain-local probe. As a website suite case it would guard every later change. Recommendation 8. |
| QA, post-deploy B-1 | The stage browser driven by hand as the test account in guild `1566742402180456559`: check that Hooks.gg is a member, run "Get Message" on a message, read the ephemeral reply (18:38-18:45Z) | QA's spend after the release: $2.83 (cc-usage 7.39 minus 4.56; this includes the record writes) | A scripted browser step ("run message command *label* on the latest message in *channel*; capture the reply's text") would let **devops** show the instrument working before the deploy, which closes What Didn't item 6, and would rerun after every website release that touches the bot path. No pinned runner exists: python `os.listdir` over `~/.claude/tools` (95 entries) and the record's `tools/` (9) found no name containing browser, walk, discord or playwright. Recommendation 7. |
| Code review, live attack | The dev server was assembled by hand: a `git archive` export, `env -i`, dummy values chosen per run, `systemd-run`. That hand-chosen dummy value is what led to the act not completing and to about 1h52m of waiting. The 51 requests themselves were scripted (`attack-driver.mjs`). | Not separable within the reviewer's $6.16 | A recipe that stands up a dummy-valued `next dev` of a website SHA, with fixed dummy values, a closed-port database and teardown checks, would make the dummy values reviewed once rather than invented per run. The adversarial-execution reference requires such a stand-up for every authentication-gate change. Recommendation 6. |
| Devops, packaging at the tip | Scripted. The first `typecheck` in the export exited 2 because `next-env.d.ts` is git-ignored and only `next build` generates it. | In devops's $2.10 | The packaging step runs `build` before `typecheck` in an export, or generates `next-env.d.ts` first. This is an ordering fact for the devops packaging step. |
| Owner | The serving-commit read and the production 400s read, both on the Vercel dashboard (`OWNER-QUEUE.md`) | His time, not on record | Unattended only with a read-only Vercel instrument, such as a scoped API token or a build-id route. Sanctioning one is his decision (Handoff, item for steering 2). |

## Lessons Learned

1. **When a brief says a property "is not observable by a functional test", the next question is which structural assertion pins
   it.** Otherwise the brief licenses tests that pass under the naive implementation. Here the structural form was a mocked compare
   whose answer opposes string equality, at every decision point.
2. **Mutant sets cover their authors' imagination.** The fixer's 13 controls missed QA's survivors, and QA's proposed case missed
   the reviewer's survivors. The second-party mutant is the instrument that found both. A chain with no second party running
   mutants, such as a fix under 20 lines, has no instrument for this class.
3. **A line-count threshold is a proxy for risk, and here the proxy almost failed.** The defect was in the one property the chain
   existed for, and QA was present by a margin of one line.
4. **A blocking prompt in the steering session is a chain-wide stall.** It is not one question waiting. The definition already
   carries the rule, and the rule was not followed. The same holds for "refute before you prompt", which recurred after being
   recorded the same morning.
5. **A post-deploy row whose PASS is predicted on both builds tests nothing about the release.** It needs either a precondition
   instrument (the serving commit) or a prediction that differs between the builds.
6. **Names the owner reads have to come from the product.** A flow label that is not the product's travels unchecked through every
   later document, because each stage restates the one before it.

## Recommendations (each naming the file it would change)

Each is for pi, on the owner's scheduling, except where marked as an item for steering. Every one was sighted in
fix-api-secret-compare, the batch's only chain.

1. **`~/.claude/agents/code-reviewer.md`** (round 1, beside L140-148): where a scope item claims that one function decides through
   a mechanism (a constant-time compare, a signature check, a validator), review probes that claim at round 1. The probe is one
   naive-substitution mutant per decision point (the mechanism replaced by its plain equivalent, and an accept-on-equality form).
   This is the "one finding" use of mutants that L313 already allows, applied at round 1 instead of only on re-review. It would have
   caught QAF-1 before approval at `32d10f7`.
2. **`~/.claude/agents/fixer.md`** (Test step) and the workspace **`agent-output/CLAUDE.md`** Test Conventions, an item for steering
   since the record file is not pi's: a delegation property ("X decides through Y") is evidenced by a fixture that forces Y's answer
   to disagree with the naive answer, in both directions, plus a negative control replacing the mechanism inside X, not only at its
   callers.
3. **`~/.claude/agents/steering.md`**, Fixer paragraph L254, and `code-reviewer.md` L232: a fix under 20 production lines whose scope
   names an authentication gate or security boundary takes QA Phase 2 anyway, or the reviewer's under-20 duties add the probe in
   recommendation 1. Either way, the class of defect QA caught here no longer depends on the line count.
4. **`~/.claude/agents/steering.md`**, brief composition (the hazard-bearing analysis): a hazard that says a property is not
   functionally observable names the structural assertion that stands in for it, never "keep the cases behavioural" alone.
5. **`~/.claude/agents/steering.md`** L331-336 and **`~/.claude/tools/prompt-gate-hook.js`**: make the existing plain-message rule
   mechanical. The gate would refuse a selection prompt from a steering session while a stage session that session started is live,
   unless the prompt states that nothing it steers can move. Separately, `references/escalation.md` (lifecycle skill): an option
   whose premise its own text calls "unchecked" or "a guess" is not put until a refutation helper has tried it.
6. **`~/.claude/agent-skills/code-review-standards/references/adversarial-execution.md`** plus a new tool under `~/.claude/tools/`: a
   dummy-valued dev-server recipe for website (export of a SHA, fixed dummy values, closed-port database and Redis, capped scope,
   teardown with `ps`/`ss`/`ls -d` checks) that the reference names, so no stage hand-picks a dummy value.
7. **`~/.claude/skills/discord-test-browser/`**, with a scripted runner under `~/.claude/tools/`: one step that runs a named message
   command on a message in a named test-server channel and writes the reply text to a file. Devops then holds an instrument for
   rows like B-1 without a browser of its own.
8. **Website suite**, an item for steering to route (a product change, not a definition): lift QA's `edge-import-graph.mjs` check into
   a website test asserting that the edge route's import graph reaches neither `node:crypto` nor `secretEquals`.
9. **`~/.claude/agents/qa.md`** L122 and **`~/.claude/agents/fixer.md`** L49:
   - *qa.md:* a row whose instrument is the stage browser names QA or UAT as owner, and QA runs it read-only at minting before
     handing the release on. A post-deploy row whose predicted value is the same on the old and the new build records that, and is
     paired with its serving-commit read.
   - *fixer.md:* each user-facing label in User-visible flows is quoted from the source that renders it, with file and line.
   - *steering.md L254 and devops.md's Phase 2B ask:* the release question carries the flows in the owner's terms, context first;
     the verbatim flows go in the deployment record. This is already lodged by steering in `~/.claude/agents/INBOX.md` (FYI, his
     18:37Z words) and is not re-lodged here.

No handoff is created: no recommendation is for the effort's next chain alone.

## Cost

Readout: `python3 ~/.claude/tools/cc-usage.py chain fix-api-secret-compare --since 2026-11-21T13:39:00Z --until 2026-11-21T18:35:45Z`,
run 18:5xZ. The window runs from the scoping selection to the push. Steering's unbounded capture
(`verification/fixes-2026-11-21-steering-hooks-4/cost/chain-5.txt`, no `--until`) reads $23.37, which includes the post-release B-1
read.

| Session | Requests | $ to release | $ unbounded |
|---|---|---|---|
| fixer-fix-api-secret-compare | 114 | 7.22 | 7.22 |
| code-reviewer-fix-api-secret-compare | 98 | 6.16 | 6.16 |
| qa-fix-api-secret-compare (own 4.55 + general-purpose Haiku 0.02) | 79 | 4.56 | 7.39 |
| devops-fix-api-secret-compare | 53 | 2.10 | 2.60 |
| **Total** | 344 | **20.05** | 23.37 |

- Session set: those four. All four resolved from the registry cache (live entries gone; stopped 18:46Z per block 18:47Z), so none
  is unrecoverable. No session outside the `*fix-api-secret-compare` form belongs to the chain.
- Subagent usage is filed under its parent's row (QA's Haiku helper).
- **Not in the readout:** steering-hooks. It steered this chain alongside batch d's close-out from 13:39Z to 18:4xZ, and no
  separate steering capture was taken, so its share is unrecorded.
- **$ per added production line:** 21 lines (`git diff --numstat b68f94c 0c14d5b`; production paths
  `src/pages/api/interactions-server.ts` 3, `…/messages.ts` 3, `…/messages/[id].ts` 6, `src/server/api/utils/secretEquals.ts` 9).
  That gives $0.95 per line to the release, or $1.11 unbounded, both excluding steering.

## Handoff

- **Architect** (recommended next): the chain adds a convention that the architecture record does not state. Credential compares in
  website's API go through `src/server/api/utils/secretEquals.ts`, which must stay outside the edge runtime's import graph. The
  deployment record's Phase 2D found no line invalidated, and nothing was routed. Documenting it beside L117/L119 is the architect's,
  on steering's routing.
- **Items for steering-hooks:**
  1. Recommendations 2 (workspace Test Conventions) and 8 (website edge-graph test) are record or product changes, not definitions,
     and are yours to route.
  2. The serving-commit gap (What Didn't, item 5) recurs for every website release on Vercel. A read-only Vercel instrument is the
     owner's sanction to give. The two dashboard reads already queued in `OWNER-QUEUE.md` settle B-1's precondition and item 2 for
     this chain only.
  3. Handoffs 3039bc8a and b1fdd41a stay open on those owner reads (block 18:47Z). Closing them is yours, not this document's.
  4. The review's two stamps (What Didn't, item 9) sit in a closed document. This retrospective does not correct another stage's
     record.
- **Roadmap:** nothing cited and none owed.
- **pi:** this document rests at `Active` until pi processes it on the owner's word.
