# TODO — Agent Output

What is not started. Any session may append. **Resolution is deletion, not a tick** — the memory is
the change it caused: the edit, the commit, the file that now exists.

This file holds work an agent could do. Decisions only the owner can take go in `OPEN_QUESTIONS.md`.

---

## Per-repo architecture records do not exist

`architecture/system-architecture.md` now covers the workspace at workspace altitude, but there are
no per-repo records (`architecture/<repo>.md`) for `website`, `project-utils`,
`preview-image-generator` or `cdn`. A brief for work in a repo carrying such a record is supposed to
cite it; here there is nothing to cite.

Raised by `architect-hooks-1`, 2026-08-23. Whether every repo needs one, or only `website` and
`project-utils`, is a judgement for the architect.

## 012's re-measurement of 5712/5842 must key on the reason string, not `valid = false`

Chain 012's QA owes a re-measurement of records 5712 and 5842 after 013 ships. **The obvious form of
that measurement is wrong.**

An unqualified `valid = false` **does not discriminate**. `validateMessage` refuses a V2 message
carrying embeds or content with *"Components V2 messages cannot contain embeds or content."*, but it
also refuses a username-less message with *"This username is too short or too long."* — an unrelated
reason. A record can therefore be invalid for two independent reasons at once, and the boolean cannot
tell them apart. **Key on the reason string.**

Established by execution at `c85945f` by `qa-hooks-013-2` (F-QA13, `32737d3`), while checking an
inference `uat-hooks-013` had deliberately flagged as unexecuted rather than relied on. The
conclusion the inference reached was correct; the trap was in its reasoning, and executing it is what
surfaced the trap.

Recorded here because it is a chain-013 finding with a chain-012 consequence, 012 is wholly held
under D20 with no live session to receive it, and the 013 documents that carry it are not what a 012
resumption reads. Anything else touching `valid` — the R-5 deployment-record line, or a rewording of
assumption 7's falsifier — is bitten by the same thing.

Raised by `steering-hooks-013-2`, 2026-08-24.

## Three open handoffs, unassigned — moved here from steering's docket 2026-08-24

Unstarted work, so it belongs here rather than in a docket. Each is `Status: Open` in `handoff/` with no
owning stage. **Cite the handoff documents; the lines below are pointers, not restatements.**

- **`8818bd89` (`a3d60d5`) — v1 guild-messages endpoints have no authorization.** `middleware.ts`'s guard
  **cannot fire**: the `matcher` prefix is wrong **and** the check is `startsWith('/api/v1/*')` with a
  literal asterisk. **Each defect masks the other, so either fix alone reads correct and changes nothing** —
  whoever takes this must fix both or verify neither. Owner answered **`handoff`** when asked how to route
  it. **Cheapest thing to settle first: whether the deployed edge already blocks `/api/v1/*`** — not
  established, and it decides the severity. Related: CRITICAL-1, reconfirmed live at `66e1974` against a
  local instance, **not** established for the deployed environment.
- **`35274074` (`aa430c8`) — four unsaved-change guards are inert for unauthenticated users.** `hasChanged`
  is `status === 'authenticated' && …`. **Run item 4's falsity signature BEFORE fixing `hasChanged`**:
  fixing it closes items 1–3 and leaves item 4 broken while the document reads fully discharged.
- **`e6ac06b5` (`58d177f`) — failed preview generation shows a broken image, not a stale one.** Against the
  owner's *"Show a stale one is fine"*. **The fallback may have nothing to fall back to** — establish that
  before designing the fix.

## 013 falsifies a plan-012 conclusion: the B3 class now HAS a lossless path

Lodged 2026-08-24 by steering-hooks-013-2, routed from `qa-hooks-013-2`'s Phase 3 verdict (`c14e965`).
**Chain 012 is held under D20 with no live session, and 013's documents are not what a 012 resumption
reads** — same reason the reason-string item above lives here.

**Plan 012 concluded the B3 class has NO lossless path — that "neither instruction is safe alone".**
**QA established by execution at 013's tip that this is now false for one of the two instructions.** A
message carrying the V2 flag plus classic content plus an Action Row resolves to **row D**, and
`applyDisposition` **clears the bit while keeping BOTH the content and the Action Row**.

**The toggle path still destroys the content.** So the two instructions are **no longer equal in cost**, and
the editor is the **strictly safer** one to send. **012's guidance to the owner was chosen on the premise
that neither was safe** — that premise no longer holds, and the guidance should be re-derived rather than
re-issued.

**Do not treat this as a 013 release condition.** It changes nothing 013 must do; it changes what 012's
resumption should say. Whoever picks up 012 owns the re-derivation.

**Verify before acting on it**: this is steering relaying a QA execution result, not steering's own
measurement. The instrument and assertions are in QA's Phase 3 document at `c14e965`.

## The held 013 planner queue — five items with no register row

Added 2026-08-25 by `steering-hooks-013-2`, moved out of the steering docket because **unstarted work
is not docket material** and the docket was at twice its ceiling carrying them. Four sibling items
**are** registered — read **D23/D24/D25** in `planning/013-components-v2-editing-surfaces.md` rather
than restating them. These five have no row anywhere, so their evidence is written out once here.

**Status: still held.** Owner, 2026-08-24: *"Hold everything, as before."* **D24 killed the automatic
trigger — only an owner ruling starts the pass.** As of 2026-08-25 the planner session he elected to
spawn (`planner-hooks-013-2`) has never appeared across five polls, and three stages have since run
work with no plan revision behind it.

1. **The persist API accepts the 5712 shape from any caller.** D18/D19 is a **client convention, not a
   server-enforced invariant**. `79bbcaf`.
2. **Specs are not typechecked.** `tsconfig.json` excludes `**/__tests__` and vitest does not
   typecheck. `d692206`. **The exclusion must NOT be deleted — it is what fixes the Vercel build
   (`8f28066`), so the obvious tidy breaks the deploy.** The fix is a second `tsconfig.test.json`.
3. **M4-b's disclosure residual, and it is the owner's call.** The disclosure pass shares
   `filterSupportedComponents`' exact recursion, so disclosure cannot drift from the drop (`5913892`,
   `probe-cr20` 10/10). **Residual: an empty-as-pasted `{type:17,components:[]}` is dropped whole with
   no named type and still flips row E silently.** Nothing renderable is lost. **Hold it as its own
   line or close it as degenerate — never close it by silence.**
4. **MEDIUM-4 — a confirmed hit on a D18 Risks row the plan cannot record.** The persist gate's
   `hasClassicContent` is narrower than `validateContentRequirements`; they disagree on empty-ish
   embeds, so a pasted V2 component plus an empty embed persists unsendable with no choice shown.
   `probe-cr16-persist-gate/` 21/21. **Whether M4-c's predicate-agreement subsumes it is an UNVERIFIED
   candidate — a held item assumed discharged is worse than one still held.**
5. **F-QA11 — pre-existing at `c85945f`, OUTSIDE 013's scope, and it must not become a 013 fix round.**
   `NewMessageModal.tsx:143` sends `guildId: '0'`, refused by `discordIdShape`, while `disableSave`
   does not check the guild. **Two of the four sibling sites guard that exact `'0'` sentinel**
   (`SaveAsMenu.tsx:41`, `f/[id]/page.tsx:354`), which is what makes it an oversight rather than a
   design, and a cheap fix.

6. **Plan 013 assumption 7's falsifier is UNREADABLE, and no instrument on this machine can read it.**
   Its signature is *the classifier reading `> 0` after the owner declares the D19 repair done*. The
   repair ran on 2026-08-25 (**D43**, plan rev 37/38/40). But `backfillValid.ts:192-198` selects
   `.where('valid','is',null)` and accumulates diagnostics **only over rows in that batch**, so every
   category in a report covers `rowsClassifiedThisRun`, not the table. Every row now carries a non-null
   `valid`, so the next run classifies nothing and reports zeroes over an empty set — **and an empty
   measurement is byte-indistinguishable from a pass in the report's own JSON.** The owner's post-repair
   run reads `count: 0` over `rowsClassifiedThisRun: 2` against `tableWideRowCount: 4839`.
   **Reading it would take a read-only table-wide classifier, or setting `valid = NULL` across 4839 rows
   — which is a write, not a measurement, and is not obviously safe. Neither exists and neither is
   authorised.** **This is not a 013 fix round and must not become one**; it is recorded so a future
   stage does not quote a zero from that report as evidence of anything. The detector-selection
   disposition is QA's and `uat`'s. **Not reached by D44** — D44 struck two record IDs and their
   dependents; this is a defect in the instrument, which has no struck subject.

## `check-repo.js` CHECK 4 has no stage suffix for two artifact kinds stages actually produce

Demoted here from `INBOX.md` 2026-08-25 by steering-hooks-013-3, its author's ask having been
*"nothing blocking"*. **Verified at the tree by that author before filing**, not relayed.

`STAGE_SUFFIXES` (`tools/check-repo.js:545`) maps `deployment/` to the single suffix `deployment`, and
the match at line 577 accepts only `rest === s`, `rest.endsWith('-'+s)` or `rest.includes('-'+s+'-')`.
So under `deployment/` the only legal basename tail is `-deployment`. Three SCOPE failures follow, two
readiness documents and one carry-forward code-review pass.

**It is a model gap, not a naming error.** A readiness assessment is produced *before* the release act
and can return NO-GO; the record is produced *by* it. Naming a readiness document `-deployment` would
make the checker pass by making the corpus wrong, and `STAGE_ORDER` would then order two unlike
documents as the same stage. **Both devops sessions independently declined to coin a name to satisfy
the validator, and each disclosed the failure in its own document.** That call was right and is not
being revisited.

**Not fixed, and here is what fixing it needs.** The obvious candidates are `-readiness` under
`deployment/` and something for a carry-forward pass under `code-review/`. **Adding a suffix silently
blesses whatever name is chosen for every future document**, so it is a convention decision, not a
patch. `tools/` is source: **the change needs the owner's approval, and the convention should be
settled before it is asked for.**

## `verification/` needs a convention: a probe directory must not hold an editable second copy of a file the tree executes

Proposed by `qa-hooks-013-3` 2026-08-25 **with its reason and deliberately not enacted** — it judged enacting
it mid-chain to be displacement while the observation count stands at zero, and I agree. Recorded here so
the proposal survives the session that made it.

**The incident it generalises.** QA's independent oracle was adopted into `website/src/utils/__tests__/`
and a copy remained under `verification/013/probe-qa-verify-rider2/`. Two review findings were then
corrected **in the copy only**. Three stages — QA, `uat`, and this thread — reported or relied on a fix
that had not shipped; `code-reviewer-013-4` caught it by measuring the tree (`grep -c "D13"`: shipped
**0**, probe **5**; 186 lines against 215). **No behaviour was affected** — all sixteen `id`/`expected`
pairs were byte-identical — so the whole cost was to the record.

**Why every existing safeguard missed it**, which is the part worth keeping: **every instrument in that
directory hashes or compares the copy against itself.** None asserts anything about the shipped file, so
all of them are tuned to detect a copy falling **behind**. `uat`'s formulation: *"a copy that lags looks
wrong on inspection; a copy that leads looks like progress."* The reviewer placed it as `probe-cr1` /
`probe-cr10`'s fossil defect **running in reverse**.

**QA's three proposals, in its own order of preference:**

1. **A probe directory must not hold an editable second copy of a file the tree executes.** Its sentence:
   *"the moment my oracle was adopted into `src/utils/__tests__/`, my copy stopped being an instrument and
   became a rival."*
2. **Where a copy must exist, its manifest hashes the SHIPPED file**, so it fails on divergence in
   **either** direction.
3. **Cheapest and best: keep a pointer and a SHA, not a copy. A pointer cannot run ahead.**

**Not decided.** `verification/`'s scope was ruled by QA at P3.16 — the directory is the chain's, and each
stage indexes its own instruments — so a convention over it is the agent-output domain's to set, and it
binds every future chain's probes. It should be settled deliberately rather than as a fix round.


## Seven of the owner's eight 013 checks were never traced back to a milestone criterion

Raised by `qa-hooks-013-4` as its §V.38 Assumption Not Checked, 2026-08-25, and routed to steering as the
party that lifts operator text into `OWNER-QUEUE.md`. **Owned by the planner** — a check that must bind
enters by plan revision, not by queue text alone.

**The gap.** `Criteria-At` names one artifact; the owner executed **eight** checks. QA's Blocking Release
Condition register is the mapping from those checks back to milestone criteria. **QA traced item 8 by
hand** (BC-4 → M3-c, `Milestones` byte-identical rev 49→50). **Items 1–7 it did not trace.**

**QA's stated falsity signature:** the owner executes an item, it fails, and no plan criterion and no QA
assertion corresponds to what he ran — *"the failure has nowhere to land and gets settled by argument over
whether it was really a criterion."*

**Why this is parked rather than commissioned.** Two reasons, and the second is the load-bearing one:

1. **All seven passed.** The signature QA names requires a failure, so for these seven it can no longer
   fire. What remains is record integrity — the chain would claim criteria were validated by checks whose
   binding to them was never established — which is a retrospective concern, not a release blocker.
2. **Commissioning a planner pass would expire both freshly re-issued verdicts.** QA re-anchored to plan
   rev 50 at `4600880` and `uat` at rev 45; a plan write moves the criteria axis and expires them again.
   **Steering did exactly this tonight by accident** — a D53 registration pass one minute after a gate was
   issued — and the cost was a full re-issue round on both stages. Doing it deliberately, to bind checks
   that have already passed, would be a worse version of the same mistake.

**The analysis does not require a plan write; only binding the result does.** The seven traces can be
derived against the existing register at any time and registered later, so this does not have to wait for
a quiet moment in the plan.

**Do it before the next chain's click-through, not after.** QA's point stands in general even though it is
mooted for these seven: tracing is cheap in advance and unsettleable in arrears.
