# `verification/013/` — instruments for chain 013

**Scope, ruled by QA 2026-08-25** (`steering-hooks-013`'s `INBOX.md` entry of 2026-08-24, which
asked whether this directory is QA's or the chain's): **it is the chain's.** Any stage may place an
instrument here. **Each stage indexes its own**, in its own file, and does not edit another's index.

- **this file** — QA's index. QA's document.
- **`README-code-review-instruments.md`** — the code-reviewer's index. Not QA's, and not edited here.

The alternative — moving the reviewer's twenty-odd probes out — was considered and rejected: every
one of them is cited by directory path in a 489 KB review document, so the move would break the
citations to buy a tidier scope sentence. The split-index arrangement already works and is now the
convention rather than an accident. **The directory name says `verification`, not `qa`; the sentence
that scoped it to one stage was the thing that was wrong.**

## What belongs here — QA's half

**What belongs here**: executable instruments QA built to **discriminate a finding** or to compute
a number a verdict rests on — probes, controls, differential matrices, payload sets — together
with their captured runs and a README stating what each one settles. Also: operator-observation
captures for criteria with no automated coverage, where the designated observer is a stage agent
(`<criterion>.md`), per plan 013 "Surfaces Without Automated Coverage".

**What does not belong here**: acceptance specs for plan 013's criteria. Vitest already reaches
`src/**/__tests__/` in the `website` tree; a criterion's spec lives in the service's own suite so
it runs on every future change. This directory is not a second home for the test suite.

**Where the owner's attestations go**: nowhere here. Where the designated observer is the
repository owner, no capture path is minted and no file is owed — his attestation, quoted with
its timestamp in the consuming document (the UAT record), is complete evidence.

### QA's instruments

| Directory | Built at | Settles |
|---|---|---|
| `probe-preexisting-seed-route/` | Phase 1 | whether UAT can mint its own M8-G seed pre-deploy, making the D19 repair not a one-way door. **Also holds `013-qa-phase1-seed-route-probe.test.ts`**, moved out of the shared `website` tree where it was untracked and inflating suite totals by +7/+7/+0 (`INBOX.md`, 2026-08-24) |
| `probe-qa-p2-med6-loadgate/` | Phase 2 | MED-6 — the dismissed-choice Load gate |
| `probe-qa-p2-rowd-load-gate/` | Phase 2 (`4e9da96`) | F-QA15 — row D unreachable at the Message JSON modal's Load |
| `probe-qa-toast-vessel-render/` | Phase 2 (`abcf585`) | F-QA23 — whether the converted notices actually render and clear. **Its `CodeMessageNotice` half is now historical**: the component was deleted from the product at `2d90e8a` |
| `probe-qa-paste-surface-render/` | Phase 2 (`4a7126b`) | F-QA28 — the paste surface's render path, and `trace-paste-surface-unreachable.txt`, which is why no harness reaches that component function |
| `probe-qa-p3-fixverify/` | refresh pass (`164d720`) | independent verification of the F-QA15 fix at `53beb37`, refreshing the QA FAILED verdict at `4e9da96` |
| `probe-qa-p3-stale-prediction-differential/` | Phase 3 (`2d90e8a` vs `d7c4836` vs `4a7126b`) | **which of the eight PREDICTION STALE register rows actually moved**, executed rather than read off the two commits' file lists. Also carries the pre-registered failing specs for **F-QA31** (the Load confirmation names a mode the Load does not produce) and **F-QA32** (an emptied Container is dropped with nothing said) |

| `probe-qa-p3-delimiter-class-sweep/` | Phase 3 (`2d90e8a`) | whether code review's MEDIUM-1 is one instance or a class — **three sites**, and why the two JSON surfaces are unreachable **by coincidence rather than by design**. Carries the rider's pre-registered staleness condition |
| `probe-qa-p3-render-instrument-reduction/` | Phase 3 (`4a7126b` vs `2d90e8a`) | devops **F-1** — whether the trim of QA's adopted render instrument was correct (**yes**), and its true magnitude (**4 of 13**, not 4 of 8, measured by running the file rather than counting its text) |
| `probe-qa-bc4-json-tab-fixture/` | BC-4 pass (`b56570d`) | **whether BC-4 has an executable fixture at all.** Confirms `{"content": ""}` pasted into the New Message dialog's **JSON** tab reaches the content floor and closes all three limbs against the real `NewMessageModal` function; **refutes `{}`** as a fixture by executing react-use's shipped `useUpdateEffect` (it skips the first render, so the check never runs). Also the executed basis for **F-QA33**. Its `manifest-sha256.txt` hashes **the shipped files**, per V.26's remedy |
| `probe-qa-criteria-rev49-rev50/` | re-anchor pass (`b56570d`) | **whether QA's verdict needed re-verification or only re-anchoring** when the D53 pass took the plan to rev 50. Two independent instruments — the plan's byte diff and a section-hash map — agree that **no criteria-bearing section moved**; controls correctly report **A CRITERION MOVED** for rev 47→48 and rev 48→49, so the result is not vacuous |

**Not QA's, and indexed by the reviewer**: `baseline-expected-six/` and the `probe-cr*/` series.
QA's suite counts depend on `baseline-expected-six/`; the dependency is recorded here, the row is
not. See `README-code-review-instruments.md`.
