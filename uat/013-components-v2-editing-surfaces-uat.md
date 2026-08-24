---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: Active
Status-Detail: >-
  Rev 1 — **D20 PRECONDITION PASS ONLY. NO VERDICT IS ISSUED AND NONE IS INVITED.** This document
  exists before the deploy it will cover, as the UAT gate requires; it does **not** yet carry a
  release decision, conditional or otherwise. QA Phase 2 has not run (`qa/013-...-qa.md`, Status
  `Awaiting Implementation`, re-read 2026-08-24), M4 and M6 are open, and the sequencing for this
  one task was overridden explicitly and narrowly by steering-hooks-013-2 because D20's mint route
  **expires at deploy**. Result of the pass: **the mint is BLOCKED and NOT EXECUTED.** The New
  Message JSON surface is unreachable from this session — `message.upsert` is a `protectedProcedure`
  and no authenticated session, browser, or browser-automation tooling exists here. No equivalent
  was improvised: no direct database insert, no tRPC call, no fixture. BC-11's pre-deploy half
  therefore stands at **NOT EXECUTED**, which is not a terminal state. A second, independent block
  is disclosed below: the classifier denied creation of this pass's own probe rig, so D20's required
  **re-derivation by execution** was also not performed. Both are parked for the owner, not
  escalated. This document is authoritative on register state from this revision forward.
---

# UAT Report: Plan 013 — Components V2 support across the editing surfaces

**Plan Reference**: `agent-output/planning/013-components-v2-editing-surfaces.md` — rev 18, Status
`Approved` (frontmatter re-read at write time, 2026-08-24)
**Date**: 2026-08-24
**UAT Agent**: Product Owner (UAT) — session `uat-hooks-013`

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-24 | steering-hooks-013-2 (sequencing overridden explicitly; **no verdict invited**) | Execute D20's pre-deploy precondition: mint two throwaway records — one 5712-shaped, one 5842-shaped — through the product's own New Message JSON surface at production `c85945f`, re-deriving the mintability finding rather than inheriting it | **BLOCKED, reported, nothing improvised.** The New Message JSON surface is unreachable from this session (no authenticated session; `message.upsert` is a `protectedProcedure`; no browser, no `DISPLAY`, no browser-automation tooling). The route at `c85945f` was traced **by reading** and is recorded below as corroboration, explicitly **not** as the re-derivation D20 requires. The executed re-derivation was separately blocked by the auto-mode classifier when creating the probe rig; disclosed in this document per CLAUDE.md rather than retried in another form. BC-11 stays **NOT EXECUTED**. No release decision. |

## Scope of This Revision — and What It Deliberately Does Not Do

This revision is a **precondition pass**, run out of the normal gate order at steering's explicit
and narrow instruction. The reason the order was broken is a property of the task and not a
convenience: under **D20** (plan rev 13) the route that can mint the 5712/5842 shape **expires at
deploy** — after 013, M8-D, M4-a and the toggle mean no surface writes it — so the mint is the one
part of UAT's stage that must happen against production `c85945f` and is not gated on M4/M6.

Accordingly, and stated so no later reader mistakes this document for the gate:

- **No release decision is recorded.** Not `APPROVED FOR RELEASE`, not conditional approval, not
  `NOT APPROVED`. The UAT verdict is a document review over the Implementation, Code Review and QA
  documents, and those documents do not yet exist in their final form.
- **No value-delivery assessment is recorded**, for the same reason.
- Predecessor-status verification (Implementation complete / Code Review approved / QA Complete) is
  **not** performed here and is owed at the real UAT pass.
- Nothing in this revision may be cited as evidence that any gate was met.

## Value Statement Under Test

Copied verbatim from the plan (`## Value Statement and Business Objective`), approval status D4,
*APPROVED AS WRITTEN — not a word amended*:

> As a **guild owner editing a Components V2 message in hooks.gg**, I want **every editing surface
> around the composer — "Save As", the Message JSON view, copy and Load, import from a Discord
> message URL, a webhook URL or the bot's "Get Message" code, and cross-tab change detection — to
> carry my message's components and its V2 flag faithfully**, so that **no editing action silently
> discards what I built or misreports what kind of message it is, and I never land on an empty copy
> of a message that was whole a moment ago**.

## The D20 Precondition — What Was Asked, and What Happened

**Authority**: plan `013` Decisions Register **D20**, registered 2026-08-24 from an owner
selection-prompt answer; and the plan's **Validation item 8**. Both read directly at write time.

D20 places on UAT: *create two throwaway records of its own — one 5712-shaped, one 5842-shaped —
**through the product's own New Message JSON surface** before the release act, and observe M8-G
against one of those.* The owner's stated cost when he chose this option was *"two junk messages
left in the account"*, which is the authorised ceiling. Whether the seeds are removed afterwards is
expressly **not ruled and not a gap** (D20); this pass invents no disposition.

### Result: NOT EXECUTED — the surface is unreachable from this session

The mint requires an **authenticated** session against the product. Established this pass:

| Fact | Instrument | Result |
|---|---|---|
| The write the mint performs is authenticated | `grep -n "upsert:" website/src/server/api/routers/message.ts` at `c85945f` | `upsert: protectedProcedure` — a session is required; there is no anonymous create path |
| No browser is available to drive the surface | `which google-chrome chromium chromium-browser firefox`; `echo $DISPLAY` | only `/usr/bin/firefox` (v154.0); `DISPLAY` **empty** |
| No browser-automation tooling is available | tool search for browser/navigate/screenshot tools; `ls website/node_modules/puppeteer*`; `ls preview-image-generator/node_modules/.bin` | no `claude-in-chrome` tools present; no puppeteer reachable. `WebFetch` is read-only and **documents that it fails on authenticated URLs** — it cannot paste JSON into a UI in any case |
| No session credential is available to this agent | — | none held. `website/.env.local` holds **service** credentials and is read no further than key names by standing instruction; it carries no browser session, and obtaining one would mean authenticating as the owner through Discord OAuth — his identity, not this agent's, and not sought |

**Nothing was improvised.** Per the brief's boundary and this agent's own constraints, no direct
database insert, no tRPC call, and no fixture was used to manufacture a record. A record created by
any other route would not establish what D20 has UAT establish, and would leave the register reading
as though it had. **A precondition falsely marked satisfied is worse than one openly blocked.**

### A route that was considered and NOT taken

The product could in principle be served locally at `c85945f` and its real New Message JSON surface
driven there; because the single selectable `DATABASE_URL` is **the remote hosted database**, such a
record would land in the same account. This is recorded so the option is visible, **not as a
recommendation**. It still requires authenticating as the owner, which this agent will not do, and
it stands a service against the live database — a class this chain has ruled on carefully elsewhere.
**It is the owner's call, not this pass's.**

## D20's Re-Derivation Requirement — Also Not Discharged

D20's row states expressly that the mintability of the 5712 shape through the JSON surface at
`c85945f` is **qa-hooks-013's** finding — established by execution with a discriminating control and
two killed mutants at `agent-output/verification/013/probe-preexisting-seed-route/` (README read this
pass) — and that **UAT re-derives it rather than inheriting it**.

**It was not re-derived.** Creation of this pass's probe rig
(`agent-output/verification/013/probe-uat-d20-seed-route/`) was **denied by the Claude Code auto-mode
classifier**. Per CLAUDE.md the denial was **not** rephrased, split into separately-passing pieces, or
routed through another tool; it is reported instead, and is disclosed here in the round it happened
rather than first in a hand-back. Nothing was created — `ls -d` confirms the directory does not exist.

### What was established instead, and its exact weight

The route was traced **by reading** the tree at `c85945f`. **Reading is not execution, and this is
therefore corroboration, not the re-derivation D20 requires.** It is recorded because it is useful to
whoever finishes the job:

| Leg | At `c85945f` | Source |
|---|---|---|
| 1. paste → parse | `JSON.parse(jsonMessageString)` in a `useUpdateEffect` | `src/app/message/_components/NewMessageJsonInput.tsx` |
| 2. reconcile | `enforceImportMutualExclusivity(parsed)` — result destructured as `{ data: cleaned }`; `detectedMode` deliberately unused at this surface | same file |
| 3. client shape | `discordMessageImportShape.parse(cleaned)` → `setMessage(cleaned)` | same file |
| 4. send | `upsertMessage({ message: { data: loadedMessage, name: messageName, guildId: … } })` | `NewMessageModal.tsx` (`loadedMessage`, the `upsert` mutation) |
| 5. server boundary | `.input(z.object({ message: optionalIdMessageShape }))`, where `optionalIdMessageShape = messageShape.extend({id})` and `messageShape.data = discordMessageShape` | `src/server/api/routers/message.ts`; `src/server/api/utils/shapes.ts` |
| 6. persist | `buildMessageValues` sets **`data: message.data`** — the object verbatim; `valid: isMessageValid(...)` is computed alongside and does not rewrite `data` | `src/server/api/utils/shared.ts` |

**Two observations for QA Phase 2 and for this pass's own later verdict.** Both are *read-level* and
neither contradicts QA's executed finding; both extend it, and both need execution before anyone
relies on them:

1. QA's probe asserts the server boundary as `discordMessageShape`. The procedure's actual input is
   **`optionalIdMessageShape`**, one layer out, wrapping it as `{ message: { data, name, guildId, id? } }`.
   QA's assertion is a strict subset of the real boundary; the `name`/`guildId` fields it does not
   exercise are the remaining unverified part of leg 5.
2. QA's probe covers legs 2–3 and part of 5. **Leg 6 — the persist leg, which decides what is at
   rest — is not covered by it at all.** That leg is what makes the minted record a *member of
   M8-G's class* rather than merely an accepted request, so it is the leg most worth an assertion.

A detached worktree at `c85945f` was created for this reading and **is left in place** for whoever
resumes: `/tmp/uat013-c85945f` (`git -C website worktree list`). It is this session's, not foreign
debris, and the shared tree's branch was **not** switched.

## Blocking Release Condition Register — Adopted

**Register of record**: `agent-output/qa/013-components-v2-editing-surfaces-qa.md`, section *Blocking
Release Condition Register — chain 013*, re-read at write time 2026-08-24. That document states it is
chain 013's **single** register; this pass found no second travelling list and mints none. From this
revision forward **this document is authoritative on each row's state**, per the register's own
standing note.

**No row reached a terminal state this pass.** All 14 rows (BC-1 … BC-14) stand as QA left them —
`Not started` — with the one qualification below. `PRE` rows must be terminal before the release act;
`POST` rows are post-deploy-observable and gate the **chain's closure**, never the release act.

| Row | Class | State after this pass | Note |
|---|---|---|---|
| BC-1 … BC-10 | PRE | Not started | Not reachable: they need the chain tip, and M4/M6 are open |
| **BC-11** | PRE | **NOT EXECUTED** — pre-deploy half attempted and **blocked** | See below. **`NOT EXECUTED` is not a terminal state** and blocks an unconditional approval |
| BC-12, BC-13, BC-14 | POST | Not started | Post-deploy-observable; gate chain closure, not the release act. BC-13's owner is devops and its primary instrument is **the clock — no human subject** |

### BC-11, read apart into its two halves

BC-11 is a single register row whose **primary instrument is operator observation** and whose
**subject is the UAT agent**, but whose condition spans two instants that this pass found it useful to
name separately, because they have opposite timing and only one of them was on tonight's table:

- **Half A — the mint (pre-deploy, and it expires).** Paste `{"content":"hi","flags":32768}` and
  `{"content":"hi","flags":32768,"components":[]}` into New Message at `c85945f`, creating one
  5712-shaped and one 5842-shaped record. **This is what tonight attempted. It is BLOCKED and NOT
  EXECUTED.** It cannot be recovered after go-live.
- **Half B — the observation (needs the chain tip).** Open a seed record in V2 mode, add one
  container, press **Save**; the ask appears naming both drops and **nothing is written** until a
  choice is taken. Same at **Save As**; repeat on the 5842-shaped record. Half B is not yet
  reachable and is not claimed either way.

Half B has a **precondition QA recorded and this pass restates so it is not lost**: `showComponentButton`
requires `isEditing && isV2Mode && showComponentsEditable && canAddComponent` — an observer who has
collapsed the components section will see no add-component control and would **wrongly report the ask
as unreachable**.

**The consequence, stated plainly**: if Half A is never executed, Half B has no member to run against
once the owner's D19 repair lands, and the central new behaviour D18 introduces ships on suite
evidence alone. That is precisely the one-way door D20 was ruled to prevent, and it closes at deploy.

### Validation item 8 — the ordering line this pass can already give

Validation item 8 requires the deployment record **and** UAT's release decision each to state, in one
line, **which came first**: M8-G's production observation, or the owner's D19 repair. As of
2026-08-24 the record is: **neither has occurred.** The observation has not happened (Half A blocked,
Half B unreachable); no D19 repair declaration by the owner has been received by this pass. This line
is point-in-time and is re-derived at the real UAT pass, not carried from here.

## Weighing of Production Evidence

None is offered and none is claimed. No operator attestation, no production run-time, and no
production read is relied on in this revision. Recorded so that the absence is deliberate and visible
rather than an omission: nothing here is supported by *"it has been running and nobody complained"*,
which in any case would be evidence only against loud failure modes and none at all against the
silent ones — and the classes 013 exists to fix (an empty copy, a prompt that never fires, a body
silently dropped) are **silent by signature**.

## UAT Status

**Status**: **NOT A VERDICT — precondition pass only.** Neither `UAT Complete` nor `UAT Failed`.
**Rationale**: QA Phase 2 has not run and the chain is not finished (M4 open, M6 open). The gate was
not exercised; one pre-deploy precondition was attempted and is blocked.

## Release Decision

**None issued.** No `APPROVED FOR RELEASE`, no conditional approval, no `NOT APPROVED`.

Recorded for the pass that does issue one: a release decision must name the SHA or content identity
its predecessor verdicts were reached at, reproducing that identity from the tree rather than
inheriting it, and must state that any change to production code expires those verdicts and the
decision with them. The anchors touched by *this* revision are `website` `master` = `c85945f`
(production; read via a detached worktree) and the chain branch tip `ad9f331` (read only, not
verified). **Neither is a verdict anchor.**

## Next Actions

*Point-in-time list — later stage documents are authoritative on these items' current state.*

Two items are **parked for the owner** and are not escalations; both were reported to
steering-hooks-013-2 rather than raised while he sleeps.

1. **BC-11 Half A — the mint (TIME-CRITICAL; expires at deploy).** Needs a party with an
   authenticated session on the product. This agent cannot reach the surface and will not
   manufacture an equivalent. **If the deploy happens before this is executed, BC-11 Half B becomes
   unobservable in production permanently** once the D19 repair lands, and D18's central behaviour
   ships on suite evidence alone — the outcome D20 was ruled to prevent. **Owner's call.**
2. **D20's re-derivation by execution.** Blocked by the auto-mode classifier at rig creation, not
   retried. Needs either a permission decision or a different party to run it. **The owner decides
   whether that block was a false positive; this agent does not make that judgement about itself.**
3. Not owed yet, listed so the sequence is visible: predecessor-status verification, the value
   assessment, the walkthrough of BC-1 … BC-11, and the release decision — all at the real UAT pass,
   after Implementation, Code Review and QA Phase 2 are complete.
