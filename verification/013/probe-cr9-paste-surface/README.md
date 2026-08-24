# probe-cr9 — the paste surface (`NewMessageJsonInput.tsx`) at `ee3bc3e`

**Built at**: `ee3bc3e` (website, `chain/013-components-v2-editing-surfaces`).
**Built for one claim**: that the content-loss disposition the paste surface shows the user is taken
on the object the user actually pasted.

It is not. `discordMessageImportShape` runs `filterSupportedComponents` as a `z.preprocess` on
`components`, and the surface calls `resolveContentLoss` on the **post-parse** object — so anything
the preprocess removed is invisible to the gate that exists to stop silent removal.

Run:

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr9-paste-surface
rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules
npx vitest run --config vitest.cr9.config.ts
```

**Result at `ee3bc3e`: 24/24 pass** (`run-cr9-ee3bc3e.txt`). Every test asserts the behaviour that
is actually present, so a *pass* here documents the defect rather than denying it.

| Block | Asserts |
|---|---|
| CR9-A | A V2 container with an unsupported child + content + flag is **row E as pasted** and **row D at the surface**. Positive control: the same shape with a supported child reaches row E on both paths. The notice the user then reads names only the flag — no drop/remove/lose verb appears in it. |
| CR9-B | The same flip with no flag set lands on **row A, `noticeClass: 'none'`** — the components vanish with no notice at all. |
| CR9-C | Sweep over container child types, each child **well-formed for its own type**, writing `sweep-child-types.txt`. Separates *silent flip* from *visible Zod rejection*; the first version of this sweep conflated them and reported every type as flipped. |
| CR9-F | The most ordinary member of the class: an **empty container** `{type:17, components:[]}`. |
| CR9-G | **Differential, old vs new.** The pre-`ee3bc3e` path (`enforceImportMutualExclusivity` then parse) vs the `ee3bc3e` path, transcribed verbatim from both trees. |
| CR9-D | Instrument control — the comparator reports *agreement* on payloads the preprocess does not touch, so it is not stuck reporting DIFFER. |
| CR9-E | Row-E options carry a non-empty `describeDropSet` label with the expected drop sets. |

## What the sweep found (`sweep-child-types.txt`)

```
SILENT FLIP away from E (content lost, no choice): [2,3,4,11,17]
VISIBLE rejection (user sees a Zod error):         [9,14]
HELD at row E (correct):                          [1,10,12,13]
```

Type **11** is in `V2_COMPONENT_TYPE_VALUES` but not in `SUPPORTED_CONTAINER_CHILD_TYPES`, so a
container holding one is destroyed whole. Types 9 and 14 reject visibly only because the hand-built
child is incomplete for its own shape — that is a property of the fixture, not of the tree, and it is
reported separately for exactly that reason.

## What CR9-G established

The commit did **not** close the silence; it changed which half is lost.

| | `content` | `components` |
|---|---|---|
| before `ee3bc3e` | deleted silently | preserved (raw, unfiltered) |
| at `ee3bc3e` | preserved | deleted silently |

Neither satisfies D9's form (*"Drop them, say what was dropped"*) or the plan's M4-b.

## Blind spots — stated at authoring time, not after

- The sweep varies the **child** of a single top-level container. It does not vary top-level type
  (round 7's CR7-B covers that), nor depth beyond one nesting level, nor multiple components at once.
- It matches behaviour through `discordMessageImportShape` only. A second import shape, or a caller
  reaching the resolver under a re-exported name, is outside it.
- Fixtures are hand-built. They are well-formed for their own component shape, but they are not
  drawn from real Discord payloads, so "is this reachable in practice" is bounded by that.

## One thing this probe does NOT establish

The round-9 finding about `toast.warn` firing per keystroke is **not** executed here. The repository
has no DOM/component test harness (no jsdom, no testing-library, zero `.tsx` tests in 28 test files),
so no instrument in this directory renders the component. That finding rests on the call chain read
in the source and is labelled a reading, not an execution, in the review document.
