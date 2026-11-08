---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 1, pass 1, whole-document read of revision 3 (plus registration R-1: D14, D15). Verdict REQUEST REVISION: one HIGH (H-1, M8-a's acceptance observation is read on a stop the fix cannot affect), four MEDIUM, five LOW. M0–M7 carry no HIGH finding."
Artifact-Revision: 3 — read at agent-output b234e2b, which is 800ca67 (rev 3) plus R-1 (D14, D15 registered; no requirement moved)
Reviewed-At: b234e2b — repos=agent-output; website 7ce866b (chain/015-bug-evaluation-fixes), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), both equal to the plan's base SHAs
Verdict: REQUEST REVISION
---

# Critique — Plan 015, Bug-evaluation fixes (website, preview-image-generator)

**Artifact**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 3 (`800ca67`), read at `b234e2b` (R-1 on top: D14, D15 — a registration, no requirement moved, boundary checked by `git diff 800ca67..b234e2b -- planning/015-bug-evaluation-fixes.md`: 3 insertions, 0 deletions, all three in the changelog and the Decisions Register).
**Analysis**: `analysis/015-bug-evaluation-fixes-analysis.md` (`7e24de3`, amended `9b99acd`) — read whole.
**Sources also read**: `research/codebase-bug-evaluation-2026-11-08.md` (`aea4a05`); `steering/015-rulings.md` (blocks 04:37Z, 04:49Z, 05:11Z); `architecture/system-architecture.md`, `architecture/website.md`, `architecture/preview-image-generator.md`; `verification/015/pig-host-read.sh` (`9b99acd`); the seven handoff triggers the plan dispositions. No roadmap exists (`agent-output/roadmap/` holds `.gitkeep` only), as the plan's header records; alignment is judged against the Master Product Objective as the workspace README states it.
**Date**: 2026-11-08.
**Critic**: critic-hooks-015.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T05:17 | steering-hooks-015 → critic-hooks-015 (brief) | Critique rev 3 | cycle 1 pass 1. Whole-document read (first pass of the cycle). Premises re-derived at the trees: M3's three sites, the limits constants, `ADMIN_PERMS`, `embedShape.color`, `countTotalComponents`, `isMessageValid`, the duplicate `splice` sites, `server.ts`/`ecosystem.config.js`/`deploy.sh`/`config.ts`. H-1, M-1–M-4, L-1–L-5 raised. REQUEST REVISION. |

## Assumption Not Checked

This pass assumes the research's statement of each of the 49 in-scope defects — site, mechanism and reachability as read at website `7ce866b` and preview-image-generator `471578f` — is correct, and re-reads only the sites named in the changelog row above; it also assumes the analysis's PM2 source reading (V-1, V-3) is correct, which the brief says no gate has checked. The signature of either's falsity: a milestone's first test written against the finding is **green at the base** (the defect is not where the plan says), or M8-0 run 1 shows a `Server received` line timed at a stop (PM2 did deliver a signal). The stage that owns closing: the implementer's red-at-base at each milestone (TDD), and, for M8, the owner's M8-0 run 1 — named again in the handoff.

Process fact, lodged in the round: a `grep -n -i key` this pass ran over `preview-image-generator/.github/workflows/preview.yml` printed the literal `/generate` key into this session's tool output. The value is recorded nowhere, here or elsewhere; X-12 (`handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md`) governs. Future passes read those two files with the `key` lines excluded.

## Value Statement Assessment

Present, in user-story form; the "so that" is observable (five named user-visible outcomes, each with a milestone: M2-a, M3, M6-a, M7-a, M1-a). Aligned with the Master Product Objective; no drift. Value is delivered directly: every milestone lands its fix in this chain; the one exclusion from the pool (X-1, F-36) is Severity 1 with a stated reason and a carrier.

## Overview

**Pricing against the ask**: sized to the ask. The ask is the F-1–F-50 pool with the planner's call on which become milestones (rulings 04:37Z); the plan carries 49 and excludes one by a priced row. The only growth is inside M8-a — P3 and P4 are analysis-derived additions beyond F-31's statement (L-5, flagged, not designed). No rider is attached.

**Verified at the trees** (so later passes need not re-read): `MAX_EMBED_FOOTER_TEXT_LENGTH = 256` in `src/constants/index.ts` feeds both `shapes.ts` `embedShape` and `EmbedFooter.tsx` (M2-d's "one constant" premise holds); `validateEmbedAuthorName` compares to `MAX_NAME_LENGTH` (80), as F-13 says; `embedShape.color` is `.positive()`, `containerShape.accent_color` is `.min(0)`; `ADMIN_PERMS` is the `&` of the two bits and `ManageGuild` alone is `"32"`; `countTotalComponents` is module-private in `DiscordMessageEditor/index.tsx` and `isMessageValid` (`messageValidity.ts`) is `validateMessage(data) === ''`; the top-level duplicates `splice(idx, 0, …)` and the four nested editors `splice(idx + 1, 0, …)`; `server.ts` registers only `SIGINT`, after `process.send?.('ready')`; `ecosystem.config.js` has `shutdown_with_message: true`, `kill_timeout: 5000`; `deploy.sh` runs `pm2 startOrReload … --update-env`.

**Target Release vs scoping end step**: match (website → `master`/Vercel; PIG → `preview` then `prod`; project-utils ships nothing, X-1). **Open questions**: none unresolved. **PREMISE-STALE**: none marked. **Reading Order**: not owed (413 lines).

## Architectural Alignment

The plan adds no surface and names the two record lines it touches. The `system-architecture.md` clause "graceful SIGINT drain" is contradicted by the analysis and the plan routes the correction to the architect, who reads this revision in parallel — correct. D-005 / `website.md` W-2 (the back end reflects what the front end allows): M2 widens the save schema to what the editor produces (black, 2048-char footer) — in the direction W-2 permits. M6-l (ii) adds a `validateMessage` limb, not a save-boundary refusal — also consistent with D-005 (validity recorded, never enforced at the write). `website.md` A-3 is the right sibling for the M6-l (iii) lift.

## Findings

### High

**H-1 HIGH cycle 1 pass 1 — M8-a's acceptance observation is read on a stop the fix cannot affect, and the stop that could satisfy it has no step and no runner.** State: OPEN.
- **Location**: § M8-a, "Criterion: on the first reload of the preview instance after the M9 push …"; § M8-0 "Second, after the M9 preview push"; § M9 preview-image-generator bullet; `verification/015/pig-host-read.sh` run-2 expectations `[5a]`/`[5b]`; § RK-5.
- **Description**: the M9 push runs `pm2 startOrReload`, which in fork mode is stop-then-start (analysis V-1, `God.restartProcessId`). The process it stops is the one running the **old** code, which has no `'message'` listener (`server.ts` at `471578f`). By V-3 the new `kill_timeout` (12000) is applied to `pm2_env` **before** that stop. So the signature of the push's own reload, on a correct implementation, is: no shutdown line, and `still alive after 12000ms … SIGKILL`. The plan's criterion (one shutdown line, exit before 12000 ms, no SIGKILL) and the script's run-2 expectation ("NO still alive line") read **FAIL** on that stop by construction. If "first reload after the push" means the *next* stop after the deploy's own, the plan names no step that causes it and no party who runs it — a host write (`pm2 reload <name>`), which no pipeline party may run, or a second push (devops). Two further consequences of the transition stop are unstated: on PM2 ≥ 7 it SIGKILLs the Node pid only (V-2), so Chromium children of the old process are orphaned at the moment of the push — RK-5 says P1–P3 "remove the SIGKILL on the normal path", but the transition is not the normal path, and no clearing act or party is named; and the transition stop's downtime grows from ~5 s to ~12 s (the raised `kill_timeout` applied to a process that ignores its stop).
- **Impact**: magnitude — 1 of 1 acceptance observations for M8-a misreads on a correct implementation (or has no producer); 12 s of preview-instance downtime at the push, one-time; on a 7.x daemon, one orphaned Chromium tree per pooled browser at the push. A gate reading the push's log would REJECT a correct M8-a or, worse, accept an incorrect one on the wrong stop.
- **Recommendation**: write the two stops explicitly. (1) The transition stop: its expected signature as above, marked *expected, not a refutation*, with the RK-5 row for it — on 7.x, orphaned Chromium after the push, read by script `[6]`, cleared by the owner (the act named). (2) The verifying stop: a stop of a process running the new code — an owner host step (`pm2 reload <name>`, who runs it, when) or a second `preview` push by devops — then M8-0 run 2 reads it. The script's run-2 expectations and the plan's criterion both bind to stop (2). The plan should also state the preview instance's downtime at (1) as a stated limit.

### Medium

**M-1 MEDIUM cycle 1 pass 1 — M3's enumerator does not produce its count.** State: OPEN.
- **Location**: § M3, "enumerated by `grep -rc "'~/components/Button'" src` (3 at `7ce866b`, sites named above)" and "no shared helper exists to fix once — `grep` above"; § Assumptions, "the dead literal `'~/components/Button'` at exactly three sites".
- **Description**: `'~/components/Button'` is the import path of every file that imports `Button`. Run at `7ce866b`: `grep -rl "'~/components/Button'" src | grep -c .` → **46** files; `WarningDialog.tsx` and `ConfirmationDialog.tsx` each count 2 (one import, one compare). The predicate that yields 3 is the dead compare itself: `grep -rc "tagName !== '~/components/Button'" src` → `WarningDialog.tsx:1`, `ImageUploader.tsx:1`, `ConfirmationDialog.tsx:1` (3 files, run this pass); `grep -rn "useHotkeys(\['enter'\]" src` names the same three. The class and its members are right; the stated instrument is wrong, and the plan's own rule is that a count carries the instrument that produced it.
- **Impact**: QA Phase 1 and the implementer re-run the stated instrument, get 46, and either re-derive the class themselves or treat the plan's count as unreliable; the "no shared helper" claim rests on the same mis-stated read.
- **Recommendation**: replace the enumerator with the dead-compare predicate (or the `useHotkeys(['enter']` read), figure and date beside it, in both places.

**M-2 MEDIUM cycle 1 pass 1 — The `components-v2-emptiness-not-caught-by-the-send-gate` handoff's trigger fires on M6-l, and the plan lists it as not triggered.** State: OPEN.
- **Location**: § Exclusions, "Not triggered (read 2026-11-08): … `components-v2-emptiness…` (M4-a changes only the in-flight guard, not the validity predicate)"; § M6-l (ii).
- **Description**: the handoff's `Review-Trigger` reads "if work is proposed on the composer's send gate or on `validateContentRequirements`". M6-l (ii) adds a limb to `validateMessage`, which is the send gate's predicate (`send/page.tsx` → `isMessageValid` → `validateMessage`). The plan's reason addresses M4-a only; M6-l did not exist when the sentence was first written (rev 1) and the sweep was not re-run after F-44 entered (rev 2). The planner's entry-work rule re-runs the enumeration on every revision that rewrites a release milestone; the same discipline applies when a milestone enters the trigger's surface.
- **Impact**: the handoff's constraint ("note the constraint on how the class may be established" — no live sends to Discord to discover acceptance rules) is not carried into M6-l's verification, and the handoff is not told a chain touched its surface.
- **Recommendation**: disposition it — an Exclusions row (the emptiness class is outside the F-1–F-50 pool, D6; carrier: that handoff), and one clause that no M6-l criterion is settled by sending live messages. Re-read the other "not triggered" rows against M6-l while there.

**M-3 MEDIUM cycle 1 pass 1 — M8-a's instrument predicate is not bound to the shape the milestone will produce.** State: OPEN.
- **Location**: § M8-a P1 and Criterion ("one shutdown line"); `pig-host-read.sh` `[5a]` (`grep -c 'Server received'`, `grep -n 'Server received\|Server closed\|Server running at'`).
- **Description**: the owner-run instrument judges P1 by the prefix `Server received`. Today's line is `Server received SIGINT. Closing server.`, and the analysis's own Instrumentation Gaps row says it "will be wrong once the trigger is a message". An implementer who corrects the wording (as the analysis invites) breaks the only read M8-a has, and nothing in the plan ties the two. The plan's rule: a predicate written against a shape that does not yet exist names the milestone that will exercise it against one member and one non-member before any read relies on it.
- **Impact**: a correct implementation can read as zero shutdown lines at M8-0 run 2 — indistinguishable from the defect it fixes.
- **Recommendation**: P1 states the log line's stable predicate (prefix or token) the script greps, or states that the script's `[5a]` pattern is revised with the implementation and re-reviewed together; either way M8 names the exercise (the local M8-b/d/e probe run can emit the line on a sent `'shutdown'` message — one member — and a `ready` line — one non-member).

**M-4 MEDIUM cycle 1 pass 1 — The preview instance's existence on the host is unread, and M8-a's criterion presumes a running process to reload.** State: OPEN.
- **Location**: § M8-0 "When it runs. First …"; § M9 "push to `preview` (beta; deploys the 3001 instance)"; `pig-host-read.sh` usage (run 1 = `-prod` only).
- **Description**: `preview` is at `c233ec4`, an ancestor of `prod`; whether `hooks-image-preview-generator-preview` is a live PM2 process today is not in the record. If it is absent, `startOrReload` on the push is a **start**, with no stop at all, and "the first reload after the push" never happens without a further act. The script already accepts the preview name; run 1 reads only prod.
- **Impact**: M8-a's observation has no producer in one of two host states the plan cannot distinguish.
- **Recommendation**: run 1 takes both names (two invocations, same script), and M8-a states what each result does to the criterion — which folds into H-1's second stop.

### Low

**L-1 LOW cycle 1 pass 1 — preview-image-generator's rollback names no runner.** State: OPEN. § Plan's rollback paragraph covers "every website milestone"; § M8-a's rollback is "revert the commit and push `preview` (or `prod`)" with no party; § M9 says every remote push is devops's act, `prod` owner-approved. One line in M8-a naming devops (and the approval for `prod`) closes it.

**L-2 LOW cycle 1 pass 1 — M8-0's owner-step file is short of the planner's owner-step clauses, and the plan does not state the limit.** State: OPEN. planner.md requires the file "code-reviewed and run once against a captured real output before he runs it", and, where run as root, a fixed `PATH`, absolute paths and a root-computed digest. The plan says only "the code-reviewer reviews it". No captured real output exists (no host read has happened); the script resolves tools by `command -v` under the ambient `PATH`; the daemon's user is unknown until run 1 and may be root. Recommendation: name the substitute exercise (the `[3]` filter against a synthetic `jlist`, `[1]` against this box's `ps`, both by QA) or the stated limit; and the conditional — if `[1]` shows a root-owned daemon, the root-run clauses apply before run 2. D15 (a read-only user) may moot the root limb; the plan says which.

**L-3 LOW cycle 1 pass 1 — M6-l (ii) narrows the predicate behind the stored `valid` column, and the stored residue is unstated.** State: OPEN. `isMessageValid` writes `valid` at save; a message stored before release with more than 40 components over all nesting levels reads `valid = true` until its next save. Chain 012's `backfillValid.ts` is untouched (its handoff's trigger does not fire). State the residue as a stated limit with its population unknown (no instrument reads nested counts across the table — hazards: the classifier's counters are per-run), and the carrier.

**L-4 LOW cycle 1 pass 1 — P1's signal limb is stated as SIGINT; PM2's is `cst.KILL_SIGNAL`.** State: OPEN. Analysis V-1: `KILL_SIGNAL` is `PM2_KILL_SIGNAL || 'SIGINT'`; the script's `[4]` reads the override. P1 binds its signal limb to the value `[4]` reads (empty → SIGINT), so a daemon with `PM2_KILL_SIGNAL=SIGTERM` is not a silent miss.

**L-5 LOW cycle 1 pass 1 — P3 and P4 are growth beyond F-31's statement; priced here, not designed.** State: OPEN. F-31 (verbatim in M8-a) speaks to the fallback being cut off. P3 (exit when the drain completes) fixes analysis V-4, which the research never rated, and without it P1+P2 would turn today's ~5 s deploy gap into a 10 s floor — so P3 prevents a regression the fix itself would introduce; P4 is V-5. Both are the analyst's determination folded by the planner under D11's commission. One owner-facing line in M8-a saying so (two limbs added beyond the finding, why, and the drop disposition for each — P4 is droppable to a stated limit, P3 is not without re-pricing P2) closes it. No further machinery.

## Questions

- **Q-1 (steering, non-blocking)** — D3 rests on the research record's quote, "not yet confirmed by steering in this session"; the 04:49Z confirmation covered OQ-2/OQ-3 only. No milestone depends on it. Confirm in a rulings block or leave the row as it honestly stands.
- **Q-2 (planner, non-blocking)** — M1-d's class is {existing, new} × {count < 1000, count = 1000}; the count is per user or per guild (`isUserSelect(select)` in `upsertMessage`). Name the scope in the criterion so the test's population is the right one.

## Unresolved Open Questions

None. Every `OPEN QUESTION` in § Assumptions is `[RESOLVED]`.

## Risk Assessment

M0–M7 are low-risk, well-enumerated fixes at named sites with property-form criteria and a decision table where one is owed (M3); no HIGH finding lands on them, and QA Phase 1 may key on them as written once M-1 and M-2 are folded. M8 carries every HIGH and two MEDIUMs: its acceptance rests on a single owner-run instrument against a host nobody in the pipeline can read, and this pass finds that instrument pointed at the wrong stop (H-1), unbound to the line the fix will emit (M-3), and run against one of two processes (M-4). None of this is a defect in the fix's design — P1–P4 are right — it is a defect in how the plan would know the fix landed. Standing prediction for the register (RK, planner's choice of number): *a post-deploy M8 observation that is read off the deploy's own stop rather than a stop of the new code*; falsifier — a run-2 paste whose `[5b]` shows `still alive after 12000ms` for the reload the push performed, reported as a refutation of P1.

## Verdict

**REQUEST REVISION** — cycle 1, pass 1. Sized to the ask (49 of 50; L-5 the one priced growth). Fold H-1, M-1–M-4; L-1–L-5 may fold in the same pass or go to the Planner batch with a landing trigger. The architect's conformance pass reads the same revision in parallel; the planner's next revision waits for both verdicts (planner.md, one revision per planning pass).

**Next**: the planner subagent (planner-hooks-015) revises against these findings.
