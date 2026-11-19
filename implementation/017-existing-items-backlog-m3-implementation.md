---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Handoff-At: not yet made
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

Everything: the milestone is not yet built.

## Next Steps

Slice order: (1) shared quota behaviour (M3-g, M3-h/OQ-12); (2) the draft rules module (M3-h bound, M3-c rule,
M3-e migration, M3-f legacy write); (3) provider wiring (M3-a, M3-b, M3-c, M3-e, M3-f); (4) `hasChanged` and the
D-18 suppression (M3-d, NM-7, NM-27, NM-28).
