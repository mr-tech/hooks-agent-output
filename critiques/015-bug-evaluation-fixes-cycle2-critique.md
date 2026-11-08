---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 2, pass 1, delta-bounded read of revision 6 (5d516d9; boundary verified against 1d0f890, plan 44/12). Verdict REQUEST REVISION: three MEDIUM on M8's local route (E-1's namespace leaves loopback down — measured; two run locations named; M8-c's browser source unstated and its fallback limit dropped), three LOW. M0–M7 carry only LOWs."
Artifact-Revision: 6 — read at agent-output 5d516d9
Reviewed-At: 5d516d9 — repos=agent-output; website 7ce866b (chain/015-bug-evaluation-fixes), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: REQUEST REVISION
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 2

Cycle 1 (passes 1–3, rev 3→5) is closed at `critiques/closed/015-bug-evaluation-fixes-critique.md` (`dee418b`). This document opens cycle 2 on the planner's own trigger: rev 6 changes criterion text (M1-c, P3, M8's local route), folding QA Phase 1's QAF-1–QAF-5 (`qa/015-bug-evaluation-fixes-qa.md`, `bf15750`, which read rev 4) and D20.

**Artifact**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 6 (`5d516d9`). Delta read whole: `git diff 1d0f890..5d516d9 -- planning/015-bug-evaluation-fixes.md` (`--numstat` 44/12; the intervening R-2 at `1f0481e` is a registration). Also read: QA's document §§ M8, Entry conditions, Irreversible Side-Effect Register, Findings; `verification/015/qa-phase1-premises-run1.txt` (64 lines, whole); `removeUserSession` and `clearUser`/`fetchUserAccount` at website `7ce866b`; `getPool.ts` launch options at `471578f`.
**Date**: 2026-11-08. **Critic**: critic-hooks-015.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T05:46 | steering-hooks-015 → critic-hooks-015 | New cycle on rev 6 | cycle 2 pass 1. Delta-bounded: the delta is fully readable in the diff; the whole-document read is the escalation, not taken. One premise measured in-pass (loopback inside `unshare -rn`). M-C2-1–M-C2-3, L-C2-1–L-C2-3 raised. REQUEST REVISION. Process disclosure: the first write of this row carried an estimated stamp (05:50 against a clock of 05:46); the stamp gate refused it and the row was re-stamped from `date -u` — a gate satisfied, not a control worked around. |
| 2026-11-08T05:48 | qa-hooks-015 → critic-hooks-015 | M-C2-1 accepted; E-1 amended | State change only: M-C2-1 → ADDRESSED on QA's document (`2625ef1`, verified by reading E-1's reconcile note and the probe files' presence in the commit stat); OPEN against the plan until rev 7. QA also notes the plan file moved to `8d67ce5` with a Resumption State only, and raises QAF-6/QAF-7 (LOW) to the planner — outside this critique. No verdict change. |

## Assumption Not Checked

This pass assumes puppeteer 21.1.0's `postinstall` (`node install.js`) honours `PUPPETEER_SKIP_DOWNLOAD=1` under `npm ci --omit=optional` — QA read `getConfiguration.js` for the variable (E-2) but whether `--omit=optional` runs that script at all, or runs it without the variable's effect, is not examined here. Falsity signature: a Chromium under `~/.cache/puppeteer` after the M8 install (E-2's re-check reads it), which silently removes M8-d's forcing condition. Owner of closing: the implementer at the M8 install, under E-2 — named again in the handoff.

**Measured this pass** (a premise a run settles in under a minute): inside `unshare -rn sh -c …` on this box, `ip -o link show lo` reports `state DOWN`, and a Python `connect(("127.0.0.1", p))` to a socket the same shell bound fails with `[Errno 101] Network is unreachable`; after `ip link set lo up` inside the namespace (permitted — `-r` maps the caller to root there) the same connect succeeds. Command and output are in this pass's transcript; the figures are quoted in M-C2-1.

## Value Statement Assessment

Unchanged at rev 6. No drift.

## Overview

**Pricing against the ask**: sized to the ask. Rev 6 adds cells to existing criteria (M1-c, P3), a stated limit (X-16), a standing-suite disposition on a touched surface (M2), and one control — E-1, a guard against an irreversible external delete QA's register found on the plan's own probe route (I-1). A guard against an irreversible side effect is justified regardless of whether a probe "could" send a well-formed body (disposition order, step 3); it is not new machinery. 49 of 50 findings, unchanged.

**Owed re-verdicts (rev 6 row)**: M1-c clear-out cells — approved save L-C2-1; M1-d limit (X-16) — approved; M2 QAF-1 note — L-C2-3; P3 idle cell — approved save L-C2-2; M8 E-1 and M8-c route — M-C2-1, M-C2-2, M-C2-3.

## Findings

### Medium

**M-C2-1 MEDIUM cycle 2 pass 1 — E-1's namespace, as written, leaves loopback down, so every HTTP probe on the local route fails under the control that protects the CDN.** State: ADDRESSED on QA's side — E-1 amended at `qa/015-bug-evaluation-fixes-qa.md` `2625ef1` (re-measured by QA: `verification/015/netns-loopback-probe.sh`, run beside it; full form: `-rn`, `lo` up, isolation check of 0 non-lo links and 0 default routes, loopback positive control; `-n` never dropped). OPEN against the plan until rev 7 carries the same form.
- **Location**: § M8 "Entry condition for every local generator run (QA E-1, QAF-5)" — "happens in an export without the tree's `.env`, under `unshare -rn`"; "`PREVIEW_ENDPOINT` (a loopback URL)"; QA § Entry conditions E-1 (same text).
- **Description**: a fresh network namespace has `lo` in `state DOWN`. Measured this pass (above): a connect to `127.0.0.1` fails with `Errno 101` until `ip link set lo up` is run inside the namespace. M8-b and M8-d are HTTP requests to the locally started server; P1's probe starts the server (which `listen`s — binding succeeds, connecting does not); M8-c's `goto` targets a loopback page. All four fail by construction under E-1 as written. The hazard is not the failure, which is found at the first run — it is what the first run does about it: the cheapest fix is dropping `-n`, and `-n` is the only limb of E-1 that stops a well-formed probe request from reaching the real S3 bucket when a probe value is mis-set (QA I-1: `deleteMessagePreviewImages` is awaited before the image, so the delete runs even when the launch fails). A control that blocks the legitimate run is the control most likely to be worked around.
- **Impact**: magnitude — 4 of 4 HTTP-shaped probes on the route unreachable; one irreversible-delete control exposed to erosion at the first run.
- **Recommendation**: E-1 states the form in full: `unshare -rn` then `ip link set lo up` inside it, before the server starts; and states the check that the namespace holds (no route to anything but `lo`). The same correction goes to QA's E-1, which binds the implementer from M0.

**M-C2-2 MEDIUM cycle 2 pass 1 — M8's local route names two run locations.** State: OPEN.
- **Location**: § M8 "Install. `npm ci --omit=optional` … into the generator tree (`node_modules` is git-ignored)" versus E-1 "happens in an export without the tree's `.env`".
- **Description**: the install bullet (unchanged from rev 4) puts `node_modules` in the chain-branch tree; E-1 (new at rev 6) runs every probe in an export. An export carries neither `.env` nor `node_modules`, so a run there has no dependencies unless the plan says where they come from: a second `npm ci` in the export, or a symlink to the tree's `node_modules` — the form this workspace's probe rigs use, with a known failure mode (hazards: a rig's symlinked `node_modules` can degenerate into a real directory and the probe then reads as failing; the free detector is the `??` entry in `git status`, and the repair is `rm -rf` then `ln -sfn`).
- **Impact**: the implementer and QA Phase 2 resolve the contradiction independently; a run in the tree with `.env` present is exactly what E-1 forbids.
- **Recommendation**: one location. If the export: the install happens there too, or the symlink form is named with its detector. The install bullet and E-1 are reconciled in one paragraph.

**M-C2-3 MEDIUM cycle 2 pass 1 — M8-c's browser source is unstated, and the code-review fallback was dropped while QA still cites it.** State: OPEN.
- **Location**: § M8 "M8-c needs a real browser. It runs locally under E-1, with a browser available now that D20 has lifted the Playwright constraint. Installing or upgrading Playwright is still not implied."; rev 5's text, removed at rev 6: "Without that go, M8-c is verified by code review and stated as a limit."; QA § M8, M8-c: "puppeteer launched against an executable already on this box via `executablePath` … If no compatible executable is present, M8-c is verified by code review and recorded as a limit, **as the plan says**."
- **Description**: D20 lifts the constraint on *using* browsers; it does not supply one. On this route puppeteer 21.1.0 has no browser (install under `PUPPETEER_SKIP_DOWNLOAD=1`; E-2 records `~/.cache/puppeteer` absent), and E-1's namespace has no network, so it cannot fetch one at launch. The only route is `executablePath` to a binary already on the box — QA names it; the plan does not — and whether puppeteer 21.1.0's protocol works against whatever Chromium Playwright left here is **unread** by every document. Meanwhile the plan's own fallback (code review + stated limit) was deleted at rev 6, and QA's strategy now cites a sentence the plan no longer carries.
- **Impact**: M8-c has a verification route whose one premise nobody has read and no stated fallback if it fails; two gate documents disagree on what the plan says.
- **Recommendation**: name the source — `executablePath` to a binary the implementer locates on this box, compatibility read or run once at M8 before M8-c is relied on — and restore the fallback sentence (code review + stated limit), so QA's citation resolves.

### Low

**L-C2-1 LOW cycle 2 pass 1 — M1-c's no-account cell says "the clear-out runs" over rows that need the account.** State: OPEN. `clearUser(userId, sessionToken, discordId)` deletes three Redis keys, one keyed by the account's `providerAccountId`; the `Accounts` update is keyed by it too. With no account found, only `user-access-token` and `user-session-token` can be cleared; the `user-guilds` key and the `Accounts` row cannot be addressed. State the cell over the stored keys it can reach, and name the residue (the guilds cache expires on its own TTL).

**L-C2-2 LOW cycle 2 pass 1 — P3's run-2 clause names no read.** State: OPEN. "M8-0 run 2 records whether the stopped process had served a request" — the out log's `POST /generate` debug lines after the last `Server running at` are the read (`server.ts` logs `req.method, req.url` on every request); the script gains that count before run 2, as it gained the `chrome_crashpad` exclusion after run 1. Under D19 the stopped process is the one the first deploy started minutes earlier, so an idle-process measurement is the likely case and the drain figure must be labelled as such.

**L-C2-3 LOW cycle 2 pass 1 — M2's QAF-1 note names a test file and a mutation procedure.** State: OPEN. "`src/utils/__tests__/bugFixCoverage.supplemental.test.ts`… imports the real `embedShape`… each case is shown red against a one-token mutation" is QA's content (planner.md, Boundaries: no test cases; the conventions' Self-referential-oracle disposition and its evidence row already say exactly this). The plan keeps the property — no M2 expectation is computed from a transcription of `embedShape`, and the standing transcription on the touched surface is dispositioned under the conventions' class — and cites QA's document for the file.

## Questions

None for the owner.

## Unresolved Open Questions

None. No `OPEN QUESTION` was added at rev 6.

## Verdict

**REQUEST REVISION** — cycle 2, pass 1. Sized to the ask. M0–M7 carry only LOWs and may be keyed by QA as written; the three MEDIUMs sit on M8's local route and are one-paragraph corrections each (M-C2-1's form is measured above; M-C2-3's fallback is rev 5's own sentence). M-C2-1 is also QA's to carry into E-1. RK-6: no new member. The architect's delta read and QA's confirmation read the same revision; one planning pass after all three.

**Next**: the planner subagent (planner-hooks-015) revises against these findings; QA Phase 1 amends E-1 (M-C2-1) on its own document.
