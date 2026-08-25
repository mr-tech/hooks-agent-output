# probe-qa-toast-vessel-render

**Owner**: `qa-hooks-013-2` · **Round**: owner ruling 2026-08-25 (toast vessel) · **Tree**: `abcf585`

## What this instrument exists to settle

`code-reviewer-hooks-013-3` routed an **Assumption Not Checked**: the shipped spec
`013-owner-toast-vessel-2026-08-25.test.ts` pins **source text** (`readFileSync` + `toContain`),
so it cannot fail for a behavioural reason. For a UX change whose whole substance is *"the notice
renders in the surface instead of a toast"*, that leaves the substance unverified — and a green
suite is exactly what makes it look verified.

This instrument converts that suspicion into a **measured fact**, and then establishes as much of
the render property as an instrument can without the DOM harness D28 forbids.

## The headline result — the shipped spec is vacuous for its own subject

| Mutant | What it does to the user | Shipped spec | This instrument |
|---|---|---|---|
| **R1** `show={codeMessageDroppedNotice}` → `show={false}` | the notice **never renders, ever** | **9/9 GREEN — survives** | **3 failed — killed** |
| **R4** notice body `{codeMessageDroppedNotice}` → `{''}` | renders an **empty warning box** | **9/9 GREEN — survives** | **1 failed — killed** |
| **R2** `show={…}` → `show={true}` | notice shows when there is nothing to say | — | **2 failed — killed** |
| **R3** drop `text-warning` | renders unstyled | — | **1 failed — killed** |

R1 and R4 are the point: under both, the entire user-visible substance of the change is broken and
the shipped suite reports success. Its assertions are coupled to source *text*, not to behaviour.

**Instrument score with its predicate**: 4 mutants, seeded at `CodeMessageNotice.tsx`'s render
expression, its `show` prop and its styling hook — 4 killed by this instrument, 2 of the 2 tried
survived by the shipped spec. Excludes the paste surface entirely (see below) and excludes the
provider's effect body, which no mutant here targets.

## A mutant that did not apply, recorded rather than dropped

R4's first attempt used an anchor with a literal `\n` that never matched. The run reported
**`9 passed`, exit 0** — indistinguishable from a survivor. The harness asserts the anchor is
present before mutating and raised `MUTANT DID NOT APPLY`, so it was caught and re-run with the
real anchor. Recorded because a did-not-apply mutant reads exactly like a kill-nothing result.

## D28 compliance

No jsdom, no happy-dom, no `@testing-library/react`, no change to `vitest.config.ts`. React
function components are plain functions; this calls them and inspects the returned element objects
via a ~10-line evaluator. That is ordinary function testing, **not** a mounted render, and it is
**not** a substitute for the owner's own observation.

## What it CANNOT establish — the honest boundary

1. **Visibility** — proves an element with `text-warning` is returned, not that a human sees it.
   CSS cascade, `z-index`, `overflow:hidden`, a hidden parent and colour contrast are all invisible here.
2. **Placement** — that the notice lands where the eye goes is untested.
3. **The real mount** — `CodeMessageNotice` is `'use client'` inside an async server layout. A null
   context would throw in production and pass here.
4. **The paste surface — the larger gap, and the site the owner's ruling actually named.**
   `NewMessageJsonInput`'s `settledNotice` is **unreachable** by this technique. Established by
   execution, not asserted: see `trace-paste-surface-unreachable.txt` — `useCopyToClipboard` calls
   `useRef` before `settledNotice` is reached, and React's dispatcher is null outside a renderer, so
   the component function throws at its second hook. Reaching it needs the harness D28 rules out.
   Its render path is asserted **only as source text**.

The four `paste surface guard` cases close the guard's *logic* (`!error && settledNotice`, each
conjunct the sole carrier in some fixture) through the real `NullableComponent` — but that fixture
**supplies the expression** rather than reading it from source, so it measures the semantics, not
the wiring. Stated rather than smoothed over: combined with the source-text assertion that the
expression is present, it is stronger than either alone and weaker than a render.

## Reproduce

```sh
cp 013-qa-toast-vessel-render.test.ts <tree>/src/utils/__tests__/
npx vitest run src/utils/__tests__/013-qa-toast-vessel-render.test.ts   # 13/13
```

Mutants: apply the table's edit to `src/app/message/m/[id]/_layout/CodeMessageNotice.tsx`,
re-run, `git checkout --` to restore. Every mutation in this capture was restored and the file
verified byte-identical (`sha256 fbe23995…`) afterwards.

---

## Closure at `664e0c0` — F-QA23 discharged by execution

The instrument in this directory was **adopted into the repository unmodified** —
`src/utils/__tests__/013-qa-toast-vessel-render.test.ts`, sha256 `ca85911d…`, byte-identical to the
copy here (`diff -q` clean). The fix round moved **no production code**:
`git diff --numstat abcf585..664e0c0 -- ':(exclude)*__tests__*'` is empty.

**The same two mutants were re-run against the full shipped suite at `664e0c0`** — not carried
forward from the runs above, because zero movement licenses a scoped pass and never a
carried-forward verdict:

| Mutant | At `abcf585` (shipped spec alone) | At `664e0c0` (full suite, instrument adopted) |
|---|---|---|
| **R1** notice never renders | **9/9 GREEN — survived** | **3 failed / 569 passed — KILLED** |
| **R4** notice renders empty | **9/9 GREEN — survived** | **1 failed / 571 passed — KILLED** |

Control: unmutated suite **572/572, 39 files, exit 0**; this instrument alone **13/13**. The
component file was restored and verified byte-identical after each mutation.

**Independent validation, re-executed here rather than cited.** `code-reviewer-hooks-013-3` built
`probe-cr22-render-instrument-nonvacuity/` deliberately without trusting this capture — it imports
the real `CodeMessageNotice`, replays a byte-copy of the `render()`/`text()` helpers, and runs its
own inline mutants. QA re-ran it from this tree rather than taking the reported figure:
**4/4 passed, exit 0** (`closure-664e0c0-reviewer-probe-cr22-reexecuted-by-qa.txt`). Its directory
contains **zero** references to jsdom, happy-dom or testing-library, corroborating D28 compliance
from a second hand.

---

## CORRECTION — this capture's "paste surface is unreachable" claim is WITHDRAWN

Recorded beside the claim above, not over it, so the error stays legible.

Section "What it CANNOT establish", item 4, states the paste surface is **unreachable** by this
technique and routes it wholly to the owner as BC-18. **That is wrong.** The evidence behind it was
sound — `useCopyToClipboard` calls `useRef` before `settledNotice` is reached, and React's
dispatcher is null outside a renderer, so the component throws at its second hook, exactly as
`trace-paste-surface-unreachable.txt` shows. The **inference** was too strong: "throws at hook 2"
was read as "unreachable", when mocking the three custom hooks makes the `useState` order
deterministic and the component callable.

Withdrawn by execution, not by argument. See **`../probe-qa-paste-surface-render/`**: 5 assertions
against the real `NewMessageJsonInput`, 4 mutants seeded at the notice's render site, **4/4 killed**
— including one that removes only the `!error` conjunct, establishing conjunct isolation against the
**real wiring** rather than against a replicated expression.

**Method note worth more than the correction.** The failure mode here was stopping at the first
mechanism that resisted and generalising from it. One hook threw; I concluded the surface was
closed, wrote that boundary into a verdict, and routed a closable property to a human. A boundary
claimed after one attempt is a hypothesis, and this one held for less than a day. The `paste surface
guard` cases in this file — which replicate the guard expression instead of reading it from source,
and say so — exist only because of that premature stop; the sibling probe supersedes them.
