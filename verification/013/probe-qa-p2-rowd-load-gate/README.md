# probe-qa-p2-rowd-load-gate — F-QA15

**Stage**: QA Phase 2, plan 013. **Tree under verification**: chain tip `4e9da96`.
**Regression baseline**: `c85945f`.

## The finding this instrument settles

At the tip, the **Message JSON modal's Load button is gated on a content floor computed over the
UNRESOLVED parsed draft**. Every member of disposition **row D** (V2 flag set + classic content +
**no** V2 components) therefore leaves Load permanently disabled.

```
JsonModalBody.tsx  parse effect   setValidatedDraft(parsed)          <- unresolved
JsonModalBody.tsx                 contentFloorError = validateContentRequirements(validatedDraft)
JsonModalBody.tsx  Load button    isDisabled={!validatedDraft || !!contentFloorError}
limits.tsx         floor          hasV2 = hasStructuralV2 || hasFlagV2
                                  if (hasV2 && hasContent) return 'Components V2 messages
                                                                  cannot contain embeds or content.'
```

Row D membership is *exactly* `hasFlagV2 && hasContent && !hasStructuralV2`, and the floor's first
rule fires on `hasFlagV2 && hasContent`. **Row D is a subset of the floor's refusal set**, so the
refusal is total over the row — not an edge case within it.

**Operator consequence.** M2-a names the Load as the repair path for the flag-conflict records
(5712 / 5842): open JSON, press Load with zero edits, save. That path is closed. The
`warn-v2-flag-conflict` notice is unreachable from this surface.

## Why this is a 013 regression, not a pre-existing condition

`validateContentRequirements` is **byte-identical at base and tip** — the floor did not change.
What changed is that 013 **wired it into the Load gate**. Reproduce:

```sh
git show c85945f:src/utils/limits.tsx > /tmp/base-limits.tsx     # write to a file, then read it
git show 4e9da96:src/utils/limits.tsx > /tmp/tip-limits.tsx      # (see "instrument note" below)
diff <(sed -n '/^export function validateContentRequirements/,/^}/p' /tmp/base-limits.tsx) \
     <(sed -n '/^export function validateContentRequirements/,/^}/p' /tmp/tip-limits.tsx)

git show c85945f:'src/app/message/m/[id]/_components/JsonModalBody.tsx' > /tmp/base-jmb.tsx
grep -n 'isDisabled' /tmp/base-jmb.tsx
#   157:  isDisabled={!!error || !isValid}      <- NO floor term
grep -n 'setIsValid' /tmp/base-jmb.tsx         # isValid == "parses under discordMessageImportShape"
```

At base, `isValid` meant only *"the JSON parses under the import shape"*. A row-D object parses
cleanly, so **base enabled Load for row D** and `enforceImportMutualExclusivity` in `onConfirm`
resolved the conflict on the way through. The repair worked at base and does not work at the tip.

**Instrument note.** The base/tip comparison MUST be taken by redirecting `git show` to a file and
reading that. An anchored regex applied to the filtered stream (`git show … | sed -n '/x/,/^}/p'`)
returned a **false absence** here during this pass and led me to state, wrongly, that
`validateContentRequirements` did not exist at base. That is the documented RTK positional-predicate
hazard, and the correction is recorded rather than quietly dropped.

## What the probe executes (29 assertions, all green at `4e9da96`)

| Block | Asserts |
|---|---|
| **A** (2) | The modelled gate **is** the shipped gate — gate text, and that no `applyDisposition` sits between the parse and the floor. Drift breaks the probe first. |
| **B** (16) | **Row D as a class, 8 members**: content-only (the plan's own M8-D member / 5712 shape), embeds-only, content+embeds, each ± a non-V2 action row, whitespace-padded content, flag OR-ed with `SUPPRESS_EMBEDS`, flag OR-ed with `EPHEMERAL`. Each member is asserted to *be* row D (`requiresChoice === false`) **and** to be refused, with the exact message keyed on. |
| **C** (6) | **Discriminating controls in both directions** — rows A, B, C and classic+action-row all **permit**; plus both conjuncts isolated (drop the flag, same body loads; keep the flag, empty the body, it loads). |
| **D** (1) | The tip gate names `contentFloorError` and no longer carries the base gate expression. |
| **E** (4) | **The real production record, end to end through the shipped pipeline.** `STORED_5712_FULL` copied verbatim from `012-json-editor-repair-path.test.ts`, run through `jsonModalSeed` → parse → `resolveContentLoss` → floor. |

Without block C the verdict "disabled" would be equally consistent with a floor that refuses
everything, and the probe would prove nothing.

### Block E is the one that makes this a defect report rather than a source reading

Executed values for record **5712**, the record the plan itself names as the repair's subject:

```
SEEDED_FLAGS = 32768                  <- jsonModalSeed CARRIES the flag into the textarea
SEEDED       = {"username":"MOTM","flags":32768,"content":"Complimenti {{user}} …",
                "embeds":[],"components":[]}
ROW          = requiresChoice=false  mode=classic  noticeClass=warn-v2-flag-conflict
FLOOR        = "Components V2 messages cannot contain embeds or content."
LOAD_DISABLED = true
```

**The disposition engine computes exactly the right repair** — row D, classic mode, the
`warn-v2-flag-conflict` notice — **and the gate then refuses to let the user apply it.** Everything
013 built for this record works; the button is disabled in front of it.

Note the first line independently: 012's spec asserts *"the flag never reaches the textarea in the
first place"*. Under **D18** (which retired `stripKeys`' deletion), it now does. That assertion is
**substantively false at the tip**, not merely broken by the `standardizeMessage` removal — a
re-anchoring of that file must not simply restore it.

## Mutation evidence — the probe has been observed failing

| Mutant | Change | Result |
|---|---|---|
| **R1** | `isDisabled={!validatedDraft}` — gate stops consulting the floor | **KILLED** — 1 failed / 24 passed (`run-mutant-R1.txt`) |
| **R2** | `hasV2 = hasStructuralV2` — floor drops the flag conjunct (models the **wrong** fix: weakening the floor globally) | **KILLED** — 11 failed / 18 passed (`run-mutant-R2.txt`): all 8 row-D members, both conjunct-isolation fixtures, and block E's defect assertion |
| **R3** | `validateContentRequirements(applyDisposition(validatedDraft))` — models the **correct** fix: floor the *resolved* draft | **KILLED** — 1 failed / 28 passed (`run-mutant-R3.txt`), on block A's "floor is computed over the UNRESOLVED draft" assertion |

R3 matters as much as the kills: it confirms the probe **notices the repair**, so whoever fixes this
has an instrument that flips rather than one that stays green either way. R2 is the more informative
of the two failure-modelling mutants: it shows the probe would **also** reject a repair that fixes row D
by making the floor stop seeing the flag, which would silently re-permit genuinely invalid saves.
The repair this probe endorses is to floor the **resolved** draft (`applyDisposition` first), not to
weaken the floor.

Tree restored and verified byte-identical after each mutant (`diff -q`).

## Residue this instrument does NOT settle

It executes the floor and asserts the gate expression as source text. It does **not** observe React
applying `isDisabled` to the rendered button, because **no DOM harness exists at this tree**
(`@testing-library/react`, `jsdom`, `happy-dom`, `@vitejs/plugin-react` all absent; vitest
`environment: 'node'`; `include: ['src/**/*.test.ts']`, so a `.tsx` spec is not collected).
Installing them mutates a shared `node_modules` and `package.json` — gated, and not QA's to do.

That residue is **identical** to the one `probe-qa-p2-med6-loadgate` states for MED-6, and it is
routed to the blocking-condition register, not absorbed here.

## Reproduce

```sh
cp 013-qa-p2-rowd-load-gate.test.ts <tree>/src/utils/__tests__/
DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' npx vitest run \
  src/utils/__tests__/zz-qa-p2-rowd-load-gate.test.ts
```

`vi.mock('~/env.mjs', …)` at the head of the spec is required — `~/utils` pulls `~/constants` which
pulls `env.mjs`, and env validation throws in a bare test process.
