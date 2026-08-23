---
ID: 012
Origin: 012
UUID: 12a4fe3c
Status: OPEN
Status-Detail: >-
  Initial critique of plan rev 3 (commit c4cf783). Critique-cycle pass 1. One HIGH finding
  (release-order gap), two MEDIUM, one LOW. Verdict: REQUEST REVISION — all findings addressable
  in one planner pass; no owner decision required by this critique.
---

# Critique — Plan 012: `valid` field on stored messages

| Field | Value |
|---|---|
| Artifact | `agent-output/planning/012-message-valid-field.md`, revision 3, commit `c4cf783` |
| Analysis | None commissioned (per plan D3) |
| Date | 2026-08-23 |
| Status | Initial (critique-cycle pass 1; ladder rung: passes 1–5, proceed normally) |

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-08-23 | steering-hooks-012 brief | Critique plan 012 rev 3 | Initial critique. Code-level premise verification performed against both chain branches. 1 HIGH, 2 MEDIUM, 1 LOW. REQUEST REVISION. |

## Assumption Not Checked

This pass assumes the statbot workspace's plan 023 register (rows D9/D10) records the same
six-point shape as handoff 61f24e56's "Agreed shape", and does not test it — the statbot
agent-output repo was not read. Falsity signature: Statbot's gate behaviour at integration
diverging from D1 semantics (a record with absent `valid` treated other than as today, or
`valid: false` not rejected before processing). Owner of closure: the steering thread, which
relays the live declaration across workspaces — the relay should confirm statbot 023 row D10
against handoff 61f24e56 before the declaration lands (restated in the handoff section of my
report).

## Value Statement Assessment

Present, user-story form, opening the plan. The "so that" is verifiable (Statbot refuses
messages hooks.gg marks unsendable, instead of revalidating or failing a send) and the owner's
own framing is carried verbatim from the handoff. No Master Product Objective exists to align
against — no roadmap document exists in this workspace; the plan records that absence explicitly
rather than citing a document it did not read, which is the correct handling. Value is delivered
directly: the field ships computed, recomputed, backfilled, and exposed within this plan; nothing
core is deferred. **PASS.**

## Overview

Plan 012 implements handoff 61f24e56 (the contract statbot chain 023 already builds against):
a nullable boolean `valid` on `Messages`, truth condition = the composer's send gate, recomputed
on every write, backfilled across the whole table, exposed on both v1 endpoints, gated on an
owner-reviewed distribution before the live declaration. Rev 3 additionally folds in the
owner-authorised composer send-gate fix (M2, per rulings D5/D8), which removes the parity
exception rev 1 had blocked on.

**Pricing against the ask**: sized to the ask as amended by registered owner rulings. M2 is
scope beyond the original handoff, but it was authorised before it was written (D8, verbatim in
the register) and registered — priced scope, not growth. The distribution-report gate was
likewise owner-confirmed (D6). No unpriced guards, subsystems, or acceptance machinery found;
the one place the plan declines machinery (no `api-contract/` scaffold, Assumption 6) is argued,
carries a revisit trigger, and I concur.

**PREMISE-STALE check**: no milestone carries the marking. Rev 2's two markings were cleared at
rev 3 under authorisation D8, each with a re-argued premise in place. I reviewed all three
re-argued premises (M2, M3, M6-c) as plan revisions and verified them against the code — see
Verification Record. They hold.

**Unresolved Open Questions**: none. OQ-1/OQ-2/OQ-3 all carry `[RESOLVED]` dispositions with
their resolution routes. No user acknowledgment is required on this axis.

## Verification Record (premises checked at the receiving end)

Verified against `website` chain branch `chain/012-message-valid-field` (from `72dc7de`) and
`project-utils` chain branch (from `eb38a15`):

1. **M2's defect premise** — `validateContentRequirements` (`src/utils/limits.tsx`) receives
   only `embeds`/`content`/`components`; `grep -c "flags" src/utils/limits.tsx` = 0. The gate
   never reads `flags`; V2-ness is derived structurally (`V2_TYPES.has(c.type)`). Confirmed.
2. **Reachability of `flags` to both gate consumers** — `mapMessage`
   (`src/server/api/utils/shared.ts`) passes `data` through wholesale (`data: data as
   MessageData`), so the send page's `validateMessage(message.data)`
   (`src/app/message/m/[id]/send/page.tsx`, `isMessageValid`) receives stored `flags`; the
   editor's call site (`DiscordMessageEditor/index.tsx`, `noContentError =
   validateContentRequirements(message)`) receives `EditableMessageData`, and `makeEditable`
   (`src/utils/index.ts`) deep-copies without stripping, so loaded `flags` survives into editor
   state. `MessageData` (`src/@types/global.d.ts`) already declares `flags?: number`. The
   corrected gate can therefore see the flag at every existing consumer without any call-site
   or type change. Confirmed.
3. **Assumption 2 (purity)** — `limits.tsx` has zero `react`/`window`/`document` references;
   imports are `isValidUrl`, type-only editor types, and `~/constants`; the existing node-env
   suite (`src/utils/__tests__/mutual-exclusivity.test.ts`) already imports `validateMessage`
   from `~/utils/limits` directly. Confirmed.
4. **OQ-2's writer enumeration** — independent sweep for `insertInto('Messages')` /
   `updateTable('Messages')` / `deleteFrom('Messages')` across `src/` and `bot/` found exactly
   the three sites the plan enumerates: `upsertMessage` (insert + `onConflict…doUpdateSet` —
   a genuine two-branch upsert with an explicit conflict column set, so M4's "enumerated trap"
   is real), `updateRecentMessageData` (recent* columns only, never `data`), and the delete
   procedure (`src/server/api/routers/message.ts`). Confirmed.
5. **M3-c's username asymmetry** — `validateMessage` defaults `username = ''` and
   `validateUsername` fails on length, so records without a username compute `false`. Confirmed
   as stated.
6. **M5's endpoint structure** — both v1 files carry a local `ResponseMessage` interface, a
   Kysely select pick list, and an explicit response construction; the column is invisible until
   added per file. Confirmed.
7. **M1's toolchain claims** — `project-utils` `package.json`: `rebuild` = lint + build +
   build:types, no `prisma generate` anywhere (0 mentions in `.githooks/pre-commit`); both
   `src/generated/db/` and the orphan `src/generated/Database/` exist; `model Message` carries
   `@@map("Messages")` and `data Json`. Confirmed.
8. **Pin facts** — cited to the architecture record (updated 2026-08-23), which states the
   website pins `eb38a15` = project-utils `master` HEAD; citation check only, per the
   authoritative-record rule — not re-derived here.
9. **Error copy** — "Components V2 messages cannot contain embeds or content." exists verbatim
   in `validateContentRequirements`. Confirmed.
10. **`tools/check-repo.js` baseline** — FAIL with 255 problems; `grep -c "012"` over its output
    = 0, so chain 012's documents add zero over the 001–010 baseline, as the planner reported.

## Architectural Alignment

Consistent with the architecture record throughout: D-002 (git-dep with committed dist) is
respected by M1's ordered generate→rebuild→commit chain and by M4's pin-resolution precondition,
which implements the cross-repo-contract skill's pinned-dependency proof steps exactly (push
first, refresh pin and lockfile, remove installed copy, frozen-lockfile install, rebuild). The
ref-set for the release gate is enumerated per-repo, and the pin-ordering argument is explicitly
discharged for `project-utils`. The declared absence of new architectural surface is accurate —
one additive field on an existing surface, no new layer or contract. Assumption 6's declined
contract scaffold is a justified deviation from the skill's default, with a named revisit
trigger. The D7-ruled auth finding is respected as terminal and not re-raised.

## Scope Assessment

Boundaries are sharp: five Out of Scope entries each carry a route (owner ruling, handoff, or
on-next-touch note), and the deliberately excluded JSON-editor question lives in its own routed
handoff (cb83fd7b) rather than as an unpriced rider — scope discipline, not a gap. No riders.
Serialised shared files are recorded with one owner. Reading Order present (not even required at
this length) and its rows route to current sections.

## Technical Debt Risks

Low. The plan mostly *removes* debt surface (one symbol, two callers, for the truth condition;
by-construction parity). The debts it knowingly carries are named with dispositions (orphan
generated-types artifact; save-path flag normalisation per D10). The rollback note honestly
states that reverting the website deploy also reverts the M2 gate fix. Remaining debt risk is
F2 below — a placement constraint that could push the implementer toward the exact
reimplementation the plan forbids.

## Findings

### F1: Release conditions do not pin the total order of the four release components
- **Severity**: HIGH
- **Status**: OPEN
- **Location**: Plan §Validation and Release Conditions (items 2, 3, 5); M1 (owner-executed DDL); M6
- **Description**: Condition 5 orders the two ref moves (`project-utils` before `website`, per
  the pin discipline) but states no order between the ref moves and the two operational steps
  (owner-executed DDL, backfill). Two of the possible orderings have production consequences the
  plan does not name:
  1. **Website deploy before DDL**: `upsertMessage`'s insert values and conflict column set will
     name a column the production table does not have; Postgres rejects the statement, so
     **every message save and create fails** — magnitude: 100% of the core write path, from
     deploy until the DDL lands.
  2. **Backfill before website deploy**: any record saved in the window between backfill and
     deploy carries a **stale non-NULL verdict** computed from its pre-save data. The handoff's
     clause 4 ("recomputed on every save… Statbot can therefore trust the value directly") makes
     this a contract violation, and M6-a's instrument cannot see it — the totality count reads
     0 NULLs and passes while wrong values persist until the record's next save.
- **Impact**: This is the plan's most direct answer to "how does this result in a hotfix after
  deployment": both misorderings are silent in every suite and every stated instrument, and the
  devops agent verifying release conditions has no line telling it order matters beyond the two
  refs.
- **Recommendation**: State the total order as a release condition: DDL → `project-utils` push →
  `website` deploy → backfill → owner distribution review → live declaration. One sentence noting
  backfill idempotence (same predicate, same stored data — a re-run converges) would also license
  recovery if the order slips.

### F2: Backfill script placement conflicts with its own reuse criterion
- **Severity**: MEDIUM
- **Status**: OPEN
- **Location**: M6 (script home `agent-output/verification/012/`) vs the same paragraph's "must
  use the same predicate the save path uses — the M3 module, not a reimplementation"
- **Description**: The cited precedent (the owner-executed sweep) was a self-contained fetch
  script. This script must import the M3 module — website TSX source reached through `~` path
  aliases and website's `node_modules` — and `getPostgres()` from `project-utils`, from a
  directory in a different repository. That resolution burden is exactly where "reuse, not
  reimplementation" quietly fails: an implementer fighting module resolution reimplements the
  predicate, and M6's by-construction parity silently becomes by-assertion parity.
- **Impact**: The criterion most load-bearing for backfill correctness (parity by construction)
  is the one the stated file placement makes hardest to satisfy.
- **Recommendation**: Keep the property (the backfill executes the same exported symbol the save
  path calls) and reconcile the placement — either permit the script to live where the module
  resolves (the website chain branch), with its **report** captured at
  `agent-output/verification/012/`, or state explicitly that the verification/012 placement
  carries the resolution burden and remains subordinate to the reuse property. Which mechanism —
  the implementer's call, not the plan's.

### F3: M6 names no disposition for rows the predicate cannot evaluate
- **Severity**: MEDIUM
- **Status**: OPEN
- **Location**: M6 acceptance properties (M6-a totality, M6-b distribution)
- **Description**: The backfill covers the whole historical table, including rows whose `data`
  may predate the current Zod write shapes. M6-a requires every row to carry a verdict at time T,
  but no criterion names the residue class *rows on which the predicate throws* or what verdict
  they receive. The planner's own criteria rule requires unnamed residue in an enumerated domain
  to be named as a bounded class. (The predicate is defensively written — defaults throughout —
  so the class is plausibly empty; its size is exactly what the run will measure, which is why
  this is a naming finding, not a gate.)
- **Impact**: An unhandled throw mid-run leaves a partial backfill with no stated recovery
  semantics; a silently swallowed throw leaves a row whose verdict has no defined meaning.
- **Recommendation**: Name the class and its disposition in M6 — e.g., evaluation failures are
  counted as their own row in the M6-b report the owner already reviews, with the verdict such
  rows carry stated (a row the checker cannot pass is not `true`). The mechanism is the
  implementer's; the named class and its verdict are the plan's.

### F4: Stale parenthetical in the standing scope constraint
- **Severity**: LOW
- **Status**: OPEN
- **Location**: Decisions Register, standing constraint below the table: "(which OQ-1 below
  explicitly requests for one clause)"
- **Description**: OQ-1 was resolved without amending the shape (D5 relocated the defect to the
  composer). The parenthetical still reads as a pending amendment request, present tense.
- **Impact**: Every downstream reader of the register briefly believes a contract amendment is in
  flight. Cheap per read, but the register is the most-read section in the plan.
- **Recommendation**: One-line fix: rephrase to past disposition ("OQ-1 requested this for one
  clause and was resolved without amendment — D5").

## Questions

None requiring the owner. All four findings are planner-addressable within the existing
authorised scope; none reopens a registered decision.

## Risk Assessment

The plan's own Risks table is well-formed — classes with falsifiers, instruments, and per-pass
records. Recording against its standing predictions for this pass: **R1** (truth-condition
drift): no member observed; the removal of the residue exception is verified real (the gate
itself will decide the flags class, one symbol, two callers confirmed). **R2** (mass
invalidation): no data yet; the D6-confirmed review gate stands; F3 above slightly widens what
the M6-b report should carry. **R3** (stale types): no member; M1's ordered steps verified
against the actual scripts. **R4** (parallel-chain premise): no member — rev 3 amends no D1
clause. F1 adds a risk the table does not carry (release-order), best absorbed as the release
condition F1 recommends rather than a new row.

## Recommendations

1. Planner pass addressing F1 (one release-condition sentence plus idempotence note), F2
   (placement reconciliation), F3 (named residue class in M6), F4 (one-line rephrase).
2. No re-review of M1–M5 substance is expected to be needed — the premise verification above
   stands for rev 4 provided those milestones' text is unchanged.

**Verdict: REQUEST REVISION** — critique-cycle pass 1, rung 1–5 (normal operation; no ladder
requirement binds, stop authority not fired — no repeated defect shape observed). Pricing line:
the plan is sized to the ask as amended by registered rulings D6/D8; M2 is priced scope, not
growth.

## Revision History

| Date | Artifact rev | Findings addressed | New findings | Status changes |
|---|---|---|---|---|
| 2026-08-23 | rev 3 (`c4cf783`) | — (initial) | F1 (HIGH), F2 (MEDIUM), F3 (MEDIUM), F4 (LOW) | Critique opened, Status OPEN |
