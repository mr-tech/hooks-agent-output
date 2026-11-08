---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Resolved
Status-Detail: "Cycle 7 closed after pass 1: revision 24 (018f72d) APPROVED; L-C7-1 LOW carried by Planner batch row R-9 (dd30d3c) as the property over every stated-limit behavioural-residue row, a standing constraint on the register, landing at the next planning pass or the seam before the UAT anchor — landed-by-author at that fold, not critic-verified. Every finding carries a landing trigger recorded in the plan."
Artifact-Revision: 24 — read at agent-output 018f72d; R-8 and R-9 (b2833fa, c7afca3, dd30d3c) add batch rows and changelog lines, no requirement moved
Reviewed-At: dd30d3c — repos=agent-output; website ef5a9cc (chain/015-bug-evaluation-fixes, the D28 seed-probe tree M5-i cites; tip 24ac49f), preview-image-generator 471578f (chain/015-bug-evaluation-fixes), unchanged since cycle 1
Verdict: APPROVED
---

# Critique — Plan 015, Bug-evaluation fixes — cycle 7

**Artifact**: `planning/015-bug-evaluation-fixes.md`, revision 24 (`018f72d`). **Analysis**: none commissioned. **Prior cycles**: cycles 1–6 under `critiques/closed/` (cycle 6 closed at rev 23 + R-7, `42a1783`). Cycle 6 resolved before this revision, so rev 24 opens cycle 7, pass 1 (steering's brief called it cycle 6's next pass). **Date**: 2026-11-08.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-08T08:14 | steering-hooks-015 (message, 08:12Z) | cycle 7 pass 1: delta over `39dbc0d..018f72d` (rev 24) | Delta-bounded pass. CR-21 fold verified (type-12 `items` member in class (3), X-19's blank-render class dropped with its detection owner named, the presence rule in Verification). M5-i's premise re-read at website `ef5a9cc` (`WebhookMenu` `useState(hasWebhooks ? (guild?.id ?? '') : 'load')`): holds. D34/X-20 against rulings `766bd4b`/`dd2a337`, the handoff's routing fields and `website.md` W-7 (`952e69f`): consistent. L-C5-1 and L-C6-2 verified discharged. One LOW, L-C7-1, as a property over the register's stated-limit residue rows. RK-6: no new member. Verdict APPROVED. |
| 2026-11-08T08:16 | planner-hooks-015 (message, 08:15Z) | Document closed | Status: Resolved. Plan R-9 (`dd30d3c`; `018f72d..dd30d3c --numstat 5/0`: a code-review Round 13 row, R-8 and R-9 lines, the AF-28 and L-C7-1 batch rows) read: the L-C7-1 row carries the property verbatim in substance, the standing-constraint clause, X-16 and X-21 as owing one clause each, the "cycle 6 → 7" slip, its source (`1b5f3e8`) and a landing trigger — the next planning pass, at latest the seam before the UAT anchor. Nothing else is owed; the file moves to `critiques/closed/`. |

## Boundary

Delta-bounded, the cycle's entry pass: `git diff --numstat 39dbc0d..018f72d -- planning/015-bug-evaluation-fixes.md` = 49/18, read whole (`scratchpad/rev24-plan.diff`); `steering/015-rulings.md` 6/0 at `018f72d` plus the 08:12Z correction line at `eeb9d83` (blocks 08:10Z AF-26 and 08:11Z W-7, read); `architecture/website.md` W-7 read in the `39dbc0d..HEAD` diff. The delta adds M5-i, D34, X-20, X-21 and three Planner batch changes, rewrites X-19 and M5-h's Verification bullet, adds one class-(3) member, rewords M4-d's webhook-load limb and D29's attribution, and adds three changelog rows. Nothing reshapes a milestone beyond what the diff shows, so the whole-document read is not taken. After `018f72d` the plan is unchanged through `eeb9d83` (`--numstat` empty).

## Pricing

Sized to the ask: 47 of 50 fixed, F-15/F-39 closed under D30, plus the CR-12 rider and one D28 sibling, M5-i. M5-i is the same defect shape as F-22/F-24 (a mount-time seed that never follows its input) at a sibling site, so it rides under D28 ("folded and reported, never asked"); the planner reports it in the rev 24 row, as D28 requires. It is a limb of M5, not a new milestone, and adds one change, review and QA on a milestone already open. Not scope growth beyond the owner's class ruling.

## Value Statement Assessment

Unchanged at rev 24. M5-i serves the statement's "what the editor shows follows what you did" reading of F-22/F-24; X-20 is a known limit by the owner's own words (D34), outside the statement.

## Assumption Not Checked

This pass assumes the implementer's D28 seed probe (`verification/015/d28-seed-probes/run1-ef5a9cc.txt`, 6 cells, exit 0) read `WebhookMenu`'s state through `StyledAccordion`'s `selected` prop faithfully — that the stub reads the same state the real accordion opens on — and does not re-run it; the seed expression itself was re-read at `ef5a9cc` and the probe's three `WebhookMenu` cells follow from it by inspection. Falsity's signature: a first visit to a guild with webhooks opening on the webhook list at `ef5a9cc`, where the probe says "load". Owner of closing it: QA Phase 2's M5-i cells at the fix SHA, and the plan's human-observable walk on the served chain tip.

## Rev 24 read against its sources

- **CR-21 fold.** Class (3) gains "a type-12 media gallery's `items` is not an array", cited to code review's `reported-run1/2-da24eb7.txt`; X-19 drops its blank-render class and names its detection owner ("while this plan is open, a report … is recorded under X-19 and is the planner's to act on; after closure a new defect report"); the Verification bullet makes each cell assert its outcome's presence and reads an emptied root as a crash. This is also the remedy for cycle 6's reconcile note (the critic's own misread of row 46) and for L-C6-2 (i) as restated there. "A node count at least the positive control's order" is loose wording, but the binding clause — presence of the line or the editor — is exact; not a finding.
- **M5-i.** Premise at `ef5a9cc`: `WebhookMenu/index.tsx:108–109`, `hasWebhooks = status === 'authenticated' && guildId && webhooks.length` seeding `useState(hasWebhooks ? (guild?.id ?? '') : 'load')`; `GuildProvider.getWebhooksAndChannels` is a query (`GuildProvider.tsx:102`), so on a first visit the list arrives after mount. Intent is read from the seed's own conditional (webhooks present → the guild's list), not inferred. The property names its inputs (signed in, a guild selected, at least one webhook), the user's pick as the boundary, and X-21 as residue; siblings M5-d and M5-f are cited. The probe report's "whether staying put is wrong is a product reading" is answered by D28's class, which the planner applies and reports.
- **D34 / X-20 / W-7.** D34 carries his own words verbatim with the route and the rulings SHA, then the selection; the handoff `one-hooks-user-several-discord-accounts-2026-11-08.md` carries `Owning-Stage: planner` and an event-form `Review-Trigger`; `website.md` W-7 lands the rule verbatim with its mechanism check (next-auth's callback-handler link path; the send page's `session === null` closing steering's unread site), and the rulings file's 08:12Z line corrects "A-6" to W-7. X-20's "population unread" is honest; a database read is the handoff's trigger, not this pass's to run.
- **L-C5-1, L-C6-2.** Discharged in text: M4-d's limb now names {no response, non-JSON response} → "Invalid URL" and a JSON `message` body as the Discord-refusal class; D29's row attributes label and description correctly; "type-1 action row"; X-19's owner named. Both batch rows read "Discharged at rev 24".
- **Owed re-verdicts.** The rev 24 row names "critic (cycle 6)"; this is cycle 7. A wording slip, carried in the delivery.
- **PREMISE-STALE.** M5-i changes a default tab on the send page — product behaviour; no downstream unauthorised milestone reads `WebhookMenu`'s category (M6 is editor-side, M7 the bot, M8 the generator, M9 release); none owed. The planner's row does not say so explicitly; it is recorded here.

## Findings

### Low

**L-C7-1 LOW cycle 7 pass 1 — Stated-limit residue rows in the Exclusions register do not all name who detects a member and acts; stated as a property over the register, not the instance.**
- **State**: OPEN with its landing trigger recorded — Planner batch row R-9 (plan `dd30d3c`), the property and both owing rows carried; folds at the next planning pass, at latest the seam before the UAT anchor. It closes landed-by-author at that fold, the discharging document being the plan revision that folds it; no critic pass verifies it.
- **Location**: plan § Exclusions, rows carried as "Stated limit" whose subject is a behavioural residue (a user-observable case left as the base has it): X-16, X-18, X-19, X-21. Enumeration: `grep -c '^| X-'` over § Exclusions = 18 rows; 8 carry "Stated limit" (X-1, X-7, X-8, X-13, X-16, X-18, X-19, X-21); of those, X-1/X-7/X-8 exclude work by decision and X-13 is carried by a handoff, leaving four residue rows. X-18 names its reopening class through D30 and X-19 names the planner (rev 24); **X-16** (the F-4 race a constraint or transaction would close) and **X-21** (a guild change after the user's pick) name none.
- **Description**: this is the second instance of the shape L-C6-2 (i) raised (X-19 at rev 23), in a new cycle, so the remedy is the property, not the instance: every Exclusions row whose carrier is a stated limit over a behavioural residue names the register row a report of a member lands under and who acts on it while the plan is open, and its post-closure fate (a handoff, or "a new defect report against the property"), as X-19 now does.
- **Impact**: a report of a member of X-16 or X-21 after release has no named home; two rows, one clause each.
- **Recommendation**: add the clause to X-16 and X-21 and keep the property as a standing constraint on the register — the next writer of a "Stated limit" residue row meets it. The detection cost then sits where each row says; this critique names no mechanism. Landing: Planner batch row at the planner's next pass; this critique closes when the row is read.

## Risks register

RK-6 (the M8 wrong-stop class): rev 24 touches no M8 read; no new member.

## Questions

None for the owner.

## Unresolved Open Questions

None: the rev 24 diff carries no `OPEN QUESTION` line; the `NewMessageModal` seed is a Planner batch row with its disposition priced, not an `OPEN QUESTION`.

## Verdict

**Pass 1 — APPROVED** (cycle 7, pass 1; after implementation approval, REQUEST REVISION reserved for HIGH or CRITICAL, none raised). Sized to the ask: 47 of 50 plus the rider and one D28 sibling (M5-i), reported as D28 requires. CR-21 folded; M5-i's premise re-read at `ef5a9cc` and holding; D34/X-20 consistent with the rulings, the handoff and W-7; L-C5-1 and L-C6-2 verified discharged. One LOW, L-C7-1, a property over the register's stated-limit residue rows (X-16 and X-21 lack a detection owner), owed as a Planner batch row. D24–D34 terminal; nothing here re-raises them. RK-6: no new member. No owner-needing item.

## Closure

Closed 2026-11-08T08:16 at plan rev 24 with R-9 (`dd30d3c`): L-C7-1 carried by the plan's Planner batch row as a property with its landing trigger. Items carried past this document: this pass's Assumption Not Checked (the D28 seed probe's accordion read) is QA Phase 2's M5-i cells and the plan's human-observable walk. A later revision that changes criterion text, milestone scope or an instrument's form opens cycle 8 in a new file.

**Next** (as written at pass 1): the implementer — M5-h was held on this round and M5-i is new in an open milestone; both may proceed against rev 24 (the next-act table: an approval after implementation approval goes to the implementer where the revision changed a milestone being coded). The planner: L-C7-1's batch row at its next pass.
