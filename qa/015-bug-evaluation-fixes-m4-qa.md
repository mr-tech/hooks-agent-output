---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "1e12837 — repos=website; M4 only, run in a git-archive export of 1e12837 under unshare -rn, not the shared tree (chain branch at 579e8b2 when read)"
Status: QA Failed
Status-Detail: "M4 (milestone-scoped) at website 1e12837 against plan rev 19 (330348f): QA Failed, on test coverage only. Every production limb holds on every executed check. QAF-25 MEDIUM to the implementer: three limbs have no assertion in the standing suite (the send page's Discord refusal texts; its refused-input display; the rider's guild_id null member), shown by 7 surviving QA mutants. The cells ride M4's D29 reopen (rev 20/21). Suite 825/825, 78 files, exit 0; typecheck exit 0. I-3's Send guard: 3 of 3 QA mutants killed. Plan Status left alone."
Phase: 2
---

# QA Report: Plan 015 — M4 (send page and webhook menu)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 19 (agent-output `330348f`), § M4, read in full. Revisions 20 (`e118cc3`) and 21 (`3d193f9`) landed during this pass. They add M4-d's webhook-load limb (D29, CR-16) and remove M3 (D30). That limb is not delivered at `1e12837` and is outside this verdict. M4 reopens for it, and the re-run after the reopen covers it. Revs 20 and 21 change no other M4 limb assessed here: the old-message clause is reworded "old-message fetch", with the same text and sites.
**Implementation**: `implementation/015-bug-evaluation-fixes-m4-implementation.md` (`d30916f`), `Handoff-At: 1e12837`.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md` Round 7 (`a99e9ff`), `Reviewed-At: 1e12837`, `Verdict: APPROVED_WITH_COMMENTS`. These were re-derived from the committed header and Round 7 section at `a99e9ff`, and are this pass's stage start. Steering's brief arrived (Resumption State, rulings, Decisions Register D1–D28, then D29–D30 at revs 20/21; no duties negated).
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` § M4 (reconciled to rev 21 in this session) and its blocking-condition register. This pass appends no row.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T07:30 | code-reviewer-hooks-015, steering-hooks-015 → qa-hooks-015 (messages) | QA Phase 2 for M4 at website `1e12837` | Phase 2, milestone-scoped (M4). The stage start was re-derived from `a99e9ff`. This document was created at this pass and first committed with Status QA Failed (M4 scope; plan Status left alone). QAF-25 MEDIUM goes to the implementer: test gaps only, with no production defect found. |

## Scope and criteria assessed

Fixed before execution (plan § M4, rev 19):
- **M4-a.** While a send is pending, Send is disabled: N presses give one webhook request. A failed send leaves no unhandled rejection (exit 0) and re-enables Send.
- **M4-b.** "Invalid URL" shows exactly when the URL is non-empty, validation has settled and `selectedWebhook` is null.
- **M4-c.** Clear (list view only) is enabled exactly when `threadId` is non-empty and nothing is loading.
- **M4-d, at each of the two sites** (`WebhookProvider` `useValue`; `useValidateWebhook`):
  - the input class (trimmed; all-digits id, or a link of the shared constant);
  - refused input: no fetch, and nothing shown;
  - a failed old-message fetch shows D24's text, with no unhandled rejection;
  - Discord refusals keep their texts;
  - ordering: the latest input wins.
- **M4-d, the shared constant:** eight hosts admitted, and the earlier refusals still refused.
- **M4-d, its consumers:** `getFromUrl` passes the link's own guild to the gate and its channel and message ids to the request (CR-11); `NewMessageModal` follows the constant.
- **AF-19** (one parser): code review's limb by source read (Phase 1 § M4). QA owes no cell.
- **D27 rider:** content only when the channel's `guild_id` equals the authorized guild, over the field's whole domain (another guild; absent; `null`). Lookup refusals 401/403, 404 and other give their texts with no content, decided before the message request.
- **Entry conditions:** E-5, E-6, E-7, E-8.

**Classes behind the examples.**
- The host class has eight members. Each is its own case in the constant test, the router test and both site tests (`it.each`, not a loop).
- The refusal class is the 13 listed in the constant test and per site. A pattern class is not enumerable, so the members are the plan's named ones (L-C4-1) plus the reviewer's 26-case attack set (below).
- The `guild_id` domain is three members plus equality. The lookup's status classes are 401, 403, 404 and other (500, 429).
- The Discord refusal statuses at the send page are 404, 403, 401, 400 and other. Each is a member of "keep their texts", dispositioned per member below.

**Out of scope.** D29's webhook-load limb (revs 20 and 21). Human-observable limbs: B-9, B-10 and B-11, all UAT's. M1-c and M1-h at `579e8b2` are M1's Phase 2.

## TDD compliance gate

The implementation document's table has 22 rows. Every new function or behaviour has a row answering Yes, Yes, Yes with a failure reason: `parseMessageId`, the Send guard, the menu's error and Clear, the constant, the router's groups and rider, and both sites' effects. The "No" rows are named controls on unchanged or type-only lines, as each row says:
- re-press after settle;
- the three "webhook selected" cells;
- the rider's same-answer and no-lookup cells;
- `fetchChannel`.

The ordering disclosure, tests written after the widening and the anchored id with their reds as named mutants, matches the M2 precedent and Axiom A. "Re-press after settle" had no red. This pass supplies one: QA mutant `i3-stuck-disabled` reddens it (below).

Gate: **passed**.

## Test Execution Results

Every count here is re-derived by this pass. Captures under `verification/015/`:

| Capture | What |
|---|---|
| `qa-m4-suite-run.sh` | Suite and typecheck driver: export, `unshare -rn`, `lo` up, isolation counts |
| `qa-m4-run-1e12837.txt`, `qa-m4-testresults-1e12837.json`, `qa-m4-testresults-paths-1e12837.txt` | Its run |
| `qa-m4-sweep.sh`, `mutators/qa-m4-supplement.py` | QA mutation driver and mutants |
| `qa-m4-sweep-summary-1e12837.txt`, 14 `mutation-qa-m4-*-1e12837.txt` | Their runs (3 controls, 11 mutants) |
| `qa-m4-rerun-cr-getfromurl-attack-1e12837.txt` | Code review's rider attack, re-run here |

| Check | Result | Exit |
|---|---|---|
| Full suite at `1e12837` (vitest JSON, export, `unshare -rn`: 0 non-lo links, 0 default routes; export blob of `message.ts` = tree blob `3e6b41b`) | 825 total, 825 passed, 0 failed; `testResults` 78; stderr 0 lines | 0 |
| Path membership | Against `m2-testresults-paths-6001f7f.txt`: 0 removed, 7 added, exactly the seven M4 test files. Against the implementer's `m4-testresults-paths-1e12837.txt`: one path is only in theirs, `src/components/__tests__/dialogs.enter-key.test.tsx`, the untracked M3 work file (10 cases), absent from the export. 835 − 10 = 825, reconciled | — |
| `pnpm run typecheck` (both programs) | clean | 0 |
| E-8 lockfiles | `git diff --quiet 6001f7f 1e12837 -- pnpm-lock.yaml package-lock.json` | 0 (no change) |
| Naming, positive form | 7 of 7 new basenames conform | — |
| Naming, negative form | 0 ID-token hits over the 7 files' basenames, `it`/`describe` titles and comment lines. Planted control (`cr-12 rider` title, `QA-14` comment): 2 of 2 hits | — |
| Send page error texts, base vs tip | The sorted `setOldMessageError(…)` calls in `WebhookProvider.tsx` at `6001f7f` and `1e12837` differ by exactly one line, the added `MESSAGE_LOAD_FAILED_ERROR`. The 404/403/401/400/other texts are byte-identical | — |

### Code review's rider attack, re-run (second instrument)

`verification/015/cr-m4-probes/run.sh` at `1e12837`, under `unshare -rn` with the isolation counts checked: **26 passed (26), vitest exit 0**. This reproduces Round 7's run 2. Its members include `guild_id: null` (channel 307), a numeric `guild_id`, DM and group-DM channels, threads of the authorized guild (the positive control), lookup 403 and 404, and the pattern refusals. The probe runs the real `getFromUrl`, `authorizeGuildAdmin` and cache layer. It is code review's instrument, re-run as captured, not a suite member.

### Mutation kill table

**Driver.** `qa-m4-sweep.sh` → `mutate-run.sh`, a fresh `git archive 1e12837` export per run inside `unshare -rn` (isolation counts checked). Each run executes one test file, named by its vitest filter.

**Scope (production code M4 changed, `git diff 6001f7f..1e12837`).** The production files are `page.tsx`, `WebhookMenu/index.tsx`, `WebhookProvider.tsx`, `constants/index.ts`, `message.ts`, `useValidateWebhook.ts`, `parseMessageId.ts` and `redis/index.ts`. Seeded at:
- the Irreversible Side-Effect Register guard M4 changed, I-3's Send gate (`page.tsx` `allowSave` and `withSending`; step 4);
- the plan limbs whose cells the implementer's 34-mutant table names no red for.

The rider's belonging comparison is a disclosure guard. It is also owed at the effort-final sweep (Phase 1 § M4). The implementer's 34 mutants (`mutators/m4-table.py`) were not re-run here; see Assumption Not Checked.

**Suite instrument blobs at `1e12837`:** `afac608` `page.send-in-flight.test.tsx`; `5d104b8` `WebhookMenu.url-and-thread-controls.test.tsx`; `3fd7f64` `constants.discord-message-link.test.ts`; `7ea153a` `WebhookProvider.validation-effects.test.tsx`; `4b18623` `message.get-from-url.test.ts`; `24f5682` `useValidateWebhook.validation-effects.test.tsx`; `ac85469` `redis.fetch-channel.test.ts`. All are committed; no uncommitted instrument scores a kill.

**Controls:** `page.send-in-flight` 3 of 3; `message.get-from-url` 19 of 19; `WebhookProvider.validation-effects` 26 of 26; all exit 0.

| Mutant (`qa-m4-supplement.py`) | Target | Result | Cases reddened / disposition |
|---|---|---|---|
| `i3-sending-conjunct-dropped` | `allowSave` without `&& !isSending` | **killed** (2 failed, exit 1) | "posts once for three presses…", "re-enables Send after a failed send…" |
| `i3-stuck-disabled` | Send stays disabled once any send has started | **killed** (3 failed, exit 1) | all three, including "posts again on a later press once the first send has settled", which had no red in the TDD table |
| `i3-catch-dropped` | `.catch(() => null)` removed | **killed** (3 passed, 1 Unhandled Rejection, exit 1) | killed by the process exit, which M4-a names; counters stay green |
| `rider-null-passes` | `!('guild_id' in channel) \|\| (channel.guild_id !== null && channel.guild_id !== guildId)` | **survived** (19 passed, exit 0) | no suite case has `guild_id: null`. QAF-25 (3) |
| `rider-loose-inequality` | `!==` → `!=` | survived (19 passed) | Dispositioned, no finding: it differs only for a non-string `guild_id`, and Discord's channel object types `guild_id` as a snowflake string (contract bars the input; Input Robustness step 1). The numeric member is in the reviewer's probe, refused at `1e12837` |
| `provider-404-text` | 404 text changed | **survived** (26 passed) | QAF-25 (1) |
| `provider-403-text` | 403 text changed | **survived** | QAF-25 (1) |
| `provider-401-text` | 401 text changed | **survived** | QAF-25 (1) |
| `provider-400-text` | 400 text changed | **survived** | QAF-25 (1) |
| `provider-other-status-text` | other status drops Discord's `message` | **survived** | QAF-25 (1) |
| `provider-refused-shows-error` | refused input sets an error text | **survived** | QAF-25 (2) |

Score: 11 mutants at the sites matching "I-3's gate conjuncts and handler in `page.tsx`, plus the plan-limb sites in `WebhookProvider.tsx` and `message.ts` whose cells the implementer's table names no red for", at `1e12837`. That covers 3 + 8 sites, and excludes the implementer's 34 and every other production line. Killed: 3 of 3 at I-3. Survived: 7 of 8 at the limb sites, plus 1 dispositioned.

## Implementation Review (Post-Implementation)

- **Per-limb, against the cells** (Phase 1 § M4 as reconciled to rev 19):
  - M4-a, M4-b and M4-c: covered and discriminating.
  - The constant: 8 hosts plus 13 refusals, reddened by the implementer's five regex mutants.
  - `getFromUrl` groups (CR-11): literal `'111'` at the gate and `/channels/222/messages/333` for all 8 hosts.
  - Both sites' input class, trim (hook cell; one shared parser), failure text and ordering: covered.
  - The rider's other-guild, absent and order cells: covered.
- **Deviations from the Phase 1 cell design, accepted.**
  - The router test mocks `redis.fetchChannel`, so the real lookup and the check do not run in one case. The composition holds: `redis.fetch-channel.test.ts` runs the real `fetchChannel` and asserts `guild_id` survives into its resolved value, and the router cells consume that shape. The reviewer's probe runs both together, 26 of 26.
  - The lookup-refusal cells sit at `fetchChannel` (401, 403, 404, 500, 429, texts as literals), with one router cell for propagation and no message request.
- **Code review's question: should the suite own `authorizeGuildAdmin`?** Not in M4. The gate is pre-existing and unchanged by M4 (`git diff 6001f7f 1e12837` has no hunk in it). The rider's order cell ("does not look the channel up for a caller who is not authorized") fixes what M4 relies on: refusal precedes the lookup. The gate's own behaviour on live data is register row B-10, and its permission predicate is the Round 6 probe. No finding.
- **Gaps:** QAF-25.

## Findings

QAF-25 MEDIUM Phase 2 — Three M4 limbs that the change claims to preserve or rely on have no assertion in the standing suite. Each was shown by a QA mutant that survives every suite case at `1e12837`. The production code is correct on all three: (1) and (2) by base-vs-tip text identity and source read, (3) by the reviewer's probe re-run here.
- **(1) The send page's Discord refusal texts** (plan § M4-d: "Discord refusals keep their existing texts", at both sites). `WebhookProvider.validation-effects.test.tsx` has no case for a 404, 403, 401, 400 or other-status message response. The site's message effect was restructured in M4 (the stale guard and the catch moved around these branches). Survivors: `provider-404-text`, `provider-403-text`, `provider-401-text`, `provider-400-text`, `provider-other-status-text`. The dialog site has its cell ("keeps Discord's own refusal text").
- **(2) The send page's refused-input display** (plan § M4-d, QAF-22 (2): "the message and the error are both cleared"). The provider's refusal cases assert `oldMessage` null only, never `oldMessageError` `''`. Survivor: `provider-refused-shows-error`. The dialog site asserts both.
- **(3) The rider's `guild_id: null` member** (plan § M4-d rider "Property": every value other than the authorized guild id is refused; Phase 1 § M4 rev 19 reconcile owed this cell). `message.get-from-url.test.ts` covers another guild and an absent field, not `null`. Survivor: `rider-null-passes`, a guard that refuses an absent field but passes `null`.
- **What it fails to check:** that a later change to either site's message effect, or to the rider's comparison, keeps these behaviours. Every suite case stays green when they are lost.
- **Required (implementer), riding M4's D29 reopen.** Tighten the existing cells rather than adding files (pattern-ladder rule):
  - (1) an `it.each` over 404, 403, 401 and 400, plus one other status with a Discord `message`, in the provider test. Each asserts its text as a literal read at `6001f7f`, and `oldMessage` null.
  - (2) add `expect(state.oldMessageError).toBe('')` to the provider's refusal `it.each`.
  - (3) add `['a channel with guild_id null', { id: '222', type: 0, guild_id: null }]` to the router's no-`guild_id` `it.each`.
  - Each cell must be seen red under the named mutant in `verification/015/mutators/qa-m4-supplement.py` (`MUT_ID=<id>`, driver `qa-m4-sweep.sh`) and green at the fix tip. The re-verdict re-runs those mutants.

## Assumption Not Checked

This pass assumes that the implementer's 34 mutants (`mutators/m4-table.py`, `mutation-m4f-*-1e12837.txt`) redden the cases their table names at `1e12837`. It does not re-run them; the 11 QA mutants above are this pass's only kill evidence. The other limbs' discrimination rests on those captures: the constant's anchors and hosts, the id class, ordering, both catches, the groups and the rider's other-guild and order cells.
- **Signature of its falsity:** one of those mutants, re-run at a later M4 tip from its committed mutator, leaves its named case green.
- **A related fact checked in this pass:** those 34 captures, the `mutation-m4f-*-1e12837.txt` files and the implementer's `m4-*-1e12837` gate captures, are **staged in the record's index and not committed** (`git status --porcelain`: `A`, at 07:31Z). The implementation document cites them as its evidence. They are not this stage's to commit, and this pass's commit names its own paths only (`--only`), so it does not carry them.
- **Owner of closing:** QA, at M4's re-run after the D29 reopen. That pass sweeps the reopen's production diff, and the effort-final sweep over `7ce866b..<tip>` covers M4's production files whole.

## Blocking-condition register

This pass appends no row to the chain's register (`qa/015-bug-evaluation-fixes-qa.md`). Rows inherited by M4 and not discharged: B-9 (D26 walk), B-10 (the rider's gate on live data) and B-11 (D29 offline walk, minted in the rev 20 + 21 Phase 1 pass). All three are UAT's and open.

## Handoff

- **Implementer (implementer-hooks-015):** QAF-25 MEDIUM. Its three cells ride M4's D29 reopen, together with the D29 cells in Phase 1 § M4 (rev 21 reconcile). M4's Phase 2 re-run follows code review's approval of that tip.
- **Code reviewer:** the `authorizeGuildAdmin` question is answered under Implementation Review. The reviewer's probe was re-run here, 26 of 26.
- **Verdict:** QA Failed for M4 at `1e12837`, on suite coverage. No production defect was found, and no limb failed an executed check.
