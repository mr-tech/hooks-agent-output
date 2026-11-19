---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: 536b8e6 — repos=website; M3 built, sweep dispositions and hand-off owed, not yet handed to code review
---

# Implementation 017 — M3: a stored draft survives sign-in, another tab and an expired-session sign-out (item 4, D-11)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 4, milestone M3 (M3-a to M3-h). Website chain
branch `chain/017-existing-items-backlog`; M2 is `ec984fe` (`implementation/017-existing-items-backlog-m2-implementation.md`).

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T01:12 | implementer-hooks-017 | Document opened with the design read from the plan and the flows below; no code yet. |

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | `steering/017-rulings.md` block 2026-11-19T00:29Z; M3 follows M2 in the plan's order | not owed |
| QA Phase 1 covering M3 | `qa/017-existing-items-backlog-qa.md` at `3af80aa`, § M3, QAF-6, NM-6, NM-7, NM-27, NM-28 | not owed |
| Open questions | none open that M3 depends on: OQ-8 (D-18), OQ-11 (D-22), OQ-12 (D-23), D-25 are answered | not owed |
| Flows holding a decision | none: each flow below is covered by a recorded decision, so no ask goes to `steering-roadmap` | not owed |

## User-visible flows (derived from the codebase, no ask owed)

M3 touches user-visible surfaces (the editor's restore of a draft; the browser's unload prompt). Every behaviour is
stated by the plan and decided: D-11 (fix at source, warnings on signed out), D-18 (sign-in exits and the expired-session
sign-out leave without the prompt), D-22/D-23 (bound and quota), D-25 (two tabs on one message share a draft).
No new view, input or trigger exists; no flow holds an undecided choice.

| Flow | Surface | Trigger | What happens next | Rung of the pattern ladder |
|---|---|---|---|---|
| Draft restored after sign-in | `/message/m/0/edit` editor | the user returns to route 0 after OAuth | the tab's own route-0 draft shows | rung 1: the route-0 effect already restores a stored draft; extended per tab |
| Unsaved edits on a saved message survive sign-out | `/message/m/<n>/edit` | session lost, redirect to route 0, sign in, open *n* | the editor shows the unsaved edits, as a reload does | rung 1: `getMessage`'s newer-local preference, now per message |
| New tab at route 0 | `/message/m/0/edit` | a tab opened with no draft of its own | the most recently edited route-0 draft is copied in and shown | none exists for per-tab drafts: the plan states the rule |
| Browser prompt on close/reload, signed out | the page unload | `hasChanged` true | "Changes you made may not be saved." | rung 1: `useUnloadAlert`, unchanged for signed in |
| Sign-in exits leave without the prompt | `InfoPanel` Log in, `NavMenu` sign-in, `SessionProvider` sign-out | the act | no prompt (D-18) | none exists; one act-keyed suppression (NM-27, NM-28) |

## Design read at `ec984fe` (to be refined as built)

- `withLocalStorage.set` returns whether the write landed and no longer throws on a refused `setItem`; no `storage`
  event on a refusal. `useLocalStorage` gains a `get` that reads at call time and `set` returns that result.
- New `LocalStorage.messageDrafts`: map of entry key (`0:<tab id>` or message id) to `{ data, name, editedAt }`.
  A new module `src/utils/messageDrafts.ts` holds the pure draft rules (bound, evict-and-retry, most-recent,
  migration, tab id) over a `{ get, set }` store, so they are tested without a DOM.
- `MessageProvider` index: loads (route-0 effect, fetch effect, share code) are not edits and write no draft
  except the share code and the copy-in at route 0; the `message` effect writes only for an edit.
- `hasChanged` loses its session condition (M3-d); the suppression for the D-18 exits is keyed on the act.

## Outstanding Items

M3 is built (slices 1 to 4); what is owed is in the Resumption State.

## Next Steps

Slice order: (1) shared quota behaviour (M3-g, M3-h/OQ-12); (2) the draft rules module (M3-h bound, M3-c rule,
M3-e migration, M3-f legacy write); (3) provider wiring (M3-a, M3-b, M3-c, M3-e, M3-f); (4) `hasChanged` and the
D-18 suppression (M3-d, NM-7, NM-27, NM-28).

## Resumption State

Written 2026-11-19T01:46Z at the M3 seam after the M2 fix round (context past 225K, checkpoint). Website branch
`chain/017-existing-items-backlog`, HEAD `dd26104` (M3: `d9ebe97` storage + draft rules, the
provider wiring commit, `536b8e6` the unload suppression; M2 fix round `442059d`, `bce3119`, `dd26104`). Tree clean apart from
the held `.playwright-mcp/`. Record: M2 document and `verification/017/impl/{m2,m3}/` committed at `e088937`.

- Built and green (full suite at `536b8e6`: 1604 of 1604, 128 files, exit 0, `m3/vitest-m3-536b8e6.*`; at `dd26104`: 1606 of 1606,
  129 files, exit 0, typecheck 0, `m2/vitest-m2-dd26104.*`): M3-a, M3-b, M3-c, M3-d (hasChanged without session; D-18 suppression via
  `src/utils/leaveWithoutAlert.ts`), M3-e, M3-f, M3-g, M3-h. New tests: `utils/__tests__/withLocalStorage.stored-keys.test.tsx` (9),
  `utils/__tests__/messageDrafts.bound-and-recency.test.tsx` (22), `providers/MessageProvider/__tests__/MessageProvider.stored-draft.test.tsx`
  (25), `utils/hooks/__tests__/useUnloadAlert.act-suppression.test.tsx` (6). Shared mock `buildApiMock` now runs the latest mutation options
  (react-query behaviour); `own-save-notice` and `save-step` test helpers adjusted (onSuccess gets variables; storage cleared).
  Red runs captured: `m3/red-quota.out`, `m3/red-drafts.out`, `m3/red-provider.json` (8 of 25 red, assertion level), `m3/red-unload.out`.
- Self-check sweep over `ec984fe..536b8e6` (`m3/536b8e6-mutants-gen.json`, `m3/536b8e6-sweep.out`): 58 of 72 killed; 14 SURVIVORS to
  disposition, none yet: `index.tsx:41:>` (getMessage `editedAt > updatedAt` boundary: needs an equal-timestamp case), `index.tsx:174:if-false`,
  `SessionProvider.tsx:15` x3 (no test mounts SessionWrapper; needs a case: stale cookie and no session signs out through `leaveWithoutAlert`),
  `leaveWithoutAlert.ts:1:num` (re-arm delay 2000: equivalent unless a case pins a lower bound), `messageDrafts.ts:19:num:2/3` (random id
  slice/radix, likely equivalent), `:38:walk-first`, `:45:>` (size bound boundary), `:67:walk-last`, `withLocalStorage.ts:13:if-false/false` and
  `:19:true` (the SSR `typeof window` branches; likely unreachable in the DOM env, name the equivalence). Close each with a spec-form case in
  the existing file or a stated equivalence, re-run those mutants, record in the Test Execution Results.
- Owed before hand-off of M3: (1) the survivor dispositions above; (2) QA's hand-made named mutants against the built code: NM-6 (re-encode
  other keys; killed by `withLocalStorage.stored-keys` bare-theme case, to run), NM-7 (`hasChanged` keeps a `loading` condition; the 3x2 cases),
  NM-27 (suppression keyed on NavMenu's button so Log out is also silenced: no test mounts `NavMenu`; either add one or record it unplaced with the
  reason), NM-28 (flag left lowered when sign-in does not leave: killed by the re-arm case, to run); (3) `convention-check.js website
  --since=1ad625e` with FAILs fixed or dispositioned (M1's 5 and the 42 in `useApiMethods.json-editor-repair.test.ts` are base, D-9);
  (4) full suite and typecheck at the final M3 tip; (5) Patterns Extended, TDD Compliance table (rows for the four new test files; the
  first row of each new module is the compile-time red, the rest need a mutant per row from the sweep), Files Modified/Created, Class Sweep
  (none owed first delivery), Test Execution Results, Outstanding Items; set `Handoff-At` to the final SHA and send the hand-off to
  `code-reviewer-hooks-017` (document path + SHA).
- Known design notes to record in Outstanding Items: the draft entry carries `data`, `name`, `editedAt` only (plan form), so a route-0 draft
  restored from the store no longer carries `guildId`/`recent*` ids the old single key kept for a share-code message; the draft hook is
  read through `withLocalStorage` directly (the `useLocalStorage` hook exposes no read-at-call-time), `useLocalMessageStore` was removed as
  unused; tab id in `sessionStorage` key `messageDraftTab` (plan deviation, stated in the plan); the creating-save removal uses the closure's
  `message`; the reload path removes the stored entry whenever the fetched copy is shown.
- Messages: M2 fix-round hand-backs sent to `qa-hooks-017` and `code-reviewer-hooks-017` (fix SHA `dd26104`); nothing awaited from me except their
  re-verdicts. M2 QA Phase 2 was FAILED at `ec984fe` (QAF-17) and the code review REJECTED (CR-5): both addressed by test-only commits.
- After M3: M4 (read plan M4 and QA § M4 first; user-visible: send `steering-roadmap` only flows holding a decision). After M4 tell
  `steering-roadmap` that M1 to M4 are through (devops probe push for OQ-7). M5/M6 wait on OQ-7 and gate M5-0; M7 last.
- Scratch to remove at run end under `/tmp/claude-1000/-usr-local-bin-hooks/1ac9ac0a-2ffc-413e-987e-ee1537f96eac/scratchpad/`: `clone-m2`
  (gone), `clone-m3`, `work-*`, mutants-*.json; older session scratch `/tmp/claude-1000/-usr-local-bin-hooks/4fc9969e-4c4a-48ea-8512-e0b69da51295/scratchpad/`
  (`base-limits.test.ts`, outputs). No process left running.
- Process facts for the final report: stamp-gate refusal (typed a future stamp on the M3 document; corrected from the clock; the M2 row too),
  record-write-gate refused a `sed -i` on a record document (re-issued with the Edit tool / `record-edit.js`; satisfied, not worked around).
- Cache-warm wake `253f9e74` deleted at this checkpoint; re-arm on the next briefed turn.
