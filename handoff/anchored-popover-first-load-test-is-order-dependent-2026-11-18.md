---
UUID: 3415e799
Status: Open
Status-Detail: "The red test for a portaled popover's first load inside an open dialog discriminates only while its first case is the file's first render of Child.tsx. Owed: make every case a first load. Blocks nothing; the fix it guards is a static import."
Owning-Stage: implementer (the session next editing website's AnchoredPopover tests)
Review-Trigger: when src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx is next edited, or a case is added to it
---

# The first-load red test is order-dependent

## What is seeded

`website` `src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx` (added
at website `1ad625e`), case "opening the dialog never hides it while the portaled popover renders for
the first time", is the regression guard for the defect "an open dialog closes itself when something
rendered inside it loads code for the first time in the page's life".

Its red depends on being the first case in the file to render `AnchoredPopover/Child.tsx`. A lazy
`next/dynamic` wrapper suspends only while its `import()` promise is unresolved; once any earlier case
in the same file has resolved it, the module cache holds it and the case passes against the defective
code. Measured: with the file's two cases swapped and the pre-fix `Child.tsx` restored, both cases pass
(exit 0). In the committed order the same tree fails case 1 (exit 1).

So a later case inserted above it, a `describe` reorder, or `--sequence.shuffle` silently disarms it,
and nothing reports that.

Owed: every case in that file renders `Child.tsx` from a fresh module graph — for example
`vi.resetModules()` in `beforeEach` with `Dropdown`, `PresetDialog` and `next/dynamic`'s target
imported dynamically inside the case — so the first-load condition is a property of every case, not
of the file's first one.

Falsity signature the remedy must exhibit: with the pre-fix `Child.tsx` restored (the lazy
`dynamic(() => import('@floating-ui/react').then((mod) => mod.FloatingPortal), { ssr: true })`) and
the case placed neither first nor last in its file, the case fails on its `hidden` assertion
(`expected [ Array(1) ] to deeply equal []`), never on a timeout.

## Evidence

Captured under `verification/fix-dialog-closes-on-first-portal-load/code-review/`:

- `red-base-child.txt` / `.exit` — the committed test at `1ad625e` against base `Child.tsx`: case 1
  fails, exit 1.
- `order-probe.test.tsx.txt` — the same file with the two cases swapped.
- `order-probe-base-child.txt` / `.exit` — that file against base `Child.tsx`: 2 of 2 passed, exit 0.

## Origin

`code-review/fix-dialog-closes-on-first-portal-load-code-review.md`, Round 1, CR-1.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-18T22:27 | code-reviewer (code-reviewer-fix-dialog-closes-on-first-portal-load) | Created from CR-1, Round 1. |
