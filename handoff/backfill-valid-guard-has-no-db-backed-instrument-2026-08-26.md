---
UUID: d7f207a9
Status: Open
Status-Detail: >-
  Two chain-012 items were each explicitly routed to "handoff material under D18" and no handoff was
  ever created, so both survived only inside documents that are now in `closed/`. This document is
  that destination, written after the fact. Both concern the same file - `src/scripts/backfillValid.ts`
  in `website` - and both are unclosed for the same underlying reason: **no DB-backed instrument
  exists in this environment**, so neither can be settled by the unit suite that closed everything
  else on chain 012. Neither is a defect in shipped behaviour; chain 012 released with both known,
  bounded and accepted on the record. Nothing here reopens chain 012 or amends any of its findings.
  A third item, from chain 013, was added on 2026-11-11 by owner selection (Item 3).
Owning-Stage: >-
  Unassigned. The next step is one decision - whether a DB-backed integration harness is worth
  building in this repo at all - and only then implementation. Deliberately NOT scoped or sized here:
  steering performed no investigation beyond verifying that both items exist as quoted and that no
  other record carries them. If the answer is that the harness is not worth building, the right
  outcome is to say so on this document and close it, not to leave it open indefinitely.
Review-Trigger: >-
  Re-read this if a DB-backed integration harness is proposed for any reason, if `backfillValid.ts`
  is modified, if a second backfill-style mass-mutation script is written for any table, or if
  anyone proposes running such a script against a host reached through a unix socket.
---

# Handoff — the `valid` backfill guard has two items no unit test can close

**Raised:** 2026-08-26, by `steering-hooks-012-2`, from the chain 012 retrospective (`fd41706`,
finding **P5**).

**Why it exists at all** is itself the point. Both items below were routed, in their own documents,
to "handoffs under D18". **D18 named a destination that nothing was obliged to create**, so no
handoff appeared, and a repo-wide search found both items in the six chain-012 documents and nowhere
else — every one of which is now in `closed/`. Five sibling residuals survived only because the
devops stage pulled them into its release record on its own initiative. This document exists so that
these two do not depend on someone repeating that favour.

---

## Item 1 — MS-4: the backfill's NULL guard has no executable falsifier

**Source:** `qa/closed/012-message-valid-field-qa.md`, mutation sweep row MS-4.

The mutant is: the backfill's `WHERE valid IS NULL` condition moves **out of** the `UPDATE` and into
a preceding `SELECT`. QA declared before running the sweep that this mutant is **not equivalent** —
it is a real behavioural difference — and recorded it as a **SURVIVOR** at 41/41 green, because
killing it requires a concurrent-save fixture: read a row's NULL, let a save land, then write, and
assert the surviving verdict is the save's and not the backfill's. **No fixture in this environment
can do that.**

QA's own disposition, quoted: the guard was *"verified present at source (`backfillValid.ts`, the
per-row `updateTable` chain)"*, the damage is *"bounded by release order (saves recompute their own
rows)"*, and it is caught in aggregate by M6-a **only if rows are left NULL, which this mutant does
not cause**. QA declined to record it as equivalent and routed it instead — which was correct, and
is why it is still live.

**What would close it:** a DB-backed integration harness. QA states that is the only closure.

---

## Item 2 — CR-L11: the guard's host string need not name the host the connector dials

**Source:** `code-review/closed/012-message-valid-field-code-review.md`, finding CR-L11, carried
unchanged from round 5 through round 7.

`DATABASE_URL` admits forms where the string the guard inspects does not name the host the connector
actually dials. The closed `?host=` parameter was one member of that family; the reviewer records
that **2 of 3 unix-socket URL forms diverge**. It stays **LOW** for one reason, quoted: *"a unix
socket cannot reach the remote production database."*

That is a bound, not a fix. The guard's correctness currently rests on a property of the *transport*
rather than on the guard inspecting what the connector will do.

**What would close it:** either the guard deriving its verdict from the connector's resolved target
rather than from the URL string, or an instrument that proves the two agree across the URL forms the
environment admits. Chain 012 built a probe for the adjacent question — `verification/012/
probe-cr6-dial-target/` establishes what the socket dials, with its oracle fixed before running and
a confirmation gate refusing any host but `127.0.0.1`. **That probe is the obvious starting point
and is deliberately cited rather than re-derived here.**

---

## Item 3 — plan 013 assumption 7's falsifier cannot be read

**Source:** `TODO.md` at agent-output `a22fb73`, "The held 013 planner queue", item 6, written by
`steering-hooks-013-2` on 2026-08-25. Added here on 2026-11-11 by the owner's selection
(`steering/queue-hooks-rulings.md`, prompt 9). It is a chain-013 item, not a chain-012 one; it sits
here because it concerns the same script and is open for the same reason.

Assumption 7's falsifier is *the classifier reading `> 0` after the owner declares the D19 repair
done*. The repair ran on 2026-08-25 (plan 013 **D43**). But `runBackfill` in
`src/scripts/backfillValid.ts` selects `.where('valid','is',null)` and accumulates its diagnostics
only over the rows in that batch, so every category in a report covers `rowsClassifiedThisRun`, not
the table. Every row now carries a non-null `valid`, so a run classifies nothing and reports zeroes
over an empty set, and an empty measurement is byte-indistinguishable from a pass in the report's
own JSON. The owner's post-repair run read `count: 0` over `rowsClassifiedThisRun: 2` against
`tableWideRowCount: 4839`.

**Do not quote a zero from that report as evidence of anything.**

**What would close it:** a read-only table-wide classifier. Setting `valid = NULL` across the table
is a write, not a measurement, and is not authorised. Neither exists. The detector-selection
disposition is QA's and UAT's.

---

## What is NOT being claimed

- **Neither item is a defect in shipped behaviour.** Chain 012 released with both known and accepted
  on the record; the code review's round-7 verdict was `APPROVED_WITH_COMMENTS` with no CRITICAL and
  no HIGH.
- **Neither is re-derived here.** The quotes above are from the closed documents; those documents
  remain the authority, and this one adds no finding of its own.
- **No severity is restated.** MS-4 carries QA's disposition; CR-L11 carries the reviewer's LOW and
  the reasoning that bounds it. Steering has not re-graded either.
- **This is not a request to reopen chain 012.** It is released, declared live and fully closed.

## Route record

Found by the chain 012 retrospective as finding P5 and reported to `steering-hooks-012-2`, which
verified independently that both items appear only in chain-012 documents now in `closed/` before
writing this. The retrospective's broader observation — that routing to a destination nothing is
obliged to create loses items silently — is recorded in the retrospective itself, not here.

Item 3 was added on 2026-11-11 by `steering-queue-hooks` on the owner's selection; "neither item" and
"both" above refer to Items 1 and 2 only.
