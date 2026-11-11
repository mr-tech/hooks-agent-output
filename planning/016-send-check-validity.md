---
ID: 016
Origin: 016
UUID: 54673438
Status: Active
Status-Detail: "Revision 1, ready for critique and the architect's conformance pass, then QA Phase 1. No OPEN QUESTION remains. The Exclusions register (X-1 the generic toast, X-2 File upload) goes to the owner through steering."
Revision: 1
Target Release: "website master → this chain's merge SHA (Vercel production on a push of master). The package carries no version artefact (package.json has no version field, CHANGELOG absent; read 2026-11-11T10:22Z)."
Epic-Alignment: "none registered. The workspace has no roadmap, by the owner's standing instruction (brief). Source of the effort: research/closed/components-v2-send-validity-2026-11-11.md and research/closed/components-v2-description-text-limit-2026-11-11.md; opened by selection 14 (rulings block 2026-11-11T09:09Z)."
Lane: "standard. The scoping determination sets a full chain (rulings block 2026-11-11T09:17Z). The blast radius is a shared predicate: validateMessage feeds the send page, the stored valid column and the public v1 API, so this is not a leaf."
Architectural-Surface: "none added. The plan stays inside the A-4 module and adds a validator beside the existing ones. Record lines touched: A-4 (its residue consequence is carried, § Stored rows and the public API); W-2 is applied to the description bound (D-10), which deviates from A-4's same-constant pattern; the architect decides whether A-4's line needs a note."
---

# Plan 016 — The send check refuses what Discord refuses (Components V2 validity, 1024 included)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-11T10:26 | 0 | planner-hooks-new | Created from the 09:17Z scoping determination and selection 14. Puts the value statement and OQ-1 to OQ-3 to the owner through steering-queue-hooks. Scope delta: none (first revision). Size against the original ask: one change to the send check, as selection 14 asked, plus the 1024 bound folded in by his choice. |
| 2026-11-11T10:32 | 1 | planner-hooks-new | Folds selections 17 to 20 (rulings block "2026-11-11T10:30Z — selections 17 to 20", record `64cf040`) as D-8 to D-11, and resolves OQ-0 to OQ-3. X-1 and X-2 now have a carrier, `handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md`, and X-9 and rider R1 are added. Scope delta: M2's AC2-3 is settled (the save schema is not edited); M1's L1, L9, AC1-1 and AC1-4 now carry his whitespace and File rulings, with no whitespace residue; rider R1 is added. Size against the original ask: unchanged, one send-check change plus the 1024 bound. |

## Value Statement and Business Objective

As a person building a Components V2 message on hooks.gg, I want the send page to refuse a message
Discord will refuse, and to tell me which part is wrong, so that I fix it in the editor instead of
pressing Send and getting a generic "Failed to send message" toast.

The owner's own statement of the defect (2026-08-26, verbatim from
`handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`):

> "checking which component v2 configurations are valid (namely, emptiness), for instance, a V2
> message with only an empty Text Display errors on send, and the UI doesn't catch this like empty
> content / embeds."

**Reframing, marked:** his sentence is about emptiness. This plan's class is wider: every V2 shape
the research measured Discord refusing, plus the 1024-character description bound. Selection 14
asked for this wider class ("making the send check refuse what Discord refuses, folding in the
1024-character description limit"). He approved this value statement as written (D-8).

## Decisions Register

| D | Decision | Date | His words, and the route they arrived by | Reopened by |
|---|---|---|---|---|
| D-1 | One send-check fix, covering the measured V2 refusals and the 1024 bound together, so the check changes once | 2026-11-11 | "Agent: scope one fix, 1024 included (Recommended)". Selection-prompt answer: ledger `steering/selection-ledger/2026-11-11.md`, block "2026-11-11T09:09Z — steering-queue-hooks". He was shown this option text: "I record one scoping decision for making the send check refuse what Discord refuses, folding in the 1024-character description limit you already chose, so the send check changes once. It is likely bigger than a small fixer chain (a plan, review, QA and your own check); the scoping says which, and whether the File component gap is in or out, and you can veto it from the record." | Owner withdrawal only. Consequence: selection 11's separate 1024 fixer is superseded (rulings block 09:09Z). |
| D-2 | Scope, pipeline, and the File component as in for refusal, out for capability | 2026-11-11 | **Agent-authored** by `steering-queue-hooks`, rulings block "2026-11-11T09:17Z — scoping determination". These are not his words. He may veto from the record, and he had not vetoed by 10:19Z (rulings block 10:19Z). | His veto. Also any measurement showing that a send from the website can carry an attachment (bears on the File limb). |
| D-3 | New feature work is planned only after the existing items are done | 2026-11-11 | His typed words, prompt 2 (rulings block "selections 1 to 4"; ledger block "2026-11-11T08:26Z — steering-queue-hooks"): "move this to the end of questions and after any other work in this project is completed. in other words, this new stuff is planned after the existing items are handled" | Owner withdrawal only. Consequence: a File upload path and removing File from the add menu are excluded (X-2). |
| D-4 | A message may be saved in a bad state; validity is recorded, not enforced, when a save is written | 2026-08-24 | `architecture/website.md` W-2, owner-authored: "A message is allowed to be saved in a bad state (e.g., missing content, over character limits, etc.) … the back-end reflects what the front-end allows." | Owner withdrawal only. Consequence: no server-side refusal of a save (X-3). Applied to the description bound by D-10. |
| D-5 | Mirror the sibling features | standing | The owner's standing rule, as the planner definition carries it: "Mirror the sibling features: reuse their shared patterns and write no new code where they already serve. A bug in a shared pattern is fixed once, in the shared code, so every feature gets the fix; until that can happen, the bug stays as it is everywhere. Never fix or work around it in one feature only." | Owner withdrawal only. |
| D-6 | Discord sends happen only in the agents' test server; no agent reads the production database | standing | Global `CLAUDE.md`, "Outbound messages": "The Discord test server (guild `1566742402180456559`) is the agents' own". The database prohibition is the brief's pointer to his standing rule (brief, "Standing rulings"). | Owner withdrawal only. |
| D-7 | On a local website build, message ids are moved above production's range before the first save | 2026-11-11 | "Agent: add the id-offset rule (Recommended)". Selection-prompt answer: ledger block "2026-11-11T10:10Z — steering-queue-hooks". The rule's text in `agent-output/CLAUDE.md` is agent-authored. | Owner withdrawal, or a separate Pusher app for local builds (his option 2 in that prompt). |
| D-8 | The plan's goal is the value statement as written: the 52 measured refusals plus the 1024 bound | 2026-11-11 | "Agent: plan this goal (Recommended)". Selection-prompt answer (selection 17): ledger block "2026-11-11T10:30Z — steering-queue-hooks"; rulings block "2026-11-11T10:30Z — selections 17 to 20". The value statement was quoted to him whole in the question. | Owner withdrawal only. Consequence: the ledger's L1–L10 are all in scope. |
| D-9 | The new Text Display check uses `trim()` plus two exceptions: U+0085 alone is empty, U+FEFF alone is content; the classic check is not changed | 2026-11-11 | "Agent: trim() plus 2 exceptions (Recommended)". Selection 18, same ledger and rulings blocks. The option text he saw (steering's): "the new check uses trim() and treats those two characters as Discord does, so it agrees with Discord on all 11 measured. This departs from the classic check in this one feature, against your mirror-the-siblings rule, which is why it is asked; the classic check is not changed". | A measurement showing Discord's verdict on either character differs from research F-2. Consequence: L1, AC1-1, AC1-4 have no whitespace residue among the 11; a deviation from D-5, by his ruling. |
| D-10 | Both description inputs cap at 1024 and Send refuses over 1024; Save does not refuse, so the save schema is not edited | 2026-11-11 | "Agent: cap input, allow save (Recommended)". Selection 19, same blocks. The option text he saw: "both description boxes stop typing and pasting at 1024, and Send refuses over 1024. Save does not refuse: a longer description arriving by pasted JSON saves, is recorded as not valid, and is refused at Send with the reason". | Owner withdrawal only. Consequence: AC2-3; a deviation from A-4's same-constant pattern, by his ruling. |
| D-11 | The check refuses any message holding a File component, on a new send and on an edit | 2026-11-11 | "Agent: refuse File everywhere (Recommended)". Selection 20, same blocks. The option text he saw named the risk: "if Discord does accept a File naming an existing attachment on an edit, the site blocks an edit that would work; that is unmeasured". | A measurement of research N-5 showing Discord accepts such an edit, or a user report of a blocked edit holding a File (RK-1). |

## Objective

Make `validateMessage` (`website@0e3d903 src/utils/limits.tsx:validateMessage`) refuse every
Components V2 shape in the requirement ledger below, with a reason that names the failing part.
Show that reason in the editor and in the send page's preview, the same way the 4000-character and
40-component reasons are shown today. Bound the two description fields at 1024 characters.

Three things move with the predicate, because it has three production callers (`git grep -n
"validateMessage\b" -- src ':!**/__tests__/**'`, at `0e3d903`, read 10:21Z):

1. What the send page refuses: `src/app/message/m/[id]/send/page.tsx`, `isMessageValid` gates `allowSave`.
2. What `valid` a save records: `src/server/api/utils/messageValidity.ts:isMessageValid`, written by
   `src/server/api/utils/shared.ts` on upsert.
3. What the public v1 API serves: `src/pages/api/v1/guilds/[guildId]/messages.ts` and `…/messages/[id].ts` serve the stored `valid`.
   The backfill (`src/scripts/backfillValid.ts`) also calls the predicate, but only over rows whose `valid` is NULL.

## Assumptions and open questions

**OPEN QUESTION [RESOLVED] OQ-0 — the value statement:** approved as written (D-8).

**OPEN QUESTION [RESOLVED] OQ-1 — whitespace in a Text Display:** `trim()` plus the two measured
exceptions (D-9). The check agrees with Discord on all 11 measured characters: U+0085 alone counts
as empty, U+FEFF alone counts as content (research F-2). This departs from the classic check in this
one feature, by his selection. `validateContentRequirements` is not changed.

**OPEN QUESTION [RESOLVED] OQ-2 — whether a description over 1024 refuses a save:** it does not
(D-10). Both inputs cap at 1024, Send refuses over 1024, and the save schema
(`src/server/api/utils/shapes.ts`) is not edited. This is a deviation from A-4's pattern ("the
editor and the save schema read the same constant for the same bound"); the reason is his selection
and W-2. It also settles the contradiction between two clauses of the 09:17Z determination
(rulings block 10:30Z, selection 19, "This thread's error, kept").

**OPEN QUESTION [RESOLVED] OQ-3 — a File component on an edit:** refused on a new send and on an
edit (D-11). Research N-5 stays residue (RK-1).

**Scope assumptions a predating design makes (revision 0 lists them, step 2):**
- *Unit*: the check runs on the whole message and returns one reason, the first failing one. This is
  the sibling's form (`validateMessage` returns one string). Listing every failure is not in scope.
- *Reach*: V2 messages only, meaning structural V2 or the V2 flag (the `hasV2` of
  `validateContentRequirements`). Empty Action Rows in classic messages are not measured and are
  excluded (X-6).
- *Layer*: the front end and the shared predicate. No server-side refusal (D-4).
- *Length unit*: UTF-16 code units (`.length`), as `sumDisplayableText` counts. Discord's count for
  non-ASCII text is unmeasured (description research N-1). That is residue.

**Assumptions held without a question** (agent-authored design choices inside the agreed scope,
recorded per the standing default in `references/escalation.md`):
- The new refusals live in a new validator in `src/utils/limits.tsx`, called from
  `validateMessage` after `validateComponentCount`. `validateContentRequirements` is not changed.
  Its other callers (`NewMessageModal.tsx`, `JsonModalBody.tsx`, `DiscordMessageEditor/index.tsx`)
  therefore keep their behaviour, and the open handoff
  `newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` is not touched. Sibling:
  `website@0e3d903 src/utils/limits.tsx:validateDisplayableTextCount` and `:validateComponentCount`,
  added by plan 007 (`46cb70d`) in this same shape.
- The reason is shown as one error line in `DiscordMessageEditor/index.tsx`, beside `v2TextError`
  and `componentCountError` (sibling, same file). That line renders in edit mode and in preview, so
  it reaches the send page through `MessagePreview` (`src/components/MessagePreview.tsx` renders
  `DiscordMessageEditor`; read 10:23Z). As a consequence (research F-12), a freshly added component
  other than a Separator shows the line until it is filled in. The sibling `noContentError` does the
  same for a fresh empty message.

## Requirement ledger — the refusal class

The class is "every V2 shape the research measured Discord refusing". Case ids point into the
Evidence table of `research/closed/components-v2-send-validity-2026-11-11.md` (`c9f8e3a`). Where
the ledger says "anywhere in the tree", it means top level, inside a Container, inside a Section,
and inside a Section inside a Container: the research measured each of these placements (B7 to B12,
X2, X3, X7).

| L | Limb (the check refuses when …) | Measured refused | Measured accepted, must pass | Carried by |
|---|---|---|---|---|
| L1 | a Text Display's `content` is absent, or empty after whitespace removal (`trim()`, with U+0085 counted as whitespace and U+FEFF counted as content: D-9), anywhere in the tree | B1–B4, B6–B12, W1–W4, W6, W7, X7 | B5, W5, W8 | M1 |
| L2 | a Section's `components` is empty or absent, or its `accessory` is absent | C2, C4 | C1, C5 | M1 |
| L3 | a Media Gallery's `items` is empty or absent, anywhere in the tree | D2, D6, X3 | D1, N7 | M1 |
| L4 | a Container's `components` is empty or absent | G2, G3 | G1, X4 | M1 |
| L5 | an Action Row's `components` is empty, anywhere in the tree | H2, X2 | H1, H7 | M1 |
| L6 | a required URL is empty or absent: Thumbnail `media.url`, gallery item `media.url`, link button `url` | C3, C6, D3, H3 | — | M1 |
| L7 | a required URL does not parse as an absolute URL (the save schema's predicate: sibling `shapes.ts:linkButtonShape.url`, `z.string().trim().url()`), or a link button's scheme is not http, https or discord | I1, I2, I3, X5 | X6 (an ftp Thumbnail URL is accepted, so L7's scheme limb is link buttons only) | M1 |
| L8 | a link button has no emoji and its `label` is absent, empty, or empty after `trim()` | C7–C9, H4–H6 | X1 | M1 |
| L9 | a File component is present, on a new send and on an edit (D-11) | E1, E2, E3 | — | M1 |
| L10 | a Thumbnail or gallery item `description` is the empty string, or longer than 1024 | C10, D4; 1025 chars (description research F-6, requests 25–36) | C11, D5 (one space); 1024 chars | M1 (check), M2 (inputs, constant; the save schema is not edited, D-10) |
| L11 | already refused today, and must stay refused: no components; content beside V2; over 40 components | A3, A5, N2, N4, N6, N9 | A1, A2, A4, F1, F2, N1, N3, N5, N8 | unchanged; M1 must not regress them |

The "must pass" cells together hold the research's 24 accepted shapes, and the "measured refused"
cells hold its 52 refused shapes. This pass tallied the case ids by hand against the Evidence table
at `c9f8e3a`, and the totals match the research's Answer (76 = 52 + 24). QA re-derives the tally
by script at Phase 1.

**Residue, bounded:** characters outside the 11 measured whitespace characters (N-3); URL forms
other than empty, `abc` and `ftp://` (for example a `discord://` link, or an https URL with no dot,
which the sibling `isValidUrl` refuses and which was not sent); over-cap values (N-8: label 80,
Section 3, Action Row 5, gallery 10), which the editor and the schema already cap; non-ASCII length
(description N-1); edit-path shapes beyond the research's 10 (N-6).

## Plan

### M1 — The send check refuses the ledger's class and says which

**What changes (product behaviour):** a draft in any L1–L10 refused shape is refused at the send
page (Send disabled), shows one reason line in the editor and the send-page preview, and is stored
with `valid: false` at its next save. Nothing else changes in what is sent, saved or refused.

Acceptance criteria (properties):
- **AC1-1 (agreement with Discord over the measured class).** For each of the research's 76 shapes,
  `validateMessage({ username: 'Probe', ...body })` is non-empty exactly when Discord refused the
  shape. The expected verdict is Discord's measured one, never a value the website computes
  (expectations independence). No member may differ: under D-9 the whitespace members W5 and W6
  follow Discord too. The corpus enumerator is a fixture QA builds at Phase 1
  from the research's Appendix builders and Evidence-table descriptions. The research's own probe
  files were deleted at its run end (its "Process facts"), so the bodies are a reconstruction. **The
  reconstruction is confirmed against Discord before anything relies on it:** QA re-sends the
  reconstructed bodies in the agents' test server (D-6) and records each status beside the
  research's, under `verification/016/corpus/`. A member whose re-sent status differs from the
  research's is resolved before the criterion is decided.
- **AC1-2 (placement).** L1, L3 and L5 refuse in every placement the ledger names. L2 and L4 refuse
  at top level and, for L2, inside a Container. Enumerated from the component types' nesting in the
  save schema (`shapes.ts`: Container children, Section children and accessory).
- **AC1-3 (absent equals empty).** For each field L1–L6 name, the key-absent form is refused the same
  way as the empty form. This holds whether or not the absent form can be reached, since the save
  schema rejects B6, C4, D6 and G3 (research F-13) and reachability is unestablished.
- **AC1-4 (no false refusal over the measured accepted set).** Every one of the 24 accepted shapes
  passes, U+FEFF alone (W5) included (D-9).
- **AC1-5 (says which).** Each limb L1–L10 returns a reason distinct from every other limb's and from
  the existing reasons. The reason names the component type and the fault, e.g. "A Text Display is
  empty.". The reason text is agent-authored copy; the owner may edit it at UAT (P-1's principle).
- **AC1-6 (human-observable).** On a local build of the chain tip (D-7's id offset applied before the
  first save), a message with a freshly added Text Display shows the reason line in the editor and on
  the send page, and Send is disabled. Filling the Text Display removes the line and enables Send,
  and a send to the agents' test-server webhook returns success. Walked by UAT. The same walk records
  N-2: whether one typed space in a Text Display reaches the message data as a space. Capture path:
  `verification/016/uat/`.
- **AC1-7 (stored `valid`).** `isMessageValid` returns `false` for every L1–L10 refused shape and
  `true` for every accepted shape (AC1-1's corpus), because it calls the same predicate.
- **AC1-8 (the content-requirement check keeps its behaviour).** `validateContentRequirements`
  returns the same result as at `0e3d903` for every input in its existing test classes. Its three
  other callers therefore keep their behaviour; the design choice that keeps it so is under
  Assumptions, and the open handoff it protects is in Entry work. The instrument is behavioural,
  over those classes. A diff of the function's text is not the instrument.

Declined work has a fate: a refused send is not lost. The draft stays in the editor, the reason line
names the part to fix, and the send runs when the user fixes it and presses Send. Most exposed: users
who add a component and press Send at once (F-12). Followed by AC1-6.

Rollback: `git revert <M1 commit>` on the chain branch (implementer, before release). After release,
the revert on `master` is devops's act and the push is the owner's answer. Vercel's promotion of the
previous deployment is his quick rollback (as recorded for the last chain,
`handoff/save-gate-embeds-owner-checks-on-hooks-gg-2026-11-11.md`). Rows saved while M1 was live keep
`valid: false` after a rollback until they are saved again (§ Stored rows).

### M2 — The 1024 description bound in the constant and both inputs (Save does not refuse)

**Re-derivation (M1 ships product behaviour; M2 is downstream):** M1 already refuses an over-1024
description at Send. M2 adds what M1 does not: the user cannot type past 1024 in either description
input, and the bound lives in one constant, so the editor and the check read the same number (A-4).
That premise still holds against M1's behaviour.

- **AC2-1.** One constant for the 1024 bound sits in `src/constants/messageLimits.ts` (sibling:
  `MAX_EMBED_FIELD_VALUE_LENGTH`, same file). M1's L10 check and both inputs read it.
- **AC2-2.** The Thumbnail and gallery-item description inputs (`ThumbnailEditor.tsx`,
  `MediaGalleryEditor.tsx`) cap typed and pasted input at that constant, mirroring
  `LinkButtonEditor.tsx`'s `maxLength={MAX_BUTTON_LABEL_LENGTH}`.
- **AC2-3 (Save does not refuse, D-10).** `src/server/api/utils/shapes.ts` is not edited: both
  description fields stay `z.string().optional()`. A message whose description is longer than 1024,
  arriving by pasted JSON or a stored row, saves and loads as at `0e3d903`, is recorded
  `valid: false` at that save, and is refused at Send with L10's reason. The instrument is
  behavioural: the save schema admits a 1025-character description at the chain tip. This
  deviates from A-4's same-constant pattern, by his ruling (D-10).

Rollback: `git revert`, as M1.

### M3 — Release (devops)

A push of website `master` to the chain's merge SHA. Devops asks the owner for the push. No version
artefact. Housekeeping lands before QA Phase 3 in one commit, if there is any.
Serving refs read at planning (website, `git ls-remote origin`, 10:21Z): `master` `0e3d903` serves
production through Vercel (devops's earlier records, not re-read). Other heads (`backup`,
`external-message-api`, `redesign`, `regex-refactor`) serve nothing known. `.github/workflows` is
absent. `release-move.js /usr/local/bin/hooks/website master 0e3d903… --dry-run`, 10:21Z: exit 0,
"ff-from-remote ok; sibling serving refs (none) on one line ok", "workflows none". No branch is
shared with another chain.
At release: the handoff `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` closes
`Addressed` (its own words: "this handoff stays open until that fix is released").

## Stored rows and the public API (A-4's consequence)

A change to `validateMessage`'s refusal set changes stored `valid` only for rows saved afterwards
(A-4). After release:
- A row already stored in an L1–L10 shape keeps `valid: true` until its next save, and the public
  v1 API keeps serving `true` for it.
- The backfill re-derives only rows whose `valid` is NULL. After chain 012 every row is non-null
  (backfill handoff, Item 3), so it re-derives nothing.
- No agent counts or repairs such rows (D-6, X-4). How many exist is unknown (research N-1).

## Testing Strategy

The standard is the workspace's Test Conventions (`agent-output/CLAUDE.md`, "Test Conventions
(`website`)"): vitest, tests beside the module under `__tests__/`, the process exit code beside the
counters, `pnpm run typecheck` for both programs. Expected test types: pure-logic tests of the
predicate over AC1-1's corpus and AC1-2's placements, and a DOM test of the editor's reason line
(AC1-5). Before adding a test, extend the existing ones on this surface:
`src/utils/__tests__/limits.send-gate-partition.test.ts`, `limits.component-count.test.ts` and
`messageValidity.predicate.test.ts`. The last of these is a member of
`handoff/website-tests-not-beside-their-module-2026-11-08.md`, and editing it fires that handoff's
trigger (see Entry work).

**Rider R1 — move `messageValidity.predicate` beside its module, if the chain edits it.** If an
M1 test edit touches `src/utils/__tests__/messageValidity.predicate.test.ts`, the same commit
moves the file to `src/server/api/utils/__tests__/` (its module is
`src/server/api/utils/messageValidity.ts`), with no change to any assertion beyond M1's own. Its
criterion: the per-file case count and pass set are identical before the move and after it, at both
trees (Test Conventions, the rename row's evidence). One code-review line and the shared QA pass.
QA sequencing: QA Phase 1 runs before implementation. The stage set requires it (D-2), and
AC1-1's corpus re-send is a Phase 1 act.
At release, the handoff records the move in a dated row and stays Open for the other five files.
**Riders yield:** if critique or review raises anything against R1, it drops. **Drop disposition,
priced in advance:** the file is left unedited, AC1-7 is covered by the limits tests that call
`isMessageValid`, and the handoff stays as it is. That costs nothing beyond a slightly wider limits
test.

The browser walk is AC1-6, at UAT. Cases, fixtures and coverage are QA's.

## Validation

- Base tree `0e3d903`, 10:24Z: `npx vitest run --reporter=json`, exit 0; 1145 of 1145 cases passed,
  118 file entries in `testResults`. `pnpm run typecheck`, exit 0. Nothing is red before the chain
  opens.
- Lint: 34 findings were already present at `6d78b19` (rulings block 08:46Z, item 3). Not re-run here.

## Risks

- **RK-1 — false refusal.** The check refuses a message Discord would send. Members: the File edit case
  D-11 accepted (research N-5). The File editor's url box is free text with the placeholder
  `attachment://filename.png` (`FileEditor.tsx`, read by steering, rulings block 10:30Z), so a user
  editing a message that has attachments can type an existing attachment's name, and the check
  refuses that edit. Also members: unmeasured URL forms, if a limb is written wider than the ledger.
  Falsifiers: AC1-4 over the accepted set; for the File member, a user report of a blocked edit
  holding a File. A report is recorded against D-11's reopening class, and its carrier after
  closure is `handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md` (Item 2).
- **RK-2 — reconstruction drift.** A reconstructed corpus body differs from what the research sent,
  so AC1-1 passes against the wrong shapes. Falsifier: AC1-1's re-send.
- **RK-3 — stored `valid` stays stale** for rows saved before release (§ Stored rows). A stated
  limit, not a gate.

## Exclusions

| X | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | The generic failure toast in `sendWebhook` (research F-14) | Determination 09:17Z, out-clause. Shown to the owner with this register. | `handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md`, Item 1 |
| X-2 | A File upload path; removing File from the add menu | New product work (D-3; D-2) | Same handoff, Item 2 |
| X-9 | Relocating the other five files of `handoff/website-tests-not-beside-their-module-2026-11-08.md` | Not on this chain's surface; only `messageValidity.predicate` is (rider R1) | That handoff, which stays Open |
| X-3 | Any server-side refusal of a save | W-2 (D-4) | Stated limit |
| X-4 | Counting or repairing stored rows | D-6. Research Recommendation 2 is out (determination). | Stated limit (§ Stored rows) |
| X-5 | The add menu's default factories | Determination out-clause | Stated limit (AC1-6 records what the user sees) |
| X-6 | Classic messages; the save gate | Determination out-clause; chain `fix-website-save-gate-embeds` | Stated limit |
| X-7 | Unmeasured refusals (N-3, N-8) | Determination: measured cases only | Ledger residue |
| X-8 | `project-utils`, `preview-image-generator` | Determination. No copy of the check in `project-utils` (`git grep -l`, exit 1, steering's read). `preview-image-generator` was not read: a repository-wide grep there was refused by the secret-file gate. | Stated limit |

## Entry work (2026-11-11)

- **website**: `core.hooksPath` unset. `.git/hooks` holds only samples. No build output is tracked
  (`git ls-files` for `.next|dist|build|out`: 0). `.claude/` holds only `scheduled_tasks.lock`. The
  only Stop hook is the global `tmux-attention.sh`, which notifies and does not guard. `.github/`
  holds an untracked `prompts/` directory and no workflows. Committing milestones meet no hook.
  Chain branch: not yet created. Steering checks it out at chain start.
- **agent-output**: `core.hooksPath` unset, no active hooks, no Stop guard. Plan commits use
  `git commit --only`.
- **Open handoffs** whose `Review-Trigger` fires for this chain (whole frontmatter value read, 10:21Z):
  - `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`: **in scope**; closes at M3.
  - `newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`: its trigger does not fire.
    `validateContentRequirements` is not changed (Assumptions). Untouched.
  - `backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md`: does not fire, because
    `backfillValid.ts` is not modified. Its Item 3 bounds § Stored rows.
  - `website-tests-not-beside-their-module-2026-11-08.md`: fires if `messageValidity.predicate` is
    edited. **In scope for that one file, as rider R1** (Testing Strategy). The other five are X-9.
  - `architecture-record-reconciliation-owed-2026-11-10.md`: fires at the architect's conformance
    pass of this plan. It is the architect's to discharge there.
  - `bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md`, `upload-message-dialog-closes-on-first-portal-load-2026-11-08.md`:
    fire on "the next website effort is scoped". Neither names the send check or a surface this plan
    edits (grep for `limits|validateMessage|send page|description`, no hit). Read and not in scope.
    Each stays Open.
  - `qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md`: fires "when QA next runs".
    It is QA's at Phase 1.
- **Closed plans on this surface:** 007 (`46cb70d`, the precedent M1 follows: a validator in
  `limits.tsx` plus an editor error line), 012 (the `valid` column; D14's live-send prohibition is
  superseded by D-6 for the test server), 013 and 015 (the save path; untouched).
- One launch directory: `/usr/local/bin/hooks/website`. The record is reached by absolute path.

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| — | — | none registered |
