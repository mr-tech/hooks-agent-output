# `probe-cr1-hash-producer-consumer/` — settles M1-d's final clause by execution

**Settles**: whether `hashMessage`'s **producer** (`upsertMessage`'s Pusher trigger,
`src/server/api/utils/shared.ts`) and its **consumer** (`usePusher`,
`src/providers/MessageProvider/usePusher.ts`) *"compute the same function over the same form"* —
plan 013, M1-d, final clause — and whether M1 changed that in either direction.

Authored by `code-reviewer-hooks-013` for the M1 review at `a4eb00d`. It is **not** an acceptance
spec and does not belong in `website`'s suite: it imports two trees at once and asserts a property
about the *pair* of live call sites, not about a module.

## What process produces the evidence

The product's own round trip. Every step is the shipped function imported from the tree under test —
`stripKeys`, `makeEditable`, `hashMessage` from `~/utils`, `optionalIdMessageShape` from
`~/server/api/utils/shapes`. Nothing is reimplemented. The probe asserts nothing about
`canonicalize`; it asserts the two live call sites agree.

- **Producer** = `optionalIdMessageShape.parse(payload)` → `hashMessage(parsed)`. The parse is not
  incidental: its output is byte-for-byte what is written to `Messages.data` *and* what is hashed
  and broadcast.
- **Consumer** = `hashMessage(stripKeys(messageRef.current))` over the composer's live state.

## Sequences

| Seq | Models | A mismatch means |
|---|---|---|
| **SEQ-A** | Steady state: the composer holds exactly what the server stored (`makeEditable(stored)`), nobody has typed, another tab saves. | A false *"Message Update Detected"* on a tab that is in sync. |
| **SEQ-B** | The saving tab: the user's own pre-save draft is still in `messageRef` when the broadcast for **their own save** arrives. `MessageProvider`'s `upsert.onSuccess` does `setSavedMessage(message)` — it never replaces the local draft with the server's parsed form — so this is a persistent state, not a race window. | A false *"…Any changes you have made will be lost"* fired at the user by their own save, repeating on every subsequent broadcast until they reload. |

**Positive controls** (`C1`, `C2`) must **mismatch**. Without them a green matrix cannot be
distinguished from a probe that imported nothing. `C2` (a genuine V2 component-body edit) is also
the independent confirmation that M1 fixed the defect it was written for: it reports
`EQUAL (control failed)` at `c85945f` and `mismatch (as required)` at `a4eb00d`.

## Running

```bash
cd /usr/local/bin/hooks/website
PROBE_LABEL=a4eb00d npx vitest run --config <this dir>/vitest.cr1.config.ts
PROBE_SRC=/tmp/013-base/src PROBE_LABEL=c85945f npx vitest run --config <this dir>/vitest.cr1.config.ts
```

`PROBE_SRC` selects the tree. The pre-M1 tree is materialised without touching the shared repo:
`git -C website archive c85945f | tar -x -C /tmp/013-base`, then symlink `website/node_modules`
into it. `git worktree` is deliberately avoided — the tree is shared.

## Captured runs

| File | Tree | Result |
|---|---|---|
| `run-a4eb00d.txt` | `a4eb00d` (M1) | SEQ-A all equal (14/14); **SEQ-B B1, B2, B3 MISMATCH**; both controls mismatch as required |
| `run-c85945f.txt` | `c85945f` (pre-M1) | SEQ-A all equal; **SEQ-B B1 MISMATCH only**; **control C2 EQUAL — the defect M1 fixes** |
| `run-m1spec-vs-c85945f.txt` | `c85945f` | the implementer's own M1 spec, 3 of 7 red — verifies the TDD table's red claim and names the 4 cases that were already green |

## Findings the runs establish

1. The producer/consumer clause is **false at `a4eb00d`**, by three concrete cases.
2. `B1` (classic `content`) is **pre-existing** — it mismatches at both trees.
3. `B2` (button `label`) and `B3` (a V2 accessory `url`) are **new at `a4eb00d`**: `components`
   entered the hashed form under M1, and the server's shape `.trim()`s five string leaves inside it
   (`linkButtonShape.label`, `linkButtonShape.url`, `thumbnailShape.media.url`,
   `mediaGalleryItemShape.media.url`, `fileShape.file.url`) that the consumer's `stripKeys` does not.
4. SEQ-A is clean at both trees, including the `A9`/`A10` shapes the plan names as existing today —
   because the only `id`-bearing writer (`useApiMethods.saveMessage`) applies `stripKeys` before the
   payload leaves the browser, so the stored row is a `stripKeys` fixed point at broadcast time.

## What the probe does NOT cover

- **Production incidence.** No database access; the probe establishes the mechanism and the reachable
  input class, never a rate. Any magnitude claim about how often users meet `B2`/`B3` is an
  unmeasured hypothesis.
- **Normalisation forms other than `.trim()`.** *Round 1 only.* The round-1 corpus was built from
  the shape's string leaves, so Zod's unknown-key stripping and its non-component `.trim()` leaves
  were invisible to it. Round 2 closed that gap with `D1`–`D6` and found the class was **wider than
  round 1 measured** (see below). `z.preprocess` (present in `discordMessageImportShape`, not in the
  upsert path) and refinements are still not exercised at either round.
- **The browser.** `usePusher`'s subscription, `hasChanged`, and the confirmation UI are asserted by
  reading, not by execution — the repo has no browser harness (plan assumption 5).


---

# Round 2 — re-attack at `495463a` (M1 fix round 1)

The round-1 instrument hardcoded `hashMessage(stripKeys(...))` as the consumer. That is no longer
the live call site: the fix introduced `normalizeForHash` in `usePusher.ts`. **A stale instrument
answers the old question**, so the consumer side was rewired to read the tree under test:

```ts
// Namespace import, not a named one: `normalizeForHash` does not exist on the pre-fix trees, and a
// missing NAMED export is a link-time error while a missing namespace member is just `undefined`.
// This keeps ONE instrument runnable against every tree.
import * as usePusherModule from '~/providers/MessageProvider/usePusher';
const CONSUMER_FORM = typeof usePusherModule.normalizeForHash === 'function'
  ? usePusherModule.normalizeForHash
  : (m) => stripKeys(m);
```

**The edit was validated before it was trusted**: re-running the amended instrument against
`a4eb00d` and `c85945f` reproduced the round-1 captures case-for-case. An instrument edit that
changed the old answers would have been a neutered instrument, not a fix.

## What round 2 added

| Cases | Probes |
|---|---|
| `D1`, `D2` | an unknown key inside a V2 component / at the top level of `data` — Zod **strips** it, `stripKeys` does not |
| `D3` | embed `title` whitespace |
| `D4` | embed field `name` / `value` whitespace |
| `D5` | `username` + `avatar_url` whitespace |
| `D6` | `textDisplay.content` whitespace — **negative space**: this leaf is *not* trimmed by the shape, so it must be equal on every tree; it fails the day someone adds `.trim()` there without touching the consumer |
| `C3`, `C4` | **false-negative controls**: a genuine, non-whitespace edit to a *trimmed* leaf (button label `B`→`B2`; embed title `T`→`T2`) must still mismatch. A normaliser that over-collapses would blind the detector, and no round-1 control could have seen that |
| `N1` | `name`-field whitespace parity — `normalizeForHash` parses `data` only. Green today **because `messageShape.name` carries no transform**; it goes red the day one is added |
| `F1` | an unparsable draft falls back to the `stripKeys` form rather than throwing inside the Pusher handler |

`afterAll` now writes the matrix to `$PROBE_OUT` — vitest's reporter does not surface `afterAll`
console output, so a matrix that only ever existed on a terminal was not a captured run.

## Captured runs (round 2)

| File | Tree | Result |
|---|---|---|
| `run-r2-495463a.txt` | `495463a` (fix) | **35/35 passed** — every SEQ-B case equal, all four controls mismatch, `N1`/`F1` green |
| `run-r2-a4eb00d.txt` | `a4eb00d` (M1) | 8 failed — `B1 B2 B3 D1 D2 D3 D4 D5` |
| `run-r2-c85945f.txt` | `c85945f` (pre-M1) | 6 failed — `B1 D3 D4 D5`; **controls `C2` and `C3` EQUAL (control failed)** |
| `run-r2-mutant.txt` | `495463a` with the `safeParse` normalisation removed | 8 failed — identical to `a4eb00d`, so the fix is load-bearing and the instrument kills its mutant |

## Findings round 2 establishes that round 1 could not

1. **The class was wider than round 1 measured.** `D3` (embed title), `D4` (embed field name/value)
   and `D5` (`username`/`avatar_url`) mismatch at **`c85945f` as well** — false-prompt sources that
   predate the chain entirely. The fix closes them too, so it repairs more than it was asked to.
   Round 1's corpus was drawn from component string leaves and structurally could not see them;
   that blind spot was declared when the corpus was authored, and this is what it was hiding.
2. **The fix does not blind the detector.** `C3`/`C4` confirm a genuine non-whitespace edit to a
   *trimmed* leaf still mismatches at `495463a`. This is the failure mode a normalising fix invites
   and the direction round 1 had no control for.
3. **The pre-M1 tree was worse in the dangerous direction.** At `c85945f` both `C2` (a genuine V2
   component-body edit) and `C3` (a genuine button-label edit) come out **EQUAL** — the tab is never
   told a real change landed, so it can silently overwrite it. That is a **false negative**, strictly
   worse than the false prompt M1 introduced, and M1 closed it.
4. **The mechanism, not just the outcome.** `normalizeForHash` applies the server's own shape, so it
   can only collapse distinctions the server itself collapses. Nothing that could persist is lost.
   That is the argument for accepting the fix; the green matrix is only its evidence.

## Mutation check — `mutation-check/`

`vitest.cr1-mutation.config.ts` runs the **implementer's own** three specs against an arbitrary tree
via `PROBE_SRC`, to answer whether their red was discriminating or merely an import-time
`TypeError`.

| File | Result |
|---|---|
| `run-implementer-specs-clean-495463a.txt` | 16/16 pass |
| `run-implementer-specs-mutant.txt` | 4 failed — the three hash-parity cases die on the `normalizeForHash` mutant, and the extraction case dies on the `saveAsPayload` mutant |

`013-m1-transport-form.test.ts` **survived both mutants** — confirming round 1's MEDIUM-1 diagnosis
that it did not constrain the extracted expressions.
