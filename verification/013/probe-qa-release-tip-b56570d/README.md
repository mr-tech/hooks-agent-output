# probe-qa-release-tip-b56570d — instruments behind the `b56570d` release-tip verdict

**Stage**: QA Phase 3, commissioned by `devops-hooks-013-3`. **Verdict document**:
`agent-output/qa/release-b56570d-tip-verification.md`. Nothing devops measured was adopted; every
capture here was produced by this pass.

| Capture | Settles |
|---|---|
| `run-suite-b56570d.txt` | full suite at the tip — **48 files / 627 tests / 627 passed, exit 0** |
| `run-build-b56570d.txt` | `pnpm build` at the tip — **`✓ Compiled successfully`, exit 0**, 0 lines matching `error` or `warn`, 10 app + 8 pages routes |
| `run-typecheck-b56570d.txt` | `pnpm typecheck` at the tip — **both** `tsc` projects, exit 0, 0 `error TS`. A release fact because the script itself is in the delta |
| `run-012-mode-old-vs-new.txt` | **the combination-risk finding.** `368f932` edits `012-message-mode.test.ts` while 012 is held whole. The change is import-order plus TypeScript casts, and *"behaviour-preserving"* is a claim — so both blobs were executed side by side |

## The 012 differential — why it exists and how to repeat it

A 013 commit modifying a 012-named spec is exactly the cross-plan interaction Phase 3 exists to
catch, and reading the diff is not a check. The `2d90e8a` blob was extracted to a scratch path in
the tree, run in one vitest invocation beside the `b56570d` version, and removed:

```
OLD(2d90e8a)  6 tests green — identical test names
NEW(b56570d)  6 tests green — identical test names
Test Files 2 passed (2)   Tests 12 passed (12)
```

Identical test sets, identical results: the spec discriminates what it discriminated before.

```sh
cd website
git show 2d90e8a:src/utils/__tests__/012-message-mode.test.ts \
  > src/utils/__tests__/zz-012-mode-at-2d90e8a.test.ts
DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' npx vitest run --reporter=verbose \
  src/utils/__tests__/zz-012-mode-at-2d90e8a.test.ts src/utils/__tests__/012-message-mode.test.ts
rm src/utils/__tests__/zz-012-mode-at-2d90e8a.test.ts   # shared tree — remove the scratch copy
git status --porcelain | wc -c                          # must be 0
```

**`pnpm lint` is deliberately absent** — it is `eslint --fix .`, which would modify the tree and
invalidate the anchor. See the verdict's §7.
