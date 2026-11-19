# probe-enter-both — CR-9's instrument (chain 017, code review Round 4)

Question: with the link prompt (`NavigationGuardProvider`'s own `ConfirmationProvider` and
`ConfirmationDialog`) and the editor's update prompt open together, does one Enter keypress answer
both? M4-b requires each to be answered on its own.

- `NavigationGuardProvider.enter-key.probe.test.tsx`: copied into `src/providers/__tests__/` of a
  `git archive de06d95` export with `node_modules` linked, run with
  `../../m1/vitest.probe.config.mjs`:
  `npx vitest run --config vitest.probe.config.mjs --no-cache --configLoader runner --reporter=verbose src/providers/__tests__/NavigationGuardProvider.enter-key.probe.test.tsx`,
  under `timeout 300 systemd-run --user --scope -p RuntimeMaxSec=300 -p MemoryMax=4G -p TasksMax=512`.
  It uses the real `react-hotkeys-hook` (5.2.4) and the editor's real `HotkeysProviderWrapper`.
  The update prompt is raised by calling the editor instance's `showConfirmation` directly, as
  `usePusher`'s broadcast handler does: a pointer press outside the open link prompt is an outside
  click and dismisses it (this probe's first draft did that, and its "link first" case read 1 for that
  reason; corrected before the recorded run).
- `run-de06d95.out` / `.exit`: at `de06d95`. Controls A and B (one prompt open) pass with one answer each.
  Both orders with two prompts open give 2 answers to one Enter (`push=1`, update `onConfirm`=1); exit 1.
- `control-no-hotkey.out` / `.exit` / `.patch-result.txt`: planted control. The same export with
  `ConfirmationDialog`'s `useHotkeys(['enter'], …)` removed (read back from disk). Controls A and B still
  pass (the autofocused confirm button answers Enter itself), and both two-prompt cases give 0 answers;
  exit 0. So the double answer is the two instances' document-level Enter bindings, not the probe.

Bound: jsdom with headlessui 2.2.9. The bindings are plain `document` keydown listeners, so the
mechanism does not depend on jsdom's focus or layout; which dialog a real browser focuses is not
tested here.
