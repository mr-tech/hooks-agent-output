# `probe-qa-verify-rider2/` — QA's verify pass at the rider tip

**Built by**: `qa-hooks-013-3`, 2026-08-25. **Tree**: `chain/013-rider-2` @ `e1d9b2b`.
**Criteria**: plan 013 **rev 47** (`06fad81`).

## What is here

| File | Settles |
|---|---|
| `013-qa-cr24-6-independent-mode-oracle.test.ts` | **CR24-6** — an oracle for the Load confirmation's mode whose every expectation is a **literal transcribed from D17's five rows**, calling neither `resolveContentLoss`, `settledMode`, `applyDisposition`, `isMessageV2` nor `detectMessageMode`. A self-check inside the spec asserts that no executable line calls any of them |
| `run-green-at-e1d9b2b.txt` | 18/18 green at the tip |
| `run-mutant-M1-*.txt` | **M1** — `resolveContentLoss` misclassifies row D as V2. **Both** my oracle (4 failed) and M9-b's own spec (4 failed) catch it |
| `run-mutant-M3-*.txt` | **M3** — `resolveContentLoss` misclassifies row C as Classic. **My oracle: 3 failed. M9-b's own spec: 8 passed — BLIND.** Full suite: 7 failed across 3 files |
| `stale-differential-*.txt` | Validation item 9 — the pre-registered staleness differential, re-run at the tip and diffed against `2d90e8a` |
| `eslint-no-fix-e1d9b2b.txt` | M9-d — **0 parsing errors**, 686 problems total (the D51 residue) |
| `cr24-2-current-argument-is-live.txt` | CR24-2's `requiresChoice` ternary reached through the **`current`** argument |
| `fqa31-spec-adoption-diff.txt` | what changed when QA's pre-registered spec was adopted |
| `run-suite-green-e1d9b2b.txt` | 47 files / 605 tests / exit 0 |

## The CR24-6 ruling, in one paragraph

The seam the reviewer names is **real in form** — code and oracle share `resolveContentLoss` — but
**it does not transmit**, because `013-m8-ec3-resolver-gate.test.ts` pins `resolveContentLoss` over
**all eight cells against literal expectations transcribed from D17's row table**, which its own
header reproduces from the plan. A defect inside `resolveContentLoss` breaks those literals rather
than sliding past them. **M1 demonstrates it**: the row-D mutant is caught by M9-b's own spec, because
that spec pins `modeAfterLoad`'s output to the literal `'classic'` rather than comparing two computed
values.

**What the reviewer's concern does catch, and correctly**, is narrower and real: **M9-b's spec is
blind at row C.** M3 proves it — 8/8 green under a mutant that misclassifies the flag-only cell. No
fixture in that spec expresses row C. **The oracle here closes that at the composition
(`computeLoadDiff`/`describeLoadDiff`), where EC-3's gate closes it at the resolver.** The chain was
never blind — EC-3 and `013-m2c-load-diff.test.ts` both catch M3 — but **M9-b's criterion alone was.**

## Reproduce

```sh
cd /usr/local/bin/hooks/website
rm -rf /tmp/qa-v && mkdir -p /tmp/qa-v
git archive e1d9b2b | tar -x -C /tmp/qa-v
ln -sfn /usr/local/bin/hooks/website/node_modules /tmp/qa-v/node_modules
cp <this dir>/013-qa-cr24-6-independent-mode-oracle.test.ts /tmp/qa-v/src/utils/__tests__/
( cd /tmp/qa-v && DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' \
    npx vitest run src/utils/__tests__/013-qa-cr24-6-independent-mode-oracle.test.ts )
```

**Mutants** are applied to `/tmp/qa-v/src/utils/index.ts` — `resolveContentLoss`'s row-D `mode`
(M1) and its row-A/C `mode` ternary (M3) — never to the shared tree, which was verified
`git status --porcelain` **empty** before and after this pass.
