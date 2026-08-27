# M0 — baseline run record (implementer-hooks-014)

`website` at `a74b9e268399663adfccf14816376de1b8eb41ac`, tree clean before and after (`git -C website
status --porcelain` empty both times). First-ever execution of this suite — plan 014's Objective
records that no suite run predates this chain.

## Command

```sh
cd website
npx vitest run --reporter=json --reporter=verbose \
  --outputFile=../agent-output/verification/014/baseline-a74b9e2.json \
  > ../agent-output/verification/014/baseline-a74b9e2.txt 2>&1
echo "EXIT CODE: $?"
```

## Result

| Quantity | Value | Instrument |
|---|---|---|
| Process exit code | **0** | shell `$?`, appended to the `.txt` capture |
| `numTotalTestSuites` | 205 | JSON top level |
| `numTotalTests` | 617 | JSON top level |
| `numPassedTests` | 617 | JSON top level |
| `numFailedTests` | 0 | JSON top level |
| `success` | `true` | JSON top level |
| `testResults.length` (files collected) | 48 | JSON top level |

**INST-1 reconciliation (QA, plan rev 7 M0 step 2) — closed, model held.** `numTotalTestSuites` is
**not** compared to the 48-file count; it counts files **and** `describe` blocks. Verified:
`grep -rcE '^[[:space:]]*describe(\.[a-z]+)?\(' src --include='*.test.ts'` over the suite = **157**
describe sites; 48 + 157 = **205** = the measured `numTotalTestSuites`. QA's falsifiable prediction
held exactly — the reconciliation predicate is confirmed, not merely assumed.

**Membership reconciliation (plan rev 7 M0 step 2) — by path, not by count.** Every
`testResults[].name` (normalised from absolute to repo-relative) was compared, path-for-path, against
`find src \( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' \)`, sorted:

```
diff /tmp/find-list.txt /tmp/reporter-list.txt   # empty diff — identical 48-element sets
```

Result: **identical sets, 48 = 48.** This also closes QA's "Assumption Not Checked" (the 48 files a
filesystem `find` returns are the files vitest actually collects) — discharged here by set
comparison, not by count, per QA's own instruction that two different 48s can disagree on membership.

**M0 step 3 / AC2 key (plan rev 7) — re-confirmed on the full run.** QA's Phase 1 probe
(`qa-phase1/probe-json-reporter-isValidUrl.json`) established `assertionResults` exists per case on
one file; this full run confirms it on all 48. Sample:

```json
{ "ancestorTitles": ["classifyRow — the verdict"],
  "fullName": "classifyRow — the verdict a sendable record computes valid: true",
  "status": "passed", "title": "...", "duration": 2.39, "failureMessages": [], "meta": {}, "tags": [] }
```

Sum of `assertionResults[]` across all 48 `testResults[]` entries = **617** = `numTotalTests`. AC2's
identity key going forward is the pair **(repo-relative file path, `assertionResults[].fullName`)** —
the file side is mapped old→new by the disposition table's `old title → new title` column plus a
file-rename column (INST-2); a key on `fullName` alone is not safe (48 files, shared title
vocabulary).

## Acceptance (plan M0, property form)

Every inventory file reported collected (48/48, membership-verified) ✓; per-case pass/fail set
captured at the named path ✓; no failing file (0 findings for the owner; a red baseline is not
present) ✓; exit code recorded beside the counters (BC-2) ✓.

**Suite plan Assumption 1 ("the suite at `a74b9e2` passes") — CONFIRMED**, not merely unverified as
recorded in the plan's Objective section. The analysis's mirror-run figures (48/617, exit 0)
transfer to the in-place tree exactly, closing the critique's "Assumption Not Checked" for this half
(M0 in-place vs. mirror).
