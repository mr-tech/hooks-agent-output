# Probe — can UAT mint its own M8-G seed before the deploy? (plan 013, QA Phase 1)

**Chain**: 013 · **Base**: `website` `chain/013-components-v2-editing-surfaces` @ `c85945f` (clean tree at capture)
**Author**: qa (QA Phase 1) · **Date**: 2026-08-24

## What this instrument discriminates

Plan 013 Validation item 8 states that M8-G's production-reachable human-observable form
(open 5712 → add one container → Save → the ask) exists **only while rows 5712 and 5842 are
unrepaired**, and that the owner's D19 repair is his to run at a time of his choosing. If that
is the whole picture, the repair is a **one-way door**: the moment it runs, the central new
behaviour D18 introduces can never be observed in production and ships on suite evidence alone.

This probe asks the question Validation item 8 does not: **can the shape be minted through the
product's own UI at the chain base, with no SQL and no database access?** If yes, UAT can create
and hold its own seed before the deploy, and the observation survives the repair whenever it runs.

## Result — YES

7 assertions, all green at `c85945f`. At the chain base:

- `enforceImportMutualExclusivity` passes `{content:"hi", flags:32768}` through **untouched**
  (`isV2` is false, so the V2 branch that strips is not taken and the `else` branch does nothing
  when `components` is not an array) — the flag survives, the content survives.
- The same holds for 5842's shape (`components: []`).
- Both shapes are accepted by `discordMessageImportShape` (client) **and** by
  `discordMessageShape` (the server's `message.upsert` input) — so the write boundary admits them.

Therefore the New Message → JSON paste route mints a 5712-shaped and a 5842-shaped record today.

## Why the result is not vacuous

A **discriminating control in the other direction** is included: the same reconciler over a row-E
object (`{content:"hi", flags:0, components:[{type:17}]}`) **does** strip `content`/`embeds` and
reports `v2`. If the reconciler normalised everything, the pass-through assertions would be
reporting a route that is in fact closed.

**Both directions observed failing.** Two mutants run 2026-08-24, each killed, tree restored green:

| Mutant | Assertion mutated | Result |
|---|---|---|
| 1 | `expect(data.flags).toBe(32768)` → `toBe(0)` | 2 failed / 5 passed — **killed** |
| 2 | `discordMessageShape.safeParse(SHAPE_5712).success` `true` → `false` | 1 failed / 6 passed — **killed** |

## Method notes

- Expectation independence: the flag value is asserted as the literal `32768` derived from
  `1 << 15`, not by re-reading the constant the code under test reads.
- **Module-scope hazard (F-QA9)**: importing `~/utils` reaches `src/constants/index.ts` →
  `src/env.mjs`, which validates environment variables **at module scope** and throws in this
  box's environment. The probe mocks `~/env.mjs`, as every existing spec in the repo does. This
  was found by executing, not by reading, and is recorded in the QA document.

## Files

| File | What it is |
|---|---|
| `013-qa-phase1-seed-route-probe.test.ts` | the probe, verbatim copy of the spec in the website tree |
| `run-green.txt` | the green run at `c85945f` |
| `manifest-sha256.txt` | `sha256sum` of the spec's bytes in the website tree at capture |

**Live path in the website tree**: `src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts`
(vitest's `include` already reaches it; it runs with `pnpm test`). It is **uncommitted** at
capture — QA does not hold the chain-branch source grant. Committing it is a gated act and is
reported to steering.

---

# Extension, 2026-08-24 — the REAL write boundary and the PERSIST leg

**Added by**: qa (`qa-hooks-013-2`) · **Anchor**: `website` @ `c85945f`, detached worktree
`/tmp/qa013-c85945f` (the shared tree was **not** switched; it stayed on the chain branch)
**File**: `013-qa-seed-route-envelope-and-persist.test.ts` · **Run**: `run-green-envelope-persist.txt`

## Why it exists

`uat-hooks-013` (`agent-output/uat/013-components-v2-editing-surfaces-uat.md`, `b6e9662`) reported
two gaps in the probe above, **at read level, in a detached worktree, explicitly labelled
corroboration rather than re-derivation**. This extension **executes** both. Neither contradicts the
original probe; both extend it, and UAT's read is confirmed on every point.

| UAT's report | Confirmed by execution? |
|---|---|
| (i) the probe asserts `discordMessageShape`, but `message.upsert`'s input is `z.object({ message: optionalIdMessageShape })` — one layer out; `name`/`guildId` unexercised | **Yes.** Asserted from the router's own bytes, read at runtime, not restated. |
| (ii) the probe does not cover the persist leg; `buildMessageValues` writes `data: message.data` verbatim and computes `valid` alongside | **Yes.** And `data` passes through by **reference identity**, which is a stronger statement than deep equality. |

## What it establishes — 24 assertions, all green at `c85945f`

**EXT-A, the real boundary.** The wiring is read from `src/server/api/routers/message.ts` at
runtime (not embedded — the `probe-cr1`/`probe-cr10` fossil class): the `upsert` procedure's
`.input(...)` names `optionalIdMessageShape`, does **not** name `discordMessageShape`, and is a
`protectedProcedure` — so there is no anonymous mint route, which is why UAT could not mint. The
full envelope `NewMessageModal` sends — `{ message: { data, name, guildId } }` — is accepted for
both the 5712 and the 5842 shape, and the flag and content survive the parse.

**Conjunct isolation**: `name` absent, `name` empty, `guildId` malformed and `data` malformed each
carry the refusal **alone**, with every other field valid. `guildId` omitted, `guildId` null and an
`id`-bearing update envelope are the positive pairs.

**EXT-B, the persist leg.** `buildMessageValues(...).data` **is** the input object (`toBe`, not
`toEqual`) — no clone, no normalisation. At rest the 5712 seed is a genuine row-D member (flag set,
classic content, no V2 components) and the 5842 seed keeps `components: []`. `valid` is added to the
row, never to the stored `data`, and the input object is not mutated. The **conflict-update** set
names `data` as well as inserting it — which matters because BC-11 Half B is a *save on an existing
record*, not a create.

**Controls the other direction** (so no assertion is vacuous): an unflagged classic message is not a
row-D member at rest; a record carrying a real container **does** report V2 components; and the
`on conflict` slice is verified to be a real slice rather than the whole statement.

## The operator-facing thing this turned up — `guildId` defaults to `'0'`

`NewMessageModal` opens with `useState(guildId ?? '0')` and `/message` passes no `guildId`.
`disableSave` checks `loadedMessage`, `isSavingMessage` and the name — **not the guild**. So **Save
is enabled while the dropdown still reads "Select a Guild"**, and `'0' || null` sends `guildId: '0'`,
which `discordIdShape` (`/^[0-9]{17,23}$/`) refuses. Executed both directions: `'0'` is refused, and
the "My Account" item's value `''` reaches the boundary as `null` and is accepted.

**Consequence for BC-11 Half A**: an operator who pastes the JSON and presses Save without touching
**Save To** gets a validation error and would reasonably report the mint route as *closed*. It is
not. Pick **My Account** (or a guild) first.

## Mutants — every claim observed failing, tree restored green after each

| # | Mutant | Result |
|---|---|---|
| M1 | `messageShape.name` loses `.min(1)` and becomes optional | 2 failed / 22 passed — **killed** |
| M2 | `buildMessageValues` clones `data` instead of passing it verbatim | 1 failed / 23 passed — **killed** |
| M3 | the conflict-update set drops `data` | 1 failed / 23 passed — **killed** |
| M4 | *fixture* mutant: `V2_FLAG` stated as `1 << 14` | 4 failed / 20 passed — **killed** |
| M5 | `discordIdShape` widened to `/^[0-9]{1,23}$/` | 1 failed / 23 passed — **killed** |

M1–M4 were run against the 22-assertion form and M5 against the 24-assertion form; the counts above
are as observed at each point. Source mutants were reverted with `git checkout --` in the throwaway
worktree and the tree re-run green (`24 passed`) after each.

## Second round, same day — EXT-C and EXT-D (36 assertions total)

Added after `uat-hooks-013`'s third digest (`9e6b43e`, doc rev 6).

### EXT-C — F-QA11 bounded to its class, **by execution**

UAT reported at read level that `SaveAsMenu` is clear of F-QA11. It is. Rather than record that at
read level, the class was **enumerated on a predicate derived from the defect's definition** — *a
site that builds `message.upsert`'s `guildId` from a value the user picked this session, rather than
from a persisted record* — and every match executed.

**4 sites matching that predicate in `src/` at `c85945f` — excludes sites whose `guildId` comes from
a loaded record, and sites feeding procedures other than `message.upsert`:**

| # | Site | Produces | Verdict |
|---|---|---|---|
| 1 | `NewMessageModal.tsx:143` | `'0'` default, **unguarded** | **F-QA11 — refused at the boundary** |
| 2 | `SaveAsMenu.tsx:41` | `message.guildId ?? ''` → `null` | clear |
| 3 | `f/[id]/page.tsx:354` | `folderId !== '0' ? folderId : undefined` | clear — **guards the same sentinel explicitly** |
| 4 | `m/new/page.tsx:58,68` via `copyIntroMessage()` | omits the key | clear |

**Excluded, named rather than dropped**: `useApiMethods.ts:63` (`guildId` from the loaded record —
in the *writer* class, not this one); `GuildProvider.tsx:87/102/120` (feeds `api.guild.*`);
`utils/hooks/index.ts:183` `useParsePathname` (produces `''` but is not an upsert payload). The
known instance is among the matches — the check that the predicate is a predicate and not a
coordinate list.

**The load-bearing result**: two of the four siblings **guard the exact `'0'` sentinel**. So F-QA11
is a single-site oversight, not a design choice — which is what makes it cheap to act on. The four
producible values are also settled at the boundary itself: `'0'` refused; `''`→`null`, `undefined`
and a real snowflake accepted.

### EXT-D — R7's first limb: the seeds carry `valid = false`

`uat-hooks-013` stated this as an inference and **deliberately left it unexecuted**, asking that it
be executed rather than inherited. Executed here. **Confirmed**, with a precision the inference did
not carry:

| Fixture | `isMessageValid` | `validateMessage` |
|---|---|---|
| `{content:'hi', flags:32768}` (5712) | `false` | *"Components V2 messages cannot contain embeds or content."* |
| `{content:'hi', flags:32768, components:[]}` (5842) | `false` | same |
| `{content:'hi', flags:0}` — **no username** | `false` | *"This username is too short or too long."* |
| `{content:'hi', flags:32768, username:'Hooks.gg Bot'}` | `false` | the V2 reason — **the conjunct alone** |
| `{content:'hi', flags:0, username:'Hooks.gg Bot'}` | `true` | `''` |
| proper V2 (container + text display, username) | `true` | `''` |

**The precision that matters**: an unqualified *"the seeds are `valid = false`"* does **not**
discriminate — a username-less message is refused for an unrelated reason. Only with a username
supplied is the V2/classic conflict the **sole carrier** of the refusal. Anything downstream keying
on `valid = false` must key on the reason, not the boolean.

So the seeds stay out of R7's `flagStructureDisagreementValidTrue`, as UAT reasoned — established
by execution, not by shape identity.

### Mutants, second round — four more, all killed, tree restored green at 36

| # | Mutant | Result |
|---|---|---|
| M6 | `SaveAsMenu` initialised to `'0'` instead of `''` | 1 failed / 35 passed — **killed** |
| M7 | the folder page's `'0'` guard removed | 1 failed / 35 passed — **killed** |
| M8 | `limits.tsx`: the V2-**flag** limb dropped from `hasV2` (structural only) | 3 failed / 33 passed — **killed** |
| M9 | `limits.tsx`: the V2/content rule inverted | 4 failed / 32 passed — **killed** |

**Nine mutants across both rounds, nine killed.** No equivalent mutants were found; none were dropped.

---

## What is still NOT established by this instrument

**No authenticated call and no database write were made.** This establishes that the shapes pass the
schema at the real boundary and that the persist function would store them verbatim. It does **not**
establish that a real authenticated `message.upsert` succeeds end to end, because `protectedProcedure`
requires a session this box does not have. That residue is BC-11 Half A's, and only an authenticated
human can close it.

## Reproducing it

```bash
git -C /usr/local/bin/hooks/website worktree add --detach /tmp/qa013-c85945f c85945f
cd /tmp/qa013-c85945f
rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules   # NOT `ln -sfn` alone
mkdir -p src/server/api/utils/__tests__
cp <this dir>/013-qa-seed-route-envelope-and-persist.test.ts src/server/api/utils/__tests__/
DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' \
  npx vitest run src/server/api/utils/__tests__/013-qa-seed-route-envelope-and-persist.test.ts
```

`package.json` gained only a `typecheck` script between `c85945f` and the chain tip and the lockfile
is untouched (`git diff --numstat c85945f..4e9da96 -- package.json pnpm-lock.yaml` → `1 0
package.json`), so sharing the tip's `node_modules` with a base worktree is sound. `DATABASE_URL` is
set explicitly at a dead port because `.env.local`'s single selectable entry is the **remote hosted
database**; no query is executed here (the only Kysely instance uses `DummyDriver`), so this is
belt-and-braces, not the load-bearing control.

---

## What belongs here, and what does not

This directory holds QA-authored **instruments that discriminate a finding** — probes, controls,
differentials — for chain 013. Acceptance specs for plan 013's criteria belong in the service's
own suite (`src/utils/__tests__/`, `src/server/api/utils/__tests__/`), not here; this is not a
second home for the test suite.
