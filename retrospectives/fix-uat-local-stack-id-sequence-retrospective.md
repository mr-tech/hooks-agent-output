---
ID: n/a
Origin: fix-uat-local-stack-id-sequence
UUID: 860d4569
Status: Active
---

# Retrospective: fix-uat-local-stack-id-sequence

**Plan Reference**: none (fixer chain). The chain source is `implementation/closed/fix-uat-local-stack-id-sequence-implementation.md`, and ID, Origin and UUID come from it. The scope is in `steering/queue-hooks-rulings.md`, blocks 19:41Z and 19:48Z.
**Date**: 2026-11-11
**Retrospective Facilitator**: retrospective (`retrospective-fix-uat-local-stack-id-sequence`, a subagent of `steering-queue-hooks`)

## Changelog
| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T20:15 | steering-queue-hooks (spawn brief) | Retrospective of the closed fixer chain | Written from the two stage documents, two handoffs, two briefs, five rulings blocks, the captures and the record history `68d737f..078383d`. Cost readout taken. Value delivered: YES. Eight recommendations, each naming a file. No handoff created (the brief asks for one document). One forward item has no record carrier and is put to steering (Handoff). |

## Summary

**Corpus**. This retrospective can read the following:
- `implementation/closed/fix-uat-local-stack-id-sequence-implementation.md` and `code-review/closed/fix-uat-local-stack-id-sequence-code-review.md`, both read whole at write time (record `078383d`);
- `steering/queue-hooks-rulings.md`, blocks 19:41Z, 19:48Z, 19:51Z, 19:57Z and 20:11Z. Earlier blocks belong to other chains and were not read;
- the briefs `steering/queue-hooks-briefs/fixer-uat-local-stack-brief.md` and `code-reviewer-uat-local-stack-brief.md`;
- the handoffs `handoff/closed/uat-local-stack-up-reuses-low-message-ids-2026-11-11.md` and `handoff/uat-local-stack-test-free-port-race-2026-11-11.md`;
- the captures under `verification/fix-uat-local-stack-id-sequence/`, read where cited below (the real-Postgres runs, the round-3 probe, the round-3 red and green runs, the EADDRINUSE attempt);
- the record history `68d737f..078383d` (`git log`, `git diff --numstat`, commit trailers);
- the `cc-usage.py chain` readouts;
- for one fact each: `~/.claude/skills/record-closure/SKILL.md`, `~/.claude/skills/handoff/SKILL.md`, `~/.claude/agents/fixer.md` (grep), and the workspace memory file `~/.claude/projects/-usr-local-bin-hooks/memory/hazards.md`.

`architecture/system-architecture.md`, `website.md` and `preview-image-generator.md` were searched, not read whole. `grep -c -i uat-local-stack` gives 0 in each, and `grep -c 'Messages_id_seq\|900000000000001'` gives 0 in the first two, so they hold nothing about this tool. The record has no roadmap document, so none is cited.

It cannot read the following:
- the content of any SendMessage, except where a document quotes it;
- session transcripts, and so the reasoning behind any act a document does not record;
- who prompted the reviewer to drop the handoff's `Priority` line (`e78b1dd`). Neither the commit nor the handoff's changelog says;
- how long each hand-driven real-Postgres run took, and what it cost;
- anything said between sessions that was not written down.

Anything outside the corpus is unverifiable by construction here. It is not refuted.

**Value Statement**: There is no plan, so the value statement is the bounded scope statement (rulings 19:41Z): *"`up` hands back a database whose `"Messages_id_seq"` is restarted at 900000000000001, or fails."* The 19:48Z re-scope adds that the seed's "Messages" id moves to 900000000000001 or above. The 19:57Z round adds that every `up` path fails on a stored id below the floor, and that the psql value call becomes one function.

**Value Delivered**: YES. At `7d59233`, `up` moves the sequence to `greatest(900000000000000, max(id))` and reads it back, and fails if the read-back is empty, not a number or inside the range. Every `up` path counts stored "Messages" ids below 900000000000001 and fails on a non-zero count. The seed's message is at 900000000000001. This was shown on a real `postgres:16` container as well as against the stub suite: `real-postgres-run-3.txt` gives `next 900000000000002` after the record's seed, and `reuse-low-id-probe-round3.txt` gives rc 1 on reuse with an id-1 row. The suite gives 111/111, exit 0 (`green-run-3.txt`; the reviewer's `suite-7d59233.txt`). What is not shown: no UAT walk has run on a stack built by the fixed tool yet, and the reviewer's Assumption Not Checked (a client-sent message id on a local save, below) is still open.

**Implementation Duration**: From the scoping commit `68d737f` (19:41:37Z) to the APPROVED commit `1f5b0c3` (20:09:06Z): 27 min. The last close commit is `1b25947` at 20:10:47Z. A fixer chain has no UAT.

**Overall Assessment**: A correct, well-evidenced 15-line fix, done in under half an hour. The stages did more than the brief required. The fixer ran the SQL against real Postgres in every round and routed the seed finding rather than absorbing it. The reviewer wrote a real-Postgres probe that showed CR-1, and re-ran it unedited at re-review. The weakness is in the scoping. Each of the two extra fixer rounds came from steering, and steering recorded both itself: the seed file was fenced out without being read (round 2), and the re-scope narrowed the property to "After a seed" (round 3). Coordination cost more than the stage work ($12.59 for steering against $7.91 for the two stages, inside the chain's window).

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Went well

- **The fixer found the seed defect and routed it.** Round 1's document names `seed.sql` line 8 (message id 1) as out of scope by name. It explains why the fix cannot change the seed or refuse `--seed` without widening the statement, and routes it to steering. Steering re-scoped within 2 minutes (commit `27f462e` at 19:47:31Z, ruling at 19:48Z).
- **Disclosures were made in the round they happened.** The fixer disclosed the capture directory missing from its fence before committing the files (round 1), and the stamp gate's refusal of a typed minute along with its remedy (`record-edit.js` `{now}`). The reviewer disclosed that `git mv` staged a rename in the shared index, in its own document, and committed it by pathspec at once (`7137296`).
- **Steering recorded its own errors, in the round.** The 19:48Z block records the missing capture directory. The 19:57Z block records that "After a seed" was narrower than the 19:41Z statement and than the workspace rule. Because of this, both extra rounds can be dated to their cause from the record.
- **Real-service evidence beyond the stubs.** `fixer.md` does not ask for a real-service run (`grep -n 'docker\|real Postgres'` over it: no hit). The fixer ran one anyway, in each round, and said why: "the stub only proves the tool sends the statement; this proves the statement". The reviewer's probe found CR-1 on real Postgres. It also showed a quieter fact: a psql error writes nothing to stdout, so a failed count reads as empty and fails the `= 0` test, which rules out a vacuous pass.
- **Every round had a red run.** Each test change was red against the previous tool: 10/106 at `68d737f`, 4/109 at `1fee252`, 5/111 at `71b61b9`. The handoff's falsity signature ("the new case must fail at `71b61b9`") was met and cited.
- **The open-ended work was routed by path.** CR-1 and CR-2 went to a handoff the round itself discharged. The INFO went to its own handoff once steering returned it for lacking a path.
- **Clean-up was recorded.** Every container named, 0 left (`docker ps -a`). Scratch directories deleted, with `du -s` before and `ls -d` after. Both sessions stopped.

### Didn't

- **Round 2 came from a one-command read that was skipped.** The determination itself says the seed was the open question ("the seed may insert rows with low ids; what the seed file holds was not read here"), and then fences the seed out ("Out: … the seed file"). Reading line 8 would have put the seed in round 1. Instead it cost a fixer round, a capture set (`red-run-2`, `green-run-2`, `real-postgres-run-2`) and a re-scope.
- **Round 3 came from paraphrase, not addition.** The 19:48Z re-scope wrote "After a seed, `up` fails where a stored 'Messages' id is below 900000000000001". That is narrower than the determination's "or fails" read against the workspace rule ("recreated, not reused"). Three minutes later, steering's reviewer brief (19:51Z) gave the wider property as a hazard: "after `up`, with or without `--seed`, no stored 'Messages' id is below 900000000000001". So steering held the right property, but put it in the reviewer's brief and not in the ruling the fixer built to. The fixer built the narrow wording exactly, the reviewer found the gap as CR-1, and a third round followed. The fixer worked from the ruling and the reviewer from the brief, and the two said different things.
- **The capture directory was missing from the fence.** `fixer.md` requires captures under `verification/fix-<slug>/`. The brief's fence named three paths without it, so the fixer had to commit outside its fence and disclose it. This was harmless, but it can recur on every fixer brief built the same way.
- **The closure skill was not used.** The reviewer closed a handoff with `git mv`, which staged a rename in the shared index. `record-closure/SKILL.md` forbids this at line 29 ("Move the file with plain `mv`, never `git mv`"). But the skill's description names only the statbot and paracord records, and lists no handoff among the documents it closes. So nothing points a session closing a handoff in this record to it.
- **A Priority was set on a stage's estimate, then dropped.** The INFO's handoff was opened with `Priority: low`. A minute later `e78b1dd` removed it ("drop a Priority not set on the owner's word"), with no changelog row in the handoff. The handoff skill's template line 27 carries the field as a placeholder, which invites filling it in.
- **A forward item ended up outside the record.** The reviewer's Assumption Not Checked is that a save carrying a client-sent message id the local database does not hold creates a low id after `up`. At close, steering put it in `~/.claude/projects/-usr-local-bin-hooks/memory/hazards.md` (line 179). No record carrier holds it: `grep -rl 900000000000001 handoff/*.md INBOX.md TODO.md OWNER-QUEUE.md` returns nothing. That memory namespace loads only in sessions launched in `/usr/local/bin/hooks`. This chain's stage sessions ran in `/usr/local/bin/hooks/agent-output`, whose memory directory is empty (`ls`). So the item reaches a UAT walk only if a steering thread in that namespace remembers to brief it. The Close Procedure (`references/documents.md`, step 1) lists the carriers: a handoff, a Planner batch row, or an `INBOX.md` entry.
- **The suite can hang on its own free-port helper.** The reviewer's first run at `7d59233` hung to the 300 s cap on EADDRINUSE (`suite-7d59233-attempt1-eaddrinuse.txt`: exit 124). The repeat passed, and the cause is carried by the open free-port handoff. The cost is 300 s per occurrence for any later stage that runs this suite.

## Testing by Hand (QA and UAT: what ran by hand, its cost, how it could run unattended)

This chain had no QA or UAT segment, by its determination. The checks run by hand were in the fixer's and the reviewer's segments:

| Run | Who | What was done by hand | Record of time and tokens | Could run unattended as |
|---|---|---|---|---|
| Real Postgres, rounds 1 to 3 (`real-postgres-base-run.txt`, `real-postgres-run{,-2,-3}.txt`) | fixer | Export the tool at a SHA, write a scratch env file, run `up --seed`, query the sequence, insert by default and by explicit id, run `up` again, then `down` | Not in the record | An opt-in real-Docker case in `tools/uatLocalStack.test.js`, skipped when `docker` is absent: fresh `up --seed` gives `next 900000000000002`; reuse with an id-1 row exits 1. No committed driver produced the fixer's four captures. Only their output is in `verification/`, so each round rebuilt the run by hand. |
| Reuse-low-id probe (`code-review-round1/reuse-low-id-probe.sh`), at `71b61b9` and at `7d59233` | reviewer, and the fixer at round 3 | The script is committed and ran unedited three times | Not in the record | It is already a script. The same opt-in case would absorb it. |

The stub suite already covers call order, failure exits and undo paths. The real-Docker case is worth building because the stub is the fixer's own model of docker and psql, as the review says. Twice in this chain the real service gave a fact the stub could not: the vacuous-pass check, and CR-1's reuse path.

## Lessons Learned

1. **A determination that names a specification uncertainty should not fence out the file the uncertainty is about without reading it first.** Here that read was one line of SQL.
2. **A re-scope adds limbs, it does not restate the property in new words.** Rewording a property across three relays (determination, re-scope, brief) changed it. The fixer and the reviewer were each faithful to a different version.
3. **A fixer that runs the real service catches what a stub-only suite cannot, even on a 15-line change.** It was voluntary here. It should not depend on the agent choosing to do it.
4. **A skill that is not described for a case is not loaded for it.** `record-closure` already carried the exact rule the reviewer broke.
5. **A memory file is a reminder for a thread, not a record carrier for a stage.** It is also namespaced by launch directory, and the stages here ran in a different one.

## Recommendations (each naming the file it would change)

Each reaches its stage through pi, on the owner's scheduling.

1. **`~/.claude/agents/steering.md`, scoping determinations.** Where a determination names a specification uncertainty that one read of a named file resolves, steering makes that read before writing the determination. It also does not fence that file out unread.
2. **`~/.claude/agents/steering.md`, re-scopes and briefs.** A re-scope quotes the determination's bounded statement verbatim and adds limbs below it. A limb that narrows the statement is marked as narrowing. A property given to the reviewer as a hazard is either in the fixer's ruling or marked as outside it. Check before sending: the re-scope's property sentence against the determination's, and the reviewer brief's hazards against the ruling.
3. **`~/.claude/agents/steering.md`, fixer brief fence.** The permitted set always includes `verification/fix-<slug>/` and the fixer's document, as `fixer.md` requires.
4. **`~/.claude/skills/record-closure/SKILL.md`, description.** Name every agent-output record repository, or "any agent-output record repository", in place of the statbot and paracord paths. Add handoff (and retrospective) to the documents it closes, so a reviewer closing a handoff in this record loads the plain-`mv` rule.
5. **`~/.claude/skills/handoff/SKILL.md`, template line 27.** Take `Priority:` out of the template block and describe it below as a field added only on the owner's word. A placeholder in a template is an invitation to fill it in.
6. **`~/.claude/agents/steering.md`, close-out.** A forward item a closing document leaves owed goes to a record carrier the Close Procedure names, such as a handoff with `Owning-Stage` and an event-form `Review-Trigger`. A memory-file line can also be added, as a reminder only. The memory namespace is the steering thread's launch directory, which stage sessions launched in the record repository do not load.
7. **`~/.claude/agents/fixer.md`, verification.** Where the change is SQL or commands sent to a service the suite stubs, one run against the real service, its driver committed under `verification/fix-<slug>/`, is part of the fix's evidence. This fixer did it unprompted. The definition should make it required. The committed driver lets the reviewer and later rounds re-run it rather than rebuild it.
8. **`tools/uatLocalStack.test.js`.** An opt-in real-Docker case covering fresh `up --seed` and reuse with a low id (Testing by Hand, above). Its natural carrier is the next chain that edits this file. That trigger is the same as the open `handoff/uat-local-stack-test-free-port-race-2026-11-11.md`, so steering may fold the two together.

## Cost

Readout: `python3 ~/.claude/tools/cc-usage.py chain fix-uat-local-stack-id-sequence --since 2026-11-11T19:41:00Z --until 2026-11-11T20:11:00Z`. The chain has no deployment record, so the window ends at the close-out block (20:11Z). Both sessions were resolved from the registry cache, with the live entries gone. No session was unrecoverable, and no session outside the `<suffix>` and `<suffix>-<n>` forms belongs to the chain apart from steering.

| Session | Model | Requests | $ |
|---|---|---|---|
| `fixer-fix-uat-local-stack-id-sequence` (seen 19:41:38Z) | opus | 83 | 4.55 |
| `code-reviewer-fix-uat-local-stack-id-sequence` (seen 19:51:41Z) | opus | 66 | 3.36 |
| Stage subtotal | | 149 | **7.91** |
| `steering-queue-hooks` [652259c7], up to the clear at about 19:52Z | fable | 16 | 4.61 |
| `steering-queue-hooks` [0fb34de5], after the resume | fable | 32 | 7.99 |
| Steering subtotal (`cc-usage.py chain queue-hooks`, same window) | | 48 | **12.59** |
| **Chain total** | | 197 | **20.50** |

Neither stage row shows subagent usage. The steering rows are bounded by the window. Every rulings block in the window belongs to this chain, but steering's other work in those 30 minutes cannot be listed from the documents. So $12.59 is an upper bound on what this chain cost steering. The [0fb34de5] row includes the resume's cache write (130,440 tokens) after the mid-chain clear. This retrospective started after 20:11Z and is not in the readout.

**$ per added production line**: `git diff --numstat 68d737f HEAD`, production paths only, gives `tools/uat-local-stack.sh` 15 added, 5 removed. The test file (88/1) and the seed fixture (1/1) are not production paths. That makes $20.50 / 15 = **$1.37 per added production line**, or $0.53 for the stage sessions alone.

## Handoff

- **For steering, not the owner:** the reviewer's Assumption Not Checked (a client-sent message id on a local save creates an id below 900000000000001 after `up`) has no carrier in the record (Didn't, above). Lodging it is steering's call, since steering chose the memory-file carrier. A handoff with `Owning-Stage: uat` and `Review-Trigger: "when the next UAT walk on a stack built by tools/uat-local-stack.sh is briefed"` would fit the Close Procedure.
- No architectural pattern for the architect: this is a record tool, and the architecture documents hold nothing about it.
- Then the roadmap stage, once this document is closed.
- This document rests at `Active` until pi processes it, on the owner's command.
