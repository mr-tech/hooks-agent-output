# `probe-qa-p3-delimiter-class-sweep/` — the MEDIUM-1 class, swept on its own predicate

**Built by**: `qa-hooks-013-3`, 2026-08-25, at `2d90e8a`, for the MEDIUM-1 rider.
**Question**: code review round 23's MEDIUM-1 names one file. Is that the class, or one instance of it?

## Why the question is not pedantic

Round 23 defines the class correctly — *"any formatter that recovers structure by string-splitting
output it could have configured"* — but its **Location** cell names `formatMutationError.ts` and its
**Enumeration** counts the *schemas that can emit* `' | '` (6 union/enum sites). Those are two
different predicates and they return two different sets. qa.md: *derive the sweep predicate from the
class's definition, never from the phrasing of the instances that revealed it.*

## Sweep predicate, and what it excludes

`git grep -n "split(' | ')" 2d90e8a -- src` — sites that **split on the delimiter to rebuild line
structure**. **Excludes**: a differently-spelled delimiter (`'|'`, `' |'`, a variable); a structure
round-trip through `join`/`match`/a regex rather than `split`; anything outside `src`; anything added
after `2d90e8a`.

**The known instance is among the matches** — `formatMutationError.ts:25` — which is the check that
the predicate is derived from the class rather than fitted to the two members it newly found.

## Result — two-sided

**1. The class has three members, not one.**

| Site | splits on the delimiter | calls `generateErrorMessage` |
|---|---|---|
| `src/utils/formatMutationError.ts:25` | yes | yes |
| `src/app/message/_components/NewMessageJsonInput.tsx:112` | yes | yes |
| `src/app/message/m/[id]/_components/JsonModalBody.tsx:149` | yes | yes |

The two JSON surfaces carry the **identical expression**. They are 013's own surfaces.

**2. At `2d90e8a` the collision is not reachable through those two — and the reason is a coincidence
of two sets that nothing enforces.**

```
SUPPORTED_TOP_LEVEL_TYPES       = {1,9,10,12,13,14,17}
topLevelComponentShape members  = {1,9,10,12,13,14,17}
SUPPORTED_CONTAINER_CHILD_TYPES = {1,9,10,12,13,14}
containerChildShape members     = {1,9,10,12,13,14}
```

The lenient filter runs as a `z.preprocess` **before** the shapes and drops every type the union would
have rejected, so `invalid_discriminator` — the one reachable Zod message that *contains* `' | '` —
cannot be produced through `discordMessageImportShape`. **Nothing declares or enforces that equality.**
Add a supported component type without adding a union member and the defect appears at both JSON
surfaces, with no gate to catch it (see code review MEDIUM-2).

**Control, so this is not an argument from absence**: `containerChildShape.parse({type: 99})` — the
union directly, without the filter in front — yields exactly one issue whose message is
`Invalid discriminator value. Expected 1 | 10 | 9 | 12 | 13 | 14`, which the split renders as **six
visible lines from one error**.

**Corroboration, and it is only that**: 13 hand-built payloads driven through the real client import
shape, **0 over-rendering** (predicate: *a single Zod issue rendered as more than one visible line*).
Thirteen payloads cannot prove unreachability and are not offered as proof. **The set equality is what
carries the claim.**

## Consequence for the rider

Close the class at **all three sites**, not at the instance. Round 23's own preferred remedy — format
each issue individually, or pass an explicit delimiter — applies unchanged at all three.

**Pre-registered staleness condition** (so no register row is re-derived twice): if the rider's diff
at `NewMessageJsonInput.tsx` / `JsonModalBody.tsx` stays inside the `catch (err)` block, **no row is
staled**. If it touches anything outside that block at those two files, re-run
`probe-qa-p3-stale-prediction-differential/`.

## Reproduce

```sh
cd /usr/local/bin/hooks/website
rm -rf /tmp/qa013-verify && mkdir -p /tmp/qa013-verify
git archive 2d90e8a | tar -x -C /tmp/qa013-verify
ln -sfn /usr/local/bin/hooks/website/node_modules /tmp/qa013-verify/node_modules
mkdir -p /tmp/qa013-verify/src/utils/__tests__
cp <this dir>/013-qa-p3-delimiter-class-sweep.test.ts /tmp/qa013-verify/src/utils/__tests__/
( cd /tmp/qa013-verify && DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' \
    QA_DELIM_REPORT=/tmp/report.txt \
    npx vitest run src/utils/__tests__/013-qa-p3-delimiter-class-sweep.test.ts )
```

Four assertions, all green at `2d90e8a`. Sections A and B are the load-bearing ones; C is the sweep.
