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
| `probe-cr6-derivation-round/` | `816d7fd` | the round-5 fix round: both closures verified over an **exhaustive 1120-draft corpus** with an independent oracle and a mutant control; purity under frozen inputs; the `chosenOption` residual; the key-granularity bound | **Current except CR6-C** (2 of 10), which is **instrument expiry, not defect**: the round-6 fix made the stale-label class unrepresentable, so the tests that expressed it cannot run. CR6-A/B/D/E still pass |
| `probe-cr8-deletion-coverage/` | `b3f8ea9` | what a test deletion costs: zero mutant detection lost; a 14-mutant dominance matrix over the `applyDisposition` block; and the one incidental assertion holding `switchToClassic`'s embed preservation | **Yes — current** |
| `probe-cr7-wiring-and-boundary/` | `87cfbd8` | the M2+M8 Load wiring and the persist boundary: the persist shape accepts six 5712 payloads (with a negative control); the top-level type complement; the surviving pre-parse silent strip; the re-attacked guard; **and the adversarial run — 42 raw-socket cases against `message.upsert`, 0 bypasses, plus the six that establish CRITICAL-1** | **Yes — current** |
| `probe-cr9-paste-surface/` | `ee3bc3e` | the paste surface: whether the disposition is taken on the object the user pasted. It is not — `filterSupportedComponents` (a `z.preprocess`) deletes V2 components before `resolveContentLoss` sees them, flipping row E to a settled row. Includes the child-type sweep, the empty-container case, an old-vs-new differential, and two comparator controls | **Yes — current**. 24/24; every test asserts behaviour that IS present, so a pass documents the defect |
| `probe-cr10-notice-guard/` | `82af843` | the round-9 MEDIUM-2 transition guard, **attacked**: six keystroke sequences over the real disposition pipeline with the effect's control flow transcribed; plus CR10-D, MEDIUM-3's closure check with a pre-fix control | **SUPERSEDED by CR11, and STALE BY CONSTRUCTION — do not cite it about any tree after `82af843`.** It **hardcodes** the pre-fix effect body rather than reading the tree, so it reported 12/12 at `54fed63` too, where the defect it demonstrates is fixed. Retained only as the record of what `82af843` did |
| `probe-cr11-guard-closure/` | `54fed63` | whether the round-10 MEDIUM-2 class is closed: one transcription parameterised by a single boolean (`clearOnCatch`), so the two columns differ only by the deleted line. Plus four suppression attacks and an explicit non-claim | **Yes — current**. 17/17. **Cannot establish the line is gone from the tree** — that is the `82af843..54fed63` diff; neither closes the finding alone |
| `probe-cr12-load-confirmation/` | `299b842` | the M2-c Load confirmation: what the dialog body actually says on seven paths, plus CR12-E, a 2000-case randomised differential establishing the `joinWithAnd` extraction is behaviour-preserving | **EXPIRED IN PART at `7890fc9` — 6 of 13 fail, and their failure IS the round-12 fix working** (they assert the `299b842` strings). CR12-E and the three controls still pass. **Note the contrast with CR10**: CR12 *imports* `describeLoadDiff`, so it reads the tree and expires correctly; CR10 *transcribes* and so never expires. Superseded for the closure claim by CR13 |
| `probe-cr13-overwrite-closure/` | `7890fc9` | HIGH-1's closure (imported subject, `299b842` control, exhaustive 18-cell sweep) **and** the confirmation class sweep re-run with a broadened predicate — five sites, not three, with each disposition | **Yes — current**. 16/16 |
| `probe-cr14-env-precedence/` | **not tree-indexed** — measures loader behaviour, not the chain branch | Which `DATABASE_URL` a process actually gets: `#`-commented entries are never selected; two active entries are last-wins; explicit `process.env` survives `dotenv` default and `@next/env` `loadEnvConfig`, but **not** `dotenv({override:true})` | **Yes — current**. Exits non-zero if the M8-G safety constraint stops being sound. Re-run on any `next`/`dotenv` upgrade |
| `probe-cr15-unload-guard/` | `7890fc9` (structural facts; the loader/router facts are dependency-indexed) | whether `useUnloadAlert`'s `beforeHistoryChange` guard is reachable **at all**: no Pages Router page exists, its only caller is an App Router page, and the App Router has no events bus | **Yes — current**, exit 0. **Corrects handoff `35274074`**: that half of the hook is dead for EVERY user and is not gated on `hasChanged`, so fixing the predicate does not restore it |
| `probe-cr16-persist-gate/` | `66e1974` (functions imported; the loader/router facts dependency-indexed) | M8-G's persist gate vs the send floor: `hasClassicContent` (gate) and `validateContentRequirements` (send floor) disagree on empty-ish embeds, so retiring `stripKeys`' deletion turns a pasted V2+empty-embed into a save-but-unsendable regression; plus the raw-socket persist-surface attack (auth held on every upsert body) and the SaveAsMenu dismissal-strand model | **Yes — current**. 21/21. Imports the real predicates, so it expires if either is aligned. Attack artifacts + boot log captured |
| `probe-cr17-ingress/` | `12f4ce6` (functions imported) | M3 Discord ingress: the whole-flags copy is the ruled-correct pass-through (arch:91), the converter's kept-set exactly matches the strict persist shape, unsupported types + non-link ActionRow buttons dropped and labelled, the Section-**accessory** gap (non-link accessory carried unnamed → opaque persist failure, ingress-specific), and the M3-c/M8-G reachability retraction | **Yes — current**. 15/15. Imports the real converter + shapes, so it expires if either changes |
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

## Standing safety constraint for any adversarial round in this repository

**`.env.local` points at a REMOTE HOSTED DATABASE.** Never stand an instance up against it and never
drive a mutation through it. Round 7's instance ran from an isolated `git archive` extraction with a
wholly dummy environment and `DATABASE_URL` on a **dead local port** — which is not merely safe but
is what makes the oracle work: "the handler executed" then manifests as an observable connection
failure rather than as a silent write.

**There is no `schema.prisma` anywhere in this repository.** A database-backed instance cannot be
built from it. That is a hard bound on what any adversarial round here can reach, and it should be
stated in a verdict rather than worked around.

**A sixth rig failure**: `pkill -f "next dev -p <port>"` also matches the shell command that contains
that string, killing the caller. Match on something the caller does not contain, or capture the pid.

### Sharpened at the M8-G handover, and one peer claim corrected (`probe-cr14`)

**Set `DATABASE_URL` explicitly in the attack process's own environment. Never let that round
inherit the ambient env or `website/.env.local`.** Measured against the loader Next 16.1.6 actually
uses (`@next/env` `loadEnvConfig`) and against `dotenv` default: **an explicit setting wins.** So
the constraint is mechanically sound.

**It is necessary and NOT sufficient.** `dotenv.config({override:true})` clobbers an explicit
setting, and any loader in the path could use that form. The oracle must therefore still be
asserted **on the persistence surface** — no `message.upsert` before a choice — never on the
process env, and never on a response status.

**A correction to a peer claim, verified before being made.** `steering-hooks-013-2` reported two
`DATABASE_URL` entries in `.env.local` and inferred a loader-precedence ambiguity, such that a run
avoiding one URL could still reach a live database. **The count is right and the inference does not
follow**: the second occurrence is `#`-commented, and no loader here ever selects a `#` line. There
is exactly one selectable entry, so no precedence question arises.

**The instruction survives for a stronger reason.** The one selectable entry *is* the remote hosted
database — so inheriting the file reaches a live database with **certainty**, not by ambiguity.
Keep the discipline; drop the reasoning that was offered for it.

**The file was not read.** Key names were counted with values redacted; that is enough to settle
both the count and the comment, and it is as far as this went.

## A standing caution about mutant-based reasoning, from round 8

A mutant × test **dominance** matrix reported a dominated pair four times in one sitting, and **all
four were artifacts of an incomplete mutant set** — each dissolved when the missing mutant was added.
Acting on any of them would have deleted a test carrying real, distinct coverage.

**Dominance licenses deleting a test only when it is *structural*** — strictly weaker input **and** a
subset of assertions, readable from the test's own text. A kill-set subset relation over a hand-built
mutant set is a hypothesis about that set, not a finding about the tests. Mutants confirm a
structural argument; they do not substitute for one.

The same caution does not apply to the other use of mutants in this chain — showing that a check
**can** fail (a positive control). That direction is sound: one mutant that kills a test proves the
test discriminates. It is the *negative* direction — "no mutant separates them, therefore one is
redundant" — that is only as strong as the set.

## `probe-cr8`'s rig lives in `/tmp` and does NOT survive (added at round 9)

`m13-embed-preservation.py` and `m14-separates-rowA-from-rowD.py` both begin
`os.chdir('/tmp/cr8-mut')` and read `mm.pristine.ts` from there. `probe-cr8-deletion-coverage/` has
**no `node_modules` of its own** and is not repaired by the symlink check below — its rig is that
extraction, and `/tmp` had been cleared by round 9. Without it the script dies immediately, which
reads as a probe failure rather than a rig failure: the same shape as the symlink hazard.

Rebuild before running either script:

```bash
rm -rf /tmp/cr8-mut && mkdir -p /tmp/cr8-mut
cd /usr/local/bin/hooks/website && git archive <sha> | tar -x -C /tmp/cr8-mut
cd /tmp/cr8-mut && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules
cp /usr/local/bin/hooks/website/next-env.d.ts . 2>/dev/null || true
cp src/utils/messageMode.ts mm.pristine.ts
```

Rebuilt and run this way at `ee3bc3e`: **1 newly-failing test of 370**, unchanged from `b3f8ea9`, so
round-8 INFO-1 is still open.

## Rig health — check this BEFORE running any probe (added at the second seam)

Each probe reaches vitest through a `node_modules` **symlink** to `website/node_modules`. That
symlink can degenerate into a real, near-empty directory; when it does, `npx` goes to the network
and fails with `Cannot find module 'vitest/config'`, **exit 1, no tests run** — which reads like a
probe failure rather than a rig failure. This has cost a round already.

```bash
cd /usr/local/bin/hooks/agent-output/verification/013
for d in probe-*/node_modules; do
  printf "%-45s " "$d"
  if [ -L "$d" ]; then echo "SYMLINK (ok)"; elif [ -d "$d" ]; then echo "REAL DIR — DEGENERATE"; fi
done
```

**State at the second seam (2026-08-24):** `probe-cr3`, `cr5`, `cr6`, `cr7` are **ok**;
**`probe-cr1` and `probe-cr2` are DEGENERATE** (real dirs, 0 entries) and will fail this way if run.

**`ln -sfn` does NOT repair it** — it creates the link *inside* the existing directory. The repair:

```bash
rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules
```

The command above is controlled by the tree itself: both states genuinely exist right now, so it is
demonstrated to distinguish them rather than assumed to.

These `node_modules` entries appear as **untracked** in `git status`. They belong to these probes,
not to another session — do not mistake them for foreign work, and never commit them.

## `grep -c` exits 1 on a count of ZERO (added at round 13's follow-up)

`navev=$(grep -c 'events' "$f" || echo ERR)` overwrote a **correct** `0` with `ERR` and failed the
run. `grep -c` prints the count and then exits **1** when that count is zero, so `||` fires on a
true negative. Capture the count and the status separately and treat only `rc > 1` as an error:

```bash
n=$(grep -c PAT "$f"); rc=$?
if [ "$rc" -gt 1 ]; then n=ERR; fi
```

Same family as the RTK hazard below — **the instrument was wrong, not the tree** — but a different
cause, and it bites in plain bash with no filter involved. Caught in `probe-cr15` by the result
contradicting the section's own printed count, which is the signal to trust.

## A new instance of the RTK counting hazard, caught at the second seam

`git log --oneline <range> -- <path> | grep -c ''` returned **1** over a result whose raw byte count
was **0** — a false positive for "this file was touched in the chain", which would have mis-scoped a
handoff. Caught only by contradiction against two counters that compute before the filter:
`git rev-parse` on the two blobs (identical hash) and `git diff --numstat` (empty).

This is the same class the first seam recorded, in a new place: **an exact-match or positional
predicate over filtered output is unsound, not merely inaccurate** — and it fails *open* here,
manufacturing evidence rather than losing it. Write to a file and read it, or use `git rev-parse`,
`git diff --numstat`, `grep -c` / `git grep -c`.

## Controlling a handed-over command is not ceremony

Written down because it paid out immediately at this seam: the first seam handed forward a list of
the five IS-1 persist writers, and **one of the five paths was wrong** (`SaveAsMenu.tsx` lives under
`src/app/message/m/[id]/_components/`, not `src/app/message/_components/`). A `git grep` over that
list would have returned a clean empty result and been read as "not wired" — an absence
manufactured by a typo. A two-line `git cat-file -e` path control caught it before the trigger was
ever handed on. **Any command a flush hands to a successor gets a path control and a predicate
control, both run, both recorded with their output.**
