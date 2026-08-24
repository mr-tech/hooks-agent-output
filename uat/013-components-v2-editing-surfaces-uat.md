---
ID: 013
Origin: 013
UUID: 22d69e06
Parent: components-v2-editing-support-2026-08-23.md
Status: Active
Status-Detail: >-
  **Rev 10 — THE UAT GATE HAS RUN. A RELEASE DECISION IS ISSUED: `APPROVED FOR RELEASE, CONDITIONAL`.**
  Predecessor documents read directly this pass and the tree identity re-derived from the tree, not
  inherited. **QA: `QA Complete` at `821330d` + a three-path content manifest, reproduced digest-for-digest
  by this pass.** **Code review: binding verdict round 19 `APPROVED`, δ-cleared at `164d720`; its document
  Status is `In Review` and NO code-review verdict covers the release tip `821330d`** — condition **U-C1**.
  **Implementation: Status `Active`, M6 unchecked, and the document does not record `821330d`/F-QA21 at
  all** (`grep -c` = 0) — condition **U-C2**. Value is judged **delivered at the data layer and
  unobserved at the surface layer**: every milestone but M6 is delivered and reviewed, the suite is
  green on QA's instrument, and **not one of the twelve `PRE` operator-observable register rows has been
  executed** — which is the plan's own Validation item 3, owed *before* this verdict and not met. The
  approval is therefore conditional in the form this agent's definition fixes, over a ledger in which
  **every row carries an owner and a terminal state**. **Finding U-2 raised: the register carries
  duplicate IDs** — two distinct `BC-13`s and two distinct `BC-14`s — so any reference by number alone
  can invert a blocking status; every row in this document is named as well as numbered, and the
  renumbering is routed to QA. **Nothing here withdraws a condition; `WITHDRAWN` is the owner's ruling
  alone.** Rev 9 and earlier are preserved as written; no superseded text was overwritten.
Verified-At: >-
  Production-code identity, re-derived from the tree by this pass and not inherited. `website` @
  `chain/013-components-v2-editing-surfaces`, HEAD = `821330d` (`git rev-parse HEAD`); `c85945f`
  confirmed an ancestor (`git merge-base --is-ancestor` → true), so integration is a fast-forward.
  Uncommitted, in scope, hashed as file bytes (`sha256sum`), reproducing QA's manifest exactly:
  `src/utils/__tests__/012-json-editor-repair-path.test.ts` 33af76e25e0bd5f6350c9fd398c2a135fb9db53f8be6c352eee1af4768021714;
  `src/utils/__tests__/012-message-mode.test.ts` 94cd8738162139121c421056737edf7d1b9da53ca91dac2209288bcf2f5fe411;
  `src/utils/__tests__/013-fqa19-ingress-gate-reachability.test.ts` 82e92af1ab7c4c6bf718f28d10c4977479b00644d538f7798ce82253de9c3fcd.
  Base SHA for the uncommitted population: `821330d`. **Exclusion list: empty** — `git status --porcelain
  --untracked-files=all` over `website` returns exactly those three paths and nothing foreign.
  Uncovered population: none in `website`; `project-utils` and `preview-image-generator` are untouched by
  this chain (plan Validation item 7) and are not covered here. **Any change to a production-code blob
  expires the predecessor verdicts and this decision with them.** Committing QA's three test paths moves
  the SHA but **not** the production-code identity — established by `git diff --numstat`, which confines
  every delta from `53beb37` (the round-19 anchor) to `821330d` to one file under
  `src/utils/__tests__/`, and by the two reviewed source blobs being byte-identical at `53beb37`,
  `164d720` and `821330d` (`JsonModalBody.tsx` cfbec5b, `discordResponseToMessage.ts` 81f4562).
---

# UAT Report: Plan 013 — Components V2 support across the editing surfaces

**Plan Reference**: `agent-output/planning/013-components-v2-editing-surfaces.md` — rev 18, Status
`Approved` (frontmatter re-read at write time, 2026-08-24)
**Date**: 2026-08-24
**UAT Agent**: Product Owner (UAT) — session `uat-hooks-013` (rev 1–9); `uat-hooks-013-2` (rev 10, the gate pass)
**Plan Reference re-read at rev 10**: `agent-output/planning/013-components-v2-editing-surfaces.md` — **rev 20**, `Status: Approved`, frontmatter and D28 read directly 2026-08-24

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
| 2026-08-24 | qa-hooks-013-2 (`30f419f`) — receipt both ways, nothing owed | — | Rev 8. **F-QA14 concurrence recorded here**, because QA recorded it as concurred by both stages and a concurrence present in only one document is not one: an inference with a **sound conclusion** is the dangerous case, since the trap travels attached to a correct answer and nothing downstream contradicts it — **a stated gap survives being right**. **Run Record and Resumption** table added: BC-11a and the D20 clause terminal; **BC-11b owed and blocking**; U-1 with steering; the UAT gate itself entirely unstarted. Session ended near its run-length ceiling with work **complete, not truncated**. Still no verdict. |
| 2026-08-24 | steering-hooks-013-2 — **QA COMPLETE handed in, verdict invited** | Run the UAT gate and issue the release decision | Rev 9. **VERDICT DECLINED ON RUN-LENGTH GROUNDS, flagged early as instructed.** ~58 requests, 226k prefix; a sound verdict needs the identity re-derived as a content manifest (three uncommitted `website` source files in scope), four predecessor documents read directly, and **15** register rows driven terminal — far beyond the ceiling's ~10-request exception. **No predecessor document read, no status restated, no release decision issued.** Successor re-reads everything. Remaining budget spent only on what lowers their cost: **C-1…C-4** recorded as conditions rather than prose, and **BC-15/D28 re-derived from QA's register and the plan directly** (not from steering's restatement) and folded into Appendix A — including an ordering hazard nobody had stated: **BC-11b must precede BC-15 on any record**, and no Save may follow BC-15's Load, or the seed is consumed and cannot be re-minted. |
| 2026-08-24 | steering-hooks-013-2 — successor spawned by the owner after rev 9's ceiling handback | Run the UAT gate and issue the release decision | **Rev 10. THE GATE RAN. Release decision: `APPROVED FOR RELEASE, CONDITIONAL` over an 18-row ledger.** Resumed from rev 9's Run Record; **C-1…C-4 all discharged and each re-derived rather than adopted** — C-1's tip had already moved (`164d720` → **`821330d`**) and the three-path manifest reproduces digest-for-digest; C-2's BC-15 and D28 read from QA's register and plan rev 20 directly; C-3 stands unchanged; C-4 adopted no remedy. All four predecessor documents read directly: **QA `QA Complete` @ `821330d`** (green), **code review round 19 `APPROVED` but its document Status is `In Review` and no verdict covers `821330d`** (U-C1), **implementation Status `Active`, M6 unchecked, `821330d`/F-QA21 absent from it entirely** (U-C2). **Finding U-2 raised — the register carries two distinct `BC-13`s and two distinct `BC-14`s**; the Phase-1 `BC-14` (*the user-reported defect is fixed in production*) is the row a by-number reference silently drops, and it is the chain's own reason for existing. Routed to QA; every row here is named as well as numbered. **Twelve `PRE` rows stand outstanding** (eleven `NOT EXECUTED` outright; `BC-10` met on its suite limb with its spot observation owed) — Validation item 3 is owed before this verdict and is not met, which is why the approval is conditional and not unconditional. |

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

> **Dated pointer, 2026-08-24 (rev 10).** The text below is rev 4–9's and is preserved as written; it was correct for those passes, which deliberately issued no verdict. **The gate has since run.** The current UAT status and the release decision are in **“Rev 10 — The UAT Gate, Executed”** at the end of this document, and the frontmatter `Status-Detail` carries the short form.

**Status**: **NOT A VERDICT — precondition pass only.** Neither `UAT Complete` nor `UAT Failed`.
**Rationale**: QA Phase 2 has not run and the chain is not finished (M4 open, M6 open). The gate was
not exercised; one pre-deploy precondition was attempted and is blocked.

## Release Decision

> **Dated pointer, 2026-08-24 (rev 10).** The text below is rev 4–9's and is preserved as written; it was correct for those passes, which deliberately issued no verdict. **The gate has since run.** The current UAT status and the release decision are in **“Rev 10 — The UAT Gate, Executed”** at the end of this document, and the frontmatter `Status-Detail` carries the short form.

**None issued.** No `APPROVED FOR RELEASE`, no conditional approval, no `NOT APPROVED`.

Recorded for the pass that does issue one: a release decision must name the SHA or content identity
its predecessor verdicts were reached at, reproducing that identity from the tree rather than
inheriting it, and must state that any change to production code expires those verdicts and the
decision with them. The anchors touched by *this* revision are `website` `master` = `c85945f`
(production; read via a detached worktree) and the chain branch tip `ad9f331` (read only, not
verified). **Neither is a verdict anchor.**

## Next Actions

> **Dated pointer, 2026-08-24 (rev 10).** The text below is rev 4–9's and is preserved as written; it was correct for those passes, which deliberately issued no verdict. **The gate has since run.** The current UAT status and the release decision are in **“Rev 10 — The UAT Gate, Executed”** at the end of this document, and the frontmatter `Status-Detail` carries the short form.

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

## Concurrence — F-QA14 (method, routed to the retrospective)

Recorded here because QA has recorded it in `qa/013-...-qa.md` (`30f419f`) as **concurred by both
stages**, and a concurrence asserted in one document and absent from the other is not one. **This pass
concurs**, in the terms it originated:

> An inference whose **conclusion is sound** is the dangerous case, not the safe one. Had the
> `valid = false` inference been handed over as a comfortable result rather than a stated gap, it would
> have been adopted **with the trap attached to a correct answer** — and nothing downstream would ever
> have contradicted it, because the answer was right. **A stated gap survives being right.**

QA adds the generalisation, which this pass also concurs with: every instrument defect found in this
cwd so far was caught by a **contradiction against a second instrument**, never by re-running the
first. This one was caught instead by the originator declining to let the first instrument stand
alone — **cheaper than either**, because it costs one sentence at handover rather than a second
instrument later.

## Conditions the Successor Inherits — written as conditions, not prose

> **Dated pointer, 2026-08-24 (rev 10).** **C-1, C-2, C-3 and C-4 are all discharged this pass**, each re-derived from the tree and the source documents rather than adopted. Their dispositions are recorded in **“Rev 10 — The UAT Gate, Executed” § C-1…C-4**. The text below is preserved as written.

**Added rev 9, on steering's hand-in of QA COMPLETE. This pass did NOT read the predecessor documents
and issues no verdict; the successor re-reads all of them directly. What follows is recorded as
conditions so they are inherited as such rather than rediscovered in someone's prose.**

**C-1 — The release tip WILL move once, and QA's green rests on an uncommitted tree.** Per steering
(not re-derived by this pass): three `website` **source** files are QA's re-anchor and coverage work
and are uncommitted — `012-json-editor-repair-path.test.ts` and `012-message-mode.test.ts` (modified),
`013-fqa19-ingress-gate-reachability.test.ts` (untracked); `website` HEAD stands at `164d720`; QA's
commit grant covers `agent-output` only, so it correctly did not commit them. **Consequences the
successor must carry as conditions**: (a) `164d720` is **not** the final release tip; (b) the
code-reviewer's δ re-verification **re-opens** when the tip moves; (c) the verdict identity is
therefore a **per-path content manifest** — base SHA, exclusion list, uncovered populations named —
not a bare SHA, per the document-lifecycle rule for uncommitted content; (d) **those three files are
not this stage's to commit or revert.**

**C-2 — BC-15 exists and is `PRE`, and its owner column is `uat`.** Re-derived from QA's register and
plan rev 20 directly, not from steering's restatement. **D28** (owner ruling, selection prompt
2026-08-24) closes the mounted-render check by **the owner's own browser observation folded into
BC-11b's sitting**; no DOM harness joins this chain. BC-15's condition: *the owner observes that
5712's Load button is genuinely **enabled**, and that pressing it unedited clears the flag while
keeping the content.* Prediction: **button enabled; content intact; bit cleared.** Falsity signature,
in QA's and the reviewer's shared words: *an operator opens 5712's JSON, presses Load, and the button
is still inert although the gate computes false.* **If the observation contradicts the gate, that is a
finding and it re-opens QA's verdict** — it is not for the observer or this stage to reconcile.

**C-3 — BC-11b is unchanged.** `NOT EXECUTED`, non-terminal, blocking an unconditional approval. Its
subject remains *any party with a browser and a chain-tip environment carrying the shape*; the M8-G
clause admits *"in any environment seeded with the shape"*, and the owner is merely the only party
with a browser. **That is a fact about tooling and must not harden into a plan requirement.**

**C-4 — Not this stage's to settle, and no remedy is to be adopted**: R-5's widening is the blocking
edge before devops writes the deployment record, and **U-1 folds into that same decision point and is
not raised separately**. The seeds' disposition stays unruled (D20).

## Run Record and Resumption

> **Dated pointer, 2026-08-24 (rev 10).** This table described rev 9's stopping state and is preserved as written. It is **no longer current**: the successor session ran, and the row that read *“Not started — the UAT gate itself”* is now executed. See **“Rev 10 — The UAT Gate, Executed”**.

**This session stopped near its run-length ceiling, with its work for the night complete rather than
truncated.** Nothing was left mid-flight. A successor UAT session resumes **from this document alone**
and needs no briefing:

| | |
|---|---|
| **Done and terminal** | BC-11a (the mint) — `EXECUTED` 2026-08-24 on the owner's attestation, quoted verbatim above. D20's re-derivation clause — RESOLVED on the substance |
| **Owed, non-terminal** | **BC-11b (the ask)** — blocks an unconditional approval. **Appendix A is its one-shot script, current.** Needs a browser and a chain-tip environment carrying the shape |
| **Raised, awaiting disposition** | **U-1** (with steering) — the seeds disarm both limbs of assumption 7's falsifier; narrowed at rev 7 (R7's limb confirmed clean); carries the `valid`-boolean trap |
| **Not started** | The UAT gate itself. Predecessor-status checks, value assessment, the BC-1…BC-10 walkthrough, and the release decision are **all** still owed, and gated on Implementation, Code Review and QA Phase 2 (itself gated on M4 + M6) |
| **Registers** | QA's (`qa/013-...-qa.md`) is chain 013's single register and the authority on row *definitions*; **this document is authoritative on row state**, and QA's maintenance log names rev 7 (`92e3dbf`) as the successor entry point for BC-11a/BC-11b |
| **Left in place deliberately** | Detached worktree `/tmp/uat013-c85945f` at `c85945f`, this session's, not foreign debris. The shared tree's branch was never switched |
| **Standing** | Seed records **5855 and 5856 must not be deleted** — BC-11b runs against them. That instruction is steering's, not an owner ruling; D20 left their disposition expressly unruled |

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

### The sitting now carries TWO observations (rev 9), and their ORDER matters

Under **D28** the same browser sitting owes **BC-15** as well as BC-11b: *5712's Load button is
genuinely enabled, and pressing it unedited clears the flag while keeping the content* (prediction:
**button enabled; content intact; bit cleared**).

**ORDERING HAZARD — read before starting, because a one-shot sitting can destroy its own subject.**
BC-15's Load applies row D to the **draft**: after it, the composer's draft is Classic, content kept,
bit cleared. That draft **is no longer a row-E candidate**, which is precisely what BC-11b needs.

**Therefore, on any given record: run BC-11b FIRST, then BC-15.**

- BC-11b is **non-destructive as scripted** — step 4 dismisses without choosing, so nothing is written.
- **After BC-15's Load, do NOT press Save.** Loading alone changes the draft, not the stored record;
  saving would **persist the cleared bit and consume the seed permanently**, and the seeds cannot be
  re-minted — the mint route closed at deploy.
- If BC-11b has to be repeated after a BC-15 Load, **re-open the record fresh**; do not continue from
  the post-Load draft.

**This ordering is this pass's reading, not an executed result.** It follows from row D's stated effect
and from BC-11b needing a flag-over-content draft. **If the observer's environment behaves otherwise,
record what was seen and hand it back** — under the ambiguity rule above, not as a conclusion.

**BC-15 steps** (after BC-11b is complete on that record): open the 5712-shaped record → open **Message
JSON** → confirm the **Load button is enabled**, not inert → press **Load** with **no edits** → record
whether the warning appears, the body text `hi` **survives**, and the record shows as **Classic**.
**Then stop — do not Save.**

**If it cannot be run**, the disposition is already written by the planner and is not improvised: where
the D19 repair has run **and** no seeded environment is available, the suite is the evidence and the
reason recorded is *"the D19 repair preceded the deploy"* — **not** "no member to observe". If either
limb of that condition is unmet, the row is still owed and `NOT EXECUTED` is not a terminal state.

---

# Rev 10 — The UAT Gate, Executed

**Date**: 2026-08-24 · **Session**: `uat-hooks-013-2` (successor to `uat-hooks-013`, which handed back
at rev 9 on run-length grounds without issuing a verdict) · **Return channel**: `steering-hooks-013-2`.

Everything above this line is preserved as written. Nothing was overwritten; where this pass corrects
or supersedes an earlier statement it says so, dated, in place.

**What this pass did**: read the four predecessor documents directly, re-derived the tree identity from
the tree, drove every blocking-release-condition row to a state, and issued the release decision. It did
**not** inspect production source to form the verdict (this stage is a document review), did **not**
re-run the suite, and adopted **no** remedy for a finding that is somebody else's to settle.

---

## 1. Predecessor Status Verification

The gate my definition sets is: Implementation *complete*, Code Review *approved*, QA *QA Complete*.
Each read directly at write time, 2026-08-24. **One of the three is unambiguously met.**

| Predecessor | Required | Found | Verdict |
|---|---|---|---|
| **QA** — `agent-output/qa/013-components-v2-editing-surfaces-qa.md` | `QA Complete` | **`QA Complete`**, `Verified-At: 821330d` plus a three-path content manifest; suite **550 tests / 37 files / exit 0** at that composite identity | **MET** |
| **Code Review** — `agent-output/code-review/013-components-v2-editing-surfaces-code-review.md` | approved | Binding verdict **round 19 `APPROVED`** at `53beb37`; **round 19-δ CLEARED** at `164d720`. But the document's `Status` field reads **`In Review`**, and **no code-review verdict covers the release tip `821330d`** | **NOT MET as written** → condition **U-C1** |
| **Implementation** — `agent-output/implementation/013-components-v2-editing-surfaces-implementation.md` | complete | `Status: Active`. Six of seven milestones checked (M1, M2, M3, M4, M7, M8, all reviewed); **M6 unchecked**. The document does **not record `821330d` or F-QA21 anywhere** — `grep -c "F-QA21"` returns **0** | **NOT MET as written** → conditions **U-C2**, **U-C3** |

**Neither shortfall is a failure verdict, and this pass does not dress them as one.** No predecessor
returned FAILED; QA's Phase 2 `QA FAILED` at `4e9da96` was closed by the F-QA15 fix and superseded by
the refresh pass. What is missing is *coverage of the release tip* and *record closure* — both real,
both named below with an owner, neither a defect in the delivered behaviour.

**On the code-review gap specifically, and why this pass does not close it itself.** The reviewer's own
standing condition is that *any commit after `53beb37` re-opens re-verification*. `821330d` is such a
commit. This pass re-derived, from the tree, that the delta is confined to one test file and that both
reviewed source blobs are byte-identical across `53beb37`, `164d720` and `821330d` (`JsonModalBody.tsx`
`cfbec5b`, `discordResponseToMessage.ts` `81f4562`). **That is evidence for the reviewer's ruling; it is
not the ruling.** Whether a byte-identical source tree carries the verdict forward is the code-reviewer's
call under its own delta-round rule, and UAT taking it would be transferring a verdict, which is the
prohibited act.

---

## 2. Verdict Identity, Re-Derived From The Tree

Constructed this pass, not inherited — the full manifest is in the frontmatter `Verified-At`. In short:

- `website` HEAD = **`821330d`**, branch `chain/013-components-v2-editing-surfaces`; `c85945f` is an
  ancestor, so integration is a fast-forward.
- Three uncommitted **test** paths in scope, hashed as file bytes; **all three digests reproduce QA's
  manifest exactly**. Exclusion list **empty** — nothing foreign is in `website`'s working tree.
- **`master` is still `c85945f`, locally and on `origin`.** *The deploy has not run.* This is a
  pre-deploy UAT in the sanctioned order, not a recovery pass.

**Expiry, stated as this stage must state it**: any change to a **production-code** blob expires the
predecessor verdicts and this decision with them. Committing QA's three test paths moves the SHA but
**not** the production-code identity, and this decision survives that specific move — established by
`git diff --numstat` confining every delta from `53beb37` to `821330d` to one file under
`src/utils/__tests__/`, and by the two reviewed blob hashes above. It does **not** survive anything else.

---

## 3. C-1 … C-4 — the conditions rev 9 handed forward

Each re-derived from the tree or the source document, never adopted from a restatement.

- **C-1 — the tip will move; QA's green rests on an uncommitted tree. DISCHARGED, and it had already
  moved.** Rev 9 recorded HEAD at `164d720`; **the tree now stands at `821330d`** (the implementer's
  F-QA21 fix, committed after rev 9 was written). The three-path manifest reproduces digest-for-digest.
  QA's own re-anchor note records the move and re-ran at the new identity. C-1's consequence (a) is
  therefore *already realised once*; consequences (b), (c), (d) all stand and are carried as **U-C1**,
  the frontmatter identity, and **U-C4** respectively. **The three files remain not this stage's to
  commit or revert, and were not touched.**
- **C-2 — BC-15 exists, is `PRE`, D28 closes the mounted-render check by the owner's observation.
  DISCHARGED.** Re-derived from QA's register §10 and plan rev 20's D28 row directly. BC-15's owner
  column reads `uat (to record the owner's attestation)`; its subject is *the owner, in the BC-11b
  sitting*; its prediction is **button enabled; content intact; bit cleared**. **Confirmed: no DOM
  harness was added** — D28's ruling is honoured on both sides. Carried into the ledger below.
- **C-3 — BC-11b unchanged. CONFIRMED.** `NOT EXECUTED`, non-terminal, blocking an unconditional
  approval. Its subject remains *any party with a browser and a chain-tip environment carrying the
  shape*; M8-G's clause admits *"in any environment seeded with the shape"*. **This pass restates, as
  rev 9 did, that the owner's involvement is a fact about available tooling and not a plan
  requirement**, and does not write it into the ledger as one.
- **C-4 — R-5's widening and U-1 are not this stage's; adopt no remedy. HONOURED.** R-5's widening is
  recorded as **U-C5** and routed, not decided. **U-1 is folded into that same decision point and is
  not raised separately**, exactly as instructed. The seeds' disposition stays unruled (D20). No remedy
  is proposed for any of the three.

---

## 4. Value Delivery Assessment

**The Value Statement, clause by clause, against what the documents establish.** The plan's own
Objective is the yardstick: projection confinement, round-trip closure, and *the flag is the mode*.

| Value-statement clause | Delivering milestone | Documentary evidence | Delivered? |
|---|---|---|---|
| *"Save As" carries components and the V2 flag* | M1 (transport form at every write boundary), M8-G (persist gate) | Impl: M1-a…d delivered, round-2 `APPROVED_WITH_COMMENTS`; M8-G all three real persisting writers gate via `gateBeforePersist`, round 14 `APPROVED_WITH_COMMENTS` | **Yes, at the data layer** |
| *the Message JSON view carries them* | M2, M7 | M2-a/b/c delivered, round 13 `APPROVED`; JSON view shows stored `flags` | **Yes, at the data layer** |
| *copy and Load carry them* | M2-a, M2-c, M4-c, F-QA15 fix | The Load gate now floors the **resolved** draft, so row D loads: reviewer's closure/no-hole/no-crash attack at round 19, QA's fix-verify probe green (25 assertions, F1/F2 killed) | **Yes, at the data layer** |
| *import from a message URL, a webhook URL, or the bot's "Get Message"* | M3-a/b/c | `discordResponseToMessage` carries `components` and copies Discord's `flags` bit exactly, never derived from structure; unsupported types dropped **and named**; round 15 `APPROVED_WITH_COMMENTS` | **Yes, at the data layer** |
| *cross-tab change detection* | M1-d | `normalizeForHash` runs the live draft through the server's own zod normalisation before hashing; round-2 re-derivation widened the false-prompt class to 8/4 cases and confirmed the fix closes the wider class | **Yes, at the data layer** |
| *no editing action silently discards what I built* | M8 (D17's five rows), M8-E's choice UI | `enforceImportMutualExclusivity`'s silent strip retired at **both** JSON surfaces; row E asks and writes **nothing** before a choice; `applyDisposition` is the sole application path, grep-confirmed by the implementer and re-derived by the reviewer | **Yes, at the data layer** |
| *never misreports what kind of message it is* | M7 (D15/D16) | `isMessageV2` is the single predicate; `switchToV2` sets the bit; the composer shows V2 for every such record | **Yes, at the data layer** |
| *I never land on an empty copy of a message that was whole a moment ago* | M1 + M8-G together | The class the research named (flows 6, 11, 12, 13 producing empty records with `valid=false` and no error shown) is closed at the transport form and gated at every persisting writer | **Yes, at the data layer** |

**And the sentence this assessment turns on:**

> **Every clause above is delivered *in mechanism* and *unobserved in effect*.** Not one of the plan's
> twelve `PRE` operator-observable conditions has been executed. The evidence is module-level: pure
> functions, source text, a green suite, and adversarial probes. **What no document in this chain
> records is a human seeing any of it happen in a browser.**

That is not pedantry here, and the reason is structural rather than procedural. **013 exists to fix
failure modes whose signature is *absence*** — an empty copy, a body silently dropped, a prompt that
never fires, a button that is inert. A suite proves the gate *computes* the right answer. It cannot
prove React *applied* it — which is precisely what D28 registers, in QA's and the code-reviewer's
independently-reached shared words: *an operator opens 5712's JSON, presses Load, and the button is
still inert although the gate computes false.* **A silent failure mode is invisible to every instrument
this chain has run.** BC-15 and BC-11b are not tidy-up; they are the only instrument pointed at the
class the chain was commissioned to close.

**Verdict on value**: the objective is **achieved in the delivered code as documented**, and **not yet
demonstrated at the surface the user touches**. Core value is not deferred — it is built and unwatched.

---

## 5. Objective Alignment and Drift

**Does the code meet the original plan objective?** — **YES, with the surface layer unobserved.**

**Drift detected: none of substance.** Specifically checked and found clean:

- **Scope**: 18 files in the plan's inventory; 16 carry a real diff, 2 investigated and confirmed to
  need no change, both disclosed at the milestone that determined it. Two out-of-inventory deltas —
  `package.json` (D21, pre-explained) and `SaveChoiceModal.tsx` (new production file, M8-G) — are
  **explained, not absorbed**, by the implementer's own M6 reconciliation, derived from
  `git diff --numstat` against the merge-base rather than from any total stated aloud.
- **No feature growth**: D28 was taken specifically to *avoid* adding a DOM harness mid-chain, and the
  tree confirms it was not added.
- **Findings routed rather than silently absorbed**: B3-lossless to `agent-output/TODO.md` (a chain-012
  consequence), F-QA22 (`enforceImportMutualExclusivity` now has zero production callers) held as a
  planner item, F-QA11 bounded by execution to a single pre-existing site outside 013.

**One residual worth the owner's eye, recorded and not acted on**: 013 falsifies a plan-012 conclusion —
the B3 class now **has** a lossless path where 012 recorded that it had none, so 012's R19 repair
guidance is superseded. QA flagged it; it is lodged in `TODO.md`. **It changes what someone should be
told, not what 013 ships.** Communicating it is the owner's, not any agent's.

---

## 6. Finding U-2 — the register carries duplicate IDs, and one collision hides the chain's own reason for existing

**Raised by this pass. Not previously recorded by any stage. Routed to QA, whose register it is.**

Chain 013 has exactly **one** blocking-condition register, in QA's document, and this pass found no
second travelling list and mints none. But that single register now carries **two distinct rows numbered
`BC-13` and two distinct rows numbered `BC-14`**, because QA's Phase 2 append states *"continuing at
BC-13"* when the Phase 1 register already ran to `BC-14`:

| Number | The two rows it now names | Class | Owner | Terminal state |
|---|---|---|---|---|
| **BC-13** | *(Phase 1)* **bot-code TTL residue** — codes stored before go-live carry no dropped set, so the notice cannot render for them | POST | **devops** | outstanding, see ledger |
| | *(Phase 2)* **F-QA15's Load gate** — 5712's Load button is enabled and the repair completes | PRE | implementer | **DISCHARGED 2026-08-24** |
| **BC-14** | *(Phase 1)* **the user-reported defect is fixed in production** (handoff `8f3fa8c3`, observations 1/2/5/6/7) | POST | **uat** | outstanding, see ledger |
| | *(Phase 2)* **can Discord's API *return* a message carrying both classic content and V2 components** | POST | **uat** | outstanding, see ledger |

**Why this is a finding and not a tidiness note.** A reference by number alone silently resolves to one
of two rows, and a numbering slip can invert a blocking status invisibly to every check that reads the
sentence instead of the target. The concrete exposure here: **the Phase-1 `BC-14` is the row that
distinguishes *fixed* from *unfixed* in production for the user-reported defect this entire chain was
commissioned to fix.** It is the row most likely to be dropped by a reader who follows the number to the
Phase-2 append and stops. This pass caught it only by checking every numbered reference against the
register rather than following it.

**Disposition**: routed to QA for renumbering; **no row is withdrawn, no requirement changes, and this
document does not edit QA's register.** Every row in the ledger below is carried by **name as well as
number**, so a later renumbering cannot invert anything here.

## 7. Finding U-3 — two record-hygiene defects, neither blocking

1. **QA's `Verified-At` frontmatter is truncated by YAML.** It reads
   `Verified-At: 821330d  # re-anchored 2026-08-24; supersedes 164d720 (see Re-anchor note)`. The
   `#` comment is dropped by any YAML reader, so the pointer to the Re-anchor note — which is what makes
   the value auditable — is invisible to every machine reader. Caught by
   `node tools/check-repo.js`, which names this failure explicitly. **The value itself (`821330d`) is
   correct and this pass verified it against the tree**; only the pointer is lost. Routed to QA.
   *(Document-lifecycle: free-prose frontmatter values are always quoted.)*
2. **`node tools/check-repo.js` reports FAIL, 14 problems.** Run from `agent-output/` this pass.
   **None is in `uat/`.** One is U-3.1 above; four are stale links in 012 documents and probe READMEs;
   six are duplicate basenames across `verification/013/` probe directories (a convention, not a
   defect); three are stage-suffix conventions for `deployment/` and a 012 carry-forward file.
   **Recorded because the skill requires it and because a FAIL that is always FAIL stops being read.**
   Not blocking; not this stage's to fix.

---

## 8. Weighing of Production Evidence

**None is offered, none is claimed, and none is available.** `master` stands at `c85945f`; 013 has not
deployed. There is no *"it has been running a week with no errors"* to weigh here, and this pass
records the absence deliberately rather than leaving it to be inferred.

Recorded so it cannot be reached for later: **were such an attestation offered after deploy, it would be
evidence against 013's loud failure modes only** — a crash, a 4xx on send, a broken render every user
sees. **It would be no evidence at all against the silent ones**, and 013's entire subject matter is
silent: an empty copy, a body dropped without a word, a prompt that never fires, a button that stays
inert. Those signatures *are* absence, so an argument from absence would be circular. **BC-1…BC-11b,
BC-14 and BC-15 are what covers the silent class. Nothing else does.**

---

## 9. The Blocking Release Condition Ledger

**This is the chain's one register, restated by state.** QA's document
(`agent-output/qa/013-components-v2-editing-surfaces-qa.md`, re-read at write time 2026-08-24) is the
authority on row **definitions**; **this document is authoritative on row state**, per the register's own
standing note. Rows are named as well as numbered (finding U-2). **No row is withdrawn — `WITHDRAWN` is
the owner's ruling alone, and this pass rules none.**

`PRE` = must be terminal **before the release act**. `POST` = post-deploy-observable; gates the **chain's
closure**, never the release act.

### 9.1 `PRE` rows — terminal before the release act

| Row (number · name) | Owner (from the **primary** instrument) | Prediction | State |
|---|---|---|---|
| **BC-1 · Load confirmation names what changes** | operator with a browser at a chain tip | the confirmation names both differences before anything is committed | **NOT EXECUTED** |
| **BC-2 · URL/webhook import names uncarried types** | operator | dialog shows supported components **and** a notice naming the select | **NOT EXECUTED** |
| **BC-3 · bot `Get Message` path shows the same notice** | operator | editor opens with supported components and the same notice | **NOT EXECUTED** |
| **BC-4 · import failing the floor keeps the dialog open, does not navigate** | operator, **paired with** the suite's no-upsert assertion (EC-3) | dialog stays, error shown, no new message created | **NOT EXECUTED** (suite limb met) |
| **BC-5 · folder-page export paste shows the floor error, not green** | operator | *"Message must have content, embeds, or components."* | **NOT EXECUTED** |
| **BC-6 · the lenient filter names the dropped types** | operator | the notice names the type | **NOT EXECUTED** |
| **BC-7 · paste a container → V2, bit set, visible warning** | operator | editor in V2 with the container **and** a warning | **NOT EXECUTED** |
| **BC-8 · paste the 5712 shape → Classic, content intact, bit cleared, warning, no V2 error** | operator | Classic, `hi` present, warning shown | **NOT EXECUTED** |
| **BC-9 · paste content+container → two options, nothing created before a choice** | operator, paired with the suite | two options; nothing created before a choice; **both** outcomes verified by repeating with the other option | **NOT EXECUTED** |
| **BC-10 · M8-F parity across modal Load and New Message paste** | **qa (suite is primary)**; operator for a two-cell spot check | identical dispositions, cell by cell | **SUITE LIMB MET** — 550/37/exit 0 at the verdict identity; **spot-observation limb NOT EXECUTED** |
| **BC-11 · (pointer)** | — | — | **SUPERSEDED by BC-11a + BC-11b.** No requirement withdrawn |
| **BC-11a · the mint** | uat (records the attestation) | both records appear; a single successful save refutes *"the route is closed"* by construction | **`EXECUTED` 2026-08-24 — TERMINAL.** The owner minted 5855 and 5856 and attested it verbatim (quoted above, rev 4). Confirmed unchanged this pass |
| **BC-11b · the ask fires on save over a seed** | operator with a browser at a chain tip carrying the shape (**not automatically the owner** — C-3) | the ask appears naming both drops; **nothing written** before a choice | **NOT EXECUTED** — non-terminal, **blocks an unconditional approval** |
| **BC-13 *(Phase 2)* · F-QA15's Load gate** | **implementer** — its primary needs no human | probe green; 5712 loads and saves with content intact and the bit cleared | **`EXECUTED` / DISCHARGED 2026-08-24** at `164d720`; probe green, 25 assertions, mutants F1/F2 killed. **Its mounted-render half moved to BC-15** |
| **BC-15 · D28's mounted render** | uat (records the owner's attestation), observed by the owner in the BC-11b sitting | **button enabled; content intact; bit cleared** | **NOT EXECUTED** — non-terminal, **blocks an unconditional approval** |

**Twelve `PRE` rows stand outstanding**: eleven `NOT EXECUTED` outright (BC-1…BC-9, BC-11b, BC-15) and
**BC-10** met on its suite limb with its spot observation owed. **Two are terminal** (BC-11a, BC-13/P2).

**The plan's Validation item 3 requires every human-observable form to be executed and recorded
*before UAT's verdict*. It is not met, and this pass does not pretend otherwise** — that shortfall is
the entire reason the approval below is conditional rather than unconditional.

### 9.2 `POST` rows — gate the chain's closure, never the release act

Per this stage's rule, each is acted on **at its earliest-decidable condition** — watched for
decidability, not left until somebody happens to look.

| Row (number · name) | Owner | Earliest decidable | Prediction | State |
|---|---|---|---|---|
| **BC-12 · a V2 message that sent at `c85945f` still sends after deploy** | implementer owns the decision (M8-G send path); **uat owns the observation** | the deploy is live | **the send succeeds. A single 4xx refutes by construction** — not a rate to accumulate; one failure is a hotfix trigger | **NOT EXECUTED** — conditionally approved, gates chain closure |
| **BC-13 *(Phase 1)* · bot-code TTL residue** | **devops** (records the window in the deployment record) | **one hour after the deploy SHA is live** | the residue is empty | **NOT EXECUTED** — devops resolved the instrument as the owner's attestation timestamp, a conservative upper bound (readiness F-1) |
| **BC-14 *(Phase 1)* · the user-reported defect is fixed in production** | **uat** | the deploy is live | all four observations confirmed | **NOT EXECUTED** — *the row a by-number reference drops; see U-2* |
| **BC-14 *(Phase 2)* · can Discord's API *return* a message carrying both classic content and V2 components** | **uat** | chain tip deployed **and** an import attempted against a message known to predate V2 enforcement | if such a message exists, the row-E choice appears rather than silent loss | **NOT EXECUTED** |

**Single-observation sufficiency, read off the rows themselves**: BC-12's prediction states that one 4xx
refutes by construction, and BC-11a's states that one successful save refutes by construction. Those
rows close on **one discriminating instance** and must not be left accumulating a rate.

### 9.3 Conditions this stage adds — documentary, not behavioural

| ID · name | Owner | What is owed | State |
|---|---|---|---|
| **U-C1 · code-review coverage of the release tip** | **code-reviewer** | A δ re-verification covering `821330d` — and, once QA's three test paths land, the tip they produce. Steering is holding one ping so a single pass covers both moves; this pass endorses that sequencing but does not schedule it | **NOT EXECUTED** |
| **U-C2 · the implementation document records the release tip** | **implementer** | `821330d` and F-QA21 appear nowhere in it (`grep -c` = 0). The chain's release tip must be recorded in the document that owns delivery, and the doc's `Status` must reach a completed state | **NOT EXECUTED** |
| **U-C3 · M6 record closure** | **steering** (the two handoff re-status lines) and **the architect** (the architecture correction) | The implementer's share is delivered; the two other shares are not. M6 is the only unchecked milestone | **NOT EXECUTED** |
| **U-C4 · commit approval for QA's three test paths** | **the owner** (approval); **devops** (integration) | QA's grant covers `agent-output` only and it correctly declined the implementer's offer to commit on its behalf. Until they land, the suite-green half of QA's verdict rests on a working tree | **NOT EXECUTED** |
| **U-C5 · R-5's widening** | **the owner** | The deployment record is known incomplete as the plan states it. Devops names this **the blocking edge** before the record can be written. **U-1 folds into this same decision point and is not raised separately.** No remedy is adopted or proposed here | **NOT EXECUTED — owner's decision, routed not decided** |

**On U-1, once, so it is not mistaken for silence**: records 5855 and 5856 are permanent members of
`flagStructureDisagreement`, so a working D19 repair will read as a failed one unless the residual is
named. **The wording is the planner's, the deployment-record line is devops's, the seeds' disposition is
the owner's (D20 left it expressly unruled). This pass adopts none of them.** It folds into U-C5.

---

## 10. Validation and Release Conditions — plan compliance

| # | Condition | State |
|---|---|---|
| 1 | typecheck, full suite, build green on the chain tip (reviewer and QA re-run, never inherit) | **MET** on QA's and the reviewer's own instruments: 550/37/exit 0 at the verdict identity; `tsc` 0; `next build` 0. **Not re-run by this stage, which does not re-execute tests** |
| 2 | M1-a's reference list captured and reconciled by `grep -rc` | **MET** — captured in the implementation doc, counts computed inside grep |
| 3 | **Every human-observable form executed and recorded before UAT's verdict** | **NOT MET** — twelve `PRE` rows outstanding. This is the condition the conditional approval is built around |
| 4 | R-4: no live `valid` declaration, nothing triggered in the statbot workspace; the deployment record says so in one line | **OWED at the deployment record** — devops's line, not written |
| 5 | R-5: the deployment record states, per flow, that the surface no longer writes floor-failing records, plus the D12 import line | **OWED — U-C5, the owner's decision. The blocking edge before devops writes the record** |
| 6 | Post-deploy observables, owner-observed | **OWED** — carried as BC-12, BC-14 (Phase 1), BC-14 (Phase 2) |
| 7 | Rollback: the serving ref moves back to `c85945f`; no schema, no data migration, nothing in `project-utils` | **UNDERSTOOD, with a devops caveat this pass carries rather than resolves**: the readiness assessment records that the rollback *as the plan states it* is a force-push, **which is nobody's to run on their own initiative**. Devops's finding, devops's to resolve before the release act |
| 8 | The deployment record **and UAT's release decision** each state, in one line, which came first: M8-G's production observation, or the owner's D19 repair | **STATED BELOW — §11** |

---

## 11. Validation item 8 — the ordering line, re-derived at this pass

Required in one line, and re-derived at write time rather than carried from rev 9:

> **As of 2026-08-24, neither has occurred.** M8-G's production observation has not happened — BC-11b is
> `NOT EXECUTED` and the deploy has not run (`master` = `c85945f`). No declaration by the owner that the
> D19 repair of 5712/5842 has run appears in the plan, the QA document, the deployment readiness
> assessment, or `agent-output/OWNER-QUEUE.md`, each read at write time.

**Consequence, stated because it is a one-way door and it closes on its own**: M8-G's production-reachable
observation exists **only while a member of the population is unrepaired**. Seeds 5855 and 5856 are that
population now, and **they cannot be re-minted — the mint route closes at deploy**. If the D19 repair runs
before BC-11b and BC-15 are observed, and no seeded environment is stood up, the planner's own fallback
applies verbatim — *the suite is the evidence, and the reason recorded is "the D19 repair preceded the
deploy", not "no member to observe"*. That fallback is **conjunctive** and is not available today: the
repair has **not** run. **Until it does, the row is owed and `NOT EXECUTED` remains non-terminal.**

**The ordering hazard rev 9 established stands and is carried, not re-derived live at the sitting**:
on any given record, **BC-11b runs FIRST, then BC-15**; **after BC-15's Load, do NOT press Save** — Load
changes the draft, not the stored record, and a Save would persist the cleared bit and **consume the seed
permanently**. Appendix A is the one-shot script, current, and is marked as this chain's reading rather
than an executed result.

---

## 12. UAT Status

**Status**: **UAT Complete**

**Rationale**: the gate ran. The Value Statement is delivered in mechanism across every clause, with the
delivering milestone and the reviewing round named for each; drift is nil; no predecessor returned a
failure verdict; and the residue is fully enumerated with an owner and a terminal state per row. **UAT
Complete is a statement about this stage's work being finished, not a claim that the surface layer has
been observed** — it has not, and §4 and §9 say so at length.

## 13. Release Decision

**Final Status**: **APPROVED FOR RELEASE, conditional on the human click-through of BC-1 … BC-10,
BC-11b and BC-15. If any of these fail, return to the implementer before release.**

Additionally conditional on **U-C1 … U-C5** reaching a terminal state before the release act.

**This is a ledger, not an exception.** Every outstanding condition above names an owner and one of
three terminal states — `EXECUTED` (with result and date), `WITHDRAWN` (the owner's ruling alone), or
`SUPERSEDED` (with what replaced it). **`NOT EXECUTED` is not a terminal state**: it blocks an
unconditional approval, and **no release is recorded complete while any `PRE` condition stands at it**.
*"Satisfied incidentally"* is not a terminal state either — record it as `EXECUTED` with the evidence, or
it was never a gate. **This pass withdraws nothing; any request to withdraw a condition goes to the
owner through steering.**

**The identity this decision is anchored at**: `website` `821330d` plus the three-path test manifest in
the frontmatter, re-derived from the tree by this pass and not inherited from any predecessor.
**Any change to a production-code blob expires the predecessor verdicts and this decision with them.**
Committing QA's three test paths is the one move this decision survives, on the derivation in §2.

**Why conditional and not `NOT APPROVED`**: nothing in the delivered behaviour is known to be wrong.
Every gate that has run has passed, the one blocking QA defect was found, fixed, and independently
fix-verified, and the outstanding work is a browser sitting plus four documentary closures. **Why not
unconditional**: the plan's Validation item 3 places the walkthrough *before* this verdict, twelve `PRE`
rows are outstanding, two predecessor documents do not cover the release tip, and the failure class 013
exists to close is silent — invisible to every instrument that has run so far.

**Recommended version**: **none, and none is to be synthesised.** `website/package.json` carries no
`version` field and the repo has no CHANGELOG (plan, *Release Artifacts*); the release **is the serving
ref moving from `c85945f`**, which devops names in the deployment record. Recommending a semver bump here
would mint an artifact the plan expressly declines.

**Key changes for the release record** (devops's to place; content, not wording):

- Components V2 components and the V2 flag now survive every editing surface: Save As, the Message JSON
  view, copy/Load, URL / webhook / bot-code import, and cross-tab change detection.
- The silent content strip at both JSON surfaces is retired; content loss is now disposed of by five
  explicit rows, and the ambiguous case **asks** and writes nothing until the user chooses.
- A record whose V2 flag is set without V2 components now opens in V2 mode and can be repaired with one
  unedited Load — *open JSON, Load, Save*, zero edits.
- Discord ingress carries the V2 flag exactly as Discord sent it and names any component types it could
  not carry.
- Cross-tab *"Message Update Detected"* no longer fires on a no-op save.
- **Consumers of chain 012's guidance**: the B3 class now has a lossless path where 012 recorded it had
  none; 012's R19 repair guidance is superseded.

---

## 14. Next Actions

*Point-in-time list — later stage documents are authoritative on these items' current state.*

1. **The browser sitting — BC-1 … BC-10, BC-11b, BC-15.** One sitting, at a chain-tip environment (per
   M8-G, production is not required — any environment seeded with the shape qualifies). **Appendix A is
   the one-shot script and is current.** Order: **BC-11b before BC-15 on any record; no Save after
   BC-15's Load.** The observed result is recorded **beside** the prediction, never over it. **If the
   observation contradicts the gate, that is a finding and QA wants it back — not a stale fixture to
   explain away.**
2. **U-C1 — code-reviewer**: one δ re-verification covering `821330d` and the tip QA's three files
   produce.
3. **U-C2 — implementer**: record `821330d`/F-QA21 in the implementation document and bring its `Status`
   to a completed state.
4. **U-C3 — steering and the architect**: M6's two remaining shares.
5. **U-C4 — the owner**: commit approval for QA's three test paths.
6. **U-C5 — the owner**: R-5's widening, the blocking edge before devops writes the deployment record.
   **U-1 folds into this decision and is not a separate ask.**
7. **U-2 — QA**: renumber the duplicate `BC-13` / `BC-14` rows. No requirement changes; the exposure is
   that the Phase-1 `BC-14` is the row a by-number reference drops.
8. **U-3 — QA**: quote the `Verified-At` frontmatter value so its pointer survives YAML.
9. **After the sitting**: the retrospective's precondition (UAT Complete) is satisfied now; devops
   executes the release once the `PRE` ledger is terminal.

