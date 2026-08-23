# QA Phase 2 re-anchor differential — `17cada0` → `c85945f`

**Instrument for**: qa-doc rev 7 (`012-message-valid-field-qa.md`), the differential-scoped
re-anchor of the Phase 2 PASS from `17cada0` to `c85945f`, and the closure of code review round
7's Assumption Not Checked (routed to QA by steering as the instrument's owner). Captured per
"An Instrument That Discriminates a Finding Is Captured, Not Narrated" before the verdict cites it.

**Executed by**: qa (session `qa-hooks-012-1`), 2026-08-23.

## The delta, re-derived (not inherited from steering or the reviewer)

    $ git -C website rev-parse c85945f^        → 17cada0579da87d3f55f0bec37516d23640a22fb
    $ git -C website diff --numstat 17cada0 c85945f
    59   0  src/scripts/__tests__/012-backfill-evaluation-failure-category-qa.test.ts
    189  0  src/utils/__tests__/012-json-editor-repair-path.test.ts

Parent is exactly `17cada0`. Two additions, both QA-authored test instruments, zero production
source, zero deletions. Both files' md5s at `c85945f` match the content identities recorded in the
qa-doc rev-6 header (`81db2948…`, `84216283…`) — verified 2026-08-23 before the reviewer's round 7
arrived, re-checked here:

    $ md5sum src/utils/__tests__/012-json-editor-repair-path.test.ts \
             src/scripts/__tests__/012-backfill-evaluation-failure-category-qa.test.ts
    81db2948c488bfb4598b19f0742f34b9
    84216283773f34bc1c402904786888f5

## Both trees executed over the verified surface

The verified surface is the suite's whole collection (vitest collects by filesystem glob
`src/**/*.test.ts`, blind to tracking status — the reviewer's round-7 finding, independently
consistent with `vitest.config.ts` read at Phase 2).

| Tree | State when run | Command | Result |
|---|---|---|---|
| `17cada0` committed content only | Phase 2, before the MS-8 spec existed, repair-path excluded | `npx vitest run --exclude "**/012-json-editor-repair-path**"` | **20 files / 402 tests, green** |
| `17cada0` + repair-path (untracked) | Phase 2 mid-round | `npx vitest run` | **21 files / 408 tests, green** |
| `17cada0` + both instruments (untracked) — content-identical to `c85945f` | Phase 2 close | `npx vitest run` | **22 files / 411 tests, green** |
| **`c85945f` committed, clean tree** | **This re-anchor** | `npx vitest run` (exit 0; `git status --porcelain` empty) | **22 files / 411 tests, green** |

## Count reconciliation (the three circulating figures, each named to its tree)

- **"20 files / 402 tests"** (QA's Phase 2 message) — the **committed tree at `17cada0`** alone.
- **"411-test run"** (plan rev 28) — the Phase 2 close run on `17cada0` **plus both untracked QA
  instruments**, content-identical to `c85945f`.
- **"22 files / 411 tests"** (round 7's Assumption Not Checked) — the same figure, now
  **re-observed at the committed `c85945f`** by this capture's run.

All three are consistent: 402 + 6 (repair-path spec) + 3 (MS-8 guard spec) = 411. No figure
contradicts another; each belongs to a different tree state, and the ambiguity was in citation,
not in any run.

## Movement over the verified surface

**Zero.** Every test green in both executed trees; the delta's 248 lines are the two instruments
themselves, which add nine collected tests across two files and change nothing they collect
against. Round 7's falsity signature — a suite count at `c85945f`
other than 22 / 411 on unmoved source — **did not fire**.

Verdict effect: the Phase 2 PASS re-anchors to `Verified-At: c85945f`. Zero movement licenses this
scoped pass; it does not carry the old verdict forward unexamined — the suite was re-executed at
the new anchor, above.
