# probe-qa-p3-fixverify — independent verification of the F-QA15 fix

**Stage**: QA refresh pass, plan 013. **Tree under verification**: chain tip `164d720`
(fix at `53beb37`). **Prior verdict this refreshes**: QA FAILED at `4e9da96`.

QA's own instrument, not the implementer's. It asks the two questions a one-line gate change raises.

## 1. Is the defect closed?

Yes. All 8 row-D members now load, the repair is lossless, and record 5712 completes end to end.

## 2. Does the fix over-permit? — the question that actually needed asking

Flooring the **resolved** draft means `applyDisposition` rewrites the object the floor then judges.
That is exactly how a gate fix turns into a gate hole: if the resolution manufactured a body, the
floor would pass vacuously and empty messages would sail through. Five negative controls (block C):
the empty object, explicit empty collections, whitespace-only content, a flag-only draft, and a
flag-only draft with empty collections — **all still refused**. Mutant **F2** (floor branch 2
disabled) kills exactly those five, so they are load-bearing rather than decorative.

## 3. Two behaviours established by execution, recorded because they are easy to get wrong

**Bit preservation** (`trace-bit-preservation.txt`):

```
flag only              : in=32768  out=0   bitCleared=true  equalsZero=true
flag|SUPPRESS_EMBEDS(4): in=32772  out=4   bitCleared=true  equalsZero=false
flag|EPHEMERAL(64)     : in=32832  out=64  bitCleared=true  equalsZero=false
```

`applyDisposition` clears the V2 bit **and preserves other bits** — correct. This matters because
the implementer's own spec asserts `expect(x.flags as number & 32768).toBe(0)`, which is a
**TypeScript type assertion, not a bitwise AND**: it means `flags === 0`. It passes only because
both of its uses pick inputs with no other bits, and it would fail on the correct behaviour above.
Recorded as **F-QA21**.

**The B3 class** (`trace-b3-class.txt`) — flag + classic content + a non-V2 Action Row:

```
ROW=D  requiresChoice=false  mode=classic
RESOLVED: content 'Hi' kept, Action Row kept (1 component), flags 0
```

Plan **012 recorded that this class has NO lossless path** — *"neither instruction is safe alone"*.
**013 makes the editor path lossless for it.** That supersedes 012's R19 consequence and changes
which instruction is safer to send. Enacted in the re-anchored `012-json-editor-repair-path.test.ts`.

## 4. A defect in this instrument's own first draft, recorded rather than quietly fixed

The first version transcribed the gate into a `loadDisabled` helper. Reverting the fix in the
component then left **39 of 40 assertions green** — the model kept computing the fixed behaviour,
and only one source-text assertion noticed. A model that survives the defect it models is not
evidence.

Fixed by **coupling the model to source at module scope**: the exact floor and gate expressions are
required to be present in `JsonModalBody.tsx`, and if they are not, every test in the file throws.
Re-run of mutant **F1** after the fix: the whole suite fails, as it should.

| Mutant | Change | Result |
|---|---|---|
| **F1** | revert the fix — floor the unresolved draft again | **KILLED** (whole suite errors on the coupling guard) |
| **F2** | floor branch 2 disabled — "must have content/embeds/components" never fires | **KILLED** — exactly the 5 over-permission controls |

## Residue — stated, and owned elsewhere

This does **not** mount the component. Under owner ruling **D28** no DOM harness is added to this
chain and the mounted observation is folded into the owner's own BC-11b browser sitting.

**Falsity signature**: *an operator opens 5712's JSON, presses Load, and the button is still inert
although the gate computes `false`.*

## Reproduce

```sh
cp 013-qa-p3-fixverify.test.ts <tree>/src/utils/__tests__/
DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' npx vitest run \
  src/utils/__tests__/zz-qa-p3-fixverify.test.ts
```
