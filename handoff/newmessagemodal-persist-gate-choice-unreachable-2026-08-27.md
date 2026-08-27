---
UUID: 7f21ac93
Status: Open
Status-Detail: >-
  Discovered while converting a source-text test (`013-fqa19-ingress-gate-reachability.test.ts`,
  plan 014 M4c row 19) to a real mount. The old test asserted `onSubmit`'s gate-then-write ordering
  by reading `NewMessageModal.tsx`'s own source text; it never actually rendered the component or
  clicked a real button. Mounting it for real (`src/app/message/_components/__tests__/NewMessageModal.persist-gate-wiring.test.tsx`)
  shows the gated choice UI the old test's ROUTE 1/ROUTE 2 cases described is unreachable via the
  Save button today. This chain does not fix product code (D2); logged here instead.
Owning-Stage: >-
  Unassigned. Next step, if anyone picks this up: decide whether `NewMessageModal.tsx`'s
  `contentFloorError` (line ~126) should float the resolved draft the way `JsonModalBody.tsx`'s did
  after F-QA15 (`applyDisposition(loadedMessage)` instead of the raw `loadedMessage`), or whether
  blocking Save outright for a structurally-conflicting ingressed draft is the intended behaviour
  (there is currently no UI, other than the JSON tab's own internal resolver, offering the user a
  choice for a draft loaded via the bot/webhook/code tabs). Either way this is a product decision,
  not a test-cleanup one.
Review-Trigger: >-
  Re-read this if BC-17 (`agent-output/qa/closed/013-components-v2-editing-surfaces-qa.md`,
  "discord-returns-row-e") is ever discharged — i.e. if a real Discord message carrying both V2
  components and classic content is observed coming back through the import path — since that is
  exactly the shape this finding says the user cannot currently save through `NewMessageModal`. Also
  re-read if anyone proposes adding coverage for `NewMessageModal.onSubmit`'s `pendingChoice` branch.
---

# Handoff — `NewMessageModal`'s persist-gate choice UI is unreachable via its own Save button

**Raised:** 2026-08-27, by `implementer-hooks-014`, plan 014 M4c (row 19).

## What was found, and how

Plan 014 M4c converts `013-fqa19-ingress-gate-reachability.test.ts`'s source-text describe block
("the create writer is wired to the gate") to a real mount. That old block never rendered
`NewMessageModal` — it read the file's text and located `onSubmit`/`commitChoice`/`submitData`'s
source spans to check the gate-then-write ordering by string position. It could not, and did not,
verify that a real user could ever reach that ordering through the UI.

Mounting the component for real (a `QueryClient` + the established `~/utils/api` mock bundle,
driving `loadedMessage` via `api.message.getFromCode`'s query data since the real converter
(`discordResponseToMessage`, exercised directly by the retained logic-only coverage) is already
proven capable of producing a row-E shape) and pressing the real "Save" button shows:

- `NewMessageModal.tsx`'s `contentFloorError` (line ~126) is `validateContentRequirements(loadedMessage)`
  — computed over the **raw, unresolved** draft, unlike `JsonModalBody.tsx`'s post-F-QA15 form
  (`validateContentRequirements(applyDisposition(validatedDraft))`, `~/app/message/m/[id]/_components/JsonModalBody.tsx`
  line ~160).
- `resolveContentLoss`'s `requiresChoice` (which drives `gateBeforePersist().mustAsk`) is true
  exactly when the draft has both structural V2 components **and** classic content
  (`~/utils/index.ts`, `resolveContentLoss`'s row-E branch).
- `validateContentRequirements`'s `hasV2 = hasStructuralV2 || hasFlagV2` (`~/utils/limits.tsx`) is
  also true whenever structural V2 is present, so **every draft that trips `mustAsk` also trips
  `contentFloorError`** — and `disableSave` (`~/app/message/_components/NewMessageModal.tsx`
  line ~192) ORs in `!!contentFloorError`, so the "Save" `Button` and the `Form`'s submit handler
  are both disabled (`Form.tsx` checks `if (!isDisabled) void onSubmit(e)` before ever calling the
  passed handler).
- Observed directly: mounting `NewMessageModal` with a `loadedMessage` shaped
  `{content:'hi', flags:32768, embeds:[], components:[{type:17,components:[{type:10,content:'x'}]}]}`
  (a genuine row-E draft — the same shape the retained reachability tests prove
  `discordResponseToMessage` can produce) renders the text "Components V2 messages cannot contain
  embeds or content." and the Save button's `disabled` DOM property is `true` even after filling in
  a message name. Pressing it (a real `pointerdown`/`pointerup`/`click` sequence) fires no
  `upsertMessage.mutate` call and shows no "Are you sure?" choice UI. A control mount with a
  non-conflicting draft (`{content:'hi', flags:0, embeds:[], components:[]}`) enables Save and a
  press does write, confirming the harness itself is sound and the difference is the floor.

**So `onSubmit`'s `pendingChoice` branch (`NewMessageModal.tsx` line ~165) and `commitChoice`
(line ~172) are both live code, reachable by direct function call — the earlier finding this row's
old test cited (F-QA19, `agent-output/qa/closed/013-components-v2-editing-surfaces-qa.md` §6-7) is
still correct that the branch is not dead — but neither is reachable through the component's own
rendered UI today**, because the Save button that would call `onSubmit` is disabled first by the
unrelated, unwrapped floor check. A user who loads a message via the bot/webhook/code tabs (the
JSON tab has its own separate, already-working resolver in `NewMessageJsonInput.tsx`) and hits this
shape sees a permanent error and a disabled Save button, with no route to choose a disposition.

## Why this chain does not fix it

Plan 014 (Hooks test-suite cleanup) ruling D2: a bug found while converting a test is logged here,
not fixed in-chain. This is a product-code question — whether the fix is "wrap `contentFloorError`
in `applyDisposition` like `JsonModalBody` was" or "block Save outright is intended, since there is
no in-place JSON editor at this surface to let the user resolve the conflict manually" — outside
this chain's charter.

## What the test suite now covers, and what it does not

`NewMessageModal.persist-gate-wiring.test.tsx` keeps only what is honestly true of the shipped
component: a control case showing a non-conflicting draft writes through Save correctly. It does
**not** assert that a conflicting draft's choice UI opens (that would pin the current disabled
state as if it were the intended behaviour, which axiom D forbids as much as pinning the opposite
would) and does **not** assert `onSubmit`'s gate-then-write ordering or `commitChoice`'s
apply-then-write ordering via the UI, since neither is reachable that way. The disposition/gate
logic itself (`gateBeforePersist`, `resolveContentLoss`, the ingress converter's row-E
reachability) remains covered directly, unchanged, in
`discordResponseToMessage.rowE-persist-gate.test.ts`.

## Surface with no covering test

`NewMessageModal.onSubmit`'s `pendingChoice` branch and `commitChoice`'s apply-before-write
ordering have no behavioural coverage after this conversion (checked: `grep -rl NewMessageModal
src --include='*.test.ts*'` names only this file and the logic-only reachability file, neither of
which drives a conflicting draft through the real Save button to a real write). Recorded per plan
014 AC3 rather than silently dropped.
