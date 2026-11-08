---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "476c633 — repos=website; M5-h and M5-i (the M5-a to M5-g PASS at 24ac49f stands); git-archive exports under unshare -rn"
Status: QA Complete
Status-Detail: "M5-h and M5-i (milestone-scoped) PASS at website 476c633 against plan rev 27 (18d361c). M5-h's crash-set cells cover every plan member except Phase 1's literals { and [{}] (QAF-35 LOW, non-blocking). Every M5-h and M5-i mutant is killed. The M5-a to M5-g PASS at 24ac49f stands."
Phase: 2
---

# QA Report: Plan 015 — M5 (editor pages and providers), M5-a to M5-g

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 22 (agent-output `5201612`), § M5-a to M5-g, read in full. Rev 23 (`39dbc0d`) landed during the pass and changes M5-h and M6-l only (steering's brief). M5-h is outside this verdict.
**Implementation**: `implementation/015-bug-evaluation-fixes-m5-implementation.md` (`40ece24`), `Handoff-At: da24eb7`. M5-a to M5-g are at `23a621e`; `da24eb7` adds only the M5-h guard simplification.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md` Round 10 (`d7708e8`), `Reviewed-At: da24eb7`, `Verdict: REJECTED` for M5-h only (CR-18). M5-a to M5-g are met, with CR-19 LOW. Re-derived from the committed header and Round 10 at `d7708e8`; this is the stage start for M5-a to M5-g.
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` § M5. This pass appends B-13 there.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T08:07 | code-reviewer-hooks-015 → qa-hooks-015 (message: `d7708e8`) | QA Phase 2 for M5-a to M5-g at website `da24eb7` | Phase 2, milestone-scoped. Created and first committed with Status QA Failed (M5-a to M5-g scope; plan Status left alone). QAF-29 MEDIUM goes to the implementer. B-13 is minted in the chain's register. |
| 2026-11-08T08:34 | code-reviewer-hooks-015, steering-hooks-015 → qa-hooks-015 (messages: `e0054f7`; resume brief) | M5-a to M5-g re-run after QAF-29's test-only fix (`24ac49f`), with CR-19's production change (`a665901`) | Phase 2 re-run. QAF-29's survivor is killed, and so is CR-19's refresh mutant. The whole suite also passes under `TZ=America/Los_Angeles`. QAF-29 RESOLVED. Verdict PASS; Status → QA Complete (M5-a to M5-g scope; plan Status left alone). See § Re-run at `24ac49f`. |
| 2026-11-08T09:52 | code-reviewer-hooks-015 → qa-hooks-015 (`2fa6d8b`); steering-hooks-015 (brief at rev 27) | M5-h and M5-i at `476c633` | PASS. QAF-35 LOW is raised and does not block. |

## Scope and criteria assessed

Fixed before execution (plan § M5, rev 22):
- **M5-a.** After a confirmed Load, the JSON dialog closes on Esc and outside-click, as after a cancelled one.
- **M5-b.** Copy to Clipboard is disabled whenever Pretty-print is, or the draft does not conform. Pressing it never throws.
- **M5-c.** The update prompt includes "Any changes you have made will be lost." exactly when the composer has unsaved changes at the moment the event arrives. The hash comparison is untouched (X-10).
- **M5-d.** The guild dropdown reflects `session.user.guilds` after every session update, without remount.
- **M5-e.** "Today" is shown exactly when the message date's year, month and day equal today's, in both copies.
- **M5-f.** Opening Save As proposes the message's current name and server (D: "reset on open").
- **M5-g.** The delete failure toast names the delete.
- **Entry conditions:** E-5 to E-8.

**Classes behind the examples.**
- M5-e's class is two instants compared on the user's calendar. Its members are Phase 1's four (same day; same day-of-month in another month; same month and day in another year; yesterday), at both copies. One more axis is behind them: the user's zone. The four members were written at a fixed instant in the suite's zone, which is UTC on this box (`date +%Z`). QAF-29.
- M5-c is {changed, unchanged} × the event, including a change after subscribing. M5-d is the session's guild list across updates.

**Out of scope.** M5-h is held for CR-18's fix and was restated at revs 22 and 23. Its test file runs in the suite below, but this pass gives no verdict on it.

## TDD compliance gate

The table has 11 rows. Each new behaviour has a row with a red at assertion level: `commitLoad`, the Copy gate and text, the pusher flag, the dropdown memo, `formatMessageDate`, the Save As refill and the delete toast. The two wiring rows (Header, folder page) were written after the rewiring, and their reds are named stand-in mutants. Both are disclosed. **Passed.**

## Test Execution Results

Captures under `verification/015/`:

| Capture | What |
|---|---|
| `qa-p2-run-da24eb7.txt`, `qa-p2-testresults-da24eb7.json`, `qa-p2-testresults-paths-da24eb7.txt` | Shared with M4's re-run: one suite run at `da24eb7` |
| `qa-sweep.sh`, `mutators/qa-m5-supplement.py`, `qa-m5-sweep-summary-da24eb7.txt`, `mutation-qa-m5-*-da24eb7.txt` | The M5 mutant and its control |
| `qa-m5e-local-day-probe/` (`run.sh`, `probe.mjs`, `run1-da24eb7.txt`, `run1-utc-getter-control-da24eb7.txt`) | The local-day probe and its positive control |

| Check | Result | Exit |
|---|---|---|
| Full suite at `da24eb7` (export, `unshare -rn`, isolation 0/0) | 890 total, 890 passed, 0 failed; `testResults` 89; stderr 0 lines | 0 |
| Path membership | Against `3031878`'s list: 11 added, the nine M5 files and M4's two D29 files; 0 removed | — |
| `pnpm run typecheck` | clean | 0 |
| E-8 | `git diff --quiet 6001f7f da24eb7 -- pnpm-lock.yaml package-lock.json` | 0 |

**Suite instrument blobs at `da24eb7`:** `428ba3e` `Header.search-result-dates`; `3274657` `page.message-list`; `05204e7` `JsonModalBody.copy-needs-valid-draft`; `ef5ba31` `JsonModalBody.menu-close-after-load`; `b9d89e9` `SaveAsMenu.opens-with-current-values`; `9a97cce` `page.invalid-data` (M5-h, not under verdict); `f171189` `usePusher.update-prompt`; `1de551c` `formatMessageDate.same-day`; `4038606` `useGuildDropdownItems.session-update`. All are committed.

### Mutation and probe

**Sweep scope.** No Irreversible Side-Effect Register guard is changed by M5-a to M5-g. M5-g changes a toast, not the delete. So step 4's guard sweep owes nothing here, and M5's production diff falls to the effort-final sweep. This pass adds one mutant, at the class axis the suite cannot see. The implementer's 25 mutants at `6c42032` were not re-run; they rest on their committed captures.

| Mutant / probe | Result |
|---|---|
| control: the three date files (`formatMessageDate.same-day`, `Header.search-result-dates`, `page.message-list`) | 9 passed, exit 0 |
| `m5e-utc-getters` (`isSameLocalDay` compares `getUTCFullYear`/`getUTCMonth`/`getUTCDate`) | **survived**: 9 passed, exit 0. QAF-29 |
| Probe, shipped `formatMessageDate.ts` (blob `89e5601`) under `TZ` = UTC, Pacific/Auckland, America/Los_Angeles. "Now" is 2026-11-08T20:00Z; messages at 10:00Z and at 23:30Z the previous day. Expected literals per zone are in `probe.mjs` | OK in all 3 zones: the shipped code compares the local day |
| Probe positive control: the same file with every local getter replaced by its UTC getter | MISMATCH in Pacific/Auckland (`[true,false]` vs `[false,false]`), so the probe discriminates. Los Angeles does not separate the two with these fixtures; that is recorded, not hidden |

## Re-run at `24ac49f`

**Stage start.** Code review Round 14 (`e0054f7`) names `24ac49f`'s QAF-29 cells as test-only and QA's gate. It records CR-19 (`a665901`) as RESOLVED. Steering's resume brief arrived.

**Scope.**
- QAF-29's diff is test-only: `formatMessageDate.same-day.test.ts`, 23 lines added.
- The production delta over M5-a to M5-g's files since `da24eb7` is `usePusher.ts` only (CR-19: `useLatest(hasChanged)` replaces a hand-updated `useRef`). It expired M5-c's verdict, so it is refreshed here.

**Adequacy of QAF-29's cells (read in full).**
- `process.env.TZ = 'America/Los_Angeles'` is set at the file's top, before any `Date` use. A cell asserts that the offset is 480 on a November date, so the zone is shown to be in force.
- Two members straddle UTC midnight, with hand-derived expectations:
  - now is local 23:30 on Nov 8 (07:30Z on Nov 9). A message at local 09:05 the same day is "Today" (UTC getters say not).
  - A message at local 00:30 on Nov 9 (08:30Z on Nov 9) is not "Today" (UTC getters say it is).
- The title "a message earlier on the local day that falls on the next UTC day" names the wrong instant. It is *now* that falls on the next UTC day. That is cosmetic; the expectation is right.
- **Leakage**, which QAF-29 asked to confirm: the whole suite passes 1029/1029 both in the box's UTC (`qa-p2-m6-run-24ac49f.txt`) and with `TZ=America/Los_Angeles` set for the whole run (`mutation-qa-tz-la-whole-suite-24ac49f.txt`, exit 0, 0 Unhandled). No other file's expectations depend on which zone it inherits.

| Run | Result |
|---|---|
| control `formatMessageDate.same-day` (`qa-m5r-sweep-summary-24ac49f.txt`) | 9/9, exit 0 |
| `m5e-utc-getters` | **killed** (2 of 9): the two straddling members |
| control `usePusher.update-prompt` (`qa-m6x-sweep-summary-24ac49f.txt`) | 4/4, exit 0 |
| `m5c-flag-frozen-at-subscribe` (`mutators/qa-m6-supplement.py`: the ref rebuilt per render, so the effect reads the subscribing render's value) | **killed** (2 of 4): both "after the subscription was made" cells |

**Verdict: PASS** for M5-a to M5-g at `24ac49f`, milestone-scoped. B-13 stays open and is UAT's.

## M5-h and M5-i at `476c633`

Stage start: code review `2fa6d8b` (Rounds 16 to 18), `Reviewed-At` `476c633` for the website, re-derived from the committed section. Suite at website `476c633` (git-archive export, `unshare -rn`): 1118/1118 cases in 114 files, vitest exit 0, `pnpm run typecheck` exit 0 (`verification/015/qa-p2-r2-run-476c633.txt`, `qa-p2-r2-testresults-476c633.json`). 6 files were added since `24ac49f` and 0 removed, compared by path membership (`qa-p2-r2-testresults-paths-476c633.txt`).
- **TDD gate:** passed. The M5 implementation rows for the crash-set guard (M5-h) and the `WebhookMenu` open category (M5-i) are Yes/Yes, with assertion-level failure reasons.
- **M5-h** (`page.invalid-data.test.tsx`), audited against rev 27 § M5-h (3)'s lists:
  - Every crashing member and every rendering member has its own case, including `fields: null` as rendering (CR-29).
  - A refused case asserts that the error line is present: exactly one `.text-error`, with the literal text. A rendering case asserts that the editor landmark `.discord-visualizer` is present. No case asserts only the absence of the other outcome.
  - Mutants killed: `pg-nobound` 11, `pg-blank` 11, `pg-refuseall` 14, `pg-array` 1.
  - Missing: Phase 1's literal members `{` (class 1) and `[{}]` (class 2). See QAF-35.
- **M5-i** (`WebhookMenu.open-category.test.tsx`):
  - Every cell reads the expanded panel from the DOM (`aria-expanded`).
  - Cells cover webhooks arriving after mount, and each of the three `hasWebhooks` conjuncts going back to the custom tab. They also cover the guild arriving late, a guild switch, and a kept pick: the Custom/load tab, as Phase 1 names it.
  - Mutants killed: `wm-pick` 2, `wm-seed` 7, `wm-auth` 1, `wm-guild` 1, `wm-count` 3.
- **Naming and oracles:** there is no ID token in a basename, title or comment, and every expected value is a literal.
- **Verdict:** M5-h PASS and M5-i PASS at `476c633`.

## Implementation Review (Post-Implementation)

**Per criterion:**
- **M5-a: met at the flag.** `commitLoad` hands close ability back, and the cell asserts it, reddened by `m5a-allow-close-not-reset`. Neither Esc nor an outside click is driven. The wiring from the flag to Headless UI's close is pre-existing and unchanged. Code review routes the keypress to UAT (Round 10's Assumption Not Checked). This pass registers it as **B-13**, so the walk has an owner and a predicted value.
- **M5-b, M5-c, M5-d, M5-g: met.** Each is discriminated by the implementer's named mutants. Their expectations are literals: the prompt text, the toast text and the guild lists.
- **M5-e: met in production (probe), unasserted on the zone axis.** QAF-29.
- **M5-f: met.**
  - The survivor `m5f-save-as-refills-on-close-too` removes `if (!isOpen) return`. The extra refill then runs during the leave transition, when jsdom renders nothing, so no case can see it.
  - Dispositioned as **equivalent under the suite's DOM**. Its only browser consequence is cosmetic (the field text resetting while the dialog fades), which M5-f's criterion does not cover. Code review agrees.
  - No finding and no row: no criterion is at stake.

## Findings

QAF-35 LOW Phase 2 — M5-h's Phase 1 cell list names `{` (class 1) and `[{}]` (class 2). Neither has a case in `page.invalid-data.test.tsx` at `476c633`.
- **Why it does not block:** both go through a branch that other members already discriminate. `{` throws in `JSON.parse`, as `{not json` does. `[{}]` takes the array refusal, as `[]` does, and `pg-array` is killed. The property is the class: § M5-h (3) treats its members as illustrations.
- **The property it wants checked:** a `/preview` `data` that is a bare `{`, or a list holding an object, shows the one error line and no editor.
- **Required (implementer):** two `it.each` rows in the existing table, tightening it rather than adding a file, green at the tip. Owed before the effort-final pass.

QAF-29 MEDIUM Phase 2 RESOLVED (2026-11-08T08:34: website `24ac49f`; `m5e-utc-getters` killed, § Re-run at `24ac49f`) — M5-e's "today" is the user's calendar day, and no cell can tell local time from UTC. The suite runs in UTC (`date +%Z` on this box; no `TZ` in the vitest config). Every fixture is built with the local `Date` constructor, so local and UTC coincide, and the mutant `m5e-utc-getters` passes all 9 date cases.
- **Production is correct.** `isSameLocalDay` uses local getters, as the base's `getDate()` did. The probe confirms local-day semantics in three zones, and a positive control shows the probe can fail.
- **Why it blocks.** The change claims local-day comparison (the helper is named for it) and preserves the base's local reading, and nothing asserts it. A UTC regression would show "Today" for yesterday's evening messages to every user east of UTC, which is the F-23 class itself.
- **Required (implementer):** tighten `formatMessageDate.same-day.test.ts`.
  - Run the file under a fixed non-UTC zone (e.g. `process.env.TZ = 'Pacific/Auckland'` before any `Date` use in that file, or a per-file environment the runner honours).
  - Add a member that straddles UTC midnight, with expected literals derived by hand as in `probe.mjs`: "now" 2026-11-08T20:00Z, a message at 2026-11-08T10:00Z → not "Today" in Auckland.
  - It must be seen red under `MUT_ID=m5e-utc-getters` (`mutators/qa-m5-supplement.py`, driver `qa-sweep.sh`) and green at the fix tip.
  - Confirm the other files' expectations are unchanged under that zone, or scope the zone to this file.

## Assumption Not Checked

This pass assumes that, in a real browser, Headless UI's dialog closes on Esc and on an outside click whenever `setAllowMenuClose(true)` has been applied, as after a cancelled Load. It does not test it, because a browser act needs steering's go.
- **Signature of its falsity:** in B-13's walk, after a confirmed Load, Esc or an outside click leaves the JSON dialog open, while the cancelled-Load control closes.
- **Owner of closing:** UAT, through B-13.

## Blocking-condition register

B-13 is appended to the chain's register (`qa/015-bug-evaluation-fixes-qa.md`). Rows inherited by M5 and not discharged: B-12 (M5-h, held) and B-13. Both are UAT's.

## Handoff

- **476c633 pass:** M5-h and M5-i PASS. QAF-35 LOW goes to the implementer (implementer-hooks-015). It is owed before the effort-final pass.

- **Implementer (implementer-hooks-015):** QAF-29 MEDIUM. One cell tightened, then M5-a to M5-g's Phase 2 re-run on the round's diff, which also re-runs `m5e-utc-getters`.
- **Verdict:** QA Failed for M5-a to M5-g at `da24eb7`, on suite coverage. No production defect was found.
- **Verdict (24ac49f, re-run):** PASS for M5-a to M5-g, milestone-scoped.
