---
ID: n/a
Origin: fixes-2026-11-21-steering-hooks-3
UUID: f717f5b2
Status: Processed
Status-Detail: "Processed by pi batch 38 on 2026-11-25: every recommendation is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder."
---

# Retrospective (fixer batch fixes-2026-11-21-steering-hooks-3): fix-message-link-import-empty, fix-desktop-draft-as-typed

**Plan Reference**: none (fixer chains). The chains' fixer documents:
- `implementation/closed/fix-message-link-import-empty-implementation.md` (chain 3c, `Abandoned` on the owner's ruling, no code)
- `implementation/closed/fix-desktop-draft-as-typed-implementation.md` (chain 4, `Released`)

**Date**: 2026-11-21
**Retrospective Facilitator**: retrospective (`retrospective-fixes-2026-11-21-steering-hooks-3`, a subagent of `steering-hooks`)

The Origin follows the lifecycle's batch form (`references/documents.md`, ID Assignment Rules: `fixes-<UTC date>-<thread>`, `-3` for
this thread's third batch of the day). The two earlier batches of the day used the `fixer-batch-2026-11-21-b` and `-c` form instead.
Batch c records that deviation (effort rulings, block 10:28Z, item 3).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T15:37 | steering-hooks (spawn brief `scratchpad/batch-d/retro-brief.md`; effort rulings block 2026-11-21T15:31Z) | Fixer-batch retrospective over chains 3c and 4 of effort `fixer-queue-2026-11-21`, including whether batch c's lessons were applied | Written from the documents. The cost was read once per chain, and the captures are in `verification/fixes-2026-11-21-steering-hooks-3/cost/`. Eight recommendations, plus sightings of batch c's pending ones. No handoff created. Items for steering are under Handoff. |
| 2026-11-25T22:25 | pi (pi-batch) | Document closed | Status: Processed. pi batch 38 extracted the recommendations: each is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder. |

## Summary

**Corpus.**
- *Read first:* `architecture/system-architecture.md` and `architecture/website.md`, by grep for intent, `getFromUrl`, Message Link
  and draft, then lines 131 to 136 of the first. `agent-output/roadmap/` holds only `.gitkeep`, so no epic is cited.
- *Read whole:* both chains' rulings files and every brief they name (3c: common, fixer, qa-diagnosis; 4: common, fixer,
  code-reviewer, qa, devops); `implementation/closed/` for both chains; `qa/closed/fix-message-link-import-empty-production-read.md`;
  chain 4's `code-review/closed/`, `qa/closed/fix-desktop-draft-as-typed-qa.md` and `deployment/closed/` documents; the handoffs
  6cc5f883, 8e9ccc47, 4bbe68a5, 9e2b7c14 and ffab0db5; `retrospectives/fixer-batch-2026-11-21-c-retrospective.md`; the effort rulings
  `steering/fixer-queue-2026-11-21-rulings.md` from block 09:02Z on, plus blocks 05:50Z and 05:59Z.
- *Read in part:* the selection ledger `steering/selection-ledger/2026-11-21.md` (untracked, read in the tree and left as it is),
  blocks 10:37Z, 11:13Z and 11:32Z; `handoff/closed/open-content-editor-text-not-drafted-until-close-2026-11-20.md` (frontmatter);
  `verification/fix-message-link-import-empty/diagnosis/summary.txt`; `verification/fix-desktop-draft-as-typed/qa/serve.sh` and
  `verification/fix-desktop-draft-as-typed/devops/build-tip.sh`;
  `~/.claude/tools/record-write-gate-hook.js` (header); `~/.claude/agents/fixer.md` (lint lines, by grep); website `package.json`
  (the `lint` script line).
- *Not read:* `qa/closed/website-b68f94c-release-tip-qa.md`; the P-1 capture and the baseline file, except as their carriers quote
  them; the other `verification/` captures; the deweeder's scoring of chain 4's tests, which runs beside this document.
- *Cannot be read:* rulings given in conversation and not lodged; the contents of messages between sessions (devops's release message
  is known only through steering's account of it in the rulings, block 11:36Z); the exact shell commands behind the two disclosed
  record writes that the gate did not refuse; which session held the stage browser's profile from 10:29:54Z to 10:34:13Z; anything a
  session fixed before its document was committed. Anything outside this corpus is unverifiable-by-construction here. It is not
  refuted.

**Value Statement** (each chain's scope statement, bounded):
- **3c:** diagnose, on the Claude test server, why `message.getFromUrl` returns an empty message for a message with content, with
  fixtures that tell the candidate causes apart, read through S1's own code path. Fix it only if the cause is code
  (`steering/fix-message-link-import-empty-rulings.md`, block 10:20Z).
- **4:** on desktop, text typed into the open content editor, the embed author name and the footer text reaches the message as it is
  typed, as on mobile, so the existing draft effect stores it. The trim no longer eats a space the user is still typing. The two dialogs
  keep their button (`steering/fix-desktop-draft-as-typed-rulings.md`, block 10:43Z).

**Value Delivered**: **YES** for both bounded scopes. Authority for each is named below, re-read at write time.
- **3c:** the cause is established, and it is not code. The Hooks.gg app (`1034527356381044828`) holds neither Message Content flag.
  Discord therefore returns other authors' messages blank unless they mention the app. The fixer showed this with two readers over the
  same fixtures and the same code (diagnosis, record `1c5541fd`). QA's production read confirmed it at 10:34:39Z: the mention fixture
  loaded, the plain one came back blank. Item 2 did not run, by its own condition. The user-facing import is still empty for most
  messages. That is the owner's known limit ("unable to turn on intent without applying first. known limit for now", ledger 10:37Z),
  and handoff 8e9ccc47 (`Open`) carries it.
- **4:** released at 11:33:01Z. P-1 HOLDS on production (`handoff/closed/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md`, Result,
  11:36:35Z to 11:37:33Z). On saved message 6008, typed content and author-name text came back after a reload, and the leave prompt
  fired. The pre-push baseline lost both. Source f1356f4b is closed `Addressed`.

**Implementation Duration** (determination to release, or to closure where nothing released; no UAT):
- **3c:** 10:20Z to 10:40Z, 20 minutes, with no release. The diagnosis was committed by 10:28Z, the production read ran at 10:34:39Z,
  and the owner's answer came at 10:37Z.
- **4:** 10:43Z to 11:33:01Z, 50 minutes. The QA verdict (the last QA verdict before the release) was at 11:25Z. P-1 was read by
  11:37:33Z.

**Overall Assessment**: two well-run chains, each with no rejected round.
- **Chain 3c** is the diagnose-first route working as designed. Steering named the hazards (which app reads, the intent as an
  inference, Discord's terms unread). The fixer wrote predictions before its reads and ran a positive control (a reader that holds the
  intent). It caught its own non-discriminating fixture, replaced it, and wrote no code for a cause that was not code. The owner's
  question carried its unread premise in the option text, and his answer settled it.
- **Chain 4** applied batch c's baseline lesson, through devops's brief. The baseline did more than confirm the old behaviour: it found
  a pre-existing defect before the push (handoff ffab0db5). Steering turned the reviewer's "the owner walks it after release" into an
  agent walk before release, on his selection. The walk took 11 minutes against the 30 to 60 the prompt quoted.
- **The batch's process defect is in a definition, not a chain.** The fixer ran the repository's lint script, as `fixer.md` step 5
  says. That script is `eslint --fix .`, and it rewrote 78 tracked files in the shared tree (Recommendation 1).

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Batch-level reads

- **Queueing.** The chains ran one after the other on one website tree. Chain 3c closed at 10:40Z and chain 4 was determined at 10:43Z.
  Chain 3c held no commit, so its branch went back to `master` `b663b35` with nothing to integrate. No contention for the tree is
  recorded.
- **Contention for one browser profile.** Chain 3c's QA found the stage browser's kept profile "held by another session's playwright
  server from 10:29:54Z" (production-read document, Disclosure). It retried per the stage-browser procedure, and the lock freed at
  10:34:13Z. That is about 4 minutes of a 20-minute chain. Which session held it is not in the corpus. Chain 4's QA used the same kept
  profile from 11:14Z without a recorded wait.
- **No question reached the owner twice.** He answered four prompts in the window: 10:37Z (two questions, chain 3c), 11:13Z (walk
  before release) and 11:32Z (release). Each answer is in the ledger and the rulings.
- **Findings that recur across both chains:**

| Finding | Chain 3c | Chain 4 | Record |
|---|---|---|---|
| A record document written by shell, which the record-write gate did not refuse; disclosed without the command | QA: Status, Status-Detail and a changelog row "written with a shell heredoc" (production-read changelog 10:39) | steering: "a Python `open().write`… It was not refused" (chain 4 rulings, block 11:39Z) | Recommendation 2 |
| A typed changelog stamp refused by the stamp gate and re-stamped from the clock | fixer (implementation changelog 10:28) | devops ×2 (deployment changelog 11:29); steering ×2 (rulings 11:39Z) | each disclosed in its round; sighted in batch c too |
| A run capture named `*.log` that the record's `.gitignore` excludes | — | QA's new `serve.sh` writes `dev.log`, and the QA document cites it ("`dev.log` is beside them"); `git ls-files` lists no `.log` under the chain's captures (count 0). Devops copied `build-tip.sh` unchanged (it writes `build.log`), but this time cited the tracked `build-output.txt` | Batch c Recommendation 5, sighted again |
| Steering's own citation or stamp error, disclosed in its block | the fixer and QA were told "block 10:37Z" for a block headed 10:38Z (rulings 10:40Z) | stamps and the Python write (rulings 11:39Z) | batch b Recommendation 8, in good form |

- **A claim in a devops message that its record does not carry.** After the release, devops's message to steering said that two
  "website" chains, `fix-docs-emoji-api-pages` and `fix-website-emoji-long-names-legend`, release from `b663b35` and need a rebase.
  Steering checked the mechanism before acting: the sessions' `cwd`, `git remote get-url`, and `git cat-file -t b663b354` exit 128
  in one of the repositories. The two chains work in other repositories (statbot-docs and statbot-v3-website). Steering did not relay
  the claim (rulings, block 11:36Z). The deployment record's Phase 2D carries only a general note about sibling chains. The specific
  claim lived only in the message. Recommendation 6.

### Chain 3c — fix-message-link-import-empty

**Went well**
- **The determination framed the diagnosis as hypotheses with hazards.** It named five fixture kinds and five hazards, among them "which
  Discord app reads" and "the candidate cause is an inference". It also set the stop rule: "where the diagnosis names a portal setting,
  the chain stops there".
- **The instrument had a positive control and written predictions.** The same converter code ran under two readers: Hooks.gg, without
  the intent, and the test bot, with the limited intent. Every fixture read full for the reader with the intent and blank for Hooks.gg,
  except the one that mentions it. The predictions were written before the reads (implementation, Diagnosis).
- **The fixer caught its own non-discriminating fixture.** The first mention fixture was posted with `allowed_mentions: {parse: []}`,
  so Discord registered no mention (`mentions: []`). The fixer read that field, judged the fixture uninformative, and posted mention-r2
  (summary.txt, 10:27:13Z). Reading the instrument's own output for its precondition is the step that made the mention exception
  observable.
- **It stated what it could not establish.** For example, which app production reads with ("not established here"), and it asked for
  the production read with a prediction and two falsifiers. QA re-derived the diagnosis from the captures before running its read, and
  said why the result excludes each falsifier.
- **The owner's prompt put the unread premise into the option itself.** It read: "Unread: a web-search summary says an app seen by
  more than 10,000 users must apply; Hooks.gg is in 445 servers." His answer, "unable to turn on intent without applying first",
  settled it in one turn. The Recommended option rested on a premise only he could check, and the option said so.

**Didn't go well**
- **A record write by heredoc, at closure.** QA wrote Status, Status-Detail and a changelog row with a shell heredoc, which the brief
  forbids. It disclosed this and rewrote the row with Edit. The disclosure does not quote the command, so it cannot be told whether the
  gate failed to see the form or the write went to a path the gate does not judge (Recommendation 2).
- **The bot-authored fixture limb did not run.** The scope statement listed "one the bot itself authored". Posting one needs the
  Hooks.gg token as the poster, which the scope's "test bot or a test webhook" did not allow. The fixer said so and argued that the
  limb would not change the cause. That is sound. The gap was in the scope statement, which listed a fixture its own poster rule could
  not produce. A one-line check of each fixture against the allowed posters would have caught it.

### Chain 4 — fix-desktop-draft-as-typed

**Went well**
- **The hazards in the brief were the right ones.** Hazard 2 (the trim eating a typed space) became the `*-trim-per-keystroke` controls.
  Hazard 4 (a write on open) became CR-1. Hazard 5 (Slate under jsdom) became a stub with its contract stated and the real path left as
  an outstanding item, which is the environment-fidelity convention followed as written.
- **Seven negative controls, each killed, each reproduced by the reviewer** with the fixer's own driver, read whole first. The fixer
  dropped a base-passing case that no control could turn red at the tip, and said why.
- **The reviewer's probe tested an owner-facing flow line.** It did not stop at the code. CR-1 found that flow 5 was false for an unset
  field (`expected '' to be undefined` at `b68f94c`). The correction reached the flow list before the release prompt quoted it, and
  the fixer swept its own document for the same error class (10 hits, 2 wrong, both corrected; implementation changelog 11:13).
- **An after-release check moved before the release, by his choice.** The review routed its Assumption Not Checked to the owner's own
  walk after release. Steering saw that an agent could do it before release, without saving, and put that to him as option A (ledger
  11:13Z). QA's walk confirmed every flow at route 0 with a base comparison and a two-direction control for the leave prompt. It also
  corrected two of its helper's cells on its own look: an auto-accept dialog handler that may have stayed attached, and a selector that
  found nothing.
- **Batch c's baseline lesson was applied, and it paid.** The devops brief asked for a baseline "before the push … its unchanged limbs
  read as the baseline", citing "the batch retrospectives' lessons". QA ran it from 11:28:12Z to 11:29:32Z. Message 6024 was
  inaccessible, so the row was re-pointed to 6008 before the push, not discovered at the after-read. The baseline also found that a
  typed-back edit leaves a draft on the unfixed build. P-1's after-read confirmed it on the fixed build, and steering routed it as
  handoff ffab0db5 before closing.
- **Evidence class per flow in the release prompt** (batch b Recommendation 4): the 11:32Z prompt gives each of the seven flows its
  evidence. One example: "flow 2 walked for embed description and field name only; title, field value and Text Display rest on the
  shared component and the suite".
- **The source handoff closed after P-1 held** (batch b Recommendation 6): f1356f4b closed at 11:39Z, after the 11:37:33Z read.

**Didn't go well**
- **The lint script rewrote the shared tree.** `fixer.md` step 5 says to run "the repository's linter (its lint script, or its config
  run directly where it has none)". Website's `lint` script is `eslint --fix . --max-warnings=0` (`package.json` line 5). Run once at
  about 10:58Z, it rewrote 78 tracked files. The fixer saved the diff, then wrote the 75 files that were not its own back with
  `git show HEAD:<path> > <path>`. Porcelain before the run listed only the fixer's own files, so nothing foreign was lost. On a tree
  where another session had uncommitted hunks in any of those 75 files, the same restore would have destroyed them. The reviewer
  showed from git that no rewrite reached the commits, and the brief asked it to. That check cost review time that a non-writing lint
  command would not have needed. Recommendation 1.
- **The walk ran on `next dev`, not a production build.** QA's `serve.sh` serves `next dev`. The Assumption Not Checked was about
  real-browser behaviour: Slate's per-keystroke emit and the caret. A dev server runs React's development build. Devops had already
  built the tip with `next build` (exit 0, 11:27Z) and did not serve it. Here P-1 then confirmed the behaviour on production, so no
  defect followed. Batch c's Recommendation 4, to serve the tip build, was written for a bundling or module-identity assumption. None
  was open in this chain, so that lesson did not formally apply. This is a weaker instance of the same gap (Recommendation 5).
- **The prompt's cost estimate was three to five times the measured cost.** "Costs one QA session, roughly 30-60 minutes" (ledger
  11:13Z). The walk ran 11:14Z to 11:25Z. The nearest measured precedent was chain 3's 10-step walk, about 08:24Z to 08:39Z, $0.69
  for its walker (batch c, Testing by Hand). The owner chose the walk anyway. Batch c's lesson 6 ("'more than a minute's run' is an
  estimate, not a cost") recurs, this time in the other direction (Recommendation 7).
- **Timestamps in two documents disagree.** The fixer's Handoff says "at 11:10Z `ListAgents` listed no
  `code-reviewer-fix-desktop-draft-as-typed` session". The rulings say the reviewer started at 11:06Z, and the usage registry's
  `seen` for it is 11:07:00Z (`cost/chain-4.txt`). The fixer's minute is probably typed, not taken, but this is not adjudicated here.

### Did these chains apply batch c's lessons?

Steering carried two of batch c's lessons into chain 3c's later briefs (effort rulings, block 10:28Z). The authority for each row is
the chain's own documents.

| Batch c item | Chain 3c | Chain 4 |
|---|---|---|
| Rec 1 / Lesson 1: read a post-deploy row's release-independent limb, and baseline its unchanged limbs, before the push | Not applicable: no release. The chain *is* a pre-release production read of an unchanged path, run before any code | **Applied**, through the devops brief. Baseline 11:28:12Z to 11:29:32Z, quoted in the release prompt ("Production baseline taken before the push … as predicted"). It re-pointed the row from 6024 to 6008 and surfaced ffab0db5 before the push |
| Rec 4 / Lesson 6: serve the tip build where bundling or module identity is open | Not applicable | **Not triggered.** No bundling assumption was open. Devops built the tip (`next build` exit 0) and did not serve it. The walk ran on `next dev`. P-1 held. See Recommendation 5 for the narrower form this chain suggests |
| Rec 3: every consumer gets a removal control and an agreement check | Not applicable (no code) | **Applied in form.** The Diagnosis has a consumer table (draft effect, `hasChanged`, preview, `usePassedProp`, `ContentEditable`, trim). The `*-stale-value` controls remove the new per-keystroke value. CR-1 still found a flow line false. That was a gap between the code's state and the owner-facing text, not between consumers |
| Lesson 4: a test that stubs a surface cannot vouch for a flow about that surface | Not applicable | **Applied**, by steering's 11:13Z prompt and QA's walk. The stubbed `SlateEditor` was named, and the real path was walked before release |
| Rec 5: captures are never `*.log` | No `.log` capture (`git ls-files` over its captures) | **Partly.** Devops cited the tracked `build-output.txt`. QA's new `serve.sh` writes `dev.log` and the QA document cites it, while `git ls-files` lists no `.log` file there |
| Rec 7: the brief's database line | The brief says "Never point a test at the database `website/.env.local` names" | The brief says "a test database is a throwaway container". "Or the fake kysely driver" is gone. No database was needed in either chain |
| Rec 2 and Rec 6 (`mutant-gen.js` hook-deps mutants; QA's suite apart from its sweep) | Not applicable | Not applicable: no QA Phase 2 audit (17 production lines). The fixer's controls were hand-written |

**Effect.** Every lesson that applied reached the chains through a brief, as in batch c. None is in a definition yet, as far as this
corpus shows. Batch c's lesson 5 ("a lesson carried by a brief works once per brief") holds again.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

Neither chain ran UAT. The fixer's red, green and control runs and the reviewer's reproduction ran by script (`controls/run.py`,
vitest in exports). What ran by hand, in a browser, or was put to the owner:

| Chain | Check | Driven by | Time | Cost (cc-usage rows) | How it could run unattended |
|---|---|---|---|---|---|
| 3c | Eight fixtures posted to the test server, each read by two readers through S1's code | fixer, by script (`diagnosis/post-fixtures.py`, `read-s1.mjs`) | about 10:22Z to 10:27Z | in the fixer's $2.33 | Already scripted. The one hand step was checking `mentions` on the first mention fixture. An assertion in `post-fixtures.py` that a mention fixture comes back with a non-empty `mentions` would make that automatic |
| 3c | Production read: two direct `GET message.getFromUrl` calls on hooks.gg as the test account | QA in the stage browser | 10:29Z to 10:36Z, about 4 minutes of it waiting for the profile lock | QA $1.68 in total | One authenticated GET per link needs only the session cookie. A scripted runner step with prediction and falsifier as data would run it, and handoff 8e9ccc47's owed re-read is that same step |
| 4 | Pre-release walk of flows 1 to 4 at `b68f94c` and `b663b35` (S0 to S8), plus QA's own leave-prompt runs A to C | QA, through a `browser-walker` helper | 11:14Z to 11:25Z | QA $6.43 in the release window, of it `browser-walker` $0.73 (QA's row also carries the release-tip record and the baseline) | The steps are already captured as `walk/{base,fix}-S*.json`, and `serve.sh` builds both servers. A pinned runner that takes a steps file and reports pass or fail per step would replay it. No such runner exists: `agent-output/tools/` has none (listing), and `stage-procedures/agent-browser.md` names none (`grep -n -i runner`, no hit). This is the 2026-11-20 batch's pending Recommendation 6, sighted in both chains here (Recommendation 3) |
| 4 | P-1 baseline on production before the push, message 6008 | QA in the stage browser | 11:28:12Z to 11:29:32Z | in QA's $6.43 | The same runner, with production as the target and no Save as a hard rule of the step file |
| 4 | P-1 after-read on production, and the draft cleanup | QA in the stage browser | 11:36:35Z to 11:37:33Z | QA $1.96 after the release (also covers handoff ffab0db5) | The same runner |
| 4 | Flows 5 to 7 | not walked: code, the reviewer's probe, `git diff --quiet` | — | — | Flow 5's empty-field half is one more runner step (open an empty embed description, reload, read the prompt) |
| both | The User-visible flows, quoted for his own check | the owner, optionally | unknown | unverifiable-by-construction | Each flow is a step of the same runner |

**Standing suites that now cover these surfaces** (named, not re-proposed): website
`src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx`,
`…/EmbedEditor/__tests__/EmbedAuthor.typed-name-reaches-embed.test.tsx` and `…/EmbedEditor/__tests__/EmbedFooter.typed-text-reaches-embed.test.tsx`
(10 cases). The real Slate typing path stays outside the suite by the environment-fidelity convention. Only a browser covers it.

## Lessons Learned

1. **A definition step that names a repository script inherits whatever that script does.** "Run its lint script" is safe in a
   repository whose lint is read-only, and it rewrites the shared tree in one whose lint carries `--fix`.
2. **A restore from `HEAD` is a revert on a shared tree.** `git show HEAD:<path> > <path>` discards every hunk in that path,
   including another session's. It is safe only when that path's pre-run state was the session's own or clean, and the porcelain read
   that showed this belongs in the disclosure (the fixer's did include it).
3. **Diagnose-first pays when the hypothesis has a cheap discriminator.** A second reader with the intent turned "an inference" into a
   two-sided measurement in about six minutes. The chain cost $4.01, and it wrote no code that would have been wrong.
4. **A baseline before the push is a test of the instrument as well as the old behaviour.** Here it found an inaccessible precondition
   (6024) and a pre-existing defect (ffab0db5) while both could still go into the release prompt.
5. **Read a fixture's own response for its precondition before using it as evidence.** `mentions: []` on a "mention" fixture is the
   difference between a fixture and a control.
6. **A disclosure without the command cannot improve the control.** Two record writes passed the gate in this batch. The documents
   say only "a shell heredoc" and "a Python `open().write`".
7. **A cost quoted in an owner option is a measurement or a labelled guess.** 30 to 60 minutes was quoted, 11 minutes was measured,
   and a 15-minute precedent was in batch c.

## Recommendations (each naming the file it would change)

1. **The fixer's lint step never writes the tree.** Files: `~/.claude/agents/fixer.md` (step 5, "the repository's linter (its lint
   script…)"); the matching lint step in `~/.claude/agents/code-reviewer.md` and `qa.md` where they run one (not read here); and
   `agent-output/CLAUDE.md`, the website section (the record owner's).
   - Where the lint script carries `--fix` (website: `eslint --fix . --max-warnings=0`), the stage runs the config directly over the
     changed files without `--fix`: `npx eslint <files> --max-warnings=0`. That is what the fixer did after the accident.
   - A restore of foreign paths from `HEAD` is never the remedy. A stage that rewrote foreign paths reports them to steering, with the
     porcelain read from before its run, and steering decides.
   - *Sighted:* chain 4, about 10:58Z, 78 files (`verification/fix-desktop-draft-as-typed/lint-fix-accident-files.txt`).
2. **A disclosed shell write of a record document quotes the command, and the gate learns the form.** Files:
   `~/.claude/tools/record-write-gate-hook.js` and its test (a case for each form once quoted); `~/.claude/agents/steering.md` and
   `qa.md` only as far as they restate the lifecycle's "each with its command quoted" (`references/claims.md`, Lodge in the round).
   - The rule exists, and two disclosures in this batch did not follow it.
   - The gate is a heuristic by its own header ("A heuristic over shell text"). Its judged forms include `>`/`>>` redirects and
     `python` one-liners with `open(…'w')`. Whether the two writes escaped through a variable-held path, a multi-line script, or
     something else cannot be read from the documents.
   - *Sighted:* chain 3c QA (heredoc, closure 10:39); chain 4 steering (Python `open().write`, block 11:39Z). Both were corrected with
     the Edit tool in the same round.
3. **Build the scripted browser runner.** Files: a new tool, in `agent-output/tools/` (the record owner's) or `~/.claude/tools/`, and
   `~/.claude/agent-skills/stage-procedures/agent-browser.md` (which names none).
   - It takes a steps file (URL, actions, reads, prediction, falsifier, forbidden actions such as Save) and reports pass or fail per
     step. Its captures go to `verification/<chain>/`.
   - This is the 2026-11-20 batch's pending Recommendation 6, sighted in batch c and now in both chains here. That makes four browser
     reads in this batch (3c's production read; chain 4's walk, baseline and after-read), each driven by hand or by a `browser-walker`
     helper from prose steps.
   - Chain 4's walker needed correcting twice: a dialog handler left attached, and a selector that found nothing. A runner with a fresh
     page per step and selectors as data removes both.
4. **Lift `serve.sh` and `build-tip.sh` into record tools, writing `.txt`.** Files: `verification/fix-desktop-draft-as-typed/qa/serve.sh`
   (line 24, `dev.log`) and `…/devops/build-tip.sh` (line 22, `build.log`), lifted into `agent-output/tools/` (the record owner's).
   - This is batch c's Recommendation 5, sighted again. `build-tip.sh` now has six copies under `verification/*/devops/` (`ls -d`:
     `016`, `fix-desktop-draft-as-typed`, `fix-get-one-absent-not-found`, `fix-personal-message-access`, `fix-recent-message-ids`,
     `fix-website-save-gate-embeds`), and `serve.sh` is new.
   - `qa/closed/fix-desktop-draft-as-typed-qa.md` line 45 cites a `dev.log` that is not in the repository.
5. **A pre-release browser walk of shipped client behaviour runs on the tip's production build where devops builds it anyway.** Files:
   `~/.claude/agents/qa.md` (walk set-up) and `~/.claude/agents/devops.md` (Phase 2A, Packaging: keep the export and serve it,
   `next start`, for QA's walk).
   - This is a narrower form of batch c's Recommendation 4. It applies to any claim about what the browser does with the built bundle,
     not only to module identity.
   - *Sighted:* chain 4. The walk was on `next dev`, the build was unserved, and P-1 confirmed on production.
6. **A claim about another chain's release is lodged in the record with the read that established it.** File:
   `~/.claude/agents/devops.md` (Phase 2D, the sibling-chain note).
   - The claim names the repository it read, by `git remote get-url`, and the ancestry read. A message alone does not carry it.
   - *Sighted:* chain 4's devops message (two other repositories' chains "need a rebase"). Steering refuted it from the mechanism
     (rulings, block 11:36Z).
7. **A time or cost in an owner option cites a measured precedent or says it is a guess.** File: `~/.claude/agents/steering.md`
   (Prompting the owner).
   - *Sighted:* the 11:13Z option ("roughly 30-60 minutes", against 11 measured; the 15-minute precedent was in batch c's Testing by
     Hand). Batch c's lesson 6 is the mirror case.
8. **A scope statement's fixture list is checked against its own poster rule.** File: `~/.claude/agents/steering.md` (scoping
   determination, diagnose-first form).
   - Each listed fixture names a poster that the stated permissions allow, or the list drops the fixture and the determination says
     why.
   - *Sighted:* chain 3c, the "bot itself authored" fixture, which needed the Hooks.gg token. The scope allowed "test bot or a test
     webhook" only.

**Sightings for pending recommendations of `retrospectives/fixer-batch-2026-11-21-c-retrospective.md`** (`Active`, read at 15:3xZ):
- **Rec 1** (release-independent limb and baseline before the push): applied in chain 4 through its brief (table above).
- **Rec 4** (serve the tip build): not triggered; its narrower form is this batch's Recommendation 5.
- **Rec 5** (captures are not `*.log`): sighted again (Recommendation 4).
- **Rec 7** (lift the real-postgres harness; the brief's database line): no database in either chain. The "fake kysely driver" clause
  is gone from both common briefs. No new harness copy.
- **Recs 2, 3 and 6:** no Phase 2 audit in this batch to sight them, except Rec 3's form in chain 4's consumer table.

**Not proposed:** the known limit in chain 3c and the link-embed choice (both his rulings); the extra pre-release walk in chain 4 (his
selection).

No recommendation is for the effort's next chain alone, so no handoff is created in this run.

## Cost

Each figure was taken with `python3 ~/.claude/tools/cc-usage.py chain <suffix> --since <determination> --until <release, or closure,
rounded up to the minute>`. The outputs are in `verification/fixes-2026-11-21-steering-hooks-3/cost/`. Every chain session was resolved
from the registry cache ("live entry gone"), and none was unrecoverable. Subagent usage is filed under its parent row. Production lines
come from `git -C website diff --numstat b663b35 b68f94c -- src ':!**/__tests__/**'` (`cost/numstat-4.txt`; `-w` gives the same).

**Chain 3c** (`chain fix-message-link-import-empty --since 2026-11-21T10:20 --until 2026-11-21T10:41`, `cost/chain-3c.txt`)
- Session set: fixer $2.33, qa $1.68. **Total $4.01.**
- No code and no production lines, so there is no per-line figure. The chain bought a cause, a production confirmation and a known-limit
  carrier, and no code had to be reverted.

**Chain 4** (`chain fix-desktop-draft-as-typed --since 2026-11-21T10:43 --until 2026-11-21T11:34`, `cost/chain-4.txt`)
- Session set: fixer $4.70, code-reviewer $2.40, qa $6.43 (own $5.70, `browser-walker` $0.73), devops $2.02 (Sonnet). **Total
  $15.55.**
- After the release (`--since 11:34 --until 11:40`, `cost/chain-4-post-release.txt`): qa $1.96 (P-1 and handoff ffab0db5), devops $0.59
  (closure). Total $2.56.
- Production lines: 17 (`Desktop.tsx` +4, `EmbedAuthor.tsx` +8, `EmbedFooter.tsx` +5). **$0.91 per production line.** About 8 of the
  17 are the fix and the rest are a style commit (code review, Stage start), which makes it about $1.94 per line of fix.
- The pre-release walk, the stage his 11:13Z selection added, is inside QA's $6.43, together with the release-tip record and the
  baseline. The documents do not split it.

**Steering** (`chain steering-hooks --since 2026-11-21T10:20 --until 2026-11-21T11:40`, `cost/steering.txt`): four sessions matched.
- `c9d29d3a` (seen 09:49:50Z), $6.74: own $3.43, `retrospective` $2.19, `deweeder` $1.04, `general-purpose-sonnet` $0.09. The
  retrospective and deweeder rows are batch c's retrospective and scoring (effort rulings, blocks 10:22Z and 10:28Z), not these chains.
  The Sonnet helper is consistent with chain 3c's refutation helper (rulings, block 10:38Z). The rest is chain 3c's steering and the
  batch c follow-up, and it cannot be split by chain.
- `09d0a152` (seen 10:41:37Z), $5.95: own $5.56, `general-purpose-sonnet` $0.38. This is chain 4's steering, from the determination to
  closure, plus chain 3c's last closure minutes.
- `7f338190` (seen 05:30:41Z) shows $0.00 in the window: an earlier session of this thread, outside these chains. `015af98a` (seen
  13:41:10Z) shows $0.00 in the window: a later session of this thread, this document's spawner, reported out of the chains.
- The coordinator, `steering-coordinator`, was not read. No session outside the two chain families and steering was read.

**Batch:** $19.56 for role sessions in window ($4.01 + $15.55). That excludes post-release work ($2.56) and steering (about $12.69
in window, partly other work).

## Handoff

- **Architect: recommended, through `INBOX.md` (steering's to lodge).** Message reads with the bot token return blank `content`, embeds
  and components for any message Hooks.gg did not write and that does not mention it, because the app holds neither Message Content flag
  (diagnosis `1c5541fd`; production read `96bd1c17`). `architecture/system-architecture.md` line 135 describes `message.getFromUrl`'s
  guild binding but not this limit. `grep -n -i 'message content\|privileged'` over `architecture/*.md` and `INBOX.md` finds nothing.
  It is a standing property of every bot-token message read, not only the Message Link import. Handoff 8e9ccc47 carries it for this one
  route only.
- **For steering, found while reading (not this stage's to fix):**
  - `qa/closed/fix-desktop-draft-as-typed-qa.md` line 45 cites `dev.log` beside `qa/fix/meta.txt` and `qa/base/meta.txt`. The file is
    ignored and untracked (`git ls-files` lists no `.log` under `verification/fix-desktop-draft-as-typed/`). This is an `INBOX.md` item
    for the record owner, as batch c's `build.log` item was.
  - The lint-accident restore (Recommendation 1) touched 75 files in website's shared tree at about 10:58Z. The fixer's porcelain read
    shows that none held a foreign hunk. Nothing is owed. It is named so that steering can judge whether the hazard belongs in this
    thread's `hazards.md` before pi runs.
- **Open carriers this batch leaves, read at write time:** `handoff/message-link-import-loads-only-mentioning-messages-2026-11-21.md`
  (8e9ccc47, `Open`, Owning-Stage steering-hooks, trigger: the intent is granted);
  `handoff/fix-desktop-draft-as-typed-residue-2026-11-21.md` (9e2b7c14, `Open`, planner);
  `handoff/typed-back-edit-leaves-saved-message-draft-2026-11-21.md` (ffab0db5, `Open`, planner). Later documents are authoritative on
  their state.
- **Roadmap:** none owed. The determinations name no epic.
- **Next:** pi, on the owner's word only, for the recommendations above.
