---
ID: 019
Origin: 019
UUID: 286c730a
Status: Active
Status-Detail: "Written after plan 019's close-out: every stage document terminal and in closed/; website master 5ec0621 to 48eb60a, pushed 2026-11-25T17:39Z. B-5 is carried by handoff/slate-formatting-link-targets-post-deploy-2026-11-25.md, and its reader had not fired when this was written. Resting state until pi runs on the owner's word."
---

# Retrospective 019: Slate formatting on Discord's engine

**Plan Reference**: `agent-output/planning/closed/019-slate-formatting-discord-engine.md` (Revision 26, Released)
**Date**: 2026-11-25
**Retrospective Facilitator**: retrospective (`retrospective-019`, a subagent of `steering-hooks-fixer`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-25T18:22 | steering-hooks-fixer (spawn brief, 2026-11-25, after 18:09Z) | Retrospective of plan 019 from the record alone, with eight candidate items to re-derive | Written. Value delivered: PARTIAL. Twelve recommendations, each naming the file it would change. One handoff seeded for the editor rebuild's planner. The cost readout is filed under `verification/019/retrospective/`. |

## Summary

**Corpus**: This retrospective read the agent-output record at `edb26e10`, plus the files named below.
- **Read by this session:**
  - the plan's header, Decisions Register (D-1 to D-34), M3 and M7 passages, and Planner batch counts;
  - the effort's standing file, read whole;
  - the rulings log, from block "2026-11-23T09:18Z — scoping determination" to the tail ("2026-11-25T18:09Z");
  - the M6 implementation document's Gate-satisfaction sections (Fix Rounds 2, 4, 5 and 6) and its M4 line 319;
  - the headers of every closed 019 stage document;
  - the deployment record's M7 and release passages;
  - the B-5 handoff's and the rebuild sizing document's headers and § Yardstick;
  - `architecture/website.md` (A-9 to A-11) and the Problem Areas rows of `architecture/system-architecture.md`;
  - the steering docket `docket-hooks-fixer.md`;
  - the workspace `CLAUDE.md`.
- **Extracted by five `general-purpose` helpers**, which wrote line-cited files under `verification/019/retrospective/`:
  - the plan (`plan-extract.md`);
  - the critique (`critique-extract.md`);
  - the five implementation documents (`impl-extract.md`);
  - the seven QA documents and UAT (`qa-uat-extract.md`);
  - code review, architecture, analysis and deployment. This helper returned its extract in its reply and did not file it. Its counts that are cited here were re-run by this session: CR totals and the REJECTED count.
- **Outside this corpus**, and so unverifiable-by-construction rather than refuted:
  - rulings given in conversation and not lodged;
  - session transcripts, except where a rulings block quotes one;
  - what any session carried between its own clears;
  - anything about the 1-column tmux pane and the 17:28Z docket `sed` (items 6 and 7 of the brief), which no record document lodges;
  - which permission devops-019's 17:16:39Z prompt asked for.
- **Process facts of this run, lodged in the round:**
  - The stamp gate refused this document's and the handoff's first changelog stamps (18:27, typed ahead of the clock, beside a `18:1x` placeholder). Both were re-stamped through `record-edit.js` `2026-11-25T18:22`.
  - Two helpers met `record-write-gate-hook`. The critique helper's `sed -i` on a scratch TSV named the critique path in the same command. The implementation helper made a Python write to its own extract. Neither was retried in another form: the critique helper did not touch the critique, and the implementation helper made its two edits with the Edit tool.
- The steering brief says six implementation documents. The record holds five (M2 to M6, `grep -l '^Origin: 019' implementation/closed/*`), and M1 was analysis.

**Value Statement**: "As a Hooks user composing a Discord message, I want the editor's colouring and the preview to format every input the way Discord does, and to keep every character I type, paste or load, so that what I build on Hooks is what Discord shows when it is sent." (plan lines 277-278)

**Value Delivered**: PARTIAL.
- **Delivered:**
  - M2 to M6 shipped in one release (D-19). The preview and the editor's colouring run on `@discord/markdown-wasm`.
  - The fuzzer and oracle are in the suite.
  - At the release tip: offline 4,785 of 4,785, exit 0; `pnpm test:discord` 41 of 41, exit 0 (release-tip QA, Status-Detail).
  - UAT walked all nine pre-release flows and approved (`uat/closed/…`, APPROVED FOR RELEASE at `48eb60a`).
- **Not delivered, or not yet known:**
  - The plan's Planner batch holds 124 rows, and 79 of them are not marked discharged (`plan-extract.md` § 5; `sed -n '1870,1993p' | grep -c -v -i discharged`).
  - Under D-33, those rows go unfolded to the rebuild's sizing document.
  - The off-selection and drag members of the iteration-cap class beyond R-129's 24 rows are seam-fold residue (block 09:53Z).
  - The owner chose to rebuild the editor's Slate layer because its design keeps producing that crash class (blocks 15:25Z and 15:36Z).
  - B-5, a production read, is unread at this writing.

**Implementation Duration**: Revision 5 was approved by all three pre-code gates at 2026-11-23T17:32 (plan changelog R-9). UAT was approved at 2026-11-25T16:33Z (block 16:33Z). That is about 47 hours. Implementation started at 18:48Z on 2026-11-23 on Revision 9.

**Overall Assessment**: The chain shipped what its gates measured. It spent 26 plan revisions, 18 critic cycles (26 passes), 26 architect passes, 9 code-review rounds with 9 sub-entries, and seven M6 deliveries to get there.
- About two-thirds of the revisions came after implementation started, and most were scope added by the owner's "fix it too" selections, each recommended by steering (D-21 to D-31).
- Below HIGH, the caps held. A defect class the editor's design generates kept producing HIGH members, which no cap reaches.
- The question that ended the loop, rebuild or keep extending, was raised by the owner at 11:38Z on 2026-11-25. No stage or steering check raised it.
- Once scope was frozen at 15:46Z ("release essentials only"), the chain went from M6 QA to production in 1 h 53 m.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

**Went well**
- **Refutation before prompting worked when it ran.** Several premises were refuted or corrected before he chose:
  - CR-20's "about 2 ms at 35 lines", refuted (block 07:05Z);
  - the paste figures, confirmed (20:07Z);
  - the Outstanding 3 throw being absent in production (05:26Z);
  - the implementer's "as in Discord's own box", refuted by QA's walk on the test server (04:00Z).
- **Steering ruled inside his words instead of re-asking.** Many items were ruled without a prompt, each citing the option text he chose: blocks 17:17Z, 21:38Z, 22:20Z, 04:51Z, 08:17Z, 20:58Z, 22:41Z and 07:09Z. That kept prompts for real product choices.
- **Capped resource use held after it was imposed.** Every OOM kill after block 23:41Z landed inside a 5G scope. No session outside the scope was hit (blocks 01:27Z, 02:57Z and 07:09Z).
- **The scope freeze was fast.** From the 15:46Z waiver to the 17:39Z push took 1 h 53 m: the M7 paragraph, critic cycle 18, UAT's nine walks, devops Stage 1 and QA Phase 3.
- **Errors were lodged in the round, with the check that would have caught each.** Steering's and the implementer's own errors carry that line (for example 09:32Z, 13:09Z, 07:42Z, 09:09Z, 06:14Z, 06:18Z and 15:49Z, and the M6 Fix Round 1 self-diagnosis). That is what lets this retrospective re-derive them.

**Didn't**
- **A design-generated defect class was fixed member by member** (item 8).
  - M6 took seven deliveries (`impl-extract.md` § M6 1a).
  - Code review REJECTED Fix Rounds 2, 3, 4 and 5, on CR-25 and CR-28, both HIGH. The code review changelog has 8 REJECTED rows over the whole chain (`sed -n '20,45p' | grep -c REJECTED` = 8).
  - The research's helper counts the iteration-cap throw class in four of M6's six fix rounds (sizing document § Yardstick, its P4-2, not re-counted).
  - The architecture record already graded "Slate block structure is recognised by hand regexes" as a Low Problem Area (`system-architecture.md`). Its measured consequence was added only at 06:05Z on 2026-11-25.
  - Nothing in steering's standing check or the architect's conformance role asks whether repeated rounds share a design cause. The owner asked it himself (block 11:38Z).
- **Caps governed findings, not scope** (item 8).
  - Standing entry 13 and blocks 17:56Z, 22:35Z and 00:49Z capped below-HIGH gaps. Those caps did divert dozens of findings to stated limits (SL-1 to SL-32, `grep -o 'SL-[0-9]*' | sort -u | grep -c ''` = 30 distinct).
  - Seven of his selections lifted the cap for named items: D-23, D-24, D-25, D-26, D-28, D-29 and D-31.
  - Each recommended option was the fix, by standing entry 2 ("Just fix everything you find along the way").
  - The caps had no lever on the number of milestone-level scope deltas.
  - Standing entry 23 is the 98% weekly usage gate, not a revision cap. It did not bear on the revision count.
- **AC-6.8 was rewritten five times in 37 minutes** (Revisions 16 to 20, plan changelog 07:07 to 07:44 on 2026-11-24).
  - Each revision's literal for Slate's `normalizeNode` dirty-path counts was hand-derived, then found wrong by the next gate (blocks 07:13Z, 07:15Z, 07:21Z and 07:42Z).
  - Revision 20 removed a corpus bound that steering's own block 07:21Z had introduced without an independent basis (block 07:42Z, "this block's author made the defect").
- **Option-text premises were put unread** (item 4). Five corrections in this chain followed his answer:
  - 09:32Z: the researcher's browser restart was this thread's own mechanism.
  - 13:09Z: 37 disagreeing cases, against 33.
  - 06:14Z: the crash premise held only in jsdom; QA's Chrome walk K4 showed otherwise.
  - 06:18Z: the "emoji drawing collapse" was the plan's design.
  - 15:49Z: "five flows", against the register's nine.

  In two of them, the block itself marked the premise unread when the prompt went out. Block 15:46Z says "not re-read in the plan this turn", and block 05:28Z says "the planner's count … not read by this thread". `~/.claude/CLAUDE.md` § "Check what your options say before you ask me" already binds this. The gap is mechanical: an unread premise was allowed into an option.
- **Script-written record files went unanswered across four rounds** (item 2).
  - In M6 Fix Rounds 2, 4, 5 and 6 the implementer wrote its own document's front matter, changelog rows, Resumption State and sections with `python3` heredocs or scripts. Each round disclosed this, and none re-made the writes (M6 implementation lines 526, 823, 960 and 1065).
  - That breaks standing entry 24 and the implementer's brief ("Record documents: Write, Edit or `record-edit.js` only", quoted at line 1065).
  - Steering read the Round 2 disclosure at block 19:20Z and told the owner in chat. At Round 5 (block 09:35Z) it wrote "Recorded here for the 019 retrospective; nothing sent".
  - The Opus switch (item 1) did not change the practice: Rounds 5 and 6 ran mostly or wholly on Opus and did the same.
  - `record-write-gate-hook` refused a `sed -i` in Round 2 but not the heredocs. It did refuse a Python write by one of this run's helpers. The hook's coverage is uneven, as QA (block 02:50Z) and code review (code review line 1464) also recorded. `~/.claude/agents/INBOX.md` already carries the hook sighting (block 19:43Z, lines 93-102).
- **Self-matching waits and kills recurred** (item 3).
  - A `pgrep -f mutation-run.py` wait matched itself and held M5's hand-off for over an hour. Steering's own first check was fooled the same way (block 03:39Z).
  - `pkill -f` matched its own shell twice (M6 Fix Round 1 line 364; Fix Round 2 line 521).
  - A broad `pgrep -f` sent SIGTERM to two foreign processes (block 18:36Z).
  - From 09:09Z to 09:29Z the implementer's waiter watched logs of shards it had already stopped. Steering found it at the 09:29Z check (block 09:35Z).
  - The lifecycle skill already prescribes `wait-pid.py` on a recorded pid. The stall at 09:09Z was a wait on files, which that tool does not cover. The M6 document has no lodging of this stall (`grep -n -i 'waiter\|09:09\|stall'`: no matching passage). Its record is steering's block and an agents INBOX FYI.
- **Mutation sweeps ran uncapped until steering intervened** (block 23:41Z).
  - The kern.log OOM count went from 0 to 8 across blocks 01:27Z, 02:57Z and 07:09Z.
  - The last four kills came from an uncapped-worker suite run inside a capped scope (Fix Round 5 line 958).
  - In Fix Round 6, `--bail` caused 20 ABORTED runs to be re-run (line 1068).
- **A milestone deliverable had no reader until release** (item 5).
  - M7 says "The implementer proposes the text in its implementation document at M3, and steering lands it in the record at release" (plan line 1660).
  - The M3 implementation document holds no such text (`grep -c 'Test Conventions update'` = 0). No M3 gate checked for it.
  - devops-019 found it missing at Stage 1 (deployment record line 109). The text was proposed at 16:51:22Z (`6a9311ef`) and landed at 16:52Z.
- **An owner-wait sat 12 minutes before steering saw it** (item 6).
  - devops-019 had a permission prompt open from 17:16:39Z (registry `waitingFor`). Steering's owner-wait notice went at 17:28Z (block 17:44Z).
  - The deployment record does not mention the prompt (helper extract, "permission": no match), so what it asked and when it closed are unverifiable-by-construction.
  - The release question itself was put at 17:38 and answered at 17:39 (deployment record lines 228-231). The brief's "waited 17:16–17:39Z" is therefore an upper bound on the permission wait.
  - The 1-column pane is the brief's claim only.
- **Steering broke its own record-write rule three times in the record** (item 7). Blocks 05:26Z and 07:09Z each disclose a docket `sed` that the gate refused. The 17:28Z instance in the brief is lodged nowhere in the record, so this retrospective cannot verify it.
- **Closed stage documents still read "awaiting release".** Every M2 to M6 implementation and QA document, the analysis, code review and UAT is closed at `Committed` with Status-Detail "awaiting release". The release that followed did not move them (headers read this session). The deployment record closed 15 documents before the push (line 172).

**The Opus switch (item 1), as the record shows it.** The model boundary is at 2026-11-25T06:37:58Z (block 06:46Z, transcript `a1a65e98`). The round figures:

| Round | Wall time (rulings blocks) | Model | Session cost (inferred from `seen` stamps) | First review verdict |
|---|---|---|---|---|
| Fix Round 2 | 17:12Z to 19:20Z | Sonnet | not separable | REJECTED (CR-25 HIGH) |
| Fix Round 3 | 20:54Z to 22:41Z | Sonnet | $8.31 (`4e1ff191`) | REJECTED (CR-25 time member) |
| Fix Round 4 | 22:56Z to 05:19Z | Sonnet | $12.71 (`38a87473`) | REJECTED (CR-28 HIGH) |
| Fix Round 5 | 06:20Z to 09:35Z | Sonnet 18 min, then Opus | $23.19 (`a1a65e98`) | REJECTED (CR-28's off-selection member, newly found) |
| Fix Round 6 | 09:53Z to 12:27Z | Opus | $12.68 (`779e9595`) | APPROVED_WITH_COMMENTS |

The comparison cannot carry a conclusion:
- Only one and a half rounds ran on Opus.
- Fix Round 6 had the narrowest scope of the six: one member and a 24-row probe.
- Fix Round 5 includes a 20-minute stall and a sweep stopped on the owner's word at 08:17Z.
- The session-to-round mapping is this retrospective's reading of `seen` stamps against the rulings blocks.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

The record states no wall time for any walk, so cost is given in session dollars from the readout's subagent rows. Each segment below is drawn from `qa-uat-extract.md` § 2.

- **QA Phase 1, the `> ` quote probe on the test server**
  - What ran: Discord's rendering read on Shift+Enter and paste (`verification/019/qa/discord-quote-probe/walk.md`, 03:56 to 03:58Z on 2026-11-24).
  - Cost: inside `qa-019` `1b2c4c75`'s browser-walker row, $0.25.
  - How it could run unattended: as a test-server step file for the browser runner. It is a one-off read of Discord, so it is not worth a standing script.
- **QA Phase 1 re-keys on Revisions 21 and 24, the K1 to K4 walks**
  - What ran: `run-K*.js` driven by browser-walker. K4 needed an export, a frozen install, `next build` and `next start` on 127.0.0.1:3107, and the local stack (main QA lines 1494-1502 and 1803-1818).
  - Cost: in `3158170a` ($0.50), `edcac30c` ($0.32) and `b69130eb` ($0.48).
  - How it could run unattended: the scripts exist. UAT ran K1 to K4 again, ten runs for K4 (UAT lines 74-78). That repeat is the case for lifting them into one pinned runner with a pass/fail table (Recommendation 11).
- **QA M6, Chrome paste, drag and caret walks**
  - What ran: `walk/run-paste.js` (six interleaved rounds over two builds), `run-drag.js` with its synthetic variant, and `gt-caret-walk.js` (M6 QA lines 325 and 452-455).
  - Cost: in the same rows.
  - How it could run unattended: the same runner. The paste walk is a timing comparison of two builds, and it needs the runner to take two base URLs.
- **QA Phase 3, the AN-3 re-read at the release tip**
  - What ran: a test-bot post to `#slate-oracle-walk`, then a DOM capture in the stage Chrome. An in-page classifier first read DIFFER, an instrument error from a case-sensitive `/mention/` (release-tip QA lines 98-121).
  - How it could run unattended: the poster and comparator are scripts (`an3-post.py`, `an3-compare.py`). The DOM capture and the classifier belong in the same runner, with the classifier under a planted-control case.
- **UAT, all nine walks (B-1 to B-4, B-7 to B-11)**
  - What ran: three browser-walker runs plus one look of UAT's own. `next build` was run in place, and the local stack came up through `tools/uat-local-stack.sh` (UAT lines 32-78).
  - Cost: UAT's row is $9.33, of which browser-walker is $2.61 over 166 requests.
  - Hand steps:
    - B-1's Firefox limb has a script (`walk/b1-firefox.js`);
    - B-4 needed a hand cookie copy (UAT-2);
    - B-10's first caret attempts by ArrowDown ×999 were discarded (UAT line 88).
  - How it could run unattended: the stack is already a tested recipe (`tools/uat-local-stack.sh` with `tools/uatLocalStack.test.js`). The walks are scripts in the chain's verification tree, not in `tools/`. The B-4 cookie fixture and a caret-placement helper are the two pieces a runner would need.
- **Already covered by a standing suite, so not re-proposed:**
  - the offline fuzzer and oracle (M3);
  - `pnpm test:discord` (D-12, now in the workspace `CLAUDE.md`);
  - the AC-6.8 and AC-6.9 benches;
  - the `MOUNTED_GENERATOR_COUNT=1000` knob that QA Phase 3 ran (95.4 s, release-tip QA line 57).

## Lessons Learned

1. A run of fix rounds whose rejections are members of one defect class is a design signal. It should reach the architect and the owner as "extend or redesign" before the next round, not after the fifth.
2. A per-item cap lift is a scope addition. Caps on findings do not bound a chain whose owner-facing recommendation, under "fix everything found", is always the fix.
3. An acceptance literal that depends on a library's internal behaviour, like Slate's dirty paths, is a measurement. Hand-deriving it cost five revisions in 37 minutes.
4. An option sentence whose premise its own block marks unread is a premise error waiting for his answer. Two of five corrections were flagged unread at the time they were put.
5. A disclosed standing-rule breach that nobody answers becomes the practice. Script writes recurred in four consecutive rounds, across a model switch.
6. A deliverable assigned to a milestone with no gate reading it surfaces at release. The M7 text owed at M3 was found by devops.
7. Waits keyed on process names or files, rather than on the run's own pid or scope, stall or kill silently.

## Recommendations (each naming the file it would change)

Each reaches its stage through pi, on the owner's scheduling.

1. **`~/.claude/agents/steering.md` § Standing check (and the architect's conformance remit in `~/.claude/agents/architect.md`).** When a milestone's second consecutive fix round is rejected on a member of the same defect class, steering commissions an architect design read before the next round starts: does the design generate the class, and what would a redesign remove? Steering then puts "extend or redesign" to the owner. Sighted in 019 M6: Fix Rounds 2 to 5 rejected on CR-25 and CR-28; the owner raised the question himself at 11:38Z.
2. **`~/.claude/agents/planner.md` (acceptance criteria).** A criterion literal that depends on a third-party library's internal behaviour is set from a probe on the real code path, recorded under `verification/<chain>/planning/`, before the gates read it. A literal without such a probe is written as a property, not a number. Sighted in 019 AC-6.8, Revisions 16 to 20.
3. **`~/.claude/agents/steering.md` § Prompting the owner.** An option sentence whose premise the block marks unread ("not re-read", "the planner's count, not read") is not put. Steering reads the premise or drops the sentence from the option. Sighted in 019 blocks 15:46Z and 05:28Z, corrected at 15:49Z and 06:14Z.
4. **`~/.claude/agents/steering.md` § Implementer hand-off read, and `~/.claude/agents/implementer.md`.** A standing-rule breach disclosed in a hand-off is answered at that hand-off read with a correction to the next round's brief. It is never deferred to the retrospective. The implementer re-makes a record write that broke the rule in the permitted form before hand-off. Sighted in 019 M6 Fix Rounds 2, 4, 5 and 6, and block 09:35Z. The hook-coverage half, `record-write-gate-hook` seeing script rewrites, is already lodged in `~/.claude/agents/INBOX.md` (lines 93-102), so it is named here, not re-proposed.
5. **`~/.claude/agents/planner.md` (milestone exit criteria) and `~/.claude/agents/steering.md` (milestone-done read).** A record-update text a milestone owes is an exit criterion of that milestone, read by its code review or by steering's milestone-done read, by path. Sighted in 019 M7's "proposes the text … at M3" (plan line 1660), found missing by devops at Stage 1.
6. **`~/.claude/tools/wait-pid.py` (or a sibling tool) and `~/.claude/agents/implementer.md`.** Add a wait that keys on a run's own systemd scope or recorded pids and exits when they are gone. The implementer's definition then cites it for waits on sharded runs, so no wait keys on log files or process names. Sighted in 019 blocks 03:39Z, 18:36Z and 09:35Z, and M6 Fix Rounds 1 and 2.
7. **`~/.claude/tools/mutation-run.py` (defaults and docstring).** Default to one worker per mutant run, and refuse to start outside a MemoryMax scope unless a flag names the ceiling. Reject `--bail`, which the runner's count rule turns into ABORTED rows. Sighted in 019 blocks 23:41Z, 01:27Z, 02:57Z and 07:09Z, and M6 Fix Round 6 line 1068.
8. **`~/.claude/agents/steering.md` § Standing check.** Read every chain session's registry `waitingFor` at each check, and send the owner-wait notice at first sight with the prompt's open time. Sighted in 019 at 17:16:39Z to 17:28Z (block 17:44Z).
9. **`~/.claude/agents/devops.md` (release closure).** Documents devops closes at `Committed` before the push are re-stated `Released` after it, or their Status-Detail drops "awaiting release". Sighted in 019: every M2 to M6 implementation and QA document, plus the analysis, code review and UAT documents.
10. **`~/.claude/agents/steering.md` § Standing check (scope).** When the owner chooses to replace a design, as in block 15:36Z, steering offers a "release essentials" freeze for the running chain in the same turn. Sighted in 019: the rebuild was chosen at 15:36Z and the freeze came from the owner at 15:46Z. It was the chain's fastest stretch.
11. **`agent-output/tools/` (a new pinned browser runner) with `~/.claude/agents/qa.md` and `~/.claude/agents/uat.md`.** Lift the chain's walk scripts (`run-K*.js`, `run-paste.js`, `run-drag.js`, `b1-firefox.js`, `gt-caret-walk.js`) into one runner. It takes a step file and one or two base URLs and writes a pass/fail table under `verification/<chain>/`. A tested cookie fixture (UAT-2) and a caret-placement helper come with it. Sighted in 019: QA Phase 1 and UAT walked K1 to K4 separately.
12. **For the editor rebuild alone:** `handoff/slate-editor-rebuild-retrospective-019-seeds-2026-11-25.md` (Owning-Stage planner). It carries the class-recurrence trigger, probe-first literals and the walk scripts' reuse into the rebuild's plan.

## Cost

Readout: `python3 ~/.claude/tools/cc-usage.py chain 019 --since 2026-11-23T09:18Z --until 2026-11-25T17:39Z`. Raw output: `verification/019/retrospective/cost-readout.txt`.
- **Session set:** 59 sessions in the `*019` family, all resolved from the registry cache, none unrecoverable.
- **Total:** $804.59 over 9,477 requests.
- **Zero-request rows:** two sessions, `code-reviewer-019 [c354f307]` (seen 15:27Z) and `critic-019 [5c544e0c]` (seen 15:58Z), have no usage inside the window.
- **Subagent usage** is filed under its parent rows: QA's browser-walker and helpers; UAT's browser-walker ($2.61); devops' `general-purpose-sonnet` ($2.13); the planner's `analyst` subagent ($6.26, AN-9).
- **By role** (sums of the family's rows, script output in `role-sums-and-researchers.txt`):

| Role | Sessions | Requests | $ |
|---|---|---|---|
| critic-019 | 7 | 541 | 233.51 |
| implementer-019 | 18 | 2,921 | 148.52 |
| qa-019 | 10 | 1,928 | 130.32 |
| planner-019 | 8 | 1,481 | 116.87 |
| code-reviewer-019 | 7 | 1,045 | 79.10 |
| architect-019 | 4 | 669 | 48.43 |
| analyst-019 | 2 | 374 | 27.51 |
| devops-019 | 2 | 236 | 11.03 |
| uat-019 | 1 | 282 | 9.33 |

The critic is 29% of the family's spend over 26 passes, most of them delta reads of one-limb revisions. Its sessions report a `claude-fabl` model, which comes to about $0.43 per request, against about $0.07 for the Opus rows.

**Outside the family**, with the same window bounds:
- `steering-hooks-fixer`: $106.47 over 331 requests (`steering-cost-readout.txt`). It also carries the fixer chains 9c, 9f and 9e, which ran inside the window (blocks 08:55Z, 15:55Z and 18:48Z on 2026-11-23).
- `researcher-slate-formatting-oracle`, pre-plan: $143.55.
- `researcher-slate-editor-design`: $63.80.
- `steering-coordinator` is not read.

**$ per added production line: not computed.** The brief bars this run from running anything against the website. The record has no production-path `git diff --numstat` for `5ec0621..48eb60a`. The deployment record gives 98 commits and 166 files with no line counts (line 58). The sizing document's M6-only figure, 3,199 lines added under `src` (`2e36107..48eb60a`), includes test files, so it is not a production count. The figure is owed by a session allowed to run `git -C website diff --numstat 5ec0621 48eb60a` over production paths.

## Handoff

- Recommend next: the architect. The Problem Area "Slate block structure is recognised by hand regexes" is still graded Low, while it drove M6's fix rounds. Its re-grade belongs in `architecture/system-architecture.md`, beside the four limbs the architect's record-INBOX entry already carries.
- Seeded in this run: `handoff/slate-editor-rebuild-retrospective-019-seeds-2026-11-25.md`.
- Owner-needing items go back to `steering-hooks-fixer` in this run's report. They are not written here as decisions.
