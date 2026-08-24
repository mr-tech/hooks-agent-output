# probe-cr15 — `useUnloadAlert`'s navigation guard is dead for **every** user

**Built at** `7890fc9`, during the round-13 follow-up, to check a claim that was about to travel into
a handoff document rather than to hold any tree. **It changes what that handoff's fix must be.**

```bash
agent-output/verification/013/probe-cr15-unload-guard/unload-guard.cr15.sh
```

**Result: exit 0**, all three structural premises hold (`run-cr15.txt`). Exits non-zero if any premise
stops holding, so it is safe to re-run rather than re-reason.

## The correction it carries

`steering-hooks-013-2`'s handoff (`35274074`) lists four consumers of `hasChanged` disabled for
unauthenticated users. Items 3 and 4 are both `edit/page.tsx:100` → `useUnloadAlert(hasChanged)`, and
**they are not the same kind of defect**:

| half of the hook | mechanism | gated on `hasChanged`? |
|---|---|---|
| `useBeforeUnload(block, …)` | the browser's **native** `beforeunload` — framework-independent | **Yes.** Genuinely disabled for unauthenticated users, exactly as the handoff says |
| `Router.events.on('beforeHistoryChange', …)` | the **Pages Router** event bus | **No — it can never fire at all** |

**Why the second can never fire**, established by the probe:

1. `src/pages` holds **8 entries, all 8 under `api/`** — there is no Pages Router *page* anywhere, so
   nothing ever emits into that bus.
2. `useUnloadAlert` has exactly **one** caller, and it is an **App Router** page.
3. The App Router navigation module contains **zero** occurrences of `events` — that API has no event
   bus at all.

And it fails **silently**: `next/dist/client/router.js` exposes `.events` as a passthrough to the
Pages Router's *static* bus, and `.on()` never calls `getRouter()`, so registering a handler with no
Pages Router mounted throws nothing and warns nothing. That is why it has gone unnoticed.

## Why this matters to whoever takes the handoff

**Fixing `hasChanged` restores the unload warning and does NOT restore the in-app navigation guard.**
A fix that changes only the predicate would close items 1, 2 and 3 and leave item 4 broken while
appearing addressed — and the handoff, as written, would read as fully discharged. **Two defects, one
fix each.**

## What this does NOT establish — read before citing it

- **The browser-level confirmation was not run.** The argument is structural: no emitter exists, and
  the App Router has no event bus. Standing the app up and navigating in-app with unsaved edits would
  confirm it directly, and that was not done. **Falsity signature**: an in-app navigation away from
  the editor with unsaved edits produces a `window.confirm`, which on this account is impossible.
  **Owner: whoever takes handoff `35274074`** — it is one manual navigation, and it should be done
  before the fix, not after.
- **It says nothing about whether `useBeforeUnload` actually fires**, only that its gate is
  framework-independent. Modern browsers ignore the custom string and some suppress the dialog
  without prior interaction.
- **It is scoped to this hook.** Any other Pages-Router-era API used from an App Router component
  would fail the same silent way and is not enumerated here.

## A shell hazard this probe hit, worth not rediscovering

`grep -c` **exits 1 on a count of zero**, so `navev=$(grep -c … || echo ERR)` overwrote a *correct*
`0` with `ERR` and failed the run. Capture the count and the exit status separately and only treat
`rc > 1` as an error. This is the same family as the RTK counting hazard already recorded in the
index: the instrument was wrong, not the tree.
