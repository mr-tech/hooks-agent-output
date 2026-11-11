---
ID: 016
Origin: 016
UUID: 54673438
Status: Resolved
Status-Detail: "Cycle 1 closed at pass 2 on plan revision 2: APPROVED. F-1 to F-10 are RESOLVED, each verified in the revision 2 diff. F-11 (LOW) is closed as a stated limit under the stop authority; the implementer follows the formal definition."
Artifact-Revision: 2 — read as the diff 3b4205d..6b07655 (192 added, 104 removed), against revision 1 read whole at pass 1
Reviewed-At: "6b07655 — repos=agent-output; website code read at 0e3d903 (master); corpus fixture read at record 803a97c"
Verdict: APPROVED
---

# Critique — Plan 016, the send check refuses what Discord refuses

**Artifact**: `planning/016-send-check-validity.md`, revision 1 (`4c9bcf2`, with R-1 at `3b4205d`)
at pass 1, revision 2 (`6b07655`) at pass 2. **Analysis**: none commissioned. The plan rests on two
research documents, `research/closed/components-v2-send-validity-2026-11-11.md` and
`research/closed/components-v2-description-text-limit-2026-11-11.md`, both read whole at pass 1.
**Date**: 2026-11-11.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-11T10:45 | steering-queue-hooks (brief `steering/queue-hooks-briefs/critic-016-brief.md`) | cycle 1 pass 1: plan revision 1, whole-document read | First pass of the cycle, so the whole plan was read (351 lines; no Reading Order is owed under 500). Artifact changes: none before this pass. New findings: F-1 to F-5 MEDIUM, F-6 to F-10 LOW, all OPEN. Findings addressed: none. Verdict REQUEST REVISION. Pricing: sized to the ask. |
| 2026-11-11T11:08 | planner-hooks-016 (message, 11:06Z) | cycle 1 pass 2: delta over `3b4205d..6b07655` (revision 2) | Delta-bounded pass: the diff (192/104) was read whole, and the plan at `HEAD` is `6b07655` (`git diff --quiet`, exit 0). Artifact changes: the corpus is now QA's 116-member fixture; placement covers every limb; AC1-6p, AC1-9, AC1-10 and AC1-11 are added; the `/preview` surface is stated; rider R1 is dropped. Findings addressed: F-1 to F-10, all RESOLVED. New finding: F-11 LOW, closed as a stated limit under the stop authority. Verdict APPROVED. Pricing: sized to the ask. Document closed, Status: Resolved. |

## Verdict

**APPROVED — cycle 1, pass 2.**

Pricing: sized to the ask. Revision 2 still has one send-check change (M1), the 1024 constant and
inputs (M2) and a release (M3). It adds criteria and no milestone. Rider R1 is gone.

**The stop authority fired on this pass, on F-11.** F-11 is the second instance of one shape: a
predicate the plan states twice, with the two statements differing on an unmeasured member (the
first was F-8). No revision is requested for it. It is closed by property and stated limit below.
The hard stop did not fire. Nothing routes to the owner from this critique.

**Stated limit (F-11).** Where a limb has a formal definition and a plain-language gloss, the
formal definition is the criterion. The domain is every predicate the ledger defines in words:
whitespace-empty, "has an emoji", the Placement paragraph and L10's bound. Only whitespace-empty
carries a gloss that differs from its definition. The one residue class: a string that mixes
U+0085 with other whitespace between two U+0085 characters, such as U+0085, space, U+0085. The
definition passes it; the gloss ("`trim()` with U+0085 counted as whitespace") would refuse it. No
corpus member decides it, and Discord's verdict is unmeasured, so it is residue of research N-3.
The implementer follows the definition. If QA measures such a member, it files it against L1.

## Value Statement Assessment

Unchanged by revision 2. The user story is present and its outcome can be checked; M1 delivers it
directly. The workspace has no roadmap, so there is no Master Product Objective document to read;
the architecture record's statement of the product (a Discord message builder that sends through
webhooks) is served by a send check that agrees with Discord.

## Assumption Not Checked

Pass 2: this pass assumes the verdicts recorded for QA's 40 first-measured corpus members are what
Discord returned, and does not test it. If that is false, a later re-send of one of those members
differs from its recorded `discord` field. QA Phase 2 owns closing it, under AC1-1's rule for a
differing re-send.

Premises run in this pass:

- **The corpus counts.** The plan says 116 members, 82 refused and 34 accepted. `grep -c` over
  `verification/016/corpus/fixture/discordV2SendCorpus.ts` gives 116 `"id"` lines, 82
  `"discord": "refused"` and 34 `"discord": "accepted"`. Its blob is `00c45ad` (`git hash-object`),
  as the plan cites.
- **The 1024 boundary is in the corpus.** The fixture holds a Thumbnail and a gallery item at 1024
  (accepted) and at 1025 (refused), and a nested 1025 member.
- **Open questions.** 5 lines name `OPEN QUESTION`; 4 are `[RESOLVED]` and the fifth is the section
  heading. No milestone is `PREMISE-STALE`.

Pass 1's assumption (the 76 bodies can be rebuilt) is closed: QA Phase 1 re-sent them with 76 of 76
verdicts matching (`qa/016-send-check-validity-qa.md`, record `803a97c`).

## Reachability, checked in the code at `0e3d903` (pass 1)

- **Send and edit share one gate.** `src/app/message/m/[id]/send/page.tsx`: `isMessageValid` is
  `!validateMessage(message.data)`, `allowSave` requires it, and the button is
  `isDisabled={!allowSave}`. An edit is the same `sendMessage` call with `oldMessage` set.
- **The reason line reaches the send page and `/preview`.** `MessagePreview.tsx` and
  `src/app/preview/page.tsx` both render `DiscordMessageEditor`, and the sibling error lines in
  `DiscordMessageEditor/index.tsx` have no edit-mode condition.

## Findings

F-1 MEDIUM cycle 1 pass 1 RESOLVED — the `/preview` surface is named, with its consequence, the sibling precedent and UAT as observer. Plan rev 2, § Objective and § Assumptions, "The reason line".

F-2 MEDIUM cycle 1 pass 1 RESOLVED — the corpus now holds the 1024 and 1025 members, and AC1-1, AC1-4 and AC1-7 quantify over it. Plan rev 2, ledger L10 and AC1-1.

F-3 MEDIUM cycle 1 pass 1 RESOLVED — every limb applies at every placement the save schema admits, with measured and schema-extended placements told apart. Plan rev 2, ledger "Placement" and AC1-2.

F-4 MEDIUM cycle 1 pass 1 RESOLVED — the reach is a property with named input classes and an instrument (QA's two-tree differential). Plan rev 2, AC1-9.

F-5 MEDIUM cycle 1 pass 1 RESOLVED — a post-deploy observation is named, with a liveness pair and a pre-release read of its unfixed value. Plan rev 2, AC1-6p; QA register rows B-3 and B-4.

F-6 LOW cycle 1 pass 1 RESOLVED — rider R1 dropped under its priced disposition; D-13 records the clause as fired. Plan rev 2, § Testing Strategy and X-9.

F-7 LOW cycle 1 pass 1 RESOLVED — the decider and the oracle are named for both causes of a differing re-send. Plan rev 2, AC1-1.

F-8 LOW cycle 1 pass 1 RESOLVED — L5 covers the absent form, and every absent form AC1-3 names is now measured. Plan rev 2, ledger L5 and AC1-3.

F-9 LOW cycle 1 pass 1 RESOLVED — the reason for not using `isValidUrl` and its consequence are stated. Plan rev 2, "L7's predicate" and RK-4.

F-10 LOW cycle 1 pass 1 RESOLVED — lint re-run at `0e3d903` and scoped out, with a bound on what the chain adds; `Status-Detail` agrees with D-12. Plan rev 2, § Validation, X-10 and AC1-11.

F-11 LOW cycle 1 pass 2 CLOSED AS STATED LIMIT — the definition of whitespace-empty and its plain-language gloss differ on one unmeasured class. Closed by the critic under the stop authority (second instance of F-8's shape); see Verdict, "Stated limit". The implementer bears it and follows the definition.

## Review-method lines with no finding (pass 2 delta)

- **New criteria carry their instruments.** AC1-9 names the differential and its two trees; AC1-10
  names its command and its red member; AC1-11 names its base count; AC1-6p's unfixed value is read
  against production before release.
- **L8's whitespace rule.** It now follows D-9's rule for labels, on QA's measurement, and the
  changelog row names the selection it rides. The plan says this is reported to the owner.
- **Release target.** Unchanged, and it matches the scoping block's end step.
- **Reading Order.** The plan is 439 lines; none is owed under 500.

## Questions

None for the owner.
