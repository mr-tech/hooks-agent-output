---
ID: 016
Origin: 016
UUID: 54673438
Status: Active
Status-Detail: "Revision 0, not yet put to the critic. Holds on the owner: approval of the value statement and OQ-1 to OQ-3, put through steering-queue-hooks. Revision 1 folds his answers in, and only then is the critic cued."
Revision: 0
Target Release: "website master → this chain's merge SHA (Vercel production on a push of master). The package carries no version artefact (package.json has no version field, CHANGELOG absent; read 2026-11-11T10:22Z)."
Epic-Alignment: "none registered. The workspace has no roadmap, by the owner's standing instruction (brief). Source of the effort: research/closed/components-v2-send-validity-2026-11-11.md and research/closed/components-v2-description-text-limit-2026-11-11.md; opened by selection 14 (rulings block 2026-11-11T09:09Z)."
Lane: "standard. The scoping determination sets a full chain (rulings block 2026-11-11T09:17Z). The blast radius is a shared predicate: validateMessage feeds the send page, the stored valid column and the public v1 API, so this is not a leaf."
Architectural-Surface: "none added. The plan stays inside the A-4 module and adds a validator beside the existing ones. Record lines touched: A-4 (its residue consequence is carried, § Stored rows and the public API); W-2 is in tension with one design option (OQ-2)."
---

# Plan 016 — The send check refuses what Discord refuses (Components V2 validity, 1024 included)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-11T10:26 | 0 | planner-hooks-new | Created from the 09:17Z scoping determination and selection 14. Puts the value statement and OQ-1 to OQ-3 to the owner through steering-queue-hooks. Scope delta: none (first revision). Size against the original ask: one change to the send check, as selection 14 asked, plus the 1024 bound folded in by his choice. |

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
1024-character description limit"). **The value statement is put to him for approval (OQ-0).**

## Decisions Register

| D | Decision | Date | His words, and the route they arrived by | Reopened by |
|---|---|---|---|---|
| D-1 | One send-check fix, covering the measured V2 refusals and the 1024 bound together, so the check changes once | 2026-11-11 | "Agent: scope one fix, 1024 included (Recommended)". Selection-prompt answer: ledger `steering/selection-ledger/2026-11-11.md`, block "2026-11-11T09:09Z — steering-queue-hooks". He was shown this option text: "I record one scoping decision for making the send check refuse what Discord refuses, folding in the 1024-character description limit you already chose, so the send check changes once. It is likely bigger than a small fixer chain (a plan, review, QA and your own check); the scoping says which, and whether the File component gap is in or out, and you can veto it from the record." | Owner withdrawal only. Consequence: selection 11's separate 1024 fixer is superseded (rulings block 09:09Z). |
| D-2 | Scope, pipeline, and the File component as in for refusal, out for capability | 2026-11-11 | **Agent-authored** by `steering-queue-hooks`, rulings block "2026-11-11T09:17Z — scoping determination". These are not his words. He may veto from the record, and he had not vetoed by 10:19Z (rulings block 10:19Z). | His veto. Also any measurement showing that a send from the website can carry an attachment (bears on the File limb). |
| D-3 | New feature work is planned only after the existing items are done | 2026-11-11 | His typed words, prompt 2 (rulings block "selections 1 to 4"; ledger block "2026-11-11T08:26Z — steering-queue-hooks"): "move this to the end of questions and after any other work in this project is completed. in other words, this new stuff is planned after the existing items are handled" | Owner withdrawal only. Consequence: a File upload path and removing File from the add menu are excluded (X-2). |
| D-4 | A message may be saved in a bad state; validity is recorded, not enforced, when a save is written | 2026-08-24 | `architecture/website.md` W-2, owner-authored: "A message is allowed to be saved in a bad state (e.g., missing content, over character limits, etc.) … the back-end reflects what the front-end allows." | Owner withdrawal only. Consequence: no server-side refusal of a save (X-3). OQ-2 asks how this applies to the save schema's per-field caps. |
| D-5 | Mirror the sibling features | standing | The owner's standing rule, as the planner definition carries it: "Mirror the sibling features: reuse their shared patterns and write no new code where they already serve. A bug in a shared pattern is fixed once, in the shared code, so every feature gets the fix; until that can happen, the bug stays as it is everywhere. Never fix or work around it in one feature only." | Owner withdrawal only. |
| D-6 | Discord sends happen only in the agents' test server; no agent reads the production database | standing | Global `CLAUDE.md`, "Outbound messages": "The Discord test server (guild `1566742402180456559`) is the agents' own". The database prohibition is the brief's pointer to his standing rule (brief, "Standing rulings"). | Owner withdrawal only. |
| D-7 | On a local website build, message ids are moved above production's range before the first save | 2026-11-11 | "Agent: add the id-offset rule (Recommended)". Selection-prompt answer: ledger block "2026-11-11T10:10Z — steering-queue-hooks". The rule's text in `agent-output/CLAUDE.md` is agent-authored. | Owner withdrawal, or a separate Pusher app for local builds (his option 2 in that prompt). |

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

**OPEN QUESTION OQ-0 (approval):** is the value statement above the one he wants? The plan's class
is wider than his August sentence. That widening is selection 14's own wording.

**OPEN QUESTION OQ-1 — what counts as whitespace in a Text Display.** Discord refuses a Text
Display whose content is empty after it strips whitespace (research F-2). The sibling check,
`validateContentRequirements`, uses JavaScript's `trim()` for classic content. Measured over 11
characters, `trim()` agrees with Discord on 9 and differs on 2 (research F-2, Node 24):
- U+0085 alone: Discord refuses it, and `trim()` keeps it. A check built on `trim()` lets it through,
  and the user gets the generic toast.
- U+FEFF alone: Discord accepts it, and `trim()` removes it. A check built on `trim()` refuses a
  message Discord would send.

Options: (a) mirror the sibling's `trim()`. Both characters are then named residue: one is let
through, one is wrongly refused. (b) `trim()` plus an exception for those two measured characters,
so the check agrees with Discord on all 11. This is a deviation from the sibling, with this as its
reason. Characters outside the 11 are residue under either option (research N-3). Planner's
recommendation: (b), because (a) refuses a message Discord accepts.

**OPEN QUESTION OQ-2 — whether the 1024 bound refuses a save.** Two of his rulings point different
ways here. Read at `0e3d903` (`src/server/api/utils/shapes.ts`, 10:22Z): the save schema already
caps the sibling fields, with `label: z.string().trim().max(MAX_BUTTON_LABEL_LENGTH)` and
Text Display `content: z.string().max(MAX_TEXT_DISPLAY_CONTENT_LENGTH)`. A save over those caps is
therefore refused by the schema today. A-4 records the pattern "the editor and the save schema read
the same constant for the same bound". W-2, his words, says a message may be saved "over character
limits". The 09:17Z determination puts the save schema in "as far as sibling per-field limits
already go" and puts "any server-side refusal of a save" out. On the description field, those two
clauses contradict each other.
Options: (a) **mirror the siblings**: the constant, a `maxLength` on both description inputs
(sibling `LinkButtonEditor.tsx`, `maxLength={MAX_BUTTON_LABEL_LENGTH}`), and `.max(1024)` on
both description fields in the save schema. A save, or a pasted JSON, with a description over 1024
is then refused, as an 81-character button label is today. (b) the constant, the input
`maxLength` and the send check only, with the save schema left unbounded. Such a draft saves (W-2),
is recorded `valid: false`, and is refused at Send. This deviates from A-4's pattern. Either way,
the send check refuses over 1024. Planner's recommendation: (b), because it keeps W-2's wording and
the determination's out-clause. Not read: whether a stored row with a description over 1024 exists.
No agent reads that database (D-6). If one exists, option (a) would also make it fail to load
through the JSON paths, which run the same schema (read from code, not run).

**OPEN QUESTION OQ-3 — a File component on an edit.** On a new send, Discord refuses a File
component in every form the website can produce (research F-7: `url: ''`, an https URL, an
`attachment://` name with no upload). The website's edit path (`sendWebhook`, `PATCH` when
`oldMessage` is set; read from code at `0e3d903`) sends no upload, but the message being edited may
already carry attachments. Whether Discord then accepts a File that references one is unmeasured
(research N-5). Options: (a) refuse File on every send and edit. N-5 is residue: an edit Discord
might accept is refused. (b) the planner commissions the analyst to measure N-5 in the test server
first, then the plan follows the result. This adds one analysis before implementation. (c) refuse on
new sends only. Edits with a File pass unmeasured. Planner's recommendation: (a), because no route
on the website composes a File referencing an existing attachment (the File editor's url input is
free text; F-7's E2 and E3 are the forms it produces).

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
| L1 | a Text Display's `content` is absent, or empty after whitespace removal (whitespace set: OQ-1), anywhere in the tree | B1–B4, B6–B12, W1–W4, W6, W7, X7 | B5, W5, W8 | M1 |
| L2 | a Section's `components` is empty or absent, or its `accessory` is absent | C2, C4 | C1, C5 | M1 |
| L3 | a Media Gallery's `items` is empty or absent, anywhere in the tree | D2, D6, X3 | D1, N7 | M1 |
| L4 | a Container's `components` is empty or absent | G2, G3 | G1, X4 | M1 |
| L5 | an Action Row's `components` is empty, anywhere in the tree | H2, X2 | H1, H7 | M1 |
| L6 | a required URL is empty or absent: Thumbnail `media.url`, gallery item `media.url`, link button `url` | C3, C6, D3, H3 | — | M1 |
| L7 | a required URL does not parse as an absolute URL (the save schema's predicate: sibling `shapes.ts:linkButtonShape.url`, `z.string().trim().url()`), or a link button's scheme is not http, https or discord | I1, I2, I3, X5 | X6 (an ftp Thumbnail URL is accepted, so L7's scheme limb is link buttons only) | M1 |
| L8 | a link button has no emoji and its `label` is absent, empty, or empty after `trim()` | C7–C9, H4–H6 | X1 | M1 |
| L9 | a File component is present (edit case: OQ-3) | E1, E2, E3 | — | M1 |
| L10 | a Thumbnail or gallery item `description` is the empty string, or longer than 1024 | C10, D4; 1025 chars (description research F-6, requests 25–36) | C11, D5 (one space); 1024 chars | M1 (check), M2 (inputs, constant, schema per OQ-2) |
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
  (expectations independence). The only members allowed to differ are the ones OQ-1's chosen option
  names as residue, each listed by case id. The corpus enumerator is a fixture QA builds at Phase 1
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
  passes, except OQ-1's named residue.
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

### M2 — The 1024 description bound, wired as far as the siblings go

**Re-derivation (M1 ships product behaviour; M2 is downstream):** M1 already refuses an over-1024
description at Send. M2 adds what M1 does not: the user cannot type past 1024 in either description
input, and the bound lives in one constant, so the editor and the check read the same number (A-4).
That premise still holds against M1's behaviour.

- **AC2-1.** One constant for the 1024 bound sits in `src/constants/messageLimits.ts` (sibling:
  `MAX_EMBED_FIELD_VALUE_LENGTH`, same file). M1's L10 check and both inputs read it.
- **AC2-2.** The Thumbnail and gallery-item description inputs (`ThumbnailEditor.tsx`,
  `MediaGalleryEditor.tsx`) cap typed and pasted input at that constant, mirroring
  `LinkButtonEditor.tsx`'s `maxLength={MAX_BUTTON_LABEL_LENGTH}`.
- **AC2-3 (per OQ-2).** Option (a): both description fields in `shapes.ts` carry `.max` of the
  constant. Option (b): `shapes.ts` is not edited, and its description fields stay
  `z.string().optional()`.

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
trigger (see Entry work). The browser walk is AC1-6, at UAT. Cases, fixtures and coverage are QA's.

## Validation

- Base tree `0e3d903`, 10:24Z: `npx vitest run --reporter=json`, exit 0; 1145 of 1145 cases passed,
  118 file entries in `testResults`. `pnpm run typecheck`, exit 0. Nothing is red before the chain
  opens.
- Lint: 34 findings were already present at `6d78b19` (rulings block 08:46Z, item 3). Not re-run here.

## Risks

- **RK-1 — false refusal.** The check refuses a message Discord would send. Members: OQ-1's U+FEFF
  under option (a); OQ-3's edit case under option (a); unmeasured URL forms if a limb is written
  wider than the ledger. Falsifier: AC1-4 over the accepted set. A user report of "Send disabled,
  but Discord accepts it" would be filed against the emptiness handoff's successor.
- **RK-2 — reconstruction drift.** A reconstructed corpus body differs from what the research sent,
  so AC1-1 passes against the wrong shapes. Falsifier: AC1-1's re-send.
- **RK-3 — stored `valid` stays stale** for rows saved before release (§ Stored rows). A stated
  limit, not a gate.

## Exclusions

| X | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | The generic failure toast in `sendWebhook` (research F-14) | Determination 09:17Z, out-clause. Goes to the owner with revision 1. | **Not yet carried.** A handoff is to be written once he rules on whether it is excluded. |
| X-2 | A File upload path; removing File from the add menu | New product work (D-3; D-2) | D-3's carrier, `TODO.md`'s competitor-research line (to be confirmed at revision 1) |
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
  - `website-tests-not-beside-their-module-2026-11-08.md`: **fires if `messageValidity.predicate`
    is edited.** Disposition at revision 1, after his answers: ride the move (the file moves beside
    `src/server/api/utils/messageValidity.ts`) or leave that file unedited.
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
