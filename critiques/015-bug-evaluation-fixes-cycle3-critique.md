---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 3, pass 2, delta-bounded read of revisions 9 and 10 as one round (1f7715b..bceb84a, --numstat 91/16, read whole). Verdict APPROVED (after implementation approval): M-C3-1 and L-C3-1 verified landed → RESOLVED; M1-c class, M1-f/RK-7, the re-derivation paragraph and the run-2 span approved. New: M-C3-2 MEDIUM — D21's M1-h property is vacuous on the no-account early return, which abandons the message fetch with no handler; owed to the planner before the implementer starts M1-h's reopened change, not before any other code. L-C3-2 and L-C3-3 LOW park as Planner batch rows. Open until the M-C3-2 fold is read."
Artifact-Revision: 10 — read at agent-output bceb84a
Reviewed-At: bceb84a — repos=agent-output; website be881c9 (chain/015-bug-evaluation-fixes, the M1 handoff tree the delta cites; the branch tip was 69b17af at this read, past it), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 3

Cycle 1 closed at `critiques/closed/015-bug-evaluation-fixes-critique.md` (`dee418b`, rev 5 approved); cycle 2 closed at `critiques/closed/015-bug-evaluation-fixes-cycle2-critique.md` (rev 7 approved, L-C2-4 landed at rev 8). This document opens cycle 3 on rev 8, the first revision since implementation approval (`steering/015-rulings.md` block "implementation start recorded", `7efd8b0`): it changes criterion text in M1-c (no-account cell, Ordering) and M8-a (the run-2 reads and the span property), so a new cycle is owed; the delta is fully readable in the diff, so the pass is delta-bounded and the whole-document read is the escalation, not taken.

**Artifact**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 8 (`1f7715b`). Delta read whole: `git diff 38b12e6..1f7715b -- planning/015-bug-evaluation-fixes.md` (`--numstat` 39/18; the four commits between are the three gates' rev-7 verdicts and steering's implementation-start row, none touching the plan). Also read: architect `architecture/015-*.md` rows 05:49 and 05:52 (AF-16 and its rev-8 pass); QA `qa/015-bug-evaluation-fixes-qa.md` QAF-8, QAF-9, QAF-10 and B-8's rev-8 reconcile; `verification/015/pig-host-read.sh` (its log reads) and `m8-0-run1-2026-11-08T0525Z.txt` (counts); `website/node_modules/next-auth/core/routes/signout.js` and `package.json` (4.24.5); website `src/server/auth.ts` `events.signOut`; preview-image-generator `src/server.ts` (the `console.debug` override, the request handler, `shutdown`) and `src/getPool.ts` factory `create`, both at `471578f`.
**Date**: 2026-11-08. **Critic**: critic-hooks-015.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T06:28 | steering-hooks-015 → critic-hooks-015 | Rev 9 (`d6da978`, `1b8b43b`) and rev 10 (`bceb84a`) as one round | cycle 3 pass 2. Delta-bounded: `git diff 1f7715b..bceb84a -- planning/015-bug-evaluation-fixes.md` (`--numstat` 91/16), read whole; the intervening R-3, R-4, Status, code-review and QA rows are registrations and verified as such. Re-derived at website `be881c9`: `removeUserSession` catches `NoResultError` only; `env.mjs` guard `!prop === 'NODE_ENV'` at `7ce866b` → `prop !== 'NODE_ENV'`; the RK-7 sweep's exclusion of the other `env.mjs` importers (below); `hydratedAuthCallback`'s three calls and its `return {}` on no account; the M1-h probe and capture; `ecosystem.config.js` restart keys. Rulings block 06:25Z (`33928c8`) read for D21. M-C3-1, L-C3-1 → RESOLVED. New: M-C3-2 MEDIUM, L-C3-2 LOW, L-C3-3 LOW. RK-6: no new member. APPROVED. |
| 2026-11-08T05:54 | steering-hooks-015 → critic-hooks-015 | Resume from Checkpoint `3ec55be`; read rev 8's delta | cycle 3 pass 1. Delta-bounded, boundary verified by `--numstat` against the commit list. Re-derived at source: next-auth 4.24.5 `signout.js` `deleteSession` (line 46) before `events.signOut` (line 47); `getPool.ts` factory `create` logs `Created instance`; `server.ts` logs `req.method, req.url` before the `authorization` check; the `console.debug` override prepends only a `Date`. M1-c cells approved. New: M-C3-1 MEDIUM (Duplicates QAF-10), L-C3-1 LOW. RK-6: no new member. APPROVED; the two findings route to the planner's next revision, before the run-2 script extension. |

## Assumption Not Checked

**Pass 2** assumes that QA's Phase 2 harness can observe a real `unhandledRejection` from `hydratedAuthCallback` — that the cells for D21's property run against promises the runtime creates, not promises a mock returns, since vitest attaches handlers to the latter and the implementer's own M1 record (Outstanding Item 6) shows a cell going green at the base for that reason. Falsity signature: every M1-h cell green at a tree with a window still open (`be881c9` for the account-lookup window). Owner of closing: QA at the M1-h re-check, which the plan's D21 row schedules — named again in the handoff.

**Measured this pass**: `hydratedAuthCallback` at `be881c9` starts exactly three asynchronous operations — `getUserRecentMessages` (or a literal `[]`), `redis.fetchUserAccount`, `redis.fetchUserGuilds` (or a literal `[]`) — so the plan's enumeration is complete; and the no-account branch is `return {}` with `messagePromise` pending. The RK-7 sweep: `git grep -l env.mjs be881c9 -- src bot` lists 70 paths; outside `__tests__`, the importers reading a non-`NEXT_PUBLIC_` key are `utils/discord.ts`, `utils/redis/{index,client}.ts`, `server/api/utils/{shared,deleteMessagePreviewImages}.ts`, `pages/api/*` and `bot/edgeCommands.ts`; `utils/discord.ts` is imported only by `pages/api/cron.ts`, `server/api/routers/message.ts` and `utils/redis/index.ts`. The plan's "two client-reachable importers" holds.

**Pass 1** assumed that `Created instance` lines reach the production out log at all — that the prod process's `console.debug` output from `getPool.ts` lands in the same file `pig-host-read.sh` reads, as `Server running at` demonstrably does (run 1: counts 3 and 6 across the two apps). No capture has read the string from the host; this session has no host read of its own (D17/D18 bind the reader and the instrument). Falsity signature: run 2's primary figure reads 0 while the secondary figure is non-zero and the drain-complete line shows a pool drained. Owner of closing: the analyst, when extending `pig-host-read.sh` — its first run against the existing out log is the non-zero read L-C3-1 asks for (named again in the handoff).

**Measured this pass**: `grep -c 'Created instance\|Acquired instance' preview-image-generator/src/getPool.ts` → 2 (one each; the `Created instance` line is inside the factory's `create` `try`, after `puppeteer.launch` resolves, so it counts launches that succeeded, not attempts). `server.ts` lines 9–12: the override is `_debug(new Date(), ...args)`, so every out-log line carries a leading timestamp and the plan's substring predicates (`Server received`, `Created instance`, `POST /generate`) are sound; an anchored `^` predicate would not be.

## Value Statement Assessment

Unchanged at rev 8. No drift.

## Overview

**Pricing against the ask (pass 2)**: sized to the ask. Revs 9–10 add one change to M1-h that the owner selected himself (D21, with its code-review round and QA re-run priced in the ruling), correct two premises the implementer found false at the base, and fold the parked run-2 rows. 49 of 50 findings, unchanged. No new machinery.

**Owed re-verdicts (rev 9 + rev 10 row)**: M1-c "no account found" class and residue — **approved** (verified: `executeTakeFirstOrThrow` at `7ce866b`, the `NoResultError` catch at `be881c9`; the residue names its consequence). M1-f premise and RK-7 — **approved** (L-C3-2 is a method note on the sweep's record, not on its result). M1-h restated to D21's property — **approved save M-C3-2**. Re-derivation after M1 — **approved** (L-C3-3 on its hedge; the argument itself holds: none of M2–M7 reads the five changed behaviours, M8 is another repository, M9/Validation carry the sign-out consequence). M8-a run-2 span bounds and read list — **approved**: the bounds are two ready lines and a `pm2.log` containment check, none a counted quantity; the reads are enumerated; the zero-`Server received` span is a valid, refuting read; a restart stops the read. P3 instrument liveness — **approved** (L-C3-1 landed). Validation sign-out note — approved.

**Owed re-verdicts (rev 8 row)**: M1-c no-account cell and ordering anchor; the session row moved outside M1-c — **approved** (verified at source, above; the cell now states only `removeUserSession`'s own observable acts, and the ordering anchor names a write that function makes). M8-0 run-2 span and its pool-creation read — approved as to the figures (primary and secondary are correctly attributed, and the secondary's over-count is stated); the span's end bound is M-C3-1.

## Findings

### Resolved at pass 2 (disposition lines; the argument lives in `f64ae27`)

M-C3-1 MEDIUM cycle 3 pass 1 RESOLVED — the span is bounded by the two ready lines and stop (2)'s `pm2.log` timestamp, restarts reported, the five reads enumerated, a zero-`Server received` span a valid refuting read. Plan rev 9 `d6da978` § M8-a "Every run-2 read"; RK-6's record; Planner batch row discharged. Duplicates: QAF-10 in `qa/015-bug-evaluation-fixes-qa.md`.
L-C3-1 LOW cycle 3 pass 1 RESOLVED — § P3 "Instrument liveness": the analyst's first run reads `Created instance` non-zero in an earlier span before run 2 relies on it, else the figure is dropped and reported not established. Plan rev 9 `d6da978`.

### Medium

**M-C3-2 MEDIUM cycle 3 pass 2 — D21's M1-h property is vacuous on the no-account early return, which abandons the message fetch with no handler.** State: OPEN. Plan § M1-h "Property (D21)": "Every promise `hydratedAuthCallback` starts has a rejection handler attached before the function next awaits anything else." At `be881c9` (`src/server/auth.ts` `hydratedAuthCallback`), when `fetchUserAccount` resolves falsy the function does `return {}` with `messagePromise` pending and never handled — it awaits nothing else, so the property's trigger never fires and the property holds over code that leaves the window open permanently: a message-fetch rejection on that path is an `unhandledRejection` that no later `Promise.all` ever handles (the probe's `rejectionHandled (late)` does not even occur). The input list has the same hole: it enumerates four rejection inputs over the three promises but not the account-state axis — {account found, no account} × {message fetch rejects while the lookup is pending} — so the finite class is not fully listed. Impact: M1-h is reopening to meet this property (D21); the implementer and QA would code and verify to a statement that admits the one path where the leak is unbounded. Recommendation: close the trigger — "before the function next awaits anything else **or returns**" — and add the input "the account lookup resolves with no account while the message fetch is pending, which then rejects", outcome: no `unhandledRejection`, and `{}` is still returned. This is a wording completion of a criterion the owner's ruling already binds (D21 says "both windows"; the no-account path is the account-lookup window's own continuation), not a new scope question. Landing: the planner's fold before the implementer starts M1-h's reopened change; no other milestone is held.

### Low (new at pass 2)

**L-C3-2 LOW cycle 3 pass 2 — RK-7's sweep records its instrument but not the predicate that reduced its hits to two.** State: OPEN. Plan § RK-7: "The sweep at `be881c9` found two client-reachable importers of `env.mjs` … The implementer ran `grep -rl "env.mjs" src bot` and read both files." That command lists 70 paths at `be881c9`; the step from 70 to 2 — which importers were judged not client-reachable and by what rule — is unrecorded, so a reader cannot re-derive the claim, though it holds (measured above). Recommendation: one clause naming the exclusion — test files, `pages/api/*`, `server/**`, `bot/**`, and `utils/{discord,redis}` whose importers are all server sites — so the falsifier's population is stated. Landing: Planner batch row; folds at the next code-moving revision or Stage 1.

**L-C3-3 LOW cycle 3 pass 2 — The re-derivation paragraph hedges on a record it could read.** State: OPEN. Plan "Re-derivation after M1 (rev 9)": "In case that record carries no owner approval covering M2–M9, this paragraph is their re-argument." Rulings block 05:50Z (`7efd8b0`) records implementation start for plan revision 7 as a whole with no milestone withheld; the hedge should be a read ("the block records the start for the whole plan; this paragraph re-argues M2–M9 regardless"), since a claim about another document's state names the read that established it. Landing: Planner batch row, with L-C3-2.

### Pass 1 findings as raised (retained for the record)

**M-C3-1 MEDIUM cycle 3 pass 1 — The run-2 span ends at the line the criterion counts, so P1's count cannot refute and the span is undefined in the refuting case. Duplicates: QAF-10 in `qa/015-bug-evaluation-fixes-qa.md`.** State: RESOLVED (above). Plan § M8-a "(2) The verifying stop", paragraph "Every run-2 read": the span "runs from that process's `Server running at` line to its `Server received` line". Three consequences. (i) The criterion's first limb — "the out log gains exactly one `Server received` line" — is counted inside a window closed by that line, so it reads 1 whenever a span exists: pass and failure are indistinguishable (planner.md, "An Observable Criterion Declares Its Instrument"). (ii) In the refuting case — the drain never runs, as in all of run 1's history (0 such lines in 180,284) — no pair exists and the span is undefined, so every run-2 read, the pool figure included, has no window. (iii) The drain-complete line (`Server closed.`, logged after `Server received`) and the elapsed-ms figure the criterion names as "the drain measurement" fall after the span's end, so the property as worded excludes the plan's own measurement from the window it says bounds every read. Impact: run 2 is the chain's one verifying observation of the delivered M8-a value; a window that cannot fail defeats it. Recommendation: bound the span by lines independent of any line the criterion counts — the stopped process's own ready line to the ready line of the process the re-run started, cross-anchored on stop (2)'s timestamp in `pm2.log` — and enumerate the reads the property covers (P1's count, the drain-complete line and its figure, the pool figures; the `pm2.log` limbs are anchored on stop (2)'s timestamp, not on the out log). An extra ready line inside that window is a restart and is reported, not chosen between. QA's QAF-10 states the same remedy; one fold discharges both. Landing: the planner's next revision, owed before the analyst extends `pig-host-read.sh` for run 2 (plan § P3 "Run 2"), not before code.

### Low

**L-C3-1 LOW cycle 3 pass 1 — The `Created instance` primary figure is a post-deploy instrument with no non-zero read cited.** State: RESOLVED (above). Plan § M8-a P3 "Run 2", "Primary figure". The code at `471578f` already emits the line, and the production out log covers three years of service, so a non-zero read exists to be taken; none is cited, and run 1's script does not read the string. planner.md: "A post-deploy instrument is named only once it has been read non-zero for something that already emits it, and the criterion cites that read." Impact: without it, a 0 at run 2 cannot be told from a line that never reaches the log (Assumption Not Checked, above). Recommendation: the analyst's extension of `pig-host-read.sh` takes one `grep -c 'Created instance'` over the existing out log (a fixed-shape count, within the script's own rule of never printing a log wholesale) before run 2, and the plan cites the figure beside the primary figure. Landing: with M-C3-1, before the run-2 script extension.

## Questions

None for the owner.

## Unresolved Open Questions

None. OQ-I (rev 9) is `[RESOLVED]` at rev 10 by D21; no other `OPEN QUESTION` was added.

## Verdict

**Pass 2 — APPROVED** (cycle 3, pass 2; after implementation approval, so REQUEST REVISION is reserved for HIGH or CRITICAL and neither is raised). Sized to the ask: 49 of 50, unchanged; D21's M1-h reopening is the owner's own selection with its rounds priced in the ruling. M-C3-1 and L-C3-1 verified landed. The rev 9 + rev 10 owed re-verdicts row is approved on every limb, M1-h's save M-C3-2 (MEDIUM): the property's trigger does not fire on the no-account `return {}`, so its wording must close on "awaits or returns" and its input list gain the no-account member before the implementer codes M1-h's reopened change — a completion of what D21 already binds, owed to the planner, holding nothing but that one change. L-C3-2 and L-C3-3 park as Planner batch rows. D21 is terminal; nothing here re-raises it. RK-6: no new member (the restated span property verified). This critique closes when the M-C3-2 fold is read.

**Next**: the planner (M-C3-2 before M1-h's reopened change; L-C3-2, L-C3-3 as batch rows). No owner-needing item.

---

**Pass 1 — APPROVED** (cycle 3, pass 1; after implementation approval, so REQUEST REVISION is reserved for HIGH or CRITICAL and neither is raised). Sized to the ask: 49 of 50, unchanged. M1-c's no-account and ordering cells, which the implementer holds on this pass, are approved and released. M8-a's rev-8 text is approved as to the pool figures; M-C3-1 (MEDIUM, QA's QAF-10 in the same shape) and L-C3-1 (LOW) change a pre-release verifier's form, not code, and fold at the planner's next revision before the analyst extends `pig-host-read.sh` for run 2 — that revision changes criterion text and is read by this cycle as pass 2. RK-6: no new member this pass (M-C3-1 is a window that cannot fail, not a read off the wrong stop). This critique closes when that revision is read.

**Next**: the implementer (M1-c's held cells are released; QA Phase 1 passed the same delta at `c2a657a`, its Status-Detail read); the planner (M-C3-1, L-C3-1, with QAF-10).
