# Chain 012 — carry-forward into the post-refresh code review pass

**Not a verdict.** This is the code-reviewer's own working note, written so that the items below
survive two failure modes that have both already occurred on this chain: a cross-session message
dropped at the recipient's inbox (twice), and this session's context being compacted (twice).
The round-5 verdict survived its drop because it had been committed before it was sent; the
dispositions in the same exchange existed nowhere but the relay and did not survive. Everything
here is therefore written down before it is cited, for the same reason an instrument is.

Written 2026-08-23, with `website` at `f983508` (unmoved; the pin refresh has not landed).

## 1. What D18 does and does not change

Owner ruling D18 — *"Drop it. No more scope expansion. The plan ships as is. Everything else gets
folded into handoffs."* — changes **disposition**, not gates. Confirmed by steering, 2026-08-23.

- New findings become handoff material rather than new plan rows or criteria.
- **A CRITICAL or HIGH defect in what shipped still holds the tree.** That is not scope expansion:
  expansion adds surface; a defect in the contents is what the gate exists for.
- D18 forecloses new rows and new criteria. It does **not** foreclose the records the existing rows
  already owe — a future member of an existing Risks row's class is that row's falsifier firing, and
  recording it is the row's own contract. (The planner reached the same boundary independently from
  the other side and corrected its own draft before commit.)

## 2. Corroboration is not substitution

The implementer has been briefed to run the round-5 completeness check and report its result either
way. That run is **input**, not a discharge. An assumption this stage registered is discharged by
this stage re-deriving it. If the two runs disagree, **the disagreement is itself the finding**.

## 3. Assumptions booked for the post-refresh pass (both mine)

| # | Assumption | Falsity signature | Owner |
|---|---|---|---|
| Round 4 | `pg` dials the host its `Client` constructor reports. | A dial whose observed destination differs from the constructor's reported host. Dischargeable with a confirmation-gated dial against a **non-production** host. | code-reviewer |
| Round 5 | The CR-M6 completeness result survives whatever `pg-connection-string` the refresh installs. Baseline **2.6.1**, recorded in `../verification/012/probe-cr5-override-guard/measured-connector-version.txt`. | An installed version differing from 2.6.1, **or** a non-zero "redirects the guard does not see" from re-running `probe-cr5-override-guard/param-class.js`. | code-reviewer |

Round 3's assumption is **devops'**, at the pin-refresh commit. Not mine to close.

## 4. A claim of mine that was wrong, recorded so it is not re-asserted

I told steering that my rev-21 registration write "had already been committed — no routing was
needed; it had landed before you asked." **That was wrong.** Steering observed, immediately before
routing, ` M planning/012-message-valid-field.md` at 11 insertions / 2 deletions, with the diff body
carrying `-| Revision | 20 |` / `+| Revision | 21 |`. `d8cf9ff` is that same content — `git show
--stat` reports **11 insertions, 2 deletions** on that path — and its message names it
reviewer-authored, planner-committed. So the write was uncommitted at the moment steering routed it,
and the routing was doing work.

The error's shape: I never committed it myself (correctly — the plan is another stage's document),
so "it had landed" was an **inference from my own non-action**, not an observation. Steering's
direct `git status` beat my inference, as it should.

## 5. The SHA hazard: mechanism established, control replaced

I had recorded this as a discipline failure I kept repeating ("a second Bash call inherits the
previous call's working directory"). **That model was wrong**, in the direction that matters.
Measured this session:

- `cd /tmp` in one call, then a bare `pwd` in the next, returns `/usr/local/bin/hooks`. The harness
  announces `Shell cwd was reset`. Working directory does **not** persist across calls — it resets.
- `/usr/local/bin/hooks` is **not a git repository** (`fatal: not a git repository (or any of the
  parent directories)`).

Consequence: a bare `git` in a fresh call **fails loudly** and is therefore safe. The real hazard is
confined to **compound commands**, where a `cd <repo> &&` persists for the rest of that single
command and a later segment reports the wrong repo's SHA under another repo's label — silently, with
a plausible-looking value.

**Control: `git -C <repo>` on every invocation**, not `cd <repo> && …`. This is strictly stronger
than per-command `cd`: `-C` binds the repository to each *invocation*, so two invocations inside one
compound command cannot contaminate each other, whereas `cd A && … ; git …` still can. "I caught it
seven times" was never a control.

Standing request to steering, reciprocated: **if a SHA looks wrong for its label, challenge it
rather than assume it was checked.**
