# verification/017/qa-phase1 — QA Phase 1 captures (qa-hooks-017)

Tree: website `1ad625e`, exported with `git -C website archive 1ad625e` into the session scratchpad,
own `pnpm install --frozen-lockfile` (exit 0, real `node_modules`, not a symlink). The shared tree
was not run, installed in or edited.

- `base-1ad625e/` — full suite, `unshare -rn npx vitest run --reporter=json`: `vitest.json`,
  `vitest.stdout`, `vitest.exit` (0). 1508 of 1508 passed, 123 `testResults` entries. By path
  membership and per-file (fullName, status) pairs it is identical to the planner's
  `entry/base-1ad625e/vitest.json`.
- `carried-probes-1ad625e/` — the analyst's AN-1 (`analysis/an1/own-save-broadcast.probe.tsx`) and
  AN-2 (`analysis/an2/signed-out-loss.probe.tsx`) probes, copied unchanged into the export's
  `src/providers/MessageProvider/__tests__/` and run under `unshare -rn` inside a
  `systemd-run --user --scope` (600 s, 3G): 2 files, 32 passed, exit 0. AN-2 rows are byte-identical to
  the analyst's `rows-395510e.json`. AN-1 rows are identical on every computed field (`notice`,
  `serverHash`, `clientHashAtDelivery`, `requests`, `pendingDialog`, …); only `heldAtMount` and
  `sent` differ, by their random `_key` uuids. The probe copies were removed from the export after
  the run.
- `local-stack-up.txt`, `local-stack-down.txt` — `agent-output/tools/uat-local-stack.sh up` (schema
  pushed, next id 900000000000001, 9 tables) and `down` (container removed).
- `g6-walk/` — G-6: the browser-walker's evidence (steps 1, 3, 4 and 6). A dev server of the export
  (`next dev -H 127.0.0.1 -p 3000`, `.env.local` symlinked from the shared tree for the run only, then
  removed) was signed in as the test account through Discord's OAuth screen (the app accepted the
  loopback redirect), and one message, id 900000000000001, was inserted by SQL for that user. No
  save was made, so nothing was published to Pusher and no request went to the generator. The
  server's own log is not committed, because it carries values from the environment.

Every process and container this pass started was stopped: `ss -ltn` shows nothing on :3000, and
`uat-local-stack.sh status` reports no container.
