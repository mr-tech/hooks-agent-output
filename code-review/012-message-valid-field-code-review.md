---
ID: 012
Origin: 012
UUID: 12a4fe3c
Parent: message-valid-field-for-statbot-2026-08-23.md
Reviewed-At: "Round 7 (delta): website `c85945f` on `chain/012-message-valid-field`; project-utils `749606d` on `master`; agent-output at review start per the round-7 commit. **The website working tree is now fully clean — no uncommitted or foreign file in scope, so this round needs no content-identity manifest.** `c85945f`'s parent is exactly `17cada0`; its whole delta is two added test files, zero production source, zero deletions. One of the two (`src/utils/__tests__/012-json-editor-repair-path.test.ts`) has blob sha256 `cf2066a07e9e921ba224c7cf190b2fa6ff132c4435eedd5d418815f51260c5b7` — byte-identical to round 6's manifest entry. The other (`src/scripts/__tests__/012-backfill-evaluation-failure-category-qa.test.ts`) **postdates round 6 and was reviewed for the first time this round.** Rounds 1-6 ran against `bc5ee2b`, `681c353`, `eb28ae6`, `ff753a6`, `f983508` and `17cada0`; no earlier verdict travels to this tree and none was inherited."
Status: In Review
---

# Code Review: Plan 012 — `valid` field on stored messages

**Plan Reference**: `agent-output/planning/012-message-valid-field.md` (rev 22, `e561967`)
**Round**: 7 — delta round at `c85945f`. Round 6 (below) was the last full pass.
**Round 6 was**: post-refresh pass. Round 5's verdict expired by its own terms: `17cada0` is a
change to a tracked file since `Reviewed-At: f983508`.

## Verdict: APPROVED_WITH_COMMENTS

One MEDIUM, one LOW carried unchanged. **No CRITICAL and no HIGH — nothing holds the tree.**

Both booked assumptions are **discharged by my own execution**, not by accepting the implementer's
corroborating run. The pin refresh does what it was for: the installed `project-utils` now declares
the column. The build defect is genuinely fixed and its *class* is empty, not merely its instance.

The MEDIUM is not in the shipped behaviour. It is in the **release record**: a scope-verification
result that is false against the artifact it describes, repeated four times in the document devops
and UAT will read.

---

## What changed since round 5

    223  221  pnpm-lock.yaml                                              (49f2bf1)
      2    2  src/{pages => server}/api/v1/__tests__/012-valid-exposure.test.ts   (17cada0)

`src/scripts/backfillValid.ts` is **byte-identical** to the round-5 tree (`git diff --numstat
f983508 17cada0 --` on that path returns empty). Every round-5 guard finding therefore carries
unchanged, and per this stage's own rule a delta round against a byte-identical subject requires
**re-verification of identity only, not a fresh attack**. I re-verified identity and did not
re-attack the guard. That is a deliberate saving, recorded so it is visible rather than assumed.

---

## Assumptions discharged this round — both by re-derivation

### Round 4: "`pg` dials the host its `Client` constructor reports" — **DISCHARGED**

The round-5 instrument could not settle this. `param-class.js` established what
`pg-connection-string` **computes**; the assumption is about what the **socket does**. An
instrument's validity is indexed to the claim it was built for, and the claim had changed, so I
built a new one.

Instrument: `agent-output/verification/012/probe-cr6-dial-target/dial-target.js` (captured before
this verdict cites it; README states oracle, gate and blind spots).

**Oracle fixed before running**: a real TCP `connection` event observed at a loopback listener —
not the client's reported config, which is the thing under test and so cannot also be the oracle.
**Confirmation gate**: the probe refuses any host but `127.0.0.1`. Proving that a dial reaches its
stated target must never be done by pointing it at the database the guard protects.

    control: authority=loopback         reportedHost=127.0.0.1             socket=true   expected=true
    control: authority=unresolvable     reportedHost=no.such.host.invalid  socket=false  expected=false
    subject: ?host= overrides authority reportedHost=127.0.0.1             socket=true   expected=true

    RESULT: pg dials the host it reports — assumption DISCHARGED

The negative control fired (`ENOTFOUND`, no socket), so the oracle can register **absence** — a
listener that never fires proves nothing unless something makes it fire and something else does
not. The subject is discriminating: its authority is unresolvable, so a socket at the listener can
only mean pg dialled `config.host`, which is also the value it reported.

### Round 5: "the completeness result survives the installed connector" — **DISCHARGED**

Both halves of the falsity signature re-derived by me at this SHA:

- Installed `pg-connection-string@2.6.1`, `pg@8.11.1` — identical to the recorded baseline in
  `probe-cr5-override-guard/measured-connector-version.txt`.
- `param-class.js` re-run against the refreshed install: **`REDIRECTS THE GUARD DOES NOT SEE = 0`**,
  with the three known redirects (`?host=`, `?%68ost=`, repeated `?host`) all still caught.

The implementer also ran this and reported the same. That run was **corroboration, not
substitution** — an assumption this stage registered is discharged by this stage re-deriving it.
The two agree, so there is no finding in the comparison; had they disagreed, the disagreement
would itself have been the finding.

### M4's precondition — verified against the artifact, not the lockfile

Round 3's M4 turned on the pinned copy of `project-utils` lacking the column while the local copy
had it. At this SHA the **installed** copy declares it:

    node_modules/.pnpm/project-utils@...749606d.../dist/index.d.ts:69:    valid: boolean | null;

on the Message table type. Read from the resolved install, not inferred from `pnpm-lock.yaml` — the
lockfile is the instruction, the `.d.ts` is the result, and it was the result that was wrong before.

---

## The build fix (`17cada0`) — scope ruling assessed, and the class checked

**On steering's scope ruling: I agree, and on the plan's own text rather than on deference.**
Validation item 3 requires that "a frozen-lockfile install plus rebuild **passes**". A build that
does not pass is a failed release condition the plan already owns. Fixing it is discharging an
existing criterion, not adding one — which is exactly the line D18 draws. No escalation.

**Verified rather than accepted** — the sibling scope claim in these same two commits turned out
false, so I re-ran the proof myself:

- `npm run build` at `17cada0`: **exit 0**, zero errors.
- Both v1 routes present and dynamic: `ƒ /api/v1/guilds/[guildId]/messages` and `.../messages/[id]`.
- The moved test file absent from the route list.

**The class, not the instance.** The fix moved one file. The class is *any file under Next's scanned
`src/pages` tree that is not a valid route module*, and a name-matching predicate
(`test|spec|__tests__|__mocks__`) would miss a `__fixtures__` or a plainly-named helper. So I
enumerated the class by its actual property — every tracked file under `src/pages` lacking a default
export:

    files under src/pages: 8      files without a default export: 0

**The class is empty**, not merely the flagged instance. Import targets resolve
(`~/pages/api/v1/...` → both route files exist), the vitest alias `~ → src` is declared in
`vitest.config.ts`, and `include: ['src/**/*.test.ts']` still collects the file at its new path — so
the move does not silently drop it from collection. `vi.mock('~/env.mjs')` and
`vi.mock('project-utils')` are module-ID based and are unaffected by relocation; the two changed
lines are exactly the two dynamic imports.

**TDD compliance.** `17cada0` claims a pure relocation. Verified, not accepted: the diff is 2
insertions / 2 deletions, both import specifiers, under git rename detection — no assertion, case,
or fixture changed. The exemption holds.

---

## Round 7 — delta round at `c85945f`: does the round-6 verdict transfer?

**Asked by steering, correctly, rather than decided by steering.** The tree moved after round 6's
`Reviewed-At: 17cada0`. Answer: **the verdict transfers, re-anchored — but only after this round,
because one of the two added files is content no review had seen.**

### What the delta actually is

    git diff --numstat 17cada0 c85945f
    59   0  src/scripts/__tests__/012-backfill-evaluation-failure-category-qa.test.ts
    189  0  src/utils/__tests__/012-json-editor-repair-path.test.ts

Parent of `c85945f` is exactly `17cada0`. Two additions, both `A`, zero production source, zero
deletions, nothing under `src/pages`.

### The relay was right about one file and wrong about the other

Steering's account was that both files "were present as untracked paths throughout both passes", so
the working-tree *content* was unchanged from what was reviewed and tested. Measured:

| File | Blob at `c85945f` | Present at round 6? |
|---|---|---|
| `012-json-editor-repair-path.test.ts` | sha256 `cf2066a0…` | **Yes** — byte-identical to round 6's manifest entry, carried across all six rounds |
| `012-backfill-evaluation-failure-category-qa.test.ts` | sha256 `363a98d6…` | **No** — mtime **12:15:34**; round 6 committed **11:44:08** |

The second file postdates round 6 by 31 minutes. It was authored by QA *during Phase 2*, to close
mutation survivor MS-8, and first appears in the record in QA's Phase 2 document (`1881347`,
12:20:44). Committing does not touch mtime, so the mtime is real evidence of authorship time.

Two things follow, and they point in opposite directions:

1. **Round 6's exclusion-list claim is not falsified.** It said no other uncommitted file was
   present at review start or end. The file did not yet exist. I checked this before checking
   anything else, because the alternative was a false claim of my own.
2. **A delta round was genuinely owed** — not on the tracking technicality, but because 59 lines of
   new content entered the release that no review had read.

The relay error is an honest one and worth naming only because it is the exact thing "read these
rather than taking my word" exists to catch. It did.

### The tracking half of the argument is sound

Tracking status is invisible to every tool in this stack: vitest (`include: ['src/**/*.test.ts']`),
`tsc` (`include`/`exclude` globs) and Next all resolve by filesystem, not by git. Both files were
already being collected before the commit. What tracking changes is **release scope** — and that is
a real change, because the new file now ships.

### The new file, attacked

Read in full. One hypothesis available: `MessageData` appears in type position at two sites with no
import. **Refuted** — it is an ambient global (`src/@types/global.d.ts:116`, inside the file's
`declare global` block). Recorded rather than dropped.

That was a proxy for the question that matters: is the new spec a member of **F-QA13**'s class —
specs that would not survive the `**/__tests__` tsconfig exclusion being closed? Reading cannot
answer it, because the shipped config never typechecks the file. So I built the instrument:
a throwaway tsconfig extending the real one with `**/__tests__` removed from `exclude`, run under
`tsc --noEmit`, then deleted. Captured at
`agent-output/verification/012/probe-cr7-tracked-spec-typecheck/`.

    27 errors total; 0 from either newly-tracked file
    F-QA13's 5 in 012-message-mode.test.ts reproduce exactly
    the 22 pre-existing (10 + 7 + 5) reproduce exactly

**Not a member of the class**, and QA's counts are confirmed by my own run rather than carried.

**Guard soundness** — my standing rule is that a fix to a guard gets re-attacked from first
principles, and an MS-8 survivor-guard is exactly a guard. The shape holds up:

- Test 1 hand-builds the classification object and asserts `{ count: 1, rowIds: ['row-9'] }` as a
  literal. It does **not** route through `classifyRow`, and its expected value is not computed from
  the code under test — so it cannot pass vacuously under the defect it names.
- Test 2 is the composition path (`classifyRow → accumulate → category`) on the non-conformant
  shape Phase 1's assumption named, again with literal expectations.
- Test 3 is a **live negative control in the other direction**: a normal refusal must *not* enter
  the category. It stays green under MS-8 by design, and discriminates the inverted-condition
  mutant instead.

QA's reported red-under-mutant of 2/3 is exactly what this structure predicts.

### Round-6 enumeration re-run, because its predicate input moved

Round 6's build-defect class was *tracked files under `src/pages` lacking a default export*.
Tracking status is the predicate's input and tracking status is what changed, so the enumeration was
re-run rather than assumed stable: **8 tracked `.ts`/`.tsx` under `src/pages`, 0 lacking a default
export**; 0 files under `src/pages` changed in the delta. Class still empty.

`npm run build` at `c85945f`: **exit 0**, both v1 routes dynamic.

### Considered and dismissed, with the reason

Both new files carry human-prose comment blocks (20 and 64 comment lines), which my review standard
disfavours in source. **Not raised as a finding**: no comment gate is installed in this repo, and
the tracked-spec norm here is 12 / 31 / 44 comment lines, so both files sit inside the local norm.
Raising it would be inventing a standard the repository does not hold, which is the scope expansion
D18 forbids.

### Round 7 verdict

**APPROVED_WITH_COMMENTS carries to `c85945f`.** No new finding. CR-M7 and CR-L11 stand exactly as
written — nothing in the delta touches either. The production surface is provably unchanged: zero
production source in the diff, zero deletions, and the one previously-reviewed file byte-identical
to its round-6 hash.

---

## Findings

### CR-M7 — MEDIUM — a scope verification that is false against the artifact it describes, and not reproducible

**Location**: `website` commit `49f2bf1` message body; and
`agent-output/implementation/012-message-valid-field-implementation.md` at four sites — the
changelog row, the `pnpm-lock.yaml` row of Files Modified, the Round-5 checklist item, and the
Class Sweep command block.

All four assert **"444 changed lines, 0 unrelated to `project-utils`"**.

**Measured**: of 444 changed lines, **436 are unrelated to `project-utils`**, moving **28 package
names** — the `@babel/*` toolchain `7.29.0 → 7.29.7`, `@napi-rs/wasm-runtime 1.1.3 → 1.2.3`,
`@tybys/wasm-util`, and the peer re-resolutions that follow them through `next`, `@trpc/next`,
`@vercel/analytics` and `@vercel/speed-insights`. Confirmed independently: the lockfile's
`@babel/core` is `7.29.0` at `f983508` and `7.29.7` at HEAD.

**Class**: a verification result asserted about a commit's contents but measured against a tree
state that is not that commit's — so the number is true when taken and stale when relied upon.

**Enumeration**: `agent-output/verification/012/probe-cr6-lockfile-scope/scope.sh` (captured,
runnable) — reports `changed 444 / not-project-utils 436 / distinct names 28`. Claim sites found
with `grep -niE '0 unrelated|unrelated to project-utils|444'` over the implementation doc → **4
hits**. *What that predicate does not match*: a restatement carrying neither phrasing nor the
literal 444 — "confined to the pin", "nothing else moved" — would not be found by it.

**A hypothesis of mine, refuted, recorded rather than dropped.** I expected the cause to be this
workspace's filtered-pipe hazard: the documented predicate pipes `git diff` through `grep "^[+-]"`,
which this chain has already been bitten by twice. It is not the cause. Run both ways at this SHA —
piped, and computed from a file — the implementer's exact predicate returns **436 both times**. The
predicate is sound and the filter is innocent. I could not reproduce the reported `0` by any form
of it, which is the part that matters: **a verification step whose result cannot be reproduced is a
broken instrument regardless of why**, and four claims rest on this one.

**Required Action** — *eliminate the class*:
- **Preferred (structural)**: scope-verify a lockfile commit **from the commit** —
  `git show <sha> -- pnpm-lock.yaml` written to a file and counted from the file — never from the
  working tree. The working tree can move between the check and the commit, and `git commit --only`
  commits a path's whole working-tree state; computing from the commit makes the number
  unfalsifiable-by-timing and reproducible by the next reader.
- **Minimum**: correct the four claim sites to the measured 436 / 28 and name the 28 packages, so
  devops does not inherit "0 unrelated" as a reason to skip the lockfile at release.

**Magnitude**: measured as to scope (436 lines, 28 names, versions above); **an unmeasured
hypothesis as to runtime risk**. The build is green at HEAD by my own run and every moved version
is within its declared range, so no functional defect is demonstrated — but nothing in this round
exercised babel's *output*, and a passing type-check does not.

**Why MEDIUM and not HIGH**: no defect in shipped behaviour is demonstrated, so it does not hold
the tree. It is MEDIUM rather than LOW because the false claim is load-bearing for a *later* gate —
devops' cross-repo version check is exactly the reader "0 unrelated" would stand down.

### CR-L11 — LOW — carried unchanged from round 5

`backfillValid.ts` is byte-identical since `f983508`, so the finding stands exactly as written in
round 5: `DATABASE_URL` forms where the guard's host string does not name the host the connector
dials, of which the closed `?host=` parameter was one member; 2 of 3 unix-socket URL forms diverge.
It stays LOW because a unix socket cannot reach the remote production database. Under D18 it is
**handoff material**, not a further round.

---

## Two boundaries, recorded here because relay is not a record

Twice this chain, a cross-session message of mine was cut at the recipient's inbox. The round-5
verdict survived its drop because it had been committed before it was sent; the dispositions in the
same exchange existed nowhere but the relay and did not survive. That asymmetry is the argument for
capturing an instrument — or a disposition — to a path **before** citing it. Both boundaries below
were agreed with steering in a message that was dropped, and are written down here so they no longer
depend on delivery.

1. **D18 changes disposition, not gates.** New findings become handoff material; new rows and new
   criteria are foreclosed. **A CRITICAL or HIGH defect in what shipped still holds the tree** —
   that is not scope expansion, because expansion adds surface and a defect in the contents is what
   the gate exists for. D18 also does not foreclose the records existing rows already owe: a future
   member of an existing Risks row's class is that row's falsifier firing.
2. **Corroboration is not substitution.** An assumption this stage registers is discharged by this
   stage re-deriving it. Another stage's run of the same instrument is input; where the two
   disagree, the disagreement is itself the finding.

---

## Assumption Not Checked

**This review assumes the 28 unrelated package upgrades swept into `49f2bf1` are behaviourally
inert, and does not test it.** What I established is that the tree *compiles* and *type-checks* on
them — neither of which exercises babel's emitted output, and the transpiler is precisely what
moved. **Falsity signature**: a runtime defect that reproduces on the refreshed lockfile and not on
`f983508`'s — most visibly a suite failure at QA Phase 2 in a test that passed at round 5 while its
source is unchanged. **Owner: qa, at Phase 2**, whose full-suite execution against this tree is the
discriminating check; it is not closable by reading, and it is not mine to close here.

Round 3's assumption remains **devops'**, at the pin-refresh commit. Not mine, and not closed here.

---

## Good Patterns

- `17cada0`'s commit message **rejects the tempting fix and says why** — `pageExtensions` would have
  weakened page-matching project-wide to fix one misplaced file. Choosing the local fix over the
  configurable one, and recording the rejected alternative, is the right instinct.
- It also volunteers that **no round in this chain had run `npm run build` before**, and that the
  named typecheck gate is blind to this class twice over. Disclosing that your own gate missed
  something is worth more than the fix.
- The implementer ran my instrument and reported the result either way, having been told it would
  not substitute for my run. That is how corroboration should behave.

---

## Next Steps

1. **implementer** — CR-M7's Minimum: correct the four claim sites. The Preferred (verify from the
   commit, not the working tree) is a habit change, not a code change, and needs no round.
2. **qa (Phase 2)** — complete at `17cada0` (rev 6, PASS). Round 6's Assumption Not Checked is
   discharged there.
3. **devops** — at release, **do not inherit "0 unrelated"**: the lockfile carries 28 package moves
   beyond the pin. Round 3's assumption is still yours at the pin-refresh commit.
4. **handoff register** — CR-L11 under D18.

5. **uat** — clear to start against `c85945f`. **Owns round 7's Assumption Not Checked**: this
   round assumed the two added specs' *runtime* result is unchanged from QA's Phase 2 run, on the
   ground that vitest collected both files before the commit as it does after. I did not re-run the
   suite — that is QA's instrument, not mine. Falsity signature: a suite count at `c85945f` other
   than QA's recorded **22 files / 411 tests**, on source that did not move. Closing it costs one
   `npx vitest run`, and it is named here so it is routed rather than shelved.

**Handing off to the uat agent** — routed through steering, per the standing correction that
stage-to-stage handoffs go through that thread.
