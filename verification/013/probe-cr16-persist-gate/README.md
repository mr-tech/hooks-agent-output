# probe-cr16 — M8-G's persist gate vs the send floor, and the empty-embed regression

**Reviewed-At**: `66e1974` (website, `chain/013-components-v2-editing-surfaces`). Every function
under test is the **real** one (imported), so this probe reads the tree and expires if the tree
changes.

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr16-persist-gate
# rig: if node_modules is a real dir not a symlink, see the index's "Rig health"
npx vitest run --config vitest.cr16.config.ts      # 21/21 at 66e1974
```

## What M8-G did

`stripKeys` used to `delete casted.data.embeds; delete casted.data.content` whenever V2 components
were present. M8-G (D18) retires that silent deletion — correctly, per the rule that no serialiser
may remove content on its own — and instead gates every persisting writer on `gateBeforePersist`,
which asks the user when `resolveContentLoss` returns **row E** (both V2 and classic content).

## The finding — two definitions of "has classic content" disagree, and the gate is the weaker one

The persist gate decides row E via **`hasClassicContent`** (`src/utils/index.ts:34`): it `.trim()`s
content and, for embeds, keeps only those with a non-empty, non-`_key` field. The **send floor**
(`validateContentRequirements`, `src/utils/limits.tsx:112`) decides mutual-exclusivity via a bare
`!!content.trim() || embeds.length > 0`. **They disagree on empty-ish embeds** (`divergence.txt`,
CR16-A):

| input (with a V2 component) | persist gate asks? | send floor blocks? |
|---|---|---|
| empty embed `{}` — what "Add Embed" appends | **no** | **yes** |
| embed with only an empty title / only a `_key` / empty `fields` | **no** | **yes** |
| two empty embeds | **no** | **yes** |
| whitespace-only content | no | no *(agree — not the class)* |
| real content / real embed | yes | yes *(agree — genuine row E)* |

So a draft carrying a V2 component and an empty embed is **persisted with no choice offered**, then
**rejected by the send floor** — and, because `stripKeys` no longer cleans it, the saved row is
`valid = false` (CR16-B). `validateMessage`'s result feeds the `valid` column
(`server/api/utils/shared.ts:209`), which the **v1 API exposes** — so this degrades
externally-visible state too, not just the UI.

## Reachability — disposition order applied

**Through the editor's own buttons: not reachable.** `showEmbedButton` requires `isClassicMode`,
`showComponentButton` requires `isV2Mode` (`DiscordMessageEditor/index.tsx:201-204`) — mode-exclusive,
so you cannot add both.

**Through paste/import: reachable, and it is a regression** (CR16-E, end-to-end through the real
`discordMessageImportShape`). Every `embedShape` field is `.optional()`, so `{}` survives import, and
`filterSupportedComponents` keeps the V2 component. The imported object then:

- **post-M8-G**: gate does not ask → persists → empty embed **retained** → content-invalid → unsendable;
- **pre-M8-G (control)**: `stripKeys` **deleted** the embed → content-valid → **sendable**.

So for this input class M8-G converts *silently-cleaned-and-sendable* into
*retained-but-unsendable, with no choice shown* — the user gets neither the old convenience nor the
new explicit-choice safety. **This instantiates the plan's own D18 risk** that a gate keyed on a
different predicate than the validator leaves an unguarded gap.

## The fix is NOT to restore the deletion

Re-adding `delete embeds/content` to `stripKeys` would reintroduce exactly the class D18 removed.
The defect is that **two predicates decide the same question and disagree**. Align them: the persist
gate must not wave through anything the send floor will reject — either by having `resolveContentLoss`
use the send floor's notion of "has content", or by cleaning truly-empty embeds at the
editor/import boundary (not the serialiser). See the review document's finding for Preferred vs
Minimum.

## The adversarial half — persist surface stood up and attacked

An isolated instance was built at `66e1974` (`git archive` + `cp -al node_modules` — Turbopack
rejects an out-of-root symlink, per round 7), a **wholly dummy** `.env.local` with
`DATABASE_URL` on dead port `59999` set **also explicitly in the process env** (per probe-cr14),
`next dev -p 3118`. `attack-persist.py` drove the tRPC `message.upsert` boundary with raw sockets.

**Oracle, fixed before the attack**: `UNAUTHORIZED` with no persistence-reach = auth holds; any
`ECONNREFUSED`/`59999`/kysely/postgres/`"result"` = the resolver reached the persistence surface.

**Result** (`attack-persist-out.txt`):
- Row-E body, empty-embed body, batch and non-batch: **401 Unauthorized, no DB reach.** `upsert` is
  a `protectedProcedure`; **an unauthenticated attacker cannot persist.** No new CRITICAL here.
- The server input shape (`optionalIdMessageShape`) carries **no** mutual-exclusivity refinement and
  **no** `filterSupportedComponents` — confirmed by reading `shapes.ts`. So once authenticated, the
  **only** thing between a row-E / divergence payload and the DB is the **client-side** gate. That is
  what makes the CR16 divergence reach persistence for the normal (authenticated) user.
- **Control D reconfirmed CRITICAL-1 live**: an unauthenticated GET on `/api/v1/guilds/…/messages`
  reached the backend (ioredis on the dead port), so the middleware guard `startsWith('/api/v1/*')`
  did **not** fire. Pre-existing, already handoff-dispositioned — **not re-escalated**, recorded only.

## What this probe does NOT establish

- **It does not drive the five React writers.** No headless session, no component harness (the same
  limit round 7 recorded). The raw-socket attack drives the boundary they funnel into. The writers'
  own gate logic is covered at the function level (CR16-A/B/E), not through a rendered component.
- **The authenticated persist was not executed** — it needs a real session this isolated instance
  cannot mint. The reach is argued from the server shape carrying no gate (read, not run against an
  authed session). **Falsity signature**: a hidden server-side refinement rejecting row E would make
  the authenticated persist fail; `shapes.ts` shows none. **Owner: QA**, one authenticated save of a
  pasted V2+empty-embed message, asserting the saved row's `valid` and the send button's state.
- **Whether an empty embed matters to Discord.** An empty embed renders as nothing; the user impact
  is a message that saved but silently won't send, not corrupted output.
