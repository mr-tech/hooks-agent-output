# Lint at website base 395510e, through the shared tree's own install

Run by planner-hooks-017 on 2026-11-18 from `/usr/local/bin/hooks/website`. The tree is on chain A's branch; its HEAD is in `tree-head.txt`.

The run emulates `395510e`. The tree differs from `395510e` in three paths only (`git diff --name-only 395510e`):

- `.eslintrc.json`, where chain A added a `no-restricted-syntax` rule (`395510e` has it `"off"`);
- `src/components/AnchoredPopover/Child.tsx`;
- one new test file.

So the run passes `--rule '{"no-restricted-syntax":"off"}'` and ignores those two source files in the tree run. It then lints `395510e`'s `Child.tsx` from `git show` through `--stdin`. Untracked lintable files outside `.playwright-mcp/` (ignored): none. No `--fix` was run. `status-before.txt` and `status-after.txt` are identical.

The exit files hold the exit codes in this order: tree-nofix 0, tree-fixdry 0, child-nofix 1, child-fixdry 1. The 0 recorded for the two tree runs contradicts their own reports, which carry errors. Those runs went through `systemd-run --user --scope`, which does pass an exit code through (`systemd-run --user --scope -q false` exits 1). The tree no-fix run was repeated without the scope, under `timeout 600`: it exited 1 with the same error total. So the scoped exit files are not relied on, and their 0 is unexplained. The counts come from the JSON reports.

- `tree-nofix.json` and `child-nofix.json`: every finding, before any fix.
- `tree-fixdry.json` and `child-fixdry.json`: what is left after ESLint's own fixes. This is what the lint script (`eslint --fix . --max-warnings=0`) leaves and judges.
- `summary.txt`: totals, per-rule counts, and how many files have a fixable finding.
