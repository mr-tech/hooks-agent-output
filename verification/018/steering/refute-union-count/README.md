# union error-map count check (website @ 7923a1d)
- zod: 3.22.4 (node_modules/zod/package.json, also printed by driver). Node v24.14.0, vitest 4.1.2 (website/node_modules/.bin).
- Export: `git -C website archive 7923a1d | tar -x -C export`; `ln -sfn website/node_modules export/node_modules`. Real shapes.ts imported (discordMessageShape); `sectionShape` is not exported so sections are driven via `components`.
- Run: `systemd-run --user --scope -p RuntimeMaxSec=120 -p MemoryMax=2G -p TasksMax=64 --setenv=SKIP_ENV_VALIDATION=1 website/node_modules/.bin/vitest run --config vitest.config.mjs` (SKIP_ENV_VALIDATION because ~/constants loads env.mjs; no .env.local read). Files: driver.test.mjs, vitest.config.mjs, output.txt, run.log.
- Note: shapes.ts has 3 z.union (grep -c): line 84 accessory, line 107 separator spacing, line 202 allowed_mentions.parse element.

## Results (top-level issues / flattened incl. unionErrors / errorMap calls)
- (a) 6 failing accessories: 6 / 36 / 36; 21st call path components.3.accessory.type (invalid_literal)
- (a) control, 1: 1 / 6 / 6
- (b) 6 failing parse elements: 6 / 24 / 24 (4 calls per element: 3 literal branches + invalid_union)
- (b) control, 1: 1 / 4 / 4
