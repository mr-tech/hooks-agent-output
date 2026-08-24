---
UUID: 35274074
Status: Open
Status-Detail: >-
  A pre-existing data-loss gap in `website`: every unsaved-changes guard in the message editor is gated
  on the user being authenticated, so for an unauthenticated user they are inert — one of them
  skips its confirmation dialog entirely and reloads. A fourth guard listed here is a SEPARATE defect
  that has never worked for anyone, and the predicate fix does not close it. Found by `code-reviewer-hooks-013-3` while
  breaking its own predicate during chain 013 round 12, in code chain 013 never touched. Written as a
  handoff on the owner's standing disposition for this class; nothing is built and no chain is minted.
Owning-Stage: >-
  Unassigned. The next step is one measurement and then implementation: the severity turns entirely on
  whether an unauthenticated user can reach meaningful unsaved edits, which is UNMEASURED. Chain 013
  proceeds without this and does not touch it.
Review-Trigger: >-
  Re-read this before anyone changes `hasChanged` in `MessageProvider`, changes what `enabled: false`
  means in `ConfirmationProvider`, adds a new consumer of `hasChanged`, or changes who may edit a
  message without signing in — that last one converts this from a latent gap into an active one.
---

# Handoff — every unsaved-change guard is disabled for unauthenticated users

**Raised:** 2026-08-24, by `code-reviewer-hooks-013-3`, during chain 013 round 12. It surfaced because
the reviewer refused to accept the implementer's class sweep and **broke the predicate instead** — the
sweep's `withConfirmation(` in `*.tsx` cannot see `showConfirmation(`, the call it wraps, nor anything
in a `.ts` file. Three reported sites were actually five.

**Written by:** `steering-hooks-013-2`. **On the owner's standing disposition for this class, not on a
fresh ruling for this item.** Asked on 2026-08-24 what to do with a materially identical finding — the
unauthenticated v1 endpoints, `8818bd89` — he answered `handoff`. This document applies that answer to
the same shape: pre-existing, outside every milestone, found by a reviewer's adversarial round, needing
an owner decision rather than a chain fix. **If he wants this one handled differently, this document is
the thing to change, and nothing has been built on it.**

**Provenance.** The two dependents in items 1 and 2 below are the reviewer's, evidenced by execution at
`verification/013/probe-cr13-overwrite-closure/` (16/16). **Items 3 and 4 were added by this thread**,
found by sweeping `hasChanged`'s consumers while verifying the reviewer's claim. **Item 4's original
analysis here was wrong** — it is not a consequence of `hasChanged` at all — and was corrected in place by
the reviewer at `975bfa6`; the correction is stated in item 4 rather than appended, so no reader meets the
superseded version alone.

## The predicate

`src/providers/MessageProvider/index.tsx:104`, read first-hand at `7890fc9`:

```
const hasChanged = useMemo(
  () => status === 'authenticated' && !typedDeepEqual(savedMessage?.data, message?.data),
  [message?.data, savedMessage],
);
```

**It is gated on the session, not on the data.** For an unauthenticated user it is `false` however much
they have edited. It is not a stale-value bug and not a race; it is what the expression says.

## What that disables — four consumers, not one

**1. The cross-tab reload prompt loses its warning clause.** `usePusher.ts:48` builds
`` `…Would you like to reload it?${hasChanged ? ' Any changes you have made will be lost.' : ''}` ``.
The prompt still appears; it just stops saying that reloading destroys work. *(Reviewer's.)*

**2. The Reload confirmation is skipped entirely — this is the severe one.** `Navigation.tsx:162`
passes `enabled: hasChanged`, and `ConfirmationProvider.tsx:50` reads:

```
if (!options.enabled) {
  void options.onConfirm();
} else {
```

So `enabled: false` does not mean "no dialog needed"; it means **run the confirmed action immediately**.
`reloadMessage` executes with no prompt at all. *(Reviewer's.)*

**3. The browser's own unsaved-changes warning is disabled.** `edit/page.tsx:100` calls
`useUnloadAlert(hasChanged)`, whose body is `useBeforeUnload(block, 'Changes you made may not be
saved.')`. With `block` false, closing or refreshing the tab warns about nothing. *(This thread's.)*

**4. In-app navigation away is unguarded — AND THIS IS A SEPARATE DEFECT WITH A SEPARATE FIX.** The same
hook registers a `beforeHistoryChange` handler that calls `window.confirm` `if (block && …)`. This
document originally listed it as a fourth consequence of `hasChanged`. **That was wrong**, and
`code-reviewer-hooks-013-3` corrected it structurally (`verification/013/probe-cr15-unload-guard/`,
exit 0, `975bfa6`): `Router.events` is the **Pages Router** event bus, and

- `src/pages` holds **8 entries, all 8 under `api/`** — there is no Pages Router *page* to emit into it;
- `useUnloadAlert` has exactly **one** caller, and it is an **App Router** page;
- the App Router navigation module contains **zero** occurrences of `events` — that API has no event bus.

**So this handler can never fire, for any user, authenticated or not.** It fails silently because
`.events` is a passthrough to a *static* bus and `.on()` never calls `getRouter()`, so registering with
no Pages Router mounted throws nothing and warns nothing. That is why it has stood.

**READ THIS BEFORE FIXING ANYTHING HERE: correcting `hasChanged` closes items 1, 2 and 3 and LEAVES ITEM
4 BROKEN WHILE MAKING THE DOCUMENT READ AS FULLY DISCHARGED.** Two defects, one fix each. Item 4's fix is
an App Router navigation guard, not a change to the predicate.

**The pattern worth carrying**: one session-gated boolean is the sole guard on three independent loss
paths, a fourth guard has never worked at all, and **the failure is silent in all four**. Nothing logs,
nothing warns, and the user's experience is simply that their work vanished.

## What is NOT established — and it decides the severity

**Whether an unauthenticated user can reach meaningful unsaved edits on a message at all.** The reviewer
stated this as unmeasured and declined to guess; so does this document. Settling it needs the app stood
up, and the reviewer deliberately did not do that here because **the trigger for standing an instance up
is M8-G, not this**. If unauthenticated editing is impossible or trivial, this is latent and cheap. If it
is a real flow, item 2 destroys work with no prompt.

**For item 4 specifically, and it must be settled BEFORE the fix rather than after**: nobody has stood the
app up and navigated. The falsity signature is **one manual in-app navigation with unsaved edits producing
a `window.confirm`** — which on the account above is impossible. If it does appear, item 4's analysis is
wrong and only item 4's.

**Also unestablished**: whether `status === 'authenticated'` was written to mean "only signed-in users can
have unsaved work" — in which case the defect is that three of these four consumers were never told — or
whether it is simply a mistaken conjunct. Nobody has looked for the intent.

## Why this is not a chain 013 finding

Untouched by chain 013 and outside every milestone in the plan. The reviewer found it while attacking a
finding that *was* in scope, and correctly kept it out of the verdict: reject authority covers the work
under review. It also **did not author this handoff**, on the ground that `handoff/` is not its role's to
write and that after the round-9 routing correction it would not guess again about what it may register.
That restraint is the reason this document exists at the right address instead of the wrong one.

## Fix shape — not prescribed, but the trap is

The narrow fix for items 1–3 is to drop the `status === 'authenticated' &&` conjunct. **Item 4 is not
fixed by that and needs its own change** — an App Router navigation guard replacing a Pages Router
listener that cannot fire.

**Two traps, and both are of the same kind — a fix that looks complete and is not.** Item 2: anything
leaving `enabled` false continues to mean *proceed without asking*, so correcting only item 1's warning
text leaves the destructive path untouched. Item 4: correcting the predicate makes all four entries read
as addressed while one is still dead. As with the endpoints handoff, **verify by executing the flows
unauthenticated, not by reading the diff** — and for item 4, by navigating.

Worth considering alongside it: `enabled: false` meaning "run it immediately" is a sharp default for a
component named `ConfirmationProvider`, and it is what converts a wrong boolean into data loss rather
than into a redundant prompt.

## Sources

- `agent-output` round 13 review and `verification/013/probe-cr13-overwrite-closure/` (16/16) — the
  reviewer's executed evidence for items 1 and 2, and for the predicate-sweep failure that found them.
- `website` at `7890fc9` — `MessageProvider/index.tsx:104`, `usePusher.ts:48`, `Navigation.tsx:162`,
  `ConfirmationProvider.tsx:50`, `edit/page.tsx:100`, `utils/hooks/useUnloadAlert.ts`. All read
  first-hand by the author of this document.
- `handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md` (`8818bd89`) — the same class,
  and the owner ruling this document is written under.
