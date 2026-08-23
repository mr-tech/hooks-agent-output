---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Verified-At: >-
  Phase 1 — NOT a verdict anchor. Strategy designed and the M2 spec executed against
  `website` chain/012-message-valid-field @ 72dc7de and `project-utils`
  chain/012-message-valid-field @ eb38a15, both clean, 2026-08-23. Phase 2 records its own.
Status: Awaiting Implementation
Status-Detail: >-
  Phase 1 rev 3. Strategy complete and re-derived against plan rev 6 (`7af8936`), which enacted
  all three QA findings (D11, D12, F-QA2). R12/R13 closed by owner ruling. One new finding —
  F-QA8, M2-f's recovery is reachable but content-destructive — routes to the owner. Rev 3 adds
  F-QA9 (whitespace-content class, undecided truth condition) and F-QA10 (top-level-only detection
  is complete over the representable domain, not by checking; falsifier installed), and corrects
  rev 1's account of the JSON-modal path. Rev 4: R16 and R18 both **closed by owner ruling** —
  F-QA8 accepted with the guidance redirected to the JSON editor, F-QA9's live POST **withdrawn**
  in favour of measuring the population at M6-b. Successor rows R19 and R20 carry the executable
  residue.
---

# QA Report: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` (rev 4, commit `13b4d4c`)
**Critique Reference**: `agent-output/critiques/closed/012-message-valid-field-critique.md` (commit `cd742f7`, APPROVED)
**Contract**: `agent-output/handoff/message-valid-field-for-statbot-2026-08-23.md` (UUID 61f24e56) — owner-accepted, not amendable without him
**QA Status**: Awaiting Implementation
**QA Specialist**: qa (session `qa-hooks-012-1`)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-23 | steering-hooks-012 | QA Phase 1 — test strategy before implementation | Phase 1 written. Sources read in full: plan rev 4, critique (closed, APPROVED), both handoffs, workspace architecture record. Code read directly on both chain branches. Deliverables: executability determination, testing-infrastructure list, Irreversible Side-Effect Register, per-criterion property audit, pre-registered M2 partition spec (executed — Red confirmed), mutation sweep plan, seven findings, blocking-condition register. |
| 2026-08-23 | steering-hooks-012 (correction) | Owner ruling *"change, qa-1 will handle both"* — this session carries Phase 2 as well | Remit widened from Phase 1 only to the whole QA remit. Independence measures added (see *Independence Under a Single-Session Remit*) because the session that writes the strategy will later judge against it. |
| 2026-08-23 | steering-hooks-012 | Owner rulings on R16 (F-QA8) and R18 (F-QA9), both taken back to him on the rev-3 correction | **Phase 1 rev 4.** Both rows **closed**. (a) **R16** — *"Stands, but point the guidance at the JSON editor"*: D11 stands, the preservation build is declined a second time on corrected facts, and the guidance becomes **shape-dependent** rather than one line. Steering records that the basis it first gave the owner was wrong in the direction that made accepting look cheaper, and that the rev-3 correction changed the outcome rather than decorating it. Successor row **R19** carries the shape-dependence, which is the part a one-line guidance would lose. (b) **R18** — *"Measure the population first"*: the M6-b category is taken and the owner's live POST is **withdrawn, not deferred**. Successor row **R20** carries the count. Recorded explicitly: a measured zero is **not** a tested-accepted — it closes the question *for this corpus, now*, and leaves Discord's general behaviour undetermined by anything in this chain. |
| 2026-08-23 | steering-hooks-012 | Relay of a read-only determination (statbot code-review question): whitespace-content gap, JSON-modal cost, top-level-only fragility. Re-derive before acting | **Phase 1 rev 3.** All three re-derived **by execution**, not accepted on relay. (a) **F-QA9** opened — whitespace-only content is not content to the gate (`content.trim()`), a class the frozen partition did not distinguish; M2 moves no whitespace verdict, so it is a **D1 truth-condition** question, not an M2-b risk. Registered as R18 and proposed as an M6-b category. (b) **Rev 1's JSON-modal account corrected** — measured, it drops `components` and `flags` but **preserves `content`**, so for 5712 it is *lossless* while D11's sanctioned path is the lossy one. F-QA8 updated beside its original text, not over it. (c) **F-QA10** — top-level-only V2 detection is complete over the representable domain, not by checking; executable falsifier installed. Spec extended to 36 tests (EXT-1, EXT-2). |
| 2026-08-23 | steering-hooks-012 | Relay: `check-repo` FAILing at 257; re-derive before acting. Plus owner rulings D11/D12 and plan rev 6 | **Phase 1 rev 2.** (a) Count re-derived independently: **257 confirmed**, exactly two from this document, both dangling repo-rooted citations to Phase-2 destinations. Fixed via the checker's own `check-repo:ignore` opt-out with stated reasons, plus a real `verification/012/README.md`; **re-run reconciles at 255**, zero from this document. (b) Plan rev 6 read: D11, D12 and F-QA2 all enacted. R12/R13 closed. (c) M2-e/M2-f traced and simulated — **new finding F-QA8**: M2-f's recovery is reachable but destroys the user's message content, and M2-f as worded measures reachability, not preservation. Spec extended to 30 tests. |

## Timeline

- **Test Strategy Started**: 2026-08-23
- **Test Strategy Completed**: 2026-08-23
- **Implementation Received**: —
- **Testing Started**: —
- **Testing Completed**: —
- **Final Status**: pending

---

## Scope and Remit

This session carries **both** QA phases for chain 012, per the owner's ruling relayed by
steering-hooks-012 on 2026-08-23 (*"change, qa-1 will handle both"*). The original brief assigned
the post-implementation verdict to a separate session; that instruction was withdrawn explicitly by
the sending session and is recorded here so the change of remit is visible in the document rather
than only in a message.

### Independence Under a Single-Session Remit

A strategy written by the session that will later judge against it loses the independence a
two-session split would have supplied by construction. It has to be replaced by something a third
party can check. Four measures, all of them observable in the record rather than asserted:

1. **Expectations are frozen before the code exists.** Every expected verdict in this document and
   in the pre-registered spec (`website/src/utils/__tests__/012-send-gate-partition.test.ts`) was
   fixed at Phase 1 and committed before implementation began. Git history, not my word, is the
   evidence that they predate the code.
2. **Every sentinel expectation is sourced outside this codebase.** Record 5712's expected `false`
   comes from the owner's live Discord `400`/`50035`; the bare-Text-Display V2 shape's expected
   `true` from his live HTTP `200`. Neither is computed from a symbol or constant the repository
   owns. A fixture that derives its expectation from the code under test cannot fail under the
   defect it exists to detect.
3. **Each mutant is named together with the single cell that must kill it.** A Phase-2 sweep that
   reports a kill without the named cell going red has not reproduced the claim.
4. **Counts travel with their enumeration predicate and its exclusions**, so a later number is
   checkable against the population it was taken over rather than quotable bare.

At Phase 2 I will state, per criterion, whether the criterion was met **against the frozen
expectation** or whether the expectation itself moved — and if it moved, why, in the same line. An
expectation quietly edited to match an implementation is the specific failure this section exists
to make visible.

---

## Can This Strategy Be Executed Before the Owner-Gated Push? — determined, not assumed

steering-hooks-012 asked this directly rather than letting it be assumed. Determined against the
trees and the live environment, 2026-08-23:

| Fact | Instrument | Result |
|---|---|---|
| npm registry reachable | `npm ping --registry=https://registry.npmjs.org` | **PONG, 170ms** |
| `hooks-gg/project-utils` reachable over SSH | `git ls-remote git@github.com:hooks-gg/project-utils.git` | **`eb38a15` = HEAD = `refs/heads/master`** |
| …over anonymous HTTPS | `curl https://api.github.com/repos/hooks-gg/project-utils` | **404** — the repo is private; HTTPS-without-credentials is why a naive `git ls-remote https://…` fails |
| `website/node_modules` | `ls -d` | **absent** — the suite was not runnable when this pass began |
| `project-utils/node_modules` | `ls -d` | present |
| pnpm store holds a `hooks-gg/project-utils` git entry | listing of `~/.local/share/pnpm/store/v10` | **no** — the git entries there are all `DiscordStatbot/*` |

The SSH probe independently corroborates the critique's pin fact #8 (website pins `eb38a15` =
project-utils `master` HEAD) against the remote rather than against the architecture record, and
additionally establishes that **remote `master` has not moved since the pin was taken**.

**Determination.** The strategy is executable end-to-end before the owner-gated push, with one
sharp exception:

- **Executable now** — M2 and M3 unit coverage (`src/utils/limits.tsx` has no `project-utils`
  dependency at all); M4 and M5 integration coverage (they import `getPostgres` from
  `project-utils`, which resolves fine **at the old pin**, and the query/response assertions
  below need no database); M1-b (it reads `project-utils`' own committed `dist/index.d.ts` on its
  chain branch — no install, no push).
- **Not executable before the push** — a full `tsc`/`next build` typecheck of `upsertMessage`,
  because `values: InsertObject<DatabaseSchema, 'Messages'>` will name a `valid` column the
  installed old-pin `DatabaseSchema` does not declare; and the pinned-build proof (release
  condition 3), which is post-push by construction.

**The trap this creates, named so nobody walks into it.** Vitest does not typecheck. Throughout the
chain window the suite will be **green while `tsc` is red**, and the two facts look alike in a
report that says only "tests pass". The implementer must record the typecheck state as a separate
line from the suite result in every round, and Phase 2 will treat an implementation document that
reports only "tests pass" as incomplete rather than as passing.

---

## TESTING INFRASTRUCTURE NEEDED

1. **`pnpm install` in `website`** — `node_modules` was absent. Run with `--frozen-lockfile` so
   neither `package.json` nor `pnpm-lock.yaml` is touched (the pin is release-condition-3 material
   and must not drift). Requires the SSH key already present on this box; verified reachable above.
   *Status: executed by this pass — see Execution Record.*
2. **A `test` npm script.** `package.json` declares `vitest ^4.1.2` as a devDependency but carries
   **no `test` script**; every existing suite runs via a bare `npx vitest run`. Proposed:
   `"test": "vitest run"`, `"test:watch": "vitest"`. `package.json` is a shared production file on
   a chain branch, so this is **proposed to the implementer, not landed by QA** — flagged rather
   than edited.
3. **A Kysely query-compilation harness for M4** — no database required. Kysely's `.compile()`
   returns the SQL text and parameters, which is the instrument that settles M4-b's conflict-branch
   property directly (see below). Needs only `vi.mock('project-utils')` returning a Kysely instance
   over a dummy dialect.
4. **Hand-rolled `NextApiRequest`/`NextApiResponse` doubles for M5.** The repository has no API-route
   tests today. Deliberately **no new dependency** (`node-mocks-http` and friends are not warranted
   for two handlers); a `res` double recording `status`/`json` calls is ~15 lines and keeps the
   dependency surface unchanged.
5. **Nothing else.** No new framework, no new config file, no build-tooling change. `vitest.config.ts`
   already aliases `~` and runs `environment: 'node'`, which is exactly what the predicate needs.

**Dependencies to install:**

```bash
cd /usr/local/bin/hooks/website && pnpm install --frozen-lockfile
```

---

## Irreversible Side-Effect Register (Phase 1, mandatory)

Design-time input for the implementer, not a post-hoc audit. Every irreversible side effect this
change can cause, what must be true before it fires, and whether that ordering is enforced
identically on **every** route that can trigger it.

| # | Irreversible effect | Routes that can trigger it | Precondition that must hold first | Enforced identically on every route? |
|---|---|---|---|---|
| S1 | **DDL `ALTER TABLE "Messages" ADD COLUMN valid BOOLEAN`** against production | One: owner's own session (Assumption 4; no migration mechanism exists in `project-utils` — verified across full git history at rev 1) | Must precede the `website` deploy. Misordering (i) in release condition 5: the upsert names a column the table lacks and **every message save fails** until the DDL lands | Yes — single route, single actor. Guard is his attestation, quoted with timestamp |
| S2 | **Backfill mass `UPDATE`** across the whole `Messages` table | One: the M6 script, owner-executed (or agent-executed against a database he provides) | `website` deploy landed first (misordering (ii): a record saved in the window carries a stale non-NULL verdict M6-a's NULL count cannot see). **And the NULL-only condition must live inside the write** — `UPDATE … WHERE valid IS NULL`, not a `SELECT … WHERE valid IS NULL` followed by an unconditional `UPDATE` | **Not yet — no code exists.** This is the critic's carried assumption and it is a register entry, not a footnote. See mutation sweep MS-4 |
| S3 | **Suppression of live Discord notifications** — once Statbot gates on `valid: false`, affected guilds stop receiving messages. Guild `966088462803537960` is the known member | Two, and they are **not** symmetrically ordered: (a) the owner's live declaration after his M6-b review; (b) **statbot chain 023 deploying its gate at any time after `website` deploys M5** | The owner's review of the M6-b outcome distribution | **No — this is finding F-QA7.** The hooks.gg-side order (release condition 5) binds four components in this workspace; statbot's release is a fifth component in another and is bound only by a human relay |
| S4 | **Outbound POST to the preview-image service** (`postMessagePreviewImage`, `src/server/api/utils/shared.ts`) — fires on every upsert, and **twice** for a message carrying an id (once before the write, once is skipped; the `!message.id` branch fires after) | One: `upsertMessage` | Not new behaviour. The precondition is that M4 does not change *when* it fires or *what payload* it carries | Yes today. M4 touches this function, so "unchanged" becomes a criterion rather than a given — see M4-e below |
| S5 | **Pusher broadcast `message-update`** to every connected client of that message (`pusher.trigger`, same function) | One: `upsertMessage`, update branch only | Same as S4 — not new, but inside M4's blast radius. The broadcast payload is `hashMessage(message)`, and `hashMessage` runs `standardizeMessage`, whose field whitelist does **not** include `valid` | Yes — and the whitelist is what keeps it that way. See M4-e |
| S6 | **Composer send-gate behaviour change (M2)** — message states that reach Discord today become blocked-with-explanation | One: the shipped gate | Intended, and the whole point of M2. No guard owed | Yes — but see **F-QA1**, which is about what the user can do *after* being blocked |

**What the register changed at design time.** S3 and S6 are the two entries the plan does not
already carry a guard for; both became findings (F-QA7, F-QA1) rather than test cases, because
neither is closable by a test. S2's guard is the one the code-reviewer already owns; it is
restated here so that if the code-reviewer stage is skipped, the obligation does not vanish with
it — mutation sweep MS-4 gives QA an independent instrument for the same property.

---

## Property Audit — per acceptance criterion (mandatory)

For every criterion that names an example, the question asked in writing: *what class is this an
example of, and does the test enumerate the class?* Plus, per named risk sub-class, the fixture in
which each conjunct is the **sole carrier** of the decision, and the member in the **permitting**
direction.

| Criterion | The example it names | The class it is an example of | Enumerated? | Positive control (permits) | Sole-carrier fixture |
|---|---|---|---|---|---|
| **M1-a** | — (already stated over the population) | all existing rows | Yes — a single SQL count, expected 0 | n/a (a count, not a gate) | n/a |
| **M1-b** | `DatabaseSchema.Messages` | the committed rollup a consumer installs | Yes — read `dist/index.d.ts` at the M1 commit | The other `Messages` columns must still be declared — a rollup that *only* has `valid` is a regression | n/a |
| **M2-a** | record 5712 | the (flags-bit × structure × content-source) partition, **14 cells** | **Yes — spec cells A1–A7, B1–B7** | **B2**: flag set, bare Text Display → still `ok`. A blanket "flag set ⇒ refuse" fix passes every other residue cell and dies only here | `flags` disjunct: **B5**. `hasV2struct` disjunct: **A1**. `content` in `hasContent`: **A1**. `embeds` in `hasContent`: **A2** (unflagged), **B7** (flagged). `hasComponents`: **A5** |
| **M2-b** | "the existing validation suite green" | every state where flag and structure agree | Partially as worded — see **F-QA3**. Closed by enumeration here: **all 14 cells carry a frozen verdict, and exactly three (B3, B5, B7) may change.** A fourth changing cell is an M2-b failure whatever the suite says, and the spec asserts that set by identity | A1–A7 are the whole unflagged half and all must be unchanged | n/a |
| **M2-c** | 5712 in the composer | human-observable; one record suffices to refute | Yes — a single observation refutes by construction | Register row R4 asks for a *sendable* message still sending | n/a |
| **M2-d** | the mode-switch modal | modal behaviour on both toggle directions | Register rows R5/R6 (both directions) | classic→V2 **and** V2→classic each still warn | n/a |
| **M3-a** | the send page's call site | every payload `Messages.data` can hold | By construction (one symbol, two callers) **plus** an executable identity assertion — see T2/T3 | A predicate that always returns `false` satisfies "refuses 5712"; **B2/A3 as predicate fixtures** are what refuse it | n/a |
| **M3-b** | 5712; the bare-V2 shape | sentinels with externally-sourced expectations | Yes — both in the spec, provenance in comments, neither computed | The bare-V2 sentinel **is** the positive control | n/a |
| **M3-c** | absent `username` | every record whose `data` lacks or empties `username` (`MIN_NAME_LENGTH = 1`, so `''` fails) | Yes — T4, plus the **empirical** half only M6-b can answer | A record *with* a valid username must compute `true` | n/a |
| **M3-d** | already-stored refused records | that class; nothing rewrites content | Yes — assert the predicate is pure w.r.t. its argument (deep-equal before/after) | n/a | n/a |
| **M4-a** | `upsertMessage` | every writer of `Messages.data`, **re-enumerated at implementation** | Yes — re-run the sweep at Phase 2 and reconcile counts against rev 1's three writers | `updateRecentMessageData` must **not** gain a `valid` write (it never touches `data`) — the negative member of the writer class | n/a |
| **M4-b** | the conflict branch | both branches × both verdict directions | Yes — 4 cells (insert/update × valid→invalid/invalid→valid), settled on compiled SQL | An update that *keeps* the same verdict must also still write it | `valid` in the insert column list: the insert cells. `valid` in `DO UPDATE SET`: **only** the update cells |
| **M4-c** | "a known-invalid draft" | every payload the save path accepts today | Yes — the existing save-path suite plus register row R7 | **This criterion is entirely a positive control**: the class must still be *permitted* | n/a |
| **M4-d** | a client-supplied top-level `valid` | every request to `message.upsert` | Yes — T6, both placements (top-level and inside `data`) | A request with **no** `valid` must still store the computed verdict — otherwise a "strip everything" fix passes | n/a |
| **M4-e** (added by QA) | — | S4/S5: preview-image POST and Pusher broadcast unchanged in count, ordering and payload | Yes — call-count and payload assertions on the mocked effects | n/a | n/a |
| **M5-a** | "beside `id` and `name`" | both endpoints × {`true`, `false`, `NULL`} = 6 cells | Yes — and **at the serialized-JSON layer**, see F-QA4 | `true` and `false` must both be **present**; only `NULL` is absent. A "never emit the key" implementation passes a NULL-only test | Each of the three stored states is the sole carrier of its own cell |
| **M5-b** | `data` carrying no injected `valid` | every response | Yes — assert over the response `data` for all three stored states | A stored `data` that legitimately contains a user-authored `valid` must pass through **unchanged** — the criterion governs what the mapping adds | n/a |
| **M5-c** | `mapMessage` / `ApiMessage` | every other response shape in the repo | Yes — assert `mapMessage`'s emitted key set is unchanged | n/a | n/a |
| **M6-a** | — | the whole table at time T | Owner/backfill instrument; register row R8 | n/a | n/a |
| **M6-b** | the check categories | includes the **evaluation-failure residue** (count + row ids) | Register row R9, and see **F-QA2** on the threshold | The report must also show a `true` count — an all-`false` distribution is the alarm | n/a |
| **M6-c** | 5712; one of the 16 | both sentinels in the backfilled table | Register rows R2/R3 — **both directions, deliberately paired** | The bare-V2 record carrying `true` **is** the pairing | n/a |

---

## Test Strategy

Cases, fixtures and files are QA's. High-level shape below; the executable material is named by
path, per *An Instrument That Discriminates a Finding Is Captured, Not Narrated*.

### Instruments — where they live

| Instrument | Path | State |
|---|---|---|
| M2 partition spec + M3-b sentinels + **D11 round-trip simulation (rev 2)** | `website/src/utils/__tests__/012-send-gate-partition.test.ts` | **Written and executed at Phase 1.** Uncommitted — it is `website` source on a chain branch, and the chain-branch commit grant is the implementer's, not QA's. See *Handoff* |
| M3 predicate spec | `website/src/utils/__tests__/012-validity-predicate.test.ts` | Phase 2 — cannot be written before the module it imports exists |
| M4 write-path spec | `website/src/server/api/utils/__tests__/012-upsert-valid.test.ts` | Phase 2 |
| M5 endpoint spec | `website/src/pages/api/v1/__tests__/012-valid-exposure.test.ts` | Phase 2 |
| Mutation sweep record | `agent-output/verification/012/mutation-sweep.md` <!-- check-repo:ignore — forward reference: a Phase-2 destination declared at Phase 1, listed in `agent-output/verification/012/README.md`. No verdict cites it yet; it resolves once QA writes it. --> | Phase 2 — destination registered in `verification/012/README.md` |
| Backfill report (only if an agent executes it) | `agent-output/verification/012/backfill-report.md` <!-- check-repo:ignore — forward reference, and conditional: this file exists only if an AGENT executes the backfill. Owner-executed is the expected case (plan Assumption 4), in which it never exists by design. --> | M6 — and may never exist: see `verification/012/README.md` |

### Unit — M2, the corrected gate

The 14-cell partition above, pre-registered and already executed. **Phase-1 execution record:**

```
npx vitest run src/utils/__tests__/012-send-gate-partition.test.ts
Test Files  1 failed (1)
     Tests  4 failed | 16 passed (20)
Failing: B3, B5, B7, and the 5712 sentinel (which is B5's shape).
```

That is the Red half of TDD, observed rather than asserted, **before any implementation exists**.
It establishes two things a later reader can check independently:

1. **The three cells I predicted would change are exactly the three that fail today.** Not four,
   not two.
2. **Every other cell already holds**, so M2-b's baseline is a measured fact rather than a
   hope — including **B2**, the positive control that keeps the 16 known bare-Text-Display records
   sendable.

One hazard found by executing rather than by reading, recorded because the general form matters
more than the instance: **`src/constants/index.ts` imports `~/env.mjs`, which validates the entire
production environment at module scope and throws.** Any spec reaching `~/constants` — which
includes anything importing `~/utils/limits` — must mock it. The adjacent suites already do; a spec
written by reading the gate alone would not have.

### Unit — M3, the predicate

Parity is claimed *by construction*. The job here is to make the construction observable and to
enumerate the ways it can silently stop being true. Each trap below is stated with the single
fixture that discriminates it.

| # | Trap | Why it is plausible | Discriminating fixture |
|---|---|---|---|
| T1 | The predicate normalises before validating — `stripKeys`, `standardizeMessage`, or `enforceImportMutualExclusivity` | All three are in `~/utils` and all three are applied elsewhere on the save/send path, so reaching for one is the natural move | Structurally-V2 components **plus** non-empty content. The send gate says `v2-exclusive`; `stripKeys` **deletes** `content` when structure is V2, so stripKeys-then-validate says `ok`. Parity breaks in the dangerous direction — a record marked sendable that is not |
| T2 | The checks are reimplemented rather than called | The predicate is "server-side" and `limits.tsx` is a `.tsx` file, which invites a copy | Assert the predicate module declares no validation logic of its own, and that mutating `validateMessage` moves the predicate's verdict (MS-2) |
| T3 | Imported via the `~/utils` barrel instead of `~/utils/limits` | The send page itself imports from the barrel (`page.tsx` line 35), so the barrel looks like the canonical route | `~/utils/index.ts` re-exports with `export * from './limits'`, so the symbol **is** identical — assert `(await import('~/utils')).validateMessage === (await import('~/utils/limits')).validateMessage`. The reason to import directly is node-safety (the barrel pulls SVG and env), not symbol identity, and the spec should say which property it is protecting |
| T4 | Missing `username` is defaulted to something valid | M3-c's asymmetry looks like a bug to anyone who has not read the plan, and "fixing" it is a one-line temptation | `data` with no `username` → predicate must return `false`, matching the gate. Paired with a valid-username control returning `true` |
| T5 | Non-conformant stored `data` throws and the predicate swallows it as `true` | `try { … } catch { return true }` is a natural defensive reflex | `{ embeds: {} }` (non-array) makes `.reduce` throw; `{ content: 5 }` makes `.trim()` throw; `{ components: null }` makes `.some` throw. Contract to pin: **the predicate's disposition for a throwing input is `false`**, per M6-b. Whether it catches internally or the caller maps the throw is the implementer's, but one of them must, and the spec pins which |
| T6 | (M4-d) A client-supplied `valid` reaches storage | Zod strips unknown keys today, so it is right *by accident* — and the criterion is the property, not the mechanism | Two placements: top-level `valid: true` on an invalid payload, and `data.valid: true`. Stored verdict must equal `predicate(storedData)` in both. Plus the control: a request with no `valid` still stores the computed verdict |

**M3-a's observable structural sharing** — the plan leaves the "how" to QA. Two assertions, both
cheap: the symbol-identity check in T3, and a source-level assertion that the predicate module's
text contains exactly one call into the gate and no re-declared check name. The repository has
precedent for source-level assertions of this kind.

### Integration — M4, the write path

Settled on **compiled SQL**, which needs no database: build the Kysely query the way `upsertMessage`
does, call `.compile()`, and assert over the returned `sql` text and `parameters`.

- **M4-b, the enumerated trap.** `valid` must appear in **both** the insert column list **and** the
  `on conflict … do update set` list. The conflict branch names its columns explicitly today
  (`name`, `data`, `previewImageNonce`, `updatedAt`), so a `valid` present only in `values` compiles
  cleanly and silently preserves a stale verdict on every re-save. The compiled-SQL assertion makes
  the two lists separately observable — an assertion on behaviour alone would need a real database
  to catch it.
- **Four cells**: {insert, update} × {valid→invalid, invalid→valid}. The update × verdict-changed
  cells are the sole carriers of the `DO UPDATE SET` membership.
- **M4-a**: re-run the writer sweep at Phase 2 and reconcile against rev 1's enumeration (three
  writers: `upsertMessage`, `updateRecentMessageData`, the delete procedure). Report corrected sites
  against matched sites; disposition any residual by name. The negative member matters —
  `updateRecentMessageData` must **not** gain a `valid` write.
- **M4-e** (added): assert `postMessagePreviewImage` and `pusher.trigger` are called the same number
  of times, in the same order, with the same payloads as before M4 (S4/S5).

### Integration — M5, the exposure

Six cells: two endpoints × {`true`, `false`, `NULL`}, each endpoint asserted independently because
the `ResponseMessage` interface and the pick list are **duplicated per file** — the duplication is
precisely why one endpoint passing says nothing about the other.

**The instrument is the serialized JSON, not the response object** (see F-QA4). Assert over
`JSON.parse(JSON.stringify(body))`:

- stored `true` → `'valid' in body === true`, `body.valid === true`
- stored `false` → `'valid' in body === true`, `body.valid === false`
- stored `NULL` → `'valid' in body === false`

An object-level `expect(body).not.toHaveProperty('valid')` **fails against a correct implementation**
that sets `valid: undefined`, and an object-level `expect(body.valid).toBeUndefined()` **passes
against an incorrect one** that emits `valid: null`. Both are wrong instruments for this criterion.

Also required: `ResponseMessage` must declare `valid?: boolean`, not `valid: boolean` — the
non-optional form makes the omission case a type error and pushes the implementer toward emitting
`null`, which violates M5-a.

### Mutation sweep (bounded, seeded at the guards in the Side-Effect Register)

Each mutant is named with **the single cell that must kill it**. A kill reported without that cell
going red has not been reproduced.

| # | Mutant | Seeded at | Must be killed by |
|---|---|---|---|
| MS-1 | `hasV2struct \|\| flagSet` → `hasV2struct && flagSet` | M2's corrected gate | **B5** (flag set, no components) |
| MS-2 | `hasV2struct \|\| flagSet` → `hasV2struct` (drop the disjunct) | M2 | **B5** — survives A1–A7, B1, B2, B4, B6 |
| MS-3 | `hasV2struct \|\| flagSet` → `true` | M2 | **B2** and **A4** — the positive controls |
| MS-4 | The backfill's `WHERE valid IS NULL` moved out of the `UPDATE` into a preceding `SELECT` | S2 | A concurrent-save fixture: read a row's NULL, let a save land, then write. Verdict must be the save's, not the backfill's. **If this mutant cannot be killed by any executable fixture, say so and route it — do not record it as equivalent** |
| MS-5 | `valid` removed from the `DO UPDATE SET` list | M4 | The update × verdict-changed cells |
| MS-6 | `valid` removed from the insert column list | M4 | The insert cells |
| MS-7 | M5's conditional spread → unconditional `valid: m.valid` | M5 | The `NULL` cell, at the serialized-JSON layer only |

Survivors are recorded **with a disposition**; equivalent mutants are recorded, never dropped.
Counts quoted off this table travel with the predicate: *"N mutants seeded at the branch conditions
and decision constants of the M2 gate, the M4 write, the M5 mapping and the M6 backfill guard —
excludes the checks `validateMessage` runs after the content/V2 clause (username, embed-character,
displayable-text, message-length), which this chain does not modify."*

### Telemetry Validation

Not incident work, so the register is short — but M6-b's report **is** telemetry, and it is the
artifact an owner decision is made on.

- **Classification: normal** (one-shot, low-volume, structured, safe-by-default). Row ids are
  internal integers, not PII.
- **Assert structured fields, never message strings**: the report must carry `total`, `trueCount`,
  `falseCount`, a per-first-failing-check count map, and an `evaluationFailures` category with both
  a count **and** the row ids. A test asserting the printed prose is brittle and worthless.
- **Assert the invariant, not just presence**: `trueCount + falseCount === total`, and
  `evaluationFailures.count` is included in `falseCount` (per M6-b's disposition), not floating
  beside it. That arithmetic is what makes an unexpected mass-invalidation legible as a number.
- **No secret is asserted at full value anywhere in this chain.** Nothing in scope handles one; if
  the backfill script ever logs its connection string, that is a finding, not a fixture.

---

## Execution Record (Phase 1)

Numbers re-derived by this pass, not carried from any predecessor document.

| Instrument | Command | Result |
|---|---|---|
| Full existing suite, baseline | `npx vitest run` (website, `72dc7de`, after `pnpm install --frozen-lockfile`) | **14 files, 316 tests. 13 files / 312 tests pass.** The only 4 failures are the pre-registered Red cells below — the pre-existing suite is fully green |
| Pre-registered M2 partition spec, rev 1 | `npx vitest run src/utils/__tests__/012-send-gate-partition.test.ts` | **16 passed, 4 failed.** Failing: **B3, B5, B7** and the 5712 sentinel (B5's shape). Exactly the set predicted before the run |
| Same spec, rev 3 (EXT-1 whitespace, EXT-2 nesting falsifier) | same command | **31 passed, 5 failed (36).** The Red set is unchanged — all five are the same pre-M2 defect. Every EXT cell is characterisation or structural and passes today |
| Same spec, rev 2 (D11 round trip added) | same command | **25 passed, 5 failed (30).** The fifth Red is *"5712 is unsendable as stored"* — the same pre-M2 defect as the other four, and it goes green with them. **The D11 round-trip simulation passes today**, which is what makes F-QA8 a measured result rather than an argument |
| `check-repo` before / after the citation fix | `node tools/check-repo.js` | **257 → 255.** Independently reproduces the planner's relayed count. Enumerated my document's own citation candidates under the checker's three predicates: **5 total — 3 resolve, 2 suppressed with reasons, 0 failing** |
| Gate never reads `flags` | `grep -c "flags" src/utils/limits.tsx` | **0** — independently reproduces critique verification #1 |
| Every `.flags` write in `src/` | `grep -rn "\.flags" src/ --include=*.ts --include=*.tsx`, tests excluded | **Exactly two sites**: one write (`stripKeys`, `src/utils/index.ts`) and one read (`sendWebhook.ts`). *Predicate: literal `.flags` member access in non-test `src/`; excludes `bot/`, destructured bindings, and dynamic `['flags']` access* |
| Registry / SSH reachability | see *Can This Strategy Be Executed…* | both reachable; pin `eb38a15` = remote `master` HEAD |

---

## Findings

### F-QA1 (HIGH) — the recovery the plan and the handoff both promise does not exist in the composer

**Route: the owner, through steering. This is not mine to decide and not the implementer's.**

The handoff's *Known consequence, accepted* says the affected guild's problem is "resolved by that
guild's owner **editing the message in the hooks.gg composer**". M3-d restates it: the corrected
gate "explains the problem". Both rest on the premise that editing in the composer can clear the
condition. **On the current code it cannot.** Traced end to end:

1. **`stripKeys` (`src/utils/index.ts`) sets `IS_COMPONENTS_V2_FLAG` when the structure is V2 and
   never clears it when the structure stops being V2.** It is the only `.flags` write in `src/`.
2. **`handleModeSwitch` (`src/components/DiscordMessageEditor/index.tsx`)**, on V2→classic, filters
   V2 components out and calls `setMessageMode` — it **does not touch `flags`**.
3. **`detectMode` (`src/providers/MessageProvider/index.tsx`)** derives the editor's mode from
   `hasV2Components` — **structure only, never `flags`**.

So the sequence *build a V2 message → save → switch to classic → add content → save* produces a
stored record with `flags: 32768`, content, and no V2 components. **That is 5712's exact shape, and
it is produced by an ordinary, supported user action** — not by a fluke and not (necessarily) by the
JSON editor.

Reopened afterwards, that record loads in **classic** mode (step 3), and after M2 the composer will
say *"Components V2 messages cannot contain embeds or content"* over a message showing no Components
V2 at all, with **Send disabled and no control that clears the flag**. The user is told to remove
something the UI does not show them.

**One escape exists and it is accidental.** `JsonModalBody` seeds its textarea from
`standardizeMessage(stripKeys(...))`, and `standardizeMessage`'s field whitelist **omits `flags`**;
its *Load* button replaces `data` wholesale with the parsed object. So opening the JSON modal and
pressing *Load* — changing nothing — silently drops the flag and fixes the record. That is a real
path, but it is undiscoverable, undocumented, and it also discards every other non-whitelisted
field. It is not "editing the message in the composer".

> **CORRECTION, rev 3 (2026-08-23) — recorded beside the paragraph above, not over it.** "Discards
> every other non-whitelisted field" was true but too vague to be useful, and it obscured the fact
> that matters. Measured by executing `standardizeMessage(stripKeys(...))` on both record shapes:
>
> | Input record | JSON-modal seed after Load |
> |---|---|
> | 5712 (`flags`, `content`, `username`, `avatar_url`, `components: []`) | `{username, avatar_url, content}` — **`content` preserved**, `flags` dropped, no components to lose |
> | flag + Action Row + content (spec cell B3's class) | `{username, content}` — **the Action Row is destroyed** |
>
> `standardizeMessage` copies `username`, `avatar_url`, `content`, `allowed_mentions`, `embeds`
> and rebuilds nothing else — **`components` and `flags` are both dropped**. So the cost is
> class-dependent, and for the named sentinel it is **zero**: the JSON-modal path repairs 5712
> losslessly. That inverts the comparison in F-QA8 and is why this correction is load-bearing
> rather than cosmetic. Provenance: raised by a steering determination from a statbot code-review
> question; re-derived here by execution before being recorded.

**Why this is a new fact and not ruling D10 re-raised.** D10 (*"Leave it out, note it"*) disposed of
save-path flag normalisation when the flag's only consequence was the field's value. After M2 the
same flag also decides whether a record is **recoverable in the UI**. That consequence did not exist
when D10 was ruled, so the owner is deciding on facts he has not seen — which is exactly the
condition under which a disposition is re-put rather than relied on.

**Cheapest closure, stated so the ask is concrete rather than open-ended**: clearing
`IS_COMPONENTS_V2_FLAG` in `handleModeSwitch`'s V2→classic branch is one line, in a branch that
already destroys the departing V2 data, and it lands inside M2's own milestone rather than as a
follow-on chain. **I am not proposing it as scope — I am pricing it, so the owner's choice is
between two known costs rather than between a known cost and an unknown one.** If he declines, the
consequence to accept explicitly is: affected guild owners cannot fix their messages without being
told about the JSON modal, and that instruction has to come from somewhere.

### F-QA2 (MEDIUM) — R2's falsifier threshold is stated over a narrower class than the change creates

R2's instrument is "a `false` count materially above the sweep's expectation (~1 in 1,976)". That
expectation cannot bound the population M2 creates, for **two independent reasons**:

1. **Narrower predicate.** The sweep counted records of 5712's *shape* (flag set + content + empty
   components) — spec cell **B5**. M2 also flips **B3** (flag set + non-V2 components + content) and
   **B7** (flag set + embeds, no components). Neither is in the sweep's predicate.
2. **Narrower population.** The sweep covered 1,976 messages across the 444 **Statbot-configuring**
   guilds. `Messages` holds every hooks.gg message; the plan says so itself ("the full `Messages`
   table may be larger"). A rate measured on a subset selected by a *different* property is not a
   rate on the whole.

And per F-QA1, the class has a **live generator** in a supported UI flow, so its frequency is the
frequency of a user action, not of an accident.

**Not a blocker** — M6-b's owner-reviewed gate contains the risk by construction. But the threshold
the owner reads it against should not be "~1". Recommended, and cheap: **M6-b breaks the flag-residue
class out with its own count**, and R2's per-pass record drops "~1 in 1,976" as a threshold, keeping
it only as what it is — a rate over a differently-defined subset.

### F-QA3 (LOW) — M2's acceptance partition names three of four (flag × structure) cells

M2-a is stated over flag-**set** states; M2-b over states where flag and structure **agree**. The
cell *(flag unset, structurally V2)* — spec cells A1, A2, A3 — falls under neither as worded. Its
correct behaviour is "unchanged", and the spec covers it. **Closed here by enumeration**, recorded
so that no later pass relies on the criteria's wording to have been exhaustive.

### F-QA4 (MEDIUM) — M5-a's "omits the key entirely" is only observable after serialization

`res.json()` runs `JSON.stringify`, which **drops `undefined`-valued keys**. So:

- `{ id, name, data, valid: undefined }` — object has the key, **JSON does not**. Correct; fails a
  naive `expect(body).not.toHaveProperty('valid')`.
- `{ id, name, data, valid: null }` — **JSON has the key**, with `null`. Incorrect under D1's
  absent-field rule; passes a naive `expect(body.valid).toBeUndefined()`.

Both naive instruments are wrong, in opposite directions. The instrument is pinned above:
`JSON.parse(JSON.stringify(body))` and `'valid' in`. Recorded as a finding rather than only as a
test note because it is exactly the shape of defect that ships with a green suite.

### F-QA5 (MEDIUM, RESOLVED by this pass) — the suite was not executable

`website/node_modules` was absent; no suite could run. Resolved with
`pnpm install --frozen-lockfile --ignore-scripts`, chosen so that neither `package.json` nor
`pnpm-lock.yaml` could drift (the pin is release-condition-3 material). **Disclosed in the round it
happened**, per this workspace's shared-tree discipline: this pass added ~1 directory of installed
dependencies to a shared tree and destroyed nothing. Baseline captured immediately afterwards.

### F-QA6 (LOW, pre-existing, out of scope) — v1 error branch never ends the response

Both v1 handlers do `if (error instanceof z.ZodError) return res.status(400);` — no `.end()`, so a
malformed query leaves the response open rather than returning 400. Pre-existing, untouched by this
plan, **not** a 012 finding. On-next-touch note for whichever chain next works these handlers.
Recorded here because M5 edits these two files and a reader will see it.

### F-QA7 (MEDIUM) — the live-declaration gate binds hooks.gg's four components, not Statbot's

Release condition 5 orders DDL → `project-utils` push → `website` deploy → backfill → owner review →
live declaration. Statbot's own deploy is a **fifth component, in another workspace, bound only by a
human relay**.

D1's absent-key rule makes every ordering safe *while the key is absent*. But from the moment M5
deploys, the key is **present and carrying real values** — and the owner's review has not happened
yet. If statbot chain 023 ships its gate inside that window, deliveries stop on a distribution
nobody has reviewed. The M6-b gate is the plan's central risk control (D6), and this is the one path
that goes around it.

Statbot chain 023 is implementing in parallel *right now*, which is what makes this worth stating
rather than filing. Two dispositions, both the owner's: order statbot's deploy explicitly after the
declaration, or accept the window knowingly. **Either is fine; the default — nobody having decided —
is not.** Routed, not absorbed.

### F-QA8 (MEDIUM, opened at rev 2) — M2-f's recovery is reachable, but it destroys the user's message

**Route: the owner, through steering.** M2-f itself says a shortfall here "routes back to the owner
— never a narrowing absorbed silently", so this is the criterion working, not the criterion failing.

D11 clears `IS_COMPONENTS_V2_FLAG` in `handleModeSwitch`'s **V2→classic** branch. M2-f already
identifies the wrinkle: an affected stored record loads in **classic** mode (`detectMode` derives
mode from `hasV2Components` — structure only), so reaching the patched branch "requires toggling
through". Traced to its end, and **simulated executably** in the pre-registered spec:

| Step | Action | `flags` | `content` | Gate verdict |
|---|---|---|---|---|
| 0 | 5712 as stored, loaded in classic mode | `32768` | present | refused (after M2) — mutual exclusivity |
| 1 | toggle classic→V2 | `32768` | **destroyed** — the branch clears `content` and `embeds` unconditionally | — |
| 2 | toggle V2→classic (**D11 clears the flag here**) | `0` | still empty | refused — *"Message must have content, embeds, or components."* |
| 3 | user **retypes** the message | `0` | retyped | **sendable** |

So the record *is* recoverable through supported controls alone, exactly as M2-f requires — **and
the price is the message text.** For 5712 that is a real Italian Member-of-the-Month notification its
guild owner would have to type again. There is no shorter path: `stripKeys` is the only `.flags`
write in `src/` and it only ever **sets** the bit, and save-path normalisation that would clear it is
ruled out of scope by D10. The classic→V2 leg is mandatory, and its clearing of `content`/`embeds` is
unconditional — `hasDepartingData` gates only the *warning*, not the destruction.

**The criterion-completeness point, which is the substance of this finding.** M2-f measures
**reachability**; it does not measure **preservation**. As worded it will pass, cleanly and
honestly, against a recovery that costs the user their content. That gap is invisible to a green
suite and to the criterion's own reading — it is exactly the *"the test discriminates for the
specified behaviour, but the specified behaviour does not cover the property"* case.

> **SHARPENED, rev 3 (2026-08-23).** Measured (see the correction under F-QA1), the two recovery
> paths destroy **different things**, and for the named sentinel the sanctioned one is the lossy one:
>
> | Path | flag cleared | `content` | `components` | For 5712 |
> |---|---|---|---|---|
> | Mode-toggle round trip (**D11**, the sanctioned fix) | yes | **destroyed** — must retype | preserved (type-1 filtered) | **lossy** |
> | JSON modal *Load* (undiscoverable, pre-existing) | yes | **preserved** | **destroyed** | **lossless** |
>
> So for 5712 — the record the owner chose D11 to repair — the pre-existing undiscoverable path
> costs nothing and D11's path costs the message text. This does not reverse F-QA8; it makes the
> disposition sharper, because "accept the cost" now means accepting a cost that a path already in
> the product does not impose on this record. For records carrying **both** components and a
> stranded flag (spec cell B3's class), the comparison flips again — D11's path is the lossless one
> there. Neither path is lossless in general.

**Not a blocker, and deliberately not a redesign.** The user is warned before step 1 ("Your embeds
and content will be removed. This cannot be undone."), and copy-the-text-out-first is an available
manual workaround. Two dispositions, both the owner's, and both cheap:

1. **Accept the cost explicitly**, and let M2-f stand as a reachability criterion — in which case
   the guidance given to affected guild owners should say *copy your message text before toggling*,
   because nothing in the UI will.
2. **Extend M2-f with a preservation clause** — recovery without content loss — which is a
   materially larger change than D11's one line and would reopen the D10 boundary.

**I am pricing, not proposing.** What matters is that the choice is made on the traced cost rather
than on the assumption that D11 delivered a clean repair. Register row **R16**.

> **RULED, rev 4 (2026-08-23).** Owner, verbatim: **"Stands, but point the guidance at the JSON
> editor"**. Disposition 1 — D11 stands, M2-f stays a reachability criterion, and the preservation
> build is declined **a second time, on the corrected facts** rather than on the original ones.
>
> The finding's own routing worked in the strict sense: steering had already put F-QA8 to the owner
> and he had accepted the cost, **on a basis that was wrong in the direction that made accepting
> look cheaper** — the JSON path relayed as uniformly destructive, unchecked against 5712, the one
> record the decision turned on. The rev-3 measurement went back to him and he re-ruled on it.
> Recorded here because it is the concrete case for *"re-derive anything you intend to make
> verdict-bearing"*: the correction changed which facts the ruling stands on, not merely its
> footnotes.
>
> **What the ruling does not settle, and what R19 therefore carries.** "Point the guidance at the
> JSON editor" is correct **for 5712's shape** and wrong for cell B3's — a record carrying both
> components and a stranded flag loses its components down the JSON path and nothing down the
> toggle. Neither path is lossless in general, so guidance stated as one line will be wrong for one
> of the two shapes whichever line it is. That is the half of this finding that survives its own
> closure.


### F-QA9 (MEDIUM, opened at rev 3) — whitespace-only content is not content, and nobody has decided whether that is right

**Route: the owner, or statbot's corpus. Register row R18.**

`hasContent` tests `content.trim()`, so `content: "   "` is **not content** to this gate. Verified by
execution, not by reading:

| Cell | Input | Gate today |
|---|---|---|
| W1 | whitespace content + structurally-V2 components | **permits** (`''`) |
| W2 | tabs/newlines + structurally-V2 components | **permits** |
| W3 | whitespace content + flag set + no components | *"Message must have content, embeds, or components."* |

The original frozen partition's content-source axis was {content string, embeds array, neither},
using `'Hi'` and `''` — **no cell separated `"   "` from `""`.** That is a genuine gap in my
enumeration and I am recording it as mine, not as a relay.

**Two things make this smaller than it first looks, and one keeps it open.**

- **It is not an M2 question.** M2 moves **no** whitespace verdict in either direction — both W1 and
  W3 are decided by `hasContent === false`, which neither M2 nor D11 touches. So M2-b is not at
  risk and the frozen residue enumeration (B3/B5/B7) stands unchanged. Asserted executably as cell
  W4 so a later reader cannot mistake EXT-1 for a hole in M2's coverage.
- **It is a D1 truth-condition question**: does `valid: true` correctly describe a V2 record whose
  content is whitespace? If Discord accepts that shape, the gate is right and there is nothing here.
  If Discord rejects it with `50035`, then hooks.gg marks **sendable** a message that is not — the
  precise failure this whole chain exists to prevent, arriving at Statbot as a live send failure on
  a record hooks.gg vouched for.
- **It is not determinable from this codebase.** It needs a live POST, which is the owner's
  instrument (as it was for both existing sentinels). I have therefore pinned **characterisation
  only** — what the gate does today — and entered no guessed correctness expectation into the frozen
  set.

**Cheapest disposition, and it defers the correctness question to data rather than to judgement:**
add the class as its **own named category in M6-b's distribution report** — records whose
`data.components` are structurally V2 and whose `content` is non-empty but whitespace-only. That
measures the population before anything gates on it, costs one predicate in a report that already
breaks out three other classes, and puts a number in front of the owner at the review he is already
doing. If the count is zero, the question is moot and closes itself.

> **RULED, rev 4 (2026-08-23).** Owner, verbatim: **"Measure the population first"**. The M6-b
> category is taken, and the owner's live POST is **withdrawn — not deferred**. No Discord
> determination will be made in this chain.
>
> **A measured zero is not a tested-accepted, and R20's closure is worded to keep the two apart.**
> A zero count says *no record in this corpus is in the class today*, which is a fact about the
> corpus at backfill time. It does **not** say Discord accepts flag-set-plus-whitespace content —
> that general question stays open, undetermined by anything in this chain, and no agent here can
> determine it. The distinction is load-bearing rather than pedantic: a later reader who sees R20
> closed on a zero and concludes *the whitespace class is safe* would be entitled to write the
> first record into it. What is actually true is that the class is **empty and unguarded**, and the
> next record to enter it is decided by the gate's current behaviour with nothing having tested
> whether that behaviour is right.
>
> Characterisation cells W1–W4 stand as they are. No correctness expectation entered the frozen
> set, and none may enter it on the strength of a count.

### F-QA10 (LOW, opened at rev 3) — top-level-only V2 detection is complete over the representable domain, not complete by checking

`validateContentRequirements`' inline `.some`, `hasV2Components`, and 012's `hasV2struct` all detect
V2-ness at **top level only**. That is currently sound, and it is sound **by the shape of the
schema rather than by any check**:

- the only non-V2 top-level type is the Action Row (`type: 1`);
- `actionRowShape.components` is `z.array(linkButtonShape)`, and `linkButtonShape` is `type: 2`;
- `2` is not in `V2_COMPONENT_TYPE_VALUES` (`[9,10,11,12,13,14,17]`);
- every other top-level type **is** V2 and is caught at top level.

So a V2 element nested where no V2 sits at top level **cannot be built**. No defect exists today, and
none ever did — the shape has always been this narrow.

**Why it is worth a finding anyway.** The soundness is a property of a *neighbouring* module's schema,
not of the gate. The day Action Row children widen — a select menu, a general container — the gate,
`hasV2Components` **and** the 012 predicate all inherit the hole simultaneously and silently, and
nothing in the suite would go red. That is the definition of a check that is correct by accident.

**Closed with a falsifier rather than a change**: spec block **EXT-2** asserts at source level that
Action Row children remain link-buttons-only. If that assertion ever fails, three call sites must
stop being top-level-only, and the spec says which. No action is owed now; this is an installed
tripwire, not an open item.

Also recorded for the chain: statbot's reviewer had assumed nesting might be reachable. It is not —
determined structurally here, and the field's history shows it never was.


---

## BLOCKING RELEASE CONDITIONS — chain 012 register

> **BLOCKING RELEASE CONDITION** — each **pre-release** row below must be executed and recorded in
> the UAT document before merge/deploy. **Post-deploy-observable** rows gate the chain's **closure**,
> never the release act.

**This register is minted here.** Chain 012 had none, and no prior chain in this workspace has used
one — so this is the chain's single register and every later gate document **appends to it** rather
than minting a parallel ID space.

**Standing note, so a later reader does not take this as current**: this list is point-in-time. The
UAT document, and then the deployment record, are authoritative on each row's execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode (operator terms) | Owner | State |
|---|---|---|---|---|---|---|---|---|---|
| R1 | pre-release | The 14-cell M2 partition is green, with B3/B5/B7 flipped and A1–A7/B1/B2/B4/B6 unmoved | `npx vitest run src/utils/__tests__/012-send-gate-partition.test.ts` | QA (automated; no human) | M2 implemented | 20/20 pass | If a cell outside the residue moved, M2 changed sendability for messages nobody asked it to touch — users lose the ability to send messages that work today | qa | Open |
| R2 | post-deploy-observable | GET v1 guild-messages for `966088462803537960` shows message 5712 with top-level `valid: false` | HTTP GET against production | Owner (the read is owner-executed; a hooks-side agent read was blocked by the classifier in the statbot workspace — if that block fires here, **stop and report, never reword**) | After backfill completes | `valid: false` — a **single** observation refutes by construction | If it shows `true` or omits the key, the field is not communicating what it was built to communicate, and Statbot gates on nothing | devops (owner observes) | Open |
| R3 | post-deploy-observable | The same request for a guild holding a bare-Text-Display V2 record shows `valid: true` | HTTP GET against production | Owner | After backfill completes | `valid: true` — single observation suffices | **This is R2's paired positive control.** If it shows `false`, the field marks well-formed messages invalid and Statbot silently stops delivering messages that work — the mass-invalidation failure, arriving as silence rather than as an error | devops (owner observes) | Open |
| R4 | post-deploy-observable | 5712 loaded in the composer shows the mutual-exclusivity notification with Send disabled (M2-c) | Composer UI | Owner (only he can load that guild's message) | After website deploy | Notification shown, Send disabled | If Send is still enabled, the composer keeps telling users a message is fine that Discord rejects with `50035` — the original defect, unfixed | uat (owner observes) | Open |
| R5 | post-deploy-observable | Mode toggle classic→V2 still shows "Switch message mode?" and still warns (M2-d) | Composer UI | Owner | After website deploy | Modal shown | If the modal is gone, the fix silently destroyed users' content on a toggle | uat (owner observes) | Open |
| R6 | post-deploy-observable | Mode toggle V2→classic still shows the modal (M2-d, other direction) | Composer UI | Owner | After website deploy | Modal shown | As R5. **Both directions are registered deliberately** — M2-d names one behaviour with two members | uat (owner observes) | Open |
| R7 | post-deploy-observable | Saving a deliberately unsendable draft **succeeds**, and its API representation then shows `valid: false` (M4-c's human-observable half) | Composer save, then v1 GET | Owner | After website deploy | Save succeeds; next fetch shows `valid: false` | **If the save is rejected, the change has silently turned a communication field into a gate** — users can no longer save work in progress, which the owner explicitly ruled they must be able to do (D1) | uat (owner observes) | Open |
| R8 | post-deploy-observable | At stated time T after backfill and **before** the live declaration, `SELECT count(*) FROM "Messages" WHERE valid IS NULL` = 0 | SQL | Owner | After backfill completes | 0 | A non-zero count means the backfill ran partially; Statbot sees records with no key and treats them as today, indefinitely rather than for a rollout window | devops (owner observes) | Open |
| R9 | pre-release **(gate, not a check)** | The owner has reviewed the M6-b outcome distribution — including the evaluation-failure category's count **and** row ids — **before** the live declaration | The backfill's own report | **Owner — this row is his decision, not a QA verdict.** No agent may mark it passed | After backfill completes, before declaration | A `false` count consistent with a small residue class; see **F-QA2** on why "~1" is not the right yardstick | If the declaration goes out unreviewed, an unexpected mass-invalidation reaches Statbot's gate as stopped deliveries across many guilds, discovered by guild owners rather than by us | owner (recorded by devops) | Open |
| R10 | pre-release | Pinned-build proof: after the approved `project-utils` push and the `website` pin/lockfile refresh, remove the installed copy, `pnpm install --frozen-lockfile`, rebuild — passes | Shell | devops (automated; no human) | After `project-utils` push | Clean install and build | Without it, every "done" in this chain may rest on a locally-resolved dependency that no deploy will ever see, and production breaks on a column its `DatabaseSchema` does not declare | devops | Open |
| R11 | pre-release | Release order verified as an **order**, not as occurrence: DDL → `project-utils` push → `website` pin refresh + deploy → backfill → review → declaration | The deployment record | devops (automated/documentary; no human) | At release | Order holds | Misordering (i): **every message save fails** between deploy and DDL. Misordering (ii): records saved in the window carry stale verdicts M6-a's NULL count cannot see, breaking the freshness clause Statbot is entitled to trust | devops | Open |
| R12 | pre-release | **F-QA7**: the owner has stated whether statbot chain 023's deploy is ordered after the live declaration, or the window is knowingly accepted | Owner's ruling, recorded | Owner | Now — decidable today, before anything ships | A stated disposition either way | If nobody decides, Statbot may gate on an unreviewed distribution and stop deliveries before the owner has seen a single number — routing around the plan's own central risk control | owner (put by steering) | **CLOSED 2026-08-23** — *"Order Statbot's deploy last"*; plan register D12, release condition 5 extended to five ordered components. **Superseded by R17**, which is the executable half |
| R13 | pre-release | **F-QA1**: the owner has ruled on whether the V2 flag is cleared on mode switch, or the composer-recovery consequence is accepted with a stated plan for telling affected guild owners | Owner's ruling, recorded | Owner | Now — decidable today, before M2 is written | A stated disposition either way | If unaddressed, affected guild owners are told to fix their message in the composer and find no control that does it. The chain ships a clearer error and no way to act on it | owner (put by steering) | **CLOSED 2026-08-23** — *"Clear the flag on switch back"*; plan register D11, enacted in M2 (M2-d revised, M2-e/M2-f added). **Succeeded by R14, R15, R16** |
| R14 | pre-release | **M2-e**: every V2→classic switch leaves no `IS_COMPONENTS_V2_FLAG`, over the whole class of departing contents — and clears **only** that bit | The pre-registered spec's M2-e block (5 departing states + a bit-masking control) | QA (automated; no human) | M2 implemented | All green | A `flags = 0` assignment instead of a mask passes every class member and silently destroys unrelated flag bits on every mode switch — for every user, not just affected ones | qa | Open |
| R15 | post-deploy-observable | **M2-f**: stored record 5712 brought to a Send-enabled state through supported composer controls alone, no JSON modal | Composer UI | Owner (only he can load that guild's message) | After website deploy | Reachable — via the round trip in F-QA8 | If unreachable, D11's one line did not deliver what the owner chose it for, and the fix bought the affected guild owner nothing | uat (owner observes) | Open |
| R16 | pre-release | **F-QA8**: the owner has ruled on whether M2-f's content-destroying recovery is accepted as-is, or M2-f gains a preservation clause | Owner's ruling, recorded | Owner | Now — decidable before M2 is written | A stated disposition either way | If accepted silently, guild owners are sent to a repair that retypes their message, and nobody tells them to copy the text first. M2-f passes cleanly either way, so nothing downstream will catch it | owner (put by steering) | **CLOSED 2026-08-23** — *"Stands, but point the guidance at the JSON editor"*. D11 stands; preservation build declined a second time, on the rev-3 corrected facts. **Succeeded by R19** |
| R18 | pre-release | **F-QA9**: the whitespace-content class is decided — either statbot's corpus/the owner's live POST settles whether Discord accepts flag-set-plus-whitespace content, or M6-b carries the class as its own category so the population is measured before it gates | Owner's live POST, or statbot's corpus, or the M6-b count | Owner (live POST is his instrument, as for both existing sentinels) | Now for the ruling; the count at backfill | Either a Discord verdict, or a category count — plausibly zero, which closes it | If undecided and Discord in fact rejects the shape, hooks.gg marks **sendable** a message that is not, and Statbot attempts a send that fails on a record hooks.gg vouched for — the exact failure the chain exists to prevent | owner (put by steering) | **CLOSED 2026-08-23** — *"Measure the population first"*. M6-b category taken; owner's live POST **withdrawn, not deferred**. **Succeeded by R20** |
| R17 | pre-release | **D12 enactment**: the devops agent records that the statbot-side ordering instruction was **relayed**, and does not claim statbot's compliance (which is that workspace's to verify) | The deployment record | devops (documentary; no human) | At release | Relay recorded | D12 has no planning-document mirror on the statbot side — plan rev 6 makes this row the only executable trace that the constraint travelled at all. An unrecorded relay is indistinguishable from no relay | devops | Open |
| R19 | pre-release | **R16 enactment**: the guidance given to affected guild owners is **shape-dependent** — records whose only V2 marker is a stranded flag (5712's shape) are pointed at the JSON editor *Load*; records carrying V2 components **and** a stranded flag are pointed at the mode toggle, because the editor destroys their components | The recorded guidance text | Owner (he communicates; no agent may) | Now — decidable before M2 ships | Two paths named, each against its shape | Guidance written as one line will be **wrong for one of the two shapes whichever line it is** — a guild owner following the JSON-editor instruction against a components-carrying record loses the components and is not told, and the loss looks like a hooks.gg bug rather than like following instructions | owner (drafted by whoever writes the release note) | Open |
| R20 | pre-release **(gate, not a check)** | **R18 enactment**: M6-b's distribution report carries the whitespace-content class as its **own named category** — `data.components` structurally V2 and `content` non-empty but whitespace-only — with a count **and** row ids, reviewed by the owner at the R9 review he is already doing | The backfill's own report | **Owner — his decision, not a QA verdict**; the count itself is automated | After backfill completes, before declaration | Plausibly **0**. A zero closes the question *for this corpus, at this time* — it is **not** a Discord determination and must not be recorded as one | A non-zero count means live records are being marked **sendable** on a shape nobody has tested Discord against; Statbot then attempts sends hooks.gg vouched for and they fail — the exact failure this chain exists to prevent, arriving as delivery failures rather than as an alert | owner (recorded by devops) | Open |

R2 satisfies the standing requirement that a chain fixing a user-reported defect register at least
one post-deploy observable distinguishing **fixed from unfixed in production** — the fix's signature
here is a value appearing where none was, which a deploy having happened says nothing about.

---

## Assumption Not Checked

**This pass assumes that production `Messages.data` payloads are structurally conformant to
`MessageData` — `embeds` and `components` are arrays, `content` and `username` are strings where
present — and it does not test that.** I designed every fixture in this strategy from the type
declarations and the code on the chain-branch trees; **I have read no production row.** The only
production record whose shape I have is 5712, and I have it secondhand from the handoff.

**Falsity signature**: M6-b's evaluation-failure category comes back non-empty — rows where
`validateMessage` throws before returning, at `embeds.reduce` (non-array `embeds`),
`content.trim()` (non-string `content`), or `components.some` (null `components`). Under M6-b's
disposition those rows are written `valid: false`, so **the observable is guild owners reporting
that Statbot stopped delivering messages that send perfectly well** — the same signature as a
correct invalidation, which is what makes it dangerous. My fixture set contains no member drawn from
that class, so nothing I have written would have caught it.

**Owner of closure: the implementer**, at M6-b — the category must carry a count **and** the row ids,
not a count alone, because only the ids let a non-empty class be examined rather than merely noted.
The **owner's** M6-b review (R9) is where its falsity becomes a decision. Both are named again in the
handoff below, so this is routed rather than shelved.

---

## Handoff

**Phase 1 complete (rev 2). QA Status → Awaiting Implementation.**

**Rev-1 routing, now closed.** All three findings put to the owner or the planner were accepted and
enacted at plan rev 6 (`7af8936`): **F-QA1 → D11** (flag cleared on switch back, folded into M2 with
M2-d revised and M2-e/M2-f added), **F-QA7 → D12** (statbot's deploy ordered after the live
declaration), **F-QA2 → accepted** (M6-b breaks out the flag/structure-disagreement class; R2's
"~1 in 1,976" retired as a threshold and kept as context). Register rows R12 and R13 are closed
against those rulings.

**Nothing now routes to the owner. Both open items closed at rev 4; their executable residue
stays here:**

1. **F-QA8 / R16 — CLOSED.** *"Stands, but point the guidance at the JSON editor."* D11 stands and
   M2-f stays a reachability criterion. What survives the closure is **R19**: the guidance is
   shape-dependent, and stated as one line it will be wrong for one of the two shapes whichever
   line it is.
2. **F-QA9 / R18 — CLOSED.** *"Measure the population first."* The M6-b category is taken and the
   live POST is **withdrawn, not deferred**. **R20** carries the count, worded so that a measured
   zero is not mistaken for a tested-accepted: it would say the class is *empty*, never that the
   shape is *safe*.
3. **`check-repo` is back to 255** — the predecessor-era baseline — with zero failures from this
   document. Both were forward references to Phase-2 destinations; fixed with the checker's own
   `check-repo:ignore` opt-out carrying stated reasons, plus a real `verification/012/README.md`
   registering what will land there. Reconciled by re-run, not by the fix list.

**To the implementer**, when authorised:

- The pre-registered spec at `website/src/utils/__tests__/012-send-gate-partition.test.ts` is
  **written but not committed** — it is `website` source on a chain branch, and that commit grant is
  yours, not QA's. Commit it **before** writing M2, so the record shows Red preceding Green. Its
  frozen expectations are not yours to edit; a disagreement is a finding.
- **Entry conditions, as probe shapes rather than test lists** — prove the comparand exists on the
  live path before building the comparison that consumes it:
  - *before M3*: confirm `(await import('~/utils')).validateMessage === (await import('~/utils/limits')).validateMessage` — the barrel re-exports with `export * from './limits'`, so identity should hold; if it does not, M3-a's by-construction parity has no comparand.
  - *before M4*: confirm Kysely's `.compile()` on the actual upsert returns SQL whose `on conflict … do update set` list is separately inspectable. If it is not, M4-b has no instrument that works without a database, and say so rather than substituting a weaker one.
  - *before M5*: confirm `res.json` is reached through `JSON.stringify` in this Next version, so an `undefined`-valued key really is omitted on the wire.
- **Report the typecheck state on its own line, every round**, separate from the suite result. Vitest
  does not typecheck, and `tsc` will be red against the old pin until the push.
- **M6-b must carry row ids, not just counts**, for the evaluation-failure category — see *Assumption
  Not Checked*, which is yours to close.
- The **TDD Compliance table** is the first thing Phase 2 checks. Missing or incomplete is an
  immediate reject, before any test is run.

- **M2-e is the one to watch for a masking defect.** Clear the bit with `& ~IS_COMPONENTS_V2_FLAG`,
  never `flags = 0`. The spec's bit-masking control is the only cell that catches the difference.

**Next agent: the implementer subagent**, after the owner approves the rev-7 delta and the scoped
critic re-review completes. Nothing in this document blocks M1 or M2. R19 and R20 are enactment
rows, not decisions — R19 decides what is *said* about the recovery, R20 adds one predicate to a
report that already breaks out three other classes. Phase 2 (execution and verdict)
returns to this session.

*Phase 2 not yet reached — no verdict is carried by this revision, and no `Verified-At` anchor is
claimed.*
