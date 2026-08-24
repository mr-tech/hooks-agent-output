---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: Active
Status-Detail: >-
  Rev 4 — **D20 PRECONDITION PASS ONLY. NO VERDICT IS ISSUED AND NONE IS INVITED.** This document
  exists before the deploy it will cover, as the UAT gate requires, and carries **no** release
  decision. QA Phase 2 has not run (`qa/013-...-qa.md`, Status `Awaiting Implementation`); M4 and
  M6 are open. **BC-11 Half A (the mint) is `EXECUTED`, 2026-08-24, terminal** — the owner minted
  both records himself and attested it verbatim (5855, 5856); his attestation is the terminal form
  of owner-supplied evidence and this pass terminalises on it rather than manufacturing a further
  gate. **Half B (the ask) is `NOT EXECUTED`** — not a terminal state, and it blocks an
  unconditional approval; it needs a browser and a chain-tip environment carrying the shape, which
  per the plan need not be production, so it is **not** automatically the owner's. **Appendix A is
  its one-shot script, ready.** **D20's re-derivation clause is RESOLVED on the substance**,
  discharged by production execution rather than by UAT's instrument; the classifier-blocked probe
  is retired for that purpose and needs no ruling. Two defects in BC-11 as written (Subject cell;
  earliest-decidable cell) are routed to QA, whose row it is. **Rev 5 raises finding U-1**: the seeds
  are permanent members of the category 012's classifier counts, so both limbs of the plan's own
  falsifier for assumption 7 now fire by construction — a working D19 repair will read as a failed
  one. Routed to steering; no remedy adopted here. This document is authoritative on register state
  from rev 1 forward. **Rev 6**: QA split BC-11 into **BC-11a (`EXECUTED`, terminal)** and **BC-11b
  (`NOT EXECUTED`)** at `9946eb9`, adopting both defect reports; Appendix A amended for QA's
  unexamined-read-path assumption, which makes a Classic-mode open **ambiguous** and not reportable
  as either a read-path defect or the ask failing. **Rev 7**: QA executed both items this pass handed
  over (`32737d3`) — R7's first limb is **confirmed not tripped** by the seeds, narrowing U-1, with the
  correction that `valid = false` **does not discriminate** (the seeds are invalid for two independent
  reasons; key on the reason string, never the boolean).
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
| 2026-08-24 | steering-hooks-013-2 (relay of an owner decision + **D27**, plan rev 19 `a479afe`) | Owner chose option (a) on the mint — he does it himself; act on D27 by sending UAT's two probe extensions to QA directly | Rev 2. **No state change to any register row.** Owner's mint is recorded as **intent, not evidence**; BC-11 Half A stays `NOT EXECUTED` pending his attestation, which is complete evidence when quoted with its timestamp and is not satisfied by a relay. Classifier block on the probe rig **parked and staying parked** — steering confirmed it will not run it either, so D20's re-derivation clause is outstanding and QA's probe is the only executed evidence for the mintability finding. Extensions (i) `optionalIdMessageShape` and (ii) the uncovered persist leg sent direct to `qa-hooks-013-2`, citing `b6e9662`. Still no verdict. |
| 2026-08-24 | steering-hooks-013-2 (an inference offered **explicitly as unestablished**, to re-derive not adopt) | Test whether Half B is blocked for the same reasons as Half A, and if so prepare a one-shot observation script | Rev 3. **Inference SURVIVES in part and is corrected in part.** Survives: Half B is not executable by this session — all 8 message-router procedures are `protectedProcedure` (0 `publicProcedure`) and the oracle is a UI event, so the browser constraint decides it independently of timing. Corrected: **it does not follow that Half B is the owner's** — the plan's M8-G clause admits the form *"in any environment seeded with the shape"*, and the planner already wrote a fallback disposition for the no-seeded-environment case. Two register defects found and sent to QA: BC-11's **Subject** cell names `UAT agent` with no fallback, which is wrong for both halves; its **earliest-decidable** cell states Half A's precondition only and omits Half B's. Observation script for the designated observer added as Appendix A, **not executed**. Still no verdict. |
| 2026-08-24 | **owner**, attested in the steering session; **route: relayed out-of-band by steering-hooks-013-2 — not a stage handoff** | Deliver the owner's attestation that the two seed records exist, for UAT to judge under its own gate | Rev 4. **BC-11 Half A → `EXECUTED`, terminal.** His words, verbatim: *"Re: UAT's JSON message - both are created. 5855 and 5856"* (2026-08-24). Terminalised on the attestation per the plan's evidence rule and this agent's own — never record a capture as missing against a condition he executed. **Not recorded as fact**: the shape-to-ID mapping (steering expressly did not assert it; Half B exercises both records by its own terms, so nothing is blocked). **D20's re-derivation clause RESOLVED on the substance** — discharged by production execution rather than by UAT's instrument, delta and route-residual recorded; classifier block retired for that purpose. Half B unchanged and still owed. Still no verdict. |
| 2026-08-24 | *(none — raised by this pass)* | — | Rev 5. **Finding U-1 raised**: D20's seed records (5855, 5856) are permanent members of `flagStructureDisagreement`, so after the owner's D19 repair the plan's assumption-7 detector reads **2** where he expects **0** — a working repair looks like a failed one — and the V2-error limb fires too, since that is Half B's precondition. Verified verbatim against the plan's Assumptions item 7 and its "29 empty, 2 disagreeing" count. Routed to steering as plan-touching; no remedy adopted. One inference left deliberately unexecuted and flagged. Still no verdict. |
| 2026-08-24 | qa-hooks-013-2, direct under D27 (`9946eb9`) | Both UAT digests actioned: extensions executed, BC-11 split, one assumption routed back that lands on Appendix A | Rev 6. Both extensions **CONFIRMED by QA's execution** (24 assertions, 5 mutants killed), including the conflict-UPDATE leg Half B actually exercises. BC-11 **split into BC-11a (`EXECUTED`, terminal) / BC-11b (`NOT EXECUTED`)**, both defect reports adopted; register restated here from QA's document re-read at write time. **Appendix A amended**: QA's unexamined read path makes a Classic-mode open ambiguous between a read-path defect and the ask not firing — the script now stops the observer there rather than letting either conclusion be drawn. **F-QA11 ruled out for this script by this pass**: `SaveAsMenu` uses `?? ''` → `null` (accepted), not `NewMessageModal`'s `?? '0'` (refused), so Save As is not exposed. Still no verdict. |
| 2026-08-24 | qa-hooks-013-2, direct under D27 (`32737d3`) | Both items this pass handed over were **executed** rather than recorded at read level | Rev 7. **R7's first limb CONFIRMED not tripped** by the seeds — U-1 is narrower than raised. **Correction carried**: `valid = false` does not discriminate; the seeds are invalid for **two** independent reasons (no username, plus the V2/classic conflict), so anything keying on the boolean must key on the **reason string**. **F-QA11 class-closed by QA over a predicate** (4 sites; two guard `'0'` explicitly), making it a single-site oversight and this pass's Save As read mutant-checked rather than read-level. Appendix A's F-QA11 note strengthened to *positively distinguishable*. Still no verdict. |

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

### Addendum, 2026-08-24 (rev 2) — the owner will mint the records himself

Steering (`steering-hooks-013-2`) put the three options to him; he chose **(a)**: he mints the two
records himself before going. **This is recorded as intent and not as evidence.** He has said he
will; he has not reported it done, and **BC-11 Half A is therefore NOT marked satisfied on the
strength of this.**

When it is established, the instrument is fixed by the plan's own evidence rule (Surfaces Without
Automated Coverage): *where the designated observer is the owner, no capture path is minted and no
file is owed — his attestation, quoted with its timestamp in the consuming document, is complete
evidence.* So the real UAT pass **quotes his attestation with its timestamp**; it does not paraphrase
it, does not accept a relay in its place, and **never records a capture file as missing against a
condition he executed**. Existence of the two records is established by that pass, not inherited from
this line.

### Addendum, 2026-08-24 (rev 4) — HALF A IS EXECUTED. The attestation, verbatim

The condition the rev-2 addendum named in advance has been met. The owner minted both records himself
and attested it. **His words, quoted and not paraphrased:**

> Re: UAT's JSON message - both are created. 5855 and 5856

**Date**: 2026-08-24, given unprompted in the steering session immediately after he was handed the two
JSON payloads this document lists.

**Route of the evidence, recorded because it was not a stage handoff**: the payloads reached him from
`steering-hooks-013-2`, and his attestation reached this document from `steering-hooks-013-2`. Steering
is the **route, not the source** — the fact is his, quoted from him above rather than attributed to the
relay.

**Disposition: BC-11 Half A → `EXECUTED`, 2026-08-24. Terminal.** This pass terminalises on the
attestation and does not hold the row open for independent confirmation. The plan's evidence rule makes
his attestation complete evidence where he is the designated observer, and this agent's own governing
rule is explicit: *never ask the owner to create, populate, or save a capture file, and never record one
as missing against a condition he executed — record his statement with its timestamp and terminalise on
it.* Holding the row open against live records he has named by ID would be manufacturing a gate he has
already walked through.

**Two things the attestation does NOT establish, recorded so nobody later reads them out of it:**

1. **The shape-to-ID mapping is not stated.** He said "5855 and 5856"; he did not say which is
   5712-shaped and which is 5842-shaped. Steering, which relayed the payloads in this document's order,
   expressly declined to assert the mapping, and **this document records none.** It blocks nothing:
   Half B exercises **both** records by its own terms ("repeat on the 5842-shaped record"). If the
   mapping is ever wanted for the record it is a one-line question for him — not one worth spending at
   a moment he is trying to leave.
2. **His words do not name the route.** He was handed New Message JSON paste steps and answered "UAT's
   JSON message", which reads straightforwardly as that route. Noted once for completeness and **not
   treated as a gap** — treating it as one would be the manufactured doubt the rule above forbids.

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

**Status at rev 4 — RESOLVED ON THE SUBSTANCE.** This supersedes the rev-2 status below, which is
preserved as written and was correct when written. D20's clause exists so that UAT does not *inherit*
the claim that the 5712 shape is mintable through the JSON surface at `c85945f`. That claim is now
established **by execution in production**: two records of those shapes exist, minted after the owner
was handed exactly those payloads (rev 4 addendum). That is a stronger derivation than the module-level
probe D20 contemplated, and it is not QA's word taken on trust.

**A required action discharged in a different form — or by a different party — than the one it named is
closed on the substance, with the delta recorded, not returned for a documentation shuffle.** The
delta: D20 named *UAT's own instrument*; what discharged it was *the owner's production mint*. The
residual: his words do not name the route — noted, not treated as a gap, not blocking. **The
classifier-blocked probe is retired for this purpose and needs no ruling from him**; the block itself
was never adjudicated and now does not need to be.

**Status at rev 2, preserved**: the block was **parked for the owner and stays parked.** Steering has confirmed it
will not perform the blocked action either — the trigger for that would be the owner's sanction
obtained in a session, never the block itself. Whether it was a false positive is his call and not
this agent's to make about its own action. **The consequence, stated so nobody assumes otherwise:
D20's re-derivation clause is outstanding, and QA's probe remains the *only* executed evidence for
the mintability finding.**

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
Release Condition Register — chain 013*, re-read at write time 2026-08-24. **Re-read again at rev 6 (QA doc rev 2, `9946eb9`)**, the authority for the BC-11a/BC-11b split restated below; QA also added a dated register maintenance log there. That document states it is
chain 013's **single** register; this pass found no second travelling list and mints none. From this
revision forward **this document is authoritative on each row's state**, per the register's own
standing note.

**No row reached a terminal state this pass.** All 14 rows (BC-1 … BC-14) stand as QA left them —
`Not started` — with the one qualification below. `PRE` rows must be terminal before the release act;
`POST` rows are post-deploy-observable and gate the **chain's closure**, never the release act.

| Row | Class | State after this pass | Note |
|---|---|---|---|
| BC-1 … BC-10 | PRE | Not started | Not reachable: they need the chain tip, and M4/M6 are open |
| **BC-11** | — | **SUPERSEDED by BC-11a + BC-11b** | Split by QA at `9946eb9` on this pass's two defect reports; retained as a pointer row. **No requirement withdrawn**, both halves survive verbatim, same ID space |
| **BC-11a** (the mint) | PRE | **`EXECUTED` 2026-08-24 — TERMINAL** | The owner's attestation, quoted verbatim above (5855, 5856). Two residues recorded and not asserted: the shape-to-ID mapping, and that his words reached the register by citation of this document rather than by his writing into a stage document |
| **BC-11b** (the ask) | PRE | **`NOT EXECUTED`** | Non-terminal; **blocks an unconditional approval**. Appendix A is its one-shot script. Subject is now *any party with a browser and a chain-tip environment carrying the shape* — today the owner, **because no session on this box holds browser tooling: a fact about tooling, not a plan requirement** |
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

### Half B re-derived, 2026-08-24 (rev 3) — and where the re-derivation corrects the inference

Steering offered, expressly as an unestablished inference to be re-derived rather than adopted, that
Half B may be blocked for the same reasons as Half A. **Re-derived here from the tree and the plan,
not adopted.**

**It survives, on two independent constraints:**

| Constraint | Instrument | Result |
|---|---|---|
| Authentication | enumeration of every procedure in `src/server/api/routers/message.ts` at `c85945f` | **8 of 8 are `protectedProcedure`; `publicProcedure` count is 0.** `get`, `getOne`, `getAll`, `getFromUrl`, `getFromCode`, `upsert`, `delete`, `updateRecentMessageData`. There is no anonymous path to *open* a saved record, let alone re-save one |
| A browser | this session's tooling | **Decisive on its own.** Half B's oracle is *"the ask appears"* — a UI event. No browser, empty `DISPLAY`, no automation tooling. This holds at **any** SHA and in **any** environment, so it is independent of Half B's timing dependency |

**But the inference's conclusion does not follow, and this is the correction.** Half B being outside
*this session* does not make it the **owner's**. The plan's own M8-G clause admits the form more
widely than "production" — verbatim:

> **Human-observable form (F-1's, production-reachable, no SQL)**: while a member exists — before the
> D19 repair, **or in any environment seeded with the shape** — open 5712 in the composer (V2 mode,
> the V2 error visible), add one container, press Save: the ask appears naming both drops, and
> nothing is written until one is taken; the same at Save As.

So Half B belongs to **any party holding a browser and a chain-tip environment carrying the shape** —
which may be a stage agent, and is the owner only because no session in this chain appears to hold
browser tooling. That is a fact about tooling, not a requirement of the plan, and it should not be
written into the register as though it were the latter.

**The planner also already wrote the fallback**, which this pass did not have to invent — verbatim:
*"Where the repair has already run and no seeded environment is available, the suite is the evidence
and UAT records the reason — the D19 repair preceded the deploy — not 'no member to observe'."* Note
its condition is conjunctive: it applies only where the repair **has** run **and** no seeded
environment is available. If the owner mints the seeds and does not repair, the fallback is not
available and the row is still owed.

### Two defects in BC-11 as written — routed to QA, whose row it is

1. **The Subject cell is wrong.** It reads `UAT agent`, with no fallback. UAT can execute **neither**
   half. Per this agent's own rule the owner is taken from the **primary** instrument and never the
   fallback — and BC-11's primary is *operator observation*, which needs a human with a browser. The
   cell needs re-assignment; **this document does not edit QA's register.**
2. **The earliest-decidable cell states Half A's precondition only.** It names the seed's existence
   and says nothing about Half B needing a chain-tip environment. Compare **BC-1**, whose cell reads
   *"chain tip deployed to any environment with a stored V2 message"* — the convention already exists
   in this register; BC-11 simply does not use it.

Neither defect changes what BC-11 requires. Both make it harder to schedule correctly, which is what
an earliest-decidable cell is for.

### The retention instruction, recorded for what it is

Steering told the owner **not to delete the two seed records** after minting them. Recorded here
because it bears on this condition's integrity and because its status matters: **it is steering's
instruction, not the owner's ruling.** D20 expressly left the seeds' disposition unruled and called
that "not a gap"; this instruction partially fills that space from a source that cannot rule on it.

It is sound insurance and this pass does not object to it. It is, however, **less load-bearing than
its framing suggests** — because the plan admits a seeded environment, a party that can stand up a
chain-tip environment could seed one by running `c85945f` there first. Retention makes Half B cheap;
it is not the only thing standing between the chain and an unobservable condition.

### Validation item 8 — the ordering line this pass can already give

Validation item 8 requires the deployment record **and** UAT's release decision each to state, in one
line, **which came first**: M8-G's production observation, or the owner's D19 repair. As of
2026-08-24 the record is: **neither has occurred.** The observation has not happened (Half A blocked,
Half B unreachable); no D19 repair declaration by the owner has been received by this pass. This line
is point-in-time and is re-derived at the real UAT pass, not carried from here.

## Finding U-1 — D20's seeds disarm the plan's own falsifier for assumption 7

**Raised by this pass, 2026-08-24 (rev 5). Not previously priced by anyone, as far as this pass can
see. Routed to steering as a plan-touching finding, not settled here.**

Records 5855 and 5856 now exist in production carrying the flag-over-content shape. They are, by
construction, permanent members of the category 012's classifier counts — `flagStructureDisagreement`
(`flagV2 && !structurallyV2`) — and steering has instructed the owner **not to delete them**, because
Half B runs against them.

The plan's detector for assumption 7 failing (Assumptions, item 7) reads, verbatim:

> **Where a silent failure is caught**: … the classifier he runs under D20 (`flagStructureDisagreement`,
> his instrument) reading **> 0** after he has declared the repair done, or a record opening in V2 with
> the composer's V2 error after that declaration (R8's falsifier), is the signature.

**Both limbs are now tripped by the seeds, by construction and permanently:**

1. The count limb. The plan records the pre-existing population as **"29 empty, 2 disagreeing"**. After
   the owner's D19 repair of 5712 and 5842, the count he expects is **0**; what he will actually read is
   **2** — UAT's own seeds. **A working repair will look like a failed one.**
2. The V2-error limb. A seed *opening in V2 with the composer's V2 error* is not a signature of failure
   here — **it is the precondition Half B needs** and the reason the seeds were minted.

**This is a false-positive trap that fires at exactly the wrong moment**: when the owner checks whether
his own repair worked. It is a direct and, on this pass's reading, unnoticed consequence of D20, which
was registered as changing *"no criterion, milestone or release condition"* — and strictly that is
still true, since it changes no criterion's text. What it changes is what one of them *measures*.

**Not this pass's to settle**, and no option is adopted here. The cheap remedy is documentary: R-5's
deployment record already exists to tell the owner the **source class** of what he is looking at, so
the residual can be named there — the falsifier read as *"> 0 excluding 5855 and 5856"*, or the
expected residual stated as **2**. That line is **devops's** to write and the falsifier's wording is
the **planner's**; whether the seeds are deleted after Half B is the **owner's**, and D20 expressly
left their disposition unruled. This pass records the interaction and routes it.

**Not established, and deliberately not assumed**: that the seeds carry `valid = false` and therefore
stay out of `flagStructureDisagreementValidTrue` (R7's first limb). The inference is available — the
plan records that category as reading **0** at 012's backfill run while 5712/5842 were its
`flagStructureDisagreement` members, so those shapes evaluate invalid, and the seeds share the shape —
but it rests on shape identity and this pass did not execute it. **If R7's falsifier is read after the
deploy, that inference should be executed first, not relied on.**

**Update, 2026-08-24 (rev 7) — the inference above was EXECUTED by QA and is CONFIRMED, with a
correction it did not carry.** The text above is preserved as written; it was correct to withhold it.
QA executed it at `c85945f` (`32737d3`): the seeds carry `valid = false` and **do stay out of
`flagStructureDisagreementValidTrue`, so R7's first limb is not tripped by them.** U-1's blast radius
is that much smaller.

**The correction, which matters more than the confirmation.** An unqualified *"the seeds are
`valid = false`"* **does not discriminate**: a username-less message is refused for an entirely
unrelated reason, and the seed JSON carried no username, so 5855/5856 are almost certainly `false` for
**two independent reasons**. Only with a username supplied is the V2/classic conflict the sole carrier
of the refusal. **Anything downstream keying on `valid = false` must key on the reason string, not the
boolean.** That trap sat inside the reasoning, not the conclusion — which is why the inference was
worth handing over as a stated gap rather than a comfortable result.

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

1. **BC-11 Half A — CLOSED.** `EXECUTED` 2026-08-24 on the owner's attestation (5855, 5856). Nothing
   further is owed on it. **The two records must not be deleted** — Half B runs against them.
2. **D20's re-derivation — CLOSED on the substance.** Discharged by the owner's production mint rather
   than by UAT's instrument; delta and route-residual recorded above. **The classifier block needs no
   ruling from him and is withdrawn from his queue.**
3. **Finding U-1 — routed to steering, not settled.** The R-5 deployment-record line is devops's, the
   falsifier's wording is the planner's, the seeds' disposition is the owner's. **Whoever reads
   `flagStructureDisagreement` after the D19 repair needs to know 5855 and 5856 are in it deliberately.**
4. **BC-11 Half B — the ask.** Needs a party with a browser **and** a chain-tip environment carrying
   the shape; per the plan that environment need not be production. Not this session, and not
   automatically the owner. **Appendix A is the one-shot script, ready now.** Subject assignment is
   QA's to fix on the register.
5. Not owed yet, listed so the sequence is visible: predecessor-status verification, the value
   assessment, the walkthrough of BC-1 … BC-11, and the release decision — all at the real UAT pass,
   after Implementation, Code Review and QA Phase 2 are complete.

---

## Appendix A — Observation script for BC-11 Half B (NOT EXECUTED)

Prepared at rev 3 for whoever is designated the observer, so it can be run **once, without a re-run**,
at the release moment rather than composed at it. **Nothing here has been executed and nothing here
is evidence.** It is derived from the plan's M8-G criterion and QA's BC-11 row, both cited above; the
**exact wording** of the ask is confirmed against the implementation and code-review documents at the
real UAT pass, not assumed from this script.

**Preconditions**

- A chain-tip environment (production after deploy, *or* any environment seeded with the shape).
- A seed record present: 5712-shaped `{"content":"hi","flags":32768}` and, for step 5,
  5842-shaped `{"content":"hi","flags":32768,"components":[]}`.
- **Do not collapse the components section.** QA's precondition: `showComponentButton` requires
  `isEditing && isV2Mode && showComponentsEditable && canAddComponent`. An observer with the section
  collapsed sees no add-component control and would **wrongly report the ask as unreachable.**

**Steps, and what to record at each**

| # | Action | Record |
|---|---|---|
| 1 | Open the 5712-shaped record in the composer | Does it open in **V2 mode**? Is the **V2 error** visible? Is the body text `hi` still shown? **If it opens in Classic with no V2 error and no components section, STOP — see the ambiguity rule below. Do not conclude anything.** |
| 2 | Add **one container** | Did the add-component control appear at all? (If not, check the section is expanded before concluding anything) |
| 3 | Press **Save** | **The ask appears**, and it **names both drops**. Record the wording verbatim |
| 4 | Dismiss without choosing, then re-open the record | **Nothing was written** — the record is as it was. This is the negative half and is the easiest to skip |
| 5 | Repeat 1–4 at **Save As**, then repeat on the **5842-shaped** record | Same result at both |

**Recording rule.** The observed result is written **beside** the prediction, never over it. The
prediction is: *the ask appears; nothing is written before a choice.* If the observer is the owner,
his attestation **quoted with its timestamp** is complete evidence — no capture file is minted, none
is owed, and none is recorded as missing.

**Ambiguity rule (added at rev 6 on QA's Assumption Not Checked, `9946eb9` §4) — read before step 1.**
Everything QA established about these records stops at the values handed to the insert/update statement.
**The read path is unexamined.** If `getMessage`, or whatever `MessageProvider` runs on load, coerces or
defaults `flags` on the way *out*, then 5855/5856 are stored as row-D members and nonetheless **open as
something else**.

So if the record opens in **Classic mode with no V2 error and no components section**, that observation
is **ambiguous between a read-path defect and the ask not firing.** **Do not record it as either.**
Record exactly what was seen and hand it back — QA owns closing it at Phase 2, in M7-a's
mode-derivation coverage, by exercising the extracted `detectMode` over a fixture shaped the way
storage returns it rather than over a literal. The same applies to any **validation error appearing
instead of the ask**: record it; do not read it as the ask having failed.

**One false alarm ruled out in advance (rev 6).** F-QA11 — `NewMessageModal` opening with
`useState(guildId ?? '0')`, so Save is enabled while the dropdown still reads "Select a Guild" and `'0'`
is refused by `discordIdShape` — **does not apply to this script.** Step 5's Save As uses
`useState(message.guildId ?? '')` and sends `selectedGuildId || null`, reaching the boundary as `null`,
which QA executed and found accepted. **F-QA11 is a New Message defect, not a Save As one**; an observer
hitting a guild validation error at Save As has found something new, not F-QA11. **Strengthened at
rev 7**: QA closed this class by execution (`32737d3`) over the predicate *a site building
`message.upsert`'s `guildId` from a value picked this session* — 4 matching sites, of which **two guard
the `'0'` sentinel explicitly**, so F-QA11 is a **single-site oversight, not a design choice**, and the
Save As clear is mutant-checked rather than merely read. A guild error at Save As is therefore
**positively distinguishable**, not just "not F-QA11 as far as anyone read".

**If it cannot be run**, the disposition is already written by the planner and is not improvised: where
the D19 repair has run **and** no seeded environment is available, the suite is the evidence and the
reason recorded is *"the D19 repair preceded the deploy"* — **not** "no member to observe". If either
limb of that condition is unmet, the row is still owed and `NOT EXECUTED` is not a terminal state.
