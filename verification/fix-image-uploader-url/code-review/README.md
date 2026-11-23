# Code review probe — fix-image-uploader-url

`review-probe.test.tsx` is the reviewer's instrument, not a suite file. It reuses the harness of
`website/src/components/__tests__/ImageUploader.saved-address.test.tsx` at `7660259` (its first 123
lines, verbatim) and adds five probe cases P1, P1b, P2, P3, P4.

How it ran (2026-11-23T16:40Z): `git archive <sha> | tar -x` into a scratch directory for each of
`af3d95a` and `7660259`, `node_modules` symlinked from the shared tree, the probe copied to
`src/components/__tests__/ImageUploader.review-probe.test.tsx`, then
`npx vitest run src/components/__tests__/ImageUploader.review-probe.test.tsx`. Output with the
exit code appended: `probe-run-af3d95a.txt`, `probe-run-7660259.txt`.

Results:

| Case | af3d95a | 7660259 | Used by |
|---|---|---|---|
| P1 "Image not found." kept after Cancel and reopen (saved address failed, box unchanged) | pass | **fail**: `expected 'Enter Image URLImage URLCancelClearSa…' to contain 'Image not found.'` | CR-1 |
| P1b Save off after Cancel and reopen, same case | fail (Save enabled: base bug F1) | pass | CR-1 context |
| P2 after deleting the saved address by hand and saving, Clear is off on reopen | fail (base saved the old address) | **fail**: `expected false to be true` (Clear enabled) | CR-2 |
| P3 Enter on an emptied box with a saved image saves nothing; Save enabled | fail (base Enter saved the old address) | pass | CR-3 |
| P4 a saved address still loading: Save enabled, saves it | pass | pass | Assumption context |

`convention-check-7660259.txt`: `node ~/.claude/tools/convention-check.js website --since=af3d95a` at
`7660259`, exit 0, 0 FAIL, 0 CANDIDATE, 18 SKIP.
