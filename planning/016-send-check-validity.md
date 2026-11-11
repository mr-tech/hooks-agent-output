---
ID: 016
Origin: 016
UUID: 54673438
Status: Active
Status-Detail: "Revision 3, ready for the critic, the architect and QA Phase 1 to read again. It adds M1b (the preview route shows no error chrome, by the owner's selection 23, D-14) and folds QAF-9 (the whitespace-empty predicate). Revision 2's approvals do not carry to it. No OPEN QUESTION remains."
Revision: 3
Target Release: "website master → this chain's merge SHA (Vercel production on a push of master). The package carries no version artefact (package.json has no version field, CHANGELOG absent; read 2026-11-11T10:22Z)."
Epic-Alignment: "none registered. The workspace has no roadmap, by the owner's standing instruction (brief). Source of the effort: research/closed/components-v2-send-validity-2026-11-11.md and research/closed/components-v2-description-text-limit-2026-11-11.md; opened by selection 14 (rulings block 2026-11-11T09:09Z)."
Lane: "standard. The scoping determination sets a full chain (rulings block 2026-11-11T09:17Z). The blast radius is a shared predicate: validateMessage feeds the send page, the stored valid column and the public v1 API, so this is not a leaf."
Architectural-Surface: "none added. The plan stays inside the A-4 module and adds a validator beside the existing ones. Record lines touched: A-4 (its residue consequence is carried, § Stored rows and the public API); W-2 is applied to the description bound (D-10), which deviates from A-4's same-constant pattern. The architect corrected A-4's line at the conformance pass, and the D-10 clause lands at reconciliation after implementation (architect AF-4); the plan does not change for it. M1b closes the system-architecture.md Problem Area 'Validation errors render into generated preview images' (raised to Medium at 11:09Z, 016 AF-11). The deployment record routes its closure to the architect."
---

# Plan 016 — The send check refuses what Discord refuses (Components V2 validity, 1024 included)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-11T10:26 | 0 | planner-hooks-new | Created from the 09:17Z scoping determination and selection 14. Puts the value statement and OQ-1 to OQ-3 to the owner through steering-queue-hooks. Scope delta: none (first revision). Size against the original ask: one change to the send check, as selection 14 asked, plus the 1024 bound folded in by his choice. |
| 2026-11-11T10:32 | 1 | planner-hooks-new | Folds selections 17 to 20 (rulings block "2026-11-11T10:30Z — selections 17 to 20", record `64cf040`) as D-8 to D-11, and resolves OQ-0 to OQ-3. X-1 and X-2 now have a carrier, `handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md`, and X-9 and rider R1 are added. Scope delta: M2's AC2-3 is settled (the save schema is not edited); M1's L1, L9, AC1-1 and AC1-4 now carry his whitespace and File rulings, with no whitespace residue; rider R1 is added. Size against the original ask: unchanged, one send-check change plus the 1024 bound. |
| 2026-11-11T10:38 | R-1 | steering-queue-hooks | Registration: D-12 (X-1, the generic toast, stays excluded: selection 21) and D-13 (rider R1 kept: selection 22). His words are in rulings block "2026-11-11T10:38Z — selections 21 and 22". No requirement changed; the revision stays 1. |
| 2026-11-11T11:05 | 2 | planner-hooks-016 | Folds three gate reads of revision 1: critique cycle 1 pass 1, F-1 to F-10 (`2e26556`); architecture conformance, AF-1 to AF-5 and AF-7 (`c61a96f`); QA Phase 1, QAF-1 to QAF-8 (`803a97c`). The arguments live in those documents. Scope delta: M1's measured population is now the 116-member corpus (AC1-1, AC1-4), placement covers every limb (AC1-2), L5 and L6 cover absent forms, and L8 defines an emoji and takes D-9's whitespace rule by riding selection 18. M1 gains AC1-6p (post-deploy), AC1-9 (every other message keeps today's result), AC1-10 (env-free imports) and AC1-11 (lint). The reason line's `/preview` surface is stated. M2's AC2-2 is split into a suite half and B-2. Rider R1 is dropped (F-6, D-13). Size against the original ask: unchanged, one send-check change plus the 1024 bound, with tighter criteria and no new milestone. |
| 2026-11-11T11:13 | 3 | planner-hooks-016 | Folds the owner's selection 23 (rulings block "2026-11-11T11:11Z — selection 23", record `c966305`) as D-14, and QA's QAF-9 from its re-key on revision 2 (`77b1fd6`). The critique (`5c1512f`) and the architecture delta (`2520ac7`) approved revision 2. Scope delta: milestone M1b added (the preview route shows no validation chrome, every error line included), reversing plan 015 D33. M1's whitespace-empty predicate is restated per character, and the corpus is re-pinned to QA's 120 members. Since approval of the value statement: three revisions and two gate rounds; M1b is the one milestone added. Size against the original ask: one send-check change plus the 1024 bound, and by his word one shared preview-chrome change. |

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
| D-12 | The generic send-failure toast stays out of this plan (X-1), carried by `handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md` | 2026-11-11 | "Agent: keep it out (Recommended)". Selection-prompt answer (selection 21): ledger block "2026-11-11T10:37Z — steering-queue-hooks"; rulings block "2026-11-11T10:38Z — selections 21 and 22". The option text he saw (steering's): "I start the critic and the architect on revision 1 as it stands. The toast is carried for later by a handoff the planner already wrote (send-check-validity-excluded-toast-and-file-upload), which also carries the File upload path your earlier ruling put after the existing items. Nothing more is planned for the toast until that handoff is picked up." | Owner withdrawal only. |
| D-13 | Rider R1 stays: if the chain edits `messageValidity.predicate.test.ts`, the same commit moves it beside its module | 2026-11-11 | "Agent: keep the rider (Recommended)". Selection 22, same ledger and rulings blocks. The option text he saw (steering's): "the plan goes to review with the rider. Cost by the plan: one extra line for code review and a check that the file's test count and pass set are identical before and after the move. It drops on its own if the critic or reviewer objects. The other five files stay on the handoff." | Owner withdrawal; or an objection from critique or review, on which the rider drops (the plan's "Riders yield"). **Fired:** critique F-6 (`critiques/016-send-check-validity-critique.md`, `2e26556`). R1 is dropped at revision 2, under the drop disposition he was shown. |
| D-14 | The preview route shows no error lines and no red border at all, the existing ones included, so no preview image carries them; the editor and the send page keep every line; built in this plan | 2026-11-11 | "Agent: hide all on preview, in 016 (Recommended)". Selection 23: ledger block "2026-11-11T11:11Z — steering-queue-hooks"; rulings block "2026-11-11T11:11Z — selection 23". The option text he saw (steering's): "the planner adds one change to plan 016: the preview route shows no error lines or red border at all, the existing over-limit ones included, so no preview image carries them. The editor and the send page keep every line. This reverses your 2026-11-08 choice for the over-40 line." | Owner withdrawal only. Consequence: M1b. It reverses plan 015 D33 (his "Agent: same as siblings", `steering/015-rulings.md` block 08:02Z, by steering's read), which is restated here as reversed. |

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

A fourth surface changes by his ruling D-14: the `/preview` route (`src/app/preview/page.tsx`
renders `DiscordMessageEditor` with no `editableState`; read at `0e3d903`, 11:01Z) shows no error
line and no red border, so no preview image carries them. The preview-image service screenshots
that route, and a save generates an image in both branches of `upsertMessage`
(`src/server/api/utils/shared.ts`; steering's read, rulings block 11:11Z). See M1b.

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
  `validateContentRequirements`). Classic messages are not measured and keep today's result
  (AC1-9, X-6).
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
- The validator imports its bounds only from `~/constants/messageLimits`, never from `~/constants`
  or `~/server/api/utils/shapes`, and its URL helper imports `z` from `zod` directly (AC1-10). The
  reason is architect AF-1: both of those modules reach `~/env.mjs`, which the backfill's ts-node
  loader refuses with `ERR_REQUIRE_ESM`. The architect executed this
  (`verification/016/architect-conformance/ts-node-import-probe.txt`).
- The validator walks its input with structural types, as `sumDisplayableText` does (architect
  AF-5, A-4), so it accepts editor drafts and stored `MessageData` alike.
- **The reason line.** It is one error line in `DiscordMessageEditor/index.tsx`, beside
  `v2TextError` and `componentCountError`, and it joins their `styles.errorBorder` union (sibling,
  same file; architect AF-7). Like its siblings, it has no edit-mode condition. It shows in the
  editor and wherever `MessagePreview` renders (`src/components/MessagePreview.tsx` renders
  `DiscordMessageEditor`; read 10:23Z): the send page, the send page's Edit Message menu and the
  New Message dialog. As a consequence (research F-12), a freshly added component other than a
  Separator shows the line until it is filled in. On `/preview`, M1b removes every line, the new
  one and its siblings alike, in the shared component (D-14, D-5).

## Requirement ledger — the refusal class

The class is "every V2 shape Discord was measured refusing". Its measured population is the
**corpus**: QA Phase 1's 120-member fixture,
`verification/016/corpus/fixture/discordV2SendCorpus.ts` (sha256 `49b54f8e…15bb9b`, git blob
`9fb22ae`, record `77b1fd6`, as QA reported it). It holds 86 refused and 34 accepted members. It is
made of the research's 76 (`research/closed/components-v2-send-validity-2026-11-11.md`, `c9f8e3a`),
re-sent by QA with 76 of 76 verdicts and 52 of 52 error bodies matching, plus 44 members QA measured
first (`qa/016-send-check-validity-qa.md`, "Members beyond the research", and the four U+0085-run
members of QAF-9, measured 11:08Z). Case ids below are the research's. QA's members are cited by
that document's rows.

**Whitespace-empty**, used by L1 and L8: a string is whitespace-empty when it holds no U+FEFF and
every one of its characters `c` either satisfies `c.trim() === ''` or is U+0085. The empty string
is whitespace-empty. In plain terms, this is `trim()`'s whitespace with U+0085 added and U+FEFF
removed (D-9), judged per character, so a U+0085 does not shield the whitespace beside it (QAF-9:
`"\u0085 \u0085"` is refused by Discord; over the corpus's 30 lone-Text-Display and label-only
members, this form is wrong on 0, `verification/016/corpus/whitespace-rule-check.txt`). L8 takes
the same predicate. That
rides selection 18: its option text was "the new check uses trim() and treats those two characters
as Discord does", and Discord treats them the same way in a label (QA QAF-3: label U+0085 refused,
U+FEFF accepted). This is reported to the owner, who may veto it.

**Placement.** Every limb applies at every placement the save schema's nesting admits for its
component (`shapes.ts`: `containerChildShape`, `sectionShape.components` and `.accessory`,
`actionRowShape.components`, `mediaGalleryShape.items`). The placements are: top level; inside a
Container; as a Section's child or accessory, at top level and inside a Container; as an Action
Row's button, at top level and inside a Container; every item of a Media Gallery, not only the
first. Measured placements: the research's (B7 to B12, X2, X3, X7) and QA's 14 nested faults and
second-item member. A placement with no corpus member is **extended from the schema**, and QA marks
each one at Phase 2.

| L | Limb (the check refuses when, anywhere in the tree, …) | Measured refused | Measured accepted, must pass | Carried by |
|---|---|---|---|---|
| L1 | a Text Display's `content` is absent or whitespace-empty | B1–B4, B6–B12, W1–W4, W6, W7, X7; QA's `"\u0085 "`, `" \u0085\n"`, `"\u0085 \u0085"`, `" \u0085 \u0085 "`, `"\u0085\u0085"` | B5, W5, W8; QA's `"﻿ "`, `"a\u0085"`, `"​ "` | M1 |
| L2 | a Section's `components` is empty or absent, or its `accessory` is absent | C2, C4; QA's Section no `components`; Section `[]` in a Container | C1, C5; QA's nested Section controls | M1 |
| L3 | a Media Gallery's `items` is empty or absent | D2, D6, X3 | D1, N7; QA's nested gallery control | M1 |
| L4 | a Container's `components` is empty or absent | G2, G3 | G1, X4 | M1 |
| L5 | an Action Row's `components` is empty or absent | H2, X2; QA's Action Row no `components` | H1, H7; QA's nested Action Row control | M1 |
| L6 | a required URL, or the object that holds it, is empty or absent: Thumbnail `media` / `media.url`, gallery item `media` / `media.url` (every item), link button `url` | C3, C6, D3, H3; QA's absent `url`, `media: {}`, no `media` (Thumbnail, gallery item), nested `''` members, second item `''` | — | M1 |
| L7 | a required URL fails the save schema's URL predicate, or a link button's scheme is not http, https or discord | I1, I2, I3, X5; QA's nested `abc` and `ftp://` | X6 (an ftp Thumbnail URL is accepted, so the scheme limb is link buttons only) | M1 |
| L8 | a link button has no emoji and its `label` is absent or whitespace-empty. A button **has an emoji** when `emoji` is present with a non-empty `id` or a non-empty `name` | C7–C9, H4–H6; QA's emoji `{}`, emoji `{name: ''}`, label U+00A0, U+0085, `"\u0085 \u0085"`, nested label absent and one space | X1; QA's label U+FEFF | M1 |
| L9 | a File component is present, on a new send and on an edit (D-11) | E1, E2, E3; QA's no `file`, nested https | — | M1 |
| L10 | a Thumbnail or gallery item `description` is the empty string, or longer than 1024 | C10, D4; QA's 1025 (Thumbnail, gallery item), nested `''` and 1025 | C11, D5 (one space); QA's 1024 (Thumbnail, gallery item) | M1 (check), M2 (inputs, constant; the save schema is not edited, D-10) |
| L11 | already refused today, and must stay refused: no components; content beside V2; over 40 components | A3, A5, N2, N4, N6, N9 | A1, A2, A4, F1, F2, N1, N3, N5, N8 | unchanged; M1 must not regress them |

The research's 76 are tallied across these cells (52 refused, 24 accepted, each id once), checked
by QA's script (`verification/016/corpus/tally-3b4205d.txt`, exit 0). QA's 44 are cited by its
table rows and carried whole by the fixture, which is the enumerator.

**L7's predicate is the save schema's, written once.** The validator calls a named helper in
`limits.tsx` that applies `z.string().trim().url()` from `zod` (sibling:
`shapes.ts:linkButtonShape.url`, the same expression), never an import of `shapes.ts` (AC1-10), and
never an inline `new URL` (architect AF-2, option a). Why not the in-module sibling `isValidUrl`:
its pattern `^https?://[^ ]+\.[^ ]+$` admits only http and https, so it would refuse X6, an ftp
Thumbnail URL Discord accepts. Its consequence is in RK-1.

**Residue, bounded:** characters outside the measured whitespace members (research N-3); URL forms
other than empty, `abc` and `ftp://` (for example `discord://`, or an https URL with no dot);
an invalid emoji beside a label (unmeasured: QAF-2); over-cap values (N-8: label 80, Section 3,
Action Row 5, gallery 10), which the editor and the schema already cap; non-ASCII length
(description research N-1); edit-path shapes beyond the research's 10 (N-6).

## Plan

### M1 — The send check refuses the ledger's class and says which

**What changes (product behaviour):** a draft in any L1–L10 refused shape is refused at the send
page (Send disabled), shows one reason line in the editor and the send-page preview, and is stored
with `valid: false` at its next save. Every other message keeps today's result (AC1-9).

Acceptance criteria (properties):
- **AC1-1 (agreement with Discord over the measured class).** For every member of the corpus (120:
  86 refused, 34 accepted), `validateMessage({ username: 'Probe', ...body })` is non-empty exactly
  when Discord refused the member. The expected verdict is the member's measured `discord` field,
  never a value the website computes (expectations independence). No member may differ. The
  implementer copies the fixture byte-identical to `src/utils/__tests__/helpers/discordV2SendCorpus.ts`,
  and Phase 2 checks its sha256 and blob. **When a later re-send differs from a member's recorded
  verdict:** if the body was rebuilt wrongly, the fixture is corrected (QA decides, and the recorded
  verdict stays the oracle). If Discord's answer has changed, that changes the ledger: it is a
  planning revision, decided by the planner, and the owner's if it moves D-8's class. Until that
  revision, the recorded verdict at `measuredOn` stays the oracle.
- **AC1-2 (placement).** Each of L1 to L10 refuses at every placement the ledger's Placement
  paragraph enumerates, and the corpus's nested accepted controls pass. A placement with no corpus
  member is decided by a constructed member, marked as extended from the schema.
- **AC1-3 (absent equals empty).** For each field L1 to L6 name, and for the objects that hold L6's
  URLs, the key-absent form is refused the same way as the empty form. Measured members: B6, C4, D6,
  G3, and QA's seven "not sent" forms (link button `url`, Thumbnail `media: {}` and no `media`,
  gallery item no `media`, File no `file`, Section no `components`, Action Row no `components`).
  Every absent form these limbs name is now measured.
- **AC1-4 (no false refusal over the measured accepted set).** Every one of the corpus's 34 accepted
  members passes: W5, QA's label U+FEFF, QA's `"﻿ "`, `"a\u0085"`, `"​ "`, the 1024
  descriptions and the nested controls included.
- **AC1-5 (says which).** The reason unit is the pair (limb, component type). For example, L6 has
  three reasons: Thumbnail, gallery item, link button. Each pair returns a reason distinct from
  every other pair's and from every existing reason (`validateContentRequirements`,
  `validateComponentCount`, `validateDisplayableTextCount`, the username and embed reasons). Each
  reason names its component type and fault, for example "A Text Display is empty.". The text is
  agent-authored copy, which the owner may edit at UAT (P-1's principle).
- **AC1-6 (human-observable, pre-release).** On a local build of the chain tip (D-7's id offset
  applied before the first save), a message with a freshly added Text Display shows the reason line
  in the editor and on the send page, and Send is disabled. Filling it removes the line and enables
  Send, and a send to the agents' test-server webhook returns success. The walk also records N-2
  (whether one typed space reaches the data as a space) and the `/preview` render of the same
  draft. Carried by QA register row **B-1** (`qa/016-send-check-validity-qa.md`), walked by UAT.
  Capture path: `verification/016/uat/`.
- **AC1-6p (post-deploy, the owner's defect).** In production on hooks.gg, a new V2 message with
  one fresh Text Display shows the Text Display reason line and Send is disabled. This tells fixed
  from unfixed: at `0e3d903` no error line fires for one empty Text Display (by QA's code read). B-4
  is its liveness pair: a filled V2 message still sends. Carried by QA register rows **B-3** and
  **B-4**. Their carrier after Stage 1 is devops's post-deploy handoff, and the emptiness handoff
  closes at the B-3 read, not at the push. B-3's unfixed value is read once against production
  before release (B-3's state column).
- **AC1-7 (stored `valid`).** `isMessageValid` returns `false` for every refused corpus member and
  `true` for every accepted one, because it calls the same predicate.
- **AC1-9 (every other message keeps today's result).** For every message outside the L1 to L10
  refused classes, `validateMessage` at the chain tip returns the same string as at `0e3d903`. The
  input classes, each named: (a) classic messages, meaning no V2 structure and the flag clear,
  including classic Action Rows whose buttons are in an L5 to L8 shape; (b) every input the existing
  `limits.*`, `utils.mutual-exclusivity` and `messageValidity.predicate` tests pass to the predicate;
  (c) the corpus's accepted members. Instrument: QA's two-tree differential at Phase 2
  (`verification/016/differential/`), run with `validateMessage` at `0e3d903` and at the tip.
  Movement is allowed only on members of an L1 to L10 refused class. Residue: inputs outside (a) to
  (c). A suite case pinning a classic shape as sendable is not the instrument, since Discord's
  verdict on classic shapes is unmeasured (X-6).
- **AC1-10 (the import closure stays env-free).** `src/utils/limits.tsx` imports bounds only from
  `~/constants/messageLimits`, and its whole import closure excludes `~/env.mjs`. Instrument
  (architect AF-1): `npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"`,
  run from `website/`, exits 0 at the tip. Its red member is the architect's probe capture. No
  vitest case can see a breach, because every predicate test mocks `env.mjs`. QA places it.
- **AC1-11 (lint).** The chain adds no eslint finding: for each file it changes, the finding count at
  the tip does not exceed the count at `0e3d903`. The repository is red before the chain (§ Validation,
  X-10).
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

### M1b — The preview route shows no validation chrome (D-14)

**What changes (product behaviour):** on `/preview`, and therefore in every preview image generated
from it, none of the editor's error lines renders and the accessories container carries no red
border. Every other surface keeps every line. This reverses plan 015 D33 for the over-40 line, by
his word (D-14).

**Re-derivation (M1 ships product behaviour; M1b is downstream):** M1 adds a line that fires for
routine drafts (F-12). M1b's premise is exactly that: an image of a routine draft would carry it.
M1's behaviour is the reason for M1b, so the premise holds.

The class, enumerated at `0e3d903` (`DiscordMessageEditor/index.tsx`, read 11:15Z): the error lines
`noContentError`, `embedCharacterError`, `v2TextError` and `componentCountError`, M1's new reason
line, and the `styles.errorBorder` class on the accessories container. The render sites of
`DiscordMessageEditor` outside tests (`git grep -n "<DiscordMessageEditor\b|<MessagePreview\b"`,
11:15Z) are `src/app/preview/page.tsx`, `src/app/message/m/[id]/edit/page.tsx`, and through
`MessagePreview` the send page, `send/_components/EditMessageMenu.tsx` and `NewMessageModal.tsx`.

- **AC1b-1.** On `/preview`, for a message that triggers each member of the class, the member does
  not render. Each of the six members is checked separately, with its trigger present.
- **AC1b-2.** On every other render site listed above, each member renders exactly as at `0e3d903`,
  and M1's new line renders as M1 specifies.
- **AC1b-3.** Only `src/app/preview/page.tsx` turns the class off. No other render site passes the
  signal. The mechanism is the architect's proposal (AF-11): a signal only the preview route passes,
  not edit mode, because the send page's read-only preview needs the lines. Its form is the
  implementer's.
- **AC1b-4 (human-observable).** On a local build of the tip, `/preview` for a draft with a fresh
  Text Display shows no red line or border, while the editor and the send page show the line. Walked
  by UAT in B-1's session. After deploy, the preview image of a test-account V2 message saved with an
  unfilled component carries no red line. QA registers both rows.

Rollback: `git revert`, as M1. A revert brings the lines back into preview images.

### M2 — The 1024 description bound in the constant and both inputs (Save does not refuse)

**Re-derivation (M1 ships product behaviour; M2 is downstream):** M1 already refuses an over-1024
description at Send. M2 adds what M1 does not: the user cannot type past 1024 in either description
input, and the bound lives in one constant, so the editor and the check read the same number (A-4).
That premise still holds against M1's behaviour.

- **AC2-1.** One constant for the 1024 bound sits in `src/constants/messageLimits.ts` (sibling:
  `MAX_EMBED_FIELD_VALUE_LENGTH`, same file). M1's L10 check and both inputs read it. It lives in
  that file because `limits.tsx` reads it and that file is env-free (architect AF-3, AC1-10).
  `~/constants` re-exports it for the inputs.
- **AC2-2.** The Thumbnail and gallery-item description inputs (`ThumbnailEditor.tsx`,
  `MediaGalleryEditor.tsx`) cap typed and pasted input at that constant, mirroring
  `LinkButtonEditor.tsx`'s `maxLength={MAX_BUTTON_LABEL_LENGTH}`. Suite half: the rendered
  `<input>` carries `maxLength` 1024. Browser half: typed and pasted input stops at 1024, carried by
  QA register row **B-2**, walked by UAT. jsdom applies no `maxLength` to typing or paste (QAF-7).
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
After release: the handoff `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`
closes `Addressed` once B-3 reads fixed in production (AC1-6p). Its own words are "this handoff
stays open until that fix is released".

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
predicate over the corpus and AC1-2's placements, a DOM test of the editor's reason line (AC1-5),
DOM tests of M1b's six members on `/preview` and on the other render sites (AC1b-1, AC1b-2),
the two-tree differential (AC1-9, QA's at Phase 2) and the ts-node import probe (AC1-10), which
runs outside vitest. Before adding a test, extend the existing ones on this surface:
`src/utils/__tests__/limits.send-gate-partition.test.ts` and `limits.component-count.test.ts`.
QA's strategy is `qa/016-send-check-validity-qa.md`, "Test Strategy (Pre-Implementation)", with
its entry conditions for the implementer.

**Rider R1 is dropped** (critique F-6: its criterion cannot hold when the move and M1's added cases
share a commit; D-13's reopening class). The drop disposition priced in revision 1 applies.
`src/utils/__tests__/messageValidity.predicate.test.ts` is not edited. AC1-7 is covered by limits
tests that call `isMessageValid`. `handoff/website-tests-not-beside-their-module-2026-11-08.md`
stays as it is (X-9).

QA sequencing: QA Phase 1 ran before implementation (D-2) and read revision 1. Its findings are
folded here, and it re-keys on revision 2. The browser walks are B-1 and B-2 (UAT, pre-release) and
B-3 and B-4 (post-deploy). Cases, fixtures and coverage are QA's.

## Validation

- Base tree `0e3d903`, 10:24Z: `npx vitest run --reporter=json`, exit 0; 1145 of 1145 cases passed,
  118 file entries in `testResults`. `pnpm run typecheck`, exit 0. The suite is not red before the
  chain opens.
- Lint, base tree `0e3d903`, 11:03Z: `npx eslint src --format json` exit 1, with 312 errors and 364
  warnings in 109 files (counted by `python3` over the JSON). Of the files this plan names, two test
  files carry errors: `limits.import-validation.test.ts` and `limits.send-gate-partition.test.ts`.
  The repository's `lint` script is `eslint --fix . --max-warnings=0`, which writes files, so it was
  not run. The red is scoped out (X-10), and AC1-11 bounds what the chain adds.

## Risks

- **RK-1 — false refusal.** The check refuses a message Discord would send. Members: the File edit case
  D-11 accepted (research N-5). The File editor's url box is free text with the placeholder
  `attachment://filename.png` (`FileEditor.tsx`, read by steering, rulings block 10:30Z), so a user
  editing a message that has attachments can type an existing attachment's name, and the check
  refuses that edit. Also members: unmeasured URL forms, if a limb is written wider than the ledger.
  Falsifiers: AC1-4 over the accepted set; for the File member, a user report of a blocked edit
  holding a File. A report is recorded against D-11's reopening class, and its carrier after
  closure is `handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md` (Item 2).
- **RK-4 — the editor's URL marker and the send check disagree** (architect AF-2). The link-button
  editor's "Invalid URL." line uses `isValidUrl`. L7 uses the save schema's predicate, which admits
  more: for example a `discord://` URL, or an https URL whose host has no dot. Such a button shows
  red in the editor while Send stays enabled. The marker is a sibling surface this chain does not
  edit (D-5). Stated limit. A report of "the editor says invalid but it sent" is the signature.
- **RK-2 — reconstruction drift.** **Falsified for the 76** at QA Phase 1: 76 of 76 verdicts, and 52
  of 52 error bodies byte-identical (`verification/016/corpus/resend-results.json`). The 40 new
  members are first measurements, so drift does not apply to them.
- **RK-3 — stored `valid` stays stale** for rows saved before release (§ Stored rows). A stated
  limit, not a gate.

## Exclusions

| X | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | The generic failure toast in `sendWebhook` (research F-14) | Determination 09:17Z, out-clause. Shown to the owner with this register. | `handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md`, Item 1 |
| X-2 | A File upload path; removing File from the add menu | New product work (D-3; D-2) | Same handoff, Item 2 |
| X-9 | Relocating the six files of `handoff/website-tests-not-beside-their-module-2026-11-08.md` | Rider R1 dropped (critique F-6); the chain edits none of the six | That handoff, which stays Open |
| X-10 | The base tree's existing eslint findings | Red before the chain opens, on files the plan does not otherwise touch, apart from two test files (§ Validation) | Stated limit; AC1-11 |
| X-3 | Any server-side refusal of a save | W-2 (D-4) | Stated limit |
| X-4 | Counting or repairing stored rows | D-6. Research Recommendation 2 is out (determination). | Stated limit (§ Stored rows) |
| X-5 | The add menu's default factories | Determination out-clause | Stated limit (AC1-6 records what the user sees) |
| X-6 | Classic messages; the save gate | Determination out-clause; chain `fix-website-save-gate-embeds` | Stated limit |
| X-7 | Unmeasured refusals (N-3, N-8) | Determination: measured cases only | Ledger residue |
| X-8 | `project-utils`, `preview-image-generator` | Determination. No copy of the check in `project-utils` (`git grep -l`, exit 1, steering's read). `preview-image-generator` at `8de2b53` was read with a pathspec that leaves out `.github`: `src/generateImage.ts` waits on `networkidle0` only, and keys on no error element (`git grep -n`, 11:14Z), so M1b's removal does not change what it waits for. It is not edited. | Stated limit |

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
  - `website-tests-not-beside-their-module-2026-11-08.md`: fires only if one of its six files is
    edited, and the chain edits none of them (rider R1 dropped, X-9).
  - `architecture-record-reconciliation-owed-2026-11-10.md`: **discharged.** The architect closed it
    `Addressed` at this plan's conformance pass (now under `handoff/closed/`, `Status: Addressed`, read
    11:05Z).
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
