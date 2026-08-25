# probe-cr26 — is the delimiter class ELIMINATED at e1d9b2b, or RELOCATED?

**Tree under test:** `e1d9b2b` (`chain/013-rider-2`), working tree verified blob-identical.
**Claim it was built for:** does `formatZodIssues` render exactly one line per issue regardless of
message content, and does it still preserve the path (D32)?

**NOT a re-run of probe-cr25.** cr25's validity is indexed to the claim it was built for — the old
single-site formatter. The question changed (new shared function, new call shape), so the
instrument was rebuilt rather than re-pointed. An instrument's validity is indexed to the claim,
not to the tree.

## Run

    cd /usr/local/bin/hooks/website
    SKIP_ENV_VALIDATION=1 DATABASE_URL='postgresql://probe:probe@127.0.0.1:1/deadport' \
      TS_NODE_TRANSPILE_ONLY=true npx ts-node -r tsconfig-paths/register \
      --compiler-options '{"module":"commonjs","esModuleInterop":true,"skipLibCheck":true}' \
      ../agent-output/verification/013/probe-cr26-delimiter-class-eliminated/probe.ts

## Results (`output.txt`)

- **ELIMINATED for the named class.** The `invalid_enum_value` / discriminator payload whose message
  embeds `' | '` renders as **1 line**, where at `2d90e8a` the equivalent rendered as **6**.
  N issues → exactly N lines at N = 1, 2, 3.
- **D32 not regressed.** Path with indices survives: `message.data.components[0].components[0].content`.
- **Controls pass**: non-JSON passthrough, JSON-but-not-issues passthrough, null → undefined.
- **RESIDUAL, reported as INFO not as a defect.** The fix replaced a `' | '` joiner with a `'\n'`
  joiner, so the one-line-per-issue invariant is still breakable by a message containing `'\n'`
  (measured: 1 issue → 2 lines). **Not reachable in this tree** — `git grep "message:.*\\n"` over
  non-test `src` returns zero, and the sole custom Zod issue message (`shapes.ts` line ~182)
  contains no newline. Per the input-robustness order, step 1 stops it: the caller cannot send it,
  so there is no finding. Recorded because the invariant now rests on a property of the current
  schema set rather than on a guarantee.

## Fossil check

Imports `formatMutationError` **from the tree**. No embedded copy.
