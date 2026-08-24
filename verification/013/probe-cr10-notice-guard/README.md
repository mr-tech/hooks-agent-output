# probe-cr10 — the round-9 MEDIUM-2 notice guard and MEDIUM-3 closure, at `82af843`

**Built at**: `82af843` (website, `chain/013-components-v2-editing-surfaces`).
**Built for**: attacking the transition guard added in the round-9 fix round, and giving the MEDIUM-3
closure a check that fails if the class returns.

The effect body's **control flow** is transcribed verbatim from `NewMessageJsonInput.tsx` at
`82af843`. Everything it calls — `discordMessageImportShape.parse`, `resolveContentLoss`,
`noticeMessageForSettled`, `applyDisposition` — is the **real function**. What is modelled is the
React control flow; what is executed is the guard.

Run:

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr10-notice-guard
rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules
npx vitest run --config vitest.cr10.config.ts
```

**Result at `82af843`: 12/12** (`run-cr10-82af843.txt`).

## The claim attacked

> *"The transition guard removes the **class** (repeat toasts on an unchanged notice), not just the
> frequency."* — implementer, fix-round message

**Falsified.** `attack-summary.txt`:

```
sequence                                    toasts   a correct guard would give
  10x identical row-D text                   1        1
  typing, all states valid                   1        1
  delete one char, retype it                 2        1
  add a second key (7 invalid intermediates) 2        1
  8 invalid->valid round trips               9        1
  excursion to row A and back                2        1
```

The guard holds while the document stays parseable **and** stays on one notice class. The `catch`
branch sets `lastNoticeClass = null`, so any unparseable intermediate re-arms the same notice.

**Two of those rows are not the same finding, and the review separates them.** The `catch`-branch
rows are the defect: an unparseable intermediate is a transient of typing, not a state the user
chose. The **row-A excursion is defensible** — the message genuinely stopped being a conflict and
became one again, so warning twice is arguable. Only the `catch` reset is raised.

## CR10-D — the MEDIUM-3 closure check

Transcribes `cancelChoice` / `reopenChoice` and the `setDismissedChoice(null)` at the top of the
effect, and asserts: after Cancel there **is** something to re-enter, `reopenChoice` restores the
same object rather than re-deriving it, and a dismissed choice does not outlive the text it was
resolved against. **Includes a control** reproducing the `ee3bc3e` `cancelChoice`, which leaves
nothing to re-enter — so the check discriminates rather than passing vacuously.

**This is the check that fails if MEDIUM-3's class returns.**

## Blind spots — stated at authoring time

- The React control flow is **transcribed, not rendered**. The repo has no DOM harness (no jsdom, no
  testing-library, zero `.tsx` tests in 28 test files), so nothing here mounts the component. A
  divergence between the transcription and the real render — a batching effect, an unexpected
  remount resetting the `useRef` — is outside it.
- `lastNoticeClassRef` is a `useRef`, which survives re-render but **not** remount. CR10 models it as
  surviving. If the component remounts mid-edit the real guard is weaker than modelled here, never
  stronger — so the toast counts above are a **lower bound**.
- CR10-D models the state machine only. It does not assert the Resolve button is reachable, styled,
  or labelled — that is render, and unreachable from here.
