# CR round 2 — `applyModeSwitch` extraction: behaviour preservation established by execution

**Built by**: code-reviewer, 2026-08-23, re-review of website `681c353`.
**Claim under test**: the fix round's extraction of `applyModeSwitch` out of
`DiscordMessageEditor`'s `switchMode` is a pure refactor.

A behaviour-preservation claim is not settled by reading the diff or by the shipped delegation
tests — `012-message-mode.test.ts`'s new cases assert
`applyModeSwitch('v2', prev)` **equals** `switchToV2(prev)`, and `applyModeSwitch` is *defined* as
that call, so those assertions cannot fail under any defect in either branch function. They
discriminate exactly one thing: an inverted ternary.

## Instrument

`differential.ts` — run from inside `website/src/scripts/` under
`ts-node --transpile-only -r tsconfig-paths/register`, then removed. It writes out **two
independent dispatchers**:

- `oldDispatch`, transcribed from `bc5ee2b`'s `switchMode` (`if (targetMode === 'v2') …`)
- the shipped `applyModeSwitch` from `~/utils/messageMode`

and compares them over a seeded randomized corpus of 5,000 `(targetMode, draft)` pairs. Drafts vary
`content` (empty / text / whitespace-only / long), `embeds`, 0–4 `components` drawn from all eight
type values (1, 9, 10, 11, 12, 13, 14, 17), and `flags` across `0`, `4`, `IS_COMPONENTS_V2_FLAG`,
and `IS_COMPONENTS_V2_FLAG | 4`. The seed is a fixed literal — `Date.now()`/`Math.random()` would
make the run unreproducible.

**Positive control**: `invertedDispatch`, the same dispatcher with its branches swapped, is run
over the identical corpus. A differential that cannot flag the inverted dispatcher proves nothing
about the real one.

## Result

    corpus=5000 subject_diffs=0 control_diffs=4947
    RESULT: equivalent, control live

Zero divergence between `bc5ee2b`'s dispatch and `681c353`'s over 5,000 cases; the control fired on
4,947 of them (the other 53 are inputs on which both branches coincide — no components, no flag).
**The extraction is behaviour-preserving, by execution.**

This settles the *data effect*. It does **not** settle the wiring: no instrument here or in the
suite establishes that `handleModeSwitch` calls `applyModeSwitch` with the correct `targetMode`.
See finding M2 in the round-2 review.
