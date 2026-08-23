---
UUID: 5c1e9d27
Parent: json-editor-bad-configurations-2026-08-23.md
Status: Answered
Status-Detail: >-
  All three of the handoff's questions have determinations by execution: the JSON editing path
  (edit-page modal and new-message paste alike) stores a 5712-shaped record from hand-typed
  flags, through the same upsert the composer uses; the stored population is two rows. Origin of
  those two rows is not attributable from the tree. Assessed suitable as a rider on the
  components-v2 editing effort — it is a sub-case of that effort's invariant, not a separate one.
---

# Research — can the JSON editor store configurations the composer would refuse?

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-08-23 | researcher | Created from handoff `json-editor-bad-configurations-2026-08-23.md` (UUID `cb83fd7b`), at the owner's request to assess it as a rider on the components-v2 editing effort. Five-assertion execution probe against `website` `c85945f`, all pass. Status Answered. |

## Question

From the handoff, its three research questions:

1. Can the JSON editing path write a stored record the corrected composer send gate would refuse —
   specifically `flags: 32768` + content + no V2 components (the 5712 shape)?
2. Does the JSON path go through the same save code as the composer, or around it?
3. Do such records exist in production beyond message 5712, and did they come from that path?

And the owner's question that prompted this document: is the handoff **suitable as a rider** on the
effort seeded by `components-v2-editing-support-2026-08-23.md` (researched in
`components-v2-editing-flows-2026-08-23.md`, UUID `8311155a`)?

## Context

- Chain 012 rulings that bind here (`planning/012-message-valid-field.md`, Decisions Register, read
  directly): **D9** — this question is a different effort from 012, a handoff, researched later;
  **D10** — save-path flag normalisation stays out of 012, "leave it out, note it", an on-next-touch
  note; **D11** — the V2→classic toggle clears the flag; **D18** — 012 ships as is, no scope
  expansion. D9 separates this question from *012*; it says nothing about which later effort carries
  it.
- The handoff's own Review-Trigger names the closing condition: *"if anyone proposes flag
  normalisation on the save path — that change would close this question by construction."*
- The handoff's "pointers, not findings" (from `planner-hooks-012`) named exactly the open question
  answered in F1 below: whether `enforceImportMutualExclusivity` clears or preserves a stray flags bit
  when the structure is classic.
- Its two "findings established by execution" (JSON Load drops `components`/`flags`; Thumbnail 11
  hard-rejects on the lenient path) were **re-derived independently** in the sibling research
  document (its probes P3 and P6) and agree.
- Roadmap: recorded absence (`agent-output/roadmap/` is empty).

## Methodology

Source reading of the two import surfaces (`JsonModalBody` Load, `NewMessageJsonInput` →
`NewMessageModal.onSubmit`), the reconciler `enforceImportMutualExclusivity` and the serialiser
`stripKeys` (`website/src/utils/index.ts`), the import shape `discordMessageImportShape` and the
server input `optionalIdMessageShape` (`src/server/api/utils/shapes.ts`), and the write path tRPC
`message.upsert` → `upsertMessage` (`src/server/api/utils/shared.ts`). Then a five-assertion vitest
probe (Appendix A) run from `/tmp` against the shipped modules with the website's own toolchain and
`.env.local` — harness identical to the sibling document's Appendix A. **5 passed, 5 total** at
`c85945f`. The `updateMessage` merge is simulated as `useApiMethods.updateMessage` performs it.

## Findings

### F1 — Yes: hand-typed flags mint a 5712-shaped record on both JSON surfaces (Verified, Q1/Q1b)

`enforceImportMutualExclusivity` detects mode **structurally only** (`hasV2Components` over
`components`). For `{content: 'hi', flags: 32768}` it returns mode `classic` and **preserves the
flag** — it spreads the object and touches only `content`/`embeds` (V2 case) or filters V2 types out
of `components` (classic case); `flags` is never read. `discordMessageImportShape` accepts `flags` as
any non-negative integer. `updateMessage` replaces `data` wholesale; `stripKeys` on save leaves
`flags` alone when no V2 components exist. `optionalIdMessageShape` accepts the result. The stored
record is `{content: 'hi', flags: 32768}` — 5712's shape — with `valid=false` computed by
`upsertMessage`, and **no error at any step**: the modal's validity indicator is green, Load succeeds,
Save succeeds. Only the *send* page refuses it, with *"Components V2 messages cannot contain embeds
or content."* The same holds with an action row present (classic structure, stray flag), and on the
new-message paste path.

So the planner's open question resolves as the handoff's own worse branch: **import is a mint for
5712-shaped records.**

**Bound on reach (Verified, Q1 third case):** the mint needs the flag to be *typed* into the editor.
The modal's seed (`standardizeMessage`) never carries `flags`, so an unedited open-and-Load round trip
cannot produce it — that round trip is the *lossless repair* chain 012's D13 relies on, and this
document confirms it stays lossless for the flag.

**Wider than 32768 (Verified, Q1c):** any integer is stored verbatim — `4` (SUPPRESS_EMBEDS), `4096`
(SUPPRESS_NOTIFICATIONS), combinations. Nothing in the shape, the reconciler, or the send gate reasons
about flag bits other than `IS_COMPONENTS_V2_FLAG`. Whether other bits are wanted is a product
question, not a defect claim.

### F2 — Same save code, not around it (Verified by source + Q1 server-shape assertion)

Both JSON surfaces end in tRPC `message.upsert` → `upsertMessage`, the same mutation the composer's
Save uses (`useApiMethods.saveMessage`). Consequently every record the JSON path writes has `valid`
recomputed — chain 012's blast-radius fact holds. There is no bypass of the validity computation; there
is a bypass of the *composer's* structural guarantee, because the composer never lets a user set
`flags` and the JSON editor does.

### F3 — Population and origin (Observed; origin is a gap)

Chain 012's backfill over all 4825 rows (`verification/012/backfill-report-1787522866564-i3s31k.md`)
records `flagStructureDisagreement` = **2** rows: `5712` and `5842`; `flagStructureDisagreementValidTrue`
= 0. So the shape exists beyond 5712 by exactly one row. **Which path wrote either row is not
derivable from the tree**: no write surface is recorded on the row, and the tree has (at least) two
producers — this JSON mint and, pre-D11, the mode-toggle round trip (chain 012 D5's composer bug, now
fixed). Row 5842 is already the owner's U-4 item (steering docket).

### F4 — Suitability as a rider on the components-v2 editing effort (determination)

**Suitable — and closer than a rider: it is a sub-case of that effort's invariant.** The sibling
document's architect-derived invariant has two clauses — projection confinement, and round-trip
closure — and the architect's third note was that *`flags` is a derived output of structure, never an
input* (`detectMode` reads structure only). F1 is precisely a violation of that third statement at the
one surface where a user can write `flags` directly. Fixing the JSON modal as that effort must (one
serialiser both directions; the seed carrying `components`) rewrites `JsonModalBody` and touches
`enforceImportMutualExclusivity`; deciding what that reconciler does with a stray flag is unavoidable
in the same edit. A separate chain would re-open the same three files immediately after.

Arguments **for** the rider:

1. Same files, same function, same invariant (`enforceImportMutualExclusivity`, `JsonModalBody`,
   `NewMessageJsonInput`, `stripKeys`). The V2 effort cannot define the JSON modal's acceptance
   criteria without stating what happens to a typed flag.
2. The handoff's Review-Trigger says a save-path normalisation proposal closes it by construction, and
   D10 parked exactly that as "on-next-touch". The V2 editing effort is that next touch.
3. Its research half is now done (F1–F3); what remains is a decision and an implementation site, not
   an investigation.
4. Population is two rows; as its own chain it would be the smallest effort in the repository, carrying
   full-pipeline overhead for one reconciler clause.

Arguments **against**, and why they do not decide it:

1. *The owner's instruction that the V2 research not be narrowed to this handoff's framing.* That
   governed the research, which is complete and was not narrowed (its flow table has seventeen rows;
   this shape is one). A plan absorbing a sub-case after the enumeration exists is the opposite of
   re-narrowing.
2. *D10 declined normalisation.* D10 declined it **for 012** and explicitly deferred it to the next
   touch; it is not a standing decline. Whether the next touch normalises on save, rejects at import,
   or clears in the reconciler is the owner's decision — the rider does not pre-empt it, it brings it
   to the table where the same files are already open.
3. *Scope growth.* The V2 effort already has six sites; this adds one clause to a function it must
   touch anyway. Negligible against the cost of a second chain over the same files.
4. *Origin of the two rows unknown.* True, and irrelevant to the fix: the mint is proven live
   regardless of who used it.

**What the rider must not do**: absorb the 5712 *framing* (statbot, the `valid` field, D5) — those are
012's and are released. The rider is one clause: *what the JSON reconciler does with a `flags` bit that
disagrees with structure.*

**One decision that is the owner's** (not a technical determination — it is product direction): which
of three shapes the clause takes — (a) reject at import with a message naming the conflict,
(b) clear the stray bit silently as the toggle now does (D11's analogue), or (c) normalise on the
save path for every writer (D10's deferred option, which also closes the sibling's flow 15 hash and
any future writer). The planner should put this as a selection prompt; this document does not choose.

## System Weaknesses

1. `flags` is user-writable through JSON and read by nothing except the send gate; no layer owns its
   consistency with structure. (The sibling document's Weakness 4, seen from the write side.)
2. Import validation is a shape check; the reconciler enforces content/embed exclusivity but not flag
   exclusivity, so the "mutual exclusivity" it promises in its doc comment is structural only.

## Instrumentation Gaps

| Signal | Class | What it would show |
|---|---|---|
| On `message.upsert`, a structured line `{surface, flagsIn, hasV2Structure, valid}` | **normal** | Attributes any future flag/structure disagreement to its writer — closes F3's gap prospectively |
| Import-time notice when a typed `flags` bit disagrees with structure | **normal**, user-facing | Turns the mint from silent to loud without deciding the normalisation question |

## Remaining Gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G1 | Which path wrote rows 5712 and 5842 | No write-surface record on rows | Not recoverable from the tree; owner's U-4 handling of 5842 may tell by inspection of the row's history | owner |
| G2 | Whether non-V2 flag bits (4, 4096) are wanted or should also be constrained | Product question | Owner decision at planning | owner |

## Open Questions

None blocking. The shape of the clause (F4's a/b/c) is an owner decision the planner should surface.

## Appendix A — Execution probe (reproducible)

Harness as in `components-v2-editing-flows-2026-08-23.md` Appendix A (`/tmp/v2probe/vitest.config.ts`,
`setup.ts`); command `cd /usr/local/bin/hooks/website && npx vitest run --config /tmp/v2probe/vitest.config.ts flag-mint`.
5 passed at `c85945f`.

`/tmp/v2probe/flag-mint.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { IS_COMPONENTS_V2_FLAG } from '~/constants';
import { discordMessageImportShape, optionalIdMessageShape } from '~/server/api/utils/shapes';
import { isMessageValid } from '~/server/api/utils/messageValidity';
import {
  enforceImportMutualExclusivity, makeEditable, standardizeMessage, stripKeys, validateContentRequirements,
} from '~/utils';

function updateMessage<T extends object>(old: T, patch: object) {
  return makeEditable({ ...old, ...patch, updatedAt: 0 } as never);
}
const existing = { id: '9', name: 'n', guildId: null, data: { content: 'old' } } as unknown as ApiMessage;

describe('Q1 hand-typed flags in the JSON modal (edit page)', () => {
  it('flags 32768 + content survives Load and save: a 5712-shaped record is stored, valid=false, no error on the way', () => {
    const pasted = { content: 'hi', flags: IS_COMPONENTS_V2_FLAG };
    const { data: cleaned, detectedMode } = enforceImportMutualExclusivity(pasted);
    expect(detectedMode).toBe('classic');            // structural detection only
    expect(cleaned.flags).toBe(IS_COMPONENTS_V2_FLAG); // stray bit preserved
    const validated = discordMessageImportShape.parse(cleaned) as MessageData;
    expect(validated.flags).toBe(IS_COMPONENTS_V2_FLAG); // shape accepts any non-negative int
    const next = updateMessage(makeEditable(existing), { data: validated });
    const saved = stripKeys(next);                    // save path
    expect(saved.data.flags).toBe(IS_COMPONENTS_V2_FLAG);
    expect(saved.data.content).toBe('hi');
    const server = optionalIdMessageShape.safeParse({ id: '9', name: 'n', guildId: null, data: saved.data });
    expect(server.success).toBe(true);                // upsert accepts
    expect(isMessageValid(saved.data)).toBe(false);   // stored valid=false
    expect(validateContentRequirements(saved.data)).toBe('Components V2 messages cannot contain embeds or content.'); // send refuses
  });
  it('with an action row present the mint still works (classic structure, stray flag)', () => {
    const pasted = { content: 'hi', flags: IS_COMPONENTS_V2_FLAG, components: [{ type: 1, components: [{ type: 2, style: 5, url: 'https://x.y', label: 'L' }] }] };
    const { data: cleaned, detectedMode } = enforceImportMutualExclusivity(pasted);
    const saved = stripKeys(updateMessage(makeEditable(existing), { data: discordMessageImportShape.parse(cleaned) }));
    expect(detectedMode).toBe('classic');
    expect(saved.data.flags).toBe(IS_COMPONENTS_V2_FLAG);
    expect(isMessageValid(saved.data)).toBe(false);
  });
  it('is NOT reachable by an unedited round trip: the seed never carries flags', () => {
    const seeded = standardizeMessage(stripKeys({ data: { content: 'hi', flags: IS_COMPONENTS_V2_FLAG } } as never).data);
    expect(seeded.flags).toBeUndefined();
  });
});

describe('Q1b new-message JSON paste (NewMessageJsonInput → NewMessageModal upsert)', () => {
  it('same mint on create', () => {
    const { data: cleaned } = enforceImportMutualExclusivity({ content: 'hi', flags: IS_COMPONENTS_V2_FLAG });
    const forwarded = makeEditable({ data: cleaned as MessageData }).data;
    const server = optionalIdMessageShape.safeParse({ name: 'n', guildId: null, data: forwarded });
    expect(server.success).toBe(true);
    expect(forwarded.flags).toBe(IS_COMPONENTS_V2_FLAG);
    expect(isMessageValid(forwarded)).toBe(false);
  });
});

describe('Q1c other flag values', () => {
  it('any non-negative integer is stored verbatim (e.g. 4096 SUPPRESS_NOTIFICATIONS, 4 SUPPRESS_EMBEDS)', () => {
    for (const flags of [4, 4096, 32768 | 4096]) {
      const { data: cleaned } = enforceImportMutualExclusivity({ content: 'hi', flags });
      expect(discordMessageImportShape.parse(cleaned).flags).toBe(flags);
    }
  });
});
```
