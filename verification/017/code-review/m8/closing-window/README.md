# closing-window — CR-13's instruments (chain 017, code review Round 5 reconcile)

Question: is `WarningDialog`'s `enabled = open` argument to `useDialogEnter` decision-relevant, so
that dropping it (`row-warning-enabled-dropped`, QA's `qa-warning-enabled-dropped`) is not an
equivalent mutant? And does M8's suite have a case that fails when it is dropped?

- `WarningDialog.closing-window.test.tsx`, `run.sh`: QA's probe
  (`../../../qa-m8/probe-closing-window/`, agent-output `8e73691`), copied byte-identical (`cmp`).
  `run.sh` differs only in `SCR=`, which points at this session's scratchpad. Run as
  `bash run.sh c37d41a`. Each variant runs in its own `git archive` export, with `node_modules`
  linked and the network unshared.
- `tip.probe`: `warning-prop` gives `warnConfirm` 0, with the panel mounted, not hidden and holding
  focus after `open` is set false.
- `warning-enabled-dropped.probe`: in the same state `warnConfirm` is 1. The difference is the
  `enabled` argument alone, so the mutant is not equivalent.
- `image-enabled-dropped.probe`: `setImage` is 1 against the tip's 0. The same window is reached for
  `ImageUploader` too.
- `mutants.json`, `mutation-run.out`, `run/`: the two dropped-`enabled` mutants, run by
  `~/.claude/tools/mutation-run.py --sha c37d41a --dep node_modules` with
  `../../m1/vitest.probe.config.mjs`, over M8's three test files
  (`WarningDialog.enter-scope`, `ImageUploader.enter-scope`, `layout.navigation-guard`).
  `warning-enabled-dropped` SURVIVED. `image-enabled-dropped` was KILLED, by the hidden-dialog case
  only.

Bound: jsdom with headlessui 2.2.9. It shows that the leave transition keeps the panel mounted, with
focus inside. It does not show that a browser user's Enter can land in that window for W (QAF-22,
"Reach, as far as measured").
