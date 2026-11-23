---
ID: n/a
Origin: fixes-2026-11-23-steering-hooks-fixer-3
UUID: 03934cdc
Status: Active
Status-Detail: "Fixer-batch retrospective over one chain, fix-image-uploader-url (9e; released website af3d95a -> 5ec0621 2026-11-23T18:36:07Z); awaiting pi on the owner's word."
---

# Retrospective (fixer batch fixes-2026-11-23-steering-hooks-fixer-3): fix-image-uploader-url

**Plan Reference**: none (fixer chain). The chain's fixer document is `implementation/closed/fix-image-uploader-url-implementation.md`
(UUID 5d9aefc4, `Released`).
**Date**: 2026-11-23
**Retrospective Facilitator**: retrospective (`retrospective-fixes-2026-11-23-steering-hooks-fixer-3`, a subagent of `steering-hooks-fixer`)

This batch holds one chain. It runs on its own because it took a REJECTED code-review round and two QA Failed verdicts. The two earlier
batches of this thread (`fixes-2026-11-23-steering-hooks-fixer-retrospective.md` and `-fixer-2-retrospective.md`) and
`fixer-batch-2026-11-21-c-retrospective.md` are all still `Active`, so pi has not processed them. Where one of their recommendations
recurs here, it is named as a further sighting and not re-proposed.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T18:54 | steering-hooks-fixer (spawn brief) | Fixer-batch retrospective over `fix-image-uploader-url` | Created. The chain delivered all five limbs to production in 2h42m from determination to push, with almost no waiting. Three gates failed it. Two failures (CR-1, QAF-4) were behaviours the fixer's document claimed with no case holding them. One (QAF-1) was a test host whose callbacks did not behave like the consumers'. Chain sessions cost $28.90 to the push for 41 production lines ($0.70 per line). Three new recommendations, one of them on the owner's relayed remark about release-prompt length; eight sightings of open recommendations; three items for steering. |

## Summary

**Corpus.**
- *Read first:* `architecture/system-architecture.md` lines 134 and 222 (`useDialogEnter`), found by grep. No passage names `ImageUploader.tsx`,
  which agrees with the code review's Architecture Alignment. `roadmap/` holds only `.gitkeep`, so no epic is cited.
- *Read whole, by me, at 18:4xZ-18:5xZ:*
  - the four chain documents in `closed/`: implementation, code review (Rounds 1 to 3 and two sub-entries), QA Phase 2 (three passes) and the
    deployment record;
  - `steering/fix-image-uploader-url-rulings.md`, every block through 18:50Z;
  - the briefs `steering/fix-image-uploader-url-brief-common.md` and `-brief-devops.md`;
  - the standing file `steering/fixer-queue-2026-11-21-standing.md`;
  - the effort log `steering/fixer-queue-2026-11-21-rulings.md`, blocks 13:09Z to 18:30Z;
  - `steering/selection-ledger/2026-11-23.md`, every block (uncommitted; read, not committed);
  - `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`: its header, F-7's row and the 18:43 changelog row.
- *Read in part:* `~/.claude/agents/devops.md` (Phase 2B; Stage 1 step 8), `code-reviewer.md` (severity floor, L96-97), `fixer.md`
  (Workflow), lifecycle `references/escalation.md` (whole), `~/.claude/tools/mutant-gen.js` (header), `~/.claude/agents/INBOX.md`
  L426-427, record `INBOX.md` L225-227, L321-322 and L437, and the recommendations sections of the three open retrospectives named above.
- *Instruments:*
  - `git -C website log` and `git diff --numstat af3d95a 5ec0621`;
  - `git merge-base --is-ancestor 5ec0621 origin/master` (exit 0);
  - `git log` of the record for every stage commit's time;
  - `cc-usage.py chain` for the chain and for the steering thread, captured under
    `verification/fixes-2026-11-23-steering-hooks-fixer-3/cost/`;
  - `grep -rn` over `~/.claude/agents/*.md` and `~/.claude/agent-skills` for the owner's question-context standard (no hit outside the
    inboxes).
- *Not read:* the evidence files under `verification/fix-image-uploader-url/`, apart from listing `devops/walk/`. Load-bearing numbers
  are cited from the stage document that recorded them. I did not recompute them.
- *Cannot read:* SendMessage traffic, and anything the owner said in conversation. So a cue's time is the time the receiving stage
  recorded acting on it. The owner's remark on the release prompt reached the record only as devops's relay into steering's 18:46Z
  block. It is weighed below as relayed evidence, not as his words.
- *Unverifiable by construction:* why the QAF-2 prompt went out at 17:3xZ rather than with the 17:22Z ruling. The record shows a
  refutation helper ran first (rulings block 17:40Z, Premises). It does not show when that helper started.

**Value Statement** (the scope statement, rulings block 15:54Z, with limb 5 from block 17:40Z): in the image address dialog,
1. Save and Enter commit exactly the address the box shows, and only once that address has loaded;
2. an address that fails the check, by format or by load, cannot be saved;
3. a slower, earlier check never overwrites a later one, and none lands after Clear;
4. Cancel puts the box and the preview back to the saved image, with or without one saved, and reopening shows the saved image;
5. Enter with focus in the address box commits as Save does, under limbs 1 and 2's conditions, with the other dialogs unchanged.

**Value Delivered**: **YES** at its scope. The deployment record is the authority, re-read at 18:5xZ. Vercel deployment
`dpl_45ocUDV5PtYtxBUUhBTc2CBMyWZp` was built from `master` at `5ec0621` and was Ready by 18:36:43Z. The post-release walk on hooks.gg
(W1 to W9, signed out, 0 write requests) passed limbs 1, 2 and 5 and flow 6 on the production bundle. Named residue:
- Stored messages saved with a wrong address before the release keep it, and nothing in the data marks them. That check is the owner's.
- Flows 2, 4, 5, 7, 8 and 9, and the four other dialogs, were not walked on production. Each was walked or held by cases at QA.
- F-7 (handoff 017) has a partial read and stays `Open`.

**Implementation Duration**: 2026-11-23T15:54Z (determination) to 18:36:07Z (push), **2h42m**. No UAT is in the stage set. The last QA
Phase 2 verdict (PASS) was at 18:25:44Z, 2h31m after the determination.

| Segment | From | To | Elapsed |
|---|---|---|---|
| Determination and tree cut | 15:54 | 15:55 | 1m |
| Fixer to first hand-off (`7660259`, document 16:36) | 15:56 | 16:36 | 40m |
| Review Round 1, **REJECTED** (CR-1, CR-2) | 16:37 | 16:43 | 6m |
| Round 1 fix (`e94baf7`), sub-entry APPROVED | 16:43 | 16:53 | 10m |
| CR-3 ruling and QA spawn | 16:53 | 17:05 | 12m |
| QA Phase 2 at `e94baf7`, **QA Failed** (QAF-1) | 17:05 | 17:20 | 15m |
| QAF-3 ruled in, fix round (`cae7472`), review Round 2 APPROVED (later superseded) | 17:20 | 17:33 | 13m |
| QAF-2 put to the owner (put 17:3xZ, answered 17:40Z) | 17:33 | 17:40 | about 7m |
| Limb 5 (`48c5e87`), review Round 3 APPROVED | 17:42 | 17:59 | 17m |
| QA re-run at `48c5e87`, **QA Failed** (QAF-4) | 18:0x | 18:13 | about 13m |
| QAF-4 test (`5ec0621`), review sub-entry, QA PASS | 18:13 | 18:25 | 12m |
| Devops brief, Stage 1, tip build, release ask answered | 18:26 | 18:35 | 9m |
| Move, Vercel read, walk, Phase 2D | 18:35 | 18:45 | 10m |

**Overall Assessment**: the chain delivered more than it was scoped for, fast, and every gate caught something real. Two limbs were added
mid-chain: QAF-3, a pre-existing defect ruled in under "fix everything", and limb 5, by the owner's selection. Production lines grew from
26 to 41. Against the previous batch, almost nothing waited: the owner answered the release ask within about two minutes. The rework is
the lesson. The REJECTED round and the second QA Failed have one shape: the fixer's document claimed a behaviour (flow 8; "a change that
arrives while the dialog is open replaces the box") and no suite case failed when it was lost. That is the severity floor, which the
fixer's definition does not ask the fixer to apply to its own claims. The first QA Failed was a test host whose callbacks did not behave
like the consumers' callbacks, a class an earlier batch already met.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Batch-level reads first

1. **Work queued behind a prompt.** Little. The QAF-2 product question was known at 17:20Z (QA document) and held for the owner at 17:22Z
   (rulings). It was put at 17:3xZ, after a refutation helper had run, and answered at 17:40Z. Meanwhile the fixer's QAF-1 and QAF-3 round
   went ahead, and review Round 2 approved `cae7472` at 17:33Z. The answer added limb 5, so that approval was superseded and a Round 3
   followed. The cost was one short review round, inside the reviewer's $4.56. The release ask was put from devops's own session after
   Stage 1 (18:33Z) and answered before 18:35:40Z. That is the form the previous batch's recommendation 1 asks for.
2. **Work queued behind a tree.** Plan 019's implementation waited on the website tree for this chain (effort block 18:24Z). Plan 019
   Revision 9 was approved by all three gates at 18:15Z (record `6ada0e71`), and the tree came free at 18:36Z. Whether plan 019 lost
   those 21 minutes depends on when its implementer could have started, which the record does not show.
3. **Chains contending for one box.**
   - *Load.* The fixer's suite run 1 at `7660259` and QA's suite run 1 at `e94baf7` each failed on `trpc.batch-refusal.test.ts` timing
     out at about 5,000 ms, at load average 30 to 33. Both re-ran clean. Plan 019's sessions were active in the same window (record
     log 16:00Z-18:15Z), but the record does not tie the load to them. The test's load sensitivity is record `INBOX.md` L321, and
     `fixer-batch-2026-11-21-c` recommendation 6 covers QA's run order. Sighted again here.
   - *Browser profile.* QA's second walk waited a minute for another session to release the test profile. Devops's helper then found
     the shared profile signed in to hooks.gg (deployment record, Post-release walk: result). See Batch-level 5.
4. **The same question reaching the owner more than once.** None.
5. **The same finding in more than one chain.** Each item below was raised by an earlier batch and is still unprocessed. Each is
   sighted again here:
   - *Hook dependency arrays.* QAF-1's survivor was `qa-cancel-deps-stale` (`[image, onClose]` → `[onClose]`), and its sibling
     `qa-save-deps-stale` was killed only by `enter-scope`. Both were hand-written by QA. `mutant-gen.js` makes no dependency-array mutant
     (header L12-15), and `react-hooks/exhaustive-deps` is off. The fixer's 15 controls had none. This is `fixer-batch-2026-11-21-c`
     recommendation 2, sighted a second time.
   - *Record documents written by script, disclosed.* The reviewer used a `python3` replace script (code review, "Disclosed in this
     round"). Devops used one for the runbook cells (deployment changelog 18:39). Steering placed the standing file with `cp` (effort block
     18:30Z), and the gate refused its heredoc for the 18:46Z block (rulings, Disclosed). That is the first batch's recommendation 4.
   - *Typed stamps.* The stamp gate refused the reviewer's 16:44 (against 16:43Z), QA's 18:12 (against 18:11Z) and devops's 18:44 in
     handoff 017 (against 18:43Z). That is the first batch's recommendation 5.
   - *Vercel CLI hangs.* The first two production listings hung at 60 s, and later calls hung once each (deployment record, Disclosed).
     That is the first batch's recommendation 7.
   - *Post-deploy walk in a signed-in profile.* For the third chain running, the helper's profile was signed in where the brief asked for
     signed out. This time devops wrote and ran `walk/walk-signedout.js` itself in a clean headless Chrome. That is the first batch's
     recommendation 6, and the script is a seed for it.
   - *No open-handoff trigger sweep tool.* Devops wrote another python enumeration (deployment record, Phase 2A). This is record
     `INBOX.md` L225-227.
   - *Phase 2D statuses.* Code review and QA were left at `Committed`. The previous chain's reached `Released`. Both are terminal, so the
     trigger is unaffected. The first batch's recommendation 3 would make this consistent.
   - *A dev server and an image server stood up by hand for each walk.* See Testing by Hand. This is record `INBOX.md` (2026-11-12
     pi-batch entry, item 2: a `serve <sha>` verb for `uat-local-stack.sh`).

### Went well

1. **The determination was re-swept at the tip and found a fourth mode.** `ImageUploader.tsx` was unchanged since the first sweep. Even
   so, steering re-swept at `af3d95a` with a property-only brief and refuted the claims with a run through the real component. The
   re-sweep found F3, a Clear undone by a pending check (rulings block 15:54Z).
2. **The fixer's evidence was thorough where it had cases.**
   - A red run of 11 of 14 at base, each on a literal expectation.
   - A lifetime exit table for the check, and a declined-work trace.
   - 15 of 15 controls killed. Each survivor across the rounds got a case.
   - Its first fix regressed Clear for a saved address that fails at open. The fixer found that itself, base against fix, before
     hand-off (`ee87897`).
3. **Every gate ran the real component, not a model of it.**
   - The reviewer's probes ran at base and tip in exports: P1 for CR-1, P2 for CR-2, and P5 to P8 with a control at the previous SHA.
     Round 3 settled the shared hook's no-change claim with a hook probe that tells the two trees apart (Q3).
   - QA's two-tree differential mounted the real `WarningDialog`, `ConfirmationDialog` and `ImageUploader`. The outputs differ only in
     the positive control's row.
   - QA walked flows 1, 3, 8 and 9, a JSON load to a 404 address, and Reload with the dialog open, all in Chrome.
4. **Structural remedies were taken.** CR-1's preferred remedy removed the stored error, which made the class unrepresentable (0
   `setImageError` hits). The reviewer confirmed it as a class, not as a site. The QAF-3 sync then made CR-2's line redundant, and the
   fixer removed it on a survivor (`save-keeps-last-loaded`). The reviewer traced all five consumers' round trips before accepting the
   removal (CR-4).
5. **Scope changes were ruled in the round, with premises run.**
   - CR-3 was ruled inside limb 1 in 12 minutes, quoting his words.
   - QAF-3 was ruled in under limb 4's own words after a reachability read.
   - QAF-2 went to him as a product choice with a run refutation at both SHAs. It came back as limb 5 with a write-set condition (the
     shared hook must not change the other dialogs). The reviewer and QA then each checked that condition by execution.
6. **Devops closed QA's last assumption on production, and did not invent a register row.** QA routed the production-build assumption to
   devops. Devops folded it, and F-7's cheapest read, into one signed-out walk. When the helper's profile was signed in, devops did not
   pick a server or save. It probed the signed-out routes and ran the same nine steps in a clean Chrome, with 0 write requests
   (deployment record, Post-release walk: result).
7. **The box was cleared and the scoring ran beside the retrospective.** The deweeder scored 43 cases (9 below 7, each naming a covering
   case), and steering removed about 968 MB of chain scratch (rulings block 18:50Z).

### Didn't

1. **Two of the three gate failures were claims the fixer's document made without a case.**
   - *CR-1 (REJECTED, Round 1).* Flow 8 says "That still holds after Cancel and reopening". No case closed and reopened the dialog on a
     failed saved address (code review, TDD check, Gap). The fix's `onCancel` cleared the error, and nothing set it again. Brief hazard 4
     named that branch as "read from code, not run". Hazard 2 named the no-remount path. The fixer's base-against-fix section covered
     Clear and outside clicks, but not the error message.
   - *QAF-4 (second QA Failed).* The QAF-3 fix text says "A change that arrives while the dialog is open replaces the box in the same
     way". QA's coupling mutant `&& !isOpen` survived the suite.
   - The reviewer had seen the second claim at Round 2. It recorded it as CR-5 INFO "for QA's walk", held only by its own probe P5. QA
     applied the severity floor to the same fact 40 minutes later and made it MEDIUM. Code-reviewer.md and qa.md state the same floor,
     so the two gates read "an assertion" differently: the reviewer counted its probe, QA counted only the suite.
   - Cost: the REJECTED round took 10 minutes, and the QAF-4 round took 12 minutes plus a QA re-run.
2. **The first QA Failed was test-host fidelity.** The saved-address `Host` built new arrow callbacks on every render. All five consumers
   pass stable ones (QA, Implementation Review). With `exhaustive-deps` off, a lost `image` dependency in `onCancel` was invisible to the
   suite. This chain's instance is covered by the dependency-array mutant recommendation (sighting above). The host rule itself (a host
   standing in for a parent passes callbacks with the parent's identity behaviour) is not in Test Conventions.
3. **The release prompt's context ran to ten sentences, and the owner's relayed remark says two were needed.** See Lessons 3 and
   Recommendation 3. My count is from the ledger block (18:35Z). Steering's block says "about nine".
   - Sentences 1-2 say what is ready and what it covers.
   - Sentences 3-5 restate the defects, which the flows then state again.
   - Sentences 6-7 give gate status and the local build, repeated under NOT TESTED.
   - Sentences 8-9 give the deploy mechanism and its unread link. Sentence 8 names the branch (`master`), against brief-devops hazard 2.
   - Sentence 10 is the stored-message residue.

   The disclosures in 8-10 are owed by escalation.md (a premise not in the record is "marked inside the option as an assumption") and
   by devops's residue practice. The remark, as relayed, places them outside the context, not out of the prompt.
4. **F-7's trigger fired on a chain with no stage of its owner.** F-7's owner is UAT. Its trigger includes "the next change to
   `ImageUploader.tsx`", and a fixer chain has no UAT. Devops read it in part, sampling focus at the press and at 400 ms. The 75 ms leave
   window that F-7 asks about was not sampled, and Escape or Cancel on a delete warning was not driven. The handoff stays `Open`. Its
   trigger text is unchanged, though the "whichever comes first" event has now happened.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

No UAT is in a fixer stage set. Costs are the subagent rows of the readout (Cost, below).

| Segment | Done by hand | Cost on record | How it could run unattended |
|---|---|---|---|
| QA, three real-browser walks (`e94baf7`, `48c5e87`, `5ec0621`) | Each time by hand: a `git archive` export, an offline install, `next dev` on 3000, `tools/uat-local-stack.sh up` (ids from 900000000000001), and a loopback `no-store` image server on 8765 with good and 404 PNGs. A `browser-walker` drove 21, 24 and 10 evidence steps. Each walk was torn down by process-group kills and a `/proc` cwd check. Walk 2 waited a minute for the profile | browser-walker $1.73 over the three | The `serve <sha>` verb already asked for (record `INBOX.md`, 2026-11-12 pi-batch item 2), plus a fixture image server with per-path delay (Recommendation 4). Flows 2 and 5 (load order) ran only under `FakeImage`, because no walk could make one real load slower than another. The step lists are ready-made step files for the editor-walk runner (the first batch's recommendation 6) |
| QA, hand-applied mutant at `5ec0621` | `qa-sync-only-when-closed` applied in an export by exact-once replacement, run, and restored | in QA's $9.80 | `mutation-run.py` with the one-mutant file it already had (`rerun-48c5e87/sweep/mutants-qa.json`). Already unattended in form |
| QA and fixer, mutation sweeps | Scripted (`mutant-gen.js`, `mutation-run.py`, QA's hand-written mutants: conjunct drops, dependency arrays, coupling with `isOpen`) | general-purpose $0.02 | Dependency-array mutants: `fixer-batch-2026-11-21-c` recommendation 2 (sighted) |
| Review, probes and hook probe | Scripted, chain-local under `verification/fix-image-uploader-url/code-review/` | in the reviewer's $4.56 | Covered where they became suite cases. P5's open-dialog case became one only after QAF-4 |
| Devops, post-release walk | A helper walk ($0.12) found a signed-in profile and stopped. Devops then probed signed-out routes and wrote `walk/walk-signedout.js` (clean headless Chrome, GETs and typing only, a write-request counter). Each script needed two edits to find the visible dialog among nine mounted ones | browser-walker $0.12; the rest in devops's post-push $1.99 | `walk-signedout.js` is the second seed for the editor-walk runner with a signed-out profile and a write-request guard (the first batch's recommendation 6). Its visible-dialog selector is the part worth keeping |
| Devops, F-7 focus read | Two reads of `document.activeElement` (at the press and at 400 ms) | in devops's $ | A per-frame sampler (`requestAnimationFrame` from keydown to 200 ms, logging `activeElement` and whether it is inside the dialog) added to the same script reads the 75 ms window unattended. Items for steering, 1 |
| Devops and QA, open-handoff sweep | Devops wrote another python enumeration | in devops's $ | `tools/open-handoff-trigger-sweep.py`, record `INBOX.md` L225-227 |

## Lessons Learned

1. **A claim in the fixer's document is the severity floor's input, and the fixer is the cheapest place to apply it.** Both CR-1 and
   QAF-4 were sentences in the fixer's own document ("still holds after Cancel and reopening"; "a change that arrives while the dialog is
   open replaces the box"). A later gate found each by asking which case fails when the sentence becomes false. Mutation controls of the
   added lines cannot find a lost base behaviour that has no case, and they cannot find a claim no case asserts.
2. **A probe is not an assertion.** The reviewer held P5 and filed the open-dialog sync as INFO. QA held a suite-less behaviour to the
   floor. One rule, read two ways, cost one QA cycle.
3. **A release prompt's context is what the decision needs, not a summary of the chain.** By the relayed remark, the owner needed two
   sentences: what is ready and what it covers. The flows already say what changes. Gate status, the deploy assumption and the residue
   have their own labelled places in the same prompt. The 18:37Z standard ("context first, plain English, no commit IDs") lives only in
   this effort's log and in each brief's hazard line. No definition carries it, so each devops session re-learns its length from a brief.
4. **A handoff owned by a stage that the triggering chain lacks gets read by whoever is there, partly.** F-7's read was cheap and useful,
   but it did not answer its own question. The instrument it needed (frame-level sampling) was one function away in the same script.

## Recommendations (each naming the file it would change)

For pi, on the owner's scheduling.

1. **`~/.claude/agents/fixer.md`** (Workflow step 6, User-visible flows, and the Diagnosis's base-against-fix paragraph). Each flow, and
   each behaviour the document says is kept or changed, names the suite case that fails when it is lost: red at base where the behaviour
   is new, red under a named control where base already had it. A flow no case holds is marked "held by no case" in the line itself.
   This is the severity floor (code-reviewer.md L96-97; qa.md) applied by the fixer to its own claims before hand-off. A brief hazard
   marked "read from code, not run" is answered by such a case or a recorded run. Sighted in this chain: CR-1 (flow 8; brief hazards 2
   and 4) and QAF-4 (the QAF-3 fix text). It is related to `fixer-batch-2026-11-21-c` recommendation 3 (a removal control per consumer),
   which covers consumers of a value, not the document's claims.
2. **`~/.claude/agents/code-reviewer.md`** (Severity floor, L96-97). Add that an assertion means a suite case. A behaviour held only by the
   reviewer's own probe meets the floor, and the probe's case is named as the case owed. Sighted in this chain: CR-5 INFO at Round 2
   (P5), which QA raised as QAF-4 MEDIUM at the next pass.
3. **Lifecycle `references/escalation.md`** ("Ask in the owner's terms") **and `~/.claude/agents/devops.md`** (Phase 2B step 1).
   - Encode the owner's question standard, which today lives only in this effort's log (block 2026-11-21T18:37Z) and in briefs: context
     first, plain English, no commit IDs or branch names.
   - Per his relayed remark, the context is at most two sentences: what is ready and what it covers. The defect is told once, through
     the flows. Gate status, mechanism assumptions and residue each go on their own labelled line, not in the context.
   - This rests on a relayed remark. Steering lodged it at `~/.claude/agents/INBOX.md` L426 and holds that it binds the fleet only once he
     confirms the wording. Pi should take his confirmation first.
   - Sighted in this chain: ledger block 18:35Z, devops.
4. **Record `tools/uat-local-stack.sh`** (the `serve <sha>` verb already asked for in record `INBOX.md`, 2026-11-12 pi-batch item 2).
   Add a fixture image server on loopback with good, 404 and delayed paths, the delay set per path (for example `/slow/1500/a.png`), and
   stop it with the stack. This is the record owner's change. It would let a walk drive load order (flows 2 and 5, limb 3) in a real
   browser, which no walk could do in this chain. Each walk also built the image server by hand three times. Sighted in this chain: QA's
   three walks.

**Sightings of open recommendations, not re-proposed** (each at the path the earlier retrospective names):
- `fixer-batch-2026-11-21-c` 2 (`mutant-gen.js` dependency-array mutants): QAF-1, Batch-level 5.
- `fixer-batch-2026-11-21-c` 6 and record `INBOX.md` L321 (`trpc.batch-refusal` under load): Batch-level 3.
- First batch (`fixes-2026-11-23-steering-hooks-fixer`) 3 (Phase 2D statuses): Batch-level 5.
- First batch 4 and 5 (record-write gate; stamp gate): Batch-level 5.
- First batch 6 (editor-walk runner, signed-out profile): Batch-level 5 and Testing by Hand.
- First batch 7 (Vercel read tool): Batch-level 5.
- Previous batch (`-fixer-2`) 1 (a blocking prompt put from the session it belongs to): done here by devops, Batch-level 1.
- Record `INBOX.md` L225-227 (open-handoff trigger sweep): Batch-level 5.

No handoff is created. No recommendation is for the effort's next chain alone. The next chain on the website tree is plan 019's, a full
chain, and each recommendation above serves every fixer chain equally.

## Cost

Readouts were run at 18:4xZ-18:5xZ, with raw output in `verification/fixes-2026-11-23-steering-hooks-fixer-3/cost/`:
- `chain.txt`: `python3 ~/.claude/tools/cc-usage.py chain fix-image-uploader-url --since 2026-11-23T15:54Z --until 2026-11-23T18:37Z`,
  exit 0. The window is the scoping ruling to the release (push 18:36:07Z).
- `chain-to-closure.txt`: the same command `--until 2026-11-23T18:48Z`, exit 0. It adds the post-release walk and Phase 2D.
- `steering.txt`: the same command for `steering-hooks-fixer`, to 18:37Z, exit 0.

| Session | Requests | $ to the push | $ to closure | Subagents under it |
|---|---|---|---|---|
| `fixer-fix-image-uploader-url` | 165 | 11.13 | 11.13 | none |
| `code-reviewer-fix-image-uploader-url` | 74 | 4.56 | 4.56 | none |
| `qa-fix-image-uploader-url` | 317 | 11.54 | 11.54 | browser-walker 1.73, general-purpose 0.02 |
| `devops-fix-image-uploader-url` | 46 / 104 | 1.67 | 3.66 | browser-walker 0.12 (after the push) |
| **Chain** | 602 / 660 | **28.90** | **30.89** | |

- *Session set and recoverability.* All four sessions resolved from the registry cache, with their live entries gone. None is
  unrecoverable, and no session outside the `*<chain>` and `*<chain>-<n>` forms belongs to the chain. The deweeder that ran beside this
  retrospective (rulings block 18:50Z) is outside both forms and after the window, so it is not counted.
- *Steering, in the window* ($17.06):
  - `[38cf2ba7]`, 15:57Z to the 18:24Z clear: $13.69, with general-purpose-sonnet $0.57 and Explore $0.00 under it;
  - `[51d829bf]`, before the 15:56Z clear: $2.06;
  - `[989cba7f]`, after the clear: $1.30, with general-purpose-sonnet $0.35;
  - `[de89c5c3]` and `[be654015]`, earlier sessions of the same name, $0.00 each, reported out of the chain.

  Most of the $17.06 is not this chain's. It covers plan 019's coordination: five selections (16:29Z to 17:58Z) and the cap blocks
  17:56Z to 18:06Z. It also covers the standing-rulings file (18:30Z). This chain's share is not separable from the readout.
- *$ per added production line.* `git -C website diff --numstat af3d95a 5ec0621` (`numstat.txt`), production paths only, test files
  excluded:

  | File | Added |
  |---|---|
  | `src/components/ImageUploader.tsx` | 33 |
  | `src/utils/hooks/useDialogEnter.ts` | 8 |
  | **Total** | **41** |

  That is **$0.70 per line** on the chain's spend to the push, and $0.75 to closure. Adding the whole steering window gives $1.12, an
  upper bound. The test files added 407 lines.

## Handoff

- **Architect:** the notice is already lodged. Steering put it in record `INBOX.md` L437 (uncommitted, as the inbox-entry skill has it):
  `useDialogEnter` gains `enableOnFormTags`, which touches `system-architecture.md` lines 134 and 222. Whether either line is edited is
  the architect's. Nothing further is owed from here.
- **Items for steering-hooks-fixer:**
  1. F-7 (handoff 017, `Owning-Stage` devops, F-7 owner UAT). Its "next change to `ImageUploader.tsx`" event has happened, and the read
     was partial (What Didn't 4). The handoff's owner may want to say whether the event is spent or still live. A per-frame focus sampler
     added to `verification/fix-image-uploader-url/devops/walk/walk-signedout.js` would answer the 75 ms question signed out, with nothing
     saved, at any time. Escape or Cancel on a delete warning needs the same sampler on a page that raises one.
  2. The owner's remark on prompt length is relayed. Recommendation 3 waits on his confirmation of the wording, which steering's INBOX
     entry already asks for. Until then, this thread's "about two sentences" practice is the thread's own, as its 18:46Z block says.
  3. Test Conventions (record `CLAUDE.md`, DOM component tests) does not say that a test host standing in for a parent passes callbacks
     with the parent's identity behaviour (What Didn't 2). This is the record owner's file. If you agree, it is an inbox entry for that
     session, not a pi item.
- **Roadmap:** nothing cited and none owed.
- **pi:** this document rests at `Active` until pi processes it on the owner's word.
