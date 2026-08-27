# `verification/014/qa-phase2/` — QA Phase 2 instruments, plan 014

Written by `qa-hooks-014-2`. Sibling to `qa-phase1/`, same rule: instruments QA built to
discriminate a finding or compute a number a verdict rests on, captured so the next reader can
re-run them rather than inherit the claim. Nothing here is a test of the product.

**Phase 2 is not open.** M5 has not started and Phase 2 reads its captures. Nothing here carries a
`Verified-At` or implies a PASS.

## Contents

| Path | What it is |
|---|---|
| `delegate-throw-probe.test.ts` | Probe for the delegation carve-out's limb (i), plan rev 12. Answers, per payload, whether `validateMessage` **throws** or **returns** — the only way to tell whether `isMessageValid`'s `catch` clause is the sole carrier of a case's decision. **Temporary by design**: it was run from inside `website/src/utils/__tests__/` (where the framework already reaches the code) and removed after capture; the website tree carries no residue. To re-run, copy it back to that directory and `npx vitest run` it. |
| `delegate-throw-probe-34140d3.txt` | That probe's output at `website` `34140d3`. |

| `basename-predicate-check.py` | M5 step 2 instrument, plan rev 14: checks the CLAUDE.md **positive-form basename predicate in both directions** and reconciles the rev-14 module-anchor widening (`^[a-z]` → `^[A-Za-z]`) over the whole enumerated class rather than over the instances that revealed it. Run from the `website` repo root. |
| `basename-predicate-check-f2c85f5.txt` | Its output at `website` `f2c85f5` (source tree confirmed clean). **51 files; 13 newly admitted by the widening; 0 still rejected; 0 ID-token basenames.** |

## The rev-14 widening closes on its class, and both directions are controlled

Requested by `planner-hooks-014` at rev 14. Six controls, **all six fired as specified** — an
instrument is not evidence until it has been seen to answer correctly in both directions:

| Control basename | Must | Why |
|---|---|---|
| `JsonModalBody.load-settled-notice.test.tsx` | **admit** | PascalCase MODULE segment — the widening itself |
| `messageValidity.predicate.test.ts` | **admit** | camelCase module — admitted before and after |
| `JsonModalBody.LoadSettledNotice.test.tsx` | **reject** | PascalCase BEHAVIOUR segment — that anchor stays `^[a-z]` |
| `JsonModalBody.test.tsx` | **reject** | no behaviour segment at all |
| `json-modal-body.load-settled-notice.test.js` | **reject** | wrong extension |
| `012-message-mode.test.ts` | **reject** | leading digits, not a letter anchor |

**Reconciliation, not agreement:** the widening newly admits exactly **13** files, matching the
planner's independently stated count, and leaves **0** files rejected — so the corrected predicate
covers the class, not merely the members that exposed it.

## Scope of this instrument, stated so its 0s are not over-read

It walks **basenames only**. The CLAUDE.md negative form is defined over **three** domains —
basenames, `describe`/`it`/`test` title strings, and comment lines — and this instrument's limb 3
covers one of them. `verification/014/m5-sweep/naming-predicate.js` (the implementer's) covers all
three and is the instrument of record for M5 step 2; the two agree at `f2c85f5` (51 files, 0
positive-form failures, 0 negative-form hits).

Its limb-3 regex is also **deliberately broader than the spec** and is not the authority: it uses
`\b[0-9]{3}\b` where CLAUDE.md says a bare three-digit **`0NN`**. No false positive materialised
(limb 3 = 0), but a count from it would over-flag; take ID-token counts from the M5 sweep.

## WITHDRAWN — a false finding I raised against the M5 sweep, and how I produced it

An earlier revision of this file claimed `verification/014/m5-sweep/naming-predicate.js` omitted its
`// escaped:` exemption from the comment domain, and that the suite contained no `// escaped:` line.
**Both claims were false. The finding is withdrawn.** It is recorded rather than deleted because the
method failure is the useful part.

**The facts, verified.** The exemption is present, as an early return above *both* the title and
comment checks (`const isEscapedLine = …; if (isEscapedLine) return;`). And the suite holds two
provenance lines — `bugFixCoverage.supplemental.test.ts` and
`constructImageUrl.default-avatar.test.ts`, both `// escaped: analysis/closed/005-user-reported-bugs-analysis.md`
— found with `grep -rc '// escaped:'` at `f2c85f5`.

**The exemption is load-bearing and already controlled in both directions.** Those lines carry `005`,
which *is* an ID token under `\b0[0-9]{2}\b`, and they *are* comment lines — so the exemption is the
only reason they go unflagged. Tested against the real strings:

| Line | Flagged? |
|---|---|
| `// escaped: analysis/closed/005-…md` | no — exempted |
| `  // escaped: analysis/closed/005-…md` (indented) | no — exempted |
| `// plain comment mentioning 005` | **yes** |

So the sweep's `negative-form hits: 0` **is** evidence, and AC5's evidence for disposition rows 46
and 47 stands.

**How the false finding was produced — the part worth keeping.** The sweep was read through
`grep -n 'domain\|title\|comment\|describe\|basename\|ID_TOKEN\|idToken\|negative'`. The word
**`escaped`** is not in that alternation, so the exemption could not have appeared in what was read,
and "not in my filtered view" became "not in the file". The follow-up "test" then exercised a
*reconstruction* of the sweep's logic rather than the sweep itself, so it confirmed the misreading
instead of breaking it.

Two rules already written down here were broken:

1. **An absence claim requires an instrument that could have shown presence.** A grep alternation is
   a filter, and this workspace's standing hazard about existence claims over filtered output binds
   just as hard when the filter is your own search pattern — harder, because there is no tool to
   blame and no second instrument disagreeing.
2. **Run the instrument against the artefact, not against your model of it.** A probe built from a
   reading inherits the reading's errors and returns them as confirmation.

Nothing caught this from inside. It was caught by `planner-hooks-014` supplying a contradiction from
a different direction (AC5's rows 46/47 asserted the very lines this file said did not exist) — which
is the corroboration pattern the workspace hazards file prescribes over re-running the first
instrument.

**What survives, and it is cosmetic.** The basename branch's `&& !/\/\/\s*escaped:/.test(base)`
conjunct is inert: a filename cannot contain `// escaped:`. Dead code, no consequence, not worth a
change round, and it should never have been presented beside a false claim as though the two were
one finding.

## Why the probe writes to a file instead of logging

`console.log` from inside a case is **suppressed** by this suite's reporter configuration — the run
reports `1 passed` and prints nothing. A probe that reports by logging silently returns no data here
and reads as if it had nothing to say. It writes its lines with `writeFileSync` instead.

## Controls

The probe carries two positive controls in the same run, and both fired:

- `content: 'Hi'` → delegate `RETURNED ""`, `isMessageValid` `true`
- `data({})` → delegate `RETURNED "Message must have content, embeds, or components."`, `isMessageValid` `false`

So "the delegate did not throw" is distinguishable from "the probe did not execute". Without these a
row reading `RETURNED …` would be indistinguishable from a broken rig.

## Result, and the one case it corrects

Of the three cases `messageValidity.predicate.test.ts` groups under *"non-conformant stored data is
not swallowed as true"*, **two** exercise the `catch` clause and one does not:

| Case | Delegate | Exercises `catch`? |
|---|---|---|
| `content: 5` | THREW `TypeError: content.trim is not a function` | **yes** |
| `components: null` | THREW `TypeError: Cannot read properties of null (reading 'length')` | **yes** |
| `embeds: {}` | RETURNED `"Message must have content, embeds, or components."` | **no — ordinary delegation** |

Limb (i) therefore **holds** for row 15: literal-expectation cases exist over members the delegate
cannot produce. But that case's title — *"non-array embeds computes false rather than throwing
out"* — misdescribes the mechanism: nothing throws on that input.

**The hazard is a future "simplify" pass.** The three cases look interchangeable from their titles.
Keeping only `embeds: {}` and deleting its two siblings would leave the `catch` clause with no
coverage at all, and every title would still read as though it were covered. This is the same shape
as the `hashMessage` L67 caveat recorded in the Phase 1 document — a vacuous sibling sitting beside
the cases that carry the decision.
