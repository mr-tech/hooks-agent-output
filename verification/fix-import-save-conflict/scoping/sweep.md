# Sweep: V2 + classic draft with Save disabled and no in-place resolution

Ref: website `origin/master` = `76da25c` (confirmed: `git -C /usr/local/bin/hooks/website rev-parse --short origin/master`).
All reads were `git show origin/master:<path>` or `git grep -n <pat> origin/master -- src`; line numbers are at that ref.
No .env file was read. No call was refused or left incomplete.

## 1. The two mechanisms

JSON tab, `src/app/message/_components/NewMessageJsonInput.tsx`:
- l.17 imports `applyDisposition, describeDropSet, noticeMessageForSettled, resolveContentLoss`.
- l.95-101: `discordMessageImportShape.parse(parsed)` then `resolveContentLoss(flags, components, content, embeds)`.
- l.103-107: `disposition.requiresChoice` -> `setDismissedChoice({validated, disposition}); setMessage(null); return`. The draft is null, so Save is off until the user chooses.
- l.109-110: no choice needed -> `setSettledNotice(noticeMessageForSettled(disposition)); setMessage(applyDisposition(validated))`. Rows A-D resolve silently, with a notice for B and D.
- l.52-56 `commitChoice`: `setMessage(applyDisposition(pendingChoice.validated, chosenOption.mode))`.
- l.58-68 `cancelChoice` / `reopenChoice` (the Resolve link, per D31). l.128 renders the choice buttons from `pendingChoice.disposition.options`.
- The functions live in `src/utils/index.ts`: `resolveContentLoss` l.115, `gateBeforePersist` l.172, `applyDisposition` l.190, `noticeMessageForSettled` l.211.
- Row E (l.125) is `hasV2Components && hasClassicContent`. V2 types are [9,10,11,12,13,14,17] (`src/constants/messageLimits.ts:12`), so an action row (type 1) is not V2. Row D (l.154-159) is the V2 flag with classic content and no V2 components. It settles to classic silently.

NewMessageModal, `src/app/message/_components/NewMessageModal.tsx`:
- l.110-123 `loadedMessage` = `discordMessage?.message ?? webhookMessage ?? commandMessage?.data ?? jsonMessage`, passed through `makeEditable`. There is no disposition step here.
- l.126 `contentFloorError = validateContentRequirements(loadedMessage)` runs on the RAW draft.
- l.192-196 `disableSave = !loadedMessage || !!contentFloorError || isSavingMessage || !messageName || messageName.length > MAX_MESSAGE_NAME_LENGTH`. Used at l.397 and l.445.
- l.353-354 renders `contentFloorError` as red text.
- `src/utils/limits.tsx:141` `isV2Message` is structural V2 OR the flag bit. l.233-247: `hasV2 && hasContent` returns 'Components V2 messages cannot contain embeds or content.'
- Consequence: the floor trips on rows D and E alike. Row E trips `gateBeforePersist.mustAsk`, but Save is disabled first.
- l.150-178 are live but unreachable by UI: `pendingChoice`, `onSubmit` (calls `gateBeforePersist`, submits `gate.data`), `commitChoice` (`applyDisposition(loadedMessage, mode)`). The choice dialog is rendered at l.210-217.

## 2. Ingresses into NewMessageModal

| Ingress | Source | Can produce V2 components + classic content? |
|---|---|---|
| Bot import (message link, `loadOption='bot'`) | `api.message.getFromUrl` (`src/server/api/routers/message.ts:78-110`) -> `discordResponseToMessage` | Mechanically yes. The converter copies `content` (l.126), rich embeds (l.127), filtered components (l.155) and `flags` (l.156) without normalising. Whether Discord ever returns both is unknown (qa BC-17, not discharged). |
| Webhook / message-link import | `useValidateWebhook.ts:62` -> `discordResponseToMessage` -> `setMessage(converted.data)` | Same as bot import. |
| Code import | `api.message.getFromCode` -> `messageStore.store` (`src/utils/redis/messageStore.ts:15`) -> the same converter | Same as bot import. |
| JSON tab | `NewMessageJsonInput` (`setMessage`) | No. A row E draft is held back (`setMessage(null)`) until the user chooses. Rows A-D arrive resolved, so the modal's floor passes them. |

Detail on the converter's output: the converter's own test (`src/utils/__tests__/discordResponseToMessage.rowE-persist-gate.test.ts`) shows a message with `content:'hi'`, a Container and the V2 flag survives intact (row E). Row D is also possible: flag set, content, no V2 components. In the modal that disables Save too, although the JSON tab and `applyDisposition` settle it silently. The handoff only discusses row E.

## 3. Other surfaces that persist or send a draft

| Surface | Mechanism | Has the property? |
|---|---|---|
| NewMessageModal Save (bot, webhook, code tabs) | See section 1. | YES. Save is disabled by the raw-draft floor, with no resolver in the modal for those tabs. |
| `SaveAsMenu.tsx` (editor "Save As") | `disableSave` l.79-81 has no floor term. `onSubmit` l.63-70: `gateBeforePersist` -> `setPendingChoice` -> choice dialog (l.85-100) -> `commitChoice` -> `applyDisposition(message.data, mode)`. | NO. It resolves the conflict. |
| Main editor save (`MessageProvider/useApiMethods.ts:78-104`, from Navigation.tsx:143/293 and edit/page.tsx:63/218) | `gateBeforePersist` -> `pendingSaveChoice` -> dialog rendered at `MessageProvider/index.tsx:358` -> `commitSaveChoice` -> `applyDisposition`. | NO. |
| Editor JSON tab (`m/[id]/_components/JsonModalBody.tsx`) | Floor is on the resolved draft (l.171: `validateContentRequirements(applyDisposition(validatedDraft))`). The choice is at l.95-100 and Load at l.285. | NO. It is the reference. |
| Send page (`m/[id]/send/page.tsx:160-170`) | `isMessageValid = !validateMessage(message.data)`; `allowSave` ANDs it in. | Disabled with no resolver on the page. Cannot tell whether a conflicting draft can arrive there: it needs a stored row E, which the persist gates prevent. `architecture/closed/013-...-findings.md:97-104` mentions 29 pre-existing invalid production rows. Not checked against data. |
| `m/new/page.tsx`, `f/[id]/page.tsx:342` | Persist the fixed intro message or a copy of one. | NO. No import. |
| `MessageProvider/index.tsx:143-158` (`/message/m/0?code=`) | Loads a code-import draft into the main editor with no gate at load. Save then goes through the choice dialog. | NO. |
| `WebhookProvider.tsx:111` | Loads an existing webhook message as `oldMessage` for edit. | Not examined past the load. |
| `f/[id]/page.tsx:583` and `message/page.tsx:363` | Host `NewMessageModal`. | Inherit the YES above. |

No separate "upload dialog" file exists. NewMessageModal is titled 'Create or upload a new message' (l.201).

## 4. The record

Handoff `agent-output/handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md` (read whole):
- Status Open. It describes the mechanism exactly as in section 1.
- Lines 13-17 and 78-82 leave the choice undecided between (i) floor the resolved draft like JsonModalBody and (ii) block Save outright as intended. It calls this "a product decision".
- The `Review-Trigger` front-matter (l.17-22) names BC-17 (`qa/closed/013-components-v2-editing-surfaces-qa.md:626,1146,1200`): "can Discord RETURN a message with both"; POST, owner/UAT-observed, and not discharged in the files I read.
- The Reconcile note (last paragraph) owes a test that fails if `onSubmit` submits the raw draft instead of `gate.data` (mutation H11 survived, `qa/closed/fix-website-save-gate-embeds-qa.md`). It applies when the choice path becomes reachable.

Owner ruling, `agent-output/steering/fixer-queue-2026-11-21-rulings.md`:
- l.58: H17 listed as held, needing his decision.
- l.80-81: Q2 options. A "settle the conflict the way the JSON tab already does, so Save works (Recommended)"; B keep Save off but say why; C don't change.
- l.104-105: answered A, "a fixer chain resolves the conflict the way the JSON tab does, so Save works."
- l.112: queue position 3 is `fix-import-save-conflict`.
- Ambiguity to flag: the JSON tab does not make Save work by itself. It withholds the draft (`setMessage(null)`) and asks the user to pick Classic or V2 (row E), and it silently settles rows A-D with a notice. The ruling text does not say which of those two behaviours it means for each row.

Plan 013 (`planning/closed/013-components-v2-editing-surfaces.md`):
- D17 (l.118, owner's verbatim): row E "THE USER IS OFFERED SAVE AS CLASSIC OR SAVE AS V2, TOLD THE OTHER WILL BE DROPPED". Principle: "FAIL GRACEFULLY WHEN NO CONTENT WILL BE LOST; IF CONTENT MUST BE LOST... BLOCK, NOTIFY AND PRESENT A CHOICE". This is the ruled behaviour for what to ask. Row D warns and saves as classic.
- D31 (l.132): on both JSON surfaces the conflict rests on the error notice plus a `Resolve` link, and the choice buttons are not the default.
- D14 (l.115): the create writer is NewMessageModal.
- Plan 014 l.254 records the same gap ("For the roadmap/owner at retrospective").
- `architecture/closed/013-...-findings.md:112-118` argues the persist gate should have one disposition function with multiple callers.
- `architecture/system-architecture.md:124` describes the gate. It says the JSON load surfaces "call `resolveContentLoss` directly".
- Chains 016 (`planning/closed/016-send-check-validity.md:168,569`) and the research `codebase-bug-evaluation-2026-11-08.md:185` explicitly left the handoff untouched ("its trigger does not fire").

No document found states the size of the real-world population. BC-17 is unanswered.

## 5. Covering tests (titles)

- `src/app/message/_components/__tests__/NewMessageModal.persist-gate-wiring.test.tsx`
  - Header (l.1-14): deliberately does NOT assert on a conflicting (row-E) draft, because mounting one shows the choice UI unreachable (the floor disables Save first), and asserting either direction "would pin a state nobody has decided is correct". It points to the handoff and to the rowE test.
  - Only case: `'a classic draft loaded via the JSON tab writes through Save'` (l.99). It drives the JSON tab, Continue, a name, then Save.
  - Its harness is reusable for a modal fix: the `mount`, `typeJson` and `typeIntoInput` helpers and the `buildApiMock` `onMutation` capture of `message.upsert`.
  - The bot, webhook and code tabs are not driven in this file. The handoff describes driving them via the `getFromCode` query data.
- `src/utils/__tests__/discordResponseToMessage.rowE-persist-gate.test.ts`: `the converter does NOT normalise...`, `that output trips the persist gate`, `each option names what it would drop...`, plus three controls (classic-only, V2-only, flagged classic = row D, none trip the gate).
- `src/app/message/_components/__tests__/NewMessageJsonInput.conflict-resting-state.test.tsx` (3 cases): `a conflicting edit rests on the dismissed-choice notice with a Resolve link, not the choice buttons`; `the Resolve link reopens the choice buttons (pendingChoice stays reachable)`; `V2 components beside an empty embed land as V2 with no choice`.
- `NewMessageJsonInput.settled-notice.test.tsx` (5 cases, row D notice).
- `NewMessageModal.failed-webhook-load.test.tsx` and `NewMessageModal.readable-mutation-error.test.tsx` (other modal behaviour).
- `JsonModalBody.conflict-resting-state`, `.choice-rewrites-editor`, `.load-floors-resolved-draft` (`a row D draft ... enables Load with no floor error shown`; `control: a genuinely empty draft leaves Load disabled...`).
- `SaveAsMenu.empty-embeds-beside-v2` (`Save writes at once, as V2 without the empty embed, and shows no choice`).
- `MessageProvider.save-step.test.tsx` (`the choice save of a stored V2 message with content`: Save as Classic / Save as Components V2).
- `utils.rowd-load-disposition.test.ts`, `utils.disposition-resolver.test.ts`, `utils.disposition-notices.test.ts`, `gateBeforePersist.thumbnail.test.ts`.
- No test covers the modal's choice dialog (`pendingChoice` branch) or `commitChoice`. No test covers SaveAsMenu's choice buttons either: `pendingSaveChoice` is exercised only in `MessageProvider.save-step`, `MessageProvider.own-save-notice` and `useApiMethods.json-editor-repair`. SaveAsMenu's choice path has no mounted test (grep over `__tests__` names only `SaveAsMenu.empty-embeds-beside-v2`, which covers the no-choice case).

## 6. Not covered

- Whether Discord can actually return V2 components plus content (BC-17). This is a production observation, not readable from code. The reachability is therefore from converter code only.
- Whether any stored production row is row E or D (server data not read).
- `useValidateWebhook.ts` was read only at l.50-80, and `WebhookProvider` only at l.95-135. The `NewMessageModal` rendering of l.200-400 (page 0 tabs, accordion layout) was not read in full, and neither was the `PresetDialog`/`Form` submit handling (handoff says `Form.tsx` skips `onSubmit` when `isDisabled`; I did not verify).
- `JsonModalBody` Load flow beyond l.82-100, 165-173, 280-288.
- The send page for any path that edits an existing webhook message (`oldMessage`) and the `EditMessageMenu`.
- `src/server/api/routers/message.ts` `upsert` server-side validity handling (messageValidity.ts uses `validateMessage`): not read, so I cannot say whether the server would refuse a row E payload.
- Working tree not examined (by instruction). Test pass/fail was not run.
