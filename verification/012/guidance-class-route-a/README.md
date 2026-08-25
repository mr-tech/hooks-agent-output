# Route A over the guidance's class — the re-derivation behind QA-R19's re-specification

**Built by**: qa (chain 012), 2026-08-25, under **D28** (QA-R19 routed back to QA to be
re-specified against D25's one-instruction guidance).
**Anchor**: `website` `a74b9e2` — the released chain-013 tree, which the deployed composer runs.

## The claim under test

QA-R19 as written asserts the guidance must be **shape-dependent over three shapes**, that cell B3
(V2 bit + `content` + type-1 components) has **no lossless path**, and that any one-line guidance is
therefore *"wrong for at least one shape whichever line it is"*. **D25 ships one instruction.**

The planner re-derived at rev 38 that chain 013 gave B3 a lossless path. That result was relayed to
QA, and **it is re-derived here by execution rather than accepted** — R19's own history is the
reason: QA's first wording of the row was wrong in two independent ways (F-QA11), so it is precisely
the row where a second relayed premise should not be taken on trust.

## What was executed

`route-a-class.test.ts` does **not** take the class from prose. It enumerates a cross product over
the dimensions the class allows (`content` × `embeds` × `components`, 8 combinations) and decides
each one's membership with the **shipped classifier** — `resolveContentLoss(...).row === 'D'` — then
runs Route A over every member exactly as the composer runs it, `applyModeSwitch('classic', draft)`,
which is what `handleModeSwitch` calls. Losslessness expectations are literal values, never computed
by calling the code under test.

**Result at the anchor: 17 assertions, 17 green.** The classifier splits the 8 into **6 members** and
2 non-members:

```
content+embed+actionrow      content+noembed+actionrow  <-- cell B3, shape (iii)
content+embed+nocomponents   content+noembed+nocomponents
nocontent+embed+actionrow    nocontent+embed+nocomponents
```

For **every one of the 6**: one switch to Classic clears only the V2 bit, leaves `content`, `embeds`
and `components` identical, leaves the record sendable (`validateMessage` returns `''`), and
triggers **no confirmation modal** (`hasV2Content` is false for every member by the class's own
definition, and that is what `handleModeSwitch` gates the modal on).

**So B3 has a lossless path at this tree, and the one-instruction form is correct over the whole
class.** R19's three-shape premise is dead — established here, not relayed.

## Every assertion observed failing

| Mutant | What it changes | What goes red |
|---|---|---|
| **N-A** | `switchToClassic`: the D11 flag-clearing line deleted | **all 6** members |
| **N-B** | `switchToClassic`: the type-1 filter inverted to drop everything | exactly the **3** members carrying an action row — losslessness is genuinely per-member, not a blanket pass |
| **N-C** | `switchToClassic`: the filter keeps **all** components | **only** the falsifier case below |

Green re-confirmed after each restore. Mutations were applied in a throwaway detached worktree; the
shared `website` tree was never modified.

## The row stays falsifiable — this is the part that matters

A re-specified R19 that merely asserted "the one instruction is lossless" would be a row that cannot
fail, since the class members are lossless by the class's own definition (no V2-typed component
means the type-1 filter drops nothing). The live edge is kept explicit:

**A class member carrying a top-level component that is neither type 1 nor V2-typed is silently
dropped by the switch.** The instrument executes this with a top-level type-3 select menu: the
classifier calls it row **D** — a genuine class member — and Route A discards its component while
keeping `content`. Such a record is outside `topLevelComponentShape` and so is unauthorable through
supported paths, which is why the guidance is safe in practice and not by construction. **That is
the distinction R19 must now carry**: the one instruction is lossless for every member the product
can produce, not for every member the class admits.

## Running it

Same procedure as `../scratch-subject-SCR1/README.md` — detached worktree at the anchor SHA,
`node_modules` symlinked, `SKIP_ENV_VALIDATION=1` and `DATABASE_URL` pinned to a dead port. Never
copy it into the shared tree.
