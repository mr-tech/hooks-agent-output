# probe-cr24-drift-loudness — is QA's alignment robust (fails loud, not silent)?

**Stage**: code-review (Round 22 correction), plan 013. **Tree**: `4a7126b`.

## Why

My Round-22 alignment note gave a WRONG reason — that the three custom hooks "consume no useState
slot." They do: `useCopyToClipboard` 1 (line 7), `useCodeMirror` 2 (lines 23-24). And
`useCopyToClipboard()` runs at line 36, BETWEEN `jsonMessageString` (35) and `error` (38), so a REAL
unmocked render orders slots `[json, copyState, error, dropped, pending, dismissed, settled, …]` and
`settledNotice` is index **6**, not 5. The positional injection is aligned ONLY because the mocks
remove those slots — **the mocks are load-bearing for correctness, not merely for callability.**

The conclusion (alignment holds) still stands — my CR23 control ran WITH the mocks and passed — but
the risk that distinction names is real: a maintainer who deletes a mock believing it inert would
shift the slots under the assertions. So the question that matters is whether such drift fails
**loudly** or **silently**. QA executed three drift paths (A1/A2/A3) and reported all loud; this
probe re-executes A1 and A3 by my own hand (A2 shares A1's mechanism).

## Result — my execution (2/2)

| Path | Change | Expectation | Result |
|---|---|---|---|
| **A1** | drop the `useCopyToClipboard` mock | component call THROWS (real hook → null React dispatcher) | **LOUD** — `toThrow()` holds |
| **A3** | insert a `useState` before `settledNotice` (`DriftExtraState.tsx`) | injected `settled` value lands in the wrong slot → notice does NOT render → assertion catches it | **CAUGHT** — notice absent under drift |

A2 (drop the `useCodeMirror` mock → `TypeError: null 'useCallback'`) is QA's; it is the same
mechanism as A1 (a real hook reaching React's null dispatcher outside a renderer) and is
mechanism-confirmed by A1 here.

**Conclusion**: every drift path fails loudly or is caught; none passes silently. The mocks are
load-bearing, and their removal is self-announcing. This is the basis on which QA closed its
instrument-alignment Assumption Not Checked, re-verified here.

## Execution note

Bare npm imports do not resolve from `agent-output/`; the run was performed by copying these files
into a throwaway `website/.cr24-probe/` and deleting it. No shared source was modified.
