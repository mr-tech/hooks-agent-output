# Code review 018 M3: lint differential and production-closure edges (Round 3)

These files back Round 3 of `code-review/018-next-upgrade-save-size-cap-code-review.md`. They are bound to website `a558f2d` (the
base config: ESLint 8.57.1, `.eslintrc.json`) and `969d92a` (the M3 tip: ESLint 9.39.5, `eslint.config.mjs`).

## How it was run

Each SHA was exported with `git archive` and installed with `pnpm install --frozen-lockfile` (`install-*.out.txt`). Each export was
given the same three-line `next-env.d.ts` (the reference lines only, no `routes.d.ts` import), so the two trees' sources differ only in
M3's lint files and the one directive in `src/@types/global.d.ts`.

1. **Lint.** In each export, run `node_modules/.bin/eslint . -f json -o <report>` under a `systemd-run` scope. Both runs exit 1
   (`eslint-*.out.txt`). The raw reports (2.4 MB and 19.5 MB) are not committed.
2. **Reduce.** `python3 -I reduce.py <report> <export root> findings-<sha>.tsv files-<sha>.txt` writes one line per finding: path,
   line, column, rule id, severity.
3. **Compare.** `python3 -I compare.py findings-a558f2d.tsv files-a558f2d.txt findings-969d92a.tsv files-969d92a.txt` writes
   `compare.txt`. It compares file membership and per-rule counts, and also compares findings location by location, so a change
   that leaves a rule's count equal is still seen. `compare-gone.txt` lists every base finding that is absent from the new run.
4. **Production edges.** In each export (and in one of `f9e66c2`), run `pnpm list --prod --depth Infinity --json`, then
   `python3 -I prod-edges.py <a.json> <b.json>`. Output: `prod-edges-compare.txt`, covering M2 (f9e66c2 → a558f2d) and M3
   (a558f2d → 969d92a). `prod-paths*.txt` trace the paths to the moved versions.
5. **Conventions.** `node ~/.claude/tools/convention-check.js <scratch clone at 969d92a> --since=a558f2d` writes
   `convention-check-969d92a.txt`.

## Results

- **Lint:** files 498 → 497 (only `next-env.d.ts` drops out). Findings 665 → 774. 19 rule ids change count. 0 rule ids keep an
  equal count while their findings move. The base findings missing from the new run are the 51 `no-non-null-assertion`, the 11
  `member-delimiter-style` and the 1 `no-var-requires`.
- **Production edges at M3:** 4 edges removed and 10 added, all under
  `project-utils > prisma-kysely > @prisma/internals` (fast-glob 3.2.12 → 3.3.1, is-core-module 2.13.1 → 2.16.1, hasown 2.0.0 →
  2.0.2, semver 7.5.4 → 7.8.6).
