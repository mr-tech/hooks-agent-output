---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "1ab3b96 — repos=website; M3 only. The suite, the typecheck, the E-7 sweep and the M3-f revert check all ran in isolated git archive exports of 1ab3b96, and of 1ad625e for the old reader."
Status: QA Complete
Status-Detail: "M3 passes at website 1ab3b96. The bounded E-7 sweep detected 73 of 78 mutants, and the 5 survivors are equivalent and dispositioned. No QA finding. Milestone-scoped, so plan Status is unmoved. The effort-final sweep is owed."
Phase: 2
---

# QA Report: Plan 017 — M3 (a stored draft survives sign-in, another tab and an expired-session sign-out)

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 4. No hunk of the plan's diff since
`a97628d` lands in `### M3`, the Testing Strategy, Validation or Risks (changelog rows only).
**Implementation Reference**: `implementation/017-existing-items-backlog-m3-implementation.md`, `Handoff-At: 1ab3b96`,
and its Fix Round 1.
**Stage start**: code review round 3 sub-entry, APPROVED, `Reviewed-At: 1ab3b96`
(`code-review/017-existing-items-backlog-code-review.md`, agent-output `457d142`, captures `3cc9123`). It came after round 3
REJECTED at `3498ef3` (`7e3bad7`) and a test-only fix. Re-derived at the record.
**Blocking-condition register**: `qa/017-existing-items-backlog-qa.md`. This pass appends no row. B-2 (UAT, local walk)
and B-9 (his production look) are M3's rows and are unchanged.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T03:00 | code-reviewer-hooks-017 (cross-session message; review `457d142`) | QA Phase 2 for M3 at website `1ab3b96` | Phase 2, M3 only. Suite 1620 of 1620, exit 0; typecheck 0. M3 changes E-7 (the users' browser-storage rewrite), so this milestone's bounded sweep ran over M3's production diff: 73 mutants generated plus 6 of QA's; 73 of 78 detected, the 5 survivors equivalent. M3-f's revert check was reproduced with this pass's own capture plus a planted control. Every criterion member was dispositioned. **QA Complete** (M3-scoped). No finding. |

## Criteria assessed (recorded before execution)

These are M3-a to M3-h as revision 4 states them, plus the Phase 1 obligations: AN-2's S2, S3 and S5 rows; M3-c's table
whole; M3-d's 3×2 cells with each status the sole carrier; the shared-code reach over the other keys (QAF-6); NM-6 and NM-7.

Member by member, each with its case in the `1ab3b96` run (`vitest-1ab3b96.json`, by `fullName`):

- **M3-a.**
  - Sign in, then open a saved message, then route 0: "a signed-out draft at route 0 is restored after sign-in, opening a
    saved message, and returning to route 0".
  - Sign in, then route 0, and reload: "… after sign-in and a reload". The OAuth return is a page load in the same tab,
    so these two members share one path.
  - Close and reopen: "… in a tab opened later, when it was the last edited".
  - Name and whole data are compared (CR-6, `1ab3b96`).
- **M3-b.**
  - Edits are shown again after signing in and opening *n*.
  - Route 0 meanwhile shows its own draft.
  - Edits are shown after a reload.

  Both mechanisms of the session loss (`SessionProvider`'s `signOut()` and `Redirects/Client`'s redirect) reach the
  provider as "nothing written by the sign-out" (matrix row "Sign-out of any kind"), so the provider cases cover both.
  `SessionProvider.stale-cookie-sign-out` covers the exit itself.
- **M3-c.** All 4 rows are under "two tabs at route 0":
  - rows 1 and 2: "each tab its own last draft after a reload";
  - row 3: "a new tab the draft edited most recently";
  - row 4: "a draft whose tab has closed".

  The table was run whole, and the "no draft anywhere" cell was added beside it.
- **M3-d.**
  - The 6 `hasChanged` cells are all present. NM-7 is killed for each status, per the implementer's capture, and the
    status mutants were not regenerated here.
  - The unload table's rows each have a mounted case: `useUnloadAlert.act-suppression`, `NavMenu.sign-in-and-out`,
    `page.sign-in-exit` and `SessionProvider.stale-cookie-sign-out`.
  - The raw-anchor row has no unload, and no case is owed.
- **M3-e.**
  - The id-less draft and the copy of *n* (newer, exactly as new, older) each have a case, as literal stored strings.
  - **The "intro message" member has no case of its own.** Disposition: the intro message is stored without an id, and
    the migration branches only on `legacy.id` (`messageDrafts.ts` `readDrafts`). It is therefore the id-less member with
    other content, and `qa-migration-id-ignored` (below) separates the two branches.
- **M3-f.** The suite asserts the legacy key's literal form ("the legacy message key holds the route-0 draft last written").
  The old reader is checked below.
- **M3-g.** Covered per key:
  - `theme`: read raw with no parse; written as the bare string;
  - `frequentlyUsedEmojis` and `client_preferences`: the same JSON string;
  - the cross-tab event after a write that landed;
  - the quota limb: no throw, a false return, no event.

  NM-6 is killed (implementer's capture).
- **M3-h.**
  - Entry bound of 20, in any write order.
  - The size bound at exactly one megabyte, and one character over.
  - An oversized single entry is still written.
  - The entry being written is never evicted.
  - Evict and retry, and a dropped write that does not throw.

## Implementation Review (Post-Implementation)

`git diff --stat ec984fe 1ab3b96`, production paths: 10 files, +168/−30.
- **New**: `messageDrafts.ts` (+94) and `leaveWithoutAlert.ts` (+17).
- **Changed**: `withLocalStorage.ts` (+8), `MessageProvider/index.tsx` (+59 lines changed), `SessionProvider.tsx`,
  `NavMenu.tsx`, `edit/page.tsx`, `useUnloadAlert.ts`, `useLocalStorage.ts` (−3) and `global.d.ts` (+4).

**TDD compliance gate.** The table is present. The first row of each new module is its compile-time red, and that is
the only compile-time row per file. Every other row is an assertion red or a named one-guard mutant. Rows written after
the code are marked "No" and closed by a mutant red. The gate passes.

**Time-based cells.** Fake timers are used in four files (`vi.useFakeTimers`), and none waits on the wall clock.
`audit-predicates.out` counts `new Promise(…setTimeout`, `waitFor(` and `sleep(` over the 12 test files M3's range adds or
modifies: 0 in each. So no cell is time-based (GLOSSARY: "spends real wall-clock time waiting").

**Conventions** (`audit-predicates.out`):
- 12 of 12 basenames have the positive form;
- 0 ID tokens in titles and comments;
- 0 source-text reads.

## Test Execution Results

Export `$SCRATCH/exp-1ab3b96`:
- built with `git archive`;
- `node_modules` linked to the shared install, held;
- no `.env*` file;
- generated type inputs hashed (`typecheck-generated-inputs.sha256`);
- every run with `unshare -rn`.

Captures are in `verification/017/qa-m3/`.

| Command | Result | Capture |
|---|---|---|
| `npx vitest run --reporter=json` | 1620 of 1620, 133 files, `success` true, **exit 0** | `vitest-1ab3b96.*` |
| `pnpm run typecheck` | **exit 0** | `typecheck-1ab3b96.*` |
| `suite-compare.mjs`, QA's `dd26104` run against this run | 1606 → 1620. Four tip-only files: `NavMenu.sign-in-and-out`, `page.sign-in-exit`, `SessionProvider.stale-cookie-sign-out`, `withLocalStorage.server-render`. `stored-draft` 25 → 29 (4 added). `bound-and-recency` 22 → 23: one title replaced by its "whatever order they were written in" form, plus the boundary pair. No other removal. | `compare-qadd26104-vs-qa1ab3b96.out` |
| E-7 sweep (below) | 73 of 78 detected | `m3-mutants-qa.json`, `m3-run/` |
| M3-f revert check (below) | positive and control both as predicted | `m3f-revert/` |

**The E-7 sweep: seeding.** E-7 is the users' browser-storage rewrite; its guards are the migration, the other keys'
form, the bound and the quota path. The sweep covered M3's production diff, `git diff ec984fe..1ab3b96` over non-test
paths: the 10 files above. The milestone base is `ec984fe`, because the M2 fix commits `442059d`, `bce3119` and `dd26104`
are test-only.

The set is `mutant-gen.js --range ec984fe..1ab3b96`, 73 mutants over the range's added lines, plus 6 of QA's for the
migration's and copy-in's class members:
- `qa-migration-id-ignored`: an id-ful legacy store becomes this tab's route-0 entry;
- `qa-migration-always`: the migration runs even when the drafts map exists;
- `qa-legacy-write-dropped`: M3-f's own named mutation;
- `qa-legacy-removed-unconditionally`;
- `qa-copy-in-not-persisted`;
- `qa-copy-in-from-saved-message`: a new tab copies a saved message's entry into route 0.

The suite was the six test directories that import any M3 surface. The selection predicate:
`git grep -l -E "withLocalStorage|useLocalStorage|messageDrafts|useUnloadAlert|leaveWithoutAlert"` under `__tests__`,
together with every directory the range adds a test to. These give the same six. Control: 954 tests.

**The E-7 sweep: result.** `mutation-run.py` (blob `b26916e`), a fresh export per mutant, mutants file blob `d3871e4`:
- **69 KILLED, count-checked.**
- **4 KILLED by the 240 s timeout**: `messageDrafts.ts:38:walk-last`, `:40:num`, `:46:&&` and `:46:>`. Each turns the
  eviction loop into a hang, and a timeout counts as a kill.
- **1 ABORTED**: `messageDrafts.ts:50:if-false`. Removing `if (oldest === undefined) return false` makes the refused-write
  loop spin with nothing to evict, and the run died with "JavaScript heap out of memory" (`grep -c`: 1 in `mutant-50.stderr`),
  with 954 tests started. That is a detection by crash, though not a scored kill. The guard's assertion form is the case "a
  write the browser refuses drops the write, without throwing, once no other entry remains to drop", which reaches the loop.
- **5 SURVIVED**, the same five the implementer dispositioned as equivalent, each re-judged here:
  - `leaveWithoutAlert.ts:1:num` (2000 → 2001 ms): no criterion fixes the window's length. M3-d and D-18 state an act
    that re-arms, and both the re-arm and the failure path are asserted. Equivalent under the criterion.
  - `messageDrafts.ts:19:num:2` and `:num:3`: the tab id's `slice` bounds. The id is an opaque key whose contract (stable in
    a tab, distinct across tabs) is asserted. Equivalent.
  - `withLocalStorage.ts:13:if-false`: with no `window`, `setItem` throws a `ReferenceError` that the `catch` turns into the
    same `false`. Equivalent by construction.
  - `withLocalStorage.ts:19:true` (`bubbles`): the event is dispatched on `window`, which is its own target, so there is
    nothing for it to bubble to. Equivalent.

**Score:** 73 of 78 scored mutants killed, in the set above with the 1 aborted excluded; the residual is 5 equivalents.
QA's 6 class mutants were all killed and count-checked:
- `qa-migration-id-ignored`, 2 cases;
- `qa-migration-always`, 17;
- `qa-legacy-write-dropped`, 3;
- `qa-legacy-removed-unconditionally`, 1;
- `qa-copy-in-not-persisted`, 1;
- `qa-copy-in-from-saved-message`, 3.

**M3-f revert check, re-run by this pass.**
1. The implementer's committed tip writer, `impl/m3/legacy-capture.tip.test.tsx` (agent-output `6f68667`), ran in the
   `1ab3b96` export: exit 0, string at `m3f-revert/legacy-string-qa-1ab3b96.json`.
   - Its keys are `data`, `name` and `updatedAt`, with no `id`.
   - It equals the implementer's capture except for the embed's random `_key`.
2. The committed old reader, `impl/m3/old-reader.route-zero-legacy.probe.test.tsx`, then ran in a fresh `git archive
   1ad625e` export:
   - on this pass's string: **exit 0** (the draft is shown);
   - on the planted control, the same string with an `id` added, which the old code routes to the intro message:
     **exit 1**.

   The positive control is QA's own, not the implementer's.

## Findings

None. CR-8 (the fetch path removes Sn, against the matrix's "nothing written") is the code review's, recorded for the
planner. Its outcome equals the base, and no M3 criterion reads it.

## Verdict

**PASS. M3 is `QA Complete` at website `1ab3b96`**, milestone-scoped:
- every member of M3-a to M3-h is dispositioned above;
- the bounded E-7 sweep is complete, with every survivor dispositioned as equivalent;
- M3-f has been shown against the old code's reader, with a planted control.

Any later production change to M3's ten files expires this verdict. The effort-final sweep stays owed over
`git diff 1ad625e..<tip>`. Rows inherited and not discharged: B-1 to B-11; B-2 and B-9 are M3's.

## Assumption Not Checked

This pass assumes that a real browser delivers the native `storage` event to the **other** tabs after a write. The suite
asserts only the synthetic `Event('storage')` that `withLocalStorage.set` dispatches in the writing tab (M3-g's "updates the
other tabs as today"), and does not test the native delivery. jsdom is one window. If the assumption is false, a theme or
preference change in one tab no longer reaches the others. M3 did not change that path, but it now depends on it for
`messageDrafts` too. Signature: in B-2's walk, a draft typed in tab A is not offered to a new tab B, or a theme switch in A
does not repaint B. Owner: UAT at B-2, on a real browser.

Code review round 3's Assumption Not Checked (sessionStorage keeps the tab id across the Discord OAuth round trip) is
UAT's at B-2, as routed.

## Handoff

- **UAT**: M3 is ready for B-2 once the chain reaches UAT.
- **Code reviewer and implementer**: nothing owed for M3.
