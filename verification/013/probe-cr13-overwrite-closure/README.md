# probe-cr13 — round-12 HIGH-1 closure, and the class sweep re-run, at `7890fc9`

**Built at**: `7890fc9`. Two jobs: confirm the overwrite sentence is now unconditional, and re-run
the confirmation-message class sweep with a predicate broader than the one the fix round used.

Run:

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr13-overwrite-closure
rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules
npx vitest run --config vitest.cr13.config.ts
```

**Result at `7890fc9`: 16/16** (`run-cr13-7890fc9.txt`, tables in `closure-and-sweep.txt`).

## CR13-A — the closure

`describeLoadDiff` and `computeLoadDiff` are **imported**, not transcribed, so this block reads the
tree and fails if the fix is reverted. All eight round-12 paths now state the overwrite; the diff
clauses are still correct where a diff exists; and an **exhaustive sweep of the 18-cell diff space**
(removed × added × modeChanges) confirms no input yields a body without the sentence.

**Control**: the `299b842` body transcribed verbatim **fails** the same assertion on the no-diff
paths — so a pass here is a measurement, not a vacuous one.

## CR13-B — the class sweep, broadened

The fix round swept `withConfirmation(` in `*.tsx` → 3 sites. That predicate cannot see
`showConfirmation(` (the call `withConfirmation` wraps) nor anything in a `.ts` file. Broadened, there
are **five**:

```
  JsonModalBody.tsx:215        withConfirmation   FIXED this round
  Navigation.tsx:132 (Clear)   withConfirmation   static string, not a member
  Navigation.tsx:161 (Reload)  withConfirmation   MEMBER (via enabled: hasChanged)
  DiscordMessageEditor:228     showConfirmation   MISSED; computed, but both branches
                                                  assert loss -> NOT a member
  usePusher.ts:43              showConfirmation   MISSED (.ts file); MEMBER
```

Root cause of both members: `hasChanged` is `status === 'authenticated' && !typedDeepEqual(…)`, so it
is **false for an unauthenticated user however much they have edited**. CR13-B executes that with the
real `typedDeepEqual`, then drives both dependents:

- `usePusher`'s cross-tab prompt **omits its data-loss clause**;
- `Navigation`'s Reload passes `enabled: hasChanged`, and the provider's
  `if (!options.enabled) { void options.onConfirm(); }` means the dialog is **skipped entirely** and
  the destructive action runs immediately.

**Pre-existing, untouched by chain 013, routed to steering as a handoff candidate — not fixed here.**

## Blind spots — stated at authoring time

- CR13-B **transcribes** `hasChanged`, the `usePusher` template string, and the provider's
  `enabled` branch (only `typedDeepEqual` is imported). It establishes what those expressions do, not
  that they are still in the tree; that is the `git show` at `7890fc9` cited in round 13.
- The sweep is complete over `withConfirmation` / `showConfirmation`. **`src/components/WarningDialog.tsx`
  is NOT swept** — it takes its own `message: string` and is not routed through `ConfirmationProvider`.
  Round 13's Assumption Not Checked, routed to QA.
- Whether an unauthenticated user can reach meaningful unsaved edits on a Pusher-subscribed message is
  **not established here** — it needs the app stood up, and is stated as unmeasured rather than asserted.
