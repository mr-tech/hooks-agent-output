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
PROBE_LABEL=a4eb00d npx vitest run --config <this dir>/vitest.config.ts
PROBE_SRC=/tmp/013-base/src PROBE_LABEL=c85945f npx vitest run --config <this dir>/vitest.config.ts
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
- **Normalisation forms other than `.trim()`.** The corpus was built from the shape's string leaves.
  Zod's unknown-key stripping, `z.preprocess` (present in `discordMessageImportShape`, not in the
  upsert path) and refinements are not exercised; the corpus would not see a divergence introduced
  by those.
- **The browser.** `usePusher`'s subscription, `hasChanged`, and the confirmation UI are asserted by
  reading, not by execution — the repo has no browser harness (plan assumption 5).
