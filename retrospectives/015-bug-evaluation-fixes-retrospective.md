---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "Written after chain 015's closure (rulings block 22:24Z). Awaits pi, which runs on the owner's word only. Nothing is owed by this document in the meantime."
---

# Retrospective 015: Bug-evaluation fixes

**Plan Reference**: `agent-output/planning/closed/015-bug-evaluation-fixes.md` (Revision 29, Status Released, last touched by `2e11427`)
**Date**: 2026-11-08
**Retrospective Facilitator**: retrospective (retrospective-hooks-015, run as steering-hooks-015's subagent)

## Changelog
| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T22:32 | steering-hooks-015 | Retrospective after chain closure (critique `85ae3e7`, analyses `ea9a824`, architecture findings `dfd42a6`, security audit `65f8322`) | First write. Covers the corpus, value, timeline, the steering error record, the cost readout and 14 recommendations, each naming the file it would change. No handoff minted. |

## Summary

**Corpus.** *Read here:* the rulings file `steering/015-rulings.md` (68 blocks, read whole); the plan; the UAT document and the deployment record (read whole or in the sections cited); the D39 analysis (sections cited); `architecture/system-architecture.md`, `preview-image-generator.md` (P-3) and `website.md` (headings); the chain's handoffs (headers); and the two chain-015 entries in `~/.claude/agents/INBOX.md` named in the brief. *Read for this document by four helper subagents (Haiku), with their counts spot-checked here:* the nine critiques, the code-review document, the twelve QA documents and the ten implementation documents. I re-ran six of their figures at the source: D-entries 40, plan `Revision: 29`, review rounds 21, unique QAF IDs 42, unique CR IDs 42, R-rows 30. All six agreed. Their qualitative summaries are their reading, and each passage cited below names its source document. *Absent:* no roadmap exists. `roadmap/` holds only `.gitkeep`, so there is no epic to measure value against, and none is cited. *Outside this corpus, so unverifiable-by-construction and not refuted:* rulings or corrections given only in conversation and never lodged; anything a stage session held when it was stopped at 22:2xZ but did not write down (steering did not check this); defects corrected before any document recorded them; the contents of steering-coordinator's messages (the rulings file says they "are not re-read here", block 19:50Z); and session transcripts.

**Value Statement** (plan, verbatim): "As a **community leader building Discord messages in Hooks.gg**, I want the defects the 2026-11-08 bug evaluation found in the editor, the save path, the bot and the preview service fixed, so that **what I build is what saves, what sends and what the preview shows** — a black embed saves, a Cancel key press never deletes, a multi-line code block renders, a moderator with Manage Server can use *Get Message*, and a user who administers no server can open the message list."

**Value Delivered**: PARTIAL, with one item still owed and nothing failed. Four of the five named outcomes were seen in a running build, and each was red at base: code block (B-5), black embed (B-2), no-admin message list (B-1, tip limb), and Cancel, which was already true per D30. The fifth, *Get Message* for Manage Server (B-6), shipped in code but becomes visible only after the owner runs `push-commands`. It is carried by `handoff/bug-evaluation-fixes-post-deploy-2026-11-08.md`. The generator's drain shipped and was observed idle (B-8 PASS). That record is the authority for these rows, re-read at 22:3xZ.

**Implementation Duration**: 15 h 36 min. It runs from implementation start, when every pre-code gate had approved rev 7 (rulings 05:50Z), to UAT complete (21:26Z). Release followed at 22:13Z.

**Overall Assessment**: the chain delivered what it promised, and its gates found real defects. Review caught one HIGH that was pre-existing on master (CR-12, a cross-guild read), and the owner pulled it into the chain. QA's mutation sweeps turned up 7 test-adequacy FAILs, and none was a production defect. The process cost was high, though. There were 29 plan revisions plus 30 registration rows, 21 review rounds, 21 critique passes and 52 owner questions, for $491.77. About 66% of the spend went to gating and planning, against 9.7% to implementation. The two systemic weaknesses are (1) acting on claims nobody had read, which caused most of steering's recorded errors and two re-put prompts, and (2) environment premises carried forward from an earlier chain without being re-derived, which cost UAT about 5 hours of wall time and blocked every signed-in row.

## Timeline (anchored to the rulings blocks and changelog rows cited)

| Window (UTC) | Phase | Note |
|---|---|---|
| 04:37–05:50 | Scope, plan rev 1–7, all pre-code gates | Rev 1 at 04:43. Critic cycle 1 and cycle 2 each REQUEST REVISION once, the chain's only two. |
| 05:50–09:52 | M0–M7 implementation, review, QA Phase 2 | Revs 8–27 land here. Most churn concentrates in M4-d (revs 14–21) and M5-h (revs 22–24). |
| 09:55–09:58 | Usage gate stop and resume | `plan-usage.py` read 98.0% and then 0.0% three minutes later, unexplained (block 09:58Z). |
| 09:58–11:01 | M8 fix round, rev 28 (D37 pre-UAT fold) | |
| 11:01–14:42 | Effort-final QA | FAIL 12:40, PASS 12:53, withdrawn 14:24, PASS 14:42. About 1.5 h of this window was a delivered-but-unread message (agents INBOX, steering-hooks-015 FYI, 12:47Z→14:1x). |
| 14:44–21:26 | UAT | Conditional at 15:17. The owner's answer on UAT-1 came at 19:47, about 4 h 50 min later. Six walks followed. |
| 21:38–22:13 | Release | The generator deployed 24 min after the push, because the self-hosted runner was down until the owner started it. |

**When drift set in.** The plan's Validation premise ("`.env.local`, whose database is the live one") had been false since chain 014's "stay local" ruling (2026-08-27, cited in UAT-1). It entered rev 1 unread, QA's I-10 accepted it at Phase 1, and it surfaced only at UAT, about 9 hours after it could first have been checked. It is the chain's one drift against its own release path. It is not drift against the objective.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Went well

- **The cost-question rule saved a round.** When one limb had been revised three times running, steering put the choice to the owner as a cost question first (blocks 06:32Z, 06:39Z, 09:40Z). D37 parked three LOW items into a single pre-UAT fold, which saved one four-gate round. That is the rule paying for itself.
- **Escalated findings were priced.** CR-12, AF-26, RK-8 and CR-34 each reached the owner with a cost line in the option text. He chose a different scope three times, so the pricing was doing real work.
- **Mutation-backed QA found actual gaps.** Seven Phase 2 FAILs on test adequacy were each closed test-only. The effort-final website sweep (265 mutants, 9 survivors) and the owner-ordered plumbing sweep (13 mutants, 3 survivors) both changed the suite (QA effort-final document).
- **Stages lodged their slips in the round.** QA's `4c23db0` commit sweep, the implementer's 23-file `eslint --fix` revert, the reviewer's own invalid runs and the critic's key print are all disclosed in the stage's own document. That is the only reason this retrospective can see them.
- **The D39 analysis fixed the problem without editing source.** It found a no-source route (via-editor) and turned a release blocker into three PASS rows. Along the way it uncovered a real pre-existing production defect, which now has a handoff.

### Didn't go well

1. **Steering acted on claims it had not read. This is the dominant steering failure.** The rulings file records 8 steering errors (`grep -n -i "steering's error\|relay error"` over the file: lines 118, 203, 214, 232, 262, 303, 348, 388). Four of them are "acted on unread or stale state":
   - 203: the prompt was put without reading the plan's tip;
   - 214: steering told the reviewer what `6001f7f` carried without reading it;
   - 263: steering relayed AF-23 as an instruction without a read, and CR-20 executed against it;
   - 303: steering framed M-C9-3 as identical to CR-33.

   Two re-put prompts belong to the same class, because each option text carried a stage's claim that was false: D35 at 09:28Z ("as built, no code change", false for lists) and the 20:12Z re-put ("It saves nothing", false for sign-in). Steering marks these premises "steering did not read" with commendable consistency, so the record is honest. But a marked-unread premise still reaches the owner as option text, so the owner prices a choice on a claim nobody verified.
2. **The owner was asked twice for things his rulings already held.** At 07:01Z he said "I already ruled on this class of item. Yes fix." (the sibling-mirror class). Steering wrote "From now on such items ride without a prompt." At 21:14Z he said "You don't need to ask me to retry something I already approved." That was D39. The cause is visible in the record, and it is narrower than steering's INBOX entry guesses. The plan's D39 register row paraphrases the reopen condition as "the analysis's finding (a cause that needs source, or none found), which goes back to the owner". The commission's limb 3 stops only "if none exists without editing source, or the cause is a defect in the chain's code". The analysis found a cause in source, pre-existing and with a no-source remedy. That satisfies the register's paraphrase but not the commission's text, and not the option the owner chose ("then UAT retries all three locally"). The analyst cited the register (analysis lines 179–182), and steering relayed it. **So one ruling had two written reopen conditions that disagreed, and the looser one won.** The commission text and the owner's chosen description were the authority. The register's paraphrase was not.
3. **An environment premise was inherited instead of re-derived.** UAT-1's premise sat false for about 9 hours of chain time, and then the chain waited about 4 h 50 min for the owner. A `pg_isready` at QA Phase 1 would have surfaced it at 05:4xZ, while the owner was answering prompts within minutes (rulings blocks 05:11Z to 07:52Z). UAT itself estimates that rebuilding the stack by hand cost about an hour (§ Local test infrastructure).
4. **A release precondition went unchecked.** Neither the plan, nor `release-move.js --dry-run`, nor devops Stage 1 checks that the self-hosted runner is alive. `gh` returns 404 for the repository, so devops could not see the run or dispatch the D19 re-run. Two owner turns were spent at 22:03Z and 22:04Z. The architecture record's P-3 names "a self-hosted runner" but not its liveness as a dependency.
5. **A known secret was printed into transcripts twice.** The 04:49Z ruling put the plaintext key in `prod.yml` on record, and the planner counted it without printing it. Critic cycle 1 nonetheless ran `grep -n -i key` and printed the literal (critic's own disclosure). Devops printed it once more at release (rulings, block 22:13Z). Both disclosed, which is good. The handoff `preview-image-generator-api-key-in-workflow-files-2026-11-08.md` does not record that exposure, and its rotation question rests on "who has read access".
6. **Sibling sweeps took their predicate from the flagged site's spelling.** Five instances:
   - CR-8: the colour sweep missed `Picker.tsx`;
   - CR-24: the F-45 sweep missed a concise `useMount` form (the implementer's own words: "my delivery-1 F-45 sweep followed the flagged site's spelling");
   - M-C4-1: the second F-27 site was enumerated from the constant's consumers;
   - M2: "Had I stopped at the two named sites" (implementer);
   - QA's 14:24Z withdrawal: a disposition claimed without executing the mutant.

   `claims.md` already forbids this ("A sweep predicate is never derived from the phrasing of the hits already known"). The rule exists, and the stages missed it five times in one chain, so prose is not reaching the act.
7. **Instruments matched their own command line.** `pgrep -f` matched its own command line three times: implementer M0, QA effort-final ("killing that shell"), and the qaf34 implementer ("the wait never ended"). SKILL.md already states the rule. Same shape as item 6: the rule is written down but not built into the tool.
8. **A plan-row commit swept up a peer's hunk.** QA checked the diff at 11:00, then committed in a separate call, and the planner wrote between the two (`4c23db0`, 5 added and 1 removed against one owned row). The CLAUDE.md third exception says "immediately before", which still allows the race window. Separately, the implementer committed M6-a (`9cc06d8`, 08:33:46Z) before rev 25's last gate passed (08:37Z). That is recorded only as a steering observation (block 09:22Z), not in the M6 implementation document. It was lodged in steering's record, not the stage's own.
9. **One check never ran in this workspace.** `~/.claude/tools/convention-check.js` runs id-token and basename checks "only where an ancestor directory carries `agent-output/TEST-CONVENTIONS.md`" (its line 46). That file does not exist in this record: `ls -d` fails, and `git log --diff-filter=D -- TEST-CONVENTIONS.md` is empty. The conventions live in `agent-output/CLAUDE.md`. So the chain's naming checks were "unchecked, not passed" every time (M0 and M1 implementation documents), and the stages disclosed this correctly.
10. **Messages were lost between sessions.** A delivered-but-unread message cost about 1.5 h (12:47Z to 14:1x). The implementer's handoff to code review failed outright ("No agent named 'code-reviewer-hooks-015' is reachable"), and QA's turn died on "Connection lost mid-response". Steering lodged all three. None is diagnosed.

## Lessons Learned

1. A premise marked "steering did not read" is still a premise the owner prices. Before a stage's claim enters an option's cost or effect text, the claim needs one read of the mechanism. Otherwise the option says, in its own text, that the claim is unverified.
2. A ruling's reopen condition must be written once. A register row that paraphrases the commission's stop rule creates a second, looser trigger, and a stage will cite it in good faith.
3. Environment state from an earlier chain is a claim with a date. It is re-derived at the first gate that leans on it, not at the last.
4. Five breaches of a rule already in `claims.md`, plus three of a rule already in SKILL.md, mean these classes need instruments, not more prose.
5. Local test infrastructure pays back within the chain that builds it. UAT estimates an hour lost, and the owner has twice said to build it (20:38Z, 21:29Z).

## Recommendations (each naming the file it would change)

Each goes to pi on the owner's scheduling. This document does not schedule it.

| # | Change | File |
|---|---|---|
| R1 | Before relaying a stage's owner-marked question, steering matches it against the chosen option's own description and the commission text, not the register's paraphrase. A question one of those already answers is acted on and cited (the 21:14Z case, item 2 above). | `~/.claude/agents/steering.md` § Prompting the owner; `~/.claude/agent-skills/document-lifecycle/references/escalation.md` |
| R2 | A Decisions Register row's reopen or "goes back to the owner" clause quotes the commission's stop condition verbatim and never paraphrases it. | `~/.claude/agents/planner.md` (Decisions Register) |
| R3 | A stage labelling a choice owner-needing cites the ruling and the clause it read, and says why that clause does not already hold the answer. | `~/.claude/agents/analyst.md` (and the shared ask form in `escalation.md`) |
| R4 | An option's cost or effect sentence carrying a stage's claim is read at the mechanism before the prompt goes out. Otherwise the option text itself says "unverified: <claim>, <whose>". | `~/.claude/agents/steering.md` § Prompting the owner |
| R5 | QA Phase 1 runs a readiness probe for every environment the Validation section names (e.g. `pg_isready` on `DATABASE_URL`'s host and port, without printing credentials) and records the result as a premise row. The planner's Validation section dates each inherited environment premise. | `~/.claude/agents/qa.md` (Phase 1); `~/.claude/agents/planner.md` (Validation) |
| R6 | A record tool `tools/uat-local-stack.sh up\|down\|status`, as UAT specified it in § Local test infrastructure, built on the analyst's `run-local-probe.sh`/`seed.sql`. The owner's 21:29Z words also give pi a standing duty to look for such tools in each batch. | the record's `tools/`; `~/.claude/agents/pi.md` |
| R7 | Devops Stage 1 reads the liveness of any self-hosted runner a release workflow names, and the access of `gh` to that repository, before asking for push approval. A missing access goes to the owner in the same approval prompt, not after the push. | `~/.claude/agents/devops.md` (readiness checks); `~/.claude/tools/release-move.js` (dry-run notes) |
| R8 | Record the runner's liveness as a deploy dependency in P-3. | `agent-output/architecture/preview-image-generator.md` (architect) |
| R9 | A file the record names as holding a plaintext secret is read only by counting or redacting forms. Best done mechanically with a PreToolUse hook keyed to paths that handoffs flag. Otherwise as a definition rule in critic and devops, the two that printed it. | `~/.claude/settings.json` (hook); `~/.claude/agents/critic.md`, `devops.md` |
| R10 | Sibling enumeration under the mirror-the-siblings class records its predicate and how it was derived (behaviour shape, alternate spellings, AST or LSP references), and is checked by a second, differently shaped instrument. Code review checks the predicate itself, not only the hits. | `~/.claude/agents/implementer.md`, `code-reviewer.md` |
| R11 | Self-matching waits are replaced by a tool, e.g. `~/.claude/tools/wait-pid` (wait on a recorded pid, with a timeout), that the definitions cite in place of `pgrep -f`. | `~/.claude/tools/` (new); SKILL.md § Background work |
| R12 | The plan-row exception's diff check and `git commit --only` run as one command, with `--numstat` compared afterwards (QA's own method fix), ideally as a record tool. | `~/.claude/CLAUDE.md` § Git, third exception (owner's file) |
| R13 | `convention-check.js` reads this workspace's conventions from `agent-output/CLAUDE.md` (or takes a `--conventions` path), so the id-token and basename lanes run. The QA INBOX note that the ID-token class misses `qaf` belongs in the same change. | `~/.claude/tools/convention-check.js`; `agent-output/CLAUDE.md` |
| R14 | Diagnose SendMessage delivery to an idle session, and a CronCreate one-shot firing 1 h 19 min late (both already lodged by steering in the agents INBOX). | `~/.claude/agents/steering.md` § Standing check; the session tooling |

## Cost

Readout: `python3 ~/.claude/tools/cc-usage.py chain hooks-015 --since 2026-11-08T04:37 --until 2026-11-08T22:11`. The window runs from the 04:37Z scoping ruling to the deployment record's Released row at 22:11. The raw output is in `cost-chain.txt` in this run's scratchpad, and is not committed.

- **Session set:** 47 rows, 46 resolved from the registry cache and 1 live. The tool flags no session as unrecoverable. Two rows carry 0 requests: steering `b0887a70` (the usage-gate stop) and security `737e560f` (seen 22:12:59Z, the closure respawn after the window). By role:

  | Role | Sessions | $ |
  |---|---|---|
  | QA | 8 | 98.39 |
  | code review | 7 | 71.57 |
  | planner | 5 | 63.31 (incl. the M8-0 analyst subagent, $4.75) |
  | critic | 5 | 62.02 |
  | steering | 6 | 57.04 |
  | implementer | 8 | 47.65 |
  | UAT | 1 | 35.73 |
  | architect | 3 | 27.01 |
  | security | 2 | 13.23 |
  | D39 analyst | 1 | 10.08 |
  | devops | 1 | 5.74 |

  The total is **$491.77**. Subagent usage is filed under the parent rows: devops, implementer `9dad059d`, and the QA rows, which carry Haiku and Sonnet helpers.
- **Outside the family, not counted:** steering-coordinator (Playwright arbitration) and researcher-bugs (the source research, pre-chain). No fixer chain ran. Steering's rows hold only chain-015 coordination inside the window, as far as the rulings show. This retrospective's own run is filed under steering `b83bb6d2` after 22:11 and falls outside the window.
- **Production lines.** `git diff --numstat` over website `7ce866b..b96e364` (paths under `src/` and `bot/`, excluding `__tests__` and `*.test.*`) gives 446 added. Over preview-image-generator `471578f..8de2b53` (all 5 files production) it gives 97 added. Excluded: `.eslintrc.json` (+28) and `vitest.config.ts` (+1). That makes **543 added production lines, so $0.91 per added production line**. The suite gained 5,514 added test-side lines (website total 5,989 added, minus 474 non-test, minus 1).
- **Shape.** Gating plus planning (QA, code review, critic, architect, planner) is $322.30, or 66%. Implementation is $47.65, or 9.7%. Critic spend was $62.02 for 21 passes. Two of those requested revision, both before 05:50Z. Cycles 3 to 9 raised no HIGH: 8 MEDIUM and 15 LOW, by the helper's per-cycle counts, mostly plan-text. The yield per pass fell sharply once implementation began. By itself that does not argue against putting every revision past all four gates, but it does make the per-revision cost visible. R2 and D37's park-and-fold are the levers here, not a new rule.

## Handoff

- No handoff was minted. Every recommendation above is general, not specific to this effort's next chain, and reaches its stage through pi.
- **Architect:** R8 (P-3 runner dependency). Separately, `system-architecture.md` § Roadmap Readiness still describes plan 013 as "open and in critique", which is stale. That is the architect's to reconcile.
- **Roadmap:** none exists. Once this document is closed, the roadmap agent has nothing to update unless the owner creates one.
- **Owner-needing item, carried to steering-hooks-015:** the generator's `/generate` key value now sits in at least two session transcripts on this machine (critic cycle 1 and devops at release). The rotation question in `handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md` does not yet count that exposure, and rotation is his call.
