# Baseline: the expected six

**Owner:** code-reviewer-hooks-013. **Built:** 2026-08-24, unprompted, after steering (D25 round)
made the reviewer's per-round "still the expected six" check the standing mitigation for the
five milestones M2/M3/M4/M6/M8 during which the suite cannot be green.

## What this is for

The suite does not return to green until QA re-anchors `012-message-mode.test.ts` at Phase 2.
Until then every milestone review must establish that the reds are *the same reds*. Before this
directory that baseline existed only as sentences in the code-review document, so each round
compared against the reviewer's prose. **A number reproducible only by rebuilding the instrument is
prose.** This makes the comparison mechanical.

## Use

```
./check-expected-six.sh <sha>      # exit 0 = MATCH, exit 2 = DIVERGED
```

Pinned baseline: `expected-six.json`, six failures by `file :: fullName :: first line of reason`,
captured at `92ce026`. Full evidence: `suite-92ce026.json`.

**Totals are deliberately NOT pinned.** They grow every milestone (443 at `18407d8`, 462 at
`92ce026`). Only the failure *set* is stable, so only the set is the oracle.

## The contamination hazard this exists to defeat

`website/` is a shared working tree. Other sessions leave untracked test files in it, and **vitest
collects them**. A suite run in the working tree is therefore not the commit's result. The script
runs against `git archive <sha>` into a scratch dir with `node_modules` symlinked, never the
working tree.

Measured twice on plan 013, same signature both times — `+7 total, +7 passed, +0 failed`:

| round | reported (working tree) | clean extraction | cause |
|---|---|---|---|
| M7 `18407d8` | 450/444/6 | **443/437/6** | `013-qa-phase1-seed-route-probe.test.ts`, 7 tests, untracked, `qa-hooks-013`'s WIP |
| M8-EC3 `92ce026` | 469/463/6 | **462/456/6** | same file, still untracked |

Both times the *conclusion* ("no new failures") was correct, because the foreign tests all pass and
so inflate totals without touching the failure set. That is luck about the foreign file's colour,
not a property of the method.

## What the predicate does NOT match

Stated at authoring time, because a blind spot is a property of the predicate:

1. **Same file + same test + byte-identical first reason line, different underlying cause.** The
   comparator keys on that triple, so a new defect that reproduces an existing red exactly is
   invisible to it. This is not exotic here: `012-message-mode.test.ts` fails `expected 32768 to be
   +0`, and *any* future defect leaving the V2 flag set at that point yields the identical string.
   **Compensating instrument:** `../probe-cr3-mode-predicate/` covers `isMessageV2` /
   `switchToV2` / `applyModeSwitch` behaviourally over 36 rows / 122 assertions and is re-run each
   round; it does not key on suite output at all. Reason *drift* on the same test IS caught —
   control 1 below.
2. **Only the first line** of a failure message is compared. A changed stack or a changed second
   line does not register.
3. **Tests that never run** are not failures. A file that stops being collected — renamed, moved
   out of the glob, `describe.skip` — removes its rows and reads as `BASELINE GONE`, which the
   script flags rather than passes, but a *newly added* file that is silently not collected is
   invisible.
4. It says nothing about whether the six *should* still be failing. It is a change detector, not a
   correctness oracle.

## Controls run 2026-08-24

| control | expectation | result |
|---|---|---|
| 0 — unperturbed baseline vs `92ce026` | MATCH | MATCH |
| 1 — reason drift on the `message-mode` row (`32768`→`16384`) | DIVERGED | DIVERGED, reported as NEW + GONE |
| 2 — baseline missing a row (simulates a 7th failure) | DIVERGED | DIVERGED, reported as NEW |
| end-to-end at `18407d8` (different sha, real run) | MATCH, totals 443/437/6 | MATCH, 443/437/6 |

Control 4 independently re-derives the committed-tree figure this reviewer reported at round 3.
