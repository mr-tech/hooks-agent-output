# probe-qa-paste-surface-render

**Owner**: `qa-hooks-013-2` · **Tree**: `664e0c0` · **Status**: closes the instrument-closable half of **BC-18**

## This capture withdraws an earlier QA conclusion

The QA pass at `abcf585` recorded the paste surface — `NewMessageJsonInput`'s `settledNotice`, **the
site the owner's ruling actually named** — as **unreachable** without the DOM harness D28 forbids,
and routed the whole of it to the owner's eyes as BC-18.

**That conclusion was wrong and is withdrawn here by execution.** The evidence behind it was real:
the component throws at its second hook, because `useCopyToClipboard` calls `useRef` and React's
dispatcher is null outside a renderer (`trace-paste-surface-unreachable.txt` in the sibling probe).
The error was in the inference — "throws at hook 2" was treated as "unreachable", when mocking the
three custom hooks makes the `useState` order deterministic and the component plainly callable.

`trace-reachability-PROVEN.txt` is the disproof: the rendered text of the real component, carrying
the injected notice.

## What is now established, by mutation rather than by a green run

Five assertions against the **real** `NewMessageJsonInput`, with four mutants seeded at the notice's
own render expression, its `show` prop and its styling hook:

| Mutant | What the user gets | Result |
|---|---|---|
| **P1** `show={!error && settledNotice}` → `show={false}` | notice never renders | **3 failed — killed** |
| **P2** → `show={settledNotice}` (drops the `!error` conjunct) | notice shows *over* an error | **1 failed — killed** |
| **P3** notice body → `{null}` | empty warning box | **2 failed — killed** |
| **P4** drop `text-warning` | renders unstyled | **1 failed — killed** |

**P2 is the one worth naming.** It removes exactly one conjunct, leaving the sibling to cover for
it. That it fails proves the `!error` conjunct is the **sole carrier of the decision** in at least
one fixture — conjunct isolation established against the **real wiring**, not against an expression
the test replicates. The sibling probe could only do the latter, and said so.

**Instrument score with its predicate**: 4 mutants seeded at `NewMessageJsonInput.tsx`'s
settled-notice render site — 4/4 killed. **Excludes** the effect body that *sets* `settledNotice`
(mocked `useUpdateEffect`), the row-E `pendingChoice` branch, and every other notice on the surface.

The component file was restored and verified byte-identical (`sha256 d2ffdb00…`) after every mutation.

## What still needs the owner — the residue of BC-18

Reduced, not eliminated. Unchanged from the sibling probe: **visibility** (CSS cascade, `z-index`,
`overflow`, contrast), **placement** on screen, and the **real Next.js mount**. What is no longer
his to check is whether the notice renders at all, suppresses under an error, clears, and is styled
— those are now instrument-closed.

## Reproduce

```sh
cp 013-qa-paste-surface-render.test.ts <tree>/src/utils/__tests__/
npx vitest run src/utils/__tests__/013-qa-paste-surface-render.test.ts   # 5/5
```
Full suite with this adopted: **577 tests / 40 files / exit 0**.
