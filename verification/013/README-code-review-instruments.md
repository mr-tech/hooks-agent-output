# Code-review instruments for chain 013

**Owner**: the code-reviewer role. Separate from `README.md` in this directory, which is **QA's**
document and indexes QA's instruments — this file is not an edit to it.

Every instrument below is **current** unless marked otherwise, and each names the tree it was built
against. An instrument's validity is indexed to **the claim it was built for**, not to the tree: if
the question changes, rebuild rather than re-run.

| Directory | Built at | Answers | Still current? |
|---|---|---|---|
| `probe-cr1-hash-producer-consumer/` | `a4eb00d`, rewired at `495463a` | M1-d's final clause: does the hash producer agree with its consumer across the transport form? | Yes for M1. Round-1 form hardcoded the old consumer and was rewired to read the tree under test — **use the rewired form only** |
| `probe-cr2-m1bc-extraction-equivalence/` | `495463a` | M1-b/c's extraction is byte-equivalent over 26 rows | Yes for M1 |
| `probe-cr3-mode-predicate/` | `18407d8` | M7's mode predicate over the whole 36-cell (flag × structure) partition, 122 assertions, 3 mutants | **Yes — and load-bearing, see the pairing below** |
| `probe-cr4-disposition-gate/` | `92ce026` | D17's eight-cell disposition, executed against the **plan's** table; 4 mutants; gate re-derivations | Superseded in part by CR5 — the signature changed at `2f49182` (`flagBit: boolean` → `flags: number`), so **CR4's boolean call shape now under-reads**. Kept for the record; use CR5 |
| `probe-cr5-application-half/` | `0c8fad5` | the application half (`applyDisposition`), the throw guard re-attacked, the vacuity control, and the `utils` ↔ `messageMode` import cycle in both module orders | **Superseded in part by CR6.** CR5-B/C/D (3 of 19) now fail — **all three by instrument expiry, none by defect**: they were built for the 3-parameter signature and the constant `dropSet`, both removed at `52e0e8a`. Their failure *is* the fix working. CR5-A and the two cycle probes remain valid and pass |
| `probe-cr6-derivation-round/` | `816d7fd` | the round-5 fix round: both closures verified over an **exhaustive 1120-draft corpus** with an independent oracle and a mutant control; purity under frozen inputs; the `chosenOption` residual; the key-granularity bound | **Yes — current for EC-3** |
| `baseline-expected-six/` | pinned at `92ce026` | the suite's failure **set**, by identity and reason, via a clean `git archive` extraction | **Yes — run every round** |

## The pairing — do not run one without the other

`baseline-expected-six/check-expected-six.sh <sha>` and `probe-cr3-mode-predicate/` are a **pair**,
and a judgement outside this thread depends on both being run each round.

The suite cannot go green until QA re-anchors `012-message-mode.test.ts` at Phase 2 — five
milestones away. During that window the only signal that a milestone introduced no regression is
that the reds are *the same* reds. The comparator keys on `file :: test :: first reason line`, so
**a new defect that reproduces an existing red exactly is invisible to it** — live here, because any
future defect leaving the V2 flag set yields `012-message-mode.test.ts`'s identical
`expected 32768 to be +0`.

`probe-cr3-mode-predicate/` closes that hole: it covers `isMessageV2` / `switchToV2` /
`applyModeSwitch` behaviourally and keys on **nothing in the suite output**.

Steering was told, and is carrying, a judgement **conditional on this pairing** — that an
out-of-phase QA re-anchor was not worth putting to the owner *because* both run each round. **If the
mode-predicate probe stops being run, that judgement lapses**, and whoever notices should say so
rather than let it hold silently.

## Running any of them

Each directory has its own vitest config and needs `node_modules` symlinked to the website's:

```
ln -sfn /usr/local/bin/hooks/website/node_modules <dir>/node_modules
cd <dir> && npx vitest run --config <the config in that dir>
```

`check-expected-six.sh` needs no symlink — it builds its own extraction.

## Two rig failures worth not rediscovering

Recorded in `probe-cr4-disposition-gate/gates/README.md`, because both produce a red result that has
nothing to do with the code:

1. **Turbopack rejects a `node_modules` symlink pointing out of the filesystem root** — FATAL panic on
   `next build`. Vitest is unaffected. Use `cp -al` (hardlinks) for build runs.
2. **`.env` and `next-env.d.ts` are gitignored**, so a `git archive` extraction has neither. `tsc`
   reports a spurious `TS2307` on a `.png` import without the latter; `next build` fails prerendering
   `/legal/*` without the former. Copy `next-env.d.ts` in; supply **dummy** env values on the command
   line rather than copying the real secrets file.

## Three more rig failures, added round 6

All three produce a red or absent result that has nothing to do with the code under review.

3. **A probe directory's `node_modules` can degenerate from a symlink into a real directory.**
   `probe-cr3-mode-predicate/` was found this way — a real directory holding only a `.vite` cache.
   `npx` then fetched vitest from the network and failed at config load with
   `Error: Cannot find module 'vitest/config'`, exit 1, no tests run. Given CR3 is half of the
   pairing below, that reads as "the probe fails at this tree" and is consequential.
   **`ln -sfn <target> node_modules` does not repair it** — when `node_modules` exists as a
   directory, `ln` creates the link *inside* it. Use
   `rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules`, and
   confirm with `ls node_modules/vitest` before trusting any run.
4. **`eslint` cannot run from a `git archive` extraction with a symlinked `node_modules`** — exit 2,
   `ESLint couldn't determine the plugin "react" uniquely`, two `eslint-plugin-react` versions
   visible through the pnpm store. Answer lint-provenance questions from the real tree plus
   `git show`, not from an extraction.
5. **`next build` in an extraction needs more dummy env than item 2 lists.** Also required:
   `PREVIEW_IMAGE_API_KEY`, `PREVIEW_IMAGE_URL`, `NEXT_PUBLIC_PUSHER_KEY`,
   `NEXT_PUBLIC_PUSHER_CLUSTER`, `PUSHER_APP_ID`, `PUSHER_SECRET`, `ENCRYPTION_IV`,
   `HOOKS_API_TOKEN`. Compilation completes **before** env validation runs, so
   `✓ Compiled successfully` — which is the part carrying typecheck and bundling — is obtainable
   even when prerendering then fails on `Invalid environment variables`. Say which stage was
   reached rather than claiming a clean build.

## One method note that is not a rig failure

**An equality check between two derived artifacts needs a positive control, on that run.** Round 6
compared emitted JavaScript at two commits to test a decision-neutrality claim; the first run
reported IDENTICAL for every pair because `esbuild` had rejected its arguments and written zero
bytes, and four empty files compare equal. The sha256 was `e3b0c44298fc…` — the empty string — which
is what made it visible. Requiring the comparator to report DIFFER on a copy with one token changed
is what makes an IDENTICAL result mean anything. A control tests the comparator; a mutant tests the
code. Both are needed.
