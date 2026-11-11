# Code review round 1 captures — fix-website-save-gate-embeds

Taken by `code-reviewer-fix-website-save-gate-embeds`, 2026-11-11, at website `460000b`.
Trees: `wt-green` = `git worktree add --detach … 460000b`; `wt-red` = the same with
`git show 6d78b19:src/utils/index.ts` written over `src/utils/index.ts` (`red-tree.diff`). Both
used the shared tree's `node_modules` by symlink. Typecheck and convention-check ran in the shared
tree (clean at `460000b`), because the export lacks the ignored `next-env.d.ts`.

| File | What it is |
|---|---|
| `row-differential.mjs` | Probe: `resolveContentLoss` over an exhaustive 800-cell corpus (flags × components × content × embeds). Run `SKIP_ENV_VALIDATION=1 npx tsx` from each tree. |
| `rows-6d78b19-index.json`, `rows-460000b.json`, `differential.txt` | Its outputs and their diff: 144 cells move (72 B→E, 72 C→E), all V2 components beside only-empty embeds with blank content; 656 unchanged. Positive control: the instrument separates the two trees. |
| `import-shape-reach.mjs`, `import-shape-reach.txt` | Probe: `discordMessageImportShape.parse` then `resolveContentLoss`, the two steps both JSON surfaces run, for pasted JSON with a V2 container beside each empty-embed shape. The shape keeps every empty embed (`_key` stripped to `{}`), so the paste route reaches the changed cells. |
| `red-run.txt`, `green-run.txt` | The fixer's two test files, red tree (5 failed / 31 passed, exit 1) and fix tree (36 passed, exit 0). |
| `suite-run.txt`, `suite-summary.txt` | Whole suite at the fix tree: 1135/1135, 117 files, exit 0. |
| `suite-red-run.txt`, `suite-red-summary.txt` | Whole suite at the red tree: 1130/1135, exactly the 5 new cases fail, exit 1. |
| `typecheck.txt` | `pnpm run typecheck`, exit 0. |
| `convention-check.txt` | `convention-check.js website --since=6d78b19`: 34 FAIL, 0 CANDIDATE, 1 SKIP (id-token/basename). |
| `lint-base-6d78b19.txt`, `lint-fix-460000b.txt` | eslint `--stdin` over each touched file's blob at each SHA, as `file \| rule \| message`: identical 34-line multisets. |
