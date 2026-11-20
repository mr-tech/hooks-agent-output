# Base validation at commit 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe

Export: `git -C /usr/local/bin/hooks/website archive 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe | tar x` into an isolated scratch directory (removed after the run). Nothing was run inside /usr/local/bin/hooks/website and no file there was edited.

## Tool versions

- node: `node --version` -> v24.14.0
- pnpm: `pnpm --version` -> 10.28.2
- eslint: `pnpm exec eslint --version` -> v8.57.1

## Commands

1. Install: `pnpm install --frozen-lockfile` (under `systemd-run --user --scope`, RuntimeMaxSec=1200, MemoryMax=6G, TasksMax=512). Exit: 0 (observed as "exit 0" from the install step). install.log not copied because install succeeded.
2. Lint (no --fix): `pnpm exec eslint . --max-warnings=0`. Exit: 1 (observed as "exit 1" in lint.txt). Last line eslint printed: "✖ 665 problems (300 errors, 365 warnings)". Output: lint.txt.
3. Typecheck: `pnpm run typecheck` (tsc --noEmit && tsc --noEmit -p tsconfig.test.json). Exit: 2. Output: typecheck.txt.
4. Tests: `npx vitest run --reporter=json --outputFile=report.json`. Exit: 0. Output: vitest.txt.

## Vitest counts (from report.json)

Command: `python3 -I -c "import json; d=json.load(open('report.json')); ..."`

- numTotalTests: 1913
- numPassedTests: 1913
- numFailedTests: 0
- numTotalTestSuites: 487
- len(testResults): 149
