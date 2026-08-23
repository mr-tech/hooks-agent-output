---
UUID: 8311155a
Parent: components-v2-editing-support-2026-08-23.md
Status: Answered
Status-Detail: >-
  Determination reached and executable: the load-edit-save-send-preview loop is Components V2
  capable; every secondary surface that re-serialises message data (Save As, JSON view/copy/Load,
  import from Discord URL / webhook URL / bot code, cross-tab change hash) is V2-blind through two
  2023 helpers the V2 chain never touched. One seam, five sites, three of them silent. Ready for a
  planner to cite; incidence in production and one UI-level confirmation remain open (Gaps table).
---

# Research — is Components V2 supported outside the create-and-send flow?

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-08-23 | researcher | Created from handoff `components-v2-editing-support-2026-08-23.md` (UUID `8f3fa8c3`). Source reading of every flow that reads, writes or re-types message data; 15-assertion execution probe against `website` at `c85945f` (all pass); architect consulted on system fit. Status Answered. |
| 2026-08-23 | researcher | Added "Branch base for the successor effort" at the owner's request: deployed tip `c85945f` vs pre-012 `72dc7de`, both sides argued, determination recorded. Status unchanged. |
| 2026-08-23 | researcher | Context: cross-reference to `json-editor-flag-mint-2026-08-23.md`, the sibling handoff's research, assessed as a rider sub-case. Status unchanged. |

## Question

From the handoff, verbatim in substance: is Components V2 supported anywhere outside the
create-and-send flow, or were the editing paths around it — JSON import, "Save as...",
message-type toggling — never implemented for it? Is it one defect, a family, or an unbuilt half of
a feature? Which flows are affected, is any loss silent, and can the stored representation round-trip
V2 at all?

**Scope instruction honoured**: the handoff directed that this not be narrowed to chain 012 or to the
sibling handoff `json-editor-bad-configurations-2026-08-23.md`. The enumeration below covers every
flow in `website` that touches message `data`, not the 5712 shape. Where chain 012 already
established a fact by execution it is cited, and it was re-derived here rather than inherited.

## Context

- **Roadmap / Master Product Objective: recorded absence.** `agent-output/roadmap/` holds only
  `.gitkeep`; there is no roadmap document to align against, so none is cited.
- **Architecture**: `architecture/system-architecture.md` (read). Its "Data flow" line under
  *website* describes one uniform loop — load via `makeEditable()`, save via key stripping to
  `message.upsert`, send via `sendWebhook()` with the V2 flag. That line is accurate for the primary
  loop and **silent about the second, V2-blind serialiser** this document is about (see System
  Weaknesses). D-001 (single component tree) is a rendering decision; no decision covers
  serialisation.
- **Prior chains**: plan 001 (`planning/closed/001-components-v2-state-management.md`) built V2
  editing, persistence and sending. Its Milestone 4 made the *new-message* JSON paste lenient and
  its item 25 added mode auto-detection to "`NewMessageJsonInput.tsx`, `JsonModalBody.tsx`". It
  named no "Save as", no export, no Discord-URL import. Chain 012 (`planning/012-message-valid-field.md`)
  added the `valid` field, corrected the send gate, and cleared the V2 flag on the V2→classic toggle
  (D11); its QA established by execution that the JSON modal's Load drops `components` and `flags`
  (F-QA8 as corrected, `012-json-editor-repair-path.test.ts`).
- **Tree**: `website` at `c85945f` (master, clean working tree at the time of reading). The owner's
  note that deprecated repos live in `/usr/local/bin/hooks-deprecated/` is acknowledged; none is on
  any code path examined here.
- **Sibling handoff** `json-editor-bad-configurations-2026-08-23.md` is researched separately in
  `json-editor-flag-mint-2026-08-23.md` (UUID `5c1e9d27`), which assesses it as a sub-case of this
  document's invariant and suitable as a rider on the successor effort.
- **Owner's observations** (handoff §"What was observed", numbered 1–7) are treated as reliable
  symptoms and unreliable causes, as the handoff instructs. Each is mapped to a mechanism below.

## Methodology

1. **Enumeration by reference**, not by reading where the owner pointed: every reference to the two
   serialisers `stripKeys` and `standardizeMessage`, to `hashMessage`, and to
   `discordResponseToMessage` was followed (serena `find_referencing_symbols` on
   `website/src/utils/index.ts`), plus every caller of tRPC `message.upsert` and every page under
   `src/app/message`. That yields the flow table below.
2. **Source reading** of each site, cited by path and symbol.
3. **Execution**: a 15-assertion vitest probe (Appendix A) run from `/tmp` against the shipped
   modules — `~/utils`, `~/server/api/utils/shapes`, `~/server/api/utils/messageValidity`,
   `~/utils/discordResponseToMessage`, `~/utils/messageMode` — with the website's own `vitest` and
   `node_modules`, nothing written into the product tree. Result: **15 passed, 15 total**. Each
   finding below names its probe (P1–P10). The `updateMessage` merge was simulated exactly as
   `useApiMethods.updateMessage` does it (top-level spread, then `makeEditable`); chain 012's
   repair-path test exercises the shipped closure itself and agrees.
4. **Architect consult** (read-only, this session) on whether this is one seam or N defects; its
   framing is adopted in Findings §F1 and credited there.
5. **Not done**: no browser run of the app. A UI-level reproduction would need the dev server against
   a database and Pusher/Redis; `.env.local` points at real services and this researcher did not
   start it. Two symptoms are therefore verified at module level and not at the pixel (Gaps G1, G2).

## Findings

Confidence labels: **Verified** (executed — probe named, or a Zod/TS fact executed), **Inference**
(source read, not executed), **Hypothesis** (labelled with a disconfirming test).

### F1 — Shape of the problem: one seam, not N bugs (Verified, framing per architect)

`website` has **two serialisers for message `data`**, and only one of them knows about Components V2.

| Serialiser | Path · symbol | Keeps `components`? | Keeps / sets `flags`? | Age |
|---|---|---|---|---|
| `stripKeys` | `src/utils/index.ts` `stripKeys` | yes (recursively un-keyed) | ORs in `IS_COMPONENTS_V2_FLAG` when V2 components exist; drops `content`/`embeds` then | reworked by plan 001, 2026-04 |
| `standardizeMessage` | `src/utils/index.ts` `standardizeMessage` | **no** — rebuilds from scratch copying only `username`, `avatar_url`, `content`, `allowed_mentions`, `embeds` | **no** | `git log -L` shows last substantive change `4fe53b6` 2023-08-22 ("redesign"); untouched by the V2 chain |

A third helper, `discordResponseToMessage` (`src/utils/discordResponseToMessage.ts`, default
export), converts a Discord API message and reads only `author`, `content`, `embeds` — it never
looks at `components` or `flags`.

The architect's framing, adopted here: `standardizeMessage` is a **lossy display projection** being
used at boundaries that need a **round-trippable transport form** — a persistence write, an editable
seed the user can commit back, and an equality oracle. `discordResponseToMessage` is different in
kind: an **ingress adapter against an external schema with a capability gap**, not a broken
invariant. So the answer to "one defect, a family, or an unbuilt half" is: **one missing invariant
with three violation sites, plus one ingress gap covering three entry points, plus one
client/server filter mismatch on the create path** — six sites, listed in F3.

The owner's hypothesis (V2 built only for create-and-send) is **confirmed in substance and wrong in
one detail**: the primary edit loop *was* built for V2 (F2). What was never built is every surface
that re-serialises `data` by a route other than `stripKeys`.

### F2 — The primary loop is V2-capable (Verified, P10 + P4)

Load for edit (`MessageProvider/index.tsx` effects → `makeEditable`) → edit → save
(`useApiMethods.saveMessage` → `stripKeys` → `message.upsert`) → send (`send/page.tsx` →
`stripKeys` → `sendWebhook`, `with_components=true` when flagged) → preview (`src/app/preview/page.tsx`
→ `makeEditable`; the preview-image generator posts `message.data` unchanged). P10: a stored V2
record round-trips through `makeEditable` → `stripKeys` with all three components intact, the flag
set, no `_key` leakage, and `isMessageValid` true. **The stored JSONB representation is fully capable
of round-tripping V2** — the handoff's fourth "not established" item is settled: the gap is in the
editing surface only.

Mode is derived UI state: `detectMode` in `src/providers/MessageProvider/index.tsx` sets
`messageMode` from structural V2 components on every load; the stored `flags` bit is never an input
to it (Inference from source; consequence exercised in P9). The unsaved-changes indicator
(`hasChanged`, `typedDeepEqual` over `data`) is V2-aware (Inference).

### F3 — Flow enumeration

| # | Flow | Entry | Serialiser / converter | V2 outcome | Loud or silent? | Probe |
|---|---|---|---|---|---|---|
| 1 | Load for edit | `MessageProvider` effects | `makeEditable` | preserved | — | P10 |
| 2 | Save | `useApiMethods.saveMessage` | `stripKeys` | preserved, flag set | — | P10 |
| 3 | Send / edit-send | `send/page.tsx` `sendMessage` | `stripKeys` → `sendWebhook` | preserved | — | P10 (source for the flag query param) |
| 4 | Preview page / preview image | `src/app/preview/page.tsx`; `shared.ts` `postMessagePreviewImage` | `makeEditable` | preserved | — | source |
| 5 | Mode toggle | `DiscordMessageEditor/index.tsx` `handleModeSwitch` → `applyModeSwitch` | by design: →V2 clears content/embeds, keeps components; →classic keeps action rows, clears flag | **loud** (confirmation modal, only when departing data exists) | P9 |
| 6 | **Save As** | `SaveAsMenu.onSubmit` | `standardizeMessage(stripKeys(message).data)` | **components and flags dropped**; payload for a V2 message is `{"username":"Bot"}`; server accepts; record stored `valid=false`; router navigates to the empty copy | **silent** — no error, no warning | **P1** |
| 7 | **JSON view / Copy to Clipboard** | `JsonModalBody` seed (`usePassedProp` initialiser) | `standardizeMessage(stripKeys(message).data)` | seed of a V2 message contains no `components`, no `flags`; Copy copies that | **silent** — the view simply shows a classic-shaped object | **P2** |
| 8 | **JSON Load of the seed** (open modal, press Load, unchanged or lightly edited) | `JsonModalBody` Load `onConfirm` | `enforceImportMutualExclusivity` → `discordMessageImportShape` → `updateMessage` (wholesale `data` replacement, then `makeEditable`) | detected mode **classic**; `data` becomes `{"username":"Bot"}`; mode set classic; composer then reports *"Message must have content, embeds, or components."* | **half-loud**: a confirmation says "This will overwrite the current message" — it does not say the text being loaded has no components | **P3** |
| 9 | JSON Load of hand-authored V2 JSON | same | same | detected **v2**, components kept, content/embeds dropped, flag re-set by `stripKeys` on save; classic JSON over a V2 message yields a clean classic record | works at module level | **P4** |
| 10 | New message from JSON paste | `NewMessageJsonInput` → `NewMessageModal.onSubmit` | client validates the **lenient-filtered** object but forwards the **unfiltered** `cleaned` object (`setMessage(cleaned)`); server validates with the strict `optionalIdMessageShape` | an unsupported top-level type passes the client check and is rejected server-side: *"data.components.0.type: Invalid discriminator value"*; supported V2 JSON is created fine (mode detected on load) | **loud**, wrong layer — the UI shows valid, the save fails | **P6** |
| 11 | Import from Discord message URL | `message.getFromUrl` → `discordResponseToMessage` | converter reads `content`/`embeds` only | a V2 Discord message imports as `{"username":"Hook","content":"","embeds":[]}`; upsert accepted; stored `valid=false` | **silent** | **P5** |
| 12 | Import from webhook URL + message id | `useValidateWebhook` → `discordResponseToMessage` | same converter | same as 11 | **silent** | P5 (same function) |
| 13 | Bot "Get Message" command → code → editor | `bot/serverCommands.ts` `get_message` → `messageStore.store` → `discordResponseToMessage` | same converter; `store`'s `Pick` does not even request `components` | same as 11 | **silent** | P5 (same function), source for the `Pick` |
| 14 | Folder page "copy" of a message | `f/[id]/page.tsx` `copyMessageId` effect → `copy(JSON.stringify(copyData))` | whole `ApiMessage` (id, name, data…) | V2 **is** in the clipboard — but pasting it into either JSON importer yields `{}`: every top-level key is unknown to the shape and Zod strips them; the importer reports valid | **silent** (an empty message is "valid") | **P7** |
| 15 | Cross-tab "message changed elsewhere" detection | `shared.ts` `upsertMessage` (Pusher trigger) ↔ `usePusher` | `hashMessage` → `standardizeMessage` | two V2 messages differing only in components hash **equal**; a V2-only edit in another tab is undetectable | **silent**, cross-session | **P8** |
| 16 | New message from template | `copyIntroMessage` | n/a (classic template) | n/a | — | source |
| 17 | v1 read API, backfill, delete | `pages/api/v1/...`, `scripts/backfillValid.ts`, `message.delete` | read `data` raw | V2 passes through | — | source |

Flows 6, 7, 8, 11–15 are the "editing paths never built for V2". Flows 1–4, 9 are built. Flow 5 is
by design. Flow 10 is a create-path defect unrelated to `standardizeMessage`.

### F4 — Mapping the owner's seven observations to mechanisms

| Obs. | Owner saw | Mechanism | Confidence |
|---|---|---|---|
| 1 | JSON import sets the type to Classic "regardless of what the imported JSON describes" | The JSON the app itself shows (flow 7) never contains components, so loading it — or anything derived from it — detects classic (flow 8). Hand-authored JSON *with* V2 components detects v2 at module level (flow 9). | **Verified** for app-exported JSON (P3). For hand-authored V2 JSON in the edit-page modal: module-level Verified (P4), UI-level **not reproduced** — see Hypothesis H1. |
| 2 | Type switches but the message ends up empty; guessed that clear-on-type-change runs after import | Not ordering: there is no clear step on Load at all. The *seed* is empty of V2 (flow 7); Load replaces `data` wholesale with that seed (flow 8); mode follows the seed. Content is lost before Load is pressed, at the moment the modal opened. | **Verified** (P3) for the V2→classic direction. Classic→V2 by pasting V2 JSON keeps content at module level (P4). |
| 3 | Toggling to V2 clears content, with a prompt | `switchToV2` (`src/utils/messageMode.ts`); modal text in `handleModeSwitch`. Deliberate (plan 001 M8). | **Verified** (P9), by design |
| 4 | No way to remove the V2 indicator without clearing content or hand-editing JSON | Two things: (a) the indicator is **mode**, derived from structure — the only UI control over it is the toggle, which by design removes the other mode's data; (b) a **stranded flag** (flag set, no V2 components — the 5712 shape) is invisible to `detectMode`, shows as Classic, and is cleared only by the toggle round trip (loses content) or a JSON Load (loses components — none in that shape, so lossless). Both routes executed. | **Verified** (P9); (b) agrees with chain 012 QA F-QA1 / plan D13 |
| 5 | "Save as..." on a V2 message is broken | Flow 6: the copy is created without components or flag, `valid=false`, and the user lands on it. | **Verified** (P1) |
| 6 | JSON view may not support V2; import may silently strip | Flow 7: the view is generated by a projection that omits V2. The *import* does not strip V2 (flow 9); the *view* never had it. | **Verified** (P2, P4) |
| 7 | Underlying state not observable; only signal is the V2-vs-content conflict error | No UI renders `flags`; `detectMode` ignores it; the JSON view omits it. The error string comes from `validateContentRequirements` (`src/utils/limits.tsx`), which is the only reader of the stored bit on the client. | **Verified** (P9) that the flag is unobservable by every surface examined |

### F5 — Silent loss: yes, in five flows (Verified)

The handoff asked whether any loss is silent. Flows 6, 11, 12, 13 produce an **empty record with
`valid=false` and no error shown** — the server's `optionalIdMessageShape` accepts an empty `data`
(P1, P5), `isMessageValid` computes false, and the create/save-as UI navigates to the new message as
a success. Flow 15 is silent by construction. Flow 14 reports the pasted export as valid while
discarding all of it (P7). Flow 8's loss is announced by a generic overwrite confirmation that does
not name what is missing.

### F6 — Incidence in production: partly bounded, origin unknown (Observed + Hypothesis)

Chain 012's backfill report (`verification/012/backfill-report-1787522866564-i3s31k.md`, run over
all 4825 rows) shows **29 rows** failing *"Message must have content, embeds, or components."* —
exactly the shape flows 6, 11, 12, 13 produce. It does not record how many rows carry V2 at all, nor
which path wrote the 29.

**Hypothesis H2 (Medium)**: a material share of those 29 are Save-As copies or Discord-URL imports of
V2 messages. *Disconfirming test*: for each of the 29 ids, compare `name` against sibling rows — a
`"<name> Copy"` (the `SaveAsMenu` default) with a V2 sibling of the same base name is a Save-As
casualty; `createdAt` adjacency to a V2 row is the second signal. Read-only SQL; owner-run (no session
queries the DB — steering docket). *Missing telemetry*: nothing records which surface wrote a row.

## System Weaknesses

1. **A display projection on write boundaries.** `standardizeMessage` reaches `message.upsert`
   (Save As), a user-committable editor seed (JSON modal), and a change oracle (`hashMessage`). The
   architect's invariant, stated so a planner can make it checkable — *projection confinement*: the
   output of a display projection never crosses a write boundary, never seeds a control whose value
   can be committed, never feeds change detection; *round-trip closure*: for stored `data` d,
   `stripKeys(makeEditable({data: d})).data ≡ d` modulo `_key`s. The JSON modal specifically is a
   round-trip editor whose read and write serialisers are different functions — lossy read plus
   total write is the destructive combination.
2. **Ingress adapters frozen at the 2023 Discord schema.** `discordResponseToMessage` and the bot's
   `messageStore.store` `Pick` type predate V2 and were not in plan 001's scope.
3. **Client-side lenient validation, server-side strict storage, different objects.**
   `NewMessageJsonInput` validates the filtered object and forwards the unfiltered one.
4. **Mode is derived from structure only; the stored flag has no UI representation.** Any record
   whose flag disagrees with its structure is invisible until the send gate refuses it (chain 012
   territory; recorded here because it is the mechanism behind observation 7).
5. **An empty `data` is a storable, "successful" message.** Every silent-loss flow terminates in a
   valid-looking success because the server has no floor on content; `valid=false` is computed but
   never shown to the writer.
6. **Evergreen doc gap**: `system-architecture.md` "Data flow" implies one serialiser. A planner
   reading only that line will assume the data layer is uniform. This is the architect's point (d);
   the doc is the architect's to correct.

## Instrumentation Gaps

| Signal | Class | What it would have shown |
|---|---|---|
| On `message.upsert`: log `{surface, hadComponentsIn, hadComponentsOut, flagsIn, flagsOut, valid}` where `surface` is a client-supplied tag (save / save-as / new-from-json / new-from-url / new-from-code) | **normal** — one structured line per save, low volume, no payload | Which surface writes empty or de-V2'd records; would have attributed the 29 rows on day one |
| Toast or inline notice when an upsert stores `valid=false` from a create/save-as path | **normal** (user-facing, actionable) | Turns flows 6, 11–13 from silent to loud without changing what is stored |
| Debug dump of `standardizeMessage` input vs output when they differ in `components`/`flags` | **debug** — opt-in, only while the seam exists | Confirms every projection-on-write site in a live session |
| Pusher `message-update` payload including a V2-aware hash | **normal** | Makes flow 15 observable; today the hash is computed but blind |

## Recommendations (investigation only)

1. **Owner-run read-only query on the 29 empty rows** (H2's disconfirming test) — names, `createdAt`,
   and a count of rows with `(data->>'flags')::int & 32768 <> 0` to size the V2 population. This is
   the only remaining fact that changes *priority*; it changes nothing about *shape*.
2. **One UI-level confirmation by the owner** for H1 below (two minutes in the product).
3. Nothing else is needed before planning; the flow table is the enumeration the handoff asked for.

## Hypotheses (labelled)

**H1 (Low, and only about a residual)** — that hand-authored V2 JSON loaded through the edit-page
modal comes up Classic *in the UI*, contrary to P4. *Disconfirming test*: on any saved message, open
Message JSON, replace the text with `{"components":[{"type":10,"content":"probe"}]}`, Load; expected
per P4 is the editor in Components V2 mode showing the text display. If the owner sees Classic, the
gap is between `setMessageMode` and render, not in the modules probed. *Missing telemetry*: none
needed — it is a direct observation.

**H2** — see F6.

## Remaining Gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G1 | UI-level behaviour of hand-authored V2 JSON in the edit-page modal (H1) | No browser run; `.env.local` targets live services | Owner performs H1's two-minute check | owner |
| G2 | Whether observation 2 has a second trigger beyond loading the app's own seed | Same | Same check, classic→V2 direction (paste V2 JSON over a classic message; expect components shown, content gone) | owner |
| G3 | How many of the 29 empty rows came from Save As / URL import; size of the V2 population | No session queries the DB | Read-only SQL per Recommendation 1 | owner |
| G4 | Whether `detectMode` leaving the prior mode standing when `data.components` is absent ever surfaces (architect's note) | Depends on whether the `m/[id]` layout remounts on id change — not verified | Low value; note for the planner, not a blocker | planner |

## Open Questions

None that block planning. G1–G3 refine priority and guidance text; the determination stands without
them.

## Branch base for the successor effort (owner-requested rationale, 2026-08-23)

The owner asked, after the determination above, whether the successor chain (013 by `.next-id`
sequence; the planner mints it) is better continued off "the current 012 branch" or branched off
prior to 012, fixed, and reconciled afterwards. Recorded here because the answer rests on facts this
document established. It is a rationale about *where to base a tree*, not a plan.

**Premise corrected first.** There is no 012 branch distinct from master: `chain/012-message-valid-field`
and `master` both stand at `c85945f` (verified `git branch -v`, 2026-08-23), that commit is deployed
(Vercel deploys `master` on contact — deployment record `012-message-valid-field-deployment.md`), and
the `valid` column exists in production (owner-attested). The real choice is **base 013 on the
deployed tip `c85945f`** versus **base it on `72dc7de`, the last pre-012 commit, and merge later**.

**For the deployed tip**

1. *This research is bound to that tree.* Every probe assertion ran at `c85945f`. Two of the
   mechanisms behind observations 4 and 7 — `applyModeSwitch` clearing the flag on toggle-back
   (chain 012 D11) and `validateContentRequirements` reading the stored flag — do not exist at
   `72dc7de`: `src/utils/messageMode.ts` is a 012 file and `src/utils/limits.tsx` was changed by 012.
   A pre-012 base means re-deriving the findings against a tree that will never ship.
2. *013's acceptance criteria only express on top of 012.* "Save As of a V2 message yields a copy that
   is not `valid=false`" needs `upsertMessage` computing `valid` (012's `shared.ts`). The 29 empty
   rows (F6) were measured by 012's instrument. Pre-012, QA cannot assert the thing the effort exists
   to change.
3. *013 is the "next touch" 012 deferred to.* D10 parked save-path flag normalisation on-next-touch;
   D13 points repair guidance at the JSON modal — the surface 013 rewrites. These are semantic
   dependencies, not merely file overlap.
4. *The overlap is at the seams, not the sites.* 012 touched 19 files (`git diff --stat 72dc7de
   c85945f`). 013's core sites — `standardizeMessage`, `SaveAsMenu`, `JsonModalBody`,
   `discordResponseToMessage`, `messageStore`, `NewMessageJsonInput` — are none of them. But 013 will
   brush `shared.ts`, `limits.tsx`, `messageMode.ts`, `DiscordMessageEditor/index.tsx` and
   `package.json`/`pnpm-lock.yaml`, all 012 files. A pre-012 base guarantees a real merge in exactly
   those files.
5. *QA verdicts bind to a tree* (`Verified-At`). A verdict on a pre-012 branch expires when 013 merges
   master; the choice is QA twice or QA only after the merge — which is the deployed-tip option with
   extra steps.
6. *Shared-tree cost.* One tree, one branch, several sessions. Checking out `72dc7de` reverts the
   project-utils pin (`49f2bf1`, `749606d`) and the lockfile under every live session, and
   `node_modules` no longer matches. The merge back is a merge commit or a rebase — the latter a
   history rewrite needing a single owner over a clean tree — and today every push is a fast-forward.

**For a pre-012 base**

1. *Isolation from a 012 rollback* — the only substantive argument. Nothing in the record points that
   way: post-release checks are queued and owner-executed, not failing; the release reconciled exact
   in both repos; the column is live. And 012 is not cleanly revertible (schema in `project-utils`,
   backfilled data), so "revert 012, keep 013" would be its own effort, not a branch choice.
2. *A cleaner diff for review* — weak; a branch off `c85945f` has an equally clean diff, only the base
   differs.
3. *Independent hotfix cadence* — moot; 013 cannot deploy without merging `master`, which has 012.

**Determination.** Base 013 on `c85945f`. The pre-012 option buys isolation from a rollback nobody is
proposing and pays for it with a guaranteed seam merge, an expiring QA verdict, a checkout that moves
the lockfile under every live session, and findings re-derived against an unshippable tree. If a 012
rollback ever becomes a live question, revisit then, as its own decision, with the DB column on the
table.

**One decision that stays the owner's**: whether 013 *starts* before 012's queued post-release checks
(backfill review → live declaration → statbot gate deploy) are done. Starting is safe — nothing in
013 changes what those checks measure. A 013 *release* before the statbot gate deploys would change
the `valid` population under a gate not yet declared live; that ordering is chain 012's D12 and is
not this document's to relax.

## Appendix A — Execution probe (reproducible)

Run from outside the product tree with the website's own toolchain; 15 passed at `c85945f`.

`/tmp/v2probe/vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
const WEBSITE = '/usr/local/bin/hooks/website';
export default defineConfig({
  root: '/tmp/v2probe',
  envDir: WEBSITE,
  resolve: { alias: { '~': `${WEBSITE}/src`, 'bot': `${WEBSITE}/bot` } },
  test: { include: ['*.test.ts'], setupFiles: ['/tmp/v2probe/setup.ts'], environment: 'node' },
});
```
`/tmp/v2probe/setup.ts` loads `website/.env.local` through the website's `dotenv`
(`~/constants` imports `env.mjs`, which validates the environment at import time):
```ts
import { config } from '/usr/local/bin/hooks/website/node_modules/dotenv/lib/main.js';
config({ path: '/usr/local/bin/hooks/website/.env.local' });
```
Command: `cd /usr/local/bin/hooks/website && npx vitest run --config /tmp/v2probe/vitest.config.ts`

`/tmp/v2probe/v2-editing.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { IS_COMPONENTS_V2_FLAG } from '~/constants';
import { discordMessageImportShape, optionalIdMessageShape } from '~/server/api/utils/shapes';
import { isMessageValid } from '~/server/api/utils/messageValidity';
import {
  enforceImportMutualExclusivity, hashMessage, makeEditable, standardizeMessage, stripKeys,
  validateContentRequirements, hasV2Components,
} from '~/utils';
import discordResponseToMessage from '~/utils/discordResponseToMessage';
import { applyModeSwitch } from '~/utils/messageMode';

const V2_COMPONENTS = [
  { type: 10, content: 'Hello from V2' },
  { type: 14, divider: true, spacing: 1 },
  { type: 17, components: [{ type: 10, content: 'inside container' }] },
];
const storedV2 = { id: '1', name: 'V2 msg', guildId: null,
  data: { username: 'Bot', components: V2_COMPONENTS, flags: IS_COMPONENTS_V2_FLAG } } as unknown as ApiMessage;
const storedClassic = { id: '2', name: 'Classic msg', guildId: null,
  data: { username: 'Bot', content: 'hello classic', embeds: [{ title: 'T', description: 'D' }] } } as unknown as ApiMessage;
// Simulates useApiMethods.updateMessage: top-level spread then makeEditable.
function updateMessage<T extends object>(old: T, patch: object) {
  return makeEditable({ ...old, ...patch, updatedAt: 0 } as never);
}

describe('P1 Save As (SaveAsMenu.onSubmit payload)', () => {
  it('drops components and flags from a V2 message; server accepts; record is invalid', () => {
    const payload = standardizeMessage(stripKeys(makeEditable(storedV2)).data);
    expect(payload.components).toBeUndefined();
    expect(payload.flags).toBeUndefined();
    const parsed = optionalIdMessageShape.parse({ name: 'V2 msg Copy', guildId: null, data: payload });
    expect(parsed.data.components).toBeUndefined();
    expect(isMessageValid(parsed.data)).toBe(false);
  });
  it('round-trips a classic message', () => {
    const payload = standardizeMessage(stripKeys(makeEditable(storedClassic)).data);
    expect(payload.content).toBe('hello classic');
    expect(payload.embeds?.length).toBe(1);
    expect(isMessageValid(payload)).toBe(true);
  });
});

describe('P2 JSON view / Copy to Clipboard (JsonModalBody seed)', () => {
  it('seeds the editor with no components for a V2 message', () => {
    const seed = JSON.stringify(standardizeMessage(stripKeys(makeEditable(storedV2)).data), null, 2);
    expect(seed).not.toContain('components');
    expect(seed).not.toContain('flags');
    expect(discordMessageImportShape.parse(JSON.parse(seed)).components).toBeUndefined();
  });
});

describe('P3 JSON Load of the unchanged seed on a V2 message', () => {
  it('detects classic, replaces data, V2 content is gone', () => {
    const editable = makeEditable(storedV2);
    const seed = standardizeMessage(stripKeys(editable).data);
    const { data: cleaned, detectedMode } = enforceImportMutualExclusivity(seed);
    const next = updateMessage(editable, { data: discordMessageImportShape.parse(cleaned) as MessageData });
    expect(detectedMode).toBe('classic');
    expect(next.data.components).toBeUndefined();
    expect(next.data.flags).toBeUndefined();
    expect(validateContentRequirements(next.data)).toBe('Message must have content, embeds, or components.');
  });
});

describe('P4 JSON Load of hand-pasted V2 JSON (positive case)', () => {
  it('detects v2, keeps components, drops content; stripKeys re-sets the flag on save', () => {
    const { data: cleaned, detectedMode } = enforceImportMutualExclusivity({ content: 'stale', components: V2_COMPONENTS });
    const next = updateMessage(makeEditable(storedClassic), { data: discordMessageImportShape.parse(cleaned) as MessageData });
    expect(detectedMode).toBe('v2');
    expect(next.data.components?.length).toBe(3);
    expect(next.data.content).toBeUndefined();
    expect(next.data.embeds).toBeUndefined();
    const saved = stripKeys(next);
    expect(saved.data.flags! & IS_COMPONENTS_V2_FLAG).toBe(IS_COMPONENTS_V2_FLAG);
    expect(validateContentRequirements(saved.data)).toBeUndefined();
  });
  it('pasting classic JSON over a V2 message yields a clean classic message', () => {
    const { data: cleaned, detectedMode } = enforceImportMutualExclusivity({ content: 'now classic', embeds: [{ title: 'x' }] });
    const next = updateMessage(makeEditable(storedV2), { data: discordMessageImportShape.parse(cleaned) as MessageData });
    expect(detectedMode).toBe('classic');
    expect(next.data.flags).toBeUndefined();
    expect(next.data.content).toBe('now classic');
    expect(validateContentRequirements(next.data)).toBeUndefined();
  });
});

describe('P5 Import from Discord URL / webhook URL / bot code (discordResponseToMessage)', () => {
  it('silently drops V2 components of a Discord V2 message', () => {
    const converted = discordResponseToMessage({
      author: { id: '1', username: 'Hook', avatar: null, discriminator: '0' },
      content: '', embeds: [], components: V2_COMPONENTS, flags: IS_COMPONENTS_V2_FLAG,
    } as never);
    expect((converted as MessageData).components).toBeUndefined();
    expect((converted as MessageData).flags).toBeUndefined();
    const parsed = optionalIdMessageShape.parse({ name: 'imported', guildId: null, data: makeEditable({ data: converted }).data });
    expect(isMessageValid(parsed.data)).toBe(false);
  });
});

describe('P6 New-message JSON paste (NewMessageJsonInput) forwards the unfiltered object', () => {
  it('lenient client validation passes, but the stored object still carries the unsupported component', () => {
    const pasted = { content: 'hi', components: [
      { type: 3, custom_id: 'sel', options: [] },
      { type: 1, components: [{ type: 2, style: 5, url: 'https://x.y', label: 'L' }] } ] };
    const { data: cleaned } = enforceImportMutualExclusivity(pasted);
    expect(() => discordMessageImportShape.parse(cleaned)).not.toThrow(); // what the UI checks
    const forwarded = makeEditable({ data: cleaned as MessageData }).data; // what is upserted
    expect(forwarded.components?.some((c) => (c as { type: number }).type === 3)).toBe(true);
    expect(optionalIdMessageShape.safeParse({ name: 'n', guildId: null, data: forwarded }).success).toBe(false);
  });
  it('top-level thumbnail (11) hard-rejects on the lenient path', () => {
    const { data: cleaned } = enforceImportMutualExclusivity({ components: [{ type: 11, media: { url: 'https://x.y/a.png' } }] });
    expect(() => discordMessageImportShape.parse(cleaned)).toThrow();
  });
});

describe('P7 Pasting a folder "copy" export (whole ApiMessage) into import', () => {
  it('is accepted as an empty message — every key is unknown to the shape', () => {
    const { data: cleaned } = enforceImportMutualExclusivity(JSON.parse(JSON.stringify(storedV2)));
    expect(Object.keys(discordMessageImportShape.parse(cleaned))).toEqual([]);
  });
});

describe('P8 hashMessage (Pusher cross-tab change detection)', () => {
  it('is blind to component-only differences', () => {
    const a = { name: 'n', data: { components: V2_COMPONENTS, flags: IS_COMPONENTS_V2_FLAG } } as unknown as ApiMessage;
    const b = { name: 'n', data: { components: [{ type: 10, content: 'DIFFERENT' }], flags: IS_COMPONENTS_V2_FLAG } } as unknown as ApiMessage;
    expect(hashMessage(a)).toBe(hashMessage(b));
  });
});

describe('P9 Mode toggle and the stranded flag (observations 3, 4, 7)', () => {
  it('classic→v2 clears content/embeds', () => {
    const next = applyModeSwitch('v2', storedClassic.data);
    expect(next.content).toBe('');
    expect(next.embeds).toEqual([]);
  });
  it('v2→classic keeps only action rows and clears the flag', () => {
    const next = applyModeSwitch('classic', { ...storedV2.data, components: [...V2_COMPONENTS, { type: 1, components: [] }] } as never);
    expect((next.components as { type: number }[]).every((c) => c.type === 1)).toBe(true);
    expect(next.flags! & IS_COMPONENTS_V2_FLAG).toBe(0);
  });
  it('a stranded flag is invisible to mode detection and only visible via the send-gate error', () => {
    const stranded = { content: 'hi', flags: IS_COMPONENTS_V2_FLAG, components: [] } as MessageData;
    expect(hasV2Components(stranded.components as never)).toBe(false); // detectMode → classic
    expect(validateContentRequirements(stranded)).toBe('Components V2 messages cannot contain embeds or content.');
    const seed = standardizeMessage(stripKeys({ data: stranded } as never).data);
    const { data: cleaned } = enforceImportMutualExclusivity(seed);
    const viaJson = updateMessage({ data: stranded }, { data: discordMessageImportShape.parse(cleaned) });
    expect(viaJson.data.flags).toBeUndefined();
    expect(viaJson.data.content).toBe('hi');
    const viaToggle = applyModeSwitch('classic', applyModeSwitch('v2', stranded));
    expect(viaToggle.flags! & IS_COMPONENTS_V2_FLAG).toBe(0);
    expect(viaToggle.content).toBe('');
  });
});

describe('P10 Primary loop (load → save → send) is V2-capable', () => {
  it('makeEditable → stripKeys round-trips components and sets the flag', () => {
    const saved = stripKeys(makeEditable(storedV2));
    expect(saved.data.components?.length).toBe(3);
    expect(saved.data.flags! & IS_COMPONENTS_V2_FLAG).toBe(IS_COMPONENTS_V2_FLAG);
    expect(JSON.stringify(saved.data)).not.toContain('_key');
    expect(isMessageValid(saved.data)).toBe(true);
  });
});
```

Recorded outputs (from the verbose run): P1 payload `{"username":"Bot"}`; P3 after Load
`{"username":"Bot"}` mode `classic`; P5 converted `{"username":"Hook","content":"","embeds":[]}`;
P6 server rejection `data.components.0.type: Invalid discriminator value. Expected 1 | 10 | 9 | 12 | 13 | 14 | 17`;
P7 validated `{}`.
