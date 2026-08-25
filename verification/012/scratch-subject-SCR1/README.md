# SCR-1 — the scratch subject for re-specified register rows QA-R2, QA-R4 and QA-R15

**Built by**: qa (chain 012), 2026-08-25, under **D23** (QA-R4/QA-R15 routed back to QA for
re-specification) and **D27** (QA-R2 likewise, 2026-08-25 — SCR-1 is built with `valid = false`,
so R2 does on SCR-1 exactly what it was written to do on 5712).
**Anchor**: `website` `a74b9e2` — the released chain-013 tree, which is the tree the deployed
composer runs. Not `c85945f`; that SHA anchors chain 012's Phase 2 PASS and is not re-issued here.

## What this instrument is for

Rows QA-R2, QA-R4 and QA-R15 named **record 5712** as their subject — R4 and R15 as loaded in
the composer, R2 as read from the v1 endpoint. 5712 and 5842
were repaired by direct SQL as part of chain 013 (owner, 2026-08-25: *"They were fixed as a part of
013. sql statements"*), so the subject no longer exists in either direction. D23 routes both rows
back to QA to be re-specified against **a subject that still exists** — and the re-specification
names a purpose-made scratch record, **SCR-1**.

A purpose-made subject carries a failure mode a found subject does not: **it can be built wrong.**
`validateMessage` short-circuits on the first failing check, so a scratch record that is *also*
username-invalid is refused for the username reason and never reaches the mutual-exclusivity clause
at all. QA-R4 would then be observed passing — "Send is disabled" — on a record that says nothing
whatever about M2-c. This instrument exists to make that failure impossible to miss.

`scr1-discrimination.test.ts` runs the **shipped** predicate and the **shipped** mode-switch
functions over the exact SCR-1 payload the rows specify. No expectation is computed by calling the
code under test; the reason string is written out literally rather than imported (per the standing
warning in `TODO.md` that an unqualified `valid = false` does not discriminate between independent
refusal reasons — **key on the reason string**, established at F-QA13 / `32737d3`).

## Running it

The spec lives here rather than in `website/src/utils/__tests__/` because it is chain-bound
verification material for a register row's subject construction, not a standing guard on product
behaviour in CI. To run it, copy it into a **detached worktree** of `website` at the anchor SHA —
never into the shared tree, which other sessions are working in:

```
git -C website worktree add --detach /tmp/qa012-scr1 a74b9e2
ln -s "$PWD/website/node_modules" /tmp/qa012-scr1/node_modules
cp scr1-discrimination.test.ts /tmp/qa012-scr1/src/utils/__tests__/
cd /tmp/qa012-scr1 && SKIP_ENV_VALIDATION=1 \
  DATABASE_URL='postgresql://nobody:nobody@127.0.0.1:1/deadport' \
  npx vitest run src/utils/__tests__/scr1-discrimination.test.ts
```

`SKIP_ENV_VALIDATION=1` is required — a fresh worktree has no `.env.local`, and `src/env.mjs`
refuses at module scope without one. **`DATABASE_URL` is set explicitly to a dead port and must
stay that way**: the standing hazard for this box is that the only selectable `DATABASE_URL` in
`.env.local` is the **remote production database**, so a run that inherits the ambient environment
is a run pointed at production. This spec constructs no client and touches no database; the dead
port is belt-and-braces, not a dependency.

## Result at the anchor

**8 assertions, 8 green** at `a74b9e2` (2026-08-25, this session's own run).

## Every assertion observed failing

No assertion here counts as evidence until it has been seen red under something it exists to
detect. All eight were, by mutating the source in the throwaway worktree (never the shared tree)
or by mutating the fixture; green was re-confirmed after each restore.

| Mutant | What it changes | Assertions driven red |
|---|---|---|
| **M-A** | `validateContentRequirements`: `hasFlagV2` forced `false` — the pre-M2 send-gate defect itself | refusal reason |
| **M-B** | `switchToClassic`: the D11 flag-clearing line deleted | clears the bit; leaves sendable; clears only that bit |
| **M-C** | `switchToClassic`: mask replaced by `flags = 0` — R14's mask defect | clears only that bit |
| **M-D** | `isMessageV2`: the flag disjunct dropped | opens in V2 mode |
| **M-E** | `switchToClassic`: also empties `content` — losslessness broken | preserves content/embeds; leaves sendable |
| **F-1** | *Fixture*: SCR-1 given an empty `username` — a second, unrelated refusal reason | **sole-carrier control**; leaves sendable |
| **F-2** | *Fixture*: the confounder record given no V2-typed component | **confounder control** |

F-1 is the one that matters operationally: it is the direct demonstration that the sole-carrier
control catches a mis-built scratch record. Without that control, a mis-built SCR-1 is
indistinguishable from a correctly-built one at the observation.

## What this instrument does NOT establish

It runs the pure functions. It does **not** execute the composer: not
`handleModeSwitch` → `applyModeSwitch`, not the editor's rendering of `noContentError`, not the
send page's `allowSave`. `website` has no DOM harness (chain 013, D28), so that wiring is
unexecutable here and is exactly the residue rows QA-R4 and QA-R15 exist to cover by observation.
