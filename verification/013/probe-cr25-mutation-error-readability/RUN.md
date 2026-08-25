# probe-cr25 — mutation-error readability & delimiter collision

**Tree under test:** `2d90e8a` (website), verified blob-identical to the working tree at run time.
**Claim it was built for:** D32's readable-error rendering — (a) does it preserve the PATH
(steering's "must not hide what actually failed" constraint), and (b) is its line reconstruction
sound? Validity is indexed to THAT claim; reuse against a different question is not licensed.

## Run

    cd /usr/local/bin/hooks/website
    SKIP_ENV_VALIDATION=1 DATABASE_URL='postgresql://probe:probe@127.0.0.1:1/deadport' \
      TS_NODE_TRANSPILE_ONLY=true npx ts-node -r tsconfig-paths/register \
      --compiler-options '{"module":"commonjs","esModuleInterop":true,"skipLibCheck":true}' \
      ../agent-output/verification/013/probe-cr25-mutation-error-readability/probe.ts

`DATABASE_URL` is set explicitly to a dead port and `SKIP_ENV_VALIDATION` is set, per this cwd's
standing hazard: a probe must never inherit the ambient env or `.env.local`, whose only selectable
`DATABASE_URL` is the REMOTE HOSTED database.

## Results (see `output.txt`)

1. **PATH PRESERVED.** Owner's reported payload renders with
   `Path: message.data.components[0].components[0].content` — indices intact. D32's no-hiding
   constraint is SATISFIED.
2. **CONTROLS PASS.** Non-JSON message passes through byte-identical; JSON-but-not-issues passes
   through byte-identical. The probe exercises branch logic, not a constant.
3. **SPLIT CORRUPTION REACHABLE.** Driving the REAL `discordMessageShape` with the caller-sendable
   payload `{components:[{type:17,components:[{type:99}]}]}` produces ONE issue whose message is
   `Invalid discriminator value. Expected 1 | 10 | 9 | 12 | 13 | 14`. `formatMutationError` splits
   on `' | '`, so the user is shown **6 lines for 1 error**, five of them bare numbers.

## What this probe CANNOT establish

- What Discord's API does with the payloads D34 now admits. Establishing that requires sending a
  real outbound Discord message, which is prohibited outright. Owner-only, by observation.
- Visual rendering. `whitespace-pre-line` is asserted from source text, not from a browser.

## Fossil check

The probe **imports the modules from the tree** (`../../../../website/src/...`); it embeds no copy
of the code under test. `probe-cr1` and `probe-cr10` both stopped measuring by embedding a copy.
