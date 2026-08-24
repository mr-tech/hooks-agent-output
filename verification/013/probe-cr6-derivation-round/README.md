# CR6 — the round-5 fix round: both closures, and what the fix did not close

**Round 6, `Reviewed-At: 816d7fd`.** Built to attack the round-5 fix round
(`52e0e8a`, comment-corrected at `816d7fd`) rather than read it: that round fixed a **guard**
(`applyDisposition`) and added a new **instrument** (`diffDroppedKeys`), both of which trigger
re-attack from first principles.

Run: `npx vitest run --config vitest.cr6.config.ts` — symlink `node_modules` first, and see the
rig note below.
Result: **10/10** at `52e0e8a` and again at `816d7fd`. Captured: `run-cr6-52e0e8a.txt`,
`run-cr6-816d7fd.txt`.

## The corpus is exhaustive, not sampled

The full cross product of 5 flag values × 8 component shapes × 4 content values × 7 embed shapes =
**1120 drafts**. 325 land in row E, 795 settled. It includes the cases that distinguish the fix
from its predecessor: `[]`, `[{}]` (the composer's real default embed —
`setEmbeds([...embeds, {} as EditableEmbed])`), `[{_key:'a'}]`, whitespace-only content, non-V2
residue flags (`4`, `4|BIT`), Action-Row-only component lists, and both orderings of
`[container, actionRow]`.

`enactedDrops()` in this file is an oracle written **independently of** `index.ts`'s own
`diffDroppedKeys`. That is the point: it is a check, not a restatement of the implementation.

## What it establishes

| id | check | result |
|---|---|---|
| CR6-A | D18's core invariant: `gateBeforePersist(d).mustAsk === true` ⟺ `applyDisposition(d)` throws | **1120/1120** |
| CR6-A | no settled draft loses classic content it was carrying | **795/795** |
| CR6-A | arity — `applyDisposition.length === 2` (the pre-fix signature was 3) | closed |
| CR6-B | every row-E option's `dropSet` equals the keys the real serialiser changes | **325/325**, both options each |
| CR6-B | **mutant control** — the pre-fix hardcoded `['content','embeds']` fails that same check | fails, as it must |
| CR6-C | `applyDisposition` ignores `dropSet` entirely — a bogus one yields a byte-identical result | confirmed |
| CR6-C | **the residual**: a stale option from another draft is accepted, and **understates** the loss | demonstrated |
| CR6-D | purity — the resolver, gate and applier mutate none of their (deep-frozen) inputs | **1120/1120** |
| CR6-E | the key-level label cannot describe a partial components loss; and Action-Row-only drafts never reach row E | demonstrated, bounded |

## The finding this probe exists for

**CR6-C.** Round-5 MEDIUM-1 closed "a derived value accepted alongside the source it came from" by
deleting the `disposition` parameter. `chosenOption` sits beside it and is the same class:
`applyDisposition` reads `chosenOption.mode` and never reads `chosenOption.dropSet`.

Executed: draft A `{flags:0, content:'hi', embeds:[], components:[container]}` advertises
`dropSet: ['content']`. The user adds an embed; draft B would advertise `['content','embeds']`.
`applyDisposition(draftB, optionFromA)` is accepted and destroys the embed under a label that never
named it.

**The direction reversed.** Round-5 MEDIUM-2's constant label *overstated* the loss, which is why it
was MEDIUM rather than HIGH — no user was under-warned. This residual path **understates** it. The
safe-direction argument does not carry over.

Structural exit: `applyDisposition(draft, chosenMode?: MessageMode)`.

## What this probe does NOT establish

- **Nothing about a running instance.** At `816d7fd` no production code reached any of the three
  functions, so there was nothing to drive. That exemption **expired at `a3e758b`**, where
  `JsonModalBody.tsx` wires them. Round 7 is under the mandatory adversarial-execution obligation
  and this probe does not discharge any part of it.
- **Nothing about the object a real call site hands in.** Every assertion here builds the draft as
  one coherent literal. The composer keeps `content`/`embeds`/`components` as three separate state
  slices and does not hold `flags` at all — see round 6's Assumption Not Checked.
- **Nothing about `dropSet` at element granularity.** CR6-E bounds the gap; it does not close it.
  The notice's wording, not `dropSet`, is where that is solved.

## Rig note

If this directory's `node_modules` has become a real directory rather than a symlink, `ln -sfn` will
create the link *inside* it and the run will fail with `Cannot find module 'vitest/config'` after
`npx` fetches vitest from the network — a red that has nothing to do with the code. Repair with
`rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules`, and confirm
with `ls node_modules/vitest` before trusting a result.
