---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Open
Status-Detail: "Cycle 2, pass 2, delta-bounded read of revision 7 (38b12e6; boundary verified against 5d516d9, plan 59/17). Verdict APPROVED: M-C2-1–M-C2-3 and L-C2-1–L-C2-3 verified landed → RESOLVED. One new LOW (L-C2-4: M1-c's no-account cell attributes the adapter's session-row deletion to the clear-out) routes to the planner for a fold or a Planner batch row; Open until that row is read."
Artifact-Revision: 7 — read at agent-output 38b12e6 (643a7bc on top is a research write)
Reviewed-At: 38b12e6 — repos=agent-output; website 7ce866b (chain/015-bug-evaluation-fixes), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 2

Cycle 1 (passes 1–3, rev 3→5) is closed at `critiques/closed/015-bug-evaluation-fixes-critique.md` (`dee418b`). This document opens cycle 2 on the planner's own trigger: rev 6 changes criterion text (M1-c, P3, M8's local route), folding QA Phase 1's QAF-1–QAF-5 (`qa/015-bug-evaluation-fixes-qa.md`, `bf15750`, which read rev 4) and D20.

**Artifact**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 7 (`38b12e6`); pass 2 read the delta `5d516d9..38b12e6` whole (`--numstat` 59/17; `8d67ce5` between them adds the planner's Resumption State only). Pass 1 read revision 6 (`5d516d9`). Delta read whole: `git diff 1d0f890..5d516d9 -- planning/015-bug-evaluation-fixes.md` (`--numstat` 44/12; the intervening R-2 at `1f0481e` is a registration). Also read: QA's document §§ M8, Entry conditions, Irreversible Side-Effect Register, Findings; `verification/015/qa-phase1-premises-run1.txt` (64 lines, whole); `removeUserSession` and `clearUser`/`fetchUserAccount` at website `7ce866b`; `getPool.ts` launch options at `471578f`.
**Date**: 2026-11-08. **Critic**: critic-hooks-015.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T05:46 | steering-hooks-015 → critic-hooks-015 | New cycle on rev 6 | cycle 2 pass 1. Delta-bounded: the delta is fully readable in the diff; the whole-document read is the escalation, not taken. One premise measured in-pass (loopback inside `unshare -rn`). M-C2-1–M-C2-3, L-C2-1–L-C2-3 raised. REQUEST REVISION. Process disclosure: the first write of this row carried an estimated stamp (05:50 against a clock of 05:46); the stamp gate refused it and the row was re-stamped from `date -u` — a gate satisfied, not a control worked around. |
| 2026-11-08T05:48 | qa-hooks-015 → critic-hooks-015 | M-C2-1 accepted; E-1 amended | State change only: M-C2-1 → ADDRESSED on QA's document (`2625ef1`, verified by reading E-1's reconcile note and the probe files' presence in the commit stat); OPEN against the plan until rev 7. QA also notes the plan file moved to `8d67ce5` with a Resumption State only, and raises QAF-6/QAF-7 (LOW) to the planner — outside this critique. No verdict change. |
| 2026-11-08T05:50 | steering-hooks-015 → critic-hooks-015 | Pass 2 on rev 7 | cycle 2 pass 2. Delta-bounded, boundary verified. Re-derived: `/usr/bin/google-chrome --version` → 156.0.8078.47 and `/snap/bin/chromium --version` → 157.0.8103.38 (match the plan's read); `fetchUserGuilds` `expireSeconds: 600`; `removeUserSession`'s caller is next-auth's `signOut` event. M-C2-1–M-C2-3, L-C2-1–L-C2-3 → RESOLVED. New: L-C2-4 (LOW). Rev-7 owed re-verdicts row: all limbs approved. APPROVED. |

## Assumption Not Checked

**Pass 2** assumes that puppeteer 21.1.0 can drive Chrome 156 / Chromium 157 over CDP, which no document has read; the plan marks it unread and names the implementer's one-launch settle at M8 with the fallback behind it. Falsity signature: the M8 launch record shows a protocol error against both binaries. Owner of closing: the implementer at M8 (plan § M8-c "Compatibility, unread") — named again in the handoff.

**Pass 1** assumed puppeteer 21.1.0's `postinstall` (`node install.js`) honours `PUPPETEER_SKIP_DOWNLOAD=1` under `npm ci --omit=optional` — QA read `getConfiguration.js` for the variable (E-2) but whether `--omit=optional` runs that script at all, or runs it without the variable's effect, is not examined here. Falsity signature: a Chromium under `~/.cache/puppeteer` after the M8 install (E-2's re-check reads it), which silently removes M8-d's forcing condition. Owner of closing: the implementer at the M8 install, under E-2 — named again in the handoff.

**Measured this pass** (a premise a run settles in under a minute): inside `unshare -rn sh -c …` on this box, `ip -o link show lo` reports `state DOWN`, and a Python `connect(("127.0.0.1", p))` to a socket the same shell bound fails with `[Errno 101] Network is unreachable`; after `ip link set lo up` inside the namespace (permitted — `-r` maps the caller to root there) the same connect succeeds. Command and output are in this pass's transcript; the figures are quoted in M-C2-1.

## Value Statement Assessment

Unchanged at rev 6. No drift.

## Overview

**Pricing against the ask**: sized to the ask. Rev 6 adds cells to existing criteria (M1-c, P3), a stated limit (X-16), a standing-suite disposition on a touched surface (M2), and one control — E-1, a guard against an irreversible external delete QA's register found on the plan's own probe route (I-1). A guard against an irreversible side effect is justified regardless of whether a probe "could" send a well-formed body (disposition order, step 3); it is not new machinery. 49 of 50 findings, unchanged.

**Owed re-verdicts (rev 6 row)**: M1-c clear-out cells — approved save L-C2-1; M1-d limit (X-16) — approved; M2 QAF-1 note — L-C2-3; P3 idle cell — approved save L-C2-2; M8 E-1 and M8-c route — M-C2-1, M-C2-2, M-C2-3.

## Findings

### Resolved at pass 2 (disposition lines; the argument lives in `39fb6b9`)

M-C2-1 MEDIUM cycle 2 pass 1 RESOLVED — E-1 runs the server inside `unshare -rn` whose first step is `ip link set lo up`, with a self-check (loopback GET answers, external lookup fails) before any criterion is read and the remedy stated as never dropping `-n`. Plan rev 7 `38b12e6`; QA's E-1 `2625ef1`; architect AF-13 `1be7e72` (independent measurement).
M-C2-2 MEDIUM cycle 2 pass 1 RESOLVED — one location: the export, with `npm ci --omit=optional` run inside it before the namespace is entered; no link to the shared tree's `node_modules`. Plan rev 7.
M-C2-3 MEDIUM cycle 2 pass 1 RESOLVED — M8-c's source is `executablePath` to a binary on this box (`/usr/bin/google-chrome` 156.0.8078.47, `/snap/bin/chromium` 157.0.8103.38 — versions re-read this pass), compatibility marked unread and settled by the implementer with one launch and one screenshot under E-1, fallback restored (code review + stated limit). Plan rev 7.
L-C2-1 LOW cycle 2 pass 1 RESOLVED — the no-account cell names the two keys it clears and the `user-guilds` residue on its 600 s TTL (re-read). Plan rev 7; one wording precision remains as L-C2-4.
L-C2-2 LOW cycle 2 pass 1 RESOLVED — run 2's read is the count of `POST /generate` lines after the last `Server running at`; the script gains it before run 2, analyst-written and code-reviewed with M8. Plan rev 7.
L-C2-3 LOW cycle 2 pass 1 RESOLVED — M2's note is a property (no expectation over `embedShape`'s class computed from a copy) citing QA § M2 for the file. Plan rev 7.

### Low (new at pass 2)

**L-C2-4 LOW cycle 2 pass 2 — M1-c's no-account cell credits the clear-out with the adapter's act.** State: OPEN. The cell reads "exactly two things happen: the `user-access-token` and `user-session-token` keys are deleted, and the session's DB rows are removed." `removeUserSession` removes no session row: its only DB act is the `Accounts` update, skipped in this cell. The session row is deleted by next-auth's adapter before the `signOut` *event* fires (`src/server/auth.ts` `events.signOut` is the caller, read at `7ce866b`), so it is not observable at the unit M1-c changes and not caused by it. One clause: attribute the row deletion to the adapter, or drop it from the cell; the cell's observable content is the two key deletions, no `Accounts` update, no revoke.

## Questions

None for the owner.

## Unresolved Open Questions

None. No `OPEN QUESTION` was added at rev 6.

## Verdict

**Pass 2 — APPROVED** (cycle 2, pass 2). Sized to the ask: 49 of 50, unchanged; rev 7 adds precision, one control's full form and one module-placement (AF-14), no new work. Every pass-1 finding is verified landed. The rev-7 owed re-verdicts row — M1-c no-account cell, M2 note, P3 pool read and run-2 read, M8 E-1, M8-c source and fallback — is approved; L-C2-4 is a wording precision on the first and moves no code, test or criterion behaviour: it folds in the planner's next registration or parks as a Planner batch row with a landing trigger, and this critique closes when that row is read. RK-6: no new member. The architect's delta read and QA's re-key read rev 7 in parallel; steering records the implementation start when all three have approved.

**Next**: steering (the other two gates' verdicts; implementation start); the planner for L-C2-4.

---

**Pass 1 — REQUEST REVISION** — cycle 2, pass 1 (retained as the verdict the planner revised against). Sized to the ask. M0–M7 carry only LOWs and may be keyed by QA as written; the three MEDIUMs sit on M8's local route and are one-paragraph corrections each (M-C2-1's form is measured above; M-C2-3's fallback is rev 5's own sentence). M-C2-1 is also QA's to carry into E-1. RK-6: no new member. The architect's delta read and QA's confirmation read the same revision; one planning pass after all three.

**Next**: the planner subagent (planner-hooks-015) revises against these findings; QA Phase 1 amends E-1 (M-C2-1) on its own document.
