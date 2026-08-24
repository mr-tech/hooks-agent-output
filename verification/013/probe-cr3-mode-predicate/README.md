# `probe-cr3-mode-predicate/` — settles M7 by execution over the mode-decision input class

**Settles**: what M7 actually changed. The milestone rewrites the predicate that decides which mode
the composer opens in and whether the V2 patch warning shows, so the claim "mode now follows the
flag" is a claim about a *classification function over a partition*, and only running both trees
over that partition can say which cells moved and whether any moved that should not have.

Authored by `code-reviewer-hooks-013` for the M7 review at `18407d8`. Like CR1 and CR2 it is **not**
an acceptance spec and does not belong in `website`'s suite: it holds two trees' behaviour side by
side and asserts properties about the *pair*.

## What process produces the evidence

The product's own functions, on the new side, with **no transcription at all**: `isMessageV2`,
`detectMessageMode`, `showV2PatchWarning` and `applyModeSwitch` are imported from the tree under
test through a namespace import (a missing named export is a link-time error; a missing namespace
member is just `undefined`, so one instrument runs against every tree).

**The old side is a MODEL, and is declared as one.** `detectMode` at `495463a` is declared inside
`useValue()` in a React provider and is not importable. What the probe reconstructs is its *guard*
— two lines quoted verbatim from `git show 495463a:src/providers/MessageProvider/index.tsx` — while
`hasV2Components`, the function that actually decides, is the real one imported from the tree under
test. The same applies to `send/page.tsx`'s inline `messageHasV2`. This asymmetry is the honest
statement of the instrument: the new side is a probe, the old side is a two-line model of a guard.

**Oracle for M7-a's "same predicate" clause.** M7-a requires the mode predicate to agree with
`validateContentRequirements`'s internal `hasV2` on every record. That variable is not exported, so
the probe reads it through the product's own behaviour: given content, `validateContentRequirements`
emits *"Components V2 messages cannot contain embeds or content."* **iff** its `hasV2` is true. The
comparison is therefore product-against-product, not product-against-model.

**Expectation independence.** Each row's expected classification is computed from the fixture's own
`flags`/`components` (`flagSet || structuralV2`), never by calling the predicate under test.

## The input class

36 rows: 6 flag states × 6 component shapes.

- **flags**: absent · `0` · V2 bit · V2 bit + `SUPPRESS_NOTIFICATIONS` · `SUPPRESS_EMBEDS` alone ·
  `SUPPRESS_NOTIFICATIONS` alone (D7's residue on both sides of the bit)
- **components**: absent · `[]` · Action-Rows-only (D12 / OQ-7's shape) · a V2 leaf (type 10) ·
  a V2 container (type 17) · Action Row + V2 container

All four quadrants of (flag × structure) are populated, and `CTRL-2` asserts that rather than
assuming it: `TT=6 TF=6 FT=12 FF=12`.

## Running

```bash
cd /usr/local/bin/hooks/website
PROBE_SRC=/tmp/013-18407d8/src PROBE_LABEL=18407d8 \
  PROBE_OUT=<this dir>/run-cr3-18407d8.txt \
  npx vitest run --config <this dir>/vitest.cr3.config.ts
```

`PROBE_SRC` selects the tree, materialised without touching the shared repo:
`git -C website archive <sha> | tar -x -C /tmp/013-<sha>`, then symlink `website/node_modules` in.

## Captured runs

| File | Tree | Result |
|---|---|---|
| `run-cr3-18407d8.txt` | `18407d8` (M7) | **122/122 passed** |
| `run-cr3-495463a.txt` | `495463a` (pre-M7) | 11 failed — 6 in section A (the predicate disagrees with `validateContentRequirements` on every flag-only row) and 5 in section D (`switchToV2` does not set the bit; OQ-7's misreport is live) |
| `run-cr3-mutant-isv2.txt` | `18407d8`, flag disjunct deleted from `isMessageV2` | 14 failed |
| `run-cr3-mutant-switchv2.txt` | `18407d8`, `switchToV2` stops ORing the bit | 5 failed |
| `run-cr3-mutant-apply.txt` | `18407d8`, `applyModeSwitch`'s ternary inverted | 11 failed |

All three mutants are killed, so a green matrix here is distinguishable from an instrument that
imported nothing.

## What the runs establish

**1. Exactly 12 of 36 mode cells changed, in two classes, not one.**

- **6 cells the flag decides** — `R2x` and `R3x`, the V2 bit set with no V2 components. Four flip
  `classic → v2` (the D15/D12 class M7 exists for) and two go `null → v2`.
- **6 cells where a mode is now WRITTEN where the pre-M7 guard wrote none.** Of these, **four have
  nothing to do with the flag** (`R00`, `R10`, `R40`, `R50` → `classic`): the old guard
  `if (msg?.data?.components)` skipped *every* message with no `components` key, so an ordinary
  classic message previously left whatever mode was standing and now actively sets Classic. M7-a's
  *"and Classic otherwise"* requires this and the implementation is correct — but the class is
  wider than either the plan's R8 row or the implementation document describes, and reading the
  diff does not surface its extent. See the review's MEDIUM-1.

**2. No cell moves in the unsafe direction.** No row that classified as `v2` becomes `classic`, and
after M7 no row is left with no mode written at all (research G4's gap is closed for the whole
partition, not only for flag-carrying records).

**3. The patch warning only ever grows.** Six cells change `false → true`, all of them flag-set; no
cell changes `true → false`. A message that warned before still warns. Both suppressing conjuncts
(`showEdit`, `oldMessage`) still suppress on every row.

**4. `applyModeSwitch` — the plan's named M7-b instrument — behaves over the D7 residue.** Section D
drives the toggle through `applyModeSwitch` rather than through `switchToV2`/`switchToClassic`
directly, over four unrelated-bit combinations in both directions plus a round trip. Bits are
preserved exactly, Action Rows survive the outbound leg, and the round trip restores the original
`flags` value.

**5. 5712's lossless exit is now reachable without the destructive leg** (section E). Pre-M7 the
record opened in Classic, so reaching the flag-clearing toggle required going *to* V2 first, and
that outbound leg unconditionally cleared `content`. After M7 it opens in V2 and one toggle to
Classic clears the bit with the content intact. This is R8's "one-click lossless exit", executed.

## What the probe does NOT cover

- **The browser.** That `MessageProvider` calls `detectMode` at each of its load paths, and that
  `send/page.tsx` renders the warning, is established by reading the diff — the repo has no browser
  harness (plan assumption 5). The probe proves the predicate; it cannot prove the wiring.
- **Production incidence.** No database access. How many stored rows are in the six changed cells
  is not derivable here; R8's population is the owner's classifier's to report.
- **The old side beyond its guard.** The pre-M7 model reproduces `detectMode`'s condition, not the
  provider's call sites. If a load path did not call `detectMode` at all, the probe cannot see it.

## `mutation-check/`

Runs the **implementer's own** M7 spec — and the two pre-existing 012 specs the plan predicted M7
would turn red — against an arbitrary tree, to ask whether each spec notices a reverted change.

| File | Result |
|---|---|
| `run-implementer-specs-18407d8.txt` | 57/58 — the one failure is `012-message-mode.test.ts`'s pre-D16 `flags` assertion, which the plan predicts by name |
| `run-implementer-specs-mut-isv2.txt` | 6 failed — killed |
| `run-implementer-specs-mut-switchv2.txt` | 3 failed — killed by the M7 spec's own three M7-b cases |
| `run-implementer-specs-mut-apply.txt` | 3 failed — killed **only** by `012-message-mode.test.ts`; the M7 spec survives an inverted `applyModeSwitch` entirely |
| `run-m7spec-vs-495463a.txt` | the M7 spec against the pre-M7 tree: **15 of 16 red**, one green (the unchanged `switchToClassic` case). Verifies the TDD table's red claim independently — and finds it names 14 |

`012-send-gate-partition.test.ts` fails on **no** mutant, in any run. It defines its own local
`switchToV2`/`switchToClassic` and cannot detect a `messageMode.ts` change at all. See the review's
MEDIUM-2.
