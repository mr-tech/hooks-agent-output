# probe-qa-bc4-json-tab-fixture — does BC-4 have an executable fixture?

**Stage**: QA, plan 013 (successor pass to `qa-hooks-013-3`). **Tree under verification**:
`b56570d` on `chain/013-rider-2`, working tree clean at run time (`git status --short` empty).
**Verdict this affects**: none. No production code and no shipped spec was touched; the QA verdict
`Verified-At: b56570d` / `Criteria-At: plan 013 rev 49` is unchanged by this instrument.

## The question

**BC-4** — *"M3-c: an import failing the floor keeps the dialog open with the error and does not
navigate"*, predicted value *dialog stays · error shown · no new message created* — sat
`NOT EXECUTED` all chain on the belief that "import" meant **by Discord message link**, which no
agent on this box may fetch. A peer session reported that belief false: the New Message dialog has
a **JSON paste tab**, and the floor is computed over the merged `loadedMessage` regardless of which
tab produced it. This is QA's own instrument for that claim, built from the source rather than from
the peer's report.

## Verdict — the fixture HOLDS

Paste `{"content": ""}` into the dialog's **JSON** tab. Executed, all three limbs:

| Limb | How it is established | Result |
|---|---|---|
| the paste is *accepted as a load* | `discordMessageImportShape.parse` does not throw; `resolveContentLoss` returns **row A, `requiresChoice: false`**, so no V2 choice dialog intercepts; `applyDisposition` hands a message to the modal | **A1–A3** |
| **error shown** | the real `NewMessageModal` function, rendered with that message, emits `Message must have content, embeds, or components.` | **D1** |
| **nothing created** | `Save` renders `isDisabled: true` and `Form` renders `isDisabled: true`; a floor-**passing** document flips both to `false` in the same state, so the floor is the sole carrier | **D2, D2b** |
| **dialog stays / no navigation** | `router.push` and `message.upsert.mutate` spies register zero calls; navigation exists only inside the mutation's `onSuccess` | **D3**, with **D4** observing the same spies *fire* so their silence is evidence |

## The trap this instrument exists to prevent — `{}` MUST NOT be used

`{}` fails the same floor (**C1**) and therefore looks like an equally good fixture. It is not one,
and a run that uses it reports a green row over a check that never executed.

`NewMessageJsonInput` seeds its editor with `JSON.stringify({}, null, 2)` and parses inside
`useUpdateEffect`, which **skips the first render**. **C2** establishes the skip by executing
react-use's shipped `useUpdateEffect.js` and `useFirstMountState.js` as CommonJS against a stub
`react` — 0 calls after the mount pass, 1 after the next — rather than citing its documentation.
So an operator who opens the tab and changes nothing never calls `setMessage`; `loadedMessage`
stays `undefined`; and the modal's floor line short-circuits on its `loadedMessage ?` ternary.
`contentFloorError` is then `undefined` **because the check did not run**, not because the document
passed.

**C3** names the distinguishing screen: with `{}` left in place there is **no error text and a
disabled `Continue`**. That is not BC-4's predicted value, and an operator who sees it should
record the row as *not executed*, never as failed and never as passed.

## Two behaviours recorded because the operator text depends on them

**1. The floor error does not follow `Continue`.** `Continue` is gated only by
`!loadedMessage || isDisabled` — **not** by the floor — so a floor-failing document advances. The
error node lives inside the page-0 `Transition`; **D1b** renders page 2 and finds no floor message
there, while **D(observed)** finds `Continue` enabled and `Save` disabled with nothing on the page
saying why. *An operator who presses `Continue` first will see a greyed-out `Save` and no
explanation, and is likely to report BC-4 FAILED.* The error must be read on the first page, below
the JSON box.

**2. `onSubmit` carries no floor check of its own.** **D4** invokes the rendered `Form`'s
`onSubmit` directly on the floor-failing document and `upsert` is called. The "nothing created"
limb therefore has exactly two carriers — `Form.isDisabled` and `Button.isDisabled`, both fed by
`disableSave` — and no third in depth. Recorded as a property of the shipped code, not as a
finding: neither carrier can be reached by an operator while the floor is failing.

## Mutants — every assertion above was observed red

| Mutant (`QA_BC4_MUTANT=`) | Change | Result |
|---|---|---|
| `floor-off` | `validateContentRequirements` always returns `undefined` | **KILLED** — 7 failures, including **D1** (error shown) and **D2/D2b** (Save disabled). The render harness is therefore reading the floor's real output, not a constant |
| `choice-on` | `resolveContentLoss` always `requiresChoice` | **KILLED** — 14 failures. Confirms A2 is load-bearing: were a choice dialog to intercept the paste, nothing would reach the modal and no floor error would appear |

Green run: **28 passed**. Captures: `run-green.txt`, `run-mutant-floor-off.txt`,
`run-mutant-choice-on.txt`. `manifest-sha256.txt` fixes the instrument and the six source files it
is coupled to.

## D28 compliance

No jsdom, no happy-dom, no `@testing-library/react`, no change to `vitest.config.ts`. React
function components are called as the plain functions they are and the returned element objects are
inspected. This is not a mounted render.

## What this cannot establish — and why BC-4 keeps a human subject

It does not exercise **CodeMirror**. `next/dynamic` is stubbed, so the act of typing the fixture
into the editor and that reaching `setJsonMessageString` is untested here; that is the operator's
half. It says nothing about what Discord accepts (out of scope, ruling **D36**).

**Falsity signature**: an operator pastes `{"content": ""}` into the JSON tab, and either no error
appears below the box, or the dialog closes, or a message is created. Any of the three refutes the
verdict above.

## Reproduce

```sh
cp 013-qa-bc4-json-tab-fixture.test.ts <tree>/src/utils/__tests__/zz-qa-bc4-json-tab-fixture.test.ts
DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' npx vitest run \
  src/utils/__tests__/zz-qa-bc4-json-tab-fixture.test.ts                 # green, 28
QA_BC4_MUTANT=floor-off DATABASE_URL='…' npx vitest run …                # 7 failed
QA_BC4_MUTANT=choice-on DATABASE_URL='…' npx vitest run …                # 14 failed
rm <tree>/src/utils/__tests__/zz-qa-bc4-json-tab-fixture.test.ts         # shared tree — remove the copy
```
