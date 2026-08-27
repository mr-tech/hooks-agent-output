# `verification/014/qa-phase2/` — QA Phase 2 instruments, plan 014

Written by `qa-hooks-014-2`. Sibling to `qa-phase1/`, same rule: instruments QA built to
discriminate a finding or compute a number a verdict rests on, captured so the next reader can
re-run them rather than inherit the claim. Nothing here is a test of the product.

**Phase 2 is not open.** M5 has not started and Phase 2 reads its captures. Nothing here carries a
`Verified-At` or implies a PASS.

## Contents

| Path | What it is |
|---|---|
| `delegate-throw-probe.test.ts` | Probe for the delegation carve-out's limb (i), plan rev 12. Answers, per payload, whether `validateMessage` **throws** or **returns** — the only way to tell whether `isMessageValid`'s `catch` clause is the sole carrier of a case's decision. **Temporary by design**: it was run from inside `website/src/utils/__tests__/` (where the framework already reaches the code) and removed after capture; the website tree carries no residue. To re-run, copy it back to that directory and `npx vitest run` it. |
| `delegate-throw-probe-34140d3.txt` | That probe's output at `website` `34140d3`. |

## Why the probe writes to a file instead of logging

`console.log` from inside a case is **suppressed** by this suite's reporter configuration — the run
reports `1 passed` and prints nothing. A probe that reports by logging silently returns no data here
and reads as if it had nothing to say. It writes its lines with `writeFileSync` instead.

## Controls

The probe carries two positive controls in the same run, and both fired:

- `content: 'Hi'` → delegate `RETURNED ""`, `isMessageValid` `true`
- `data({})` → delegate `RETURNED "Message must have content, embeds, or components."`, `isMessageValid` `false`

So "the delegate did not throw" is distinguishable from "the probe did not execute". Without these a
row reading `RETURNED …` would be indistinguishable from a broken rig.

## Result, and the one case it corrects

Of the three cases `messageValidity.predicate.test.ts` groups under *"non-conformant stored data is
not swallowed as true"*, **two** exercise the `catch` clause and one does not:

| Case | Delegate | Exercises `catch`? |
|---|---|---|
| `content: 5` | THREW `TypeError: content.trim is not a function` | **yes** |
| `components: null` | THREW `TypeError: Cannot read properties of null (reading 'length')` | **yes** |
| `embeds: {}` | RETURNED `"Message must have content, embeds, or components."` | **no — ordinary delegation** |

Limb (i) therefore **holds** for row 15: literal-expectation cases exist over members the delegate
cannot produce. But that case's title — *"non-array embeds computes false rather than throwing
out"* — misdescribes the mechanism: nothing throws on that input.

**The hazard is a future "simplify" pass.** The three cases look interchangeable from their titles.
Keeping only `embeds: {}` and deleting its two siblings would leave the `catch` clause with no
coverage at all, and every title would still read as though it were covered. This is the same shape
as the `hashMessage` L67 caveat recorded in the Phase 1 document — a vacuous sibling sitting beside
the cases that carry the decision.
