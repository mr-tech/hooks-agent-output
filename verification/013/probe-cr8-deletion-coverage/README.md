# CR8 — what a test deletion actually costs

**Round 8, `Reviewed-At: b3f8ea9`.** The round-7 fix round deleted one test. No production source
was touched (`git diff --name-only 87cfbd8 b3f8ea9 | grep -v __tests__` → empty), so behaviour is
unchanged by construction. What a deletion *can* do is remove coverage silently. That is all this
probe checks.

Captured run: `run-cr8-b3f8ea9.txt`. All scripts run against an isolated `git archive` extraction —
never the shared working tree.

| script | question | answer |
|---|---|---|
| (in the captured run) | does the deletion cost any mutant detection? | **No** — five mutants, including the one built for the deleted test's own unique draft, all still caught post-deletion |
| `mutant-dominance-matrix.py` | is any *other* test in the block dominated? | **No** — with 14 mutants no dominance survives |
| `m14-separates-rowA-from-rowD.py` | is the last reported dominance real? | **No** — M14 kills `row A/settled` and spares `row D settled` |
| `m13-embed-preservation.py` | what protects `switchToClassic`'s embed preservation? | **One incidental assertion in 370 tests** — INFO-1 |

## The methodological result, which outlasts this round

The matrix reported a dominated pair **four times. All four were artifacts of my own mutant set**,
each dissolving when the missing mutant was added. Reporting any of them would have asked for the
deletion of a test carrying real, distinct coverage.

> **Dominance justifies deleting a test only when it is *structural* — strictly weaker input **and**
> a subset of assertions, readable from the test's own text. A subset relation between kill sets over
> a hand-built mutant set is a hypothesis about the mutant set, not a finding about the tests.**

Round 7's deletion rested on the structural form (the deleted test's draft was its sibling's with
`embeds` already empty, and its assertions a strict subset), with mutants only as confirmation. That
is why it was sound and these four were not.

## What this probe does NOT establish

All 14 mutants are single-line edits at return sites and field assignments. **None models an
interaction defect** — the resolver misrouting a draft *and* the switch mishandling it so the errors
cancel. A green result under all 14 is not evidence against that shape; see round 8's Assumption
Not Checked.
