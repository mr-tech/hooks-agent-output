---
ID: n/a
Origin: fixes-2026-11-23-steering-hooks-fixer-2
UUID: 70e87412
Status: Active
Status-Detail: "Fixer-batch retrospective over one chain, fix-normalize-fence-loop (9c with 9f riding; released website af3d95a 2026-11-23T15:24Z); awaiting pi on the owner's word."
---

# Retrospective (fixer batch fixes-2026-11-23-steering-hooks-fixer-2): fix-normalize-fence-loop

**Plan Reference**: none (fixer chain). The chain's fixer document is `implementation/closed/fix-normalize-fence-loop-implementation.md`
(UUID a0de90fd, `Released`).
**Date**: 2026-11-23
**Retrospective Facilitator**: retrospective (`retrospective-fixes-2026-11-23-steering-hooks-fixer-2`, a subagent of `steering-hooks-fixer`)

This batch holds one chain. It runs on its own because its code review took a REJECTED round (Round 1), and none of this thread's
fixer chains is in flight. The previous batch (`retrospectives/fixes-2026-11-23-steering-hooks-fixer-retrospective.md`, record
`144ba18`, still `Active`, so pi has not processed it) is not re-covered. Where one of its recommendations recurs here, it is named
as a further sighting and not re-proposed.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T15:37 | steering-hooks-fixer (spawn brief) | Fixer-batch retrospective over `fix-normalize-fence-loop` | Created. The chain delivered both defects to production. Stage time from determination to QA PASS was 1h12m, and the REJECTED round cost about 12 minutes. The chain then waited 5h10m: 3h05m with QA's PASS cue held behind a blocking prompt in the steering thread on another effort, and 2h05m on the owner's release answer. Chain sessions cost $27.94 for 68 production lines ($0.41 per line). Two new recommendations; six sightings of open recommendations; four items for steering. |

## Summary

**Corpus.**
- *Read first:* `architecture/system-architecture.md` and `architecture/website.md`, by grep for the touched files. No passage names the
  loader, normaliser, flattener or fence rule, which agrees with the code review's "Architecture Alignment". `roadmap/` holds only
  `.gitkeep`, so no epic is cited.
- *Read whole, by me:*
  - the four chain documents in `closed/`: implementation, code review, QA Phase 2 and deployment record;
  - the Phase 3 record `qa/closed/website-af3d95a-release-tip-qa.md` (frontmatter, changelog, scope, step 1b);
  - `steering/fix-normalize-fence-loop-rulings.md`, every block, and the five briefs `steering/fix-normalize-fence-loop-brief-*.md`;
  - the effort rulings `steering/fixer-queue-2026-11-21-rulings.md`, blocks 2026-11-23T08:15Z to 15:29Z;
  - `steering/selection-ledger/2026-11-23.md`, from block 08:54Z to the end;
  - this thread's docket, lines 1-45 and 90-102;
  - `~/.claude/agents/steering.md`, lines 95-100 and 326-340;
  - `~/.claude/agents/INBOX.md`, lines 330-380;
  - record `INBOX.md`, lines 225-227;
  - `TODO.md`, lines 228-235.
  All were read at 15:1xZ-15:3xZ.
- *Instruments:*
  - `git -C website diff --numstat 0411d3b af3d95a` and `git log 0411d3b..af3d95a`;
  - `git merge-base --is-ancestor af3d95a origin/master` (exit 0);
  - `cc-usage.py chain` for the chain and for the steering thread, captured under
    `verification/fixes-2026-11-23-steering-hooks-fixer-2/cost/`;
  - `grep -c` over plan 019.
- *Not read:* the evidence files under `verification/fix-normalize-fence-loop/`. Load-bearing numbers are cited from the stage
  document that recorded them, and I did not recompute them.
- *Cannot read:* SendMessage traffic. So I do not know when a cue was sent, only when the receiving stage recorded acting on it.
- *Unverifiable by construction:* the brief names "the coordinator exchange about prompt form". The record carries effort block 09:30Z
  ("Asked why the two Slate questions came as a plain message ... he said: 'That rule is overridden. You are meant to prompt me.'") and
  docket line 98. Grep for that exchange over `steering/`, record `INBOX.md` and `~/.claude/agents/INBOX.md` finds nothing else. Any
  further exchange happened in conversation and is outside this corpus.

**Value Statement** (the scope statement, rulings block 08:55Z, abridged):
1. A quote line plus a code fence with no language settles on normalise and accepts a typed character at every position, in every
   full-markdown editor.
2. A stored message holding `>>> ` loads and saves unchanged, in full and partial editors, and opening or leaving a box writes no
   changed text.
3. The two together settle, and the dead `>>> ` test is made live or removed.

**Value Delivered**: **YES** at its scope. The deployment record is the authority, re-read at 15:3xZ. Production deployment
`567m70ejp` was Ready 2 s after the push. The post-deploy walk on hooks.gg passed both limbs on the production bundle: a keystroke was
kept with 0 normalise errors, and `>>> a\nb` was unchanged after open and leave. Named residues:
- Messages already saved with a rewritten `>>>` are not restored, and the original text cannot be recovered. That check is the owner's.
- Whether opening a box without saving persisted the rewrite on the server was not traced. Only the fixer's Diagnosis carries it.
- A quote line taken into a new code block loses its `> `. The defect is the same at base and rides row S-29, and QAF-4 widens its
  trigger.

**Implementation Duration**: 2026-11-23T08:53Z (determination) to 15:24:11Z (push), **6h31m**. No UAT is in the stage set, and the last
QA Phase 2 verdict was at 10:05Z (1h12m after determination).

| Segment | From | To | Elapsed |
|---|---|---|---|
| Determination and re-sweep | 08:53 | 08:55 | 2m |
| Fixer to first hand-off (`d3b98cf`) | 08:56 | 09:15 | 19m |
| Review Round 1, REJECTED | 09:19 | 09:27 | 8m |
| Round 1 fix (`61e5dfe`) and sub-entry 1b, APPROVED | 09:27 | 09:39 | 12m |
| Write-set ruling, QA Phase 2 to PASS (`af3d95a`) | 09:40 | 10:05 | 25m |
| **QA PASS cue held** behind steering's open prompt (put ~09:41Z, answered 13:09Z; effort block 13:09Z) | 10:05 | 13:10 | **3h05m** |
| Devops Stage 1, Phase 3, release ask put | 13:10 | 13:18 | 8m |
| **Owner's release answer** (ledger block 15:23Z, devops) | 13:18 | 15:23 | **2h05m** |
| Move, Vercel read, walk, Phase 2D | 15:24 | 15:29 | 5m |

**Overall Assessment**: the stages were fast and every gate added a real catch. The review's differential found a class the fixer's
bare-fence evidence could not see (CR-1), and the fix converged in one sub-entry. QA executed the review's open assumption in both a DOM
harness and a real browser. It added a second, differently shaped differential and closed its mutation survivors with specs. Devops
discharged QA's assumption on the production bundle. 79% of the elapsed time (5h10m of 6h31m) was waiting. The larger wait, 3h05m, was the record's
own doing: a blocking prompt on a different effort held this chain's PASS cue. It came 11 minutes after the owner overrode the steering
rule that exists to prevent this.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Batch-level reads first

1. **Work queued behind a prompt.** At 09:30Z the owner overrode steering.md's plain-message rule: "That rule is overridden. You are
   meant to prompt me." That rule sends a question as a plain message while another chain this thread steers can still move (effort
   block 09:30Z; steering.md L330-336). At about 09:41Z the thread put a blocking selection prompt on the Slate effort: the formatter
   standard and use-or-test. It stayed open until 13:09Z, and "the fence-loop QA PASS cue waited behind it" (effort block 13:09Z, this
   thread's own lodging). QA committed its PASS at 10:05Z, and devops was spawned about 13:10Z (docket item 2). The question had nothing
   to do with this chain.

   Compare devops's release ask, which devops put from its own session at 13:18Z (deployment record, runbook step 4). The steering
   thread stayed free meanwhile, and put its own 13:5xZ prompt alongside it. The owner answered both in the same minute, 15:23Z (ledger).
   A question put from the session it belongs to blocks only that session.
2. **Work queued behind a tree.** None this batch. The website tree was free at 08:48Z, and the switch took the coordinator's go
   (effort blocks 08:48Z, 08:55Z).
3. **Chains contending for one box.** None between chains. QA's two `next dev` servers did not stop on SIGINT, nor on SIGTERM to their
   outer groups. SIGTERM to the `timeout` process groups stopped them (QA document, real-browser walk). The dev-server-of-a-SHA
   recipe in `fixes-2026-11-21-steering-hooks-4-retrospective.md` recommendation 6 covers this. It is sighted again here.
4. **The same question reaching the owner more than once.** None in this chain. Effort block 09:32Z records a near-miss on the Slate
   effort. An option asked him to restart the researcher with the browser, though that mechanism was the thread's. The thread lodged it
   as its own error, with the check that would have caught it.
5. **The same finding in more than one chain.** Each item below was already raised by an earlier batch and is still unprocessed. Each is
   sighted again here:
   - *Record documents written by shell, disclosed.* The reviewer wrote its sub-entry 1b by a Python script fed through a heredoc, and
     `summarise.py` by heredoc (code review, sub-entry 1b, last bullet). Devops used `sed -i` on the Phase 3 `Status-Detail` (deployment
     record, Closing (2)). Neither disclosure says the gate fired. That is the previous batch's recommendation 4.
   - *Typed stamps.*
     - Devops's three stamps were refused by the stamp gate and restamped (deployment record, row 13:15).
     - The reviewer stamped its Round 1b row 09:40 from "a 09:38 clock read plus the expected write time", and the commit landed
       09:39:48Z. `check-repo.js` caught it, not the gate, and steering corrected it at 15:32 (code review changelog).
     - Steering's own heading was typed 09:18Z, ahead of the clock (effort block 09:17Z).

     That is the previous batch's recommendation 5.
   - *Vercel CLI hangs.* The first `vercel ls` and one earlier run hung at `timeout 60`, and `inspect` named no built-from commit
     (deployment record, runbook step 8). That is the previous batch's recommendation 7.
   - *Post-deploy walk in a signed-in profile* where the brief asked for signed out (deployment record, runbook step 9 and Closing (3)).
     The same happened in the previous batch's chain 5. That is the previous batch's recommendation 6, whose runner has a signed-out
     option.
   - *No open-handoff trigger sweep tool.* QA's Phase 3 wrote `verification/fix-normalize-fence-loop/qa/phase3/handoff-trigger-dump.py`,
     and devops wrote its own read-only enumeration (deployment record, Phase 2A). Both say the record has no
     `tools/open-handoff-trigger-sweep.py`. The ask is already in record `INBOX.md` L225-227, and an earlier retrospective made it
     (`fixer-batch-2026-11-21-retrospective.md` L200).

### Went well

1. **Re-sweep at the current tip before the determination.** The original sweep at `132a7ab` predated the emoji chain's edit of
   `withNormalizeNode.ts`. Steering re-ran it at `0411d3b` with a separate refutation helper before any stage started (chain block
   08:53Z). It also put the 9c/9f interaction to the owner as a choice: "each fix affects the other's testing" (ledger 08:54Z). Hazard 3
   (the interaction) reached the review as its first item.
2. **The REJECTED round converged in one sub-entry, as a class.**
   - CR-1 came from the reviewer's 20-atom differential with positive controls at base (code review, Evidence process). The fixer
     replied with the reviewer's preferred remedy, one fence rule (`codeFence.ts`) for both callers, 4 minutes after the verdict
     (09:27 → commit 09:31:25Z).
   - The fixer checked the new rule against the old loader with a loader-identity run over 8,420 inputs, byte-identical, with a mutant
     control that differs on 182 lines.
   - The reviewer re-attacked with its unchanged Round 1 instruments. With or without the quote guard: 0 loops and 0 update passes on
     load.
3. **Corrections were lodged as reconcile notes, with a class sweep.** The fixer's two wrong claims both survive in its Diagnosis with
   dated notes, and the claims list carries `grep -n "alone"`. The claims were "Either limb alone ends the loop" and "the closing-fence
   branch is unchanged".
4. **QA executed the review's assumption and added a differently shaped instrument.**
   - QA wrote a mounted-editor suite case. It was 7/11 red at base and red under an instrument mutant.
   - QA ran a real-browser walk of tip against base, each with a discriminating control.
   - QA ran a seeded random-text differential (3,000 texts, 15,480 edits) shaped differently from the reviewer's atom corpus. It
     reproduced, independently, that the language limb alone now ends the loop.
   - The mutation sweep (`mutant-gen.js --range` plus QA mutants) left 10 survivors. QA closed them with specs or recorded them as
     equivalent: 43 killed and 5 equivalent of 48.
   - QAF-4 (346 edits) was routed to S-29 rather than held against the verdict.
5. **Out-of-scope findings went to a carrier, not into the fix.** The fixer's quote-into-code finding went to steering before it was
   coded, and steering placed it as S-29 in the Slate effort's inventory within 4 minutes (implementation changelog 09:15 → 09:19).
6. **Devops closed the loop on production.** QA's Assumption Not Checked (production bundle against `next dev`) became runbook step 9.
   It ran in the release session, so no handoff was owed. Phase 2D brought every chain document to `Released`. That is the previous
   batch's recommendation 3, done here.
7. **The release ask met the owner's 18:37Z standard.** It opens with the context, quotes the six flows in plain words, has no commit
   IDs, and gives the rollback form and the unrecoverable residue (ledger 15:23Z, devops).

### Didn't

1. **The QA PASS cue sat for 3h05m behind an unrelated blocking prompt.** See Batch-level 1. The owner's 09:30Z override is his ruling
   and is not in question here. The gap is that steering.md has no form for "prompt him always" that keeps the thread free to route
   cues for a chain in flight. Devops's own-session release ask shows such a form already working. The thread recorded the wait in the
   round (block 13:09Z), and no remedy was written.
2. **The REJECTED round traces to a scope-less premise carried from the brief.** Brief-common hazard 1 reads "Either limb alone ended the
   loop in the probes". The probes were of a bare fence only (chain block 08:53Z), and the sentence does not carry that scope. The fixer
   restated it as a fact of the code ("Either limb alone ends the loop", Diagnosis L46). The fixer's evidence was mutants and probes over
   bare-fence inputs, with no differential before hand-off. The reviewer's first differential found info strings outside
   `[A-Za-z0-9-]*` (`c++`, `` js``), where only the guard held the loop shut (CR-1). It also found a form new at the fix,
   `` ```a``` `` inside a `js` block (CR-1(b)).
   - The round was cheap: about 12 minutes, one sub-entry.
   - The previous batch's recommendation 1 asks for a pre-hand-off differential in editor-grammar fixer chains. This is its fourth
     sighting, and the first editor chain since that recommendation. Its recommendation 9 asks that each brief premise carry its read.
     `claims.md` already says "A claim verified within a scope carries the scope in its own sentence". The brief did not apply it.
   - Neither recommendation is re-proposed.
3. **Two forward items have no carrier beyond the fixer's closed document.** The deployment record lists both: "uncarried beyond that
   document" and "the owner's to check".
   - *Not traced:* whether opening a box without saving persisted the `>>>` rewrite on the server.
   - The residue of messages already rewritten.

   The residue is production data and the owner's. The persistence question can be read from code. It sits in the Slate effort's
   region and has no inventory row.
4. **Plan 019, which mirrors this chain in M6, does not carry QAF-4.** Effort block 15:23Z says QAF-4 "widens [S-29's] trigger", and the
   devops brief says steering carries it "into that effort's planner brief". `grep -c "QAF-4\|346\|random-differential\|wider trigger"`
   over `planning/019-slate-formatting-discord-engine.md` gives 0. The plan is uncommitted and live at 15:3xZ, so this read may be
   overtaken. The plan's S-29 row (line 117) cites S-29 as "a fence typed above a quote", the narrower trigger.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

No UAT is in a fixer stage set. Costs are the subagent rows of the readout (Cost, below).

| Segment | Done by hand | Cost on record | How it could run unattended |
|---|---|---|---|
| QA, real-browser walk | Two `next dev` servers stood up by hand from `git archive` exports of `58b688f` and base `0411d3b` (ports 3000, 3001, `.env.local` symlinked, key names and loopback hosts read only). A `browser-walker` drove set-JSON, open/leave, click, End, keypress and read-back. The first click landed on the wrong line and was retried. The servers needed process-group kills | browser-walker $0.46 | The dev-server-of-a-SHA recipe (`fixes-2026-11-21-steering-hooks-4` recommendation 6, sighted again) plus the editor-walk runner (previous batch's recommendation 6). Both are named, not re-proposed. This chain's two steps (`> a` + bare fence + keystroke; `>>> a\nb` open/leave) are ready-made step files for that runner |
| QA, mounted-editor check | Nothing by hand. Now a suite case, `SlateEditor.opening-writes-stored-text.test.tsx` | in QA's $10.62 | Covered by the standing suite |
| QA, random differential | Scripted (`probe.random-differential.test.tsx.txt`, seeded), but chain-local | in QA's $10.62 | A seed for the Slate effort's fuzzer deliverable (effort block 09:18Z) and the `TODO.md` instrument-lift item. See items for steering, 2 |
| QA, mutation sweep | Scripted (`mutant-gen.js`, `mutation-run.py`, a Haiku helper) | general-purpose $0.01 | Already unattended |
| Review, differential and fence probe | Scripted; 20-atom corpus, chain-local under `verification/fix-normalize-fence-loop/code-review/` | in reviewer's $4.52 | Same as the random differential: a seed |
| Devops, post-deploy walk | A `browser-walker` on hooks.gg production ran the same two steps. The profile was signed in, against the brief. The first runs lost their route listeners, so the abort was attached late and not re-verified | browser-walker $0.37 | The editor-walk runner with a signed-out profile. The same step file as QA's walk would serve both stages |
| Devops and QA Phase 3, open-handoff sweep | Each wrote its own enumeration of `handoff/*.md` triggers | in their sessions | `tools/open-handoff-trigger-sweep.py`, already asked in record `INBOX.md` L225-227 |

## Lessons Learned

1. **A blocking prompt is put from the session the question belongs to.** In this chain the release ask did that and blocked nothing. The
   steering thread's prompt on another effort held a chain for three hours.
2. **A premise verified on one input form carries that form into every brief that restates it.** "Either limb alone" was true of the bare
   fence, and it travelled scope-less from probe to brief to diagnosis until a differential refuted it.
3. **A differential with a positive control at base settles a rewrite fast.** Round 1b took 12 minutes because both parties had
   instruments, a loader-identity corpus and the reviewer's unchanged differential, that compared base with fix. Neither had to argue
   from cases.
4. **A chain that mirrors into a live plan hands over its widened findings explicitly.** The handover routed QAF-4 by brief wording, and
   the plan written next did not pick it up.

## Recommendations (each naming the file it would change)

For pi, on the owner's scheduling.

1. **`~/.claude/agents/steering.md`** (Prompting the owner, L328-336). His 09:30Z ruling puts every question to him as a selection
   prompt. Steering.md could add that, while a chain this thread steers is in flight, a question belonging to another effort's stage is
   put by that stage's own session, the way devops puts its release ask. The reply is then relayed to this thread. Where this thread
   must ask in its own session, the in-flight chain's next cue is acted on first, or the prompt is held until the cue lands. This would
   keep his "always prompt" ruling and remove the 3h05m class. Sighted in this chain, effort blocks 09:30Z and 13:09Z. The 09:41Z
   questions were the researcher's open questions OQ-1 and OQ-4, so this needs no exception to his rule. The same ruling bears on
   `fixes-2026-11-21-steering-hooks-4-retrospective.md` recommendation 5, which is still unprocessed. That recommendation would make the
   prompt gate refuse a selection prompt while a stage session is live, and as written it runs against his 09:30Z override. Pi should
   weigh the two together.
2. **`~/.claude/agents/steering.md`** (closure of a chain whose area has a live plan) and **`devops.md`** (Phase 2D step 5c). Where a
   released chain's forward items ride another effort's inventory or plan, steering confirms at closure that each item, with its
   widened trigger, appears in that plan or its brief. The check is a `grep -c` named in the closing block. Brief wording alone is not
   enough. Sighted in this chain: QAF-4 against plan 019 M6 (What Didn't 4).

**Sightings of open recommendations, not re-proposed** (each at the path the earlier retrospective names):
- Previous batch 1 (fixer differential for editor-grammar fixes): What Didn't 2.
- Previous batch 4 and 5 (record-write gate; stamp gate): Batch-level 5.
- Previous batch 6 (editor-walk runner, signed-out profile): Testing by Hand.
- Previous batch 7 (Vercel read tool): Batch-level 5.
- Previous batch 9 (brief premises carry their read): What Didn't 2.
- The open-handoff trigger sweep (record `INBOX.md` L225-227): Batch-level 5.

No handoff is created. Neither recommendation is for the effort's next chain alone. The next chain in the effort's order is 9e
`fix-image-uploader-url`, outside the editor.

## Cost

Readouts, run 15:3xZ, raw output in `verification/fixes-2026-11-23-steering-hooks-fixer-2/cost/`:
- `chain.txt`: `python3 ~/.claude/tools/cc-usage.py chain fix-normalize-fence-loop --since 2026-11-23T08:53Z --until 2026-11-23T15:31Z`,
  exit 0;
- `steering.txt`: the same command for `steering-hooks-fixer`.

The window ends at 15:31Z, after the push at 15:24:11Z, so it covers devops's Phase 2D closure (record commit `a9c5ea0e`, 15:30:39Z).

| Session | Requests | $ | Subagents under it |
|---|---|---|---|
| `fixer-fix-normalize-fence-loop` | 126 | 9.53 | none |
| `code-reviewer-fix-normalize-fence-loop` | 71 | 4.52 | none |
| `qa-fix-normalize-fence-loop` (Phase 2 and Phase 3) | 194 | 11.09 | browser-walker 0.46, general-purpose 0.01 |
| `devops-fix-normalize-fence-loop` | 97 | 2.80 | browser-walker 0.37 |
| **Chain** | 488 | **27.94** | |

- *Session set and recoverability.* All four sessions resolved from the registry cache, with their live entries gone. None is
  unrecoverable, and none outside the `*<chain>` and `*<chain>-<n>` forms belongs to the chain.
- *Steering, in the window* ($21.32):
  - `[be654015]`, until the 09:21Z clear: $11.04.
  - `[51d829bf]`, after it: $10.28.
  - `[de89c5c3]` (seen 2026-11-22T07:57Z): an earlier session of the same name, $0.00, reported out of the chain.

  Most of the $21.32 is not this chain's:
  - the previous batch retrospective ($2.92) and its deweeder ($1.17), both under `[be654015]`;
  - the Slate effort's scoping, inventory, research, architect and planner coordination (effort blocks 09:07Z-15:29Z).

  The share that is this chain's is not separable from the readout.
- *$ per added production line.* `git -C website diff --numstat 0411d3b af3d95a`, production paths only, test files excluded:

  | File | Added |
  |---|---|
  | `slate.d.ts` | 4 |
  | `codeFence.ts` | 20 |
  | `flattenNodeText.ts` | 1 |
  | `getInitialValue.ts` | 11 |
  | `withNormalizeNode.ts` | 32 |
  | **Total** | **68** |

  That is **$0.41 per line** on the chain's own spend. Adding the whole steering window gives $0.72, an upper bound.

## Handoff

- **Architect:** nothing owed. No architecture passage names these files (code review, Architecture Alignment; grep above).
  `codeFence.ts` is now the editor's one fence rule. The Slate effort's architect findings, not this chain, are where an entry would
  belong.
- **Items for steering-hooks-fixer:**
  1. Plan 019 M6 does not carry QAF-4 (346 of 15,480 edits, the wider trigger), per `grep -c` = 0 at 15:3xZ on the uncommitted plan. Its
     S-29 row states the narrow trigger. Relay this to `planner-019` while it is live (What Didn't 4).
  2. This chain's three differential drivers could seed the Slate effort's fuzzer and the `TODO.md` instrument-lift item (L228-235). The
     item names only `verification/fix-decorator-offsets/`. The drivers are:
     - the reviewer's 20-atom corpus and fence probe, under `verification/fix-normalize-fence-loop/code-review/`;
     - QA's seeded random differential, `qa/probe.random-differential.test.tsx.txt`;
     - the fixer's loader-identity driver, `round1b/probe.loader-same.test.ts.txt`.

     Naming them there is the TODO item's owner's and the planner's.
  3. The untraced question (does opening a box without saving persist the `>>>` rewrite on the server?) has no carrier beyond the
     fixer's closed document. It lies in the Slate region, so on block 09:18Z's rule it is in scope there by your ruling, if you add it
     as an inventory row (What Didn't 3). The residue of already-rewritten messages stays the owner's, as the release ask told him.
  4. Recommendation 1 rests on his 09:30Z override. If you take it up before pi runs, it is a change to how you put questions, and it
     keeps to his rule. Whether to tell him is yours.
- **Roadmap:** nothing cited and none owed.
- **pi:** this document rests at `Active` until pi processes it on the owner's word.
