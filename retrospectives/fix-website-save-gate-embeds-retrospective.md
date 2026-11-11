---
ID: n/a
Origin: fix-website-save-gate-embeds
UUID: 07e578ce
Status: Active
---

# Retrospective: fix-website-save-gate-embeds

**Plan Reference**: none (fixer chain). The chain source is `implementation/closed/fix-website-save-gate-embeds-implementation.md`, and ID, Origin and UUID are inherited from it. The scope is in `steering/queue-hooks-rulings.md`.
**Date**: 2026-11-11
**Retrospective Facilitator**: retrospective (`retrospective-fix-website-save-gate-embeds`, a subagent of `steering-queue-hooks`)

## Changelog
| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T10:23 | steering-queue-hooks (spawn brief) | Retrospective of the released fixer chain | Written from the documents, briefs, ledger, commits and captures. Cost readout taken. Value delivered: YES, with the hooks.gg observation still the owner's. Eight recommendations, each naming a file. No handoff created. |

## Summary

**Corpus**. This retrospective can read the following:
- the five closed stage documents: implementation, code review, QA Phase 2, release-tip QA and deployment;
- the rulings file, read whole at write time; the chain's blocks are the ones the spawn brief lists, and the rest is context;
- the selection-ledger day file `steering/selection-ledger/2026-11-11.md` (uncommitted, by rule), blocks 08:28Z, 09:03Z, 09:09Z, 09:23Z, 10:10Z and 10:13Z;
- the four briefs `steering/queue-hooks-briefs/*-save-gate-embeds-brief.md`;
- the handoff the chain created, and the dated notes it left on three others;
- the captures under `verification/fix-website-save-gate-embeds/`, read only where cited below;
- the website history `6d78b19..0e3d903` (`git log`, `git diff --numstat`) and the record's history;
- `architecture/system-architecture.md` and `architecture/website.md`;
- the record tool `tools/uat-local-stack.sh`, `~/.claude/tools/stamp-gate-hook.js`, `~/.claude/settings.json` and `~/.claude/agents/INBOX.md`, all read for one fact each;
- the `cc-usage.py` readouts.

The record has no roadmap document, so none is cited.

It cannot read the following:
- the content of any SendMessage, except where a document quotes it or gives its id (`f757a3cd`, `bfcd2b1d`);
- session transcripts, and so the reasoning behind any act a document does not record;
- the owner's answer to the fixer's folder-trust prompt, and how long that prompt waited;
- anything that happened on hooks.gg or Vercel after the push;
- any ruling given in conversation and not written down;
- whether a stage ran a check it does not record.

Anything outside the corpus is unverifiable by construction here. It is not refuted.

**Value Statement**: There is no plan, so the value statement is the scope statement in force (rulings 09:04Z, extended at 09:23Z and 09:27Z). *A draft holding V2 components beside embeds that are all empty is saved as V2 without those embeds, with no prompt. The two JSON surfaces behave as at `6d78b19`.* In addition, *the editor's two persisting writers, `saveMessage` and `commitSaveChoice`, share one save step that stores the resolved data and sets the editor's message to it*, and its mode.

**Value Delivered**: YES. Website `master` was moved to `0e3d903` at 10:13Z (`release-move.js` exit 0; `ls-remote` read back). QA walked every flow in a running local build, with a red at the base tree (B1, B2). One part is not observed: behaviour on hooks.gg itself, including whether hooks.gg's Pusher delivers the save event to the saver. That check is the owner's, and `handoff/save-gate-embeds-owner-checks-on-hooks-gg-2026-11-11.md` carries it.

**Implementation Duration**: From the owner's selection 7 at 08:28Z (scoping) to the push at 10:13Z: 1 h 45 min. A fixer chain has no UAT.

**Overall Assessment**: The chain shipped a correct, well-tested fix within two hours. The gates did their jobs. Code review caught a misread owner ruling (CR-1) and a latent HIGH in shipped code (CR-4). QA's mutation sweep caught an unasserted guard (QAF-1), and its walk found a hazard in local testing. That hazard became a standing rule in the same hour (selection 16).

The main cost was one wasted fixer and review round. It came from steering framing the defect without reading the decision record that governs it. That record was on file in `system-architecture.md` D-004. The second process weakness is that the record's existing local-stack tool went unused: two stages rebuilt the same environment by hand.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Went well

- **Steering lodged its own errors in the round they happened.** "This thread's error" appears for prompt 5 (W-2 unread) and for prompt 7 and the first scope statement (D17 unread). "Reconcile" notes cover three typed timestamps. Because of this, the drift below can be dated from the record rather than reconstructed.
- **Each widening of scope went to the owner with its cost.** Selection 13 offered three Save rules, and each one priced the extra fixer round. Selection 15 put `commitSaveChoice`, a shipped path, as a rider. It said this changes shipped behaviour and that it was not shown to explain his 2026-08-25 report. Mechanism questions stayed inside the agreed scope and were not escalated. The fixer's BLOCKED on the editor's mode was ruled from selection 15's own words within a minute (09:26Z to 09:27Z), and the ruling is recorded so he can veto it.
- **Code review paid for itself twice.**
  - CR-1 found that the first fix moved 144 of 800 resolver cells on two JSON surfaces, which overrode an owner ruling (D17). The reviewer measured this with a differential. It was not an opinion.
  - CR-4 found that Save stored data the editor did not hold. The same flaw was in `commitSaveChoice`, shipped by chain 013. The reviewer showed it with its own model (`save-echo-hash.txt`) before any browser was involved, and QA later confirmed it in a browser (B2, the base-tree red).
- **Most guards were checked by mutation before QA.** The fixer's red table covers four trees and four mutations, each red with exit 1. QA's independent sweep (22 mutants, 19 killed, every count checked) then found the one guard nobody had checked (QAF-1). QA closed it with a test-only commit, and the reviewer gave that commit a scoped check before devops asked to release. The devops brief made that check a condition of the ask, and devops waited for it.
- **The browser walk had a red control.** The base-tree runs B1 and B2 show the instrument can see the prompt and the refusal. That makes the tip's "no prompt" a real result rather than a blind spot.
- **A hazard found during testing became a standing rule the same day.** QA found that a local save publishes to `.env.local`'s Pusher app, on a channel keyed by a low message id. Its inbox entry led to selection 16, and by 10:10Z the rule was in the workspace `CLAUDE.md`.
- **Release discipline held.** Devops read the deploy mechanism from the repo and named the Vercel premise as an accepted risk. It dry-ran the reverse patch and validated the owner's live-database query against 6 positive and 9 negative controls. It put the release ask in its own session. The owner's checks went to a routed handoff and did not hold the record open.

### Didn't go well

- **The direction of the fix was set before the ruling that governs it was read.** This was the costly miss.
  - Prompt 7 (08:28Z) and the first scope statement framed the defect as "no choice shown". The brief told the fixer to show one, and to read W-1, W-2 and D-005.
  - The ruling that decides the direction is plan 013 D17: "fail gracefully when no content will be lost". It is restated in the architecture record at `system-architecture.md` D-004 (the "five-row table … ruled 2026-08-24 as D17" sentence). Neither the brief nor any stage read D-004.
  - The fixer built what the brief asked for (`460000b`), and review rejected it on CR-1.
  - Cost: the whole first pass, 08:35Z to 09:04Z, and one fixer and one review session's work on a direction that was then reversed.
  - In the same hour, prompt 5 offered "scope a fix" for a server gate that W-2 rules out. That was caught before any stage started.
  - Both are the same class: an owner prompt that offers "scope a fix" on a surface a recorded decision already governs, written before that decision is read.
- **Steering saw the drift at 08:46Z and passed it on as a review candidate.** The fixer's User-visible flows said the JSON surfaces would now show the choice. Steering raised this itself and put it to the reviewer. The D17 read that settled it at 09:04Z was available at 08:46Z. Holding the fixer then would have saved the review of `460000b`, about 12 minutes of a reviewer's time.
- **Stages did not read the architecture entries their briefs named.** The fixer's document records: "Not read: `architecture/website.md` W-1/W-2 and `system-architecture.md` D-005. I used them only as the brief and the block state them." QA's document records the same. The fixer brief, under "What to read", lists exactly those entries. Neither miss caused a defect here, because the scope statements quoted the rules. But it shows a brief's read list is followed only as far as the stage chooses. It also left the one entry that mattered, D-004, unreachable by any stage.
- **The first CR-4 test could not see what CR-4 breaks.** `useApiMethods.save-empty-embeds.test.tsx` (`4b9fadd`) mounted the bare hook with `setMessage: () => {}`, so it could not observe the editor's held message. That is exactly the state CR-4 concerns. The reviewer found the flaw by modelling it, not from a failing test. The fix was a real `MessageProvider` mount. That was the second replacement of the test file in two rounds (`abdb71b`, then `963a25c`).
- **One guard of the fixer's own helper had no mutation.** `dropEmptyEmbedsBesideV2` has three guards: V2 present, embeds present, and content. The fixer's red table mutated two of them. The third, the `!draft.embeds || draft.embeds.length === 0` return, was unasserted: deleting it left the suite green while every Save of V2 without an `embeds` key would throw (QAF-1). QA noted that a Phase 1 strategy written from the `Partial` contract would have named that input. A fixer chain has no Phase 1, so the fixer's own mutation set is the only place it could have been caught earlier.
- **The record's local-stack tool went unused, so two stages rebuilt the environment by hand.**
  - `tools/uat-local-stack.sh` has existed since 2026-11-10 (PI006). It runs a `postgres:16` container named `hooks-postgres-local` on `.env.local`'s loopback URL and pushes the schema.
  - QA built a container with that exact name, by hand. Devops built a second throwaway Postgres on port 55432, also by hand.
  - No chain document names the tool (`grep -c uat-local-stack` gives 0 for the QA and deployment documents). Neither does `qa.md` or `stage-procedures/agent-browser.md`. The only places that do are chain 015's closed UAT and retrospective and the PI006 record.
  - The tool also does not perform the sequence restart that the new `CLAUDE.md` rule now requires (`grep -c 'Messages_id_seq\|RESTART'` gives 0).
- **Typed timestamps got past the stamp gate three times, and each was found later by hand.**
  - The handoff row stamped 09:05 against its commit at 09:04:30Z.
  - The rulings heading "09:10Z", written at 09:09:53Z.
  - The 10:08Z block and devops brief, written as 10:09Z and 10:10Z at 10:08:43Z.
  - All three were within `stamp-gate-hook.js`'s `SKEW_MS = 2 * 60 * 1000`. The gate did refuse the reviewer's typed stamp, which was further off. A minute-granular stamp taken from the clock is never ahead of the clock, so a two-minute allowance admits exactly the "estimated, a minute ahead" error this thread made.
- **A count in the review document does not match its own listing.** In the round-1 review (`d1af1b3`), CR-2 reads "8 real members" and "the 7 pre-existing members". The listing beside it names seven files, one of them new, so six are pre-existing. Steering's row on `handoff/website-tests-not-beside-their-module-2026-11-08.md` says "the same six files". The two documents disagree and neither notes it. The review document is closed. This is recorded here and not corrected, since it changes no disposition.

## Testing by Hand (QA and UAT: what ran by hand, its cost, how it could run unattended)

A fixer chain has no UAT. There were three hand-run segments.

1. **QA's local environment (by hand).** QA ran the following: a `postgres:16` container `hooks-postgres-local` on 127.0.0.1:5432, `prisma db push`, `ALTER SEQUENCE "Messages_id_seq" RESTART`, and `next dev --webpack` from two `git archive` exports (`963a25c`, then `6d78b19`). It signed in through Discord OAuth with `walk/signin.js`, seeded rows from three `seed*.sql` files, and tore everything down and confirmed by port and container checks.
   - Cost: inside QA's own row ($9.21 for the whole pass, 09:42Z to 10:02Z by its changelog). The record does not split out the environment's share.
   - **Unattended form:** `tools/uat-local-stack.sh up --seed` already does the container and the schema. What it lacks is the sequence restart and a way to start `next dev` from an export at a named SHA. Both are recommended below. This is not a new tool.
2. **QA's browser walk (scripted, driven by a helper).** `walk/save-scenario.js` already runs the steps and records the result: frames, dialogs, mode, held message and the send check. The `browser-walker` helper ran it for $0.48 over 18 requests (Sonnet). R1 was lost when a portal intercepted a click for 30 s, and R1b re-ran it. What was done by hand is that the expected values were judged per run in QA's table, not asserted by the script.
   - **Unattended form:** the editor's Save path has now been walked by chains 013, 015 and this one. A parameterised Save-flow runner would run tip and base trees and report pass or fail per row against stated expected values (prompt shown, held `embeds`, mode, send check). It would turn this walk into one call for the next chain on the save path, which is the send-check validity chain already scoped. Recommended below.
3. **Devops's throwaway Postgres (by hand)** on port 55432, used to validate the live-database query against 15 seeded rows. Cost: inside devops's $1.36. **Unattended form:** the same tool with `ULS_*` overrides, plus the query and its controls kept as a record fixture. Neither needs new code beyond item 1's.

**Checks put to the owner.** These are the hooks.gg check of the Save flows (which closes QA's Pusher assumption) and the optional live-database read. Both are his by construction. No agent saves on production or reads its database, so there is no unattended form within the current rules. The only alternative is a test-account save on hooks.gg, which writes to production and is his decision. It is not proposed here.

**Already covered by standing suites, not re-proposed:** the resolver partition (the 800-cell differential is a reviewer probe, and the two `conflict-resting-state` cases are in the suite), the save-step write-back and mode (`MessageProvider.save-step.test.tsx`), and the embeds-absent guard (QA's case in `utils.disposition-resolver.test.ts`).

## Lessons Learned

1. **A "scope a fix" option is a claim about direction, so its premise includes the decision record for that surface.** On this chain the only rework came from a framing written before D17 (D-004) was read. The architecture record had already absorbed the ruling, and a grep of `system-architecture.md` for the predicate names reaches it.
2. **A test that stubs the state it is meant to protect cannot fail for the defect.** CR-4 was invisible to a bare hook with no-op setters and visible to a real provider mount. The repo's `helpers/mountMessageProvider` already existed, and the round-1 review named it.
3. **On a route with no Phase 1, the fixer's mutation set stands in for the strategy.** One mutation per added guard clause would have caught QAF-1 before review.
4. **A tool nobody names is not used.** The 015 retrospective's local-stack recommendation produced a tested tool in one day. One day later, two stages rebuilt the same environment by hand, because no definition, procedure or workspace convention points at it.
5. **A tolerance in a gate defines the error that gets through.** A two-minute skew passes exactly the stamps that are estimated a minute ahead.
6. **A hazard found during a test belongs in the convention file the same day.** Selection 16 was put, answered and enacted within ten minutes of QA's report. Before that, chain 015's walks saved messages 1 to 6 under the same hazard and nobody recorded it. Whether a production user saw a prompt then is unverifiable by construction.

## Recommendations (each naming the file it would change)

Each of these reaches its stage through pi, on the owner's scheduling.

| # | Change | File | Evidence |
|---|---|---|---|
| R1 | Before an owner prompt offers "re-check, scope a fix" or a scope statement names a direction, steering greps the architecture record (`system-architecture.md` Decisions, `website.md`) and the closed plans' decision registers for the symbols in scope. It reads every hit that rules a direction, and cites the hit in the prompt's premises. The brief's "What to read" names those entries. | `~/.claude/agents/steering.md` (scoping determination and owner-prompt premises) | Prompt 5 (W-2) and prompt 7 (D17 in D-004), both "This thread's error". One fixer and review round lost, 08:35Z to 09:04Z. |
| R2 | Before choosing a fix's direction, the fixer reads the brief's named architecture entries at the file, and greps the architecture record for the symbols it will change. It records each hit read. "Used only as the brief states them" is a deviation the document names, not a read. | `~/.claude/agents/fixer.md` | Implementation document, Entry Conditions: "Not read: … W-1/W-2 … D-005". D-004 (`system-architecture.md` line 241 at agent-output `1f7c9e4`) names `validateContentRequirements`, an in-scope symbol from the brief, beside D17: `grep -n validateContentRequirements architecture/system-architecture.md` reaches it. |
| R3 | The fixer's red table carries one mutation per guard clause the diff adds (each condition of an early return), not only the ones its new cases target. | `~/.claude/agents/fixer.md` (Test section) | QAF-1: the embeds-present guard of `dropEmptyEmbedsBesideV2` had no mutation. Mutants 6 and 8 survived QA's sweep at `963a25c`. |
| R4 | Test Conventions, DOM component tests: a test of a hook that writes provider state mounts the real provider (`helpers/mountMessageProvider`), never the bare hook with no-op setters, because a no-op setter cannot observe the state the hook writes. | `agent-output/CLAUDE.md` (canonical workspace conventions) | CR-4 at `4b9fadd`: `setMessage: () => {}` in `useApiMethods.save-empty-embeds.test.tsx`. The defect was found by the reviewer's model, and the test was replaced twice. |
| R5 | `up` restarts `Messages_id_seq` at 900000000000001 after the schema push, and `status` prints the sequence's next value. Optionally, a `serve <sha>` verb starts `next dev` from a `git archive` export and stops it on `down`. | `agent-output/tools/uat-local-stack.sh` (and its test `tools/uatLocalStack.test.js`) | The `CLAUDE.md` "Local builds" rule (selection 16). `grep -c 'Messages_id_seq\|RESTART'` over the tool gives 0. |
| R6 | Name `tools/uat-local-stack.sh` as the way to stand up a local database for a website walk, in the "Local builds of `website`" section, and in the browser procedure that QA and UAT read before a walk. | `agent-output/CLAUDE.md`; `~/.claude/agent-skills/stage-procedures/agent-browser.md` | QA and devops each built Postgres by hand, and QA used the tool's own container name. 0 mentions in `qa.md`, `agent-browser.md` and both chain documents. |
| R7 | Lower `SKEW_MS` from two minutes to a few seconds. A `HH:MM` stamp taken from `date -u` is never ahead of the clock, so any stamp in the future was typed. | `~/.claude/tools/stamp-gate-hook.js` | Three steering stamps 7 s to 2 min ahead passed the gate and were reconciled by hand (rulings 09:17Z and 10:09Z notes; handoff row 09:15). |
| R8 | Promote `walk/save-scenario.js` into a parameterised Save-flow runner (tree SHA, stored shape, act, expected values) that reports pass or fail per row. Point QA at it for any chain touching the editor's persisting writers. | new `agent-output/tools/` runner; `~/.claude/agents/qa.md` names it | This chain's R1b to R4 and B1 to B2 table, judged by hand. The Save path was walked by 013, 015 and this chain, and the send-check validity chain is next on the surface. |

Already routed, not re-proposed: `mutation-run.py`'s `--configLoader runner` versus `__dirname` limit (`~/.claude/agents/INBOX.md`, the entry citing `sweep-attempt1-control-failed/`).

## Cost

Readout: `python3 ~/.claude/tools/cc-usage.py chain fix-website-save-gate-embeds --since 2026-11-11T08:26 --until 2026-11-11T10:13` (exit 0, raw output read from a file).

| Session | Model | Requests | $ |
|---|---|---|---|
| `fixer-fix-website-save-gate-embeds` | Opus | 134 | 9.27 |
| `code-reviewer-fix-website-save-gate-embeds` | Opus | 102 | 6.89 |
| `qa-fix-website-save-gate-embeds` (own 137 requests, $9.21; subagents `browser-walker` 18 requests, $0.48 Sonnet, and `general-purpose` 19 requests, $0.02 Haiku) | Opus, Sonnet, Haiku | 174 | 9.70 |
| `devops-fix-website-save-gate-embeds` | Sonnet | 31 | 1.36 |
| **Chain family total** | | 441 | **27.22** |

All four sessions resolved from the registry cache (live entries gone). None is unrecoverable. No session in the window has a `seen` stamp predating the chain.

**Outside the family form.** The steering thread `steering-queue-hooks`, readout `chain queue-hooks` over the same window, comes to $44.17 over two session ids:
- `2806d0d2`, before the 09:14Z clear: $25.55, including the three re-check helpers, `general-purpose-sonnet`, 20 requests, $0.32;
- `fac7c263`, after the clear: $18.61.

That row also carries the thread's other work in the window and cannot be split by the instrument: queue selections 1 to 6 and 8 to 10, the two researcher documents, selections 11, 12, 14 and 16, and the send-check scoping determination. This retrospective started after 10:17Z and is outside the window. `researcher-hooks-text-limit` ($32.05) is not this chain's work.

**Per added production line.** `git -C website diff --numstat 6d78b19 0e3d903`, production paths only (`__tests__` excluded): `index.ts` 19, `useApiMethods.ts` 15, `MessageProvider/index.tsx` 8, `SaveAsMenu.tsx` 1, `NewMessageModal.tsx` 1, which is **44 added lines**. Test paths add 270.
- Chain family: $27.22 / 44 = **$0.62 per added production line**.
- With the whole steering window included, as an upper bound: $71.39 / 44 = $1.62.

## Handoff

- **Next: the architect.** The fix set up an invariant that the architecture record does not state. The editor's persisting writers go through one step (`useApiMethods` `persist`; `git grep -n "upsertMessage(" 963a25c -- src/providers` gives 1 hit, per the review). That step leaves the editor holding exactly what was stored, its mode included. A future writer that calls `upsertMessage` around it brings back CR-4's self-prompt. This is a candidate `website.md` A-entry (agent-designed, alongside A-1 to A-5). Devops's architecture-line read found nothing invalidated. It did not look for something new to record.
- **Then the roadmap stage,** once this document is closed.
- No handoff is created by this run. The recommendations are definition and tool changes for pi, and there is no follow-on chain of this effort.
- Owner-needing: nothing new. His two checks are already on `handoff/save-gate-embeds-owner-checks-on-hooks-gg-2026-11-11.md` and `OWNER-QUEUE.md`.
