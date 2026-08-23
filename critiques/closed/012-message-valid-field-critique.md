---
ID: 012
Origin: 012
UUID: 12a4fe3c
Status: Resolved
Status-Detail: >-
  Pass 2 (rev 4, commit 13b4d4c): all four pass-1 findings verified RESOLVED against the diff.
  Both steering-flagged items judged sound (NULL-only backfill = valid narrowing; F3's false
  disposition = contract derivation, not amendment). Verdict: APPROVED for implementation.
---

# Critique — Plan 012: `valid` field on stored messages

| Field | Value |
|---|---|
| Artifact | `agent-output/planning/012-message-valid-field.md`, revision 4, commit `13b4d4c` |
| Analysis | None commissioned (per plan D3) |
| Date | 2026-08-23 |
| Status | Revision 1 (critique-cycle pass 2; ladder rung: passes 1–5, normal) |

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-23 | steering-hooks-012 brief | Critique plan 012 rev 3 | Initial critique. Code-level premise verification against both chain branches. 1 HIGH, 2 MEDIUM, 1 LOW. REQUEST REVISION. |
| 2026-08-23 | steering-hooks-012 | Re-verify rev 4 (`13b4d4c`) | All four findings verified RESOLVED against the diff, not the report. Two flagged judgements made (see Pass-2 Judgements). Verdict APPROVED. Critique closed: Status Resolved, moved to `closed/`. |

## Assumption Not Checked

**Pass 2**: This pass assumes the NULL-only backfill write will be implemented as an atomic
guarded write (condition inside the write, not check-then-write) and does not test it — no code
exists yet to examine; the plan states the property ("can never overwrite a save-computed
verdict") and correctly leaves the mechanism to the implementer. Falsity signature: a
check-then-write implementation reintroduces the read-compute-write race, observable as a row
whose stored verdict disagrees with the predicate over its current `data` after a save concurrent
with the backfill. Owner of closure: the code-reviewer stage, at review of the M6 implementation
(named again in my handoff report).

**Pass 1** — CLOSED, holds (2026-08-23, steering-hooks-012, via read-only comparison of both
documents whole): statbot plan 023 rows D9/D10 match handoff 61f24e56 on every clause chain 012
implements — field name, type, placement, truth condition, backfill, recompute-on-save,
absent-key rule, `false`-rejection-before-mapping, no-per-reason detail. Neither falsity
signature occurred. Three edge divergences reported, none touching chain 012's obligations; the
one substantive item (statbot's worker-path log line committed in the handoff but absent from
statbot 023's criteria) is a statbot-side gap, routed by steering to that domain — not a 012
finding and not re-raised here.

## Value Statement Assessment

Unchanged at rev 4; pass-1 assessment stands: **PASS** (present, user-story form, verifiable
outcome, direct delivery, roadmap absence correctly recorded).

## Overview

Pass 1 (rev 3) verified the plan's code-level premises at the receiving end and returned four
findings. Pass 2 (rev 4) verified each fix against the committed diff `c4cf783..13b4d4c`:
changes confined to the header, changelog, the register's standing constraint (F4), M6, release
condition 5, the Risks per-pass records, and one Handoff Notes bullet. **M1–M5 carry no hunks**,
as the planner stated, so the pass-1 Verification Record below remains current for rev 4.

**Pricing line (pass 2)**: still sized to the ask as amended by registered rulings D6/D8. Rev 4
adds no unpriced machinery — the NULL-only/idempotence narrowing is fix-round material serving
F1's recovery clause (judged below), and the new Handoff Notes bullet restates standing
workspace policy for a known instance, adding no gate.

## Pass-2 Judgements (items steering flagged for this stage's call)

1. **NULL-only, idempotent backfill — sound narrowing, not new behaviour needing its own
   argument.** It is derived from the fix round's own needs: F1's recovery clause required a
   convergent re-run, and NULL-only is what makes it one. Checked against the criteria it could
   have broken: M6-a totality still holds (M4-covered saves write verdicts; the backfill fills
   the remaining NULLs; count at T = 0); the guarded write closes the per-row race in the
   correct direction (a save landing between the backfill's read and write leaves the fresher
   save-computed verdict standing); M6-c is unaffected (sentinels read the backfilled table, not
   the report); contract clause 3's uniform day-one population is satisfied by the union of
   M4-computed and backfill-computed rows. One residual accepted as negligible: M6-b's
   distribution now covers only backfill-computed rows, excluding the handful save-computed in
   the deploy→backfill window — those verdicts come from the same predicate via M4, and the
   release order makes the window small.
2. **F3's `valid: false` for unevaluatable rows — a derivation from handoff 61f24e56, not an
   amendment. No owner escalation needed.** Clause 2 is a biconditional: `valid: true` ⇔ the
   message passes the composer's checks. A row the checker cannot evaluate has not passed the
   checks, so `true` would violate the biconditional; clause 3 (all records carry the field from
   day one) forecloses leaving it absent; `false` is the only value the contract permits. The
   product-visible consequence (Statbot refuses such a record) is the contract's stated
   behaviour for `false`, and the owner sees the class's count and row ids in the M6-b report
   before the live declaration (D6 gate) — so even if the class turns out non-empty, the
   decision to go live over it is his, made on data.

## Verification Record (pass 1, premises checked at the receiving end — still current at rev 4)

Verified against `website` chain branch `chain/012-message-valid-field` (from `72dc7de`) and
`project-utils` chain branch (from `eb38a15`):

1. **M2's defect premise** — `validateContentRequirements` (`src/utils/limits.tsx`) receives
   only `embeds`/`content`/`components`; `grep -c "flags" src/utils/limits.tsx` = 0. The gate
   never reads `flags`; V2-ness is derived structurally (`V2_TYPES.has(c.type)`). Confirmed.
2. **Reachability of `flags` to both gate consumers** — `mapMessage`
   (`src/server/api/utils/shared.ts`) passes `data` through wholesale, so the send page's
   `validateMessage(message.data)` (`src/app/message/m/[id]/send/page.tsx`, `isMessageValid`)
   receives stored `flags`; the editor's call site (`DiscordMessageEditor/index.tsx`,
   `noContentError = validateContentRequirements(message)`) receives `EditableMessageData`, and
   `makeEditable` (`src/utils/index.ts`) deep-copies without stripping; `MessageData`
   (`src/@types/global.d.ts`) already declares `flags?: number`. Confirmed.
3. **Assumption 2 (purity)** — `limits.tsx`: zero `react`/`window`/`document` references;
   node-safe imports; the node-env suite already imports `validateMessage` from
   `~/utils/limits`. Confirmed.
4. **OQ-2's writer enumeration** — independent sweep found exactly the three writers the plan
   enumerates: `upsertMessage` (genuine two-branch `onConflict…doUpdateSet` — M4's trap is
   real), `updateRecentMessageData` (never `data`), the delete procedure
   (`src/server/api/routers/message.ts`). Confirmed.
5. **M3-c's username asymmetry** — `validateMessage` defaults `username = ''`, which
   `validateUsername` fails. Confirmed.
6. **M5's endpoint structure** — both v1 files: local `ResponseMessage`, Kysely pick list,
   explicit response construction. Confirmed.
7. **M1's toolchain claims** — `rebuild` omits `prisma generate` (0 mentions anywhere,
   including `.githooks/pre-commit`); both `src/generated/db/` and orphan
   `src/generated/Database/` exist; `model Message` carries `@@map("Messages")`. Confirmed.
8. **Pin facts** — citation check against the architecture record (authoritative, updated
   2026-08-23): website pins `eb38a15` = project-utils `master` HEAD.
9. **Error copy** — "Components V2 messages cannot contain embeds or content." exists verbatim.
10. **`tools/check-repo.js` baseline** — 255 failures, zero mentioning 012.

## Architectural Alignment

Pass-1 assessment stands; rev 4 strengthens it (release condition 5 now gives the devops agent
order to verify, not merely occurrence). No new architectural surface introduced by rev 4.

## Scope Assessment

Pass-1 assessment stands. Rev 4's additions are fix-round material plus one policy restatement;
no scope growth.

## Technical Debt Risks

Low, as at pass 1. The F2 resolution removes the one identified reimplementation pressure.

## Findings

All findings resolved at rev 4 (`13b4d4c`); full arguments recoverable at commit `235f294`.

- **F1 (HIGH) RESOLVED** — total release order stated in release condition 5 with both named
  misordering failures, binding precedences separated from the total order, and NULL-only
  idempotent recovery. Verified in the rev-4 diff.
- **F2 (MEDIUM) RESOLVED** — script placed where reuse resolves (website chain branch); the
  report remains the `verification/012` artifact; mechanism left to the implementer. Verified.
- **F3 (MEDIUM) RESOLVED** — evaluation-failure residue named as its own M6-b category (count +
  row ids, owner-reviewed) with `valid: false`, judged contract-derived (Pass-2 Judgements #2).
  Verified.
- **F4 (LOW) RESOLVED** — register parenthetical rephrased to past disposition. Verified.

## Questions

None. Neither flagged item requires the owner (Pass-2 Judgements).

## Risk Assessment

The plan's rev-4 per-pass records for R1–R4 accurately transcribe this critique's pass-1
results; no new members of any registered class observed at pass 2. No new risk rows warranted.

## Recommendations

1. **APPROVED for implementation.** Per the plan's QA-sequencing line, QA Phase 1 (test
   strategy) precedes implementation — route to the qa subagent, then the implementer.
2. The code-reviewer stage owns closing this critique's pass-2 Assumption Not Checked (atomic
   guarded backfill write) when M6's implementation is reviewed.

**Verdict: APPROVED** — critique-cycle pass 2, rung 1–5 (normal; no ladder requirement binds,
stop authority not fired). All findings RESOLVED; critique Status Resolved and closed.

## Revision History

| Date | Artifact rev | Findings addressed | New findings | Status changes |
|---|---|---|---|---|
| 2026-08-23 | rev 3 (`c4cf783`) | — (initial) | F1 (HIGH), F2 (MEDIUM), F3 (MEDIUM), F4 (LOW) | Critique opened, Status OPEN |
| 2026-08-23 | rev 4 (`13b4d4c`) | F1, F2, F3, F4 → RESOLVED (verified against diff) | None | Critique Status → Resolved; moved to `closed/` |
