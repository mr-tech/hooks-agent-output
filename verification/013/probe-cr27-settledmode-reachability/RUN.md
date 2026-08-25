# probe-cr27 — is `settledMode`'s `requiresChoice` branch dead (CR24-2) or live (QA INFO-2)?

**Tree:** `e1d9b2b`. **Result: QA is right; code review round 24's CR24-2 was wrong on reachability.**

## Run

    cd /usr/local/bin/hooks/website
    SKIP_ENV_VALIDATION=1 DATABASE_URL='postgresql://probe:probe@127.0.0.1:1/deadport' \
      TS_NODE_TRANSPILE_ONLY=true npx ts-node -r tsconfig-paths/register \
      --compiler-options '{"module":"commonjs","esModuleInterop":true,"skipLibCheck":true,"jsx":"react-jsx"}' \
      ../agent-output/verification/013/probe-cr27-settledmode-reachability/probe.ts

`jsx` **must** be in the override: `src/utils/isValidUrl.tsx` is a `.tsx`, and passing
`--compiler-options` replaces the tsconfig's `jsx` setting, so omitting it breaks module resolution
deep in the import chain and reads as a missing module. That was a rig break of my own making and
cost two runs. `DATABASE_URL` is pinned to a dead port per the standing hazard.

## What CR24-2 got wrong, and how

CR24-2 asserted the branch was *"dead on both sides"*, citing: `computeLoadDiff`'s sole caller is
`JsonModalBody.tsx:270`, guarded on `validatedDraft`, which the parsing effect nulls when
`requiresChoice`. **Every clause of that is true and the conclusion does not follow.**
`computeLoadDiff(current, incoming)` takes **two** arguments and `settledMode` is applied to **both**:

    computeLoadDiff(message?.data ?? {}, validatedDraft)
                    ^^^^^^^^^^^^^^^^^^^  the STORED record — guarded by NOTHING
                                         ^^^^^^^^^^^^^^  guarded, as CR24-2 said

I checked the guard on one argument and generalised to both. **The predicate answered a narrower
question than the claim it was supporting** — the same defect class as CR24-2's own subject.

## Measured

A stored **row E** record (V2 components AND classic content → `requiresChoice: true`):

- `resolveContentLoss` → `row=E, requiresChoice=true, mode=null`
- `computeLoadDiff(rowE_stored, classic_incoming)` → **`fromMode="v2"`**, `toMode="classic"`,
  `modeChanges=true`, `removedTypes=["Container"]` — i.e. *"remove Container; switch from
  Components V2 to Classic"*. **The branch executed, and its answer is CORRECT.**
- The M9-b spec's own oracle (`modeAfterLoad`) for the same record returns **`"classic"`**.
  **Production and the spec's oracle DISAGREE on a reachable path.**

## Consequence

**The DRY finding is strengthened, not withdrawn.** Two encodings of one rule that disagree on a
**dead** path is a tidiness item; on a **live** path it is the very thing M9-b existed to remove,
still present. Production currently holds the correct value, so there is no user-visible defect —
but the spec cannot see this path, so nothing would catch it if that changed.

**A fix acting on "the branch is dead" would act on a false premise and could delete a live,
correct branch.** That warning is QA's and is the operative half of this correction.
