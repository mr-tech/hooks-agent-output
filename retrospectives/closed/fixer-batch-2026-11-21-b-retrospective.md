---
ID: n/a
Origin: fixer-batch-2026-11-21-b
UUID: f5faf0aa
Status: Processed
Status-Detail: "Processed by pi batch 38 on 2026-11-25: every recommendation is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder."
---

# Retrospective (fixer batch 2026-11-21-b): fix-recent-message-ids, fix-message-not-found

**Plan Reference**: none (fixer chains). The chains' fixer documents:
- `implementation/closed/fix-recent-message-ids-implementation.md` (chain 1)
- `implementation/closed/fix-message-not-found-implementation.md` (chain 2)

**Date**: 2026-11-21
**Retrospective Facilitator**: retrospective (`retrospective-fixer-batch-2026-11-21-b`, a subagent of `steering-hooks`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T08:07 | steering-hooks (spawn brief; his selection, effort rulings block 2026-11-21T08:00Z, "Agent: run it now") | Fixer-batch retrospective over chains 1 and 2 of effort `fixer-queue-2026-11-21` | Written from the documents. Cost read once per chain. Eight recommendations, each naming the file it would change, plus sightings for four pending recommendations of the earlier 2026-11-21 batch. No handoff created. |
| 2026-11-25T22:25 | pi (pi-batch) | Document closed | Status: Processed. pi batch 38 extracted the recommendations: each is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder. |

## Summary

**Corpus.**
- *Read whole:* `steering/fixer-queue-2026-11-21-rulings.md`; `steering/fix-recent-message-ids-rulings.md`;
  `steering/fix-message-not-found-rulings.md`; `steering/selection-ledger/2026-11-21.md` (untracked, read and left as it is);
  `steering/fix-recent-message-ids-brief-uat.md`. Chain 1's QA document and P-2 carrier
  (`handoff/closed/fix-recent-message-ids-post-deploy-2026-11-21.md`). Chain 2's implementation document, its QA document lines 1 to
  140, and both of its carriers (`handoff/get-one-absent-number-still-500-in-production-2026-11-21.md`,
  `handoff/fix-message-not-found-post-deploy-2026-11-21.md`). The prior batch's retrospective, as the form.
- *Read in part, by grep or line range:* chain 1's implementation (Test section), code review (Adversarial execution) and deployment
  (changelog); chain 2's code review (Adversarial execution, TDD check), deployment (Phase 2A) and common brief (hazards and test
  database rule); `handoff/closed/get-one-absent-number-fails-without-not-found-2026-11-19.md` (changelog);
  `architecture/system-architecture.md` and `architecture/website.md` by grep for kysely, `getPostgres`, CJS and ESM;
  `verification/fix-recent-message-ids/code-review/recent.pg.test.ts` by grep for its imports and mocks; the memory file `hazards.md`
  by grep for fakes and kysely.
- *Absent where it would be cited:* `agent-output/roadmap/` holds only `.gitkeep`, so no epic is cited.
- *Not read:* the other per-stage briefs; chain 1's code review and implementation outside the parts named; the `verification/`
  captures other than the probe file named; the QA Phase 3 release-tip records; the deweeder's tables under
  `verification/fixer-batch-2026-11-21-b/deweed/`, which were still being written at this run (`website-1.tsv`, `website-cases.tsv`).
- *Cannot be read:* rulings given in conversation and not lodged; message contents between sessions; what steering told the owner in
  chat at 07:5xZ beyond the rulings block's one line; anything a session corrected before its document was committed. Anything
  outside this corpus is unverifiable-by-construction here, not refuted.

**Value Statement** (each chain's scope statement, bounded):
- **1:** the hydrated session returns a server message row only where the caller is owner or Administrator of that server;
  `user.updatePreferences` refuses a recent-list element that is not a message number; a stored bad element no longer fails the
  session (`steering/fix-recent-message-ids-rulings.md`, block 05:43Z).
- **2:** `message.getOne` answers one NOT_FOUND with one text for an absent number, another user's personal message and an
  unmanageable server's message; the edit and send pages show one not-found notice with a link back; the load is not retried on a 4xx
  (`steering/fix-message-not-found-rulings.md`, block 06:46Z).

**Value Delivered**: **YES** for chain 1. **PARTIAL** for chain 2.
- **1:** released at 06:45:05Z. P-2 passed on both accounts on production at 06:48Z to 06:50Z, after a second owner prompt (below).
  Its carrier is `Addressed` (re-read at write time).
- **2:** released at 07:51:38Z. Two of the three refusal cases, the notice and the retry rule work on production. The absent-number
  case, scope item 1's first limb, still answers 500 and shows the blank editor (B-1, 07:53Z to 07:56Z). It is not a regression,
  because production answered the same before. Both carriers are `Open` (re-read at write time). The fix is ordered as chain 3b, after
  chain 3, on his 07:59Z selection.

**Implementation Duration** (determination to release):
- **1:** 05:43Z to 06:45:05Z, 62 min, over one QA Failed round.
- **2:** 06:46Z to 07:51:38Z, 66 min. QA passed first time; the defect escaped.

**Overall Assessment**: fast chains, with strong instruments, and one escaped defect that every instrument shared.
- **The escaped defect is a method failure, not a slip.** Every test, the reviewer's probe and QA's 28-mutant sweep replaced
  `project-utils`' `getPostgres` with a fake built from ESM kysely. Production's `getPostgres` uses `require("kysely")`, the CJS
  build, so `instanceof NoResultError` never matched there (carrier 7c3e91a4, "Why every instrument missed it").
  - The fixer **named the precondition** and checked it with an instrument that could not see it: `readlink -f` on both packages'
    `kysely` directories (implementation, Change, last paragraph). That compares directories; the split is between two entry files of
    one directory.
  - Agreement among fixer, reviewer and QA was **agreement by construction**: three instruments of one shape at the boundary that
    mattered (`references/claims.md`, "Reproducibility is not validity when both parties share the instrument").
  - Chain 1's reviewer, an hour earlier, had probed with the real `getPostgres` over a throwaway `postgres:16`
    (`recent.pg.test.ts` line 2: `import { getPostgres } from 'project-utils'`). Chain 2 did not reuse that harness.
- **The QA-Failed round in chain 1 worked as designed.** QA's generated mutants found two survivors the fixer's nine hand controls
  could not see, and a premise probe found the owner/Administrator trim untested. It cost 12 minutes.
- **Two post-deploy reads needed more than their first instrument.** Chain 1's P-2 could not decide read-only, and needed a second
  owner prompt for production writes. Chain 2's B-1 found the defect, but only after the release and its quote to the owner.
- **Steering recorded three of its own deviations** and left a fourth (a typed stamp) only in a commit message.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Batch-level reads

- **The chains ran in sequence, as ordered.** Chain 2's determination (06:46Z) followed chain 1's push (06:45:05Z) by a minute, while
  chain 1's P-2 was still being read. No contention for the website tree is recorded.
- **The escaped fix now queues behind a tree.** Chain 3's fixer was mid-edit in the shared website tree when B-1 failed. His options
  at 07:59Z were: wait for chain 3, a second working copy, or pause chain 3. He chose to wait. The absent-number gap stays on production
  until chain 3 releases. That is a cost of one tree per workspace, chosen knowingly, and it is named here, not proposed against.
- **Questions reached the owner more than once.**
  - The four decision items of 05:42Z were first put in plain-message form. His relayed ruling at 05:48Z ("prompt me and not wait for
    the chains to be blocked") had them re-put as a selection prompt at once.
  - Chain 2's design reached him twice: the page at 05:50Z (Q1), then the server answer at 05:55Z, after a refutation helper read the
    three different codes. The 05:55Z question was in reach at 05:50Z: the inventory row already named the 500 (block 05:38Z, item 2).
- **The same class appeared in both chains: a test double that does not match the real boundary.**

| Chain | Double | How it differed from the real one | Caught by | Record |
|---|---|---|---|---|
| 1 | fake kysely driver's `refuseNonInt8` | might not match postgres's int8 refusal | the reviewer's real-postgres probe: agrees on every case the suite uses | code review 1, item 5 |
| 1 | guild-list fixtures | only n ∈ {0, 1} and `owner: true`, so the filter's walk and its Administrator branch went unasserted | QA's generated and class mutants (QAF-1, QAF-2) | QA 1, Findings |
| 2 | `fetchUserGuilds` stub answering `null` | the real function never resolves `null` | QA, by reading the real function (QAF-1) | QA 2, Audit |
| 2 | fake `getPostgres` built from ESM kysely | production's is CJS, so its `NoResultError` is another class | **no stage before release.** QA's production read, B-1 | carrier 7c3e91a4 |

  Iron Law 5 asks each invented boundary value for its falsity signature. All four doubles were named. The two that were caught were
  checked against the real thing (postgres, the real function's source). The one that escaped was checked against a proxy for the real
  thing (a directory link).
- **Source handoffs were closed at two different points.** Chain 1's three were closed at 07:00Z, after P-2 passed. Chain 2's
  `get-one-absent-number-fails-without-not-found-2026-11-19.md` was closed `Addressed` by steering at 07:53Z, while B-1 was being
  read (07:53Z to 07:56Z), on a discharge that did not hold. Steering recorded this and carried the gap in a new handoff instead of
  reopening (block 07:58Z).
- **Record-write and stamp gates recur, each disclosed.** The effort rulings' first write by shell heredoc was refused and re-issued
  with Edit (block 05:38Z). Chain 1's fixer applied round-2 edits with an ad-hoc Python replace script (implementation 1, changelog
  06:30). Chain 1's QA had a typed changelog minute refused and re-stamped (QA 1, Refresh pass).

### Steering's prompting deviations

| Time | Deviation | Lodged where | Cost |
|---|---|---|---|
| 05:59Z | Chain 4's reach prompt put before its refutation helper ran | effort rulings, block 05:59Z, as "this thread's error" | none: the helper, run after, found every limb HOLDS |
| 06:47Z | P-2's production-write prompt put with no refutation helper, "since no helper here carries a browser" | chain 1 rulings, block 06:48Z, as a deviation | none measured. Note that the UAT session itself used a `browser-walker` helper for limb 2 two minutes later (P-2 Result). So a scripted browser read was in reach of the chain. Whether one spawned by steering could have signed in is not established here |
| 07:00Z | A close-out heading typed as 07:02Z, ahead of the clock, re-stamped to 07:00Z | **commit message only** (`28e7595`, "was typed 07:02Z"); the rulings file carries no disclosure (no hit for "typed" in the file) | none; but a process fact lodged only in a commit message is not in a document (`references/claims.md`, "Lodge in the round") |
| 06:45Z | The P-2 brief narrowed the row's instrument to "read only: no save" | **not lodged as a deviation.** The row itself said "save one in that server first" and named, under Known limits, that a read with no server row decides nothing | one undecidable read, one owner prompt, about 4 minutes (06:46Z to 06:50Z) |

The fourth row was found here, not by steering: the brief (`steering/fix-recent-message-ids-brief-uat.md`, commit `72df3e4`, 06:45Z)
against the row it briefs.

### Chain 1 — fix-recent-message-ids

**Went well**
- **The reviewer's real-postgres differential.** It ran the real `hydratedAuthCallback`, `getUserRecentMessages`, kysely and
  `getPostgres` over a throwaway `postgres:16` with project-utils' schema, at base and fix. It settled the fake driver's int8 rule
  against postgres on 4000 seeded values (code review 1, items 5 and Adversarial execution). This is the instrument chain 2 lacked.
- **QA's premise probe.** QA mutated a line outside the diff that the change rests on (`fetchUserGuilds`' trim to `if (true)`). It
  survived 2281 cases, which made QAF-3 (QA 1, Premise probe).
- **Steering ruled QAF-3 into scope without asking.** It is a test-only addition inside the swept region, so a Standing Default
  (block 06:27Z). The fixer closed QAF-1 to QAF-4 in one test-only round, and QA re-ran 7 of 7 refresh mutants killed.
- **P-2's account-2 limb was what told the new build from the old.** The old build listed a server row without a guild check, so
  account 2's hydration leaving the row out is evidence of `6f76c6d` serving (P-2 Result, "Which build served").

**Didn't go well**
- **The fixer's controls were hand-built only.** They were 9 controls, 8 killed and 1 equivalent. QA's 12 generated mutants included
  `auth.ts:162:walk-first` and `walk-last`, which survived. Run by the fixer, `mutant-gen.js` would have shown them one stage earlier.
  This is the earlier 2026-11-21 batch's Recommendation 6, sighted again (30 production lines).
- **P-2 needed state production did not have.** The Claude test server held no message, so the read-only brief could not decide.
  The write permission came by a second prompt. The option text named restoring account 2's list but not account 1's. A save
  displaced `"6011"` from account 1's ten-entry list, which UAT first left "as is" and then restored on steering's word at 06:52Z,
  after the carrier had closed (P-2 changelog, 06:51 and 06:52).

### Chain 2 — fix-message-not-found

**Went well**
- **The reviewer's raw-HTTP probe was wide and calibrated.** It ran 156 requests per tree over 6 caller states, 3 rows and 5
  request-target forms. The oracle was defined before the run, and the positive control failed at base. It ran under
  `NODE_ENV=production` to match production's error bodies (code review 2, Adversarial execution).
- **QA closed the reviewer's Assumption Not Checked on production** before the push: it read live 500 and 403 bodies for a `stack`
  key, with a positive control. It also minted B-1 with an instrument shown to work at minting (07:35Z), and B-1's predicted
  "unfixed" values made the 07:53Z failure readable at once.
- **QA's class mutants found what generated ones did not.** The three actionable survivors were QA-authored per-site and per-code
  mutants (QAF-1, QAF-2). The 21 generated mutants' survivors were layout only.
- **The post-deploy read refused to pass.** B-1 established which build served from the new 404 text, waited 60 s, re-read 9
  requests, and wrote FAIL. QA then established the cause under Node with a positive control (`kysely-dual-class-check.{mjs,out}`),
  all within four minutes of the read.
- **Steering ran a refutation helper before the 07:59Z prompt** and quoted its PARTLY limb ("no Next bundle was built") in the
  premise.

**Didn't go well**
- **The escaped defect** (Overall Assessment, above).
- **No instrument before release ran the shipped module graph.** Devops ran a production `next build` of the tip, exit 0, but did not
  serve it or send a request (deployment 2, Phase 2A, Packaging). The reviewer's probe ran the real Next API handler in vitest, with
  `getPostgres` replaced. The one execution of production's own import of kysely before the push was production's 07:35Z baseline.
  That was the old build, where the bug was the expected answer.
- **The common brief offered the fake as an equal option.** "A test database is a throwaway container or the fake kysely driver"
  (`steering/fix-message-not-found-brief-common.md`, line 62). The rule exists to keep tests off `.env.local`'s database. It says
  nothing about which one exercises the real import path.
- **A User-visible flow was quoted to the owner as fact and was false.** QA's table marked the fixer's first flow ("a number that was
  deleted or never existed: the notice …") as "holds", on test and probe evidence (QA 2, User-visible flows). Devops's release prompt
  listed it under "What changes for a signed-in user" (ledger, 07:51Z). Steering corrected it in chat at 07:5xZ (block 07:58Z). The
  prompt did say "Not checked: production itself". The flow lines carried no evidence class of their own.
- **The closed QA record still reads PASS.** The handoff and the rulings say QA "records its Phase 2 PASS as falsified for this
  class". `qa/closed/fix-message-not-found-qa.md` has no such line: `grep -c -i falsif` gives 0. Its last commit is `83e9656` at
  07:53Z, before B-1. A reader of the closed record alone sees a clean PASS.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

Neither chain ran UAT as a stage. Both QA Phase 2 passes were scripted (vitest, `mutant-gen.js`, `mutation-run.py`, in exports). By
hand, or put to the owner:

| Chain | Check | Driven by | Time | Cost | How it could run unattended |
|---|---|---|---|---|---|
| 1 | P-2 read-only read of hooks.gg as test account 1 | `uat-fix-recent-message-ids`, in its stage browser | 06:46Z | in the uat row, $0.33 before 06:46Z | A scripted browser runner given the row's steps, including its save precondition. Recommendation 5 |
| 1 | P-2 save, account-2 limb, delete, restore | uat (limb 1 by hand in the browser; limb 2 scripted by `browser-walker`) | 06:48Z to 06:52Z | uat $2.08 after 06:46Z, of it `browser-walker` $0.10 | Limb 2 already ran as a script (`walk.mjs`, in UAT's scratchpad, untracked). Promoting that script to the record's runner would make the whole row one command. Recommendation 5 |
| 2 | Pre-deploy production reads of `getOne` signed in and out | qa, in its stage browser and by `curl` | 07:35Z | in qa's $6.65 | Already scripted in form (a `fetch` in `browser_evaluate`). Same runner |
| 2 | B-1 after the push | qa | 07:53Z to 07:56Z | qa $1.76 after 07:52Z | Same runner. The absent-number limb could also have run **before** the push against a locally served build: Recommendation 2 |
| 2 | Fixer's User-visible flows, quoted to the owner | owner, optionally | unknown | unverifiable-by-construction | Each flow is a step of the same runner. The first one is what B-1 then refuted |

**The standing suites now cover**, in website:
- `src/server/__tests__/auth.hydrated-recent-messages.test.ts`, `src/utils/redis/__tests__/redis.fetch-user-guilds.test.ts`
  and the touched `user.save-limits`, `shared.in-predicates` and `auth.hydrated-session` files (chain 1);
- `src/server/api/routers/__tests__/message.get-one-not-found.test.ts` and
  `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx` (chain 2).

These are named, not re-proposed. **None of them runs the CJS kysely**, so the absent-number limb has no case that can be red
against production's form. The carrier 7c3e91a4 states the red test chain 3b owes. The pinned browser runner has been proposed before
(the 2026-11-20 batch's Recommendation 6, still pending), and this batch adds three sightings to it.

**Test-case scoring:** the deweeder's tables were still being written at this run, so no figure is taken from them here.

## Lessons Learned

1. **A fake at a module boundary must be built from the module the production code loads, not from a copy that resolves to the same
   directory.** A package's `exports` map can serve two classes from one directory. A check of identity has to compare what each
   importer actually receives (the class, or the resolved entry file), not where its files sit.
2. **Instruments that share a double agree by construction.** Fixer, reviewer and QA each wrote a different instrument, and each
   replaced `getPostgres` the same way. Independence has to be checked at the boundary the claim depends on, not counted by authorship.
3. **The record had the right instrument an hour before.** Chain 1's real-postgres harness imported the real `getPostgres`. A
   chain's briefs carried the database rule, not the harness.
4. **A post-deploy row's precondition must be met by the brief that runs it.** P-2's row named its save step and its undecidable
   case. The brief removed the save, and the read came back undecidable.
5. **A flow quoted to the owner carries its evidence class.** "Holds" on tests over fakes is a different claim from "seen on a built
   app" or "seen on production". The release prompt carried one "Not checked" line for all of them.
6. **A source handoff whose defect is post-deploy-observable is discharged by the post-deploy read, not by the push.** In chain 2 it
   closed three minutes before the read that falsified it.
7. **A falsified verdict is annotated where it stands.** Otherwise the closed record and its carrier disagree, and only the carrier
   is right.
8. **A generated mutant set run by the author is still the cheapest early catch.** Chain 1's two walk survivors were generated.

## Recommendations (each naming the file it would change)

Each reaches its stage through pi, on the owner's scheduling.

1. **A test double at a dependency boundary names the real module it stands for, and is shown to share its identity.** Files:
   `~/.claude/agents/fixer.md` and `~/.claude/agents/implementer.md` (Iron Law 5, "Values invented at a boundary"), and
   `~/.claude/agents/code-reviewer.md` (Adversarial execution, "Replaced boundaries").
   - Where the code under test checks a class, a symbol or a module-scoped singleton from a package the real boundary also loads, the
     double is built through the same import form as the real boundary (for `getPostgres`, `require('kysely')`), or the identity is
     shown by a run: an `instanceof` of the real boundary's thrown error against the importer's class.
   - A directory or lockfile check is not that evidence.
   - Every replaced boundary in a reviewer's probe carries a falsity signature, as Iron Law 5 already asks of the author.
   *Sighted:* chain 2 (carrier 7c3e91a4; implementation 2, Change; code review 2, "Replaced boundaries").
2. **A fixer chain whose criterion runs through the database layer runs one probe over the real `getPostgres` before release.** Files:
   `~/.claude/agents/qa.md` (Phase 2 execution) and `~/.claude/agents/steering.md` § Briefs (the test-database line).
   - The brief names the record's real-postgres harness for the write set's surfaces (today
     `verification/fix-recent-message-ids/code-review/recent.pg.test.ts` with `run-probe.sh`, and
     `verification/fix-personal-message-access/pg/run-pg.sh`), not only "a throwaway container or the fake kysely driver".
   - QA, or the reviewer under 20 lines, runs at least the criterion's error path through it.
   - Where a criterion depends on module format or bundling, the run is a locally served production build (`next build`, then
     `next start` in the export devops already builds) against that container. The workspace `CLAUDE.md`'s rule moving message ids out
     of production's range applies before any save.
   *Sighted:* chain 1 (the harness existed and caught nothing because nothing was wrong); chain 2 (no stage ran it).
3. **Lift the real-postgres harness into one reusable record tool.** File: a new `agent-output/tools/` entry (the record owner's), with
   its use named in `~/.claude/agents/steering.md` § Briefs. Two chain-local copies exist under `verification/`. A tool that takes a
   website SHA and a test file, brings up `postgres:16` with project-utils' schema under `systemd-run` caps and removes it on every
   exit path would make Recommendation 2 a single line in a brief. *Sighted:* chains 1 and 2 of this batch; `fix-personal-message-access`.
4. **User-visible flows carry an evidence class per line, through QA, devops and steering.** Files: `~/.claude/agents/fixer.md`
   (User-visible flows), `~/.claude/agents/qa.md` (the flows table), `~/.claude/agents/devops.md` (the release prompt's "What changes"
   block) and `~/.claude/agents/steering.md` § Fixer (the release quote).
   - Each flow is marked with one of: *shown in tests (doubles named)*; *shown on a built app*; *shown on production*; or *not shown*.
   - A release prompt states "What changes" lines only as the class they carry.
   *Sighted:* chain 2 (the first flow, false in production, quoted as a change).
5. **A post-deploy row's brief may narrow its instrument only where the narrowed instrument can still decide; production fixtures are
   provisioned at minting.** Files: `~/.claude/agents/steering.md` (the post-deploy reader brief) and `~/.claude/agents/devops.md`
   Stage 1 (row minting).
   - At minting, devops (or QA) checks that the state the prediction needs exists on production, or names the write that creates it.
   - The production-write option for that state goes into the release prompt, with every state it touches listed for restoring.
   - A brief that narrows the row ("read only") cites the row's Known limits and states why the narrowed form still decides.
   - The browser steps go into the record's pinned runner (the 2026-11-20 batch's Recommendation 6). UAT's `walk.mjs` for limb 2 is a
     first instance; it is in a scratchpad and should be captured before it is lost.
   *Sighted:* chain 1 (P-2's read-only brief, second prompt, account 1's residue).
6. **A source handoff of a post-deploy-observable defect closes after its post-deploy row passes.** Files: `~/.claude/agents/steering.md`
   § Fixer (chain close-out) and `~/.claude/agent-skills/document-lifecycle/references/documents.md` (Close Procedure, the discharge condition).
   *Sighted:* chain 2 (closed 07:53Z, falsified 07:56Z); chain 1 closed after P-2, the form to keep.
7. **A verdict falsified after closure gets a dated reconcile line in the closed record.** Files: `~/.claude/agents/qa.md` (post-deploy
   reader duties) and `~/.claude/agent-skills/document-lifecycle/references/corrections.md`. The line names the falsifying read and the
   carrier, and keeps the original verdict text. *Sighted:* chain 2 (`qa/closed/fix-message-not-found-qa.md` still reads PASS).
8. **Steering lodges its own process facts in the rulings file, not only in a commit message, and briefs the decision items' full
   design before the first prompt.** File: `~/.claude/agents/steering.md` (Prompting the owner; Scoping determination).
   - A stamp correction or other self-correction gets a disclosure line in the block it corrects.
   - Where the inventory row already names a decision's server half (here, the 500 in block 05:38Z, item 2), the page question and the
     server question go in one prompt.
   *Sighted:* the 07:00Z heading (`28e7595`); the 05:50Z and 05:55Z prompts.

**Sightings for pending recommendations of `retrospectives/fixer-batch-2026-11-21-retrospective.md`** (still `Active`, re-read at
write time):
- **Its Recommendation 1** (every premise carries its read). The P-2 brief's "read only" premise and the fixer's `readlink` premise
  were both stated with a read. The reads did not test what the premise needed. The rule should ask for a read **that could have
  shown the premise false**, not only for a read.
- **Its Recommendation 6** (the fixer runs the generated sweep at 20 lines or more). Chain 1, 30 lines: the two generated walk
  survivors (QAF-1).
- **Its Recommendation 8** (name the claim sweep and the coupling class). Chain 2's QA per-site and per-code class mutants found all
  three actionable survivors.
- **Its Recommendation 9** (via the 2026-11-20 batch: log record writes the gate allowed). Chain 1's fixer's ad-hoc Python replace
  script, disclosed but not quoted.

**Not proposed:** the one-tree queueing of chain 3b behind chain 3 (his knowing choice, 07:59Z).

No recommendation is for the effort's next chain alone. Chain 3b's red-test constraint is already on carrier 7c3e91a4. So no handoff
is created in this run.

## Cost

Each figure was taken with `python3 ~/.claude/tools/cc-usage.py chain <suffix> --since <determination> --until <release>`. The
outputs are in `verification/fixer-batch-2026-11-21-b/cost/`. Every chain session was resolved from the registry cache, with none
unrecoverable. Subagent usage is under its parent row. Production lines are from
`git -C website diff --numstat <base> <tip> -- src ':!**/__tests__/**'`.

**Chain 1** — `chain fix-recent-message-ids --since 2026-11-21T05:43 --until 2026-11-21T06:46`
- Session set: fixer $6.96, code-reviewer $3.81, qa $5.38 (own $5.36, `general-purpose` $0.02), devops $2.07, uat $0.33.
  **Total $18.55.**
- After the release, `--until 07:01`: uat $2.08 (P-2, of it `browser-walker` $0.10), devops $0.74. Total $2.82.
- Production lines: 30 (`user.ts` +4, `shared.ts` +11, `auth.ts` +15). **$0.62 per production line.**

**Chain 2** — `chain fix-message-not-found --since 2026-11-21T06:46 --until 2026-11-21T07:52`
- Session set: fixer $6.36, code-reviewer $4.74, qa $6.65 (own $6.63, `general-purpose` $0.02), devops $1.87. **Total $19.62.**
- After the release, `--until 08:01`: qa $1.76 (B-1 and the class check), devops $0.40. Total $2.16.
- Production lines: 56 (`message.ts` +21, `MessageNotFound.tsx` +18, `MessageProvider/index.tsx` +8, `send/page.tsx` +5,
  `edit/page.tsx` +4). **$0.35 per production line.**

**Steering** — `chain steering-hooks --since 2026-11-21T05:32 --until 2026-11-21T08:01`: one session, `7f338190`, $18.32 (own $13.73,
`general-purpose-sonnet` $4.59).
- It also carries the effort's commission and candidate inventory, the four decision items, and the scoping of chains 3 and 4
  (`fix-import-save-conflict`, `fix-desktop-draft-as-typed`). So it is not these two chains' alone, and cannot be split.
- This retrospective is a subagent of that session, so its own usage falls under the same row after 08:01. It is not counted.
- No session outside the two families and steering was read. The coordinator, `steering-coordinator`, was not read.

**Batch:** $38.17 for role sessions in window ($18.55 + $19.62) over 86 production lines, which is **$0.44 per line**. That excludes
post-release work ($4.98) and steering. Chain 2's cost bought a release that missed one of its three limbs. The fix round, chain 3b,
will add to it.

## Handoff

- **Recommended next:** pi, on the owner's command, for Recommendations 1 to 8 and the four sightings. pi closes this document as
  `Processed` once they are extracted.
- **Architect:** recommended. `architecture/system-architecture.md` lines 141 to 142 and 276 describe `getPostgres()` as a Kysely
  singleton from a committed `dist/`. They do not say that `dist/` is CommonJS and loads kysely's CJS build while website imports the
  ESM build: a grep for kysely, CJS and ESM found no such line. That is a standing property of the system that broke one release.
  The architect's entry goes through `INBOX.md`. This run writes only under `retrospectives/`, so steering lodges it.
- **Open carriers this retrospective leaves as found** (re-read at 08:07Z):
  - `handoff/get-one-absent-number-still-500-in-production-2026-11-21.md`, `Open`, owned by steering, for chain 3b;
  - `handoff/fix-message-not-found-post-deploy-2026-11-21.md`, `Open`, B-1 to be re-read by chain 3b;
  - `handoff/hydrated-recent-ids-not-canonicalised-2026-11-21.md`, `Open` (chain 1's CR-1).

  These are point-in-time states. Each carrier is authoritative on its own.
- **Items needing a carrier outside this document**, for steering:
  - the architect entry above;
  - Recommendation 7's reconcile line on `qa/closed/fix-message-not-found-qa.md` is QA's to write, not this run's;
  - a `hazards.md` line on the dual kysely class is the memory owner's. The grep found none there.
