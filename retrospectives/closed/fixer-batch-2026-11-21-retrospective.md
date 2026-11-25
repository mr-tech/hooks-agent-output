---
ID: n/a
Origin: fixer-batch-2026-11-21
UUID: 7997d4f2
Status: Processed
Status-Detail: "Processed by pi batch 38 on 2026-11-25: every recommendation is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder."
---

# Retrospective (fixer batch 2026-11-21): fix-message-page-header-decode, fix-trpc-batch-limit, fix-website-dependency-audit

**Plan Reference**: none (fixer chains). The chains' fixer documents:
- `implementation/closed/fix-message-page-header-decode-implementation.md` (chain 1)
- `implementation/closed/fix-trpc-batch-limit-implementation.md` (chain 2)
- `implementation/closed/fix-website-dependency-audit-implementation.md` (chain 3)

**Date**: 2026-11-21
**Retrospective Facilitator**: retrospective (`retrospective-hooks-fixer-batch-2026-11-21`, a subagent of `steering-roadmap-hooks`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T01:55 | steering-roadmap-hooks (spawn brief; rulings block 2026-11-21T01:45Z of `steering/fix-website-dependency-audit-rulings.md`) | Fixer-batch retrospective over chains 1 to 3 | Written from the documents. Cost read once per chain. Ten recommendations, each naming the file it would change, plus sightings for three pending recommendations of the 2026-11-20 batch. No handoff created. |
| 2026-11-25T22:25 | pi (pi-batch) | Document closed | Status: Processed. pi batch 38 extracted the recommendations: each is landed in the definitions, filed as a tools item, routed to a record inbox or declined with its reason, in batch 38's analysis and ledger in the statbot record's process-improvement folder. |

## Summary

**Corpus.**
- *Read whole:* `steering/website-deps-review-rulings.md` (blocks 01:59Z to 03:08Z and 23:44Z of 2026-11-20); `steering/fix-trpc-batch-limit-rulings.md`; `steering/fix-website-dependency-audit-rulings.md`; the common briefs of all three chains; the devops brief of chains 2 and 3, the code-reviewer brief of chain 2 and the QA brief of chain 3 (the other per-stage briefs were not read). Every closed stage document: chain 1's implementation, code review, security audit (header and run record), release-tip QA (`qa/closed/website-983681c-7923a1d-release-tip-qa.md`, its head and step 1b) and deployment; chain 2's implementation, code review and deployment; chain 3's implementation, code review, QA Phase 2 and deployment. The carriers `handoff/closed/message-page-header-decode-post-deploy-2026-11-20.md`, `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md`, `handoff/fix-website-dependency-audit-first-run-2026-11-21.md` and the shared source `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`. The selection ledgers `steering/selection-ledger/2026-11-20.md` (blocks 01:59Z, 02:03Z, 02:34Z, 23:58Z) and `2026-11-21.md` (whole; untracked, read and left as it is). `architecture/system-architecture.md` by grep for these chains' surfaces only. `~/.claude/agents/devops.md` Phase 2A by grep. The deweeder's tables under `verification/fixer-batch-2026-11-21/deweed/`, as they stood at 01:49Z.
- *Absent where it would be cited:* `agent-output/roadmap/` holds no roadmap document, so no epic is cited. None of the three determinations names one.
- *Not read:* the `verification/` captures, except the ones named below. The P1R and R1 scheduled readers' own transcripts.
- *Cannot be read:* rulings given in conversation and not lodged; message contents between sessions; whether the owner ran the "User-visible flows" the chain 1 and chain 2 fixers listed for him; anything a session corrected before its document was committed. Anything outside this corpus is unverifiable-by-construction here, not refuted.

**Value Statement** (each chain's scope statement):
- **1:** "change the one function so the header is no longer decoded by the library, plus a lockfile override of decode-uri-component to 0.5.1 or later", with `sanitize-html`, `@types/sanitize-html` and the direct `sharp` removed and `form-data` kept (his selections, rulings blocks 01:59Z and 02:03Z).
- **2:** a tRPC request naming more than one call is refused before any call runs; the redirect decision no longer rests on a client-settable `x-pathname`, and the dead `x-query-params` write goes; the ignored `overrides` key is deleted (bounded statement, `steering/fix-trpc-batch-limit-rulings.md` block 23:57Z).
- **3:** "a scheduled `pnpm audit --prod --json` over the released lockfile, joined with that file, so that a new entry is read by someone", writing to `INBOX.md` only (determination 23:59Z; his "record entry only", 23:58Z), widened at 00:19Z by a failure-streak entry and a stale-clone entry.

**Value Delivered**: YES for all three, with one read still owed in chains 2 and 3.
- **1:** released at 02:34:40Z. H-001 was closed by security on production builds of the base and the fix. Post-deploy row P-1 passed at 08:07:06Z, and its carrier is `Addressed` (re-read at write time). The override became moot when `query-string` left the tree. Steering recorded that as a mechanism choice inside agreed scope and reported it to the owner as moot (block 02:11Z; the release prompt says so).
- **2:** released at 00:45:05Z. Item 2's premise was corrected mid-chain: `Redirects/Server.tsx` is not mounted, so the `x-pathname` read decided nothing in production before or after. The fix closes the hole for any future mount. Whether any outside caller batches is still unknown. The carrier is `Open`, with an event trigger (re-read at write time).
- **3:** the crontab line was installed at 01:11Z and smoke-run under cron's environment (81 advisories, 0 undispositioned). The first scheduled run, 06:43Z, is carried by reader R1 on its handoff, `Open` at write time. Delivery is into an `INBOX.md` that the owner was told holds unprocessed entries back to 12 November (option text, ledger 23:58Z). He chose that destination knowingly.

**Implementation Duration** (determination to release):
- **1:** 2026-11-20T02:03Z to 02:34:40Z, 32 min. The release prompt was answered in under a minute.
- **2:** 2026-11-20T23:57Z to 2026-11-21T00:45:05Z, 48 min, over two rejected verdicts.
- **3:** 2026-11-20T23:59Z to 2026-11-21T01:11Z (crontab installed), 72 min, over two rejected review verdicts, one re-scope put to the owner, and one QA Failed.

**Overall Assessment**: all three delivered, quickly and with the owner's wait under two minutes per release.
- **Strength: independent instruments.** The quality came, again, from each stage building an instrument shaped differently from the author's:
  - in chain 2, the reviewer's batch-shape enumeration and devops's packaging build;
  - in chain 3, the reviewer's claim sweep and seed differential, and QA's coupling mutants.
- **Weakness 1: steering's premises.** Six premises went into determinations or briefs unread across all three chains. Steering named five of them itself, each with "the check that would have caught it".
- **Weakness 2: the record already held two facts that no stage read.** In chain 2, plan 017's X-13 and `system-architecture.md` line 213 each held a fact that would have prevented a failure later in the chain.
- **Gate inconsistency.** The release-tip gate was satisfied in two different ways in the same batch.

## What Went Well and What Didn't (process focus: workflow, collaboration, quality gates)

### Batch-level reads

- **Two chains ran side by side over shared ground without an incident.**
  - Chains 2 and 3 overlapped from 23:57Z to 00:52Z. Chain 2 held the website tree on its branch. Chain 3's brief told every stage to read website only through an export and never to switch it, and no stage reported a conflict.
  - Chain 3's reviewer saw record `HEAD` move under it from chain 2's commits and checked that its own paths were unchanged (code review 3, Tree identity).
  - Chain 2's release changed the website that chain 3 audits. QA 3 predicted the first run's line at `76da25c` rather than `d1bb9b0` (QA 3, register row B-1).
  - Chain 2's devops checked chain 3's `Handoff-At` in Phase 2D and recorded why the ancestry check did not apply (deployment 2, Phase 2D).
- **The owner was asked about one tool in three rounds.** The audit reached him at 23:44Z (plain, "yes to 1 and 2"), 23:58Z (where an advisory goes) and 00:19Z (failure visibility, and versions).
  - The 00:19Z failure question was foreseeable at 23:58Z. The determination's own "Not covered" already listed "whether `pnpm audit` needs network access the cron environment lacks" (block 23:59Z).
  - The late question cost one extra fix round, about 12 minutes: CR-1 was confirmed at 00:20Z, and the limbs at 00:32Z.
- **One owner question was put twice, on a premise error.** In chain 1, "Unused deps" was put at 01:59Z with "never used" taken from security's claim. It was re-put at 02:03Z after the scope sweep found `form-data` imported (block 02:03Z, recorded as this thread's error).
- **The same finding appeared in all three chains: a premise written without reading its source.**

| Chain | Premise as written | What the source said | Caught by | Record |
|---|---|---|---|---|
| 1 | three packages "never used" (owner question 01:59Z) | `form-data` imported by `bot/utils/DiscordMessage.ts:1` | the scope sweep, before the fixer started | rulings, block 02:03Z |
| 1 | the stage set (no release-tip verdict) | devops.md Phase 2A step 3 requires one for every release | devops, at Phase 2A | rulings, block 02:30Z |
| 2 | `Redirects/Server.tsx` "is mounted under `src/app/message/layout.tsx`" | `{/* <Server /> */}` in `Redirects/index.tsx` | the fixer | rulings, block 00:11Z |
| 2 | brief hazards with no test-placement hazard | plan 017 X-13: tests of `src/pages/api` modules stay out of that directory | devops's packaging build | rulings, block 00:32Z |
| 2 | "the 018 standing-risks handoff's trigger names these routes" (devops brief) | it names RK-3 and RK-5 only | devops | rulings, block 00:52Z |
| 3 | hazard 2, "at `d1bb9b0` the production audit holds no entry" (common brief) | `pnpm-audit-prod-d1bb9b0-disposition-summary.txt` line 1: "advisory entries in the audit: 81" | **no stage flagged it.** The fixer measured 81 by its own run and worked from that | found here: the brief's hazard 2 against that file's first line |

  Five of the six were named by steering as its own error, with the read that would have caught them. The sixth did no harm because its conclusion, "the first live run may write nothing", holds for another reason: every one of the 81 is dispositioned. The prior batch's Recommendation 3 (map the chosen option's text before sending) covers one member of this class. The class is wider: any premise in a determination, a brief hazard or an owner question.
- **The release-tip gate was satisfied two ways.**
  - In chain 1, devops held at Phase 2A step 3 for a release-tip QA verdict, and steering spawned a QA Phase 3 session. That session re-ran the suite, the typecheck and the red/green pair on `7923a1d`, the same SHA the reviewer had run (deployment 1, Release-Tip Verdict). `release-move.js` then ran with `--qa-record`.
  - In chain 2, the devops brief said "the verdict that gates the push is the review's `Reviewed-At`", and devops moved `master` with `--reason`, naming the code review at the tip (deployment 2, Pre-Release Verification).
  - devops.md line 109 admits `--reason` "where a Phase 2 verdict covers the tip". A code review is not a Phase 2 verdict. Neither document records the owner's word on which form holds for a fixer chain under 20 lines.
- **Stamp-gate refusals recur as before** (a typed time refused, re-stamped from the clock). There were five, each disclosed as satisfied: code review 1, deployment 1, code review 2, implementation 3 and code review 3.

### Chain 1 — fix-message-page-header-decode

**Went well**
- **The fix deleted rather than patched.** The fixer showed that the server-side `getMessage` result was discarded and that the share-code load runs client-side. It removed the path, and `decode-uri-component` left the lockfile with it: 43 packages out, 0 in, 0 version changes. Steering recorded the moot override as a ruling and did not re-ask.
- **Security exercised H-001 on production builds**, base and fix. That closed the check the determination had recorded as "not completed", and corrected the dependency review's development-build timings (security 1, run 1).
- **The scheduled reader refused a PASS it could not decide.** P1R's 04:07Z and 06:07Z fires both got `200 image/png` from the pre-push cache entry (`x-vercel-cache: HIT`, dated 02:18:15Z). Both were written "undecided, no PASS". The 08:07Z fire read an entry dated after the push and passed (P-1 carrier, rows 04:07 to 08:07).

**Didn't go well**
- **The pre-push read warmed the cache that the post-deploy read then hit.** Steering's pre-push GET at 02:18:15Z was the same URL as P-1's instrument. Vercel cached it with `max-age` 14400. So P-1 could not be decided until about 06:18Z, and was decided at 08:07:06Z, 332 minutes after the push. Had the images broken, the rollback question would have reached the owner hours late.
- **The stage set left out the release-tip verdict** (above). It cost a fourth stage session and a held release. That session, QA Phase 3, cost $1.80 in window, about four minutes from spawn at 02:30Z to its record at 02:33Z.
- **The same red/green pair ran four times on one tree**: fixer, code reviewer, security and QA Phase 3, all at `7923a1d`. The suite ran three times. Each run was correct for its stage. Together they say the gate design, not any stage, chose the repetition.
- **The reviewer declined `next build` and devops ran it.** The reviewer declined because "a build here pre-renders against `.env.local`" (code review 1, Runs). Devops built the same tip in a `git archive` export with no `.env` and `SKIP_ENV_VALIDATION=1` (deployment 1, Packaging). A safe form existed, and only one stage used it. In chain 2 that gap mattered.

### Chain 2 — fix-trpc-batch-limit

**Went well**
- **The fixer re-derived a premise and routed the correction.** `Server.tsx` is not mounted; the fixer's `git log -L` dates the commented-out mount to 2023. Steering recorded the correction before the reviewer started (block 00:11Z).
- **The reviewer enumerated the attack class and calibrated it at base.** It sent 11 request shapes that could carry more than one call, plus a control. At the fix, every `batch=1` shape got 400 with 0 database queries. At `d1bb9b0` the same shapes got 200 with 2 or 4 queries (code review 2, Adversarial execution).
- **CR-1 caught a test asserting on the wrong surface.** The no-batching case drove `proxy`, which has no production caller. The remedy mounts the real `TrpcProvider`, and two reviewer mutants make it fail as assertions, not timeouts.
- **Devops's packaging build caught a build break before the push**, and the reviewer then proved the check could fail: a test copied back under `src/pages/api/` exits 1 (code review 2, sub-entry 3).
- **The post-deploy read was reported as inconclusive, not as a pass.** It found that the signature as written cannot appear in production logs (deployment 2, Release Execution).

**Didn't go well**
- **Test placement broke `next build`, and no stage before devops ran the build.**
  - The fixer's Verification had no `next build` row ("My miss", implementation 2).
  - The reviewer's Round 1 said "Placement and naming conform", and CR-1's Minimum remedy put the second file in the breaking directory ("The miss is mine, in two places", code review 2, sub-entry 2).
  - The record already held the hazard: plan 017 X-13, and `steering/017-rulings.md` block 2026-11-18T23:24Z. The placement exception the Test Conventions need is the record owner's open decision (`INBOX.md`, "2026-11-18 — planner-hooks-017 — DECISION NEEDED").
  - This is the second chain to pay for it.
- **The Assumption Not Checked named a signature that cannot appear.** The review's falsity signature was 400s carrying "Batching is not enabled on the server" in production function logs. `[trpc].ts` logs errors only when `NODE_ENV` is `development`. `system-architecture.md` line 213 says so in its "Access refusals leave no always-on signal" row, and the chain's common brief cites "lines 213 and 234" by number. The read ran once, could not decide the question, and became a handoff with no scheduled reader, since no instrument is known that could see it.
- **The devops brief misdescribed a handoff's trigger** (above). Devops read the handoff whole and corrected the brief.
- **One capture was lost to the run's own cleanup.** A first count of the production log read crashed, and its raw file was deleted before the numbers were recorded. It was re-run, and devops disclosed it.
- **A record-write slip.** The reviewer appended its `INBOX.md` entry with a shell heredoc and disclosed it as a process slip (code review 2, Scope and identity). No gate refusal is recorded for it.

### Chain 3 — fix-website-dependency-audit

**Went well**
- **The reviewer's claim sweep found what the fixer's mutant set could not.** It listed 11 behavioural claims in the implementation document and the tool's `USAGE`, and matched each to a killed mutant or a covering case. CR-1 was the one with neither: append-before-state, "a duplicate is preferred to a lost report". At the next confirmation the same sweep found the class back in the new writer `recordFailure` (CR-4), introduced by the CR-2 fix. Closing CR-4 structurally (one `persist` writer) was the reviewer's Preferred remedy.
- **The seed was checked by a differently shaped instrument.** The reviewer's seed differential joins per installed version where the seed builds per key: 84 units, 0 differ (code review 3, Instruments).
- **QA's coupling mutants found four gaps behind 30 of 30 kills.** QA mutated each once-only guard on each sibling condition, in both polarities. The opposite-polarity mutants were killed, which shows the instrument worked. The four survivors were real (QAF-2). With the generated sweep (QAF-1, QAF-3 to QAF-5), that was 15 actionable survivors in a suite the fixer had measured at 30 of 30.
- **Steering answered a blocking question from the owner's own words.** The fixer's question on bare-module defaults was ruled from his 23:44Z and 23:58Z answers without asking him (block 00:01Z). The fixer kept working on the rest while blocked.
- **QA ran confined.** The sweep ran under `unshare -rn` with read-only roots, so a mutant that drops argument parsing could not write real state. The `EISDIR` fixtures were chosen to hold under root, as the review required.
- **The end step was carried, not waited on.** The first run was five hours out. Steering ruled the chain closes on a carrier with a scheduled reader. Devops installed reader R1 and ran `--smoke` (handoff 3).

**Didn't go well**
- **The fixer's hand-built mutant set read 100% three times while other instruments found survivors.**
  - The fixer's set scored 18/18 at `9fc299c`, 28/28 at `c7b6898` and 30/30 at `c5508c7`.
  - Against those, the reviewer's claim sweep found one unasserted property at `9fc299c` and one at `c7b6898` (CR-1, CR-4).
  - QA's generated and coupling set found 23 survivors at `c5508c7`, 15 of them actionable.
  - `hazards.md` records the same lesson from chain 013: a hand-built set measures the set.
  - `~/.claude/tools/mutant-gen.js` exists and QA used it. Run by the fixer before handoff, its generated half would have surfaced QAF-1, QAF-3, QAF-4 and QAF-5 one stage earlier. The QA round cost about 13 minutes, from QA Failed at 00:56Z to the refresh at 01:09Z.
- **A mid-chain re-scope** (above). CR-2's limbs, failure and staleness entries, became criteria growth after the first review.
- **A wrong hazard premise went unflagged** (table above).
- **A record-write pass-through recurred.** Steering's 01:45Z block discloses a python write to the leftovers handoff that "had gone through the shell unseen by the gate". The next attempt, a shell edit, was refused, and the correction was made with the Edit tool.

## Testing by Hand (QA, and UAT where the chain ran it: what ran by hand, its cost, how it could run unattended)

No chain ran UAT. Chain 1's QA (Phase 3) and chain 3's QA (Phase 2) were scripted end to end: vitest or `node --test`, `mutation-run.py` and `mutant-gen.js`, in exports. Chain 2 had no QA (2 production lines). What ran by hand, or was put to the owner:

| Chain | Check | Driven by | Time | Cost | How it could run unattended |
|---|---|---|---|---|---|
| 1 | Pre-push GET of production `/_next/image` | steering | 02:18:15Z, one request | within the steering row | It already is one request. The defect is its key: the post-deploy reader (P1R, already unattended) repeated the same URL and hit the entry this read had cached. Recommendation 7 |
| 1 | P-1, by scheduled reader P1R | cron + headless devops reader | 04:07Z, 06:07Z (both undecided), 08:07Z (PASS) | not read (reader sessions sit outside the chain's family) | Already unattended. Two of its three fires were spent waiting out a cache, and Recommendation 7 removes that |
| 1, 2 | "User-visible flows" listed for the owner's own check: three per chain, none a gate | owner, optionally | unknown | unverifiable-by-construction | Chain 1's flows 1 and 2 (a share-code load; `/message` pages signed in and out) and chain 2's three (`/message`, `/message?guild_id=`, `/message/m/…` saves) are steps for the pinned browser runner the 2026-11-20 retrospective proposed (its Recommendation 6, still pending). Not re-proposed here |
| 2 | Post-deploy production log read | devops | 00:48Z → 00:50Z, three CLI reads plus one re-run after a crashed count | within devops's post-release $0.85 | Not as specified: production writes no line for the refusal. What would make it readable unattended is the fix shape of `system-architecture.md` line 213, one content-free refusal line in production. That is product scope and his to open, so it is named, not recommended |
| 3 | Cron-environment smoke at `5d0baf8` | devops | 01:10Z, one command | within devops's $0.73 | Already a command. The first scheduled run is read by R1, unattended |

**The standing suites now cover:**
- in website, `src/server/api/__tests__/trpc.batch-refusal.test.ts`, `trpc.site-link.test.tsx` and `src/__tests__/middleware.request-headers.test.ts`;
- in the record, `tools/websiteDependencyAudit.test.js` (23 cases).

Chain 1's `Providers.request-headers.test.ts` was deleted by chain 2 once the header's only writer was gone (implementation 2, Change). These are named, not re-proposed.

**Test-case scoring** (steering's deweeder, tables at 01:49Z; the run was still going when this was written, and no cases or merged file had landed):
- `website.tsv`: 8 cases, 2 below 7 (ids 584, 1497, both `remove`, covered by 583 and 1496).
- `record.tsv`: 23 cases, 1 below 7 (id 20, `remove`, covering 12). Counts were computed with `python3 -I` and `csv.DictReader`, scores below 7.
- **One contradiction to check before any deletion.** Record id 20's reason reads "repeats the one-entry-per-streak behaviour with a state file that already holds a reported key; no plausible change fails it without failing case 10 or 12 first". That describes QA's QAF-2 case "adds one failure entry for a streak that starts after an advisory was reported". The id-to-title link is this retrospective's inference from the reason text: no cases file had landed to confirm it.
  - QA's kill table at `ead3ea1` names that case alone as the killer of `qa-coupling-marker-only-before-any-report` (`verification/fix-website-dependency-audit/qa/mutation-rows-survivors-at-ead3ea1.txt`, line 19).
  - That mutant SURVIVED at `c5508c7` with cases 10 and 12 present (QA 3, Survivors).
  - So a measured mutation fails case 20 without failing 10 or 12. Nothing is deleted on a score, and a deletion is a later chain's behind a mutation re-run. That re-run would show this.

## Lessons Learned

1. **A premise written without its read is the commonest defect in this batch, and it is steering's.** It appeared six times in three chains: an owner question, a stage set, a determination, two brief hazard lists and a devops brief. Every instance was cheap to check: the cited file's own lines, devops.md's Phase 2A, `Redirects/index.tsx`. Each was caught late or not at all.
2. **What the record already knows has to reach the brief, or each chain pays for it again.** X-13 had been recorded for two days and line 213 since the previous batch. Neither was in chain 2's hazard list, though the brief cited line 213 by number.
3. **A falsity signature is only as good as its instrument.** An Assumption Not Checked whose signature the production code cannot emit closes nothing. It turned a five-minute post-deploy read into an open handoff with no reader.
4. **A gate whose sufficient evidence is not written down gets satisfied differently each time.** The release-tip gate on a sub-20-line fixer chain produced one extra QA session in chain 1 and a brief-stated `--reason` in chain 2.
5. **An author's own mutant set is a claim about the set.** 18/18, 28/28 and 30/30 coexisted with 2 review findings and 15 actionable QA survivors. A generated sweep and a claim sweep are both cheap, and neither depends on the author's view of what can go wrong.
6. **Class closure needs re-checking after each fix.** CR-4 was CR-1's class reappearing in the writer that the CR-2 fix added. The reviewer's practice of re-running its class sweep at every confirmation caught it.
7. **A baseline read through a cache becomes the post-deploy read's answer.** P1R behaved correctly. The instrument design cost five and a half hours to a decision.
8. **Asking about failure visibility at scoping is cheaper than asking after review.** A scheduled job's silent-failure mode was raised by the reviewer, put to the owner, and cost a fix round.

## Recommendations (each naming the file it would change)

Each reaches its stage through pi, on the owner's scheduling.

1. **Every premise in a determination, a brief hazard or an owner question carries its read.** File: `~/.claude/agents/steering.md`, § Briefs (the hazard-bearing analysis bullet) and the scoping-determination guidance. Each premise names the read made this turn (file and line, or command), or is marked "unread: `<source>`'s claim". A hazard citing a file is checked against that file's own lines before it is written. This generalises the 2026-11-20 batch's Recommendation 3 from the scope statement to every premise. *Sighted:* chains 1, 2 and 3 (six instances, table above).
2. **Brief hazards include the record's prior findings on the write set.** File: `~/.claude/agents/steering.md`, § Briefs. Before writing a chain's hazards, steering does two things for the paths in the write set (for chain 2, `src/pages/api/`, `[trpc].ts` and `middleware.ts`):
   - greps closed plans' Exclusions and X-rows, `system-architecture.md` Problem Areas and `hazards.md`;
   - quotes every hit in the hazard list, not just its line number.
   *Sighted:* chain 2 (X-13; line 213).
3. **A website fixer verifies `next build` at its handoff SHA.** Files: `~/.claude/agents/fixer.md` (Verification table) and `~/.claude/agents/code-reviewer.md` (the under-20-lines duties). Both run devops's form: `pnpm install --frozen-lockfile` and `SKIP_ENV_VALIDATION=1 pnpm run build` in a `git archive` export with no `.env`. Both also run a `__tests__` search under `src/pages`. The reviewer's chain 1 reason for declining the build, `.env.local`, does not apply to that form. The placement rule itself waits on the record owner's pending decision (`INBOX.md`, "2026-11-18 — planner-hooks-017 — DECISION NEEDED"). This batch adds a second sighting to it. *Sighted:* chain 2 (build break); chain 1 (build declined).
4. **A falsity signature cites the code that would emit it.** File: `~/.claude/agents/code-reviewer.md`, § Assumption Not Checked. The signature names the line, at the reviewed SHA, that writes the observable in production, or says "no production instrument known". The release reader is then not handed a read that cannot decide. *Sighted:* chain 2.
5. **State what satisfies the release-tip gate on a fixer chain with no QA Phase 2.** Files: `~/.claude/agents/devops.md` Phase 2A step 3 and line 109 (`--reason`), and `~/.claude/agents/steering.md` § Fixer. The rule says whether a code review at the tip SHA, whose reviewer ran the suite there, covers the tip in the `--reason` form, or whether a QA Phase 3 is owed. A subagent's gate is the owner's to waive, so this is his decision. Until it is made, a brief should not state what satisfies the gate. *Sighted:* chain 1 (QA Phase 3 spawned) and chain 2 (`--reason`, as the brief stated).
6. **A fixer at 20 or more production lines runs the generated sweep before handoff.** File: `~/.claude/agents/fixer.md`, § Test (negative controls). Besides its own mutants, the fixer runs `node ~/.claude/tools/mutant-gen.js` over the production diff through `mutation-run.py`, and dispositions every survivor in its document. QA's own sweep stays, because its independence is what found QAF-2. *Sighted:* chain 3.
7. **A post-deploy read never repeats the key a pre-push baseline cached.** Files: `~/.claude/agents/devops.md` (the post-deploy row guidance, Stage 1) and the kit form in the header of `~/.claude/tools/post-deploy-launcher.js`. Where the instrument reads through a CDN cache, either:
   - the post-deploy request uses a key the baseline never requested (for P-1, another avatar index); or
   - the pass condition requires an entry dated after the push.
   *Sighted:* chain 1 (P-1 decided 332 min after the push).
8. **Name the claim sweep and the coupling class as techniques.** Files: `~/.claude/agents/code-reviewer.md` (adversarial execution and coverage) and `~/.claude/agents/qa.md` (step 3, class enumeration). The reviewer lists every behavioural claim in the author's document and matches each to a killed mutant or covering case, and re-runs that sweep at every confirmation. QA mutates each once-only guard on each sibling condition in both polarities. *Sighted:* chain 3 (CR-1, CR-4; QAF-2).
9. **A scheduled-job determination states how the job's failure is surfaced, and the first owner question includes it.** File: `~/.claude/agents/steering.md`, scoping-determination guidance for new capabilities that run unattended. *Sighted:* chain 3 (the 00:19Z re-scope).
10. **The scoring pass's "no plausible change" claim is checked against a recorded kill table where one exists.** File: `~/.claude/agents/deweeder.md`. Where a chain's QA committed `failing_titles` for the cases scored, a `remove` whose reason says no change fails the case alone is checked against that table first. *Sighted:* this batch's record id 20 (above), as an inference pending the cases file.

**Sightings for pending recommendations of `retrospectives/fixer-batch-2026-11-20-retrospective.md`** (still `Active`, not yet processed by pi):
- **Its Recommendation 8** (promote the open-handoff trigger sweep). Chain 1's QA Phase 3 again ran `verification/fix-personal-message-access/qa/phase3/open-handoff-triggers.py`, because "the record has no `tools/open-handoff-trigger-sweep.py`". `ls tools/` at write time still shows none. In chain 2 a devops brief misread a handoff's trigger, which is what that sweep prints whole.
- **Its Recommendation 9** (log the record writes the gate allowed). Steering's python write to the leftovers handoff went through unseen (block 01:45Z of chain 3's rulings). Chain 2's reviewer appended `INBOX.md` by heredoc. Neither quotes its command.
- **Its Recommendation 4** (record relays after they are sent). The adjacent form recurred in chain 1: "the relay to devops at 02:30Z cited this block before it was committed" (block 02:30Z, disclosed).

**Minor, for pi's reading:** the brief again named this document's Origin `fixer-batch-<date>`, while `references/documents.md` gives `fixes-<UTC date>-<thread>`. The previous batch raised the same point.

No recommendation is for the effort's next chain alone, so no handoff is created in this run.

## Cost

Each figure was taken with `python3 ~/.claude/tools/cc-usage.py chain <suffix> --since <determination> --until <release>`. The suffix matches `*<suffix>` and `*<suffix>-<n>`, and subagent usage is filed under its parent row. Every role session in every readout was resolved from the registry cache, with none unrecoverable. The steering readouts resolved 13 of 14 and the coordinator readout 42 of 43; the remaining entry in each was live (for steering, `7fc65b5c`, which spawned this retrospective).

**Chain 1** — `chain hooks-fix-message-page-header-decode --since 2026-11-20T02:03 --until 2026-11-20T02:35`
- Session set: fixer $2.32, code-reviewer $1.83, qa (Phase 3) $1.80, devops $2.03. Total $7.98.
- **Outside the family:** `security-hooks-website-deps`, the chain's security stage, under its own name. `chain hooks-website-deps`, same window: `9b1a5ec4` $14.38. That session also held the open dependency review, so not all of it is this chain's.
- In-window role total: **$22.36**.
- After the release, `--since 02:35 --until 02:43`: devops $0.44; security $9.07 (`9b1a5ec4` $1.65 and `37e84afc` $7.42; the latter closed this audit and recorded H-001 closed in the review document).
- Steering, `chain steering-roadmap-hooks --since 2026-11-20T01:59 --until 02:43`: `6c2fc78b` $8.86 (own $8.35, `general-purpose-sonnet` $0.50, `general-purpose` $0.01). It also carried the delivery of the dependency review and the previous batch's R-1 script (block 02:11Z), so it is not chain 1's alone.
- Production lines: 1 (`git diff --numstat 983681c 7923a1d`: `Providers.tsx` +1; `package.json` and the lockfile add 0). **$22.36 per production line.** The figure measures a deletion-only fix and a security stage, not code volume.

**Chain 2** — `chain fix-trpc-batch-limit --since 2026-11-20T23:57 --until 2026-11-21T00:46`
- Session set: fixer $6.68, code-reviewer $6.02, devops $1.55. **Total $14.26.**
- After the release, to 00:53: devops $0.85, fixer $0.15.
- Production lines: 2 (`git diff --numstat d1bb9b0 76da25c -- src ':!**/__tests__/**'`: `middleware.ts` +1, `[trpc].ts` +1). **$7.13 per production line.**

**Chain 3** — `chain fix-website-dependency-audit --since 2026-11-20T23:58 --until 2026-11-21T01:12`
- Session set: fixer $9.11, code-reviewer $4.90, qa $3.82 (own $3.81, `general-purpose` $0.01), devops $0.73. **Total $18.56.**
- After the install, to 01:46: devops $1.15 (the carrier and reader R1).
- Production lines: 205 (`git -C agent-output diff --numstat f943553 5d0baf8 -- tools/`: `website-dependency-audit.js` +205; the fixer's non-blank count is 179). `website-audit-dispositions.json` (+314) is seeded data and the test file (+396) is a test, so neither is counted. **$0.091 per production line.**

**Steering for chains 2 and 3**, which ran concurrently and cannot be split: `chain steering-roadmap-hooks --since 2026-11-20T23:44 --until 2026-11-21T01:46`.
- `ed88b5ea` $7.35 (own $7.12, `general-purpose` $0.13, `general-purpose-sonnet` $0.10).
- `7fc65b5c` $1.28, which is the close-out and the spawning of this retrospective and the deweeder. This run's own usage falls after 01:46 and is not counted.
- Rows with no usage in a window and a `seen` stamp before it are a same-named thread's earlier sessions, reported out.
- Coordinator, `chain steering-coordinator`, same window: `6071e0ba` $0.05, not attributable to a chain.

**Batch:** $55.18 for role sessions in window ($22.36 + $14.26 + $18.56) over 208 production lines, which is $0.265 per line. That excludes post-release work and steering. The figure is dominated by chain 3's line count: chains 1 and 2 together cost $36.62 for 3 lines.

## Handoff

- **Recommended next:** pi, on the owner's command, for Recommendations 1 to 10 and the three sightings. pi closes this document as `Processed` once they are extracted.
- **Architect:** no new pattern needs documenting by this retrospective. Two architecture lines are already routed by the chains' own `INBOX.md` entries: line 234's matcher and `x-query-params` (chain 2's fixer and devops), and the removed direct `sharp` (chain 1, since reconciled in the 2026-11-20T03:39 row of `system-architecture.md`).
- **Open carriers this retrospective leaves as found** (re-read at write time):
  - `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`, `Open` for items 4, 5 and 7;
  - `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md`, `Open`, owned by steering, with an event trigger;
  - `handoff/fix-website-dependency-audit-first-run-2026-11-21.md`, `Open`, reader R1 from 07:13Z.
  These are point-in-time states. Each carrier is authoritative on its own.
- **Uncarried by ruling:** chain 2's dead `proxy` export and unused `config()` link ("a candidate for a later hygiene pass, not carried by this chain", block 00:20Z; deployment 2 marks it uncarried). Chain 1's CR-1 commented `sanitizeHtml` is carried only in a rulings block (02:18Z). Both are steering's to leave or route.
- **Items needing a carrier outside this document:**
  - Recommendation 3's placement half joins the record owner's pending DECISION NEEDED in `INBOX.md`.
  - Recommendation 10's contradiction is for steering to put beside the deweeder's tables before any deletion chain.
  - This run writes only under `retrospectives/`, so each needs an `INBOX.md` entry from the steering thread.
