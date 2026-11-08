---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Resolved
Status-Detail: "Cycle 1, pass 3, delta-bounded read of revision 5 (1d0f890; boundary verified against 192ec29, plan 26/18, no criterion text changed). L-6–L-9 verified landed → RESOLVED; D19's limbs (M8-a (2), M8-0 run 2, M9) approved. Every finding RESOLVED. Verdict APPROVED; critique closed. Plan rev 5 1d0f890 is the approved plan."
Artifact-Revision: 5 — read at agent-output 1d0f890
Reviewed-At: 1d0f890 — repos=agent-output; website 7ce866b (chain/015-bug-evaluation-fixes), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since pass 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes (website, preview-image-generator)

**Artifact**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 5 (`1d0f890`), read at `1d0f890`; pass 3 read the delta `192ec29..1d0f890` whole (plan `--numstat` 26/18). Pass 1 read revision 3 whole at `b234e2b`; pass 2 read the delta `b234e2b..f19e688` (`--numstat` 195/73 on the plan; the diff file was read whole) plus the architect's rev-3 and rev-4 findings (`b838a01`, `192ec29`), the rulings blocks 05:20Z–05:29Z, the M8-0 run 1 capture (`verification/015/m8-0-run1-2026-11-08T0525Z.txt`, 97 lines, read whole) and the revised `pig-host-read.sh`.
**Analysis**: `analysis/015-bug-evaluation-fixes-analysis.md` (`7e24de3`, amended `9b99acd`) — read whole.
**Sources also read**: `research/codebase-bug-evaluation-2026-11-08.md` (`aea4a05`); `steering/015-rulings.md` (blocks 04:37Z, 04:49Z, 05:11Z); `architecture/system-architecture.md`, `architecture/website.md`, `architecture/preview-image-generator.md`; `verification/015/pig-host-read.sh` (`9b99acd`); the seven handoff triggers the plan dispositions. No roadmap exists (`agent-output/roadmap/` holds `.gitkeep` only), as the plan's header records; alignment is judged against the Master Product Objective as the workspace README states it.
**Date**: 2026-11-08.
**Critic**: critic-hooks-015.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T05:17 | steering-hooks-015 → critic-hooks-015 (brief) | Critique rev 3 | cycle 1 pass 1. Whole-document read (first pass of the cycle). Premises re-derived at the trees: M3's three sites, the limits constants, `ADMIN_PERMS`, `embedShape.color`, `countTotalComponents`, `isMessageValid`, the duplicate `splice` sites, `server.ts`/`ecosystem.config.js`/`deploy.sh`/`config.ts`. H-1, M-1–M-4, L-1–L-5 raised. REQUEST REVISION. |
| 2026-11-08T05:33 | planner-hooks-015 → critic-hooks-015 | Critique rev 4 | cycle 1 pass 2. Delta-bounded: the delta is fully readable in the diff and no new cycle is owed (M8 is reshaped by owner rulings D16–D18 and run 1, but every changed limb is in the diff; the whole-document read is the escalation, not taken). Boundary: `git diff --numstat b234e2b..f19e688` lists the plan at 195/73 and no other plan write; `f19e688..192ec29` touches the plan 0 lines. Re-derived at the trees: the four `'in',` sites (`grep -rn "'in'," src/server` → 4), `authorizeAction`'s one call site. H-1, M-1–M-4, L-1–L-5 verified landed → RESOLVED. New: L-6–L-9. Owed re-verdicts table (M8, M1-a, M6-l (iii)–(v)): all three approved by this pass. APPROVED. |
| 2026-11-08T05:36 | planner-hooks-015 → critic-hooks-015 | Read rev 5's rows | cycle 1 pass 3. Delta-bounded (`git diff --numstat 192ec29..1d0f890`: plan 26/18; the diff read whole; the M8-a criterion block and every other criterion are outside the hunks). D19 registered from `fa693e0` with its route; M8-a (2) is devops' `prod.yml` re-run stated as a second production deploy, AF-9d cited; stop (1) restated per AF-11; M8-0 run 2's reader is devops with its earliest read; M9's owner step is the approval; D15 current; X-15 carries the June–August gap to the 05:29Z block; M1-a's route corrected per AF-12. L-6–L-9 → RESOLVED. D19 limbs approved. APPROVED; document closed. Noted, not a finding: rulings `d852da1` lifts the Playwright constraint (D2's reopening class) — a registration for the planner's next pass, moving no criterion. |
| 2026-11-08T05:36 | critic-hooks-015 | Document closed | Status: Resolved |

## Assumption Not Checked

**Pass 3** assumes nothing new: the delta was read whole and contains no code claim this pass did not already verify.

**Pass 2** assumed M8-0 run 1's capture is a faithful read of the host (the script ran as `claude-ro` and its output was committed by the analyst; this pass read the capture, not the host) and does not re-run it. Falsity signature: run 2's `[2]` extract or `[4]` stop lines contradicting run 1's figures for the same stops (2024-06-15, 2026-06-15). Owner of closing: the stage that runs M8-0 run 2 (L-6 asks the plan to name it) — named again in the handoff.

**Pass 1** assumed the research's statement of each of the 49 in-scope defects — site, mechanism and reachability as read at website `7ce866b` and preview-image-generator `471578f` — is correct, and re-reads only the sites named in the changelog row above; it also assumes the analysis's PM2 source reading (V-1, V-3) is correct, which the brief says no gate has checked. The signature of either's falsity: a milestone's first test written against the finding is **green at the base** (the defect is not where the plan says), or M8-0 run 1 shows a `Server received` line timed at a stop (PM2 did deliver a signal). The stage that owns closing: the implementer's red-at-base at each milestone (TDD), and, for M8, the owner's M8-0 run 1 — named again in the handoff.

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

### Resolved at pass 2 (disposition lines; the argument lives in `68308e8`)

H-1 HIGH cycle 1 pass 1 RESOLVED — M8-a now states the two stops: (1) the deploy's own stop of the old process, expected signature `still alive after 12000ms` → SIGKILL, "expected, not a refutation", with its stated limits; (2) the verifying stop of the new code, with its runners named and the criterion read on (2) only by M8-0 run 2. RK-6 registers the class as a standing prediction with the pass-1 member recorded. Plan rev 4 `f19e688`. (The 05:29Z selection choosing the `prod.yml` re-run over the owner's `pm2 reload` post-dates rev 4 — a registration the planner owes; see L-9.)
M-1 MEDIUM cycle 1 pass 1 RESOLVED — M3 and § Assumptions enumerate by `grep -rc "tagName !== '~/components/Button'" src` (3) and name the import path as a non-enumerator (46 files). Verified at pass 1. Plan rev 4.
M-2 MEDIUM cycle 1 pass 1 RESOLVED — X-14 dispositions the `components-v2-emptiness` handoff (trigger fires on M6-l; outside the pool, D6) and M6-l (v) carries its no-live-sends constraint; the "Not triggered" list is re-read against every milestone. Plan rev 4.
M-3 MEDIUM cycle 1 pass 1 RESOLVED — P1 fixes the log line (begins `Server received`, names the trigger, once per drain inside the idempotency guard, plus a drain-complete line with elapsed ms — architect AF-3), names the predicate and its non-member (`Server running at`), and the local probe exercises both before any host read. Plan rev 4; script `fe27690` anchors on the same prefix.
M-4 MEDIUM cycle 1 pass 1 RESOLVED — no preview instance exists (run 1 `[1]`, rulings 05:20Z) and the preview leg is withdrawn (D16); the script reads both names. Plan rev 4.
L-1 LOW cycle 1 pass 1 RESOLVED — M8-a's rollback names devops, owner-approved as for any `prod` push. Plan rev 4.
L-2 LOW cycle 1 pass 1 RESOLVED — moot under D17: M8-0 is a `claude-ro` file read with no `pm2` command and no root; the script also now fixes `PATH=/usr/bin:/bin`. Plan rev 4; decided by the owner's 05:21Z selection.
L-3 LOW cycle 1 pass 1 RESOLVED — M6-l (iv) states the stored-`valid` residue (population unknown, no instrument) with X-13 as carrier. Plan rev 4.
L-4 LOW cycle 1 pass 1 RESOLVED — P1's signal limb is SIGINT with the `PM2_KILL_SIGNAL` residue named as unread (root `environ` is off limits to `claude-ro`) and moot for the observed message path. Plan rev 4.
L-5 LOW cycle 1 pass 1 RESOLVED — M8-a carries "Growth beyond the finding": P3 not droppable without re-pricing P2, P4 droppable to a stated limit. Plan rev 4.

### Resolved at pass 3 (disposition lines; the argument lives in `3398fc0`)

L-6 LOW cycle 1 pass 2 RESOLVED — M8-0 run 2 is devops', after the `prod.yml` re-run completes and `pm2.log` shows the app online. Plan rev 5 `1d0f890`.
L-7 LOW cycle 1 pass 2 RESOLVED — D15's cell reads "Met 05:20Z; superseded by D17". Plan rev 5.
L-8 LOW cycle 1 pass 2 RESOLVED — X-15 carries the gap to steering's 05:29Z FYI block (`fa693e0`). Plan rev 5.
L-9 LOW cycle 1 pass 2 RESOLVED — D19 registered; M8-a (2) is devops' re-run, a second production deploy needing his approval, AF-9d cited; stop (1) restated as a 12 s delay (AF-11); M9's owner step is the approval. Plan rev 5.

## Questions

- **Q-1 (steering, non-blocking)** — D3 rests on the research record's quote, "not yet confirmed by steering in this session"; the 04:49Z confirmation covered OQ-2/OQ-3 only. No milestone depends on it. Confirm in a rulings block or leave the row as it honestly stands.
- **Q-2 (planner, non-blocking)** — M1-d's class is {existing, new} × {count < 1000, count = 1000}; the count is per user or per guild (`isUserSelect(select)` in `upsertMessage`). Name the scope in the criterion so the test's population is the right one.

## Unresolved Open Questions

None at rev 4. Every `OPEN QUESTION` in § Assumptions is `[RESOLVED]`; OQ-G and OQ-H are answered in the rulings file and registered as D16–D18.

## Risk Assessment

M0–M7 are low-risk, well-enumerated fixes at named sites with property-form criteria and a decision table where one is owed (M3); no HIGH finding lands on them, and QA Phase 1 may key on them as written once M-1 and M-2 are folded. M8 carries every HIGH and two MEDIUMs: its acceptance rests on a single owner-run instrument against a host nobody in the pipeline can read, and this pass finds that instrument pointed at the wrong stop (H-1), unbound to the line the fix will emit (M-3), and run against one of two processes (M-4). None of this is a defect in the fix's design — P1–P4 are right — it is a defect in how the plan would know the fix landed. Standing prediction for the register (RK, planner's choice of number): *a post-deploy M8 observation that is read off the deploy's own stop rather than a stop of the new code*; falsifier — a run-2 paste whose `[5b]` shows `still alive after 12000ms` for the reload the push performed, reported as a refutation of P1.

## Verdict

**Pass 3 — APPROVED, critique closed** (cycle 1, pass 3). Every finding is RESOLVED, verified in rev 5's text; D19's limbs are approved; no criterion changed, so no other gate's rev-4 read expires. Plan rev 5 `1d0f890` is the approved plan. QA Phase 1 remains the one pre-code gate yet to read it (spawn cue sent to steering at pass 2). RK-6: no new member.

**Pass 2 — APPROVED** (cycle 1, pass 2). Sized to the ask: 49 of 50; M1-a's widening to four sites completes F-2's own class (the originating statement is about the class), not growth. Every pass-1 finding is verified landed in rev 4's text. The owed re-verdicts table's three limbs — M8, M1-a, M6-l (iii)–(v) — are approved by this pass. L-6–L-9 are LOW and route to the planner: fold them in the registration pass the 05:29Z selection already owes (no planning revision is needed for L-6–L-8; L-9's limit lines move no criterion), or park each as a Planner batch row with a landing trigger before implementation approval. The critique closes when those rows are read. RK-6's register: no new member at this pass — rev 4's criterion reads stop (2) only. The architect's delta pass is APPROVED (`192ec29`); QA Phase 1 has not read this revision and has no live session — a spawn cue to steering.

**Next**: steering (QA Phase 1 spawn cue; the implementation start waits on its approval); the planner for L-6–L-9 and the D19 registration.

---

**Pass 1 — REQUEST REVISION** — cycle 1, pass 1 (retained as the verdict the planner revised against). Sized to the ask (49 of 50; L-5 the one priced growth). Fold H-1, M-1–M-4; L-1–L-5 may fold in the same pass or go to the Planner batch with a landing trigger. The architect's conformance pass reads the same revision in parallel; the planner's next revision waits for both verdicts (planner.md, one revision per planning pass).

**Next**: the planner subagent (planner-hooks-015) revises against these findings.
