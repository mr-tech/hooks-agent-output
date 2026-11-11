# QA Phase 2 captures — fix-website-save-gate-embeds

Written by `qa-fix-website-save-gate-embeds`, 2026-11-11. Cited from `qa/fix-website-save-gate-embeds-qa.md`.

| Path | What it is |
|---|---|
| `suite.json`, `suite-run.log`, `suite-exit.txt` | Whole suite at website `963a25c` (shared tree, clean): `npx vitest run --reporter=json`. |
| `typecheck.log`, `typecheck-exit.txt` | `pnpm run typecheck` at `963a25c`. |
| `suite-qaf1.json`, `suite-qaf1.log`, `suite-qaf1-exit.txt`, `typecheck-qaf1.log`, `lint-qaf1*.txt`, `lint-qaf1-multiset.diff` | The same at the tree with QA's added case (committed as `0e3d903`), plus eslint over the one changed test file against its `963a25c` blob (`--stdin`). |
| `mutants-gen.json` | `node ~/.claude/tools/mutant-gen.js --repo website --range 6d78b19..963a25c` output (23 candidates). |
| `mutants.json` | The sweep's set: 11 of the generated candidates (the 12 TypeScript-generic `<`/`>` candidates on `src/utils/index.ts` lines 184 and 193–195 at `963a25c` excluded) plus 11 hand mutants `H1`–`H11`. |
| `vitest.sweep.config.mjs` | Instrument: `vitest.config.ts` transcribed with `process.cwd()` for `__dirname`, because `--configLoader runner` (needed under the read-only `node_modules` bind) defines no `__dirname`. Its check is the control's count, 1144 = the shared-tree suite's. |
| `sweep-attempt1-control-failed/` | The first sweep attempt, without that config: control failed at config load (`ReferenceError: __dirname is not defined`). Kept as the record of the instrument fix. |
| `sweep/`, `sweep-driver.log` | The sweep at `963a25c`: kill table and each run's output. |
| `qaf1-case.test.ts.copy`, `qaf1-redgreen.txt` | QAF-1's case: the file's sha256, green at `963a25c` with the case, red under mutants 6 and 8 (one failure each, a `TypeError`), each mutation's diff. |
| `mutants-qaf1.json`, `sweep-qaf1/`, `sweep-qaf1-driver.log` | Mutants 6 and 8 re-run at the committed `0e3d903` through `mutation-run.py`. |
| `conv-files.txt`, `conv-idtoken.txt` | Test Conventions ID-token and positive-form scan over the six touched test files, with a positive control. |
| `walk/` | Browser walk: `save-scenario.js` (the instrument), `signin.js`, seeds (`seed*.sql`, `seed*-result.txt`), `tip/` (R1–R4, R1b at `963a25c`), `base/` (B1, B2 at `6d78b19`), `db-after-walk.txt`, `db-final.txt`, both dev-server logs (the OAuth code and state redacted). |

Belongs in the service's suite, not here: QAF-1's case lives in `website/src/utils/__tests__/utils.disposition-resolver.test.ts`.
