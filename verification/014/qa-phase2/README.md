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

| `basename-predicate-check.py` | M5 step 2 instrument, plan rev 14: checks the CLAUDE.md **positive-form basename predicate in both directions** and reconciles the rev-14 module-anchor widening (`^[a-z]` → `^[A-Za-z]`) over the whole enumerated class rather than over the instances that revealed it. Run from the `website` repo root. |
| `basename-predicate-check-f2c85f5.txt` | Its output at `website` `f2c85f5` (source tree confirmed clean). **51 files; 13 newly admitted by the widening; 0 still rejected; 0 ID-token basenames.** |

## The rev-14 widening closes on its class, and both directions are controlled

Requested by `planner-hooks-014` at rev 14. Six controls, **all six fired as specified** — an
instrument is not evidence until it has been seen to answer correctly in both directions:

| Control basename | Must | Why |
|---|---|---|
| `JsonModalBody.load-settled-notice.test.tsx` | **admit** | PascalCase MODULE segment — the widening itself |
| `messageValidity.predicate.test.ts` | **admit** | camelCase module — admitted before and after |
| `JsonModalBody.LoadSettledNotice.test.tsx` | **reject** | PascalCase BEHAVIOUR segment — that anchor stays `^[a-z]` |
| `JsonModalBody.test.tsx` | **reject** | no behaviour segment at all |
| `json-modal-body.load-settled-notice.test.js` | **reject** | wrong extension |
| `012-message-mode.test.ts` | **reject** | leading digits, not a letter anchor |

**Reconciliation, not agreement:** the widening newly admits exactly **13** files, matching the
planner's independently stated count, and leaves **0** files rejected — so the corrected predicate
covers the class, not merely the members that exposed it.

## Scope of this instrument, stated so its 0s are not over-read

It walks **basenames only**. The CLAUDE.md negative form is defined over **three** domains —
basenames, `describe`/`it`/`test` title strings, and comment lines — and this instrument's limb 3
covers one of them. `verification/014/m5-sweep/naming-predicate.js` (the implementer's) covers all
three and is the instrument of record for M5 step 2; the two agree at `f2c85f5` (51 files, 0
positive-form failures, 0 negative-form hits).

Its limb-3 regex is also **deliberately broader than the spec** and is not the authority: it uses
`\b[0-9]{3}\b` where CLAUDE.md says a bare three-digit **`0NN`**. No false positive materialised
(limb 3 = 0), but a count from it would over-flag; take ID-token counts from the M5 sweep.

## Finding against the M5 sweep — the `escaped:` exemption is installed where it cannot fire

`naming-predicate.js` applies its `// escaped:` provenance exemption in the **basename** domain
(`!/\/\/\s*escaped:/.test(base)`), where it can never match — a filename cannot contain `// escaped:`
— and **omits it from the comment domain**, where CLAUDE.md requires it ("must match **zero** lines
outside a `// escaped:` provenance line").

Tested, not read. A legitimate provenance line —
`// escaped: agent-output/handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`
— satisfies the comment branch's `isCommentLine`, matches `ID_TOKEN` on `2026-08-26`, and reaches
no exemption: it would be reported as a negative-form violation.

**Why today's `0` hides it.** The suite currently contains no `// escaped:` line, so the exemption
has never been exercised in either direction. This is a missing **positive control**: the sweep has
never been shown to *permit* the one class the convention explicitly exempts, and axiom (B) exists
precisely to create that class. The first escaped-provenance test added will be flagged as a
violation by an instrument reporting `0`.

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
