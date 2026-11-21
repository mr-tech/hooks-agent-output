# Code review captures — fix-trpc-batch-limit

Written by `code-reviewer-fix-trpc-batch-limit`. Review document: `code-review/fix-trpc-batch-limit-code-review.md`.

All runs were in detached `git worktree` exports under that session's scratchpad. The fix export (`3d2ceec`) had its own
`pnpm install --frozen-lockfile --ignore-scripts` (exit 0, pnpm 10.28.2). The base export (`d1bb9b0`) symlinked that
`node_modules`, which is allowed because `pnpm-lock.yaml` is byte-identical between the two SHAs (`git diff --quiet d1bb9b0 3d2ceec --
pnpm-lock.yaml` exit 0). Every run was under `systemd-run --user --scope` with RuntimeMaxSec, MemoryMax and TasksMax caps. The
exports were removed at run end.

| File | What | Result |
|---|---|---|
| `suite-3d2ceec.json`, `.exit` | `npx vitest run --reporter=json` over the whole suite at `3d2ceec` | 155 files, 2265 cases, 2265 passed, exit 0 |
| `red-d1bb9b0.log` | the two new test files from `3d2ceec`, copied into the `d1bb9b0` export | 5 failed, 3 passed, exit 1; no unhandled errors |
| `batch-variants.probe.test.ts` | the reviewer's probe: the real `[trpc]` handler over a real socket, with 11 request shapes that could carry several calls, plus 1 control | — |
| `batch-variants-fix.tsv`, `-base.tsv`, `.log` | that probe run at the fix and at the base (`PROBE_OUT=<tsv>`) | fix: every `batch=1` shape gets 400 with 0 queries; base: the same shapes get 200 with queries (the positive control) |
| `convention-check-3d2ceec.log` | `convention-check.js <fix export> --since=d1bb9b0` | 0 FAIL, 0 CANDIDATE, 3 SKIP |
| `test-naming-by-hand.txt` | the positive-form basename regex and the ID-token class from the workspace `CLAUDE.md`, run by hand over both new test files | both conform; 0 ID-token lines; 0 comment lines |
| `typecheck-3d2ceec.log` | `pnpm run typecheck` (both tsc programs) at `3d2ceec` | exit 0. The first attempt exited 2 because the export lacked the untracked, generated `next-env.d.ts`; that file was copied from the shared tree and the check re-run |

To re-run the probe, copy `batch-variants.probe.test.ts` into an export at `src/pages/api/trpc/__tests__/`, then run
`PROBE_OUT=<file> npx vitest run src/pages/api/trpc/__tests__/batch-variants.probe.test.ts`. The repository's vitest configuration
silences console output, so results go to the file.
