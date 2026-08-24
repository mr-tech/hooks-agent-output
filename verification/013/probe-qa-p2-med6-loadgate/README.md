# probe-qa-p2-med6-loadgate — MED-6 and INFO-2

**Stage**: QA Phase 2, plan 013. **Tree under verification**: chain tip `4e9da96`.

Two questions, one spec, because both are answered by the same `JsonModalBody` state machine and
the same ingress converter.

## Part 1 — MED-6: does the dismissed-choice state leave Load enabled and no-opping?

**Answer: no.** The fix commit `4e9da96` changed the gate from
`isDisabled={!!error || !isValid || !!contentFloorError}` to
`isDisabled={!validatedDraft || !!contentFloorError}` and deleted the `isValid` state.

The probe establishes the state machine by execution over the source, not by reading it:
`setValidatedDraft` is written **exactly three times**, all inside the parse effect — `null` on the
`requiresChoice` branch, `parsed` on the non-choice branch, `null` in the `catch`. `cancelChoice`
and `reopenChoice` write to it **not at all**. So a dismissed choice cannot leave a truthy
`validatedDraft` behind, and Load is disabled on that path.

**A second, independent carrier was found while doing this** and is recorded because it changes the
finding's risk profile: `commitLoad` re-derives the disposition and returns early on
`requiresChoice`, so even a hypothetical re-enabled button could not write on the choice branch. The
integrity property has two carriers; the **affordance** property (the button's appearance) has one.

> **Slicing hazard, recorded because it produced a wrong intermediate result.**
> `SRC.indexOf('if (disposition.requiresChoice)')` matches the occurrence in **`commitLoad`**, not
> the one in the parse effect — there are two. Slice the parse effect first, then locate the branch
> inside it. Getting this wrong is what surfaced the second carrier, so the error was informative,
> but it is still an error and the next reader should not have to rediscover it.

## Part 2 — INFO-2: is `NewMessageModal`'s `gateBeforePersist` branch reachable? (block P2-E)

Steering closed R9 on the condition that every application site *routes* through the gate, recording
**INFO-2**: *"that branch is dead today — no M3 ingress source produces a row-E `loadedMessage`"*,
with the instruction that **routing is not reachability** and that QA needs *exercised*, not *wired*.

**Executed. INFO-2 is FALSIFIED — the branch is reachable.**

| Question | Result |
|---|---|
| `discordResponseToMessage` preserves `content`, `components` **and** the flag together? | **Yes** — it does not normalise |
| Is that output a row-E record? | **Yes** — `gateBeforePersist(data).mustAsk === true`, 2 options |
| Is `mustAsk` simply always true? | **No** — classic-only → `false`; V2-only → `false` |

**What survives of steering's concern, in sharper form**: the **call site is unexercised**.
`gateBeforePersist` itself is well covered (`013-m8-ec3-resolver-gate.test.ts`), but no spec invokes
`NewMessageModal.onSubmit`. The finding is not *"one of three call sites is dead"* — it is *"the
branch is live and nothing exercises it"*, which is the more concerning of the two. Recorded as
**F-QA19**.

**Residue not settled here**: whether Discord's API can itself *return* a message carrying both. It
refuses to *send* one, but the import path reads pre-existing messages and nothing in this code
prevents it. Routed to the register as **BC-14**, not answered by reading.

## Mutation evidence

Mutants **P1–P7** (state-machine and gate mutations) and **P8** (a converter that normalises content
away under the V2 flag, modelling the world in which INFO-2 would be true) — **all killed**. Tree
restored byte-identical after each.

## Residue this instrument does NOT settle

It does **not** mount the component, so it does not observe React applying `isDisabled`. **No DOM
harness exists at this tree** — `@testing-library/react`, `jsdom`, `happy-dom` and
`@vitejs/plugin-react` are all absent; vitest runs `environment: 'node'`; `include` is
`src/**/*.test.ts`, so a `.tsx` spec is not even collected. Installing them mutates a shared
`node_modules` and `package.json`: gated, and not QA's to do.

The **integrity** property has the second carrier described above. The **affordance** property does
not, and is routed to the blocking-condition register rather than absorbed.

## Reproduce

```sh
cp 013-qa-p2-med6-loadgate.test.ts <tree>/src/utils/__tests__/
DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' npx vitest run \
  src/utils/__tests__/zz-qa-p2-med6-loadgate.test.ts
```

`vi.mock('~/env.mjs', …)` at the head of the spec is required — `~/utils` pulls `~/constants` which
pulls `env.mjs`, and env validation throws in a bare test process.
