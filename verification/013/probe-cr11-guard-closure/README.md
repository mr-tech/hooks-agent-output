# probe-cr11 — is the round-10 MEDIUM-2 class closed at `54fed63`?

**Built at**: `54fed63` (website, `chain/013-components-v2-editing-surfaces`), where the round-10 fix
deleted `lastNoticeClassRef.current = null;` from the effect's `catch` branch (`--numstat` `0/1`).

Run:

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr11-guard-closure
rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules
npx vitest run --config vitest.cr11.config.ts
```

**Result at `54fed63`: 17/17** (`run-cr11-54fed63.txt`, summary in `closure-summary.txt`).

## Construction

One transcription of the effect body, parameterised by a single boolean:

- `clearOnCatch: true` == `82af843`, the **control**
- `clearOnCatch: false` == `54fed63`, the tree under review

The two arms differ **only** by the deleted line, so any difference between the columns is
attributable to it and to nothing else. Every function the transcription calls
(`discordMessageImportShape.parse`, `resolveContentLoss`, `noticeMessageForSettled`,
`applyDisposition`) is the real one.

```
sequence                                  82af843   54fed63
  delete one char, retype it               2         1
  add a second key                         2         1
  8 invalid->valid round trips             9         1
  truncated paste-over                     2         1
  10x identical row-D                      1         1
  row D -> broken -> row B (must warn)     2         2
  row D -> row A -> row D (defensible)     2         2
```

## Blocks

| Block | Asserts |
|---|---|
| CR11-A | The four sequences CR10 raised now give exactly ONE toast — **each paired with its pre-fix control**, so a 1 is a measurement, not a vacuous pass |
| CR11-B | The sequences that already worked did not regress, and a first-ever warning still fires |
| CR11-C | **Suppression attacks** — a guard whose memory is never cleared could swallow a warning that ought to fire. Genuine class changes still warn across an invalid state; row E does not swallow a following settled warning; an unparseable opening state does not suppress the first real warning; and the row-A excursion still warns twice |
| CR11-D | The one behaviour this guard does **not** give: a different message on the same notice class is not re-warned. Pre-existing, not a finding, recorded so CR11-A is not over-read |

**CR11-C's row-A case is asserted deliberately.** Round 10 judged that re-fire defensible and did not
ask for it to change. Pinning it here means a later "tidy" of the guard cannot silently remove a
warning the review decided to keep.

## What this probe CANNOT establish — read before citing it

**It does not read the tree.** Like CR10, the effect body is transcribed, not imported. CR11
establishes **what the deleted line does**, which is tree-independent and stays true; it does **not**
establish that the line is actually absent from the tree under review.

That link is `git diff --numstat 82af843 54fed63` → `0/1` on that one line, read directly in round 11.
**Neither closes MEDIUM-2 alone. Together they do.** Do not cite CR11 as self-sufficient.

**`probe-cr10` is superseded by this probe for the guard claim**, and is stale by construction: it
hardcodes the pre-fix body, so it reports 12/12 on every tree including this one, where the defect it
demonstrates is fixed. Its passing is **not** evidence about any tree after `82af843`.

## Blind spot carried from CR10

`lastNoticeClassRef` is a `useRef` — stable across re-render, **not** across remount. CR11 models it as
surviving. Every toast count above is therefore a **lower bound**, never an upper one. Whether anything
remounts this component is unreachable without a DOM harness (the repo has none: no jsdom, no
testing-library, zero `.tsx` tests in 28 test files) and is routed to QA as round 11's Assumption Not
Checked.
