# probe-qa-criteria-rev49-rev50 — did any criterion move under QA's verdict?

**Stage**: QA, plan 013, re-anchor pass. **Question**: QA's verdict carries
`Criteria-At: plan 013 rev 49, 9637735` and the clause *"expires when EITHER the tree or the
criteria move."* Steering's D53 registration pass took the plan to **rev 50 (`eb0e291`)**. Does the
verdict's **substance** need re-verification, or only its **anchor** re-issuing?

**QA was asked not to take `numstat 3/1`, "purely additive", or "no criterion" from any relaying
message. Nothing here is taken from one.**

## Two independent instruments, and they agree

**1. The plan's own byte diff, read as a hunk rather than as a file list.**
`git diff 9637735 eb0e291 -- planning/013-…md` is **three hunks**: the frontmatter `Rev: 49 → 50`,
one appended Changelog row, and one appended Decisions Register row (**D53**). `git log
9637735..eb0e291 -- <plan>` returns **exactly one commit**, so no intermediate revision touched the
plan and reverted — a net diff of two endpoints can hide that, and this one does not.

**2. `section-hash.py` — independent of git's diff algorithm.** It extracts both committed blobs,
splits each at its `## ` headers, hashes every section, and compares the maps. A criterion that
moved must land in a section whose hash changed; a section whose hash is equal cannot contain a
moved criterion, whatever the diff chose to display.

```
sections 18 -> 18   removed 0   added 0   CHANGED 3
    CHANGED  FRONTMATTER+PREAMBLE      (Rev: 49 -> 50)
    CHANGED  Changelog
    CHANGED  Decisions Register        (D53 appended)
IDENTICAL (15) — including every criteria-bearing section:
    Milestones · Validation and Release Conditions · Plan Scope · Reading Order ·
    Release Artifacts · Surfaces Without Automated Coverage · Testing Strategy ·
    Objective · Assumptions · Risks · Open Questions · Out of Scope · Handoff Notes ·
    Serialised Shared Files · Value Statement and Business Objective

VERDICT: NO CRITERION MOVED
```

The criteria-bearing set is selected **by predicate** — a section whose title names milestones,
validation, acceptance, release, scope, story, criteria, surfaces-without, or reading order — not
by listing the sections that happened not to move. Seven sections match in each blob; the sets are
equal and none of them moved.

## The controls — and they are what makes the result non-vacuous

An instrument that always answers *"no criterion moved"* would produce this output too. It does not:

| Comparison | What that revision did | Instrument's verdict |
|---|---|---|
| rev 47 → 48 (`06fad81`→`f5b7cac`) | corrected M9-a's instrument (QA INFO-1) | **A CRITERION MOVED** — `Milestones` |
| rev 48 → 49 (`f5b7cac`→`9637735`) | D52 enacted as **M10** | **A CRITERION MOVED** — `Milestones`, `Reading Order` |
| **rev 49 → 50** (`9637735`→`eb0e291`) | **D53 registered** | **NO CRITERION MOVED** |

Both immediately preceding revisions are killed by the instrument. The rev-50 change is the only
one of the three that leaves `Milestones` untouched — it is structurally unlike its two
predecessors, not merely asserted to be.

## Why a Decisions Register row is not itself a criterion — checked, not assumed

The Decisions Register is deliberately **outside** the criteria predicate, and that exclusion is
safe only because it is observable: a decision becomes a criterion by **amending** `Milestones` or
`Validation and Release Conditions`, and the controls above show that is exactly how **D51** and
**D52** landed — each moved `Milestones` in the same commit that registered it. **D53 moved
neither.** Read on its own terms, D53 registers a *completed documentary act* — four deployment
records written by `devops` at `deployment/…-deployment.md` §12 (`14bc31c`) — and states
*"Registration write set only; no register state is set here."* Its self-description is therefore
corroborated by execution rather than accepted on its word.

**Residual, stated rather than hidden**: a future decision that changed a criterion *without*
amending the criteria sections would evade this instrument. That is a general property of the
instrument, not an open question about D53, and the reusable rule is: **a decision row claiming to
change no criterion is checked by whether the criteria sections moved in its own commit.**

## Ruling this supports

**The clause bites; the substance stands.** The criteria axis moved, so the anchor **is** expired
and is re-issued rather than argued away — the differential scopes the refresh, it never replaces
it. Because zero criterion moved and the tree is unmoved (`b56570d`, `git status --porcelain`
empty, re-derived at this write), what is owed is a **scoped re-anchor pass**, not re-verification.
Zero movement licenses a scoped pass; it never licenses carrying a verdict forward silently, which
is why this pass exists and is recorded.

## Reproduce

```sh
cd agent-output
python3 verification/013/probe-qa-criteria-rev49-rev50/section-hash.py 9637735 eb0e291
python3 verification/013/probe-qa-criteria-rev49-rev50/section-hash.py f5b7cac 9637735   # control
python3 verification/013/probe-qa-criteria-rev49-rev50/section-hash.py 06fad81 f5b7cac   # control
```
