---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 3, pass 1, delta-bounded read of revision 8 (1f7715b; delta 38b12e6..1f7715b, --numstat 39/18, read whole). Verdict APPROVED (after implementation approval, 7efd8b0): M1-c's no-account and ordering cells pass and are released to the implementer. One MEDIUM (M-C3-1, duplicating QA's QAF-10: the run-2 span ends at the line the criterion counts) and one LOW (L-C3-1: the Created instance figure has no non-zero out-log read) route to the planner's next revision, owed before the analyst extends pig-host-read.sh for run 2, not before code. Open until that revision is read."
Artifact-Revision: 8 — read at agent-output 1f7715b
Reviewed-At: 1f7715b — repos=agent-output; website 7ce866b (chain/015-bug-evaluation-fixes), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 3

Cycle 1 closed at `critiques/closed/015-bug-evaluation-fixes-critique.md` (`dee418b`, rev 5 approved); cycle 2 closed at `critiques/closed/015-bug-evaluation-fixes-cycle2-critique.md` (rev 7 approved, L-C2-4 landed at rev 8). This document opens cycle 3 on rev 8, the first revision since implementation approval (`steering/015-rulings.md` block "implementation start recorded", `7efd8b0`): it changes criterion text in M1-c (no-account cell, Ordering) and M8-a (the run-2 reads and the span property), so a new cycle is owed; the delta is fully readable in the diff, so the pass is delta-bounded and the whole-document read is the escalation, not taken.

**Artifact**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 8 (`1f7715b`). Delta read whole: `git diff 38b12e6..1f7715b -- planning/015-bug-evaluation-fixes.md` (`--numstat` 39/18; the four commits between are the three gates' rev-7 verdicts and steering's implementation-start row, none touching the plan). Also read: architect `architecture/015-*.md` rows 05:49 and 05:52 (AF-16 and its rev-8 pass); QA `qa/015-bug-evaluation-fixes-qa.md` QAF-8, QAF-9, QAF-10 and B-8's rev-8 reconcile; `verification/015/pig-host-read.sh` (its log reads) and `m8-0-run1-2026-11-08T0525Z.txt` (counts); `website/node_modules/next-auth/core/routes/signout.js` and `package.json` (4.24.5); website `src/server/auth.ts` `events.signOut`; preview-image-generator `src/server.ts` (the `console.debug` override, the request handler, `shutdown`) and `src/getPool.ts` factory `create`, both at `471578f`.
**Date**: 2026-11-08. **Critic**: critic-hooks-015.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T05:54 | steering-hooks-015 → critic-hooks-015 | Resume from Checkpoint `3ec55be`; read rev 8's delta | cycle 3 pass 1. Delta-bounded, boundary verified by `--numstat` against the commit list. Re-derived at source: next-auth 4.24.5 `signout.js` `deleteSession` (line 46) before `events.signOut` (line 47); `getPool.ts` factory `create` logs `Created instance`; `server.ts` logs `req.method, req.url` before the `authorization` check; the `console.debug` override prepends only a `Date`. M1-c cells approved. New: M-C3-1 MEDIUM (Duplicates QAF-10), L-C3-1 LOW. RK-6: no new member. APPROVED; the two findings route to the planner's next revision, before the run-2 script extension. |

## Assumption Not Checked

**Pass 1** assumes that `Created instance` lines reach the production out log at all — that the prod process's `console.debug` output from `getPool.ts` lands in the same file `pig-host-read.sh` reads, as `Server running at` demonstrably does (run 1: counts 3 and 6 across the two apps). No capture has read the string from the host; this session has no host read of its own (D17/D18 bind the reader and the instrument). Falsity signature: run 2's primary figure reads 0 while the secondary figure is non-zero and the drain-complete line shows a pool drained. Owner of closing: the analyst, when extending `pig-host-read.sh` — its first run against the existing out log is the non-zero read L-C3-1 asks for (named again in the handoff).

**Measured this pass**: `grep -c 'Created instance\|Acquired instance' preview-image-generator/src/getPool.ts` → 2 (one each; the `Created instance` line is inside the factory's `create` `try`, after `puppeteer.launch` resolves, so it counts launches that succeeded, not attempts). `server.ts` lines 9–12: the override is `_debug(new Date(), ...args)`, so every out-log line carries a leading timestamp and the plan's substring predicates (`Server received`, `Created instance`, `POST /generate`) are sound; an anchored `^` predicate would not be.

## Value Statement Assessment

Unchanged at rev 8. No drift.

## Overview

**Pricing against the ask**: sized to the ask. Rev 8 folds four non-blocking findings; M1-c's deliverable is unchanged, and M8-a gains a reading (the pool figure) and a window property on reads it already made. 49 of 50 findings, unchanged; no new work, no new machinery.

**Owed re-verdicts (rev 8 row)**: M1-c no-account cell and ordering anchor; the session row moved outside M1-c — **approved** (verified at source, above; the cell now states only `removeUserSession`'s own observable acts, and the ordering anchor names a write that function makes). M8-0 run-2 span and its pool-creation read — approved as to the figures (primary and secondary are correctly attributed, and the secondary's over-count is stated); the span's end bound is M-C3-1.

## Findings

### Medium

**M-C3-1 MEDIUM cycle 3 pass 1 — The run-2 span ends at the line the criterion counts, so P1's count cannot refute and the span is undefined in the refuting case. Duplicates: QAF-10 in `qa/015-bug-evaluation-fixes-qa.md`.** State: OPEN. Plan § M8-a "(2) The verifying stop", paragraph "Every run-2 read": the span "runs from that process's `Server running at` line to its `Server received` line". Three consequences. (i) The criterion's first limb — "the out log gains exactly one `Server received` line" — is counted inside a window closed by that line, so it reads 1 whenever a span exists: pass and failure are indistinguishable (planner.md, "An Observable Criterion Declares Its Instrument"). (ii) In the refuting case — the drain never runs, as in all of run 1's history (0 such lines in 180,284) — no pair exists and the span is undefined, so every run-2 read, the pool figure included, has no window. (iii) The drain-complete line (`Server closed.`, logged after `Server received`) and the elapsed-ms figure the criterion names as "the drain measurement" fall after the span's end, so the property as worded excludes the plan's own measurement from the window it says bounds every read. Impact: run 2 is the chain's one verifying observation of the delivered M8-a value; a window that cannot fail defeats it. Recommendation: bound the span by lines independent of any line the criterion counts — the stopped process's own ready line to the ready line of the process the re-run started, cross-anchored on stop (2)'s timestamp in `pm2.log` — and enumerate the reads the property covers (P1's count, the drain-complete line and its figure, the pool figures; the `pm2.log` limbs are anchored on stop (2)'s timestamp, not on the out log). An extra ready line inside that window is a restart and is reported, not chosen between. QA's QAF-10 states the same remedy; one fold discharges both. Landing: the planner's next revision, owed before the analyst extends `pig-host-read.sh` for run 2 (plan § P3 "Run 2"), not before code.

### Low

**L-C3-1 LOW cycle 3 pass 1 — The `Created instance` primary figure is a post-deploy instrument with no non-zero read cited.** State: OPEN. Plan § M8-a P3 "Run 2", "Primary figure". The code at `471578f` already emits the line, and the production out log covers three years of service, so a non-zero read exists to be taken; none is cited, and run 1's script does not read the string. planner.md: "A post-deploy instrument is named only once it has been read non-zero for something that already emits it, and the criterion cites that read." Impact: without it, a 0 at run 2 cannot be told from a line that never reaches the log (Assumption Not Checked, above). Recommendation: the analyst's extension of `pig-host-read.sh` takes one `grep -c 'Created instance'` over the existing out log (a fixed-shape count, within the script's own rule of never printing a log wholesale) before run 2, and the plan cites the figure beside the primary figure. Landing: with M-C3-1, before the run-2 script extension.

## Questions

None for the owner.

## Unresolved Open Questions

None. No `OPEN QUESTION` was added at rev 8.

## Verdict

**Pass 1 — APPROVED** (cycle 3, pass 1; after implementation approval, so REQUEST REVISION is reserved for HIGH or CRITICAL and neither is raised). Sized to the ask: 49 of 50, unchanged. M1-c's no-account and ordering cells, which the implementer holds on this pass, are approved and released. M8-a's rev-8 text is approved as to the pool figures; M-C3-1 (MEDIUM, QA's QAF-10 in the same shape) and L-C3-1 (LOW) change a pre-release verifier's form, not code, and fold at the planner's next revision before the analyst extends `pig-host-read.sh` for run 2 — that revision changes criterion text and is read by this cycle as pass 2. RK-6: no new member this pass (M-C3-1 is a window that cannot fail, not a read off the wrong stop). This critique closes when that revision is read.

**Next**: the implementer (M1-c's held cells are released; QA Phase 1 passed the same delta at `c2a657a`, its Status-Detail read); the planner (M-C3-1, L-C3-1, with QAF-10).
