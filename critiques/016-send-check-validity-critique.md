---
ID: 016
Origin: 016
UUID: 54673438
Status: Open
Status-Detail: "Cycle 1 pass 1 on plan revision 1: REQUEST REVISION. Five MEDIUM findings open (F-1 to F-5) and five LOW (F-6 to F-10). F-6 fires rider R1's own yield clause. Waits on the planner's next revision."
Artifact-Revision: 1 — read whole at record 3b4205d (revision 1 at 4c9bcf2 plus registration R-1)
Reviewed-At: "3b4205d — repos=agent-output; website code read at 0e3d903 (master, clean tree)"
Verdict: REQUEST REVISION
---

# Critique — Plan 016, the send check refuses what Discord refuses

**Artifact**: `planning/016-send-check-validity.md`, revision 1 (`4c9bcf2`), with registration R-1
(`3b4205d`). **Analysis**: none commissioned. The plan rests on two research documents,
`research/closed/components-v2-send-validity-2026-11-11.md` and
`research/closed/components-v2-description-text-limit-2026-11-11.md`, both read whole.
**Date**: 2026-11-11.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-11T10:45 | steering-queue-hooks (brief `steering/queue-hooks-briefs/critic-016-brief.md`) | cycle 1 pass 1: plan revision 1, whole-document read | First pass of the cycle, so the whole plan was read (351 lines; no Reading Order is owed under 500). Artifact changes: none before this pass. New findings: F-1 to F-5 MEDIUM, F-6 to F-10 LOW, all OPEN. Findings addressed: none. Verdict REQUEST REVISION. Pricing: sized to the ask. |

## Verdict

**REQUEST REVISION — cycle 1, pass 1.**

Pricing: sized to the ask. Selection 14 asked for one send-check change with the 1024 bound folded
in. The plan is that change (M1), the bound's constant and two inputs (M2), a release (M3) and one
rider (R1). No finding below asks for more scope. Each asks the plan to state something it now
leaves open.

Next: the planner revises against F-1 to F-10. The hard stop and the stop authority did not fire.
Nothing routes to the owner from this pass.

## Value Statement Assessment

The user story is present, in story form, and its outcome can be checked: the send page refuses the
message and names the part, instead of the generic toast. M1 delivers it directly; nothing is
deferred to a later phase. The owner's own statement of the defect is quoted beside a marked
reframing, and he approved the wider statement (D-8).

Master Product Objective: the workspace has no roadmap, so there is no objective document to read.
The plan's header says so. The architecture record states the product as a Discord message builder
that sends through webhooks; a send check that agrees with Discord serves that.

## Assumption Not Checked

This pass assumes the research's 76 request bodies can be rebuilt from its Appendix builders and
Evidence descriptions closely enough to reproduce each status, and does not test it. If that is
false, a re-sent status under `verification/016/corpus/` differs from the research's. QA Phase 1
owns closing it (AC1-1's re-send; the plan's RK-2).

Premises run in this pass:

- **The ledger's tally.** The plan says its cells hold 52 refused and 24 accepted case ids. A hand
  count of the ledger's cells gives 52 and 24 with no id twice. The Evidence table, counted by
  `grep -c` over its Discord column, gives 52 refused rows and 24 accepted rows.
- **The research tree against the plan's tree.** The research executed at website `6d78b19`; the
  plan reads `0e3d903`. `git diff --numstat 6d78b19 0e3d903` over `shapes.ts`, `limits.tsx`,
  `isValidUrl.tsx`, `src/app/preview/page.tsx` and `DiscordMessageEditor/index.tsx` prints nothing.
- **Registration R-1.** `git diff --numstat 4c9bcf2 3b4205d` on the plan: 3 lines added, 0 removed
  (two register rows and one changelog row). It changed no criterion.

## Reachability, checked in the code at `0e3d903`

- **Send and edit share one gate.** `src/app/message/m/[id]/send/page.tsx`: `isMessageValid` is
  `!validateMessage(message.data)`, `allowSave` requires it, and the button is
  `isDisabled={!allowSave}`. An edit is the same `sendMessage` call with `oldMessage` set. D-11's
  "on a new send and on an edit" holds at the gate.
- **The reason line reaches the send page.** `MessagePreview.tsx` renders `DiscordMessageEditor`,
  and the sibling lines (`noContentError`, `v2TextError`, `componentCountError` in
  `DiscordMessageEditor/index.tsx`) render with no edit-mode condition.
- **The same line reaches a surface the plan does not name.** See F-1.

## Findings

### Medium

**F-1 MEDIUM cycle 1 pass 1 — OPEN. The reason line also renders on the `/preview` route, which the plan does not name.**
- **Location**: plan § Objective ("Three things move with the predicate") and § Assumptions (the
  reason line "renders in edit mode and in preview, so it reaches the send page"); Exclusion X-8.
  Code: `src/app/preview/page.tsx`, `src/components/DiscordMessageEditor/index.tsx`.
- **Description**: `src/app/preview/page.tsx` renders the same `DiscordMessageEditor` tree with no
  `editableState`. The sibling error lines the plan places its new line beside are not conditioned
  on edit mode, so a line placed there renders on `/preview` too. The architecture record
  (`system-architecture.md` D-003) says the preview-image service screenshots that route. The plan
  lists three things that move and excludes `preview-image-generator` unread (X-8).
- **Impact**: one more user-visible surface, and it feeds generated images. The three sibling lines
  fire only on rare states (no content, over 4000 characters, over 40 components). The new line
  fires for 6 of the 7 component types as they come from the add menu (research F-12). Not checked
  by this pass: when an image is generated for a draft, so how often an image would carry the line.
- **Recommendation**: name the surface in the plan and state the consequence, as the plan already
  does for the send page. The siblings' behaviour there is the precedent to cite or depart from.
  State which stage observes it, or record it as a stated limit.

**F-2 MEDIUM cycle 1 pass 1 — OPEN. The 1024 boundary has no M1 criterion.**
- **Location**: plan AC1-1, AC1-4, AC1-7; ledger row L10.
- **Description**: AC1-1, AC1-4 and AC1-7 quantify over "the research's 76 shapes". The 1024 and
  1025 cases are not among the 76. They are the other research document's requests 25 to 36: four
  measured members (Thumbnail and gallery item, each at 1024 accepted and 1025 refused). L10 names
  them as "must pass" and "refused", but no criterion carries them, and AC1-1's corpus and re-send
  do not include them. AC2-3 covers 1025 being refused; nothing requires 1024 to pass.
- **Impact**: half of the plan's title has no property. An off-by-one at the bound passes every
  stated criterion, and M2 lets a user type exactly 1024 characters.
- **Recommendation**: state the class AC1-1, AC1-4 and AC1-7 cover so that it includes L10's four
  measured members, and say whether the re-send covers them.

**F-3 MEDIUM cycle 1 pass 1 — OPEN. Placement is enumerated for L1 to L5 only.**
- **Location**: plan AC1-2; ledger rows L6 to L10; Exclusion X-7.
- **Description**: AC1-2 states placements for L1 to L5 and says they are enumerated from the save
  schema's nesting. L6 (required URLs), L7 (URL form), L8 (link button label), L9 (File) and L10
  (description) have no placement statement. `shapes.ts:containerChildShape` admits a Section, a
  Media Gallery, a File and an Action Row inside a Container, and `ContainerEditor.tsx` offers all
  of them, File included. The research measured these five limbs at top level only. X-7 excludes
  unmeasured refusals; AC1-2 already extends L2 into a Container, which was not measured either.
  The text supports both readings.
- **Impact**: a Section added inside a Container has an empty Thumbnail URL by default. Under one
  reading the check refuses it; under the other it passes and fails at Discord with the generic
  toast, which is the defect this plan fixes. The implementer and QA cannot tell which is required.
- **Recommendation**: give L6 to L10 the same placement enumeration L1 to L5 have, from the same
  schema nesting, and mark which placements are measured and which are extended from the schema.

**F-4 MEDIUM cycle 1 pass 1 — OPEN. The "V2 messages only" reach has no criterion.**
- **Location**: plan § Assumptions, "Reach"; M1 ("Nothing else changes in what is sent, saved or
  refused"); Exclusion X-6.
- **Description**: the reach limit is an assumption and an exclusion, and no acceptance criterion
  is derived from it. Classic messages carry Action Rows with link buttons
  (`DiscordMessageEditor/index.tsx` shows type-1 components in classic mode), so the fields L5 to
  L8 judge exist in classic messages. "Nothing else changes" is a negative with no instrument
  named: AC1-8 covers `validateContentRequirements` only, and the 76 shapes all carry the V2 flag.
- **Impact**: a validator applied to every Action Row would refuse classic messages the check
  passes today, and would record `valid: false` for them at their next save, which the public v1
  API then serves. Nothing in the plan would catch it.
- **Recommendation**: state the reach as a property with its input class (classic messages whose
  Action Rows are in an L5 to L8 shape keep today's result), and name what would catch a violation.

**F-5 MEDIUM cycle 1 pass 1 — OPEN. No post-deploy observation is named.**
- **Location**: plan AC1-6; planner definition, "Post-deploy observable".
- **Description**: the plan fixes a defect the owner reported (his 2026-08-26 sentence). AC1-6 is
  walked on a local build before release. No criterion names an observation in production that
  tells fixed from unfixed after the deploy.
- **Impact**: QA has no post-deploy row to register, and the August handoff closes at M3 on the
  push alone.
- **Recommendation**: name one post-deploy observation and who observes it. Where the owner is the
  observer, his attestation is the evidence and no capture path is owed.

### Low

**F-6 LOW cycle 1 pass 1 — OPEN. Rider R1's criterion cannot hold when the move and M1's edits share a commit; by the plan's own clause R1 drops.**
- **Location**: plan § Testing Strategy, "Rider R1"; D-13.
- **Description**: R1 requires the move in the same commit as M1's edit of the file, and its
  criterion is that the file's case count and pass set are identical before and after. The Testing
  Strategy directs M1 to extend that file. A commit that adds cases changes the count, so the
  criterion fails by construction or cannot be read off the commit.
- **Impact**: the rider's one criterion line does not measure the move.
- **Recommendation**: none on the rider's design. The plan says "if critique or review raises
  anything against R1, it drops", and D-13 names a critique objection as its reopening class. The
  planner applies the drop disposition already priced in the plan.

**F-7 LOW cycle 1 pass 1 — OPEN. AC1-1 does not say who resolves a re-send that differs.**
- **Location**: plan AC1-1 ("is resolved before the criterion is decided"); RK-2.
- **Description**: a differing status has two causes: the rebuilt body is wrong, or Discord's
  answer changed. The first is a fixture correction. The second changes the ledger, which is a
  planning revision and may reach D-8. The plan names neither the decider nor the oracle.
- **Recommendation**: state which side is the expected verdict in each case and which stage decides.

**F-8 LOW cycle 1 pass 1 — OPEN. L5's limb text and AC1-3 disagree, and AC1-3 reaches past the measured set without saying so.**
- **Location**: ledger row L5 ("`components` is empty"); AC1-3 ("each field L1–L6 name").
- **Description**: L5 refuses an empty Action Row; AC1-3 also requires the key-absent form refused
  for L5. Three key-absent forms AC1-3 covers were not sent (Section `components`, Action Row
  `components`, the URL keys: research Answer table, "not sent"). The four measured ones are B6,
  C4, D6 and G3.
- **Recommendation**: make L5 and AC1-3 say the same thing, and mark the three unmeasured forms as
  extended from the schema.

**F-9 LOW cycle 1 pass 1 — OPEN. L7 departs from the in-module URL sibling without the reason.**
- **Location**: ledger row L7; `src/utils/isValidUrl.tsx`; `LinkButtonEditor.tsx` (`urlInvalid`).
- **Description**: L7 cites the save schema's `z.string().trim().url()`. The module the validator
  lives in already imports `isValidUrl`, and the link button editor marks a URL invalid with it.
  The reason for not using it is real and unstated: its pattern admits only `http` and `https`, so
  it would refuse X6, an `ftp://` Thumbnail URL Discord accepts. The consequence is also unstated:
  the editor can mark a link button URL invalid that the send check passes.
- **Recommendation**: add the deviation reason and the consequence beside L7's sibling citation.

**F-10 LOW cycle 1 pass 1 — OPEN. Two lines are stale or undisposed.**
- **Location**: plan § Validation (lint); frontmatter `Status-Detail`.
- **Description**: the lint line reports 34 findings from an earlier read and was not re-run. A
  line red before the chain opens is scoped, made an Exclusions row, or dropped in revision 1.
  `Status-Detail` still says X-1 and X-2 go to the owner; D-12 settled X-1 and X-2 was not asked
  again.
- **Recommendation**: disposition the lint line, and bring `Status-Detail` into line with D-12.

## Review-method lines with no finding

- **Rollback and release runners.** Each step names its runner: the implementer reverts on the
  chain branch, devops reverts on `master`, the owner answers the push and can promote the previous
  Vercel deployment.
- **Release target.** The header's target, a push of website `master`, matches the scoping block's
  end step.
- **Open questions.** OQ-0 to OQ-3 are all marked `[RESOLVED]`. No milestone is `PREMISE-STALE`.
- **Rider R1 as priced scope.** It carries a criterion line, the yield clause and a priced drop
  disposition; it cannot block its host. F-6 is its line item.
- **Steering's registration.** D-12, D-13 and changelog row R-1 are a registration inside that
  thread's grant.
- **Stale `valid` for stored rows.** The plan states the residue (§ Stored rows, RK-3). The send
  page recomputes validity from the message, so the residue does not reach M1's gate.

## Questions

None for the owner from this pass.
