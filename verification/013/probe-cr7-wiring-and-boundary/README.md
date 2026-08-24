# CR7 — the M2+M8 Load wiring, the persist boundary, and the adversarial run

**Round 7, `Reviewed-At: 87cfbd8`.** Covers `816d7fd..87cfbd8` — both the round-6 fix round **and**
`a3e758b`, the M2+M8 Load wiring, which no earlier round reviewed.

Run the unit half: `npx vitest run --config vitest.cr7.config.ts` (symlink `node_modules` first).
Result at `87cfbd8`: **17/17**. Captured: `run-cr7-87cfbd8.txt`.
The adversarial half needs a running instance — see below. Captured: `run-attack-87cfbd8.txt`.

## What the unit half establishes

| id | check | result |
|---|---|---|
| CR7-A | the persist input shape (`messageShape`) accepts six **5712-shaped** payloads — the shape D19 exists to abolish | **6/6 accepted** |
| CR7-A | **negative control** — the same validator rejects an empty name and a negative `flags` | rejects, so acceptance is a real signal |
| CR7-B | `SUPPORTED_TOP_LEVEL_TYPES` is `{1} ∪ V2_COMPONENT_TYPE_VALUES` exactly, so `switchToClassic`'s `type===1` filter and `hasV2Components` are exact complements on the Load path | confirmed — a hypothesis of mine that turned out **wrong**, and the code right |
| CR7-B | `filterSupportedComponents` silently drops unsupported top-level components **before** the resolver sees them; the draft then reports row A, no notice, no choice | demonstrated |
| CR7-C | the round-6 stale-label replay is unrepresentable — no label crosses into `applyDisposition` | confirmed |
| CR7-C | the guard, re-attacked: every falsy non-mode value throws `/chosenMode/` | 6/6 |
| CR7-C | **guard hole**: a truthy non-mode string (`'V2'`) is accepted and falls through to Classic | demonstrated — disposed of at step 1 of the input-robustness order, see the review |
| CR7-D | `describeDropSet` renders the partial-components case **truthfully** ("your Components V2 components"; the Action Row survives) | confirmed — resolves round 6's INFO-2 |

## The adversarial half

`attack-upsert.py` and `attack-v1.py` drive **raw sockets** — no client library, so nothing
percent-encodes, canonicalises or repairs the bytes on the way in.

**Safety constraint, and it shaped everything.** This repository's `.env.local` points at a
**remote hosted database**. Driving mutations into that is not review. The instance ran from an
isolated `git archive` extraction with a wholly dummy environment and
`DATABASE_URL=…@127.0.0.1:59999`, a dead port — so every persistence attempt fails closed **and is
observable**, which is what makes the oracle work. There is also **no `schema.prisma` anywhere in
this repository**, so a database-backed instance cannot be built from it at all; that bounds what
any adversarial round here can reach.

**Oracle, fixed before attacking**: auth *held* iff the response says `UNAUTHORIZED` and nothing
shows the resolver ran; auth *bypassed* iff anything shows it executing — a DB reach attempt or a
success payload. Asserted on the response **and** the server log, never on a status code alone.

**`message.upsert`: 42 cases, 0 bypasses.** Methods (incl. TRACE and an invented verb), path
encodings, dot segments, doubled separators, casings, `%00`/`%20`, batch orderings, six content
types, duplicate and conflicting headers, forged `Authorization`, forged `X-Forwarded-*`, forged
`next-auth` and `__Secure-next-auth` session cookies, forged `Host`. `enforceUserIsAuthed` held
throughout. **A negative result, and worth having.**

**`/api/v1/guilds/…`: the guard never fires — CRITICAL-1.** See the review document. The finding is
**pre-existing and outside chain 013**; it was found by enumerating what the entry point branches on
at module scope before attacking, which is a required step of that attack rather than a digression.

## Reproducing the adversarial half

```
git archive 87cfbd8 | tar -x -C /tmp/cr7-run && cd /tmp/cr7-run
cp -al <website>/node_modules node_modules          # cp -al: Turbopack rejects an out-of-root symlink
# write a wholly dummy .env.local; DATABASE_URL MUST point at a dead local port
npx next dev -p 3117
python3 attack-upsert.py ; python3 attack-v1.py
```

Do **not** point this at the repository's real `.env.local`.

## What this probe does NOT establish

- **Nothing about the React callbacks.** `commitSettled`/`commitChoice`/`cancelChoice` are driven
  nowhere; no component harness exists here (the plan's assumption 5). That residue is round 7's
  Assumption Not Checked: a re-render between choice and commit.
- **Nothing about any deployed environment.** Whether an edge layer blocks `/api/v1/*` in production
  is untested and was not attempted.
- **Nothing about database-level constraints.** No schema lives in this repository; that population
  is uncovered and its fallback owner is whoever owns `project-utils`.
