# verification/017 — instrument notes

Each subfolder holds one stage's captures (`entry/`, `impl/`, `code-review/`, `qa-phase1/`, `qa-m1/`, …).
This file records instrument defects a stage found and declined to fix (lifecycle `findings.md`).

## Lint from stdin in the shared tree cannot measure a base tree (QAF-15, qa/017-existing-items-backlog-m1-qa.md)

- **Defect.** `git show <base>:<file> | eslint --stdin --stdin-filename <file>` in `/usr/local/bin/hooks/website` type-checks
  the piped bytes against the shared tree as it is now, not the base. Measured at website `8147661`:
  `limits.import-validation.test.ts` at `1ad625e` reads 21 findings by this method. Of these, 14 are `no-unsafe-call` on
  `enforceImportMutualExclusivity`, which the moved tree no longer exports. The base tree's own whole-tree lint
  (`entry/lint-1ad625e/nofix.json`) reads 7. A path that no longer exists on disk gives a parse error instead, from
  `parserOptions.project` (`qa-m1/lint/base-*.json`).
- **Use instead.** For base counts, read the base tree's whole-tree capture `entry/lint-1ad625e/nofix.json`. For tip counts,
  lint the tree under measurement. In an export that links the shared install, eslint 8.57.1 refuses with "couldn't determine
  the plugin react uniquely" (`qa-m1/lint/export-8147661.err`), so the export needs its own install, or the lint runs in
  the shared tree only while that tree is exactly the commit measured.
- **Owner:** `implementer-hooks-017` (M7-b's instrument). **Trigger:** M7-b's chain-tip run.
