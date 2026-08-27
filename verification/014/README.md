# Verification rig — plan 014 M2 (DOM harness determination)

Built by `analyst-hooks-014`, 2026-08-26/27, for `analysis/014-test-suite-cleanup-analysis.md`.
**Nothing in `/usr/local/bin/hooks/website` was written to.** No install ran there; `package.json`,
`pnpm-lock.yaml` and `node_modules` are untouched. Verified with `git -C website status --porcelain`
before and after.

## What is committed

| path | what |
|---|---|
| `poc-tests/*.test.tsx` | the nine throwaway POC test files, exactly as run |
| `poc-tests/rig-vitest.config.ts` | the config they ran under (`environment` from `POC_SUITE_ENV`, `include` from `POC_INCLUDE`) |
| `poc-tests/setup-poc.ts` | sets `IS_REACT_ACT_ENVIRONMENT` |
| `runs/passset-digests.txt` | sha256 of each configuration's sorted assertion set |
| `runs/passset-dom-configs.txt` | per-file assertion counts + the 19 assertions the POC files add |

## What is NOT committed (`.gitignore` here)

- `analyst-rig/mirror/` — a `cp -a` copy of `website/src` + `website/bot` at `a74b9e2`, plus a `node_modules`
  **symlink** to `website/node_modules`, plus an in-root `vitest.config.ts`. Proved byte-identical to
  `website/src` with `diff -rq` before and after every run.
- `analyst-rig/poc/node_modules/` — an `npm install` of `vitest@4.1.2`, `jsdom@27.4.0`, `happy-dom@20.11.8`
  **into the rig only**. This is the single network operation of the analysis.

## Rebuild

```sh
cd /usr/local/bin/hooks/agent-output/verification/014
mkdir -p analyst-rig/poc && cd analyst-rig/poc
cat > package.json <<'JSON'
{ "name": "poc-014-dom-harness", "private": true, "type": "module",
  "devDependencies": { "vitest": "4.1.2", "jsdom": "^27.0.0", "happy-dom": "^20.0.0" } }
JSON
npm install --no-audit --no-fund          # the only network access
cd .. && rm -rf mirror && mkdir mirror
cp -a /usr/local/bin/hooks/website/src    mirror/src
cp -a /usr/local/bin/hooks/website/bot    mirror/bot
cp /usr/local/bin/hooks/website/package.json /usr/local/bin/hooks/website/tsconfig.json mirror/
ln -sfn /usr/local/bin/hooks/website/node_modules mirror/node_modules
cp ../poc-tests/rig-vitest.config.ts mirror/vitest.config.ts
cp ../poc-tests/setup-poc.ts         mirror/setup-poc.ts
mkdir -p mirror/src/poc__tests__ && cp ../poc-tests/*.test.tsx mirror/src/poc__tests__/
cd mirror
RIGV=../poc/node_modules/.bin/vitest
POC_SUITE_ENV=node       POC_INCLUDE='src/**/*.test.ts'                        $RIGV run   # 48/617
POC_SUITE_ENV=jsdom      POC_INCLUDE='src/**/*.test.ts,src/**/*.test.tsx'      $RIGV run   # 57/636
POC_SUITE_ENV=happy-dom  POC_INCLUDE='src/**/*.test.ts,src/**/*.test.tsx'      $RIGV run   # 57/636

# Configuration D - the recommended shape. Environment follows the file extension.
cp ../poc-tests/projects.config.ts .
$RIGV run --config "$PWD/projects.config.ts"                                              # 59/638
```

For configuration A (global `node` + per-file directive), prepend `// @vitest-environment jsdom`
as line 1 of each `poc-tests/*.test.tsx` and run with `POC_SUITE_ENV=node`.

## RIG HAZARD PAID FOR HERE — read before trusting any run from this shape

An earlier rig ran the website suite with the vitest config living **outside** the vite `root`.
Under `environment: 'node'` that passed 48/48. Under `jsdom` or `happy-dom` **all 48 files failed**
with `Error: Cannot find module '/src/…/<file>.test.ts'` — a URL-shaped id resolved against the
wrong base, because the DOM environments run in vite's *client* transform mode and the node
environment does not. **That is a rig defect, not a fact about the website tree.** It would have
been reported as "no existing test survives a DOM environment", which is the exact opposite of the
truth. The `analyst-rig/mirror/` shape exists to put the config inside the root, as the real change would be.

Second hazard, from `hazards.md`: a rig's `node_modules` **symlink** can degenerate into a real
directory, at which point the probe reads as failing when the rig is what broke. Repair is
`rm -rf node_modules && ln -sfn <target> node_modules` — `ln -sfn` alone links *inside* the
directory. Check with `ls -ld analyst-rig/mirror/node_modules` before believing any red run.
